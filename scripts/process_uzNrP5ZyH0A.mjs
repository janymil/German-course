import fs from 'fs';
import path from 'path';
import { GoogleGenAI } from '@google/genai';

// ─── SRT PARSER (copied from src/utils/parseSrt.js for simplicity or import) ───
const TURBOSCRIBE_WATERMARK = /\(Transcribed by TurboScribe\.ai[^)]*\)\s*/gi;
const HTML_TAGS = /<[^>]+>/g;

function timestampToMs(ts) {
  const normalized = ts.replace(',', '.');
  const [time, ms] = normalized.split('.');
  const [hh, mm, ss] = time.split(':').map(Number);
  return (hh * 3600 + mm * 60 + ss) * 1000 + Number((ms || '0').padEnd(3, '0').slice(0, 3));
}

function parseSrt(srtText) {
  const normalized = srtText.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const blocks = normalized.split(/\n\s*\n/).filter(b => b.trim());
  const entries = [];

  for (const block of blocks) {
    const lines = block.trim().split('\n');
    if (lines.length < 2) continue;
    let timeLine = -1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('-->')) { timeLine = i; break; }
    }
    if (timeLine === -1) continue;

    const [startStr, endStr] = lines[timeLine].split('-->').map(s => s.trim());
    const startMs = timestampToMs(startStr);
    const endMs = timestampToMs(endStr);
    if (isNaN(startMs) || isNaN(endMs) || endMs <= startMs) continue;

    const textLines = lines.slice(timeLine + 1);
    let text = textLines.join(' ').trim();
    text = text.replace(HTML_TAGS, '');
    text = text.replace(TURBOSCRIBE_WATERMARK, '');
    text = text.trim();
    if (!text) continue;

    entries.push({ offset: startMs, duration: endMs - startMs, text });
  }
  return entries;
}

// ─── TRANSLATION ───
const CHUNK_SIZE = 30;
function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

async function translateBatch(texts) {
  const qText = texts.join('\n');
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=de&tl=sk&dt=t&q=${encodeURIComponent(qText)}`;
  const res = await fetch(url);
  const data = await res.json();
  const full = data[0].map(x => x[0]).join('');
  const parts = full.split('\n').map(s => s.trim());
  while (parts.length < texts.length) parts.push('');
  return parts.slice(0, texts.length);
}

async function translateAll(transcript) {
  console.log(`Translating ${transcript.length} lines in chunks of ${CHUNK_SIZE}…`);
  const translations = {};
  const chunks = [];
  for (let i = 0; i < transcript.length; i += CHUNK_SIZE) {
    chunks.push({ start: i, texts: transcript.slice(i, i + CHUNK_SIZE).map(t => t.text) });
  }

  for (let ci = 0; ci < chunks.length; ci++) {
    const { start, texts } = chunks[ci];
    try {
      const translated = await translateBatch(texts);
      translated.forEach((sk, i) => { if (sk) translations[start + i] = sk; });
      console.log(`Chunk ${ci + 1}/${chunks.length} success`);
    } catch (err) {
      console.log(`FAILED chunk ${ci + 1}, retrying individually…`);
      for (let i = 0; i < texts.length; i++) {
        try {
          const [t] = await translateBatch([texts[i]]);
          if (t) translations[start + i] = t;
          await sleep(150);
        } catch (e2) {}
      }
    }
    await sleep(200);
  }
  return translations;
}

// ─── MAIN ───
async function main() {
  const videoId = 'uzNrP5ZyH0A';
  const outDir = 'c:/Users/USER/Documents/GERMAN/src/data/video-database';
  const srtPath = 'c:/Users/USER/Documents/GERMAN/srt/Learn German the Natural Way _ Walk & Talk Through the City (Comprehensible Input for Beginners).srt';
  const envPath = 'c:/Users/USER/Documents/GERMAN/.env';
  
  if (fs.existsSync(envPath)) {
    fs.readFileSync(envPath, 'utf8')
      .split('\n')
      .filter(line => line.trim() && !line.startsWith('#'))
      .forEach(line => {
        const [key, ...rest] = line.split('=');
        if (key) {
          const value = rest.join('=').trim().replace(/"/g, '');
          if (value && !process.env[key.trim()]) process.env[key.trim()] = value;
        }
      });
  }

  const srtData = fs.readFileSync(srtPath, 'utf8');
  const transcript = parseSrt(srtData);
  console.log(`Parsed SRT, got ${transcript.length} entries.`);

  const translations = await translateAll(transcript);
  console.log(`Translated ${Object.keys(translations).length} entries.`);

  const mainDbFile = path.join(outDir, `${videoId}.json`);
  fs.writeFileSync(mainDbFile, JSON.stringify({
    videoId,
    processedAt: new Date().toISOString(),
    transcript,
    translations
  }), 'utf8');
  console.log(`Saved ${mainDbFile}`);

  // ─── SEGMENTATION ───
  const TARGET_CHUNK_MS = 5 * 60 * 1000;
  const segments = [];
  let currentSegmentStartIdx = 0;

  for (let i = 0; i < transcript.length; i++) {
    const line = transcript[i];
    const segmentDuration = line.offset - transcript[currentSegmentStartIdx].offset;

    // We do chunks of ~3-5 min since it's a 15-minute video.
    if (segmentDuration >= 3 * 60 * 1000 || i === transcript.length - 1) {
      const text = line.text.trim();
      const isEndOfSentence = /[.?!]$/.test(text) || /[.?!]["'„“]$/.test(text);

      if (isEndOfSentence || segmentDuration > 5 * 60 * 1000 || i === transcript.length - 1) {
        segments.push({
          startTimeMs: transcript[currentSegmentStartIdx].offset,
          endTimeMs: line.offset + line.duration,
          topicDescription: `Teil ${segments.length + 1}`
        });
        currentSegmentStartIdx = i + 1;
      }
    }
  }

  // Get topics and exercises from Gemini
  const ai = new GoogleGenAI({ apiKey: process.env.VITE_GEMINI_API_KEY });
  const allExercises = [];

  for (let j=0; j<segments.length; j++) {
    const seg = segments[j];
    const segText = transcript
      .filter(t => t.offset >= seg.startTimeMs && t.offset <= seg.endTimeMs)
      .map(t => t.text)
      .join(' ')
      .substring(0, 5000);

    // Get Title
    const aiTitle = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite',
      contents: `Analyze this video transcript segment. Return ONLY a very short, simple 2-4 word topic title in German summarizing what is happening. No quotes.\n\nTranscript:\n${segText}`,
      config: { temperature: 0.1 }
    });
    const topicTitle = (aiTitle.text || '').replace(/["']/g, '').trim();
    seg.topicDescription = topicTitle || `Teil ${j+1}`;

    console.log(`Segment ${j+1} title: ${seg.topicDescription}`);

    // Get Exercises
    const prompt = `Du bist ein erfahrener Deutschlehrer (Niveau A1). Generiere 5 einfache Übungen (JSON-Format) basierend auf diesem Transkript-Segment.

Transkript-Segment:
"${segText}"

Generiere exakt 5 Übungen. Die Übungsarten müssen eine Mischung sein aus "mcq", "fill" und "wordorder".
Das zurückgegebene JSON muss strikt folgendes Format haben:
[
  {
    "type": "mcq",
    "question": "Frage auf Deutsch?",
    "options": ["A", "B", "C", "D"],
    "answer": 0, // Index der richtigen Antwort in Optionen (0-3)
    "explanation": "Slovenské vysvetlenie prečo je táto odpoveď správna."
  },
  {
    "type": "fill",
    "sentence": "Deutscher Satz mit ___ in der Mitte.",
    "answer": "richtiges", // Das korrekte Wort
    "explanation": "Slovenské vysvetlenie (prečo toto slovo)."
  },
  {
    "type": "wordorder",
    "words": ["Guten", "Tag", "Anna"], // gemischte Wörter
    "correct": "Guten Tag Anna", // korrekter Satz ohne Punkt
    "explanation": "Slovenské vysvetlenie poradia slov."
  }
]

WICHTIG:
- Alles außer 'explanation' muss auf Deutsch sein.
- 'explanation' MUSS zwingend auf Slowakisch sein.
- Gib NUR validen JSON-Code zurück, sonst nichts (KEINE Markdown-Blöcke).
`;

    const aiExercises = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite',
      contents: prompt,
      config: { temperature: 0.2 }
    });

    let exercisesJsonStr = aiExercises.text;
    exercisesJsonStr = exercisesJsonStr.replace(/^```json\s*/, '').replace(/```$/, '').trim();
    
    let exercises = [];
    try {
      exercises = JSON.parse(exercisesJsonStr);
    } catch (e) {
      console.error(`Failed to parse JSON for segment ${j+1}`, exercisesJsonStr.substring(0, 100));
    }
    
    // Slovak translation of the title
    const aiDesc = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite',
      contents: `Prelož nasledujúci nemecký názov do slovenčiny, krátko a jednoducho:\n"${seg.topicDescription}"`
    });
    const slovakDesc = (aiDesc.text || '').trim();

    allExercises.push({
      title: seg.topicDescription,
      description: slovakDesc,
      exercises: exercises
    });
    
    await sleep(1000); // rate limit pause
  }

  const segmentDbFile = path.join(outDir, `${videoId}-segments.json`);
  fs.writeFileSync(segmentDbFile, JSON.stringify({ segments }, null, 2), 'utf8');
  console.log(`Saved ${segmentDbFile}`);

  const exerciseDbFile = path.join(outDir, `${videoId}-exercises.json`);
  fs.writeFileSync(exerciseDbFile, JSON.stringify({ topics: allExercises }, null, 2), 'utf8');
  console.log(`Saved ${exerciseDbFile}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
