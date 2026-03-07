#!/usr/bin/env node
/**
 * generate-video-exercises.cjs
 * ────────────────────────────
 * Pre-generates language exercises for all 7 library videos using Gemini.
 * Reads existing {videoId}-segments.json files (must already exist from preprocess-videos.cjs)
 * and writes {videoId}-exercises.json to src/data/video-database/.
 *
 * Usage:
 *   node scripts/generate-video-exercises.cjs           ← process all library videos
 *   node scripts/generate-video-exercises.cjs <videoId> ← process one video
 *   node scripts/generate-video-exercises.cjs --force   ← regenerate even if file exists
 */

const fs = require('fs');
const path = require('path');

// Load .env
const envPath = path.join(process.cwd(), '.env');
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

const GEMINI_API_KEY = process.env.VITE_GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
    console.error('❌ VITE_GEMINI_API_KEY not found in .env');
    process.exit(1);
}

const DB_DIR = path.join(process.cwd(), 'src', 'data', 'video-database');

const VIDEO_IDS = [
    '4-eDoThe6qo',
    'XM8CXQ7e3j4',
    'zmAUPwb89c0',
    'H6I85wc8H3I',
    'kZhSAffTLFQ',
    '9dgyuTCugyw',
    '_IxMzOZRRvM',
];

const FORCE = process.argv.includes('--force');
const SINGLE = process.argv.find(a => !a.startsWith('-') && !a.includes('generate-video') && a !== process.argv[0] && a !== process.argv[1]);
const TARGET_IDS = SINGLE ? [SINGLE] : VIDEO_IDS;

// ── Gemini call (native fetch, no SDK needed) ────────────────────────────────
async function callGemini(prompt) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${GEMINI_API_KEY}`;
    const body = JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.3 }
    });

    let res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });

    // Fallback to gemini-2.5-flash-lite if it fails
    if (!res.ok) {
        const fallbackUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${GEMINI_API_KEY}`;
        res = await fetch(fallbackUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
    }

    if (!res.ok) throw new Error(`Gemini HTTP ${res.status}: ${await res.text()}`);

    const data = await res.json();
    let text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    // Strip markdown fences if present
    text = text.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();
    return text;
}

// ── Build prompt from segments ───────────────────────────────────────────────
function buildPrompt(segments) {
    const segmentSummary = segments.map((seg, i) =>
        `[Kapitel ${i + 1}: "${seg.topicDescription}"]\n${(seg.segmentContext || '').slice(0, 700)}`
    ).join('\n\n');

    return `Du bist ein Deutschlehrer und erstellst Übungen für ein Lernvideo.

Hier sind die Transkripte der Kapitel aus dem Video:

${segmentSummary}

Analysiere das gesamte Vokabular und die Grammatikstrukturen in allen Kapiteln.
Identifiziere alle SPRACHLICHEN THEMEN die für Deutschlernende sinnvoll sind.
Beispiele: "Sich vorstellen", "Fragen stellen", "Orte beschreiben", "Zahlen und Mengen", etc.
Erstelle so viele Themen wie der Inhalt hergibt — weder zu wenige noch künstlich aufgeblasen.

Für jedes Thema erstelle so viele Übungen wie sinnvoll sind (mindestens 3, so viele wie nötig um das Thema gut zu üben).
Verwende eine Mischung aus den Typen: "mcq", "fill", "wordorder".

Regeln:
- Verwende nur Vokabular und Sätze die TATSÄCHLICH im Transkript vorkommen
- Nur A1-Niveau
- MCQ: immer genau 4 Optionen, answer = 0-basierter Index der richtigen Option
- Fill: ___ als Lücke, answer = das exakte fehlende Wort
- Wordorder: words = gemischte Token des Satzes, correct = der korrekte Satz ohne Satzzeichen als Token
- description = kurze Beschreibung auf Slowakisch was geübt wird

Antworte NUR mit gültigem JSON ohne Markdown-Formatierung:
{
  "topics": [
    {
      "title": "string",
      "description": "string (slowakisch)",
      "exercises": [
        { "type": "mcq", "question": "...", "options": ["","","",""], "answer": 0, "explanation": "..." },
        { "type": "fill", "sentence": "Ich ___ Sam.", "answer": "heiße", "explanation": "..." },
        { "type": "wordorder", "words": ["komme","ich","aus","Amerika"], "correct": "ich komme aus Amerika", "explanation": "..." }
      ]
    }
  ]
}`;
}

// ── Process one video ────────────────────────────────────────────────────────
async function processVideo(videoId) {
    const segFile = path.join(DB_DIR, `${videoId} - segments.json`);
    const outFile = path.join(DB_DIR, `${videoId}-exercises.json`);

    if (!fs.existsSync(segFile)) {
        console.log(`  ⚠️  No segments file found for ${videoId} — run preprocess-videos.cjs first`);
        return;
    }

    if (fs.existsSync(outFile) && !FORCE) {
        const existing = JSON.parse(fs.readFileSync(outFile, 'utf8'));
        const topicCount = existing?.topics?.length || 0;
        const exCount = existing?.topics?.reduce((n, t) => n + (t.exercises?.length || 0), 0) || 0;
        console.log(`  ✓ Already exists — ${topicCount} topics, ${exCount} exercises (use --force to regenerate)`);
        return;
    }

    const { segments } = JSON.parse(fs.readFileSync(segFile, 'utf8'));
    if (!segments?.length) {
        console.log(`  ⚠️  Empty segments in ${videoId}`);
        return;
    }

    console.log(`  📡 Sending ${segments.length} segments to Gemini…`);
    const prompt = buildPrompt(segments);
    const rawJson = await callGemini(prompt);

    let data;
    try {
        data = JSON.parse(rawJson);
    } catch (e) {
        console.error(`  ❌ JSON parse failed for ${videoId}:`, e.message);
        console.error('  Raw response:', rawJson.slice(0, 300));
        return;
    }

    if (!data?.topics?.length) {
        console.error(`  ❌ No topics returned for ${videoId}`);
        return;
    }

    const exCount = data.topics.reduce((n, t) => n + (t.exercises?.length || 0), 0);
    fs.writeFileSync(outFile, JSON.stringify(data, null, 2));
    console.log(`  💾 Saved — ${data.topics.length} topics, ${exCount} exercises → ${path.basename(outFile)}`);
}

// ── Main ─────────────────────────────────────────────────────────────────────
(async () => {
    console.log(`\n🎓 Generating video exercises for ${TARGET_IDS.length} video(s)${FORCE ? ' [--force]' : ''}…\n`);

    for (const videoId of TARGET_IDS) {
        console.log(`▶ ${videoId}`);
        try {
            await processVideo(videoId);
        } catch (err) {
            console.error(`  ❌ Error: ${err.message}`);
        }
    }

    console.log('\n✅ Done!\n');
})();
