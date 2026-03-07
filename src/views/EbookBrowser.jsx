import React from 'react';
import { BookOpen } from 'lucide-react';
import { EBOOKS } from '../data/ebooks';

export default function EbookBrowser({ onSelectEbook }) {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in pb-12">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-gradient-to-br from-indigo-900/30 to-slate-900/50 p-6 md:p-8 rounded-3xl border border-indigo-500/10">
                <div>
                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight flex items-center gap-3">
                        <BookOpen className="w-10 h-10 text-indigo-400" />
                        E-Knihy
                    </h1>
                    <p className="text-indigo-200 mt-2 text-lg">Predĺžené príbehy s kapitolami a audiom</p>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {EBOOKS.map(ebook => (
                    <button
                        key={ebook.id}
                        onClick={() => onSelectEbook(ebook.id)}
                        className="group relative flex gap-5 p-5 bg-gray-900 rounded-3xl border border-gray-800 hover:border-indigo-500 hover:bg-gray-800/80 transition-all text-left overflow-hidden"
                    >
                        <div className="w-28 h-40 flex-shrink-0 bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700/50 relative z-10">
                            {ebook.coverImage ? (
                                <img src={ebook.coverImage} alt={ebook.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
                                    <BookOpen className="w-8 h-8 mb-2 opacity-50" />
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col justify-between py-1 relative z-10">
                            <div>
                                <span className="inline-block px-2.5 py-1 bg-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase tracking-wider rounded-lg mb-2 border border-indigo-500/20">
                                    Niveau {ebook.cefr}
                                </span>
                                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">{ebook.title}</h3>
                                <p className="text-xs text-indigo-400/80 mb-2">{ebook.titleSk}</p>
                                <p className="text-sm text-gray-400 line-clamp-3">{ebook.description}</p>
                            </div>
                            <div className="text-xs font-medium text-gray-500 mt-3 pt-3 border-t border-gray-800/50">
                                {ebook.chapters.length} kapitola{ebook.chapters.length !== 1 ? 'y' : ''}
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
