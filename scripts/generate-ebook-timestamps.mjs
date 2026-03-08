/**
 * generate-ebook-timestamps.mjs
 *
 * Uses the OpenAI Whisper API to build sentence-level timestamps for all
 * ebook chapters that have an audioSrc.
 *
 * Alignment strategy:
 *   Whisper returns natural segments (phrases/sentences). We match each
 *   ebooks.js sentence to one or more consecutive Whisper segments using
 *   token-overlap scoring, advancing sequentially through both arrays.
 *   Segment start/end times are used directly — no word-level guesswork.
 *
 * Output:  scripts/ebook-timestamps.json
 *
 * Usage:
 *   node scripts/generate-ebook-timestamps.mjs
 *   node scripts/generate-ebook-timestamps.mjs ebook_01 ch_01   ← single chapter (force re-run)
 */

import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '.env') });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const OUTPUT_FILE = path.join(__dirname, 'ebook-timestamps.json');

const { EBOOKS } = await import('../src/data/ebooks.js');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ─── Text normalisation ───────────────────────────────────────────────────────
function normTokens(str = '') {
    return str
        .toLowerCase()
        .replace(/[.,!?;:"„"''`()\-–—«»]/g, ' ')
        .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
        .split(/\s+/)
        .filter(t => t.length > 1);   // ignore single-char tokens
}

// Dice coefficient: 2 * |A∩B| / (|A|+|B|)
function dice(setA, setB) {
    if (setA.size === 0 && setB.size === 0) return 1;
    if (setA.size === 0 || setB.size === 0) return 0;
    let inter = 0;
    for (const t of setA) if (setB.has(t)) inter++;
    return (2 * inter) / (setA.size + setB.size);
}

// ─── Segment-based alignment ──────────────────────────────────────────────────
/**
 * Match each sentence to one or more consecutive Whisper segments.
 *
 * Steps:
 *  1. Build a merged "super-segment" pool: each item is one or two adjacent
 *     Whisper segments joined together (covers cases where Whisper splits what
 *     our source treats as one sentence).
 *  2. For each source sentence, pick the best-scoring super-segment using
 *     Dice coefficient, but only look ahead from the previous match position.
 *  3. Record start = first segment's start, end = last segment's end.
 */
function alignSentences(sentences, whisperSegments) {
    if (!whisperSegments || whisperSegments.length === 0) {
        console.warn('    ⚠ No Whisper segments returned');
        return sentences;
    }

    // Pre-compute token sets for segments (single + pair merges)
    const segTokens = whisperSegments.map(s => new Set(normTokens(s.text)));

    // Build windows: [single segment] and [pair of adjacent segments]
    const windows = [];
    for (let i = 0; i < whisperSegments.length; i++) {
        windows.push({ start: whisperSegments[i].start, end: whisperSegments[i].end, tokens: segTokens[i], from: i, to: i });
        if (i + 1 < whisperSegments.length) {
            const merged = new Set([...segTokens[i], ...segTokens[i + 1]]);
            windows.push({ start: whisperSegments[i].start, end: whisperSegments[i + 1].end, tokens: merged, from: i, to: i + 1 });
        }
    }

    const result = [];
    let segCursor = 0;   // we only look forward from here

    for (const sentence of sentences) {
        const sentSet = new Set(normTokens(sentence.de));

        if (sentSet.size === 0) {
            result.push({ ...sentence });
            continue;
        }

        // Score all windows starting at or after segCursor
        let bestScore = -1;
        let bestWin = null;
        const LOOKAHEAD = 8; // don't look more than 8 windows ahead

        for (let wi = 0; wi < windows.length; wi++) {
            const w = windows[wi];
            if (w.to < segCursor) continue;    // only forward
            if (w.from > segCursor + LOOKAHEAD) break; // don't look too far

            const score = dice(sentSet, w.tokens);
            if (score > bestScore) {
                bestScore = score;
                bestWin = w;
            }
        }

        if (bestWin && bestScore > 0.1) {
            result.push({
                ...sentence,
                startTime: parseFloat(bestWin.start.toFixed(2)),
                endTime:   parseFloat(bestWin.end.toFixed(2)),
            });
            segCursor = bestWin.to; // advance cursor to end of matched window
        } else {
            // No good match — inherit previous end time as start, leave endTime undefined
            const prev = result[result.length - 1];
            if (prev?.endTime !== undefined) {
                result.push({
                    ...sentence,
                    startTime: prev.endTime,
                    endTime:   prev.endTime + 2.0,
                });
            } else {
                result.push({ ...sentence });
            }
        }
    }

    return result;
}

// ─── Whisper API call ─────────────────────────────────────────────────────────
async function transcribeChapter(audioPath, promptText) {
    console.log(`  → Whisper API: ${path.basename(audioPath)}`);
    const response = await openai.audio.transcriptions.create({
        file: fs.createReadStream(audioPath),
        model: 'whisper-1',
        response_format: 'verbose_json',
        timestamp_granularities: ['segment'],
        language: 'de',
        prompt: promptText.slice(0, 200),
    });
    return response.segments || [];
}


// ---------- Main ----------
const [filterEbookId, filterChapterId] = process.argv.slice(2);

// Load existing output if it exists (to resume / skip already done)
let allTimestamps = {};
if (fs.existsSync(OUTPUT_FILE)) {
    allTimestamps = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'));
}

let processed = 0;
let skipped = 0;

for (const ebook of EBOOKS) {
    if (filterEbookId && ebook.id !== filterEbookId) continue;

    for (const chapter of ebook.chapters) {
        if (filterChapterId && chapter.id !== filterChapterId) continue;

        const key = `${ebook.id}_${chapter.id}`;

        if (!chapter.audioSrc) {
            console.log(`[SKIP] ${key} — no audioSrc`);
            skipped++;
            continue;
        }
        if (!chapter.sentences || chapter.sentences.length === 0) {
            console.log(`[SKIP] ${key} — no sentences`);
            skipped++;
            continue;
        }
        if (allTimestamps[key] && !filterChapterId) {
            console.log(`[SKIP] ${key} — already in output (use chapter filter to re-process)`);
            skipped++;
            continue;
        }

        // Resolve audio path: audioSrc is like "/ebooks/A1-.../file.mp3"
        const audioRelPath = chapter.audioSrc.replace(/^\//, '');
        const audioPath = path.join(projectRoot, 'public', audioRelPath);

        if (!fs.existsSync(audioPath)) {
            console.warn(`[WARN] ${key} — audio file not found: ${audioPath}`);
            skipped++;
            continue;
        }

        console.log(`\n[PROCESS] ${key}: ${chapter.title}`);
        console.log(`           ${chapter.sentences.length} sentences, audio: ${path.basename(audioPath)}`);

        try {
            const promptText = chapter.sentences.map(s => s.de).join(' ');
            const segments = await transcribeChapter(audioPath, promptText);

            console.log(`  ✓ Whisper returned ${segments.length} segments`);
            if (segments.length > 0) {
                console.log(`    first: [${segments[0].start.toFixed(2)}-${segments[0].end.toFixed(2)}] "${segments[0].text.trim().slice(0,60)}"`);
                console.log(`    last:  [${segments.at(-1).start.toFixed(2)}-${segments.at(-1).end.toFixed(2)}] "${segments.at(-1).text.trim().slice(0,60)}"`);
            }

            const aligned = alignSentences(chapter.sentences, segments);

            const withTs = aligned.filter(s => s.startTime !== undefined && s.endTime - s.startTime > 0.15).length;
            console.log(`  ✓ Aligned ${withTs}/${aligned.length} sentences with usable timestamps`);

            allTimestamps[key] = aligned;

            fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allTimestamps, null, 2), 'utf8');
            console.log(`  ✓ Saved to ${OUTPUT_FILE}`);
            processed++;

        } catch (err) {
            console.error(`  ✗ Error: ${err.message}`);
        }
    }
}

console.log(`\nDone. Processed: ${processed}, Skipped: ${skipped}`);
console.log(`Output: ${OUTPUT_FILE}`);
console.log(`\nNext step: run  node scripts/apply-ebook-timestamps.mjs  to merge into ebooks.js`);
