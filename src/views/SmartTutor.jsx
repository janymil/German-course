import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Loader2, RefreshCw, Key, Search, CheckCircle2, XCircle, Volume2, ArrowRight } from 'lucide-react';
import { generateSmartTutorExercises } from '../hooks/useOpenAI';
import { useProgress } from '../hooks/useProgress';
import { useTTS } from '../hooks/useTTS';

export default function SmartTutor({ onOpenAPIKey }) {
    const { progress, saveSmartTutorSession } = useProgress();
    const completedLessonsCount = Object.keys(progress?.completedLessons || {}).length;
    const history = progress?.smartTutorHistory || [];

    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [tutorData, setTutorData] = useState(null);
    const [showHistory, setShowHistory] = useState(false);

    // Exercise state
    const [answers, setAnswers] = useState({});
    const [checked, setChecked] = useState(false);
    const [results, setResults] = useState({});
    const [score, setScore] = useState({ correct: 0, total: 0 });

    const { speak } = useTTS();
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSearch = async (e) => {
        e?.preventDefault();
        if (!query.trim() || loading) return;

        setLoading(true);
        setError(null);
        setTutorData(null);
        setAnswers({});
        setChecked(false);
        setResults({});
        setScore({ correct: 0, total: 0 });

        try {
            const data = await generateSmartTutorExercises({
                query: query.trim(),
                completedLessonsCount
            });
            setTutorData(data);
            saveSmartTutorSession({ query: query.trim(), data });
        } catch (err) {
            if (err.message.includes('NO_KEY') || err.message.includes('INVALID_KEY')) {
                setError('key');
            } else {
                setError('api');
            }
        } finally {
            setLoading(false);
        }
    };

    const updateAnswer = (blockIdx, exIdx, value) => {
        setAnswers(prev => ({
            ...prev,
            [blockIdx]: {
                ...(prev[blockIdx] || {}),
                [exIdx]: value
            }
        }));
    };

    const handleCheck = () => {
        const newResults = {};
        let totalCorrect = 0;
        let totalCheckable = 0;

        tutorData.exercise_blocks.forEach((block, bIdx) => {
            newResults[bIdx] = {};
            block.exercises.forEach((ex, eIdx) => {
                totalCheckable++;
                const userAns = (answers[bIdx] || {})[eIdx];
                let isCorrect = false;

                if (block.type === 'fill_in_the_blank') {
                    // Extract answers from [ ]
                    const requiredAnswers = [];
                    const matches = ex.german_sentence.match(/\[([^\]]+)\]/g) || [];
                    matches.forEach(m => requiredAnswers.push(m.replace(/[\[\]]/g, '').trim().toLowerCase()));

                    const userAnsArr = userAns || [];
                    isCorrect = requiredAnswers.length > 0 && requiredAnswers.every((req, i) => (userAnsArr[i] || '').trim().toLowerCase() === req);
                }
                else if (block.type === 'multiple_choice') {
                    isCorrect = (userAns || '').trim() === ex.correct_option.trim();
                }
                else if (block.type === 'translation') {
                    const cleanReq = ex.german_sentence.replace(/[.,!?]/g, '').trim().toLowerCase();
                    const cleanUser = (userAns || '').replace(/[.,!?]/g, '').trim().toLowerCase();
                    isCorrect = cleanReq === cleanUser;
                }
                else if (block.type === 'scramble') {
                    const userOrder = userAns || [];
                    const reqSentence = ex.correct_sentence.replace(/[.,!?]/g, '').trim().toLowerCase();
                    const userSentence = userOrder.join(' ').replace(/[.,!?]/g, '').trim().toLowerCase();
                    isCorrect = reqSentence === userSentence;
                }

                newResults[bIdx][eIdx] = isCorrect;
                if (isCorrect) totalCorrect++;
            });
        });

        setResults(newResults);
        setScore({ correct: totalCorrect, total: totalCheckable });
        setChecked(true);
    };

    const handleNext = () => {
        setQuery('');
        setTutorData(null);
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    // Helper: Scramble text interaction
    const toggleScrambleWord = (bIdx, eIdx, word) => {
        if (checked) return;
        const currentAns = (answers[bIdx] || {})[eIdx] || [];
        if (currentAns.includes(word)) {
            updateAnswer(bIdx, eIdx, currentAns.filter(w => w !== word));
        } else {
            updateAnswer(bIdx, eIdx, [...currentAns, word]);
        }
    };

    const loadHistorySession = (session) => {
        setQuery(session.query);
        setTutorData(session.data);
        setAnswers({});
        setChecked(false);
        setResults({});
        setScore({ correct: 0, total: 0 });
        setShowHistory(false);
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="flex h-full lg:h-auto">
            {/* History Sidebar (Mobile drawer or desktop static) */}
            {showHistory && (
                <div className="absolute inset-y-0 left-0 w-80 bg-gray-900 border-r border-gray-800 shadow-2xl z-50 flex flex-col p-4 animate-in slide-in-from-left-4 lg:relative lg:inset-auto lg:h-[calc(100vh-4rem)] lg:flex-shrink-0">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Sparkles size={20} className="text-indigo-400" /> História
                        </h2>
                        <button onClick={() => setShowHistory(false)} className="text-gray-400 hover:text-white p-2">
                            <XCircle size={20} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                        {history.length === 0 ? (
                            <p className="text-sm text-gray-500 italic">Zatiaľ žiadna história.</p>
                        ) : (
                            history.map((session, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => loadHistorySession(session)}
                                    className="w-full text-left p-3 rounded-xl bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-indigo-500/50 transition-colors"
                                >
                                    <h3 className="text-emerald-400 font-bold mb-1 truncate"># {session.query}</h3>
                                    <p className="text-xs text-gray-400">
                                        {new Date(session.savedAt).toLocaleDateString()} {new Date(session.savedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className={`flex-1 overflow-y-auto max-w-4xl mx-auto px-4 py-8 space-y-8 ${showHistory ? 'hidden lg:block' : ''}`}>

                {/* Style specifically for printing */}
                <style>{`
                    @media print {
                        body * { visibility: hidden; }
                        #print-section, #print-section * { visibility: visible; }
                        #print-section { position: absolute; left: 0; top: 0; width: 100%; color: black !important; }
                        #print-section h1, #print-section p, #print-section h3, #print-section span, #print-section div { color: black !important; border-color: #ccc !important; }
                        #print-section input { border: none !important; border-bottom: 1px solid black !important; background: transparent !important; color: transparent !important; }
                        .no-print { display: none !important; }
                        .print-break-inside-avoid { break-inside: avoid; page-break-inside: avoid; }
                    }
                `}</style>

                <div className="text-center space-y-4 no-print relative">
                    {!showHistory && (
                        <button
                            onClick={() => setShowHistory(true)}
                            className="absolute left-0 top-0 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-xl transition-colors flex items-center gap-2 text-sm font-medium"
                        >
                            História
                        </button>
                    )}
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-900/50 text-indigo-400 mb-2">
                        <Sparkles size={32} />
                    </div>
                    <h1 className="text-3xl font-black text-white tracking-tight">AI Smart Tutor</h1>
                    <p className="text-gray-400 text-sm max-w-lg mx-auto">
                        Tréning na mieru. AI ti presne vysvetlí princíp a pripraví komplexné cvičenia: od odlučiteľných slovies až po rody a predložky.
                    </p>
                </div>

                {error === 'key' && (
                    <div className="bg-amber-950/40 border border-amber-700/40 rounded-2xl p-4 flex items-center justify-between gap-4">
                        <p className="text-amber-300 text-sm flex items-center gap-2">
                            <Key size={18} /> Chýba OpenAI API kľúč.
                        </p>
                        <button onClick={onOpenAPIKey} className="text-xs bg-amber-700/60 hover:bg-amber-600/60 text-amber-200 px-4 py-2 rounded-xl font-bold transition-all">Zadať kľúč</button>
                    </div>
                )}
                {error === 'api' && (
                    <div className="bg-red-950/40 border border-red-700/40 rounded-2xl p-4 text-red-300 text-sm flex items-center gap-2">
                        <XCircle size={18} /> Došlo k chybe pri komunikácii so serverom. Skús to znova.
                    </div>
                )}

                {!tutorData && (
                    <form onSubmit={handleSearch} className="relative group max-w-xl mx-auto mt-8">
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            disabled={loading}
                            placeholder="Zadaj tému. Napr: ausfüllen, machen, wegen, sein..."
                            className="w-full bg-gray-900 border border-gray-700 rounded-3xl py-4 pl-6 pr-16 text-white text-lg placeholder-gray-600 focus:outline-none focus:border-indigo-500 shadow-xl disabled:opacity-50"
                        />
                        <button type="submit" disabled={loading || !query.trim()} className="absolute right-2 top-2 bottom-2 aspect-square rounded-2xl bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-500 disabled:opacity-50 transition-colors">
                            {loading ? <Loader2 size={20} className="animate-spin" /> : <Search size={20} />}
                        </button>
                    </form>
                )}

                {loading && !tutorData && (
                    <div className="flex flex-col items-center justify-center gap-3 text-indigo-400 py-12 no-print">
                        <Loader2 size={32} className="animate-spin" />
                        <p className="text-sm font-medium animate-pulse">Pripravujem hĺbkovú analýzu a 20 cvičení pre "{query}"...</p>
                    </div>
                )}

                {tutorData && (
                    <div id="print-section" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center justify-between no-print">
                            <h2 className="text-2xl font-bold text-emerald-400"># {query}</h2>
                            <div className="flex items-center gap-2">
                                <button onClick={handlePrint} className="text-xs text-gray-500 hover:text-white flex items-center gap-1 bg-gray-900 px-3 py-1.5 rounded-lg border border-gray-800 transition-colors">
                                    Vytlačiť (PDF)
                                </button>
                                <button onClick={handleNext} className="text-xs text-gray-500 hover:text-white flex items-center gap-1 bg-gray-900 px-3 py-1.5 rounded-lg border border-gray-800 transition-colors">
                                    <Search size={12} /> Nová téma
                                </button>
                            </div>
                        </div>

                        {/* Print Header Make Visible */}
                        <div className="hidden print:block mb-8 border-b border-gray-300 pb-4">
                            <h1 className="text-3xl font-bold">Nemecký tréning: {query}</h1>
                            <p className="text-gray-500 italic mt-2">vytvorené AI Smart Tutorom</p>
                        </div>

                        <div className="bg-gray-900/60 border border-gray-800 rounded-3xl p-6 lg:p-8 space-y-6 shadow-lg print:border-none print:shadow-none print:p-0 print:bg-transparent">
                            <div className="text-indigo-100 text-[15px] leading-relaxed bg-indigo-900/20 border border-indigo-500/30 rounded-2xl p-5 mb-6">
                                <strong className="block mb-3 text-indigo-300">💡 Hĺbkové vysvetlenie: </strong>
                                <div className="space-y-3">
                                    {Array.isArray(tutorData.explanation_slovak)
                                        ? tutorData.explanation_slovak.map((p, i) => <p key={i}>{p}</p>)
                                        : <p>{tutorData.explanation_slovak}</p>
                                    }
                                </div>
                            </div>

                            {tutorData.grammar_matrix && (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {Array.isArray(tutorData.grammar_matrix)
                                        ? tutorData.grammar_matrix.map((row, i) => (
                                            <div key={i} className="bg-gray-800 border border-gray-700/50 rounded-xl p-4 flex flex-col justify-center items-center text-center">
                                                <span className="text-xs text-indigo-400 font-medium mb-1 tracking-wider uppercase">{row.label}</span>
                                                <span className="font-bold text-white text-lg">{row.val}</span>
                                            </div>
                                        ))
                                        : Object.entries(tutorData.grammar_matrix).map(([k, v]) => (
                                            <div key={k} className="bg-gray-800 border border-gray-700/50 rounded-xl p-4 flex flex-col justify-center items-center text-center">
                                                <span className="text-xs text-indigo-400 font-medium mb-1 tracking-wider uppercase">{k}</span>
                                                <span className="font-bold text-white text-lg">{v}</span>
                                            </div>
                                        ))
                                    }
                                </div>
                            )}
                        </div>

                        {/* Exercise Blocks */}
                        {tutorData.exercise_blocks && tutorData.exercise_blocks.map((block, bIdx) => (
                            <div key={bIdx} className="bg-gray-900/40 border border-gray-800 rounded-3xl p-6 shadow-sm space-y-6 print:border-b print:border-gray-200 print-break-inside-avoid">
                                <h3 className="text-xl font-black text-white px-2 mb-2 print:text-black">{bIdx + 1}. {block.title}</h3>

                                <div className="grid grid-cols-1 gap-4">
                                    {block.exercises.map((ex, eIdx) => {
                                        const isCorrect = checked && results[bIdx]?.[eIdx];
                                        const isWrong = checked && !results[bIdx]?.[eIdx];
                                        const exStatusClass = isCorrect ? 'border-emerald-500/50 bg-emerald-950/10' : isWrong ? 'border-red-500/50 bg-red-950/10' : 'border-gray-800 bg-gray-900';

                                        return (
                                            <div key={eIdx} className={`border rounded-2xl p-5 ${exStatusClass} transition-colors relative`}>

                                                {/* TYPE: FILL IN THE BLANK */}
                                                {block.type === 'fill_in_the_blank' && (() => {
                                                    const parts = ex.german_sentence.split(/(\[[^\]]+\])/g);
                                                    let currBlankIdx = 0;
                                                    return (
                                                        <div className="mb-3 mt-1">
                                                            <div className="text-lg text-white font-medium flex items-center flex-wrap gap-x-2 gap-y-3 leading-loose">
                                                                {parts.map((p, pIdx) => {
                                                                    if (p.startsWith('[') && p.endsWith(']')) {
                                                                        const bI = currBlankIdx++;
                                                                        const currentAnswers = answers[bIdx]?.[eIdx] || [];
                                                                        return (
                                                                            <input
                                                                                key={pIdx}
                                                                                type="text"
                                                                                value={currentAnswers[bI] || ''}
                                                                                onChange={(e) => {
                                                                                    const newAns = [...currentAnswers];
                                                                                    newAns[bI] = e.target.value;
                                                                                    updateAnswer(bIdx, eIdx, newAns);
                                                                                }}
                                                                                disabled={checked}
                                                                                className={`w-24 px-2 py-1 text-center bg-gray-800 border-b-2 font-bold focus:outline-none focus:border-indigo-400 transition-colors ${isCorrect ? 'border-emerald-500 text-emerald-300' : isWrong ? 'border-red-500 text-red-300' : 'border-gray-600 text-indigo-300'}`}
                                                                            />
                                                                        );
                                                                    }
                                                                    return <span key={pIdx}>{p}</span>;
                                                                })}
                                                            </div>
                                                            <div className="text-sm text-gray-500 mt-3 flex items-center justify-between">
                                                                <span>🇸🇰 {ex.slovak_translation}</span>
                                                                <button onClick={() => speak(ex.german_sentence.replace(/[\[\]]/g, ''))} className="text-gray-500 hover:text-indigo-400"><Volume2 size={16} /></button>
                                                            </div>
                                                            {isWrong && (
                                                                <div className="text-xs text-red-400 mt-2 bg-red-950/30 p-2 rounded-lg">
                                                                    Správne je: <span className="font-bold">{ex.german_sentence.replace(/[\[\]]/g, '')}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })()}

                                                {/* TYPE: MULTIPLE CHOICE */}
                                                {block.type === 'multiple_choice' && (
                                                    <div className="space-y-4">
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <p className="text-white text-lg font-medium">{ex.question}</p>
                                                                {ex.slovak_translation && <p className="text-sm text-gray-500 mt-1">🇸🇰 {ex.slovak_translation}</p>}
                                                            </div>
                                                            {checked && <button onClick={() => speak(ex.question.replace('___', ex.correct_option))} className="text-gray-500 hover:text-indigo-400 no-print"><Volume2 size={16} /></button>}
                                                        </div>
                                                        <div className="flex flex-col gap-3 print:pl-8">
                                                            {ex.options.map((opt, oIdx) => {
                                                                const isSelected = answers[bIdx]?.[eIdx] === opt;
                                                                return (
                                                                    <button
                                                                        key={oIdx}
                                                                        onClick={() => !checked && updateAnswer(bIdx, eIdx, opt)}
                                                                        disabled={checked}
                                                                        className={`px-4 py-2 rounded-xl text-sm font-medium border text-left transition-colors print:relative print:border-none print:px-0 ${isSelected && !checked ? 'bg-indigo-600 border-indigo-500 text-white' : isSelected && isCorrect ? 'bg-emerald-600 border-emerald-500 text-white' : isSelected && isWrong ? 'bg-red-600 border-red-500 text-white' : checked && opt === ex.correct_option ? 'bg-emerald-900/50 border-emerald-500/50 text-emerald-300' : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'}`}
                                                                    >
                                                                        <span className="hidden print:inline-block w-4 h-4 rounded-full border border-gray-400 absolute left-[-24px] top-[10px]" />
                                                                        {opt}
                                                                    </button>
                                                                );
                                                            })}
                                                        </div>
                                                        {isWrong && <div className="text-xs text-red-400 bg-red-950/30 p-2 rounded-lg no-print">Správna možnosť: <span className="font-bold">{ex.correct_option}</span></div>}
                                                    </div>
                                                )}

                                                {/* TYPE: TRANSLATION */}
                                                {block.type === 'translation' && (
                                                    <div className="space-y-3">
                                                        <div className="flex justify-between items-center">
                                                            <p className="text-lg font-medium text-indigo-300 print:text-gray-800">🇸🇰 {ex.slovak_sentence}</p>
                                                            {checked && <button onClick={() => speak(ex.german_sentence)} className="text-gray-500 hover:text-indigo-400 no-print"><Volume2 size={16} /></button>}
                                                        </div>
                                                        <input
                                                            type="text"
                                                            value={answers[bIdx]?.[eIdx] || ''}
                                                            onChange={(e) => updateAnswer(bIdx, eIdx, e.target.value)}
                                                            disabled={checked}
                                                            placeholder="Zadaj nemecký preklad..."
                                                            className={`w-full bg-gray-800 border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors print:bg-transparent print:border-b print:border-gray-500 print:rounded-none px-0 ${isCorrect ? 'border-emerald-500' : isWrong ? 'border-red-500' : 'border-gray-700 focus:border-indigo-500'}`}
                                                        />
                                                        {isWrong && <div className="text-xs text-red-400 bg-red-950/30 p-2 rounded-lg no-print">Správne je: <span className="font-bold">{ex.german_sentence}</span></div>}
                                                    </div>
                                                )}

                                                {/* TYPE: SCRAMBLE */}
                                                {block.type === 'scramble' && (() => {
                                                    const currentAns = answers[bIdx]?.[eIdx] || [];
                                                    const pool = (ex.scrambled_words || []).filter(w => !currentAns.includes(w));
                                                    return (
                                                        <div className="space-y-4">
                                                            <div className="flex justify-between items-start">
                                                                <p className="text-sm font-medium text-gray-400 print:text-black">🇸🇰 {ex.slovak_translation}</p>
                                                                {checked && <button onClick={() => speak(ex.correct_sentence)} className="text-gray-500 hover:text-indigo-400 no-print"><Volume2 size={16} /></button>}
                                                            </div>

                                                            {/* Answer slot */}
                                                            <div className={`min-h-[48px] p-2 rounded-xl flex flex-wrap gap-2 items-center print:border-b print:border-gray-500 print:rounded-none print:px-0 print:min-h-0 ${isCorrect ? 'bg-emerald-950/20 shadow-[inset_0_0_0_1px_rgba(16,185,129,0.3)]' : isWrong ? 'bg-red-950/20 shadow-[inset_0_0_0_1px_rgba(239,68,68,0.3)]' : 'bg-gray-800/50 shadow-[inset_0_0_0_1px_rgba(75,85,99,0.4)]'}`}>
                                                                {currentAns.map((w, wIdx) => (
                                                                    <button
                                                                        key={wIdx}
                                                                        onClick={() => toggleScrambleWord(bIdx, eIdx, w)}
                                                                        disabled={checked}
                                                                        className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-medium text-sm shadow-sm hover:bg-indigo-500 disabled:opacity-100 transition-transform active:scale-95 no-print"
                                                                    >
                                                                        {w}
                                                                    </button>
                                                                ))}
                                                            </div>

                                                            {/* Pool slot */}
                                                            {(!checked || pool.length > 0) && (
                                                                <div className="flex flex-wrap gap-2 text-gray-400 text-sm font-bold print:text-black">
                                                                    <span className="hidden print:inline">Dostupné slová:</span>
                                                                    {ex.scrambled_words.map((w, wIdx) => {
                                                                        const isUsed = currentAns.includes(w);
                                                                        return (
                                                                            <button
                                                                                key={wIdx}
                                                                                onClick={() => !isUsed && toggleScrambleWord(bIdx, eIdx, w)}
                                                                                className={`px-3 py-1.5 rounded-lg border font-medium text-sm transition-transform active:scale-95 print:border-none print:px-1 print:py-0 ${isUsed ? 'bg-gray-900 border-gray-800 text-gray-600 opacity-50 no-print' : 'bg-gray-800 border-gray-700 text-gray-300 hover:!bg-gray-700 print:text-black'}`}
                                                                            >
                                                                                {w} {wIdx < ex.scrambled_words.length - 1 && <span className="hidden print:inline">/</span>}
                                                                            </button>
                                                                        )
                                                                    })}
                                                                </div>
                                                            )}
                                                            {isWrong && <div className="text-xs text-red-400 bg-red-950/30 p-2 rounded-lg no-print">Správne je: <span className="font-bold">{ex.correct_sentence}</span></div>}
                                                        </div>
                                                    );
                                                })()}

                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}

                        <div className="bg-gray-900 border-t border-gray-800 sticky bottom-0 -mx-4 px-4 py-4 mt-8 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-10 flex justify-center pb-[max(1rem,env(safe-area-inset-bottom))] no-print">
                            {!checked ? (
                                <button
                                    onClick={handleCheck}
                                    className="w-full max-w-sm bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 px-8 rounded-2xl transition-all shadow-xl hover:shadow-indigo-500/25 flex justify-center items-center gap-2 text-lg"
                                >
                                    <CheckCircle2 size={24} /> Odovzdať všetky testy
                                </button>
                            ) : (
                                <div className="w-full max-w-lg flex items-center justify-between gap-6 px-4">
                                    <div>
                                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Tvoje skóre</p>
                                        <p className={`text-4xl font-black ${score.correct === score.total ? 'text-emerald-400' : score.correct > score.total / 2 ? 'text-amber-400' : 'text-red-400'}`}>
                                            {score.correct} <span className="text-2xl text-gray-600">/ {score.total}</span>
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleNext}
                                        className="flex-1 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white font-bold py-4 px-8 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg"
                                    >
                                        <RefreshCw size={20} /> Začať znova s novou témou
                                    </button>
                                </div>
                            )}
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}
