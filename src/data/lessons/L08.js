export const lesson08 = {
  id: 8,
  week: 2,
  day: 4,
  title: "Im Café — Bestellen und der unbestimmte Artikel",
  topic: "V kaviarni — objednávanie a neurčitý člen",
  cefr: "A1",
  xpReward: 25,
  narrativeContext:
    "Jana prvýkrát navštívi slávne Café Central vo Viedni. Musí čítať Speisekarte (jedálny lístok) a objednať si nápoj a koláč. Toto je jej prvá skutočná interakcia po nemecky v reálnom živote — trochu sa triasú kolená!",
  communicativeGoal:
    "Po tejto lekcii viem objednať si v kaviarni po nemecky, poznám jedlá a nápoje, chápem rozdiel medzi určitým (der/die/das) a neurčitým (ein/eine) členom a viem, kedy sa ktorý používa.",
  skillFocus: ["vocabulary", "grammar", "speaking"],

  grammarNote: {
    rule: "Neurčitý člen: ein (M/N) a eine (F)",
    explanation:
      "Okrem určitého člena (der/die/das = ten/tá/to) má nemčina aj neurčitý člen (ein/eine = nejaký/nejaká). Pravidlo: ein pre mužský a stredný rod, eine pre ženský rod. Keď hovoríme o niečom po prvý raz alebo nejde o konkrétny predmet → neurčitý člen (ein/eine). Keď ide o predmet, o ktorom sme už hovorili alebo je konkrétne určený → určitý člen (der/die/das).",
    examples: [
      { de: "Ich möchte einen Kaffee. (M → einen v Akkusatíve)", sk: "Chcel/a by som kávu. — prvá zmienka" },
      { de: "Der Kaffee ist heiß. (M → der)", sk: "Tá káva je horúca. — konkrétna káva, ktorú som objednal/a" },
      { de: "Ich nehme eine Torte. (F → eine)", sk: "Vezmem si tortu. — neurčitá, jedna z možností" },
      { de: "Die Torte ist lecker! (F → die)", sk: "Tá torta je chutná! — konkrétna torta" },
      { de: "ein Brot (N), ein Ei (N), einen Kaffee (M Akkusatív)", sk: "stredný = ein, mužský Akk. = einen" }
    ],
    slovakContrastNote:
      "Slovenčina nemá členy! 'Káva' môže byť 'nejaká káva' aj 'tá konkrétna káva' — rozlišujeme len kontextom. V nemčine musíš vždy zvoliť: eine Tasse (nejaká šálka, neurčitá) alebo die Tasse (tá konkrétna šálka). Toto je jedna z najväčších výziev pre slovenských učiacich sa!"
  },

  vocab: [
    {
      de: "das Café",
      sk: "kaviareň",
      example: "Das Café Central ist sehr berühmt.",
      exampleSk: "Kaviareň Central je veľmi slávna.",
      gender: "N",
      srsId: "L08_V01",
      recycledFrom: []
    },
    {
      de: "der Kaffee",
      sk: "káva",
      example: "Ich möchte einen Kaffee, bitte.",
      exampleSk: "Prosím si kávu.",
      gender: "M",
      srsId: "L08_V02",
      recycledFrom: []
    },
    {
      de: "der Tee",
      sk: "čaj",
      example: "Einen Tee mit Milch, bitte.",
      exampleSk: "Čaj s mliekom, prosím.",
      gender: "M",
      srsId: "L08_V03",
      recycledFrom: []
    },
    {
      de: "das Wasser",
      sk: "voda",
      example: "Ein Wasser ohne Kohlensäure, bitte.",
      exampleSk: "Vodu bez bubliniek, prosím.",
      gender: "N",
      srsId: "L08_V04",
      recycledFrom: []
    },
    {
      de: "der Kuchen",
      sk: "koláč",
      example: "Der Apfelkuchen hier ist fantastisch!",
      exampleSk: "Jablkový koláč je tu fantastický!",
      gender: "M",
      srsId: "L08_V05",
      recycledFrom: []
    },
    {
      de: "die Torte",
      sk: "torta",
      example: "Eine Sachertorte, bitte — das ist die bekannteste Wiener Torte.",
      exampleSk: "Jednu Sachertortu, prosím — to je najslávnejšia viedenská torta.",
      gender: "F",
      srsId: "L08_V06",
      recycledFrom: []
    },
    {
      de: "das Brot",
      sk: "chlieb",
      example: "Ein Brot mit Butter, bitte.",
      exampleSk: "Chlieb s maslom, prosím.",
      gender: "N",
      srsId: "L08_V07",
      recycledFrom: []
    },
    {
      de: "die Butter",
      sk: "maslo",
      example: "Brot mit Butter ist sehr gut.",
      exampleSk: "Chlieb s maslom je veľmi dobrý.",
      gender: "F",
      srsId: "L08_V08",
      recycledFrom: []
    },
    {
      de: "das Ei",
      sk: "vajce",
      example: "Zwei Eier mit Brot, bitte.",
      exampleSk: "Dve vajcia s chlebom, prosím.",
      gender: "N",
      srsId: "L08_V09",
      recycledFrom: []
    },
    {
      de: "die Speisekarte",
      sk: "jedálny lístok",
      example: "Entschuldigung, kann ich die Speisekarte haben?",
      exampleSk: "Prepáčte, môžem dostať jedálny lístok?",
      gender: "F",
      srsId: "L08_V10",
      recycledFrom: []
    },
    {
      de: "der Kellner / die Kellnerin",
      sk: "čašník / čašníčka",
      example: "Der Kellner bringt die Bestellung.",
      exampleSk: "Čašník prinesie objednávku.",
      gender: "M/F",
      srsId: "L08_V11",
      recycledFrom: []
    },
    {
      de: "bestellen",
      sk: "objednať si",
      example: "Ich möchte bestellen, bitte.",
      exampleSk: "Chcel/a by som si objednať, prosím.",
      gender: null,
      srsId: "L08_V12",
      recycledFrom: []
    },
    {
      de: "nehmen",
      sk: "vziať si (objednať si)",
      example: "Ich nehme einen Kaffee und einen Kuchen.",
      exampleSk: "Dám si kávu a koláč.",
      gender: null,
      srsId: "L08_V13",
      recycledFrom: []
    },
    {
      de: "lecker",
      sk: "chutný",
      example: "Die Sachertorte ist sehr lecker!",
      exampleSk: "Sachertorta je veľmi chutná!",
      gender: null,
      srsId: "L08_V14",
      recycledFrom: []
    }
  ],

  exercises: [
    {
      type: "flashcard",
      instruction:
        "Precvičuj slovíčka z caviarně. Flip kartu pre preklad a vzorový príkad.",
      items: [
        "das Café = kaviareň (N)",
        "der Kaffee = káva (M)",
        "der Tee = čaj (M)",
        "das Wasser = voda (N)",
        "der Kuchen = koláč (M)",
        "die Torte = torta (F)",
        "das Brot = chlieb (N)",
        "die Butter = maslo (F)",
        "das Ei = vajce (N)",
        "die Speisekarte = jedálny lístok (F)",
        "der Kellner / die Kellnerin = čašník / čašníčka (M/F)",
        "bestellen = objednať si",
        "nehmen = vziať si / dám si",
        "lecker = chutný"
      ]
    },
    {
      type: "mcq",
      instruction:
        "Jana je v Café Central. Vyber správnu gramatickú formu alebo frázu.",
      questions: [
        {
          question: "Jana chce objednať kávu. Ktorá veta je SPRÁVNA?",
          options: [
            "Ich möchte ein Kaffee.",
            "Ich möchte einen Kaffee.",
            "Ich möchte eine Kaffee.",
            "Ich möchte der Kaffee."
          ],
          answer: 1,
          explanation:
            "'Kaffee' je mužský rod (der Kaffee). V Akkusatíve (po 'möchte' = objekt) sa mužský člen mení: der → DEN / ein → EINEN. Správne: 'Ich möchte eiNEN Kaffee.' Ženský a stredný rod v Akkusatíve zostávajú nezmenené: eine Torte, ein Wasser."
        },
        {
          question: "Jana ukazuje na Sachertortu v skrinke a hovorí: '___ Torte ist sehr lecker!' Aký člen?",
          options: [
            "Eine",
            "Ein",
            "Die",
            "Der"
          ],
          answer: 2,
          explanation:
            "Jana ukazuje na KONKRÉTNU tortu (tú v skrinke) → určitý člen → DIE (ženský rod). Keby hovorila o neurčitej torte: 'Das ist eine leckere Torte.' (To je chutná torta — neurčitá, jedna z mnohých.)"
        },
        {
          question: "Kellner sa pýta: 'Was nehmen Sie?' Jana odpovedá: 'Ich nehme ___ Kuchen.' Aký člen?",
          options: [
            "der",
            "die",
            "ein",
            "einen"
          ],
          answer: 3,
          explanation:
            "Kuchen je mužský rod (der Kuchen). V Akkusatíve po slovesom pohybu/výberu (nehmen, bestellen) sa mužský neurčitý člen mení ein → EINEN. 'Ich nehme einen Kuchen.' = Dám si koláč."
        },
        {
          question: "Kedy sa používa neurčitý člen (ein/eine)?",
          options: [
            "Keď hovoríme o niečom po prvý raz alebo o nešpecifikovanom predmete",
            "Keď hovoríme o niečom, čo sme už spomínali",
            "Vždy pri jedlách a nápojoch",
            "Nikdy — v nemčine sa vždy používa určitý člen"
          ],
          answer: 0,
          explanation:
            "Neurčitý člen (ein/eine) = 'nejaký/nejaká' — prvá zmienka, nešpecifikovaný predmet. Určitý člen (der/die/das) = 'ten/tá/to' — konkrétny, už spomínaný predmet. Príklad: 'Ich sehe EINEN Mann.' → 'DER Mann ist nett.' (prvý raz → druhý raz)"
        },
        {
          question: "Jana si objednáva vajce. Ako povie 'jedno vajce, prosím'?",
          options: [
            "Ein Ei, bitte.",
            "Eine Ei, bitte.",
            "Einen Ei, bitte.",
            "Das Ei, bitte."
          ],
          answer: 0,
          explanation:
            "'das Ei' = vajce, stredný rod. Neurčitý člen stredného rodu = ein (v Nominatíve aj Akkusatíve). Správne: 'Ein Ei, bitte.' Stredný rod je v Akkusatíve nezmenený: ein → ein (nie einen!)"
        },
        {
          question: "Ktorá fráza je typická rakúska objednávka v kaviarni Viedne?",
          options: [
            "Ich will Kaffee!",
            "Gib mir einen Kaffee!",
            "Ich möchte einen kleinen Schwarzen, bitte.",
            "Kaffee kaufen!"
          ],
          answer: 2,
          explanation:
            "'Ich möchte…' + 'bitte' je zdvorilá forma objednávky. 'Kleiner Schwarzer' je viedenský výraz pre espresso. V Rakúsku je kaviarnska kultúra veľmi dôležitá — poznáš typ kávy, odlíšiš sa ako znalec Viedne!"
        }
      ]
    },
    {
      type: "fill",
      instruction:
        "Doplň správny neurčitý člen (ein/eine/einen). Jana objednáva v Café Central.",
      questions: [
        {
          sentence: "Ich möchte ___ Kaffee und ___ Torte, bitte.",
          answer: "einen … eine",
          hint: "Kaffee = M (Akkusatív → einen), Torte = F (→ eine)",
          explanation:
            "Kaffee (M) v Akkusatíve: ein → EINEN. Torte (F) v Akkusatíve: eine (zostáva nezmenené). Pravidlo: len mužský rod mení ein → einen v Akkusatíve!"
        },
        {
          sentence: "Entschuldigung, kann ich ___ Speisekarte haben?",
          answer: "eine",
          hint: "Speisekarte = F — neurčitý člen",
          explanation:
            "'die Speisekarte' = F → neurčitý člen = eine. V Akkusatíve ženský rod: eine zostáva eine (na rozdiel od mužského rodu)."
        },
        {
          sentence: "Jana nimmt ___ Brot mit ___ Ei.",
          answer: "ein … einem",
          hint: "Brot = N (Akkusatív → ein), Ei s mit = Dativ (→ einem)",
          explanation:
            "Brot (N) v Akkusatíve = ein. Ei s predložkou 'mit' vyžaduje Dativ: 'mit einem Ei'. Dativ ešte podrobne príde neskôr — zatiaľ si táto vetu zapamätaj ako celok."
        },
        {
          sentence: "Der Kellner sagt: 'Ist das ___Kaffee für Sie?'",
          answer: "der",
          hint: "konkrétna káva, ktorú si objednala — určitý člen",
          explanation:
            "Čašník ukazuje na KONKRÉTNU kávu, ktorú Jana objednala → určitý člen → 'der Kaffee' (M). Neurčitý by bol: 'Das ist ein Kaffee.' (Toto je [nejaká] káva.)"
        },
        {
          sentence: "Die Sachertorte ist ___ bekannte Wiener Torte. (eine / die)",
          answer: "eine",
          hint: "všeobecný výrok — neurčitý člen",
          explanation:
            "'Sachertorte ist eine bekannte Wiener Torte.' = Sachertorta je [jedna] slávna viedenská torta. Všeobecné tvrdenie o kategórii → neurčitý člen. Porovnaj: 'Die Sachertorte, die ich gegessen habe, war lecker.' = Tá (konkrétna) sachertorta, čo som jedla, bola chutná."
        },
        {
          sentence: "Ich ___ bitte bestellen. (Chcela by som si objednať, prosím.)",
          answer: "möchte",
          hint: "zdvorilá žiadosť — konjunktív II od mögen",
          explanation:
            "'Ich möchte' = chcel/a by som — zdvorilá forma, veľmi bežná v objednávkach, požiadavkách. 'möchte' je konjunktív II od mögen (mať rád). Vo forme zdvorilej žiadosti: ich möchte, du möchtest, er/sie möchte."
        }
      ]
    },
    {
      type: "listen",
      instruction:
        "Počúvaj slovo alebo frázu z kaviarne a identifikuj správny preklad.",
      questions: [
        { de: "der Kaffee", sk: "káva" },
        { de: "die Torte", sk: "torta" },
        { de: "das Wasser", sk: "voda" },
        { de: "die Speisekarte", sk: "jedálny lístok" },
        { de: "Ich möchte bestellen.", sk: "Chcel/a by som si objednať." },
        { de: "lecker", sk: "chutný" },
        { de: "der Kellner", sk: "čašník" },
        { de: "Einen Kaffee, bitte!", sk: "Jednu kávu, prosím!" }
      ]
    },
    {
      type: "match",
      instruction:
        "Spoj nemecké jedlo alebo nápoj so slovenským prekladom.",
      pairs: [
        ["der Tee", "čaj"],
        ["der Kuchen", "koláč"],
        ["das Brot", "chlieb"],
        ["die Butter", "maslo"],
        ["das Ei", "vajce"],
        ["bestellen", "objednať si"],
        ["nehmen", "vziať si / dám si"],
        ["lecker", "chutný"]
      ]
    },
    {
      type: 'wordorder',
      instruction: 'Zoraď slová do správnej nemeckej vety.',
      sentences: [
        {
          words: ['Ich', 'möchte', 'einen', 'Kaffee,', 'bitte.'],
          correct: 'Ich möchte einen Kaffee, bitte.',
          hint: 'Chcel/a by som kávu, prosím.',
          explanation: 'kaffe = mužský rod → "einen" v akkuzatíve. möchte + infinitív OR predmet.'
        },
        {
          words: ['Haben', 'Sie', 'eine', 'Speisekarte?'],
          correct: 'Haben Sie eine Speisekarte?',
          hint: 'Máte jedálny lístok?',
          explanation: 'Speisekarte = ženský rod → "eine". Áno/nie otázka: sloveso na 1. mieste.'
        },
        {
          words: ['Das', 'ist', 'ein', 'Wiener', 'Schnitzel.'],
          correct: 'Das ist ein Wiener Schnitzel.',
          hint: 'To je viedenský rezeň.',
          explanation: 'Schnitzel = stredný rod → "ein". "Das ist" = to je — uvodzuje nový predmet.'
        },
        {
          words: ['Ich', 'nehme', 'eine', 'Torte', 'und', 'einen', 'Tee.'],
          correct: 'Ich nehme eine Torte und einen Tee.',
          hint: 'Dám si tortu a čaj.',
          explanation: 'Torte = F rod → eine. Tee = M rod → einen (akkuzatív!). "nehmen" = brať si, objednávať.'
        },
        {
          words: ['Ein', 'Glas', 'Wasser,', 'bitte!'],
          correct: 'Ein Glas Wasser, bitte!',
          hint: 'Pohár vody, prosím!',
          explanation: 'Glas = N rod → ein. "bitte" na konci = zdvorilá prosba.'
        }
      ]
    },
    {
      type: 'minitext',
      instruction: 'Prečítaj si krátky text o Jane. Potom odpovedaj na otázky.',
      text: 'Jana geht ins Café Central in Wien. Das ist ein sehr berühmtes Café. Sie setzt sich und schaut die Speisekarte an. Ein Kellner kommt. Jana sagt: "Ich möchte einen Kaffee und eine Sachertorte, bitte." Der Kellner sagt: "Einen Moment, bitte." Jana schaut aus dem Fenster. Wien ist so schön.',
      textSk: 'Jana ide do Café Central vo Viedni. To je veľmi slávna kaviareň. Sadne si a pozrie sa na jedálny lístok. Prichádza čašník. Jana povie: "Chcela by som kávu a Sachertorte, prosím." Čašník povie: "Chvíľku, prosím." Jana sa pozerá z okna. Viedeň je taká krásna.',
      questions: [
        {
          question: 'Wie ist das Café Central?',
          questionSk: 'Aké je Café Central?',
          options: ['Klein und neu', 'Sehr berühmt', 'Billig und einfach', 'Neu und modern'],
          answer: 1,
          explanation: 'Im Text: "Das ist ein sehr berühmtes Café."'
        },
        {
          question: 'Was bestellt Jana?',
          questionSk: 'Čo si Jana objedná?',
          options: ['Tee und Kuchen', 'Kaffee und Sachertorte', 'Wasser und Schnitzel', 'Tee und Torte'],
          answer: 1,
          explanation: 'Im Text: "Ich möchte einen Kaffee und eine Sachertorte, bitte."'
        },
        {
          question: 'Was macht Jana am Ende?',
          questionSk: 'Čo Jana robí na záver?',
          options: ['Sie geht nach Hause', 'Sie liest ein Buch', 'Sie schaut aus dem Fenster', 'Sie telefoniert'],
          answer: 2,
          explanation: 'Im Text: "Jana schaut aus dem Fenster."'
        }
      ]
    },
    {
      type: 'speaking',
      instruction: 'Počúvaj nemeckú vetu. Potom hovor nahlas a skontroluj sa.',
      phrases: [
        { de: 'Ich möchte einen Kaffee, bitte.', sk: 'Chcel/a by som kávu, prosím.', tip: 'möchte: ö=[ö], ch=[x]' },
        { de: 'Haben Sie eine Speisekarte?', sk: 'Máte jedálny lístok?', tip: 'Speise: sp=[šp], ei=[ai]' },
        { de: 'Das ist ein Wiener Schnitzel.', sk: 'To je viedenský rezeň.', tip: 'Schnitzel: sch=[š], z=[ts]' },
        { de: 'Ein Glas Wasser, bitte!', sk: 'Pohár vody, prosím!', tip: 'Glas: G=[g], a krátke' },
        { de: 'Zahlen, bitte!', sk: 'Zaplatím, prosím!', tip: 'zahlen: z=[ts], ah=[á]' }
      ]
    }
  ],

  reviewWords: [],
  lessonNotes:
    "Kľúčové gramatické pravidlo tejto lekcie: mužský rod mení člen v Akkusatíve: der → den, ein → EINEN. Ženský a stredný rod v Akkusatíve zostávajú nezmenené (eine, ein). Typicky viedenský kontext: Café Central, Sachertorte. Frázy 'Ich möchte…' a 'Ich nehme…' sú najdôležitejšie pri objednávaní."
};
