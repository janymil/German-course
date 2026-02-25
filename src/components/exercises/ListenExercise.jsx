/**
 * ListenExercise — TTS plays German, user types what they heard
 */
import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, CheckCircle, XCircle, Play } from 'lucide-react';
import { useTTS } from '../../hooks/useTTS';
import { normalizeGerman } from '../../utils/text';

export function ListenExercise({ exercise, onComplete }) {
  const questions = exercise.questions;
  const [qIndex, setQIndex] = useState(0);
  const [input, setInput] = useState('');
  const [checked, setChecked] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [played, setPlayed] = useState(false);
  const [finished, setFinished] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const inputRef = useRef();
  const { speak, speaking } = useTTS();

  const q = questions[qIndex];

  const playAudio = () => {
    speak(q.de, 'de-DE', 0.75);
    setPlayed(true);
  };

  const check = () => {
    if (!input.trim()) return;
    setChecked(true);
    // Speak at normal speed to confirm
    speak(q.de, 'de-DE', 0.9);
  };

  const isCorrect = normalizeGerman(input) === normalizeGerman(q.de);

  const next = () => {
    const correct = normalizeGerman(input) === normalizeGerman(q.de);
    const newAnswers = [...answers, correct];
    setAnswers(newAnswers);
    if (qIndex < questions.length - 1) {
      setQIndex(qIndex + 1);
      setInput('');
      setChecked(false);
      setPlayed(false);
      setShowAnswer(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setFinished(true);
      const score = Math.round((newAnswers.filter(Boolean).length / questions.length) * 100);
      setTimeout(() => onComplete(score), 1200);
    }
  };

  if (finished) {
    const score = Math.round((answers.filter(Boolean).length / questions.length) * 100);
    return (
      <div className="text-center space-y-4 py-4">
        <div className={`text-6xl font-bold ${score >= 80 ? 'text-emerald-400' : score >= 60 ? 'text-amber-400' : 'text-rose-400'}`}>
          {score}%
        </div>
        <p className="text-gray-300">{answers.filter(Boolean).length} / {questions.length} správnych</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex gap-1">
        {questions.map((_, i) => (
          <div key={i} className={`flex-1 h-1.5 rounded-full ${i < qIndex ? (answers[i] ? 'bg-emerald-500' : 'bg-rose-500') :
              i === qIndex ? 'bg-sky-500' : 'bg-gray-700'
            }`} />
        ))}
      </div>

      <p className="text-xs text-gray-500 text-center">Počúvaj a napíš po nemecky · {qIndex + 1}/{questions.length}</p>

      {/* Audio Player */}
      <div className="flex flex-col items-center justify-center gap-4 bg-gray-800 border border-gray-700 rounded-2xl p-10">
        <button
          onClick={playAudio}
          className={`w-24 h-24 rounded-full border-4 flex items-center justify-center transition-all ${speaking ? 'border-sky-500 bg-sky-950/60 scale-110' : 'border-gray-600 bg-gray-700 hover:bg-gray-600 hover:border-sky-600'
            }`}
        >
          <Volume2 size={40} className={speaking ? 'text-sky-400' : 'text-gray-300'} />
        </button>
        <p className="text-gray-400 text-sm">
          {!played ? 'Klikni pre prehranie' : speaking ? 'Hrá...' : 'Napíš čo si počul'}
        </p>
        {played && !speaking && (
          <button onClick={playAudio} className="text-xs text-gray-500 hover:text-gray-300 flex items-center gap-1 underline">
            <Play size={12} /> Prehrať znova (pomalšie)
          </button>
        )}
      </div>

      {/* Input */}
      {!checked ? (
        <div className="space-y-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && played && check()}
            placeholder="Napíš nemeckú vetu..."
            disabled={!played}
            className="w-full bg-gray-800 border border-gray-700 focus:border-sky-500 rounded-xl px-4 py-3 text-white outline-none text-base placeholder-gray-600 transition-colors disabled:opacity-40"
          />
          <div className="flex gap-2">
            <button onClick={check} disabled={!input.trim() || !played} className="btn-primary flex-1 justify-center disabled:opacity-40">
              Skontrolovať
            </button>
            <button onClick={() => setShowAnswer(true)} className="btn-secondary text-xs px-3" title="Zobraziť odpoveď">
              Ukáž
            </button>
          </div>
          {showAnswer && (
            <div className="bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-2 text-sm text-gray-300">
              Odpoveď: <strong className="text-white">{q.de}</strong> — {q.sk}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <div className={`rounded-xl p-4 border ${isCorrect ? 'bg-emerald-950/40 border-emerald-700' : 'bg-rose-950/40 border-rose-700'}`}>
            <div className="flex items-center gap-2 mb-2">
              {isCorrect
                ? <><CheckCircle size={16} className="text-emerald-400" /><span className="font-semibold text-emerald-300 text-sm">Správne!</span></>
                : <><XCircle size={16} className="text-rose-400" /><span className="font-semibold text-rose-300 text-sm">Takmer...</span></>
              }
            </div>
            <div className="space-y-1 text-sm">
              <p><span className="text-gray-500">Tvoje:</span> <span className="text-white">{input}</span></p>
              <p><span className="text-gray-500">Správne:</span> <span className="text-emerald-300 font-medium">{q.de}</span></p>
              <p><span className="text-gray-500">Preklad:</span> <span className="text-gray-400">{q.sk}</span></p>
            </div>
          </div>
          <button onClick={next} className="w-full btn-primary justify-center">
            {qIndex < questions.length - 1 ? 'Ďalšia →' : 'Dokončiť'}
          </button>
        </div>
      )}
    </div>
  );
}
