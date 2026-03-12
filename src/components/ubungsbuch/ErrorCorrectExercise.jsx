/**
 * ErrorCorrectExercise — Exercise 4: Hoppla – Fehler Fehler!
 * Shows dialog with wrong forms struck-through. User types the correct form.
 * Prefilled items show the example correction in teal.
 */
import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

export default function ErrorCorrectExercise({ exercise, onComplete }) {
  const { dialog } = exercise;

  // Collect all correctable positions
  const blanks = dialog.flatMap(line =>
    line.segments.filter(s => s.wrong && !s.prefilled)
  );

  const [inputs, setInputs] = useState({});
  const [checked, setChecked] = useState(false);

  const setInput = (num, val) => setInputs(prev => ({ ...prev, [num]: val }));

  const handleCheck = () => setChecked(true);

  const total = blanks.length;
  const correctCount = blanks.filter(b => (inputs[b.num] || '').trim().toLowerCase() === b.correct.toLowerCase()).length;
  const score = Math.round((correctCount / total) * 100);

  return (
    <div className="space-y-4">
      {dialog.map((line, li) => (
        <div key={li} className="flex gap-2 items-start bg-gray-800/60 rounded-xl px-4 py-3 border border-gray-700/40">
          <span className="text-cyan-500 font-bold text-sm w-4 flex-shrink-0 mt-0.5">{line.speaker}</span>
          <p className="text-sm text-gray-200 leading-7 flex flex-wrap items-baseline gap-0.5">
            {line.segments.map((seg, si) => {
              if (!seg.wrong) {
                return <span key={si}>{seg.text}</span>;
              }
              if (seg.prefilled) {
                // Example: show wrong struck-through + correct in teal
                return (
                  <span key={si} className="inline-flex items-baseline gap-1 mx-0.5">
                    <span className="text-gray-500 text-xs">({seg.num})</span>
                    <span className="line-through text-rose-400/60 text-sm">{seg.wrong}</span>
                    <span className="text-cyan-300 font-semibold text-sm">{seg.correct}</span>
                  </span>
                );
              }
              // Interactive blank
              const val = inputs[seg.num] || '';
              const correct = checked ? val.trim().toLowerCase() === seg.correct.toLowerCase() : null;
              return (
                <span key={si} className="inline-flex items-baseline gap-1 mx-0.5">
                  <span className="text-gray-500 text-xs">({seg.num})</span>
                  <span className="line-through text-rose-400/60 text-sm">{seg.wrong}</span>
                  <span className="relative group/err">
                    <input
                      type="text"
                      value={val}
                      onChange={e => !checked && setInput(seg.num, e.target.value)}
                      disabled={checked}
                      placeholder="?"
                      title={checked && !correct ? `✓ ${seg.correct}` : undefined}
                      className={[
                        'w-20 text-center text-sm px-1 py-0.5 rounded border outline-none bg-gray-800 transition-all',
                        !checked ? 'border-gray-600 focus:border-cyan-500 text-white' : '',
                        checked && correct ? 'border-emerald-500 text-emerald-300 bg-emerald-900/20' : '',
                        checked && !correct ? 'border-rose-400 text-rose-300 bg-rose-900/20 cursor-help' : '',
                      ].join(' ')}
                    />
                    {checked && !correct && (
                      <>
                        <span className="absolute -bottom-4 left-0 right-0 text-center text-xs text-emerald-400 whitespace-nowrap">{seg.correct}</span>
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-emerald-800 text-emerald-200 text-xs rounded-lg whitespace-nowrap opacity-0 group-hover/err:opacity-100 pointer-events-none transition-opacity z-10">
                          ✓ {seg.correct}
                        </span>
                      </>
                    )}
                  </span>
                </span>
              );
            })}
          </p>
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
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${score >= 80 ? 'bg-emerald-900/40 border border-emerald-700/40 text-emerald-300' : 'bg-amber-900/40 border border-amber-700/40 text-amber-300'}`}>
          <CheckCircle size={18} />
          {correctCount} / {total} správnych — {score}%
          <button onClick={() => onComplete(score)} className="ml-auto text-xs underline opacity-70 hover:opacity-100">Ďalej →</button>
        </div>
      )}
    </div>
  );
}
