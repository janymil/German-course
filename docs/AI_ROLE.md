# AI Role in the German Learning App

## Overview

The AI tutor is a core feature — not an add-on. It acts as a personal German teacher available 24/7, adapting to the learner's specific weaknesses, pace, and Slovak language background.

---

## AI Functions

### 1. Adaptive Difficulty Engine
- Monitors performance per exercise type, per lesson, per grammar point
- After 3 wrong answers on the same grammar point → triggers a micro-explanation
- After consistent strong performance → suggests skipping review, moving faster
- Adjusts vocabulary introduction pace dynamically

### 2. Personlised Error Correction
- Detects patterns in fill-in-the-blank and free write errors
- Groups errors by type: gender errors, case errors, word order errors, spelling
- Weekly error report: "Your 3 weakest areas this week: (1) Accusative masculine, (2) Vokalwechsel verbs, (3) Modal verb position"
- Suggests specific SRS review sessions targeting those weak areas

### 3. AI Writing Coach
- For Free Write exercises: accepts the learner's German text
- Returns: corrected version + explanation of each correction in Slovak
- Does NOT simply give the answer — uses Socratic method (asks "What case is the direct object here?")
- Stores corrections → feeds back into SRS for vocabulary and grammar points

### 4. Conversational Practice (Dialogue Mode)
- AI plays the role of a native German speaker in a simulated situation
- Scenarios match the lesson topic (e.g. café, doctor, job interview)
- AI evaluates responses for: vocabulary, grammar accuracy, communicative success
- Feedback always in Slovak for A1 learners

### 5. Jana's AI Companion
- AI narrates Jana's story in short Slovak summaries before each lesson
- Connects lesson vocabulary to what Jana is currently experiencing
- "Jana dnes hľadá byt vo Viedni. Naučíš sa, ako pohľadávať bývanie po nemecky."
- Creates emotional investment in the narrative

### 6. Pronunciation Coach
- Listens to learner reading German sentences aloud (Web Speech API)
- Flags: umlaut pronunciation (ä/ö/ü), ß, ch (Bach vs. ich), w/v distinction
- Particular focus on German sounds not in Slovak phonology

### 7. Smart Streak Recovery
- If learner breaks a streak: AI sends a personalised "comeback" message
- Analyses which lesson they stopped at and why (too hard? too long?)
- Suggests a shorter re-entry point: "Začni s 5-minútovým opakovaním lekcie 12"

### 8. Exam Readiness Assessment
- After lesson 60: AI runs a diagnostic across all 4 Goethe skills
- Produces a readiness score per skill: 0–100%
- Generates a personalised study plan for the final 20 lessons
- "Tvoje čítanie je na 78%. Počúvanie je na 52% — potrebuješ viac práce."

---

## AI Technical Implementation Plan

| Function | Technology | When to implement |
|---|---|---|
| Adaptive difficulty | Local state + algorithm | Phase 3 |
| Error pattern detection | Local storage + analysis | Phase 3 |
| Writing coach | OpenAI GPT-4o API | Phase 6 |
| Conversational practice | OpenAI GPT-4o API | Phase 6 |
| Jana's AI companion | OpenAI GPT-4o or local content | Phase 2 |
| Pronunciation coach | Web Speech API + AI scoring | Phase 5 |
| Streak recovery | Local + OpenAI for message | Phase 4 |
| Exam readiness | Local scoring algorithm | Phase 7 |

---

## AI Persona

**Name:** Lehrer Klaus
**Character:** Experienced, patient, warm but direct. Like a good Viennese German teacher.
**Tone:** Never condescending. Celebrates small wins. Uses humour occasionally.
**Language:** Speaks Slovak to the learner at A1 stage. Gradually introduces more German as learner progresses.
**Key phrase:** "Langsam aber sicher — pomaly, ale isto." (Slowly but surely.)

---

## Privacy & Data

- No personal data sent to AI beyond anonymised performance metrics and written exercise responses
- Learner controls what is shared with AI
- All AI responses logged locally for review
- Option to use app fully offline (without AI features) — core content always available

---

## AI Prompt Engineering Standards

All AI interactions use structured prompts that include:
1. Learner's current lesson (L01–L80)
2. Learner's native language (Slovak)
3. Recent error patterns (last 5 sessions)
4. Current grammar topic
5. Narrative context (where Jana is in her story)

This ensures every AI response is contextually appropriate and pedagogically consistent.
