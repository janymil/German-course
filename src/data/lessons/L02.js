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
  grammarNotes: [
    {
      rule: 'W-Fragen: Majáky nemeckého hľadania informácií',
      explanation: `<p>Viete, ako začnete hľadať pevné fakty? Pomocou W-slov, ktoré znejú a plnia funkciu záchytných bodov, čiže majákov. Nemci idú priamo na vec, žiadna vata na začiatku. Otázka sa opiera o W, oprie sa oň celá intonácia a hneď viete, na čom ste.</p>
<table><thead><tr><th>W-Wort</th><th>Význam a emócia</th><th>Príklad</th></tr></thead><tbody>
<tr><td><strong>wie</strong></td><td>ako (spôsob)</td><td>Wie heißt du?</td></tr>
<tr><td><strong>was</strong></td><td>čo (vec, abstrakcia)</td><td>Was ist das?</td></tr>
<tr><td><strong>wo</strong></td><td>kde (miesto)</td><td>Wo bist du?</td></tr>
<tr><td><strong>wer</strong></td><td>kto (osoba)</td><td>Wer ist das?</td></tr>
<tr><td><strong>woher</strong></td><td>odkiaľ (pôvod)</td><td>Woher kommst du?</td></tr>
</tbody></table>
<div class="tip-box">💡 <strong>Tip Profesora:</strong> Predstavte si, že každé z týchto slov má v sebe úder na bubon dopytu. Intonácia u W-Fragen nenecháva hlas ísť na konci vysoko nahor (ako v slovenčine). Ide dolu, pretože si pýtame fakt, nie súhlas.</div>`,
      examples: [
        { de: 'Wie heißt du?', sk: 'Ako sa voláš?' },
        { de: 'Was ist das?', sk: 'Čo je to?' },
        { de: 'Wo bist du?', sk: 'Kde si?' },
      ],
      slovakContrastNote: 'V slovenčine vytiahneme hlas do výšin: "A ty sa voláš AKOOO?". Nemec ide rázne a dospodu: "WIE heißt du.".'
    },
    {
      rule: 'Srdce vety: Posvätná 2. pozícia slovesa',
      explanation: `<p>Toto si zapíšte za uši! V slovenčine si slová hádžeme, ako sa nám páči. "Kde si?", "Si kde?". Všetko prejde.</p>
<p>Nemčina je inžinierske dielo. Má presný mechanizmus. Motorom vety je vždy <strong>Sloveso (časované)</strong> a pri W-otázke (aj pri bežnej oznamovacej vete) ho musia Nemci počuť na pevnej <strong>DRUHEJ POZÍCII</strong>.</p>
<ol>
<li><strong>Pozícia 1:</strong> Návesť (Opytovacie slovo: Wie, Wo...)</li>
<li><strong>Pozícia 2: MOTOR VETY: Sloveso</strong></li>
<li><strong>Pozícia 3:</strong> Podmet (kto ten motor poháňa)</li>
</ol>
<table><thead><tr><th>Pozícia 1 (Návesť)</th><th>Pozícia 2 (Motor)</th><th>Pozícia 3 (Vykonávateľ)</th></tr></thead><tbody>
<tr><td>Wie</td><td><strong>heißt</strong></td><td>du?</td></tr>
<tr><td>Wo</td><td><strong>bist</strong></td><td>du?</td></tr>
<tr><td>Was</td><td><strong>ist</strong></td><td>das?</td></tr>
</tbody></table>
<div class="warn-box">⚠️ <strong>Varovanie Profesora:</strong> Ak dáte sloveso na koniec a poviete "Wie du heißt?" - ukázali ste, že váš nemecký motor má vyskočený remeň. Nedá sa to počúvať. Sloveso pevne na miesto č. 2!</div>`,
      examples: [
        { de: 'Wo wohnst du?', sk: 'Kde bývaš?', note: '1. Návesť (Wo) → 2. Motor (wohnst)' },
        { de: 'Wer ist das?', sk: 'Kto je to?' },
      ],
      slovakContrastNote: 'Slovenský slovosled je ako tekutina, prispôsobí sa nálade ("Bývaš kde ty?"). Nemecký slovosled je Lego stavebnica. Dieliky musia zacvaknúť na presné piny.'
    },
  ],
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
        { de: 'Wo bist du?', sk: 'Kde si?' },
        { de: 'lernen', sk: 'učiť sa' },
        { de: 'schlecht', sk: 'zle, zlý' }
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
      text: 'Heute beginnt der Deutschkurs. Jana ist ein bisschen nervös. Im Kurs sind zehn Personen. Die Lehrerin heißt Frau Schmidt. Sie ist sehr nett. „Guten Tag! Wie heißen Sie?" Alle sagen ihren Namen. Jana lernt Anna kennen. Anna kommt aus Polen und ist auch neu in Wien. „Wie geht es dir, Jana?" — „Gut, danke! Und dir?" — „Auch gut!" Sie lernen zusammen. Der Deutschkurs ist toll.',
      textSk: 'Dnes začína kurz nemčiny. Jana je trochu nervózna. V kurze je desať osôb. Učiteľka sa volá pani Schmidtová. Je veľmi milá. „Dobrý deň! Ako sa voláte?" Všetci povedia svoje meno. Jana spoznáva Annu. Anna pochádza z Poľska a je tiež nová vo Viedni. „Ako sa máš, Jana?" — „Dobre, ďakujem! A ty?" — „Tiež dobre!" Učia sa spolu. Kurz nemčiny je skvelý.',
      questions: [
        {
          question: 'Wie heißt die Lehrerin?',
          questionSk: 'Ako sa volá učiteľka?',
          options: ['Jana', 'Anna', 'Frau Schmidt', 'Maria'],
          answer: 2,
          explanation: 'Text hovorí: "Die Lehrerin heißt Frau Schmidt."'
        },
        {
          question: 'Woher kommt Anna?',
          questionSk: 'Odkiaľ pochádza Anna?',
          options: ['Aus der Slowakei', 'Aus Deutschland', 'Aus Polen', 'Aus Österreich'],
          answer: 2,
          explanation: 'Text hovorí: "Anna kommt aus Polen und ist auch neu in Wien."'
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
    },
    {
      type: 'truefalse',
      instruction: 'Rozhodni, či je tvrdenie správne (Richtig) alebo nesprávne (Falsch).',
      statements: [
        {
          statement: '„Wie" fragt nach dem Ort.',
          isTrue: false,
          explanation: '„Wie" bedeutet „ako" und fragt nach der Art/Weise. „Wo" fragt nach dem Ort (kde).'
        },
        {
          statement: 'In einer W-Frage steht das Verb an zweiter Stelle.',
          isTrue: true,
          explanation: 'Správne! V W-otázke je sloveso vždy na 2. mieste: Wie heißt du?'
        },
        {
          statement: '„Was" fragt nach einer Person.',
          isTrue: false,
          explanation: '„Was" fragt nach Dingen (čo). Nach Personen fragt man mit „Wer" (kto).'
        },
        {
          statement: '„Gut" ist das Gegenteil von „schlecht".',
          isTrue: true,
          explanation: 'Správne! Gut (dobrý) je opakom slova schlecht (zlý).'
        },
        {
          statement: '„Richtig oder falsch?" ist eine W-Frage.',
          isTrue: false,
          explanation: 'Nie je to W-otázka, pretože nezačína W-slovom. Je to Ja/Nein-otázka.'
        }
      ]
    },
    {
      type: 'translation',
      instruction: 'Prelož vety zo slovenčiny do nemčiny.',
      sentences: [
        {
          sk: 'Ako sa máš?',
          answer: 'Wie geht es dir',
          hint: 'Wie...',
          explanation: 'Ustálená fráza: „Wie geht es dir?" — doslova „Ako ide to tebe?"'
        },
        {
          sk: 'Čo je to?',
          answer: 'Was ist das',
          hint: 'Was...',
          explanation: '„Was" = čo, „ist" = je, „das" = to.'
        },
        {
          sk: 'Kde si?',
          answer: 'Wo bist du',
          hint: 'Wo...',
          explanation: '„Wo" sa pýta na miesto. Sloveso „bist" na 2. mieste.'
        },
        {
          sk: 'To je správne.',
          answer: 'Das ist richtig',
          hint: 'Das ist...',
          explanation: '„Richtig" = správne, opak „falsch".'
        }
      ]
    },
    {
      type: 'dictation',
      instruction: 'Počúvaj a zapíš nemeckú vetu.',
      sentences: [
        { de: 'Wie heißt du?', sk: 'Ako sa voláš?', hint: '3 slová' },
        { de: 'Wo bist du?', sk: 'Kde si?', hint: '3 slová' },
        { de: 'Das ist richtig.', sk: 'To je správne.' },
        { de: 'Die Frau lernt Deutsch.', sk: 'Žena sa učí nemčinu.', hint: '4 slová' },
        { de: 'Was ist das?', sk: 'Čo je to?' }
      ]
    },
    {
      type: 'categorysort',
      instruction: 'Roztrieď slová do správnych skupín.',
      categories: [
        { name: 'W-Fragen (opytovacie)', color: 'blue', words: ['wie', 'was', 'wo', 'wer'] },
        { name: 'Pozitívne', color: 'green', words: ['gut', 'richtig'] },
        { name: 'Negatívne', color: 'rose', words: ['schlecht', 'falsch'] }
      ],
      explanation: 'W-otázky začínajú opytovacím slovom (wie, was, wo, wer). Gut a richtig majú pozitívny význam, schlecht a falsch negatívny.'
    }
  ],
  reviewWords: ['sein', 'heißen', 'ich', 'du'],
  lessonNotes: 'Študent si musí osvojiť najmä spojitosti opytovacích zámien: Was - vec, Wer - osoba, Wie - spôsob. Dôraz sa kladie aj na výslovnosť w [v].'
};
