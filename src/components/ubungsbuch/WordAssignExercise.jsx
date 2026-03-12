/**
 * WordAssignExercise — START C
 * Click a word from the bank, then click a slot to assign it.
 * E.g. "Ich bin ..." and "Ich habe ..." with a word bank.
 */
import React, { useState } from 'react';
import { CheckCircle, X } from 'lucide-react';

export default function WordAssignExercise({ exercise, onComplete }) {
  const { slots, wordBank } = exercise;
  // assigned[slotId] = word | null
  const [assigned, setAssigned] = useState(() => Object.fromEntries(slots.map(s => [s.id, null])));
  const [selected, setSelected] = useState(null); // word in hand
  const [checked, setChecked] = useState(false);

  const usedWords = new Set(Object.values(assigned).filter(Boolean));

  const handleWordClick = (word) => {
    if (checked) return;
    setSelected(prev => prev === word ? null : word);
  };

  const handleSlotClick = (slotId) => {
    if (checked) return;
    if (!selected) {
      // Unassign if already assigned
      if (assigned[slotId]) {
        setAssigned(prev => ({ ...prev, [slotId]: null }));
      }
      return;
    }
    setAssigned(prev => ({ ...prev, [slotId]: selected }));
    setSelected(null);
  };

  const handleCheck = () => setChecked(true);

  const allFilled = slots.every(s => assigned[s.id]);

  const score = (() => {
    let c = 0;
    slots.forEach(s => { if (assigned[s.id] === s.answer) c++; });
    return Math.round((c / slots.length) * 100);
  })();

  return (
    <div className="space-y-5">
      {/* Slots */}
      <div className="space-y-3">
        {slots.map(slot => {
          const word = assigned[slot.id];
          const isCorrect = checked ? word === slot.answer : null;
          return (
            <div key={slot.id} className="flex items-center gap-3">
              <span className="text-gray-300 text-sm font-medium min-w-[70px]">{slot.stem}</span>
              <span className="text-gray-500 text-sm italic mr-1">...</span>
              <button
                onClick={() => handleSlotClick(slot.id)}
                title={word && checked && !isCorrect ? `✓ ${slot.answer}` : undefined}
              className={[
                  'relative min-w-[160px] px-4 py-2 rounded-xl border text-sm font-medium transition-all',
                  !word ? 'border-dashed border-gray-600 text-gray-500 bg-gray-800/40' : '',
                  word && !checked ? 'border-cyan-600 text-cyan-200 bg-cyan-900/30' : '',
                  word && checked && isCorrect ? 'border-emerald-500 text-emerald-300 bg-emerald-900/20' : '',
                  word && checked && !isCorrect ? 'border-rose-500 text-rose-300 bg-rose-900/20 cursor-help' : '',
                ].join(' ')}
              >
                {word || <span className="opacity-40">klikni pre priradenie</span>}
              </button>
              {checked && !isCorrect && word && (
                <span className="text-xs text-emerald-400">✓ {slot.answer}</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Word bank */}
      <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/40">
        <p className="text-xs text-gray-500 mb-3 uppercase tracking-wide">Slová na priradenie</p>
        <div className="flex flex-wrap gap-2">
          {wordBank.map((word, i) => {
            const isUsed = usedWords.has(word);
            const isSelected = selected === word;
            return (
              <button
                key={i}
                onClick={() => handleWordClick(word)}
                disabled={checked || isUsed}
                className={[
                  'px-3 py-1.5 rounded-lg text-sm border transition-all',
                  isSelected ? 'bg-cyan-600 border-cyan-500 text-white font-semibold scale-105' : '',
                  !isSelected && !isUsed && !checked ? 'bg-gray-700/60 border-gray-600 text-gray-200 hover:border-cyan-500 hover:text-cyan-200' : '',
                  isUsed ? 'opacity-30 bg-gray-800 border-gray-700 text-gray-500 cursor-not-allowed' : '',
                ].join(' ')}
              >
                {word}
              </button>
            );
          })}
        </div>
        {selected && <p className="text-xs text-cyan-400 mt-2">„{selected}" je vybrané — klikni na políčko pre priradenie</p>}
      </div>

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
          {slots.filter(s => assigned[s.id] === s.answer).length} / {slots.length} správnych — {score}%
          <button onClick={() => onComplete(score)} className="ml-auto text-xs underline opacity-70 hover:opacity-100">Ďalej →</button>
        </div>
      )}
    </div>
  );
}
