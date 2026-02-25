import React, { useState, useEffect, useCallback } from 'react';
import { PHRASE_DAYS } from '../data/phrases';
import { useTTS } from '../hooks/useTTS';
import {
  Volume2, ChevronRight, ChevronLeft, CheckCircle, Lock,
  Headphones, PenLine, Calendar, RotateCcw, Play, Eye
} from 'lucide-react';

// ── LCS diff ─────────────────────────────────────────────────────────────────
function lcs(a, b) {
  const wa = a.split(' '), wb = b.split(' ');
  const m = wa.length, n = wb.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = wa[i-1].toLowerCase() === wb[j-1].toLowerCase()
        ? dp[i-1][j-1] + 1
        : Math.max(dp[i-1][j], dp[i][j-1]);
  // backtrack
  const result = [];
  let i = m, j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && wa[i-1].toLowerCase() === wb[j-1].toLowerCase()) {
      result.unshift({ word: wb[j-1], type: 'match' });
      i--; j--;
    } else if (j > 0 && (i === 0 || dp[i][j-1] >= dp[i-1][j])) {
      result.unshift({ word: wb[j-1], type: 'add' });
      j--;
    } else {
      result.unshift({ word: wa[i-1], type: 'remove' });
      i--;
    }
  }
  return result;
}

function DiffView({ userText, correctText }) {
  const tokens = lcs(userText, correctText);
  return (
    <p className="text-base leading-relaxed flex flex-wrap gap-x-1 gap-y-1">
      {tokens.map((t, i) => (
        <span
          key={i}
          className={
            t.type === 'match' ? 'text-white' :
            t.type === 'add'   ? 'bg-emerald-800/60 text-emerald-300 px-1 rounded' :
                                 'bg-red-900/60 text-red-300 px-1 rounded line-through'
          }
        >
          {t.word}
        </span>
      ))}
    </p>
  );
}

// ── Passive Phase 1 — just listen ────────────────────────────────────────────
function Phase1({ day, onDayComplete, progressDays }) {
  const { speak } = useTTS();
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [autoPlayed, setAutoPlayed] = useState(false);

  const phrases = day.phrases;
  const current = phrases[phraseIdx];

  useEffect(() => {
    setPhraseIdx(0);
    setAutoPlayed(false);
  }, [day.day]);

  useEffect(() => {
    if (!autoPlayed) {
      const t = setTimeout(() => { speak(current.de); setAutoPlayed(true); }, 400);
      return () => clearTimeout(t);
    }
  }, [phraseIdx, autoPlayed]);

  const next = () => {
    if (phraseIdx < phrases.length - 1) {
      setPhraseIdx(phraseIdx + 1);
      setAutoPlayed(false);
    } else {
      onDayComplete(day.day);
    }
  };
  const prev = () => { if (phraseIdx > 0) { setPhraseIdx(phraseIdx - 1); setAutoPlayed(false); } };

  return (
    <div className="space-y-5">
      {/* Progress dots */}
      <div className="flex gap-1.5 flex-wrap">
        {phrases.map((_, i) => (
          <div key={i} className={`h-1.5 rounded-full transition-all ${i < phraseIdx ? 'bg-indigo-500 w-4' : i === phraseIdx ? 'bg-indigo-400 w-6' : 'bg-gray-700 w-3'}`} />
        ))}
      </div>

      {/* Card */}
      <div className="card border-indigo-800/50 bg-indigo-950/20 min-h-40 flex flex-col items-center justify-center text-center gap-5 py-10">
        <button
          onClick={() => speak(current.de)}
          className="w-16 h-16 bg-indigo-700 hover:bg-indigo-600 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        >
          <Volume2 size={28} className="text-white" />
        </button>
        <div>
          <p className="text-3xl font-bold text-white mb-3">{current.de}</p>
          <p className="text-lg text-indigo-300">{current.sk}</p>
        </div>
        <p className="text-xs text-gray-600">Počúvaj a čítaj. Nevyžaduje sa žiadny výstup.</p>
      </div>

      {/* Nav */}
      <div className="flex gap-3">
        <button onClick={prev} disabled={phraseIdx === 0} className="btn-secondary px-4 py-3 disabled:opacity-30">
          <ChevronLeft size={18} />
        </button>
        <button onClick={next} className="flex-1 btn-primary justify-center py-3">
          {phraseIdx < phrases.length - 1 ? (
            <><span>Ďalšia fráza</span><ChevronRight size={18} /></>
          ) : (
            <><CheckCircle size={18} /><span>Deň dokončený!</span></>
          )}
        </button>
      </div>
    </div>
  );
}

// ── Active Phase 2 — translate SK → DE ───────────────────────────────────────
function Phase2({ day }) {
  const { speak } = useTTS();
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [scores, setScores] = useState([]);
  const [done, setDone] = useState(false);

  useEffect(() => { setPhraseIdx(0); setInput(''); setSubmitted(false); setScores([]); setDone(false); }, [day.day]);

  const current = day.phrases[phraseIdx];

  const handleSubmit = () => {
    if (!input.trim()) return;
    setSubmitted(true);
    speak(current.de);
    const correct = current.de.toLowerCase().replace(/[.,!?]/g, '').trim();
    const user = input.toLowerCase().replace(/[.,!?]/g, '').trim();
    const sim = correct === user ? 100 : Math.max(0, Math.round((1 - (levenshtein(user, correct) / Math.max(user.length, correct.length))) * 100));
    setScores((s) => [...s, sim]);
  };

  const handleNext = () => {
    if (phraseIdx < day.phrases.length - 1) {
      setPhraseIdx(phraseIdx + 1);
      setInput('');
      setSubmitted(false);
    } else {
      setDone(true);
    }
  };

  const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

  if (done) {
    return (
      <div className="text-center space-y-5 py-6">
        <div className="text-5xl">🎯</div>
        <p className="text-2xl font-bold text-white">Deň {day.day} — Aktívna fáza</p>
        <div className={`text-5xl font-black ${avgScore >= 80 ? 'text-emerald-400' : avgScore >= 50 ? 'text-amber-400' : 'text-red-400'}`}>{avgScore}%</div>
        <p className="text-gray-400 text-sm">Priemerná zhoda s nemeckým originálom</p>
        <button onClick={() => { setPhraseIdx(0); setInput(''); setSubmitted(false); setScores([]); setDone(false); }} className="btn-secondary mx-auto">
          <RotateCcw size={16} /> Zopakovať deň
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex gap-1.5 flex-wrap">
        {day.phrases.map((_, i) => (
          <div key={i} className={`h-1.5 rounded-full transition-all ${i < phraseIdx ? 'bg-emerald-500 w-4' : i === phraseIdx ? 'bg-emerald-400 w-6' : 'bg-gray-700 w-3'}`} />
        ))}
      </div>

      <div className="card border-emerald-800/40 bg-emerald-950/20 text-center py-8">
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Prelož do nemčiny</p>
        <p className="text-2xl font-bold text-emerald-200">{current.sk}</p>
      </div>

      {/* Input */}
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !submitted && handleSubmit()}
          disabled={submitted}
          placeholder="Napíš po nemecky..."
          className="w-full bg-gray-900 border border-gray-700 focus:border-emerald-600 rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none text-lg transition-all"
          autoFocus
        />
      </div>

      {/* Feedback */}
      {submitted && (
        <div className="card border-gray-700/50 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500 uppercase tracking-wider">Tvoja odpoveď</p>
            <button onClick={() => speak(current.de)} className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300">
              <Volume2 size={12} /> Počuť správne
            </button>
          </div>
          <DiffView userText={input} correctText={current.de} />
          <div className="pt-2 border-t border-gray-800">
            <p className="text-xs text-gray-500 mb-1">Správna odpoveď</p>
            <p className="text-white font-semibold">{current.de}</p>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        {!submitted ? (
          <button onClick={handleSubmit} disabled={!input.trim()} className="flex-1 btn-primary justify-center py-3 disabled:opacity-40">
            Skontrolovať
          </button>
        ) : (
          <button onClick={handleNext} className="flex-1 btn-primary justify-center py-3">
            {phraseIdx < day.phrases.length - 1 ? <><span>Ďalšia</span><ChevronRight size={18} /></> : <><CheckCircle size={18} /><span>Hotovo</span></>}
          </button>
        )}
      </div>
    </div>
  );
}

// simple character-level Levenshtein
function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) => Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)));
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1] : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
  return dp[m][n];
}

// ── Main view ─────────────────────────────────────────────────────────────────
const STORAGE_KEY = 'german_passive_progress';

function loadPassive() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { completedDays: [] }; } catch { return { completedDays: [] }; }
}
function savePassive(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}

export default function PassivePhase() {
  const { speak } = useTTS();
  const [passiveData, setPassiveData] = useState(loadPassive);
  const [selectedDay, setSelectedDay] = useState(null);
  const [activePhase, setActivePhase] = useState(1); // 1 or 2

  const completedDays = passiveData.completedDays || [];
  const currentDay = Math.min(completedDays.length + 1, 50);
  const phase2Unlocked = completedDays.length >= 50;

  const handleDayComplete = (dayNum) => {
    if (!completedDays.includes(dayNum)) {
      const updated = { ...passiveData, completedDays: [...completedDays, dayNum] };
      setPassiveData(updated);
      savePassive(updated);
    }
    setSelectedDay(null);
  };

  if (selectedDay !== null) {
    const day = PHRASE_DAYS[selectedDay - 1];
    const isCompleted = completedDays.includes(selectedDay);
    return (
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setSelectedDay(null)} className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300">
            <ChevronLeft size={18} />
          </button>
          <div>
            <h3 className="font-bold text-white">Deň {selectedDay} — {day.topic}</h3>
            <p className="text-xs text-gray-500">{day.phrases.length} fráz · {activePhase === 1 ? 'Pasívne počúvanie' : 'Aktívny preklad'}</p>
          </div>
        </div>

        {/* Phase tabs */}
        <div className="flex gap-2 mb-5">
          <button
            onClick={() => setActivePhase(1)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2
              ${activePhase === 1 ? 'bg-indigo-800 text-white border border-indigo-600' : 'bg-gray-800 text-gray-400 border border-gray-700'}`}
          >
            <Headphones size={14} /> Fáza 1 — Počúvaj
          </button>
          <button
            onClick={() => setActivePhase(2)}
            disabled={!phase2Unlocked && !isCompleted}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2
              ${activePhase === 2 ? 'bg-emerald-800 text-white border border-emerald-600' : 'bg-gray-800 text-gray-400 border border-gray-700'}
              disabled:opacity-30 disabled:cursor-not-allowed`}
            title={!phase2Unlocked ? 'Odomkne sa po 50 dňoch' : ''}
          >
            <PenLine size={14} /> Fáza 2 — Prekladaj
            {!phase2Unlocked && <Lock size={12} />}
          </button>
        </div>

        {activePhase === 1
          ? <Phase1 day={day} onDayComplete={handleDayComplete} progressDays={completedDays} />
          : <Phase2 day={day} />
        }
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Headphones size={22} className="text-indigo-400" />
        <div>
          <h2 className="text-2xl font-bold text-white">Pasívna fáza</h2>
          <p className="text-xs text-gray-500 mt-0.5">50 dní počúvaj · potom prekladaj</p>
        </div>
      </div>

      {/* Progress summary */}
      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-300 font-medium">Celkový postup</span>
          <span className="text-sm font-bold text-indigo-400">{completedDays.length} / 50 dní</span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-indigo-600 to-violet-500 rounded-full transition-all duration-700"
            style={{ width: `${(completedDays.length / 50) * 100}%` }} />
        </div>
        <div className="flex justify-between text-xs text-gray-600 mt-2">
          <span>Deň 1</span>
          <span className={phase2Unlocked ? 'text-emerald-400 font-semibold' : ''}>
            {phase2Unlocked ? '🎉 Fáza 2 odomknutá!' : `Fáza 2 sa odomkne na deň 50`}
          </span>
          <span>Deň 50</span>
        </div>
      </div>

      {/* Explanation banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="card border-indigo-800/50 bg-indigo-950/20">
          <div className="flex items-center gap-2 mb-2">
            <Headphones size={16} className="text-indigo-400" />
            <span className="font-semibold text-white text-sm">Dni 1–50: Len počúvaj</span>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Otvor deň, počúvaj každú frázu. Čítaj DE + SK preklad. <strong className="text-white">Nič nepíš, nič nepamätaj násilím.</strong> Mozog vstrebáva zvuky, intonáciu, rytmus.
          </p>
        </div>
        <div className={`card border-emerald-800/50 ${phase2Unlocked ? 'bg-emerald-950/20' : 'opacity-50'}`}>
          <div className="flex items-center gap-2 mb-2">
            <PenLine size={16} className="text-emerald-400" />
            <span className="font-semibold text-white text-sm">Po 50 dňoch: Prekladaj</span>
            {!phase2Unlocked && <Lock size={12} className="text-gray-500" />}
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Vidíš slovenčinu → píšeš nemčinu. Appka porovná tvoju odpoveď s originálom a <strong className="text-white">zvýrazní rozdiely slovom po slove</strong> (LCS diff).
          </p>
        </div>
      </div>

      {/* Day grid */}
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-3">50 dní fráz</p>
        <div className="grid grid-cols-5 sm:grid-cols-7 gap-2">
          {PHRASE_DAYS.map((day) => {
            const done = completedDays.includes(day.day);
            const isNext = day.day === currentDay;
            const locked = !done && !isNext && day.day > currentDay;
            return (
              <button
                key={day.day}
                onClick={() => setSelectedDay(day.day)}
                title={`Deň ${day.day}: ${day.topic}`}
                className={`aspect-square rounded-xl flex flex-col items-center justify-center text-xs font-bold transition-all
                  ${done ? 'bg-indigo-900/70 border border-indigo-700 text-indigo-200 hover:bg-indigo-800/70' :
                    isNext ? 'bg-indigo-700 border border-indigo-500 text-white ring-2 ring-indigo-400 hover:bg-indigo-600' :
                    locked ? 'bg-gray-800/40 border border-gray-800 text-gray-700 cursor-default' :
                    'bg-gray-800/60 border border-gray-700 text-gray-400 hover:bg-gray-700/60'}`}
              >
                {done ? <CheckCircle size={14} /> : locked ? <Lock size={11} /> : day.day}
              </button>
            );
          })}
        </div>
      </div>

      {/* Phase 2 section */}
      {phase2Unlocked && (
        <div className="card border-emerald-700/50 bg-emerald-950/20">
          <div className="flex items-center gap-2 mb-3">
            <PenLine size={18} className="text-emerald-400" />
            <span className="font-bold text-emerald-300">Fáza 2 — Aktívny preklad (odomknutá!)</span>
          </div>
          <p className="text-sm text-gray-400 mb-4">Všetky dni sú teraz dostupné v prekladovom móde. Klikni na ľubovoľný deň a prepni na kartu "Fáza 2".</p>
          <button onClick={() => { setSelectedDay(1); setActivePhase(2); }} className="btn-primary text-sm">
            <Play size={14} /> Začať Fázu 2 od Dňa 1
          </button>
        </div>
      )}

      {/* Next day CTA */}
      {!phase2Unlocked && currentDay <= 50 && (
        <button
          onClick={() => setSelectedDay(currentDay)}
          className="w-full card border-indigo-700/60 bg-indigo-950/30 hover:bg-indigo-950/50 cursor-pointer transition-all text-left"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-indigo-400 font-semibold uppercase tracking-wider mb-1">Dnešný deň</p>
              <p className="text-lg font-bold text-white">Deň {currentDay} — {PHRASE_DAYS[currentDay - 1]?.topic}</p>
              <p className="text-gray-500 text-sm mt-0.5">{PHRASE_DAYS[currentDay - 1]?.phrases.length} fráz · ~5 minút</p>
            </div>
            <div className="w-12 h-12 bg-indigo-700 rounded-xl flex items-center justify-center">
              <Play size={22} className="text-white" />
            </div>
          </div>
        </button>
      )}
    </div>
  );
}
