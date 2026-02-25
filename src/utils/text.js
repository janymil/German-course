export function normalizeGerman(s) {
    if (!s) return '';
    return s.toLowerCase()
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ü/g, 'ue')
        .replace(/ß/g, 'ss')
        .replace(/[.,!?;:\-]/g, '')
        .trim();
}
