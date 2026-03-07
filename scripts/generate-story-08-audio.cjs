const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const OPENAI_API_KEY = process.env.VITE_OPENAI_API_KEY || process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
    console.error("No OpenAI API Key found!");
    process.exit(1);
}

const text = `Ich habe heute Lust auf etwas Süßes. Ich schaue auf den Tisch. In der Obstschale liegen drei braune Bananen. Sie sind schon sehr reif. Das ist perfekt! Denn mit reifen Bananen kann man sehr leckeres Bananenbrot backen. Ich gehe in die Küche und beginne. Zuerst schäle ich die Bananen. Ich werfe die Bananenschale in den Müll. Ich lege die Bananen in eine kleine Schale. Ich zerdrücke die Bananen mit der Gabel. Das dauert nur kurz. Jetzt brauche ich eine große Schüssel. Ich wiege den Zucker mit der Waage ab. Das Mehl und etwas Backpulver gebe ich durch ein Sieb in die Schüssel. Dann hole ich zwei Eier und etwas Öl. Ich mische alles zusammen. Ich verrühre alles gut mit dem Schneebesen. Zum Schluss gebe ich noch ein paar Walnüsse in den Teig. Ich schneide die Nüsse vorher mit dem Messer in kleine Stücke. Jetzt ist der Teig fertig. Ich nehme eine Kastenform und gieße den Teig hinein. Oh, ich habe vergessen, den Backofen einzuschalten! Ich mache das schnell. Wir stellen den Kuchen in den Backofen. Jetzt muss ich warten. Nach 35 Minuten teste ich mit der Messerspitze, ob der Kuchen fertig ist. Ja, er ist perfekt. Ich lasse ihn abkühlen. Dann schneide ich eine Scheibe ab. Es schmeckt fantastisch!`;

async function generateAudio() {
    console.log("Generating audio for story 08...");
    try {
        const response = await fetch('https://api.openai.com/v1/audio/speech', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'tts-1',
                input: text,
                voice: 'nova',
            })
        });

        if (!response.ok) {
            console.error("Failed!", await response.text());
            return;
        }

        const buffer = await response.arrayBuffer();
        const outputPath = path.join(__dirname, '../public/audio/stories/story_08_bananenbrot.mp3');
        fs.writeFileSync(outputPath, Buffer.from(buffer));
        console.log("Saved audio to", outputPath);
    } catch (e) {
        console.error("Error", e);
    }
}
generateAudio();
