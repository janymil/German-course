/**
 * Chapter 1 — Verb: sein/haben
 * Deutsch Übungsbuch Grammatik A1/A2 — Seiten 8–10
 * All exercises reproduced exactly as in book.
 */

export const ch01 = {
  id: 1,
  title: 'Verb: sein/haben',
  subtitle: 'Ich bin Maryam. Hast du Zeit?',
  pages: '8–10',
  section: 'VERB: Formen',
  // ---------------------------------------------------------------------------
  exercises: [

    // ─── START A ─── Markieren Sie die Verben haben & sein ──────────────────
    {
      id: 'ch01-A',
      label: 'START A',
      type: 'mark-verbs',
      instruction: 'Markieren Sie in den Dialogen die Verben <strong>haben</strong> und <strong>sein</strong>.',
      // Which verb class each token belongs to (null = not a verb to mark)
      targetVerbs: ['sein', 'haben'],
      dialogs: [
        {
          id: 'a',
          bubbles: [
            { speaker: 'phone', text: 'Winter, ja bitte?' },
            { speaker: 'A', text: 'Hallo? Ah... Ich bin Maryam. Bist du da?' },
            { speaker: 'A', text: 'Ich bin die Urgroßmutter von Julia.' },
            { speaker: 'E', text: 'Julia! Hast du Zeit? Maryam ist am Telefon.' },
          ],
        },
        {
          id: 'b',
          bubbles: [
            { speaker: 'A', text: 'Nein, hier ist Frau Winter.' },
            { speaker: 'G', text: 'Moment, bitte... Alle sind im Garten.' },
            { speaker: 'A', text: 'Hallo, Maryam? Entschuldigung. Wir sind gerade alle draußen.' },
            { speaker: 'B', text: 'Hallo, Julia. Ah... ihr habt Besuch.' },
            { speaker: 'A', text: 'Ja, große Familienparty. Julia. Ah... ich habe viele Onkel und Tanten...' },
            { speaker: 'C', text: 'Das ist cool.' },
          ],
        },
        {
          id: 'c',
          bubbles: [
            { speaker: 'D', text: 'Es ist so warm heute. Und wir haben Gäste.' },
            { speaker: 'E', text: 'Und du hast eine Urgroßmutter!' },
          ],
        },
      ],
      // tokens per bubble that ARE verbs: { bubbleText -> [word, verbClass] }
      answers: {
        'Hallo? Ah... Ich bin Maryam. Bist du da?': [
          { word: 'bin', verbClass: 'sein' },
          { word: 'Bist', verbClass: 'sein' },
        ],
        'Ich bin die Urgroßmutter von Julia.': [
          { word: 'bin', verbClass: 'sein' },
        ],
        'Julia! Hast du Zeit? Maryam ist am Telefon.': [
          { word: 'Hast', verbClass: 'haben' },
          { word: 'ist', verbClass: 'sein' },
        ],
        'Nein, hier ist Frau Winter.': [
          { word: 'ist', verbClass: 'sein' },
        ],
        'Moment, bitte... Alle sind im Garten.': [
          { word: 'sind', verbClass: 'sein' },
        ],
        'Hallo, Maryam? Entschuldigung. Wir sind gerade alle draußen.': [
          { word: 'sind', verbClass: 'sein' },
        ],
        'Hallo, Julia. Ah... ihr habt Besuch.': [
          { word: 'habt', verbClass: 'haben' },
        ],
        'Ja, große Familienparty. Julia. Ah... ich habe viele Onkel und Tanten...': [
          { word: 'habe', verbClass: 'haben' },
        ],
        'Das ist cool.': [
          { word: 'ist', verbClass: 'sein' },
        ],
        'Es ist so warm heute. Und wir haben Gäste.': [
          { word: 'ist', verbClass: 'sein' },
          { word: 'haben', verbClass: 'haben' },
        ],
        'Und du hast eine Urgroßmutter!': [
          { word: 'hast', verbClass: 'haben' },
        ],
      },
    },

    // ─── START B ─── Conjugation table ──────────────────────────────────────
    {
      id: 'ch01-B',
      label: 'START B',
      type: 'conjugation-table',
      instruction: 'Ergänzen Sie die Verben. Die Sätze in A. helfen Ihnen.',
      hint: 'Die Sätze in A. helfen Ihnen.',
      table: {
        pronouns: ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie'],
        verbs: [
          {
            verb: 'sein',
            forms: [
              { pronoun: 'ich', form: 'bin', prefilled: false },
              { pronoun: 'du', form: 'bist', prefilled: true },   // shown in book as pre-filled reference
              { pronoun: 'er/sie/es', form: 'ist', prefilled: false },
              { pronoun: 'wir', form: 'sind', prefilled: false },
              { pronoun: 'ihr', form: 'seid', prefilled: false },
              { pronoun: 'sie/Sie', form: 'sind', prefilled: false },
            ],
          },
          {
            verb: 'haben',
            forms: [
              { pronoun: 'ich', form: 'habe', prefilled: false },
              { pronoun: 'du', form: 'hast', prefilled: true },   // shown in book in blue
              { pronoun: 'er/sie/es', form: 'hat', prefilled: false },
              { pronoun: 'wir', form: 'haben', prefilled: false },
              { pronoun: 'ihr', form: 'habt', prefilled: false },
              { pronoun: 'sie/Sie', form: 'haben', prefilled: false },
            ],
          },
        ],
      },
    },

    // ─── START C ─── Was passt? Ergänzen Sie ────────────────────────────────
    {
      id: 'ch01-C',
      label: 'START C',
      type: 'word-assign',
      instruction: 'Was passt? Ergänzen Sie.',
      slots: [
        { id: 'c1', stem: 'Ich bin', answer: 'Maryam', hasEllipsis: true },
        { id: 'c2', stem: 'Ich habe', answer: 'Zeit', hasEllipsis: true },
      ],
      wordBank: [
        'Besuch',
        'die Urgroßmutter von Julia',
        'draußen',
        'Gäste',
        'im Garten',
        'Maryam',
        'viele Onkel und Tanten',
        'Zeit',
      ],
    },

    // ─── Exercise 1 ─── Das ist ein Problem / Ich habe ein Problem ───────────
    {
      id: 'ch01-1',
      label: '1',
      type: 'fill-bank',
      title: 'Das ist ein Problem: Ich habe ein Problem.',
      instruction: 'Ergänzen Sie <strong>haben</strong> oder <strong>sein</strong> in der richtigen Form.',
      dialogs: [
        {
          id: 'phone-dialog',
          label: '▲ Kastner, guten Tag.',
          lines: [
            { speaker: '●', text: 'Guten Tag, Herr Kastner. Hier {0} Martin Bittermann. Ich {1} von der Firma Computex.' },
            { speaker: '▲', text: 'Ah, Herr Bittermann! Sie {2} der Spezialist für Software, richtig? Ich {3} seit gestern ein großes Problem.' },
            { speaker: '●', text: 'Was {4} los?' },
            { speaker: '▲', text: 'Ich glaube, mein Computer {5} einen Virus. {6} Sie ein Virenprogramm für mich?' },
            { speaker: '●', text: 'Kein Problem. Wir von der Firma Computex, wir {7} die Spezialisten!' },
          ],
          firstLinePrefilled: true,
          firstLineLabel: '▲ Kastner, guten Tag.',
        },
        {
          id: 'friend-dialog',
          label: '',
          lines: [
            { speaker: '▲', text: 'Hallo, Moritz! {8} alles okay bei dir?' },
            { speaker: '●', text: 'Grüß dich, Lisa. Nein, leider nicht. Ich {9} hungrig, aber ich {10} keine Zeit zum Kochen.' },
            { speaker: '▲', text: 'Sag mal, {11} du gerade in der Nähe? Ich {12} zu Hause und Alex und Tina {13} auch da. Wir {14} viel zu viel zu essen: Spaghetti und Salat. Und Suppe {15} auch noch da. {16} du Lust?' },
            { speaker: '●', text: 'Wow, ihr {17} nett! Ja, ich komme gern.' },
          ],
        },
      ],
      // Answers: index 0 is pre-filled example ("ist")
      answers: ['ist', 'bin', 'sind', 'habe', 'ist', 'hat', 'Haben', 'sind', 'Ist', 'bin', 'habe', 'bist', 'bin', 'sind', 'haben', 'ist', 'Hast', 'seid'],
      prefilled: [0], // index 0 is shown as example
      wordBank: ['bin', 'ist', 'ist', 'habe', 'Haben', 'hat', 'sind', 'sind', 'bin', 'bin', 'bist', 'habe', 'Hast', 'ist', 'sind', 'seid', 'sind'],
      sideNote: 'Am Telefon sagt man NICHT nur Hallo? / Ja?, sondern: Clara Blume, guten Tag! / Kohler hier. / Firma Mediastar.',
    },

    // ─── Exercise 2 ─── sein oder nicht sein? ────────────────────────────────
    {
      id: 'ch01-2',
      label: '2',
      type: 'dual-select',
      title: 'sein oder nicht sein?',
      instruction: 'Markieren Sie: Das ist falsch. In drei Sätzen sind beide Formen richtig!',
      items: [
        {
          id: 0,
          line: 'Meine Schwester Merlin {?} eine Katze.',
          response: '– Aha.',
          options: ['ist', 'hat'],
          correct: ['ist'],
          example: true,
        },
        {
          id: 1,
          line: 'Auf dem Foto links, das {?} meine Schwester Merlin.',
          response: '– Sehr schön!',
          options: ['ist', 'hat'],
          correct: ['ist'],
        },
        {
          id: 2,
          line: 'Wir {?} drei Brüder.',
          response: '– Wow, so viele.',
          options: ['sind', 'haben'],
          correct: ['sind', 'haben'],  // beide richtig: Wir haben drei Brüder / Wir sind drei Brüder
          bothOk: true,
        },
        {
          id: 3,
          line: '{?} du verheiratet?',
          response: '– Nein, aber ich habe einen Freund.',
          options: ['Bist', 'Hast'],
          correct: ['Bist'],
        },
        {
          id: 4,
          line: 'Wie viele Kinder {?} du?',
          response: '– Drei.',
          options: ['bist', 'hast'],
          correct: ['hast'],
        },
        {
          id: 5,
          line: 'Ihr {?} aber schon große Kinder.',
          response: '– Ja. Und?',
          options: ['seid', 'habt'],
          correct: ['seid', 'habt'],  // both correct
          bothOk: true,
        },
        {
          id: 6,
          line: 'Das Wetter ist schön. Es {?} 25 Grad.',
          response: '– Gehen wir spazieren?',
          options: ['ist', 'hat'],
          correct: ['ist', 'hat'],  // both correct (regional: D/CH: sind, A: hat)
          bothOk: true,
          note: 'Wetterbericht: Es ist warm. D/CH: Es sind 8 Grad. A: Es hat 8 Grad.',
        },
        {
          id: 7,
          line: '{?} Sie Frau Merkel?',
          response: '– Ja, warum?',
          options: ['Sind', 'Haben'],
          correct: ['Sind'],
        },
        {
          id: 8,
          line: '{?} Sie kurz Zeit für mich?',
          response: '– Immer!',
          options: ['Sind', 'Haben'],
          correct: ['Haben'],
        },
      ],
    },

    // ─── Exercise 3 ─── Was für Fragen ──────────────────────────────────────
    {
      id: 'ch01-3',
      label: '3',
      type: 'fill-passage',
      title: 'Was für Fragen ...',
      instruction: 'Was passt? Ergänzen Sie die richtige Form von <strong>haben</strong> oder <strong>sein</strong>.',
      star: true,
      passages: [
        {
          id: 'a',
          speakerImg: 'boy',
          text: 'Hallo! Ich {0} Zbigniew Schmidt. Ich {1} einen polnischen Vornamen. Ich {2} 19 Jahre alt, aber nicht mehr lange. Morgen {3} der 8. April, da {4} ich Geburtstag. Ich mache eine Party im Café Stein. Das {5} im Zentrum und {6} Platz für viele Leute. Kommst du auch? {7} du Lust?',
          answers: ['bin', 'habe', 'bin', 'ist', 'habe', 'ist', 'hat', 'Hast'],
        },
        {
          id: 'b',
          speakerImg: 'girl',
          text: 'Hi Noemi. Hier {8} Christa. ... {9} du gerade Zeit? ... Aber was {10} du denn? Was {11} los? {12} du traurig? {13} du ein Problem? Wo {14} du denn? ... Zu Hause? Ich {15} eine Idee: Treffen wir uns! Ich {16} in 30 Minuten bei dir. Dann kannst du mir alles erzählen.',
          answersMap: { 8: 'ist', 9: 'Hast', 10: 'hast', 11: 'ist', 12: 'Bist', 13: 'Hast', 14: 'bist', 15: 'habe', 16: 'bin' },
        },
        {
          id: 'c',
          speakerImg: 'family',
          text: 'Mama, Papa, ich {17} mit der Hausaufgabe fast fertig, aber ich {18} noch ein paar Fragen: {19} das Wort „Obst" auch einen Plural? {20} wir ein Englisch-Wörterbuch? Warum {21} Mathematik so schwer? {22} die Sterne nur in der Nacht da? Und warum {23} ihr jetzt so nervös? {24} ihr Stress?',
          answersMap: { 17: 'bin', 18: 'habe', 19: 'Hat', 20: 'Haben', 21: 'ist', 22: 'Sind', 23: 'seid', 24: 'Habt' },
        },
      ],
    },

    // ─── Exercise 4 ─── Hoppla – Fehler Fehler! ─────────────────────────────
    {
      id: 'ch01-4',
      label: '4',
      type: 'error-correct',
      title: 'Hoppla – Fehler Fehler!',
      instruction: 'Finden Sie die Fehler! Korrigieren Sie den Dialog.',
      dialog: [
        {
          speaker: '▲',
          // Each segment: { text } or { wrong, correct } for correctable blanks
          segments: [
            { text: 'Tim, Serap! Was ist los? ' },
            { wrong: 'Habst', correct: 'Habt', num: 0, prefilled: true },
            { text: ' ihr keine Uhr? Ihr ' },
            { wrong: 'sied', correct: 'seid', num: 1 },
            { text: ' schon wieder spät dran. Der Deutschkurs beginnt um halb zehn!' },
          ],
        },
        {
          speaker: '●',
          segments: [
            { text: 'Aber es ' },
            { wrong: 'is', correct: 'ist', num: 2 },
            { text: ' doch erst 8.45 Uhr. Warum ' },
            { wrong: 'bisd', correct: 'bist', num: 3 },
            { text: ' du so nervös, Monica? Wir ' },
            { wrong: 'habe', correct: 'haben', num: 4 },
            { text: ' noch Zeit.' },
          ],
        },
        {
          speaker: '▲',
          segments: [
            { text: 'Aber heute ' },
            { wrong: 'seind', correct: 'sind', num: 5 },
            { text: ' viele Autos auf der Straße. Dann ' },
            { wrong: 'habt', correct: 'hat', num: 6 },
            { text: ' der Bus vielleicht Verspätung.' },
          ],
        },
        {
          speaker: '●',
          segments: [
            { text: 'Okay. Wir ' },
            { wrong: 'sint', correct: 'sind', num: 7 },
            { text: ' schon fertig! Entschuldigung ...' },
          ],
        },
      ],
    },

  ],
};
