import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

export async function handleGenerateDrill(req, res) {
  try {
    const aiApi = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    await new Promise(resolve => req.on('end', resolve));
    
    const { word } = JSON.parse(body);
    if (!word) {
      res.writeHead(400); res.end(JSON.stringify({ error: 'Slovo nebolo zadané.' }));
      return;
    }

    const prompt = `Si nemecký lingvista. Vytvor 15 kontextových viet pre nemecké slovíčko/frázu: "${word}".
Vety musia byť prirozdené, na úrovni A1/A2, ale neskutočne užitočné pre prax (denná konverzácia).
Každá veta musí toto slovíčko obsahovať presne v takom tvare, aby sa dalo spätne vybrať do "dopĺňačky" (fill-in-the-blank).
Odpovedz IBA vo formáte čistého JSON-u bez mardownu, takto:
{
  "word": "nemecké slovo",
  "wordSk": "slovenský preklad slova",
  "sentences": [
    {
      "de": "Veta v nemčine obsahujúca dané slovo",
      "sk": "Slovenský preklad vety",
      "missingTarget": "Presný tvar toho slova vo vete (aby sme to mohli vymazať pre doplňovačku)"
    }
  ]
}`;

    const response = await aiApi.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
    });
    
    const rawText = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
    const data = JSON.parse(rawText);

    // Save it to a custom file
    const DB_FILE = path.join(process.cwd(), 'src', 'data', 'intensive_drills_custom.json');
    let DB = [];
    if (fs.existsSync(DB_FILE)) {
      DB = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    }
    
    // Check if the word already exists
    const existingIndex = DB.findIndex(d => d.word === data.word);
    if (existingIndex > -1) {
      DB[existingIndex] = data; // Update
    } else {
      DB.push(data);
    }
    
    fs.writeFileSync(DB_FILE, JSON.stringify(DB, null, 2), 'utf8');

    res.writeHead(200);
    res.end(JSON.stringify({ success: true, data }));

  } catch (error) {
    console.error('[GenerateDrill]', error);
    res.writeHead(500);
    res.end(JSON.stringify({ error: error.message }));
  }
}
