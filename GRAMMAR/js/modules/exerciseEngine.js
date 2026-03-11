// ==========================================================
// exerciseEngine.js — Renders and handles exercises
// ==========================================================

function renderExercises(lessonId) {
  const exData = (window.EXERCISES || {})[lessonId];
  const main = document.getElementById('main-content');

  if (!exData || exData.length === 0) {
    main.innerHTML = `<div class="lesson-view"><div class="info-box"><span class="callout-icon"><i class="fa-solid fa-circle-info"></i> Info:</span> Pre túto lekciu zatiaľ nie sú cvičenia.</div></div>`;
    return;
  }

  // Use all exercises in shuffled order
  const items = [...exData].sort(() => Math.random() - 0.5);
  let current = 0;
  let score = 0;
  const results = [];

  const view = document.createElement('div');
  view.className = 'lesson-view exercise-view';
  view.innerHTML = `
    <div class="exercise-header">
      <h2><i class="fa-solid fa-pen-to-square"></i> Cvičenie</h2>
      <div class="ex-progress-row">
        <span id="ex-counter">1 / ${items.length}</span>
        <div class="ex-progress-bar-wrap"><div class="ex-progress-bar" id="ex-bar" style="width:0%"></div></div>
        <span id="ex-score-live">Skóre: 0</span>
      </div>
    </div>
    <div id="ex-question-area"></div>
    <div id="ex-feedback" class="ex-feedback hidden"></div>
    <div id="ex-nav" class="ex-nav hidden">
      <button class="btn btn-primary" id="ex-next-btn">Ďalej <i class="fa-solid fa-arrow-right"></i></button>
    </div>
  `;

  main.innerHTML = '';
  main.appendChild(view);
  main.scrollTop = 0;

  function showQuestion(idx) {
    const q = items[idx];
    document.getElementById('ex-counter').textContent = `${idx + 1} / ${items.length}`;
    document.getElementById('ex-bar').style.width = `${(idx / items.length) * 100}%`;
    document.getElementById('ex-score-live').textContent = `Skóre: ${score}`;
    document.getElementById('ex-feedback').className = 'ex-feedback hidden';
    document.getElementById('ex-nav').className = 'ex-nav hidden';

    const area = document.getElementById('ex-question-area');
    area.innerHTML = '';

    if (q.type === 'mc') renderMC(q, area);
    else if (q.type === 'fib') renderFIB(q, area);
    else if (q.type === 'match') renderMatch(q, area);
  }

  function showFeedback(correct, explanation) {
    const fb = document.getElementById('ex-feedback');
    fb.className = 'ex-feedback ' + (correct ? 'ex-correct' : 'ex-wrong');
    fb.innerHTML = `
      <div class="fb-icon"><i class="fa-solid ${correct ? 'fa-check-circle' : 'fa-times-circle'}"></i></div>
      <div class="fb-text">
        <strong>${correct ? 'Správne!' : 'Nesprávne.'}</strong>
        ${explanation ? `<p>${explanation}</p>` : ''}
      </div>
    `;
    document.getElementById('ex-nav').className = 'ex-nav';
  }

  function advance() {
    current++;
    if (current < items.length) {
      showQuestion(current);
    } else {
      showResults();
    }
  }

  document.getElementById('ex-next-btn').onclick = advance;

  function renderMC(q, area) {
    const box = document.createElement('div');
    box.className = 'mc-question';
    // Strip the parenthetical grammar hint e.g. "(die / alt + Schule)" from the display
    const cleanQuestion = q.question.replace(/\s*\([^)]*\)\s*$/, '').trim();
    box.innerHTML = `<div class="mc-q-text">${cleanQuestion}</div>`;

    const opts = document.createElement('div');
    opts.className = 'mc-options';

    // Shuffle options
    const shuffled = [...q.options].sort(() => Math.random() - 0.5);
    shuffled.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'mc-option';
      btn.innerHTML = opt;
      btn.onclick = () => {
        opts.querySelectorAll('.mc-option').forEach(b => b.disabled = true);
        const correct = opt === q.answer;
        btn.classList.add(correct ? 'correct' : 'wrong');
        if (!correct) {
          opts.querySelectorAll('.mc-option').forEach(b => {
            if (b.innerHTML === q.answer) b.classList.add('correct');
          });
        }
        if (correct) score++;
        results.push({ q: q.question, correct });
        showFeedback(correct, q.explanation);
      };
      opts.appendChild(btn);
    });

    box.appendChild(opts);
    area.appendChild(box);
  }

  function renderFIB(q, area) {
    const box = document.createElement('div');
    box.className = 'fib-question';
    box.innerHTML = `<div class="mc-q-text">${q.question}</div>`;

    const inputsWrap = document.createElement('div');
    inputsWrap.className = 'fib-inputs';

    const inputs = [];
    (q.blanks || []).forEach(blank => {
      const wrap = document.createElement('div');
      wrap.className = 'fib-input-wrap';
      const inp = document.createElement('input');
      inp.className = 'fib-input';
      inp.placeholder = blank.hint || 'Doplň...';
      inp.type = 'text';
      inputs.push({ inp, blank });
      wrap.appendChild(inp);
      inputsWrap.appendChild(wrap);
    });

    const checkBtn = document.createElement('button');
    checkBtn.className = 'btn btn-primary fib-check';
    checkBtn.innerHTML = '<i class="fa-solid fa-check"></i> Overiť';
    checkBtn.onclick = () => {
      checkBtn.disabled = true;
      inputs.forEach(({ inp, blank }) => inp.disabled = true);
      let allCorrect = true;
      inputs.forEach(({ inp, blank }) => {
        const val = inp.value.trim();
        const correct = val.toLowerCase() === blank.answer.toLowerCase();
        inp.classList.add(correct ? 'correct' : 'wrong');
        if (!correct) {
          allCorrect = false;
          inp.title = `Správna odpoveď: ${blank.answer}`;
        }
      });
      if (allCorrect) score++;
      results.push({ q: q.question, correct: allCorrect });
      showFeedback(allCorrect, q.explanation + (allCorrect ? '' : ` Správna odpoveď: <strong>${(q.blanks || []).map(b => b.answer).join(', ')}</strong>`));
    };

    box.appendChild(inputsWrap);
    box.appendChild(checkBtn);
    area.appendChild(box);
  }

  function renderMatch(q, area) {
    const box = document.createElement('div');
    box.className = 'match-question';
    box.innerHTML = `<div class="mc-q-text">${q.question}</div>`;

    const pairs = [...q.pairs].sort(() => Math.random() - 0.5);
    const rightShuffled = [...pairs].sort(() => Math.random() - 0.5);

    let selectedLeft = null;
    let selectedRight = null;
    let matched = 0;

    const grid = document.createElement('div');
    grid.className = 'match-grid';

    const leftCol = document.createElement('div');
    leftCol.className = 'match-col';
    const rightCol = document.createElement('div');
    rightCol.className = 'match-col';

    pairs.forEach(pair => {
      const lBtn = document.createElement('button');
      lBtn.className = 'match-item';
      lBtn.textContent = pair.left;
      lBtn.dataset.key = pair.left;
      lBtn.onclick = () => selectLeft(lBtn);
      leftCol.appendChild(lBtn);
    });

    rightShuffled.forEach(pair => {
      const rBtn = document.createElement('button');
      rBtn.className = 'match-item';
      rBtn.textContent = pair.right;
      rBtn.dataset.key = pair.left; // stores matching left key
      rBtn.onclick = () => selectRight(rBtn);
      rightCol.appendChild(rBtn);
    });

    grid.appendChild(leftCol);
    grid.appendChild(rightCol);
    box.appendChild(grid);
    area.appendChild(box);

    function selectLeft(btn) {
      if (btn.disabled) return;
      leftCol.querySelectorAll('.match-item').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedLeft = btn;
      if (selectedRight) checkMatch();
    }

    function selectRight(btn) {
      if (btn.disabled) return;
      rightCol.querySelectorAll('.match-item').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedRight = btn;
      if (selectedLeft) checkMatch();
    }

    function checkMatch() {
      const lKey = selectedLeft.dataset.key;
      const rKey = selectedRight.dataset.key;
      if (lKey === rKey) {
        selectedLeft.classList.remove('selected');
        selectedRight.classList.remove('selected');
        selectedLeft.classList.add('matched');
        selectedRight.classList.add('matched');
        selectedLeft.disabled = true;
        selectedRight.disabled = true;
        matched++;
        if (matched === pairs.length) {
          score++;
          results.push({ q: q.question, correct: true });
          showFeedback(true, q.explanation || 'Výborne! Všetky páry sú správne.');
        }
      } else {
        selectedLeft.classList.add('wrong-flash');
        selectedRight.classList.add('wrong-flash');
        setTimeout(() => {
          selectedLeft.classList.remove('selected', 'wrong-flash');
          selectedRight.classList.remove('selected', 'wrong-flash');
        }, 600);
      }
      selectedLeft = null;
      selectedRight = null;
    }
  }

  function showResults() {
    saveLessonScore(lessonId, score, items.length);
    if (score >= Math.ceil(items.length * 0.7)) {
      markLessonComplete(lessonId);
    }

    const pct = Math.round((score / items.length) * 100);
    const grade = pct >= 90 ? 'Výborne! 🎉' : pct >= 70 ? 'Dobre! 👍' : pct >= 50 ? 'Dá sa. 💡' : 'Skús znova. 📚';
    const gradeColor = pct >= 90 ? '#10b981' : pct >= 70 ? '#3b82f6' : pct >= 50 ? '#f59e0b' : '#ef4444';

    main.innerHTML = `
      <div class="lesson-view results-view">
        <div class="results-header">
          <div class="results-score-circle" style="--score-color:${gradeColor}">
            <span class="results-pct">${pct}<span style="font-size:0.5em">%</span></span>
          </div>
          <h2>Výsledok cvičenia</h2>
          <p class="results-grade" style="color:${gradeColor}">${grade}</p>
          <p>Správne odpovede: <strong>${score}</strong> z <strong>${items.length}</strong></p>
        </div>
        <div class="results-actions">
          <button class="btn btn-primary" id="res-retry-btn"><i class="fa-solid fa-rotate-right"></i> Skúsiť znova</button>
          <button class="btn btn-ghost" id="res-lesson-btn"><i class="fa-solid fa-book-open"></i> Späť na lekciu</button>
        </div>
      </div>
    `;

    document.getElementById('res-retry-btn').onclick = () => renderExercises(lessonId);
    document.getElementById('res-lesson-btn').onclick = () => {
      const lesson = LESSONS.find(l => l.id === lessonId);
      if (lesson) renderLesson(lesson);
    };
    main.scrollTop = 0;
  }

  showQuestion(0);
}
