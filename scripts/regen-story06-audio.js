/**
 * regen-story06-audio.js
 * Regenerates the MP3 for story_06 with improved settings:
 *   - speed 0.82 (slower, better for learners)
 *   - sentences joined with \n\n (natural pauses between sentences)
 *   - voice: nova (story_06 = index 5 → nova in the rotation)
 *
 * Usage:
 *   node scripts/regen-story06-audio.js
 */

import fs from 'fs';
import path from 'path';

// ── Load .env ──────────────────────────────────────────────────────────────────
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

const openaiKey = process.env.OPENAI_API_KEY;
if (!openaiKey) {
    console.error('ERROR: OPENAI_API_KEY not found in .env');
    process.exit(1);
}

const { STORIES } = await import('../src/data/stories.js');
const story = STORIES.find(s => s && s.id === 'story_06');
if (!story) {
    console.error('ERROR: story_06 not found in stories.js');
    process.exit(1);
}

const AUDIO_OUT_DIR = path.join(process.cwd(), 'public', 'audio', 'stories');
const OUT_PATH = path.join(AUDIO_OUT_DIR, 'story_06_der_schatten_im_garten.mp3');

const voice = 'nova';
const speed = 0.82;
const text = story.sentences.map(s => s.de).join('\n\n');

console.log(`Regenerating story_06 audio...`);
console.log(`  Voice:    ${voice}`);
console.log(`  Speed:    ${speed}`);
console.log(`  Sentences: ${story.sentences.length}`);
console.log(`  Text length: ${text.length} chars`);

const res = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${openaiKey}`,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        model: 'tts-1-hd',
        voice,
        input: text,
        speed,
    }),
});

if (!res.ok) {
    const err = await res.text();
    console.error('OpenAI TTS error:', err);
    process.exit(1);
}

const buffer = Buffer.from(await res.arrayBuffer());
fs.writeFileSync(OUT_PATH, buffer);
console.log(`Done! Written to: ${OUT_PATH} (${(buffer.length / 1024).toFixed(0)} KB)`);
