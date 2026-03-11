import { writeFileSync } from 'fs';

// MASSIVE A1 Noun Dictionary
// Format: de_noun: { sk: 'slovak translation', skG: 'slovak gender (m, ma, f, n, pl, pla)' }
// m = masculine inanimate, ma = masculine animate
// f = feminine, n = neuter
// pl = plural inanimate, pla = plural animate
const masculine = {
  Tisch: {sk: 'stôl', skG: 'm'}, Stuhl: {sk: 'stolička', skG: 'f'}, Hund: {sk: 'pes', skG: 'ma'}, 
  Baum: {sk: 'strom', skG: 'm'}, Mann: {sk: 'muž', skG: 'ma'}, Vater: {sk: 'otec', skG: 'ma'}, 
  Bruder: {sk: 'brat', skG: 'ma'}, Freund: {sk: 'priateľ', skG: 'ma'}, Arzt: {sk: 'lekár', skG: 'ma'}, 
  Lehrer: {sk: 'učiteľ', skG: 'ma'}, Wagen: {sk: 'vozidlo', skG: 'n'}, Koffer: {sk: 'kufor', skG: 'm'}, 
  Mantel: {sk: 'kabát', skG: 'm'}, Rock: {sk: 'sukňa', skG: 'f'}, Pullover: {sk: 'sveter', skG: 'm'}, 
  Schuh: {sk: 'topánka', skG: 'f'}, Zug: {sk: 'vlak', skG: 'm'}, Bus: {sk: 'autobus', skG: 'm'}, 
  Bahnhof: {sk: 'stanica', skG: 'f'}, Flughafen: {sk: 'letisko', skG: 'n'}, Pass: {sk: 'pas', skG: 'm'}, 
  Platz: {sk: 'námestie', skG: 'n'}, Schlüssel: {sk: 'kľúč', skG: 'm'}, Satz: {sk: 'veta', skG: 'f'}, 
  Text: {sk: 'text', skG: 'm'}, Bleistift: {sk: 'ceruzka', skG: 'f'}, Schrank: {sk: 'skriňa', skG: 'f'}, 
  Balkon: {sk: 'balkón', skG: 'm'}, Fernseher: {sk: 'televízor', skG: 'm'}, Kühlschrank: {sk: 'chladnička', skG: 'f'}, 
  Sessel: {sk: 'kreslo', skG: 'n'}, Keller: {sk: 'pivnica', skG: 'f'}, Park: {sk: 'park', skG: 'm'}, 
  Garten: {sk: 'záhrada', skG: 'f'}, Saft: {sk: 'džús', skG: 'm'}, Tee: {sk: 'čaj', skG: 'm'}, 
  Kaffee: {sk: 'káva', skG: 'f'}, Wein: {sk: 'víno', skG: 'n'}, Fisch: {sk: 'ryba', skG: 'f'}, 
  Käse: {sk: 'syr', skG: 'm'}, Schinken: {sk: 'šunka', skG: 'f'}, Salat: {sk: 'šalát', skG: 'm'}, 
  Kuchen: {sk: 'koláč', skG: 'm'}, Zucker: {sk: 'cukor', skG: 'm'}, Pfeffer: {sk: 'korenie', skG: 'n'}, 
  Herd: {sk: 'sporák', skG: 'm'}
};

const feminine = {
  Frau: {sk: 'žena', skG: 'f'}, Mutter: {sk: 'matka', skG: 'f'}, Schwester: {sk: 'sestra', skG: 'f'}, 
  Freundin: {sk: 'priateľka', skG: 'f'}, Ärztin: {sk: 'lekárka', skG: 'f'}, Lehrerin: {sk: 'učiteľka', skG: 'f'}, 
  Blume: {sk: 'kvetina', skG: 'f'}, Katze: {sk: 'mačka', skG: 'f'}, Tür: {sk: 'dvere', skG: 'pl'}, 
  Wand: {sk: 'stena', skG: 'f'}, Stadt: {sk: 'mesto', skG: 'n'}, Straße: {sk: 'ulica', skG: 'f'}, 
  Bank: {sk: 'banka', skG: 'f'}, Post: {sk: 'pošta', skG: 'f'}, Schule: {sk: 'škola', skG: 'f'}, 
  Klasse: {sk: 'trieda', skG: 'f'}, Tafel: {sk: 'tabuľa', skG: 'f'}, Landkarte: {sk: 'mapa', skG: 'f'}, 
  Tasche: {sk: 'taška', skG: 'f'}, Brille: {sk: 'okuliare', skG: 'pl'}, Hose: {sk: 'nohavice', skG: 'pl'}, 
  Jacke: {sk: 'bunda', skG: 'f'}, Bluse: {sk: 'blúzka', skG: 'f'}, Uhr: {sk: 'hodiny', skG: 'pl'}, 
  Zeit: {sk: 'čas', skG: 'm'}, Pause: {sk: 'prestávka', skG: 'f'}, Woche: {sk: 'týždeň', skG: 'm'}, 
  Nacht: {sk: 'noc', skG: 'f'}, Antwort: {sk: 'odpoveď', skG: 'f'}, Frage: {sk: 'otázka', skG: 'f'}, 
  Hilfe: {sk: 'pomoc', skG: 'f'}, Milch: {sk: 'mlieko', skG: 'n'}, Butter: {sk: 'maslo', skG: 'n'}, 
  Wurst: {sk: 'klobása', skG: 'f'}, Kartoffel: {sk: 'zemiak', skG: 'm'}, Tomate: {sk: 'paradajka', skG: 'f'}, 
  Suppe: {sk: 'polievka', skG: 'f'}, Pizza: {sk: 'pizza', skG: 'f'}, Schokolade: {sk: 'čokoláda', skG: 'f'}, 
  Küche: {sk: 'kuchyňa', skG: 'f'}, Wohnung: {sk: 'byt', skG: 'm'}, Heizung: {sk: 'kúrenie', skG: 'n'}, 
  Toilette: {sk: 'toaleta', skG: 'f'}
};

const neuter = {
  Kind: {sk: 'dieťa', skG: 'n'}, Mädchen: {sk: 'dievča', skG: 'n'}, Baby: {sk: 'bábätko', skG: 'n'}, 
  Tier: {sk: 'zviera', skG: 'n'}, Auto: {sk: 'auto', skG: 'n'}, Fahrrad: {sk: 'bicykel', skG: 'm'}, 
  Motorrad: {sk: 'motorka', skG: 'f'}, Flugzeug: {sk: 'lietadlo', skG: 'n'}, Schiff: {sk: 'loď', skG: 'f'}, 
  Hotel: {sk: 'hotel', skG: 'm'}, Haus: {sk: 'dom', skG: 'm'}, Zimmer: {sk: 'izba', skG: 'f'}, 
  Bett: {sk: 'posteľ', skG: 'f'}, Sofa: {sk: 'pohovka', skG: 'f'}, Regal: {sk: 'polica', skG: 'f'}, 
  Bad: {sk: 'kúpeľňa', skG: 'f'}, Fenster: {sk: 'okno', skG: 'n'}, Buch: {sk: 'kniha', skG: 'f'}, 
  Heft: {sk: 'zošit', skG: 'm'}, Bild: {sk: 'obraz', skG: 'm'}, Foto: {sk: 'fotka', skG: 'f'}, 
  Wort: {sk: 'slovo', skG: 'n'}, Wasser: {sk: 'voda', skG: 'f'}, Bier: {sk: 'pivo', skG: 'n'}, 
  Brot: {sk: 'chlieb', skG: 'm'}, Brötchen: {sk: 'pečivo', skG: 'n'}, Fleisch: {sk: 'mäso', skG: 'n'}, 
  Ei: {sk: 'vajce', skG: 'n'}, Gemüse: {sk: 'zelenina', skG: 'f'}, Obst: {sk: 'ovocie', skG: 'n'}, 
  Salz: {sk: 'soľ', skG: 'f'}, Geld: {sk: 'peniaze', skG: 'pl'}, Kino: {sk: 'kino', skG: 'n'}, 
  Theater: {sk: 'divadlo', skG: 'n'}, Museum: {sk: 'múzeum', skG: 'n'}, Krankenhaus: {sk: 'nemocnica', skG: 'f'}
};

const plural = {
  Eltern: {sk: 'rodičia', skG: 'pla'}, Leute: {sk: 'ľudia', skG: 'pla'}, Kinder: {sk: 'deti', skG: 'pl'}, 
  Menschen: {sk: 'ľudia', skG: 'pla'}, Schuhe: {sk: 'topánky', skG: 'pl'}, Stiefel: {sk: 'čižmy', skG: 'pl'}, 
  Socken: {sk: 'ponožky', skG: 'pl'}, Möbel: {sk: 'nábytok', skG: 'm'}, Ferien: {sk: 'prázdniny', skG: 'pl'}, 
  Nudeln: {sk: 'cestoviny', skG: 'pl'}, Spaghetti: {sk: 'špagety', skG: 'pl'}, Pommes: {sk: 'hranolky', skG: 'pl'}, 
  Chips: {sk: 'čipsy', skG: 'pl'}, Haare: {sk: 'vlasy', skG: 'pl'}, Zähne: {sk: 'zuby', skG: 'pl'}, 
  Augen: {sk: 'oči', skG: 'pl'}, Ohren: {sk: 'uši', skG: 'pl'}, Bäume: {sk: 'stromy', skG: 'pl'}, 
  Bücher: {sk: 'knihy', skG: 'pl'}, Autos: {sk: 'autá', skG: 'pl'}
};

// MASSIVE A1 Adjectives list (Slovak in masculine base form)
const adjectives = {
  groß: 'veľký', klein: 'malý', alt: 'starý', neu: 'nový', gut: 'dobrý', schlecht: 'zlý',
  warm: 'teplý', kalt: 'studený', stark: 'silný', schwach: 'slabý', schön: 'krásny', hässlich: 'škaredý',
  kurz: 'krátky', lang: 'dlhý', interessant: 'zaujímavý', langweilig: 'nudný', schnell: 'rýchly', langsam: 'pomalý',
  laut: 'hlasný', leise: 'tichý', modern: 'moderný', sauber: 'čistý', schmutzig: 'špinavý',
  billig: 'lacný', teuer: 'drahý', wichtig: 'dôležitý', richtig: 'správny', falsch: 'nesprávny',
  einfach: 'jednoduchý', schwer: 'ťažký', leicht: 'ľahký', hell: 'svetlý', dunkel: 'tmavý',
  voll: 'plný', leer: 'prázdny', gesund: 'zdravý', krank: 'chorý', dick: 'tučný', dünn: 'chudý',
  müde: 'unavený', wach: 'bdelý', nett: 'milý', freundlich: 'priateľský', unfreundlich: 'nepriateľský',
  glücklich: 'šťastný', traurig: 'smutný', lustig: 'vtipný', ernst: 'vážny', nah: 'blízky', weit: 'ďaleký',
  hart: 'tvrdý', weich: 'mäkký', heiß: 'horúci', arm: 'chudobný', reich: 'bohatý',
  süß: 'sladký', sauer: 'kyslý', bitter: 'horký', scharf: 'ostrý',
  klug: 'múdry', dumm: 'hlúpy', faul: 'lenivý', fleißig: 'usilovný',
  berühmt: 'slávny', bekannt: 'známy', fremd: 'cudzí', ruhig: 'pokojný', gefährlich: 'nebezpečný',
  sicher: 'bezpečný', kaputt: 'pokazený', frei: 'voľný', besetzt: 'obsadený',
  tief: 'hlboký', flach: 'plytký', trocken: 'suchý', nass: 'mokrý',
  pünktlich: 'presný', spät: 'neskorý', früh: 'skorý', wunderbar: 'úžasný'
};

function getSkAdjective(skAdjMasc, skGender) {
  let isSoft = skAdjMasc.endsWith('í');
  
  if (skGender === 'm' || skGender === 'ma') return skAdjMasc;
  if (skGender === 'f') {
    return isSoft ? skAdjMasc.slice(0, -1) + 'ia' : skAdjMasc.slice(0, -1) + 'á';
  }
  if (skGender === 'n') {
    return isSoft ? skAdjMasc.slice(0, -1) + 'ie' : skAdjMasc.slice(0, -1) + 'é';
  }
  if (skGender === 'pl') {
    return isSoft ? skAdjMasc.slice(0, -1) + 'ie' : skAdjMasc.slice(0, -1) + 'é';
  }
  if (skGender === 'pla') {
    // animate plural (veľkí ľudia, dobrí priatelia)
    // simplistic heuristic for Slovak 'ý' to 'í' and 'ky/hy' mutation (veľký -> veľkí, drahý -> drahí)
    return skAdjMasc.slice(0, -1) + 'í';
  }
  return skAdjMasc;
}

function getSkDefArticle(skGender) {
  if (skGender === 'm' || skGender === 'ma') return 'ten ';
  if (skGender === 'f') return 'tá ';
  if (skGender === 'n') return 'to ';
  if (skGender === 'pl' || skGender === 'pla') return 'tie ';
  return '';
}

function getSkIndefArticle(skGender) {
  if (skGender === 'm' || skGender === 'ma') return 'jeden ';
  if (skGender === 'f') return 'jedna ';
  if (skGender === 'n') return 'jedno ';
  if (skGender === 'pl' || skGender === 'pla') return 'nejaké '; // or omit
  return '';
}

function getSkNegArticle(skGender) {
  if (skGender === 'm' || skGender === 'ma') return 'žiaden ';
  if (skGender === 'f') return 'žiadna ';
  if (skGender === 'n') return 'žiadne ';
  if (skGender === 'pl' || skGender === 'pla') return 'žiadne ';
  return '';
}

function r(obj) { const keys = Object.keys(obj); return keys[Math.floor(Math.random() * keys.length)]; }

const massNouns = ['Bier', 'Wasser', 'Wein', 'Milch', 'Kaffee', 'Tee', 'Brot', 'Obst', 'Gemüse', 'Fleisch', 'Geld', 'Zeit', 'Salz', 'Pfeffer', 'Zucker', 'Suppe'];

const usedQuestions = new Set();
const exercises = [];

while(exercises.length < 157) {
  let genderType = ['m', 'f', 'n', 'pl'][Math.floor(Math.random() * 4)];
  let nounDe = '', nounObj = null;
  
  if (genderType === 'm') { nounDe = r(masculine); nounObj = masculine[nounDe]; }
  if (genderType === 'f') { nounDe = r(feminine);  nounObj = feminine[nounDe]; }
  if (genderType === 'n') { nounDe = r(neuter);    nounObj = neuter[nounDe]; }
  if (genderType === 'pl') { nounDe = r(plural);   nounObj = plural[nounDe]; }

  let nounSk = nounObj.sk;
  let skGender = nounObj.skG;

  let adjDe = r(adjectives);
  let baseSkAdj = adjectives[adjDe];
  let adjSk = getSkAdjective(baseSkAdj, skGender);
  
  let baseAdj = adjDe;
  if (baseAdj === 'teuer') baseAdj = 'teur';
  if (baseAdj === 'dunkel') baseAdj = 'dunkl';

  let articleType = ['def', 'indef', 'none'][Math.floor(Math.random() * 3)];
  if (genderType === 'pl' && articleType === 'indef') articleType = 'keine';

  if (articleType === 'none' && genderType !== 'pl') {
    if (!massNouns.includes(nounDe)) {
       articleType = 'indef'; 
    }
  }

  if (massNouns.includes(nounDe) && Math.random() > 0.3) {
      articleType = 'none';
  }

  let expected = '';
  let hintPhrase = '';
  let ex = '';
  let articleSk = '';

  if (articleType === 'def') {
    articleSk = getSkDefArticle(skGender);
    if (genderType === 'm') { expected = `der ${baseAdj}e ${nounDe}`; hintPhrase = `der / ${adjDe} / ${nounDe}`; ex = `Mužský rod. S určitým členom ('der') dostáva prídavné meno koncovku -e.`; }
    if (genderType === 'f') { expected = `die ${baseAdj}e ${nounDe}`; hintPhrase = `die / ${adjDe} / ${nounDe}`; ex = `Ženský rod. S určitým členom ('die') dostáva prídavné meno koncovku -e.`; }
    if (genderType === 'n') { expected = `das ${baseAdj}e ${nounDe}`; hintPhrase = `das / ${adjDe} / ${nounDe}`; ex = `Stredný rod. S určitým členom ('das') dostáva prídavné meno koncovku -e.`; }
    if (genderType === 'pl') { expected = `die ${baseAdj}en ${nounDe}`; hintPhrase = `die / ${adjDe} / ${nounDe}`; ex = `Množné číslo. S určitým členom ('die') je v pluráli vždy koncovka -en.`; }
  }

  if (articleType === 'indef') {
    articleSk = getSkIndefArticle(skGender);
    if (genderType === 'm') { expected = `ein ${baseAdj}er ${nounDe}`; hintPhrase = `ein / ${adjDe} / ${nounDe}`; ex = `Mužský rod. Po neurčitom člene ('ein'), ktorý rod neukazuje, ho prídavné meno musí ukázať (der -> -er).`; }
    if (genderType === 'f') { expected = `eine ${baseAdj}e ${nounDe}`; hintPhrase = `eine / ${adjDe} / ${nounDe}`; ex = `Ženský rod. Po neurčitom člene ('eine') dostáva prídavné meno koncovku -e.`; }
    if (genderType === 'n') { expected = `ein ${baseAdj}es ${nounDe}`; hintPhrase = `ein / ${adjDe} / ${nounDe}`; ex = `Stredný rod. Po neurčitom člene ('ein'), ktorý rod neukazuje, ho prídavné meno musí ukázať (das -> -es).`; }
  }

  if (articleType === 'keine' && genderType === 'pl') {
    articleSk = getSkNegArticle(skGender);
    expected = `keine ${baseAdj}en ${nounDe}`; hintPhrase = `keine / ${adjDe} / ${nounDe}`; ex = `Množné číslo. Po zápore 'keine', ktorý sa správa ako určitý člen, je v pluráli prídavné meno vždy s koncovkou -en.`;
  }

  if (articleType === 'none') {
    articleSk = '';
    if (genderType === 'm') { expected = `${baseAdj}er ${nounDe}`; hintPhrase = `— / ${adjDe} / ${nounDe}`; ex = `Mužský rod. Bez člena musí prídavné meno ukázať rod namiesto neho (der -> -er).`; }
    if (genderType === 'f') { expected = `${baseAdj}e ${nounDe}`; hintPhrase = `— / ${adjDe} / ${nounDe}`; ex = `Ženský rod. Bez člena dostáva koncovku akoby z člena 'die' (-e).`; }
    if (genderType === 'n') { expected = `${baseAdj}es ${nounDe}`; hintPhrase = `— / ${adjDe} / ${nounDe}`; ex = `Stredný rod. Bez člena ukazuje prídavné meno rod namiesto neho (das -> -es).`; }
    if (genderType === 'pl') { expected = `${baseAdj}e ${nounDe}`; hintPhrase = `— / ${adjDe} / ${nounDe}`; ex = `Množné číslo. Bez člena dostáva prídavné meno koncovku akoby z 'die' (-e).`; }
  }

  if (usedQuestions.has(expected)) continue;
  usedQuestions.add(expected);

  let sentenceSk = `${articleSk}${adjSk} ${nounSk}`.trim().toLowerCase();

  const q = `Ako sa povie: <strong>„${sentenceSk}“</strong>? <br><span class="text-muted text-sm">(${hintPhrase})</span>`;

  exercises.push({
    type: 'fib',
    question: q,
    blanks: [{ answer: expected, hint: 'Napíšte preklad...' }],
    explanation: ex
  });
}

const out = `var EXERCISES = {\n  nominativ_deklination: [\n` + 
  exercises.map(e => `    ${JSON.stringify(e)}`).join(',\n') + 
  `\n  ]\n};\n`;

writeFileSync('GRAMMAR/js/data/exercises.js', out);
console.log(`Generated exercises with intelligent Slovak gender declension!`);
