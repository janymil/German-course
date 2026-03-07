export const lesson05 = {
  id: 5,
  week: 1,
  day: 5,
  title: 'Berufe und Arbeit',
  topic: 'Povolania (mužský/ženský rod, koncovka -in). (arbeiten als).',
  cefr: 'A1',
  xpReward: 20,
  narrativeContext: 'Jana sa rozpráva so svojimi novými známymi o tom, čo robia a čím sa živia.',
  communicativeGoal: 'Po tejto lekcii viem povedať, aké je moje povolanie a opýtať sa na to ostatných.',
  skillFocus: ['vocabulary', 'grammar', 'reading', 'speaking'],
  grammarNotes: [
    {
      rule: 'Povolania sú súčasťou identity (A prečo nepoužívame člen)',
      explanation: `<p>V angličtine poviete „I am A doctor". V nedokonalej nemčine to ľudia doslovne prekladajú „Ich bin ein Arzt". <strong>Zastavte!</strong> Pre Nemcov je povolanie súčasťou toho, kým vo vnútri ste. Nie je to nejaký vonkajší, náhodný objekt. Ste tým, čo robíte.</p>
<p>Preto poviete úplne úderne, čisto a hrdo, bez akéhokoľvek „ein": <strong>„Ich bin Arzt."</strong> (Som lekár).</p>
<h4>Ženy to majú v nemčine ľahké</h4>
<p>Ženské povolania sa tvoria geniálne jednoducho — ako keby ste mali pečiatku <strong>„-in"</strong>. Capnete ju na mužský tvar a hotovo:</p>
<table><thead><tr><th>Mužský rod (der)</th><th>Ženský rod (die)</th></tr></thead><tbody>
<tr><td>der <strong>Lehrer</strong></td><td>die <strong>Lehrerin</strong></td></tr>
<tr><td>der <strong>Student</strong></td><td>die <strong>Studentin</strong></td></tr>
<tr><td>der <strong>Informatiker</strong></td><td>die <strong>Informatikerin</strong></td></tr>
</tbody></table>
<div class="tip-box">💡 <strong>Hack od Profesora:</strong> Pozor na niektoré tradičné povolania utkané v histórii, kde musíte urobiť malú fonetickú úpravu - prehlásku. „Arzt" (lekár) sa zmení na „Ärztin", „Koch" (kuchár) na „Köchin". Sú to výnimky, ale je ich len pár.</div>`,
      examples: [
        { de: 'Ich bin Arzt.', sk: 'Som lekár.', note: 'Pozor: žiadne vkladanie člena "ein"!' },
        { de: 'Sie ist Lehrerin.', sk: 'Ona je učiteľka.' }
      ],
      slovakContrastNote: 'Obe krajiny tvoria prácu veľmi identicky, v slovenčine pridávame "ka" (študent - študentka), v nemčine "-in" (Student - Studentin). A v obidvoch jazykoch nepoužívame pri predstavovaní neurčitý člen.'
    },
    {
      rule: 'Otázka na telo: Was machst du von Beruf?',
      explanation: `<p>Môžete sa opýtať „Gde robíš?" (Wo arbeitest du?), ale ak chcete skutočne vedieť, čím sa človek živí, položíte otázku na jeho identitu.</p>
<ul>
<li><strong>Was machst du von Beruf?</strong> = Aké je tvoje povolanie? (Doslova: Čo robíš od povolania?)</li>
</ul>
<p>Odpovedať môžete dvoma spôsobmi. Prvý sme už zvládli („Ich bin Arzt"). Druhý používa predložku <strong>„als"</strong>, ktorá tu znamená výlučne „v roli, vo funkcii":</p>
<p><strong>Ich arbeite als Informatiker.</strong></p>
<div class="warn-box">⚠️ <strong>Trestný bod u Profesora:</strong> Predložka „als" má v nemčine aj iné významy (napr. pri porovnávaní „ako"). Ale pri povolaniach sa prilepí na sloveso arbeiten a funguje ako spona k profesii.</div>`,
      examples: [
        { de: 'Was machst du von Beruf?', sk: 'Aké máš povolanie?', note: 'Takto sa pýtajú "natives".' },
        { de: 'Ich arbeite als Informatiker.', sk: 'Pracujem ako informatik (v roli informatika).' },
      ],
      slovakContrastNote: 'Dokonalá zhoda. Pracujem „ako" učiteľ. Ich arbeite „als" Lehrer.'
    },
  ],
  vocab: [
    {
      de: 'arbeiten',
      sk: 'pracovať',
      gender: null,
      srsId: 'L05_V01',
      example: 'Ich arbeite viel.',
      exampleSk: 'Ja veľa pracujem.',
      recycledFrom: []
    },
    {
      de: 'als',
      sk: 'ako (v povahe, vo funkcii)',
      gender: null,
      srsId: 'L05_V02',
      example: 'Ich arbeite als Informatiker.',
      exampleSk: 'Pracujem ako informatik.',
      recycledFrom: []
    },
    {
      de: 'der Beruf',
      sk: 'povolanie, profesia',
      gender: 'M',
      srsId: 'L05_V03',
      example: 'Was ist dein Beruf?',
      exampleSk: 'Aké je tvoje povolanie?',
      recycledFrom: []
    },
    {
      de: 'der Lehrer',
      sk: 'učiteľ',
      gender: 'M',
      srsId: 'L05_V04',
      example: 'Der Lehrer fragt.',
      exampleSk: 'Učiteľ sa pýta.',
      recycledFrom: []
    },
    {
      de: 'die Lehrerin',
      sk: 'učiteľka',
      gender: 'F',
      srsId: 'L05_V05',
      example: 'Die Lehrerin arbeitet gern.',
      exampleSk: 'Učiteľka rada pracuje.',
      recycledFrom: []
    },
    {
      de: 'der Arzt',
      sk: 'lekár',
      gender: 'M',
      srsId: 'L05_V06',
      example: 'Der Arzt ist da.',
      exampleSk: 'Lekár je tu.',
      recycledFrom: []
    },
    {
      de: 'die Ärztin',
      sk: 'lekárka',
      gender: 'F',
      srsId: 'L05_V07',
      example: 'Maria ist Ärztin.',
      exampleSk: 'Mária je lekárka.',
      recycledFrom: []
    },
    {
      de: 'der Student',
      sk: 'študent',
      gender: 'M',
      srsId: 'L05_V08',
      example: 'Der Student studiert viel.',
      exampleSk: 'Študent veľa študuje.',
      recycledFrom: []
    },
    {
      de: 'die Studentin',
      sk: 'študentka',
      gender: 'F',
      srsId: 'L05_V08b',
      example: 'Jana ist Studentin.',
      exampleSk: 'Jana je študentka.',
      recycledFrom: []
    },
    {
      de: 'der Informatiker',
      sk: 'informatik',
      gender: 'M',
      srsId: 'L05_V09',
      example: 'Er ist Informatiker.',
      exampleSk: 'On je informatik.',
      recycledFrom: []
    },
    {
      de: 'die Informatikerin',
      sk: 'informatička',
      gender: 'F',
      srsId: 'L05_V09b',
      example: 'Sie arbeitet als Informatikerin.',
      exampleSk: 'Pracuje ako informatička.',
      recycledFrom: []
    },
    {
      de: 'der Koch',
      sk: 'kuchár',
      gender: 'M',
      srsId: 'L05_V10b',
      example: 'Der Koch arbeitet im Restaurant.',
      exampleSk: 'Kuchár pracuje v reštaurácii.',
      recycledFrom: []
    },
    {
      de: 'die Köchin',
      sk: 'kuchárka',
      gender: 'F',
      srsId: 'L05_V10c',
      example: 'Die Köchin kocht sehr gut.',
      exampleSk: 'Kuchárka varí veľmi dobre.',
      recycledFrom: []
    },
    {
      de: 'studieren',
      sk: 'študovať (na vysokej škole)',
      gender: null,
      srsId: 'L05_V10',
      example: 'Jana studiert.',
      exampleSk: 'Jana študuje.',
      recycledFrom: []
    },
    {
      de: 'machen',
      sk: 'robiť',
      gender: null,
      srsId: 'L05_V11',
      example: 'Was machst du?',
      exampleSk: 'Čo robíš?',
      recycledFrom: []
    },
    {
      de: 'gern',
      sk: 'rád (s obľubou)',
      gender: null,
      srsId: 'L05_V12',
      example: 'Ich arbeite gern.',
      exampleSk: 'Rád pracujem.',
      recycledFrom: []
    },
    {
      de: 'viel',
      sk: 'veľa',
      gender: null,
      srsId: 'L05_V13',
      example: 'Wir arbeiten viel.',
      exampleSk: 'My veľa pracujeme.',
      recycledFrom: []
    },
    {
      de: 'wenig',
      sk: 'málo',
      gender: null,
      srsId: 'L05_V14',
      example: 'Er arbeitet wenig.',
      exampleSk: 'On pracuje málo.',
      recycledFrom: []
    },
    {
      de: 'die Arbeit',
      sk: 'práca',
      gender: 'F',
      srsId: 'L05_V15',
      example: 'Die Arbeit ist gut.',
      exampleSk: 'Tá práca je dobrá.',
      recycledFrom: []
    },
    {
      de: 'der Verkäufer',
      sk: 'predavač',
      gender: 'M',
      srsId: 'L05_V16',
      example: 'Der Verkäufer arbeitet im Geschäft.',
      exampleSk: 'Predavač pracuje v obchode.',
      recycledFrom: []
    },
    {
      de: 'die Verkäuferin',
      sk: 'predavačka',
      gender: 'F',
      srsId: 'L05_V17',
      example: 'Die Verkäuferin ist sehr nett.',
      exampleSk: 'Predavačka je veľmi milá.',
      recycledFrom: []
    },
    {
      de: 'Was machst du von Beruf?',
      sk: 'Aké máš povolanie?',
      gender: null,
      srsId: 'L05_V18',
      example: 'Was machst du von Beruf? — Ich bin Ärztin.',
      exampleSk: 'Aké máš povolanie? — Som lekárka.',
      recycledFrom: []
    }
  ],
  exercises: [
    {
      type: 'flashcard',
      instruction: 'Prezri si nové slovíčka z tejto lekcie. Kliknutím na preklad si slovíčko otočíš.'
    },
    {
      type: 'match',
      instruction: 'Priraď nemecké výrazy k ich slovenským prekladom.',
      pairs: [
        ['arbeiten', 'pracovať'],
        ['der Beruf', 'povolanie'],
        ['der Arzt', 'lekár'],
        ['die Ärztin', 'lekárka'],
        ['der Koch', 'kuchár'],
        ['die Köchin', 'kuchárka'],
        ['der Verkäufer', 'predavač'],
        ['die Verkäuferin', 'predavačka'],
        ['als', 'ako (povolanie)'],
        ['die Arbeit', 'práca']
      ]
    },
    {
      type: 'wordorder',
      instruction: 'Zostav vety v správnom poradí.',
      sentences: [
        {
          words: ['Ich', 'arbeite', 'als', 'Lehrer'],
          correct: 'Ich arbeite als Lehrer',
          hint: 'Pracujem ako učiteľ.',
          explanation: 'Pri povolaniach používame predložku \'als\' bez neurčitého člena.'
        },
        {
          words: ['Bist', 'du', 'Ärztin'],
          correct: 'Bist du Ärztin',
          hint: 'Si lekárka?',
          explanation: 'Otázka vždy začína slovesom. Ženské povolanie dostáva koncovku \'-in\'.'
        },
        {
          words: ['Was', 'machst', 'du', 'von', 'Beruf'],
          correct: 'Was machst du von Beruf',
          hint: 'Aké je tvoje povolanie?',
          explanation: 'Toto je bežná nemecká fráza (idióm) pre otázku: Aké máš povolanie?'
        },
        {
          words: ['Er', 'ist', 'Informatiker'],
          correct: 'Er ist Informatiker',
          hint: 'On je informatik.',
          explanation: 'Pri prezentovaní povolania so slovesom \'sein\' odpovedáme rovno bez člena.'
        }
      ]
    },
    {
      type: 'fill',
      instruction: 'Doplň správne slovo do vety.',
      questions: [
        {
          sentence: 'Ich arbeite ___ Informatiker.',
          answer: 'als',
          hint: 'ako (v povahe povolania)',
          explanation: 'Pri vyjadrovaní svojho povolania s \'arbeiten\' používame \'als\'.'
        },
        {
          sentence: 'Herr Müller ist Arzt und Frau Müller ist Ärzt___.',
          answer: 'in',
          hint: 'lekárka (koncovka)',
          explanation: 'Ženské povolanie dostáva príponu \'-in\'.'
        },
        {
          sentence: 'Was ___ du von Beruf?',
          answer: 'machst',
          hint: 'robíš',
          explanation: 'Zaužívaná nemecká fráza \'Was machst du von Beruf?\'.'
        },
        {
          sentence: 'Ich arbeite nicht, ich ___.',
          answer: 'studiere',
          hint: 'študujem',
          explanation: 'Ak niekto ešte študuje, na univerzite, povie: \'ich studiere\'.'
        },
        {
          sentence: 'Sie arbeiten ___.',
          answer: 'viel',
          hint: 'veľa',
          explanation: 'Pri kvantite (často, dlho) sa jednoducho použije slovíčko \'viel\'.'
        }
      ]
    },
    {
      type: 'listen',
      instruction: 'Vypočuj si slovo/frázu a napíš, čo počuješ.',
      questions: [
        { de: 'der Beruf', sk: 'povolanie' },
        { de: 'arbeiten', sk: 'pracovať' },
        { de: 'die Ärztin', sk: 'lekárka' },
        { de: 'der Student', sk: 'študent' },
        { de: 'die Arbeit', sk: 'práca' },
        { de: 'der Koch', sk: 'kuchár' },
        { de: 'die Köchin', sk: 'kuchárka' },
        { de: 'die Lehrerin', sk: 'učiteľka' },
        { de: 'der Verkäufer', sk: 'predavač' },
        { de: 'die Informatikerin', sk: 'informatička' }
      ]
    },
    {
      type: 'mcq',
      instruction: 'Vyber správnu možnosť podľa kontextu vety a gramatiky.',
      questions: [
        {
          question: 'Welcher Satz ist richtig? "Sie ist ___"',
          questionSk: 'Ktorá veta je správna? "Ona je ___"',
          options: ['Sie ist Lehrerin.', 'Sie ist Lehrer.', 'Er ist Lehrerin.', 'Sie bin Lehrerin.'],
          answer: 0,
          explanation: 'Ženský rod povolania dostáva príponu "-in" → "Lehrerin". Tretia osoba: "ist".'
        },
        {
          question: 'Ergänze: Ich arbeite ___ Arzt.',
          questionSk: 'Doplň: Pracujem ___ lekár.',
          options: ['wie', 'von', 'als', 'ein'],
          answer: 2,
          explanation: '"Arbeiten als" = pracovať ako (v zmysle povolania).'
        },
        {
          question: 'Welches Wort ist maskulin (der)?',
          questionSk: 'Ktoré slovo je mužského rodu (der)?',
          options: ['Ärztin', 'Student', 'Arbeit', 'Lehrerin'],
          answer: 1,
          explanation: '"Student" je mužský rod (der Student). Slová s "-in" sú ženské.'
        },
        {
          question: 'Was bedeutet "Was machst du von Beruf?"',
          questionSk: 'Čo znamená "Was machst du von Beruf?"',
          options: ['Wo arbeitest du?', 'Was machst du gern?', 'Was bist du von Beruf?', 'Wann arbeitest du?'],
          answer: 2,
          explanation: '"Was machst du von Beruf?" je zaužívaná fráza na zistenie povolania.'
        }
      ]
    },
    {
      type: 'minitext',
      instruction: 'Prečítaj si pokračovanie príbehu Jany a odpovedz na otázky.',
      text: 'In der Pause sprechen die Kursteilnehmer über ihre Berufe. Lukas arbeitet als Informatiker bei einer Firma in Wien. Maria ist Ärztin und arbeitet im Krankenhaus. Jana studiert noch — sie ist Studentin. Im Kurs sind auch ein Lehrer, eine Verkäuferin und ein Koch. Alle haben verschiedene Berufe, aber sie lernen zusammen Deutsch. Jana findet das sehr interessant.',
      textSk: 'Počas prestávky hovoria účastníci kurzu o svojich povolaniach. Lukas pracuje ako informatik vo firme vo Viedni. Maria je lekárka a pracuje v nemocnici. Jana ešte študuje — je študentka. V kurze sú aj učiteľ, predavačka a kuchár. Všetci majú rôzne povolania, ale spolu sa učia nemčinu. Jana to považuje za veľmi zaujímavé.',
      questions: [
        {
          question: 'Was ist Lukas von Beruf?',
          questionSk: 'Aké je Lukasovo povolanie?',
          options: ['Arzt', 'Student', 'Informatiker', 'Lehrer'],
          answer: 2,
          explanation: 'Text hovorí: „Lukas arbeitet als Informatiker bei einer Firma in Wien."'
        },
        {
          question: 'Was macht Jana?',
          questionSk: 'Čo robí Jana?',
          options: ['Sie ist Lehrerin.', 'Sie arbeitet als Ärztin.', 'Sie ist Informatikerin.', 'Sie studiert.'],
          answer: 3,
          explanation: 'Text hovorí: „Jana studiert noch — sie ist Studentin."'
        },
        {
          question: 'Wer ist Ärztin?',
          questionSk: 'Kto je lekárka?',
          options: ['Jana', 'Anna', 'Maria', 'Lukas'],
          answer: 2,
          explanation: 'Text hovorí: „Maria ist Ärztin und arbeitet im Krankenhaus."'
        },
        {
          question: 'Wo arbeitet Maria?',
          questionSk: 'Kde pracuje Maria?',
          options: ['bei einer Firma', 'im Deutschkurs', 'im Krankenhaus', 'an der Universität'],
          answer: 2,
          explanation: 'Text hovorí: „Maria ist Ärztin und arbeitet im Krankenhaus."'
        }
      ]
    },
    {
      type: 'speaking',
      instruction: 'Vypočuj si nemecké frázy a pokús sa ich nahlas zopakovať. Zameraj sa na prízvuk a výslovnosť.',
      phrases: [
        { de: 'Was machst du von Beruf?', sk: 'Aké máš povolanie?', tip: 'ch v "machst" čítajte mäkšie o hrdlo, sch sa číta š.' },
        { de: 'Ich arbeite als Lehrer.', sk: 'Pracujem ako učiteľ.', tip: 'ch je mäkké, er na konci slov znie skôr ako otvorené a.' },
        { de: 'Ich bin Ärztin.', sk: 'Som lekárka.', tip: 'Ä vyslovte ako široké nemecké e, z znie ako c.' },
        { de: 'Ich arbeite sehr gern.', sk: 'Veľmi rád pracujem.', tip: 'r na konci slova sehr zaniká.' },
        { de: 'Der Student studiert.', sk: 'Študent študuje.', tip: 'st na začiatku slabiky sa číta vždy ako št, ie ako dlhé i.' }
      ]
    },
    {
      type: 'writing',
      instruction: 'Napíš po nemecky. Ako odpovieš na tieto otázky po nemecky?',
      prompts: [
        { sk: 'Aké máš povolanie? (tykanie)', hint: 'Was...' },
        { sk: 'Pracujem ako informatik.', hint: 'Ich...' },
        { sk: 'Ona je lekárka. Veľa pracuje.', hint: 'Sie ist...' }
      ]
    },
    {
      type: 'categorysort',
      instruction: 'Roztrieď povolania podľa rodu: mužský (der) alebo ženský (die).',
      categories: [
        { name: 'Mužský rod (der)', color: 'blue', words: ['Lehrer', 'Arzt', 'Student', 'Informatiker', 'Koch', 'Verkäufer'] },
        { name: 'Ženský rod (die)', color: 'rose', words: ['Lehrerin', 'Ärztin', 'Studentin', 'Informatikerin', 'Köchin', 'Verkäuferin'] }
      ],
      explanation: 'Ženské povolania sa tvoria pridaním prípony „-in" k mužskému tvaru. Pozor na prehlásky: Arzt → Ärztin, Koch → Köchin.'
    },
    {
      type: 'truefalse',
      instruction: 'Rozhodni, či je tvrdenie správne (Richtig) alebo nesprávne (Falsch).',
      statements: [
        {
          statement: '„Ich bin ein Arzt" ist korrektes Deutsch.',
          isTrue: false,
          explanation: 'Nesprávne! Pri povolaniach sa člen vynecháva: „Ich bin Arzt" (nie „ein Arzt").'
        },
        {
          statement: 'Die weibliche Form von „Koch" ist „Köchin" (mit Umlaut).',
          isTrue: true,
          explanation: 'Správne! Koch → Köchin. O sa mení na Ö (prehláska) + prípona -in.'
        },
        {
          statement: '„Als" bedeutet „ako" (bei Berufen).',
          isTrue: true,
          explanation: 'Správne! „Ich arbeite als Lehrer" = pracujem ako učiteľ.'
        },
        {
          statement: '„Was machst du von Beruf?" fragt nach der Adresse.',
          isTrue: false,
          explanation: 'Nesprávne! Táto fráza sa pýta na povolanie, nie na adresu.'
        },
        {
          statement: '„Die Lehrerin" hat die Endung „-in" für feminin.',
          isTrue: true,
          explanation: 'Správne! Lehrer → Lehrerin. Prípona „-in" tvorí ženský tvar.'
        }
      ]
    },
    {
      type: 'dictation',
      instruction: 'Počúvaj a zapíš nemeckú vetu.',
      sentences: [
        { de: 'Was machst du von Beruf?', sk: 'Aké máš povolanie?', hint: '5 slov' },
        { de: 'Ich arbeite als Lehrer.', sk: 'Pracujem ako učiteľ.' },
        { de: 'Sie ist Ärztin.', sk: 'Ona je lekárka.', hint: '3 slová' },
        { de: 'Er studiert viel.', sk: 'On veľa študuje.' },
        { de: 'Ich arbeite gern.', sk: 'Rád pracujem.' }
      ]
    },
    {
      type: 'translation',
      instruction: 'Prelož vety zo slovenčiny do nemčiny.',
      sentences: [
        {
          sk: 'Aké máš povolanie?',
          answer: 'Was machst du von Beruf',
          hint: 'Was machst...',
          explanation: 'Zaužívaná fráza: „Was machst du von Beruf?"'
        },
        {
          sk: 'Pracujem ako informatik.',
          answer: 'Ich arbeite als Informatiker',
          hint: 'Ich arbeite...',
          explanation: '„Als" = ako (pri povolaniach). Bez člena!'
        },
        {
          sk: 'Ona je učiteľka.',
          answer: 'Sie ist Lehrerin',
          hint: 'Sie ist...',
          explanation: 'Ženský tvar: Lehrer → Lehrerin. Bez člena pri povolaniach!'
        },
        {
          sk: 'On veľa pracuje.',
          answer: 'Er arbeitet viel',
          hint: 'Er arbeitet...',
          explanation: '3. osoba: arbeiten → er arbeitet. „Viel" = veľa.'
        }
      ]
    },
    {
      type: 'conjugation',
      instruction: 'Vyplň správne tvary slovies arbeiten a machen.',
      verbs: [
        {
          infinitive: 'arbeiten',
          translation: 'pracovať',
          forms: [
            { pronoun: 'ich', correct: 'arbeite' },
            { pronoun: 'du', correct: 'arbeitest' },
            { pronoun: 'er/sie/es', correct: 'arbeitet' },
          ],
          note: 'Sloveso „arbeiten" má kmeň na -t, preto sa pridáva -e- pred koncovkou: du arbeitest, er arbeitet.'
        },
        {
          infinitive: 'machen',
          translation: 'robiť',
          forms: [
            { pronoun: 'ich', correct: 'mache' },
            { pronoun: 'du', correct: 'machst' },
            { pronoun: 'er/sie/es', correct: 'macht' },
          ],
          note: 'Sloveso „machen" sa časuje pravidelne: kmeň + koncovka (-e, -st, -t).'
        }
      ]
    }
  ],
  reviewWords: ['sein', 'ich', 'du', 'was', 'gut'],
  lessonNotes: 'V tejto lekcii sa študent zoznamuje so slovným okruhom profesie a učí sa tvorbu ženských tvarov povolaní na -in. Kľúčový je správny slovosled a štruktúra pri "arbeiten als".'
};
