export const lesson04 = {
  id: 4,
  week: 1,
  day: 4,
  title: "Fragewörter — Wer? Was? Wo?",
  topic: "Opytovacie slová a slovosled vo vete",
  cefr: "A1",
  xpReward: 20,
  narrativeContext:
    "Prvý deň v práci — Jana je bombardovaná otázkami od zvedavých kolegov. Kto si? Odkiaľ si? Kde bývaš? Prečo Viedeň? Jana prežíva na vlastnej koži, že nemčina má pevný slovosled: sloveso je VŽDY na druhom mieste.",
  communicativeGoal:
    "Po tejto lekcii viem položiť a zodpovedať základné W-otázky v nemčine (kto, čo, kde, odkiaľ, ako, kedy, prečo) a chápem pravidlo V2 — sloveso je vždy na druhom mieste vo vete.",
  skillFocus: ["grammar", "vocabulary", "speaking"],

  grammarNote: {
    rule: "W-otázky a pravidlo V2 (Verb an zweiter Stelle)",
    explanation:
      "Nemecká W-otázka začína opytovacím slovom (wer, was, wo, woher…), po ktorom IHNEĎ nasleduje sloveso (pozícia 2), a potom zvyšok vety. Toto sa nazýva V2-pravidlo. V oznamovacej vete je sloveso tiež vždy na druhom mieste — či začíname podmetom alebo príslovkou. NIKDY nie na treťom alebo štvrtom mieste.",
    examples: [
      { de: "Wer ist das?", sk: "Kto je to? — wer(1) + ist(2) + das(3)" },
      { de: "Wo wohnst du?", sk: "Kde bývaš? — wo(1) + wohnst(2) + du(3)" },
      { de: "Woher kommst du?", sk: "Odkiaľ si? — woher(1) + kommst(2) + du(3)" },
      { de: "Ich komme aus Bratislava.", sk: "ich(1) + komme(2) + aus Bratislava(3)" },
      { de: "Heute komme ich aus dem Büro.", sk: "heute(1) + komme(2) + ich(3) — sloveso zostáva na 2. mieste!" }
    ],
    slovakContrastNote:
      "V slovenčine je slovosled voľný — 'Ja bývam v Bratislave', 'V Bratislave bývam ja', 'Bývam v Bratislave' — všetky sú správne. V nemčine je sloveso VŽDY na druhom mieste. Toto je najdôležitejšie gramatické pravidlo nemčiny!"
  },

  vocab: [
    {
      de: "kommen",
      sk: "prísť / pochádzať",
      example: "Woher kommst du? — Ich komme aus der Slowakei.",
      exampleSk: "Odkiaľ pochádzaš? — Pochádzam zo Slovenska.",
      gender: null,
      srsId: "L04_V01",
      recycledFrom: []
    },
    {
      de: "wohnen",
      sk: "bývať",
      example: "Wo wohnst du? — Ich wohne in Wien.",
      exampleSk: "Kde bývaš? — Bývam vo Viedni.",
      gender: null,
      srsId: "L04_V02",
      recycledFrom: []
    },
    {
      de: "wer",
      sk: "kto",
      example: "Wer bist du?",
      exampleSk: "Kto si ty?",
      gender: null,
      srsId: "L04_V03",
      recycledFrom: []
    },
    {
      de: "was",
      sk: "čo",
      example: "Was machst du hier?",
      exampleSk: "Čo tu robíš?",
      gender: null,
      srsId: "L04_V04",
      recycledFrom: []
    },
    {
      de: "wo",
      sk: "kde",
      example: "Wo wohnst du in Wien?",
      exampleSk: "Kde bývaš vo Viedni?",
      gender: null,
      srsId: "L04_V05",
      recycledFrom: []
    },
    {
      de: "woher",
      sk: "odkiaľ",
      example: "Woher kommen Sie?",
      exampleSk: "Odkiaľ ste?",
      gender: null,
      srsId: "L04_V06",
      recycledFrom: []
    },
    {
      de: "wie",
      sk: "ako",
      example: "Wie heißt du? Wie geht es dir?",
      exampleSk: "Ako sa voláš? Ako sa máš?",
      gender: null,
      srsId: "L04_V07",
      recycledFrom: []
    },
    {
      de: "wann",
      sk: "kedy",
      example: "Wann beginnt die Arbeit?",
      exampleSk: "Kedy začína práca?",
      gender: null,
      srsId: "L04_V08",
      recycledFrom: []
    },
    {
      de: "warum",
      sk: "prečo",
      example: "Warum bist du in Wien?",
      exampleSk: "Prečo si vo Viedni?",
      gender: null,
      srsId: "L04_V09",
      recycledFrom: []
    },
    {
      de: "aus",
      sk: "z / zo (pôvod)",
      example: "Ich komme aus Bratislava. — Ich bin aus der Slowakei.",
      exampleSk: "Pochádzam z Bratislavy. — Som zo Slovenska.",
      gender: null,
      srsId: "L04_V10",
      recycledFrom: []
    },
    {
      de: "der Chef / die Chefin",
      sk: "šéf / šéfka",
      example: "Mein Chef ist sehr nett.",
      exampleSk: "Môj šéf je veľmi milý.",
      gender: "M/F",
      srsId: "L04_V11",
      recycledFrom: []
    },
    {
      de: "das Büro",
      sk: "kancelária",
      example: "Das Büro ist im dritten Stock.",
      exampleSk: "Kancelária je na treťom poschodí.",
      gender: "N",
      srsId: "L04_V12",
      recycledFrom: []
    },
    {
      de: "natürlich",
      sk: "samozrejme / prirodzene",
      example: "Natürlich spreche ich ein bisschen Deutsch!",
      exampleSk: "Samozrejme, trochu hovorím po nemecky!",
      gender: null,
      srsId: "L04_V13",
      recycledFrom: []
    }
  ],

  exercises: [
    {
      type: "flashcard",
      instruction:
        "Precvičuj opytovacie slová. Flip kartu pre preklad a príkladovú otázku.",
      items: [
        "kommen = prísť / pochádzať",
        "wohnen = bývať",
        "wer = kto",
        "was = čo",
        "wo = kde",
        "woher = odkiaľ",
        "wie = ako",
        "wann = kedy",
        "warum = prečo",
        "aus = z / zo (pôvod)",
        "der Chef / die Chefin = šéf / šéfka",
        "das Büro = kancelária",
        "natürlich = samozrejme"
      ]
    },
    {
      type: "mcq",
      instruction:
        "Vyber správne opytovacie slovo alebo správny slovosled. Kolegovia sa pýtajú Janu.",
      questions: [
        {
          question: "Kolega sa pýta, kde Jana býva. Ktorá otázka je správna?",
          options: [
            "Was wohnst du?",
            "Wer wohnst du?",
            "Wo wohnst du?",
            "Woher wohnst du?"
          ],
          answer: 2,
          explanation:
            "'Wo' = kde. 'Wo wohnst du?' = Kde bývaš? Nezamieňaj s 'woher' (odkiaľ) — 'Woher kommst du?' pýta sa na pôvod, 'Wo wohnst du?' na miesto súčasného bydliska."
        },
        {
          question: "Kolegyňa sa pýta na pôvod Jany. Ktorá otázka je správna?",
          options: [
            "Wo kommst du?",
            "Woher kommst du?",
            "Wann kommst du?",
            "Wie kommst du?"
          ],
          answer: 1,
          explanation:
            "'Woher' = odkiaľ (na otázku pôvodu). 'Woher kommst du?' = Odkiaľ si? / Odkiaľ pochádzaš? Jana odpovie: 'Ich komme aus der Slowakei, aus Bratislava.'"
        },
        {
          question: "Ktorá veta má SPRÁVNY nemecký slovosled?",
          options: [
            "Jana aus Bratislava kommt.",
            "Jana kommt aus Bratislava.",
            "Kommt Jana aus Bratislava aus.",
            "Aus Bratislava Jana kommt."
          ],
          answer: 1,
          explanation:
            "V2-pravidlo: Subjekt(1) + Sloveso(2) + zvyšok. 'Jana(1) kommt(2) aus Bratislava(3).' Sloveso 'kommt' musí byť na druhom mieste!"
        },
        {
          question: "Jana začína vetu s 'Heute' (dnes). Ktorý slovosled je správny?",
          options: [
            "Heute Jana arbeitet im Büro.",
            "Heute arbeitet Jana im Büro.",
            "Heute im Büro Jana arbeitet.",
            "Jana heute arbeitet im Büro."
          ],
          answer: 1,
          explanation:
            "V2-pravidlo funguje aj keď veta začína príslovkou: Heute(1) + arbeitet(2) + Jana(3) + im Büro. Sloveso je VŽDY na 2. mieste, aj keď na 1. mieste nestojí podmet!"
        },
        {
          question: "'Warum bist du in Wien?' — čo sa touto otázkou pýtame?",
          options: [
            "Kde si vo Viedni?",
            "Kedy si vo Viedni?",
            "Prečo si vo Viedni?",
            "Ako dlho si vo Viedni?"
          ],
          answer: 2,
          explanation:
            "'Warum' = prečo. Jana odpovie: 'Weil ich hier arbeite.' (Pretože tu pracujem.) — spojka 'weil' v nemčine hádzuje sloveso na koniec vedľajšej vety, to uvidíme neskôr."
        }
      ]
    },
    {
      type: "fill",
      instruction:
        "Doplň správne opytovacie slovo. Kolegovia si hovoria s Janou pri káve.",
      questions: [
        {
          sentence: "___ bist du? — Ich bin Jana Nováková.",
          answer: "Wer",
          hint: "kto — na osobu",
          explanation:
            "'Wer bist du?' = Kto si? Opytovacie 'wer' sa pýta na osobu (podmet). Odlíš od 'was' (čo — na vec)."
        },
        {
          sentence: "___ kommst du? — Ich komme aus der Slowakei.",
          answer: "Woher",
          hint: "odkiaľ — na pôvod",
          explanation:
            "'Woher kommst du?' = Odkiaľ pochádzaš? 'aus' = z/zo. Krajiny bez člena: 'aus Deutschland', 'aus Österreich'. Ale: 'aus DER Slowakei' (die Slowakei má člen!)"
        },
        {
          sentence: "___ wohnst du in Wien? — Ich wohne im 1. Bezirk.",
          answer: "Wo",
          hint: "kde — na miesto",
          explanation:
            "'Wo wohnst du?' = Kde bývaš? '1. Bezirk' = 1. obvod (Viedeň je rozdelená na 23 obvodov). 'im' = in dem (v tom) — skrátená forma."
        },
        {
          sentence: "___ ist das Büro? — Das Büro ist im dritten Stock.",
          answer: "Wo",
          hint: "kde — na miesto (priestorová otázka)",
          explanation:
            "'Wo ist das Büro?' = Kde je kancelária? 'im dritten Stock' = na treťom poschodí. V nemočine sa pri poschodiach počíta rovnako ako v slovenčine."
        },
        {
          sentence: "___ fängt die Arbeit an? — Um neun Uhr.",
          answer: "Wann",
          hint: "kedy — na čas",
          explanation:
            "'Wann fängt die Arbeit an?' = Kedy začína práca? 'Um neun Uhr' = O deviatej hodine. 'wann' = kedy, vždy na časovú otázku."
        },
        {
          sentence: "___ machst du in Wien? — Ich arbeite hier als Marketerin.",
          answer: "Was",
          hint: "čo — na činnosť alebo vec",
          explanation:
            "'Was machst du?' = Čo robíš? / Čím si? Jana odpovie, čo robí: 'Ich arbeite hier als Marketerin.' = Tu pracujem ako marketérka."
        }
      ]
    },
    {
      type: "listen",
      instruction:
        "Počúvaj otázku a identifikuj správny slovenský preklad.",
      questions: [
        { de: "Wer bist du?", sk: "Kto si?" },
        { de: "Was machst du?", sk: "Čo robíš?" },
        { de: "Wo wohnst du?", sk: "Kde bývaš?" },
        { de: "Woher kommst du?", sk: "Odkiaľ pochádzaš?" },
        { de: "Wie heißt du?", sk: "Ako sa voláš?" },
        { de: "Wann arbeitest du?", sk: "Kedy pracuješ?" },
        { de: "Warum bist du in Wien?", sk: "Prečo si vo Viedni?" },
        { de: "Natürlich!", sk: "Samozrejme!" }
      ]
    },
    {
      type: "match",
      instruction:
        "Spoj opytovacie slovo s jeho slovenským prekladom.",
      pairs: [
        ["wer", "kto"],
        ["was", "čo"],
        ["wo", "kde"],
        ["woher", "odkiaľ"],
        ["wie", "ako"],
        ["wann", "kedy"],
        ["warum", "prečo"],
        ["das Büro", "kancelária"]
      ]
    },
    {
      type: 'wordorder',
      instruction: 'Zoraď slová do správnej nemeckej vety.',
      sentences: [
        {
          words: ['Wo', 'wohnst', 'du', 'in', 'Wien?'],
          correct: 'Wo wohnst du in Wien?',
          hint: 'Kde bývaš vo Viedni?',
          explanation: 'W-otázka: W-slovo → sloveso → námetok. "Wo" + wohnst (V2) + du.'
        },
        {
          words: ['Wie', 'heißen', 'Sie', 'bitte?'],
          correct: 'Wie heißen Sie bitte?',
          hint: 'Ako sa voláte prosím?',
          explanation: '"Wie" je W-slovo, heißen stále na 2. mieste — V2 pravidlo. "bitte" ide na koniec.'
        },
        {
          words: ['Woher', 'kommen', 'Sie?'],
          correct: 'Woher kommen Sie?',
          hint: 'Odkiaľ pochádzate?',
          explanation: '"Woher" (odkiaľ) + sloveso kommen na 2. mieste + podmety Sie.'
        },
        {
          words: ['Was', 'machen', 'Sie', 'von', 'Beruf?'],
          correct: 'Was machen Sie von Beruf?',
          hint: 'Aké máte povolanie?',
          explanation: '"Was" je W-slovo, machen na 2. mieste. "von Beruf" = čo povolanie — pevná fráza.'
        },
        {
          words: ['Jana', 'kommt', 'aus', 'der', 'Slowakei.'],
          correct: 'Jana kommt aus der Slowakei.',
          hint: 'Jana pochádza zo Slovenska.',
          explanation: 'Námetok (Jana) na 1. mieste, sloveso (kommt) na 2. mieste — V2 platí v oznamovacej vete.'
        }
      ]
    },
    {
      type: 'minitext',
      instruction: 'Prečítaj si krátky text o Jane. Potom odpovedaj na otázky.',
      text: 'Jana sitzt im Büro. Die Kollegen kommen und stellen Fragen. Thomas fragt: "Wo wohnst du?" Jana antwortet: "Ich wohne in Wien, im 6. Bezirk." Sabine fragt: "Woher kommst du?" Jana sagt: "Ich komme aus der Slowakei." Peter fragt: "Was machst du gern?" Jana lacht: "Ich lerne gern Deutsch!"',
      textSk: 'Jana sedí v kancelárii. Kolegovia prichádzajú a kladú otázky. Thomas sa pýta: "Kde bývaš?" Jana odpovie: "Bývam vo Viedni, v 6. obvode." Sabine sa pýta: "Odkiaľ pochádzaš?" Jana povie: "Pochádzam zo Slovenska." Peter sa pýta: "Čo rád/a robíš?" Jana sa smeje: "Rada sa učím nemecky!"',
      questions: [
        {
          question: 'Kde býva Jana vo Viedni?',
          options: ['V 1. Bezirk', 'V 4. Bezirk', 'V 6. Bezirk', 'V 8. Bezirk'],
          answer: 2,
          explanation: 'V texte: "Ich wohne im 6. Bezirk."'
        },
        {
          question: 'Z ktorej krajiny Jana pochádza?',
          options: ['Z Rakúska', 'Z Nemecka', 'Zo Slovenska', 'Z Čiech'],
          answer: 2,
          explanation: 'V texte: "Ich komme aus der Slowakei."'
        },
        {
          question: 'Čo Jana rada robí?',
          options: ['Rada varí', 'Rada číta', 'Rada sa učí nemecky', 'Rada športuje'],
          answer: 2,
          explanation: 'V texte: "Ich lerne gern Deutsch!"'
        }
      ]
    },
    {
      type: 'speaking',
      instruction: 'Počúvaj nemeckú vetu. Potom hovor nahlas a skontroluj sa.',
      phrases: [
        { de: 'Wie heißen Sie?', sk: 'Ako sa voláte?', tip: 'heißen: ei=[ai], ß=[ss]' },
        { de: 'Woher kommen Sie?', sk: 'Odkiaľ pochádzate?', tip: 'Woher: W=[v], woher celé' },
        { de: 'Was machen Sie von Beruf?', sk: 'Aké máte povolanie?', tip: 'Beruf: B=[b], u krátke' },
        { de: 'Wo wohnen Sie?', sk: 'Kde bývate?', tip: 'wohnen: W=[v], oh=[ó]' },
        { de: 'Ich lerne gern Deutsch.', sk: 'Rada/rad sa učím nemecky.', tip: 'gern: g=[g], e krátke' },
        { de: 'Ich komme aus Bratislava.', sk: 'Pochádzam z Bratislavy.', tip: 'komme: o krátke, e tiché' }
      ]
    }
  ],

  reviewWords: [],
  lessonNotes:
    "Pravidlo V2 je najdôležitejšie gramatické pravidlo v nemčine. Sloveso je vždy na druhom mieste — bez výnimky v oznamovacej a opytovaciej vete so W-slovom. Výnimky (áno/nie otázky, rozkazovacie vety, vedľajšie vety) prídu neskôr. Slovíčko 'woher' (odkiaľ) treba odlíšiť od 'wo' (kde) — rozlíšenie miesta pôvodu vs. súčasného miesta."
};
