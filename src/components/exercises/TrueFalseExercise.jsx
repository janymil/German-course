import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Volume2 } from 'lucide-react';
import { useTTS } from '../../hooks/useTTS';

/**
 * TrueFalseExercise — Student decides if a German statement is Richtig or Falsch.
 * 
 * Schema:
 * {
 *   type: 'truefalse',
 *   instruction: string,
 *   statements: [
 *     {
 *       statement: string,    // German statement
 *       isTrue: boolean,      // true = richtig, false = falsch
 *       explanation: string,  // Why it's true or false
 *     }
 *   ]
 * }
 */
export function TrueFalseExercise({ exercise, onComplete }) {
  // Support both schema property names as LLMs sometimes output questions instead of statements
  const rawStatements = exercise.statements || exercise.questions || [];

  // Normalize if LLM used "question" instead of "statement" inside the object
  const statements = rawStatements.map(q => ({
    ...q,
    statement: q.statement || q.question
  }));

  const [qIndex, setQIndex] = useState(0);
  const [answered, setAnswered] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const { speak, stop } = useTTS();

  useEffect(() => () => stop(), []);

  const q = statements[qIndex];

  const handleAnswer = (userSaysTrue) => {
    if (answered !== null) return;
    const isCorrect = userSaysTrue === q.isTrue;
    setAnswered({ userSaysTrue, isCorrect });
    const newAnswers = [...answers, isCorrect];
    setAnswers(newAnswers);
    // Removed automatic speech on correct answer
    // if (isCorrect) speak(q.statement, 'de-DE', 0.85);
  };

  const next = () => {
    if (qIndex + 1 < statements.length) {
      setQIndex(qIndex + 1);
      setAnswered(null);
    } else {
      setFinished(true);
      const score = Math.round((answers.filter(Boolean).length / statements.length) * 100);
      setTimeout(() => onComplete(score), 1200);
    }
  };

  if (finished) {
    const correct = answers.filter(Boolean).length;
    const score = Math.round((correct / statements.length) * 100);
    return (
      <div className="text-center py-8">
        <div className={`text-5xl font-bold mb-2 ${score >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>{score}%</div>
        <p className="text-gray-400">{correct} / {statements.length} správnych odpovedí</p>
      </div>
    );
  }

  if (!q) return null;

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div className="flex gap-1.5 mb-2">
        {statements.map((_, i) => (
          <div key={i} className={`flex-1 h-1.5 rounded-full transition-all duration-300
            ${i < qIndex ? (answers[i] ? 'bg-emerald-500' : 'bg-rose-500') : i === qIndex ? 'bg-indigo-500' : 'bg-gray-800'}`} />
        ))}
      </div>

      <p className="text-xs text-gray-500">Tvrdenie {qIndex + 1} / {statements.length}</p>

      {/* Statement */}
      <div className="bg-gray-800/60 border border-gray-700/50 rounded-xl p-5 text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <p className="text-lg text-white font-medium">{q.statement}</p>
          <button onClick={() => speak(q.statement, 'de-DE', 0.85)} className="text-indigo-400 hover:text-indigo-300 shrink-0">
            <Volume2 size={18} />
          </button>
        </div>
      </div>

      {/* Richtig / Falsch buttons */}
      {answered === null && (
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleAnswer(true)}
            className="bg-emerald-950/30 border border-emerald-700/40 rounded-xl p-4 text-center hover:bg-emerald-900/40 transition-all"
          >
            <CheckCircle size={24} className="mx-auto text-emerald-400 mb-1" />
            <p className="text-emerald-400 font-bold">Richtig</p>
            <p className="text-xs text-gray-500">Správne</p>
          </button>
          <button
            onClick={() => handleAnswer(false)}
            className="bg-rose-950/30 border border-rose-700/40 rounded-xl p-4 text-center hover:bg-rose-900/40 transition-all"
          >
            <XCircle size={24} className="mx-auto text-rose-400 mb-1" />
            <p className="text-rose-400 font-bold">Falsch</p>
            <p className="text-xs text-gray-500">Nesprávne</p>
          </button>
        </div>
      )}

      {/* Feedback */}
      {answered !== null && (
        <div className="space-y-3">
          <div className={`rounded-xl p-4 border ${answered.isCorrect ? 'bg-emerald-950/30 border-emerald-800/40' : 'bg-rose-950/30 border-rose-800/40'}`}>
            <div className="flex items-center gap-2 mb-2">
              {answered.isCorrect ? (
                <><CheckCircle size={18} className="text-emerald-400" /><span className="text-emerald-400 font-medium">Správne!</span></>
              ) : (
                <><XCircle size={18} className="text-rose-400" /><span className="text-rose-400 font-medium">
                  Odpoveď: {q.isTrue ? 'Richtig (Správne)' : 'Falsch (Nesprávne)'}
                </span></>
              )}
            </div>
            {q.explanation && (
              <p className="text-sm text-gray-400 italic">{q.explanation}</p>
            )}
          </div>

          <button
            onClick={next}
            className="w-full py-3 rounded-xl font-semibold transition-all bg-indigo-600 hover:bg-indigo-500 text-white"
          >
            {qIndex + 1 < statements.length ? 'Ďalšie →' : 'Dokončiť'}
          </button>
        </div>
      )}
    </div>
  );
}
