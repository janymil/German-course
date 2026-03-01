# Slovíčka — Vocabulary Trainer Documentation

> **File:** `src/views/VocabTrainer.jsx`
> **Last updated:** 2026-02-26
> **Status:** ✅ Active, SM-2 SRS implemented

---

## Overview

Slovíčka is the spaced repetition vocabulary trainer component. It presents flashcards from all 80 lessons (1 300+ words), custom user words, and any story-sourced vocabulary. It uses the **SM-2 algorithm** to schedule reviews so words are shown at the optimal time before the user forgets them.

---

## Features Implemented

### ✅ 1. SM-2 Spaced Repetition Algorithm
Implemented in `useProgress.js` → `reviewVocab(word, quality)`.

**Quality scale:**
| Score | Meaning | Outcome |
|-------|---------|---------|
| 5 | Perfect recall, no hesitation | Large interval jump |
| 4 | Correct with slight effort | Normal interval advance |
| 3 | Correct but took effort | Slow interval advance |
| 2 | Wrong but remembered when shown | Resets to 1 day |
| 1 | Wrong answer | Resets to 1 day |
| 0 | Complete blackout | Resets to 1 day |

**Button mapping (Mode A flashcard):**
| Button | Quality | Label shown |
|--------|---------|-------------|
| 🔴 Red | 1 | Nevedel (+1 deň) |
| 🟡 Amber | 3 | Vedel (+interval) |
| 🟢 Green | 5 | Ľahké! (dlhší interval) |

**Interval progression (quality ≥ 3):**
- 1st correct → due in **1 day**
- 2nd correct → due in **6 days**
- 3rd+ correct → due in `prev_interval × easeFactor` days

**EaseFactor** starts at 2.5 and adjusts per review:
```
easeFactor = max(1.3, easeFactor + 0.1 - (5 - quality) × (0.08 + (5 - quality) × 0.02))
```

A word is marked `mastered: true` when `repetitions ≥ 3` AND `interval ≥ 6`.

---

### ✅ 2. "Again" Re-queue (Anki-style)
When a user clicks **Nevedel** (quality < 3), the card is appended to the **end of the current session deck** so it gets reviewed again before the session ends.

- Wrong cards never disappear — they come back within the same session.
- Deck counter increases when cards are re-queued (e.g. `3 / 18` instead of `3 / 17`).

---

### ✅ 3. Leech Detection
Words with `wrongCount ≥ 8` are flagged as **leeches** — words the user consistently fails.

**Where it appears:**
1. **On the card** — red badge "🩸 Problémové slovíčko" shown on the front
2. **In the 📊 stats panel** — listed under "Problémové slovíčka" with a note to use mnemotechnics

---

### ✅ 4. Due Forecast (7-day view)
The 📊 stats panel shows a 7-column grid with the number of cards due each day:

```
Dnes | Zajtra | +2d | +3d | +4d | +5d | +6d
  4  |   12   |  2  |  8  |  0  |  5  |  1
```

- Today's column is highlighted in **amber**
- Future days with cards show in **indigo**
- Empty days show in **gray**

---

### ✅ 5. Stats Panel (📊 button)
Toggle accessible from the header. Shows:
- **SRS Forecast** — 7-day grid
- **Leech list** — if any words have wrongCount ≥ 8
- **Summary tiles** — V pamäti / Dnes splatné / Ostatok

---

### ✅ 6. Vocabulary Images
AI-generated illustrations are shown on the **front of Mode A flashcards** above the German word.

**Currently illustrated (Lesson 1):**
| Word | Image path |
|------|-----------|
| Hallo | `/images/vocab/hallo.png` |
| Guten Morgen | `/images/vocab/guten_morgen.png` |
| Guten Tag | `/images/vocab/guten_tag.png` |
| Guten Abend | `/images/vocab/guten_abend.png` |
| Tschüss | `/images/vocab/tschuess.png` |
| Auf Wiedersehen | `/images/vocab/auf_wiedersehen.png` |
| der Name | `/images/vocab/name.png` |
| der Vorname | `/images/vocab/vorname.png` |
| der Nachname | `/images/vocab/nachname.png` |
| das Alphabet | `/images/vocab/alphabet.png` |
| der Buchstabe | `/images/vocab/buchstabe.png` |
| Entschuldigung | `/images/vocab/entschuldigung.png` |

**How to add images for a new lesson:**
1. Generate image with `generate_image` tool
2. Copy to `public/images/vocab/[slug].png`
3. Add `image: "/images/vocab/[slug].png"` to the vocab entry in the lesson `.js` file

> ⚠️ Only add images for **concrete, imageable nouns and phrases**. Abstract words (ich, nicht, wann...) don't benefit from images.

---

### ✅ 7. Three Review Modes
| Mode | ID | Description |
|------|----|-------------|
| Kartičky | A | Flip-card: see German → click to reveal Slovak |
| Výber | B | Multiple choice: pick correct Slovak from 4 options |
| Doplňovanie | C | Gap-fill: type the German word into a blank sentence |

---

### ✅ 8. Custom Vocabulary
Users can add their own German-Slovak word pairs via the **+ Agregar** button. Custom words:
- Are stored in `progress.vocabSeen` and `progress.customVocab`
- Are included in the SRS deck
- Are shown with the label `Vlastné slovíčko`

---

## Deck Building Algorithm

File: `VocabTrainer.jsx` → `buildDeck(progress)`

Cards are sorted into 3 buckets and concatenated:

```
1. OVERDUE — dueDate ≤ today, sorted by most overdue first
2. UNSEEN  — never reviewed (no vocabSeen entry)
3. UPCOMING — dueDate in future (max 5 preview cards)
```

This ensures the user always works on the most urgent reviews before seeing new words.

---

## Data Schema (per word in `progress.vocabSeen`)

```json
"Hallo": {
  "seenCount": 5,
  "wrongCount": 1,
  "lastSeen": "2026-02-26T22:00:00.000Z",
  "repetitions": 3,
  "interval": 6,
  "easeFactor": 2.36,
  "dueDate": "2026-03-04",
  "mastered": false
}
```

| Field | Type | Description |
|-------|------|-------------|
| `seenCount` | number | Total number of reviews |
| `wrongCount` | number | Total wrong answers (used for leech detection) |
| `lastSeen` | ISO string | Timestamp of last review |
| `repetitions` | number | Consecutive correct answers (SM-2 `n`) |
| `interval` | number | Days until next review |
| `easeFactor` | number | SM-2 ease factor (min 1.3) |
| `dueDate` | YYYY-MM-DD | Date when card is next due |
| `mastered` | boolean | `true` if repetitions ≥ 3 AND interval ≥ 6 |

---

## Progress Saving

Vocabulary progress is saved via `useProgress.js`:

- **On every card review** — `reviewVocab(word, quality)` immediately updates `globalProgress.vocabSeen`
- **To localStorage** — synchronously after every update (cache)
- **To `progress.json`** via `/api/progress` — within 500ms debounce OR at the 5-second periodic interval
- **On tab close** — via `sendBeacon('/api/progress-beacon', ...)`

**No session state is saved** — the deck position is not persisted. Each session starts fresh from the SRS algorithm (which is correct behavior — position doesn't matter, only what's due).

---

## Pending / Future Work

| Priority | Feature | Notes |
|----------|---------|-------|
| 🔴 High | Images for L02–L10 vocab | Concrete nouns: Kaffee, Tisch, Stuhl, Tür, Fenster, Buch, etc. |
| 🟡 Medium | Audio recordings (native speaker) | Currently TTS only. Native audio per card would be stronger |
| 🟡 Medium | FSRS algorithm upgrade | SM-2 works well but FSRS is ~20% more efficient. Requires more data |
| 🟢 Low | Deck grouping by lesson | "Only show L01–L03 words today" filter |
| 🟢 Low | CSV/bulk import | Import a list of custom words from a file |
| 🟢 Low | Card detail stats | Per-card history graph (times seen, % correct over time) |

---

## File Structure

```
src/
  views/
    VocabTrainer.jsx          ← Main component (all 3 modes, SRS UI)
  hooks/
    useProgress.js            ← SM-2 logic (reviewVocab, markVocabSeen, markVocabWrong)
  data/
    curriculum.js             ← Imports all 80 lesson files
    lessons/
      L01.js                  ← vocab[] array with image fields
      L02.js ... L80.js
public/
  images/
    vocab/                    ← AI-generated illustration PNGs
      hallo.png
      guten_morgen.png
      ... (12 images for L01)
docs/
  SLOVICKA.md                 ← This file
  VOCAB_TRACKER.md            ← Curriculum word list (L01–L80 srsId table)
```

---

## SRS vs. Plain Priority Queue — Why SM-2 Is Better

| Scenario | Old system (priority queue) | SM-2 SRS |
|----------|-----------------------------|-----------|
| Learn "Hallo" today | Shows it tomorrow | Shows it in 1 day |
| Review correctly 3× | Moves to "mastered", rarely shown | Shows in 15+ days (calculated) |
| Forget after 3 weeks | Already marked mastered, won't resurface | dueDate passes → back in deck automatically |
| Difficult word | Sorts by wrongCount | Interval stays short, easeFactor decreases |

The key advantage: SM-2 **predicts forgetting** and resurfaces words exactly when needed. The old system had no concept of time — it only tracked a binary mastered/not-mastered state.
