// WEEK 2 — Numbers 21–100, Articles, Countries, Accusative
export const week2Lessons = [
  // ─────────────────────────────────────────────────────────────────────────
  // L06 — Zahlen 21–100 und Preise
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 6,
    week: 2,
    day: 1,
    title: "Zahlen 21–100 und Preise",
    topic: "Čísla 21–100, ceny a pravidelné slovesá",
    cefr: "A1",
    xpReward: 25,
    narrativeContext:
      "Jana kupuje veci do nového bytu vo Viedni v IKEA. Pýta sa na ceny: Wie viel kostet das Regal? Predavačka odpovedá: Achtundsechzig Euro fünfzig.",
    communicativeGoal:
      "Po tejto lekcii viem počítať do 100, povedať ceny v eurách, opýtať sa koľko niečo stojí a časovať pravidelné slovesá.",
    skillFocus: ["vocabulary", "grammar", "listening"],
    grammarNote: {
      rule: "Čísla 21–100 + pravidelné -en slovesá",
      explanation:
        "Nemecké čísla 21–99 sa tvoria JEDNOTKY + UND + DESIATKY — teda opačne ako v slovenčine! einundzwanzig = jeden-a-dvadsať. Pravidelné slovesá (-en) majú jednotnú vzoru: -e / -st / -t / -en / -t / -en.",
      examples: [
        { de: "21 = einundzwanzig (ein + und + zwanzig)", sk: "dvadsaťjeden (POZOR: nemčina dáva jednotky PRED desiatky!)" },
        { de: "32 = zweiunddreißig", sk: "tridsaťdva" },
        { de: "dreißig (30)", sk: "tridsať — POZOR na pravopis: dreißig, nie dreissig!" },
        { de: "ich kaufe / du kaufst / er kauft", sk: "kupujem / kupuješ / kupuje (pravidelná -en vzora)" },
        { de: "du arbeitest / er arbeitet", sk: "pracuješ / pracuje — vkladá sa -e- po kmeňoch na -t/-d" },
      ],
      slovakContrastNote:
        "Slovenčina: dvadsaťjeden (desiatky pred jednotkami). Nemčina: einundzwanzig (jednotky pred desiatkami)! Toto je najčastejšia chyba. Dreißig: slovenčina má tridsať bez ß-ky; v nemčine musí byť dreißig s -ß-.",
    },
    vocab: [
      {
        de: "einundzwanzig",
        sk: "dvadsaťjeden",
        example: "Das kostet einundzwanzig Euro.",
        exampleSk: "To stojí dvadsaťjeden eur.",
        gender: "-",
        srsId: "L06_V01",
        recycledFrom: ["L05_V02", "L05_V21"],
      },
      {
        de: "dreißig ⚠️",
        sk: "tridsať (POZOR: nie dreissig!)",
        example: "Jana ist dreißig Jahre alt — nein, achtundzwanzig!",
        exampleSk: "Jana má tridsať rokov — nie, dvadsaťosem!",
        gender: "-",
        srsId: "L06_V02",
        recycledFrom: [],
      },
      {
        de: "vierzig",
        sk: "štyridsať",
        example: "Das Regal kostet vierzig Euro.",
        exampleSk: "Regál stojí štyridsať eur.",
        gender: "-",
        srsId: "L06_V03",
        recycledFrom: [],
      },
      {
        de: "fünfzig",
        sk: "päťdesiat",
        example: "Das kostet neunundvierzig Euro fünfzig.",
        exampleSk: "To stojí štyridsaťdeväť eur päťdesiat.",
        gender: "-",
        srsId: "L06_V04",
        recycledFrom: [],
      },
      {
        de: "sechzig",
        sk: "šesťdesiat",
        example: "Sechzig Prozent — das ist viel!",
        exampleSk: "Šesťdesiat percent — to je veľa!",
        gender: "-",
        srsId: "L06_V05",
        recycledFrom: [],
      },
      {
        de: "siebzig",
        sk: "sedemdesiat",
        example: "Das Sofa kostet siebzig Euro.",
        exampleSk: "Gauč stojí sedemdesiat eur.",
        gender: "-",
        srsId: "L06_V06",
        recycledFrom: [],
      },
      {
        de: "achtzig",
        sk: "osemdesiat",
        example: "Das kostet achtzig Euro.",
        exampleSk: "To stojí osemdesiat eur.",
        gender: "-",
        srsId: "L06_V07",
        recycledFrom: [],
      },
      {
        de: "neunzig",
        sk: "deväťdesiat",
        example: "Neunzig Euro — das ist zu teuer!",
        exampleSk: "Deväťdesiat eur — to je priveľa!",
        gender: "-",
        srsId: "L06_V08",
        recycledFrom: [],
      },
      {
        de: "hundert",
        sk: "sto",
        example: "Das kostet genau hundert Euro.",
        exampleSk: "To stojí presne sto eur.",
        gender: "-",
        srsId: "L06_V09",
        recycledFrom: [],
      },
      {
        de: "kaufen",
        sk: "kúpiť, kupovať",
        example: "Jana kauft ein Regal für die Wohnung.",
        exampleSk: "Jana kupuje regál pre byt.",
        gender: "-",
        srsId: "L06_V10",
        recycledFrom: [],
      },
      {
        de: "kosten",
        sk: "stáť (cena)",
        example: "Wie viel kostet das? — Das kostet neunzehn Euro.",
        exampleSk: "Koľko to stojí? — To stojí devätnásť eur.",
        gender: "-",
        srsId: "L06_V11",
        recycledFrom: [],
      },
      {
        de: "wohnen",
        sk: "bývať",
        example: "Jana wohnt jetzt in Wien.",
        exampleSk: "Jana teraz býva vo Viedni.",
        gender: "-",
        srsId: "L06_V12",
        recycledFrom: ["L04_V02"],
      },
      {
        de: "lernen",
        sk: "učiť sa",
        example: "Jana lernt Deutsch jeden Tag.",
        exampleSk: "Jana sa učí nemčinu každý deň.",
        gender: "-",
        srsId: "L06_V13",
        recycledFrom: [],
      },
      {
        de: "arbeiten ⚠️",
        sk: "pracovať (POZOR: arbeitest/arbeitet!)",
        example: "Jana arbeitet in Wien. Du arbeitest gut!",
        exampleSk: "Jana pracuje vo Viedni. Pracuješ dobre!",
        gender: "-",
        srsId: "L06_V14",
        recycledFrom: [],
      },
      {
        de: "das Geld",
        sk: "peniaze",
        example: "Hast du genug Geld?",
        exampleSk: "Máš dosť peňazí?",
        gender: "N",
        srsId: "L06_V15",
        recycledFrom: [],
      },
      {
        de: "der Euro",
        sk: "euro",
        example: "Das kostet fünfzig Euro.",
        exampleSk: "To stojí päťdesiat eur.",
        gender: "M",
        srsId: "L06_V16",
        recycledFrom: [],
      },
      {
        de: "der Cent",
        sk: "cent",
        example: "Neun Euro neunzig — neun Cent fehlen noch.",
        exampleSk: "Deväť eur deväťdesiat — ešte chýba deväť centov.",
        gender: "M",
        srsId: "L06_V17",
        recycledFrom: [],
      },
      {
        de: "die Wohnung",
        sk: "byt",
        example: "Jana hat eine kleine Wohnung in Wien.",
        exampleSk: "Jana má malý byt vo Viedni.",
        gender: "F",
        srsId: "L06_V18",
        recycledFrom: [],
      },
      {
        de: "der Supermarkt",
        sk: "supermarket",
        example: "Im Supermarkt kauft Jana Lebensmittel.",
        exampleSk: "V supermarkete Jana kupuje potraviny.",
        gender: "M",
        srsId: "L06_V19",
        recycledFrom: [],
      },
      {
        de: "Wie viel kostet das?",
        sk: "Koľko to stojí?",
        example: "Wie viel kostet das Sofa? — Siebzig Euro.",
        exampleSk: "Koľko stojí gauč? — Sedemdesiat eur.",
        gender: "-",
        srsId: "L06_V20",
        recycledFrom: ["L05_V11"],
      },
    ],
    exercises: [
      {
        type: "flashcard",
        instruction:
          "Nauč sa okrúhle čísla 20–100 a príklady dvojciferných čísel. Pozor na jednotky-PRED-desiatkami!",
        items: [
          "20 → zwanzig",
          "30 → dreißig ⚠️ (nie dreissig!)",
          "40 → vierzig",
          "50 → fünfzig",
          "60 → sechzig",
          "70 → siebzig",
          "80 → achtzig",
          "90 → neunzig",
          "100 → hundert",
          "21 → einundzwanzig (ein + und + zwanzig)",
          "35 → fünfunddreißig",
          "47 → siebenundvierzig",
          "63 → dreiundsechzig",
          "99 → neunundneunzig",
          "kaufen → kúpiť (ich kaufe, du kaufst, er kauft)",
          "arbeiten → pracovať (du arbeitest, er arbeitet — vkladá sa -e-!)",
          "Wie viel kostet das? → Koľko to stojí?",
        ],
      },
      {
        type: "mcq",
        instruction:
          "Vyber správnu odpoveď. Testujeme čísla 21–100, pravopis a konjugáciu slovies.",
        questions: [
          {
            question:
              "Ako sa po nemecky povie číslo 35? (tridsaťpäť)",
            options: [
              "dreißigfünf",
              "fünfdreißig",
              "fünfunddreißig",
              "dreißigfünf",
            ],
            answer: 2,
            explanation:
              "Jednotky IDU PRED desiatkami s und: fünf (5) + und + dreißig (30) = fünfunddreißig. Nie dreißigfünf!",
          },
          {
            question: "Ako sa správne píše číslo 30 po nemecky?",
            options: ["dreissig", "dreißig", "dreizig", "dreizigh"],
            answer: 1,
            explanation:
              "dreißig — s ß! Je to nepravidelný pravopis, treba si zapamätať. dreissig je NESPRÁVNE.",
          },
          {
            question:
              "Jana pýta na cenu. Čo povie? Das Regal ___  sechzig Euro.",
            options: ["ist", "hat", "kostet", "kauft"],
            answer: 2,
            explanation:
              "kosten = stáť (cena). Das Regal kostet sechzig Euro. Nie ist (to by bol popis, nie cena).",
          },
          {
            question:
              "Aký je správny tvar slovesa arbeiten pre du? Du ___ sehr gut!",
            options: ["arbeitest", "arbeitest", "arbeitet", "arbeitst"],
            answer: 0,
            explanation:
              "Kmeň arbeiten končí na -t, preto sa pri du vkladá -e-: du arbeit-e-st. Nie arbeitst (ťažko vysloviteľné).",
          },
          {
            question:
              "Ako povie pokladníčka cenu 68,50 € po nemecky?",
            options: [
              "Achtundsechzig Euro fünfzig.",
              "Sechzigacht Euro fünfzig.",
              "Achtundsechzig Euro fünfzehn.",
              "Dreiundsechzig Euro fünfzig.",
            ],
            answer: 0,
            explanation:
              "68 = achtundsechzig (8+und+60). 50 centov = fünfzig. Achtundsechzig Euro fünfzig.",
          },
          {
            question:
              "Jana sa pýta v obchode na cenu stola. Čo povie?",
            options: [
              "Was ist der Tisch?",
              "Wie viel kostet der Tisch?",
              "Wo kauft der Tisch?",
              "Wann kostet der Tisch?",
            ],
            answer: 1,
            explanation:
              "Wie viel kostet das/der...? = Koľko stojí...? Je to štandardná otázka na cenu.",
          },
        ],
      },
      {
        type: "fill",
        instruction:
          "Napíš číslo slovom alebo doplň správny tvar slovesa. Jana nakupuje.",
        questions: [
          {
            sentence: "Das Sofa kostet ___ Euro. (70 eur)",
            answer: "siebzig",
            hint: "Okrúhle číslo 70",
            explanation: "siebzig = 70.",
          },
          {
            sentence: "Das Regal kostet achtund___ Euro. (48 eur — osem a štyridsať)",
            answer: "vierzig",
            hint: "acht + und + ___",
            explanation: "achtundvierzig = 48. Vierzig = 40.",
          },
          {
            sentence: "Jana ___ jeden Tag Deutsch. (učí sa)",
            answer: "lernt",
            hint: "lernen, 3. os. jednotného čísla (Jana = er/sie/es)",
            explanation: "Jana → er/sie/es → lernt. Pravidelná -en vzora: kmeň + -t.",
          },
          {
            sentence: "Du ___ in einem Büro. (pracuješ — arbeiten!)",
            answer: "arbeitest",
            hint: "arbeiten, du forma s vloženým -e-",
            explanation:
              "du arbeitest — kmeň arbeit- + -e- + -st. Vkladáme -e- po kmeňoch na -t.",
          },
          {
            sentence: "Das Bett kostet neun___ Euro fünfzig. (deväťdesiat)",
            answer: "zig",
            hint: "neun + zig = deväťdesiat",
            explanation: "neunzig = 90. Das Bett kostet neunzig Euro fünfzig.",
          },
        ],
      },
      {
        type: "listen",
        instruction:
          "Počúvaj cenu. Napíš ju číslicami (napr. 35,50). Jana je v IKEA.",
        questions: [
          { de: "neunzehn Euro neunzig", sk: "19,90 €" },
          { de: "achtunddreißig Euro", sk: "38,00 €" },
          { de: "siebenundsiebzig Euro fünfzig", sk: "77,50 €" },
          { de: "hundert Euro", sk: "100,00 €" },
          { de: "zweiundfünfzig Euro zwanzig", sk: "52,20 €" },
          { de: "neunundneunzig Euro neunundneunzig", sk: "99,99 €" },
        ],
      },
      {
        type: "match",
        instruction: "Spoj cifru so správnym nemeckým slovom.",
        pairs: [
          ["30", "dreißig"],
          ["40", "vierzig"],
          ["50", "fünfzig"],
          ["60", "sechzig"],
          ["70", "siebzig"],
          ["80", "achtzig"],
          ["90", "neunzig"],
          ["100", "hundert"],
          ["21", "einundzwanzig"],
          ["99", "neunundneunzig"],
        ],
      },
    ],
    reviewWords: ["L05_V01", "L05_V21", "L04_V02", "L03_V01"],
    lessonNotes:
      "Jednotky pred desiatkami je najväčší problém. Dreißig s -ß- treba zdôrazniť. arbeiten s vloženým -e- je fonetické pravidlo, nie výnimka.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // L07 — Artikel der/die/das — Nominativ
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 7,
    week: 2,
    day: 2,
    title: "Artikel der/die/das — Nominativ",
    topic: "Určitý člen der/die/das a rod podstatných mien",
    cefr: "A1",
    xpReward: 30,
    narrativeContext:
      "Jana sa nasťahovala do nového bytu v Mariahilf, Viedeň. Pozerá sa okolo seba a pomenúva veci: Der Tisch ist klein. Das Bett ist neu. Die Küche ist groß.",
    communicativeGoal:
      "Po tejto lekcii poznám rody der/die/das a viem pomenovať 15 každodenných predmetov so správnym rodom.",
    skillFocus: ["vocabulary", "grammar"],
    grammarNote: {
      rule: "Gramatický rod — der (M) / die (F) / das (N) — VŽDY sa uč s rodom!",
      explanation:
        "Nemecké podstatné mená majú tri rody: mužský (der), ženský (die), stredný (das). Rod určitého člena MUSÍ byť súčasťou každého nového slova. Zlaté pravidlo: nikdy sa neuč samotné slovo — vždy s členom! Niektoré prípony napovedajú rod.",
      examples: [
        { de: "-ung → die: die Wohnung, die Zeitung", sk: "Prípona -ung → vždy die (ženský rod)" },
        { de: "-chen → das: das Mädchen, das Häuschen", sk: "Prípona -chen → vždy das (stredný rod)" },
        { de: "-er (osoba/nástroj) → der: der Lehrer, der Computer", sk: "Prípona -er (agens) → väčšinou der" },
        { de: "Infinitívy ako podstatné mená → das: das Lernen, das Essen", sk: "Infinitív ako podstatné meno → vždy das" },
      ],
      slovakContrastNote:
        "Slovenčina má tiež tri rody (stôl=M, lampa=F, okno=N), ale nemecké rody sa nekryjú so slovenskými! Napr. das Mädchen (deva = stredný rod v nemčine!) — to je nemožné v slovenčine. Preto: VŽDY si ulož slovo s rodom, nikdy len samotné.",
    },
    vocab: [
      {
        de: "der Tisch",
        sk: "stôl",
        example: "Der Tisch ist zu klein für das Zimmer.",
        exampleSk: "Stôl je príliš malý pre izbu.",
        gender: "M",
        srsId: "L07_V01",
        recycledFrom: [],
      },
      {
        de: "der Stuhl",
        sk: "stolička",
        example: "Der Stuhl ist bequem.",
        exampleSk: "Stolička je pohodlná.",
        gender: "M",
        srsId: "L07_V02",
        recycledFrom: [],
      },
      {
        de: "der Schrank",
        sk: "skriňa",
        example: "Der Schrank ist groß.",
        exampleSk: "Skriňa je veľká.",
        gender: "M",
        srsId: "L07_V03",
        recycledFrom: [],
      },
      {
        de: "das Bett",
        sk: "posteľ",
        example: "Das Bett ist neu und sehr bequem.",
        exampleSk: "Posteľ je nová a veľmi pohodlná.",
        gender: "N",
        srsId: "L07_V04",
        recycledFrom: [],
      },
      {
        de: "das Fenster",
        sk: "okno",
        example: "Das Fenster ist offen — es ist warm.",
        exampleSk: "Okno je otvorené — je teplo.",
        gender: "N",
        srsId: "L07_V05",
        recycledFrom: [],
      },
      {
        de: "das Buch",
        sk: "kniha",
        example: "Das Buch ist sehr interessant.",
        exampleSk: "Kniha je veľmi zaujímavá.",
        gender: "N",
        srsId: "L07_V06",
        recycledFrom: [],
      },
      {
        de: "die Tür",
        sk: "dvere",
        example: "Die Tür ist zu — bitte klopfen!",
        exampleSk: "Dvere sú zatvorené — prosím zaklopte!",
        gender: "F",
        srsId: "L07_V07",
        recycledFrom: [],
      },
      {
        de: "die Lampe",
        sk: "lampa",
        example: "Die Lampe ist sehr schön.",
        exampleSk: "Lampa je veľmi pekná.",
        gender: "F",
        srsId: "L07_V08",
        recycledFrom: [],
      },
      {
        de: "die Küche",
        sk: "kuchyňa",
        example: "Die Küche ist modern und groß.",
        exampleSk: "Kuchyňa je moderná a veľká.",
        gender: "F",
        srsId: "L07_V09",
        recycledFrom: [],
      },
      {
        de: "die Wand",
        sk: "stena",
        example: "Die Wand ist weiß.",
        exampleSk: "Stena je biela.",
        gender: "F",
        srsId: "L07_V10",
        recycledFrom: [],
      },
      {
        de: "der Boden",
        sk: "podlaha",
        example: "Der Boden ist aus Holz.",
        exampleSk: "Podlaha je drevená.",
        gender: "M",
        srsId: "L07_V11",
        recycledFrom: [],
      },
      {
        de: "die Couch",
        sk: "gauč",
        example: "Die Couch ist sehr bequem.",
        exampleSk: "Gauč je veľmi pohodlný.",
        gender: "F",
        srsId: "L07_V12",
        recycledFrom: [],
      },
      {
        de: "das Regal",
        sk: "regál, polica",
        example: "Das Regal ist voll mit Büchern.",
        exampleSk: "Regál je plný kníh.",
        gender: "N",
        srsId: "L07_V13",
        recycledFrom: ["L06_V20"],
      },
      {
        de: "der Schlüssel",
        sk: "kľúč",
        example: "Wo ist der Schlüssel? — Auf dem Tisch!",
        exampleSk: "Kde je kľúč? — Na stole!",
        gender: "M",
        srsId: "L07_V14",
        recycledFrom: [],
      },
      {
        de: "das Zimmer",
        sk: "izba",
        example: "Das Zimmer ist hell und groß.",
        exampleSk: "Izba je svetlá a veľká.",
        gender: "N",
        srsId: "L07_V15",
        recycledFrom: ["L01_V10"],
      },
    ],
    exercises: [
      {
        type: "flashcard",
        instruction:
          "Nauč sa každé slovo S RODOM. Karty zobrazujú predmet — otočením uvidíš der/die/das + preklad. Farba pomáha: der=modrá, die=červená, das=zelená.",
        items: [
          "der Tisch — stôl (M)",
          "der Stuhl — stolička (M)",
          "der Schrank — skriňa (M)",
          "der Boden — podlaha (M)",
          "der Schlüssel — kľúč (M)",
          "das Bett — posteľ (N)",
          "das Fenster — okno (N)",
          "das Buch — kniha (N)",
          "das Regal — regál (N)",
          "das Zimmer — izba (N)",
          "die Tür — dvere (F)",
          "die Lampe — lampa (F)",
          "die Küche — kuchyňa (F)",
          "die Wand — stena (F)",
          "die Couch — gauč (F)",
          "Zlaté pravidlo: VŽDY sa uč: der Tisch, nie len Tisch!",
        ],
      },
      {
        type: "mcq",
        instruction:
          "Vyber správny člen pre každé podstatné meno. Použi aj prípony ako nápovedu!",
        questions: [
          {
            question: "Aký člen má slovo Tisch (stôl)?",
            options: ["der", "die", "das"],
            answer: 0,
            explanation:
              "der Tisch — mužský rod. Nemá signálnu príponu, treba si zapamätať.",
          },
          {
            question: "Aký člen má slovo Küche (kuchyňa)?",
            options: ["der", "die", "das"],
            answer: 1,
            explanation:
              "die Küche — ženský rod. Prípaona -e po mäkkej spoluhláske — väčšinou die.",
          },
          {
            question: "Aký člen má slovo Fenster (okno)?",
            options: ["der", "die", "das"],
            answer: 2,
            explanation:
              "das Fenster — stredný rod. Slová na -er môžu byť rôznych rodov; Fenster je das.",
          },
          {
            question:
              "Máš novú spolubývajúcu a vysvetľuješ jej byt. Der Boden ist ___.",
            options: ["groß", "schön", "jung", "nett"],
            answer: 0,
            explanation:
              "Der Boden ist groß. — stôl, podlaha môže byť groß (veľká). Všetky možnosti sú gramaticky správne — ale groß je naj-typická vlastnosť podlahy.",
          },
          {
            question:
              "Prípona -ung signalizuje aký rod?",
            options: ["mužský (der)", "ženský (die)", "stredný (das)", "záleží na slove"],
            answer: 1,
            explanation:
              "Prípona -ung → VŽDY die: die Wohnung, die Zeitung, die Lösung. Toto pravidlo je spoľahlivé!",
          },
          {
            question:
              "Jana hovorí: ___ Schlüssel ist auf dem Tisch. Aký člen?",
            options: ["Der", "Die", "Das", "Ein"],
            answer: 0,
            explanation:
              "Der Schlüssel — mužský rod. Kľúč je na stole — je to konkrétny kľúč (určitý člen).",
          },
        ],
      },
      {
        type: "fill",
        instruction:
          "Doplň správny určitý člen (der/die/das). Jana opisuje svoj nový byt.",
        questions: [
          {
            sentence: "___ Bett ist sehr bequem.",
            answer: "Das",
            hint: "Posteľ — das Bett",
            explanation: "Das Bett — stredný rod.",
          },
          {
            sentence: "___ Küche ist klein, aber modern.",
            answer: "Die",
            hint: "Kuchyňa — die Küche",
            explanation: "Die Küche — ženský rod.",
          },
          {
            sentence: "___ Schlüssel ist weg! (kľúč zmizol)",
            answer: "Der",
            hint: "Kľúč — der Schlüssel",
            explanation: "Der Schlüssel — mužský rod.",
          },
          {
            sentence: "___ Fenster ist offen.",
            answer: "Das",
            hint: "Okno — das Fenster",
            explanation: "Das Fenster — stredný rod.",
          },
        ],
      },
      {
        type: "listen",
        instruction:
          "Počúvaj podstatné meno bez člena. Vyber správny člen: der / die / das.",
        questions: [
          { de: "Tisch", sk: "der — mužský" },
          { de: "Lampe", sk: "die — ženský" },
          { de: "Buch", sk: "das — stredný" },
          { de: "Tür", sk: "die — ženský" },
          { de: "Schlüssel", sk: "der — mužský" },
          { de: "Regal", sk: "das — stredný" },
          { de: "Couch", sk: "die — ženský" },
          { de: "Boden", sk: "der — mužský" },
        ],
      },
      {
        type: "match",
        instruction: "Spoj podstatné meno so správnym členom.",
        pairs: [
          ["Tisch", "der"],
          ["Küche", "die"],
          ["Bett", "das"],
          ["Wand", "die"],
          ["Fenster", "das"],
          ["Stuhl", "der"],
          ["Lampe", "die"],
          ["Regal", "das"],
          ["Schlüssel", "der"],
          ["Tür", "die"],
        ],
      },
    ],
    reviewWords: ["L01_V10", "L03_V14", "L03_V15", "L06_V18"],
    lessonNotes:
      "Rod podstatných mien je kľúčový základ. Zlaté pravidlo VŽDY s členom treba zopakovať v každej nasledujúcej lekcii. Farebné kódovanie (der=modrá, die=červená, das=zelená) výrazne pomáha pri učení.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // L08 — Ein/eine/ein — Unbestimmter Artikel
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 8,
    week: 2,
    day: 3,
    title: "Ein/eine/ein — Unbestimmter Artikel",
    topic: "Neurčitý člen ein/eine a pravidlo prvej/druhej zmienky",
    cefr: "A1",
    xpReward: 25,
    narrativeContext:
      "Jana ide po prvý raz do tradičnej viedenskej kaviarne — Café Central. Všetko je nové. Číta jedálny lístok a pýta sa čašníka na neznáme veci.",
    communicativeGoal:
      "Po tejto lekcii viem správne používať ein/eine pri prvej zmienke a der/die/das pri druhej zmienke v bežných vetách.",
    skillFocus: ["grammar", "vocabulary", "speaking"],
    grammarNote: {
      rule: "Neurčitý člen: ein (M/N) / eine (F) — použiť pri PRVEJ zmienke",
      explanation:
        "ein/eine = neurčitý člen. Používa sa, keď predstavujeme niečo prvýkrát, čo je neznáme alebo neurčité. Po druhýkrát to isté slovo dostane určitý člen der/die/das (lebo už vieme, o čom hovoríme).",
      examples: [
        { de: "Das ist eine Katze. — Die Katze ist schwarz.", sk: "To je mačka (prvá zmienka). — Mačka je čierna (druhá zmienka)." },
        { de: "Ich sehe einen Mann. — Der Mann ist jung.", sk: "Vidím muža (prvá zmienka). — Muž je mladý (druhá zmienka)." },
        { de: "Das ist ein Kaffee. — Der Kaffee ist heiß.", sk: "To je káva. — Káva je horúca." },
      ],
      slovakContrastNote:
        "Slovenčina nemá ŽIADNE členy. To je náročné — celý systém je nový. Najbližšia paralela: slovenské ten/tá/to (určitý) namiesto der/die/das; a slovenské jedno/jedna (neurčité) namiesto ein/eine. Ale v slovenčine sa to nepovinné — v nemčine je to povinné!",
    },
    vocab: [
      {
        de: "das Café",
        sk: "kaviareň",
        example: "Jana geht in ein Café.",
        exampleSk: "Jana ide do kaviarne.",
        gender: "N",
        srsId: "L08_V01",
        recycledFrom: [],
      },
      {
        de: "der Kaffee",
        sk: "káva",
        example: "Das ist ein Kaffee. Der Kaffee ist sehr gut.",
        exampleSk: "To je káva. Káva je veľmi dobrá.",
        gender: "M",
        srsId: "L08_V02",
        recycledFrom: [],
      },
      {
        de: "der Tee",
        sk: "čaj",
        example: "Ich trinke einen Tee, bitte.",
        exampleSk: "Dám si čaj, prosím.",
        gender: "M",
        srsId: "L08_V03",
        recycledFrom: [],
      },
      {
        de: "das Wasser",
        sk: "voda",
        example: "Ein Wasser, bitte! — Das Wasser ist kalt.",
        exampleSk: "Vodu, prosím! — Voda je studená.",
        gender: "N",
        srsId: "L08_V04",
        recycledFrom: [],
      },
      {
        de: "der Kuchen",
        sk: "koláč",
        example: "Der Kuchen sieht lecker aus!",
        exampleSk: "Koláč vyzerá lahodne!",
        gender: "M",
        srsId: "L08_V05",
        recycledFrom: [],
      },
      {
        de: "die Torte",
        sk: "torta",
        example: "Die Sachertorte ist eine typische Wiener Torte.",
        exampleSk: "Sachertorte je typická viedenská torta.",
        gender: "F",
        srsId: "L08_V06",
        recycledFrom: [],
      },
      {
        de: "das Brot",
        sk: "chlieb",
        example: "Ein Brot, bitte. — Das Brot ist frisch.",
        exampleSk: "Chlieb, prosím. — Chlieb je čerstvý.",
        gender: "N",
        srsId: "L08_V07",
        recycledFrom: [],
      },
      {
        de: "die Butter",
        sk: "maslo",
        example: "Das Brot ist mit Butter.",
        exampleSk: "Chlieb je s maslom.",
        gender: "F",
        srsId: "L08_V08",
        recycledFrom: [],
      },
      {
        de: "das Ei",
        sk: "vajce",
        example: "Ein Ei, bitte. Ich esse das Ei zum Frühstück.",
        exampleSk: "Jedno vajce, prosím. Zjem vajce na raňajky.",
        gender: "N",
        srsId: "L08_V09",
        recycledFrom: [],
      },
      {
        de: "die Speisekarte",
        sk: "jedálny lístok",
        example: "Die Speisekarte, bitte!",
        exampleSk: "Jedálny lístok, prosím!",
        gender: "F",
        srsId: "L08_V10",
        recycledFrom: [],
      },
      {
        de: "der Kellner / die Kellnerin",
        sk: "čašník / čašníčka",
        example: "Der Kellner ist sehr freundlich.",
        exampleSk: "Čašník je veľmi priateľský.",
        gender: "M",
        srsId: "L08_V11",
        recycledFrom: [],
      },
      {
        de: "bestellen",
        sk: "objednať si",
        example: "Was möchten Sie bestellen?",
        exampleSk: "Čo si želáte objednať?",
        gender: "-",
        srsId: "L08_V12",
        recycledFrom: [],
      },
      {
        de: "nehmen",
        sk: "vziať si, dať si (pri objednávke)",
        example: "Ich nehme einen Kaffee und einen Kuchen.",
        exampleSk: "Dám si kávu a koláč.",
        gender: "-",
        srsId: "L08_V13",
        recycledFrom: [],
      },
      {
        de: "lecker",
        sk: "chutný, lahodný",
        example: "Der Kuchen ist sehr lecker!",
        exampleSk: "Koláč je veľmi chutný!",
        gender: "-",
        srsId: "L08_V14",
        recycledFrom: [],
      },
    ],
    exercises: [
      {
        type: "flashcard",
        instruction:
          "Nauč sa nové slová z kaviarne so správnym rodom. Potom si precvič pravidlo: ein/eine (prvá zmienka) vs. der/die/das (druhá zmienka).",
        items: [
          "das Café — kaviareň (N) → ein Café",
          "der Kaffee — káva (M) → ein Kaffee",
          "der Tee — čaj (M) → ein Tee",
          "das Wasser — voda (N) → ein Wasser",
          "der Kuchen — koláč (M) → ein Kuchen",
          "die Torte — torta (F) → eine Torte",
          "das Brot — chlieb (N) → ein Brot",
          "die Butter — maslo (F) → eine Butter",
          "das Ei — vajce (N) → ein Ei",
          "die Speisekarte — jedálny lístok (F) → eine Speisekarte",
          "PRAVIDLO: 1. zmienka = ein/eine | 2. zmienka = der/die/das",
          "Das ist eine Katze. — Die Katze ist schwarz.",
          "ein (M, N) / eine (F) — rozlíšenie iba u ženského rodu!",
        ],
      },
      {
        type: "mcq",
        instruction:
          "Vyber správny člen — ein/eine alebo der/die/das — podľa kontextu.",
        questions: [
          {
            question:
              "Jana vidí koláč po prvý raz. Čo povie? Das ist ___ Kuchen.",
            options: ["der", "die", "ein", "eine"],
            answer: 2,
            explanation:
              "Prvá zmienka = neurčitý člen. Kuchen je mužský rod (M) → ein Kuchen.",
          },
          {
            question:
              "Jana opisuje ten istý koláč: ___ Kuchen ist sehr lecker!",
            options: ["Ein", "Eine", "Der", "Das"],
            answer: 2,
            explanation:
              "Druhá zmienka (vieme, o akom koláči hovoríme) = určitý člen. Kuchen = M → Der Kuchen.",
          },
          {
            question:
              "Jana prvýkrát opisuje tortu: Das ist ___ Sachertorte.",
            options: ["der", "die", "ein", "eine"],
            answer: 3,
            explanation:
              "Prvá zmienka = neurčitý člen. Torte je ženský rod (F) → eine Sachertorte.",
          },
          {
            question:
              "Jana sa predstavuje ako čašníčka. Ich bin ___. (Bez člena alebo s členom?)",
            options: [
              "eine Kellnerin",
              "Kellnerin",
              "die Kellnerin",
              "der Kellnerin",
            ],
            answer: 1,
            explanation:
              "Povolanie po sein = BEZ člena! Ich bin Kellnerin. Toto pravidlo sme sa naučili v L03.",
          },
          {
            question:
              "Vo vete Das ist ___ Kaffee — aký člen patrí? (prvá zmienka)",
            options: ["der", "die", "ein", "eine"],
            answer: 2,
            explanation:
              "Prvá zmienka + Kaffee je mužský rod (M) → ein Kaffee.",
          },
          {
            question:
              "Jana si objednáva: Ich nehme ___ Wasser. Wasser je stredný rod, prvá zmienka.",
            options: ["das", "die", "ein", "eine"],
            answer: 2,
            explanation:
              "Prvá zmienka + Wasser je stredný rod (N) → ein Wasser. (Všimni si: akkuzatív das→das, ein→ein pre stredný rod — neutrum sa v akkuzatíve nemení, lekcii 10.)",
          },
        ],
      },
      {
        type: "fill",
        instruction:
          "Doplň správny člen (ein/eine alebo der/die/das). Jana v kaviarni.",
        questions: [
          {
            sentence:
              "Das ist ___ Torte. ___ Torte heißt Sachertorte. (prvá a druhá zmienka)",
            answer: "eine / Die",
            hint: "Torte = F: pri prvej zmienke eine, pri druhej Die",
            explanation:
              "Prvá zmienka F → eine; druhá zmienka F → Die. Das ist eine Torte. Die Torte heißt Sachertorte.",
          },
          {
            sentence: "Jana sieht ___ Kellner. ___ Kellner ist jung.",
            answer: "einen / Der",
            hint:
              "Kellner = M: prvá zmienka → einen (akkuzatív!), druhá → Der. Akkuzatív M=einen naučíme v L10.",
            explanation:
              "Prvá zmienka M → einen (akkuzatív, naučíme v L10). Druhá zmienka M nominatív → Der Kellner.",
          },
          {
            sentence: "___ Speisekarte, bitte! (Pozri na jedálny lístok.)",
            answer: "Die",
            hint: "Speisekarte = F, určitá vec (konkrétny jedálny lístok v tomto reštaurante)",
            explanation:
              "Die Speisekarte — ženský rod, konkrétny jedálny lístok → určitý člen.",
          },
          {
            sentence: "Das ist ___ Ei. ___ Ei ist frisch.",
            answer: "ein / Das",
            hint: "Ei = N: prvá zmienka → ein, druhá → Das",
            explanation:
              "Prvá zmienka N → ein; druhá zmienka N → Das.",
          },
        ],
      },
      {
        type: "listen",
        instruction:
          "Počúvaj vetu. Urči, či ide o PRVÚ zmienku (ein/eine) alebo DRUHÚ zmienku (der/die/das).",
        questions: [
          {
            de: "Das ist ein Kaffee.",
            sk: "Prvá zmienka — neurčitá (ein)",
          },
          {
            de: "Der Kaffee ist heiß.",
            sk: "Druhá zmienka — konkrétna káva (der)",
          },
          {
            de: "Ich sehe eine Torte.",
            sk: "Prvá zmienka — neurčitá torta (eine)",
          },
          {
            de: "Die Torte sieht lecker aus.",
            sk: "Druhá zmienka — konkrétna torta (die)",
          },
          {
            de: "Das ist ein Kellner.",
            sk: "Prvá zmienka — neurčitý čašník (ein)",
          },
          {
            de: "Der Kellner kommt.",
            sk: "Druhá zmienka — konkrétny čašník (der)",
          },
        ],
      },
      {
        type: "match",
        instruction:
          "Spoj podstatné meno s jeho neurčitým členom (ein alebo eine).",
        pairs: [
          ["Kaffee (M)", "ein Kaffee"],
          ["Torte (F)", "eine Torte"],
          ["Wasser (N)", "ein Wasser"],
          ["Tür (F)", "eine Tür"],
          ["Tisch (M)", "ein Tisch"],
          ["Ei (N)", "ein Ei"],
          ["Küche (F)", "eine Küche"],
          ["Stuhl (M)", "ein Stuhl"],
        ],
      },
    ],
    reviewWords: ["L07_V01", "L07_V07", "L07_V09", "L03_V08"],
    lessonNotes:
      "Absencia členov v slovenčine je hlavná výzva. Pravidlo prvá/druhá zmienka je komunikatívne najužitočnejší rámec. Neutralizácia ein pre M a N bude objasnejšia v L10 (akkuzatív).",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // L09 — Woher kommst du? — Länder und Sprachen
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 9,
    week: 2,
    day: 4,
    title: "Woher kommst du? — Länder und Sprachen",
    topic: "Krajiny, jazyky a negácia nicht",
    cefr: "A1",
    xpReward: 25,
    narrativeContext:
      "Prvý pracovný deň. Jana spoznáva kolegov z celej Európy: Marco z Talianska, Stefan z Rakúska, Yuki z Japonska. Všetci sa pýtajú: Woher kommst du?",
    communicativeGoal:
      "Po tejto lekcii viem povedať odkiaľ pochádzam, kde bývam, aké jazyky hovorím — a to isté sa opýtať iných.",
    skillFocus: ["vocabulary", "grammar", "speaking"],
    grammarNote: {
      rule: "Krajiny: väčšina BEZ člena, štyri krajiny S členom die",
      explanation:
        "Väčšina krajín sa používa BEZ člena: Ich komme aus Deutschland. Ale štyri krajiny majú člen die a po predložke aus vyžadujú dativ: die Slowakei → aus der Slowakei. Tieto štyri treba naučiť naspamäť.",
      examples: [
        { de: "Ich komme aus Deutschland.", sk: "Pochádzam z Nemecka. (bez člena)" },
        { de: "Ich komme aus der Slowakei.", sk: "Pochádzam zo Slovenska. (aus + der = dativ ž. rodu)" },
        { de: "Ich komme aus der Schweiz.", sk: "Pochádzam zo Švajčiarska." },
        { de: "Ich komme aus den USA.", sk: "Pochádzam z USA. (die USA je plurál → den)" },
        { de: "sprechen: du sprichst, er/sie spricht", sk: "hovoriť: ty hovoríš, on/ona hovorí (e→i striedanie!)" },
      ],
      slovakContrastNote:
        "Slovenčina: som zo Slovenska, z Nemecka — predložka z + genitív. Nemčina: aus + (žiadny člen pre väčšinu) alebo aus + dativ pre krajiny so členom. Krajiny s členom: die Slowakei, die Schweiz, die Türkei, die USA — pamätaj ako ZOZNAM!",
    },
    vocab: [
      {
        de: "Deutschland",
        sk: "Nemecko",
        example: "Ich komme aus Deutschland.",
        exampleSk: "Pochádzam z Nemecka.",
        gender: "-",
        srsId: "L09_V01",
        recycledFrom: [],
      },
      {
        de: "Österreich",
        sk: "Rakúsko",
        example: "Stefan kommt aus Österreich.",
        exampleSk: "Stefan pochádza z Rakúska.",
        gender: "-",
        srsId: "L09_V02",
        recycledFrom: ["L01_V08"],
      },
      {
        de: "die Slowakei ⚠️",
        sk: "Slovensko (má člen die!)",
        example: "Jana kommt aus der Slowakei.",
        exampleSk: "Jana pochádza zo Slovenska.",
        gender: "F",
        srsId: "L09_V03",
        recycledFrom: [],
      },
      {
        de: "die Schweiz ⚠️",
        sk: "Švajčiarsko (má člen die!)",
        example: "Ich komme aus der Schweiz.",
        exampleSk: "Pochádzam zo Švajčiarska.",
        gender: "F",
        srsId: "L09_V04",
        recycledFrom: [],
      },
      {
        de: "die Türkei ⚠️",
        sk: "Turecko (má člen die!)",
        example: "Meine Kollegin kommt aus der Türkei.",
        exampleSk: "Moja kolegyňa pochádza z Turecka.",
        gender: "F",
        srsId: "L09_V05",
        recycledFrom: [],
      },
      {
        de: "Tschechien",
        sk: "Česko",
        example: "Unsere Nachbarn kommen aus Tschechien.",
        exampleSk: "Naši susedia pochádzajú z Česka.",
        gender: "-",
        srsId: "L09_V06",
        recycledFrom: [],
      },
      {
        de: "Polen",
        sk: "Poľsko",
        example: "Monika kommt aus Polen.",
        exampleSk: "Monika pochádza z Poľska.",
        gender: "-",
        srsId: "L09_V07",
        recycledFrom: [],
      },
      {
        de: "England",
        sk: "Anglicko",
        example: "Tom kommt aus England.",
        exampleSk: "Tom pochádza z Anglicka.",
        gender: "-",
        srsId: "L09_V08",
        recycledFrom: [],
      },
      {
        de: "die USA ⚠️",
        sk: "Spojené štáty americké (plurál, má člen die!)",
        example: "James kommt aus den USA.",
        exampleSk: "James pochádza zo Spojených štátov.",
        gender: "F",
        srsId: "L09_V09",
        recycledFrom: [],
      },
      {
        de: "Deutsch",
        sk: "nemčina (vždy veľké písmeno!)",
        example: "Jana lernt Deutsch.",
        exampleSk: "Jana sa učí nemčinu.",
        gender: "-",
        srsId: "L09_V10",
        recycledFrom: ["L01_V11"],
      },
      {
        de: "Slowakisch",
        sk: "slovenčina (vždy veľké písmeno!)",
        example: "Jana spricht Slowakisch und ein bisschen Deutsch.",
        exampleSk: "Jana hovorí po slovensky a trochu po nemecky.",
        gender: "-",
        srsId: "L09_V11",
        recycledFrom: [],
      },
      {
        de: "Englisch",
        sk: "angličtina (vždy veľké písmeno!)",
        example: "Sprichst du Englisch?",
        exampleSk: "Hovoríš po anglicky?",
        gender: "-",
        srsId: "L09_V12",
        recycledFrom: [],
      },
      {
        de: "Tschechisch",
        sk: "čeština (vždy veľké písmeno!)",
        example: "Mein Kollege spricht Tschechisch.",
        exampleSk: "Môj kolega hovorí po česky.",
        gender: "-",
        srsId: "L09_V13",
        recycledFrom: [],
      },
      {
        de: "sprechen ⚠️",
        sk: "hovoriť (POZOR: du sprichst, er spricht!)",
        example: "Ich spreche Slowakisch. Du sprichst Deutsch.",
        exampleSk: "Hovorím po slovensky. Hovoríš po nemecky.",
        gender: "-",
        srsId: "L09_V14",
        recycledFrom: ["L01_V11"],
      },
      {
        de: "die Sprache",
        sk: "jazyk",
        example: "Welche Sprachen sprichst du?",
        exampleSk: "Aké jazyky hovoríš?",
        gender: "F",
        srsId: "L09_V15",
        recycledFrom: [],
      },
      {
        de: "das Land",
        sk: "krajina",
        example: "Aus welchem Land kommen Sie?",
        exampleSk: "Z akej krajiny pochádzate?",
        gender: "N",
        srsId: "L09_V16",
        recycledFrom: [],
      },
      {
        de: "nicht",
        sk: "nie, no- (negácia slovies a prídavných mien)",
        example: "Ich spreche nicht Russisch. Das ist nicht richtig.",
        exampleSk: "Nehovorím po rusky. To nie je správne.",
        gender: "-",
        srsId: "L09_V17",
        recycledFrom: [],
      },
      {
        de: "richtig",
        sk: "správne, pravdivé",
        example: "Das ist richtig! / Das ist nicht richtig.",
        exampleSk: "To je správne! / To nie je správne.",
        gender: "-",
        srsId: "L09_V18",
        recycledFrom: ["L01_V16"],
      },
    ],
    exercises: [
      {
        type: "flashcard",
        instruction:
          "Nauč sa krajiny. Pozor na štyri krajiny, ktoré majú člen die — po aus nasleduje der (dativ)!",
        items: [
          "Deutschland → aus Deutschland (bez člena)",
          "Österreich → aus Österreich (bez člena)",
          "die Slowakei ⚠️ → aus der Slowakei",
          "die Schweiz ⚠️ → aus der Schweiz",
          "die Türkei ⚠️ → aus der Türkei",
          "die USA ⚠️ → aus den USA",
          "Tschechien → aus Tschechien (bez člena)",
          "Polen → aus Polen (bez člena)",
          "England → aus England (bez člena)",
          "Deutsch — nemčina (VEĽKÉ písmeno!)",
          "Slowakisch — slovenčina (VEĽKÉ písmeno!)",
          "Englisch — angličtina (VEĽKÉ písmeno!)",
          "sprechen: ich spreche / du sprichst / er spricht",
          "nicht → negácia: Ich spreche nicht Russisch.",
        ],
      },
      {
        type: "mcq",
        instruction:
          "Vyber správnu formu. Krajiny s článkom, sprechen a nicht.",
        questions: [
          {
            question: "Jana pochádza zo Slovenska. Ako to povie po nemecky?",
            options: [
              "Ich komme aus Slowakei.",
              "Ich komme aus die Slowakei.",
              "Ich komme aus der Slowakei.",
              "Ich komme aus dem Slowakei.",
            ],
            answer: 2,
            explanation:
              "Slowakei má člen die. Po aus nasleduje dativ: die → der. Ich komme aus der Slowakei.",
          },
          {
            question:
              "Stefan pochádza z Rakúska. Ako to povie? Österreich ___ člen.",
            options: [
              "Ich komme aus des Österreich.",
              "Ich komme aus Österreich.",
              "Ich komme aus der Österreich.",
              "Ich komme aus dem Österreich.",
            ],
            answer: 1,
            explanation:
              "Österreich nemá člen — píše sa bez člena: Ich komme aus Österreich.",
          },
          {
            question:
              "Ako sa správne časuje sprechen pre du?",
            options: ["du sprechst", "du sprichst", "du sprecht", "du spreche"],
            answer: 1,
            explanation:
              "sprechen je silné sloveso s e→i striedaním: ich spreche, du sprichst, er spricht. Toto je výnimka z pravidelnej vzory!",
          },
          {
            question:
              "Jazyky v nemčine sa píšu:",
            options: [
              "s malým písmenom: deutsch, englisch",
              "s veľkým písmenom: Deutsch, Englisch",
              "záleží na jazyku",
              "bez rozdielu",
            ],
            answer: 1,
            explanation:
              "V nemčine sa jazyky VŽDY píšu s veľkým začiatočným písmenom: Deutsch, Englisch, Slowakisch, Tschechisch.",
          },
          {
            question:
              "Jana nehovorí po rusky. Ako to povie?",
            options: [
              "Ich spreche kein Russisch.",
              "Ich spreche nicht Russisch.",
              "Ich bin nicht Russisch.",
              "Ich keine Russisch spreche.",
            ],
            answer: 1,
            explanation:
              "Nicht neguje sloveso/predikát: Ich spreche nicht Russisch. kein sa používa s podstatnými menami s členom.",
          },
          {
            question:
              "James pochádza z USA. Ako to povie? (USA = plurál, dativ = den)",
            options: [
              "Ich komme aus die USA.",
              "Ich komme aus der USA.",
              "Ich komme aus den USA.",
              "Ich komme aus USA.",
            ],
            answer: 2,
            explanation:
              "USA je plurál (die USA). V datíve: plurál → den. Ich komme aus den USA.",
          },
        ],
      },
      {
        type: "fill",
        instruction:
          "Doplň správnu formu. Jana sa zoznamuje s kolegami.",
        questions: [
          {
            sentence: "Jana kommt aus ___ Slowakei.",
            answer: "der",
            hint: "die Slowakei → v datíve po aus → der",
            explanation:
              "die Slowakei má dativ der po predložke aus: aus der Slowakei.",
          },
          {
            sentence: "Stefan kommt aus ___. (Rakúsko — bez člena)",
            answer: "Österreich",
            hint: "Österreich nemá člen",
            explanation:
              "Z krajín bez člena: aus Österreich, aus Deutschland, aus England.",
          },
          {
            sentence: "Jana spricht Slowakisch und ein bisschen ___. (nemčina)",
            answer: "Deutsch",
            hint: "Jazyk = veľké písmeno",
            explanation:
              "Deutsch — jazyk s veľkým písmenom!",
          },
          {
            sentence: "Das ist ___ richtig! (Jana nesúhlasí — negácia)",
            answer: "nicht",
            hint: "Negácia = nicht",
            explanation:
              "Das ist nicht richtig. = To nie je pravda/správne.",
          },
        ],
      },
      {
        type: "listen",
        instruction:
          "Počúvaj popis osoby. Napíš krajinu, z ktorej pochádza, a jazyk.",
        questions: [
          {
            de: "Ich komme aus der Slowakei. Ich spreche Slowakisch.",
            sk: "Slovensko / Slowakisch",
          },
          {
            de: "Ich komme aus Deutschland. Ich spreche Deutsch.",
            sk: "Nemecko / Deutsch",
          },
          {
            de: "Ich komme aus England. Ich spreche Englisch.",
            sk: "Anglicko / Englisch",
          },
          {
            de: "Ich komme aus der Schweiz. Ich spreche Deutsch und Französisch.",
            sk: "Švajčiarsko / Deutsch + Französisch",
          },
          {
            de: "Ich komme aus Tschechien. Ich spreche Tschechisch.",
            sk: "Česko / Tschechisch",
          },
          {
            de: "Ich komme aus den USA. Ich spreche Englisch.",
            sk: "USA / Englisch",
          },
        ],
      },
      {
        type: "match",
        instruction: "Spoj krajinu s jej jazykom.",
        pairs: [
          ["Deutschland", "Deutsch"],
          ["die Slowakei", "Slowakisch"],
          ["England", "Englisch"],
          ["Tschechien", "Tschechisch"],
          ["Österreich", "Deutsch"],
          ["Polen", "Polnisch"],
        ],
      },
    ],
    reviewWords: ["L04_V01", "L04_V06", "L03_V01", "L06_V13"],
    lessonNotes:
      "Zoznam krajín s členom (die Slowakei, Schweiz, Türkei, USA) treba drillovať osobitne. sprechen e→i je dôležitý silný slovesný vzor. nicht vs. kein: nicht pre slovesá/prídavné mená, kein pre podstatné mená.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // L10 — Akkusativ — Den/Einen
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 10,
    week: 2,
    day: 5,
    title: "Akkusativ — Den/Einen",
    topic: "Akuzatív — zmena člena mužského rodu",
    cefr: "A1",
    xpReward: 30,
    narrativeContext:
      "Jana je po prvý raz sama vo viedenskej kaviarni. Zaslúži si odmenu po prvom pracovnom dni. Objednáva si raňajky — a musí použiť akuzatív!",
    communicativeGoal:
      "Po tejto lekcii viem objednať jedlo a nápoj v kaviarni a správne použiť akuzatív mužského rodu (den/einen/keinen).",
    skillFocus: ["grammar", "speaking", "vocabulary"],
    grammarNote: {
      rule: "Akuzatív — iba MUŽSKÝ rod sa mení! der→den, ein→einen",
      explanation:
        "Akuzatív (4. pád) je priamy predmet vety — odpovedá na otázku wen? (koho?) alebo was? (čo?). V nemčine sa v akuzatíve MENÍ IBA člen MUŽSKÉHO RODU. Ženský a stredný rod zostávajú rovnaké ako v nominatíve!",
      examples: [
        { de: "Ich trinke einen Kaffee. (M → einen)", sk: "Pijem kávu. (mužský rod → einen)" },
        { de: "Ich esse eine Suppe. (F → eine, nezmenené)", sk: "Jem polievku. (ženský rod → eine, rovnaké)" },
        { de: "Ich trinke ein Wasser. (N → ein, nezmenené)", sk: "Pijem vodu. (stredný rod → ein, rovnaké)" },
        { de: "Ich sehe den Mann. (M def. → den)", sk: "Vidím muža. (mužský určitý → den)" },
      ],
      slovakContrastNote:
        "Slovenčina má akuzatív tiež — ale mení sa viac vecí (rod, číslo, životnosť). V nemčine sa mení IBA mužský rod a IBA člen (nie slovo samotné). Toto je oveľa jednoduchšie! Mnemotechnika: der má niečo na svedomí — v akuzatíve sa prezlečie na den.",
    },
    vocab: [
      {
        de: "trinken",
        sk: "piť",
        example: "Ich trinke einen Kaffee.",
        exampleSk: "Pijem kávu.",
        gender: "-",
        srsId: "L10_V01",
        recycledFrom: [],
      },
      {
        de: "essen",
        sk: "jesť",
        example: "Jana isst einen Kuchen.",
        exampleSk: "Jana je koláč.",
        gender: "-",
        srsId: "L10_V02",
        recycledFrom: [],
      },
      {
        de: "sehen",
        sk: "vidieť",
        example: "Ich sehe einen Kellner.",
        exampleSk: "Vidím čašníka.",
        gender: "-",
        srsId: "L10_V03",
        recycledFrom: [],
      },
      {
        de: "brauchen",
        sk: "potrebovať",
        example: "Ich brauche einen Tisch für zwei.",
        exampleSk: "Potrebujem stôl pre dvoch.",
        gender: "-",
        srsId: "L10_V04",
        recycledFrom: [],
      },
      {
        de: "mögen",
        sk: "mať rád (ich mag, du magst, er mag)",
        example: "Ich mag Kaffee. Jana mag Kuchen.",
        exampleSk: "Mám rada kávu. Jana má rada koláč.",
        gender: "-",
        srsId: "L10_V05",
        recycledFrom: [],
      },
      {
        de: "der Apfelsaft",
        sk: "jablkový džús",
        example: "Ich trinke einen Apfelsaft.",
        exampleSk: "Pijem jablkový džús.",
        gender: "M",
        srsId: "L10_V06",
        recycledFrom: [],
      },
      {
        de: "die Suppe",
        sk: "polievka",
        example: "Jana isst eine Suppe. Die Suppe ist heiß.",
        exampleSk: "Jana je polievku. Polievka je horúca.",
        gender: "F",
        srsId: "L10_V07",
        recycledFrom: [],
      },
      {
        de: "der Käse",
        sk: "syr",
        example: "Ich möchte einen Käse, bitte.",
        exampleSk: "Chcel/a by som syr, prosím.",
        gender: "M",
        srsId: "L10_V08",
        recycledFrom: [],
      },
      {
        de: "das Glas",
        sk: "pohár",
        example: "Ich nehme ein Glas Wasser.",
        exampleSk: "Dám si pohár vody.",
        gender: "N",
        srsId: "L10_V09",
        recycledFrom: [],
      },
      {
        de: "die Tasse",
        sk: "šálka",
        example: "Eine Tasse Kaffee, bitte!",
        exampleSk: "Šálku kávy, prosím!",
        gender: "F",
        srsId: "L10_V10",
        recycledFrom: [],
      },
      {
        de: "der Hunger",
        sk: "hlad",
        example: "Ich habe Hunger! (idiom — ohne Artikel)",
        exampleSk: "Mám hlad! (pevná fráza — bez člena)",
        gender: "M",
        srsId: "L10_V11",
        recycledFrom: ["L05_V22"],
      },
      {
        de: "der Durst",
        sk: "smäd",
        example: "Ich habe Durst. Ich trinke einen Saft.",
        exampleSk: "Mám smäd. Pijem džús.",
        gender: "M",
        srsId: "L10_V12",
        recycledFrom: ["L05_V22"],
      },
      {
        de: "nehmen",
        sk: "vziať si, dať si (pri objednávke)",
        example: "Ich nehme einen Kaffee und einen Kuchen.",
        exampleSk: "Dám si kávu a koláč.",
        gender: "-",
        srsId: "L10_V13",
        recycledFrom: ["L08_V13"],
      },
      {
        de: "bestellen",
        sk: "objednať si",
        example: "Was möchten Sie bestellen?",
        exampleSk: "Čo si želáte objednať?",
        gender: "-",
        srsId: "L10_V14",
        recycledFrom: ["L08_V12"],
      },
    ],
    exercises: [
      {
        type: "flashcard",
        instruction:
          "Akuzatív: iba mužský rod sa mení! Otočením karty uvidíš nominatív vs. akuzatív formu.",
        items: [
          "M → der Kaffee [nom] → den Kaffee [akk] — zmena!",
          "M → ein Kaffee [nom] → einen Kaffee [akk] — zmena!",
          "F → die Suppe [nom] → die Suppe [akk] — ROVNAKÉ",
          "F → eine Suppe [nom] → eine Suppe [akk] — ROVNAKÉ",
          "N → das Wasser [nom] → das Wasser [akk] — ROVNAKÉ",
          "N → ein Wasser [nom] → ein Wasser [akk] — ROVNAKÉ",
          "Slovesá vyžadujúce akuzatív: trinken, essen, sehen, brauchen, mögen, haben, kaufen",
          "Ich trinke einen Kaffee. (M→einen)",
          "Ich esse eine Suppe. (F→eine, nezmenené)",
          "Ich mag Kuchen. (M, ale keď hovorím o Kuchen vo všeobecnosti, možno bez člena)",
          "Ich habe Hunger. / Ich habe Durst. (idiomy bez člena!)",
        ],
      },
      {
        type: "mcq",
        instruction:
          "Vyber správny tvar člena v akuzatíve. Pamätaj: iba mužský rod sa mení!",
        questions: [
          {
            question:
              "Jana si objednáva kávu (der Kaffee, M). Ich trinke ___ Kaffee.",
            options: ["der", "den", "die", "das"],
            answer: 1,
            explanation:
              "Kaffee = mužský rod (M). V akuzatíve: der → den. Ich trinke den Kaffee.",
          },
          {
            question:
              "Jana si objednáva polievku (die Suppe, F). Ich esse ___ Suppe.",
            options: ["die", "den", "der", "das"],
            answer: 0,
            explanation:
              "Suppe = ženský rod (F). V akuzatíve ženský rod sa NEMENÍ: die → die. Ich esse die Suppe.",
          },
          {
            question:
              "Prvá zmienka — neurčitý člen, mužský rod. Ich möchte ___ Apfelsaft.",
            options: ["ein", "eine", "einen", "dem"],
            answer: 2,
            explanation:
              "Apfelsaft = M + neurčitý člen + akuzatív → einen. ein → einen pre mužský rod v akuzatíve.",
          },
          {
            question:
              "Stredný rod, neurčitý člen. Jana objednáva pohár. Ich nehme ___ Glas Wasser.",
            options: ["ein", "eine", "einen", "das"],
            answer: 0,
            explanation:
              "Glas = stredný rod (N). Akuzatív N sa nemení: ein → ein. Ich nehme ein Glas Wasser.",
          },
          {
            question:
              "Jana nemá hlad, ale má smäd. Ich habe keinen ___.",
            options: ["Hunger", "Durst", "Kaffee", "Kuchen"],
            answer: 0,
            explanation:
              "Ich habe keinen Hunger. (nemám hlad) — kein → keinen pre mužský rod v akuzatíve.",
          },
          {
            question:
              "Ktoré slovesá VYŽADUJÚ akuzatív (priamy predmet)?",
            options: [
              "sein, werden, bleiben",
              "trinken, essen, sehen, kaufen",
              "kommen, gehen, fahren",
              "antworten, helfen, danken",
            ],
            answer: 1,
            explanation:
              "Prechodné slovesá (trinken, essen, sehen, kaufen...) vyžadujú akuzatívny predmet. sein/werden/bleiben vyžadujú nominatív.",
          },
        ],
      },
      {
        type: "fill",
        instruction:
          "Nahraď nominatívny člen akuzatívnym. Jana objednáva v kaviarni.",
        questions: [
          {
            sentence: "Das ist ein Kaffee. → Jana trinkt ___ Kaffee.",
            answer: "einen",
            hint: "Kaffee = M, neurčitý člen → akuzatív → einen",
            explanation:
              "ein (M nom) → einen (M akk). Jana trinkt einen Kaffee.",
          },
          {
            sentence: "Das ist eine Suppe. → Jana isst ___ Suppe.",
            answer: "eine",
            hint: "Suppe = F, ženský rod sa v akuzatíve nemení",
            explanation:
              "eine (F nom) → eine (F akk) — rovnaké. Jana isst eine Suppe.",
          },
          {
            sentence: "Das ist das Wasser. → Jana trinkt ___ Wasser.",
            answer: "das",
            hint: "Wasser = N, stredný rod sa v akuzatíve nemení",
            explanation:
              "das (N nom) → das (N akk) — rovnaké. Jana trinkt das Wasser.",
          },
          {
            sentence: "Jana braucht ___ Tisch für zwei Personen. (neurčitý, M)",
            answer: "einen",
            hint: "Tisch = M, neurčitý člen, akuzatív",
            explanation:
              "ein → einen pre M v akuzatíve. Jana braucht einen Tisch.",
          },
          {
            sentence: "Ich sehe ___ Kellner nicht. (určitý, M — čašníka nevidím)",
            answer: "den",
            hint: "Kellner = M, určitý člen, akuzatív → den",
            explanation:
              "der → den pre M v akuzatíve. Ich sehe den Kellner nicht.",
          },
        ],
      },
      {
        type: "listen",
        instruction:
          "Počúvaj vetu. Urči, či je akuzatívny predmet MUŽSKÝ (M), ŽENSKÝ (F) alebo STREDNÝ (N).",
        questions: [
          {
            de: "Jana trinkt einen Kaffee.",
            sk: "M — einen = mužský rod v akuzatíve",
          },
          {
            de: "Jana isst eine Torte.",
            sk: "F — eine = ženský rod (nezmenené)",
          },
          {
            de: "Jana trinkt ein Glas Wasser.",
            sk: "N — ein = stredný rod (nezmenené)",
          },
          {
            de: "Jana sieht den Kellner.",
            sk: "M — den = mužský rod určitý v akuzatíve",
          },
          {
            de: "Jana liest die Speisekarte.",
            sk: "F — die = ženský rod určitý (nezmenené)",
          },
          {
            de: "Jana kauft einen Kuchen.",
            sk: "M — einen = mužský neurčitý v akuzatíve",
          },
        ],
      },
      {
        type: "match",
        instruction:
          "Spoj nominatívnu formu s akuzatívnou formou.",
        pairs: [
          ["der Kaffee (nom)", "den Kaffee (akk)"],
          ["ein Kaffee (nom)", "einen Kaffee (akk)"],
          ["die Suppe (nom)", "die Suppe (akk) — rovnaké"],
          ["eine Suppe (nom)", "eine Suppe (akk) — rovnaké"],
          ["das Wasser (nom)", "das Wasser (akk) — rovnaké"],
          ["ein Wasser (nom)", "ein Wasser (akk) — rovnaké"],
          ["kein Kaffee (nom, M)", "keinen Kaffee (akk, M)"],
        ],
      },
      {
        type: "dialogue",
        instruction:
          "Prečítaj si dialóg. Jana si objednáva v kaviarni. Potom zodpovedaj otázky porozumenia.",
        context:
          "Jana vstúpi do Café Central po prvom pracovnom dni vo Viedni. Je unavená, ale spokojná. Čašník Josef sa jej ujme.",
        lines: [
          {
            speaker: "Kellner",
            de: "Grüß Gott! Einen Tisch für eine Person?",
            sk: "Dobrý deň! Stôl pre jednu osobu?",
          },
          {
            speaker: "Jana",
            de: "Ja, bitte. Ich habe einen Tisch reserviert — Nováková.",
            sk: "Áno, prosím. Mám rezervovaný stôl — Nováková.",
          },
          {
            speaker: "Kellner",
            de: "Ja, natürlich! Hier, bitte. Die Speisekarte.",
            sk: "Áno, samozrejme! Tu, prosím. Jedálny lístok.",
          },
          {
            speaker: "Jana",
            de: "Danke schön.",
            sk: "Pekne ďakujem.",
          },
          {
            speaker: "Kellner",
            de: "Was möchten Sie bestellen?",
            sk: "Čo si želáte objednať?",
          },
          {
            speaker: "Jana",
            de: "Ich nehme einen Kaffee — eine Melange, bitte. Und einen Kuchen.",
            sk: "Dám si kávu — Melange, prosím. A koláč.",
          },
          {
            speaker: "Kellner",
            de: "Welchen Kuchen möchten Sie? Wir haben eine Sachertorte und einen Apfelstrudel.",
            sk: "Ktorý koláč si želáte? Máme Sachertorte a jablkový závin.",
          },
          {
            speaker: "Jana",
            de: "Ich nehme den Apfelstrudel. Der sieht lecker aus!",
            sk: "Dám si jablkový závin. Ten vyzerá lahodne!",
          },
          {
            speaker: "Kellner",
            de: "Sehr gut! Einen Moment, bitte.",
            sk: "Výborne! Chvíľku strpenia, prosím.",
          },
          {
            speaker: "Jana",
            de: "Entschuldigung — haben Sie auch Wasser? Ich habe Durst.",
            sk: "Prepáčte — máte aj vodu? Som smädná.",
          },
          {
            speaker: "Kellner",
            de: "Natürlich! Ein Glas Wasser?",
            sk: "Samozrejme! Pohár vody?",
          },
          {
            speaker: "Jana",
            de: "Ja, bitte. Danke!",
            sk: "Áno, prosím. Ďakujem!",
          },
        ],
        comprehensionQuestions: [
          {
            question: "Čo si Jana objednala na pitie? (2 veci)",
            options: [
              "Tee und Wasser",
              "Melange (Kaffee) und Wasser",
              "Apfelsaft und Kaffee",
              "Nur Wasser",
            ],
            answer: 1,
          },
          {
            question: "Čo si Jana objednala na jedenie?",
            options: [
              "Sachertorte",
              "Kuchen ohne Namen",
              "Apfelstrudel",
              "Brot mit Butter",
            ],
            answer: 2,
          },
          {
            question:
              "Prečo si Jana objednala aj vodu?",
            options: [
              "Lebo má hlad (Hunger)",
              "Lebo má smäd (Durst)",
              "Lebo je unavená (müde)",
              "Lebo je drahá (teuer)",
            ],
            answer: 1,
          },
          {
            question:
              "Ako čašník pozdraví Janu? Aký pozdrav použil? (typicky Viedeň!)",
            options: [
              "Guten Tag",
              "Hallo",
              "Grüß Gott",
              "Guten Morgen",
            ],
            answer: 2,
          },
        ],
      },
    ],
    reviewWords: [
      "L08_V02",
      "L08_V05",
      "L08_V11",
      "L07_V01",
      "L06_V11",
      "L05_V22",
      "L03_V01",
      "L02_V13",
    ],
    lessonNotes:
      "Akuzatív je prvý pád. Jana vie zo slovenčiny, čo pád je — len sa musí naučiť, ŽE v nemčine sa mení iba mužský člen. Dialóg recykluje L01-L10 slovnú zásobu — je to mini-zhrnutie. Ich habe Hunger/Durst = idiomy bez člena.",
  },
];
