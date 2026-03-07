import React, { useState, useMemo } from 'react';
import { ArrowLeft, CheckCircle, Star, Zap, RotateCcw, ChevronRight, BookOpen, Volume2, ClipboardCheck, Target, Printer } from 'lucide-react';
import { FlashcardExercise } from '../components/exercises/FlashcardExercise';
import { MCQExercise } from '../components/exercises/MCQExercise';
import { FillExercise } from '../components/exercises/FillExercise';
import { ListenExercise } from '../components/exercises/ListenExercise';
import { MatchExercise } from '../components/exercises/MatchExercise';
import { DialogueExercise } from '../components/exercises/DialogueExercise';
import { SpeakingExercise } from '../components/exercises/SpeakingExercise';
import { WordOrderExercise } from '../components/exercises/WordOrderExercise';
import { MiniTextExercise } from '../components/exercises/MiniTextExercise';
import { LessonTest } from '../components/exercises/LessonTest';
import WritingChecker from '../components/exercises/WritingChecker';
import { TranslationExercise } from '../components/exercises/TranslationExercise';
import { CategorySortExercise } from '../components/exercises/CategorySortExercise';
import { ConjugationExercise } from '../components/exercises/ConjugationExercise';
import { TrueFalseExercise } from '../components/exercises/TrueFalseExercise';
import { DictationExercise } from '../components/exercises/DictationExercise';
import { useTTS } from '../hooks/useTTS';
import StudyNudge from '../components/StudyCoach';
import SegmentIntending from '../components/SegmentIntending';

const EXERCISE_TYPE_NAMES = {
    flashcard: 'Kartičky',
    match: 'Spájanie',
    wordorder: 'Slovosled',
    fill: 'Doplňovanie',
    listen: 'Počúvanie',
    mcq: 'Výber odpovede',
    minitext: 'Čítanie',
    speaking: 'Hovorenie',
    dialogue: 'Dialóg',
    writing: 'Písanie (AI)',
};

function exName(ex, i) {
    return EXERCISE_TYPE_NAMES[ex?.type] || `Cvičenie ${i + 1}`;
}

function printLesson(lesson) {
  const notes = lesson.grammarNotes || (lesson.grammarNote ? [lesson.grammarNote] : []);
  const minitext = lesson.exercises?.find(e => e.type === 'minitext');
  const mcq = lesson.exercises?.find(e => e.type === 'mcq');
  const fill = lesson.exercises?.find(e => e.type === 'fill');
  const wordorder = lesson.exercises?.find(e => e.type === 'wordorder');
  const match = lesson.exercises?.find(e => e.type === 'match');

  const genderMap = {};
  for (const v of (lesson.vocab || [])) {
    if (!v.gender) continue;
    const bare = v.de.replace(/^(der|die|das)\s+/i, '').trim();
    genderMap[bare] = v.gender;
  }

  function colorize(text) {
    if (!text) return text || '';
    return text.split(/(\s+)/).map(token => {
      const clean = token.replace(/[.,!?;:\"""„'()\[\]]+/g, '');
      if (!clean) return token;
      const gender = genderMap[clean];
      if (gender) {
        const color = gender === 'M' ? '#3b82f6' : gender === 'F' ? '#f43f5e' : '#22c55e';
        return token.replace(clean, `<span style="color:${color}">${clean}</span>`);
      }
      return token;
    }).join('');
  }

  let html = `<html><head><title>Lekcia ${lesson.id}: ${lesson.title}</title><meta charset="utf-8">
<style>
  body { font-family: 'Segoe UI', Arial, sans-serif; padding: 30px 40px; color: #222; max-width: 800px; margin: 0 auto; line-height: 1.6; font-size: 14px; }
  h1 { font-size: 24px; border-bottom: 3px solid #4f46e5; padding-bottom: 8px; margin-bottom: 5px; }
  h2 { font-size: 18px; color: #4f46e5; margin-top: 30px; border-bottom: 1px solid #ddd; padding-bottom: 4px; }
  h3 { font-size: 15px; color: #333; margin-top: 20px; margin-bottom: 8px; }
  .subtitle { color: #666; font-size: 13px; margin-bottom: 20px; }
  .grammar-card { border: 1px solid #ddd; border-radius: 8px; padding: 16px; margin-bottom: 16px; page-break-inside: avoid; background: #fafafa; }
  .grammar-card h3 { margin-top: 0; color: #4f46e5; }
  .grammar-card p { margin: 6px 0; }
  .contrast-box { background: #f3e8ff; border: 1px dashed #c084fc; border-radius: 6px; padding: 10px; margin: 10px 0; font-size: 13px; }
  .example-row { display: flex; gap: 10px; padding: 4px 0; border-bottom: 1px dotted #eee; }
  .example-de { font-weight: bold; flex: 1; }
  .example-sk { color: #666; flex: 1; }
  .vocab-table { width: 100%; border-collapse: collapse; font-size: 13px; }
  .vocab-table th { background: #f0f0f0; text-align: left; padding: 5px 8px; border: 1px solid #ddd; }
  .vocab-table td { padding: 5px 8px; border: 1px solid #eee; }
  .vocab-table tr:nth-child(even) { background: #fafafa; }
  .exercise-box { border: 1px solid #ddd; border-radius: 8px; padding: 14px; margin-bottom: 12px; page-break-inside: avoid; }
  .question { font-weight: bold; margin: 6px 0; }
  .options div { margin-bottom: 3px; padding: 3px 0; }
  .text-box { border: 2px solid #4f46e5; border-radius: 8px; padding: 16px; margin: 10px 0; background: #f8f7ff; line-height: 1.8; }
  .page-break { page-break-before: always; }
  .btn-print { margin: 20px auto; display: block; padding: 12px 24px; background: #4f46e5; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 16px; }
  .btn-print:hover { background: #4338ca; }
  @media print { .no-print { display: none !important; } body { padding: 15px; } }
  .footer { text-align: center; color: #aaa; font-size: 11px; margin-top: 40px; border-top: 1px solid #eee; padding-top: 10px; }
  .gender-legend { display: flex; gap: 16px; font-size: 11px; margin: 8px 0 12px; padding: 6px 10px; background: #f5f5f5; border-radius: 6px; border: 1px solid #e0e0e0; }
  .gender-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
</style></head><body>
<div class="no-print" style="text-align:center; margin-bottom: 20px;">
  <button class="btn-print" onclick="window.print()">🖨️ Vytlačiť do PDF</button>
</div>
<h1>Lekcia ${lesson.id}: ${lesson.title}</h1>
<div class="subtitle">${lesson.topic} · Týždeň ${lesson.week} · ${lesson.cefr} · ${lesson.xpReward} XP</div>
<div class="gender-legend">
  <span><span class="gender-dot" style="background:#3b82f6"></span> <span style="color:#3b82f6">der</span> (mužský rod)</span>
  <span><span class="gender-dot" style="background:#f43f5e"></span> <span style="color:#f43f5e">die</span> (ženský rod)</span>
  <span><span class="gender-dot" style="background:#22c55e"></span> <span style="color:#22c55e">das</span> (stredný rod)</span>
</div>
<h2>📖 Gramatika</h2>`;

  notes.forEach((note, idx) => {
    html += `<div class="grammar-card">
      <h3>${idx + 1}. ${note.rule}</h3>
      <div>${note.explanation}</div>`;
    if (note.slovakContrastNote) {
      html += `<div class="contrast-box">🇸🇰 <strong>Porovnanie so slovenčinou:</strong> ${note.slovakContrastNote}</div>`;
    }
    if (note.examples?.length > 0) {
      html += `<h3 style="font-size:13px; color:#555;">Príklady:</h3>`;
      note.examples.forEach(ex => {
        html += `<div class="example-row"><span class="example-de">${colorize(ex.de)}</span><span class="example-sk">${ex.sk}</span></div>`;
      });
    }
    html += `</div>`;
  });

  html += `<div class="page-break"></div>`;

  if (minitext) {
    html += `<h2>📄 Čítanie s porozumením</h2><div class="text-box">${colorize(minitext.text)}</div>`;
    if (minitext.textSk) html += `<p style="color:#888; font-size:12px; font-style:italic;">Preklad: ${minitext.textSk}</p>`;
    if (minitext.questions?.length > 0) {
      html += `<h3>Otázky k textu:</h3>`;
      minitext.questions.forEach((q, i) => {
        html += `<div class="exercise-box"><div class="question">${i + 1}. ${colorize(q.question)}</div><div class="options">${q.options.map((opt, idx) => `<div>${String.fromCharCode(65 + idx)}) ${colorize(opt)}</div>`).join('')}</div></div>`;
      });
    }
  }

  html += `<h2>📝 Slovná zásoba (${lesson.vocab?.length || 0} slov)</h2>
  <table class="vocab-table"><thead><tr><th>Nemecky</th><th>Slovensky</th><th>Rod</th><th>Príklad</th></tr></thead><tbody>`;
  (lesson.vocab || []).forEach(v => {
    const gLabel = v.gender === 'M' ? 'der' : v.gender === 'F' ? 'die' : v.gender === 'N' ? 'das' : '—';
    const gColor = v.gender === 'M' ? '#3b82f6' : v.gender === 'F' ? '#f43f5e' : v.gender === 'N' ? '#22c55e' : '#222';
    html += `<tr><td><strong style="color:${gColor}">${v.de}</strong></td><td>${v.sk}</td><td style="color:${gColor}; font-weight:600">${gLabel}</td><td style="font-size:12px; color:#555;">${colorize(v.example || '')}</td></tr>`;
  });
  html += `</tbody></table>`;

  html += `<div class="page-break"></div><h2>✏️ Cvičenia</h2>`;

  if (fill?.questions?.length > 0) {
    html += `<h3>Doplňovanie</h3>`;
    fill.questions.forEach((q, i) => {
      html += `<div class="exercise-box"><div class="question">${i + 1}. ${colorize(q.sentence)}</div>${q.hint ? `<div style="color:#888; font-size:12px;">Nápoveda: ${q.hint}</div>` : ''}</div>`;
    });
  }
  if (mcq?.questions?.length > 0) {
    html += `<h3>Výber správnej odpovede</h3>`;
    mcq.questions.forEach((q, i) => {
      html += `<div class="exercise-box"><div class="question">${i + 1}. ${colorize(q.question)}</div><div class="options">${q.options.map((opt, idx) => `<div>☐ ${String.fromCharCode(65 + idx)}) ${colorize(opt)}</div>`).join('')}</div></div>`;
    });
  }
  if (wordorder?.sentences?.length > 0) {
    html += `<h3>Usporiadaj slová do správneho poradia</h3>`;
    wordorder.sentences.forEach((s, i) => {
      const shuffled = [...s.words].sort(() => Math.random() - 0.5);
      html += `<div class="exercise-box"><div class="question">${i + 1}. ${s.hint}</div><div style="color:#555; font-size:13px; margin:6px 0;">Slová: <strong>${shuffled.map(w => colorize(w)).join(' · ')}</strong></div><div style="border:1px dashed #ccc; padding:8px; border-radius:4px; min-height:30px; color:#aaa;">Tvoja odpoveď: ___</div></div>`;
    });
  }
  if (match?.pairs?.length > 0) {
    html += `<h3>Spájanie</h3><table class="vocab-table"><thead><tr><th>Nemecky</th><th>Slovensky (pospájaj)</th></tr></thead><tbody>`;
    const shuffledSk = [...match.pairs].sort(() => Math.random() - 0.5);
    match.pairs.forEach((p, i) => { html += `<tr><td>${colorize(p[0])}</td><td>${shuffledSk[i]?.[1] || ''}</td></tr>`; });
    html += `</tbody></table>`;
  }

  html += `<div class="page-break"></div><h2>🔑 Kľúč odpovedí</h2>`;
  if (minitext?.questions?.length > 0) {
    html += `<h3>Čítanie s porozumením</h3>`;
    minitext.questions.forEach((q, i) => { html += `<p>${i + 1}. <strong>${String.fromCharCode(65 + q.answer)}) ${colorize(q.options[q.answer])}</strong> — ${q.explanation || ''}</p>`; });
  }
  if (fill?.questions?.length > 0) {
    html += `<h3>Doplňovanie</h3>`;
    fill.questions.forEach((q, i) => { html += `<p>${i + 1}. <strong>${colorize(q.answer)}</strong>${q.explanation ? ` — ${q.explanation}` : ''}</p>`; });
  }
  if (mcq?.questions?.length > 0) {
    html += `<h3>Výber správnej odpovede</h3>`;
    mcq.questions.forEach((q, i) => { html += `<p>${i + 1}. <strong>${String.fromCharCode(65 + q.answer)}) ${colorize(q.options[q.answer])}</strong>${q.explanation ? ` — ${q.explanation}` : ''}</p>`; });
  }
  if (wordorder?.sentences?.length > 0) {
    html += `<h3>Usporiadaj slová</h3>`;
    wordorder.sentences.forEach((s, i) => { html += `<p>${i + 1}. <strong>${colorize(s.correct)}</strong>${s.explanation ? ` — ${s.explanation}` : ''}</p>`; });
  }
  html += `<div class="footer">Lekcia ${lesson.id}: ${lesson.title} · Nemčina pre Slovákov · A1 kurz</div></body></html>`;

  const win = window.open('', '_blank');
  if (win) { win.document.write(html); win.document.close(); }
}

function InterleavedGrammarCard({ lesson, note, noteIdx, totalNotes, onNext, speak }) {
    return (
        <div className="max-w-xl mx-auto space-y-6">
            {noteIdx === 0 && lesson.heroImage && (
                <div className="rounded-3xl overflow-hidden border-2 border-indigo-900/50 shadow-2xl shadow-indigo-900/20 mb-6">
                    <img src={lesson.heroImage} alt={lesson.title} className="w-full h-48 sm:h-64 object-cover" />
                </div>
            )}

            <div className="card border-violet-800 bg-violet-950/30">
                <div className="flex items-center gap-2 mb-4">
                    <BookOpen size={18} className="text-violet-400" />
                    <span className="font-bold text-violet-300">Teória ({noteIdx + 1}/{totalNotes})</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{note.rule}</h3>
                <div className="text-gray-300 text-sm leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: note.explanation }}></div>

                {note.slovakContrastNote && (
                    <div className="bg-amber-950/30 border border-amber-800/40 rounded-xl p-3 mb-4">
                        <p className="text-xs text-amber-500 uppercase tracking-wider font-bold mb-1">🇸🇰 Porovnanie so slovenčinou</p>
                        <div className="text-amber-200/80 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: note.slovakContrastNote }}></div>
                    </div>
                )}

                {(note.examples && note.examples.length > 0) && (
                    <div className="space-y-2">
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Príklady k tomuto bloku</p>
                        {note.examples.map((ex, i) => (
                            <button
                                key={i}
                                onClick={() => speak(ex.de)}
                                className="w-full text-left flex items-start gap-3 bg-gray-800/60 hover:bg-gray-800 rounded-xl p-3 transition-all group"
                            >
                                <Volume2 size={14} className="text-indigo-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                <div>
                                    <p className="text-white text-sm font-medium">{ex.de}</p>
                                    <p className="text-gray-400 text-xs">{ex.sk}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="space-y-4">
                <button
                    onClick={onNext}
                    className="w-full btn-primary py-4 text-lg font-bold flex items-center justify-center gap-2 shadow-sm transition-transform hover:-translate-y-0.5"
                >
                    Poďme to hneď precvičiť
                    <ChevronRight size={20} />
                </button>

                <SegmentIntending onComplete={onNext} />

                {noteIdx === 0 && (
                    <button
                        onClick={() => printLesson(lesson)}
                        className="w-full btn-secondary py-3 text-sm font-semibold flex items-center justify-center gap-2"
                    >
                        <Printer size={16} />
                        Vytlačiť lekciu do PDF
                    </button>
                )}
            </div>
        </div>
    );
}

function ResultsScreen({ lesson, scores, avgScore, onComplete, onRetry, onStartTest, onNavigate }) {
    const exCount = lesson.exercises?.length || 0;
    const xpEarned = scores.length === exCount
        ? Math.round((avgScore / 100) * lesson.xpReward)
        : 0;
    const grade = avgScore >= 90 ? 'Výborne!' : avgScore >= 75 ? 'Dobre!' : avgScore >= 50 ? 'Zvládol si to.' : 'Nevadí, skús znova.';
    const gradeColor = avgScore >= 90 ? 'text-emerald-400' : avgScore >= 75 ? 'text-sky-400' : avgScore >= 50 ? 'text-amber-400' : 'text-red-400';

    return (
        <div className="max-w-md mx-auto text-center space-y-6">
            <div className="badge bg-indigo-900 border-indigo-700 text-indigo-300 mx-auto w-fit mb-4">Interleaved Learning (Po blokoch)</div>
            <div className={`text-5xl font-black ${gradeColor}`}>{Math.round(avgScore)}%</div>
            <p className={`text-2xl font-bold ${gradeColor}`}>{grade}</p>

            <div className="card space-y-3">
                {lesson.exercises && lesson.exercises.map((ex, i) => (
                    <div key={i} className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">{exName(ex, i)}</span>
                        <div className="flex items-center gap-2">
                            <div className="w-24 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full ${scores[i] >= 80 ? 'bg-emerald-500' : scores[i] >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                                    style={{ width: `${scores[i] || 0}%` }}
                                />
                            </div>
                            <span className={`text-sm font-bold w-10 text-right ${scores[i] >= 80 ? 'text-emerald-400' : scores[i] >= 50 ? 'text-amber-400' : 'text-red-400'}`}>
                                {scores[i] || 0}%
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="card border-yellow-800/40 bg-yellow-950/20 flex items-center justify-center gap-3 py-5">
                <Star size={24} className="text-yellow-400" />
                <div>
                    <p className="text-2xl font-bold text-yellow-300">+{xpEarned} XP</p>
                    <p className="text-xs text-gray-500">z {lesson.xpReward} možných</p>
                </div>
            </div>

            <div className="flex gap-3">
                <button onClick={onRetry} className="flex-1 btn-secondary flex items-center justify-center gap-2">
                    <RotateCcw size={16} />
                    Zopakovať
                </button>
                <button onClick={onComplete} className="flex-1 btn-primary flex items-center justify-center gap-2">
                    Dokončiť
                    <Zap size={16} />
                </button>
            </div>
            {onStartTest && (
                <button onClick={onStartTest} className="w-full btn-secondary flex items-center justify-center gap-2 border-amber-800/40 text-amber-300 hover:bg-amber-950/30">
                    <ClipboardCheck size={16} />
                    Urobiť test lekcie →
                </button>
            )}

            {/* Arena CTA */}
            <div className="bg-gradient-to-br from-indigo-950/60 to-indigo-900/20 border border-indigo-800/40 rounded-2xl p-5">
                <p className="text-sm text-gray-400 mb-3 leading-relaxed">
                    🎯 <strong className="text-white">Základ máš za sebou!</strong> Teraz choď do
                    <strong className="text-indigo-400"> Tréningovej Arény</strong> a precvičuj slovíčka, diktát
                    a hovorenie aspoň 15–20 minút.
                </p>
                <button
                    onClick={() => { onComplete(); setTimeout(() => onNavigate?.('arena'), 100); }}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group"
                >
                    <Target size={18} className="group-hover:rotate-12 transition-transform" />
                    Vstúpiť do Tréningovej Arény
                </button>
            </div>
        </div>
    );
}

export default function LessonViewInterleaved({ lesson, progress, saveLessonState, onComplete, onBack, onOpenAPIKey, onNavigate }) {
    const savedState = progress?.lessonStates?.[lesson.id];
    // Only restore saved state if it was from interleaved mode — classic phases are incompatible
    const isCompatible = savedState?.mode === 'interleaved';
    const [phase, setPhase] = useState((isCompatible && savedState?.phase) || 'interleaved');
    const [seqIndex, setSeqIndex] = useState((isCompatible && savedState?.seqIndex) || 0);
    const [scores, setScores] = useState((isCompatible && savedState?.scores) || []);
    const [exState, setExState] = useState((isCompatible && savedState?.exState) || null);
    const { speak } = useTTS();

    React.useEffect(() => {
        if (saveLessonState && phase !== 'results') {
            saveLessonState(lesson.id, { phase, seqIndex, scores, exState, mode: 'interleaved' });
        }
    }, [phase, seqIndex, scores, exState, lesson.id]);

    // Generate chunks algorithm (Interleaving)
    const sequence = useMemo(() => {
        const notes = lesson.grammarNotes || (lesson.grammarNote ? [lesson.grammarNote] : []);
        const exercises = lesson.exercises || [];
        const seq = [];

        if (notes.length === 0) {
            exercises.forEach((ex, i) => seq.push({ type: 'exercise', data: ex, exIndex: i }));
        } else {
            const exPerNote = Math.ceil(exercises.length / notes.length);
            let exCounter = 0;
            for (let i = 0; i < notes.length; i++) {
                seq.push({ type: 'grammar', data: notes[i], noteIndex: i, totalNotes: notes.length });
                for (let j = 0; j < exPerNote && exCounter < exercises.length; j++) {
                    seq.push({ type: 'exercise', data: exercises[exCounter], exIndex: exCounter });
                    exCounter++;
                }
            }
        }
        return seq;
    }, [lesson]);

    const handleExerciseDone = (score) => {
        const newScores = [...scores, Math.round(score)];
        setScores(newScores);
        setExState(null); // Clear mid-exercise state when advancing
        if (seqIndex < sequence.length - 1) {
            setSeqIndex(seqIndex + 1);
        } else {
            setPhase('results');
        }
    };

    const handleSubProgress = (stateUpdate) => {
        setExState(stateUpdate);
    };

    const currentBlock = sequence[seqIndex];
    // Calculate average score
    const avgScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;

    const handleCompleteSequence = () => {
        onComplete(lesson.id, Math.round(avgScore), lesson.xpReward);
    };

    const handleRetry = () => {
        setPhase('interleaved');
        setSeqIndex(0);
        setScores([]);
    };

    const renderCurrentBlock = () => {
        if (!currentBlock) return null;

        if (currentBlock.type === 'grammar') {
            return (
                <InterleavedGrammarCard
                    lesson={lesson}
                    note={currentBlock.data}
                    noteIdx={currentBlock.noteIndex}
                    totalNotes={currentBlock.totalNotes}
                    speak={speak}
                    onNext={() => {
                        if (seqIndex < sequence.length - 1) setSeqIndex(seqIndex + 1);
                        else setPhase('results');
                    }}
                />
            );
        }

        if (currentBlock.type === 'exercise') {
            const ex = currentBlock.data;
            const props = {
                onComplete: handleExerciseDone,
                onProgress: handleSubProgress,
                savedState: exState
            };
            switch (ex.type) {
                case 'flashcard': return <FlashcardExercise exercise={ex} lesson={lesson} {...props} />;
                case 'mcq': return <MCQExercise exercise={ex} {...props} />;
                case 'fill': return <FillExercise exercise={ex} {...props} />;
                case 'listen': return <ListenExercise exercise={ex} {...props} />;
                case 'match': return <MatchExercise exercise={ex} {...props} />;
                case 'dialogue': return <DialogueExercise exercise={ex} lesson={lesson} {...props} />;
                case 'speaking': return <SpeakingExercise exercise={ex} lesson={lesson} {...props} />;
                case 'wordorder': return <WordOrderExercise exercise={ex} lesson={lesson} {...props} />;
                case 'minitext': return <MiniTextExercise exercise={ex} lesson={lesson} {...props} />;
                case 'writing': return <WritingChecker exercise={ex} lesson={lesson} onOpenAPIKey={onOpenAPIKey} onComplete={result => handleExerciseDone(result ? Math.round((result.correct / result.total) * 100) : 50)} />;
                case 'translation': return <TranslationExercise exercise={ex} {...props} />;
                case 'categorysort': return <CategorySortExercise exercise={ex} {...props} />;
                case 'conjugation': return <ConjugationExercise exercise={ex} {...props} />;
                case 'truefalse': return <TrueFalseExercise exercise={ex} {...props} />;
                case 'dictation': return <DictationExercise exercise={ex} {...props} />;
                default: return <div className="text-red-400">Neznámy typ cvičenia: {ex.type}</div>;
            }
        }
        return null;
    };

    return (
        <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <button onClick={onBack} className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 transition-all">
                    <ArrowLeft size={18} />
                </button>
                <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-bold text-white truncate">{lesson.title}</h2>
                    <p className="text-xs text-gray-400"><span className="text-indigo-400">Interleaved mod</span> · Týždeň {lesson.week} · {lesson.cefr}</p>
                </div>
                <div className="flex items-center gap-1 bg-yellow-950/40 border border-yellow-800/40 rounded-xl px-3 py-1.5">
                    <Star size={14} className="text-yellow-400" />
                    <span className="text-sm font-bold text-yellow-300">+{lesson.xpReward}</span>
                </div>
            </div>

            {/* Progress bar (interleaved) */}
            {phase === 'interleaved' && (
                <div className="mb-6">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>{currentBlock?.type === 'grammar' ? 'Teória' : exName(currentBlock?.data, currentBlock?.exIndex)}</span>
                        <span>Krok {seqIndex + 1} / {sequence.length}</span>
                    </div>
                    <div className="flex gap-1.5">
                        {sequence.map((step, i) => {
                            let color = 'bg-gray-800';
                            if (i < seqIndex) color = step.type === 'grammar' ? 'bg-violet-700' : 'bg-emerald-500';
                            else if (i === seqIndex) color = step.type === 'grammar' ? 'bg-violet-500' : 'bg-indigo-500';
                            else color = step.type === 'grammar' ? 'bg-gray-700' : 'bg-gray-800';

                            return (
                                <div
                                    key={i}
                                    className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${color}`}
                                    title={step.type === 'grammar' ? 'Teória' : 'Cvičenie'}
                                />
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Content */}
            {phase === 'interleaved' && (
                <div>
                    {currentBlock?.type === 'exercise' && (
                        <StudyNudge exerciseType={currentBlock?.data?.type} phaseInExercise={currentBlock?.exIndex} />
                    )}
                    {renderCurrentBlock()}
                </div>
            )}

            {phase === 'lessontest' && (
                <LessonTest
                    lesson={lesson}
                    onComplete={(score) => handleCompleteSequence()}
                    onSkip={() => handleCompleteSequence()}
                />
            )}

            {phase === 'results' && (
                <ResultsScreen
                    lesson={lesson}
                    scores={scores} // This maps sequentially to lesson.exercises now!
                    avgScore={avgScore}
                    onComplete={handleCompleteSequence}
                    onRetry={handleRetry}
                    onStartTest={() => setPhase('lessontest')}
                    onNavigate={onNavigate}
                />
            )}
        </div>
    );
}
