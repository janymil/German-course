import React from 'react';
import { PenLine, Volume2, Eye, Brain, Repeat2, Mic, CheckCircle2, Lightbulb } from 'lucide-react';

const METHODS = [
    {
        Icon: PenLine,
        color: 'amber',
        name: 'Napíš 3×',
        tagline: 'Písanie aktivuje motorickú pamäť',
        description: 'Zvýrazni kľúčové slovo/vetu a napíš ho do zošita 3-krát rukou. Každý raz skús písať bez pozerania na predchádzajúci riadok.',
        tasks: ['Otvor svoj zošit', 'Napíš kľúčovú frázu 3× za sebou', 'Pri 3. pokuse zakry predchádzajúce riadky'],
        science: 'Štúdie ukazujú, že ručné písanie zlepšuje zapamätanie o 35% oproti len čítaniu.',
    },
    {
        Icon: Volume2,
        color: 'rose',
        name: 'Hovor nahlas 5×',
        tagline: 'Sluchová + pohybová pamäť súčasne',
        description: 'Prečítaj si vetu potichu raz. Potom ju hovor plným hlasom — nie šeptom — 5-krát. Každé opakovanie povedz trochu rýchlejšie.',
        tasks: ['Prečítaj si vetu raz potichu', 'Hovor nahlas 5× — začni pomaly', 'Každé opakovanie o kúsok rýchlejšie'],
        science: 'Hovoriť nahlas stimuluje 3 oblasti mozgu naraz: vizuálnu, sluchovú a motorickú.',
    },
    {
        Icon: Mic,
        color: 'indigo',
        name: 'Shadowing',
        tagline: 'Opakuj okamžite po počutí',
        description: 'Klikni prehrať (reproduktor) a okamžite — bez pauzy — opakuj to, čo počuješ. Snaž sa kopírovať aj rytmus a intonáciu.',
        tasks: ['Prehraj nahrávku', 'Okamžite opakuj — bez pauzy!', 'Zopakuj toto celkovo 3×'],
        science: 'Aktivuje fonetickú slučku pracovnej pamäte. Využívajú to profesionálni tlmočníci.',
    },
    {
        Icon: Eye,
        color: 'emerald',
        name: 'Zakry & Vybavuj',
        tagline: 'Najsilnejšia metóda učenia',
        description: 'Zakry slovenský preklad. Skús si slovo vybaviť sám. Odkry a skontroluj. Ak nevieš — pozri, zakry znova a skúšaj znova.',
        tasks: ['Pozri si preklad', 'Zakry ho rukou', 'Skús si vybaviť nemecké slovo', 'Over svoju odpoveď'],
        science: 'Aktívne vybavovanie (retrieval practice) je najefektívnejšia doteraz známa technika učenia.',
    },
    {
        Icon: Brain,
        color: 'violet',
        name: 'Vizualizuj scénu',
        tagline: 'Emócia + obraz = trvalá pamäť',
        description: 'Zavri oči a vytvor živý mentálny obraz. Kde si? Čo vidíš? Čím silnejší obraz, tým ho mozog lepšie udrží.',
        tasks: ['Zavri oči', 'Predstav si konkrétnu situáciu, kde vetu hovoríš', 'Nadviaž na vetu emóciu (napr. smiech, prekvapenie)'],
        science: 'Metóda loci a vizualizácua využíva staršie, hlbšie a priestorové časti mozgu, ktoré si veci pamätajú dlhšie.',
    }
];

const COLOR = {
    amber: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    rose: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
    indigo: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400',
    emerald: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    violet: 'bg-violet-500/10 border-violet-500/30 text-violet-400',
    cyan: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
};

export default function StudyCoachPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-10">
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {METHODS.map((method, idx) => {
                    const { Icon, color, name, tagline, description, tasks, science } = method;
                    const bgBorderText = COLOR[color];
                    return (
                        <div key={idx} className={`rounded-3xl border p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-${color}-900/20 ${bgBorderText.split(' ')[0]} ${bgBorderText.split(' ')[1]} bg-opacity-50 backdrop-blur-sm`}>
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
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Ako na to:</p>
                                    <ul className="space-y-2">
                                        {tasks.map((task, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                                                <CheckCircle2 size={16} className={`flex-shrink-0 mt-0.5 ${bgBorderText.split(' ')[2]}`} />
                                                <span className="leading-tight">{task}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-gray-900/60 rounded-xl p-3 border border-gray-800 flex items-start gap-2">
                                    <Lightbulb size={16} className="text-yellow-500 flex-shrink-0 mt-0.5" />
                                    <p className="text-xs text-gray-400 italic">{science}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
