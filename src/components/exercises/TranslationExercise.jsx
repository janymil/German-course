import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle, XCircle, Volume2, Lightbulb } from 'lucide-react';
import { useTTS } from '../../hooks/useTTS';
import { isAnswerCloseEnough } from '../../utils/text';

/**
 * TranslationExercise — Student translates Slovak sentence to German.
 * 
 * Schema:
 * {
 *   type: 'translation',
 *   instruction: string,
 *   sentences: [
 *     {
 *       sk: string,        // Slovak sentence to translate
 *       answer: string,    // Correct German translation
 *       hint: string,      // Optional hint (key words)
 *       explanation: string // Why this translation is correct
 *     }
 *   ]
 * }
 */
export function TranslationExercise({ exercise, onComplete }) {
  const sentences = exercise.sentences || [];
  const [qIndex, setQIndex] = useState(0);
  const [input, setInput] = useState('');
  const [checked, setChecked] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const inputRef = useRef(null);
  const lastCheckRef = useRef(0);
  const { speak, stop } = useTTS();

  useEffect(() => {
    if (!checked && !finished && inputRef.current) inputRef.current.focus();
  }, [qIndex, checked, finished]);

  useEffect(() => () => stop(), []);

  const q = sentences[qIndex];

  const checkAnswer = () => {
    if (checked || !input.trim()) return;
    const now = Date.now();
    if (now - lastCheckRef.current < 800) return;
    lastCheckRef.current = now;

    const isCorrect = isAnswerCloseEnough(input.trim(), q.answer);
    const newAnswers = [...answers, isCorrect];
    setAnswers(newAnswers);
    setChecked(true);
    // removed auto-TTS:     if (isCorrect) speak(q.answer);
  };

  const next = () => {
    if (qIndex + 1 < sentences.length) {
      setQIndex(qIndex + 1);
      setInput('');
      setChecked(false);
      setHintVisible(false);
    } else {
      setFinished(true);
      const score = Math.round((answers.filter(Boolean).length / sentences.length) * 100);
      setTimeout(() => onComplete(score), 1200);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!checked) checkAnswer();
      else next();
    }
  };

  if (finished) {
    const correct = answers.filter(Boolean).length;
    const score = Math.round((correct / sentences.length) * 100);
    return (
      <div className="text-center py-8">
        <div className={`text-5xl font-bold mb-2 ${score >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>{score}%</div>
        <p className="text-gray-400">{correct} / {sentences.length} správnych prekladov</p>
      </div>
    );
  }

  if (!q) return null;

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div className="flex gap-1.5 mb-2">
        {sentences.map((_, i) => (
          <div key={i} className={`flex-1 h-1.5 rounded-full transition-all duration-300
            ${i < qIndex ? (answers[i] ? 'bg-emerald-500' : 'bg-rose-500') : i === qIndex ? 'bg-indigo-500' : 'bg-gray-800'}`} />
        ))}
      </div>

      <p className="text-xs text-gray-500 mb-1">Preklad {qIndex + 1} / {sentences.length}</p>

      {/* Slovak sentence to translate */}
      <div className="bg-gray-800/60 border border-gray-700/50 rounded-xl p-4 text-center">
        <p className="text-xs text-gray-500 mb-1">Prelož do nemčiny:</p>
        <p className="text-lg text-white font-medium">{q.sk}</p>
      </div>

      {/* Input area */}
      {!checked && (
        <div className="space-y-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tvoja nemecká odpoveď..."
            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
            autoComplete="off"
            spellCheck={false}
          />
          {q.hint && (
            <div className="text-left mt-1 mb-2">
              {hintVisible ? (
                <p className="text-xs text-amber-400/90 italic bg-amber-500/10 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-amber-500/20">
                  <Lightbulb size={12} /> Nápoveda: {q.hint}
                </p>
              ) : (
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setHintVisible(true)}
                  className="text-xs font-semibold text-amber-500/80 hover:text-amber-400 transition-colors flex items-center gap-1.5 bg-amber-500/10 hover:bg-amber-500/20 px-3 py-1.5 rounded-lg shadow-sm w-max"
                >
                  <Lightbulb size={12} /> Zobraziť nápovedu
                </button>
              )}
            </div>
          )}
          <button
            onClick={checkAnswer}
            disabled={!input.trim()}
            className="w-full py-3 rounded-xl font-semibold transition-all bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Skontrolovať
          </button>
        </div>
      )}

      {/* Feedback */}
      {checked && (
        <div className="space-y-3">
          <div className={`rounded-xl p-4 border ${answers[answers.length - 1] ? 'bg-emerald-950/30 border-emerald-800/40' : 'bg-rose-950/30 border-rose-800/40'}`}>
            <div className="flex items-center gap-2 mb-2">
              {answers[answers.length - 1] ? (
                <><CheckCircle size={18} className="text-emerald-400" /><span className="text-emerald-400 font-medium">Správne!</span></>
              ) : (
                <><XCircle size={18} className="text-rose-400" /><span className="text-rose-400 font-medium">Nie celkom</span></>
              )}
            </div>

            {!answers[answers.length - 1] && (
              <div className="mb-2">
                <p className="text-xs text-gray-500">Tvoja odpoveď:</p>
                <p className="text-rose-300 line-through">{input}</p>
                <p className="text-xs text-gray-500 mt-1">Správna odpoveď:</p>
                <p className="text-emerald-300 font-medium">{q.answer}</p>
              </div>
            )}

            <button onClick={() => speak(q.answer)} className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 mt-1">
              <Volume2 size={14} /> Vypočuť
            </button>

            {q.explanation && (
              <p className="text-sm text-gray-400 italic mt-2">{q.explanation}</p>
            )}
          </div>

          <button
            autoFocus
            onClick={next}
            className="w-full py-3 rounded-xl font-semibold transition-all bg-indigo-600 hover:bg-indigo-500 text-white"
          >
            {qIndex + 1 < sentences.length ? 'Ďalšia →' : 'Dokončiť'}
          </button>
        </div>
      )}
    </div>
  );
}
