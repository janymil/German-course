/**
 * MarkVerbsExercise — START A
 * Click each form of "sein" or "haben" to highlight it.
 */
import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

const VERB_COLORS = {
  sein:  { bg: 'bg-cyan-500/20 border-cyan-400 text-cyan-300', label: 'sein',  dot: 'bg-cyan-400' },
  haben: { bg: 'bg-amber-500/20 border-amber-400 text-amber-300', label: 'haben', dot: 'bg-amber-400' },
};

function tokenize(text) {
  // Split on spaces but keep punctuation attached to word
  return text.split(/(\s+)/).filter(t => t.length > 0);
}

function normalizeWord(w) {
  return w.replace(/[^a-zA-ZäöüÄÖÜß]/g, '').toLowerCase();
}

export default function MarkVerbsExercise({ exercise, onComplete }) {
  // clicked[bubbleText][wordIndex] = 'sein' | 'haben' | null
  const [clicked, setClicked] = useState({});
  const [checked, setChecked] = useState(false);
  const [result, setResult] = useState(null);

  const answers = exercise.answers;

  const toggle = (bubbleText, wordIdx, rawWord) => {
    if (checked) return;
    const norm = normalizeWord(rawWord);
    // Determine which class this word belongs to
    const verbAnswers = answers[bubbleText] || [];
    const match = verbAnswers.find(a => normalizeWord(a.word) === norm);
    if (!match) return; // Not a verb — don't allow clicking non-verbs

    setClicked(prev => {
      const key = bubbleText;
      const cur = prev[key] || {};
      return { ...prev, [key]: { ...cur, [wordIdx]: cur[wordIdx] ? null : match.verbClass } };
    });
  };

  const handleCheck = () => {
    let correct = 0;
    let total = 0;
    Object.entries(answers).forEach(([bubbleText, verbList]) => {
      verbList.forEach(({ word, verbClass }) => {
        total++;
        const bubbleClicked = clicked[bubbleText] || {};
        // Find token index for this word
        const tokens = tokenize(bubbleText);
        const idx = tokens.findIndex(t => normalizeWord(t) === normalizeWord(word));
        if (idx >= 0 && bubbleClicked[idx] === verbClass) correct++;
      });
    });
    const score = Math.round((correct / total) * 100);
    setResult({ correct, total, score });
    setChecked(true);
  };

  const isVerbToken = (bubbleText, rawWord) => {
    const verbAnswers = answers[bubbleText] || [];
    const norm = normalizeWord(rawWord);
    return verbAnswers.find(a => normalizeWord(a.word) === norm);
  };

  return (
    <div className="space-y-4">
      {/* Legend */}
      <div className="flex gap-4 text-xs mb-2">
        {Object.entries(VERB_COLORS).map(([k, v]) => (
          <span key={k} className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${v.dot}`} />
            <span className="text-gray-300">{v.label}</span>
          </span>
        ))}
        <span className="text-gray-500 ml-2">Klikni na formy slovies</span>
      </div>

      {exercise.dialogs.map(dialog => (
        <div key={dialog.id} className="bg-gray-800/60 rounded-xl p-4 space-y-2 border border-gray-700/40">
          {dialog.bubbles.map((bubble, bi) => (
            <div key={bi} className="flex gap-2 items-start">
              <span className="text-gray-500 text-xs w-6 flex-shrink-0 mt-1">{bubble.speaker === 'phone' ? '📞' : bubble.speaker}</span>
              <p className="text-sm text-gray-200 leading-relaxed flex flex-wrap gap-x-1 gap-y-0.5">
                {tokenize(bubble.text).map((token, ti) => {
                  const isSpace = /^\s+$/.test(token);
                  if (isSpace) return <span key={ti}> </span>;
                  const verbMatch = isVerbToken(bubble.text, token);
                  const currentClass = (clicked[bubble.text] || {})[ti];
                  const colorCfg = currentClass ? VERB_COLORS[currentClass] : null;
                  const isCorrect = checked && verbMatch && currentClass === verbMatch.verbClass;
                  const isMissed = checked && verbMatch && !currentClass;
                  const isWrong = checked && verbMatch && currentClass && currentClass !== verbMatch.verbClass;
                  const showTooltip = isMissed || isWrong;
                  return (
                    <span
                      key={ti}
                      onClick={() => toggle(bubble.text, ti, token)}
                      title={showTooltip ? `✓ ${verbMatch.verbClass}` : undefined}
                      className={[
                        'relative group/verb inline-block px-0.5 rounded transition-all select-none',
                        verbMatch ? 'cursor-pointer' : '',
                        colorCfg ? `border ${colorCfg.bg} font-semibold` : '',
                        isCorrect ? 'ring-1 ring-emerald-400' : '',
                        isMissed ? 'ring-1 ring-rose-400/70 bg-rose-500/10 cursor-help' : '',
                        isWrong ? 'ring-1 ring-rose-500 bg-rose-600/20 cursor-help' : '',
                      ].join(' ')}
                    >
                      {token}
                      {showTooltip && (
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-0.5 bg-emerald-800 text-emerald-200 text-xs rounded-lg whitespace-nowrap opacity-0 group-hover/verb:opacity-100 pointer-events-none transition-opacity z-10">
                          ✓ {verbMatch.verbClass}
                        </span>
                      )}
                    </span>
                  );
                })}
              </p>
            </div>
          ))}
        </div>
      ))}

      {!checked ? (
        <button
          onClick={handleCheck}
          className="mt-2 px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold rounded-xl transition-all"
        >
          Skontrolovať
        </button>
      ) : (
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${result.score >= 80 ? 'bg-emerald-900/40 border border-emerald-700/40 text-emerald-300' : 'bg-amber-900/40 border border-amber-700/40 text-amber-300'}`}>
          <CheckCircle size={18} />
          {result.correct} / {result.total} správnych — {result.score}%
          <button onClick={() => { onComplete(result.score); }} className="ml-auto text-xs underline opacity-70 hover:opacity-100">Ďalej →</button>
        </div>
      )}
    </div>
  );
}
