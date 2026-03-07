# INSTRUCTIONS FOR COPILOT — READ THIS BEFORE ANY EDIT

**This document exists because repeated inconsistencies were found across lesson files, exercise components, and data schemas. Every inconsistency traced back to the same root cause: agents worked without a complete specification. This document IS that specification. Read it in full before touching any file.**

---

## WHY INCONSISTENCIES KEEP HAPPENING

| Cause | Example |
|---|---|
| No canonical field list existed | `exampleSk` existed on V01–V07 but not V08–V21 because later-added entries were not checked against the schema |
| Component behaviour was not documented | `FlashcardExercise.jsx` ignores `exercise.items` entirely — no doc described this, so sub-agents kept writing dead data into all 80 lesson files |
| MCQ/Fill `explanation` field was in data but never rendered | No doc said "this field IS rendered" — so agents never noticed it was silently dropped |
| Grammar level violations in examples | "Sie haben alles verstanden" (Perfekt) in L01, a Lesson 1 file — because no rule said "L01 examples must use only A1 grammar" |
| Factual errors | "Das Alphabet hat 26 Buchstaben" — German has 30. No content-correctness rule existed |
| Sub-agents ran in parallel, each with partial context | SA1 might fix vocab; SA4 checks vocabulary — they don't know what each other did |
| Feature added without auditing all entry points | AI features built but Dashboard, Welcome, Príručka had zero mention — user had to complain three times before it was fixed |

**The fix: this document. Read it first. Every time.**

---

## RULE 1 — ALWAYS READ BEFORE EDITING

Before editing ANY file in this project:
1. Read this entire `INSTRUCTIONS.md`
2. Read `docs/APP_OVERVIEW.md`
3. Read the specific file you are about to edit (do not assume you know its contents)
4. Cross-check against the schemas in this document

---

## RULE 1B — FULL INTERCONNECTION AUDIT (MANDATORY FOR EVERY TASK)

**This rule exists because the user should NOT have to point out missing connections. That is the agent's job.**

After completing any task — adding a feature, changing a component, adding a view, changing navigation — you MUST audit the full impact before marking the task done. Use this checklist every time:

### When adding a new VIEW or FEATURE:
- [ ] Is it reachable from **Sidebar.jsx**? (nav item added?)
- [ ] Is it mentioned on **Welcome.jsx**? (discovery for new users)
- [ ] Is it mentioned on **Dashboard.jsx**? (entry point for returning users)
- [ ] Is it documented in **MethodGuide.jsx** (Príručka)? (how-to + tools list)
- [ ] Does **App.jsx** have the required state, routing, and prop passing?
- [ ] Does **LessonView.jsx** need to render a new exercise type?
- [ ] Do any lesson data files (L01.js–L80.js) need updating?

### When changing a COMPONENT PROP or SIGNATURE:
- [ ] Find every parent that renders this component and update the prop passing
- [ ] Use grep to find all usages before editing

### When changing DATA SCHEMA:
- [ ] All 80 lesson files that use this schema must be checked and updated
- [ ] All components that read this data must still work

### The Rule:
**Do not declare a task complete until every item above that applies has been checked and actioned.** The user should never have to point out a missing connection — that is the agent's responsibility.

---

## RULE 2 — COMPLETE VOCAB ENTRY SCHEMA

Every entry in `lesson.vocab[]` **MUST** have ALL of these fields. No exceptions.

```js
{
  de: string,           // REQUIRED. The German word/phrase. Use straight quotes only.
  sk: string,           // REQUIRED. Slovak translation.
  gender: 'M'|'F'|'N'|null,  // REQUIRED. M/F/N for nouns, null for verbs/phrases/adjectives.
  srsId: string,        // REQUIRED. Format: 'L{lessonId}_V{padded2digit}'. E.g. 'L01_V03', 'L12_V15'.
  example: string,      // REQUIRED. A German example sentence using the word. Must be at A1 level.
  exampleSk: string,    // REQUIRED. Slovak translation of the example sentence.
  recycledFrom: [],     // REQUIRED. Array of srsIds this word previously appeared in. Empty [] for first appearance.
}
```

### Mandatory content rules for vocab entries:
- `example` sentence must only use grammar structures appropriate for the lesson's CEFR level
  - L01–L10 (A1 early): Präsens only. No Perfekt, no Präteritum, no Konjunktiv.
  - L01–L10 **exception:** `möchten` and `können` allowed as **fixed phrases** from L03+ (e.g. "Ich möchte...", "Können Sie..."). Full modal grammar is introduced at L11+.
  - L11–L40 (A1 mid): Präsens + modal verbs + imperative only.
  - L41–L60 (A1 late): Präsens + Perfekt allowed.
  - L61–L80 (A1 exam): All A1 grammar allowed.
- `example` vocabulary: use ANY natural A1 words — do NOT restrict to only words from this lesson. Students learn from context and exposure. The grammar STRUCTURE constraint applies, but individual vocabulary words can come from anywhere.
- `example` must be natural German. Test: would a native speaker say this?
- `gender` must be factually correct. Do not guess — verify.
- `srsId` must be unique across ALL 80 lessons. Format: L{id}_V{01..99}.

### Fields NEVER used by any component (do not add):
- There is no `audioUrl` field anywhere in the app
- There is no `tag` or `category` field

---

## RULE 3 — COMPLETE LESSON OBJECT SCHEMA

Every lesson exported from `src/data/lessons/L*.js` **MUST** have ALL of these top-level fields:

```js
export const lessonNN = {
  id: number,                      // REQUIRED. Integer 1–80.
  week: number,                    // REQUIRED. Integer 1–16.
  day: number,                     // REQUIRED. Integer 1–5 (within the week).
  title: string,                   // REQUIRED. German title of the lesson.
  topic: string,                   // REQUIRED. Slovak description of the topic.
  cefr: 'A1'|'A2',                 // REQUIRED. Always 'A1' for this course.
  xpReward: number,                // REQUIRED. Integer 15–30 depending on difficulty.
  narrativeContext: string,        // REQUIRED. Short story context (Jana's situation this lesson).
  communicativeGoal: string,       // REQUIRED. "Po tejto lekcii viem..." sentence in Slovak.
  skillFocus: string[],            // REQUIRED. Array from: 'vocabulary','grammar','listening','reading','writing','speaking','pronunciation'.
  grammarNote: object,             // REQUIRED. See schema below.
  vocab: VocabEntry[],             // REQUIRED. 15–22 items. Every item follows RULE 2.
  exercises: Exercise[],           // REQUIRED. See RULE 4 for valid exercise types and counts.
  reviewWords: string[],           // REQUIRED. Array of German words (de strings) recycled from prior lessons. Empty [] for L01.
  lessonNotes: string,             // REQUIRED. Short SK-language summary for the teacher/student.
};
```

### grammarNote schema:
```js
grammarNote: {
  rule: string,          // REQUIRED. Short title of the grammar rule. Used in GrammarGuide view.
  explanation: string,   // REQUIRED. Full paragraph in Slovak explaining the rule. Used in GrammarGuide view.
  examples: [            // REQUIRED. 4–8 objects. Each example is TTS-clickable in GrammarGuide.
    { de: string, sk: string, note?: string }
  ],
  slovakContrastNote: string,  // REQUIRED. Explains how this rule differs from Slovak.
  // Optional extended fields (L01+ may have):
  alphabetTable?: object[],    // L01 specific
  digraphs?: object[],         // L01 specific
  phoneticAlphabet?: object[], // L01 specific
}
```

### CRITICAL: grammarNote.explanation is rendered by GrammarGuide.jsx
If this field is empty or missing, the Grammar Guide view will show a blank card for that lesson. **Always provide a full paragraph.**

---

## RULE 4 — EXERCISE TYPE SCHEMAS AND COUNTS

### Canonical lesson exercise order (ALL lessons L01–L80):
| # | Exercise type | What it trains | Component |
|---|---|---|---|
| 1 | `flashcard` | Vocab passive recognition | FlashcardExercise |
| 2 | `match` | Vocab DE↔SK active retrieval | MatchExercise |
| 3 | `wordorder` | Grammar rule construction | WordOrderExercise |
| 4 | `fill` | Grammar + vocab fill-in | FillExercise |
| 5 | `listen` | Pronunciation recognition | ListenExercise |
| 6 | `mcq` | Mixed grammar + vocab review | MCQExercise |
| 7 | `minitext` | Reading comprehension (Lesen) | MiniTextExercise |
| 8 | `speaking` | Speaking practice (Sprechen) | SpeakingExercise |
| 9 | `conjugation` | Verb form practice | ConjugationExercise |
| 10 | `truefalse` | Grammar rule comprehension | TrueFalseExercise |
| 11 | `dictation` | Listening + writing | DictationExercise |
| 12 | `categorysort` | Classification / gender / semantic grouping | CategorySortExercise |
| 13 | `translation` | SK→DE active production | TranslationExercise |
| 14 | `writing` | AI writing correction (optional) | WritingChecker |
| — | `dialogue` | Interactive dialogue (L50+) | DialogueExercise |

**CRITICAL:** Exercises 1–13 are REQUIRED in every lesson. `writing` is optional. `dialogue` replaces or supplements `speaking` from L50+.

The `wordorder` exercise MUST target the **specific grammar rule** (grammarNote.rule) of that lesson — it is NOT a generic vocabulary exercise.

The `minitext` MUST be a short (max 80 words) A1-level German narrative text using vocabulary from that lesson. It must follow the grammar level constraints of RULE 2.

### flashcard exercise schema:
```js
{ type: 'flashcard', instruction: string }
```
**CRITICAL: No `items` array. FlashcardExercise.jsx reads lesson.vocab directly. Any `items` array is dead data and must NOT be included.**

### match exercise schema:
```js
{
  type: 'match',
  instruction: string,
  pairs: [
    [string, string]         // [German, Slovak] — exactly 2-element arrays.
  ]  // 6–10 pairs.
}
```

### wordorder exercise schema:
```js
{
  type: 'wordorder',
  instruction: string,
  sentences: [
    {
      words: string[],         // REQUIRED. The shuffled word tokens. Each token = one word.
      correct: string,         // REQUIRED. The correct assembled sentence (words joined with spaces, NO final punctuation token).
      hint: string,            // REQUIRED. Slovak translation of the sentence — shown to student.
      explanation: string,     // REQUIRED. Grammar note explaining WHY this word order is correct.
    }
  ]  // 4–6 sentences per lesson. Must target THIS lesson's grammarNote.rule.
}
```
**CRITICAL: sentences MUST drill the grammar rule of the lesson — not random vocabulary. WordOrderExercise.jsx compares `built.join(' ')` to `correct` (case-insensitive). Do NOT include punctuation as separate tokens — the `correct` string has no trailing `.` or `?` token.**

### fill exercise schema:
```js
{
  type: 'fill',
  instruction: string,
  questions: [
    {
      sentence: string,      // German sentence with '___' as placeholder.
      answer: string,        // The word/phrase that fills the blank. Case-sensitive. 
      hint: string,          // Slovak translation hint. Shown when lightbulb clicked.
      explanation: string,   // REQUIRED. Rendered below feedback in FillExercise.jsx.
    }
  ]  // 4–8 questions per lesson.
}
```

### listen exercise schema:
```js
{
  type: 'listen',
  instruction: string,
  questions: [              // field name is 'questions', NOT 'pairs'.
    { de: string, sk: string }
  ]  // 6–10 pairs. Order: simple words first, compound/long words last.
}
```
**CRITICAL: The field is `questions`, not `pairs`. ListenExercise.jsx reads `exercise.questions`.**
No audio files are needed — TTS via Web Speech API is used. Rate: 0.75x for initial play.

### mcq exercise schema:
```js
{
  type: 'mcq',
  instruction: string,
  questions: [
    {
      question: string,            // REQUIRED. The question text **IN GERMAN**. See RULE 15.
      questionSk: string,          // REQUIRED. Slovak translation of the question. Shown on tap of translate icon.
      options: string[],           // Exactly 4 options. **IN GERMAN**.
      answer: number,              // 0-BASED index of the correct option. NOT the text, the INDEX.
      explanation: string,         // REQUIRED. Rendered below the correct/wrong feedback in MCQExercise.jsx.
    }
  ]  // 4–8 questions per lesson. Mix of grammar AND vocabulary questions.
}
```
**CRITICAL: `answer` is a 0-based integer index. answer:0 = first option, answer:1 = second, etc. Never put the text of the answer in this field.**
**CRITICAL: `question` and `options` MUST be in German (see RULE 15). `questionSk` provides the Slovak translation.**

### minitext exercise schema:
```js
{
  type: 'minitext',
  instruction: string,
  text: string,            // REQUIRED. Short German narrative text (max 80 words). A1 grammar level only. Uses lesson vocabulary.
  textSk: string,          // REQUIRED. Slovak translation (collapsible in UI — shown on demand).
  questions: [
    {
      question: string,    // REQUIRED. German comprehension question about the text. **IN GERMAN** (see RULE 15).
      questionSk: string,  // REQUIRED. Slovak translation of the question. Shown on tap of translate icon.
      options: string[],   // Exactly 4 options. **IN GERMAN**.
      answer: number,      // 0-BASED index.
      explanation: string, // Quote from text explaining the answer.
    }
  ]  // 3–5 comprehension questions.
}
```
**Text grammar constraint: same as RULE 2 vocab examples — use only grammar structures appropriate for the lesson's CEFR stage.**
**CRITICAL: `question` and `options` MUST be in German (see RULE 15). `questionSk` provides the Slovak translation.**

### speaking exercise schema:
```js
{
  type: 'speaking',
  instruction: string,
  phrases: [
    {
      de: string,    // REQUIRED. German phrase to speak.
      sk: string,    // REQUIRED. Slovak translation.
      tip: string,   // REQUIRED. Pronunciation tip (e.g. 'W=[v], ö=[ø]'). Keep ≤60 chars.
    }
  ]  // 5–8 phrases per lesson. Include key phrases from lesson vocabulary.
}
```
SpeakingExercise.jsx uses self-assessment: student listens via TTS, then marks themselves as zvládol/treba zopakovať. No speech recognition API required.

### dialogue exercise schema (L50+ or when narratively appropriate):
```js
{
  type: 'dialogue',
  title: string,             // Optional dialog title.
  turns: [
    {
      speaker: string,       // Character name (e.g. 'Jana', 'Rezepcionistka').
      de: string,            // German text of this turn.
      sk: string,            // Slovak translation.
      playerTurn: boolean,   // true = student chooses response. false = display + TTS.
      options?: [            // Required when playerTurn: true.
        { de: string, correct: boolean }
      ]
    }
  ]
}
```

### conjugation exercise schema:
```js
{
  type: 'conjugation',
  instruction: string,
  verbs: [
    {
      infinitive: string,   // REQUIRED. German infinitive (e.g. 'sein', 'heißen').
      translation: string,  // REQUIRED. Slovak translation of the verb.
      forms: [
        { pronoun: string, correct: string }  // 3 forms: ich/du/er,sie,es
      ],
      note: string,          // REQUIRED. Short grammar note (e.g. 'nepravidelné sloveso').
    }
  ]  // 2 verbs per lesson. Must target verbs taught in THIS lesson.
}
```
**CRITICAL: Target verbs from the CURRENT lesson's grammar. L01 → sein/heißen. L03 → kommen/sprechen. L05 → arbeiten/machen.**

### truefalse exercise schema:
```js
{
  type: 'truefalse',
  instruction: string,
  statements: [
    {
      statement: string,    // REQUIRED. A German statement about grammar or vocabulary.
      isTrue: boolean,      // REQUIRED. true or false.
      explanation: string,  // REQUIRED. Slovak explanation of WHY it's true/false.
    }
  ]  // 5 statements per lesson. Mix of true AND false. Test grammar rules, not just vocab.
}
```

### dictation exercise schema:
```js
{
  type: 'dictation',
  instruction: string,
  sentences: [
    {
      de: string,           // REQUIRED. The German sentence (spoken via TTS).
      sk: string,           // REQUIRED. Slovak translation (shown after answer).
      hint: string,         // Optional. Hint shown if student struggles.
    }
  ]  // 5 sentences per lesson. Uses lesson vocabulary. TTS speaks at 0.7x rate.
}
```
**DictationExercise.jsx uses `normalizeGerman()` from `src/utils/text.js` for comparison (ä→ae, ö→oe, ü→ue, ß→ss allowed).**

### categorysort exercise schema:
```js
{
  type: 'categorysort',
  instruction: string,
  categories: [
    {
      name: string,         // REQUIRED. Category label (e.g. 'Begrüßung', 'der-Berufe').
      color: string,        // REQUIRED. One of: 'blue','rose','green','amber','purple','gray'.
      words: string[],      // REQUIRED. German words belonging to this category.
    }
  ],  // 2–4 categories per exercise. Must be pedagogically meaningful.
  explanation: string,      // REQUIRED. Slovak explanation shown after completion.
}
```
**Categories must be pedagogically relevant: greetings/farewells, der/die nouns, irregular/regular, countries/languages, etc. NOT arbitrary groupings.**

### translation exercise schema:
```js
{
  type: 'translation',
  instruction: string,
  sentences: [
    {
      sk: string,           // REQUIRED. Slovak sentence to translate.
      answer: string,       // REQUIRED. Correct German translation.
      hint: string,         // REQUIRED. Vocabulary hint (German).
      explanation: string,  // REQUIRED. Grammar explanation (Slovak).
    }
  ]  // 4 sentences per lesson. Uses THIS lesson's grammar structures.
}
```
**TranslationExercise.jsx uses `normalizeGerman()` for comparison. TTS speaks correct answer after checking.**

### writing exercise schema (optional, AI-powered):
```js
{
  type: 'writing',
  instruction: string,
  prompts: [
    { sk: string, hint: string }   // SK prompt + German starting hint
  ]
}
```

---

## RULE 5 — COMPONENT–DATA DEPENDENCY MAP

This is the definitive map of which component reads which fields. **Before editing any lesson data file, cross-check against this map.**

### FlashcardExercise.jsx
- Reads from: `lesson.vocab` (NOT `exercise.items`)
- Fields accessed: `vocab[].de`, `vocab[].sk`, `vocab[].example` (shown on back of card)
- Fields NOT used: `exampleSk`, `gender`, `srsId`, `recycledFrom`
- TTS: speaks `card.de` on flip

### MCQExercise.jsx
- Reads from: `exercise.questions[]`
- Fields accessed: `q.question`, `q.questionSk`, `q.options[]`, `q.answer` (0-based index), `q.explanation`
- `q.question` IS in German — displayed as main question text
- `q.questionSk` IS rendered — shown on toggle (translate icon click)
- `q.explanation` IS rendered — it appears after the answer feedback

### FillExercise.jsx
- Reads from: `exercise.questions[]`
- Fields accessed: `q.sentence`, `q.answer`, `q.hint`, `q.explanation`
- `q.explanation` IS rendered — appears after both correct and incorrect answers
- `q.hint` IS rendered — appears when lightbulb icon clicked, and always on wrong answer

### ListenExercise.jsx
- Reads from: `exercise.questions[]`
- Fields accessed: `q.de`, `q.sk`
- Uses TTS (Web Speech API) to speak `q.de` at 0.75x rate
- Normalization: ä→ae, ö→oe, ü→ue, ß→ss (so students can type ASCII equivalents)
- "Show answer" button reveals `q.de` and `q.sk`

### MatchExercise.jsx
- Reads from: `exercise.pairs[]`
- Fields accessed: `pair[0]` (German, left column), `pair[1]` (Slovak, right column)
- TTS: speaks `pair[0]` on correct match
- Score formula: `Math.max(0, Math.round(100 - (attempts - pairs.length) * 10))`
  - Score floor is 0 (not 50 — was fixed during audit)

### DialogueExercise.jsx
- Reads from: `exercise.turns[]`
- Fields accessed: `turn.speaker`, `turn.de`, `turn.sk`, `turn.playerTurn`, `turn.options[]`
- TTS: speaks `turn.de` on display
- Player turns: shows `options[]`, tracks correct selections
- Score: percentage of correct player-turn answers

### WordOrderExercise.jsx
- Reads from: `exercise.sentences[]`
- Fields accessed: `sentence.words[]`, `sentence.correct`, `sentence.hint`, `sentence.explanation`
- `sentence.hint` IS rendered — shown as "Preklad (SK)" card above the word bank
- `sentence.explanation` IS rendered — shown in feedback block after checking
- Comparison: `built.map(t => t.text).join(' ')` vs `sentence.correct` (case-insensitive, trimmed)
- TTS: speaks `sentence.correct` on correct answer (or on demand)
- **CRITICAL: `words` are displayed as clickable tiles. Do NOT include punctuation as separate tokens.**

### MiniTextExercise.jsx
- Reads from: `exercise.text`, `exercise.textSk`, `exercise.instruction`, `exercise.questions[]`
- Fields accessed: `exercise.text` (displayed with TTS button), `exercise.textSk` (collapsible Slovak translation)
- Questions: `q.question` (German), `q.questionSk` (Slovak, shown on translate icon), `q.options[]`, `q.answer` (0-based), `q.explanation`
- Phase 1: student reads text (can play TTS, toggle Slovak translation), clicks "Odpovedať na otázky"
- Phase 2: standard MCQ on the text content
- **Text must be max 80 words, A1 grammar level, use vocabulary from the lesson**
- **Questions and options MUST be in German (see RULE 15). `questionSk` provides the Slovak translation on icon click.**

### SpeakingExercise.jsx
- Reads from: `exercise.phrases[]`
- Fields accessed: `phrase.de`, `phrase.sk`, `phrase.tip`
- `phrase.de` IS spoken via TTS on demand
- `phrase.sk` IS displayed as translation
- `phrase.tip` IS displayed as pronunciation hint
- Self-assessment: student clicks "Zvládol som" (true) or "Treba zopakovať" (false)
- Score: percentage of phrases marked as zvládol
- **No speech recognition API required — purely self-assessed**

### ConjugationExercise.jsx
- Reads from: `exercise.verbs[]`
- Fields accessed: `verb.infinitive`, `verb.translation`, `verb.forms[]` (pronoun + correct), `verb.note`
- Student fills in conjugation form for each pronoun
- TTS: speaks correct form after check
- Score: percentage of correctly filled forms

### TrueFalseExercise.jsx
- Reads from: `exercise.statements[]`
- Fields accessed: `stmt.statement`, `stmt.isTrue`, `stmt.explanation`
- Student clicks Pravda (true) or Nepravda (false)
- `stmt.explanation` IS rendered — shown after each answer
- Score: percentage of correct answers

### DictationExercise.jsx
- Reads from: `exercise.sentences[]`
- Fields accessed: `s.de`, `s.sk`, `s.hint`
- TTS: auto-plays `s.de` at 0.7x rate on new sentence
- Two speed buttons: normal (0.7x) and slow (0.45x)
- Uses `normalizeGerman()` from `src/utils/text.js` for answer comparison
- Score: percentage of correctly written sentences

### CategorySortExercise.jsx
- Reads from: `exercise.categories[]`, `exercise.explanation`
- Fields accessed: `cat.name`, `cat.color`, `cat.words[]`
- Student drags/clicks words into correct category column
- Color map: blue, rose, green, amber, purple, gray
- `exercise.explanation` IS rendered — shown after completion
- Score: percentage of correctly sorted words

### TranslationExercise.jsx
- Reads from: `exercise.sentences[]`
- Fields accessed: `s.sk`, `s.answer`, `s.hint`, `s.explanation`
- Student sees Slovak sentence, types German translation
- Uses `normalizeGerman()` for comparison
- TTS: speaks `s.answer` on correct answer
- `s.explanation` IS rendered — shown after each answer
- Score: percentage of correct translations

### LessonView.jsx (view — orchestrates exercises)
- Reads from: `lesson.id`, `lesson.title`, `lesson.topic`, `lesson.week`, `lesson.cefr`, `lesson.xpReward`, `lesson.grammarNote`, `lesson.vocab`, `lesson.exercises[]`
- Phases: grammar → exercises → results
- GrammarCard: reads `lesson.grammarNote.rule`, `lesson.grammarNote.explanation`, `lesson.grammarNote.examples[]`, `lesson.vocab` (first 5 items for preview)
- Results: calculates `avgScore`, calls `onComplete(lesson.id, Math.round(avgScore), lesson.xpReward)`

### GrammarGuide.jsx (view)
- Reads from ALL lessons: `lesson.grammarNote.rule`, `lesson.grammarNote.explanation`, `lesson.grammarNote.examples[]`, `lesson.vocab[]`
- **If `grammarNote.explanation` is empty → blank accordion panel. Always provide full text.**
- Searchable by `grammarNote.rule`, `grammarNote.explanation`, `lesson.title`
- Grouped by `lesson.week`
- Each example click triggers TTS: speaks `example.de`

### VocabTrainer.jsx (view)
- Reads from ALL lessons: `lesson.vocab[]`, `lesson.id`, `lesson.title`
- Fields accessed: `vocab.de`, `vocab.sk`, `vocab.example` (conditionally shown on card back)
- Fields NOT accessed: `exampleSk`, `gender`, `srsId`, `recycledFrom`
- Deck building: unseen first → not-mastered → up to 5 mastered for review
- Mastery key: stored in `progress.vocabSeen[vocab.de]`
- TTS: speaks `vocab.de` on card flip, speaks `vocab.example` on example click
- **ALL vocabulary from ALL 80 lessons is included in the deck**

### Dashboard.jsx (view)
- Reads from ALL lessons: `lesson.id`, `lesson.vocab.length`, `lesson.xpReward`, `lesson.title`, `lesson.topic`, `lesson.week`, `lesson.cefr`
- Reads from WEEKLY_PLAN: `week.week`, `week.title`, `week.theme`, `week.lessons[]`, `week.tips`
- Reads from progress: `completedLessons`, `xp`, `streak`, `vocabSeen`, `dailyXP`

### WeeklyPlan.jsx (view)
- Reads: `LESSONS`, `WEEKLY_PLAN`
- Per lesson: `lesson.id`, `lesson.title`, `lesson.xpReward`
- Per week: `week.week`, `week.title`, `week.theme`, `week.lessons[]`, `week.tips`

### PassivePhase.jsx (view)
- Reads from: `src/data/phrases.js` — exports `PHRASE_DAYS`
- Does NOT read directly from lesson files
- Has TTS, LCS diff, Phase 1/Phase 2 learning modes

### MethodGuide.jsx (view)
- Static content only. No lesson data access.

### Sidebar.jsx (component)
- Static navigation. No data. 6 nav items: dashboard, weekly, passive, vocab, grammar, guide

---

## RULE 6 — PROGRESS SYSTEM (useProgress.js)

Storage key in localStorage: `german_progress_v2`

```js
progress = {
  xp: number,
  streak: number,
  lastStudyDate: string|null,     // ISO date string 'YYYY-MM-DD'
  completedLessons: {             // key = lessonId (number), value = object
    [lessonId]: {
      completedAt: string,        // ISO datetime
      score: number,              // 0–100 average across exercises
      xpEarned: number,
    }
  },
  vocabSeen: {                    // key = vocab.de German word string
    [de_string]: {
      seenCount: number,
      lastSeen: string,           // ISO datetime
      mastered: boolean,
    }
  },
  dailyXP: [                      // last 30 days
    { date: string, xp: number }  // date = 'YYYY-MM-DD'
  ],
}
```

Functions:
- `completeLesson(lessonId, score, xpReward)` — updates xp, streak, completedLessons, dailyXP. XP earned = `Math.round(xpReward * (score/100))`
- `markVocabSeen(word, mastered)` — updates vocabSeen entry

---

## RULE 7 — CURRICULUM.JS STRUCTURE

`src/data/curriculum.js` exports:
- `LESSONS` — array of all 80 lesson objects in order [lesson01, ..., lesson80]
- `WEEKLY_PLAN` — array of 16 week objects
- `A2_PREVIEW` — array of strings describing A2 content (used in Dashboard teaser)

WEEKLY_PLAN entry schema:
```js
{
  week: number,         // 1–16
  title: string,        // Week title in Slovak
  theme: string,        // Grammar/topic themes covered
  lessons: number[],    // Array of 5 lesson IDs in this week
  restDays: number[],   // Always [6, 7]
  tips: string,         // Study tip for this week (Slovak)
}
```

### Weekend recap structure (Day 6 + Day 7):

Each week has 2 structured recap days after the 5 lesson days. These are NOT rest — they are curriculum activities.

**Day 6 (Saturday) — Active Review:**
1. **WeeklyTest** (`src/views/WeeklyTest.jsx`): 20-question Goethe-style test from the week's 5 lessons
   - Hörverstehen: 5 questions (TTS → select Slovak translation)
   - Leseverstehen: 8 questions (MCQ from lesson exercises)
   - Wortschatz: 7 questions (German → select Slovak from 4 options)
   - Questions generated dynamically by `buildQuestionPool(lessons)`
   - All distractors from same week's vocabulary pool
2. **VocabTrainer** (`src/views/VocabTrainer.jsx`): SM-2 spaced repetition review of all week's vocabulary

**Day 7 (Sunday) — Passive Contact:**
1. **PassivePhase** (`src/views/PassivePhase.jsx`): Listening + dictation from `src/data/phrases.js`
2. **GrammarGuide** (`src/views/GrammarGuide.jsx`): Re-read grammar notes from all 5 lessons this week

**UI:** `WeeklyPlan.jsx` renders Day 6 and Day 7 cards with navigation buttons to these sub-apps.

**Quality rules:**
- WeeklyTest must pull from ALL 5 lessons (balanced, at least 1 question per lesson)
- Distractors must be plausible (same word category, same week's vocab)
- PassivePhase content (`phrases.js`) must align with the curriculum week's topics
- Saturday test should only be accessible after all 5 weekday lessons are completed

---

## RULE 7B — COMPREHENSIVE 30-LESSON RECAP SYSTEM

Every 30 lessons (and at the finale lesson L80), the agent auto-generates a **large comprehensive recap lesson** saved as `L{NN}R.js`. This is a major consolidation milestone — not a regular Saturday recap.

### Recap milestones:
| File | Covers | Lessons | xpReward |
|---|---|---|---|
| `L30R.js` | L01–L30 | 30 lessons | 60 XP |
| `L60R.js` | L31–L60 | 30 lessons | 60 XP |
| `L80R.js` | L61–L80 | 20 lessons (finale) | 60 XP |

> `L10R.js` and `L20R.js` exist from an older 10-lesson mini-recap system. They are kept for backward compatibility but replaced by the comprehensive format going forward.

### How the recap is triggered (in `agent1-lesson-generator.cjs`):
```js
if (lessonNum % 30 === 0 || lessonNum === 80) {
  // triggers generateRecapLesson(lessonNum)
}
```
- `--recap-only` flag: accepts `30`, `60`, `80` as valid arguments only

### After auto-generation, manually add to `curriculum.js`:
```js
import { lesson60R } from './lessons/L60R.js';  // add at top
// In LESSONS array after lesson60:
lesson60R,  // Comprehensive recap: L31–L60
```

### Recap lesson requirements:
- `id`: `lessonNum + 0.5` (e.g., 60.5)
- `day: 6` (always Saturday)
- `vocab: []` — no new vocabulary; flashcard reads from all prior lessons in the block
- `grammarNotes: []` — no new grammar
- `xpReward: 60` — higher than normal lessons
- **Minimum 17 exercises**: flashcard + match×2 + wordorder×2 + fill×2 + listen + mcq×2 + minitext + speaking + truefalse + dictation + categorysort + translation + conjugation
- Every exercise must use ONLY vocabulary and grammar from the covered lessons — no new words

---

## RULE 8 — USETTS HOOK

`src/hooks/useTTS.js` — Web Speech API wrapper.

```js
const { speak, stop, speaking } = useTTS();
speak(text, lang='de-DE', rate=0.85)
```

- Prefers non-Google German voice if available
- `speaking` boolean — true while audio is playing
- All exercise components import and use this hook
- **Never store audio files — all audio is TTS**

---

## RULE 9 — WHAT MUST NEVER CHANGE

| Item | Rule |
|---|---|
| Storage key `german_progress_v2` | Never rename — would wipe all user progress |
| `lesson.id` values | Never change or renumber — progress is keyed by lesson ID |
| `srsId` values once assigned | Never change — VocabSeen is keyed by `vocab.de` string but srsIds used for cross-referencing |
| `vocab.de` strings once in production | Never change spelling — vocabSeen is keyed by the DE string |
| Exercise type strings | 'flashcard','mcq','fill','listen','match','dialogue','wordorder','speaking','minitext','conjugation','truefalse','dictation','categorysort','translation','writing' — exact lowercase strings |
| View IDs in Sidebar | 'dashboard','weekly','passive','vocab','grammar','guide','lesson' — changing breaks navigation |

---

## RULE 10 — GERMAN CONTENT QUALITY RULES

1. **Factual accuracy**: Verify all facts. German alphabet = 30 characters (A–Z + Ä/Ö/Ü/ß), not 26.
2. **Grammar level compliance**: Example sentences may only use grammar structures appropriate for the lesson's CEFR stage (see Rule 2 vocab section).
3. **Naturalness**: All German must be natural. Use collocations a native speaker would use.
4. **Slovak accuracy**: All Slovak translations must be correct standard Slovak (not Czech).
5. **Goethe A1 Wortliste**: From L01–L80, prioritize words on the official Goethe A1 Wortliste over meta-linguistic jargon.
6. **Article/gender accuracy**: Verify all noun genders — never guess.
7. **No smart quotes**: All JS string values use straight single quotes ' — never „" or "" or ''.
8. **Umlaut handling**: Always use actual Unicode characters ä ö ü ß in strings, not ae oe ue ss substitutes.

---

## RULE 10B — GENDER COLOR SYSTEM (BERLINER METHODE)

The app uses the proven 3-color system (Berliner Methode) to help learners associate noun genders through color. **All German nouns displayed anywhere in the app are automatically color-coded by gender.**

### Color scheme:
| Article | Gender | Color | Tailwind class | Hex |
|---|---|---|---|---|
| **der** | Maskulin (M) | modrá (blue) | `text-blue-400` | `#60a5fa` |
| **die** | Feminin (F) | červená (rose/red) | `text-rose-400` | `#fb7185` |
| **das** | Neutrum (N) | zelená (green) | `text-green-400` | `#4ade80` |

### How it works:
- **Utility file**: `src/utils/genderColors.jsx` — exports `GenderText`, `GenderWord`, `GenderLegend`, `getGenderMap()`, `getGenderForWord()`, `GENDER_COLORS`
- **`GenderWord`** — for single vocab words with known gender (pass `word` and `gender` props)
- **`GenderText`** — for German sentences/text. Auto-detects "der/die/das + Noun" patterns and standalone known nouns using a global gender map built from ALL lessons' vocab.
- **`GenderLegend`** — compact 3-color legend shown at the bottom of relevant exercises
- The global gender map is lazily built from `LESSONS[].vocab[]` — any noun with `gender !== null` is indexed by its bare form (without article)

### Where it is applied (ALL these components use gender coloring):
| Component | What is colored |
|---|---|
| FlashcardExercise | `card.de` on front (via GenderWord), `card.example` on back (via GenderText) |
| MatchExercise | German side items (via getGenderForWord) |
| WordOrderExercise | Word tiles in bank (via getGenderForWord) |
| FillExercise | Sentence parts around the blank (via GenderText) |
| ListenExercise | Correct answer reveal (via GenderText) |
| MCQExercise | Question text and option text (via GenderText) |
| MiniTextExercise | Main German reading text (via GenderText) |
| SpeakingExercise | German phrase display (via GenderText) |
| VocabTrainer | Card front in all 3 modes (via getGenderForWord), example sentences (via GenderText) |
| GrammarGuide | Grammar examples `ex.de` (via GenderText) |
| LessonView GrammarCard | Grammar examples, vocab preview (via GenderText + GenderWord) |

### Rules for agents creating/editing lessons:
1. **Every noun in `vocab[]` MUST have a correct `gender` field** — M, F, or N. This field drives the color system. A wrong gender = wrong color = confused learner.
2. The `de` field for nouns MUST include the article: `'der Name'`, `'die Frau'`, `'das Land'`. The `GenderText` component uses articles to detect and color nouns in sentences.
3. When writing German sentences for exercises (examples, fill sentences, minitext, speaking phrases), use the definite article with nouns wherever grammatically natural. This maximizes color coverage.
4. **Never hardcode colors in lesson data** — coloring is handled automatically by the components via `genderColors.jsx`.
5. If adding a new exercise component that displays German text, import and use `GenderText` or `GenderWord` from `../../utils/genderColors`.

---

## RULE 14 — EXERCISE CONTENT FRESHNESS AND VARIATION

**This rule exists because AI-generated exercises often reuse the same sentence structures and vocabulary patterns across exercises within one lesson, producing a repetitive and pedagogically weak experience. An experienced German teacher would NEVER give a student the same sentence pattern in two exercises.**

### Absolute prohibitions:
1. **No sentence recycling**: A German sentence (or close paraphrase of it) may appear in AT MOST ONE exercise within a lesson. If "Ich bin Anna" appears in the flashcard, it must NOT appear in fill, MCQ, or minitext.
2. **No pattern recycling**: If the fill exercise has "Ist das ___ oder falsch?", then the MCQ must NOT have a question about "richtig oder falsch" using the same framing.
3. **No vocabulary cluster reuse**: Each exercise should draw from DIFFERENT vocabulary items. If the match exercise covers words 1–8, the fill should focus on words 5–15.

### Mandatory variation rules:
4. **MCQ question variety**: Questions must mix these types — at least 2 types per lesson:
   - Grammar-rule questions ("Welcher Satz ist richtig?")
   - Vocabulary meaning ("Was bedeutet 'sprechen'?")
   - Sentence completion ("Ergänze den Satz: Ich ___ Deutsch.")
   - Context/situation questions ("Was sagst du, wenn du jemanden triffst?")
5. **Fill focus diversity**: Each fill question must test a DIFFERENT grammar point or vocabulary item. Never two blanks testing the same word form.
6. **WordOrder must be grammar-focused**: Sentences in wordorder exercise must specifically drill the lesson's `grammarNote.rule`. They should produce different sentence structures — not 4 variations of "Ich bin X".
7. **Speaking phrases must be situational**: Each phrase should present a different communicative situation (greeting, asking, answering, apologizing, requesting).

### Quality standard — the "Experienced Teacher" test:
Before finalizing any exercise set, ask: **Would an experienced A1 German teacher use these exact exercises in a 45-minute class?** If any exercise feels repetitive, formulaic, or too easy — rewrite it. A real teacher would vary sentence structures, introduce small surprises, mix formal/informal registers, and test understanding from different angles.

### Cross-exercise freshness check:
After writing all 8 exercises for a lesson, review them as a set:
- Count how many times each German word appears across ALL exercises. No word should appear more than 4 times (except structural words like "ist", "der", "ich").
- Ensure the 8 exercises collectively cover ALL 15–22 vocabulary items from the lesson. No vocab item should be exercised only once.
- Each exercise should feel like a NEW challenge, not a remix of the previous one.

---

## RULE 15 — GERMAN-LANGUAGE QUESTIONS (MAXIMUM EXPOSURE)

**This rule exists because the app previously displayed exercise questions in Slovak, violating the core principle of maximum German-language exposure. A learner should read German as much as possible — even in question prompts.**

### What MUST be in German:
| Exercise type | Field | Language | Example |
|---|---|---|---|
| MCQ | `question` | **GERMAN** | `'Welches Verb passt? Ich ___ Anna.'` |
| MCQ | `questionSk` | Slovak | `'Ktoré sloveso sa hodí? Ja ___ Anna.'` |
| MCQ | `options[]` | **GERMAN** | `['bin', 'bist', 'ist', 'sind']` |
| MiniText | `question` | **GERMAN** | `'Wer spricht zuerst?'` |
| MiniText | `questionSk` | Slovak | `'Kto hovorí prvý?'` |
| MiniText | `options[]` | **GERMAN** | `['Anna', 'Peter', 'Jana', 'Thomas']` |

### What stays in Slovak:
| Exercise type | Field | Language | Reason |
|---|---|---|---|
| MCQ | `explanation` | Slovak | Explanations need to be fully understood |
| MCQ | `instruction` | Slovak | Top-level instruction for the exercise |
| Fill | `hint` | Slovak | Hint must be in mother tongue to help |
| Fill | `explanation` | Slovak | Grammar explanation in mother tongue |
| WordOrder | `hint` | Slovak | Translation prompt |
| WordOrder | `explanation` | Slovak | Grammar explanation |
| Speaking | `sk` | Slovak | Translation shown after reveal |

### Component behaviour:
- **MCQExercise.jsx**: Shows `q.question` (German) as main text. A small translate icon (🇸🇰) appears next to the question. Clicking it toggles `q.questionSk` underneath.
- **MiniTextExercise.jsx**: Same pattern for comprehension questions — German question with translate toggle.
- **FillExercise.jsx**: The sentence is already in German. The hint is in Slovak. No change needed.

### For agents creating lesson data:
- Write `question` in clear, simple A1 German that a beginner can understand
- Keep questions short (max 15 words)
- Use vocabulary the student has already learned (this lesson + prior lessons)
- The `questionSk` field is a direct Slovak translation — no extra commentary
- Options in MCQ/MiniText are always German words or short German phrases

---

## RULE 16 — MINITEXT CONTINUOUS STORY (JANA'S JOURNEY)

**The minitext exercise in each lesson is part of a continuous narrative that follows Jana Nováková on her journey from Bratislava to Vienna to learn German. Each lesson's minitext is ONE EPISODE of this story, adapted to use that lesson's vocabulary and grammar.**

### Story arc overview:
- **L01–L05** (Week 1): Jana arrives in Vienna, introduces herself, meets people, learns names/ages/professions
- **L06–L10** (Week 2): Jana's daily routine — apartment, family, schedule, hobbies
- **L11–L15** (Week 3): Jana navigates the city — shopping, transport, directions
- **L16–L20** (Week 4): Jana's social life — eating out, ordering food, making plans
- **L21–L30** (Weeks 5–6): Jana at work/university — classes, colleagues, appointments
- **L31–L40** (Weeks 7–8): Jana's wider world — weather, health, travel, clothes
- **L41–L50** (Weeks 9–10): Jana handles problems — complaints, repairs, bureaucracy
- **L51–L60** (Weeks 11–12): Jana deepens relationships — celebrations, culture, opinions
- **L61–L70** (Weeks 13–14): Jana's German life — media, technology, future plans
- **L71–L80** (Weeks 15–16): Exam preparation arc — Jana reflects and prepares for Goethe A1

### Content rules for each episode:
1. **Max 80 words** — this is a hard limit
2. **Use at least 8 vocabulary words** from the current lesson's `vocab[]`
3. **Use ONLY grammar** appropriate for the lesson's CEFR stage (see RULE 2)
4. **Reference previous episodes** — mention characters or events from prior lessons when natural
5. **Each episode ends with a small cliffhanger or transition** to the next lesson's topic
6. **Characters recur**: Jana, Lukas (Austrian friend), Thomas (colleague), Maria (doctor friend), Anna (classmate). New characters may be introduced as the story progresses.
7. **The story must feel authentic** — situations a real Slovak person would encounter in Vienna

### Comprehension questions:
- 3–5 questions per minitext, ALL in German (with `questionSk` for Slovak translation)
- At least 1 question about WHO (Wer...?)
- At least 1 question about WHAT (Was...?)
- At least 1 question about a fact from the text (inference or detail)
- Options MUST be in German

---

## RULE 17 — EXERCISE DEPTH, PHRASES, AND QUESTION QUALITY

**This rule exists because AI-generated exercises tend to be shallow: too few questions, reused patterns, no real-world phrases, and vague comprehension questions. An experienced teacher would write exercises that challenge the student with VARIETY, DEPTH, and REAL-WORLD LANGUAGE.**

### Minimum exercise counts (per lesson):
| Exercise type | Minimum items | Target | Notes |
|---|---|---|---|
| `match` pairs | 8 | **10** | Cover all key new vocab + 2-3 recycled from prior lessons |
| `wordorder` sentences | 5 | **6** | All must target THIS lesson's grammar rule |
| `fill` questions | 5 | **6–8** | Mix grammar + vocab + 1-2 recycled |
| `listen` questions | 8 | **10** | Include tricky pronunciation + 2-3 recycled |
| `mcq` questions | 5 | **6–8** | 2-3 grammar + 2-3 vocab + 1-2 usage |
| `minitext` questions | 4 | **5** | Comprehension, not memory |
| `speaking` phrases | 5 | **6–8** | Progressive: word → phrase → sentence |
| `conjugation` verbs | 2 | **2–3** | Verbs from THIS lesson, 3+ forms each |
| `truefalse` statements | 5 | **6** | Mix true/false, grammar rules |
| `dictation` sentences | 5 | **6** | Progressive length: 3–8 words |
| `categorysort` categories | 2 | **3** | Pedagogically meaningful grouping |
| `translation` sentences | 4 | **5** | SK→DE, THIS lesson's grammar |

**AI BIAS WARNING:** AI agents consistently choose the LOWEST number in any range. **Always aim for the Target column, not the Minimum.** The minimum is a hard floor only.

**Recycling rule:** When exercises include recycled vocabulary from previous lessons, this ADDS to the total — it does NOT replace new-vocabulary items. If the minimum is 8 match pairs and you recycle 2 from earlier lessons, produce 10 pairs total (8 new + 2 recycled).

### Use REAL PHRASES, not isolated words:
- **Fill exercise**: Use complete, natural phrases from real-life situations — not bare grammar drills. "Ich möchte ___ Kaffee, bitte" is better than "Ich ___ Jana."
- **MCQ exercise**: Include situation-based questions: "Was sagst du im Restaurant?" alongside grammar questions.
- **Match exercise**: Mix single words AND short phrases (e.g., "Guten Morgen" ↔ "Dobré ráno") — not just isolated nouns.
- **Speaking exercise**: Each phrase must be a complete, usable real-world sentence (e.g., "Können Sie das wiederholen?" not just "wiederholen").
- **WordOrder exercise**: Use sentences from realistic dialogue situations, not artificial constructions.

### Question quality rules (MANDATORY):
1. **NO vague questions**: "O čom je text?" (What is the text about?) is BANNED. Every question must ask about a SPECIFIC fact or detail from the text.
2. **NO yes/no questions** in MCQ or minitext — they are too easy and don't test comprehension.
3. **Each question must have ONE clearly correct answer** based on the text. The three wrong options must be plausible but definitively incorrect.
4. **Wrong options must be from the same category** as the correct answer: if the answer is a number, all options are numbers; if the answer is a name, all options are names.
5. **Questions must test UNDERSTANDING, not memory**: Prefer questions about what happened, why, and what follows — not just "which word appeared in sentence 3."
6. **Explanations must quote the text**: Every `explanation` field must contain a direct quote from the text that proves the answer. Format: `'Im Text: "direct quote from text"'`

### Anti-patterns to AVOID (instant rejection):
- Generic questions like "Worum geht es?" (What is it about?) — TOO VAGUE
- Questions answerable without reading the text — BAD
- All options being completely unrelated to the text — BAD (e.g., "Berlin, Tokyo, Mars, Atlantis" for a question about Vienna)
- Same question structure repeated across exercises — BAD (e.g., "Was macht Jana?" in both MCQ and minitext)
- Placeholder or template-quality content — UNACCEPTABLE

---

## RULE 18 — GRAMMAR NOTE FORMATTING AND STRUCTURE

**This rule exists because grammar explanations were rendered as dense, unformatted plaintext paragraphs — mixing multiple topics together, making them nearly unreadable for learners.**

### Structural rules:
1. **Use `grammarNotes` (array)** instead of `grammarNote` (singular object). Each distinct grammar topic gets its OWN entry in the array.
   - BAD: One `grammarNote` covering "heißen + sein + German alphabet" — three unrelated topics jumbled together
   - GOOD: `grammarNotes` array with 3 separate objects: one for `sein`, one for `heißen`, one for the alphabet
2. **Maximum 1 concept per grammar note**. If a lesson covers verb conjugation AND a preposition AND a question form, that's 3 separate `grammarNotes` entries.
3. **The component shows "Teória (1/3)", "Teória (2/3)" etc.** — students see clear progression through grammar blocks.

### HTML formatting rules (explanation field):
The `explanation` field supports HTML and is rendered via `dangerouslySetInnerHTML`. **USE formatting liberally:**

| Element | Use for | Example |
|---|---|---|
| `<p>` | Paragraph breaks | Separate ideas into paragraphs |
| `<strong>` / `<b>` | Key terms, German words | `<strong>sprechen</strong>` |
| `<em>` / `<i>` | Linguistic terms, emphasis | `<em>silné sloveso</em>` |
| `<table>` | Conjugation tables, declensions, comparisons | Always use for verb forms! |
| `<ul>` / `<ol>` | Lists of rules, step-by-step | Use for enumerated rules |
| `<h4>` | Sub-sections within one grammar note | `<h4>Výnimky:</h4>` |
| `<div class="tip-box">` | Learning tips, mnemonics | 💡 Tip boxes |
| `<div class="warn-box">` | Common mistakes, exceptions | ⚠️ Warning boxes |

### Mandatory formatting patterns:
- **Every verb conjugation MUST use a `<table>`** with columns: Osoba / Tvar / Príklad
- **Every comparison (SK vs DE) MUST use a `<table>`** with columns: Slovensky / Nemecky / Doslova
- **Every "pozor" (warning) MUST use `<div class="warn-box">`** 
- **Every tip MUST use `<div class="tip-box">`**
- **Plain text blocks longer than 3 sentences MUST be broken into `<p>` elements**

### Example of well-formatted explanation:
```html
<p>Sloveso <strong>„sprechen"</strong> patrí medzi <em>silné slovesá</em> — mení kmeňovú samohlásku:</p>
<table><thead><tr><th>Osoba</th><th>Tvar</th><th>Príklad</th></tr></thead><tbody>
<tr><td>ich</td><td>sprech<strong>e</strong></td><td>Ich spreche Slowakisch.</td></tr>
<tr><td>du</td><td>spr<strong>i</strong>chst</td><td>Du sprichst Deutsch.</td></tr>
</tbody></table>
<div class="warn-box">⚠️ <strong>Pozor:</strong> Zmena e→i platí len pre du a er/sie/es!</div>
```

### Updated grammarNotes schema:
```js
grammarNotes: [    // REQUIRED. Array of 1–4 grammar note objects.
  {
    rule: string,              // REQUIRED. Short title of ONE grammar concept.
    explanation: string,       // REQUIRED. HTML-formatted explanation (see formatting rules above).
    examples: [                // REQUIRED. 3–5 examples per note.
      { de: string, sk: string, note?: string }
    ],
    slovakContrastNote: string, // REQUIRED. How this rule differs from Slovak.
  }
]
```
**The old `grammarNote` (singular) format is still supported by components but SHOULD NOT be used for new/updated lessons.**

---

## RULE 11 — BEFORE RUNNING ANY AUDIT

An audit is only complete if it reads ALL of the following:
- The lesson file being audited (100% — all lines)
- Every exercise component that processes that lesson's exercises
- The LessonView.jsx (to understand rendering pipeline)
- The GrammarGuide.jsx (reads grammarNote)
- The VocabTrainer.jsx (reads vocab)
- The Dashboard.jsx (reads lesson metadata)
- This INSTRUCTIONS.md and docs/APP_OVERVIEW.md

An audit that skips any of these is INCOMPLETE and will produce false findings or miss real issues.

---

## RULE 12 — BUILD VERIFICATION

After any edit to any JS/JSX file, run:
```powershell
cd C:\Users\USER\Documents\GERMAN && npm run build 2>&1 | Select-Object -Last 15
```
The build must show `✔ built in X.XXs`. The chunk size warning is pre-existing and can be ignored.

---

## RULE 13 — FILE STRUCTURE (ACTUAL, AS OF 2026-02-24)

```
C:\Users\USER\Documents\GERMAN\
  src/
    App.jsx                              ← Root. Manages activeView state + progress.
    data/
      curriculum.js                     ← Imports all 80 lessons. Exports LESSONS, WEEKLY_PLAN, A2_PREVIEW.
      lessons/
        L01.js … L80.js                 ← 80 individual lesson files. Named export: lessonNN.
      phrases.js                        ← Passive phase phrase data. Exports PHRASE_DAYS.
    components/
      Sidebar.jsx                       ← Navigation (desktop sidebar + mobile bottom bar).
      exercises/
        FlashcardExercise.jsx           ← Reads lesson.vocab directly.
        MCQExercise.jsx                 ← Reads exercise.questions. Shows explanation.
        FillExercise.jsx                ← Reads exercise.questions. Shows hint + explanation.
        ListenExercise.jsx              ← Reads exercise.questions. TTS only, no audio files.
        MatchExercise.jsx               ← Reads exercise.pairs.
        DialogueExercise.jsx            ← Reads exercise.turns. NEW — created 2026-02-24.
    views/
      Welcome.jsx                       ← Landing page. Shown when no progress. Entry point for new users.
      Dashboard.jsx                     ← Main stats + lesson list. Entry point for returning users.
      WeeklyPlan.jsx                    ← Week-by-week lesson navigator.
      LessonView.jsx                    ← Orchestrates grammar → exercises → results.
      VocabTrainer.jsx                  ← SRS flashcard trainer across ALL lessons.
      GrammarGuide.jsx                  ← Grammar reference, reads all grammarNote fields.
      PassivePhase.jsx                  ← Passive listening/writing phase. Uses phrases.js.
      MethodGuide.jsx                   ← Príručka. Methodology explainer + tools list + AI section.
      AIConversation.jsx                ← 5-character GPT-4o-mini conversation partner.
    components/
      APIKeyModal.jsx                   ← OpenAI API key input. Stores to localStorage('openai_api_key').
      exercises/
        WritingChecker.jsx              ← AI-powered writing correction. Used in LessonView for type:'writing'.
    hooks/
      useProgress.js                    ← localStorage progress system.
      useTTS.js                         ← Web Speech API TTS hook. Strips phonetic annotations before speaking.
      useAI.js                          ← GPT-4o-mini hook. checkWriting() + sendConversationMessage().
    utils/
      genderColors.jsx                  ← Gender color system (Berliner Methode). Exports GenderText, GenderWord, GenderLegend.
      text.js                           ← normalizeGerman() for accent-tolerant comparison.
  docs/
    APP_OVERVIEW.md                     ← Human-readable full app documentation.
    AI_ROLE.md
    CURRICULUM.md
    TEACHING_METHODOLOGY.md
    VOCAB_TRACKER.md
  INSTRUCTIONS.md                       ← THIS FILE. Read before any edit.
  package.json
  vite.config.js
  tailwind.config.js
  index.html
```

---

## CHECKLIST — BEFORE SUBMITTING ANY EDIT

- [ ] Read this INSTRUCTIONS.md in full
- [ ] Read every file I plan to edit
- [ ] **RULE 1B INTERCONNECTION AUDIT completed** — all affected entry points checked (Sidebar, Welcome, Dashboard, MethodGuide, App.jsx, LessonView, lesson files)
- [ ] Every new vocab entry has all 8 required fields (de, sk, gender, srsId, example, exampleSk, recycledFrom, and correct structure)
- [ ] **Every noun in vocab has correct `gender` field** (M/F/N) — drives the color-coding system (RULE 10B)
- [ ] **Noun `de` field includes article**: 'der Name', 'die Frau', 'das Land'
- [ ] No `exercise.items` array in flashcard exercises
- [ ] MCQ `answer` is a 0-based INTEGER index
- [ ] All `explanation` fields in MCQ, Fill, WordOrder are non-empty strings
- [ ] `grammarNote.explanation` is a full paragraph
- [ ] **Grammar uses `grammarNotes` (array)** — one topic per entry, HTML-formatted (RULE 18)
- [ ] **Grammar explanation uses `<table>` for conjugations**, `<div class="tip-box">` for tips, `<div class="warn-box">` for warnings (RULE 18)
- [ ] No Perfekt/Präteritum in L01–L10 example sentences
- [ ] All German text uses straight single quotes, not smart quotes
- [ ] Lesson has all 13 required exercise types: flashcard, match, wordorder, fill, listen, mcq, minitext, speaking, conjugation, truefalse, dictation, categorysort, translation
- [ ] `wordorder.sentences[]` targets THIS lesson's grammarNote.rule (not random vocab)
- [ ] `minitext.text` is max 80 words, A1 grammar level, uses lesson vocabulary
- [ ] `minitext.questions[].answer` is a 0-based integer index
- [ ] `speaking.phrases[]` have de + sk + tip fields (tip ≤60 chars)
- [ ] **MCQ and MiniText `question` fields are in GERMAN** (RULE 15)
- [ ] **MCQ and MiniText have `questionSk` field** with Slovak translation (RULE 15)
- [ ] **MCQ and MiniText `options` are in GERMAN** (RULE 15)
- [ ] **No exercise sentence recycling** — each sentence appears in at most 1 exercise (RULE 14)
- [ ] **Exercise set covers all vocab items** from the lesson (RULE 14)
- [ ] **Minitext continues Jana's story** — references prior episodes if applicable (RULE 16)
- [ ] **Exercise counts meet RULE 17 minimums** (match≥8, fill≥6, mcq≥6, minitext≥4, speaking≥6)
- [ ] **No vague questions** — every question asks a SPECIFIC fact from the text (RULE 17)
- [ ] **Exercises use real-world phrases**, not just isolated words (RULE 17)
- [ ] **Explanations quote the text** — format: `'Im Text: "..."'` (RULE 17)
- [ ] Build passes after edit
