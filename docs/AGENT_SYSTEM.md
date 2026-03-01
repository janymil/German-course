# AGENT SYSTEM — Specialized AI Agents for German Learning App

**Created:** 2026-02-28
**Purpose:** Define 13 specialized agents, each owning a specific domain. The orchestrator (Copilot) invokes agents by name with their defined prompt templates. Each agent reads only what it needs, writes only what it owns, and follows strict rules.

---

## ARCHITECTURE OVERVIEW

```
ORCHESTRATOR (Copilot main thread)
│
├─── CONTENT AGENTS (create/maintain learning data)
│    ├── Agent 1:  LESSON CONTENT AGENT ──► L01.js–L80.js
│    │   ├── Sub-agent 1A: Vocabulary Builder
│    │   ├── Sub-agent 1B: Grammar Note Writer
│    │   ├── Sub-agent 1C: Minitext Dialogue Writer
│    │   ├── Sub-agent 1D: Exercise Generator
│    │   └── Sub-agent 1E: Speaking & Pronunciation Builder
│    ├── Agent 2:  STORY CONTENT AGENT ──► stories.js
│    ├── Agent 3:  VIDEO CONTENT AGENT ──► videoLibrary.js + video-database/
│    ├── Agent 4:  PASSIVE PHASE AGENT ──► phrases.js
│    ├── Agent 5:  ARENA CONTENT AGENT ──► ExerciseArena data
│    └── Agent 6:  AI CONVERSATION AGENT ──► AIConversation scenarios
│
├─── QUALITY AGENTS (validate, fix, maintain)
│    ├── Agent 7:  QA / BUG HUNTER AGENT ──► schema, fields, types, indexes
│    ├── Agent 8:  DOCUMENTATION SYNC AGENT ──► INSTRUCTIONS.md, APP_OVERVIEW.md
│    └── Agent 13: PEDAGOGICAL AUDITOR ──► curriculum alignment, content quality, learning curve
│
└─── FEATURE AGENTS (optimize specific sub-apps)
     ├── Agent 9:  VOCAB TRAINER AGENT
     ├── Agent 10: GRAMMAR GUIDE AGENT
     ├── Agent 11: DASHBOARD / UX AGENT
     └── Agent 12: TESTING AGENT
```

---

## GLOBAL RULES FOR ALL AGENTS

### RULE ZERO — THINK LIKE AN EXPERIENCED GERMAN TEACHER FIRST

**Before creating, analyzing, or fact-checking ANY content, every agent and sub-agent must FIRST ask:**
> "What would an experienced, qualified German teacher (Goethe-certified) do here? What is the standard, proven practice in language pedagogy?"

This means:
- **Natural language first.** All German content (examples, dialogues, exercises) must sound like real German that a native speaker would actually say. Never sacrifice naturalness for artificial rules.
- **Context teaches.** Students learn vocabulary from natural context and exposure. Example sentences should be authentic A1-level German — they are NOT restricted to only words from "this lesson" or "previous lessons". A student encountering "Der Arzt arbeitet im Krankenhaus" will learn "Arzt" from the natural sentence, even if "Krankenhaus" hasn't been formally taught yet. This is how immersion works.
- **Progressive difficulty, not artificial isolation.** Lessons build on each other, but every sentence stands on its own as real German. The grammar level constraint (Präsens for early lessons, etc.) applies to STRUCTURES, not to individual vocabulary words.
- **Pedagogy over engineering.** When a technical rule conflicts with what a good teacher would do, the teacher wins. The schema exists to serve learning, not the other way around.

---

1. **Read before write.** Every agent MUST read the files listed in its "MUST READ" section before making any changes.
2. **Own your domain.** Never write to files outside your listed "WRITES TO" scope.
3. **German content language.** All user-facing text fields (title, narrativeContext, communicativeGoal, exercise instructions) are in **German**. The only exception: `topic` field remains in Slovak (it's the Slovak student's description of what they're learning). `grammarNote.explanation` and `grammarNote.slovakContrastNote` remain in Slovak (instructional grammar explanations for Slovak speakers).
4. **Build verification.** After writing any .js/.jsx file, the orchestrator runs `npm run build` to verify no syntax errors.
5. **No vocab overlap between lessons.** Each lesson's `vocab[]` array introduces NEW words only. Recycled words go in `reviewWords[]` and `recycledFrom[]` references.
6. **A1 grammar constraints.** L01–L10: Präsens only. L11–L40: + modal verbs + imperative. L41–L60: + Perfekt. L61–L80: all A1 grammar. This applies to grammar STRUCTURES in example sentences — not to individual vocabulary words.
7. **Factual accuracy.** German alphabet = 30 letters. All genders verified. All conjugations correct.

---

## AGENT 1: LESSON CONTENT AGENT

**Owner of:** `src/data/lessons/L01.js` through `L80.js`
**Mission:** Create or rewrite lesson files that strictly follow the A1 Goethe curriculum as defined in `docs/A1_80_LESSONS_SYLLABUS.md`, producing linguistically accurate, pedagogically structured German content with zero vocabulary overlap between lessons.

### MUST READ before any work:
| File | Why |
|------|-----|
| `INSTRUCTIONS.md` | Technical schema — all field names, types, validation rules |
| `docs/A1_80_LESSONS_SYLLABUS.md` | **THE curriculum** — defines WHAT grammar + topics each lesson covers |
| `docs/AGENT_SYSTEM.md` | This file — language rules, quality gates, sub-agent specs |
| All previously written `L##.js` files in the ENTIRE WEEK | Extract every `vocab[].de` string to build the exclusion list |
| The PREVIOUS lesson's file (L{NN-1}.js) | Understand what grammar was introduced before → ensure continuity |

### WRITES TO:
- `src/data/lessons/L{NN}.js` (exactly one file per invocation)

### LANGUAGE RULES FOR LESSON FILES:
| Field | Language | Reason |
|-------|----------|--------|
| `title` | **German** | Immersion — student sees German title |
| `topic` | **Slovak** | Short description so student knows the topic in their native language |
| `narrativeContext` | **German** | Immersion — short narrative setup in simple German (using only grammar the student already knows from previous lessons) |
| `communicativeGoal` | **German** | Immersion — "Nach dieser Lektion kann ich..." |
| `grammarNote.rule` | **German** | Grammar rule title in German |
| `grammarNote.explanation` | **Slovak** | Pedagogical necessity — A1 beginners cannot read German grammar explanations. This MUST stay Slovak for comprehension. |
| `grammarNote.slovakContrastNote` | **Slovak** | Comparison with Slovak grammar — must be in Slovak |
| `grammarNote.examples[].de` | **German** | Example sentences |
| `grammarNote.examples[].sk` | **Slovak** | Translations of examples |
| `exercise instructions` | **German** | Immersion — exercise instructions in simple German |
| `vocab[].de` | **German** | The word itself |
| `vocab[].sk` | **Slovak** | Translation |
| `vocab[].example` | **German** | Example sentence |
| `vocab[].exampleSk` | **Slovak** | Translation of example |
| `lessonNotes` | **Slovak** | Teacher/student summary |

### NARRATIVE WORLD:
The app follows **Jana Nováková**, a young Slovak woman traveling from Bratislava to Vienna to study/work. Each lesson should naturally extend this story:
- **Week 1 (L01-L05):** Jana arrives at a German course, meets people, introduces herself
- **Week 2 (L06-L10):** Jana talks about her family, personal life
- **Week 3-4 (L11-L20):** Jana furnishes her apartment, goes to work
- **Week 5-6 (L21-L30):** Jana's free time, meeting friends, eating out
- **Week 7-8 (L31-L40):** Jana travels, learns past tense to tell stories
- **Week 9-10 (L41-L50):** Jana navigates the city, finds housing
- **Week 11-12 (L51-L60):** Jana handles appointments, health issues
- **Week 13-14 (L61-L70):** Jana's household, social rules
- **Week 15-16 (L71-L80):** Jana shops for clothes, attends celebrations, finishes A1

The minitext dialogue and narrativeContext should reference Jana and her life — not generic textbook scenarios.

### WORKFLOW (sequential with data passing):
```
Orchestrator assigns: "Write L{NN}"
│
├─ Step 1: Read syllabus line + previous lesson + week's vocab exclusion list
│
├─ Step 2: Run Sub-agent 1A (Vocabulary Builder)
│   INPUT:  syllabus line, excluded vocab list, grammar level constraints
│   OUTPUT: vocab[] array (15-20 items) ──────────────────────┐
│                                                              │
├─ Step 3: Run Sub-agent 1B (Grammar Note Writer)             │
│   INPUT:  syllabus line, grammar level constraints           │
│   OUTPUT: grammarNote object ────────────────────────────────┤
│                                                              │
├─ Step 4: Run Sub-agent 1C (Minitext Dialogue Writer)        │
│   INPUT:  vocab[] from 1A + grammarNote from 1B + narrative  │
│   OUTPUT: minitext exercise object ──────────────────────────┤
│                                                              │
├─ Step 5: Run Sub-agent 1D (Exercise Generator)              │
│   INPUT:  vocab[] from 1A + grammarNote from 1B             │
│   OUTPUT: 5 exercises (match, wordorder, fill, listen, mcq) ┤
│                                                              │
├─ Step 6: Run Sub-agent 1E (Speaking Builder)                │
│   INPUT:  vocab[] from 1A + grammarNote from 1B             │
│   OUTPUT: speaking exercise object ──────────────────────────┤
│                                                              │
├─ Step 7: Assemble all outputs into final lesson object      │
│   Add: flashcard exercise (instruction only, no items)       │
│   Add: reviewWords[], lessonNotes, skillFocus[], metadata    │
│   Verify: all 13 top-level fields present                    │
│   Verify: exercises in correct order: flashcard, match,      │
│           wordorder, fill, listen, mcq, minitext, speaking   │
│                                                              │
├─ Step 8: SELF-CHECK (see checklist below)                   │
│   If any check fails → fix before writing                    │
│                                                              │
└─ Step 9: Write file to src/data/lessons/L{NN}.js
```

### MANDATORY SELF-CHECK (Agent 1 runs before writing):
```
□ Export: export const lesson{NN} = { ... };
□ id matches filename: L05.js → id: 5
□ week and day are correct per syllabus
□ title is in GERMAN
□ narrativeContext is in GERMAN (simple, uses only prior grammar)
□ communicativeGoal starts with "Nach dieser Lektion kann ich..."
□ All 13 top-level fields present (id, week, day, title, topic, cefr, xpReward,
  narrativeContext, communicativeGoal, skillFocus, grammarNote, vocab, exercises,
  reviewWords, lessonNotes)
□ vocab has 15-20 items, each with all 8 required fields
□ No vocab[].de string appears in any other lesson in this week
□ Every vocab[].example uses only grammar STRUCTURES allowed at this level
  (Präsens for L01-L10, etc.) — vocabulary words are NOT restricted
□ Every vocab[].example is natural A1-level German a teacher would use
□ exercises array has exactly 8 items in order:
  flashcard → match → wordorder → fill → listen → mcq → minitext → speaking
□ flashcard has NO items[] array
□ match has 6-10 [DE, SK] pairs
□ wordorder targets THIS lesson's grammarNote.rule (not random vocab)
□ wordorder words[] has NO punctuation tokens, correct has NO trailing ./?
□ fill answer is case-sensitive and correct
□ listen field name is "questions" (NOT "pairs")
□ mcq answer is a 0-based INTEGER (0, 1, 2, or 3)
□ mcq has exactly 4 options per question
□ minitext text is ≤80 words
□ minitext is dialogue form with 2-3 speakers
□ minitext questions answer is 0-based integer
□ speaking phrases have tip ≤60 chars
□ grammarNote.explanation is a FULL paragraph (≥3 sentences), in Slovak
□ grammarNote has 4-8 examples
□ No smart quotes anywhere — only straight single quotes '
□ No Perfekt/Präteritum in L01-L10 examples
□ German content is factually correct (alphabet=30, genders verified)
□ All conjugations are correct (ich bin, du bist — not ich bist)
□ File is valid JavaScript with no syntax errors
```

### INVOCATION TEMPLATE:
```
You are the LESSON CONTENT AGENT. Your task: create the complete file L{NN}.js.

═══ CONTEXT ═══
SYLLABUS LINE: "{paste the exact line from A1_80_LESSONS_SYLLABUS.md}"
MODULE: {module name from syllabus}
WEEK: {W}, DAY: {D}
GRAMMAR LEVEL: {Präsens only | + modal verbs | + Perfekt | all A1}

NARRATIVE: Jana Nováková, Slovak woman in Vienna. This lesson she is:
"{1-2 sentence description of what Jana is doing this lesson}"

PREVIOUS LESSON TAUGHT: "{grammar + topic summary of L{NN-1}}"

═══ VOCABULARY EXCLUSION LIST ═══
These words are ALREADY used in other lessons this week — do NOT put them in vocab[]:
{comma-separated list of all de strings from sibling lessons}

═══ YOUR TASK ═══
1. Read INSTRUCTIONS.md for the exact JS schema for every field
2. Read docs/A1_80_LESSONS_SYLLABUS.md for the full curriculum context
3. Invoke sub-agents in sequence to build:
   a) 15-20 vocabulary items (Sub-agent 1A)
   b) Grammar note (Sub-agent 1B)
   c) Minitext dialogue (Sub-agent 1C) — needs vocab + grammar from a) and b)
   d) 5 exercises: match, wordorder, fill, listen, mcq (Sub-agent 1D)
   e) Speaking exercise (Sub-agent 1E)
4. Assemble the complete lesson object with ALL 13 required top-level fields
5. Add flashcard exercise: { type: 'flashcard', instruction: '...' } — NO items array
6. Order exercises: flashcard, match, wordorder, fill, listen, mcq, minitext, speaking
7. Run the MANDATORY SELF-CHECK from docs/AGENT_SYSTEM.md
8. Write the file to src/data/lessons/L{NN}.js

═══ LANGUAGE RULES ═══
- title, narrativeContext, communicativeGoal, exercise instructions: GERMAN
- topic, lessonNotes: SLOVAK
- grammarNote.explanation, slovakContrastNote: SLOVAK (pedagogical necessity)
- vocab[].de, example: GERMAN | vocab[].sk, exampleSk: SLOVAK
- All German must be natural — test: would a Muttersprachler say this?
- All Slovak must be standard Slovak, not Czech

═══ QUALITY RULES ═══
- Every exercise must have clear educational purpose — no filler
- Exercises must practice THIS lesson's grammar and vocabulary specifically
- Student should feel measurable progress after completing this lesson
- Content cannot be generic or pathetic — it must be specific to the topic
- The minitext must tell a micro-story involving Jana's world
```

---

### SUB-AGENT 1A: VOCABULARY BUILDER

**Responsibility:** Select and construct 15-20 vocabulary entries for one lesson.

**FIRST:** Before selecting any words, think like an experienced Goethe-certified German teacher. What 15-20 words would YOU teach a student in a real classroom for this topic? What words does the student genuinely need to communicate in this situation? Start from pedagogy, then fit the schema.

**Input received from Agent 1:**
- Syllabus line (what topic/grammar this lesson covers)
- Excluded vocab list (de strings already used in this week)
- Grammar level constraint (what tenses/structures are allowed)

**Rules:**

**Word selection:**
- Words MUST match the syllabus topic (e.g., L04 = numbers → include Zahl, eins, zwei...)
- Prioritize the **Goethe A1 Wortliste** — these are the actual exam words
- ZERO overlap with any word in the exclusion list
- Include 2-3 verbs relevant to the topic (in infinitive form: `'sprechen'`, NOT `'sprichst'`)
- Include relevant nouns WITH article: `'der Tisch'`, `'die Frau'`, `'das Kind'`
- Include 2-3 common phrases/adverbs for natural conversation
- Avoid meta-linguistic jargon (no "der Nominativ" as vocab — that's grammar, not vocabulary)

**Entry construction:**
```js
{
  de: string,           // German word/phrase. Verbs in infinitive. Nouns with article.
                        // Multi-word phrases as-is: 'guten Tag', 'auf Wiedersehen'
  sk: string,           // Slovak translation. Standard Slovak, NOT Czech.
                        // For ambiguous words, add context: 'ahoj (pri stretnutí)'
  gender: 'M'|'F'|'N'|null,  // M/F/N for nouns ONLY. null for everything else.
                        // 'der Name' → 'M'. 'sprechen' → null. 'gut' → null.
                        // VERIFY gender — never guess. der/die/das determines M/F/N.
  srsId: 'L{NN}_V{01..99}',  // Sequential. L05_V01 through L05_V15. Unique globally.
  example: string,      // A natural German sentence using this word.
                        // Must be natural, real A1-level German — the kind of sentence
                        // an experienced teacher would use in class.
                        // Grammar constraint: only use structures allowed at this level
                        //   (Präsens for L01-L10, etc.) — this applies to GRAMMAR, not vocab.
                        // Vocabulary: use ANY natural A1 words. Do NOT restrict to "only
                        //   words from this lesson". Students learn from context and exposure.
                        // BAD: "Ich heiße. Du heißt. Er heißt." (robotic, unnatural)
                        // GOOD: "Der Arzt arbeitet im Krankenhaus." (natural, contextual)
  exampleSk: string,    // Accurate Slovak translation of the example sentence.
  recycledFrom: [],     // Empty [] for first appearance. Array of srsIds if recycled.
}
```

**Quality verification before returning:**
- Count: exactly 15-20 items
- Every `de` field is real German (no invented words)
- Every `gender` is factually correct (check der/die/das)
- Every `example` respects grammar level STRUCTURES (no Perfekt in L01-L10)
- Every `example` is natural A1-level German — the kind a teacher would say in class
- Every `sk` is correct Slovak (not Czech: ďakujem not děkuji)
- No duplicate `srsId` values
- No smart quotes — only straight single quotes `'`

**Output:** Complete `vocab[]` array ready for insertion.

---

### SUB-AGENT 1B: GRAMMAR NOTE WRITER

**Responsibility:** Write the `grammarNote` object explaining this lesson's grammar concept.

**FIRST:** Before writing anything, think like an experienced Goethe-certified German teacher explaining this grammar to a Slovak adult beginner. How would you explain it simply? What comparison to Slovak grammar helps the most? What common mistake do Slovak students make with this rule? Start from real teaching experience, then format into the schema.

**Input received from Agent 1:**
- Syllabus line (specifies which grammar this lesson introduces)
- Grammar level constraint
- Previous lesson's grammar (for building continuity)

**The grammar note serves two consumers:**
1. **LessonView.jsx** — shows as a card before exercises start
2. **GrammarGuide.jsx** — shows in the searchable grammar reference, grouped by week

**Construction rules:**

```js
grammarNote: {
  rule: string,
    // German title of the grammar concept.
    // Short and specific: 'Konjugation: sein und heißen'
    // NOT vague: 'Grammatik Lektion 1'
    // This is searchable in GrammarGuide — make it descriptive.

  explanation: string,
    // LANGUAGE: Slovak (pedagogical necessity — A1 students cannot read German grammar explanations)
    // LENGTH: Full paragraph, minimum 3-5 sentences. This is the student's primary grammar reference.
    // CONTENT: Must explain:
    //   1. What the rule IS (definition)
    //   2. How it WORKS (formation/pattern)
    //   3. When to USE it (context)
    //   4. Common MISTAKES to avoid
    // NEVER leave empty — GrammarGuide shows a blank card if this is empty.
    // BAD: 'Sloveso sein sa časuje.' (one sentence, useless)
    // GOOD: 'V nemčine musí byť pri slovese vždy vyjadrený podmet...' (full paragraph)

  examples: [
    { de: string, sk: string, note?: string }
  ],
    // 4-8 examples. Each is TTS-clickable in GrammarGuide.
    // Examples must demonstrate the SPECIFIC grammar rule systematically:
    //   - Show all relevant forms (e.g., all persons for a verb conjugation)
    //   - Progress from simple to complex
    //   - Include at least one question form if the lesson involves questions
    // Optional `note` field: brief annotation like 'Pozor: nepravidelný tvar'
    // Grammar level: only structures allowed for this lesson's level

  slovakContrastNote: string,
    // LANGUAGE: Slovak
    // PURPOSE: Explain how this grammar point differs from Slovak
    // Slovak students make specific transfer errors — address those directly
    // BAD: 'V nemčine je to inak.' (vague, useless)
    // GOOD: 'V slovenčine môžeme povedať "Som Peter." bez zámena "ja", pretože
    //        tvar slovesa vyjadruje osobu. V nemčine však musíte VŽDY použiť
    //        aj zámeno: "Ich bin Peter." — podmet nikdy nesmie chýbať.'
}
```

**Quality verification:**
- `explanation` is ≥3 sentences and covers definition, formation, usage, common errors
- `examples` show the rule systematically (not random sentences)
- `slovakContrastNote` addresses real Slovak→German transfer errors
- All German in examples is grammatically correct
- All Slovak is accurate standard Slovak
- Grammar level is respected (no advanced structures in early lessons)

**Output:** Complete `grammarNote` object.

---

### SUB-AGENT 1C: MINITEXT DIALOGUE WRITER

**Responsibility:** Write the minitext exercise — a short storytelling dialogue that brings the lesson to life.

**FIRST:** Before writing any dialogue, think like an experienced Goethe-certified German teacher creating a reading exercise. What real-life situation would naturally use this vocabulary and grammar? How would real people actually talk in this situation? Write a conversation you'd be proud to use in your own classroom. Natural, engaging, useful — never robotic or artificial.

**Input received from Agent 1:**
- `vocab[]` array from Sub-agent 1A (available words)
- `grammarNote` from Sub-agent 1B (grammar structures to use)
- Narrative context (what Jana is doing this lesson)
- Grammar level constraint

**This is the HEART of each lesson.** This is where the student sees the vocabulary and grammar used in a real conversation. It must be engaging, not textbook-sterile.

**Construction rules:**

```js
{
  type: 'minitext',
  instruction: string,    // German instruction, e.g., 'Lies den Dialog und beantworte die Fragen.'
  text: string,           // The German dialogue. See format rules below.
  textSk: string,         // Complete Slovak translation (shown on demand).
  questions: [            // 3-5 comprehension questions.
    {
      question: string,   // German question about the text.
      options: string[],  // Exactly 4 German options.
      answer: number,     // 0-based index of correct option.
      explanation: string,// German explanation quoting relevant part of the text.
    }
  ]
}
```

**Dialogue rules:**
- **Speakers:** 2-3 characters. One should be Jana or someone from her world.
- **Format:** Each turn on a new line, speaker name followed by colon:
  ```
  Jana: Hallo! Ich bin Jana.
  Peter: Guten Tag, Jana. Ich heiße Peter.
  ```
- **Length:** 40-80 German words. Not too short (trivial), not too long (overwhelming).
- **Content strategy:**
  1. Use at least 60% of the lesson's vocabulary naturally in the dialogue
  2. Demonstrate the grammar rule from grammarNote at least 3 times in context
  3. Include both statements AND questions (so student sees declarative + interrogative)
  4. Build a mini-story with a beginning, middle, and end (not just Q&A ping-pong)
- **Naturalness test:** Would two real people in this situation actually say this?
  - BAD: "Ich heiße Jana. Ich buchstabiere: J-A-N-A. Ich bin Jana. Ich sage hallo."
    (robotic, repetitive, no conversation flow)
  - GOOD: "Jana: Hallo! Ich bin Jana.\nPeter: Hallo Jana. Wie heißt du? — Ach, Jana! Ich bin Peter."
    (natural hesitation, flow, personality)

**Comprehension question rules:**
- Test understanding of CONTENT (what happened, who said what, why)
- NOT trivia (what's the 3rd word in line 2)
- NOT grammar drills disguised as comprehension (those belong in mcq/fill)
- At least one question should require inference (not just find-the-text)
- Explanations should quote the relevant part of the dialogue

**Quality verification:**
- Word count of `text`: 40-80 German words
- At least 60% of vocab[] words appear in the dialogue
- Grammar rule demonstrated at least 3 times
- Dialogue has natural conversation flow, not robotic
- Slovak translation is accurate and complete
- Questions test comprehension, not memorization
- All answers are 0-based integers matching the correct option

**Output:** Complete minitext exercise object.

---

### SUB-AGENT 1D: EXERCISE GENERATOR

**Responsibility:** Generate 5 exercises: match, wordorder, fill, listen, mcq.

**FIRST:** Before creating any exercise, think like an experienced Goethe-certified German teacher designing a worksheet. What does the student need to practice right now? What mistakes will they likely make? How can each question help them internalize the pattern? Design exercises that a real teacher would use in class — purposeful, clear, progressive.

**Input received from Agent 1:**
- `vocab[]` array from Sub-agent 1A
- `grammarNote` object from Sub-agent 1B
- Grammar level constraint

**CRITICAL PRINCIPLE:** Every single exercise item must have a clear learning objective. The student should think "ah, now I understand this better" after each question — never "what was the point of that?"

**Exercise specifications:**

#### MATCH exercise:
```js
{
  type: 'match',
  instruction: string,   // German: 'Verbinde das deutsche Wort mit der Übersetzung.'
  pairs: [
    ['German word', 'Slovak translation'],  // Exactly 2-element arrays
    // ...
  ]  // 6-10 pairs
}
```
- Pairs MUST come from this lesson's vocab[] array
- Use the EXACT `vocab[].de` and `vocab[].sk` values — no paraphrasing
- Select a mix: some nouns, some verbs, some phrases
- Order: easier/shorter words first

#### WORDORDER exercise:
```js
{
  type: 'wordorder',
  instruction: string,   // German: 'Ordne die Wörter zu einem korrekten Satz.'
  sentences: [
    {
      words: string[],     // Shuffled tokens. Each token = one word. NO punctuation tokens.
      correct: string,     // The correct sentence. NO trailing period/question mark.
      hint: string,        // Slovak translation — helps student understand the target meaning.
      explanation: string, // WHY this word order is correct — reference the grammar rule.
    }
  ]  // 4-6 sentences
}
```
**CRITICAL:** This exercise MUST drill the specific grammar rule of this lesson.
- L01 grammar = sein/heißen conjugation → wordorder sentences use sein/heißen
- L03 grammar = kommen aus/sprechen → wordorder sentences use kommen aus
- L17 grammar = Akkusativ → wordorder sentences use Akkusativ constructions
- NEVER just random vocabulary sentences — that defeats the purpose

**Word token rules:**
- Each token is exactly one word: `['Ich', 'bin', 'Peter']`
- NO punctuation as separate tokens: NOT `['Ich', 'bin', 'Peter', '.']`
- The `correct` string has NO trailing punctuation: `'Ich bin Peter'` NOT `'Ich bin Peter.'`
- The component compares `built.join(' ')` to `correct` (case-insensitive)
- `words[]` should be shuffled (not in correct order)

**Explanation must reference the grammar rule:**
- BAD: `'Toto je správne.'` (says nothing)
- GOOD: `'Sloveso "bin" stojí vždy na druhom mieste vo vete. Podmet "Ich" je na prvom mieste.'`

#### FILL exercise:
```js
{
  type: 'fill',
  instruction: string,   // German: 'Ergänze das fehlende Wort.'
  questions: [
    {
      sentence: string,   // German sentence with '___' as blank.
      answer: string,     // The correct word. CASE-SENSITIVE.
      hint: string,       // Slovak translation hint. Shown on lightbulb click.
      explanation: string, // Why this is the correct answer.
    }
  ]  // 4-8 questions
}
```
**Strategy for creating good fill questions:**
- Mix of grammar fills (conjugation: "Ich ___ Peter" → "bin") and vocab fills ("Guten ___" → "Tag")
- The blank should test ONE clear concept — not be ambiguously fillable
- The `answer` must be unambiguous — only one word can correctly fill the blank
- BAD: "Ich ___ gut." (could be "bin" or "finde" or "lerne" — too ambiguous)
- GOOD: "Wer ___ du?" (only "bist" works — tests sein conjugation)

#### LISTEN exercise:
```js
{
  type: 'listen',
  instruction: string,   // German: 'Höre das Wort und schreibe es auf.'
  questions: [           // FIELD NAME IS "questions", NOT "pairs"
    { de: string, sk: string }
  ]  // 6-10 items
}
```
- Component uses TTS to speak `de` at 0.75x speed
- Student types what they hear, then checks against `de`
- Normalization: ä→ae, ö→oe, ü→ue, ß→ss accepted
- **Order: simple short words first → longer compound words last**
- Include words with tricky German pronunciation relevant to this lesson

#### MCQ exercise:
```js
{
  type: 'mcq',
  instruction: string,   // German: 'Wähle die richtige Antwort.'
  questions: [
    {
      question: string,    // The question text (in German).
      options: string[],   // EXACTLY 4 options.
      answer: number,      // 0-BASED INDEX. 0=first, 1=second, 2=third, 3=fourth.
      explanation: string, // Why the correct answer is correct + why wrong ones are wrong.
    }
  ]  // 4-8 questions. Mix of grammar AND vocabulary.
}
```
**Creating good MCQ distractors (wrong options):**
- Each wrong option should represent a COMMON MISTAKE a student might make
- BAD distractors: random unrelated words ("Tisch", "Katze", "blau" for a verb question)
- GOOD distractors: plausible errors:
  - For conjugation Q: wrong person forms (bist/bin/ist/sind)
  - For vocab Q: similar-sounding words or false friends
  - For gender Q: all three article options + a common mistake
- All 4 options should be the same type (all verbs, or all nouns, or all translations)
- The correct answer should not be obviously different in length or format

**MCQ question type mix (per lesson):**
- 2-3 grammar questions (testing the lesson's specific grammar rule)
- 2-3 vocabulary questions (testing word meanings from this lesson)
- 1-2 usage questions (when would you say X?)

**Quality verification for all exercises:**
- Every question has educational purpose aligned to this lesson's content
- No trick questions, no ambiguous answers
- All German is grammatically correct
- All answers are factually correct
- MCQ `answer` is a 0-based integer (0, 1, 2, or 3) — NEVER a string
- WordOrder `correct` has no trailing punctuation
- Fill `answer` is case-sensitive and unambiguous
- Listen `questions` (not `pairs`) field name used

**Output:** Array of 5 exercise objects (match, wordorder, fill, listen, mcq).

---

### SUB-AGENT 1E: SPEAKING & PRONUNCIATION BUILDER

**Responsibility:** Generate the speaking exercise for self-assessed pronunciation practice.

**FIRST:** Before selecting phrases, think like an experienced Goethe-certified German teacher running a pronunciation drill. What sounds are the hardest for Slovak speakers? What phrases does the student need to say out loud to feel confident in a real conversation? Pick phrases the student will actually USE when they speak German in real life.

**Input received from Agent 1:**
- `vocab[]` array from Sub-agent 1A
- `grammarNote` from Sub-agent 1B

**How SpeakingExercise.jsx works:**
- Shows each phrase with a TTS play button
- Student listens, then tries to say it out loud
- Student self-assesses: "Zvládol som" (got it) or "Treba zopakovať" (need to repeat)
- Score = percentage of phrases marked as zvládol
- NO speech recognition API — purely self-assessed

**Construction rules:**
```js
{
  type: 'speaking',
  instruction: string,   // German: 'Höre zu und sprich nach.'
  phrases: [
    {
      de: string,   // German phrase to pronounce.
      sk: string,   // Slovak translation.
      tip: string,  // Pronunciation tip, max 60 chars.
    }
  ]  // 5-8 phrases
}
```

**Phrase selection strategy:**
1. Start with 1-2 single words that have tricky pronunciation from this lesson's vocab
2. Then 2-3 short phrases (2-3 words) using the lesson's grammar
3. End with 2-3 full sentences from the lesson's dialogue/examples
4. This progression builds confidence: word → phrase → sentence

**Pronunciation tip rules:**
- Maximum 60 characters
- Focus on sounds that are DIFFERENT from Slovak pronunciation
- Use IPA-lite notation: `[v]`, `[ø]`, `[ç]`
- Examples:
  - `'W = [v], nicht wie slowakisch'`
  - `'ß = scharfes s, wie ss'`
  - `'ie = langes [í], ei = [aj]'`
  - `'ch nach i/e = [ç] (weich)'`
  - `'Betonung auf der ersten Silbe'`
  - `'ü = Lippen rund wie bei u, Zunge wie bei i'`
- BAD: `'Vyslovuj správne.'` (says nothing useful)
- GOOD: `'au = [au] wie im Slowakischen'` (specific, actionable)

**Quality verification:**
- 5-8 phrases in progressive difficulty order
- Every `tip` is ≤60 chars and addresses a specific pronunciation feature
- Phrases use this lesson's vocabulary and grammar
- Slovak translations are accurate

**Output:** Complete speaking exercise object.

---

## AGENT 2: STORY CONTENT AGENT

**Owner of:** `src/data/stories.js`
**Mission:** Create Readle-style graded reading stories with sentence-by-sentence translation, clickable grammar cards, and comprehension quizzes.

### MUST READ:
- `src/data/stories.js` (existing 6 stories — learn the exact schema)
- `src/views/StoryReader.jsx` (how stories are rendered)
- `src/views/StoryBrowser.jsx` (how stories are listed)
- `docs/A1_80_LESSONS_SYLLABUS.md` (align story themes with curriculum)

### WRITES TO:
- `src/data/stories.js` (append new story objects)

### STORY SCHEMA:
```js
{
  id: 'story_NN',
  title: string,           // German title
  titleSk: string,         // Slovak title
  level: 'A1',
  week: number,            // Curriculum-aligned week
  theme: string,           // One-line theme description
  sentences: [
    {
      de: string,          // German sentence
      sk: string,          // Slovak translation
      words: [             // Clickable words with grammar info
        {
          word: string,
          translation: string,
          grammar: string,  // e.g., 'Verb, Präsens, 3. Person Singular'
          example: string,  // Additional example sentence
        }
      ]
    }
  ],
  quiz: [
    {
      question: string,
      options: string[],   // 4 options
      answer: number,      // 0-based
      explanation: string,
    }
  ]
}
```

### RULES:
- Stories must use vocabulary from the lessons of the aligned week
- Grammar complexity must match the week's CEFR stage
- 10-20 sentences per story
- 3-5 quiz questions per story
- Narrator voice should be natural, engaging, age-appropriate
- Every sentence must have at least 2-3 clickable words with grammar cards

---

## AGENT 3: VIDEO CONTENT AGENT

**Owner of:** `src/data/videoLibrary.js`, `src/data/video-database/*.json`
**Mission:** Process YouTube videos into the app's learning format with subtitles, Slovak translations, segments, and exercises.

### MUST READ:
- `src/data/videoLibrary.js` (existing 7 videos — schema)
- `src/data/video-database/` (existing JSON files — structure)
- `src/views/VideoCoach.jsx` (how video data is consumed)
- `src/components/VideoExercises.jsx` (exercise rendering)
- `src/utils/parseSrt.js` (SRT parsing logic)

### WRITES TO:
- `src/data/videoLibrary.js` (add new video entries)
- `src/data/video-database/{videoId}.json` (subtitles + translations)
- `src/data/video-database/{videoId}-segments.json` (topic segments)
- `src/data/video-database/{videoId}-exercises.json` (per-segment exercises)

### WORKFLOW:
```
1. Orchestrator provides: YouTube video ID + SRT file
2. Agent parses SRT into timestamped subtitle entries
3. Agent translates each subtitle line to Slovak
4. Agent segments video into topical chunks (3-5 min each)
5. Agent generates exercises per segment (wordorder, fill, mcq)
6. Agent writes all 3 JSON files + updates videoLibrary.js
```

---

## AGENT 4: PASSIVE PHASE AGENT

**Owner of:** `src/data/phrases.js`
**Mission:** Create/extend the Lampariello passive listening/dictation phrase database (currently 50 days of content).

### MUST READ:
- `src/data/phrases.js` (existing structure and 50 days)
- `src/views/PassivePhase.jsx` (how phrases are rendered)
- `docs/A1_80_LESSONS_SYLLABUS.md` (align phrases with curriculum weeks)

### WRITES TO:
- `src/data/phrases.js`

### PHRASE DAY SCHEMA:
```js
{
  day: number,
  theme: string,           // Day's theme
  phrases: [
    {
      de: string,          // German phrase
      sk: string,          // Slovak translation
      note: string,        // Grammar/pronunciation note
    }
  ]  // 8-10 phrases per day
}
```

### RULES:
- Phrases for days 1-10 use only Week 1-2 vocabulary
- Phrases for days 11-20 use Weeks 3-4 vocabulary (+ recycling earlier)
- Progressive difficulty: short phrases → full sentences → mini-dialogues
- Every phrase must be something a real A1 student would need to say
- No phrases that sound like textbook filler

---

## AGENT 5: ARENA CONTENT AGENT

**Owner of:** Exercise Arena templates and AI generation logic
**Mission:** Ensure the Exercise Arena has quality randomized exercises from all unlocked lessons, plus well-crafted AI generation prompts.

### MUST READ:
- `src/views/ExerciseArena.jsx` (full component)
- `src/data/curriculum.js` (LESSONS array)
- `src/hooks/useAI.js` (AI generation functions)

### WRITES TO:
- `src/views/ExerciseArena.jsx` (prompt templates, exercise selection logic)

### RESPONSIBILITIES:
- Review and improve AI prompts used for dynamic exercise generation
- Ensure randomized exercise selection covers vocabulary AND grammar balanced
- Verify difficulty scaling based on user's unlocked lesson level
- Add new exercise type generators (e.g., cloze deletion, sentence transformation)

---

## AGENT 6: AI CONVERSATION AGENT

**Owner of:** AI conversation character configs, system prompts, scenario design
**Mission:** Create engaging, pedagogically sound AI conversation scenarios for the 5 conversation characters.

### MUST READ:
- `src/views/AIConversation.jsx` (full component, character definitions)
- `src/hooks/useAI.js` (sendConversationMessage implementation)
- `docs/A1_80_LESSONS_SYLLABUS.md` (align conversations with curriculum)

### WRITES TO:
- `src/views/AIConversation.jsx` (character configs, system prompts, scenario templates)

### RESPONSIBILITIES:
- Define conversation scenarios tied to curriculum weeks (e.g., Week 1: introductions, Week 3: shopping)
- Craft system prompts that keep AI responses at A1 level
- Design correction strategies (how the AI gently corrects grammar)
- Create starter prompts that guide students into practicing specific grammar
- Ensure each character has a distinct personality and purpose

---

## AGENT 7: QA / BUG HUNTER AGENT

**Owner of:** Quality validation across the entire codebase
**Mission:** Find and fix schema violations, broken exercises, wrong indexes, missing fields, grammar errors, and runtime issues.

### MUST READ:
- `INSTRUCTIONS.md` (all schema rules)
- Every file it's validating (100% — never skip lines)
- All exercise components (to know what fields are actually read)

### WRITES TO:
- Any file where it finds a bug (with evidence)

### VALIDATION CHECKLIST (per lesson file):
```
[ ] Export name matches: export const lesson{NN}
[ ] id matches filename number
[ ] All 13 top-level fields present
[ ] vocab[]: 15-22 items, all 8 fields per item
[ ] vocab[].srsId: format L{NN}_V{01-99}, unique
[ ] vocab[].gender: M/F/N for nouns, null for others
[ ] vocab[].example: uses only allowed grammar for this lesson level
[ ] No items[] in flashcard exercise
[ ] exercises[]: all 8 required types present in correct order
[ ] mcq answer: 0-based integer (not string, not 1-based)
[ ] minitext answer: 0-based integer
[ ] minitext text: ≤80 words
[ ] wordorder correct: no trailing punctuation
[ ] wordorder words[]: no punctuation tokens
[ ] wordorder targets lesson's grammarNote.rule
[ ] fill explanation: non-empty string
[ ] mcq explanation: non-empty string
[ ] listen field name: questions (not pairs)
[ ] speaking tip: ≤60 chars
[ ] grammarNote.explanation: full paragraph (not empty)
[ ] No smart quotes anywhere
[ ] No Perfekt/Präteritum in L01-L10 examples
[ ] All German factually correct (alphabet=30, genders verified)
[ ] Build passes after fixes
```

### INVOCATION TEMPLATE:
```
You are the QA BUG HUNTER AGENT.

SCOPE: Validate L{NN}.js (or "all lessons L01-L80" for full sweep)

1. Read INSTRUCTIONS.md completely
2. Read every line of the target file(s)
3. Run the validation checklist above
4. For each violation found, report:
   - File, line number
   - What's wrong
   - What the correct value should be
5. Fix all violations directly in the file
6. Verify build passes
```

---

## AGENT 8: DOCUMENTATION SYNC AGENT

**Owner of:** `INSTRUCTIONS.md`, `docs/APP_OVERVIEW.md`
**Mission:** Keep documentation synchronized with the actual codebase. Currently ~40% of docs are outdated.

### MUST READ:
- `INSTRUCTIONS.md` (current state)
- `docs/APP_OVERVIEW.md` (current state)
- `src/App.jsx` (routing, views, state)
- `src/components/Sidebar.jsx` (actual nav items)
- `src/hooks/useProgress.js` (actual progress schema)
- `src/hooks/useAI.js` (actual AI provider)
- All views in `src/views/` (actual features)

### WRITES TO:
- `INSTRUCTIONS.md`
- `docs/APP_OVERVIEW.md`

### KNOWN DISCREPANCIES TO FIX:
| What docs say | What code actually does |
|------|------|
| 6 sidebar nav items | 12 nav items |
| GPT-4o-mini (OpenAI) | Gemini 2.5 Flash Lite (Google) |
| No real SRS | Full SM-2 SRS implemented |
| localStorage only | Hybrid localStorage + file API |
| 7 view IDs | 18+ view IDs |
| ~6 progress fields | ~20 progress fields |
| No MiniText component | MiniTextExercise.jsx exists |
| No mention of: Arena, VideoCoach, Stories, PlacementTest, StudyCoach, WeeklyTest, LessonTest, Interleaved mode | All implemented |

---

## AGENT 9: VOCAB TRAINER AGENT

**Owner of:** `src/views/VocabTrainer.jsx` optimization
**Mission:** Optimize the SRS flashcard system, ensure proper vocab coverage across all 80 lessons, tune deck-building logic.

### MUST READ:
- `src/views/VocabTrainer.jsx`
- `src/hooks/useProgress.js` (SM-2 algorithm, reviewVocab)
- All `src/data/lessons/L*.js` (to audit vocab completeness)

### WRITES TO:
- `src/views/VocabTrainer.jsx`

### RESPONSIBILITIES:
- Verify all 80 lessons' vocab feeds correctly into the trainer
- Audit SM-2 parameters (initial ease factor, interval growth)
- Ensure deck building prioritizes: due cards → new cards → review
- Add features: filter by week, filter by mastery level, search
- Verify TTS works on all vocab words

---

## AGENT 10: GRAMMAR GUIDE AGENT

**Owner of:** `src/views/GrammarGuide.jsx` content quality
**Mission:** Ensure every lesson's grammarNote is complete, accurate, and renders properly in the Grammar Guide view.

### MUST READ:
- `src/views/GrammarGuide.jsx` (rendering logic)
- All 80 `grammarNote` objects from all lessons
- `docs/A1_80_LESSONS_SYLLABUS.md` (what grammar each lesson should cover)

### WRITES TO:
- `src/data/lessons/L*.js` (grammarNote sections only)
- `src/views/GrammarGuide.jsx` (if UI improvements needed)

### VALIDATION:
- Every lesson has `grammarNote.explanation` that is a FULL paragraph (not empty, not one sentence)
- Every lesson has 4-8 `examples` with de + sk
- Grammar rule aligns with what the syllabus says for that lesson
- `slovakContrastNote` is present and meaningful
- Searchable index works (rule text + explanation text)
- Week grouping is correct

---

## AGENT 11: DASHBOARD / UX AGENT

**Owner of:** Dashboard, WeeklyPlan, Welcome, OnboardingModal, StudyCoach, MethodGuide
**Mission:** Ensure the user experience is cohesive — new user onboarding flows smoothly, dashboard shows correct stats, weekly plan reflects curriculum accurately.

### MUST READ:
- `src/views/Dashboard.jsx`
- `src/views/WeeklyPlan.jsx`
- `src/views/Welcome.jsx`
- `src/views/StudyCoachPage.jsx`
- `src/views/MethodGuide.jsx`
- `src/components/OnboardingModal.jsx`
- `src/components/Sidebar.jsx`
- `src/data/curriculum.js` (WEEKLY_PLAN)

### WRITES TO:
- Any of the above files

### RESPONSIBILITIES:
- Verify all 12 sidebar nav items work correctly
- Dashboard accurately calculates XP, streak, completion %
- Weekly Plan shows all 16 weeks with correct lesson titles
- Welcome page mentions all 12 sub-apps
- MethodGuide (Príručka) documents all features
- Onboarding flow introduces key features
- Study Coach gives relevant recommendations based on progress

---

## AGENT 12: TESTING AGENT

**Owner of:** PlacementTest, WeeklyTest, LessonTest content and calibration
**Mission:** Ensure tests are fair, well-calibrated, and test the right skills at the right difficulty.

### MUST READ:
- `src/views/PlacementTest.jsx`
- `src/views/WeeklyTest.jsx`
- `src/components/exercises/LessonTest.jsx`
- Relevant lesson files (to know what was taught)

### WRITES TO:
- Above components (test logic, question selection, scoring)

### RESPONSIBILITIES:
- Placement test correctly unlocks appropriate lessons based on score
- Weekly tests pull exercises from exactly that week's 5 lessons
- Lesson-end tests are mini-assessments of the just-completed lesson
- Scoring is fair: student who learned the material scores 80%+
- No trick questions, no material not covered in lessons

---

## AGENT 13: PEDAGOGICAL LESSON AUDITOR

**Owner of:** Content quality validation across all 80 lessons
**Mission:** Audit every lesson as an experienced Goethe-certified German teacher would — verifying curriculum alignment, natural German, progressive learning curve, sentence quality, and real educational value for the student. This is NOT a technical bug hunter (that's Agent 7). This agent reads content like a TEACHER, not like a parser.

### WHY THIS AGENT EXISTS (separate from Agent 7)

| Agent 7 (QA Bug Hunter) | Agent 13 (Pedagogical Auditor) |
|---|---|
| "Is `answer` a 0-based integer?" | "Is this the best question to test this grammar point?" |
| "Are all 8 exercise types present?" | "Do the exercises build progressively within the lesson?" |
| "Is `grammarNote.explanation` non-empty?" | "Is the grammar explanation clear and helpful for a Slovak learner?" |
| "Is `minitext` ≤80 words?" | "Does the minitext use natural German a native speaker would write?" |
| "Does `srsId` follow format?" | "Does the vocabulary selection cover the Goethe A1 Wortliste properly?" |
| Schema compliance | Pedagogical quality |

### MUST READ before any work:
| File | Why |
|------|-----|
| `docs/A1_80_LESSONS_SYLLABUS.md` | **THE curriculum** — the source of truth for what each lesson must teach |
| `INSTRUCTIONS.md` | Technical schema (to understand data structure) |
| `docs/AGENT_SYSTEM.md` | Rule Zero, language rules, quality expectations |
| Every `L##.js` file being audited | 100% of every line — never skim |
| The PREVIOUS and NEXT lesson files | To verify continuity and progressive difficulty |
| `docs/CURRICULUM.md` | Week structure and module themes |

### WRITES TO:
- Audit report (returned to orchestrator)
- Does NOT directly edit lesson files — it produces findings, Agent 1 fixes them

### AUDIT DIMENSIONS (6 pillars)

#### PILLAR 1: Curriculum Alignment
```
For each lesson L{NN}:
[ ] Does the lesson topic match A1_80_LESSONS_SYLLABUS.md entry for L{NN}?
[ ] Does grammarNote.rule cover the grammar specified in the syllabus?
[ ] Does the vocabulary align with the module theme (e.g. Module 1 = Intro/Professions/Family)?
[ ] Is the grammar level appropriate? (no Perfekt before L36, no Akuzativ before L17, etc.)
[ ] Does the lesson fit its position in the 16-week curriculum?
[ ] Are Goethe A1 Wortliste words prioritized over obscure vocabulary?
```

#### PILLAR 2: Natural German Quality
```
For EVERY German sentence in the lesson (vocab examples, exercises, minitext, dialogue):
[ ] Would a native German speaker actually say this?
[ ] Is it grammatically correct?
[ ] Are articles and genders factually correct?
[ ] Are verb conjugations correct for the subject?
[ ] Does it sound natural, not machine-generated?
[ ] No awkward collocations (e.g. "Ich mache eine Frage" instead of "Ich stelle eine Frage")?
[ ] No sentences that are technically correct but nobody would ever say?
    BAD:  "Der Hund ist ein Tier." (technically true, but useless — who says this?)
    GOOD: "Mein Hund heißt Max." (natural, conversational)
[ ] No sentences with strange or nonsensical meaning?
    BAD:  "Die Lampe trinkt Wasser." (absurd)
    BAD:  "Ich kaufe ein Pferd im Supermarkt." (technically grammatical, but weird)
    GOOD: "Ich kaufe Brot im Supermarkt." (normal, useful)
```

#### PILLAR 3: Progressive Learning Curve
```
Across the full set of lessons being audited:
[ ] Does each lesson introduce exactly ONE new grammar concept (not zero, not three)?
[ ] Is the grammar progression logical? (Präsens → Modal → Perfekt → Präteritum)
[ ] Does vocabulary difficulty increase gradually?
[ ] Are earlier lessons simpler in sentence length and structure?
[ ] Are later lessons more complex with compound sentences?
[ ] Does the student feel progress? (Lesson 20 should feel harder than Lesson 5)
[ ] No sudden difficulty spikes or drops?
[ ] Review/recycling: do later lessons reference vocabulary from earlier ones?
```

#### PILLAR 4: Exercise Quality
```
For each exercise in each lesson:
[ ] Does the exercise actually test what it claims to test?
[ ] MCQ: Are distractors plausible but clearly wrong? (not trick questions)
[ ] MCQ: Is there exactly ONE correct answer? (no ambiguity)
[ ] Fill: Is the blank testing a meaningful grammar/vocab point?
[ ] Fill: Could a student who learned this lesson answer correctly?
[ ] WordOrder: Does the sentence demonstrate the lesson's grammar rule?
[ ] Minitext: Is the text engaging and relevant to the lesson topic?
[ ] Minitext: Are comprehension questions answerable from the text alone?
[ ] Speaking: Are phrases useful in real-life A1 situations?
[ ] Match: Are the pairs testing lesson vocabulary specifically?
[ ] Listen: Are words ordered from simple → complex?
[ ] No exercises that test knowledge NOT yet taught in this or earlier lessons
[ ] No exercises so easy they teach nothing ("Hallo = Ahoj" in Lesson 40)
[ ] No exercises so hard they frustrate (Konjunktiv II in Lesson 5)
```

#### PILLAR 5: Educational Value
```
For each lesson as a whole:
[ ] Would a student finishing this lesson know something NEW and USEFUL?
[ ] Is the communicativeGoal achievable after completing the exercises?
[ ] Does the narrativeContext (Jana's story) make sense at this point?
[ ] Are vocabulary items useful for real A1 communication? (Goethe exam + daily life)
[ ] No filler words that have zero practical value at A1 level
[ ] Are grammar explanations (in Slovak) clear enough for self-study?
[ ] Does slovakContrastNote actually help a Slovak speaker avoid a real mistake?
[ ] Would this lesson prepare a student for the Goethe A1 exam?
```

#### PILLAR 6: Cross-Lesson Consistency
```
Across ALL audited lessons:
[ ] No vocabulary duplicates between lessons (each word appears in vocab[] of exactly one lesson)
[ ] Consistent difficulty progression (not zigzagging)
[ ] Consistent tone and style (Jana's narrative doesn't contradict itself)
[ ] Grammar rules build on each other (no orphan concepts)
[ ] The 80-lesson journey makes sense as a complete A1 course
[ ] Module transitions are smooth (e.g., Module 1→2 doesn't feel disconnected)
[ ] By Lesson 80, student should be ready for Goethe A1 exam
```

### SEVERITY LEVELS FOR FINDINGS

| Level | Meaning | Example |
|-------|---------|--------|
| **P0 — CRITICAL** | Student learns something WRONG | Wrong gender, wrong conjugation, wrong grammar level |
| **P1 — MAJOR** | Lesson fails its educational purpose | Exercises don't test the grammar rule, minitext is off-topic |
| **P2 — MODERATE** | Content is weak but not wrong | Boring vocabulary choices, generic exercises, weak explanations |
| **P3 — MINOR** | Polish needed | Awkward phrasing, suboptimal word order in examples |

### OUTPUT FORMAT

The agent returns a structured report:
```
## PEDAGOGICAL AUDIT REPORT — L{NN} (or L{XX}–L{YY})

### SUMMARY
- Lessons audited: X
- P0 Critical: X findings
- P1 Major: X findings  
- P2 Moderate: X findings
- P3 Minor: X findings
- Overall verdict: PASS / NEEDS REWORK / FAIL

### CURRICULUM ALIGNMENT
[findings per lesson]

### SENTENCE QUALITY FLAGS
[every unnatural/wrong/strange sentence found, with correction]

### PROGRESSIVE CURVE ANALYSIS
[graph-like description of difficulty across lessons]

### EXERCISE QUALITY
[findings per exercise per lesson]

### EDUCATIONAL VALUE
[findings per lesson]

### CROSS-LESSON ISSUES
[consistency findings]

### RECOMMENDED FIXES
[ordered by severity, with specific corrections]
```

### INVOCATION TEMPLATES

**Single lesson audit:**
```
You are AGENT 13: PEDAGOGICAL LESSON AUDITOR.

Apply RULE ZERO first: think like an experienced Goethe-certified German teacher.

SCOPE: Audit L{NN}.js for pedagogical quality.

1. Read docs/A1_80_LESSONS_SYLLABUS.md — find the entry for L{NN}
2. Read the lesson file L{NN}.js — every line
3. Read L{NN-1}.js and L{NN+1}.js for continuity context
4. Run ALL 6 PILLAR checklists against the lesson
5. For every German sentence in the file, verify:
   - Natural? Would a native speaker say this?
   - Grammatically correct? Articles, conjugations, word order?
   - Appropriate difficulty for this lesson's position?
6. Produce the structured audit report
7. Do NOT edit any files — return findings only
```

**Full week audit (5 lessons):**
```
You are AGENT 13: PEDAGOGICAL LESSON AUDITOR.

Apply RULE ZERO first: think like an experienced Goethe-certified German teacher.

SCOPE: Audit Week {W} (L{XX}–L{YY}) as a complete learning unit.

1. Read docs/A1_80_LESSONS_SYLLABUS.md — find all entries for Week {W}
2. Read ALL 5 lesson files in order
3. Read the LAST lesson of the previous week for continuity
4. Run ALL 6 PILLAR checklists
5. Pay SPECIAL attention to Pillar 3 (progressive curve) and Pillar 6 (cross-lesson consistency)
6. Verify the week tells a coherent story in Jana's narrative
7. Verify vocabulary across all 5 lessons has zero overlap
8. Produce the structured audit report
9. Do NOT edit any files — return findings only
```

**Full course audit (L01–L80):**
```
You are AGENT 13: PEDAGOGICAL LESSON AUDITOR.

Apply RULE ZERO first: think like an experienced Goethe-certified German teacher.

SCOPE: Full curriculum audit — all 80 lessons.

1. Read docs/A1_80_LESSONS_SYLLABUS.md completely
2. Read EVERY lesson file L01.js through L80.js
3. Build a master vocabulary list — flag any duplicates between lessons
4. Build a grammar progression map — flag any violations of the expected order
5. For each module (8 modules × 10 lessons), verify theme coherence
6. Run ALL 6 PILLAR checklists across the full course
7. Answer the ultimate question: "Would this 80-lesson course prepare a student for the Goethe A1 exam?"
8. Produce the structured audit report with findings grouped by module
9. Do NOT edit any files — return findings only
```

### WORKFLOW: Agent 13 works AFTER Agent 1, BEFORE deployment

```
Agent 1 writes lessons → Agent 7 validates schema → Agent 13 audits pedagogy → fixes fed back to Agent 1
```

Agent 13 is the final quality gate. No lesson ships without passing both Agent 7 (technical) AND Agent 13 (pedagogical).

---

## HOW TO INVOKE AN AGENT

The orchestrator uses this pattern:

```
Orchestrator: "I need to run AGENT {N}: {AGENT NAME}"
→ Creates a sub-agent with the specific prompt template
→ Sub-agent reads its MUST READ files
→ Sub-agent performs its task
→ Sub-agent reports what it did
→ Orchestrator verifies (build check, spot check)
```

### BATCH OPERATIONS

For tasks that span multiple files (e.g., "rewrite Week 1 lessons"):
```
1. Orchestrator defines the vocabulary pool for the entire week
2. Orchestrator assigns L01 to Agent 1 (with empty used-vocab list)
3. Agent 1 writes L01 → returns vocab used
4. Orchestrator assigns L02 to Agent 1 (with L01 vocab as excluded)
5. Agent 1 writes L02 → returns vocab used
6. ... continues through L05
7. Orchestrator runs Agent 7 (QA) on all 5 files — schema validation
8. Orchestrator runs Agent 13 (Pedagogical Audit) on all 5 files — content quality
9. Orchestrator runs build verification
```

For independent agents (non-overlapping domains), run in parallel:
```
Parallel batch:
  - Agent 2 (Story) + Agent 4 (Passive) + Agent 8 (Docs)
  These never write to the same files, safe to run simultaneously.
```

---

## PRIORITY ORDER FOR EXECUTION

| Priority | Agent | Reason |
|----------|-------|--------|
| 1 | Agent 1: Lesson Content | Core product — lessons are everything |
| 2 | Agent 7: QA Bug Hunter | Catch schema/technical errors immediately |
| 3 | Agent 13: Pedagogical Auditor | Catch content/teaching quality issues |
| 4 | Agent 10: Grammar Guide | Grammar completeness affects multiple views |
| 5 | Agent 9: Vocab Trainer | SRS quality affects retention |
| 6 | Agent 2: Story Content | Only 6 stories exist, need more |
| 7 | Agent 12: Testing | Tests validate the learning |
| 8 | Agent 4: Passive Phase | Content already exists (50 days) |
| 9 | Agent 8: Documentation Sync | Docs are ~40% outdated |
| 10 | Agent 5: Arena Content | Arena works but could be better |
| 11 | Agent 6: AI Conversation | Works but scenarios need curriculum alignment |
| 12 | Agent 11: Dashboard/UX | Functional but could be polished |
| 13 | Agent 3: Video Content | Hardest — requires external video sourcing |
