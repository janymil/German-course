/**
 * useAI — OpenAI GPT-4o-mini hook for writing correction and conversation.
 * API key is stored in localStorage under 'openai_api_key'.
 */

const MODEL = 'gpt-4o-mini';
const API_URL = 'https://api.openai.com/v1/chat/completions';

function getKey() {
  return localStorage.getItem('openai_api_key') || '';
}

async function callOpenAI(messages, { temperature = 0.4, max_tokens = 600 } = {}) {
  const key = getKey();
  if (!key) throw new Error('NO_KEY');

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({ model: MODEL, messages, temperature, max_tokens }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const code = err?.error?.code || res.status;
    throw new Error(code === 'invalid_api_key' ? 'INVALID_KEY' : `API_ERROR:${res.status}`);
  }

  const data = await res.json();
  return data.choices[0].message.content.trim();
}

/**
 * Check a user-written German sentence.
 * Returns a JSON-structured response with: correct, corrected, explanation, tip
 */
export async function checkWriting({ userText, prompt, lessonContext }) {
  const system = `Si jazykový lektor nemčiny pre slovenských začiatočníkov (úroveň A1).
Tvoja úloha: oprav žiacku nemeckú vetu a vysvetli chyby v SLOVENČINE — stručne, jasne, priateľsky.
DÔLEŽITÉ: ss namiesto ß, ae namiesto ä, oe namiesto ö, ue namiesto ü sú SPRÁVNE alternatívy — NIKDY ich nepovažuj za chybu. Sú to štandardné ASCII náhrady pre nemecké znaky.
Odpovedaj VÝHRADNE v JSON formáte (žiadny markdown, žiadny text mimo JSON):
{
  "correct": true/false,
  "corrected": "správna nemecká veta",
  "explanation": "krátke slovenské vysvetlenie (max 2 vety)",
  "tip": "jedno konkrétne gramatické pravidlo ako tip (max 1 veta, po slovensky)"
}
Ak je veta správna, "corrected" = rovnaká ako vstup, "explanation" = pochvala.`;

  const user = `Kontext lekcie: ${lessonContext}
Zadanie pre žiaka: "${prompt}"
Žiakova odpoveď: "${userText}"`;

  const raw = await callOpenAI(
    [{ role: 'system', content: system }, { role: 'user', content: user }],
    { temperature: 0.2, max_tokens: 300 }
  );

  try {
    return JSON.parse(raw);
  } catch {
    // Fallback if model returns non-JSON
    return {
      correct: false,
      corrected: userText,
      explanation: raw,
      tip: '',
    };
  }
}

/**
 * Send a conversation message.
 * characterPrompt defines who the AI is playing (constrained to A1 German).
 */
export async function sendConversationMessage({ messages, characterPrompt }) {
  const system = `${characterPrompt}

PRAVIDLÁ:
- Hovoríš VÝHRADNE po nemecky — maximálna úroveň A1 (jednoduché vety, základná slovná zásoba).
- Ak žiak urobí gramatickú chybu, jemne ho oprav v závorke po slovensky, potom pokračuj v nemčine.
  Príklad: "(Tip: správne je 'Ich heiße', nie 'Ich bin heiße') Schön, dich kennenzulernen!"
- Odpovede max 2-3 vety — krátke, prirodzené, A1 úroveň.
- Nikdy neopúšťaj postavu.
- DÔLEŽITÉ: ss namiesto ß, ae namiesto ä, oe namiesto ö, ue namiesto ü sú SPRÁVNE alternatívy — NIKDY ich neopravuj. Sú to štandardné ASCII náhrady.
- Ak ti žiak povie svoje meno, zapamätaj si ho a použi ho. Nepoužívaj iné meno.`;

  const raw = await callOpenAI(
    [{ role: 'system', content: system }, ...messages],
    { temperature: 0.7, max_tokens: 200 }
  );

  return raw;
}
