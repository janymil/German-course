import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const TIMESTAMPS_FILE = path.join(__dirname, 'ebook-timestamps.json');
const EBOOKS_FILE     = path.join(projectRoot, 'src', 'data', 'ebooks.js');
const BACKUP_FILE     = EBOOKS_FILE + '.bak';

if (!fs.existsSync(TIMESTAMPS_FILE)) {
    console.error('ERROR: ebook-timestamps.json not found. Run generate-ebook-timestamps.mjs first.');
    process.exit(1);
}

const allTimestamps = JSON.parse(fs.readFileSync(TIMESTAMPS_FILE, 'utf8'));

const { EBOOKS } = await import('../src/data/ebooks.js');

// Build lookup: de text -> { startTime, endTime }
const tsMap = new Map();
for (const ebook of EBOOKS) {
    for (const chapter of ebook.chapters) {
        const key = `${ebook.id}_${chapter.id}`;
        const tsArray = allTimestamps[key];
        if (!tsArray) continue;
        for (const s of tsArray) {
            if (s.startTime !== undefined && !tsMap.has(s.de)) {
                tsMap.set(s.de, { startTime: s.startTime, endTime: s.endTime });
            }
        }
    }
}
console.log(`Built lookup for ${tsMap.size} unique sentences.`);

const source = fs.readFileSync(EBOOKS_FILE, 'utf8');
fs.writeFileSync(BACKUP_FILE, source, 'utf8');
console.log(`Backup written to ${BACKUP_FILE}`);

// Line-by-line injection
// Source lines look like:  { de: "...", sk: "...", format: "normal" },
// Property names are UNQUOTED (JS object literal, not JSON)
const lines = source.split('\n');
let injected = 0;
let alreadyPresent = 0;

const updated = lines.map(line => {
    if (line.includes('startTime:')) { alreadyPresent++; return line; }

    // Match unquoted `de:` property  (JS object literal style)
    const m = line.match(/\bde:\s*"((?:[^"\\]|\\.)*)"/);
    if (!m) return line;

    const deTxt = m[1];
    const ts = tsMap.get(deTxt);
    if (!ts) return line;

    const lastBrace = line.lastIndexOf('}');
    if (lastBrace === -1) return line;

    injected++;
    return line.slice(0, lastBrace)
        + `, startTime: ${ts.startTime.toFixed(2)}, endTime: ${ts.endTime.toFixed(2)}`
        + line.slice(lastBrace);
});

fs.writeFileSync(EBOOKS_FILE, updated.join('\n'), 'utf8');
console.log(`Injected    : ${injected} sentences`);
console.log(`Already had : ${alreadyPresent} (skipped)`);
console.log(`Updated     : ${EBOOKS_FILE}`);
