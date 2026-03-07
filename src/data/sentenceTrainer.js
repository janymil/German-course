export const SENTENCE_UNITS = [
    {
        id: "unit_01",
        title: "Unit 1: Základy komunikácie",
        description: "Naučte sa pýtať a odpovedať, či niekto rozumie po anglicky alebo nemecky, a vyjadriť základné fakty o sebe.",
        audioSrc: "/audio/Lesson01.mp3",
        audioTitle: "Lekcia 1 – Základy komunikácie",
        vocab: [
            { de: "der Amerikaner", sk: "Američan", gender: "M", example: "Sie sind Amerikaner.", exampleSk: "Ste Američan." },
            { de: "das Deutsch", sk: "nemčina", gender: "N", example: "Ich verstehe Deutsch.", exampleSk: "Rozumiem po nemecky." },
            { de: "ein bisschen", sk: "trochu", gender: null, example: "Nur ein bisschen Deutsch.", exampleSk: "Iba trochu po nemecky." },
            { de: "das Englisch", sk: "angličtina", gender: "N", example: "Ich verstehe Englisch.", exampleSk: "Rozumiem po anglicky." },
            { de: "Entschuldigen Sie", sk: "prepáčte", gender: null, example: "Entschuldigen Sie, verstehen Sie Englisch?", exampleSk: "Prepáčte, rozumiete po anglicky?" },
            { de: "ich", sk: "ja", gender: null, example: "Ich verstehe.", exampleSk: "Rozumiem." },
            { de: "ja", sk: "áno", gender: null, example: "Ja, ein bisschen.", exampleSk: "Áno, trochu." },
            { de: "kein", sk: "nie / žiaden", gender: null, example: "Ich verstehe kein Deutsch.", exampleSk: "Nerozumiem po nemecky." },
            { de: "nein", sk: "nie", gender: null, example: "Nein, ich verstehe kein Englisch.", exampleSk: "Nie, nerozumiem po anglicky." },
            { de: "nur", sk: "iba / len", gender: null, example: "Ich verstehe nur ein bisschen.", exampleSk: "Rozumiem iba trochu." },
            { de: "Sie", sk: "vy (vykanie)", gender: null, example: "Sie verstehen Englisch.", exampleSk: "Vy rozumiete po anglicky." },
            { de: "sind", sk: "ste", gender: null, example: "Sind Sie Amerikaner?", exampleSk: "Ste Američan?" },
            { de: "verstehen", sk: "rozumieť", gender: null, example: "Verstehen Sie?", exampleSk: "Rozumiete?" }
        ],
        grammarNotes: [
            {
                rule: "Sloveso rozumieť (verstehen) a byť (sein)",
                explanation: "<p>Na vyjadrenie, že niečomu rozumieme, používame sloveso <strong>verstehen</strong>. Osoba \"Ich\" (ja) má koncovku <strong>-e</strong>. Osoba \"Sie\" (Vy - vykanie) má koncovku <strong>-en</strong>.</p><p>Sloveso byť (sein) pri vykaní má tvar <strong>sind</strong> (Ste).</p>",
                examples: [
                    { de: "Ich verstehe.", sk: "Ja rozumiem." },
                    { de: "Sie verstehen.", sk: "Vy rozumiete." },
                    { de: "Sie sind Amerikaner.", sk: "Vy ste Američan." }
                ],
                slovakContrastNote: "V nemčine musí byť podmet (ich, Sie) vždy vyjadrený! V slovenčine povieme 'Rozumiem', ale nemecky to musí byť 'Ich verstehe'."
            },
            {
                rule: "Zápor kein vs nein",
                explanation: "<p>Slovo <strong>Nein</strong> znamená 'Nie' - je to samostatná odpoveď na začiatku vety. Slovo <strong>kein</strong> popiera podstatné meno (napr. jazyk) - doslova znamená 'žiaden'.</p>",
                examples: [
                    { de: "Nein.", sk: "Nie." },
                    { de: "Ich verstehe kein Deutsch.", sk: "Nerozumiem po nemecky. (Doslova: Rozumiem kúsok nemčiny.)" }
                ],
                slovakContrastNote: "Na popretie jazyka nepoužívame nemecké 'nicht', ale povieme, že rozumieme 'žiadnu nemčinu' pomocou 'kein'."
            }
        ],
        exercises: [
            {
                type: 'match',
                instruction: 'Spoj nemecké slovíčka a frázy so slovenskými.',
                pairs: [
                    ['Amerikaner', 'Američan'],
                    ['Deutsch', 'nemčina'],
                    ['ein bisschen', 'trochu'],
                    ['Englisch', 'angličtina'],
                    ['Entschuldigen Sie', 'prepáčte'],
                    ['verstehen', 'rozumieť']
                ]
            },
            {
                type: 'flashcard',
                instruction: 'Kartičky s pamäťovým algoritmom. Cvič dovtedy, kým nebudeš všetky slovíčka perfektne ovládať.',
            },
            {
                type: 'truefalse',
                instruction: 'Gramatický kvíz. Rozhodni, či sú gramatické pravidlá pravdivé alebo nepravdivé.',
                statements: [
                    { statement: 'Slovíčko „nein" sa používa ako samostatná záporná odpoveď (Nie).', isTrue: true, explanation: 'Napríklad: Verstehen Sie? - Nein.' },
                    { statement: 'Slovíčko „kein" sa používa na popretie podstatných mien.', isTrue: true, explanation: 'Správne. Napríklad: Ich verstehe kein Englisch.' },
                    { statement: 'Keď vykáme pomocou „Sie", sloveso má koncovku -e (napr. Sie verstehe).', isTrue: false, explanation: 'Nesprávne! Pri vykaní má sloveso koncovku -en: Sie verstehen.' },
                    { statement: 'V nemeckej otázke sa sloveso vždy nachádza na konci vety.', isTrue: false, explanation: 'Nesprávne! V otázke (bez opytovacieho slova) začína veta slovesom: Vestehen Sie?' }
                ]
            },
            {
                type: 'wordorder',
                instruction: 'Skladanie viet. Zostav vety v správnom poradí.',
                sentences: [
                    { words: ['Verstehen', 'Sie', 'Englisch'], correct: 'Verstehen Sie Englisch', hint: 'Rozumiete po anglicky?' },
                    { words: ['Sie', 'sind', 'Amerikaner'], correct: 'Sie sind Amerikaner', hint: 'Ste Američan.' },
                    { words: ['verstehe', 'Ich', 'nur', 'bisschen', 'ein'], correct: 'Ich verstehe nur ein bisschen', hint: 'Rozumiem len trochu.' },
                    { words: ['Ich', 'verstehe', 'kein', 'Deutsch'], correct: 'Ich verstehe kein Deutsch', hint: 'Nerozumiem po nemecky.' }
                ]
            },
            {
                type: 'fill',
                instruction: 'Doplň chýbajúce slovo alebo koncovku do vety.',
                questions: [
                    { sentence: 'Ich versteh___ kein Deutsch.', answer: 'e', hint: 'koncovka pre "Ich"', explanation: 'Pre osobu "Ich" je koncovka -e (verstehe).' },
                    { sentence: 'Versteh___ Sie?', answer: 'en', hint: 'koncovka pre "Sie"', explanation: 'Pre vykanie "Sie" je koncovka -en (verstehen).' },
                    { sentence: 'Ich verstehe ___ Englisch.', answer: 'kein', hint: 'žiaden (zápor pre jazyk)', explanation: 'Na popretie jazyka či iného podstatného mena použijeme "kein".' },
                    { sentence: '___, ich verstehe ein bisschen.', answer: 'Ja', hint: 'Áno', explanation: 'Na začiatku kladnej vety odpovedáme Ja.' }
                ]
            },
            {
                type: 'translation',
                instruction: 'Písomný preklad. Prelož vety zo slovenčiny do nemčiny.',
                sentences: [
                    { sk: 'Prepáčte.', answer: 'Entschuldigen Sie', hint: 'Entschuldigen...' },
                    { sk: 'Rozumiem.', answer: 'Ich verstehe', hint: 'Ich...' },
                    { sk: 'Vy rozumiete.', answer: 'Sie verstehen', hint: 'Sie...' },
                    { sk: 'Nerozumiem po anglicky.', answer: 'Ich verstehe kein Englisch', hint: 'Ich verstehe k...' },
                    { sk: 'Iba trochu po nemecky.', answer: 'Nur ein bisschen Deutsch', hint: 'Nur ein...' },
                    { sk: 'Áno, rozumiem po anglicky.', answer: 'Ja, ich verstehe Englisch', hint: 'Ja, ich...' }
                ]
            },
            {
                type: 'speaking',
                instruction: 'Tréning plynulosti. Vypočuj si nemecké vety a nahlas ich zopakuj mikrofonu.',
                phrases: [
                    { de: 'Entschuldigen Sie.', sk: 'Prepáčte.', tip: 'Entschuldigen Sie.' },
                    { de: 'Verstehen Sie Englisch?', sk: 'Rozumiete po anglicky?', tip: 'Otázka letí intonačne nahor.' },
                    { de: 'Nein, ich verstehe kein Englisch.', sk: 'Nie, nerozumiem po anglicky.', tip: 'Nein.' },
                    { de: 'Ich verstehe nur ein bisschen Deutsch.', sk: 'Rozumiem iba trochu po nemecky.', tip: 'nur ein bisschen' },
                    { de: 'Sind Sie Amerikaner?', sk: 'Ste Američan?', tip: 'Amerikaner' }
                ]
            },
            {
                type: 'dialogue',
                instruction: 'Rozhovor! Odpovedz na otázky v simulovanom dialógu.',
                conversation: [
                    { speaker: 'A', de: 'Entschuldigen Sie. Verstehen Sie Deutsch?', sk: 'Prepáčte. Rozumiete po nemecky?', audioPrompt: true },
                    {
                        speaker: 'B',
                        playerTurn: true,
                        sk: 'Odpoveď: Nie, nerozumiem.',
                        options: [
                            { de: 'Nein, ich verstehe kein Deutsch.', correct: true },
                            { de: 'Ja, ich verstehe Deutsch.', correct: false },
                            { de: 'Ich bin Amerikaner.', correct: false }
                        ]
                    },
                    { speaker: 'A', de: 'Ah. Verstehen Sie Englisch?', sk: 'Ah. Rozumiete po anglicky?', audioPrompt: true },
                    {
                        speaker: 'B',
                        playerTurn: true,
                        sk: 'Odpoveď: Áno.',
                        options: [
                            { de: 'Nein, nur ein bisschen.', correct: false },
                            { de: 'Ja, ich verstehe Englisch.', correct: true },
                            { de: 'Entschuldigen Sie.', correct: false }
                        ]
                    },
                    { speaker: 'A', de: 'Sind Sie Amerikaner?', sk: 'Ste Američan?', audioPrompt: true },
                    {
                        speaker: 'B',
                        playerTurn: true,
                        sk: 'Odpoveď: Áno, trochu.',
                        options: [
                            { de: 'Nein, ich verstehe kein Englisch.', correct: false },
                            { de: 'Ja, ein bisschen.', correct: true }
                        ]
                    }
                ]
            }
        ]
    }
]
