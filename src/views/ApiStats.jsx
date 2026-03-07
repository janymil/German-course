import React, { useEffect, useState } from 'react';
import { Activity, Zap, Cpu, Server, DollarSign, Database } from 'lucide-react';

const PRICING = {
    'gemini-2.5-pro': { name: 'Gemini 2.5 Pro', inputPrice: 1.25 / 1000000, outputPrice: 10.00 / 1000000, freeTier: true, type: 'language' },
    'gemini-2.5-flash-lite': { name: 'Gemini 2.5 Flash Lite', inputPrice: 0.075 / 1000000, outputPrice: 0.30 / 1000000, freeTier: true, type: 'language' },
    'gpt-4o-mini': { name: 'GPT-4o Mini', inputPrice: 0.15 / 1000000, outputPrice: 0.60 / 1000000, freeTier: false, type: 'language' },
    'openai-tts': { name: 'OpenAI TTS-1 HD', inputPrice: 0, outputPrice: 30.00 / 1000000, freeTier: false, type: 'speech', unitOut: 'char' },
    'openai-tts-standard': { name: 'OpenAI TTS-1 Standard', inputPrice: 0, outputPrice: 15.00 / 1000000, freeTier: false, type: 'speech', unitOut: 'char' },
    'openai-whisper': { name: 'OpenAI Whisper STT', inputPrice: 0.0001, outputPrice: 0, freeTier: false, type: 'speech', unitIn: 'sec' }
};

export default function ApiStats() {
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);
    const [kbStats, setKbStats] = useState(null);

    useEffect(() => {
        fetch('/api/stats')
            .then(res => res.json())
            .then(data => {
                setStats(data || {});
                setLoading(false);
            })
            .catch((e) => {
                console.error('Failed to load api stats', e);
                setLoading(false);
            });

        fetch('/api/kb/stats')
            .then(res => res.json())
            .then(data => setKbStats(data))
            .catch(() => {});
    }, []);

    let calculatedCost = 0;
    let calculatedSaved = 0;

    const displays = Object.entries(stats).map(([modelKey, rawData]) => {
        const config = PRICING[modelKey] || { name: modelKey, inputPrice: 0, outputPrice: 0, freeTier: false, type: 'language' };
        const inputs = rawData.inputTokens || rawData.seconds || 0;
        const outputs = rawData.outputTokens || rawData.characters || 0;
        const calls = rawData.calls || 0;

        let cost = (inputs * config.inputPrice) + (outputs * config.outputPrice);
        let originalCostStr = cost.toFixed(4);

        if (config.freeTier) {
            calculatedSaved += cost;
            cost = 0;
        } else {
            calculatedCost += cost;
        }

        return (
            <div key={modelKey} className="bg-gray-800/50 border border-gray-700/60 rounded-2xl p-6 transition-all shadow-inner hover:shadow-md hover:bg-gray-800 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${config.freeTier ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-amber-500/10 border-amber-500/20 text-amber-400'}`}>
                            {config.type === 'language' ? <Cpu size={20} /> : <Zap size={20} />}
                        </div>
                        <div>
                            <h3 className="font-bold text-white tracking-wide leading-none">{config.name}</h3>
                            <p className="text-xs text-gray-400 mt-1">{calls} {calls === 1 ? 'zavolanie' : (calls > 1 && calls < 5) ? 'zavolania' : 'zavolaní'} na API</p>
                        </div>
                    </div>
                    <div className="text-right">
                        {config.freeTier ? (
                            <div>
                                <p className="text-emerald-400 font-bold text-lg leading-none">FREE</p>
                                <p className="text-[10px] text-emerald-500/70 line-through mt-0.5">${originalCostStr}</p>
                            </div>
                        ) : (
                            <p className="text-amber-400 font-bold text-lg leading-none">${cost.toFixed(4)}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-auto pt-4 border-t border-gray-800/60">
                    <div className="bg-gray-900/60 rounded-xl p-3 border border-gray-810">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-0.5">Vstup (In)</p>
                        <p className="text-base font-bold text-indigo-300">
                            {inputs.toLocaleString('en-US')} <span className="text-xs text-indigo-500/50 font-medium">{config.unitIn || 'tokens'}</span>
                        </p>
                    </div>
                    <div className="bg-gray-900/60 rounded-xl p-3 border border-gray-810">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-0.5">Výstup (Out)</p>
                        <p className="text-base font-bold text-pink-300">
                            {outputs.toLocaleString('en-US')} <span className="text-xs text-pink-500/50 font-medium">{config.unitOut || 'tokens'}</span>
                        </p>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className="w-full max-w-5xl mx-auto flex flex-col h-full bg-gray-950 pb-20">
            <div className="px-6 sm:px-10 mb-8 pt-8">
                <h2 className="text-3xl font-extrabold text-white flex items-center gap-3">
                    <Activity size={32} className="text-indigo-400" />
                    API Štatistiky
                </h2>
                <p className="text-gray-400 text-sm mt-3 leading-relaxed max-w-2xl">
                    Prehľad spotrebovaných tokenov, volaní a celkových nákladov za využívanie AI modelov na generovanie lekcií, hlasu a vyhodnocovanie vašich cvičení.
                </p>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 opacity-50">
                    <Server className="animate-pulse mb-4 text-indigo-500" size={48} />
                    <p className="text-gray-400 ml-2 animate-pulse">Načítavam dáta zo servera...</p>
                </div>
            ) : Object.keys(stats).length === 0 ? (
                <div className="flex flex-col items-center justify-center p-20 opacity-50 text-center">
                    <Database size={64} className="text-gray-700 mb-6" />
                    <h3 className="text-2xl font-bold text-gray-400 mb-2">Zatiaľ žiadne záznamy</h3>
                    <p className="text-gray-500 max-w-sm">Doteraz neboli zaznamenané žiadne volania na AI modely. Použite nejakú funkciu s AI pre začiatok trackovania.</p>
                </div>
            ) : (
                <div className="px-6 sm:px-10 space-y-8">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                        {displays}
                    </div>

                    {kbStats && (
                        <div className="bg-gray-800/50 border border-gray-700/60 rounded-3xl p-6 sm:p-8 space-y-6">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
                                    <Database size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white tracking-wide">Knowledge Base Cache</h3>
                                    <p className="text-xs text-gray-400">
                                        Fuzzy matching: <span className={kbStats.fuzzyEnabled ? 'text-emerald-400 font-semibold' : 'text-gray-500'}>{kbStats.fuzzyEnabled ? `ZAP (≥${(kbStats.fuzzyThreshold * 100).toFixed(0)}% zhoda)` : 'VYP'}</span>
                                    </p>
                                </div>
                                <div className="ml-auto text-right">
                                    <p className="text-2xl font-extrabold text-sky-300">{(kbStats.totalHits || 0).toLocaleString('en-US')}</p>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">zaistené odpovede</p>
                                </div>
                            </div>

                            {(kbStats.byType || []).length > 0 && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {kbStats.byType.map(row => (
                                        <div key={row.type} className="bg-gray-900/60 border border-gray-800 rounded-xl p-3">
                                            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1">{row.type.replace(/_/g, ' ')}</p>
                                            <p className="text-base font-bold text-sky-300">{row.entries} <span className="text-xs text-gray-500 font-normal">zázn.</span></p>
                                            <p className="text-xs text-gray-400">{row.hits} hitov</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {(kbStats.topHits || []).length > 0 && (
                                <div>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-3">Top záznamy podľa hitov</p>
                                    <div className="space-y-2">
                                        {kbStats.topHits.map((row, i) => (
                                            <div key={i} className="flex items-center gap-3 bg-gray-900/40 rounded-xl px-4 py-2 border border-gray-800">
                                                <span className="text-xs text-gray-600 w-5 text-right font-mono">{i + 1}</span>
                                                <span className="text-xs text-indigo-300 font-semibold w-28 shrink-0">{row.type.replace(/_/g, ' ')}</span>
                                                <span className="text-xs text-gray-400 truncate flex-1">{row.key}</span>
                                                <span className="text-xs font-bold text-sky-400 shrink-0">{row.hitCount}×</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="bg-indigo-900/20 border border-indigo-700/40 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                                <DollarSign size={32} />
                            </div>
                            <div>
                                <p className="text-indigo-200 text-sm font-semibold tracking-wider uppercase mb-1">Cena (Premium API)</p>
                                <h2 className="text-4xl font-extrabold text-white">${calculatedCost.toFixed(4)} <span className="text-lg text-gray-400 font-medium">USD</span></h2>
                            </div>
                        </div>

                        <div className="bg-emerald-950/40 border border-emerald-800/50 rounded-2xl p-5 text-center sm:text-right min-w-[200px]">
                            <p className="text-emerald-400/80 text-xs font-bold uppercase tracking-wider mb-1">Celkovo ušetrené (Free Tier)</p>
                            <p className="text-2xl font-black text-emerald-400">+ ${calculatedSaved.toFixed(4)}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
