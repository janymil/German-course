/**
 * FillExercise — Fill in the blank with hint + TTS reveal
 */
import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle, XCircle, Lightbulb, Volume2 } from 'lucide-react';
import { useTTS } from '../../hooks/useTTS';
import { isAnswerCloseEnough } from '../../utils/text';
import { GenderText } from '../../utils/genderColors';

export function FillExercise({ exercise, onComplete }) {
  const questions = exercise.questions;
  const [qIndex, setQIndex] = useState(0);
  const [input, setInput] = useState('');
  const [checked, setChecked] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [finished, setFinished] = useState(false);
  const inputRef = useRef();
  const { speak, stop } = useTTS();
  const lastCheckRef = useRef(0);

  const q = questions[qIndex];
  const isCorrect = isAnswerCloseEnough(input, q.answer);

  // Enter key: advance when checked
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Enter' && checked && !finished) {
        if (Date.now() - lastCheckRef.current < 800) return;
        e.preventDefault();
        stop();
        next();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [checked, finished, qIndex, input]);

  const check = () => {
    if (!input.trim()) return;
    setChecked(true);
    lastCheckRef.current = Date.now();
    const correct = isAnswerCloseEnough(input, q.answer);
    // Speak full correct sentence
    const fullSentence = q.sentence.replace('___', q.answer);
    // removed auto-TTS:     speak(fullSentence);
  };

  const next = () => {
    const correct = isAnswerCloseEnough(input, q.answer);
    const newAnswers = [...answers, correct];
    setAnswers(newAnswers);
    if (qIndex < questions.length - 1) {
      setQIndex(qIndex + 1);
      setInput('');
      setChecked(false);
      setShowHint(false);
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

  // Render sentence with blank
  const parts = q.sentence.split('___');

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex gap-1 mb-2">
        {questions.map((_, i) => (
          <div key={i} className={`flex-1 h-1.5 rounded-full ${i < qIndex ? (answers[i] ? 'bg-emerald-500' : 'bg-rose-500') :
            i === qIndex ? 'bg-indigo-500' : 'bg-gray-700'
            }`} />
        ))}
      </div>

      <p className="text-xs text-gray-500 text-center">Otázka {qIndex + 1} / {questions.length}</p>

      {/* Sentence display */}
      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 text-center">
        <p className="text-xl font-semibold text-white leading-loose flex flex-wrap items-center justify-center gap-2">
          <GenderText text={parts[0]} />
          <span className={`inline-block min-w-24 px-3 py-1 rounded-lg border-b-2 text-center transition-all
            ${checked
              ? (isCorrect ? 'bg-emerald-900/40 border-emerald-500 text-emerald-200' : 'bg-rose-900/40 border-rose-500 text-rose-200')
              : 'bg-gray-700 border-indigo-500 text-white'}`}>
            {checked ? (isCorrect ? input : q.answer) : (input || '___')}
          </span>
          <GenderText text={parts[1]} />
        </p>
      </div>

      {/* Input */}
      {!checked ? (
        <div className="flex gap-2">
          <input
            ref={inputRef}
            autoFocus
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && check()}
            placeholder="Napíš chýbajúce slovo..."
            className="flex-1 bg-gray-800 border border-gray-700 focus:border-indigo-500 rounded-xl px-4 py-3 text-white outline-none text-base placeholder-gray-600 transition-colors"
          />
          <button onClick={() => setShowHint(!showHint)} className="btn-secondary p-3" title="Nápoveď">
            <Lightbulb size={18} className={showHint ? 'text-amber-400' : 'text-gray-400'} />
          </button>
        </div>
      ) : (
        <div className={`rounded-xl p-4 border flex flex-col gap-2 ${isCorrect ? 'bg-emerald-950/40 border-emerald-700' : 'bg-rose-950/40 border-rose-700'}`}>
          <div className="flex items-center gap-2">
            {isCorrect
              ? <><CheckCircle size={18} className="text-emerald-400" /><span className="font-semibold text-emerald-300">Správne!</span></>
              : <><XCircle size={18} className="text-rose-400" /><span className="font-semibold text-rose-300">Tvoja odpoveď: „{input}" — správne: „{q.answer}"</span></>
            }
          </div>
          {!isCorrect && (
            <p className="text-xs text-gray-400 ml-6">Opakuj: „{q.answer}" — {q.hint}</p>
          )}
          {q.explanation && (
            <p className="text-xs text-gray-400 italic mt-2">{q.explanation}</p>
          )}
        </div>
      )}

      {/* Hint */}
      {showHint && !checked && (
        <div className="bg-amber-950/30 border border-amber-800 rounded-xl px-4 py-2 flex items-center gap-2">
          <Lightbulb size={14} className="text-amber-400" />
          <span className="text-amber-200 text-sm">{q.hint}</span>
        </div>
      )}

      {/* Action */}
      {!checked ? (
        <button onClick={check} disabled={!input.trim()} className="w-full btn-primary justify-center disabled:opacity-40">
          Skontrolovať
        </button>
      ) : (
        <button autoFocus onClick={next} className="w-full btn-primary justify-center">
          {qIndex < questions.length - 1 ? 'Ďalšia →' : 'Dokončiť'}
        </button>
      )}
    </div>
  );
}
