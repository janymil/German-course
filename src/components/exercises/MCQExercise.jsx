/**
 * MCQExercise — Multiple Choice Questions with instant feedback
 */
import React, { useState } from 'react';
import { CheckCircle, XCircle, Volume2 } from 'lucide-react';
import { useTTS } from '../../hooks/useTTS';

export function MCQExercise({ exercise, onComplete }) {
  const questions = exercise.questions;
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const { speak } = useTTS();

  const q = questions[qIndex];

  const choose = (optIndex) => {
    if (selected !== null) return;
    setSelected(optIndex);
    const correct = optIndex === q.answer;
    // Speak the correct answer
    setTimeout(() => speak(q.options[q.answer]), 300);
  };

  const next = () => {
    const correct = selected === q.answer;
    const newAnswers = [...answers, correct];
    setAnswers(newAnswers);
    if (qIndex < questions.length - 1) {
      setQIndex(qIndex + 1);
      setSelected(null);
    } else {
      setFinished(true);
      const score = Math.round((newAnswers.filter(Boolean).length / questions.length) * 100);
      setTimeout(() => onComplete(score), 1500);
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
        <p className="text-gray-500 text-sm">Výsledok sa ukladá...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between text-sm text-gray-400">
        <span>Otázka {qIndex + 1} / {questions.length}</span>
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div key={i} className={`w-5 h-1.5 rounded-full ${
              i < qIndex ? (answers[i] ? 'bg-emerald-500' : 'bg-rose-500') :
              i === qIndex ? 'bg-indigo-500' : 'bg-gray-700'
            }`} />
          ))}
        </div>
      </div>

      {/* Question */}
      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
        <p className="text-xl font-semibold text-white leading-snug">{q.question}</p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {q.options.map((opt, i) => {
          const isCorrect = i === q.answer;
          const isSelected = i === selected;
          let style = 'bg-gray-800 border-gray-700 hover:bg-gray-700 hover:border-gray-600 cursor-pointer';
          if (selected !== null) {
            if (isCorrect) style = 'bg-emerald-900/70 border-emerald-600 cursor-default';
            else if (isSelected) style = 'bg-rose-900/70 border-rose-600 cursor-default';
            else style = 'bg-gray-800/40 border-gray-800 cursor-default opacity-50';
          }
          return (
            <button
              key={i}
              onClick={() => choose(i)}
              className={`rounded-xl border-2 p-4 text-left transition-all flex items-center gap-3 ${style}`}
            >
              <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 font-bold text-sm
                ${selected !== null && isCorrect ? 'border-emerald-500 bg-emerald-900 text-emerald-300' :
                  selected !== null && isSelected ? 'border-rose-500 bg-rose-900 text-rose-300' :
                  'border-gray-600 text-gray-400'}`}>
                {['A', 'B', 'C', 'D'][i]}
              </div>
              <span className={`font-medium text-sm ${selected !== null && isCorrect ? 'text-emerald-200' : selected !== null && isSelected ? 'text-rose-200' : 'text-gray-200'}`}>
                {opt}
              </span>
              {selected !== null && isCorrect && <CheckCircle size={16} className="text-emerald-400 ml-auto" />}
              {selected !== null && isSelected && !isCorrect && <XCircle size={16} className="text-rose-400 ml-auto" />}
            </button>
          );
        })}
      </div>

      {/* Feedback + Next */}
      {selected !== null && (
        <div className="space-y-3">
          <div className={`rounded-xl p-4 border flex items-start gap-3 ${selected === q.answer ? 'bg-emerald-950/40 border-emerald-700' : 'bg-rose-950/40 border-rose-700'}`}>
            {selected === q.answer
              ? <CheckCircle size={18} className="text-emerald-400 mt-0.5" />
              : <XCircle size={18} className="text-rose-400 mt-0.5" />}
            <div>
              <p className={`font-semibold text-sm ${selected === q.answer ? 'text-emerald-300' : 'text-rose-300'}`}>
                {selected === q.answer ? 'Správne!' : `Nesprávne — správna odpoveď: „${q.options[q.answer]}"`}
              </p>
              {q.explanation && (
                <p className="text-xs text-gray-400 italic mt-1">{q.explanation}</p>
              )}
            </div>
          </div>
          <button onClick={next} className="w-full btn-primary justify-center">
            {qIndex < questions.length - 1 ? 'Ďalšia otázka →' : 'Dokončiť'}
          </button>
        </div>
      )}
    </div>
  );
}
