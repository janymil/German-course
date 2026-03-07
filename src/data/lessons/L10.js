export const lesson10 = {
  id: 10,
  week: 2,
  day: 5,
  title: 'Wir sind eine Klasse — Verben im Plural',
  topic: 'Slovesá v množnom čísle (wir, ihr, sie) — zhrnutie 2. týždňa',
  cefr: 'A1',
  xpReward: 25,
  narrativeContext:
    'Es ist Freitag — der letzte Tag der zweiten Woche. Anna sagt: Schreibt eine kurze Vorstellung! Jana schreibt über ihre Familie. Dann liest Jana den Text vor. Die Klasse hört zu.',
  communicativeGoal:
    'Nach dieser Lektion kann ich Verben für alle Personen konjugieren (wir, ihr, sie), mich und meine Familie auf Deutsch vorstellen und die Grammatik aus Woche 2 anwenden.',
  skillFocus: ['grammar', 'speaking', 'vocabulary', 'reading'],

  grammarNotes: [
    {
      rule: 'Množné číslo slovies: Kde sa Nemci rozhodli šetriť námahu',
      explanation: `<p>Množné číslo... my (wir), vy všetci (ihr), oni/Vy formálne (sie/Sie). Tu sa nemecký jazyk z ničoho nič rozhodol, že vám odpustí život. Namiesto troch nových koncoviek sa tu hráme s recykláciou.</p>
<table><thead><tr><th>Kto?</th><th>Forma (na vzore wohnen)</th><th>Zmysel?</th></tr></thead><tbody>
<tr><td><strong>Wir</strong> (my)</td><td>wohn<strong>en</strong></td><td>Je to kópiou základného tvaru (infinitívu). Žiadna námaha!</td></tr>
<tr><td><strong>Ihr</strong> (vy, banda kamarátov)</td><td>wohn<strong>t</strong></td><td>Pozor zrada! Rozhodli sa skopírovať tvar, ktorý patrí <em>"On/Ona" (er/sie)</em>.</td></tr>
<tr><td><strong>Sie / sie</strong> (Vy formálne / Oni)</td><td>wohn<strong>en</strong></td><td>Naspať u infinitívu. Kopírka funguje.</td></tr>
</tbody></table>
<div class="warn-box">⚠️ <strong>Pasca od Profesora:</strong> Študenti milujú lepiť "en" na všetko, čo je v množnom čísle a povedia "Ihr sprechen". Katastrofa! Nezabudnite, že <em>Ihr</em> je zlodej – ukradlo si len písmeno "t" od tretej osoby jednotného čísla. Správne znie tvrdo a krátko: <strong>Ihr sprecht.</strong></div>`,
      examples: [
        { de: 'Wir kommen aus der Slowakei.', sk: 'My pochádzame zo Slovenska.' },
        { de: 'Ihr lernt sehr schnell!', sk: 'Počúvajte vy všetci vzadu, učíte sa rýchlo!', note: 'ihr + -t' },
        { de: 'Sie wohnen in Berlin.', sk: 'Oni bývajú v Berlíne.' },
      ],
      slovakContrastNote: 'Oveľa, ale naozaj oveľa jednoduchšie, než v slovenčine. V slovenčine sa učíte tvary robíte, robia, robíme. V nemčine viete "wir" hneď, ako vidíte holé sloveso s -en.',
    },
    {
      rule: 'Predstavovanie sa: Ja verzus My (Wir-forma)',
      explanation: `<p>Hovoriť o sebe (Ich) už viete s prižmúrením oka aj o polnoci. Ale čo keď sedíte pri pive s polovičkou a chcete predstaviť <em>nás</em> ako tím?</p>
<p>Kľúč slova <strong>Wir</strong> je ten slávny ušetrený infinitív.</p>
<table><thead><tr><th>Sólo štart (Ich)</th><th>Tímový štart (Wir)</th></tr></thead><tbody>
<tr><td>Ich heiße Jana.</td><td><strong>Wir</strong> heiß<strong>en</strong> Jana und Carlos.</td></tr>
<tr><td>Ich wohne in Wien.</td><td><strong>Wir</strong> wohn<strong>en</strong> in Wien.</td></tr>
<tr><td>Ich bin Arzt.</td><td><strong>Wir</strong> <strong>sind</strong> Ärzte. (Pozor na slovo Byť!)</td></tr>
</tbody></table>
<div class="tip-box">💡 <strong>Tip Profesora:</strong> Spoločenské záchranné frázy, s ktorými zniete ako na nemeckej recepcii: <em>"Darf ich mich vorstellen?"</em> (Smiem sa predstaviť?). Ak ste zabudli verbálne rošády, jednoducho sa usmejte a povedzte len: <em>"Ich heiße..."</em></div>`,
      examples: [
        { de: 'Wir sind eine Gruppe aus der Slowakei.', sk: 'Sme skupina zo Slovenska.', note: 'Pozvláštne nepravidelné sind.' },
        { de: 'Meine Mutter wohnt in Bratislava.', sk: 'Moja mama býva v Bratislave.' },
        { de: 'Wie heißt ihr? — Wir heißen Jana und Carlos.', sk: 'Ako sa voláte (vy dvaja tam)? — Voláme sa Jana a Carlos.' },
      ],
      slovakContrastNote: 'V slovenčine si opäť odsekávame jazyk na zložitostiach: "Dovoľte mi, aby som sa predstavil..." zneje oficiálne. V nemčine "Darf ich mich vorstellen?" je priam magická, slušná, bežne akceptovaná a plynulá vec, ktorú je najlepšie nabifliť sa ako jeden ucelený zvukový balík.',
    },
  ],

  vocab: [
    {
      de: 'vorstellen',
      sk: 'predstaviť sa (sich vorstellen)',
      gender: null,
      srsId: 'L10_V01',
      example: 'Ich möchte mich vorstellen. Ich heiße Jana.',
      exampleSk: 'Chcem sa predstaviť. Volám sa Jana.',
      recycledFrom: [],
    },
    {
      de: 'schreiben',
      sk: 'písať',
      gender: null,
      srsId: 'L10_V02',
      example: 'Wir schreiben einen kurzen Text über unsere Familie.',
      exampleSk: 'Píšeme krátky text o našej rodine.',
      recycledFrom: [],
    },
    {
      de: 'lesen',
      sk: 'čítať (⚠️ er/du liest)',
      gender: null,
      srsId: 'L10_V03',
      example: 'Jana liest ihren Text vor der Klasse.',
      exampleSk: 'Jana číta svoj text pred triedou.',
      recycledFrom: [],
    },
    {
      de: 'zuhören',
      sk: 'pozorne počúvať',
      gender: null,
      srsId: 'L10_V04',
      example: 'Die Klasse hört aufmerksam zu.',
      exampleSk: 'Trieda pozorne počúva.',
      recycledFrom: [],
    },
    {
      de: 'lernen',
      sk: 'učiť sa',
      gender: null,
      srsId: 'L10_V05',
      example: 'Wir lernen zusammen Deutsch.',
      exampleSk: 'Učíme sa spolu nemčinu.',
      recycledFrom: [],
    },
    {
      de: 'die Klasse',
      sk: 'trieda / skupina (v kurze)',
      gender: 'F',
      srsId: 'L10_V06',
      example: 'Die Klasse ist sehr nett und international.',
      exampleSk: 'Trieda je veľmi milá a medzinárodná.',
      recycledFrom: [],
    },
    {
      de: 'die Vorstellung',
      sk: 'predstavenie / prezentácia',
      gender: 'F',
      srsId: 'L10_V07',
      example: 'Die Vorstellung von Jana ist sehr gut.',
      exampleSk: 'Janino predstavenie je veľmi dobré.',
      recycledFrom: [],
    },
    {
      de: 'zusammen',
      sk: 'spolu',
      gender: null,
      srsId: 'L10_V08',
      example: 'Wir lernen alle zusammen in der Klasse.',
      exampleSk: 'Všetci sa učíme spolu v triede.',
      recycledFrom: [],
    },
    {
      de: 'alle',
      sk: 'všetci / všetko',
      gender: null,
      srsId: 'L10_V09',
      example: 'Alle in der Klasse sprechen ein bisschen Deutsch.',
      exampleSk: 'Všetci v triede trochu hovoria po nemecky.',
      recycledFrom: [],
    },
    {
      de: 'wir',
      sk: 'my',
      gender: null,
      srsId: 'L10_V10',
      example: 'Wir sind eine internationale Gruppe.',
      exampleSk: 'Sme medzinárodná skupina.',
      recycledFrom: [],
    },
    {
      de: 'ihr',
      sk: 'vy (neformálne, množné číslo)',
      gender: null,
      srsId: 'L10_V11',
      example: 'Woher kommt ihr? Ihr kommt aus vielen Ländern.',
      exampleSk: 'Odkiaľ pochádzate? Pochádzate z mnohých krajín.',
      recycledFrom: [],
    },
    {
      de: 'der Unterricht',
      sk: 'vyučovanie / hodina (vyuč.)',
      gender: 'M',
      srsId: 'L10_V12',
      example: 'Der Unterricht beginnt um neun Uhr.',
      exampleSk: 'Vyučovanie začína o deviatej.',
      recycledFrom: [],
    },
    {
      de: 'der Text',
      sk: 'text',
      gender: 'M',
      srsId: 'L10_V13',
      example: 'Jana liest ihren Text laut vor.',
      exampleSk: 'Jana číta svoj text nahlas.',
      recycledFrom: [],
    },
    {
      de: 'das Plakat',
      sk: 'plagát / tabuľka (na stenu)',
      gender: 'N',
      srsId: 'L10_V14',
      example: 'Wir schreiben unsere Vorstellung auf ein Plakat.',
      exampleSk: 'Píšeme naše predstavenie na plagát.',
      recycledFrom: [],
    },
    {
      de: 'Wir sind...',
      sk: 'Sme... / Nás je...',
      gender: null,
      srsId: 'L10_V15',
      example: 'Wir sind drei in meiner Familie.',
      exampleSk: 'Nás sme traja v rodine.',
      recycledFrom: [],
    },
    {
      de: 'Wie heißt ihr?',
      sk: 'Ako sa voláte? (vy, viacero ľudí)',
      gender: null,
      srsId: 'L10_V16',
      example: 'Wie heißt ihr? — Wir heißen Jana und Carlos.',
      exampleSk: 'Ako sa voláte? — Voláme sa Jana a Carlos.',
      recycledFrom: [],
    },
    {
      de: 'Sie kommen aus...',
      sk: 'Oni pochádzajú z... / Prichádzajú z...',
      gender: null,
      srsId: 'L10_V17',
      example: 'Sie kommen aus verschiedenen Ländern.',
      exampleSk: 'Pochádzajú z rôznych krajín.',
      recycledFrom: [],
    },
    {
      de: 'Wir sprechen Deutsch.',
      sk: 'Hovoríme po nemecky.',
      gender: null,
      srsId: 'L10_V18',
      example: 'In der Klasse sprechen wir alle Deutsch.',
      exampleSk: 'V triede hovoríme všetci po nemecky.',
      recycledFrom: [],
    },
  ],

  exercises: [
    // 1 — FLASHCARD
    {
      type: 'flashcard',
      instruction: 'Lerne die neuen Wörter. Klick auf die Karte, um die Übersetzung zu sehen.',
    },

    // 2 — MATCH
    {
      type: 'match',
      instruction: 'Verbinde die deutschen Wörter mit der slowakischen Übersetzung.',
      pairs: [
        ['vorstellen', 'predstaviť sa'],
        ['schreiben', 'písať'],
        ['lesen', 'čítať'],
        ['zuhören', 'pozorne počúvať'],
        ['lernen', 'učiť sa'],
        ['zusammen', 'spolu'],
        ['alle', 'všetci'],
        ['die Klasse', 'trieda'],
        ['Wie heißt ihr?', 'Ako sa voláte?'],
        ['Wir sprechen Deutsch.', 'Hovoríme po nemecky.'],
      ],
    },

    // 3 — WORDORDER
    {
      type: 'wordorder',
      instruction: 'Bringe die Wörter in die richtige Reihenfolge. Achte auf die Verbform!',
      sentences: [
        {
          words: ['Wir', 'sind', 'drei', 'in', 'meiner', 'Familie'],
          correct: 'Wir sind drei in meiner Familie',
          hint: 'Nás sme traja v rodine.',
          explanation: 'wir + sein → wir sind (koncovka -en, rovnaká ako infinitív). Wir sind = sme.',
        },
        {
          words: ['Ihr', 'wohnt', 'in', 'Deutschland'],
          correct: 'Ihr wohnt in Deutschland',
          hint: 'Vy bývate v Nemecku.',
          explanation: 'ihr + wohnen → ihr wohnt (koncovka -t, rovnaká ako er/sie/es). Pozor: nie "ihr wohnen"!',
        },
        {
          words: ['Sie', 'lernen', 'alle', 'zusammen', 'Deutsch'],
          correct: 'Sie lernen alle zusammen Deutsch',
          hint: 'Všetci sa učia spolu nemčinu.',
          explanation: 'sie (množné číslo) + lernen → sie lernen (koncovka -en, rovnaká ako infinitív).',
        },
        {
          words: ['Meine', 'Mutter', 'wohnt', 'in', 'Bratislava'],
          correct: 'Meine Mutter wohnt in Bratislava',
          hint: 'Moja mama býva v Bratislave.',
          explanation: 'Opakujeme L08: possessívum meine + L06: ich wohne → sie wohnt. Er/sie/es → -t koncovka.',
        },
        {
          words: ['Wir', 'kommen', 'aus', 'der', 'Slowakei'],
          correct: 'Wir kommen aus der Slowakei',
          hint: 'Pochádzame zo Slovenska.',
          explanation: 'wir + kommen → wir kommen (= infinitív). Z L03: kommen aus + dativ die Slowakei → der Slowakei.',
        },
        {
          words: ['Ihr', 'schreibt', 'einen', 'kurzen', 'Text'],
          correct: 'Ihr schreibt einen kurzen Text',
          hint: 'Vy píšete krátky text.',
          explanation: 'ihr + schreiben → ihr schreibt (-t koncovka). Toto je typická chyba: nie "ihr schreiben"!',
        },
      ],
    },

    // 4 — FILL
    {
      type: 'fill',
      instruction: 'Füll die Lücken aus. Wähle die richtige Verbform.',
      questions: [
        {
          sentence: 'Wir ___ aus vielen Ländern.',
          answer: 'kommen',
          hint: 'Pochádzame z mnohých krajín. (wir + kommen)',
          explanation: 'wir + kommen → wir kommen. Koncovka -en = rovnaká ako infinitív.',
        },
        {
          sentence: 'Ihr ___ in München.',
          answer: 'wohnt',
          hint: 'Vy bývate v Mníchove. (ihr + wohnen)',
          explanation: 'ihr + wohnen → ihr wohnt (-t). Pozor: ihr má rovnakú formu ako er/sie/es!',
        },
        {
          sentence: 'Sie ___ alle zusammen Deutsch.',
          answer: 'lernen',
          hint: 'Všetci sa učia spolu nemčinu. (sie plural + lernen)',
          explanation: 'sie (plural) + lernen → sie lernen (-en = infinitív).',
        },
        {
          sentence: '___ Schwester heißt Eva.',
          answer: 'Meine',
          hint: 'Moja sestra sa volá Eva. (possessívum pre ženský rod)',
          explanation: 'Opakujeme L08: mein/meine. Die Schwester → ženský rod → meine (nie mein).',
        },
        {
          sentence: 'Wir ___ eine internationale Gruppe.',
          answer: 'sind',
          hint: 'Sme medzinárodná skupina. (wir + sein)',
          explanation: 'Nepravidelné sloveso sein: wir sind. Toto treba naučiť naspamäť!',
        },
        {
          sentence: 'Haben Sie Geschwister? — Ja, ich ___ zwei Schwestern.',
          answer: 'habe',
          hint: 'Áno, mám dve sestry. (ich + haben — opakujeme L07)',
          explanation: 'Opakujeme L07: ich + haben → ich habe. Pravidelná koncovka -e.',
        },
        {
          sentence: 'Woher kommt ___? Wir kommen aus Spanien.',
          answer: 'ihr',
          hint: 'Odkiaľ pochádzate? — zámenno pre vy (neformálne)',
          explanation: 'Na otázku skupiny ľudí používame ihr. Ihr = neformálne množné číslo od du.',
        },
        {
          sentence: 'Carlos und Jana ___ in Wien.',
          answer: 'wohnen',
          hint: 'Carlos a Jana bývajú vo Viedni. (sie plural + wohnen)',
          explanation: 'Keď sú subjektom dve mená (Carlos und Jana) = sie plural → wohnen (-en).',
        },
      ],
    },

    // 5 — LISTEN
    {
      type: 'listen',
      instruction: 'Hör zu und schreib das deutsche Wort oder die Phrase.',
      questions: [
        { de: 'wir', sk: 'my' },
        { de: 'ihr', sk: 'vy (viacero ľudí)' },
        { de: 'lernen', sk: 'učiť sa' },
        { de: 'schreiben', sk: 'písať' },
        { de: 'zuhören', sk: 'pozorne počúvať' },
        { de: 'die Klasse', sk: 'trieda' },
        { de: 'zusammen', sk: 'spolu' },
        { de: 'Wir sind drei in meiner Familie.', sk: 'Nás sme traja v rodine.' },
        { de: 'Wie heißt ihr?', sk: 'Ako sa voláte?' },
        { de: 'Sie lernen alle zusammen Deutsch.', sk: 'Všetci sa učia spolu nemčinu.' },
      ],
    },

    // 6 — MCQ
    {
      type: 'mcq',
      instruction: 'Wähle die richtige Antwort.',
      questions: [
        {
          question: 'Wie lautet die richtige Form? "Ihr ___ in Wien."',
          options: ['wohnen', 'wohnst', 'wohnt', 'wohne'],
          answer: 2,
          explanation: 'ihr + wohnen → ihr wohnt (-t). Ihr má rovnakú formu ako er/sie/es. Časté chyby: "ihr wohnen" (nesprávne!) alebo "ihr wohnst" (to je du).',
        },
        {
          question: 'Was bedeutet "Wir sind eine Klasse"?',
          options: ['Ja sme trieda.', 'Vy ste trieda.', 'Oni sú trieda.', 'Ona je trieda.'],
          answer: 0,
          explanation: 'wir = my → Wir sind = sme. Nepravidelné sloveso sein: ich bin, du bist, er ist, wir sind, ihr seid, sie sind.',
        },
        {
          question: 'Welche Form ist korrekt? "Sie (sie plural) ___ aus Deutschland."',
          options: ['kommt', 'kommst', 'kommen', 'komme'],
          answer: 2,
          explanation: 'sie (plural) + kommen → sie kommen (-en = rovnaká ako infinitív). Nezamieňať s er/sie(singular) kommt (-t).',
        },
        {
          question: 'Jana fragt die ganze Gruppe: "Wie ___ ihr?"',
          options: ['heißt', 'heiße', 'heißen', 'heißen wir'],
          answer: 0,
          explanation: 'ihr + heißen → ihr heißt (-t). Správna otázka: "Wie heißt ihr?" = "Ako sa voláte (vy všetci)?"',
        },
        {
          question: 'L07 opakujeme: "Ich ___ zwei Brüder und eine Schwester." (haben)',
          options: ['hast', 'habt', 'haben', 'habe'],
          answer: 3,
          explanation: 'Opakujeme L07: ich + haben → ich habe. Pravidelné -e pre prvú osobu jednotného čísla.',
        },
        {
          question: 'L08 opakujeme: "___ Vater ist Ingenieur." (mein oder meine?)',
          options: ['meine', 'mein', 'meiner', 'meinen'],
          answer: 1,
          explanation: 'Opakujeme L08: possessívum mein/meine. Der Vater → mužský rod → mein (nie meine).',
        },
        {
          question: 'Was ist die wir-Form von "lernen"?',
          options: ['lernt', 'lernst', 'lernen', 'lerne'],
          answer: 2,
          explanation: 'wir + lernen → wir lernen. Pravidlo: wir-forma = infinitív (s koncovkou -en).',
        },
        {
          question: 'Wie sagt man auf Deutsch: "Všetci sa učia spolu."',
          options: ['Alle lernt zusammen.', 'Alle lernst zusammen.', 'Alle lernen zusammen.', 'Alle lerne zusammen.'],
          answer: 2,
          explanation: 'alle (všetci) = plurálový subjekt → lernen (-en). Alle lernen zusammen = sie (plural) lernen.',
        },
      ],
    },

    // 7 — MINITEXT
    {
      type: 'minitext',
      instruction: 'Lies den Text und beantworte die Fragen.',
      text:
        'Jana steht vor der Klasse. Sie liest ihren Text: "Wir sind drei in meiner Familie. Meine Mutter heißt Eva. Sie wohnt in Bratislava. Mein Vater ist Ingenieur. Ich bin in Wien." Die Klasse applaudiert. Anna sagt: "Sehr gut, Jana!" Dann liest Carlos: "Wir kommen aus Spanien. Ihr seid alle sehr nett!" Alle lachen zusammen.',
      textSk:
        'Jana stojí pred triedou. Číta svoj text: „Nás sme traja v rodine. Moja mama sa volá Eva. Býva v Bratislave. Môj otec je inžinier. Ja som vo Viedni." Trieda tlieskala. Anna hovorí: „Veľmi dobre, Jana!" Potom číta Carlos: „Pochádzame zo Španielska. Vy ste všetci veľmi milí!" Všetci sa smejú spolu.',
      questions: [
        {
          question: 'Wie viele Personen sind in Janas Familie?',
          options: ['zwei', 'drei', 'vier', 'fünf'],
          answer: 1,
          explanation: '"Wir sind drei in meiner Familie." — Jana hovorí, že sú traja (drei) v rodine.',
        },
        {
          question: 'Wo wohnt Janas Mutter?',
          options: ['in Wien', 'in Berlin', 'in Bratislava', 'in Spanien'],
          answer: 2,
          explanation: '"Meine Mutter heißt Eva. Sie wohnt in Bratislava." — Janas mama býva v Bratislave.',
        },
        {
          question: 'Was ist Janas Vater von Beruf?',
          options: ['Lehrer', 'Arzt', 'Ingenieur', 'Student'],
          answer: 2,
          explanation: '"Mein Vater ist Ingenieur." — Janin otec je inžinier.',
        },
        {
          question: 'Woher kommt Carlos?',
          options: ['aus Deutschland', 'aus Österreich', 'aus der Slowakei', 'aus Spanien'],
          answer: 3,
          explanation: '"Wir kommen aus Spanien." — Carlos hovorí, že pochádzajú zo Španielska.',
        },
        {
          question: 'Was sagt Anna zu Jana?',
          options: ['"Sehr gut, Jana!"', '"Danke, Jana!"', '"Bitte, Jana!"', '"Hallo, Jana!"'],
          answer: 0,
          explanation: '"Anna sagt: Sehr gut, Jana!" — Anna pochváli Janu slovami "Sehr gut!"',
        },
      ],
    },

    // 8 — SPEAKING
    {
      type: 'speaking',
      instruction: 'Übe die Aussprache. Hör zu und sprich nach.',
      phrases: [
        {
          de: 'Wir sind drei in meiner Familie.',
          sk: 'Nás sme traja v rodine.',
          tip: 'Wir=[viːr], drei=[draɪ̯], Familie=[faˈmiːliə]',
        },
        {
          de: 'Meine Mutter wohnt in Bratislava.',
          sk: 'Moja mama býva v Bratislave.',
          tip: 'Mutter=[ˈmʊtər], wohnt=[voːnt] — W ako V!',
        },
        {
          de: 'Wie heißt ihr?',
          sk: 'Ako sa voláte?',
          tip: 'heißt=[haɪ̯st] — ei=[aɪ̯], ß=[s]',
        },
        {
          de: 'Sie kommen aus Deutschland.',
          sk: 'Oni pochádzajú z Nemecka.',
          tip: 'Deutschland=[ˈdɔɪ̯tʃlant] — eu=[ɔɪ̯]',
        },
        {
          de: 'Wir lernen zusammen Deutsch.',
          sk: 'Učíme sa spolu nemčinu.',
          tip: 'zusammen=[tsuˈzamən] — z=[ts]!',
        },
        {
          de: 'Darf ich mich vorstellen?',
          sk: 'Smiem sa predstaviť?',
          tip: 'Darf=[darf], vorstellen=[ˈfoːɐ̯ʃtɛlən]',
        },
        {
          de: 'Ihr wohnt in Deutschland.',
          sk: 'Vy bývate v Nemecku.',
          tip: 'wohnt=[voːnt] — W=V, -t koncovka pre ihr',
        },
        {
          de: 'Alle hören zusammen zu.',
          sk: 'Všetci spolu počúvajú.',
          tip: 'hören=[ˈhøːrən] — ö=[ø], zu=[tsuː] na konci!',
        },
      ],
    },

    // 9 — TRUEFALSE
    {
      type: 'truefalse',
      instruction: 'Stimmt das oder stimmt das nicht? Wahr oder falsch?',
      statements: [
        {
          statement: 'Die wir-Form von "wohnen" ist "wohnen" (= Infinitiv).',
          isTrue: true,
          explanation: 'Áno! wir + wohnen → wir wohnen. Wir-forma = infinitív. Rovnako: wir lernen, wir kommen atď.',
        },
        {
          statement: 'Die ihr-Form von "lernen" ist "ihr lernen".',
          isTrue: false,
          explanation: 'Nie! ihr + lernen → ihr lernt (-t koncovka, rovnaká ako er/sie/es). "ihr lernen" je nesprávne!',
        },
        {
          statement: '"Sie kommen" kann Plural (sie = they) ODER höfliche Form (Sie = formal you) sein.',
          isTrue: true,
          explanation: 'Správne! V nemčine sú tieto formy totožné. Sie kommen = oni prichádzajú / Vy prichádzate (formálne). Rozlišuje kontext.',
        },
        {
          statement: 'Im Deutschen sagt man "Ich habe Hunger" ohne Artikel.',
          isTrue: true,
          explanation: 'Áno! Hunger a Durst sa v tejto fráze používajú BEZ členu: Ich habe Hunger, Ich habe Durst. (Opakujeme z L07: haben.)',
        },
        {
          statement: 'Die ihr-Form hat die Endung -en, wie der Infinitiv.',
          isTrue: false,
          explanation: 'Nie! ihr má koncovku -t (ihr wohnt, ihr lernt, ihr kommt). Len wir a sie/Sie majú -en (= infinitív). Ihr = -t!',
        },
        {
          statement: '"Wir sprechen Deutsch" bedeutet "Hovoríme po nemecky."',
          isTrue: true,
          explanation: 'Správne! wir sprechen = hovoríme. sprechen sa v tejto lekcii opakuje ako wir-forma.',
        },
      ],
    },

    // 10 — DICTATION
    {
      type: 'dictation',
      instruction: 'Hör zu und schreib den Satz.',
      sentences: [
        {
          de: 'Wir lernen Deutsch.',
          sk: 'Učíme sa nemčinu.',
        },
        {
          de: 'Ihr wohnt in Wien.',
          sk: 'Vy bývate vo Viedni.',
        },
        {
          de: 'Sie kommen aus vielen Ländern.',
          sk: 'Pochádzajú z mnohých krajín.',
        },
        {
          de: 'Meine Mutter heißt Eva.',
          sk: 'Moja mama sa volá Eva.',
        },
        {
          de: 'Wir sind drei in meiner Familie.',
          sk: 'Nás sme traja v rodine.',
        },
        {
          de: 'Alle hören aufmerksam zu.',
          sk: 'Všetci pozorne počúvajú.',
        },
      ],
    },

    // 11 — CATEGORYSORT
    {
      type: 'categorysort',
      instruction: 'Sortiere die Verbformen in die richtige Kategorie.',
      categories: [
        {
          name: 'ich / du / er, sie, es (Singular)',
          items: ['ich wohne', 'du wohnst', 'er wohnt', 'ich lerne', 'du lernst', 'sie kommt'],
        },
        {
          name: 'wir / sie, Sie (Plural = Infinitiv)',
          items: ['wir wohnen', 'sie lernen', 'wir kommen', 'Sie wohnen', 'wir schreiben', 'sie hören zu'],
        },
        {
          name: 'ihr (Plural = -t wie er/sie/es)',
          items: ['ihr wohnt', 'ihr lernt', 'ihr kommt', 'ihr schreibt', 'ihr hört zu', 'ihr seid'],
        },
      ],
    },

    // 12 — TRANSLATION
    {
      type: 'translation',
      instruction: 'Übersetz die Sätze ins Deutsche.',
      prompts: [
        {
          sk: 'Učíme sa spolu nemčinu.',
          hint: 'Wir lernen ...',
          answer: 'Wir lernen zusammen Deutsch.',
        },
        {
          sk: 'Odkiaľ pochádzate (vy — viacero ľudí)?',
          hint: 'Woher kommt ...',
          answer: 'Woher kommt ihr?',
        },
        {
          sk: 'Oni bývajú v Berlíne.',
          hint: 'Sie wohnen ...',
          answer: 'Sie wohnen in Berlin.',
        },
        {
          sk: 'Moja sestra má dvadsať rokov.',
          hint: 'Meine Schwester ist ...',
          answer: 'Meine Schwester ist zwanzig Jahre alt.',
        },
        {
          sk: 'Všetci v triede hovoríme po nemecky.',
          hint: 'Wir alle ...',
          answer: 'Wir alle sprechen Deutsch in der Klasse.',
        },
      ],
    },

    // 13 — CONJUGATION
    {
      type: 'conjugation',
      instruction: 'Konjugiere die Verben. Füll alle Formen aus.',
      verbs: [
        {
          infinitive: 'wohnen',
          meaning: 'bývať',
          note: 'Pravidelné sloveso — vzorové pre celú tabuľku',
          forms: [
            { pronoun: 'ich', form: 'wohne' },
            { pronoun: 'du', form: 'wohnst' },
            { pronoun: 'er / sie / es', form: 'wohnt' },
            { pronoun: 'wir', form: 'wohnen' },
            { pronoun: 'ihr', form: 'wohnt' },
            { pronoun: 'sie / Sie', form: 'wohnen' },
          ],
        },
        {
          infinitive: 'lernen',
          meaning: 'učiť sa',
          note: 'Pravidelné sloveso — procvičenie novej látky',
          forms: [
            { pronoun: 'ich', form: 'lerne' },
            { pronoun: 'du', form: 'lernst' },
            { pronoun: 'er / sie / es', form: 'lernt' },
            { pronoun: 'wir', form: 'lernen' },
            { pronoun: 'ihr', form: 'lernt' },
            { pronoun: 'sie / Sie', form: 'lernen' },
          ],
        },
        {
          infinitive: 'sein',
          meaning: 'byť',
          note: '⚠️ Nepravidelné — TREBA SA NAUČIŤ NASPAMÄŤ',
          forms: [
            { pronoun: 'ich', form: 'bin' },
            { pronoun: 'du', form: 'bist' },
            { pronoun: 'er / sie / es', form: 'ist' },
            { pronoun: 'wir', form: 'sind' },
            { pronoun: 'ihr', form: 'seid' },
            { pronoun: 'sie / Sie', form: 'sind' },
          ],
        },
      ],
    },
  ],

  reviewWords: ['L07_V12', 'L08_V01', 'L09_V01'],

  lessonNotes:
    'Lekcia L10 završuje 2. týždeň kurzu. Jana sa naučila kompletné časovanie pravidelných slovies vo všetkých šiestich osobách — vrátane plurálových foriem wir, ihr a sie. Kľúčové pravidlo: wir a sie/Sie majú formu rovnakú ako infinitív (-en), kým ihr má formu rovnakú ako er/sie/es (-t). Sloveso sein (byť) je nepravidelné a treba ho naučiť naspamäť: wir sind, ihr seid, sie sind. Po 2. týždni vieš predstaviť seba aj svoju rodinu, opísať bydlisko, povedať čísla 0–100 a použiť possesívne zámená mein/meine a dein/deine.',
};
