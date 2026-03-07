export const lesson01 = {
  id: 1,
  week: 1,
  day: 1,
  title: 'Hallo! Name und Aussprache',
  topic: 'Pozdravy, predstavovanie (Meno, Priezvisko), nemecká abeceda a výslovnosť. (Slovesá heißen, sein jedn. číslo).',
  cefr: 'A1',
  xpReward: 15,
  narrativeContext: 'Predstav si seba na prvom nemeckom stretnutí alebo kurze. Zoznamuješ sa s ostatnými a učíš sa základné frázy, aby si vedel(a) povedať, kto si.',
  communicativeGoal: 'Po tejto lekcii viem pozdraviť, predstaviť sa a hláskovať svoje meno.',
  skillFocus: ['vocabulary', 'grammar', 'pronunciation', 'reading'],
  grammarNotes: [
    {
      rule: 'Tajomstvo slovesa „sein" (a prečo Nemci nikdy nevynechávajú podmet)',
      explanation: `<p>Zabudnite na nudné poučky. Predstavte si, že nemecká veta je ako pevný stôl. Potrebuje jasné nohy. V slovenčine povieme „Som hladný" a funguje to, podmet „ja" si domyslíme. V nemčine? „Bin hungrig" padne na zem. Nemčina je architektonický, štruktúrovaný jazyk – vždy potrebuje jasného vykonávateľa. Preto VŽDY musíte ukázať prstom: <strong>Ich</strong> bin..., <strong>Du</strong> bist...</p>
<p>Sloveso <strong>sein</strong> (byť) je absolútny kráľ a lepidlo celej gramatiky. Nespája len slová, ukazuje vašu existenciu.</p>
<table><thead><tr><th>Osoba</th><th>Tvar</th><th>Ako to vníma Nemec</th></tr></thead><tbody>
<tr><td>ich</td><td><strong>bin</strong></td><td>Ich <strong>bin</strong> Anna. (Moja identita je Anna)</td></tr>
<tr><td>du</td><td><strong>bist</strong></td><td>Du <strong>bist</strong> Peter. (Ty existuješ ako Peter)</td></tr>
<tr><td>er / sie / es</td><td><strong>ist</strong></td><td>Er <strong>ist</strong> Max. (On je tu, je to Max)</td></tr>
</tbody></table>
<div class="tip-box">💡 <strong>Tip Profesora:</strong> „sein" je nepravidelné, ale nesnažte sa ho pochopiť. Berte ho ako tváre svojich priateľov. Len ho prijmite a memorujte!</div>`,
      examples: [
        { de: 'Ich bin Anna.', sk: 'Ja som Anna.', note: 'Podmet „ich" je povinný!' },
        { de: 'Du bist Peter.', sk: 'Ty si Peter.' },
        { de: 'Wer bist du?', sk: 'Kto si ty?' },
      ],
      slovakContrastNote: 'Kým slovenský mozog prirodzene vypúšťa zámená („Som Peter", „Sme tu"), nemecký mozog vtedy kričí: „Kto?! Kto ním je?!". Musíte sa naučiť automaticky aktivovať zámeno ku každému slovesu.'
    },
    {
      rule: 'Sloveso „heißen": Nie je to len „volať sa"',
      explanation: `<p>Na Slovensku sa „voláme" (zvratne, seba). Nemci to vidia úplne inak. <strong>„Heißen"</strong> znamená doslova „nazývať sa / znieť ako". Odpadá ten divný slovenský zvratný prvok „sa". Povieme to priamo a úderne.</p>
<table><thead><tr><th>Osoba</th><th>Tvar</th><th>Príklad</th></tr></thead><tbody>
<tr><td>ich</td><td><strong>heiße</strong></td><td>Ich <strong>heiße</strong> Max.</td></tr>
<tr><td>du</td><td><strong>heißt</strong></td><td>Wie <strong>heißt</strong> du?</td></tr>
<tr><td>er / sie</td><td><strong>heißt</strong></td><td>Sie <strong>heißt</strong> Anna.</td></tr>
</tbody></table>
<div class="tip-box">💡 <strong>Profesorský hack k písmenu ß:</strong> Vidíte to čudné „ß"? Volá sa Eszett. Nebojte sa ho, je to len graficky zbalené, naštvané, ostré „s". Čítajte ho dlho a syčavo.</div>`,
      examples: [
        { de: 'Ich heiße Max.', sk: 'Volám sa Max.' },
        { de: 'Wie heißt du?', sk: 'Ako sa voláš?' },
      ],
      slovakContrastNote: 'Študenti často tvoria frankensteina: „Ich heiße mich" (ja volám mňa). Nie! Zabudnite na slovenské „sa". Sloveso heißen už to „sa" má vo svojej DNA.'
    },
    {
      rule: 'Abeceda: Farby a zvuky nemčiny (Umlaute)',
      explanation: `<p>Nemecká abeceda nie je len 26 písmen. Je to paleta zvukov. To, čo robí nemčinu krásnou a špecifickou, sú jej <strong>Umlaute (prehlásky)</strong> a špeciálne znaky. Nemci neprehĺtajú slabiky, naopak, tvoria priestor v ústach.</p>
<table><thead><tr><th>Znak</th><th>Ako to učí Profesor</th><th>Kde to cítiš</th></tr></thead><tbody>
<tr><td><strong>Ä ä</strong></td><td>Otvorené e! Jablko (Äpfel). Povedz „A", ale hľadaj v ňom „E".</td><td>Vzadu v krku.</td></tr>
<tr><td><strong>Ö ö</strong></td><td>Urob perami perfektný kruh (ako pre O), ale nahlas povedz jasné E!</td><td>Vibruje na perách.</td></tr>
<tr><td><strong>Ü ü</strong></td><td>Zašpúľ pery do uzučkej rúrky na U a natlač cez ňu vysoké I!</td><td>Úplne vpredu.</td></tr>
<tr><td><strong>ß</strong></td><td>Ostré ako britva. Hadie S.</td><td>Za zubami.</td></tr>
</tbody></table>
<div class="warn-box">⚠️ <strong>Zlaté pravidlo:</strong> Bodky nad písmenom menia realitu. "schon" je *už*. "schön" je *pekný*. Ak ich odignorujete, Nemec vám nebude rozumieť.</div>`,
      examples: [
        { de: 'Mein Name ist Müller.', sk: 'Moje meno je Müller.' },
      ],
      slovakContrastNote: 'V slovenčine máme dĺžne, ktoré natiahnu čas. V nemčine prehlásky menia celý odtieň vokálu. Trénujte si „ö" a „ü" pred zrkadlom s prehnanou mimikou, inak ich váš hlasový aparát nenájde.'
    },
  ],
  vocab: [
    {
      de: 'hallo',
      sk: 'ahoj (pri stretnutí)',
      gender: null,
      srsId: 'L01_V01',
      example: 'Hallo, ich bin Jana.',
      exampleSk: 'Ahoj, ja som Jana.',
      recycledFrom: []
    },
    {
      de: 'guten Tag',
      sk: 'dobrý deň',
      gender: null,
      srsId: 'L01_V02',
      example: 'Guten Tag, ich bin Peter.',
      exampleSk: 'Dobrý deň, ja som Peter.',
      recycledFrom: []
    },
    {
      de: 'tschüss',
      sk: 'ahoj, čau (pri lúčení)',
      gender: null,
      srsId: 'L01_V03',
      example: 'Tschüss, danke!',
      exampleSk: 'Ahoj, ďakujem!',
      recycledFrom: []
    },
    {
      de: 'auf Wiedersehen',
      sk: 'dovidenia',
      gender: null,
      srsId: 'L01_V04',
      example: 'Auf Wiedersehen!',
      exampleSk: 'Dovidenia!',
      recycledFrom: []
    },
    {
      de: 'ja',
      sk: 'áno',
      gender: null,
      srsId: 'L01_V05',
      example: 'Ja, ich bin Anna.',
      exampleSk: 'Áno, ja som Anna.',
      recycledFrom: []
    },
    {
      de: 'nein',
      sk: 'nie',
      gender: null,
      srsId: 'L01_V06',
      example: 'Nein, danke.',
      exampleSk: 'Nie, ďakujem.',
      recycledFrom: []
    },
    {
      de: 'danke',
      sk: 'ďakujem',
      gender: null,
      srsId: 'L01_V07',
      example: 'Danke schön!',
      exampleSk: 'Ďakujem pekne!',
      recycledFrom: []
    },
    {
      de: 'bitte',
      sk: 'prosím',
      gender: null,
      srsId: 'L01_V08',
      example: 'Ja, bitte.',
      exampleSk: 'Áno, prosím.',
      recycledFrom: []
    },
    {
      de: 'der Name',
      sk: 'meno',
      gender: 'M',
      srsId: 'L01_V09',
      example: 'Mein Name ist Peter.',
      exampleSk: 'Moje meno je Peter.',
      recycledFrom: []
    },
    {
      de: 'buchstabieren',
      sk: 'hláskovať',
      gender: null,
      srsId: 'L01_V10',
      example: 'Ich buchstabiere: M-A-X.',
      exampleSk: 'Ja hláskujem: M-A-X.',
      recycledFrom: []
    },
    {
      de: 'heißen',
      sk: 'volať sa',
      gender: null,
      srsId: 'L01_V11',
      example: 'Ich heiße Thomas.',
      exampleSk: 'Ja sa volám Thomas.',
      recycledFrom: []
    },
    {
      de: 'sein',
      sk: 'byť',
      gender: null,
      srsId: 'L01_V12',
      example: 'Ich bin Maria.',
      exampleSk: 'Ja som Maria.',
      recycledFrom: []
    },
    {
      de: 'der Vorname',
      sk: 'meno (krstné)',
      gender: 'M',
      srsId: 'L01_V13',
      example: 'Mein Vorname ist Jana.',
      exampleSk: 'Moje krstné meno je Jana.',
      recycledFrom: []
    },
    {
      de: 'der Nachname',
      sk: 'priezvisko',
      gender: 'M',
      srsId: 'L01_V14',
      example: 'Mein Nachname ist Nováková.',
      exampleSk: 'Moje priezvisko je Nováková.',
      recycledFrom: []
    },
    {
      de: 'Wie heißt du?',
      sk: 'Ako sa voláš?',
      gender: null,
      srsId: 'L01_V15',
      example: 'Hallo! Wie heißt du? — Ich heiße Anna.',
      exampleSk: 'Ahoj! Ako sa voláš? — Volám sa Anna.',
      recycledFrom: []
    },
    {
      de: 'Mein Name ist...',
      sk: 'Moje meno je...',
      gender: null,
      srsId: 'L01_V16',
      example: 'Guten Tag, mein Name ist Peter.',
      exampleSk: 'Dobrý deň, moje meno je Peter.',
      recycledFrom: []
    },
    {
      de: 'Entschuldigung',
      sk: 'prepáčte, s dovolením',
      gender: null,
      srsId: 'L01_V17',
      example: 'Entschuldigung, wie heißt du?',
      exampleSk: 'Prepáč, ako sa voláš?',
      recycledFrom: []
    }
  ],
  exercises: [
    {
      type: 'flashcard',
      instruction: 'Prezri si a zopakuj si nové slovíčka.'
    },
    {
      type: 'match',
      instruction: 'Priraď nemecké slovíčko k slovenskému prekladu.',
      pairs: [
        ['hallo', 'ahoj (pri stretnutí)'],
        ['guten Tag', 'dobrý deň'],
        ['auf Wiedersehen', 'dovidenia'],
        ['tschüss', 'ahoj, čau (pri lúčení)'],
        ['der Name', 'meno'],
        ['der Vorname', 'meno (krstné)'],
        ['der Nachname', 'priezvisko'],
        ['buchstabieren', 'hláskovať'],
        ['heißen', 'volať sa'],
        ['Entschuldigung', 'prepáčte, s dovolením']
      ]
    },
    {
      type: 'wordorder',
      instruction: 'Zorad slová tak, aby tvorili správnu nemeckú vetu.',
      sentences: [
        {
          words: ['Ich', 'bin', 'Max'],
          correct: 'Ich bin Max',
          hint: 'Ja som Max.',
          explanation: 'Podmet "Ich" (ja) stojí na prvom mieste, prísudok "bin" (sloveso sein) na druhom.'
        },
        {
          words: ['Du', 'heißt', 'Anna'],
          correct: 'Du heißt Anna',
          hint: 'Ty sa voláš Anna.',
          explanation: 'Podmet "Du" (ty) je na prvom mieste a sloveso "heißt" na druhom.'
        },
        {
          words: ['Wer', 'bist', 'du'],
          correct: 'Wer bist du',
          hint: 'Kto si ty?',
          explanation: 'V opytovacej vete s opytovacím zámenom (Wer) toto zámeno stojí na prvom mieste, sloveso (bist) stojí na druhom a podmet (du) presúvame na tretie.'
        },
        {
          words: ['Ich', 'heiße', 'Peter'],
          correct: 'Ich heiße Peter',
          hint: 'Ja sa volám Peter.',
          explanation: 'V bežnej oznamovacej vete je podmet na prvom a sloveso na druhom mieste. 1. osoba "ich" sa spája so slovesom s koncovkou -e: "heiße".'
        }
      ]
    },
    {
      type: 'fill',
      instruction: 'Doplň do vety chýbajúce slovo.',
      questions: [
        {
          sentence: '___ heiße Anna.',
          answer: 'Ich',
          hint: 'Ja',
          explanation: 'Osobe "ja" prislúcha nemecké osobné zámeno "ich" a príslušný tvar slovesa "heiße".'
        },
        {
          sentence: 'Wer ___ du?',
          answer: 'bist',
          hint: 'si (ty)',
          explanation: 'K zámenu "du" sa spája tvar slovesa "sein" v druhej osobe "bist".'
        },
        {
          sentence: 'Guten ___, ich bin Max.',
          answer: 'Tag',
          hint: 'deň',
          explanation: 'Pozdrav "Dobrý deň" sa v nemčine povie formálne "Guten Tag".'
        },
        {
          sentence: '___ bist du?',
          answer: 'Wer',
          hint: 'Kto',
          explanation: 'Otázka na totožnosť osoby sa začína opytovacím zámenom "Wer" (Kto).'
        },
        {
          sentence: 'Der ___, bitte.',
          answer: 'Name',
          hint: 'Meno',
          explanation: 'Slovíčko z tohto dialógu pre podstatné meno "meno" sa povie "Name". Jeho člen je "der".'
        }
      ]
    },
    {
      type: 'listen',
      instruction: 'Vypočuj si slovo a snaž sa ho zopakovať alebo napísať po slovensky. Správnosť si skontroluj tlačidlom na zobrazenie odpovede.',
      questions: [
        { de: 'hallo', sk: 'ahoj (pri stretnutí)' },
        { de: 'danke', sk: 'ďakujem' },
        { de: 'bitte', sk: 'prosím' },
        { de: 'der Name', sk: 'meno' },
        { de: 'der Vorname', sk: 'meno (krstné)' },
        { de: 'der Nachname', sk: 'priezvisko' },
        { de: 'guten Tag', sk: 'dobrý deň' },
        { de: 'auf Wiedersehen', sk: 'dovidenia' },
        { de: 'buchstabieren', sk: 'hláskovať' },
        { de: 'Entschuldigung', sk: 'prepáčte' }
      ]
    },
    {
      type: 'mcq',
      instruction: 'Vyber správnu odpoveď na nasledujúce otázky.',
      questions: [
        {
          question: 'Welcher Satz bedeutet "Ja sa volám Anna"?',
          questionSk: 'Ktorá veta znamená "Ja sa volám Anna"?',
          options: ['Ich bin Anna.', 'Ich heiße Anna.', 'Du bist Anna.', 'Wer ist Anna?'],
          answer: 1,
          explanation: 'Sloveso "heißen" v tvare "heiße" s podmetom "ich" prekladáme ako "ja sa volám". "Ich bin" znamená iba "Ja som".'
        },
        {
          question: 'Ergänze: du ___ (sein)',
          questionSk: 'Doplň: ty ___ (byť)',
          options: ['bin', 'heiße', 'bist', 'heißt'],
          answer: 2,
          explanation: 'Pre druhú osobu jednotného čísla sa sloveso "sein" časuje ako "du bist".'
        },
        {
          question: 'Welches Wort sagt man zum Abschied?',
          questionSk: 'Ktoré slovo sa hovorí pri rozlúčke?',
          options: ['Guten Tag', 'Hallo', 'Bitte', 'Tschüss'],
          answer: 3,
          explanation: '"Tschüss" alebo "Auf Wiedersehen" sú nemecké pozdravy na rozlúčku.'
        },
        {
          question: 'Was bedeutet "Wer bist du?"',
          questionSk: 'Čo znamená "Wer bist du?"',
          options: ['Wie heißt du?', 'Wo bist du?', 'Wer bist du?', 'Wann kommst du?'],
          answer: 2,
          explanation: '"Wer" znamená "kto", takže "Wer bist du?" = "Kto si ty?".'
        }
      ]
    },
    {
      type: 'minitext',
      instruction: 'Prečítaj si text o Janinom prvom stretnutí a odpovedz na otázky.',
      text: 'Jana ist neu in Wien. Sie ist im Deutschkurs. Da ist ein Mann. „Guten Tag! Mein Name ist Lukas. Wie heißen Sie?" — „Hallo! Ich heiße Jana Nováková." — „Wie buchstabiert man das?" — „N-O-V-Á-K-O-V-Á." — „Danke, Frau Nováková. Willkommen!" Jana ist froh.',
      textSk: 'Jana je nová vo Viedni. Je na kurze nemčiny. Je tam muž. „Dobrý deň! Moje meno je Lukas. Ako sa voláte?" — „Ahoj! Volám sa Jana Nováková." — „Ako sa to hlásuje?" — „N-O-V-Á-K-O-V-Á." — „Ďakujem, pani Nováková. Vitajte!" Jana je šťastná.',
      questions: [
        {
          question: 'Wie heißt der Mann?',
          questionSk: 'Ako sa volá ten muž?',
          options: ['Peter', 'Lukas', 'Thomas', 'Max'],
          answer: 1,
          explanation: 'Text hovorí: "Mein Name ist Lukas."'
        },
        {
          question: 'Wie heißt die Frau?',
          questionSk: 'Ako sa volá tá žena?',
          options: ['Anna', 'Maria', 'Jana', 'Lukas'],
          answer: 2,
          explanation: 'Text hovorí: "Ich heiße Jana Nováková."'
        },
        {
          question: 'Was sagt Lukas am Ende?',
          questionSk: 'Čo hovorí Lukas na konci?',
          options: ['Tschüss!', 'Willkommen!', 'Bitte!', 'Auf Wiedersehen!'],
          answer: 1,
          explanation: 'Text hovorí: "Danke, Frau Nováková. Willkommen!"'
        }
      ]
    },
    {
      type: 'speaking',
      instruction: 'Vypočuj si nemeckú frázu a pokús sa ju nahlas sami prečítať a zopakovať. Potom sa ohodnoť, či si ju aspoň zvládol.',
      phrases: [
        {
          de: 'Hallo, guten Tag.',
          sk: 'Ahoj, dobrý deň.',
          tip: 'Slovíčko Guten sa číta s vyslovene dlhým silným u.'
        },
        {
          de: 'Ich heiße Peter.',
          sk: 'Ja sa volám Peter.',
          tip: 'ß sa číta ako ostré s. Výslovnosť: [hajse].'
        },
        {
          de: 'Wer bist du?',
          sk: 'Kto si ty?',
          tip: 'Nemecké w sa takmer zväčša číta ako bežné slovenské [v].'
        },
        {
          de: 'Buchstabieren, bitte.',
          sk: 'Hláskovať, prosím.',
          tip: 'Výslovnosť: [buchštabíren], ch ako [ch].'
        },
        {
          de: 'Auf Wiedersehen!',
          sk: 'Dovidenia!',
          tip: 'ie sa číta ako dlhé í: [auf víderzéén].'
        },
        {
          de: 'Ja, danke.',
          sk: 'Áno, ďakujem.',
          tip: 'J na začiatku čítame ako slovenské j.'
        }
      ]
    },
    {
      type: 'conjugation',
      instruction: 'Vyplň správne tvary slovies sein a heißen.',
      verbs: [
        {
          infinitive: 'sein',
          translation: 'byť',
          forms: [
            { pronoun: 'ich', correct: 'bin' },
            { pronoun: 'du', correct: 'bist' },
            { pronoun: 'er/sie/es', correct: 'ist' },
          ],
          note: 'Sloveso „sein" je nepravidelné — každý tvar sa musíš naučiť naspamäť. Ich bin, du bist, er ist.'
        },
        {
          infinitive: 'heißen',
          translation: 'volať sa',
          forms: [
            { pronoun: 'ich', correct: 'heiße' },
            { pronoun: 'du', correct: 'heißt' },
            { pronoun: 'er/sie/es', correct: 'heißt' },
          ],
          note: 'Sloveso „heißen" — pri du a er/sie sa tvar píše rovnako: heißt.'
        }
      ]
    },
    {
      type: 'truefalse',
      instruction: 'Rozhodni, či je tvrdenie o nemeckej gramatike správne (Richtig) alebo nesprávne (Falsch).',
      statements: [
        {
          statement: '„Ich bin Anna" bedeutet „Ja som Anna".',
          isTrue: true,
          explanation: 'Správne! „Ich bin" = ja som. „Bin" je tvar slovesa „sein" pre 1. osobu.'
        },
        {
          statement: 'Das deutsche Alphabet hat 26 Buchstaben.',
          isTrue: false,
          explanation: 'Nemecká abeceda má 30 písmen: 26 štandardných + 4 špeciálne (Ä, Ö, Ü, ß).'
        },
        {
          statement: '„Du heißt" ist die richtige Form für „ty sa voláš".',
          isTrue: true,
          explanation: 'Správne! Pre osobu „du" je tvar „heißt": Du heißt Anna.'
        },
        {
          statement: 'In Deutsch kann man sagen „Bin Anna" ohne „Ich".',
          isTrue: false,
          explanation: 'V nemčine musí byť vždy podmet: „Ich bin Anna." Nie „Bin Anna."'
        },
        {
          statement: '„Tschüss" sagt man zur Begrüßung.',
          isTrue: false,
          explanation: '„Tschüss" sa hovorí pri rozlúčke, nie pri pozdrave. Na pozdrav: „Hallo" alebo „Guten Tag".'
        }
      ]
    },
    {
      type: 'dictation',
      instruction: 'Počúvaj a zapíš nemeckú vetu.',
      sentences: [
        { de: 'Ich bin Anna.', sk: 'Ja som Anna.' },
        { de: 'Wie heißt du?', sk: 'Ako sa voláš?', hint: '3 slová' },
        { de: 'Guten Tag!', sk: 'Dobrý deň!' },
        { de: 'Mein Name ist Peter.', sk: 'Moje meno je Peter.', hint: '4 slová' },
        { de: 'Auf Wiedersehen!', sk: 'Dovidenia!' }
      ]
    },
    {
      type: 'categorysort',
      instruction: 'Roztrieď slová do správnych skupín.',
      categories: [
        { name: 'Pozdrav (Begrüßung)', color: 'blue', words: ['Hallo', 'Guten Tag'] },
        { name: 'Rozlúčka (Abschied)', color: 'rose', words: ['Tschüss', 'Auf Wiedersehen'] },
        { name: 'Zdvorilosť (Höflichkeit)', color: 'green', words: ['Danke', 'Bitte', 'Entschuldigung'] }
      ],
      explanation: 'Pozdravy (Hallo, Guten Tag) sa hovoria pri stretnutí. Rozlúčkové frázy (Tschüss, Auf Wiedersehen) pri odchode. Danke, Bitte a Entschuldigung sú zdvorilostné výrazy.'
    }
  ],
  reviewWords: [],
  lessonNotes: 'Prvá úvodná lekcia zoznamuje užívateľov s celkom základnými pozdravmi, sebaidentifikáciou a so zameraním na primárne časovanie klasických verb sein a heißen a hlavne v prvej a druhej osobe jednotného čísla.'
};


