import React from 'react';
import { BookOpen, Layers, ChevronRight, Sparkles } from 'lucide-react';

export default function LessonModeSelect({ lesson, onSelectMode, onBack }) {
    return (
        <div className="max-w-xl mx-auto py-10 px-4 animate-fade-in text-center">
            <h2 className="text-2xl font-black text-white mb-2">Ako sa chceš dnes učiť?</h2>
            <p className="text-gray-400 mb-8 max-w-sm mx-auto">Vyber si metodológiu, ktorá ti práve teraz viac vyhovuje pre lekciu <span className="text-indigo-300 font-semibold">"{lesson.title}"</span>.</p>

            <div className="space-y-4">
                <button
                    onClick={() => onSelectMode('classic')}
                    className="w-full text-left bg-gray-900 border-2 border-gray-800 hover:border-gray-600 rounded-3xl p-6 transition-all group"
                >
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            <BookOpen size={24} className="text-gray-400" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-white flex items-center justify-between">
                                Klasická metóda
                                <ChevronRight size={20} className="text-gray-600 group-hover:text-white transition-colors" />
                            </h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Najprv si prečítaš všetku gramatiku a teóriu naraz. Potom nasleduje séria všetkých cvičení za sebou. Dobré ako ťahák.
                            </p>
                            <div className="flex gap-1 pt-1">
                                <div className="h-1.5 w-1/4 bg-violet-500 rounded-full" title="Teória"></div>
                                <div className="h-1.5 w-3/4 bg-emerald-500 rounded-full" title="Prax"></div>
                            </div>
                        </div>
                    </div>
                </button>

                <button
                    onClick={() => onSelectMode('interleaved')}
                    className="w-full text-left bg-indigo-950/20 border-2 border-indigo-900/50 hover:border-indigo-500 rounded-3xl p-6 transition-all group relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-bl-xl">Odporúčané</div>
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-indigo-900 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-indigo-900/50">
                            <Layers size={24} className="text-indigo-400" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-indigo-100 flex items-center justify-between">
                                Moderná bloková metóda
                                <ChevronRight size={20} className="text-indigo-500 group-hover:text-white transition-colors" />
                            </h3>
                            <p className="text-sm text-indigo-200/70 leading-relaxed">
                                Interleaving (Dávkovanie). Učíš sa v malých blokoch. Kúsok teórie, hneď si to precvičíš, potom ďalší kúsok teórie a opäť prax.
                            </p>
                            <div className="flex gap-1 pt-1">
                                <div className="h-1.5 w-1/6 bg-violet-400 rounded-full opacity-80"></div>
                                <div className="h-1.5 w-2/6 bg-emerald-400 rounded-full opacity-80"></div>
                                <div className="h-1.5 w-1/6 bg-violet-400 rounded-full opacity-80"></div>
                                <div className="h-1.5 w-2/6 bg-emerald-400 rounded-full opacity-80"></div>
                            </div>
                        </div>
                    </div>
                </button>
            </div>

            <button onClick={onBack} className="mt-8 text-gray-500 hover:text-white text-sm font-medium transition-colors">
                ← Zrušiť a vrátiť sa späť
            </button>
        </div>
    );
}
