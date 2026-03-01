import React, { useState, useCallback } from 'react';
import { STORIES } from '../data/stories';
import { useTTS } from '../hooks/useTTS';
import { useProgress } from '../hooks/useProgress';
import {
    Volume2, ChevronRight, BookmarkPlus, BookmarkCheck,
    CheckCircle, Brain, ArrowLeft, Trophy, Play, Square, X,
    Eye, EyeOff, Loader2
} from 'lucide-react';
import { generateGrammarCard } from '../hooks/useAI';
import GrammarCard from '../components/GrammarCard';

// ─── CONSTANTS ─────────────────────────────────────────────────────────────────
const SLUG_MAP = {
    story_01: 'story_01_der_erste_tag',
    story_02: 'story_02_die_familie',
    story_03: 'story_03_ein_tag_in_wien',
    story_04: 'story_04_im_restaurant',
    story_05: 'story_05_am_bahnhof',
    story_06: 'story_06_der_schatten_im_garten',
};
const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5];

// ─── READING PHASE ─────────────────────────────────────────────────────────────
function ReadingPhase({ story, onStartQuiz, onMarkVocab, generatedWords, onSaveGenerated }) {
    const { speak, speakStory, stop, speaking } = useTTS();
    const storyWords = { ...story.words, ...generatedWords };
    const [activeWord, setActiveWord] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [savedWords, setSavedWords] = useState(new Set());
    const [revealedSks, setRevealedSks] = useState(new Set());
    const [playerState, setPlayerState] = useState('idle'); // 'idle' | 'playing' | 'paused'
    const [speed, setSpeed] = useState(1);
    const audioRef = React.useRef(null);

    // ── Audio: load or reuse the <Audio> element ──────────────────────────────
    const ensureAudio = () => {
        if (audioRef.current) return audioRef.current;
        // Prefer the audioFile field stored in story data (AI-generated stories),
        // then SLUG_MAP for the original 5 stories, then bare id as last resort.
        const audioPath = story.audioFile || `/audio/stories/${SLUG_MAP[story.id] || story.id}.mp3`;
        const audio = new Audio(audioPath);
        audio.onended = () => setPlayerState('idle');
        audio.onerror = () => {
            // MP3 missing — silent TTS fallback
            audioRef.current = null;
            setPlayerState('playing');
            speakStory(story.sentences);
        };
        audioRef.current = audio;
        return audio;
    };

    const handlePlay = () => {
        if (playerState === 'playing') return;
        const audio = ensureAudio();
        audio.playbackRate = speed;
        audio.play().then(() => setPlayerState('playing')).catch(() => { });
    };

    const handlePause = () => {
        if (audioRef.current) audioRef.current.pause();
        else if (speaking) window.speechSynthesis?.pause();
        setPlayerState('paused');
    };

    const handleStop = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        stop();
        setPlayerState('idle');
    };

    const handleSpeed = (s) => {
        setSpeed(s);
        if (audioRef.current) audioRef.current.playbackRate = s; // live — no restart needed
    };

    // ── Word interactions ─────────────────────────────────────────────────────
    const handleWordClick = useCallback(async (token, sentenceDe) => {
        const clean = token.replace(/[.,!?;:"„"()\-]/g, '').trim();
        setActiveWord(clean);

        if (!storyWords[clean]) {
            setIsGenerating(true);
            try {
                const generatedData = await generateGrammarCard({ word: clean, sentence: sentenceDe });
                onSaveGenerated(clean, generatedData);
            } catch (err) {
                console.error("AI Error generating card:", err);
            } finally {
                setIsGenerating(false);
            }
        }
    }, [storyWords, story.id, onSaveGenerated]);

    const handleSaveWord = useCallback((word, data) => {
        if (data) onMarkVocab(data.sk || word, false);
        setSavedWords(prev => new Set([...prev, word]));
    }, [onMarkVocab]);

    const activeData = activeWord ? (storyWords[activeWord] || null) : null;

    return (
        <div className="max-w-5xl mx-auto space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between gap-3">
                <div>
                    <h2 className="text-xl font-bold text-white">{story.title}</h2>
                    <p className="text-sm text-gray-500">{story.titleSk} · {story.cefr} · Klikni na slovo pre gramatiku</p>
                </div>
                <button
                    onClick={() => {
                        if (revealedSks.size === story.sentences.length) {
                            setRevealedSks(new Set());
                        } else {
                            setRevealedSks(new Set(story.sentences.map((_, i) => i)));
                        }
                    }}
                    className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-700 text-gray-400 hover:text-indigo-300 hover:border-indigo-700/50 transition-colors"
                >
                    {revealedSks.size === story.sentences.length ? <EyeOff size={14} /> : <Eye size={14} />}
                    {revealedSks.size === story.sentences.length ? 'Skryť preklady' : 'Ukázať všetky preklady'}
                </button>
            </div>

            {/* Story image */}
            {story.image && (
                <div className="rounded-2xl overflow-hidden h-48 sm:h-64">
                    <img src={story.image} alt={story.title} className="w-full h-full object-cover" />
                </div>
            )}

            {/* ── Audio Player ────────────────────────────────────────────── */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl px-5 py-4 flex items-center gap-4 flex-wrap">

                {/* Status label */}
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">
                        {playerState === 'playing'
                            ? 'Hrá celý príbeh...'
                            : playerState === 'paused'
                                ? 'Pozastavené'
                                : 'Počúvať celý príbeh'}
                    </p>
                    <p className="text-xs text-gray-500">{story.sentences.length} viet</p>
                </div>

                {/* Transport: Play / Pause / Stop */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={handlePlay}
                        disabled={playerState === 'playing'}
                        title="Prehrať"
                        className="w-10 h-10 rounded-full bg-indigo-700 hover:bg-indigo-600 disabled:opacity-30 disabled:cursor-default flex items-center justify-center transition-all"
                    >
                        <Play size={15} className="text-white ml-0.5" />
                    </button>

                    <button
                        onClick={handlePause}
                        disabled={playerState !== 'playing'}
                        title="Pozastaviť"
                        className="w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-30 disabled:cursor-default flex items-center justify-center transition-all"
                    >
                        <svg width="11" height="13" viewBox="0 0 11 13" fill="white">
                            <rect x="0" y="0" width="3.5" height="13" rx="1.2" />
                            <rect x="6.5" y="0" width="3.5" height="13" rx="1.2" />
                        </svg>
                    </button>

                    <button
                        onClick={handleStop}
                        disabled={playerState === 'idle'}
                        title="Zastaviť a vrátiť na začiatok"
                        className="w-10 h-10 rounded-full bg-gray-700 hover:bg-red-700 disabled:opacity-30 disabled:cursor-default flex items-center justify-center transition-all"
                    >
                        <Square size={12} className="text-white fill-white" />
                    </button>
                </div>

                {/* Speed control */}
                <div className="flex items-center gap-1.5">
                    <span className="text-xs text-gray-500 mr-0.5">Rýchlosť:</span>
                    {SPEEDS.map(s => (
                        <button
                            key={s}
                            onClick={() => handleSpeed(s)}
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${speed === s
                                ? 'bg-indigo-700 text-white'
                                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                                }`}
                        >
                            {s === 1 ? '1×' : `${s}×`}
                        </button>
                    ))}
                </div>

                {/* Saved word count */}
                {savedWords.size > 0 && (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                        <BookmarkCheck size={13} />
                        <span>{savedWords.size} uložených</span>
                    </div>
                )}
            </div>

            {/* ── Two-column layout: story text + grammar card ─────────────── */}
            <div className="flex gap-5 items-start">

                {/* LEFT: Story text */}
                <div className={`bg-gray-900 border border-gray-800 rounded-3xl p-6 space-y-5 transition-all ${activeWord ? 'flex-1 min-w-0' : 'w-full'}`}>
                    {story.sentences.map((sentence, si) => (
                        <div key={si} className="flex items-start gap-2.5 group">
                            <button
                                onClick={() => speak(sentence.de)}
                                className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-gray-800 hover:bg-indigo-700 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                                title="Prehrať vetu"
                            >
                                <Volume2 size={11} className="text-indigo-300" />
                            </button>
                            <div className="flex-1 min-w-0">
                                <p className="text-base text-white leading-relaxed flex flex-wrap gap-x-1">
                                    {sentence.de.split(' ').map((token, ti) => {
                                        const clean = token.replace(/[.,!?;:"„"()\-]/g, '').trim();
                                        const hasGrammar = !!storyWords[clean];
                                        const isSaved = savedWords.has(clean);
                                        const isActiveGrammar = activeWord === clean;

                                        return (
                                            <span key={ti} className="relative inline-block">
                                                <span
                                                    onClick={() => handleWordClick(token, sentence.de)}
                                                    className={`cursor-pointer rounded px-0.5 transition-all select-none leading-7 ${isActiveGrammar
                                                        ? 'bg-indigo-700 text-white'
                                                        : hasGrammar
                                                            ? isSaved
                                                                ? 'text-emerald-400 underline decoration-dotted decoration-emerald-600'
                                                                : 'text-white underline decoration-dotted decoration-indigo-500 hover:bg-indigo-900/40'
                                                            : 'text-white hover:bg-gray-800/60'
                                                        }`}
                                                >
                                                    {token}
                                                </span>
                                            </span>
                                        );
                                    })}
                                </p>

                                {revealedSks.has(si) ? (
                                    <p className="text-sm text-indigo-300 mt-2 font-medium bg-indigo-900/20 px-3 py-2 rounded-lg inline-block border border-indigo-500/20 animate-in fade-in slide-in-from-top-1">
                                        {sentence.sk}
                                    </p>
                                ) : (
                                    <button
                                        onClick={() => setRevealedSks(prev => new Set([...prev, si]))}
                                        className="mt-1.5 flex items-center gap-1.5 text-xs text-gray-600 hover:text-indigo-400 font-medium transition-colors group/reveal"
                                    >
                                        <Eye size={12} className="group-hover/reveal:scale-110 transition-transform" />
                                        Ukázať preklad
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Legend */}
                    <div className="flex gap-4 text-[11px] text-gray-600 pt-2 border-t border-gray-800">
                        <span><span className="underline decoration-dotted decoration-indigo-500 text-white">slovo</span> = gramatická karta</span>
                        <span><span className="text-emerald-400 underline decoration-dotted">slovo</span> = uložené</span>
                    </div>
                </div>

                {/* RIGHT: Grammar card (inline, not overlay) */}
                {activeWord && (
                    <div className="w-72 flex-shrink-0 sticky top-6">
                        <GrammarCard
                            word={activeWord}
                            data={activeData}
                            loading={isGenerating}
                            onSave={handleSaveWord}
                            saved={savedWords.has(activeWord)}
                            onClose={() => setActiveWord(null)}
                        />
                    </div>
                )}
            </div>

            {/* Start Quiz */}
            <button
                onClick={onStartQuiz}
                className="w-full btn-primary py-4 flex items-center justify-center gap-2 font-bold text-base rounded-2xl"
            >
                Rozumel/a som — spustiť kvíz
                <ChevronRight size={20} />
            </button>
        </div>
    );
}

// ─── QUIZ PHASE ────────────────────────────────────────────────────────────────
function QuizPhase({ story, onDone, onBack }) {
    const [qIndex, setQIndex] = useState(0);
    const [selected, setSelected] = useState(null);
    const [confirmed, setConfirmed] = useState(false);
    const [score, setScore] = useState(0);
    // Ref tracks score synchronously — fixes stale-closure double-count bug
    // where the last correct answer was added twice (once in setState, once in handleNext)
    const scoreRef = React.useRef(0);

    const q = story.quiz[qIndex];

    const handleConfirm = () => {
        if (selected === null) return;
        if (selected === q.answer) {
            scoreRef.current += 1;
            setScore(scoreRef.current); // update display
        }
        setConfirmed(true);
    };

    const handleNext = () => {
        if (qIndex < story.quiz.length - 1) {
            setQIndex(i => i + 1);
            setSelected(null);
            setConfirmed(false);
        } else {
            onDone(scoreRef.current); // always accurate — no double-count
        }
    };

    return (
        <div className="max-w-xl mx-auto space-y-6">
            <div className="flex items-center gap-3">
                <button onClick={onBack} className="text-gray-500 hover:text-white transition-colors">
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h2 className="text-lg font-bold text-white">Kvíz — {story.title}</h2>
                    <p className="text-sm text-gray-500">Otázka {qIndex + 1} / {story.quiz.length}</p>
                </div>
            </div>

            <div className="flex gap-1">
                {story.quiz.map((_, i) => (
                    <div key={i} className={`flex-1 h-1.5 rounded-full transition-all ${i < qIndex ? 'bg-emerald-500' : i === qIndex ? 'bg-indigo-500' : 'bg-gray-800'}`} />
                ))}
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <p className="text-white font-semibold text-lg">{q.question}</p>
            </div>

            <div className="space-y-2">
                {q.options.map((opt, i) => {
                    let cls = 'w-full text-left rounded-2xl border px-5 py-4 text-sm font-medium transition-all flex items-center gap-2 ';
                    if (!confirmed) {
                        cls += selected === i ? 'border-indigo-500 bg-indigo-900/50 text-white' : 'border-gray-700 bg-gray-900 text-gray-300 hover:border-gray-600 hover:bg-gray-800/60';
                    } else {
                        if (i === q.answer) cls += 'border-emerald-500 bg-emerald-900/30 text-emerald-300';
                        else if (i === selected && i !== q.answer) cls += 'border-red-700 bg-red-950/30 text-red-400';
                        else cls += 'border-gray-800 bg-gray-900 text-gray-600 opacity-40';
                    }
                    return (
                        <button key={i} className={cls} onClick={() => !confirmed && setSelected(i)} disabled={confirmed}>
                            {confirmed && i === q.answer && <CheckCircle size={14} className="text-emerald-400 flex-shrink-0" />}
                            {opt}
                        </button>
                    );
                })}
            </div>

            {confirmed && q.explanation && (
                <div className="bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 flex items-start gap-2 text-sm">
                    <Brain size={15} className="text-indigo-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300">{q.explanation}</p>
                </div>
            )}

            {!confirmed ? (
                <button onClick={handleConfirm} disabled={selected === null} className="w-full btn-primary py-4 font-bold disabled:opacity-40">
                    Potvrdiť
                </button>
            ) : (
                <button onClick={handleNext} className="w-full btn-primary py-4 flex items-center justify-center gap-2 font-bold">
                    {qIndex < story.quiz.length - 1 ? 'Ďalšia otázka' : 'Zobraziť výsledok'}
                    <ChevronRight size={18} />
                </button>
            )}
        </div>
    );
}

// ─── DONE PHASE ────────────────────────────────────────────────────────────────
function DonePhase({ story, score, onBack, onRestart }) {
    const pct = Math.round((score / story.quiz.length) * 100);
    return (
        <div className="max-w-xl mx-auto space-y-6 text-center">
            <div className="text-6xl">{pct >= 80 ? '🏆' : pct >= 60 ? '👍' : '💪'}</div>
            <div>
                <h2 className="text-2xl font-bold text-white">{story.title} — dokončené!</h2>
                <p className={`text-5xl font-black mt-2 ${pct >= 80 ? 'text-emerald-400' : pct >= 60 ? 'text-amber-400' : 'text-rose-400'}`}>{pct}%</p>
                <p className="text-gray-400 text-sm mt-1">{score} / {story.quiz.length} správnych odpovedí</p>
            </div>
            <div className="bg-indigo-950/30 border border-indigo-800/40 rounded-2xl p-4 text-sm text-indigo-300">
                Slová, ktoré si klikol/a počas čítania, sú teraz v tvojom <strong>Trénerovi slovíčok</strong> a SRS ich zaradí do pravidelného opakovania.
            </div>
            <div className="grid grid-cols-2 gap-3">
                <button onClick={onBack} className="btn-secondary py-4 font-semibold">← Výber príbehov</button>
                <button onClick={onRestart} className="btn-primary py-4 flex items-center justify-center gap-2 font-semibold">
                    <Trophy size={16} /> Čítať znova
                </button>
            </div>
        </div>
    );
}

// ─── MAIN StoryReader ──────────────────────────────────────────────────────────
export default function StoryReader({ storyId, onMarkVocab, onCompleteStory, onBack }) {
    const { progress, saveGeneratedGrammarCard } = useProgress();
    const story = STORIES.find(s => s && s.id === storyId);
    const [phase, setPhase] = useState('reading');
    const [finalScore, setFinalScore] = useState(0);
    const [savedWordsList, setSavedWordsList] = useState([]);

    if (!story) {
        return (
            <div className="max-w-xl mx-auto text-center py-20 text-gray-500">
                <p>Príbeh nenájdený.</p>
                <button onClick={onBack} className="mt-4 btn-primary">Späť</button>
            </div>
        );
    }

    if (phase === 'reading') {
        return (
            <ReadingPhase
                story={story}
                generatedWords={progress.generatedWords || {}}
                onSaveGenerated={saveGeneratedGrammarCard}
                onMarkVocab={(word, data) => {
                    onMarkVocab(word, false);
                    setSavedWordsList(prev => {
                        if (prev.some(w => w.de === word)) return prev;
                        return [...prev, { de: word, sk: data?.sk || word }];
                    });
                }}
                onStartQuiz={() => setPhase('quiz')}
            />
        );
    }

    if (phase === 'quiz') {
        return (
            <QuizPhase
                story={story}
                onBack={() => setPhase('reading')}
                onDone={(s) => {
                    setFinalScore(s);
                    setPhase('done');
                    if (onCompleteStory) onCompleteStory(story.id, story.title, s, savedWordsList);
                }}
            />
        );
    }

    return (
        <DonePhase
            story={story}
            score={finalScore}
            onBack={onBack}
            onRestart={() => setPhase('reading')}
        />
    );
}
