import React, { useState, useEffect, useRef } from 'react';
import { LESSONS } from '../data/curriculum';
import { Volume2, RotateCcw, CheckCircle, Brain, ChevronRight, ChevronLeft, LayoutGrid, CheckSquare, Edit3 } from 'lucide-react';
import { useTTS } from '../hooks/useTTS';
import { getExplanation } from '../hooks/useAI';
import { normalizeGerman } from '../utils/text';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDeck(progress) {
  const allVocab = LESSONS.flatMap((l) =>
    l.vocab.map((v) => ({ ...v, lessonId: l.id, lessonTitle: l.title }))
  );
  // Prioritize: unseen first, then not-mastered, then mastered (review)
  const vocabSeen = progress.vocabSeen || {};
  const unseen = allVocab.filter((v) => !vocabSeen[v.de]);
  const notMastered = allVocab.filter((v) => vocabSeen[v.de] && !vocabSeen[v.de].mastered);
  const mastered = allVocab.filter((v) => vocabSeen[v.de]?.mastered);
  return shuffle([...unseen, ...notMastered, ...shuffle(mastered).slice(0, 5)]);
}

function buildMCQOptions(current) {
  const pool = shuffle(
    LESSONS.flatMap((l) => l.vocab.map((v) => v.sk)).filter((sk) => sk !== current.sk)
  );
  return shuffle([current.sk, ...pool.slice(0, 3)]);
}

function buildGapSentence(current) {
  if (!current.example) return null;
  const regex = new RegExp(current.de.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
  if (!regex.test(current.example)) return null;
  return current.example.replace(regex, '___');
}

const MODES = [
  { id: 'A', label: 'Kartičky', Icon: LayoutGrid },
  { id: 'B', label: 'Výber', Icon: CheckSquare },
  { id: 'C', label: 'Doplňovanie', Icon: Edit3 },
];

export default function VocabTrainer({ progress, onMarkVocab }) {
  const { speak } = useTTS();
  const [mode, setMode] = useState('A');
  const [deck, setDeck] = useState([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [sessionResults, setSessionResults] = useState({ known: 0, unknown: 0 });
  const [done, setDone] = useState(false);

  // Mode B state
  const [mcqOptions, setMcqOptions] = useState([]);
  const [mcqSelected, setMcqSelected] = useState(null);

  // Mode C state
  const [gapInput, setGapInput] = useState('');
  const [gapChecked, setGapChecked] = useState(false);
  const [gapCorrect, setGapCorrect] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [loadingWhy, setLoadingWhy] = useState(false);
  const inputRef = useRef(null);

  const resetDeck = () => {
    const d = buildDeck(progress);
    setDeck(d);
    setIndex(0);
    setFlipped(false);
    setDone(false);
    setSessionResults({ known: 0, unknown: 0 });
    setMcqOptions([]);
    setMcqSelected(null);
    setGapInput('');
    setGapChecked(false);
    setGapCorrect(false);
    setExplanation(null);
    setLoadingWhy(false);
  };

  useEffect(() => {
    resetDeck();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleModeChange = (newMode) => {
    if (newMode === mode) return;
    setMode(newMode);
    resetDeck();
  };

  // Prepare MCQ options when card/mode changes
  useEffect(() => {
    if (mode === 'B' && deck.length > 0 && deck[index]) {
      setMcqOptions(buildMCQOptions(deck[index]));
      setMcqSelected(null);
    }
  }, [mode, index, deck]);

  // Focus input when card/mode changes in mode C
  useEffect(() => {
    if (mode === 'C' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [mode, index, deck]);

  const current = deck[index];
  const vocabSeen = progress.vocabSeen || {};
  const totalMastered = Object.values(vocabSeen).filter((v) => v.mastered).length;
  const allVocabCount = LESSONS.reduce((s, l) => s + l.vocab.length, 0);

  const advance = (isCorrect) => {
    setSessionResults((r) => ({
      known: r.known + (isCorrect ? 1 : 0),
      unknown: r.unknown + (isCorrect ? 0 : 1),
    }));
    if (index < deck.length - 1) {
      setIndex(index + 1);
      setFlipped(false);
      setMcqSelected(null);
      setGapInput('');
      setGapChecked(false);
      setGapCorrect(false);
      setExplanation(null);
    } else {
      setDone(true);
    }
  };

  // Mode A handlers
  const handleFlip = () => {
    if (!flipped) {
      speak(current.de);
      setFlipped(true);
    }
  };

  const handleResult = (mastered) => {
    onMarkVocab(current.de, mastered);
    advance(mastered);
  };

  // Mode B handlers
  const handleMCQSelect = (option) => {
    if (mcqSelected !== null) return;
    setMcqSelected(option);
    onMarkVocab(current.de, option === current.sk);
  };

  // Mode C handlers
  const handleGapCheck = () => {
    if (gapChecked || !gapInput.trim()) return;
    const isCorrect = normalizeGerman(gapInput) === normalizeGerman(current.de);
    setGapCorrect(isCorrect);
    setGapChecked(true);
    onMarkVocab(current.de, isCorrect);
  };

  const handleGapKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (!gapChecked) handleGapCheck();
      else advance(gapCorrect);
    }
  };

  const handleRestart = () => {
    resetDeck();
  };

  // --- Empty state ---
  if (deck.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-20">
        <Brain size={48} className="text-gray-600 mx-auto mb-4" />
        <p className="text-gray-400 text-lg">Žiadne slovíčka na precvičenie.</p>
        <p className="text-gray-600 text-sm mt-2">Choď si urobiť nejakú lekciu najprv!</p>
      </div>
    );
  }

  // --- Done screen ---
  if (done) {
    return (
      <div className="max-w-md mx-auto text-center space-y-6">
        <div className="text-5xl">🎉</div>
        <h2 className="text-2xl font-bold text-white">Séria dokončená!</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="card border-emerald-800 bg-emerald-950/30 text-center py-5">
            <p className="text-3xl font-black text-emerald-400">{sessionResults.known}</p>
            <p className="text-sm text-gray-400 mt-1">Vedel som</p>
          </div>
          <div className="card border-red-900 bg-red-950/20 text-center py-5">
            <p className="text-3xl font-black text-red-400">{sessionResults.unknown}</p>
            <p className="text-sm text-gray-400 mt-1">Nevedel som</p>
          </div>
        </div>
        <div className="card text-center">
          <p className="text-sm text-gray-400">Celkovo zvládnuté slovíčka</p>
          <p className="text-3xl font-bold text-white mt-2">{totalMastered} / {allVocabCount}</p>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden mt-3">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all"
              style={{ width: `${(totalMastered / allVocabCount) * 100}%` }}
            />
          </div>
        </div>
        <button onClick={handleRestart} className="w-full btn-primary flex items-center justify-center gap-2">
          <RotateCcw size={16} />
          Ďalšia séria
        </button>

        <div className="card mt-6 p-5 border-gray-800 bg-gray-900/40">
          <div className="flex items-center gap-2 mb-4">
            <LayoutGrid size={16} className="text-indigo-400" />
            <p className="text-sm font-bold text-gray-300">SRS Pamäťová Mapa</p>
          </div>
          <div className="flex flex-wrap gap-1.5 justify-center">
            {LESSONS.flatMap(l => l.vocab).map((v, i) => {
              const seen = progress.vocabSeen?.[v.de];
              let bg = 'bg-gray-800'; // unseen
              if (seen) {
                bg = seen.mastered ? 'bg-emerald-500' : 'bg-amber-500 hover:bg-amber-400';
              }
              return <div key={i} className={`w-3 h-3 sm:w-4 sm:h-4 rounded-sm ${bg} transition-colors`} title={v.de} />
            })}
          </div>
          <div className="flex gap-4 mt-5 text-[10px] sm:text-xs justify-center font-medium text-gray-500">
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-emerald-500 rounded-sm"></div> V pamäti</div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-amber-500 rounded-sm"></div> Slabé miesta</div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-gray-800 rounded-sm"></div> Nevidené</div>
          </div>
        </div>
      </div>
    );
  }

  const gapSentence = mode === 'C' ? buildGapSentence(current) : null;

  return (
    <div className="max-w-md mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain size={20} className="text-indigo-400" />
          <h2 className="text-lg font-bold text-white">Tréner slovíčok</h2>
        </div>
        <span className="text-sm text-gray-500">{index + 1} / {deck.length}</span>
      </div>

      {/* Mode selector */}
      <div className="flex gap-2">
        {MODES.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => handleModeChange(id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${mode === id ? 'bg-indigo-700 text-white' : 'bg-gray-800 text-gray-400 hover:text-gray-200'
              }`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-500 rounded-full transition-all duration-500"
          style={{ width: `${(index / deck.length) * 100}%` }}
        />
      </div>

      {/* Stats bar */}
      <div className="flex gap-3 text-xs">
        <span className="text-emerald-400 font-semibold">{sessionResults.known} ✓</span>
        <span className="text-red-400 font-semibold">{sessionResults.unknown} ✗</span>
        <span className="text-gray-500 ml-auto">{totalMastered} zvládnutých celkovo</span>
      </div>

      {/* ── MODE A: Flashcard ── */}
      {mode === 'A' && (
        <>
          <div
            onClick={!flipped ? handleFlip : undefined}
            className={`relative rounded-3xl border min-h-52 flex flex-col items-center justify-center p-8 transition-all duration-300 select-none
              ${!flipped ? 'cursor-pointer hover:border-indigo-600 border-gray-700 bg-gray-900' : 'border-indigo-700 bg-indigo-950/30'}`}
          >
            <span className="absolute top-4 left-4 text-xs text-gray-600">{current.lessonTitle}</span>
            {vocabSeen[current.de]?.mastered && (
              <span className="absolute top-4 right-4 flex items-center gap-1 text-xs text-emerald-500">
                <CheckCircle size={12} /> zvládnuté
              </span>
            )}
            {!flipped ? (
              <div className="text-center">
                <p className="text-4xl font-black text-white mb-3">{current.de}</p>
                <p className="text-gray-500 text-sm">Klikni pre preklad</p>
                <Volume2 size={16} className="text-indigo-400 mx-auto mt-3 animate-pulse" />
              </div>
            ) : (
              <div className="text-center w-full">
                <p className="text-2xl font-bold text-white mb-1">{current.de}</p>
                <button
                  onClick={() => speak(current.de)}
                  className="mb-4 flex items-center gap-2 mx-auto bg-indigo-800/60 hover:bg-indigo-700/60 rounded-xl px-3 py-1.5 transition-all"
                >
                  <Volume2 size={14} className="text-indigo-300" />
                  <span className="text-xs text-indigo-200">Počuť výslovnosť</span>
                </button>
                <p className="text-3xl font-black text-indigo-300 mb-2">{current.sk}</p>
                {current.example && (
                  <div
                    className="mt-3 bg-gray-800/60 rounded-xl px-4 py-2 text-sm text-gray-400 cursor-pointer hover:bg-gray-800 transition-all"
                    onClick={() => speak(current.example)}
                  >
                    <span className="text-indigo-300">„{current.example}"</span>
                  </div>
                )}
              </div>
            )}
          </div>
          {flipped ? (
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleResult(false)}
                className="btn-secondary border-red-900 hover:border-red-700 hover:bg-red-950/30 text-red-400 flex items-center justify-center gap-2 py-4"
              >
                <ChevronLeft size={18} />
                Nevedel som
              </button>
              <button
                onClick={() => handleResult(true)}
                className="btn-primary bg-emerald-700 hover:bg-emerald-600 border-emerald-600 flex items-center justify-center gap-2 py-4"
              >
                Vedel som
                <ChevronRight size={18} />
              </button>
            </div>
          ) : (
            <button onClick={handleFlip} className="w-full btn-secondary py-4 text-gray-300">
              Zobraziť preklad
            </button>
          )}
        </>
      )}

      {/* ── MODE B: MCQ ── */}
      {mode === 'B' && (
        <>
          <div className="relative rounded-3xl border border-gray-700 bg-gray-900 min-h-36 flex flex-col items-center justify-center p-8 select-none">
            <span className="absolute top-4 left-4 text-xs text-gray-600">{current.lessonTitle}</span>
            {vocabSeen[current.de]?.mastered && (
              <span className="absolute top-4 right-4 flex items-center gap-1 text-xs text-emerald-500">
                <CheckCircle size={12} /> zvládnuté
              </span>
            )}
            <button
              onClick={() => speak(current.de)}
              className="mb-3 flex items-center gap-2 mx-auto bg-indigo-800/60 hover:bg-indigo-700/60 rounded-xl px-3 py-1.5 transition-all"
            >
              <Volume2 size={14} className="text-indigo-300" />
              <span className="text-xs text-indigo-200">Počuť výslovnosť</span>
            </button>
            <p className="text-4xl font-black text-white">{current.de}</p>
            <p className="text-gray-500 text-sm mt-2">Vyber správny preklad</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {mcqOptions.map((option) => {
              const isSelected = mcqSelected === option;
              const isCorrect = option === current.sk;
              let cls = 'rounded-2xl border px-4 py-3 text-sm font-medium transition-all text-left ';
              if (mcqSelected === null) {
                cls += 'border-gray-700 bg-gray-800 text-gray-200 hover:border-indigo-600 hover:bg-indigo-950/30 cursor-pointer';
              } else if (isCorrect) {
                cls += 'border-emerald-600 bg-emerald-950/40 text-emerald-300';
              } else if (isSelected) {
                cls += 'border-red-700 bg-red-950/30 text-red-400';
              } else {
                cls += 'border-gray-800 bg-gray-900 text-gray-600 opacity-60';
              }
              return (
                <button
                  key={option}
                  className={cls}
                  onClick={() => handleMCQSelect(option)}
                  disabled={mcqSelected !== null}
                >
                  {option}
                </button>
              );
            })}
          </div>
          {mcqSelected !== null && (
            <div className="space-y-3">
              {mcqSelected !== current.sk && !explanation && (
                <button
                  onClick={async () => {
                    setLoadingWhy(true);
                    try {
                      const res = await getExplanation({
                        question: "Prelož do slovenčiny: " + current.de,
                        correctAnswer: current.sk,
                        userAnswer: mcqSelected
                      });
                      setExplanation(res);
                    } catch (e) {
                      setExplanation("Chyba API kľúča.");
                    } finally {
                      setLoadingWhy(false);
                    }
                  }}
                  disabled={loadingWhy}
                  className="w-full btn-secondary bg-amber-950/20 py-3 flex items-center justify-center gap-2 text-sm font-semibold border-amber-800 text-amber-500 hover:bg-amber-950/40 hover:border-amber-600 transition-all border border-dashed"
                >
                  <Brain size={16} className={loadingWhy ? "animate-pulse" : ""} />
                  {loadingWhy ? 'Generujem...' : 'Prečo to je nesprávne?'}
                </button>
              )}
              {explanation && (
                <div className="bg-amber-950/40 border border-amber-800/50 rounded-xl p-4 animate-fade-in flex items-start gap-3 text-left">
                  <Brain size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-amber-200 text-sm leading-relaxed">{explanation}</p>
                </div>
              )}
              <button
                onClick={() => advance(mcqSelected === current.sk)}
                className="w-full btn-primary flex items-center justify-center gap-2 py-3"
              >
                Ďalej
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </>
      )}

      {/* ── MODE C: Gap-fill ── */}
      {mode === 'C' && (
        <>
          <div className="relative rounded-3xl border border-gray-700 bg-gray-900 min-h-36 flex flex-col items-center justify-center p-8 select-none">
            <span className="absolute top-4 left-4 text-xs text-gray-600">{current.lessonTitle}</span>
            {vocabSeen[current.de]?.mastered && (
              <span className="absolute top-4 right-4 flex items-center gap-1 text-xs text-emerald-500">
                <CheckCircle size={12} /> zvládnuté
              </span>
            )}
            <p className="text-sm text-gray-400 mb-3">Doplň chýbajúce slovo:</p>
            {gapSentence ? (
              <p className="text-xl font-semibold text-white text-center leading-relaxed">
                {gapSentence.split('___').map((part, i, arr) => (
                  <React.Fragment key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <span
                        className={`inline-block min-w-16 border-b-2 mx-1 font-black ${gapChecked
                          ? gapCorrect
                            ? 'text-emerald-400 border-emerald-500'
                            : 'text-red-400 border-red-500'
                          : 'text-indigo-300 border-indigo-500'
                          }`}
                      >
                        {gapChecked ? current.de : gapInput || '\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0'}
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </p>
            ) : (
              <p className="text-lg font-semibold text-white text-center">
                Napíš: <span className="text-indigo-300">{current.de}</span>
              </p>
            )}
            {current.sk && (
              <p className="text-sm text-gray-500 mt-3">{current.sk}</p>
            )}
          </div>

          {!gapChecked ? (
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={gapInput}
                onChange={(e) => setGapInput(e.target.value)}
                onKeyDown={handleGapKeyDown}
                placeholder="Napíš nemecké slovo…"
                className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 text-sm"
              />
              <button
                onClick={handleGapCheck}
                disabled={!gapInput.trim()}
                className="btn-primary px-5 py-3 disabled:opacity-40"
              >
                Skontrolovať
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div
                className={`rounded-2xl border px-4 py-3 text-sm font-medium text-center ${gapCorrect
                  ? 'border-emerald-700 bg-emerald-950/30 text-emerald-300'
                  : 'border-red-800 bg-red-950/20 text-red-400'
                  }`}
              >
                {gapCorrect ? '✓ Správne!' : `✗ Správna odpoveď: ${current.de}`}
              </div>

              {!gapCorrect && !explanation && (
                <button
                  onClick={async () => {
                    setLoadingWhy(true);
                    try {
                      const res = await getExplanation({
                        question: "Prelož text/vetu do nemčiny: " + (gapSentence ? current.example : current.sk),
                        correctAnswer: current.de,
                        userAnswer: gapInput
                      });
                      setExplanation(res);
                    } catch (e) {
                      setExplanation("Chyba API kľúča.");
                    } finally {
                      setLoadingWhy(false);
                    }
                  }}
                  disabled={loadingWhy}
                  className="w-full btn-secondary bg-amber-950/20 py-3 flex items-center justify-center gap-2 text-sm font-semibold border-amber-800 text-amber-500 hover:bg-amber-950/40 hover:border-amber-600 transition-all border border-dashed"
                >
                  <Brain size={16} className={loadingWhy ? "animate-pulse" : ""} />
                  {loadingWhy ? 'Generujem...' : 'Prečo to je nesprávne?'}
                </button>
              )}
              {explanation && (
                <div className="bg-amber-950/40 border border-amber-800/50 rounded-xl p-4 animate-fade-in flex items-start gap-3 text-left">
                  <Brain size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-amber-200 text-sm leading-relaxed">{explanation}</p>
                </div>
              )}

              <button
                onClick={() => advance(gapCorrect)}
                className="w-full btn-primary flex items-center justify-center gap-2 py-3"
              >
                Ďalej
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
