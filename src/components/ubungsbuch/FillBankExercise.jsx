/**
 * FillBankExercise — Exercise 1
 * Numbered blanks {N} inside dialog lines. Word bank on the side.
 * Click a word in the bank → click the blank number to fill it.
 * Prefilled blanks (e.g. index 0) shown as teal examples.
 */
import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

function renderLine(text, filled, prefilled, checked, answers, onBlankClick, activeBlank) {
  // Replace {N} with interactive blank elements
  const parts = text.split(/(\{\d+\})/g);
  return parts.map((part, i) => {
    const match = part.match(/^\{(\d+)\}$/);
    if (!match) return <span key={i}>{part}</span>;
    const idx = parseInt(match[1]);
    const isPre = prefilled.includes(idx);
    const value = filled[idx];
    const isActive = activeBlank === idx;
    const correct = checked ? (value?.toLowerCase() === answers[idx]?.toLowerCase()) : null;

    if (isPre) {
      return (
        <span key={i} className="inline-flex items-center">
          <span className="text-gray-400 text-xs align-sub mr-0.5">({idx})</span>
          <span className="px-2 py-0.5 rounded bg-cyan-900/40 border border-cyan-600/60 text-cyan-300 font-semibold text-sm mx-0.5">
            {answers[idx]}
          </span>
        </span>
      );
    }

    return (
      <span key={i} className="inline-flex items-center">
        <span className="text-gray-400 text-xs align-sub mr-0.5">({idx})</span>
        <span className="relative group/blank inline-flex">
          <button
            onClick={() => onBlankClick(idx)}
            title={checked && correct === false ? `✓ ${answers[idx]}` : undefined}
            className={[
              'px-2 py-0.5 rounded border text-sm mx-0.5 min-w-[52px] transition-all',
              isActive ? 'border-yellow-400 bg-yellow-900/30 text-yellow-200 font-semibold' : '',
              !value && !isActive ? 'border-dashed border-gray-600 text-gray-500 bg-gray-800/40' : '',
              value && !checked && !isActive ? 'border-cyan-600/70 bg-cyan-900/20 text-cyan-200 font-semibold' : '',
              checked && correct ? 'border-emerald-500 bg-emerald-900/20 text-emerald-300 font-semibold' : '',
              checked && correct === false ? 'border-rose-500 bg-rose-900/20 text-rose-300 font-semibold cursor-help' : '',
            ].join(' ')}
          >
            {value || <span className="opacity-30">___</span>}
            {checked && correct === false && (
              <span className="block text-xs text-emerald-400 font-normal">{answers[idx]}</span>
            )}
          </button>
          {checked && correct === false && (
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-emerald-800 text-emerald-200 text-xs rounded-lg whitespace-nowrap opacity-0 group-hover/blank:opacity-100 pointer-events-none transition-opacity z-10">
              ✓ {answers[idx]}
            </span>
          )}
        </span>
      </span>
    );
  });
}

export default function FillBankExercise({ exercise, onComplete }) {
  const { answers, prefilled = [], wordBank, dialogs, sideNote } = exercise;
  const [filled, setFilled] = useState({});
  const [activeBlank, setActiveBlank] = useState(null); // which blank we're filling
  const [checked, setChecked] = useState(false);

  const handleBlankClick = (idx) => {
    if (checked) return;
    setActiveBlank(prev => prev === idx ? null : idx);
  };

  const handleWordClick = (word) => {
    if (checked || activeBlank === null) return;
    setFilled(prev => ({ ...prev, [activeBlank]: word }));
    // Move to next unfilled blank
    const allBlanks = answers.map((_, i) => i).filter(i => !prefilled.includes(i));
    const currentPos = allBlanks.indexOf(activeBlank);
    const next = allBlanks.slice(currentPos + 1).find(i => !filled[i] && i !== activeBlank);
    setActiveBlank(next ?? null);
  };

  const handleCheck = () => setChecked(true);

  const nonPreFilledCount = answers.filter((_, i) => !prefilled.includes(i)).length;
  const correctCount = answers.filter((_, i) => !prefilled.includes(i) && filled[i]?.toLowerCase() === answers[i]?.toLowerCase()).length;
  const allFilled = answers.every((_, i) => prefilled.includes(i) || !!filled[i]);
  const score = Math.round((correctCount / nonPreFilledCount) * 100);

  return (
    <div className="flex flex-col gap-4">
      {/* Row: dialog (left, wide) + word bank (right, fixed) */}
      <div className="flex gap-4 flex-col md:flex-row items-start">

        {/* Main dialog area */}
        <div className="flex-1 min-w-0 space-y-3">
          {dialogs.map((dialog, di) => (
            <div key={di} className="bg-gray-800/60 rounded-xl p-4 border border-gray-700/40 space-y-2">
              {dialog.firstLinePrefilled && (
                <p className="text-sm text-gray-400 italic mb-1">{dialog.firstLineLabel}</p>
              )}
              {dialog.lines.map((line, li) => (
                <div key={li} className="flex gap-2 items-baseline">
                  <span className="text-cyan-500 font-bold text-sm w-4 flex-shrink-0">{line.speaker}</span>
                  <p className="text-sm text-gray-200 leading-7 flex flex-wrap items-baseline gap-x-0.5 gap-y-1">
                    {renderLine(line.text, filled, prefilled, checked, answers, handleBlankClick, activeBlank)}
                  </p>
                </div>
              ))}
            </div>
          ))}

          {sideNote && (
            <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-xl p-3 text-xs text-yellow-300/80">
              <span className="font-semibold block mb-1 text-yellow-400">📞 Poznámka:</span>
              {sideNote}
            </div>
          )}
        </div>

        {/* Word bank sidebar — fixed width, does NOT shrink dialog */}
        <div className="md:w-44 w-full shrink-0">
          <div className="bg-gray-800/50 rounded-xl p-3 border border-gray-700/40 md:sticky md:top-4">
            <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">Slová</p>
            <div className="flex flex-col gap-1.5 md:max-h-96 md:overflow-y-auto">
              {wordBank.map((word, i) => (
                <button
                  key={i}
                  onClick={() => handleWordClick(word)}
                  disabled={checked || activeBlank === null}
                  className={[
                    'px-3 py-1.5 rounded-lg text-sm border transition-all text-left',
                    activeBlank !== null && !checked ? 'hover:border-cyan-500 hover:text-cyan-200 cursor-pointer' : '',
                    activeBlank === null && !checked ? 'cursor-default opacity-60' : '',
                    'bg-gray-700/60 border-gray-600 text-gray-200',
                    checked ? 'opacity-50 cursor-not-allowed' : '',
                  ].join(' ')}
                >
                  {word}
                </button>
              ))}
            </div>
            {activeBlank !== null && !checked && (
              <p className="text-xs text-yellow-400 mt-2">Výber pre ({activeBlank})</p>
            )}
            {activeBlank === null && !checked && (
              <p className="text-xs text-gray-600 mt-2">Klikni na políčko</p>
            )}
          </div>
        </div>
      </div>

      {/* Footer — always full-width below the two columns */}
      <div>
        {!checked ? (
          <button
            onClick={handleCheck}
            disabled={!allFilled}
            className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white text-sm font-semibold rounded-xl transition-all"
          >
            Skontrolovať
          </button>
        ) : (
          <div className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${score >= 80 ? 'bg-emerald-900/40 border border-emerald-700/40 text-emerald-300' : 'bg-amber-900/40 border border-amber-700/40 text-amber-300'}`}>
            <CheckCircle size={18} />
            {correctCount} / {nonPreFilledCount} správnych — {score}%
            <button onClick={() => onComplete(score)} className="ml-auto text-xs underline opacity-70 hover:opacity-100">Ďalej →</button>
          </div>
        )}
      </div>
    </div>
  );
}
