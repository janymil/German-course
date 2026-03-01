export const lesson09 = {
  id: 9,
  week: 2,
  day: 5,
  title: "Länder, Sprachen und Nationalitäten",
  topic: "Krajiny, jazyky a národnosti — negácia",
  cefr: "A1",
  xpReward: 25,
  narrativeContext:
    "Jana sa zoznamuje so spolubývajúcimi z rôznych krajín. Thomas je z Nemecka, Laila z Turecka, Pavel z Česka, Sarah z USA. Rozprávajú sa, odkiaľ kto je a aké jazyky hovoria. Jana musí použiť 'Ich komme aus der Slowakei' — a naučí sa, prečo niektoré krajiny potrebujú člen.",
  communicativeGoal:
    "Po tejto lekcii viem povedať, z akej krajiny pochádzam, aké jazyky hovorím, a viem zaprieť tvrdenie pomocou 'nicht'. Poznám krajiny s členom (die Slowakei, die Schweiz, die USA).",
  skillFocus: ["vocabulary", "grammar", "speaking"],

  grammarNote: {
    rule: "Krajiny s článkom, predložka 'aus' + Dativ, negácia 'nicht'",
    explanation:
      "Väčšina krajín v nemčine NEMÁ člen: aus Deutschland, aus Österreich, aus Tschechien. Ale niektoré krajiny MAJÚ člen (zvyčajne ženský): die Slowakei, die Schweiz, die Türkei, die USA (množné číslo). Po predložke 'aus' nasleduje Dativ: aus der Slowakei (nie 'aus die Slowakei'!). Jazyky sa v nemčine píšu s VEĽKÝM písmenom: Deutsch, Slowakisch, Englisch. Negácia: 'nicht' stojí zvyčajne za prísudkom alebo pred prídavným menom/príslovkou.",
    examples: [
      { de: "aus Deutschland / aus Österreich", sk: "z Nemecka / z Rakúska — bez členu" },
      { de: "aus der Slowakei / aus der Schweiz / aus der Türkei", sk: "zo Slovenska / zo Švajčiarska / z Turecka — s členom!" },
      { de: "aus den USA", sk: "z USA — Dativ množného čísla (den!)" },
      { de: "Ich spreche Deutsch und Slowakisch.", sk: "Hovorím po nemecky a po slovensky — veľké písmeno!" },
      { de: "Ich komme nicht aus Deutschland.", sk: "Nepochádzam z Nemecka — 'nicht' po slovese" }
    ],
    slovakContrastNote:
      "V slovenčine: 'zo Slovenska' — bez členu. V nemčine: 'aus der Slowakei' — s členom v Datíve! To je výrazný rozdiel. Prehľad krajín s členom: die Slowakei, die Schweiz, die Türkei, die Ukraine, die USA (pl.), die Niederlande (pl.). Jazyky v nemčine: VŽDY veľké písmeno (Deutsch, Englisch, Slowakisch) — rozdiel od slovenčiny, kde sú malé (nemčina, angličtina, slovenčina)."
  },

  vocab: [
    {
      de: "Deutschland",
      sk: "Nemecko",
      example: "Ich komme aus Deutschland.",
      exampleSk: "Pochádzam z Nemecka.",
      gender: null,
      srsId: "L09_V01",
      recycledFrom: []
    },
    {
      de: "Österreich",
      sk: "Rakúsko",
      example: "Wien ist die Hauptstadt von Österreich.",
      exampleSk: "Viedeň je hlavné mesto Rakúska.",
      gender: null,
      srsId: "L09_V02",
      recycledFrom: []
    },
    {
      de: "die Slowakei",
      sk: "Slovensko (⚠️ aus der Slowakei!)",
      example: "Ich komme aus der Slowakei, aus Bratislava.",
      exampleSk: "Som zo Slovenska, z Bratislavy.",
      gender: "F",
      srsId: "L09_V03",
      recycledFrom: []
    },
    {
      de: "die Schweiz",
      sk: "Švajčiarsko (⚠️ aus der Schweiz!)",
      example: "In der Schweiz spricht man Deutsch, Französisch und Italienisch.",
      exampleSk: "Vo Švajčiarsku sa hovorí po nemecky, francúzsky a taliansky.",
      gender: "F",
      srsId: "L09_V04",
      recycledFrom: []
    },
    {
      de: "die Türkei",
      sk: "Turecko (⚠️ aus der Türkei!)",
      example: "Laila kommt aus der Türkei.",
      exampleSk: "Laila pochádza z Turecka.",
      gender: "F",
      srsId: "L09_V05",
      recycledFrom: []
    },
    {
      de: "Tschechien",
      sk: "Česko",
      example: "Pavel kommt aus Tschechien.",
      exampleSk: "Pavel pochádza z Česka.",
      gender: null,
      srsId: "L09_V06",
      recycledFrom: []
    },
    {
      de: "Polen",
      sk: "Poľsko",
      example: "Warschau ist die Hauptstadt von Polen.",
      exampleSk: "Varšava je hlavné mesto Poľska.",
      gender: null,
      srsId: "L09_V07",
      recycledFrom: []
    },
    {
      de: "England",
      sk: "Anglicko",
      example: "Ich komme aus England, aus London.",
      exampleSk: "Pochádzam z Anglicka, z Londýna.",
      gender: null,
      srsId: "L09_V08",
      recycledFrom: []
    },
    {
      de: "die USA",
      sk: "Spojené štáty (⚠️ aus den USA!)",
      example: "Sarah kommt aus den USA, aus New York.",
      exampleSk: "Sarah pochádza z USA, z New Yorku.",
      gender: "F/Pl",
      srsId: "L09_V09",
      recycledFrom: []
    },
    {
      de: "Deutsch",
      sk: "nemčina (⚠️ veľké písmeno!)",
      example: "Jana spricht Deutsch und Slowakisch.",
      exampleSk: "Jana hovorí po nemecky a po slovensky.",
      gender: null,
      srsId: "L09_V10",
      recycledFrom: []
    },
    {
      de: "Slowakisch",
      sk: "slovenčina (⚠️ veľké písmeno!)",
      example: "Ich spreche Slowakisch — meine Muttersprache.",
      exampleSk: "Hovorím po slovensky — môj materinský jazyk.",
      gender: null,
      srsId: "L09_V11",
      recycledFrom: []
    },
    {
      de: "Englisch",
      sk: "angličtina (⚠️ veľké písmeno!)",
      example: "Sprechen Sie Englisch?",
      exampleSk: "Hovoríte po anglicky?",
      gender: null,
      srsId: "L09_V12",
      recycledFrom: []
    },
    {
      de: "Tschechisch",
      sk: "čeština (⚠️ veľké písmeno!)",
      example: "Pavel spricht Tschechisch und ein bisschen Deutsch.",
      exampleSk: "Pavel hovorí po česky a trochu po nemecky.",
      gender: null,
      srsId: "L09_V13",
      recycledFrom: []
    },
    {
      de: "sprechen",
      sk: "hovoriť (⚠️ du sprichst, er spricht!)",
      example: "Ich spreche Deutsch. Du sprichst gut! Er spricht schnell.",
      exampleSk: "Hovorím po nemecky. Hovoríš dobre! Hovorí rýchlo.",
      gender: null,
      srsId: "L09_V14",
      recycledFrom: []
    },
    {
      de: "die Sprache",
      sk: "jazyk",
      example: "Wie viele Sprachen sprichst du?",
      exampleSk: "Koľko jazykov hovoríš?",
      gender: "F",
      srsId: "L09_V15",
      recycledFrom: []
    },
    {
      de: "das Land",
      sk: "krajina",
      example: "Aus welchem Land kommst du?",
      exampleSk: "Z akej krajiny pochádzaš?",
      gender: "N",
      srsId: "L09_V16",
      recycledFrom: []
    },
    {
      de: "nicht",
      sk: "nie / ne- (negácia)",
      example: "Ich komme nicht aus Deutschland. Das ist nicht richtig.",
      exampleSk: "Nepochádzam z Nemecka. To nie je správne.",
      gender: null,
      srsId: "L09_V17",
      recycledFrom: []
    },
    {
      de: "richtig",
      sk: "správne / pravdivé",
      example: "Das ist richtig! — Das ist nicht richtig.",
      exampleSk: "To je správne! — To nie je správne.",
      gender: null,
      srsId: "L09_V18",
      recycledFrom: []
    }
  ],

  exercises: [
    {
      type: "flashcard",
      instruction:
        "Precvičuj krajiny, jazyky a kľúčové frázy. ⚠️ = dôležité upozornenie na výnimku.",
      items: [
        "Deutschland = Nemecko",
        "Österreich = Rakúsko",
        "die Slowakei = Slovensko (⚠️ aus der Slowakei!)",
        "die Schweiz = Švajčiarsko (⚠️ aus der Schweiz!)",
        "die Türkei = Turecko (⚠️ aus der Türkei!)",
        "Tschechien = Česko",
        "Polen = Poľsko",
        "England = Anglicko",
        "die USA = Spojené štáty (⚠️ aus den USA!)",
        "Deutsch = nemčina (⚠️ veľké D!)",
        "Slowakisch = slovenčina (⚠️ veľké S!)",
        "Englisch = angličtina (⚠️ veľké E!)",
        "Tschechisch = čeština",
        "sprechen = hovoriť (⚠️ du sprichst, er spricht!)",
        "die Sprache = jazyk",
        "das Land = krajina",
        "nicht = nie / ne-",
        "richtig = správne"
      ]
    },
    {
      type: "mcq",
      instruction:
        "Jana a jej spolubývajúci sa navzájom spoznávajú. Vyber správnu odpoveď.",
      questions: [
        {
          question: "Jana hovorí o sebe: 'Ich komme aus ___.' Ktorá forma je správna?",
          options: [
            "die Slowakei",
            "der Slowakei",
            "das Slowakei",
            "Slowakei"
          ],
          answer: 1,
          explanation:
            "'aus' + Dativ. Die Slowakei je ženský rod → Dativ = der. Teda: 'aus der Slowakei'. Toto je klasická chyba — pamätaj: krajiny s členom vyžadujú Dativ po 'aus'. aus die → aus DER (F), aus das → aus DEM (N), aus der → aus DER (zostáva)."
        },
        {
          question: "Thomas povie: 'Ich spreche Deutsch.' Čo je NESPRÁVNE na tejto vete, ak ju povie Jana o Thomasovi?",
          options: [
            "Nič — veta je správna",
            "Jana by mala povedať: 'Er spricht Deutsch.' (nie 'spricht' → 'spreche')",
            "Jana by mala povedať: 'Er spreche Deutsch.'",
            "Jana by mala povedať: 'Er sprecht Deutsch.'"
          ],
          answer: 1,
          explanation:
            "'sprechen' je silné (nepravidelné) sloveso: ich SPRECHe, du SPRICHst, er/sie/es SPRICHt, wir sprechen, ihr sprecht, sie sprechen. Pre 3. osobu (er Thomas) → 'er SPRICHT'. Vokalická zmena e → i je typická pre silné slovesá!"
        },
        {
          question: "Sarah pochádza z USA. Ako sa povie 'z USA' po nemecky?",
          options: [
            "aus die USA",
            "aus das USA",
            "aus den USA",
            "aus der USA"
          ],
          answer: 2,
          explanation:
            "'die USA' je množné číslo (pl.). Dativ množného čísla → DEN (plural). Teda: 'aus den USA'. Toto je výnimka — USA sa správajú ako množné číslo!"
        },
        {
          question: "Laila hovorí: 'Sprechen Sie Tschechisch?' Jana odpovedá záporne. Ktorá odpoveď je správna?",
          options: [
            "Nein, ich spreche kein Tschechisch.",
            "Nein, ich spreche nicht Tschechisch.",
            "Nein, ich sprechen kein Tschechisch.",
            "Nein, ich nicht spreche Tschechisch."
          ],
          answer: 0,
          explanation:
            "Pri negácii podstatného mena (jazyka, predmetu) sa používa 'kein/keine' (nie 'nicht'). 'Ich spreche kein Tschechisch' = Nehovorím po česky. 'nicht' sa používa na negáciu slovesa alebo prídavného mena: 'Das ist nicht richtig.'"
        },
        {
          question: "Prečo sa v nemčine jazyky píšu s veľkým písmenom (Deutsch, Englisch)?",
          options: [
            "Iba v Rakúsku — v Nemecku sú malé písmená",
            "Pretože sú to prídavné mená",
            "Pretože sú to podstatné mená (substantivizované) — v nemčine sa všetky podstatné mená píšu s veľkým písmenom",
            "Je to len tradícia, nemá gramatické odôvodnenie"
          ],
          answer: 2,
          explanation:
            "V nemčine platí pravidlo: VŠETKY podstatné mená sa píšu s veľkým začiatočným písmenom. Jazyky (Deutsch, Englisch) sú podstatné mená → veľké písmeno. V slovenčine jazyky sú prídavné mená ('nemecký jazyk') alebo podstatné mená s malým ('nemčina', 'angličtina')."
        }
      ]
    },
    {
      type: "fill",
      instruction:
        "Doplň správny tvar. Jana a spolubývajúci sa rozprávajú.",
      questions: [
        {
          sentence: "Ich komme aus ___ Slowakei, aus Bratislava.",
          answer: "der",
          hint: "die Slowakei v Datíve po 'aus'",
          explanation:
            "'aus' vyžaduje Dativ. Die Slowakei (F) → Dativ = der Slowakei. Teda 'aus der Slowakei'. Pamätaj: die → der (Dativ femininum)."
        },
        {
          sentence: "Thomas ___ Deutsch und ein bisschen Spanisch. (hovoriť — er-forma)",
          answer: "spricht",
          hint: "sprechen je silné sloveso — e → i pri du a er",
          explanation:
            "sprechen: ich spreche, du sprichst, er/sie/es SPRICHT. Vokalická zmena e → i. 'Thomas spricht Deutsch.' = Thomas hovorí po nemecky."
        },
        {
          sentence: "Laila kommt aus ___ Türkei.",
          answer: "der",
          hint: "die Türkei v Datíve",
          explanation:
            "'die Türkei' (F) → Dativ after 'aus' → 'aus der Türkei'. Rovnaké pravidlo ako Slowakei a Schweiz."
        },
        {
          sentence: "Das ist ___ richtig — ich komme NICHT aus Deutschland, sondern aus der Slowakei!",
          answer: "nicht",
          hint: "negácia pred prídavným menom",
          explanation:
            "'nicht richtig' = nesprávne. 'nicht' neguje adjektívum/predikát. Dôraz na správenie: 'nicht aus Deutschland, sondern aus der Slowakei' = nie z Nemecka, ale zo Slovenska."
        },
        {
          sentence: "Wie viele ___ sprichst du? — Ich spreche drei Sprachen.",
          answer: "Sprachen",
          hint: "jazyk — množné číslo od 'die Sprache'",
          explanation:
            "'die Sprache' → množné číslo = 'die Sprachen'. V otázke 'Wie viele Sprachen sprichst du?' = Koľko jazykov hovoríš?"
        },
        {
          sentence: "Sarah kommt aus ___ USA.",
          answer: "den",
          hint: "die USA je množné číslo — Dativ pl. = den",
          explanation:
            "'die USA' je plurálové podstatné meno → Dativ plurálu = 'den'. Teda 'aus den USA'. Toto je jedinečná výnimka — pamätaj ako špeciálny prípad."
        }
      ]
    },
    {
      type: "listen",
      instruction:
        "Počúvaj frázu a identifikuj správny slovenský preklad.",
      questions: [
        { de: "Ich komme aus der Slowakei.", sk: "Pochádzam zo Slovenska." },
        { de: "Ich spreche Deutsch und Slowakisch.", sk: "Hovorím po nemecky a po slovensky." },
        { de: "Er spricht gut Tschechisch.", sk: "Hovorí dobre po česky." },
        { de: "Das ist nicht richtig.", sk: "To nie je správne." },
        { de: "Aus welchem Land kommst du?", sk: "Z akej krajiny pochádzaš?" },
        { de: "Sprechen Sie Englisch?", sk: "Hovoríte po anglicky?" },
        { de: "die Schweiz", sk: "Švajčiarsko" },
        { de: "die Türkei", sk: "Turecko" }
      ]
    },
    {
      type: "match",
      instruction:
        "Spoj krajinu s jej správnou nemeckou formou na vyjadrovanie pôvodu (frázou 'aus...').",
      pairs: [
        ["Nemecko", "aus Deutschland"],
        ["Slovensko", "aus der Slowakei"],
        ["Švajčiarsko", "aus der Schweiz"],
        ["Turecko", "aus der Türkei"],
        ["USA", "aus den USA"],
        ["Česko", "aus Tschechien"],
        ["Rakúsko", "aus Österreich"],
        ["Anglicko", "aus England"]
      ]
    },
    {
      type: 'wordorder',
      instruction: 'Zoraď slová do správnej nemeckej vety.',
      sentences: [
        {
          words: ['Jana', 'kommt', 'aus', 'der', 'Slowakei.'],
          correct: 'Jana kommt aus der Slowakei.',
          hint: 'Jana pochádza zo Slovenska.',
          explanation: 'Krajiny s členom (die Slowakei) → "aus der Slowakei" (Dativ: die→der).'
        },
        {
          words: ['Thomas', 'kommt', 'nicht', 'aus', 'Österreich.'],
          correct: 'Thomas kommt nicht aus Österreich.',
          hint: 'Thomas nepochádza z Rakúska.',
          explanation: '"nicht" neguje sloveso — stojí na konci vety (alebo pred predložkovou frázou).'
        },
        {
          words: ['Laila', 'spricht', 'gut', 'Deutsch.'],
          correct: 'Laila spricht gut Deutsch.',
          hint: 'Laila dobre hovorí po nemecky.',
          explanation: 'sprechen = silné sloveso: sprichst/spricht (e→i). "gut" je príslovka, stojí pred predmetom.'
        },
        {
          words: ['Aus', 'welchem', 'Land', 'kommen', 'Sie?'],
          correct: 'Aus welchem Land kommen Sie?',
          hint: 'Z akej krajiny pochádzate?',
          explanation: '"Aus welchem" = z akého (Dativ). Predložková fráza na 1. mieste → sloveso (kommen) na 2. mieste.'
        },
        {
          words: ['Ich', 'spreche', 'Slowakisch', 'und', 'Deutsch.'],
          correct: 'Ich spreche Slowakisch und Deutsch.',
          hint: 'Hovorím po slovensky a po nemecky.',
          explanation: 'Jazyky = vždy veľké písmeno v nemčine. "und" spája dve predmety.'
        }
      ]
    },
    {
      type: 'minitext',
      instruction: 'Prečítaj si krátky text o Jane. Potom odpovedaj na otázky.',
      text: 'Jana hat neue Mitbewohner. Thomas kommt aus Deutschland. Laila kommt aus der Türkei. Pavel kommt aus Tschechien. Sarah kommt aus den USA. Jana sagt: "Ich komme aus der Slowakei." Thomas fragt: "Sprichst du Englisch?" Jana antwortet: "Ja, ich spreche Englisch und Deutsch." Alle sind froh — sie sprechen Deutsch zusammen.',
      textSk: 'Jana má nových spolubývajúcich. Thomas pochádza z Nemecka. Laila pochádza z Turecka. Pavel pochádza z Čiech. Sarah pochádza z USA. Jana povie: "Pochádzam zo Slovenska." Thomas sa pýta: "Hovoríš po anglicky?" Jana odpovedá: "Áno, hovorím po anglicky a po nemecky." Všetci sú radi — hovoria spolu po nemecky.',
      questions: [
        {
          question: 'Woher kommt Laila?',
          questionSk: 'Odkiaľ pochádza Laila?',
          options: ['Aus Deutschland', 'Aus Tschechien', 'Aus der Türkei', 'Aus den USA'],
          answer: 2,
          explanation: 'Im Text: "Laila kommt aus der Türkei."'
        },
        {
          question: 'Welche Sprachen spricht Jana?',
          questionSk: 'Akými jazykmi hovorí Jana?',
          options: ['Nur Slowakisch', 'Slowakisch und Französisch', 'Englisch und Deutsch', 'Nur Deutsch'],
          answer: 2,
          explanation: 'Im Text: "ich spreche Englisch und Deutsch."'
        },
        {
          question: 'Wie kommunizieren die Mitbewohner?',
          questionSk: 'Ako komunikujú spolubývajúci?',
          options: ['Sie sprechen Englisch', 'Sie sprechen Slowakisch', 'Sie sprechen Deutsch zusammen', 'Sie schreiben E-Mails'],
          answer: 2,
          explanation: 'Im Text: "sie sprechen Deutsch zusammen."'
        }
      ]
    },
    {
      type: 'speaking',
      instruction: 'Počúvaj nemeckú vetu. Potom hovor nahlas a skontroluj sa.',
      phrases: [
        { de: 'Ich komme aus der Slowakei.', sk: 'Pochádzam zo Slovenska.', tip: 'Slowakei: sl=[šl], ei=[ai]' },
        { de: 'Sprechen Sie Deutsch?', sk: 'Hovoríte po nemecky?', tip: 'Sprechen: spr=[špr]' },
        { de: 'Das ist nicht richtig.', sk: 'To nie je správne.', tip: 'nicht: ch=[x], t na konci' },
        { de: 'Laila kommt aus der Türkei.', sk: 'Laila pochádza z Turecka.', tip: 'Türkei: ü=[ü], ei=[ai]' },
        { de: 'Wir sprechen Deutsch zusammen.', sk: 'Hovoríme spolu po nemecky.', tip: 'zusammen: z=[ts], samen' }
      ]
    }
  ],

  reviewWords: [],
  lessonNotes:
    "Kľúčový poznatok: krajiny s členom (die Slowakei, die Schweiz, die Türkei, die USA) vyžadujú Dativ po 'aus': aus DER Slowakei/Schweiz/Türkei, aus DEN USA. sprechen je silné sloveso — zmena e→i: du sprichst, er spricht. Jazyky = vždy veľké písmeno v nemčine. Negácia: 'nicht' pre prídavné mená a slovesá, 'kein/keine' pre podstatné mená."
};
