#!/usr/bin/env node
/**
 * fix-segment-titles.cjs
 * ─────────────────────
 * 1. Finds ALL segment files in src/data/video-database/
 * 2. Re-generates any "Teil X" titles via Gemini 2.5 Flash-lite
 * 3. Adds `segmentContext` (first ~1500 chars of transcript text per segment)
 *    so AI conversations have full context without a second file read.
 *
 * Usage:
 *   node scripts/fix-segment-titles.cjs
 */

const fs   = require('fs');
const path = require('path');

const DB_DIR = path.join(__dirname, '..', 'src', 'data', 'video-database');

// ─── Load .env ────────────────────────────────────────────────────────────────
const envPath = path.join(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8')
    .split('\n')
    .filter(l => l.trim() && !l.startsWith('#'))
    .forEach(l => {
      const [k, ...rest] = l.split('=');
      if (k && !process.env[k.trim()]) {
        process.env[k.trim()] = rest.join('=').trim().replace(/"/g, '');
      }
    });
}

async function getAI() {
  const { GoogleGenAI } = await import('@google/genai');
  return new GoogleGenAI({ apiKey: process.env.VITE_GEMINI_API_KEY });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ─── Regenerate a single title ────────────────────────────────────────────────
async function genTitle(ai, segText) {
  const res = await ai.models.generateContent({
    model: 'gemini-2.5-flash-lite',
    contents: `Analyze this German video transcript segment. Return ONLY a very short 2–4 word topic title in German (e.g. "Am Flughafen", "Begrüßung und Vorstellung", "Essen bestellen"). No quotes, no markdown, no extra text.\n\nTranscript:\n${segText.substring(0, 3000)}`,
    config: { temperature: 0.1 },
  });
  return (res.text || '').replace(/["']/g, '').trim();
}

// ─── Process one segment file ─────────────────────────────────────────────────
async function processSegmentFile(ai, segFile) {
  const videoId = path.basename(segFile).replace(' - segments.json', '');
  const transcriptFile = path.join(DB_DIR, `${videoId}.json`);

  if (!fs.existsSync(transcriptFile)) {
    console.warn(`  ⚠  No transcript file for ${videoId}, skipping.`);
    return;
  }

  const segData   = JSON.parse(fs.readFileSync(segFile, 'utf8'));
  const transData = JSON.parse(fs.readFileSync(transcriptFile, 'utf8'));
  const transcript = transData.transcript || [];

  let changed = false;
  const repaired = [];

  for (let si = 0; si < segData.segments.length; si++) {
    const seg = { ...segData.segments[si] };

    // Build segment transcript text regardless (for context field)
    const segLines = transcript.filter(
      t => t.offset >= seg.startTimeMs && t.offset <= seg.endTimeMs
    );
    const segText = segLines.map(t => t.text).join(' ');

    // Add context field if missing or empty
    if (!seg.segmentContext) {
      seg.segmentContext = segText.substring(0, 1500);
      changed = true;
    }

    // Fix "Teil X" titles
    if (/^Teil\s+\d+$/i.test(seg.topicDescription)) {
      process.stdout.write(
        `  🔧 [${videoId}] Segment ${si + 1}/${segData.segments.length} "${seg.topicDescription}" → generating… `
      );
      try {
        const newTitle = await genTitle(ai, segText);
        if (newTitle) {
          seg.topicDescription = newTitle;
          process.stdout.write(`✔ "${newTitle}"\n`);
          changed = true;
        } else {
          process.stdout.write(`⚠ empty response, keeping original\n`);
        }
      } catch (err) {
        process.stdout.write(`❌ ${err.message}\n`);
      }
      await sleep(300); // be respectful to the API
    }

    repaired.push(seg);
  }

  if (changed) {
    segData.segments = repaired;
    fs.writeFileSync(segFile, JSON.stringify(segData, null, 2), 'utf8');
    console.log(`  💾 Saved ${path.basename(segFile)}`);
  } else {
    console.log(`  ✔  ${path.basename(segFile)} — all segments already have titles + context.`);
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  if (!process.env.VITE_GEMINI_API_KEY) {
    console.error('❌ VITE_GEMINI_API_KEY not found. Add it to your .env file.');
    process.exit(1);
  }

  const ai = await getAI();
  const segFiles = fs.readdirSync(DB_DIR)
    .filter(f => f.endsWith(' - segments.json'))
    .map(f => path.join(DB_DIR, f));

  console.log(`\n🔧 Fixing ${segFiles.length} segment files…\n`);

  for (const segFile of segFiles) {
    const id = path.basename(segFile).replace(' - segments.json', '');
    console.log(`▶ ${id}`);
    await processSegmentFile(ai, segFile);
    console.log('');
  }

  console.log('✅ All segment files fixed!');
}

main().catch(err => { console.error(err); process.exit(1); });
