import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, ArrowRight, Volume2, RotateCcw, X } from 'lucide-react';
import { useTTS } from '../../hooks/useTTS';
import { getGenderForWord, GENDER_COLORS } from '../../utils/genderColors';

export function WordOrderExercise({ exercise, lesson, onComplete }) {
  const { speak, stop, speaking } = useTTS();
  const sentences = exercise?.sentences ?? [];
  const total = sentences.length;

  const [current, setCurrent] = useState(0);
  const [bank, setBank] = useState([]);
  const [built, setBuilt] = useState([]);
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  // Initialise bank from current sentence words (already shuffled)
  useEffect(() => {
    if (sentences[current]) {
      // Give each word a unique id so duplicate words are handled correctly
      setBank(sentences[current].words.map((w, i) => ({ id: i, text: w })));
      setBuilt([]);
      setChecked(false);
      setIsCorrect(false);
    }
  }, [current]);

  if (!sentences.length) return null;

  const sentence = sentences[current];
  const progress = ((current) / total) * 100;

  function moveToBuilt(tile) {
    setBank(prev => prev.filter(t => t.id !== tile.id));
    setBuilt(prev => [...prev, tile]);
  }

  function moveToBank(tile) {
    setBuilt(prev => prev.filter(t => t.id !== tile.id));
    setBank(prev => [...prev, tile]);
  }

  function handleCheck() {
    const assembled = built.map(t => t.text).join(' ').trim();
    const correct = (sentence.correct ?? '').trim();
    const ok = assembled.toLowerCase() === correct.toLowerCase();
    setIsCorrect(ok);
    setChecked(true);
    if (ok) {
      setScore(s => s + 1);
      speak(correct, 'de-DE', 0.85);
    }
  }

  function handleNext() {
    stop();
    if (current + 1 >= total) {
      setDone(true);
      const finalScore = Math.round(((score + (isCorrect ? 1 : 0)) / total) * 100);
      // Use setTimeout to let state settle before calling onComplete
      setTimeout(() => onComplete(finalScore), 0);
    } else {
      setCurrent(c => c + 1);
    }
  }

  function handleReset() {
    setBank(sentence.words.map((w, i) => ({ id: i, text: w })));
    setBuilt([]);
    setChecked(false);
    setIsCorrect(false);
  }

  // Enter key: check or advance
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Enter' && !done) {
        e.preventDefault();
        if (checked) {
          handleNext();
        } else if (built.length > 0) {
          handleCheck();
        }
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [checked, done, built, current]);

  function handleSpeak() {
    if (speaking) {
      stop();
    } else {
      speak(sentence.correct, 'de-DE', 0.85);
    }
  }

  if (done) {
    const finalScore = Math.round((score / total) * 100);
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-16">
        <CheckCircle className="w-16 h-16 text-green-400" />
        <h2 className="text-2xl font-bold text-white">Cvičenie dokončené!</h2>
        <p className="text-gray-300 text-lg">
          Skóre: <span className="text-indigo-400 font-bold">{score}/{total}</span> ({finalScore}%)
        </p>
      </div>
    );
  }

  const builtSentence = built.map(t => t.text).join(' ');
  const canCheck = built.length > 0 && !checked;

  return (
    <div className="flex flex-col gap-5">
      {/* Progress */}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between text-sm text-gray-400 mb-1">
          <span>Veta {current + 1} z {total}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2">
          <div
            className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Hint card */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Preklad (SK)</p>
        <p className="text-gray-300 text-base">{sentence.hint}</p>
      </div>

      {/* Built sentence area */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Zostavená veta</p>
          {built.length > 0 && !checked && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Resetovať
            </button>
          )}
        </div>
        <div
          className={`min-h-[60px] border-2 border-dashed rounded-xl p-3 flex flex-wrap gap-2 items-start transition-colors ${
            checked
              ? isCorrect
                ? 'border-green-500 bg-green-950/30'
                : 'border-red-500 bg-red-950/30'
              : 'border-gray-700 bg-gray-900/50'
          }`}
        >
          {built.length === 0 ? (
            <span className="text-gray-600 text-sm italic self-center">
              Klikni na slová nižšie...
            </span>
          ) : (
            built.map(tile => (
              <button
                key={tile.id}
                onClick={() => !checked && moveToBank(tile)}
                disabled={checked}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  checked
                    ? isCorrect
                      ? 'bg-green-700 text-white cursor-default'
                      : 'bg-red-700 text-white cursor-default'
                    : 'bg-indigo-700 hover:bg-indigo-600 text-white cursor-pointer'
                }`}
              >
                {tile.text}
                {!checked && <X className="w-3 h-3 opacity-70" />}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Feedback block */}
      {checked && (
        <div
          className={`rounded-2xl border p-4 flex flex-col gap-2 ${
            isCorrect
              ? 'bg-green-950/40 border-green-700'
              : 'bg-red-950/40 border-red-700'
          }`}
        >
          <div className="flex items-center gap-2">
            {isCorrect ? (
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
            ) : (
              <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            )}
            <span className={`font-semibold ${isCorrect ? 'text-green-300' : 'text-red-300'}`}>
              {isCorrect ? 'Správne!' : 'Nesprávne'}
            </span>
            <button
              onClick={handleSpeak}
              className={`ml-auto flex items-center gap-1 text-xs px-2 py-1 rounded-lg transition-colors ${
                speaking
                  ? 'bg-indigo-700 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              {speaking ? 'Stop' : 'Počuť'}
            </button>
          </div>

          {!isCorrect && (
            <div className="text-sm text-gray-300">
              <span className="text-gray-500">Správna odpoveď: </span>
              <span className="text-green-300 font-medium">{sentence.correct}</span>
            </div>
          )}

          {sentence.explanation && (
            <div className="text-sm text-gray-400 border-t border-gray-700 pt-2 mt-1">
              <span className="text-gray-500 text-xs uppercase tracking-wide block mb-0.5">Gramatika</span>
              {sentence.explanation}
            </div>
          )}
        </div>
      )}

      {/* Word bank */}
      {!checked && (
        <div className="flex flex-col gap-2">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Slovná banka</p>
          <div className="flex flex-wrap gap-2">
            {bank.map(tile => {
              const g = getGenderForWord(tile.text);
              const genderCls = g ? GENDER_COLORS[g].text : 'text-white';
              return (
              <button
                key={tile.id}
                onClick={() => moveToBuilt(tile)}
                className={`px-3 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-500 rounded-lg text-sm font-medium transition-all ${genderCls}`}
              >
                {tile.text}
              </button>
              );
            })}
            {bank.length === 0 && (
              <span className="text-gray-600 text-sm italic">Všetky slová sú umiestnené.</span>
            )}
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-3 pt-2">
        {!checked ? (
          <button
            onClick={handleCheck}
            disabled={!canCheck}
            className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              canCheck
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                : 'bg-gray-800 text-gray-600 cursor-not-allowed'
            }`}
          >
            Skontrolovať
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm transition-all"
          >
            {current + 1 >= total ? 'Dokončiť' : 'Ďalej'}
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
