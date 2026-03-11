const fs = require('fs');
const path = require('path');

const nouns = {
    m: [
        { de: 'Mann', sk: 'muž' }, { de: 'Hund', sk: 'pes' }, { de: 'Tisch', sk: 'stôl' },
        { de: 'Kaffee', sk: 'káva' }, { de: 'Computer', sk: 'počítač' }, { de: 'Stuhl', sk: 'stolička' },
        { de: 'Lehrer', sk: 'učiteľ' }, { de: 'Garten', sk: 'záhrada' }, { de: 'Zug', sk: 'vlak' },
        { de: 'Film', sk: 'film' }, { de: 'Tag', sk: 'deň' }, { de: 'Apfel', sk: 'jablko' },
        { de: 'Koffer', sk: 'kufor' }, { de: 'Balkon', sk: 'balkón' }, { de: 'Schuh', sk: 'topánka' }
    ],
    f: [
        { de: 'Frau', sk: 'žena' }, { de: 'Katze', sk: 'mačka' }, { de: 'Tasche', sk: 'taška' },
        { de: 'Blume', sk: 'kvet' }, { de: 'Stadt', sk: 'mesto' }, { de: 'Wohnung', sk: 'byt' },
        { de: 'Tür', sk: 'dvere' }, { de: 'Lampe', sk: 'lampa' }, { de: 'Uhr', sk: 'hodinky' },
        { de: 'Tasse', sk: 'šálka' }, { de: 'Idee', sk: 'nápad' }, { de: 'Jacke', sk: 'bunda' },
        { de: 'Straße', sk: 'ulica' }, { de: 'Pizza', sk: 'pizza' }, { de: 'Nacht', sk: 'noc' }
    ],
    n: [
        { de: 'Kind', sk: 'dieťa' }, { de: 'Auto', sk: 'auto' }, { de: 'Haus', sk: 'dom' },
        { de: 'Buch', sk: 'kniha' }, { de: 'Problem', sk: 'problém' }, { de: 'Zimmer', sk: 'izba' },
        { de: 'Fenster', sk: 'okno' }, { de: 'Handy', sk: 'mobil' }, { de: 'Bild', sk: 'obrázok' },
        { de: 'Bett', sk: 'posteľ' }, { de: 'Mädchen', sk: 'dievča' }, { de: 'Spiel', sk: 'hra' },
        { de: 'Hotel', sk: 'hotel' }, { de: 'Restaurant', sk: 'reštaurácia' }, { de: 'Brötchen', sk: 'žemľa' }
    ],
    p: [
        { de: 'Menschen', sk: 'ľudia' }, { de: 'Kinder', sk: 'deti' }, { de: 'Schuhe', sk: 'topánky' },
        { de: 'Bücher', sk: 'knihy' }, { de: 'Autos', sk: 'autá' }, { de: 'Frauen', sk: 'ženy' },
        { de: 'Tage', sk: 'dni' }, { de: 'Hunde', sk: 'psy' }, { de: 'Stühle', sk: 'stoličky' },
        { de: 'Lampen', sk: 'lampy' }, { de: 'Ideen', sk: 'nápady' }, { de: 'Apfel', sk: 'jablká (Äpfel)', isIrregular: true },
        { de: 'Zimmer', sk: 'izby' }, { de: 'Männer', sk: 'muži' }, { de: 'Freunde', sk: 'priatelia' }
    ]
};

const adjectives = [
    'groß', 'klein', 'alt', 'neu', 'gut', 'schlecht', 'schön', 'hässlich',
    'teuer', 'günstig', 'schnell', 'langsam', 'kalt', 'warm', 'interessant',
    'langweilig', 'modern', 'dunkel', 'hell', 'laut', 'leise', 'stark', 'schwach'
];

function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

const exercises = [];
let idCounter = 1;

// Helper to remove 'e' from words ending in 'el' or 'er' optionally for declensions, e.g., dunkel -> dunkle
function declineAdj(adj, ending) {
    if (adj === 'dunkel' && ending !== '') return 'dunkl' + ending;
    if (adj === 'teuer' && ending !== '') return 'teur' + ending;
    return adj + ending;
}

const types = ['bestimmt', 'unbestimmt', 'kein'];
const genders = ['m', 'f', 'n', 'p'];

for (let i = 0; i < 130; i++) {
    const gender = getRandom(genders);
    let type = getRandom(types);
    if (gender === 'p' && type === 'unbestimmt') type = 'ohne'; // plural unbestimmt => ohne Artikel

    const nounObj = getRandom(nouns[gender]);
    let nounDe = nounObj.de;
    if (nounObj.isIrregular) nounDe = 'Äpfel';

    const adj = getRandom(adjectives);

    let article = '';
    let adjEnding = '';
    let correctAnswer = '';
    let explanation = '';
    let options = [];

    if (type === 'bestimmt') {
        if (gender === 'm') { article = 'der'; adjEnding = 'e'; }
        if (gender === 'f') { article = 'die'; adjEnding = 'e'; }
        if (gender === 'n') { article = 'das'; adjEnding = 'e'; }
        if (gender === 'p') { article = 'die'; adjEnding = 'en'; }
        
        const declinedAdj = declineAdj(adj, adjEnding);
        correctAnswer = `${article} ${declinedAdj}`;
        
        options = [
            `${article} ${declineAdj(adj, 'e')}`,
            `${article} ${declineAdj(adj, 'er')}`,
            `${article} ${declineAdj(adj, 'es')}`,
            `${article} ${declineAdj(adj, 'en')}`
        ];
        // Ensure unique options
        options = [...new Set(options)];
        while(options.length < 4) {
            const extraArticles = ['der', 'die', 'das', 'den', 'dem'];
            options.push(`${getRandom(extraArticles)} ${declineAdj(adj, getRandom(['e', 'er', 'en', 'es']))}`);
            options = [...new Set(options)];
        }
        
        let genName = gender === 'm' ? 'mužského' : gender === 'f' ? 'ženského' : gender === 'n' ? 'stredného' : 'množného';
        explanation = `Podstatné meno "${nounObj.de}" je ${genName} rodu. Pri určitom člene v nominatíve má prídavné meno koncovku -${adjEnding}.`;
    } 
    else if (type === 'unbestimmt' || type === 'ohne') {
        if (gender === 'm') { article = 'ein'; adjEnding = 'er'; }
        if (gender === 'f') { article = 'eine'; adjEnding = 'e'; }
        if (gender === 'n') { article = 'ein'; adjEnding = 'es'; }
        if (gender === 'p') { article = ''; adjEnding = 'e'; } // Nullartikel plural nominativ -> -e

        const declinedAdj = declineAdj(adj, adjEnding);
        correctAnswer = article ? `${article} ${declinedAdj}` : declinedAdj;

        if (gender === 'p') {
             options = [
                declineAdj(adj, 'e'),
                declineAdj(adj, 'en'),
                declineAdj(adj, 'es'),
                declineAdj(adj, 'er')
            ];
             explanation = `Pri množnom čísle bez člena (neurčitý člen neexistuje) v nominatíve preberá prídavné meno koncovku určitého člena (die = -e).`;
        } else {
            options = [
                `${article} ${declineAdj(adj, 'er')}`,
                `${article} ${declineAdj(adj, 'e')}`,
                `${article} ${declineAdj(adj, 'es')}`,
                `${article} ${declineAdj(adj, 'en')}`
            ];
            let genName = gender === 'm' ? 'mužského' : gender === 'f' ? 'ženského' : 'stredného';
            explanation = `Podstatné meno "${nounObj.de}" je ${genName} rodu. Pri neurčitom člene "${article}" preberá prídavné meno v nominatíve koncovku pádového ukazovateľa (-${adjEnding}).`;
        }
        options = [...new Set(options)];
        while(options.length < 4) {
             const extraArticles = ['ein', 'eine', 'einen', 'einem'];
             options.push(`${gender==='p' ? '' : getRandom(extraArticles)} ${declineAdj(adj, getRandom(['e', 'er', 'en', 'es']))}`.trim());
             options = [...new Set(options)];
        }
    }
    else if (type === 'kein') {
        if (gender === 'm') { article = 'kein'; adjEnding = 'er'; }
        if (gender === 'f') { article = 'keine'; adjEnding = 'e'; }
        if (gender === 'n') { article = 'kein'; adjEnding = 'es'; }
        if (gender === 'p') { article = 'keine'; adjEnding = 'en'; }

        const declinedAdj = declineAdj(adj, adjEnding);
        correctAnswer = `${article} ${declinedAdj}`;

        options = [
            `${article} ${declineAdj(adj, 'er')}`,
            `${article} ${declineAdj(adj, 'e')}`,
            `${article} ${declineAdj(adj, 'es')}`,
            `${article} ${declineAdj(adj, 'en')}`
        ];
        options = [...new Set(options)];
        while(options.length < 4) {
             const extraArticles = ['kein', 'keine', 'keinen'];
             options.push(`${getRandom(extraArticles)} ${declineAdj(adj, getRandom(['e', 'er', 'en', 'es']))}`.trim());
             options = [...new Set(options)];
        }

        let genName = gender === 'm' ? 'mužského' : gender === 'f' ? 'ženského' : gender === 'n' ? 'stredného' : 'množného';
        if (gender === 'p') {
           explanation = `Pri množnom čísle s negatívnym členom "keine" dostáva prídavné meno v nominatíve koncovku -en.`;
        } else {
           explanation = `Podstatné meno "${nounObj.de}" je ${genName} rodu. Pri negatívnom člene v nominatíve: ${correctAnswer}.`;
        }
    }

    // Shuffle options
    options.sort(() => Math.random() - 0.5);

    let basePhrase = article ? `${article} / ${adj}` : `${adj}`;
    if (type === 'kein') basePhrase = `kein / ${adj}`;
    if (gender === 'p' && type === 'ohne') basePhrase = `(bez člena) / ${adj}`;

    exercises.push({
        type: 'mc',
        question: `Ako sa správne povie "${adj} ${nounObj.sk}"? (Zadanie: ${basePhrase} + ${nounDe})`,
        options: options,
        answer: correctAnswer,
        explanation: explanation
    });
}

// Generate the output suitable for insertion
let output = `\n  // ─── NOMINATIV DEKLINATION ───────────────────────────\n  nominativ_deklination: [\n`;
exercises.forEach(ex => {
    output += `    { type: '${ex.type}', question: '${ex.question.replace(/'/g, "\\'")}', options: ${JSON.stringify(ex.options)}, answer: '${ex.answer}', explanation: '${ex.explanation.replace(/'/g, "\\'")}' },\n`;
});
output += `  ],\n`;

fs.writeFileSync('generated_exercises.txt', output);
console.log('Successfully generated exercises into generated_exercises.txt');
