export const lesson36 = {
  id: 36,
  week: 8,
  day: 1,
  title: "Berufe und Arbeitsplatz",
  topic: "Povolania a pracovisko",
  cefr: "A1",
  xpReward: 25,
  narrativeContext:
    "Jana hat jetzt Routine bei der Arbeit in Wien. Beim Businesslunch fragt sie ihre neue Kollegin Sabine: 'Was bist du von Beruf?' Jana antwortet selbstbewusst: 'Ich bin PR-Managerin.' Sie lernt, dass Deutsche und Österreicher beim Beruf keinen Artikel nach 'sein' verwenden — genauso wie im Slowakischen!",
  communicativeGoal:
    "Po tejto lekcii viem hovoriť o povolaniach, pýtať sa čo niekto robí a viem, že po 'sein' sa nepoužíva neurčitý člen pred povolaním.",
  skillFocus: ["vocabulary", "grammar", "speaking", "reading"],

  grammarNote: {
    rule: "Povolanie po 'sein' — bez neurčitého člena",
    explanation:
      "V nemčine: 'Ich bin Lehrerin.' (NIE 'Ich bin eine Lehrerin'!) Po 'sein' pri opisovaní povolania, národnosti alebo náboženstva sa neurčitý člen vynecháva. VÝNIMKA: keď pridáme prídavné meno, člen sa vráti: 'Ich bin eine gute Lehrerin.' Ženské formy sa tvoria väčšinou príponou -in: Lehrer → Lehrerin, Arzt → Ärztin.",
    examples: [
      { de: "Ich bin Arzt.", sk: "Som lekár. (bez 'ein'!)" },
      { de: "Sie ist Lehrerin.", sk: "Je učiteľka. (bez 'eine'!)" },
      { de: "Er ist ein guter Koch.", sk: "Je dobrý kuchár. (s adjektívom → člen späť!)" },
      { de: "Was bist du von Beruf?", sk: "Čím si z povolania?" },
      { de: "Was machst du beruflich?", sk: "Čo robíš v zamestnaní?" },
      { de: "Ich arbeite als Programmiererin.", sk: "Pracujem ako programátorka." },
    ],
    slovakContrastNote:
      "Slovenčina robí TO ISTÉ: 'Som učiteľka.' (bez člena, ktorý v slovenčine ani neexistuje). Pravidlo sa teda vníma rovnako prirodzene ako v slovenčine! Keď je adjektívum: 'Som dobrá učiteľka' = 'Ich bin eine gute Lehrerin' — je to logické.",
  },

  vocab: [
    {
      de: "der Arzt / die Ärztin",
      sk: "lekár / lekárka",
      example: "Mein Vater ist Arzt.",
      exampleSk: "Môj otec je lekár.",
      gender: "M/F",
      srsId: "L36_V01",
      recycledFrom: [25],
    },
    {
      de: "der Ingenieur / die Ingenieurin",
      sk: "inžinier / inžinierka",
      example: "Sie ist Ingenieurin bei einer Autofirma.",
      exampleSk: "Je inžinierka v automobilovej firme.",
      gender: "M/F",
      srsId: "L36_V02",
      recycledFrom: [],
    },
    {
      de: "der Anwalt / die Anwältin",
      sk: "advokát / advokátka",
      example: "Er ist Anwalt. Er arbeitet in einer Kanzlei.",
      exampleSk: "Je advokát. Pracuje v kancelárii.",
      gender: "M/F",
      srsId: "L36_V03",
      recycledFrom: [],
    },
    {
      de: "der Polizist / die Polizistin",
      sk: "policajt / policajtka",
      example: "Die Polizistin hilft den Leuten.",
      exampleSk: "Policajtka pomáha ľuďom.",
      gender: "M/F",
      srsId: "L36_V04",
      recycledFrom: [],
    },
    {
      de: "der Programmierer / die Programmiererin",
      sk: "programátor / programátorka",
      example: "Er ist Programmierer bei einem Start-up.",
      exampleSk: "Je programátor v start-upe.",
      gender: "M/F",
      srsId: "L36_V05",
      recycledFrom: [],
    },
    {
      de: "der Verkäufer / die Verkäuferin",
      sk: "predavač / predavačka",
      example: "Die Verkäuferin hilft den Kunden.",
      exampleSk: "Predavačka pomáha zákazníkom.",
      gender: "M/F",
      srsId: "L36_V06",
      recycledFrom: [],
    },
    {
      de: "der Krankenpfleger / die Krankenpflegerin",
      sk: "zdravotný brat / sestra",
      example: "Sie ist Krankenpflegerin im Krankenhaus.",
      exampleSk: "Je zdravotná sestra v nemocnici.",
      gender: "M/F",
      srsId: "L36_V07",
      recycledFrom: [],
    },
    {
      de: "der Koch / die Köchin",
      sk: "kuchár / kuchárka",
      example: "Er ist Koch in einem Wiener Restaurant.",
      exampleSk: "Je kuchár vo viedenskej reštaurácii.",
      gender: "M/F",
      srsId: "L36_V08",
      recycledFrom: [],
    },
    {
      de: "der Fahrer / die Fahrerin",
      sk: "vodič / vodička",
      example: "Er ist Busfahrer.",
      exampleSk: "Je vodič autobusu.",
      gender: "M/F",
      srsId: "L36_V09",
      recycledFrom: [],
    },
    {
      de: "der Journalist / die Journalistin",
      sk: "novinár / novinárka",
      example: "Die Journalistin schreibt für eine Zeitung.",
      exampleSk: "Novinárka píše pre noviny.",
      gender: "M/F",
      srsId: "L36_V10",
      recycledFrom: [],
    },
    {
      de: "von Beruf",
      sk: "z povolania",
      example: "Was bist du von Beruf?",
      exampleSk: "Čím si z povolania?",
      gender: null,
      srsId: "L36_V11",
      recycledFrom: [],
    },
    {
      de: "beruflich",
      sk: "pracovne, profesionálne",
      example: "Was machst du beruflich?",
      exampleSk: "Čo robíš pracovne?",
      gender: null,
      srsId: "L36_V12",
      recycledFrom: [],
    },
    {
      de: "die Firma",
      sk: "firma",
      example: "Jana arbeitet bei einer PR-Firma.",
      exampleSk: "Jana pracuje v PR firme.",
      gender: "F",
      srsId: "L36_V13",
      recycledFrom: [],
    },
    {
      de: "das Unternehmen",
      sk: "podnik, spoločnosť",
      example: "Das Unternehmen hat 200 Mitarbeiter.",
      exampleSk: "Podnik má 200 zamestnancov.",
      gender: "N",
      srsId: "L36_V14",
      recycledFrom: [],
    },
    {
      de: "der Mitarbeiter / die Mitarbeiterin",
      sk: "zamestnanec / zamestnankyňa",
      example: "Die Mitarbeiterin kommt aus der Slowakei.",
      exampleSk: "Zamestnankyňa pochádza zo Slovenska.",
      gender: "M/F",
      srsId: "L36_V15",
      recycledFrom: [],
    },
    {
      de: "das Gehalt",
      sk: "plat",
      example: "Das Gehalt in Wien ist gut.",
      exampleSk: "Plat vo Viedni je dobrý.",
      gender: "N",
      srsId: "L36_V16",
      recycledFrom: [],
    },
    {
      de: "der Chef / die Chefin",
      sk: "šéf / šéfka",
      example: "Meine Chefin ist sehr nett.",
      exampleSk: "Moja šéfka je veľmi milá.",
      gender: "M/F",
      srsId: "L36_V17",
      recycledFrom: [4],
    },
    {
      de: "die Abteilung",
      sk: "oddelenie",
      example: "Jana arbeitet in der PR-Abteilung.",
      exampleSk: "Jana pracuje v PR oddelení.",
      gender: "F",
      srsId: "L36_V18",
      recycledFrom: [],
    },
  ],

  exercises: [
    {
      type: "flashcard",
      instruction:
        "Kartičky — povolania. Precvičuj mužský aj ženský tvar každého povolania.",
      items: [
        "L36_V01",
        "L36_V02",
        "L36_V03",
        "L36_V04",
        "L36_V05",
        "L36_V06",
        "L36_V07",
        "L36_V08",
        "L36_V09",
        "L36_V10",
        "L36_V11",
        "L36_V12",
        "L36_V13",
        "L36_V14",
        "L36_V15",
        "L36_V16",
        "L36_V17",
        "L36_V18",
      ],
    },
    {
      type: "mcq",
      instruction: "Vyber správnu odpoveď.",
      questions: [
        {
          question: "Jana sagt: 'Ich bin ___ PR-Managerin.' Was ist richtig?",
          options: ["Ich bin eine PR-Managerin.", "Ich bin PR-Managerin.", "Ich bin der PR-Managerin.", "Ich bin die PR-Managerin."],
          answer: "Ich bin PR-Managerin.",
          explanation:
            "Po 'sein' pri opisovaní povolania sa neurčitý člen vynecháva. 'Ich bin PR-Managerin.' = správne.",
        },
        {
          question: "Aká je ženská forma k 'der Arzt'?",
          options: ["die Arztin", "die Ärztin", "die Arztin", "die Arzterin"],
          answer: "die Ärztin",
          explanation:
            "'Arzt' → 'Ärztin' — v kmeni sa 'a' mení na 'ä' (Umlaut) + prípona -in.",
        },
        {
          question: "Ako sa opýtaš na povolanie priateľa?",
          options: [
            "Was arbeitest du beruf?",
            "Was bist du von Beruf?",
            "Welche Arbeit du machst?",
            "Was ist dein Beruf von?",
          ],
          answer: "Was bist du von Beruf?",
          explanation: "'Was bist du von Beruf?' = Čím si z povolania? — štandardná otázka.",
        },
        {
          question: "Ak hovoríš: 'Ich bin ein guter Arzt.' — Prečo tu je 'ein'?",
          options: [
            "Vždy sa používa 'ein' pred povolaniami.",
            "Kvôli prídavnému menu 'guter' — člen sa vráti.",
            "Je to chyba.",
            "Iba v mužskom rode sa 'ein' používa.",
          ],
          answer: "Kvôli prídavnému menu 'guter' — člen sa vráti.",
          explanation:
            "VÝNIMKA: keď je adjektívum, člen sa vráti: 'Ich bin ein guter Arzt.' vs 'Ich bin Arzt.'",
        },
        {
          question: "'das Gehalt' bedeutet auf Slowakisch:",
          options: ["práca", "pracovisko", "plat", "oddelenie"],
          answer: "plat",
          explanation: "'das Gehalt' = plat (mesačný, za prácu).",
        },
      ],
    },
    {
      type: "fill",
      instruction: "Doplň správne slovo alebo tvar.",
      questions: [
        {
          sentence: "Er ist ___ Journalist bei einer Zeitung. (žiadny člen!)",
          answer: "—",
          hint: "Po 'sein' + povolanie = člen?",
          explanation: "Po 'sein' pri opisovaní povolania sa neurčitý člen VYNECHÁVA: 'Er ist Journalist.'",
        },
        {
          sentence: "Was machst du ___? (pracovne)",
          answer: "beruflich",
          hint: "Pracovne, profesionálne = ...?",
          explanation: "'beruflich' = pracovne, profesionálne. 'Was machst du beruflich?'",
        },
        {
          sentence: "Jana arbeitet in der PR-___. (oddelenie)",
          answer: "Abteilung",
          hint: "die ... (F)",
          explanation: "'die Abteilung' = oddelenie.",
        },
        {
          sentence: "Meine ___ heißt Frau Schwarz. (šéfka)",
          answer: "Chefin",
          hint: "šéfka = die ...?",
          explanation: "'die Chefin' = šéfka (ženská forma od 'der Chef').",
        },
        {
          sentence: "Das ___ in Wien ist ziemlich gut. (plat)",
          answer: "Gehalt",
          hint: "das ... (N)",
          explanation: "'das Gehalt' = plat.",
        },
        {
          sentence: "Die ___ hat über 500 Mitarbeiter. (firma/spoločnosť)",
          answer: "Firma",
          hint: "die ... (F) — menšia ako Unternehmen",
          explanation: "'die Firma' = firma. 'das Unternehmen' = podnik (väčší formálnejší pojem).",
        },
      ],
    },
    {
      type: "listen",
      instruction: "Počúvaj, ako Jana opisuje povolania svojich kolegov.",
      questions: [
        { de: "Ich bin PR-Managerin von Beruf.", sk: "Som PR-manažérka z povolania." },
        { de: "Was machst du beruflich?", sk: "Čo robíš pracovne?" },
        { de: "Er ist Arzt in einem Wiener Krankenhaus.", sk: "Je lekár vo viedenskej nemocnici." },
        { de: "Sie ist Ingenieurin bei einem großen Unternehmen.", sk: "Je inžinierka vo veľkej spoločnosti." },
        { de: "Meine Chefin ist sehr nett.", sk: "Moja šéfka je veľmi milá." },
        { de: "Das Gehalt in Wien ist gut.", sk: "Plat vo Viedni je dobrý." },
        { de: "Wie viele Mitarbeiter hat die Firma?", sk: "Koľko zamestnancov má firma?" },
        { de: "Er ist ein sehr guter Koch!", sk: "Je veľmi dobrý kuchár!" },
      ],
    },
    {
      type: "match",
      instruction: "Spoj povolanie s jeho slovenským prekladom.",
      pairs: [
        ["der Arzt", "lekár"],
        ["die Ärztin", "lekárka"],
        ["der Koch", "kuchár"],
        ["die Programmiererin", "programátorka"],
        ["der Anwalt", "advokát"],
        ["die Journalistin", "novinárka"],
        ["der Fahrer", "vodič"],
        ["die Krankenpflegerin", "zdravotná sestra"],
        ["der Polizist", "policajt"],
        ["der Verkäufer", "predavač"],
      ],
    },
    {
      type: "dialogue",
      instruction: "Jana je na obchodnom obede. Nová kolegyňa sa pýta na jej povolanie.",
      lines: [
        {
          speaker: "Sabine",
          de: "Hallo! Ich bin Sabine Maier, Buchhalterin hier im Haus.",
          sk: "Ahoj! Som Sabine Maier, účtovníčka tu v budove.",
        },
        {
          speaker: "Jana",
          de: "Freut mich! Ich bin Jana Nováková — PR-Managerin in der Marketingabteilung.",
          sk: "Teší ma! Som Jana Nováková — PR-manažérka v marketingovom oddelení.",
        },
        {
          speaker: "Sabine",
          de: "Interessant! Und wie lange bist du schon bei der Firma?",
          sk: "Zaujímavé! A ako dlho si už vo firme?",
        },
        {
          speaker: "Jana",
          de: "Erst seit drei Monaten. Und du?",
          sk: "Len tri mesiace. A ty?",
        },
        {
          speaker: "Sabine",
          de: "Ich bin schon seit fünf Jahren hier. Was hast du vorher gemacht?",
          sk: "Som tu už päť rokov. Čo si robila predtým?",
        },
        {
          speaker: "Jana",
          de: "Ich war Journalistin in Bratislava. Aber Wien gefällt mir besser!",
          sk: "Bola som novinárka v Bratislave. Ale Viedeň sa mi páči viac!",
        },
        {
          speaker: "Sabine",
          de: "Wirklich? Und wie findest du die Arbeit hier?",
          sk: "Naozaj? A čo si myslíš o práci tu?",
        },
        {
          speaker: "Jana",
          de: "Sehr gut! Meine Chefin ist nett, und das Gehalt ist fair.",
          sk: "Veľmi dobre! Moja šéfka je milá a plat je férový.",
        },
        {
          speaker: "Sabine",
          de: "Das freut mich! Übrigens, wie viele Leute sind in deiner Abteilung?",
          sk: "To ma teší! Mimochodom, koľko ľudí je vo tvojom oddelení?",
        },
        {
          speaker: "Jana",
          de: "Acht Mitarbeiter. Es ist ein kleines aber tolles Team.",
          sk: "Osem zamestnancov. Je to malý, ale skvelý tím.",
        },
        {
          speaker: "Sabine",
          de: "Schön! Na dann — willkommen im Unternehmen, Jana!",
          sk: "Pekne! No teda — vitaj v podniku, Jana!",
        },
        {
          speaker: "Jana",
          de: "Danke! Ich freue mich auf die Zusammenarbeit.",
          sk: "Ďakujem! Teším sa na spoluprácu.",
        },
      ],
      comprehensionQuestions: [
        {
          question: "Was ist Sabines Beruf?",
          options: ["Journalistin", "PR-Managerin", "Buchhalterin", "Ingenieurin"],
          answer: "Buchhalterin",
          explanation: "Sabine sagt: 'Ich bin Sabine Maier, Buchhalterin hier im Haus.'",
        },
        {
          question: "Was hat Jana vor Wien gemacht?",
          options: [
            "Sie war Ärztin.",
            "Sie war Programmiererin.",
            "Sie war Köchin.",
            "Sie war Journalistin in Bratislava.",
          ],
          answer: "Sie war Journalistin in Bratislava.",
          explanation: "Jana sagt: 'Ich war Journalistin in Bratislava.'",
        },
        {
          question: "Wie viele Mitarbeiter hat Janas Abteilung?",
          options: ["5", "8", "10", "3"],
          answer: "8",
          explanation: "Jana sagt: 'Acht Mitarbeiter.' = 8.",
        },
      ],
    },
    {
      type: "minitext",
      instruction: "Prečítaj si vizitku Janinej kolegyne a odpovedz na otázky.",
      text: `----- VISITENKARTE -----

Dr. Martina Hoffmann
Rechtsanwältin

Hoffmann & Partner Rechtsanwaltskanzlei
Stephansplatz 12 | 1010 Wien

Tel:    +43 1 512 34 56
E-Mail: m.hoffmann@hpkanzlei.at
Web:    www.hoffmann-partner.at

Fachgebiete: Arbeitsrecht · Unternehmensrecht · Vertragsrecht`,
      textSk: `----- VIZITKA -----

Dr. Martina Hoffmann
Advokátka

Hoffmann & Partner Advokátska kancelária
Stephansplatz 12 | 1010 Viedeň

Tel:    +43 1 512 34 56
E-Mail: m.hoffmann@hpkanzlei.at
Web:    www.hoffmann-partner.at

Oblasti: Pracovné právo · Obchodné právo · Zmluvné právo`,
      questions: [
        {
          question: "Was ist Dr. Hoffmanns Beruf?",
          options: ["Ärztin", "Journalistin", "Rechtsanwältin", "Buchhalterin"],
          answer: "Rechtsanwältin",
          explanation: "Die Visitenkarte zeigt: 'Rechtsanwältin' = advokátka.",
        },
        {
          question: "Wo befindet sich die Kanzlei?",
          options: ["Mariahilfer Straße", "Stephansplatz 12, Wien", "Graben 5, Wien", "Karl-Marx-Gasse"],
          answer: "Stephansplatz 12, Wien",
          explanation: "Adresse: Stephansplatz 12 | 1010 Wien.",
        },
        {
          question: "Welches Fachgebiet hat Dr. Hoffmann NICHT?",
          options: ["Arbeitsrecht", "Strafrecht", "Unternehmensrecht", "Vertragsrecht"],
          answer: "Strafrecht",
          explanation: "Die Fachgebiete sind: Arbeitsrecht, Unternehmensrecht, Vertragsrecht. Kein Strafrecht.",
        },
      ],
    },
    {
      type: "freewrite",
      instruction: "Napíš o svojom zamestnaní alebo vysnívanom zamestnaní.",
      prompt:
        "Beschreibe deinen Beruf oder deinen Traumjob! Was bist du von Beruf? Wo arbeitest du? Was machst du täglich? Wie ist dein Chef / deine Chefin?",
      minWords: 30,
      exampleAnswer:
        "Ich bin Lehrerin von Beruf. Ich arbeite in einer Schule in Bratislava. Ich unterrichte Deutsch und Englisch. Meine Klassen sind groß — 25 Schüler pro Klasse. Mein Chef ist sehr nett. Das Gehalt ist nicht hoch, aber der Job macht mir Spaß!",
    },
    {
      type: "wordorder",
      instruction: "Zoraď slová do správnej nemeckej vety.",
      sentences: [
        {
          words: ["Das", "ist", "der", "Mann,", "der", "in", "Wien", "wohnt."],
          correct: "Das ist der Mann, der in Wien wohnt.",
          hint: "To je ten muž, ktorý býva vo Viedni.",
          explanation: "Relativsatz im Nominativ: Relativpronomen 'der' (mask.) für 'der Mann'. Verb 'wohnt' ans Ende.",
        },
        {
          words: ["Die", "Frau,", "die", "Deutsch", "spricht,", "heißt", "Anna."],
          correct: "Die Frau, die Deutsch spricht, heißt Anna.",
          hint: "Žena, ktorá hovorí po nemecky, sa volá Anna.",
          explanation: "'die Frau' → Relativpronomen 'die' (fem.). Verb 'spricht' ans Ende des Relativsatzes.",
        },
        {
          words: ["Das", "Kind,", "das", "schläft,", "heißt", "Lena."],
          correct: "Das Kind, das schläft, heißt Lena.",
          hint: "Dieťa, ktoré spí, sa volá Lena.",
          explanation: "'das Kind' → Relativpronomen 'das' (neut.). Verb 'schläft' ans Ende.",
        },
        {
          words: ["Ich", "kenne", "den", "Mann,", "der", "hier", "wohnt."],
          correct: "Ich kenne den Mann, der hier wohnt.",
          hint: "Poznám toho muža, ktorý tu býva.",
          explanation: "Relativpronomen závisí od rodu nominálneho výrazu — 'der Mann' → Relativpronomen 'der'.",
        },
        {
          words: ["Die", "Leute,", "die", "Deutsch", "lernen,", "sind", "fleißig."],
          correct: "Die Leute, die Deutsch lernen, sind fleißig.",
          hint: "Ľudia, ktorí sa učia nemčinu, sú usilovní.",
          explanation: "Plurál: Relativpronomen 'die' pre všetky rody v pluráli (Nominativ).",
        },
      ],
    },
    {
      type: "speaking",
      instruction: "Počúvaj nemeckú vetu. Potom hovor nahlas a skontroluj sa.",
      phrases: [
        {
          de: "Das ist der Mann, der in Wien wohnt.",
          sk: "To je ten muž, ktorý býva vo Viedni.",
          tip: "'der' = mask. Nom. Relativpronomen",
        },
        {
          de: "Die Frau, die hier arbeitet, ist nett.",
          sk: "Žena, ktorá tu pracuje, je milá.",
          tip: "die Frau → die (Relativpronomen fem.)",
        },
        {
          de: "Das Kind, das schläft, ist müde.",
          sk: "Dieťa, ktoré spí, je unavené.",
          tip: "schläft: ä=[ɛ], krátke ä",
        },
        {
          de: "Ich kenne den Mann, der aus Wien kommt.",
          sk: "Poznám muža, ktorý pochádza z Viedne.",
          tip: "kommt: [komt]",
        },
        {
          de: "Die Leute, die Deutsch lernen, sind klug.",
          sk: "Ľudia, ktorí sa učia nemčinu, sú múdri.",
          tip: "Plurál Relativpronomen vždy 'die'",
        },
      ],
    },
  ],

  reviewWords: [
    "der Arzt / die Ärztin",
    "der Ingenieur / die Ingenieurin",
    "der Koch / die Köchin",
    "der Journalist / die Journalistin",
    "der Polizist / die Polizistin",
    "von Beruf",
    "beruflich",
    "die Firma",
    "das Unternehmen",
    "der Mitarbeiter",
    "das Gehalt",
    "der Chef / die Chefin",
    "die Abteilung",
  ],
  lessonNotes:
    "Kľúčové pravidlo: 'Ich bin Arzt.' (bez 'ein'!) Po 'sein' pri opisovaní povolania sa vynecháva neurčitý člen. Iba ak je adjektívum: 'Ich bin ein guter Arzt.' Slovenčina robí to isté — je to prirodzené! Ženské tvary väčšinou + -in (Lehrer→Lehrerin), s Umlauttom pri niektorých (Arzt→Ärztin, Koch→Köchin).",
};
