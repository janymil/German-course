/**
 * DualSelectExercise — Exercise 2: sein oder nicht sein?
 * For each item, click one of two options (or both if bothOk=true).
 */
import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

function renderLine(text, chosen, options, checked, correct, bothOk, onChoose) {
  if (!text.includes('{?}')) return <span>{text}</span>;
  const [before, after] = text.split('{?}');
  return (
    <>
      <span>{before}</span>
      <span className="inline-flex gap-1 mx-1">
        {options.map((opt, i) => {
          const isChosen = chosen.includes(opt);
          const isCorrectOpt = correct.includes(opt);
          let cls = 'px-2.5 py-0.5 rounded-lg border text-sm font-semibold transition-all cursor-pointer ';
          if (!checked) {
            cls += isChosen
              ? 'bg-cyan-600 border-cyan-500 text-white'
              : 'bg-gray-700/60 border-gray-600 text-gray-300 hover:border-cyan-500 hover:text-cyan-200';
          } else {
            if (isCorrectOpt) {
              cls += 'bg-emerald-700/40 border-emerald-500 text-emerald-200 ';
              if (isChosen) cls += 'ring-1 ring-emerald-400 ';
            } else {
              cls += isChosen
                ? 'bg-rose-700/40 border-rose-500 text-rose-300 line-through cursor-help '
                : 'bg-gray-800/30 border-gray-700 text-gray-500 ';
            }
          }
          const wrongChosen = checked && isChosen && !isCorrectOpt;
          return (
            <span key={i} className="relative group/dual inline-block">
              <button
                onClick={() => !checked && onChoose(opt)}
                title={wrongChosen ? `✓ ${correct.join(' / ')}` : undefined}
                className={cls}
              >
                {opt}
              </button>
              {wrongChosen && (
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-emerald-800 text-emerald-200 text-xs rounded-lg whitespace-nowrap opacity-0 group-hover/dual:opacity-100 pointer-events-none transition-opacity z-10">
                  ✓ {correct.join(' / ')}
                </span>
              )}
            </span>
          );
        })}
      </span>
      <span>{after}</span>
    </>
  );
}

export default function DualSelectExercise({ exercise, onComplete }) {
  const { items } = exercise;
  // chosen[itemId] = array of selected options
  const [chosen, setChosen] = useState({});
  const [checked, setChecked] = useState(false);

  const toggle = (itemId, opt, bothOk) => {
    setChosen(prev => {
      const cur = prev[itemId] || [];
      if (cur.includes(opt)) return { ...prev, [itemId]: cur.filter(x => x !== opt) };
      if (bothOk) return { ...prev, [itemId]: [...cur, opt] };
      return { ...prev, [itemId]: [opt] };
    });
  };

  const handleCheck = () => setChecked(true);

  const nonExamples = items.filter(it => !it.example);
  const correctCount = nonExamples.filter(it => {
    const c = chosen[it.id] || [];
    if (it.bothOk) return it.correct.every(x => c.includes(x));
    return c.length === 1 && c[0] === it.correct[0];
  }).length;
  const score = Math.round((correctCount / nonExamples.length) * 100);

  return (
    <div className="space-y-2">
      {items.map((item, idx) => {
        const c = chosen[item.id] || [];
        const isExample = item.example;
        const isRight = checked && (() => {
          if (item.bothOk) return item.correct.every(x => c.includes(x));
          return c.length === 1 && c[0] === item.correct[0];
        })();

        return (
          <div
            key={item.id}
            className={[
              'flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all',
              isExample ? 'bg-cyan-900/20 border-cyan-700/40' : 'bg-gray-800/50 border-gray-700/40',
              checked && !isExample && isRight ? 'border-emerald-700/50' : '',
              checked && !isExample && !isRight ? 'border-rose-700/40' : '',
            ].join(' ')}
          >
            <span className="text-gray-500 text-xs w-4 flex-shrink-0">{idx}.</span>
            <span className="flex-1 text-sm text-gray-200 flex flex-wrap items-center">
              {isExample ? (
                <span>
                  {item.line.replace('{?}', '')}
                  <span className="inline-flex gap-1 mx-1">
                    {item.options.map((opt, i) => (
                      <span key={i} className={`px-2.5 py-0.5 rounded-lg border text-sm font-semibold ${item.correct.includes(opt) ? 'bg-emerald-700/40 border-emerald-500 text-emerald-200' : 'bg-gray-700/40 border-gray-600 text-gray-500 line-through'}`}>
                        {opt}
                      </span>
                    ))}
                  </span>
                </span>
              ) : (
                renderLine(item.line, c, item.options, checked, item.correct, item.bothOk, (opt) => toggle(item.id, opt, item.bothOk))
              )}
            </span>
            <span className="text-gray-400 text-sm italic flex-shrink-0">{item.response}</span>
            {item.bothOk && (
              <span className="text-xs text-amber-400/70 ml-1" title="Obe formy sú správne">★</span>
            )}
            {item.note && checked && (
              <span className="block text-xs text-gray-500 ml-2">{item.note}</span>
            )}
          </div>
        );
      })}

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
          {correctCount} / {nonExamples.length} správnych — {score}%
          {exercise.items.some(i => i.bothOk) && (
            <span className="text-xs text-amber-400/70 ml-2">★ = obe formy sú správne</span>
          )}
          <button onClick={() => onComplete(score)} className="ml-auto text-xs underline opacity-70 hover:opacity-100">Ďalej →</button>
        </div>
      )}
    </div>
  );
}
