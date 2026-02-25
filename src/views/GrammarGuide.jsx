import React, { useState } from 'react';
import { LESSONS } from '../data/curriculum';
import { BookOpen, ChevronDown, ChevronUp, Volume2, Search, Zap } from 'lucide-react';
import { useTTS } from '../hooks/useTTS';

function GrammarDrill({ lesson, onClose }) {
  const buildQuestions = () => {
    const qs = [];
    const mcqEx = lesson.exercises?.find((e) => e.type === 'mcq');
    const fillEx = lesson.exercises?.find((e) => e.type === 'fill');

    if (mcqEx?.questions) {
      mcqEx.questions.slice(0, 3).forEach((q) => {
        qs.push({ type: 'mcq', question: q.question, options: q.options, answer: q.answer });
      });
    }

    if (fillEx?.questions) {
      const fillQs = fillEx.questions;
      const allAnswers = fillQs.map((q) => q.answer);
      const want = Math.max(0, Math.min(2, 5 - qs.length));
      fillQs.slice(0, want).forEach((q, i) => {
        const distractors = allAnswers.filter((a, idx) => idx !== i && a !== q.answer);
        const pool = [];
        for (let j = 0; pool.length < 3; j++) {
          if (j < distractors.length) pool.push(distractors[j]);
          else pool.push('—');
        }
        const correctPos = Math.floor(Math.random() * 4);
        const opts = [...pool];
        opts.splice(correctPos, 0, q.answer);
        qs.push({ type: 'fill', question: q.sentence, options: opts, answer: correctPos });
      });
    }

    // If fill was short, top up with more MCQ
    if (mcqEx?.questions && qs.length < 5) {
      const already = qs.filter((q) => q.type === 'mcq').length;
      mcqEx.questions.slice(already, already + (5 - qs.length)).forEach((q) => {
        qs.push({ type: 'mcq', question: q.question, options: q.options, answer: q.answer });
      });
    }

    return qs.slice(0, 5);
  };

  const [questions] = React.useState(() => buildQuestions());
  const [current, setCurrent] = React.useState(0);
  const [selected, setSelected] = React.useState(null);
  const [score, setScore] = React.useState(0);
  const [done, setDone] = React.useState(false);

  if (questions.length === 0) {
    return (
      <div className="mt-4 p-4 bg-gray-800/50 rounded-xl text-sm text-gray-400 text-center">
        Žiadne cvičenia pre túto lekciu.
        <button onClick={onClose} className="ml-3 text-indigo-400 hover:text-indigo-300">Zavrieť</button>
      </div>
    );
  }

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="mt-4 p-5 bg-gray-900/60 border border-indigo-900/30 rounded-xl text-center space-y-2">
        <p className="text-white font-bold text-2xl">{pct}%</p>
        <p className="text-gray-400 text-sm">{score} / {questions.length} správnych odpovedí</p>
        <button
          onClick={onClose}
          className="mt-2 px-5 py-2 bg-indigo-700 hover:bg-indigo-600 text-white rounded-xl text-sm transition-all"
        >
          Zavrieť
        </button>
      </div>
    );
  }

  const q = questions[current];
  const isAnswered = selected !== null;

  const handleSelect = (idx) => {
    if (isAnswered) return;
    setSelected(idx);
    if (idx === q.answer) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setDone(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  };

  return (
    <div className="mt-4 p-4 bg-gray-900/60 border border-indigo-900/30 rounded-xl space-y-3">
      <p className="text-xs text-gray-500">{current + 1} / {questions.length}</p>

      <p className="text-sm text-white leading-relaxed">
        {q.type === 'fill'
          ? q.question.split('___').map((part, i, arr) => (
              <React.Fragment key={i}>
                {part}
                {i < arr.length - 1 && <span className="text-gray-500 font-mono">___</span>}
              </React.Fragment>
            ))
          : q.question}
      </p>

      <div className="grid grid-cols-1 gap-2">
        {q.options.map((opt, idx) => {
          let cls = 'w-full text-left px-3 py-2 rounded-xl text-sm border transition-all ';
          if (!isAnswered) {
            cls += 'bg-gray-800/60 border-gray-700/40 text-gray-300 hover:bg-gray-700/60 hover:border-gray-600';
          } else if (idx === q.answer) {
            cls += 'bg-green-900/40 border-green-700/60 text-green-300';
          } else if (idx === selected) {
            cls += 'bg-red-900/40 border-red-700/60 text-red-300';
          } else {
            cls += 'bg-gray-800/30 border-gray-700/20 text-gray-500';
          }
          return (
            <button key={idx} className={cls} onClick={() => handleSelect(idx)} disabled={isAnswered}>
              {opt}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <button
          onClick={handleNext}
          className="w-full py-2 text-sm text-indigo-400 hover:text-indigo-300 border border-indigo-800/40 rounded-xl hover:bg-indigo-950/30 transition-all"
        >
          {current + 1 >= questions.length ? 'Zobraziť výsledok' : 'Ďalej →'}
        </button>
      )}
    </div>
  );
}

export default function GrammarGuide() {
  const { speak } = useTTS();
  const [search, setSearch] = useState('');
  const [openId, setOpenId] = useState(null);
  const [practiceOpenId, setPracticeOpenId] = useState(null);

  const filtered = LESSONS.filter((l) => {
    const q = search.toLowerCase();
    return (
      !q ||
      l.grammarNote.rule.toLowerCase().includes(q) ||
      l.grammarNote.explanation.toLowerCase().includes(q) ||
      l.title.toLowerCase().includes(q)
    );
  });

  // Group by week
  const weeks = [...new Set(filtered.map((l) => l.week))];

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div className="flex items-center gap-3 mb-2">
        <BookOpen size={22} className="text-indigo-400" />
        <h2 className="text-2xl font-bold text-white">Gramatický prehľad</h2>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Hľadaj gramatiku..."
          className="w-full bg-gray-900 border border-gray-700 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-600"
        />
      </div>

      {weeks.map((week) => {
        const weekLessons = filtered.filter((l) => l.week === week);
        return (
          <div key={week}>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2 px-1">Týždeň {week}</p>
            <div className="space-y-2">
              {weekLessons.map((lesson) => {
                const { grammarNote } = lesson;
                const isOpen = openId === lesson.id;
                return (
                  <div key={lesson.id} className="card hover:border-gray-600 transition-all">
                    <button
                      className="w-full text-left flex items-center gap-3"
                      onClick={() => setOpenId(isOpen ? null : lesson.id)}
                    >
                      <div className="w-8 h-8 bg-indigo-900/60 border border-indigo-700/40 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold text-indigo-300">
                        {lesson.id}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{grammarNote.rule}</p>
                        <p className="text-xs text-gray-500 truncate">{lesson.title}</p>
                      </div>
                      {isOpen ? <ChevronUp size={16} className="text-gray-500 flex-shrink-0" /> : <ChevronDown size={16} className="text-gray-500 flex-shrink-0" />}
                    </button>

                    {isOpen && (
                      <div className="mt-4 border-t border-white/5 pt-4 space-y-4">
                        <p className="text-sm text-gray-300 leading-relaxed">{grammarNote.explanation}</p>

                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">Príklady</p>
                          <div className="space-y-1.5">
                            {grammarNote.examples.map((ex, i) => (
                              <button
                                key={i}
                                onClick={() => speak(ex.de)}
                                className="w-full text-left flex items-start gap-3 bg-gray-800/50 hover:bg-gray-800 rounded-xl p-3 transition-all group"
                              >
                                <Volume2 size={14} className="text-indigo-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                <div>
                                  <p className="text-white text-sm">{ex.de}</p>
                                  <p className="text-gray-400 text-xs">{ex.sk}</p>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">Slovíčka z tejto lekcie</p>
                          <div className="flex flex-wrap gap-2">
                            {lesson.vocab.map((v) => (
                              <button
                                key={v.de}
                                onClick={() => speak(v.de)}
                                className="bg-gray-800/60 hover:bg-gray-700/60 rounded-lg px-3 py-1.5 text-xs text-gray-300 border border-gray-700/40 hover:border-gray-600 transition-all"
                                title={v.sk}
                              >
                                {v.de} <span className="text-gray-500">— {v.sk}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <button
                          onClick={() => setPracticeOpenId(practiceOpenId === lesson.id ? null : lesson.id)}
                          className="mt-4 flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 border border-indigo-800/40 rounded-xl px-4 py-2 hover:bg-indigo-950/30 transition-all"
                        >
                          <Zap size={14} />
                          {practiceOpenId === lesson.id ? 'Zavrieť cvičenie' : 'Precvičiť gramatiku →'}
                        </button>

                        {practiceOpenId === lesson.id && (
                          <GrammarDrill
                            lesson={lesson}
                            onClose={() => setPracticeOpenId(null)}
                          />
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Žiadne výsledky pre „{search}"</p>
        </div>
      )}
    </div>
  );
}
