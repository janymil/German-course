import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';
import Database from 'better-sqlite3';
import { manualCorrections } from './anki-dictionary.js';

const APKG_PATH = path.resolve('c:/Users/USER/Documents/GERMAN/ANKI/Nicos_Weg_A1_Deutsch_Welle_English.apkg');
const NEW_DB_PATH = path.resolve('c:/Users/USER/Documents/GERMAN/ANKI/collection.anki2'); // Users explicitly translated version
const TEMP_DIR = path.resolve('c:/Users/USER/Documents/GERMAN/tmp_anki_unzip');
const MEDIA_DIR = path.resolve('c:/Users/USER/Documents/GERMAN/public/media/anki');
const OUTPUT_DIR = path.resolve('c:/Users/USER/Documents/GERMAN/src/data');
const NICOS_JS_PATH = path.resolve('c:/Users/USER/Documents/GERMAN/src/data/decks/nicos_weg.js');
const DECKS_INDEX = path.resolve('c:/Users/USER/Documents/GERMAN/src/data/decks.js');

async function main() {
  console.log('Ensure output directories...');
  if (!fs.existsSync(MEDIA_DIR)) fs.mkdirSync(MEDIA_DIR, { recursive: true });
  if (!fs.existsSync(path.dirname(NICOS_JS_PATH))) fs.mkdirSync(path.dirname(NICOS_JS_PATH), { recursive: true });

  if (fs.existsSync(TEMP_DIR)) fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEMP_DIR, { recursive: true });

  console.log('Unzipping APKG to get media files...');
  const zip = new AdmZip(APKG_PATH);
  zip.extractAllTo(TEMP_DIR, true);

  console.log('Parsing Media map and copying files over...');
  const mediaMapStr = fs.readFileSync(path.join(TEMP_DIR, 'media'), 'utf8');
  const mediaMap = JSON.parse(mediaMapStr);

  for (const [fileId, filename] of Object.entries(mediaMap)) {
    const srcPath = path.join(TEMP_DIR, fileId);
    if (fs.existsSync(srcPath)) {
      // It's safer to copy rather than rename in case we want to re-run
      fs.copyFileSync(srcPath, path.join(MEDIA_DIR, filename));
    }
  }

  console.log(`Using user provided DB: ${NEW_DB_PATH}`);
  const db = new Database(NEW_DB_PATH);
  const notes = db.prepare('SELECT id, flds FROM notes').all();
  db.close();

  const chapters = {};

  console.log(`Found ${notes.length} notes. Processing...`);

  for (const note of notes) {
    const fields = note.flds.split('\x1f');
    let german = (fields[0] || '').trim();
    let skTranslation = (fields[1] || '').trim().replace(/<[^>]*>?/gm, ''); // strip any potential HTML from translation

    let audio = null;
    let img = null;

    if (fields[2]) {
      const audioMatch = fields[2].match(/\[sound:(.*?)\]/);
      if (audioMatch) audio = `/media/anki/${audioMatch[1]}`;
    }

    if (fields[3]) {
      const imgMatch = fields[3].match(/<img src="(.*?)">/);
      if (imgMatch) {
        img = `/media/anki/${imgMatch[1]}`;
      } else if (fields[3].endsWith('.jpg') || fields[3].endsWith('.png')) {
        img = `/media/anki/${fields[3]}`;
      }
    }

    let lessonTitle = (fields[4] || '').trim();
    if (!lessonTitle) lessonTitle = 'Všeobecné';

    if (!german || !skTranslation) continue;

    let finalPlural = undefined;
    if (german.includes(', die ')) {
      const parts = german.split(', die ');
      german = parts[0].trim();
      finalPlural = 'die ' + parts[1].trim();
    }
    if (german.startsWith('(etwas) ')) {
      german = german.replace('(etwas) ', '');
    }

    let finalSk = skTranslation.replace(/\(.*?\)/g, '').trim();
    let skParts = finalSk.split(/[;/]/).map(s => s.trim()).filter(Boolean);

    // Deduplicate Slovak string
    let seenLowercaseMap = new Set();
    let uniqueSk = [];
    for (const part of skParts) {
      if (!seenLowercaseMap.has(part.toLowerCase())) {
        seenLowercaseMap.add(part.toLowerCase());
        uniqueSk.push(part);
      }
    }

    if (uniqueSk.length > 0) {
      finalSk = uniqueSk.join(', ');
      if (german.endsWith('.')) finalSk = finalSk.charAt(0).toUpperCase() + finalSk.slice(1);
    } else {
      finalSk = skTranslation;
    }

    let finalExample = undefined;
    let finalExampleSk = undefined;

    // Apply manual override mapping
    const match = manualCorrections[german] || manualCorrections[german + ' (Plural)'];
    if (match) {
      finalSk = match.sk;
      finalExample = match.example;
      finalExampleSk = match.exampleSk;
    }

    if (!chapters[lessonTitle]) {
      chapters[lessonTitle] = [];
    }

    chapters[lessonTitle].push({
      de: german,
      sk: finalSk,
      plural: finalPlural,
      example: finalExample,
      exampleSk: finalExampleSk,
      audio,
      image: img,
      lessonTitle: lessonTitle,
      source: 'anki'
    });
  }

  const chaptersArray = [];

  let chapterIndex = 1;
  for (const [title, vocab] of Object.entries(chapters)) {
    // create safe filename from chapter title
    let safeName = title.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
    if (!safeName) safeName = 'general';

    const chapterId = `nicos_weg_c${chapterIndex}_${safeName}`;

    chaptersArray.push({
      id: chapterId,
      title: title,
      vocab: vocab
    });
    chapterIndex++;
  }

  const jsContent = `export const nicosWegDeck = {
  id: 'nicos_weg_a1',
  title: 'Nicos Weg A1',
  description: 'Kompletný Anki archív Nicos Weg (A1) od Deutsche Welle. Rozdelený podľa lekcií.',
  chapters: ${JSON.stringify(chaptersArray, null, 2)}
};
`;

  fs.writeFileSync(NICOS_JS_PATH, jsContent, 'utf8');

  console.log(`Writing global index array to ${DECKS_INDEX}...`);

  let decksJs = `import { LESSONS } from './curriculum';
import { nicosWegDeck as nwRawDeck } from './decks/nicos_weg';

const mainCourseChapters = LESSONS.map(l => ({
  id: l.id,
  title: l.title,
  vocab: l.vocab.map((v) => ({ ...v, lessonId: l.id, lessonTitle: l.title, source: 'lesson' }))
}));

export const mainCourseDeck = {
  id: 'main_course',
  title: 'Hlavný Kurz (Tvoj progres)',
  description: 'Všetky slovíčka a frázy, ktoré si stretol počas lekcií vo svojom progrese.',
  chapters: [
    {
      id: 'main_course_all',
      title: 'Všetky slovíčka dokopy',
      vocab: mainCourseChapters.flatMap(c => c.vocab)
    },
    ...mainCourseChapters
  ]
};

export const nicosWegDeck = {
  ...nwRawDeck,
  chapters: [
    {
      id: 'nicos_weg_all',
      title: 'Všetky lekcie dokopy',
      vocab: nwRawDeck.chapters.flatMap(c => c.vocab)
    },
    ...nwRawDeck.chapters
  ]
};

export const ALL_DECKS = [
  mainCourseDeck,
  nicosWegDeck
];
`;

  fs.writeFileSync(DECKS_INDEX, decksJs, 'utf8');

  console.log("Cleanup...");
  fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  console.log("Done!");
}

main().catch(console.error);
