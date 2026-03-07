# AGENT SYSTEM — Specialized AI Agents for German Learning App

**Created:** 2026-02-28
**Purpose:** Define 13 specialized agents, each owning a specific domain. The orchestrator (Copilot) invokes agents by name with their defined prompt templates. Each agent reads only what it needs, writes only what it owns, and follows strict rules.

---

## ARCHITECTURE OVERVIEW

```
ORCHESTRATOR (Copilot main thread)
│
├─── CONTENT AGENTS (create/maintain learning data)
│    ├── Agent 1:  LESSON CONTENT AGENT ──► L01.js–L80.js
│    │   ├── Sub-agent 1A: Vocabulary Builder
│    │   ├── Sub-agent 1B: Grammar Note Writer
│    │   ├── Sub-agent 1C: Minitext Dialogue Writer
│    │   ├── Sub-agent 1D: Exercise Generator
│    │   └── Sub-agent 1E: Speaking & Pronunciation Builder
│    ├── Agent 2:  STORY CONTENT AGENT ──► stories.js
│    ├── Agent 3:  VIDEO CONTENT AGENT ──► videoLibrary.js + video-database/
│    ├── Agent 4:  PASSIVE PHASE AGENT ──► phrases.js
│    ├── Agent 5:  ARENA CONTENT AGENT ──► ExerciseArena data
│    └── Agent 6:  AI CONVERSATION AGENT ──► AIConversation scenarios
│
├─── QUALITY AGENTS (validate, fix, maintain)
│    ├── Agent 7:  QA / BUG HUNTER AGENT ──► schema, fields, types, indexes
│    ├── Agent 8:  DOCUMENTATION SYNC AGENT ──► INSTRUCTIONS.md, APP_OVERVIEW.md
│    └── Agent 13: PEDAGOGICAL AUDITOR ──► curriculum alignment, content quality, learning curve
│
└─── FEATURE AGENTS (optimize specific sub-apps)
     ├── Agent 9:  VOCAB TRAINER AGENT
     ├── Agent 10: GRAMMAR GUIDE AGENT
     ├── Agent 11: DASHBOARD / UX AGENT
     └── Agent 12: TESTING AGENT
```      Agent 13 PEDAGOGICAL LESSON AUDITOR

---

## GLOBAL RULES FOR ALL AGENTS

### RULE ZERO — THINK LIKE AN EXPERIENCED GERMAN TEACHER FIRST

**Before creating, analyzing, or fact-checking ANY content, every agent and sub-agent must FIRST ask:**
> "What would an experienced, qualified German teacher (Goethe-certified) do here? What is the standard, proven practice in language pedagogy?"

This means:
- **Natural language first.** All German content (examples, dialogues, exercises) must sound like real German that a native speaker would actually say. Never sacrifice naturalness for artificial rules.
- **Context teaches.** Students learn vocabulary from natural context and exposure. Example sentences should be authentic A1-level German — they are NOT restricted to only words from "this lesson" or "previous lessons". A student encountering "Der Arzt arbeitet im Krankenhaus" will learn "Arzt" from the natural sentence, even if "Krankenhaus" hasn't been formally taught yet. This is how immersion works.
- **Progressive difficulty, not artificial isolation.** Lessons build on each other, but every sentence stands on its own as real German. The grammar level constraint (Präsens for early lessons, etc.) applies to STRUCTURES, not to individual vocabulary words.
- **Pedagogy over engineering.** When a technical rule conflicts with what a good teacher would do, the teacher wins. The schema exists to serve learning, not the other way around.

---

1. **Read before write.** Every agent MUST read the files listed in its "MUST READ" section before making any changes.
2. **Own your domain.** Never write to files outside your listed "WRITES TO" scope.
3. **German content language (progressive).** User-facing text fields transition from Slovak-supported to full German immersion:
   - **L01-L05:** Exercise `instruction` fields use **simple German with Slovak in parentheses** the first time a new instruction type appears: `'Verbinde das deutsche Wort mit der Übersetzung. (Spoj nemecké slovo s prekladom.)'`. After the student has seen the instruction once, subsequent lessons use German only.
   - **L06+:** All exercise instructions in **German only** — the student has seen every exercise type by now.
   - **Always German:** `title`, `narrativeContext`, `communicativeGoal`.
   - **Always Slovak:** `topic`, `lessonNotes`, `grammarNote.explanation`, `grammarNote.slovakContrastNote` (pedagogical necessity — A1 beginners cannot read German grammar explanations).
4. **Build verification.** After writing any .js/.jsx file, the orchestrator runs `npm run build` to verify no syntax errors.
5. **No vocab[] overlap between lessons — but RECYCLE in exercises.** Each lesson's `vocab[]` array introduces NEW target words only (the SRS system tracks each word by its `de` string, so duplicates would break tracking). However, exercises and minitext MUST actively recycle vocabulary from previous lessons alongside the new words — this is called **spiral curriculum** and is essential for retention. The separate Slovíčka (VocabTrainer) app provides dedicated vocabulary practice, but lessons must still reinforce prior vocabulary through context. **Important:** Recycling must NOT reduce exercise quality — when exercises include recycled words, INCREASE the exercise item count to the upper end of the range (e.g., match: 10 pairs, not 8; mcq: 6+, not 4) so that both new AND recycled content gets sufficient coverage.
6. **A1 grammar constraints.** L01–L10: Präsens only. L11–L40: + modal verbs + imperative. L41–L60: + Perfekt. L61–L80: all A1 grammar. This applies to grammar STRUCTURES in example sentences — not to individual vocabulary words. **Exception:** The expressions `möchten` and `können` may appear as **memorized fixed phrases** from L03 onward (e.g., "Ich möchte einen Kaffee, bitte", "Können Sie das wiederholen?"). These are taught as unanalyzed chunks for survival communication — every major A1 textbook (Menschen, Netzwerk, Schritte) introduces them by Lektion 2-3. Full modal verb grammar (conjugation tables, rules) is still introduced at L11+.
7. **Factual accuracy.** German alphabet = 30 letters. All genders verified. All conjugations correct.

---

## ADDITIONAL QUALITY RULES (added after audit of L01-L05)

### RULE A — PHRASE/CHUNK LEARNING + REDEMITTEL

Every lesson MUST include 3-5 **communicative phrases/chunks** as vocabulary items (in `vocab[]`). These are multi-word expressions that a student needs as ready-made units for real communication.

**Why:** Language acquisition research (Lewis's Lexical Approach, Nattinger & DeCarrico) shows students learn faster when they memorize useful chunks, not just isolated words. A student who knows "Wie heißt du?" as a chunk can communicate immediately — a student who only knows "wie", "heißen", "du" separately cannot.

**Examples of good phrase/chunk vocab items:**
- `'Wie heißt du?'` (L01 — greeting chunk)
- `'Ich komme aus...'` (L03 — origin phrase)
- `'Wie alt bist du?'` (L04 — age question)
- `'Was machst du von Beruf?'` (L05 — profession question)
- `'Wie geht es dir?'` (L02 — wellbeing question)

**Redemittel (classroom/survival expressions):**
Every lesson from L01 onward MUST include 2-3 **Redemittel** — classroom and survival expressions that the student memorizes as unanalyzed chunks, even if the grammar hasn't been formally taught yet. These are standard in every real A1 classroom (Menschen, Netzwerk, Schritte all teach these from Lektion 1).

| Lesson | Required Redemittel |
|---|---|
| L01 | `'Wie bitte?'` (pardon?), `'Noch einmal, bitte.'` (once more please) |
| L02 | `'Wie schreibt man das?'` (how do you spell that?), `'Langsam, bitte.'` (slowly please) |
| L03 | `'Was bedeutet...?'` (what does ... mean?), `'Ich verstehe nicht.'` (I don't understand) |
| L04+ | Include situationally appropriate Redemittel: `'Entschuldigung'`, `'Können Sie das wiederholen?'`, `'Wie sagt man... auf Deutsch?'` |

Redemittel ARE vocab items (with `gender: null`). The student memorizes the whole phrase — they don't need to understand the grammar inside it yet. This is how immersion works: you learn "Können Sie das wiederholen?" as a fixed block long before you learn modal verb conjugation.

**Rules:**
- Phrases and Redemittel ARE vocab items — they have `de`, `sk`, `gender: null`, `example`, etc.
- The `example` for a phrase can show it used in a short dialogue context
- Phrases + Redemittel count toward the 15-20 vocab item total
- Do NOT waste vocab slots on pronouns (`ich`, `du`) or pure grammar words — those belong in `grammarNote` examples, not in the vocab list

### RULE B — MINITEXT GRAMMAR CEILING

The minitext MUST NOT use **grammar structures** (verb conjugation patterns, tenses, clause types) beyond what the student has learned up to and including THIS lesson. This applies to VERBS AND SENTENCE STRUCTURE — not to individual nouns, adjectives, or adverbs.

**Why:** The minitext is a READING COMPREHENSION exercise. If a student reads "Ihr neues Leben beginnt" in L01 but has only learned "sein" and "heißen", they cannot parse the verb. However, using the noun "Kurs" or "Lehrer" in L01 is fine — students guess nouns from context. The restriction targets **grammar structures that change sentence parsing**, not individual vocabulary words.

**What is restricted (grammar structures):**
- Conjugated verbs the student hasn't learned (L01 can only conjugate sein/heißen — NOT "beginnt", "arbeitet")
- Tenses not yet introduced (no Perfekt before L41, no Präteritum before L61)
- Clause types not yet taught (no Nebensätze before they're explicitly taught)
- Modal constructions (except möchten/können as fixed phrases from L03+, see Global Rule 6)

**What is NOT restricted (vocabulary):**
- Any common A1-level NOUN is allowed if the student can understand it from context or it appears in lesson vocab
- Adjectives, adverbs, and prepositions that are natural in the sentence
- Previously taught vocabulary from ANY earlier lesson (recycling is encouraged)

**Specific VERB constraints per level:**
| Lessons | Conjugated verbs allowed in minitext |
|---|---|
| L01 | sein, heißen only |
| L02 | + fragen, antworten, gehen (W-Fragen context) |
| L03 | + kommen, sprechen, lernen (countries/languages context) |
| L04 | + zählen, haben (numbers/age context) |
| L05 | + arbeiten, machen, studieren (professions context) |
| L06-L10 | Any Präsens regular + irregular verbs from syllabus |
| L03-L10 | möchten/können as FIXED PHRASES only (e.g. "Ich möchte...", "Können Sie...") |
| L11-L20 | + full modal verb conjugation, Imperativ |
| L21-L40 | + separable verbs, reflexive verbs |
| L41-L60 | + Perfekt, Dativ constructions |
| L61-L80 | All A1 grammar |

### RULE C.1 — SPIRAL GRAMMAR RECYCLING (THE "NETZWERK/MENSCHEN" METHOD)

Standards from Hueber/Klett explicitly mandate a "Spiral Syllabus". The rules above block future grammar from bleeding backward, **but you must actively pull PAST grammar forward.**

When creating `mcq` and `fill` exercises for L06–L10:
- You must deliberately inject grammar traps/tests from L01–L05.
- If L03 taught `der/die/das` sorting, an L08 fill exercise should test gender agreement.
- If L04 taught verb conjugation `-st/-t`, an L07 mcq should include those distractor traps.
- Vocabulary is easy to recycle, but **grammar structures must also be recycled and tested.**

### RULE C.2 — MINITEXT QUESTION VERIFICATION (MANDATORY)

Every minitext comprehension question MUST be answerable ONLY from the actual text written. This is the #1 content quality failure found in the audit.

**The problem:** Sub-agent 1C was generating questions based on what it INTENDED the text to say, not what it ACTUALLY wrote. This produced fabricated questions where the "correct" answer contradicts the text.

**Mandatory verification process:**
1. Write the minitext `text` first
2. For EACH question, find the EXACT quote in `text` that supports the answer
3. Put that exact quote in the `explanation` field
4. If you cannot find a supporting quote → the question is fabricated → rewrite it or rewrite the text

**Verification template:**
```
Q: "Wer fragt zuerst?"
A: "Anna" (index 1)
QUOTE FROM TEXT: "..." ← must exist in `text` field!
If quote not found → QUESTION IS FABRICATED → FIX IT
```

### RULE D — EXERCISE QUANTITY MINIMUMS

| Exercise type | Field name | Minimum items | Target | Notes |
|---|---|---|---|---|
| match | `pairs` | 8 | **10** | Must cover all key new vocab + 2-3 recycled from prior lessons |
| wordorder | `sentences` | 5 | **6** | All must target THIS lesson's grammar rule |
| fill | `questions` | 5 | **6-8** | Mix grammar fills + vocab fills + 1-2 recycled |
| listen | `questions` | 8 | **10** | Include tricky pronunciation words + 2-3 recycled |
| mcq | `questions` | 5 | **6-8** | 2-3 grammar + 2-3 vocab + 1-2 usage situations |
| minitext | `questions` | 4 | **5** | Must test comprehension, not memory |
| speaking | `phrases` | 5 | **6-8** | Progressive: word → phrase → sentence |
| truefalse | `statements` | 5 | **6** | Mix true/false, test grammar rules not trivia |
| dictation | `sentences` | 5 | **6** | Progressive length: 3 words → 8 words |
| categorysort | `categories` | 2 | **3** | Must be pedagogically meaningful classification |
| translation | `sentences` | 4 | **5** | SK→DE, uses THIS lesson's grammar |
| conjugation | `verbs` | 2 | **2-3** | Verbs from THIS lesson, 3+ forms each |

**CRITICAL — AI BIAS WARNING:** AI agents consistently choose the LOWEST number in any given range. This produces thin, shallow exercises. **Always aim for the Target column, not the Minimum.** The minimum exists only as a hard floor — exercises at the minimum feel weak and unfinished. A real teacher would always prepare more, not less.

**Recycling rule:** When exercises include recycled vocabulary from previous lessons, this adds to the total — it does NOT replace new-vocabulary items. If the minimum is 8 match pairs and you're recycling 2 pairs from L03, you need 10 pairs total (8 new-lesson + 2 recycled), not 6+2=8. The student already has dedicated vocabulary training in the Slovíčka app — lesson exercises must primarily serve the NEW lesson content.

**Why:** At A1 level, repetition and volume are key. More practice items = better retention. A lesson with 4-item exercises feels like a demo, not a real learning experience.

### RULE E — CANONICAL SYLLABUS DECLARATION

The **ONLY** authoritative curriculum document is:
```
docs/A1_80_LESSONS_SYLLABUS.md
```

`docs/CURRICULUM.md` is **OUTDATED** and **MUST NOT** be used as a source of truth. When there is any conflict between the two documents, `A1_80_LESSONS_SYLLABUS.md` wins.

### RULE F — SYLLABUS GAP NOTES

The following topics are NOT explicitly covered in A1_80_LESSONS_SYLLABUS.md but ARE required for Goethe A1. Agents should incorporate them into nearby lessons:

| Missing topic | Where to teach it |
|---|---|
| `haben` conjugation (ich habe, du hast, er hat) | L06 (personal data) or L07 (family: "Ich habe eine Schwester") |
| Regular verb conjugation pattern (-e, -st, -t, -en, -t, -en) | L06 (as explicit grammar note alongside personal data verbs) |
| `nicht` negation and position | L15 (alongside kein/keine) or L12 (adjectives: "nicht groß") |
| Ja/Nein-Fragen explicit grammar | L08 (already has Ja/Nein in topic — make grammar note explicit) |
| Phonetik/Aussprache (Pronunciation) | Continually integrate into speaking/dictation tips. Teach explicit rules (e.g. `ei` vs `ie`, word stress, `ch` sounds) in `grammarNote`s where appropriate. |
| Socio-Cultural (Landeskunde) | Inject DACH-region norms into minitexts/dialogues (e.g., *Sie* vs *du* etiquette, workplace culture, times, specific holidays). |
| Freies Sprechen/Schreiben (Open skills) | Progress towards open-ended prompt tasks in `speaking` and `writing` exercises as lessons advance. |
| Exam simulation/strategy | L78-L80 (incorporate mock exam exercises into final lessons) |
| Writing a short email/message | L20 (emails), L40 (travel memories), L69 (Schreiben practice) |

### RULE G — NEW EXERCISE TYPES (REQUIRED for all lessons)

In addition to the 8 core exercise types, every lesson MUST also include these exercise types:

| Type | Component | Purpose | Schema |
|---|---|---|---|
| `truefalse` | TrueFalseExercise | Richtig/Falsch statements about grammar/vocab | `{ type:'truefalse', statements:[{ statement, isTrue, explanation }] }` — 5 statements |
| `dictation` | DictationExercise | Listen via TTS and write full German sentences | `{ type:'dictation', sentences:[{ de, sk, hint? }] }` — 5 sentences |
| `categorysort` | CategorySortExercise | Sort words into categories (gender, topic) | `{ type:'categorysort', categories:[{ name, color, words[] }], explanation }` — 2-3 categories |
| `translation` | TranslationExercise | Translate SK→DE sentences | `{ type:'translation', sentences:[{ sk, answer, hint, explanation }] }` — 4 sentences |
| `conjugation` | ConjugationExercise | Fill conjugation table for verbs | `{ type:'conjugation', verbs:[{ infinitive, translation, forms:[{pronoun,correct}], note }] }` — 1-2 verbs, 3 forms each |

**Exercise order in every lesson (13 total):**
```
1. flashcard       (core)
2. match           (core)
3. wordorder       (core)
4. fill            (core)
5. listen          (core)
6. mcq             (core)
7. minitext        (core)
8. speaking        (core)
9. truefalse       (required)
10. dictation      (required)
11. categorysort   (required)
12. translation    (required)
13. conjugation    (required — if lesson has verb conjugation; otherwise categorysort or translation gets extra items)
```

**Color options for categorysort:** blue, rose, green, amber, purple, gray

---

## GOLDEN REFERENCE — L01-L05 QUALITY STANDARD

**These 5 lessons are the quality benchmark. Every future lesson (L06-L80) MUST match this standard exactly. When creating a new lesson, READ at least one of these reference files first.**

### What makes L01-L05 the standard:

| Quality dimension | What L01-L05 do correctly |
|---|---|
| **Vocab** | 15-18 items. Includes 2-4 phrase chunks (e.g. "Wie heißt du?", "Ich komme aus..."). Content-specific nouns (not filler). M/F pairs for gendered professions. |
| **Grammar notes** | Full HTML explanations with `<table>`, `<div class="tip-box">`, `<div class="warn-box">`. Always have slovakContrastNote. 3+ examples. |
| **Minitext** | Narrative form (not Q&A dialogue). ≤80 words. Grammar ceiling enforced. ALL questions verifiable from text — explanations cite exact quotes. |
| **Exercise count** | 13 exercises per lesson: 8 core + truefalse + dictation + categorysort + translation + conjugation |
| **Match** | 8-10 pairs, covers key lesson vocab including new items |
| **Listen** | 8-10 items, covers key lesson vocab |
| **Categorysort** | Always pedagogically meaningful: greetings vs farewells (L01), W-words vs positive/negative (L02), countries vs languages vs verbs (L03), irregular vs regular numbers (L04), der vs die professions (L05) |
| **Truefalse** | 5 statements testing understanding of grammar rules, not just vocab memory. Mix of true/false. |
| **Dictation** | 5 sentences from lesson content, spoken via TTS. Student writes what they hear. |
| **Translation** | 4 SK→DE sentences using THIS lesson's grammar structures. |
| **Conjugation** | 2 verbs, 3 forms each (ich/du/er). Targets verbs taught in THIS lesson. |

### Reference lesson map:
| Lesson | Topic | Key reference for |
|---|---|---|
| L01 | Greetings, sein/heißen | Phrase chunks, conjugation exercise, alphabet grammar |
| L02 | W-Fragen | W-question categorysort, truefalse about grammar rules |
| L03 | Countries, sprechen | Country/language categorysort, stem-vowel change conjugation |
| L04 | Numbers 0-20 | Number categorysort (irregular/regular/tens), dictation with numbers |
| L05 | Professions, -in | Gender-based categorysort (der/die), translation with "als" |

---

## RULE H — WEEKEND RECAP SYSTEM (SATURDAY + SUNDAY)

**Every week in the 16-week curriculum has 5 lesson days (Mon–Fri) followed by 2 recap days (Sat–Sun).** The weekend is NOT a break — it is a structured consolidation phase that reinforces the week's material through different activity types. This is essential pedagogy: spaced repetition research (Ebbinghaus, Pimsleur) shows that review within 48 hours of learning dramatically improves retention.

### Weekend structure overview:

| Day | Name | Focus | Activities | App location |
|---|---|---|---|---|
| **Day 6 (Sobota)** | Aktívne opakovanie | Active testing + vocabulary | WeeklyTest + VocabTrainer | WeeklyPlan.jsx → "Test →" + "Slovíčka →" buttons |
| **Day 7 (Nedeľa)** | Pasívny kontakt | Passive listening + grammar review | PassivePhase + GrammarGuide | WeeklyPlan.jsx → "Počúvanie →" + "Gramatika →" buttons |

### SATURDAY — Aktívne opakovanie (Active Recall)

**Purpose:** Test what the student learned during Mon–Fri. Identify gaps. Reinforce vocabulary through active recall.

**Activity 1: Týždenný test (WeeklyTest)**
- Component: `src/views/WeeklyTest.jsx`
- Pulls questions dynamically from the week's 5 lessons
- 3 sections, Goethe exam style:
  1. **Hörverstehen** (Listening): 5 questions — TTS plays German, student selects Slovak translation from 4 options
  2. **Leseverstehen** (Reading): 8 questions — MCQ questions pulled from the week's lesson mcq exercises
  3. **Wortschatz** (Vocabulary): 7 questions — German word shown, select correct Slovak translation from 4 options
- Total: **20 questions** per weekly test
- Scoring: percentage correct → stored in progress
- Pass threshold: 70% = pass, 80%+ = excellent
- All questions are pulled from ALREADY COMPLETED lesson exercises — no new material

**Quality rules for WeeklyTest question generation:**
- Questions MUST come from exercises the student has already done (not new content)
- Distractors (wrong options) must be plausible — pulled from the same week's vocabulary pool
- At least 1 question from each of the 5 lessons (balanced coverage)
- No question should be trivially easy ("Hallo = ?") or unfairly hard (obscure vocab)
- The test should feel like a natural review, not a punishment

**Activity 2: Slovíčka (VocabTrainer)**
- Component: `src/views/VocabTrainer.jsx`
- SM-2 spaced repetition system
- On Saturday, the student reviews ALL vocabulary from the completed week
- The SRS algorithm prioritizes: due cards → weak cards → new cards
- Target: review all vocab items from this week at least once

### SUNDAY — Pasívny kontakt (Passive Exposure)

**Purpose:** Let the week's material settle through passive listening and grammar review. Lower cognitive load — the student relaxes while their brain consolidates patterns.

**Activity 1: Pasívna fáza (PassivePhase)**
- Component: `src/views/PassivePhase.jsx`
- Data: `src/data/phrases.js` → `PHRASE_DAYS`
- Student listens to German phrases via TTS, reads along, writes what they hear
- Phrases are aligned with the curriculum week
- Phase 1: Listen + Read (passive). Phase 2: Listen + Write (active dictation)
- Target: complete 1-2 phrase days per Sunday

**Activity 2: Gramatika (GrammarGuide)**
- Component: `src/views/GrammarGuide.jsx`
- Student reviews grammar notes from ALL lessons completed this week
- Grouped by week — student expands the current week's accordion
- Each grammar rule has: explanation (Slovak), examples (TTS-clickable), contrast note
- Target: re-read grammar explanations for all 5 lessons, listen to examples with TTS

### WEEKLY_PLAN integration:

The `WEEKLY_PLAN` array in `src/data/curriculum.js` has `restDays: [6, 7]` for every week. The `WeeklyPlan.jsx` view renders Saturday and Sunday cards with navigation buttons to the appropriate sub-apps.

### Weekend quality checklist (Agent 12 responsibility):

```
For each week W (1-16):
□ WeeklyTest generates balanced questions from all 5 lessons
□ WeeklyTest has exactly 20 questions (5 Hören + 8 Lesen + 7 Wortschatz)
□ WeeklyTest distractors are plausible (same category, same week's vocabulary)
□ PassivePhase phrases.js has content aligned with this week's topics
□ GrammarGuide renders all 5 grammar notes from this week correctly
□ Saturday tip in WEEKLY_PLAN.tips is actionable and specific to the week's content
□ All navigation buttons in WeeklyPlan.jsx work (Test →, Slovíčka →, Počúvanie →, Gramatika →)
```

### Future enhancement considerations:
- **Week-specific vocabulary quiz:** Currently VocabTrainer shows ALL vocab. A "Week N only" filter mode would improve Saturday focus. (VocabTrainer already planned for this — Agent 9 responsibility)
- **Bonus content for fast learners:** If student scored 90%+ on all 5 lessons, Saturday could offer a bonus story from `stories.js` aligned with the week's theme.
- **Progress gating:** WeeklyTest should ideally be completable only after all 5 lessons are done (currently enforced in WeeklyPlan.jsx — button only shows when `status === 'done'`).

---

## AGENT 1: LESSON CONTENT AGENT

**Owner of:** `src/data/lessons/L01.js` through `L80.js`
**Mission:** Create or rewrite lesson files that strictly follow the A1 Goethe curriculum as defined in `docs/A1_80_LESSONS_SYLLABUS.md`, producing linguistically accurate, pedagogically structured German content with zero vocabulary overlap between lessons.

### MUST READ before any work:
| File | Why |
|------|-----|
| `INSTRUCTIONS.md` | Technical schema — all field names, types, validation rules |
| `docs/A1_80_LESSONS_SYLLABUS.md` | **THE curriculum** — defines WHAT grammar + topics each lesson covers |
| `docs/AGENT_SYSTEM.md` | This file — language rules, quality gates, sub-agent specs |
| All previously written `L##.js` files in the ENTIRE WEEK | Extract every `vocab[].de` string to build the exclusion list |
| The PREVIOUS lesson's file (L{NN-1}.js) | Understand what grammar was introduced before → ensure continuity |

### WRITES TO:
- `src/data/lessons/L{NN}.js` (exactly one file per invocation)

### LANGUAGE RULES FOR LESSON FILES:
| Field | Language | Reason |
|-------|----------|--------|
| `title` | **German** | Immersion — student sees German title |
| `topic` | **Slovak** | Short description so student knows the topic in their native language |
| `narrativeContext` | **German** | Immersion — short narrative setup in simple German (using only grammar the student already knows from previous lessons) |
| `communicativeGoal` | **German** | Immersion — "Nach dieser Lektion kann ich..." |
| `grammarNote.rule` | **German** | Grammar rule title in German |
| `grammarNote.explanation` | **Slovak** | Pedagogical necessity — A1 beginners cannot read German grammar explanations. This MUST stay Slovak for comprehension. |
| `grammarNote.slovakContrastNote` | **Slovak** | Comparison with Slovak grammar — must be in Slovak |
| `grammarNote.examples[].de` | **German** | Example sentences |
| `grammarNote.examples[].sk` | **Slovak** | Translations of examples |
| `exercise instructions` | **German** | Immersion — exercise instructions in simple German |
| `vocab[].de` | **German** | The word itself |
| `vocab[].sk` | **Slovak** | Translation |
| `vocab[].example` | **German** | Example sentence |
| `vocab[].exampleSk` | **Slovak** | Translation of example |
| `lessonNotes` | **Slovak** | Teacher/student summary |

### NARRATIVE WORLD:
The app follows **Jana Nováková**, a young Slovak woman who moves from Bratislava to Vienna to work as a graphic designer. The 80 lessons trace her life over 16 weeks — from her first day at German class through her successful Goethe A1 exam.

**Recurring characters:**
- **Jana Nováková** — the protagonist. Slovak, early 30s, friendly, slightly nervous about German.
- **Anna Berg** — the Volkshochschule teacher (Wien). Patient, professional.
- **Petra Hoffmann** — Jana's first German friend in the class. From München, cheerful.
- **Carlos Ruiz** — classmate from Spain, works as a cook in Vienna.
- **Luisa Mayer** — Jana's Austrian roommate. Practical, organized, sometimes demanding.
- **Herr Gruber** — the building's elderly neighbor. Helpful, old-fashioned Viennese.
- **Dr. Hirsch** — Jana's doctor in Vienna.
- **Tom** — colleague at the design agency where Jana works.

**The rule:** Every minitext scene must reference Jana's world. The scene must create a natural reason for the lesson's vocabulary and grammar to appear. No invented generic scenarios ("Person A asks Person B a question about a table"). The grammar and vocabulary must arise from the situation — not the other way around.

---

#### PER-LESSON MINITEXT SCENE BRIEFS

Use these as the exact brief for Sub-agent 1C. Each brief specifies:
- **Scene:** where it happens, who is present
- **What happens:** the micro-story arc (beginning → middle → end)
- **Grammar hook:** how the lesson's grammar emerges naturally from the scene

---

**WEEK 1 — Prvé stretnutia (First encounters at the Volkshochschule)**

| Lesson | Scene | What happens | Grammar hook |
|---|---|---|---|
| **L01** | First day of German class at the Wiener Volkshochschule. Teacher Anna Berg, Jana, and several students. | Anna goes around the room: "Wie heißen Sie?" Jana answers nervously: "Ich heiße Jana Nováková." Anna writes it on the board and spells it out. Jana learns the alphabet by watching. | `heißen` and `sein` in 1st/2nd/3rd person singular. Alphabet spelling appears naturally as Anna writes names. |
| **L02** | Coffee break in the VHS hallway. Jana and Petra meet for the first time. | Petra asks: "Wie heißt du? Wer bist du?" Jana answers. They ask each other questions — "Was bist du von Beruf? Wie alt bist du?" It's the first real German small-talk Jana has. | W-Fragen (Wie, Wer, Was) with `sein`. Natural interrogative word order. |
| **L03** | The class does a "Where are you from?" exercise. Anna puts a world map on the board. | Jana: "Ich komme aus der Slowakei. Ich spreche Slowakisch und ein bisschen Deutsch." Carlos: "Ich komme aus Spanien…" Students ask each other: "Woher kommst du? Was sprichst du?" | `kommen aus` + country, `sprechen` + language, stem-vowel change `sprichst/spricht`. |
| **L04** | Registration at the VHS front desk. Jana needs a student card. The clerk asks for her phone number and room number. | The clerk reads out Jana's student ID: "Ihre Nummer ist: achtzehn, fünf, null, drei." Jana writes it down. Then she discovers her locker number. She and Petra compare their numbers during break. | Numbers 0–20 in authentic administrative context. Counting, dictating, writing numbers. |
| **L05** | Friday coffee break at the end of the first week. The whole class sits together. Anna asks everyone what they do for work. | Carlos: "Ich arbeite als Koch." Petra: "Ich bin Lehrerin." Jana: "Ich bin Grafikdesignerin." The class discovers the -in suffix naturally through the conversation. | Professions + `der/die` gender pair, `-in` suffix, `arbeiten als`, `sein` + profession. |

---

**WEEK 2 — Familie und persönliches Leben**

| Lesson | Scene | What happens | Grammar hook |
|---|---|---|---|
| **L06** | VHS registration office. Jana fills out a paper form to get her student card. | The clerk asks for her name, city, address, marital status, country of birth. Jana writes: "Ich wohne in Wien, Mariahilfer Straße 12. Ich lebe in Österreich." She is unsure whether to write "ledig" (single) or "verheiratet" (married). | `leben`, `wohnen` + preposition + place. Personal data vocabulary. Marital status terms. |
| **L07** | Sunday evening. Jana sits in her small rented room and calls her mother in Bratislava. | Jana describes her classmates to her Mutter: "Petra hat einen Bruder. Carlos ist verheiratet und hat zwei Kinder. Ich habe keine Geschwister." Her mother asks about the teacher and the school. | Family members vocab. `haben` in all persons. Describing people and their families. |
| **L08** | Monday morning at the VHS. Jana and Petra arrive early and compare their course books and stationery. | Jana picks up Petra's book: "Ist das dein Buch?" Petra: "Nein, das ist nicht mein Buch. Das ist meins." They check who has what. Then Anna joins: "Ist das Ihr Kurs, Jana?" | `mein/dein/Ihr` in Nominativ. Ja/Nein questions. Simple question word order inversion. |
| **L09** | Jana gets a letter in the mailbox — her official VHS registration confirmation with her full student number: 47. She also receives a second envelope for a neighbor. | Jana shows Petra: "Das ist Janinas Brief. Diese Nummer ist siebenundvierzig." They call each other to exchange phone numbers — Jana dictates: "Meine Nummer ist null-eins-fünf-drei…" | Genitive-s with names (Janinas). Numbers 21–100. Dictating and writing phone/ID numbers. |
| **L10** | Last day of the second week. Anna gives a homework — each student writes a bulletin board introduction about themselves and their family. Jana reads hers to the class. | Jana reads: "Wir sind drei in meiner Familie. Meine Mutter heißt Eva. Sie wohnt in Bratislava. Mein Vater ist Ingenieur. Ich bin in Wien." The class applauds. Carlos reads his too — uses `ihr` for his wife. | Plural verb forms (`wir, ihr, sie`). Possessives in context. Consolidation of all Week 2 grammar. |

---

**WEEK 3 — Wohnung und Möbel (Apartment & Furniture)**

| Lesson | Scene | What happens | Grammar hook |
|---|---|---|---|
| **L11** | Jana's new apartment is empty. She visits an IKEA-style furniture store with Petra. | The salesperson points to items: "Das ist der Tisch. Die Lampe ist schön. Das Bett ist groß." Jana asks: "Was kostet er? Was kostet sie?" Natural `er/sie/es` pronoun usage for objects. | Definite article `der/die/das`. Third-person pronouns `er/sie/es`. Identifying objects. |
| **L12** | Furniture delivery day. Jana and the delivery man arrange everything in her studio apartment. | "Der Tisch ist zu groß für das Zimmer. Die Lampe ist schön, aber klein. Das Sofa ist bequem." Jana tells Petra on the phone what her apartment looks like now. | Adjectives (`schön, groß, klein, bequem, alt, neu`) describing furniture. Wo-questions + position. |
| **L13** | Jana checks the invoice and is shocked — the sofa costs 349 euros. She compares the prices of different items online with Petra. | "Das Sofa kostet dreihundertneunundvierzig Euro. Der Tisch kostet zweihundert Euro." They add up the total. Petra's furniture was cheaper. | Large numbers (100–1,000,000). Prices. `kosten` + number + Euro. |
| **L14** | Jana doesn't know the German word for her lamp shade. She asks Petra: "Wie heißt das auf Deutsch?" | They play a guessing game going around the apartment — pointing at things Jana doesn't know in German. Petra teaches her. An unknown object becomes a learning moment. | Indefinite article `ein/eine`. Asking and saying what things are called. `das ist ein/eine...` |
| **L15** | Jana goes to a hardware store to buy paint for her wall. She ordered blue but they bring green. | Shop assistant: "Das ist kein Blau. Das ist Grün." Jana points to color cards. They sort out the problem. She leaves with the right color. Back home, she tells Petra: "Keine Ahnung, warum sie das nicht verstehen!" | `kein/keine` (negative article). Colors. Negation with things. |

---

**WEEK 4 — Büro und Arbeit (Office & Work)**

| Lesson | Scene | What happens | Grammar hook |
|---|---|---|---|
| **L16** | Jana's first day at the Vienna design agency. Her desk is almost empty. She doesn't know the German words for office supplies. | Her new colleague Tom shows her around and names things: "Das ist der Drucker. Das ist das Telefon." Jana asks "Wie bitte?" several times. | Office vocabulary. Asking for repetition (Redemittel). Basic office communication in German. |
| **L17** | Jana's computer is slow and old. She goes to her boss and asks for a new one. | Boss: "Was brauchst du?" Jana: "Ich brauche einen neuen Computer und einen Drucker." She uses Akkusativ naturally in her request. Tom overhears and laughs: "Ich brauche auch einen!" | Akkusativ singular introduction: `einen/eine/ein`. `brauchen`, `haben` with Akkusativ objects. |
| **L18** | Jana emails HR to order stationery for the office. She lists everything she needs. | The email itemizes: "Ich brauche einen Stift, eine Mappe, ein Notizbuch, keinen Tacker." Then the HR replies listing what they have and don't have. | All Akkusativ forms: definite (`den/die/das`), indefinite (`einen/eine/ein`), negative (`keinen/keine/kein`). |
| **L19** | Jana cleans out her desk drawers and finds the previous employee's things. She sorts them into boxes. | "Das sind Stifte — drei Stifte. Das sind Ordner — zwei Ordner. Das sind Bücher." She labels the boxes. Tom brings more Akten — they count them together. | Plural forms of nouns (various types: Stifte, Ordner, Bücher, Akten, Mappen). |
| **L20** | Jana needs to schedule a call between her Viennese boss and a client in Berlin. She writes an email and then follows up by phone. | Email: "Sehr geehrter Herr Bauer, ich schreibe wegen eines Termins…" Then phone call: "Wann haben Sie Zeit?" She also discovers compound nouns: Telefonkonferenz, Arbeitswoche. | Formal email opening/closing formulas. Scheduling language. Compound nouns (Zusammensetzungen). |

---

**WEEK 5 — Freizeit und Hobbys (Free time & Hobbies)**

| Lesson | Scene | What happens | Grammar hook |
|---|---|---|---|
| **L21** | Friday after work, Jana and the VHS classmates meet at a café. Anna asks what everyone does in their free time. | Jana: "Ich fahre gern Fahrrad." Petra: "Ich spiele Gitarre." Carlos: "Ich koche — natürlich!" They discover their shared hobby: all three like going for walks. | Leisure activities vocabulary. `gern` + verb for preferences. Regular present tense verbs. |
| **L22** | Petra wants to learn rollerblading. She asks Jana if Jana can teach her. | "Kannst du Rollschuh fahren?" Jana: "Ja, ich kann das! Aber ich kann nicht gut erklären." They go to the Prater on Saturday. Jana tries to explain and fails comically. | `können` conjugation. Verb bracket/frame rule (`Ich kann nicht gut Rollschuh fahren`). |
| **L23** | At the Prater, Jana and Petra talk about their routines and how often they exercise. | Jana: "Ich fahre oft Fahrrad, aber ich laufe nie." Petra: "Ich treffe oft Freunde am Wochenende. Ich lese manchmal Bücher." They notice Jana reads (liest) and Petra drives (fährt) — stem changes. | Frequency adverbs (`oft, manchmal, selten, nie, immer`). Stem-changing verbs (`lesen→liest`, `treffen→trifft`, `fahren→fährt`). |
| **L24** | Jana shows her photography portfolio to Petra and Carlos on her phone at the café after the Prater. | Carlos: "Du kannst super Fotos machen! Das ist wirklich toll." Petra: "Ja, und du kannst auch gut zeichnen!" Jana returns the compliments. They discuss who in the class has what talents. | Compliments with `können` + adverb (`super, toll, wirklich gut`). Expressing enthusiasm and reactions. |
| **L25** | Jana tries to plan next week's schedule — she's juggling work, German class, cycling, and meeting friends. | "Am Montag arbeite ich. Am Dienstagnachmittag habe ich Deutschkurs. Am Samstag treffe ich Petra." She builds her week day by day, including times of day. | Days of the week. Parts of the day (`morgens, nachmittags, abends`). Temporal expressions with `am`. |

---

**WEEK 6 — Zeit, Termine und Essen (Time, Appointments & Food)**

| Lesson | Scene | What happens | Grammar hook |
|---|---|---|---|
| **L26** | Jana and Petra try to meet at a wine bar (Heuriger) in Wien-Grinzing on Saturday evening. | "Um wie viel Uhr treffen wir uns?" "Um acht Uhr?" "Nein, lieber um halb neun." They go back and forth until they agree. Jana asks Herr Gruber: "Wann öffnet das Lokal?" | Telling exact time (`um … Uhr`, `Viertel nach`, `halb`, `Viertel vor`). Temporal prepositions `um` and `am`. |
| **L27** | The meetup plan changes — Petra texts she's busy. They try to reschedule through a WhatsApp-style exchange. | Jana: "Weißt du, wann du Zeit hast?" Petra: "Ich weiß nicht genau. Vielleicht Sonntag?" Jana: "Gut, ich weiß, wo wir hingehen!" | `wissen` conjugation (`ich weiß, du weißt, er weiß`). Arranging a meeting. `hast du Zeit?` expressions. |
| **L28** | Saturday lunch — Jana and Petra visit the Naschmarkt (Vienna's famous open-air market) to buy ingredients. | Stallholder: "Was möchten Sie?" Jana: "Ich mag Erdbeeren. Ich mag keinen Fisch." Petra: "Ich mag Käse — haben Sie Bergkäse?" They choose items together. | Food vocabulary. `mögen` for preferences. `kaufen`, market vocabulary, weights and quantities. |
| **L29** | Sunday dinner at a Viennese Gasthaus. Jana and Petra order from the menu. | Waiter: "Was nehmen Sie?" Jana: "Ich nehme die Wiener Schnitzel, bitte." Petra: "Ich möchte die Suppe und dann einen Salat." Jana asks about vegetarian options. | Restaurant vocabulary. `nehmen` and `möchten` for ordering. Interacting politely with a waiter. |
| **L30** | After dinner Jana writes in her diary about the evening, what she wanted to order but couldn't find on the menu, and an embarrassing moment. | "Ich möchte öfter mit Petra ausgehen. Ich möchte auch mal Schnitzel selbst kochen." She compares what she `möchte` (wants) with what she `hat` (has). | `möchten` in all persons as a survival expression (Ich/du/er möchte). Expressing wishes and intentions. |

---

**WEEK 7 — Reisen und Unterwegs (Travel & Getting around)**

| Lesson | Scene | What happens | Grammar hook |
|---|---|---|---|
| **L31** | Jana has a one-day work trip to Salzburg. Monday morning at Wien Hauptbahnhof. | She buys a ticket: "Eine Fahrkarte nach Salzburg, bitte. Zweite Klasse." She asks about platforms, connections, and return times. Tom tells her: "Nimm die S-Bahn, nicht den Bus." | Transport vocabulary (Zug, Bus, S-Bahn, Fahrkarte, Gleis). Buying tickets. `nehmen` + transport. |
| **L32** | The train to Salzburg is delayed. Jana calls her Salzburg contact to say she'll be late. | "Ich komme später an. Der Zug kommt um 14:30 an, nicht um 13:00." Her contact: "Wann steigst du aus?" Separable verbs appear naturally in the phone call. | Separable verbs: `ankommen`, `einsteigen`, `aussteigen`, `abfahren`. Verb bracket in sentences. |
| **L33** | In Salzburg, Jana finishes her meeting and calls Petra back in Vienna. She arranges to be picked up. | Petra: "Ruf mich an, wenn du ankommst!" Jana: "Kannst du mich abholen? Ich rufe dich an." They plan the pickup using separable verbs in requests. | More separable verbs: `anrufen`, `abholen`, `aufmachen`, `zumachen`. Verb bracket in commands and questions. |
| **L34** | Jana misses her connecting bus in Salzburg. She asks strangers for help on the street. | A local woman helps her find the right stop. Jana apologizes, thanks her warmly — "Entschuldigung, ich verstehe das nicht. Können Sie mir helfen?" — and the woman patiently explains. | Expressing inability/difficulty (`ich verstehe nicht`, `ich kann nicht`). Asking for help politely. Politeness formulas. |
| **L35** | Back in Vienna, January Monday. Jana describes her typical day to Luisa, her new roommate who just moved in. | "Ich arbeite von neun bis siebzehn Uhr. Von siebzehn bis achtzehn Uhr fahre ich nach Hause. Abends lerne ich Deutsch." Luisa has a different schedule. They compare. | Daily routine vocabulary. Temporal prepositions `von … bis`. Combining time expressions. |

---

**WEEK 8 — Perfektum und Erinnerungen (Perfekt & Memories)**

| Lesson | Scene | What happens | Grammar hook |
|---|---|---|---|
| **L36** | Tuesday evening. Jana tells Petra about her Salzburg trip over the phone. | "Ich habe viel gemacht! Ich habe das Büro besucht, ich habe Kaffee getrunken… nein, ich habe Kaffee gemacht." She recounts the whole day using Perfekt. | Perfekt with `haben` + regular past participle (`ge-…-t`): `gemacht, besucht, gekauft, gefragt`. |
| **L37** | The story of the Salzburg trip gets retold at the VHS next day. The class asks questions. | "Hast du das Schloss gesehen?" "Nein, ich habe keine Zeit gehabt. Aber ich habe gut gegessen!" Irregular Perfekt forms emerge as Jana describes what she ate, saw, and did. | Perfekt with `haben` + irregular past participle (`ge-…-en`): `gesehen, gegessen, getrunken, gehabt`. |
| **L38** | Jana and Petra compare their years. "Letztes Jahr war ich noch in Bratislava." "Letzte Woche war das Wetter schön." | They recall seasons: "Im Winter ist es kalt. Im Sommer war Salzburg toll. Im Frühling gehen wir wieder hin!" They plan ahead while remembering the past. | Months and seasons. Past temporal expressions (`letztes Jahr`, `letzte Woche`, `letzten Sommer`). |
| **L39** | Jana recounts a walking tour of Salzburg's Altstadt she did alone on her free afternoon. | "Ich bin durch die Altstadt gegangen. Ich bin ins Museum gefahren. Ich bin am Ufer der Salzach gestanden." Movement verbs with `sein` Perfekt. | Perfekt with `sein` for motion/change verbs: `gehen→gegangen`, `fahren→gefahren`. The rule: movement = sein. |
| **L40** | Jana writes a postcard to her mother. She describes the Salzburg trip and how she feels about life in Vienna now. | "Liebe Mutter, ich war in Salzburg. Es war wunderschön. Ich hatte viel Glück mit dem Wetter. In Wien bin ich jetzt sehr glücklich." Simple Präteritum of `sein/haben`. | Präteritum of `sein` (`war, warst`) and `haben` (`hatte, hattest`). Used in written/narrative style. |

---

**WEEK 9 — In der Stadt und Dativ (City & Dative)**

| Lesson | Scene | What happens | Grammar hook |
|---|---|---|---|
| **L41** | Jana explores her new Viennese neighborhood (4. Bezirk — Wieden) on a Sunday walk. | She maps out the area: "Hier ist die Bäckerei. Dort ist das Café. Da drüben ist die Apotheke." She takes photos for her mom. | City locations vocabulary (Bäckerei, Apotheke, Supermarkt, Bahnhof, Park, Schule). Basic location expressions. |
| **L42** | Jana writes to her mother about why she likes her neighborhood. | "Es gibt eine Bäckerei um die Ecke und einen Park in der Nähe. Es gibt keine Disco — sehr gut!" Her mother asks "Gibt es auch ein Krankenhaus?" | `es gibt` + Akkusativ. Describing what exists in a place. Negation with `kein/keine` in Akkusativ. |
| **L43** | Herr Gruber, the elderly neighbor, helps Jana carry groceries up the stairs. They chat by the mailboxes. | "Das gefällt mir hier sehr gut! Das Haus ist schön." Herr Gruber: "Kann ich Ihnen helfen?" Jana thanks him warmly. She tells Luisa: "Er hat mir geholfen!" | Dative personal pronouns (`mir, dir, ihm, ihr, uns`). Verbs with Dative (`gefallen`, `helfen`, `danken`). |
| **L44** | A tourist stops Jana on the Mariahilfer Straße and asks directions to the Naschmarkt. | Jana explains slowly: "Gehen Sie geradeaus. Dann links abbiegen. Der Naschmarkt ist dann rechts." The tourist thanks her. Jana is proud she could help. | Giving directions vocabulary: `geradeaus, links, rechts, abbiegen, die erste Straße`. Direction-giving phrases. |
| **L45** | Same day, another person asks Jana where the nearest U-Bahn station is. Harder directions this time. | "Die Station ist neben dem Supermarkt, vor dem großen Hotel, hinter der Bäckerei." Jana uses a map on her phone to help. | Local prepositions with Dative: `neben, vor, hinter, an, zwischen` + Dativ forms (`dem, der`). |

---

**WEEK 10 — Meine Wohnung (My apartment)**

| Lesson | Scene | What happens | Grammar hook |
|---|---|---|---|
| **L46** | Jana needs to register her address officially (Meldezettel). She visits the Magistratisches Bezirksamt. | She waits, gets a number, finds the office: "Das Amt ist neben der Post, gegenüber dem Markt." The clerk helps her through the process. | Institutional vocabulary (Amt, Post, Polizei, Rathaus). Local prepositions with Dative continued: `gegenüber, zwischen`. |
| **L47** | Jana describes her apartment to her mother in a long Sunday phone call. | "Ich habe ein Wohnzimmer, ein Schlafzimmer und ein kleines Bad. Die Küche ist nicht groß, aber sie hat alles." Mother asks question after question. | Room names (Zimmer, Küche, Bad, Flur). Describing apartments. Wohnungs-vocabulary. `haben` + Akk for possessions. |
| **L48** | Luisa moves in and shows Jana her things. "Das ist mein Regal. Das ist ihre Lampe." Misunderstandings about whose is whose. | Jana: "Ist das dein Stuhl?" Luisa: "Nein, das ist ihr Stuhl — das gehört meiner Freundin." Jana sorts out the confusion carefully. | Possessive pronouns 3rd person Nominativ: `sein/seine` (his), `ihr/ihre` (her). Contrasting `mein/dein/sein/ihr`. |
| **L49** | A friend visits and wants to borrow Jana's yoga mat and Luisa's bike. Confusion about what belongs to whom. | "Kann ich dein Fahrrad nehmen?" Luisa: "Das ist nicht mein Fahrrad, das ist ihr Fahrrad — Janinas." They sort out whose bike and mat can be borrowed. | Possessives 3rd person in Akkusativ: `seinen/ihre`. Ownership and borrowing expressions. |
| **L50** | Jana and Luisa disagree about where to put the sofa and the bookshelf. They argue — nicely — until they find a solution. | "Das Sofa steht gut hier." Luisa: "Nein, stell es dort hin!" They rearrange the furniture three times. Herr Gruber knocks and offers his opinion. | Furniture placement: `stehen, stellen, legen, liegen, hängen`. Two-way prepositions (`an, auf, in, hinter, vor`) with Akkusativ for movement. |

---

**WEEK 11 — Geräte und Termine (Appliances & Appointments)**

| Lesson | Scene | What happens | Grammar hook |
|---|---|---|---|
| **L51** | The washing machine in the apartment breaks down. Jana calls the landlord (Vermieter). | Jana: "Die Waschmaschine funktioniert nicht. Das Gerät macht komische Geräusche." The landlord says he'll send someone. Jana also discovers the dishwasher won't start. | Household appliance vocabulary. Reporting a problem. `funktionieren`, `kaputt sein`. |
| **L52** | The repairman can come "in einer Stunde" or "nach dem Mittagessen" — Jana has to plan around her work. | Phone call: "Können Sie nach dem Mittag kommen? Ich bin erst ab drei Uhr zu Hause. Vor dem Abendessen bin ich weg." | Time prepositions with Dative: `in + Dativ` (in einer Stunde), `nach` (nach dem Essen), `vor` (vor dem Termin). |
| **L53** | Jana needs to reschedule her dentist appointment because of a last-minute work meeting. | Jana calls: "Ich muss den Termin leider verschieben. Können wir einen neuen Termin machen?" The receptionist offers alternatives. Jana also cancels a hair appointment. | Appointment scheduling language: `verschieben`, `absagen`, `einen Termin machen/haben`. Polite formulas. |
| **L54** | Late evening, Jana and Luisa talk over tea about their dreams and life plans. | Jana: "Ich möchte Deutsch perfekt lernen und in Wien bleiben. Ich will vielleicht eine eigene Designagentur." Luisa: "Ich will nächstes Jahr nach Berlin." | `möchten` vs `wollen` for wishes and intentions. Life goals vocabulary. Talking about the future at A1 level. |
| **L55** | New German colleague Markus joins the office. He meets everyone over coffee. Jana prepares it. | "Kaffee mit oder ohne Milch? Mit Zucker oder ohne Zucker?" Markus: "Mit Milch, bitte, aber ohne Zucker." Office introductions + beverage order. | Prepositions `mit` and `ohne` + Akkusativ. Objects in context of beverage/food. |

---

**WEEK 12 — Gesundheit und Imperative (Health & Commands)**

| Lesson | Scene | What happens | Grammar hook |
|---|---|---|---|
| **L56** | It's February. Jana comes home with a cold. Luisa takes charge. "Du wirst krank! Du sollst sofort ins Bett." Jana protests but Luisa insists. | Luisa checks Jana's temperature. "Du wirst immer kränker. Ich werde auch krank, wenn du nicht schläfst!" Jana gives in. | `werden` conjugation. `wollen` (Jana: "Ich will nicht ins Bett"). Expressing change of state. |
| **L57** | Jana goes to see Dr. Hirsch. He examines her and asks about symptoms. | "Wo tut es weh?" Jana points: "Hier tut es weh — der Hals, der Kopf. Meine Augen brennen." Dr. Hirsch carefully examines her. | Body parts vocabulary. `wehtun` expressions. Medical examination context. |
| **L58** | Dr. Hirsch's consultation continues. He asks Jana to describe exactly what she feels. | "Haben Sie Fieber? Husten? Wie lange sind Sie schon krank?" Jana describes: "Mein Kopf tut weh. Ich habe Fieber und keinen Appetit." | Symptoms vocabulary (Fieber, Husten, Schnupfen, Schmerzen). Describing pain and illness in detail. |
| **L59** | Dr. Hirsch prescribes medication. He explains when and how she should take it. | "Sie sollen dreimal täglich eine Tablette nehmen. Sie sollen viel Wasser trinken und nicht arbeiten." Jana calls Luisa to report. | `sollen` conjugation. Reporting doctor's instructions. Medical advice language. |
| **L60** | Jana picks up her prescription at the pharmacy. The pharmacist gives detailed instructions. | "Nehmen Sie die Tabletten nach dem Essen! Trinken Sie keinen Alkohol! Kommen Sie in einer Woche wieder!" Jana asks "Darf ich Sport machen?" | `Imperativ Sie` forms. Pharmacy vocabulary. Patient–pharmacist interaction. |

---

**WEEK 13 — Haushalt und Alltag (Household & Daily life)**

| Lesson | Scene | What happens | Grammar hook |
|---|---|---|---|
| **L61** | Spring cleaning Sunday. Jana and Luisa tackle the apartment together — but disagree on who does what. | Luisa: "Du kannst den Boden wischen, ich mache die Küche." Jana: "Warum immer ich? Ich wasche ab, aber ich bügle nicht!" A playful argument about chores. | Household chore vocabulary (wischen, aufräumen, kochen, bügeln, abwaschen). Expressing likes/dislikes about tasks. |
| **L62** | Jana is in her bedroom. Luisa gives orders from the kitchen while cooking. | "Kauf bitte Milch! Stell den Müll raus! Mach das Fenster auf!" Jana, amused, starts shouting back commands too: "Bring mir bitte einen Tee!" | `du`-Imperativ and `ihr`-Imperativ forms. Giving household commands. Imperative of separable verbs. |
| **L63** | Jana's friend Sophie visits with flowers. Jana introduces her to Luisa. Things get borrowed. | "Kannst du mir das Wasser geben?" "Bring es mir bitte." "Ich sehe dich morgen." Jana and Sophie use familiar pronouns throughout. | Accusative personal pronouns: `mich, dich, ihn, sie, uns`. Giving and receiving objects via pronouns. |
| **L64** | Jana is going on a first date. She describes her date to Luisa before leaving. | "Er ist groß und hat braune Haare und blaue Augen. Er ist schlank. Er sieht gut aus!" Luisa: "Wie alt ist er? Wie heißt er?" Jana is excited. | Physical appearance vocabulary (Haare, Augen, groß/klein, schlank, Bart). Describing people's looks. |
| **L65** | The date went well. Next morning over breakfast, Jana tells Luisa about his personality. | "Er ist sehr sympathisch. Ein bisschen unruhig, aber interessant. Nicht unhöflich — eigentlich sehr nett." Luisa dissects every detail. | Character/personality adjectives. `un-` prefix to form opposites (`unruhig, unhöflich, uninteressant`). |

---

**WEEK 14 — Gesellschaft und Meinungen (Society & Opinions)**

| Lesson | Scene | What happens | Grammar hook |
|---|---|---|---|
| **L66** | The morning after a spontaneous goodbye party for a colleague (Tom is moving to Berlin). Jana recaps. | "Das hat mir gut gefallen! Ich habe viel gelacht. Das Essen hat toll geschmeckt." Luisa: "Hat er gut gesungen?" Jana: "Nein, aber er hat es versucht!" | Perfekt of non-separable verbs (no `ge-` prefix): `gefallen → gefallen`, `verstehen → verstanden`, `beginnen → begonnen`. |
| **L67** | Jana hears office gossip about a new hire. She reacts politely and avoids drama. | "Man sagt, der neue Kollege ist sehr streng." Jana: "Man sollt nicht so viel reden." She uses `man` neutrally to discuss general social observations. | `man` as impersonal pronoun (`man sagt, man macht, man darf`). General social statements. |
| **L68** | New office building rules are posted. Jana reads them with Markus and they discuss. | "Hier darf man nicht rauchen. Man muss die Tür abschließen. Wir dürfen das Dach nicht betreten." Jana: "Und was müssen wir sonst noch?" | `müssen` vs `dürfen` — obligation vs permission. Signs and rules vocabulary. |
| **L69** | Jana gets a fine for putting recycling in the wrong bin. She reads Vienna's waste-sorting guide with Luisa. | "Man muss Glas hier, Papier dort, Bio dort einsortieren." Luisa explains the Viennese system, including public transport rules. Jana is amazed at the complexity. | Environmental/recycling vocabulary. Public rules. `müssen`, `dürfen`, `nicht dürfen`. |
| **L70** | Jana and Luisa argue over whether Vienna's recycling rules are too strict. A real opinion discussion. | Jana: "Ich finde, das ist zu kompliziert." Luisa: "Meiner Meinung nach ist das gut so." They go back and forth, each defending their view. | Opinion expressions: `Ich finde, …`, `Meiner Meinung nach …`, `Ich denke, …`. Basic A1 discussion phrases. |

---

**WEEK 15 — Mode, Vergleiche und Wetter (Fashion, Comparisons & Weather)**

| Lesson | Scene | What happens | Grammar hook |
|---|---|---|---|
| **L71** | April. Jana has an important client presentation and goes shopping for a new blouse on Mariahilfer Straße. | She enters a boutique: "Ich suche eine Bluse für eine Präsentation." Salesperson shows options. Jana is shocked by the price: "Das ist zu teuer! Haben Sie etwas Günstigeres?" | Clothing vocabulary. Shopping expressions. `suchen`, `anprobieren`, expressing surprise at prices. |
| **L72** | Jana can't decide between two jackets. Luisa helps via video call. | Jana holds up both: "Diese Jacke ist rot, jene ist blau. Welche soll ich kaufen?" Luisa: "Welche passt dir besser?" They debate `dieser/diese/dieses` vs a generic "die Jacke". | Demonstrative pronoun `dieser/diese/dieses`. Question word `welch-`. Pointing at specific items. |
| **L73** | Luisa and Jana compare the two shops on Mariahilfer Straße and the prices. | "Dieser Laden ist billiger als der Laden dort drüben. Die blaue Jacke ist schöner als die rote. Der rote ist teurer." Jana buys the blue one. | Comparative adjectives (`-er`): `schöner, billiger, besser, größer`. Comparison with `als` and `so … wie`. |
| **L74** | The day of the presentation — heavy rain in Vienna. Jana calls Luisa before leaving. | "Es regnet stark. Es ist sehr windig. Der Himmel ist grau. Ich hoffe, das Wetter wird besser." Her client from Hamburg arrives soaking wet and they bond over Austrian weather. | Weather vocabulary (Regen, Wind, Sonne, Schnee, Gewitter). Weather verbs (`es regnet, es schneit`). |
| **L75** | Jana and colleagues plan a hiking trip to the Wienerwald. They check the forecast together. | Tom: "Wir fahren, denn das Wetter wird gut." Jana: "Ich nehme einen Regenschirm mit, denn man weiß nie." They book it. Natural use of `denn` as a conjunction. | `denn` (causal conjunction). Outdoor/trip vocabulary. Two-way prepositions in activity context (`an, auf, in` + Akkusativ for destination). |

---

**WEEK 16 — Feiern und Abschluss (Celebrations & Finale)**

| Lesson | Scene | What happens | Grammar hook |
|---|---|---|---|
| **L76** | Jana's colleague Brigitte retires after 30 years. The office plans a surprise farewell party. | Jana writes in the card: "Ich wünsche dir alles Gute! Du bist unglaublich und wunderbar!" They struggle to find the right adjectives — and discover `-los` suffix: `herzlos`, `grenzenlos`, `hoffnungslos`. | Adjective suffix `-los` to form new adjectives. Wishes/congratulations Redemittel. |
| **L77** | Jana is asked to give a short speech at the party. She's terrified but Luisa helps her prepare. | "Ich würde gerne etwas sagen, aber ich spreche noch nicht so gut Deutsch." Luisa: "Ich würde an deiner Stelle einfach ehrlich sein." They practice together. | `Konjunktiv II` with `würde` + infinitive for polite wishes/hypotheticals: `Ich würde gerne …`, `Ich würde …`. |
| **L78** | Jana is invited to the birthday party of her Austrian friend Maria. It's her first German-style birthday party. | "Herzlichen Glückwunsch zum Geburtstag, Maria!" Jana learns Austrian birthday traditions — bringing flowers, not singing too early. She observes and participates. | Birthday vocabulary. German birthday phrases. DACH cultural note on birthday customs. |
| **L79** | Jana and Luisa plan a celebration trip — to Salzburg, this time as tourists. They book everything by date. | "Wir fahren am dritten Mai ab. Wir kommen am fünften Mai zurück. Unser Hotel ist vom dritten bis fünften Mai gebucht." | Ordinal numbers (erste, zweite, dritte…). Dates in German (`am dritten Mai`). Planning with exact dates. |
| **L80** | FINALE. Jana's last German class. Anna gives everyone a small task: speak for one minute about your "Glückstag" — your lucky day. | Jana stands up: "Mein Glückstag war der Tag, an dem ich in Wien angekommen bin. Ich war nervös. Ich habe kein Deutsch gekonnt. Aber jetzt kann ich!" She recalls moments from L01. The class applauds. Tears and cake. | Consolidation: Perfekt, Präteritum of sein/haben, `als`-clauses (simple), vocabulary from the entire course. Jana's complete arc is closed. |

---

The minitext dialogue and narrativeContext should reference Jana and her life — not generic textbook scenarios.

### WORKFLOW (sequential with data passing):
```
Orchestrator assigns: "Write L{NN}"
│
├─ Step 1: Read syllabus line + previous lesson + week's vocab exclusion list
│
├─ Step 2: Run Sub-agent 1A (Vocabulary Builder)
│   INPUT:  syllabus line, excluded vocab list, grammar level constraints
│   OUTPUT: vocab[] array (15-20 items) ──────────────────────┐
│                                                              │
├─ Step 3: Run Sub-agent 1B (Grammar Note Writer)             │
│   INPUT:  syllabus line, grammar level constraints           │
│   OUTPUT: grammarNote object ────────────────────────────────┤
│                                                              │
├─ Step 4: Run Sub-agent 1C (Minitext Dialogue Writer)        │
│   INPUT:  vocab[] from 1A + grammarNote from 1B + narrative  │
│   OUTPUT: minitext exercise object ──────────────────────────┤
│                                                              │
├─ Step 5: Run Sub-agent 1D (Exercise Generator — core 5)     │
│   INPUT:  vocab[] from 1A + grammarNote from 1B             │
│   OUTPUT: 5 core exercises (match, wordorder, fill, listen, │
│           mcq)                                              ┤
│                                                              │
├─ Step 6: Run Sub-agent 1E (Speaking Builder)                │
│   INPUT:  vocab[] from 1A + grammarNote from 1B             │
│   OUTPUT: speaking exercise object ──────────────────────────┤
│                                                              │
├─ Step 7: Run Sub-agent 1F (Extended Exercise Generator)     │
│   INPUT:  vocab[] from 1A + grammarNote from 1B             │
│   OUTPUT: 5 extended exercises (truefalse, dictation,       │
│           categorysort, translation, conjugation)           ┤
│                                                              │
├─ Step 8: Assemble all outputs into final lesson object      │
│   Add: flashcard exercise (instruction only, no items)       │
│   Add: reviewWords[], lessonNotes, skillFocus[], metadata    │
│   Verify: all 13 top-level fields present                    │
│   Verify: exercises in correct order:                        │
│     flashcard → match → wordorder → fill → listen → mcq →   │
│     minitext → speaking → truefalse → dictation →            │
│     categorysort → translation → conjugation                 │
│                                                              │
├─ Step 9: SELF-CHECK (see checklist below)                   │
│   If any check fails → fix before writing                    │
│                                                              │
└─ Step 10: Write file to src/data/lessons/L{NN}.js
```

### MANDATORY SELF-CHECK (Agent 1 runs before writing):

**STRUCTURE CHECKS:**
```
□ Export: export const lesson{NN} = { ... };
□ id matches filename: L05.js → id: 5
□ week and day are correct per syllabus
□ title is in GERMAN
□ narrativeContext is in GERMAN (simple, uses only prior grammar)
□ communicativeGoal starts with "Nach dieser Lektion kann ich..."
□ All 13 top-level fields present (id, week, day, title, topic, cefr, xpReward,
  narrativeContext, communicativeGoal, skillFocus, grammarNote, vocab, exercises,
  reviewWords, lessonNotes)
```

**VOCAB CHECKS:**
```
□ vocab has 15-20 items, each with all 8 required fields (de, sk, gender, srsId, example, exampleSk, recycledFrom)
□ No vocab[].de string appears in any other lesson in this week
□ vocab[] includes 3-5 communicative phrase/chunks (RULE A)
□ Every vocab[].example uses only grammar structures allowed at this level
□ Every vocab[].example is natural A1-level German a teacher would use
□ Enough CONTENT-SPECIFIC NOUNS: e.g. if topic is "professions" → at least 8 actual profession pairs (der/die), not filler words
```

**EXERCISE CHECKS (13 exercises required):**
```
□ exercises array has 13 items in this order:
  flashcard → match → wordorder → fill → listen → mcq → minitext → speaking → truefalse → dictation → categorysort → translation → conjugation
□ flashcard has NO items[] array
□ match has 8-10 [DE, SK] pairs — covering key lesson vocab
□ wordorder targets THIS lesson's grammarNote.rule (not random vocab), 4-6 sentences
□ wordorder words[] has NO punctuation tokens, correct has NO trailing ./?
□ fill has 4-8 questions, answer is case-sensitive and correct
□ listen field name is "questions" (NOT "pairs"), has 8-10 items
□ mcq has 4-8 questions, answer is a 0-based INTEGER (0, 1, 2, or 3), exactly 4 options per question
□ minitext text is ≤80 words, narrative form
□ minitext questions answer is 0-based integer, 3-5 questions
□ minitext grammar ceiling: text uses ONLY grammar structures from this lesson and prior (RULE B)
□ minitext question verification: EVERY question answer has a direct quote from the text (RULE C)
□ speaking has 5-8 phrases, each with tip ≤60 chars
□ truefalse has 5 statements about THIS lesson's grammar/vocab
□ dictation has 5 sentences using THIS lesson's vocabulary
□ categorysort has 2-3 categories relevant to THIS lesson topic
□ translation has 4 SK→DE sentences using THIS lesson's grammar structures
□ conjugation has 1-2 verbs with 3 forms each (ich/du/er) — if lesson teaches verbs
```

**CONTENT QUALITY CHECKS:**
```
□ grammarNote.explanation is a FULL paragraph (≥3 sentences), in Slovak
□ grammarNote has 4-8 examples
□ No smart quotes anywhere — only straight single quotes '
□ No Perfekt/Präteritum in L01-L10 examples
□ German content is factually correct (alphabet=30, genders verified)
□ All conjugations are correct (ich bin, du bist — not ich bist)
□ File is valid JavaScript with no syntax errors
□ ALL minitext Q&A explanations cite actual text quotes (not fabricated first-person dialogue)
□ categorysort categories are pedagogically meaningful (gender sorting, topic grouping, etc.)
□ truefalse statements test understanding, not just memory (mix of true and false, ~40%/60% split)
```

**SPIRAL GRAMMAR CHECK (L06+ ONLY — RULE C.1):**
```
For lessons L06 and beyond, BEFORE finalising fill and mcq exercises:
□ Identify which grammar rules were introduced in ALL prior lessons in this batch (consult RULE C.1)
□ fill: at least 1-2 questions test a grammar point from a PREVIOUS lesson (not the current one)
□ mcq: at least 1-2 questions test a grammar point from a PREVIOUS lesson
□ The distractor options in mcq questions exploit SPECIFIC prior-lesson confusion points
  (e.g. if L03 taught kommen/sprechen stem changes, an L07 mcq should include a stem-change trap)
□ wordorder: at least 1 sentence recycles a structure from a prior lesson alongside the new grammar
This is the Netzwerk/Menschen Spiral Syllabus requirement — vocabulary recycling alone is NOT enough.
```

### INVOCATION TEMPLATE:
```
You are the LESSON CONTENT AGENT. Your task: create the complete file L{NN}.js.

═══ CONTEXT ═══
SYLLABUS LINE: "{paste the exact line from A1_80_LESSONS_SYLLABUS.md}"
MODULE: {module name from syllabus}
WEEK: {W}, DAY: {D}
GRAMMAR LEVEL: {Präsens only | + modal verbs | + Perfekt | all A1}

NARRATIVE: Jana Nováková, Slovak woman in Vienna. This lesson she is:
"{1-2 sentence description of what Jana is doing this lesson}"

PREVIOUS LESSON TAUGHT: "{grammar + topic summary of L{NN-1}}"

═══ VOCABULARY EXCLUSION LIST ═══
These words are ALREADY used in other lessons this week — do NOT put them in vocab[]:
{comma-separated list of all de strings from sibling lessons}

═══ YOUR TASK ═══
1. Read INSTRUCTIONS.md for the exact JS schema for every field
2. Read docs/A1_80_LESSONS_SYLLABUS.md for the full curriculum context
3. Read L01.js through L05.js as GOLDEN REFERENCES for quality standard
4. Invoke sub-agents in sequence to build:
   a) 15-20 vocabulary items including 3-5 phrase chunks (Sub-agent 1A)
   b) Grammar note with full HTML explanation (Sub-agent 1B)
   c) Minitext narrative text (Sub-agent 1C) — needs vocab + grammar from a) and b)
   d) Core exercises: match, wordorder, fill, listen, mcq (Sub-agent 1D)
   e) Speaking exercise (Sub-agent 1E)
   f) Extended exercises: truefalse, dictation, categorysort, translation, conjugation
5. Assemble the complete lesson object with ALL 13 required top-level fields
6. Add flashcard exercise: { type: 'flashcard', instruction: '...' } — NO items array
7. Order exercises: flashcard, match, wordorder, fill, listen, mcq, minitext, speaking,
   truefalse, dictation, categorysort, translation, conjugation
8. Run the MANDATORY SELF-CHECK from docs/AGENT_SYSTEM.md (ALL sections)
9. Write the file to src/data/lessons/L{NN}.js

═══ LANGUAGE RULES ═══
- title, narrativeContext, communicativeGoal, exercise instructions: GERMAN
- topic, lessonNotes: SLOVAK
- grammarNote.explanation, slovakContrastNote: SLOVAK (pedagogical necessity)
- vocab[].de, example: GERMAN | vocab[].sk, exampleSk: SLOVAK
- All German must be natural — test: would a Muttersprachler say this?
- All Slovak must be standard Slovak, not Czech

═══ QUALITY RULES ═══
- Every exercise must have clear educational purpose — no filler
- Exercises must practice THIS lesson's grammar and vocabulary specifically
- Student should feel measurable progress after completing this lesson
- Content cannot be generic or pathetic — it must be specific to the topic
- The minitext must tell a micro-story involving Jana's world (use the specific scene from NARRATIVE WORLD, not a generic dialogue)

═══ SPIRAL GRAMMAR (L06+ ONLY — RULE C.1) ═══
For L06 and beyond, your fill + mcq exercises MUST actively test grammar from PRIOR lessons.
Consult this list of what was already taught:
- L01: sein/heißen conjugation (ich/du/er/Sie), alphabet, formal vs informal greetings
- L02: W-Fragen (Wie, Wer, Was, Woher, Wo), sein in questions, word order (Verb position 2)
- L03: kommen aus + country, sprechen + language, stem-vowel changes in sprechen (sprichst/spricht)
- L04: numbers 0-20, haben (ich habe, du hast, er hat), age expressions
- L05: professions with gender (-in suffix), arbeiten als + profession, der/die gender agreements
For L06-L10 specifically, include MCQ/fill traps for: sein forms, W-Frage word order, haben forms, gender of professions, number spelling.
```

---

### SUB-AGENT 1A: VOCABULARY BUILDER

**Responsibility:** Select and construct 15-20 vocabulary entries for one lesson.

**FIRST:** Before selecting any words, think like an experienced Goethe-certified German teacher. What 15-20 words would YOU teach a student in a real classroom for this topic? What words does the student genuinely need to communicate in this situation? Start from pedagogy, then fit the schema.

**Input received from Agent 1:**
- Syllabus line (what topic/grammar this lesson covers)
- Excluded vocab list (de strings already used in this week)
- Grammar level constraint (what tenses/structures are allowed)

**Rules:**

**Word selection:**
- Words MUST match the syllabus topic (e.g., L04 = numbers → include Zahl, eins, zwei...)
- Prioritize the **Goethe A1 Wortliste** — these are the actual exam words
- ZERO overlap with any word in the exclusion list
- Include 2-3 verbs relevant to the topic (in infinitive form: `'sprechen'`, NOT `'sprichst'`)
- Include relevant nouns WITH article: `'der Tisch'`, `'die Frau'`, `'das Kind'`
- Include 2-3 common phrases/adverbs for natural conversation
- Avoid meta-linguistic jargon (no "der Nominativ" as vocab — that's grammar, not vocabulary)

**Entry construction:**
```js
{
  de: string,           // German word/phrase. Verbs in infinitive. Nouns with article.
                        // Multi-word phrases as-is: 'guten Tag', 'auf Wiedersehen'
  sk: string,           // Slovak translation. Standard Slovak, NOT Czech.
                        // For ambiguous words, add context: 'ahoj (pri stretnutí)'
  gender: 'M'|'F'|'N'|null,  // M/F/N for nouns ONLY. null for everything else.
                        // 'der Name' → 'M'. 'sprechen' → null. 'gut' → null.
                        // VERIFY gender — never guess. der/die/das determines M/F/N.
  srsId: 'L{NN}_V{01..99}',  // Sequential. L05_V01 through L05_V15. Unique globally.
  example: string,      // A natural German sentence using this word.
                        // Must be natural, real A1-level German — the kind of sentence
                        // an experienced teacher would use in class.
                        // Grammar constraint: only use structures allowed at this level
                        //   (Präsens for L01-L10, etc.) — this applies to GRAMMAR, not vocab.
                        // Vocabulary: use ANY natural A1 words. Do NOT restrict to "only
                        //   words from this lesson". Students learn from context and exposure.
                        // BAD: "Ich heiße. Du heißt. Er heißt." (robotic, unnatural)
                        // GOOD: "Der Arzt arbeitet im Krankenhaus." (natural, contextual)
  exampleSk: string,    // Accurate Slovak translation of the example sentence.
  recycledFrom: [],     // Empty [] for first appearance. Array of srsIds if recycled.
}
```

**Quality verification before returning:**
- Count: exactly 15-20 items
- Every `de` field is real German (no invented words)
- Every `gender` is factually correct (check der/die/das)
- Every `example` respects grammar level STRUCTURES (no Perfekt in L01-L10)
- Every `example` is natural A1-level German — the kind a teacher would say in class
- Every `sk` is correct Slovak (not Czech: ďakujem not děkuji)
- No duplicate `srsId` values
- No smart quotes — only straight single quotes `'`

**Output:** Complete `vocab[]` array ready for insertion.

---

### SUB-AGENT 1B: GRAMMAR NOTE WRITER

**Responsibility:** Write the `grammarNote` object explaining this lesson's grammar concept.

**FIRST:** Before writing anything, think like an experienced Goethe-certified German teacher explaining this grammar to a Slovak adult beginner. How would you explain it simply? What comparison to Slovak grammar helps the most? What common mistake do Slovak students make with this rule? Start from real teaching experience, then format into the schema.

**Input received from Agent 1:**
- Syllabus line (specifies which grammar this lesson introduces)
- Grammar level constraint
- Previous lesson's grammar (for building continuity)

**The grammar note serves two consumers:**
1. **LessonView.jsx** — shows as a card before exercises start
2. **GrammarGuide.jsx** — shows in the searchable grammar reference, grouped by week

**Construction rules:**

```js
grammarNote: {
  rule: string,
    // German title of the grammar concept.
    // Short and specific: 'Konjugation: sein und heißen'
    // NOT vague: 'Grammatik Lektion 1'
    // This is searchable in GrammarGuide — make it descriptive.

  explanation: string,
    // LANGUAGE: Slovak (pedagogical necessity — A1 students cannot read German grammar explanations)
    // LENGTH: Full paragraph, minimum 3-5 sentences. This is the student's primary grammar reference.
    // CONTENT: Must explain:
    //   1. What the rule IS (definition)
    //   2. How it WORKS (formation/pattern)
    //   3. When to USE it (context)
    //   4. Common MISTAKES to avoid
    // NEVER leave empty — GrammarGuide shows a blank card if this is empty.
    // BAD: 'Sloveso sein sa časuje.' (one sentence, useless)
    // GOOD: 'V nemčine musí byť pri slovese vždy vyjadrený podmet...' (full paragraph)

  examples: [
    { de: string, sk: string, note?: string }
  ],
    // 4-8 examples. Each is TTS-clickable in GrammarGuide.
    // Examples must demonstrate the SPECIFIC grammar rule systematically:
    //   - Show all relevant forms (e.g., all persons for a verb conjugation)
    //   - Progress from simple to complex
    //   - Include at least one question form if the lesson involves questions
    // Optional `note` field: brief annotation like 'Pozor: nepravidelný tvar'
    // Grammar level: only structures allowed for this lesson's level

  slovakContrastNote: string,
    // LANGUAGE: Slovak
    // PURPOSE: Explain how this grammar point differs from Slovak
    // Slovak students make specific transfer errors — address those directly
    // BAD: 'V nemčine je to inak.' (vague, useless)
    // GOOD: 'V slovenčine môžeme povedať "Som Peter." bez zámena "ja", pretože
    //        tvar slovesa vyjadruje osobu. V nemčine však musíte VŽDY použiť
    //        aj zámeno: "Ich bin Peter." — podmet nikdy nesmie chýbať.'
}
```

**Quality verification:**
- `explanation` is ≥3 sentences and covers definition, formation, usage, common errors
- `examples` show the rule systematically (not random sentences)
- `slovakContrastNote` addresses real Slovak→German transfer errors
- All German in examples is grammatically correct
- All Slovak is accurate standard Slovak
- Grammar level is respected (no advanced structures in early lessons)

**Output:** Complete `grammarNote` object.

---

### SUB-AGENT 1C: MINITEXT DIALOGUE WRITER

**Responsibility:** Write the minitext exercise — a short storytelling dialogue that brings the lesson to life.

**FIRST:** Before writing any dialogue, think like an experienced Goethe-certified German teacher creating a reading exercise. What real-life situation would naturally use this vocabulary and grammar? How would real people actually talk in this situation? Write a conversation you'd be proud to use in your own classroom. Natural, engaging, useful — never robotic or artificial.

**Input received from Agent 1:**
- `vocab[]` array from Sub-agent 1A (available words)
- `grammarNote` from Sub-agent 1B (grammar structures to use)
- Narrative context (what Jana is doing this lesson)
- Grammar level constraint

**This is the HEART of each lesson.** This is where the student sees the vocabulary and grammar used in a real conversation. It must be engaging, not textbook-sterile.

**Construction rules:**

```js
{
  type: 'minitext',
  instruction: string,    // German instruction, e.g., 'Lies den Dialog und beantworte die Fragen.'
  text: string,           // The German dialogue. See format rules below.
  textSk: string,         // Complete Slovak translation (shown on demand).
  questions: [            // 3-5 comprehension questions.
    {
      question: string,   // German question about the text.
      options: string[],  // Exactly 4 German options.
      answer: number,     // 0-based index of correct option.
      explanation: string,// German explanation quoting relevant part of the text.
    }
  ]
}
```

**Dialogue rules:**
- **Speakers:** 2-3 characters. One should be Jana or someone from her world.
- **Format:** Each turn on a new line, speaker name followed by colon:
  ```
  Jana: Hallo! Ich bin Jana.
  Peter: Guten Tag, Jana. Ich heiße Peter.
  ```
- **Length:** 40-80 German words. Not too short (trivial), not too long (overwhelming).
- **Content strategy:**
  1. Use at least 60% of the lesson's vocabulary naturally in the dialogue
  2. Demonstrate the grammar rule from grammarNote at least 3 times in context
  3. Include both statements AND questions (so student sees declarative + interrogative)
  4. Build a mini-story with a beginning, middle, and end (not just Q&A ping-pong)
- **Naturalness test:** Would two real people in this situation actually say this?
  - BAD: "Ich heiße Jana. Ich buchstabiere: J-A-N-A. Ich bin Jana. Ich sage hallo."
    (robotic, repetitive, no conversation flow)
  - GOOD: "Jana: Hallo! Ich bin Jana.\nPeter: Hallo Jana. Wie heißt du? — Ach, Jana! Ich bin Peter."
    (natural hesitation, flow, personality)

**Comprehension question rules:**
- Test understanding of CONTENT (what happened, who said what, why)
- NOT trivia (what's the 3rd word in line 2)
- NOT grammar drills disguised as comprehension (those belong in mcq/fill)
- At least one question should require inference (not just find-the-text)
- Explanations should quote the relevant part of the dialogue

**Quality verification:**
- Word count of `text`: 40-80 German words
- At least 60% of vocab[] words appear in the dialogue
- Grammar rule demonstrated at least 3 times
- Dialogue has natural conversation flow, not robotic
- Slovak translation is accurate and complete
- Questions test comprehension, not memorization
- All answers are 0-based integers matching the correct option

**Output:** Complete minitext exercise object.

---

### SUB-AGENT 1D: EXERCISE GENERATOR

**Responsibility:** Generate 5 exercises: match, wordorder, fill, listen, mcq.

**FIRST:** Before creating any exercise, think like an experienced Goethe-certified German teacher designing a worksheet. What does the student need to practice right now? What mistakes will they likely make? How can each question help them internalize the pattern? Design exercises that a real teacher would use in class — purposeful, clear, progressive.

**Input received from Agent 1:**
- `vocab[]` array from Sub-agent 1A
- `grammarNote` object from Sub-agent 1B
- Grammar level constraint

**CRITICAL PRINCIPLE:** Every single exercise item must have a clear learning objective. The student should think "ah, now I understand this better" after each question — never "what was the point of that?"

**Exercise specifications:**

#### MATCH exercise:
```js
{
  type: 'match',
  instruction: string,   // German: 'Verbinde das deutsche Wort mit der Übersetzung.'
  pairs: [
    ['German word', 'Slovak translation'],  // Exactly 2-element arrays
    // ...
  ]  // 6-10 pairs
}
```
- Pairs MUST come from this lesson's vocab[] array
- Use the EXACT `vocab[].de` and `vocab[].sk` values — no paraphrasing
- Select a mix: some nouns, some verbs, some phrases
- Order: easier/shorter words first

#### WORDORDER exercise:
```js
{
  type: 'wordorder',
  instruction: string,   // German: 'Ordne die Wörter zu einem korrekten Satz.'
  sentences: [
    {
      words: string[],     // Shuffled tokens. Each token = one word. NO punctuation tokens.
      correct: string,     // The correct sentence. NO trailing period/question mark.
      hint: string,        // Slovak translation — helps student understand the target meaning.
      explanation: string, // WHY this word order is correct — reference the grammar rule.
    }
  ]  // 4-6 sentences
}
```
**CRITICAL:** This exercise MUST drill the specific grammar rule of this lesson.
- L01 grammar = sein/heißen conjugation → wordorder sentences use sein/heißen
- L03 grammar = kommen aus/sprechen → wordorder sentences use kommen aus
- L17 grammar = Akkusativ → wordorder sentences use Akkusativ constructions
- NEVER just random vocabulary sentences — that defeats the purpose

**Word token rules:**
- Each token is exactly one word: `['Ich', 'bin', 'Peter']`
- NO punctuation as separate tokens: NOT `['Ich', 'bin', 'Peter', '.']`
- The `correct` string has NO trailing punctuation: `'Ich bin Peter'` NOT `'Ich bin Peter.'`
- The component compares `built.join(' ')` to `correct` (case-insensitive)
- `words[]` should be shuffled (not in correct order)

**Explanation must reference the grammar rule:**
- BAD: `'Toto je správne.'` (says nothing)
- GOOD: `'Sloveso "bin" stojí vždy na druhom mieste vo vete. Podmet "Ich" je na prvom mieste.'`

#### FILL exercise:
```js
{
  type: 'fill',
  instruction: string,   // German: 'Ergänze das fehlende Wort.'
  questions: [
    {
      sentence: string,   // German sentence with '___' as blank.
      answer: string,     // The correct word. CASE-SENSITIVE.
      hint: string,       // Slovak translation hint. Shown on lightbulb click.
      explanation: string, // Why this is the correct answer.
    }
  ]  // 4-8 questions
}
```
**Strategy for creating good fill questions:**
- Mix of grammar fills (conjugation: "Ich ___ Peter" → "bin") and vocab fills ("Guten ___" → "Tag")
- The blank should test ONE clear concept — not be ambiguously fillable
- The `answer` must be unambiguous — only one word can correctly fill the blank
- BAD: "Ich ___ gut." (could be "bin" or "finde" or "lerne" — too ambiguous)
- GOOD: "Wer ___ du?" (only "bist" works — tests sein conjugation)

#### LISTEN exercise:
```js
{
  type: 'listen',
  instruction: string,   // German: 'Höre das Wort und schreibe es auf.'
  questions: [           // FIELD NAME IS "questions", NOT "pairs"
    { de: string, sk: string }
  ]  // 6-10 items
}
```
- Component uses TTS to speak `de` at 0.75x speed
- Student types what they hear, then checks against `de`
- Normalization: ä→ae, ö→oe, ü→ue, ß→ss accepted
- **Order: simple short words first → longer compound words last**
- Include words with tricky German pronunciation relevant to this lesson

#### MCQ exercise:
```js
{
  type: 'mcq',
  instruction: string,   // German: 'Wähle die richtige Antwort.'
  questions: [
    {
      question: string,    // The question text (in German).
      options: string[],   // EXACTLY 4 options.
      answer: number,      // 0-BASED INDEX. 0=first, 1=second, 2=third, 3=fourth.
      explanation: string, // Why the correct answer is correct + why wrong ones are wrong.
    }
  ]  // 4-8 questions. Mix of grammar AND vocabulary.
}
```
**Creating good MCQ distractors (wrong options):**
- Each wrong option should represent a COMMON MISTAKE a student might make
- BAD distractors: random unrelated words ("Tisch", "Katze", "blau" for a verb question)
- GOOD distractors: plausible errors:
  - For conjugation Q: wrong person forms (bist/bin/ist/sind)
  - For vocab Q: similar-sounding words or false friends
  - For gender Q: all three article options + a common mistake
- All 4 options should be the same type (all verbs, or all nouns, or all translations)
- The correct answer should not be obviously different in length or format

**MCQ question type mix (per lesson):**
- 2-3 grammar questions (testing the lesson's specific grammar rule)
- 2-3 vocabulary questions (testing word meanings from this lesson)
- 1-2 usage questions (when would you say X?)

**Quality verification for all exercises:**
- Every question has educational purpose aligned to this lesson's content
- No trick questions, no ambiguous answers
- All German is grammatically correct
- All answers are factually correct
- MCQ `answer` is a 0-based integer (0, 1, 2, or 3) — NEVER a string
- WordOrder `correct` has no trailing punctuation
- Fill `answer` is case-sensitive and unambiguous
- Listen `questions` (not `pairs`) field name used

**Output:** Array of 5 exercise objects (match, wordorder, fill, listen, mcq).

---

### SUB-AGENT 1E: SPEAKING & PRONUNCIATION BUILDER

**Responsibility:** Generate the speaking exercise for self-assessed pronunciation practice.

**FIRST:** Before selecting phrases, think like an experienced Goethe-certified German teacher running a pronunciation drill. What sounds are the hardest for Slovak speakers? What phrases does the student need to say out loud to feel confident in a real conversation? Pick phrases the student will actually USE when they speak German in real life.

**Input received from Agent 1:**
- `vocab[]` array from Sub-agent 1A
- `grammarNote` from Sub-agent 1B

**How SpeakingExercise.jsx works:**
- Shows each phrase with a TTS play button
- Student listens, then tries to say it out loud
- Student self-assesses: "Zvládol som" (got it) or "Treba zopakovať" (need to repeat)
- Score = percentage of phrases marked as zvládol
- NO speech recognition API — purely self-assessed

**Construction rules:**
```js
{
  type: 'speaking',
  instruction: string,   // German: 'Höre zu und sprich nach.'
  phrases: [
    {
      de: string,   // German phrase to pronounce.
      sk: string,   // Slovak translation.
      tip: string,  // Pronunciation tip, max 60 chars.
    }
  ]  // 5-8 phrases
}
```

**Phrase selection strategy:**
1. Start with 1-2 single words that have tricky pronunciation from this lesson's vocab
2. Then 2-3 short phrases (2-3 words) using the lesson's grammar
3. End with 2-3 full sentences from the lesson's dialogue/examples
4. This progression builds confidence: word → phrase → sentence

**Pronunciation tip rules:**
- Maximum 60 characters
- Focus on sounds that are DIFFERENT from Slovak pronunciation
- Use IPA-lite notation: `[v]`, `[ø]`, `[ç]`
- Examples:
  - `'W = [v], nicht wie slowakisch'`
  - `'ß = scharfes s, wie ss'`
  - `'ie = langes [í], ei = [aj]'`
  - `'ch nach i/e = [ç] (weich)'`
  - `'Betonung auf der ersten Silbe'`
  - `'ü = Lippen rund wie bei u, Zunge wie bei i'`
- BAD: `'Vyslovuj správne.'` (says nothing useful)
- GOOD: `'au = [au] wie im Slowakischen'` (specific, actionable)

**Quality verification:**
- 5-8 phrases in progressive difficulty order
- Every `tip` is ≤60 chars and addresses a specific pronunciation feature
- Phrases use this lesson's vocabulary and grammar
- Slovak translations are accurate

**Output:** Complete speaking exercise object.

---

### SUB-AGENT 1F: EXTENDED EXERCISE GENERATOR

**Responsibility:** Generate 5 extended exercises: truefalse, dictation, categorysort, translation, conjugation.

**FIRST:** Before creating any exercise, think like an experienced Goethe-certified German teacher designing the second half of a lesson worksheet. The student has already completed 8 exercises (flashcard through speaking). These 5 exercises reinforce and deepen what was practiced — they are NOT fillers. Each must have a distinct pedagogical purpose.

**Input received from Agent 1:**
- `vocab[]` array from Sub-agent 1A
- `grammarNote` object from Sub-agent 1B
- Grammar level constraint
- The lesson's topic and narrative context

**Exercise specifications:**

#### TRUEFALSE exercise:
```js
{
  type: 'truefalse',
  instruction: string,   // German: 'Entscheide: Richtig oder Falsch?'
  statements: [
    {
      statement: string,    // A German statement about grammar rules, vocabulary, or cultural knowledge.
      isTrue: boolean,      // true or false.
      explanation: string,  // Slovak explanation of WHY it's true/false. Be specific and educational.
    }
  ]  // Exactly 5 statements.
}
```

**Strategy for creating good truefalse statements:**
- **2-3 true statements + 2-3 false statements** (never all true or all false)
- Statements MUST test THIS lesson's grammar rules — not random trivia
- Each statement should teach something when the explanation is shown

**Types of good statements (pick a mix):**
| Type | True example (L01) | False example (L01) |
|---|---|---|
| **Conjugation rule** | "Ich bin" ist die richtige Form von "sein" für "ich". | "Du bist" ist die richtige Form von "sein" für "er/sie". |
| **Word order rule** | In einem deutschen Aussagesatz steht das Verb auf Position 2. | Das Verb steht immer am Ende des Satzes. |
| **Vocabulary fact** | "Guten Tag" ist eine formelle Begrüßung. | "Tschüss" ist eine formelle Verabschiedung. |
| **Gender fact** | "Name" ist maskulin: "der Name". | "Frau" ist maskulin: "der Frau". |
| **Usage context** | "Wie heißt du?" fragt nach dem Namen. | "Woher kommst du?" fragt nach dem Alter. |

**What makes a BAD truefalse statement:**
- BAD: "Das deutsche Alphabet hat 26 Buchstaben." (tests trivia, not THIS lesson's grammar)
- BAD: "Deutsch ist schwer." (subjective, not testable)
- BAD: "Jana heißt Jana." (trivially true, teaches nothing)
- BAD: Statements that require knowledge not yet taught

**Explanation rules:**
- Write in SLOVAK — the student reads explanations to understand why
- Be specific: "Správne je 'du bist', nie 'du bin'. 'bin' patrí k 'ich'."
- For false statements, explain what the CORRECT answer is: "Nesprávne. 'Tschüss' je neformálne. Formálne je 'Auf Wiedersehen'."

---

#### DICTATION exercise:
```js
{
  type: 'dictation',
  instruction: string,   // German: 'Höre den Satz und schreibe ihn auf.'
  sentences: [
    {
      de: string,    // The German sentence (spoken via TTS, student writes it).
      sk: string,    // Slovak translation (shown after answer for comprehension).
      hint: string,  // Optional hint (shown if student struggles).
    }
  ]  // Exactly 5 sentences.
}
```

**How DictationExercise.jsx works:**
- TTS speaks `de` at 0.7x speed (auto-play on new sentence)
- Student has two speed buttons: normal (0.7x) and slow (0.45x)
- Student types what they hear
- Uses `normalizeGerman()`: ä→ae, ö→oe, ü→ue, ß→ss accepted
- After checking, shows correct `de` and `sk` translation
- Score: percentage of correctly written sentences

**Sentence selection strategy (progressive difficulty):**
1. **Sentence 1**: Short, 3-4 words, simple vocabulary: `'Ich heiße Jana.'`
2. **Sentence 2**: Medium, 4-5 words, includes a verb form: `'Wie heißt du?'`
3. **Sentence 3**: Medium, includes the lesson's grammar pattern: `'Ich bin aus der Slowakei.'`
4. **Sentence 4**: Longer, 5-7 words, uses a phrase chunk: `'Was machst du von Beruf?'`
5. **Sentence 5**: Full natural sentence, 6-8 words, combines multiple lesson elements

**Content rules:**
- Use ONLY vocabulary and structures from THIS lesson and prior lessons
- Favor sentences from the lesson's minitext, examples, or speaking phrases
- Include at least 1 sentence with a tricky German sound (ä, ö, ü, ß, ch, sch, ei, ie)
- The `sk` translation helps comprehension after the exercise — make it accurate
- The `hint` is optional — use it for longer sentences: `'Počúvaj pozorne prvé slovo'`

**What makes BAD dictation sentences:**
- BAD: "Hallo." (too trivially short — nothing to write)
- BAD: "Der Informatiker arbeitet im Büro und seine Kollegin kommt aus Österreich." (too long, overwhelming at A1)
- BAD: Sentences using grammar not yet taught
- BAD: Sentences with no lesson-relevant vocabulary

---

#### CATEGORYSORT exercise:
```js
{
  type: 'categorysort',
  instruction: string,   // German: 'Ordne die Wörter in die richtige Kategorie.'
  categories: [
    {
      name: string,    // Category label (e.g., 'Begrüßung', 'der-Berufe').
      color: string,   // One of: 'blue', 'rose', 'green', 'amber', 'purple', 'gray'.
      words: string[], // German words belonging to this category.
    }
  ],  // 2-4 categories.
  explanation: string,  // Slovak explanation shown after completion.
}
```

**How CategorySortExercise.jsx works:**
- Words from ALL categories are shuffled and displayed as clickable tiles
- Student moves/clicks each word into the correct category column
- Categories are color-coded (blue, rose, green, amber, purple, gray)
- `explanation` is shown after all words are sorted
- Score: percentage of correctly sorted words

**Category selection strategy — MUST be pedagogically meaningful:**

Every lesson topic has at least one natural classification. Use THIS lesson's topic:

| Lesson topic | Good categories | Bad categories |
|---|---|---|
| Greetings (L01) | Begrüßung / Verabschiedung / Höflich | Kurze Wörter / Lange Wörter |
| W-Fragen (L02) | W-Fragewörter / Positive Wörter / Negative Wörter | Vokale / Konsonanten |
| Countries (L03) | Länder / Sprachen / Verben | Wörter mit 'e' / Wörter ohne 'e' |
| Numbers (L04) | Unregelmäßig (0-12) / Regelmäßig (13-19) / Zehnerzahlen | Gerade / Ungerade |
| Professions (L05) | der-Berufe (maskulin) / die-Berufe (feminin) | Einfache / Schwere |
| Family (L07) | Männlich / Weiblich | - |
| Food (L25) | Essen / Getränke / Geschirr | - |

**The golden rule:** After sorting, the student should understand a CONCEPT (gender system, greeting conventions, regular vs irregular) — not just have rearranged words randomly.

**Content rules:**
- Use 4-6 words per category (total 8-15 words across all categories)
- Words come from THIS lesson's vocab (not random external words)
- Color coding should be consistent across lessons where applicable:
  - `'blue'` for masculine (der) nouns when sorting by gender
  - `'rose'` for feminine (die) nouns when sorting by gender
  - `'green'` for neuter (das) nouns when sorting by gender
- `explanation` (Slovak) should state the rule the student just practiced:
  `'Maskulínne povolania používajú "der" (der Arzt, der Lehrer). Feminínne povolania používajú "die" (die Ärztin, die Lehrerin).'`

**What makes BAD categorysort:**
- BAD: Sorting by word length or alphabetical groups (no pedagogical value)
- BAD: Categories with only 2 words each (too easy, nothing to learn)
- BAD: All words are obviously in one category (no challenge)
- BAD: Categories that don't relate to THIS lesson's learning goal

---

#### TRANSLATION exercise:
```js
{
  type: 'translation',
  instruction: string,   // German: 'Übersetze den Satz ins Deutsche.'
  sentences: [
    {
      sk: string,          // Slovak sentence to translate.
      answer: string,      // Correct German translation.
      hint: string,        // German vocabulary hint.
      explanation: string, // Slovak grammar explanation.
    }
  ]  // Exactly 4 sentences.
}
```

**How TranslationExercise.jsx works:**
- Shows `sk` (Slovak sentence) — student types German translation
- Uses `normalizeGerman()` for comparison (ä→ae accepted, etc.)
- `hint` is shown as vocabulary help
- `explanation` is shown after checking
- TTS speaks correct `answer` after correct attempt
- Score: percentage of correct translations

**Sentence selection strategy (SK→DE):**
1. **Sentence 1**: Short phrase, 2-3 words, key vocabulary: `sk: 'Dobrý deň!'` → `answer: 'Guten Tag!'`
2. **Sentence 2**: Simple sentence using the lesson's grammar: `sk: 'Ja som Jana.'` → `answer: 'Ich bin Jana.'`
3. **Sentence 3**: A question form: `sk: 'Ako sa voláš?'` → `answer: 'Wie heißt du?'`
4. **Sentence 4**: Longer, combining vocabulary + grammar: `sk: 'Odkiaľ pochádzaš?'` → `answer: 'Woher kommst du?'`

**Content rules:**
- Use ONLY grammar structures from this lesson and prior (grammar ceiling applies!)
- The `answer` must be ONE correct translation (the most natural German phrasing)
  - If multiple valid translations exist, pick the one that uses THIS lesson's target grammar
- `hint` should give 1-2 key German words (NOT the full answer): `'heißen, du'`
- `explanation` should reference the grammar rule: `'Sloveso "heißen" sa časuje: ich heiße, du heißt. Podmet musí byť vyjadrený.'`

**What makes BAD translation sentences:**
- BAD: Slovak sentences that could translate into German in 3+ ways equally (ambiguous)
- BAD: Sentences using grammar the student hasn't learned yet
- BAD: `hint` that gives away the complete answer: `hint: 'Ich bin Jana'` for answer `'Ich bin Jana'`
- BAD: `explanation` that says nothing: `'Toto je správne.'`

---

#### CONJUGATION exercise:
```js
{
  type: 'conjugation',
  instruction: string,   // German: 'Ergänze die Konjugation.'
  verbs: [
    {
      infinitive: string,    // German infinitive: 'sein', 'heißen', 'kommen'.
      translation: string,   // Slovak: 'byť', 'volať sa', 'prísť'.
      forms: [
        { pronoun: string, correct: string }  // 3 forms minimum.
      ],
      note: string,          // Slovak grammar note about this verb.
    }
  ]  // 1-2 verbs per lesson (2 preferred if lesson teaches verbs).
}
```

**How ConjugationExercise.jsx works:**
- Shows verb infinitive + translation at the top
- For each pronoun, student fills in the correct form
- After all forms filled, student clicks "Skontrolovať" (check)
- TTS speaks each correct form
- `note` is displayed as a grammar card below the table
- Score: percentage of correctly filled forms

**Verb selection strategy:**
- Use ONLY verbs that are explicitly taught in THIS lesson (from grammarNote or vocab[])
- L01: `sein` + `heißen` (both in grammarNote)
- L03: `kommen` + `sprechen` (topic: countries + languages)
- L05: `arbeiten` + `machen` (topic: professions)
- For each verb, include AT LEAST these 3 pronoun forms: `ich`, `du`, `er/sie/es`
- For irregular verbs (sein, haben, werden), consider adding all 6 forms

**Form entries:**
```js
// For 'sein' (L01):
forms: [
  { pronoun: 'ich', correct: 'bin' },
  { pronoun: 'du', correct: 'bist' },
  { pronoun: 'er/sie/es', correct: 'ist' },
]

// For 'sprechen' (L03, stem-vowel change):
forms: [
  { pronoun: 'ich', correct: 'spreche' },
  { pronoun: 'du', correct: 'sprichst' },  // ← e→i change!
  { pronoun: 'er/sie/es', correct: 'spricht' },  // ← e→i change!
]
```

**Note content rules:**
- Write in SLOVAK
- Explain what makes this verb special (regular pattern, irregular, stem-vowel change)
- For regular verbs: `'Pravidelné sloveso. Kmeň "arbeit-" + koncovky: -e, -est, -et.'`
- For irregular: `'Nepravidelné sloveso. Tvary si treba zapamätať: bin, bist, ist, sind, seid, sind.'`
- For stem-vowel change: `'Sloveso so zmenou kmeňovej samohlásky: e→i v 2. a 3. osobe (du sprichst, er spricht).'`

**What makes BAD conjugation exercises:**
- BAD: Verbs not taught in this lesson (e.g., 'schlafen' in L01 — not in vocab or grammar)
- BAD: Only `ich` form (too easy, doesn't show the pattern)
- BAD: Empty `note` (misses the teaching moment)
- BAD: Wrong conjugation forms (VERIFY every form against standard German)

---

**Quality verification for ALL 5 extended exercises:**
- Every exercise has clear educational purpose aligned to THIS lesson's content
- truefalse has mix of true/false with specific grammar-oriented statements
- dictation uses progressive sentence length (short→long)
- categorysort categories are pedagogically meaningful (not arbitrary)
- translation sentences match the lesson's grammar ceiling
- conjugation targets ONLY verbs from THIS lesson
- All German is grammatically correct
- All Slovak is standard Slovak (not Czech)
- All field names match the component's expectations exactly
- Item counts meet minimums: truefalse=5, dictation=5, categorysort=2+, translation=4, conjugation=1+

**Output:** Array of 5 exercise objects (truefalse, dictation, categorysort, translation, conjugation).

---

### SUB-AGENT 1G: COMPREHENSIVE RECAP GENERATOR (every 30 lessons)

**Responsibility:** After every 30th lesson milestone **and** after the final lesson L80, generate a large comprehensive recap lesson. This is a major consolidation session covering ALL vocabulary and grammar from the previous 30 lessons (or 20 lessons for the L80 finale).

**Trigger conditions:**
- `lessonNum % 30 === 0` → generates `L{NN}R.js` covering 30 lessons
- `lessonNum === 80` → generates `L80R.js` covering L61–L80 (20 lessons, course finale)

| Milestone | File | Covers | Lessons |
|---|---|---|---|
| L30 | `L30R.js` | L01–L30 | 30 lessons |
| L60 | `L60R.js` | L31–L60 | 30 lessons |
| L80 | `L80R.js` | L61–L80 | 20 lessons (finale) |

> **Note:** `L10R.js` and `L20R.js` were generated under an older mini-recap system (10-lesson scope) and are kept for backward compatibility. Going forward only the 30-lesson comprehensive recaps apply.

**The recap lesson uses the same schema as a normal lesson, with these overrides:**
```js
{
  id: lessonNum + 0.5,           // e.g., 30.5, 60.5, 80.5
  week: Math.ceil(lessonNum / 5),
  day: 6,                        // Saturday
  title: `Rückblick: Lektionen ${startL}–${lessonNum}`,
  topic: `Veľké opakovanie lekcií ${startL}–${lessonNum}`,
  cefr: 'A1',
  xpReward: 60,                  // Higher reward — this is a major milestone
  narrativeContext: `Jana schaut zurück auf alles, was sie in den letzten ${lessonCount} Lektionen gelernt hat — eine große Konsolidierung.`,
  communicativeGoal: `Po tomto opakovaní viem aktívne používať všetku slovnú zásobu a gramatiku z lekcií ${startL}–${lessonNum}.`,
  skillFocus: ['vocabulary', 'grammar', 'reading', 'listening', 'speaking', 'writing', 'pronunciation'],
  lessonNotes: `Veľké komplexné opakovanie ${lessonCount} lekcií (L${startL}–L${lessonNum}). Žiadna nová látka — iba precvičovanie. ${exercises.length} cvičení.`,
  grammarNotes: [],              // Empty — no new grammar
  vocab: [],                     // Empty — no new vocab (uses prior lessons)
  exercises: [ ... ],            // 20+ exercises — see below
  reviewWords: [],
}
```

**After generation, manually add to `curriculum.js`:**
```js
// At top of file:
import { lesson30R } from './lessons/L30R.js';
import { lesson60R } from './lessons/L60R.js';
import { lesson80R } from './lessons/L80R.js';

// In LESSONS array (after the final lesson of the block):
lesson30,
lesson30R,  // Comprehensive recap: L01–L30
lesson31,
...
lesson60,
lesson60R,  // Comprehensive recap: L31–L60
lesson61,
...
lesson80,
lesson80R,  // Comprehensive recap: L61–L80 (finale)
```

**Exercise generation for recap — MUST include ALL of these (quantity in parentheses):**

| # | Type | Count | What it covers |
|---|------|-------|---------------|
| 1 | `flashcard` | 1 | Auto-built from vocab pool of reviewed lessons |
| 2 | `match` | 2 exercises | 8-10 pairs each. Splits the lesson block into two halves. |
| 3 | `wordorder` | 2 exercises | 6 sentences each. Mix grammar rules from all lessons. |
| 4 | `fill` | 2 exercises | 8 questions each. First: grammar-focused. Second: vocab-focused. |
| 5 | `listen` | 1 exercise | 10 items. Mix of hardest words from all lessons. |
| 6 | `mcq` | 2 exercises | 8 questions each. Mix grammar traps from all lessons' rules. |
| 7 | `minitext` | 1 exercise | Longer text (100-120 words). Uses vocab from all lessons. 5 questions. |
| 8 | `speaking` | 1 exercise | 10 phrases. Key phrases from all lessons. |
| 9 | `truefalse` | 1 exercise | 8 statements. Grammar rules from all lessons. |
| 10 | `dictation` | 1 exercise | 8 sentences. Progressive difficulty across the lessons' content. |
| 11 | `categorysort` | 1 exercise | 3-4 categories. Sort vocab by grammar concept (e.g., gender, verb type). |
| 12 | `translation` | 1 exercise | 6 sentences. Key structures from all lessons. |
| 13 | `conjugation` | 1 exercise | 3-4 verbs from across the lessons. |

**Total: ~18-20 exercises** per comprehensive recap.

**Input to Sub-agent 1G:**
- All vocab from the covered lessons (extracted from lesson files)
- All grammarNote.rule values from those lessons
- Grammar level ceiling for lessonNum

**Critical rules:**
- NO new vocabulary — every word must come from the reviewed lessons
- Exercises must test UNDERSTANDING, not just recognition — harder than original lesson exercises
- MCQ distractors must exploit real confusion points between grammar rules of different lessons
- The minitext must combine vocabulary and grammar from multiple lessons naturally
- Fill exercises should include "trap" questions where two grammar rules from different lessons could apply
- wordorder sentences should mix structures from different lessons in the same sentence
- This is a CONSOLIDATION lesson — the student should feel challenged but not overwhelmed

**Output:** A complete lesson object ready for file write.

---

## AGENT 2: STORY CONTENT AGENT

**Owner of:** `src/data/stories.js`
**Mission:** Create Readle-style graded reading stories with sentence-by-sentence translation, clickable grammar cards, and comprehension quizzes.

### MUST READ:
- `src/data/stories.js` (existing 6 stories — learn the exact schema)
- `src/views/StoryReader.jsx` (how stories are rendered)
- `src/views/StoryBrowser.jsx` (how stories are listed)
- `docs/A1_80_LESSONS_SYLLABUS.md` (align story themes with curriculum)

### WRITES TO:
- `src/data/stories.js` (append new story objects)

### STORY SCHEMA:
```js
{
  id: 'story_NN',
  title: string,           // German title
  titleSk: string,         // Slovak title
  level: 'A1',
  week: number,            // Curriculum-aligned week
  theme: string,           // One-line theme description
  sentences: [
    {
      de: string,          // German sentence
      sk: string,          // Slovak translation
      words: [             // Clickable words with grammar info
        {
          word: string,
          translation: string,
          grammar: string,  // e.g., 'Verb, Präsens, 3. Person Singular'
          example: string,  // Additional example sentence
        }
      ]
    }
  ],
  quiz: [
    {
      question: string,
      options: string[],   // 4 options
      answer: number,      // 0-based
      explanation: string,
    }
  ]
}
```

### RULES:
- Stories must use vocabulary from the lessons of the aligned week
- Grammar complexity must match the week's CEFR stage
- 10-20 sentences per story
- 3-5 quiz questions per story
- Narrator voice should be natural, engaging, age-appropriate
- Every sentence must have at least 2-3 clickable words with grammar cards

---

## AGENT 3: VIDEO CONTENT AGENT

**Owner of:** `src/data/videoLibrary.js`, `src/data/video-database/*.json`
**Mission:** Process YouTube videos into the app's learning format with subtitles, Slovak translations, segments, and exercises.

### MUST READ:
- `src/data/videoLibrary.js` (existing 7 videos — schema)
- `src/data/video-database/` (existing JSON files — structure)
- `src/views/VideoCoach.jsx` (how video data is consumed)
- `src/components/VideoExercises.jsx` (exercise rendering)
- `src/utils/parseSrt.js` (SRT parsing logic)

### WRITES TO:
- `src/data/videoLibrary.js` (add new video entries)
- `src/data/video-database/{videoId}.json` (subtitles + translations)
- `src/data/video-database/{videoId}-segments.json` (topic segments)
- `src/data/video-database/{videoId}-exercises.json` (per-segment exercises)

### WORKFLOW:
```
1. Orchestrator provides: YouTube video ID + SRT file
2. Agent parses SRT into timestamped subtitle entries
3. Agent translates each subtitle line to Slovak
4. Agent segments video into topical chunks (3-5 min each)
5. Agent generates exercises per segment (wordorder, fill, mcq)
6. Agent writes all 3 JSON files + updates videoLibrary.js
```

---

## AGENT 4: PASSIVE PHASE AGENT

**Owner of:** `src/data/phrases.js`
**Mission:** Create/extend the Lampariello passive listening/dictation phrase database (currently 50 days of content).

### MUST READ:
- `src/data/phrases.js` (existing structure and 50 days)
- `src/views/PassivePhase.jsx` (how phrases are rendered)
- `docs/A1_80_LESSONS_SYLLABUS.md` (align phrases with curriculum weeks)

### WRITES TO:
- `src/data/phrases.js`

### PHRASE DAY SCHEMA:
```js
{
  day: number,
  theme: string,           // Day's theme
  phrases: [
    {
      de: string,          // German phrase
      sk: string,          // Slovak translation
      note: string,        // Grammar/pronunciation note
    }
  ]  // 8-10 phrases per day
}
```

### RULES:
- Phrases for days 1-10 use only Week 1-2 vocabulary
- Phrases for days 11-20 use Weeks 3-4 vocabulary (+ recycling earlier)
- Progressive difficulty: short phrases → full sentences → mini-dialogues
- Every phrase must be something a real A1 student would need to say
- No phrases that sound like textbook filler

---

## AGENT 5: ARENA CONTENT AGENT

**Owner of:** Exercise Arena templates and AI generation logic
**Mission:** Ensure the Exercise Arena has quality randomized exercises from all unlocked lessons, plus well-crafted AI generation prompts.

### MUST READ:
- `src/views/ExerciseArena.jsx` (full component)
- `src/data/curriculum.js` (LESSONS array)
- `src/hooks/useAI.js` (AI generation functions)

### WRITES TO:
- `src/views/ExerciseArena.jsx` (prompt templates, exercise selection logic)

### RESPONSIBILITIES:
- Review and improve AI prompts used for dynamic exercise generation
- Ensure randomized exercise selection covers vocabulary AND grammar balanced
- Verify difficulty scaling based on user's unlocked lesson level
- Add new exercise type generators (e.g., cloze deletion, sentence transformation)

---

## AGENT 6: AI CONVERSATION AGENT

**Owner of:** AI conversation character configs, system prompts, scenario design
**Mission:** Create engaging, pedagogically sound AI conversation scenarios for the 5 conversation characters.

### MUST READ:
- `src/views/AIConversation.jsx` (full component, character definitions)
- `src/hooks/useAI.js` (sendConversationMessage implementation)
- `docs/A1_80_LESSONS_SYLLABUS.md` (align conversations with curriculum)

### WRITES TO:
- `src/views/AIConversation.jsx` (character configs, system prompts, scenario templates)

### RESPONSIBILITIES:
- Define conversation scenarios tied to curriculum weeks (e.g., Week 1: introductions, Week 3: shopping)
- Craft system prompts that keep AI responses at A1 level
- Design correction strategies (how the AI gently corrects grammar)
- Create starter prompts that guide students into practicing specific grammar
- Ensure each character has a distinct personality and purpose

---

## AGENT 7: QA / BUG HUNTER AGENT

**Owner of:** Quality validation across the entire codebase
**Mission:** Find and fix schema violations, broken exercises, wrong indexes, missing fields, grammar errors, and runtime issues.

### MUST READ:
- `INSTRUCTIONS.md` (all schema rules)
- Every file it's validating (100% — never skip lines)
- All exercise components (to know what fields are actually read)

### WRITES TO:
- Any file where it finds a bug (with evidence)

### VALIDATION CHECKLIST (per lesson file):
```
[ ] Export name matches: export const lesson{NN}
[ ] id matches filename number
[ ] All 13 top-level fields present
[ ] vocab[]: 15-22 items, all 8 fields per item
[ ] vocab[].srsId: format L{NN}_V{01-99}, unique
[ ] vocab[].gender: M/F/N for nouns, null for others
[ ] vocab[].example: uses only allowed grammar for this lesson level
[ ] No items[] in flashcard exercise
[ ] exercises[]: all 13 required types present in correct order:
    flashcard → match → wordorder → fill → listen → mcq → minitext → speaking →
    truefalse → dictation → categorysort → translation → conjugation
[ ] mcq answer: 0-based integer (not string, not 1-based)
[ ] minitext answer: 0-based integer
[ ] minitext text: ≤80 words
[ ] wordorder correct: no trailing punctuation
[ ] wordorder words[]: no punctuation tokens
[ ] wordorder targets lesson's grammarNote.rule
[ ] fill explanation: non-empty string
[ ] mcq explanation: non-empty string
[ ] listen field name: questions (not pairs)
[ ] speaking tip: ≤60 chars
[ ] truefalse: 5 statements, each has statement + isTrue + explanation
[ ] dictation: 5 sentences, each has de + sk
[ ] categorysort: 2-3 categories, each has name + color + words[]
[ ] translation: 4 sentences, each has sk + answer + hint + explanation
[ ] conjugation: 1-2 verbs, each has infinitive + translation + forms[] + note
[ ] grammarNote.explanation: full paragraph (not empty)
[ ] No smart quotes anywhere
[ ] No Perfekt/Präteritum in L01-L10 examples
[ ] All German factually correct (alphabet=30, genders verified)
[ ] Build passes after fixes
```

### INVOCATION TEMPLATE:
```
You are the QA BUG HUNTER AGENT.

SCOPE: Validate L{NN}.js (or "all lessons L01-L80" for full sweep)

1. Read INSTRUCTIONS.md completely
2. Read every line of the target file(s)
3. Run the validation checklist above
4. For each violation found, report:
   - File, line number
   - What's wrong
   - What the correct value should be
5. Fix all violations directly in the file
6. Verify build passes
```

---

## AGENT 8: DOCUMENTATION SYNC AGENT

**Owner of:** `INSTRUCTIONS.md`, `docs/APP_OVERVIEW.md`
**Mission:** Keep documentation synchronized with the actual codebase. Currently ~40% of docs are outdated.

### MUST READ:
- `INSTRUCTIONS.md` (current state)
- `docs/APP_OVERVIEW.md` (current state)
- `src/App.jsx` (routing, views, state)
- `src/components/Sidebar.jsx` (actual nav items)
- `src/hooks/useProgress.js` (actual progress schema)
- `src/hooks/useAI.js` (actual AI provider)
- All views in `src/views/` (actual features)

### WRITES TO:
- `INSTRUCTIONS.md`
- `docs/APP_OVERVIEW.md`

### KNOWN DISCREPANCIES TO FIX:
| What docs say | What code actually does |
|------|------|
| 6 sidebar nav items | 12 nav items |
| GPT-4o-mini (OpenAI) | Gemini 2.5 Flash Lite (Google) |
| No real SRS | Full SM-2 SRS implemented |
| localStorage only | Hybrid localStorage + file API |
| 7 view IDs | 18+ view IDs |
| ~6 progress fields | ~20 progress fields |
| No MiniText component | MiniTextExercise.jsx exists |
| No mention of: Arena, VideoCoach, Stories, PlacementTest, StudyCoach, WeeklyTest, LessonTest, Interleaved mode | All implemented |

---

## AGENT 9: VOCAB TRAINER AGENT

**Owner of:** `src/views/VocabTrainer.jsx` optimization
**Mission:** Optimize the SRS flashcard system, ensure proper vocab coverage across all 80 lessons, tune deck-building logic.

### MUST READ:
- `src/views/VocabTrainer.jsx`
- `src/hooks/useProgress.js` (SM-2 algorithm, reviewVocab)
- All `src/data/lessons/L*.js` (to audit vocab completeness)

### WRITES TO:
- `src/views/VocabTrainer.jsx`

### RESPONSIBILITIES:
- Verify all 80 lessons' vocab feeds correctly into the trainer
- Audit SM-2 parameters (initial ease factor, interval growth)
- Ensure deck building prioritizes: due cards → new cards → review
- Add features: filter by week, filter by mastery level, search
- Verify TTS works on all vocab words

---

## AGENT 10: GRAMMAR GUIDE AGENT

**Owner of:** `src/views/GrammarGuide.jsx` content quality
**Mission:** Ensure every lesson's grammarNote is complete, accurate, and renders properly in the Grammar Guide view.

### MUST READ:
- `src/views/GrammarGuide.jsx` (rendering logic)
- All 80 `grammarNote` objects from all lessons
- `docs/A1_80_LESSONS_SYLLABUS.md` (what grammar each lesson should cover)

### WRITES TO:
- `src/data/lessons/L*.js` (grammarNote sections only)
- `src/views/GrammarGuide.jsx` (if UI improvements needed)

### VALIDATION:
- Every lesson has `grammarNote.explanation` that is a FULL paragraph (not empty, not one sentence)
- Every lesson has 4-8 `examples` with de + sk
- Grammar rule aligns with what the syllabus says for that lesson
- `slovakContrastNote` is present and meaningful
- Searchable index works (rule text + explanation text)
- Week grouping is correct

---

## AGENT 11: DASHBOARD / UX AGENT

**Owner of:** Dashboard, WeeklyPlan, Welcome, OnboardingModal, StudyCoach, MethodGuide
**Mission:** Ensure the user experience is cohesive — new user onboarding flows smoothly, dashboard shows correct stats, weekly plan reflects curriculum accurately.

### MUST READ:
- `src/views/Dashboard.jsx`
- `src/views/WeeklyPlan.jsx`
- `src/views/Welcome.jsx`
- `src/views/StudyCoachPage.jsx`
- `src/views/MethodGuide.jsx`
- `src/components/OnboardingModal.jsx`
- `src/components/Sidebar.jsx`
- `src/data/curriculum.js` (WEEKLY_PLAN)

### WRITES TO:
- Any of the above files

### RESPONSIBILITIES:
- Verify all 12 sidebar nav items work correctly
- Dashboard accurately calculates XP, streak, completion %
- Weekly Plan shows all 16 weeks with correct lesson titles
- Welcome page mentions all 12 sub-apps
- MethodGuide (Príručka) documents all features
- Onboarding flow introduces key features
- Study Coach gives relevant recommendations based on progress

---

## AGENT 12: TESTING AGENT

**Owner of:** PlacementTest, WeeklyTest, LessonTest content and calibration, **Saturday/Sunday recap quality**
**Mission:** Ensure tests are fair, well-calibrated, and test the right skills at the right difficulty. Ensure the weekend recap system works correctly and provides genuine consolidation value.

### MUST READ:
- `src/views/PlacementTest.jsx`
- `src/views/WeeklyTest.jsx` — **753 lines. Read ALL of it.** Understand `buildQuestionPool()` algorithm.
- `src/components/exercises/LessonTest.jsx`
- `src/views/WeeklyPlan.jsx` — Day 6+7 cards with navigation buttons
- `src/views/VocabTrainer.jsx` — Saturday vocab review activity
- `src/views/PassivePhase.jsx` — Sunday passive listening activity
- `src/views/GrammarGuide.jsx` — Sunday grammar review activity
- `src/data/phrases.js` — PassivePhase content (must be week-aligned)
- **RULE H** in this document — Weekend Recap System specification
- Relevant lesson files (to know what was taught each week)

### WRITES TO:
- Above components (test logic, question selection, scoring)
- `src/data/phrases.js` — if passive phase content is misaligned with curriculum weeks

### RESPONSIBILITIES:

#### Placement Test:
- Placement test correctly unlocks appropriate lessons based on score

#### Lesson-End Tests:
- Lesson-end tests are mini-assessments of the just-completed lesson
- Scoring is fair: student who learned the material scores 80%+
- No trick questions, no material not covered in lessons

#### Weekly Test (Saturday — RULE H):
- Weekly tests pull exercises from **exactly that week's 5 lessons** — not more, not less
- `buildQuestionPool(lessons)` must produce exactly 20 questions: 5 Hörverstehen + 8 Leseverstehen + 7 Wortschatz
- **Balance check:** Every lesson in the week must contribute at least 1 question (no lesson should be ignored)
- **Distractor quality:** Wrong answer options must be plausible (same week's vocabulary, same word category)
- **Section integrity:**
  - Hörverstehen: TTS plays German word/phrase → student selects Slovak from 4 options
  - Leseverstehen: MCQ questions about lesson content → pulled from lesson mcq exercises
  - Wortschatz: German shown → select correct Slovak → distractors from same-week vocab
- **Difficulty calibration:** Test should feel like review, not new learning. 80%+ expected for attentive student.
- No question should test material NOT covered in the week's 5 lessons
- The test UI must work identically for all 16 weeks

#### Weekend Navigation (WeeklyPlan.jsx):
- Saturday card shows: "Test →" button + "Slovíčka →" button
- Sunday card shows: "Počúvanie →" button + "Gramatika →" button
- All 4 buttons must navigate to the correct sub-app views
- Saturday actions should only be available after all 5 weekday lessons are completed

#### Passive Phase Alignment (Sunday):
- `phrases.js` content for each curriculum week must use vocabulary and grammar from that week's lessons
- GrammarGuide must render all 5 grammarNote entries for the reviewed week correctly

### WEEKEND AUDIT CHECKLIST (run for each week 1–16):
```
□ WeeklyTest generates exactly 20 questions for this week
□ All 5 lessons contribute at least 1 question each
□ Hörverstehen questions: TTS works, 4 plausible options each
□ Leseverstehen questions: relevant to lesson content
□ Wortschatz distractors: from same week's vocab pool, plausible
□ VocabTrainer includes all vocab from this week's 5 lessons
□ phrases.js has week-aligned content for PassivePhase
□ GrammarGuide shows all 5 grammar rules for this week
□ WEEKLY_PLAN.tips for this week is specific and actionable
□ WeeklyPlan.jsx Day 6+7 buttons navigate correctly
```

---

## AGENT 13: PEDAGOGICAL LESSON AUDITOR

**Owner of:** Content quality validation across all 80 lessons
**Mission:** Audit every lesson as an experienced Goethe-certified German teacher would — verifying curriculum alignment, natural German, progressive learning curve, sentence quality, and real educational value for the student. This is NOT a technical bug hunter (that's Agent 7). This agent reads content like a TEACHER, not like a parser.

### WHY THIS AGENT EXISTS (separate from Agent 7)

| Agent 7 (QA Bug Hunter) | Agent 13 (Pedagogical Auditor) |
|---|---|
| "Is `answer` a 0-based integer?" | "Is this the best question to test this grammar point?" |
| "Are all 8 exercise types present?" | "Do the exercises build progressively within the lesson?" |
| "Is `grammarNote.explanation` non-empty?" | "Is the grammar explanation clear and helpful for a Slovak learner?" |
| "Is `minitext` ≤80 words?" | "Does the minitext use natural German a native speaker would write?" |
| "Does `srsId` follow format?" | "Does the vocabulary selection cover the Goethe A1 Wortliste properly?" |
| Schema compliance | Pedagogical quality |

### MUST READ before any work:
| File | Why |
|------|-----|
| `docs/A1_80_LESSONS_SYLLABUS.md` | **THE curriculum** — the source of truth for what each lesson must teach |
| `INSTRUCTIONS.md` | Technical schema (to understand data structure) |
| `docs/AGENT_SYSTEM.md` | Rule Zero, language rules, quality expectations |
| Every `L##.js` file being audited | 100% of every line — never skim |
| The PREVIOUS and NEXT lesson files | To verify continuity and progressive difficulty |
| `docs/CURRICULUM.md` | Week structure and module themes |

### WRITES TO:
- Audit report (returned to orchestrator)
- Does NOT directly edit lesson files — it produces findings, Agent 1 fixes them

### AUDIT DIMENSIONS (6 pillars)

#### PILLAR 1: Curriculum Alignment
```
For each lesson L{NN}:
[ ] Does the lesson topic match A1_80_LESSONS_SYLLABUS.md entry for L{NN}?
[ ] Does grammarNote.rule cover the grammar specified in the syllabus?
[ ] Does the vocabulary align with the module theme (e.g. Module 1 = Intro/Professions/Family)?
[ ] Is the grammar level appropriate? (no Perfekt before L36, no Akuzativ before L17, etc.)
[ ] Does the lesson fit its position in the 16-week curriculum?
[ ] Are Goethe A1 Wortliste words prioritized over obscure vocabulary?
```

#### PILLAR 2: Natural German Quality
```
For EVERY German sentence in the lesson (vocab examples, exercises, minitext, dialogue):
[ ] Would a native German speaker actually say this?
[ ] Is it grammatically correct?
[ ] Are articles and genders factually correct?
[ ] Are verb conjugations correct for the subject?
[ ] Does it sound natural, not machine-generated?
[ ] No awkward collocations (e.g. "Ich mache eine Frage" instead of "Ich stelle eine Frage")?
[ ] No sentences that are technically correct but nobody would ever say?
    BAD:  "Der Hund ist ein Tier." (technically true, but useless — who says this?)
    GOOD: "Mein Hund heißt Max." (natural, conversational)
[ ] No sentences with strange or nonsensical meaning?
    BAD:  "Die Lampe trinkt Wasser." (absurd)
    BAD:  "Ich kaufe ein Pferd im Supermarkt." (technically grammatical, but weird)
    GOOD: "Ich kaufe Brot im Supermarkt." (normal, useful)
```

#### PILLAR 3: Progressive Learning Curve
```
Across the full set of lessons being audited:
[ ] Does each lesson introduce exactly ONE new grammar concept (not zero, not three)?
[ ] Is the grammar progression logical? (Präsens → Modal → Perfekt → Präteritum)
[ ] Does vocabulary difficulty increase gradually?
[ ] Are earlier lessons simpler in sentence length and structure?
[ ] Are later lessons more complex with compound sentences?
[ ] Does the student feel progress? (Lesson 20 should feel harder than Lesson 5)
[ ] No sudden difficulty spikes or drops?
[ ] Review/recycling: do later lessons reference vocabulary from earlier ones?
```

#### PILLAR 4: Exercise Quality
```
For each exercise in each lesson:
[ ] Does the exercise actually test what it claims to test?
[ ] MCQ: Are distractors plausible but clearly wrong? (not trick questions)
[ ] MCQ: Is there exactly ONE correct answer? (no ambiguity)
[ ] Fill: Is the blank testing a meaningful grammar/vocab point?
[ ] Fill: Could a student who learned this lesson answer correctly?
[ ] WordOrder: Does the sentence demonstrate the lesson's grammar rule?
[ ] Minitext: Is the text engaging and relevant to the lesson topic?
[ ] Minitext: Are comprehension questions answerable from the text alone?
[ ] Speaking: Are phrases useful in real-life A1 situations?
[ ] Match: Are the pairs testing lesson vocabulary specifically?
[ ] Listen: Are words ordered from simple → complex?
[ ] No exercises that test knowledge NOT yet taught in this or earlier lessons
[ ] No exercises so easy they teach nothing ("Hallo = Ahoj" in Lesson 40)
[ ] No exercises so hard they frustrate (Konjunktiv II in Lesson 5)
```

#### PILLAR 5: Educational Value
```
For each lesson as a whole:
[ ] Would a student finishing this lesson know something NEW and USEFUL?
[ ] Is the communicativeGoal achievable after completing the exercises?
[ ] Does the narrativeContext (Jana's story) make sense at this point?
[ ] Are vocabulary items useful for real A1 communication? (Goethe exam + daily life)
[ ] No filler words that have zero practical value at A1 level
[ ] Are grammar explanations (in Slovak) clear enough for self-study?
[ ] Does slovakContrastNote actually help a Slovak speaker avoid a real mistake?
[ ] Would this lesson prepare a student for the Goethe A1 exam?
```

#### PILLAR 6: Cross-Lesson Consistency
```
Across ALL audited lessons:
[ ] No vocabulary duplicates between lessons (each word appears in vocab[] of exactly one lesson)
[ ] Consistent difficulty progression (not zigzagging)
[ ] Consistent tone and style (Jana's narrative doesn't contradict itself)
[ ] Grammar rules build on each other (no orphan concepts)
[ ] The 80-lesson journey makes sense as a complete A1 course
[ ] Module transitions are smooth (e.g., Module 1→2 doesn't feel disconnected)
[ ] By Lesson 80, student should be ready for Goethe A1 exam
```

### SEVERITY LEVELS FOR FINDINGS

| Level | Meaning | Example |
|-------|---------|--------|
| **P0 — CRITICAL** | Student learns something WRONG | Wrong gender, wrong conjugation, wrong grammar level |
| **P1 — MAJOR** | Lesson fails its educational purpose | Exercises don't test the grammar rule, minitext is off-topic |
| **P2 — MODERATE** | Content is weak but not wrong | Boring vocabulary choices, generic exercises, weak explanations |
| **P3 — MINOR** | Polish needed | Awkward phrasing, suboptimal word order in examples |

### OUTPUT FORMAT

The agent returns a structured report:
```
## PEDAGOGICAL AUDIT REPORT — L{NN} (or L{XX}–L{YY})

### SUMMARY
- Lessons audited: X
- P0 Critical: X findings
- P1 Major: X findings  
- P2 Moderate: X findings
- P3 Minor: X findings
- Overall verdict: PASS / NEEDS REWORK / FAIL

### CURRICULUM ALIGNMENT
[findings per lesson]

### SENTENCE QUALITY FLAGS
[every unnatural/wrong/strange sentence found, with correction]

### PROGRESSIVE CURVE ANALYSIS
[graph-like description of difficulty across lessons]

### EXERCISE QUALITY
[findings per exercise per lesson]

### EDUCATIONAL VALUE
[findings per lesson]

### CROSS-LESSON ISSUES
[consistency findings]

### RECOMMENDED FIXES
[ordered by severity, with specific corrections]
```

### INVOCATION TEMPLATES

**Single lesson audit:**
```
You are AGENT 13: PEDAGOGICAL LESSON AUDITOR.

Apply RULE ZERO first: think like an experienced Goethe-certified German teacher.

SCOPE: Audit L{NN}.js for pedagogical quality.

1. Read docs/A1_80_LESSONS_SYLLABUS.md — find the entry for L{NN}
2. Read the lesson file L{NN}.js — every line
3. Read L{NN-1}.js and L{NN+1}.js for continuity context
4. Run ALL 6 PILLAR checklists against the lesson
5. For every German sentence in the file, verify:
   - Natural? Would a native speaker say this?
   - Grammatically correct? Articles, conjugations, word order?
   - Appropriate difficulty for this lesson's position?
6. Produce the structured audit report
7. Do NOT edit any files — return findings only
```

**Full week audit (5 lessons):**
```
You are AGENT 13: PEDAGOGICAL LESSON AUDITOR.

Apply RULE ZERO first: think like an experienced Goethe-certified German teacher.

SCOPE: Audit Week {W} (L{XX}–L{YY}) as a complete learning unit.

1. Read docs/A1_80_LESSONS_SYLLABUS.md — find all entries for Week {W}
2. Read ALL 5 lesson files in order
3. Read the LAST lesson of the previous week for continuity
4. Run ALL 6 PILLAR checklists
5. Pay SPECIAL attention to Pillar 3 (progressive curve) and Pillar 6 (cross-lesson consistency)
6. Verify the week tells a coherent story in Jana's narrative
7. Verify vocabulary across all 5 lessons has zero overlap
8. Produce the structured audit report
9. Do NOT edit any files — return findings only
```

**Full course audit (L01–L80):**
```
You are AGENT 13: PEDAGOGICAL LESSON AUDITOR.

Apply RULE ZERO first: think like an experienced Goethe-certified German teacher.

SCOPE: Full curriculum audit — all 80 lessons.

1. Read docs/A1_80_LESSONS_SYLLABUS.md completely
2. Read EVERY lesson file L01.js through L80.js
3. Build a master vocabulary list — flag any duplicates between lessons
4. Build a grammar progression map — flag any violations of the expected order
5. For each module (8 modules × 10 lessons), verify theme coherence
6. Run ALL 6 PILLAR checklists across the full course
7. Answer the ultimate question: "Would this 80-lesson course prepare a student for the Goethe A1 exam?"
8. Produce the structured audit report with findings grouped by module
9. Do NOT edit any files — return findings only
```

### WORKFLOW: Agent 13 works AFTER Agent 1, BEFORE deployment

```
Agent 1 writes lessons → Agent 7 validates schema → Agent 13 audits pedagogy → fixes fed back to Agent 1
```

Agent 13 is the final quality gate. No lesson ships without passing both Agent 7 (technical) AND Agent 13 (pedagogical).

---

## HOW TO INVOKE AN AGENT

The orchestrator uses this pattern:

```
Orchestrator: "I need to run AGENT {N}: {AGENT NAME}"
→ Creates a sub-agent with the specific prompt template
→ Sub-agent reads its MUST READ files
→ Sub-agent performs its task
→ Sub-agent reports what it did
→ Orchestrator verifies (build check, spot check)
```

### BATCH OPERATIONS

For tasks that span multiple files (e.g., "rewrite Week 1 lessons"):
```
1. Orchestrator defines the vocabulary pool for the entire week
2. Orchestrator assigns L01 to Agent 1 (with empty used-vocab list)
3. Agent 1 writes L01 → returns vocab used
4. Orchestrator assigns L02 to Agent 1 (with L01 vocab as excluded)
5. Agent 1 writes L02 → returns vocab used
6. ... continues through L05
7. Orchestrator runs Agent 7 (QA) on all 5 files — schema validation
8. Orchestrator runs Agent 13 (Pedagogical Audit) on all 5 files — content quality
9. Orchestrator runs build verification
```

For independent agents (non-overlapping domains), run in parallel:
```
Parallel batch:
  - Agent 2 (Story) + Agent 4 (Passive) + Agent 8 (Docs)
  These never write to the same files, safe to run simultaneously.
```

---

## PRIORITY ORDER FOR EXECUTION

| Priority | Agent | Reason |
|----------|-------|--------|
| 1 | Agent 1: Lesson Content | Core product — lessons are everything |
| 2 | Agent 7: QA Bug Hunter | Catch schema/technical errors immediately |
| 3 | Agent 13: Pedagogical Auditor | Catch content/teaching quality issues |
| 4 | Agent 10: Grammar Guide | Grammar completeness affects multiple views |
| 5 | Agent 9: Vocab Trainer | SRS quality affects retention |
| 6 | Agent 2: Story Content | Only 6 stories exist, need more |
| 7 | Agent 12: Testing | Tests validate the learning |
| 8 | Agent 4: Passive Phase | Content already exists (50 days) |
| 9 | Agent 8: Documentation Sync | Docs are ~40% outdated |
| 10 | Agent 5: Arena Content | Arena works but could be better |
| 11 | Agent 6: AI Conversation | Works but scenarios need curriculum alignment |
| 12 | Agent 11: Dashboard/UX | Functional but could be polished |
| 13 | Agent 3: Video Content | Hardest — requires external video sourcing |


### MUST-FOLLOW EXERCISE LOGIC RULES:
1. **NO TAUTOLOGIES:** Never ask for the translation of a word using the same language. For example, never ask 'Was ist sieben auf Deutsch?'. If asking for a German translation, the target word MUST be explicitly stated in Slovak (e.g., 'Wie hei�t sedem auf Deutsch?' or 'Welches Wort bedeutet sedem?').
2. **AVOID das AMBIGUITY:** Do not use 'Wie hei�t das auf Deutsch?' as a standalone question text unless there is an accompanying image. Always specify the word being translated: 'Wie hei�t st�l auf Deutsch?'.
