import { writeFileSync } from 'fs';

// Helper function to get random item from array or keys of object
function rObjKey(obj) { const keys = Object.keys(obj); return keys[Math.floor(Math.random() * keys.length)]; }
function rArr(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// ==========================================
// SEMANTIC DICTIONARIES (Noun -> {sk, skG, genderDe, isMass})
// ==========================================

const nounsPeople = {
  Mann: {sk: 'muž', skG: 'ma', de: 'm'}, 
  Vater: {sk: 'otec', skG: 'ma', de: 'm'}, 
  Bruder: {sk: 'brat', skG: 'ma', de: 'm'}, 
  Freund: {sk: 'priateľ', skG: 'ma', de: 'm'}, 
  Arzt: {sk: 'lekár', skG: 'ma', de: 'm'}, 
  Lehrer: {sk: 'učiteľ', skG: 'ma', de: 'm'},
  Frau: {sk: 'žena', skG: 'f', de: 'f'}, 
  Mutter: {sk: 'matka', skG: 'f', de: 'f'}, 
  Schwester: {sk: 'sestra', skG: 'f', de: 'f'}, 
  Freundin: {sk: 'priateľka', skG: 'f', de: 'f'}, 
  Ärztin: {sk: 'lekárka', skG: 'f', de: 'f'}, 
  Lehrerin: {sk: 'učiteľka', skG: 'f', de: 'f'},
  Kind: {sk: 'dieťa', skG: 'n', de: 'n'}, 
  Mädchen: {sk: 'dievča', skG: 'n', de: 'n'}, 
  Baby: {sk: 'bábätko', skG: 'n', de: 'n'},
  Eltern: {sk: 'rodičia', skG: 'pla', de: 'pl'}, 
  Leute: {sk: 'ľudia', skG: 'pla', de: 'pl'}, 
  Kinder: {sk: 'deti', skG: 'pl', de: 'pl'}, 
  Menschen: {sk: 'ľudia', skG: 'pla', de: 'pl'}
};
const adjsPeople = [
  'groß|veľký', 'klein|malý', 'alt|starý', 'gut|dobrý', 'schlecht|zlý', 'schön|pekný', 'hässlich|škaredý',
  'gesund|zdravý', 'krank|chorý', 'dick|tučný', 'dünn|chudý', 'müde|unavený', 'wach|bdelý', 
  'nett|milý', 'freundlich|priateľský', 'unfreundlich|nepriateľský', 'glücklich|šťastný', 
  'traurig|smutný', 'lustig|vtipný', 'ernst|vážny', 'arm|chudobný', 'reich|bohatý', 
  'klug|múdry', 'dumm|hlúpy', 'faul|lenivý', 'fleißig|usilovný', 'berühmt|slávny', 
  'bekannt|známy', 'fremd|cudzí', 'sympathisch|sympatický', 'unsympathisch|nesympatický'
];

const nounsObjects = {
  Tisch: {sk: 'stôl', skG: 'm', de: 'm'}, 
  Stuhl: {sk: 'stolička', skG: 'f', de: 'm'}, 
  Wagen: {sk: 'vozidlo', skG: 'n', de: 'm'}, 
  Koffer: {sk: 'kufor', skG: 'm', de: 'm'}, 
  Mantel: {sk: 'kabát', skG: 'm', de: 'm'}, 
  Rock: {sk: 'sukňa', skG: 'f', de: 'm'}, 
  Pullover: {sk: 'sveter', skG: 'm', de: 'm'}, 
  Schuh: {sk: 'topánka', skG: 'f', de: 'm'}, 
  Zug: {sk: 'vlak', skG: 'm', de: 'm'}, 
  Bus: {sk: 'autobus', skG: 'm', de: 'm'}, 
  Pass: {sk: 'pas', skG: 'm', de: 'm'}, 
  Schlüssel: {sk: 'kľúč', skG: 'm', de: 'm'}, 
  Bleistift: {sk: 'ceruzka', skG: 'f', de: 'm'}, 
  Schrank: {sk: 'skriňa', skG: 'f', de: 'm'}, 
  Fernseher: {sk: 'televízor', skG: 'm', de: 'm'}, 
  Kühlschrank: {sk: 'chladnička', skG: 'f', de: 'm'}, 
  Sessel: {sk: 'kreslo', skG: 'n', de: 'm'},
  Blume: {sk: 'kvetina', skG: 'f', de: 'f'}, 
  Tür: {sk: 'dvere', skG: 'pl', de: 'f'}, 
  Wand: {sk: 'stena', skG: 'f', de: 'f'}, 
  Tafel: {sk: 'tabuľa', skG: 'f', de: 'f'}, 
  Landkarte: {sk: 'mapa', skG: 'f', de: 'f'}, 
  Tasche: {sk: 'taška', skG: 'f', de: 'f'}, 
  Brille: {sk: 'okuliare', skG: 'pl', de: 'f'}, 
  Hose: {sk: 'nohavice', skG: 'pl', de: 'f'}, 
  Jacke: {sk: 'bunda', skG: 'f', de: 'f'}, 
  Bluse: {sk: 'blúzka', skG: 'f', de: 'f'}, 
  Uhr: {sk: 'hodiny', skG: 'pl', de: 'f'},
  Auto: {sk: 'auto', skG: 'n', de: 'n'}, 
  Fahrrad: {sk: 'bicykel', skG: 'm', de: 'n'}, 
  Motorrad: {sk: 'motorka', skG: 'f', de: 'n'}, 
  Flugzeug: {sk: 'lietadlo', skG: 'n', de: 'n'}, 
  Schiff: {sk: 'loď', skG: 'f', de: 'n'}, 
  Bett: {sk: 'posteľ', skG: 'f', de: 'n'}, 
  Sofa: {sk: 'pohovka', skG: 'f', de: 'n'}, 
  Regal: {sk: 'polica', skG: 'f', de: 'n'}, 
  Fenster: {sk: 'okno', skG: 'n', de: 'n'}, 
  Buch: {sk: 'kniha', skG: 'f', de: 'n'}, 
  Heft: {sk: 'zošit', skG: 'm', de: 'n'}, 
  Bild: {sk: 'obraz', skG: 'm', de: 'n'}, 
  Foto: {sk: 'fotka', skG: 'f', de: 'n'},
  Schuhe: {sk: 'topánky', skG: 'pl', de: 'pl'}, 
  Stiefel: {sk: 'čižmy', skG: 'pl', de: 'pl'}, 
  Socken: {sk: 'ponožky', skG: 'pl', de: 'pl'}, 
  Möbel: {sk: 'nábytok', skG: 'm', de: 'pl'}, 
  Bücher: {sk: 'knihy', skG: 'pl', de: 'pl'}, 
  Autos: {sk: 'autá', skG: 'pl', de: 'pl'}
};
const adjsObjects = [
  'groß|veľký', 'klein|malý', 'alt|starý', 'neu|nový', 'gut|dobrý', 'schlecht|zlý', 
  'schön|krásny', 'hässlich|škaredý', 'schwer|ťažký', 'leicht|ľahký', 
  'modern|moderný', 'sauber|čistý', 'schmutzig|špinavý', 'billig|lacný', 
  'teuer|drahý', 'kaputt|pokazený', 'praktisch|praktický', 'bequem|pohodlný'
];

const nounsFood = {
  Kaffee: {sk: 'káva', skG: 'f', de: 'm', mass: true}, 
  Tee: {sk: 'čaj', skG: 'm', de: 'm', mass: true}, 
  Saft: {sk: 'džús', skG: 'm', de: 'm', mass: true}, 
  Wein: {sk: 'víno', skG: 'n', de: 'm', mass: true}, 
  Fisch: {sk: 'ryba', skG: 'f', de: 'm'}, 
  Käse: {sk: 'syr', skG: 'm', de: 'm', mass: true}, 
  Schinken: {sk: 'šunka', skG: 'f', de: 'm', mass: true}, 
  Salat: {sk: 'šalát', skG: 'm', de: 'm', mass: true}, 
  Kuchen: {sk: 'koláč', skG: 'm', de: 'm'}, 
  Zucker: {sk: 'cukor', skG: 'm', de: 'm', mass: true}, 
  Pfeffer: {sk: 'korenie', skG: 'n', de: 'm', mass: true},
  Milch: {sk: 'mlieko', skG: 'n', de: 'f', mass: true}, 
  Butter: {sk: 'maslo', skG: 'n', de: 'f', mass: true}, 
  Wurst: {sk: 'klobása', skG: 'f', de: 'f'}, 
  Kartoffel: {sk: 'zemiak', skG: 'm', de: 'f'}, 
  Tomate: {sk: 'paradajka', skG: 'f', de: 'f'}, 
  Suppe: {sk: 'polievka', skG: 'f', de: 'f', mass: true}, 
  Pizza: {sk: 'pizza', skG: 'f', de: 'f'}, 
  Schokolade: {sk: 'čokoláda', skG: 'f', de: 'f', mass: true},
  Wasser: {sk: 'voda', skG: 'f', de: 'n', mass: true}, 
  Bier: {sk: 'pivo', skG: 'n', de: 'n', mass: true}, 
  Brot: {sk: 'chlieb', skG: 'm', de: 'n', mass: true}, 
  Brötchen: {sk: 'pečivo', skG: 'n', de: 'n'}, 
  Fleisch: {sk: 'mäso', skG: 'n', de: 'n', mass: true}, 
  Ei: {sk: 'vajce', skG: 'n', de: 'n'}, 
  Gemüse: {sk: 'zelenina', skG: 'f', de: 'n', mass: true}, 
  Obst: {sk: 'ovocie', skG: 'n', de: 'n', mass: true}, 
  Salz: {sk: 'soľ', skG: 'f', de: 'n', mass: true},
  Nudeln: {sk: 'cestoviny', skG: 'pl', de: 'pl', mass: true}, 
  Spaghetti: {sk: 'špagety', skG: 'pl', de: 'pl', mass: true}, 
  Pommes: {sk: 'hranolky', skG: 'pl', de: 'pl'}
};
const adjsFood = [
  'gut|dobrý', 'schlecht|zlý', 'warm|teplý', 'kalt|studený', 'heiß|horúci', 
  'süß|sladký', 'sauer|kyslý', 'bitter|horký', 'scharf|pikantný', 
  'frisch|čerstvý', 'lecker|chutný', 'gesund|zdravý', 'teuer|drahý', 'billig|lacný'
];

const nounsPlaces = {
  Bahnhof: {sk: 'stanica', skG: 'f', de: 'm'}, 
  Flughafen: {sk: 'letisko', skG: 'n', de: 'm'}, 
  Platz: {sk: 'námestie', skG: 'n', de: 'm'}, 
  Balkon: {sk: 'balkón', skG: 'm', de: 'm'}, 
  Keller: {sk: 'pivnica', skG: 'f', de: 'm'}, 
  Park: {sk: 'park', skG: 'm', de: 'm'}, 
  Garten: {sk: 'záhrada', skG: 'f', de: 'm'},
  Stadt: {sk: 'mesto', skG: 'n', de: 'f'}, 
  Straße: {sk: 'ulica', skG: 'f', de: 'f'}, 
  Bank: {sk: 'banka', skG: 'f', de: 'f'}, 
  Post: {sk: 'pošta', skG: 'f', de: 'f'}, 
  Schule: {sk: 'škola', skG: 'f', de: 'f'}, 
  Klasse: {sk: 'trieda', skG: 'f', de: 'f'}, 
  Küche: {sk: 'kuchyňa', skG: 'f', de: 'f'}, 
  Wohnung: {sk: 'byt', skG: 'm', de: 'f'}, 
  Toilette: {sk: 'toaleta', skG: 'f', de: 'f'},
  Hotel: {sk: 'hotel', skG: 'm', de: 'n'}, 
  Haus: {sk: 'dom', skG: 'm', de: 'n'}, 
  Zimmer: {sk: 'izba', skG: 'f', de: 'n'}, 
  Bad: {sk: 'kúpeľňa', skG: 'f', de: 'n'}, 
  Kino: {sk: 'kino', skG: 'n', de: 'n'}, 
  Theater: {sk: 'divadlo', skG: 'n', de: 'n'}, 
  Museum: {sk: 'múzeum', skG: 'n', de: 'n'}, 
  Krankenhaus: {sk: 'nemocnica', skG: 'f', de: 'n'}
};
const adjsPlaces = [
  'groß|veľký', 'klein|malý', 'alt|starý', 'neu|nový', 'gut|dobrý', 'schlecht|zlý', 
  'schön|pekný', 'hässlich|škaredý', 'modern|moderný', 'sauber|čistý', 'schmutzig|špinavý', 
  'hell|svetlý', 'dunkel|tmavý', 'voll|plný', 'leer|prázdny', 'nah|blízky', 
  'weit|ďaleký', 'ruhig|pokojný', 'laut|hlasný', 'bekannt|známy', 'berühmt|slávny', 'teuer|drahý'
];

const nounsAbstract = {
  Satz: {sk: 'veta', skG: 'f', de: 'm'}, 
  Text: {sk: 'text', skG: 'm', de: 'm'}, 
  Tag: {sk: 'deň', skG: 'm', de: 'm'}, 
  Monat: {sk: 'mesiac', skG: 'm', de: 'm'},
  Zeit: {sk: 'čas', skG: 'm', de: 'f', mass: true}, 
  Pause: {sk: 'prestávka', skG: 'f', de: 'f'}, 
  Woche: {sk: 'týždeň', skG: 'm', de: 'f'}, 
  Nacht: {sk: 'noc', skG: 'f', de: 'f'}, 
  Antwort: {sk: 'odpoveď', skG: 'f', de: 'f'}, 
  Frage: {sk: 'otázka', skG: 'f', de: 'f'}, 
  Hilfe: {sk: 'pomoc', skG: 'f', de: 'f'}, 
  Idee: {sk: 'nápad', skG: 'm', de: 'f'}, 
  Musik: {sk: 'hudba', skG: 'f', de: 'f', mass: true},
  Wort: {sk: 'slovo', skG: 'n', de: 'n'}, 
  Jahr: {sk: 'rok', skG: 'm', de: 'n'}, 
  Problem: {sk: 'problém', skG: 'm', de: 'n'}, 
  Spiel: {sk: 'hra', skG: 'f', de: 'n'},
  Nachrichten: {sk: 'správy', skG: 'pl', de: 'pl'}, 
  Fragen: {sk: 'otázky', skG: 'pl', de: 'pl'}, 
  Probleme: {sk: 'problémy', skG: 'pl', de: 'pl'}, 
  Ferien: {sk: 'prázdniny', skG: 'pl', de: 'pl'}
};
const adjsAbstract = [
  'gut|dobrý', 'schlecht|zlý', 'neu|nový', 'alt|starý', 'wichtig|dôležitý', 
  'richtig|správny', 'falsch|nesprávny', 'einfach|jednoduchý', 'schwer|ťažký', 
  'leicht|ľahký', 'interessant|zaujímavý', 'langweilig|nudný', 'kurz|krátky', 
  'lang|dlhý', 'laut|hlasný', 'leise|tichý', 'wunderbar|úžasný', 'schön|krásny'
];

const nounsBodyParts = {
  Haare: {sk: 'vlasy', skG: 'pl', de: 'pl'}, 
  Zähne: {sk: 'zuby', skG: 'pl', de: 'pl'}, 
  Augen: {sk: 'oči', skG: 'pl', de: 'pl'}, 
  Ohren: {sk: 'uši', skG: 'pl', de: 'pl'}
};
const adjsBodyParts = [
  'schön|krásny', 'kurz|krátky', 'lang|dlhý', 'groß|veľký', 'klein|malý', 
  'hell|svetlý', 'dunkel|tmavý', 'sauber|čistý', 'schmutzig|špinavý', 'gesund|zdravý', 'krank|chorý'
];

const categories = [
  { n: nounsPeople, a: adjsPeople },
  { n: nounsObjects, a: adjsObjects },
  { n: nounsFood, a: adjsFood },
  { n: nounsPlaces, a: adjsPlaces },
  { n: nounsAbstract, a: adjsAbstract },
  { n: nounsBodyParts, a: adjsBodyParts }
];

// ==========================================
// DECLENSION LOGIC
// ==========================================

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
  if (skGender === 'pl' || skGender === 'pla') return 'nejaké '; 
  return '';
}

function getSkNegArticle(skGender) {
  if (skGender === 'm' || skGender === 'ma') return 'žiaden ';
  if (skGender === 'f') return 'žiadna ';
  if (skGender === 'n') return 'žiadne ';
  if (skGender === 'pl' || skGender === 'pla') return 'žiadne ';
  return '';
}


const usedQuestions = new Set();
const exercises = [];

while(exercises.length < 157) {
  // 1. Pick semantic category
  const cat = rArr(categories);
  
  // 2. Pick noun inside category
  const nounDe = rObjKey(cat.n);
  const nounObj = cat.n[nounDe];
  const nounSk = nounObj.sk;
  const skGender = nounObj.skG;
  const genderType = nounObj.de; // m, f, n, pl
  const isMass = !!nounObj.mass;

  // 3. Pick adjective inside category
  const adjString = rArr(cat.a);
  const [adjDe, baseSkAdj] = adjString.split('|');
  const adjSk = getSkAdjective(baseSkAdj, skGender);
  
  let baseAdj = adjDe;
  if (baseAdj === 'teuer') baseAdj = 'teur';
  if (baseAdj === 'dunkel') baseAdj = 'dunkl';

  // 4. Randomize article type
  let articleType = rArr(['def', 'indef', 'none']);
  
  if (genderType === 'pl' && articleType === 'indef') articleType = 'keine';

  if (articleType === 'none' && genderType !== 'pl') {
    if (!isMass) {
       articleType = 'indef'; 
    }
  }

  // Force mass nouns to be article-free very often
  if (isMass && Math.random() > 0.2) {
      articleType = 'none';
  }

  // Generate German answer and translation
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
console.log(`Generated perfectly semantic German exercises based on specific categories!`);
