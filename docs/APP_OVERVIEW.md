# German Learning App — Complete Technical Overview

> **Last updated:** 2026-02-24
> **Status:** Production-ready, L01–L80 complete, build ✔ 1,568 modules
> For editing rules and data schemas, read `INSTRUCTIONS.md` first.

---

## 1. Vision and Target User

A complete, Goethe-Institut A1-aligned German language learning app for Slovak native speakers. Built specifically for the procrastinator profile — lessons are capped at 30 min, progress is visible at all times, and every lesson ends with a real communicative payoff.

| Attribute | Value |
|---|---|
| Target language | German (Deutsch) |
| Base language | Slovak (Slovenčina) |
| Curriculum standard | Goethe-Zertifikat A1 / Start Deutsch 1 |
| Learning narrative | Jana Nováková, 28, Bratislava → Vienna |
| Total lessons | 80 |
| Total weeks | 16 (5 lessons/week) |
| Estimated learning time | ~75–80 hours (lessons + SRS + reviews) |

---

## 2. Technology Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| Icons | Lucide React |
| Audio | Web Speech API (TTS — no audio files) |
| Storage | localStorage (`german_progress_v2`) |
| Language | JavaScript (JSX) — no TypeScript |

---

## 3. Full File Structure

```
C:\Users\USER\Documents\GERMAN\
│
├── INSTRUCTIONS.md              ← AGENT SPEC: Read before any edit. Schemas, rules, checklists.
│
├── src/
│   ├── App.jsx                  ← Root component. Manages activeView + progress.
│   │
│   ├── data/
│   │   ├── curriculum.js        ← Imports all 80 lessons. Exports LESSONS, WEEKLY_PLAN, A2_PREVIEW.
│   │   ├── phrases.js           ← PassivePhase data. Exports PHRASE_DAYS[].
│   │   └── lessons/
│   │       ├── L01.js           ← export const lesson01 = { ... }
│   │       └── ... L80.js
│   │
│   ├── components/
│   │   ├── Sidebar.jsx          ← Navigation bar (desktop sidebar + mobile bottom nav).
│   │   └── exercises/
│   │       ├── FlashcardExercise.jsx  ← reads lesson.vocab[]
│   │       ├── MCQExercise.jsx        ← reads exercise.questions[]
│   │       ├── FillExercise.jsx       ← reads exercise.questions[]
│   │       ├── ListenExercise.jsx     ← reads exercise.questions[]
│   │       ├── MatchExercise.jsx      ← reads exercise.pairs[]
│   │       └── DialogueExercise.jsx   ← reads exercise.turns[] (created 2026-02-24)
│   │
│   ├── views/
│   │   ├── Dashboard.jsx        ← Stats, weekly activity, next lesson CTA, full course outline.
│   │   ├── WeeklyPlan.jsx       ← 16-week accordion navigator.
│   │   ├── LessonView.jsx       ← Grammar intro → Exercises → Results.
│   │   ├── VocabTrainer.jsx     ← SRS flashcard deck from ALL 80 lessons.
│   │   ├── GrammarGuide.jsx     ← Grammar reference from all 80 grammarNotes.
│   │   ├── PassivePhase.jsx     ← Passive listening/dictation. Uses phrases.js only.
│   │   └── MethodGuide.jsx      ← Static methodology explainer. No data deps.
│   │
│   └── hooks/
│       ├── useProgress.js       ← localStorage progress. Key: german_progress_v2.
│       └── useTTS.js            ← Web Speech API TTS wrapper.
│
├── docs/
│   ├── APP_OVERVIEW.md          ← This file.
│   ├── AI_ROLE.md
│   ├── CURRICULUM.md
│   ├── TEACHING_METHODOLOGY.md
│   └── VOCAB_TRACKER.md
│
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

---

## 4. Data Flow Architecture

```
curriculum.js
  └── LESSONS[] (80 lesson objects)
        ├── Dashboard.jsx     reads: id, title, topic, week, xpReward, vocab.length
        ├── WeeklyPlan.jsx    reads: id, title, xpReward, week
        ├── GrammarGuide.jsx  reads: grammarNote.rule, .explanation, .examples[], vocab[]
        ├── VocabTrainer.jsx  reads: vocab[].de, .sk, .example  (ALL 80 lessons)
        └── LessonView.jsx    reads: full lesson object
              └── Exercises
                    ├── FlashcardExercise → reads lesson.vocab[]
                    ├── MCQExercise       → reads exercise.questions[]
                    ├── FillExercise      → reads exercise.questions[]
                    ├── ListenExercise    → reads exercise.questions[]
                    ├── MatchExercise     → reads exercise.pairs[]
                    └── DialogueExercise  → reads exercise.turns[]

curriculum.js
  └── WEEKLY_PLAN[] (16 week objects)
        ├── Dashboard.jsx    reads: week, title, theme, lessons[], tips
        └── WeeklyPlan.jsx   reads: week, title, theme, lessons[], tips

phrases.js
  └── PHRASE_DAYS[]
        └── PassivePhase.jsx   reads phrase data only

useProgress.js (localStorage: german_progress_v2)
  └── progress object
        ├── Dashboard.jsx    reads: xp, streak, completedLessons, vocabSeen, dailyXP
        ├── WeeklyPlan.jsx   reads: completedLessons
        ├── LessonView.jsx   reads: progress (passed through)
        └── VocabTrainer.jsx reads: vocabSeen
```

---

## 5. App.jsx — Root Component

**State:**
- `activeView: string` — current view. Values: `'dashboard' | 'weekly' | 'lesson' | 'vocab' | 'grammar' | 'passive' | 'guide'`
- `selectedLessonId: number|null`

**Hooks:** `useProgress` → `{ progress, completeLesson, markVocabSeen }`

**Key functions:**
| Function | Behaviour |
|---|---|
| `handleStartLesson(id)` | Sets selectedLessonId, switches to 'lesson' view |
| `handleCompleteLesson(id, avgScore, xpReward)` | Calls completeLesson(), clears lesson, returns to 'dashboard' |
| `handleBack()` | Clears lesson, goes to 'weekly' |

**Sidebar** is hidden when `activeView === 'lesson'`.

---

## 6. Views — Complete Reference

### Dashboard.jsx
- **Props:** `progress`, `onStartLesson(id)`, `onNavigate(viewId)`
- **Shows:** Streak, XP, lessons count, mastered vocab stats; XP level bar; weekly activity chart (last 7 days from `progress.dailyXP`); next lesson CTA; 16-week course outline with lesson buttons; A2 preview teaser
- **Level formula:** `Math.floor(xp / 100) + 1`

### WeeklyPlan.jsx
- **Props:** `progress`, `onStartLesson(id)`
- **Shows:** Accordion of 16 weeks, each expandable to 5 lesson buttons
- **Status:** done (all completed) / active (some) / locked (none)

### LessonView.jsx
- **Props:** `lesson`, `progress`, `onComplete(id, avgScore, xpReward)`, `onBack()`
- **Internal phases:** `grammar` → `exercises` → `results`
- **GrammarCard** reads: `grammarNote.rule`, `grammarNote.explanation`, `grammarNote.examples[]`, `vocab[0..4]`
- **Each example** is a TTS-clickable button speaking `ex.de`
- **ResultsScreen:** per-exercise score bars, XP calc: `Math.round((avgScore/100) * lesson.xpReward)`
- **Exercise dispatch:** flashcard → mcq → fill → listen → match → dialogue
- **Exercise labels SK:** `['Kartičky', 'Výber odpovede', 'Doplňovanie', 'Počúvanie', 'Spájanie']`

### VocabTrainer.jsx
- **Props:** `progress`, `onMarkVocab(word, mastered)`
- **Reads:** ALL vocab from ALL 80 lessons — `LESSONS.flatMap(l => l.vocab.map(v => ({...v, lessonId, lessonTitle})))`
- **Deck priority:** unseen → not-mastered → up to 5 mastered (shuffled)
- **Fields used:** `vocab.de`, `vocab.sk`, `vocab.example` (conditional)
- **Fields NOT used:** `exampleSk`, `gender`, `srsId`, `recycledFrom`
- **Card front:** `vocab.de` + TTS fires on flip
- **Card back:** `vocab.de`, TTS button, `vocab.sk`, `vocab.example` (clickable TTS)
- **Mastery key:** `progress.vocabSeen[vocab.de].mastered`
- **Total count:** computed live from `LESSONS.reduce((s,l) => s + l.vocab.length, 0)`

### GrammarGuide.jsx
- **Props:** none
- **Reads:** ALL lessons via `LESSONS` directly
- **Shows:** Searchable accordion grouped by week
- **Fields used per lesson:** `lesson.week`, `lesson.title`, `lesson.id`, `grammarNote.rule`, `grammarNote.explanation`, `grammarNote.examples[]`, `lesson.vocab[]`
- **⚠️ CRITICAL:** `grammarNote.explanation` empty → blank panel. Always required.
- **Search:** matches `grammarNote.rule`, `grammarNote.explanation`, `lesson.title`
- **TTS:** speaks each `example.de` on click

### PassivePhase.jsx
- **Props:** none
- **Data source:** `src/data/phrases.js` only (NOT lesson files)
- **Phases:** Phase 1 = listen only; Phase 2 = listen + type (dictation)
- **LCS diff:** highlights correct/wrong/missing words in typed answer

### MethodGuide.jsx
- **Props:** none
- **Data:** 100% static JSX — no data dependencies whatsoever

---

## 7. Exercise Components — Complete Reference

### FlashcardExercise.jsx
- **Props:** `exercise` (ignored for data — NEVER has items array), `lesson`, `onComplete(score)`
- **Data source:** `lesson.vocab[]` — fields: `de`, `sk`, `example`
- **Scores:** always calls `onComplete(100)` when all cards seen
- **⚠️ CRITICAL:** Does NOT read `exercise.items`. Do not write items array in flashcard exercises.

### MCQExercise.jsx
- **Props:** `exercise`, `onComplete(score)`
- **Data:** `exercise.questions[]` → `q.question`, `q.options[4]`, `q.answer` (0-based int), `q.explanation`
- **`q.explanation` IS rendered** — italic gray text after feedback
- **TTS:** speaks `q.options[q.answer]` after selection

### FillExercise.jsx
- **Props:** `exercise`, `onComplete(score)`
- **Data:** `exercise.questions[]` → `q.sentence` (with `___`), `q.answer`, `q.hint`, `q.explanation`
- **`q.explanation` IS rendered** — after both correct and incorrect answers
- **`q.hint` IS rendered** — lightbulb button, and on wrong answer
- **TTS:** speaks full sentence with answer filled in after check

### ListenExercise.jsx
- **Props:** `exercise`, `onComplete(score)`
- **Data:** `exercise.questions[]` → `q.de`, `q.sk`
- **Audio:** TTS at 0.75x. No audio files.
- **Normalization:** ä→ae, ö→oe, ü→ue, ß→ss (ASCII variants accepted)
- **Field name:** `questions` (NOT `pairs`)

### MatchExercise.jsx
- **Props:** `exercise`, `onComplete(score)`
- **Data:** `exercise.pairs[]` → `pair[0]` (German), `pair[1]` (Slovak)
- **Score:** `Math.max(0, Math.round(100 - (attempts - pairs.length) * 10))`
- **TTS:** speaks `pair[0]` on correct match
- **Field name:** `pairs` (NOT `questions`)

### DialogueExercise.jsx
- **Props:** `exercise`, `lesson`, `onComplete(score)`
- **Data:** `exercise.turns[]` → `turn.speaker`, `turn.de`, `turn.sk`, `turn.playerTurn`, `turn.options[]`
- **Player turns:** shows options, tracks correct selections
- **Score:** % of correct player-turn choices

---

## 8. Hooks

### useProgress.js
- **Storage key:** `german_progress_v2`
- **State:** `{ xp, streak, lastStudyDate, completedLessons, vocabSeen, dailyXP }`
- **`completeLesson(id, score, xpReward)`:** earnedXP = `Math.round(xpReward * score/100)`, updates streak, dailyXP (30-day rolling)
- **`markVocabSeen(word, mastered)`:** increments seenCount, mastered is sticky (once true stays true)

### useTTS.js
- **API:** `const { speak, stop, speaking } = useTTS()`
- **`speak(text, lang='de-DE', rate=0.85)`** — cancels existing, prefers non-Google German voice
- **Used by:** LessonView, all 6 exercise components, VocabTrainer, GrammarGuide, PassivePhase

---

## 9. Lesson Data Schema Summary

> Full schemas with all required/optional fields in `INSTRUCTIONS.md` Rules 2–4.

**Vocab entry (21 fields across 8 keys):** `de`, `sk`, `gender`, `srsId`, `example`, `exampleSk`, `recycledFrom` — ALL required.

**Grammar note:** `rule`, `explanation`, `examples[]`, `slovakContrastNote` — ALL required. `explanation` feeds GrammarGuide directly.

**Exercise types and their data field names:**
| Type | Main data field | Key consumed fields |
|---|---|---|
| flashcard | *(reads lesson.vocab)* | *(no exercise data field)* |
| mcq | `questions[]` | question, options[4], answer (int), explanation |
| fill | `questions[]` | sentence, answer, hint, explanation |
| listen | `questions[]` | de, sk |
| match | `pairs[]` | [0] German, [1] Slovak |
| dialogue | `turns[]` | speaker, de, sk, playerTurn, options[] |

---

## 10. Known Limitations (2026-02-24)

| Limitation | Notes |
|---|---|
| No backend/sync | All progress in localStorage — clearing browser wipes progress |
| Web Speech API variation | Voice quality differs by browser/OS; Chrome on Windows recommended |
| No true SRS algorithm | VocabTrainer uses "unseen first" priority, not Leitner/FSRS scheduling |
| No FreeWrite/MiniText components | Planned but not yet built |
| DialogueExercise | Component exists; L50–L80 lesson files may not yet have dialogue exercise objects |
| Bundle size | 1.3MB JS (pre-existing warning, not a bug) |

---

## 11. Goethe A1 Exam Alignment

| Exam Part | Points | App Coverage |
|---|---|---|
| Hören (Listening) | 25 | ListenExercise, DialogueExercise, PassivePhase TTS |
| Lesen (Reading) | 25 | MCQExercise, FillExercise texts |
| Schreiben (Writing) | 25 | FillExercise, (FreeWrite planned) |
| Sprechen (Speaking) | 25 | DialogueExercise, pronunciation in FlashcardExercise |

Pass mark: 60/100 total, minimum 60% per skill.
