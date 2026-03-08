/**
 * ShadowingExercise.jsx
 *
 * An interactive shadowing exercise for ebook chapters.
 *
 * Modes:
 *  • MP3 mode  – if sentences carry startTime/endTime, seeks inside the
 *                chapter audio file and plays each segment.
 *  • TTS mode  – falls back to Web Speech API (German voice) when no
 *                timestamps are present.
 *
 * Flow per sentence:
 *   1. Play the German sentence (MP3 or TTS)
 *   2. Show a countdown equal to the sentence duration (user repeats aloud)
 *   3. Auto-advance to the next sentence
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    X, Play, Pause, SkipForward, StopCircle,
    Mic, Volume2, Settings, ChevronDown, ChevronUp
} from 'lucide-react';

// ─── Helpers ────────────────────────────────────────────────────────────────

function fmt(seconds) {
    if (!seconds || isNaN(seconds)) return '0.0';
    return seconds.toFixed(1);
}

/** Circular SVG countdown ring */
function CountdownRing({ remaining, total, size = 160 }) {
    const stroke = 8;
    const r = (size - stroke) / 2;
    const circ = 2 * Math.PI * r;
    const pct = total > 0 ? Math.max(0, Math.min(1, remaining / total)) : 0;
    const offset = circ - pct * circ;

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="absolute top-0 left-0 -rotate-90">
                <circle cx={size / 2} cy={size / 2} r={r}
                    fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={stroke} />
                <circle cx={size / 2} cy={size / 2} r={r}
                    fill="none"
                    stroke={pct > 0.4 ? '#22c55e' : pct > 0.2 ? '#eab308' : '#ef4444'}
                    strokeWidth={stroke} strokeLinecap="round"
                    strokeDasharray={circ} strokeDashoffset={offset}
                    style={{ transition: 'stroke-dashoffset 0.25s linear, stroke 0.3s' }} />
            </svg>
            <div className="z-10 flex flex-col items-center select-none">
                <span className="text-4xl font-black tabular-nums text-white">{fmt(remaining)}</span>
                <span className="text-xs text-gray-400 tracking-wider mt-0.5">sekúnd</span>
            </div>
        </div>
    );
}

// ─── Main Component ──────────────────────────────────────────────────────────

/**
 * @param {Object[]} sentences  – chapter.sentences array from ebooks.js
 * @param {string}   audioSrc   – chapter.audioSrc (e.g. "/ebooks/.../track.mp3")
 * @param {string}   title      – chapter title (for display)
 * @param {Function} onClose    – called when user closes the overlay
 */
export default function ShadowingExercise({ sentences, audioSrc, title, onClose }) {

    // ── State ──────────────────────────────────────────────────────────────
    const [isRunning, setIsRunning]         = useState(false);
    const [isPaused, setIsPaused]           = useState(false);
    const [currentIdx, setCurrentIdx]       = useState(0);
    const [phase, setPhase]                 = useState('idle');
    // phase: 'idle' | 'speaking' | 'listening' | 'done'

    const [countdown, setCountdown]         = useState(0);
    const [totalCountdown, setTotalCountdown] = useState(0);

    const [showTranslation, setShowTranslation] = useState(false);
    const [pauseMultiplier, setPauseMultiplier]  = useState(1.2);
    const [showSettings, setShowSettings]        = useState(false);
    const [ttsAvail, setTtsAvail]                = useState(true);

    // ── Refs ───────────────────────────────────────────────────────────────
    const audioRef        = useRef(null);
    const timerRef        = useRef(null);
    const countdownRef    = useRef(null);
    const sentenceListRef = useRef(null);

    // ── Derived ────────────────────────────────────────────────────────────
    // A sentence has a usable timestamp only when the duration is >0.5s
    const sentenceUsesMP3 = useCallback((s) => {
        return !!audioSrc
            && s?.startTime !== undefined
            && s?.endTime !== undefined
            && (s.endTime - s.startTime) > 0.5;
    }, [audioSrc]);

    // True if the majority of sentences have usable timestamps (show the MP3 badge)
    const hasTimestamps = sentences.filter(s => sentenceUsesMP3(s)).length > sentences.length * 0.5;
    const useMP3        = hasTimestamps;

    const currentSentence = sentences[currentIdx] ?? null;

    // ── TTS availability check ─────────────────────────────────────────────
    useEffect(() => {
        if (!window.speechSynthesis) setTtsAvail(false);
    }, []);

    // ── Scroll active sentence into view ──────────────────────────────────
    useEffect(() => {
        const el = sentenceListRef.current?.querySelector(`[data-idx="${currentIdx}"]`);
        el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, [currentIdx]);

    // ── Compute pause duration (seconds) ──────────────────────────────────
    const getPause = useCallback((sentence) => {
        if (!sentence) return 4;
        if (sentenceUsesMP3(sentence)) {
            return Math.max(2, (sentence.endTime - sentence.startTime) * pauseMultiplier);
        }
        // TTS estimate: ~80ms per character
        return Math.max(2, Math.ceil((sentence.de?.length ?? 20) * 0.08 * pauseMultiplier));
    }, [sentenceUsesMP3, pauseMultiplier]);

    // ── Start listening phase ──────────────────────────────────────────────
    const startListening = useCallback((sentence) => {
        const dur = getPause(sentence);
        setTotalCountdown(dur);
        setCountdown(dur);
        setPhase('listening');
    }, [getPause]);

    // ── Speak via MP3 ─────────────────────────────────────────────────────
    const playMP3Segment = useCallback((sentence) => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.currentTime = sentence.startTime;
        audio.play().catch(console.error);
        setPhase('speaking');
    }, []);

    // ── Speak via TTS ─────────────────────────────────────────────────────
    const speakTTS = useCallback((sentence) => {
        if (!window.speechSynthesis) { startListening(sentence); return; }
        window.speechSynthesis.cancel();

        const utt = new SpeechSynthesisUtterance(sentence.de);
        utt.lang = 'de-DE';
        utt.rate = 0.85;

        // Pick a German voice if available
        const voices  = window.speechSynthesis.getVoices();
        const deVoice = voices.find(v => v.lang.startsWith('de'));
        if (deVoice) utt.voice = deVoice;

        utt.onend = () => startListening(sentence);
        utt.onerror = () => startListening(sentence);

        window.speechSynthesis.speak(utt);
        setPhase('speaking');
    }, [startListening]);

    // ── Dispatch to correct TTS/MP3 ───────────────────────────────────────
    const speakCurrent = useCallback((idx) => {
        const sentence  = sentences[idx];
        if (!sentence) return;

        if (sentenceUsesMP3(sentence)) {
            // If previous sentence has the exact same segment range, don't replay
            // the audio — jump straight to the listening phase so the user still
            // repeats each logical sentence individually.
            const prev = sentences[idx - 1];
            const sameSegment = prev
                && sentenceUsesMP3(prev)
                && prev.startTime === sentence.startTime
                && prev.endTime   === sentence.endTime;

            if (sameSegment) {
                startListening(sentence);
            } else {
                playMP3Segment(sentence);
            }
        } else {
            speakTTS(sentence);
        }
    }, [sentences, sentenceUsesMP3, playMP3Segment, speakTTS, startListening]);
    // ── MP3 timeupdate — detect end of sentence ────────────────────────────
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const onTimeUpdate = () => {
            const s = sentences[currentIdx];
            if (!s || phase !== 'speaking') return;
            if (!sentenceUsesMP3(s)) return;  // TTS handles its own end
            // Only trigger if we've actually passed the end (not immediately at start)
            if (audio.currentTime >= s.startTime + 0.1 && audio.currentTime >= s.endTime - 0.08) {
                audio.pause();
                startListening(s);
            }
        };

        audio.addEventListener('timeupdate', onTimeUpdate);
        return () => audio.removeEventListener('timeupdate', onTimeUpdate);
    }, [currentIdx, phase, useMP3, sentences, startListening]);

    // ── Countdown tick ────────────────────────────────────────────────────
    useEffect(() => {
        if (phase !== 'listening' || isPaused) return;

        if (countdown <= 0) {
            const next = currentIdx + 1;
            if (next < sentences.length) {
                setCurrentIdx(next);
                setPhase('idle');
            } else {
                setPhase('done');
                setIsRunning(false);
            }
            return;
        }

        countdownRef.current = setTimeout(() => setCountdown(c => parseFloat((c - 0.1).toFixed(1))), 100);
        return () => clearTimeout(countdownRef.current);
    }, [phase, countdown, isPaused, currentIdx, sentences.length]);

    // ── Auto-speak when phase becomes idle while running ──────────────────
    useEffect(() => {
        if (!isRunning || isPaused || phase !== 'idle') return;
        speakCurrent(currentIdx);
    }, [isRunning, isPaused, phase, currentIdx, speakCurrent]);

    // ── Controls ─────────────────────────────────────────────────────────
    const handleStart = () => {
        setCurrentIdx(0);
        setPhase('idle');
        setIsPaused(false);
        setIsRunning(true);
    };

    const handleStop = () => {
        window.speechSynthesis?.cancel();
        audioRef.current?.pause();
        clearTimeout(countdownRef.current);
        setIsRunning(false);
        setIsPaused(false);
        setPhase('idle');
        setCurrentIdx(0);
    };

    const handlePause = () => {
        if (phase === 'speaking') {
            if (useMP3) audioRef.current?.pause();
            else window.speechSynthesis?.pause();
        }
        clearTimeout(countdownRef.current);
        setIsPaused(true);
    };

    const handleResume = () => {
        setIsPaused(false);
        if (phase === 'speaking') {
            if (useMP3) audioRef.current?.play().catch(console.error);
            else window.speechSynthesis?.resume();
        }
        // countdown phase resumes automatically via useEffect
    };

    const handleSkip = () => {
        window.speechSynthesis?.cancel();
        audioRef.current?.pause();
        clearTimeout(countdownRef.current);
        const next = currentIdx + 1;
        if (next < sentences.length) {
            setCurrentIdx(next);
            setPhase('idle');
            setIsPaused(false);
        } else {
            setPhase('done');
            setIsRunning(false);
        }
    };

    // ── Cleanup on unmount ────────────────────────────────────────────────
    useEffect(() => {
        return () => {
            window.speechSynthesis?.cancel();
            audioRef.current?.pause();
            clearTimeout(countdownRef.current);
        };
    }, []);

    // ── Render helpers ────────────────────────────────────────────────────
    const phaseLabel = () => {
        if (!isRunning)           return null;
        if (isPaused)             return { icon: <Pause size={16}/>, text: 'Pozastavené', cls: 'text-yellow-400' };
        if (phase === 'speaking') return { icon: <Volume2 size={16}/>, text: 'Počúvaj…', cls: 'text-indigo-400' };
        if (phase === 'listening')return { icon: <Mic size={16}/>, text: 'Opakuj nahlas!', cls: 'text-emerald-400' };
        if (phase === 'done')     return { icon: null, text: 'Hotovo!', cls: 'text-emerald-400' };
        return null;
    };

    const label = phaseLabel();

    // ─────────────────────────────────────────────────────────────────────
    return (
        <div className="fixed inset-0 z-[200] flex flex-col bg-gray-950/95 backdrop-blur-md overflow-hidden">

            {/* Hidden MP3 element */}
            {audioSrc && (
                <audio ref={audioRef} src={audioSrc} preload="auto" />
            )}

            {/* ── Header ─────────────────────────────────────────────────── */}
            <div className="flex-shrink-0 flex items-center justify-between px-6 py-4
                            bg-gray-900 border-b border-gray-800 shadow-xl">
                <div className="flex items-center gap-3">
                    <Mic className="text-emerald-400" size={22} />
                    <div>
                        <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Shadowing</p>
                        <p className="text-sm font-semibold text-white line-clamp-1">{title}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {/* Mode badge */}
                    <span className={`hidden sm:inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full border
                        ${useMP3
                            ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300'
                            : 'bg-amber-500/10 border-amber-500/30 text-amber-300'}`}>
                        {useMP3 ? '🎵 Originál MP3' : '🔊 TTS hlas'}
                    </span>

                    {/* Settings toggle */}
                    <button onClick={() => setShowSettings(s => !s)}
                        className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-all">
                        <Settings size={18} />
                    </button>

                    {/* Close */}
                    <button onClick={onClose}
                        className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-all">
                        <X size={20} />
                    </button>
                </div>
            </div>

            {/* ── Settings panel ─────────────────────────────────────────── */}
            {showSettings && (
                <div className="flex-shrink-0 flex flex-wrap items-center gap-6 px-6 py-4
                                bg-gray-900/80 border-b border-gray-800 text-sm">

                    <div className="flex items-center gap-3">
                        <span className="text-gray-400 font-medium">Pauza na opakovanie:</span>
                        <div className="flex gap-1">
                            {[
                                { label: '×1.0', val: 1.0 },
                                { label: '×1.2', val: 1.2 },
                                { label: '×1.5', val: 1.5 },
                                { label: '×2.0', val: 2.0 },
                            ].map(opt => (
                                <button key={opt.val}
                                    onClick={() => setPauseMultiplier(opt.val)}
                                    className={`px-3 py-1.5 rounded-lg font-bold transition-all
                                        ${pauseMultiplier === opt.val
                                            ? 'bg-emerald-600 text-white'
                                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                        <span className="text-gray-500 text-xs">kratšia veta = kratšia pauza</span>
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer select-none">
                        <div onClick={() => setShowTranslation(v => !v)}
                            className={`w-10 h-5 rounded-full transition-colors ${showTranslation ? 'bg-indigo-600' : 'bg-gray-700'}`}>
                            <div className={`w-4 h-4 rounded-full bg-white mt-0.5 transition-transform shadow
                                ${showTranslation ? 'translate-x-5' : 'translate-x-0.5'}`} />
                        </div>
                        <span className="text-gray-300 font-medium">Zobraziť preklad</span>
                    </label>
                </div>
            )}

            {/* ── Body ───────────────────────────────────────────────────── */}
            <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-0 overflow-hidden">

                {/* LEFT – sentence list */}
                <div ref={sentenceListRef}
                    className="w-full lg:w-[40%] lg:max-w-sm xl:max-w-md
                               h-40 lg:h-full overflow-y-auto
                               border-b lg:border-b-0 lg:border-r border-gray-800
                               bg-gray-900/40 custom-scrollbar">
                    <div className="p-4 space-y-1">
                        {sentences.map((s, idx) => {
                            const isActive  = idx === currentIdx;
                            const isDone    = isRunning && idx < currentIdx;
                            return (
                                <div key={idx}
                                    data-idx={idx}
                                    onClick={() => {
                                        if (!isRunning) return;
                                        window.speechSynthesis?.cancel();
                                        audioRef.current?.pause();
                                        clearTimeout(countdownRef.current);
                                        setCurrentIdx(idx);
                                        setPhase('idle');
                                        setIsPaused(false);
                                    }}
                                    className={`px-4 py-2.5 rounded-xl text-sm leading-snug transition-all
                                        ${isActive
                                            ? 'bg-emerald-900/40 border border-emerald-500/40 text-emerald-100 font-semibold shadow-lg'
                                            : isDone
                                                ? 'text-gray-600'
                                                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/40 cursor-pointer'}`}>
                                    <span className="font-bold text-xs mr-2 opacity-50">{idx + 1}.</span>
                                    {s.de}
                                    {showTranslation && (
                                        <div className="text-xs text-gray-500 mt-0.5">{s.sk}</div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* RIGHT – active sentence + controls */}
                <div className="flex-1 flex flex-col items-center justify-center gap-6 p-6 lg:p-10 overflow-y-auto">

                    {/* ── Not started ──────────────────────────────────── */}
                    {!isRunning && phase !== 'done' && (
                        <div className="flex flex-col items-center gap-6 text-center max-w-lg">
                            <div className="w-20 h-20 rounded-full bg-emerald-900/30 border border-emerald-500/30
                                            flex items-center justify-center">
                                <Mic className="text-emerald-400" size={36} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-white mb-2">Shadowing cvičenie</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Počúvaš každú vetu, potom ju nahlas zopakuješ.
                                    {useMP3
                                        ? ' Použije sa originálny zvuk z MP3.'
                                        : ' Použije sa syntetický nemecký hlas (TTS).'}
                                </p>
                                {!hasTimestamps && (
                                    <div className="mt-3 px-4 py-2 rounded-xl bg-amber-900/20 border border-amber-700/30 text-amber-300 text-sm">
                                        💡 Pre originálny MP3 spusti: <code className="font-mono">node scripts/generate-ebook-timestamps.mjs</code>
                                    </div>
                                )}
                            </div>
                            <button onClick={handleStart}
                                className="flex items-center gap-3 px-8 py-4 rounded-2xl
                                           bg-emerald-600 hover:bg-emerald-500 text-white font-black text-lg
                                           shadow-xl shadow-emerald-900/40 transition-all active:scale-95">
                                <Play size={22} /> Spustiť
                            </button>
                        </div>
                    )}

                    {/* ── Done ─────────────────────────────────────────── */}
                    {phase === 'done' && (
                        <div className="flex flex-col items-center gap-5 text-center">
                            <div className="text-6xl">🎉</div>
                            <h3 className="text-2xl font-black text-white">Kapitola dokončená!</h3>
                            <p className="text-gray-400">Prešiel si všetkými {sentences.length} vetami.</p>
                            <div className="flex gap-3">
                                <button onClick={handleStart}
                                    className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500
                                               text-white font-bold transition-all">
                                    Znova
                                </button>
                                <button onClick={onClose}
                                    className="px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-700
                                               text-gray-200 font-bold transition-all">
                                    Zavrieť
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ── Running ──────────────────────────────────────── */}
                    {isRunning && phase !== 'done' && currentSentence && (
                        <>
                            {/* Progress */}
                            <div className="w-full max-w-md flex items-center gap-3">
                                <span className="text-xs text-gray-500 font-bold w-8 text-right">{currentIdx + 1}</span>
                                <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 transition-all duration-300 rounded-full"
                                        style={{ width: `${((currentIdx + 1) / sentences.length) * 100}%` }} />
                                </div>
                                <span className="text-xs text-gray-500 font-bold w-8">{sentences.length}</span>
                            </div>

                            {/* Status badge */}
                            {label && (
                                <div className={`flex items-center gap-2 text-sm font-bold px-4 py-2
                                                 rounded-full border border-current/20 bg-current/10 ${label.cls}`}>
                                    {label.icon}
                                    {label.text}
                                </div>
                            )}

                            {/* Current sentence text */}
                            <div className={`w-full max-w-xl text-center px-4 transition-all duration-300
                                ${phase === 'listening' ? 'opacity-100' : 'opacity-100'}`}>
                                <p className="text-2xl md:text-3xl font-bold text-white leading-snug tracking-tight">
                                    {currentSentence.de}
                                </p>
                                {showTranslation && (
                                    <p className="mt-3 text-base text-indigo-300/80 italic">
                                        {currentSentence.sk}
                                    </p>
                                )}
                            </div>

                            {/* Countdown ring (only during listening phase) */}
                            {phase === 'listening' && !isPaused && (
                                <CountdownRing remaining={countdown} total={totalCountdown} size={160} />
                            )}

                            {/* Paused indicator */}
                            {isPaused && (
                                <div className="flex flex-col items-center gap-2 text-yellow-400">
                                    <Pause size={36} />
                                    <span className="text-sm font-bold">Pozastavené</span>
                                </div>
                            )}

                            {/* Controls */}
                            <div className="flex items-center gap-3 mt-2">
                                {/* Stop */}
                                <button onClick={handleStop} title="Zastaviť a resetovať"
                                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl
                                               bg-gray-800 hover:bg-gray-700 text-gray-300
                                               font-bold text-sm transition-all border border-gray-700">
                                    <StopCircle size={16} /> Stop
                                </button>

                                {/* Pause / Resume */}
                                {!isPaused ? (
                                    <button onClick={handlePause} title="Pozastaviť"
                                        className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl
                                                   bg-yellow-700/80 hover:bg-yellow-600 text-white
                                                   font-bold text-sm transition-all shadow-lg">
                                        <Pause size={16} /> Pauza
                                    </button>
                                ) : (
                                    <button onClick={handleResume} title="Pokračovať"
                                        className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl
                                                   bg-emerald-600 hover:bg-emerald-500 text-white
                                                   font-bold text-sm transition-all shadow-lg">
                                        <Play size={16} /> Pokračovať
                                    </button>
                                )}

                                {/* Skip */}
                                <button onClick={handleSkip} title="Preskočiť túto vetu"
                                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl
                                               bg-gray-800 hover:bg-gray-700 text-gray-300
                                               font-bold text-sm transition-all border border-gray-700">
                                    <SkipForward size={16} /> Preskočiť
                                </button>
                            </div>

                            {/* Timestamp debug info (small) */}
                            {useMP3 && currentSentence.startTime !== undefined && (
                                <p className="text-xs text-gray-600 mt-1 tabular-nums">
                                    {currentSentence.startTime.toFixed(2)}s – {currentSentence.endTime.toFixed(2)}s
                                    &nbsp;·&nbsp;trvanie {(currentSentence.endTime - currentSentence.startTime).toFixed(2)}s
                                    &nbsp;·&nbsp;pauza {getPause(currentSentence).toFixed(1)}s
                                </p>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
