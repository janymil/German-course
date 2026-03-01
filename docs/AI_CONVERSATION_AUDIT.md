# Audt: AI Konverzácia (AIArena)

## 📌 Ako to funguje a čo to robí
Aplikácia umožňuje simulovať rozhovory s nemecky hovoriacimi postavami v typických A1 situáciách. Sú tam predpripravené roly (napr. HR manažérka, Čašník, Lekár, Sused, Predavačka).

1. **Výber postavy**: Používateľ si vyberie s kým chce hovoriť.
2. **Chatovanie**: Používateľ môže písať text alebo použiť funkciu reči na text (Web Speech API).
3. **Odpoveď AI**: Umelá inteligencia vygeneruje odpoveď v jednoduchej A1 nemčine a môže prehrať odpoveď pomocou TTS (Text-to-Speech).
4. **Opravy gramatiky**: Ak používateľ urobí chybu, AI odpovie v rodnom jazyku používateľa (slovenčina) s tipom, napr. `(Tip: správne je 'Ich heiße', nie 'Ich bin heiße')`, a potom pokračuje v komunikácii po nemecky.
5. **Ukončiť a uložiť**: Po skončení sa vyhodnotí konverzácia. Rozdelia sa vety na "Správne" a "Na precvičenie". Používateľ si môže tieto frázy uložiť do svojej histórie a všetky použité slová sa automaticky pridajú do systému Slovíčok.

---

## 🔍 Audit promptov pre AI (`useAI.js`)

**Aktuálny systémový prompt pre konverzáciu:**
Prompt dynamicky mení zložitosť podľa počtu dokončených lekcií používateľa a počtu ovládaných slov (`completedLessonsCount`, `masteredWordsCount`). Toto je vynikajúce pre adaptívne učenie.

*   Vynucuje prísne odpovede na úrovni A1 (krátke vety).
*   Zakazuje AI opúšťať rolu.
*   Správne rozoznáva ASCII verzie prehlások (ss za ß, ae za ä), takže nikoho zbytočne nestresuje pri písaní na slovenskej klávesnici.
*   *Slabina promptu*: Opravy sú závislé od štrukturálneho textu. Prompt inštruuje: `Ak žiak urobí gramatickú chybu, jemne ho oprav v závorke po slovensky... Príklad: "(Tip: ...)"`. Následne kód v `AIConversation.jsx` natvrdo používa regex `/\(Tip:[^)]+\)/` na extrakciu. Ak AI odpovie inak napr. `(Rada: ...)`, aplikácia nevšimne opravu a zachová vetu ako "Správnu".

---

## 💾 Funkcia ukladania (Saving function)

**Kde sa to ukladá?**
1.  **Vety (`conversationPhrases`)**: Ukladá sa používateľova vstupná veta, ID a meno postavy, a prípadný vyextrahovaný `Tip` s opravou. Uloží sa to do poľa `progress.conversationPhrases`.
2.  **Rozbíjanie do Slovíčok**: Systém deteguje použité nemecké slová (dlhšie ako 3 písmená). Všetky zachytené slová zadané používateľom putujú priamo do modulu Slovíčok (`onMarkVocabSeen`), kde sa premenia na kartičky pre systém SM-2 (Začínajú odznova).

Tento prístup "Organicky budovanej slovnej zásoby" je mechanicky funkčný a výborne prepája dve časti aplikácie. Aplikácia `useProgress.js` zabezpečí spoľahlivý export cez POST na server.

---

## 💡 Odporúčania na vylepšenie

1.  **Stabilnejšie extrahovanie chýb (Structured Outputs)**
    Namiesto riskantného Regexu pre `(Tip: ...)` zmeniť výstup AI na čistý štruktúrovaný JSON. Moderné modely podporujú `response_format: { type: "json_object" }`. AI by vrátilo objekt obsahujúci `{"message": "nemecký text", "correction": "slovenská oprava alebo null"}`. Toto garantuje 100% presnosť parsovania.
2.  **Konverzačný trenažér**
    Uložené nesprávne vety do `conversationPhrases` momentálne v aplikácii len "visia" a aplikácia ich ďalej nevyužije na nejaké opakovanie. Bolo by skvelé mať v menu napríklad "Moje frázy", kde si vie človek opäť precvičiť a preložiť vlastné vety v ktorých spravil chybu.
3.  **Hlasový vstup (Web Speech API)**
    Natívne API prehliadača môže byť frustrujúce (na iPhone vôbec nefunguje napríklad správne, ak nie je Safari). Stálo by za t to zvážiť priamo integráciu OpenAI Whisper (alebo Gemini audio analýzy) pre oveľa zhutnenejšie a presnejšie rozpoznávanie prízvuku nemeckého hovoriaceho začiatočníka.

---

## 🤖 Odporúčania, aký AI model použiť

Aktuálna implementácia: `gpt-4o-mini`

*   **Zhodnotenie súčasného modelu**: `gpt-4o-mini` je relatívne schopný model, lacný s dobrým pochopením slovenčiny. Pre rolový model na úrovni A1, pre ktorý je určená aplikácia, nevyžaduje masívnu inteligenciu.
*   **Odporúčaná zmena: Gemini 2.5 Flash / Flash Lite** (Cez Google Generative AI SDK)
    *   **Prečo?**: Flash 2.5 radí medzi extrémne rýchle a ešte lacnejšie LLM, perfektné na repetitívne chaty kde vyžadujete milisekundovú odpoveď. Flash Lite stojí haliere/centy a je úplne viac než dostačujúci pre simuláciu čašníka A1 v kaviarni, čím by sa zrazili náklady ešte viac nadol bez straty akejkoľvek kvality.
    *   Gemini má veľmi solídne JSON Structured outputy (už vo svojej základnej vrstve API), čím by automaticky vyriešil problém opísaný v bode 1 hore.
