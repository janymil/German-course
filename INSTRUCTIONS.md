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
  - L11–L40 (A1 mid): Präsens + modal verbs + imperative only.
  - L41–L60 (A1 late): Präsens + Perfekt allowed.
  - L61–L80 (A1 exam): All A1 grammar allowed.
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
| 9 | `writing` | AI writing correction (optional) | WritingChecker |
| — | `dialogue` | Interactive dialogue (L50+) | DialogueExercise |

**CRITICAL:** Exercises 1–8 are REQUIRED in every lesson. `writing` is optional. `dialogue` replaces or supplements `speaking` from L50+.

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
      question: string,
      options: string[],           // Exactly 4 options.
      answer: number,              // 0-BASED index of the correct option. NOT the text, the INDEX.
      explanation: string,         // REQUIRED. Rendered below the correct/wrong feedback in MCQExercise.jsx.
    }
  ]  // 4–8 questions per lesson. Mix of grammar AND vocabulary questions.
}
```
**CRITICAL: `answer` is a 0-based integer index. answer:0 = first option, answer:1 = second, etc. Never put the text of the answer in this field.**

### minitext exercise schema:
```js
{
  type: 'minitext',
  instruction: string,
  text: string,            // REQUIRED. Short German narrative text (max 80 words). A1 grammar level only. Uses lesson vocabulary.
  textSk: string,          // REQUIRED. Slovak translation (collapsible in UI — shown on demand).
  questions: [
    {
      question: string,    // German comprehension question about the text.
      options: string[],   // Exactly 4 options.
      answer: number,      // 0-BASED index.
      explanation: string, // Quote from text explaining the answer.
    }
  ]  // 3–5 comprehension questions.
}
```
**Text grammar constraint: same as RULE 2 vocab examples — use only grammar structures appropriate for the lesson's CEFR stage.**

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
- Fields accessed: `q.question`, `q.options[]`, `q.answer` (0-based index), `q.explanation`
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
- Questions: `q.question`, `q.options[]`, `q.answer` (0-based), `q.explanation`
- Phase 1: student reads text (can play TTS, toggle Slovak translation), clicks "Odpovedať na otázky"
- Phase 2: standard MCQ on the text content
- **Text must be max 80 words, A1 grammar level, use vocabulary from the lesson**

### SpeakingExercise.jsx
- Reads from: `exercise.phrases[]`
- Fields accessed: `phrase.de`, `phrase.sk`, `phrase.tip`
- `phrase.de` IS spoken via TTS on demand
- `phrase.sk` IS displayed as translation
- `phrase.tip` IS displayed as pronunciation hint
- Self-assessment: student clicks "Zvládol som" (true) or "Treba zopakovať" (false)
- Score: percentage of phrases marked as zvládol
- **No speech recognition API required — purely self-assessed**

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
| Exercise type strings | 'flashcard','mcq','fill','listen','match','dialogue' — exact lowercase strings |
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
- [ ] No `exercise.items` array in flashcard exercises
- [ ] MCQ `answer` is a 0-based INTEGER index
- [ ] All `explanation` fields in MCQ, Fill, WordOrder are non-empty strings
- [ ] `grammarNote.explanation` is a full paragraph
- [ ] No Perfekt/Präteritum in L01–L10 example sentences
- [ ] All German text uses straight single quotes, not smart quotes
- [ ] Lesson has all 8 required exercise types: flashcard, match, wordorder, fill, listen, mcq, minitext, speaking
- [ ] `wordorder.sentences[]` targets THIS lesson's grammarNote.rule (not random vocab)
- [ ] `minitext.text` is max 80 words, A1 grammar level, uses lesson vocabulary
- [ ] `minitext.questions[].answer` is a 0-based integer index
- [ ] `speaking.phrases[]` have de + sk + tip fields (tip ≤60 chars)
- [ ] Build passes after edit
