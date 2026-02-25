export const lesson01 = {
  id: 1,
  week: 1,
  day: 1,
  title: "Das Alphabet und die Aussprache",
  topic: "Nemecká abeceda a výslovnosť",
  cefr: "A1",
  xpReward: 15,
  narrativeContext:
    "Jana Nováková, 28, z Bratislavy, vypĺňa formulár na viedenskom HR oddelení. Recepčná ju žiada, aby nahláskovala svoje priezvisko. Jana sa zhlboka nadýchne — teraz sa to všetko začína.",
  communicativeGoal:
    "Po tejto lekcii viem nahláskovat' svoje meno a iné slová po nemecky a rozumiem základným pravidlám čítania nemeckých písmen vrátane prehlások a ostrého S.",
  skillFocus: ["vocabulary", "listening", "pronunciation", "writing"],

  grammarNote: {
    rule: "Nemecká výslovnosť — kľúčové rozdiely od slovenčiny",
    explanation:
      "Nemčina a slovenčina sa líšia vo výslovnosti niekoľkých písmen. Najdôležitejšie rozdiely: W sa číta [v], V sa číta [f], Z sa číta [ts], J sa číta [j], ch sa číta [x] alebo [ç], ß sa číta [ss]. Prehlásky ä, ö, ü nemajú priamu paralelu v slovenčine.",
    examples: [
      { de: 'das Wasser', note: 'W = [v] ako v slovenskom V', sk: 'voda' },
      { de: 'verstehen', note: 'V = [f] — opak slovenčiny!', sk: 'rozumieť' },
      { de: 'Zimmer → [tsɪmɐ]', sk: 'izba — Z sa číta ako TS!' },
      { de: 'ja → [jaː]', sk: 'áno — J sa číta ako slovenské J' },
      { de: 'noch', note: 'ch po a/o/u = [x] (hrdelné)', sk: 'ešte' },
      { de: 'die Straße → [ʃtraːsə]', sk: 'ulica — ß sa číta ako SS' }
    ],
    slovakContrastNote:
      'V slovenčine: W=[w], V=[v], Z=[z]. V nemčine: W=[v], V=[f], Z=[ts]. Toto je najčastejšia chyba slovenských hovoriacich! Navyše nemčina má prehlásky ä/ö/ü, ktoré v slovenčine neexistujú ako samostatné písmená.',
    alphabetTable: [
      { letter: 'A', name: 'ah', example: 'der Apfel' },
      { letter: 'B', name: 'bay', example: 'die Banane' },
      { letter: 'C', name: 'tsay', example: 'das Café' },
      { letter: 'D', name: 'day', example: 'Deutschland' },
      { letter: 'E', name: 'ay', example: 'der Elefant' },
      { letter: 'F', name: 'ef', example: 'die Familie' },
      { letter: 'G', name: 'gay', example: 'gut' },
      { letter: 'H', name: 'hah', example: 'das Haus' },
      { letter: 'I', name: 'ee', example: 'ich' },
      { letter: 'J', name: 'yot', example: 'ja' },
      { letter: 'K', name: 'kah', example: 'kommen' },
      { letter: 'L', name: 'el', example: 'lang' },
      { letter: 'M', name: 'em', example: 'die Mutter' },
      { letter: 'N', name: 'en', example: 'nein' },
      { letter: 'O', name: 'oh', example: 'die Oma' },
      { letter: 'P', name: 'pay', example: 'die Post' },
      { letter: 'Q', name: 'koo', example: 'das Quiz' },
      { letter: 'R', name: 'er', example: 'richtig' },
      { letter: 'S', name: 'es', example: 'die Stadt' },
      { letter: 'T', name: 'tay', example: 'der Tag' },
      { letter: 'U', name: 'oo', example: 'und' },
      { letter: 'V', name: 'fow', example: 'der Vogel' },
      { letter: 'W', name: 'vay', example: 'Wien' },
      { letter: 'X', name: 'iks', example: 'das Taxi' },
      { letter: 'Y', name: 'oepsilon', example: 'das Yoga' },
      { letter: 'Z', name: 'tset', example: 'das Zimmer' },
      { letter: 'Ä', name: 'ae', example: 'die Ärztin' },
      { letter: 'Ö', name: 'oe', example: 'Österreich' },
      { letter: 'Ü', name: 'ue', example: 'über' },
      { letter: 'ß', name: 'es-tset', example: 'die Straße' }
    ],
    digraphs: [
      { combo: 'sch', sound: '[ʃ]', example: 'die Schule', sk: 'škola' },
      { combo: 'st (word start)', sound: '[ʃt]', example: 'die Stadt', sk: 'mesto' },
      { combo: 'sp (word start)', sound: '[ʃp]', example: 'sprechen', sk: 'hovoriť' },
      { combo: 'ng', sound: '[ŋ]', example: 'lang', sk: 'dlhý' },
      { combo: 'ie', sound: '[iː]', example: 'Wien', sk: 'Viedeň' },
      { combo: 'ei', sound: '[aɪ]', example: 'nein', sk: 'nie' }
    ],
    phoneticAlphabet: [
      { letter: 'A', word: 'Anton' },
      { letter: 'B', word: 'Berta' },
      { letter: 'C', word: 'Cäsar' },
      { letter: 'D', word: 'Dora' },
      { letter: 'E', word: 'Emil' },
      { letter: 'F', word: 'Friedrich' },
      { letter: 'G', word: 'Gustav' },
      { letter: 'H', word: 'Heinrich' },
      { letter: 'I', word: 'Ida' },
      { letter: 'J', word: 'Julius' },
      { letter: 'K', word: 'Kaufmann' },
      { letter: 'L', word: 'Ludwig' },
      { letter: 'M', word: 'Martha' },
      { letter: 'N', word: 'Nordpol' },
      { letter: 'O', word: 'Otto' },
      { letter: 'P', word: 'Paula' },
      { letter: 'Q', word: 'Quelle' },
      { letter: 'R', word: 'Richard' },
      { letter: 'S', word: 'Samuel' },
      { letter: 'T', word: 'Theodor' },
      { letter: 'U', word: 'Ulrich' },
      { letter: 'V', word: 'Viktor' },
      { letter: 'W', word: 'Wilhelm' },
      { letter: 'X', word: 'Xanthippe' },
      { letter: 'Y', word: 'Ypsilon' },
      { letter: 'Z', word: 'Zacharias' },
      { letter: 'Ä', word: 'Ärger' },
      { letter: 'Ö', word: 'Ökonom' },
      { letter: 'Ü', word: 'Übermut' },
      { letter: 'ß', word: 'Eszett' }
    ]
  },

  vocab: [
    {
      de: "das Alphabet",
      sk: "abeceda",
      example: "Das Alphabet hat 26 Grundbuchstaben plus Umlaute und das Eszett.",
      exampleSk: "Abeceda má 26 základných písmen plus prehlásky a Eszett.",
      gender: "N",
      srsId: "L01_V01",
      recycledFrom: []
    },
    {
      de: "der Buchstabe",
      sk: "písmeno",
      example: "Welcher Buchstabe kommt zuerst?",
      exampleSk: "Ktoré písmeno príde ako prvé?",
      gender: "M",
      srsId: "L01_V02",
      recycledFrom: []
    },
    {
      de: "der Umlaut",
      sk: "prehláska",
      example: "Ä, Ö und Ü sind Umlaute.",
      exampleSk: "Ä, Ö a Ü sú prehlásky.",
      gender: "M",
      srsId: "L01_V03",
      recycledFrom: []
    },
    {
      de: "die Aussprache",
      sk: "výslovnosť",
      example: "Die Aussprache ist sehr wichtig.",
      exampleSk: "Výslovnosť je veľmi dôležitá.",
      gender: "F",
      srsId: "L01_V04",
      recycledFrom: []
    },
    {
      de: "buchstabieren",
      sk: "hláskovať",
      example: "Können Sie Ihren Namen buchstabieren?",
      exampleSk: "Môžete nahláskoval' svoje meno?",
      gender: null,
      srsId: "L01_V05",
      recycledFrom: []
    },
    {
      de: "heißen",
      sk: "volať sa",
      example: "Wie heißen Sie?",
      exampleSk: "Ako sa voláte?",
      gender: null,
      srsId: "L01_V06",
      recycledFrom: []
    },
    {
      de: "die Straße",
      sk: "ulica",
      example: "Wie heißt Ihre Straße? — Ich wohne in der Hauptstraße.",
      exampleSk: "Ako sa volá vaša ulica? — Bývam na Hauptstraße.",
      gender: "F",
      srsId: "L01_V07",
      recycledFrom: []
    },
    {
      de: 'der Name',
      sk: 'meno',
      example: 'Wie ist Ihr Name?',
      exampleSk: 'Aké je vaše meno?',
      gender: 'M',
      srsId: 'L01_V08',
      recycledFrom: []
    },
    {
      de: 'noch einmal bitte',
      sk: 'ešte raz prosím',
      example: 'Noch einmal bitte, ich verstehe nicht.',
      exampleSk: 'Ešte raz prosím, nerozumiem.',
      gender: null,
      srsId: 'L01_V09',
      recycledFrom: []
    },
    {
      de: "langsam",
      sk: "pomaly",
      example: "Buchstabieren Sie bitte langsam!",
      exampleSk: "Hláskujte prosím pomaly!",
      gender: null,
      srsId: "L01_V10",
      recycledFrom: []
    },
    {
      de: "sprechen",
      sk: "hovoriť",
      example: "Jana spricht ein bisschen Deutsch.",
      exampleSk: "Jana trochu hovorí po nemecky.",
      gender: null,
      srsId: "L01_V11",
      recycledFrom: []
    },
    {
      de: "schreiben",
      sk: "písať",
      example: "Sie schreibt ihren Namen auf das Formular.",
      exampleSk: "Píše svoje meno na formulár.",
      gender: null,
      srsId: "L01_V12",
      recycledFrom: []
    },
    {
      de: "kurz",
      sk: "krátky",
      example: "Das Wort ist kurz.",
      exampleSk: "Slovo je krátke.",
      gender: null,
      srsId: "L01_V13",
      recycledFrom: []
    },
    {
      de: "lang",
      sk: "dlhý",
      example: "Das Wort 'Entschuldigung' ist sehr lang.",
      exampleSk: "Slovo 'Entschuldigung' je veľmi dlhé.",
      gender: null,
      srsId: "L01_V14",
      recycledFrom: []
    },
    {
      de: "Wie schreibt man das?",
      sk: "Ako sa to píše?",
      example: "Wie schreibt man das Wort 'Straße\'?",
      exampleSk: "Ako sa píše slovo 'Straße\'?",
      gender: null,
      srsId: "L01_V15",
      recycledFrom: []
    },
    {
      de: "Das ist richtig.",
      sk: "To je správne.",
      example: "Das ist richtig. Sehr gut!",
      exampleSk: "To je správne. Výborne!",
      gender: null,
      srsId: "L01_V16",
      recycledFrom: []
    },
    {
      de: "der Vorname",
      sk: "krstné meno",
      example: "Mein Vorname ist Jana.",
      exampleSk: "Moje krstné meno je Jana.",
      gender: "M",
      srsId: "L01_V17",
      recycledFrom: []
    },
    {
      de: "der Familienname",
      sk: "priezvisko",
      example: "Mein Familienname ist Nováková.",
      exampleSk: "Moje priezvisko je Nováková.",
      gender: "M",
      srsId: "L01_V18",
      recycledFrom: []
    },
    {
      de: "das Eszett (ß)",
      sk: "ostré s",
      example: "Das Eszett klingt wie ein doppeltes S.",
      exampleSk: "Ostré S znie ako dvojité S.",
      gender: "N",
      srsId: "L01_V19",
      recycledFrom: []
    },
    {
      de: 'Entschuldigung',
      sk: 'prepáčte / ospravedlňujem sa',
      example: 'Entschuldigung, wie heißen Sie?',
      exampleSk: 'Prepáčte, ako sa voláte?',
      gender: null,
      srsId: 'L01_V20',
      recycledFrom: []
    },
    {
      de: 'Können Sie das buchstabieren?',
      sk: 'Môžete to nahláskovat?',
      example: 'Entschuldigung, können Sie Ihren Namen buchstabieren?',
      exampleSk: 'Prepáčte, môžete nahláskovat\' svoje meno?',
      gender: null,
      srsId: 'L01_V21',
      recycledFrom: []
    }
  ],

  exercises: [
    {
      type: 'flashcard',
      instruction:
        'Preštuduj si výslovnostné pravidlá a slovíčka. Flip kartu pre slovenský preklad.'
    },
    {
      type: "mcq",
      instruction:
        "Vyber správnu výslovnosť alebo preklad. Jana sa práve učí nemeckú abecedu — pomôž jej!",
      questions: [
        {
          question: "Ako sa vyslovuje nemecké písmeno W?",
          options: [
            "[w] ako v angličtine (water)",
            "[v] ako slovenské V (voda)",
            "[b] ako slovenské B",
            "[f] ako slovenské F"
          ],
          answer: 1,
          explanation:
            "Nemecké W sa vyslovuje [v] — teda ako slovenské V. Príklad: Wien = [viːn] = Viedeň. Toto je jedna z najčastejších chýb slovenských a anglicky hovoriacich!"
        },
        {
          question: "Ako sa vyslovuje nemecké písmeno V?",
          options: [
            "[v] ako slovenské V",
            "[w] ako anglické W",
            "[f] ako slovenské F",
            "[b] ako slovenské B"
          ],
          answer: 2,
          explanation:
            "Nemecké V sa vyslovuje [f] — teda ako slovenské F! Príklad: Vogel = [foːɡəl] = vták. Paradoxne: nemecké W=[v] a nemecké V=[f] — presný opak slovenčiny!"
        },
        {
          question: "Ako sa vyslovuje nemecké Z?",
          options: [
            "[z] ako slovenské Z (zima)",
            "[s] ako slovenské S",
            "[ts] ako slovenský spoj TS (cár)",
            "[dz] ako slovenský spoj DZ"
          ],
          answer: 2,
          explanation:
            "Nemecké Z sa vyslovuje [ts] — ako kombinácia T+S. Príklad: Zimmer = [tsɪmɐ] = izba. V slovenčine kombinácia 'ts' existuje (napr. 'cár'), ale Z samostatne sa tak nevyslovuje."
        },
        {
          question: "Čo je to ß (Eszett)?",
          options: [
            "Písmeno B v kurzíve",
            "Špeciálna forma písmena S, číta sa ako SS",
            "Písmeno Z v historickom rukopise",
            "Kombinácia písmen S a Z"
          ],
          answer: 1,
          explanation:
            "ß (Eszett alebo scharfes S — ostré S) sa vyslovuje ako dvojité SS. Príklad: Straße = [ʃtraːsə] = ulica. V slovenčine toto písmeno neexistuje. ß sa používa po dlhých samohláskach a dvojhláskach."
        },
        {
          question: "Jana vypĺňa formulár. Recepčná sa pýta: 'Wie schreibt man das?\' Čo to znamená?",
          options: [
            "Ako sa to vyslovuje?",
            "Ako sa to píše?",
            "Čo to znamená?",
            "Kde to je?"
          ],
          answer: 1,
          explanation:
            "'Wie schreibt man das?\' doslova znamená 'Ako sa to píše?\' Sloveso 'schreiben' = písať. Toto je kľúčová fráza, keď potrebuješ niekoho požiadať o hláskovanie slova."
        },
        {
          question: "Ktoré z nasledujúcich slov obsahuje Umlaut (prehlásku)?",
          options: [
            "Buchstabe",
            "Aussprache",
            "Über",
            "Alphabet"
          ],
          answer: 2,
          explanation:
            "Über obsahuje prehlásku Ü. Prehlásky (Umlaute) sú ä, ö, ü — sú to samohlásky s dvomi bodkami (Trema). V slovenčine neexistujú tieto konkrétne hlásky, preto treba zvláštnu pozornosť."
        }
      ]
    },
    {
      type: "fill",
      instruction:
        "Doplň správne slovo do vety. Jana precvičuje nemčinu pred zrkadlom vo Viedni.",
      questions: [
        {
          sentence: "Wie ___ Sie? — Ich heiße Jana Nováková.",
          answer: "heißen",
          hint: "volať sa (formálna otázka)",
          explanation:
            "'heißen' = volať sa. V otázke 'Wie heißen Sie?' = 'Ako sa voláte?' Formálna forma používa 'Sie' (veľké S)."
        },
        {
          sentence: "Können Sie Ihren Namen ___?",
          answer: "buchstabieren",
          hint: "hláskovať",
          explanation:
            "'buchstabieren' = hláskovať. Recepčná v HR žiada Janu, aby nahláskovala svoje priezvisko — 'Nováková' je pre Rakúšanov neobvyklé meno."
        },
        {
          sentence: "Das ___ klingt wie ein doppeltes S.",
          answer: "Eszett",
          hint: "ß — ostré s",
          explanation:
            "Eszett (ß) sa vyslovuje ako dvojité SS. Príklady slov s ß: Straße, heißen, groß."
        },
        {
          sentence: "Wie ist Ihr ___? — Mein ___ ist Jana.",
          answer: "Vorname",
          hint: "krstné meno",
          explanation:
            "'der Vorname' = krstné meno. 'der Familienname' = priezvisko. Na formulároch sa vždy pýtajú na oba: Vorname und Familienname, bitte!"
        },
        {
          sentence: "Das ___ hat 26 Buchstaben plus Umlaute und das Eszett.",
          answer: "Alphabet",
          hint: "abeceda",
          explanation:
            "Nemecká abeceda má 26 základných písmen, k tomu prehlásky ä, ö, ü a ß (Eszett). Spolu 30 znakov."
        },
        {
          sentence: "Jana ___ ihren Namen auf das Formular.",
          answer: "schreibt",
          hint: "písať — er/sie/es forma",
          explanation:
            "'schreiben' = písať. Forma pre er/sie/es je 'schreibt'. Jana schreibt = Jana píše."
        }
      ]
    },
    {
      type: 'wordorder',
      instruction: 'Zoraď slová do správnej nemeckej vety. Pozor na slovosled!',
      sentences: [
        {
          words: ['heißen', 'Wie', 'Sie'],
          correct: 'Wie heißen Sie',
          hint: 'Ako sa voláte?',
          explanation: 'Otázky s otázacím slovom (Wie, Was, Wer...): otázacie slovo + sloveso + podmet. Sloveso vždy na 2. mieste.'
        },
        {
          words: ['Jana', 'Name', 'ist', 'Mein'],
          correct: 'Mein Name ist Jana',
          hint: 'Moje meno je Jana.',
          explanation: 'Základný slovosled: podmet + sloveso + zvyšok. Mein Name (podmet) + ist (sloveso) + Jana.'
        },
        {
          words: ['buchstabieren', 'das', 'Sie', 'Können'],
          correct: 'Können Sie das buchstabieren',
          hint: 'Môžete to nahláskovat?',
          explanation: 'Otázka s modálnym slovesom: modálne sloveso na 1. mieste (Können), podmet (Sie), infinitív (buchstabieren) na konci.'
        },
        {
          words: ['richtig', 'ist', 'Das'],
          correct: 'Das ist richtig',
          hint: 'To je správne.',
          explanation: 'Oznamovacia veta: Das (podmet) + ist (sloveso) + richtig (príslovkové určenie).'
        },
        {
          words: ['Familienname', 'Nováková', 'Ihr', 'ist'],
          correct: 'Ihr Familienname ist Nováková',
          hint: 'Vaše priezvisko je Nováková.',
          explanation: 'Ihr = váš/vaša (formálne). Ihr Familienname (podmet) + ist (sloveso) + Nováková (menná časť prísudku).'
        }
      ]
    },
    {
      type: "listen",
      instruction:
        "Počúvaj nemecké slovo a spoj ho so slovenským prekladom. Venuj pozornosť výslovnosti!",
      questions: [
        { de: 'ja', sk: 'áno' },
        { de: 'kurz', sk: 'krátky' },
        { de: 'lang', sk: 'dlhý' },
        { de: 'der Name', sk: 'meno' },
        { de: 'die Straße', sk: 'ulica' },
        { de: 'das Alphabet', sk: 'abeceda' },
        { de: 'der Buchstabe', sk: 'písmeno' },
        { de: 'buchstabieren', sk: 'hláskovať' }
      ]
    },
    {
      type: 'writing',
      instruction: 'Napíš vety po nemecky — AI skontroluje gramatiku a opraví chyby.',
      prompts: [
        { sk: 'Pozdrav po nemecky (ráno)', hint: 'Guten …' },
        { sk: 'Predstav sa: Volám sa Jana.', hint: 'Ich heiße …' },
        { sk: 'Povedz odkiaľ si: Som zo Slovenska.', hint: 'Ich komme aus …' },
        { sk: 'Ako sa máš? (formálne)', hint: 'Wie geht …' },
        { sk: 'Rozlúč sa: Dovidenia.', hint: 'Auf …' },
      ],
    },
    {
      type: "match",
      instruction:
        "Spoj nemecké slovo s jeho slovenským prekladom. Pozor na výslovnostné pasce!",
      pairs: [
        ["das Alphabet", "abeceda"],
        ["der Umlaut", "prehláska"],
        ["die Aussprache", "výslovnosť"],
        ["der Vorname", "krstné meno"],
        ["der Familienname", "priezvisko"],
        ["das Eszett (ß)", "ostré s"],
        ["buchstabieren", "hláskovať"],
        ["Wie schreibt man das?", "Ako sa to píše?"]
      ]
    },
    {
      type: 'minitext',
      instruction: 'Prečítaj si krátky text o Jane. Potom odpovedaj na otázky.',
      text: 'Jana Nováková kommt aus der Slowakei. Sie arbeitet jetzt in Wien. Am ersten Tag fragt die Rezeptionistin: „Wie heißen Sie?“ Jana antwortet: „Ich heiße Jana Nováková.“ — „Können Sie Ihren Familiennamen buchstabieren?“ — „Ja, natürlich. N-O-V-Á-K-O-V-Á.“ — „Danke! Das ist richtig.“ Jana lächelt. Der erste Tag in Wien beginnt.',
      textSk: 'Jana Nováková pochádza zo Slovenska. Teraz pracuje vo Viedni. V prvý deň sa recepčná pýta: „Ako sa voláte?“ Jana odpovedá: „Volám sa Jana Nováková.“ — „Môžete nahláskovať vaše priezvisko?“ — „Áno, samozrejme. N-O-V-Á-K-O-V-Á.“ — „Ďakujem! To je správne.“ Jana sa usmeva. Prvý deň vo Viedni začína.',
      questions: [
        {
          question: 'Woher kommt Jana Nováková?',
          options: ['Aus Deutschland', 'Aus Österreich', 'Aus der Slowakei', 'Aus Ungarn'],
          answer: 2,
          explanation: 'Der Text sagt: „Jana Nováková kommt aus der Slowakei.“'
        },
        {
          question: 'Was buchstabiert Jana?',
          options: ['Ihren Vornamen', 'Das Wort Wien', 'Ihren Familiennamen', 'Das Alphabet'],
          answer: 2,
          explanation: 'Die Rezeptionistin fragt: „Können Sie Ihren Familiennamen buchstabieren?“ Jana buchstabiert: N-O-V-Á-K-O-V-Á.'
        },
        {
          question: 'Was sagt die Rezeptionistin nach dem Buchstabieren?',
          options: ['"Entschuldigung."', '"Das ist richtig."', '"Wie bitte?"', '"Auf Wiedersehen."'],
          answer: 1,
          explanation: 'Nach dem Buchstabieren sagt die Rezeptionistin: „Das ist richtig.“ — „To je správne.“'
        },
        {
          question: 'Was macht Jana am Ende des Textes?',
          options: ['Sie weint.', 'Sie geht weg.', 'Sie lächelt.', 'Sie schreibt.'],
          answer: 2,
          explanation: '„Jana lächelt“ = Jana sa usmeva. lächeln = usmievat sa. Das ist ein positives Zeichen für den ersten Tag!'
        }
      ]
    },
    {
      type: 'speaking',
      instruction: 'Počúvaj nemeckú vetu (klikni na repročku). Potom hovor nahlas a ohodnoť svoju výslovnosť.',
      phrases: [
        { de: 'Guten Tag!', sk: 'Dobrý deň!', tip: 'Tag = [taːk], konc. G sa vysl. ako K' },
        { de: 'Ich heiße Jana.', sk: 'Volám sa Jana.', tip: 'ei = [ai], ß = SS, heiße = [haɪsə]' },
        { de: 'Wie heißen Sie?', sk: 'Ako sa voláte?', tip: 'W = [v] ako slov. V — nie angličtina!' },
        { de: 'Können Sie das buchstabieren?', sk: 'Môžete to nahláskovať?', tip: 'ö = zaokrúhlené [e], Können = [kœnən]' },
        { de: 'Mein Familienname ist Nováková.', sk: 'Moje priezvisko je Nováková.', tip: 'ie = [iː], Familie = [famiːliə]' },
        { de: 'Das ist richtig. Danke!', sk: 'To je správne. Äakujem!', tip: 'ch v richtig = [ç], Danke = [daŋkə]' }
      ]
    }
  ],

  reviewWords: [],
  lessonNotes:
    "Základ všetkého. Ak Jana zvládne správnu výslovnosť tu, všetky ďalšie lekcie budú jednoduchšie. Kľúčové výslovnostné pravidlá: W=[v], V=[f], Z=[ts], ß=[ss]. Prehlásky ä/ö/ü treba precvičovať dlhodobo. Dôležité slová pre HR scenár: der Vorname (krstné meno), der Familienname (priezvisko), buchstabieren (hláskovať), langsam (pomaly)."
};
