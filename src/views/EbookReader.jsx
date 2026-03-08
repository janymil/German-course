import React, { useState, useCallback, useMemo } from 'react';
import { ChevronLeft, List, Volume2, BookText, Globe, Mic } from 'lucide-react';
import ShadowingExercise from '../components/exercises/ShadowingExercise';
import { EBOOKS } from '../data/ebooks';
import { LessonAudioPlayer } from '../components/LessonAudioPlayer';
import { useProgress } from '../hooks/useProgress';
import { GLOBAL_NOUNS } from '../data/globalNouns';
import GrammarCard from '../components/GrammarCard';
import { generateGrammarCard } from '../hooks/useAI';

function getFormatClasses(format) {
    switch (format) {
        case 'letter': return 'italic text-indigo-200/80 px-4 ml-2 md:ml-6 border-l-2 border-indigo-500/30';
        case 'letter_end': return 'italic text-indigo-200/80 px-4 ml-2 md:ml-6 mb-6 border-l-2 border-indigo-500/30';

        case 'website_title': return 'bg-slate-800 mt-6 pt-4 pb-2 px-4 md:px-6 rounded-t-xl mx-2 md:mx-6 border-t border-x border-slate-700 font-bold text-blue-300 shadow-md tracking-tight';
        case 'website': return 'bg-slate-800 py-0.5 px-4 md:px-6 mx-2 md:mx-6 border-x border-slate-700 shadow-md text-[0.95em]';
        case 'website_end': return 'bg-slate-800 pb-4 pt-0.5 mb-6 px-4 md:px-6 mx-2 md:mx-6 rounded-b-xl border-b border-x border-slate-700 shadow-md text-[0.95em]';

        case 'newspaper_title': return 'bg-zinc-800 mt-6 pt-6 pb-2 px-4 md:px-8 mx-2 md:mx-10 border-t border-x border-zinc-600 font-serif text-center font-bold text-2xl shadow-inner';
        case 'newspaper': return 'bg-zinc-800 py-0.5 px-4 md:px-8 mx-2 md:mx-10 border-x border-zinc-600 font-serif text-gray-300 shadow-inner text-[0.95em]';
        case 'newspaper_end': return 'bg-zinc-800 pb-6 pt-0.5 px-4 md:px-8 mb-6 mx-2 md:mx-10 border-b border-x border-zinc-600 font-serif text-gray-300 shadow-inner text-[0.95em]';

        case 'note': return 'bg-amber-950/40 py-0.5 px-6 md:px-8 mx-4 md:mx-12 border-x border-amber-700/30 text-amber-100/90 font-mono md:-rotate-1 shadow-sm transform-gpu';
        case 'note_end': return 'bg-amber-950/40 pb-4 pt-0.5 px-6 md:px-8 mb-6 mx-4 md:mx-12 border-b border-x border-amber-700/30 text-amber-100/90 font-mono rounded-b-md md:-rotate-1 shadow-sm transform-gpu';

        case 'dialogue': return 'pl-4 border-l-[3px] border-emerald-500/50 text-gray-100 bg-emerald-900/10 py-1 w-full rounded-r-lg';
        case 'dialogue_start': return 'pl-4 border-l-[3px] border-emerald-500/50 text-gray-100 bg-emerald-900/10 pt-2 pb-1 mt-4 w-full rounded-tr-lg';
        case 'dialogue_end': return 'pl-4 border-l-[3px] border-emerald-500/50 text-gray-100 bg-emerald-900/10 pb-2 pt-1 mb-4 w-full rounded-br-lg';

        default: return 'py-0.5 text-gray-200';
    }
}

export default function EbookReader({ ebookId, onBack }) {
    const { progress, saveGeneratedGrammarCard, markVocabSeen } = useProgress();
    const ebook = EBOOKS.find(e => e.id === ebookId);

    const [currentChapterIdx, setCurrentChapterIdx] = useState(0);
    const [showToc, setShowToc] = useState(false);
    const [showShadowing, setShowShadowing] = useState(false);

    // Interactive Dictionary State
    const [activeWord, setActiveWord] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [savedWords, setSavedWords] = useState(new Set());

    const chapter = ebook?.chapters[currentChapterIdx];

    const generatedWords = progress.generatedWords || {};
    const storyWords = useMemo(() => {
        return {
            ...GLOBAL_NOUNS,
            ...ebook?.words,
            ...generatedWords
        };
    }, [ebook?.words, generatedWords]);

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
            const cleanW = w.replace(/[.,!?;:"„"()\-]/g, '').trim();
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

    const handleWordClick = useCallback(async (token, sentenceDe) => {
        const clean = token.replace(/[.,!?;:"„"()\-]/g, '').trim();
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
    }, [storyWords, saveGeneratedGrammarCard]);

    const handleSaveWord = useCallback((word, data) => {
        if (data) markVocabSeen(data.sk || word, false);
        setSavedWords(prev => new Set([...prev, word]));
    }, [markVocabSeen]);

    if (!ebook) return null;

    const activeData = activeWord ? (storyWords[activeWord] || null) : null;

    return (
        <div className="max-w-7xl mx-auto flex flex-col h-[calc(100vh-2rem)] pt-2 md:pt-4">

            {/* Header / Nav */}
            <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 bg-gray-900 border border-gray-800 rounded-2xl mb-4 mx-4 md:mx-0 shadow-lg shadow-black/50 z-50">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-gray-400 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-xl transition-all font-medium"
                >
                    <ChevronLeft size={20} />
                    <span className="hidden sm:inline">Späť na E-Knihy</span>
                </button>
                <div className="flex flex-col items-center">
                    <span className="text-xs uppercase tracking-widest text-indigo-400/80 font-black px-2 py-0.5 rounded border border-indigo-500/20 bg-indigo-500/10">{ebook.cefr}</span>
                    <h2 className="text-sm font-bold mt-1 text-gray-300">{ebook.title}</h2>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setShowShadowing(true)}
                        className="flex items-center gap-2 text-emerald-400 hover:text-white hover:bg-emerald-900/40 border border-emerald-500/20 px-4 py-2 rounded-xl transition-all font-medium"
                        title="Otvoriť shadowing cvičenie"
                    >
                        <Mic size={18} />
                        <span className="hidden sm:inline">Shadowing</span>
                    </button>
                    <button
                        onClick={() => setShowToc(!showToc)}
                        className="flex items-center gap-2 text-gray-400 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-xl transition-all"
                    >
                        <span className="hidden sm:inline font-medium">Kapitoly</span>
                        <List size={20} />
                    </button>
                </div>
            </div>

            {/* Main Content Layout - Strict height wrapper to allow left scroll without right scroll */}
            <div className="flex-1 min-h-0 flex gap-6 px-4 flex-col lg:flex-row items-start relative w-full pb-4">

                {/* Left Side: Interactive Text Area (SCROLLING) */}
                <div className="flex-1 w-full h-full overflow-y-auto custom-scrollbar bg-gray-900/60 border border-gray-800 rounded-3xl p-6 lg:p-10 shadow-xl">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-2xl md:text-4xl font-black text-white mb-8 leading-snug tracking-tight border-b border-gray-800 pb-6">
                            {chapter.title}
                        </h1>

                        <div className="space-y-0 text-[1.10rem] leading-[1.8rem]">
                            {chapter.sentences.map((sentence, si) => (
                                <div key={si} className={`flex flex-wrap items-center gap-x-1.5 ${getFormatClasses(sentence.format)}`}>
                                    {/* Words */}
                                    {sentence.de.split(' ').map((token, ti, arr) => {
                                        const clean = token.replace(/[.,!?;:"„"()\-]/g, '').trim();
                                        const hasGrammar = !!storyWords[clean];
                                        const isSaved = savedWords.has(clean);
                                        const isActiveGrammar = activeWord === clean;
                                        let nounConfig = nounColors[clean];

                                        if (!nounConfig) {
                                            const articles = ['der', 'die', 'das', 'den', 'dem', 'des', 'ein', 'eine', 'einen', 'einem', 'eines', 'mein', 'meine', 'meinen', 'meinem', 'meines', 'dein', 'deine', 'deinen', 'deinem', 'deines', 'sein', 'seine', 'seinen', 'seinem', 'seines', 'ihr', 'ihre', 'ihren', 'ihrem', 'ihres', 'unser', 'unsere', 'unseren', 'unserem', 'unseres', 'euer', 'eure', 'euren', 'eurem', 'eures', 'kein', 'keine', 'keinen', 'keinem', 'keines', 'am', 'im', 'zum', 'zur', 'beim', 'vom', 'ans', 'ins', 'ums'];
                                            if (articles.includes(clean.toLowerCase())) {
                                                for (let k = 1; k <= 3; k++) {
                                                    if (ti + k < arr.length) {
                                                        const ahead = arr[ti + k].replace(/[.,!?;:"„"()\-]/g, '').trim();
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

                                        let tokenClass = "cursor-pointer rounded px-0.5 transition-all select-none ";
                                        if (isActiveGrammar) {
                                            tokenClass += nounConfig && !nounConfig.isArticle ? nounConfig.activeColor : 'bg-indigo-700 text-white';
                                        } else if (hasGrammar || (nounConfig && !nounConfig.isArticle)) {
                                            if (isSaved) {
                                                tokenClass += nounConfig
                                                    ? `${nounConfig.color} underline decoration-dotted decoration-${nounConfig.base}-600`
                                                    : 'text-emerald-400 underline decoration-dotted decoration-emerald-600';
                                            } else {
                                                tokenClass += nounConfig
                                                    ? `${nounConfig.color} hover:bg-white/10`
                                                    : 'text-gray-100 hover:bg-white/10';
                                            }
                                        } else if (nounConfig && nounConfig.isArticle) {
                                            tokenClass += `${nounConfig.color} hover:bg-white/10`;
                                        } else {
                                            tokenClass += 'hover:bg-white/10 opacity-90';
                                        }

                                        return (
                                            <span
                                                key={ti}
                                                onClick={() => handleWordClick(token, sentence.de)}
                                                className={tokenClass}
                                            >
                                                {token}
                                            </span>
                                        );
                                    })}

                                    {/* Translation icon with hover tooltip */}
                                    <div className="relative group/translate ml-1 inline-flex items-center rounded-full p-1 cursor-help transition-colors">
                                        <Globe size={14} className="text-gray-500 hover:text-indigo-400" />
                                        <div className="absolute left-1/2 -ml-32 bottom-full mb-2 w-64 bg-gray-900/95 backdrop-blur border border-gray-700 text-gray-200 text-sm font-medium p-4 rounded-xl shadow-2xl opacity-0 invisible group-hover/translate:opacity-100 group-hover/translate:visible transition-all z-50 pointer-events-none transform translate-y-1 group-hover/translate:translate-y-0 text-center leading-relaxed">
                                            {sentence.sk}
                                            <div className="absolute top-full left-1/2 -mt-[1px] -ml-2 border-[8px] border-transparent border-t-gray-700"></div>
                                        </div>
                                    </div>
                                    {sentence.endParagraph && <div className="w-full h-4"></div>}
                                </div>
                            ))}
                        </div>

                        {/* Navigation between chapters */}
                        <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-800/80">
                            <button
                                onClick={() => setCurrentChapterIdx(i => Math.max(0, i - 1))}
                                disabled={currentChapterIdx === 0}
                                className="px-6 py-3 rounded-xl bg-gray-800/80 text-gray-300 font-bold hover:bg-gray-700 disabled:opacity-30 disabled:hover:bg-gray-800/80 transition-all border border-gray-700"
                            >
                                Predchádzajúca
                            </button>
                            <div className="hidden sm:block text-xs font-bold text-gray-500 uppercase tracking-widest px-4">
                                {currentChapterIdx + 1} / {ebook.chapters.length}
                            </div>
                            <button
                                onClick={() => setCurrentChapterIdx(i => Math.min(ebook.chapters.length - 1, i + 1))}
                                disabled={currentChapterIdx === ebook.chapters.length - 1}
                                className="px-6 py-3 rounded-xl bg-indigo-600/90 hover:bg-indigo-500 text-white font-bold disabled:opacity-30 transition-all shadow-lg shadow-indigo-900/20"
                            >
                                Nasledujúca
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Side: Audio Player & Cover (FIXED POSITION) */}
                <div className="w-full lg:w-[380px] flex-shrink-0 flex flex-col gap-5 h-full overflow-y-auto no-scrollbar pb-6">

                    {/* Grammar Card replaces cover or sits above if active */}
                    {activeWord && (
                        <div className="w-full bg-gray-900 rounded-3xl shadow-2xl border border-gray-800 overflow-hidden relative z-20 shrink-0">
                            <div className="p-3 border-b border-gray-800/60 bg-gray-900/90 flex justify-between items-center">
                                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider pl-2">Slovník záchrany</span>
                                <button onClick={() => setActiveWord(null)} className="text-gray-500 hover:text-white p-1">✕</button>
                            </div>
                            <GrammarCard
                                word={activeWord}
                                data={activeData}
                                loading={isGenerating}
                                onSave={handleSaveWord}
                                saved={savedWords.has(activeWord)}
                                onClose={() => setActiveWord(null)} // Not using this close, but passed anyway
                            />
                        </div>
                    )}

                    {/* The Player itself */}
                    {chapter.audioSrc ? (
                        <div className="shadow-2xl rounded-3xl overflow-hidden border border-gray-800/60 bg-gray-900/50 backdrop-blur shrink-0">
                            <LessonAudioPlayer src={chapter.audioSrc} title={chapter.title} compact={true} />
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center shrink-0 p-8 bg-gray-900/50 border border-gray-800/50 rounded-3xl text-gray-500 h-40">
                            <Volume2 className="w-8 h-8 opacity-20 mb-2" />
                            <p className="text-sm font-medium">Audio nie je k dispozícii pre túto kapitolu</p>
                        </div>
                    )}

                    {/* Cover art block (hide if vocabulary is open to save vertical space on smaller screens) */}
                    {!activeWord && (chapter.image || ebook.coverImage) && (
                        <div className="w-full flex-1 min-h-0 rounded-3xl overflow-hidden shadow-2xl border border-gray-800 relative bg-gray-900 hidden lg:flex items-center justify-center">
                            <img src={chapter.image || ebook.coverImage} alt={chapter.title || ebook.title} className="w-full h-full object-contain p-2 drop-shadow-2xl opacity-90" />
                        </div>
                    )}
                </div>
            </div>

            {/* Shadowing Exercise Overlay */}
            {showShadowing && (
                <ShadowingExercise
                    sentences={chapter.sentences}
                    audioSrc={chapter.audioSrc || null}
                    title={chapter.title}
                    onClose={() => setShowShadowing(false)}
                />
            )}

            {/* Table of Contents Modal */}
            {showToc && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowToc(false)}>
                    <div className="bg-gray-900 border border-gray-800 shadow-2xl rounded-3xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold flex items-center gap-3">
                                <BookText className="text-indigo-400" />
                                Kapitoly
                            </h3>
                            <button onClick={() => setShowToc(false)} className="text-gray-500 hover:text-white">✕</button>
                        </div>
                        <div className="space-y-2">
                            {ebook.chapters.map((ch, idx) => (
                                <button
                                    key={ch.id}
                                    onClick={() => { setCurrentChapterIdx(idx); setShowToc(false); }}
                                    className={`w-full text-left px-5 py-4 rounded-xl border flex items-center gap-4 transition-all ${currentChapterIdx === idx
                                        ? 'bg-indigo-900/30 border-indigo-500/50 text-indigo-300 shadow-lg'
                                        : 'bg-gray-800/30 border-gray-800/50 hover:bg-gray-800 hover:border-gray-700 text-gray-300'}`}
                                >
                                    <span className={`flex items-center justify-center w-8 h-8 rounded-lg font-black text-sm shrink-0 ${currentChapterIdx === idx ? 'bg-indigo-500 text-white shadow-lg' : 'bg-gray-700 text-gray-400'}`}>
                                        {idx + 1}
                                    </span>
                                    <span className="font-medium line-clamp-2">{ch.title}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
