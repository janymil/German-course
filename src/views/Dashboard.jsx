import React, { useState } from 'react';
import { Flame, Star, BookOpen, Trophy, Zap, ChevronRight, Lock, CheckCircle, TrendingUp, Calendar, HelpCircle, MessageSquare, Sparkles, Key, Unlock, FlaskConical } from 'lucide-react';
import { LESSONS, WEEKLY_PLAN, A2_PREVIEW } from '../data/curriculum';

function XPBar({ xp }) {
  const level = Math.floor(xp / 100) + 1;
  const pct = (xp % 100);
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-gray-400">
        <span>Level {level}</span>
        <span>{xp % 100} / 100 XP</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-indigo-600 to-violet-500 rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

const SKILL_COLORS = {
  vocabulary: 'bg-blue-900/50 text-blue-300',
  grammar: 'bg-purple-900/50 text-purple-300',
  listening: 'bg-emerald-900/50 text-emerald-300',
  writing: 'bg-amber-900/50 text-amber-300',
  speaking: 'bg-rose-900/50 text-rose-300',
  pronunciation: 'bg-cyan-900/50 text-cyan-300',
  reading: 'bg-indigo-900/50 text-indigo-300',
};

function LessonTooltipPanel({ lesson, rect }) {
  const mcq = lesson.exercises?.find((e) => e.type === 'mcq');
  const fill = lesson.exercises?.find((e) => e.type === 'fill');
  const listen = lesson.exercises?.find((e) => e.type === 'listen');
  const match = lesson.exercises?.find((e) => e.type === 'match');
  const dialogue = lesson.exercises?.find((e) => e.type === 'dialogue');

  const genders = { M: 0, F: 0, N: 0, other: 0 };
  lesson.vocab.forEach((v) => {
    if (v.gender === 'M') genders.M++;
    else if (v.gender === 'F') genders.F++;
    else if (v.gender === 'N') genders.N++;
    else genders.other++;
  });

  const tooltipWidth = 310;
  const left =
    rect.right + 12 + tooltipWidth < window.innerWidth
      ? rect.right + 12
      : rect.left - 12 - tooltipWidth;
  const top = Math.min(Math.max(8, rect.top), window.innerHeight - 440);

  const rows = [
    {
      icon: '📖',
      label: 'Gramatika',
      detail: lesson.grammarNote?.rule?.slice(0, 38) || '—',
      count: `${lesson.grammarNote?.examples?.length || 0} príkladov`,
    },
    {
      icon: '🗂️',
      label: 'Slovíčka',
      detail: `der:${genders.M} die:${genders.F} das:${genders.N} iné:${genders.other}`,
      count: `${lesson.vocab.length} slov`,
    },
    {
      icon: '🃏',
      label: 'Kartičky',
      detail: 'Prevrat + TTS výslovnosť',
      count: `${lesson.vocab.length} kariet`,
    },
    ...(mcq
      ? [{ icon: '❓', label: 'Výber odpov.', detail: 'Vyber správnu možnosť', count: `${mcq.questions?.length || 0} otázok` }]
      : []),
    ...(fill
      ? [{ icon: '✏️', label: 'Doplňovanie', detail: 'Doplň medzeru + nápoveda', count: `${fill.questions?.length || 0} viet` }]
      : []),
    ...(listen
      ? [{ icon: '🔊', label: 'Počúvanie', detail: 'Načúvaj + napíš', count: `${listen.questions?.length || 0} párov` }]
      : []),
    ...(match
      ? [{ icon: '🔗', label: 'Spájanie', detail: 'DE ↔ SK párovanie', count: `${match.pairs?.length || 0} párov` }]
      : []),
    ...(dialogue
      ? [{ icon: '💬', label: 'Dialóg', detail: 'Interaktívny rozhovor', count: `${dialogue.turns?.filter((t) => t.playerTurn)?.length || 0} odpovedí` }]
      : []),
  ];

  return (
    <div
      style={{ position: 'fixed', left, top, width: tooltipWidth, zIndex: 9999 }}
      className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl p-4 pointer-events-none"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="min-w-0">
          <p className="text-white font-bold text-sm leading-tight truncate">{lesson.title}</p>
          <p className="text-gray-500 text-xs mt-0.5 truncate">{lesson.topic}</p>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <span className="text-yellow-500 text-xs">⭐</span>
          <span className="text-xs text-gray-400">+{lesson.xpReward} XP</span>
        </div>
      </div>
      {/* Communicative goal */}
      {lesson.communicativeGoal && (
        <p className="text-xs text-indigo-300/80 italic mb-2 leading-relaxed line-clamp-2">
          {lesson.communicativeGoal}
        </p>
      )}
      {/* Skill focus tags */}
      <div className="flex flex-wrap gap-1 mb-3">
        {(lesson.skillFocus || []).map((s) => (
          <span
            key={s}
            className={`text-[10px] px-1.5 py-0.5 rounded-md font-medium ${SKILL_COLORS[s] || 'bg-gray-800 text-gray-400'}`}
          >
            {s}
          </span>
        ))}
      </div>
      {/* Stats table */}
      <div className="space-y-1.5 border-t border-gray-800 pt-2.5">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center gap-2 text-xs">
            <span className="w-5 text-center flex-shrink-0">{row.icon}</span>
            <span className="text-gray-300 font-medium w-[90px] flex-shrink-0">{row.label}</span>
            <span className="text-gray-600 flex-1 truncate text-[10px]">{row.detail}</span>
            <span className="text-indigo-400 font-medium flex-shrink-0 text-[10px]">{row.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard({ progress, onStartLesson, onNavigate, onOpenAPIKey, onStartPlacementTest }) {
  const { completedLessons = {}, xp = 0, streak = 0 } = progress;
  const completedCount = Object.keys(completedLessons).length;
  const savedPhrasesCount = (progress.conversationPhrases || []).length;
  const [hoveredLesson, setHoveredLesson] = useState(null);
  const [tooltipRect, setTooltipRect] = useState(null);

  // Weekly progress
  const totalLessons = LESSONS.length;
  const totalVocab = LESSONS.reduce((s, l) => s + l.vocab.length, 0);
  const masteredVocab = Object.values(progress.vocabSeen || {}).filter((v) => v.mastered).length;

  // Find next lesson to do
  const nextLesson = LESSONS.find((l) => !completedLessons[l.id]);
  const lastCompleted = Object.keys(completedLessons).length > 0
    ? LESSONS.find((l) => l.id === Math.max(...Object.keys(completedLessons).map(Number)))
    : null;

  // Weekly progress
  const today = new Date();
  const dayOfWeek = today.getDay() || 7;
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - dayOfWeek + 1);
  const DAYS = ['Po', 'Ut', 'St', 'Št', 'Pi', 'So', 'Ne'];
  const dailyXP = progress.dailyXP || [];

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* Hero stats row */}
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg font-bold text-white">🇩🇪 Nemčina A1</h2>
        <button
          onClick={() => onNavigate('guide')}
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-indigo-400 transition-colors px-3 py-1.5 rounded-xl hover:bg-indigo-950/30"
        >
          <HelpCircle size={13} />
          Ako to funguje?
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: Flame, label: 'Streak', value: `${streak} dní`, color: 'text-orange-400', bg: 'bg-orange-950/40 border-orange-800' },
          { icon: Star, label: 'XP', value: xp, color: 'text-yellow-400', bg: 'bg-yellow-950/40 border-yellow-800' },
          { icon: BookOpen, label: 'Lekcie', value: `${completedCount}/${totalLessons}`, color: 'text-sky-400', bg: 'bg-sky-950/40 border-sky-800' },
          { icon: Trophy, label: 'Slovíčka', value: `${masteredVocab}/${totalVocab}`, color: 'text-emerald-400', bg: 'bg-emerald-950/40 border-emerald-800' },
        ].map((s) => (
          <div key={s.label} className={`rounded-2xl border p-4 ${s.bg}`}>
            <s.icon size={20} className={`${s.color} mb-2`} />
            <p className="text-2xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* XP level bar */}
      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-white">Level {Math.floor(xp / 100) + 1}</span>
          <span className="text-xs text-gray-500">{xp} celkových XP</span>
        </div>
        <XPBar xp={xp} />
      </div>

      {/* AI features card */}
      <div className="rounded-2xl border border-violet-800/40 bg-violet-950/20 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles size={15} className="text-violet-400" />
            <span className="text-sm font-bold text-violet-300">AI funkcie</span>
          </div>
          <button
            onClick={onOpenAPIKey}
            className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-violet-400 transition-colors"
          >
            <Key size={12} /> API kľúč
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onNavigate('chat')}
            className="flex items-start gap-3 p-3 rounded-xl bg-gray-800/60 hover:bg-gray-800 border border-gray-700/40 hover:border-violet-700/50 transition-all text-left group"
          >
            <MessageSquare size={18} className="text-violet-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white text-xs font-bold">AI Konverzácia</p>
              <p className="text-gray-500 text-[11px] mt-0.5 leading-tight">
                {savedPhrasesCount > 0 ? `${savedPhrasesCount} uložených fráz` : '5 postáv · A1 nemčina · opravy chúb'}
              </p>
            </div>
          </button>
          <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-800/60 border border-gray-700/40 text-left">
            <Sparkles size={18} className="text-violet-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white text-xs font-bold">AI Writing Check</p>
              <p className="text-gray-500 text-[11px] mt-0.5 leading-tight">Dostupné priamo v lekciách</p>
            </div>
          </div>
        </div>
      </div>

      {/* Week structure template */}
      <div className="card">
        <h3 className="font-semibold text-white mb-3 flex items-center gap-2 text-sm">
          <Calendar size={15} className="text-indigo-400" />
          Štruktúra každého týždňa
        </h3>
        <div className="flex gap-1.5">
          {[
            { d: 'Po', label: 'Lekcia', sub: 'nová', bg: 'bg-indigo-950/50 border-indigo-800/50', fg: 'text-indigo-300' },
            { d: 'Ut', label: 'Lekcia', sub: 'nová', bg: 'bg-indigo-950/50 border-indigo-800/50', fg: 'text-indigo-300' },
            { d: 'St', label: 'Lekcia', sub: 'nová', bg: 'bg-indigo-950/50 border-indigo-800/50', fg: 'text-indigo-300' },
            { d: 'Št', label: 'Lekcia', sub: 'nová', bg: 'bg-indigo-950/50 border-indigo-800/50', fg: 'text-indigo-300' },
            { d: 'Pi', label: 'Lekcia', sub: 'nová', bg: 'bg-indigo-950/50 border-indigo-800/50', fg: 'text-indigo-300' },
            { d: 'So', label: 'Test', sub: '+Slovíčka', bg: 'bg-emerald-950/50 border-emerald-800/50', fg: 'text-emerald-300' },
            { d: 'Ne', label: 'Pasívne', sub: '+Gramatika', bg: 'bg-violet-950/50 border-violet-800/50', fg: 'text-violet-300' },
          ].map(({ d, label, sub, bg, fg }) => (
            <div key={d} className={`flex-1 flex flex-col items-center gap-0.5 p-2 rounded-xl border text-center ${bg}`}>
              <span className={`text-xs font-bold ${fg}`}>{d}</span>
              <span className={`text-[10px] font-medium leading-tight ${fg}`}>{label}</span>
              <span className="text-[9px] text-gray-500 leading-tight">{sub}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly activity */}
      <div className="card">
        <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
          <TrendingUp size={16} className="text-indigo-400" />
          Týždenná aktivita
        </h3>
        <div className="flex gap-2">
          {DAYS.map((d, i) => {
            const date = new Date(weekStart);
            date.setDate(weekStart.getDate() + i);
            const dateStr = date.toISOString().slice(0, 10);
            const entry = dailyXP.find((e) => e.date === dateStr);
            const xpToday = entry?.xp || 0;
            const isToday = dateStr === today.toISOString().slice(0, 10);
            const h = Math.min(48, Math.max(4, xpToday * 2));
            return (
              <div key={d} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex items-end justify-center" style={{ height: 52 }}>
                  <div
                    className={`w-full rounded-t-md transition-all duration-500 ${xpToday > 0 ? (i === 5 ? 'bg-emerald-600' : i === 6 ? 'bg-violet-600' : 'bg-indigo-600') : 'bg-gray-800'} ${isToday ? 'ring-1 ring-white/30' : ''}`}
                    style={{ height: h }}
                  />
                </div>
                <span className={`text-xs ${isToday ? 'text-indigo-400 font-bold' : 'text-gray-600'}`}>{d}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Next lesson CTA */}
      {nextLesson && (
        <div
          onClick={() => onStartLesson(nextLesson.id)}
          className="card border-indigo-800 bg-indigo-950/40 cursor-pointer hover:border-indigo-600 hover:bg-indigo-950/60 transition-all group"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-indigo-400 font-semibold uppercase tracking-wider mb-1">Pokračuj tam kde si skončil</p>
              <h3 className="text-xl font-bold text-white">{nextLesson.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{nextLesson.topic} · Týždeň {nextLesson.week} · +{nextLesson.xpReward} XP</p>
            </div>
            <div className="w-14 h-14 bg-indigo-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Zap size={28} className="text-white" />
            </div>
          </div>
          <div className="mt-4 h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${(completedCount / totalLessons) * 100}%` }} />
          </div>
          <p className="text-xs text-gray-500 mt-1">{completedCount} / {totalLessons} lekcie dokončené</p>
        </div>
      )}

      {/* Placement test CTA — shown until test is done */}
      {!progress.placementTestDone && onStartPlacementTest && (
        <div className="card border-violet-800/50 bg-violet-950/20">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <FlaskConical size={18} className="text-violet-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-violet-300 text-sm">Ovládaš nemčinu?</p>
                <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                  Urob vstupný test a odomkni lekcie podľa svojich znalostí — preskočíš čo už vieš.
                </p>
              </div>
            </div>
            <button
              onClick={onStartPlacementTest}
              className="flex items-center gap-1.5 flex-shrink-0 px-3 py-2 rounded-xl bg-violet-800/60 hover:bg-violet-700/60 border border-violet-700/50 text-violet-200 text-xs font-semibold transition-all"
            >
              <Unlock size={13} /> Test
            </button>
          </div>
        </div>
      )}

      {/* Course outline */}
      <div>
        <h3 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
          <BookOpen size={18} className="text-indigo-400" />
          Celý kurz A1
        </h3>
        <div className="space-y-3">
          {WEEKLY_PLAN.map((week) => {
            const weekLessons = LESSONS.filter((l) => week.lessons.includes(l.id));
            const weekDone = weekLessons.every((l) => completedLessons[l.id]);
            const weekStarted = weekLessons.some((l) => completedLessons[l.id]);
            const prevWeekDone = week.week === 1 || LESSONS
              .filter((l) => WEEKLY_PLAN.find((w) => w.week === week.week - 1)?.lessons.includes(l.id))
              .every((l) => completedLessons[l.id]);

            return (
              <div key={week.week} className={`card transition-all ${weekDone ? 'border-emerald-800/50 bg-emerald-950/20' : ''}`}>
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm
                    ${weekDone ? 'bg-emerald-800 text-emerald-200' : weekStarted ? 'bg-indigo-800 text-indigo-200' : 'bg-gray-800 text-gray-400'}`}>
                    {weekDone ? <CheckCircle size={16} /> : week.week}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-white">{week.title}</p>
                      <span className="text-xs text-gray-500">T{week.week}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{week.theme}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {weekLessons.map((lesson) => {
                    const done = !!completedLessons[lesson.id];
                    const score = completedLessons[lesson.id]?.score;
                    // Sequential global locking: only unlock if prev lesson (by LESSONS order) is done
                    const globalIdx = LESSONS.findIndex((l) => l.id === lesson.id);
                    const prevLessonDone = globalIdx === 0 || !!completedLessons[LESSONS[globalIdx - 1]?.id];
                    const placementUnlocked = lesson.id <= (progress.placementUnlockedUpTo || 0);
                    const available = done || prevLessonDone || placementUnlocked;
                    const locked = !available;
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => !locked && onStartLesson(lesson.id)}
                        onMouseEnter={(e) => {
                          setHoveredLesson(lesson);
                          setTooltipRect(e.currentTarget.getBoundingClientRect());
                        }}
                        onMouseLeave={() => setHoveredLesson(null)}
                        className={`flex flex-col items-start gap-1 px-3 py-2 rounded-xl border text-xs font-medium transition-all text-left
                          ${done ? 'bg-emerald-900/50 border-emerald-700 text-emerald-200' :
                            available ? 'bg-indigo-900/50 border-indigo-700 text-indigo-200 hover:bg-indigo-900/80 cursor-pointer' :
                            'bg-gray-800/50 border-gray-700/50 text-gray-600 cursor-not-allowed opacity-60'}`}
                      >
                        <div className="flex items-center gap-1.5">
                          {done ? <CheckCircle size={11} /> : locked ? <Lock size={11} /> : <BookOpen size={11} />}
                          <span>{lesson.title}</span>
                          {done && score !== undefined && (
                            <span className={`font-bold ${score >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>{score}%</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 pl-0.5">
                          <span className={`text-[10px] leading-tight ${done ? 'text-emerald-400/60' : locked ? 'text-gray-700' : 'text-gray-500'}`}>
                            {lesson.topic}
                          </span>
                          <span className={`text-[10px] ${done ? 'text-emerald-400/50' : locked ? 'text-gray-700' : 'text-gray-600'}`}>
                            · {lesson.vocab.length} slov
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
                {!weekDone && (
                  <p className="text-xs text-gray-600 mt-2 italic">{week.tips}</p>
                )}
              </div>
            );
          })}
        </div>

        {/* A2 teaser */}
        <div className="card mt-4 border-gray-800 opacity-60">
          <div className="flex items-center gap-3 mb-3">
            <Lock size={16} className="text-gray-500" />
            <p className="font-semibold text-gray-400">A2 kurz — odomkne sa po dokončení A1</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {A2_PREVIEW.map((topic, i) => (
              <div key={i} className="flex items-center gap-2 bg-gray-800/40 rounded-lg px-3 py-2">
                <span className="text-gray-600 text-xs">•</span>
                <span className="text-gray-600 text-xs">{topic}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lesson hover tooltip */}
      {hoveredLesson && tooltipRect && (
        <LessonTooltipPanel lesson={hoveredLesson} rect={tooltipRect} />
      )}
    </div>
  );
}
