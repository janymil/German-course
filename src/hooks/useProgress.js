/**
 * useProgress — Progress persistence for the German A1 course.
 *
 * Storage strategy (layered):
 *  1. Primary: GET/POST /api/progress  → saved to progress.json on disk
 *              This survives server restarts, code changes, and browser clears.
 *  2. Cache:   localStorage under CACHE_KEY  → for instant reads on page load
 *              while the async file read completes.
 *
 * Data flow:
 *  - On mount: load from localStorage cache immediately so UI renders fast,
 *              then GET /api/progress and merge (file wins if it exists).
 *  - On every state change: write to localStorage AND POST to file.
 */
import { useState, useCallback, useEffect } from 'react';

const LEGACY_KEY = 'german_progress_v2';
const CACHE_KEY = 'german_progress_cache';
const FILE_API = '/api/progress';

let globalProgress = null;
let fileLoaded = false;
let fileFetchStarted = false;
const listeners = new Set();
let saveTimer = null;

// ── Default state ────────────────────────────────────────────────────────────
const defaultState = () => ({
  xp: 0,
  streak: 0,
  lastStudyDate: null,
  completedLessons: {},
  vocabSeen: {},
  dailyXP: [],
  conversationPhrases: [],
  placementTestDone: false,
  placementUnlockedUpTo: 0,
  storiesRead: {},
  readingVocab: [],
  grammarSeen: {},
  passiveSessions: [],
  passiveCompletedDays: [],
  grammarAiSeen: {},
  weeklyTests: {},
  lessonTests: {},
  customVocab: [],
  lessonStates: {}, // Stores mid-lesson progress
  generatedWords: {}, // Stores AI generated grammar cards for StoryReader
  smartTutorHistory: [], // Stores past AI Tutor sessions
});

// ── Serialise / deserialise ──────────────────────────────────────────────────
function loadFromCache() {
  try {
    let raw = localStorage.getItem(CACHE_KEY);
    if (!raw) {
      const legacy = localStorage.getItem(LEGACY_KEY);
      if (legacy) {
        raw = legacy;
        // Keep the legacy key just in case, but write to new cache
        localStorage.setItem(CACHE_KEY, legacy);
      }
    }
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveToCache(data) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify(data)); } catch { }
}

async function loadFromFile() {
  try {
    const res = await fetch(FILE_API);
    if (!res.ok) return { error: true };
    const text = await res.text();
    if (!text || text === 'null') return { empty: true };
    return { data: JSON.parse(text) };
  } catch { return { error: true }; }
}

async function saveToFile(data) {
  try {
    await fetch(FILE_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch {
    // File write failed, fallback to cache
  }
}

function flushBeacon(data) {
  try {
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    navigator.sendBeacon('/api/progress-beacon', blob);
  } catch { }
}

if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    // Always flush on page close — regardless of whether file was loaded.
    if (globalProgress) {
      if (saveTimer) clearTimeout(saveTimer);
      flushBeacon(globalProgress);
    }
  });
  // NOTE: No periodic setInterval here — it caused race conditions during
  // hot-reloads (the interval saved stale cache data over the real file).
  // The 500ms debounce in setGlobalProgress is reliable enough.
}

// ── Global State Initialisation ──────────────────────────────────────────────
// Read from localStorage ONLY for instant startup rendering.
// The real source of truth is always progress.json (fetched async below).
globalProgress = loadFromCache() || defaultState();

function setGlobalProgress(updater) {
  const next = typeof updater === 'function' ? updater(globalProgress) : updater;

  // Fill in any missing top-level keys with defaults (new schema fields),
  // but do NOT deep-merge defaults — that strips fields from nested objects
  // like vocabSeen entries that have SM-2 fields (interval, dueDate, etc.)
  const defaults = defaultState();
  const safeNext = { ...defaults };
  Object.keys(next).forEach(k => { safeNext[k] = next[k]; });
  globalProgress = safeNext;

  // Always write to localStorage (fast cache for next startup read)
  saveToCache(globalProgress);
  // Notify all React subscribers
  listeners.forEach(l => l(globalProgress));

  // Always write to file — no fileLoaded gate.
  // The server-side downgrade guard prevents accidental data loss:
  // if this state has less data than what's on disk, the server rejects it.
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    saveToFile(globalProgress);
  }, 500);
}
// Safe merge utility for progress JSON
// Deep merges objects (like completedLessons) but REPLACES arrays and primitives
function safeMerge(target, source) {
  if (typeof target !== 'object' || target === null) return source;
  if (typeof source !== 'object' || source === null) return target;

  const out = Array.isArray(target) ? [...target] : { ...target };
  Object.keys(source).forEach(key => {
    if (Array.isArray(source[key])) {
      // Arrays strictly overwrite
      out[key] = [...source[key]];
    } else if (typeof source[key] === 'object' && source[key] !== null) {
      // Objects deep merge
      out[key] = safeMerge(target[key] || {}, source[key]);
    } else {
      // Primitives strictly overwrite
      out[key] = source[key];
    }
  });
  return out;
}


// ── Hook ─────────────────────────────────────────────────────────────────────
export function useProgress() {
  const [progress, setProgressState] = useState(globalProgress);
  const [isLoaded, setIsLoaded] = useState(fileLoaded);

  useEffect(() => {
    // Subscribe to state changes
    const listener = (newProgress) => setProgressState(newProgress);
    listeners.add(listener);

    // Provide instant UI response using cache
    if (!fileLoaded && !fileFetchStarted) {
      fileFetchStarted = true;

      const attemptFetch = async () => {
        try {
          const result = await loadFromFile();
          if (result.error) {
            // Network error (server restarting) - retry in 1 second.
            setTimeout(attemptFetch, 1000);
            return;
          }

          if (result.data) {
            // Because caching can be stale, we take the server data, 
            // merge it OVER the defaults. We DO NOT merge cache over server.
            const cleanDefaults = defaultState();
            const merged = safeMerge(cleanDefaults, result.data);

            // Only update global reference and cache ONCE file has been read
            // File is always the absolute source of truth!
            globalProgress = merged;
            saveToCache(merged);

            // Push to listeners
            listeners.forEach(l => l(merged));
          } else {
            // If file was completely empty/missing, initialize it with defaults/cache
            const initialData = safeMerge(defaultState(), loadFromCache() || {});
            globalProgress = initialData;
            saveToFile(initialData);
          }

          fileLoaded = true;
          setIsLoaded(true);
        } catch (err) {
          setTimeout(attemptFetch, 1000);
        }
      };

      attemptFetch();
    } else if (fileLoaded) {
      setIsLoaded(true);
    }

    return () => listeners.delete(listener);
  }, []);

  const completeLesson = useCallback((lessonId, score, xpReward) => {
    setGlobalProgress((prev) => {
      const today = new Date().toISOString().slice(0, 10);
      const last = prev.lastStudyDate;
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      const newStreak = last === today ? prev.streak : (last === yesterday ? prev.streak + 1 : 1);

      const earnedXP = Math.round(xpReward * (score / 100));
      const dailyXP = [...(prev.dailyXP || [])];
      const todayEntry = dailyXP.find((d) => d.date === today);
      if (todayEntry) todayEntry.xp += earnedXP;
      else dailyXP.push({ date: today, xp: earnedXP });
      while (dailyXP.length > 30) dailyXP.shift();

      return {
        ...prev,
        xp: (prev.xp || 0) + earnedXP,
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
        // Clear midway state since it's now completed
        lessonStates: {
          ...prev.lessonStates,
          [lessonId]: null
        },
      };
    });
  }, []);

  const saveLessonState = useCallback((lessonId, stateProps) => {
    setGlobalProgress((prev) => ({
      ...prev,
      lessonStates: {
        ...prev.lessonStates,
        [lessonId]: {
          updatedAt: new Date().toISOString(),
          ...stateProps,
        },
      },
    }));
  }, []);

  // ── SM-2 Spaced Repetition ──────────────────────────────────────────────────
  // quality: 5=perfect, 4=correct, 3=correct with effort, 2=wrong+remembered, 1=wrong, 0=blackout
  const reviewVocab = useCallback((word, quality) => {
    setGlobalProgress((prev) => {
      const ex = prev.vocabSeen?.[word] || {
        seenCount: 0, wrongCount: 0,
        repetitions: 0, interval: 1, easeFactor: 2.5, dueDate: null, mastered: false,
      };

      let { repetitions, interval, easeFactor } = ex;

      if (quality >= 3) {
        // Correct answer — advance the schedule
        if (repetitions === 0) {
          interval = (quality === 5) ? 4 : 1;
        } else if (repetitions === 1) {
          interval = (quality === 5) ? 8 : 3;
        } else {
          // Standard SM-2 with slight bonus for quality=5
          const bonus = quality === 5 ? 1.3 : (quality === 4 ? 1.0 : 0.8);
          interval = Math.round(interval * easeFactor * bonus);
        }
        repetitions += 1;
      } else {
        // Wrong answer — reset to relearn
        repetitions = 0;
        interval = 1;
      }

      // Update ease factor (clamp to minimum 1.3)
      easeFactor = Math.max(1.3, easeFactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

      const dueDate = new Date(Date.now() + interval * 86400000).toISOString().slice(0, 10);
      const mastered = repetitions >= 3 && interval >= 6;

      return {
        ...prev,
        vocabSeen: {
          ...prev.vocabSeen,
          [word]: {
            ...ex,
            seenCount: ex.seenCount + 1,
            wrongCount: ex.wrongCount + (quality < 3 ? 1 : 0),
            lastSeen: new Date().toISOString(),
            repetitions,
            interval,
            easeFactor: Math.round(easeFactor * 100) / 100,
            dueDate,
            mastered,
          },
        },
      };
    });
  }, []);

  // Legacy wrappers kept so existing callers don't break
  const markVocabSeen = useCallback((word, correct = true) => reviewVocab(word, correct ? 4 : 1), [reviewVocab]);
  const markVocabWrong = useCallback((word) => reviewVocab(word, 1), [reviewVocab]);

  const trackGrammarCard = useCallback((ruleKey) => {
    if (!ruleKey) return;
    setGlobalProgress((prev) => {
      const existing = prev.grammarSeen?.[ruleKey] || { viewCount: 0 };
      return {
        ...prev,
        grammarSeen: {
          ...(prev.grammarSeen || {}),
          [ruleKey]: {
            viewCount: existing.viewCount + 1,
            lastSeen: new Date().toISOString(),
          },
        },
      };
    });
  }, []);

  const saveConversationPhrases = useCallback((phrases) => {
    setGlobalProgress((prev) => ({
      ...prev,
      conversationPhrases: [
        ...(prev.conversationPhrases || []),
        ...phrases,
      ],
    }));
  }, []);

  const completeStory = useCallback((storyId, storyTitle, quizScore, savedWordList) => {
    setGlobalProgress((prev) => {
      const today = new Date().toISOString().slice(0, 10);
      const xpEarned = 15 + Math.round(quizScore * 10);
      const dailyXP = [...(prev.dailyXP || [])];
      const todayEntry = dailyXP.find(d => d.date === today);
      if (todayEntry) todayEntry.xp += xpEarned;
      else dailyXP.push({ date: today, xp: xpEarned });
      while (dailyXP.length > 30) dailyXP.shift();

      const newWords = (savedWordList || []).map(w => ({
        ...w, storyId, storyTitle, savedAt: new Date().toISOString(),
      }));
      const existing = prev.readingVocab || [];
      const merged = [
        ...existing.filter(e => !newWords.some(n => n.de === e.de && n.storyId === e.storyId)),
        ...newWords,
      ];

      return {
        ...prev,
        xp: (prev.xp || 0) + xpEarned,
        dailyXP,
        storiesRead: {
          ...(prev.storiesRead || {}),
          [storyId]: { completedAt: new Date().toISOString(), quizScore, wordsAdded: savedWordList?.length || 0 },
        },
        readingVocab: merged,
      };
    });
  }, []);

  const completePassiveSession = useCallback((minutes) => {
    setGlobalProgress((prev) => {
      const today = new Date().toISOString().slice(0, 10);
      const xpEarned = Math.round(minutes * 2);
      const dailyXP = [...(prev.dailyXP || [])];
      const todayEntry = dailyXP.find(d => d.date === today);
      if (todayEntry) todayEntry.xp += xpEarned;
      else dailyXP.push({ date: today, xp: xpEarned });
      while (dailyXP.length > 30) dailyXP.shift();

      const last = prev.lastStudyDate;
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      const newStreak = last === today ? prev.streak : (last === yesterday ? prev.streak + 1 : 1);

      return {
        ...prev,
        xp: (prev.xp || 0) + xpEarned,
        streak: newStreak,
        lastStudyDate: today,
        dailyXP,
        passiveSessions: [
          ...(prev.passiveSessions || []),
          { date: today, minutes, xpEarned },
        ],
      };
    });
  }, []);

  const completePassiveDay = useCallback((dayNum, minutes) => {
    setGlobalProgress((prev) => {
      const existingDays = prev.passiveCompletedDays || [];
      if (existingDays.includes(dayNum)) return prev;

      const today = new Date().toISOString().slice(0, 10);
      const xpEarned = Math.round(minutes * 2);
      const dailyXP = [...(prev.dailyXP || [])];
      const todayEntry = dailyXP.find(d => d.date === today);
      if (todayEntry) todayEntry.xp += xpEarned;
      else dailyXP.push({ date: today, xp: xpEarned });
      while (dailyXP.length > 30) dailyXP.shift();

      const last = prev.lastStudyDate;
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      const newStreak = last === today ? prev.streak : (last === yesterday ? prev.streak + 1 : 1);

      return {
        ...prev,
        passiveCompletedDays: [...existingDays, dayNum],
        xp: (prev.xp || 0) + xpEarned,
        streak: newStreak,
        lastStudyDate: today,
        dailyXP,
        passiveSessions: [
          ...(prev.passiveSessions || []),
          { date: today, minutes, xpEarned, dayNum },
        ],
      };
    });
  }, []);

  const saveGrammarAiMemory = useCallback((ruleId, seenIndices) => {
    setGlobalProgress((prev) => ({
      ...prev,
      grammarAiSeen: {
        ...(prev.grammarAiSeen || {}),
        [ruleId]: seenIndices,
      },
    }));
  }, []);

  const clearGrammarAiMemory = useCallback((ruleId) => {
    setGlobalProgress((prev) => {
      const next = { ...prev };
      if (next.grammarAiSeen) {
        next.grammarAiSeen = { ...next.grammarAiSeen };
        delete next.grammarAiSeen[ruleId];
      }
      return next;
    });
  }, []);

  const addCustomVocab = useCallback((de, sk, example = '') => {
    setGlobalProgress((prev) => ({
      ...prev,
      customVocab: [
        ...(prev.customVocab || []),
        { de, sk, example, addedAt: new Date().toISOString() }
      ],
    }));
  }, []);

  const saveGeneratedGrammarCard = useCallback((word, cardData) => {
    setGlobalProgress((prev) => ({
      ...prev,
      generatedWords: {
        ...(prev.generatedWords || {}),
        [word]: cardData,
      },
    }));
  }, []);

  const saveSmartTutorSession = useCallback((sessionData) => {
    setGlobalProgress((prev) => ({
      ...prev,
      smartTutorHistory: [
        { ...sessionData, savedAt: new Date().toISOString() },
        ...(prev.smartTutorHistory || []),
      ].slice(0, 50), // Keep the latest 50 sessions
    }));
  }, []);

  const resetLesson = useCallback((lessonId) => {
    setGlobalProgress((prev) => {
      const newCompleted = { ...prev.completedLessons };
      delete newCompleted[lessonId];
      const newLessonTests = { ...(prev.lessonTests || {}) };
      delete newLessonTests[lessonId];
      const newLessonStates = { ...(prev.lessonStates || {}) };
      delete newLessonStates[lessonId];
      // Recalculate XP: subtract what was earned for this lesson
      const prevEntry = prev.completedLessons?.[lessonId];
      const xpToRemove = prevEntry?.xpEarned || 0;
      return {
        ...prev,
        xp: Math.max(0, (prev.xp || 0) - xpToRemove),
        completedLessons: newCompleted,
        lessonTests: newLessonTests,
        lessonStates: newLessonStates,
      };
    });
  }, []);

  const resetProgress = useCallback(() => {
    const fresh = defaultState();
    setGlobalProgress(fresh);
  }, []);

  const isLessonCompleted = useCallback((lessonId) => !!progress.completedLessons?.[lessonId], [progress]);
  const getLessonScore = useCallback((lessonId) => progress.completedLessons?.[lessonId]?.score ?? null, [progress]);
  const getTotalVocabMastered = useCallback(() =>
    Object.values(progress.vocabSeen || {}).filter((v) => v.mastered).length, [progress]);

  const completeWeeklyTest = useCallback((weekNum, score) => {
    setGlobalProgress((prev) => ({
      ...prev,
      weeklyTests: {
        ...(prev.weeklyTests || {}),
        [weekNum]: { score, passed: score >= 60, completedAt: new Date().toISOString() },
      },
    }));
  }, []);

  const completeLessonTest = useCallback((lessonId, score) => {
    setGlobalProgress((prev) => ({
      ...prev,
      lessonTests: {
        ...(prev.lessonTests || {}),
        [lessonId]: { score, completedAt: new Date().toISOString() },
      },
    }));
  }, []);

  const completePlacementTest = useCallback((unlockedUpTo) => {
    setGlobalProgress((prev) => ({
      ...prev,
      placementTestDone: true,
      placementUnlockedUpTo: unlockedUpTo,
    }));
  }, []);

  return {
    progress,
    fileLoaded: isLoaded,
    completeLesson,
    markVocabSeen,
    markVocabWrong,
    reviewVocab,
    trackGrammarCard,
    completePassiveSession,
    completePassiveDay,
    saveGrammarAiMemory,
    clearGrammarAiMemory,
    saveConversationPhrases,
    resetProgress,
    resetLesson,
    isLessonCompleted,
    getLessonScore,
    getTotalVocabMastered,
    completeWeeklyTest,
    completeLessonTest,
    completePlacementTest,
    saveLessonState,
    addCustomVocab,
    completeStory,
    saveGeneratedGrammarCard,
    saveSmartTutorSession,
  };
}
