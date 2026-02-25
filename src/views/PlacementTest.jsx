/**
 * PlacementTest — Vstupný test
 * Tests knowledge across 6 checkpoint lessons, unlocks matching lessons on pass.
 * CHECKPOINT_IDS: [1, 10, 20, 40, 60, 75]
 * Each block: 3 MCQ questions from that lesson's exercises.
 * Scoring: ≥60% in a block = pass → unlock up to UNLOCK_MAP[lessonId]
 * Sequential: first failed block stops further unlocking.
 */
import React, { useState, useMemo } from 'react';
import { LESSONS } from '../data/curriculum';
import { CheckCircle, XCircle, Lock, Unlock, ChevronRight, Zap, ArrowLeft } from 'lucide-react';

const CHECKPOINT_IDS = [1, 10, 20, 40, 60, 75];
const UNLOCK_MAP = { 1: 10, 10: 20, 20: 40, 40: 60, 60: 75, 75: 80 };
const PASS_THRESHOLD = 0.6; // 60% of block questions correct

function buildQuestions() {
  const questions = [];
  for (const lessonId of CHECKPOINT_IDS) {
    const lesson = LESSONS.find((l) => l.id === lessonId);
    if (!lesson) continue;
    const mcq = lesson.exercises?.find((e) => e.type === 'mcq');
    if (!mcq?.questions?.length) continue;
    const subset = mcq.questions.slice(0, 3);
    subset.forEach((q) =>
      questions.push({ ...q, lessonId, lessonTitle: lesson.title, blockKey: lessonId })
    );
  }
  return questions;
}

function computeUnlock(answers, questions) {
  let highestUnlock = 0;
  for (const lid of CHECKPOINT_IDS) {
    const blockQs = questions.filter((q) => q.blockKey === lid);
    if (!blockQs.length) continue;
    const correct = blockQs.filter((q) => answers[questions.indexOf(q)] === q.answer).length;
    const passed = correct >= Math.ceil(blockQs.length * PASS_THRESHOLD);
    if (passed) {
      highestUnlock = UNLOCK_MAP[lid] ?? highestUnlock;
    } else {
      break; // Sequential: stop at first failed block
    }
  }
  return highestUnlock;
}

// ─── Result panel ────────────────────────────────────────────────────────────
function ResultPanel({ unlockUpTo, onComplete, onSkip, answers, questions }) {
  const totalCorrect = questions.filter((q, i) => answers[i] === q.answer).length;
  const pct = Math.round((totalCorrect / questions.length) * 100);

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-10">
      {/* Score card */}
      <div className="card text-center">
        <div className="text-5xl mb-4">{unlockUpTo > 0 ? '🎉' : '📚'}</div>
        <h3 className="text-2xl font-bold text-white mb-2">
          {unlockUpTo > 0 ? 'Výborné výsledky!' : 'Začínaš od základov'}
        </h3>
        <p className="text-gray-400 text-sm">
          Správne odpovede: {totalCorrect}/{questions.length} ({pct}%)
        </p>
        {unlockUpTo > 0 ? (
          <div className="mt-4 p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/50">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Unlock size={18} className="text-emerald-400" />
              <p className="text-emerald-300 font-bold text-lg">Odomknutých {unlockUpTo} lekcií</p>
            </div>
            <p className="text-emerald-400/70 text-sm">Lekcie L01–L{unlockUpTo.toString().padStart(2,'0')} sú dostupné</p>
          </div>
        ) : (
          <p className="text-gray-500 text-sm mt-3">Nevadí — kurz je zostavený presne pre teba. Začni od začiatku!</p>
        )}
      </div>

      {/* Block breakdown */}
      <div className="card space-y-2">
        <p className="text-sm font-semibold text-gray-300 mb-3">Výsledky podľa blokov:</p>
        {CHECKPOINT_IDS.map((lid) => {
          const blockQs = questions.filter((q) => q.blockKey === lid);
          if (!blockQs.length) return null;
          const correct = blockQs.filter(
            (q) => answers[questions.indexOf(q)] === q.answer
          ).length;
          const passed = correct >= Math.ceil(blockQs.length * PASS_THRESHOLD);
          const unlocks = UNLOCK_MAP[lid];
          return (
            <div
              key={lid}
              className={`flex items-center gap-3 p-2.5 rounded-xl ${
                passed
                  ? 'bg-emerald-950/30 border border-emerald-800/30'
                  : 'bg-gray-800/30 border border-gray-700/20'
              }`}
            >
              {passed ? (
                <CheckCircle size={14} className="text-emerald-400 flex-shrink-0" />
              ) : (
                <Lock size={14} className="text-gray-600 flex-shrink-0" />
              )}
              <div className="flex-1 text-xs">
                <span className={passed ? 'text-emerald-300' : 'text-gray-600'}>
                  L{lid.toString().padStart(2, '0')} oblasť ·{' '}
                  {blockQs[0]?.lessonTitle} · {correct}/{blockQs.length} správne
                </span>
              </div>
              {passed && (
                <span className="text-xs text-emerald-400/70 flex-shrink-0">
                  → L{unlocks.toString().padStart(2, '0')} odomknuté
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* CTA */}
      {unlockUpTo > 0 ? (
        <button
          onClick={() => onComplete(unlockUpTo)}
          className="w-full btn-primary py-4 text-base font-semibold flex items-center justify-center gap-2"
        >
          <Unlock size={18} /> Odomknúť L01–L{unlockUpTo.toString().padStart(2,'0')} a začať
        </button>
      ) : (
        <button
          onClick={onSkip}
          className="w-full btn-primary py-4 text-base font-semibold flex items-center justify-center gap-2"
        >
          <Zap size={18} /> Začať od L01
        </button>
      )}
      {unlockUpTo > 0 && (
        <button
          onClick={onSkip}
          className="w-full text-center text-xs text-gray-600 hover:text-gray-400 transition-colors py-2"
        >
          Začať od L01 bez odomknutia
        </button>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function PlacementTest({ onComplete, onSkip }) {
  const questions = useMemo(() => buildQuestions(), []);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [finished, setFinished] = useState(false);
  const [unlockUpTo, setUnlockUpTo] = useState(0);

  if (!questions.length) {
    return (
      <div className="max-w-xl mx-auto p-8 text-center">
        <p className="text-gray-400">Test nie je dostupný. Začni kurz od začiatku.</p>
        <button onClick={onSkip} className="mt-4 btn-primary px-6 py-2">
          Začať L01
        </button>
      </div>
    );
  }

  const q = questions[currentIdx];
  const isLast = currentIdx === questions.length - 1;

  const handleSelect = (optIdx) => {
    if (confirmed) return;
    setSelectedOption(optIdx);
  };

  const handleConfirm = () => {
    if (selectedOption === null) return;
    const newAnswers = { ...answers, [currentIdx]: selectedOption };
    setAnswers(newAnswers);
    setConfirmed(true);
    if (isLast) {
      const unlock = computeUnlock(newAnswers, questions);
      setUnlockUpTo(unlock);
      setFinished(true);
    }
  };

  const handleNext = () => {
    setCurrentIdx((i) => i + 1);
    setSelectedOption(null);
    setConfirmed(false);
  };

  if (finished) {
    return (
      <ResultPanel
        unlockUpTo={unlockUpTo}
        onComplete={onComplete}
        onSkip={onSkip}
        answers={answers}
        questions={questions}
      />
    );
  }

  // Current block info
  const blockIdx = CHECKPOINT_IDS.indexOf(q.blockKey);
  const blockLabel = `${blockIdx + 1}/${CHECKPOINT_IDS.length}`;

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-10">
      {/* Header */}
      <div className="space-y-2">
        <button
          onClick={onSkip}
          className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-400 transition-colors"
        >
          <ArrowLeft size={13} /> Preskočiť test
        </button>
        <h2 className="text-2xl font-bold text-white">Vstupný test</h2>
        <p className="text-gray-400 text-sm">
          Odpovedaj na otázky — odomkneme lekcie, ktoré už ovládaš.
        </p>
        {/* Progress bar */}
        <div className="flex gap-1 mt-3">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                i < currentIdx
                  ? 'bg-emerald-500'
                  : i === currentIdx
                  ? 'bg-indigo-500'
                  : 'bg-gray-700'
              }`}
            />
          ))}
        </div>
        <p className="text-xs text-gray-600">
          Blok {blockLabel} · Otázka {currentIdx + 1}/{questions.length}
        </p>
      </div>

      {/* Question card */}
      <div className="card">
        <p className="text-xs text-indigo-400/80 font-medium mb-3">{q.lessonTitle}</p>
        <p className="text-white font-semibold text-base leading-relaxed mb-5">{q.question}</p>
        <div className="space-y-2">
          {q.options.map((opt, i) => {
            let cls =
              'w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ';
            if (!confirmed) {
              cls +=
                i === selectedOption
                  ? 'border-indigo-500 bg-indigo-900/60 text-white'
                  : 'border-gray-700 bg-gray-800/60 text-gray-300 hover:border-gray-500 hover:bg-gray-700/60 cursor-pointer';
            } else {
              if (i === q.answer)
                cls += 'border-emerald-600 bg-emerald-950/60 text-emerald-200';
              else if (i === selectedOption)
                cls += 'border-red-700 bg-red-950/40 text-red-300';
              else cls += 'border-gray-800 bg-gray-800/30 text-gray-600';
            }
            return (
              <button key={i} onClick={() => handleSelect(i)} className={cls}>
                <span className="flex items-center gap-2">
                  {confirmed && i === q.answer && (
                    <CheckCircle size={14} className="text-emerald-400 flex-shrink-0" />
                  )}
                  {confirmed && i === selectedOption && i !== q.answer && (
                    <XCircle size={14} className="text-red-400 flex-shrink-0" />
                  )}
                  {opt}
                </span>
              </button>
            );
          })}
        </div>
        {confirmed && q.explanation && (
          <p className="mt-3 text-xs text-gray-400 bg-gray-800/40 rounded-lg px-3 py-2 leading-relaxed">
            {q.explanation}
          </p>
        )}
      </div>

      {/* Action buttons */}
      {!confirmed ? (
        <button
          onClick={handleConfirm}
          disabled={selectedOption === null}
          className="w-full btn-primary py-3 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Potvrdiť odpoveď
        </button>
      ) : !isLast ? (
        <button
          onClick={handleNext}
          className="w-full btn-primary py-3 flex items-center justify-center gap-2"
        >
          Ďalšia otázka <ChevronRight size={16} />
        </button>
      ) : null}
    </div>
  );
}
