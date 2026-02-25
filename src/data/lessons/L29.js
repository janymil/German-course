export const lesson29 = {
  id: 29,
  week: 6,
  day: 4,
  title: "Das Wetter — Wie ist das Wetter?",
  topic: "Počasie — Aké je počasie?",
  cefr: "A1",
  xpReward: 20,
  narrativeContext:
    "Janas Familie ist noch in Wien. Das Wetter ist schlecht — es regnet. Aber Jana zeigt ihnen trotzdem die Stadt. Beim Abendessen reden sie über das Wetter — typisches Smalltalk-Thema! Jana merkt: Über das Wetter reden können Österreicher stundenlang.",
  communicativeGoal:
    "Po tejto lekcii viem hovoriť o počasí, opísať ročné obdobia a viem viesť jednoduché konverzácie o počasí ako typický ‚small talk'.",
  skillFocus: ["vocabulary", "speaking", "listening", "grammar"],

  grammarNote: {
    rule: "Neosobné konštrukcie s ‚es' + predikačné prídavné mená (bez skloňovania)",
    explanation:
      "Počasie popisujeme neosobnými výrazmi s ‚es' (dummy subject — formálne podmet, bez skutočného významu): ‚es regnet' (prší), ‚es schneit' (sneží), ‚es ist kalt' (je chladno). Prídavné mená po slovese ‚sein' sa NESKLOŇUJÚ (predikačná pozícia): ‚Das Wetter ist schön.' — ‚schön' zostáva bez koncoviek. Pozor: prídavné mená PRED podstatným menom (atributívna pozícia) dostávajú koncovky — to príde v L35+.",
    examples: [
      { de: "Es regnet heute.", sk: "Dnes prší." },
      { de: "Es schneit im Winter.", sk: "V zime sneží." },
      { de: "Es ist sehr kalt heute.", sk: "Dnes je veľmi chladno." },
      { de: "Die Sonne scheint.", sk: "Svieti slnko." },
      { de: "Es gibt heute ein Gewitter.", sk: "Dnes je búrka." }
    ],
    slovakContrastNote:
      "Slovenčina tiež používa neosobné tvary počasia: ‚prší', ‚sneží' — bez podmetu. Nemčina pridáva formálne ‚es' ako podmetnú záplatu: ‚es regnet'. Toto je pre slovenských hovoriacich prirodzené! Logika je rovnaká — len nemčina vyžaduje to ‚es' navyše."
  },

  vocab: [
    {
      de: "das Wetter",
      sk: "počasie",
      example: "Wie ist das Wetter heute?",
      exampleSk: "Aké je dnes počasie?",
      gender: "N",
      srsId: "L29_V01",
      recycledFrom: []
    },
    {
      de: "die Sonne",
      sk: "slnko",
      example: "Die Sonne scheint.",
      exampleSk: "Svieti slnko.",
      gender: "F",
      srsId: "L29_V02",
      recycledFrom: []
    },
    {
      de: "der Regen",
      sk: "dážď",
      example: "Der Regen kommt von Westen.",
      exampleSk: "Dážď prichádza zo západu.",
      gender: "M",
      srsId: "L29_V03",
      recycledFrom: []
    },
    {
      de: "der Schnee",
      sk: "sneh",
      example: "Im Winter gibt es viel Schnee.",
      exampleSk: "V zime je veľa snehu.",
      gender: "M",
      srsId: "L29_V04",
      recycledFrom: []
    },
    {
      de: "das Gewitter",
      sk: "búrka",
      example: "Es gibt heute Gewitter.",
      exampleSk: "Dnes je búrka.",
      gender: "N",
      srsId: "L29_V05",
      recycledFrom: []
    },
    {
      de: "der Wind",
      sk: "vietor",
      example: "Es ist windig heute.",
      exampleSk: "Dnes je veterno.",
      gender: "M",
      srsId: "L29_V06",
      recycledFrom: []
    },
    {
      de: "die Temperatur",
      sk: "teplota",
      example: "Die Temperatur heute: 15 Grad.",
      exampleSk: "Teplota dnes: 15 stupňov.",
      gender: "F",
      srsId: "L29_V07",
      recycledFrom: []
    },
    {
      de: "es regnet",
      sk: "prší",
      example: "Es regnet heute.",
      exampleSk: "Dnes prší.",
      gender: null,
      srsId: "L29_V08",
      recycledFrom: []
    },
    {
      de: "es schneit",
      sk: "sneží",
      example: "Im Dezember schneit es.",
      exampleSk: "V decembri sneží.",
      gender: null,
      srsId: "L29_V09",
      recycledFrom: []
    },
    {
      de: "es ist warm / kalt",
      sk: "je teplo / chladno",
      example: "Im Sommer ist es warm.",
      exampleSk: "V lete je teplo.",
      gender: null,
      srsId: "L29_V10",
      recycledFrom: []
    },
    {
      de: "der Frühling",
      sk: "jar",
      example: "Im Frühling blühen die Blumen.",
      exampleSk: "Na jar kvitnú kvety.",
      gender: "M",
      srsId: "L29_V11",
      recycledFrom: []
    },
    {
      de: "der Sommer",
      sk: "leto",
      example: "Im Sommer fahre ich ans Meer.",
      exampleSk: "V lete cestujem k moru.",
      gender: "M",
      srsId: "L29_V12",
      recycledFrom: []
    },
    {
      de: "der Herbst",
      sk: "jeseň",
      example: "Im Herbst regnet es oft.",
      exampleSk: "Na jeseň často prší.",
      gender: "M",
      srsId: "L29_V13",
      recycledFrom: []
    },
    {
      de: "der Winter",
      sk: "zima (ročné obdobie)",
      example: "Im Winter ist es kalt.",
      exampleSk: "V zime je chladno.",
      gender: "M",
      srsId: "L29_V14",
      recycledFrom: []
    },
    {
      de: "angenehm",
      sk: "príjemný",
      example: "Das Wetter ist sehr angenehm.",
      exampleSk: "Počasie je veľmi príjemné.",
      gender: null,
      srsId: "L29_V15",
      recycledFrom: []
    }
  ],

  exercises: [
    {
      type: "flashcard",
      instruction: "Prezri si slovíčka o počasí a ročných obdobiach. Všimni si, že ‚es regnet/schneit' sú neosobné výrazy.",
      items: [
        "das Wetter = počasie",
        "die Sonne = slnko",
        "der Regen = dážď",
        "der Schnee = sneh",
        "das Gewitter = búrka",
        "der Wind = vietor",
        "die Temperatur = teplota",
        "es regnet = prší",
        "es schneit = sneží",
        "es ist warm = je teplo",
        "es ist kalt = je chladno",
        "der Frühling = jar",
        "der Sommer = leto",
        "der Herbst = jeseň",
        "der Winter = zima",
        "angenehm = príjemný"
      ]
    },
    {
      type: "mcq",
      instruction: "Vyber správnu odpoveď.",
      questions: [
        {
          question: "Ako povieme po nemecky ‚Prší.'?",
          options: ["Regen fällt.", "Es regnet.", "Der Regen ist.", "Regnet."],
          answer: "Es regnet.",
          explanation: "Neosobná konštrukcia: ‚es' + sloveso. ‚Es regnet.' = Prší. Nemčina vyžaduje formálne podmet ‚es', hoci nemá konkrétny význam."
        },
        {
          question: "Jana hovorí o počasí vo Viedni na jar. Čo povie?",
          options: [
            "Im Winter ist es warm.",
            "Im Frühling ist es angenehm.",
            "Im Herbst scheint die Sonne immer.",
            "Im Sommer schneit es."
          ],
          answer: "Im Frühling ist es angenehm.",
          explanation: "‚Im Frühling' = na jar. ‚Angenehm' = príjemný. ‚Im Frühling ist es angenehm.' = Na jar je príjemne."
        },
        {
          question: "Ako sa hovorí o búrke? ‚___ gibt es Gewitter.'",
          options: ["Das", "Es", "Er", "Sie"],
          answer: "Es",
          explanation: "‚Es gibt' = je, existuje. ‚Es gibt heute Gewitter.' = Dnes je búrka. ‚Es gibt' je bežná neosobná konštrukcia."
        },
        {
          question: "V ktorom ročnom období prší vo Viedni najčastejšie?",
          options: ["Im Frühling", "Im Sommer", "Im Herbst", "Im Winter"],
          answer: "Im Herbst",
          explanation: "Podľa textu v lekcii: ‚Im Herbst regnet es oft.' = Na jeseň často prší. Všimnime si: ‚Im Herbst' = na jeseň (in + dem Herbst = im Herbst)."
        },
        {
          question: "Ako sa povie ‚Svieti slnko'?",
          options: ["Die Sonne regnet.", "Die Sonne scheint.", "Es ist sonnig wird.", "Die Sonne geht auf."],
          answer: "Die Sonne scheint.",
          explanation: "‚Scheinen' = svietiť, žiariť. ‚Die Sonne scheint.' = Svieti slnko. ‚Scheinen' sa používa aj v prenesenom zmysle: ‚Du scheinst müde.' = Zdáš sa unavený."
        }
      ]
    },
    {
      type: "fill",
      instruction: "Doplň správny výraz do medzery ___.",
      questions: [
        {
          sentence: "___ regnet heute — ich brauche meinen Regenschirm.",
          answer: "Es",
          hint: "Neosobná konštrukcia — formálny podmet",
          explanation: "‚Es regnet' = prší. ‚Es' je formálny (dummy) podmet v neosobných vetách o počasí."
        },
        {
          sentence: "Im ___ ist es kalt und es schneit oft.",
          answer: "Winter",
          hint: "Ročné obdobie: sneh, chlad",
          explanation: "‚Im Winter' = v zime. ‚Im' = sťahovanie ‚in + dem'. ‚Der Winter' → ‚im Winter'."
        },
        {
          sentence: "Im Sommer ___ es sehr warm in Wien.",
          answer: "ist",
          hint: "Je (sloveso byť, 3. os.)",
          explanation: "‚Es ist warm' = je teplo. 3. osoba jednotného čísla od ‚sein' = ‚ist'."
        },
        {
          sentence: "Die Temperatur ist angenehm — nur 20 ___.",
          answer: "Grad",
          hint: "Jednotka teploty = stupeň",
          explanation: "‚Grad' = stupeň (teploty). ‚20 Grad' = 20 stupňov. ‚Grad' v množnom čísle zostáva ‚Grad' (bez -e)."
        },
        {
          sentence: "Im ___ blühen die Blumen und es wird warm.",
          answer: "Frühling",
          hint: "Ročné obdobie: kvety, teplo prichádza",
          explanation: "‚Im Frühling' = na jar. Jar = der Frühling (mužský rod)."
        }
      ]
    },
    {
      type: "listen",
      instruction: "Počúvaj vety o počasí a nájdi ich slovenský preklad.",
      questions: [
        { de: "Wie ist das Wetter heute in Wien?", sk: "Aké je dnes počasie vo Viedni?" },
        { de: "Es regnet, aber die Temperatur ist angenehm.", sk: "Prší, ale teplota je príjemná." },
        { de: "Im Winter gibt es viel Schnee in den Bergen.", sk: "Vo vysokých polohách je v zime veľa snehu." },
        { de: "Im Sommer scheint die Sonne fast jeden Tag.", sk: "V lete svieti slnko skoro každý deň." },
        { de: "Im Herbst ist das Wetter oft schlecht.", sk: "Na jeseň je počasie často zlé." },
        { de: "Es gibt heute Gewitter — bleib zu Hause!", sk: "Dnes je búrka — zostaň doma!" },
        { de: "Die Temperaturen sinken im November.", sk: "V novembri teploty klesajú." }
      ]
    },
    {
      type: "match",
      instruction: "Spoj nemecké výrazy o počasí s ich slovenským prekladom.",
      pairs: [
        ["es regnet", "prší"],
        ["es schneit", "sneží"],
        ["die Sonne scheint", "svieti slnko"],
        ["das Gewitter", "búrka"],
        ["der Wind", "vietor"],
        ["angenehm", "príjemný"],
        ["der Frühling", "jar"],
        ["der Herbst", "jeseň"]
      ]
    },
    {
      type: "dialogue",
      instruction: "Prečítaj si dialóg medzi Janou a jej mamou pri prechádzke Viedenskou promenádou. Rozprávajú sa o počasí.",
      lines: [
        { speaker: "A", de: "Jana, es regnet so stark! Hast du einen Regenschirm?", sk: "Jana, tak silno prší! Máš dáždnik?" },
        { speaker: "B", de: "Ja, Mama! Ich habe immer einen dabei in Wien.", sk: "Áno, mama! Vo Viedni ho mám vždy so sebou." },
        { speaker: "A", de: "In Bratislava regnet es im Oktober auch viel...", sk: "V Bratislave v októbri tiež veľa prší..." },
        { speaker: "B", de: "Ja, aber in Wien gibt es manchmal auch starken Wind und Gewitter.", sk: "Áno, ale vo Viedni je niekedy aj silný vietor a búrka." },
        { speaker: "A", de: "Wie ist das Wetter hier im Sommer?", sk: "Aké je tu počasie v lete?" },
        { speaker: "B", de: "Im Sommer ist es sehr warm — manchmal 35 Grad! Die Sonne scheint fast jeden Tag.", sk: "V lete je veľmi teplo — niekedy 35 stupňov! Slnko svieti skoro každý deň." },
        { speaker: "A", de: "Und im Frühling?", sk: "A na jar?" },
        { speaker: "B", de: "Im Frühling ist die Temperatur angenehm — nicht zu warm, nicht zu kalt.", sk: "Na jar je teplota príjemná — nie príliš teplo, nie príliš chladno." },
        { speaker: "A", de: "Trotzdem regnet es heute. Aber ich finde Wien wunderschön!", sk: "Napriek tomu dnes prší. Ale Viedeň sa mi zdá nádherná!" },
        { speaker: "B", de: "Ich bin froh, dass ihr gekommen seid! Jetzt gehen wir ins Café!", sk: "Rada, že ste prišli! Teraz ideme do kaviarne!" }
      ],
      comprehensionQuestions: [
        {
          question: "Aké počasie je v deň dialógu?",
          answer: "Prší a je veterno.",
          options: ["Svieti slnko", "Sneží", "Prší silno", "Je búrka"]
        },
        {
          question: "Aké je počasie vo Viedni v lete?",
          answer: "V lete je veľmi teplo, niekedy 35 stupňov a slnko svieti skoro každý deň.",
          options: ["Je chladno", "Je teplo a svieti slnko", "Veľa prší", "Sneží"]
        },
        {
          question: "Kde idú Jana a mama po prechádzke?",
          answer: "Idú do kaviarne.",
          options: ["Domov", "Do múzea", "Do kaviarne", "Do supermarketu"]
        }
      ]
    },
    {
      type: "minitext",
      instruction: "Prečítaj si stručnú predpoveď počasia pre Viedeň. Odpovedaj na otázky.",
      text:
        "Wetterbericht für Wien: Heute ist das Wetter nicht schön. Es regnet am Morgen und es gibt Gewitter am Nachmittag. Die Temperatur ist 14 Grad. Im Herbst ist das Wetter in Wien oft so. Am Wochenende wird es besser: Die Sonne scheint und es ist angenehm warm — ca. 18 Grad. Der Wind ist schwach.",
      textSk:
        "Predpoveď počasia pre Viedeň: Dnes počasie nie je pekné. Ráno prší a poobede je búrka. Teplota je 14 stupňov. Na jeseň je vo Viedni počasie často takéto. Cez víkend bude lepšie: Svieti slnko a je príjemne teplo — cca 18 stupňov. Vietor je slabý.",
      questions: [
        {
          question: "Aká je teplota dnes podľa predpovede?",
          answer: "Teplota je dnes 14 stupňov.",
          options: ["10 stupňov", "14 stupňov", "18 stupňov", "20 stupňov"]
        },
        {
          question: "Aké bude počasie cez víkend?",
          answer: "Cez víkend bude svietiť slnko a bude príjemne teplo (18 stupňov).",
          options: ["Bude pršať", "Bude snehovať", "Bude slnečno a 18 stupňov", "Bude búrka"]
        },
        {
          question: "Prečo je také počasie vo Viedni typické?",
          answer: "Pretože na jeseň je vo Viedni počasie často takéto.",
          options: ["Pretože je jar", "Pretože je leto", "Pretože je na jeseň", "Pretože je zima"]
        }
      ]
    },
    {
      type: "wordorder",
      instruction: "Zoraď slová do správnej nemeckej vety.",
      sentences: [
        {
          words: ["Jana", "ist", "nach", "Wien", "gefahren"],
          correct: "Jana ist nach Wien gefahren",
          hint: "Jana cestovala do Viedne.",
          explanation: "Perfekt s 'sein': pohybové sloveso fahren → ist gefahren. Partizip II na konci."
        },
        {
          words: ["Ich", "bin", "heute", "früh", "aufgestanden"],
          correct: "Ich bin heute früh aufgestanden",
          hint: "Dnes som vstal/a skoro.",
          explanation: "Odlučiteľné sloveso: auf-stehen → aufgestanden. Perfekt s sein (zmena stavu)."
        },
        {
          words: ["Jana", "ist", "um", "neun", "Uhr", "angekommen"],
          correct: "Jana ist um neun Uhr angekommen",
          hint: "Jana prišla o deviatej hodine.",
          explanation: "an-kommen → angekommen. Perfekt s sein (pohyb k cieľu)."
        },
        {
          words: ["Wir", "sind", "gestern", "ins", "Kino", "gegangen"],
          correct: "Wir sind gestern ins Kino gegangen",
          hint: "Včera sme šli do kina.",
          explanation: "gehen → gegangen. Perfekt s sein (pohyb). gehen sa vždy spája so sein!"
        },
        {
          words: ["Bist", "du", "schon", "in", "Wien", "gewesen"],
          correct: "Bist du schon in Wien gewesen",
          hint: "Bol/a si už vo Viedni?",
          explanation: "sein → gewesen. Perfekt od 'sein': Hilfsverb sein + gewesen."
        }
      ]
    },
    {
      type: "speaking",
      instruction: "Počúvaj nemeckú vetu. Potom hovor nahlas a skontroluj sa.",
      phrases: [
        {
          de: "Ich bin gestern nach Wien gefahren.",
          sk: "Včera som cestoval/a do Viedne.",
          tip: "fahren→sein+gefahren"
        },
        {
          de: "Jana ist um 9 Uhr angekommen.",
          sk: "Jana prišla o 9 hodín.",
          tip: "ankommen→sein+angekommen"
        },
        {
          de: "Wir sind zu Fuß gegangen.",
          sk: "Šli sme peši.",
          tip: "gehen→sein+gegangen"
        },
        {
          de: "Ich bin früh aufgestanden.",
          sk: "Vstal/a som skoro.",
          tip: "aufstehen→sein+aufgestanden"
        },
        {
          de: "Bist du schon in Wien gewesen?",
          sk: "Bol/a si už vo Viedni?",
          tip: "sein→sein+gewesen"
        }
      ]
    }
  ],

  reviewWords: ["L16_V05", "L28_V05"],
  lessonNotes:
    "Neosobné konštrukcie: ‚es regnet', ‚es schneit', ‚es ist kalt/warm'. Nemecké ‚es' je formálna záplata — slovenčina to nevyžaduje. Ročné obdobia vždy s ‚im': ‚im Frühling', ‚im Sommer', ‚im Herbst', ‚im Winter'. Predpoveď počasia je skvelá téma na precvičenie základného small talku!"
};
