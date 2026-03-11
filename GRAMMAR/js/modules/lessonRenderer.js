// ==========================================================
// lessonRenderer.js — Renders a lesson object to DOM
// ==========================================================

function renderLesson(lesson) {
  const main = document.getElementById('main-content');
  main.innerHTML = '';

  const view = document.createElement('div');
  view.className = 'lesson-view';

  // ── Header ──────────────────────────────────────────────
  const header = document.createElement('div');
  header.className = 'lesson-header';
  header.style.setProperty('--lesson-color', lesson.color);
  header.style.setProperty('--lesson-color-bg', lesson.colorBg);
  header.innerHTML = `
    <div class="lesson-header-icon" style="background:${lesson.colorBg};color:${lesson.color}">
      <i class="fa-solid ${lesson.icon}"></i>
    </div>
    <div class="lesson-header-text">
      <div class="lesson-num">Lekcia ${lesson.num} z ${LESSONS.length}</div>
      <h1 class="lesson-title">${lesson.title}</h1>
      <p class="lesson-subtitle">${lesson.subtitle}</p>
      <div class="lesson-meta">
        <span class="pill pill-gold"><i class="fa-regular fa-clock"></i> ~${lesson.estimatedMinutes} min</span>
        ${isLessonComplete(lesson.id) ? '<span class="pill pill-green"><i class="fa-solid fa-check"></i> Dokončená</span>' : ''}
      </div>
    </div>
  `;
  view.appendChild(header);

  // ── Sections ─────────────────────────────────────────────
  lesson.sections.forEach(section => {
    const sec = document.createElement('section');
    sec.className = 'lesson-section';

    if (section.heading) {
      const h2 = document.createElement('h2');
      h2.className = 'sub-heading';
      h2.textContent = section.heading;
      sec.appendChild(h2);
    }

    section.blocks.forEach(block => {
      sec.appendChild(renderBlock(block));
    });

    view.appendChild(sec);
  });

  // ── Action buttons ────────────────────────────────────────
  const actions = document.createElement('div');
  actions.className = 'lesson-actions';

  const exBtn = document.createElement('button');
  exBtn.className = 'btn btn-primary';
  exBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Precvičiť lekciu';
  exBtn.onclick = () => {
    if (window.renderExercises) renderExercises(lesson.id);
  };
  actions.appendChild(exBtn);

  const fcBtn = document.createElement('button');
  fcBtn.className = 'btn btn-ghost';
  fcBtn.innerHTML = '<i class="fa-solid fa-layer-group"></i> Flashkarty';
  fcBtn.onclick = () => {
    const cards = buildFlashcardsFromLesson(lesson);
    if (window.openFlashcards) openFlashcards(cards, lesson.title);
  };
  actions.appendChild(fcBtn);

  if (!isLessonComplete(lesson.id)) {
    const doneBtn = document.createElement('button');
    doneBtn.className = 'btn btn-green';
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i> Označiť ako dokončenú';
    doneBtn.onclick = () => {
      markLessonComplete(lesson.id);
      doneBtn.remove();
      // Re-render header badge
      const badge = header.querySelector('.lesson-meta');
      if (badge && !badge.querySelector('.pill-green')) {
        badge.insertAdjacentHTML('beforeend', '<span class="pill pill-green"><i class="fa-solid fa-check"></i> Dokončená</span>');
      }
    };
    actions.appendChild(doneBtn);
  }

  view.appendChild(actions);

  // ── Artikel Game (only for the Členy lesson) ─────────────
  if (lesson.id === 'artikel' && window.mountArtikelGame) {
    const gameSection = document.createElement('section');
    gameSection.className = 'lesson-section';
    mountArtikelGame(gameSection);
    view.appendChild(gameSection);
  }

  main.appendChild(view);
  main.scrollTop = 0;
}

// ── Block renderers ─────────────────────────────────────────
function renderBlock(block) {
  switch (block.type) {
    case 'theory':      return makeTheory(block);
    case 'rule':        return makeCallout(block, 'rule-box');
    case 'tip':         return makeSimpleCallout(block, 'tip-box', 'fa-lightbulb', 'Tip');
    case 'warn':        return makeSimpleCallout(block, 'warn-box', 'fa-triangle-exclamation', 'Pozor');
    case 'info':        return makeSimpleCallout(block, 'info-box', 'fa-circle-info', 'Info');
    case 'table':       return makeTable(block);
    case 'examples':    return makeExamples(block);
    case 'compare-grid':return makeCompareGrid(block);
    case 'breakdown':   return makeBreakdown(block);
    default:            return document.createElement('div');
  }
}

function makeTheory(block) {
  const div = document.createElement('div');
  div.className = 'theory-block';
  div.innerHTML = block.html;
  return div;
}

function makeCallout(block, cls) {
  const box = document.createElement('div');
  box.className = cls;
  box.innerHTML = `<div class="callout-title">${block.title || ''}</div><div class="callout-body">${block.body || ''}</div>`;
  return box;
}

function makeSimpleCallout(block, cls, icon, label) {
  const box = document.createElement('div');
  box.className = cls;
  box.innerHTML = `<span class="callout-icon"><i class="fa-solid ${icon}"></i> ${label}:</span> ${block.text || ''}`;
  return box;
}

function cellVal(cell) {
  if (typeof cell === 'string') return { html: cell, cls: '' };
  if (cell && typeof cell === 'object') return { html: cell.text || '', cls: cell.cls || '' };
  return { html: '', cls: '' };
}

function makeTable(block) {
  const wrap = document.createElement('div');
  wrap.className = 'table-wrap';
  const tbl = document.createElement('table');
  tbl.className = 'grammar-table';

  if (block.headers && block.headers.length) {
    const thead = tbl.createTHead();
    const tr = thead.insertRow();
    block.headers.forEach(h => {
      const th = document.createElement('th');
      th.textContent = h;
      tr.appendChild(th);
    });
  }

  const tbody = tbl.createTBody();
  (block.rows || []).forEach(row => {
    const tr = tbody.insertRow();
    row.forEach(cell => {
      const { html, cls } = cellVal(cell);
      const td = tr.insertCell();
      if (cls) td.className = cls;
      td.innerHTML = html;
    });
  });

  wrap.appendChild(tbl);
  return wrap;
}

function makeExamples(block) {
  const grid = document.createElement('div');
  grid.className = 'examples-grid';
  (block.items || []).forEach(item => {
    const card = document.createElement('div');
    card.className = 'example-card';
    card.innerHTML = `
      <div class="ex-de">
        <button class="speak-btn" title="Vypočuť" onclick="speakGerman(this.dataset.text)" data-text="${item.de.replace(/"/g,'&quot;')}">
          <i class="fa-solid fa-volume-high"></i>
        </button>
        <span>${item.de}</span>
      </div>
      <div class="ex-sk sk-text">${item.sk}</div>
      ${item.note ? `<div class="ex-note">${item.note}</div>` : ''}
    `;
    grid.appendChild(card);
  });
  return grid;
}

function makeCompareGrid(block) {
  const grid = document.createElement('div');
  grid.className = 'compare-grid';
  (block.items || []).forEach(panel => {
    const side = document.createElement('div');
    side.className = 'compare-panel compare-' + (panel.side || 'neutral');
    side.innerHTML = `<div class="compare-title">${panel.title || ''}</div>`;
    (panel.entries || []).forEach(e => {
      side.innerHTML += `<div class="compare-entry"><i class="fa-solid ${e.icon}" style="color:${e.color}"></i> ${e.text}</div>`;
    });
    grid.appendChild(side);
  });
  return grid;
}

function makeBreakdown(block) {
  const wrap = document.createElement('div');
  wrap.className = 'breakdown-wrap';
  if (block.title) {
    const t = document.createElement('div');
    t.className = 'breakdown-title';
    t.textContent = block.title;
    wrap.appendChild(t);
  }
  const row = document.createElement('div');
  row.className = 'breakdown-row';
  (block.parts || []).forEach(part => {
    const p = document.createElement('div');
    p.className = 'breakdown-part breakdown-' + (part.type || 'default');
    p.innerHTML = `<span class="breakdown-word">${part.word}</span><span class="breakdown-label">${part.label}</span>`;
    row.appendChild(p);
  });
  wrap.appendChild(row);
  return wrap;
}

// ── Build flashcard deck from lesson examples ────────────────
function buildFlashcardsFromLesson(lesson) {
  const cards = [];
  lesson.sections.forEach(sec => {
    sec.blocks.forEach(block => {
      if (block.type === 'examples') {
        block.items.forEach(item => {
          cards.push({ front: item.de, back: item.sk, note: item.note });
        });
      }
    });
  });
  return cards;
}
