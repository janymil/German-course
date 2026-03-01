/**
 * Gender-Color System for German Nouns (Berliner Methode)
 *
 * Standard 3-color system proven to improve noun gender retention:
 *   der (maskulin)  → modrá (blue)
 *   die (feminin)   → červená (rose/red)
 *   das (neutrum)   → zelená (green)
 *
 * Usage:
 *   import { GenderText, GenderWord, getGenderMap, GENDER_COLORS } from '../utils/genderColors';
 *
 *   // For single vocab words with known gender:
 *   <GenderWord word="der Name" gender="M" />
 *
 *   // For German sentences/text with auto-detected noun coloring:
 *   <GenderText text="Der Herr fragt die Frau." />
 */
import React from 'react';
import { LESSONS } from '../data/curriculum';

// ─── Color definitions ───────────────────────────────────────────────
export const GENDER_COLORS = {
  M: {
    text: 'text-blue-400',
    textHover: 'hover:text-blue-300',
    bg: 'bg-blue-500/15',
    border: 'border-blue-500/40',
    dot: 'bg-blue-400',
    hex: '#60a5fa',
    label: 'der',
    labelSk: 'mužský rod',
  },
  F: {
    text: 'text-rose-400',
    textHover: 'hover:text-rose-300',
    bg: 'bg-rose-500/15',
    border: 'border-rose-500/40',
    dot: 'bg-rose-400',
    hex: '#fb7185',
    label: 'die',
    labelSk: 'ženský rod',
  },
  N: {
    text: 'text-green-400',
    textHover: 'hover:text-green-300',
    bg: 'bg-green-500/15',
    border: 'border-green-500/40',
    dot: 'bg-green-400',
    hex: '#4ade80',
    label: 'das',
    labelSk: 'stredný rod',
  },
};

// ─── Global gender map (lazily built from all lessons) ───────────────
let _genderMap = null;

export function getGenderMap() {
  if (_genderMap) return _genderMap;
  _genderMap = {};
  for (const lesson of LESSONS) {
    if (!lesson?.vocab) continue;
    for (const v of lesson.vocab) {
      if (!v.gender) continue;
      // Extract bare noun: "der Name" → "Name", "die Schweiz" → "Schweiz"
      const bare = v.de.replace(/^(der|die|das)\s+/i, '').trim();
      _genderMap[bare] = v.gender;
    }
  }
  return _genderMap;
}

/**
 * Look up gender for a single word.
 * Strips leading article and trailing punctuation before lookup.
 */
export function getGenderForWord(word) {
  if (!word) return null;
  const map = getGenderMap();
  // Try exact match first
  if (map[word]) return map[word];
  // Strip article
  const bare = word.replace(/^(der|die|das)\s+/i, '').trim();
  if (map[bare]) return map[bare];
  // Strip trailing punctuation
  const clean = bare.replace(/[.,!?;:]+$/, '');
  if (map[clean]) return map[clean];
  return null;
}

// ─── GenderWord: single vocab word with known gender ─────────────────
/**
 * Renders a single German word/phrase with gender-appropriate color.
 * Use when the gender is already known (e.g., from vocab.gender field).
 *
 * @param {string} word - The German word or phrase (e.g., "der Name")
 * @param {string|null} gender - 'M', 'F', 'N', or null
 * @param {string} className - additional CSS classes
 * @param {boolean} showDot - show a small colored dot before the word
 */
export function GenderWord({ word, gender, className = '', showDot = false }) {
  if (!gender || !GENDER_COLORS[gender]) {
    return <span className={className}>{word}</span>;
  }
  const colors = GENDER_COLORS[gender];
  return (
    <span className={`${colors.text} ${className}`}>
      {showDot && (
        <span
          className={`inline-block w-1.5 h-1.5 rounded-full ${colors.dot} mr-1 align-middle`}
        />
      )}
      {word}
    </span>
  );
}

// ─── GenderText: auto-color nouns in German text ─────────────────────
/**
 * Renders German text with automatically color-coded nouns.
 * Detects "der/die/das + Noun" patterns and standalone known nouns.
 *
 * @param {string} text - German text to render
 * @param {string} className - additional CSS classes on the wrapper span
 * @param {Object} extraMap - additional noun→gender entries to merge with global map
 */
export function GenderText({ text, className = '', extraMap = null }) {
  if (!text) return <span className={className}></span>;

  const genderMap = getGenderMap();
  const map = extraMap ? { ...genderMap, ...extraMap } : genderMap;

  // Split text into tokens preserving whitespace.
  // We split on whitespace boundaries while keeping the whitespace.
  const tokens = text.split(/(\s+)/);
  const result = [];
  let i = 0;

  while (i < tokens.length) {
    const token = tokens[i];

    // Skip whitespace tokens — just push them
    if (/^\s+$/.test(token)) {
      result.push(token);
      i++;
      continue;
    }

    const lower = token.toLowerCase().replace(/[.,!?;:]+$/, '');

    // Check if this is a definite article: der, die, das
    // (also handle sentence-initial capitalized: Der, Die, Das)
    if (['der', 'die', 'das'].includes(lower)) {
      // Look ahead: next token should be whitespace, then the noun
      const ws = (i + 1 < tokens.length && /^\s+$/.test(tokens[i + 1])) ? tokens[i + 1] : '';
      const nextIdx = ws ? i + 2 : i + 1;
      const nextToken = nextIdx < tokens.length ? tokens[nextIdx] : '';

      if (nextToken) {
        // Strip trailing punctuation for lookup
        const bareNext = nextToken.replace(/[.,!?;:]+$/, '');
        const gender = map[bareNext];

        if (gender) {
          const colors = GENDER_COLORS[gender];
          // Color the article + whitespace + noun together
          result.push(
            <span key={i} className={colors.text}>
              {token}{ws}{nextToken}
            </span>
          );
          i = nextIdx + 1;
          continue;
        }
      }
    }

    // Check if standalone word is a known noun
    // In German, nouns are capitalized. Check if this word starts with uppercase.
    if (token.length > 0 && /^[A-ZÄÖÜ]/.test(token)) {
      const bare = token.replace(/[.,!?;:]+$/, '');
      const trailingPunct = token.slice(bare.length);
      const gender = map[bare];

      if (gender) {
        const colors = GENDER_COLORS[gender];
        result.push(
          <span key={i} className={colors.text}>
            {bare}
          </span>
        );
        if (trailingPunct) {
          result.push(trailingPunct);
        }
        i++;
        continue;
      }
    }

    // No match — render as-is
    result.push(token);
    i++;
  }

  return <span className={className}>{result}</span>;
}

// ─── GenderLegend: small color legend for display ────────────────────
/**
 * A compact legend showing the 3 gender colors.
 * Useful at the top of exercise areas or vocab trainers.
 */
export function GenderLegend({ className = '' }) {
  return (
    <div className={`flex items-center gap-3 text-xs ${className}`}>
      {Object.entries(GENDER_COLORS).map(([g, c]) => (
        <span key={g} className="flex items-center gap-1">
          <span className={`inline-block w-2 h-2 rounded-full ${c.dot}`} />
          <span className={c.text}>{c.label}</span>
          <span className="text-gray-600">({c.labelSk})</span>
        </span>
      ))}
    </div>
  );
}
