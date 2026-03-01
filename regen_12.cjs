const fs = require('fs');
const path = require('path');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
  console.error("NO API KEY");
  process.exit(1);
}

const AUDIO_DIR = path.join(__dirname, 'public', 'audio', 'minitext');

const segments = [
  { speaker: 'nova', de: 'Jana ist in Wien. Sie geht in eine Sprachschule. Sie ist neu hier.' },
  { speaker: 'onyx', de: 'Guten Morgen! Sind Sie die neue Studentin?' },
  { speaker: 'shimmer', de: 'Guten Morgen. Ja, genau. Ich bin Jana. Jana Nováková.' },
  { speaker: 'onyx', de: 'Guten Tag, Frau Nováková. Ich heiße Schmidt. Ich arbeite hier an der Rezeption.' },
  { speaker: 'shimmer', de: 'Freut mich, Herr Schmidt.' },
  { speaker: 'onyx', de: 'Können Sie bitte Ihren Nachnamen buchstabieren?' },
  { speaker: 'shimmer', de: 'Ja, natürlich. N - O - V - Á - K - O - V - Á.' },
  { speaker: 'nova', de: 'Ein anderer Student steht auch hier.' },
  { speaker: 'echo', de: 'Hallo! Mein Name ist Thomas.' },
  { speaker: 'shimmer', de: 'Hallo Thomas. Ich bin Jana.' },
  { speaker: 'onyx', de: 'Sehr gut. Willkommen im Deutschkurs! Auf Wiedersehen.' },
  { speaker: 'shimmer', de: 'Auf Wiedersehen!' }
];

async function generate() {
  console.log(`Generating minitext for L01...`);
  
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    const filename = `L01_seg_${i}.mp3`;
    const filepath = path.join(AUDIO_DIR, filename);
    
    console.log(`Gen [${i}/${segments.length - 1}]: ${seg.de}`);
    
    try {
      const res = await fetch('https://api.openai.com/v1/audio/speech', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'tts-1-hd',
          voice: seg.speaker,
          input: seg.de,
          speed: 1.0
        })
      });
      
      if (!res.ok) throw new Error(await res.text())
      
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
