const fs = require('fs');

const content = fs.readFileSync('c:/Users/USER/Documents/GERMAN/src/data/ebooks.js', 'utf8');

const regexWords = /words:\s*\{([\s\S]*?)\},\s*chapters/g;const wordsMatch = regexWords.exec(content);
let existingWords = [];
if (wordsMatch) {
    const lines = wordsMatch[1].split('\n');
    lines.forEach(line => {
        const m = line.match(/"([^"]+)"\s*:/);
        if (m) existingWords.push(m[1]);
    });
}

const lines = content.split('\n');
let ch68text = [];
let inCh = false;
lines.forEach(line => {
    if (line.includes("id: 'ch_10'")) inCh = true;
    if (inCh && line.includes('{ de: "')) {
        let m = line.match(/\{ de: "([^"]+)"/);
        if (m) ch68text.push(m[1]);
    }
});
const nounRegex = /\b[A-ZÄÖÜ][a-zäöüß]+\b/g;
const alleNomen = new Set();
ch68text.join(' ').match(nounRegex)?.forEach(w => alleNomen.add(w));

const nichtNomen = ["Ich", "Er", "Sie", "Wir", "Der", "Die", "Das", "Ein", "Eine", "Es", "Am", "Im", "In", "Mit", "Auf", "Aus", "Zu", "Zum", "Zur", "Von", "Vom", "Das", "Und", "Aber", "Oder", "Ja", "Nein", "Doch", "Vielleicht", "Hier", "Da", "Dort", "Jetzt", "Dann", "Heute", "Gestern", "Morgen", "Warum", "Wer", "Was", "Wie", "Wo", "Wann", "Dass", "Wenn", "Weil", "Als", "Um", "Also", "So", "Nur", "Auch", "Schon", "Noch", "Immer", "Oft", "Manchmal", "Nie", "Sehr", "Viel", "Wenig", "Alles", "Nichts", "Kein", "Keine", "Mein", "Dein", "Sein", "Ihr", "Unser", "Euer", "Ihre", "Dies", "Diese", "Dieses", "Jeder", "Jede", "Jedes", "Man", "Jemand", "Niemand", "Irgend", "Ganz", "Gar", "Bitte", "Danke", "Guten", "Tag", "Morgen", "Abend", "Hallo", "Tschüss", "Auf", "Wiedersehen", "Oje", "He", "Herr", "Frau", "Der", "Die", "Das", "Ein", "Eine", "Oder", "Und", "Aber", "Denn", "Da", "Das", "Dass", "Warum", "Weil", "Wenn", "Wie", "Wo", "Was", "Wer", "Wem", "Wem", "Welch", "Mir", "Mich", "Dir", "Dich", "Ihm", "Ihn", "Ihr", "Uns", "Euch", "Ihnen", "Den", "Dem", "Des", "Zur", "Zum", "Vom", "Beim", "Am", "Im", "Ins", "Ans", "Klara", "Harald", "Julia", "Chris", "Fender", "Kainz", "Hammerl", "Vienna", "Kalman", "Christian", "Christoph", "Markus", "Herbert", "Wien", "Salzburg", "Coffee", "Co", "Mitte", "Aha", "Na", "Hmm", "Krrrkkk", "Vorsicht", "Wer", "Gleich", "Okay", "Sind", "Für", "Drei", "Bis", "Das", "Deine", "Seine", "Welche", "Ihren", "Viele", "Grüße", "Erzählen", "Dinge", "Dienstagmorgen", "Garten", "Kaffee", "Krankenhaus", "Hat", "Waren", "Natürlich", "Hören", "Raus", "Sofort", "Kann", "Habe", "Ihrem", "Wohnen", "Sehen", "Sagen", "Ist", "Du"];

let missing = [];
alleNomen.forEach(n => {
    if (!existingWords.includes(n) && !nichtNomen.includes(n)) {
        missing.push(n);
    }
});

fs.writeFileSync('c:/Users/USER/Documents/GERMAN/scripts/missing.json', JSON.stringify(missing, null, 2));
