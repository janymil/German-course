export const lesson14 = {
  id: 14,
  week: 3,
  day: 4,
  title: "Unregelmäßige Verben — Vokalwechsel",
  topic: "Nepravidelné slovesá — vokalové zmeny",
  cefr: "A1",
  xpReward: 30,
  narrativeContext:
    "Janas erster Arbeitsmonat läuft gut. Sie beschreibt ihrem Freund den Alltag: 'Lukas fährt jeden Tag mit dem Rad — er liest im Zug. Mein Chef empfiehlt das Café um die Ecke.'",
  communicativeGoal:
    "Po tejto lekcii viem správne konjugovať nepravidelné slovesá s vokalovými zmenami (a→ä, e→ie, e→i) v 2. a 3. osobe.",
  skillFocus: ["grammar", "vocabulary", "speaking"],

  grammarNote: {
    rule: "Slovesá s vokalovými zmenami — Vokalwechsel v 2. a 3. osobe jedn. čísla",
    explanation:
      "Vokalová zmena nastáva IBA v 2. osobe (du) a 3. osobe (er/sie/es). Tri typy: (1) a → ä: fahren → er fährt, schlafen → er schläft, tragen → er trägt. (2) e → ie: lesen → er liest, sehen → er sieht, empfehlen → er empfiehlt. (3) e → i: sprechen → er spricht, essen → er isst, helfen → er hilft, vergessen → er vergisst. Špeciálny prípad: laufen → au→äu: er läuft.",
    examples: [
      { de: "Er fährt jeden Tag zur Arbeit. (a→ä)", sk: "Každý deň jazdí do práce." },
      { de: "Sie liest jeden Morgen die Zeitung. (e→ie)", sk: "Každé ráno číta noviny." },
      { de: "Lukas hilft Jana gern. (e→i)", sk: "Lukas rád pomáha Jane." },
      { de: "Jana schläft heute lange. (a→ä)", sk: "Jana dnes dlho spí." },
    ],
    slovakContrastNote:
      "Slovenské nepravidelné slovesá sa menia v iných osobách. Nemecké vokalové zmeny sú PREDVÍDATEĽNÉ — vždy len v du a er/sie/es. Typ zmeny (a→ä, e→ie, e→i) sa líši podľa slovesa, ale vzor je vždy rovnaký.",
  },

  vocab: [
    {
      de: "fahren → er fährt",
      sk: "ísť, jazdiť dopravou",
      example: "Er fährt jeden Tag zur Arbeit.",
      exampleSk: "Každý deň jazdí do práce.",
      gender: null,
      srsId: "L14_V01",
      recycledFrom: [],
    },
    {
      de: "lesen → er liest",
      sk: "čítať",
      example: "Sie liest jeden Morgen die Zeitung.",
      exampleSk: "Každé ráno číta noviny.",
      gender: null,
      srsId: "L14_V02",
      recycledFrom: [],
    },
    {
      de: "schlafen → er schläft",
      sk: "spať",
      example: "Jana schläft heute lange.",
      exampleSk: "Jana dnes dlho spí.",
      gender: null,
      srsId: "L14_V03",
      recycledFrom: [],
    },
    {
      de: "tragen → er trägt",
      sk: "niesť, nosiť; obliekať",
      example: "Er trägt immer einen Anzug.",
      exampleSk: "Vždy nosí oblek.",
      gender: null,
      srsId: "L14_V04",
      recycledFrom: [],
    },
    {
      de: "waschen → er wäscht",
      sk: "prať, umývať",
      example: "Sie wäscht ihr Auto.",
      exampleSk: "Ona myje svoje auto.",
      gender: null,
      srsId: "L14_V05",
      recycledFrom: [],
    },
    {
      de: "empfehlen → er empfiehlt",
      sk: "odporučiť",
      example: "Er empfiehlt das Restaurant.",
      exampleSk: "Odporúča reštauráciu.",
      gender: null,
      srsId: "L14_V06",
      recycledFrom: [],
    },
    {
      de: "vergessen → er vergisst",
      sk: "zabudnúť",
      example: "Er vergisst immer seinen Schlüssel.",
      exampleSk: "Vždy zabudne kľúč.",
      gender: null,
      srsId: "L14_V07",
      recycledFrom: [],
    },
    {
      de: "laufen → er läuft",
      sk: "bežať, chodiť pešo",
      example: "Sie läuft jeden Morgen.",
      exampleSk: "Každé ráno beží.",
      gender: null,
      srsId: "L14_V08",
      recycledFrom: [],
    },
    {
      de: "helfen → er hilft",
      sk: "pomáhať",
      example: "Lukas hilft Jana gern.",
      exampleSk: "Lukas rád pomáha Jane.",
      gender: null,
      srsId: "L14_V09",
      recycledFrom: [],
    },
    {
      de: "das Auto",
      sk: "auto",
      example: "Das Auto fährt sehr schnell.",
      exampleSk: "Auto ide veľmi rýchlo.",
      gender: "N",
      srsId: "L14_V10",
      recycledFrom: [],
    },
    {
      de: "das Fahrrad",
      sk: "bicykel",
      example: "Lukas fährt jeden Tag mit dem Fahrrad.",
      exampleSk: "Lukas každý deň jazdí na bicykli.",
      gender: "N",
      srsId: "L14_V11",
      recycledFrom: [],
    },
    {
      de: "die Zeitung",
      sk: "noviny",
      example: "Er liest die Zeitung im Zug.",
      exampleSk: "Číta noviny vo vlaku.",
      gender: "F",
      srsId: "L14_V12",
      recycledFrom: [],
    },
    {
      de: "schnell",
      sk: "rýchlo, rýchly",
      example: "Der Zug fährt sehr schnell.",
      exampleSk: "Vlak ide veľmi rýchlo.",
      gender: null,
      srsId: "L14_V13",
      recycledFrom: [],
    },
    {
      de: "jeden Tag",
      sk: "každý deň",
      example: "Jana geht jeden Tag zur Arbeit.",
      exampleSk: "Jana každý deň chodí do práce.",
      gender: null,
      srsId: "L14_V14",
      recycledFrom: [],
    },
  ],

  exercises: [
    {
      type: "flashcard",
      instruction:
        "Prelistuj si slovíčka. Ku každému slovesu si zapamätaj formu er/sie/es s vokalovou zmenou!",
      items: [
        "fahren → er fährt = jazdiť (a→ä)",
        "lesen → er liest = čítať (e→ie)",
        "schlafen → er schläft = spať (a→ä)",
        "tragen → er trägt = nosiť (a→ä)",
        "waschen → er wäscht = prať, umývať (a→ä)",
        "empfehlen → er empfiehlt = odporučiť (e→ie)",
        "vergessen → er vergisst = zabudnúť (e→i)",
        "laufen → er läuft = bežať (au→äu)",
        "helfen → er hilft = pomáhať (e→i)",
        "das Auto = auto",
        "das Fahrrad = bicykel",
        "die Zeitung = noviny",
        "schnell = rýchlo, rýchly",
        "jeden Tag = každý deň",
      ],
    },
    {
      type: "mcq",
      instruction: "Vyber správnu konjugáciu.",
      questions: [
        {
          question: "Lukas ___ jeden Tag mit dem Fahrrad. (fahren)",
          options: ["fahrt", "fährt", "fahren", "fähren"],
          answer: 1,
          explanation:
            "fahren → er fährt (a→ä). Vokalová zmena v 3. osobe jedn. čísla. Pozor: NEPOUŽÍVAJ 'fahrt' (to nie je slovo!).",
        },
        {
          question: "Jana ___ jeden Morgen die Zeitung. (lesen)",
          options: ["lest", "liест", "liest", "leset"],
          answer: 2,
          explanation: "lesen → er/sie liest (e→ie). Zmena prebieha v du a er/sie/es.",
        },
        {
          question: "Bei welchem Verb wechselt der Vokal a→ä?",
          options: ["lesen", "sprechen", "schlafen", "vergessen"],
          answer: 2,
          explanation:
            "schlafen → er schläft (a→ä). lesen = e→ie, sprechen = e→i, vergessen = e→i.",
        },
        {
          question: "Er ___ immer seinen Schlüssel. (vergessen)",
          options: ["vergessen", "vergissest", "vergisst", "vergesst"],
          answer: 2,
          explanation: "vergessen → er vergisst (e→i). Navyše tu dochádza k zdvojeniu -ss-.",
        },
        {
          question: "V ktorých osobách nastáva vokalová zmena u nemeckých nepravidelných slovies?",
          options: [
            "Vo všetkých osobách",
            "Len v 1. osobe (ich)",
            "Len v du a er/sie/es",
            "Len v množnom čísle",
          ],
          answer: 2,
          explanation:
            "Vokalová zmena nastáva IBA v 2. osobe (du) a 3. osobe jedn. čísla (er/sie/es). Ostatné osoby (ich, wir, ihr, sie) majú kmeňový vokal bez zmeny.",
        },
        {
          question: "Lukas ___ Jana gern beim Lernen. (helfen)",
          options: ["helft", "hilft", "helfen", "helfst"],
          answer: 1,
          explanation:
            "helfen → er hilft (e→i). Typ e→i: essen→isst, sprechen→spricht, helfen→hilft.",
        },
      ],
    },
    {
      type: "fill",
      instruction:
        "Doplň správnu formu slovesa v zátvorkách do medzery ___.",
      questions: [
        {
          sentence: "Er ___ jeden Morgen die Zeitung. (lesen)",
          answer: "liest",
          hint: "lesen, er/sie → e→ie zmena",
          explanation: "lesen → er liest (e→ie). 3. osoba jedn. čísla.",
        },
        {
          sentence: "Jana ___ heute sehr lange. (schlafen)",
          answer: "schläft",
          hint: "schlafen, sie → a→ä zmena",
          explanation: "schlafen → sie schläft (a→ä). 3. osoba jedn. čísla.",
        },
        {
          sentence: "Mein Chef ___ das Café um die Ecke. (empfehlen)",
          answer: "empfiehlt",
          hint: "empfehlen, er → e→ie(h) zmena",
          explanation: "empfehlen → er empfiehlt (e→ie). Špeciálny prípad s -ie-.",
        },
        {
          sentence: "Lukas ___ immer seinen Schlüssel! (vergessen)",
          answer: "vergisst",
          hint: "vergessen, er → e→i zmena",
          explanation: "vergessen → er vergisst (e→i).",
        },
        {
          sentence: "Jana ___ jeden Tag mit dem Fahrrad zur Arbeit. (fahren)",
          answer: "fährt",
          hint: "fahren, sie → a→ä zmena",
          explanation: "fahren → sie fährt (a→ä).",
        },
        {
          sentence: "Lukas ___ Jana gern bei den Hausaufgaben. (helfen)",
          answer: "hilft",
          hint: "helfen, er → e→i zmena",
          explanation: "helfen → er hilft (e→i).",
        },
      ],
    },
    {
      type: "listen",
      instruction: "Počúvaj a zopakuj. Sústred sa na správnu formu slovesa.",
      questions: [
        { de: "Er fährt jeden Tag mit dem Fahrrad.", sk: "Každý deň jazdí na bicykli." },
        { de: "Sie liest jeden Morgen die Zeitung.", sk: "Každé ráno číta noviny." },
        { de: "Jana schläft heute lange.", sk: "Jana dnes dlho spí." },
        { de: "Er empfiehlt das Café um die Ecke.", sk: "Odporúča kaviareň za rohom." },
        { de: "Er vergisst immer seinen Schlüssel.", sk: "Vždy zabudne kľúč." },
        { de: "Lukas hilft Jana gern.", sk: "Lukas rád pomáha Jane." },
        { de: "Sie läuft jeden Morgen im Park.", sk: "Každé ráno beží v parku." },
        { de: "Er trägt immer einen Anzug.", sk: "Vždy nosí oblek." },
      ],
    },
    {
      type: "match",
      instruction: "Spoj infinitív slovesa so správnou formou er/sie/es.",
      pairs: [
        ["fahren", "er fährt"],
        ["lesen", "er liest"],
        ["schlafen", "er schläft"],
        ["empfehlen", "er empfiehlt"],
        ["vergessen", "er vergisst"],
        ["helfen", "er hilft"],
        ["laufen", "er läuft"],
        ["tragen", "er trägt"],
      ],
    },
    {
      type: "dialogue",
      instruction:
        "Prečítaj si dialóg. Jana a Lukas raňajkujú spolu a Lukas opisuje svoju dennú rutinu.",
      lines: [
        {
          speaker: "A",
          de: "Guten Morgen, Lukas! Um wie viel Uhr stehst du normalerweise auf?",
          sk: "Dobré ráno, Lukas! O koľkej sa zvyčajne vstávaš?",
        },
        {
          speaker: "B",
          de: "Ich stehe um sechs Uhr auf. Dann laufe ich eine Stunde im Park.",
          sk: "Vstávam o šiestej. Potom hodinu behám v parku.",
        },
        {
          speaker: "A",
          de: "Wow! Und wie fährst du zur Arbeit?",
          sk: "Wow! A ako jazdíš do práce?",
        },
        {
          speaker: "B",
          de: "Ich fahre immer mit dem Fahrrad. Es ist schnell und gesund!",
          sk: "Vždy jazdím na bicykli. Je to rýchle a zdravé!",
        },
        {
          speaker: "A",
          de: "Und was machst du im Zug? Oh wait, du fährst ja mit dem Rad.",
          sk: "A čo robíš vo vlaku? Ach počkaj, ty predsa jazdíš na bicykli.",
        },
        {
          speaker: "B",
          de: "Genau! Aber mein Chef fährt mit dem Zug. Er liest immer die Zeitung.",
          sk: "Presne tak! Ale môj šéf jazdí vlakom. Vždy číta noviny.",
        },
        {
          speaker: "A",
          de: "Und was empfiehlt dein Chef zum Mittagessen?",
          sk: "A čo odporúča tvoj šéf na obed?",
        },
        {
          speaker: "B",
          de: "Er empfiehlt immer das Café um die Ecke. Das Essen ist super!",
          sk: "Vždy odporúča kaviareň za rohom. Jedlo je super!",
        },
        {
          speaker: "A",
          de: "Schläfst du mittags manchmal?",
          sk: "Spíš niekedy poobede?",
        },
        {
          speaker: "B",
          de: "Nein! Aber Jana schläft immer nach dem Mittagessen!",
          sk: "Nie! Ale Jana vždy spí po obede!",
        },
        {
          speaker: "A",
          de: "Das stimmt nicht! Ich vergesse manchmal den Wecker, das ist alles.",
          sk: "To nie je pravda! Niekedy zabudnem na budík, to je všetko.",
        },
        {
          speaker: "B",
          de: "Haha! Jana vergisst den Wecker — jeden Tag!",
          sk: "Haha! Jana zabudne na budík — každý deň!",
        },
      ],
      comprehensionQuestions: [
        {
          question: "Wie fährt Lukas zur Arbeit?",
          options: [
            "Mit dem Zug.",
            "Mit dem Auto.",
            "Mit dem Fahrrad.",
          ],
          answer: 2,
        },
        {
          question: "Was liest Lukas' Chef im Zug?",
          options: [
            "Ein Buch.",
            "Die Zeitung.",
            "Eine E-Mail.",
          ],
          answer: 1,
        },
        {
          question: "Was vergisst Jana manchmal?",
          options: [
            "Ihren Schlüssel.",
            "Den Wecker.",
            "Die Zeitung.",
          ],
          answer: 1,
        },
      ],
    },
    {
      type: "wordorder",
      instruction: "Zoraď slová do správnej nemeckej vety.",
      sentences: [
        {
          words: ["Jana", "fährt", "jeden", "Tag", "mit", "der", "U-Bahn."],
          correct: "Jana fährt jeden Tag mit der U-Bahn.",
          hint: "Jana každý deň cestuje metrom.",
          explanation: "fahren → sie fährt (a→ä, Vokalwechsel!). 'jeden Tag' = každý deň."
        },
        {
          words: ["Liest", "du", "gern", "Bücher?"],
          correct: "Liest du gern Bücher?",
          hint: "Rád/a čítal/a knihy?",
          explanation: "lesen → du liest (e→ie). Áno/nie otázka: sloveso na 1. mieste."
        },
        {
          words: ["Er", "schläft", "immer", "lange."],
          correct: "Er schläft immer lange.",
          hint: "On vždy dlho spí.",
          explanation: "schlafen → er schläft (a→ä, Vokalwechsel). 'immer' = vždy."
        },
        {
          words: ["Was", "isst", "du", "zum", "Mittagessen?"],
          correct: "Was isst du zum Mittagessen?",
          hint: "Čo ješ na obed?",
          explanation: "essen → du isst (e→i). W-otázka: Was + isst (V2) + du."
        },
        {
          words: ["Sie", "spricht", "sehr", "gut", "Englisch."],
          correct: "Sie spricht sehr gut Englisch.",
          hint: "Ona hovorí veľmi dobre po anglicky.",
          explanation: "sprechen → sie spricht (e→i). 'sehr gut' stoja pred predmetom."
        }
      ]
    },
    {
      type: "minitext",
      instruction: "Prečítaj si krátky text o Jane. Potom odpovedaj na otázky.",
      text: "Jana arbeitet einen Monat in Wien. Sie fährt jeden Morgen mit der U-Bahn ins Büro. Im Büro liest sie E-Mails und spricht mit Kollegen. Sie isst mittags in der Kantine. Am Abend schläft sie früh — der erste Monat ist anstrengend. Aber Jana ist froh: Sie spricht jetzt viel besser Deutsch!",
      textSk: "Jana pracuje mesiac vo Viedni. Každé ráno cestuje metrom do kancelárie. V kancelárii číta e-maily a hovorí s kolegami. Na obed je v kantíne. Večer spí skoro — prvý mesiac je náročný. Ale Jana je rada: Teraz hovorí oveľa lepšie po nemecky!",
      questions: [
        {
          question: "Ako Jana cestuje do práce?",
          options: ["Mit dem Bus", "Mit der U-Bahn", "Mit dem Fahrrad", "Zu Fuß"],
          answer: 1,
          explanation: "V texte: 'Sie fährt jeden Morgen mit der U-Bahn ins Büro.'"
        },
        {
          question: "Kde Jana je na obed?",
          options: ["Im Café", "Im Restaurant", "In der Kantine", "Zu Hause"],
          answer: 2,
          explanation: "V texte: 'Sie isst mittags in der Kantine.'"
        },
        {
          question: "Čo si Jana všimla po mesiaci?",
          options: ["Sie ist sehr müde", "Sie spricht jetzt viel besser Deutsch", "Sie will nach Hause", "Der Job ist langweilig"],
          answer: 1,
          explanation: "V texte: 'Sie spricht jetzt viel besser Deutsch!'"
        }
      ]
    },
    {
      type: "speaking",
      instruction: "Počúvaj nemeckú vetu. Potom hovor nahlas a skontroluj sa.",
      phrases: [
        { de: "Jana fährt mit der U-Bahn.", sk: "Jana cestuje metrom.", tip: "fährt: ä=[ä], äh dlhé" },
        { de: "Er schläft immer lange.", sk: "On vždy dlho spí.", tip: "schläft: sch=[š], ä=[ä]" },
        { de: "Was liest du gern?", sk: "Čo rád/a číta/š?", tip: "liest: ie=[í], st" },
        { de: "Sie spricht sehr gut Deutsch.", sk: "Ona hovorí veľmi dobre nemecky.", tip: "spricht: spr=[špr]" },
        { de: "Ich esse gern Pizza.", sk: "Rád/a jem pizzu.", tip: "esse: e krátke, ss=[s]" }
      ]
    },
  ],

  reviewWords: ["L09_V14", "L10_V02", "L10_V03"],
  lessonNotes:
    "Najdôležitejšie pravidlo: vokalová zmena LEN v du a er/sie/es! Ich, wir, ihr, sie — bez zmeny. Nauč si typ zmeny ku každému slovesu: fahren (a→ä), lesen (e→ie), sprechen (e→i). Laufen je špeciálne: au→äu (läuft).",
};
