const fs = require('fs');

const data_flashcards_batch_1 = {
  "das Gespräch": {
    "sk": "rozhovor",
    "sentences": [
      ["Das Gespräch war sehr interessant.", "Ten rozhovor bol veľmi zaujímavý."],
      ["Ich hatte heute ein wichtiges Gespräch.", "Mal som dnes dôležitý rozhovor."],
      ["Wir führen ein kurzes Gespräch über die Arbeit.", "Vedieme krátky rozhovor o práci."],
      ["Das Gespräch mit dem Chef ist gut gelaufen.", "Rozhovor so šéfom prebehol dobre."],
      ["Hörst du dem Gespräch zu?", "Počúvaš ten rozhovor?"],
      ["Das Gespräch dauert nur fünf Minuten.", "Ten rozhovor trvá len päť minút."],
      ["Ein offenes Gespräch hilft oft.", "Otvorený rozhovor často pomôže."],
      ["Wir beginnen das Gespräch pünktlich.", "Začíname rozhovor presne."],
      ["Möchten Sie ein persönliches Gespräch?", "Chcete osobný rozhovor?"],
      ["Das Telefongespräch war sehr laut.", "Ten telefonický rozhovor bol veľmi hlučný."],
      ["Er stört das Gespräch der Lehrer.", "Ruší rozhovor učiteľov."],
      ["Nach dem Gespräch war ich müde.", "Po rozhovore som bol unavený."],
      ["Das ist ein privates Gespräch.", "Toto je súkromný rozhovor."],
      ["Sie hat das Gespräch nicht verstanden.", "Ona ten rozhovor nepochopila."],
      ["Dein Gespräch mit Anna war sehr lang.", "Tvoj rozhovor s Annou bol veľmi dlhý."]
    ]
  },
  "die bekannte Persönlichkeit": {
    "sk": "známa osobnosť",
    "sentences": [
      ["Einstein war eine bekannte Persönlichkeit.", "Einstein bol známa osobnosť."],
      ["Möchtest du eine bekannte Persönlichkeit sein?", "Chceš byť známa osobnosť?"],
      ["Wir haben eine bekannte Persönlichkeit im Fernsehen gesehen.", "Videli sme známu osobnosť v televízii."],
      ["Die Stadt ehrt eine bekannte Persönlichkeit.", "Mesto si uctí známu osobnosť."],
      ["Er arbeitet für eine bekannte Persönlichkeit.", "Pracuje pre známu osobnosť."],
      ["Auf der Party war auch eine bekannte Persönlichkeit.", "Na párty bola aj jedna známa osobnosť."],
      ["Jede bekannte Persönlichkeit hat viele Fans.", "Každá známa osobnosť má veľa fanúšikov."],
      ["Das Buch erzählt von einer bekannten Persönlichkeit.", "Kniha rozpráva o známej osobnosti."],
      ["Das Haus gehörte einer bekannten Persönlichkeit.", "Dom patril jednej známej osobnosti."],
      ["Morgen kommt eine bekannte Persönlichkeit in die Schule.", "Zajtra príde známa osobnosť do školy."],
      ["Eine bekannte Persönlichkeit verdient oft viel Geld.", "Známa osobnosť zarába často veľa peňazí."],
      ["Ich kenne keine bekannte Persönlichkeit persönlich.", "Nepoznám osobne žiadnu známu osobnosť."],
      ["Sie fotografiert oft bekannte Persönlichkeiten.", "Často fotí známe osobnosti."],
      ["Einige bekannte Persönlichkeiten leben in Wien.", "Niektoré známe osobnosti žijú vo Viedni."],
      ["Es ist schwer, eine bekannte Persönlichkeit zu bleiben.", "Je ťažké zostať známou osobnosťou."]
    ]
  },
  "werfen": {
    "sk": "hodiť / hádzať",
    "sentences": [
      ["Ich kann den Ball sehr weit werfen.", "Viem hodiť loptu veľmi ďaleko."],
      ["Werfen Sie das Papier bitte in den Müll.", "Hoďte ten papier prosím do koša."],
      ["Die Kinder werfen Steine ins Wasser.", "Deti hádžu kamene do vody."],
      ["Kannst du mir den Schlüssel werfen?", "Môžeš mi hodiť kľúč?"],
      ["Wir werfen das alte Sofa weg.", "My vyhadzujeme starý gauč."],
      ["Sie hat den Teller auf den Boden geworfen.", "Ona hodila tanier na zem."],
      ["Werfen wir den Ball zusammen!", "Hádžme si loptu spolu!"],
      ["Warum wirfst du das Buch auf das Bett?", "Prečo hádžeš knihu na posteľ?"],
      ["Er wirft eine Münze in den Brunnen.", "Hádže mincu do fontány."],
      ["Bitte nicht werfen, es ist aus Glas!", "Prosím nehádžte, je to zo skla!"],
      ["Der Junge versucht, den Ring zu werfen.", "Chlapec sa snaží hodiť ten kruh."],
      ["Sie haben den Schnee auf die Straße geworfen.", "Hodili sneh na ulicu."],
      ["Werft eure Taschen in die Ecke.", "Hoďte vaše tašky do rohu."],
      ["Ich werde den Apfel nicht wegwerfen.", "Nezahodím to jablko."],
      ["Manche Leute werfen Müll auf den Boden.", "Niektorí ľudia hádžu smeti na zem."]
    ]
  },
  "ankreuzen": {
    "sk": "zakrížkovať",
    "sentences": [
      ["Ich muss das richtige Wort ankreuzen.", "Musím zakrížkovať to správne slovo."],
      ["Haben Sie Ihre Antwort angekreuzt?", "Zakrížkovali ste vašu odpoveď?"],
      ["Kreuzen Sie bitte A, B oder C an.", "Zakrížkujte prosím A, B alebo C."],
      ["Sie hat alle Kästchen angekreuzt.", "Zakrížkovala všetky políčka."],
      ["Man darf hier nur eine Antwort ankreuzen.", "Tu sa smie zakrížkovať len jedna odpoveď."],
      ["Hast du im Test alles angekreuzt?", "Zakrížkoval si v teste všetko?"],
      ["Kreuzen wir das Datum im Kalender an.", "Zakrížkujme dátum v kalendári."],
      ["Er hat den falschen Tag angekreuzt.", "Zakrížkoval nesprávny deň."],
      ["Bitte kreuzen Sie 'Ja' oder 'Nein' an.", "Prosím, zakrížkujte 'Áno' alebo 'Nie'."],
      ["Ich habe vergessen, die Option anzukreuzen.", "Zabudol som zakrížkovať tú možnosť."],
      ["Wo soll ich das genau ankreuzen?", "Kde to mám presne zakrížkovať?"],
      ["Im Formular muss man seinen Beruf ankreuzen.", "Vo formulári človek musí zakrížkovať svoje povolanie."],
      ["Sie hat die dritte Zeile angekreuzt.", "Zakrížkovala tretí riadok."],
      ["Vergessen Sie nicht, das letzte Feld anzukreuzen.", "Nezabudnite zakrížkovať to posledné pole."],
      ["Ich kreuze einfach irgendetwas an.", "Proste zakrížkujem hocičo."]
    ]
  },
  "die Stelle": {
    "sk": "miesto / pozícia",
    "sentences": [
      ["Haben Sie die neue Stelle bekommen?", "Dostali ste tú novú pozíciu?"],
      ["Die Stelle im Büro ist sehr gut bezahlt.", "Táto pozícia v kancelárii je veľmi dobre platená."],
      ["Wir suchen einen Lehrer für diese Stelle.", "Hľadáme učiteľa na toto miesto."],
      ["Er hat die Stelle leider nicht bekommen.", "Bohužiaľ, on to miesto nedostal."],
      ["Diese Stelle im Text ist sehr wichtig.", "Toto miesto v texte je veľmi dôležité."],
      ["Das ist eine gefährliche Stelle auf der Straße.", "Toto je nebezpečné miesto na ceste."],
      ["Zeig mir die Stelle auf der Landkarte.", "Ukáž mi to miesto na mape."],
      ["Ich bewerbe mich um eine Stelle in München.", "Uchádzam sa o pozíciu v Mníchove."],
      ["Die offene Stelle war schnell weg.", "Voľná pozícia bola rýchlo preč."],
      ["Mir gefällt meine neue Stelle sehr gut.", "Veľmi sa mi páči moje nové miesto."],
      ["Das ist die exakte Stelle, wo wir uns trafen.", "Toto je to presné miesto, kde sme sa stretli."],
      ["Er putzt die rote Stelle auf dem Teppich.", "Čistí to červené miesto na koberci."],
      ["Ab nächstem Monat habe ich eine neue Stelle.", "Od budúceho mesiaca mám novú pozíciu."],
      ["Wie haben Sie die offene Stelle gefunden?", "Ako ste našli túto voľnú pozíciu?"],
      ["Sie weinte auf der Stelle.", "Plakala na mieste."]
    ]
  },
  "schon fertig": {
    "sk": "už hotovo",
    "sentences": [
      ["Bist du mit der Arbeit schon fertig?", "Si s prácou už hotový?"],
      ["Ich bin zum Glück schon fertig.", "Ja som už našťastie hotový."],
      ["Sie hat die Prüfung schon fertig.", "Skúšku má už hotovú."],
      ["Das Essen ist schon fertig, wir können essen.", "Jedlo je už hotové, môžeme jesť."],
      ["Wir sind mit den Hausaufgaben schon fertig.", "S úlohami sme už hotoví."],
      ["Ist der Kuchen schon fertig gebacken?", "Je koláč už hotový upečený?"],
      ["Er hat alles repariert, es ist schon fertig.", "Opravil všetko, už je to hotové."],
      ["Der Mechaniker ist mit dem Auto schon fertig.", "Mechanik je s autom už hotový."],
      ["Ich bin noch nicht ganz fertig, fast schon fertig.", "Nie som ešte úplne hotový, už takmer."],
      ["Warum bist du so schnell schon fertig?", "Prečo si tak rýchlo už hotový?"],
      ["Der Tee ist gezogen und schon fertig.", "Čaj sa vylúhoval a je už hotový."],
      ["Habt ihr euer Projekt schon fertig?", "Máte váš projekt už hotový?"],
      ["Das Meeting ist schon fertig.", "Meeting je už hotový."],
      ["Sie ging nach Hause, weil sie schon fertig war.", "Šla domov, lebo už mala hotovo."],
      ["Das Dokument ist unterschrieben und schon fertig.", "Dokument je podpísaný a už hotový."]
    ]
  },
  "das Rätsel": {
    "sk": "hádanka / záhada",
    "sentences": [
      ["Das Rätsel ist sehr schwer zu lösen.", "Gáto hádanka je veľmi ťažká na vyriešenie."],
      ["Ich liebe es, Rätsel zu spielen.", "Milujem hrať hádanky."],
      ["Dieses alte Haus ist ein großes Rätsel.", "Tento starý dom je veľká záhada."],
      ["Hast du das Rätsel in der Zeitung gemacht?", "Robil si tú hádanku v novinách?"],
      ["Wir haben das Rätsel endlich gelöst.", "Konečne sme vyriešili tú hádanku."],
      ["Das kleine Mädchen erzählt gern Rätsel.", "Malé dievča rado rozpráva hádanky."],
      ["Wie er das macht, bleibt ein Rätsel.", "Ako to robí, zostáva záhadou."],
      ["Die Polizei konnte das Rätsel nicht klären.", "Polícia nevedela objasniť tú záhadu."],
      ["Ich kenne die Antwort auf dein Rätsel.", "Poznám odpoveď na tvoju hádanku."],
      ["Er kauft ein Buch mit vielen Rätseln.", "Kúpil si knihu s mnohými hádankami."],
      ["Das Rätsel hat nur drei Wörter.", "Tá hádanka má len tri slová."],
      ["Niemand weiß die perfekte Lösung für das Rätsel.", "Nikto nepozná perfektné riešenie na tú hádanku."],
      ["Das ist kein Spiel, das ist ein Rätsel.", "To nie je hra, to je záhada."],
      ["Ich habe dir gestern ein Rätsel aufgegeben.", "Včera som ti dal hádanku."],
      ["Warum der Baum starb, ist ein Rätsel.", "Prečo ten strom zomrel, je záhada."]
    ]
  },
  "sammeln": {
    "sk": "zbierať",
    "sentences": [
      ["Mein Bruder sammelt alte Briefmarken.", "Môj brat zbiera staré známky."],
      ["Wir sammeln Geld für ein neues Projekt.", "Zbierame peniaze na nový projekt."],
      ["Die Kinder sammeln Steine am Strand.", "Deti zbierajú kamene na pláži."],
      ["Sammelst du im Herbst Pilze im Wald?", "Zbieraš na jeseň huby v lese?"],
      ["Er hat den Müll im Park gesammelt.", "Zbieral odpad v parku."],
      ["Sie sammeln Ideen für das Fest.", "Oni zbierajú nápady na oslavu."],
      ["Ich sammle Unterschriften für die Petition.", "Zbieram podpisy pod petíciu."],
      ["Haben wir genug Holz gesammelt?", "Nazbierali sme dosť dreva?"],
      ["Die Lehrerin sammelt unsere Hefte ein.", "Učiteľka zbiera naše zošity."],
      ["Warum sammelst du so viele Schuhe?", "Prečo zbieraš toľko topánok?"],
      ["Wir sammeln Erfahrungen in unserem Job.", "Zbierame skúsenosti v našej práci."],
      ["Er kann nicht aufhören, Münzen zu sammeln.", "Nevie prestať zbierať mince."],
      ["Ich muss meine Gedanken sammeln.", "Musím si zozbierať myšlienky."],
      ["Manche Leute sammeln teure Autos.", "Niektorí ľudia zbierajú drahé autá."],
      ["Im Garten sammeln wir die reifen Äpfel.", "V záhrade zbierame zrelé jablká."]
    ]
  },
  "die Herkunft": {
    "sk": "Pôvod",
    "sentences": [
      ["Das Produkt muss die Herkunft zeigen.", "Produkt musí ukazovať pôvod."],
      ["Was ist deine genaue Herkunft?", "Aký je tvoj presný pôvod?"],
      ["Das Land der Herkunft ist unbekannt.", "Krajina pôvodu je neznáma."],
      ["Die Herkunft des Namens ist sehr alt.", "Pôvod tohto mena je veľmi starý."],
      ["Niemand fragt nach seiner Herkunft.", "Nikto sa nepýta na jeho pôvod."],
      ["Die Leute stolzieren mit ihrer Herkunft.", "Ľudia sú hrdí na svoj pôvod."],
      ["Wir überprüfen die Herkunft der Ware.", "Kontrolujeme pôvod toho tovaru."],
      ["Hat die Familie eine spannende Herkunft?", "Má táto rodina napínavý pôvod?"],
      ["Ihre Herkunft ist aus einem kleinen Dorf.", "Jej pôvod je z malej dediny."],
      ["Das Tierkundemuseum erklärt die Herkunft der Vögel.", "Múzeum zoológie vysvetľuje pôvod vtákov."],
      ["Auf dem Pass steht die Herkunft.", "V pase je napísaný pôvod."],
      ["Das Wort hat eine lateinische Herkunft.", "To slovo má latinský pôvod."],
      ["Er lernt viel über seine Herkunft.", "On sa učí veľa o svojom pôvode."],
      ["Diese Tomaten haben eine gute Herkunft.", "Tieto paradajky majú dobrý pôvod."],
      ["Die Herkunft ist nicht so wichtig wie der Charakter.", "Pôvod nie je taký dôležitý ako charakter."]
    ]
  },
  "die Speditionsfirma": {
    "sk": "špedičná firma (prepravca)",
    "sentences": [
      ["Die Speditionsfirma liefert die Möbel heute.", "Špedičná firma doručí ten nábytok dnes."],
      ["Er hat einen Job in einer großen Speditionsfirma.", "Má prácu vo veľkej špedičnej firme."],
      ["Das Paket wurde von der Speditionsfirma verloren.", "Balík bol stratený špedičnou firmou."],
      ["Die kleine Speditionsfirma ist sehr zuverlässig.", "Malá prepravná firma je veľmi spoľahlivá."],
      ["Wir rufen die Speditionsfirma am Montag an.", "Zavoláme tej prepravnej firme v pondelok."],
      ["Wie heißt die amerikanische Speditionsfirma?", "Ako sa volá tá americká špedičná firma?"],
      ["Die Speditionsfirma schickt uns eine Rechnung.", "Prepravná firma nám pošle faktúru."],
      ["Meine Speditionsfirma bringt alle Kisten nach Berlin.", "Moja prepravná firma odvezie všetky krabice do Berlína."],
      ["Ich warte schon den ganzen Tag auf die Speditionsfirma.", "Čakám na tú špedičnú firmu celý deň."],
      ["Die Lkws gehören einer ausländischen Speditionsfirma.", "Nákladné autá patria jednej zahraničnej prepravnej firme."],
      ["Die Leute in der Speditionsfirma arbeiten hart.", "Ľudia v špedičnej firme tvrdo pracujú."],
      ["Er fragt die Speditionsfirma nach dem Preis.", "On sa pýta prepravnej firmy na cenu."],
      ["Eine Speditionsfirma ist für Transporte verantwortlich.", "Špedičná firma je zodpovedná za prepravu."],
      ["Das Lager der Speditionsfirma ist riesig.", "Sklad tej špedičnej firmy je obrovský."],
      ["Hast du eine gute Speditionsfirma gefunden?", "Našiel si nejakú dobrú prepravnú firmu?"]
    ]
  }
};

const output = "export const flashcardsBatch1 = " + JSON.stringify(data_flashcards_batch_1, null, 2) + ";";
fs.writeFileSync('src/data/flashcards_batch_1.js', output);
console.log('Created src/data/flashcards_batch_1.js');
