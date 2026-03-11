// ==========================================================
// progress.js — localStorage progress tracking
// ==========================================================

const PROGRESS_KEY = 'de_grammar_progress_v1';

function getProgress() {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {};
  } catch { return {}; }
}

function saveProgress(data) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
}

function markLessonComplete(lessonId) {
  const p = getProgress();
  if (!p[lessonId]) p[lessonId] = {};
  p[lessonId].completed = true;
  p[lessonId].completedAt = Date.now();
  saveProgress(p);
  updateProgressUI();
}

function saveLessonScore(lessonId, score, total) {
  const p = getProgress();
  if (!p[lessonId]) p[lessonId] = {};
  p[lessonId].lastScore = score;
  p[lessonId].lastTotal = total;
  p[lessonId].bestScore = Math.max(p[lessonId].bestScore || 0, score);
  saveProgress(p);
}

function isLessonComplete(lessonId) {
  return !!(getProgress()[lessonId] || {}).completed;
}

function getLessonScore(lessonId) {
  const d = (getProgress()[lessonId]) || {};
  return { best: d.bestScore || 0, last: d.lastScore || 0, total: d.lastTotal || 0 };
}

function resetProgress() {
  localStorage.removeItem(PROGRESS_KEY);
  updateProgressUI();
}

function updateProgressUI() {
  const p = getProgress();
  const total = (window.LESSONS || []).length;
  const done = Object.values(p).filter(v => v.completed).length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  const bar = document.getElementById('sidebar-progress-bar');
  const barPct = document.getElementById('sidebar-progress-pct');
  const doneDom = document.getElementById('sidebar-lessons-done');
  const totalDom = document.getElementById('sidebar-lessons-total');

  if (bar) bar.style.width = pct + '%';
  if (barPct) barPct.textContent = pct + '%';
  if (doneDom) doneDom.textContent = done;
  if (totalDom) totalDom.textContent = total;

  // Update nav item badges
  document.querySelectorAll('.nav-item[data-lesson-id]').forEach(el => {
    const id = el.dataset.lessonId;
    if (isLessonComplete(id)) {
      el.classList.add('completed');
    } else {
      el.classList.remove('completed');
    }
  });
}
