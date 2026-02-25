# Phase 1 — Curriculum Architecture

## Goal
Define the complete structural foundation of the course before writing any lesson content or code.

## Status: IN PROGRESS

---

## Deliverables

- [x] Define total lesson count (80 lessons)
- [x] Define time scope (~77 hours total)
- [x] Map all 80 lessons with title, grammar, vocabulary field (CURRICULUM.md)
- [x] Define grammar introduction order + recycling schedule
- [x] Define vocabulary targets (700 passive, 400 active)
- [x] Define narrative character (Jana, Bratislava → Vienna)
- [x] Define communicative milestones per 10 lessons
- [ ] Define exact Goethe A1 vocabulary list (700 words) in a spreadsheet/data file
- [ ] Create `src/data/vocabulary_master.js` — full A1 word list with SRS metadata
- [ ] Validate lesson map against official Goethe A1 thematic requirements
- [ ] Define lesson data structure (JS object schema for all 80 lessons)

---

## Lesson Data Structure (JS Schema)

Every lesson in `src/data/lessons/` must follow this schema exactly:

```javascript
{
  id: Number,              // 1–80
  week: Number,            // 1–16
  day: Number,             // 1–5 (5 lessons per week)
  title: String,           // e.g. "Das Alphabet und Aussprache"
  topic: String,           // e.g. "Alphabet a výslovnosť"
  cefr: "A1",
  xpReward: Number,        // 20–100 (harder/longer lessons = more XP)
  narrativeContext: String, // 1–2 sentences about Jana's story at this point
  communicativeGoal: String, // "After this lesson I can..."
  skillFocus: [String],    // ["vocabulary","grammar","listening","reading","writing"]

  grammarNote: {
    rule: String,
    explanation: String,   // always in Slovak
    examples: [
      { de: String, sk: String }
    ],
    slovakContrastNote: String  // how this differs from Slovak
  },

  vocab: [
    {
      de: String,
      sk: String,
      example: String,     // example sentence in German
      exampleSk: String,   // Slovak translation of example
      gender: String,      // "M" / "F" / "N" / null (for non-nouns)
      srsId: String,       // unique ID for SRS tracking e.g. "L01_V01"
      recycledFrom: [Number] // list of lesson IDs where this word first appeared
    }
  ],

  exercises: [
    // flashcard — always first
    {
      type: "flashcard",
      instruction: String,
      items: [String]
    },
    // mcq
    {
      type: "mcq",
      instruction: String,
      questions: [
        {
          question: String,
          options: [String],
          answer: Number,  // 0-based index
          explanation: String  // why this answer is correct (in Slovak)
        }
      ]
    },
    // fill
    {
      type: "fill",
      instruction: String,
      questions: [
        {
          sentence: String,
          answer: String,
          hint: String,
          explanation: String
        }
      ]
    },
    // listen
    {
      type: "listen",
      instruction: String,
      questions: [
        { de: String, sk: String }
      ]
    },
    // match
    {
      type: "match",
      instruction: String,
      pairs: [[String, String]]
    },
    // dialogue (from L10 onwards)
    {
      type: "dialogue",
      instruction: String,
      lines: [
        { speaker: "A" | "B", de: String, sk: String }
      ],
      comprehensionQuestions: [
        { question: String, options: [String], answer: Number }
      ]
    },
    // minitext (reading, from L20 onwards)
    {
      type: "minitext",
      instruction: String,
      text: String,        // German text
      textSk: String,      // Slovak translation
      questions: [
        { question: String, options: [String], answer: Number }
      ]
    },
    // freewrite (from L30 onwards)
    {
      type: "freewrite",
      instruction: String,
      prompt: String,      // writing prompt in Slovak
      minWords: Number,
      exampleAnswer: String  // shown after submission
    }
  ],

  reviewWords: [String],   // srsIds of vocabulary from previous lessons recycled here
  lessonNotes: String      // teacher notes for this lesson (internal use)
}
```

---

## Decisions Made

| Decision | Rationale |
|---|---|
| 80 lessons not 50 | ~77 hours needed for Goethe A1. 50 × 25min = only 21 hours. |
| 5 lessons/week | Matches Duolingo-style habit but leaves weekends free |
| Narrative character Jana | Creates emotional investment, ensures vocabulary is contextual |
| Slovak contrastive notes in every grammar point | Slovak speakers have specific errors that need direct addressing |
| Goethe A1 word list as data file | SRS system needs the full word list to schedule reviews correctly |

---

## Next Steps After Phase 1
→ Move to Phase 2: App Architecture (adding new exercise types to the codebase)
