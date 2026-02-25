export const lesson24 = {
  id: 24,
  week: 5,
  day: 4,
  title: "Verkehrsmittel — Bus und Bahn",
  topic: "Dopravné prostriedky — autobus a vlak",
  cefr: "A1",
  xpReward: 30,
  narrativeContext:
    "Jana musí jeden Tag allein mit Bus und U-Bahn fahren. Sie kauft eine Monatskarte am Automaten und fragt nach Verbindungen. 'Muss ich umsteigen?' Jetzt ist sie wirklich eine echte Wienerin!",
  communicativeGoal:
    "Po tejto lekcii viem používať viedenskú MHD — kúpiť lístok, pýtať sa na spoje, a opisovať ako cestujem každý deň do práce.",
  skillFocus: ["vocabulary", "grammar", "listening", "speaking"],

  grammarNote: {
    rule: "Modálne slovesá v kontexte dopravy + ‚mit + datív' pri dopravných prostriedkoch",
    explanation:
      "Modálne slovesá müssen (musieť), können (môcť/vedieť), möchten (chcieť) a dürfen (smieť) sa používajú s infinitívom na konci vety. Pri dopravných prostriedkoch používame predložku ‚mit + datív': ‚mit der U-Bahn' (die → der, datív), ‚mit dem Bus' (der → dem, datív). Odlučiteľné slovesá v otázke: ‚Muss ich umsteigen?' — sloveso je na 2. mieste, predpona na konci.",
    examples: [
      { de: "Ich möchte eine Fahrkarte kaufen.", sk: "Chcel by som si kúpiť lístok." },
      { de: "Muss ich umsteigen?", sk: "Musím prestúpiť?" },
      { de: "Kann ich mit Karte zahlen?", sk: "Môžem platiť kartou?" },
      { de: "Ich fahre mit der U-Bahn.", sk: "Cestujem metrom." },
      { de: "Sie dürfen hier nicht fahren.", sk: "Tu nesmú jazdiť." }
    ],
    slovakContrastNote:
      "Modálne slovesá fungujú podobne ako v slovenčine. Hlavný rozdiel: nemecký infinitív vždy ide na koniec hlavnej vety (‚Ich muss umsteigen' — nie ‚Ich muss prestupovať'). Predložka ‚mit' = slovenské ‚s / so' alebo sa vyjadruje inštrumentálom (‚metrom' = ‚mit der U-Bahn')."
  },

  vocab: [
    {
      de: "die U-Bahn",
      sk: "metro",
      example: "Ich fahre täglich mit der U-Bahn.",
      exampleSk: "Každý deň cestujem metrom.",
      gender: "F",
      srsId: "L24_V01",
      recycledFrom: []
    },
    {
      de: "die S-Bahn",
      sk: "predmestská železnica",
      example: "Die S-Bahn fährt nach Bratislava.",
      exampleSk: "Predmestský vlak jazdí do Bratislavy.",
      gender: "F",
      srsId: "L24_V02",
      recycledFrom: []
    },
    {
      de: "die Straßenbahn / die Bim",
      sk: "električka",
      example: "Die Bim fährt jede 5 Minuten.",
      exampleSk: "Električka jazdí každých 5 minút.",
      gender: "F",
      srsId: "L24_V03",
      recycledFrom: []
    },
    {
      de: "der Autobus",
      sk: "autobus",
      example: "Der Autobus Linie 13A.",
      exampleSk: "Autobus linky 13A.",
      gender: "M",
      srsId: "L24_V04",
      recycledFrom: []
    },
    {
      de: "die Linie",
      sk: "linka / číslo linky",
      example: "Welche Linie fährt zum Zentrum?",
      exampleSk: "Ktorá linka ide do centra?",
      gender: "F",
      srsId: "L24_V05",
      recycledFrom: []
    },
    {
      de: "der Fahrplan",
      sk: "cestovný poriadok",
      example: "Der Fahrplan hängt an der Haltestelle.",
      exampleSk: "Cestovný poriadok visí na zastávke.",
      gender: "M",
      srsId: "L24_V06",
      recycledFrom: []
    },
    {
      de: "die Monatskarte",
      sk: "mesačná karta",
      example: "Eine Monatskarte kostet 51 Euro.",
      exampleSk: "Mesačná karta stojí 51 eur.",
      gender: "F",
      srsId: "L24_V07",
      recycledFrom: []
    },
    {
      de: "die Einzelkarte",
      sk: "jednorazový lístok",
      example: "Ich kaufe eine Einzelkarte.",
      exampleSk: "Kupujem jednorazový lístok.",
      gender: "F",
      srsId: "L24_V08",
      recycledFrom: []
    },
    {
      de: "der Automat",
      sk: "automat",
      example: "Am Automaten kann man Tickets kaufen.",
      exampleSk: "Na automate sa dajú kúpiť lístky.",
      gender: "M",
      srsId: "L24_V09",
      recycledFrom: []
    },
    {
      de: "einsteigen ⚠️",
      sk: "nastúpiť (do dopravného prostriedku)",
      example: "Bitte einsteigen!",
      exampleSk: "Prosím nastupujte!",
      gender: null,
      srsId: "L24_V10",
      recycledFrom: []
    },
    {
      de: "aussteigen ⚠️",
      sk: "vystúpiť (z dopravného prostriedku)",
      example: "Wo muss ich aussteigen?",
      exampleSk: "Kde musím vystúpiť?",
      gender: null,
      srsId: "L24_V11",
      recycledFrom: []
    },
    {
      de: "umsteigen ⚠️",
      sk: "prestúpiť / prestupovať",
      example: "Muss ich umsteigen?",
      exampleSk: "Musím prestúpiť?",
      gender: null,
      srsId: "L24_V12",
      recycledFrom: [16]
    },
    {
      de: "die Verbindung",
      sk: "spoj / spojenie",
      example: "Gibt es eine direkte Verbindung?",
      exampleSk: "Je tu priame spojenie?",
      gender: "F",
      srsId: "L24_V13",
      recycledFrom: []
    },
    {
      de: "direkt",
      sk: "priamy",
      example: "Der Zug fährt direkt nach Bratislava.",
      exampleSk: "Vlak jazdí priamo do Bratislavy.",
      gender: null,
      srsId: "L24_V14",
      recycledFrom: []
    },
    {
      de: "die Richtung",
      sk: "smer",
      example: "In welcher Richtung fahre ich?",
      exampleSk: "Ktorým smerom cestujem?",
      gender: "F",
      srsId: "L24_V15",
      recycledFrom: []
    },
    {
      de: "der Anschluss",
      sk: "prestup / nadväznosť",
      example: "Der Anschluss ist in 5 Minuten.",
      exampleSk: "Prestup je o 5 minút.",
      gender: "M",
      srsId: "L24_V16",
      recycledFrom: []
    },
    {
      de: "gültig",
      sk: "platný",
      example: "Das Ticket ist eine Stunde gültig.",
      exampleSk: "Lístok platí jednu hodinu.",
      gender: null,
      srsId: "L24_V17",
      recycledFrom: []
    },
    {
      de: "kontrollieren",
      sk: "kontrolovať",
      example: "Ein Kontrolleur kontrolliert die Fahrkarte.",
      exampleSk: "Revízor kontroluje lístok.",
      gender: null,
      srsId: "L24_V18",
      recycledFrom: []
    }
  ],

  exercises: [
    {
      type: "flashcard",
      instruction: "Prezri si slovíčku týkajúcu sa dopravy vo Viedni.",
      items: [
        "die U-Bahn = metro",
        "die S-Bahn = predmestská železnica",
        "die Straßenbahn / die Bim = električka",
        "der Autobus = autobus",
        "die Linie = linka",
        "der Fahrplan = cestovný poriadok",
        "die Monatskarte = mesačná karta",
        "die Einzelkarte = jednorazový lístok",
        "der Automat = automat",
        "einsteigen = nastúpiť",
        "aussteigen = vystúpiť",
        "umsteigen = prestúpiť",
        "die Verbindung = spoj / spojenie",
        "direkt = priamy",
        "die Richtung = smer",
        "der Anschluss = prestup / nadväznosť",
        "gültig = platný",
        "kontrollieren = kontrolovať"
      ]
    },
    {
      type: "mcq",
      instruction: "Vyber správnu odpoveď.",
      questions: [
        {
          question: "Jana cestuje metrom. Ako to povie po nemecky?",
          options: [
            "Ich fahre in der U-Bahn.",
            "Ich fahre mit der U-Bahn.",
            "Ich fahre durch die U-Bahn.",
            "Ich fahre für die U-Bahn."
          ],
          answer: "Ich fahre mit der U-Bahn.",
          explanation: "Dopravné prostriedky vyjadrujeme predložkou ‚mit + datív': ‚mit der U-Bahn' (die → der, datív ženského rodu)."
        },
        {
          question: "Jana sa pýta: ‚Muss ich ___steigen?' (prestúpiť). Čo patrí do medzery?",
          options: ["ein", "aus", "um", "an"],
          answer: "um",
          explanation: "‚Umsteigen' = prestúpiť. Je to odlučiteľné sloveso: predpona ‚um' ide na koniec. ‚Muss ich umsteigen?'"
        },
        {
          question: "Čo znamená ‚gültig'?",
          options: ["Zadarmo", "Platný", "Lacný", "Zrušený"],
          answer: "Platný",
          explanation: "‚Gültig' = platný. ‚Das Ticket ist eine Stunde gültig.' = Lístok platí jednu hodinu."
        },
        {
          question: "Jana kupuje lístok na jeden cestovný úsek. Čo si kúpi?",
          options: ["eine Monatskarte", "eine Einzelkarte", "eine Wochenkarte", "einen Fahrplan"],
          answer: "eine Einzelkarte",
          explanation: "‚Einzelkarte' = jednorazový lístok (na jeden cestovný úsek). ‚Monatskarte' = mesačná karta (na celý mesiac)."
        },
        {
          question: "Jana chce vedieť, kde má vystúpiť. Čo povie?",
          options: ["Wo muss ich einsteigen?", "Wo muss ich umsteigen?", "Wo muss ich aussteigen?", "Wo muss ich fahren?"],
          answer: "Wo muss ich aussteigen?",
          explanation: "‚Aussteigen' = vystúpiť (z dopravného prostriedku). ‚Einsteigen' = nastúpiť, ‚umsteigen' = prestúpiť."
        },
        {
          question: "Ktorú predložku použijeme s autobusovou linkou? ‚Ich fahre ___ dem Bus.'",
          options: ["mit", "bei", "nach", "von"],
          answer: "mit",
          explanation: "‚Mit dem Bus' — ‚mit + datív'. ‚Der Bus' → ‚mit dem Bus' (datív mužského rodu)."
        }
      ]
    },
    {
      type: "fill",
      instruction: "Doplň správne slovo alebo tvar do medzery ___.",
      questions: [
        {
          sentence: "Ich fahre täglich mit ___ U-Bahn zur Arbeit.",
          answer: "der",
          hint: "die U-Bahn → datív → ???",
          explanation: "‚Die U-Bahn' v datíve po ‚mit': die → der. ‚Mit der U-Bahn.'"
        },
        {
          sentence: "Muss ich ___steigen, oder gibt es eine direkte Verbindung?",
          answer: "um",
          hint: "Prestúpiť = ___steigen",
          explanation: "‚Umsteigen' = prestúpiť. Predpona ‚um' ide na koniec vety pri odlučiteľných slovesách."
        },
        {
          sentence: "Der Fahrplan ___ an der Haltestelle.",
          answer: "hängt",
          hint: "Hängen = visieť (3. os. jedn. čísla)",
          explanation: "‚Hängen' = visieť. 3. osoba jednotného čísla: ‚hängt'."
        },
        {
          sentence: "Das Ticket ist zwei Stunden ___.",
          answer: "gültig",
          hint: "Platný",
          explanation: "‚Gültig' = platný. ‚Das Ticket ist zwei Stunden gültig.' = Lístok platí dve hodiny."
        },
        {
          sentence: "Kann ich am ___ eine Einzelkarte kaufen?",
          answer: "Automaten",
          hint: "Na automate (der Automat → Dativ: ???)",
          explanation: "‚Am Automaten' = na automate. ‚An + dem → am', ‚der Automat' → ‚dem Automaten' (datív + -en)."
        }
      ]
    },
    {
      type: "listen",
      instruction: "Počúvaj vety o doprave a nájdi ich slovenský preklad.",
      questions: [
        { de: "Ich fahre täglich mit der U-Bahn zur Arbeit.", sk: "Každý deň cestujem metrom do práce." },
        { de: "Muss ich umsteigen?", sk: "Musím prestúpiť?" },
        { de: "Nein, die U4 fährt direkt.", sk: "Nie, U4 jazdí priamo." },
        { de: "Wo muss ich aussteigen?", sk: "Kde musím vystúpiť?" },
        { de: "Eine Monatskarte kostet 51 Euro.", sk: "Mesačná karta stojí 51 eur." },
        { de: "Kann ich mit Karte zahlen?", sk: "Môžem platiť kartou?" },
        { de: "Der Fahrplan hängt an der Haltestelle.", sk: "Cestovný poriadok visí na zastávke." },
        { de: "In welcher Richtung fährt der Bus?", sk: "Ktorým smerom jazdí autobus?" }
      ]
    },
    {
      type: "match",
      instruction: "Spoj nemecké výrazy s ich slovenským prekladom.",
      pairs: [
        ["die Monatskarte", "mesačná karta"],
        ["einsteigen", "nastúpiť"],
        ["aussteigen", "vystúpiť"],
        ["umsteigen", "prestúpiť"],
        ["die Verbindung", "spoj / spojenie"],
        ["gültig", "platný"],
        ["der Fahrplan", "cestovný poriadok"],
        ["die Richtung", "smer"]
      ]
    },
    {
      type: "dialogue",
      instruction: "Prečítaj si dialóg. Jana je pri automate na lístky a žiada o pomoc iného cestujúceho.",
      lines: [
        { speaker: "A", de: "Entschuldigung, ich möchte eine Monatskarte kaufen. Können Sie mir helfen?", sk: "Prepáčte, chcela by som si kúpiť mesačnú kartu. Môžete mi pomôcť?" },
        { speaker: "B", de: "Natürlich! Drücken Sie hier auf ‚Monatskarte'.", sk: "Samozrejme! Stlačte tu na ‚Mesačná karta'." },
        { speaker: "A", de: "Danke! Und ich möchte zur Arbeit in die Herrengasse. Muss ich umsteigen?", sk: "Ďakujem! A idem do práce na Herrengasse. Musím prestúpiť?" },
        { speaker: "B", de: "Nein, die U3 fährt direkt. Kein Umsteigen nötig.", sk: "Nie, U3 jazdí priamo. Žiadne prestupovanie nie je potrebné." },
        { speaker: "A", de: "Super! Und in welcher Richtung muss ich fahren?", sk: "Super! A ktorým smerom musím cestovať?" },
        { speaker: "B", de: "Richtung Simmering. Steigen Sie an der Station Herrengasse aus.", sk: "Smerom na Simmering. Vystúpte na stanici Herrengasse." },
        { speaker: "A", de: "Wo ist die nächste Haltestelle?", sk: "Kde je najbližšia zastávka?" },
        { speaker: "B", de: "Gleich hier um die Ecke, zwei Minuten zu Fuß.", sk: "Hneď tu za rohom, dve minúty pešo." },
        { speaker: "A", de: "Und wie lange ist die Monatskarte gültig?", sk: "A ako dlho platí mesačná karta?" },
        { speaker: "B", de: "Genau einen Monat — sehr praktisch für Wien!", sk: "Presne jeden mesiac — veľmi praktické pre Viedeň!" }
      ],
      comprehensionQuestions: [
        {
          question: "Čo si Jana chce kúpiť?",
          answer: "Jana si chce kúpiť mesačnú kartu.",
          options: ["Jednorazový lístok", "Týždenný lístok", "Mesačnú kartu", "Ročnú kartu"]
        },
        {
          question: "Musí Jana prestúpiť na ceste do práce?",
          answer: "Nie, U3 jazdí priamo.",
          options: ["Áno, raz", "Áno, dvakrát", "Nie, jazdí priamo", "Áno, na U4"]
        },
        {
          question: "Kde má Jana vystúpiť?",
          answer: "Jana má vystúpiť na stanici Herrengasse.",
          options: ["Na stanici Simmering", "Na stanici Herrengasse", "Na Marktplatz", "Na stanici Центrum"]
        }
      ]
    },
    {
      type: "minitext",
      instruction: "Prečítaj si správu, ktorú Jana posiela svojej mame o ceste do práce. Odpovedz na otázky.",
      text:
        "Hallo Mama! Ich fahre jeden Morgen mit der U-Bahn zur Arbeit. Ich muss nicht umsteigen — die U3 fährt direkt von meiner Haltestelle bis zur Herrengasse. Das dauert nur 12 Minuten! Ich habe eine Monatskarte — sie ist für alle Linien in Wien gültig. Der Autobus und die Straßenbahn sind auch möglich, aber die U-Bahn ist am schnellsten. Liebe Grüße, Jana",
      textSk:
        "Ahoj mama! Každý deň cestujem metrom do práce. Nemusím prestupovať — U3 jazdí priamo od mojej zastávky až po Herrengasse. Trvá to len 12 minút! Mám mesačnú kartu — platí pre všetky linky vo Viedni. Autobus a električka sú tiež možné, ale metro je najrýchlejšie. Pozdravuje Jana",
      questions: [
        {
          question: "Musí Jana prestupovať na ceste do práce?",
          answer: "Nie, U3 jazdí priamo od jej zastávky.",
          options: ["Áno, raz", "Nie, jazdí priamo", "Áno, dvakrát", "Nie je isté"]
        },
        {
          question: "Ako dlho trvá Janina cesta do práce?",
          answer: "Cesta trvá len 12 minút.",
          options: ["5 minút", "12 minút", "20 minút", "30 minút"]
        },
        {
          question: "Prečo uprednostňuje Jana metro pred autobusmi a električkami?",
          answer: "Pretože metro je najrýchlejšie.",
          options: ["Pretože je lacnejší", "Pretože je najkrajší", "Pretože je najrýchlejší", "Pretože je bližšie"]
        }
      ]
    },
    {
      type: "wordorder",
      instruction: "Zoraď slová do správnej nemeckej vety.",
      sentences: [
        {
          words: ["Das", "ist", "eine", "schöne", "neue", "Wohnung"],
          correct: "Das ist eine schöne neue Wohnung",
          hint: "Toto je krásny nový byt.",
          explanation: "Po neurčitom člene (eine) F Nominatív: -e koncovka: eine schöne Wohnung."
        },
        {
          words: ["Der", "neue", "Kollege", "ist", "sehr", "nett"],
          correct: "Der neue Kollege ist sehr nett",
          hint: "Nový kolega je veľmi milý.",
          explanation: "Po určitom člene (der) M Nominatív: -e koncovka: der neue Kollege."
        },
        {
          words: ["Ein", "freundlicher", "Chef", "ist", "wichtig"],
          correct: "Ein freundlicher Chef ist wichtig",
          hint: "Priateľský šéf je dôležitý.",
          explanation: "Po neurčitom člene (ein) M Nominatív: -er koncovka: ein freundlicher Chef."
        },
        {
          words: ["Das", "moderne", "Büro", "gefällt", "Jana", "sehr"],
          correct: "Das moderne Büro gefällt Jana sehr",
          hint: "Moderná kancelária sa Jane veľmi páči.",
          explanation: "Po určitom člene (das) N Nominatív: -e koncovka: das moderne Büro."
        },
        {
          words: ["Die", "schöne", "Stadt", "heißt", "Wien"],
          correct: "Die schöne Stadt heißt Wien",
          hint: "Krásne mesto sa volá Viedeň.",
          explanation: "Po určitom člene (die) F Nominatív: -e koncovka: die schöne Stadt."
        }
      ]
    },
    {
      type: "speaking",
      instruction: "Počúvaj nemeckú vetu. Potom hovor nahlas a skontroluj sa.",
      phrases: [
        {
          de: "Meine neue Wohnung ist sehr schön.",
          sk: "Môj nový byt je veľmi krásny.",
          tip: "neue: F Nom po meine → -e"
        },
        {
          de: "Ich habe ein großes Wohnzimmer.",
          sk: "Mám veľkú obývačku.",
          tip: "großes: N Akk po ein → -es"
        },
        {
          de: "Der helle Balkon ist mein Lieblingsplatz.",
          sk: "Svetlý balkón je moje obľúbené miesto.",
          tip: "helle: M Nom po der → -e"
        },
        {
          de: "Das moderne Bad gefällt mir sehr.",
          sk: "Moderná kúpeľňa sa mi veľmi páči.",
          tip: "moderne: N Nom po das → -e"
        },
        {
          de: "Es ist eine gemütliche kleine Wohnung.",
          sk: "Je to útulný malý byt.",
          tip: "gemütliche: F Nom po eine → -e"
        }
      ]
    }
  ],

  reviewWords: ["L16_V10", "L16_V11", "L16_V12", "L16_V13", "L20_V14", "L20_V15", "L23_V18"],
  lessonNotes:
    "Tri kľúčové odlučiteľné slovesá: einsteigen (nastúpiť), aussteigen (vystúpiť), umsteigen (prestúpiť). Pri otázkach: ‚Muss ich umsteigen?' — predpona ide na koniec. S dopravnými prostriedkami vždy ‚mit + datív': mit der U-Bahn, mit dem Bus, mit der Straßenbahn."
};
