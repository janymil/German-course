# Phase 7 — Mock Tests + Exam Preparation

## Goal
Simulate the exact Goethe-Zertifikat A1 exam format so learners know exactly what to expect and can track their readiness score before the real test.

## Status: NOT STARTED

## Depends on: Phases 3–6 complete (all content + all exercise types available)

---

## What the Goethe A1 Exam Looks Like

### Hören (Listening) — 25 points, ~20 minutes
| Teil | Description | Items |
|---|---|---|
| Teil 1 | 4 short conversations → 4 yes/no questions | 4 pts |
| Teil 2 | 1 longer conversation → 4 MCQ questions | 8 pts |
| Teil 3 | 5 announcements → write name/number/time heard | 10 pts |
| Bonus | +3 pts for exceptional performance | 3 pts |

### Lesen (Reading) — 25 points, ~25 minutes
| Teil | Description | Items |
|---|---|---|
| Teil 1 | 5 short notices/signs → match to 5 statements | 10 pts |
| Teil 2 | Short text → 4 True/False questions | 8 pts |
| Teil 3 | Form/table → 5 questions about the info | 7 pts |

### Schreiben (Writing) — 25 points, ~20 minutes
| Teil | Description | Items |
|---|---|---|
| Teil 1 | Fill in a form (5 missing items from audio prompt) | 10 pts |
| Teil 2 | Write a short message/card (min. 30 words) | 15 pts |

### Sprechen (Speaking) — 25 points, ~15 minutes
| Teil | Description | Items |
|---|---|---|
| Teil 1 | Self-introduction (name, age, job, hobby, city) | 8 pts |
| Teil 2 | Ask and answer 3 questions with a partner | 9 pts |
| Teil 3 | Ask and answer 3 needs (e.g. "Wie spät ist es?") | 8 pts |

**Total: 100 points. Pass: 60. Minimum per skill: 60%.**

---

## Mock Tests in the App

### Mock Test 1 (L70–L74)
- L70: Hören mock
- L71: Lesen mock
- L72: Schreiben mock
- L73: Sprechen mock (AI-graded conversational)
- L74: AI analysis + personalised weak-area report

### Mock Test 2 (L77–L78)
- L77: Full mock exam (all 4 skills in one session, timed)
- L78: Final AI assessment + exam day advice

---

## MockTestView Component Design

```
┌────────────────────────────────────────────┐
│ 🎓 Goethe A1 Mock Test                     │
│ Teil: Hören (Počúvanie)                    │
│ Čas: 20:00 ⏱️                              │
├────────────────────────────────────────────┤
│ Aufgabe 1 (1/3)                            │
│                                            │
│ [▶ Prehrať dialóg]                         │
│                                            │
│ Otázka: Kde je Jana?                       │
│ ○ V kaviarni                               │
│ ○ Na stanici                               │
│ ○ V nemocnici                              │
│ ○ V obchode                                │
├────────────────────────────────────────────┤
│              [Ďalší] →                     │
└────────────────────────────────────────────┘
```

After completion:
```
┌────────────────────────────────────────────┐
│ Výsledky Mock Testu 1                      │
├────────────────────────────────────────────┤
│ Hören:    18/25 (72%) ✅                   │
│ Lesen:    20/25 (80%) ✅                   │
│ Schreiben: 12/25 (48%) ❌ SLABÁ OBLASŤ    │
│ Sprechen: 16/25 (64%) ✅                   │
│                                            │
│ Celkovo: 66/100 ✅ ÚSPEŠNÉ                │
├────────────────────────────────────────────┤
│ Tvoje slabé oblasti:                       │
│ 1. Schreiben — artikle v akuzatíve        │
│ 2. Hören Teil 3 — čísla a časy            │
│                                            │
│ [Precvičiť slabé oblasti] [Pokračovať]    │
└────────────────────────────────────────────┘
```

---

## Exam Readiness Score

Calculated after each mock test:
- Score per skill (0–100%)
- Overall readiness (0–100%)
- Trend: improving / declining / stable
- Predicted exam result: PASS / BORDERLINE / NEEDS MORE WORK

Shown on ProgressView as a readiness gauge.

---

## Speaking Assessment (AI)

The Sprechen section is the hardest to assess in an app.

**Solution:**
1. Learner types their spoken response (simulates speaking)
2. OR: Learner records themselves (Web Speech API) → transcript submitted
3. AI evaluates: vocabulary range, grammar accuracy, communicative success
4. Score given with explanation in Slovak
5. Example excellent answer shown for comparison

In future: real-time voice recognition + scoring.

---

## Exam Day Tips (L79 Content)

Taught to learner before the real exam:
- Teil 1 Hören: listen for names, numbers, times specifically
- Teil 2 Lesen: read questions first, then scan text for answers
- Schreiben Teil 2: use the Jana template — intro + 3 content points + closing
- Sprechen: use formulaic phrases ("Mein Name ist...", "Ich komme aus...", "Ich arbeite als...")
- Don't leave blanks — wrong answer = 0, no penalty for guessing

---

## Deliverables

- [ ] `src/views/MockTestView.jsx` — full exam simulation UI
- [ ] `src/data/mockTests/mock1_hoeren.js` — mock test 1 listening data
- [ ] `src/data/mockTests/mock1_lesen.js` — mock test 1 reading data
- [ ] `src/data/mockTests/mock1_schreiben.js` — mock test 1 writing data
- [ ] `src/data/mockTests/mock1_sprechen.js` — mock test 1 speaking prompts
- [ ] `src/data/mockTests/mock2_*.js` — mock test 2 (all 4 skills)
- [ ] `src/hooks/useExamReadiness.js` — readiness score calculation
- [ ] Update `src/views/ProgressView.jsx` — add readiness gauge
- [ ] L70–L80 lesson content written
- [ ] AI scoring integration for Schreiben + Sprechen

---

## Next Steps After Phase 7
→ App is complete and Goethe A1 ready
→ Optional: Begin A2 curriculum planning
