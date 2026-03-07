import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Square, Rewind, FastForward } from 'lucide-react';

const SPEED_OPTIONS = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];

function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
}

function ProgressRing({ progress, currentTime, duration, size = 200 }) {
    const stroke = 8;
    const r = (size - stroke) / 2;
    const circ = 2 * Math.PI * r;
    const offset = circ - Math.max(0, Math.min(1, progress)) * circ;

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="absolute top-0 left-0 -rotate-90">
                <defs>
                    <linearGradient id="audio-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                </defs>
                <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
                <circle
                    cx={size / 2} cy={size / 2} r={r}
                    fill="none" stroke="url(#audio-grad)"
                    strokeWidth={stroke} strokeLinecap="round"
                    strokeDasharray={circ} strokeDashoffset={offset}
                    // The CSS transition masks the 250ms gap between onTimeUpdate events 
                    style={{ transition: 'stroke-dashoffset 0.3s linear' }}
                />
            </svg>
            <div className="z-10 flex flex-col items-center gap-0.5 select-none">
                <span className="text-4xl font-black tabular-nums tracking-tight text-white">{formatTime(currentTime)}</span>
                <span className="text-xs text-gray-500 tracking-widest">/ {formatTime(duration)}</span>
            </div>
        </div>
    );
}

export function LessonAudioPlayer({ src, title, compact = false }) {
    const audioRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [speedIdx, setSpeedIdx] = useState(2);

    const progress = duration > 0 ? currentTime / duration : 0;

    // Sync speed when selection changes
    useEffect(() => {
        if (audioRef.current) audioRef.current.playbackRate = SPEED_OPTIONS[speedIdx];
    }, [speedIdx]);

    // Handle play/pause toggle
    const togglePlay = () => {
        const el = audioRef.current;
        if (!el) return;
        if (playing) {
            el.pause();
        } else {
            setPlaying(true);
            el.play().catch(e => {
                console.error("Audio play failed:", e);
                setPlaying(false);
            });
        }
    };

    // Handle manual stopping
    const stop = () => {
        const el = audioRef.current;
        if (!el) return;
        el.pause();
        el.currentTime = 0;
        setPlaying(false);
        // Explicitly update React state so the UI resets
        setCurrentTime(0);
    };

    // Handle jumping 10s forward/backward
    const skip = (delta) => {
        const el = audioRef.current;
        if (!el) return;
        const newTime = Math.max(0, Math.min(el.duration || 0, el.currentTime + delta));
        el.currentTime = newTime;
        setCurrentTime(newTime);
    };

    // Handle clicking on the seekbar
    const handleSeek = (e) => {
        const el = audioRef.current;
        if (!el || !duration) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const fraction = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const newTime = fraction * duration;
        el.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const cycleSpeed = () => setSpeedIdx((i) => (i + 1) % SPEED_OPTIONS.length);

    // Use the native HTML5 audio event for tracking
    const handleTimeUpdate = (e) => {
        setCurrentTime(e.target.currentTime);
    };

    return (
        <div className={`w-full shrink-0 flex flex-col items-center bg-gray-900 border border-gray-800 rounded-3xl shadow-2xl ${compact ? 'gap-3 p-4' : 'gap-5 p-6'}`}>
            {title && (
                <div className="text-center">
                    <p className={`text-gray-500 uppercase tracking-widest mb-1 ${compact ? 'text-[10px]' : 'text-xs'}`}>Audio lekcia</p>
                    <p className={`text-white font-bold leading-snug line-clamp-2 ${compact ? 'text-sm' : 'text-base'}`}>{title}</p>
                </div>
            )}

            <ProgressRing progress={progress} currentTime={currentTime} duration={duration} size={compact ? 140 : 200} />

            <button onClick={cycleSpeed} className={`bg-gray-800 hover:bg-gray-700 border border-gray-700 text-emerald-400 font-bold px-4 rounded-full transition-shadow hover:shadow-lg ${compact ? 'text-xs py-1' : 'text-sm py-1.5'}`}>
                {SPEED_OPTIONS[speedIdx]}×
            </button>

            {/* Graphical Seekbar */}
            <div className={`w-full bg-gray-800 rounded-full cursor-pointer overflow-hidden transform hover:scale-y-110 transition-transform ${compact ? 'h-1.5' : 'h-2'}`} onClick={handleSeek}>
                <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500"
                    style={{ width: `${progress * 100}%`, transition: 'width 0.3s linear' }}
                />
            </div>

            {/* Controls row */}
            <div className={`flex items-center ${compact ? 'gap-2' : 'gap-4'}`}>
                <button onClick={() => skip(-10)} title="−10s" className={`rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-all ${compact ? 'p-2' : 'p-3'}`}>
                    <Rewind className={compact ? 'w-4 h-4' : 'w-5 h-5'} />
                </button>
                <button onClick={stop} title="Stop" className={`rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-all ${compact ? 'p-2' : 'p-3'}`}>
                    <Square className={compact ? 'w-4 h-4' : 'w-5 h-5'} />
                </button>
                <button onClick={togglePlay} className={`rounded-full text-white shadow-lg bg-gradient-to-br from-indigo-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 shadow-indigo-900/50 transition-all ${compact ? 'p-3' : 'p-5'}`}>
                    {playing ? <Pause className={`fill-current ${compact ? 'w-5 h-5' : 'w-7 h-7'}`} /> : <Play className={`fill-current ml-0.5 ${compact ? 'w-5 h-5' : 'w-7 h-7'}`} />}
                </button>
                <button onClick={() => skip(10)} title="+10s" className={`rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-all ${compact ? 'p-2' : 'p-3'}`}>
                    <FastForward className={compact ? 'w-4 h-4' : 'w-5 h-5'} />
                </button>
            </div>

            {/* The invisible audio brain */}
            <audio
                ref={audioRef}
                src={src}
                preload="metadata"
                onLoadedMetadata={(e) => setDuration(e.target.duration)}
                onTimeUpdate={handleTimeUpdate}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onEnded={() => setPlaying(false)}
            />
        </div>
    );
}
