// ==========================================================
// flashcards.js — Flashcard modal
// ==========================================================

function openFlashcards(cards, title) {
  if (!cards || cards.length === 0) return;

  let idx = 0;
  let flipped = false;
  let knownCount = 0;

  const modal = document.getElementById('flashcard-modal');
  const modalBox = modal.querySelector('.modal-box');

  modal.classList.remove('hidden');

  function render() {
    const card = cards[idx];
    const pct = Math.round((idx / cards.length) * 100);
    modalBox.innerHTML = `
      <div class="fc-header">
        <h3><i class="fa-solid fa-layer-group"></i> ${title || 'Flashkarty'}</h3>
        <button class="modal-close" id="fc-close-btn"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="fc-progress-row">
        <span>${idx + 1} / ${cards.length}</span>
        <div class="fc-progress-bar-wrap"><div class="fc-progress-bar" style="width:${pct}%"></div></div>
        <span><i class="fa-solid fa-check" style="color:#10b981"></i> ${knownCount}</span>
      </div>
      <div class="flashcard ${flipped ? 'flipped' : ''}" id="fc-card">
        <div class="fc-face fc-front">
          <div class="fc-label">Nemčina</div>
          <div class="fc-main-text">${card.front}</div>
          ${card.note ? `<div class="fc-note">${card.note}</div>` : ''}
          <div class="fc-hint">Klikni na kartu pre preklad</div>
        </div>
        <div class="fc-face fc-back">
          <div class="fc-label">Slovenčina</div>
          <div class="fc-main-text sk-text">${card.back}</div>
          ${card.note ? `<div class="fc-note">${card.note}</div>` : ''}
          <button class="speak-btn fc-speak" onclick="speakGerman('${card.front.replace(/'/g,"\\'")}')"><i class="fa-solid fa-volume-high"></i> Vypočuť</button>
        </div>
      </div>
      <div class="fc-actions">
        <button class="btn btn-ghost" id="fc-prev" ${idx === 0 ? 'disabled' : ''}>
          <i class="fa-solid fa-arrow-left"></i> Späť
        </button>
        <div class="fc-know-btns" id="fc-know-wrap" style="display:${flipped ? 'flex' : 'none'}">
          <button class="btn fc-dont-know" id="fc-dk">
            <i class="fa-solid fa-rotate-right"></i> Ešte raz
          </button>
          <button class="btn fc-know" id="fc-k">
            <i class="fa-solid fa-check"></i> Viem!
          </button>
        </div>
        <button class="btn btn-primary" id="fc-next" ${idx >= cards.length - 1 && !flipped ? '' : ''}>
          Ďalej <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    `;

    // Wire events
    document.getElementById('fc-close-btn').onclick = closeFlashcards;
    document.getElementById('fc-card').onclick = flipCard;

    document.getElementById('fc-prev').onclick = () => {
      if (idx > 0) { idx--; flipped = false; render(); }
    };
    document.getElementById('fc-next').onclick = () => {
      if (idx < cards.length - 1) { idx++; flipped = false; render(); }
      else { closeFlashcards(); }
    };

    const dkBtn = document.getElementById('fc-dk');
    const kBtn = document.getElementById('fc-k');
    if (dkBtn) dkBtn.onclick = () => { idx++; if (idx >= cards.length) idx = 0; flipped = false; render(); };
    if (kBtn) kBtn.onclick = () => { knownCount++; idx++; flipped = false; if (idx >= cards.length) showComplete(); else render(); };
  }

  function flipCard() {
    flipped = !flipped;
    render();
  }

  function showComplete() {
    modalBox.innerHTML = `
      <div class="fc-header">
        <h3><i class="fa-solid fa-layer-group"></i> ${title || 'Flashkarty'}</h3>
        <button class="modal-close" id="fc-close-btn"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="fc-complete">
        <i class="fa-solid fa-star fc-star"></i>
        <h2>Hotovo!</h2>
        <p>Kárty dokončené: <strong>${cards.length}</strong></p>
        <p>Vedel/a si: <strong style="color:#10b981">${knownCount}</strong> z ${cards.length}</p>
        <div style="margin-top:20px;display:flex;gap:12px;justify-content:center">
          <button class="btn btn-primary" id="fc-restart"><i class="fa-solid fa-rotate-right"></i> Znova</button>
          <button class="btn btn-ghost" id="fc-c2"><i class="fa-solid fa-xmark"></i> Zatvoriť</button>
        </div>
      </div>
    `;
    document.getElementById('fc-close-btn').onclick = closeFlashcards;
    document.getElementById('fc-restart').onclick = () => { idx = 0; flipped = false; knownCount = 0; render(); };
    document.getElementById('fc-c2').onclick = closeFlashcards;
  }

  function closeFlashcards() {
    modal.classList.add('hidden');
  }

  // Close on backdrop click
  modal.onclick = (e) => { if (e.target === modal) closeFlashcards(); };

  render();
}
