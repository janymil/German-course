/**
 * useOpenAI — Hook for calling OpenAI's gpt-4o-mini model.
 * Used for the Smart AI Tutor mini-app.
 */

function getKey() {
  return import.meta.env.VITE_OPENAI_API_KEY || localStorage.getItem('openai_api_key') || '';
}

// ── Knowledge Base helpers ───────────────────────────────────────────────────
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

function kbSave({ type, key, input, output, model, sourceApp }) {
  fetch('/api/kb', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, key, input, output, model: model || 'gpt-4o-mini', sourceApp: sourceApp || '' })
  }).catch(() => { });
}

export async function callOpenAI(messages, { temperature = 0.4, isJsonMode = true, maxTokens = 1500 } = {}) {
  const key = getKey();
  if (!key) throw new Error('NO_KEY');

  const payload = {
    model: 'gpt-4o-mini',
    messages,
    temperature,
    max_tokens: maxTokens,
  };

  if (isJsonMode) {
    payload.response_format = { type: "json_object" };
  }

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const code = res.status;
    const msg = err?.error?.message || '';
    if (code === 401) throw new Error('INVALID_KEY');
    throw new Error(`API_ERROR:${code}: ${msg}`);
  }

  const data = await res.json();

  // Track usage for API Stats
  const usage = data?.usage;
  if (usage) {
    try {
      fetch('/api/stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'gpt-4o-mini', type: 'inputTokens', amount: usage.prompt_tokens || 0 })
      }).catch(() => { });
      fetch('/api/stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'gpt-4o-mini', type: 'outputTokens', amount: usage.completion_tokens || 0 })
      }).catch(() => { });
      fetch('/api/stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'gpt-4o-mini', type: 'calls', amount: 1 })
      }).catch(() => { });
    } catch (e) { }
  }

  const text = data?.choices?.[0]?.message?.content || '';
  return text.trim();
}

/**
 * Generate Smart Tutor exercises for a user query.
 * Expects a structured JSON response.
 */
export async function generateSmartTutorExercises({ query, completedLessonsCount = 0 }) {
  // ── Knowledge Base lookup (keyed by normalized query text) ─────────────────
  const kbKey  = query.trim().toLowerCase();
  const cached = await kbLookup('smart_tutor', kbKey);
  if (cached) return cached;

  const levelHint = completedLessonsCount <= 5
    ? 'The user is a very beginner (A1.1). Keep vocabulary extremely simple.'
    : 'The user is an A1 level learner. Use basic A1 vocabulary.';

  const systemPrompt = `You are an expert German language tutor for a Slovak speaker.
${levelHint}
The user will provide a word, a verb, a preposition, or a grammatical question. 
Your task is to analyze it and produce a JSON object containing a highly detailed explanation and interactive exercises.
NEVER use vocabulary or grammar above A1 level.

Respond EXACTLY in this JSON format:
{
  "explanation_slovak": [
    "Prvý odsek dôkladného vysvetlenia (napr. definícia).",
    "Druhý odsek: Ak ide o odlučiteľné sloveso, MUSTS tu explicitne vysvetliť, že predpona ide na koniec vety!"
  ],
  "grammar_matrix": [
    { "label": "ich", "val": "fülle aus" },
    { "label": "du", "val": "füllst aus" }
  ],
  "exercise_blocks": [
    {
      "type": "fill_in_the_blank",
      "title": "Doplňovačka",
      "exercises": [
        {
          "german_sentence": "Ich [fülle] das Formular [aus].",
          "slovak_translation": "Vypĺňam formulár."
        }
      ]
    },
    {
      "type": "multiple_choice",
      "title": "Vyber správnu možnosť",
      "exercises": [
        {
          "question": "Ich ___ das Formular ___.",
          "options": ["fülle ... aus", "ausfülle ...", "fülle ... an"],
          "correct_option": "fülle ... aus",
          "slovak_translation": "Vypĺňam formulár."
        }
      ]
    },
    {
      "type": "translation",
      "title": "Preklad",
      "exercises": [
        {
          "slovak_sentence": "My vypĺňame tie papiere.",
          "german_sentence": "Wir füllen die Papiere aus."
        }
      ]
    },
    {
      "type": "scramble",
      "title": "Zoraď slová do vety",
      "exercises": [
        {
          "slovak_translation": "Ty vypĺňaš formulár.",
          "scrambled_words": ["das Formular", "füllst", "aus", "Du"],
          "correct_sentence": "Du füllst das Formular aus."
        }
      ]
    }
  ]
}

CRITICAL RULES FOR GRAMMAR MATRIX BASED ON WORD TYPE:
1. **Verbs (Slovesá):** "grammar_matrix" MUST be an array of exactly 6 objects containing the full Present Tense conjugation. Example format: [{"label": "ich", "val": "gehe"}, {"label": "du", "val": "gehst"}, ...]. Explicitly mention if the verb is regular, irregular, or separable in the explanation.
2. **Nouns (Podstatné mená):** "grammar_matrix" MUST be an array of exactly 3 objects: Der/Die/Das (určitý člen), Singular (jednotné číslo), Plural (množné číslo).
3. **Adjectives/Adverbs (Prídavné mená / Príslovky):** "grammar_matrix" MUST be an array of 3 objects containing stupňovanie: Grundform (základný tvar), Komparativ (2. stupeň), Superlativ (3. stupeň).
4. **Prepositions (Predložky):** "grammar_matrix" MUST be an array of objects showing which Pád (Akuzatív, Datív, alebo oba) sa s predložkou viaže. Provide a short formula.
5. **Cases (Pády - Nominativ, Genitiv, Dativ, Akkusativ):** If the user queries a specific grammatical case, "grammar_matrix" MUST be an array showing the declension of definite articles for that case (e.g., [{"label": "Maskulinum", "val": "den"}, {"label": "Femininum", "val": "die"}, {"label": "Neutrum", "val": "das"}, {"label": "Plural", "val": "die"}]).
6. **General Phrases/Complex Syntax (Vety/Iné):** "grammar_matrix" MUST extract the core grammatical rule or formula used in the sentence and represent it cleanly (e.g. [{"label": "Slovosled", "val": "Podmet + Prísudok + Predmet"}]).

GENERAL RULES:
- "explanation_slovak" MUST be an array of strings (minimum 2 strings) explaining the grammar conceptually in Slovak. 
- The "exercise_blocks" array MUST contain exactly these 4 types.
- Ensure EXACTLY 5 exercises per block (20 total).
- For 'fill_in_the_blank', wrap the exact words the user has to guess inside square brackets [...]. Examples: "Wir [machen] mit.", "Das [ist] [ein] Hund."
- DO NOT use markdown, return only the raw JSON.`;

  const userPrompt = `Dopyt študenta: "${query}"`;

  const raw = await callOpenAI(
    [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    { temperature: 0.3, isJsonMode: true, maxTokens: 3500 }
  );

  try {
    const parsed = JSON.parse(raw);
    // Save to Knowledge Base
    kbSave({
      type:      'smart_tutor',
      key:       kbKey,
      input:     { query, completedLessonsCount },
      output:    parsed,
      model:     'gpt-4o-mini',
      sourceApp: 'smart_tutor'
    });
    return parsed;
  } catch (e) {
    throw new Error('Nepodarilo sa vygenerovať cvičenia vo formáte JSON.');
  }
}
