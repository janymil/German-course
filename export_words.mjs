import fs from 'fs';
import { momenteA1_2Deck } from './src/data/decks/momente_a1_2.js';

let words = {};
momenteA1_2Deck.chapters.slice(1).forEach(c => {
    words[c.title] = c.vocab.map(v => ({ de: v.de, sk: v.sk })); // taking current 'sk' (which is actually English here) as reference
});

fs.writeFileSync('words_a1_2.json', JSON.stringify(words, null, 2));
console.log("Extracted words to words_a1_2.json");
