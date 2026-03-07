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
  grammarNotes: [
    {
      rule: 'Predložka „aus" a pasce s VIP krajinami',
      explanation: `<p>Predložka <strong>„aus"</strong> neznamená len hocijaké „z". Pre Nemca to predstavuje pohyb <em>„z vnútra, z útrob niečoho"</em>. Keď hovoríte „Ich komme aus...", nehovoríte len o smere, ale o svojom hlbokom pôvode.</p>
<h4>Krajiny s členom (VIP klub)</h4>
<p>Väčšina krajín je v nemčine „bezpohlavná" (stredný rod bez viditeľného člena, napr. Deutschland). Ale vaša krajina je VIP! Slovensko je <strong>die</strong> Slowakei (ona). Švajčiarsko je <strong>die</strong> Schweiz. A tu prichádza nemecká mágia:</p>
<p>Predložka „aus" je absolútny diktátor. Vždy, bez akejkoľvek výnimky, mení ženský člen <strong>die</strong> na tvrdé <strong>der</strong> (tzv. Datív). Nesnažte sa to pochopiť logikou pádov. Nasajte to ako melódiu.</p>
<table><thead><tr><th>Krajina (Základ)</th><th>Odkiaľ? (aus + ??)</th></tr></thead><tbody>
<tr><td>Deutschland (žiaden člen)</td><td>aus <strong>Deutschland</strong></td></tr>
<tr><td><strong>die</strong> Slowakei</td><td>aus <strong>der</strong> Slowakei</td></tr>
<tr><td><strong>die</strong> Schweiz</td><td>aus <strong>der</strong> Schweiz</td></tr>
<tr><td><strong>die</strong> Türkei</td><td>aus <strong>der</strong> Türkei</td></tr>
</tbody></table>
<div class="warn-box">⚠️ <strong>Profesorský výkričník:</strong> Ak poviete „aus die Slowakei", znie to pre Nemca asi tak, ako pre vás „pochádzam zo ten dom". Povedzte si desaťkrát nahlas: <em>„aus der Slowakei"</em>!</div>`,
      examples: [
        { de: 'Woher kommst du?', sk: 'Odkiaľ (z akého vnútra) pochádzaš?' },
        { de: 'Ich komme aus Deutschland.', sk: 'Pochádzam z Nemecka.', note: 'Obyčajná krajina, žiadne špeciálne pravidlá.' },
        { de: 'Ich komme aus der Slowakei.', sk: 'Pochádzam zo Slovenska.', note: 'VIP krajina, meníme die -> der.' },
      ],
      slovakContrastNote: 'V slovenčine riešime koncovky slova (Slovensk-a, Nemeck-a). Nemčina nechá slovo na pokoji a mení len tú malú nálepku pred ním (člen: die -> der).'
    },
    {
      rule: 'Sloveso „sprechen" a zradná zmena kmeňa',
      explanation: `<p>Väčšina slovies v nemčine pekne drží tvar. Ale tie najstaršie a najviac používané slovesá (tzv. silné slovesá) robia prieky. Sloveso <strong>„sprechen"</strong> (hovoriť) sa priamo pred vašimi očami zmení.</p>
<p>Základná samohláska <strong>„e"</strong> sa v 2. a 3. osobe (ty, on/ona) prudko stiahne do ostrého <strong>„i"</strong>.</p>
<table><thead><tr><th>Osoba</th><th>Tvar a zmena</th></tr></thead><tbody>
<tr><td>ich</td><td>sprech<strong>e</strong> (Normálne E)</td></tr>
<tr><td>du</td><td>spr<strong>i</strong>chst (BUM! Zmena na I)</td></tr>
<tr><td>er / sie</td><td>spr<strong>i</strong>cht (BUM! Zmena na I)</td></tr>
<tr><td>wir</td><td>sprech<strong>en</strong> (Späť k normálu)</td></tr>
</tbody></table>
<div class="tip-box">💡 <strong>Tip Profesora:</strong> Prečo to tak je? Z čistej lenivosti našich predkov. „Sprichst" sa jednoducho vyslovuje rýchlejšie a ostrejšie ako „sprechst". Podobne to robí sloveso sehen (vidieť) -> du siehst.</div>`,
      examples: [
        { de: 'Sprichst du Deutsch?', sk: 'Hovoríš po nemecky?', note: 'Zatlač na to I!' },
        { de: 'Er spricht sehr gut.', sk: 'On hovorí veľmi dobre.' },
      ],
      slovakContrastNote: 'V slovenčine máme dokonalý poriadok (hovorím, hovoríš, hovorí - kmeň „hovor" sa ani nepohne). V nemčine musíte byť stále v strehu pri osobe TY a ON/ONA.'
    },
  ],
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
    { de: 'die Slowakei', sk: 'Slovensko', gender: 'F', srsId: 'L03_V14', example: 'Jana kommt aus der Slowakei.', exampleSk: 'Jana pochádza zo Slovenska.', recycledFrom: [] },
    { de: 'Slowakisch', sk: 'slovenčina', gender: 'N', srsId: 'L03_V15', example: 'Ich spreche Slowakisch.', exampleSk: 'Hovorím po slovensky.', recycledFrom: [] },
    { de: 'Ich komme aus...', sk: 'Pochádzam z...', gender: null, srsId: 'L03_V16', example: 'Ich komme aus der Slowakei.', exampleSk: 'Pochádzam zo Slovenska.', recycledFrom: [] }
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
        ['die Slowakei', 'Slovensko'],
        ['Slowakisch', 'slovenčina'],
        ['verstehen', 'rozumieť'],
        ['ein bisschen', 'trochu']
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
        { de: 'kommen', sk: 'pochádzať' },
        { de: 'sprechen', sk: 'hovoriť' },
        { de: 'das Land', sk: 'krajina' },
        { de: 'die Sprache', sk: 'jazyk' },
        { de: 'Österreich', sk: 'Rakúsko' },
        { de: 'die Schweiz', sk: 'Švajčiarsko' },
        { de: 'die Slowakei', sk: 'Slovensko' },
        { de: 'Slowakisch', sk: 'slovenčina' },
        { de: 'ein bisschen', sk: 'trochu' }
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
      text: 'Im Deutschkurs lernt Jana neue Leute kennen. Lukas kommt aus Österreich und spricht Deutsch und Englisch. Maria kommt aus Spanien — sie spricht ein bisschen Deutsch. Jana kommt aus der Slowakei und wohnt jetzt in Wien. Sie spricht Slowakisch und lernt Deutsch. Im Kurs sprechen alle zusammen Deutsch. Jana versteht schon viel. „Verstehst du Slowakisch?" — „Nein, leider nicht! Aber ich spreche gut Deutsch."',
      textSk: 'Na kurze nemčiny spoznáva Jana nových ľudí. Lukas pochádza z Rakúska a hovorí po nemecky a po anglicky. Maria pochádza zo Španielska — hovorí trochu po nemecky. Jana pochádza zo Slovenska a býva teraz vo Viedni. Hovorí po slovensky a učí sa nemčinu. Na kurze hovoria všetci spolu po nemecky. Jana už rozumie veľa. „Rozumieš po slovensky?" — „Nie, žiaľ nie! Ale hovorím dobre po nemecky."',
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
          question: 'Versteht jemand Slowakisch?',
          questionSk: 'Rozumie niekto po slovensky?',
          options: ['Ja, Lukas.', 'Ja, Maria.', 'Nein, leider nicht.', 'Ja, alle.'],
          answer: 2,
          explanation: 'Na otázku „Verstehst du Slowakisch?" je odpoveď: „Nein, leider nicht!"'
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
    },
    {
      type: 'translation',
      instruction: 'Prelož vety zo slovenčiny do nemčiny.',
      sentences: [
        {
          sk: 'Odkiaľ pochádzaš?',
          answer: 'Woher kommst du',
          hint: 'Woher...',
          explanation: 'Otázka na pôvod: „Woher kommst du?"'
        },
        {
          sk: 'Pochádzam zo Slovenska.',
          answer: 'Ich komme aus der Slowakei',
          hint: 'Ich komme aus...',
          explanation: 'Slowakei vyžaduje člen: „aus der Slowakei".'
        },
        {
          sk: 'Hovorím po nemecky.',
          answer: 'Ich spreche Deutsch',
          hint: 'Ich spreche...',
          explanation: 'Jazyky sa v nemčine píšu s veľkým začiatočným písmenom.'
        },
        {
          sk: 'Rozumiem trochu.',
          answer: 'Ich verstehe ein bisschen',
          hint: 'Ich verstehe...',
          explanation: '„Ein bisschen" je nemecký výraz pre „trochu/trošku".'
        }
      ]
    },
    {
      type: 'truefalse',
      instruction: 'Rozhodni, či je tvrdenie správne (Richtig) alebo nesprávne (Falsch).',
      statements: [
        {
          statement: '„Ich komme aus Schweiz" ist richtig.',
          isTrue: false,
          explanation: 'Nesprávne! Švajčiarsko vyžaduje člen: „Ich komme aus der Schweiz."'
        },
        {
          statement: '„Woher" fragt nach der Herkunft (pôvod).',
          isTrue: true,
          explanation: 'Správne! „Woher" = odkiaľ, pýta sa na pôvod.'
        },
        {
          statement: '„Du sprichst" — das Verb ändert sich von „e" zu „i".',
          isTrue: true,
          explanation: 'Správne! Sloveso „sprechen" mení kmeň: ich spreche, ale du sprichst.'
        },
        {
          statement: '„Deutschland" ist feminin (die Deutschland).',
          isTrue: false,
          explanation: 'Nemecko je stredného rodu a zvyčajne sa používa bez člena. Krajiny s členom: die Schweiz, die Slowakei, die Türkei.'
        },
        {
          statement: '„Ein bisschen" bedeutet „trochu".',
          isTrue: true,
          explanation: 'Správne! „Ein bisschen" = trochu, trošku.'
        }
      ]
    },
    {
      type: 'dictation',
      instruction: 'Počúvaj a zapíš nemeckú vetu.',
      sentences: [
        { de: 'Woher kommst du?', sk: 'Odkiaľ pochádzaš?', hint: '3 slová' },
        { de: 'Ich komme aus der Slowakei.', sk: 'Pochádzam zo Slovenska.' },
        { de: 'Ich spreche Deutsch.', sk: 'Hovorím po nemecky.', hint: '3 slová' },
        { de: 'Er spricht Englisch.', sk: 'On hovorí po anglicky.' },
        { de: 'Ich verstehe ein bisschen.', sk: 'Rozumiem trochu.' }
      ]
    },
    {
      type: 'categorysort',
      instruction: 'Roztrieď slová do správnych skupín.',
      categories: [
        { name: 'Krajiny (Länder)', color: 'blue', words: ['Deutschland', 'Österreich', 'die Schweiz', 'die Slowakei'] },
        { name: 'Jazyky (Sprachen)', color: 'green', words: ['Deutsch', 'Englisch', 'Slowakisch'] },
        { name: 'Slovesá (Verben)', color: 'amber', words: ['kommen', 'sprechen', 'verstehen'] }
      ],
      explanation: 'Krajiny sú miesta pôvodu (Deutschland, Österreich...). Jazyky sa v nemčine píšu s veľkým písmenom. Kommen, sprechen, verstehen sú slovesá.'
    },
    {
      type: 'conjugation',
      instruction: 'Vyplň správne tvary slovies kommen a sprechen.',
      verbs: [
        {
          infinitive: 'kommen',
          translation: 'pochádzať, prísť',
          forms: [
            { pronoun: 'ich', correct: 'komme' },
            { pronoun: 'du', correct: 'kommst' },
            { pronoun: 'er/sie/es', correct: 'kommt' },
          ],
          note: 'Sloveso „kommen" sa časuje pravidelne: kmeň + koncovka (-e, -st, -t).'
        },
        {
          infinitive: 'sprechen',
          translation: 'hovoriť',
          forms: [
            { pronoun: 'ich', correct: 'spreche' },
            { pronoun: 'du', correct: 'sprichst' },
            { pronoun: 'er/sie/es', correct: 'spricht' },
          ],
          note: 'Sloveso „sprechen" mení kmeňovú samohlásku e → i v 2. a 3. osobe: du sprichst, er spricht.'
        }
      ]
    }
  ],
  reviewWords: ['ich', 'du', 'und', 'ja', 'nein'],
  lessonNotes: 'Dôraz na správnu výslovnosť "spr" a "sch". Dôležité je tiež odlíšenie rodu pri krajinách.'
};
