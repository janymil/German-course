// WEEK 1 — Alphabet, Greetings, sein, W-Questions, Numbers 0–20
export const week1Lessons = [
  // ─────────────────────────────────────────────────────────────────────────
  // L01 — Das Alphabet und Aussprache
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 1,
    week: 1,
    day: 1,
    title: "Das Alphabet und Aussprache",
    topic: "Nemecká abeceda a výslovnosť",
    cefr: "A1",
    xpReward: 25,
    narrativeContext:
      "Jana sa chystá na pohovor vo Viedni. Tréninguje, ako hláskuje svoje meno po nemecky: J-A-N-A N-O-V-Á-K-O-V-Á.",
    communicativeGoal:
      "Po tejto lekcii viem nahláskovat' svoje meno a rozumiem, ako sa čítajú nemecké písmená.",
    skillFocus: ["vocabulary", "listening", "pronunciation"],
    grammarNote: {
      rule: "Nemecká abeceda — pravidlá výslovnosti",
      explanation:
        "Nemčina je do veľkej miery fonetický jazyk — čo vidíš, to (väčšinou) vyslovíš. Ale niektoré písmená znejú inak ako v slovenčine!",
      examples: [
        { de: "W → [v]: Wien = [viːn]", sk: "W znie ako slovenské V: Wien = Viedeň" },
        { de: "V → [f]: Vogel = [foːgl]", sk: "V znie ako slovenské F: Vogel = vták" },
        { de: "Z → [ts]: Zimmer = [tsɪmɐ]", sk: "Z znie ako TS: Zimmer = izba" },
        { de: "J → [j]: ja = [jaː]", sk: "J znie ako slovenské J" },
        { de: "ch (po a/o/u) → [x]: Nacht", sk: "ch znie ako slovenské CH (chlieb)" },
        { de: "ch (po e/i) → [ç]: ich", sk: "ch znie mäkšie, ako šepkaný zvuk" },
      ],
      slovakContrastNote:
        "Pozor na tri hlavné pasce: W (nie W ako anglické, ale V!), V (nie V ale F!), Z (nie Z ale TS!). Slovenčina a nemčina sa tu výrazne líšia.",
    },
    vocab: [
      {
        de: "das Alphabet",
        sk: "abeceda",
        example: "Das deutsche Alphabet hat 26 Buchstaben.",
        exampleSk: "Nemecká abeceda má 26 písmen.",
        gender: "N",
        srsId: "L01_V01",
        recycledFrom: [],
      },
      {
        de: "der Buchstabe",
        sk: "písmeno",
        example: "Wie schreibt man das? Buchstabieren Sie bitte!",
        exampleSk: "Ako sa to píše? Nahláskujte, prosím!",
        gender: "M",
        srsId: "L01_V02",
        recycledFrom: [],
      },
      {
        de: "der Umlaut",
        sk: "prehlaska (ä, ö, ü)",
        example: "Ä, Ö und Ü sind Umlaute.",
        exampleSk: "Ä, Ö a Ü sú prehlasené samohlásky.",
        gender: "M",
        srsId: "L01_V03",
        recycledFrom: [],
      },
      {
        de: "die Aussprache",
        sk: "výslovnosť",
        example: "Die Aussprache von Wien ist [viːn].",
        exampleSk: "Výslovnosť slova Wien je [viːn].",
        gender: "F",
        srsId: "L01_V04",
        recycledFrom: [],
      },
      {
        de: "buchstabieren",
        sk: "hláskovat'",
        example: "Buchstabieren Sie Ihren Namen, bitte: J-A-N-A.",
        exampleSk: "Nahláskujte, prosím, svoje meno: J-A-N-A.",
        gender: "-",
        srsId: "L01_V05",
        recycledFrom: [],
      },
      {
        de: "heißen",
        sk: "volať sa, menovať sa",
        example: "Ich heiße Jana. Wie heißen Sie?",
        exampleSk: "Volám sa Jana. Ako sa voláte?",
        gender: "-",
        srsId: "L01_V06",
        recycledFrom: [],
      },
      {
        de: "die Straße",
        sk: "ulica",
        example: "Ich wohne in der Mariahilfer Straße.",
        exampleSk: "Bývam na Mariahilfer Straße.",
        gender: "F",
        srsId: "L01_V07",
        recycledFrom: [],
      },
      {
        de: "Wien",
        sk: "Viedeň",
        example: "Wien ist die Hauptstadt von Österreich.",
        exampleSk: "Viedeň je hlavné mesto Rakúska.",
        gender: "-",
        srsId: "L01_V08",
        recycledFrom: [],
      },
      {
        de: "der Vogel",
        sk: "vták",
        example: "Der Vogel singt.",
        exampleSk: "Vtáčik spieva.",
        gender: "M",
        srsId: "L01_V09",
        recycledFrom: [],
      },
      {
        de: "das Zimmer",
        sk: "izba",
        example: "Das Zimmer ist groß.",
        exampleSk: "Izba je veľká.",
        gender: "N",
        srsId: "L01_V10",
        recycledFrom: [],
      },
      {
        de: "sprechen",
        sk: "hovoriť",
        example: "Ich spreche ein bisschen Deutsch.",
        exampleSk: "Hovorím trochu po nemecky.",
        gender: "-",
        srsId: "L01_V11",
        recycledFrom: [],
      },
      {
        de: "schreiben",
        sk: "písať",
        example: "Wie schreibt man Straße?",
        exampleSk: "Ako sa píše Straße?",
        gender: "-",
        srsId: "L01_V12",
        recycledFrom: [],
      },
      {
        de: "kurz",
        sk: "krátky",
        example: "Das A in hat ist kurz.",
        exampleSk: "A v slove hat je krátke.",
        gender: "-",
        srsId: "L01_V13",
        recycledFrom: [],
      },
      {
        de: "lang",
        sk: "dlhý",
        example: "Das A in Hahn ist lang.",
        exampleSk: "A v slove Hahn je dlhé.",
        gender: "-",
        srsId: "L01_V14",
        recycledFrom: [],
      },
      {
        de: "Wie schreibt man das?",
        sk: "Ako sa to píše?",
        example: "Wie schreibt man Nováková? — N-O-V-Á-K-O-V-Á.",
        exampleSk: "Ako sa píše Nováková? — N-O-V-Á-K-O-V-Á.",
        gender: "-",
        srsId: "L01_V15",
        recycledFrom: [],
      },
      {
        de: "Das ist richtig.",
        sk: "To je správne.",
        example: "J-A-N-A — das ist richtig!",
        exampleSk: "J-A-N-A — to je správne!",
        gender: "-",
        srsId: "L01_V16",
        recycledFrom: [],
      },
      {
        de: "der Vokal",
        sk: "samohláska",
        example: "A, E, I, O, U sind Vokale.",
        exampleSk: "A, E, I, O, U sú samohlásky.",
        gender: "M",
        srsId: "L01_V17",
        recycledFrom: [],
      },
      {
        de: "der Konsonant",
        sk: "spoluhláska",
        example: "B, C, D, F sind Konsonanten.",
        exampleSk: "B, C, D, F sú spoluhlásky.",
        gender: "M",
        srsId: "L01_V18",
        recycledFrom: [],
      },
      {
        de: "das Eszett (ß)",
        sk: "písmeno ß (dlhé s)",
        example: "Straße, heißen, Fuß — alle mit ß.",
        exampleSk: "Straße, heißen, Fuß — všetky s ß.",
        gender: "N",
        srsId: "L01_V19",
        recycledFrom: [],
      },
      {
        de: "die Nacht",
        sk: "noc",
        example: "In der Nacht ist es still.",
        exampleSk: "V noci je ticho.",
        gender: "F",
        srsId: "L01_V20",
        recycledFrom: [],
      },
    ],
    exercises: [
      {
        type: "flashcard",
        instruction:
          "Prezri si karty s písmenami a pravidlami výslovnosti. Otočením karty uvidíš pravidlo a príklad slovo.",
        items: [
          "W → [v] ako slovenské V | Wien = Viedeň",
          "V → [f] ako slovenské F | Vogel = vták",
          "Z → [ts] ako TS | Zimmer = izba",
          "J → [j] ako slovenské J | ja = áno",
          "ch (po a/o/u) → [x] ako slovens CH | Nacht = noc",
          "ch (po e/i) → [ç] mäkší zvuk | ich = ja",
          "ß → [s] predĺžené S | Straße = ulica",
          "ä → [ɛ] ako dlhé E",
          "ö → [ø] zaoblené pery + E",
          "ü → [y] zaoblené pery + I",
          "das Alphabet — abeceda",
          "buchstabieren — hláskovat'",
          "der Buchstabe — písmeno",
          "die Aussprache — výslovnosť",
          "Wie schreibt man das? — Ako sa to píše?",
        ],
      },
      {
        type: "mcq",
        instruction:
          "Vyber správnu odpoveď. Testuješ pravidlá výslovnosti nemeckých písmen.",
        questions: [
          {
            question: "Ako sa vyslovuje nemecké W v slove Wien?",
            options: [
              "[w] ako anglické W",
              "[v] ako slovenské V",
              "[b] ako B",
              "[f] ako F",
            ],
            answer: 1,
            explanation:
              "Nemecké W sa vyslovuje ako slovenské V! Wien sa číta [viːn], teda Viedeň. Anglické [w] v nemčine neexistuje.",
          },
          {
            question: "Ako sa vyslovuje nemecké V v slove Vogel (vták)?",
            options: [
              "[v] ako slovenské V",
              "[w] ako anglické W",
              "[f] ako slovenské F",
              "[b]",
            ],
            answer: 2,
            explanation:
              "Pozor, nemecké V znie ako F! Vogel sa číta [foːgl]. Toto je jedna z najčastejších pascí pre slovensky hovoriacich.",
          },
          {
            question: "Ako sa vyslovuje Z v nemeckom slove Zimmer (izba)?",
            options: [
              "[z] ako slovenské Z",
              "[s] ako S",
              "[ts] ako TS",
              "[dz]",
            ],
            answer: 2,
            explanation:
              "Nemecké Z sa vyslovuje ako TS. Zimmer sa číta [tsɪmɐ]. Myslite na slovo pizza — ten TS zvuk poznáte!",
          },
          {
            question:
              "Jana píše svoje meno na formulár. Ako nahláskuje J-A-N-A? Ktoré písmeno je na treťom mieste?",
            options: ["N", "A", "J", "E"],
            answer: 0,
            explanation:
              "J-A-N-A: prvé je J, druhé A, tretie N, štvrté A. Správne je N.",
          },
          {
            question: "Čo znamená symbol ß v nemčine?",
            options: [
              "Osobitná forma písmena B",
              "Predĺžené S — píše sa po dlhej samohláske",
              "Kombinácia SS vždy bez výnimky",
              "Zastaralé písmeno, dnes sa nepoužíva",
            ],
            answer: 1,
            explanation:
              "ß sa píše po dlhej samohláske alebo dvojhláske: Straße (dlhé A), heißen (dvojhláska EI). Po krátkej samohláske sa píše SS: Wasser.",
          },
          {
            question: "Ako znie ch v slove ich (ja)?",
            options: [
              "[x] ako slovenské CH (silné, drsné)",
              "[ç] mäkšie, ako šepkaný zvuk",
              "[k] ako K",
              "[š] ako Š",
            ],
            answer: 1,
            explanation:
              "Po predných samohláskach (e, i) sa ch vyslovuje mäkšie [ç]. Po zadných samohláskach (a, o, u) znie ako slovenské CH [x]. Ich má predné I, preto [ç].",
          },
        ],
      },
      {
        type: "fill",
        instruction:
          "Doplň chýbajúce písmeno, aby bolo hláskovaného správne. Použij veľké písmená.",
        questions: [
          {
            sentence: "H - A - _ - L - O  (Hallo = Ahoj)",
            answer: "L",
            hint: "Tretie písmeno v slove HALLO",
            explanation:
              "HALLO sa hláskuje: H-A-L-L-O. Na treťom mieste je L.",
          },
          {
            sentence: "W - I - _ - N  (Wien = Viedeň)",
            answer: "E",
            hint: "Tretie písmeno slova Wien",
            explanation: "WIEN sa hláskuje: W-I-E-N. Tretie písmeno je E.",
          },
          {
            sentence: "J - A - N - _  (Jana)",
            answer: "A",
            hint: "Posledné písmeno mena Jana",
            explanation:
              "JANA sa hláskuje: J-A-N-A. Posledné písmeno je A.",
          },
          {
            sentence: "_ - T - R - A - ß - E  (Straße = ulica)",
            answer: "S",
            hint: "Prvé písmeno slova Straße",
            explanation:
              "STRASSE sa hláskuje: S-T-R-A-ß-E. Prvé písmeno je S.",
          },
          {
            sentence: "Z - I - M - _ - E - R  (Zimmer = izba)",
            answer: "M",
            hint: "Štvrté písmeno slova Zimmer",
            explanation:
              "ZIMMER sa hláskuje: Z-I-M-M-E-R. Štvrté písmeno je M.",
          },
        ],
      },
      {
        type: "listen",
        instruction:
          "Počúvaj názov písmena. Napíš toto písmeno (veľkým písmenom). Precvič si, ako by ti diktovali meno na recepcii.",
        questions: [
          { de: "Jay", sk: "J" },
          { de: "Ah", sk: "A" },
          { de: "En", sk: "N" },
          { de: "Ah", sk: "A" },
          { de: "Veh (W)", sk: "W — znie ako V!" },
          { de: "Oh", sk: "O" },
          { de: "Tseh (Z)", sk: "Z — znie ako TS!" },
          { de: "Veh (V)", sk: "V — znie ako F!" },
        ],
      },
      {
        type: "match",
        instruction:
          "Spoj písmeno alebo skupinu písmen s pravidlom výslovnosti.",
        pairs: [
          ["W", "[v] — ako slovenské V"],
          ["V", "[f] — ako slovenské F"],
          ["Z", "[ts] — ako TS (pizza)"],
          ["J", "[j] — ako slovenské J"],
          ["ch (po a,o,u)", "[x] — ako slovenské CH"],
          ["ch (po e,i)", "[ç] — mäkší CH zvuk"],
          ["ß", "[s] — po dlhej samohláske"],
          ["ö", "[ø] — zaoblené pery, hovor E"],
          ["ü", "[y] — zaoblené pery, hovor I"],
          ["ä", "[ɛ] — ako dlhé E"],
        ],
      },
    ],
    reviewWords: [],
    lessonNotes:
      "Základ všetkého. W/V/Z sú najdôležitejšie rozdiely oproti slovenčine. Umlauty nemajú slovenský ekvivalent — opis polohy úst pomáha. ß sa píše po dlhej samohláske, SS po krátkej.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // L02 — Hallo! Grüßen und Vorstellen
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 2,
    week: 1,
    day: 2,
    title: "Hallo! Grüßen und Vorstellen",
    topic: "Pozdravy a predstavenie sa",
    cefr: "A1",
    xpReward: 20,
    narrativeContext:
      "Jana sa učí prvé slová po nemecky. Na pohovore sa bude musieť predstaviť a pozdraviť šéfa formálne.",
    communicativeGoal:
      "Po tejto lekcii viem pozdraviť, rozlúčiť sa a predstaviť sa menom — formálne aj neformálne.",
    skillFocus: ["vocabulary", "speaking", "social"],
    grammarNote: {
      rule: "Formálne (Sie) vs. neformálne (du) pozdravy",
      explanation:
        "Rovnako ako v slovenčine (Vy/ty), aj nemčina rozlišuje formálne a neformálne oslovenie. Na pohovore, v obchode alebo s cudzím človekom používaj FORMÁLNE formy.",
      examples: [
        { de: "Wie heißen Sie? (formálne)", sk: "Ako sa voláte? (Vy)" },
        { de: "Wie heißt du? (neformálne)", sk: "Ako sa voláš? (ty)" },
        { de: "Auf Wiedersehen! (formálne)", sk: "Dovidenia!" },
        { de: "Tschüss! (neformálne)", sk: "Čau!" },
      ],
      slovakContrastNote:
        "Formálne/neformálne oslovenie funguje rovnako ako Vy/ty v slovenčine. Ale pozor: nemecké Sie (veľké S) = Vy formálne. sie (malé s) = ona alebo oni — tri rôzne významy!",
    },
    vocab: [
      {
        de: "Hallo",
        sk: "Ahoj",
        example: "Hallo, ich bin Jana!",
        exampleSk: "Ahoj, som Jana!",
        gender: "-",
        srsId: "L02_V01",
        recycledFrom: [],
      },
      {
        de: "Guten Morgen",
        sk: "Dobré ráno",
        example: "Guten Morgen, Frau Müller!",
        exampleSk: "Dobré ráno, pani Müller!",
        gender: "-",
        srsId: "L02_V02",
        recycledFrom: [],
      },
      {
        de: "Guten Tag",
        sk: "Dobrý deň",
        example: "Guten Tag, ich heiße Jana Nováková.",
        exampleSk: "Dobrý deň, volám sa Jana Nováková.",
        gender: "-",
        srsId: "L02_V03",
        recycledFrom: [],
      },
      {
        de: "Guten Abend",
        sk: "Dobrý večer",
        example: "Guten Abend, wie geht es Ihnen?",
        exampleSk: "Dobrý večer, ako sa máte?",
        gender: "-",
        srsId: "L02_V04",
        recycledFrom: [],
      },
      {
        de: "Gute Nacht",
        sk: "Dobrú noc",
        example: "Gute Nacht, bis morgen!",
        exampleSk: "Dobrú noc, do zajtra!",
        gender: "-",
        srsId: "L02_V05",
        recycledFrom: [],
      },
      {
        de: "Auf Wiedersehen",
        sk: "Dovidenia",
        example: "Auf Wiedersehen, Dr. Müller!",
        exampleSk: "Dovidenia, Dr. Müller!",
        gender: "-",
        srsId: "L02_V06",
        recycledFrom: [],
      },
      {
        de: "Tschüss",
        sk: "Čau (neformálne)",
        example: "Tschüss, bis morgen!",
        exampleSk: "Čau, do zajtra!",
        gender: "-",
        srsId: "L02_V07",
        recycledFrom: [],
      },
      {
        de: "Bis bald",
        sk: "Čoskoro sa uvidíme",
        example: "Bis bald, Markus!",
        exampleSk: "Čoskoro sa uvidíme, Markus!",
        gender: "-",
        srsId: "L02_V08",
        recycledFrom: [],
      },
      {
        de: "Grüß Gott 🇦🇹",
        sk: "Dobrý deň (typicky rakúske)",
        example: "Grüß Gott! Ich bin neu hier.",
        exampleSk: "Dobrý deň! Som tu nová.",
        gender: "-",
        srsId: "L02_V09",
        recycledFrom: [],
      },
      {
        de: "Servus 🇦🇹",
        sk: "Čau / Ahoj (rakúske, neformálne)",
        example: "Servus, Stefan! Wie geht's?",
        exampleSk: "Ahoj, Stefan! Ako sa máš?",
        gender: "-",
        srsId: "L02_V10",
        recycledFrom: [],
      },
      {
        de: "Wie geht es Ihnen?",
        sk: "Ako sa máte? (formálne)",
        example: "Guten Tag! Wie geht es Ihnen, Herr Müller?",
        exampleSk: "Dobrý deň! Ako sa máte, pán Müller?",
        gender: "-",
        srsId: "L02_V11",
        recycledFrom: [],
      },
      {
        de: "Wie geht's?",
        sk: "Ako sa máš? (neformálne)",
        example: "Hallo Jana! Wie geht's?",
        exampleSk: "Ahoj Jana! Ako sa máš?",
        gender: "-",
        srsId: "L02_V12",
        recycledFrom: [],
      },
      {
        de: "Danke / Danke schön",
        sk: "Ďakujem / Pekne ďakujem",
        example: "Danke schön, das ist sehr nett!",
        exampleSk: "Pekne ďakujem, to je veľmi milé!",
        gender: "-",
        srsId: "L02_V13",
        recycledFrom: [],
      },
      {
        de: "Bitte / Bitte schön",
        sk: "Prosím / Nech sa páči",
        example: "— Danke! — Bitte schön!",
        exampleSk: "— Ďakujem! — Nech sa páči!",
        gender: "-",
        srsId: "L02_V14",
        recycledFrom: [],
      },
      {
        de: "Entschuldigung",
        sk: "Prepáčte / Ospravedlňujem sa",
        example: "Entschuldigung, wo ist das Büro?",
        exampleSk: "Prepáčte, kde je kancelária?",
        gender: "-",
        srsId: "L02_V15",
        recycledFrom: [],
      },
      {
        de: "Es tut mir leid",
        sk: "Je mi ľúto (hlbšia ospravedlnenka)",
        example: "Es tut mir leid, ich bin zu spät.",
        exampleSk: "Je mi ľúto, prišla som neskoro.",
        gender: "-",
        srsId: "L02_V16",
        recycledFrom: [],
      },
      {
        de: "Ich heiße...",
        sk: "Volám sa...",
        example: "Ich heiße Jana Nováková.",
        exampleSk: "Volám sa Jana Nováková.",
        gender: "-",
        srsId: "L02_V17",
        recycledFrom: ["L01_V06"],
      },
      {
        de: "Mein Name ist...",
        sk: "Moje meno je...",
        example: "Mein Name ist Jana Nováková.",
        exampleSk: "Moje meno je Jana Nováková.",
        gender: "-",
        srsId: "L02_V18",
        recycledFrom: [],
      },
    ],
    exercises: [
      {
        type: "flashcard",
        instruction:
          "Prezri si karty s pozdravmi a frázami. Na zadnej strane je slovenský preklad a situácia, kedy sa fráza používa.",
        items: [
          "Hallo → Ahoj (neformálne)",
          "Guten Morgen → Dobré ráno (ráno, do ~10:00)",
          "Guten Tag → Dobrý deň (cez deň)",
          "Guten Abend → Dobrý večer (večer, od ~18:00)",
          "Gute Nacht → Dobrú noc (pri lúčení večer)",
          "Auf Wiedersehen → Dovidenia (formálne)",
          "Tschüss → Čau (neformálne)",
          "Bis bald → Čoskoro sa uvidíme",
          "Grüß Gott 🇦🇹 → Dobrý deň (Viedeň!)",
          "Servus 🇦🇹 → Čau/Ahoj (Rakúsko, neformálne)",
          "Wie geht es Ihnen? → Ako sa máte? (formálne)",
          "Wie geht's? → Ako sa máš? (neformálne)",
          "Danke schön → Pekne ďakujem",
          "Bitte schön → Nech sa páči",
          "Entschuldigung → Prepáčte",
          "Es tut mir leid → Je mi ľúto",
          "Ich heiße... → Volám sa...",
          "Mein Name ist... → Moje meno je...",
        ],
      },
      {
        type: "mcq",
        instruction:
          "Vyber správnu frázu pre danú situáciu. Dávaj pozor na formálne a neformálne situácie!",
        questions: [
          {
            question:
              "Jana prichádza ráno o 9:00 na pohovor. Ako pozdraví Dr. Müllera (budúci šéf)?",
            options: [
              "Hallo! Wie geht's?",
              "Guten Morgen, Dr. Müller!",
              "Servus!",
              "Tschüss!",
            ],
            answer: 1,
            explanation:
              "Ráno na formálnom pohovore sa používa Guten Morgen + oslovenie s titulom. Hallo a Servus sú neformálne.",
          },
          {
            question:
              "Jana sa lúči s Dr. Müllerom po pohovore. Čo povie? (formálne lúčenie)",
            options: ["Tschüss!", "Bis bald!", "Auf Wiedersehen!", "Servus!"],
            answer: 2,
            explanation:
              "Auf Wiedersehen je formálne dovidenia — správna voľba pri lúčení sa s šéfom. Tschüss a Servus sú neformálne.",
          },
          {
            question:
              "Kolegyňa sa pýta: Wie heißen Sie? Ako Jana správne odpovie?",
            options: [
              "Ich bin müde.",
              "Mein Name ist Jana Nováková.",
              "Danke schön!",
              "Entschuldigung!",
            ],
            answer: 1,
            explanation:
              "Wie heißen Sie? sa pýta na meno. Odpoveď je Mein Name ist... alebo Ich heiße...",
          },
          {
            question:
              "Jana omylom bumkne do kolegu v chodbe. Čo povie ako ľahká ospravedlnenka?",
            options: [
              "Es tut mir leid",
              "Entschuldigung",
              "Danke schön",
              "Guten Abend",
            ],
            answer: 1,
            explanation:
              "Entschuldigung = prepáčte, ľahká ospravedlnenka alebo na upútanie pozornosti. Es tut mir leid je hlbší výraz ľútosti pre závažnejšie chyby.",
          },
          {
            question:
              "Jana je vo Viedni v obchode. Predavač pozdraví ako typický Viedenčan. Čo pravdepodobne povie?",
            options: ["Hallo!", "Guten Tag!", "Grüß Gott!", "Good morning!"],
            answer: 2,
            explanation:
              "Grüß Gott je typický rakúsky/viedenský pozdrav. Vo Viedni ho počuješ oveľa častejšie ako Guten Tag. Jana by si ho mala dobre zapamätať!",
          },
          {
            question:
              "Janiho priateľ sa pýta: Wie geht's? Jana povie, že je unavená. Čo povie?",
            options: [
              "Danke, gut!",
              "Es tut mir leid.",
              "Nicht so gut, ich bin sehr müde.",
              "Auf Wiedersehen!",
            ],
            answer: 2,
            explanation:
              "Wie geht's? = ako sa máš? Odpoveď: Nicht so gut, ich bin müde. (müde = unavená — naučíme sa v L03).",
          },
        ],
      },
      {
        type: "fill",
        instruction:
          "Doplň správnu frázu do dialógu. Použij slová z lekcie.",
        questions: [
          {
            sentence: "___, mein Name ist Jana Nováková. (formálne, cez deň)",
            answer: "Guten Tag",
            hint: "Formálny pozdrav cez deň",
            explanation:
              "Guten Tag je správny formálny pozdrav cez deň.",
          },
          {
            sentence: "— Danke schön! — ___, Frau Nováková!",
            answer: "Bitte schön",
            hint: "Odpoveď na Danke",
            explanation:
              "Bitte schön = nech sa páči, je odpoveďou na ďakujem.",
          },
          {
            sentence: "___, ich bin zu spät! (Jana prišla neskoro na stretnutie)",
            answer: "Es tut mir leid",
            hint: "Hlbšia ospravedlnenka",
            explanation:
              "Es tut mir leid = je mi ľúto — pre závažnejšie ospravedlnenia.",
          },
          {
            sentence: "Ich ___ Jana. (Volám sa Jana.)",
            answer: "heiße",
            hint: "Konjugácia slovesa heißen pre ich",
            explanation:
              "heißen → Ich heiße. Jana sa predstavuje: Ich heiße Jana.",
          },
        ],
      },
      {
        type: "listen",
        instruction:
          "Počúvaj frázu. Napíš, či je FORMÁLNA (F) alebo NEFORMÁLNA (N).",
        questions: [
          { de: "Guten Tag!", sk: "F — formálny pozdrav" },
          { de: "Hallo!", sk: "N — neformálny pozdrav" },
          { de: "Auf Wiedersehen!", sk: "F — formálne dovidenia" },
          { de: "Tschüss!", sk: "N — neformálne čau" },
          { de: "Wie geht es Ihnen?", sk: "F — formálne ako sa máte" },
          { de: "Wie geht's?", sk: "N — neformálne ako sa máš" },
          { de: "Grüß Gott!", sk: "F — rakúsky formálny pozdrav" },
          { de: "Servus!", sk: "N — rakúsky neformálny pozdrav" },
        ],
      },
      {
        type: "match",
        instruction: "Spoj nemeckú frázu s jej slovenským prekladom.",
        pairs: [
          ["Guten Morgen", "Dobré ráno"],
          ["Auf Wiedersehen", "Dovidenia"],
          ["Wie geht es Ihnen?", "Ako sa máte?"],
          ["Es tut mir leid", "Je mi ľúto"],
          ["Ich heiße...", "Volám sa..."],
          ["Entschuldigung", "Prepáčte"],
          ["Bis bald", "Čoskoro sa uvidíme"],
          ["Grüß Gott", "Dobrý deň (Viedeň)"],
        ],
      },
    ],
    reviewWords: ["L01_V05", "L01_V06"],
    lessonNotes:
      "Prvá komunikatívna lekcia. Žiadna gramatika — len frázy. Formálne/neformálne rozlíšenie je kľúčové. Rakúske varianty (Grüß Gott, Servus) sú pre Janu dôležitejšie ako nemecké.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // L03 — Ich bin Jana — sein konjugieren
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 3,
    week: 1,
    day: 3,
    title: "Ich bin Jana — sein konjugieren",
    topic: "Sloveso byť — sein — a osobné zámená",
    cefr: "A1",
    xpReward: 25,
    narrativeContext:
      "Jana sa predstavuje budúcim kolegom vo Viedni. Hovorí o sebe: meno, vek, povolanie. Musí vedieť formálne aj neformálne formy.",
    communicativeGoal:
      "Po tejto lekcii viem predstaviť seba: meno, vek, kde som z, čím som — a viem sa opýtať iných.",
    skillFocus: ["grammar", "speaking", "vocabulary"],
    grammarNote: {
      rule: "sein (byť) — časovanie v prítomnom čase",
      explanation:
        "Sloveso sein (byť) je najpoužívanejšie sloveso v nemčine. Je nepravidelné — každá forma sa musí naučiť. Dobrá správa: slovenské byť je tiež nepravidelné, takže princíp poznáš!",
      examples: [
        { de: "ich bin", sk: "ja som" },
        { de: "du bist", sk: "ty si" },
        { de: "er/sie/es ist", sk: "on/ona/ono je" },
        { de: "wir sind", sk: "my sme" },
        { de: "ihr seid", sk: "vy ste (neformálne)" },
        { de: "sie/Sie sind", sk: "oni sú / Vy ste (formálne)" },
      ],
      slovakContrastNote:
        "DÔLEŽITÉ: sie (malé s) = ona ALEBO oni. Sie (veľké S) = Vy formálne. Všetky tri sú skoro rovnaké! Ďalší rozdiel: V slovenčine hovoríme Mám 28 rokov — v nemčine Ich BIN 28 Jahre alt (nie Ich HABE!). Vek = sein!",
    },
    vocab: [
      {
        de: "sein",
        sk: "byť",
        example: "Ich bin Jana. Ich bin 28 Jahre alt.",
        exampleSk: "Som Jana. Mám 28 rokov. (doslova: Som 28 rokov stará)",
        gender: "-",
        srsId: "L03_V01",
        recycledFrom: [],
      },
      {
        de: "ich",
        sk: "ja",
        example: "Ich bin Marketingmanagerin.",
        exampleSk: "Som marketingmanažérka.",
        gender: "-",
        srsId: "L03_V02",
        recycledFrom: [],
      },
      {
        de: "du",
        sk: "ty",
        example: "Du bist sehr nett!",
        exampleSk: "Si veľmi milý/milá!",
        gender: "-",
        srsId: "L03_V03",
        recycledFrom: [],
      },
      {
        de: "er / sie / es",
        sk: "on / ona / ono",
        example: "Er ist jung. Sie ist müde. Es ist kalt.",
        exampleSk: "On je mladý. Ona je unavená. Je zima.",
        gender: "-",
        srsId: "L03_V04",
        recycledFrom: [],
      },
      {
        de: "wir",
        sk: "my",
        example: "Wir sind neu hier.",
        exampleSk: "Sme tu noví.",
        gender: "-",
        srsId: "L03_V05",
        recycledFrom: [],
      },
      {
        de: "ihr",
        sk: "vy (neformálne, viacerí)",
        example: "Ihr seid sehr nett!",
        exampleSk: "Ste veľmi milí!",
        gender: "-",
        srsId: "L03_V06",
        recycledFrom: [],
      },
      {
        de: "sie (Pl.) / Sie (formálne)",
        sk: "oni sú / Vy ste",
        example: "Sie sind aus Bratislava. / Sie sind sehr nett, Herr Müller.",
        exampleSk: "Sú z Bratislavy. / Ste veľmi milý, pán Müller.",
        gender: "-",
        srsId: "L03_V07",
        recycledFrom: [],
      },
      {
        de: "die Studentin / der Student",
        sk: "študentka / študent",
        example: "Ich bin Studentin. (bez člena!)",
        exampleSk: "Som študentka. (bez člena!)",
        gender: "F",
        srsId: "L03_V08",
        recycledFrom: [],
      },
      {
        de: "die Lehrerin / der Lehrer",
        sk: "učiteľka / učiteľ",
        example: "Meine Mutter ist Lehrerin.",
        exampleSk: "Moja mama je učiteľka.",
        gender: "F",
        srsId: "L03_V09",
        recycledFrom: [],
      },
      {
        de: "jung",
        sk: "mladý/mladá",
        example: "Jana ist jung — sie ist 28 Jahre alt.",
        exampleSk: "Jana je mladá — má 28 rokov.",
        gender: "-",
        srsId: "L03_V10",
        recycledFrom: [],
      },
      {
        de: "alt",
        sk: "starý/stará; koľko rokov",
        example: "Wie alt bist du? — Ich bin 28 Jahre alt.",
        exampleSk: "Koľko máš rokov? — Mám 28 rokov.",
        gender: "-",
        srsId: "L03_V11",
        recycledFrom: [],
      },
      {
        de: "müde",
        sk: "unavený/unavená",
        example: "Ich bin sehr müde nach der Reise.",
        exampleSk: "Som veľmi unavená po ceste.",
        gender: "-",
        srsId: "L03_V12",
        recycledFrom: [],
      },
      {
        de: "nett",
        sk: "milý/milá",
        example: "Dr. Müller ist sehr nett.",
        exampleSk: "Dr. Müller je veľmi milý.",
        gender: "-",
        srsId: "L03_V13",
        recycledFrom: [],
      },
      {
        de: "groß",
        sk: "vysoký / veľký",
        example: "Wien ist groß.",
        exampleSk: "Viedeň je veľká.",
        gender: "-",
        srsId: "L03_V14",
        recycledFrom: ["L01_V10"],
      },
      {
        de: "klein",
        sk: "malý/malá",
        example: "Das Zimmer ist klein.",
        exampleSk: "Izba je malá.",
        gender: "-",
        srsId: "L03_V15",
        recycledFrom: ["L01_V10"],
      },
    ],
    exercises: [
      {
        type: "flashcard",
        instruction:
          "Naučíme sa časovanie sein. Na každej karte je osobné zámeno — otočením uvidíš správny tvar sein.",
        items: [
          "ich → bin",
          "du → bist",
          "er/sie/es → ist",
          "wir → sind",
          "ihr → seid",
          "sie (oni) → sind",
          "Sie (formálne Vy) → sind",
          "sein — byť (infinitív)",
          "Ich bin nett. → Som milý/á.",
          "Er ist jung. → On je mladý.",
          "Wir sind aus Bratislava. → Sme z Bratislavy.",
          "Sie sind Lehrerin. → Ste učiteľka. (formálne)",
        ],
      },
      {
        type: "mcq",
        instruction:
          "Vyber správny tvar slovesa sein. Dávaj pozor na sie/Sie/er rozdiely!",
        questions: [
          {
            question: "Jana ___ 28 Jahre alt.",
            options: ["bin", "bist", "ist", "sind"],
            answer: 2,
            explanation:
              "Jana = er/sie/es (ona) → ist. Pozor: v slovenčine má 28 rokov (mať), ale v nemčine IST 28 Jahre alt (byť)!",
          },
          {
            question: "Ich ___ Marketingmanagerin.",
            options: ["bin", "bist", "ist", "sind"],
            answer: 0,
            explanation:
              "Ich = bin. Ich bin Marketingmanagerin. Pozor: pri povolaní BEZ člena!",
          },
          {
            question: "Du ___ sehr nett!",
            options: ["bin", "bist", "ist", "sind"],
            answer: 1,
            explanation:
              "Du = bist. Du bist sehr nett! Bist je 2. osoba jednotného čísla.",
          },
          {
            question: "Jana a jej kolegyňa sú unavené. Wir ___ sehr müde.",
            options: ["bin", "bist", "ist", "sind"],
            answer: 3,
            explanation: "Wir (my) = sind. Wir sind sehr müde.",
          },
          {
            question:
              "POZOR na pasce! Jana hovorí o dvoch kolegoch a formálne o šéfovi. Aká forma sein sa používa pre sie (oni) aj für Sie (Vy formálne)?",
            options: [
              "ist pre oboch",
              "sind pre oboch — forma je rovnaká!",
              "sind pre oni, ist pre Vy",
              "seid pre oboch",
            ],
            answer: 1,
            explanation:
              "sie (oni) = sind, Sie (Vy formálne) = sind. Obe formy sú IDENTICKÉ! Rozdiel je len v kontexte a písaní (veľké S = formálne).",
          },
          {
            question: "Wie alt ___ du? — Ich ___ neunundzwanzig Jahre alt.",
            options: [
              "bist / bin",
              "ist / bin",
              "bist / ist",
              "sind / bin",
            ],
            answer: 0,
            explanation:
              "Du → bist (otázka); Ich → bin (odpoveď). Wie alt bist du? — Ich bin neunundzwanzig Jahre alt.",
          },
        ],
      },
      {
        type: "fill",
        instruction:
          "Doplň správny tvar slovesa sein. Premýšľaj, kto hovorí alebo o kom sa hovorí.",
        questions: [
          {
            sentence: "Ich ___ Jana. Ich ___ 28 Jahre alt.",
            answer: "bin / bin",
            hint: "1. osoba jednotného čísla",
            explanation: "Ich → bin. Ich bin Jana. Ich bin 28 Jahre alt.",
          },
          {
            sentence: "Dr. Müller ___ sehr nett. Er ___ mein Chef.",
            answer: "ist / ist",
            hint: "er/sie/es — 3. osoba jednotného čísla",
            explanation: "Dr. Müller = er → ist.",
          },
          {
            sentence: "Wir ___ neu in Wien.",
            answer: "sind",
            hint: "wir — 1. osoba množného čísla",
            explanation: "Wir → sind.",
          },
          {
            sentence: "Jana und Stefan ___ Kollegen.",
            answer: "sind",
            hint: "Dve osoby = množné číslo",
            explanation: "Jana und Stefan = množné číslo → sind.",
          },
          {
            sentence: "Ich ___ Studentin. (Bez článku — pravidlo povolania!)",
            answer: "bin",
            hint: "ich = bin, povolanie bez člena",
            explanation:
              "Ich bin Studentin. — nie eine Studentin! Povolania po sein idú bez neurčitého člena.",
          },
        ],
      },
      {
        type: "listen",
        instruction:
          "Počúvaj vetu. Urči: hovorí Jana O SEBE (ich), O NIEKM INOM (er/sie), alebo FORMÁLNE (Sie)?",
        questions: [
          { de: "Ich bin 28 Jahre alt.", sk: "O sebe — ich" },
          { de: "Sie ist sehr nett.", sk: "O tretej osobe — ona (sie, malé s)" },
          { de: "Sie sind aus Österreich.", sk: "Formálne Vy ALEBO oni — len kontext rozhodne" },
          { de: "Wir sind neu hier.", sk: "My — wir" },
          { de: "Er ist Lehrer.", sk: "On — er" },
          { de: "Ich bin Studentin.", sk: "O sebe, Jana je žena → Studentin" },
        ],
      },
      {
        type: "match",
        instruction:
          "Spoj osobné zámeno so správnym tvarom slovesa sein.",
        pairs: [
          ["ich", "bin"],
          ["du", "bist"],
          ["er / sie / es", "ist"],
          ["wir", "sind"],
          ["ihr", "seid"],
          ["sie (oni) / Sie (Vy)", "sind"],
        ],
      },
    ],
    reviewWords: ["L01_V06", "L02_V17", "L02_V18"],
    lessonNotes:
      "sein je základ nemčiny. sie/Sie pasca musí byť vysvetlená explicitne. Kľúčový omyl: Ich HABE 28 Jahre → NESPRÁVNE. Povolanie BEZ člena: Ich bin Studentin nie eine Studentin.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // L04 — Wie heißt du? — W-Fragen und Wortstellung
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 4,
    week: 1,
    day: 4,
    title: "Wie heißt du? — W-Fragen und Wortstellung",
    topic: "Otázky s W- a poradie slov vo vete",
    cefr: "A1",
    xpReward: 25,
    narrativeContext:
      "Jana prichádza na pohovor. Dr. Müller sa jej vypytuje formálne: Woher kommen Sie? Wie alt sind Sie? Jana musí odpovedať správne — sloveso vždy na druhom mieste!",
    communicativeGoal:
      "Po tejto lekcii viem sa opýtať a odpovedať na základné otázky: Ako sa voláš? Odkiaľ si? Koľko máš rokov?",
    skillFocus: ["grammar", "speaking", "listening"],
    grammarNote: {
      rule: "Pravidlo V2 (Verb-Second) — sloveso vždy na 2. mieste!",
      explanation:
        "V nemčine musí byť časované sloveso VŽDY na DRUHOM mieste v oznamovacej vete. W-slovo zaujíma prvé miesto, sloveso druhé. Toto je najdôležitejšie pravidlo nemeckej syntaxe!",
      examples: [
        {
          de: "Woher [1] kommen [2] Sie?",
          sk: "Odkiaľ pochádzate? (Woher=1, kommen=2)",
        },
        {
          de: "Ich [1] komme [2] aus Bratislava.",
          sk: "Pochádzam z Bratislavy.",
        },
        {
          de: "Wie alt [1] bist [2] du?",
          sk: "Koľko máš rokov?",
        },
        {
          de: "Aus Bratislava [1] komme [2] ich.",
          sk: "Z Bratislavy pochádzam ja. (inverzia, ale stále V2!)",
        },
      ],
      slovakContrastNote:
        "V slovenčine môžeš slovosled meniť podľa dôrazu: Odkiaľ si? / Si odkiaľ? / Ty odkiaľ si? — všetko je správne. V nemčine nie! Sloveso MUSÍ byť na 2. mieste. Chyba: *Woher du kommst? — NESPRÁVNE!",
    },
    vocab: [
      {
        de: "kommen",
        sk: "pochádzať, prísť",
        example: "Woher kommen Sie? — Ich komme aus Bratislava.",
        exampleSk: "Odkiaľ pochádzate? — Pochádzam z Bratislavy.",
        gender: "-",
        srsId: "L04_V01",
        recycledFrom: [],
      },
      {
        de: "wohnen",
        sk: "bývať",
        example: "Wo wohnen Sie in Wien?",
        exampleSk: "Kde bývate vo Viedni?",
        gender: "-",
        srsId: "L04_V02",
        recycledFrom: [],
      },
      {
        de: "wer",
        sk: "kto",
        example: "Wer sind Sie?",
        exampleSk: "Kto ste?",
        gender: "-",
        srsId: "L04_V03",
        recycledFrom: [],
      },
      {
        de: "was",
        sk: "čo",
        example: "Was sind Sie von Beruf?",
        exampleSk: "Čím ste, aké je vaše povolanie?",
        gender: "-",
        srsId: "L04_V04",
        recycledFrom: [],
      },
      {
        de: "wo",
        sk: "kde",
        example: "Wo wohnen Sie?",
        exampleSk: "Kde bývate?",
        gender: "-",
        srsId: "L04_V05",
        recycledFrom: [],
      },
      {
        de: "woher",
        sk: "odkiaľ",
        example: "Woher kommen Sie?",
        exampleSk: "Odkiaľ pochádzate?",
        gender: "-",
        srsId: "L04_V06",
        recycledFrom: [],
      },
      {
        de: "wie",
        sk: "ako",
        example: "Wie heißen Sie?",
        exampleSk: "Ako sa voláte?",
        gender: "-",
        srsId: "L04_V07",
        recycledFrom: [],
      },
      {
        de: "wann",
        sk: "kedy",
        example: "Wann beginnt der Termin?",
        exampleSk: "Kedy začína stretnutie?",
        gender: "-",
        srsId: "L04_V08",
        recycledFrom: [],
      },
      {
        de: "warum",
        sk: "prečo",
        example: "Warum lernen Sie Deutsch?",
        exampleSk: "Prečo sa učíte nemčinu?",
        gender: "-",
        srsId: "L04_V09",
        recycledFrom: [],
      },
      {
        de: "aus",
        sk: "z (predložka pôvodu)",
        example: "Ich komme aus der Slowakei.",
        exampleSk: "Pochádzam zo Slovenska.",
        gender: "-",
        srsId: "L04_V10",
        recycledFrom: [],
      },
      {
        de: "der Chef / die Chefin",
        sk: "šéf / šéfka",
        example: "Das ist mein Chef, Dr. Müller.",
        exampleSk: "To je môj šéf, Dr. Müller.",
        gender: "M",
        srsId: "L04_V11",
        recycledFrom: [],
      },
      {
        de: "das Büro",
        sk: "kancelária",
        example: "Das Büro ist im ersten Bezirk.",
        exampleSk: "Kancelária je v prvom okrese.",
        gender: "N",
        srsId: "L04_V12",
        recycledFrom: [],
      },
      {
        de: "natürlich",
        sk: "samozrejme",
        example: "Natürlich spreche ich Deutsch!",
        exampleSk: "Samozrejme hovorím po nemecky!",
        gender: "-",
        srsId: "L04_V13",
        recycledFrom: [],
      },
    ],
    exercises: [
      {
        type: "flashcard",
        instruction:
          "Nauč sa všetky W-otázkové slová naspamäť. Na karte je nemecké slovo — otočením uvidíš slovenský preklad.",
        items: [
          "wer → kto",
          "was → čo",
          "wo → kde",
          "woher → odkiaľ",
          "wohin → kam",
          "wie → ako",
          "wann → kedy",
          "warum → prečo",
          "wie alt → koľko rokov",
          "kommen → pochádzať, prísť",
          "wohnen → bývať",
          "Woher kommen Sie? → Odkiaľ pochádzate?",
          "Wie heißen Sie? → Ako sa voláte?",
          "Wo wohnen Sie? → Kde bývate?",
        ],
      },
      {
        type: "mcq",
        instruction:
          "Vyber správnu vetu s pravidlom V2. Pamätaj: sloveso VŽDY na 2. mieste!",
        questions: [
          {
            question:
              "Jana sa pýta šéfa, odkiaľ pochádza. Ktorá veta je SPRÁVNA?",
            options: [
              "Woher du kommst?",
              "Woher kommen Sie?",
              "Sie kommen woher?",
              "Woher Sie kommen?",
            ],
            answer: 1,
            explanation:
              "V2 pravidlo: Woher (poz.1) + kommen (poz.2) + Sie (poz.3). Woher kommen Sie? je jediná správna forma.",
          },
          {
            question:
              "Ako sa pýtaš neformálne na meno kamaráta?",
            options: [
              "Wie heißen Sie?",
              "Wie ist Ihr Name?",
              "Wie heißt du?",
              "Wer bist Sie?",
            ],
            answer: 2,
            explanation:
              "Wie heißt du? je neformálna otázka na meno. Wie heißen Sie? je formálna.",
          },
          {
            question:
              "Jana odpovedá na otázku, odkiaľ je. Ktorá veta je SPRÁVNA?",
            options: [
              "Ich aus Bratislava komme.",
              "Aus Bratislava komme ich.",
              "Ich komme aus Bratislava.",
              "Komme ich aus Bratislava.",
            ],
            answer: 2,
            explanation:
              "Ich komme aus Bratislava. — Ich (poz.1) + komme (poz.2). Varianta Aus Bratislava komme ich je tiež správna (inverzia).",
          },
          {
            question:
              "Kde pracuje Jana? Vyber otázku so správnym W-slovom.",
            options: [
              "Wer arbeitet Jana?",
              "Was arbeitet Jana?",
              "Wo arbeitet Jana?",
              "Woher arbeitet Jana?",
            ],
            answer: 2,
            explanation:
              "Wo = kde. Wo arbeitet Jana? — kde pracuje Jana?",
          },
          {
            question:
              "Kolegyňa sa pýta Jany, prečo sa učí nemčinu. Aká je správna otázka?",
            options: [
              "Wann lernst du Deutsch?",
              "Warum lernst du Deutsch?",
              "Was lernst du Deutsch?",
              "Wo lernst du Deutsch?",
            ],
            answer: 1,
            explanation:
              "Warum = prečo. Warum lernst du Deutsch? — prečo sa učíš nemčinu?",
          },
          {
            question:
              "Jana sa opýta šéfa formálne na jeho vek. Ako znie otázka?",
            options: [
              "Wie alt bist du?",
              "Wie alt ist er?",
              "Wie alt sind Sie?",
              "Wer alt sind Sie?",
            ],
            answer: 2,
            explanation:
              "Formálna otázka na vek: Wie alt sind Sie? — Wie alt (poz.1) + sind (poz.2) + Sie (poz.3). Neformálne: Wie alt bist du?",
          },
        ],
      },
      {
        type: "fill",
        instruction:
          "Doplň správne W-slovo tak, aby otázka dávala zmysel. Vety sú z Janiho pohovoru.",
        questions: [
          {
            sentence: "___ heißen Sie? — Ich heiße Jana Nováková.",
            answer: "Wie",
            hint: "Pýtame sa na meno — ako (meno)",
            explanation: "Wie heißen Sie? = Ako sa voláte? Wie = ako.",
          },
          {
            sentence: "___ kommen Sie? — Ich komme aus der Slowakei.",
            answer: "Woher",
            hint: "Pýtame sa na pôvod, odkiaľ",
            explanation: "Woher kommen Sie? = Odkiaľ pochádzate?",
          },
          {
            sentence: "___ wohnen Sie in Wien? — Ich wohne in Mariahilf.",
            answer: "Wo",
            hint: "Pýtame sa na miesto",
            explanation: "Wo wohnen Sie? = Kde bývate?",
          },
          {
            sentence: "___ alt sind Sie? — Ich bin achtundzwanzig Jahre alt.",
            answer: "Wie",
            hint: "Wie alt = koľko rokov",
            explanation: "Wie alt sind Sie? = Koľko máte rokov?",
          },
        ],
      },
      {
        type: "listen",
        instruction:
          "Počúvaj otázku. Napíš, čo sa pýta: meno / vek / pôvod / miesto / povolanie.",
        questions: [
          { de: "Wie heißen Sie?", sk: "Meno" },
          { de: "Woher kommen Sie?", sk: "Pôvod / odkiaľ" },
          { de: "Wo wohnen Sie?", sk: "Miesto / kde býva" },
          { de: "Wie alt sind Sie?", sk: "Vek" },
          { de: "Was sind Sie von Beruf?", sk: "Povolanie" },
          { de: "Warum lernen Sie Deutsch?", sk: "Dôvod / prečo" },
        ],
      },
      {
        type: "match",
        instruction: "Spoj W-otázkové slovo s jeho slovenským prekladom.",
        pairs: [
          ["wer", "kto"],
          ["was", "čo"],
          ["wo", "kde"],
          ["woher", "odkiaľ"],
          ["wie", "ako"],
          ["wann", "kedy"],
          ["warum", "prečo"],
          ["wie alt", "koľko rokov"],
        ],
      },
    ],
    reviewWords: ["L02_V03", "L02_V06", "L03_V01", "L03_V02"],
    lessonNotes:
      "V2 je najdôležitejšie syntaktické pravidlo nemčiny. Vizualizácia sloveso vždy na stoličke č. 2 funguje dobre. Slovenčina nemá V2 — toto je skutočne nové.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // L05 — Zahlen 0–20 und haben
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 5,
    week: 1,
    day: 5,
    title: "Zahlen 0–20 und haben",
    topic: "Čísla 0–20 a sloveso mať — haben",
    cefr: "A1",
    xpReward: 20,
    narrativeContext:
      "Jana vypĺňa formulár pre novú prácu vo Viedni. Musí uviesť vek a telefónne číslo. Recepčná sa pýta: Wie ist Ihre Telefonnummer?",
    communicativeGoal:
      "Po tejto lekcii viem povedať čísla 0–20, povedať koľko mám rokov, dať niekomu telefónne číslo a povedať, čo mám.",
    skillFocus: ["vocabulary", "grammar", "listening"],
    grammarNote: {
      rule: "haben (mať) — časovanie + POZOR: vek = sein, nie haben!",
      explanation:
        "Sloveso haben (mať) sa časuje — tvar hat pre er/sie/es je odlišný od ostatných. Najdôležitejšia pasca: VEK sa vyjadruje so sein (byť), NIE s haben (mať)!",
      examples: [
        { de: "ich habe", sk: "ja mám" },
        { de: "du hast", sk: "ty máš" },
        { de: "er/sie/es hat", sk: "on/ona/ono má" },
        { de: "wir haben", sk: "my máme" },
        { de: "ihr habt", sk: "vy máte" },
        { de: "sie/Sie haben", sk: "oni majú / Vy máte" },
      ],
      slovakContrastNote:
        "KRITICKÝ OMYL: Slovenčina hovorí MÁM 28 rokov — to zvádza povedať Ich HABE 28 Jahre. To je NESPRÁVNE! Nemčina hovorí Ich BIN 28 Jahre alt. Vek = sein! Mnemotechnika: vek ťa definuje — SOM mladý/starý.",
    },
    vocab: [
      {
        de: "null",
        sk: "nula",
        example: "Meine Nummer beginnt mit null.",
        exampleSk: "Moje číslo začína nulou.",
        gender: "-",
        srsId: "L05_V01",
        recycledFrom: [],
      },
      {
        de: "eins",
        sk: "jeden/jedna",
        example: "Ich habe ein Kind.",
        exampleSk: "Mám jedno dieťa.",
        gender: "-",
        srsId: "L05_V02",
        recycledFrom: [],
      },
      {
        de: "zwei",
        sk: "dva/dve",
        example: "Ich habe zwei Schwestern.",
        exampleSk: "Mám dve sestry.",
        gender: "-",
        srsId: "L05_V03",
        recycledFrom: [],
      },
      {
        de: "drei",
        sk: "tri",
        example: "Das kostet drei Euro.",
        exampleSk: "To stojí tri eurá.",
        gender: "-",
        srsId: "L05_V04",
        recycledFrom: [],
      },
      {
        de: "vier",
        sk: "štyri",
        example: "Ich warte vier Minuten.",
        exampleSk: "Čakám štyri minúty.",
        gender: "-",
        srsId: "L05_V05",
        recycledFrom: [],
      },
      {
        de: "fünf",
        sk: "päť",
        example: "Ich habe fünf Bücher.",
        exampleSk: "Mám päť kníh.",
        gender: "-",
        srsId: "L05_V06",
        recycledFrom: [],
      },
      {
        de: "sechs",
        sk: "šesť",
        example: "Es ist sechs Uhr.",
        exampleSk: "Je šesť hodín.",
        gender: "-",
        srsId: "L05_V07",
        recycledFrom: [],
      },
      {
        de: "sieben",
        sk: "sedem",
        example: "Der Bus kommt um sieben.",
        exampleSk: "Autobus príde o siedmej.",
        gender: "-",
        srsId: "L05_V08",
        recycledFrom: [],
      },
      {
        de: "acht",
        sk: "osem",
        example: "Der Termin ist um acht Uhr.",
        exampleSk: "Stretnutie je o ôsmej.",
        gender: "-",
        srsId: "L05_V09",
        recycledFrom: [],
      },
      {
        de: "neun",
        sk: "deväť",
        example: "Jana ist um neun Uhr im Büro.",
        exampleSk: "Jana je o deviatej v kancelárii.",
        gender: "-",
        srsId: "L05_V10",
        recycledFrom: [],
      },
      {
        de: "zehn",
        sk: "desať",
        example: "Das kostet zehn Euro.",
        exampleSk: "To stojí desať eur.",
        gender: "-",
        srsId: "L05_V11",
        recycledFrom: [],
      },
      {
        de: "elf",
        sk: "jedenásť",
        example: "Es ist elf Uhr.",
        exampleSk: "Je jedenásť hodín.",
        gender: "-",
        srsId: "L05_V12",
        recycledFrom: [],
      },
      {
        de: "zwölf",
        sk: "dvanásť",
        example: "Die Mittagspause ist um zwölf.",
        exampleSk: "Obedňajšia prestávka je o dvanástej.",
        gender: "-",
        srsId: "L05_V13",
        recycledFrom: [],
      },
      {
        de: "dreizehn",
        sk: "trinásť",
        example: "Dreizehn — manche sagen, das bringt Pech.",
        exampleSk: "Trinásť — niektorí hovoria, že prináša smolu.",
        gender: "-",
        srsId: "L05_V14",
        recycledFrom: [],
      },
      {
        de: "vierzehn",
        sk: "štrnásť",
        example: "Mit vierzehn lernte Jana Englisch.",
        exampleSk: "V štrnástich sa Jana učila angličtinu.",
        gender: "-",
        srsId: "L05_V15",
        recycledFrom: [],
      },
      {
        de: "fünfzehn",
        sk: "pätnásť",
        example: "Es sind noch fünfzehn Minuten.",
        exampleSk: "Je ešte pätnásť minút.",
        gender: "-",
        srsId: "L05_V16",
        recycledFrom: [],
      },
      {
        de: "sechzehn ⚠️",
        sk: "šestnásť (POZOR: nie sechszehn!)",
        example: "Mit sechzehn machte Jana den Führerschein.",
        exampleSk: "V šestnástich si Jana robila vodičský preukaz.",
        gender: "-",
        srsId: "L05_V17",
        recycledFrom: [],
      },
      {
        de: "siebzehn ⚠️",
        sk: "sedemnásť (POZOR: nie siebenzehn!)",
        example: "Mit siebzehn lernte Jana Gitarre.",
        exampleSk: "V sedemnástich sa Jana učila hrať na gitare.",
        gender: "-",
        srsId: "L05_V18",
        recycledFrom: [],
      },
      {
        de: "achtzehn",
        sk: "osemnásť",
        example: "Mit achtzehn ist man volljährig.",
        exampleSk: "V osemnástich je človek plnoletý.",
        gender: "-",
        srsId: "L05_V19",
        recycledFrom: [],
      },
      {
        de: "neunzehn",
        sk: "devätnásť",
        example: "Neunzehn Euro — das ist günstig!",
        exampleSk: "Devätnásť eur — to je lacné!",
        gender: "-",
        srsId: "L05_V20",
        recycledFrom: [],
      },
      {
        de: "zwanzig",
        sk: "dvadsať",
        example: "Jana lernt zwanzig Wörter pro Tag.",
        exampleSk: "Jana sa učí dvadsať slov za deň.",
        gender: "-",
        srsId: "L05_V21",
        recycledFrom: [],
      },
      {
        de: "haben",
        sk: "mať",
        example: "Ich habe eine Frage.",
        exampleSk: "Mám otázku.",
        gender: "-",
        srsId: "L05_V22",
        recycledFrom: [],
      },
    ],
    exercises: [
      {
        type: "flashcard",
        instruction:
          "Nauč sa čísla 0–20. Dve čísla sú špeciálne — dávaj pozor na ich pravopis!",
        items: [
          "0 → null",
          "1 → eins",
          "2 → zwei",
          "3 → drei",
          "4 → vier",
          "5 → fünf",
          "6 → sechs",
          "7 → sieben",
          "8 → acht",
          "9 → neun",
          "10 → zehn",
          "11 → elf",
          "12 → zwölf",
          "13 → dreizehn",
          "14 → vierzehn",
          "15 → fünfzehn",
          "16 → sechzehn ⚠️ (nie sechszehn!)",
          "17 → siebzehn ⚠️ (nie siebenzehn!)",
          "18 → achtzehn",
          "19 → neunzehn",
          "20 → zwanzig",
          "haben → mať: ich habe / du hast / er hat / wir haben / ihr habt / sie haben",
        ],
      },
      {
        type: "mcq",
        instruction:
          "Vyber správnu odpoveď. Testujeme čísla, haben a kritickú pascu s vekom!",
        questions: [
          {
            question: "Ako správne napíšeme šestnásť po nemecky?",
            options: ["sechszehn", "sechzehn", "siebenzehn", "siebzehn"],
            answer: 1,
            explanation:
              "Správne je sechzehn — konečné S z sechs vypadáva. Sechszehn je NESPRÁVNE. Rovnako: siebzehn (nie siebenzehn).",
          },
          {
            question: "Ako správne napíšeme sedemnásť po nemecky?",
            options: ["siebenzehn", "siebzehn", "siebszehn", "sechzehn"],
            answer: 1,
            explanation:
              "Správne je siebzehn — prípona -en z sieben vypadáva pred -zehn.",
          },
          {
            question: "Jana má 28 rokov. Ako to povie po nemecky?",
            options: [
              "Ich habe 28 Jahre.",
              "Ich bin 28 Jahr alt.",
              "Ich bin achtundzwanzig Jahre alt.",
              "Ich habe achtundzwanzig Jahre alt.",
            ],
            answer: 2,
            explanation:
              "VEK sa vyjadruje so sein: Ich BIN achtundzwanzig Jahre alt. Pozor: Jahre (plural, nie Jahr). Nikdy Ich HABE Jahre!",
          },
          {
            question: "Aký je správny er/sie/es tvar slovesa haben?",
            options: ["haben", "habt", "hat", "hast"],
            answer: 2,
            explanation:
              "er/sie/es hat — toto je jediný skutočne odlišný tvar. Ostatné sa riadia pravidelnou príponou.",
          },
          {
            question:
              "Jana hovorí telefónne číslo: null-sieben-eins... Číslo sieben je?",
            options: ["6", "7", "8", "9"],
            answer: 1,
            explanation:
              "Sieben = 7. Sechs = 6, sieben = 7, acht = 8.",
          },
        ],
      },
      {
        type: "fill",
        instruction:
          "Doplň číslo slovom alebo správny tvar haben. Jana vypĺňa formulár.",
        questions: [
          {
            sentence: "Ich ___ 28 Jahre alt. (vek — haben alebo sein?)",
            answer: "bin",
            hint: "Vek = sein!",
            explanation:
              "Vek sa vyjadruje so sein: Ich BIN 28 Jahre alt. Nikdy haben!",
          },
          {
            sentence: "Jana hat eine Schwester und ___ Brüder. (Jana má dvoch bratov)",
            answer: "zwei",
            hint: "Číslovka 2",
            explanation: "Zwei = dva. Jana hat eine Schwester und zwei Brüder.",
          },
          {
            sentence: "Meine Telefonnummer: null - sieben - eins - ___. (štyri)",
            answer: "vier",
            hint: "Číslovka 4",
            explanation: "Vier = štyri.",
          },
          {
            sentence: "Es ist ___ Uhr. (18:00 — osemnásť hodín)",
            answer: "achtzehn",
            hint: "18 = acht + zehn",
            explanation: "Achtzehn Uhr = 18:00.",
          },
          {
            sentence: "Ich ___ keine Geschwister. (Nemám žiadnych súrodencov)",
            answer: "habe",
            hint: "haben, 1. osoba jednotného čísla",
            explanation:
              "Ich habe keine Geschwister. — haben, 1. osoba: habe.",
          },
        ],
      },
      {
        type: "listen",
        instruction:
          "Recepčná diktuje čísla. Napíš ich ako číslice. Precvič si, ako Jana počuje telefónne číslo.",
        questions: [
          { de: "sieben", sk: "7" },
          { de: "zwölf", sk: "12" },
          { de: "sechzehn", sk: "16" },
          { de: "zwanzig", sk: "20" },
          { de: "drei", sk: "3" },
          { de: "achtzehn", sk: "18" },
          { de: "neun", sk: "9" },
          { de: "elf", sk: "11" },
        ],
      },
      {
        type: "match",
        instruction: "Spoj číslo so slovenským názvom.",
        pairs: [
          ["8", "acht"],
          ["11", "elf"],
          ["15", "fünfzehn"],
          ["16 ⚠️", "sechzehn"],
          ["17 ⚠️", "siebzehn"],
          ["12", "zwölf"],
          ["20", "zwanzig"],
          ["0", "null"],
        ],
      },
    ],
    reviewWords: ["L03_V11", "L03_V01", "L02_V03"],
    lessonNotes:
      "Čísla 0–20 musia byť na automatizovanej úrovni — objavia sa v každej ďalšej lekcii. Dve nepravidelnosti (sechzehn, siebzehn) označiť červenou. Pasca vek = sein, nie haben — korigovať preventívne.",
  },
];
