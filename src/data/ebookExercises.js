export const EBOOK_EXERCISES = {
    'ebook_01': [
        {
            chapter: 1,
            title: "zu Kapitel 1",
            exercises: [
                {
                    type: 'fill_in',
                    title: "1. Wie gut kennen Sie Fender schon? Ergänzen Sie.",
                    options: ["Detektivbüro", "Kaffee", "Detektiv", "Wien", "neugierig"],
                    questions: [
                        { id: '1a', text: "a) Fender ist ein {input}.", answer: "Detektiv" },
                        { id: '1b', text: "b) Fender trinkt gern {input}.", answer: "Kaffee" },
                        { id: '1c', text: "c) Fender ist {input}.", answer: "neugierig" },
                        { id: '1d', text: "d) Fender wohnt in {input}.", answer: "Wien" },
                        { id: '1e', text: "e) Fender hat ein {input}.", answer: "Detektivbüro" }
                    ]
                },
                {
                    type: 'true_false',
                    title: "2. Der Mord. Was wissen Sie schon? Richtig (r) oder falsch (f)? Kreuzen Sie an.",
                    questions: [
                        { id: '2a', text: "a) Klara Kainz ist ermordet worden.", answer: "r" },
                        { id: '2b', text: "b) Sie war Deutschstudentin.", answer: "f" },
                        { id: '2c', text: "c) Sie war in einem sehr guten Fußballclub.", answer: "r" },
                        { id: '2d', text: "d) Eine Frau hat Klara tot am Gallitzinberg gefunden.", answer: "f" },
                        { id: '2e', text: "e) Die Polizei kennt den Mörder.", answer: "f" }
                    ]
                },
                {
                    type: 'matching',
                    title: "3. Der Brief. Fender hat viele Fragen. Verbinden Sie.",
                    left: [
                        { id: 'a', text: "a) Wer" },
                        { id: 'b', text: "b) Warum" },
                        { id: 'c', text: "c) Ist der Briefschreiber" },
                        { id: 'd', text: "d) Kommt der Brief" },
                        { id: 'e', text: "e) Kennt der" }
                    ],
                    right: [
                        { id: '1', text: "1) Briefschreiber mich?" },
                        { id: '2', text: "2) wirklich der Mörder?" },
                        { id: '3', text: "3) schreibt er mir?" },
                        { id: '4', text: "4) schreibt mir diesen Brief?" },
                        { id: '5', text: "5) von einem Mann oder einer Frau?" }
                    ],
                    answers: { "a": "4", "b": "3", "c": "2", "d": "5", "e": "1" }
                }
            ]
        },
        {
            chapter: 2,
            title: "zu Kapitel 2",
            exercises: [
                {
                    type: 'multiple_choice_multi',
                    title: "1. Am Gallitzinberg. Was ist richtig? Kreuzen Sie an. Es gibt immer zwei richtige Antworten.",
                    questions: [
                        { 
                            id: '2_1a', text: "a) Am Gallitzinberg gibt es", 
                            options: ["1) einen schönen Blick über Wien.", "2) eine große Straße.", "3) viele Bäume."], 
                            answers: [0, 2] 
                        },
                        { 
                            id: '2_1b', text: "b) Vom Gallitzinberg sieht man", 
                            options: ["1) den Stephansdom.", "2) die Donau.", "3) die Hofburg."], 
                            answers: [0, 2] 
                        },
                        { 
                            id: '2_1c', text: "c) Im Café sind", 
                            options: ["1) viele Touristen.", "2) drei ältere Leute aus Wien.", "3) viele Kinder."], 
                            answers: [0, 1] 
                        },
                        { 
                            id: '2_1d', text: "d) Die Leute am Tisch neben Fender reden über", 
                            options: ["1) den Mord.", "2) das Wetter.", "3) den guten Kuchen."], 
                            answers: [0, 1] 
                        }
                    ]
                },
                {
                    type: 'fill_in',
                    title: "2. Ergänzen Sie Fenders Notizen.",
                    options: ["gewohnt", "Morgen", "gut", "bald", "Freund"],
                    questions: [
                        { id: '2_2a', text: "a) Klara hat am Gallitzinberg {input}.", answer: "gewohnt" },
                        { id: '2_2b', text: "b) Sie ist dort jeden {input} gelaufen.", answer: "Morgen" },
                        { id: '2_2c', text: "c) Sie hat sehr {input} Fußball gespielt.", answer: "gut" },
                        { id: '2_2d', text: "d) Ihr Fußballclub spielt {input} in der Profiliga.", answer: "bald" },
                        { id: '2_2e', text: "e) Sie hatte vielleicht einen {input}.", answer: "Freund" }
                    ]
                },
                {
                    type: 'fill_in',
                    title: "3. Was ist richtig? Ordnen Sie zu.",
                    options: ["aufklären", "Tatort", "ermordet", "Mörder", "Verdacht"],
                    questions: [
                        { id: '2_3a', text: "a) Klara ist jetzt tot: Jemand hat sie {input}.", answer: "ermordet" },
                        { id: '2_3b', text: "b) Fender weiß nicht: Wer hat Klara ermordet? Wer ist der {input}?", answer: "Mörder" },
                        { id: '2_3c', text: "c) Fender ist jetzt am {input}. Dort ist der Mord passiert.", answer: "Tatort" },
                        { id: '2_3d', text: "d) Fender weiß nicht: Wer ist der Mörder? Aber er hat einen {input}.", answer: "Verdacht" },
                        { id: '2_3e', text: "e) Fender will den Mörder finden. Er will den Mord {input}.", answer: "aufklären" }
                    ]
                }
            ]
        },
        {
            chapter: 3,
            title: "zu Kapitel 3",
            exercises: [
                {
                    type: 'multiple_choice',
                    title: "1. Was ist richtig? Kreuzen Sie an.",
                    questions: [
                        {
                            id: '3_1a', text: "a) Wenn die Fußballerinnen vom FC Vienna Women am Wochenende gewinnen, dann",
                            options: ["1) freut sich Fender.", "2) spielen sie nächstes Jahr in der Profiliga.", "3) bekommen sie einen tollen Preis."],
                            answer: 1
                        },
                        {
                            id: '3_1b', text: "b) Warum sagt Fender: „Ich bin ein Journalist.“?",
                            options: ["1) Keiner will mit einem Detektiv reden.", "2) Er hat früher für eine Zeitung gearbeitet.", "3) Alle lieben Journalisten."],
                            answer: 0
                        },
                        {
                            id: '3_1c', text: "c) Wen trifft Fender auf dem Fußballplatz?",
                            options: ["1) Die Polizei.", "2) Die Trainerin und den Arzt.", "3) Die Trainerin und den Präsidenten."],
                            answer: 2
                        },
                        {
                            id: '3_1d', text: "d) Fender sagt: „Vielleicht ist eine Spielerin froh über den Mord.“ Warum?",
                            options: ["1) Keine mochte Klara Kainz.", "2) Sie bekommt jetzt Klaras Platz in der Mannschaft.", "3) Sie will nicht mit Klara spielen."],
                            answer: 1
                        }
                    ]
                },
                {
                    type: 'crossword_simple',
                    title: "2. Ergänzen Sie die Buchstaben und finden Sie die Lösung.",
                    questions: [
                        { id: '3_2a', text: "a) Am Sonntag ist ein wichtiges _ P I E L", answer: "S" },
                        { id: '3_2b', text: "b) Wenn Fußball spielen ihr Beruf ist, ist sie ein _ R O F I", answer: "P" },
                        { id: '3_2c', text: "c) Man muss viel _, wenn man ein Spiel gewinnen will: T R A I N I E R E _", answer: "N" },
                        { id: '3_2d', text: "d) Alle Spielerinnen zusammen sind die M A N _ S C H A F T", answer: "N" },
                        { id: '3_2e', text: "e) Der Chef des Fußballclubs ist der P R Ä S I D E N _", answer: "T" },
                        { id: '3_2f', text: "f) Julia Kalman spielt in einem sehr guten F U S S B _ L L C L U B", answer: "A" },
                        { id: '3_2g', text: "g) Im nächsten Jahr spielt die Mannschaft vielleicht in der P R O F I L I _ A", answer: "G" }
                    ],
                    solution: "SONNTAG"
                }
            ]
        },
        {
            chapter: 4,
            title: "zu Kapitel 4",
            exercises: [
                {
                    type: 'ordering',
                    title: "1. Was passiert wann? Ordnen Sie die Sätze von 1 bis 9.",
                    items: [
                        { id: 'W', text: "Fender telefoniert mit Julia Kalman.", initialOrder: 1, correctOrder: 1 },
                        { id: 'E', text: "Julia sitzt in einem Café.", initialOrder: 8, correctOrder: 2 },
                        { id: 'R', text: "Fender ist kurz vor halb zehn in der Bandgasse.", initialOrder: 0, correctOrder: 3 },
                        { id: 'B', text: "Fender und Julia wollen sich um halb zehn treffen.", initialOrder: 3, correctOrder: 4 },
                        { id: 'I', text: "Fender wartet bis Viertel vor zehn.", initialOrder: 7, correctOrder: 5 },
                        { id: 'S', text: "Julia ist nicht da und sie geht auch nicht ans Telefon.", initialOrder: 6, correctOrder: 6 },
                        { id: 'T', text: "Ein grünes Auto kommt.", initialOrder: 4, correctOrder: 7 },
                        { id: 'D', text: "Fender springt zur Seite.", initialOrder: 2, correctOrder: 8 },
                        { id: 'U', text: "Fender lebt noch.", initialOrder: 5, correctOrder: 9 }
                    ],
                    solutionWord: "WERBISTDU"
                },
                {
                    type: 'fill_in',
                    title: "2. Fender hat viele Fragen. Ergänzen Sie.",
                    options: ["Wer", "Warum", "Will", "Hat"],
                    questions: [
                        { id: '4_2a', text: "a) {input} ist in dem grünen Auto?", answer: "Wer" },
                        { id: '4_2b', text: "b) {input} ist Julia nicht gekommen?", answer: "Warum" },
                        { id: '4_2c', text: "c) {input} Julia mich umbringen?", answer: "Will" },
                        { id: '4_2d', text: "d) {input} der Autofahrer mich nicht gesehen?", answer: "Hat" }
                    ]
                }
            ]
        },
        {
            chapter: 5,
            title: "zu Kapitel 5",
            exercises: [
                {
                    type: 'matching',
                    title: "1. Was passt zusammen? Verbinden Sie.",
                    subtitle: "Julias E-Mail",
                    left: [
                        { id: 'a', text: "a) Warum entschuldigt sich Julia?" },
                        { id: 'b', text: "b) Warum ist Julia nicht in die Bandgasse gekommen?" },
                        { id: 'c', text: "c) Warum hat Julia gestern nicht angerufen?" },
                        { id: 'd', text: "d) An wen denkt Fender bei dem Brief?" },
                        { id: 'e', text: "e) Warum war Christian böse auf Fender?" }
                    ],
                    right: [
                        { id: '1', text: "1) Sie wollten beide die gleiche Freundin." },
                        { id: '2', text: "2) Sie konnte Fender gestern nicht treffen." },
                        { id: '3', text: "3) An Christian, einen Jungen aus seiner Schule." },
                        { id: '4', text: "4) Ihre Mutter ist im Krankenhaus." },
                        { id: '5', text: "5) Ihr Handy hat nicht funktioniert." }
                    ],
                    answers: { "a": "2", "b": "4", "c": "5", "d": "3", "e": "1" }
                },
                {
                    type: 'who_said_it',
                    title: "2. Fender und Julia treffen sich im Café Hummel. Wer sagt was?",
                    roles: ["Fender", "Julia"],
                    questions: [
                        { id: '5_2a', text: "a) Klaras Ex-Freund ist vielleicht der Mörder.", answer: "Julia" },
                        { id: '5_2b', text: "b) Vielleicht kenne ich schon die Mörderin.", answer: "Fender" },
                        { id: '5_2c', text: "c) Klara war meine beste Freundin.", answer: "Julia" },
                        { id: '5_2d', text: "d) Klaras Tod ist nicht nur schlecht für Sie.", answer: "Fender" },
                        { id: '5_2e', text: "e) Sie spielen im nächsten Jahr vielleicht in der Profimannschaft.", answer: "Fender" }
                    ]
                },
                {
                    type: 'fill_in_free',
                    title: "3. Was wissen Sie über Julia Kalman? Ergänzen Sie.",
                    questions: [
                        { id: '5_3a', text: "a) Klara war Julias {input}.", answer: "beste Freundin", alt: "Freundin" },
                        { id: '5_3b', text: "b) Fender denkt: Julia ist wahrscheinlich nicht {input}.", answer: "die Mörderin" },
                        { id: '5_3c', text: "c) Sie glaubt: Klaras Ex-Freund ist {input}.", answer: "der Mörder" },
                        { id: '5_3d', text: "d) Sie sagt zu Fender: {input} den Mörder.", answer: "Finden Sie", alt: "finden Sie" }
                    ]
                }
            ]
        },
        {
            chapter: 6,
            title: "zu Kapitel 6",
            exercises: [
                {
                    type: 'true_false',
                    title: "1. Was passt zu Harald? Richtig (r) oder falsch (f)? Kreuzen Sie an.",
                    questions: [
                        { id: '6_1a', text: "a) Er hat Klara geliebt.", answer: "r" },
                        { id: '6_1b', text: "b) Er spricht gern mit Fender.", answer: "f" },
                        { id: '6_1c', text: "c) Er hat Klara geschlagen.", answer: "r" },
                        { id: '6_1d', text: "d) Er ist seit fünf Wochen nicht mehr mit Klara zusammen.", answer: "f" },
                        { id: '6_1e', text: "e) Er wollte sich bei Klara entschuldigen.", answer: "r" },
                        { id: '6_1f', text: "f) Er sagt: „Ich bin am Dienstag um sechs Uhr morgens im Bett gewesen.“", answer: "r" }
                    ]
                },
                {
                    type: 'fill_in',
                    title: "2. Das sagt Fender über Harald. Ordnen Sie zu.",
                    options: ["Dienstagmorgen", "sehr gute", "gehen", "teure", "traurig"],
                    questions: [
                        { id: '6_2a', text: "a) Er wollte Klara nicht {input} lassen.", answer: "gehen" },
                        { id: '6_2b', text: "b) Er hat Klara oft angerufen und {input} Geschenke für sie gekauft.", answer: "teure" },
                        { id: '6_2c', text: "c) Er hat sich nicht gefreut, dass Klara eine {input} Fußballerin war.", answer: "sehr gute" },
                        { id: '6_2d', text: "d) Er ist {input} über Klaras Tod.", answer: "traurig" },
                        { id: '6_2e', text: "e) Vielleicht war er am {input} am Gallitzinberg.", answer: "Dienstagmorgen" }
                    ]
                }
            ]
        },
        {
            chapter: 7,
            title: "zu Kapitel 7",
            exercises: [
                {
                    type: 'multiple_choice',
                    title: "1. In Julias Garten. Was ist richtig? Kreuzen Sie an.",
                    questions: [
                        { 
                            id: '7_1a', text: "a) Warum hilft die Polizei Julia nicht?", 
                            options: ["1) Die Polizisten mögen Julia nicht.", "2) Der Mann im Garten ist selbst ein Polizist.", "3) Die Polizisten denken: Vielleicht ist gar kein Mann im Garten."],
                            answer: 2
                        },
                        { 
                            id: '7_1b', text: "b) Was macht der Mann im Garten?", 
                            options: ["1) Er sieht die Blumen an.", "2) Er sieht die ganze Zeit zum Haus.", "3) Er wartet auf Fender."],
                            answer: 1
                        },
                        { 
                            id: '7_1c', text: "c) Warum läuft der Mann weg?", 
                            options: ["1) Er will weg von Julia.", "2) Er ist schon müde und möchte nach Hause.", "3) Er hört und sieht Fender."],
                            answer: 2
                        },
                        { 
                            id: '7_1d', text: "d) Warum kann Fender den Mann nicht stoppen?", 
                            options: ["1) Fender ist sehr müde.", "2) Der Mann kennt den Garten gut, er war schon oft hier.", "3) Fender trinkt zuerst einen Kaffee."],
                            answer: 1
                        }
                    ]
                },
                {
                    type: 'strike_through',
                    title: "2. Der unbekannte Mann. Streichen Sie die falschen Sätze durch.",
                    questions: [
                        { 
                            id: '7_2a', text: "a) Fender findet einen Kaffeebecher im Garten.",
                            options: ["Er ist von Julias Lieblingscafé.", "Er ist schon sehr alt."],
                            wrongIndex: 1
                        },
                        { 
                            id: '7_2b', text: "b) Julia kennt den Chef von Coffee&Co.",
                            options: ["Sie ist in ihn verliebt.", "Er ist in sie verliebt."],
                            wrongIndex: 0
                        },
                        { 
                            id: '7_2c', text: "c) Chris ist kurz für Christian.",
                            options: ["So heißt auch der Junge aus Fenders Schule.", "So heißt auch Julias Bruder."],
                            wrongIndex: 1
                        },
                        { 
                            id: '7_2d', text: "d) Chris hat eine Narbe über dem Auge.",
                            options: ["Fender glaubt, er ist nicht der Christian aus seiner Klasse.", "Julia glaubt, Fender kennt Chris."],
                            wrongIndex: 1
                        },
                        { 
                            id: '7_2e', text: "e) Fender bleibt noch ein bisschen bei Julia.",
                            options: ["Er will nicht nach Hause gehen.", "Vielleicht kommt der Mann zurück."],
                            wrongIndex: 0
                        }
                    ]
                }
            ]
        },
        {
            chapter: 8,
            title: "zu Kapitel 8",
            exercises: [
                {
                    type: 'fill_in_free',
                    title: "1. Die Verdächtigen. Hören und ergänzen Sie.",
                    questions: [
                        { id: '8_1a', text: "a) {input} wollte nicht, dass Klara einen neuen Freund hat.", answer: "Harald", alt: "Ex-Freund" },
                        { id: '8_1b', text: "b) {input} hat ihre beste Freundin wahrscheinlich nicht ermordet.", answer: "Julia" },
                        { id: '8_1c', text: "c) Eine andere {input} kann jetzt in die Profimannschaft.", answer: "Fußballerin", alt: "Spielerin" },
                        { id: '8_1d', text: "d) Der {input} will Fender vielleicht nur ärgern.", answer: "Briefeschreiber" }
                    ]
                },
                {
                    type: 'fill_in_free',
                    title: "2. Chris ist Christian. In welchem Kapitel steht das zum ersten Mal? Ergänzen Sie die Kapitelnummer.",
                    questions: [
                        { id: '8_2a', text: "a) Christian ist der Chef von Coffee & Co. Kapitel {input}", answer: "7" },
                        { id: '8_2b', text: "b) Christian war mit Fender in der Schule. Kapitel {input}", answer: "5" },
                        { id: '8_2c', text: "c) Christian mag Fender nicht. Kapitel {input}", answer: "5" },
                        { id: '8_2d', text: "d) Christian ist wahrscheinlich in Julia verliebt. Kapitel {input}", answer: "7" },
                        { id: '8_2e', text: "e) Christian tötet Fender fast mit seinem grünen Auto. Kapitel {input}", answer: "4" },
                        { id: '8_2f', text: "f) Christian hat eine Narbe über dem rechten Auge. Kapitel {input}", answer: "7" }
                    ]
                }
            ]
        },
        {
            chapter: 9,
            title: "zu Kapitel 9",
            exercises: [
                {
                    type: 'fill_in_free',
                    title: "1. Hören Sie und schreiben Sie die Antworten (Stichworte genügen).",
                    questions: [
                        { id: '9_1a', text: "a) Wo ist Julia jetzt? {input}", answer: "Park", alt: "in einem Park" },
                        { id: '9_1b', text: "b) Was sagt sie über Christian? {input}", answer: "Er ist der Mörder", alt: "Mörder" }
                    ]
                },
                {
                    type: 'text_correction',
                    title: "2. Was passiert in Christians Café? Markieren Sie die 6 Fehler und korrigieren Sie sie.",
                    originalText: "Julia geht am Morgen in Chris' Café. Sie will wissen: War Chris in der Nacht bei Fenders Haus? Zuerst ist Chris normal. Julia denkt: Er ist nett. Aber dann sagt Chris: „Klara ist tot, das ist schlecht für dich. Jetzt kannst du Profifußballerin werden. Der Mörder hat Klara für mich umgebracht. Er hat mit geholfen.“ Jetzt glaubt Julia: Chris ist kein Mörder. Sie geht schnell in einen Park in der Nähe. Dort schreibt sie Fender an.",
                    corrections: [
                        { find: "Abend", replaceWith: "Morgen" },
                        { find: "Fenders", replaceWith: "meinem" },
                        { find: "schlecht", replaceWith: "gut" },
                        { find: "mich", replaceWith: "dich" },
                        { find: "mit", replaceWith: "dir" },
                        { find: "kein", replaceWith: "ein" },
                        { find: "schreibt", replaceWith: "ruft" }
                    ]
                },
                {
                    type: 'who_said_it',
                    title: "3. Wer sagt was? Kreuzen Sie an.",
                    roles: ["Fender", "Chris", "Julia"],
                    questions: [
                        { id: '9_3a', text: "a) „Chris hat Klara umgebracht.“", answer: "Julia" },
                        { id: '9_3b', text: "b) „Für dich ist das doch auch gut.“", answer: "Chris" },
                        { id: '9_3c', text: "c) „Nächstes Jahr bist du ein Profi.“", answer: "Chris" },
                        { id: '9_3d', text: "d) „Chris ist der Mörder? Wirklich?“", answer: "Fender" },
                        { id: '9_3e', text: "e) „Ich kann nie mehr in mein Lieblingscafé gehen.“", answer: "Julia" },
                        { id: '9_3f', text: "f) „Warten Sie im Park auf mich, ich bin gleich bei Ihnen.“", answer: "Fender" }
                    ]
                }
            ]
        },
        {
            chapter: 10,
            title: "zu Kapitel 10",
            exercises: [
                {
                    type: 'fill_in',
                    title: "1. Fenders Falle. Ergänzen Sie die Sätze.",
                    options: ["Sonntag", "sofort ins Café", "alles hören", "Champagner"],
                    questions: [
                        { id: '10_1a', text: "a) Fender gibt Julia ein Mikrofon. Jetzt kann er {input}.", answer: "alles hören" },
                        { id: '10_1b', text: "b) Wenn Julia Probleme hat, kommt er {input}.", answer: "sofort ins Café" },
                        { id: '10_1c', text: "c) Julia bestellt keinen Kaffee, sie will {input}.", answer: "Champagner" },
                        { id: '10_1d', text: "d) Julia sagt: Ich darf am {input} spielen.", answer: "Sonntag" }
                    ]
                },
                {
                    type: 'matching',
                    title: "2. Was sagt Julia zu Chris und was denkt sie wirklich? Verbinden Sie.",
                    left: [
                        { id: 'a', text: "a) Klara war keine gute Fußballspielerin." },
                        { id: 'b', text: "b) Ich möchte den Mörder kennenlernen." },
                        { id: 'c', text: "c) Ich bin verliebt in den Mörder." },
                        { id: 'd', text: "d) Du hast Klara für mich umgebracht, danke!" }
                    ],
                    right: [
                        { id: '1', text: "1) Wie kannst du bloß so etwas tun?" },
                        { id: '2', text: "2) Ich will Chris nie wieder sehen." },
                        { id: '3', text: "3) Klara war eine tolle Fußballspielerin." },
                        { id: '4', text: "4) Ich finde Chris schrecklich." }
                    ],
                    answers: { "a": "3", "b": "2", "c": "4", "d": "1" }
                },
                {
                    type: 'multiple_choice',
                    title: "3. Was ist richtig? Kreuzen Sie an.",
                    questions: [
                        {
                            id: '10_3a', text: "a) Chris glaubt Julia alles, denn",
                            options: ["1) er ist verliebt.", "2) er ist dumm."],
                            answer: 0
                        },
                        {
                            id: '10_3b', text: "b) Fender hat alles",
                            options: ["1) gehört und im Computer.", "2) dem Fußballtrainer erzählt."],
                            answer: 0
                        },
                        {
                            id: '10_3c', text: "c) Fender geht ins Café, denn",
                            options: ["1) Chris will Julia ermorden.", "2) er hat alles Wichtige gehört."],
                            answer: 1
                        },
                        {
                            id: '10_3d', text: "d) Alle wissen jetzt: Chris",
                            options: ["1) macht schlechten Kaffee.", "2) ist der Mörder."],
                            answer: 1
                        }
                    ]
                }
            ]
        }
    ]
};
