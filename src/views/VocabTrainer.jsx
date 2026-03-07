import React, { useState, useEffect, useRef } from 'react';
import { LESSONS } from '../data/curriculum';
import { Volume2, RotateCcw, CheckCircle, Brain, ChevronRight, ChevronLeft, LayoutGrid, CheckSquare, Edit3, Plus, X, Layers as LayersIcon } from 'lucide-react';
import { useTTS } from '../hooks/useTTS';
import { getExplanation } from '../hooks/useAI';
import { normalizeGerman } from '../utils/text';
import { GenderWord, GenderText, GenderLegend, getGenderForWord, GENDER_COLORS } from '../utils/genderColors';
import { ChunksTrainer } from '../components/vocab/ChunksTrainer';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDeck(progress) {
  const today = new Date().toISOString().slice(0, 10);
  const allVocab = LESSONS.flatMap((l) =>
    l.vocab.map((v) => ({ ...v, lessonId: l.id, lessonTitle: l.title, source: 'lesson' }))
  );
  const customVocab = (progress.customVocab || []).map(v => ({ ...v, lessonTitle: 'Vlastné slovíčko', source: 'custom' }));
  const combined = [...allVocab, ...customVocab];
  const vocabSeen = progress.vocabSeen || {};

  // Filter out archived/ignored words where interval is arbitrarily high e.g. 10000
  const activeCombined = combined.filter(v => {
    const seen = vocabSeen[v.de];
    return !seen || seen.interval < 10000;
  });

  // Sort cards into buckets:
  // 1. Overdue (dueDate <= today) — most important, sorted by how overdue they are
  // 2. Unseen — never reviewed
  // 3. Due in future — not yet, show a few as preview
  const getDaysOverdue = (v) => {
    const due = vocabSeen[v.de]?.dueDate;
    if (!due) return null; // unseen
    return Math.ceil((new Date(today) - new Date(due)) / 86400000); // positive = overdue
  };

  const overdue = activeCombined
    .filter(v => { const d = getDaysOverdue(v); return d !== null && d >= 0; })
    .sort((a, b) => (getDaysOverdue(b) || 0) - (getDaysOverdue(a) || 0));

  const unseen = activeCombined.filter(v => !vocabSeen[v.de]);

  const upcoming = activeCombined
    .filter(v => { const d = getDaysOverdue(v); return d !== null && d < 0; })
    .sort((a, b) => (getDaysOverdue(a) || 0) - (getDaysOverdue(b) || 0))
    .slice(0, 5); // only a few preview cards

  return [...overdue, ...unseen, ...upcoming];
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

export default function VocabTrainer({ progress, onMarkVocab, onMarkVocabWrong, onReviewVocab, onAddCustomVocab }) {
  const { speak } = useTTS();
  const [mainTab, setMainTab] = useState('words'); // 'words' | 'chunks'
  const [mode, setMode] = useState('A');
  const [deck, setDeck] = useState([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [sessionResults, setSessionResults] = useState({ known: 0, unknown: 0 });
  const [done, setDone] = useState(false);
  const [againQueue, setAgainQueue] = useState([]); // Feature 2: cards to repeat at end of session
  const [showStats, setShowStats] = useState(false); // Feature 5: stats panel

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

  // Custom vocab state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newWordDe, setNewWordDe] = useState('');
  const [newWordSk, setNewWordSk] = useState('');

  const resetDeck = () => {
    const d = buildDeck(progress);
    setDeck(d);
    setIndex(0);
    setFlipped(false);
    setDone(false);
    setSessionResults({ known: 0, unknown: 0 });
    setAgainQueue([]);
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

  const today = new Date().toISOString().slice(0, 10);
  const current = deck[index];
  const vocabSeen = progress.vocabSeen || {};
  const totalMastered = Object.values(vocabSeen).filter((v) => v.mastered).length;
  const dueTodayCount = Object.entries(vocabSeen).filter(([, v]) => v.dueDate && v.dueDate <= today).length;
  const customVocabCount = (progress.customVocab || []).length;
  const allVocabCount = LESSONS.reduce((s, l) => s + l.vocab.length, 0) + customVocabCount;

  // Feature 4: Due forecast for next 7 days
  const dueForecast = (() => {
    const forecast = {};
    for (let i = 0; i <= 6; i++) {
      const d = new Date(Date.now() + i * 86400000).toISOString().slice(0, 10);
      forecast[d] = 0;
    }
    Object.values(vocabSeen).forEach(v => {
      if (v.dueDate && forecast.hasOwnProperty(v.dueDate)) {
        forecast[v.dueDate]++;
      }
    });
    return forecast;
  })();

  // Feature 3: Leech detection (wrongCount >= 8)
  const leeches = Object.entries(vocabSeen).filter(([, v]) => (v.wrongCount || 0) >= 8).map(([word]) => word);

  // Feature 1 & 2: unified review + "Again" re-queue
  const review = (quality) => {
    if (current) (onReviewVocab || onMarkVocab)(current.de, quality);
  };

  const advance = (isCorrect) => {
    setSessionResults(r => ({
      known: r.known + (isCorrect ? 1 : 0),
      unknown: r.unknown + (isCorrect ? 0 : 1),
    }));

    const nextIndex = index + 1;
    const isLastCard = nextIndex >= deck.length;

    if (!isCorrect && current) {
      // Feature 2: append to end of deck for re-practice
      setDeck(d => [...d, current]);
    }

    if (!isLastCard || !isCorrect) {
      setIndex(nextIndex);
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

  const handleResult = (quality) => {
    review(quality);
    advance(quality >= 3);
  };

  const handleMCQSelect = (option) => {
    if (mcqSelected !== null) return;
    setMcqSelected(option);
    const isCorrect = option === current.sk;
    review(isCorrect ? 4 : 1);
    setTimeout(() => advance(isCorrect), 900);
  };

  const handleGapCheck = () => {
    if (gapChecked || !gapInput.trim()) return;
    const isCorrect = normalizeGerman(gapInput) === normalizeGerman(current.de);
    setGapCorrect(isCorrect);
    setGapChecked(true);
    review(isCorrect ? 4 : 1);
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

  if (deck.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-20">
        <Brain size={48} className="text-gray-600 mx-auto mb-4" />
        <p className="text-gray-400 text-lg">Žiadne slovíčka na precvičenie.</p>
        <p className="text-gray-600 text-sm mt-2 mb-6">Choď si urobiť nejakú lekciu najprv!</p>

        {onAddCustomVocab && (
          <button
            onClick={() => setShowAddForm(true)}
            className="btn-secondary rounded-xl font-bold py-3 text-sm flex gap-2 items-center justify-center mx-auto"
          >
            <Plus size={16} /> Alebo si pridaj vlastné slovo
          </button>
        )}

        {showAddForm && (
          <div className="bg-gray-900 border border-gray-700/50 rounded-2xl p-4 mt-4 animate-fade-in space-y-3 max-w-sm mx-auto text-left">
            <p className="text-sm font-semibold text-gray-300 flex justify-between">
              Pridať vlastné slovíčko
              <button onClick={() => setShowAddForm(false)} className="text-gray-500 hover:text-white"><X size={16} /></button>
            </p>
            <div className="grid grid-cols-1 gap-2">
              <input
                value={newWordDe} onChange={e => setNewWordDe(e.target.value)}
                placeholder="Nemecky (napr. das Auto)"
                className="bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
              <input
                value={newWordSk} onChange={e => setNewWordSk(e.target.value)}
                placeholder="Slovensky (napr. auto)"
                className="bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <button
              onClick={() => {
                if (newWordDe.trim() && newWordSk.trim() && onAddCustomVocab) {
                  onAddCustomVocab(newWordDe.trim(), newWordSk.trim());
                  setNewWordDe('');
                  setNewWordSk('');
                  setShowAddForm(false);
                  setTimeout(() => resetDeck(), 100);
                }
              }}
              disabled={!newWordDe.trim() || !newWordSk.trim()}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold py-2 rounded-xl text-sm transition-colors"
            >
              Uložiť slovíčko
            </button>
          </div>
        )}
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
    <div className="max-w-md mx-auto space-y-5 animate-fade-in">
      {/* Header & Main Tabs */}
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain size={20} className="text-indigo-400" />
            <h2 className="text-lg font-bold text-white">Slovíčka & Frázy</h2>
          </div>
          {mainTab === 'words' && (
            <button
              onClick={() => setShowStats(s => !s)}
              className={`text-sm flex items-center gap-1 px-2.5 py-1 rounded-full border transition-all ${showStats ? 'bg-indigo-700 border-indigo-500 text-white' : 'bg-gray-800 border-gray-700 text-gray-400 hover:text-white'
                }`}
              title="Štatistiky & forecast"
            >
              📊
            </button>
          )}
        </div>

        {/* Top-Level Tabs Navigation */}
        <div className="bg-gray-900 border border-gray-800 p-1 rounded-2xl flex gap-1 w-full relative">
          <button
            onClick={() => setMainTab('words')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all relative z-10 ${mainTab === 'words'
              ? 'text-white'
              : 'text-gray-500 hover:text-gray-300'
              }`}
          >
            <LayoutGrid size={16} className={mainTab === 'words' ? 'text-indigo-400' : ''} />
            Samostatné slová
          </button>
          <button
            onClick={() => setMainTab('chunks')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all relative z-10 ${mainTab === 'chunks'
              ? 'text-white'
              : 'text-gray-500 hover:text-gray-300'
              }`}
          >
            <LayersIcon size={16} className={mainTab === 'chunks' ? 'text-indigo-400' : ''} />
            Vety a zhluky
          </button>

          {/* Animated active pill background */}
          <div
            className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gray-800 rounded-xl transition-all duration-300 shadow-md border border-gray-700 pointer-events-none"
            style={{
              left: mainTab === 'words' ? '4px' : '50%'
            }}
          />
        </div>
      </div>

      {mainTab === 'chunks' ? (
        <ChunksTrainer progress={progress} onMarkVocab={onMarkVocab} onReviewVocab={onReviewVocab} />
      ) : (
        <>
          {/* Feature 5: Stats panel for Words only */}
          {showStats && (
            <div className="bg-gray-900/70 border border-gray-700 rounded-2xl p-4 space-y-3 animate-fade-in">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">📅 SRS Forecast — nasledujúcich 7 dní</p>
              <div className="grid grid-cols-7 gap-1">
                {Object.entries(dueForecast).map(([date, count], i) => (
                  <div key={date} className="text-center">
                    <div
                      className={`rounded-lg py-1.5 text-sm font-bold transition-all ${i === 0 ? 'bg-amber-500/30 border border-amber-500/50 text-amber-300' :
                        count > 0 ? 'bg-indigo-900/60 text-indigo-300' : 'bg-gray-800 text-gray-600'
                        }`}
                    >
                      {count}
                    </div>
                    <div className="text-[9px] text-gray-600 mt-0.5">
                      {i === 0 ? 'Dnes' : i === 1 ? 'Zajtra' : `+${i}d`}
                    </div>
                  </div>
                ))}
              </div>
              {leeches.length > 0 && (
                <div className="bg-red-950/40 border border-red-800/50 rounded-xl p-3">
                  <p className="text-xs font-bold text-red-400 mb-1.5">🩸 Problémové slovíčka ({leeches.length})</p>
                  <div className="flex flex-wrap gap-1.5">
                    {leeches.map(word => (
                      <span key={word} className="bg-red-900/40 text-red-300 text-xs px-2 py-0.5 rounded-full border border-red-800/40">{word}</span>
                    ))}
                  </div>
                  <p className="text-[10px] text-gray-500 mt-2">Tieto slová si pamätáš ťažko. Skús mnemotechniku alebo obrázkovú asociáciu.</p>
                </div>
              )}
              <div className="flex gap-3 text-xs">
                <div className="flex-1 bg-gray-800/60 rounded-xl p-2.5 text-center">
                  <p className="text-lg font-bold text-emerald-400">{totalMastered}</p>
                  <p className="text-gray-500">V pamäti</p>
                </div>
                <div className="flex-1 bg-gray-800/60 rounded-xl p-2.5 text-center">
                  <p className="text-lg font-bold text-amber-400">{dueTodayCount}</p>
                  <p className="text-gray-500">Dnes</p>
                </div>
                <div className="flex-1 bg-gray-800/60 rounded-xl p-2.5 text-center">
                  <p className="text-lg font-bold text-gray-300">{allVocabCount - totalMastered}</p>
                  <p className="text-gray-500">Ostatok</p>
                </div>
              </div>
            </div>
          )}

          {/* Mode selector & Custom Word */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {MODES.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  onClick={() => handleModeChange(id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${mode === id ? 'bg-indigo-700 text-white' : 'bg-gray-800 text-gray-400 hover:text-gray-200'
                    }`}
                >
                  <Icon size={14} />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>
            {onAddCustomVocab && (
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 text-sm font-medium transition-colors bg-indigo-900/30 px-3 py-1.5 rounded-full border border-indigo-500/30"
              >
                {showAddForm ? <X size={14} /> : <Plus size={14} />}
                Pridať
              </button>
            )}
          </div>

          {showAddForm && (
            <div className="bg-gray-900 border border-indigo-500/50 rounded-2xl p-4 animate-fade-in space-y-3">
              <p className="text-sm font-semibold text-gray-300">Pridať vlastné slovíčko</p>
              <div className="grid grid-cols-2 gap-2">
                <input
                  value={newWordDe} onChange={e => setNewWordDe(e.target.value)}
                  placeholder="Nemecky (napr. Katze)"
                  className="bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
                />
                <input
                  value={newWordSk} onChange={e => setNewWordSk(e.target.value)}
                  placeholder="Slovensky (napr. mačka)"
                  className="bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <button
                onClick={() => {
                  if (newWordDe.trim() && newWordSk.trim() && onAddCustomVocab) {
                    onAddCustomVocab(newWordDe.trim(), newWordSk.trim());
                    setNewWordDe('');
                    setNewWordSk('');
                    setShowAddForm(false);
                    setTimeout(() => resetDeck(), 100);
                  }
                }}
                disabled={!newWordDe.trim() || !newWordSk.trim()}
                className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold py-2 rounded-xl text-sm transition-colors"
              >
                Uložiť slovíčko
              </button>
            </div>
          )}

          {/* Progress bar */}
          <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${(index / deck.length) * 100}%` }}
            />
          </div>

          {/* Stats bar */}
          <div className="flex gap-3 text-xs items-center">
            <span className="text-emerald-400 font-bold">{sessionResults.known} ✓</span>
            <span className="text-red-400 font-bold">{sessionResults.unknown} ✗</span>
            <span className="text-indigo-300 font-semibold">
              {sessionResults.known + sessionResults.unknown} kariet tejto session
            </span>
            {dueTodayCount > 0 && (
              <span className="bg-amber-500/20 text-amber-300 border border-amber-600/40 rounded-full px-2 py-0.5 font-semibold">
                🔔 {dueTodayCount} dnes
              </span>
            )}
            <span className="text-gray-500 ml-auto">{index + 1} / {deck.length} kariet</span>
          </div>

          {/* ── MODE A: Flashcard ── */}
          {mode === 'A' && (
            <>
              <div
                onClick={!flipped ? handleFlip : undefined}
                className={`relative rounded-3xl border min-h-52 flex flex-col items-center justify-center p-8 transition-all duration-300 select-none
              ${!flipped ? 'cursor-pointer hover:border-indigo-600 border-gray-700 bg-gray-900' : 'border-indigo-700 bg-indigo-950/30'}`}
              >
                {/* [Agent 4] Source tag */}
                <span className="absolute top-4 left-4 text-xs text-gray-600">
                  {current.source === 'story' ? `📖 ${current.storyTitle || 'Príbeh'}` : `📚 ${current.lessonTitle}`}
                </span>
                {vocabSeen[current.de]?.mastered && (
                  <span className="absolute top-4 right-4 flex items-center gap-1 text-xs text-emerald-500">
                    <CheckCircle size={12} /> zvládnuté
                  </span>
                )}
                {!flipped ? (
                  <div className="text-center">
                    {current.image && (
                      <img
                        src={current.image}
                        alt={current.de}
                        className="w-28 h-28 object-cover rounded-2xl mx-auto mb-4 ring-2 ring-indigo-700/40 shadow-lg"
                        onError={e => { e.target.style.display = 'none'; }}
                      />
                    )}
                    <p className="text-4xl font-black mb-2">
                      {(() => { const g = getGenderForWord(current.de); return g ? <span className={GENDER_COLORS[g].text}>{current.de}</span> : <span className="text-white">{current.de}</span>; })()}
                    </p>
                    {(vocabSeen[current.de]?.wrongCount || 0) >= 8 && (
                      <span className="inline-flex items-center gap-1 text-[10px] bg-red-900/50 text-red-400 border border-red-800/50 rounded-full px-2 py-0.5 mb-2">
                        🩸 Problémové slovícko
                      </span>
                    )}
                    <p className="text-gray-500 text-sm">Klikni pre preklad</p>
                    <Volume2 size={16} className="text-indigo-400 mx-auto mt-3 animate-pulse" />
                  </div>
                ) : (
                  <div className="text-center w-full">
                    <p className="text-2xl font-bold mb-1">
                      {(() => { const g = getGenderForWord(current.de); return g ? <span className={GENDER_COLORS[g].text}>{current.de}</span> : <span className="text-white">{current.de}</span>; })()}
                    </p>
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
                        <span className="text-indigo-300">„<GenderText text={current.example} />“</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
              {flipped ? (
                <>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <button
                      onClick={() => handleResult(1)}
                      className="btn-secondary border-red-900 hover:border-red-700 hover:bg-red-950/30 text-red-400 flex flex-col items-center justify-center gap-1 py-3 text-sm"
                    >
                      <ChevronLeft size={16} />
                      <span>Nevedel</span>
                      <span className="text-[10px] text-gray-600">+1 deň</span>
                    </button>
                    <button
                      onClick={() => handleResult(3)}
                      className="btn-secondary border-amber-800 hover:border-amber-600 hover:bg-amber-950/20 text-amber-300 flex flex-col items-center justify-center gap-1 py-3 text-sm"
                    >
                      <span>Vedel</span>
                      <span className="text-[10px] text-gray-600">+{vocabSeen[current?.de]?.interval || 1}d</span>
                    </button>
                    <button
                      onClick={() => handleResult(5)}
                      className="btn-primary bg-emerald-700 hover:bg-emerald-600 border-emerald-600 flex flex-col items-center justify-center gap-1 py-3 text-sm"
                    >
                      <span>Ľahké!</span>
                      <span className="text-[10px] text-emerald-300">dlhší interval</span>
                    </button>
                  </div>

                  {/* Quick Archive: banish word from SRS forever */}
                  <button
                    onClick={() => {
                      const fn = onReviewVocab || onMarkVocab;
                      if (fn) fn(current.de, 5);
                      if (progress.vocabSeen) {
                        if (progress.vocabSeen[current.de]) {
                          progress.vocabSeen[current.de].interval = 10000;
                        } else {
                          progress.vocabSeen[current.de] = { interval: 10000, mastered: true };
                        }
                      }
                      advance(true);
                    }}
                    className="w-full btn-secondary border-gray-700 hover:border-indigo-600 hover:bg-indigo-950/20 text-gray-400 hover:text-indigo-300 flex items-center justify-center gap-2 py-2.5 text-xs transition-all"
                  >
                    <CheckCircle size={14} className="opacity-70" />
                    <span>Už to ovládam. Viac neukazovať.</span>
                  </button>
                </>
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
                <p className="text-4xl font-black">
                  {(() => { const g = getGenderForWord(current.de); return g ? <span className={GENDER_COLORS[g].text}>{current.de}</span> : <span className="text-white">{current.de}</span>; })()}
                </p>
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
                        <GenderText text={part} />
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
        </>
      )}
    </div>
  );
}
