# LESSON TEMPLATE — Podrobný plán každej lekcie

**Toto je záväzná šablóna pre všetkých 80 lekcií.**
L01 je vzorová lekcia (muster). Každá nová lekcia musí spĺňať všetky body v tomto dokumente.

---

## 1. POVINNÉ POLIA LEKCIE (lesson object)

Každá lekcia musí mať VŠETKY tieto polia. Žiadne nesmie chýbať.

```js
export const lessonNN = {
  id: number,              // 1–80, unikátne, NEMENIŤ po nasadení
  week: number,            // 1–16
  day: number,             // 1–5 (pondelok–piatok)
  title: string,           // Nemecký názov lekcie (napr. "Das Alphabet und die Aussprache")
  topic: string,           // Slovenský popis témy (napr. "Nemecká abeceda a výslovnosť")
  cefr: 'A1',              // Vždy 'A1' pre L01–L80
  xpReward: number,        // 15–30 XP podľa obtiažnosti
  narrativeContext: string,// Kde je Jana v príbehu. 2–4 vety. Slovensky.
  communicativeGoal: string,// "Po tejto lekcii viem..." — slovensky, konkrétne
  skillFocus: string[],    // Zoznam zo: vocabulary, grammar, listening, reading,
                           //            writing, speaking, pronunciation
                           // MUSÍ zahŕňať každý typ cvičenia v exercises[]
  grammarNote: object,     // Viď sekciu 2
  vocab: VocabEntry[],     // 15–22 položiek. Viď sekciu 3
  exercises: Exercise[],   // Viď sekciu 4 — poradie je záväzné
  reviewWords: string[],   // Nemecké slová (de) z predošlých lekcií. L01 = [].
  lessonNotes: string,     // Krátke poznámky pre učiteľa/študenta (slovensky).
};
```

---

## 2. GRAMMAR NOTE — povinná štruktúra

```js
grammarNote: {
  rule: string,             // Krátky názov pravidla. Zobrazuje sa v GrammarGuide.
  explanation: string,      // Celý odsek (min. 3 vety) po slovensky. NESMIE byť prázdny.
  examples: [               // 4–8 objektov. Každý je klikateľný (TTS) v GrammarGuide.
    { de: string, sk: string, note?: string }
  ],
  slovakContrastNote: string, // Ako sa toto líši od slovenčiny. Min. 2 vety.
}
```

**L01 vzor — grammarNote:**
```js
grammarNote: {
  rule: "Nemecká výslovnosť — kľúčové rozdiely od slovenčiny",
  explanation: "Nemčina a slovenčina sa líšia vo výslovnosti niekoľkých písmen...",
  examples: [
    { de: 'das Wasser', note: 'W = [v] ako v slovenskom V', sk: 'voda' },
    // ... ďalšie príklady
  ],
  slovakContrastNote: 'V slovenčine: W=[w], V=[v], Z=[z]. V nemčine: W=[v], V=[f], Z=[ts]...',
}
```

---

## 3. VOCAB — každá položka

Každá vocab položka MUSÍ mať VŠETKY tieto polia:

```js
{
  de: string,           // Nemecké slovo. Podstatné mená s členom: "das Haus", nie "Haus"
  sk: string,           // Slovenský preklad
  gender: 'M'|'F'|'N'|null, // M/F/N pre podstatné mená, null pre ostatné
  srsId: string,        // Formát: 'L{id}_V{01–99}'. Napr. 'L01_V03'. UNIKÁTNE.
  example: string,      // Nemecká príkladová veta. Len Präsens pre L01–L10.
  exampleSk: string,    // Slovenský preklad príkladu
  recycledFrom: string[], // srsId pole z predošlých lekcií. Prvý výskyt = []
}
```

**Pravidlá pre počet slovíčok:**
- L01–L20: 15–18 slovíčok
- L21–L60: 16–20 slovíčok
- L61–L80: 18–22 slovíčok

**Pravidlá pre gramatickú úroveň v example:**
- L01–L10: Präsens ONLY. Žiadny Perfekt, Präteritum, Konjunktiv.
- L11–L40: Präsens + modálne slovesá + imperatív
- L41–L60: Präsens + Perfekt povolené
- L61–L80: Všetka A1 gramatika povolená

---

## 4. EXERCISES — povinný zoznam a poradie

### L01–L49: 5 povinných cvičení + 1 voliteľné

| Poradie | Typ | Povinné? | Metóda |
|---------|-----|----------|--------|
| 1 | `flashcard` | ÁNO | Active Recall + SRS |
| 2 | `mcq` | ÁNO | Interleaving + Active Recall |
| 3 | `fill` | ÁNO | Interleaving + Active Recall |
| 4 | `listen` | ÁNO | Comprehensible Input |
| 5 | `match` | ÁNO | Interleaving + Chunking |
| 6 | `writing` | Voliteľné | AI Writing Check |

### L50–L80: 6 povinných cvičení + 1 voliteľné

| Poradie | Typ | Povinné? | Metóda |
|---------|-----|----------|--------|
| 1 | `flashcard` | ÁNO | Active Recall + SRS |
| 2 | `mcq` | ÁNO | Interleaving |
| 3 | `fill` | ÁNO | Interleaving |
| 4 | `listen` | ÁNO | Comprehensible Input |
| 5 | `match` | ÁNO | Interleaving |
| 6 | `dialogue` | ÁNO | Communicative LT |
| 7 | `writing` | Voliteľné | AI Writing Check |

---

## 5. KAŽDÉ CVIČENIE — minimálne požiadavky

### flashcard
```js
{ type: 'flashcard', instruction: string }
```
- ŽIADNE `items` pole. FlashcardExercise.jsx číta lesson.vocab priamo.

### mcq
```js
{
  type: 'mcq',
  instruction: string,
  questions: [  // 4–8 otázok
    {
      question: string,
      options: string[],   // Presne 4 možnosti
      answer: number,      // 0-based index! Nie text.
      explanation: string, // Povinné. Min. 1 veta. Zobrazuje sa po odpovedi.
    }
  ]
}
```

### fill
```js
{
  type: 'fill',
  instruction: string,
  questions: [  // 4–8 otázok
    {
      sentence: string,    // Nemecká veta s '___' ako placheta
      answer: string,      // Správna odpoveď. Case-sensitive.
      hint: string,        // Slovak nápoveda. Zobrazí sa po kliknutí na 💡
      explanation: string, // Povinné. Zobrazuje sa po správnej aj nesprávnej odpovedi.
    }
  ]
}
```

### listen
```js
{
  type: 'listen',
  instruction: string,
  questions: [  // 6–10 párov. Pole sa volá 'questions', NIE 'pairs'.
    { de: string, sk: string }
  ]
}
```
- Jednoduché slová na začiatku, dlhé/zložené na konci.

### match
```js
{
  type: 'match',
  instruction: string,
  pairs: [  // 6–10 párov
    [string, string]  // [nemčina, slovenčina]
  ]
}
```

### writing (voliteľné)
```js
{
  type: 'writing',
  instruction: string,
  prompts: [  // 3–6 výziev
    { sk: string, hint: string }
  ]
}
```

### dialogue (L50+)
```js
{
  type: 'dialogue',
  title: string,
  turns: [
    {
      speaker: string,
      de: string,
      sk: string,
      playerTurn: boolean,
      options?: [{ de: string, correct: boolean }]  // ak playerTurn: true
    }
  ]
}
```

---

## 6. SKILLSFOCUS — musí pokrývať všetky cvičenia

`skillFocus` pole musí obsahovať každý skill, ktorý je prítomný v exercises:

| Cvičenie prítomné | skillFocus musí zahŕňať |
|-------------------|------------------------|
| flashcard | 'vocabulary' |
| mcq | 'vocabulary' (alebo 'grammar') |
| fill | 'grammar' |
| listen | 'listening' |
| match | 'vocabulary' |
| writing | 'writing' |
| dialogue | 'speaking' |
| pronunciation content | 'pronunciation' |

---

## 7. NARATÍVNA KONTINUITA — kontrolný zoznam

Každá lekcia sleduje Janu Novákovú v Rakúsku. Každá nova lekcia MUSÍ:
- [ ] `narrativeContext`: Opisuje konkrétnu situáciu Jany v tejto lekcii (nie generickú)
- [ ] Aspoň 1 MCQ otázka je zasadená do Janinho príbehu (Jana vypĺňa formulár / Jana je v kaviarni...)
- [ ] Aspoň 1 fill otázka obsahuje kontext z príbehu
- [ ] `lessonNotes`: Obsahuje kľúčové slová z HR/bytový/každodenný príbeh Jany

---

## 8. NEMECKÁ JAZYKOVÁ KVALITA — kontrolný zoznam

- [ ] Všetky nemecké príklady sú prirodzené (test: povedal by to rodený hovoriaci?)
- [ ] Rody (M/F/N) sú fakticky správne — nikdy nehádaj
- [ ] Príklady sú na správnej CEFR úrovni pre danú lekciu (viď Pravidlá pre gramatickú úroveň)
- [ ] Žiadne šikovné úvodzovky ('') — len rovné apostrify (')
- [ ] Prehlásky ä ö ü ß sú Unicode znaky, nie ae oe ue ss

---

## 9. L01 MUSTEROVÁ LEKCIA — čo obsahuje

L01 je referenčná lekcia. Obsahuje:

```
✅ id: 1, week: 1, day: 1
✅ title: "Das Alphabet und die Aussprache"
✅ topic: "Nemecká abeceda a výslovnosť"
✅ cefr: "A1"
✅ xpReward: 15
✅ narrativeContext: Jana na HR oddelení, nahlaskovania mena
✅ communicativeGoal: "Po tejto lekcii viem nahláskovat..."
✅ skillFocus: ["vocabulary", "listening", "pronunciation", "writing"]
✅ grammarNote: rule, explanation (3+ vety), 6 examples, slovakContrastNote
✅ grammarNote extra: alphabetTable (30 znakov), digraphs (6), phoneticAlphabet (30)
✅ vocab: 21 položiek, všetky s de/sk/gender/srsId/example/exampleSk/recycledFrom
✅ exercises[0]: flashcard s instruction
✅ exercises[1]: mcq — 6 otázok, každá 4 možnosti, 0-based answer, explanation
✅ exercises[2]: fill — 6 otázok s sentence/answer/hint/explanation
✅ exercises[3]: listen — 8 párov de/sk
✅ exercises[4]: writing — 5 promptov (AI Writing Check)
✅ exercises[5]: match — 8 párov
✅ reviewWords: []
✅ lessonNotes: 3+ vety, kľúčové slová, pedagogické poznámky
```

---

## 10. METÓDY — pokrytie v každej lekcii

Každá lekcia musí pokrývať týchto 6 metód (z Príručky):

| Metóda | Ako je implementovaná v lekcii |
|--------|-------------------------------|
| 1. Spaced Repetition | srsId na každom vocab item → VocabTrainer spracuje |
| 2. Active Recall | flashcard (flip), mcq (výber), fill (písanie) |
| 3. Interleaving | min. 5 rôznych typov cvičení v jednej lekcii |
| 4. Comprehensible Input | listen cvičenie + TTS na kartičkách + príkladové vety v vocab |
| 5. Passive Phase | Globálna funkcia (PassivePhase.jsx) — nie per-lekcia |
| 6. Chunking | Example sentences v každom vocab + fill/MCQ s celými vetami |

---

## 11. CHANGELOG

| Dátum | Zmena |
|-------|-------|
| 2026-02-24 | Dokument vytvorený. L01 auditovaný a potvrdený ako muster. |
| 2026-02-24 | writing pridané do L01 skillFocus. |
