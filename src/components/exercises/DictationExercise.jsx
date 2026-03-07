import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle, XCircle, Volume2, RotateCcw } from 'lucide-react';
import { useTTS } from '../../hooks/useTTS';
import { isAnswerCloseEnough } from '../../utils/text';

/**
 * DictationExercise — Student hears a German sentence via TTS and writes it down.
 * Bridges listening and writing skills.
 * 
 * Schema:
 * {
 *   type: 'dictation',
 *   instruction: string,
 *   sentences: [
 *     {
 *       de: string,          // The German sentence (spoken via TTS, hidden until checked)
 *       sk: string,          // Slovak translation (shown after check)
 *       hint?: string,       // Optional hint (e.g. number of words)
 *     }
 *   ]
 * }
 */
export function DictationExercise({ exercise, onComplete }) {
  const sentences = exercise.sentences || [];
  const [qIndex, setQIndex] = useState(0);
  const [input, setInput] = useState('');
  const [checked, setChecked] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const [playCount, setPlayCount] = useState(0);
  const inputRef = useRef(null);
  const lastCheckRef = useRef(0);
  const { speak, stop, speaking } = useTTS();

  useEffect(() => {
    if (!checked && !finished && inputRef.current) inputRef.current.focus();
  }, [qIndex, checked, finished]);

  // Auto-play on new sentence
  useEffect(() => {
    if (!finished && sentences[qIndex]) {
      const timer = setTimeout(() => {
        speak(sentences[qIndex].de, 'de-DE', 0.7);
        setPlayCount(1);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [qIndex, finished]);

  useEffect(() => () => stop(), []);

  const q = sentences[qIndex];

  const playSentence = (rate = 0.7) => {
    if (q) {
      speak(q.de, 'de-DE', rate);
      setPlayCount(p => p + 1);
    }
  };

  const checkAnswer = () => {
    if (checked || !input.trim()) return;
    const now = Date.now();
    if (now - lastCheckRef.current < 800) return;
    lastCheckRef.current = now;

    const isCorrect = isAnswerCloseEnough(input.trim(), q.de);
    const newAnswers = [...answers, isCorrect];
    setAnswers(newAnswers);
    setChecked(true);
  };

  const next = () => {
    if (qIndex + 1 < sentences.length) {
      setQIndex(qIndex + 1);
      setInput('');
      setChecked(false);
      setPlayCount(0);
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
        <p className="text-gray-400">{correct} / {sentences.length} správne zapísaných viet</p>
      </div>
    );
  }

  if (!q) return null;

  return (
    <div className="space-y-4">
      {/* Progress bar */}
      <div className="flex gap-1.5 mb-2">
        {sentences.map((_, i) => (
          <div key={i} className={`flex-1 h-1.5 rounded-full transition-all duration-300
            ${i < qIndex ? (answers[i] ? 'bg-emerald-500' : 'bg-rose-500') : i === qIndex ? 'bg-indigo-500' : 'bg-gray-800'}`} />
        ))}
      </div>

      <p className="text-xs text-gray-500 mb-1">Diktát {qIndex + 1} / {sentences.length}</p>

      {/* Listen area */}
      <div className="bg-gray-800/60 border border-gray-700/50 rounded-xl p-5 text-center space-y-3">
        <p className="text-xs text-gray-500 mb-2">Počúvaj a napíš, čo počuješ:</p>

        <div className="flex items-center justify-center gap-3">
          {/* Normal speed */}
          <button
            onClick={() => playSentence(0.7)}
            disabled={speaking}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all
              ${speaking ? 'bg-indigo-900/40 text-indigo-300 animate-pulse' : 'bg-indigo-600 hover:bg-indigo-500 text-white'}`}
          >
            <Volume2 size={20} />
            {playCount === 0 ? 'Prehrať' : 'Prehrať znova'}
          </button>

          {/* Slow speed */}
          <button
            onClick={() => playSentence(0.45)}
            disabled={speaking}
            className="flex items-center gap-1 px-4 py-3 rounded-xl font-medium transition-all bg-gray-700 hover:bg-gray-600 text-gray-300"
          >
            <RotateCcw size={16} />
            Pomaly
          </button>
        </div>

        {q.hint && (
          <p className="text-xs text-amber-400/70 italic mt-2">💡 {q.hint}</p>
        )}
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
            placeholder="Napíš, čo si počul(a)..."
            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
            autoComplete="off"
            spellCheck={false}
          />
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
              </div>
            )}

            <div className="mb-2">
              <p className="text-xs text-gray-500">{answers[answers.length - 1] ? 'Veta:' : 'Správna odpoveď:'}</p>
              <p className="text-emerald-300 font-medium">{q.de}</p>
            </div>

            <div className="flex items-center gap-3 mt-2">
              <button onClick={() => speak(q.de, 'de-DE', 0.7)} className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300">
                <Volume2 size={14} /> Vypočuť
              </button>
            </div>

            {q.sk && (
              <p className="text-sm text-gray-400 italic mt-2">Preklad: {q.sk}</p>
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
