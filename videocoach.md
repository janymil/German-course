# Video Coach Workflow

Tento dokument presne popisuje technické fungovanie a logiku interaktívneho prehrávača Video Coach a AI Konverzácií. Overené podľa aktuálneho zdrojového kódu.

## Ako OpenAI TTS vie, o čom má konverzovať?
OpenAI TTS **nevie** o čom konverzuje. Slúži *výhradne* ako hlasový syntetizátor na prečítanie textu nahlas.
Skutočným mozgom je **Gemini 2.5 Flash Lite**. Keď do mikrofónu niečo povieš (čo prehliadač prepíše na text a pošle v pozadí), aplikácia pošle do Gemini 3 veci:
1. Vybraný konkrétny text (titulky) z predchádzajúceho 5-minútového bloku.
2. Presne to, čo si odpovedal do mikrofónu.
3. Inštrukcie, aby sa správal ako nemecký učiteľ so striktne vynútenou jazykovou úrovňou (A1, A2 atď) pre dané video.

Gemini si prečíta titulky z danej scény, vypočuje si tvoju reakciu a napíše jednoduchý nemecký text. Až **TENTO text** sa posiela do OpenAI TTS, ktorý ho premení na zvukový záznam.

## Čo robí lokálny JavaScript a aké sú náklady na API?
Poplatky a spotreba API sú znížené absolútne na minimum. Veľká časť logiky je spracovaná ZADARMO:
1. **Slovenský preklad tituliek:** Preklad tisícok nemeckých viet v pozadí je plne bezplatný. Aplikácia (cez `/api/translate`) smeruje požiadavky na neoficiálne voľné rozhranie Google Translate (`translate.googleapis.com/translate_a/single?client=gtx`), **nie** do plateného Gemini.
2. **JavaScript lokálne rozsekanie (Chunking):** JavaScript priamo na serveri prečíta milisekundy videa. Plynule a okamžite odmeria časy a vybuduje 5-minútové bloky podľa ukončenia viet. Na toto nie je použité žiadne API, prebieha to v milisekundách a je to plne ZDARMA.
3. **Gemini na pomenovanie blokov témy (Jediný mikro poplatok):** Pre každý identifikovaný blok sa odošle surový úryvok (limit. 4000 znakov) len tohto bloku do pamäťovo ľahkého `gemini-2.5-flash-lite` učiteľa s inštrukciou: *"Daj mi z tohto krátky, maximálne 4-slovný názov témy."* Toto stojí minimum tokenov a platí sa to iba raz za video na svete.

## Presný Workflow - krok po kroku

### Pustenie videa PO PRVÝKRÁT (Žiadna cache ešte neexistuje)
1. **Sťahovanie z YouTube:** Aplikácia (`vite.config.js`) cez `youtube-dl-exec` pošle žiadosť na YouTube, stiahne nemecké titulky (časy a text).
2. **Lokálne permanentné ukladanie (Cache 1):** Tieto titulky okamžite zapíše ako súbor na lokálny disk do umiestnenia `src/data/video-database/[videoId].json`. Tým sú bezpečne uložené navždy.
3. **Generovanie blokov:** Prehliadač poprosí backend server o vytvorenie blokov tém.
4. **Javascript rezanie a Gemini Pomenovanie:** Node backend (`ai-voice-coach-api.js`) zoberie dĺžku predchádzajúceho úseku videa, a každých 5 minút urobí rez vetou. Blok následne pošle do Gemini na získanie názvu.
5. **Lokálne uloženie tém (Cache 2):** Informácia o časových intervaloch blokov a ich názvy od Gemini sa trvalo uložia do lokálneho dokumentu `src/data/video-database/[videoId]-segments.json`.
*Odteraz ide video už natrvalo z tvojej lokálnej pamäte.*

### Pustenie videa KAŽDÝ ĎALŠÍ KRÁT (Next time video play) 
Aplikácia nikdy nevolá YouTube, ani GeminiAPI na opätovné riešenie blokov.
1. Aplikácia sa pozrie do `src/data/video-database/[videoId].json`. Odtiaľ si okamžite do 0 ms vytiahne časovanie tituliek.
2. Aplikácia si potichu nahraje `src/data/video-database/[videoId]-segments.json`. Bez potreby oslovovať Gemini API, okamžite vie, kde sú 5-minútové pauzy rezu a ich názvy pre UI modál.
3. *Všetko pri druhom prehraní, od naštartovania videa po prepis bodov, beží zadarmo bez API míňania.*

Jediný moment, kedy aplikácia utráca peniaze API kľúča pri zabehnutom lokálnom videu, nastáva: 
Keď prejde jeden 5 minútový segment, **zobrazí sa hlasový AI tréner, ty stlačíš zelené tlačidlo, povieš niečo učiteľovi.** Ten následne prostredníctvom textového API a audio OpenAI TTS API vygeneruje plnohodnotnú zvukovú odpoveď.
