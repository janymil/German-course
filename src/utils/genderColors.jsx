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
import { GLOBAL_NOUNS } from '../data/globalNouns';
import { ALL_STORY_WORDS } from '../data/stories';
import { SENTENCE_UNITS } from '../data/sentenceTrainer';

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

  // Helper to add word variations
  const addVariations = (de, article, cases, plural) => {
    if (!article) return;
    const gender = article.toLowerCase() === 'der' ? 'M' : article.toLowerCase() === 'die' ? 'F' : 'N';
    if (de) {
      const bare = de.replace(/^(der|die|das)\s+/i, '').trim();
      _genderMap[bare] = gender;
    }
    const parts = [plural, cases?.Nominativ, cases?.Akkusativ, cases?.Dativ, cases?.Genitiv];
    for (const p of parts) {
      if (!p || p === 'N/A') continue;
      const bare = p.replace(/^(der|die|das|den|dem|des)\s+/i, '').trim();
      if (bare) _genderMap[bare] = gender;
    }
  };

  // 1. Lessons Vocab
  for (const lesson of LESSONS) {
    if (!lesson?.vocab) continue;
    for (const v of lesson.vocab) {
      if (!v.gender) continue;
      const bare = v.de.replace(/^(der|die|das)\s+/i, '').trim();
      _genderMap[bare] = v.gender;
    }
  }

  // 2. Global Nouns
  for (const [key, val] of Object.entries(GLOBAL_NOUNS)) {
    if (val.type === 'noun') {
      _genderMap[key] = val.article === 'der' ? 'M' : val.article === 'die' ? 'F' : 'N';
      addVariations(key, val.article, val.cases, val.plural);
    }
  }

  // 3. Story Words
  for (const [key, val] of Object.entries(ALL_STORY_WORDS)) {
    if (val.type === 'noun') {
      _genderMap[key] = val.article === 'der' ? 'M' : val.article === 'die' ? 'F' : 'N';
      addVariations(key, val.article, val.cases, val.plural);
    }
  }

  // 4. Sentence Trainer Vocab
  for (const unit of SENTENCE_UNITS) {
    if (!unit?.vocab) continue;
    for (const v of unit.vocab) {
      if (!v.gender) continue;
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

const ARTICLES_SET = new Set([
  'der', 'die', 'das', 'den', 'dem', 'des', 'ein', 'eine', 'einen', 'einem', 'einer',
  'kein', 'keine', 'keinen', 'keinem', 'keiner', 'mein', 'meine', 'meinen', 'meinem', 'meiner',
  'dein', 'deine', 'deinen', 'deinem', 'deiner', 'ihr', 'ihre', 'ihren', 'ihrem', 'ihrer',
  'sein', 'seine', 'seinen', 'seinem', 'seiner', 'unser', 'unsere', 'unseren', 'unserem', 'unserer',
  'euer', 'eure', 'euren', 'eurem', 'eurer'
]);

const PREPOSITIONS_SET = new Set([
  'mit', 'aus', 'bei', 'nach', 'seit', 'von', 'zu',
  'durch', 'für', 'ohne', 'um', 'gegen',
  'in', 'an', 'auf', 'neben', 'hinter', 'über', 'unter', 'vor', 'zwischen',
  'im', 'am', 'zum', 'zur', 'beim', 'vom', 'ans', 'ins'
]);

export function GenderText({ text, className = '', extraMap = null }) {
  if (!text) return <span className={className}></span>;

  const genderMap = getGenderMap();
  const map = extraMap ? { ...genderMap, ...extraMap } : genderMap;

  // Split text by words and non-words. [A-Za-zÄÖÜäöüß]+ matches German words.
  const tokens = text.split(/([A-Za-zÄÖÜäöüß]+)/);
  const colors = new Array(tokens.length).fill(null);

  // Robust Backward Chunker (finds Nouns and looks backwards for Adjectives/Articles/Prepositions)
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (!token) continue;

    // Check if it's a capitalized word
    if (/^[A-Za-zÄÖÜäöüß]+$/.test(token) && /^[A-ZÄÖÜ]/.test(token)) {
      const gender = map[token];
      if (gender) {
        colors[i] = gender; // Color the noun itself First

        let tempIndices = [];
        let foundArticle = false;
        let foundPrep = false;

        // Traverse backward from the Noun
        for (let j = i - 1; j >= 0; j--) {
          const tok = tokens[j];
          if (!tok) continue;

          if (/^[A-Za-zÄÖÜäöüß]+$/.test(tok)) {
            // Found a word
            const lowerTok = tok.toLowerCase();
            const isArticle = ARTICLES_SET.has(lowerTok);
            const isPrep = PREPOSITIONS_SET.has(lowerTok);
            const isCap = /^[A-ZÄÖÜ]/.test(tok);

            if (isArticle) {
              if (foundArticle || foundPrep) break; // Cannot chain article before prep or another article
              foundArticle = true;

              tempIndices.push(j);
              for (const idx of tempIndices) colors[idx] = gender; // Commit chunk!
              tempIndices = [];

              if (isCap) break; // Start of sentence with article
            } else if (isPrep) {
              if (foundPrep) break;
              foundPrep = true;

              tempIndices.push(j);
              for (const idx of tempIndices) colors[idx] = gender; // Commit chunk!
              tempIndices = [];

              if (isCap) break; // Start of sentence with prep
            } else {
              // Non-trigger word
              if (isCap) {
                break; // Hit another capitalized word (noun or unknown). Stop absorbing.
              } else {
                if (foundArticle || foundPrep) break; // Lowercase words (adjectives) cannot precede articles/preps
                tempIndices.push(j); // Accept adjective/lowercase word into temp buffer
              }
            }
          } else {
            // Punctuation and Whitespace
            if (/^[.,!?;\:]+$/.test(tok.trim()) && tok.trim() !== ',') {
              break; // Hard punctuation stop (allow commas for lists of adjectives)
            }
            tempIndices.push(j);
          }
        }
      }
    }
  }

  // Build the final React Elements grouped by contiguous coloring blocks
  const result = [];
  let currentBlock = [];
  let currentColor = null;

  for (let i = 0; i < tokens.length; i++) {
    const tok = tokens[i];
    if (!tok) continue;

    if (colors[i] === currentColor) {
      currentBlock.push(tok);
    } else {
      if (currentBlock.length > 0) {
        if (currentColor) {
          result.push(
            <span key={`block-${i}`} className={GENDER_COLORS[currentColor].text}>
              {currentBlock.join('')}
            </span>
          );
        } else {
          result.push(currentBlock.join(''));
        }
      }
      currentColor = colors[i];
      currentBlock = [tok];
    }
  }

  // Push the final uncommitted block
  if (currentBlock.length > 0) {
    if (currentColor) {
      result.push(
        <span key={`block-end`} className={GENDER_COLORS[currentColor].text}>
          {currentBlock.join('')}
        </span>
      );
    } else {
      result.push(currentBlock.join(''));
    }
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
