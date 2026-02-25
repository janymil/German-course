import React, { useState } from 'react';
import { LESSONS, WEEKLY_PLAN } from '../data/curriculum';
import { CheckCircle, Lock, BookOpen, Star, ChevronDown, ChevronUp, Lightbulb, Calendar, ClipboardList } from 'lucide-react';

export default function WeeklyPlan({ progress, onStartLesson, onStartWeeklyTest, onNavigate }) {
  const [openWeek, setOpenWeek] = useState(null);
  const { completedLessons = {} } = progress;

  const getWeekStatus = (week) => {
    const lessons = LESSONS.filter((l) => week.lessons.includes(l.id));
    const done = lessons.filter((l) => completedLessons[l.id]).length;
    if (done === lessons.length) return 'done';
    if (done > 0) return 'active';
    return 'locked';
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <Calendar size={22} className="text-indigo-400" />
        <h2 className="text-2xl font-bold text-white">7-týždenný plán A1</h2>
      </div>

      {WEEKLY_PLAN.map((week) => {
        const status = getWeekStatus(week);
        const lessons = LESSONS.filter((l) => week.lessons.includes(l.id));
        const doneLessons = lessons.filter((l) => completedLessons[l.id]).length;
        const isOpen = openWeek === week.week;
        const totalXP = lessons.reduce((s, l) => s + l.xpReward, 0);

        const statusColors = {
          done: 'border-emerald-700 bg-emerald-950/30',
          active: 'border-indigo-700 bg-indigo-950/30',
          locked: 'border-gray-800 bg-gray-900/30',
        };
        const badgeColors = {
          done: 'bg-emerald-800 text-emerald-200',
          active: 'bg-indigo-800 text-indigo-200',
          locked: 'bg-gray-800 text-gray-500',
        };

        return (
          <div key={week.week} className={`rounded-2xl border transition-all ${statusColors[status]}`}>
            <button
              onClick={() => setOpenWeek(isOpen ? null : week.week)}
              className="w-full text-left p-5"
            >
              <div className="flex items-center gap-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-base flex-shrink-0 ${badgeColors[status]}`}>
                  {status === 'done' ? <CheckCircle size={20} /> : `T${week.week}`}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`font-semibold text-sm sm:text-base ${status === 'locked' ? 'text-gray-500' : 'text-white'}`}>
                      {week.title}
                    </p>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Star size={11} className="text-yellow-500" />
                      <span className="text-xs text-gray-400">{totalXP} XP</span>
                    </div>
                  </div>
                  <p className={`text-xs mt-0.5 ${status === 'locked' ? 'text-gray-600' : 'text-gray-400'}`}>{week.theme}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${status === 'done' ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                        style={{ width: `${(doneLessons / lessons.length) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 flex-shrink-0">{doneLessons}/{lessons.length}</span>
                  </div>
                </div>
                {isOpen ? <ChevronUp size={16} className="text-gray-500 flex-shrink-0" /> : <ChevronDown size={16} className="text-gray-500 flex-shrink-0" />}
              </div>
            </button>

            {isOpen && (
              <div className="px-5 pb-5 space-y-3 border-t border-white/5 pt-4">
                {lessons.map((lesson, li) => {
                  const done = !!completedLessons[lesson.id];
                  const score = completedLessons[lesson.id]?.score;
                  // Global sequential lock: lesson N requires lesson N-1 (by LESSONS order) to be done
                  const globalIdx = LESSONS.findIndex((l) => l.id === lesson.id);
                  const prevLessonDone = globalIdx === 0 || !!completedLessons[LESSONS[globalIdx - 1]?.id];
                  const placementUnlocked = lesson.id <= (progress.placementUnlockedUpTo || 0);
                  const available = done || prevLessonDone || placementUnlocked;

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => available && onStartLesson(lesson.id)}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all
                        ${done ? 'border-emerald-800/60 bg-emerald-950/30 cursor-pointer hover:bg-emerald-950/50' :
                          available ? 'border-indigo-800/60 bg-indigo-950/20 cursor-pointer hover:bg-indigo-950/40' :
                          'border-gray-800/40 bg-gray-800/10 cursor-not-allowed opacity-50'}`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold
                        ${done ? 'bg-emerald-800 text-emerald-200' : available ? 'bg-indigo-800 text-indigo-200' : 'bg-gray-800 text-gray-600'}`}>
                        {done ? <CheckCircle size={14} /> : !available ? <Lock size={14} /> : lesson.id}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium truncate ${done ? 'text-emerald-200' : available ? 'text-white' : 'text-gray-500'}`}>
                          {lesson.title}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{lesson.topic} · {lesson.vocab.length} slovíčok</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 text-xs">
                        {done && score !== undefined ? (
                          <span className={`font-bold ${score >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>{score}%</span>
                        ) : (
                          <span className="text-yellow-600">+{lesson.xpReward}</span>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Day 6 + 7 — structured recap */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-800/40 space-y-2">
                    <p className="text-xs font-bold text-indigo-300">So — Aktívne opakovanie</p>
                    <p className="text-xs text-gray-400 leading-relaxed">Týždenný test + Slovíčka (MCQ / Doplňovanie)</p>
                    <div className="flex flex-wrap gap-1">
                      {status === 'done' && onStartWeeklyTest && (
                        <button onClick={() => onStartWeeklyTest(week.week)} className="text-xs px-2 py-1 rounded-lg bg-emerald-900/60 border border-emerald-700/50 text-emerald-300 hover:bg-emerald-900 transition-all">Test →</button>
                      )}
                      {onNavigate && (
                        <button onClick={() => onNavigate('vocab')} className="text-xs px-2 py-1 rounded-lg bg-indigo-900/60 border border-indigo-700/50 text-indigo-300 hover:bg-indigo-900 transition-all">Slovíčka →</button>
                      )}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-violet-950/30 border border-violet-800/40 space-y-2">
                    <p className="text-xs font-bold text-violet-300">Ne — Pasívny kontakt</p>
                    <p className="text-xs text-gray-400 leading-relaxed">Počúvanie + opakovanie gramatiky</p>
                    <div className="flex flex-wrap gap-1">
                      {onNavigate && (
                        <button onClick={() => onNavigate('passive')} className="text-xs px-2 py-1 rounded-lg bg-violet-900/60 border border-violet-700/50 text-violet-300 hover:bg-violet-900 transition-all">Počúvanie →</button>
                      )}
                      {onNavigate && (
                        <button onClick={() => onNavigate('grammar')} className="text-xs px-2 py-1 rounded-lg bg-violet-900/60 border border-violet-700/50 text-violet-300 hover:bg-violet-900 transition-all">Gramatika →</button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tip */}
                <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-950/20 border border-amber-800/30">
                  <Lightbulb size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-300/80">{week.tips}</p>
                </div>
                {status === 'done' && onStartWeeklyTest && (
                  <button
                    onClick={() => onStartWeeklyTest(week.week)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-emerald-700/50 bg-emerald-950/20 text-emerald-300 text-sm font-medium hover:bg-emerald-950/40 transition-all"
                  >
                    <ClipboardList size={15} />
                    Test týždňa 📋
                  </button>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
