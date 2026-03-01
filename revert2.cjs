const fs = require('fs');

let content = fs.readFileSync('src/data/lessons/L01.js', 'utf8');

const regex = /textSegments:\s*\[[\s\S]*?\]\,/;
const newString = `
      text: 'Jana ist in Wien. Sie geht in eine Sprachschule. Sie ist neu hier.\\n\\n Guten Morgen! Sind Sie die neue Studentin?\\n Guten Morgen. Ja, genau. Ich bin Jana. Jana Nováková.\\n Guten Tag, Frau Nováková. Ich heiße Schmidt. Ich arbeite hier an der Rezeption.\\n Freut mich, Herr Schmidt.\\n Können Sie bitte Ihren Nachnamen buchstabieren?\\n Ja, natürlich. N - O - V - Á - K - O - V - Á.\\n\\nEin anderer Student steht auch hier.\\n\\n Hallo! Mein Name ist Thomas.\\n Hallo Thomas. Ich bin Jana.\\n Sehr gut. Willkommen im Deutschkurs! Auf Wiedersehen.\\n Auf Wiedersehen!',
      textSk: 'Jana je vo Viedni. Ide do jazykovej školy. Je tu nová.\\n\\n Dobré ráno! Ste nová študentka?\\n Dobré ráno. Áno, presne tak. Ja som Jana. Jana Nováková.\\n Dobrý deň, pani Nováková. Volám sa Schmidt. Pracujem tu na recepcii.\\n Teší ma, pán Schmidt.\\n Môžete prosím vyhláskovať vaše priezvisko?\\n Áno, samozrejme. N - O - V - Á - K - O - V - Á.\\n\\nStojí tu aj iný študent.\\n\\n Ahoj! Moje meno je Thomas.\\n Ahoj Thomas. Ja som Jana.\\n Veľmi dobre. Vitajte v kurze nemčiny! Dovidenia.\\n Dovidenia!',
      audioSegments: [
        '/audio/minitext/L01_seg_0.mp3',
        '/audio/minitext/L01_seg_1.mp3',
        '/audio/minitext/L01_seg_2.mp3',
        '/audio/minitext/L01_seg_3.mp3',
        '/audio/minitext/L01_seg_4.mp3',
        '/audio/minitext/L01_seg_5.mp3',
        '/audio/minitext/L01_seg_6.mp3',
        '/audio/minitext/L01_seg_7.mp3',
        '/audio/minitext/L01_seg_8.mp3',
        '/audio/minitext/L01_seg_9.mp3',
        '/audio/minitext/L01_seg_10.mp3',
        '/audio/minitext/L01_seg_11.mp3'
      ],
`;

if (regex.test(content)) {
    content = content.replace(regex, newString.trim() + ',');
    fs.writeFileSync('src/data/lessons/L01.js', content, 'utf8');
    console.log('Successfully reverted L01.js to standard schema');
} else {
    console.log('Could not find textSegments block!');
}
