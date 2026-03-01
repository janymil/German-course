const fs = require('fs');
const path = require('path');

// Pull lesson01
const { lesson01 } = require('../src/data/lessons/L01.js');
const minitext = lesson01.exercises.find(e => e.type === 'minitext');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
  console.error("NO API KEY");
  process.exit(1);
}

const AUDIO_DIR = path.join(__dirname, '..', 'public', 'audio', 'minitext');
if (!fs.existsSync(AUDIO_DIR)) fs.mkdirSync(AUDIO_DIR, { recursive: true });

const VOICE_MAP = {
  narrator: 'nova',
  jana: 'shimmer',
  receptionist: 'fable',
  schmidt: 'onyx',
  tom: 'echo'
};

async function generate() {
  console.log(`Generating minitext for L01...`);
  
  for (let i = 0; i < minitext.textSegments.length; i++) {
    const seg = minitext.textSegments[i];
    const filename = `L01_seg_${i}.mp3`;
    const filepath = path.join(AUDIO_DIR, filename);
    
    console.log(`Gen [${i}/${minitext.textSegments.length - 1}]: ${seg.de} (${seg.speaker})`);
    
    // Always overwrite for this fix to ensure slow speed is applied!
    
    const voice = VOICE_MAP[seg.speaker] || 'nova';
    try {
      const res = await fetch('https://api.openai.com/v1/audio/speech', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'tts-1-hd',
          voice: voice,
          input: seg.de,
          speed: 1.0 // 1.0 ensures natural intonation; lower speeds ruin OpenAI intonation
        })
      });
      
      if (!res.ok) {
        throw new Error(await res.text())
      }
      
      const arrayBuffer = await res.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFileSync(filepath, buffer);
      console.log(` -> Saved ${filename}`);
      
    } catch(err) {
      console.error(` -> Failed ${filename}:`, err.message);
    }
  }
}

generate().catch(console.error);