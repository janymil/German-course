export const lesson10 = {
  id: 10,
  week: 2,
  day: 5,
  title: "Im Gasthaus — Akkusativ und starke Verben",
  topic: "V Gasthaus — Akkusatív a silné slovesá",
  cefr: "A1",
  xpReward: 30,
  narrativeContext:
    "Jana ide na obed s kolegom Peterom do tradičného viedenského Gastropub (Gasthaus). Jana je hladná a smädná po dlhom ráne. Objednáva si prvýkrát celé jedlo — polievku, hlavné jedlo a nápoj. Prvý skutočný dialóg pri stole v nemčine!",
  communicativeGoal:
    "Po tejto lekcii viem použiť Akkusatív s určitým aj neurčitým členom, viem objednávať jedlo v reštaurácii, poznám silné slovesá essen, trinken, sehen a viem povedať 'Ich habe Hunger/Durst!'",
  skillFocus: ["grammar", "vocabulary", "speaking", "listening"],

  grammarNote: {
    rule: "Akkusatív: der→den, ein→einen; F a N zostávajú. haben + Hunger/Durst (bez členu)",
    explanation:
      "Akkusatív je pád priameho objektu (čo? koho?). Pravidlo zmeny: MUŽSKÝ ROD MENÍ ČLEN — der→den, ein→einen, kein→keinen. Ženský a stredný rod sa v Akkusatíve NEMENIA (die→die, das→das, eine→eine). Silné slovesá essen, trinken, sehen menia kmeňovú samohlásku v 2. a 3. osobe jednotného čísla. Špeciálny prípad: 'Ich habe Hunger' / 'Ich habe Durst' — hunger a thirst sa používajú BEZ členu!",
    examples: [
      { de: "Ich sehe den Mann. (M → den)", sk: "Vidím toho muža. — der Mann → den Mann" },
      { de: "Ich esse einen Kuchen. (M → einen)", sk: "Zjem koláč. — ein Kuchen → einen Kuchen" },
      { de: "Ich trinke die Suppe. (F → die, nezmenené)", sk: "Pijem polievku. — die → die" },
      { de: "Ich nehme das Glas. (N → das, nezmenené)", sk: "Zoberiem pohár. — das → das" },
      { de: "Ich habe Hunger! / Ich habe Durst!", sk: "Mám hlad! / Mám smäd! — BEZ členu!" }
    ],
    slovakContrastNote:
      "Slovenčina má tiež Akkusatív (4. pád), ale člen neexistuje — zmena je len v pádovej prípone podstatného mena. V nemčine sa mení ČLEN, nie prípona podstatného mena (Tisch zostáva Tisch, ale der→den). Silné slovesá (essen: du isst, er isst; sehen: du siehst, er sieht; trinken: ich trinke, du trinkst, er trinkt) — len essen/sehen majú vokalickú zmenu!"
  },

  vocab: [
    {
      de: "trinken",
      sk: "piť",
      example: "Ich trinke Wasser. Was trinkst du?",
      exampleSk: "Pijem vodu. Čo piješ?",
      gender: null,
      srsId: "L10_V01",
      recycledFrom: []
    },
    {
      de: "essen",
      sk: "jesť (⚠️ du isst, er isst!)",
      example: "Ich esse Suppe. Du isst gern Kuchen, oder?",
      exampleSk: "Jem polievku. Ty ješ rád koláč, však?",
      gender: null,
      srsId: "L10_V02",
      recycledFrom: []
    },
    {
      de: "sehen",
      sk: "vidieť (⚠️ du siehst, er sieht!)",
      example: "Siehst du die Speisekarte? — Ich sehe sie nicht.",
      exampleSk: "Vidíš jedálny lístok? — Nevidím ho.",
      gender: null,
      srsId: "L10_V03",
      recycledFrom: []
    },
    {
      de: "brauchen",
      sk: "potrebovať",
      example: "Ich brauche einen Kellner!",
      exampleSk: "Potrebujem čašníka!",
      gender: null,
      srsId: "L10_V04",
      recycledFrom: []
    },
    {
      de: "mögen",
      sk: "mať rád (ich mag, du magst)",
      example: "Ich mag Wiener Schnitzel sehr gern.",
      exampleSk: "Mám veľmi rád Viedenský rezeň.",
      gender: null,
      srsId: "L10_V05",
      recycledFrom: []
    },
    {
      de: "der Apfelsaft",
      sk: "jablkový džús",
      example: "Einen Apfelsaft, bitte!",
      exampleSk: "Jablkový džús, prosím!",
      gender: "M",
      srsId: "L10_V06",
      recycledFrom: []
    },
    {
      de: "die Suppe",
      sk: "polievka",
      example: "Die Gulaschsuppe ist hier fantastisch!",
      exampleSk: "Gulášová polievka je tu fantastická!",
      gender: "F",
      srsId: "L10_V07",
      recycledFrom: []
    },
    {
      de: "der Käse",
      sk: "syr",
      example: "Brot mit Käse ist ein gutes Frühstück.",
      exampleSk: "Chlieb so syrom je dobré raňajky.",
      gender: "M",
      srsId: "L10_V08",
      recycledFrom: []
    },
    {
      de: "das Glas",
      sk: "pohár",
      example: "Ein Glas Wasser, bitte.",
      exampleSk: "Pohár vody, prosím.",
      gender: "N",
      srsId: "L10_V09",
      recycledFrom: []
    },
    {
      de: "die Tasse",
      sk: "šálka",
      example: "Eine Tasse Kaffee macht mich glücklich!",
      exampleSk: "Šálka kávy ma urobí šťastnou!",
      gender: "F",
      srsId: "L10_V10",
      recycledFrom: []
    },
    {
      de: "der Hunger",
      sk: "hlad",
      example: "Ich habe großen Hunger nach der Arbeit!",
      exampleSk: "Mám veľký hlad po práci!",
      gender: "M",
      srsId: "L10_V11",
      recycledFrom: []
    },
    {
      de: "der Durst",
      sk: "smäd",
      example: "Hast du Durst? Ich brauche ein Glas Wasser!",
      exampleSk: "Máš smäd? Potrebujem pohár vody!",
      gender: "M",
      srsId: "L10_V12",
      recycledFrom: []
    },
    {
      de: "nehmen",
      sk: "vziať si (recyklované z L08)",
      example: "Ich nehme den Gulasch, bitte.",
      exampleSk: "Dám si guláš, prosím.",
      gender: null,
      srsId: "L10_V13",
      recycledFrom: [8]
    },
    {
      de: "bestellen",
      sk: "objednať si (recyklované z L08)",
      example: "Ich möchte bestellen. Wir bestellen zusammen.",
      exampleSk: "Chcel/a by som si objednať. Objednávame spolu.",
      gender: null,
      srsId: "L10_V14",
      recycledFrom: [8]
    }
  ],

  exercises: [
    {
      type: "flashcard",
      instruction:
        "Precvičuj silné slovesá a jedlá. Flip kartu pre preklad a pozornosť na ⚠️ formy.",
      items: [
        "trinken = piť (ich trinke, du trinkst, er trinkt)",
        "essen = jesť (⚠️ du isst, er isst!)",
        "sehen = vidieť (⚠️ du siehst, er sieht!)",
        "brauchen = potrebovať",
        "mögen = mať rád (ich mag, du magst)",
        "der Apfelsaft = jablkový džús (M)",
        "die Suppe = polievka (F)",
        "der Käse = syr (M)",
        "das Glas = pohár (N)",
        "die Tasse = šálka (F)",
        "der Hunger = hlad (M)",
        "der Durst = smäd (M)",
        "nehmen = vziať si / dám si (recykl. L08)",
        "bestellen = objednať si (recykl. L08)"
      ]
    },
    {
      type: "mcq",
      instruction:
        "Jana a Peter sú v Gasthaus. Vyber správnu akkusatívnu formu alebo správny tvar slovesa.",
      questions: [
        {
          question: "Jana chce objednať guláš (der Gulasch). Povie: 'Ich nehme ___ Gulasch.'",
          options: [
            "der",
            "die",
            "das",
            "den"
          ],
          answer: 3,
          explanation:
            "'Gulasch' je mužský rod (der Gulasch). V Akkusatíve mužský určitý člen der→DEN. 'Ich nehme den Gulasch.' = Dám si guláš. Pravidlo: len M mení člen v Akkusatíve: der→den."
        },
        {
          question: "Peter hovorí: 'Ich habe ___.' (Mám hlad.) Čo doplní?",
          options: [
            "den Hunger",
            "einen Hunger",
            "Hunger",
            "der Hunger"
          ],
          answer: 2,
          explanation:
            "'Ich habe Hunger' — Hunger a Durst sa po 'haben' používajú BEZ členu. Je to ustálená idiomatická vazba: Hunger haben, Durst haben, Angst haben, Recht haben. Nikdy: *'Ich habe den Hunger' alebo *'Ich habe einen Hunger'."
        },
        {
          question: "Čašník sa pýta Petra: 'Was essen Sie?' Peter odpovie: 'Ich ___ Wiener Schnitzel.'",
          options: [
            "esse",
            "isst",
            "esst",
            "essen"
          ],
          answer: 0,
          explanation:
            "Pre 1. osobu ich: ich ESS-e. Silné sloveso 'essen' mení kmeňovú samohlásku len v 2. a 3. osobe jednotného čísla: du ISST, er/sie ISST. Pre ich, wir, ihr, sie→ bežné formy: ich esse, wir essen, ihr esst, sie essen."
        },
        {
          question: "Jana sa pýta Petra: '___  du die Speisekarte?' (Vidíš jedálny lístok?)",
          options: [
            "Sehst",
            "Siehst",
            "Sieht",
            "Sehest"
          ],
          answer: 1,
          explanation:
            "'sehen' je silné sloveso: ich sehe, du SIEHST, er/sie SIEHT, wir sehen. Vokalická zmena e → ie v 2. a 3. osobe jednotného čísla. 'Siehst du die Speisekarte?' = Vidíš jedálny lístok?"
        },
        {
          question: "Jana objednáva polievku (die Suppe). Povie: 'Ich nehme ___ Suppe.'",
          options: [
            "den",
            "einen",
            "die",
            "eine"
          ],
          answer: 2,
          explanation:
            "'Suppe' je ženský rod (die Suppe). Ženský rod sa v Akkusatíve NEMENÍ: die→die. 'Ich nehme die Suppe.' = Dám si polievku. (Určitý člen — Jana ukázala na konkrétnu polievku v jedálnom lístku.)"
        },
        {
          question: "Jana kupuje pohár džúsu (das Glas, der Apfelsaft). Povie: 'Ich nehme ___ Glas Apfelsaft.'",
          options: [
            "den",
            "die",
            "ein",
            "einen"
          ],
          answer: 2,
          explanation:
            "'Glas' je stredný rod (das Glas). Neurčitý člen stredného rodu v Akkusatíve = EIN (nezmenený). 'Ich nehme ein Glas Apfelsaft.' = Dám si pohár jablkového džúsu. Stredný rod: das → ein (Nominatív aj Akkusatív rovnaké)."
        }
      ]
    },
    {
      type: "fill",
      instruction:
        "Doplň správnu formu Akkusatívu alebo silného slovesa. Jana a Peter obedujú.",
      questions: [
        {
          sentence: "Ich ___ großen Hunger! Wo ist der Kellner? (mať — ich-forma)",
          answer: "habe",
          hint: "haben — 1. osoba jednotného čísla",
          explanation:
            "'Ich habe Hunger!' = Mám hlad! haben: ich habe. Sloveso VŽDY prítomné — nikdy 'Ich Hunger!'."
        },
        {
          sentence: "Siehst du ___ Kellner? (den / die / das / einen)",
          answer: "den",
          hint: "Kellner = M → Akkusatív určitý",
          explanation:
            "'der Kellner' (M) → Akkusatív určitý = DEN. 'Siehst du den Kellner?' = Vidíš čašníka? sehen: du siehst (vokalická zmena e→ie)."
        },
        {
          sentence: "Ich ___ die Gulaschsuppe — sie ist sehr lecker! (jesť — ich-forma)",
          answer: "esse",
          hint: "essen — 1. osoba jedn. čísla",
          explanation:
            "essen: ich esse (bežná forma bez zmeny). Vokalická zmena e → i: len du isst, er/sie isst."
        },
        {
          sentence: "Peter ___ ein Glas Bier. (piť — er-forma)",
          answer: "trinkt",
          hint: "trinken — 3. osoba jedn. čísla",
          explanation:
            "trinken: ich trinke, du trinkst, er/sie/es TRINKT. 'trinken' je silné sloveso, ale kmeňová samohláska sa v jednotnom čísle NEMENÍ (na rozdiel od essen a sehen). Konjugácia je pravidelná!"
        },
        {
          sentence: "Jana ___ einen Kaffee nach dem Essen. (potrebovať — sie-forma)",
          answer: "braucht",
          hint: "brauchen — 3. osoba jedn. čísla",
          explanation:
            "brauchen: ich brauche, du brauchst, er/sie/es BRAUCHT. Pravidelné sloveso, -t prípona pre 3. osobu. 'Jana braucht einen Kaffee nach dem Essen.' = Jana potrebuje kávu po jedle."
        },
        {
          sentence: "Ich ___ keine Suppe, danke. (jesť — ich-forma + záporný člen)",
          answer: "esse",
          hint: "essen — ich-forma, kein = záporka pred podstatným menom",
          explanation:
            "'Ich esse keine Suppe, danke.' = Nejem polievku, ďakujem. 'kein/keine' = záporka pred podstatným menom (negácia predmetu). 'keine Suppe' (F → keine)."
        }
      ]
    },
    {
      type: "listen",
      instruction:
        "Počúvaj frázu z reštaurácie a identifikuj správny preklad.",
      questions: [
        { de: "Ich habe Hunger!", sk: "Mám hlad!" },
        { de: "Ich habe Durst.", sk: "Mám smäd." },
        { de: "Ich nehme den Gulasch.", sk: "Dám si guláš." },
        { de: "Siehst du die Speisekarte?", sk: "Vidíš jedálny lístok?" },
        { de: "Er isst Wiener Schnitzel.", sk: "Jedí Viedenský rezeň." },
        { de: "Ein Glas Apfelsaft, bitte!", sk: "Pohár jablkového džúsu, prosím!" },
        { de: "Die Suppe ist sehr lecker.", sk: "Polievka je veľmi chutná." },
        { de: "Ich brauche eine Tasse Kaffee!", sk: "Potrebujem šálku kávy!" }
      ]
    },
    {
      type: "match",
      instruction:
        "Spoj nemecké slovo alebo frázu so slovenským prekladom.",
      pairs: [
        ["essen", "jesť"],
        ["trinken", "piť"],
        ["sehen", "vidieť"],
        ["der Hunger", "hlad"],
        ["der Durst", "smäd"],
        ["das Glas", "pohár"],
        ["die Tasse", "šálka"],
        ["die Suppe", "polievka"]
      ]
    },
    {
      type: "dialogue",
      instruction:
        "Prečítaj si dialóg medzi Janou a čašníkom v tradičnom viedenskom Gasthaus. Potom odpovedaj na otázky porozumenia.",
      lines: [
        {
          speaker: "A",
          de: "Guten Tag! Einen Tisch für zwei Personen, bitte.",
          sk: "Dobrý deň! Stôl pre dve osoby, prosím."
        },
        {
          speaker: "B",
          de: "Natürlich, bitte sehr! Hier ist die Speisekarte.",
          sk: "Samozrejme, prosím! Tu je jedálny lístok."
        },
        {
          speaker: "A",
          de: "Danke. Ich habe großen Hunger! Ich nehme die Gulaschsuppe als Vorspeise.",
          sk: "Ďakujem. Mám veľký hlad! Ako predjedlo si dám gulášovú polievku."
        },
        {
          speaker: "B",
          de: "Sehr gut. Und als Hauptspeise?",
          sk: "Výborne. A ako hlavné jedlo?"
        },
        {
          speaker: "A",
          de: "Ich esse gern Wiener Schnitzel. Haben Sie das?",
          sk: "Rada jem Viedenský rezeň. Máte ho?"
        },
        {
          speaker: "B",
          de: "Ja, natürlich! Das Wiener Schnitzel ist unser Spezialität. Was möchten Sie trinken?",
          sk: "Áno, samozrejme! Viedenský rezeň je naša špeciálita. Čo si dáte na pitie?"
        },
        {
          speaker: "A",
          de: "Ich habe auch Durst. Ich trinke ein Glas Apfelsaft, bitte.",
          sk: "Mám aj smäd. Dám si pohár jablkového džúsu, prosím."
        },
        {
          speaker: "B",
          de: "Und Ihr Kollege — was nimmt er?",
          sk: "A váš kolega — čo si dá?"
        },
        {
          speaker: "A",
          de: "Er nimmt auch die Suppe und dann einen Käsespätzle. Und eine Tasse Kaffee.",
          sk: "On si tiež dá polievku a potom syrové halušky. A šálku kávy."
        },
        {
          speaker: "B",
          de: "Danke schön! Das Essen kommt in zehn Minuten.",
          sk: "Pekne ďakujem! Jedlo príde za desať minút."
        }
      ],
      comprehensionQuestions: [
        {
          question: "Čo si Jana objedná ako predjedlo (Vorspeise)?",
          options: [
            "Wiener Schnitzel",
            "Gulaschsuppe",
            "Käsespätzle",
            "Brot mit Butter"
          ],
          answer: 1
        },
        {
          question: "Čo si Jana objedná na pitie?",
          options: [
            "Eine Tasse Kaffee",
            "Ein Glas Wasser",
            "Ein Glas Apfelsaft",
            "Einen Tee"
          ],
          answer: 2
        },
        {
          question: "Čo si objedná Janin kolega na pitie?",
          options: [
            "Ein Glas Apfelsaft",
            "Ein Glas Wasser",
            "Einen Tee",
            "Eine Tasse Kaffee"
          ],
          answer: 3
        }
      ]
    },
    {
      type: 'wordorder',
      instruction: 'Zoraď slová do správnej nemeckej vety.',
      sentences: [
        {
          words: ['Ich', 'nehme', 'den', 'Wiener', 'Schnitzel.'],
          correct: 'Ich nehme den Wiener Schnitzel.',
          hint: 'Dám si viedenský rezeň.',
          explanation: 'Schnitzel = M rod. V akkuzatíve: der → den. "nehmen" = vziať si / dám si.'
        },
        {
          words: ['Jana', 'trinkt', 'einen', 'Apfelsaft.'],
          correct: 'Jana trinkt einen Apfelsaft.',
          hint: 'Jana pije jablčný džús.',
          explanation: 'Apfelsaft = M rod. V akkuzatíve: ein → einen. trinkt = 3. osoba sg. od "trinken".'
        },
        {
          words: ['Er', 'sieht', 'den', 'Kellner.'],
          correct: 'Er sieht den Kellner.',
          hint: 'On vidí čašníka.',
          explanation: 'Kellner = M rod. Akkuzatív: den. sehen = silné sloveso: sieht (e→ie v 3. osobe).'
        },
        {
          words: ['Ich', 'esse', 'ein', 'Schnitzel', 'und', 'trinke', 'einen', 'Kaffee.'],
          correct: 'Ich esse ein Schnitzel und trinke einen Kaffee.',
          hint: 'Jem rezeň a pijem kávu.',
          explanation: 'Schnitzel = N rod → ein (akkuzatív nezmení). Kaffee = M rod → einen (akkuzatív).'
        },
        {
          words: ['Wir', 'essen', 'die', 'Suppe', 'und', 'den', 'Fisch.'],
          correct: 'Wir essen die Suppe und den Fisch.',
          hint: 'Jeme polievku a rybu.',
          explanation: 'Suppe = F rod → die (akkuzatív F = nominatív). Fisch = M rod → den (akkuzatív).'
        }
      ]
    },
    {
      type: 'minitext',
      instruction: 'Prečítaj si krátky text o Jane. Potom odpovedaj na otázky.',
      text: 'Jana geht mit Peter ins Gasthaus. Jana hat Hunger. Sie nimmt die Suppe und den Wiener Schnitzel. Peter isst den Fisch. Jana trinkt einen Apfelsaft, Peter trinkt ein Wasser. Der Kellner fragt: "Hat es Ihnen geschmeckt?" Jana sagt: "Ja, es war sehr lecker!"',
      textSk: 'Jana ide s Petrom do Gasthausa. Jana má hlad. Zoberie si polievku a Viedenský rezeň. Peter je rybu. Jana pije jablčný džús, Peter pije vodu. Čašník sa pýta: "Chutilo vám?" Jana povie: "Áno, bolo veľmi chutné!"',
      questions: [
        {
          question: 'Was nimmt Jana zum Essen?',
          questionSk: 'Čo si Jana dá na jedenie?',
          options: ['Den Fisch und das Wasser', 'Die Suppe und den Wiener Schnitzel', 'Den Salat und den Kaffee', 'Die Suppe und das Brot'],
          answer: 1,
          explanation: 'Im Text: "Sie nimmt die Suppe und den Wiener Schnitzel."'
        },
        {
          question: 'Was trinkt Peter?',
          questionSk: 'Čo pije Peter?',
          options: ['Einen Kaffee', 'Einen Apfelsaft', 'Ein Wasser', 'Eine Limonade'],
          answer: 2,
          explanation: 'Im Text: "Peter trinkt ein Wasser."'
        },
        {
          question: 'Was fragt der Kellner am Ende?',
          questionSk: 'Čo sa čašník pýta na konci?',
          options: ['Bitte zahlen!', 'Noch etwas?', 'Hat es Ihnen geschmeckt?', 'Guten Appetit!'],
          answer: 2,
          explanation: 'Im Text: "Der Kellner fragt: Hat es Ihnen geschmeckt?"'
        }
      ]
    },
    {
      type: 'speaking',
      instruction: 'Počúvaj nemeckú vetu. Potom hovor nahlas a skontroluj sa.',
      phrases: [
        { de: 'Ich nehme den Wiener Schnitzel.', sk: 'Dám si viedenský rezeň.', tip: 'nehme: e krátke, e tiché' },
        { de: 'Ich möchte einen Apfelsaft, bitte.', sk: 'Chcel/a by som jablčný džús, prosím.', tip: 'Apfelsaft: Apfel+saft' },
        { de: 'Die Rechnung, bitte!', sk: 'Účet, prosím!', tip: 'Rechnung: ch=[x], ung=[uŋ]' },
        { de: 'Hat es Ihnen geschmeckt?', sk: 'Chutilo vám?', tip: 'geschmeckt: g=[g], sch=[š]' },
        { de: 'Ja, es war sehr lecker!', sk: 'Áno, bolo to veľmi chutné!', tip: 'lecker: l=[l], ck=[k]' }
      ]
    }
  ],

  reviewWords: ["L08_V12", "L08_V13"],
  lessonNotes:
    "Kľúčové pravidlo Akkusatívu: len MUŽSKÝ ROD mení člen (der→den, ein→einen, kein→keinen). F a N zostávajú nezmenené. Silné slovesá: essen (du isst, er isst), sehen (du siehst, er sieht) — vokalická zmena e→i alebo e→ie. trinken je silné, ale kmeňová samohláska sa v prítomnom čase nemení. haben + Hunger/Durst = BEZ členu — ustálená väzba. Táto lekcia obsahuje prvý plný dialóg — Jana sa plne zapojí do reálnej reštauračnej konverzácie."
};
