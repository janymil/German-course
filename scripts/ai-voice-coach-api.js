import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

// Load .env
const envPath = path.join(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
    fs.readFileSync(envPath, 'utf8')
        .split('\n')
        .filter(line => line.trim() && !line.startsWith('#'))
        .forEach(line => {
            const [key, ...rest] = line.split('=');
            if (key) {
                const value = rest.join('=').trim().replace(/"/g, '');
                if (value && !process.env[key.trim()]) {
                    process.env[key.trim()] = value;
                }
            }
        });
}

const ai = new GoogleGenAI({ apiKey: process.env.VITE_GEMINI_API_KEY });
const OPENAI_API_KEY = process.env.VITE_OPENAI_API_KEY;

export async function handleSegmentVideo(req, res) {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', async () => {
        try {
            const { videoId, transcript } = JSON.parse(body);
            if (!videoId || !transcript || !transcript.length) {
                res.writeHead(400); res.end(JSON.stringify({ error: 'Missing parameters' })); return;
            }

            const CACHE_DIR = path.join(process.cwd(), 'src', 'data', 'video-database');
            if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true });
            const SEGMENT_FILE = path.join(CACHE_DIR, `${videoId}-segments.json`);

            // Check cache first in case of parallel requests
            if (fs.existsSync(SEGMENT_FILE)) {
                res.writeHead(200); res.end(fs.readFileSync(SEGMENT_FILE)); return;
            }

            // Programmatic ~5-minute chunking algorithm
            const TARGET_CHUNK_MS = 5 * 60 * 1000; // 5 minutes
            const segments = [];
            let currentSegmentStartIdx = 0;

            for (let i = 0; i < transcript.length; i++) {
                const line = transcript[i];
                if (!transcript[currentSegmentStartIdx]) break; // Safety check

                const segmentDuration = line.offset - transcript[currentSegmentStartIdx].offset;

                // If we passed 5 minutes, try to find a natural break (end of sentence)
                if (segmentDuration >= TARGET_CHUNK_MS || i === transcript.length - 1) {
                    const text = line.text.trim();
                    // Cut if it ends a sentence, or if the chunk is getting way too long (>6m), or it's the very last line
                    const isEndOfSentence = /[.?!]$/.test(text) || /[.?!]["'„“]$/.test(text);

                    if (isEndOfSentence || segmentDuration > TARGET_CHUNK_MS + 60000 || i === transcript.length - 1) {
                        const startTimeMs = transcript[currentSegmentStartIdx].offset;
                        const endTimeMs = line.offset + line.duration;

                        segments.push({
                            startTimeMs,
                            endTimeMs,
                            topicDescription: `Teil ${segments.length + 1}`
                        });

                        currentSegmentStartIdx = i + 1;
                    }
                }
            }

            // Now optionally ask Gemini just to generate a nice 3-4 word title for each segment
            try {
                const titlePromises = segments.map(async (seg) => {
                    // Grab up to 4000 chars of this segment to give Gemini context for exactly what happened
                    const segText = transcript
                        .filter(t => t.offset >= seg.startTimeMs && t.offset <= seg.endTimeMs)
                        .map(t => t.text)
                        .join(' ')
                        .substring(0, 4000);

                    const aiTitle = await ai.models.generateContent({
                        model: 'gemini-2.5-flash-lite',
                        contents: `Analyze this video transcript segment. Return ONLY a very short, simple 2-4 word topic title in German summarizing what is happening (e.g. "Am Flughafen", "Begrüßung und Vorstellung", "Essen bestellen"). No quotes, no markdown, no other text.\n\nTranscript:\n${segText}`,
                        config: { temperature: 0.1 }
                    });

                    if (aiTitle.text) {
                        seg.topicDescription = aiTitle.text.replace(/["']/g, '').trim();
                    }
                });
                // Wait for all titles to be generated in parallel
                await Promise.allSettled(titlePromises);
            } catch (titleErr) {
                console.warn("AI title generation failed, using default titles (Teil X):", titleErr.message);
            }

            const segData = { segments };

            // Write to public folder cache
            fs.writeFileSync(SEGMENT_FILE, JSON.stringify(segData, null, 2));
            res.writeHead(200); res.end(JSON.stringify(segData));
        } catch (err) {
            console.error('[handleSegmentVideo] Error:', err);
            res.writeHead(500); res.end(JSON.stringify({ error: err.message }));
        }
    });
}

export async function handleTranscribeAudio(req, res) {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', async () => {
        try {
            const { base64Audio, type } = JSON.parse(body);
            if (!base64Audio) {
                res.writeHead(400); res.end(JSON.stringify({ error: 'No base64Audio provided' })); return;
            }

            const buffer = Buffer.from(base64Audio, 'base64');
            const tmpFile = path.join(process.cwd(), `tmp_${Date.now()}.webm`);
            fs.writeFileSync(tmpFile, buffer);

            const { File } = await import('node:buffer');

            // To properly send multipart/form-data via fetch in node natively, it's easier to use a boundary or FormData if supported:
            const FormData = globalThis.FormData;
            const form = new FormData();

            const fileBlob = new globalThis.Blob([buffer], { type: 'audio/webm' });
            form.append("file", fileBlob, "upload.webm");
            form.append("model", "whisper-1");
            form.append("language", "de"); // We expect the user to speak German

            const whisperRes = await fetch("https://api.openai.com/v1/audio/transcriptions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${OPENAI_API_KEY}`,
                },
                body: form
            });

            fs.unlinkSync(tmpFile); // Clean up temp file immediately

            if (!whisperRes.ok) {
                const errText = await whisperRes.text();
                throw new Error(`OpenAI STT Error: ${errText}`);
            }

            const data = await whisperRes.json();
            res.writeHead(200); res.end(JSON.stringify({ text: data.text }));
        } catch (err) {
            console.error('[handleTranscribeAudio] Error:', err);
            res.writeHead(500); res.end(JSON.stringify({ error: err.message }));
        }
    });
}

export async function handleVoiceChat(req, res) {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', async () => {
        try {
            const { userText, transcriptSegment, conversationHistory, videoLevel, segmentTopic, segmentContext } = JSON.parse(body);

            const level = videoLevel || 'A1';
            const topic = segmentTopic || 'Alltag';
            // segmentContext: raw transcript text from the 5-min block (already stored in segments.json)
            const contextSnippet = segmentContext
                ? segmentContext.slice(0, 800)  // keep it short in the prompt
                : '';

            // System instruction: use the actual scene content to seed a natural conversation
            const systemInstruction = `Führe ein natürliches Gespräch auf Deutsch. Das Niveau des Gesprächspartners ist ${level}.

Der Gesprächspartner hat gerade diesen Teil eines deutschen Videos gesehen:
---
${contextSnippet}
---

Das Kapitel heißt: "${topic}".

Starte das Gespräch natürlich — als wärst du jemand, der auch diesen Alltag kennt. Benutze Themen, Namen und Situationen aus dem Text als Gesprächsstoff. Sprich einfach (${level}-Niveau), maximal 2 kurze Sätze, und stell immer eine lockere Folgefrage. Erkläre nichts, lobe nicht, korrigiere nicht explizit — reagiere natürlich wie ein Mensch.
Wenn userText = "START": fang direkt an — beziehe dich auf etwas Konkretes aus dem Text.`;

            // 2. Build proper multi-turn conversation history
            const contents = [];
            if (conversationHistory && conversationHistory.length > 0) {
                for (const msg of conversationHistory) {
                    if (msg.role === 'system') continue; // skip system noise
                    contents.push({
                        role: msg.role === 'user' ? 'user' : 'model',
                        parts: [{ text: msg.content }]
                    });
                }
            }
            // Add current user message
            contents.push({ role: 'user', parts: [{ text: userText }] });

            // Gemini requires alternating user/model turns — ensure we don't start with model
            // and no two consecutive same-role turns
            const cleanedContents = [];
            let lastRole = null;
            for (const c of contents) {
                if (c.role === lastRole) {
                    // merge into previous
                    cleanedContents[cleanedContents.length - 1].parts[0].text += '\n' + c.parts[0].text;
                } else {
                    cleanedContents.push(c);
                    lastRole = c.role;
                }
            }
            // Must start with user
            if (cleanedContents.length > 0 && cleanedContents[0].role === 'model') {
                cleanedContents.shift();
            }

            let aiRes;
            try {
                aiRes = await ai.models.generateContent({
                    model: 'gemini-2.5-flash-lite',
                    contents: cleanedContents,
                    config: {
                        temperature: 0.8,
                        systemInstruction: systemInstruction
                    }
                });
            } catch (fallbackErr) {
                console.warn("Gemini Flash Lite failed, falling back to Flash:", fallbackErr.message);
                aiRes = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: cleanedContents,
                    config: {
                        temperature: 0.8,
                        systemInstruction: systemInstruction
                    }
                });
            }
            const AIResponseText = aiRes.text || "Das hast du gut gesagt!";

            // 2. Synthesize audio via OpenAI TTS
            const ttsReq = await fetch("https://api.openai.com/v1/audio/speech", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "tts-1",
                    input: AIResponseText,
                    voice: "nova" // Natural, supportive female voice
                })
            });

            if (!ttsReq.ok) {
                const err = await ttsReq.text();
                throw new Error("TTS Error: " + err);
            }

            const audioBuffer = Buffer.from(await ttsReq.arrayBuffer());
            const audioBase64 = audioBuffer.toString('base64');

            res.writeHead(200); res.end(JSON.stringify({
                text: AIResponseText,
                audioBase64: audioBase64
            }));
        } catch (err) {
            console.error('[handleVoiceChat] Error:', err);
            res.writeHead(500); res.end(JSON.stringify({ error: err.message }));
        }
    });
}

export async function handleGenerateVideoExercises(req, res) {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', async () => {
        try {
            const { videoId, segments } = JSON.parse(body);
            if (!videoId || !segments || !segments.length) {
                res.writeHead(400); res.end(JSON.stringify({ error: 'Missing videoId or segments' })); return;
            }

            const CACHE_DIR = path.join(process.cwd(), 'src', 'data', 'video-database');
            const CACHE_FILE = path.join(CACHE_DIR, `${videoId}-exercises.json`);

            // Serve from cache if available
            if (fs.existsSync(CACHE_FILE)) {
                const cached = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
                res.writeHead(200); res.end(JSON.stringify(cached)); return;
            }

            // Build context from all segments (max 600 chars each to stay within token limit)
            const segmentSummary = segments.map((seg, i) =>
                `[Kapitel ${i + 1}: "${seg.topicDescription}"]\n${(seg.segmentContext || '').slice(0, 600)}`
            ).join('\n\n');

            const prompt = `Du bist ein Deutschlehrer und erstellst Übungen für ein Lernvideo.

Hier sind die Transkripte der Kapitel aus dem Video:

${segmentSummary}

Analysiere das gesamte Vokabular und die Grammatikstrukturen in allen Kapiteln.
Identifiziere alle SPRACHLICHEN THEMEN die für Deutschlernende sinnvoll sind.
Beispiele: "Sich vorstellen", "Fragen stellen", "Orte beschreiben", "Zahlen und Mengen", etc.
Erstelle so viele Themen wie der Inhalt hergibt — weder zu wenige noch künstlich aufgeblasen.

Für jedes Thema erstelle so viele Übungen wie sinnvoll sind (mindestens 3, so viele wie nötig um das Thema gut zu üben).
Verwende eine Mischung aus den Typen: "mcq", "fill", "wordorder".

Regeln:
- Verwende nur Vokabular und Sätze die TATSÄCHLICH im Transkript vorkommen
- Nur A1-Niveau
- MCQ: immer genau 4 Optionen, answer = 0-basierter Index der richtigen Option
- Fill: ___ als Lücke, answer = das exakte fehlende Wort
- Wordorder: words = gemischte Token des Satzes, correct = der korrekte Satz ohne Satzzeichen als Token
- description = kurze Beschreibung auf Slowakisch was geübt wird

Antworte NUR mit gültigem JSON ohne Markdown-Formatierung:
{
  "topics": [
    {
      "title": "string",
      "description": "string (slowakisch)",
      "exercises": [
        { "type": "mcq", "question": "...", "options": ["","","",""], "answer": 0, "explanation": "..." },
        { "type": "fill", "sentence": "Ich ___ Sam.", "answer": "heiße", "explanation": "..." },
        { "type": "wordorder", "words": ["komme","ich","aus","Amerika"], "correct": "ich komme aus Amerika", "explanation": "..." }
      ]
    }
  ]
}`;

            let aiRes;
            try {
                aiRes = await ai.models.generateContent({
                    model: 'gemini-2.5-flash-lite',
                    contents: [{ role: 'user', parts: [{ text: prompt }] }],
                    config: { temperature: 0.3 }
                });
            } catch {
                aiRes = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: [{ role: 'user', parts: [{ text: prompt }] }],
                    config: { temperature: 0.3 }
                });
            }

            let rawText = aiRes.text || '';
            // Strip potential markdown code fences
            rawText = rawText.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();

            const exerciseData = JSON.parse(rawText);

            if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true });
            fs.writeFileSync(CACHE_FILE, JSON.stringify(exerciseData, null, 2));

            res.writeHead(200); res.end(JSON.stringify(exerciseData));
        } catch (err) {
            console.error('[handleGenerateVideoExercises] Error:', err);
            res.writeHead(500); res.end(JSON.stringify({ error: err.message }));
        }
    });
}
