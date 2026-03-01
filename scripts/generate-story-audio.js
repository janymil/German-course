/**
 * generate-story-audio.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Generates MP3 audio files for all stories using OpenAI TTS.
 * Run ONCE. The produced MP3s are stored as static files — zero runtime cost.
 *
 * Usage:
 *   node scripts/generate-story-audio.js
 *
 * Requirements:
 *   - Set environment variable OPENAI_API_KEY, OR
 *   - The script will prompt you to enter it
 *
 *   npm install node-fetch   (if using Node < 18)
 *   Node 18+ has native fetch — no extra install needed.
 *
 * Voice options (change VOICE below):
 *   nova    — female, clear, warm (recommended for language learning)
 *   onyx    — male, deep, authoritative
 *   fable   — British male, expressive
 *   shimmer — female, expressive
 *   alloy   — neutral
 *   echo    — male, warmer
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Load .env file ────────────────────────────────────────────────────────────
const envPath = path.join(__dirname, '..', '.env');
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

// ── Config ────────────────────────────────────────────────────────────────────
const VOICE = 'nova';      // Change to 'onyx' for male voice
const MODEL = 'tts-1-hd';  // tts-1-hd = higher quality, tts-1 = faster/cheaper
const SPEED = 0.88;        // Slightly slower for language learning (0.25–4.0)
const OUT_DIR = path.join(__dirname, '..', 'public', 'audio', 'stories');

// ── Story data (mirrors src/data/stories.js) ──────────────────────────────────
// Only the data needed for audio generation
const STORIES = [
    {
        id: 'story_01',
        title: 'Der erste Tag',
        slug: 'story_01_der_erste_tag',
        sentences: [
            'Jana Nováková kommt aus der Slowakei.',
            'Sie ist 28 Jahre alt.',
            'Heute ist ihr erster Tag in Wien.',
            'Jana arbeitet in einer Firma.',
            'Das Büro ist groß und modern.',
            'Jana geht zur Rezeption.',
            'Die Rezeptionistin fragt: Wie heißen Sie?',
            'Jana antwortet: Ich heiße Jana Nováková.',
            'Die Rezeptionistin lächelt und sagt: Herzlich willkommen!',
            'Janas Kollegin heißt Maria.',
            'Maria ist sehr nett und hilfsbereit.',
            'Sie zeigt Jana das Büro.',
            'Das Büro hat viele Fenster.',
            'Jana sagt: Das Büro ist sehr schön!',
            'Maria sagt: Wien ist eine tolle Stadt!',
            'Jana ist glücklich. Der erste Tag beginnt gut.',
        ],
    },
    {
        id: 'story_02',
        title: 'Die Familie',
        slug: 'story_02_die_familie',
        sentences: [
            'Jana denkt oft an ihre Familie in Bratislava.',
            'Sie hat einen Vater, eine Mutter und einen Bruder.',
            'Ihr Vater heißt Peter. Er ist 55 Jahre alt.',
            'Er arbeitet als Ingenieur in Bratislava.',
            'Ihre Mutter heißt Eva. Sie ist Lehrerin.',
            'Eva kocht sehr gut. Jana vermisst ihr Essen.',
            'Janas Bruder heißt Tomáš. Er ist 24 Jahre alt.',
            'Tomáš studiert Informatik an der Universität.',
            'Die Familie ist sehr eng zusammen.',
            'Jana telefoniert jeden Abend mit ihrer Mutter.',
            'Am Wochenende fährt sie manchmal nach Bratislava.',
            'Die Fahrt mit dem Zug dauert zwei Stunden.',
            'Jana sagt: Meine Familie ist das Wichtigste für mich.',
            'Ihre Eltern sind sehr stolz auf Jana.',
            'Sie kommen bald nach Wien zu Besuch.',
        ],
    },
    {
        id: 'story_03',
        title: 'Ein Tag in Wien',
        slug: 'story_03_ein_tag_in_wien',
        sentences: [
            'Jana steht jeden Morgen um 7 Uhr auf.',
            'Zuerst macht sie Kaffee und frühstückt.',
            'Sie isst ein Brot mit Käse und trinkt Orangensaft.',
            'Dann zieht sie sich an und geht aus dem Haus.',
            'Sie geht zur U-Bahn-Station. Das dauert fünf Minuten.',
            'Mit der U-Bahn fährt sie ins Zentrum.',
            'Das Büro ist in der Innenstadt, nicht weit vom Ring.',
            'Jana arbeitet von 9 bis 17 Uhr.',
            'In der Mittagspause geht sie mit Maria in ein Café.',
            'Sie trinken Kaffee und essen ein Sandwich.',
            'Nach der Arbeit geht Jana einkaufen.',
            'Der Supermarkt ist um die Ecke von ihrer Wohnung.',
            'Sie kauft Gemüse, Brot und manchmal Fleisch.',
            'Abends kocht Jana oft selbst.',
            'Sie hört dabei Musik oder schaut fern.',
            'Um 22 Uhr geht Jana schlafen. Der Tag war gut.',
        ],
    },
    {
        id: 'story_04',
        title: 'Im Restaurant',
        slug: 'story_04_im_restaurant',
        sentences: [
            'Es ist Freitag. Jana und Maria haben frei.',
            'Sie möchten zusammen essen gehen.',
            'Maria kennt ein gutes Restaurant in der Nähe.',
            'Das Restaurant heißt Zum Goldenen Hirschen.',
            'Sie gehen zu Fuß. Der Weg dauert zehn Minuten.',
            'Das Restaurant ist voll, aber sie finden einen Tisch.',
            'Ein Kellner kommt und bringt die Speisekarte.',
            'Jana liest die Speisekarte. Es gibt viele Gerichte.',
            'Maria möchte eine Tomatensuppe und Wiener Schnitzel.',
            'Jana möchte einen Salat und Pasta mit Gemüse.',
            'Der Kellner fragt: Was möchten Sie trinken?',
            'Jana bestellt ein Glas Mineralwasser. Maria nimmt Apfelsaft.',
            'Das Essen ist sehr lecker. Jana ist begeistert.',
            'Nach dem Essen möchten sie einen Kaffee.',
            'Jana ruft den Kellner: Die Rechnung, bitte!',
            'Die Rechnung beträgt 34 Euro. Sie teilen den Betrag.',
            'Maria sagt: Wir kommen bald wieder hierher!',
        ],
    },
    {
        id: 'story_05',
        title: 'Am Bahnhof',
        slug: 'story_05_am_bahnhof',
        sentences: [
            'Es ist Samstag. Jana möchte Salzburg besuchen.',
            'Sie packt einen kleinen Rucksack ein.',
            'Sie nimmt ihre Kamera und eine Jacke mit.',
            'Jana geht zum Wiener Hauptbahnhof.',
            'Der Bahnhof ist groß und modern.',
            'Jana sucht die Abfahrtstafel.',
            'Der nächste Zug nach Salzburg fährt um 10 Uhr 30 ab.',
            'Jana geht zum Schalter und kauft ein Ticket.',
            'Das Ticket kostet 29 Euro. Sie zahlt mit Kreditkarte.',
            'Der Zug kommt auf Gleis 7 an.',
            'Jana findet einen Fensterplatz. Sie ist aufgeregt.',
            'Die Fahrt dauert zwei Stunden und dreißig Minuten.',
            'Jana schaut aus dem Fenster. Die Landschaft ist wunderschön.',
            'In Salzburg regnet es leicht, aber das ist kein Problem.',
            'Jana besucht das Mozarthaus und den Dom.',
            'Abends fährt sie zurück nach Wien.',
            'Jana sagt: Salzburg ist wunderschön! Ich komme wieder!',
        ],
    },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
async function prompt(question) {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise(resolve => rl.question(question, ans => { rl.close(); resolve(ans.trim()); }));
}

async function generateMP3(apiKey, text, outPath) {
    const response = await fetch('https://api.openai.com/v1/audio/speech', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: MODEL,
            voice: VOICE,
            input: text,
            speed: SPEED,
        }),
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`OpenAI API error ${response.status}: ${err}`);
    }

    const buffer = await response.arrayBuffer();
    fs.writeFileSync(outPath, Buffer.from(buffer));
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
    console.log('\n🎙  Story Audio Generator — OpenAI TTS');
    console.log('─────────────────────────────────────────');
    console.log(`Voice: ${VOICE}  |  Model: ${MODEL}  |  Speed: ${SPEED}\n`);

    // Get API key
    let apiKey = process.env.OPENAI_API_KEY || '';
    if (!apiKey) {
        apiKey = await prompt('Zadaj OpenAI API kľúč: ');
    }
    if (!apiKey.startsWith('sk-')) {
        console.error('❌ Neplatný API kľúč (musí začínať sk-)');
        process.exit(1);
    }

    // Create output directory
    fs.mkdirSync(OUT_DIR, { recursive: true });
    console.log(`📁 Output: ${OUT_DIR}\n`);

    // Generate one MP3 per story
    for (const story of STORIES) {
        const outPath = path.join(OUT_DIR, `${story.slug}.mp3`);
        const fullText = story.sentences.join(' ');
        const charCount = fullText.length;
        const estimatedCost = ((charCount / 1000) * (MODEL === 'tts-1-hd' ? 0.030 : 0.015)).toFixed(4);

        process.stdout.write(`⏳ ${story.id} — ${story.title} (${charCount} znakov, ~$${estimatedCost})... `);

        try {
            await generateMP3(apiKey, fullText, outPath);
            const size = (fs.statSync(outPath).size / 1024).toFixed(0);
            console.log(`✅ ${size} KB → ${story.slug}.mp3`);
        } catch (err) {
            console.log(`❌ Chyba: ${err.message}`);
        }
    }

    console.log('\n✅ Hotovo! Súbory sú v public/audio/stories/');
    console.log('Teraz môžeš spustiť: npm run dev\n');
}

main();
