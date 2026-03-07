import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import YouTube from 'react-youtube';
import getVideoId from 'get-video-id';
import { useProgress } from '../hooks/useProgress';
import { generateGrammarCard } from '../hooks/useAI';
import { Play, Pause, Search, Loader2, BookmarkPlus, BookmarkCheck, X, AlertCircle, Film, ChevronDown, ChevronRight, Zap } from 'lucide-react';
import { VIDEO_LIBRARY } from '../data/videoLibrary';
import { ALL_STORY_WORDS } from '../data/stories';
import { GLOBAL_NOUNS } from '../data/globalNouns';
import { parseSrt } from '../utils/parseSrt.js';
import AIVoiceModal from './AIVoiceModal.jsx';
import VideoExercises from '../components/VideoExercises.jsx';
import GrammarCard from '../components/GrammarCard.jsx';
import WalkAndTalkLesson from '../components/WalkAndTalkLesson.jsx';
import Lesson_qGBJYuCoamg from '../components/Lesson_qGBJYuCoamg.jsx';
import Lesson_4_eDoThe6qo from '../components/Lesson_4_eDoThe6qo.jsx';

const LESSON_COMPONENTS = {
    'uzNrP5ZyH0A': WalkAndTalkLesson,
    'qGBJYuCoamg': Lesson_qGBJYuCoamg,
    '4-eDoThe6qo': Lesson_4_eDoThe6qo
};

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function VideoCoach() {
    const { progress, markVocabSeen, saveGeneratedGrammarCard } = useProgress();

    const [urlInput, setUrlInput] = useState('');
    const [videoId, setVideoId] = useState('');
    const [transcript, setTranscript] = useState([]);
    const [skTranslations, setSkTranslations] = useState({});
    const [activeVideoTitle, setActiveVideoTitle] = useState('');
    const [activeVideoLevel, setActiveVideoLevel] = useState('A1');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Library collapsed state — each category starts expanded
    const [collapsedCats, setCollapsedCats] = useState({});
    const toggleCat = (cat) => setCollapsedCats(prev => ({ ...prev, [cat]: !prev[cat] }));

    // Player state
    const playerRef = useRef(null);
    const [isPlayerReady, setIsPlayerReady] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    // AI Voice Coach State
    const [segments, setSegments] = useState([]);
    const [isAIVoiceModalOpen, setIsAIVoiceModalOpen] = useState(false);
    const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
    const [currentSegmentTopic, setCurrentSegmentTopic] = useState('');
    const [currentSegmentContext, setCurrentSegmentContext] = useState('');
    const [currentSegmentTranscript, setCurrentSegmentTranscript] = useState([]);
    const [completedSegments, setCompletedSegments] = useState(new Set());
    const [rightTab, setRightTab] = useState('transcript'); // 'transcript' | 'segments' | 'exercises'

    // Exercises state
    const [videoExercises, setVideoExercises] = useState(null);
    const [exercisesLoading, setExercisesLoading] = useState(false);

    const openSegmentConversation = (segIdx) => {
        const seg = segments[segIdx];
        if (!seg) return;
        if (playerRef.current) playerRef.current.pauseVideo();
        setCurrentSegmentTopic(seg.topicDescription);
        setCurrentSegmentContext(seg.segmentContext || '');
        setCurrentSegmentTranscript(transcript.filter(t => t.offset >= seg.startTimeMs && t.offset <= seg.endTimeMs));
        setIsAIVoiceModalOpen(true);
        setCompletedSegments(prev => new Set([...prev, segIdx]));
    };

    // Dictionary state
    const storyWords = useMemo(() => {
        return {
            ...ALL_STORY_WORDS,
            ...GLOBAL_NOUNS,
            ...progress?.generatedWords
        };
    }, [progress?.generatedWords]);
    const nounColors = useMemo(() => {
        const colors = {};
        const articleToColor = {
            'der': 'text-blue-400 font-bold',
            'die': 'text-rose-400 font-bold',
            'das': 'text-emerald-400 font-bold'
        };
        const activeArticleToColor = {
            'der': 'bg-blue-600 text-white font-bold',
            'die': 'bg-rose-600 text-white font-bold',
            'das': 'bg-emerald-600 text-white font-bold'
        };

        const addWord = (w, color, activeColor) => {
            if (!w) return;
            const cleanW = w.replace(/[.,!?;:"„"()\[\]\-]/g, '').trim();
            if (cleanW && cleanW !== '-') {
                colors[cleanW] = { color, activeColor, base: color.split('-')[1] };
            }
        };

        Object.entries(storyWords).forEach(([baseWord, data]) => {
            if (data?.type === 'noun' && data?.article) {
                const color = articleToColor[data.article];
                const activeColor = activeArticleToColor[data.article];
                if (!color) return;

                addWord(baseWord, color, activeColor);
                if (data.plural) {
                    const pl = data.plural.split(' ').pop();
                    addWord(pl, color, activeColor);
                }
                if (data.cases) {
                    Object.values(data.cases).forEach(caseStr => {
                        const cw = caseStr.split(' ').pop();
                        addWord(cw, color, activeColor);
                    });
                }
            }
        });
        return colors;
    }, [storyWords]);
    const [activeWord, setActiveWord] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [savedWords, setSavedWords] = useState(new Set());

    const transcriptContainerRef = useRef(null);
    const activeLineRef = useRef(null);
    const batchFetchingRef = useRef(false);

    // Track time periodically
    useEffect(() => {
        let interval;
        if (isPlayerReady && playerRef.current && videoId) {
            interval = setInterval(async () => {
                try {
                    const time = await playerRef.current.getCurrentTime();
                    setCurrentTime(time * 1000); // Youtube API gives seconds, we need ms
                } catch (e) { }
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isPlayerReady, videoId]);

    // Auto-scroll transcript
    useEffect(() => {
        if (activeLineRef.current && transcriptContainerRef.current && !activeWord) {
            // Only auto-scroll if user isn't actively looking at the dictionary
            activeLineRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [currentTime]);

    const handleLoadVideo = async (e) => {
        e.preventDefault();
        const parsed = getVideoId(urlInput);
        if (!parsed || !parsed.id) {
            setError('Neplatná YouTube URL adresa.');
            return;
        }
        await loadVideo(parsed.id);
    };

    // ── Core video loader: checks cache first, falls back to live API ───────────
    const loadVideo = async (id, title = '', level = 'A1') => {
        setError('');
        setVideoId('');
        setIsPlayerReady(false);
        setTranscript([]);
        setSkTranslations({});
        setActiveWord(null);
        setActiveVideoTitle(title);
        setActiveVideoLevel(level);
        batchFetchingRef.current = false;

        // Reset Voice Modal states
        setSegments([]);
        setCompletedSegments(new Set());
        setIsAIVoiceModalOpen(false);
        setVideoExercises(null);
        setRightTab('transcript');

        setVideoId(id);
        setLoading(true);

        // 1️⃣ Library video with curated SRT — use it as primary transcript source
        const libraryVideo = VIDEO_LIBRARY.flatMap(c => c.videos).find(v => v.id === id);
        if (libraryVideo?.hasSrt) {
            try {
                const srtRes = await fetch(`/srt/${id}.srt`);
                if (srtRes.ok) {
                    const srtText = await srtRes.text();
                    const parsed = parseSrt(srtText);
                    if (parsed.length > 0) {
                        setTranscript(parsed);
                        // Load curated SK translations (aligned to this SRT)
                        try {
                            const skRes = await fetch(`/srt/${id}-sk.json`);
                            if (skRes.ok) {
                                const skData = await skRes.json();
                                setSkTranslations(skData);
                                batchFetchingRef.current = true; // translations complete — skip re-fetch
                            }
                        } catch (_) { /* translations unavailable — that's fine */ }
                        setLoading(false);
                        return;
                    }
                }
            } catch (_) { /* SRT load failed — fall through to cache/YouTube */ }
        }

        try {
            // 2️⃣ Try pre-processed cache (instant — 0 ms delay)
            const cacheRes = await fetch(`/api/video-database?v=${id}`);
            if (cacheRes.ok) {
                const cached = await cacheRes.json();
                if (cached.transcript && cached.transcript.length > 0) {
                    setTranscript(cached.transcript);
                    if (cached.translations) {
                        setSkTranslations(cached.translations);
                        batchFetchingRef.current = true; // mark done — no need to re-fetch
                    }
                    setLoading(false);
                    return;
                } else if (Array.isArray(cached) && cached.length > 0) {
                    setTranscript(cached);
                    setLoading(false);
                    return;
                }
            }
        } catch (_) { /* cache miss — fall through to live fetch */ }

        // 2️⃣ Live fetch from YouTube + batch translate in background
        try {
            const res = await fetch(`/api/youtube-transcript?v=${id}`);
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Nastala chyba pri načítaní tituliek.');
            }
            if (!data || data.length === 0) {
                throw new Error('Video nemá k dispozícii žiadne titulky, alebo sú zakázané.');
            }

            setTranscript(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleWordClick = async (token, sentenceDe) => {
        // Pause video when clicking a word
        if (playerRef.current) {
            playerRef.current.pauseVideo();
        }

        const clean = token.replace(/[.,!?;:"„"()\[\]\-]/g, '').trim();
        if (!clean) return;

        setActiveWord(clean);

        if (!storyWords[clean]) {
            setIsGenerating(true);
            try {
                const generatedData = await generateGrammarCard({ word: clean, sentence: sentenceDe });
                saveGeneratedGrammarCard(clean, generatedData);
            } catch (err) {
                console.error("AI Error generating card:", err);
            } finally {
                setIsGenerating(false);
            }
        }
    };

    const handleSaveWord = (word, data) => {
        if (data) markVocabSeen(data.sk || word, false);
        setSavedWords(prev => new Set([...prev, word]));
    };

    const handleLineClick = (offset) => {
        if (playerRef.current) {
            playerRef.current.seekTo(offset / 1000, true);
            playerRef.current.playVideo();
        }
    };

    const getActiveLineIndex = () => {
        if (!transcript || transcript.length === 0) return -1;
        // Find the last line whose offset is <= currentTime
        for (let i = transcript.length - 1; i >= 0; i--) {
            if (transcript[i].offset <= currentTime) {
                // Check if it's still playing this line (duration)
                // Adds a tiny buffer of 200ms
                if (currentTime < transcript[i].offset + transcript[i].duration + 200) {
                    return i;
                }
                return -1; // Between subtitles
            }
        }
        return -1;
    };

    const activeIndex = getActiveLineIndex();
    const activeData = activeWord ? (storyWords[activeWord] || null) : null;

    // ── Pre-fetch AI Voice Segments when transcript is ready ───────────
    useEffect(() => {
        if (!transcript || transcript.length === 0 || !videoId) return;
        const fetchSegments = async () => {
            try {
                const res = await fetch('/api/segment-video', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ videoId, transcript })
                });
                const data = await res.json();
                if (data.segments) {
                    setSegments(data.segments);
                }
            } catch (e) {
                console.error("Failed to load topic segments for Voice Coach", e);
            }
        };
        fetchSegments();
    }, [transcript, videoId]);

    // ── Background batch pre-translation ──────────────────────────────────────
    // Fires once when transcript loads. Sends all sentences in parallel chunks
    // of 30 so translations are cached before the user reaches each line.
    useEffect(() => {
        if (!transcript || transcript.length === 0) return;
        if (batchFetchingRef.current) return;
        batchFetchingRef.current = true;

        const CHUNK_SIZE = 30;
        const chunks = [];
        for (let i = 0; i < transcript.length; i += CHUNK_SIZE) {
            chunks.push({
                start: i,
                texts: transcript.slice(i, i + CHUNK_SIZE).map(t => t.text),
            });
        }

        const fetchChunk = async ({ start, texts }) => {
            let chunkUpdates = {};
            try {
                const res = await fetch('/api/translate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ texts, source: 'de', target: 'sk' }),
                });
                const data = await res.json();
                if (data && data.translatedTexts && data.translatedTexts.length === texts.length) {
                    data.translatedTexts.forEach((sk, i) => { if (sk) chunkUpdates[start + i] = sk; });
                    setSkTranslations(prev => ({ ...prev, ...chunkUpdates }));
                } else {
                    // Alignment mismatch fallback: translate each sentence individually
                    for (let i = 0; i < texts.length; i++) {
                        try {
                            const r = await fetch('/api/translate', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ text: texts[i], source: 'de', target: 'sk' }),
                            });
                            const d = await r.json();
                            if (d && d.translatedText) {
                                chunkUpdates[start + i] = d.translatedText;
                                setSkTranslations(prev => ({ ...prev, [start + i]: d.translatedText }));
                            }
                        } catch (e) { }
                    }
                }
            } catch (err) {
                console.error('Batch translation error at index', start, err);
            }
            return chunkUpdates;
        };

        const processAllChunks = async () => {
            let finalTranslations = {};
            const results = await Promise.all(chunks.map(fetchChunk));
            for (let res of results) {
                finalTranslations = { ...finalTranslations, ...res };
            }

            // Once everything is fully translated, hard-save to disk cache
            if (Object.keys(finalTranslations).length > 0) {
                try {
                    await fetch('/api/cache-video-translation', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            videoId,
                            transcript,
                            translations: finalTranslations
                        })
                    });
                } catch (e) {
                    console.error("Failed to permanently cache translations", e);
                }
            }
        };

        processAllChunks();
    }, [transcript, videoId]);

    // ── Lazy-load exercises when Exercises tab is activated ───────────────────
    useEffect(() => {
        if (rightTab !== 'exercises') return;
        if (!videoId || segments.length === 0) return;
        if (videoExercises || exercisesLoading) return;

        const load = async () => {
            setExercisesLoading(true);
            try {
                const res = await fetch('/api/generate-video-exercises', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ videoId, segments }),
                });
                const data = await res.json();
                if (data && data.topics) {
                    setVideoExercises(data);
                }
            } catch (e) {
                console.error('[VideoCoach] Failed to load exercises', e);
            } finally {
                setExercisesLoading(false);
            }
        };
        load();
    }, [rightTab, videoId, segments, videoExercises, exercisesLoading]);

    return (
        <div className="max-w-7xl mx-auto space-y-6">

            {/* ── Header ─────────────────────────────────────────────────────── */}
            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 sm:p-8">
                <div className="flex flex-col md:flex-row md:items-end gap-6 mb-6">
                    <div className="flex-1">
                        <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Video Coach</h1>
                        <p className="text-gray-400 text-sm">
                            Uč sa nemčinu priamo z YouTube videí — s interaktívnymi titulkami a okamžitým prekladom.
                        </p>
                    </div>

                    <form onSubmit={handleLoadVideo} className="flex-1 max-w-lg flex gap-2">
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search size={18} className="text-gray-500" />
                            </div>
                            <input
                                type="text"
                                placeholder="https://www.youtube.com/watch?v=..."
                                value={urlInput}
                                onChange={(e) => setUrlInput(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-medium text-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={!urlInput.trim() || loading}
                            className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-800 disabled:text-gray-500 text-white px-5 py-3 rounded-xl font-bold transition-all text-sm flex items-center gap-2"
                        >
                            {loading ? <Loader2 size={16} className="animate-spin" /> : 'Načítať'}
                        </button>
                    </form>
                </div>

                <div className="bg-amber-900/20 border border-amber-900/50 rounded-xl p-4 flex items-start gap-3">
                    <AlertCircle className="text-amber-500 flex-shrink-0 mt-0.5" size={18} />
                    <p className="text-xs text-amber-200/80 leading-relaxed">
                        <strong className="text-amber-400 font-bold block mb-0.5">Dôležité upozornenie:</strong>
                        Video Coach funguje iba s videami, ktoré obsahujú skryté titulky (CC). Ak video na YouTube nemá žiadnu textovú stopu (ani automaticky generovanú), študijný režim nebude fungovať.
                    </p>
                </div>
            </div>

            {/* ── Knižnica videi ─────────────────────────────────────────────── */}
            {!videoId && (
                <div className="space-y-4">
                    <div className="flex items-center gap-3 px-1">
                        <Film size={20} className="text-indigo-400" />
                        <h2 className="text-xl font-black text-white tracking-tight">Knižnica videi</h2>
                        <span className="text-xs text-gray-500 font-medium bg-gray-800 px-2 py-0.5 rounded-full">
                            {VIDEO_LIBRARY.reduce((n, c) => n + c.videos.length, 0)} videí · preložené
                        </span>
                    </div>

                    {VIDEO_LIBRARY.map((cat) => {
                        const borderColor = cat.color === 'amber' ? 'border-amber-800/50' : 'border-indigo-800/50';
                        const badgeBg = cat.color === 'amber' ? 'bg-amber-900/40 text-amber-300 border-amber-700/50' : 'bg-indigo-900/40 text-indigo-300 border-indigo-700/50';
                        const headBg = cat.color === 'amber' ? 'text-amber-400' : 'text-indigo-400';
                        const btnBg = cat.color === 'amber' ? 'bg-amber-700/80 hover:bg-amber-600 text-white' : 'bg-indigo-700/80 hover:bg-indigo-600 text-white';
                        const collapsed = !!collapsedCats[cat.category];

                        return (
                            <div key={cat.category} className={`bg-gray-900 border ${borderColor} rounded-2xl overflow-hidden`}>
                                {/* Category header */}
                                <button
                                    className="w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-800/40 transition-colors text-left"
                                    onClick={() => toggleCat(cat.category)}
                                >
                                    {collapsed
                                        ? <ChevronRight size={16} className="text-gray-500 flex-shrink-0" />
                                        : <ChevronDown size={16} className="text-gray-500 flex-shrink-0" />}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className={`font-black text-base ${headBg}`}>{cat.category}</span>
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${badgeBg}`}>{cat.level}</span>
                                            <span className="text-xs text-gray-500">{cat.videos.length} videí</span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-0.5 truncate">{cat.categoryDescription}</p>
                                    </div>
                                </button>

                                {/* Video cards grid */}
                                {!collapsed && (
                                    <div className="px-5 pb-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                                        {cat.videos.map((vid) => (
                                            <div key={vid.id} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 flex flex-col gap-3 hover:border-gray-600/70 transition-colors">
                                                <div className="flex items-start justify-between gap-2">
                                                    <p className="text-white font-bold text-sm leading-snug flex-1">{vid.title}</p>
                                                    {vid.hasSrt && (
                                                        <span title="Ručne opravené titulky" className="flex-shrink-0 text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-900/60 text-emerald-400 border border-emerald-700/50 font-semibold">✓ SRT</span>
                                                    )}
                                                </div>
                                                <p className="text-gray-400 text-xs leading-relaxed flex-1">{vid.description}</p>
                                                <div className="flex items-center justify-between gap-2">
                                                    <span className="text-gray-600 text-xs">{vid.duration}</span>
                                                    <button
                                                        onClick={() => loadVideo(vid.id, vid.title, cat.level)}
                                                        disabled={loading}
                                                        className={`${btnBg} px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all disabled:opacity-50`}
                                                    >
                                                        <Play size={11} />
                                                        Spustiť
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Back to library button when a video is active */}
            {videoId && (
                <button
                    onClick={() => { setVideoId(''); setTranscript([]); setSkTranslations({}); setError(''); setActiveVideoTitle(''); }}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                    <ChevronRight size={14} className="rotate-180" />
                    Späť do knižnice
                    {activeVideoTitle && <span className="text-gray-600">· {activeVideoTitle}</span>}
                </button>
            )}

            {error && (
                <div className="bg-rose-950/40 border border-rose-800/50 rounded-2xl p-6 text-center">
                    <p className="text-rose-400 font-medium">{error}</p>
                </div>
            )}

            {videoId && !error && transcript.length > 0 && (
                <div className="flex flex-col lg:flex-row gap-6 h-[800px] lg:h-[700px]">

                    {/* LEFT / TOP: YouTube Player */}
                    <div className="w-full lg:w-[60%] xl:w-[65%] flex flex-col gap-4">
                        <div className="bg-black rounded-3xl overflow-hidden shadow-2xl shadow-indigo-900/10 border border-gray-800 w-full pt-[56.25%] relative flex-shrink-0">
                            <YouTube
                                videoId={videoId}
                                className="absolute inset-0 w-full h-full"
                                iframeClassName="w-full h-full"
                                onReady={(e) => {
                                    playerRef.current = e.target;
                                    setIsPlayerReady(true);
                                }}
                                opts={{
                                    height: '100%',
                                    width: '100%',
                                    playerVars: {
                                        autoplay: 1,
                                        rel: 0,
                                        hl: 'de', // Request German interface if possible
                                        cc_lang_pref: 'de', // Try to default to German subs on player
                                        cc_load_policy: 1,
                                    },
                                }}
                            />
                        </div>

                        {/* Interactive Subtitles Under Video */}
                        <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-3xl py-6 px-4 md:px-8 text-center shadow-lg relative flex-1 flex flex-col justify-center items-center min-h-[140px] max-h-[300px]">

                            {/* Previous line (faded, optional context) */}
                            {activeIndex > 0 && (
                                <p className="text-gray-600 text-sm md:text-base mb-2 font-medium truncate w-full max-w-3xl opacity-50 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleLineClick(transcript[activeIndex - 1].offset)}>
                                    {transcript[activeIndex - 1].text}
                                </p>
                            )}

                            {/* CURRENT LINE */}
                            {activeIndex >= 0 ? (
                                <div className="flex flex-col items-center gap-3 w-full">
                                    <div className="text-xl md:text-3xl font-bold leading-relaxed flex flex-wrap justify-center gap-x-1 md:gap-x-1.5 w-full max-w-4xl">
                                        {transcript[activeIndex].text.split(/(\s+)/).map((token, ti, arr) => {
                                            if (/\s+/.test(token)) {
                                                return <span key={ti}>{token}</span>;
                                            }

                                            const clean = token.replace(/[.,!?;:"„"()\[\]\-]/g, '').trim();
                                            const hasGrammar = !!storyWords[clean];
                                            const isSaved = savedWords.has(clean);
                                            const isActiveGrammar = activeWord === clean;
                                            let nounConfig = nounColors[clean];

                                            // Look ahead to check if article
                                            if (!nounConfig) {
                                                const articles = ['der', 'die', 'das', 'den', 'dem', 'des', 'ein', 'eine', 'einen', 'einem', 'eines', 'mein', 'meine', 'meinen', 'meinem', 'meines', 'dein', 'deine', 'deinen', 'deinem', 'deines', 'sein', 'seine', 'seinen', 'seinem', 'seines', 'ihr', 'ihre', 'ihren', 'ihrem', 'ihres', 'unser', 'unsere', 'unseren', 'unserem', 'unseres', 'euer', 'eure', 'euren', 'eurem', 'eures', 'kein', 'keine', 'keinen', 'keinem', 'keines', 'am', 'im', 'zum', 'zur', 'beim', 'vom', 'ans', 'ins', 'ums'];
                                                if (articles.includes(clean.toLowerCase())) {
                                                    // arr also contains space tokens, so look up to 4 tokens ahead
                                                    for (let k = 1; k <= 4; k++) {
                                                        if (ti + k < arr.length) {
                                                            const aheadToken = arr[ti + k];
                                                            if (/\s+/.test(aheadToken)) continue;
                                                            const ahead = aheadToken.replace(/[.,!?;:"„"()\[\]\-]/g, '').trim();
                                                            if (nounColors[ahead]) {
                                                                nounConfig = {
                                                                    color: nounColors[ahead].color,
                                                                    activeColor: nounColors[ahead].activeColor,
                                                                    base: nounColors[ahead].base,
                                                                    isArticle: true
                                                                };
                                                                break;
                                                            }
                                                        }
                                                    }
                                                }
                                            }

                                            let tokenClass = `cursor-pointer rounded px-1 transition-all select-none drop-shadow-sm `;
                                            if (isActiveGrammar) {
                                                tokenClass += nounConfig && !nounConfig.isArticle ? `${nounConfig.activeColor} shadow-md scale-105` : 'bg-indigo-600 text-white shadow-md scale-105';
                                            } else if (hasGrammar || (nounConfig && !nounConfig.isArticle)) {
                                                if (isSaved) {
                                                    tokenClass += nounConfig
                                                        ? `${nounConfig.color} border-b-2 border-dotted border-${nounConfig.base}-600`
                                                        : 'text-emerald-400 border-b-2 border-dotted border-emerald-600';
                                                } else {
                                                    tokenClass += nounConfig
                                                        ? `${nounConfig.color} hover:text-${nounConfig.base}-200 border-b-2 border-dotted border-${nounConfig.base}-500/50 hover:bg-white/10`
                                                        : 'text-indigo-300 hover:text-indigo-200 border-b-2 border-dotted border-indigo-500/50 hover:bg-indigo-900/40';
                                                }
                                            } else if (nounConfig && nounConfig.isArticle) {
                                                tokenClass += `${nounConfig.color} hover:text-white/80 hover:bg-white/10`;
                                            } else {
                                                tokenClass += 'text-white hover:text-indigo-200 hover:bg-white/10';
                                            }

                                            return (
                                                <span
                                                    key={ti}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleWordClick(token, transcript[activeIndex].text);
                                                    }}
                                                    className={tokenClass}
                                                >
                                                    {token}
                                                </span>
                                            );
                                        })}
                                    </div>
                                    {skTranslations[activeIndex] && (
                                        <div className="text-indigo-300 font-medium text-sm md:text-base border-t border-indigo-900/50 pt-2 px-4 w-full">
                                            {skTranslations[activeIndex]}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <p className="text-gray-500 italic text-lg">[ Video prehráva ]</p>
                            )}

                            {/* Next line (faded, optional context) */}
                            {activeIndex !== -1 && activeIndex < transcript.length - 1 && (
                                <p className="text-gray-600 text-sm md:text-base mt-2 font-medium truncate w-full max-w-3xl opacity-50 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleLineClick(transcript[activeIndex + 1].offset)}>
                                    {transcript[activeIndex + 1].text}
                                </p>
                            )}

                            {/* Dictionary Floating Overlay */}
                            {activeWord && (
                                <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-4 w-[90vw] md:w-[450px] shadow-2xl">
                                    <div className="relative">
                                        {/* Little triangle pointer mapping to the active subtitle line below */}
                                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-gray-900 border-b border-r border-gray-700 transform rotate-45 z-0"></div>
                                        <div className="bg-gray-900 border border-gray-700 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden relative z-10 w-full h-[350px]">
                                            <GrammarCard
                                                word={activeWord}
                                                data={activeData}
                                                loading={isGenerating}
                                                onSave={handleSaveWord}
                                                saved={savedWords.has(activeWord)}
                                                onClose={() => {
                                                    setActiveWord(null);
                                                    if (playerRef.current) playerRef.current.playVideo();
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT / BOTTOM: Tabbed panel - Prepis + Kapitoly */}
                    <div className="flex-1 w-full bg-gray-900/50 border border-gray-800 rounded-3xl p-4 md:p-6 shadow-inner flex flex-col min-h-0">

                        {/* Tab switcher */}
                        <div className="flex items-center gap-1 mb-4 pb-4 border-b border-gray-800 flex-shrink-0">
                            <button
                                onClick={() => setRightTab('transcript')}
                                className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${rightTab === 'transcript'
                                    ? 'bg-indigo-600 text-white'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                    }`}
                            >
                                Prepis
                            </button>
                            <button
                                onClick={() => setRightTab('segments')}
                                className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${rightTab === 'segments'
                                    ? 'bg-indigo-600 text-white'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                    }`}
                            >
                                Kapitoly
                                {segments.length > 0 && (
                                    <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${rightTab === 'segments' ? 'bg-indigo-500 text-white' : 'bg-gray-700 text-gray-300'
                                        }`}>{segments.length}</span>
                                )}
                            </button>
                            <button
                                onClick={() => setRightTab('exercises')}
                                className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${rightTab === 'exercises'
                                    ? 'bg-amber-600 text-white'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                    }`}
                            >
                                Cvičenia
                                {videoExercises && (
                                    <span className="text-xs px-1.5 py-0.5 rounded-full font-medium bg-amber-700 text-amber-200">
                                        {videoExercises.topics.length}
                                    </span>
                                )}
                            </button>
                            {rightTab === 'transcript' && (
                                <p className="ml-auto text-xs text-gray-500 hidden xl:block">Klinutím na vetu pretočíš video</p>
                            )}
                            {LESSON_COMPONENTS[videoId] && (
                                <button
                                    onClick={() => setIsLessonModalOpen(true)}
                                    className={`ml-auto px-4 py-1.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:scale-105 shadow-md shadow-emerald-900/50`}
                                >
                                    🎓 Interaktívna lekcia
                                </button>
                            )}
                        </div>

                        {/* TRANSCRIPT TAB */}
                        {rightTab === 'transcript' && (
                            <div
                                className="overflow-y-auto flex-1 custom-scrollbar pr-2 space-y-1"
                                ref={transcriptContainerRef}
                            >
                                {transcript.map((line, idx) => {
                                    const isActive = idx === activeIndex;
                                    return (
                                        <div
                                            key={idx}
                                            ref={isActive ? activeLineRef : null}
                                            onClick={() => handleLineClick(line.offset)}
                                            className={`px-4 py-2 rounded-xl transition-all cursor-pointer group flex gap-3 ${isActive
                                                ? 'bg-indigo-900/40 border border-indigo-700/50'
                                                : 'hover:bg-gray-800/60 border border-transparent'
                                                }`}
                                        >
                                            <span className={`text-xs mt-1 w-10 flex-shrink-0 text-right ${isActive ? 'text-indigo-400 font-bold' : 'text-gray-600'}`}>
                                                {Math.floor(line.offset / 60000)}:{(Math.floor((line.offset % 60000) / 1000)).toString().padStart(2, '0')}
                                            </span>
                                            <p className={`flex-1 text-sm md:text-base leading-relaxed ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                                                {line.text}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* SEGMENTS / KAPITOLY TAB */}
                        {rightTab === 'segments' && (
                            <div className="overflow-y-auto flex-1 custom-scrollbar pr-2 space-y-2">
                                {segments.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-6">
                                        <Loader2 size={24} className="text-gray-600 animate-spin" />
                                        <p className="text-gray-500 text-sm">Načítavam kapitoly…</p>
                                    </div>
                                ) : segments.map((seg, idx) => {
                                    const startSec = Math.floor(seg.startTimeMs / 1000);
                                    const endSec = Math.floor(seg.endTimeMs / 1000);
                                    const fmt = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
                                    const isActive = currentTime >= seg.startTimeMs && currentTime < seg.endTimeMs;
                                    const isDone = completedSegments.has(idx);
                                    return (
                                        <div
                                            key={idx}
                                            className={`rounded-2xl border p-4 flex flex-col gap-3 transition-all ${isActive
                                                ? 'bg-indigo-900/30 border-indigo-700/60'
                                                : 'bg-gray-800/40 border-gray-700/40 hover:border-gray-600/60'
                                                }`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5 ${isDone ? 'bg-emerald-600 text-white' : isActive ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-400'
                                                    }`}>
                                                    {isDone ? '✓' : idx + 1}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className={`font-bold text-sm leading-tight mb-1 ${isActive ? 'text-white' : 'text-gray-200'
                                                        }`}>{seg.topicDescription}</p>
                                                    <p className="text-xs text-gray-500">{fmt(startSec)} – {fmt(endSec)}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => { handleLineClick(seg.startTimeMs); }}
                                                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-200 text-xs font-bold transition-all"
                                                >
                                                    ▶ Prehrať
                                                </button>
                                                <button
                                                    onClick={() => openSegmentConversation(idx)}
                                                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-indigo-700 hover:bg-indigo-600 text-white text-xs font-bold transition-all"
                                                >
                                                    🎤 Hovoriť
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* EXERCISES TAB */}
                        {rightTab === 'exercises' && (
                            <div className="overflow-y-auto flex-1 custom-scrollbar pr-2">
                                {exercisesLoading ? (
                                    <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-6 py-12">
                                        <Loader2 size={28} className="text-amber-500 animate-spin" />
                                        <p className="text-gray-400 text-sm font-medium">AI analýzuje video a vytvára cvičenia…</p>
                                        <p className="text-gray-600 text-xs">Toto trvá asi 10–20 sekúnd. Nabudúce sa nacítaju okamžite.</p>
                                    </div>
                                ) : videoExercises ? (
                                    <VideoExercises exercises={videoExercises} />
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-6 py-12">
                                        <p className="text-gray-500 text-sm">Cvičenia sa vygenerujú automaticky po načítaní kapitol.</p>
                                    </div>
                                )}
                            </div>
                        )}

                    </div>

                </div>
            )}

            {/* AI Voice Coach Modal */}
            <AIVoiceModal
                isOpen={isAIVoiceModalOpen}
                onClose={() => setIsAIVoiceModalOpen(false)}
                segmentTopic={currentSegmentTopic}
                segmentContext={currentSegmentContext}
                transcriptSegment={currentSegmentTranscript}
                videoLevel={activeVideoLevel}
                onResumeVideo={() => {
                    setIsAIVoiceModalOpen(false);
                    if (playerRef.current) playerRef.current.playVideo();
                }}
            />

            {/* Walk & Talk Interactive Lesson Modal */}
            {LESSON_COMPONENTS[videoId] && React.createElement(LESSON_COMPONENTS[videoId], {
                isOpen: isLessonModalOpen,
                onClose: () => setIsLessonModalOpen(false)
            })}
        </div>
    );
}
