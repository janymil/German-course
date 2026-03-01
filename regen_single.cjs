require('dotenv').config();
const fs = require('fs');
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const text = "Jana ist in Wien. Sie geht in eine Sprachschule... Sie ist neu hier.\\n\\n Guten Morgen! Sind Sie die neue Studentin?\\n\\n Guten Morgen. Ja, genau. Ich bin Jana... Jana Nováková.\\n\\n Guten Tag, Frau Nováková. Ich heiße Schmidt. Ich arbeite hier an der Rezeption.\\n\\n Freut mich, Herr Schmidt.\\n\\n Können Sie bitte Ihren Nachnamen buchstabieren?\\n\\n Ja, natürlich: N, O, V, A, K, O, V, A.\\n\\nEin anderer Student, steht auch hier.\\n\\n Hallo! Mein Name ist Thomas.\\n\\n Hallo Thomas. Ich bin Jana.\\n\\n Sehr gut! ... Willkommen im Deutschkurs! ... Auf Wiedersehen.\\n\\n Auf Wiedersehen!";
async function gen() {
  console.log('Generating L01_full.mp3...');
  const res = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + OPENAI_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'tts-1-hd',
      voice: 'nova',
      input: text,
      speed: 1.0
    })
  });
  if (!res.ok) { console.error('Failed:', await res.text()); return; }
  const buffer = await res.arrayBuffer();
  fs.writeFileSync('public/audio/minitext/L01_full.mp3', Buffer.from(buffer));
  console.log('Saved public/audio/minitext/L01_full.mp3');
}
gen();
