import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowLeft,
  Volume2,
  Headphones,
  BookOpen,
  AlignLeft,
  Trophy,
  Star,
  RotateCcw,
  ChevronRight,
  CheckCircle,
  XCircle,
  Zap,
  ClipboardList,
} from 'lucide-react';
import { useTTS } from '../hooks/useTTS';

// ─── Utilities ────────────────────────────────────────────────────────────────

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildQuestionPool(lessons) {
  if (!lessons?.length) return { hoeren: [], lesen: [], vocab: [] };

  // ── Section 1 · Hörverstehen (listening, 5 questions) ────────────────────
  // Source: listen-type exercise items, then vocab items as fallback
  const listenRaw = [];
  lessons.forEach((lesson) => {
    const listenEx = lesson.exercises?.find((e) => e.type === 'listen');
    if (listenEx?.questions) {
      listenEx.questions.forEach((q) => {
        if (q.de && q.sk) listenRaw.push({ de: q.de, sk: q.sk });
      });
    }
    lesson.vocab?.forEach((v) => {
      if (v.de && v.sk) listenRaw.push({ de: v.de, sk: v.sk });
    });
  });

  const seenDe = new Set();
  const uniqueListen = listenRaw.filter((item) => {
    if (seenDe.has(item.de)) return false;
    seenDe.add(item.de);
    return true;
  });
  const shuffledListen = shuffle(uniqueListen);

  const hoerenQs = shuffledListen.slice(0, 5).map((item) => {
    const distPool = shuffledListen.filter((d) => d.sk !== item.sk);
    const distractors = shuffle(distPool).slice(0, 3).map((d) => d.sk);
    while (distractors.length < 3) distractors.push('—');
    const options = shuffle([item.sk, ...distractors]);
    return { de: item.de, options, answer: options.indexOf(item.sk) };
  });

  // ── Section 2 · Leseverstehen (reading MCQ, 8 questions) ─────────────────
  const mcqRaw = [];
  lessons.forEach((lesson) => {
    const mcqEx = lesson.exercises?.find((e) => e.type === 'mcq');
    if (mcqEx?.questions) {
      mcqEx.questions.forEach((q) => {
        if (q.question && Array.isArray(q.options) && q.options.length === 4 && q.answer !== undefined) {
          mcqRaw.push({ question: q.question, options: q.options, answer: q.answer });
        }
      });
    }
  });
  const leseQs = shuffle(mcqRaw).slice(0, 8);

  // ── Section 3 · Wortschatz (vocabulary, 7 questions) ─────────────────────
  const vocabRaw = [];
  const seenVocab = new Set();
  lessons.forEach((lesson) => {
    lesson.vocab?.forEach((v) => {
      if (v.de && v.sk && !seenVocab.has(v.de)) {
        seenVocab.add(v.de);
        vocabRaw.push({ de: v.de, sk: v.sk });
      }
    });
  });
  const shuffledVocab = shuffle(vocabRaw);
  const vocabQs = shuffledVocab.slice(0, 7).map((item) => {
    const distPool = shuffledVocab.filter((d) => d.sk !== item.sk);
    const distractors = shuffle(distPool).slice(0, 3).map((d) => d.sk);
    while (distractors.length < 3) distractors.push('—');
    const options = shuffle([item.sk, ...distractors]);
    return { de: item.de, options, answer: options.indexOf(item.sk) };
  });

  return { hoeren: hoerenQs, lesen: leseQs, vocab: vocabQs };
}

// ─── Section config ───────────────────────────────────────────────────────────

const SECTION_META = [
  {
    phase: 'section1',
    key: 's1',
    name: 'Hörverstehen',
    labelSk: 'Posluch',
    icon: Headphones,
    color: 'violet',
    count: 5,
    instruction:
      'Počúvaj nemeckú vetu. Zvuk sa automaticky prehrá, keď sa zobrazí otázka. Môžeš ho prehrať znova. Vyber správny slovenský preklad.',
    tts: true,
  },
  {
    phase: 'section2',
    key: 's2',
    name: 'Leseverstehen',
    labelSk: 'Čítanie',
    icon: BookOpen,
    color: 'sky',
    count: 8,
    instruction:
      'Čítaj nemeckú otázku a vyber správnu odpoveď. Táto sekcia je len na čítanie — zvuk nie je k dispozícii.',
    tts: false,
  },
  {
    phase: 'section3',
    key: 's3',
    name: 'Wortschatz',
    labelSk: 'Slovná zásoba',
    icon: AlignLeft,
    color: 'emerald',
    count: 7,
    instruction:
      'Vidíš nemecké slovo alebo frázu. Vyber správny slovenský preklad zo štyroch možností.',
    tts: false,
  },
];

const PHASE_ORDER = ['intro', 'section1', 'section2', 'section3', 'results'];

const colorCls = {
  violet: {
    border: 'border-violet-700',
    bg: 'bg-violet-950/40',
    text: 'text-violet-300',
    iconText: 'text-violet-400',
    badge: 'bg-violet-900/70 text-violet-200 border border-violet-700',
    btn: 'bg-violet-600 hover:bg-violet-500 active:bg-violet-700',
    bar: 'bg-violet-500',
  },
  sky: {
    border: 'border-sky-700',
    bg: 'bg-sky-950/40',
    text: 'text-sky-300',
    iconText: 'text-sky-400',
    badge: 'bg-sky-900/70 text-sky-200 border border-sky-700',
    btn: 'bg-sky-600 hover:bg-sky-500 active:bg-sky-700',
    bar: 'bg-sky-500',
  },
  emerald: {
    border: 'border-emerald-700',
    bg: 'bg-emerald-950/40',
    text: 'text-emerald-300',
    iconText: 'text-emerald-400',
    badge: 'bg-emerald-900/70 text-emerald-200 border border-emerald-700',
    btn: 'bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700',
    bar: 'bg-emerald-500',
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function GlobalProgressBar({ answered, total }) {
  const pct = Math.min(100, Math.round((answered / total) * 100));
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-gray-500 mb-1.5">
        <span>Celkový postup</span>
        <span>{answered} / {total}</span>
      </div>
      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function OptionButton({ label, index, selected, showFeedback, correctIndex, onSelect }) {
  const isChosen = selected === index;
  const isCorrect = index === correctIndex;

  let cls =
    'w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-150 ';

  if (!showFeedback) {
    cls +=
      'bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700 hover:border-gray-500 cursor-pointer';
  } else if (isCorrect) {
    cls += 'bg-emerald-900/60 border-emerald-500 text-emerald-200 cursor-default';
  } else if (isChosen && !isCorrect) {
    cls += 'bg-red-900/60 border-red-500 text-red-200 cursor-default';
  } else {
    cls += 'bg-gray-800/40 border-gray-700/40 text-gray-500 cursor-default';
  }

  return (
    <button
      className={cls}
      onClick={() => !showFeedback && onSelect(index)}
      disabled={showFeedback}
    >
      <span className="flex items-center gap-3">
        <span className="w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full border border-current text-xs font-bold">
          {String.fromCharCode(65 + index)}
        </span>
        <span>{label}</span>
        {showFeedback && isCorrect && (
          <CheckCircle size={16} className="ml-auto text-emerald-400 flex-shrink-0" />
        )}
        {showFeedback && isChosen && !isCorrect && (
          <XCircle size={16} className="ml-auto text-red-400 flex-shrink-0" />
        )}
      </span>
    </button>
  );
}

// ─── Screens ──────────────────────────────────────────────────────────────────

function IntroScreen({ weekNumber, lessons, onStart }) {
  const lessonTitles = lessons?.map((l) => l.title || l.topic || `Lekcia ${l.id}`) ?? [];
  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Header card */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-indigo-900/60 border border-indigo-700 text-indigo-300 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
          <ClipboardList size={13} />
          Týždenný test
        </div>
        <h1 className="text-3xl font-black text-white">Týždeň {weekNumber}</h1>
        <p className="text-gray-400 text-sm">
          Komplexný test vo formáte Goethe A1 — overíš, čo si sa naučil/a počas celého týždňa.
        </p>
      </div>

      {/* Lessons covered */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-3">
        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
          Precvičené lekcie
        </p>
        {lessonTitles.map((title, i) => (
          <div key={i} className="flex items-center gap-3 text-sm text-gray-300">
            <span className="w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full bg-indigo-900 text-indigo-300 text-xs font-bold">
              {i + 1}
            </span>
            {title}
          </div>
        ))}
      </div>

      {/* Section overview */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-3">
        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
          Štruktúra testu (20 otázok)
        </p>
        {SECTION_META.map((s) => {
          const C = colorCls[s.color];
          const Icon = s.icon;
          return (
            <div
              key={s.key}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${C.bg} border ${C.border}`}
            >
              <Icon size={16} className={C.iconText} />
              <div className="flex-1 min-w-0">
                <span className={`font-semibold text-sm ${C.text}`}>{s.name}</span>
                <span className="text-gray-500 text-xs ml-2">— {s.labelSk}</span>
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${C.badge}`}>
                {s.count} otázok
              </span>
            </div>
          );
        })}
      </div>

      <button
        onClick={onStart}
        className="w-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold py-4 px-6 rounded-2xl transition-all flex items-center justify-center gap-2 text-base"
      >
        Začať test
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

function SectionIntroScreen({ meta, onStart }) {
  const C = colorCls[meta.color];
  const Icon = meta.icon;
  return (
    <div className="max-w-md mx-auto">
      <div className={`bg-gray-900 border ${C.border} rounded-2xl p-8 text-center space-y-5`}>
        <div
          className={`mx-auto w-14 h-14 flex items-center justify-center rounded-2xl ${C.bg} border ${C.border}`}
        >
          <Icon size={28} className={C.iconText} />
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1">
            Sekcia
          </p>
          <h2 className={`text-2xl font-black ${C.text}`}>{meta.name}</h2>
          <p className="text-gray-400 text-sm mt-1">{meta.labelSk}</p>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed bg-gray-800/50 rounded-xl p-4">
          {meta.instruction}
        </p>
        <div className="text-gray-500 text-xs">
          {meta.count} otázok
        </div>
        <button
          onClick={onStart}
          className={`w-full ${C.btn} text-white font-bold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2`}
        >
          Začať sekciu
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

function QuestionScreen({
  meta,
  question,
  qIndex,
  qTotal,
  globalAnswered,
  globalTotal,
  selectedOption,
  showFeedback,
  onSelect,
  onNext,
  speak,
  speaking,
}) {
  const C = colorCls[meta.color];
  const Icon = meta.icon;

  return (
    <div className="max-w-xl mx-auto space-y-5">
      {/* Global progress */}
      <GlobalProgressBar answered={globalAnswered} total={globalTotal} />

      {/* Section badge + counter */}
      <div className="flex items-center justify-between">
        <div className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${C.badge}`}>
          <Icon size={12} />
          {meta.name}
        </div>
        <span className="text-xs text-gray-500 font-medium">
          Otázka {qIndex + 1} / {qTotal}
        </span>
      </div>

      {/* Question card */}
      <div className={`bg-gray-900 border ${C.border} rounded-2xl p-5 space-y-4`}>
        {/* Hören: German text with TTS button */}
        {meta.tts ? (
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 text-gray-400 text-xs bg-gray-800 px-3 py-1.5 rounded-lg">
              <Headphones size={13} />
              Počúvaj a vyber preklad
            </div>
            <div className="py-3">
              <p className="text-2xl font-bold text-white tracking-wide">{question.de}</p>
            </div>
            <button
              onClick={() => speak(question.de)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                speaking
                  ? 'bg-violet-700 text-white'
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white'
              }`}
            >
              <Volume2 size={15} className={speaking ? 'animate-pulse' : ''} />
              {speaking ? 'Prehráva...' : 'Prehrať znova'}
            </button>
          </div>
        ) : meta.key === 's3' ? (
          /* Vocab: big German word */
          <div className="text-center py-2">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Nemecky:</p>
            <p className="text-3xl font-black text-white tracking-wide">{question.de}</p>
          </div>
        ) : (
          /* Lese: question text */
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Otázka:</p>
            <p className="text-base text-gray-100 leading-relaxed font-medium">{question.question}</p>
          </div>
        )}

        {/* Options */}
        <div className="space-y-2.5 pt-1">
          {question.options.map((opt, idx) => (
            <OptionButton
              key={idx}
              label={opt}
              index={idx}
              selected={selectedOption}
              showFeedback={showFeedback}
              correctIndex={question.answer}
              onSelect={onSelect}
            />
          ))}
        </div>

        {/* Feedback row */}
        {showFeedback && (
          <div
            className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold ${
              selectedOption === question.answer
                ? 'bg-emerald-900/50 border border-emerald-700 text-emerald-300'
                : 'bg-red-900/50 border border-red-700 text-red-300'
            }`}
          >
            {selectedOption === question.answer ? (
              <>
                <CheckCircle size={16} />
                Správne!
              </>
            ) : (
              <>
                <XCircle size={16} />
                Nesprávne — správna odpoveď je vyznačená zeleno.
              </>
            )}
          </div>
        )}
      </div>

      {/* Next button */}
      {showFeedback && (
        <button
          onClick={onNext}
          className="w-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
        >
          Ďalej
          <ChevronRight size={18} />
        </button>
      )}
    </div>
  );
}

function ResultsScreen({ answers, weekNumber, onComplete, onRetry }) {
  const s1Score = answers.s1.filter(Boolean).length;
  const s2Score = answers.s2.filter(Boolean).length;
  const s3Score = answers.s3.filter(Boolean).length;

  const s1Total = SECTION_META[0].count;
  const s2Total = SECTION_META[1].count;
  const s3Total = SECTION_META[2].count;
  const total = s1Total + s2Total + s3Total;

  const correctTotal = s1Score + s2Score + s3Score;
  const pct = Math.round((correctTotal / total) * 100);
  const passed = pct >= 60;
  const xp = Math.round((pct / 100) * 50);

  const gradeColor =
    pct >= 80
      ? 'text-emerald-400'
      : pct >= 60
      ? 'text-sky-400'
      : 'text-red-400';

  const sectionRows = [
    { meta: SECTION_META[0], correct: s1Score, total: s1Total },
    { meta: SECTION_META[1], correct: s2Score, total: s2Total },
    { meta: SECTION_META[2], correct: s3Score, total: s3Total },
  ];

  return (
    <div className="max-w-md mx-auto space-y-6">
      {/* Score header */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-7 text-center space-y-3">
        <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-gray-800">
          <Trophy size={28} className={gradeColor} />
        </div>
        <div className={`text-6xl font-black ${gradeColor}`}>{pct}%</div>
        <p className="text-gray-400 text-sm">
          {correctTotal} / {total} správnych odpovedí
        </p>

        {/* Pass/fail badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm ${
            passed
              ? 'bg-emerald-900/60 border border-emerald-600 text-emerald-300'
              : 'bg-red-900/60 border border-red-700 text-red-300'
          }`}
        >
          {passed ? (
            <>
              <CheckCircle size={15} />
              ÚSPEŠNÝ/Á ✓
            </>
          ) : (
            <>
              <XCircle size={15} />
              Nezískal/a si postup ✗
            </>
          )}
        </div>

        {/* XP */}
        <div className="flex items-center justify-center gap-2 text-amber-400 font-bold">
          <Zap size={16} />
          +{xp} XP
        </div>
      </div>

      {/* Per-section breakdown */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-3">
        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">
          Výsledky podľa sekcie
        </p>
        {sectionRows.map(({ meta, correct, total: t }) => {
          const C = colorCls[meta.color];
          const Icon = meta.icon;
          const sectionPct = Math.round((correct / t) * 100);
          return (
            <div key={meta.key} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <div className={`flex items-center gap-2 font-semibold ${C.text}`}>
                  <Icon size={14} className={C.iconText} />
                  {meta.name}
                </div>
                <span className="text-gray-400 text-xs">
                  {correct} / {t} ({sectionPct}%)
                </span>
              </div>
              <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${C.bar} rounded-full transition-all`}
                  style={{ width: `${sectionPct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <button
        onClick={() => onComplete(weekNumber, pct)}
        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-6 rounded-2xl transition-all flex items-center justify-center gap-2"
      >
        <Star size={18} />
        Dokončiť
      </button>
      <button
        onClick={onRetry}
        className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold py-3.5 px-6 rounded-2xl transition-all flex items-center justify-center gap-2"
      >
        <RotateCcw size={16} />
        Zopakovať test
      </button>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function WeeklyTest({ weekNumber, lessons, progress, onComplete, onBack }) {
  const { speak, speaking } = useTTS();

  // Retry counter forces fresh question pool
  const [retryCount, setRetryCount] = useState(0);
  const questions = useMemo(
    () => buildQuestionPool(lessons),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lessons, retryCount]
  );

  const [phase, setPhase] = useState('intro');
  // Within a section: true = show section intro card, false = show questions
  const [sectionIntro, setSectionIntro] = useState(true);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answers, setAnswers] = useState({ s1: [], s2: [], s3: [] });

  // Map phase → question array, section key, section meta
  const phaseQs = { section1: questions.hoeren, section2: questions.lesen, section3: questions.vocab };
  const phaseKey = { section1: 's1', section2: 's2', section3: 's3' };
  const phaseMeta = { section1: SECTION_META[0], section2: SECTION_META[1], section3: SECTION_META[2] };

  // Auto-play TTS for Hörverstehen questions
  useEffect(() => {
    if (phase === 'section1' && !sectionIntro && questions.hoeren[currentQ]) {
      const timer = setTimeout(() => speak(questions.hoeren[currentQ].de), 350);
      return () => clearTimeout(timer);
    }
  }, [phase, sectionIntro, currentQ]); // intentionally omit speak/questions to avoid re-triggers

  // Totals
  const TOTAL_QS = 20;
  const globalAnswered = answers.s1.length + answers.s2.length + answers.s3.length;

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleStartTest = () => {
    setPhase('section1');
    setSectionIntro(true);
    setCurrentQ(0);
  };

  const handleStartSection = () => {
    setSectionIntro(false);
  };

  const handleSelectOption = (idx) => {
    if (showFeedback) return;
    setSelectedOption(idx);
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (selectedOption === null) return;
    const qs = phaseQs[phase];
    const key = phaseKey[phase];
    const correct = selectedOption === qs[currentQ].answer;

    const newAnswers = { ...answers, [key]: [...answers[key], correct] };
    setAnswers(newAnswers);
    setSelectedOption(null);
    setShowFeedback(false);

    if (currentQ + 1 < qs.length) {
      setCurrentQ(currentQ + 1);
    } else {
      const nextPhase =
        phase === 'section1' ? 'section2' : phase === 'section2' ? 'section3' : 'results';
      if (nextPhase === 'results') {
        setPhase('results');
      } else {
        setPhase(nextPhase);
        setCurrentQ(0);
        setSectionIntro(true);
      }
    }
  };

  const handleRetry = () => {
    setRetryCount((c) => c + 1);
    setPhase('intro');
    setSectionIntro(true);
    setCurrentQ(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setAnswers({ s1: [], s2: [], s3: [] });
  };

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-16">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-gray-950/90 backdrop-blur border-b border-gray-800">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl hover:bg-gray-800 text-gray-400 hover:text-white transition-all"
            aria-label="Späť"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
              Týždenný test
            </p>
            <h1 className="text-sm font-bold text-white truncate">
              Týždeň {weekNumber}
              {phase !== 'intro' && phase !== 'results' && phaseMeta[phase] && (
                <span className={`ml-2 font-normal ${colorCls[phaseMeta[phase].color].text}`}>
                  · {phaseMeta[phase].name}
                </span>
              )}
            </h1>
          </div>
          {phase !== 'intro' && phase !== 'results' && !sectionIntro && (
            <div className="text-right">
              <p className="text-xs text-gray-500">{globalAnswered} / {TOTAL_QS}</p>
              <p className="text-xs text-gray-400 font-medium">
                {Math.round((globalAnswered / TOTAL_QS) * 100)}%
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 pt-6">
        {phase === 'intro' && (
          <IntroScreen weekNumber={weekNumber} lessons={lessons} onStart={handleStartTest} />
        )}

        {(phase === 'section1' || phase === 'section2' || phase === 'section3') && (
          <>
            {sectionIntro ? (
              <SectionIntroScreen meta={phaseMeta[phase]} onStart={handleStartSection} />
            ) : (
              <QuestionScreen
                meta={phaseMeta[phase]}
                question={phaseQs[phase][currentQ]}
                qIndex={currentQ}
                qTotal={phaseQs[phase].length}
                globalAnswered={globalAnswered}
                globalTotal={TOTAL_QS}
                selectedOption={selectedOption}
                showFeedback={showFeedback}
                onSelect={handleSelectOption}
                onNext={handleNext}
                speak={speak}
                speaking={speaking}
              />
            )}
          </>
        )}

        {phase === 'results' && (
          <ResultsScreen
            answers={answers}
            weekNumber={weekNumber}
            onComplete={onComplete}
            onRetry={handleRetry}
          />
        )}
      </div>
    </div>
  );
}
