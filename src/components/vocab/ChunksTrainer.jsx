import React, { useState, useEffect, useCallback } from 'react';
import { LESSONS } from '../../data/curriculum';
import { Brain, RotateCcw, ChevronLeft, ArrowRight } from 'lucide-react';
import { normalizeGerman } from '../../utils/text';

// ─── Data ──────────────────────────────────────────────────────────────────────

function buildChunkingDeck(progress) {
    const today = new Date().toISOString().slice(0, 10);
    const vocabSeen = progress.vocabSeen || {};

    const allCards = LESSONS.flatMap((l) =>
        l.vocab
            .filter((v) => v.example && v.exampleSk)
            .map((v) => {
                const chunks = v.chunks || deriveChunks(v.example, v.exampleSk, v.de);
                return {
                    lessonId: l.id,
                    lessonTitle: l.title,
                    targetWord: v.de,
                    targetSk: v.sk,
                    de: v.example,
                    sk: v.exampleSk,
                    chunks,
                };
            })
    );

    const getDaysOverdue = (card) => {
        const due = vocabSeen[card.de]?.dueDate;
        if (!due) return null;
        return Math.ceil((new Date(today) - new Date(due)) / 86400000);
    };

    const overdue = allCards
        .filter((c) => { const d = getDaysOverdue(c); return d !== null && d >= 0; })
        .sort((a, b) => (getDaysOverdue(b) || 0) - (getDaysOverdue(a) || 0));
    const unseen = allCards.filter((c) => !vocabSeen[c.de]);
    const upcoming = allCards
        .filter((c) => { const d = getDaysOverdue(c); return d !== null && d < 0; })
        .sort((a, b) => (getDaysOverdue(a) || 0) - (getDaysOverdue(b) || 0))
        .slice(0, 5);

    return [...overdue, ...unseen, ...upcoming];
}

// Split a sentence into grammatical chunks and align with Slovak
function deriveChunks(deSentence, skSentence, targetWord) {
    const deWords = deSentence.split(' ');
    const skWords = skSentence.split(' ');
    const targetNorm = normalizeGerman(targetWord || '');

    const deChunks = [];
    let i = 0;
    while (i < deWords.length) {
        const w = deWords[i];
        const wClean = w.replace(/[,!?.]/g, '').toLowerCase();

        const standalone = ['nicht', 'morgen', 'heute', 'jetzt', 'hier', 'dort', 'auch',
            'schon', 'noch', 'oft', 'immer', 'gern', 'sehr', 'aber', 'und', 'oder',
            'weil', 'dass', 'wenn', 'denn', 'ja', 'nein'];

        if (standalone.includes(wClean) || w.endsWith(',') || w.endsWith('.') || w.endsWith('!') || w.endsWith('?')) {
            deChunks.push([w]);
            i += 1;
        } else if (i + 1 < deWords.length) {
            deChunks.push([deWords[i], deWords[i + 1]]);
            i += 2;
        } else {
            deChunks.push([w]);
            i += 1;
        }
    }

    const totalDeWords = deWords.length;
    const totalSkWords = skWords.length;
    let skIndex = 0;

    return deChunks.map((group, ci) => {
        const ratio = group.length / totalDeWords;
        const skCount = Math.max(1, Math.round(ratio * totalSkWords));
        const skSlice = skWords.slice(skIndex, skIndex + skCount);
        skIndex += skCount;

        if (ci === deChunks.length - 1 && skIndex < totalSkWords) {
            skSlice.push(...skWords.slice(skIndex));
        }

        const deText = group.join(' ');
        const isTarget = group.some((wd) => normalizeGerman(wd).includes(targetNorm) && targetNorm.length > 1);

        return {
            de: deText,
            sk: skSlice.join(' '),
            isTarget,
        };
    });
}

// ─── Typewriter Component ──────────────────────────────────────────────────────
function TypewriterText({ text, speed = 40, startDelay = 0, onComplete, className, cursor = false }) {
    const [typed, setTyped] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    // Store latest onComplete in a ref so it doesn't re-trigger the typing effect
    const onCompleteRef = React.useRef(onComplete);
    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    useEffect(() => {
        setTyped('');
        setIsTyping(false);

        let timeoutId;
        let charIndex = 0;

        const typeNext = () => {
            if (charIndex < text.length) {
                setTyped(text.substring(0, charIndex + 1));
                charIndex++;
                timeoutId = setTimeout(typeNext, speed);
            } else {
                setIsTyping(false);
                if (onCompleteRef.current) {
                    // small delay before declaring complete looks more natural
                    timeoutId = setTimeout(() => {
                        if (onCompleteRef.current) onCompleteRef.current();
                    }, 200);
                }
            }
        };

        timeoutId = setTimeout(() => {
            setIsTyping(true);
            typeNext();
        }, startDelay);

        return () => clearTimeout(timeoutId);
    }, [text, speed, startDelay]);

    return (
        <span className={className}>
            {typed}
            {cursor && isTyping && (
                <span className="inline-block w-0.5 h-6 ml-0.5 bg-indigo-400 animate-pulse align-middle" />
            )}
        </span>
    );
}

// ─── Component ─────────────────────────────────────────────────────────────────
export function ChunksTrainer({ progress, onMarkVocab, onReviewVocab }) {
    const [deck, setDeck] = useState([]);
    const [idx, setIdx] = useState(0);
    const [session, setSession] = useState({ known: 0, unknown: 0 });
    const [allDone, setAllDone] = useState(false);

    // Flow State
    const [fullSentenceComplete, setFullSentenceComplete] = useState(false);
    const [activeChunkIndex, setActiveChunkIndex] = useState(-1);
    const [chunkStates, setChunkStates] = useState({}); // { [index]: { showDe: boolean, showSk: boolean } }
    const [gradingReady, setGradingReady] = useState(false);

    const resetDeck = useCallback(() => {
        const d = buildChunkingDeck(progress);
        setDeck(d);
        setIdx(0);
        setAllDone(false);
        setSession({ known: 0, unknown: 0 });

        // reset flow
        setFullSentenceComplete(false);
        setActiveChunkIndex(-1);
        setChunkStates({});
        setGradingReady(false);
    }, [progress]);

    useEffect(() => { resetDeck(); }, [resetDeck]);

    const current = deck[idx];

    // Logic to advance the chunking flow
    const handleFullSentenceTyped = useCallback(() => {
        // Wait briefly, then start showing the first chunk
        setTimeout(() => {
            setFullSentenceComplete(true);
            setActiveChunkIndex(0);
            setChunkStates(prev => ({ ...prev, 0: { showDe: true, showSk: false } }));
        }, 600);
    }, []);

    const handleChunkDeTyped = useCallback((i) => {
        // Show SK translation for this chunk after a tiny pause
        setTimeout(() => {
            setChunkStates(prev => {
                const nextState = { ...prev, [i]: { ...prev[i], showSk: true } };

                // After showing TR, move to next chunk or finish
                setTimeout(() => {
                    if (current && i + 1 < current.chunks.length) {
                        setActiveChunkIndex(i + 1);
                        setChunkStates(innerPrev => ({ ...innerPrev, [i + 1]: { showDe: true, showSk: false } }));
                    } else {
                        setActiveChunkIndex(-1); // Remove cursor
                        setGradingReady(true);
                    }
                }, 700); // Wait 700ms after translation before starting next chunk

                return nextState;
            });
        }, 300);
    }, [current]);

    const goNext = (isCorrect) => {
        setSession((s) => ({
            known: s.known + (isCorrect ? 1 : 0),
            unknown: s.unknown + (isCorrect ? 0 : 1),
        }));
        if (idx + 1 >= deck.length) {
            setAllDone(true);
        } else {
            setIdx(idx + 1);
            // Reset flow for next card
            setFullSentenceComplete(false);
            setActiveChunkIndex(-1);
            setChunkStates({});
            setGradingReady(false);
        }
    };

    const grade = (q) => {
        const fn = onReviewVocab || onMarkVocab;
        if (fn && current) fn(current.de, q);
        goNext(q >= 3);
    };

    // ───── Empty state ───
    if (deck.length === 0) {
        return (
            <div className="text-center py-20 animate-fade-in">
                <Brain size={48} className="text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">Žiadne vety na precvičenie.</p>
                <p className="text-gray-600 text-sm mt-2">Urob si lekcie s ukážkovými vetami.</p>
            </div>
        );
    }

    // ───── All done ───
    if (allDone) {
        return (
            <div className="max-w-md mx-auto text-center space-y-6 animate-fade-in">
                <div className="text-5xl">🎉</div>
                <h2 className="text-2xl font-bold text-white">Séria dokončená!</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="card border-emerald-800 bg-emerald-950/30 text-center py-5">
                        <p className="text-3xl font-black text-emerald-400">{session.known}</p>
                        <p className="text-sm text-gray-400 mt-1">Rozumel som</p>
                    </div>
                    <div className="card border-red-900 bg-red-950/20 text-center py-5">
                        <p className="text-3xl font-black text-red-400">{session.unknown}</p>
                        <p className="text-sm text-gray-400 mt-1">Nerozumel som</p>
                    </div>
                </div>
                <button onClick={resetDeck} className="w-full btn-primary flex items-center justify-center gap-2">
                    <RotateCcw size={16} /> Ďalšia séria
                </button>
            </div>
        );
    }

    const chunks = current.chunks || [];
    const vocabSeen = progress.vocabSeen || {};

    return (
        <div className="max-w-lg mx-auto animate-fade-in pb-12" style={{ minHeight: '60vh' }}>

            {/* Progress */}
            <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-500 tracking-wide font-medium">📚 {current.lessonTitle}</span>
                <span className="text-xs text-gray-500 font-medium">{idx + 1} / {deck.length}</span>
            </div>
            <div className="h-1 bg-gray-800 rounded-full overflow-hidden mb-8">
                <div className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                    style={{ width: `${(idx / deck.length) * 100}%` }} />
            </div>

            {/* Main Container */}
            <div className="space-y-8">
                {/* Top: Slovak target meaning */}
                <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-2 font-semibold">Preložiť:</p>
                    <p className="text-xl sm:text-2xl font-bold text-emerald-300 leading-relaxed shadow-sm">
                        „{current.sk}"
                    </p>
                </div>

                {/* Step 1: Type the full German Sentence */}
                <div className="min-h-16">
                    <TypewriterText
                        text={current.de}
                        speed={35}
                        cursor={!fullSentenceComplete}
                        onComplete={handleFullSentenceTyped}
                        className={`text-2xl sm:text-3xl font-bold transition-all duration-700 ${fullSentenceComplete ? 'text-gray-400' : 'text-white'
                            }`}
                    />
                </div>

                {/* Step 2: The Breakdown (Chunks) */}
                {fullSentenceComplete && (
                    <div className="space-y-4 pt-4 mt-4 border-t border-gray-800">
                        {chunks.map((chunk, i) => {
                            const state = chunkStates[i];
                            if (!state?.showDe) return null;

                            return (
                                <div key={i} className="pl-4 border-l-2 border-indigo-500/50 animate-fade-in">
                                    {/* German Chunk typed out */}
                                    <TypewriterText
                                        text={chunk.de}
                                        speed={30}
                                        cursor={activeChunkIndex === i && !state.showSk}
                                        onComplete={() => handleChunkDeTyped(i)}
                                        className={`text-2xl font-semibold ${chunk.isTarget ? 'text-indigo-400' : 'text-gray-100'
                                            }`}
                                    />

                                    {/* Slovak Translation fades in */}
                                    {state.showSk && (
                                        <p className={`text-base mt-1.5 animate-fade-in-up ${chunk.isTarget ? 'text-indigo-300/80 font-medium' : 'text-gray-400'
                                            }`}>
                                            {chunk.sk}
                                        </p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Target word badge - fades in at the end */}
                <div className={`transition-all duration-700 delay-300 ${gradingReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                    <div className="inline-flex items-center gap-2 bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-2 mt-4">
                        <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Slovíčko z lekcie:</span>
                        <span className="font-bold text-white text-sm">{current.targetWord}</span>
                        <ArrowRight size={14} className="text-gray-600" />
                        <span className="text-sm text-gray-400">{current.targetSk}</span>
                    </div>
                </div>
            </div>

            {/* ── Grading buttons ── */}
            <div className={`mt-10 transition-all duration-700 delay-500 ${gradingReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
                }`}>
                <p className="text-center text-xs text-gray-500 mb-3 uppercase tracking-wider font-semibold">Ako dobre si rozumel?</p>
                <div className="grid grid-cols-3 gap-3">
                    <button
                        onClick={() => grade(1)}
                        className="group btn-secondary border-red-900/40 hover:border-red-600 hover:bg-red-900/20 text-red-400/80 hover:text-red-400 flex flex-col items-center justify-center gap-1.5 py-4 text-sm transition-all"
                    >
                        <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-bold">Nerozumel</span>
                        <span className="text-[10px] text-gray-500">+1 deň</span>
                    </button>
                    <button
                        onClick={() => grade(3)}
                        className="btn-secondary border-amber-900/40 hover:border-amber-600 hover:bg-amber-900/20 text-amber-500/80 hover:text-amber-400 flex flex-col items-center justify-center gap-1.5 py-4 text-sm transition-all shadow-lg shadow-black/20"
                    >
                        <span className="font-bold text-base">Rozumel</span>
                        <span className="text-[10px] text-gray-500">+{vocabSeen[current?.de]?.interval || 1} d</span>
                    </button>
                    <button
                        onClick={() => grade(5)}
                        className="btn-primary bg-emerald-700 hover:bg-emerald-600 border-emerald-600 flex flex-col items-center justify-center gap-1.5 py-4 text-sm transition-all shadow-lg shadow-emerald-900/20"
                    >
                        <span className="font-bold text-base">Úplne ľahké!</span>
                        <span className="text-[10px] text-emerald-300">Dlhší interval</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
