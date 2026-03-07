const germanNumbers = {
    '0': 'null', '1': 'eins', '2': 'zwei', '3': 'drei', '4': 'vier', '5': 'fünf',
    '6': 'sechs', '7': 'sieben', '8': 'acht', '9': 'neun', '10': 'zehn',
    '11': 'elf', '12': 'zwölf', '13': 'dreizehn', '14': 'vierzehn', '15': 'fünfzehn',
    '16': 'sechzehn', '17': 'siebzehn', '18': 'achtzehn', '19': 'neunzehn', '20': 'zwanzig'
};

export function normalizeGerman(s) {
    if (!s) return '';

    // First, convert any standalone digits up to 20 into words
    let text = s.toLowerCase().replace(/\b\d+\b/g, match => germanNumbers[match] || match);

    return text
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ü/g, 'ue')
        .replace(/ß/g, 'ss')
        .replace(/[.,!?;:\-¿¡'"„“]/g, '')
        .trim();
}

export function isAnswerCloseEnough(input, target) {
    const normInput = normalizeGerman(input);
    const normTarget = normalizeGerman(target);

    if (normInput === normTarget) return true;
    if (normInput.includes(normTarget) || normTarget.includes(normInput)) return true; // Helpful for speech recognition

    // Levenshtein distance
    const track = Array(normTarget.length + 1).fill(null).map(() =>
        Array(normInput.length + 1).fill(null));

    for (let i = 0; i <= normTarget.length; i++) track[i][0] = i;
    for (let j = 0; j <= normInput.length; j++) track[0][j] = j;

    for (let i = 1; i <= normTarget.length; i++) {
        for (let j = 1; j <= normInput.length; j++) {
            const indicator = normTarget[i - 1] === normInput[j - 1] ? 0 : 1;
            track[i][j] = Math.min(
                track[i - 1][j] + 1,
                track[i][j - 1] + 1,
                track[i - 1][j - 1] + indicator
            );
        }
    }

    const distance = track[normTarget.length][normInput.length];

    // Allow minor typos based on word length
    if (normTarget.length <= 4) return distance === 0;
    if (normTarget.length <= 9) return distance <= 1;
    return distance <= 2;
}
