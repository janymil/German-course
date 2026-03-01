export const lesson02 = {
  id: 2,
  week: 1,
  day: 2,
  title: 'Wer bist du? Wie heißt du?',
  topic: 'W-Fragen: Wie, Wer, Was. Použitie slovesa sein.',
  cefr: 'A1',
  xpReward: 15,
  narrativeContext: 'Jana sa učí klásť základné otázky pri zoznamovaní a reagovať na bežné situácie v rozhovoroch.',
  communicativeGoal: 'Po tejto lekcii viem klásť základné otázky a vyjadriť súhlas alebo nesúhlas.',
  skillFocus: ['vocabulary', 'grammar', 'reading', 'speaking'],
  grammarNote: {
    rule: 'Opytovacie zámená (W-Fragen) a poriadok slov',
    explanation: 'V nemčine začíname opytovacie vety, pri ktorých očakávame konkrétnu informáciu (tzv. dopĺňacie otázky), vždy opytovacím zámenom. Tieto slová zväčša začínajú na písmeno W (preto sa volajú W-Fragen), napríklad: "wie" (ako), "was" (čo) alebo "wo" (kde). Ak veta začína opytovacím zámenom, hneď na druhom mieste nasleduje vyčasované sloveso a až potom podmet.',
    examples: [
      { de: 'Wie heißt du?', sk: 'Ako sa voláš?' },
      { de: 'Was ist das?', sk: 'Čo je to?' },
      { de: 'Wo bist du?', sk: 'Kde si?' },
      { de: 'Wer ist das?', sk: 'Kto je to?' }
    ],
    slovakContrastNote: 'Opytovacie slovo kladieme zásadne na prvé miesto a za ním nasleduje sloveso. Na rozdiel od angličtiny tu nie sú žiadne pomocné slovesá ako "do/does", systém pripomína skôr slovenčinu.'
  },
  vocab: [
    {
      de: 'wie',
      sk: 'ako',
      gender: null,
      srsId: 'L02_V01',
      example: 'Wie geht es dir?',
      exampleSk: 'Ako sa máš?',
      recycledFrom: []
    },
    {
      de: 'was',
      sk: 'čo',
      gender: null,
      srsId: 'L02_V02',
      example: 'Was ist das?',
      exampleSk: 'Čo je to?',
      recycledFrom: []
    },
    {
      de: 'wo',
      sk: 'kde',
      gender: null,
      srsId: 'L02_V03',
      example: 'Wo bist du?',
      exampleSk: 'Kde si?',
      recycledFrom: []
    },
    {
      de: 'die Frau',
      sk: 'žena, pani',
      gender: 'F',
      srsId: 'L02_V04',
      example: 'Die Frau lernt Deutsch.',
      exampleSk: 'Žena sa učí po nemecky.',
      recycledFrom: []
    },
    {
      de: 'der Herr',
      sk: 'pán',
      gender: 'M',
      srsId: 'L02_V05',
      example: 'Der Herr ist hier.',
      exampleSk: 'Pán je tu.',
      recycledFrom: []
    },
    {
      de: 'gut',
      sk: 'dobre, dobrý',
      gender: null,
      srsId: 'L02_V06',
      example: 'Das ist sehr gut.',
      exampleSk: 'To je veľmi dobré.',
      recycledFrom: []
    },
    {
      de: 'schlecht',
      sk: 'zle, zlý',
      gender: null,
      srsId: 'L02_V07',
      example: 'Das ist nicht schlecht.',
      exampleSk: 'To nie je zlé.',
      recycledFrom: []
    },
    {
      de: 'auch',
      sk: 'tiež, aj',
      gender: null,
      srsId: 'L02_V08',
      example: 'Ich bin auch hier.',
      exampleSk: 'Ja som tu tiež.',
      recycledFrom: []
    },
    {
      de: 'richtig',
      sk: 'správne, správny',
      gender: null,
      srsId: 'L02_V09',
      example: 'Ja, das ist richtig.',
      exampleSk: 'Áno, to je správne.',
      recycledFrom: []
    },
    {
      de: 'falsch',
      sk: 'nesprávne, nesprávny',
      gender: null,
      srsId: 'L02_V10',
      example: 'Nein, das ist falsch.',
      exampleSk: 'Nie, to je nesprávne.',
      recycledFrom: []
    },
    {
      de: 'fragen',
      sk: 'pýtať sa',
      gender: null,
      srsId: 'L02_V11',
      example: 'Ich frage dich.',
      exampleSk: 'Pýtam sa ťa.',
      recycledFrom: []
    },
    {
      de: 'antworten',
      sk: 'odpovedať',
      gender: null,
      srsId: 'L02_V12',
      example: 'Ich antworte dir.',
      exampleSk: 'Odpovedám ti.',
      recycledFrom: []
    },
    {
      de: 'lernen',
      sk: 'učiť sa',
      gender: null,
      srsId: 'L02_V13',
      example: 'Wir lernen Deutsch.',
      exampleSk: 'Učíme sa po nemecky.',
      recycledFrom: []
    },
    {
      de: 'oder',
      sk: 'alebo',
      gender: null,
      srsId: 'L02_V14',
      example: 'Ist das richtig oder falsch?',
      exampleSk: 'Je to správne alebo nesprávne?',
      recycledFrom: []
    },
    {
      de: 'und',
      sk: 'a',
      gender: null,
      srsId: 'L02_V15',
      example: 'Die Frau und der Herr lernen.',
      exampleSk: 'Žena a pán sa učia.',
      recycledFrom: []
    }
  ],
  exercises: [
    {
      type: 'flashcard',
      instruction: 'Prezri si nové slovíčka z tejto lekcie. Pokús sa zapamätať si význam aj členy podstatných mien.'
    },
    {
      type: 'match',
      instruction: 'Priraď nemecké slovíčka k ich slovenským prekladom.',
      pairs: [
        ['wie', 'ako'],
        ['was', 'čo'],
        ['wo', 'kde'],
        ['die Frau', 'žena, pani'],
        ['der Herr', 'pán'],
        ['fragen', 'pýtať sa'],
        ['antworten', 'odpovedať'],
        ['lernen', 'učiť sa']
      ]
    },
    {
      type: 'wordorder',
      instruction: 'Zostav správne vety. Nezabudni: W-Fragen začínajú opytovacím zámenom a následne ide sloveso.',
      sentences: [
        {
          words: ['Wie', 'dir', 'geht', 'es'],
          correct: 'Wie geht es dir',
          hint: 'Ako sa máš?',
          explanation: '"Wie" (ako) je na začiatku, nasleduje sloveso "geht".'
        },
        {
          words: ['ist', 'Was', 'das'],
          correct: 'Was ist das',
          hint: 'Čo je to?',
          explanation: '"Was" je prvé, "ist" druhé.'
        },
        {
          words: ['bist', 'du', 'Wo'],
          correct: 'Wo bist du',
          hint: 'Kde si?',
          explanation: '"Wo" sa pýta na miesto, nachádza sa na prvom mieste vo vete.'
        },
        {
          words: ['oder', 'falsch', 'es', 'Ist', 'richtig'],
          correct: 'Ist es richtig oder falsch',
          hint: 'Je to správne alebo nesprávne?',
          explanation: 'Toto nie je W-otázka, začína sa preto priamo slovesom "Ist".'
        }
      ]
    },
    {
      type: 'fill',
      instruction: 'Doplň chýbajúce slová do vety.',
      questions: [
        {
          sentence: '___ geht es dir?',
          answer: 'Wie',
          hint: 'ako',
          explanation: 'Správna opytovacia fráza je "Wie geht es dir?".'
        },
        {
          sentence: '___ ist das? Das ist ein Buch.',
          answer: 'Was',
          hint: 'čo',
          explanation: 'Na neživé predmety sa pýtame zámenom "Was" (Čo).'
        },
        {
          sentence: 'Ist das ___ oder falsch?',
          answer: 'richtig',
          hint: 'správne',
          explanation: 'Protiklad k nesprávne (falsch) je správne (richtig).'
        },
        {
          sentence: 'Die Frau und der ___ lernen Deutsch.',
          answer: 'Herr',
          hint: 'pán',
          explanation: 'Dvojica slov je "die Frau" (žena) a "der Herr" (pán).'
        },
        {
          sentence: 'Das ist nicht gut, das ist ___.',
          answer: 'schlecht',
          hint: 'zle, zlý',
          explanation: 'Protiklad pre slovo "gut" (dobre) je "schlecht" (zle).'
        }
      ]
    },
    {
      type: 'listen',
      instruction: 'Vypočuj si nemecké frázy a zisti, čo znamenajú.',
      questions: [
        { de: 'wie, was, wo', sk: 'ako, čo, kde' },
        { de: 'die Frau und der Herr', sk: 'žena a pán' },
        { de: 'fragen und antworten', sk: 'pýtať sa a odpovedať' },
        { de: 'Das ist richtig.', sk: 'To je správne.' },
        { de: 'Sehr gut, und dir?', sk: 'Veľmi dobre, a tebe?' },
        { de: 'Wo bist du?', sk: 'Kde si?' }
      ]
    },
    {
      type: 'mcq',
      instruction: 'Vyber správnu možnosť na základe gramatiky a slovíčok z lekcie.',
      questions: [
        {
          question: 'Welches Fragewort fragt nach dem Ort?',
          questionSk: 'Ktoré opytovacie slovo sa pýta na miesto?',
          options: ['Was', 'Wie', 'Wo', 'Wer'],
          answer: 2,
          explanation: '"Wo" znamená "kde" — pýta sa na miesto.'
        },
        {
          question: 'Was antwortest du auf "Wie geht es dir?"',
          questionSk: 'Čo odpovieš na "Ako sa máš?"',
          options: ['Wo bist du?', 'Gut, danke.', 'Das ist falsch.', 'Ich lerne.'],
          answer: 1,
          explanation: 'Na otázku "Ako sa máš?" sa bežne odpovedá "Gut, danke." (Dobre, ďakujem).'
        },
        {
          question: 'Welches Verb bedeutet "pýtať sa"?',
          questionSk: 'Ktoré sloveso znamená "pýtať sa"?',
          options: ['antworten', 'sein', 'lernen', 'fragen'],
          answer: 3,
          explanation: '"Fragen" znamená pýtať sa. "Antworten" je odpovedať.'
        },
        {
          question: 'Was ist das Gegenteil von "schlecht"?',
          questionSk: 'Aký je protiklad slova "schlecht"?',
          options: ['falsch', 'gut', 'auch', 'richtig'],
          answer: 1,
          explanation: 'Protiklad pre "schlecht" (zlý) je "gut" (dobrý).'
        },
        {
          question: 'Ergänze den Satz: "Was ___ das?"',
          questionSk: 'Doplň vetu: "Was ___ das?"',
          options: ['ist', 'bist', 'sein', 'auch'],
          answer: 0,
          explanation: 'Správna veta je "Was ist das?" (Čo je to?). Tretia osoba vyžaduje "ist".'
        }
      ]
    },
    {
      type: 'minitext',
      instruction: 'Prečítaj si text o Janinom prvom dni na jazykovom kurze a odpovedz na otázky.',
      text: 'Jana ist in Wien. Heute ist der erste Tag im Deutschkurs. Die Frau fragt: "Hallo! Wie heißt du?" Jana antwortet: "Ich heiße Jana. Und wer bist du?" Die Frau sagt: "Ich bin Anna. Wie geht es dir?" Jana sagt: "Gut, danke! Was lernen wir?" Anna antwortet: "Wir lernen Deutsch. Das ist sehr gut!" Jana fragt: "Ist Deutsch schwer?" Anna lacht: "Nein!"',
      textSk: 'Jana je vo Viedni. Dnes je prvý deň na kurze nemčiny. Žena sa pýta: "Ahoj! Ako sa voláš?" Jana odpovedá: "Volám sa Jana. A kto si ty?" Žena hovorí: "Ja som Anna. Ako sa máš?" Jana hovorí: "Dobre, ďakujem! Čo sa učíme?" Anna odpovedá: "Učíme sa nemčinu. To je veľmi dobre!" Jana sa pýta: "Je nemčina ťažká?" Anna sa smeje: "Nie!"',
      questions: [
        {
          question: 'Wer fragt zuerst?',
          questionSk: 'Kto sa pýta prvý?',
          options: ['Jana', 'Anna', 'Lukas', 'Thomas'],
          answer: 1,
          explanation: 'Anna sa pýta prvá: "Hallo! Wie heißt du?"'
        },
        {
          question: 'Was lernen Jana und Anna?',
          questionSk: 'Čo sa učia Jana a Anna?',
          options: ['Englisch', 'Deutsch', 'Slowakisch', 'Französisch'],
          answer: 1,
          explanation: 'Anna hovorí: "Wir lernen Deutsch."'
        },
        {
          question: 'Wie geht es Jana?',
          questionSk: 'Ako sa má Jana?',
          options: ['Schlecht.', 'Gut, danke!', 'Sehr schlecht.', 'Nicht gut.'],
          answer: 1,
          explanation: 'Jana odpovedá: "Gut, danke!"'
        }
      ]
    },
    {
      type: 'speaking',
      instruction: 'Precvič si výslovnosť s týmto cvičením. Dávaj pozor na W na začiatku slov.',
      phrases: [
        {
          de: 'Wie geht es dir?',
          sk: 'Ako sa máš?',
          tip: 'W na začiatku slova vyslovujeme ako slovenské v.'
        },
        {
          de: 'Was ist das?',
          sk: 'Čo je to?',
          tip: 'W vyslovíme ako [v], S v slove das vyslovíme veľmi ostro.'
        },
        {
          de: 'Wo bist du?',
          sk: 'Kde si?',
          tip: 'O v slove wo vyslov trochu pritiahnutejšie a dlhšie.'
        },
        {
          de: 'Das ist richtig.',
          sk: 'To je správne.',
          tip: 'Na konci slova richtig sa "ig" číta mäkko [ij/ich].'
        },
        {
          de: 'Ist das richtig oder falsch?',
          sk: 'Je to správne alebo nesprávne?',
          tip: 'Oder sa vyslovuje s dlhým o a mäkkým d.'
        }
      ]
    }
  ],
  reviewWords: ['sein', 'heißen', 'ich', 'du'],
  lessonNotes: 'Študent si musí osvojiť najmä spojitosti opytovacích zámien: Was - vec, Wer - osoba, Wie - spôsob. Dôraz sa kladie aj na výslovnosť w [v].'
};
