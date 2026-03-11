const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('parsed_glossary.html', 'utf8');
const \$ = cheerio.load(html);

const lines = [];
\tr.each((i, row) => {
  const cells = \.find('td');
  if (cells.length >= 2) {
    const col1 = \.text().trim().replace(/\s+/g, ' ');
    const col2 = \.text().trim().replace(/\s+/g, ' ');
    if (col1 || col2) {
      lines.push([col1, col2]);
    }
  }
});

let lektionStr = '';
const chapters = [];
let currentChap = null;

for (let i = 0; i < lines.length; i++) {
  const [c1, c2] = lines[i];
  if (c1.startsWith('Lektion ') && c2 === '') {
    const id = c1.toLowerCase().replace(' ', '_');
    currentChap = { id: 'momente_' + id, title: c1, vocab: [] };
    chapters.push(currentChap);
    continue;
  }
  
  if (!currentChap) continue;
  
  // Skip numbers
  if (c1.match(/^[0-9]+$/) || c1 === '') {
    continue;
  }
  
  let de = c1;
  let sk = c2; 
  
  let gender = null;
  if (/^der\b/i.test(de)) gender = 'M';
  else if (/^die\b/i.test(de)) gender = 'F';
  else if (/^das\b/i.test(de)) gender = 'N';
  
  currentChap.vocab.push({ de, sk, gender });
}

let out = export const momenteDeck = {
  id: 'momente_a1_1',
  title: 'Momente A1.1',
  description: 'Slovícka z knihy Momente A1.1 (DE-EN)',
  chapters: [
    {
      id: 'mom_all',
      title: 'Všetky lekcie',
      vocab: []
    },
;

chapters.forEach(ch => {
  out += \    {
      id: '\',
      title: '\',
      vocab: \
    },\n\;
});

out += \  ]
};\n\;
out += \momenteDeck.chapters[0].vocab = momenteDeck.chapters.slice(1).flatMap(c => c.vocab.map(v => ({...v, source:'momente_a1'})));\n\;

fs.writeFileSync('src/data/decks/momente_a1_1.js', out, 'utf8');
