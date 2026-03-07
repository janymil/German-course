import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

async function generateStoryAudio() {
    const text = `Am Morgen wachen wir früh auf. Der Himmel ist blau. Wir verlassen das Haus und nehmen den Bus in die Stadt. Neben der Bushaltestelle ist ein großer Marktplatz. Dort kaufen wir eine Brezel. Dann beginnt der Spaziergang. Heute sind wir in der Stadt Udine. Das Wetter ist wunderschön und die Sonne scheint. Ich bin mit meinem Hund Taco unterwegs. Wir spazieren durch die historische Innenstadt. Zuerst gehen wir über die Brücke. Das Wasser unter der Brücke ist sehr klar und blau. Es gibt hier viele alte Häuser. Nach dem Spaziergang bin ich müde und brauche eine Pause. Wir gehen in den Park. Ich sitze auf einer Bank. Ich sitze in dem Schatten, denn es ist heute sehr heiß. Taco ist auch müde. Er liegt unter der Bank und schläft neben meinem Rucksack. Später haben wir Durst. Wir suchen und finden einen schönen Platz. Aus dem Brunnen dort kommt frisches Trinkwasser. Das ist sehr erfrischend! Zwischen den Bäumen singen die Vögel. Am Nachmittag wollen wir in ein Restaurant gehen, aber das Restaurant ist leider geschlossen. Zum Glück ist ein Café daneben geöffnet. Ich trinke wie immer einen Kaffee mit Milch – einen Latte Macchiato. Auf dem Tisch steht eine grüne Pflanze. Ich rühre meinen Kaffee mit dem Löffel. Bevor wir nach Hause gehen, werfen wir unseren Müll in den Mülleimer. Am Abend fahren wir mit dem Zug zurück. Taco schläft sofort auf dem Sofa ein. Es war ein toller Tag!`;

    const apiKey = process.env.VITE_OPENAI_API_KEY || process.env.OPENAI_API_KEY;

    if (!apiKey) {
        console.error("No OpenAI API Key found!");
        process.exit(1);
    }

    console.log("Generating audio with OpenAI TTS...");
    const response = await fetch('https://api.openai.com/v1/audio/speech', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'tts-1',
            input: text,
            voice: 'nova',
        })
    });

    if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    const outputPath = path.join(__dirname, 'public', 'audio', 'stories', 'story_07_udine_spaziergang.mp3');
    fs.writeFileSync(outputPath, Buffer.from(buffer));
    console.log(`Audio saved successfully to ${outputPath}`);
}

generateStoryAudio().catch(console.error);
