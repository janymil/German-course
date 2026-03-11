import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Adjust imports based on your project structure
import { SHADOWING_STORIES } from '../src/data/shadowingStories.js';
import { GRAMMAR_DRILLS } from '../src/data/shadowingGrammarData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CONFIGURATION
// Add your ElevenLabs API Key here, or export it in your environment: "export ELEVENLABS_API_KEY=your_key"
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY || 'YOUR_API_KEY_HERE';

// Voice ID to use (You can find these in ElevenLabs VoiceLab)
// Default is just an example (e.g., "Rachel" or a German native voice if you have one saved)
// It is highly recommended to use a German native voice ID here!
const VOICE_ID = 'pNInz6obbf5AWB31A8Cq'; // Replace with a German Voice ID

// Output directory
const OUTPUT_DIR = path.join(__dirname, '../public/audio/shadowing');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function generateAudio(text, filename) {
  const filePath = path.join(OUTPUT_DIR, filename);
  
  // Skip if already generated
  if (fs.existsSync(filePath)) {
    console.log(`[SKIPPED] ${filename} already exists.`);
    return true;
  }

  console.log(`[GENERATING] ${filename}: "${text.substring(0, 30)}..."`);

  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?output_format=mp3_44100_128`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: text,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.0,
          use_speaker_boost: true
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[ERROR] Failed to generate ${filename}: ${response.status} - ${errorText}`);
      return false;
    }

    const buffer = await response.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(buffer));
    console.log(`[SUCCESS] Saved ${filename}`);
    return true;

  } catch (err) {
    console.error(`[ERROR] Exception while generating ${filename}:`, err.message);
    return false;
  }
}

// Small delay function to respect API rate limits
const delay = ms => new Promise(res => setTimeout(res, ms));

async function main() {
  if (ELEVENLABS_API_KEY === 'YOUR_API_KEY_HERE') {
    console.error("❌ ERROR: Please set your ElevenLabs API key in the script or run with ELEVENLABS_API_KEY=your_key node script.js");
    return;
  }

  console.log("Starting Audio Generation for Shadowing App...\n");

  // 1. Generate for Grammar Drills
  for (const drill of GRAMMAR_DRILLS) {
    console.log(`Processing Grammar Drill: ${drill.title}`);
    for (const segment of drill.segments) {
      const filename = `drill_${drill.id}_${segment.id}.mp3`;
      await generateAudio(segment.german, filename);
      await delay(500); // 500ms delay to prevent rate-limiting
    }
  }

  // 2. Generate for Stories
  for (const story of SHADOWING_STORIES) {
    console.log(`\nProcessing Story: ${story.title}`);
    for (const segment of story.segments) {
      const filename = `story_${story.id}_${segment.id}.mp3`;
      await generateAudio(segment.german, filename);
      await delay(500); 
    }
  }

  console.log("\n🎉 All audio generation finished!");
}

main();
