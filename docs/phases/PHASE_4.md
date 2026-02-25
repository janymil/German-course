# Phase 4 — Reading Component

## Goal
Add authentic reading exercises to lessons L20–L80. Every lesson from L20 has at least one MiniText (short authentic German text) with comprehension questions.

## Status: NOT STARTED

## Depends on: Phase 2 (MiniText component built), Phase 3 (L01–L20 content written)

---

## What is a MiniText?

A MiniText is a short (30–100 word) authentic-style German text appropriate to the learner's level.
- At L20: 30 words, very simple
- At L40: 50 words, simple
- At L60: 80 words, A1 ceiling
- At L70–L80: 100 words, Goethe exam simulation texts

Types of authentic texts used at A1:
1. **Signs** (Öffnungszeiten, Hinweise) — L20–L30
2. **SMS/Chat messages** — L25–L40
3. **Menus** — L30–L40
4. **Simple forms** (name/address/phone) — L35–L45
5. **Short emails** — L40–L55
6. **Newspaper headlines** — L50–L60
7. **Job ads** — L55–L65
8. **Apartment ads** — L58–L65
9. **Goethe exam reading texts** — L65–L80

---

## Reading Strategy Skills Taught

| Strategy | Introduced | Lessons |
|---|---|---|
| Skimming (overall meaning) | L20 | L20–L80 |
| Scanning (find specific info) | L25 | L25–L80 |
| Keyword recognition | L30 | L30–L80 |
| Context guessing (unknown words) | L35 | L35–L80 |
| Form reading (structured info) | L40 | L40–L80 |
| Exam reading technique (Goethe format) | L65 | L65–L80 |

---

## Goethe A1 Reading Exam Format

The Lesen section has 3 parts:
1. **Teil 1** — Read 5 short notices/signs. Match to 5 statements. (5 questions)
2. **Teil 2** — Read a short text. Answer 5 True/False questions. (5 questions)
3. **Teil 3** — Read a form/table. Answer 5 questions about the information. (5 questions)

Total: 15 questions → 25 points

All mock test reading exercises in L71 replicate this exact format.

---

## Deliverables

### Component
- [ ] `src/components/exercises/MiniTextExercise.jsx`
  - Displays text with line-by-line reveal option (helps slow readers)
  - Unknown words can be tapped → shows Slovak translation
  - After reading: comprehension questions (MCQ format)
  - Progress: "Text čítaný: 1/5 lekcií"

### Lesson Content Updates
- [ ] L20: First MiniText — simple SMS between two people
- [ ] L25: Sign at a shop (Öffnungszeiten)
- [ ] L30: Short menu (Café)
- [ ] L35: Simple form (name, address)
- [ ] L40: Short email (Jana to a colleague)
- [ ] L45: Job ad (simple)
- [ ] L50: Short news item
- [ ] L55: Longer email
- [ ] L60: Apartment ad
- [ ] L65–L79: Mock exam reading texts (3 per mock test session)

---

## Text Authenticity Standard

All texts must:
- Use only A1-level vocabulary (or flag unknown words with tap-to-translate)
- Reflect realistic German-speaking contexts (Austria and Germany both)
- Include Austrian German variations where relevant (e.g. "Grüß Gott" alongside "Hallo")
- Not contain cultural stereotypes

---

## Next Steps After Phase 4
→ Move to Phase 5: Listening Component
