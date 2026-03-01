import React, { useMemo, useState, useEffect } from 'react';
import { PenLine, Volume2, Eye, Brain, Mic, CheckCircle2, Lightbulb, Target, BookOpen, Zap, TrendingUp, X, Play, Palette } from 'lucide-react';
import { useProgress } from '../hooks/useProgress';
import { LESSONS } from '../data/curriculum';
import { STORIES } from '../data/stories';
import { useTTS } from '../hooks/useTTS';

// ── Learning method cards ──────────────────────────────────
const METHODS = [
    {
        id: 'write3x',
        Icon: PenLine, color: 'amber', name: 'Napíš 3×', tagline: 'Písanie aktivuje motorickú pamäť',
        description: 'Zvýrazni kľúčové slovo/vetu a napíš ho do zošita 3-krát rukou. Každý raz skús písať bez pozerania na predchádzajúci riadok.',
        tasks: ['Otvor svoj zošit', 'Napíš kľúčovú frázu 3× za sebou', 'Pri 3. pokuse zakry predchádzajúce riadky'],
        science: 'Štúdie ukazujú, že ručné písanie zlepšuje zapamätanie o 35% oproti len čítaniu.',
    },
    {
        id: 'speak5x',
        Icon: Volume2, color: 'rose', name: 'Hovor nahlas 5×', tagline: 'Sluchová + pohybová pamäť súčasne',
        description: 'Prečítaj si vetu potichu raz. Potom ju hovor plným hlasom — nie šeptom — 5-krát. Každé opakovanie povedz trochu rýchlejšie.',
        tasks: ['Prečítaj si vetu raz potichu', 'Hovor nahlas 5× — začni pomaly', 'Každé opakovanie o kúsok rýchlejšie'],
        science: 'Hovoriť nahlas stimuluje 3 oblasti mozgu naraz: vizuálnu, sluchovú a motorickú.',
    },
    {
        id: 'shadowing',
        Icon: Mic, color: 'indigo', name: 'Shadowing', tagline: 'Opakuj okamžite po počutí',
        description: 'Klikni prehrať (reproduktor) a okamžite — bez pauzy — opakuj to, čo počuješ. Snaž sa kopírovať aj rytmus a intonáciu.',
        tasks: ['Prehraj nahrávku', 'Okamžite opakuj — bez pauzy!', 'Zopakuj toto celkovo 3×'],
        science: 'Aktivuje fonetickú slučku pracovnej pamäte. Využívajú to profesionálni tlmočníci.',
    },
    {
        id: 'coverRecall',
        Icon: Eye, color: 'emerald', name: 'Zakry & Vybavuj', tagline: 'Najsilnejšia metóda učenia',
        description: 'Zakry slovenský preklad. Skús si slovo vybaviť sám. Odkry a skontroluj. Ak nevieš — pozri, zakry znova a skúšaj znova.',
        tasks: ['Pozri si preklad', 'Zakry ho rukou', 'Skús si vybaviť nemecké slovo', 'Over svoju odpoveď'],
        science: 'Aktívne vybavovanie (retrieval practice) je najefektívnejšia doteraz známa technika učenia.',
    },
    {
        id: 'visualize',
        Icon: Brain, color: 'violet', name: 'Vizualizuj scénu', tagline: 'Emócia + obraz = trvalá pamäť',
        description: 'Zavri oči a vytvor živý mentálny obraz. Kde si? Čo vidíš? Čím silnejší obraz, tým ho mozog lepšie udrží.',
        tasks: ['Zavri oči', 'Predstav si konkrétnu situáciu, kde vetu hovoríš', 'Nadviaž na vetu emóciu (napr. smiech, prekvapenie)'],
        science: 'Metóda loci a vizualizácia využíva staršie, hlbšie a priestorové časti mozgu, ktoré si veci pamätajú dlhšie.',
    },
    {
        id: 'colors',
        Icon: Palette, color: 'cyan', name: '3 farby = 3 rody', tagline: 'Fyzický systém, nie len vizualizácia',
        description: 'Kúp si 3 farebné perá. Každé slovo píš VŽDY farbou svojho rodu — v zošite, vo vetách, pri precvičovaní. Nepíš "der Tisch" čiernou — píš ho modrou. Neznamená to len vizualizovať — znamená to fyzicky zmeniť pero.',
        tasks: [
            'DER → 🔵 modrá (mužský)',
            'DIE → 🔴 červená (ženský)',
            'DAS → 🟢 zelená (stredný)',
        ],
        science: 'Farba je ďalší kanál kódovania v mozgu. Keď fyzicky meníš pero, pridáš motorickú a vizuálnu stopu k jazykovej — to znamená 3× viac spojení.',
    },
];

const COLOR = {
    amber: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    rose: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
    indigo: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400',
    emerald: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    violet: 'bg-violet-500/10 border-violet-500/30 text-violet-400',
    cyan: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
};

// ── Interactive Demos ──────────────────────────────────────────────
function InteractiveDemoModal({ methodId, onClose }) {
    const { speak } = useTTS();
    const [step, setStep] = useState(0);
    const [inputVal, setInputVal] = useState('');
    const [revealed, setRevealed] = useState(false);

    // method matching
    const methodInfo = METHODS.find(m => m.id === methodId);
    if (!methodInfo) return null;

    const renderDemoContent = () => {
        switch (methodId) {
            case 'write3x':
                const targetPhrase = "Ich spreche Deutsch";
                return (
                    <div className="space-y-4 text-center">
                        <p className="text-gray-300">Tvoja úloha: Napíš frázu <strong className="text-white">"{targetPhrase}"</strong> Preskoč papier, skús urobiť tréningový prepis sem (bez toho aby si si to kopíroval!). Musíš to nahodiť {3 - step}×.</p>
                        <input
                            type="text"
                            value={inputVal}
                            onChange={(e) => {
                                setInputVal(e.target.value);
                                if (e.target.value.trim() === targetPhrase) {
                                    setStep(s => s + 1);
                                    setInputVal('');
                                }
                            }}
                            autoFocus
                            placeholder="Ich spreche..."
                            className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 w-full text-center text-white focus:outline-none focus:border-amber-500"
                            disabled={step >= 3}
                        />
                        <div className="flex justify-center gap-2 pt-2">
                            {[0, 1, 2].map(i => (
                                <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${i < step ? 'bg-emerald-500 text-white' : 'bg-gray-800 text-gray-500'}`}>
                                    {i < step ? '✓' : i + 1}
                                </div>
                            ))}
                        </div>
                        {step >= 3 && <p className="text-emerald-400 font-bold animate-pulse mt-4">Výborne! Svalová pamäť sa aktivovala.</p>}
                    </div>
                );

            case 'speak5x':
                return (
                    <div className="space-y-6 text-center">
                        <p className="text-gray-300">Fráza: <strong className="text-white text-xl block my-2">Es tut mir leid.</strong> (Je mi to ľúto)</p>
                        <p className="text-sm text-gray-400">Postav sa, nadýchni sa a povedz to zreteľne a nahlas. Potom klikni na tlačidlo.</p>
                        <button
                            onClick={() => setStep(s => s + 1)}
                            disabled={step >= 5}
                            className={`px-6 py-3 rounded-2xl font-bold transition-all shadow-lg ${step >= 5 ? 'bg-emerald-600 text-white cursor-not-allowed' : 'bg-rose-600 hover:bg-rose-500 text-white hover:scale-105'}`}
                        >
                            {step >= 5 ? 'Hotovo!' : `Povedal som to (${step}/5)`}
                        </button>
                        <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden mt-4">
                            <div className="bg-rose-500 h-full transition-all duration-300" style={{ width: `${(step / 5) * 100}%` }} />
                        </div>
                    </div>
                );

            case 'shadowing':
                return (
                    <div className="space-y-6 text-center">
                        <p className="text-gray-300">Shadowing znamená <strong>okamžité</strong> opakovanie. Nečakaj kým veta skončí!</p>
                        <div className="p-6 bg-indigo-900/20 border border-indigo-800/40 rounded-2xl mt-4">
                            <h3 className="text-2xl font-bold text-white mb-4">"Genau!"</h3>
                            <button
                                onClick={() => {
                                    speak("Genau!");
                                    setTimeout(() => setStep(1), 500);
                                }}
                                className="w-16 h-16 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full flex items-center justify-center mx-auto transition-transform hover:scale-105"
                            >
                                <Play size={24} className="ml-1" />
                            </button>
                            {step === 1 && (
                                <p className="text-emerald-400 font-bold text-lg mt-4 animate-pulse">Teraz ty: "Genau!"</p>
                            )}
                        </div>
                    </div>
                );

            case 'coverRecall':
                return (
                    <div className="space-y-6 text-center">
                        <p className="text-gray-300">Test vybavovania z pamäte (Retrieval Practice). Namiesto pasívneho prezerania, donúť mozog hľadať informáciu.</p>
                        <div className="w-full max-w-sm mx-auto perspective-1000 mt-6 cursor-pointer" onClick={() => setRevealed(!revealed)}>
                            <div className={`relative w-full h-40 transition-transform duration-500 preserve-3d flex items-center justify-center rounded-2xl border-2 ${revealed ? 'border-emerald-500 bg-emerald-900/20' : 'border-gray-700 bg-gray-800'}`}>
                                {!revealed ? (
                                    <div className="text-center">
                                        <p className="text-sm text-gray-400 uppercase tracking-widest mb-1">Ako povieš:</p>
                                        <p className="text-2xl font-bold text-white">Pes</p>
                                        <p className="text-xs text-gray-500 mt-4">(Kliknutím odkryješ)</p>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <p className="text-3xl font-bold text-white mb-2">der Hund</p>
                                        <p className="text-sm text-emerald-400 font-semibold flex items-center justify-center gap-1"><CheckCircle2 size={16} /> Správne vybavené ukladá stopu do mozgu!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );

            case 'visualize':
                const scenarios = [
                    "1. Zatvor oči.",
                    "2. Predstav si, že stojíš v rušnej pekárni vo Viedni. Vonia tam čerstvé pečivo.",
                    "3. Vidíš pre sebou čokoládový croissant.",
                    "4. Úsmev. Povedz: 'Ein Croissant, bitte.'"
                ];
                return (
                    <div className="space-y-6 text-center">
                        <div className="h-32 flex items-center justify-center">
                            <p className="text-xl font-bold text-violet-300 animate-fade-in transition-opacity" key={step}>
                                {scenarios[step]}
                            </p>
                        </div>
                        <div className="flex justify-center gap-2">
                            {step < scenarios.length - 1 ? (
                                <button onClick={() => setStep(s => s + 1)} className="px-6 py-2 bg-violet-600 hover:bg-violet-500 rounded-xl text-white font-semibold">Ďalej</button>
                            ) : (
                                <button onClick={() => setStep(0)} className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-xl text-white font-semibold">Skúsiť znova</button>
                            )}
                        </div>
                    </div>
                );

            case 'colors':
                const words = [
                    { de: "Tisch (Stôl)", genus: "der", color: "blue" },
                    { de: "Tür (Dvere)", genus: "die", color: "red" },
                    { de: "Buch (Kniha)", genus: "das", color: "green" },
                ];
                const activeWord = words[step] || words[2];
                return (
                    <div className="space-y-6 text-center">
                        <p className="text-gray-300">Zoraď slovo k jeho farbe! Namiesto bifľovania si pamätaj, že modrá = der, červená = die, zelená = das.</p>

                        <div className="py-6">
                            <p className="text-3xl font-black text-white">{activeWord.de}</p>
                            <p className="text-gray-500 mt-2 text-sm">{step < 3 ? 'Ktorá farba/rod k nemu patrí?' : 'Všetko správne!'}</p>
                        </div>

                        {step < 3 && (
                            <div className="flex justify-center gap-4">
                                <button onClick={() => activeWord.genus === 'der' ? setStep(s => s + 1) : null} className={`w-16 h-16 rounded-2xl bg-blue-600 hover:bg-blue-500 transition-transform ${activeWord.genus !== 'der' && 'hover:-translate-y-1'}`} />
                                <button onClick={() => activeWord.genus === 'die' ? setStep(s => s + 1) : null} className={`w-16 h-16 rounded-2xl bg-red-600 hover:bg-red-500 transition-transform ${activeWord.genus !== 'die' && 'hover:-translate-y-1'}`} />
                                <button onClick={() => activeWord.genus === 'das' ? setStep(s => s + 1) : null} className={`w-16 h-16 rounded-2xl bg-green-600 hover:bg-green-500 transition-transform ${activeWord.genus !== 'das' && 'hover:-translate-y-1'}`} />
                            </div>
                        )}
                        {step >= 3 && <p className="text-emerald-400 font-bold animate-pulse">Vizuálna pamäť funguje lepšie ako textová!</p>}
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-md animate-fade-in">
            <div className="bg-gray-900 border border-gray-700 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative">
                <div className="absolute top-4 right-4">
                    <button onClick={onClose} className="p-2 text-gray-500 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className={`px-6 py-5 border-b border-gray-800 ${COLOR[methodInfo.color].split(' ')[0]}`}>
                    <div className="flex items-center gap-3">
                        <methodInfo.Icon size={24} className={`text-${methodInfo.color}-400`} />
                        <h2 className="text-xl font-bold text-white">Tréning: {methodInfo.name}</h2>
                    </div>
                </div>

                <div className="p-8">
                    {renderDemoContent()}
                </div>
            </div>
        </div>
    );
}

// ── Today's Plan panel — reads Cerebro ─────────────────────────────────────────
function TodaysPlan({ progress, onNavigate }) {
    const plan = useMemo(() => {
        const items = [];
        const completedLessons = progress.completedLessons || {};
        const vocabSeen = progress.vocabSeen || {};
        const storiesRead = progress.storiesRead || {};
        const completedCount = Object.keys(completedLessons).length;

        // 1. Next lesson recommendation
        const nextLesson = LESSONS.find(l => !completedLessons[l.id]);
        if (nextLesson) {
            items.push({
                icon: '📚',
                priority: 'high',
                label: 'Pokračuj v lekcii',
                detail: nextLesson.title,
                action: 'weekly',
                actionLabel: 'Otvoriť plán →',
            });
        }

        // 2. Weak vocab (seen 1–2 times, not mastered) — top 5
        const weakWords = Object.entries(vocabSeen)
            .filter(([, v]) => !v.mastered && v.seenCount <= 2)
            .sort((a, b) => (b[1].wrongCount || 0) - (a[1].wrongCount || 0))
            .slice(0, 5)
            .map(([word]) => word);
        if (weakWords.length > 0) {
            items.push({
                icon: '🃏',
                priority: 'med',
                label: 'Zopakuj slabé slovíčka',
                detail: `${weakWords.length} slov čaká: ${weakWords.slice(0, 3).join(', ')}${weakWords.length > 3 ? '...' : ''}`,
                action: 'vocab',
                actionLabel: 'Tréner slovíčok →',
            });
        }

        // 3. Next unread story
        const storiesUnlocked = STORIES.filter((s, i) => completedCount >= [0, 3, 6, 9, 12][i]);
        const nextStory = storiesUnlocked.find(s => !storiesRead[s.id]);
        if (nextStory) {
            items.push({
                icon: '📖',
                priority: 'med',
                label: 'Prečítaj príbeh',
                detail: nextStory.title,
                action: 'stories',
                actionLabel: 'Otvoriť čítanie →',
            });
        }

        return items;
    }, [progress]);

    const priorityStyle = {
        high: 'border-l-indigo-500 bg-indigo-950/30',
        med: 'border-l-amber-500 bg-amber-950/20',
        low: 'border-l-gray-600 bg-gray-800/30',
    };

    return (
        <div className="bg-gray-900/80 border border-gray-800 rounded-3xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-2xl bg-indigo-900/60 flex items-center justify-center">
                    <Target size={20} className="text-indigo-400" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-white">Dnešný plán</h2>
                    <p className="text-xs text-gray-500">Coach analyzoval tvoj pokrok a odporúča:</p>
                </div>

                <div className="ml-auto flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                        <Zap size={12} className="text-yellow-400" />
                        {progress.xp || 0} XP
                    </span>
                    <span className="flex items-center gap-1">
                        <BookOpen size={12} className="text-sky-400" />
                        {Object.keys(progress.completedLessons || {}).length} lekcií
                    </span>
                    <span className="flex items-center gap-1">
                        <TrendingUp size={12} className="text-emerald-400" />
                        {Object.values(progress.vocabSeen || {}).filter(v => v.mastered).length} zvládnutých slov
                    </span>
                </div>
            </div>

            {plan.length === 0 ? (
                <div className="text-center py-8 text-gray-600">
                    <CheckCircle2 size={32} className="mx-auto mb-2 text-emerald-600" />
                    <p className="font-semibold text-emerald-500">Všetko hotové na dnes!</p>
                    <p className="text-sm mt-1">Skvelá práca. Vráť sa zajtra.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {plan.map((item, i) => (
                        <button
                            key={i}
                            onClick={() => onNavigate && onNavigate(item.action)}
                            className={`w-full text-left focus:outline-none border-l-4 rounded-r-xl px-4 py-3 flex items-center gap-3 transition-transform hover:-translate-y-0.5 hover:shadow-lg ${priorityStyle[item.priority]}`}>
                            <span className="text-xl flex-shrink-0">{item.icon}</span>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-white">{item.label}</p>
                                <p className="text-xs text-gray-400 truncate">{item.detail}</p>
                            </div>
                            <span className="text-xs text-indigo-400 flex-shrink-0 whitespace-nowrap font-semibold">{item.actionLabel}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

// ── Main export ────────────────────────────────────────────────────────────────
export default function StudyCoachPage({ onNavigate }) {
    const { progress } = useProgress();
    const [activeDemo, setActiveDemo] = useState(null);

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-10">
            {activeDemo && <InteractiveDemoModal methodId={activeDemo} onClose={() => setActiveDemo(null)} />}

            <div className="text-center space-y-4 pt-4">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 mb-2">
                    <Lightbulb size={40} />
                </div>
                <h1 className="text-4xl font-extrabold text-white tracking-tight">Vedecký Study Coach</h1>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                    Zabudni na pasívne prezeranie slovíčok. Tu sú overené, vedecky podložené metódy,
                    vďaka ktorým sa učíš rýchlejšie a pamätáš si dlhšie. Tieto princípy by si mal aplikovať počas cvičení.
                </p>
            </div>

            {/* TODAY'S PLAN — reads from Cerebro */}
            <TodaysPlan progress={progress} onNavigate={onNavigate} />

            {/* Method cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {METHODS.map((method, idx) => {
                    const { id, Icon, color, name, tagline, description, tasks, science } = method;
                    const bgBorderText = COLOR[color];
                    return (
                        <div key={idx} className={`rounded-3xl border p-6 flex flex-col transition-all duration-300 hover:shadow-lg ${bgBorderText.split(' ')[0]} ${bgBorderText.split(' ')[1]} bg-opacity-50 backdrop-blur-sm relative overflow-hidden group`}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`p-3 rounded-2xl flex-shrink-0 ${bgBorderText.split(' ')[0]} ${bgBorderText.split(' ')[2]}`}>
                                    <Icon size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">{name}</h3>
                                    <p className={`text-xs font-semibold uppercase tracking-wider ${bgBorderText.split(' ')[2]}`}>{tagline}</p>
                                </div>
                            </div>

                            <p className="text-sm text-gray-300 leading-relaxed mb-4">{description}</p>

                            <div className="mt-auto space-y-3">
                                <div className="bg-gray-950/40 rounded-xl p-4 border border-gray-800">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Postup:</p>
                                    <ul className="space-y-2">
                                        {tasks.map((task, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                                                <CheckCircle2 size={16} className={`flex-shrink-0 mt-0.5 ${bgBorderText.split(' ')[2]}`} />
                                                <span className="leading-tight">{task}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <button
                                    onClick={() => setActiveDemo(id)}
                                    className={`w-full py-3 mt-2 rounded-xl text-sm font-bold bg-gray-900 border border-gray-700 hover:border-gray-500 transition-colors flex items-center justify-center gap-2 text-white`}
                                >
                                    <Play size={16} /> Vyskúšať interaktívne
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
