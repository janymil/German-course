import { writeFileSync } from 'fs';

// MASSIVE A1 Noun Dictionary
const masculine = {
  Tisch: 'stôl(M)', Stuhl: 'stolička(M)', Hund: 'pes(M)', Baum: 'strom(M)', Mann: 'muž(M)', 
  Vater: 'otec(M)', Bruder: 'brat(M)', Freund: 'priateľ(M)', Arzt: 'lekár(M)', Lehrer: 'učiteľ(M)', 
  Wagen: 'vozidlo(M)', Koffer: 'kufor(M)', Mantel: 'kabát(M)', Rock: 'sukňa(M)', Pullover: 'sveter(M)', 
  Schuh: 'topánka(M)', Zug: 'vlak(M)', Bus: 'autobus(M)', Bahnhof: 'stanica(M)', Flughafen: 'letisko(M)', 
  Pass: 'pas(M)', Platz: 'námestie(M)', Schlüssel: 'kľúč(M)', Satz: 'veta(M)', Text: 'text(M)', 
  Bleistift: 'ceruzka(M)', Schrank: 'skriňa(M)', Balkon: 'balkón(M)', Fernseher: 'televízor(M)', 
  Kühlschrank: 'chladnička(M)', Sessel: 'kreslo(M)', Keller: 'pivnica(M)', Park: 'park(M)', Garten: 'záhrada(M)', 
  Saft: 'džús(M)', Tee: 'čaj(M)', Kaffee: 'káva(M)', Wein: 'víno(M)', Fisch: 'ryba(M)', Käse: 'syr(M)', 
  Schinken: 'šunka(M)', Salat: 'šalát(M)', Kuchen: 'koláč(M)', Zucker: 'cukor(M)', Pfeffer: 'čierne korenie(M)', Herd: 'sporák(M)'
};

const feminine = {
  Frau: 'žena(F)', Mutter: 'matka(F)', Schwester: 'sestra(F)', Freundin: 'priateľka(F)', Ärztin: 'lekárka(F)', 
  Lehrerin: 'učiteľka(F)', Blume: 'kvetina(F)', Katze: 'mačka(F)', Tür: 'dvere(F)', Wand: 'stena(F)', 
  Stadt: 'mesto(F)', Straße: 'ulica(F)', Bank: 'banka(F)', Post: 'pošta(F)', Schule: 'škola(F)', 
  Klasse: 'trieda(F)', Tafel: 'tabuľa(F)', Landkarte: 'mapa(F)', Tasche: 'taška(F)', Brille: 'okuliare(F)', 
  Hose: 'nohavice(F)', Jacke: 'bunda(F)', Bluse: 'blúzka(F)', Uhr: 'hodiny/hodinky(F)', Zeit: 'čas(F)', 
  Pause: 'prestávka(F)', Woche: 'týždeň(F)', Nacht: 'noc(F)', Antwort: 'odpoveď(F)', Frage: 'otázka(F)', 
  Hilfe: 'pomoc(F)', Milch: 'mlieko(F)', Butter: 'maslo(F)', Wurst: 'klobása/saláma(F)', Kartoffel: 'zemiak(F)', 
  Tomate: 'paradajka(F)', Suppe: 'polievka(F)', Pizza: 'pizza(F)', Schokolade: 'čokoláda(F)', Küche: 'kuchyňa(F)', 
  Wohnung: 'byt(F)', Heizung: 'kúrenie(F)', Toilette: 'toaleta(F)'
};

const neuter = {
  Kind: 'dieťa(N)', Mädchen: 'dievča(N)', Baby: 'bábätko(N)', Tier: 'zviera(N)', Auto: 'auto(N)', 
  Fahrrad: 'bicykel(N)', Motorrad: 'motorka(N)', Flugzeug: 'lietadlo(N)', Schiff: 'loď(N)', Hotel: 'hotel(N)', 
  Haus: 'dom(N)', Zimmer: 'izba(N)', Bett: 'posteľ(N)', Sofa: 'pohovka(N)', Regal: 'polica(N)', Bad: 'kúpeľňa(N)', 
  Fenster: 'okno(N)', Buch: 'kniha(N)', Heft: 'zošit(N)', Bild: 'obraz(N)', Foto: 'fotka(N)', Wort: 'slovo(N)', 
  Wasser: 'voda(N)', Bier: 'pivo(N)', Brot: 'chlieb(N)', Brötchen: 'žemľa(N)', Fleisch: 'mäso(N)', Ei: 'vajce(N)', 
  Gemüse: 'zelenina(N)', Obst: 'ovocie(N)', Salz: 'soľ(N)', Geld: 'peniaze(N)', Kino: 'kino(N)', Theater: 'divadlo(N)', 
  Museum: 'múzeum(N)', Krankenhaus: 'nemocnica(N)'
};

const plural = {
  Eltern: 'rodičia(Pl)', Leute: 'ľudia(Pl)', Kinder: 'deti(Pl)', Menschen: 'ľudia(Pl)', Schuhe: 'topánky(Pl)', 
  Stiefel: 'čižmy(Pl)', Socken: 'ponožky(Pl)', Möbel: 'nábytok(Pl)', Ferien: 'prázdniny(Pl)', Nudeln: 'cestoviny(Pl)', 
  Spaghetti: 'špagety(Pl)', Pommes: 'hranolky(Pl)', Chips: 'čipsy(Pl)', Haare: 'vlasy(Pl)', Zähne: 'zuby(Pl)', 
  Augen: 'oči(Pl)', Ohren: 'uši(Pl)', Bäume: 'stromy(Pl)', Bücher: 'knihy(Pl)', Autos: 'autá(Pl)'
};

// MASSIVE A1 Adjectives list
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
  pünktlich: 'presný/dochvíľny', spät: 'neskorý', früh: 'skorý', wunderbar: 'úžasný'
};

function r(obj) { const keys = Object.keys(obj); return keys[Math.floor(Math.random() * keys.length)]; }

const massNouns = ['Bier', 'Wasser', 'Wein', 'Milch', 'Kaffee', 'Tee', 'Brot', 'Obst', 'Gemüse', 'Fleisch', 'Geld', 'Zeit', 'Salz', 'Pfeffer', 'Zucker', 'Suppe'];

const usedQuestions = new Set();
const exercises = [];

while(exercises.length < 157) {
  let genderType = ['m', 'f', 'n', 'pl'][Math.floor(Math.random() * 4)];
  let nounDe = '', nounSk = '';
  
  if (genderType === 'm') { nounDe = r(masculine); nounSk = masculine[nounDe]; }
  if (genderType === 'f') { nounDe = r(feminine);  nounSk = feminine[nounDe]; }
  if (genderType === 'n') { nounDe = r(neuter);    nounSk = neuter[nounDe]; }
  if (genderType === 'pl') { nounDe = r(plural);   nounSk = plural[nounDe]; }

  let adjDe = r(adjectives);
  let adjSk = adjectives[adjDe];
  
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
    if (genderType === 'm') { articleSk = 'ten '; expected = `der ${baseAdj}e ${nounDe}`; hintPhrase = `der / ${adjDe} / ${nounDe}`; ex = `Mužský rod. S určitým členom ('der') dostáva prídavné meno koncovku -e.`; }
    if (genderType === 'f') { articleSk = 'tá '; expected = `die ${baseAdj}e ${nounDe}`; hintPhrase = `die / ${adjDe} / ${nounDe}`; ex = `Ženský rod. S určitým členom ('die') dostáva prídavné meno koncovku -e.`; }
    if (genderType === 'n') { articleSk = 'to '; expected = `das ${baseAdj}e ${nounDe}`; hintPhrase = `das / ${adjDe} / ${nounDe}`; ex = `Stredný rod. S určitým členom ('das') dostáva prídavné meno koncovku -e.`; }
    if (genderType === 'pl') { articleSk = 'tie '; expected = `die ${baseAdj}en ${nounDe}`; hintPhrase = `die / ${adjDe} / ${nounDe}`; ex = `Množné číslo. S určitým členom ('die') je v pluráli vždy koncovka -en.`; }
  }

  if (articleType === 'indef') {
    if (genderType === 'm') { articleSk = 'jeden '; expected = `ein ${baseAdj}er ${nounDe}`; hintPhrase = `ein / ${adjDe} / ${nounDe}`; ex = `Mužský rod. Po neurčitom člene ('ein'), ktorý rod neukazuje, ho prídavné meno musí ukázať (der -> -er).`; }
    if (genderType === 'f') { articleSk = 'jedna '; expected = `eine ${baseAdj}e ${nounDe}`; hintPhrase = `eine / ${adjDe} / ${nounDe}`; ex = `Ženský rod. Po neurčitom člene ('eine') dostáva prídavné meno koncovku -e.`; }
    if (genderType === 'n') { articleSk = 'jedno '; expected = `ein ${baseAdj}es ${nounDe}`; hintPhrase = `ein / ${adjDe} / ${nounDe}`; ex = `Stredný rod. Po neurčitom člene ('ein'), ktorý rod neukazuje, ho prídavné meno musí ukázať (das -> -es).`; }
  }

  if (articleType === 'keine' && genderType === 'pl') {
    articleSk = 'žiadne ';
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

  let cleanNounSk = nounSk.replace(/\([A-Zl]+\)/, '');
  let sentenceSk = `${articleSk}${adjSk} ${cleanNounSk}`.trim().toLowerCase();

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
console.log(`Used dictionaries: M:${Object.keys(masculine).length}, F:${Object.keys(feminine).length}, N:${Object.keys(neuter).length}, Pl:${Object.keys(plural).length}, Adjs:${Object.keys(adjectives).length}`);
console.log(`Generated 157 radically different FIB exercises.`);
