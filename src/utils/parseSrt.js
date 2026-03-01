// ─── SRT PARSER ───────────────────────────────────────────────────────────────
// Parses an SRT file string into the same transcript format used by VideoCoach:
//   { offset: number (ms), duration: number (ms), text: string }[]
//
// Handles:
//  - Multi-line subtitle text (joined with space)
//  - TurboScribe watermark stripping
//  - HTML tags in text (e.g. <i>, <font>) stripped
//  - Both , and . as decimal separator in timestamps

const TURBOSCRIBE_WATERMARK = /\(Transcribed by TurboScribe\.ai[^)]*\)\s*/gi;
const HTML_TAGS = /<[^>]+>/g;

/**
 * Convert SRT timestamp to milliseconds.
 * Accepts: "00:01:23,456" or "00:01:23.456"
 */
function timestampToMs(ts) {
  // Normalize decimal separator
  const normalized = ts.replace(',', '.');
  const [time, ms] = normalized.split('.');
  const [hh, mm, ss] = time.split(':').map(Number);
  return (hh * 3600 + mm * 60 + ss) * 1000 + Number((ms || '0').padEnd(3, '0').slice(0, 3));
}

/**
 * Parse SRT text into transcript entries.
 * @param {string} srtText - Raw SRT file contents
 * @returns {{ offset: number, duration: number, text: string }[]}
 */
export function parseSrt(srtText) {
  // Normalize line endings
  const normalized = srtText.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // Split into blocks separated by blank lines
  const blocks = normalized.split(/\n\s*\n/).filter(b => b.trim());

  const entries = [];

  for (const block of blocks) {
    const lines = block.trim().split('\n');
    if (lines.length < 2) continue;

    // First line is index (number) — skip it
    // Find the timestamp line (contains "-->")
    let timeLine = -1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('-->')) {
        timeLine = i;
        break;
      }
    }
    if (timeLine === -1) continue;

    const [startStr, endStr] = lines[timeLine].split('-->').map(s => s.trim());
    const startMs = timestampToMs(startStr);
    const endMs = timestampToMs(endStr);
    if (isNaN(startMs) || isNaN(endMs) || endMs <= startMs) continue;

    // Remaining lines are text
    const textLines = lines.slice(timeLine + 1);
    let text = textLines.join(' ').trim();

    // Strip HTML tags
    text = text.replace(HTML_TAGS, '');

    // Strip TurboScribe watermark
    text = text.replace(TURBOSCRIBE_WATERMARK, '');

    text = text.trim();
    if (!text) continue;

    entries.push({
      offset: startMs,
      duration: endMs - startMs,
      text,
    });
  }

  return entries;
}
