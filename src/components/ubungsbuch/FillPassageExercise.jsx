/**
 * FillPassageExercise — Exercise 3: Was für Fragen
 * Multiple paragraphs, each with numbered {N} blanks.
 * No pre-made word bank — user types into each blank.
 */
import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

const SPEAKER_ICONS = {
  boy: '👦',
  girl: '👩',
  family: '👨‍👩‍👧',
};

function buildAnswersMap(passage) {
  // Support both answersMap and answers (array) format
  if (passage.answersMap) return passage.answersMap;
  if (passage.answers) {
    const map = {};
    let idx = 0;
    passage.text.replace(/\{(\d+)\}/g, (_, n) => {
      map[parseInt(n)] = passage.answers[idx++];
    });
    return map;
  }
  return {};
}

function renderPassageText(text, inputs, answersMap, checked, onInput) {
  const parts = text.split(/(\{\d+\})/g);
  return parts.map((part, i) => {
    const m = part.match(/^\{(\d+)\}$/);
    if (!m) return <span key={i}>{part}</span>;
    const idx = parseInt(m[1]);
    const val = inputs[idx] || '';
    const answer = answersMap[idx] || '';
    const correct = checked ? val.trim().toLowerCase() === answer.toLowerCase() : null;

    return (
      <span key={i} className="inline-flex items-baseline gap-0.5">
        <span className="text-gray-500 text-xs">({idx})</span>
        <span className="relative inline-block group/pass">
          <input
            type="text"
            value={val}
            onChange={e => !checked && onInput(idx, e.target.value)}
            disabled={checked}
            placeholder="___"
            title={checked && !correct ? `✓ ${answer}` : undefined}
            className={[
              'w-20 text-center text-sm px-1 py-0.5 rounded border outline-none bg-gray-800 transition-all',
              !checked ? 'border-gray-600 focus:border-cyan-500 text-white' : '',
              checked && correct ? 'border-emerald-500 text-emerald-300 bg-emerald-900/20' : '',
              checked && !correct ? 'border-rose-400 text-rose-300 bg-rose-900/20 cursor-help' : '',
            ].join(' ')}
          />
          {checked && !correct && (
            <>
              <span className="absolute -bottom-4 left-0 right-0 text-center text-xs text-emerald-400 whitespace-nowrap">{answer}</span>
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-emerald-800 text-emerald-200 text-xs rounded-lg whitespace-nowrap opacity-0 group-hover/pass:opacity-100 pointer-events-none transition-opacity z-10">
                ✓ {answer}
              </span>
            </>
          )}
        </span>
      </span>
    );
  });
}

export default function FillPassageExercise({ exercise, onComplete }) {
  const { passages } = exercise;
  const [inputs, setInputs] = useState({});
  const [checked, setChecked] = useState(false);

  const setInput = (idx, val) => setInputs(prev => ({ ...prev, [idx]: val }));

  const handleCheck = () => setChecked(true);

  const allMaps = passages.map(buildAnswersMap);
  const allEntries = allMaps.flatMap(map => Object.entries(map));
  const total = allEntries.length;
  const correct = allEntries.filter(([idx, ans]) => (inputs[parseInt(idx)] || '').trim().toLowerCase() === ans.toLowerCase()).length;
  const score = Math.round((correct / total) * 100);

  return (
    <div className="space-y-6">
      {passages.map((passage, pi) => {
        const answersMap = allMaps[pi];
        return (
          <div key={passage.id} className="bg-gray-800/60 rounded-xl p-4 border border-gray-700/40">
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0 mt-0.5">{SPEAKER_ICONS[passage.speakerImg] || '👤'}</span>
              <p className="text-sm text-gray-200 leading-8 flex flex-wrap items-baseline gap-x-1">
                {renderPassageText(passage.text, inputs, answersMap, checked, setInput)}
              </p>
            </div>
          </div>
        );
      })}

      {!checked ? (
        <button
          onClick={handleCheck}
          className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold rounded-xl transition-all"
        >
          Skontrolovať
        </button>
      ) : (
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${score >= 80 ? 'bg-emerald-900/40 border border-emerald-700/40 text-emerald-300' : 'bg-amber-900/40 border border-amber-700/40 text-amber-300'}`}>
          <CheckCircle size={18} />
          {correct} / {total} správnych — {score}%
          <button onClick={() => onComplete(score)} className="ml-auto text-xs underline opacity-70 hover:opacity-100">Ďalej →</button>
        </div>
      )}
    </div>
  );
}
