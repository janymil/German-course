#!/usr/bin/env node
/**
 * translate-srt.cjs
 * ─────────────────
 * Parses curated SRT files from public/srt/{id}.srt,
 * translates each line DE→SK via Google Translate (free API, same as preprocess-videos),
 * and writes public/srt/{id}-sk.json as { "0": "sk text", "1": "sk text", ... }
 *
 * Usage:
 *   node scripts/translate-srt.cjs               ← all SRT-enabled library videos
 *   node scripts/translate-srt.cjs XM8CXQ7e3j4   ← specific video ID
 */

const fs = require('fs');
const path = require('path');

const SRT_DIR = path.join(__dirname, '..', 'public', 'srt');
const CHUNK_SIZE = 30;
const DELAY_MS = 400; // be gentle with the free API

// ─── SRT Parser ─────────────────────────────────────────────────────────────

function parseSrt(srtText) {
  const normalized = srtText.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const blocks = normalized.split(/\n\s*\n/).filter(b => b.trim());
  const TURBOSCRIBE = /\(Transcribed by TurboScribe\.ai[^)]*\)\s*/gi;
  const HTML_TAGS = /<[^>]+>/g;

  function timestampToMs(ts) {
    const normalized2 = ts.replace(',', '.');
    const [time, ms] = normalized2.split('.');
    const [hh, mm, ss] = time.split(':').map(Number);
    return (hh * 3600 + mm * 60 + ss) * 1000 + Number((ms || '0').padEnd(3, '0').slice(0, 3));
  }

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
    let text = lines.slice(timeLine + 1).join(' ').trim();
    text = text.replace(HTML_TAGS, '').replace(TURBOSCRIBE, '').trim();
    if (!text) continue;
    entries.push({ offset: startMs, duration: endMs - startMs, text });
  }
  return entries;
}

// ─── Translator ──────────────────────────────────────────────────────────────

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function translateBatch(texts) {
  const qText = texts.join('\n');
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=de&tl=sk&dt=t&q=${encodeURIComponent(qText)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Translate API error: ${res.status}`);
  const data = await res.json();
  const full = data[0].map(x => x[0]).join('');
  const parts = full.split('\n').map(s => s.trim());
  while (parts.length < texts.length) parts.push('');
  return parts.slice(0, texts.length);
}

async function translateAll(lines) {
  const total = lines.length;
  console.log(`  🌐 Translating ${total} lines in chunks of ${CHUNK_SIZE}…`);
  const translations = {};
  for (let i = 0; i < total; i += CHUNK_SIZE) {
    const chunk = lines.slice(i, i + CHUNK_SIZE);
    const chunkNum = Math.floor(i / CHUNK_SIZE) + 1;
    const totalChunks = Math.ceil(total / CHUNK_SIZE);
    process.stdout.write(`    Chunk ${chunkNum}/${totalChunks}… `);
    try {
      const results = await translateBatch(chunk.map(e => e.text));
      results.forEach((sk, j) => { translations[String(i + j)] = sk; });
      console.log('✔');
    } catch (err) {
      console.log(`✘ (${err.message}) — retrying in 2s`);
      await sleep(2000);
      try {
        const results = await translateBatch(chunk.map(e => e.text));
        results.forEach((sk, j) => { translations[String(i + j)] = sk; });
        console.log('  Retry ✔');
      } catch (err2) {
        console.log(`  Retry ✘ — filling blanks for this chunk`);
        chunk.forEach((_, j) => { translations[String(i + j)] = ''; });
      }
    }
    if (i + CHUNK_SIZE < total) await sleep(DELAY_MS);
  }
  return translations;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function processId(id) {
  const srtPath = path.join(SRT_DIR, `${id}.srt`);
  const outPath = path.join(SRT_DIR, `${id}-sk.json`);

  if (!fs.existsSync(srtPath)) {
    console.log(`  ⚠  No SRT file found at ${srtPath} — skipping.`);
    return;
  }

  console.log(`\n── ${id} ─────────────────────────────────`);
  const srtText = fs.readFileSync(srtPath, 'utf8');
  const entries = parseSrt(srtText);
  console.log(`  ✔  Parsed ${entries.length} subtitle lines from SRT`);

  if (entries.length === 0) {
    console.log('  ⚠  No lines to translate.');
    return;
  }

  const translations = await translateAll(entries);
  fs.writeFileSync(outPath, JSON.stringify(translations, null, 2), 'utf8');
  console.log(`  💾 Saved ${Object.keys(translations).length} translations → ${path.relative(process.cwd(), outPath)}`);
}

async function main() {
  const arg = process.argv[2];

  if (arg) {
    await processId(arg);
  } else {
    // All SRT files in public/srt/
    const ids = fs.readdirSync(SRT_DIR)
      .filter(f => f.endsWith('.srt'))
      .map(f => f.replace('.srt', ''));
    console.log(`Found ${ids.length} SRT file(s): ${ids.join(', ')}`);
    for (const id of ids) {
      await processId(id);
    }
  }

  console.log('\n✅ Done.');
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
