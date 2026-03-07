# Príručka: Ako manuálne opravovať a upravovať cvičenia

Tento dokument vysvetľuje, v ktorých priečinkoch a súboroch sa nachádzajú dáta cvičení a ako ich môžeš manuálne opraviť priamo v kóde, ak umelá inteligencia vygeneruje logický nezmysel.

---

## 📂 1. Kde nájdem vygenerované lekcie a texty cvičení?

Všetky vygenerované nemecké texty, slovíčka a cvičenia z AI sa **neuchovávajú** v žiadnej externej databáze. Sú uložené priamo v lokálnych `.js` súboroch v tvojom projekte.

📁 **Cesta k dátam cvičení:**
\`c:\\Users\\USER\\Documents\\GERMAN\\src\\data\\lessons\\\`

V tomto priečinku sa nachádzajú súbory nazvané podľa čísel lekcií. Napríklad:
* \`L01.js\` (Lekcia 1)
* \`L07.js\` (Lekcia 7)
* \`L08.js\` (Lekcia 8)
* a tak ďalej.

Keď chceš opraviť gramatickú chybu alebo zlú vetu v **Lekcii 7**, otvoríš si súbor \`L07.js\`.

---

## 🔎 2. Ako nájdem konkrétne cvičenie v súbore lekcie?

Súbor lekcie (napr. \`L07.js\`) je štruktúrovaný ako jeden veľký JavaScriptový objekt. Skladá sa z meta-dát, slovnej zásoby (\`vocab\`), gramatiky (\`grammarNotes\`) a samotných cvičení v poli **\`exercises: [ ... ]\`**.

Keď máš otvorený súbor vo VS Code, použi vyhľadávanie (`Ctrl + F`) a hľadaj príslušný typ cvičenia pod kľúčom \`type: '<meno_cvicenia>'\`:

* **Zostavenie vety (Slovná banka):** Hľadaj \`type: 'wordorder'\`
* **Pravda / Nepravda:** Hľadaj \`type: 'truefalse'\`
* **Doplňovačka do medzier:** Hľadaj \`type: 'fill'\`
* **Test s možnosťami (A,B,C,D):** Hľadaj \`type: 'mcq'\`
* **Diktát:** Hľadaj \`type: 'dictation'\`
* **Mini-text s otázkami:** Hľadaj \`type: 'minitext'\`
* **Rozprávanie (Hlasové):** Hľadaj \`type: 'speaking'\`

---

## ✏️ 3. Ako manuálne upraviť chybnú vetu?

Ukážeme si to na troch najčastejších typoch cvičení. Vždy upravuj iba samotné reťazce (text v úvodzovkách `''` alebo `""`). Nedotýkaj sa zátvoriek ani kľúčových slov (ako `answer:` alebo `type:`).

### A) Oprava MCQ (Otázky A,B,C,D)
Ak vidíš hroznú vetu v MCQ teste, nájdi blok, ktorý vyzerá takto:
```javascript
{
  question: '"Meine Eltern ___ in Bratislava." Was kommt in die Lücke?', // <-- TU OPRAVÍŠ OTÁZKU
  options: ['hat', 'habt', 'habe', 'haben'],                        // <-- TU OPRAVÍŠ MOŽNOSTI
  answer: 3,                                                        // Index správnej odpovede (počíta sa 0, 1, 2, 3)
  explanation: '"Die Eltern" je plurál...'                          // <-- TU OPRAVÍŠ VYSVETLENIE PRE ŠTUDENTA
}
```

### B) Oprava "Zostavenie vety" (Word Order)
Ak AI vygenerovala chybnú štruktúru vety pre slovnú banku, nájdi \`type: 'wordorder'\`:
```javascript
{
  sk: 'Moji rodičia majú auto.',                     // <-- SLOVENSKÝ PREKLAD
  correct: 'Meine Eltern haben ein Auto.',           // <-- OPRAV CELÚ SPRÁVNU VETU TU! Bez bodky na konci.
  words: ['Meine', 'Eltern', 'haben', 'ein', 'Auto'] // <-- ROZDEĽ JU NA JEDNOTLIVÉ SLOVÁ TU
}
```
*Poznámka: Ak opravuješ veta v poli `correct`, nezabudni opraviť a rovnako rozdeliť aj slová v poli `words`.*

### C) Oprava "Pravda / Nepravda" (True/False)
```javascript
{
  statement: '"Das Kind" ist feminin (die).',      // <-- TVRDENIE NA OPRAVU
  isTrue: false,                                   // <-- true = Richtig, false = Falsch
  explanation: 'Nepravda. "Das Kind" je stredného rodu...'   // <-- VYSVETLENIE
}
```

### D) Oprava "Doplň do medzery" (Fill)
```javascript
{
  sentence: 'Er kauft ein ___ (Brot).',     // <-- SLOVO DO MEDZERY ZABAĽ DO ZÁTVORIEK
  answer: 'Brot',                           // <-- PRESNÁ ODPOVEĎ, KTORÚ MUSÍ ŠTUDENT NAPÍSAŤ
  hint: 'chlieb',                           // <-- NÁPOVEDA (väčšinou slovenský preklad)
  explanation: 'Das Brot je chlieb.'        // <-- VYSVETLENIE
}
```

---

## 💾 4. Čo po oprave?

1. Vo VS Code stlač **\`Ctrl + S\`** na uloženie súboru (napr. \`L07.js\`).
2. Tvoja lokálna aplikácia (bežiaca cez `npm run dev`) okamžite zaregistruje preuloženie a obnoví sa.
3. Kľudne môžeš stlačiť "F5" v prehliadači aplikácie, nanovo otvoriť lekciu, a tvoje manuálne zmeny sa okamžite prejavia v cvičeniach.

## 🛠 Kde nájdem samotný kód pre UI cvičení a ich logiku?
Ak ťa zaujíma, ako aplikácia tieto dáta pod kapotou vizuálne vykresľuje a kontroluje, zdrojové kódy samotných vizuálnych komponentov (React kód) sú tu:

📁 \`c:\\Users\\USER\\Documents\\GERMAN\\src\\components\\exercises\\\`

Zoznam existujúcich komponentov:
1. `MCQExercise.jsx` (A/B/C/D kvízy)
2. `TrueFalseExercise.jsx` (Pravda / Nepravda)
3. `WordOrderExercise.jsx` (Slovná banka a skladanie viet)
4. `FillExercise.jsx` (Doplňovačky)
5. `ListenExercise.jsx` (Kartičky s audiospomienkami)
6. `DictationExercise.jsx` (Diktáty)
7. `MatchExercise.jsx` (Spájanie párov)
8. `CategorySortExercise.jsx` (Triedenie do kategórií)
9. `TranslationExercise.jsx` (Preklad viet)
10. `SpeakingExercise.jsx` (Záznam hlasu)
11. `ConjugationExercise.jsx` (Časovanie slovies)
12. `MiniTextExercise.jsx` (Krátky text s porozumením)
13. `FlashcardExercise.jsx` (Základné kartičky úvodnej slovnej zásoby)
