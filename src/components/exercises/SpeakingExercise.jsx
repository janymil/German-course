import { useState, useEffect } from 'react';
import { Volume2, Eye, CheckCircle, RefreshCw, ArrowRight, Mic } from 'lucide-react';
import { useTTS } from '../../hooks/useTTS';
import { GenderText } from '../../utils/genderColors';

export function SpeakingExercise({ exercise, lesson, onComplete }) {
  const { speak, stop, speaking } = useTTS();
  const phrases = exercise?.phrases ?? [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [assessed, setAssessed] = useState(false); // true once student clicks zvládol or treba
  const [results, setResults] = useState([]); // array of booleans
  const [triedRepeat, setTriedRepeat] = useState(false); // clicked "Treba zopakovať" at least once
  const [done, setDone] = useState(false);

  const phrase = phrases[currentIndex];
  const total = phrases.length;
  const correctCount = results.filter(Boolean).length;

  // Enter key: reveal → zvládol → continue through flow
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Enter' && !done) {
        e.preventDefault();
        if (!revealed) {
          setRevealed(true);
        } else if (!assessed) {
          // After revealing, Enter = zvládol
          handleZvladol();
        } else if (triedRepeat) {
          // After trying repeat, Enter = continue
          handleContinue();
        }
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [revealed, assessed, triedRepeat, done, currentIndex]);

  function handleReveal() {
    setRevealed(true);
  }

  function handlePlay() {
    if (speaking) stop();
    speak(phrase.de, 'de-DE', 0.85);
  }

  function handleZvladol() {
    const newResults = [...results, true];
    setResults(newResults);
    setAssessed(true);
    setTriedRepeat(false);
    advance(newResults);
  }

  function handleTreba() {
    setTriedRepeat(true);
    setAssessed(true);
  }

  function handleContinue() {
    const newResults = [...results, false];
    setResults(newResults);
    setTriedRepeat(false);
    setAssessed(false);
    advance(newResults);
  }

  function advance(newResults) {
    if (currentIndex + 1 >= total) {
      const score = Math.round((newResults.filter(Boolean).length / total) * 100);
      setDone(true);
      onComplete(score);
    } else {
      setCurrentIndex(currentIndex + 1);
      setRevealed(false);
      setAssessed(false);
      setTriedRepeat(false);
    }
  }

  if (!phrase || total === 0) {
    return (
      <div className="text-center text-gray-400 py-10">
        Žiadne frázy pre túto cvičenie.
      </div>
    );
  }

  if (done) {
    const score = Math.round((correctCount / total) * 100);
    return (
      <div className="flex flex-col items-center gap-6 py-10">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center max-w-md w-full">
          <Mic className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Hovorenie dokončené!</h2>
          <p className="text-gray-400 mb-6">Zvládol si {correctCount} z {total} fráz</p>
          <div className="text-5xl font-bold text-white mb-2">{score}%</div>
          <div className="w-full bg-gray-800 rounded-full h-3 mt-4">
            <div
              className="h-3 rounded-full bg-green-500 transition-all duration-500"
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 max-w-2xl mx-auto w-full">
      {/* Phase label */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500 uppercase tracking-widest">
          Hovorenie — riadená produkcia
        </span>
        <span className="text-xs text-gray-500">
          {currentIndex + 1} / {total}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-800 rounded-full h-2">
        <div
          className="h-2 rounded-full bg-blue-500 transition-all duration-300"
          style={{ width: `${((currentIndex) / total) * 100}%` }}
        />
      </div>

      {/* Main card */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col gap-5">

        {/* Situation / context */}
        {phrase.context && (
          <div className="flex items-start gap-2">
            <span className="text-xs text-gray-500 uppercase tracking-wide pt-0.5">Situácia:</span>
            <span className="text-sm text-gray-400 italic">{phrase.context}</span>
          </div>
        )}

        {/* Slovak prompt */}
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Povedz po nemecky:</p>
          <p className="text-xl font-semibold text-white leading-snug">{phrase.sk}</p>
        </div>

        {/* Reveal button or German phrase */}
        {!revealed ? (
          <button
            onClick={handleReveal}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 hover:text-white transition-colors font-medium"
          >
            <Eye className="w-4 h-4" />
            Ukáž nemecky
          </button>
        ) : (
          <div className="flex flex-col gap-4">
            {/* German phrase display */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
              <p className="text-2xl font-bold text-white leading-snug"><GenderText text={phrase.de} /></p>
              {phrase.tip && (
                <p className="text-xs text-yellow-400 mt-2 italic">💡 {phrase.tip}</p>
              )}
            </div>

            {/* TTS play button */}
            <button
              onClick={handlePlay}
              disabled={speaking}
              className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl border font-medium transition-colors ${
                speaking
                  ? 'bg-blue-900 border-blue-700 text-blue-300 cursor-wait'
                  : 'bg-blue-800 hover:bg-blue-700 border-blue-600 text-white'
              }`}
            >
              <Volume2 className={`w-5 h-5 ${speaking ? 'animate-pulse' : ''}`} />
              {speaking ? 'Prehráva…' : 'Počuj výslovnosť'}
            </button>

            {/* Self-assessment buttons */}
            {!triedRepeat ? (
              <div className="grid grid-cols-2 gap-3 mt-1">
                <button
                  onClick={handleZvladol}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-green-700 hover:bg-green-600 border border-green-600 text-white font-medium transition-colors"
                >
                  <CheckCircle className="w-5 h-5" />
                  Zvládol som ✓
                </button>
                <button
                  onClick={handleTreba}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 border border-gray-600 text-white font-medium transition-colors"
                >
                  <RefreshCw className="w-5 h-5" />
                  Treba zopakovať ↻
                </button>
              </div>
            ) : (
              /* After clicking "Treba zopakovať" — show retry hint + continue */
              <div className="flex flex-col gap-3 mt-1">
                <p className="text-sm text-amber-400 text-center">
                  Skús znova — počúvaj a opakuj frázu nahlas.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleZvladol}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-green-700 hover:bg-green-600 border border-green-600 text-white font-medium transition-colors"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Zvládol som ✓
                  </button>
                  <button
                    onClick={handleContinue}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 border border-gray-600 text-gray-300 font-medium transition-colors"
                  >
                    <ArrowRight className="w-5 h-5" />
                    Ísť ďalej
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Score tracker */}
      <div className="flex justify-between text-xs text-gray-600 px-1">
        <span>Zvládnuté: {correctCount}</span>
        <span>Zostatok: {total - currentIndex - (assessed && !triedRepeat ? 1 : 0)}</span>
      </div>
    </div>
  );
}
