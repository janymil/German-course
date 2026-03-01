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
  grammarNote: {
    rule: 'Slovesá byť (sein) a volať sa (heißen) & Nemecká abeceda',
    explanation: 'V nemčine musí byť pri slovese vždy vyjadrený podmet (kto vykonáva dej: ja, ty atď.). Slovesá na vyjadrenie mena sú "heißen" a "sein". Tvary pre osobu "ja" sú "ich bin" (ja som) a "ich heiße" (ja sa volám). Pre osobu "ty" používame "du bist" (ty si) a "du heißt" (ty sa voláš). Nemecká abeceda má 30 písmen: štandardných 26 zhodných s anglickou abecedou, plus tri samohlásky s prehláskou (Umlaute) Ä, Ö, Ü a špeciálne písmeno pre ostré S zvané Eszett (ß), ktoré sa číta ako bežné s.',
    examples: [
      { de: 'Ich bin Anna.', sk: 'Ja som Anna.' },
      { de: 'Du bist Peter.', sk: 'Ty si Peter.' },
      { de: 'Ich heiße Max.', sk: 'Ja sa volám Max.' },
      { de: 'Wer bist du?', sk: 'Kto si ty?' }
    ],
    slovakContrastNote: 'V slovenčine môžeme povedať "Som Peter." úplne bez slova "Ja", pretože sám tvar slovesa vyjadruje osobu. V nemčine však musíte VŽDY použiť aj zámeno, teda podmet nesmie chýbať: "Ich bin Peter."'
  },
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
      de: 'ich',
      sk: 'ja',
      gender: null,
      srsId: 'L01_V13',
      example: 'Ich bin Max.',
      exampleSk: 'Ja som Max.',
      recycledFrom: []
    },
    {
      de: 'du',
      sk: 'ty',
      gender: null,
      srsId: 'L01_V14',
      example: 'Wer bist du?',
      exampleSk: 'Kto si ty?',
      recycledFrom: []
    },
    {
      de: 'wer',
      sk: 'kto',
      gender: null,
      srsId: 'L01_V15',
      example: 'Wer ist Peter?',
      exampleSk: 'Kto je Peter?',
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
        ['buchstabieren', 'hláskovať'],
        ['heißen', 'volať sa'],
        ['sein', 'byť'],
        ['wer', 'kto']
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
        { de: 'ja', sk: 'áno' },
        { de: 'nein', sk: 'nie' },
        { de: 'ich', sk: 'ja' },
        { de: 'du', sk: 'ty' },
        { de: 'wer', sk: 'kto' },
        { de: 'guten Tag', sk: 'dobrý deň' },
        { de: 'auf Wiedersehen', sk: 'dovidenia' },
        { de: 'buchstabieren', sk: 'hláskovať' }
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
      instruction: 'Prečítaj si text o Janinom príchode do Viedne a odpovedz na otázky.',
      text: 'Jana kommt aus der Slowakei. Sie ist jetzt in Wien. Jana sagt: "Hallo! Ich heiße Jana." Ein Mann antwortet: "Guten Tag! Ich bin Lukas. Wer bist du?" Jana sagt: "Ich bin Jana. Ich buchstabiere: J-A-N-A." Lukas sagt: "Danke, Jana! Willkommen in Wien!" Jana antwortet: "Danke, Lukas. Auf Wiedersehen!"',
      textSk: 'Jana pochádza zo Slovenska. Teraz je vo Viedni. Jana hovorí: "Ahoj! Volám sa Jana." Muž odpovedá: "Dobrý deň! Ja som Lukas. Kto si?" Jana hovorí: "Ja som Jana. Hláskovanie: J-A-N-A." Lukas hovorí: "Ďakujem, Jana! Vitaj vo Viedni!" Jana odpovedá: "Ďakujem, Lukas. Dovidenia!"',
      questions: [
        {
          question: 'Wer kommt aus der Slowakei?',
          questionSk: 'Kto pochádza zo Slovenska?',
          options: ['Lukas', 'Jana', 'Anna', 'Peter'],
          answer: 1,
          explanation: 'Hneď prvá veta: "Jana kommt aus der Slowakei."'
        },
        {
          question: 'Wo ist Jana jetzt?',
          questionSk: 'Kde je Jana teraz?',
          options: ['In Berlin', 'In Bratislava', 'In Wien', 'In München'],
          answer: 2,
          explanation: 'Text hovorí: "Sie ist jetzt in Wien."'
        },
        {
          question: 'Was sagt Lukas am Ende?',
          questionSk: 'Čo hovorí Lukas na konci?',
          options: ['Tschüss!', 'Willkommen in Wien!', 'Bitte!', 'Auf Wiedersehen!'],
          answer: 1,
          explanation: 'Lukas hovorí: "Danke, Jana! Willkommen in Wien!"'
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
    }
  ],
  reviewWords: [],
  lessonNotes: 'Prvá úvodná lekcia zoznamuje užívateľov s celkom základnými pozdravmi, sebaidentifikáciou a so zameraním na primárne časovanie klasických verb sein a heißen a hlavne v prvej a druhej osobe jednotného čísla.'
};


