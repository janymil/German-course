import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

// ── Load .env manually for backend scripts ─────────────────────────────────
const envPath = path.join(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
    fs.readFileSync(envPath, 'utf8')
        .split('\n')
        .filter(line => line.trim() && !line.startsWith('#'))
        .forEach(line => {
            const [key, ...rest] = line.split('=');
            const value = rest.join('=').trim();
            if (key && value && !process.env[key.trim()]) {
                process.env[key.trim()] = value;
            }
        });
}

const AUDIO_OUT_DIR = path.join(process.cwd(), 'public', 'audio', 'stories');
if (!fs.existsSync(AUDIO_OUT_DIR)) {
    fs.mkdirSync(AUDIO_OUT_DIR, { recursive: true });
}

function getNextStoryId(storiesContent) {
    // Match both single-quoted JS (id: 'story_NN') and double-quoted JSON ("id": "story_NN")
    const iter = [...storiesContent.matchAll(/["']?id["']?\s*:\s*["']story_(\d+)["']/g)];
    if (iter.length === 0) return 'story_01';
    let max = 0;
    for (const match of iter) {
        max = Math.max(max, parseInt(match[1], 10));
    }
    return `story_${String(max + 1).padStart(2, '0')}`;
}

// ── Prompt 1: Metadata, Sentences & Word Extraction ────────────────────────

const SYSTEM_PROMPT_PHASE_1 = `Si nemecký lektor. Tvoja prvá úloha je analyzovať surový text a vrátiť JSON.
ÚLOHA:
1. Rozdeľ text na vety a ku každej pridaj slovenský preklad (sk).
2. Vygeneruj "title" a "titleSk", "cefr" (A1/A2/B1), a "description" (1 veta po slovensky).
3. Vygeneruj "quiz" (presne 3 testové otázky v nemčine k textu s vysvetlením v slovenčine).
4. Vytvor zoznam dôležitých "targetWords" z textu, pre ktoré neskôr vyriešime gramatiku.

PRAVIDLÁ pre "targetWords":
- Zahrň iba podstatné mená (v základnom tvare bez člena), slovesá (v infinitíve) a prídavné mená.
- ABSOLÚTNE IGNORUJ všetky mená ľudí, názvy miest (napr. Wien, Salzburg), krajín atď.
- Odstráň slová, ktoré dostaneš v zozname "knownWords" (tieto už máme v databáze).

VRÁŤ VÝHRADNE JSON BEZ MARKDOWNU!
{
  "title": "", "titleSk": "", "cefr": "", "description": "",
  "sentences": [{ "de": "", "sk": "" }],
  "quiz": [{ "question": "", "options": ["A","B","C","D"], "answer": 0, "explanation": "" }],
  "targetWords": ["slovo1", "slovo2", ...] // len slová, ktoré NIE SÚ v "knownWords" a NIE SÚ vlastné mená!
}`;

// ── Prompt 2: Chunked Grammar Generation ──────────────────────────────────

const SYSTEM_PROMPT_PHASE_2 = `Si expert na nemeckú gramatiku.
Dostaneš krátky zoznam nemeckých slov z určitého textu. Vráť výhradne JSON objekt "words".
ŽIADNY MARKDOWN! IBA JSON.

ŠTUKTÚRA JSON (kľúče musia byť presne tie slová, ktoré dostaneš):
{
  "slovo1": { 
     "type": "noun/verb/adjective/adverb", "sk": "slovenský preklad",
     // ak noun: "article": "der/die/das", "plural": "...", "cases": { "Nominativ": "..", "Akkusativ": "..", "Dativ": "..", "Genitiv": ".." }
     // ak verb: "infinitiv": "..", "conjugation": { "ich": "..", "du": "..", "er/sie/es": "..", "wir": "..", "ihr": "..", "sie": ".." }
     "example": "Nemecká veta so slovom (najlepšie z pôvodného kontextu ak vieš)", "exampleSk": "Slovenský preklad príkladu"
  }
}`;

export async function handleGenerateStory(req, res) {
    let bodyText = '';
    req.on('data', chunk => bodyText += chunk.toString());
    req.on('end', async () => {
        try {
            const body = JSON.parse(bodyText);
            const rawText = body.text;
            if (!rawText || rawText.length < 20) {
                res.writeHead(400); res.end(JSON.stringify({ error: 'Text je príliš krátky' })); return;
            }

            const geminiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
            const openaiKey = process.env.OPENAI_API_KEY;
            if (!geminiKey || !openaiKey) {
                res.writeHead(500); res.end(JSON.stringify({ error: 'Chýbajú API kľúče.' })); return;
            }

            const ai = new GoogleGenAI({ apiKey: geminiKey });

            // ── A. Deduplication Setup ──────────────────────────────────────────
            console.log('[AI Agent] 0. Načítavam databázu známych slov...');
            const knownWords = new Set();

            const storiesPath = path.join(process.cwd(), 'src', 'data', 'stories.js');
            const storiesCode = fs.readFileSync(storiesPath, 'utf8');
            const storyMatch = [...storiesCode.matchAll(/words:\s*{([^]*?)\s*},?\s*quiz/g)];
            for (const match of storyMatch) {
                const keys = [...match[1].matchAll(/'([^']+)'\s*:/g)];
                keys.forEach(k => knownWords.add(k[1].toLowerCase()));
            }

            const progressPath = path.join(process.cwd(), 'progress.json');
            if (fs.existsSync(progressPath)) {
                try {
                    const prog = JSON.parse(fs.readFileSync(progressPath, 'utf8'));
                    if (prog.generatedWords) {
                        Object.keys(prog.generatedWords).forEach(k => knownWords.add(k.toLowerCase()));
                    }
                } catch (e) { }
            }
            console.log(`[AI Agent] Databáza obsahuje ${knownWords.size} už známych slov.`);

            // ── B. Phase 1: Structure & Deduplication filter ────────────────────
            console.log('[AI Agent] 1. Analyzujem text (Fáza 1)...');
            const prompt1Payload = `Zoznam 'knownWords', pre ktoré NESMIEŠ generovať targetWords: ${Array.from(knownWords).slice(0, 300).join(', ')}... (ukážka).\n\nTEXT PÔVODU:\n${rawText}`;

            const res1 = await ai.models.generateContent({
                model: 'gemini-2.5-flash-lite',
                contents: prompt1Payload,
                config: {
                    systemInstruction: SYSTEM_PROMPT_PHASE_1,
                    temperature: 0.1,
                }
            });

            let json1 = res1.text.replace(/^\`\`\`json/, '').replace(/\`\`\`$/, '').trim();
            const storyData = JSON.parse(json1);

            console.log(`[AI Agent] Extrahovaných vnútorne neznámych slov (bez mien): ${storyData.targetWords?.length || 0}`);

            // ── C. Phase 2: Chunked Grammar Generation ──────────────────────────
            console.log('[AI Agent] 2. Generujem detailné gramatické karty (Fáza 2 po blokoch)...');
            storyData.words = {};
            const targetWords = storyData.targetWords || [];

            // Chunk array into batches of 15 words
            const chunkSize = 15;
            for (let i = 0; i < targetWords.length; i += chunkSize) {
                const chunk = targetWords.slice(i, i + chunkSize);
                console.log(`[AI Agent]  -> Spracovávam blok slov: ${chunk.join(', ')}`);

                const res2 = await ai.models.generateContent({
                    model: 'gemini-2.5-flash-lite',
                    contents: `Vygeneruj slovník pre tieto slová z textu: ${chunk.join(', ')}`,
                    config: {
                        systemInstruction: SYSTEM_PROMPT_PHASE_2,
                        temperature: 0.1,
                    }
                });

                let json2 = res2.text.replace(/^\`\`\`json/, '').replace(/\`\`\`$/, '').trim();
                try {
                    const wordsChunk = JSON.parse(json2);
                    storyData.words = { ...storyData.words, ...wordsChunk };
                } catch (e) {
                    console.error("Chyba parsovania gramatického bloku:", json2);
                }
            }

            delete storyData.targetWords;

            // ── D. Audio Generation ─────────────────────────────────────────────
            const storyId = getNextStoryId(storiesCode);
            const slug = `${storyId}_${storyData.title.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')}`;
            storyData.id = storyId;

            // Set required fields that the StoryBrowser/StoryReader components expect
            const cefrRangeMap = { 'A1': [1, 20], 'A2': [21, 40], 'B1': [41, 80], 'B2': [41, 80] };
            storyData.lessonRange = cefrRangeMap[storyData.cefr] || [1, 80];
            storyData.image = null; // no image for AI-generated stories
            storyData.audioFile = `/audio/stories/${slug}.mp3`;

            // Pick a different voice per story so each reading sounds distinct.
            // nova → echo → fable → onyx → shimmer → alloy → nova → ...
            const STORY_VOICES = ['nova', 'echo', 'fable', 'onyx', 'shimmer', 'alloy'];
            const storyIndex = parseInt(storyId.replace('story_', ''), 10) - 1;
            const ttsVoice = STORY_VOICES[storyIndex % STORY_VOICES.length];
            console.log(`[AI Agent]    Using OpenAI TTS voice: '${ttsVoice}' (story index ${storyIndex + 1})`);

            // Join sentences with double newline — OpenAI TTS inserts a natural
            // pause at paragraph breaks, making the narration sound less mechanical.
            const fullGermanText = storyData.sentences.map(s => s.de).join('\n\n');
            console.log(`[AI Agent] 3. Generujem audio (${fullGermanText.length} znakov)...`);

            const ttsRes = await fetch('https://api.openai.com/v1/audio/speech', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${openaiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'tts-1-hd',
                    voice: ttsVoice,
                    input: fullGermanText,
                    speed: 0.82,        // 0.82 = slow enough for learners, not robotic
                }),
            });

            if (!ttsRes.ok) throw new Error(`OpenAI TTS Error: ${await ttsRes.text()}`);
            const buffer = Buffer.from(await ttsRes.arrayBuffer());
            const mp3Path = path.join(AUDIO_OUT_DIR, `${slug}.mp3`);
            fs.writeFileSync(mp3Path, buffer);

            // ── E. Inject to stories.js ─────────────────────────────────────────
            console.log(`[AI Agent] 4. Zapisujem príbeh do databázy...`);

            const lastBracketIndex = storiesCode.lastIndexOf('];');
            const formattedJson = JSON.stringify(storyData, null, 4);
            // Strip any trailing comma+whitespace before ];
            // to avoid creating a sparse array hole (double-comma) in the output.
            const sliceBefore = storiesCode.slice(0, lastBracketIndex).replace(/,\s*$/, '');
            const injectedCode = sliceBefore + ',\n    ' + formattedJson.split('\n').join('\n    ') + '\n];\n';
            fs.writeFileSync(storiesPath, injectedCode, 'utf8');

            console.log(`[AI Agent] Hotovo!`);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ ok: true, id: storyId }));

        } catch (e) {
            console.error("[AI Agent Error]", e);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: e.message }));
        }
    });
}
