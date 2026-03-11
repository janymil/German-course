# Shadowing App Documentation

## Prehľad
Shadowing App je nástroj vytvorený pre nácvik plynulosti reči, porozumenia a zautomatizovania gramatických vzorcov metódou "Wait and Repeat" (počúvaj a opakuj nahlas).

Pri výskyte dlhých textov aplikácia inteligentne prepočíta dĺžku hovorenej vety a použije ju na dynamické vytvorenie prestávky na to, aby používateľ vetu zopakoval, čím sa buduje "Svalová pamäť" (Muscle Memory) pri hovorení cudzím jazykom.

## Módy Aplikácie

Aplikácia obsahuje dva hlavné módy, medzi ktorými sa dá voľne prepínať v hornej časti obrazovky:

### 1. Príbehy (Story Mode)
Tento mód slúži na **precvičovanie plynulosti a výslovnosti (Fluency & Prosody)**.
Používateľ počúva kontinuálny príbeh rozdelený na segmenty. Ideálne na osvojovanie si prirodzeného rytmu a melódie nemeckého jazyka, ako aj fixáciu slovnej zásoby v kontexte.

### 2. Gramatický Dril (Grammar Drill Mode)
Tento mód je založený na lingvistickom princípe **Pattern Parroting (Audio-Lingual Method)**.
Jeho cieľom nie je vysvetľovať gramatické pravidlá, ale **vybudovať pre gramatiku jazykový cit**. Namiesto analytického myslenia ("to je mužský rod, musí tu byť koncovka -er") študent opakovaním desiatok podobných fráz získa pre túto väzbu (chunk) ucelené sluchové a artikulačné očakávanie.
V tomto móde sú nemecké frázy **farebne odlíšené** na základe rodov (Maskulin = modrá, Feminin = červená, Neutrum = zelená, Plural = žltá).

## Súbory zapojené do nástroja

1. `src/views/ShadowingTrainer.jsx`
   - Hlavný React komponent vykresľujúci užívateľské rozhranie, ovládanie audia a módov.
   - Obsahuje funkciu `startWaitPhase()`, ktorá počítá prestávku pre Echo shadowing.

2. `src/components/Sidebar.jsx`
   - Odkaz na `ShadowingTrainer` v postrannom navigačnom (Sidebar) paneli.
   
3. `src/data/shadowingStories.js`
   - Obsahuje konštantu `SHADOWING_STORIES`, čo je databáza príbehov pre Story mód limitovaných na úroveň A1.
   
4. `src/data/shadowingGrammarData.js`
   - Obsahuje rozsiahlu štruktúrovanú databázu `GRAMMAR_DRILLS`. Všetky vygenerované segmenty sú manuálne obohatené o sémantickú tagovú kategóriu `category`, zabezpečujúcu správne zafarbenie vo frontende na podporu vizuálneho ukotvenia pre daný gramatický jav.

## Architektúra a Budúci rozvoj (Roadmap)
Aplikácia momentálne využíva `window.speechSynthesis` (Browser TTS) API, čo dovoľuje neobmedzený počet generovaní zadarmo a okamžitú spätnú väzbu.
V budúcnosti môže byť aplikácia modifikovaná na to, aby prehrávala reálne MP3 súbory získané z pokročilých neural-voice systémov (napríklad z externého servera cez OpenAI TTS pre najvyššiu autenticitu).
