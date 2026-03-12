/**
 * ConjugationTableExercise — START B
 * Fill in the conjugation table by typing or clicking from dropdown.
 */
import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

export default function ConjugationTableExercise({ exercise, onComplete }) {
  const { table } = exercise;
  // inputs[verbIndex][pronounIndex] = string
  const initInputs = () =>
    table.verbs.map(v => v.forms.map(f => f.prefilled ? f.form : ''));
  const [inputs, setInputs] = useState(initInputs);
  const [checked, setChecked] = useState(false);

  const set = (vi, fi, val) => {
    if (checked) return;
    setInputs(prev => prev.map((vRow, i) => i === vi ? vRow.map((cell, j) => j === fi ? val : cell) : vRow));
  };

  const handleCheck = () => setChecked(true);

  const isCorrect = (vi, fi) => {
    const answer = table.verbs[vi].forms[fi].form;
    return inputs[vi][fi].trim().toLowerCase() === answer.toLowerCase();
  };

  const correctCount = table.verbs.reduce((acc, v, vi) =>
    acc + v.forms.reduce((a2, f, fi) => a2 + (f.prefilled ? 0 : (isCorrect(vi, fi) ? 1 : 0)), 0), 0);
  const totalCount = table.verbs.reduce((acc, v) => acc + v.forms.filter(f => !f.prefilled).length, 0);
  const score = Math.round((correctCount / totalCount) * 100);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            <th className="pb-2 pr-4 text-left text-gray-500 font-normal"></th>
            {table.verbs.map(v => (
              <th key={v.verb} className="pb-2 px-4 text-center text-cyan-400 font-bold text-base">{v.verb}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.pronouns.map((pronoun, fi) => (
            <tr key={pronoun} className="border-t border-gray-700/40">
              <td className="py-2 pr-4 text-gray-400 font-medium w-24">{pronoun}</td>
              {table.verbs.map((v, vi) => {
                const form = v.forms[fi];
                const val = inputs[vi][fi];
                const correct = checked ? isCorrect(vi, fi) : null;
                if (form.prefilled) {
                  return (
                    <td key={vi} className="py-2 px-4 text-center">
                      <span className="text-cyan-400 font-semibold">{form.form}</span>
                    </td>
                  );
                }
                return (
                  <td key={vi} className="py-2 px-4 text-center">
                    <div className="relative group/cell">
                      <input
                        type="text"
                        value={val}
                        onChange={e => set(vi, fi, e.target.value)}
                        disabled={checked}
                        placeholder="..."
                        title={checked && !correct ? `✓ ${form.form}` : undefined}
                        className={[
                          'w-24 text-center px-2 py-1 rounded-lg border text-sm bg-gray-800 outline-none transition-all',
                          !checked ? 'border-gray-600 focus:border-cyan-500 text-white' : '',
                          checked && correct ? 'border-emerald-500 text-emerald-300 bg-emerald-900/20' : '',
                          checked && !correct ? 'border-rose-500 text-rose-300 bg-rose-900/20 cursor-help' : '',
                        ].join(' ')}
                      />
                      {checked && !correct && (
                        <>
                          <div className="text-xs text-emerald-400 mt-0.5">{form.form}</div>
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-emerald-800 text-emerald-200 text-xs rounded-lg whitespace-nowrap opacity-0 group-hover/cell:opacity-100 pointer-events-none transition-opacity z-10">
                            ✓ {form.form}
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {!checked ? (
        <button
          onClick={handleCheck}
          disabled={inputs.some((vRow, vi) => vRow.some((cell, fi) => !table.verbs[vi].forms[fi].prefilled && !cell.trim()))}
          className="mt-4 px-5 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white text-sm font-semibold rounded-xl transition-all"
        >
          Skontrolovať
        </button>
      ) : (
        <div className={`mt-4 flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${score >= 80 ? 'bg-emerald-900/40 border border-emerald-700/40 text-emerald-300' : 'bg-amber-900/40 border border-amber-700/40 text-amber-300'}`}>
          <CheckCircle size={18} />
          {correctCount} / {totalCount} správnych — {score}%
          <button onClick={() => onComplete(score)} className="ml-auto text-xs underline opacity-70 hover:opacity-100">Ďalej →</button>
        </div>
      )}
    </div>
  );
}
