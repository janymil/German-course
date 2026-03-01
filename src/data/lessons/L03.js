export const lesson03 = {
  id: 3,
  week: 1,
  day: 3,
  title: 'Woher kommst du?',
  topic: 'Odkiaľ pochádzaš? Krajiny, jazyky. Slovesá kommen aus a sprechen.',
  cefr: 'A1',
  xpReward: 20,
  narrativeContext: 'Jana na jazykovom kurze spoznáva nových ľudí a pýta sa, odkiaľ pochádzajú a akými jazykmi hovoria.',
  communicativeGoal: 'Po tejto lekcii viem povedať, z akej krajiny pochádzam, a akými jazykmi hovorím.',
  skillFocus: ['vocabulary', 'grammar', 'speaking'],
  grammarNote: {
    rule: 'Zámena woher, predložka aus a sloveso sprechen',
    explanation: 'Sloveso "sprechen" (hovoriť) mení pri časovaní v prítomnom čase samohlásku v kmeni z "e" na "i" v 2. a 3. osobe jednotného čísla (du sprichst, er/sie/es spricht). Pre vyjadrenie pôvodu sa používa opytovacie zámeno "woher" na začiatku otázky a v odpovedi sa používa s predložkou "aus". Kým väčšina krajín je stredného rodu a nepoužívame pred nimi člen (Nemecko, Rakúsko), existujú výnimky a Švajčiarsko (die Schweiz) k nim patrí, takže člen musíme vo vete s predložkou aus použiť (aus der Schweiz).',
    examples: [
      { de: 'Woher kommst du?', sk: 'Odkiaľ pochádzaš?' },
      { de: 'Ich komme aus Deutschland.', sk: 'Pochádzam z Nemecka.' },
      { de: 'Was sprichst du?', sk: 'Čo hovoríš? (akým jazykom)' },
      { de: 'Er spricht Deutsch und Englisch.', sk: 'On hovorí po nemecky a po anglicky.' },
      { de: 'Ich wohne in der Schweiz.', sk: 'Bývam vo Švajčiarsku.' }
    ],
    slovakContrastNote: 'V slovenčine sa rod krajiny u takmer všetkých štátov zhoduje s nemčinou, pozor ale na člen, ktorý slovenčina nepoužíva: Pri "aus Deutschland" člen nepoužijeme, kým u "aus der Schweiz" alebo "aus der Slowakei" musí byť prítomný (die → der). V nemčine má naviac predložka priradený tzv. Dativ.'
  },
  vocab: [
    { de: 'kommen', sk: 'pochádzať, prísť', gender: null, srsId: 'L03_V01', example: 'Ich komme aus der Slowakei.', exampleSk: 'Pochádzam zo Slovenska.', recycledFrom: [] },
    { de: 'aus', sk: 'z (predložka)', gender: null, srsId: 'L03_V02', example: 'Er kommt aus Italien.', exampleSk: 'On pochádza z Talianska.', recycledFrom: [] },
    { de: 'sprechen', sk: 'hovoriť', gender: null, srsId: 'L03_V03', example: 'Wir sprechen Deutsch.', exampleSk: 'My hovoríme po nemecky.', recycledFrom: [] },
    { de: 'Deutsch', sk: 'nemčina', gender: 'N', srsId: 'L03_V04', example: 'Jana lernt Deutsch.', exampleSk: 'Jana sa učí nemčinu.', recycledFrom: [] },
    { de: 'Englisch', sk: 'angličtina', gender: 'N', srsId: 'L03_V05', example: 'Sprichst du Englisch?', exampleSk: 'Hovoríš po anglicky?', recycledFrom: [] },
    { de: 'die Sprache', sk: 'jazyk (reč)', gender: 'F', srsId: 'L03_V06', example: 'Deutsch ist eine Sprache.', exampleSk: 'Nemčina je jazyk.', recycledFrom: [] },
    { de: 'das Land', sk: 'krajina', gender: 'N', srsId: 'L03_V07', example: 'Das ist ein schönes Land.', exampleSk: 'To je pekná krajina.', recycledFrom: [] },
    { de: 'Deutschland', sk: 'Nemecko', gender: 'N', srsId: 'L03_V08', example: 'Sie lebt in Deutschland.', exampleSk: 'Ona žije v Nemecku.', recycledFrom: [] },
    { de: 'Österreich', sk: 'Rakúsko', gender: 'N', srsId: 'L03_V09', example: 'Kommst du aus Österreich?', exampleSk: 'Pochádzaš z Rakúska?', recycledFrom: [] },
    { de: 'die Schweiz', sk: 'Švajčiarsko', gender: 'F', srsId: 'L03_V10', example: 'Wir wohnen in der Schweiz.', exampleSk: 'Bývame vo Švajčiarsku.', recycledFrom: [] },
    { de: 'woher', sk: 'odkiaľ', gender: null, srsId: 'L03_V11', example: 'Woher kommst du?', exampleSk: 'Odkiaľ pochádzaš?', recycledFrom: [] },
    { de: 'ein bisschen', sk: 'trochu', gender: null, srsId: 'L03_V12', example: 'Ich spreche ein bisschen Englisch.', exampleSk: 'Hovorím trochu po anglicky.', recycledFrom: [] },
    { de: 'verstehen', sk: 'rozumieť', gender: null, srsId: 'L03_V13', example: 'Ich verstehe dich sehr gut.', exampleSk: 'Rozumiem ti veľmi dobre.', recycledFrom: [] },
    { de: 'leben', sk: 'žiť', gender: null, srsId: 'L03_V14', example: 'Wir leben zusammen.', exampleSk: 'My žijeme spolu.', recycledFrom: [] },
    { de: 'wohnen', sk: 'bývať', gender: null, srsId: 'L03_V15', example: 'Ich wohne in Berlin.', exampleSk: 'Bývam v Berlíne.', recycledFrom: [] }
  ],
  exercises: [
    {
      type: 'flashcard',
      instruction: 'Spoznaj nové slovíčka: Krajiny a jazyky.'
    },
    {
      type: 'match',
      instruction: 'Priraď nemecké výrazy k slovenským',
      pairs: [
        ['sprechen', 'hovoriť'],
        ['woher', 'odkiaľ'],
        ['Deutschland', 'Nemecko'],
        ['die Schweiz', 'Švajčiarsko'],
        ['verstehen', 'rozumieť'],
        ['leben', 'žiť']
      ]
    },
    {
      type: 'wordorder',
      instruction: 'Zostav správne vety.',
      sentences: [
        {
          words: ['Woher', 'kommst', 'du'],
          correct: 'Woher kommst du',
          hint: 'Odkiaľ pochádzaš?',
          explanation: 'Opytovacie zámeno "Woher" stojí na začiatku, nasleduje sloveso a podmet.'
        },
        {
          words: ['Ich', 'komme', 'aus', 'Österreich'],
          correct: 'Ich komme aus Österreich',
          hint: 'Pochádzam z Rakúska.',
          explanation: 'Spojenie pochádzať z sa povie "kommen aus".'
        },
        {
          words: ['Sprichst', 'du', 'Deutsch'],
          correct: 'Sprichst du Deutsch',
          hint: 'Hovoríš po nemecky?',
          explanation: 'Pri otázke stojí sloveso na prvom mieste a pri 2. osobe sa mení kmeňová samohláska e na i (du sprichst).'
        },
        {
          words: ['Wir', 'wohnen', 'in', 'der', 'Schweiz'],
          correct: 'Wir wohnen in der Schweiz',
          hint: 'Bývame vo Švajčiarsku.',
          explanation: 'Švajčiarsko sa vždy spája s určitým členom (aus der, in der).'
        }
      ]
    },
    {
      type: 'fill',
      instruction: 'Doplň správne slovo do vety.',
      questions: [
        {
          sentence: '___ kommst du?',
          answer: 'Woher',
          hint: 'Odkiaľ',
          explanation: '"Woher" používame pri otázke na pôvod (odkiaľ).'
        },
        {
          sentence: 'Ich ___ aus Deutschland.',
          answer: 'komme',
          hint: 'Pochádzam (od slovesa kommen)',
          explanation: 'V 1. osobe (ich) má sloveso kommen koncovku -e.'
        },
        {
          sentence: 'Er ___ sehr gut Englisch.',
          answer: 'spricht',
          hint: 'hovorí (od slovesa sprechen)',
          explanation: 'Sloveso sprechen je nepravidelné a v 3. osobe jedného čísla sa mení samohláska (er spricht).'
        },
        {
          sentence: 'Ich verstehe dich ein ___.',
          answer: 'bisschen',
          hint: 'trochu',
          explanation: 'Výraz "ein bisschen" má význam "trošku/trochu".'
        }
      ]
    },
    {
      type: 'listen',
      instruction: 'Počúvaj a zoraď či si porozumel.',
      questions: [
        { de: 'leben', sk: 'žiť' },
        { de: 'wohnen', sk: 'bývať' },
        { de: 'das Land', sk: 'krajina' },
        { de: 'die Sprache', sk: 'jazyk' },
        { de: 'Österreich', sk: 'Rakúsko' },
        { de: 'die Schweiz', sk: 'Švajčiarsko' }
      ]
    },
    {
      type: 'mcq',
      instruction: 'Vyber správnu možnosť.',
      questions: [
        {
          question: 'Ergänze: Du ___ sehr gut Deutsch. (sprechen)',
          questionSk: 'Doplň: Ty ___ veľmi dobre po nemecky. (hovoriť)',
          options: ['spreche', 'sprech', 'sprichst', 'spricht'],
          answer: 2,
          explanation: 'V 2. osobe jednotného čísla sa u slovesa sprechen mení e na i + koncovka -st → sprichst.'
        },
        {
          question: 'Welcher Satz ist richtig? "Ich komme aus..."',
          questionSk: 'Ktorá veta je správna? "Pochádzam z..."',
          options: [
            'Ich komme aus Schweiz.',
            'Ich komme in der Schweiz.',
            'Ich komme aus der Schweiz.',
            'Ich aus der Schweiz.'
          ],
          answer: 2,
          explanation: 'Švajčiarsko vyžaduje člen: "aus der Schweiz".'
        },
        {
          question: 'Welcher Satz ist grammatisch korrekt?',
          questionSk: 'Ktorá veta je gramaticky správna?',
          options: [
            'Leben du in Österreich?',
            'Lebst du in Österreich?',
            'Lebt wir in Österreich?',
            'Lebt du in Österreich?'
          ],
          answer: 1,
          explanation: 'Druhá osoba (du) vyžaduje koncovku -st: lebst.'
        },
        {
          question: 'Welches Verb bedeutet "rozumieť"?',
          questionSk: 'Ktoré sloveso znamená "rozumieť"?',
          options: ['verstehen', 'leben', 'wohnen', 'sprechen'],
          answer: 0,
          explanation: '"Verstehen" znamená rozumieť. "Sprechen" je hovoriť.'
        }
      ]
    },
    {
      type: 'minitext',
      instruction: 'Prečítaj si pokračovanie príbehu Jany a odpovedz na otázky.',
      text: 'Im Deutschkurs fragt Jana: "Woher kommst du, Lukas?" Lukas antwortet: "Ich komme aus Österreich. Und du?" Jana sagt: "Ich komme aus der Slowakei. Ich wohne jetzt in Wien." Lukas fragt: "Sprichst du Englisch?" Jana sagt: "Ja, ein bisschen. Und ich spreche gut Slowakisch." Lukas lacht: "Ich verstehe kein Slowakisch! Aber ich spreche gut Deutsch."',
      textSk: 'Na kurze nemčiny sa Jana pýta: "Odkiaľ pochádzaš, Lukas?" Lukas odpovedá: "Pochádzam z Rakúska. A ty?" Jana hovorí: "Pochádzam zo Slovenska. Teraz bývam vo Viedni." Lukas sa pýta: "Hovoríš po anglicky?" Jana hovorí: "Áno, trochu. A hovorím dobre po slovensky." Lukas sa smeje: "Ja nerozumiem po slovensky! Ale hovorím dobre po nemecky."',
      questions: [
        {
          question: 'Woher kommt Lukas?',
          questionSk: 'Odkiaľ pochádza Lukas?',
          options: ['Aus der Slowakei', 'Aus Deutschland', 'Aus der Schweiz', 'Aus Österreich'],
          answer: 3,
          explanation: 'Lukas hovorí: "Ich komme aus Österreich."'
        },
        {
          question: 'Wo wohnt Jana jetzt?',
          questionSk: 'Kde teraz býva Jana?',
          options: ['In Bratislava', 'In Wien', 'In Berlin', 'In Zürich'],
          answer: 1,
          explanation: 'Jana hovorí: "Ich wohne jetzt in Wien."'
        },
        {
          question: 'Welche Sprache versteht Lukas nicht?',
          questionSk: 'Ktorému jazyku Lukas nerozumie?',
          options: ['Deutsch', 'Englisch', 'Slowakisch', 'Französisch'],
          answer: 2,
          explanation: 'Lukas hovorí: "Ich verstehe kein Slowakisch!"'
        }
      ]
    },
    {
      type: 'speaking',
      instruction: 'Precvič si výslovnosť.',
      phrases: [
        {
          de: 'Woher kommst du?',
          sk: 'Odkiaľ pochádzaš?',
          tip: 'Klaď dôraz na slovo "Woher".'
        },
        {
          de: 'Ich komme aus Deutschland.',
          sk: 'Pochádzam z Nemecka.',
          tip: 'Výslovnosť S pred C a H sa číta ako hláska [š].'
        },
        {
          de: 'Sprichst du Deutsch?',
          sk: 'Hovoríš po nemecky?',
          tip: 'Výslovnosť SP na začiatku slabiky sa vyslovuje ako [šp].'
        },
        {
          de: 'Ich spreche Englisch.',
          sk: 'Hovorím po anglicky.',
          tip: 'Samohláska E na konci slova sprech-E sa slabo vyslovuje.'
        },
        {
          de: 'Ich verstehe ein bisschen.',
          sk: 'Rozumiem trochu.',
          tip: 'Dvojité -ss- v "bisschen" čítame ako ostré [s].'
        }
      ]
    }
  ],
  reviewWords: ['ich', 'du', 'und', 'ja', 'nein'],
  lessonNotes: 'Dôraz na správnu výslovnosť "spr" a "sch". Dôležité je tiež odlíšenie rodu pri krajinách.'
};
