import React, { useState, useEffect, useMemo } from 'react';
import { LESSONS } from '../data/curriculum';
import { BookOpen, Volume2, Search, Zap, Lock, CheckCircle, ArrowRight, Bookmark, ArrowLeft, RefreshCw, ChevronRight } from 'lucide-react';
import { useTTS } from '../hooks/useTTS';

import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Mic } from 'lucide-react';

function GrammarDrill({ lesson }) {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [key, setKey] = useState(0);

  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [speechResult, setSpeechResult] = useState(null);

  useEffect(() => {
    const qs = [];
    const mcqEx = lesson.exercises?.find((e) => e.type === 'mcq');
    const fillEx = lesson.exercises?.find((e) => e.type === 'fill');
    const speakEx = lesson.exercises?.find((e) => e.type === 'speaking');

    if (mcqEx?.questions) {
      mcqEx.questions.slice(0, 3).forEach((q) => {
        qs.push({ type: 'mcq', question: q.question, options: q.options, answer: q.answer });
      });
    }

    if (fillEx?.questions) {
      const fillQs = fillEx.questions;
      const allAnswers = fillQs.map((q) => q.answer);
      const want = Math.max(0, Math.min(3, 8 - qs.length));
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

    if (speakEx?.phrases) {
      // Add one or two speaking exercises if available
      speakEx.phrases.slice(0, 2).forEach(p => {
        qs.push({ type: 'speech', de: p.de, sk: p.sk, tip: p.tip });
      });
    }

    // shuffle
    for (let i = qs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [qs[i], qs[j]] = [qs[j], qs[i]];
    }

    setQuestions(qs.slice(0, 5));
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setDone(false);
    setSpeechResult(null);
  }, [lesson.id, key]);

  if (questions.length === 0) {
    return (
      <div className="p-6 bg-gray-900/50 rounded-2xl border border-gray-800/80 text-center text-gray-500">
        <p>Pre toto pravidlo nemáme oddelený minikvíz. Pokračuj v hlavných lekciách.</p>
      </div>
    );
  }

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="p-8 bg-indigo-900/20 border border-indigo-800/40 rounded-3xl text-center space-y-4">
        <div className="w-20 h-20 mx-auto bg-indigo-500/10 rounded-full flex items-center justify-center border border-indigo-500/20 shadow-lg">
          <Zap size={32} className="text-indigo-400" />
        </div>
        <h3 className="text-2xl font-bold text-white">Gramatika precvičená!</h3>
        <p className="text-gray-300">
          Úspešnosť: <span className="font-bold text-indigo-300 text-lg">{score} z {questions.length}</span> ({pct}%)
        </p>
        <button
          onClick={() => setKey(k => k + 1)}
          className="mt-4 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all inline-flex items-center gap-2"
        >
          <RefreshCw size={18} /> Skúsiť iné cvičenia
        </button>
      </div>
    );
  }

  const q = questions[current];
  const isAnswered = selected !== null || speechResult !== null;

  const handleSelect = (idx) => {
    if (isAnswered) return;
    setSelected(idx);
    if (idx === q.answer) setScore((s) => s + 1);
  };

  const startListening = () => {
    resetTranscript();
    setSpeechResult(null);
    SpeechRecognition.startListening({ language: 'de-DE', continuous: false });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();

    // Evaluate pronunciation
    setTimeout(() => {
      const spoken = transcript.toLowerCase().replace(/[^a-zäöüß]/g, '');
      const target = q.de.toLowerCase().replace(/[^a-zäöüß]/g, '');

      let correctTokens = 0;
      const targetTokens = q.de.toLowerCase().split(/\s+/);
      const spokenTokens = transcript.toLowerCase().split(/\s+/);

      for (const t of targetTokens) {
        if (spokenTokens.includes(t.replace(/[^a-zäöüß]/g, ''))) correctTokens++;
      }

      const accuracy = targetTokens.length > 0 ? (correctTokens / targetTokens.length) : 0;

      if (accuracy > 0.6 || spoken.includes(target) || target.includes(spoken)) {
        setSpeechResult('success');
        setScore(s => s + 1);
      } else {
        setSpeechResult('fail');
      }
    }, 500);
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setDone(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setSpeechResult(null);
      resetTranscript();
    }
  };

  return (
    <div className="p-6 sm:p-8 bg-gray-900/80 border border-gray-700/60 rounded-3xl space-y-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-indigo-400 font-bold">
          <Zap size={18} />
          Multifunkčný Kvíz ({current + 1} / {questions.length})
        </div>
        <div className="flex gap-1.5">
          {questions.map((_, i) => (
            <div key={i} className={`w-6 sm:w-8 h-1.5 rounded-full ${i < current ? 'bg-indigo-500' : i === current ? 'bg-indigo-400/50' : 'bg-gray-800'}`} />
          ))}
        </div>
      </div>

      {(q.type === 'mcq' || q.type === 'fill') && (
        <>
          <p className="text-lg text-white font-medium leading-relaxed bg-gray-950/50 p-4 rounded-xl border border-gray-800 shadow-inner">
            {q.type === 'fill'
              ? q.question.split('___').map((part, i, arr) => (
                <React.Fragment key={i}>
                  {part}
                  {i < arr.length - 1 && <span className="text-indigo-400 border-b-2 border-indigo-400/50 font-bold px-2 inline-block translate-y-1 w-16 text-center">?</span>}
                </React.Fragment>
              ))
              : q.question}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {q.options.map((opt, idx) => {
              let cls = 'w-full text-left px-5 py-3.5 rounded-xl font-medium text-sm transition-all border duration-200 ';
              if (!isAnswered) {
                cls += 'bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700 hover:border-indigo-500/50 hover:shadow-md cursor-pointer';
              } else if (idx === q.answer) {
                cls += 'bg-emerald-900/50 border-emerald-500 text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.2)]';
              } else if (idx === selected) {
                cls += 'bg-red-900/30 border-red-500/50 text-red-300';
              } else {
                cls += 'bg-gray-900/50 border-gray-800/50 text-gray-600';
              }
              return (
                <button key={idx} className={cls} onClick={() => handleSelect(idx)} disabled={isAnswered}>
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border text-xs font-bold flex-shrink-0
                          ${isAnswered && idx === q.answer ? 'bg-emerald-500 text-white border-emerald-400' :
                        isAnswered && idx === selected ? 'bg-red-500 text-white border-red-400' :
                          'bg-gray-700 text-gray-400 border-gray-600'}`}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span>{opt}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}

      {q.type === 'speech' && (
        <div className="text-center space-y-6">
          <div className="bg-gray-950/50 p-6 rounded-2xl border border-gray-800 shadow-inner">
            <p className="text-sm text-gray-400 mb-2 uppercase tracking-wider font-bold">Vyslovte do mikrofónu:</p>
            <p className="text-2xl font-extrabold text-white mb-2">{q.de}</p>
            <p className="text-indigo-400">{q.sk}</p>
            {q.tip && <p className="text-xs text-amber-500/80 mt-4 bg-amber-500/10 inline-block px-3 py-1 rounded-full border border-amber-500/20">{q.tip}</p>}
          </div>

          {!SpeechRecognition.browserSupportsSpeechRecognition() ? (
            <p className="text-red-400 text-sm">Váš prehliadač nepodporuje rozpoznávanie reči. Povoľte ju v Chrome.</p>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <button
                onMouseDown={startListening}
                onMouseUp={stopListening}
                onTouchStart={startListening}
                onTouchEnd={stopListening}
                disabled={isAnswered}
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${listening ? 'bg-red-500 animate-pulse shadow-[0_0_30px_rgba(239,68,68,0.5)]' :
                    isAnswered ? 'bg-gray-800 text-gray-600' :
                      'bg-indigo-600 hover:bg-indigo-500 shadow-lg hover:scale-105'
                  } text-white`}
              >
                <Mic size={32} />
              </button>
              <p className="text-gray-400 text-sm">{listening ? 'Počúvam...' : isAnswered ? 'Vyhodnotené' : 'Zadžte tlačidlo a hovorte'}</p>

              {transcript && (
                <p className="text-lg text-white font-serif italic bg-gray-900 px-4 py-2 rounded-xl">"{transcript}"</p>
              )}

              {speechResult === 'success' && <p className="text-emerald-400 font-bold bg-emerald-500/10 px-4 py-2 rounded-xl">Skvelá výslovnosť! +1 bod</p>}
              {speechResult === 'fail' && <p className="text-red-400 font-bold bg-red-500/10 px-4 py-2 rounded-xl">To nebolo celkom presné. Máme: "{transcript}"</p>}
            </div>
          )}
        </div>
      )}

      <div className={`transition-all duration-300 overflow-hidden ${isAnswered ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
        <button
          onClick={handleNext}
          className="w-full mt-4 py-3.5 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-xl transition-all border border-gray-700 flex items-center justify-center gap-2"
        >
          {current + 1 >= questions.length ? 'Zobraziť výsledok' : 'Pokračovať'} <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default function GrammarGuide({ progress }) {
  const { speak } = useTTS();
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  // Compute unlock status using Dashboard identical logic
  const completedLessons = progress?.completedLessons || {};

  const rules = useMemo(() => {
    return LESSONS.filter(l => l.grammarNote).map((lesson) => {
      const done = !!completedLessons[lesson.id];
      const globalIdx = LESSONS.findIndex(l => l.id === lesson.id);
      const prevLessonDone = globalIdx === 0 || !!completedLessons[LESSONS[globalIdx - 1]?.id];
      const placementUnlocked = lesson.id <= (progress?.placementUnlockedUpTo || 0);
      const available = done || prevLessonDone || placementUnlocked;

      return {
        ...lesson,
        isUnlocked: available || done,
        isDone: done
      };
    });
  }, [completedLessons, progress?.placementUnlockedUpTo]);

  // Set default selection
  useEffect(() => {
    if (!selectedId && rules.length > 0) {
      // pick first unlocked
      const activeItem = rules.slice().reverse().find(r => r.isUnlocked) || rules[0];
      if (activeItem) setSelectedId(activeItem.id);
    }
  }, [rules, selectedId]);

  const filtered = rules.filter((l) => {
    const q = search.toLowerCase();
    return (
      !q ||
      (l.grammarNote?.rule || '').toLowerCase().includes(q) ||
      (l.grammarNote?.explanation || '').toLowerCase().includes(q) ||
      (l.title || '').toLowerCase().includes(q)
    );
  });

  const selectedRule = rules.find((r) => r.id === selectedId);

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col h-[calc(100vh-6rem)] relative">

      {/* Header */}
      <div className="flex-shrink-0 mb-6 px-4">
        <h2 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <BookOpen size={28} className="text-indigo-400" /> Gramatická Encyklopédia
        </h2>
        <p className="text-gray-400 text-sm mt-1">Prezeraj si detailne pravidlá, precvičuj cvičenia, ukladaj si vzorce.</p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0 px-4 pb-6">

        {/* Left Sidebar - List of Grammars */}
        <div className="w-full md:w-1/3 flex flex-col gap-4 flex-shrink-0 max-h-[40vh] md:max-h-none h-full bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-sm">

          <div className="p-4 border-b border-gray-800 bg-gray-950/30">
            <div className="relative">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Hľadaj tému (napr. Akuzatív, Modálne...)"
                className="w-full bg-gray-900 border border-gray-700/80 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:bg-gray-800 transition-all shadow-inner"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {filtered.map((lesson) => {
              const isActive = selectedId === lesson.id;

              if (!lesson.isUnlocked) {
                return (
                  <div key={lesson.id} className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-800/40 bg-gray-900/30 opacity-60">
                    <div className="w-8 h-8 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center flex-shrink-0">
                      <Lock size={14} className="text-gray-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-500 truncate">{lesson.grammarNote.rule}</p>
                      <p className="text-[11px] text-gray-600 truncate">{lesson.title}</p>
                    </div>
                  </div>
                );
              }

              return (
                <button
                  key={lesson.id}
                  onClick={() => setSelectedId(lesson.id)}
                  className={`w-full text-left flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-200 group
                      ${isActive
                      ? 'bg-indigo-900/40 border-indigo-700/50 shadow-md transform scale-[1.02]'
                      : 'bg-gray-800/40 border-gray-700/50 hover:bg-gray-800 hover:border-gray-600'}`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors
                      ${isActive ? 'bg-indigo-500 text-white shadow-inner' : lesson.isDone ? 'bg-emerald-900/50 text-emerald-400 border border-emerald-800' : 'bg-gray-700 text-gray-300'}`}>
                    {lesson.isDone ? <CheckCircle size={16} /> : <Bookmark size={14} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-bold truncate ${isActive ? 'text-indigo-100' : 'text-gray-200'}`}>
                      {lesson.grammarNote.rule}
                    </p>
                    <p className={`text-[11px] truncate ${isActive ? 'text-indigo-300/80' : 'text-gray-500'}`}>
                      Z lekcie {lesson.id}: {lesson.title}
                    </p>
                  </div>
                  {isActive && <ChevronRight size={18} className="text-indigo-400 flex-shrink-0" />}
                </button>
              );
            })}

            {filtered.length === 0 && (
              <div className="text-center py-12 px-4">
                <Search size={32} className="mx-auto text-gray-700 mb-3" />
                <p className="text-gray-400 font-medium">Nenašli sme žiadne pravidlo pre "{search}"</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Detail Pane */}
        <div className="w-full md:w-2/3 h-full bg-gray-900 border border-gray-800 rounded-3xl overflow-y-auto shadow-sm relative">

          {/* Floating glow behind header */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-indigo-900/20 to-transparent pointer-events-none"></div>

          {selectedRule ? (
            <div className="p-6 sm:p-10 pb-20 relative z-10 max-w-4xl mx-auto">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg text-xs font-bold uppercase tracking-wider">
                    Pravidlo L{selectedRule.id.toString().padStart(2, '0')}
                  </span>
                  {selectedRule.isDone && (
                    <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-xs font-bold uppercase flex items-center gap-1">
                      <CheckCircle size={12} /> Náučené
                    </span>
                  )}
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">{selectedRule.grammarNote.rule}</h1>
                <p className="text-base text-gray-300 leading-relaxed max-w-2xl bg-gray-800/40 p-5 rounded-2xl border border-gray-700/50 shadow-inner">
                  {selectedRule.grammarNote.explanation}
                </p>
              </div>

              <div className="space-y-10">

                {/* Examples Block */}
                {selectedRule.grammarNote?.examples && selectedRule.grammarNote.examples.length > 0 && (
                  <section>
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 border-b border-gray-800 pb-2">
                      <Volume2 size={20} className="text-indigo-400" />
                      Príklady z praxe
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedRule.grammarNote.examples.map((ex, i) => (
                        <button
                          key={i}
                          onClick={() => speak(ex.de)}
                          className="group text-left p-4 bg-gray-800/30 hover:bg-indigo-950/30 rounded-2xl border border-gray-800 hover:border-indigo-600/40 transition-all flex flex-col gap-2 relative overflow-hidden"
                        >
                          <div className="absolute right-3 top-3 w-8 h-8 rounded-full bg-gray-800 group-hover:bg-indigo-500 text-gray-500 group-hover:text-white flex items-center justify-center transition-colors shadow-sm">
                            <Volume2 size={16} />
                          </div>
                          <p className="text-white font-bold text-base pr-8">{ex.de}</p>
                          <p className="text-gray-400 text-sm">{ex.sk}</p>
                        </button>
                      ))}
                    </div>
                  </section>
                )}

                {/* Alphabet Table (Interactive) */}
                {selectedRule.grammarNote?.alphabetTable && (
                  <section>
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 border-b border-gray-800 pb-2">
                      <Zap size={20} className="text-amber-400" />
                      Interaktívna abeceda (klikni pre výslovnosť)
                    </h3>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                      {selectedRule.grammarNote.alphabetTable.map((item, i) => (
                        <button
                          key={i}
                          onClick={() => speak(`${item.letter}. ${item.example}`)}
                          className="group flex flex-col items-center p-3 bg-gray-800/40 hover:bg-indigo-900/40 border border-gray-700/50 hover:border-indigo-500/50 rounded-xl transition-all shadow-sm"
                        >
                          <span className="text-2xl font-extrabold text-white group-hover:text-indigo-300 transition-colors">{item.letter}</span>
                          <span className="text-xs text-gray-400 mt-1">[{item.name}]</span>
                          <span className="text-[10px] text-gray-500 mt-2 text-center break-words w-full truncate" title={item.example}>{item.example}</span>
                        </button>
                      ))}
                    </div>
                  </section>
                )}

                {/* Phonetic Alphabet */}
                {selectedRule.grammarNote?.phoneticAlphabet && (
                  <section>
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 border-b border-gray-800 pb-2">
                      <BookOpen size={20} className="text-emerald-400" />
                      Hláskovacia abeceda (Telefón)
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                      {selectedRule.grammarNote.phoneticAlphabet.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 bg-gray-800/30 border border-gray-700/30 rounded-lg">
                          <span className="font-bold text-emerald-400 w-6 text-center">{item.letter}</span>
                          <span className="text-sm text-gray-300">wie {item.word}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Digraphs */}
                {selectedRule.grammarNote?.digraphs && (
                  <section>
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 border-b border-gray-800 pb-2">
                      <Zap size={20} className="text-indigo-400" />
                      Špeciálne zvuky (Zložky)
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedRule.grammarNote.digraphs.map((item, i) => (
                        <button key={i} onClick={() => speak(item.example)} className="text-left p-3 flex flex-col bg-gray-800/30 hover:bg-indigo-900/20 border border-gray-700/50 rounded-xl transition-colors">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-extrabold text-lg text-white">{item.combo}</span>
                            <span className="text-indigo-400 font-mono bg-indigo-500/10 px-2 py-0.5 rounded text-sm">{item.sound}</span>
                          </div>
                          <div className="text-sm text-gray-400">Príklad: <span className="text-gray-200 font-bold">{item.example}</span> ({item.sk})</div>
                        </button>
                      ))}
                    </div>
                  </section>
                )}

                {/* Key Vocabulary of the lesson */}
                <section>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 border-b border-gray-800 pb-2">
                    <Bookmark size={20} className="text-amber-400" />
                    Najdôležitejšie slovíčka z tejto lekcie
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {selectedRule.vocab?.slice(0, 12).map((v) => (
                      <button
                        key={v.de}
                        onClick={() => speak(v.de)}
                        className="group flex items-center gap-2 bg-gray-800/50 hover:bg-amber-950/40 rounded-xl px-3.5 py-2 border border-gray-700/50 hover:border-amber-700/40 transition-all"
                      >
                        <span className="font-bold text-white group-hover:text-amber-100">{v.de}</span>
                        <span className="text-gray-600 mx-1">—</span>
                        <span className="text-gray-400 text-xs">{v.sk}</span>
                      </button>
                    ))}
                    {selectedRule.vocab?.length > 12 && (
                      <span className="px-3 py-2 text-xs text-gray-500 font-medium">+ ďalších {selectedRule.vocab.length - 12} slov</span>
                    )}
                  </div>
                </section>

                {/* Embedded Quiz */}
                <section className="pt-6">
                  <GrammarDrill lesson={selectedRule} />
                </section>

              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8 opacity-60">
              <BookOpen size={64} className="text-gray-700 mb-6" />
              <h3 className="text-2xl font-bold text-gray-400 mb-2">Vyberte si pravidlo vľavo</h3>
              <p className="text-gray-500 max-w-sm mx-auto">Sledujete gramatiku z pohľadu učiva, ktoré už máte za sebou. Neodomknuté lekcie sú znázornené zámkom.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
