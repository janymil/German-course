import React, { useState, useEffect } from 'react';
import { Lightbulb, Mic, PenLine, Palette, Eye, Brain, Repeat2, Volume2, X, CheckCircle2 } from 'lucide-react';

const WORD_METHODS = [
    {
        icon: Mic,
        color: 'indigo',
        name: 'Tieňovanie (Shadowing)',
        tagline: 'Opakuj okamžite po počutí',
        description: 'Nenúť sa spomínať si na preklad. Iba počúvaj zvuk a snaž sa presne napodobniť prízvuk a melódiu, akoby si bol ozvena.',
        tasks: ['Klikni na ikonu audia', 'Počúvaj slovo', 'Okamžite ho zopakuj nahlas']
    },
    {
        icon: Volume2,
        color: 'pink',
        name: 'Šepkanie (Whispering)',
        tagline: 'Aktivuj motorickú pamäť potichu',
        description: 'Nemusíš kričať. Počúvaj slovo a potom ho 3-krát za sebou pošepkaj. Dôležité je, aby si naplno pohyboval perami.',
        tasks: ['Pusti si zvuk', 'Výrazne pohybuj perami', 'Pošepkaj slovo 3× za sebou']
    },
    {
        icon: PenLine,
        color: 'amber',
        name: 'Píš a pozeraj (Pasívne)',
        tagline: 'Vizuálno-motorické spojenie',
        description: 'Nesnaž sa slovo vybaviť z pamäte. Len sa naň pozeraj a 3-krát ho prepíš do zošita. Nechaj mozog, aby si zvykol.',
        tasks: ['Priprav si zošit', 'Píš slovo a pozeraj na obrazovku', 'Zopakuj to 3-krát']
    },
    {
        icon: Palette,
        color: 'cyan',
        name: 'Farbosleposť na členy',
        tagline: 'Vizualizuj si rod',
        description: 'Prepoj slovo s farbou podľa jeho člena: DER = modrá, DIE = červená, DAS = zelená. Predstav si ho napísané farbou.',
        tasks: ['Zisti člen slova (der/die/das)', 'Zavri oči', 'Predstav si slovo žiarivou farbou rodu']
    },
    {
        icon: PenLine,
        color: 'emerald',
        name: 'Vzdušné písanie',
        tagline: 'Prepoj mozog a telo',
        description: 'Pozeraj na slovo a skús ho napísať prstom do vzduchu pred sebou. Tým aktivuješ priestorovú a motorickú pamäť.',
        tasks: ['Pozri sa na nemecké slovo', 'Zdvihni ukazovák', 'Napíš slovo prstom do vzduchu']
    }
];

const SENTENCE_METHODS = [
    {
        icon: Volume2,
        color: 'rose',
        name: 'Hovor nahlas 3×',
        tagline: 'Zvykni si na svoj nemecký hlas',
        description: 'Prečítaj si vetu potichu, porozumej jej a potom ju povedz nahlas, jasne a zreteľne 3-krát za sebou.',
        tasks: ['Prečítaj si vetu potichu', 'Nahlas a pomaly ju vyslov', 'Zopakuj ju 3×, postupne zrýchľuj']
    },
    {
        icon: Repeat2,
        color: 'cyan',
        name: 'Rytmus a Chunking',
        tagline: 'Krájaj vetu na kúsky',
        description: 'Ak je veta dlhá, rozdeľ ju na 2-3 logické celky (chunks). Hovor ich s rytmom, akoby to bola básnička.',
        tasks: ['Nájdi vo vete pauzy', 'Povedz prvú časť, potom druhú', 'Spoj to do 1 plynulého celku']
    },
    {
        icon: Brain,
        color: 'violet',
        name: 'Vizualizuj si scénu',
        tagline: 'Emočné kódovanie vety',
        description: 'Zavri oči a vytvor si v hlave obraz situácie. Kto túto vetu hovorí? Kde sa nachádza? Akú má emóciu?',
        tasks: ['Zavri na 5 sekúnd oči', 'Predstav si živú situáciu', 'Povedz vetu s emóciou']
    },
    {
        icon: PenLine,
        color: 'orange',
        name: 'Píš a Hovor (Dual Coding)',
        tagline: 'Zapojenie 3 zmyslov',
        description: 'Vezmi si pero, začni písať túto vetu do zošita a presne v tom istom čase ju hovor nahlas.',
        tasks: ['Priprav si zošit a pero', 'Začni pomaly písať', 'Pri každom slove ho vyslov nahlas']
    },
    {
        icon: Mic,
        color: 'indigo',
        name: 'Tieňovanie vety (Shadowing)',
        tagline: 'Rakúska intonácia',
        description: 'Pusti si zvuk vety a hovor spolu so systémom presne v tom istom čase. Kopíruj intonáciu pádov a dorazov.',
        tasks: ['Pusti si audio vety', 'Okamžite hovor so zvukom', 'Nezastavuj, aj keď spravíš chybu']
    }
];

const COLOR = {
    amber: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    rose: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
    indigo: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400',
    emerald: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    violet: 'bg-violet-500/10 border-violet-500/30 text-violet-400',
    cyan: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
    orange: 'bg-orange-500/10 border-orange-500/30 text-orange-400',
    teal: 'bg-teal-500/10 border-teal-500/30 text-teal-400',
    pink: 'bg-pink-500/10 border-pink-500/30 text-pink-400'
};

export default function StudyCoach({ exerciseType, phaseInExercise = 0 }) {
    const [isOpen, setIsOpen] = useState(false);
    const [method, setMethod] = useState(null);

    // Consider it a 'word' context if it's flashcards or matching
    const isWord = ['flashcard', 'match'].includes(exerciseType);

    const randomizeMethod = () => {
        const available = isWord ? WORD_METHODS : SENTENCE_METHODS;
        const randomIdx = Math.floor(Math.random() * available.length);
        setMethod(available[randomIdx]);
    };

    useEffect(() => {
        randomizeMethod();
        setIsOpen(false);
    }, [exerciseType, isWord]);

    if (!method) return null;

    const handleOpen = () => {
        randomizeMethod(); // change method every time user opens it
        setIsOpen(true);
    };

    const { icon: Icon, color, name, tagline, description, tasks } = method;
    const c = COLOR[color];

    return (
        <div className="mb-6 relative z-10 w-full max-w-[300px] mx-auto text-left flex flex-col items-center justify-center min-h-[44px]">
            {!isOpen ? (
                <button
                    onClick={handleOpen}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-2xl border border-gray-700/50 bg-gray-900/60 hover:bg-gray-800 hover:border-violet-500/40 text-gray-400 hover:text-white transition-all shadow-sm backdrop-blur-sm group outline-none focus:ring-2 ring-violet-500/30"
                    title="Otvoriť Study Coach (nový tip)"
                >
                    <Lightbulb size={20} className="text-violet-400 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-bold tracking-wide">Študijný Tip</span>
                </button>
            ) : (
                <div className={`w-full rounded-3xl border p-5 transition-all shadow-2xl backdrop-blur-md ${c.split(' ')[0]} border-t border-l border-b border-r ${c.split(' ')[1]} animate-fade-in`}>
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-inner border border-white/5 bg-gray-950/40 ${c.split(' ')[2]}`}>
                                <Icon size={20} />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-[15px] font-extrabold text-white leading-tight">{name}</h4>
                                <p className={`text-[10px] font-bold uppercase tracking-widest ${c.split(' ')[2]} mt-0.5`}>{tagline}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1.5 rounded-lg bg-gray-950/40 hover:bg-gray-900 border border-transparent hover:border-gray-700 text-gray-400 hover:text-white transition-all outline-none"
                            aria-label="Zatvoriť"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    <p className="text-[13px] text-gray-300 font-medium leading-relaxed mb-4">
                        {description}
                    </p>

                    <div className="bg-gray-950/50 rounded-2xl p-4 border border-gray-800/40">
                        <ul className="space-y-2.5">
                            {tasks.map((task, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                                    <CheckCircle2 size={16} className={`flex-shrink-0 mt-[2px] ${c.split(' ')[2]}`} />
                                    <span className="leading-snug font-medium">{task}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
