const fs = require('fs');

const data_flashcards_batch_4 = {
  "der Unterstrich": {
    "sk": "podčiarkovník",
    "sentences": [
      ["Schreib das mit Unterstrich.", "Napíš to s podčiarkovníkom."],
      ["Mein Name hat einen Unterstrich.", "Moje meno má podčiarkovník."],
      ["Ohne Unterstrich geht es nicht.", "Bez podčiarkovníka to nepôjde."],
      ["Wo ist der Unterstrich?", "Kde je podčiarkovník?"],
      ["Mach den Unterstrich hier.", "Urob podčiarkovník tu."],
      ["Der Unterstrich fehlt.", "Chýba podčiarkovník."],
      ["Ich hasse den Unterstrich.", "Nenávidím podčiarkovník."],
      ["Ein Unterstrich ist wichtig.", "Podčiarkovník je dôležitý."],
      ["Der rote Unterstrich ist falsch.", "Červený podčiarkovník je chyba."],
      ["Sein Passwort hat einen Unterstrich.", "Jeho heslo má podčiarkovník."],
      ["Wie macht man den Unterstrich?", "Ako sa robí podčiarkovník?"],
      ["Der Unterstrich ist klein.", "Podčiarkovník je malý."],
      ["Zeig mir den Unterstrich.", "Ukáž mi podčiarkovník."],
      ["Das Ende hat einen Unterstrich.", "Koniec má podčiarkovník."],
      ["Brauche ich einen Unterstrich?", "Potrebujem podčiarkovník?"]
    ]
  },
  "die Ware": {
    "sk": "tovar",
    "sentences": [
      ["Die Ware ist kaputt.", "Tovar je pokazený."],
      ["Wo ist meine Ware?", "Kde je môj tovar?"],
      ["Diese Ware ist teuer.", "Tento tovar je drahý."],
      ["Wir verkaufen die Ware heute.", "Dnes predáme tovar."],
      ["Die neue Ware kommt morgen.", "Nový tovar príde zajtra."],
      ["Prüfen Sie die Ware.", "Skontrolujte ten tovar."],
      ["Gute Ware hat ihren Preis.", "Dobrý tovar má svoju cenu."],
      ["Die Ware ist frisch.", "Tovar je čerstvý."],
      ["Er kauft viel Ware.", "Kupuje veľa tovaru."],
      ["Wann bezahlen Sie die Ware?", "Kedy zaplatíte ten tovar?"],
      ["Die Ware liegt im Auto.", "Tovar leží v aute."],
      ["Diese Ware ist billig.", "Tento tovar je lacný."],
      ["Die Ware war schmutzig.", "Tovar bol špinavý."],
      ["Wer liefert die Ware?", "Kto dodáva tovar?"],
      ["Ich suche fremde Ware.", "Hľadám cudzí tovar."]
    ]
  },
  "nennen": {
    "sk": "menovať / pomenovať",
    "sentences": [
      ["Wie nennen wir das Kind?", "Ako pomenujeme to dieťa?"],
      ["Nenn mich bei meinem Namen.", "Volaj ma mojím menom."],
      ["Er nennt drei Länder.", "On vymenuje tri krajiny."],
      ["Man nennt es Glück.", "To sa nazýva šťastie."],
      ["Wie nennt man das auf Deutsch?", "Ako sa to volá po nemecky?"],
      ["Sie nennt ihn Tiger.", "Ona ho volá Tiger."],
      ["Nenn mir einen Grund.", "Povedz mi dôvod."],
      ["Wir nennen das Projekt Sorgenkind.", "Tento projekt nazývame problémovým."],
      ["Die Kinder nennen den Hund Max.", "Deti nazvali psa Max."],
      ["Kannst du alle Farben nennen?", "Vieš vymenovať všetky farby?"],
      ["Nennst du ihn faul?", "Nazývaš ho lenivým?"],
      ["Man nennt sie Hexe.", "Nazývajú ju čarodejnica."],
      ["Wie nennt der Lehrer diese Blume?", "Ako volá učiteľ tento kvet?"],
      ["Ich nenne dir den Preis.", "Poviem ti cenu."],
      ["Er nannte mich einen Träumer.", "Nazval ma snílkom."]
    ]
  },
  "weiter": {
    "sk": "ďalej",
    "sentences": [
      ["Gehen wir weiter.", "Poďme ďalej."],
      ["Er spricht weiter.", "Hovorí ďalej."],
      ["Lies jetzt weiter.", "Čítaj ďalej."],
      ["Ich fahre nicht weiter.", "Nejdem ďalej."],
      ["Hast du eine weitere Frage?", "Máš ďalšiu otázku?"],
      ["Gibt es weitere Bücher?", "Sú tam ďalšie knihy?"],
      ["Sie rennt weiter.", "Beží ďalej."],
      ["Erzähle die Geschichte weiter.", "Rozprávaj ten príbeh ďalej."],
      ["Singen Sie bitte weiter.", "Spievajte ďalej, prosím."],
      ["Die Arbeit geht weiter.", "Práca pokračuje ďalej."],
      ["Wir brauchen weitere Mitarbeiter.", "Potrebujeme ďalších zamestnancov."],
      ["Schlaf weiter.", "Spi ďalej."],
      ["Der Weg führt weiter.", "Cesta vedie ďalej."],
      ["Was passiert weiter?", "Čo sa stane ďalej?"],
      ["Sie darf nicht weiter.", "Nesmú pokračovať ďalej."]
    ]
  },
  "der Kunststoff": {
    "sk": "plast",
    "sentences": [
      ["Das ist aus Kunststoff.", "Toto je z plastu."],
      ["Der kleine Stuhl ist aus Kunststoff.", "Tá malá stolička je z plastu."],
      ["Kunststoff ist billig.", "Plast je lacný."],
      ["Wir trennen den Kunststoff.", "My separujeme plast."],
      ["Dieses Spielzeug ist aus Kunststoff.", "Táto hračka je z plastu."],
      ["Kunststoff brennt schnell.", "Plast horí rýchlo."],
      ["Die Flasche ist aus Kunststoff.", "Fľaša je z plastu."],
      ["Er schneidet den Kunststoff.", "Reže ten plast."],
      ["Ist der Becher aus Kunststoff?", "Je ten pohár z plastu?"],
      ["Kunststoff ist leicht.", "Plast je ľahký."],
      ["Die Platte ist aus Kunststoff.", "Doska je z plastu."],
      ["Wir kaufen roten Kunststoff.", "Kupujeme červený plast."],
      ["Die Produktion von Kunststoff wächst.", "Výroba plastu rastie."],
      ["Plastiktüten sind Kunststoff.", "Plastové tašky sú plast."],
      ["Ich mag keinen Kunststoff.", "Nemám rád plast."]
    ]
  },
  "die Wiederholung": {
    "sk": "opakovanie",
    "sentences": [
      ["Ich brauche eine Wiederholung.", "Potrebujem opakovanie."],
      ["Diese Wiederholung ist langweilig.", "Toto opakovanie je nudné."],
      ["Die ständige Wiederholung nervt.", "Neustále opakovanie lezie na nervy."],
      ["Tägliche Wiederholung hilft beim Lernen.", "Denné opakovanie pomáha pri učení."],
      ["Er liebt die Wiederholung.", "On miluje opakovanie."],
      ["Wir beginnen mit der Wiederholung.", "Začíname s opakovaním."],
      ["Ist das eine Wiederholung im Fernsehen?", "Je to repríza v televízii?"],
      ["Mach eine kurze Wiederholung.", "Sprav si krátke opakovanie."],
      ["Die Lehrerin verlangt eine Wiederholung.", "Učiteľka vyžaduje opakovanie."],
      ["Das war die letzte Wiederholung.", "Zopakuje sa to naposledy."],
      ["Schnelles Lernen braucht Wiederholungen.", "Rýchle učenie potrebuje opakovania."],
      ["Ohne Wiederholung vergisst man alles.", "Bez opakovania človek všetko zabudne."],
      ["Wie viele Wiederholungen machst du?", "Koľko opakovaní robíš?"],
      ["Diese Wiederholung war falsch.", "Toto opakovanie bolo nesprávne."],
      ["Wiederholung ist wichtig.", "Opakovanie je dôležité."]
    ]
  },
  "das Streichholz": {
    "sk": "zápalka",
    "sentences": [
      ["Hast du ein Streichholz?", "Máš zápalku?"],
      ["Ich brauche ein Streichholz.", "Potrebujem zápalku."],
      ["Er brennt das Holz mit einem Streichholz.", "Páli drevo zápalkou."],
      ["Dieses Streichholz brennt nicht.", "Táto zápalka nehorí."],
      ["Kinder spielen nicht mit einem Streichholz.", "Deti sa nehrajú so zápalkou."],
      ["Wo ist die Packung mit dem Streichholz?", "Kde je škatuľka so zápalkami?"],
      ["Ein Streichholz reicht.", "Jedna zápalka stačí."],
      ["Das nasse Streichholz ist kaputt.", "Mokrá zápalka je pokazená."],
      ["Das Streichholz brach ab.", "Zápalka sa zlomila."],
      ["Er zündet das Streichholz an.", "Zapáli zápalku."],
      ["Hast du noch ein weiteres Streichholz?", "Máš ešte ďalšiu zápalku?"],
      ["Zeig mir das Streichholz.", "Ukáž mi tú zápalku."],
      ["Hier liegt nur ein altes Streichholz.", "Tu leží iba jedna stará zápalka."],
      ["Das war mein letztes Streichholz.", "To bola moja posledná zápalka."],
      ["Wer hat das kleine Streichholz benutzt?", "Kto použil tú malú zápalku?"]
    ]
  },
  "der Föhn": {
    "sk": "fén / sušič vlasov",
    "sentences": [
      ["Hast du einen Föhn?", "Máš fén?"],
      ["Der kleine Föhn ist kaputt.", "Malý fén je pokazený."],
      ["Ich brauche den heißen Föhn.", "Potrebujem horúci fén."],
      ["Der schwarze Föhn liegt hier.", "Čierny fén leží tu."],
      ["Er trocknet Haare mit einem Föhn.", "Suší vlasy fénom."],
      ["Wo hast du den neuen Föhn gekauft?", "Kde si kúpil ten nový fén?"],
      ["Ist der teure Föhn laut?", "Je ten drahý fén hlučný?"],
      ["Dieser alte Föhn bläst kalte Luft.", "Tento starý fén fúka chladný vzduch."],
      ["Sie will keinen roten Föhn.", "Nechce červený fén."],
      ["Der Föhn ist im Badezimmer.", "Fén je v kúpeľni."],
      ["Mach bitte den lauten Föhn aus.", "Vypni prosím ten hlučný fén."],
      ["Der blaue Föhn war billig.", "Modrý fén bol lacný."],
      ["Mein Föhn funktioniert wieder.", "Môj fén už zas funguje."],
      ["Wer liebt seinen Föhn?", "Kto má rád svoj fén?"],
      ["Ich suche meinen großen Föhn.", "Hľadám svoj veľký fén."]
    ]
  },
  "und so weiter": {
    "sk": "a tak ďalej",
    "sentences": [
      ["Ich esse Äpfel, Bananen und so weiter.", "Jem jablká, banány a tak ďalej."],
      ["Er kauft Brot, Milch und so weiter.", "Kupuje chlieb, mlieko a tak ďalej."],
      ["Wir singen, tanzen und so weiter.", "Spievame, tancujeme a tak ďalej."],
      ["Ich mag lesen, schreiben und so weiter.", "Rád čítam, píšem a tak ďalej."],
      ["Hunde, Katzen und so weiter spielen draußen.", "Psy, mačky a tak ďalej sa hrajú vonku."],
      ["Er studiert Mathe, Physik und so weiter.", "Študuje matematiku, fyziku a tak ďalej."],
      ["Züge, Autos und so weiter sind schnell.", "Vlaky, autá a tak ďalej sú rýchle."],
      ["Sie liebt Sommer, Sonne und so weiter.", "Zbožňuje leto, slnko a tak ďalej."],
      ["Hol Besen, Topf und so weiter.", "Prines metlu, hrniec a tak ďalej."],
      ["Gabel, Messer und so weiter liegen da.", "Vidlička, nôž a tak ďalej ležia tam."],
      ["Rot, Blau, Gelb und so weiter sind Farben.", "Červená, modrá, žltá a tak ďalej sú farby."],
      ["Mutter, Vater und so weiter kommen bald.", "Matka, otec a tak ďalej prídu čoskoro."],
      ["Kino, Theater und so weiter sind geschlossen.", "Kino, divadlo a tak ďalej sú zatvorené."],
      ["Wasser, Saft und so weiter stehen kalt.", "Voda, džús a tak ďalej stoja v chlade."],
      ["Hosen, Hemden und so weiter sind sauber.", "Nohavice, košele a tak ďalej sú čisté."]
    ]
  },
  "das Ding": {
    "sk": "vec",
    "sentences": [
      ["Was ist das für ein Ding?", "Čo je to za vec?"],
      ["Dieses Ding ist alt.", "Táto vec je stará."],
      ["Gib mir das kleine rote Ding.", "Daj mi tú malú červenú vec."],
      ["Ich finde mein Ding nicht.", "Neviem nájsť moju vec."],
      ["Das Ding ist teuer.", "Táto vec je drahá."],
      ["Wo ist das dumme Ding?", "Kde je tá hlúpa vec?"],
      ["Verrücktes Ding!", "Šialená vec!"],
      ["Das fremde Ding stört mich.", "Tá cudzia vec ma ruší."],
      ["Das große Ding steht dort.", "Tá veľká vec stojí tam."],
      ["Er kaputt das neue Ding.", "On kazí tú novú vec."],
      ["Was machst du mit dem warmen Ding?", "Čo robíš s tou teplou vecou?"],
      ["Jedes Ding hat einen Namen.", "Každá vec má názov."],
      ["Wir kaufen ein nützliches Ding.", "Kupujeme užitočnú vec."],
      ["Das kalte Ding liegt am Boden.", "Tá chladná vec leží na zemi."],
      ["Dein Ding war gestern billig.", "Tvoja vec bola včera lacná."]
    ]
  }
};

const output = "export const flashcardsBatch4 = " + JSON.stringify(data_flashcards_batch_4, null, 2) + ";";
fs.writeFileSync('src/data/flashcards_batch_4.js', output);
console.log('Created src/data/flashcards_batch_4.js');
