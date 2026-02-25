import React, { useState, useEffect } from 'react';
import { Target, X } from 'lucide-react';

const INTENTIONS = [
    "Nasávam slovíčka s takou ľahkosťou ako špongia.",
    "Mám pokojnú myseľ a som pripravený vnímať gramatiku s ľahkosťou.",
    "Dovoľujem si plynulo a ľahko vstrebávať nemecké vety.",
    "Moja pamäť je dnes na vrchole a učenie ma skutočne baví.",
    "Prijímam rolu študenta – chyby ma tešia, pretože vďaka nim rastiem.",
];

export default function SegmentIntending({ onComplete }) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeIntention, setActiveIntention] = useState(null);
    const [phase, setPhase] = useState('selection'); // 'selection' | 'breathing' | 'intending'
    const [breathStage, setBreathStage] = useState(0); // 0: inhale, 1: hold, 2: exhale, 3: done

    const handleSelect = (text) => {
        setActiveIntention(text);
        setPhase('breathing');
        setBreathStage(0);
    };

    useEffect(() => {
        if (phase === 'breathing') {
            // 4s Inhale
            const t1 = setTimeout(() => setBreathStage(1), 4000);
            // 4s Hold
            const t2 = setTimeout(() => setBreathStage(2), 8000);
            // 8s Exhale
            const t3 = setTimeout(() => setBreathStage(3), 16000);

            // Move to intending phase after full cycle
            const t4 = setTimeout(() => setPhase('intending'), 17500);

            return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
        }
    }, [phase]);

    const STAGES = [
        { text: "Zhlboka sa nadýchni...", sub: "Načerpaj čerstvú energiu (4s)", scale: "scale-150", duration: "duration-[4000ms]" },
        { text: "Zadrž dych...", sub: "Ukotvi svoj zámer v tele (4s)", scale: "scale-150", duration: "duration-[4000ms]" },
        { text: "Pomaly vydýchni...", sub: "Uvoľni všetok stres a napätie (8s)", scale: "scale-100", duration: "duration-[8000ms]" },
        { text: "Si pripravený.", sub: "Začíname...", scale: "scale-100", duration: "duration-500" }
    ];

    if (phase === 'breathing') {
        const stage = STAGES[breathStage];
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/95 backdrop-blur-md animate-fade-in transition-all">
                <div className="absolute top-8 right-8">
                    <button onClick={onComplete} className="px-4 py-2 text-sm text-gray-500 hover:text-white border border-gray-800 hover:bg-gray-800 rounded-full transition-all">
                        Preskočiť
                    </button>
                </div>

                <div className="text-center p-8 max-w-2xl w-full flex flex-col items-center justify-center">
                    <p className="text-2xl font-black text-white italic leading-relaxed px-4 mb-16 opacity-80">"{activeIntention}"</p>

                    <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                        {/* The expanding/shrinking breathing circle */}
                        <div
                            className={`absolute inset-0 bg-emerald-500/30 rounded-full blur-xl transition-all ease-in-out ${stage.scale} ${stage.duration}`}
                        ></div>

                        {/* Solid inner circle */}
                        <div className={`w-28 h-28 bg-emerald-900 border border-emerald-500/50 rounded-full flex items-center justify-center relative z-10 shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all ease-in-out ${stage.scale} ${stage.duration}`}>
                            <Target size={40} className="text-emerald-400 opacity-80" />
                        </div>
                    </div>

                    <div className="h-24 mt-12 flex flex-col justify-center">
                        <p className="text-3xl font-bold text-emerald-400 mb-2">{stage.text}</p>
                        <p className="text-gray-400 uppercase tracking-widest text-xs font-bold">{stage.sub}</p>
                    </div>
                </div>
            </div>
        );
    }

    if (phase === 'intending') {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/95 backdrop-blur-md animate-fade-in transition-all">
                <div className="text-center p-8 max-w-2xl w-full flex flex-col items-center justify-center">
                    <div className="w-20 h-20 bg-emerald-900 border border-emerald-500/50 rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                        <Target size={32} className="text-emerald-400" />
                    </div>

                    <h2 className="text-emerald-400 uppercase tracking-widest text-sm font-bold mb-8 animate-pulse">
                        Teraz to vyslov nahlas alebo pošepkaj
                    </h2>

                    <p className="text-4xl font-black text-white italic leading-tight px-4 mb-4">
                        "{activeIntention}"
                    </p>

                    <p className="text-gray-400 text-sm mb-16 max-w-lg mx-auto leading-relaxed">
                        Sústredil si svoju myseľ dychom. Teraz dovoľ svojmu telu túto vetu precítiť. Keď si stotožnený so svojím zámerom, môžeme začať lekciu.
                    </p>

                    <button
                        onClick={onComplete}
                        className="w-full max-w-xs bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-emerald-500/20 transition-all text-lg"
                    >
                        Som pripravený učiť sa
                    </button>
                    <button
                        onClick={() => { setPhase('selection'); setIsOpen(false); }}
                        className="mt-6 text-sm text-gray-500 hover:text-white transition-colors"
                    >
                        Zrušiť
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-4">
            {!isOpen ? (
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-full bg-gray-900 border border-emerald-900/50 hover:border-emerald-500/50 shadow-sm py-4 flex items-center justify-center gap-3 text-emerald-400 hover:bg-emerald-950/20 transition-all font-semibold rounded-2xl group"
                >
                    <Target size={20} className="group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                        <span className="block text-emerald-100 mb-0.5">Prípravný a dýchací rituál</span>
                        <span className="block text-xs text-emerald-500 font-normal">Sústrediť a upokojiť myseľ pred učením (16s)</span>
                    </div>
                </button>
            ) : (
                <div className="bg-gray-950 border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.15)] rounded-2xl p-6 animate-fade-in relative mt-2">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-4 right-4 text-gray-500 hover:text-white p-2 rounded-lg hover:bg-gray-900"
                    >
                        <X size={20} />
                    </button>

                    <h3 className="text-xl font-black text-white pr-8 mb-3 flex items-center gap-2">
                        <Target size={24} className="text-emerald-400" /> Vyber si svoj zámer
                    </h3>
                    <p className="text-sm text-gray-400 mb-8 leading-relaxed max-w-[90%]">
                        Mozog v strese odmieta ukladanie nových informácií. Klikni na zámer, ktorý tvoja myseľ práve potrebuje, a prejdeme si krátkym vedeným dýchaním.
                    </p>

                    <div className="space-y-3">
                        {INTENTIONS.map((text, i) => (
                            <button
                                key={i}
                                onClick={() => handleSelect(text)}
                                className="w-full text-left p-5 rounded-2xl border border-gray-800 bg-gray-900 hover:bg-emerald-950/40 hover:border-emerald-500/50 transition-all group flex items-start gap-4 outline-none focus:ring-2 ring-emerald-500/50"
                            >
                                <div className="w-6 h-6 rounded-full border border-gray-600 flex items-center justify-center flex-shrink-0 group-hover:border-emerald-400 mt-0.5 transition-colors">
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <span className="text-gray-300 font-medium leading-relaxed group-hover:text-emerald-100 transition-colors">{text}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
