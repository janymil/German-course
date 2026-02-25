// WEEK 5 — Housing and Health
export const week5Lessons = [
  {
    id: 14,
    week: 5,
    day: 1,
    title: "Bývanie — Wohnen",
    topic: "Dom, izby a nábytok",
    cefr: "A1",
    xpReward: 35,
    grammarNote: {
      rule: "Es gibt + akuzatív / wohnen in + dativ",
      explanation:
        "'Es gibt' (= there is/are) vždy + akuzatív: es gibt einen Tisch (M), es gibt eine Küche (Ž), es gibt ein Fenster (S). 'Wohnen in' + dativ: ich wohne in einem Haus. Skrátene: in dem = im: im Wohnzimmer, im Schlafzimmer.",
      examples: [
        { de: "Es gibt einen Balkon. (M → einen)", sk: "Je tam balkón." },
        { de: "Es gibt keine Küche. (Ž → keine)", sk: "Niet tu kuchyne." },
        { de: "Ich wohne in einem Haus. (dativ)", sk: "Bývam v dome." },
        { de: "Das Sofa steht im Wohnzimmer. (in + dem = im)", sk: "Gauč stojí v obývačke." },
      ],
    },
    vocab: [
      { de: "die Küche", sk: "kuchyňa", example: "Die Küche ist groß." },
      { de: "das Wohnzimmer", sk: "obývačka", example: "Im Wohnzimmer steht ein großes Sofa." },
      { de: "das Schlafzimmer", sk: "spálňa", example: "Das Schlafzimmer ist ruhig." },
      { de: "das Badezimmer", sk: "kúpeľňa", example: "Das Badezimmer hat eine Badewanne." },
      { de: "der Balkon", sk: "balkón", example: "Ich sitze gern auf dem Balkon." },
      { de: "das Fenster", sk: "okno", example: "Das Fenster ist offen." },
      { de: "die Tür", sk: "dvere", example: "Bitte mach die Tür zu!" },
      { de: "mieten / vermieten", sk: "prenajímať si / prenajímať", example: "Ich miete ein Zimmer. (ich = nájomník)" },
      { de: "die Wohnung", sk: "byt", example: "Die Wohnung ist neu renoviert." },
      { de: "das Haus", sk: "dom", example: "Wir wohnen in einem Haus." },
      { de: "die Miete", sk: "nájomné", example: "Die Miete kostet 800 Euro pro Monat." },
      { de: "das Zimmer", sk: "izba", example: "Ich habe ein eigenes Zimmer." },
      { de: "das Sofa", sk: "gauč", example: "Das Sofa ist sehr bequem." },
      { de: "der Schrank", sk: "skriňa", example: "Meine Kleider sind im Schrank." },
      { de: "das Bett", sk: "posteľ", example: "Das Bett ist bequem." },
      { de: "hell / dunkel", sk: "svetlý / tmavý", example: "Die Wohnung ist sehr hell." },
    ],
    exercises: [
      {
        type: "flashcard",
        instruction: "Dom a izby.",
        items: [
          "die Küche",
          "das Wohnzimmer",
          "das Schlafzimmer",
          "das Badezimmer",
          "der Balkon",
          "das Fenster",
          "mieten",
          "die Miete",
          "das Bett",
          "der Schrank",
          "hell/dunkel",
        ],
      },
      {
        type: "mcq",
        questions: [
          {
            question: "Čo je 'das Wohnzimmer'?",
            options: ["kuchyňa", "spálňa", "obývačka", "kúpeľňa"],
            answer: 2,
          },
          {
            question: "'Es gibt ___ Balkon.' (M rod, akuzatív)",
            options: ["ein", "eine", "einen", "kein"],
            answer: 2,
          },
          {
            question: "Ako sa povie 'prenajímam byt'?",
            options: [
              "Ich kaufe eine Wohnung",
              "Ich miete eine Wohnung",
              "Ich habe eine Wohnung",
              "Ich verkaufe eine Wohnung",
            ],
            answer: 1,
          },
          {
            question: "Čo je 'die Miete'?",
            options: ["obchod", "byt", "nájomné", "dom"],
            answer: 2,
          },
          {
            question: "'In dem Zimmer' sa skrátene povie:",
            options: ["in dem", "ins Zimmer", "am Zimmer", "im Zimmer"],
            answer: 3,
          },
        ],
      },
      {
        type: "fill",
        questions: [
          {
            sentence: "Ich ___ eine Wohnung. (prenajímam)",
            answer: "miete",
            hint: "mieten → ich ___",
          },
          {
            sentence: "Es gibt ___ Balkon. (M → akuzatív)",
            answer: "einen",
            hint: "M rod v akuz. = einen",
          },
          {
            sentence: "Die ___ ist sehr groß. (kuchyňa)",
            answer: "Küche",
            hint: "K...",
          },
          {
            sentence: "Das Sofa steht ___ Wohnzimmer. (in + dem)",
            answer: "im",
            hint: "in + dem = im",
          },
          {
            sentence: "Die Wohnung ist sehr ___. (svetlá)",
            answer: "hell",
            hint: "h...",
          },
        ],
      },
      {
        type: "listen",
        questions: [
          { de: "Ich miete eine Wohnung", sk: "Prenajímam si byt" },
          { de: "Das Wohnzimmer ist groß", sk: "Obývačka je veľká" },
          { de: "Es gibt einen Balkon", sk: "Je tam balkón" },
          { de: "Das Bett ist bequem", sk: "Posteľ je pohodlná" },
        ],
      },
      {
        type: "match",
        pairs: [
          ["die Küche", "kuchyňa"],
          ["das Schlafzimmer", "spálňa"],
          ["das Badezimmer", "kúpeľňa"],
          ["mieten", "prenajímať si"],
          ["die Miete", "nájomné"],
        ],
      },
    ],
  },
  {
    id: 15,
    week: 5,
    day: 2,
    title: "Zdravie — Gesundheit",
    topic: "Telo, bolesť a u doktora",
    cefr: "A1",
    xpReward: 35,
    grammarNote: {
      rule: "Bolí ma → mir tut weh / Ich habe Schmerzen",
      explanation:
        "Dve štruktúry na vyjadrenie bolesti: 1) 'Mir tut + člen + časť tela + weh' — napr. 'Mir tut der Kopf weh'. 2) 'Ich habe + časť tela + schmerzen' — napr. 'Ich habe Kopfschmerzen'. Von + ich = mir (datív): MIR ist schlecht, nicht ICH ist schlecht.",
      examples: [
        { de: "Mir tut der Kopf weh.", sk: "Bolí ma hlava. (weh = bolesť)" },
        { de: "Ich habe Bauchschmerzen.", sk: "Bolí ma brucho. (-schmerzen = bolesť + časť tela)" },
        { de: "Ich fühle mich schlecht.", sk: "Cítim sa zle. (reflexívne sloveso)" },
        { de: "Wie fühlen Sie sich? — Nicht gut.", sk: "Ako sa cítite? — Nie dobre." },
      ],
    },
    vocab: [
      { de: "der Kopf", sk: "hlava", example: "Mir tut der Kopf weh. Ich habe Kopfschmerzen." },
      { de: "der Bauch", sk: "brucho", example: "Ich habe Bauchschmerzen." },
      { de: "der Rücken", sk: "chrbát", example: "Mein Rücken tut weh." },
      { de: "der Hals", sk: "hrdlo / krk", example: "Ich habe Halsschmerzen." },
      { de: "das Bein", sk: "noha", example: "Mir tut das Bein weh." },
      { de: "der Arm", sk: "ruka / paža", example: "Ich habe Schmerzen im Arm." },
      { de: "das Fieber", sk: "horúčka", example: "Ich habe 38 Grad Fieber." },
      { de: "krank", sk: "chorý", example: "Ich bin krank. Ich brauche Ruhe." },
      { de: "gesund", sk: "zdravý", example: "Ich bin jetzt wieder gesund." },
      { de: "der Arzt / die Ärztin", sk: "doktor/doktorka", example: "Ich gehe heute zum Arzt." },
      { de: "wehtun", sk: "bolieť", example: "Was tut Ihnen weh?" },
      { de: "sich fühlen", sk: "cítiť sa", example: "Wie fühlen Sie sich?" },
      { de: "die Tablette", sk: "tableta", example: "Nehmen Sie diese Tabletten drei mal täglich." },
      { de: "die Erkältung", sk: "prechladnutie", example: "Ich habe eine Erkältung." },
      { de: "husten / niesen", sk: "kašľať / kýchať", example: "Ich huste und niese viel." },
      { de: "der Termin", sk: "termín (u doktora)", example: "Ich brauche einen Termin beim Arzt." },
    ],
    exercises: [
      {
        type: "flashcard",
        instruction: "Zdravie a telo.",
        items: [
          "der Kopf",
          "der Bauch",
          "der Rücken",
          "der Hals",
          "das Bein",
          "der Arm",
          "das Fieber",
          "krank/gesund",
          "sich fühlen",
          "die Tablette",
          "die Erkältung",
        ],
      },
      {
        type: "mcq",
        questions: [
          {
            question: "Ako povieš 'Bolí ma hlava'?",
            options: [
              "Mir ist der Kopf",
              "Mir tut der Kopf weh",
              "Ich habe Kopf",
              "Der Kopf tut ich weh",
            ],
            answer: 1,
          },
          {
            question: "Čo je 'das Fieber'?",
            options: ["kašeľ", "horúčka", "bolesť chrbta", "nádcha"],
            answer: 1,
          },
          {
            question: "Ako sa povie 'Som chorý'?",
            options: ["Ich bin gesund", "Mir tut alles weh", "Ich bin krank", "Ich fühle mie gut"],
            answer: 2,
          },
          {
            question: "'Ich habe Halsschmerzen' znamená:",
            options: ["Bolí ma brucho", "Mám nádchu", "Bolí ma hrdlo", "Mám horúčku"],
            answer: 2,
          },
          {
            question: "Správna veta: Ich fühle mich ___.",
            options: ["nicht gut", "nicht schlecht", "schlecht", "alle vorhin"],
            answer: 2,
          },
        ],
      },
      {
        type: "fill",
        questions: [
          {
            sentence: "Mir tut der ___ weh. (hlava)",
            answer: "Kopf",
            hint: "K...",
          },
          {
            sentence: "Ich habe ___. (horúčka)",
            answer: "Fieber",
            hint: "F...",
          },
          {
            sentence: "Ich bin ___. (chorý)",
            answer: "krank",
            hint: "k...",
          },
          {
            sentence: "Ich gehe zum ___. (doktor, M dativ: zum = zu + dem)",
            answer: "Arzt",
            hint: "A...",
          },
          {
            sentence: "Ich fühle mich ___. (zle)",
            answer: "schlecht",
            hint: "s...",
          },
        ],
      },
      {
        type: "listen",
        questions: [
          { de: "Mir tut der Kopf weh", sk: "Bolí ma hlava" },
          { de: "Ich bin krank", sk: "Som chorý" },
          { de: "Wie fühlen Sie sich?", sk: "Ako sa cítite?" },
          { de: "Ich habe eine Erkältung", sk: "Mám prechladnutie" },
        ],
      },
      {
        type: "match",
        pairs: [
          ["der Kopf", "hlava"],
          ["der Bauch", "brucho"],
          ["das Fieber", "horúčka"],
          ["krank", "chorý"],
          ["die Erkältung", "prechladnutie"],
        ],
      },
    ],
  },
];
