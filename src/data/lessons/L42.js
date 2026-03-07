export const lesson42 = {
  id: 42,
  week: 9,
  day: 2,
  title: "Was gibt es hier?",
  topic: "Použitie frázy *es gibt* + Akuzatív (V meste je...)",
  cefr: "A1",
  xpReward: 20,
  narrativeContext: "Jana schreibt ihrer Mutter. Sie mag ihr Viertel sehr und erzählt, was es dort gibt.",
  communicativeGoal: "Nach dieser Lektion kann ich sagen, was es in einem Ort gibt und was nicht.",
  skillFocus: [
    "vocabulary",
    "grammar",
    "speaking",
    "writing"
  ],
  lessonNotes: "V tejto lekcii sa naučíme, ako opísať, čo sa nachádza na nejakom mieste, pomocou frázy *es gibt*. Zistíme, ako použiť *es gibt* s Akuzatívom a ako vyjadriť negáciu pomocou *kein/keine* v Akuzatíve. Budeš vedieť hovoriť o tom, čo je vo tvojom okolí.",
  grammarNotes: [
    {
      rule: "es gibt + Akkusativ",
      explanation: "<p>Fráza <strong>„es gibt“</strong> sa v nemčine používa na vyjadrenie existencie, prítomnosti alebo dostupnosti niečoho, podobne ako slovenské „je“ alebo „sú“ (v zmysle „existuje/existujú“). Je dôležité si zapamätať, že „es gibt“ je vždy v tretej osobe jednotného čísla a nemení sa, bez ohľadu na to, či sa odkazuje na jednu vec alebo viacero vecí. Najdôležitejšie pravidlo je, že podstatné meno, ktoré nasleduje po „es gibt“, musí byť vždy v <strong>akuzatíve</strong>. To znamená, že členy (der, die, das) sa menia na akuzatívne tvary (den, die, das) a neurčité členy (ein, eine, ein) na (einen, eine, ein). Pri negácii sa používa „keinen/keine/kein“ tiež v akuzatíve.</p>",
      examples: [
        {
          de: "Es gibt einen Park in der Stadt.",
          sk: "V meste je park.",
          note: "Mužský rod, Akuzatív: einen Park"
        },
        {
          de: "Es gibt eine Bäckerei hier.",
          sk: "Je tu pekáreň.",
          note: "Ženský rod, Akuzatív: eine Bäckerei"
        },
        {
          de: "Es gibt ein Kino in der Nähe.",
          sk: "Blízko je kino.",
          note: "Stredný rod, Akuzatív: ein Kino"
        },
        {
          de: "Es gibt viele Geschäfte im Zentrum.",
          sk: "V centre je veľa obchodov.",
          note: "Množné číslo, bez člena"
        },
        {
          de: "Gibt es hier einen Supermarkt?",
          sk: "Je tu nejaký supermarket?",
          note: "Otázka, mužský rod, Akuzatív"
        },
        {
          de: "Nein, es gibt keinen Supermarkt hier.",
          sk: "Nie, nie je tu žiadny supermarket.",
          note: "Negácia, mužský rod, Akuzatív: keinen"
        },
        {
          de: "Gibt es eine Apotheke in der Nähe?",
          sk: "Je blízko lekáreň?",
          note: "Otázka, ženský rod, Akuzatív"
        },
        {
          de: "Es gibt keine Apotheke hier.",
          sk: "Nie je tu žiadna lekáreň.",
          note: "Negácia, ženský rod, Akuzatív: keine"
        }
      ],
      slovakContrastNote: "<p>V slovenčine používame na vyjadrenie existencie jednoducho sloveso „byť“ (je/sú) a podstatné meno zostáva v nominatíve. Napríklad povieme „V meste je park.“ (park je nominatív). V nemčine však musíme použiť „es gibt“ a podstatné meno, ktoré nasleduje, musí byť v akuzatíve. Toto je častý zdroj chýb pre slovenských študentov, preto si vždy pamätajte na akuzatív po „es gibt“.</p>"
    },
    {
      rule: "Akkusativ der Artikel",
      explanation: "<p>Pre správne použitie frázy „es gibt“ je nevyhnutné ovládať akuzatívne tvary určitých a neurčitých členov. V nemčine sa členy menia podľa pádu a rodu. V akuzatíve sa mení iba člen mužského rodu „der“ na „den“ a neurčitý člen „ein“ na „einen“. Ženský a stredný rod, ako aj množné číslo, si v akuzatíve zachovávajú rovnaké tvary ako v nominatíve.</p><table>  <thead>    <tr><th>Rod</th><th>Nominatív</th><th>Akkusativ</th></tr>  </thead>  <tbody>    <tr><td>Mužský</td><td>der / ein</td><td><strong>den / einen</strong></td></tr>    <tr><td>Ženský</td><td>die / eine</td><td>die / eine</td></tr>    <tr><td>Stredný</td><td>das / ein</td><td>das / ein</td></tr>    <tr><td>Množné</td><td>die / (keine)</td><td>die / (keine)</td></tr>  </tbody></table>",
      examples: [
        {
          de: "der Mann → den Mann",
          sk: "muž → muža"
        },
        {
          de: "ein Mann → einen Mann",
          sk: "muž → muža"
        },
        {
          de: "die Frau → die Frau",
          sk: "žena → ženu"
        },
        {
          de: "eine Frau → eine Frau",
          sk: "žena → ženu"
        },
        {
          de: "das Kind → das Kind",
          sk: "dieťa → dieťa"
        },
        {
          de: "ein Kind → ein Kind",
          sk: "dieťa → dieťa"
        },
        {
          de: "die Kinder → die Kinder",
          sk: "deti → deti"
        }
      ],
      slovakContrastNote: "<p>Slovenčina nemá členy, a preto je pre slovenských študentov dôležité si zapamätať, že v nemčine sa členy menia podľa pádu. Zatiaľ čo v slovenčine sa mení koncovka podstatného mena, v nemčine sa mení predovšetkým člen. Toto je kľúčový rozdiel, ktorý si vyžaduje pozornosť.</p>"
    }
  ],
  vocab: [
    {
      de: "das Krankenhaus",
      sk: "nemocnica",
      gender: "N",
      srsId: "L42_V01",
      example: "Gibt es ein Krankenhaus in der Stadt?",
      exampleSk: "Je v meste nemocnica?",
      recycledFrom: []
    },
    {
      de: "die Disco",
      sk: "diskotéka",
      gender: "F",
      srsId: "L42_V02",
      example: "Es gibt keine Disco in diesem Viertel.",
      exampleSk: "V tejto štvrti nie je žiadna diskotéka.",
      recycledFrom: []
    },
    {
      de: "die Apotheke",
      sk: "lekáreň",
      gender: "F",
      srsId: "L42_V03",
      example: "Ich brauche Medikamente. Gibt es eine Apotheke in der Nähe?",
      exampleSk: "Potrebujem lieky. Je nablízku lekáreň?",
      recycledFrom: []
    },
    {
      de: "das Hotel",
      sk: "hotel",
      gender: "N",
      srsId: "L42_V04",
      example: "Es gibt ein gutes Hotel im Zentrum.",
      exampleSk: "V centre je dobrý hotel.",
      recycledFrom: []
    },
    {
      de: "die Bibliothek",
      sk: "knižnica",
      gender: "F",
      srsId: "L42_V05",
      example: "Die Bibliothek ist sehr groß.",
      exampleSk: "Knižnica je veľmi veľká.",
      recycledFrom: []
    },
    {
      de: "der Spielplatz",
      sk: "ihrisko",
      gender: "M",
      srsId: "L42_V06",
      example: "Für die Kinder gibt es einen Spielplatz.",
      exampleSk: "Pre deti je tu ihrisko.",
      recycledFrom: []
    },
    {
      de: "der See",
      sk: "jazero",
      gender: "M",
      srsId: "L42_V07",
      example: "Wir sind zum See gefahren.",
      exampleSk: "Išli sme k jazeru.",
      recycledFrom: []
    },
    {
      de: "der Fluss",
      sk: "rieka",
      gender: "M",
      srsId: "L42_V08",
      example: "Der Fluss ist sehr lang.",
      exampleSk: "Rieka je veľmi dlhá.",
      recycledFrom: []
    },
    {
      de: "der Wald",
      sk: "les",
      gender: "M",
      srsId: "L42_V09",
      example: "Ich gehe gern in den Wald.",
      exampleSk: "Rád chodím do lesa.",
      recycledFrom: []
    },
    {
      de: "das Schwimmbad",
      sk: "plaváreň, kúpalisko",
      gender: "N",
      srsId: "L42_V10",
      example: "Am Wochenende war ich im Schwimmbad.",
      exampleSk: "Cez víkend som bol na kúpalisku.",
      recycledFrom: []
    },
    {
      de: "das Rathaus",
      sk: "radnica",
      gender: "N",
      srsId: "L42_V11",
      example: "Das Rathaus ist ein altes Gebäude.",
      exampleSk: "Radnica je stará budova.",
      recycledFrom: []
    },
    {
      de: "die Polizei",
      sk: "polícia",
      gender: "F",
      srsId: "L42_V12",
      example: "Wo ist die Polizei?",
      exampleSk: "Kde je polícia?",
      recycledFrom: []
    },
    {
      de: "das Theater",
      sk: "divadlo",
      gender: "N",
      srsId: "L42_V13",
      example: "Wir haben ein Stück im Theater gesehen.",
      exampleSk: "Videli sme hru v divadle.",
      recycledFrom: []
    },
    {
      de: "der Garten",
      sk: "záhrada",
      gender: "M",
      srsId: "L42_V14",
      example: "Unser Haus hat einen schönen Garten.",
      exampleSk: "Náš dom má krásnu záhradu.",
      recycledFrom: []
    },
    {
      de: "die Ecke",
      sk: "roh",
      gender: "F",
      srsId: "L42_V15",
      example: "Der Laden ist um die Ecke.",
      exampleSk: "Obchod je za rohom.",
      recycledFrom: []
    },
    {
      de: "die Nähe",
      sk: "blízkosť",
      gender: "F",
      srsId: "L42_V16",
      example: "Es gibt einen Arzt in der Nähe.",
      exampleSk: "Nablízku je lekár.",
      recycledFrom: []
    },
    {
      de: "geben",
      sk: "dať",
      gender: null,
      srsId: "L42_V17",
      example: "Kannst du mir bitte das Buch geben?",
      exampleSk: "Môžeš mi, prosím, dať tú knihu?",
      recycledFrom: []
    },
    {
      de: "brauchen",
      sk: "potrebovať",
      gender: null,
      srsId: "L42_V18",
      example: "Ich brauche einen Stift.",
      exampleSk: "Potrebujem pero.",
      recycledFrom: []
    },
    {
      de: "helfen",
      sk: "pomôcť",
      gender: null,
      srsId: "L42_V19",
      example: "Kannst du mir bitte helfen?",
      exampleSk: "Môžeš mi, prosím, pomôcť?",
      recycledFrom: []
    },
    {
      de: "um die Ecke",
      sk: "za rohom",
      gender: null,
      srsId: "L42_V20",
      example: "Der Laden ist um die Ecke.",
      exampleSk: "Obchod je za rohom.",
      recycledFrom: []
    },
    {
      de: "in der Nähe",
      sk: "blízko, nablízku",
      gender: null,
      srsId: "L42_V21",
      example: "Es gibt ein Hotel in der Nähe.",
      exampleSk: "Nablízku je hotel.",
      recycledFrom: []
    },
    {
      de: "sehr gut",
      sk: "veľmi dobre",
      gender: null,
      srsId: "L42_V22",
      example: "Das Essen war sehr gut.",
      exampleSk: "Jedlo bolo veľmi dobré.",
      recycledFrom: []
    },
    {
      de: "es gibt",
      sk: "je, existuje (niečo)",
      gender: null,
      srsId: "L42_V23",
      example: "In meiner Stadt gibt es viele Läden.",
      exampleSk: "V mojom meste je veľa obchodov.",
      recycledFrom: []
    },
    {
      de: "kein",
      sk: "žiaden (pre Akuzatív Maskulín/Neutrum)",
      gender: null,
      srsId: "L42_V24",
      example: "Ich habe kein Auto.",
      exampleSk: "Nemám žiadne auto.",
      recycledFrom: []
    },
    {
      de: "keine",
      sk: "žiadna/žiadne (pre Akuzatív Feminin/Plurál)",
      gender: null,
      srsId: "L42_V25",
      example: "Es gibt keine Disco in diesem Viertel.",
      exampleSk: "V tejto štvrti nie je žiadna diskotéka.",
      recycledFrom: []
    }
  ],
  exercises: [
    {
      type: "flashcard",
      instruction: "Prezri si slovíčka tejto lekcie. Klikni na kartičku pre preklad."
    },
    {
      type: "match",
      instruction: "Priraď nemecké slová k ich slovenským prekladom.",
      pairs: [
        [
          "das Krankenhaus",
          "nemocnica"
        ],
        [
          "die Disco",
          "diskotéka"
        ],
        [
          "die Apotheke",
          "lekáreň"
        ],
        [
          "das Hotel",
          "hotel"
        ],
        [
          "die Bibliothek",
          "knižnica"
        ],
        [
          "der Spielplatz",
          "ihrisko"
        ],
        [
          "der See",
          "jazero"
        ],
        [
          "der Fluss",
          "rieka"
        ],
        [
          "der Wald",
          "les"
        ],
        [
          "das Schwimmbad",
          "plaváreň, kúpalisko"
        ]
      ]
    },
    {
      type: "wordorder",
      instruction: "Usporiadaj slová tak, aby si vytvoril správne nemecké vety. Dávaj pozor na „es gibt“ a Akuzatív.",
      sentences: [
        {
          words: [
            "einen",
            "gibt",
            "Es",
            "Spielplatz",
            "hier"
          ],
          correct: "Es gibt einen Spielplatz hier",
          hint: "Je tu ihrisko.",
          explanation: "Fráza 'es gibt' sa vždy spája s Akuzatívom. 'Spielplatz' je mužského rodu (der Spielplatz), preto v Akuzatíve mení neurčitý člen na 'einen'."
        },
        {
          words: [
            "keine",
            "gibt",
            "Es",
            "Disco",
            "in",
            "der",
            "Stadt"
          ],
          correct: "Es gibt keine Disco in der Stadt",
          hint: "V meste nie je žiadna diskotéka.",
          explanation: "Pre negáciu s 'es gibt' používame 'kein/keine'. 'Disco' je ženského rodu (die Disco), preto v Akuzatíve zostáva 'keine'."
        },
        {
          words: [
            "ein",
            "Theater",
            "es",
            "Gibt",
            "hier"
          ],
          correct: "Gibt es hier ein Theater",
          hint: "Je tu divadlo?",
          explanation: "V otázke s 'es gibt' ide sloveso 'geben' na prvé miesto. 'Theater' je stredného rodu (das Theater), preto v Akuzatíve zostáva neurčitý člen 'ein'."
        },
        {
          words: [
            "viele",
            "gibt",
            "In",
            "der",
            "Nähe",
            "Hotels",
            "es"
          ],
          correct: "In der Nähe gibt es viele Hotels",
          hint: "Nablízku je veľa hotelov.",
          explanation: "Ak začíname vetu s príslovkovým určením miesta ('In der Nähe'), sloveso 'gibt' ide na druhé miesto a 'es' nasleduje hneď po ňom. 'Hotels' je plurál, preto používame 'viele'."
        },
        {
          words: [
            "Krankenhaus",
            "es",
            "gibt",
            "kein",
            "hier",
            "Ich",
            "brauche",
            "Hilfe",
            "aber"
          ],
          correct: "Ich brauche Hilfe, aber es gibt kein Krankenhaus hier",
          hint: "Potrebujem pomoc, ale tu nie je žiadna nemocnica.",
          explanation: "Spojenie dvoch viet pomocou 'aber'. V druhej vete 'es gibt' vyžaduje Akuzatív. 'Krankenhaus' je stredného rodu (das Krankenhaus), preto negácia je 'kein'."
        }
      ]
    },
    {
      type: "fill",
      instruction: "Doplň správne slovo alebo člen do medzery. Dávaj pozor na „es gibt“ a Akuzatív.",
      questions: [
        {
          sentence: "Es ___ einen großen Wald hier.",
          answer: "gibt",
          hint: "Je tu veľký les.",
          explanation: "Fráza 'es gibt' (je/existuje) sa používa na vyjadrenie existencie niečoho. Sloveso 'geben' sa pre 'es' časuje ako 'gibt'."
        },
        {
          sentence: "In der Stadt gibt es ___ Kino.",
          answer: "ein",
          hint: "V meste je kino.",
          explanation: "'Kino' je stredného rodu (das Kino). V Akuzatíve pre stredný rod je neurčitý člen 'ein'."
        },
        {
          sentence: "Gibt es hier ___ Apotheke?",
          answer: "eine",
          hint: "Je tu lekáreň?",
          explanation: "'Apotheke' je ženského rodu (die Apotheke). V Akuzatíve pre ženský rod je neurčitý člen 'eine'."
        },
        {
          sentence: "Es gibt ___ Hotels in diesem Dorf.",
          answer: "keine",
          hint: "V tejto dedine nie sú žiadne hotely.",
          explanation: "'Hotels' je plurál. Pre negáciu plurálu v Akuzatíve používame 'keine'."
        },
        {
          sentence: "Ich ___ gestern ins Kino gegangen.",
          answer: "bin",
          hint: "Včera som išiel do kina.",
          explanation: "Pre slovesá pohybu ako 'gehen' sa Perfekt tvorí s pomocným slovesom 'sein'. 'Ich' sa časuje ako 'bin'."
        },
        {
          sentence: "Wir ___ ein neues Auto gekauft.",
          answer: "haben",
          hint: "Kúpili sme si nové auto.",
          explanation: "Pre väčšinu slovies sa Perfekt tvorí s pomocným slovesom 'haben'. 'Wir' sa časuje ako 'haben'."
        },
        {
          sentence: "Wo ___ du gestern Abend?",
          answer: "warst",
          hint: "Kde si bol včera večer?",
          explanation: "Pre minulosť slovesa 'sein' (byť) používame Präteritum 'war/warst/war...'. Pre 'du' je to 'warst'."
        },
        {
          sentence: "Ich ___ leider nicht kommen.",
          answer: "kann",
          hint: "Bohužiaľ nemôžem prísť.",
          explanation: "Modalné sloveso 'können' (môcť) sa časuje pre 'ich' ako 'kann'. Infinitív 'kommen' ide na koniec vety."
        }
      ]
    },
    {
      type: "listen",
      instruction: "Vypočuj si slovo alebo frázu a priraď k nej správny slovenský preklad.",
      questions: [
        {
          de: "das Krankenhaus",
          sk: "nemocnica"
        },
        {
          de: "die Disco",
          sk: "diskotéka"
        },
        {
          de: "die Apotheke",
          sk: "lekáreň"
        },
        {
          de: "der Spielplatz",
          sk: "ihrisko"
        },
        {
          de: "der Fluss",
          sk: "rieka"
        },
        {
          de: "das Rathaus",
          sk: "radnica"
        },
        {
          de: "um die Ecke",
          sk: "za rohom"
        },
        {
          de: "in der Nähe",
          sk: "blízko, nablízku"
        },
        {
          de: "es gibt",
          sk: "je, existuje (niečo)"
        },
        {
          de: "sehr gut",
          sk: "veľmi dobre"
        }
      ]
    },
    {
      type: "mcq",
      instruction: "Vyber správnu odpoveď.",
      questions: [
        {
          question: "Vyber správny člen pre vetu: 'Es gibt ___ Supermarkt hier.'",
          options: [
            "ein",
            "eine",
            "einen",
            "kein"
          ],
          answer: 2,
          explanation: "'Supermarkt' je mužského rodu (der Supermarkt). V Akuzatíve sa člen 'der' mení na 'den', a neurčitý člen 'ein' na 'einen'."
        },
        {
          question: "Ktorá veta je správna?",
          options: [
            "Es gibt eine Bibliothek.",
            "Es gibt ein Bibliothek.",
            "Es gibt einen Bibliothek.",
            "Es gibt keine Bibliothekens."
          ],
          answer: 0,
          explanation: "'Bibliothek' je ženského rodu (die Bibliothek). V Akuzatíve je neurčitý člen 'eine'. Posledná možnosť má nesprávny plurál a člen."
        },
        {
          question: "Doplň správne slovo: 'In dieser Stadt ___ es kein Theater.'",
          options: [
            "ist",
            "hat",
            "gibt",
            "sein"
          ],
          answer: 2,
          explanation: "Na vyjadrenie existencie niečoho sa v nemčine používa fráza 'es gibt' (je/existuje)."
        },
        {
          question: "Ako povieš 'nemocnica' po nemecky?",
          options: [
            "die Apotheke",
            "das Rathaus",
            "das Krankenhaus",
            "die Polizei"
          ],
          answer: 2,
          explanation: "Slovenské slovo 'nemocnica' sa prekladá ako 'das Krankenhaus'."
        },
        {
          question: "Čo znamená fráza 'um die Ecke'?",
          options: [
            "v blízkosti",
            "za rohom",
            "na rohu",
            "ďaleko"
          ],
          answer: 1,
          explanation: "Fráza 'um die Ecke' znamená 'za rohom'."
        },
        {
          question: "Vyber správnu formu Perfektu: 'Wir ___ gestern Pizza gegessen.'",
          options: [
            "sind",
            "haben",
            "waren",
            "hatten"
          ],
          answer: 1,
          explanation: "Pre sloveso 'essen' (jesť) sa Perfekt tvorí s pomocným slovesom 'haben'. 'Wir' sa časuje ako 'haben'."
        },
        {
          question: "Ktorá veta je správne v Präteritum? 'Ich ___ müde.'",
          options: [
            "bin",
            "war",
            "habe",
            "hatte"
          ],
          answer: 1,
          explanation: "Pre minulosť slovesa 'sein' (byť) v Präteritum sa pre 'ich' používa forma 'war'."
        },
        {
          question: "Doplň správne modalné sloveso: '___ du mir bitte helfen?'",
          options: [
            "Willst",
            "Musst",
            "Kannst",
            "Sollst"
          ],
          answer: 2,
          explanation: "Na vyjadrenie schopnosti alebo možnosti pomôcť sa používa modalné sloveso 'können'. Pre 'du' je to 'kannst'."
        }
      ]
    },
    {
      type: "minitext",
      instruction: "Lies den Dialog und beantworte die Fragen.",
      text: "Jana: Liebe Mama, ich mag meine neue Wohnung sehr.\nJana: Es gibt eine Bäckerei um die Ecke und auch eine Apotheke.\nJana: In der Nähe gibt es einen großen Park mit einem Spielplatz. Für Kinder ist das super.\nJana: Und es gibt keine Disco hier – sehr gut! Ich brauche Ruhe.\nMama: Hallo Jana! Das klingt schön. Gibt es auch ein Krankenhaus in der Nähe?\nJana: Ja, Mama, es gibt ein Krankenhaus, aber nicht direkt um die Ecke. Es gibt aber kein Hotel.\nJana: Aber es gibt auch eine Bibliothek und ein kleines Theater. Und ein Schwimmbad gibt es auch! Das finde ich toll!",
      textSk: "Jana: Milá mama, veľmi sa mi páči môj nový byt.\nJana: Za rohom je pekáreň a tiež lekáreň.\nJana: Nablízku je veľký park s ihriskom. Pre deti je to super.\nJana: A nie je tu žiadna diskotéka – veľmi dobre! Potrebujem pokoj.\nMama: Ahoj Jana! To znie pekne. Je nablízku aj nemocnica?\nJana: Áno, mama, je tu nemocnica, ale nie priamo za rohom. Nie je tu však žiadny hotel.\nJana: Ale je tu aj knižnica a malé divadlo. A je tu aj plaváreň! To sa mi páči!",
      questions: [
        {
          question: "Was gibt es um die Ecke?",
          options: [
            "Eine Bäckerei und eine Disco.",
            "Eine Bäckerei und eine Apotheke.",
            "Ein Krankenhaus und ein Hotel.",
            "Eine Bibliothek und ein Theater."
          ],
          answer: 1,
          explanation: "Jana sagt: \"Es gibt eine Bäckerei um die Ecke und auch eine Apotheke.\""
        },
        {
          question: "Was mag Jana an ihrer Umgebung?",
          options: [
            "Es gibt keine Bäckerei.",
            "Es gibt keine Disco.",
            "Es gibt ein Hotel.",
            "Es gibt kein Theater."
          ],
          answer: 1,
          explanation: "Jana sagt: \"Und es gibt keine Disco hier – sehr gut! Ich brauche Ruhe.\""
        },
        {
          question: "Was fragt Janas Mutter?",
          options: [
            "Ob es einen Park gibt.",
            "Ob es eine Apotheke gibt.",
            "Ob es ein Krankenhaus gibt.",
            "Ob es ein Schwimmbad gibt."
          ],
          answer: 2,
          explanation: "Mamas Frage ist: \"Gibt es auch ein Krankenhaus in der Nähe?\""
        },
        {
          question: "Was gibt es in Janas Nähe für Kinder?",
          options: [
            "Eine Bibliothek.",
            "Ein Spielplatz.",
            "Ein Theater.",
            "Ein Hotel."
          ],
          answer: 1,
          explanation: "Jana sagt: \"In der Nähe gibt es einen großen Park mit einem Spielplatz. Für Kinder ist das super.\""
        }
      ]
    },
    {
      type: "speaking",
      instruction: "Höre zu und sprich nach.",
      phrases: [
        {
          de: "geben",
          sk: "dať",
          tip: "[g] na začiatku, dlhé [e:]"
        },
        {
          de: "brauchen",
          sk: "potrebovať",
          tip: "[au] ako \"au\", [ch] ako \"ach\""
        },
        {
          de: "Es gibt",
          sk: "Je, existuje",
          tip: "[s] v \"es\" ako [z], [g] na začiatku \"gibt\""
        },
        {
          de: "einen Spielplatz",
          sk: "ihrisko (v akuzatíve)",
          tip: "[ei] ako \"aj\", [sp] na začiatku ako [šp]"
        },
        {
          de: "eine Apotheke",
          sk: "lekáreň (v akuzatíve)",
          tip: "[ei] ako \"aj\", [th] v \"Apotheke\" ako [t]"
        },
        {
          de: "kein Krankenhaus",
          sk: "žiadna nemocnica",
          tip: "[ei] ako \"aj\", [h] v \"Krankenhaus\" je počuteľné"
        },
        {
          de: "Es gibt einen Wald in der Nähe.",
          sk: "Nablízku je les.",
          tip: "[W] ako [v], [d] na konci ako [t], [nɛːə] (dlhé 'e')"
        },
        {
          de: "Wir brauchen kein Hotel.",
          sk: "Nepotrebujeme žiadny hotel.",
          tip: "[W] ako [v], [au] ako \"au\", [ei] ako \"aj\""
        }
      ]
    },
    {
      type: "truefalse",
      instruction: "Prečítajte si vety a rozhodnite, či sú pravdivé (Wahr) alebo nepravdivé (Falsch).",
      statements: [
        {
          statement: "In vielen Städten gibt es ein Krankenhaus.",
          isTrue: true,
          explanation: "Áno, vo väčšine miest nájdete nemocnicu. Fráza 'es gibt' sa používa s akuzatívom, 'ein Krankenhaus' je akuzatív neutra."
        },
        {
          statement: "Es gibt keinen Wald in Deutschland.",
          isTrue: false,
          explanation: "Nie, to nie je pravda. V Nemecku je veľa lesov. 'Keinen Wald' je správny akuzatív mužského rodu pre negáciu."
        },
        {
          statement: "Gibt es eine Bibliothek in jedem Dorf?",
          isTrue: false,
          explanation: "Nie, nie v každej dedine je knižnica. 'Eine Bibliothek' je akuzatív ženského rodu."
        },
        {
          statement: "In der Nähe gibt es einen Spielplatz für Kinder.",
          isTrue: true,
          explanation: "Áno, je bežné, že blízko sú detské ihriská. 'Einen Spielplatz' je akuzatív mužského rodu."
        },
        {
          statement: "Es gibt keine Apotheke um die Ecke, wenn du Medikamente brauchst.",
          isTrue: false,
          explanation: "Nie, to by nebolo praktické. Ak potrebuješ lieky, zvyčajne je lekáreň niekde nablízku. 'Keine Apotheke' je akuzatív ženského rodu pre negáciu."
        }
      ]
    },
    {
      type: "dictation",
      instruction: "Počúvajte a napíšte, čo počujete. Potom si skontrolujte odpoveď.",
      sentences: [
        {
          de: "Es gibt ein Hotel.",
          sk: "Je tu hotel."
        },
        {
          de: "Es gibt eine Apotheke.",
          sk: "Je tu lekáreň."
        },
        {
          de: "Es gibt keinen Wald hier.",
          sk: "Nie je tu žiadny les."
        },
        {
          de: "Gibt es einen Spielplatz?",
          sk: "Je tu ihrisko?"
        },
        {
          de: "Es gibt keine Bibliothek in der Nähe.",
          sk: "V blízkosti nie je žiadna knižnica."
        }
      ]
    },
    {
      type: "categorysort",
      instruction: "Roztrieďte slová do kategórií podľa ich rodu (člena).",
      categories: [
        {
          name: "der (Maskulín)",
          color: "blue",
          words: [
            "der Spielplatz",
            "der See",
            "der Wald",
            "der Garten"
          ]
        },
        {
          name: "die (Feminin)",
          color: "rose",
          words: [
            "die Disco",
            "die Apotheke",
            "die Bibliothek",
            "die Polizei"
          ]
        },
        {
          name: "das (Neutrum)",
          color: "green",
          words: [
            "das Krankenhaus",
            "das Hotel",
            "das Schwimmbad",
            "das Theater"
          ]
        }
      ],
      explanation: "V nemčine majú podstatné mená rod (mužský, ženský, stredný), ktorý je určený členom (der, die, das). Pre správne použitie frázy 'es gibt' je dôležité poznať rod, pretože v akuzatíve sa mení člen 'der' na 'den' (alebo 'ein' na 'einen', 'kein' na 'keinen'). Členy 'die' a 'das' zostávajú v akuzatíve nezmenené."
    },
    {
      type: "translation",
      instruction: "Preložte nasledujúce vety zo slovenčiny do nemčiny. Použite frázu „es gibt“.",
      sentences: [
        {
          sk: "V meste je nemocnica.",
          answer: "In der Stadt gibt es ein Krankenhaus.",
          hint: "Krankenhaus, Stadt",
          explanation: "Nemocnica (das Krankenhaus) je stredného rodu, preto v akuzatíve používame 'ein'. 'In der Stadt' je lokácia."
        },
        {
          sk: "Je tu blízko lekáreň?",
          answer: "Gibt es hier in der Nähe eine Apotheke?",
          hint: "Apotheke, Nähe",
          explanation: "Lekáreň (die Apotheke) je ženského rodu, preto v akuzatíve používame 'eine'. Otázka sa tvorí zmenou slovosledu."
        },
        {
          sk: "V lese nie je žiadna diskotéka.",
          answer: "Im Wald gibt es keine Disco.",
          hint: "Wald, Disco, keine",
          explanation: "Diskotéka (die Disco) je ženského rodu, preto pre negáciu v akuzatíve používame 'keine'. 'Im Wald' je skratka pre 'in dem Wald'."
        },
        {
          sk: "Potrebujem pomoc, ale nie je tu žiadna polícia.",
          answer: "Ich brauche Hilfe, aber es gibt hier keine Polizei.",
          hint: "brauchen, Hilfe, Polizei",
          explanation: "Polícia (die Polizei) je ženského rodu, preto pre negáciu v akuzatíve používame 'keine'. Sloveso 'brauchen' vyžaduje akuzatív."
        }
      ]
    },
    {
      type: "conjugation",
      instruction: "Doplňte správne tvary slovies v prítomnom čase (Präsens).",
      verbs: [
        {
          infinitive: "geben",
          translation: "dať",
          forms: [
            {
              pronoun: "ich",
              correct: "gebe"
            },
            {
              pronoun: "du",
              correct: "gibst"
            },
            {
              pronoun: "er/sie/es",
              correct: "gibt"
            },
            {
              pronoun: "wir",
              correct: "geben"
            },
            {
              pronoun: "ihr",
              correct: "gebt"
            },
            {
              pronoun: "sie/Sie",
              correct: "geben"
            }
          ],
          note: "Sloveso 'geben' je nepravidelné (silné sloveso). Pri 'du' a 'er/sie/es' dochádza k zmene kmeňovej samohlásky 'e' na 'i'."
        },
        {
          infinitive: "brauchen",
          translation: "potrebovať",
          forms: [
            {
              pronoun: "ich",
              correct: "brauche"
            },
            {
              pronoun: "du",
              correct: "brauchst"
            },
            {
              pronoun: "er/sie/es",
              correct: "braucht"
            },
            {
              pronoun: "wir",
              correct: "brauchen"
            },
            {
              pronoun: "ihr",
              correct: "braucht"
            },
            {
              pronoun: "sie/Sie",
              correct: "brauchen"
            }
          ],
          note: "Sloveso 'brauchen' je pravidelné (slabé sloveso), takže sa časuje podľa štandardných pravidiel pre pravidelné slovesá v prítomnom čase."
        }
      ]
    }
  ],
  reviewWords: []
};
