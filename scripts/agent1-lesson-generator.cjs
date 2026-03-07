#!/usr/bin/env node
/**
 * agent1-lesson-generator.cjs
 * ═══════════════════════════
 * AGENT 1: LESSON CONTENT AGENT — Automated lesson generation script.
 *
 * This script implements the full Agent 1 pipeline from AGENT_SYSTEM.md:
 *   Step 1: Read context (syllabus, previous lessons, exclusion list)
 *   Step 2: Sub-agent 1A — Vocabulary Builder
 *   Step 3: Sub-agent 1B — Grammar Note Writer
 *   Step 4: Sub-agent 1C — Minitext Dialogue Writer
 *   Step 5: Sub-agent 1D — Exercise Generator (core 5)
 *   Step 6: Sub-agent 1E — Speaking & Pronunciation Builder
 *   Step 7: Sub-agent 1F — Extended Exercise Generator
 *   Step 8: Assemble all outputs into final lesson object
 *   Step 9: Self-check (schema validation)
 *   Step 10: Write file to src/data/lessons/L{NN}.js
 *   [Auto] Sub-agent 1G — Comprehensive Recap (triggers after every 30th lesson: L30, L60, L80)
 *
 * Usage:
 *   node scripts/agent1-lesson-generator.cjs 11          ← generate L11
 *   node scripts/agent1-lesson-generator.cjs 11 12 13 14 15  ← generate L11–L15 sequentially
 *   node scripts/agent1-lesson-generator.cjs 11-15       ← generate range L11–L15
 *   node scripts/agent1-lesson-generator.cjs 11 --dry    ← dry run (no file write)
 *
 * Requirements:
 *   - .env file with VITE_GEMINI_API_KEY=your_key
 *   - All prior lessons in src/data/lessons/ must exist
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { trackApiUsage, checkAndBlockRateLimit, recordApiCall } = require('./apiTracker.cjs');

// ── Load .env ────────────────────────────────────────────────────────────────
const envPath = path.join(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8')
    .split('\n')
    .filter(line => line.trim() && !line.startsWith('#'))
    .forEach(line => {
      const [key, ...rest] = line.split('=');
      if (key) {
        const value = rest.join('=').trim().replace(/"/g, '');
        if (value && !process.env[key.trim()]) process.env[key.trim()] = value;
      }
    });
}

const GEMINI_API_KEY = process.env.VITE_GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error('❌ VITE_GEMINI_API_KEY not found in .env');
  process.exit(1);
}

// ── Config ───────────────────────────────────────────────────────────────────
const ROOT = process.cwd();
const LESSONS_DIR = path.join(ROOT, 'src', 'data', 'lessons');
const MODEL_PRIMARY = 'gemini-2.5-pro';
const MODEL_FALLBACK = 'gemini-2.5-pro';
const API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';
const DRY_RUN = process.argv.includes('--dry');
const RECAP_ONLY = process.argv.includes('--recap-only');
const MAX_RETRIES = 2;

// ── Globals ──────────────────────────────────────────────────────────────────
let apiStats = {
  calls: 0,
  inputTokens: 0,
  outputTokens: 0
};

// ── Parse lesson numbers from CLI ────────────────────────────────────────────
function parseLessonArgs() {
  const args = process.argv.slice(2).filter(a => !a.startsWith('--'));
  const lessons = [];
  for (const arg of args) {
    if (arg.includes('-')) {
      const [start, end] = arg.split('-').map(Number);
      for (let i = start; i <= end; i++) lessons.push(i);
    } else {
      const n = parseInt(arg, 10);
      if (!isNaN(n)) lessons.push(n);
    }
  }
  if (lessons.length === 0) {
    console.error('Usage: node scripts/agent1-lesson-generator.cjs <lesson_number(s)>');
    console.error('  e.g.: node scripts/agent1-lesson-generator.cjs 11');
    console.error('  e.g.: node scripts/agent1-lesson-generator.cjs 11-15');
    console.error('  e.g.: node scripts/agent1-lesson-generator.cjs 10 --recap-only');
    process.exit(1);
  }
  return lessons;
}

// ── Run Tests ────────────────────────────────────────────────────────────────
function runPreflightTests() {
  console.log('🧪 Running preflight architecture tests...');
  try {
    execSync('node scripts/test-genderColors.cjs', { stdio: 'inherit', cwd: process.cwd() });
    console.log('✅ Preflight tests passed.\n');
  } catch (err) {
    console.error('❌ Preflight tests FAILED! Aborting lesson generation to prevent regressions.');
    process.exit(1);
  }
}

// ── Gemini API call ──────────────────────────────────────────────────────────
async function callGemini(systemPrompt, userPrompt, { temperature = 0.4, maxTokens = 30000, jsonMode = false } = {}) {
  const messages = [];
  if (systemPrompt) messages.push({ role: 'system', content: systemPrompt });
  messages.push({ role: 'user', content: userPrompt });

  // Build Gemini payload
  let systemInstruction = null;
  const contents = [];
  for (const msg of messages) {
    if (msg.role === 'system') {
      systemInstruction = { parts: [{ text: msg.content }] };
    } else {
      contents.push({ role: 'user', parts: [{ text: msg.content }] });
    }
  }

  const payload = {
    contents,
    generationConfig: {
      temperature,
      maxOutputTokens: maxTokens,
    }
  };
  if (systemInstruction) payload.systemInstruction = systemInstruction;
  if (jsonMode) payload.generationConfig.responseMimeType = 'application/json';

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const model = attempt === 0 ? MODEL_PRIMARY : MODEL_FALLBACK;
    const url = `${API_BASE}/${model}:generateContent?key=${GEMINI_API_KEY}`;

    // Block if free tier limits reached
    const estimatedTokens = Math.floor(JSON.stringify(payload).length / 4) + (payload.generationConfig.maxOutputTokens || 8000);
    await checkAndBlockRateLimit(model, estimatedTokens);

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errBody = await res.text();
        console.error(`  ⚠ Gemini HTTP ${res.status} (model: ${model}, attempt ${attempt + 1})`);
        if (attempt < MAX_RETRIES) {
          await sleep(3000 * (attempt + 1));
          continue;
        }
        throw new Error(`Gemini API error: ${res.status} - ${errBody.substring(0, 200)}`);
      }

      const data = await res.json();

      // Track
      const usage = data.usageMetadata || { promptTokenCount: 0, candidatesTokenCount: 0 };
      // -- Record stats globally
      apiStats.calls += 1;
      apiStats.inputTokens += usage.promptTokenCount;
      apiStats.outputTokens += usage.candidatesTokenCount;

      try {
        const totalTokens = (usage.promptTokenCount || 0) + (usage.candidatesTokenCount || 0);
        recordApiCall(model, totalTokens || estimatedTokens);
        trackApiUsage('gemini-2.5-pro', 'inputTokens', usage.promptTokenCount || 0);
        trackApiUsage('gemini-2.5-pro', 'outputTokens', usage.candidatesTokenCount || 0);
        trackApiUsage('gemini-2.5-pro', 'calls', 1);
      } catch (e) { /* ignore tracking errors */ }

      let text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      text = text.replace(/^```(?:json|javascript|js)?\s*/i, '').replace(/```\s*$/i, '').trim();
      return text;
    } catch (err) {
      if (attempt < MAX_RETRIES) {
        console.error(`  ⚠ Attempt ${attempt + 1} failed: ${err.message}`);
        await sleep(3000 * (attempt + 1));
        continue;
      }
      throw err;
    }
  }
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ── File readers ─────────────────────────────────────────────────────────────
function readFile(relPath) {
  const fullPath = path.join(ROOT, relPath);
  if (!fs.existsSync(fullPath)) return null;
  return fs.readFileSync(fullPath, 'utf8');
}

function readLessonFile(n) {
  const pad = String(n).padStart(2, '0');
  return readFile(`src/data/lessons/L${pad}.js`);
}

// ── Context gathering ────────────────────────────────────────────────────────
function getLessonWeekDay(lessonNum) {
  const week = Math.ceil(lessonNum / 5);
  const day = ((lessonNum - 1) % 5) + 1;
  return { week, day };
}

function getSiblingLessonNumbers(lessonNum) {
  const { week } = getLessonWeekDay(lessonNum);
  const start = (week - 1) * 5 + 1;
  const siblings = [];
  for (let i = start; i < start + 5; i++) {
    if (i !== lessonNum) siblings.push(i);
  }
  return siblings;
}

function extractVocabDe(lessonSource) {
  if (!lessonSource) return [];
  const words = [];
  const regex = /de:\s*['"`]([^'"`]+)['"`]/g;
  let match;
  while ((match = regex.exec(lessonSource)) !== null) {
    words.push(match[1]);
  }
  return words;
}

function buildExclusionList(lessonNum, alreadyGeneratedVocab = []) {
  const siblings = getSiblingLessonNumbers(lessonNum);
  const excluded = new Set(alreadyGeneratedVocab);
  for (const sib of siblings) {
    const src = readLessonFile(sib);
    if (src) {
      for (const w of extractVocabDe(src)) excluded.add(w);
    }
  }
  return [...excluded];
}

function getSyllabusLine(lessonNum) {
  const syllabus = readFile('docs/A1_80_LESSONS_SYLLABUS.md');
  if (!syllabus) return 'Syllabus not found';
  const regex = new RegExp(`\\*\\s*\\*\\*L${String(lessonNum).padStart(2, '0')}:\\*\\*\\s*(.+)`, 'i');
  const match = syllabus.match(regex);
  return match ? match[1].trim() : `L${lessonNum} entry not found in syllabus`;
}

function getNarrativeBrief(lessonNum) {
  const agentSystem = readFile('docs/AGENT_SYSTEM.md');
  if (!agentSystem) return 'Narrative brief not found';
  // Find the L{NN} row in the WEEK scene table
  const regex = new RegExp(`\\|\\s*\\*\\*L${String(lessonNum).padStart(2, '0')}\\*\\*\\s*\\|([^|]+)\\|([^|]+)\\|([^|]+)\\|`, 'i');
  const match = agentSystem.match(regex);
  if (!match) return `Narrative brief for L${lessonNum} not found`;
  return `Scene: ${match[1].trim()}\nWhat happens: ${match[2].trim()}\nGrammar hook: ${match[3].trim()}`;
}

function getGrammarLevel(lessonNum) {
  if (lessonNum <= 10) return 'Präsens only. No modal verbs, no Perfekt, no Präteritum.';
  if (lessonNum <= 35) return 'Präsens + modal verbs (können, müssen, möchten, etc.) + Imperativ. No Perfekt, no Präteritum.';
  if (lessonNum <= 60) return 'Präsens + modal verbs + Imperativ + Perfekt (haben & sein) + Präteritum of sein/haben. Full A1 past tense toolkit.';
  return 'All A1 grammar allowed (Präsens, Perfekt, Präteritum of sein/haben, modal verbs, Imperativ, Konjunktiv II würde).';
}

function getSpiralGrammarList(lessonNum) {
  // Build a list of what grammar was taught in prior lessons
  const grammarMap = {
    1: 'sein/heißen conjugation (ich/du/er/Sie), alphabet, formal vs informal greetings',
    2: 'W-Fragen (Wie, Wer, Was, Woher, Wo), sein in questions, word order (Verb position 2)',
    3: 'kommen aus + country, sprechen + language, stem-vowel changes in sprechen (sprichst/spricht)',
    4: 'numbers 0-20, haben (ich habe, du hast, er hat), age expressions',
    5: 'professions with gender (-in suffix), arbeiten als + profession, der/die gender agreements',
    6: 'wohnen/leben + in + place, regular verb conjugation Präsens, personal data vocabulary',
    7: 'family members, haben in all persons, describing people and their families',
    8: 'mein/dein/Ihr possessives (Nominativ), Ja/Nein questions, question word order inversion',
    9: 'Genitive-s with names (Janinas), numbers 21-100, dictating phone/ID numbers',
    10: 'plural verb forms (wir, ihr, sie), possessives in context. Week 2 consolidation',
    11: 'definite article der/die/das, 3rd-person pronouns er/sie/es, identifying objects',
    12: 'adjectives (schön, groß, klein, bequem), Wo-questions + position, describing furniture',
    13: 'large numbers 100-1000000, prices, kosten + number + Euro',
    14: 'indefinite article ein/eine, asking what things are called (Wie heißt das auf Deutsch?)',
    15: 'kein/keine (negative article), colors, negation with things',
    16: 'office vocabulary (Drucker, Telefon, Schreibtisch), asking for repetition (Wie bitte?), basic office communication',
    17: 'Akkusativ singular (einen/eine/ein), brauchen + Akk, haben + Akk objects',
    18: 'full Akkusativ paradigm: definite (den/die/das), indefinite (einen/eine/ein), negative (keinen/keine/kein)',
    19: 'plural noun formation (Stifte, Ordner, Bücher, Akten, Mappen), counting objects',
    20: 'formal email formulas (Sehr geehrter...), scheduling language, compound nouns (Zusammensetzungen)',
    21: 'leisure activities and hobbies vocabulary, gern + verb (ich spiele gern), was machst du in der Freizeit?',
    22: 'modal verb können (kann/kannst/kann/können/könnt/können), Satzklammer (modal P2 + infinitiv end), ability expressions',
    23: 'frequency adverbs (immer, oft, manchmal, selten, nie), stem-vowel verbs (lesen→liest, fahren→fährt, treffen→trifft)',
    24: 'complimenting abilities (Du kannst super tanzen!), Das macht dir Spaß!, responding to compliments',
    25: 'days of the week (Montag–Sonntag), parts of the day (morgens/mittags/abends/nachts), am + day expressions',
    26: 'telling exact time (Wie spät ist es? Es ist... Uhr), temporal prepositions um (at) and am (on)',
    27: 'making appointments (hast du Zeit?), wissen conjugation (ich weiß/du weißt), accepting/declining invitations',
    28: 'food and grocery vocabulary, preference with mögen (ich mag/magst du?), shopping expressions',
    29: 'ordering food and drinks in a restaurant (nehmen, möchten), polite requests, restaurant dialogue',
    30: 'Ich möchte... construction in practice, reading a menu (Speisekarte), food prices and quantities',
    31: 'transport vocabulary (Zug, U-Bahn, Bus, Auto), buying tickets, platform/direction language',
    32: 'separable verbs part 1 (ankommen, einsteigen, aussteigen), Satzklammer with separable prefix at end',
    33: 'separable verbs part 2 (anrufen, abholen, aufmachen), separable prefix in word order',
    34: 'expressing inability/delay (Ich kann leider nicht...), apologising, offering help',
    35: 'daily routine vocabulary, time prepositions von...bis, describing schedule with clock times',
    36: 'Perfekt with haben + regular past participle (ge-t: gemacht, besucht, gekauft, gefragt)',
    37: 'Perfekt with haben + irregular past participle (ge-en: gesehen, gegessen, getrunken, gehabt)',
    38: 'months and seasons, past temporal expressions (letztes Jahr, letzte Woche, letzten Sommer)',
    39: 'Perfekt with sein for motion/change verbs (gehen→gegangen, fahren→gefahren, kommen→gekommen)',
    40: 'Präteritum of sein (war/warst/war) and haben (hatte/hattest/hatte), written/narrative style',
    41: 'city locations vocabulary (Bäckerei, Apotheke, Supermarkt, Bahnhof, Park, Schule), basic location expressions (hier, dort, da drüben)',
    42: 'es gibt + Akkusativ to describe existence, negation kein/keine in Akkusativ context',
    43: 'Dative personal pronouns (mir, dir, ihm, ihr, uns, euch, ihnen), verbs with Dative: gefallen, helfen, danken, gehören',
    44: 'giving directions vocabulary: geradeaus, links, rechts, abbiegen, die erste/zweite Straße, an der Ecke',
    45: 'local prepositions with Dative: neben, vor, hinter, an, zwischen + Dativ forms (dem/der)',
    46: 'institutional vocabulary (Amt, Post, Polizei, Rathaus), gegenüber + Dative, Meldezettel vocabulary',
    47: 'apartment/room vocabulary (Wohnzimmer, Schlafzimmer, Bad, Küche, Flur), describing apartments',
    48: 'possessive pronouns 3rd person Nominativ: sein/seine (his), ihr/ihre (her), contrasting mein/dein/sein/ihr',
    49: 'possessives 3rd person Akkusativ: seinen/ihre, ownership and borrowing expressions',
    50: 'position verbs (stehen/stellen/legen/liegen/hängen), two-way prepositions (an, auf, in, hinter, vor) + Akkusativ for movement',
    51: 'household appliance vocabulary, reporting problems: funktionieren, kaputt sein, komische Geräusche',
    52: 'time prepositions with Dative: in + Dativ (in einer Stunde), nach (nach dem Essen), vor (vor dem Termin)',
    53: 'appointment scheduling: verschieben, absagen, einen Termin machen/haben/verschieben, polite phone formulas',
    54: 'möchten vs wollen for wishes/intentions/plans, life goals vocabulary, talking about future at A1 level',
    55: 'prepositions mit and ohne + Akkusativ, beverage/food context (mit Milch, ohne Zucker)',
    56: 'werden conjugation (ich werde, du wirst, er wird), expressing change of state, wollen review',
    57: 'body parts vocabulary (Kopf, Hals, Bauch, Rücken, Augen), wehtun and Schmerzen expressions',
    58: 'illness symptoms vocabulary (Fieber, Husten, Schnupfen, Schmerzen), describing pain and illness to a doctor',
    59: 'sollen conjugation, reporting instructions/doctor orders, medical advice language, Rezept/Tabletten vocabulary',
    60: 'Imperativ Sie forms (Nehmen Sie!, Trinken Sie!, Kommen Sie!), pharmacy vocabulary, patient-pharmacist interaction',
    61: 'household chore vocabulary (wischen, aufräumen, kochen, bügeln, abwaschen), expressing likes/dislikes about tasks',
    62: 'du-Imperativ (kauf!, stell!, mach!) and ihr-Imperativ forms, Imperative of separable verbs (Stell den Müll raus!)',
    63: 'Accusative personal pronouns: mich, dich, ihn, sie, es, uns, euch, sie — giving and receiving objects',
    64: 'physical appearance vocabulary (Haare, Augen, groß/klein, schlank, Bart), describing people looks',
    65: 'character and personality adjectives, un- prefix to form opposites (unruhig, unhöflich, uninteressant)',
    66: 'Perfekt of non-separable verbs — no ge- prefix: gefallen→gefallen, verstehen→verstanden, beginnen→begonnen',
    67: 'man as impersonal pronoun (man sagt, man macht, man darf nicht), general social observations',
    68: 'müssen vs dürfen — obligation vs permission, signs/rules vocabulary (man muss, man darf nicht)',
    69: 'environmental/recycling vocabulary, müssen/dürfen/nicht dürfen in public rule context',
    70: 'opinion expressions: Ich finde..., Meiner Meinung nach..., Ich denke..., basic discussion phrases',
    71: 'clothing vocabulary (Bluse, Jacke, Hose, Schuhe), shopping expressions (suchen, anprobieren, zu teuer)',
    72: 'demonstrative pronoun dieser/diese/dieses, question word welch- (welche Farbe?, welchen Mantel?)',
    73: 'comparative adjectives with -er suffix: schöner, billiger, besser, größer; comparison with als and so...wie',
    74: 'weather vocabulary (Regen, Wind, Sonne, Schnee, Gewitter, bewölkt), weather verbs (es regnet, es schneit)',
    75: 'denn as causal conjunction (Ich nehme einen Schirm, denn es regnet), outdoor trip vocabulary',
    76: 'adjective suffix -los to form new adjectives (herzlos, grenzenlos), wishes and congratulations Redemittel',
    77: 'Konjunktiv II with würde + infinitive for polite wishes/hypotheticals (Ich würde gerne..., Ich würde an deiner Stelle...)',
    78: 'birthday vocabulary, German birthday phrases (Herzlichen Glückwunsch zum Geburtstag), DACH cultural birthday customs',
    79: 'ordinal numbers (erste, zweite, dritte, vierte...), dates in German (am dritten Mai), planning with exact dates',
    80: 'Consolidation of all A1 grammar: Perfekt, Präteritum sein/haben, als-clauses, full A1 vocabulary from entire course',
  };

  const lines = [];
  for (let i = 1; i < lessonNum; i++) {
    if (grammarMap[i]) {
      lines.push(`- L${String(i).padStart(2, '0')}: ${grammarMap[i]}`);
    }
  }
  return lines.join('\n');
}

function getPreviousLessonSummary(lessonNum) {
  if (lessonNum <= 1) return 'This is the first lesson — no previous lesson.';
  const prev = readLessonFile(lessonNum - 1);
  if (!prev) return `L${lessonNum - 1} file not found.`;
  // Extract title, topic, grammarNote rule
  const titleMatch = prev.match(/title:\s*['"`]([^'"`]+)['"`]/);
  const topicMatch = prev.match(/topic:\s*['"`]([^'"`]+)['"`]/);
  const ruleMatch = prev.match(/rule:\s*['"`]([^'"`]+)['"`]/);
  return `L${lessonNum - 1}: title="${titleMatch?.[1] || '?'}", topic="${topicMatch?.[1] || '?'}", grammar="${ruleMatch?.[1] || '?'}"`;
}

// ── Read golden reference (L01) for quality standard ─────────────────────────
function getGoldenReference() {
  const l01 = readLessonFile(1);
  if (!l01 && readLessonFile(6)) return readLessonFile(6).substring(0, 3000);
  return l01 ? l01.substring(0, 3000) : 'No golden reference available.';
}

// ── Read LESSON_MUSTER.js for schema reference ──────────────────────────────
function getMusterSchema() {
  const muster = readFile('src/data/lessons/LESSON_MUSTER.js');
  return muster || 'LESSON_MUSTER.js not found.';
}

// ══════════════════════════════════════════════════════════════════════════════
// SUB-AGENT PROMPTS
// ══════════════════════════════════════════════════════════════════════════════

function buildSystemPrompt() {
  return `You are an experienced, HIGHLY INTELLIGENT Goethe-certified German teacher and curriculum designer. You create SMART, logical lesson content for a Slovak student learning German at A1 level.

CRITICAL RULES FOR CONTENT GENERATION:
1. SEMANTIC COMPLETENESS: Every sentence must be semantically complete and logical. Verbs that require specific objects (e.g., transitive verbs like "haben", "kaufen", "brauchen") MUST be generated with their required objects. E.g. "Wir haben ein Auto." is correct, whereas "Wir haben in Berlin." is grammatically and logically incomplete.
2. SUBJECT VARIETY: Deliberately distribute sentences across the full spectrum of grammatical subjects: ich, du, er, sie, es, wir, ihr, sie, Sie. You MUST evenly distribute usage and prevent repeating the same subject type. Use specific nouns (e.g., "die Eltern", "das Kind") as subjects to increase variety.
3. POSSESSIVE VARIETY: When using possessive pronouns, use the complete spectrum (mein, dein, sein, ihr, unser, euer, Ihr) evenly.
4. STRUCTURAL VARIETY: Deliberately mix statements, W-Fragen, Ja/Nein Fragen, and negations (nicht/kein). Vary sentence structures by starting sentences with elements other than the subject (e.g., time or place adverbs).
5. All Slovak must be standard Slovak. All German must be 100% natural.

If your sentences fail to show structural, semantic, and subject variation, the generation is considered failed.
You output ONLY valid JavaScript code — no markdown, no explanations, no commentary. Just the JS data structure requested.`;
}

// ── Communicative goal deriver ───────────────────────────────────────────────
function buildCommunicativeGoal(lessonNum, syllabusLine) {
  return `COMMUNICATIVE GOAL — READ THIS FIRST. IT DRIVES EVERY DECISION.
=================================================================
Based on the syllabus line: "${syllabusLine}"

Before writing anything, answer this question in your own words:
  What specific real-world task will Jana (the student) be able to perform AFTER this lesson
  that she could NOT do before?

Examples of well-formed communicative goals:
  - Numbers lesson: "Understand prices at a shop, give a phone number digit by digit,
    ask someone's age in small talk, read a form with year-of-birth fields."
  - Days lesson: "Make and confirm a weekend appointment, say what she does on each day,
    understand a class timetable read aloud."
  - Months lesson: "Say and understand birthday dates, talk about seasons, describe
    when a past or future event happened."

This goal is the LENS for every vocab word and every exercise.
If a word or question does not help Jana accomplish this real-world task, it has no place here.

CLOSED-SET RULE: For topics covering a structured set (cardinal numbers, ordinal numbers,
months, weekdays, body parts, compass directions), at most 50% of vocabulary entries may be
the raw set items themselves. The other 50% MUST be communicative words that USE those items
in real speech (prices, appointments, dates, complaints, navigation phrases, etc.).
The set items are building blocks — they are NOT the lesson's purpose.
DO NOT list 15+ consecutive items from a closed set and call that a vocabulary list.`;
}

// ── Sub-agent 1A: Vocabulary Builder ─────────────────────────────────────────
function build1APrompt(lessonNum, syllabusLine, narrative, grammarLevel, exclusionList, prevSummary) {
  const { week, day } = getLessonWeekDay(lessonNum);
  const pad = String(lessonNum).padStart(2, '0');
  return `
=== SUB-AGENT 1A: VOCABULARY BUILDER ===

TASK: Create vocab[] array for lesson L${pad}.

SYLLABUS: ${syllabusLine}
WEEK: ${week}, DAY: ${day}
GRAMMAR LEVEL: ${grammarLevel}
NARRATIVE: ${narrative}
PREVIOUS LESSON: ${prevSummary}

VOCABULARY EXCLUSION LIST (do NOT use these words):
${exclusionList.join(', ')}

${buildCommunicativeGoal(lessonNum, syllabusLine)}

RULES:
- Output a JavaScript array of 18-22 vocab objects.
- CLOSED-SET RULE: If the lesson topic covers a structured set (numbers, months, weekdays,
  body parts, etc.), MAX 50% of entries may be raw items from that set. The remaining entries
  MUST be communicative words that activate the set in real speech.
- Every entry MUST have ALL 8 fields: de, sk, gender, srsId, example, exampleSk, recycledFrom
- srsId format: 'L${pad}_V01' through 'L${pad}_V99' (zero-padded two digits)
- gender: 'M'/'F'/'N' for nouns ONLY, null for verbs/adjectives/phrases/adverbs
- Nouns MUST include article in de field: 'der Tisch', 'die Lampe', 'das Bett'
- Include 3-5 communicative phrase chunks (multi-word expressions for survival communication)
- Include 2-3 verbs in infinitive form
- EXAMPLE SENTENCES MAXIMUM VARIETY PROTOCOL:
  You are writing ~20 example sentences (one for each vocab word). You MUST ensure:
  - High variety of subjects (ich, du, er, wir, ihr, sie + specific names/nouns).
  - High variety of possessives (dein, sein, ihr, unser, euer) - DO NOT just use "mein/meine".
  - Mix of statements, W-Fragen, Ja/Nein Fragen, and negations.
  - Do not use the "Das ist [noun]" template more than once per lesson.
- example sentences MUST use only ${grammarLevel} grammar structures
- example sentences must be natural A1-level German a teacher would use
- exampleSk must be accurate standard Slovak
- recycledFrom: [] for first appearance
- ZERO overlap with the exclusion list above
- Order: nouns first, then verbs, then phrases/adjectives/adverbs

OUTPUT FORMAT — output ONLY a valid JS array, nothing else:
[
  {
    de: 'der Tisch',
    sk: 'stôl',
    gender: 'M',
    srsId: 'L${pad}_V01',
    example: 'Ist das euer Tisch?',
    exampleSk: 'Je toto váš stôl?',
    recycledFrom: [],
  },
  // ... 19-24 more entries
]`;
}

// ── Sub-agent 1B: Grammar Note Writer ────────────────────────────────────────
function build1BPrompt(lessonNum, syllabusLine, grammarLevel, prevSummary) {
  const pad = String(lessonNum).padStart(2, '0');
  return `
=== SUB-AGENT 1B: GRAMMAR NOTE WRITER ===

TASK: Create grammarNotes[] array for lesson L${pad}.

SYLLABUS: ${syllabusLine}
GRAMMAR LEVEL: ${grammarLevel}
PREVIOUS LESSON: ${prevSummary}

RULES:
- Output a JavaScript array of 2-3 grammarNotes objects
- MUST be an ARRAY [], not a single object
- Each object has: rule, explanation, examples[], slovakContrastNote
- rule: German title of the grammar concept (short, specific, searchable)
- explanation: FULL paragraph in SLOVAK (minimum 3-5 sentences). This is the student's primary grammar reference. 
  - Formatting CRITICAL: Use HTML tags (<ul>, <li>, <strong>, <p>, <table>, <div class="tip-box">, <div class="warn-box">).
  - Use bullet points (<ul><li>) instead of dense walls of text whenever possible.
  - Keep paragraphs very short and punchy. Bold key terms (<strong>).
  - Use HTML tables for conjugation/declension patterns.
- examples: 4-8 objects with { de, sk, note? }. Demonstrate the rule systematically. TTS-clickable.
- slovakContrastNote: Slovak text explaining how this differs from Slovak grammar. Address real transfer errors.
- Grammar must match the syllabus line for this lesson exactly
- First grammarNote = main grammar concept. Second = supporting concept.

OUTPUT FORMAT — output ONLY a valid JS array:
[
  {
    rule: 'Rule title in German',
    explanation: '<p>Full Slovak explanation with HTML...</p>',
    examples: [
      { de: 'German example.', sk: 'Slovak translation.', note: 'Optional annotation' },
    ],
    slovakContrastNote: 'Slovak contrast note...',
  },
]`;
}

// ── Sub-agent 1C: Minitext Dialogue Writer ───────────────────────────────────
function build1CPrompt(lessonNum, syllabusLine, narrative, grammarLevel, vocabJson) {
  const pad = String(lessonNum).padStart(2, '0');
  return `
=== SUB-AGENT 1C: MINITEXT DIALOGUE WRITER ===

TASK: Create the minitext exercise for lesson L${pad}.

SYLLABUS: ${syllabusLine}
GRAMMAR LEVEL: ${grammarLevel}
NARRATIVE: ${narrative}

${buildCommunicativeGoal(lessonNum, syllabusLine)}

VOCABULARY available for this lesson (blend naturally — not a mechanical checklist to tick off):
${vocabJson}

RULES:
- Output a JavaScript object with type: 'minitext'
- text: German dialogue/narrative, 70-100 words. Format: each speaker turn on new line with "Name: text"
- textSk: Complete Slovak translation
- instruction: German instruction (e.g. 'Lies den Dialog und beantworte die Fragen.')
- questions: 3-5 comprehension MCQs about the text
  - Each: { question, options (exactly 4), answer (0-based integer index), explanation }
  - explanation should quote relevant part of the text
- The dialogue must involve Jana Nováková or characters from her world (Petra, Carlos, Anna Berg, Luisa, Herr Gruber, Tom, Dr. Hirsch)
- CRITICAL: Create a meaningful real-world situation with a minor conflict, goal, or misunderstanding that must be resolved. DO NOT just have characters list vocabulary at each other.
- The grammar rule from this lesson must appear naturally to serve the story, not forced.
- Mini-story with a narrative arc, emotions, and realistic dialogue — not a robotic Q&A ping-pong.
- Grammar ceiling: ${grammarLevel}
- Natural German — would real people say this?

OUTPUT FORMAT — output ONLY a valid JS object:
{
  type: 'minitext',
  instruction: 'Lies den Dialog und beantworte die Fragen.',
  text: 'Jana: Hallo!\\nPetra: ...',
  textSk: 'Jana: Ahoj!\\nPetra: ...',
  questions: [
    { question: '...', options: ['...', '...', '...', '...'], answer: 0, explanation: '...' },
  ]
}`;
}

// ── Sub-agent POOL: Persona-Driven Sentence Generator ───────────────────────
function buildPersonaPrompt(personaName, personaInstruction, primaryVocabObj, allVocabJson, grammarLevel, syllabusLine, grammarNotesJson) {
  const primaryVocabList = primaryVocabObj.map(v => `${v.de} = ${v.sk}`).join('\n');
  return `=== SUB-AGENT: PERSONA-DRIVEN SENTENCE GENERATOR ===

TASK: Roleplay as a specific Persona and write exactly 15 German sentences.

SYLLABUS: ${syllabusLine}
GRAMMAR LEVEL: ${grammarLevel}

YOUR PERSONA & INSTRUCTION:
${personaName}
${personaInstruction}

--- VOCABULARY RULES ---
MANDATORY PRIMARY FOCUS (You MUST use these words deeply):
${primaryVocabList}

THE "FULL A1 FREEDOM" RULE:
You are NOT limited to only the primary focus words! You are expected and REQUIRED to use ANY normal, natural German vocabulary (prepositions, common verbs like sein/haben/machen, adjectives, everyday nouns) up to A1 level to construct beautiful, context-rich sentences. You can also use other words from the full lesson vocabulary shown below. Just make sure you deeply feature your Primary Focus words!

FULL LESSON VOCABULARY (For your context if needed):
${allVocabJson}

GRAMMAR RULES TO OBSERVE:
${grammarNotesJson}

OUTPUT FORMAT — output ONLY a valid JS array of 15 strings:
[
  "German sentence 1.",
  "German question 2?",
  ...
]`;
}

// ── Sub-agent 1D: Exercise Generator (core 5) ───────────────────────────────
function build1DPrompt(lessonNum, syllabusLine, grammarLevel, vocabJson, grammarNotesJson, spiralGrammar, slices) {
  const pad = String(lessonNum).padStart(2, '0');
  return `
=== SUB-AGENT 1D: EXERCISE GENERATOR (CORE 5) ===

${buildCommunicativeGoal(lessonNum, syllabusLine)}

TASK: Create 5 exercises for lesson L${pad}: match, wordorder, fill, listen, mcq.

SYLLABUS: ${syllabusLine}
GRAMMAR LEVEL: ${grammarLevel}

VOCABULARY:
${vocabJson}

GRAMMAR NOTES:
${grammarNotesJson}

${lessonNum > 5 ? `SPIRAL GRAMMAR (use 1-2 items in fill + mcq to recycle prior lessons):\n${spiralGrammar}` : ''}

SCENARIO PRE-STEP — do this before writing a single exercise:
Define ONE specific real-world situation that serves the communicative goal above.
Example for a numbers lesson: "Jana is at a mobile phone shop. She needs to understand
the price, give her phone number for registration, and ask the shop assistant's age as
small talk." ALL 5 exercises must grow from this scenario — they are not 5 disconnected
template-fills. They form a micro-story arc that the student can follow.

MANDATORY ROUTING REQUIREMENTS:
You are strictly forbidden from inventing your own repetitive sentences or recycling sentences across exercises! 
To guarantee mathematical variety, you have been provided with EXACT SLICES of diverse generated sentences for each specific exercise in the schemas below. You MUST build each exercise utilizing ONLY its assigned slice of sentences. Do not cross-pollinate sentences.

COGNITIVE DIVERSITY RULE: Each exercise must test a DIFFERENT cognitive skill.
If two exercises test the same thing, rewrite one.
  1. match     → passive recognition (see German word, recall Slovak meaning)
  2. wordorder → syntactic assembly (build a correct sentence from shuffled parts)
  3. fill      → contextual cloze (figure out what word fits the situation)
  4. listen    → phonetic/spelling discrimination (how a word sounds vs. how it looks)
  5. mcq       → grammar rule application (choose the grammatically correct option)

EXERCISE SCHEMAS:

1. MATCH: { type: 'match', instruction: string, pairs: [['German', 'Slovak'], ...] } — 8-10 pairs from vocab

2. WORDORDER: { type: 'wordorder', instruction: string, sentences: [{ words: string[], correct: string, hint: string, explanation: string }] }
   - You MUST use EXACTLY these sentences to build this exercise. Do not use any others:
${slices.wordorder.map(s => '     * ' + s).join('\n')}
   - words[] = shuffled tokens (one word per token, NO punctuation tokens)
   - correct = assembled sentence WITHOUT trailing punctuation
   - hint = Slovak translation
   - explanation = why this word order is correct (reference grammar rule)

3. FILL: { type: 'fill', instruction: string, questions: [{ sentence, answer, hint, explanation }] }
   - You MUST use EXACTLY these sentences to build this exercise. Do not use any others:
${slices.fill.map(s => '     * ' + s).join('\n')}
   - sentence has '___' placeholder. answer is case-sensitive.
   - CRITICAL: NO AMBIGUITY. The sentence must provide enough context so that ONLY ONE answer is logically possible without guessing. 
   - explanation is REQUIRED and rendered — never empty!
   - If L06+: include 1-2 questions testing PRIOR lesson grammar (spiral)

4. LISTEN: { type: 'listen', instruction: string, questions: [{ de, sk }] }
   - FIELD NAME IS 'questions', NOT 'pairs'!
   - You MUST use EXACTLY these sentences to build this exercise. Do not use any others:
${slices.listen.map(s => '     * ' + s).join('\n')}

5. MCQ: { type: 'mcq', instruction: string, questions: [{ question, options (4), answer (0-based integer!), explanation }] }
   - You MUST use EXACTLY these sentences to build this exercise. Do not use any others:
${slices.mcq.map(s => '     * ' + s).join('\n')}
   - answer is a 0-BASED INTEGER INDEX (0, 1, 2, or 3)!
   - explanation is REQUIRED — never empty!
   - Distractors must be plausible (same category, common mistakes)
   - If L06+: include 1-2 questions testing PRIOR lesson grammar (spiral)

OUTPUT FORMAT — output ONLY a valid JS array of 5 exercise objects in this exact order:
[match_obj, wordorder_obj, fill_obj, listen_obj, mcq_obj]`;
}

// ── Sub-agent 1E: Speaking & Pronunciation Builder ───────────────────────────
function build1EPrompt(lessonNum, syllabusLine, vocabJson, speakingSlice) {
  const pad = String(lessonNum).padStart(2, '0');
  return `
=== SUB-AGENT 1E: SPEAKING & PRONUNCIATION BUILDER ===

TASK: Create speaking exercise for lesson L${pad}.

SYLLABUS: ${syllabusLine}

VOCABULARY:
${vocabJson}

RULES:
- ANTI-RECYCLING: Do not mechanically use "Ich bin..." or "Das ist..." all the time. Vary the subjects (ich, du, er/sie, wir, ihr, sie) and sentence structures (questions, negations).
- You MUST build the phrases EXACTLY from the following diverse sentences. Do not invent your own:
${speakingSlice.map(s => '  * ' + s).join('\n')}
- Output a JavaScript object with type: 'speaking'
- instruction: German (e.g. 'Höre zu und sprich nach.')
- phrases: 5-8 objects with { de, sk, tip }
- Progressive: single words → short phrases → full sentences
- tip: pronunciation hint, MAX 60 chars. Focus on sounds different from Slovak.
- Use IPA-lite: [v], [ø], [ç], etc.
- Phrases use this lesson's vocabulary and grammar

OUTPUT FORMAT — output ONLY a valid JS object:
{
  type: 'speaking',
  instruction: 'Höre zu und sprich nach.',
  phrases: [
    { de: 'German phrase', sk: 'Slovak translation', tip: 'W=[v], max 60 chars' },
  ]
}`;
}

// ── Sub-agent 1F: Extended Exercise Generator ────────────────────────────────
function build1FPrompt(lessonNum, syllabusLine, grammarLevel, vocabJson, grammarNotesJson, slices) {
  const pad = String(lessonNum).padStart(2, '0');
  return `
=== SUB-AGENT 1F: EXTENDED EXERCISE GENERATOR ===

${buildCommunicativeGoal(lessonNum, syllabusLine)}

TASK: Create 5 extended exercises for lesson L${pad}: truefalse, dictation, categorysort, translation, conjugation.

EXTENDED EXERCISE PRINCIPLE: These exercises deepen what the core exercises introduced.
They must still serve the communicative goal above — not introduce arbitrary new content.
Every sentence, statement, and translation must be something a real person would say in
the real-world situation this lesson is about.

STANDALONE RULE: All exercises MUST be universally solvable based on general knowledge 
and grammar/vocabulary. DO NOT refer to specific lore, names, or numbers established 
in the Minitext scenario (e.g., do not ask "What is Jana's phone number?" or expect 
them to fill in "null-eins-fünf" because it was the answer in the story).

MANDATORY ROUTING REQUIREMENTS:
You are strictly forbidden from inventing your own repetitive sentences or recycling sentences across exercises! 
To guarantee mathematical variety, you have been provided with EXACT SLICES of diverse generated sentences for each specific exercise in the schemas below. You MUST build each exercise utilizing ONLY its assigned slice of sentences. Do not cross-pollinate sentences.

SYLLABUS: ${syllabusLine}
GRAMMAR LEVEL: ${grammarLevel}

VOCABULARY:
${vocabJson}

GRAMMAR NOTES:
${grammarNotesJson}

EXERCISE SCHEMAS:

1. TRUEFALSE: { type: 'truefalse', instruction: string, statements: [{ statement, isTrue (boolean! NOT 'correct'!), explanation }] }
   - You MUST use EXACTLY these sentences as the basis for the statements. Do not use any others:
${slices.truefalse.map(s => '     * ' + s).join('\n')}
   - Mix 2-3 true + 2-3 false based on these sentences.
   - explanation in Slovak.

2. DICTATION: { type: 'dictation', instruction: string, sentences: [{ de, sk, hint? }] }
   - You MUST use EXACTLY these sentences to build this exercise. Do not use any others:
${slices.dictation.map(s => '     * ' + s).join('\n')}
   - Progressive length: short (3-4 words) → long (6-8 words)

3. FLEX-EXERCISE (CATEGORYSORT or FILL): 
   - CRITICAL (SMART AI): If the vocabulary naturally fits into HIGHLY LOGICAL and pedagogically useful categories (e.g. 'Food' vs 'Drink', 'Masculine' vs 'Feminine'), create a 'categorysort' exercise: { type: 'categorysort', instruction: string, categories: [{ name, color, words[] }], explanation: string }.
   - IF NO SUCH LOGICAL CATEGORIES EXIST, replace this object with a second 'fill' exercise using EXACTLY these sentences:
${slices.flex.map(s => '     * ' + s).join('\n')}
   - For 'fill': Provide enough context so ONLY ONE answer is logically possible without guessing.

4. TRANSLATION: { type: 'translation', instruction: string, sentences: [{ sk, answer, hint, explanation }] }
   - You MUST use EXACTLY these sentences as the 'answer' (correct German translation). Do not use any others:
${slices.translation.map(s => '     * ' + s).join('\n')}
   - Translate them to Slovak for the 'sk' field.
   - hint = 1-2 key German words (NOT the full answer!)
   - explanation in Slovak — reference grammar rule.

5. CONJUGATION: { type: 'conjugation', instruction: string, verbs: [{ infinitive, translation, forms: [{ pronoun, correct }], note }] }
   - 1-2 verbs from THIS lesson's grammar/vocab
   - forms: at least { pronoun: 'ich', correct: '...' }, { pronoun: 'du', correct: '...' }, { pronoun: 'er/sie/es', correct: '...' }
   - Preferably all 6 persons: ich, du, er/sie/es, wir, ihr, sie/Sie
   - note: Slovak grammar note about this verb

OUTPUT FORMAT — output ONLY a valid JS array of 5 exercise objects in exact order:
[truefalse_obj, dictation_obj, flex_obj, translation_obj, conjugation_obj]`;
}

// ── Metadata builder prompt ──────────────────────────────────────────────────
function buildMetadataPrompt(lessonNum, syllabusLine, narrative, grammarLevel) {
  const { week, day } = getLessonWeekDay(lessonNum);
  const pad = String(lessonNum).padStart(2, '0');
  return `
=== METADATA BUILDER ===

TASK: Create metadata fields for lesson L${pad}.

SYLLABUS: ${syllabusLine}
WEEK: ${week}, DAY: ${day}
GRAMMAR LEVEL: ${grammarLevel}
NARRATIVE: ${narrative}

Output a JavaScript object with these fields:
{
  title: string,              // German title of the lesson (short, engaging)
  topic: string,              // Slovak description of the topic
  narrativeContext: string,   // German narrative setup (1-2 sentences, simple German using only prior grammar). About Jana's life.
  communicativeGoal: string,  // German: "Nach dieser Lektion kann ich..." (one sentence)
  skillFocus: string[],       // Array from: 'vocabulary','grammar','listening','reading','writing','speaking','pronunciation'
  lessonNotes: string,        // Slovak summary for student (2-4 sentences)
  xpReward: number,           // 15 (easy), 20 (medium), 25 (hard)
}

LANGUAGE RULES:
- title: GERMAN
- topic: SLOVAK
- narrativeContext: GERMAN (simple, A1 level, using only prior grammar)
- communicativeGoal: GERMAN ("Nach dieser Lektion kann ich...")
- lessonNotes: SLOVAK

OUTPUT FORMAT — output ONLY a valid JS object, nothing else.`;
}

// ══════════════════════════════════════════════════════════════════════════════
// SUB-AGENT 1G: COMPREHENSIVE RECAP GENERATOR (every 30 lessons: L30, L60, L80)
// ══════════════════════════════════════════════════════════════════════════════

function gatherRecapContext(lessonNum, startL) {
  // Collect all vocab and grammar from the lessons being recapped
  const endL = lessonNum;
  const allVocab = [];
  const allGrammarRules = [];

  for (let i = startL; i <= endL; i++) {
    const src = readLessonFile(i);
    if (!src) continue;

    // Extract vocab de+sk pairs
    const vocabMatches = [...src.matchAll(/de:\s*['"`]([^'"`]+)['"`][\s\S]*?sk:\s*['"`]([^'"`]+)['"`]/g)];
    for (const m of vocabMatches) {
      allVocab.push({ de: m[1], sk: m[2], fromLesson: i });
    }

    // Extract grammar rules
    const ruleMatches = [...src.matchAll(/rule:\s*['"`]([^'"`]+)['"`]/g)];
    for (const m of ruleMatches) {
      allGrammarRules.push({ rule: m[1], fromLesson: i });
    }
  }

  return { allVocab, allGrammarRules, startL, endL };
}

function build1GRecapPromptPartA(lessonNum, startL, grammarLevel, vocabJson, grammarRulesJson) {
  const lessonCount = lessonNum - startL + 1;
  return `
=== SUB-AGENT 1G — COMPREHENSIVE RECAP: PART A (match + wordorder + fill + listen + mcq) ===

TASK: Create 9 exercises for the comprehensive recap covering lessons L${String(startL).padStart(2, '0')}–L${String(lessonNum).padStart(2, '0')}.
This is a CONSOLIDATION session — no new material. Everything comes from the ${lessonCount} lessons listed.

GRAMMAR LEVEL CEILING: ${grammarLevel}

VOCABULARY POOL (all words from L${startL}–L${lessonNum}):
${vocabJson}

GRAMMAR RULES COVERED:
${grammarRulesJson}

GENERATE THESE 9 EXERCISES IN THIS EXACT ORDER:

1. MATCH #1: { type: 'match', instruction: 'Priraď nemecké slová k slovenským prekladom (lekcie ${startL}–${startL + 4}).', pairs: [['German', 'Slovak'], ...] }
   - 10 pairs from lessons ${startL}–${startL + 4} (first 5 lessons of the block)

2. MATCH #2: { type: 'match', instruction: 'Priraď nemecké slová k slovenským prekladom (lekcie ${startL + 5}–${lessonNum}).', pairs: [...] }
   - 10 pairs from lessons ${startL + 5}–${lessonNum} (second 5 lessons of the block)

3. WORDORDER #1: { type: 'wordorder', instruction: 'Zoraď slová do správneho poriadku.', sentences: [{words, correct, hint, explanation}] }
   - 6 sentences mixing grammar rules from the first 5 lessons
   - words[] = shuffled tokens (NO punctuation tokens)
   - correct = assembled sentence WITHOUT trailing punctuation
   - hint = Slovak translation
   - explanation = which grammar rule applies

4. WORDORDER #2: { type: 'wordorder', ... }
   - 6 sentences mixing grammar rules from the second 5 lessons

5. FILL #1 (grammar-focused): { type: 'fill', instruction: 'Doplň správny tvar slova (gramatika).', questions: [{sentence, answer, hint, explanation}] }
   - 8 questions. Each tests a DIFFERENT grammar rule from the ${lessonCount} lessons.
   - Include "trap" questions where two similar rules could apply.
   - explanation REQUIRED — name which grammar rule is being tested.

6. FILL #2 (vocab-focused): { type: 'fill', instruction: 'Doplň správne slovíčko.', questions: [...] }
   - 8 questions. Each tests vocabulary knowledge — the blank is a content word.

7. LISTEN: { type: 'listen', instruction: 'Počúvaj a napíš, čo počuješ.', questions: [{de, sk}] }
   - 10 items. Pick the HARDEST words from across all ${lessonCount} lessons (compounds, umlauts, long words).
   - Order: easier first, harder last.

8. MCQ #1 (grammar): { type: 'mcq', instruction: 'Vyber správnu odpoveď (gramatika).', questions: [{question, options (4), answer (0-based index), explanation}] }
   - 8 questions. Each tests grammar comprehension across different lessons.
   - Distractors must exploit REAL confusion between similar grammar rules.

9. MCQ #2 (vocab): { type: 'mcq', instruction: 'Vyber správnu odpoveď (slovná zásoba).', questions: [...] }
   - 8 questions. Vocabulary recall — translate, identify, use in context.

ALL exercises must use ONLY vocabulary and grammar from lessons ${startL}–${lessonNum}. NO new words.

OUTPUT FORMAT — output ONLY a valid JS array of 9 exercise objects in the order listed above:
[match1, match2, wordorder1, wordorder2, fill1, fill2, listen, mcq1, mcq2]`;
}

function build1GRecapPromptPartB(lessonNum, startL, grammarLevel, vocabJson, grammarRulesJson) {
  const lessonCount = lessonNum - startL + 1;
  return `
=== SUB-AGENT 1G — COMPREHENSIVE RECAP: PART B (minitext + speaking + truefalse + dictation + categorysort + translation + conjugation) ===

TASK: Create 7 exercises for the comprehensive recap covering lessons L${String(startL).padStart(2, '0')}–L${String(lessonNum).padStart(2, '0')}.
This is a CONSOLIDATION session — no new material.

GRAMMAR LEVEL CEILING: ${grammarLevel}

VOCABULARY POOL (all words from L${startL}–L${lessonNum}):
${vocabJson}

GRAMMAR RULES COVERED:
${grammarRulesJson}

GENERATE THESE 7 EXERCISES IN THIS EXACT ORDER:

1. MINITEXT: { type: 'minitext', instruction: 'Prečítaj text a odpovedz na otázky.', text: string, textSk: string, questions: [...] }
   - text: 100-120 words. A story about Jana that naturally uses vocabulary from across ALL ${lessonCount} lessons.
   - The text must combine multiple grammar structures learned across the ${lessonCount} lessons.
   - 5 comprehension MCQ questions (each: question, options[4], answer 0-based, explanation).

2. SPEAKING: { type: 'speaking', instruction: 'Precvič výslovnosť kľúčových fráz.', phrases: [{de, sk, tip}] }
   - 10 key phrases from across ALL 10 lessons. Pick the most important/useful ones.
   - tip ≤ 60 chars each.

3. TRUEFALSE: { type: 'truefalse', instruction: 'Rozhodni, či je výrok pravdivý alebo nepravdivý.', statements: [{statement, isTrue, explanation}] }
   - 8 statements about grammar rules from the ${lessonCount} lessons.
   - statement: German sentence or grammar claim
   - isTrue: boolean
   - explanation: Slovak explanation of why true/false

4. DICTATION: { type: 'dictation', instruction: 'Počúvaj a zapíš vety.', sentences: [{de, sk, hint}] }
   - 8 sentences using vocabulary from across the ${lessonCount} lessons.
   - Progressive difficulty: short simple → longer complex.
   - hint: first 2-3 words of the German sentence.

5. CATEGORYSORT: { type: 'categorysort', instruction: 'Zaraď slová do správnych kategórií.', categories: [{name, color, words}] }
   - 3-4 categories based on a grammar concept that spans the 10 lessons.
   - Each category: 4-6 words. Total: ~16-20 words.
   - Good categories: gender (der/die/das), verb type (regular/irregular/stem-change), word class (noun/verb/adjective).

6. TRANSLATION: { type: 'translation', instruction: 'Prelož vety do nemčiny.', sentences: [{sk, answer, hint, explanation}] }
   - 6 sentences. Key structures from across all ${lessonCount} lessons.
   - sk = Slovak source, answer = correct German translation
   - hint = first word or key word of the German translation
   - explanation = grammar rule used

7. CONJUGATION: { type: 'conjugation', instruction: 'Doplň správne tvary slovies.', verbs: [{infinitive, translation, forms: [{pronoun, correct}], note}] }
   - 4 verbs from across the ${lessonCount} lessons (mix of regular, irregular, stem-change).
   - Each verb: 3-6 pronoun forms.
   - note: Slovak explanation of the pattern.

ALL exercises must use ONLY vocabulary and grammar from lessons ${startL}–${lessonNum}. NO new words.

OUTPUT FORMAT — output ONLY a valid JS array of 7 exercise objects in the order listed above:
[minitext, speaking, truefalse, dictation, categorysort, translation, conjugation]`;
}

function assembleRecapLesson(lessonNum, startL, partA, partB) {
  const lessonCount = lessonNum - startL + 1;
  const { week } = getLessonWeekDay(lessonNum);

  const exercises = [
    { type: 'flashcard', instruction: `Zopakuj si slovíčka z lekcií ${startL}–${lessonNum}. Klikni na kartičku pre preklad.` },
    ...partA,   // 9 exercises: match×2, wordorder×2, fill×2, listen, mcq×2
    ...partB,   // 7 exercises: minitext, speaking, truefalse, dictation, categorysort, translation, conjugation
  ];

  return {
    id: lessonNum + 0.5,
    week,
    day: 6,
    title: `Rückblick: Lektionen ${startL}–${lessonNum}`,
    topic: `Veľké opakovanie lekcií ${startL}–${lessonNum}`,
    cefr: 'A1',
    xpReward: 60,
    narrativeContext: `Jana schaut zurück auf alles, was sie in den letzten ${lessonCount} Lektionen gelernt hat — eine große Konsolidierung.`,
    communicativeGoal: `Nach dieser Lektion kann ich alle Wörter und Grammatik aus Lektionen ${startL}–${lessonNum} aktiv benutzen.`,
    skillFocus: ['vocabulary', 'grammar', 'listening', 'reading', 'writing', 'speaking', 'pronunciation'],
    lessonNotes: `Veľké komplexné opakovanie ${lessonCount} lekcií (L${startL}–L${lessonNum}). Žiadna nová látka — iba precvičovanie. ${exercises.length} cvičení.`,
    grammarNotes: [],
    vocab: [],
    exercises,
    reviewWords: [],
  };
}

async function generateRecapLesson(lessonNum) {
  const pad = String(lessonNum).padStart(2, '0');
  // Compute recap range: every 30 lessons; L80 special case covers L61–L80 (20 lessons)
  const startL = lessonNum === 80 ? 61 : lessonNum - 29;
  const lessonCount = lessonNum - startL + 1;
  console.log(`\n${'═'.repeat(70)}`);
  console.log(`  SUB-AGENT 1G: Comprehensive Recap L${String(startL).padStart(2, '0')}–L${pad} (${lessonCount} lessons)`);
  console.log(`${'═'.repeat(70)}`);

  // Gather context from all covered lessons
  console.log('\n📋 Gathering recap context...');
  const { allVocab, allGrammarRules } = gatherRecapContext(lessonNum, startL);
  const grammarLevel = getGrammarLevel(lessonNum);

  console.log(`  Vocabulary pool: ${allVocab.length} words from L${String(startL).padStart(2, '0')}–L${pad}`);
  console.log(`  Grammar rules: ${allGrammarRules.length} rules`);
  console.log(`  Grammar level: ${grammarLevel.substring(0, 60)}...`);

  const vocabJson = JSON.stringify(allVocab.map(v => `${v.de} = ${v.sk} (L${v.fromLesson})`), null, 1);
  const grammarRulesJson = allGrammarRules.map(g => `- L${String(g.fromLesson).padStart(2, '0')}: ${g.rule}`).join('\n');
  const systemPrompt = buildSystemPrompt();

  // Part A: match×2, wordorder×2, fill×2, listen, mcq×2 (9 exercises)
  console.log('\n🏋️ Part A: Core recap exercises (9 exercises)...');
  const partA = await callSubAgent(
    systemPrompt,
    build1GRecapPromptPartA(lessonNum, startL, grammarLevel, vocabJson, grammarRulesJson),
    { temperature: 0.4, maxTokens: 25000 },
    '1G-RecapPartA'
  );
  console.log(`  ✓ Got ${partA.length} core recap exercises: ${partA.map(e => e.type).join(', ')}`);

  // Part B: minitext, speaking, truefalse, dictation, categorysort, translation, conjugation (7 exercises)
  console.log('\n📊 Part B: Extended recap exercises (7 exercises)...');
  const partB = await callSubAgent(
    systemPrompt,
    build1GRecapPromptPartB(lessonNum, startL, grammarLevel, vocabJson, grammarRulesJson),
    { temperature: 0.4, maxTokens: 25000 },
    '1G-RecapPartB'
  );
  console.log(`  ✓ Got ${partB.length} extended recap exercises: ${partB.map(e => e.type).join(', ')}`);

  // Auto-fix wordorder trailing punctuation
  for (const ex of [...partA, ...partB]) {
    if (ex.type === 'wordorder' && Array.isArray(ex.sentences)) {
      for (const s of ex.sentences) {
        if (s.correct) s.correct = s.correct.replace(/[.!?]+\s*$/, '').trim();
        if (Array.isArray(s.words)) s.words = s.words.filter(w => !/^[.!?]+$/.test(w));
      }
    }
    if (ex.type === 'speaking' && Array.isArray(ex.phrases)) {
      for (const p of ex.phrases) {
        if (p.tip && p.tip.length > 60) p.tip = p.tip.substring(0, 57) + '...';
      }
    }
  }

  // Assemble
  console.log('\n🔧 Assembling recap lesson...');
  const recapLesson = assembleRecapLesson(lessonNum, startL, partA, partB);
  console.log(`  ✓ Assembled: ${recapLesson.exercises.length} exercises (target: 17+)`);

  // Self-check (lite — no vocab/grammar checks since recap has none)
  const issues = [];
  if (recapLesson.exercises.length < 15) issues.push(`Too few exercises: ${recapLesson.exercises.length} (expected 17+)`);
  const types = recapLesson.exercises.map(e => e.type);
  for (const expected of ['match', 'wordorder', 'fill', 'listen', 'mcq', 'minitext', 'speaking', 'truefalse', 'dictation', 'categorysort', 'translation', 'conjugation']) {
    if (!types.includes(expected)) issues.push(`Missing exercise type: ${expected}`);
  }
  if (issues.length > 0) {
    console.log(`  ⚠ Found ${issues.length} issue(s):`);
    for (const i of issues) console.log(`    - ${i}`);
  } else {
    console.log('  ✅ Recap self-check passed!');
  }

  // Write file
  if (DRY_RUN) {
    console.log(`\n🏁 DRY RUN — would write L${pad}R.js (${JSON.stringify(recapLesson).length} chars)`);
  } else {
    const filePath = path.join(LESSONS_DIR, `L${pad}R.js`);
    const varName = `lesson${pad}R`;
    let json = JSON.stringify(recapLesson, null, 2);
    json = json.replace(/"(\w+)":/g, '$1:');
    const content = `export const ${varName} = ${json};\n`;

    if (fs.existsSync(filePath)) {
      fs.copyFileSync(filePath, filePath + '.bak');
      console.log(`  📦 Backed up existing L${pad}R.js`);
    }
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  ✅ Written: ${filePath} (${content.length} chars)`);
  }

  return recapLesson;
}


// ══════════════════════════════════════════════════════════════════════════════
// PARSING HELPERS
// ══════════════════════════════════════════════════════════════════════════════

function parseJSValue(text) {
  // Try to extract JS array or object from the response
  let cleaned = text.trim();

  // Remove markdown code fences if present
  cleaned = cleaned.replace(/^```(?:javascript|js|json)?\s*\n?/i, '').replace(/\n?```\s*$/, '');
  cleaned = cleaned.trim();

  // Remove any leading "const x = " or "export const x = "
  cleaned = cleaned.replace(/^(?:export\s+)?(?:const|let|var)\s+\w+\s*=\s*/, '');
  // Remove trailing semicolons
  cleaned = cleaned.replace(/;\s*$/, '');

  // Fix common LLM output issues:
  // 1. Trailing commas before closing brackets
  cleaned = cleaned.replace(/,(\s*[\]}])/g, '$1');
  // 2. Truncated response — try to close unclosed brackets
  const openBrackets = (cleaned.match(/\[/g) || []).length;
  const closeBrackets = (cleaned.match(/\]/g) || []).length;
  const openBraces = (cleaned.match(/\{/g) || []).length;
  const closeBraces = (cleaned.match(/\}/g) || []).length;

  if (openBrackets > closeBrackets || openBraces > closeBraces) {
    // Response was truncated — try to salvage it
    console.log('  ⚠ Response appears truncated — attempting repair...');
    // Remove last incomplete entry (anything after the last complete }, or ],)
    cleaned = cleaned.replace(/,\s*\{[\s\S]*?$/, '');   // remove trailing incomplete object (multiline)
    cleaned = cleaned.replace(/,\s*'[^']*$/, '');          // remove trailing incomplete single-quoted string
    cleaned = cleaned.replace(/,\s*"[^"]*$/, '');         // remove trailing incomplete double-quoted string
    // If a string value is still open (odd number of unescaped quotes), close it
    const sqCount = (cleaned.match(/(?<!\\)'/g) || []).length;
    const dqCount = (cleaned.match(/(?<!\\)"/g) || []).length;
    if (sqCount % 2 !== 0) cleaned += "'";
    if (dqCount % 2 !== 0) cleaned += '"';
    // Add missing closing brackets
    const ob2 = (cleaned.match(/\[/g) || []).length;
    const cb2 = (cleaned.match(/\]/g) || []).length;
    const obr2 = (cleaned.match(/\{/g) || []).length;
    const cbr2 = (cleaned.match(/\}/g) || []).length;
    for (let i = 0; i < obr2 - cbr2; i++) cleaned += '}';
    for (let i = 0; i < ob2 - cb2; i++) cleaned += ']';
    // Re-fix trailing commas after repair
    cleaned = cleaned.replace(/,(\s*[\]}])/g, '$1');
  }

  // 3. Fix single quotes in nested strings (LLM sometimes produces: example: 'It's nice')
  //    This is hard to fix generically, so we just try and catch errors

  // Try direct eval (in a safe context — it's lesson data, not user input)
  try {
    const fn = new Function(`return (${cleaned});`);
    return fn();
  } catch (e1) {
    // Try JSON parse (convert JS to JSON first)
    try {
      // Convert single-quoted strings to double-quoted
      let jsonStr = cleaned
        .replace(/'/g, '"')
        .replace(/(\w+)\s*:/g, '"$1":')  // Add quotes to keys
        .replace(/,(\s*[\]}])/g, '$1');    // Remove trailing commas
      return JSON.parse(jsonStr);
    } catch (e2) {
      // Last resort: try to extract the first complete array/object
      try {
        let depth = 0;
        let start = -1;
        let end = -1;
        const opener = cleaned[0] === '[' ? '[' : '{';
        const closer = opener === '[' ? ']' : '}';
        for (let i = 0; i < cleaned.length; i++) {
          if (cleaned[i] === opener) { if (start === -1) start = i; depth++; }
          if (cleaned[i] === closer) { depth--; if (depth === 0 && start !== -1) { end = i; break; } }
        }
        if (start !== -1 && end !== -1) {
          const extracted = cleaned.substring(start, end + 1);
          const fn = new Function(`return (${extracted});`);
          return fn();
        }
      } catch (e3) { /* fall through */ }

      console.error('  ❌ Failed to parse response. Raw text (first 500 chars):');
      console.error(cleaned.substring(0, 500));
      throw new Error(`Parse error: ${e1.message}`);
    }
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// SELF-CHECK (Step 9)
// ══════════════════════════════════════════════════════════════════════════════

function selfCheck(lesson, lessonNum) {
  const errors = [];
  const pad = String(lessonNum).padStart(2, '0');
  const warn = (msg) => errors.push(msg);

  // Structure checks
  if (lesson.id !== lessonNum) warn(`id should be ${lessonNum}, got ${lesson.id}`);
  const { week, day } = getLessonWeekDay(lessonNum);
  if (lesson.week !== week) warn(`week should be ${week}, got ${lesson.week}`);
  if (lesson.day !== day) warn(`day should be ${day}, got ${lesson.day}`);
  if (!lesson.title) warn('title is empty');
  if (!lesson.topic) warn('topic is empty');
  if (lesson.cefr !== 'A1') warn(`cefr should be 'A1', got '${lesson.cefr}'`);
  if (!lesson.narrativeContext) warn('narrativeContext is empty');
  if (!lesson.communicativeGoal) warn('communicativeGoal is empty');
  if (!Array.isArray(lesson.skillFocus) || lesson.skillFocus.length === 0) warn('skillFocus is empty');
  if (!lesson.lessonNotes) warn('lessonNotes is empty');

  // grammarNotes checks
  if (!Array.isArray(lesson.grammarNotes) || lesson.grammarNotes.length < 2) {
    warn(`grammarNotes should be an array with 2+ items, got ${Array.isArray(lesson.grammarNotes) ? lesson.grammarNotes.length : typeof lesson.grammarNotes}`);
  } else {
    for (let i = 0; i < lesson.grammarNotes.length; i++) {
      const gn = lesson.grammarNotes[i];
      if (!gn.rule) warn(`grammarNotes[${i}].rule is empty`);
      if (!gn.explanation || gn.explanation.length < 50) warn(`grammarNotes[${i}].explanation too short (${gn.explanation?.length || 0} chars, need 50+)`);
      if (!Array.isArray(gn.examples) || gn.examples.length < 3) warn(`grammarNotes[${i}].examples should have 3+ items`);
      if (!gn.slovakContrastNote) warn(`grammarNotes[${i}].slovakContrastNote is empty`);
    }
  }

  // Vocab checks
  if (!Array.isArray(lesson.vocab)) {
    warn('vocab is not an array');
  } else {
    if (lesson.vocab.length < 20 || lesson.vocab.length > 25) warn(`vocab has ${lesson.vocab.length} items (need 20-25)`);
    const seenSrsIds = new Set();
    for (let i = 0; i < lesson.vocab.length; i++) {
      const v = lesson.vocab[i];
      if (!v.de) warn(`vocab[${i}].de is empty`);
      if (!v.sk) warn(`vocab[${i}].sk is empty`);
      if (v.gender !== null && !['M', 'F', 'N'].includes(v.gender)) warn(`vocab[${i}].gender invalid: ${v.gender}`);
      if (!v.srsId || !v.srsId.startsWith(`L${pad}_V`)) warn(`vocab[${i}].srsId invalid: ${v.srsId}`);
      if (seenSrsIds.has(v.srsId)) warn(`vocab[${i}].srsId duplicate: ${v.srsId}`);
      seenSrsIds.add(v.srsId);
      if (!v.example) warn(`vocab[${i}].example is empty`);
      if (!v.exampleSk) warn(`vocab[${i}].exampleSk is empty`);
      if (!Array.isArray(v.recycledFrom)) warn(`vocab[${i}].recycledFrom is not an array`);
    }
  }

  // Exercise checks
  const expectedTypes = [
    ['flashcard'],
    ['match'],
    ['wordorder'],
    ['fill'],
    ['listen'],
    ['mcq'],
    ['minitext'],
    ['speaking'],
    ['truefalse'],
    ['dictation'],
    ['categorysort', 'fill'], // Flex position: can be categorysort OR fill
    ['translation'],
    ['conjugation']
  ];
  if (!Array.isArray(lesson.exercises)) {
    warn('exercises is not an array');
  } else {
    const types = lesson.exercises.map(e => e.type);
    for (let i = 0; i < expectedTypes.length; i++) {
      if (!expectedTypes[i].includes(types[i])) {
        warn(`exercises[${i}] should be one of '${expectedTypes[i].join(', ')}', got '${types[i] || 'MISSING'}'`);
      }
    }

    for (const ex of lesson.exercises) {
      switch (ex.type) {
        case 'flashcard':
          if (ex.items) warn('flashcard has items[] — REMOVE IT. FlashcardExercise reads lesson.vocab directly.');
          break;
        case 'match':
          if (!Array.isArray(ex.pairs) || ex.pairs.length < 6) warn(`match.pairs needs 6+, got ${ex.pairs?.length}`);
          break;
        case 'wordorder':
          if (!Array.isArray(ex.sentences) || ex.sentences.length < 4) warn(`wordorder.sentences needs 4+, got ${ex.sentences?.length}`);
          for (const s of (ex.sentences || [])) {
            if (!s.explanation) warn('wordorder sentence missing explanation');
            if (s.correct && /[.?!]$/.test(s.correct.trim())) warn(`wordorder.correct has trailing punctuation: "${s.correct}"`);
          }
          break;
        case 'fill':
          if (!Array.isArray(ex.questions) || ex.questions.length < 4) warn(`fill.questions needs 4+, got ${ex.questions?.length}`);
          for (const q of (ex.questions || [])) {
            if (!q.explanation) warn('fill question missing explanation');
          }
          break;
        case 'listen':
          if (ex.pairs) warn('listen uses "pairs" instead of "questions" — WRONG FIELD NAME');
          if (!Array.isArray(ex.questions) || ex.questions.length < 6) warn(`listen.questions needs 6+, got ${ex.questions?.length}`);
          break;
        case 'mcq':
          if (!Array.isArray(ex.questions) || ex.questions.length < 4) warn(`mcq.questions needs 4+, got ${ex.questions?.length}`);
          for (const q of (ex.questions || [])) {
            if (typeof q.answer !== 'number') warn(`mcq answer should be number, got ${typeof q.answer}: ${q.answer}`);
            if (q.answer < 0 || q.answer > 3) warn(`mcq answer out of range: ${q.answer}`);
            if (!q.explanation) warn('mcq question missing explanation');
            if (!Array.isArray(q.options) || q.options.length !== 4) warn(`mcq options should have 4, got ${q.options?.length}`);
          }
          break;
        case 'minitext':
          if (!ex.text) warn('minitext.text is empty');
          else {
            const wordCount = ex.text.split(/\s+/).length;
            if (wordCount > 100) warn(`minitext.text has ${wordCount} words (max 100)`);
          }
          if (!ex.textSk) warn('minitext.textSk is empty');
          for (const q of (ex.questions || [])) {
            if (typeof q.answer !== 'number') warn(`minitext question answer should be number, got ${typeof q.answer}`);
          }
          break;
        case 'speaking':
          if (!Array.isArray(ex.phrases) || ex.phrases.length < 5) warn(`speaking.phrases needs 5+, got ${ex.phrases?.length}`);
          for (const p of (ex.phrases || [])) {
            if (p.tip && p.tip.length > 65) warn(`speaking tip too long (${p.tip.length} chars): "${p.tip}"`);
          }
          break;
        case 'truefalse':
          if (!Array.isArray(ex.statements) || ex.statements.length < 5) warn(`truefalse.statements needs 5, got ${ex.statements?.length}`);
          for (const s of (ex.statements || [])) {
            if (typeof s.isTrue !== 'boolean') warn(`truefalse uses wrong field — needs isTrue (boolean), got: ${JSON.stringify(Object.keys(s))}`);
          }
          break;
        case 'dictation':
          if (!Array.isArray(ex.sentences) || ex.sentences.length < 4) warn(`dictation.sentences needs 4+, got ${ex.sentences?.length}`);
          break;
        case 'categorysort':
          if (!Array.isArray(ex.categories) || ex.categories.length < 2) warn(`categorysort.categories needs 2+, got ${ex.categories?.length}`);
          for (const c of (ex.categories || [])) {
            if (!c.name) warn('categorysort category missing name');
            if (!Array.isArray(c.words) || c.words.length < 3) warn(`categorysort category "${c.name}" has too few words`);
          }
          break;
        case 'translation':
          if (!Array.isArray(ex.sentences) || ex.sentences.length < 4) warn(`translation.sentences needs 4, got ${ex.sentences?.length}`);
          for (const s of (ex.sentences || [])) {
            if (!s.sk) warn('translation sentence missing sk');
            if (!s.answer) warn('translation sentence missing answer');
          }
          break;
        case 'conjugation':
          if (!Array.isArray(ex.verbs) || ex.verbs.length < 1) warn(`conjugation.verbs needs 1+, got ${ex.verbs?.length}`);
          for (const v of (ex.verbs || [])) {
            if (!v.infinitive) warn('conjugation verb missing infinitive');
            if (!Array.isArray(v.forms) || v.forms.length < 3) warn(`conjugation verb "${v.infinitive}" has too few forms`);
            for (const f of (v.forms || [])) {
              if (!f.pronoun) warn('conjugation form missing pronoun');
              if (!f.correct) warn(`conjugation form for "${f.pronoun}" missing correct`);
            }
          }
          break;
      }
    }
  }

  // reviewWords check
  if (!Array.isArray(lesson.reviewWords)) warn('reviewWords is not an array');

  return errors;
}

function build1ZPrompt(lessonNum, syllabusLine, draftLessonJson) {
  return `
=== SUB-AGENT 1Z — PEDAGOGICAL REVIEW AND SELF-CORRECTION ===

TASK: You are the Senior Editor Pedagogue. Review the attached drafting of Lesson ${lessonNum} (${syllabusLine}).
Your goal is to fix logical flaws, ambiguity, and poor writing.

THE DRAFT LESSON JSON:
${draftLessonJson}

REVIEW RUBRIC:
1. AMBIGUITY: Look at every "fill" and "dictation" exercise. Is there only ONE logical answer? Fix any ambiguous questions by adding context.
2. STANDALONE RULE: Look at all exercises (except minitext questions). Do ANY of them reference specific names, lore, or events from the minitext? If yes, rewrite them to be universally understandable.
3. GRAMMAR DENSITY: Are the grammarNotes walls of text? Ensure they use HTML <ul>, <li>, <strong>, and short punchy sentences.
4. CATEGORY SORT: If there's a categorysort exercise, do the categories make grammatical/logical sense? If they sorting numbers by value or doing something illogical, change it to a generic vocabulary sort or grammar sort.
5. NATURAL GERMAN: Ensure all German sentences sound like natural spoken A1 German, not robotic textbook German.

OUTPUT FORMAT:
Do NOT return the entire lesson! That runs out of tokens.
Only return a JSON object with the keys that you want to OVERRIDE in the original JSON.
If you need to fix exercises, do NOT return the full 'exercises' array. Instead, use an 'overrideExercises' array containing the index (0-based) and the corrected exercise object:
{
  "grammarNotes": [...fixed grammar notes...],
  "overrideExercises": [
    { "index": 3, "exercise": {...entire fixed exercise...} }
  ]
}
If there are no changes, just return {}.
Return the valid JSON object starting with { and ending with }.`;
}

// ══════════════════════════════════════════════════════════════════════════════
// ASSEMBLER (Step 8)
// ══════════════════════════════════════════════════════════════════════════════

function assemblelesson(lessonNum, metadata, grammarNotes, vocab, minitext, coreExercises, speaking, extendedExercises) {
  const { week, day } = getLessonWeekDay(lessonNum);

  // Build exercises array in correct order
  const flashcard = { type: 'flashcard', instruction: 'Prezri si slovíčka tejto lekcie. Klikni na kartičku pre preklad.' };

  // Auto-fix wordorder trailing punctuation
  for (const ex of coreExercises) {
    if (ex.type === 'wordorder' && Array.isArray(ex.sentences)) {
      for (const s of ex.sentences) {
        if (s.correct) {
          s.correct = s.correct.replace(/[.!?]+\s*$/, '').trim();
        }
        // Remove punctuation tokens from words array
        if (Array.isArray(s.words)) {
          s.words = s.words.filter(w => !/^[.!?]+$/.test(w));
        }
      }
    }
  }

  // Auto-fix speaking tip length (truncate to 60 chars)
  if (speaking && Array.isArray(speaking.phrases)) {
    for (const p of speaking.phrases) {
      if (p.tip && p.tip.length > 60) {
        p.tip = p.tip.substring(0, 57) + '...';
      }
    }
  }

  const exercises = [
    flashcard,
    ...coreExercises,  // match, wordorder, fill, listen, mcq
    minitext,
    speaking,
    ...extendedExercises, // truefalse, dictation, categorysort, translation, conjugation
  ];

  // Extract review words (de strings from prior lessons used in exercises — simplified: empty for now)
  const reviewWords = [];

  return {
    id: lessonNum,
    week,
    day,
    title: metadata.title || '',
    topic: metadata.topic || '',
    cefr: 'A1',
    xpReward: metadata.xpReward || 20,
    narrativeContext: metadata.narrativeContext || '',
    communicativeGoal: metadata.communicativeGoal || '',
    skillFocus: metadata.skillFocus || ['vocabulary', 'grammar', 'reading', 'speaking'],
    lessonNotes: metadata.lessonNotes || '',
    grammarNotes,
    vocab,
    exercises,
    reviewWords,
  };
}

// ══════════════════════════════════════════════════════════════════════════════
// FILE WRITER (Step 10)
// ══════════════════════════════════════════════════════════════════════════════

function serializeLessonToJS(lesson, lessonNum) {
  const pad = String(lessonNum).padStart(2, '0');
  const varName = `lesson${pad}`;

  // Use JSON.stringify with nice formatting, then convert to JS
  let json = JSON.stringify(lesson, null, 2);

  // Convert JSON to JS (unquote keys, use single quotes for simple strings)
  // Keep double quotes for strings containing single quotes or HTML
  json = json.replace(/"(\w+)":/g, '$1:');

  const output = `export const ${varName} = ${json};\n`;
  return output;
}

function writeLessonFile(lesson, lessonNum) {
  const pad = String(lessonNum).padStart(2, '0');
  const filePath = path.join(LESSONS_DIR, `L${pad}.js`);
  const content = serializeLessonToJS(lesson, lessonNum);

  // Backup existing file
  if (fs.existsSync(filePath)) {
    const backupPath = filePath + '.bak';
    fs.copyFileSync(filePath, backupPath);
    console.log(`  📦 Backed up existing L${pad}.js → L${pad}.js.bak`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`  ✅ Written: ${filePath} (${content.length} chars)`);
}

// ══════════════════════════════════════════════════════════════════════════════
// SUB-AGENT CALL WITH RETRY
// ══════════════════════════════════════════════════════════════════════════════

async function callSubAgent(systemPrompt, userPrompt, opts = {}, label = 'sub-agent') {
  const maxRetries = 2;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const raw = await callGemini(systemPrompt, userPrompt, opts);
      const parsed = parseJSValue(raw);
      return parsed;
    } catch (err) {
      if (attempt < maxRetries) {
        console.log(`  ⚠ ${label} attempt ${attempt + 1} failed: ${err.message}. Retrying...`);
        await new Promise(r => setTimeout(r, 2000));
      } else {
        throw new Error(`${label} failed after ${maxRetries + 1} attempts: ${err.message}`);
      }
    }
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN PIPELINE
// ══════════════════════════════════════════════════════════════════════════════

async function generateLesson(lessonNum, accumulatedVocab = []) {
  const pad = String(lessonNum).padStart(2, '0');
  const { week, day } = getLessonWeekDay(lessonNum);
  console.log(`\n${'═'.repeat(70)}`);
  console.log(`  AGENT 1: Generating L${pad} (Week ${week}, Day ${day})`);
  console.log(`${'═'.repeat(70)}`);

  // ── Step 1: Gather context ─────────────────────────────────────────────────
  console.log('\n📋 Step 1: Gathering context...');
  const syllabusLine = getSyllabusLine(lessonNum);
  const narrative = getNarrativeBrief(lessonNum);
  const grammarLevel = getGrammarLevel(lessonNum);
  const exclusionList = buildExclusionList(lessonNum, accumulatedVocab);
  const prevSummary = getPreviousLessonSummary(lessonNum);
  const spiralGrammar = getSpiralGrammarList(lessonNum);

  console.log(`  Syllabus: ${syllabusLine}`);
  console.log(`  Grammar level: ${grammarLevel.substring(0, 60)}...`);
  console.log(`  Excluded vocab: ${exclusionList.length} words`);
  console.log(`  Narrative: ${narrative.substring(0, 100)}...`);

  const systemPrompt = buildSystemPrompt();

  // ── Step 2: Sub-agent 1A — Vocabulary ──────────────────────────────────────
  console.log('\n🔤 Step 2: Sub-agent 1A — Vocabulary Builder...');
  let vocab = await callSubAgent(systemPrompt, build1APrompt(lessonNum, syllabusLine, narrative, grammarLevel, exclusionList, prevSummary), { temperature: 0.4, maxTokens: 16000 }, '1A-Vocab');
  if (vocab && !Array.isArray(vocab)) {
    console.log('  ⚠ Vocab is not an array. Raw object keys:', Object.keys(vocab));
    const possibleArrayKey = Object.keys(vocab).find(k => Array.isArray(vocab[k]));
    if (possibleArrayKey) vocab = vocab[possibleArrayKey];
    else vocab = Object.values(vocab).find(v => Array.isArray(v)) || vocab;
  }
  if (!Array.isArray(vocab)) vocab = [];
  console.log(`  ✓ Got ${vocab.length} vocab items`);

  // ── Step 3: Sub-agent 1B — Grammar Notes ───────────────────────────────────
  console.log('\n📖 Step 3: Sub-agent 1B — Grammar Note Writer...');
  let grammarNotes = await callSubAgent(systemPrompt, build1BPrompt(lessonNum, syllabusLine, grammarLevel, prevSummary), { temperature: 0.3, maxTokens: 10000 }, '1B-Grammar');
  if (grammarNotes && !Array.isArray(grammarNotes)) {
    const possibleArrayKey = Object.keys(grammarNotes).find(k => Array.isArray(grammarNotes[k]));
    if (possibleArrayKey) grammarNotes = grammarNotes[possibleArrayKey];
    else grammarNotes = Object.values(grammarNotes).find(v => Array.isArray(v)) || grammarNotes;
  }
  console.log(`  ✓ Got ${grammarNotes?.length} grammar note blocks`);

  // ── Step 4: Sub-agent 1C — Minitext ────────────────────────────────────────
  console.log('\\n📝 Step 4: Sub-agent 1C — Minitext Dialogue Writer...');
  const vocabJson = JSON.stringify(vocab.map(v => ({ de: v.de, sk: v.sk })), null, 1);
  const minitext = await callSubAgent(systemPrompt, build1CPrompt(lessonNum, syllabusLine, narrative, grammarLevel, vocabJson), { temperature: 0.5, maxTokens: 12000 }, '1C-Minitext');
  console.log(`  ✓ Got minitext (${minitext.text?.split(/\\s+/).length || 0} words)`);

  const grammarNotesJson = JSON.stringify(grammarNotes.map(g => ({ rule: g.rule, explanation: g.explanation?.substring(0, 200) })), null, 1);

  // ── Step 4.5: Sub-agent POOL — Persona-Driven Sentence Generator ───────────
  console.log('\\n🎭 Step 4.5: Generating sentences via 4 Personas...');
  const vocabChunks = [[], [], [], []];
  vocab.forEach((v, i) => vocabChunks[i % 4].push(v));

  const personas = [
    {
      name: "The Inquisitive Journalist",
      instruction: "You are a highly direct, slightly rude journalist interviewing a celebrity. Write 15 sentences (mostly questions). Ask about them, their team, and their rivals. Natural result: High concentration of 'Sie', 'du', 'ihr', W-Fragen, Ja/Nein Fragen. Zero 'ich'."
    },
    {
      name: "The Complaining Teenager",
      instruction: "You are a frustrated teenager complaining to a friend. Write 15 sentences about how annoying the people around you are. Be dramatic. Natural result: High concentration of negations like 'nicht/kein', 3rd person 'er/sie', 'mein/meine', emotional statements."
    },
    {
      name: "The Objective Detective",
      instruction: "You are a detective writing an objective observation report about a group of suspects. Write 15 facts. Natural result: High concentration of specific nouns, 3rd person plural 'sie', objective statements, 'sein/ihr'."
    },
    {
      name: "The Enthusiastic Tour Guide",
      instruction: "You are an enthusiastic tour guide addressing a group of tourists. Write 15 sentences showing them around. Natural result: High concentration of 'wir', 'ihr', 'unser', imperative structures, exclamations."
    }
  ];

  const sentencePool = [];
  for (let i = 0; i < personas.length; i++) {
    const p = personas[i];
    console.log(`    -> Running Persona ${i + 1}: ${p.name}...`);
    const prompt = buildPersonaPrompt(p.name, p.instruction, vocabChunks[i], vocabJson, grammarLevel, syllabusLine, grammarNotesJson);
    const raw = await callSubAgent(systemPrompt, prompt, { temperature: 0.7, maxTokens: 4000 }, `POOL-Persona-${i + 1}`);
    const arr = Array.isArray(raw) ? raw : (Object.values(raw).find(v => Array.isArray(v)) || []);
    sentencePool.push(...arr);
  }

  // Shuffle pool to distribute personas randomly before routing slices
  const shuffledPool = [...sentencePool].sort(() => Math.random() - 0.5);

  const slices = {
    wordorder: shuffledPool.slice(0, 6) || [],
    fill: shuffledPool.slice(6, 12) || [],
    listen: shuffledPool.slice(12, 18) || [],
    mcq: shuffledPool.slice(18, 24) || [],
    speaking: shuffledPool.slice(24, 32) || [],
    truefalse: shuffledPool.slice(32, 38) || [],
    dictation: shuffledPool.slice(38, 44) || [],
    translation: shuffledPool.slice(44, 49) || [],
    flex: shuffledPool.slice(49, 56) || []
  };

  console.log(`  ✓ Got sentence pool: ${sentencePool.length} sentences. Sliced into matrix.`);

  // ── Step 5: Sub-agent 1D — Core exercises ──────────────────────────────────
  console.log('\\n🏋️ Step 5: Sub-agent 1D — Exercise Generator (core 5)...');
  let coreExercises = await callSubAgent(systemPrompt, build1DPrompt(lessonNum, syllabusLine, grammarLevel, vocabJson, grammarNotesJson, spiralGrammar, slices), { temperature: 0.4, maxTokens: 15000 }, '1D-CoreExercises');
  if (coreExercises && !Array.isArray(coreExercises)) {
    const possibleArrayKey = Object.keys(coreExercises).find(k => Array.isArray(coreExercises[k]));
    if (possibleArrayKey) coreExercises = coreExercises[possibleArrayKey];
    else coreExercises = Object.values(coreExercises).find(v => Array.isArray(v)) || coreExercises;
  }
  console.log(`  ✓ Got ${coreExercises?.length} core exercises: ${coreExercises?.map(e => e.type).join(', ')}`);

  // ── Step 6: Sub-agent 1E — Speaking ────────────────────────────────────────
  console.log('\\n🗣️ Step 6: Sub-agent 1E — Speaking & Pronunciation Builder...');
  const speaking = await callSubAgent(systemPrompt, build1EPrompt(lessonNum, syllabusLine, vocabJson, slices.speaking), { temperature: 0.4, maxTokens: 4000 }, '1E-Speaking');
  console.log(`  ✓ Got speaking exercise (${speaking.phrases?.length || 0} phrases)`);

  // ── Step 7: Sub-agent 1F — Extended exercises ──────────────────────────────
  console.log('\\n📊 Step 7: Sub-agent 1F — Extended Exercise Generator...');
  let extendedExercises = await callSubAgent(systemPrompt, build1FPrompt(lessonNum, syllabusLine, grammarLevel, vocabJson, grammarNotesJson, slices), { temperature: 0.4, maxTokens: 15000 }, '1F-Extended');
  if (extendedExercises && !Array.isArray(extendedExercises)) {
    const possibleArrayKey = Object.keys(extendedExercises).find(k => Array.isArray(extendedExercises[k]));
    if (possibleArrayKey) extendedExercises = extendedExercises[possibleArrayKey];
    else extendedExercises = Object.values(extendedExercises).find(v => Array.isArray(v)) || extendedExercises;
  }
  console.log(`  ✓ Got ${extendedExercises?.length} extended exercises: ${extendedExercises?.map(e => e.type).join(', ')}`);

  // ── Step 8: Build metadata ─────────────────────────────────────────────────
  console.log('\n🏷️ Step 8: Building metadata...');
  const metadata = await callSubAgent(systemPrompt, buildMetadataPrompt(lessonNum, syllabusLine, narrative, grammarLevel), { temperature: 0.3, maxTokens: 3000 }, '8-Metadata');
  console.log(`  ✓ Metadata: title="${metadata.title}"`);

  // ── Step 8b: Assemble ──────────────────────────────────────────────────────
  console.log('\n🔧 Step 8b: Assembling draft lesson object...');
  let lesson = assemblelesson(lessonNum, metadata, grammarNotes, vocab, minitext, coreExercises, speaking, extendedExercises);
  console.log(`  ✓ Assembled: ${lesson.exercises.length} exercises, ${lesson.vocab.length} vocab items`);

  // ── Step 8c: Sub-agent 1Z — AI Reflection & Polish ─────────────────────────
  console.log('\\n🧠 Step 8c: Sub-agent 1Z — AI Pedagogical Reflection & Polish...');
  const draftLessonJson = JSON.stringify(lesson, null, 2);
  const refinedLessonDiff = await callSubAgent(systemPrompt, build1ZPrompt(lessonNum, syllabusLine, draftLessonJson), { temperature: 0.2, maxTokens: 8192 }, '1Z-Reflection');
  if (refinedLessonDiff && typeof refinedLessonDiff === 'object') {
    if (Object.keys(refinedLessonDiff).length === 0) {
      console.log('  ✓ Reflection complete. No changes strictly needed. (Kept V1 draft)');
    } else {
      if (Array.isArray(refinedLessonDiff.overrideExercises)) {
        for (const item of refinedLessonDiff.overrideExercises) {
          if (item.index !== undefined && item.exercise && lesson.exercises[item.index]) {
            lesson.exercises[item.index] = item.exercise;
          }
        }
        delete refinedLessonDiff.overrideExercises;
      }
      lesson = { ...lesson, ...refinedLessonDiff };
      console.log(`  ✓ Reflection complete. Applied overrides.`);
    }
  } else {
    console.log('  ⚠ Reflection failed to return valid JSON. Falling back to V1 draft.');
  }

  // ── Step 9: Self-check ─────────────────────────────────────────────────────
  console.log('\n🔍 Step 9: Self-check...');
  const errors = selfCheck(lesson, lessonNum);
  if (errors.length > 0) {
    console.log(`  ⚠ Found ${errors.length} issue(s):`);
    for (const err of errors) console.log(`    - ${err}`);
  } else {
    console.log('  ✅ All checks passed!');
  }

  // ── Step 10: Write file ────────────────────────────────────────────────────
  if (DRY_RUN) {
    console.log('\n🏁 DRY RUN — not writing file.');
    console.log(`  Would write L${pad}.js (${JSON.stringify(lesson).length} chars)`);
  } else {
    console.log(`\n💾 Step 10: Writing L${pad}.js...`);
    writeLessonFile(lesson, lessonNum);
  }

  // Return the vocab de strings for use as exclusion in next lesson
  return vocab.map(v => v.de);
}

// ── Build verification ───────────────────────────────────────────────────────
function verifyBuild() {
  console.log('\n🏗️ Build verification...');
  try {
    const output = execSync('npm run build 2>&1', { cwd: ROOT, encoding: 'utf8', timeout: 60000 });
    const lastLines = output.split('\n').filter(l => l.trim()).slice(-5).join('\n');
    if (output.includes('built in') || output.includes('✓')) {
      console.log(`  ✅ Build passed!\n${lastLines}`);
      return true;
    } else {
      console.log(`  ❌ Build may have failed:\n${lastLines}`);
      return false;
    }
  } catch (err) {
    console.error(`  ❌ Build error: ${err.message}`);
    return false;
  }
}

// ── Export/Main ──────────────────────────────────────────────────────────────
async function main() {
  const lessons = parseLessonArgs();
  runPreflightTests(); // Automagically run robust tests before generator runs

  console.log(`🚀 Starting AGENT 1: Lesson Generator...`);
  console.log(`   Generating lessons: ${lessons.join(', ')}`);
  console.log(`   Model: ${MODEL_PRIMARY} (fallback: ${MODEL_FALLBACK})`);
  console.log(`   Dry run: ${DRY_RUN}`);
  console.log(`   Recap only: ${RECAP_ONLY}`);

  let accumulatedVocab = [];
  const results = [];

  // --recap-only mode: just generate recap for the given lesson numbers (must be multiples of 10)
  if (RECAP_ONLY) {
    for (const lessonNum of lessons) {
      if (lessonNum % 30 !== 0 && lessonNum !== 80) {
        console.error(`\n  ❌ --recap-only requires milestone lessons (30, 60, 80). Got: ${lessonNum}`);
        results.push({ lesson: `${lessonNum}R`, status: 'SKIPPED', error: 'Not a comprehensive recap milestone (30, 60, 80)' });
        continue;
      }
      try {
        await generateRecapLesson(lessonNum);
        results.push({ lesson: `${lessonNum}R`, status: 'OK (recap)' });
      } catch (err) {
        console.error(`\n  ❌ RECAP ERROR: ${err.message}`);
        results.push({ lesson: `${lessonNum}R`, status: 'FAILED (recap)', error: err.message });
      }
    }
  } else {
    // Normal mode: generate lessons + auto-trigger recap after 10th lesson
    for (const lessonNum of lessons) {
      try {
        const newVocab = await generateLesson(lessonNum, accumulatedVocab);
        accumulatedVocab.push(...newVocab);
        results.push({ lesson: lessonNum, status: 'OK' });
      } catch (err) {
        console.error(`\n  ❌ FATAL ERROR on L${String(lessonNum).padStart(2, '0')}: ${err.message}`);
        console.error(err.stack);
        results.push({ lesson: lessonNum, status: 'FAILED', error: err.message });
      }

      // Check if this is a comprehensive recap milestone (every 30 lessons, plus special case L80)
      if (lessonNum % 30 === 0 || lessonNum === 80) {
        const recapEnd = lessonNum === 80 ? 'L61–L80 (final recap)' : `L${lessonNum - 29}–L${lessonNum}`;
        console.log(`\n  📅 L${lessonNum} is a recap milestone — triggering comprehensive recap (${recapEnd})...`);
        try {
          await generateRecapLesson(lessonNum);
          results.push({ lesson: `${lessonNum}R`, status: 'OK (recap)' });
        } catch (err) {
          console.error(`\n  ❌ RECAP ERROR on L${String(lessonNum).padStart(2, '0')}R: ${err.message}`);
          console.error(err.stack);
          results.push({ lesson: `${lessonNum}R`, status: 'FAILED (recap)', error: err.message });
        }
      }

      // Small delay between lessons to avoid rate limiting
      if (lessons.indexOf(lessonNum) < lessons.length - 1) {
        console.log('\n  ⏳ Waiting 3s before next lesson...');
        await sleep(3000);
      }
    }
  }

  // Build verification
  if (!DRY_RUN) {
    verifyBuild();
  }

  // Summary
  console.log(`\n${'═'.repeat(70)}`);
  console.log('  SUMMARY');
  console.log(`${'═'.repeat(70)}`);
  for (const r of results) {
    const icon = r.status.startsWith('OK') ? '✅' : '❌';
    const label = typeof r.lesson === 'number' ? `L${String(r.lesson).padStart(2, '0')}` : `L${r.lesson}`;
    console.log(`  ${icon} ${label}: ${r.status}${r.error ? ` — ${r.error}` : ''}`);
  }
  console.log(`${'═'.repeat(70)}`);

  // Print API Stats
  const priceIn = (apiStats.inputTokens / 1_000_000) * 1.25;
  const priceOut = (apiStats.outputTokens / 1_000_000) * 10.00;
  console.log(`\n  📊 API USAGE (${MODEL_PRIMARY}):`);
  console.log(`  - Total API Calls: ${apiStats.calls}`);
  console.log(`  - Input Tokens:    ${apiStats.inputTokens.toLocaleString()} (Est: $${priceIn.toFixed(4)})`);
  console.log(`  - Output Tokens:   ${apiStats.outputTokens.toLocaleString()} (Est: $${priceOut.toFixed(4)})`);
  console.log(`  - Est Total Cost:  $${(priceIn + priceOut).toFixed(4)}\n`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
