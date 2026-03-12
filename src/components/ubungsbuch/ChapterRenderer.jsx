/**
 * ChapterRenderer — renders all exercises for a given chapter in sequence.
 * Tracks per-exercise completion state and shows overall chapter progress.
 * Exercises stay MOUNTED when collapsed so answers are never lost.
 */
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, Lock, Star, RotateCcw } from 'lucide-react';
import MarkVerbsExercise from './MarkVerbsExercise';
import ConjugationTableExercise from './ConjugationTableExercise';
import WordAssignExercise from './WordAssignExercise';
import FillBankExercise from './FillBankExercise';
import DualSelectExercise from './DualSelectExercise';
import FillPassageExercise from './FillPassageExercise';
import ErrorCorrectExercise from './ErrorCorrectExercise';

const EXERCISE_COMPONENTS = {
  'mark-verbs': MarkVerbsExercise,
  'conjugation-table': ConjugationTableExercise,
  'word-assign': WordAssignExercise,
  'fill-bank': FillBankExercise,
  'dual-select': DualSelectExercise,
  'fill-passage': FillPassageExercise,
  'error-correct': ErrorCorrectExercise,
};

const EXERCISE_TYPE_LABELS = {
  'mark-verbs': 'Označ slovesá',
  'conjugation-table': 'Tabuľka časovania',
  'word-assign': 'Priraďovanie slov',
  'fill-bank': 'Doplň zo slovníka',
  'dual-select': 'Vyber správnu formu',
  'fill-passage': 'Doplň text',
  'error-correct': 'Oprav chyby',
};

function ExerciseCard({ exercise, completedScores, onComplete, onReset, resetKey, isUnlocked }) {
  const [open, setOpen] = useState(false);
  const ExComp = EXERCISE_COMPONENTS[exercise.type];
  const score = completedScores[exercise.id];
  const isDone = score !== undefined;

  return (
    <div className={`rounded-2xl border transition-all ${isUnlocked ? 'border-gray-700/60 bg-gray-900/60' : 'border-gray-800/40 bg-gray-900/30 opacity-60'}`}>
      {/* Card header */}
      <div className="flex items-center gap-2 pr-3">
        <button
          onClick={() => isUnlocked && setOpen(o => !o)}
          disabled={!isUnlocked}
          className="flex-1 flex items-center gap-3 px-5 py-4 text-left"
        >
          {/* Number badge */}
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 border ${
            isDone ? 'bg-emerald-900/40 border-emerald-700/60 text-emerald-300' :
            isUnlocked ? 'bg-cyan-900/30 border-cyan-700/50 text-cyan-300' :
            'bg-gray-800/40 border-gray-700/40 text-gray-500'
          }`}>
            {isDone ? <CheckCircle size={16} /> : isUnlocked ? exercise.label : <Lock size={14} />}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              {exercise.star && <Star size={12} className="text-amber-400 flex-shrink-0" />}
              <span className={`font-semibold text-sm ${isUnlocked ? 'text-gray-200' : 'text-gray-500'}`}>
                {exercise.title || EXERCISE_TYPE_LABELS[exercise.type]}
              </span>
            </div>
            <span className="text-xs text-gray-500">{EXERCISE_TYPE_LABELS[exercise.type]}</span>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            {isDone && (
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${score >= 80 ? 'bg-emerald-800/60 text-emerald-300' : 'bg-amber-800/60 text-amber-300'}`}>
                {score}%
              </span>
            )}
            {isUnlocked && (
              open ? <ChevronUp size={16} className="text-gray-500" /> : <ChevronDown size={16} className="text-gray-500" />
            )}
          </div>
        </button>

        {/* Per-exercise reset button */}
        {isUnlocked && (
          <button
            onClick={(e) => { e.stopPropagation(); onReset(exercise.id); }}
            title="Začať cvičenie znova"
            className="p-2 rounded-lg text-gray-600 hover:text-rose-400 hover:bg-rose-900/20 transition-all flex-shrink-0"
          >
            <RotateCcw size={14} />
          </button>
        )}
      </div>

      {/* Exercise body — always mounted, hidden when collapsed to preserve state */}
      <div className={open ? 'px-5 pb-5 border-t border-gray-700/40 pt-4' : 'hidden'}>
        {ExComp && (
          <>
            <p className="text-sm text-gray-300 leading-relaxed mb-4"
              dangerouslySetInnerHTML={{ __html: exercise.instruction }}
            />
            <ExComp
              key={resetKey}
              exercise={exercise}
              onComplete={(score) => {
                onComplete(exercise.id, score);
                setOpen(false);
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default function ChapterRenderer({ chapter, savedProgress, onProgressUpdate }) {
  const [completedScores, setCompletedScores] = useState(savedProgress || {});
  // Incrementing a key forces the exercise component to remount (reset)
  const [resetKeys, setResetKeys] = useState({});

  const handleComplete = (exerciseId, score) => {
    const updated = { ...completedScores, [exerciseId]: score };
    setCompletedScores(updated);
    onProgressUpdate(updated);
  };

  const handleResetExercise = (exerciseId) => {
    const updated = { ...completedScores };
    delete updated[exerciseId];
    setCompletedScores(updated);
    setResetKeys(prev => ({ ...prev, [exerciseId]: (prev[exerciseId] || 0) + 1 }));
    onProgressUpdate(updated);
  };

  const handleResetAll = () => {
    setCompletedScores({});
    const newKeys = {};
    chapter.exercises.forEach(ex => {
      newKeys[ex.id] = (resetKeys[ex.id] || 0) + 1;
    });
    setResetKeys(newKeys);
    onProgressUpdate({});
  };

  const totalEx = chapter.exercises.length;
  const doneCount = Object.keys(completedScores).length;
  const overallScore = doneCount > 0
    ? Math.round(Object.values(completedScores).reduce((a, b) => a + b, 0) / doneCount)
    : null;

  return (
    <div className="space-y-4">
      {/* Chapter header */}
      <div className="bg-gradient-to-r from-cyan-900/40 to-gray-900/60 rounded-2xl p-5 border border-cyan-800/30">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs text-cyan-400/80 font-medium uppercase tracking-wider mb-1">{chapter.section} · S. {chapter.pages}</div>
            <h2 className="text-xl font-bold text-white">{chapter.num}. {chapter.title}</h2>
            <p className="text-sm text-gray-400 mt-1 italic">„{chapter.subtitle}"</p>
          </div>
          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            {overallScore !== null && (
              <div className={`text-center px-4 py-2 rounded-xl border ${overallScore >= 80 ? 'bg-emerald-900/40 border-emerald-700/40 text-emerald-300' : 'bg-amber-900/40 border-amber-700/40 text-amber-300'}`}>
                <div className="text-2xl font-black">{overallScore}%</div>
                <div className="text-xs opacity-70">{doneCount}/{totalEx} hotových</div>
              </div>
            )}
            {doneCount > 0 && (
              <button
                onClick={handleResetAll}
                title="Vymazať všetky odpovede a začať kapitolu znova"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-rose-400 border border-rose-800/40 hover:bg-rose-900/20 transition-all"
              >
                <RotateCcw size={12} />
                Resetovať všetko
              </button>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Pokrok</span>
            <span>{doneCount} / {totalEx} cvičení</span>
          </div>
          <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full transition-all duration-500"
              style={{ width: `${(doneCount / totalEx) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Exercises */}
      <div className="space-y-3">
        {chapter.exercises.map((exercise, idx) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            completedScores={completedScores}
            onComplete={handleComplete}
            onReset={handleResetExercise}
            resetKey={resetKeys[exercise.id] || 0}
            isUnlocked={true}
          />
        ))}
      </div>
    </div>
  );
}
