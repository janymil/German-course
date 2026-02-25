export const lesson64 = {
  id: 64,
  week: 13,
  day: 4,
  title: "Genitiv (Einführung — nur Possessivsätze)",
  topic: "Genitív — úvod (vlastníctvo a von + datív)",
  cefr: "A1",
  xpReward: 25,
  narrativeContext: "Jana sa učí vyjadrovať vlastnícke vzťahy — 'Das ist das Büro meiner Chefin.' 'Das ist Lukas' Fahrrad.' Vidí genitív v adresách a formálnych nápisoch po celej Viedni. Táto lekcia je ľahký úvod — plný genitív je na A2.",
  communicativeGoal: "Po tejto lekcii viem vyjadriť vlastníctvo pomocou genitívu a tvaru 'von + Dativ' ako alternatívu.",
  skillFocus: ["grammar", "reading", "vocabulary"],
  grammarNote: {
    rule: "Genitív — vyjadrenie vlastníctva",
    explanation: "Genitív (4. pád v nemčine) vyjadruje vlastníctvo. Na úrovni A1 sa sústreďujeme na: 1) Vlastné mená: Lukas' Fahrrad (meno na -s/-z/-x dostane apostrof). 2) von + Datív (bežné v hovorenej reči!): das Fahrrad von Lukas. 3) Genitívny článok: M/N = des + (-s/-es na substantíve), F/Pl = der. Frázy ako kusy: am Ende des Monats, in der Mitte der Woche.",
    examples: [
      { de: "Das ist das Büro meiner Chefin.", sk: "To je kancelária mojej šéfky." },
      { de: "Das ist Lukas' Buch.", sk: "To je Lukášova kniha." },
      { de: "Das ist das Buch von Lukas.", sk: "To je Lukášova kniha. (alternatíva)" },
      { de: "Am Ende des Monats zahle ich die Miete.", sk: "Na konci mesiaca platím nájom." }
    ],
    slovakContrastNote: "Slovenčina má genitív (2. pád = koho/čoho): 'Počítač Lukáša' = 'Lukas' Computer'. Slovenčina ale častejšie používa privlastňovacie prídavné meno: 'Lukov počítač'. V nemčine ide primárne o genitívny článok alebo von+datív. Apostróf v nemčine používa len pri menách na -s/-z/-x!"
  },
  vocab: [
    { de: "der Genitiv", sk: "genitív (2. pád)", example: "Der Genitiv zeigt Besitz.", exampleSk: "Genitív vyjadruje vlastníctvo.", gender: "M", srsId: "L64_V01", recycledFrom: [] },
    { de: "von + Dativ", sk: "od, z + datív (náhrada genitívu)", example: "Das ist das Buch von Jana.", exampleSk: "To je Janina kniha.", gender: null, srsId: "L64_V02", recycledFrom: [] },
    { de: "Das ist das Büro meiner Chefin.", sk: "To je kancelária mojej šéfky.", example: "Das ist das Büro meiner Chefin.", exampleSk: "To je kancelária mojej šéfky.", gender: null, srsId: "L64_V03", recycledFrom: [] },
    { de: "Das ist Lukas' Buch.", sk: "To je Lukášova kniha.", example: "Das ist Lukas' Fahrrad.", exampleSk: "To je Lukášov bicykel.", gender: null, srsId: "L64_V04", recycledFrom: [] },
    { de: "des Mannes (M, Gen.)", sk: "muža (genitív)", example: "das Auto des Mannes", exampleSk: "auto muža", gender: null, srsId: "L64_V05", recycledFrom: [] },
    { de: "der Frau (F, Gen.)", sk: "ženy (genitív)", example: "die Tasche der Frau", exampleSk: "taška ženy", gender: null, srsId: "L64_V06", recycledFrom: [] },
    { de: "am Ende des Monats", sk: "na konci mesiaca", example: "Am Ende des Monats ist Zahltag.", exampleSk: "Na konci mesiaca je výplatný deň.", gender: null, srsId: "L64_V07", recycledFrom: [] },
    { de: "die Mitte der Woche", sk: "stred týždňa", example: "In der Mitte der Woche haben wir ein Meeting.", exampleSk: "V strede týždňa máme poradu.", gender: null, srsId: "L64_V08", recycledFrom: [] },
    { de: "am Anfang des Jahres", sk: "na začiatku roka", example: "Am Anfang des Jahres plane ich meine Urlaubsreisen.", exampleSk: "Na začiatku roka plánujem dovolenkové cesty.", gender: null, srsId: "L64_V09", recycledFrom: [] },
    { de: "der Anfang", sk: "začiatok", example: "Am Anfang war es schwer.", exampleSk: "Na začiatku to bolo ťažké.", gender: "M", srsId: "L64_V10", recycledFrom: [] },
    { de: "die Mitte", sk: "stred", example: "Die Wohnung liegt in der Mitte des Bezirks.", exampleSk: "Byt leží v strede obvodu.", gender: "F", srsId: "L64_V11", recycledFrom: [] },
    { de: "das Ende", sk: "koniec", example: "Am Ende des Films war ich müde.", exampleSk: "Na konci filmu som bol/a unavený/á.", gender: "N", srsId: "L64_V12", recycledFrom: [21, 60] },
    { de: "wegen + Genitiv", sk: "kvôli (genitív)", example: "Wegen des Regens bleibe ich zu Hause.", exampleSk: "Kvôli dažďu zostanem doma.", gender: null, srsId: "L64_V13", recycledFrom: [] },
    { de: "gehören (Dativ review)", sk: "patriť (komu)", example: "Das gehört mir.", exampleSk: "To patrí mne.", gender: null, srsId: "L64_V14", recycledFrom: [63] },
    { de: "Das gehört meiner Mutter.", sk: "To patrí mojej mame.", example: "Das Buch gehört meiner Mutter.", exampleSk: "Tá kniha patrí mojej mame.", gender: null, srsId: "L64_V15", recycledFrom: [63] }
  ],
  exercises: [
    {
      type: "flashcard",
      instruction: "Prezri si genitívne tvary a frázy vlastníctva.",
      items: [
        "der Genitiv = genitív (vyjadruje vlastníctvo)",
        "von + Dativ = praktická náhrada genitívu v hovore",
        "Lukas' Buch = Lukášova kniha (apostrof pri menách na -s)",
        "das Büro meiner Chefin = kancelária mojej šéfky (F, Gen.)",
        "des Mannes = muža (M/N, Gen. → des + -es/-s)",
        "der Frau = ženy (F, Gen. → der bez zmeny)",
        "am Ende des Monats = na konci mesiaca",
        "die Mitte der Woche = stred týždňa",
        "am Anfang des Jahres = na začiatku roka",
        "der Anfang = začiatok (M)",
        "die Mitte = stred (F)",
        "das Ende = koniec (N)",
        "wegen + Genitiv = kvôli",
        "Das gehört meiner Mutter. = To patrí mojej mame.",
        "das Buch von Jana = Janina kniha (von + Dativ)"
      ]
    },
    {
      type: "mcq",
      instruction: "Vyber správny spôsob vyjadrenia vlastníctva.",
      questions: [
        {
          question: "Ako správne vyjadríme 'auto môjho šéfa'? (Chef = M)",
          options: [
            "das Auto des Chefs",
            "das Auto der Chef",
            "das Auto den Chefs",
            "das Auto von den Chef"
          ],
          answer: "das Auto des Chefs",
          explanation: "Mužský rod v genitíve: des + podstatné meno + -s. das Auto des Chefs. Alternatíva: das Auto vom Chef (von + Dativ)."
        },
        {
          question: "Jana hovorí o kabelke svojej mamy. Vyberte správnu vetu:",
          options: [
            "Das ist die Tasche der Mutter.",
            "Das ist die Tasche von der Mutter.",
            "Obe sú správne.",
            "Das ist die Tasche dem Mutter."
          ],
          answer: "Obe sú správne.",
          explanation: "Genitív 'der Mutter' aj 'von der Mutter' (von + Dativ) sú obe správne! Von + Dativ je bežnejšie v hovorenej reči."
        },
        {
          question: "Kedy používame apostrof pri nemeckom vlastnom mene?",
          options: [
            "Vždy, ako v angličtine (Jana's Buch)",
            "Len pri menách končiacich na -s, -z, -x (Lukas' Buch)",
            "Nikdy v nemčine",
            "Len pri ženských menách"
          ],
          answer: "Len pri menách končiacich na -s, -z, -x (Lukas' Buch)",
          explanation: "V nemčine apostrof NEPATRÍ za bežné vlastné mená! Len pri menách na -s/-z/-x, kde by sa pridalo ďalšie -s vyslovene ťažko: Lukas' Buch (nie: Lukas's Buch). Jana Buch = Janas Buch (bez apostrofu!)."
        },
        {
          question: "'Am Ende ___ Jahres fahre ich nach Hause.' Doplň genitívny člen:",
          options: ["den", "des", "der", "dem"],
          answer: "des",
          explanation: "Jahr je stredný rod (das Jahr). Genitív M/N = des. Am Ende des Jahres. Tiež: des Monats, des Tages."
        },
        {
          question: "'wegen' sa používa s ktorým pádom?",
          options: ["Nominatív", "Akuzatív", "Datív", "Genitív"],
          answer: "Genitív",
          explanation: "'wegen' vyžaduje genitív: wegen des Regens (kvôli dažďu), wegen der Arbeit (kvôli práci). V hovorenej nemčine sa ale často používa aj s datívom."
        }
      ]
    },
    {
      type: "fill",
      instruction: "Doplň správny genitívny tvar alebo von+Dativ alternatívu.",
      questions: [
        {
          sentence: "Das ist das Fahrrad ___ Kollegen. (des/der)",
          answer: "des",
          hint: "Kollege je mužský rod. Genitív M = des.",
          explanation: "Mužský rod v genitíve = des. Das ist das Fahrrad des Kollegen."
        },
        {
          sentence: "Am Anfang ___ Woche haben wir ein Meeting. (des/der)",
          answer: "der",
          hint: "Woche je ženský rod. Genitív F = der.",
          explanation: "Woche je ženský rod (die Woche). Genitív F = der. Am Anfang der Woche."
        },
        {
          sentence: "Das ist ___ Büro. (von meiner Chefin / meiner Chefin)",
          answer: "das Büro meiner Chefin",
          hint: "Chefin = ženský rod. Genitív F = meiner.",
          explanation: "Pri privlastňovacích zámenách: meine → meiner v genitíve F. Das ist das Büro meiner Chefin."
        },
        {
          sentence: "Wegen ___ Regens bleibe ich zu Hause. (des/der/den)",
          answer: "des",
          hint: "Regen je mužský rod. Genitív M = des.",
          explanation: "der Regen → des Regens (genitív M). wegen des Regens = kvôli dažďu."
        },
        {
          sentence: "Das ist das Auto ___ (von + Lukas).",
          answer: "von Lukas",
          hint: "von + Dativ (bežná hovorená alternatíva)",
          explanation: "V hovorenej nemčine: von + Dativ = praktická náhrada genitívu. das Auto von Lukas."
        }
      ]
    },
    {
      type: "listen",
      instruction: "Počúvaj vety s genitívom a opakuj ich nahlas.",
      questions: [
        { de: "Das ist das Büro meiner Chefin.", sk: "To je kancelária mojej šéfky." },
        { de: "Am Ende des Monats zahle ich die Miete.", sk: "Na konci mesiaca platím nájom." },
        { de: "Das ist Lukas' Fahrrad.", sk: "To je Lukášov bicykel." },
        { de: "In der Mitte der Woche haben wir ein Meeting.", sk: "V strede týždňa máme poradu." },
        { de: "Das ist das Auto von meinem Chef.", sk: "To je auto môjho šéfa." },
        { de: "Am Anfang des Jahres plane ich alles.", sk: "Na začiatku roka všetko plánujem." },
        { de: "Die Tasche der Frau ist rot.", sk: "Kabelka tej ženy je červená." },
        { de: "Wegen des Wetters bleiben wir zu Hause.", sk: "Kvôli počasiu zostaneme doma." }
      ]
    },
    {
      type: "match",
      instruction: "Spoj výraz s jeho genitívnym alebo von+Dativ ekvivalentom.",
      pairs: [
        ["das Buch von Jana", "Janas Buch (genitív mena)"],
        ["das Auto des Chefs", "das Auto vom Chef (von+Dativ)"],
        ["die Tasche der Frau", "die Tasche von der Frau"],
        ["am Ende des Monats", "na konci mesiaca"],
        ["am Anfang des Jahres", "na začiatku roka"],
        ["wegen des Regens", "kvôli dažďu"],
        ["das Büro meiner Chefin", "kancelária mojej šéfky"],
        ["Lukas' Fahrrad", "das Fahrrad von Lukas"]
      ]
    },
    {
      type: "dialogue",
      instruction: "Jana a Lukas identifikujú veci v kancelárii. Dávaj pozor na vlastnícke tvary.",
      lines: [
        { speaker: "A", de: "Sucht jemand eine schwarze Tasche?", sk: "Hľadá niekto čiernu kabelku?" },
        { speaker: "B", de: "Ja! Das ist die Tasche von Ana.", sk: "Áno! To je Anina kabelka." },
        { speaker: "A", de: "Und dieses Handy hier — wem gehört das?", sk: "A tento telefón tu — čí je?" },
        { speaker: "B", de: "Das Handy ist vom Chef! Er sucht es schon seit einer Stunde.", sk: "Telefón je od šéfa! Hľadá ho už hodinu." },
        { speaker: "A", de: "Ist das hier Lukas' Fahrrad vor dem Büro?", sk: "Je to tu Lukášov bicykel pred kanceláriou?" },
        { speaker: "B", de: "Ja, das ist das Fahrrad von Lukas.", sk: "Áno, to je Lukášov bicykel." },
        { speaker: "A", de: "Am Ende des Tages räumen wir das Büro auf, oder?", sk: "Na konci dňa upraceme kanceláriu, nie?" },
        { speaker: "B", de: "Ja! Am Anfang der Woche ist das Büro immer sauber.", sk: "Áno! Na začiatku týždňa je kancelária vždy čistá." },
        { speaker: "A", de: "Das ist das Büro meiner Chefin — da darf ich nicht rein.", sk: "To je kancelária mojej šéfky — tam nesmiem vojsť." },
        { speaker: "B", de: "Wegen des Meetings ist sie heute sehr beschäftigt.", sk: "Kvôli porade je dnes veľmi zaneprázdnená." }
      ],
      comprehensionQuestions: [
        {
          question: "Čia je čierna kabelka?",
          options: ["Janina", "Anina", "Šéfova", "Lukášova"],
          answer: "Anina"
        },
        {
          question: "Komu patrí telefón?",
          options: ["Lukášovi", "Jany", "Šéfovi", "Anine"],
          answer: "Šéfovi"
        },
        {
          question: "Prečo je šéfka dnes zaneprázdnená?",
          options: ["Kvôli počasiu", "Kvôli Jany", "Kvôli porade", "Kvôli dovolenke"],
          answer: "Kvôli porade"
        }
      ]
    },
    {
      type: "minitext",
      instruction: "Prečítaj krátky úryvok z múzejného sprievodcu a odpovedaj na otázky.",
      text: "Das Kunsthistorische Museum in Wien ist eines der bedeutendsten Museen der Welt. Am Anfang des 20. Jahrhunderts war es ein Treffpunkt der Kunstwelt. Die Sammlung des Museums umfasst Werke von Weltrang. Am Ende des Museumsbesuchs können Sie im Café des Museums einen Kaffee trinken. In der Mitte des Museums befindet sich ein wunderbarer Innenhof. Der Eingang des Museums liegt am Maria-Theresien-Platz.",
      textSk: "Kunsthistorisches Museum vo Viedni je jedno z najvýznamnejších múzeí sveta. Na začiatku 20. storočia bolo stretávacím miestom sveta umenia. Zbierka múzea obsahuje diela svetového formátu. Na konci návštevy múzea si môžete vypiť kávu v kaviarni múzea. Uprostred múzea sa nachádza nádherný vnútorný dvor. Vchod múzea leží na námestí Márie Terézie.",
      questions: [
        {
          question: "Kde leží vchod múzea?",
          options: ["Na Ringstraße", "Na Maria-Theresien-Platz", "Pri Stephansdom", "Na Praterstraße"],
          answer: "Na Maria-Theresien-Platz"
        },
        {
          question: "Čo sa nachádza uprostred múzea?",
          options: ["Kaviareň", "Vchod", "Nádherný vnútorný dvor", "Pokladňa"],
          answer: "Nádherný vnútorný dvor"
        },
        {
          question: "'Die Sammlung des Museums' — aký pád je 'des Museums'?",
          options: ["Nominatív", "Akuzatív", "Datív", "Genitív"],
          answer: "Genitív"
        }
      ]
    },
    {
      type: "freewrite",
      instruction: "Popíš, komu patria rôzne veci vo tvojom dome alebo byte.",
      prompt: "Beschreibe, wem verschiedene Dinge in deinem Haus gehören. Benutze: Das ist das/die/der [Ding] meiner/meines [Person]. Oder: Das gehört [Person]. Oder: Das ist das [Ding] von [Person].",
      minWords: 30,
      exampleAnswer: "Das ist das Zimmer meiner Schwester — sie hat viele Bücher. Das ist das Auto meines Vaters. Am Ende des Monats zahlt er die Versicherung. Das Buch auf dem Tisch gehört mir. Das Fahrrad vor dem Haus ist von meinem Bruder."
    },
    {
      type: "wordorder",
      instruction: "Zoraď slová do správnej nemeckej vety.",
      sentences: [
        {
          words: ["Als", "Jana", "ankam,", "hatte", "sie", "schon", "alles", "gepackt"],
          correct: "Als Jana ankam, hatte sie schon alles gepackt",
          hint: "Keď Jana prišla, mala už všetko zbalené.",
          explanation: "Plusquamperfekt 'hatte gepackt' vyjadruje dej, ktorý nastal PRED dejem v minulom čase ('ankam')."
        },
        {
          words: ["Er", "hatte", "schon", "gegessen,", "bevor", "ich", "ankam"],
          correct: "Er hatte schon gegessen, bevor ich ankam",
          hint: "Už bol zajedol, skôr ako som prišiel/prišla.",
          explanation: "'bevor ich ankam' = pred mojím príchodom. Dej pred týmto → Plusquamperfekt 'hatte gegessen'."
        },
        {
          words: ["Sie", "war", "schon", "gegangen,", "als", "wir", "ankamen"],
          correct: "Sie war schon gegangen, als wir ankamen",
          hint: "Bola už odišla, keď sme prišli.",
          explanation: "'war gegangen' = Plusquamperfekt so 'sein' (pohybové slovesá). Dej nastal pred 'ankamen'."
        },
        {
          words: ["Das", "Kind", "hatte", "schon", "geschlafen"],
          correct: "Das Kind hatte schon geschlafen",
          hint: "Dieťa už bolo spalo.",
          explanation: "Plusquamperfekt: 'hatte' (préteritum od haben) + Partizip II 'geschlafen' na konci vety."
        },
        {
          words: ["Jana", "hatte", "den", "Brief", "schon", "geschrieben"],
          correct: "Jana hatte den Brief schon geschrieben",
          hint: "Jana už bola napísala list.",
          explanation: "'hatte geschrieben' = Plusquamperfekt. 'schon' zdôrazňuje, že dej bol dokončený ešte pred ďalším dejom."
        }
      ]
    },
    {
      type: "speaking",
      instruction: "Počúvaj nemeckú vetu. Potom hovor nahlas a skontroluj sa.",
      phrases: [
        {
          de: "Als Jana ankam, hatte sie schon alles gepackt.",
          sk: "Keď Jana prišla, mala už všetko zbalené.",
          tip: "hatte gepackt: Plusquamperfekt, -t na konci"
        },
        {
          de: "Er hatte schon gegessen.",
          sk: "Už bol zajedol.",
          tip: "hatte gegessen: haben-Plusquamperfekt"
        },
        {
          de: "Sie war schon gegangen.",
          sk: "Bola už odišla.",
          tip: "war gegangen: sein-Verb im Plusquam."
        },
        {
          de: "Das hatte ich nicht gewusst.",
          sk: "To som nevedel/a.",
          tip: "hatte gewusst: wissen→gewusst"
        },
        {
          de: "Bevor er ankam, hatte sie aufgeräumt.",
          sk: "Skôr ako prišiel, ona upratala.",
          tip: "bevor + Satz; hatte aufgeräumt am Ende"
        }
      ]
    }
  ],
  reviewWords: ["der Genitiv", "von + Dativ", "des Mannes", "der Frau", "am Ende", "am Anfang", "die Mitte", "das Ende", "wegen", "gehören"],
  lessonNotes: "Genitív A1 — len základy: Vlastné mená: Lukas' (apostrof len pri menách na -s/-z/-x), Janas (bez apostrofu). von+Dativ = praktická náhrada. Genitívny člen: M/N=des+(-s/-es), F/Pl=der. Frázy: am Ende des Monats, am Anfang der Woche. Plný genitív = A2+."
};
