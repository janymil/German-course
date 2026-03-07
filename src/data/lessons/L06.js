export const lesson06 = {
  id: 6,
  week: 2,
  day: 1,
  title: "Ein Formular ausfüllen",
  topic: "Osobné údaje, rodinný stav a bydlisko",
  cefr: "A1",
  xpReward: 20,
  narrativeContext: "Jana ist in der Volkshochschule (VHS). Sie braucht eine Studentenkarte. Ein Mitarbeiter fragt: Wie heißen Sie? Wo wohnen Sie?",
  communicativeGoal: "Nach dieser Lektion kann ich über meine persönlichen Daten sprechen, zum Beispiel wo ich wohne und was mein Familienstand ist.",
  skillFocus: [
    "vocabulary",
    "grammar",
    "reading",
    "writing",
    "speaking",
    "listening"
  ],
  lessonNotes: "V tejto lekcii sa naučíš poskytovať základné osobné údaje. Precvičíš si slovnú zásobu týkajúcu sa bydliska a rodinného stavu, napríklad 'ledig' alebo 'verheiratet'. Pochopíš rozdiel medzi slovesami 'wohnen' (bývať na konkrétnej adrese) a 'leben' (žiť v meste alebo krajine).",
  grammarNotes: [
    {
      rule: "Jazyková matematika: Časovanie slovies ako stavebnica",
      explanation: `<p>Mnoho študentov sa bojí nemeckého časovania, no v skutočnosti je to ako Lego. Máte pevnú kocku (kmeň slova) a na ňu iba pripájate inofarebnú čiapočku (koncovku) podľa toho, KTO tú činnosť robí.</p>
<p>Zoberme si sloveso <strong>wohnen</strong> (bývať). Odtrhnite mu chvost <strong>„-en"</strong>. Zostane vám holý kmeň <strong>„wohn-"</strong>. A teraz pripájame čiapočky:</p>
<table class='grammar-table'><thead><tr><th>Kto? (Osoba)</th><th>Čiapočka (Koncovka)</th><th>Výsledok</th></tr></thead><tbody>
<tr><td><strong>ich</strong> (ja)</td><td><strong>-e</strong></td><td>ich wohn<strong>e</strong></td></tr>
<tr><td><strong>du</strong> (ty)</td><td><strong>-st</strong></td><td>du wohn<strong>st</strong></td></tr>
<tr><td><strong>er / sie / es</strong> (on/ona/ono)</td><td><strong>-t</strong></td><td>er / sie wohn<strong>t</strong></td></tr>
</tbody></table>
<div class='tip-box'>💡 <strong>Tip Profesora:</strong> Žiť vs. Bývať. V nemčine striktne rozlišujeme: <em>wohnen</em> používajte pre konkrétnu adresu, byt či dom („Ich wohne in der Goethestraße"). <em>leben</em> použite pre širší kontext bytia, mesta či štátu („Ich lebe in Deutschland").</div>`,
      examples: [
        { de: "Ich wohne in Bratislava.", sk: "Bývam v Bratislave." },
        { de: "Wo lebst du?", sk: "Kde žiješ?" },
        { de: "Er wohnt in einem Haus.", sk: "On býva v dome." }
      ],
      slovakContrastNote: "Slovenčina vie skryť osobu do slovesa („Bývam v Berlíne“). Nemčina to netoleruje. Osoba MUSÍ byť vždy na scéne ako reflektorom nasvietená hviezda: „ICH wohne in Berlin.“"
    },
    {
      rule: "Geografické predložky a VIP klub krajín",
      explanation: `<p>Predložky <strong>in</strong> a <strong>aus</strong> sú vaše základné navigačné nástroje.</p>
<ul>
<li>Na otázku <strong>Wo?</strong> (Kde sa nachádzam?) použijete <strong>in</strong>.</li>
<li>Na otázku <strong>Woher?</strong> (Odkiaľ prúdim/pochádzam?) použijete <strong>aus</strong>.</li>
</ul>
<h4> VIP Krajiny s členom zasahujú</h4>
<p>Z predchádzajúcich lekcií už vieme, že Slovensko (die Slowakei) či Švajčiarsko (die Schweiz) sú VIP krajiny, ktoré majú svoj vlastný člen. Pri otázke „Odkiaľ? (aus)“ sa menili na <em>„aus der Slowakei“</em>. Hádajte čo? Pri otázke „Kde? (in)“ to robia presne rovnako!</p>
<ul>
<li>Ich komme <strong>aus der</strong> Slowakei. (Odkiaľ?)</li>
<li>Ich lebe <strong>in der</strong> Slowakei. (Kde?)</li>
</ul>`,
      examples: [
        { de: "Ich komme aus der Slowakei.", sk: "Pochádzam zo Slovenska." },
        { de: "Ich lebe in Österreich.", sk: "Žijem v Rakúsku.", note: "Obyčajná krajina bez člena." },
        { de: "Wohnst du in der Schweiz?", sk: "Bývaš vo Švajčiarsku?", note: "VIP krajina vyžaduje 'in der'." }
      ],
      slovakContrastNote: "Pre Slováka je inštinktívne povedať len „v Nemecku“ alebo „na Slovensku“ bez špeciálnych členov pred krajinami. V nemčine musíte svoj mozog trénovať: akonáhle hovoríte o Slovensku, Švajčiarsku alebo Turecku, ťaháte so sebou aj ich člen."
    },
    {
      rule: "Rodinný stav v nemčine nemá pohlavie",
      explanation: `<p>Keď vyplňujete formuláre (Formulare ausfüllen), narazíte na políčko <strong>Familienstand</strong> (rodinný stav). Tu prichádza pre Slovákov obrovská úľava.</p>
<p>Nemčina pri týchto slovíčkach absolútne ignoruje, či ste muž alebo žena. Prídavné meno sa nemení. Je pevné ako skala.</p>
<ul>
<li>On je <strong>ledig</strong>. (Slobodný)</li>
<li>Ona je <strong>ledig</strong>. (Slobodná)</li>
<li>On je <strong>verheiratet</strong>. (Ženatý)</li>
<li>Ona je <strong>verheiratet</strong>. (Vydatá)</li>
</ul>
<div class='warn-box'>⚠️ <strong>Trestný bod u Profesora:</strong> Nesnažte sa na koniec týchto slov nalepiť žiadne „-e“ len preto, že hovoríte o žene. Žiadne „Sie ist ledige“. Proste iba čisté: Sie ist ledig.</div>`,
      examples: [
        { de: "Bist du verheiratet?", sk: "Si ženatý/vydatá?" },
        { de: "Nein, ich bin geschieden.", sk: "Nie, som rozvedený/rozvedená." },
        { de: "Er ist noch ledig.", sk: "On je ešte slobodný." }
      ],
      slovakContrastNote: "V slovenčine musíte neustále prispôsobovať koncovky rodu (ženatý / vydatá / rozvedený / rozvedená). V nemčine sa naučíte jedno slovo a pálite ho na všetky strany bez zmeny."
    }
  ],
  vocab: [
    {
      de: "der Nachname",
      sk: "priezvisko",
      gender: "M",
      srsId: "L06_V01",
      example: "Mein Nachname ist Kováčová.",
      exampleSk: "Moje priezvisko je Kováčová.",
      recycledFrom: []
    },
    {
      de: "der Vorname",
      sk: "krstné meno",
      gender: "M",
      srsId: "L06_V02",
      example: "Mein Vorname ist Jana.",
      exampleSk: "Moje krstné meno je Jana.",
      recycledFrom: []
    },
    {
      de: "die Adresse",
      sk: "adresa",
      gender: "F",
      srsId: "L06_V03",
      example: "Hier schreiben Sie bitte die Adresse.",
      exampleSk: "Sem napíšte, prosím, adresu.",
      recycledFrom: []
    },
    {
      de: "die Straße",
      sk: "ulica",
      gender: "F",
      srsId: "L06_V04",
      example: "Ich wohne in der Mariahilfer Straße.",
      exampleSk: "Bývam na Mariahilfer Straße.",
      recycledFrom: []
    },
    {
      de: "die Hausnummer",
      sk: "číslo domu",
      gender: "F",
      srsId: "L06_V05",
      example: "Die Hausnummer ist 12 (zwölf).",
      exampleSk: "Číslo domu je 12 (dvanásť).",
      recycledFrom: []
    },
    {
      de: "die Postleitzahl",
      sk: "poštové smerovacie číslo",
      gender: "F",
      srsId: "L06_V06",
      example: "Wie ist die Postleitzahl von Graz?",
      exampleSk: "Aké je poštové smerovacie číslo Grazu?",
      recycledFrom: []
    },
    {
      de: "der Wohnort",
      sk: "bydlisko",
      gender: "M",
      srsId: "L06_V07",
      example: "Mein Wohnort ist jetzt Wien.",
      exampleSk: "Moje bydlisko je teraz Viedeň.",
      recycledFrom: []
    },
    {
      de: "das Land",
      sk: "krajina",
      gender: "N",
      srsId: "L06_V08",
      example: "Die Slowakei ist ein schönes Land.",
      exampleSk: "Slovensko je krásna krajina.",
      recycledFrom: []
    },
    {
      de: "der Geburtsort",
      sk: "miesto narodenia",
      gender: "M",
      srsId: "L06_V09",
      example: "Mein Geburtsort ist Bratislava.",
      exampleSk: "Moje miesto narodenia je Bratislava.",
      recycledFrom: []
    },
    {
      de: "der Familienstand",
      sk: "rodinný stav",
      gender: "M",
      srsId: "L06_V10",
      example: "Was ist Ihr Familienstand?",
      exampleSk: "Aký je váš rodinný stav?",
      recycledFrom: []
    },
    {
      de: "das Formular",
      sk: "formulár",
      gender: "N",
      srsId: "L06_V11",
      example: "Jana füllt das Formular aus.",
      exampleSk: "Jana vypĺňa formulár.",
      recycledFrom: []
    },
    {
      de: "wohnen",
      sk: "bývať",
      gender: null,
      srsId: "L06_V12",
      example: "Ich wohne in einer Wohnung in Wien.",
      exampleSk: "Bývam v byte vo Viedni.",
      recycledFrom: []
    },
    {
      de: "leben",
      sk: "žiť",
      gender: null,
      srsId: "L06_V13",
      example: "Ich lebe seit einem Jahr in Österreich.",
      exampleSk: "Žijem rok v Rakúsku.",
      recycledFrom: []
    },
    {
      de: "ausfüllen",
      sk: "vyplniť",
      gender: null,
      srsId: "L06_V14",
      example: "Füllen Sie bitte das Formular aus.",
      exampleSk: "Vyplňte, prosím, tento formulár.",
      recycledFrom: []
    },
    {
      de: "buchstabieren",
      sk: "hláskovať",
      gender: null,
      srsId: "L06_V15",
      example: "Können Sie Ihren Nachnamen bitte buchstabieren?",
      exampleSk: "Môžete, prosím, vyhláskovať vaše priezvisko?",
      recycledFrom: []
    },
    {
      de: "ledig",
      sk: "slobodný/á",
      gender: null,
      srsId: "L06_V16",
      example: "Im Formular schreibe ich: Familienstand ledig.",
      exampleSk: "Do formulára píšem: rodinný stav slobodná.",
      recycledFrom: []
    },
    {
      de: "verheiratet",
      sk: "ženatý/vydatá",
      gender: null,
      srsId: "L06_V17",
      example: "Sind Sie verheiratet?",
      exampleSk: "Ste vydatá? / Ste ženatý?",
      recycledFrom: []
    },
    {
      de: "geschieden",
      sk: "rozvedený/á",
      gender: null,
      srsId: "L06_V18",
      example: "Er ist nicht mehr verheiratet, er ist geschieden.",
      exampleSk: "Už nie je ženatý, je rozvedený.",
      recycledFrom: []
    },
    {
      de: "Wo wohnen Sie?",
      sk: "Kde bývate?",
      gender: null,
      srsId: "L06_V19",
      example: "„Wo wohnen Sie?“ – „Ich wohne in Berlin.“",
      exampleSk: "„Kde bývate?“ – „Bývam v Berlíne.“",
      recycledFrom: []
    },
    {
      de: "Wie ist Ihre Adresse?",
      sk: "Aká je Vaša adresa?",
      gender: null,
      srsId: "L06_V20",
      example: "„Wie ist Ihre Adresse?“ – „Hauptstraße 15.“",
      exampleSk: "„Aká je Vaša adresa?“ – „Hlavná ulica 15.“",
      recycledFrom: []
    },
    {
      de: "Das ist richtig.",
      sk: "To je správne.",
      gender: null,
      srsId: "L06_V21",
      example: "„Ist die Adresse so korrekt?“ – „Ja, das ist richtig.“",
      exampleSk: "„Je táto adresa takto správna?“ – „Áno, to je správne.“",
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
      instruction: "Spojte nemecké slová s ich slovenskými prekladmi.",
      pairs: [
        [
          "der Nachname",
          "priezvisko"
        ],
        [
          "der Vorname",
          "krstné meno"
        ],
        [
          "die Adresse",
          "adresa"
        ],
        [
          "die Postleitzahl",
          "poštové smerovacie číslo"
        ],
        [
          "der Wohnort",
          "bydlisko"
        ],
        [
          "der Familienstand",
          "rodinný stav"
        ],
        [
          "das Formular",
          "formulár"
        ],
        [
          "ausfüllen",
          "vyplniť"
        ],
        [
          "ledig",
          "slobodný/á"
        ],
        [
          "verheiratet",
          "ženatý/vydatá"
        ]
      ]
    },
    {
      type: "wordorder",
      instruction: "Zoraďte slová do správneho poradia a vytvorte logické vety.",
      sentences: [
        {
          words: [
            "Sie",
            "wohnen",
            "Wo"
          ],
          correct: "Wo wohnen Sie?",
          hint: "Kde bývate?",
          explanation: "V opytovacích vetách s 'W-Frage' (ako Wo, Wie, Was) je sloveso vždy na druhej pozícii."
        },
        {
          words: [
            "ist",
            "Ihre",
            "Adresse",
            "Wie"
          ],
          correct: "Wie ist Ihre Adresse?",
          hint: "Aká je Vaša adresa?",
          explanation: "Sloveso 'ist' je na druhej pozícii, hneď za opytovacím slovom 'Wie'."
        },
        {
          words: [
            "in",
            "lebt",
            "München",
            "Er"
          ],
          correct: "Er lebt in München.",
          hint: "On žije v Mníchove.",
          explanation: "V jednoduchej oznamovacej vete je sloveso ('lebt') na druhej pozícii."
        },
        {
          words: [
            "bitte",
            "Vornamen",
            "Ihren",
            "buchstabieren",
            "Sie"
          ],
          correct: "Bitte buchstabieren Sie Ihren Vornamen.",
          hint: "Prosím, vyhláskujte Vaše krstné meno.",
          explanation: "Vo formálnej žiadosti alebo príkaze môže veta začať slovom 'Bitte', za ktorým nasleduje sloveso a potom podmet ('Sie')."
        },
        {
          words: [
            "das",
            "wir",
            "Jetzt",
            "aus",
            "Formular",
            "füllen"
          ],
          correct: "Jetzt füllen wir das Formular aus.",
          hint: "Teraz vyplníme ten formulár.",
          explanation: "Ak veta začína časovým údajom ('Jetzt'), sloveso ('füllen') zostáva na druhej pozícii a podmet ('wir') sa presúva zaň. Predpona 'aus' ide na koniec vety."
        }
      ]
    },
    {
      type: "fill",
      instruction: "Doplňte chýbajúce slovo do dialógu na úrade pri registrácii na kurz.",
      questions: [
        {
          sentence: "Guten Tag. Ich möchte den Deutschkurs buchen. Hier ist mein ___.",
          answer: "Formular",
          hint: "Dobrý deň. Chcel by som si rezervovať kurz nemčiny. Tu je môj formulár.",
          explanation: "Pri registrácii sa vypĺňa 'das Formular'."
        },
        {
          sentence: "Danke. Ah, Sie ___ in der Goethestraße. Ist das richtig?",
          answer: "wohnen",
          hint: "Ďakujem. Aha, bývate na Goethestraße. Je to správne?",
          explanation: "Sloveso 'wohnen' (bývať) sa viaže k adrese. Pre osobu 'Sie' (vykanie) má tvar 'wohnen'."
        },
        {
          sentence: "Ja, das ist ___.",
          answer: "richtig",
          hint: "Áno, to je správne.",
          explanation: "Fráza 'Das ist richtig' znamená 'To je správne' a používa sa na potvrdenie informácie."
        },
        {
          sentence: "Okay. Und Ihr Familienstand? Sind Sie verheiratet? - Nein, ich bin ___.",
          answer: "ledig",
          hint: "Dobre. A Váš rodinný stav? Ste vydatá? - Nie, som slobodná.",
          explanation: "Ak niekto nie je 'verheiratet' (ženatý/vydatá), je zvyčajne 'ledig' (slobodný/á)."
        },
        {
          sentence: "Verstehe. Ihr Geburtsort ist Bratislava. Und in welchem ___ ist das?",
          answer: "Land",
          hint: "Rozumiem. Vaše miesto narodenia je Bratislava. A v akej krajine to je?",
          explanation: "Bratislava je mesto v krajine (das Land) Slovensko."
        },
        {
          sentence: "Das ist in der Slowakei. Ich ___ aus der Slowakei.",
          answer: "komme",
          hint: "To je na Slovensku. Pochádzam zo Slovenska.",
          explanation: "SPIRAL: Sloveso 'kommen aus' (pochádzať z) sa používa na označenie krajiny pôvodu (Lekcia 3)."
        },
        {
          sentence: "Ihr Nachname ist 'Nováková'. Können Sie das bitte ___?",
          answer: "buchstabieren",
          hint: "Vaše priezvisko je 'Nováková'. Môžete to, prosím, vyhláskovať?",
          explanation: "Keď niekto nerozumie menu, požiada o hláskovanie ('buchstabieren')."
        }
      ]
    },
    {
      type: "listen",
      instruction: "Vypočujte si a napíšte slová súvisiace s osobnými údajmi.",
      questions: [
        {
          de: "wohnen",
          sk: "bývať"
        },
        {
          de: "leben",
          sk: "žiť"
        },
        {
          de: "ledig",
          sk: "slobodný/á"
        },
        {
          de: "Straße",
          sk: "ulica"
        },
        {
          de: "Adresse",
          sk: "adresa"
        },
        {
          de: "Vorname",
          sk: "krstné meno"
        },
        {
          de: "Nachname",
          sk: "priezvisko"
        },
        {
          de: "verheiratet",
          sk: "ženatý/vydatá"
        },
        {
          de: "Postleitzahl",
          sk: "PSČ"
        },
        {
          de: "Geburtsort",
          sk: "miesto narodenia"
        }
      ]
    },
    {
      type: "mcq",
      instruction: "Vyberte správnu možnosť na doplnenie vety.",
      questions: [
        {
          question: "Frau Meier, wo ___ Sie?",
          options: [
            "wohne",
            "wohnst",
            "wohnen",
            "wohnt"
          ],
          answer: 2,
          explanation: "Pri formálnom vykaní ('Sie') má sloveso 'wohnen' koncovku -en."
        },
        {
          question: "Mein Kollege ist nicht mehr verheiratet. Er ist ___.",
          options: [
            "ledig",
            "geschieden",
            "ausfüllen",
            "richtig"
          ],
          answer: 1,
          explanation: "'Geschieden' (rozvedený) je správny termín pre niekoho, kto bol, ale už nie je ženatý/vydatá."
        },
        {
          question: "Ich lebe ___ Österreich, aber meine Familie wohnt in der Slowakei.",
          options: [
            "aus",
            "als",
            "in",
            "ist"
          ],
          answer: 2,
          explanation: "Na vyjadrenie miesta, kde sa niečo nachádza (otázka 'Wo?'), používame predložku 'in'."
        },
        {
          question: "___ ist Ihr Familienstand, Herr Schmidt?",
          options: [
            "Wie",
            "Was",
            "Wo",
            "Wer"
          ],
          answer: 1,
          explanation: "Na rodinný stav sa pýtame otázkou 'Was ist Ihr Familienstand?'. Otázka 'Wie' sa používa napr. pri adrese alebo mene."
        },
        {
          question: "Sind Sie verheiratet? - Ja, das ___ richtig.",
          options: [
            "bin",
            "sind",
            "ist",
            "habe"
          ],
          answer: 2,
          explanation: "SPIRAL: Pre 'das' (to) používame 3. osobu jednotného čísla slovesa 'sein', čo je tvar 'ist' (Lekcia 1)."
        },
        {
          question: "Was ist der ___ von Anna? - Sie ist ledig.",
          options: [
            "Geburtsort",
            "Familienstand",
            "Vorname",
            "Wohnort"
          ],
          answer: 1,
          explanation: "Odpoveď 'Sie ist ledig' (Je slobodná) odpovedá na otázku o rodinnom stave ('Familienstand')."
        }
      ]
    },
    {
      type: "minitext",
      instruction: "Lies den Dialog und beantworte die Fragen.",
      text: "Herr Meier: Guten Tag. Bitte füllen Sie dieses Formular für den Studentenausweis aus.\nJana: Gerne. Oh, hier... „Familienstand“? Was bedeutet das?\nHerr Meier: Sind Sie verheiratet?\nJana: Nein, ich bin nicht verheiratet. Ich habe einen Freund.\nHerr Meier: Dann sind Sie „ledig“.\nJana: Ah, danke. Und hier: Wohnort und Land. Ich wohne in Wien, in der Mariahilfer Straße 12. Und ich lebe in Österreich. Ist das richtig?\nHerr Meier: Ja, das ist perfekt. Der Wohnort ist Wien, das Land ist Österreich.\nJana: Super, danke!",
      textSk: "Pán Meier: Dobrý deň. Prosím, vyplňte tento formulár pre študentský preukaz.\nJana: Rada. Och, tu... „rodinný stav“? Čo to znamená?\nPán Meier: Ste vydatá?\nJana: Nie, nie som vydatá. Mám priateľa.\nPán Meier: Potom ste „slobodná“.\nJana: Aha, ďakujem. A tu: bydlisko a krajina. Bývam vo Viedni, na Mariahilfer Straße 12. A žijem v Rakúsku. Je to správne?\nPán Meier: Áno, to je perfektné. Bydlisko je Viedeň, krajina je Rakúsko.\nJana: Super, ďakujem!",
      questions: [
        {
          question: "Warum ist Jana im Büro?",
          options: [
            "Sie sucht eine Wohnung.",
            "Sie lernt Deutsch mit Herrn Meier.",
            "Sie füllt ein Formular für einen Ausweis aus.",
            "Sie fragt nach einer Adresse."
          ],
          answer: 2,
          explanation: "Herr Meier sagt: „Bitte füllen Sie dieses Formular für den Studentenausweis aus.“"
        },
        {
          question: "Was ist Janas Familienstand?",
          options: [
            "Sie ist verheiratet.",
            "Sie ist ledig.",
            "Sie ist geschieden.",
            "Sie hat keinen Freund."
          ],
          answer: 1,
          explanation: "Jana sagt, sie ist nicht verheiratet. Herr Meier erklärt: „Dann sind Sie ‚ledig‘.“"
        },
        {
          question: "Was ist der Unterschied zwischen Janas Wohnort und dem Land, in dem sie lebt?",
          options: [
            "Sie wohnt in Österreich und lebt in Wien.",
            "Sie wohnt in der Slowakei und lebt in Wien.",
            "Sie wohnt und lebt in der Mariahilfer Straße.",
            "Sie wohnt in Wien und lebt in Österreich."
          ],
          answer: 3,
          explanation: "Jana sagt: „Ich wohne in Wien... Und ich lebe in Österreich.“"
        }
      ]
    },
    {
      type: "speaking",
      instruction: "Höre zu und sprich nach.",
      phrases: [
        {
          de: "Wie ist Ihr Nachname, bitte?",
          sk: "Aké je Vaše priezvisko, prosím?",
          tip: "Dôraz na dlhé 'ie' v slove 'Wie'. ie = [i:]"
        },
        {
          de: "Er ist verheiratet und lebt in München.",
          sk: "On je ženatý a žije v Mníchove.",
          tip: "Mäkké 'ch' v 'München' a 'ü' sa číta so zaokrúhlenými perami."
        },
        {
          de: "Wohnst du in Berlin?",
          sk: "Bývaš v Berlíne?",
          tip: "W sa vyslovuje ako slovenské [v]. 'o' v 'wohnst' je dlhé."
        },
        {
          de: "Sie wohnt in der Goethestraße Nummer 10.",
          sk: "Ona býva na Goethestraße číslo 10.",
          tip: "Hláska 'ß' (Eszett) sa vyslovuje ako ostré [s]."
        },
        {
          de: "Jetzt füllen wir das Formular aus.",
          sk: "Teraz vyplníme formulár.",
          tip: "Pri odlučiteľnom slovese je prízvuk na predpone 'aus'."
        },
        {
          de: "Die Postleitzahl ist falsch, sie ist nicht 1010.",
          sk: "Poštové smerovacie číslo je nesprávne, nie je 1010.",
          tip: "Nemecké 'z' je ostré, vyslovuje sa ako [ts]."
        },
        {
          de: "Ich lebe in Österreich, aber meine Familie wohnt in der Slowakei.",
          sk: "Žijem v Rakúsku, ale moja rodina býva na Slovensku.",
          tip: "Mäkké 'ch' v 'ich' a 'Österreich'. ch = [ç]"
        }
      ]
    },
    {
      type: "truefalse",
      instruction: "Je veta gramaticky správna a logická? Označte 'pravda' (áno) alebo 'nepravda' (nie).",
      statements: [
        {
          statement: "In Deutschland, 'verheiratet' ist für einen Mann und 'verheiratete' ist für eine Frau.",
          isTrue: false,
          explanation: "Toto nie je správne. V nemčine sa prídavné mená označujúce rodinný stav (ledig, verheiratet, geschieden) nemenia podľa rodu. Je to vždy rovnaký tvar."
        },
        {
          statement: "Die Frage 'Woher wohnst du?' ist korrekt, um sich auf das aktuelle Wohnort zu fragen.",
          isTrue: false,
          explanation: "Správna otázka je 'Wo wohnst du?'. Otázka 'Woher kommst du?' sa pýta na pôvod (odkiaľ pochádzaš)."
        },
        {
          statement: "Der Satz 'Ich lebe in Wien, aber ich wohne in Österreich' ist logisch nicht sinnvoll.",
          isTrue: true,
          explanation: "Presne tak. 'Leben' (žiť) je všeobecnejšie ako 'wohnen' (bývať). Logicky správne by bolo povedať: 'Ich wohne in Wien und ich lebe in Österreich.'"
        },
        {
          statement: "Ein Formular 'ausfüllen' bedeutet, dass man Informationen in das Formular schreibt.",
          isTrue: true,
          explanation: "Áno, 'ausfüllen' je oddeliteľné sloveso, ktoré znamená 'vyplniť' (napríklad formulár)."
        },
        {
          statement: "Wenn jemand fragt 'Wie ist Ihr Familienstand?', ist 'Mein Familienstand ist Huber' eine korrekte Antwort.",
          isTrue: false,
          explanation: "Toto nie je správna odpoveď. 'Familienstand' je rodinný stav (napr. ledig, verheiratet). 'Huber' je 'Nachname' (priezvisko)."
        }
      ]
    },
    {
      type: "dictation",
      instruction: "Počúvajte a napíšte vety po nemecky.",
      sentences: [
        {
          de: "Wie ist Ihr Nachname, bitte?",
          sk: "Aké je Vaše priezvisko, prosím?"
        },
        {
          de: "Er ist verheiratet und lebt in München.",
          sk: "On je ženatý a žije v Mníchove."
        },
        {
          de: "Sie wohnt in der Goethestraße Nummer 10.",
          sk: "Ona býva na Goethestraße číslo 10."
        },
        {
          de: "Ist deine Adresse noch die Hauptstraße 15?",
          sk: "Je tvoja adresa stále Hauptstraße 15?"
        },
        {
          de: "Ich lebe in Österreich, aber meine Familie wohnt in der Slowakei.",
          sk: "Žijem v Rakúsku, ale moja rodina býva na Slovensku."
        }
      ]
    },
    {
      type: "categorysort",
      instruction: "Roztrieďte slová do správnych kategórií podľa ich významu.",
      categories: [
        {
          name: "Osobné údaje",
          color: "blue",
          words: [
            "der Vorname",
            "der Nachname",
            "die Adresse",
            "der Wohnort",
            "der Geburtsort",
            "die Postleitzahl"
          ]
        },
        {
          name: "Rodinný stav",
          color: "green",
          words: [
            "ledig",
            "verheiratet",
            "geschieden"
          ]
        },
        {
          name: "Činnosti",
          color: "orange",
          words: [
            "wohnen",
            "leben",
            "ausfüllen",
            "buchstabieren"
          ]
        }
      ],
      explanation: "Toto cvičenie vám pomôže usporiadať si novú slovnú zásobu do logických skupín: údaje, ktoré píšete do formulárov, stavy, ktoré opisujú váš osobný život, a slovesá, ktoré s týmito údajmi súvisia."
    },
    {
      type: "translation",
      instruction: "Preložte vety do nemčiny.",
      sentences: [
        {
          sk: "Bývate v Nemecku?",
          answer: "Wohnen Sie in Deutschland?",
          hint: "Wohnen, in",
          explanation: "Pri formálnom vykaní (Sie) má sloveso 'wohnen' koncovku -en."
        },
        {
          sk: "Môj rodinný stav je 'slobodný'.",
          answer: "Mein Familienstand ist 'ledig'.",
          hint: "der Familienstand, ledig",
          explanation: "Na vyjadrenie stavu používame sloveso 'sein' (byť) a prídavné meno."
        },
        {
          sk: "Prosím, vyhláskujte Vaše priezvisko.",
          answer: "Bitte buchstabieren Sie Ihren Nachnamen.",
          hint: "buchstabieren, der Nachname",
          explanation: "Toto je typická veta na úrade. 'Ihren' je privlastňovacie zámeno pre 'Sie' v akuzatíve."
        },
        {
          sk: "Oni sú rozvedení a nebývajú spolu.",
          answer: "Sie sind geschieden und wohnen nicht zusammen.",
          hint: "geschieden, zusammen",
          explanation: "Pre 'oni' (3. osoba množného čísla) používame tvar 'sind' (od 'sein') a 'wohnen' (s koncovkou -en)."
        }
      ]
    },
    {
      type: "conjugation",
      instruction: "Vyčasujte sloveso 'wohnen' v prítomnom čase.",
      verbs: [
        {
          infinitive: "wohnen",
          translation: "bývať",
          forms: [
            {
              pronoun: "ich",
              correct: "wohne"
            },
            {
              pronoun: "du",
              correct: "wohnst"
            },
            {
              pronoun: "er/sie/es",
              correct: "wohnt"
            },
            {
              pronoun: "wir",
              correct: "wohnen"
            },
            {
              pronoun: "ihr",
              correct: "wohnt"
            },
            {
              pronoun: "sie/Sie",
              correct: "wohnen"
            }
          ],
          note: "'wohnen' je pravidelné sloveso. Kmeň slovesa je 'wohn-' a k nemu sa pridávajú štandardné koncovky prítomného času."
        }
      ]
    }
  ],
  reviewWords: []
};
