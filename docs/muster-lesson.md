# Muster Lesson Blueprint (Based strictly on the actual L01.js)

This blueprint reflects the **actual** structure, fields, and execution order found in `src/data/lessons/L01.js`, overriding any legacy constraints from `INSTRUCTIONS.md` or strict templates. It is intended to be the definitive guide for generating new lessons going forward.

## 1. Top-Level Metadata
Every lesson exports a single object (e.g., `export const lesson01`) with the following root structure. Note the presence of the `heroImage` field.

```javascript
export const lesson01 = {
  id: 1,                      // Number: Lesson ID (e.g., 1)
  week: 1,                    // Number: Week number
  day: 1,                     // Number: Day of the week (1-5)
  title: "...",               // String: Lesson title in German
  topic: "...",               // String: Topic description in Slovak
  cefr: "A1",                 // String: CEFR level
  xpReward: 15,               // Number: XP amount
  narrativeContext: "...",    // String: Story/context setting (Slovak)
  heroImage: "...",           // String: Path to hero image (e.g., '/images/lessons/l01_hero.png')
  communicativeGoal: "...",   // String: "Po tejto lekcii viem..." (Slovak)
  skillFocus: ["...", "..."], // Array of Strings: e.g., ["vocabulary", "listening", "pronunciation", "writing"]
```

## 2. Grammar Notes (`grammarNotes` Array)
Unlike older specs that define `grammarNote` as a single object, the actual implementation uses a **`grammarNotes` array of objects**. These objects support raw HTML formatting for explanations and can even contain their own **nested `exercises` array**.

```javascript
  grammarNotes: [
    {
      id: 'L01_G01',                 // String: Unique identifier
      category: '...',               // String: Category name (e.g., 'Výslovnosť a pravopis')
      rule: "...",                   // String: Title of the grammar rule
      explanation: `...`,            // String (HTML): Supports raw HTML elements like <p>, <ul>, <li>, <b>, <div> with Tailwind classes
      examples: [                    // Array of Objects: Examples for this rule
        { 
          de: '...',                 // String: German text
          note: '...',               // (Optional) String: Explanation or tip (e.g., 'W = [v]')
          sk: '...'                  // String: Slovak translation
        }
      ],
      slovakContrastNote: '...',     // (Optional) String: Comparison with Slovak language
      
      // Optional feature-specific tables (used in L01):
      alphabetTable: [ { letter: 'A', name: 'ah', example: 'der Apfel' } ],
      digraphs: [ { combo: 'sch', sound: '[ʃ]', example: 'die Schule', sk: 'škola' } ],
      phoneticAlphabet: [ { letter: 'A', word: 'Anton' } ],

      // IMPORTANT: Interleaved Exercises (Optional)
      // Grammar rules can contain their own specialized exercises to drill the concept immediately.
      exercises: [
        {
          type: "mcq",               // Follows standard exercise schemas
          questions: [ ... ]
        },
        {
          type: "speaking",
          phrases: [ ... ]
        }
      ]
    }
  ],
```

## 3. Vocabulary (`vocab` Array)
Standard vocabulary entries include an additional, undocumented `image` field.

```javascript
  vocab: [
    {
      de: "...",                     // String: German word/phrase
      sk: "...",                     // String: Slovak translation
      example: "...",                // String: German example sentence
      exampleSk: "...",              // String: Slovak example translation
      gender: "M",                   // String or null: 'M', 'F', 'N', or null
      srsId: "L01_V01_new",          // String: Unique spaced-repetition ID
      recycledFrom: [],              // Array of Strings: Prior SRS IDs
      image: "..."                   // (Optional) String: Path to image representation (e.g., '/images/vocab/hallo.png')
    }
  ],
```

## 4. Main Exercises (`exercises` Array)
The real execution order and schemas applied at the end of the lesson. Notice the image support in MCQs and the precise naming of array properties (e.g., `questions` for listening, not `pairs`).

### Actual Array Order in L01:
1. `flashcard`
2. `mcq`
3. `fill`
4. `wordorder`
5. `listen`
6. `writing`
7. `match`
8. `minitext`
9. `speaking`

### Actual Exercise Schemas Used:

**1. Flashcard**
```javascript
    {
      type: 'flashcard',
      instruction: '...'             // String. NOTE: No `items` array. Relies entirely on `lesson.vocab`.
    },
```

**2. MCQ (supports module-level and question-level images)**
```javascript
    {
      type: "mcq",
      instruction: "...",
      image: "...",                  // (Optional) String: Exercise setting image (e.g., '/images/lessons/l01_reception.png')
      questions: [
        {
          question: "...",
          image: "...",              // (Optional) String: Specific image for this question
          options: ["A", "B", "C", "D"], // Array of exactly 4 strings
          answer: 1,                 // Number: 0-based index of the correct option
          explanation: "..."         // String: Feedback explanation shown after answering
        }
      ]
    },
```

**3. Fill-in-the-blank**
```javascript
    {
      type: "fill",
      instruction: "...",
      questions: [
        {
          sentence: "Guten ___, wie heißen Sie?", // String: Text with ___ for placeholder
          answer: "Tag",             // String: Exact expected answer
          hint: "dobrý deň",         // String: Native tongue hint
          explanation: "..."         // String: Post-answer explanation
        }
      ]
    },
```

**4. Word Order**
```javascript
    {
      type: 'wordorder',
      instruction: '...',
      sentences: [
        {
          words: ['heißen', 'Wie', 'Sie'], // Array of Strings: Shuffled word components
          correct: 'Wie heißen Sie',       // String: The correctly assembled sentence (no trailing punctuation token!)
          hint: 'Ako sa voláte?',          // String: Slovak translation hint
          explanation: '...'               // String: Grammar breakdown of word order
        }
      ]
    },
```

**5. Listen**
```javascript
    {
      type: "listen",
      instruction: "...",
      questions: [                         // Note: The array is named `questions`, NOT `pairs`
        { de: 'ja', sk: 'áno' }
      ]
    },
```

**6. Writing**
```javascript
    {
      type: 'writing',
      instruction: '...',
      prompts: [
        { sk: 'Pozdrav po nemecky (ráno)', hint: 'Guten …' }
      ]
    },
```

**7. Match**
```javascript
    {
      type: "match",
      instruction: "...",
      pairs: [
        ["Guten Tag", "dobrý deň"]         // Array of arrays: [German, Slovak]
      ]
    },
```

**8. Mini-Text (Reading Comprehension)**
```javascript
    {
      type: 'minitext',
      instruction: '...',
      text: '...',                         // String: German short narrative
      textSk: '...',                       // String: Slovak translation
      questions: [                         // Standard MCQ comprehension questions
        {
          question: '...',
          options: ['A', 'B', 'C', 'D'],
          answer: 2,                       // Number: 0-based index
          explanation: '...'
        }
      ]
    },
```

**9. Speaking**
```javascript
    {
      type: 'speaking',
      instruction: '...',
      phrases: [
        { 
          de: 'Guten Tag!', 
          sk: 'Dobrý deň!', 
          tip: 'Tag = [taːk], konc. G sa vysl. ako K' // String: Pronunciation hint
        }
      ]
    }
```

## 5. Footer Metadata
```javascript
  reviewWords: [],                       // Array of Strings: Target words from prior lessons (empty for L01)
  lessonNotes: "..."                     // String: Teacher/Student summary note covering focus areas
};
```

---

## 6. Porovnanie so štandardmi Goethe-Institut a Hueber (Analýza učiteľa)

### Sú si podobné?
**Áno, v mnohých kľúčových aspektoch:**
*   **Komunikatívny prístup:** Rovnako ako Goethe a Hueber (napr. *Menschen* alebo *Schritte*), aj táto lekcia definuje jasný komunikatívny cieľ (`communicativeGoal`: "Po tejto lekcii viem...").
*   **Príbehový kontext:** Použitie `narrativeContext` (Jana v Rakúsku) simuluje známe "Foto-Hörgeschichte" z Hueber učebníc, čo pomáha študentom učiť sa jazyk v kontexte reálnych situácií, nie len ako izolované slová.
*   **Pokrytie všetkých zručností:** Lekcia pokrýva všetky 4 základné kompetencie (Lesen - `minitext`, Hören - `listen`, Sprechen - `speaking`, Schreiben - `writing`), rovnako ako moduly v štandardných učebniciach.
*   **Súlad s CEFR (SERR):** Striktné vyžadovanie A1 gramatiky a slovotvorby (žiadne zložité časy v úvodných lekciách) je presne podľa štandardov Goethe-Institut.

### Aké sú rozdiely?
*   **Krivka učenia (Input vs. Drill):** Štandardné učebnice (Hueber) bežne začínajú "Input fázou" (počúvanie dlhšieho dialógu alebo čítanie textu s obrázkami), a až potom z tohto textu izolujú slovíčka a gramatiku. Naša aplikácia má opačný, viac "digitálno-drilový" prístup: začína priamo vysvetlením gramatiky (`grammarNotes`) a učením izolovaných slovíčok s prekladom (`flashcard`), a až neskôr na ne nabaľuje text (`minitext`).
*   **Deduktívna verzus Induktívna gramatika:** V appke máme explicitné deduktívne vysvetlenia gramatiky (hneď povieme pravidlo po slovensky). Goethe a Hueber dnes silno preferujú induktívne učenie (študent si prečíta nemecký text a sám musí z neho "objaviť" a doplniť pravidlo pred tým, než dostane teóriu).
*   **Formát produkcie:** Zatiaľ čo učebnice prechádzajú k voľným hrám vo dvojiciach (freies Sprechen), aplikácia musí pre povahu média využívať riadené uzatvorené systémy (výber z možností, samo-hodnotené opakovanie fráz pomocou TTS a umelou inteligenciou vyhodnocované krátke výzvy v `writing`).

### Čo navrhujem (Cesty k vylepšeniu)
Na základe porovnania s najlepšími praktikami nemeckých vydavateľstiev navrhujem toto:
1.  **Presunúť "Input" pred drilovanie:** Zvážiť vloženie krátkeho, jednoduchého audio/čítacieho vstupu (napr. minitext alebo jednoduchý dialóg vychádzajúci z `narrativeContext`) **HNEĎ na začiatok lekcie**, ešte pred `flashcard` fázu a dlhú teóriu. To by simulovalo reálny zážitok z "objavovania" jazyka v situácii.
2.  **Viac induktívnych prvkov:** Do poľa `grammarNotes` občas pridať malý "hádankový" exercise (ktorý už technicky existuje vďaka zanoreným cvičeniam), kde študent musí pravidlo odhaliť z príkladov predtým, než si prečíta slovenské textové vysvetlenie.
3.  **Väčšie previazanie cvičení s príbehom Janinho života:** Zabezpečiť, aby vety v `wordorder` a `fill` neboli len náhodné nemecké vety, ale priamo pokračovali v deji, ktorý začal v `narrativeContext` (ako to robí Hueber vo svojich Progression-cvičeniach).