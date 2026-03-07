/**
 * useAI — Google Gemini 2.5 Flash Lite hook for writing correction and conversation.
 * API key is stored in localStorage under 'gemini_api_key' or env VITE_GEMINI_API_KEY.
 */

const API_VERSION = 'v1beta';
const MODEL = 'gemini-2.5-flash-lite';

function getKey() {
  return import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('gemini_api_key') || '';
}

// ── Knowledge Base helpers ───────────────────────────────────────────────────
/**
 * Look up a cached AI result from the unified knowledge base.
 * Returns the cached output or null if not found.
 */
async function kbLookup(type, key) {
  try {
    const res = await fetch(`/api/kb?type=${encodeURIComponent(type)}&key=${encodeURIComponent(key)}`);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.found) {
      const label = data.fuzzy ? '[KB FUZZY HIT]' : '[KB HIT]';
      console.log(`${label} ${type}:: "${key.slice(0, 60)}"`);
      return data.output;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Save an AI result to the unified knowledge base (fire-and-forget).
 */
function kbSave({ type, key, input, output, model, sourceApp }) {
  fetch('/api/kb', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, key, input, output, model: model || MODEL, sourceApp: sourceApp || '' })
  }).catch(() => { /* fire-and-forget — never block the user */ });
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

export async function callGemini(messages, { temperature = 0.4, isJsonMode = false, maxOutputTokens = 600, modelOverride = null } = {}) {
  const key = getKey();
  if (!key) throw new Error('NO_KEY');

  const payload = mapToGeminiPayload(messages, temperature, isJsonMode, maxOutputTokens);
  const targetModel = modelOverride || MODEL;
  const baseUrl = `https://generativelanguage.googleapis.com/${API_VERSION}/models/${targetModel}:generateContent`;

  const res = await fetch(`${baseUrl}?key=${key}`, {
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

  // Track usage for API Stats
  const usage = data?.usageMetadata;
  if (usage) {
    try {
      fetch('/api/stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: MODEL, type: 'inputTokens', amount: usage.promptTokenCount || 0 })
      }).catch(() => { });
      fetch('/api/stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: MODEL, type: 'outputTokens', amount: usage.candidatesTokenCount || 0 })
      }).catch(() => { });
      fetch('/api/stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: MODEL, type: 'calls', amount: 1 })
      }).catch(() => { });
    } catch (e) { }
  }

  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  return text.trim();
}

/**
 * Check a user-written German sentence.
 * Returns a JSON-structured response with: correct, corrected, explanation, tip
 */
export async function checkWriting({ userText, prompt, lessonContext }) {
  // ── 1. Knowledge Base exact-match lookup ───────────────────────────────────
  const normalizedPrompt = prompt.trim().toLowerCase();
  const normalizedUserText = userText.trim().toLowerCase();
  const kbKey = `${normalizedPrompt}|||${normalizedUserText}`;

  const cached = await kbLookup('writing', kbKey);
  if (cached) return cached;

  // ── 2. Legacy writing-cache fallback (safety net during transition) ────────
  try {
    const legacyRes = await fetch('/api/writing-cache');
    if (legacyRes.ok) {
      const legacyCache = await legacyRes.json();
      if (legacyCache[kbKey]) {
        console.log('[Legacy cache] HIT writing:', userText);
        // Promote to KB so it is found faster next time
        kbSave({ type: 'writing', key: kbKey, input: { prompt, userText, lessonContext }, output: legacyCache[kbKey], sourceApp: 'writing_checker (promoted)' });
        return legacyCache[kbKey];
      }
    }
  } catch { /* legacy cache may not be available in production */ }

  const system = `Si jazykový lektor nemčiny pre slovenských začiatočníkov (úroveň A1).
Tvoja úloha: oprav žiacku nemeckú vetu a vysvetli chyby v SLOVENČINE — stručne, jasne, priateľsky.

### ABSOLÚTNE PRAVIDLO — NIKDY NEPORUŠ:
Nasledujúce "chyby" NESMÚ byť označené ako zlé (musíš nastaviť "correct": true, ak v texte nie sú aj iné hrubé chyby). Za tieto chyby NIKDY nezhadzuj správnosť:
1. Malé a veľké písmená: Ak žiak napíše podstatné meno malým písmenom (napr. "haus" namiesto "Haus") alebo začne vetu malým písmenom.
2. ASCII náhrady: ss = ß (heisse=heiße), ae = ä (haette=hätte), oe = ö, ue = ü sú PLNE SPRÁVNE.
3. Interpunkcia: chýbajúce alebo nadbytočné znamienka (bodka, čiarka, výkričník).
4. Číslovky: "10" je u teba rovnocenné ako "zehn".

Ak sa žiakova odpoveď líši od správnej VÝLUČNE v bodoch 1, 2, 3 alebo 4, MUSÍŠ dať "correct": true (v "explanation" alebo v "tip" ho môžeš iba poznamenať, aby si na to dával pozor).

Odpovedaj VÝHRADNE v JSON formáte (žiadny iný text mimo JSON):
{
  "correct": true/false,
  "corrected": "správna nemecká veta (s opravenými písmenami a preklepmi)",
  "explanation": "krátke slovenské vysvetlenie (max 2 vety)",
  "tip": "jedno konkrétne gramatické pravidlo ako tip (max 1 veta, po slovensky)"
}
Ak je veta správna len s tolerovanými formátovacími chybami (veľké/malé písmená atď.), daj "correct": true, pochváľ ho a upozorni na formát.`;

  const user = `Kontext lekcie: ${lessonContext}
Zadanie pre žiaka: "${prompt}"
Žiakova odpoveď: "${userText}"`;

  const raw = await callGemini(
    [{ role: 'system', content: system }, { role: 'user', content: user }],
    { temperature: 0.2, isJsonMode: true, modelOverride: 'gemini-2.5-flash-lite' }
  );

  try {
    const parsed = JSON.parse(raw);

    // Save to unified Knowledge Base (primary)
    kbSave({
      type: 'writing',
      key: kbKey,
      input: { prompt, userText, lessonContext },
      output: parsed,
      sourceApp: 'writing_checker'
    });

    // Also write to legacy writing-cache for backward compatibility
    try {
      const legacyRes2 = await fetch('/api/writing-cache');
      const legacyCache2 = legacyRes2.ok ? await legacyRes2.json() : {};
      legacyCache2[kbKey] = parsed;
      await fetch('/api/writing-cache', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(legacyCache2)
      });
    } catch { /* not critical */ }

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
  // ── Knowledge Base lookup ───────────────────────────────────────────────────
  const kbKey = `${question.trim().toLowerCase()}|||${correctAnswer.trim().toLowerCase()}|||${userAnswer.trim().toLowerCase()}`;
  const cached = await kbLookup('explanation', kbKey);
  if (cached) return cached;

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

  // Save to KB
  kbSave({
    type: 'explanation',
    key: kbKey,
    input: { question, correctAnswer, userAnswer },
    output: raw,
    sourceApp: 'explanation'
  });

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
  // ── Knowledge Base lookup (keyed by word only — same word = same card) ─────
  const kbKey = word.trim().toLowerCase();
  const cached = await kbLookup('grammar_card', kbKey);
  if (cached) return cached;
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

DÔLEŽITÉ PRAVIDLO PRE 'example': Nikdy negeneruj robotické, hlúpe vety. Očakávam maximálnu variabilitu a prirodzenosť. Striedaj podnety (ich, du, er, sie, wir...) a neopakuj "Das ist mein...". Predstav si reálnu, živú situáciu.

Odpovedz VÝHRADNE minifikovaným JSON objektom, VÝLUČNE pre dané slovo, presne podľa jednej z týchto štruktúr. NIKDY nevracaj žiadny iný text.`;

  const user = `Nemecké slovo: "${word}"
Kontextová veta, kde sa slovo nachádza: "${sentence}"

Vygeneruj JSON gramatickú kartu pre toto slovo vychádzajúc z tejto vety.`;

  const raw = await callGemini(
    [{ role: 'system', content: system }, { role: 'user', content: user }],
    { temperature: 0.1, isJsonMode: true }
  );

  try {
    const parsed = JSON.parse(raw);
    // Save to KB — keyed by word, any future lookup for the same word gets this card
    kbSave({
      type: 'grammar_card',
      key: kbKey,
      input: { word, sentence },
      output: parsed,
      sourceApp: 'grammar_card'
    });
    return parsed;
  } catch {
    throw new Error('Nepodarilo sa vygenerovať gramatickú kartu');
  }
}
