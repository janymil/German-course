export const lesson11 = {
  id: 11,
  week: 3,
  day: 1,
  title: "Kein/Keine/Keinen — Verneinung",
  topic: "Záporné členy a negácia existencie",
  cefr: "A1",
  xpReward: 25,
  narrativeContext:
    "Jana besichtigt eine Wohnung in Wien. Der Vermieter sagt: 'Es gibt keinen Aufzug, keine Heizung im Badezimmer, und leider keinen Keller.' Jana muss höflich reagieren und Fragen stellen.",
  communicativeGoal:
    "Po tejto lekcii viem poprieť existenciu vecí pomocou kein/keine/keinen a odlíšiť kein od nicht.",
  skillFocus: ["grammar", "speaking", "vocabulary"],

  grammarNote: {
    rule: "kein/keine/keinen — záporný člen (negácia podstatného mena)",
    explanation:
      "Kein sa skloňuje presne ako ein/eine/ein. V mužskom rode v akuzatíve pridávame -en: keinen. Kontrast: 'nicht' popiera slovesá a prídavné mená, 'kein' nahrádza ein/eine pred podstatným menom.",
    examples: [
      { de: "Es gibt keinen Aufzug. (M, Akk)", sk: "Nie je tu výťah." },
      { de: "Ich habe keine Zeit. (F, Akk)", sk: "Nemám čas." },
      { de: "Das ist kein Problem. (N, Nom)", sk: "To nie je problém." },
      { de: "Ich arbeite nicht. (Verb)", sk: "Nepracujem." },
    ],
    slovakContrastNote:
      "Slovenské 'žiadny' sa tiež skloňuje podľa rodu a pádu. Nemecké kein sleduje ROVNAKÝ vzor ako ein — ak poznáš ein/eine/einen, poznáš aj kein/keine/keinen!",
  },

  vocab: [
    {
      de: "kein / keine / keinen",
      sk: "žiadny / žiadna / žiadne",
      example: "Es gibt keinen Platz.",
      exampleSk: "Nie je tu miesto.",
      gender: null,
      srsId: "L11_V01",
      recycledFrom: [],
    },
    {
      de: "die Zeit",
      sk: "čas",
      example: "Ich habe keine Zeit!",
      exampleSk: "Nemám čas!",
      gender: "F",
      srsId: "L11_V02",
      recycledFrom: [],
    },
    {
      de: "der Platz",
      sk: "miesto, priestor, sedadlo",
      example: "Gibt es einen freien Platz?",
      exampleSk: "Je tu voľné miesto?",
      gender: "M",
      srsId: "L11_V03",
      recycledFrom: [],
    },
    {
      de: "das Problem",
      sk: "problém",
      example: "Kein Problem!",
      exampleSk: "Žiadny problém!",
      gender: "N",
      srsId: "L11_V04",
      recycledFrom: [],
    },
    {
      de: "die Lust",
      sk: "chuť, nálada",
      example: "Ich habe keine Lust.",
      exampleSk: "Nechce sa mi.",
      gender: "F",
      srsId: "L11_V05",
      recycledFrom: [],
    },
    {
      de: "leider",
      sk: "žiaľ, bohužiaľ",
      example: "Leider gibt es keinen Aufzug.",
      exampleSk: "Žiaľ, nie je tu výťah.",
      gender: null,
      srsId: "L11_V06",
      recycledFrom: [],
    },
    {
      de: "gar nicht",
      sk: "vôbec nie",
      example: "Das gefällt mir gar nicht.",
      exampleSk: "To sa mi vôbec nepáči.",
      gender: null,
      srsId: "L11_V07",
      recycledFrom: [],
    },
    {
      de: "noch nicht",
      sk: "ešte nie",
      example: "Ich bin noch nicht fertig.",
      exampleSk: "Ešte nie som hotová.",
      gender: null,
      srsId: "L11_V08",
      recycledFrom: [],
    },
    {
      de: "schon",
      sk: "už",
      example: "Bist du schon fertig?",
      exampleSk: "Si už hotová?",
      gender: null,
      srsId: "L11_V09",
      recycledFrom: [],
    },
    {
      de: "noch",
      sk: "ešte, stále",
      example: "Ich brauche noch Zeit.",
      exampleSk: "Ešte potrebujem čas.",
      gender: null,
      srsId: "L11_V10",
      recycledFrom: [],
    },
    {
      de: "eigentlich",
      sk: "vlastne, v podstate",
      example: "Eigentlich ist die Wohnung gut.",
      exampleSk: "Vlastne je byt dobrý.",
      gender: null,
      srsId: "L11_V11",
      recycledFrom: [],
    },
    {
      de: "na klar",
      sk: "ale samozrejme, jasné",
      example: "Na klar, kein Problem!",
      exampleSk: "Jasné, žiadny problém!",
      gender: null,
      srsId: "L11_V12",
      recycledFrom: [],
    },
  ],

  exercises: [
    {
      type: "flashcard",
      instruction: "Prelistuj si slovíčka. Každá karta = jedno nové slovo.",
      items: [
        "kein / keine / keinen = žiadny / žiadna / žiadne",
        "die Zeit = čas",
        "der Platz = miesto, priestor, sedadlo",
        "das Problem = problém",
        "die Lust = chuť, nálada",
        "leider = žiaľ, bohužiaľ",
        "gar nicht = vôbec nie",
        "noch nicht = ešte nie",
        "schon = už",
        "noch = ešte, stále",
        "eigentlich = vlastne, v podstate",
        "na klar = ale samozrejme, jasné",
      ],
    },
    {
      type: "mcq",
      instruction: "Vyber správnu odpoveď.",
      questions: [
        {
          question: "Jana nemá auto. Ako to povieš po nemecky?",
          options: [
            "Jana hat nicht Auto.",
            "Jana hat kein Auto.",
            "Jana hat keinen Auto.",
            "Jana hat keine Auto.",
          ],
          answer: 1,
          explanation:
            "'Auto' je stredného rodu (N), preto v akuzatíve používame 'kein' (nie keinen ani keine). Kein sa skloňuje ako ein.",
        },
        {
          question: "Ako poprieš vetu: 'Es gibt einen Aufzug'?",
          options: [
            "Es gibt nicht Aufzug.",
            "Es gibt keine Aufzug.",
            "Es gibt keinen Aufzug.",
            "Es gibt kein Aufzug.",
          ],
          answer: 2,
          explanation:
            "'Der Aufzug' je mužského rodu (M). Po 'es gibt' nasleduje akuzatív — preto 'keinen' (M, Akk).",
        },
        {
          question: "Čo je rozdiel medzi 'nicht' a 'kein'?",
          options: [
            "Nie je žiadny rozdiel.",
            "'Nicht' popiera slovesá/prídavné mená, 'kein' nahrádza ein/eine pred podstatným menom.",
            "'Kein' sa používa len v otázkach.",
            "'Nicht' sa používa len s podstatnými menami.",
          ],
          answer: 1,
          explanation:
            "Porov.: 'Ich arbeite nicht.' (sloveso) vs. 'Ich habe kein Geld.' (podstatné meno s členom ein). Je to kľúčový rozdiel!",
        },
        {
          question: "Jana sa ešte nerozhodla. Ako to povieš?",
          options: [
            "Jana entscheidet gar nicht.",
            "Jana entscheidet noch nicht.",
            "Jana entscheidet schon nicht.",
            "Jana entscheidet nicht noch.",
          ],
          answer: 1,
          explanation:
            "'Noch nicht' = ešte nie (dej sa zatiaľ nestal). 'Schon' = už (dej sa stal). 'Gar nicht' = vôbec nie (silné popretie).",
        },
        {
          question: "Ako povieš 'žiadna time' — teda 'Nemám čas'?",
          options: [
            "Ich habe nicht Zeit.",
            "Ich habe keinen Zeit.",
            "Ich habe keine Zeit.",
            "Ich habe keine Zeit.",
          ],
          answer: 2,
          explanation:
            "'Die Zeit' je ženského rodu (F). V akuzatíve ženského rodu používame 'keine' — rovnako ako 'eine → keine'.",
        },
        {
          question: "Čo znamená 'na klar'?",
          options: [
            "Nie je jasné.",
            "Možno.",
            "Ale samozrejme, jasné.",
            "Žiaľ, nie.",
          ],
          answer: 2,
          explanation:
            "'Na klar!' je hovorová nemecká fráza vyjadrujúca súhlas a samozrejmosť. Používa sa hlavne v hovorenej reči.",
        },
      ],
    },
    {
      type: "fill",
      instruction:
        "Doplň správny tvar kein/keine/keinen alebo nicht do medzery ___.",
      questions: [
        {
          sentence: "Es gibt ___ Aufzug in diesem Haus. (M, Akk)",
          answer: "keinen",
          hint: "Mužský rod, akuzatív → kei___",
          explanation:
            "'Der Aufzug' je M. Po 'es gibt' nasleduje akuzatív → keinen.",
        },
        {
          sentence: "Ich habe heute ___ Zeit.",
          answer: "keine",
          hint: "Die Zeit → F, Akk",
          explanation: "'Die Zeit' je F. Akuzatív F → keine (rovnako ako eine → keine).",
        },
        {
          sentence: "Das ist ___ Problem!",
          answer: "kein",
          hint: "Das Problem → N, Nom",
          explanation: "'Das Problem' je N. Nominatív N → kein.",
        },
        {
          sentence: "Jana arbeitet heute ___.",
          answer: "nicht",
          hint: "Popieraš sloveso, nie podstatné meno.",
          explanation:
            "Keď popieraš samo sloveso (pracovať), použiješ 'nicht', nie 'kein'.",
        },
        {
          sentence: "Ich bin ___ fertig.",
          answer: "noch nicht",
          hint: "ešte nie = noch ___",
          explanation: "'Noch nicht' = ešte nie. Vyjadruje, že dej sa zatiaľ nestal.",
        },
        {
          sentence: "Das gefällt mir ___ ___.",
          answer: "gar nicht",
          hint: "vôbec nie = ___ ___",
          explanation:
            "'Gar nicht' je silnejšia forma ako len 'nicht' — znamená vôbec, absolútne nie.",
        },
      ],
    },
    {
      type: "listen",
      instruction: "Počúvaj a zopakuj. Sústred sa na výslovnosť.",
      questions: [
        { de: "Kein Problem!", sk: "Žiadny problém!" },
        { de: "Leider gibt es keinen Aufzug.", sk: "Žiaľ, nie je tu výťah." },
        { de: "Ich habe keine Zeit.", sk: "Nemám čas." },
        { de: "Bist du schon fertig?", sk: "Si už hotová?" },
        { de: "Ich bin noch nicht fertig.", sk: "Ešte nie som hotová." },
        { de: "Das gefällt mir gar nicht.", sk: "To sa mi vôbec nepáči." },
        { de: "Eigentlich ist die Wohnung gut.", sk: "Vlastne je byt dobrý." },
        { de: "Na klar, kein Problem!", sk: "Jasné, žiadny problém!" },
      ],
    },
    {
      type: "match",
      instruction: "Spoj nemecké výrazy so slovenským prekladom.",
      pairs: [
        ["keinen Aufzug", "žiadny výťah (M, Akk)"],
        ["keine Zeit", "žiadny čas (F, Akk)"],
        ["kein Problem", "žiadny problém (N, Nom)"],
        ["noch nicht", "ešte nie"],
        ["gar nicht", "vôbec nie"],
        ["schon", "už"],
        ["eigentlich", "vlastne, v podstate"],
        ["leider", "žiaľ, bohužiaľ"],
      ],
    },
    {
      type: "dialogue",
      instruction:
        "Prečítaj si dialóg. Jana besichtigt eine Wohnung mit Herrn Mayer.",
      lines: [
        {
          speaker: "A",
          de: "Willkommen! Die Wohnung hat zwei Zimmer und eine Küche.",
          sk: "Vitajte! Byt má dve izby a kuchyňu.",
        },
        {
          speaker: "B",
          de: "Gibt es auch einen Aufzug?",
          sk: "Je tu aj výťah?",
        },
        {
          speaker: "A",
          de: "Leider nicht. Es gibt keinen Aufzug, aber die Wohnung ist im zweiten Stock.",
          sk: "Žiaľ, nie. Nie je tu výťah, ale byt je na druhom poschodí.",
        },
        {
          speaker: "B",
          de: "Und Parkmöglichkeiten?",
          sk: "A parkovacie možnosti?",
        },
        {
          speaker: "A",
          de: "Es gibt leider keinen Parkplatz bei dem Haus.",
          sk: "Žiaľ, pri dome nie je žiadne parkovacie miesto.",
        },
        {
          speaker: "B",
          de: "Kein Problem. Hat die Wohnung Internet?",
          sk: "Žiadny problém. Má byt internet?",
        },
        {
          speaker: "A",
          de: "Ja, natürlich! Und ein Badezimmer mit Badewanne.",
          sk: "Áno, samozrejme! A kúpeľňu s vaňou.",
        },
        {
          speaker: "B",
          de: "Gibt es eine Heizung im Badezimmer?",
          sk: "Je v kúpeľni kúrenie?",
        },
        {
          speaker: "A",
          de: "Eigentlich... es gibt keine Heizung dort. Tut mir leid.",
          sk: "Vlastne... v kúpeľni nie je kúrenie. Je mi to ľúto.",
        },
        {
          speaker: "B",
          de: "Und wie viel kostet die Miete?",
          sk: "A koľko stojí nájom?",
        },
        {
          speaker: "A",
          de: "750 Euro pro Monat, warm.",
          sk: "750 eur za mesiac, vrátane energií.",
        },
        {
          speaker: "B",
          de: "Na klar, ich überlege es mir!",
          sk: "Jasné, rozmyslím si to!",
        },
      ],
      comprehensionQuestions: [
        {
          question: "Gibt es einen Aufzug in der Wohnung?",
          options: ["Ja, im zweiten Stock.", "Nein, es gibt keinen Aufzug.", "Ja, aber er ist klein."],
          answer: 1,
        },
        {
          question: "Wie viel kostet die Miete pro Monat?",
          options: ["800 Euro", "650 Euro", "750 Euro"],
          answer: 2,
        },
        {
          question: "Was sagt Jana am Ende des Dialogs?",
          options: [
            "Sie nimmt die Wohnung sofort.",
            "Sie will die Wohnung nicht.",
            "Sie sagt, sie überlegt es sich.",
          ],
          answer: 2,
        },
      ],
    },
    {
      type: "wordorder",
      instruction: "Zoraď slová do správnej nemeckej vety.",
      sentences: [
        {
          words: ["Es", "gibt", "keinen", "Aufzug."],
          correct: "Es gibt keinen Aufzug.",
          hint: "Nie je tu výťah.",
          explanation: "Aufzug = M rod. Nach \"es gibt\" → akkuzatív: kein → keinen."
        },
        {
          words: ["Die", "Wohnung", "hat", "keine", "Heizung."],
          correct: "Die Wohnung hat keine Heizung.",
          hint: "Byt nemá kúrenie.",
          explanation: "Heizung = F rod. akkuzatív F: kein → keine (bez zmeny)."
        },
        {
          words: ["Ich", "habe", "kein", "Auto."],
          correct: "Ich habe kein Auto.",
          hint: "Nemám auto.",
          explanation: "Auto = N rod. Akkuzatív N: kein → kein (bez zmeny)."
        },
        {
          words: ["Hier", "gibt", "es", "keine", "Waschmaschine."],
          correct: "Hier gibt es keine Waschmaschine.",
          hint: "Tu nie je práčka.",
          explanation: "Waschmaschine = F rod → keine. \"hier\" na 1. mieste → sloveso (gibt) na 2. mieste (V2)."
        },
        {
          words: ["Er", "hat", "keinen", "Balkon."],
          correct: "Er hat keinen Balkon.",
          hint: "Nemá balkón.",
          explanation: "Balkon = M rod. Akkuzatív M: kein → keinen."
        }
      ]
    },
    {
      type: "minitext",
      instruction: "Prečítaj si krátky text o Jane. Potom odpovedaj na otázky.",
      text: "Jana besichtigt eine Wohnung im 7. Bezirk. Der Vermieter sagt: \"Die Wohnung hat keine Heizung und keinen Aufzug.\" Jana fragt: \"Gibt es eine Waschmaschine?\" Er sagt: \"Nein, es gibt keine Waschmaschine.\" Jana denkt: \"Das ist zu viel — kein Aufzug, keine Heizung, keine Waschmaschine.\" Sie sagt: \"Ich überlege es mir.\"",
      textSk: "Jana si prezerá byt v 7. obvode. Prenajímateľ povie: \"Byt nemá kúrenie a výťah.\" Jana sa pýta: \"Je tu práčka?\" On povie: \"Nie, práčka tu nie je.\" Jana si myslí: \"To je príliš veľa — žiadny výťah, žiadne kúrenie, žiadna práčka.\" Povie: \"Popremýšľam o tom.\"",
      questions: [
        {
          question: "Čo byt NEMÁ?",
          options: ["Keinen Balkon", "Keine Heizung und keinen Aufzug", "Kein Badezimmer", "Kein Wohnzimmer"],
          answer: 1,
          explanation: "V texte: \"Die Wohnung hat keine Heizung und keinen Aufzug.\""
        },
        {
          question: "Je v byte práčka?",
          options: ["Ja, im Keller", "Ja, im Bad", "Nein, keine Waschmaschine", "Ja, im Wohnzimmer"],
          answer: 2,
          explanation: "V texte: \"Nein, es gibt keine Waschmaschine.\""
        },
        {
          question: "Čo Jana povie na záver?",
          options: ["Sie nimmt die Wohnung sofort", "Sie lehnt die Wohnung ab", "Sie überlegt es sich", "Sie ruft ihre Mutter an"],
          answer: 2,
          explanation: "V texte: \"Ich überlege es mir.\" — Jana si to chce premyslieť."
        }
      ]
    },
    {
      type: "speaking",
      instruction: "Počúvaj nemeckú vetu. Potom hovor nahlas a skontroluj sa.",
      phrases: [
        { de: "Es gibt keinen Aufzug.", sk: "Nie je tu výťah.", tip: "keinen: k=[k], ei=[ai]" },
        { de: "Die Wohnung hat keine Heizung.", sk: "Byt nemá kúrenie.", tip: "Heizung: ei=[ai], z=[ts]" },
        { de: "Ich habe kein Auto.", sk: "Nemám auto.", tip: "kein: k=[k], ein=[ain]" },
        { de: "Hier gibt es keine Küche.", sk: "Tu nie je kuchyňa.", tip: "Küche: ü=[ü], ch=[x]" },
        { de: "Ich überlege es mir.", sk: "Popremýšľam o tom.", tip: "überlege: ü=[ü], e tiché" }
      ]
    },
  ],

  reviewWords: [
    "L08_V02",
    "L10_V11",
    "L10_V12",
    "L07_V04",
    "L06_V18",
    "L07_V09",
    "L07_V14",
  ],
  lessonNotes:
    "Pamätaj: kein sa skloňuje presne ako ein. Najčastejšia chyba: 'Es gibt kein Aufzug' — nesprávne! Der Aufzug je M, akuzatív → keinen! Frázy 'noch nicht', 'schon', 'gar nicht' sú veľmi frekventované — nauč sa ich ako celky.",
};
