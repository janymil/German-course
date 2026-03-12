const fs = require('fs');

const data_flashcards_batch_5 = {
  "die Postleitzahl": {
    "sk": "PSČ",
    "sentences": [
      ["Was ist deine Postleitzahl?", "Aké je tvoje PSČ?"],
      ["Die Postleitzahl fehlt hier.", "Tu chýba PSČ."],
      ["Ohne Postleitzahl kommt der Brief nicht.", "Bez PSČ ten list nepríde."],
      ["Die Postleitzahl ist vierstellig.", "PSČ je štvormiestne."],
      ["Vergessen Sie die Postleitzahl nicht.", "Nezabudnite PSČ."],
      ["Die Postleitzahl steht am Anfang.", "PSČ stojí na začiatku."],
      ["Kennen Sie die richtige Postleitzahl?", "Poznáte správne PSČ?"],
      ["Schreiben Sie die Postleitzahl.", "Napíšte PSČ."],
      ["Das Paket braucht eine Postleitzahl.", "Balík potrebuje PSČ."],
      ["Wie lautet die Postleitzahl?", "Aké je PSČ?"],
      ["Er kannte meine alte Postleitzahl.", "On poznal moje staré PSČ."],
      ["Das ist eine neue Postleitzahl.", "Toto je nové PSČ."],
      ["Wo finde ich die Postleitzahl?", "Kde nájdem to PSČ?"],
      ["Die Postleitzahl ist wichtig.", "PSČ je dôležité."],
      ["Hat dieses Dorf eine Postleitzahl?", "Má táto dedina PSČ?"]
    ]
  },
  "die Seife": {
    "sk": "mydlo",
    "sentences": [
      ["Ich wasche mich mit Seife.", "Umývam sa mydlom."],
      ["Diese rote Seife riecht gut.", "Toto červené mydlo vonia dobre."],
      ["Wir brauchen neue Seife.", "Potrebujeme nové mydlo."],
      ["Die kleine Seife liegt im Bad.", "Malé mydlo leží v kúpeľni."],
      ["Kinder spielen mit der Seife.", "Deti sa hrajú s mydlom."],
      ["Er kauft weiße Seife ein.", "Nakupuje biele mydlo."],
      ["Hast du die Seife gesehen?", "Videl si to mydlo?"],
      ["Die nasse Seife rutscht schnell.", "Mokré mydlo sa rýchlo šmýka."],
      ["Wir waschen den Hund mit Seife.", "Psa umývame mydlom."],
      ["Das ist ein Stück Seife.", "To je kúsok mydla."],
      ["Die Seife schäumt nicht genug.", "Mydlo dostatočne nepení."],
      ["Das Baby liebt warme Seife.", "Bábätko miluje teplé mydlo."],
      ["Er nutzt wenig Seife.", "Používa málo mydla."],
      ["Der Spender hat keine Seife.", "Dávkovač nemá mydlo."],
      ["Sie wäscht mit echter Seife.", "Umýva sa s pravým mydlom."]
    ]
  },
  "sich bedanken": {
    "sk": "poďakovať sa",
    "sentences": [
      ["Ich muss mich dringend bedanken.", "Musím sa naliehavo poďakovať."],
      ["Wir bedanken uns für Ihre Hilfe.", "Ďakujeme Vám za pomoc."],
      ["Sie bedankt sich für das Geschenk.", "Ona ďakuje za darček."],
      ["Er bedankt sich recht herzlich.", "On sa srdečne poďakoval."],
      ["Hast du dich schon bedankt?", "Už si sa poďakoval?"],
      ["Ich bedanke mich noch heute.", "Chcem sa poďakovať ešte dnes."],
      ["Bitte bedanken Sie sich schriftlich.", "Poďakujte sa prosím písomne."],
      ["Wir bedanken uns lieb.", "Pekne sa ďakujeme."],
      ["Sie haben sich nicht bedankt.", "Nepoďakovali sa."],
      ["Warum will er sich nicht bedanken?", "Prečo sa nechce poďakovať?"],
      ["Sie bedanken sich für das Essen.", "Ďakujú za jedlo."],
      ["Das Kind muss sich bedanken.", "Dieťa sa musí poďakovať."],
      ["Wir bedanken uns alle zusammen.", "Ďakujeme všetci spolu."],
      ["Hast du vergessen, dich zu bedanken?", "Zabudol si sa poďakovať?"],
      ["Er bedankt sich höflich.", "Poďakuje sa zdvorilo."]
    ]
  },
  "zeichnen": {
    "sk": "kresliť",
    "sentences": [
      ["Kinder zeichnen viele Bilder.", "Deti kreslia veľa obrazov."],
      ["Er zeichnet gerne rote Tiere.", "Rád kreslí červené zvieratá."],
      ["Wir zeichnen einen grünen Baum.", "Kreslíme zelený strom."],
      ["Sie zeichnet einen blauen See.", "Ona kreslí modré jazero."],
      ["Kannst du ein Auto zeichnen?", "Vieš nakresliť auto?"],
      ["Der Lehrer zeichnet an die Tafel.", "Učiteľ kreslí na tabuľu."],
      ["Zeichnen macht großen Spaß.", "Kreslenie veľmi baví."],
      ["Sie zeichnet mit einem Bleistift.", "Kreslí ceruzkou."],
      ["Ich muss ein Haus zeichnen.", "Musím nakresliť dom."],
      ["Zeichne eine gerade Linie.", "Nakresli rovnú čiaru."],
      ["Er zeichnet das Haus falsch.", "Kreslí ten dom nesprávne."],
      ["Die kleine Katze lernt zeichnen.", "Malá mačka sa učí kresliť."],
      ["Er kann dieses Tier perfekt zeichnen.", "Vie toto zviera perfektne nakresliť."],
      ["Warum zeichnen alle Mädchen ein Herz?", "Prečo všetky dievčatá kreslia srdce?"],
      ["Wer zeichnet hier so schön?", "Kto tu kreslí tak pekne?"]
    ]
  },
  "auf": {
    "sk": "na",
    "sentences": [
      ["Das Buch liegt auf dem Tisch.", "Kniha leží na stole."],
      ["Der nasse Hund schläft auf dem Sofa.", "Mokrý pes spí na pohovke."],
      ["Mach bitte die Tür auf.", "Otvor prosím ťa dvere."],
      ["Das Kind liegt auf dem Holz.", "Dieťa leží na dreve."],
      ["Alle Fenster sind heute auf.", "Všetky okná sú dnes otvorené."],
      ["Der Kater sprang auf den Stein.", "Kocúr skočil na kameň."],
      ["Wir wandern weiter auf den großen Berg.", "Kráčame ďalej na ten veľký vrch."],
      ["Das Wasser tropft auf den Boden.", "Voda kvapká na zem."],
      ["Die Gläser stehen schon auf dem Regal.", "Poháre už stoja na polici."],
      ["Auf dem Land ist es sehr ruhig.", "Na vidieku je to veľmi pokojné."],
      ["Stell die Schuhe auf die Treppe.", "Polož tie topánky na schody."],
      ["Die Flasche steht auf der Straße.", "Fľaša stojí na ceste."],
      ["Das Zimmer hier ist schön warm und auf.", "Izba je pekne teplá a otvorená."],
      ["Wir spielen auf dem kalten Balkon.", "Hráme sa na chladnom balkóne."],
      ["Der Stuhl ist leicht und auf dem Dach.", "Stolička je ľahká a na streche."]
    ]
  },
  "die Anrede": {
    "sk": "oslovenie",
    "sentences": [
      ["Was ist die richtige Anrede?", "Aké je správne oslovenie?"],
      ["Ich vergesse die Anrede immer.", "Vždy zabudnem oslovenie."],
      ["Vergiss nicht auf die Anrede.", "Nezabudni na oslovenie."],
      ["Diese Anrede ist sehr höflich.", "Toto oslovenie je veľmi slušné."],
      ["Wir nutzen eine freundliche Anrede.", "Používame priateľské oslovenie."],
      ["Das Dokument beginnt mit der Anrede.", "Dokument začína oslovením."],
      ["Ist das die formelle Anrede?", "Je to formálne oslovenie?"],
      ["Ein Brief braucht eine Anrede.", "List potrebuje oslovenie."],
      ["Sie hasst diese kalte Anrede.", "Ona nenávidí toto chladné oslovenie."],
      ["Die Anrede war völlig falsch.", "Oslovenie bolo úplne nesprávne."],
      ["Wie schreibt man die Anrede hier?", "Ako sa píše oslovenie tu?"],
      ["Die Frau wählt eine andere Anrede.", "Žena volí iné oslovenie."],
      ["Er benutzt keine richtige Anrede.", "Nepoužíva žiadne skutočné oslovenie."],
      ["Das ist eine schöne Anrede.", "To je pekné oslovenie."],
      ["Muss die Anrede kursiv sein?", "Musí byť oslovenie kurzívou?"]
    ]
  }
};

const output = "export const flashcardsBatch5 = " + JSON.stringify(data_flashcards_batch_5, null, 2) + ";";
fs.writeFileSync('src/data/flashcards_batch_5.js', output);
console.log('Created src/data/flashcards_batch_5.js');
