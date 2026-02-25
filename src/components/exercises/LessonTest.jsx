/**
 * LessonTest — Strict post-lesson quiz. No hints, no TTS, no lightbulbs.
 * Builds a 10-question pool from the lesson's MCQ exercises, Fill exercises,
 * and vocabulary, then presents them one at a time with immediate feedback.
 */
import React, { useState } from 'react';
import { CheckCircle, XCircle, ClipboardCheck } from 'lucide-react';

// ─── helpers ──────────────────────────────────────────────────────────────────

/** Fisher-Yates in-place shuffle, returns new array */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Pick n random items from arr (without replacement) */
function pickRandom(arr, n) {
  return shuffle(arr).slice(0, n);
}

// ─── question builder ─────────────────────────────────────────────────────────

function buildTest(lesson) {
  const pool = [];

  // 1. MCQ exercises — up to 4 questions ─────────────────────────────────────
  const allMcqQuestions = (lesson.exercises || [])
    .filter((e) => e.type === 'mcq')
    .flatMap((e) => e.questions || []);

  const mcqPicked = pickRandom(allMcqQuestions, 4);
  for (const q of mcqPicked) {
    // options are already shuffled in source data; keep as-is
    pool.push({
      question: q.question,
      options: q.options,
      answer: q.answer,
    });
  }

  // 2. Fill exercises → MCQ — up to 3 questions ───────────────────────────────
  const allFillQuestions = (lesson.exercises || [])
    .filter((e) => e.type === 'fill')
    .flatMap((e) => e.questions || []);

  const allFillAnswers = allFillQuestions.map((q) => q.answer);
  const fillPicked = pickRandom(allFillQuestions, 3);

  for (const q of fillPicked) {
    // Distractors: other fill answers from the same lesson
    const distractors = shuffle(allFillAnswers.filter((a) => a !== q.answer)).slice(0, 3);
    // Pad if lesson has very few fill answers
    while (distractors.length < 3) distractors.push('—');

    const unshuffled = [q.answer, ...distractors];
    const opts = shuffle(unshuffled);
    const correctIdx = opts.indexOf(q.answer);

    pool.push({
      question: q.sentence, // sentence contains ___ as literal blank
      options: opts,
      answer: correctIdx,
      isFill: true,
    });
  }

  // 3. Vocab MCQ (German → Slovak) — up to 3 questions ───────────────────────
  const vocab = lesson.vocab || [];
  const allSk = vocab.map((v) => v.sk);
  const vocabPicked = pickRandom(vocab, 3);

  for (const v of vocabPicked) {
    const distractors = shuffle(allSk.filter((sk) => sk !== v.sk)).slice(0, 3);
    while (distractors.length < 3) distractors.push('—');

    const unshuffled = [v.sk, ...distractors];
    const opts = shuffle(unshuffled);
    const correctIdx = opts.indexOf(v.sk);

    pool.push({
      question: `Čo znamená "${v.de}"?`,
      options: opts,
      answer: correctIdx,
    });
  }

  // Final shuffle and cap at 10 (minimum 5 if pool is small)
  const final = shuffle(pool);
  return final.slice(0, 10);
}

// ─── component ────────────────────────────────────────────────────────────────

export function LessonTest({ lesson, onComplete, onSkip }) {
  const [questions] = useState(() => buildTest(lesson));
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]); // array of booleans
  const [finished, setFinished] = useState(false);

  const total = questions.length;
  const q = questions[qIndex];
  const correctCount = answers.filter(Boolean).length;

  // ── handlers ──────────────────────────────────────────────────────────────

  const choose = (optIndex) => {
    if (selected !== null) return; // lock after first pick
    setSelected(optIndex);
  };

  const next = () => {
    if (selected === null) return;
    const isCorrect = selected === q.answer;
    const newAnswers = [...answers, isCorrect];
    setAnswers(newAnswers);

    if (qIndex < total - 1) {
      setQIndex(qIndex + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  // ── results screen ────────────────────────────────────────────────────────

  if (finished) {
    const finalCorrect = answers.filter(Boolean).length;
    const score = Math.round((finalCorrect / total) * 100);
    const message =
      score >= 80 ? 'Skvelé!' : score >= 60 ? 'Nie je to zlé' : 'Treba zopakovať';
    const scoreColor =
      score >= 80 ? 'text-emerald-400' : score >= 60 ? 'text-amber-400' : 'text-rose-400';
    const msgColor =
      score >= 80 ? 'text-emerald-300' : score >= 60 ? 'text-amber-300' : 'text-rose-300';

    return (
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2 text-gray-400">
          <ClipboardCheck className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">Test lekcie — bez nápovedy</span>
        </div>

        {/* Score */}
        <div className="text-center space-y-3 py-6">
          <div className={`text-7xl font-bold ${scoreColor}`}>{score}%</div>
          <p className={`text-2xl font-semibold ${msgColor}`}>{message}</p>
          <p className="text-gray-300 text-sm">
            {finalCorrect} / {total} správnych odpovedí
          </p>
        </div>

        {/* Progress dots recap */}
        <div className="flex gap-1">
          {answers.map((correct, i) => (
            <div
              key={i}
              className={`flex-1 h-2 rounded-full ${correct ? 'bg-emerald-500' : 'bg-rose-500'}`}
            />
          ))}
        </div>

        {/* Action */}
        <button
          onClick={() => onComplete(score)}
          className="w-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          Dokončiť
        </button>
      </div>
    );
  }

  // ── question screen ───────────────────────────────────────────────────────

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-5">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-400">
          <ClipboardCheck className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">Test lekcie — bez nápovedy</span>
        </div>
        {/* Skip button visible only on first question */}
        {qIndex === 0 && (
          <button
            onClick={onSkip}
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            Preskočiť test
          </button>
        )}
      </div>

      {/* Progress bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-gray-500">
          <span>Otázka {qIndex + 1} / {total}</span>
          <span>{correctCount} správnych</span>
        </div>
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-1.5 rounded-full transition-colors duration-300 ${
                i < qIndex
                  ? answers[i]
                    ? 'bg-emerald-500'
                    : 'bg-rose-500'
                  : i === qIndex
                  ? 'bg-indigo-500'
                  : 'bg-gray-700'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question card */}
      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5">
        <p className="text-lg font-semibold text-white leading-snug">{q.question}</p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {q.options.map((opt, i) => {
          const isCorrect = i === q.answer;
          const isChosen = i === selected;
          const revealed = selected !== null;

          let classes =
            'border rounded-xl p-4 text-left transition-all duration-200 flex items-center gap-3 ';

          if (!revealed) {
            classes += 'bg-gray-800 border-gray-700 hover:bg-gray-700 hover:border-gray-500 cursor-pointer';
          } else if (isCorrect) {
            classes += 'bg-emerald-900/60 border-emerald-600 cursor-default';
          } else if (isChosen) {
            classes += 'bg-rose-900/60 border-rose-600 cursor-default';
          } else {
            classes += 'bg-gray-800 border-gray-700 opacity-40 cursor-default';
          }

          return (
            <button key={i} onClick={() => choose(i)} className={classes}>
              <span className="text-xs text-gray-500 font-mono w-5 shrink-0">
                {String.fromCharCode(65 + i)}.
              </span>
              <span className="text-white text-sm leading-snug flex-1">{opt}</span>
              {revealed && isCorrect && (
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              )}
              {revealed && isChosen && !isCorrect && (
                <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Confirm / next button — appears after selection */}
      {selected !== null && (
        <button
          onClick={next}
          className="w-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          {qIndex < total - 1 ? 'Ďalšia otázka →' : 'Zobraziť výsledok'}
        </button>
      )}
    </div>
  );
}
