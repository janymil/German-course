const fs = require('fs');

const b1 = fs.readFileSync('src/data/flashcards_batch_1.js', 'utf-8').replace('export const flashcardsBatch1 = ', '');
const b2 = fs.readFileSync('src/data/flashcards_batch_2.js', 'utf-8').replace('export const flashcardsBatch2 = ', '');
const b3 = fs.readFileSync('src/data/flashcards_batch_3.js', 'utf-8').replace('export const flashcardsBatch3 = ', '');
const b4 = fs.readFileSync('src/data/flashcards_batch_4.js', 'utf-8').replace('export const flashcardsBatch4 = ', '');
const b5 = fs.readFileSync('src/data/flashcards_batch_5.js', 'utf-8').replace('export const flashcardsBatch5 = ', '');

const o1 = JSON.parse(b1.substring(0, b1.lastIndexOf(';')));
const o2 = JSON.parse(b2.substring(0, b2.lastIndexOf(';')));
const o3 = JSON.parse(b3.substring(0, b3.lastIndexOf(';')));
const o4 = JSON.parse(b4.substring(0, b4.lastIndexOf(';')));
const o5 = JSON.parse(b5.substring(0, b5.lastIndexOf(';')));

const finalData = {
  ...o1, ...o2, ...o3, ...o4, ...o5
};

const outputContent = "export const hardwords_flashcards = " + JSON.stringify(finalData, null, 2) + ";";
fs.writeFileSync('src/data/decks/hardwords_flashcards.js', outputContent);
console.log('Successfully combined into src/data/decks/hardwords_flashcards.js!');
