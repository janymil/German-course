# Phase 3 — Content Rewrite: Lessons L01–L40

## Goal
Rewrite all 40 core lessons (Units 1–4) to native-teacher standard with full content, proper vocabulary recycling, narrative context, and communicative goals.

## Status: NOT STARTED

## Depends on: Phase 1 complete, Phase 2 complete

---

## Standards for Every Lesson

Each lesson must meet ALL of the following before it is considered done:

- [ ] Narrative context sentence (what is Jana doing right now?)
- [ ] Communicative goal stated ("After this lesson I can...")
- [ ] Slovak contrastive note in grammarNote
- [ ] 12–18 vocabulary items (not more, not fewer)
- [ ] Each vocabulary item has: de, sk, example sentence (DE), example translation (SK), gender tag, srsId
- [ ] Recycled vocabulary from 2–3 previous lessons explicitly listed in `reviewWords`
- [ ] Flashcard items include grammar hints (e.g. "der Hund (M!)")
- [ ] MCQ has explanation field for each answer
- [ ] Fill sentences are full communicative sentences, not fragments
- [ ] Listen exercise has minimum 4 items
- [ ] Match has minimum 5 pairs
- [ ] From L10: Dialogue exercise present
- [ ] From L20: MiniText exercise present
- [ ] From L30: FreeWrite exercise present

---

## Lesson Checklist

### Unit 1 (L01–L10)

| Lesson | Title | Status | Reviewed |
|---|---|---|---|
| L01 | Das Alphabet und Aussprache | ☐ TODO | ☐ |
| L02 | Hallo! Grüßen und sich vorstellen | ☐ TODO | ☐ |
| L03 | Ich bin Jana — sein konjugieren | ☐ TODO | ☐ |
| L04 | Wie heißt du? — W-Fragen | ☐ TODO | ☐ |
| L05 | Zahlen 0–20 | ☐ TODO | ☐ |
| L06 | Zahlen 21–100 und Telefonnummern | ☐ TODO | ☐ |
| L07 | Artikel der/die/das — Nominativ | ☐ TODO | ☐ |
| L08 | Ein/eine/ein — Unbestimmter Artikel | ☐ TODO | ☐ |
| L09 | Woher kommst du? — Länder | ☐ TODO | ☐ |
| L10 | Akuzativ — Den/Einen | ☐ TODO | ☐ |

### Unit 2 (L11–L20)

| Lesson | Title | Status | Reviewed |
|---|---|---|---|
| L11 | Kein/Keine/Keinen — Verneinung | ☐ TODO | ☐ |
| L12 | Die Wohnung — Zimmer und Möbel | ☐ TODO | ☐ |
| L13 | Mein, dein, sein, ihr — Possessivpronomen | ☐ TODO | ☐ |
| L14 | Unregelmäßige Verben — Vokalwechsel | ☐ TODO | ☐ |
| L15 | Pluralformen | ☐ TODO | ☐ |
| L16 | Möchten und können — Modalverben | ☐ TODO | ☐ |
| L17 | Im Restaurant — Bestellen | ☐ TODO | ☐ |
| L18 | Müssen und dürfen | ☐ TODO | ☐ |
| L19 | Uhrzeit — Wie viel Uhr ist es? | ☐ TODO | ☐ |
| L20 | Trennbare Verben | ☐ TODO | ☐ |

### Unit 3 (L21–L30)

| Lesson | Title | Status | Reviewed |
|---|---|---|---|
| L21 | Wochentage und Tagesablauf | ☐ TODO | ☐ |
| L22 | Imperativ (Sie-Form) | ☐ TODO | ☐ |
| L23 | Wegbeschreibung — Wo ist...? | ☐ TODO | ☐ |
| L24 | Verkehrsmittel — Bus und Bahn | ☐ TODO | ☐ |
| L25 | Dativ — neben dem, mit dem | ☐ TODO | ☐ |
| L26 | Familie und Beziehungen | ☐ TODO | ☐ |
| L27 | Einkaufen — Im Supermarkt | ☐ TODO | ☐ |
| L28 | Konjunktionen: und, aber, oder, weil | ☐ TODO | ☐ |
| L29 | Das Wetter — Wie ist das Wetter? | ☐ TODO | ☐ |
| L30 | Präpositionen + Akkusativ: durch/für | ☐ TODO | ☐ |

### Unit 4 (L31–L40)

| Lesson | Title | Status | Reviewed |
|---|---|---|---|
| L31 | Kleidung und Einkaufen | ☐ TODO | ☐ |
| L32 | Essen und Lebensmittel | ☐ TODO | ☐ |
| L33 | Im Café — Smalltalk | ☐ TODO | ☐ |
| L34 | Zahlen 100–1000 und Preise | ☐ TODO | ☐ |
| L35 | Wechselpräpositionen — in/an/auf | ☐ TODO | ☐ |
| L36 | Berufe und Arbeitsplatz | ☐ TODO | ☐ |
| L37 | Im Büro — Arbeitsalltag | ☐ TODO | ☐ |
| L38 | Telefon und Nachrichten | ☐ TODO | ☐ |
| L39 | Hobbys und Freizeit | ☐ TODO | ☐ |
| L40 | Reflexive Verben — sich fühlen | ☐ TODO | ☐ |

---

## Work Order
Write lessons in order: L01 → L02 → L03 ... Always write them sequentially.
Never write L08 before L07 because vocabulary recycling requires knowing what was introduced earlier.

## Writing Process for Each Lesson
1. Read the lesson .md file (docs/lessons/LXX.md)
2. Check what vocabulary was introduced in the previous 5 lessons
3. Write the JS lesson object following the schema in PHASE_1.md
4. Mark lesson as DONE in this checklist
5. Run `npm run build` to verify no errors
6. Mark as Reviewed after build passes

---

## Next Steps After Phase 3
→ Move to Phase 4: Reading Component
→ (Phase 3 lessons L41–L80 are covered in Phase 4 and Phase 5)
