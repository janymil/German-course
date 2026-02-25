# Exercise Arena (Tréningová Aréna) - Concept & To-Do

## Ový koncept
"Tréningová Aréna" je dedikovaná sekcia aplikácie navrhnutá na nekonečné, dynamické a vysoko interaktívne precvičovanie nemeckého jazyka. Kým štandardné lekcie poskytujú fixný lineárny prechod učivom a gramatikou, Aréna slúži na 20+ minútové denné tréningové "sessions", kde sa používateľ ponorí hlbšie a upevňuje svoje znalosti opakovaním v rôznych kontextoch.

### Hlavné princípy:
1.  **Časovo orientované Sessions**: Namiesto "prejdi 5 cvičení" má používateľ cieľ "trénuj 20 minút". Aréna obsahuje viditeľný časovač a skóre.
2.  **Multifunkčná interaktivita**: Cvičenia vyžadujú rôznu úroveň zapojenia – od rýchleho tapania (výber správneho slova), cez písanie počutého slova (diktát), triedenie slovosledu potiahnutím (drag & drop), až po samotné rozprávanie do mikrofónu.
3.  **Algoritmické generovanie**: Aby cvičenia nedošli, systém dynamicky vytvára nové otázky kombináciou `vocab` (slovíčok) a `grammarNote` (pravidiel) danej lekcie. Ak má používateľ zadaný API kľúč, Aréna dokáže generovať plnohodnotné konverzačné a prekladové cvičenia cez AI.
4.  **Cielené precvičovanie**: Používateľ si môže vybrať tréning konkrétnej lekcie, alebo "Mix" všetkého, čo doteraz odomkol.

---

## Typy cvičení (V Aréne)

1.  **Diktát (Listening & Typing)**: Aplikácia prečíta [TTS] nemeckú vetu/slovo bez zobrazenia textu. Používateľ ju musí presne napísať.
2.  **Hovorenie (Speech Analysis)**: Zobrazí sa nemecký text. Používateľ stlačí mikrofón a prečíta ho. Systém vyhodnotí presnosť výslovnosti pomocou `react-speech-recognition`.
3.  **Bleskový preklad (Speed Translation)**: Rýchle cvičenie pod časovým tlakom. Zobrazí sa slovenské slovo a 4 nemecké možnosti (alebo pole na vpísanie). Cieľom je reagovať do 5 sekúnd.
4.  **Tvorba viet (Word Order)**: Používateľ dostane rozhádzané slová a musí ich usporiadať do správneho slovosledu klikaním alebo ťahaním.
5.  **AI Reakcie (Contextual Responses)**: (Vyžaduje API kľúč). Aplikácia simuluje pýtajúceho sa ("Wie heißt du?"). Používateľ povie alebo napíše akúkoľvek zmysluplnú odpoveď. AI overí správnosť gramatiky a kontextu.

---

## To-Do List implementácie

### Fáza 1: Základná infraštruktúra (Aktuálne)
- [x] Vytvoriť tento konceptuálny `.md` dokument.
- [ ] Vytvoriť komponent `ExerciseArena.jsx` (UI pre výber lekcie na tréning, zobrazenie časovača, skóre, tlačidlo "Ukončiť tréning").
- [ ] Pridať sekciu "Aréna" do bočného panelu (`Sidebar.jsx`).
- [ ] Prepojiť routovanie v `App.jsx`.
- [ ] Pridať "Výzvu do Arény" na konci štandardnej lekcie v `LessonView.jsx`.

### Fáza 2: Generátor Cvičení (Core Engine)
- [ ] Vytvoriť offline generátor funkcií, ktorý zoberie pole `vocab` z vybranej lekcie a vytvorí z nich pole X otázok (typu Flashcard a Diktát).
- [ ] Načrtnúť "Session State" - počet otázok, správnych/nesprávnych odpovedí, ubehnutý čas v minútach a sekundách.

### Fáza 3: Pridanie špecifických interaktívnych tried
- [ ] Implementovať mód **Diktát** (iba Audio tlačidlo -> Input Field pre odpoveď).
- [ ] Implementovať interaktívny mód **Hovorenie** využívajúc `react-speech-recognition` (overenie zhody transcriptu a targetu).
- [ ] Implementovať **Tvorbu viet / Slovosled** (generovanie viet na základe príkladov z `grammarNote.examples`).

### Fáza 4: AI & Gamifikácia
- [ ] Zapojiť OpenAI na generovanie úplne nových príkladov pre dané gramatické pravidlo (Akuzatív, Nečleny, atď.) pri zvolení "AI Infinite Mode".
- [ ] Pridať dynamické povzbudzujúce hlášky počas 20-minútového tréningu (každých 5 minút).
- [ ] Ukladanie celkového času stráveného v Aréne do profilu používateľa (Dashboard štatistiky).
