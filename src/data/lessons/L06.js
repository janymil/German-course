export const lesson06 = {
  id: 6,
  week: 2,
  day: 2,
  title: "Zahlen 21–100 und regelmäßige Verben",
  topic: "Čísla 21–100 a pravidelné slovesá",
  cefr: "A1",
  xpReward: 25,
  narrativeContext:
    "Jana rokovuje o nájme so svojim budúcim prenajímateľom. Herr Gruber povie: 'Das sind 850 Euro warm.' Jana musí pochopiť veľké čísla, opýtať sa na cenu a dojednať podmienky. Prvý skutočný finančný rozhovor v nemčine!",
  communicativeGoal:
    "Po tejto lekcii viem počítať do 100, konjugovať pravidelné -en slovesá, opýtať sa na cenu a reagovať na cenovú ponuku.",
  skillFocus: ["grammar", "vocabulary", "numbers"],

  grammarNote: {
    rule: "Pravidelné -en slovesá a čísla 21–100",
    explanation:
      "Pravidelné nemecké slovesá (slabé slovesá) nasledujú vzor: kmeň + prípona. Prípony: ich -e, du -st, er/sie/es -t, wir -en, ihr -t, sie/Sie -en. Špeciálny prípad: slovesá s kmeňom na -t alebo -d pridávajú -e- pred -st a -t (arbeiten → du arbeitest, er arbeitet). Čísla 21–99: jednotky sú PRED desiatkami, spojené 'und' (einundzwanzig = 1+20). Výnimka v pravopise: dreißig (30) — píše sa s ß, nie s z!",
    examples: [
      { de: "kaufen: ich kaufe, du kaufst, er kauft, wir kaufen, ihr kauft, sie kaufen", sk: "kúpiť — pravidelný vzor" },
      { de: "arbeiten: ich arbeite, du arbeiTest, er arbeiTet", sk: "pracovať — extra -e- pred -st/-t!" },
      { de: "einundzwanzig (21)", sk: "ein + und + zwanzig = jedna-a-dvadsať" },
      { de: "dreißig (30)", sk: "⚠️ dreißig — nie dreizzig, nie dreisig!" },
      { de: "fünfundachtzig (85)", sk: "fünf + und + achtzig = 85" }
    ],
    slovakContrastNote:
      "Slovenčina má tiež pravidelné slovesá, ale koncovky sú iné. V nemčine je kľúčový vzor: -e/-st/-t/-en/-t/-en. Dôležitý rozdiel: pri slovesách na -t/-d (arbeiten, reden) sa vkladá -e- pre ľahšiu výslovnosť: arbeitest (nie arbeitst). Číselnú zvláštnosť jednotky-pred-desiatkami má aj slovenčina pri čítaní (trinásť = tri+náct), ale nie pri číslovkách nad 20."
  },

  vocab: [
    {
      de: "einundzwanzig",
      sk: "dvadsaťjeden",
      example: "Einundzwanzig Euro — das ist günstig!",
      exampleSk: "Dvadsaťjeden eur — to je lacné!",
      gender: null,
      srsId: "L06_V01",
      recycledFrom: []
    },
    {
      de: "dreißig",
      sk: "tridsať (⚠️ s ß!)",
      example: "Dreißig Euro pro Tag — das ist okay.",
      exampleSk: "Tridsať eur na deň — to je v poriadku.",
      gender: null,
      srsId: "L06_V02",
      recycledFrom: []
    },
    {
      de: "vierzig",
      sk: "štyridsa",
      example: "Die Wohnung ist vierzig Quadratmeter groß.",
      exampleSk: "Byt má štyridsa štvorcových metrov.",
      gender: null,
      srsId: "L06_V03",
      recycledFrom: []
    },
    {
      de: "fünfzig",
      sk: "päťdesiat",
      example: "Fünfzig Prozent Rabatt!",
      exampleSk: "Päťdesiat percent zľava!",
      gender: null,
      srsId: "L06_V04",
      recycledFrom: []
    },
    {
      de: "sechzig",
      sk: "šesťdesiat",
      example: "Sechzig Minuten hat eine Stunde.",
      exampleSk: "Hodina má šesťdesiat minút.",
      gender: null,
      srsId: "L06_V05",
      recycledFrom: []
    },
    {
      de: "siebzig",
      sk: "sedemdesiat",
      example: "Siebzig Euro für den Supermarkt — das reicht.",
      exampleSk: "Sedemdesiat eur na supermarket — to stačí.",
      gender: null,
      srsId: "L06_V06",
      recycledFrom: []
    },
    {
      de: "achtzig",
      sk: "osemdesiat",
      example: "Der alte Mann ist achtzig Jahre alt.",
      exampleSk: "Starý pán má osemdesiat rokov.",
      gender: null,
      srsId: "L06_V07",
      recycledFrom: []
    },
    {
      de: "neunzig",
      sk: "deväťdesiat",
      example: "Neunzig Euro pro Woche für Lebensmittel.",
      exampleSk: "Deväťdesiat eur týždenne na potraviny.",
      gender: null,
      srsId: "L06_V08",
      recycledFrom: []
    },
    {
      de: "hundert",
      sk: "sto",
      example: "Das kostet hundert Euro.",
      exampleSk: "To stojí sto eur.",
      gender: null,
      srsId: "L06_V09",
      recycledFrom: []
    },
    {
      de: "kaufen",
      sk: "kúpiť",
      example: "Ich kaufe Lebensmittel im Supermarkt.",
      exampleSk: "Kupujem potraviny v supermarkete.",
      gender: null,
      srsId: "L06_V10",
      recycledFrom: []
    },
    {
      de: "kosten",
      sk: "stáť (cena)",
      example: "Wie viel kostet die Wohnung?",
      exampleSk: "Koľko stojí byt?",
      gender: null,
      srsId: "L06_V11",
      recycledFrom: []
    },
    {
      de: "wohnen",
      sk: "bývať",
      example: "Jana wohnt jetzt in Wien.",
      exampleSk: "Jana teraz býva vo Viedni.",
      gender: null,
      srsId: "L06_V12",
      recycledFrom: ["L04_V02"]
    },
    {
      de: "lernen",
      sk: "učiť sa",
      example: "Jana lernt jeden Tag Deutsch.",
      exampleSk: "Jana sa každý deň učí nemčinu.",
      gender: null,
      srsId: "L06_V13",
      recycledFrom: []
    },
    {
      de: "arbeiten",
      sk: "pracovať (⚠️ du arbeitest!)",
      example: "Ich arbeite in Wien. Du arbeitest auch hier?",
      exampleSk: "Pracujem vo Viedni. Ty tu tiež pracuješ?",
      gender: null,
      srsId: "L06_V14",
      recycledFrom: []
    },
    {
      de: "das Geld",
      sk: "peniaze",
      example: "Hast du genug Geld für die Wohnung?",
      exampleSk: "Máš dosť peňazí na byt?",
      gender: "N",
      srsId: "L06_V15",
      recycledFrom: []
    },
    {
      de: "der Euro",
      sk: "euro",
      example: "Die Miete ist 850 Euro.",
      exampleSk: "Nájomné je 850 eur.",
      gender: "M",
      srsId: "L06_V16",
      recycledFrom: []
    },
    {
      de: "der Cent",
      sk: "cent",
      example: "Das kostet 99 Cent.",
      exampleSk: "To stojí 99 centov.",
      gender: "M",
      srsId: "L06_V17",
      recycledFrom: []
    },
    {
      de: "die Wohnung",
      sk: "byt",
      example: "Die Wohnung ist klein, aber modern.",
      exampleSk: "Byt je malý, ale moderný.",
      gender: "F",
      srsId: "L06_V18",
      recycledFrom: []
    },
    {
      de: "der Supermarkt",
      sk: "supermarket",
      example: "Der Supermarkt ist um die Ecke.",
      exampleSk: "Supermarket je za rohom.",
      gender: "M",
      srsId: "L06_V19",
      recycledFrom: []
    },
    {
      de: "Wie viel kostet das?",
      sk: "Koľko to stojí?",
      example: "Wie viel kostet das pro Monat?",
      exampleSk: "Koľko to stojí za mesiac?",
      gender: null,
      srsId: "L06_V20",
      recycledFrom: []
    }
  ],

  exercises: [
    {
      type: "flashcard",
      instruction:
        "Precvičuj čísla 21–100 a nové slovesá. Flip kartu pre preklad. ⚠️ = upozornenie na výnimku.",
      items: [
        "einundzwanzig = dvadsaťjeden",
        "dreißig = tridsať (⚠️ s ß!)",
        "vierzig = štyridsa",
        "fünfzig = päťdesiat",
        "sechzig = šesťdesiat",
        "siebzig = sedemdesiat",
        "achtzig = osemdesiat",
        "neunzig = deväťdesiat",
        "hundert = sto",
        "kaufen = kúpiť",
        "kosten = stáť (cena)",
        "wohnen = bývať",
        "lernen = učiť sa",
        "arbeiten = pracovať (⚠️ du arbeitest!)",
        "das Geld = peniaze",
        "der Euro = euro",
        "der Cent = cent",
        "die Wohnung = byt",
        "der Supermarkt = supermarket",
        "Wie viel kostet das? = Koľko to stojí?"
      ]
    },
    {
      type: "mcq",
      instruction:
        "Herr Gruber ponúka Jane byt za 850 eur. Pomôž jej porozumieť číslam a slovesám.",
      questions: [
        {
          question: "Herr Gruber povie: 'Das sind achthundertfünfzig Euro.' Koľko to je?",
          options: [
            "800 eur",
            "850 eur",
            "815 eur",
            "580 eur"
          ],
          answer: 1,
          explanation:
            "achthundertfünfzig = acht (8) + hundert (100) + fünfzig (50) = 850. Čísla nad 100: základ + hundert + zvyšok. 800 = achthundert, 850 = achthundertfünfzig."
        },
        {
          question: "Jana sa pýta na cenu bytu. Ktorá otázka je správna?",
          options: [
            "Wie viel kostet die Wohnung?",
            "Wie viel kauft die Wohnung?",
            "Was kostet Sie die Wohnung?",
            "Wann kostet die Wohnung?"
          ],
          answer: 0,
          explanation:
            "'Wie viel kostet die Wohnung?' = Koľko stojí byt? 'kosten' = stáť (o cene). V2-pravidlo: wie viel(1) + kostet(2) + die Wohnung(3)."
        },
        {
          question: "Herr Gruber sa pýta Jany: 'Wo arbeiten Sie?' Čo Jana odpovie?",
          options: [
            "Ich arbeite bei einer Marketingfirma.",
            "Ich arbeitest bei einer Marketingfirma.",
            "Ich arbeitet bei einer Marketingfirma.",
            "Ich arbeiten bei einer Marketingfirma."
          ],
          answer: 0,
          explanation:
            "Pre 'ich' je správna prípona -e: ich arbeit-e. Vzor pravidelných slovies: ich -e, du -st, er -t, wir -en, ihr -t, sie -en."
        },
        {
          question: "Prečo sa povie 'du arbeiteSTt' a nie 'du arbeitst'?",
          options: [
            "Náhodná výnimka, treba si zapamätať",
            "Pretože kmeň 'arbeit' končí na -t — vkladá sa -e- pre ľahšiu výslovnosť",
            "Pretože 'du' vždy vyžaduje dlhšiu formu",
            "Pretože 'arbeiten' je nepravidelné sloveso"
          ],
          answer: 1,
          explanation:
            "Keď kmeň slovesa končí na -t alebo -d (arbeit-, red-, find-), vkladá sa -e- pred prípony -st a -t: du arbeit-E-st, er arbeit-E-t. Bez tohto -e- by bolo výslovnostne ťažké: *'arbeitst' je obtiažné vysloviť."
        },
        {
          question: "Koľko je 'fünfundsiebzig'?",
          options: ["57", "75", "65", "67"],
          answer: 1,
          explanation:
            "'fünfundsiebzig' = fünf (5) + und + siebzig (70) = 75. Pravidlo: jednotky (PRVÉ) + und + desiatky. Toto platí pre všetky čísla 21–99."
        },
        {
          question: "Jana chce povedať, koľko sa učí. Ktorá veta je správna?",
          options: [
            "Jana lernst jeden Tag Deutsch.",
            "Jana lernt jeden Tag Deutsch.",
            "Jana lernen jeden Tag Deutsch.",
            "Jana lerne jeden Tag Deutsch."
          ],
          answer: 1,
          explanation:
            "Jana = er/sie → prípona -t: lern-t. 'Jana lernt jeden Tag Deutsch.' = Jana sa každý deň učí nemčinu. Jana = 3. osoba jedn. čísla, ženský rod → sie/er/es → -t."
        }
      ]
    },
    {
      type: "fill",
      instruction:
        "Doplň správnu formu pravidelného slovesa. Jana a Herr Gruber rokujú o byte.",
      questions: [
        {
          sentence: "Ich ___ in einer Marketingfirma. (pracovať)",
          answer: "arbeite",
          hint: "ich + arbeiten — 1. osoba jedn. čísla",
          explanation:
            "'ich arbeite' — pravidelný vzor: kmeň arbeit- + prípona -e. Pozor: nie 'ich arbeitet' alebo 'ich arbeitest'."
        },
        {
          sentence: "Wie viel ___ die Wohnung pro Monat? (stáť)",
          answer: "kostet",
          hint: "die Wohnung = er/sie/es — 3. osoba kmeň kost- + ?",
          explanation:
            "'kostet' — kmeň kost- + prípona -t (3. osoba jedn. č.). Pozor: kost- nekončí na -t ani -d, takže nie je potrebné extra -e-."
        },
        {
          sentence: "Wir ___ jeden Monat dreißig Euro für den Supermarkt. (kúpiť)",
          answer: "kaufen",
          hint: "wir — 1. osoba množného čísla",
          explanation:
            "'wir kaufen' — prípona -en. Forma 'wir' je vždy rovnaká ako infinitív: kaufen, lernen, arbeiten, wohnen."
        },
        {
          sentence: "Du ___ sehr fleißig! (učiť sa)",
          answer: "lernst",
          hint: "du — 2. osoba jedn. čísla, kmeň lern-",
          explanation:
            "'du lernst' — kmeň lern- + prípona -st. Kmeň nekončí na -t/-d, takže bez extra -e-."
        },
        {
          sentence: "Die Miete ___ achthundertfünfzig Euro. (stáť/byť)",
          answer: "kostet",
          hint: "die Miete = sie (ona) — 3. osoba jedn. čísla",
          explanation:
            "'Die Miete kostet 850 Euro.' = Nájomné stojí 850 eur. 'die Miete' = nájomné, ženský rod."
        },
        {
          sentence: "Ich ___ jetzt in Wien, nicht in Bratislava. (bývať)",
          answer: "wohne",
          hint: "ich + wohnen — 1. osoba jedn. čísla",
          explanation:
            "'ich wohne' — kmeň wohn- + -e. Jana officially sa sťahuje do Viedne!"
        }
      ]
    },
    {
      type: "listen",
      instruction:
        "Počúvaj číslo alebo frázu a identifikuj správny ekvivalent.",
      questions: [
        { de: "dreißig", sk: "tridsať" },
        { de: "vierzig", sk: "štyridsa" },
        { de: "sechzig", sk: "šesťdesiat" },
        { de: "achtzig", sk: "osemdesiat" },
        { de: "hundert", sk: "sto" },
        { de: "Wie viel kostet das?", sk: "Koľko to stojí?" },
        { de: "achthundertfünfzig Euro", sk: "osemsto päťdesiat eur" },
        { de: "du arbeitest", sk: "ty pracuješ" }
      ]
    },
    {
      type: "match",
      instruction:
        "Spoj nemecké číslo alebo slovo s jeho slovenským prekladom.",
      pairs: [
        ["dreißig", "tridsať"],
        ["fünfzig", "päťdesiat"],
        ["siebzig", "sedemdesiat"],
        ["hundert", "sto"],
        ["kaufen", "kúpiť"],
        ["kosten", "stáť (cena)"],
        ["die Wohnung", "byt"],
        ["das Geld", "peniaze"]
      ]
    },
    {
      type: 'wordorder',
      instruction: 'Zoraď slová do správnej nemeckej vety.',
      sentences: [
        {
          words: ['Jana', 'wohnt', 'in', 'Wien', 'und', 'arbeitet', 'im', 'Büro.'],
          correct: 'Jana wohnt in Wien und arbeitet im Büro.',
          hint: 'Jana býva vo Viedni a pracuje v kancelárii.',
          explanation: 'Pravidelné slovesá wohnen (wohnt) a arbeiten (arbeitet). "und" spája dve vety s normálnym slovosledom.'
        },
        {
          words: ['Die', 'Miete', 'kostet', 'achthundert', 'Euro.'],
          correct: 'Die Miete kostet achthundert Euro.',
          hint: 'Nájomné stojí osemsto eur.',
          explanation: 'Die Miete = F rod, námetok. kostet = 3. osoba sg. od "kosten". Suma nasleduje bez skloňovania.'
        },
        {
          words: ['Wir', 'kaufen', 'Brot', 'und', 'Milch.'],
          correct: 'Wir kaufen Brot und Milch.',
          hint: 'Kupujeme chlieb a mlieko.',
          explanation: 'kaufen = pravidelné sloveso. 1. osoba mn. č.: wir kaufen — koncovka -en.'
        },
        {
          words: ['Ihr', 'bezahlt', 'fünfzig', 'Euro.'],
          correct: 'Ihr bezahlt fünfzig Euro.',
          hint: 'Vy platíte päťdesiat eur.',
          explanation: '2. osoba mn. č.: ihr + -t koncovka → bezahlt. Kmeň bezahl- + -t.'
        },
        {
          words: ['Er', 'fragt:', '"Wie', 'viel', 'kostet', 'das?"'],
          correct: 'Er fragt: "Wie viel kostet das?"',
          hint: 'On sa pýta: "Koľko to stojí?"',
          explanation: 'Vložená otázka citovaná priamo. fragt = 3. osoba od fragen.'
        }
      ]
    },
    {
      type: 'minitext',
      instruction: 'Prečítaj si krátky text o Jane. Potom odpovedaj na otázky.',
      text: 'Jana sucht eine Wohnung in Wien. Herr Gruber zeigt ihr eine Wohnung im 6. Bezirk. Die Wohnung kostet achthundertfünfzig Euro im Monat. Jana fragt: "Ist das zu viel?" Herr Gruber sagt: "Nein, das ist normal für Wien." Jana denkt: "Ich verdiene gut. Ich kann das bezahlen." Sie nimmt die Wohnung.',
      textSk: 'Jana hľadá byt vo Viedni. Pán Gruber jej ukáže byt v 6. obvode. Byt stojí osemsto päťdesiat eur mesačne. Jana sa pýta: "Je to príliš veľa?" Pán Gruber povie: "Nie, to je normálne pre Viedeň." Jana premýšľa: "Dobre zarábam. Viem to zaplatiť." Byt si vezme.',
      questions: [
        {
          question: 'Wie viel kostet die Wohnung im Monat?',
          questionSk: 'Koľko stojí byt mesačne?',
          options: ['Siebenhundert Euro', 'Achthundertfünfzig Euro', 'Neunhundert Euro', 'Tausend Euro'],
          answer: 1,
          explanation: 'Im Text: "Die Wohnung kostet achthundertfünfzig Euro im Monat."'
        },
        {
          question: 'In welchem Bezirk ist die Wohnung?',
          questionSk: 'V ktorom obvode je byt?',
          options: ['Im 4. Bezirk', 'Im 5. Bezirk', 'Im 6. Bezirk', 'Im 7. Bezirk'],
          answer: 2,
          explanation: 'Im Text: "eine Wohnung im 6. Bezirk"'
        },
        {
          question: 'Was macht Jana am Ende?',
          questionSk: 'Čo urobí Jana na záver?',
          options: ['Sie geht weg', 'Sie ruft jemand anderen an', 'Sie nimmt die Wohnung', 'Sie bittet um einen Rabatt'],
          answer: 2,
          explanation: 'Im Text: "Sie nimmt die Wohnung."'
        }
      ]
    },
    {
      type: 'speaking',
      instruction: 'Počúvaj nemeckú vetu. Potom hovor nahlas a skontroluj sa.',
      phrases: [
        { de: 'Wie viel kostet das?', sk: 'Koľko to stojí?', tip: 'viel: v=[f], ie=[í]' },
        { de: 'Das ist zu teuer.', sk: 'To je príliš drahé.', tip: 'teuer: eu=[oj], er=[ə]' },
        { de: 'Ich kaufe zwei Brötchen.', sk: 'Kúpim dve rožky.', tip: 'kaufe: au=[ao], f=[f]' },
        { de: 'Sie wohnt im sechsten Bezirk.', sk: 'Býva v šiestom obvode.', tip: 'Bezirk: B=[b], z=[ts]' },
        { de: 'dreiundzwanzig', sk: 'dvadsaťtri', tip: 'drei-und-zwan-zig — skladané v celku' }
      ]
    }
  ],

  reviewWords: ["L04_V02"],
  lessonNotes:
    "Kľúčové výnimky: dreißig (s ß, nie z), einundzwanzig (jedn. pred desiatkami). Slovesá na -t/-d kmeň: vkladať -e- pred -st a -t (arbeitest, arbeitet). Vzor pravidelných slovies: -e/-st/-t/-en/-t/-en. V tejto lekcii sa objavuje prvá recyklácia: 'wohnen' (L04_V02) → L06_V12."
};
