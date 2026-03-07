export const lesson07 = {
  id: 7,
  week: 2,
  day: 2,
  title: 'Die Familie  Verwandte und haben',
  topic: 'Rodinní príslušníci a sloveso haben (mať)',
  cefr: 'A1',
  xpReward: 20,
  narrativeContext: 'Es ist Sonntag. Jana sitzt in ihrem Zimmer und telefoniert mit ihrer Mutter. Sie beschreibt ihre Mitschüler: Petra, Carlos und Anna. Jana und ihre Mutter reden über Familie.',
  communicativeGoal: 'Nach dieser Lektion kann ich Familienmitglieder auf Deutsch nennen, das Verb haben in allen Personen konjugieren und über meine Familie sprechen.',
  skillFocus: ['vocabulary', 'grammar', 'speaking', 'listening'],

  grammarNotes: [
    {
      rule: 'Sloveso „haben“ (mať) a jeho malá zrada v kmeni',
      explanation: `<p>Sloveso <strong>haben</strong> (mať) patrí medzi úplné základy jazyka, no pre študentov skrýva jednu malú pascu. Všimnite si pozorne tvar pre "du" a "er/sie".</p>
<p>Kým logicky by hlava chcela povedať "du habst", nemčina na zjednodušenie výslovnosti to <strong>„b"</strong> úplne vymazala z existencie.</p>
<table><thead><tr><th>Osoba</th><th>Forma</th><th>Čo sa deje v pozadí</th></tr></thead><tbody>
<tr><td>ich</td><td><strong>habe</strong></td><td>Pravidelné, všetko je v poriadku.</td></tr>
<tr><td>du</td><td><strong>hast</strong></td><td>BUM! „b" zmizlo. Žiadne habst!</td></tr>
<tr><td>er / sie</td><td><strong>hat</strong></td><td>BUM! Znova bez „b". Žiadne habt!</td></tr>
<tr><td>wir</td><td><strong>haben</strong></td><td>A sme späť v starých, pravidelných koľajach.</td></tr>
</tbody></table>
<div class="warn-box">⚠️ <strong>Varovanie od Profesora:</strong> Keď začujete študenta povedať "er habt", Nemcovi to v ušiach doslova "zaškrípe". Zafixujte si <strong>du hast</strong> a <strong>er hat</strong> tak tvrdo, aby ste nad tým nemuseli premýšľať.</div>`,
      examples: [
        { de: 'Ich habe eine Schwester.', sk: 'Mám sestru.' },
        { de: 'Du hast einen Bruder.', sk: 'Máš brata.', note: 'hast, nie habst!' },
        { de: 'Er hat keine Kinder.', sk: 'Nemá deti.', note: 'hat, nie habt!' },
      ],
      slovakContrastNote: 'V slovenčine povieme pekne pravidelne mám, máš, má (všetky vychádzajú z rovnakého kmeňa). V nemčine "haben" stráca vo svojom srdci písmeno "b" pri 2. a 3. osobe (ty máš, on má).',
    },
    {
      rule: 'Rodina a nepredvídateľné rody (der, die, das)',
      explanation: `<p>Môj najobľúbenejší mýtus v nemčine: <em>Zakončenie slova nám vždy prezradí jeho rod.</em> Omyl! Pri členoch rodiny sa ukazuje pravá, trochu rozmarná povaha nemeckého rodu.</p>
<p>Dobrá správa: Matka je ženská, Otec je mužský.</p>
<table><thead><tr><th>Mužský rod (der)</th><th>Ženský rod (die)</th></tr></thead><tbody>
<tr><td>der Vater (otec)</td><td>die Mutter (matka)</td></tr>
<tr><td>der Bruder (brat)</td><td>die Schwester (sestra)</td></tr>
<tr><td>der Sohn (syn)</td><td>die Tochter (dcéra)</td></tr>
</tbody></table>
<p>Zvláštnosti nastávajú napríklad pri slove <strong>das Kind</strong> (dieťa). Nemčina klasifikuje dieťa ako stredný rod (to dieťa), kým nezíska špecifikáciu syn alebo dcéra.</p>
<p>A niektoré slová sú exkluzívne hromadné (len v množnom čísle): <strong>die Eltern</strong> (rodičia), <strong>die Geschwister</strong> (súrodenci).</p>
<div class="tip-box">💡 <strong>Hack od Profesora:</strong> Slovo „Geschwister“ (súrodenci) pripomína sloveso alebo pomenovanie len pre sestry (Schwester). Ale je to komplexný blok – patria sem bratia AJ sestry dokopy.</div>`,
      examples: [
        { de: 'Der Vater heißt Klaus.', sk: 'Otec sa volá Klaus.' },
        { de: 'Das Kind hat keine Geschwister.', sk: 'Dieťa nemá súrodencov.' },
        { de: 'Die Eltern wohnen in Wien.', sk: 'Rodičia bývajú vo Viedni.' },
      ],
      slovakContrastNote: 'Okrem faktu, že sa musíte učiť člen so samotným slovom, dajte si pozor na "súrodencov". V slovenčine máme slovo brat a od neho odvodených súro-dencov. Nemčina prevzala koreň zo slova sestra (Schwester -> Geschwister).',
    },
  ],

  vocab: [
    {
      de: 'die Mutter',
      sk: 'matka',
      gender: 'F',
      srsId: 'L07_V01',
      example: 'Meine Mutter heißt Eva.',
      exampleSk: 'Moja matka sa volá Eva.',
      recycledFrom: [],
    },
    {
      de: 'der Vater',
      sk: 'otec',
      gender: 'M',
      srsId: 'L07_V02',
      example: 'Mein Vater ist Lehrer.',
      exampleSk: 'Môj otec je učiteľ.',
      recycledFrom: [],
    },
    {
      de: 'der Bruder',
      sk: 'brat',
      gender: 'M',
      srsId: 'L07_V03',
      example: 'Mein Bruder heißt Thomas.',
      exampleSk: 'Môj brat sa volá Thomas.',
      recycledFrom: [],
    },
    {
      de: 'die Schwester',
      sk: 'sestra',
      gender: 'F',
      srsId: 'L07_V04',
      example: 'Meine Schwester ist sehr nett.',
      exampleSk: 'Moja sestra je veľmi milá.',
      recycledFrom: [],
    },
    {
      de: 'der Sohn',
      sk: 'syn',
      gender: 'M',
      srsId: 'L07_V05',
      example: 'Der Sohn ist zehn Jahre alt.',
      exampleSk: 'Syn má desať rokov.',
      recycledFrom: [],
    },
    {
      de: 'die Tochter',
      sk: 'dcéra',
      gender: 'F',
      srsId: 'L07_V06',
      example: 'Die Tochter wohnt in Berlin.',
      exampleSk: 'Dcéra býva v Berlíne.',
      recycledFrom: [],
    },
    {
      de: 'die Eltern',
      sk: 'rodičia',
      gender: null,
      srsId: 'L07_V07',
      example: 'Meine Eltern wohnen in Bratislava.',
      exampleSk: 'Moji rodičia bývajú v Bratislave.',
      recycledFrom: [],
    },
    {
      de: 'die Geschwister',
      sk: 'súrodenci',
      gender: null,
      srsId: 'L07_V08',
      example: 'Ich habe keine Geschwister.',
      exampleSk: 'Nemám súrodencov.',
      recycledFrom: [],
    },
    {
      de: 'das Kind',
      sk: 'dieťa',
      gender: 'N',
      srsId: 'L07_V09',
      example: 'Das Kind ist drei Jahre alt.',
      exampleSk: 'Dieťa má tri roky.',
      recycledFrom: [],
    },
    {
      de: 'die Kinder',
      sk: 'deti',
      gender: null,
      srsId: 'L07_V10',
      example: 'Carlos hat zwei Kinder.',
      exampleSk: 'Carlos má dve deti.',
      recycledFrom: [],
    },
    {
      de: 'die Familie',
      sk: 'rodina',
      gender: 'F',
      srsId: 'L07_V11',
      example: 'Meine Familie ist klein.',
      exampleSk: 'Moja rodina je malá.',
      recycledFrom: [],
    },
    {
      de: 'der Mann',
      sk: 'manžel / muž',
      gender: 'M',
      srsId: 'L07_V12',
      example: 'Ihr Mann heißt Peter.',
      exampleSk: 'Jej manžel sa volá Peter.',
      recycledFrom: [],
    },
    {
      de: 'die Frau',
      sk: 'manželka / žena',
      gender: 'F',
      srsId: 'L07_V13',
      example: 'Seine Frau ist Köchin.',
      exampleSk: 'Jeho manželka je kuchárka.',
      recycledFrom: [],
    },
    {
      de: 'der Großvater',
      sk: 'starý otec / dedko',
      gender: 'M',
      srsId: 'L07_V14',
      example: 'Mein Großvater ist 78 Jahre alt.',
      exampleSk: 'Môj starý otec má 78 rokov.',
      recycledFrom: [],
    },
    {
      de: 'die Großmutter',
      sk: 'stará matka / babička',
      gender: 'F',
      srsId: 'L07_V15',
      example: 'Meine Großmutter kocht sehr gut.',
      exampleSk: 'Moja stará mama varí veľmi dobre.',
      recycledFrom: [],
    },
    {
      de: 'haben',
      sk: 'mať',
      gender: null,
      srsId: 'L07_V16',
      example: 'Ich habe einen Bruder und eine Schwester.',
      exampleSk: 'Mám brata a sestru.',
      recycledFrom: [],
    },
    {
      de: 'Ich habe einen Bruder.',
      sk: 'Mám brata.',
      gender: null,
      srsId: 'L07_V17',
      example: 'Ich habe einen Bruder und eine Schwester.',
      exampleSk: 'Mám brata a sestru.',
      recycledFrom: [],
    },
    {
      de: 'Hast du Geschwister?',
      sk: 'Máš súrodencov?',
      gender: null,
      srsId: 'L07_V18',
      example: 'Hast du Geschwister?  Nein, ich habe keine Geschwister.',
      exampleSk: 'Máš súrodencov?  Nie, nemám súrodencov.',
      recycledFrom: [],
    },
    {
      de: 'Das ist mein Vater.',
      sk: 'To je môj otec.',
      gender: null,
      srsId: 'L07_V19',
      example: 'Das ist mein Vater. Er heißt Klaus.',
      exampleSk: 'To je môj otec. Volá sa Klaus.',
      recycledFrom: [],
    },
  ],

  exercises: [
    {
      type: 'flashcard',
      instruction: 'Lerne die Vokabeln. Drehe die Karte, um die Übersetzung zu sehen.',
    },

    {
      type: 'match',
      instruction: 'Verbinde die deutschen Wörter mit der slowakischen Übersetzung.',
      pairs: [
        ['die Mutter', 'matka'],
        ['der Vater', 'otec'],
        ['der Bruder', 'brat'],
        ['die Schwester', 'sestra'],
        ['der Sohn', 'syn'],
        ['die Tochter', 'dcéra'],
        ['die Eltern', 'rodičia'],
        ['die Geschwister', 'súrodenci'],
        ['das Kind', 'dieťa'],
        ['die Familie', 'rodina'],
      ],
    },

    {
      type: 'wordorder',
      instruction: 'Forme richtige Sätze mit "haben". Achte auf die Konjugation!',
      sentences: [
        {
          words: ['ich', 'habe', 'eine', 'Schwester'],
          correct: 'ich habe eine Schwester',
          hint: 'Mám sestru.',
          explanation: 'Ich habe: prvá osoba jednotného čísla od "haben". Základný tvar je zachovaný.',
        },
        {
          words: ['du', 'hast', 'zwei', 'Brüder'],
          correct: 'du hast zwei Brüder',
          hint: 'Máš dvoch bratov.',
          explanation: 'Du hast: druhá osoba jednotného čísla. Pozor  nie "du habst"! Tvar "hast" je nepravidelný.',
        },
        {
          words: ['er', 'hat', 'keine', 'Kinder'],
          correct: 'er hat keine Kinder',
          hint: 'Nemá deti.',
          explanation: 'Er hat: tretia osoba jednotného čísla. Pozor  nie "er habt"! Tvar "hat" je tiež nepravidelný.',
        },
        {
          words: ['wir', 'haben', 'eine', 'große', 'Familie'],
          correct: 'wir haben eine große Familie',
          hint: 'Máme veľkú rodinu.',
          explanation: 'Wir haben: prvá osoba množného čísla. Rovnaký tvar ako infinitív  "haben".',
        },
        {
          words: ['habt', 'ihr', 'Geschwister'],
          correct: 'habt ihr Geschwister',
          hint: 'Máte súrodencov?',
          explanation: 'Otázka s ihr habt: sloveso stojí na prvom mieste v otázke. Ihr habt je druhá osoba množného čísla.',
        },
        {
          words: ['sie', 'haben', 'drei', 'Kinder'],
          correct: 'sie haben drei Kinder',
          hint: 'Majú tri deti.',
          explanation: 'Sie haben: tretia osoba množného čísla. Rovnaký tvar ako wir haben a infinitív.',
        },
      ],
    },

    {
      type: 'fill',
      instruction: 'Ergänze die Lücken mit der richtigen Form von "haben" oder dem passenden Wort.',
      questions: [
        {
          sentence: 'Ich ___ eine Schwester und einen Bruder.',
          answer: 'habe',
          hint: 'prvá osoba: ich ',
          explanation: '"Ich habe"  prvá osoba jednotného čísla od haben. Základný tvar je zachovaný.',
        },
        {
          sentence: 'Du ___ zwei Brüder, oder?',
          answer: 'hast',
          hint: 'druhá osoba: du ',
          explanation: '"Du hast"  druhá osoba jednotného čísla. Nepravidelný tvar  nie "du habst".',
        },
        {
          sentence: 'Carlos ___ zwei Kinder.',
          answer: 'hat',
          hint: 'tretia osoba: er/sie/es ',
          explanation: '"Er hat"  tretia osoba jednotného čísla. Nepravidelný tvar  nie "er habt".',
        },
        {
          sentence: 'Wir ___ keine Geschwister.',
          answer: 'haben',
          hint: 'prvá osoba množného čísla: wir ',
          explanation: '"Wir haben"  prvá osoba množného čísla. Rovnaká forma ako infinitív.',
        },
        {
          sentence: 'Ihr ___ einen Sohn.',
          answer: 'habt',
          hint: 'druhá osoba množného čísla: ihr ',
          explanation: '"Ihr habt"  druhá osoba množného čísla od haben.',
        },
        {
          sentence: 'Meine Eltern ___ in Wien.',
          answer: 'wohnen',
          hint: 'kde bývajú? (L06: wohnen)',
          explanation: 'Spirálová gramatika z L06: "wohnen" (bývať)  tretia osoba množného čísla je "wohnen". Die Eltern sú plurál.',
        },
        {
          sentence: 'Ich ___ Studentin.',
          answer: 'bin',
          hint: 'profesia: ich  (sloveso sein)',
          explanation: 'Spirálová gramatika z L01: "sein" (byť)  ich bin. Hovoríme "Ich bin Studentin." (bez člena pri povolaní).',
        },
        {
          sentence: '___ du Geschwister?',
          answer: 'Hast',
          hint: 'otázka o súrodencoch',
          explanation: '"Hast du Geschwister?"  otázka začína slovesom. Du  hast. Na začiatku vety sa píše s veľkým H.',
        },
      ],
    },

    {
      type: 'listen',
      instruction: 'Höre und tippe das deutsche Wort oder den Satz.',
      questions: [
        { de: 'die Mutter', sk: 'matka' },
        { de: 'der Vater', sk: 'otec' },
        { de: 'der Bruder', sk: 'brat' },
        { de: 'die Schwester', sk: 'sestra' },
        { de: 'das Kind', sk: 'dieťa' },
        { de: 'die Familie', sk: 'rodina' },
        { de: 'die Geschwister', sk: 'súrodenci' },
        { de: 'Ich habe eine Schwester.', sk: 'Mám sestru.' },
        { de: 'Er hat keine Kinder.', sk: 'Nemá deti.' },
        { de: 'Hast du Geschwister?', sk: 'Máš súrodencov?' },
      ],
    },

    {
      type: 'mcq',
      instruction: 'Wähle die richtige Antwort.',
      questions: [
        {
          question: 'Welche Form ist richtig? "Du ___ einen Bruder."',
          options: ['habst', 'habt', 'hast', 'haben'],
          answer: 2,
          explanation: '"Du hast"  druhá osoba jednotného čísla od haben je "hast". Forma "habst" neexistuje.',
        },
        {
          question: 'Welche Form ist richtig? "Er ___ zwei Kinder."',
          options: ['haben', 'habt', 'habst', 'hat'],
          answer: 3,
          explanation: '"Er hat"  tretia osoba jednotného čísla od haben je "hat". Forma "er habt" neexistuje.',
        },
        {
          question: 'Was bedeutet "die Geschwister"?',
          options: ['rodičia', 'deti', 'súrodenci', 'starí rodičia'],
          answer: 2,
          explanation: '"Die Geschwister" znamená "súrodenci"  toto slovo existuje len v pluráli a označuje bratov a sestry.',
        },
        {
          question: 'Was ist das Gegenteil von "der Bruder"?',
          options: ['die Tochter', 'die Schwester', 'die Mutter', 'die Frau'],
          answer: 1,
          explanation: 'Opak mužského "der Bruder" (brat) je ženský "die Schwester" (sestra). Ide o klasický rodinný pár.',
        },
        {
          question: '"Meine Eltern ___ ein Haus in Bratislava." Was kommt in die Lücke?',
          options: ['hat', 'habt', 'habe', 'haben'],
          answer: 3,
          explanation: '"Die Eltern" je plurál, správna forma je "haben". Nikdy "hat" (singulár) ani "habt" (ihr).',
        },
        {
          question: 'Welches Wort hat den Artikel "das"?',
          options: ['Bruder', 'Mutter', 'Kind', 'Familie'],
          answer: 2,
          explanation: '"das Kind"  stredný rod (neutrum). Der Bruder (M), die Mutter (F), die Familie (F).',
        },
        {
          question: 'Spirálová gramatika (L06): Wie sagt man "Kde bývaš?" auf Deutsch?',
          options: ['Wo arbeitest du?', 'Wo wohnst du?', 'Wo heißt du?', 'Wie wohnst du?'],
          answer: 1,
          explanation: '"Wo wohnst du?" pochádza z L06  wohnen (bývať) + W-otázka "wo" (kde). Nie "wie" (ako).',
        },
        {
          question: 'Ich ___ keine Geschwister. Wähle die richtige Form.',
          options: ['hat', 'hast', 'haben', 'habe'],
          answer: 3,
          explanation: '"Ich habe"  prvá osoba jednotného čísla od haben. "Habe" je pravidelná forma.',
        },
      ],
    },

    {
      type: 'minitext',
      instruction: 'Lies den Text und beantworte die Fragen.',
      text: 'Es ist Sonntag. Jana sitzt in ihrem Zimmer und telefoniert mit ihrer Mutter Eva in Bratislava. "Petra hat einen Bruder und eine Schwester", sagt Jana. "Carlos ist verheiratet und hat zwei Kinder." Eva fragt: "Hast du Freunde in der Schule?" Jana antwortet: "Ja, Anna ist sehr nett. Sie hat keine Geschwister." "Und der Lehrer?", fragt Eva. "Er ist gut", sagt Jana.',
      textSk: 'Je nedeľa. Jana sedí vo svojej izbe a telefonuje so svojou mamou Evou v Bratislave. "Petra má brata a sestru," hovorí Jana. "Carlos je ženatý a má dve deti." Eva sa pýta: "Máš priateľov v škole?" Jana odpovedá: "Áno, Anna je veľmi milá. Nemá súrodencov." "A učiteľ?" pýta sa Eva. "Je dobrý," hovorí Jana.',
      questions: [
        {
          question: 'Wo sitzt Jana beim Telefonieren?',
          options: ['in der Schule', 'in Bratislava', 'in ihrem Zimmer', 'im Café'],
          answer: 2,
          explanation: 'Z textu: "Jana sitzt in ihrem Zimmer"  Jana sedí vo svojej izbe.',
        },
        {
          question: 'Hat Petra Geschwister?',
          options: ['Nein, sie hat keine Geschwister.', 'Ja, sie hat einen Bruder und eine Schwester.', 'Ja, sie hat zwei Kinder.', 'Nein, sie ist ledig.'],
          answer: 1,
          explanation: 'Z textu: "Petra hat einen Bruder und eine Schwester"  Petra má brata a sestru.',
        },
        {
          question: 'Wie viele Kinder hat Carlos?',
          options: ['ein Kind', 'drei Kinder', 'keine Kinder', 'zwei Kinder'],
          answer: 3,
          explanation: 'Z textu: "Carlos ist verheiratet und hat zwei Kinder"  Carlos má dve deti.',
        },
        {
          question: 'Hat Anna Geschwister?',
          options: ['Ja, sie hat einen Bruder.', 'Ja, sie hat eine Schwester.', 'Nein, sie hat keine Geschwister.', 'Wir wissen es nicht.'],
          answer: 2,
          explanation: 'Z textu: "Sie hat keine Geschwister"  Anna nemá súrodencov.',
        },
        {
          question: 'Wie findet Jana den Lehrer?',
          options: ['sehr nett', 'nicht gut', 'gut', 'schlecht'],
          answer: 2,
          explanation: 'Z textu: "Er ist gut", sagt Jana  Jana hovorí, že učiteľ je dobrý.',
        },
      ],
    },

    {
      type: 'speaking',
      instruction: 'Höre die Aussprache und sprich nach. Bewerte dich selbst.',
      phrases: [
        {
          de: 'Die Familie',
          sk: 'rodina',
          tip: 'fah-MIL-ee-eh  betone die mittlere Silbe',
        },
        {
          de: 'Ich habe eine Schwester.',
          sk: 'Mám sestru.',
          tip: 'habe = HAH-beh; Schwester = SHVES-tehr',
        },
        {
          de: 'Das ist mein Vater.',
          sk: 'To je môj otec.',
          tip: 'Vater = FAH-tehr  V klingt wie F',
        },
        {
          de: 'Hast du Geschwister?',
          sk: 'Máš súrodencov?',
          tip: 'Geschwister = geh-SHVIS-tehr  sch = š',
        },
        {
          de: 'Meine Familie ist klein.',
          sk: 'Moja rodina je malá.',
          tip: 'klein = KLAYN  ei klingt wie "aj"',
        },
        {
          de: 'Er hat zwei Kinder.',
          sk: 'Má dve deti.',
          tip: 'zwei = TSVAY; Kinder = KIN-dehr',
        },
        {
          de: 'Meine Eltern wohnen in Wien.',
          sk: 'Moji rodičia bývajú vo Viedni.',
          tip: 'Eltern = EL-tehrn; Wien = VEEN',
        },
        {
          de: 'Wir haben keine Geschwister.',
          sk: 'Nemáme súrodencov.',
          tip: 'haben = HAH-ben; keine = KAY-neh',
        },
      ],
    },

    {
      type: 'truefalse',
      instruction: 'Richtig oder falsch? Entscheide für jeden Satz.',
      questions: [
        {
          statement: '"Du habst" ist die richtige Form von haben für "du".',
          isTrue: false,
          explanation: 'Nepravda. Správna forma je "du hast"  nie "du habst". Haben je nepravidelné v 2. osobe singuláru.',
        },
        {
          statement: '"Er hat" ist die richtige Form von haben für "er".',
          isTrue: true,
          explanation: 'Pravda. "Er hat" je správna forma  tretia osoba jednotného čísla od haben je nepravidelná: hat.',
        },
        {
          statement: '"Die Eltern" hat eine Singularform "das Elter".',
          isTrue: false,
          explanation: 'Nepravda. "Die Eltern" neexistuje v singuláre  toto slovo sa používa iba v pluráli.',
        },
        {
          statement: '"Der Sohn" und "die Tochter" sind ein Gegensatzpaar.',
          isTrue: true,
          explanation: 'Pravda. Der Sohn (syn) a die Tochter (dcéra) sú mužský a ženský tvar toho istého rodinného vzťahu.',
        },
        {
          statement: '"Wir haben" und "sie haben" haben dieselbe Form.',
          isTrue: true,
          explanation: 'Pravda. Wir haben aj sie/Sie haben majú rovnakú formu "haben", zhodujúcu sa s infinitívom.',
        },
        {
          statement: '"Das Kind" ist feminin (die).',
          isTrue: false,
          explanation: 'Nepravda. "Das Kind" je stredného rodu (neutrum)  das Kind. Plurál je "die Kinder".',
        },
      ],
    },

    {
      type: 'dictation',
      instruction: 'Höre und schreibe den Satz auf Deutsch.',
      sentences: [
        {
          de: 'die Mutter',
          sk: 'matka',
        },
        {
          de: 'Ich habe eine Schwester.',
          sk: 'Mám sestru.',
        },
        {
          de: 'Du hast zwei Brüder.',
          sk: 'Máš dvoch bratov.',
          hint: 'zweite Person Singular von haben',
        },
        {
          de: 'Er hat keine Kinder.',
          sk: 'Nemá deti.',
          hint: 'dritte Person Singular  keine = žiadne',
        },
        {
          de: 'Meine Eltern wohnen in Wien.',
          sk: 'Moji rodičia bývajú vo Viedni.',
          hint: 'Eltern = plurál, wohnen z L06',
        },
        {
          de: 'Hast du Geschwister? Nein, ich habe keine Geschwister.',
          sk: 'Máš súrodencov? Nie, nemám súrodencov.',
          hint: 'otázka + záporná odpoveď s keine',
        },
      ],
    },

    {
      type: 'categorysort',
      instruction: 'Sortiere die Wörter in die richtige Kategorie.',
      explanation: 'Rodinné slová v nemčine majú rôzny gramatický rod. Plurálové slová (die Eltern, die Geschwister) a neutrálne slová (das Kind) sú osobitná skupina.',
      categories: [
        {
          name: 'männliche Familienmitglieder (der)',
          color: 'blue',
          words: ['der Vater', 'der Bruder', 'der Sohn', 'der Großvater', 'der Mann'],
        },
        {
          name: 'weibliche Familienmitglieder (die)',
          color: 'pink',
          words: ['die Mutter', 'die Schwester', 'die Tochter', 'die Großmutter', 'die Frau'],
        },
        {
          name: 'nur Plural / Neutrum (die / das)',
          color: 'green',
          words: ['die Eltern', 'die Geschwister', 'die Kinder', 'das Kind', 'die Familie'],
        },
      ],
    },

    {
      type: 'translation',
      instruction: 'Preložte vety zo slovenčiny do nemčiny. Použite správnu formu slovesa haben.',
      sentences: [
        {
          sk: 'Mám jedného brata.',
          answer: 'Ich habe einen Bruder.',
          hint: 'ich  habe; einen (akuzatív, maskulínum)',
          explanation: '"Ich habe"  prvá osoba. Bruder je maskulínum  akuzatív: einen Bruder.',
        },
        {
          sk: 'Máš súrodencov?',
          answer: 'Hast du Geschwister?',
          hint: 'du  hast; otázka  sloveso na prvom mieste',
          explanation: 'Otázka: sloveso ide na prvé miesto: "Hast du...?" Geschwister nemá člen v otázke.',
        },
        {
          sk: 'Carlos má dve deti.',
          answer: 'Carlos hat zwei Kinder.',
          hint: 'er  hat; Kinder = plurál od das Kind',
          explanation: '"Carlos hat"  tretia osoba singuláru. "zwei Kinder"  číslovka, potom plurál bez člena.',
        },
        {
          sk: 'Moja rodina je malá.',
          answer: 'Meine Familie ist klein.',
          hint: 'Familie je feminin; ist = sein (z L01)',
          explanation: '"Meine Familie"  privlastňovacie zámeno pre feminínum. "ist klein"  sein + adjektívum.',
        },
        {
          sk: 'Nemáme súrodencov.',
          answer: 'Wir haben keine Geschwister.',
          hint: 'wir  haben; zápor = keine + plurál',
          explanation: '"Wir haben"  prvá osoba plurálu. Zápor pri pluráli: "keine Geschwister".',
        },
      ],
    },

    {
      type: 'conjugation',
      instruction: 'Konjugiere die Verben vollständig.',
      verbs: [
        {
          infinitive: 'haben',
          translation: 'mať',
          forms: [
            { pronoun: 'ich', correct: 'habe' },
            { pronoun: 'du', correct: 'hast' },
            { pronoun: 'er/sie/es', correct: 'hat' },
            { pronoun: 'wir', correct: 'haben' },
            { pronoun: 'ihr', correct: 'habt' },
            { pronoun: 'sie/Sie', correct: 'haben' },
          ],
          note: 'Pozor: "haben" je nepravidelné v 2. a 3. osobe singuláru (du hast, er hat). Ostatné osoby sú pravidelné.',
        },
        {
          infinitive: 'telefonieren',
          translation: 'telefonovať',
          forms: [
            { pronoun: 'ich', correct: 'telefoniere' },
            { pronoun: 'du', correct: 'telefonierst' },
            { pronoun: 'er/sie/es', correct: 'telefoniert' },
            { pronoun: 'wir', correct: 'telefonieren' },
            { pronoun: 'ihr', correct: 'telefoniert' },
            { pronoun: 'sie/Sie', correct: 'telefonieren' },
          ],
          note: 'Pravidelné sloveso na -ieren. Kmeň: telefonier- + pravidelné koncovky. Žiadna zmena kmeňa.',
        },
      ],
    },
  ],

  reviewWords: ['wohnen'],

  lessonNotes: 'V tejto lekcii Jana opisuje svoju rodinu a rodiny spolužiakov. Kľúčové je nepravidelné sloveso "haben"  formy "du hast" a "er hat" sú najčastejšie chyby. Rodinné podstatné mená prichádzajú väčšinou v pároch (der Vater / die Mutter) a treba si zapamätať ich rod spolu so slovom.',
};