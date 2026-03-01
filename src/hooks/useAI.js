/**
 * useAI — Google Gemini 2.5 Flash Lite hook for writing correction and conversation.
 * API key is stored in localStorage under 'gemini_api_key' or env VITE_GEMINI_API_KEY.
 */

const API_VERSION = 'v1beta';
const MODEL = 'gemini-2.5-flash-lite';
const BASE_URL = `https://generativelanguage.googleapis.com/${API_VERSION}/models/${MODEL}:generateContent`;

function getKey() {
  return import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('gemini_api_key') || '';
}

/**
 * Maps OpenAI-style messages array to Gemini contents array.
 * Extracts the first 'system' message as systemInstruction.
 */
function mapToGeminiPayload(messages, temperature, isJsonMode = false, maxOutputTokens = 600) {
  let systemInstruction = null;
  const contents = [];

  for (const msg of messages) {
    if (msg.role === 'system') {
      systemInstruction = { parts: [{ text: msg.content }] };
    } else {
      contents.push({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      });
    }
  }

  const payload = {
    contents,
    generationConfig: {
      temperature,
      maxOutputTokens,
    }
  };

  if (systemInstruction) {
    payload.systemInstruction = systemInstruction;
  }

  if (isJsonMode) {
    payload.generationConfig.responseMimeType = 'application/json';
  }

  return payload;
}

export async function callGemini(messages, { temperature = 0.4, isJsonMode = false, maxOutputTokens = 600 } = {}) {
  const key = getKey();
  if (!key) throw new Error('NO_KEY');

  const payload = mapToGeminiPayload(messages, temperature, isJsonMode, maxOutputTokens);

  const res = await fetch(`${BASE_URL}?key=${key}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const code = err?.error?.code || res.status;
    const msg = err?.error?.message || '';
    if (code === 400 && msg.includes('API key not valid')) throw new Error('INVALID_KEY');
    throw new Error(`API_ERROR:${code}`);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  return text.trim();
}

/**
 * Check a user-written German sentence.
 * Returns a JSON-structured response with: correct, corrected, explanation, tip
 */
export async function checkWriting({ userText, prompt, lessonContext }) {
  // Check if we have a cached answer for this specific prompt and user input
  let cache = {};
  
  try {
    const res = await fetch('/api/writing-cache');
    if (res.ok) {
      cache = await res.json();
    }
  } catch (e) {
    console.warn("Failed to read writing cache via API", e);
  }

  // Normalize inputs to make caching more reliable
  const normalizedPrompt = prompt.trim().toLowerCase();
  const normalizedUserText = userText.trim().toLowerCase();
  const exactKey = `${normalizedPrompt}|||${normalizedUserText}`;

  if (cache[exactKey]) {
    console.log("Using cached AI writing evaluation for:", userText);
    return cache[exactKey];
  }

  const system = `Si jazykový lektor nemčiny pre slovenských začiatočníkov (úroveň A1).
Tvoja úloha: oprav žiacku nemeckú vetu a vysvetli chyby v SLOVENČINE — stručne, jasne, priateľsky.

### ABSOLÚTNE PRAVIDLO — NIKDY NEPORUŠ:
Nasledujúce ASCII náhrady nemeckých špeciálnych znakov sú PLNE SPRÁVNE a ROVNOCENNÉ s originálnymi znakmi:
  • ss = ß  (napr. "heisse" = "heiße" — OBOJE SÚ SPRÁVNE)
  • ae = ä  (napr. "haette" = "hätte")
  • oe = ö  (napr. "schoen" = "schön")
  • ue = ü  (napr. "muede" = "müde")
Ak sa žiakova odpoveď líši od správnej VÝLUČNE použitím týchto náhrad, nastav "correct": true.
NIKDY nestanovuj "correct": false len kvôli týmto náhradám. NIKDY.
Tiež ignoruj chýbajúce alebo nadbytočné interpunkčné znamienka (bodka, čiarka, výkričník). Interpunkcia NESMIE byť dôvodom na "correct": false.

Odpovedaj VÝHRADNE v JSON formáte (žiadny iný text mimo JSON):
{
  "correct": true/false,
  "corrected": "správna nemecká veta",
  "explanation": "krátke slovenské vysvetlenie (max 2 vety)",
  "tip": "jedno konkrétne gramatické pravidlo ako tip (max 1 veta, po slovensky)"
}
Ak je veta správna, "corrected" = rovnaká ako vstup, "explanation" = pochvala po slovensky.`;

  const user = `Kontext lekcie: ${lessonContext}
Zadanie pre žiaka: "${prompt}"
Žiakova odpoveď: "${userText}"`;

  const raw = await callGemini(
    [{ role: 'system', content: system }, { role: 'user', content: user }],
    { temperature: 0.2, isJsonMode: true }
  );

  try {
    const parsed = JSON.parse(raw);
    
    // Save successful API response to cache via API endpoint
    cache[exactKey] = parsed;
    try {
      await fetch('/api/writing-cache', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cache)
      });
    } catch (e) {
      console.warn("Failed to write to writing cache via API", e);
    }
    
    return parsed;
  } catch {
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
export async function sendConversationMessage({ messages, characterPrompt, completedLessonsCount = 0, masteredWordsCount = 0 }) {
  // [Agent 6] Adapt the AI's language complexity to the user's current level
  const levelHint = completedLessonsCount === 0
    ? 'Žiak práve začína — používaj len tie najzákladnejšie A1 výrazy (čísla, pozdravy, mená).'
    : completedLessonsCount <= 5
      ? `Žiak dokončil ${completedLessonsCount} lekcií a ovláda asi ${masteredWordsCount} slov. Používaj jednoduchú A1 slovnú zásobu.`
      : completedLessonsCount <= 12
        ? `Žiak dokončil ${completedLessonsCount} lekcií a ovláda asi ${masteredWordsCount} slov. Môžeš používať bežné A1 vety vrátane minulého a prítomného času.`
        : `Žiak je pokročilý A1 žiak s ${completedLessonsCount} lekciami a ${masteredWordsCount} ovládanými slovami. Môžeš byť trochu zložitejší.`;

  const system = `${characterPrompt}

PRAVIDLÁ:
- Hovoríš VÝHRADNE po nemecky — maximálna úroveň A1 (jednoduché vety, základná slovná zásoba).
- ${levelHint}
- Ak žiak urobí gramatickú chybu, jemne ho oprav v závorke po slovensky obalenej do [Tip: ...], potom pokračuj v nemčine.
  Príklad: "[Tip: správne je 'Ich heiße', nie 'Ich bin heiße'] Schön, dich kennenzulernen!"
- Odpovede max 2-3 vety — krátke, prirodzené, A1 úroveň.
- Nikdy neopúšťaj postavu.
- DÔLEŽITÉ: ss namiesto ß, ae namiesto ä, oe namiesto ö, ue namiesto ü sú SPRÁVNE alternatívy — NIKDY ich neopravuj. Sú to štandardné ASCII náhrady.
- Ak ti žiak povie svoje meno, zapamätaj si ho a použi ho. Nepoužívaj iné meno.`;

  const raw = await callGemini(
    [{ role: 'system', content: system }, ...messages],
    { temperature: 0.7 }
  );

  return raw;
}

/**
 * Get a contextual explanation for why an answer is incorrect.
 */
export async function getExplanation({ question, correctAnswer, userAnswer }) {
  const system = `Si jazykový lektor nemčiny pre slovenských začiatočníkov (úroveň A1).
Tvoja úloha: stručne, jasne a priateľsky vysvetliť v SLOVENČINE (nepoužívaj iný jazyk), prečo je odpoveď žiaka nesprávna a aké gramatické pravidlo porušil. Píš priamo k veci, max 2 vety.`;

  const user = `Kontext / Otázka: "${question}"
Správna nemecká odpoveď: "${correctAnswer}"
Tvoja zvolená nesprávna odpoveď: "${userAnswer}"

Povedz mi, prečo som urobil chybu.`;

  const raw = await callGemini(
    [{ role: 'system', content: system }, { role: 'user', content: user }],
    { temperature: 0.3 }
  );

  return raw;
}

/**
 * Generate a post-session feedback summary from the full conversation transcript.
 * Returns structured JSON: { summary, errors[], newWords[], tipForNextTime }
 */
export async function generateSessionFeedback({ messages, charName, charRole }) {
  const transcript = messages
    .filter(m => m.role === 'user' || m.role === 'assistant')
    .map(m => `${m.role === 'user' ? 'Žiak' : charName}: ${m.content}`)
    .join('\n');

  const system = `Si skúsený lektor nemčiny (A1 úroveň) pre slovenských začiatočníkov.
Dostaneš prepis rozhovoru medzi žiakom a AI postavou "${charName}" (${charRole}).
Analyzuj LEN správanie žiaka (jeho vety). Odpovedaj VÝHRADNE v JSON formáte:
{
  "summary": "1-2 vety po slovensky — celkové hodnotenie, ako sa žiak správal",
  "errors": [
    { "wrong": "čo žiak povedal", "correct": "správna verzia", "rule": "krátke vysvetlenie pravidla po slovensky" }
  ],
  "newWords": ["zoznam nemeckých slov ktoré žiak reálne použil počas rozhovoru"],
  "tipForNextTime": "1 konkrétny tip čo si žiak má precvičiť do budúcna, po slovensky"
}
Ak žiak neurobil žiadne chyby, "errors" = [].
Ak žiak nenapísal nič alebo len 1 vetu, "summary" = "Krátky rozhovor — skús si nabudúce viac precvičiť.", ostatné polia prázdne.`;

  const user = `Prepis rozhovoru:\n${transcript}`;

  const raw = await callGemini(
    [{ role: 'system', content: system }, { role: 'user', content: user }],
    { temperature: 0.3, isJsonMode: true }
  );

  try {
    return JSON.parse(raw);
  } catch {
    return {
      summary: 'Feedback sa nepodarilo načítať.',
      errors: [],
      newWords: [],
      tipForNextTime: '',
    };
  }
}

/**
 * Generate a grammar card for any German word dynamically, matching the format in stories.js.
 */
export async function generateGrammarCard({ word, sentence }) {
  const system = `Si lingvista nemeckého jazyka a pomáhaš v aplikácii na čítanie.
Tvoja úloha: Pre dané nemecké slovo, ktoré sa vyskytuje v konkrétnej vete, vygeneruj detailnú gramatickú kartu vo formáte JSON.
Musíš zistiť správny slovný druh (type: "noun", "verb", "preposition", "adjective", "adverb", "other") a podľa neho doplniť štruktúru presne takto:

Pre PODSTATNÉ MENÁ (noun):
{
  "type": "noun", "sk": "preklad slova do slovenčiny", "article": "der/die/das", "plural": "napr. die Häuser",
  "cases": { "Nominativ": "...", "Akkusativ": "...", "Dativ": "...", "Genitiv": "..." },
  "example": "veta z kontextu", "exampleSk": "slovenský preklad vety"
}

Pre SLOVESÁ (verb) - vždy vyčasuj v prítomnom čase (Präsens):
{
  "type": "verb", "sk": "preklad", "infinitiv": "neurčitok",
  "conjugation": { "ich": "...", "du": "...", "er/sie/es": "...", "wir": "...", "ihr": "...", "sie": "..." },
  "example": "veta z kontextu", "exampleSk": "slovenský preklad"
}

Pre PRÍDAVNÉ MENÁ (adjective) a PRÍSLOVKY (adverb) - vygeneruj stupňovanie (ak sa dá), inak comparison: null:
{
  "type": "adjective", "sk": "preklad",
  "comparison": { "Positiv": "...", "Komparativ": "...", "Superlativ": "..." },
  "example": "veta", "exampleSk": "preklad"
}

Pre PREDLOŽKY (preposition) - pridaj polia governs (napr. ["Dativ", "Akkusativ"]), note (vysvetlenie po slovensky) a examples (zoznam 2 príkladov):
{
  "type": "preposition", "sk": "preklad",
  "governs": ["Dativ"], "note": "Kedy sa používa...",
  "examples": [ { "de": "nemecký príklad", "sk": "slovenský preklad" } ]
}

Odpovedz VÝHRADNE minifikovaným JSON objektom, VÝLUČNE pre dané slovo, presne podľa jednej z týchto štruktúr. NIKDY nevracaj žiadny iný text.`;

  const user = `Nemecké slovo: "${word}"
Kontextová veta, kde sa slovo nachádza: "${sentence}"

Vygeneruj JSON gramatickú kartu pre toto slovo vychádzajúc z tejto vety.`;

  const raw = await callGemini(
    [{ role: 'system', content: system }, { role: 'user', content: user }],
    { temperature: 0.1, isJsonMode: true }
  );

  try {
    return JSON.parse(raw);
  } catch {
    throw new Error('Nepodarilo sa vygenerovať gramatickú kartu');
  }
}
