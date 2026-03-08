const fs = require('fs');
const path = require('path');

const NICOS_JS_PATH = path.resolve('./src/data/decks/nicos_weg.js');
const rawCode = fs.readFileSync(NICOS_JS_PATH, 'utf8');

// A manual dictionary crafted by me (the AI) to fix the most glaring translation issues and add examples.
const manualCorrections = {
  "auch": { sk: "tiež, aj", example: "Ich komme auch mit.", exampleSk: "Idem tiež s vami." },
  "das Beispiel": { sk: "príklad", example: "Können Sie mir ein Beispiel geben?", exampleSk: "Môžete mi dať príklad?" },
  "danke": { sk: "ďakujem", example: "Danke für deine Hilfe.", exampleSk: "Ďakujem za tvoju pomoc." },
  "Es geht mir gut.": { sk: "Mám sa dobre.", example: "Danke der Nachfrage, es geht mir gut.", exampleSk: "Ďakujem za opýtanie, mám sa dobre." },
  "Es ist 09:00 Uhr.": { sk: "Je deväť hodín.", example: "Wir treffen uns, wenn es 09:00 Uhr ist.", exampleSk: "Stretneme sa, keď bude deväť hodín." },
  "Frau": { sk: "pani", example: "Guten Tag, Frau Müller.", exampleSk: "Dobrý deň, pani Müllerová." },
  "die Frau": { sk: "žena", example: "Die Frau liest ein Buch.", exampleSk: "Žena číta knihu." },
  "gut": { sk: "dobrý, dobre", example: "Der Kaffee schmeckt sehr gut.", exampleSk: "Káva chutí veľmi dobre." },
  "Guten Abend.": { sk: "Dobrý večer.", example: "Guten Abend, wie geht es Ihnen?", exampleSk: "Dobrý večer, ako sa máte?" },
  "Guten Morgen.": { sk: "Dobré ráno.", example: "Guten Morgen, Hast du gut geschlafen?", exampleSk: "Dobré ráno, spal si dobre?" },
  "Guten Tag.": { sk: "Dobrý deň.", example: "Guten Tag, ich suche den Bahnhof.", exampleSk: "Dobrý deň, hľadám stanicu." },
  "Hallo!": { sk: "Ahoj!, Dobrý deň!", example: "Hallo! Wie geht's?", exampleSk: "Ahoj! Ako sa máš?" },
  "Herr": { sk: "pán", example: "Guten Tag, Herr Schmidt.", exampleSk: "Dobrý deň, pán Schmidt." },
  "Hey!": { sk: "Ahoj!, Čau!", example: "Hey! Schön dich zu sehen.", exampleSk: "Ahoj! Rád ťa vidím." },
  "Hi!": { sk: "Ahoj!", example: "Hi! Bist du neu hier?", exampleSk: "Ahoj! Si tu nový?" },
  "der Mann": { sk: "muž", example: "Der Mann trägt einen Hut.", exampleSk: "Muž nosí klobúk." },
  "nicht": { sk: "nie", example: "Das ist nicht mein Auto.", exampleSk: "To nie je moje auto." },
  "nicht so gut": { sk: "nie veľmi dobre", example: "Mir geht es heute nicht so gut.", exampleSk: "Dnes sa necítim veľmi dobre." },
  "oder": { sk: "alebo", example: "Möchtest du Kaffee oder Tee?", exampleSk: "Chceš kávu alebo čaj?" },
  "schön": { sk: "pekný, krásny", example: "Das Wetter ist heute sehr schön.", exampleSk: "Počasie je dnes veľmi pekné." },
  "sehr gut": { sk: "veľmi dobre", example: "Du sprichst sehr gut Deutsch.", exampleSk: "Hovoríš veľmi dobre po nemecky." },
  "super": { sk: "super, skvelé", example: "Das ist eine super Idee!", exampleSk: "To je skvelý nápad!" },
  "Uhr": { sk: "hodina (čas)", example: "Es ist genau acht Uhr.", exampleSk: "Je presne osem hodín." },
  "und": { sk: "a", example: "Ich kaufe Äpfel und Bananen.", exampleSk: "Kupujem jablká a banány." },
  "Und dir?": { sk: "A ty? (ako sa máš)", example: "Mir geht's gut, und dir?", exampleSk: "Mám sa dobre, a ty?" },
  "Und Ihnen?": { sk: "A vy? (ako sa máte formálne)", example: "Mir geht es gut, und Ihnen?", exampleSk: "Mám sa dobre, a vy?" },
  "Wie geht es dir?": { sk: "Ako sa máš?", example: "Hallo Anna, wie geht es dir?", exampleSk: "Ahoj Anna, ako sa máš?" },
  "Wie geht es Ihnen?": { sk: "Ako sa máte?", example: "Guten Tag Herr Schmidt, wie geht es Ihnen?", exampleSk: "Dobrý deň pán Schmidt, ako sa máte?" },

  // Chapter 2 C2
  "die Bank": { sk: "banka", example: "Ich muss Geld von der Bank holen.", exampleSk: "Musím vybrať peniaze z banky." },
  "bitte": { sk: "prosím", example: "Ein Wasser, bitte.", exampleSk: "Vodu, prosím." },
  "das Büro": { sk: "kancelária, úrad", example: "Ich arbeite heute im Büro.", exampleSk: "Dnes pracujem v kancelárii." },
  "der Bus": { sk: "autobus", example: "Ich fahre mit dem Bus zur Arbeit.", exampleSk: "Idem do práce autobusom." },
  "der Computer": { sk: "počítač", example: "Mein Computer ist neu.", exampleSk: "Môj počítač je nový." },
  "die E-Mail": { sk: "email", example: "Ich schreibe dir eine E-Mail.", exampleSk: "Napíšem ti email." },
  "die Familie": { sk: "rodina", example: "Meine Familie ist klein.", exampleSk: "Moja rodina je malá." },
  "der Flughafen": { sk: "letisko", example: "Wir fahren zum Flughafen.", exampleSk: "Ideme na letisko." },
  "die Gitarre": { sk: "gitara", example: "Er spielt gut Gitarre.", exampleSk: "Dobre hrá na gitare." },
  "das Hobby": { sk: "záľuba, hobby", example: "Mein Hobby ist Schwimmen.", exampleSk: "Mojím hobby je plávanie." },
  "das Hotel": { sk: "hotel", example: "Das Hotel ist sehr teuer.", exampleSk: "Ten hotel je veľmi drahý." },
  "die Information": { sk: "informácia", example: "Ich brauche mehr Informationen.", exampleSk: "Potrebujem viac informácií." },
  "der Kaffee": { sk: "káva", example: "Ich trinke jeden Morgen Kaffee.", exampleSk: "Každé ráno pijem kávu." },
  "Kein Problem.": { sk: "Žiadny problém.", example: "Entschuldigung. - Kein Problem.", exampleSk: "Prepáč. - Žiadny problém." },
  "das Kino": { sk: "kino", example: "Wir gehen am Samstag ins Kino.", exampleSk: "V sobotu ideme do kina." },
  "das Konzert": { sk: "koncert", example: "Das Konzert gestern war fantastisch.", exampleSk: "Včerajší koncert bol fantastický." },
  "die Kultur": { sk: "kultúra", example: "Ich interessiere mich für deutsche Kultur.", exampleSk: "Zaujímam sa o nemeckú kultúru." },
  "das Museum": { sk: "múzeum", example: "Wir haben ein Museum besucht.", exampleSk: "Navštívili sme múzeum." },
  "die Musik": { sk: "hudba", example: "Ich höre gerne Musik.", exampleSk: "Rád počúvam hudbu." },
  "okay": { sk: "dobre, fajn", example: "Okay, machen wir das so.", exampleSk: "Dobre, urobme to tak." },
  "der Pilot": { sk: "pilot", example: "Der Pilot fliegt das Flugzeug.", exampleSk: "Pilot riadi lietadlo." },
  "die Pilotin": { sk: "pilotka", example: "Sie arbeitet als Pilotin.", exampleSk: "Pracuje ako pilotka." },
  "die Pizza": { sk: "pizza", example: "Wir essen heute Pizza.", exampleSk: "Dnes jeme pizzu." },
  "das Problem": { sk: "problém", example: "Das ist ein großes Problem.", exampleSk: "To je veľký problém." },
  "das Restaurant": { sk: "reštaurácia", example: "Das Essen in diesem Restaurant ist toll.", exampleSk: "Jedlo v tejto reštaurácii je skvelé." },
  "die Spaghetti (Plural)": { sk: "špagety", example: "Spaghetti mit Tomatensoße.", exampleSk: "Špagety s paradajkovou omáčkou." },
  "der Sport": { sk: "šport", example: "Treibst du Sport?", exampleSk: "Športuješ?" },
  "der Student": { sk: "študent (vysokoškolák)", example: "Er ist Student an der Universität.", exampleSk: "On je študentom na univerzite." },
  "die Studentin": { sk: "študentka (vysokoškoláčka)", example: "Sie ist Medizinstudentin.", exampleSk: "Ona je študentkou medicíny." },
  "(etwas) studieren": { sk: "študovať (na vysokej škole, univerzite)", example: "Er studiert Medizin.", exampleSk: "Študuje medicínu." },
  "der Supermarkt": { sk: "supermarket", example: "Ich gehe in den Supermarkt einkaufen.", exampleSk: "Idem nakúpiť do supermarketu." },
  "das Taxi": { sk: "taxík", example: "Wir nehmen ein Taxi zum Bahnhof.", exampleSk: "Vezmeme si taxík na stanicu." },
  "das Telefon": { sk: "telefón", example: "Mein Telefon klingelt.", exampleSk: "Zvoní mi telefón." },
  "das Theater": { sk: "divadlo", example: "Heute Abend gehen wir ins Theater.", exampleSk: "Dnes večer ideme do divadla." },
  "die Toilette": { sk: "toaleta, záchod", example: "Wo ist hier die Toilette?", exampleSk: "Kde je tu záchod?" },
  "die Universität": { sk: "univerzita", example: "Die Universität ist sehr alt.", exampleSk: "Táto univerzita je veľmi stará." },
  "das Zentrum": { sk: "centrum (mesta)", example: "Wir treffen uns im Zentrum.", exampleSk: "Stretneme sa v centre." }
};


// Regex trick to extract, parse and stringify the raw JS safely.
// Since it's a huge object, we execute it in a clean scope.
const sandbox = \`
  let result;
  const exp = { set module(val) { result = val; } };
  \${rawCode.replace(/export const nicosWegDeck =/, 'exp.module =')}
  result;
\`;

const deck = eval(sandbox);

let cleanedCount = 0;
let manualCount = 0;

deck.chapters.forEach(chapter => {
  chapter.vocab.forEach(v => {
      
    // 1. Structural cleanup for German side
    if (v.de.includes(', die ')) {
       const parts = v.de.split(', die ');
       v.de = parts[0].trim();
       v.plural = 'die ' + parts[1].trim();
    }
    
    // 2. Structural cleanup for Slovak translations
    // Strip parenthetical definitions e.g "(skrátená forma...)"
    let finalSk = v.sk.replace(/\\(.*?\\)/g, '').trim(); 
    
    // Remove duplicate translations caused by bad anki data "dobre; dobre" or "pani/pani"
    let skParts = finalSk.split(/[;/]/).map(s => s.trim()).filter(Boolean);
    
    // Dedup case-insensitively but retain original casing for the first match
    let seenLowercaseMap = new Set();
    let uniqueSk = [];
    for(const part of skParts) {
        if(!seenLowercaseMap.has(part.toLowerCase())) {
            seenLowercaseMap.add(part.toLowerCase());
            uniqueSk.push(part);
        }
    }
    
    if(uniqueSk.length > 0) {
        finalSk = uniqueSk.join(', ');
        // capitalize fully if it was originally an independent sentence
        if (v.de.endsWith('.')) {
          finalSk = finalSk.charAt(0).toUpperCase() + finalSk.slice(1);
        }
    } else {
        finalSk = v.sk; // safe fallback
    }

    if (v.de.startsWith('(etwas) ')) {
        v.de = v.de.replace('(etwas) ', '');
    }

    v.sk = finalSk;
    cleanedCount++;

    // 3. Manual Corrections (My Brain)
    const match = manualCorrections[v.de] || manualCorrections[v.de + ' (Plural)'];
    if (match) {
        v.sk = match.sk;
        if (!v.example) {
           v.example = match.example;
           v.exampleSk = match.exampleSk;
        }
        manualCount++;
    }
  });
});

console.log(\`Cleaned \${cleanedCount} words structurally. Applied \${manualCount} perfect manual translations and examples.\`);

const updatedCode = \`export const nicosWegDeck = \${JSON.stringify(deck, null, 2)};\\n\`;
fs.writeFileSync(NICOS_JS_PATH, updatedCode, 'utf8');
