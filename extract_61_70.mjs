import fs from 'fs';
import { nicosWegDeck } from './src/data/decks/nicos_weg.js';

let output = '';

// The chapters in nicosWegDeck might be 0-indexed or 1-indexed. Let's just iterate over chapters 61 to 70.
for (let i = 60; i < 70; i++) {
    if (nicosWegDeck.chapters[i]) {
        const chapter = nicosWegDeck.chapters[i];
        output += `\n// Chapter ${i + 1}: ${chapter.title || ''}\n`;
        for (const card of chapter.vocabulary) {
            output += `${card.german} -> ${card.slovak}\n`;
        }
    }
}

fs.writeFileSync('./tmp_vocab_61_70_raw.txt', output);
console.log('Done!');
