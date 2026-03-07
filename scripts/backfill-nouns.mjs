import fs from 'fs';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import { STORIES } from '../src/data/stories.js';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const ai = new GoogleGenAI({ apiKey: process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY });

const SYSTEM_PROMPT = `
Si expert na nemeckú gramatiku. ÚLOHA: Dostaneš nemecký text. Nájdi ÚPLNE VŠETKY podstatné mená (nouns) v texte. 
Z tohto zoznamu VYLÚČ slová, ktoré ti dodám v parametri 'ZNÁME_SLOVÁ'.
Pre zvyšné podstatné mená (aj keby to boli jednoduché slová ako "Morgen", "Wasser", "Sonne", "Tag", atď.), vygeneruj JSON štruktúru pre našu databázu.
IBA PODSTATNÉ MENÁ. Žiadne vlastné mená ľudí alebo miest (ako Wien, Taco).
VRÁŤ VÝHRADNE JSON BEZ MARKDOWNU!

ŠTUKTÚRA JSON (kľúčky sú zistené podstatné mená):
{
  "Morgen": { 
     "type": "noun", "sk": "ráno", "article": "der", "plural": "die Morgen", 
     "cases": { "Nominativ": "der Morgen", "Akkusativ": "den Morgen", "Dativ": "dem Morgen", "Genitiv": "des Morgens" },
     "example": "Am Morgen wachen wir auf.", "exampleSk": "Ráno sa budíme."
  }
}
`;

async function main() {
    console.log("Starting backfill process...");

    // Build known words
    const knownWordsObj = {};
    STORIES.forEach(story => {
        if (story.words) {
            Object.assign(knownWordsObj, story.words);
        }
    });

    try {
        const prog = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'progress.json'), 'utf8'));
        if (prog.generatedWords) Object.assign(knownWordsObj, prog.generatedWords);
    } catch (e) { }

    const knownWordsList = Object.keys(knownWordsObj).map(k => k.toLowerCase());
    let newlyDiscovered = {};

    for (const story of STORIES) {
        console.log(`Processing ${story.title}...`);
        const text = story.sentences.map(s => s.de).join(' ');

        const payload = `ZNÁME_SLOVÁ: ${knownWordsList.join(', ')}\n\nTEXT:\n${text}`;

        try {
            const res = await ai.models.generateContent({
                model: 'gemini-2.5-flash-lite',
                contents: payload,
                config: {
                    systemInstruction: SYSTEM_PROMPT,
                    temperature: 0.1,
                }
            });

            let jsonText = res.text.replace(/^\`\`\`json/, '').replace(/\`\`\`$/, '').trim();
            const newWords = JSON.parse(jsonText);

            Object.assign(newlyDiscovered, newWords);
            // Append newly discovered to known to avoid duplicate work across stories
            Object.keys(newWords).forEach(k => knownWordsList.push(k.toLowerCase()));

            console.log(`Found ${Object.keys(newWords).length} new nouns in ${story.title}`);
        } catch (e) {
            console.error(`Error processing ${story.title}:`, e.message);
        }
    }

    console.log(`Total missing nouns generated: ${Object.keys(newlyDiscovered).length}`);

    const outputPath = path.join(process.cwd(), 'src', 'data', 'globalNouns.js');
    fs.writeFileSync(outputPath, `export const GLOBAL_NOUNS = ${JSON.stringify(newlyDiscovered, null, 4)};\n`, 'utf8');
    console.log("Saved to src/data/globalNouns.js");
}

main();
