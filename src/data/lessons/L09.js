export const lesson09 = {
  id: 9,
  week: 2,
  day: 4,
  title: 'Zahlen 21–100 und der Genitiv-s bei Namen',
  topic: 'Čísla 21–100 a genitív pri vlastných menách (Janinas Brief)',
  cefr: 'A1',
  xpReward: 20,
  narrativeContext: 'Jana öffnet ihren Briefkasten. Da ist ein Brief von der VHS. Jana liest: Ihre Nummer ist 47. Dann ruft Jana Petra an: Wie ist deine Handynummer? Jana diktiert langsam.',
  communicativeGoal: 'Nach dieser Lektion kann ich Zahlen bis 100 sagen und schreiben, Telefonnummern diktieren und verstehen, und den Genitiv-s bei Namen benutzen.',
  skillFocus: ['vocabulary', 'grammar', 'listening', 'speaking'],

  grammarNotes: [
    {
      rule: 'Obrátená matematika: Ako Nemci počítajú odzadu (21-99)',
      explanation: `<p>Máme tu fenomén nemeckej obsesie s iným poradím, na ktorom stroskotá nejedna slovenská maturitná komisia. Od 21 do 99 Nemci <strong>diktujú čísla odzadu</strong>.</p>
<p>Predstavte si číslo 47. 100% z nás si najprv vysloví 40 a potom 7. Nemec nie! Zoberie najmenší, najnepodstatnejší zlomok čísla na konci (7), povie k nemu "A" (und), a potom dohodí tú masu desiatok (40). A aby toho nebolo málo, všetko to s revom zrazí do jedného obrovského slova.</p>
<p><strong>47 = sieben + und + vierzig = siebenundvierzig.</strong><br/> (Sedem-a-štyridsať)</p>
<table><tr><th>Desiatka</th><th>Nemecky</th><th>Hack a pasce pre oči</th></tr>
<tr><td>20</td><td>zwanzig</td><td>To už poznáme.</td></tr>
<tr><td>30</td><td>drei<strong>ß</strong>ig</td><td>⚠️ Výkričník! Jediná desiatka s ostrým ß miesto z!</td></tr>
<tr><td>40</td><td>vierzig</td><td></td></tr>
<tr><td>80</td><td>achtzig</td><td></td></tr>
</table>
<div class="tip-box">💡 <strong>Tip Profesora (Diktovanie čísiel):</strong> Keď vám niekto diktuje takto komplikované čísla cez telefón do bloku, robíte si pri tom mozgový skrat. Nemecké kompromisné riešenie? Telefónne čísla sa proste diktujú pekne pomaly ako šnúra znakov, jedno po druhom: 0-1-5-3 (null-eins-fünf-drei). Uf!</div>`,
      examples: [
        { de: 'Meine Nummer ist siebenundvierzig.', sk: 'Moje číslo je štyridsaťsedem.', note: '47 čítame ako "sedem-a-štyridsať"' },
        { de: 'Er ist dreißig Jahre alt.', sk: 'Má tridsať rokov.', note: 'pozor na dreißig s ostrým s!' },
        { de: 'Das kostet fünfundachtzig Euro.', sk: 'To stojí osemdesiatpäť eur.', note: '85 = fünf + und + achtzig' },
      ],
      slovakContrastNote: 'Pri čísle 24 si v slovenčine pekne poviete dvadsať a potom štyri, ale česi vedia povedať "čtyřiadvacet", čo je bližšie k nemeckému princípu "vierundzwanzig". My musíme úplne preklopiť mozog.',
    },
    {
      rule: 'Príslušnosť bez kudrliniek: Genitívne „-s“ a zákaz apostrofu',
      explanation: `<p>Apoštolská hrôza. Poznáte "Jana's coffee" alebo "Peter's car" z angličtiny? Vytrhnite to so sebou. Ak sa na to Nemec pozerá, vidí takzvané "idiotské apostrofy" (Deppenapostroph).</p>
<p>Ak v nemčine niečo patrí osobe s vlastným menom, prilepíte na meno jednoduché, čisté písmeno <strong>-s</strong>.</p>
<table><tr><th>Základ</th><th>Keď sa z neho stane vlastník</th></tr>
<tr><td>Jana</td><td><strong>Janinas</strong> Brief (Janin list)</td></tr>
<tr><td>Peter</td><td><strong>Peters</strong> Auto (Petrovo auto)</td></tr>
<tr><td>Maria</td><td><strong>Marias</strong> Handynummer (Mariine číslo)</td></tr>
</table>
<div class="warn-box">⚠️ <strong>Trestný bod:</strong> Ak niekedy na klávesnici v nemčine vyhľadáte apostrof pred písmenom "-s" na vyjadrenie príslušnosti mena, dostávate nepríjemný pohľad od akademika. Žiadne "Jana's Auto" neexistuje. Len <strong>Janas Auto</strong>.</div>`,
      examples: [
        { de: 'Das ist Janinas Brief.', sk: 'To je Janin list.' },
        { de: 'Peters Auto ist rot.', sk: 'Petrovo auto je červené.' },
      ],
      slovakContrastNote: 'V slovenčine máme radi komplexné skloňovania. Pridávame "ov" (Petrov) alebo "in" (Janin). V nemčine len chytia meno, hodia naň S-ko a majú hotovo bez ohľadu na pohlavie majiteľa.',
    },
  ],
  vocab: [
    {
      de: 'einundzwanzig',
      sk: 'dvadsaťjeden',
      gender: null,
      srsId: 'L09_V01',
      example: 'Jana ist einundzwanzig Jahre alt.',
      exampleSk: 'Jana má dvadsaťjeden rokov.',
      recycledFrom: [],
    },
    {
      de: 'dreißig',
      sk: 'tridsať',
      gender: null,
      srsId: 'L09_V02',
      example: 'Der Kurs hat dreißig Studenten.',
      exampleSk: 'Kurz má tridsať študentov.',
      recycledFrom: [],
    },
    {
      de: 'vierzig',
      sk: 'štyridsať',
      gender: null,
      srsId: 'L09_V03',
      example: 'Er ist vierzig Jahre alt.',
      exampleSk: 'Má štyridsať rokov.',
      recycledFrom: [],
    },
    {
      de: 'fünfzig',
      sk: 'päťdesiat',
      gender: null,
      srsId: 'L09_V04',
      example: 'Das kostet fünfzig Euro.',
      exampleSk: 'To stojí päťdesiat eur.',
      recycledFrom: [],
    },
    {
      de: 'sechzig',
      sk: 'šesťdesiat',
      gender: null,
      srsId: 'L09_V05',
      example: 'Meine Oma ist sechzig Jahre alt.',
      exampleSk: 'Moja stará mama má šesťdesiat rokov.',
      recycledFrom: [],
    },
    {
      de: 'siebzig',
      sk: 'sedemdesiat',
      gender: null,
      srsId: 'L09_V06',
      example: 'Mein Opa ist siebzig Jahre alt.',
      exampleSk: 'Môj starý otec má sedemdesiat rokov.',
      recycledFrom: [],
    },
    {
      de: 'achtzig',
      sk: 'osemdesiat',
      gender: null,
      srsId: 'L09_V07',
      example: 'Die Großmutter ist achtzig Jahre alt.',
      exampleSk: 'Stará mama má osemdesiat rokov.',
      recycledFrom: [],
    },
    {
      de: 'neunzig',
      sk: 'deväťdesiat',
      gender: null,
      srsId: 'L09_V08',
      example: 'Der Großvater ist neunzig Jahre alt.',
      exampleSk: 'Starý otec má deväťdesiat rokov.',
      recycledFrom: [],
    },
    {
      de: 'hundert',
      sk: 'sto',
      gender: null,
      srsId: 'L09_V09',
      example: 'Der Kurs kostet hundert Euro.',
      exampleSk: 'Kurz stojí sto eur.',
      recycledFrom: [],
    },
    {
      de: 'die Telefonnummer',
      sk: 'telefónne číslo',
      gender: 'F',
      srsId: 'L09_V10',
      example: 'Wie ist deine Telefonnummer?',
      exampleSk: 'Aké je tvoje telefónne číslo?',
      recycledFrom: [],
    },
    {
      de: 'die Handynummer',
      sk: 'číslo na mobil',
      gender: 'F',
      srsId: 'L09_V11',
      example: 'Jana hat eine neue Handynummer.',
      exampleSk: 'Jana má nové číslo na mobil.',
      recycledFrom: [],
    },
    {
      de: 'der Brief',
      sk: 'list (poštový)',
      gender: 'M',
      srsId: 'L09_V12',
      example: 'Da ist ein Brief von der VHS.',
      exampleSk: 'Tu je list z VHS.',
      recycledFrom: [],
    },
    {
      de: 'der Briefkasten',
      sk: 'poštová schránka',
      gender: 'M',
      srsId: 'L09_V13',
      example: 'Jana öffnet den Briefkasten.',
      exampleSk: 'Jana otvára poštovú schránku.',
      recycledFrom: [],
    },
    {
      de: 'anrufen',
      sk: 'zavolať (telefonicky)',
      gender: null,
      srsId: 'L09_V14',
      example: 'Jana ruft Petra an.',
      exampleSk: 'Jana zavolá Petre.',
      recycledFrom: [],
    },
    {
      de: 'diktieren',
      sk: 'diktovať',
      gender: null,
      srsId: 'L09_V15',
      example: 'Jana diktiert die Nummer langsam.',
      exampleSk: 'Jana diktuje číslo pomaly.',
      recycledFrom: [],
    },
    {
      de: 'Meine Nummer ist...',
      sk: 'Moje číslo je...',
      gender: null,
      srsId: 'L09_V16',
      example: 'Meine Nummer ist null-eins-fünf-drei.',
      exampleSk: 'Moje číslo je nula-jedna-päť-tri.',
      recycledFrom: [],
    },
    {
      de: 'Wie ist deine Nummer?',
      sk: 'Aké je tvoje číslo?',
      gender: null,
      srsId: 'L09_V17',
      example: 'Wie ist deine Handynummer?',
      exampleSk: 'Aké je tvoje číslo na mobil?',
      recycledFrom: [],
    },
    {
      de: 'Janinas Brief',
      sk: 'Janin list (genitív-s príklad)',
      gender: null,
      srsId: 'L09_V18',
      example: 'Das ist Janinas Brief von der VHS.',
      exampleSk: 'Toto je Janin list z VHS.',
      recycledFrom: [],
    },
    {
      de: 'Peters Auto',
      sk: 'Petrovo auto (genitív-s príklad)',
      gender: null,
      srsId: 'L09_V19',
      example: 'Peters Auto ist blau.',
      exampleSk: 'Petrovo auto je modré.',
      recycledFrom: [],
    },
  ],
  exercises: [
    // 1. FLASHCARD
    {
      type: 'flashcard',
      instruction: 'Prelistuj si slovíčka. Klikni na kartu, aby si videl preklad a príkladovú vetu.',
    },
    // 2. MATCH
    {
      type: 'match',
      instruction: 'Spoj čísla so slovami alebo nemecké výrazy so slovenským prekladom.',
      pairs: [
        ['30', 'dreißig'],
        ['47', 'siebenundvierzig'],
        ['50', 'fünfzig'],
        ['70', 'siebzig'],
        ['85', 'fünfundachtzig'],
        ['100', 'hundert'],
        ['der Brief', 'list (poštový)'],
        ['der Briefkasten', 'poštová schránka'],
        ['anrufen', 'zavolať'],
        ['diktieren', 'diktovať'],
      ],
    },
    // 3. WORDORDER
    {
      type: 'wordorder',
      instruction: 'Zoraď slová do správnej nemeckej vety.',
      sentences: [
        {
          words: ['Das', 'ist', 'Janinas', 'Brief'],
          correct: 'Das ist Janinas Brief',
          hint: 'To je Janin list.',
          explanation: 'Genitív-s: Jana → Janinas. Meno sa stáva prívlastkom bez apostrofu. Genitívna forma stojí pred podstatným menom.',
        },
        {
          words: ['Meine', 'Nummer', 'ist', 'siebenundvierzig'],
          correct: 'Meine Nummer ist siebenundvierzig',
          hint: 'Moje číslo je štyridsaťsedem.',
          explanation: 'Číslo 47 = sieben (7) + und + vierzig (40) = siebenundvierzig. Jednotky sú vždy pred desiatkami a celé číslo sa píše ako jedno slovo.',
        },
        {
          words: ['Jana', 'ruft', 'Petra', 'an'],
          correct: 'Jana ruft Petra an',
          hint: 'Jana zavolá Petre.',
          explanation: 'anrufen je odlučiteľné sloveso (trennbares Verb). Predpona "an" ide na koniec jednoduchej vety: Jana ruft Petra an.',
        },
        {
          words: ['Peters', 'Auto', 'ist', 'blau'],
          correct: 'Peters Auto ist blau',
          hint: 'Petrovo auto je modré.',
          explanation: 'Genitív-s: Peter → Peters. V nemčine sa nepíše apostrof. Peters Auto = Petrovo auto.',
        },
        {
          words: ['Wie', 'ist', 'deine', 'Handynummer'],
          correct: 'Wie ist deine Handynummer',
          hint: 'Aké je tvoje číslo na mobil?',
          explanation: 'Opytovacia veta s "Wie" — sloveso nasleduje hneď po opytovacom výraze (invertovaný slovosled).',
        },
        {
          words: ['Jana', 'diktiert', 'die', 'Nummer', 'langsam'],
          correct: 'Jana diktiert die Nummer langsam',
          hint: 'Jana diktuje číslo pomaly.',
          explanation: 'Príslovka (langsam – pomaly) stojí na konci vety za priamym predmetom (die Nummer).',
        },
      ],
    },
    // 4. FILL
    {
      type: 'fill',
      instruction: 'Doplň správne slovo do vety.',
      questions: [
        {
          sentence: 'Jana öffnet den ___.',
          answer: 'Briefkasten',
          hint: 'poštová schránka (M)',
          explanation: 'der Briefkasten = poštová schránka. Jana otvára poštovú schránku.',
        },
        {
          sentence: 'Das ist ___ Brief von der VHS. (Jana)',
          answer: 'Janinas',
          hint: 'Jana + genitív-s',
          explanation: 'Jana → Janinas (genitív-s, bez apostrofu). Janinas Brief = Janin list.',
        },
        {
          sentence: 'Ihre Nummer ist ___ . (47)',
          answer: 'siebenundvierzig',
          hint: 'štyridsaťsedem — 7 + und + 40',
          explanation: '47 = sieben (7) + und + vierzig (40) = siebenundvierzig. Jednotky vždy pred desiatkami.',
        },
        {
          sentence: 'Das ist ___ Auto. (Peter)',
          answer: 'Peters',
          hint: 'Peter + genitív-s',
          explanation: 'Peter → Peters (genitív-s, bez apostrofu). Peters Auto = Petrovo auto.',
        },
        {
          sentence: 'Jana ___ Petra an. (anrufen, Präsens)',
          answer: 'ruft',
          hint: 'zavolá — 3. osoba j.č. od anrufen',
          explanation: 'anrufen: ich rufe an, du rufst an, er/sie ruft an. Predpona "an" ide na koniec vety.',
        },
        {
          sentence: 'Der Kurs hat ___ Studenten. (30)',
          answer: 'dreißig',
          hint: 'tridsať — pozor na ß!',
          explanation: '30 = dreißig. Pozor: píše sa s ß, nie "dreizzig" ani "dreisig". Toto je výnimka medzi desiatkami.',
        },
        {
          sentence: 'Ich ___ eine Schwester. (haben — OPAKOVANIE)',
          answer: 'habe',
          hint: 'mám — haben, 1. osoba j.č.',
          explanation: 'Opakovanie L07: haben — ich habe, du hast, er/sie/es hat, wir haben.',
        },
        {
          sentence: 'Das ist ___ Buch. (ich — OPAKOVANIE)',
          answer: 'mein',
          hint: 'môj/moje — neutrálny rod (das Buch)',
          explanation: 'Opakovanie L08: das Buch (neutrum, nominatív) → mein Buch. Nie "meine" — to je pre feminínum.',
        },
      ],
    },
    // 5. LISTEN
    {
      type: 'listen',
      instruction: 'Počúvaj a napíš, čo počuješ.',
      questions: [
        { de: 'dreißig', sk: 'tridsať' },
        { de: 'vierzig', sk: 'štyridsať' },
        { de: 'fünfzig', sk: 'päťdesiat' },
        { de: 'sechzig', sk: 'šesťdesiat' },
        { de: 'siebzig', sk: 'sedemdesiat' },
        { de: 'achtzig', sk: 'osemdesiat' },
        { de: 'neunzig', sk: 'deväťdesiat' },
        { de: 'hundert', sk: 'sto' },
        { de: 'siebenundvierzig', sk: 'štyridsaťsedem' },
        { de: 'Janinas Brief', sk: 'Janin list' },
      ],
    },
    // 6. MCQ
    {
      type: 'mcq',
      instruction: 'Vyber správnu odpoveď.',
      questions: [
        {
          question: 'Ako sa po nemecky píše číslo 30?',
          options: ['dreizzig', 'dreißig', 'dreisig', 'dreizig'],
          answer: 1,
          explanation: 'dreißig — píše sa s ß, nie "dreizzig" ani "dreisig". Toto je jediná desiatka s ß a je to dôležitá výnimka na zapamätanie.',
        },
        {
          question: 'Ako sa po nemecky vyjadří číslo 47?',
          options: ['vierzigsieben', 'siebenundvierzig', 'vierzigseven', 'siebensvierzig'],
          answer: 1,
          explanation: '47 = sieben (7) + und + vierzig (40) = siebenundvierzig. Vždy jednotky + und + desiatky, písané ako jedno slovo.',
        },
        {
          question: 'Ako vyjadríme "Janin list" po nemecky?',
          options: ["Jana's Brief", 'Janas Brief', 'Janinas Brief', 'Jana Brief'],
          answer: 2,
          explanation: 'Jana → Janinas (genitív-s). V nemčine sa nepíše apostrof. Keďže Jana končí na -a, pridáme -s: Janinas. Pozor: nie "Janas" — základná forma je Jana, nie Jan.',
        },
        {
          question: 'Ako sa v nemčine diktujú telefónne čísla?',
          options: ['Ako jedno veľké číslo', 'Číslica po číslici', 'Vždy po dvojiciferných skupinách', 'Iba párne číslice'],
          answer: 1,
          explanation: 'Telefónne čísla sa diktujú číslica po číslici: 0153 = null-eins-fünf-drei. Toto je bežný hovorový štandard v nemčine.',
        },
        {
          question: 'Ktoré číslo je "fünfundachtzig"?',
          options: ['58', '75', '85', '95'],
          answer: 2,
          explanation: 'fünf (5) + und + achtzig (80) = 85. Jednotky pred desiatkami — vždy!',
        },
        {
          question: 'Ktorá veta SPRÁVNE používa genitív-s pri vlastnom mene?',
          options: ["Peter's Auto ist rot.", 'Peters Auto ist rot.', 'Peter Auto ist rot.', 'Von Peter ist das Auto rot.'],
          answer: 1,
          explanation: 'V nemčine sa genitív-s pri vlastných menách píše bez apostrofu: Peters Auto (nie Peter\'s Auto ako v angličtine).',
        },
        {
          question: 'Opakovanie L08: Ako správne doplníte? "Das ist ___ Heft." (ich)',
          options: ['mein', 'meine', 'meinen', 'meinem'],
          answer: 0,
          explanation: 'Opakovanie L08: das Heft je neutrum → mein (nie meine, to je pre feminínum). mein Heft = môj zošit.',
        },
      ],
    },
    // 7. MINITEXT
    {
      type: 'minitext',
      instruction: 'Prečítaj si krátky príbeh a odpovedaj na otázky.',
      text: 'Jana öffnet den Briefkasten. Da ist ein Brief — Janinas Brief von der VHS. Jana liest: Ihre Nummer ist 47. Jana ruft Petra an. "Hallo Petra! Das ist Janinas Brief. Meine Nummer ist siebenundvierzig." Petra fragt: "Wie ist deine Handynummer?" Jana diktiert: "Null — eins — fünf — drei." Petra schreibt die Nummer.',
      textSk: 'Jana otvára poštovú schránku. Je tu list — Janinin list z VHS. Jana číta: Vaše číslo je 47. Jana zavolá Petre. „Ahoj Petra! To je Janinin list. Moje číslo je štyridsaťsedem." Petra sa pýta: „Aké je tvoje číslo na mobil?" Jana diktuje: „Nula — jedna — päť — tri." Petra číslo zapisuje.',
      questions: [
        {
          question: 'Von wem ist der Brief?',
          options: ['Von Petra', 'Von der VHS', 'Von Peters', 'Von der Schule'],
          answer: 1,
          explanation: 'Im Text steht: "Janinas Brief von der VHS" — der Brief kommt von der VHS.',
        },
        {
          question: 'Was ist Janas Nummer bei der VHS?',
          options: ['74', '37', '47', '100'],
          answer: 2,
          explanation: 'Im Text steht: "Meine Nummer ist siebenundvierzig" — das ist 47.',
        },
        {
          question: 'Was macht Petra am Ende des Textes?',
          options: ['Petra ruft Jana an.', 'Petra öffnet den Briefkasten.', 'Petra schreibt die Nummer.', 'Petra diktiert die Nummer.'],
          answer: 2,
          explanation: 'Im Text steht am Ende: "Petra schreibt die Nummer."',
        },
        {
          question: 'Wie ist Janas Handynummer (die ersten vier Ziffern)?',
          options: ['null-drei-fünf-eins', 'null-eins-fünf-drei', 'eins-null-drei-fünf', 'drei-fünf-null-eins'],
          answer: 1,
          explanation: 'Im Text steht: "Null — eins — fünf — drei" — also 0153.',
        },
        {
          question: 'Was bedeutet "Janinas Brief" auf Slowakisch?',
          options: ['Petrin list', 'Janin list', 'list od Jany', 'Janov list'],
          answer: 1,
          explanation: 'Janinas = Genitiv-s von Jana → Janinas Brief = Janin list. Jana ist weiblich, daher "Janin" auf Slowakisch.',
        },
      ],
    },
    // 8. SPEAKING
    {
      type: 'speaking',
      instruction: 'Čítaj nahlas a precvičuj výslovnosť nemeckých čísiel a fráz.',
      phrases: [
        {
          de: 'dreißig, vierzig, fünfzig',
          sk: 'tridsať, štyridsať, päťdesiat',
          tip: 'dreißig = DRAYsikh; ß znie ako ostré "s"',
        },
        {
          de: 'sechzig, siebzig, achtzig, neunzig',
          sk: 'šesťdesiat, sedemdesiat, osemdesiat, deväťdesiat',
          tip: 'siebzig: nie "sieben" — skrátene: ZEEPtsikh',
        },
        {
          de: 'Meine Handynummer ist null-eins-fünf-drei.',
          sk: 'Moje číslo na mobil je nula-jedna-päť-tri.',
          tip: 'fünf: zaokrúhlené pery pre ü — FUENF',
        },
        {
          de: 'Das ist Janinas Brief.',
          sk: 'To je Janin list.',
          tip: 'Janinas: YAH-nee-nahs — dôraz na 1. slabiku',
        },
        {
          de: 'Wie ist deine Handynummer?',
          sk: 'Aké je tvoje číslo na mobil?',
          tip: 'Handynummer: HAHN-dee-NOO-mər',
        },
        {
          de: 'Meine Nummer ist siebenundvierzig.',
          sk: 'Moje číslo je štyridsaťsedem.',
          tip: 'siebenundvierzig: ZEEben-oont-FEERtsikh',
        },
        {
          de: 'Jana ruft Petra an.',
          sk: 'Jana zavolá Petre.',
          tip: 'an = na konci, krátka prízvučná slabika: AN',
        },
      ],
    },
    // 9. TRUEFALSE
    {
      type: 'truefalse',
      instruction: 'Je tvrdenie pravdivé (wahr) alebo nepravdivé (falsch)?',
      statements: [
        {
          statement: '30 sa po nemecky píše "dreizzig".',
          answer: false,
          explanation: 'Nepravdivé. 30 = dreißig — píše sa s ß, nie double-z. Toto je jediná desiatka s ß!',
        },
        {
          statement: 'V nemčine pri číslach 21–99 idú desiatky PRED jednotkami (napr. vierzigsieben = 47).',
          answer: false,
          explanation: 'Nepravdivé. V nemčine sú JEDNOTKY pred desiatkami: 47 = siebenundvierzig (sieben + und + vierzig). Poradie je opačné oproti slovenčine.',
        },
        {
          statement: '"Peters Auto" je správny nemecký genitív-s (bez apostrofu).',
          answer: true,
          explanation: 'Pravdivé. V nemčine sa genitív-s pri vlastných menách píše bez apostrofu: Peters Auto (nie Peter\'s Auto).',
        },
        {
          statement: '85 po nemecky je "fünfundachtzig".',
          answer: true,
          explanation: 'Pravdivé. fünf (5) + und + achtzig (80) = fünfundachtzig. Jednotky pred desiatkami.',
        },
        {
          statement: 'Telefónne čísla sa v nemčine diktujú vždy ako jeden dlhý číslovka.',
          answer: false,
          explanation: 'Nepravdivé. Telefónne čísla sa diktujú číslica po číslici: 0153 = null-eins-fünf-drei.',
        },
        {
          statement: '"Janinas" je správna genitívna forma od mena Jana.',
          answer: true,
          explanation: 'Pravdivé. Jana + s = Janinas. Genitív-s sa pridáva priamo k základnému tvaru mena bez apostrofu a bez zmeny mena.',
        },
      ],
    },
    // 10. DICTATION
    {
      type: 'dictation',
      instruction: 'Počúvaj a napíš celú vetu alebo výraz.',
      sentences: [
        {
          de: 'Das ist dreißig.',
          sk: 'To je tridsať.',
          hint: 'Pozor na ß v dreißig!',
        },
        {
          de: 'Meine Nummer ist siebenundvierzig.',
          sk: 'Moje číslo je štyridsaťsedem.',
          hint: '47 = sieben + und + vierzig',
        },
        {
          de: 'Das ist Janinas Brief.',
          sk: 'To je Janin list.',
          hint: 'Jana → Janinas (genitív-s, bez apostrofu)',
        },
        {
          de: 'Jana ruft Petra an.',
          sk: 'Jana zavolá Petre.',
          hint: 'anrufen: ruft...an — odlučiteľné sloveso',
        },
        {
          de: 'Peters Auto ist blau.',
          sk: 'Petrovo auto je modré.',
          hint: 'Peter → Peters (genitív-s)',
        },
        {
          de: 'Meine Handynummer ist null-eins-fünf-drei.',
          sk: 'Moje číslo na mobil je nula-jedna-päť-tri.',
          hint: 'Telefónne čísla: číslica po číslici',
        },
      ],
    },
    // 11. CATEGORYSORT
    {
      type: 'categorysort',
      instruction: 'Zaraď výrazy do správnej kategórie.',
      categories: ['Desiatky (20–100)', 'Zložené čísla (21–99)', 'Genitív-s formy'],
      items: [
        { text: 'dreißig', category: 'Desiatky (20–100)' },
        { text: 'fünfzig', category: 'Desiatky (20–100)' },
        { text: 'siebzig', category: 'Desiatky (20–100)' },
        { text: 'hundert', category: 'Desiatky (20–100)' },
        { text: 'einundzwanzig', category: 'Zložené čísla (21–99)' },
        { text: 'siebenundvierzig', category: 'Zložené čísla (21–99)' },
        { text: 'fünfundachtzig', category: 'Zložené čísla (21–99)' },
        { text: 'dreiunddreißig', category: 'Zložené čísla (21–99)' },
        { text: 'Janinas', category: 'Genitív-s formy' },
        { text: 'Peters', category: 'Genitív-s formy' },
        { text: 'Petras', category: 'Genitív-s formy' },
        { text: 'Marias', category: 'Genitív-s formy' },
      ],
    },
    // 12. TRANSLATION
    {
      type: 'translation',
      instruction: 'Prelož vety zo slovenčiny do nemčiny.',
      sentences: [
        {
          sk: 'Moje číslo je päťdesiat.',
          de: 'Meine Nummer ist fünfzig.',
          hint: 'päťdesiat = fünfzig',
        },
        {
          sk: 'To je Petrin zošit.',
          de: 'Das ist Petras Heft.',
          hint: 'Petra → Petras (genitív-s)',
        },
        {
          sk: 'Jana diktuje číslo pomaly.',
          de: 'Jana diktiert die Nummer langsam.',
          hint: 'diktovať = diktieren',
        },
        {
          sk: 'Aké je tvoje telefónne číslo?',
          de: 'Wie ist deine Telefonnummer?',
          hint: 'Wie ist...? = Aké je...?',
        },
        {
          sk: 'Kurz stojí osemdesiatpäť eur.',
          de: 'Der Kurs kostet fünfundachtzig Euro.',
          hint: 'osemdesiatpäť = fünfundachtzig',
        },
      ],
    },
    // 13. CONJUGATION
    {
      type: 'conjugation',
      instruction: 'Pozri si časovanie slovies v prítomnom čase.',
      verbs: [
        {
          infinitive: 'anrufen',
          note: 'Odlučiteľné sloveso (trennbares Verb). Predpona "an" ide na koniec jednoduchej vety. Vzor: Jana ruft Petra an. (nie: Jana anruft Petra)',
          forms: [
            { pronoun: 'ich', form: 'rufe ... an' },
            { pronoun: 'du', form: 'rufst ... an' },
            { pronoun: 'er/sie/es', form: 'ruft ... an' },
            { pronoun: 'wir', form: 'rufen ... an' },
            { pronoun: 'ihr', form: 'ruft ... an' },
            { pronoun: 'sie/Sie', form: 'rufen ... an' },
          ],
        },
        {
          infinitive: 'diktieren',
          note: 'Pravidelné sloveso zakončené na -ieren. Tieto slovesá sa časujú pravidelne a nikdy nemenia kmeň. Koncovky: -e, -st, -t, -en, -t, -en.',
          forms: [
            { pronoun: 'ich', form: 'diktiere' },
            { pronoun: 'du', form: 'diktierst' },
            { pronoun: 'er/sie/es', form: 'diktiert' },
            { pronoun: 'wir', form: 'diktieren' },
            { pronoun: 'ihr', form: 'diktiert' },
            { pronoun: 'sie/Sie', form: 'diktieren' },
          ],
        },
      ],
    },
  ],
  reviewWords: ['L08_V09'],
  lessonNotes: 'V tejto lekcii sme sa naučili čísla od 21 do 100. Kľúčovým vzorom je jednotky + und + desiatky, písané ako jedno slovo (einundzwanzig, siebenundvierzig). Dôležitá výnimka: 30 = dreißig (s ß!). Naučili sme sa tiež genitív-s pri vlastných menách — pridáme -s bez apostrofu: Jana → Janinas, Peter → Peters. Telefónne čísla diktujeme číslicu po číslici.',
};
