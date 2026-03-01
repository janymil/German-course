import React, { useState } from 'react';
import { Flame, Star, BookOpen, Trophy, Zap, Lock, CheckCircle, TrendingUp, Calendar, HelpCircle, MessageSquare, Sparkles, Key, Unlock, FlaskConical, ArrowRight, Target, RotateCcw } from 'lucide-react';
import { LESSONS, WEEKLY_PLAN, A2_PREVIEW } from '../data/curriculum';

function XPBar({ xp }) {
  const level = Math.floor(xp / 100) + 1;
  const pct = (xp % 100);
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm font-medium text-gray-400">
        <span className="text-white">Úroveň {level}</span>
        <span>{xp % 100} / 100 XP</span>
      </div>
      <div className="h-3 bg-gray-800 rounded-full overflow-hidden shadow-inner border border-gray-700/50">
        <div className="h-full bg-gradient-to-r from-indigo-500 hover:from-indigo-400 hover:to-violet-400 to-violet-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(99,102,241,0.5)]" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

const SKILL_COLORS = {
  vocabulary: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  grammar: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
  listening: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  writing: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  speaking: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
  pronunciation: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
  reading: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20',
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

  const tooltipWidth = 340;
  const left =
    rect.right + 16 + tooltipWidth < window.innerWidth
      ? rect.right + 16
      : rect.left - 16 - tooltipWidth;
  const top = Math.min(Math.max(16, rect.top - 20), window.innerHeight - 440);

  const rows = [
    { icon: '📖', label: 'Gramatika', detail: lesson.grammarNote?.rule?.slice(0, 38) || '—', count: `${lesson.grammarNote?.examples?.length || 0} príkladov` },
    { icon: '🗂️', label: 'Slovíčka', detail: `der:${genders.M} die:${genders.F} das:${genders.N} iné:${genders.other}`, count: `${lesson.vocab.length} slov` },
    { icon: '🃏', label: 'Kartičky', detail: 'Prevrat + TTS výslovnosť', count: `${lesson.vocab.length} kariet` },
    ...(mcq ? [{ icon: '❓', label: 'Výber odpov.', detail: 'Vyber správnu možnosť', count: `${mcq.questions?.length || 0} otázok` }] : []),
    ...(fill ? [{ icon: '✏️', label: 'Doplňovanie', detail: 'Doplň medzeru + nápoveda', count: `${fill.questions?.length || 0} viet` }] : []),
    ...(listen ? [{ icon: '🔊', label: 'Počúvanie', detail: 'Načúvaj + napíš', count: `${listen.questions?.length || 0} párov` }] : []),
    ...(match ? [{ icon: '🔗', label: 'Spájanie', detail: 'DE ↔ SK párovanie', count: `${match.pairs?.length || 0} párov` }] : []),
    ...(dialogue ? [{ icon: '💬', label: 'Dialóg', detail: 'Interaktívny rozhovor', count: `${dialogue.turns?.filter((t) => t.playerTurn)?.length || 0} odpovedí` }] : []),
  ];

  return (
    <div
      style={{ position: 'fixed', left, top, width: tooltipWidth, zIndex: 9999 }}
      className="bg-gray-950/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] p-5 pointer-events-none transform transition-all duration-200 animate-fade-in-up"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <p className="text-white font-bold text-base leading-tight truncate mb-1">{lesson.title}</p>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-gray-800 text-gray-300 text-[10px] font-bold tracking-wide uppercase border border-gray-700">Týždeň {lesson.week}</span>
            <p className="text-indigo-300 text-xs font-medium truncate">{lesson.topic}</p>
          </div>
        </div>
        <div className="flex items-center px-2 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex-shrink-0">
          <Star size={12} className="text-yellow-500 fill-yellow-500 mr-1.5" />
          <span className="text-xs font-bold text-yellow-500">+{lesson.xpReward} XP</span>
        </div>
      </div>

      {lesson.communicativeGoal && (
        <div className="bg-indigo-950/30 border border-indigo-900/50 rounded-xl p-3 mb-4">
          <p className="text-xs text-indigo-300 italic leading-relaxed">
            "{lesson.communicativeGoal}"
          </p>
        </div>
      )}

      <div className="flex flex-wrap gap-1.5 mb-4">
        {(lesson.skillFocus || []).map((s) => (
          <span
            key={s}
            className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${SKILL_COLORS[s] || 'bg-gray-800 text-gray-400'}`}
          >
            {s}
          </span>
        ))}
      </div>

      <div className="space-y-2 border-t border-gray-800/60 pt-4">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center gap-3 text-xs">
            <div className="w-7 h-7 rounded-lg bg-gray-800/80 flex items-center justify-center flex-shrink-0 text-sm shadow-inner border border-gray-700/30">
              {row.icon}
            </div>
            <span className="text-gray-300 font-semibold w-[90px] flex-shrink-0">{row.label}</span>
            <span className="text-gray-500 flex-1 truncate text-[11px]">{row.detail}</span>
            <span className="text-indigo-400 font-bold flex-shrink-0 text-[11px] bg-indigo-500/10 px-1.5 py-0.5 rounded">{row.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard({ progress, onStartLesson, onNavigate, onOpenAPIKey, onStartPlacementTest, onResetLesson, onResetAll }) {
  const { completedLessons = {}, xp = 0, streak = 0 } = progress;
  const completedCount = Object.keys(completedLessons).length;
  const totalLessons = LESSONS.length;
  const totalVocab = LESSONS.reduce((s, l) => s + l.vocab.length, 0);
  const masteredVocab = Object.values(progress.vocabSeen || {}).filter((v) => v.mastered).length;

  let partialLessonsProgress = 0;
  if (progress.lessonStates) {
    for (const [lessonId, state] of Object.entries(progress.lessonStates)) {
      if (state && !completedLessons[lessonId]) {
        const lessonDef = LESSONS.find(l => String(l.id) === String(lessonId));
        if (lessonDef && lessonDef.exercises?.length) {
          const completedExercises = state.scores?.length || 0;
          partialLessonsProgress += Math.min(0.9, completedExercises / lessonDef.exercises.length);
        }
      }
    }
  }
  const effectiveCompletedCount = completedCount + partialLessonsProgress;
  const overallProgressPct = totalLessons > 0 ? Math.min(100, Math.round((effectiveCompletedCount / totalLessons) * 100)) : 0;

  const savedPhrasesCount = (progress.conversationPhrases || []).length;
  const [hoveredLesson, setHoveredLesson] = useState(null);
  const [tooltipRect, setTooltipRect] = useState(null);
  const [confirmResetId, setConfirmResetId] = useState(null);
  const [confirmResetAll, setConfirmResetAll] = useState(false);

  // [Agent 8] Story stats
  const storiesReadCount = Object.keys(progress.storiesRead || {}).length;
  const readingVocabCount = (progress.readingVocab || []).length;

  const nextLesson = LESSONS.find((l) => !completedLessons[l.id]);

  const today = new Date();
  const dayOfWeek = today.getDay() || 7;
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - dayOfWeek + 1);
  const DAYS = ['Po', 'Ut', 'St', 'Št', 'Pi', 'So', 'Ne'];
  const dailyXP = progress.dailyXP || [];

  return (
    <div className="max-w-7xl w-full mx-auto py-8 px-4 sm:px-8 lg:px-12">

      {/* Header Profile Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🇩🇪</span>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Nemčina A1</h1>
          </div>
          <p className="text-gray-400 text-sm font-medium">Vitaj späť! Pokračuj vo svojej ceste za plynulou nemčinou.</p>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate('guide')} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-800/80 hover:bg-gray-700 text-gray-300 font-medium text-sm transition-all shadow-sm border border-gray-700/50 hover:border-gray-600">
            <HelpCircle size={16} /> Ako to funguje?
          </button>
          <button onClick={onOpenAPIKey} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-900/40 hover:bg-violet-800/60 text-violet-300 font-medium text-sm transition-all shadow-sm border border-violet-700/50 hover:border-violet-500">
            <Key size={16} /> API Nastavenia
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-6">

          {/* Top Stats Grid — now 5 cards including story stats [Agent 8] */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { icon: Flame, label: 'Streak', value: `${streak} dní`, color: 'text-orange-500', bg: 'bg-gradient-to-br from-orange-500/10 to-transparent border-orange-500/20' },
              { icon: Star, label: 'Celkové XP', value: xp.toLocaleString(), color: 'text-yellow-400', bg: 'bg-gradient-to-br from-yellow-400/10 to-transparent border-yellow-400/20' },
              { icon: BookOpen, label: 'Lekcie', value: `${completedCount}/${totalLessons}`, color: 'text-sky-400', bg: 'bg-gradient-to-br from-sky-400/10 to-transparent border-sky-400/20' },
              { icon: Trophy, label: 'Zvládnuté slová', value: `${masteredVocab}/${totalVocab}`, color: 'text-emerald-400', bg: 'bg-gradient-to-br from-emerald-400/10 to-transparent border-emerald-400/20' },
              { icon: BookOpen, label: 'Čítanie', value: `${storiesReadCount} príbehov · ${readingVocabCount} slóv`, color: 'text-amber-400', bg: 'bg-gradient-to-br from-amber-400/10 to-transparent border-amber-400/20' },
            ].map((s) => (
              <div key={s.label} className={`rounded-3xl border p-5 relative overflow-hidden backdrop-blur-sm ${s.bg} transition-transform hover:-translate-y-1 duration-300`}>
                <div className={`p-2.5 rounded-2xl bg-gray-900/50 inline-flex mb-3 ${s.color} border border-gray-700/30`}>
                  <s.icon size={22} strokeWidth={2.5} />
                </div>
                <p className="text-2xl font-extrabold text-white mb-0.5 tracking-tight">{s.value}</p>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Next Lesson Big Card */}
          {nextLesson && (
            <div
              onClick={() => onStartLesson(nextLesson.id)}
              className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-indigo-900/20 p-6 sm:p-8 cursor-pointer group shadow-lg shadow-indigo-900/20 hover:shadow-indigo-900/40 hover:bg-indigo-900/30 transition-all duration-300"
            >
              {/* Decorative faint icon */}
              <Zap size={160} className="absolute -right-10 -bottom-10 text-indigo-500/5 rotate-12 group-hover:scale-110 group-hover:text-indigo-500/10 transition-transform duration-500" />

              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-500/30">
                      Na rade
                    </span>
                    <span className="text-gray-400 text-sm font-medium">Týždeň {nextLesson.week}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight group-hover:text-indigo-100 transition-colors">
                    {nextLesson.title}
                  </h2>
                  <p className="text-indigo-200/70 text-base font-medium mb-5">{nextLesson.topic}</p>

                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 text-sm font-bold text-yellow-500 bg-yellow-500/10 px-3 py-1.5 rounded-xl border border-yellow-500/20">
                      <Star size={16} className="fill-yellow-500" /> +{nextLesson.xpReward} XP
                    </span>
                    <span className="flex items-center gap-1.5 text-sm font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                      <BookOpen size={16} /> {nextLesson.vocab.length} slov
                    </span>
                  </div>
                </div>

                <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-indigo-500 text-white rounded-2xl shadow-lg group-hover:bg-indigo-400 group-hover:scale-105 transition-all duration-300">
                  <Zap size={32} className="group-hover:animate-pulse" />
                </div>
              </div>

              <div className="relative z-10 mt-8 pt-6 border-t border-indigo-500/20">
                <div className="flex justify-between text-sm font-semibold mb-2">
                  <span className="text-indigo-300">Priebeh kurzu A1</span>
                  <span className="text-indigo-200">{overallProgressPct}%</span>
                </div>
                <div className="h-2.5 bg-gray-900 rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full" style={{ width: `${overallProgressPct}%` }} />
                </div>
              </div>
            </div>
          )}

          {/* Curriculum Timeline */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center shadow-inner border border-gray-700">
                <BookOpen size={20} className="text-gray-300" />
              </div>
              <h2 className="text-xl font-bold text-white">Osnova Kurzu</h2>
            </div>

            <div className="space-y-4">
              {WEEKLY_PLAN.map((week) => {
                const weekLessons = LESSONS.filter((l) => week.lessons.includes(l.id));
                const weekDone = weekLessons.every((l) => completedLessons[l.id]);
                const weekStarted = weekLessons.some((l) => completedLessons[l.id]);

                return (
                  <div key={week.week} className={`rounded-3xl border p-5 sm:p-6 transition-all duration-300
                        ${weekDone ? 'bg-emerald-950/10 border-emerald-900/30' :
                      weekStarted ? 'bg-gray-900/80 border-indigo-900/50 shadow-lg' : 'bg-gray-900/40 border-gray-800'}`}>

                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 font-black text-lg shadow-sm
                                ${weekDone ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white' :
                            weekStarted ? 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white' :
                              'bg-gray-800 text-gray-500 border border-gray-700'}`}>
                          {weekDone ? <CheckCircle size={24} strokeWidth={3} /> : week.week}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className={`font-bold text-lg ${weekDone ? 'text-emerald-100' : weekStarted ? 'text-white' : 'text-gray-300'}`}>
                              {week.title}
                            </h3>
                            {weekDone && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 uppercase tracking-widest">Hotovo</span>}
                          </div>
                          <p className="text-sm font-medium text-gray-400">{week.theme}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {weekLessons.map((lesson) => {
                        const done = !!completedLessons[lesson.id];
                        const score = completedLessons[lesson.id]?.score;
                        const globalIdx = LESSONS.findIndex((l) => l.id === lesson.id);
                        const prevLessonDone = globalIdx === 0 || !!completedLessons[LESSONS[globalIdx - 1]?.id];
                        const placementUnlocked = lesson.id <= (progress.placementUnlockedUpTo || 0);
                        const available = done || prevLessonDone || placementUnlocked;
                        const locked = !available;

                        return (
                          <div
                            key={lesson.id}
                            onClick={() => !locked && onStartLesson(lesson.id)}
                            role="button"
                            tabIndex={locked ? -1 : 0}
                            onKeyDown={(e) => e.key === 'Enter' && !locked && onStartLesson(lesson.id)}
                            onMouseEnter={(e) => {
                              setHoveredLesson(lesson);
                              setTooltipRect(e.currentTarget.getBoundingClientRect());
                            }}
                            onMouseLeave={() => setHoveredLesson(null)}
                            className={`group relative flex flex-col p-4 rounded-2xl border text-left transition-all duration-200 overflow-hidden
                                ${done ? 'bg-emerald-900/20 border-emerald-800/50 hover:bg-emerald-900/30' :
                                available ? 'bg-gray-800/50 border-gray-700 hover:border-indigo-500/50 hover:bg-gray-800 hover:shadow-lg cursor-pointer' :
                                  'bg-gray-900/50 border-gray-800/50 opacity-50 cursor-not-allowed'}`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className={`w-8 h-8 rounded-xl flex items-center justify-center
                                     ${done ? 'bg-emerald-500/20 text-emerald-400' : locked ? 'bg-gray-800 text-gray-500' : 'bg-gray-700 text-gray-300 group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition-colors'}`}>
                                {done ? <CheckCircle size={16} /> : locked ? <Lock size={16} /> : <BookOpen size={16} />}
                              </div>
                              {done && score !== undefined && (
                                <div className="flex items-center gap-1">
                                  {confirmResetId === lesson.id ? (
                                    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                                      <button onClick={(e) => { e.stopPropagation(); onResetLesson?.(lesson.id); setConfirmResetId(null); }} className="text-[10px] text-red-400 hover:text-red-300 font-semibold">Áno</button>
                                      <span className="text-gray-600 text-[10px]">/</span>
                                      <button onClick={(e) => { e.stopPropagation(); setConfirmResetId(null); }} className="text-[10px] text-gray-500 hover:text-gray-400">Nie</button>
                                    </div>
                                  ) : (
                                    <>
                                      <span className={`text-xs font-bold px-2 py-1 rounded-lg ${Math.min(100, score) >= 80 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                                        {Math.min(100, score)}%
                                      </span>
                                      {onResetLesson && (
                                        <button
                                          onClick={(e) => { e.stopPropagation(); setConfirmResetId(lesson.id); }}
                                          className="w-5 h-5 rounded flex items-center justify-center text-gray-600 hover:text-red-400 hover:bg-red-900/20 transition-colors"
                                          title="Resetovať lekciu"
                                        >
                                          <RotateCcw size={11} />
                                        </button>
                                      )}
                                    </>
                                  )}
                                </div>
                              )}
                              {!done && available && (
                                <span className="text-xs font-bold px-2 py-1 rounded-lg bg-gray-800 text-gray-400 group-hover:bg-indigo-500/10 group-hover:text-indigo-400 transition-colors">
                                  Štart
                                </span>
                              )}
                            </div>

                            <h4 className={`font-bold text-sm mb-1 leading-tight ${done ? 'text-emerald-100' : locked ? 'text-gray-500' : 'text-gray-200 group-hover:text-white'}`}>
                              {lesson.title}
                            </h4>
                            <p className={`text-xs font-medium truncate w-full ${done ? 'text-emerald-400/70' : locked ? 'text-gray-600' : 'text-gray-400 gap-hover:text-gray-300'}`}>
                              {lesson.topic}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    {!weekDone && week.tips && (
                      <div className="mt-5 p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 flex items-start gap-3">
                        <Zap size={18} className="text-indigo-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm font-medium text-indigo-200/80 leading-relaxed">{week.tips}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* A2 Teaser Section */}
            <div className="mt-6 rounded-3xl border border-dashed border-gray-700 bg-gray-900/20 p-6 flex flex-col md:flex-row md:items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gray-800 border border-gray-700 flex items-center justify-center flex-shrink-0 opacity-50">
                <Lock size={28} className="text-gray-500" />
              </div>
              <div className="flex-1 opacity-70">
                <h3 className="text-lg font-bold text-gray-300 mb-1">Kurz A2 (Pripravuje sa)</h3>
                <p className="text-sm text-gray-500 font-medium mb-3">Tento obsah sa ti automaticky odomkne po úspešnom zdolaní všetkých A1 lekcií.</p>
                <div className="flex flex-wrap gap-2">
                  {A2_PREVIEW.slice(0, 4).map((topic, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-gray-800 text-gray-400 text-xs font-medium border border-gray-700/50">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 space-y-6">

          {/* Level Progress */}
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full" />
            <XPBar xp={xp} />
          </div>

          {/* Arena Promo Widget */}
          <div className="bg-gradient-to-br from-indigo-950/80 to-indigo-900/20 border border-indigo-800/50 rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 flex items-center justify-center">
                  <Target size={20} className="text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Tréningová Aréna</h3>
                  <p className="text-xs text-indigo-300/70">Nekonečné cvičenia</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                Preklad, diktát, hovorenie a slovosled — trénuj aspoň <strong className="text-indigo-300">20 minút denne</strong> pre najlepšie výsledky.
              </p>
              <button
                onClick={() => onNavigate('arena')}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all text-sm flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(99,102,241,0.3)]"
              >
                <Target size={16} className="group-hover:rotate-12 transition-transform" />
                Otvoriť Arénu
              </button>
            </div>
          </div>

          {/* Activity Chart */}
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
            <h3 className="font-bold text-white mb-5 flex items-center gap-2">
              <TrendingUp size={18} className="text-gray-400" />
              Tvoja Aktivita
            </h3>
            <div className="flex gap-2 justify-between items-end h-32">
              {DAYS.map((d, i) => {
                const date = new Date(weekStart);
                date.setDate(weekStart.getDate() + i);
                const dateStr = date.toISOString().slice(0, 10);
                const entry = dailyXP.find((e) => e.date === dateStr);
                const xpToday = entry?.xp || 0;
                const isToday = dateStr === today.toISOString().slice(0, 10);

                // Max height 100px. let's say 100XP = 100px
                const h = Math.min(100, Math.max(8, xpToday));

                return (
                  <div key={d} className="flex flex-col items-center gap-2 group flex-1">
                    <div className="w-full flex justify-center relative">
                      {/* Tooltip for XP */}
                      {xpToday > 0 && (
                        <div className="absolute -top-8 bg-gray-800 text-white text-[10px] font-bold px-2 py-1 rounded-lg opacity-0 gap-hover:opacity-100 transition-opacity whitespace-nowrap hidden group-hover:block z-10 pointer-events-none">
                          {xpToday} XP
                        </div>
                      )}
                      <div
                        className={`w-full max-w-[28px] rounded-lg transition-all duration-700 ease-elastic hover:brightness-110 
                            ${xpToday > 0 ? (isToday ? 'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]' : 'bg-indigo-500/60') : 'bg-gray-800/50 border border-gray-800'}`}
                        style={{ height: h }}
                      />
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-wider ${isToday ? 'text-indigo-400' : 'text-gray-500'}`}>{d}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Weekly Plan Guide */}
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <Calendar size={18} className="text-gray-400" />
              Ideálny Týždeň
            </h3>
            <div className="space-y-2">
              {[
                { d: 'Po-Pi', title: '5x Denná Lekcia', desc: '15 minút nové učivo', color: 'indigo' },
                { d: 'So', title: 'Opakovanie', desc: 'Slovíčka a Test', color: 'emerald' },
                { d: 'Ne', title: 'Pasívna Fáza', desc: 'Podcast, Seriál', color: 'violet' }
              ].map((item) => (
                <div key={item.d} className={`flex items-start gap-4 p-3 rounded-2xl bg-${item.color}-500/5 border border-${item.color}-500/10`}>
                  <div className={`w-12 h-12 rounded-xl bg-${item.color}-500/10 text-${item.color}-400 flex flex-col items-center justify-center flex-shrink-0 font-bold leading-tight`}>
                    <span className="text-xs uppercase">{item.d}</span>
                  </div>
                  <div className="pt-1">
                    <p className={`text-sm font-bold text-${item.color}-100`}>{item.title}</p>
                    <p className={`text-xs font-medium text-gray-400 mt-0.5`}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Features */}
          <div className="bg-gradient-to-b from-gray-900 to-violet-950/20 border border-violet-900/30 rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-violet-600/20 blur-3xl rounded-full" />

            <div className="flex items-center gap-2 mb-5 relative z-10">
              <Sparkles className="text-violet-400" size={20} />
              <h3 className="font-bold text-white text-lg">Umelá Inteligencia</h3>
            </div>

            <div className="space-y-3 relative z-10">
              <button onClick={() => onNavigate('chat')} className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gray-900/80 border border-gray-700/50 hover:border-violet-500/50 hover:bg-gray-800 text-left transition-all group shadow-sm hover:shadow-lg">
                <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-violet-500/20 flex items-center justify-center text-violet-400">
                  <MessageSquare size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white mb-0.5">Konverzácia</p>
                  <p className="text-xs font-medium text-gray-400 truncate">{savedPhrasesCount > 0 ? `${savedPhrasesCount} obľúbených fráz` : 'Trénuj si rozprávanie'}</p>
                </div>
                <ArrowRight size={16} className="text-gray-600 ml-2 group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
              </button>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-900/40 border border-gray-800/50 text-left opacity-70">
                <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-gray-800 flex items-center justify-center text-gray-500">
                  <BookOpen size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-300">Writing Check</p>
                  <p className="text-[11px] font-bold text-gray-500 mt-0.5 uppercase tracking-wider">Dostupné v lekciách</p>
                </div>
              </div>
            </div>
          </div>

          {/* Placement Test */}
          {!progress.placementTestDone && onStartPlacementTest && (
            <button onClick={onStartPlacementTest} className="w-full relative overflow-hidden flex items-center justify-between gap-4 p-5 rounded-3xl bg-gray-900 border border-gray-800 hover:border-indigo-500/50 hover:bg-gray-800 transition-all group text-left shadow-lg">
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FlaskConical size={20} />
                </div>
                <div>
                  <p className="font-bold text-white text-base leading-tight mb-0.5">Už vieš po nemecky?</p>
                  <p className="text-sm text-gray-400 font-medium">Preskoč čo vieš testom.</p>
                </div>
              </div>
              <ArrowRight size={20} className="text-gray-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all relative z-10" />
            </button>
          )}

        </div>
      </div>

      {/* Reset All Progress */}
      {onResetAll && (
        <div className="mt-6 flex justify-center pb-4">
          {confirmResetAll ? (
            <div className="flex items-center gap-3 text-sm">
              <span className="text-gray-400">Naozaj resetovať <strong className="text-red-400">všetok postup</strong>?</span>
              <button onClick={() => { onResetAll(); setConfirmResetAll(false); }} className="text-red-400 hover:text-red-300 font-semibold underline underline-offset-2">Áno, vymazať</button>
              <button onClick={() => setConfirmResetAll(false)} className="text-gray-500 hover:text-gray-400">Zrušiť</button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmResetAll(true)}
              className="text-xs text-gray-700 hover:text-red-500 transition-colors flex items-center gap-1.5"
            >
              <RotateCcw size={11} />
              Resetovať všetok postup
            </button>
          )}
        </div>
      )}

      {hoveredLesson && tooltipRect && (
        <LessonTooltipPanel lesson={hoveredLesson} rect={tooltipRect} />
      )}
    </div>
  );
}
