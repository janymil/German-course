/**
 * useProgress — localStorage-based progress system
 * Tracks: completed lessons, XP, streak, per-lesson exercise scores
 */
import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'german_progress_v2';

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function save(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}

const defaultState = () => ({
  xp: 0,
  streak: 0,
  lastStudyDate: null,
  completedLessons: {},   // lessonId: { completedAt, score, exercisesDone }
  vocabSeen: {},          // word: { seenCount, lastSeen, mastered }
  dailyXP: [],            // [{ date, xp }]
  conversationPhrases: [],// [{ de, correction, hasCorrection, charId, charName, savedAt }]
  placementTestDone: false,      // true after placement test is completed or skipped
  placementUnlockedUpTo: 0,      // lesson ID up to which placement test unlocked lessons
});

export function useProgress() {
  const [progress, setProgress] = useState(() => load() || defaultState());

  // Persist on every change
  useEffect(() => { save(progress); }, [progress]);

  const completeLesson = useCallback((lessonId, score, xpReward) => {
    setProgress((prev) => {
      const today = new Date().toISOString().slice(0, 10);
      const last = prev.lastStudyDate;
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      const newStreak = last === today ? prev.streak : (last === yesterday ? prev.streak + 1 : 1);

      const earnedXP = Math.round(xpReward * (score / 100));
      const dailyXP = [...(prev.dailyXP || [])];
      const todayEntry = dailyXP.find((d) => d.date === today);
      if (todayEntry) todayEntry.xp += earnedXP;
      else dailyXP.push({ date: today, xp: earnedXP });
      // Keep last 30 days
      while (dailyXP.length > 30) dailyXP.shift();

      return {
        ...prev,
        xp: prev.xp + earnedXP,
        streak: newStreak,
        lastStudyDate: today,
        dailyXP,
        completedLessons: {
          ...prev.completedLessons,
          [lessonId]: {
            completedAt: new Date().toISOString(),
            score,
            xpEarned: earnedXP,
          },
        },
      };
    });
  }, []);

  const markVocabSeen = useCallback((word, mastered = false) => {
    setProgress((prev) => {
      const existing = prev.vocabSeen[word] || { seenCount: 0, mastered: false };
      return {
        ...prev,
        vocabSeen: {
          ...prev.vocabSeen,
          [word]: {
            seenCount: existing.seenCount + 1,
            lastSeen: new Date().toISOString(),
            mastered: mastered || existing.mastered,
          },
        },
      };
    });
  }, []);

  const saveConversationPhrases = useCallback((phrases) => {
    setProgress((prev) => ({
      ...prev,
      conversationPhrases: [
        ...(prev.conversationPhrases || []),
        ...phrases,
      ],
    }));
  }, []);

  const resetProgress = useCallback(() => {
    const fresh = defaultState();
    setProgress(fresh);
    save(fresh);
  }, []);

  const isLessonCompleted = useCallback((lessonId) => {
    return !!progress.completedLessons[lessonId];
  }, [progress]);

  const getLessonScore = useCallback((lessonId) => {
    return progress.completedLessons[lessonId]?.score ?? null;
  }, [progress]);

  const getTotalVocabMastered = useCallback(() => {
    return Object.values(progress.vocabSeen).filter((v) => v.mastered).length;
  }, [progress]);

  const completeWeeklyTest = useCallback((weekNum, score) => {
    setProgress((prev) => ({
      ...prev,
      weeklyTests: {
        ...(prev.weeklyTests || {}),
        [weekNum]: { score, passed: score >= 60, completedAt: new Date().toISOString() },
      },
    }));
  }, []);

  const completeLessonTest = useCallback((lessonId, score) => {
    setProgress((prev) => ({
      ...prev,
      lessonTests: {
        ...(prev.lessonTests || {}),
        [lessonId]: { score, completedAt: new Date().toISOString() },
      },
    }));
  }, []);

  const completePlacementTest = useCallback((unlockedUpTo) => {
    setProgress((prev) => ({
      ...prev,
      placementTestDone: true,
      placementUnlockedUpTo: unlockedUpTo,
    }));
  }, []);

  return {
    progress,
    completeLesson,
    markVocabSeen,
    saveConversationPhrases,
    resetProgress,
    isLessonCompleted,
    getLessonScore,
    getTotalVocabMastered,
    completeWeeklyTest,
    completeLessonTest,
    completePlacementTest,
  };
}
