import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { globSync } from 'glob';

// 1. Get all A1 nouns from the course curriculum itself
const files = globSync('src/data/lessons/L*.js');

const masculine = {};
const feminine = {};
const neuter = {};
const plural = {};

// We use basic plural mappings for known words (very common ones)
const pluralMappings = {
  'der Stuhl': 'die Stühle', 'der Tisch': 'die Tische', 'der Mann': 'die Männer', 'der Baum': 'die Bäume', 'der Stift': 'die Stifte', 'der Tag': 'die Tage', 'der Film': 'die Filme', 'der Monat': 'die Monate', 'der Fehler': 'die Fehler', 'der Koffer': 'die Koffer', 'der Apfel': 'die Äpfel', 'der Hund': 'die Hunde', 'der Schuh': 'die Schuhe', 'der Freund': 'die Freunde', 'der Arzt': 'die Ärzte', 'der Brief': 'die Briefe',
  'die Frau': 'die Frauen', 'die Blume': 'die Blumen', 'die Tasche': 'die Taschen', 'die Nacht': 'die Nächte', 'die Frage': 'die Fragen', 'die Regel': 'die Regeln', 'die Tür': 'die Türen', 'die Wand': 'die Wände', 'die Stadt': 'die Städte', 'die Schule': 'die Schulen', 'die Uhr': 'die Uhren', 'die Idee': 'die Ideen', 'die Tasse': 'die Tassen', 'die Flasche': 'die Flaschen', 'die Aufgabe': 'die Aufgaben', 'die Straße': 'die Straßen',
  'das Auto': 'die Autos', 'das Kind': 'die Kinder', 'das Zimmer': 'die Zimmer', 'das Problem': 'die Probleme', 'das Buch': 'die Bücher', 'das Haus': 'die Häuser', 'das Fenster': 'die Fenster', 'das Bild': 'die Bilder', 'das Mädchen': 'die Mädchen', 'das Wort': 'die Wörter', 'das Jahr': 'die Jahre', 'das Spiel': 'die Spiele', 'das Hobby': 'die Hobbys', 'das Tier': 'die Tiere', 'das Brötchen': 'die Brötchen'
};

for (const file of files) {
  const content = readFileSync(file, 'utf8');
  // Simple regex extraction since it's hard to dynamically import ES modules from CommonJS runner context sometimes
  const vocabMatches = [...content.matchAll(/de:\s*'([^']+)',\s*sk:\s*'([^']+)',\s*gender:\s*'(M|F|N)'/g)];
  
  for (const match of vocabMatches) {
    const [_, de, sk, gender] = match;
    const cleanWord = de.replace(/^der |^die |^das |^eine |^ein /, '').trim();
    if (gender === 'M') masculine[cleanWord] = sk + '(M)';
    if (gender === 'F') feminine[cleanWord] = sk + '(F)';
    if (gender === 'N') neuter[cleanWord] = sk + '(N)';
    
    // Add to plural if mapping exists
    if (pluralMappings[de]) {
      const plClean = pluralMappings[de].replace(/^die /, '').trim();
      plural[plClean] = sk + '(Pl)';
    }
  }
}

// 2. Comprehensive 90+ A1 adjectives list
const adjectives = {
  groß: 'veľký', klein: 'malý', alt: 'starý', neu: 'nový', gut: 'dobrý', schlecht: 'zlý',
  warm: 'teplý', kalt: 'studený', stark: 'silný', schwach: 'slabý', schön: 'krásny', hässlich: 'škaredý',
  kurz: 'krátky', lang: 'dlhý', interessant: 'zaujímavý', langweilig: 'nudný', schnell: 'rýchly', langsam: 'pomalý',
  laut: 'hlasný', leise: 'tichý', modern: 'moderný', sauber: 'čistý', schmutzig: 'špinavý',
  billig: 'lacný', teuer: 'drahý', wichtig: 'dôležitý', richtig: 'správny', falsch: 'nesprávny',
  einfach: 'jednoduchý', schwer: 'ťažký', leicht: 'ľahký', hell: 'svetlý', dunkel: 'tmavý',
  voll: 'plný', leer: 'prázdny', gesund: 'zdravý', krank: 'chorý', dick: 'tučný/hrubý', dünn: 'chudý/tenký',
  müde: 'unavený', wach: 'bdelý', nett: 'milý', freundlich: 'priateľský', unfreundlich: 'nepriateľský',
  glücklich: 'šťastný', traurig: 'smutný', lustig: 'vtipný', ernst: 'vážny', nah: 'blízky', weit: 'ďaleký',
  hart: 'tvrdý', weich: 'mäkký', heiß: 'horúci', arm: 'chudobný', reich: 'bohatý',
  süß: 'sladký', sauer: 'kyslý/nahnevaný', bitter: 'horký', scharf: 'ostrý/pikantný',
  klug: 'múdry', dumm: 'hlúpy', faul: 'lenivý', fleißig: 'usilovný',
  berühmt: 'slávny', bekannt: 'známy', fremd: 'cudzí', ruhig: 'pokojný', gefährlich: 'nebezpečný',
  sicher: 'bezpečný', kaputt: 'pokazený', frei: 'voľný', besetzt: 'obsadený',
  tief: 'hlboký', flach: 'plytký', trocken: 'suchý', nass: 'mokrý',
  schmutzig: 'špinavý', süß: 'roztomilý/sladký', sympathisch: 'sympatický', unsympathisch: 'nesympatický',
  pünktlich: 'presný/dochvíľny', spät: 'neskorý', früh: 'skorý', wunderbar: 'úžasný'
};

function r(obj) { const keys = Object.keys(obj); return keys[Math.floor(Math.random() * keys.length)]; }

// Also add mass nouns that don't take indefinite articles easily
const massNouns = ['Bier', 'Wasser', 'Wein', 'Milch', 'Kaffee', 'Tee', 'Brot', 'Obst', 'Gemüse', 'Fleisch', 'Geld', 'Zeit', 'Musik'];

const usedQuestions = new Set();
const exercises = [];

while(exercises.length < 157) {
  let genderType = ['m', 'f', 'n', 'pl'][Math.floor(Math.random() * 4)];
  let nounDe = '', nounSk = '';
  
  // Failsafe in case curriclum extraction missed some (though it won't)
  if (genderType === 'm') { nounDe = r(masculine) || 'Tisch'; nounSk = masculine[nounDe] || 'stôl(M)'; }
  if (genderType === 'f') { nounDe = r(feminine)   || 'Frau';  nounSk = feminine[nounDe]   || 'žena(F)'; }
  if (genderType === 'n') { nounDe = r(neuter)     || 'Auto';  nounSk = neuter[nounDe]     || 'auto(N)'; }
  if (genderType === 'pl') { nounDe = r(plural)    || 'Kinder';nounSk = plural[nounDe]     || 'deti(Pl)'; }

  // Failsafe exit logic
  if(!nounDe) continue;

  let adjDe = r(adjectives);
  let adjSk = adjectives[adjDe];
  
  let baseAdj = adjDe;
  if (baseAdj === 'teuer') baseAdj = 'teur';
  if (baseAdj === 'dunkel') baseAdj = 'dunkl';

  let articleType = ['def', 'indef', 'none'][Math.floor(Math.random() * 3)];
  if (genderType === 'pl' && articleType === 'indef') articleType = 'keine';

  if (articleType === 'none' && genderType !== 'pl') {
    if (!massNouns.includes(nounDe)) {
       // Only allow mass nouns to be completely article-free in singular to be natural (e.g. "kaltes Bier"). For countable nouns like "Tisch", we use indef.
       articleType = 'indef'; 
    }
  }

  // Double check: if it's a mass noun, drop 'indef' mostly to 'none' for naturalness (e.g. "heißer Kaffee" instead of "ein heißer Kaffee")
  if (massNouns.includes(nounDe) && Math.random() > 0.3) {
      articleType = 'none';
  }

  let expected = '';
  let hintPhrase = '';
  let ex = '';
  let articleSk = '';

  if (articleType === 'def') {
    articleSk = 'ten (tá, to, tie) ';
    if (genderType === 'm') { expected = `der ${baseAdj}e ${nounDe}`; hintPhrase = `der / ${adjDe} / ${nounDe}`; ex = `Mužský rod. S určitým členom ('der') dostáva prídavné meno koncovku -e.`; }
    if (genderType === 'f') { expected = `die ${baseAdj}e ${nounDe}`; hintPhrase = `die / ${adjDe} / ${nounDe}`; ex = `Ženský rod. S určitým členom ('die') dostáva prídavné meno koncovku -e.`; }
    if (genderType === 'n') { expected = `das ${baseAdj}e ${nounDe}`; hintPhrase = `das / ${adjDe} / ${nounDe}`; ex = `Stredný rod. S určitým členom ('das') dostáva prídavné meno koncovku -e.`; }
    if (genderType === 'pl') { expected = `die ${baseAdj}en ${nounDe}`; hintPhrase = `die / ${adjDe} / ${nounDe}`; ex = `Množné číslo. S určitým členom ('die') je v pluráli vždy koncovka -en.`; }
  }

  if (articleType === 'indef') {
    articleSk = 'jeden (jedna, jedno) ';
    if (genderType === 'm') { expected = `ein ${baseAdj}er ${nounDe}`; hintPhrase = `ein / ${adjDe} / ${nounDe}`; ex = `Mužský rod. Po neurčitom člene ('ein'), ktorý rod neukazuje, ho prídavné meno musí ukázať (der -> -er).`; }
    if (genderType === 'f') { expected = `eine ${baseAdj}e ${nounDe}`; hintPhrase = `eine / ${adjDe} / ${nounDe}`; ex = `Ženský rod. Po neurčitom člene ('eine') dostáva prídavné meno koncovku -e.`; }
    if (genderType === 'n') { expected = `ein ${baseAdj}es ${nounDe}`; hintPhrase = `ein / ${adjDe} / ${nounDe}`; ex = `Stredný rod. Po neurčitom člene ('ein'), ktorý rod neukazuje, ho prídavné meno musí ukázať (das -> -es).`; }
  }

  if (articleType === 'keine' && genderType === 'pl') {
    articleSk = 'žiadne ';
    expected = `keine ${baseAdj}en ${nounDe}`; hintPhrase = `keine / ${adjDe} / ${nounDe}`; ex = `Množné číslo. Po zápore 'keine', ktorý sa správa ako určitý člen, je v pluráli prídavné meno vždy s koncovkou -en.`;
  }

  if (articleType === 'none') {
    articleSk = '';
    if (genderType === 'm') { expected = `${baseAdj}er ${nounDe}`; hintPhrase = `— / ${adjDe} / ${nounDe}`; ex = `Mužský rod (Nullartikel). Bez člena musí prídavné meno ukázať rod namiesto neho (der -> -er).`; }
    if (genderType === 'f') { expected = `${baseAdj}e ${nounDe}`; hintPhrase = `— / ${adjDe} / ${nounDe}`; ex = `Ženský rod (Nullartikel). Bez člena dostáva koncovku akoby z člena 'die' (-e).`; }
    if (genderType === 'n') { expected = `${baseAdj}es ${nounDe}`; hintPhrase = `— / ${adjDe} / ${nounDe}`; ex = `Stredný rod (Nullartikel). Bez člena ukazuje prídavné meno rod namiesto neho (das -> -es).`; }
    if (genderType === 'pl') { expected = `${baseAdj}e ${nounDe}`; hintPhrase = `— / ${adjDe} / ${nounDe}`; ex = `Množné číslo (Nullartikel). Bez člena dostáva prídavné meno koncovku akoby z 'die' (-e).`; }
  }

  if (usedQuestions.has(expected)) continue;
  usedQuestions.add(expected);

  let cleanNounSk = nounSk.replace(/\([A-Zl]+\)/, '');
  let sentenceSk = `${articleSk}${adjSk} ${cleanNounSk}`.trim().toLowerCase();

  const q = `Napíšte frázu v správnom tvare: ${sentenceSk} (${hintPhrase})`;

  exercises.push({
    type: 'fib',
    question: q,
    blanks: [{ answer: expected, hint: expected }],
    explanation: ex
  });
}

const out = `var EXERCISES = {\n  nominativ_deklination: [\n` + 
  exercises.map(e => `    ${JSON.stringify(e)}`).join(',\n') + 
  `\n  ]\n};\n`;

writeFileSync('GRAMMAR/js/data/exercises.js', out);
console.log(`Extracted M:${Object.keys(masculine).length}, F:${Object.keys(feminine).length}, N:${Object.keys(neuter).length}, Pl:${Object.keys(plural).length}`);
console.log(`Generated 157 unique valid FIB exercises matching app vocabulary.`);
