const fs = require('fs');

const ARTICLES = new Set([
    'der', 'die', 'das', 'den', 'dem', 'des', 'ein', 'eine', 'einen', 'einem', 'einer',
    'kein', 'keine', 'keinen', 'keinem', 'keiner', 'mein', 'meine', 'meinen', 'meinem', 'meiner',
    'dein', 'deine', 'deinen', 'deinem', 'deiner', 'ihr', 'ihre', 'ihren', 'ihrem', 'ihrer',
    'sein', 'seine', 'seinen', 'seinem', 'seiner', 'unser', 'unsere', 'unseren', 'unserem', 'unserer',
    'euer', 'eure', 'euren', 'eurem', 'eurer'
]);

const PREPOSITIONS = new Set([
    'mit', 'aus', 'bei', 'nach', 'seit', 'von', 'zu',
    'durch', 'für', 'ohne', 'um', 'gegen',
    'in', 'an', 'auf', 'neben', 'hinter', 'über', 'unter', 'vor', 'zwischen',
    'im', 'am', 'zum', 'zur', 'beim', 'vom', 'ans', 'ins'
]);

const mockGenderMap = {
    'Haus': 'N',
    'Lehrer': 'M',
    'Mann': 'M',
    'Frau': 'F',
    'Auto': 'N',
    'Ärztin': 'F'
};

function parseGenderText(text) {
    const tokens = text.split(/([A-Za-zÄÖÜäöüß]+)/);
    const colors = new Array(tokens.length).fill(null);

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (!token) continue;
        if (/^[A-Za-zÄÖÜäöüß]+$/.test(token) && /^[A-ZÄÖÜ]/.test(token)) {
            const gender = mockGenderMap[token];
            if (gender) {
                colors[i] = gender; // Color the noun
                let tempIndices = [];
                let foundArticle = false;
                let foundPrep = false;

                for (let j = i - 1; j >= 0; j--) {
                    const tok = tokens[j];
                    if (!tok) continue;

                    if (/^[A-Za-zÄÖÜäöüß]+$/.test(tok)) {
                        const lowerTok = tok.toLowerCase();
                        const isArticle = ARTICLES.has(lowerTok);
                        const isPrep = PREPOSITIONS.has(lowerTok);
                        const isCap = /^[A-ZÄÖÜ]/.test(tok);

                        if (isArticle) {
                            if (foundArticle || foundPrep) break;
                            foundArticle = true;
                            tempIndices.push(j);
                            for (const idx of tempIndices) colors[idx] = gender;
                            tempIndices = [];
                            if (isCap) break;
                        } else if (isPrep) {
                            if (foundPrep) break;
                            foundPrep = true;
                            tempIndices.push(j);
                            for (const idx of tempIndices) colors[idx] = gender;
                            tempIndices = [];
                            if (isCap) break;
                        } else {
                            if (isCap) {
                                break;
                            } else {
                                if (foundArticle || foundPrep) break;
                                tempIndices.push(j);
                            }
                        }
                    } else {
                        if (/^[.,!?;\:]+$/.test(tok.trim()) && tok.trim() !== ',') {
                            break;
                        }
                        tempIndices.push(j);
                    }
                }
            }
        }
    }

    // Build result
    let result = [];
    let currentBlock = [];
    let currentColor = null;

    for (let i = 0; i < tokens.length; i++) {
        if (!tokens[i]) continue;
        if (colors[i] === currentColor) {
            currentBlock.push(tokens[i]);
        } else {
            if (currentBlock.length > 0) {
                result.push({ text: currentBlock.join(''), color: currentColor });
            }
            currentColor = colors[i];
            currentBlock = [tokens[i]];
        }
    }
    if (currentBlock.length > 0) {
        result.push({ text: currentBlock.join(''), color: currentColor });
    }

    return result;
}

const testCases = [
    { text: "Der Lehrer sieht den alten Mann.", expected: [{ text: "Der Lehrer", color: 'M' }, { text: " sieht ", color: null }, { text: "den alten Mann", color: 'M' }, { text: ".", color: null }] },
    { text: "Ich fahre mit dem neuen, roten Auto.", expected: [{ text: "Ich fahre ", color: null }, { text: "mit dem neuen, roten Auto", color: 'N' }, { text: ".", color: null }] },
    { text: "Das ist eine gute Frau.", expected: [{ text: "Das ist ", color: null }, { text: "eine gute Frau", color: 'F' }, { text: ".", color: null }] },
    { text: "Er kauft Haus.", expected: [{ text: "Er kauft ", color: null }, { text: "Haus", color: 'N' }, { text: ".", color: null }] },
    { text: "In dem kleinen Haus ist eine Ärztin.", expected: [{ text: "In dem kleinen Haus", color: 'N' }, { text: " ist ", color: null }, { text: "eine Ärztin", color: 'F' }, { text: ".", color: null }] },
];

let out = '';
let failed = false;
testCases.forEach((tc, idx) => {
    const res = parseGenderText(tc.text);
    const simpleRes = res.map(r => `[${r.text}:${r.color || 'none'}]`).join('');
    const expectedRes = tc.expected.map(r => `[${r.text}:${r.color || 'none'}]`).join('');

    if (simpleRes !== expectedRes) {
        out += `Test ${idx + 1} FAILED!\nExpected: ${expectedRes}\nGot:      ${simpleRes}\n\n`;
        failed = true;
    } else {
        out += `Test ${idx + 1} PASSED: ${simpleRes}\n`;
    }
});
fs.writeFileSync('c:/Users/USER/Documents/GERMAN/scripts/test_out.utf8.txt', out);
if (failed) process.exit(1);
