// ==========================================================
// artikelGame.js — Interaktívna sekcia pre lekciu Členy (Rody)
// Tabs: Učenie hrou | Ťahák | Výzva
// ==========================================================

(function() {

// ── Data ────────────────────────────────────────────────────

const learningSteps = [
  {
    id: 1, icon: '🧸', article: 'das', color: 'green',
    title: 'Zázračné zdrobneniny',
    description: 'Akékoľvek slovo, ktoré sa končí na <strong>-chen</strong> alebo <strong>-lein</strong>, je <em>vždy</em> stredného rodu. Áno, aj keď označuje dievča!',
    practiceWords: [
      { word: 'Mädchen', translation: 'dievča' },
      { word: 'Brötchen', translation: 'žemľa' }
    ]
  },
  {
    id: 2, icon: '🗓️', article: 'der', color: 'blue',
    title: 'Čas plynie s Der',
    description: 'Dni v týždni, mesiace a ročné obdobia sú (takmer) všetky mužského rodu.',
    practiceWords: [
      { word: 'Montag', translation: 'pondelok' },
      { word: 'Sommer', translation: 'leto' }
    ]
  },
  {
    id: 3, icon: '✨', article: 'die', color: 'red',
    title: 'Kúzelná koncovka -ung',
    description: 'Slová, ktoré sa končia na <strong>-ung</strong>, sú na 100 % ženského rodu. Toto pravidlo ti zachráni krk veľmi často!',
    practiceWords: [
      { word: 'Wohnung', translation: 'byt' },
      { word: 'Zeitung', translation: 'noviny' }
    ]
  },
  {
    id: 4, icon: '🏎️', article: 'der', color: 'blue',
    title: 'Autá a Motoristi',
    description: 'Značky áut a slová končiace na <strong>-or</strong> (zvyčajne stroje alebo ľudia) sú mužského rodu.',
    practiceWords: [
      { word: 'Audi', translation: 'značka auta' },
      { word: 'Motor', translation: 'motor' }
    ]
  },
  {
    id: 5, icon: '💡', article: 'die', color: 'red',
    title: 'Abstrakcia a Vlastnosti',
    description: 'Slová končiace na <strong>-heit</strong> alebo <strong>-keit</strong> (vlastnosti, abstraktné veci) sú vždy ženského rodu.',
    practiceWords: [
      { word: 'Freiheit', translation: 'sloboda' },
      { word: 'Möglichkeit', translation: 'možnosť' }
    ]
  },
  {
    id: 6, icon: '🌍', article: 'das', color: 'green',
    title: 'Cudzie slová na -um',
    description: 'Slová pochádzajúce z latinčiny, ktoré končia na <strong>-um</strong>, sú stredného rodu.',
    practiceWords: [
      { word: 'Museum', translation: 'múzeum' },
      { word: 'Zentrum', translation: 'centrum' }
    ]
  }
];

const comprehensiveRules = [
  {
    id: 'der', article: 'Der', title: 'Mužský rod', sub: 'Maskulinum', color: 'blue',
    categories: [
      { icon: '👨', name: 'Mužské roly',       desc: 'Osoby a zvieratá mužského pohlavia',    ex: 'der Vater, der Hund' },
      { icon: '🗓️', name: 'Čas a Kalendár',   desc: 'Dni, mesiace, ročné obdobia',          ex: 'der Montag, der Mai' },
      { icon: '🌦️', name: 'Počasie a Smery',  desc: 'Zrážky, vetry, svetové strany',        ex: 'der Regen, der Süden' },
      { icon: '🏎️', name: 'Autá a Vlaky',     desc: 'Väčšina značiek vozidiel',             ex: 'der BMW, der ICE' },
      { icon: '🍺', name: 'Alkohol',           desc: 'Všetok okrem piva (das Bier)',         ex: 'der Wein, der Schnaps' }
    ],
    suffixes: [
      { ext: '-ent',   ex: 'der Student' },
      { ext: '-ling',  ex: 'der Schmetterling' },
      { ext: '-ich',   ex: 'der Teppich' },
      { ext: '-ig',    ex: 'der Honig' },
      { ext: '-er',    ex: 'der Lehrer' },
      { ext: '-ismus', ex: 'der Buddhismus' },
      { ext: '-or',    ex: 'der Motor' }
    ]
  },
  {
    id: 'die', article: 'Die', title: 'Ženský rod', sub: 'Femininum', color: 'red',
    categories: [
      { icon: '🌸', name: 'Príroda',           desc: 'Stromy, kvety, väčšina ovocia',        ex: 'die Rose, die Eiche' },
      { icon: '🚢', name: 'Doprava',           desc: 'Lode, motorky, lietadlá',              ex: 'die Titanic, die Yamaha' },
      { icon: '🔢', name: 'Čísla',             desc: 'Základné číslovky ako podstatné mená', ex: 'die Eins, die Million' },
      { icon: '👩', name: 'Ženské roly',       desc: 'Osoby a zvieratá ženského pohlavia',   ex: 'die Mutter, die Kuh' }
    ],
    suffixes: [
      { ext: '-schaft', ex: 'die Mannschaft' },
      { ext: '-heit',   ex: 'die Freiheit' },
      { ext: '-keit',   ex: 'die Freundlichkeit' },
      { ext: '-tät',    ex: 'die Qualität' },
      { ext: '-anz',    ex: 'die Toleranz' },
      { ext: '-ion',    ex: 'die Religion' },
      { ext: '-ie',     ex: 'die Biologie' },
      { ext: '-ung',    ex: 'die Regierung' },
      { ext: '-ik',     ex: 'die Musik' },
      { ext: '-e',      ex: 'die Lampe (≈90 %)' }
    ]
  },
  {
    id: 'das', article: 'Das', title: 'Stredný rod', sub: 'Neutrum', color: 'green',
    categories: [
      { icon: '🎨', name: 'Farby',             desc: 'Všetky farby ako podstatné mená',      ex: 'das Blau, das Rot' },
      { icon: '👶', name: 'Mláďatá a Deti',   desc: 'Mladé zvieratá a osoby',               ex: 'das Kind, das Kalb' },
      { icon: '🏃', name: 'Slovesá / Príd. mená', desc: 'Ak sa použijú ako podstatné meno', ex: 'das Essen, das Gute' },
      { icon: '🧪', name: 'Materiály a Kovy', desc: 'Prvky, kovy, chemikálie',              ex: 'das Gold, das Eisen' },
      { icon: '🔤', name: 'Písmená a Jazyky', desc: 'Keď sa o nich hovorí',                 ex: 'das A, das Slowakische' },
      { icon: '🍕', name: 'Zlomky',           desc: 'Tretina, štvrtina, atď.',              ex: 'das Drittel' }
    ],
    suffixes: [
      { ext: '-chen/-lein', ex: 'das Mädchen — vždy!' },
      { ext: '-ment',       ex: 'das Instrument' },
      { ext: '-um',         ex: 'das Museum' },
      { ext: '-ma',         ex: 'das Thema' },
      { ext: '-o',          ex: 'das Auto, das Kino' }
    ]
  }
];

// Flatten all words for the quiz
const allQuizWords = learningSteps.flatMap(s =>
  s.practiceWords.map(pw => ({ word: pw.word, translation: pw.translation, article: s.article }))
);

// ── State factory ────────────────────────────────────────────
function makeState() {
  return {
    activeTab: 'learn',
    // learn
    stepIndex: 0,
    completedWords: [],
    wrongAttempt: null,
    wrongTimer: null,
    // quiz
    quizWords: [],
    quizIndex: 0,
    quizScore: 0,
    quizActive: false,
    quizFinished: false,
    quizAnswered: false,
    lastCorrect: null
  };
}

// ── Mount ────────────────────────────────────────────────────
function mountArtikelGame(container) {
  const state = makeState();

  // Wrapper
  const wrap = document.createElement('div');
  wrap.className = 'ag-wrap';
  wrap.innerHTML = `
    <div class="ag-hero">
      <div class="ag-hero-icon">🇩🇪</div>
      <h2 class="ag-hero-title">Der, Die, Das – Interaktívne</h2>
      <p class="ag-hero-sub">Zabudni na bifľovanie. Odhaj tajné vzorce nemeckých členov krok za krokom.</p>
    </div>
    <nav class="ag-tabs">
      <button class="ag-tab ag-tab--active" data-tab="learn">🎮 Učenie hrou</button>
      <button class="ag-tab" data-tab="cheat">📜 Ťahák</button>
      <button class="ag-tab" data-tab="quiz">🏆 Výzva</button>
    </nav>
    <div class="ag-panel" id="ag-panel"></div>
  `;
  container.appendChild(wrap);

  // Tab click
  wrap.querySelectorAll('.ag-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeTab = btn.dataset.tab;
      wrap.querySelectorAll('.ag-tab').forEach(b => b.classList.remove('ag-tab--active'));
      btn.classList.add('ag-tab--active');
      renderPanel();
    });
  });

  function renderPanel() {
    const panel = wrap.querySelector('#ag-panel');
    panel.innerHTML = '';
    if (state.activeTab === 'learn') renderLearn(panel);
    else if (state.activeTab === 'cheat') renderCheat(panel);
    else renderQuiz(panel);
  }

  // ── LEARN ────────────────────────────────────────────────
  function renderLearn(panel) {
    const step = learningSteps[state.stepIndex];
    if (!step) return;

    const pct = Math.round((state.stepIndex / learningSteps.length) * 100);

    const html = `
      <div class="ag-learn">
        <div class="ag-progress-row">
          <span class="ag-progress-label">Lekcia ${state.stepIndex + 1} / ${learningSteps.length}</span>
          <div class="ag-progress-track"><div class="ag-progress-fill" style="width:${pct}%"></div></div>
        </div>

        <div class="ag-step-card ag-step-card--${step.color}">
          <div class="ag-step-header ag-step-header--${step.color}">
            <div class="ag-step-icon">${step.icon}</div>
            <h3 class="ag-step-title">${step.title}</h3>
            <p class="ag-step-desc">${step.description}</p>
          </div>

          <div class="ag-practice">
            <div class="ag-practice-label">Vyskúšaj si to v praxi:</div>
            <div class="ag-words-list" id="ag-words-list"></div>
            <div class="ag-next-wrap" id="ag-next-wrap" style="display:none">
              <button class="ag-next-btn" id="ag-next-btn">
                ${state.stepIndex < learningSteps.length - 1 ? 'Paráda, ideme ďalej! ➔' : 'Skvelé! Poďme na výzvu 🏆'}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    panel.innerHTML = html;

    renderWords(panel, step);

    panel.querySelector('#ag-next-btn')?.addEventListener('click', () => {
      if (state.stepIndex < learningSteps.length - 1) {
        state.stepIndex++;
        state.completedWords = [];
        state.wrongAttempt = null;
        renderPanel();
      } else {
        // Switch to quiz
        state.activeTab = 'quiz';
        wrap.querySelectorAll('.ag-tab').forEach(b => b.classList.remove('ag-tab--active'));
        wrap.querySelector('[data-tab="quiz"]').classList.add('ag-tab--active');
        startQuiz();
        renderPanel();
      }
    });
  }

  function renderWords(panel, step) {
    const list = panel.querySelector('#ag-words-list');
    list.innerHTML = '';

    step.practiceWords.forEach(item => {
      const done = state.completedWords.includes(item.word);
      const isWrong = state.wrongAttempt?.word === item.word;

      const row = document.createElement('div');
      row.className = `ag-word-row ${done ? 'ag-word-row--done ag-word-row--done-' + step.color : ''} ${isWrong ? 'ag-word-row--error' : ''}`;
      row.innerHTML = `
        <div class="ag-word-info">
          ${done ? `<span class="ag-word-check ag-check--${step.color}">✓</span>` : ''}
          <span class="ag-word-de">${item.word}</span>
          <span class="ag-word-sk">(${item.translation})</span>
        </div>
        ${done
          ? `<div class="ag-article-badge ag-badge--${step.color}">${step.article}</div>`
          : `<div class="ag-article-btns">
               ${['der','die','das'].map(art => `
                 <button class="ag-art-btn ${isWrong && state.wrongAttempt?.article === art ? 'ag-art-btn--shake' : ''}" data-art="${art}" data-word="${item.word}">${art}</button>
               `).join('')}
             </div>`
        }
      `;
      list.appendChild(row);
    });

    // Bind buttons
    list.querySelectorAll('.ag-art-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const word = btn.dataset.word;
        const art = btn.dataset.art;
        if (state.completedWords.includes(word)) return;

        if (art === step.article) {
          state.completedWords = [...state.completedWords, word];
          state.wrongAttempt = null;
          // Check if all done
          const allDone = step.practiceWords.every(pw => state.completedWords.includes(pw.word));
          renderWords(panel, step);
          if (allDone) {
            const nw = panel.querySelector('#ag-next-wrap');
            if (nw) nw.style.display = '';
          }
        } else {
          if (state.wrongTimer) clearTimeout(state.wrongTimer);
          state.wrongAttempt = { word, article: art };
          renderWords(panel, step);
          state.wrongTimer = setTimeout(() => {
            state.wrongAttempt = null;
            renderWords(panel, step);
          }, 900);
        }
      });
    });

    // Show/hide Next button
    const allDone = step.practiceWords.every(pw => state.completedWords.includes(pw.word));
    const nw = panel.querySelector('#ag-next-wrap');
    if (nw) nw.style.display = allDone ? '' : 'none';
  }

  // ── CHEAT SHEET ──────────────────────────────────────────
  function renderCheat(panel) {
    const wrap = document.createElement('div');
    wrap.className = 'ag-cheat';
    wrap.innerHTML = `
      <div class="ag-cheat-header">
        <h3 class="ag-cheat-title">Komplexná Mapa Pravidiel</h3>
        <p class="ag-cheat-sub">Všetky dôležité kategórie a koncovky vizuálne roztriedené.</p>
      </div>
      <div class="ag-cheat-grid">
        ${comprehensiveRules.map(rule => `
          <div class="ag-cheat-card ag-cheat-card--${rule.color}">
            <div class="ag-cheat-card-head ag-head--${rule.color}">
              <div class="ag-cheat-article">${rule.article}</div>
              <div class="ag-cheat-rod">${rule.title}</div>
              <div class="ag-cheat-sub2">${rule.sub}</div>
            </div>
            <div class="ag-cheat-body">
              <div class="ag-section-divider">
                <span class="ag-divider-line"></span>
                <span class="ag-divider-label">💡 Podľa Významu</span>
                <span class="ag-divider-line"></span>
              </div>
              <div class="ag-categories">
                ${rule.categories.map(cat => `
                  <div class="ag-cat-row">
                    <span class="ag-cat-icon">${cat.icon}</span>
                    <div class="ag-cat-info">
                      <div class="ag-cat-name">${cat.name}</div>
                      <div class="ag-cat-desc">${cat.desc}</div>
                      <div class="ag-cat-ex ag-cat-ex--${rule.color}">${cat.ex}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
              <div class="ag-section-divider" style="margin-top:20px">
                <span class="ag-divider-line"></span>
                <span class="ag-divider-label">🧩 Podľa Koncovky</span>
                <span class="ag-divider-line"></span>
              </div>
              <div class="ag-suffixes">
                ${rule.suffixes.map(suff => `
                  <div class="ag-suffix ag-suffix--${rule.color}">
                    <span class="ag-suffix-ext">${suff.ext}</span>
                    <span class="ag-suffix-ex">${suff.ex}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    panel.appendChild(wrap);
  }

  // ── QUIZ ─────────────────────────────────────────────────
  function startQuiz() {
    const shuffled = [...allQuizWords].sort(() => Math.random() - 0.5).slice(0, 10);
    state.quizWords = shuffled;
    state.quizIndex = 0;
    state.quizScore = 0;
    state.quizActive = true;
    state.quizFinished = false;
    state.quizAnswered = false;
    state.lastCorrect = null;
  }

  function renderQuiz(panel) {
    if (!state.quizActive && !state.quizFinished) {
      // Welcome Screen
      panel.innerHTML = `
        <div class="ag-quiz-welcome">
          <div class="ag-quiz-trophy">🏆</div>
          <h3 class="ag-quiz-welcome-title">Pripravený na výzvu?</h3>
          <p class="ag-quiz-welcome-sub">Otestuj si 10 náhodných slovíčok na základe pravidiel, ktoré si sa práve naučil.</p>
          <button class="ag-start-btn" id="ag-start-btn">Spustiť výzvu</button>
        </div>
      `;
      panel.querySelector('#ag-start-btn').addEventListener('click', () => {
        startQuiz();
        renderPanel();
      });
      return;
    }

    if (state.quizFinished) {
      const score = state.quizScore;
      const grade = score === 10 ? 'Absolútne dokonalé! Si majster nemeckých členov.' :
                    score >= 7  ? 'Skvelá práca! Pravidlá sa ti dostávajú pod kožu.' :
                    'Nevadí! Prejdi si znova Učenie hrou a skús to ešte raz.';
      const trophy = score === 10 ? '🎉' : score >= 7 ? '😊' : '💪';
      panel.innerHTML = `
        <div class="ag-quiz-result">
          <div class="ag-quiz-trophy">${trophy}</div>
          <h3 class="ag-quiz-result-title">Výzva dokončená!</h3>
          <div class="ag-quiz-score-circle">
            <span class="ag-score-num">${score}</span>
            <span class="ag-score-sep">/</span>
            <span class="ag-score-total">10</span>
          </div>
          <p class="ag-quiz-grade">${grade}</p>
          <button class="ag-start-btn" id="ag-retry-btn">🔄 Skúsiť znova</button>
        </div>
      `;
      panel.querySelector('#ag-retry-btn').addEventListener('click', () => {
        startQuiz();
        renderPanel();
      });
      return;
    }

    // Active quiz
    const current = state.quizWords[state.quizIndex];
    const pct = Math.round((state.quizIndex / 10) * 100);

    panel.innerHTML = `
      <div class="ag-quiz-active">
        <div class="ag-quiz-prog-bar-wrap">
          <div class="ag-quiz-prog-bar" style="width:${pct}%"></div>
        </div>
        <div class="ag-quiz-meta">
          <span class="ag-quiz-counter">${state.quizIndex + 1} / 10</span>
          <span class="ag-quiz-pts">Body: ${state.quizScore}</span>
        </div>
        <div class="ag-quiz-question">
          <div class="ag-quiz-prompt">Aké je toto slovo?</div>
          <div class="ag-quiz-word">${current.word}</div>
          <div class="ag-quiz-transl">(${current.translation})</div>
        </div>
        ${state.quizAnswered ? `
          <div class="ag-quiz-feedback ${state.lastCorrect ? 'ag-feedback--correct' : 'ag-feedback--wrong'}">
            ${state.lastCorrect
              ? `<span class="ag-fb-icon">✓</span> Správne! <strong>${current.article} ${current.word}</strong>`
              : `<span class="ag-fb-icon">✗</span> Správna odpoveď: <strong>${current.article} ${current.word}</strong>`
            }
          </div>
          <button class="ag-next-q-btn" id="ag-next-q">
            ${state.quizIndex < 9 ? 'Ďalšia otázka ➔' : 'Zobraziť výsledky 🏆'}
          </button>
        ` : `
          <div class="ag-quiz-btns">
            ${['der','die','das'].map(art => `
              <button class="ag-quiz-art-btn ag-qbtn--${art}" data-art="${art}">${art}</button>
            `).join('')}
          </div>
        `}
      </div>
    `;

    // Answer buttons
    if (!state.quizAnswered) {
      panel.querySelectorAll('.ag-quiz-art-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const chosen = btn.dataset.art;
          const correct = chosen === current.article;
          state.lastCorrect = correct;
          if (correct) state.quizScore++;
          state.quizAnswered = true;
          renderPanel();
        });
      });
    } else {
      panel.querySelector('#ag-next-q')?.addEventListener('click', () => {
        state.quizAnswered = false;
        state.lastCorrect = null;
        if (state.quizIndex < 9) {
          state.quizIndex++;
        } else {
          state.quizActive = false;
          state.quizFinished = true;
        }
        renderPanel();
      });
    }
  }

  // Initial render
  renderPanel();
}

// ── Public API ───────────────────────────────────────────────
window.mountArtikelGame = mountArtikelGame;

})();
