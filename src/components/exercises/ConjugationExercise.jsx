import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle, XCircle, Volume2 } from 'lucide-react';
import { useTTS } from '../../hooks/useTTS';
import { normalizeGerman } from '../../utils/text';

/**
 * ConjugationExercise — Student fills in a verb conjugation table.
 * 
 * Schema:
 * {
 *   type: 'conjugation',
 *   instruction: string,
 *   verbs: [
 *     {
 *       infinitive: string,       // e.g. 'sein'
 *       translation: string,      // e.g. 'byť'
 *       forms: [
 *         { pronoun: 'ich', correct: 'bin' },
 *         { pronoun: 'du', correct: 'bist' },
 *         { pronoun: 'er/sie/es', correct: 'ist' },
 *         { pronoun: 'wir', correct: 'sind' },
 *         { pronoun: 'ihr', correct: 'seid' },
 *         { pronoun: 'sie/Sie', correct: 'sind' },
 *       ],
 *       note: string,             // Grammar tip shown after checking
 *     }
 *   ]
 * }
 */
export function ConjugationExercise({ exercise, onComplete }) {
  const verbs = exercise.verbs || [];
  const [verbIndex, setVerbIndex] = useState(0);
  const [inputs, setInputs] = useState({});
  const [checked, setChecked] = useState(false);
  const [results, setResults] = useState([]);
  const [finished, setFinished] = useState(false);
  const inputRefs = useRef({});
  const { speak, stop } = useTTS();

  useEffect(() => () => stop(), []);

  useEffect(() => {
    if (!checked && !finished) {
      setInputs({});
      const firstRef = inputRefs.current[0];
      if (firstRef) setTimeout(() => firstRef.focus(), 100);
    }
  }, [verbIndex, checked, finished]);

  const verb = verbs[verbIndex];

  const checkAll = () => {
    if (checked) return;
    const forms = verb.forms;
    let correct = 0;
    const formResults = forms.map((f, i) => {
      const userVal = (inputs[i] || '').trim();
      const isCorrect = normalizeGerman(userVal) === normalizeGerman(f.correct);
      if (isCorrect) correct++;
      return { ...f, userVal, isCorrect };
    });
    setResults(r => [...r, { verb: verb.infinitive, correct, total: forms.length, formResults }]);
    setChecked(true);
    speak(`${verb.infinitive}`, 'de-DE', 0.85);
  };

  const next = () => {
    if (verbIndex + 1 < verbs.length) {
      setVerbIndex(verbIndex + 1);
      setChecked(false);
    } else {
      setFinished(true);
      const totalForms = results.reduce((s, r) => s + r.total, 0);
      const totalCorrect = results.reduce((s, r) => s + r.correct, 0);
      const score = totalForms > 0 ? Math.round((totalCorrect / totalForms) * 100) : 0;
      setTimeout(() => onComplete(score), 1200);
    }
  };

  const handleKeyDown = (e, formIndex) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!checked) {
        const nextIdx = formIndex + 1;
        if (nextIdx < verb.forms.length && inputRefs.current[nextIdx]) {
          inputRefs.current[nextIdx].focus();
        } else {
          checkAll();
        }
      } else {
        next();
      }
    }
  };

  if (finished) {
    const totalForms = results.reduce((s, r) => s + r.total, 0);
    const totalCorrect = results.reduce((s, r) => s + r.correct, 0);
    const score = totalForms > 0 ? Math.round((totalCorrect / totalForms) * 100) : 0;
    return (
      <div className="text-center py-8">
        <div className={`text-5xl font-bold mb-2 ${score >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>{score}%</div>
        <p className="text-gray-400">{totalCorrect} / {totalForms} správnych tvarov</p>
      </div>
    );
  }

  if (!verb) return null;

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div className="flex gap-1.5 mb-2">
        {verbs.map((_, i) => (
          <div key={i} className={`flex-1 h-1.5 rounded-full transition-all duration-300
            ${i < verbIndex ? 'bg-emerald-500' : i === verbIndex ? 'bg-indigo-500' : 'bg-gray-800'}`} />
        ))}
      </div>

      <p className="text-xs text-gray-500">Sloveso {verbIndex + 1} / {verbs.length}</p>

      {/* Verb header */}
      <div className="bg-gray-800/60 border border-gray-700/50 rounded-xl p-4 text-center">
        <div className="flex items-center justify-center gap-2">
          <p className="text-xl text-white font-bold">{verb.infinitive}</p>
          <button onClick={() => speak(verb.infinitive, 'de-DE', 0.85)} className="text-indigo-400 hover:text-indigo-300">
            <Volume2 size={18} />
          </button>
        </div>
        <p className="text-sm text-gray-400">({verb.translation})</p>
      </div>

      {/* Conjugation table */}
      <div className="bg-gray-900/50 rounded-xl border border-gray-700/30 overflow-hidden">
        <div className="grid grid-cols-2 gap-0">
          <div className="bg-gray-800/60 px-4 py-2 text-xs font-medium text-gray-400 border-b border-gray-700/30">Osoba</div>
          <div className="bg-gray-800/60 px-4 py-2 text-xs font-medium text-gray-400 border-b border-gray-700/30">Tvar slovesa</div>
          {verb.forms.map((form, i) => {
            const lastResult = checked && results[results.length - 1]?.formResults[i];
            return (
              <React.Fragment key={i}>
                <div className="px-4 py-2.5 border-b border-gray-800/50 flex items-center">
                  <span className="text-sm text-gray-300 font-medium">{form.pronoun}</span>
                </div>
                <div className="px-4 py-2 border-b border-gray-800/50 flex items-center gap-2">
                  {!checked ? (
                    <input
                      ref={el => inputRefs.current[i] = el}
                      type="text"
                      value={inputs[i] || ''}
                      onChange={e => setInputs({ ...inputs, [i]: e.target.value })}
                      onKeyDown={e => handleKeyDown(e, i)}
                      placeholder="..."
                      className="w-full bg-transparent border-b border-gray-700 text-white text-sm px-1 py-0.5 focus:border-indigo-500 outline-none placeholder-gray-600"
                      autoComplete="off"
                      spellCheck={false}
                    />
                  ) : lastResult ? (
                    <div className="flex items-center gap-2 w-full">
                      {lastResult.isCorrect ? (
                        <span className="text-emerald-400 text-sm font-medium flex items-center gap-1">
                          <CheckCircle size={14} /> {lastResult.correct}
                        </span>
                      ) : (
                        <div className="flex flex-col">
                          <span className="text-rose-400 text-sm line-through">{lastResult.userVal || '—'}</span>
                          <span className="text-emerald-400 text-sm font-medium">{lastResult.correct}</span>
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Note after checking */}
      {checked && verb.note && (
        <div className="bg-indigo-950/30 border border-indigo-800/30 rounded-xl p-3">
          <p className="text-sm text-indigo-300 italic">{verb.note}</p>
        </div>
      )}

      {/* Action button */}
      <button
        onClick={checked ? next : checkAll}
        className="w-full py-3 rounded-xl font-semibold transition-all bg-indigo-600 hover:bg-indigo-500 text-white"
      >
        {checked ? (verbIndex + 1 < verbs.length ? 'Ďalšie sloveso →' : 'Dokončiť') : 'Skontrolovať'}
      </button>
    </div>
  );
}
