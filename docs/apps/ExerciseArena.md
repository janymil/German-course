# Exercise Arena (`ExerciseArena.jsx`)

## 1. Analýza architektúry a fungovania kompomnentu
**Exercise Arena** je momentálne vôbec najkomplexnejším systémom celej aplikácie. Slúži ako dynamický "multistabilný" generátor cvičení. Namiesto statických stránok na seba berie celú záťaž generovania, vyhodnocovania a spravovania interakcií z viacerých typov vzdelávacích metód.

V súbore nájdeme vyše 900 riadkov kódu, ktorý ovláda nasledujúce aspekty:
- **Zber Dát:** Na vstupe dostáva Lekciu (slovnú zásobu, frázy, cvičenia). Vektorizuje ich do jedného hrajúceho "poolu" (zásobníka), z ktorého náhodne ťahá aktuálnu otázku. 
- **Vyhodnocovanie a Tolerancia:** Využíva centrálnu funkciu `norm()` pre "vyčistenie" študentských preklepov (zrezanie veľkých písmen, interpunkcie, nahradenie nemeckých unikátnych znakov `ä, ö, ü, ß` za `ae, oe, ue, ss`).
- **Časové Blitzy:** Zabezpečuje hernú mechaniku — napr. 7 sekundový timer na tzv. "Bleskový preklad". Toto pridáva gamifikáciu.

Arena operuje vo viacerých módoch, študent tak nečíta len text, ale kombinuje aktivity:
1. `translation / translation_reverse`: Bleskový preklad s časomierou.
2. `dictation / phonetic_dictation`: Prehratie zvuku a následné požiadanie užívateľa, aby to napísal (s toleranciami diakritiky).
3. `speech`: Skutočné rozpoznávanie reči (Speech-to-text API prehliadača), kde systém čaká, spravodlivo analyzuje celú zaznamenanú vetu a na záver spraví Longest Sequence Match, či sa študent minimálne sčasti trafil do obsahu.
4. `wordorder`: Interaktívny drag-and-drop slovosled.
5. `mcq / fill`: Pokročilejšie otestovanie vedomostí a dopĺňane prekladov.

## 2. Je Arena podporená AI technológiou? (Umelá Integligencia)
**Áno.** Pokiaľ má študent vložený svoj OpenAI API kľúč, Arena plnohodnotne nadväzuje spojenie so servermi OpenAI cez model `gpt-4o-mini`.

Zámerom tejto AI nie je nahradenie statických cvičení od učiteľov, ale ich nekonečné rozšírenie a posilnenie tzv. "Náhodnosti", aby sa študent neučil vety naspamäť. Pred štartom cvičení si Arena zavolá pomoc agenta s generatívnymi schopnosťami.

## 3. Je tento AI Prompt kvalitný a striktne regulovaný?
**Prompt bol extrémne vylepšený, aby dbal presne na psychológiu memorovania a vyhol sa klasickej chybe LLM (cyclovanie len dvoch rovnakých slov dokola).**

Základným problémom pri generovaní konverzačného obsahu pre úrovne ako A1-A2 je fakt, že AI model s voľnou rukou rád používa náročnejšiu slovnú zásobu a odmieta sa obmedzovať. Na vyriešenie tohto problému, **Arena teraz robí nasledovné:**
1. Prezrie kompletne celú dovtedy odomknutú študijnú cestu (`allUnlockedLessons`).
2. Vyextrahuje a zlúči všetky reálne naučené slovíčka do presláveného stringu (napr: `"Guten Tag, das Alphabet, der Nachname..."`).
3. Tento surový zoznam podhodí priamo do AI promptu.
    
**Špeciálne reštrikcie:**
Prompt má striktne zadefinované podmienky:
> "Tvoja nová slovná zásoba musí byť VÝHRADNE z tohto zoznamu povolených slov."
> "Nekombinuj len 2 slová dokolečka. Použi čo najväčšiu šírku z tohto zoznamu, nech sú vety nápadité."

Tým pádom je zaistené, že AI nikdy nepoužije žiadnu nečakanú gramatiku a nebude "básniť" o náhodných nepodstatných chytákoch. Bude rovnomerne čerpať z celého portfólia slov a prinesie študentovi zakaždým *100% relevantné, už odomknuté* slovíčka v novom, oživujúcom kontexte.

## 4. Štatistiky, História a Ukladanie do PDF
Keďže Arena pôsobí ako finálna previerka schopností trénovania, po dospievaní k limitu otázok ukážeme študentovi konečnú obrazovku.

Implementovali sme tu rozsiahlu revíziu:
1. Po každej odpovedi si systém pod kapotou uchováva objekt do zoznamu `sessionHistory` — ten obsahuje nielen samotnú otázku z lekcie, ale aj to, čo užívateľ naozaj stlačil/napísal (`userAnswer`).
2. Na konečnej obrazovke nájdete "Štatistiky" (Accuracy bodovanie, počet zvládnutých otázok atď.).
3. **Nový Stavebný Prvok: PDF Export:** Študent tu rovnako dostáva obrovský benefit hmatateľného materiálu.
    Na Finálnej obrazovke sa nachádzajú dve mocné tlačidlá na tlač histórie stretnutia:
    - **Uložiť len otázky (Pracovný List):** Aplikácia vygeneruje HTML stránku prispôsobenú na tlač, z ktorej zamaskuje správne/tvoje odpovede. Stiahnuté PDF tak tvoria vizuálne uhladený test, ktorý môže študent urobiť v papierovej podobe o týždeň.
    - **Report s odpoveďami:** Ideálne pre samo-štúdium. PDF verne zaznamená a červeno/zeleno označí presne to, kde študent behom prebiehajúcej arény pochybil, a pridá k tomu patričné riešenia. V oboch scenároch aplikácia prevezme plnú kontrolu nad interným "Print" oknom prehliadača, ktoré natívne a čisto poskytne PDF uloženie.
