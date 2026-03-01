import React, { useState } from 'react';
import { STORIES } from '../data/stories';
import { BookOpen, ChevronRight, Star, Lock, CheckCircle, Plus, Loader2, X } from 'lucide-react';

const CEFR_COLOR = {
    'A1': 'bg-emerald-900/50 text-emerald-300 border-emerald-700',
    'A2': 'bg-sky-900/50 text-sky-300 border-sky-700',
};

// How many lessons must be completed before each story unlocks
// story_01 is always open, the rest require progressive lesson completion
const STORY_UNLOCK_LESSONS = {
    story_01: 0,
    story_02: 3,
    story_03: 6,
    story_04: 9,
    story_05: 12,
};

export default function StoryBrowser({ onSelectStory, progress }) {
    const completedCount = Object.keys(progress?.completedLessons || {}).length;
    const storiesRead = progress?.storiesRead || {};

    const [showModal, setShowModal] = useState(false);
    const [importText, setImportText] = useState('');
    const [isImporting, setIsImporting] = useState(false);
    const [importError, setImportError] = useState(null);

    const handleImport = async () => {
        if (!importText.trim()) return;
        setIsImporting(true);
        setImportError(null);
        try {
            const res = await fetch('/api/generate-story', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: importText.trim() })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Nastala chyba pri spracovaní textu.');

            // Success: reload the page to get the updated stories.js bundle
            window.location.reload();
        } catch (err) {
            setImportError(err.message);
            setIsImporting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-900/60 flex items-center justify-center">
                        <BookOpen size={20} className="text-indigo-400" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Čítanie s porozumením</h2>
                        <p className="text-sm text-gray-500">Klikni na slovo → gramatická karta s pádmi, časovaním a viac</p>
                    </div>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors"
                >
                    <Plus size={16} /> Pridať vlastný príbeh
                </button>
            </div>

            {/* Info banner */}
            <div className="bg-indigo-950/40 border border-indigo-800/50 rounded-2xl px-5 py-4 flex items-start gap-3">
                <Star size={16} className="text-indigo-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-indigo-200 leading-relaxed">
                    Prečítaj si príbeh, klikni na akékoľvek slovo a získaj okamžitú gramatickú kartu — pády, časovanie, predložky.
                    Slová si môžeš uložiť priamo do SRS trénera slovíčok.
                </p>
            </div>

            {/* Story cards */}
            <div className="space-y-3">
                {STORIES.map((story) => {
                    const requiredLessons = STORY_UNLOCK_LESSONS[story.id] ?? 0;
                    const isUnlocked = completedCount >= requiredLessons;
                    const isRead = !!storiesRead[story.id];
                    const wordCount = Object.keys(story.words).length;
                    const sentenceCount = story.sentences.length;

                    return (
                        <button
                            key={story.id}
                            onClick={() => isUnlocked && onSelectStory(story.id)}
                            disabled={!isUnlocked}
                            className={`w-full text-left border rounded-2xl p-5 transition-all group relative overflow-hidden
                                ${isUnlocked
                                    ? 'bg-gray-900 hover:bg-gray-800/80 border-gray-800 hover:border-indigo-700/50 cursor-pointer'
                                    : 'bg-gray-900/40 border-gray-800/50 cursor-not-allowed opacity-60'
                                }`}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${CEFR_COLOR[story.cefr] || CEFR_COLOR['A1']}`}>
                                            {story.cefr}
                                        </span>
                                        {story.lessonRange && (
                                            <span className="text-xs text-gray-600">Lekcie {story.lessonRange[0]}–{story.lessonRange[1]}</span>
                                        )}
                                        {isRead && (
                                            <span className="flex items-center gap-1 text-xs text-emerald-500">
                                                <CheckCircle size={11} /> Prečítané
                                            </span>
                                        )}
                                    </div>
                                    <h3 className={`font-bold text-lg transition-colors ${isUnlocked ? 'text-white group-hover:text-indigo-300' : 'text-gray-500'}`}>
                                        {story.title}
                                    </h3>
                                    <p className="text-sm text-gray-400 mt-0.5">{story.titleSk} — {story.description}</p>
                                    <div className="flex gap-4 mt-3 text-xs text-gray-600">
                                        <span>{sentenceCount} viet</span>
                                        <span>{wordCount} klikateľných slov</span>
                                        <span>{story.quiz.length} kvíz otázky</span>
                                    </div>
                                </div>

                                {isUnlocked
                                    ? <ChevronRight size={20} className="text-gray-600 group-hover:text-indigo-400 flex-shrink-0 mt-1 transition-colors" />
                                    : (
                                        <div className="flex flex-col items-center gap-1 flex-shrink-0 mt-1">
                                            <Lock size={18} className="text-gray-600" />
                                            <span className="text-[10px] text-gray-600 text-center leading-tight">
                                                {requiredLessons - completedCount} lekcií
                                            </span>
                                        </div>
                                    )
                                }
                            </div>

                            {/* Unlock progress bar for locked stories */}
                            {!isUnlocked && (
                                <div className="mt-4">
                                    <div className="flex justify-between text-[10px] text-gray-600 mb-1">
                                        <span>Vyžaduje {requiredLessons} lekcií</span>
                                        <span>{completedCount}/{requiredLessons}</span>
                                    </div>
                                    <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-indigo-700/50 rounded-full transition-all"
                                            style={{ width: `${Math.min(100, (completedCount / requiredLessons) * 100)}%` }}
                                        />
                                    </div>
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Import Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 w-full max-w-2xl shadow-2xl relative">
                        <button
                            onClick={() => !isImporting && setShowModal(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                            disabled={isImporting}
                        >
                            <X size={24} />
                        </button>

                        <h3 className="text-xl font-bold text-white mb-2">Pridať vlastný príbeh</h3>
                        <p className="text-gray-400 mb-6 text-sm">
                            Vlož nemecký text (článok, rozprávku, dialog). Umelá inteligencia ho automaticky rozdelí na vety, preloží, vytvorí detailné gramatické karty pre každé slovo a vygeneruje kvalitné audio.
                        </p>

                        <textarea
                            value={importText}
                            onChange={e => setImportText(e.target.value)}
                            placeholder="Hier deutschen Text einfügen..."
                            disabled={isImporting}
                            className="w-full h-48 bg-gray-950 border border-gray-800 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 resize-none transition-colors"
                        />

                        {importError && (
                            <div className="mt-4 text-sm text-rose-400 bg-rose-950/50 p-3 rounded-lg border border-rose-900/50">
                                ❌ {importError}
                            </div>
                        )}

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                disabled={isImporting}
                                className="px-5 py-2.5 rounded-xl text-gray-400 hover:text-white font-semibold transition-colors disabled:opacity-50"
                            >
                                Zrušiť
                            </button>
                            <button
                                onClick={handleImport}
                                disabled={isImporting || importText.trim().length < 20}
                                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-800 disabled:text-gray-500 text-white px-6 py-2.5 rounded-xl font-bold transition-all"
                            >
                                {isImporting ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        AI Agent pracuje (môže to trvať minútu)...
                                    </>
                                ) : (
                                    <>Spracovať príbeh</>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
