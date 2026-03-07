/**
 * ============================================================
 * LESSON MUSTER — ŠABLÓNA LEKCIE PRE AI AGENTOV
 * ============================================================
 *
 * Tento súbor je šablóna (muster) pre tvorbu nových lekcií.
 * Nekopíruj ho priamo — agent 1A–1F ho vyplní pre každú lekciu.
 *
 * POSTUP AGENTA:
 *   1A → vocab[]         (15–18 slov, srsId, gender, examples)
 *   1B → grammarNotes[]  (2–3 gramatické bloky, HTML vysvetlenie)
 *   1C → exercises 1–8   (flashcard, match, wordorder, fill, listen, mcq, minitext, speaking)
 *   1D → exercises 9–13  (truefalse, dictation, categorysort, translation, conjugation)
 *   1E → metadata        (narrativeContext, communicativeGoal, lessonNotes)
 *   1F → self-check      (overí schema, crosscheck vocab vs. exercises)
 *   Assemble → zostaví finálny súbor
 *   Write → zapíše do src/data/lessons/LXX.js
 *
 * DÔLEŽITÉ PRAVIDLÁ (z AGENT_SYSTEM.md):
 *   - grammarNotes = POLE [] nie objekt {}
 *   - flashcard nemá items[] — číta lesson.vocab priamo
 *   - mcq.answer = index (0-based integer), NIE text
 *   - wordorder.sentences cieli na grammarNotes[].rule tejto lekcie
 *   - minitext max 80 slov, len gramatika A1 úrovne lekcie
 *   - truefalse, dictation, categorysort, translation, conjugation sú POVINNÉ
 *   - listen používa exercise.questions (nie exercise.pairs!)
 *   - fill a mcq majú NON-EMPTY explanation pre každú otázku
 *   - srsId formát: 'LXX_VYY' (dvomiestne číslo)
 *
 * PORADIE 13 CVIČENÍ (povinné pre všetky lekcie):
 *   1. flashcard | 2. match | 3. wordorder | 4. fill | 5. listen
 *   6. mcq | 7. minitext | 8. speaking | 9. truefalse | 10. dictation
 *   11. categorysort | 12. translation | 13. conjugation
 *   (14. writing — voliteľné AI cvičenie)
 * ============================================================
 */

// [AGENT ASSEMBLE] Export názov: lessonXX kde XX = id s nulou (lesson06, lesson12, lesson80)
export const lessonMUSTER = {

  // ──────────────────────────────────────────
  // METADATA LEKCIE
  // [AGENT 1E] Vyplní podľa syllabu A1_80_LESSON_SYLLABUS.md
  // ──────────────────────────────────────────

  id: 0,               // [1E] Číslo lekcie 1–80. NEMEŇ po prvom zápise — progress je kľúčovaný.
  week: 0,             // [1E] Týždeň 1–16
  day: 0,              // [1E] Deň v týždni 1–5
  title: '',           // [1E] Nemecký názov lekcie (napr. 'Guten Tag! — Begrüßung')
  topic: '',           // [1E] Slovenský popis témy (napr. 'Pozdravy a základné frázy')
  cefr: 'A1',          // [1E] Vždy 'A1' pre lekcie 1–80
  xpReward: 20,        // [1E] XP za lekciu: 15 (ľahká) / 20 (stredná) / 25–30 (ťažká)
  narrativeContext: '', // [1E] Krátky príbeh: „Jana robí X..." (1–2 vety, slovensky)
  communicativeGoal: '', // [1E] „Po tejto lekcii viem..." (slovensky, 1 veta)
  skillFocus: [],      // [1E] Pole: 'vocabulary','grammar','listening','reading','writing','speaking','pronunciation'
  lessonNotes: '',     // [1E] Krátke zhrnutie pre študenta/učiteľa (slovensky, 2–4 vety)

  // ──────────────────────────────────────────
  // GRAMATICKÉ BLOKY
  // [AGENT 1B] Pole 2–3 objektov. MUSÍ byť POLE, nie objekt!
  // Každý blok = jeden gramatický koncept tejto lekcie.
  // vysvetlenie renderuje GrammarGuide.jsx — môže obsahovať HTML tagy.
  // ──────────────────────────────────────────

  grammarNotes: [
    {
      // [1B] Prvý gramatický blok (hlavné pravidlo lekcie)
      rule: '',               // Krátky názov pravidla (napr. 'Sein — der Infinitiv und Präsens')
      explanation: '',        // Plný odsek v slovenčine, môže obsahovať HTML (<table>, <strong>, <ul>...)
                              // GrammarGuide.jsx renderuje cez dangerouslySetInnerHTML
      examples: [
        // [1B] 4–8 príkladov. Každý je klikateľný (TTS). noteIdx je voliteľný.
        { de: '', sk: '', note: '' },  // note = voliteľná gramatická poznámka
      ],
      slovakContrastNote: '', // [1B] Porovnanie s angličtinou/slovenčinou. Renderuje sa samostatne.
    },
    {
      // [1B] Druhý gramatický blok (doplňujúce pravidlo)
      rule: '',
      explanation: '',
      examples: [
        { de: '', sk: '' },
      ],
      slovakContrastNote: '',
    },
    // [1B] Tretí blok je voliteľný. Pridaj len ak lekcia má 3 odlišné gramatické koncepty.
  ],

  // ──────────────────────────────────────────
  // SLOVNÁ ZÁSOBA
  // [AGENT 1A] 15–18 položiek. Každá musí mať VŠETKY polia.
  // Pozri RULE 2 v INSTRUCTIONS.md pre povinné polia.
  // ──────────────────────────────────────────

  vocab: [
    {
      de: '',           // [1A] Nemecké slovo/fráza (s členom pre podstatné mená: 'der Tisch')
      sk: '',           // [1A] Slovenský preklad
      gender: null,     // [1A] 'M' / 'F' / 'N' pre podstatné mená, null pre slovesá/frázy
      srsId: '',        // [1A] Formát: 'LXX_VYY' (napr. 'L06_V01'). Unikátne naprieč 80 lekciami.
      example: '',      // [1A] Príkladová veta v nemčine. Len gramatika zodpovedajúca úrovni lekcie.
      exampleSk: '',    // [1A] Slovenský preklad príkladovej vety.
      recycledFrom: [], // [1A] Pole srsId z predchádzajúcich lekcií kde sa slovo objavilo. [] = prvý výskyt.
    },
    // [1A] Príklad správnej položky:
    // {
    //   de: 'der Tisch',
    //   sk: 'stôl',
    //   gender: 'M',
    //   srsId: 'L06_V03',
    //   example: 'Der Tisch ist groß.',
    //   exampleSk: 'Stôl je veľký.',
    //   recycledFrom: [],
    // },
    //
    // CHYBY KTORÉ SA NESMÚ STAŤ:
    // ✗ gender: 'M' pre slovesá (sloveneso nemá rod → null)
    // ✗ example: 'Er hat gegessen.' v L01–L10 (Perfekt nie je A1 pre L01–L40)
    // ✗ srsId: 'L6_V1' (musí byť L06_V01 — dvomiestné čísla!)
    // ✗ recycledFrom chýba (musí byť aspoň [])
  ],

  // ──────────────────────────────────────────
  // CVIČENIA — 13 povinných + 1 voliteľné
  // PORADIE JE POVINNÉ. LessonView.jsx dáva minitext na prvé miesto.
  // ──────────────────────────────────────────

  exercises: [

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 1. FLASHCARD — FlashcardExercise.jsx
    // [AGENT 1C] NEMÁ items[]! Číta lesson.vocab priamo.
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      type: 'flashcard',
      instruction: '', // Napr. 'Prezri si slovíčka tejto lekcie. Klikni na kartičku pre preklad.'
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 2. MATCH — MatchExercise.jsx
    // [AGENT 1C] pairs[] = pole dvojprvkových polí [nemecky, slovensky]
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      type: 'match',
      instruction: '', // Napr. 'Spoj každé nemecké slovo s jeho slovenským prekladom.'
      pairs: [
        // [nemecky, slovensky] — 6–10 párov z vocab[] tejto lekcie
        ['', ''],
        ['', ''],
        ['', ''],
        ['', ''],
        ['', ''],
        ['', ''],
      ],
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 3. WORDORDER — WordOrderExercise.jsx
    // [AGENT 1C] sentences[] MUSÍ cieliť NA PRAVIDLO grammarNotes[0].rule tejto lekcie!
    // NESMIE byť náhodná slovná zásoba — musí precvičovať gramatiku.
    // correct = veta БЕЗ interpunkcie ako posledného tokenu
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      type: 'wordorder',
      instruction: '', // Napr. 'Zorad slová do správnej nemeckej vety.'
      sentences: [
        {
          words: [],          // [1C] Premiešané tokeny — každý token = jedno slovo. Bez interpunkcie ako tokenu.
          correct: '',        // [1C] Správna veta (bez bodky/otáznika na konci ako separátneho tokenu)
          hint: '',           // [1C] Slovenský preklad vety — zobrazí sa nad wordbankmi
          explanation: '',    // [1C] Prečo je tento slovosled správny (gramatická poznámka)
        },
        // Pridaj 3–5 ďalších viet (celkom 4–6 viet)
      ],
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 4. FILL — FillExercise.jsx
    // [AGENT 1C] explanation JE renderované — NESMIE byť prázdne!
    // hint = nápoveda (zobrazí sa po kliknutí na žiarovku)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      type: 'fill',
      instruction: '', // Napr. 'Doplň správne slovo do medzery.'
      questions: [
        {
          sentence: '',     // [1C] Nemecká veta s '___' ako zástupným znakom
          answer: '',       // [1C] Slovo/fráza ktorá vypĺňa medzeru. Case-sensitive!
          hint: '',         // [1C] Slovenský preklad celej vety (nápoveda)
          explanation: '',  // [1C] POVINNÉ. Prečo je táto odpoveď správna. Renderované.
        },
        // Pridaj 3–7 ďalších otázok (celkom 4–8)
      ],
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 5. LISTEN — ListenExercise.jsx
    // [AGENT 1C] POZOR: pole sa volá 'questions', NIE 'pairs'!
    // TTS prečíta q.de. Študent píše čo počuje.
    // Normalizácia: ä→ae, ö→oe, ü→ue, ß→ss (študent môže písať oboje)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      type: 'listen',
      instruction: '', // Napr. 'Počúvaj slovo a napíš ho po nemecky.'
      questions: [
        // [1C] 6–10 párov. Najprv jednoduché slová, potom dlhšie/zložené.
        { de: '', sk: '' },
        { de: '', sk: '' },
        { de: '', sk: '' },
        { de: '', sk: '' },
        { de: '', sk: '' },
        { de: '', sk: '' },
      ],
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 6. MCQ — MCQExercise.jsx
    // [AGENT 1C] answer = 0-based INTEGER INDEX! Nie text!
    // explanation JE renderované pod spätnou väzbou — NESMIE byť prázdne!
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      type: 'mcq',
      instruction: '', // Napr. 'Vyber správnu odpoveď.'
      questions: [
        {
          question: '',       // [1C] Otázka v nemčine alebo slovenčine
          options: ['', '', '', ''], // [1C] PRESNE 4 možnosti
          answer: 0,          // [1C] 0-based index správnej možnosti (0, 1, 2 alebo 3)
          explanation: '',    // [1C] POVINNÉ. Vysvetlenie prečo je táto odpoveď správna.
        },
        // Pridaj 3–7 ďalších otázok (celkom 4–8). Mix gramatiky A slovníka.
        // CHYBA: answer: 'správna možnosť' → NESPRÁVNE. Musí byť číslo!
        // CHYBA: answer: 1 keď správna možnosť je na indexe 2 → NESPRÁVNE.
      ],
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 7. MINITEXT — MiniTextExercise.jsx
    // [AGENT 1C] text MAX 80 slov! Len A1 gramatika zodpovedajúca lekcii.
    // Fáza 1: čítanie + TTS. Fáza 2: otázky (MCQ formát).
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      type: 'minitext',
      instruction: '', // Napr. 'Prečítaj si text a odpovedaj na otázky.'
      text: '',        // [1C] Nemecký text max 80 slov. Len Präsens pre L01–L10. Používa vocab tejto lekcie.
      textSk: '',      // [1C] Slovenský preklad textu (skladateľný SK preklad v UI)
      questions: [
        // [1C] 3–5 otázok o texte. answer = 0-based index!
        {
          question: '',
          options: ['', '', '', ''],
          answer: 0,
          explanation: '', // Citácia z textu ktorá odôvodňuje odpoveď
        },
      ],
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 8. SPEAKING — SpeakingExercise.jsx
    // [AGENT 1C] Self-assessment cvičenie: TTS + sebahodnotenie.
    // tip = výslovnostná nápoveda (max 60 znakov!)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      type: 'speaking',
      instruction: '', // Napr. 'Počúvaj frázu, zopakuj ju nahlas a ohodnoť sa.'
      phrases: [
        // [1C] 5–8 fráz. Kľúčové frázy z vocab tejto lekcie.
        {
          de: '',   // [1C] NemChemická fráza na hovorenie
          sk: '',   // [1C] Slovenský preklad
          tip: '',  // [1C] Výslovnostná nápoveda. Napr. 'W=[v], ö=[ø]'. MAX 60 znakov!
        },
      ],
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 9. TRUEFALSE — TrueFalseExercise.jsx
    // [AGENT 1D] Tvrdenia o obsahu lekcie — pravda/nepravda
    // POLE: statements[].isTrue (boolean) — NIE .correct!
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      type: 'truefalse',
      instruction: '', // Napr. 'Rozhodni, či je tvrdenie správne (Richtig) alebo nesprávne (Falsch).'
      statements: [
        // [1D] 5–8 tvrdení. Mix pravdivých (isTrue: true) a nepravdivých (isTrue: false).
        {
          statement: '',      // [1D] Tvrdenie v nemčine (alebo slovenčine)
          isTrue: true,       // [1D] true alebo false — POVINNÉ, NIE 'correct'!
          explanation: '',    // [1D] Prečo je toto tvrdenie pravdivé/nepravdivé
        },
      ],
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 10. DICTATION — DictationExercise.jsx
    // [AGENT 1D] TTS predčíta vetu, študent jej napíše.
    // Vety z vocab tejto lekcie. A1 gramatika.
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      type: 'dictation',
      instruction: '', // Napr. 'Počúvaj vetu a napíš ju po nemecky.'
      sentences: [
        // [1D] 4–6 viet. Každá využíva kľúčové slová z vocab tejto lekcie.
        {
          de: '',           // [1D] Nemecká veta (TTS ju predčíta)
          sk: '',           // [1D] Slovenský preklad (zobrazí sa ako nápoveda)
          explanation: '',  // [1D] Gramatická poznámka
        },
      ],
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 11. CATEGORYSORT — CategorySortExercise.jsx
    // [AGENT 1D] categories = pole OBJEKTOV { name, color?, words[] }
    // NIE pole reťazcov! NIE items []!
    // color: 'blue'|'rose'|'green'|'amber'|'purple'
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      type: 'categorysort',
      instruction: '', // Napr. 'Roztrieď slová do správnych skupín.'
      categories: [
        // [1D] 2–4 kategórie. Každá má name, voliteľný color a pole words.
        { name: '', color: 'blue',  words: [] },  // slová patriace do tejto kategórie
        { name: '', color: 'rose',  words: [] },
        // { name: '', color: 'green', words: [] },  // pridaj ak sú 3+ kategórie
      ],
      explanation: '', // [1D] Voliteľné. Zobrazí sa po dokončení cvičenia.
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 12. TRANSLATION — TranslationExercise.jsx
    // [AGENT 1D] SK→DE preklad viet.
    // POLE: sentences[] (NIE pairs[]!)
    // Každá položka: { sk, answer, hint?, explanation? }
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      type: 'translation',
      instruction: '', // Napr. 'Prelož vety do nemčiny.'
      sentences: [
        // [1D] 4–6 viet. Slovenská veta → nemecký preklad.
        {
          sk: '',           // [1D] Zdrojová veta v slovenčine (zobrazí sa študentovi)
          answer: '',       // [1D] Správny nemecký preklad (porovnaný s odpoveďou)
          hint: '',         // [1D] Voliteľná nápoveda (napr. kľúčové slovo)
          explanation: '',  // [1D] Voliteľné vysvetlenie gramatiky
        },
      ],
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 13. CONJUGATION — ConjugationExercise.jsx
    // [AGENT 1D] POLE verbs[] (nie singulárny objekt!)
    // Každý verb: { infinitive, translation, forms[], note? }
    // Každý form: { pronoun, correct } — NIE 'form', NIE 'answer'!
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      type: 'conjugation',
      instruction: '', // Napr. 'Vyplň správne tvary slovesa.'
      verbs: [
        // [1D] 1–3 slovesá z tejto lekcie. Zvyčajne 2: hlavné sloveso + pomocné.
        {
          infinitive: '',      // [1D] Infinitív slovesa (napr. 'wohnen', 'haben')
          translation: '',     // [1D] Slovenský preklad (napr. 'bývať', 'mať')
          forms: [
            // [1D] Správny tvar pre každú osobu. Pole: correct (NIE form/answer!)
            { pronoun: 'ich',       correct: '' },
            { pronoun: 'du',        correct: '' },
            { pronoun: 'er/sie/es', correct: '' },
            { pronoun: 'wir',       correct: '' },
            { pronoun: 'ihr',       correct: '' },
            { pronoun: 'sie/Sie',   correct: '' },
          ],
          note: '', // [1D] Voliteľná poznámka o nepravidelnosti/vzore
        },
      ],
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 14. WRITING (voliteľné) — WritingChecker.jsx (AI)
    // [AGENT 1D] Pridaj len ak lekcia má silný písomný aspekt.
    // Vyžaduje OpenAI API kľúč od študenta.
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // {
    //   type: 'writing',
    //   instruction: 'Napíš krátky text na tému lekcie.',
    //   prompts: [
    //     { sk: 'Opíš sa v 3–4 vetách.', hint: 'Ich heiße ..., ich wohne in ...' },
    //   ],
    // },

  ], // koniec exercises[]

  // ──────────────────────────────────────────
  // RECYKLOVANÉ SLOVÁ
  // [AGENT 1F] Nemecké slová (de string) z predchádzajúcich lekcií
  // ktoré sa znovu objavujú v cvičeniach tejto lekcie.
  // [] pre L01. Pre ostatné: zoznam slov z minulých lekcií.
  // ──────────────────────────────────────────
  reviewWords: [],

};

/*
 * ============================================================
 * CHECKL IST PRE AGENTA PRED ZÁPISOM SÚBORU:
 * ============================================================
 *
 * [ ] id, week, day, title, topic, cefr, xpReward — vyplnené
 * [ ] narrativeContext, communicativeGoal, lessonNotes — vyplnené (SK)
 * [ ] grammarNotes = [] (pole, NIE objekt) s min. 2 blokmi
 * [ ] grammarNotes[].explanation — plný odsek (nie prázdny)
 * [ ] vocab[] = 15–18 položiek, každá má de/sk/gender/srsId/example/exampleSk/recycledFrom
 * [ ] srsId formát LXX_VYY — dvomiestné čísla, unikátne naprieč všetkými lekciami
 * [ ] example vety — len Präsens pre L01–L40, žiadny Perfekt/Präteritum
 * [ ] flashcard — BEZ items[], len type a instruction
 * [ ] match.pairs[] — 6–10 párov [de, sk]
 * [ ] wordorder.sentences[] — cieľuje na grammarNotes[].rule, correction BEZ interpunkčného tokenu
 * [ ] fill.questions[].explanation — NON-EMPTY pre každú otázku
 * [ ] listen.questions[] (NIE pairs[]) — 6–10 párov
 * [ ] mcq.questions[].answer = integer (0-based), NIE text
 * [ ] mcq.questions[].explanation — NON-EMPTY pre každú otázku
 * [ ] minitext.text — max 80 slov, overené počítaním
 * [ ] minitext.questions[].answer = integer (0-based)
 * [ ] speaking.phrases[].tip — max 60 znakov
 * [ ] truefalse.statements[].isTrue (boolean, NIE .correct!)
 * [ ] dictation.sentences[] — 4–6 viet
 * [ ] categorysort.categories[] = pole objektov { name, color, words[] } (NIE pole reťazcov!)
 * [ ] translation.sentences[] (NIE .pairs[]) — každá: { sk, answer, hint?, explanation? }
 * [ ] conjugation.verbs[] = POLE objektov, každý: { infinitive, translation, forms[{ pronoun, correct }], note? }
 * [ ] reviewWords[] — prázdne [] pre L01, inak srsId z predchádzajúcich lekcií
 * [ ] build: npm run build → ✔ built in X.XXs
 * ============================================================
 */
