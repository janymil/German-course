const fs = require('fs');

const adjectives = {
  groß: 'veľký', klein: 'malý', alt: 'starý', neu: 'nový', gut: 'dobrý', schlecht: 'zlý', 
  warm: 'teplý', kalt: 'studený', stark: 'silný', schwach: 'slabý', schön: 'pekný', 
  hässlich: 'škaredý', kurz: 'krátky', lang: 'dlhý', interessant: 'zaujímavý', 
  langweilig: 'nudný', schnell: 'rýchly', langsam: 'pomalý', laut: 'hlasný', 
  leise: 'tichý', modern: 'moderný', sauber: 'čistý', schmutzig: 'špinavý', 
  billig: 'lacný', teuer: 'drahý'
};

const masculine = {
  Hund: 'pes(M)', Tisch: 'stôl(M)', Mann: 'muž(M)', Baum: 'strom(M)', Stift: 'pero(M)', 
  Computer: 'počítač(M)', Tag: 'deň(M)', Film: 'film(M)', Monat: 'mesiac(M)', 
  Weg: 'cesta(M)', Garten: 'záhrada(M)', Vater: 'otec(M)', Bruder: 'brat(M)', 
  Freund: 'priateľ(M)', Koffer: 'kufor(M)', Stuhl: 'stolička(M)'
};

const feminine = {
  Frau: 'žena(F)', Blume: 'kvetina(F)', Tasche: 'taška(F)', Nacht: 'noc(F)', Musik: 'hudba(F)', 
  Regel: 'pravidlo(F)', 'E-Mail': 'e-mail(F)', Tür: 'dvere(F)', Wand: 'stena(F)', 
  Stadt: 'mesto(F)', Schule: 'škola(F)', Mutter: 'matka(F)', Schwester: 'sestra(F)', 
  Idee: 'myšlienka(F)', Uhr: 'hodiny(F)', Tasse: 'šálka(F)'
};

const neuter = {
  Auto: 'auto(N)', Kind: 'dieťa(N)', Zimmer: 'izba(N)', Bier: 'pivo(N)', Problem: 'problém(N)', 
  Buch: 'kniha(N)', Haus: 'dom(N)', Fenster: 'okno(N)', Jahr: 'rok(N)', Bild: 'obraz(N)', 
  Mädchen: 'dievča(N)', Spiel: 'hra(N)', Wort: 'slovo(N)', Handy: 'mobil(N)', Hemd: 'košeľa(N)'
};

const plural = {
  Schuhe: 'topánky(Pl)', Bäume: 'stromy(Pl)', Leute: 'ľudia(Pl)', Kinder: 'deti(Pl)', 
  Bücher: 'knihy(Pl)', Ideen: 'myšlienky(Pl)', Fragen: 'otázky(Pl)', Aufgaben: 'úlohy(Pl)', 
  Frauen: 'ženy(Pl)', Männer: 'muži(Pl)', Probleme: 'problémy(Pl)', Freunde: 'priatelia(Pl)', 
  Tage: 'dni(Pl)', Autos: 'autá(Pl)', Stifte: 'perá(Pl)'
};

function r(obj) { const keys = Object.keys(obj); return keys[Math.floor(Math.random() * keys.length)]; }

const usedQuestions = new Set();
const exercises = [];

while(exercises.length < 157) {
  let genderType = ['m', 'f', 'n', 'pl'][Math.floor(Math.random() * 4)];
  let nounDe = '', nounSk = '';
  if (genderType === 'm') { nounDe = r(masculine); nounSk = masculine[nounDe]; }
  if (genderType === 'f') { nounDe = r(feminine); nounSk = feminine[nounDe]; }
  if (genderType === 'n') { nounDe = r(neuter); nounSk = neuter[nounDe]; }
  if (genderType === 'pl') { nounDe = r(plural); nounSk = plural[nounDe]; }

  let adjDe = r(adjectives);
  let adjSk = adjectives[adjDe];
  
  let baseAdj = adjDe;
  if (baseAdj === 'teuer') baseAdj = 'teur';

  let articleType = ['def', 'indef', 'none'][Math.floor(Math.random() * 3)];
  if (genderType === 'pl' && articleType === 'indef') articleType = 'keine';

  if (articleType === 'none' && genderType !== 'pl') {
    if (!['Bier', 'Musik', 'Zeit'].includes(nounDe)) {
       articleType = 'indef'; 
    }
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

fs.writeFileSync('GRAMMAR/js/data/exercises.js', out);
console.log('Done 157');
