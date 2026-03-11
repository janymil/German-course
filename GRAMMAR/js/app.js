// ==========================================================
// app.js — Main App Controller
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {
  buildSidebar();
  updateProgressUI();
  renderDashboard();
  wireEvents();
});

// ── Sidebar nav ──────────────────────────────────────────────
function buildSidebar() {
  const nav = document.getElementById('sidebar-nav');
  if (!nav) return;
  nav.innerHTML = '';

  // Dashboard link
  const dashItem = document.createElement('div');
  dashItem.className = 'nav-item nav-dashboard';
  dashItem.dataset.view = 'dashboard';
  dashItem.innerHTML = `<span class="nav-icon"><i class="fa-solid fa-house"></i></span><span class="nav-label">Domov</span>`;
  dashItem.onclick = () => { renderDashboard(); setActiveNav(dashItem); };
  nav.appendChild(dashItem);

  // Divider
  const divGrammar = document.createElement('div');
  divGrammar.className = 'nav-divider';
  divGrammar.textContent = 'Gramatika';
  nav.appendChild(divGrammar);

  // Lesson items
  (LESSONS || []).forEach(lesson => {
    const item = document.createElement('div');
    item.className = 'nav-item' + (isLessonComplete(lesson.id) ? ' completed' : '');
    item.dataset.lessonId = lesson.id;
    item.innerHTML = `
      <span class="nav-icon" style="color:${lesson.color}"><i class="fa-solid ${lesson.icon}"></i></span>
      <span class="nav-label">${lesson.title}</span>
      ${isLessonComplete(lesson.id) ? '<span class="nav-badge"><i class="fa-solid fa-check"></i></span>' : `<span class="nav-num">${lesson.num}</span>`}
    `;
    item.onclick = () => {
      renderLesson(lesson);
      setActiveNav(item);
      closeMobileSidebar();
    };
    nav.appendChild(item);
  });

  // Divider
  const divExtra = document.createElement('div');
  divExtra.className = 'nav-divider';
  divExtra.textContent = 'Prax';
  nav.appendChild(divExtra);

  // Chunking link
  const chunkItem = document.createElement('div');
  chunkItem.className = 'nav-item';
  chunkItem.dataset.view = 'chunks';
  chunkItem.innerHTML = `<span class="nav-icon" style="color:#10b981"><i class="fa-solid fa-message"></i></span><span class="nav-label">Chunking vety</span>`;
  chunkItem.onclick = () => { renderChunking(); setActiveNav(chunkItem); closeMobileSidebar(); };
  nav.appendChild(chunkItem);
}

function setActiveNav(el) {
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  if (el) el.classList.add('active');
}

// ── Dashboard ────────────────────────────────────────────────
function renderDashboard() {
  const main = document.getElementById('main-content');
  const p = getProgress();
  const total = LESSONS.length;
  const done = Object.values(p).filter(v => v.completed).length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  setBreadcrumb('Domov');
  setActiveNav(document.querySelector('.nav-dashboard'));

  main.innerHTML = `
    <div class="dashboard-hero">
      <div class="dash-hero-text">
        <h1>Vitaj v German A1</h1>
        <p>Kompletný kurz nemeckej gramatiky pre úplných začiatočníkov. Všetky lekcie, cvičenia, flashkarty – v slovenčine.</p>
        <div class="stats-row">
          <div class="stat-card">
            <div class="stat-num">${done}</div>
            <div class="stat-label">Dokončené</div>
          </div>
          <div class="stat-card">
            <div class="stat-num">${total - done}</div>
            <div class="stat-label">Zostatok</div>
          </div>
          <div class="stat-card">
            <div class="stat-num">${pct}%</div>
            <div class="stat-label">Pokrok</div>
          </div>
          <div class="stat-card">
            <div class="stat-num">14</div>
            <div class="stat-label">Lekcií celkom</div>
          </div>
        </div>
      </div>
      <div class="dash-hero-art">
        <div class="dash-circle">A1</div>
      </div>
    </div>

    <div class="dash-section-title">Gramatické lekcie</div>
    <div class="lessons-grid" id="lessons-grid"></div>

    <div class="dash-section-title" style="margin-top:40px">Rýchly prístup</div>
    <div class="quick-access-row">
      <button class="qa-btn" id="qa-chunks">
        <i class="fa-solid fa-message"></i>
        <span>Chunking vety</span>
        <small>216 praktických viet</small>
      </button>
      <button class="qa-btn" id="qa-random-ex">
        <i class="fa-solid fa-shuffle"></i>
        <span>Náhodné cvičenie</span>
        <small>Precvič náhodne</small>
      </button>
    </div>
  `;

  const grid = document.getElementById('lessons-grid');
  LESSONS.forEach(lesson => {
    const comp = isLessonComplete(lesson.id);
    const sc = getLessonScore(lesson.id);
    const card = document.createElement('div');
    card.className = 'lesson-card' + (comp ? ' completed' : '');
    card.style.setProperty('--card-color', lesson.color);
    card.style.setProperty('--card-color-bg', lesson.colorBg);
    card.innerHTML = `
      <div class="lc-icon"><i class="fa-solid ${lesson.icon}"></i></div>
      <div class="lc-num">Lekcia ${lesson.num}</div>
      <div class="lc-title">${lesson.title}</div>
      <div class="lc-sub">${lesson.subtitle}</div>
      <div class="lc-meta">
        <span><i class="fa-regular fa-clock"></i> ~${lesson.estimatedMinutes} min</span>
        ${comp ? '<span class="lc-done"><i class="fa-solid fa-check"></i> Dokončená</span>' : ''}
        ${sc.best > 0 ? `<span class="lc-score">Najlepšie: ${sc.best}/${sc.total > 0 ? sc.total : '?'}</span>` : ''}
      </div>
    `;
    card.onclick = () => {
      renderLesson(lesson);
      const navItem = document.querySelector(`.nav-item[data-lesson-id="${lesson.id}"]`);
      setActiveNav(navItem);
    };
    grid.appendChild(card);
  });

  document.getElementById('qa-chunks').onclick = () => {
    renderChunking();
    const navItem = document.querySelector('.nav-item[data-view="chunks"]');
    setActiveNav(navItem);
  };

  document.getElementById('qa-random-ex').onclick = () => {
    const ids = Object.keys(EXERCISES);
    const randomId = ids[Math.floor(Math.random() * ids.length)];
    renderExercises(randomId);
  };

  main.scrollTop = 0;
}

// ── Chunking ─────────────────────────────────────────────────
function renderChunking() {
  const main = document.getElementById('main-content');
  setBreadcrumb('Chunking vety');

  const cats = CHUNKS || [];
  let activeCat = cats[0] ? cats[0].id : null;

  main.innerHTML = `
    <div class="chunking-view">
      <div class="chunk-header">
        <h1><i class="fa-solid fa-message"></i> Chunking vety</h1>
        <p>Praktické nemecké vety rozdelené do kategórií. Klikni na vetu pre výslovnosť. Zapni <strong>Režim štúdia</strong> v paneli hore pre skrytie slovenských prekladov.</p>
      </div>
      <div class="chunk-cats" id="chunk-cats"></div>
      <div class="chunk-search-row">
        <input type="text" id="chunk-search" class="chunk-search-input" placeholder="Hľadaj vetu po nemecky alebo slovensky...">
      </div>
      <div class="chunk-cards-grid" id="chunk-cards"></div>
    </div>
  `;

  const catWrap = document.getElementById('chunk-cats');
  cats.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'chunk-cat-btn' + (cat.id === activeCat ? ' active' : '');
    btn.style.setProperty('--cat-color', cat.color);
    btn.innerHTML = `<i class="fa-solid ${cat.icon}"></i> ${cat.label}`;
    btn.onclick = () => {
      activeCat = cat.id;
      catWrap.querySelectorAll('.chunk-cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCards(activeCat, '');
      document.getElementById('chunk-search').value = '';
    };
    catWrap.appendChild(btn);
  });

  document.getElementById('chunk-search').addEventListener('input', (e) => {
    renderCards(activeCat, e.target.value.trim().toLowerCase());
  });

  function renderCards(catId, search) {
    const grid = document.getElementById('chunk-cards');
    grid.innerHTML = '';
    const cat = cats.find(c => c.id === catId);
    if (!cat) return;

    const items = search
      ? cat.items.filter(i => i.de.toLowerCase().includes(search) || i.sk.toLowerCase().includes(search))
      : cat.items;

    if (items.length === 0) {
      grid.innerHTML = `<div class="chunk-empty">Žiadne výsledky pre „${search}"</div>`;
      return;
    }

    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'chunk-card';
      card.style.setProperty('--cat-color', cat.color);
      card.innerHTML = `
        <div class="chunk-de">
          <button class="speak-btn" onclick="speakGerman('${item.de.replace(/'/g,"\\'")}')"><i class="fa-solid fa-volume-high"></i></button>
          <span>${highlightSearch(item.de, search)}</span>
        </div>
        <div class="chunk-sk sk-text">${highlightSearch(item.sk, search)}</div>
      `;
      grid.appendChild(card);
    });
  }

  renderCards(activeCat, '');
  main.scrollTop = 0;
}

function highlightSearch(text, search) {
  if (!search) return text;
  const re = new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`, 'gi');
  return text.replace(re, '<mark>$1</mark>');
}

// ── Events ───────────────────────────────────────────────────
function wireEvents() {
  // Study mode toggle
  const studyCheck = document.getElementById('study-checkbox');
  if (studyCheck) {
    studyCheck.addEventListener('change', () => {
      document.body.classList.toggle('study-mode', studyCheck.checked);
    });
  }

  // Reset progress
  const resetBtn = document.getElementById('reset-progress-btn');
  if (resetBtn) {
    resetBtn.onclick = () => {
      if (confirm('Naozaj chceš vymazať všetok pokrok? Táto akcia sa nedá vrátiť.')) {
        resetProgress();
        buildSidebar();
        renderDashboard();
      }
    };
  }

  // Mobile menu
  const menuBtn = document.getElementById('mobile-menu-btn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (menuBtn && sidebar) {
    menuBtn.onclick = () => {
      sidebar.classList.toggle('open');
      if (overlay) overlay.classList.toggle('visible');
    };
  }
  if (overlay) {
    overlay.onclick = closeMobileSidebar;
  }

  // Keyboard: Escape closes modals
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal:not(.hidden)').forEach(m => m.classList.add('hidden'));
    }
  });
}

function closeMobileSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('visible');
}

function setBreadcrumb(text) {
  const bc = document.getElementById('topbar-breadcrumb');
  if (bc) bc.textContent = text;
}
