import React, { useState } from 'react';
import {
  Volume2,
  CheckCircle,
  XCircle,
  ChevronRight,
  User,
  MessageCircle
} from 'lucide-react';
import { useTTS } from '../../hooks/useTTS';

export function DialogueExercise({ exercise, lesson, onComplete }) {
  const { speak } = useTTS();
  const turns = exercise.turns || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalPlayerTurns, setTotalPlayerTurns] = useState(
    () => turns.filter((t) => t.playerTurn).length
  );
  const [done, setDone] = useState(false);

  const currentTurn = turns[currentIndex];

  const handleOptionSelect = (idx) => {
    if (confirmed) return;
    setSelectedOption(idx);
  };

  const handleConfirm = () => {
    if (selectedOption === null || confirmed) return;
    const isCorrect = currentTurn.options[selectedOption].correct;
    if (isCorrect) setCorrectCount((c) => c + 1);
    setConfirmed(true);
  };

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= turns.length) {
      setDone(true);
      const score = totalPlayerTurns > 0
        ? Math.round((correctCount / totalPlayerTurns) * 100)
        : 100;
      onComplete(score);
    } else {
      setCurrentIndex(nextIndex);
      setSelectedOption(null);
      setConfirmed(false);
    }
  };

  if (!currentTurn && !done) {
    return (
      <div className="text-gray-400 text-sm">Žiadne dialógové kola.</div>
    );
  }

  if (done) {
    const score = totalPlayerTurns > 0
      ? Math.round((correctCount / totalPlayerTurns) * 100)
      : 100;
    return (
      <div className="max-w-xl mx-auto text-center space-y-4">
        <CheckCircle size={48} className="mx-auto text-emerald-400" />
        <p className="text-xl font-bold text-white">Dialóg dokončený!</p>
        <p className="text-gray-400 text-sm">
          Správne odpovede: {correctCount} / {totalPlayerTurns}
        </p>
        <p className="text-3xl font-black text-emerald-400">{score}%</p>
      </div>
    );
  }

  const isPlayerTurn = currentTurn.playerTurn;

  return (
    <div className="max-w-xl mx-auto space-y-4">
      {/* Title */}
      <div className="flex items-center gap-2 mb-2">
        <MessageCircle size={18} className="text-indigo-400" />
        <span className="font-bold text-indigo-300 text-sm">
          {exercise.title || 'Dialog'}
        </span>
        <span className="ml-auto text-xs text-gray-500">
          {currentIndex + 1} / {turns.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="flex gap-1">
        {turns.map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-1 rounded-full transition-all duration-300 ${
              i < currentIndex
                ? 'bg-emerald-500'
                : i === currentIndex
                ? 'bg-indigo-500'
                : 'bg-gray-700'
            }`}
          />
        ))}
      </div>

      {/* Turn card */}
      <div
        className={`card border rounded-2xl p-5 space-y-3 ${
          isPlayerTurn
            ? 'border-indigo-700 bg-indigo-950/30'
            : 'border-gray-700 bg-gray-800/60'
        }`}
      >
        {/* Speaker label */}
        <div className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              isPlayerTurn ? 'bg-indigo-600' : 'bg-gray-600'
            }`}
          >
            <User size={14} className="text-white" />
          </div>
          <span
            className={`font-semibold text-sm ${
              isPlayerTurn ? 'text-indigo-300' : 'text-gray-300'
            }`}
          >
            {currentTurn.speaker}
          </span>
        </div>

        {/* Non-player turn: show text + TTS */}
        {!isPlayerTurn && (
          <div className="space-y-2">
            <div className="flex items-start gap-3 bg-gray-900/60 rounded-xl p-3">
              <button
                onClick={() => speak(currentTurn.de)}
                className="mt-0.5 flex-shrink-0 text-indigo-400 hover:text-indigo-300 transition-colors"
                title="Prehrať výslovnosť"
              >
                <Volume2 size={16} />
              </button>
              <div>
                <p className="text-white font-medium text-sm leading-relaxed">
                  {currentTurn.de}
                </p>
                {currentTurn.sk && (
                  <p className="text-gray-400 text-xs mt-1">{currentTurn.sk}</p>
                )}
              </div>
            </div>
            <button
              onClick={handleNext}
              className="w-full btn-primary py-3 flex items-center justify-center gap-2 text-sm font-semibold"
            >
              Ďalej
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Player turn: show options */}
        {isPlayerTurn && (
          <div className="space-y-2">
            <p className="text-gray-400 text-xs mb-3">
              Vyber správnu odpoveď pre {currentTurn.speaker}:
            </p>
            {currentTurn.options.map((opt, idx) => {
              let optClass =
                'w-full text-left rounded-xl p-3 border text-sm font-medium transition-all ';
              if (!confirmed) {
                optClass +=
                  selectedOption === idx
                    ? 'border-indigo-500 bg-indigo-900/50 text-white'
                    : 'border-gray-700 bg-gray-900/50 text-gray-300 hover:border-gray-500 hover:bg-gray-800/60';
              } else {
                if (opt.correct) {
                  optClass += 'border-emerald-500 bg-emerald-900/30 text-emerald-300';
                } else if (selectedOption === idx) {
                  optClass += 'border-red-500 bg-red-900/30 text-red-300';
                } else {
                  optClass += 'border-gray-700 bg-gray-900/30 text-gray-500';
                }
              }
              return (
                <button
                  key={idx}
                  className={optClass}
                  onClick={() => handleOptionSelect(idx)}
                  disabled={confirmed}
                >
                  <div className="flex items-center gap-2">
                    {confirmed && opt.correct && (
                      <CheckCircle size={14} className="text-emerald-400 flex-shrink-0" />
                    )}
                    {confirmed && !opt.correct && selectedOption === idx && (
                      <XCircle size={14} className="text-red-400 flex-shrink-0" />
                    )}
                    <span>{opt.de}</span>
                  </div>
                </button>
              );
            })}

            {/* Confirm / Next */}
            {!confirmed ? (
              <button
                onClick={handleConfirm}
                disabled={selectedOption === null}
                className="w-full btn-primary py-3 mt-2 text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Potvrdiť
              </button>
            ) : (
              <div className="space-y-2 mt-2">
                {currentTurn.sk && (
                  <p className="text-xs text-gray-400 text-center">{currentTurn.sk}</p>
                )}
                <button
                  onClick={handleNext}
                  className="w-full btn-primary py-3 flex items-center justify-center gap-2 text-sm font-semibold"
                >
                  Ďalej
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
