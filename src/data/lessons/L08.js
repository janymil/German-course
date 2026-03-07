export const lesson08 = {
  id: 8,
  week: 2,
  day: 3,
  title: 'Mein, dein, Ihr  Possessivpronomen und Ja/Nein-Fragen',
  topic: 'Privlastňovacie zámená mein/dein/Ihr a základné áno/nie otázky',
  cefr: 'A1',
  xpReward: 20,
  narrativeContext: 'Es ist Montag. Jana und Petra sind früh in der VHS. Jana nimmt ein Buch und fragt: Ist das dein Buch? Sie fragen: Wer hat was? Dann kommt Frau Berg.',
  communicativeGoal: 'Nach dieser Lektion kann ich Dinge als mein oder dein bezeichnen, einfache Ja/Nein-Fragen stellen und höflich mit Ihr anreden.',
  skillFocus: ['grammar', 'vocabulary', 'speaking'],

  grammarNotes: [
    {
      rule: 'Privlastňovanie: Moje, tvoje a veľké písmeno rešpektu',
      explanation: `<p>Máme predmet. Tancujeme s novým slovíčkom, napríklad <em>das Buch</em> (kniha) alebo <em>die Tasche</em> (taška). Ak si ju chcete privlastniť, musíte ju obaliť do správnej nálepky podľa <strong>JEJ</strong> rodu (nie vášho!).</p>
<p>Kľúč, ktorý otvára tieto dvere, je jednoduchý. <strong>Pre žanre (Die) pridávate na koniec privlastňovacieho zámena -e. A bodka. Samce a Neuterka zostávajú nedotknuté, holé.</strong></p>
<table><thead><tr><th>Majiteľ</th><th>Holé (der, das)</th><th>S pridaným -e (die)</th></tr></thead><tbody>
<tr><td>Ja</td><td><strong>mein</strong> (mein Stift)</td><td><strong>meine</strong> (meine Tasche)</td></tr>
<tr><td>Ty</td><td><strong>dein</strong></td><td><strong>deine</strong></td></tr>
<tr><td>Vy (Formálne)</td><td><strong>Ihr</strong> (Veľké I!)</td><td><strong>Ihre</strong></td></tr>
<tr><td>Ona</td><td><strong>ihr</strong> (malé i)</td><td><strong>ihre</strong></td></tr>
</tbody></table>
<div class="warn-box">⚠️ <strong>Pasca pre začiatočníkov:</strong> Vidíte formálne „Ihr"? To veľké písmeno I nie je len na ozdobu na začiatku vety. Aj uprostred vety svieti ako maják rešpektu. (Ist das <strong>I</strong>hr Stift?). Ak ho napíšete s malým "i", okamžite hovoríte "je to <strong>jej</strong> pero".</div>`,
      examples: [
        { de: 'Das ist mein Buch.', sk: 'Toto je moja kniha.', note: 'Buch je das -> mein zostáva holé.' },
        { de: 'Ist das Ihre Tasche, Frau Berg?', sk: 'Je to vaša taška, pani Berg?', note: 'Formálne "Vy" a taška (die) si pýta -e. -> Ihre' },
        { de: 'Das ist ihr Heft.', sk: 'Toto je jej zošit.', note: 'Malé i -> patrí to nejakej žene.' },
      ],
      slovakContrastNote: 'V slovenčine máme v „môj, moja, moje“ pri každom rode iný tvar. Z pohľadu Nemca si to my doma hrozne komplikujeme. U nich je to o čistej binárnosti: buď má vec koncovku "-e" (ak je to ten ženský, "Die" rod), alebo nemá.',
    },
    {
      rule: 'Otázky Áno/Nie: Sloveso skáče na veliteľský mostík',
      explanation: `<p>V oznamovacích vetách tróni sloveso bezpečne na druhom mieste. Je tam zaparkované ako ťažký kamión. Ale ak nemáte v ruke žiadne opytovacie slovíčko (Kde? Kto? Čo?), a vaša ruka si pýta odpoveď <strong>Áno alebo Nie</strong>... vtedy sa v nemeckej vete stane menší prevrat.</p>
<p><strong>Sloveso vyskočí na ÚPLNÉ PRVÉ miesto.</strong> (A to je takzvaná Inverzia).</p>
<table><thead><tr><th>Pohodička (Sloveso na #2)</th><th>Inverzia a otázka (Sloveso na #1)</th></tr></thead><tbody>
<tr><td>Das <strong>ist</strong> mein Buch.</td><td><strong>Ist</strong> das mein Buch?</td></tr>
<tr><td>Du <strong>hast</strong> ein Heft.</td><td><strong>Hast</strong> du ein Heft?</td></tr>
</tbody></table>
<div class="tip-box">💡 <strong>Tip Profesora:</strong> Odpovedáme krátko a jasne. Pri zápore "Nein" však pozor kam ten zápor strčíte! "Nein, das ist <strong>nicht</strong> mein Buch." Nie je logické udrieť záporom predmet, musíte udrieť na vlastníctvo (nie-moju) knihu.</div>`,
      examples: [
        { de: 'Ist das dein Buch?', sk: 'Je to tvoja kniha?' },
        { de: 'Nein, das ist nicht mein Buch.', sk: 'Nie, toto nie je moja kniha.', note: 'Nicht ide pred vlastnícke zámeno.' },
      ],
      slovakContrastNote: 'V slovenčine sa môžeme pýtať obyčajnou zmenou intonácie hlasu: "Toto je tvoja kniha?" a tón stúpne. V nemčine musíte fyzicky poprehadzovať slová. Bez slovesa na prvom mieste v týchto situáciách nedáte Nemcovi signál, že sa niečo pýtate.',
    },
  ],

  vocab: [
    {
      de: 'mein / meine',
      sk: 'môj / moja / moje',
      gender: null,
      srsId: 'L08_V01',
      example: 'Das ist mein Buch.',
      exampleSk: 'Toto je moja kniha.',
      recycledFrom: [],
    },
    {
      de: 'dein / deine',
      sk: 'tvoj / tvoja / tvoje',
      gender: null,
      srsId: 'L08_V02',
      example: 'Ist das dein Stift?',
      exampleSk: 'Je to tvoje pero?',
      recycledFrom: [],
    },
    {
      de: 'Ihr / Ihre',
      sk: 'váš / vaša / vaše (formálne)',
      gender: null,
      srsId: 'L08_V03',
      example: 'Ist das Ihr Kurs, Frau Berg?',
      exampleSk: 'Je to váš kurz, pani Berg?',
      recycledFrom: [],
    },
    {
      de: 'sein / seine',
      sk: 'jeho',
      gender: null,
      srsId: 'L08_V04',
      example: 'Das ist sein Heft.',
      exampleSk: 'Toto je jeho zošit.',
      recycledFrom: [],
    },
    {
      de: 'ihr / ihre',
      sk: 'jej',
      gender: null,
      srsId: 'L08_V05',
      example: 'Das ist ihre Tasche.',
      exampleSk: 'Toto je jej taška.',
      recycledFrom: [],
    },
    {
      de: 'das Buch',
      sk: 'kniha',
      gender: 'N',
      srsId: 'L08_V06',
      example: 'Das Buch ist neu.',
      exampleSk: 'Kniha je nová.',
      recycledFrom: [],
    },
    {
      de: 'das Heft',
      sk: 'zošit',
      gender: 'N',
      srsId: 'L08_V07',
      example: 'Mein Heft ist blau.',
      exampleSk: 'Môj zošit je modrý.',
      recycledFrom: [],
    },
    {
      de: 'der Stift',
      sk: 'pero / ceruzka',
      gender: 'M',
      srsId: 'L08_V08',
      example: 'Der Stift ist rot.',
      exampleSk: 'Pero je červené.',
      recycledFrom: [],
    },
    {
      de: 'das Wörterbuch',
      sk: 'slovník',
      gender: 'N',
      srsId: 'L08_V09',
      example: 'Das Wörterbuch ist sehr gut.',
      exampleSk: 'Slovník je veľmi dobrý.',
      recycledFrom: [],
    },
    {
      de: 'die Tasche',
      sk: 'taška',
      gender: 'F',
      srsId: 'L08_V10',
      example: 'Meine Tasche ist schwer.',
      exampleSk: 'Moja taška je ťažká.',
      recycledFrom: [],
    },
    {
      de: 'der Tisch',
      sk: 'stôl',
      gender: 'M',
      srsId: 'L08_V11',
      example: 'Das Buch liegt auf dem Tisch.',
      exampleSk: 'Kniha leží na stole.',
      recycledFrom: [],
    },
    {
      de: 'der Kurs',
      sk: 'kurz',
      gender: 'M',
      srsId: 'L08_V12',
      example: 'Der Kurs ist sehr gut.',
      exampleSk: 'Kurz je veľmi dobrý.',
      recycledFrom: [],
    },
    {
      de: 'das Zimmer',
      sk: 'izba / miestnosť',
      gender: 'N',
      srsId: 'L08_V13',
      example: 'Das Zimmer ist groß.',
      exampleSk: 'Izba je veľká.',
      recycledFrom: [],
    },
    {
      de: 'Ist das dein...?',
      sk: 'Je to tvoj...?',
      gender: null,
      srsId: 'L08_V14',
      example: 'Ist das dein Buch?',
      exampleSk: 'Je to tvoja kniha?',
      recycledFrom: [],
    },
    {
      de: 'Nein, das ist nicht mein...',
      sk: 'Nie, toto nie je môj...',
      gender: null,
      srsId: 'L08_V15',
      example: 'Nein, das ist nicht mein Stift.',
      exampleSk: 'Nie, toto nie je moje pero.',
      recycledFrom: [],
    },
    {
      de: 'Das gehört mir.',
      sk: 'Toto patrí mne.',
      gender: null,
      srsId: 'L08_V16',
      example: 'Das Heft gehört mir.',
      exampleSk: 'Zošit patrí mne.',
      recycledFrom: [],
    },
    {
      de: 'Ist das Ihr Buch?',
      sk: 'Je to vaša kniha?',
      gender: null,
      srsId: 'L08_V17',
      example: 'Ist das Ihr Buch, Frau Berg?',
      exampleSk: 'Je to vaša kniha, pani Berg?',
      recycledFrom: [],
    },
  ],

  exercises: [
    {
      type: 'flashcard',
      instruction: 'Lerne die Vokabeln. Drehe die Karte, um die Übersetzung zu sehen.',
    },

    {
      type: 'match',
      instruction: 'Verbinde die deutschen Ausdrücke mit der slowakischen Übersetzung.',
      pairs: [
        ['das Buch', 'kniha'],
        ['das Heft', 'zošit'],
        ['der Stift', 'pero'],
        ['die Tasche', 'taška'],
        ['das Wörterbuch', 'slovník'],
        ['der Tisch', 'stôl'],
        ['mein / meine', 'môj / moja'],
        ['dein / deine', 'tvoj / tvoja'],
        ['Ihr / Ihre', 'váš / vaša (formálne)'],
        ['Das gehört mir.', 'Toto patrí mne.'],
      ],
    },

    {
      type: 'wordorder',
      instruction: 'Forme richtige Sätze oder Fragen. Achte auf Possessivpronomen und Wortstellung!',
      sentences: [
        {
          words: ['Ist', 'das', 'dein', 'Buch'],
          correct: 'Ist das dein Buch',
          hint: 'Je to tvoja kniha?',
          explanation: 'Áno/nie otázka: sloveso "Ist" stojí na prvom mieste. Buch je neutrum  používame "dein" (bez -e).',
        },
        {
          words: ['Das', 'ist', 'mein', 'Stift'],
          correct: 'Das ist mein Stift',
          hint: 'Toto je moje pero.',
          explanation: 'Oznamovacia veta: Das ist + privlastňovacie zámeno. Stift je maskulínum (der)  "mein" bez -e.',
        },
        {
          words: ['Ist', 'das', 'Ihr', 'Heft', 'Frau', 'Berg'],
          correct: 'Ist das Ihr Heft Frau Berg',
          hint: 'Je to váš zošit, pani Berg?',
          explanation: 'Formálna otázka: "Ihr" s veľkým I. Heft je neutrum  "Ihr" bez -e. Sloveso stojí na prvom mieste.',
        },
        {
          words: ['Meine', 'Tasche', 'ist', 'groß'],
          correct: 'Meine Tasche ist groß',
          hint: 'Moja taška je veľká.',
          explanation: 'Oznamovacia veta: Tasche je feminínum  privlastňovacie zámeno dostáva -e: "Meine". Sloveso stojí na druhom mieste.',
        },
        {
          words: ['Ist', 'das', 'deine', 'Tasche'],
          correct: 'Ist das deine Tasche',
          hint: 'Je to tvoja taška?',
          explanation: 'Tasche je feminínum  preto "deine" (s -e). Áno/nie otázka: sloveso "Ist" na prvom mieste.',
        },
        {
          words: ['Das', 'gehört', 'mir'],
          correct: 'Das gehört mir',
          hint: 'Toto patrí mne.',
          explanation: '"gehören" (patriť) + Dativ: mir (mne). Das gehört mir = toto patrí mne. Sloveso na druhom mieste v oznamovacej vete.',
        },
      ],
    },

    {
      type: 'fill',
      instruction: 'Ergänze die Lücken mit dem richtigen Possessivpronomen oder Verb.',
      questions: [
        {
          sentence: 'Das ist ___ Buch. (mein/meine  das Buch)',
          answer: 'mein',
          hint: 'das Buch = neutrum',
          explanation: '"Das Buch" je neutrum  privlastňovacie zámeno "mein" bez -e. Pravidlo: maskulínum a neutrum  mein/dein/Ihr.',
        },
        {
          sentence: 'Ist das ___ Stift, Petra? (dein/deine  der Stift)',
          answer: 'dein',
          hint: 'der Stift = maskulínum',
          explanation: '"Der Stift" je maskulínum  "dein" bez -e. Iba feminínum dostáva -e: deine Tasche.',
        },
        {
          sentence: 'Ist das ___ Tasche, Frau Berg? (Ihr/Ihre  die Tasche)',
          answer: 'Ihre',
          hint: 'die Tasche = feminínum; formálne oslovenie',
          explanation: '"Die Tasche" je feminínum  privlastňovacie zámeno dostáva -e. Formálne: "Ihre" (s veľkým I a -e).',
        },
        {
          sentence: 'Mein Heft ist ___. (nový  nemecky)',
          answer: 'neu',
          hint: 'nový = neu',
          explanation: '"Neu" znamená nový. V prísudkovej pozícii (po sein) sa adjektívum neskloňuje: Das Heft ist neu.',
        },
        {
          sentence: '___ das dein Wörterbuch?',
          answer: 'Ist',
          hint: 'áno/nie otázka  sloveso na prvom mieste',
          explanation: 'Áno/nie otázka začína slovesom. "Ist" stojí na prvom mieste. Na začiatku vety vždy veľké písmeno.',
        },
        {
          sentence: 'Das ___ mir.',
          answer: 'gehört',
          hint: 'patriť = gehören; er/sie/es',
          explanation: '"Das" je tretia osoba jednotného čísla  "gehört". Das gehört mir = toto patrí mne.',
        },
        {
          sentence: 'Ich ___ einen Bruder. (spirálová gramatika L07: haben)',
          answer: 'habe',
          hint: 'prvá osoba: ich',
          explanation: 'Spirálová gramatika z L07: "haben" (mať)  ich habe. Nezmenený tvar v prvej osobe.',
        },
        {
          sentence: 'Wo ___ du? (spirálová gramatika L06: wohnen)',
          answer: 'wohnst',
          hint: 'druhá osoba: du; bývať = wohnen',
          explanation: 'Spirálová gramatika z L06: "wohnen" (bývať)  du wohnst. Pravidelné sloveso: kmeň "wohn-" + koncovka "-st".',
        },
      ],
    },

    {
      type: 'listen',
      instruction: 'Höre und tippe das deutsche Wort oder den Satz.',
      questions: [
        { de: 'das Buch', sk: 'kniha' },
        { de: 'der Stift', sk: 'pero' },
        { de: 'das Heft', sk: 'zošit' },
        { de: 'die Tasche', sk: 'taška' },
        { de: 'der Tisch', sk: 'stôl' },
        { de: 'der Kurs', sk: 'kurz' },
        { de: 'das Zimmer', sk: 'izba' },
        { de: 'das Wörterbuch', sk: 'slovník' },
        { de: 'Mein Buch ist hier.', sk: 'Moja kniha je tu.' },
        { de: 'Ist das dein Stift?', sk: 'Je to tvoje pero?' },
      ],
    },

    {
      type: 'mcq',
      instruction: 'Wähle die richtige Antwort.',
      questions: [
        {
          question: 'Welche Form ist richtig? "Das ist ___ Buch." (das Buch = Neutrum)',
          options: ['meine', 'mein', 'meiner', 'meinem'],
          answer: 1,
          explanation: '"Das Buch" je neutrum  privlastňovacie zámeno je "mein" bez -e. Pravidlo: maskulínum a neutrum  mein/dein/Ihr (bez koncovky).',
        },
        {
          question: 'Ako sa povie po nemecky "Je to tvoja taška?"',
          options: ['Ist das meine Tasche?', 'Ist das deine Tasche?', 'Ist das seine Tasche?', 'Ist das Ihre Tasche?'],
          answer: 1,
          explanation: '"Deine Tasche" = tvoja taška. Tasche je feminínum  deine (s -e). Meine = moja, seine = jeho, Ihre = vaša (formálne).',
        },
        {
          question: 'Aká forma privlastňovacieho zámena sa používa pri formálnom oslovení? "Ist das ___ Kurs, Frau Berg?"',
          options: ['dein', 'sein', 'Ihr', 'ihr'],
          answer: 2,
          explanation: '"Ihr" s veľkým I je formálne oslovenie (pre Sie). "Kurs" je maskulínum  Ihr (bez -e). Malé "ihr" znamená "jej".',
        },
        {
          question: 'Ktorá z týchto viet je áno/nie otázka (Ja/Nein-Frage)?',
          options: ['Wo ist mein Buch?', 'Ist das dein Buch?', 'Was ist das?', 'Wessen Buch ist das?'],
          answer: 1,
          explanation: '"Ist das dein Buch?" začína slovesom  to je znak áno/nie otázky. Vety s Wo/Was/Wessen sú W-Fragen (otázky s opytovacím zámennom).',
        },
        {
          question: 'Čo znamená "Das gehört mir."?',
          options: ['Toto je moje.', 'Toto patrí mne.', 'Toto je tu.', 'Toto nechcem.'],
          answer: 1,
          explanation: '"Gehören" (patriť) + Dativ. "Mir" je dativ od "ich". Das gehört mir = Toto patrí mne. Nie "Toto je moje"  to by bolo "Das ist meins".',
        },
        {
          question: 'Privlastňovacie zámeno pri feminíne: "Das ist ___ Schwester."',
          options: ['mein', 'meines', 'meine', 'meiner'],
          answer: 2,
          explanation: '"Schwester" je feminínum (die Schwester)  privlastňovacie zámeno dostáva koncovku -e: "meine". Pravidlo: maskulínum/neutrum  mein, feminínum  meine.',
        },
        {
          question: 'Spirálová gramatika (L07): Ako sa konjuguje "haben" pre "du"?',
          options: ['du habe', 'du haben', 'du hast', 'du habt'],
          answer: 2,
          explanation: '"Du hast"  druhá osoba jednotného čísla od "haben" je nepravidelná. Forma "du habst" neexistuje. Z L07: ich habe, du hast, er hat.',
        },
        {
          question: 'Ktorá z týchto viet má správny slovosled pre áno/nie otázku?',
          options: ['Das ist mein Heft?', 'Mein Heft ist das?', 'Ist das mein Heft?', 'Mein ist das Heft?'],
          answer: 2,
          explanation: 'Správna áno/nie otázka: sloveso "Ist" stojí na prvom mieste: "Ist das mein Heft?" Ostatné varianty nemajú správny slovosled nemeckej otázky.',
        },
      ],
    },

    {
      type: 'minitext',
      instruction: 'Lies den Text und beantworte die Fragen.',
      text: 'Jana und Petra sind früh in der VHS. Jana sieht ein Buch auf dem Tisch und fragt: Ist das dein Buch, Petra?" Petra sagt: Nein, das ist nicht mein Buch." Dann kommt Frau Berg. Jana fragt: Ist das Ihr Buch, Frau Berg?" Frau Berg sagt: Ja, das ist mein Buch. Danke!" Jana und Petra haben auch ein Heft und einen Stift.',
      textSk: 'Jana a Petra sú skoro vo VHS. Jana vidí knihu na stole a pýta sa: Je to tvoja kniha, Petra?" Petra hovorí: Nie, to nie je moja kniha." Potom príde pani Berg. Jana sa pýta: Je to vaša kniha, pani Berg?" Pani Berg hovorí: Áno, to je moja kniha. Ďakujem!" Jana a Petra majú tiež zošit a pero.',
      questions: [
        {
          question: 'Wo sind Jana und Petra am Morgen?',
          options: ['zu Hause', 'im Café', 'in der VHS', 'im Park'],
          answer: 2,
          explanation: 'Z textu: "Jana und Petra sind früh in der VHS"  Jana a Petra sú skoro vo VHS.',
        },
        {
          question: 'Was sieht Jana auf dem Tisch?',
          options: ['einen Stift', 'eine Tasche', 'ein Heft', 'ein Buch'],
          answer: 3,
          explanation: 'Z textu: "Jana sieht ein Buch auf dem Tisch"  Jana vidí knihu na stole.',
        },
        {
          question: 'Ist das Buch von Petra?',
          options: ['Ja, das ist ihr Buch.', 'Nein, das ist nicht ihr Buch.', 'Sie weiß es nicht.', 'Ja, sie hat zwei Bücher.'],
          answer: 1,
          explanation: 'Z textu: "Nein, das ist nicht mein Buch"  Petra hovorí, že kniha nie je jej.',
        },
        {
          question: 'Wessen Buch ist auf dem Tisch?',
          options: ['Janas Buch', 'Petras Buch', 'das Buch von Frau Berg', 'das Buch von der Schule'],
          answer: 2,
          explanation: 'Z textu: Frau Berg sagt "Ja, das ist mein Buch"  kniha patrí pani Berg.',
        },
        {
          question: 'Was haben Jana und Petra?',
          options: ['nur ein Buch', 'ein Heft und einen Stift', 'ein Wörterbuch', 'eine Tasche und ein Heft'],
          answer: 1,
          explanation: 'Z textu: "Jana und Petra haben auch ein Heft und einen Stift"  Jana a Petra majú zošit a pero.',
        },
      ],
    },

    {
      type: 'speaking',
      instruction: 'Höre die Aussprache und sprich nach. Bewerte dich selbst.',
      phrases: [
        {
          de: 'Ist das dein Buch?',
          sk: 'Je to tvoja kniha?',
          tip: 'Betonung auf "dein": ist das DEIN Buch?',
        },
        {
          de: 'Ja, das ist mein Buch.',
          sk: 'Áno, to je moja kniha.',
          tip: 'mein = MAYN; kurze, klare Aussprache',
        },
        {
          de: 'Nein, das ist nicht mein Stift.',
          sk: 'Nie, toto nie je moje pero.',
          tip: 'nicht vor dem Possessivpronomen: nicht MEIN',
        },
        {
          de: 'Ist das Ihre Tasche, Frau Berg?',
          sk: 'Je to vaša taška, pani Berg?',
          tip: 'Ihre = EE-reh; großes I, formell',
        },
        {
          de: 'Mein Heft ist neu.',
          sk: 'Môj zošit je nový.',
          tip: 'Heft = neutrum  mein (nie meine)',
        },
        {
          de: 'Das gehört mir.',
          sk: 'Toto patrí mne.',
          tip: 'gehört = geh-HOERT; ö = ø-Laut',
        },
        {
          de: 'Das Wörterbuch ist sehr gut.',
          sk: 'Slovník je veľmi dobrý.',
          tip: 'Wörterbuch = VOER-ter-buch; ö = ø-Laut',
        },
      ],
    },

    {
      type: 'truefalse',
      instruction: 'Richtig oder falsch? Entscheide für jeden Satz.',
      questions: [
        {
          statement: 'Im Deutschen steht das Verb in einer Ja/Nein-Frage an erster Stelle.',
          isTrue: true,
          explanation: 'Pravda. V nemčine áno/nie otázka začína slovesom: "Ist das dein Buch?"  Ist stojí na prvom mieste.',
        },
        {
          statement: 'Die Possessivpronomen für Femininum lauten: mein, dein, Ihr.',
          isTrue: false,
          explanation: 'Nepravda. Pre feminínum sa pridáva -e: meine, deine, Ihre. Formy mein/dein/Ihr sú pre maskulínum a neutrum.',
        },
        {
          statement: 'Für neutrale Nomen schreibt man: mein Kind, dein Kind, Ihr Kind.',
          isTrue: true,
          explanation: 'Pravda. Neutrum (das) dostáva formy bez -e: mein Kind, dein Kind, Ihr Kind. Pravidlo: maskulínum a neutrum  bez -e.',
        },
        {
          statement: 'Das informelle Possessivpronomen "ihr" (= ihr Buch = jej kniha) wird im Deutschen großgeschrieben.',
          isTrue: false,
          explanation: 'Nepravda. Iba formálne "Ihr/Ihre" (pre Sie) sa píše s veľkým I. Neformálne "ihr/ihre" (jej) sa píše s malým i.',
        },
        {
          statement: '"Ist das dein Stift?" ist eine Ja/Nein-Frage.',
          isTrue: true,
          explanation: 'Pravda. Veta začína slovesom "Ist" a nie opytovacím zámennom (wo/was/wer). Na túto otázku sa odpovedá Ja alebo Nein.',
        },
        {
          statement: 'Nein, das ist mein Buch nicht." ist der richtige Satzbau für die Verneinung.',
          isTrue: false,
          explanation: 'Nepravda. Správny slovosled je: "Nein, das ist nicht mein Buch."  nicht stojí pred privlastňovacím zámenou, nie na konci vety.',
        },
      ],
    },

    {
      type: 'dictation',
      instruction: 'Höre und schreibe den Satz auf Deutsch.',
      sentences: [
        {
          de: 'das Buch',
          sk: 'kniha',
        },
        {
          de: 'mein Stift',
          sk: 'moje pero',
        },
        {
          de: 'Ist das dein Heft?',
          sk: 'Je to tvoj zošit?',
          hint: 'Ja/Nein-Frage: Verb an erster Stelle',
        },
        {
          de: 'Das ist meine Tasche.',
          sk: 'Toto je moja taška.',
          hint: 'Tasche = feminínum  meine',
        },
        {
          de: 'Nein, das ist nicht mein Buch.',
          sk: 'Nie, toto nie je moja kniha.',
          hint: 'nicht vor dem Possessivpronomen',
        },
        {
          de: 'Ist das Ihr Wörterbuch, Frau Berg?',
          sk: 'Je to váš slovník, pani Berg?',
          hint: 'Ihr = formell, großes I; Wörterbuch = neutrum',
        },
      ],
    },

    {
      type: 'categorysort',
      instruction: 'Sortiere die Wörter in die richtige Kategorie.',
      explanation: 'Privlastňovacie zámená sa menia podľa rodu podstatného mena. Pri maskulíne a neutre: mein/dein/Ihr (bez -e). Pri feminíne: meine/deine/Ihre (s -e). Schulsachen (školské pomôcky) sú podstatné mená s rôznym rodom.',
      categories: [
        {
          name: 'maskulínum/neutrum  mein/dein/Ihr (bez -e)',
          color: 'blue',
          words: ['mein Bruder', 'dein Stift', 'Ihr Kurs', 'sein Heft', 'ihr Kind'],
        },
        {
          name: 'feminínum  meine/deine/Ihre (s -e)',
          color: 'pink',
          words: ['meine Schwester', 'deine Tasche', 'Ihre Familie', 'seine Mutter', 'ihre Lehrerin'],
        },
        {
          name: 'Schulsachen (Nomen)',
          color: 'green',
          words: ['das Buch', 'das Heft', 'der Stift', 'das Wörterbuch', 'die Tasche'],
        },
      ],
    },

    {
      type: 'translation',
      instruction: 'Preložte vety zo slovenčiny do nemčiny. Použite správne privlastňovacie zámená.',
      prompts: [
        {
          sk: 'To je moja kniha.',
          answer: 'Das ist mein Buch.',
          hint: 'Buch = neutrum  mein (bez -e)',
          explanation: '"Das Buch" je neutrum  "mein" bez -e. Oznamovacia veta: Das ist + privlastňovacie zámeno + podstatné meno.',
        },
        {
          sk: 'Je to tvoj zošit?',
          answer: 'Ist das dein Heft?',
          hint: 'Heft = neutrum; áno/nie otázka  sloveso na prvom mieste',
          explanation: 'Áno/nie otázka: sloveso "Ist" na prvom mieste. "Das Heft" je neutrum  "dein" bez -e.',
        },
        {
          sk: 'Nie, toto nie je moje pero.',
          answer: 'Nein, das ist nicht mein Stift.',
          hint: 'Stift = maskulínum; nicht pred privlastňovacím zámenou',
          explanation: 'Zápor: "nicht" pred "mein". "Der Stift" je maskulínum  "mein" bez -e. Nie "das ist mein Stift nicht".',
        },
        {
          sk: 'Je to vaša taška, pani Berg?',
          answer: 'Ist das Ihre Tasche, Frau Berg?',
          hint: 'Tasche = feminínum; formálne = Ihre (veľké I, s -e)',
          explanation: 'Formálne oslovenie: "Ihre" (veľké I). "Die Tasche" je feminínum  "Ihre" s -e. Áno/nie otázka  sloveso na prvom mieste.',
        },
        {
          sk: 'Moja taška je nová.',
          answer: 'Meine Tasche ist neu.',
          hint: 'Tasche = feminínum  meine',
          explanation: '"Die Tasche" je feminínum  "meine" s -e. Prísudkové adjektívum "neu" sa neskloňuje. Oznamovacia veta: Meine Tasche ist neu.',
        },
      ],
    },

    {
      type: 'conjugation',
      instruction: 'Konjugiere die Verben vollständig.',
      verbs: [
        {
          infinitive: 'gehören',
          translation: 'patriť (niekomu)',
          forms: [
            { pronoun: 'ich', correct: 'gehöre' },
            { pronoun: 'du', correct: 'gehörst' },
            { pronoun: 'er/sie/es', correct: 'gehört' },
            { pronoun: 'wir', correct: 'gehören' },
            { pronoun: 'ihr', correct: 'gehört' },
            { pronoun: 'sie/Sie', correct: 'gehören' },
          ],
          note: '"Gehören" je pravidelné sloveso. Kmeň: gehör- + pravidelné koncovky. Používa sa s dativom: Das gehört mir (mne), dir (tebe), ihm (jemu). Pozor: "er gehört" a "ihr gehört" majú rovnakú formu.',
        },
        {
          infinitive: 'haben',
          translation: 'mať (spirálová opakovanie z L07)',
          forms: [
            { pronoun: 'ich', correct: 'habe' },
            { pronoun: 'du', correct: 'hast' },
            { pronoun: 'er/sie/es', correct: 'hat' },
            { pronoun: 'wir', correct: 'haben' },
            { pronoun: 'ihr', correct: 'habt' },
            { pronoun: 'sie/Sie', correct: 'haben' },
          ],
          note: 'Spirálové opakovanie z L07: "haben" je nepravidelné v 2. a 3. osobe singuláru (du hast, er hat). Ostatné osoby sú pravidelné.',
        },
      ],
    },
  ],

  reviewWords: ['haben', 'die Familie'],

  lessonNotes: 'V tejto lekcii Jana a Petra porovnávajú svoje školské pomôcky a učia sa vyjadrovať vlastníctvo pomocou privlastňovacích zámen. Kľúčové pravidlo: maskulínum a neutrum  mein/dein/Ihr (bez -e), feminínum  meine/deine/Ihre (s -e). Dôležité je tiež rozlíšiť formálne "Ihr/Ihre" (veľké I, oslovenie pre Sie) od neformálneho "ihr/ihre" (malé i, jej). Áno/nie otázky sa tvoria inverziou: sloveso stojí vždy na prvom mieste.',
};