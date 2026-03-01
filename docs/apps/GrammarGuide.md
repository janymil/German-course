# Grammar Guide (`GrammarGuide.jsx`)

## 1. Analýza architektúry a fungovania komponentu
**Grammar Guide** (Gramatická Encyklopédia a Tréner) je samostatná mini-aplikácia zameraná čisto na teóriu a jej následné okamžité uplatnenie v praxi (tzv. Drilling). Slúži pre študentov, ktorí si po prejdení lekcie nie sú na 100% istí pravidlom a chcú si to dobehnúť bez toho, aby museli opakovať celú únavnú lekciu v prekladoch.

Aplikácia (v súbore s vyše 550 riadkami kódu) elegantne delí rozhranie na dve časti:
- **Ľavé menu (Index pravidiel):** Vyhľadateľný zoznam všetkých gramatických javov rozdelený podľa ID lekcií. 
- **Pravý detail (Teória + Interakcia):** Miesto, kde sa gramatika vysvetľuje, ukazuje sa s funkciou Text-to-Speech (TTS) na počúvanie výslovnosti a priamo sa overuje kvízmi.

### Zlaté pravidlo pre prístup k štruktúram dát (Muster pristup):
Aplikácia prestala byť viazaná na 1 lekciu = 1 pravidlo. V súbore dát (napr. `L01.js`) teraz používame pole `grammarNotes: [...]`. To znamená, že lekcia č. 1 môže súčasne učiť výslovnosť abecedy ako aj časovanie slovesa "sein" a túto flexibilitu Grammar Guide automaticky rozozná a vytvorí z jednej lekcie 2 samostatné kapitoly v ľavom paneli.

## 2. Je prístup aplikácie správny, používateľsky príjemný a prospešný?
Aplikácia je postavená na prístupe **"Theory-to-Action"** (Okamžite zhmotniť teóriu do praxe), čo je z lingvistického a metodického hľadiska ten najlepší možný edukatívny formát. Zvlášť na požiadavky úrovne Goethe A1. Preto je jej prístup mimoriadne prospešný a po jej update spĺňa nasledovné vlastnosti:

- **Hlasový Tréning pri každom pravidle:** Aplikácia nedovolí učiť sa "potichu". Každý prednesený jav (či už je to len jedno písmeno alebo komplexná veta) obsahuje tlačidlo pre prehratie rodeným hovorcom cez TTS.
- **Seba-Overovanie Výslovnosti do mikrofónu:** Je tam interaktívne tlačidlo `react-speech-recognition`, ktoré ti povie presne, ktoré z gramatických javov si povedal zle a aplikuje na to systém bodovania.
- **Micro-Drilling (Bleskové otestovanie tohto pravidla):** Je to pod-komponent vo vnútri aplikácie, ktorý robí mini kvíz presne ušitý IBA na to dané gramatické pravidlo, ktoré je práve na obrazovke zobrazené, aby sme predišli kognitívnemu preťaženiu.

## 3. Obsah Gramatického vysvetlenia
Každý `grammarNote` štrukturálne obsahuje a v UI bezchybne renderuje:
1. `rule` (Názov t.j. Akuzatív, Osobné zámena).
2. `explanation` (Detailné textové vysvetlenie — prečo a ako, upozornenie na hlavné chytáky pre Slovákov).
3. `examples` (Príklady reálnych viet pre priame porovnanie).
4. `alphabetTable` a `phoneticAlphabet` - špeciálne dynamické UI, navrhnuté špeciálne pre prvú lekciu s interaktívnou klikacou tabuľkou celej Abecedy.

## 4. O čo bola aplikácia updatunutá a ako fungujú jej mini cvičenia?
Komponent prešiel prepracovaním:
- Všetky gramatické vety cez `.map()` metódy obsahujú Audio ikonku `<Volume2 />`, ktorá spustí `useTTS()` háčik, čím sa splnila podmienka ozvučšenia *všetkých* viet k príkladom.
- Úprava `GrammarDrill`: Už nevyberá náhodne cvicenia z celej lekcie. Komponent sa teraz pozerá priamo do jadra zvoleného pravidla  (`selectedRule.grammarNote.exercises`) a pokiaľ nájde cvičenia pripnuté presne na toto pravidlo, nasadí pre študenta malý test zložený len z napr. dopĺňačiek zámena `Sie`, ale už z neho vynechá ostatnú nepríbuznú látku tej danej lekcie (napríklad hláskujúcu slovnú zásobu).  Pokiaľ ale rule svoje cvičenia nemá, kvôli kompatibilite spätne upadne na (`lesson.exercises`) a ponúkne tak širší okruh previerky.

S takýmto fundamentálnym dizajnom dát si môžeme byť istí, že rovnako ľahko sa nám budú vyrábať a parsovať gramatiky až do Lesson 80.
