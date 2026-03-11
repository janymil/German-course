#!/usr/bin/env node
/**
 * preprocess-videos.cjs
 * ─────────────────────
 * Pre-fetches subtitles + Slovak translations + Gemini segments for curated or ad-hoc videos
 * and saves them to src/data/video-database/{videoId}.json and src/data/video-database/{videoId}-segments.json.
 *
 * Usage:
 *   node scripts/preprocess-videos.cjs                          ← process ALL library videos
 *   node scripts/preprocess-videos.cjs <youtubeUrl|videoId>     ← process one specific video
 *   node scripts/preprocess-videos.cjs --list                   ← show library video IDs
 */

const fs = require('fs');
const path = require('path');
const youtubedl = require('youtube-dl-exec');

// Load .env for Gemini API Key
const envPath = path.join(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8')
    .split('\n')
    .filter(line => line.trim() && !line.startsWith('#'))
    .forEach(line => {
      const [key, ...rest] = line.split('=');
      if (key) {
        const value = rest.join('=').trim().replace(/"/g, '');
        if (value && !process.env[key.trim()]) {
          process.env[key.trim()] = value;
        }
      }
    });
}

// Ensure Gemini is imported
async function getGeminiModel() {
  const { GoogleGenAI } = await import('@google/genai');
  return new GoogleGenAI({ apiKey: process.env.VITE_GEMINI_API_KEY });
}

const CACHE_DIR = path.join(__dirname, '..', 'src', 'data', 'video-database');
const CHUNK_SIZE = 30; // sentences per translation request

// ─── Helpers ─────────────────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function extractVideoId(input) {
  if (!input) return null;
  // Already a plain ID (11 chars, no slash)
  if (/^[A-Za-z0-9_-]{11}$/.test(input.trim())) return input.trim();
  try {
    const url = new URL(input.trim());
    return url.searchParams.get('v') || url.pathname.replace('/', '');
  } catch {
    return null;
  }
}

// ─── Subtitle fetcher (mirrors vite.config.js logic) ─────────────────────────

async function fetchTranscript(videoId) {
  console.log(`  📥 Fetching subtitles for ${videoId}…`);
  const output = await youtubedl(`https://www.youtube.com/watch?v=${videoId}`, {
    dumpJson: true,
    noWarnings: true,
    noCallHome: true,
    noCheckCertificate: true,
    preferFreeFormats: true,
    youtubeSkipDashManifest: true,
  });

  const subs = output.subtitles || {};
  const autoSubs = output.automatic_captions || {};
  const track = subs['de'] || subs['de-DE'] || subs['de-ch'] || autoSubs['de'] || autoSubs['de-DE'];

  if (!track) throw new Error('No German subtitle track found.');

  const json3Format = track.find(t => t.ext === 'json3');
  if (!json3Format) throw new Error('json3 subtitle format not available.');

  const fetchRes = await fetch(json3Format.url);
  const data = await fetchRes.json();

  const transcript = [];
  if (data.events) {
    data.events.forEach(ev => {
      if (!ev.segs) return;
      const text = ev.segs.map(s => s.utf8).join('').replace(/\n/g, ' ').trim();
      if (!text) return;
      transcript.push({ offset: ev.tStartMs || 0, duration: ev.dDurationMs || 0, text });
    });
  }

  if (transcript.length === 0) throw new Error('Subtitle track was empty after parsing.');
  console.log(`  ✔  ${transcript.length} subtitle lines loaded.`);
  return transcript;
}

// ─── Batch translator (mirrors vite.config.js translate endpoint) ─────────────

async function translateBatch(texts) {
  const qText = texts.join('\n');
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=de&tl=sk&dt=t&q=${encodeURIComponent(qText)}`;
  const res = await fetch(url);
  const data = await res.json();
  const full = data[0].map(x => x[0]).join('');
  const parts = full.split('\n').map(s => s.trim());

  // If count doesn't match, pad/trim to be safe
  while (parts.length < texts.length) parts.push('');
  return parts.slice(0, texts.length);
}

async function translateAll(transcript) {
  console.log(`  🌐 Translating ${transcript.length} lines in chunks of ${CHUNK_SIZE}…`);
  const translations = {};
  const chunks = [];
  for (let i = 0; i < transcript.length; i += CHUNK_SIZE) {
    chunks.push({ start: i, texts: transcript.slice(i, i + CHUNK_SIZE).map(t => t.text) });
  }

  for (let ci = 0; ci < chunks.length; ci++) {
    const { start, texts } = chunks[ci];
    process.stdout.write(`  ↳ chunk ${ci + 1}/${chunks.length} (lines ${start}–${start + texts.length - 1})… `);
    try {
      const translated = await translateBatch(texts);
      translated.forEach((sk, i) => { if (sk) translations[start + i] = sk; });
      console.log('✔');
    } catch (err) {
      console.log(`⚠ FAILED (${err.message}), retrying individually…`);
      // Retry each sentence individually on error
      for (let i = 0; i < texts.length; i++) {
        try {
          const [t] = await translateBatch([texts[i]]);
          if (t) translations[start + i] = t;
          await sleep(150);
        } catch (e2) {
          console.warn(`    Line ${start + i} failed: ${e2.message}`);
        }
      }
    }
    // Small delay between chunks to be respectful to the free API
    if (ci < chunks.length - 1) await sleep(200);
  }

  const filled = Object.keys(translations).length;
  console.log(`  ✔  ${filled}/${transcript.length} lines translated.`);
  return translations;
}

// ─── Gemini Segmentation ────────────────────────────────────────────────────────

async function segmentVideo(videoId, transcript) {
  if (!transcript || transcript.length === 0) return null;

  console.log(`  ✂️ Generating 5-min chunks and Gemini topics for ${videoId}…`);

  const TARGET_CHUNK_MS = 5 * 60 * 1000; // 5 minutes
  const segments = [];
  let currentSegmentStartIdx = 0;

  for (let i = 0; i < transcript.length; i++) {
    const line = transcript[i];
    if (!transcript[currentSegmentStartIdx]) break; // Safety check

    const segmentDuration = line.offset - transcript[currentSegmentStartIdx].offset;

    // If we passed 5 minutes, try to find a natural break (end of sentence)
    if (segmentDuration >= TARGET_CHUNK_MS || i === transcript.length - 1) {
      const text = line.text.trim();
      // Cut if it ends a sentence, or if the chunk is getting way too long (>6m), or it's the very last line
      const isEndOfSentence = /[.?!]$/.test(text) || /[.?!]["'„“]$/.test(text);

      if (isEndOfSentence || segmentDuration > TARGET_CHUNK_MS + 60000 || i === transcript.length - 1) {
        const startTimeMs = transcript[currentSegmentStartIdx].offset;
        const endTimeMs = line.offset + line.duration;

        segments.push({
          startTimeMs,
          endTimeMs,
          topicDescription: `Teil ${segments.length + 1}`
        });

        currentSegmentStartIdx = i + 1;
      }
    }
  }

  try {
    const ai = await getGeminiModel();

    const titlePromises = segments.map(async (seg) => {
      // Grab up to 4000 chars of this segment to give Gemini context for exactly what happened
      const segText = transcript
        .filter(t => t.offset >= seg.startTimeMs && t.offset <= seg.endTimeMs)
        .map(t => t.text)
        .join(' ')
        .substring(0, 4000);

      const aiTitle = await ai.models.generateContent({
        model: 'gemini-2.5-flash-lite',
        contents: `Analyze this video transcript segment. Return ONLY a very short, simple 2-4 word topic title in German summarizing what is happening (e.g. "Am Flughafen", "Begrüßung und Vorstellung", "Essen bestellen"). No quotes, no markdown, no other text.\n\nTranscript:\n${segText}`,
        config: { temperature: 0.1 }
      });

      if (aiTitle.text) {
        seg.topicDescription = aiTitle.text.replace(/["']/g, '').trim();
      }
    });

    // Wait for all titles to be generated in parallel
    await Promise.allSettled(titlePromises);
    console.log(`  ✔  Generated ${segments.length} AI topics.`);
  } catch (titleErr) {
    console.warn("  ⚠ AI title generation failed, using default titles (Teil X):", titleErr.message);
  }

  return { segments };
}


// ─── Main processor ───────────────────────────────────────────────────────────

async function processVideo(videoId) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });

  const cacheFile = path.join(CACHE_DIR, `${videoId}.json`);
  const segmentFile = path.join(CACHE_DIR, `${videoId}-segments.json`);

  let transcript = null;
  let translations = null;

  // 1. Check or Generate Transcript+Translation
  let needSaveMain = false;
  if (fs.existsSync(cacheFile)) {
    const existingData = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
    if (existingData.transcript && existingData.translations && Object.keys(existingData.translations).length > 0) {
      console.log(`  ⚡ Transcript & Translations exist for ${videoId}.`);
      transcript = existingData.transcript;
      translations = existingData.translations;
    } else {
      console.log(`  ⚡ Existing cache missing translations for ${videoId}.Fetching transcript / translations...`);
      transcript = existingData.transcript || await fetchTranscript(videoId);
      translations = await translateAll(transcript);
      needSaveMain = true;
    }
  } else {
    transcript = await fetchTranscript(videoId);
    translations = await translateAll(transcript);
    needSaveMain = true;
  }

  if (needSaveMain) {
    const payload = { videoId, processedAt: new Date().toISOString(), transcript, translations };
    fs.writeFileSync(cacheFile, JSON.stringify(payload), 'utf8');
    const kb = Math.round(fs.statSync(cacheFile).size / 1024);
    console.log(`  💾 Saved Primary → src / data / video - database / ${videoId}.json(${kb} KB)`);
  }

  // 2. Check or Generate Segments
  if (fs.existsSync(segmentFile)) {
    console.log(`  ⚡ Segments exist for ${videoId}.`);
  } else {
    const segData = await segmentVideo(videoId, transcript);
    if (segData) {
      fs.writeFileSync(segmentFile, JSON.stringify(segData, null, 2), 'utf8');
      const kb = Math.round(fs.statSync(segmentFile).size / 1024);
      console.log(`  💾 Saved Segments → src / data / video - database / ${videoId} -segments.json(${kb} KB)`);
    }
  }

  console.log(`  ✅ Done with ${videoId} \n`);
}

// ─── CLI entry ────────────────────────────────────────────────────────────────

async function main() {
  const arg = process.argv[2];

  // --list flag
  if (arg === '--list') {
    // Dynamically read the library IDs from the JSON if it exists, else hardcode
    console.log('Library video IDs:');
    LIBRARY_IDS.forEach(({ id, title }) => console.log(`  ${id}  ${title} `));
    return;
  }

  if (arg) {
    // Process a single video
    const id = extractVideoId(arg);
    if (!id) { console.error('❌ Could not parse a video ID from:', arg); process.exit(1); }
    console.log(`\n🎬 Processing single video: ${id} \n`);
    await processVideo(id);
  } else {
    // Process ALL library videos
    console.log(`\n🎬 Processing all ${LIBRARY_IDS.length} library videos…\n`);
    for (const { id, title } of LIBRARY_IDS) {
      console.log(`▶ ${title} (${id})`);
      await processVideo(id);
    }
    console.log('✅✅✅ ALL VIDEOS FULLY PREPROCESSED AND DB IS READY!');
  }
}

// ─── Library ID list (mirrors src/data/videoLibrary.js) ─────────────────────
// Keep this in sync when adding new videos to the library.

const LIBRARY_IDS = [
  // Nicos Weg
  { id: 'XM8CXQ7e3j4', title: 'Nicos Weg – Ep. 1: Ankunft' },
  { id: '4-eDoThe6qo', title: 'Nicos Weg – Ep. 2: Die Wohnung' },
  { id: 'zmAUPwb89c0', title: 'Nicos Weg – Ep. 3: Der Supermarkt' },
  { id: 'H6I85wc8H3I', title: 'Nicos Weg – Ep. 4: Die Familie' },
  // Extra auf Deutsch
  { id: 'kZhSAffTLFQ', title: 'Extra – Folge 1: Ein Freund aus Amerika' },
  { id: '9dgyuTCugyw', title: 'Extra – Folge 2: Sam geht einkaufen' },
  { id: '_IxMzOZRRvM', title: 'Extra – Folge 3: Sam hat Hunger' },
  // Vlogy a prechádzky
  { id: 'uzNrP5ZyH0A', title: 'Learn German the Natural Way - Walk & Talk Through the City' },
  { id: 'qGBJYuCoamg', title: 'Bananenbrot backen - Interaktiver Kochkurs' },
  { id: 'jwNJ8pE4ol0', title: 'Wie man Schokolade macht | SWR Handwerkskunst' },
  // Easy German
  { id: 'D91icSuPYQ4', title: 'Supermarket in Slow German (Super Easy German 288)' },
];

main().catch(err => { console.error(err); process.exit(1); });
