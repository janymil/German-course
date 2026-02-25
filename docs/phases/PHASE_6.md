# Phase 6 — Writing Component + AI Integration

## Goal
Implement free production writing exercises and connect the AI writing coach. This is where learners stop just recognising German and start producing it.

## Status: NOT STARTED

## Depends on: Phase 2 (FreeWrite component stub built), Phase 5 (L01–L30 content done)

---

## Writing Progression at A1

| Level | Task | Example |
|---|---|---|
| L30 | Complete a sentence | "Ich heiße ___ und ich komme aus ___." |
| L35 | Write 2–3 connected sentences | Introduce yourself (name, age, city, job) |
| L40 | Fill in a simple form | Name, Address, Phone, Nationality |
| L45 | Write a short SMS (3–4 sentences) | "Hallo Jana, wie geht es dir?..." |
| L50 | Write a short email (5–6 sentences) | Greet, state reason, simple request, close |
| L55 | Write about your routine (5–6 sentences) | "Ich stehe um 7 Uhr auf. Ich frühstücke..." |
| L60 | Write a response to an ad | Reply to a Wohnungsanzeige |
| L70 | Goethe exam writing task | Fill form + write 30-word message |

---

## Goethe A1 Writing Exam Format

The Schreiben section has 2 parts:
1. **Teil 1** — Fill in a form with 5 missing pieces of personal information (from an audio or text prompt)
2. **Teil 2** — Write a short message (SMS/card) of at least 30 words on a given topic

Total: 2 tasks → 25 points

Both tasks are simulated at L67 (practice) and L72 (full mock).

---

## FreeWrite Exercise Design

```
┌────────────────────────────────────────────────────────┐
│ Úloha: Napíš krátku správu Janinej kamarátke.          │
│ Povedz jej: (1) ako sa voláš, (2) kde bývaš,           │
│ (3) aká je tvoja práca.                                │
│ Minimálne 30 slov.                                     │
├────────────────────────────────────────────────────────┤
│ [                                                    ] │
│ [                Text area                           ] │
│ [                                                    ] │
├────────────────────────────────────────────────────────┤
│ Počet slov: 0/30        [Skontrolovať s AI] [Odoslať]  │
└────────────────────────────────────────────────────────┘
```

After submission:
1. Word count check (minimum enforced)
2. AI correction (if AI enabled) — returns corrected text with explanations
3. Example answer revealed
4. Learner can compare their text to the example

---

## AI Writing Coach — Prompt Template

The following prompt is sent to OpenAI GPT-4o for each writing submission:

```
You are an experienced German language teacher for Slovak-speaking adult learners at A1 level.

The learner has written the following text in German:
---
[LEARNER_TEXT]
---

Task prompt given to learner (in Slovak):
[TASK_PROMPT]

Please:
1. Correct ALL grammar and vocabulary errors. Show corrected version.
2. For each correction, give a very brief explanation IN SLOVAK (1 sentence).
3. Focus on: article/gender errors, case errors (nominative/accusative), verb conjugation, word order.
4. Do NOT correct things that are above A1 level — focus only on what they have learned.
5. End with one sentence of encouragement IN SLOVAK.
6. If the text is completely correct, say so and explain why it is good.

Respond in this format:
CORRECTED: [full corrected text]
CORRECTIONS:
- [original] → [corrected]: [short Slovak explanation]
...
FEEDBACK: [encouragement in Slovak]
```

---

## Deliverables

### Components
- [ ] `src/components/exercises/FreeWriteExercise.jsx`
  - Textarea with word counter
  - "Check with AI" button (disabled if AI not configured)
  - "See example answer" button (appears after submission)
  - AI correction display with colour-coded errors

### AI Service
- [ ] `src/services/aiService.js` — real implementation with OpenAI API
  - API key management (user provides their own key or app has one)
  - Rate limiting (max 10 AI checks per day at free tier)
  - Error handling (graceful fallback to example answer only)
  - Caching (don't re-call AI for identical submissions)

### Settings
- [ ] AI settings page: enter API key, enable/disable AI
- [ ] Offline mode: FreeWrite still works, AI correction replaced by "example answer only"

### Lesson Updates
- [ ] L30–L80: Add FreeWrite exercises using the writing prompts defined above

---

## Writing Evaluation Criteria (AI + Manual)

| Criterion | Weight | A1 Focus |
|---|---|---|
| Communicative success | 40% | Did they convey the message? |
| Grammar accuracy | 30% | Articles, cases, verb forms |
| Vocabulary range | 20% | Used lesson vocabulary |
| Spelling | 10% | Correct spelling of A1 words |

The AI coach evaluates all 4 criteria and reports which are strong/weak.

---

## Next Steps After Phase 6
→ Move to Phase 7: Mock Tests + Exam Preparation
