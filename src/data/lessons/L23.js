export const lesson23 = {
  id: 23,
  week: 5,
  day: 3,
  title: "Wegbeschreibung — Wo ist...?",
  topic: "Popis cesty — Kde je...?",
  cefr: "A1",
  xpReward: 25,
  narrativeContext:
    "Jana putuje sama po Viedni. Hľadá staré námestie, poštu, banku. Pýta sa na cestu a dostáva rôzne odpovede — niektoré jednoduché, niektoré komplikované! Učí sa pomenovať miesta v meste a opísať ich polohu.",
  communicativeGoal:
    "Po tejto lekcii viem opísať a pochopiť cestu v meste, poznám základné miesta vo Viedni a použijem správne predložky smeru a polohy.",
  skillFocus: ["vocabulary", "grammar", "listening", "speaking"],

  grammarNote: {
    rule: "Predložky miesta + datív (náhľad): gegenüber, neben, zwischen",
    explanation:
      "Predložky polohy gegenüber von, neben a zwischen vyžadujú datívny pád. Základná zmena: der (M) → dem, das (N) → dem, die (F) → der. Príklady: ‚neben dem Supermarkt' (M), ‚zwischen dem Café und der Bank' (M a F). Datív bude podrobne vysvetlený v L25 — zatiaľ sa uč tieto výrazy ako celky.",
    examples: [
      { de: "Die Bank ist gegenüber der Post.", sk: "Banka je oproti pošte." },
      { de: "Das Café ist neben dem Supermarkt.", sk: "Kaviareň je vedľa supermarketu." },
      { de: "Die Apotheke ist zwischen dem Café und der Bank.", sk: "Lekáreň je medzi kaviarňou a bankou." },
      { de: "Das Museum ist im Zentrum.", sk: "Múzeum je v centre." },
      { de: "Die Kirche ist um die Ecke.", sk: "Kostol je za rohom." }
    ],
    slovakContrastNote:
      "Slovenčina používa ‚v + lokál' pri vyjadrení miesta (v meste, v centre). Nemčina používa ‚in der Stadt', ‚im Zentrum' (in + datív). Ženský rod v datíve vyzerá ako mužský rod v nominatíve (‚der'): ‚neben der Bank' — tu ‚der' = datív ženského rodu, nie nominatív mužského! Toto je typický zdroj zmätenia — datív bude detailne v L25."
  },

  vocab: [
    {
      de: "das Stadtzentrum / die Innenstadt",
      sk: "centrum mesta",
      example: "Das Stadtzentrum ist sehr schön.",
      exampleSk: "Centrum mesta je veľmi krásne.",
      gender: "N",
      srsId: "L23_V01",
      recycledFrom: []
    },
    {
      de: "der Marktplatz",
      sk: "trhovisko / námestie",
      example: "Der Marktplatz ist in der Nähe.",
      exampleSk: "Trhovisko je blízko.",
      gender: "M",
      srsId: "L23_V02",
      recycledFrom: []
    },
    {
      de: "die Post",
      sk: "pošta",
      example: "Die Post öffnet um 8 Uhr.",
      exampleSk: "Pošta otvára o 8:00.",
      gender: "F",
      srsId: "L23_V03",
      recycledFrom: []
    },
    {
      de: "die Bank",
      sk: "banka",
      example: "Die Bank ist gegenüber der Post.",
      exampleSk: "Banka je oproti pošte.",
      gender: "F",
      srsId: "L23_V04",
      recycledFrom: []
    },
    {
      de: "das Krankenhaus",
      sk: "nemocnica",
      example: "Das Krankenhaus ist weit.",
      exampleSk: "Nemocnica je ďaleko.",
      gender: "N",
      srsId: "L23_V05",
      recycledFrom: []
    },
    {
      de: "die Apotheke",
      sk: "lekáreň",
      example: "Die Apotheke ist um die Ecke.",
      exampleSk: "Lekáreň je za rohom.",
      gender: "F",
      srsId: "L23_V06",
      recycledFrom: []
    },
    {
      de: "der Supermarkt",
      sk: "supermarket",
      example: "Der Supermarkt ist neben der Post.",
      exampleSk: "Supermarket je vedľa pošty.",
      gender: "M",
      srsId: "L23_V07",
      recycledFrom: [6]
    },
    {
      de: "das Museum",
      sk: "múzeum",
      example: "Das Museum ist im Zentrum.",
      exampleSk: "Múzeum je v centre.",
      gender: "N",
      srsId: "L23_V08",
      recycledFrom: []
    },
    {
      de: "die Kirche",
      sk: "kostol",
      example: "Die Kirche ist sehr alt.",
      exampleSk: "Kostol je veľmi starý.",
      gender: "F",
      srsId: "L23_V09",
      recycledFrom: []
    },
    {
      de: "gegenüber (+Dativ)",
      sk: "oproti",
      example: "Die Bank ist gegenüber dem Hotel.",
      exampleSk: "Banka je oproti hotelu.",
      gender: null,
      srsId: "L23_V10",
      recycledFrom: []
    },
    {
      de: "neben (+Dativ)",
      sk: "vedľa",
      example: "Das Café ist neben der Bank.",
      exampleSk: "Kaviareň je vedľa banky.",
      gender: null,
      srsId: "L23_V11",
      recycledFrom: []
    },
    {
      de: "zwischen (+Dativ)",
      sk: "medzi",
      example: "Die Apotheke ist zwischen dem Café und der Bank.",
      exampleSk: "Lekáreň je medzi kaviarňou a bankou.",
      gender: null,
      srsId: "L23_V12",
      recycledFrom: []
    },
    {
      de: "die Minute",
      sk: "minúta",
      example: "Fünf Minuten zu Fuß.",
      exampleSk: "Päť minút pešo.",
      gender: "F",
      srsId: "L23_V13",
      recycledFrom: []
    },
    {
      de: "zu Fuß",
      sk: "pešo",
      example: "Ich gehe zu Fuß.",
      exampleSk: "Chodím pešo.",
      gender: null,
      srsId: "L23_V14",
      recycledFrom: []
    },
    {
      de: "geradeaus gehen",
      sk: "ísť rovno",
      example: "Gehen Sie 200 Meter geradeaus.",
      exampleSk: "Choďte 200 metrov rovno.",
      gender: null,
      srsId: "L23_V15",
      recycledFrom: []
    },
    {
      de: "das Hotel",
      sk: "hotel",
      example: "Das Hotel ist am Marktplatz.",
      exampleSk: "Hotel je na námestí.",
      gender: "N",
      srsId: "L23_V16",
      recycledFrom: []
    },
    {
      de: "der Park",
      sk: "park",
      example: "Der Park ist neben dem Museum.",
      exampleSk: "Park je vedľa múzea.",
      gender: "M",
      srsId: "L23_V17",
      recycledFrom: []
    },
    {
      de: "die Haltestelle",
      sk: "zastávka",
      example: "Die Haltestelle ist 3 Minuten entfernt.",
      exampleSk: "Zastávka je 3 minúty odtiaľto.",
      gender: "F",
      srsId: "L23_V18",
      recycledFrom: []
    }
  ],

  exercises: [
    {
      type: "flashcard",
      instruction: "Prezri si slovíčka — miesta v meste a predložky polohy.",
      items: [
        "das Stadtzentrum = centrum mesta",
        "der Marktplatz = trhovisko / námestie",
        "die Post = pošta",
        "die Bank = banka",
        "das Krankenhaus = nemocnica",
        "die Apotheke = lekáreň",
        "der Supermarkt = supermarket",
        "das Museum = múzeum",
        "die Kirche = kostol",
        "gegenüber (+Dativ) = oproti",
        "neben (+Dativ) = vedľa",
        "zwischen (+Dativ) = medzi",
        "die Minute = minúta",
        "zu Fuß = pešo",
        "das Hotel = hotel",
        "der Park = park",
        "die Haltestelle = zastávka"
      ]
    },
    {
      type: "mcq",
      instruction: "Vyber správnu odpoveď.",
      questions: [
        {
          question: "Jana hovorí: ‚Die Apotheke ist ___ der Post.' (oproti pošte) Čo patrí do medzery?",
          options: ["neben", "zwischen", "gegenüber", "hinter"],
          answer: "gegenüber",
          explanation: "‚Gegenüber' = oproti. ‚Die Apotheke ist gegenüber der Post.' — predložky miesta gegenüber, neben, zwischen sú nasledované datívom."
        },
        {
          question: "Čo znamená ‚zu Fuß gehen'?",
          options: ["Cestovať autobusom", "Ísť pešo", "Ísť bicyklom", "Cestovať metrom"],
          answer: "Ísť pešo",
          explanation: "‚Zu Fuß gehen' = ísť pešo. ‚Fuß' = noha/chodidlo. ‚Ich gehe zu Fuß.' = Chodím pešo."
        },
        {
          question: "Kde je múzeum? ‚Das Museum ist ___ Zentrum.'",
          options: ["in die", "im", "beim", "nach dem"],
          answer: "im",
          explanation: "‚Im Zentrum' = v centre. ‚Im' je sťahovanie ‚in + dem'. ‚Das Museum ist im Zentrum.'"
        },
        {
          question: "Jana hovorí: ‚Das Café ist ___ dem Supermarkt und ___ Bank.' (medzi) Čo patrí na prvé miesto?",
          options: ["gegenüber", "neben", "zwischen", "hinter"],
          answer: "zwischen",
          explanation: "‚Zwischen' = medzi. Pri použití ‚zwischen' nasleduje datív: ‚zwischen dem Supermarkt und der Bank'."
        },
        {
          question: "Ako sa povie ‚Kostol je vedľa parku'?",
          options: [
            "Die Kirche ist gegenüber dem Park.",
            "Die Kirche ist neben dem Park.",
            "Die Kirche ist zwischen dem Park.",
            "Die Kirche ist hinter dem Park."
          ],
          answer: "Die Kirche ist neben dem Park.",
          explanation: "‚Neben' = vedľa. ‚Neben dem Park' — ‚der Park' → ‚dem Park' (datív, mužský rod)."
        }
      ]
    },
    {
      type: "fill",
      instruction: "Doplň správne slovo alebo tvar do medzery ___.",
      questions: [
        {
          sentence: "Die Bank ist ___ der Post. (oproti)",
          answer: "gegenüber",
          hint: "Predložka pre polohu oproti niečomu",
          explanation: "‚Gegenüber' = oproti. Nasleduje datív: ‚gegenüber der Post' (die Post → der Post, datív ženského rodu)."
        },
        {
          sentence: "Das Museum ist ___ dem Park. (vedľa)",
          answer: "neben",
          hint: "Predložka pre polohu vedľa niečoho",
          explanation: "‚Neben' = vedľa. ‚Neben dem Park' — park je mužského rodu, datív: der Park → dem Park."
        },
        {
          sentence: "Die Haltestelle ist fünf Minuten ___ Fuß entfernt.",
          answer: "zu",
          hint: "Výraz pre pešiu vzdialenosť",
          explanation: "‚Zu Fuß' = pešo. ‚Fünf Minuten zu Fuß entfernt' = päť minút pešo odtiaľto."
        },
        {
          sentence: "Das Rathaus ist ___ Stadtzentrum.",
          answer: "im",
          hint: "in + dem (sťahovanie) = ???",
          explanation: "‚Im' = in + dem. ‚Im Stadtzentrum' = v centre mesta."
        },
        {
          sentence: "Die Apotheke ist ___ der Kirche und dem Supermarkt. (medzi)",
          answer: "zwischen",
          hint: "Predložka pre polohu ‚medzi' dvoma miestami",
          explanation: "‚Zwischen' = medzi. Nasleduje datív oboch substantív: ‚zwischen der Kirche und dem Supermarkt'."
        }
      ]
    },
    {
      type: "listen",
      instruction: "Počúvaj vety o polohe miest a nájdi ich slovenský preklad.",
      questions: [
        { de: "Die Bank ist gegenüber der Post.", sk: "Banka je oproti pošte." },
        { de: "Das Café ist neben dem Supermarkt.", sk: "Kaviareň je vedľa supermarketu." },
        { de: "Die Apotheke ist zwischen dem Café und der Bank.", sk: "Lekáreň je medzi kaviarňou a bankou." },
        { de: "Das Museum ist im Stadtzentrum.", sk: "Múzeum je v centre mesta." },
        { de: "Die Haltestelle ist drei Minuten zu Fuß entfernt.", sk: "Zastávka je tri minúty pešo odtiaľto." },
        { de: "Das Krankenhaus ist weit vom Zentrum.", sk: "Nemocnica je ďaleko od centra." },
        { de: "Die Kirche ist am Marktplatz.", sk: "Kostol je na námestí." }
      ]
    },
    {
      type: "match",
      instruction: "Spoj nemecké výrazy s ich slovenským prekladom.",
      pairs: [
        ["die Post", "pošta"],
        ["das Krankenhaus", "nemocnica"],
        ["die Apotheke", "lekáreň"],
        ["gegenüber", "oproti"],
        ["neben", "vedľa"],
        ["zwischen", "medzi"],
        ["zu Fuß", "pešo"],
        ["die Haltestelle", "zastávka"]
      ]
    },
    {
      type: "dialogue",
      instruction: "Prečítaj si dialóg, kde Jana hľadá najbližšiu lekáreň (Apotheke). Pocestný jej dáva detailný popis cesty cez námestie.",
      lines: [
        { speaker: "A", de: "Entschuldigung! Gibt es hier eine Apotheke in der Nähe?", sk: "Prepáčte! Je tu niekde blízko lekáreň?" },
        { speaker: "B", de: "Ja, natürlich! Sie ist ganz in der Nähe.", sk: "Áno, samozrejme! Je úplne blízko." },
        { speaker: "A", de: "Wie komme ich dorthin?", sk: "Ako sa tam dostanem?" },
        { speaker: "B", de: "Gehen Sie diesen Weg geradeaus, bis zum Marktplatz.", sk: "Choďte touto cestou priamo, až na námestie." },
        { speaker: "A", de: "Bis zum Marktplatz — okay.", sk: "Až na námestie — dobre." },
        { speaker: "B", de: "Am Marktplatz sehen Sie eine große Kirche. Die Apotheke ist gegenüber der Kirche.", sk: "Na námestí uvidíte veľký kostol. Lekáreň je oproti kostolu." },
        { speaker: "A", de: "Gegenüber der Kirche. Und neben der Apotheke — was ist das?", sk: "Oproti kostolu. A vedľa lekárne — čo je to?" },
        { speaker: "B", de: "Neben der Apotheke ist eine Bank. Zwischen der Bank und der Apotheke ist ein kleines Café.", sk: "Vedľa lekárne je banka. Medzi bankou a lekárňou je malá kaviareň." },
        { speaker: "A", de: "Perfekt! Und wie weit ist das zu Fuß?", sk: "Perfektné! A ako ďaleko je to pešo?" },
        { speaker: "B", de: "Nur fünf Minuten zu Fuß. Das ist ganz leicht zu finden!", sk: "Len päť minút pešo. To sa nájde celkom ľahko!" }
      ],
      comprehensionQuestions: [
        {
          question: "Kde sa nachádza lekáreň v porovnaní s kostolom?",
          answer: "Lekáreň je oproti kostolu (gegenüber der Kirche).",
          options: ["Vedľa kostola", "Oproti kostolu", "Za kostolom", "Pred kostolom"]
        },
        {
          question: "Čo je medzi bankou a lekárňou?",
          answer: "Medzi bankou a lekárňou je malá kaviareň.",
          options: ["Supermarket", "Park", "Malá kaviareň", "Pošta"]
        },
        {
          question: "Ako ďaleko je lekáreň pešo?",
          answer: "Lekáreň je päť minút pešo odtiaľto.",
          options: ["Dve minúty", "Päť minút", "Desať minút", "Jedna minúta"]
        }
      ]
    },
    {
      type: "minitext",
      instruction: "Prečítaj si krátky turistický popis Janinej novej štvrte vo Viedni. Odpovedz na otázky.",
      text:
        "Janas Wohnung ist im siebten Bezirk von Wien. Das Viertel ist wunderschön! Gegenüber ihrer Wohnung ist ein großer Park. Neben dem Park gibt es eine alte Kirche. Die Apotheke ist zwischen der Post und dem Supermarkt — sehr praktisch! Das Stadtzentrum ist nur zehn Minuten zu Fuß entfernt. Jana findet ihr Viertel perfekt.",
      textSk:
        "Janin byt je v siedmom okrese Viedne. Štvrť je nádherná! Oproti jej bytu je veľký park. Vedľa parku je starý kostol. Lekáreň je medzi poštou a supermarketom — veľmi praktické! Centrum mesta je len desať minút pešo odtiaľto. Jana považuje svoju štvrť za dokonalú.",
      questions: [
        {
          question: "Čo je oproti Janinho bytu?",
          answer: "Oproti jej bytu je veľký park.",
          options: ["Kostol", "Supermarket", "Veľký park", "Pošta"]
        },
        {
          question: "Kde sa nachádza lekáreň?",
          answer: "Lekáreň je medzi poštou a supermarketom.",
          options: ["Vedľa parku", "Medzi poštou a supermarketom", "Oproti kostolu", "V parku"]
        },
        {
          question: "Ako ďaleko je centrum mesta od Janinej štvrte?",
          answer: "Centrum mesta je len desať minút pešo odtiaľto.",
          options: ["Päť minút autom", "Desať minút pešo", "Dvadsať minút metrom", "Pätnásť minút pešo"]
        }
      ]
    },
    {
      type: "wordorder",
      instruction: "Zoraď slová do správnej nemeckej vety.",
      sentences: [
        {
          words: ["Jana", "stellt", "die", "Tasche", "auf", "den", "Tisch"],
          correct: "Jana stellt die Tasche auf den Tisch",
          hint: "Jana položí tašku na stôl.",
          explanation: "Wohin? (smer) → auf + Akkusatív: der Tisch → auf den Tisch."
        },
        {
          words: ["Die", "Tasche", "liegt", "auf", "dem", "Tisch"],
          correct: "Die Tasche liegt auf dem Tisch",
          hint: "Taška leží na stole.",
          explanation: "Wo? (miesto) → auf + Datív: der Tisch → auf dem Tisch."
        },
        {
          words: ["Ich", "hänge", "das", "Bild", "an", "die", "Wand"],
          correct: "Ich hänge das Bild an die Wand",
          hint: "Vešiam obraz na stenu.",
          explanation: "Wohin? → an + Akkusatív: die Wand zostáva die Wand (F, Akk=Nom)."
        },
        {
          words: ["Das", "Bild", "hängt", "an", "der", "Wand"],
          correct: "Das Bild hängt an der Wand",
          hint: "Obraz visí na stene.",
          explanation: "Wo? → an + Datív: die Wand → an der Wand."
        },
        {
          words: ["Jana", "geht", "in", "das", "Café", "um", "die", "Ecke"],
          correct: "Jana geht in das Café um die Ecke",
          hint: "Jana ide do kaviarne za rohom.",
          explanation: "Wohin? → in + Akkusatív: das Café zostáva das Café (Neutrum)."
        }
      ]
    },
    {
      type: "speaking",
      instruction: "Počúvaj nemeckú vetu. Potom hovor nahlas a skontroluj sa.",
      phrases: [
        {
          de: "Ich stelle die Tasche auf den Tisch.",
          sk: "Kladiem tašku na stôl.",
          tip: "Wohin?→Akk: den Tisch"
        },
        {
          de: "Die Tasche ist auf dem Tisch.",
          sk: "Taška je na stole.",
          tip: "Wo?→Dativ: dem Tisch"
        },
        {
          de: "Ich hänge meinen Mantel an den Haken.",
          sk: "Vešiam kabát na háčik.",
          tip: "Wohin?→Akk: den Haken"
        },
        {
          de: "Das Buch liegt in der Tasche.",
          sk: "Kniha leží v taške.",
          tip: "Wo?→Dativ: in der Tasche"
        },
        {
          de: "Jana geht in die Küche.",
          sk: "Jana ide do kuchyne.",
          tip: "Wohin?→Akk: in die Küche"
        }
      ]
    }
  ],

  reviewWords: ["L22_V04", "L22_V05", "L22_V07", "L22_V11", "L18_V11", "L18_V12"],
  lessonNotes:
    "Predložky gegenüber, neben, zwischen sa viažu s datívom — toto je náhľad pred L25. Pre teraz sa uč tieto spojenia ako celky: ‚neben dem Park', ‚gegenüber der Kirche'. Dôležité: ‚der' v datíve ženského rodu vyzerá rovnako ako ‚der' v nominatíve mužského rodu — kontext je kľúčový!"
};
