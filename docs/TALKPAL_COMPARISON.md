# Talkpal vs. AI Konverzácia — Porovnanie

## Čo ponúka Talkpal?

Talkpal je AI konverzačný kouč navrhnutý výlučne na jazykové precvičovanie. Nemá plnohodnotný kurz — je to **čistý conversational trainer**.

### Kľúčové funkcie Talkpal

| Funkcia | Talkpal | Naša aplikácia |
|---------|---------|---------------|
| Rozhovor s AI postavou | ✅ | ✅ |
| Oprava gramatiky v reálnom čase | ✅ | ✅ |
| Hlasový vstup (Speech-to-Text) | ✅ | ✅ (Web Speech API) |
| TTS prehrávanie odpovedí | ✅ | ✅ |
| Adaptívna zložitosť podľa úrovne | ✅ | ✅ (podľa lekcií) |
| Ukladanie fráz z konverzácie | ❌ | ✅ (do Slovíčok) |
| Prepojenie so Slovíčkami (SRS) | ❌ | ✅ |
| **Telefónny režim (Call Mode)** | ✅ | ❌ |
| **Foto režim (Photo Mode)** | ✅ | ❌ |
| **Hodnotenie výslovnosti** | ✅ (skóre %) | ❌ |
| **Debaty / argumentovanie** | ✅ | ❌ |
| **Denný feedback/souhrn** | ✅ | ❌ |
| **Gamifikácia (streaks, XP v konverzácii)** | ✅ | ❌ |
| Vlastný kurz / lekcie | ❌ | ✅ (80 lekcií A1) |
| Spaced repetition (SRS) | Čiastočne | ✅ (SM-2 algoritmus) |

---

## Workflow Talkpal vs. Naša aplikácia

### Talkpal workflow
```
1. Vyber jazyk + úroveň
2. Vyber režim: Chat / Roleplay / Hovor / Foto / Debata
3. Chatuj alebo hovor s AI
4. Dostaneš okamžitú spätnú väzbu počas rozhovoru
5. Po skončení: denný súhrn + skóre výslovnosti
6. Gamifikácia: streak, XP body, odznaky
```

### Naša AI Konverzácia workflow
```
1. Vyber postavu (HR, čašník, lekár, sused, predavačka)
2. Chatuj alebo hovor cez mikrofón
3. AI opravuje chyby priamo v odpovedi [Tip: ...]
4. "Ukončiť & uložiť" → extrahuje tvoje vety
5. Správne/Chybné vety sa zobrazia v súhrne  
6. Slová sa automaticky pridajú do Slovíčok na SM-2 opakovanie
```

---

## Čo má Talkpal a naša aplikácia nemá?

### 🔴 Kritické rozdielnosti (výrazne by pomohli):

**1. Hodnotenie výslovnosti**
Talkpal dáva percentuálne skóre za výslovnosť každej vety. Naša app len rozpozná čo si povedal a uloží — nekontroluje, či si to vyslovil správne. Toto je zásadný rozdiel pri učení nemčiny.

**2. Call Mode (Telefonický režim)**
Len audio — žiadny text viditeľný počas hovoru. Toto je oveľa náročnejšie a lepší tréning počúvania. Bez vizuálnej opory musíš skutočne porozumieť.

**3. Post-session denný feedback**
Po každom rozhovore Talkpal vygeneruje súhrn: čo si použil správne, kde robíš najčastejšie chyby, akú slovnú zásobu si použil. Naša app ukáže len zoznam viet.

**4. Pronunciacion scoring**
Talkpal hodnotí konkrétne fonémy a dáva spätnú väzbu ako: "Slabá výslovnosť 'ü' — skús zaobliť pery". My len skonvertujeme reč na text.

### 🟡 Menšie rozdiely (nice-to-have):

**5. Foto/Obrázok Mode**
Talkpal zobrazí obrázok a pýta sa ťa aby si ho popísal po nemecky. Skvelé na precvičovanie popisného jazyka.

**6. Debaty a argumentácia**
Pre našu A1 úroveň nie je relevantné — ale pre B1/B2 by to bola výborná funkcia.

---

## Je naša aplikácia rovnaká ako Talkpal?

**Nie — v 3 kľúčových veciach je lepšia, v 2 horší:**

**Lepšia:**
- ✅ **Prepojenie so Slovíčkami** — Talkpal nevie čo si sa naučil v kurze a neopakuje to. Naša app berá slová z konverzácie a dáva ich do SM-2 systému na optimálne opakovanie.
- ✅ **Kurz-kontext adaptácia** — AI vie koľko lekcií si dokončil a tomu prispôsobuje jazyk
- ✅ **Zadarmo** — Talkpal stojí ~$10/mesiac za neobmedzené používanie

**Horšia:**
- ❌ **Žiadne hodnotenie výslovnosti** — toto je veľká medzera
- ❌ **Žiadny Call Mode** — len textový chat + voliteľný mikrofón

---

## Odporúčania na implementáciu

### Priorita 1 — Jednoduchá (ideálna pre teraz)
**Post-session AI feedback** — Po kliknutí "Ukončiť & uložiť" zavolať Gemini s celou konverzáciou a vygenerovať súhrn: gramatické vzory, najčastejšie chyby, nová slovná zásoba. Toto by výrazne zvýšilo hodnotu každého rozhovoru.

### Priorita 2 — Stredná
**Call Mode** — Schová textový výstup, len hovor a AI odpovedá cez TTS. Jednoducho implementovateľné: `showText: false` prepínač v UI.

### Priorita 3 — Komplexná
**Výslovnostné hodnotenie** — Vyžaduje buď Azure Speech API alebo Google Cloud Speech-to-Text s confidence scores. Netriviálne, ale možné.
