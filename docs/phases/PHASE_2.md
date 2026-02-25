# Phase 2 — App Architecture

## Goal
Extend the React app to support all exercise types, the narrative system, SRS, and AI hooks — before any lesson content is written.

## Status: NOT STARTED

## Depends on: Phase 1 complete

---

## Deliverables

### New Exercise Components
- [ ] `src/components/exercises/DialogueExercise.jsx` — conversation display + comprehension questions
- [ ] `src/components/exercises/MiniTextExercise.jsx` — short reading text + questions
- [ ] `src/components/exercises/FreeWriteExercise.jsx` — text input + AI correction hook
- [ ] `src/components/exercises/PronunciationExercise.jsx` — Web Speech API recording
- [ ] Update `src/components/exercises/` index to export all exercise types

### Navigation & Views
- [ ] `src/views/HomeView.jsx` — streak display, SRS due count, lesson progress
- [ ] `src/views/LessonView.jsx` — update to handle all exercise types
- [ ] `src/views/ReviewView.jsx` — SRS review session
- [ ] `src/views/ProgressView.jsx` — per-skill progress, vocabulary mastered count
- [ ] `src/views/MockTestView.jsx` — exam simulation view

### Hooks
- [ ] `src/hooks/useProgress.js` — lesson completion state, per-skill tracking
- [ ] `src/hooks/useSRS.js` — spaced repetition scheduling algorithm
- [ ] `src/hooks/useStreak.js` — daily streak tracking + recovery
- [ ] `src/hooks/useAI.js` — hook for AI writing coach + dialogue mode

### Data Layer
- [ ] `src/data/vocabulary_master.js` — all 700 A1 words with srsId, gender, lesson origin
- [ ] `src/data/srs_schedule.js` — SRS interval constants
- [ ] Update `src/data/curriculum.js` — import all 16 week files

### Narrative System
- [ ] `src/data/narrative.js` — Jana's story segments keyed to lesson ID (L01–L80)
- [ ] `src/components/NarrativeCard.jsx` — displays Jana's context before each lesson

### AI Integration (stub)
- [ ] `src/services/aiService.js` — API wrapper (stub for now, real in Phase 6)
- [ ] Stub returns mock responses so UI can be built without live AI

---

## Architecture Diagram

```
App
├── HomeView
│   ├── StreakDisplay
│   ├── SRSReviewButton (shows due count)
│   ├── LessonProgress (80-lesson grid)
│   └── NarrativeCard (Jana's current status)
├── LessonView
│   ├── NarrativeCard (lesson context)
│   ├── GrammarNote
│   ├── ExerciseRouter → [Flashcard | MCQ | Fill | Listen | Match | Dialogue | MiniText | FreeWrite]
│   └── LessonComplete (XP reward, communicative goal achieved)
├── ReviewView (SRS)
│   └── SRSCard (one word at a time, spaced intervals)
├── ProgressView
│   ├── SkillRadarChart (Vocabulary/Grammar/Reading/Listening/Writing/Speaking)
│   ├── VocabularyMastered (count + list)
│   └── WeeklyActivityChart
└── MockTestView
    ├── HörenTest
    ├── LesenTest
    ├── SchreibenTest
    └── SprechenTest (AI-graded)
```

---

## SRS Algorithm (useSRS hook)

```
Initial interval: 1 day
Correct → multiply interval by 2.5
Wrong → reset to 1 day
Maximum interval: 30 days (for A1 learner)

Ease factor starts at 2.5
Correct (easy): ease factor unchanged
Correct (hard): ease factor -0.15
Wrong: ease factor -0.20, minimum 1.3
```

This is a simplified SM-2 algorithm appropriate for A1 vocabulary volume.

---

## Decisions Made

| Decision | Rationale |
|---|---|
| Exercise types added incrementally per unit | Prevents overwhelming learner early |
| Dialogue from L10 | Learners need basic vocab before dialogue is useful |
| MiniText from L20 | Reading authentic texts requires ~200 word vocabulary |
| FreeWrite from L30 | Writing needs grammar foundation (cases, articles) |
| AI stub first | UI must work offline; AI is enhancement not dependency |
| SRS Review separate from lessons | Two distinct modes: learning (lesson) + maintenance (SRS) |

---

## Next Steps After Phase 2
→ Move to Phase 3: Content Rewrite (lesson by lesson, L01–L20 first)
