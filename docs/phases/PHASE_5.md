# Phase 5 — Listening Component

## Goal
Implement proper listening exercises beyond single-word dictation. Every lesson has meaningful listening practice. From L10: mini-dialogues. From L20: longer audio scenarios.

## Status: NOT STARTED

## Depends on: Phase 2 (Listen component updated), Phase 3 (L01–L20 content written)

---

## Current Limitation
The existing listen exercise is: hear a word/phrase → type what you heard.
This is dictation, not listening comprehension.

True A1 listening requires:
- Hearing connected speech at natural pace
- Understanding gist and specific details
- Recognising numbers, names, times in context
- Following simple dialogues

---

## Listening Exercise Types

### Type 1: Dictation (existing — keep for vocabulary)
- Hear word → type it
- Used for new vocabulary in flashcard phase
- Keep in all lessons as vocabulary reinforcement

### Type 2: Sentence Listen (enhanced)
- Hear full sentence → type or choose meaning
- Available from L01

### Type 3: Dialogue Listen (new from L10)
- Hear a 4–6 line dialogue → answer comprehension questions
- Questions ask about: Who? Where? What? When?
- Dialogue text shown AFTER answering (not before)

### Type 4: Announcement Listen (new from L30)
- Hear a short announcement (transport, shop, weather)
- Extract specific information (departure time, gate, price)

### Type 5: Goethe Exam Simulation (from L70)
- Exact format of Goethe A1 Hören exam
- 3 parts, multiple items each

---

## Goethe A1 Listening Exam Format

The Hören section has 3 parts:
1. **Teil 1** — Hear 4 short conversations. Answer 4 yes/no questions. (4 questions)
2. **Teil 2** — Hear 1 longer conversation. Answer 4 questions (MCQ). (4 questions)  
3. **Teil 3** — Hear 5 short announcements (names, numbers, times). Write answers. (5 questions)

Total: 13 questions → 25 points

---

## Audio Implementation

### Text-to-Speech (TTS)
- Use Web Speech API (SpeechSynthesis) with `lang: 'de-DE'`
- Voice: prefer female German voice (more common in language learning)
- Speed: 0.85× for A1 learners (slightly slower than native)
- Speed option: learner can choose 0.7× / 0.85× / 1.0×

### Future: Real Audio
- Phase 5 starts with TTS
- In a later update: replace key dialogues with professionally recorded audio
- Jana's character voice should be consistent across all lessons

---

## Dialogue Bank

All lesson dialogues are stored in `src/data/dialogues/` with this structure:

```javascript
{
  id: "D10_01",
  lesson: 10,
  context: "Im Café — Jana bestellt einen Kaffee",
  contextSk: "V kaviarni — Jana si objednáva kávu",
  speakers: ["Jana", "Kellner"],
  lines: [
    { speaker: "Kellner", de: "Guten Tag! Was möchten Sie?", sk: "Dobrý deň! Čo si dáte?" },
    { speaker: "Jana", de: "Ich möchte einen Kaffee, bitte.", sk: "Prosím si kávu." },
    { speaker: "Kellner", de: "Groß oder klein?", sk: "Veľkú alebo malú?" },
    { speaker: "Jana", de: "Klein, bitte. Und was kostet das?", sk: "Malú, prosím. A koľko to stojí?" },
    { speaker: "Kellner", de: "Das macht zwei Euro fünfzig.", sk: "To stojí dve eurá päťdesiat." }
  ],
  comprehensionQuestions: [
    { question: "Čo si Jana objednala?", options: ["Čaj","Kávu","Vodu","Džús"], answer: 1 },
    { question: "Koľko zaplatila?", options: ["1,50 €","2,00 €","2,50 €","3,00 €"], answer: 2 }
  ]
}
```

---

## Deliverables

### Components
- [ ] Update `src/components/exercises/ListenExercise.jsx` — add dialogue mode
- [ ] `src/components/exercises/DialogueExercise.jsx` — plays dialogue with comprehension questions
- [ ] `src/components/AudioPlayer.jsx` — reusable play/pause/speed control component

### Data
- [ ] `src/data/dialogues/` — folder with one file per dialogue (D10_01.js through D80_xx.js)
- [ ] Minimum 1 dialogue per lesson from L10 onwards (70 dialogues total)

### Lesson Updates
- [ ] L10–L80: Add dialogue exercises using DialogueExercise component
- [ ] L30–L80: Add announcement listening exercises
- [ ] L70–L80: Add Goethe exam simulation listening exercises

---

## Austrian German Note

Since Jana is moving to Vienna, include Austrian variants in listening:
- "Grüß Gott" (not just "Hallo")
- "Bitte" as thank-you response (same as in Slovak "prosím")
- "Servus" (informal greeting in Austria)
- "das Paradeiser" (= die Tomate in Germany)
- These will be flagged with 🇦🇹 marker in the lesson

---

## Next Steps After Phase 5
→ Move to Phase 6: Writing Component + AI Integration
