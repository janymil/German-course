import React, { useState, useEffect } from 'react';
import { useProgress } from '../hooks/useProgress';
import { STORIES } from '../data/stories';
import { ReadingPhase } from '../views/StoryReader';
import { GenderText } from '../utils/genderColors';
import { isAnswerCloseEnough } from '../utils/text';
const mcData = [
    { question: "Wohin fahren sie am Morgen?", options: ["In den Park", "In die Stadt", "Ans Meer", "Nach Hause"], correct: 1 },
    { question: "Was kaufen sie am Marktplatz?", options: ["Eine Brezel", "Einen Kaffee", "Eine Pflanze", "Ein Buch"], correct: 0 },
    { question: "Warum sitzt die Person im Schatten?", options: ["Weil es regnet", "Weil sie auf den Bus wartet", "Weil es sehr heiß ist", "Weil das Café geschlossen ist"], correct: 2 },
    { question: "Woher kommt das Trinkwasser?", options: ["Aus dem Fluss", "Aus dem Brunnen", "Aus dem Restaurant", "Aus der Flasche"], correct: 1 },
    { question: "Womit rührt die Person den Kaffee?", options: ["Mit dem Löffel", "Mit dem Messer", "Mit der Gabel", "Mit dem Finger"], correct: 0 }
];

const fillBlankData = [
    { part1: "Wir gehen", options: ["über den", "über die", "auf das", "in der"], part2: "Brücke. (Akk. fem.)", correct: "über die" },
    { part1: "Taco liegt", options: ["unter der", "unter die", "unter dem", "auf den"], part2: "Bank. (Dat. fem.)", correct: "unter der" },
    { part1: "Wasser kommt", options: ["aus den", "aus das", "aus dem", "aus der"], part2: "Brunnen. (Dat. masc.)", correct: "aus dem" },
    { part1: "Wir gehen", options: ["in der", "in den", "in dem", "auf den"], part2: "Park. (Akk. masc.)", correct: "in den" },
    { part1: "Das Café ist neben", options: ["dem", "der", "den", "das"], part2: "Restaurant. (Dat. neut.)", correct: "dem" },
    { part1: "Die Pflanze steht auf", options: ["dem", "der", "das", "den"], part2: "Tisch. (Dat. masc.)", correct: "dem" },
    { part1: "Ich werfe den Müll in", options: ["der", "dem", "das", "den"], part2: "Mülleimer. (Akk. masc.)", correct: "den" },
    { part1: "Wir fahren mit", options: ["dem", "den", "der", "das"], part2: "Zug. (Dat. masc.)", correct: "dem" }
];

const matchData = [
    { de: "der Brunnen", deHtml: "<span class='text-blue-600 font-bold'>der Brunnen</span>", sk: "fontána" },
    { de: "die Brücke", deHtml: "<span class='text-red-600 font-bold'>die Brücke</span>", sk: "most" },
    { de: "der Löffel", deHtml: "<span class='text-blue-600 font-bold'>der Löffel</span>", sk: "lyžica" },
    { de: "der Schatten", deHtml: "<span class='text-blue-600 font-bold'>der Schatten</span>", sk: "tieň" },
    { de: "das Trinkwasser", deHtml: "<span class='text-green-600 font-bold'>das Trinkwasser</span>", sk: "pitná voda" },
    { de: "geschlossen", sk: "zatvorené" },
    { de: "geöffnet", sk: "otvorené" },
];

const sentenceData = [
    { words: ["gehen", "Wir", "die Brücke.", "über"], correct: "Wir gehen über die Brücke.", hint: "Ideme cez most." },
    { words: ["liegt", "der Bank.", "unter", "Taco"], correct: "Taco liegt unter der Bank.", hint: "Taco leží pod lavičkou." },
    { words: ["kommt", "Wasser.", "Aus", "dem Brunnen"], correct: "Aus dem Brunnen kommt Wasser.", hint: "Z fontány tečie voda." },
    { words: ["leider", "Das Restaurant", "ist", "geschlossen."], correct: "Das Restaurant ist leider geschlossen.", hint: "Reštaurácia je bohužiaľ zatvorená." },
    { words: ["einen", "trinke", "Kaffee.", "Ich"], correct: "Ich trinke einen Kaffee.", hint: "Pijem kávu." }
];

const translationData = [
    { sk: "odpadkový kôš", correct: "der Mülleimer" },
    { sk: "rastlina", correct: "die Pflanze" },
    { sk: "lavička", correct: "die Bank" },
    { sk: "reštaurácia", correct: "das Restaurant" },
    { sk: "unavený", correct: "müde" }
];

// --- COMPONENTS ---

const Vocab = () => (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4 text-white">🧠 Teil 2: Wortschatz</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-800/50">
                <h3 className="font-bold text-blue-400 border-b border-blue-800/50 pb-2 mb-2">Masculine (der)</h3>
                <ul className="space-y-2 text-gray-300">
                    <li><span className="text-blue-400 font-bold">der Hund, -e</span> (pes)</li>
                    <li><span className="text-blue-400 font-bold">der Park, -s</span> (park)</li>
                    <li><span className="text-blue-400 font-bold">der Schatten, -</span> (tieň)</li>
                    <li><span className="text-blue-400 font-bold">der Brunnen, -</span> (fontána)</li>
                    <li><span className="text-blue-400 font-bold">der Löffel, -</span> (lyžica)</li>
                    <li><span className="text-blue-400 font-bold">der Mülleimer, -</span> (odpadkový kôš)</li>
                    <li><span className="text-blue-400 font-bold">der Platz, Plätze</span> (námestie/miesto)</li>
                    <li><span className="text-blue-400 font-bold">der Tisch, -e</span> (stôl)</li>
                </ul>
            </div>

            <div className="bg-red-900/20 p-4 rounded-lg border border-red-800/50">
                <h3 className="font-bold text-red-400 border-b border-red-800/50 pb-2 mb-2">Feminine (die)</h3>
                <ul className="space-y-2 text-gray-300">
                    <li><span className="text-red-400 font-bold">die Stadt, Städte</span> (mesto)</li>
                    <li><span className="text-red-400 font-bold">die Brücke, -n</span> (most)</li>
                    <li><span className="text-red-400 font-bold">die Bank, Bänke</span> (lavička)</li>
                    <li><span className="text-red-400 font-bold">die Sonne, -n</span> (slnko)</li>
                    <li><span className="text-red-400 font-bold">die Pflanze, -n</span> (rastlina)</li>
                    <li><span className="text-red-400 font-bold">die Pause, -n</span> (prestávka)</li>
                    <li><span className="text-red-400 font-bold">die Bushaltestelle, -n</span> (zastávka)</li>
                </ul>
            </div>

            <div className="bg-green-900/20 p-4 rounded-lg border border-green-800/50">
                <h3 className="font-bold text-green-400 border-b border-green-800/50 pb-2 mb-2">Neuter (das) & Anderes</h3>
                <ul className="space-y-2 text-gray-300">
                    <li><span className="text-green-400 font-bold">das Wasser, -</span> (voda)</li>
                    <li><span className="text-green-400 font-bold">das Trinkwasser</span> (pitná voda)</li>
                    <li><span className="text-green-400 font-bold">das Restaurant, -s</span> (reštaurácia)</li>
                    <li><span className="text-green-400 font-bold">das Café, -s</span> (kaviareň)</li>
                    <li><span className="text-green-400 font-bold">das Wetter, -</span> (počasie)</li>
                    <hr className="my-2 border-green-800/50" />
                    <li className="text-gray-400"><strong>geöffnet / offen</strong> (otvorené)</li>
                    <li className="text-gray-400"><strong>geschlossen</strong> (zatvorené)</li>
                    <li className="text-gray-400"><strong>müde</strong> (unavený)</li>
                </ul>
            </div>
        </div>
    </div>
);

const Grammar = () => (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 space-y-6 text-gray-200">
        <h2 className="text-xl font-bold text-white">📐 Teil 3: Grammatik</h2>

        <div className="bg-amber-900/20 p-6 rounded-lg border border-amber-800/50">
            <h3 className="text-lg font-bold mb-3 text-amber-500">Miestne predložky (Lokale Präpositionen)</h3>
            <p className="mb-4">V nemčine používame na vyjadrenie miesta tzv. <strong>Wechselpräpositionen</strong> (predložky, ktoré sa menia podľa toho, či sa pýtame KDE alebo KAM).</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-4 rounded shadow-sm border border-gray-700">
                    <h4 className="font-bold text-base text-indigo-400 mb-2">1. WO? (Kde?) ➡️ DATÍV</h4>
                    <p className="text-sm text-gray-400 mb-3">Opisuje statickú polohu, stav.</p>
                    <ul className="space-y-2 text-sm">
                        <li>Ich sitze <strong>auf</strong> <span className="text-red-400 font-bold">einer Bank</span>. (na)</li>
                        <li>Taco liegt <strong>unter</strong> <span className="text-red-400 font-bold">der Bank</span>. (pod)</li>
                        <li>Das Café ist <strong>neben</strong> <span className="text-green-400 font-bold">dem Restaurant</span>. (vedľa)</li>
                        <li>Die Pflanze steht <strong>auf</strong> <span className="text-blue-400 font-bold">dem Tisch</span>. (na)</li>
                        <li><strong>Aus</strong> <span className="text-blue-400 font-bold">dem Brunnen</span> kommt Wasser. (z) *<i>Aus sa viaže VŽDY s Datívom!</i></li>
                    </ul>
                </div>
                <div className="bg-gray-800 p-4 rounded shadow-sm border border-gray-700">
                    <h4 className="font-bold text-base text-rose-400 mb-2">2. WOHIN? (Kam?) ➡️ AKUZATÍV</h4>
                    <p className="text-sm text-gray-400 mb-3">Opisuje pohyb, smerovanie niekam.</p>
                    <ul className="space-y-2 text-sm">
                        <li>Wir gehen <strong>über</strong> <span className="text-red-400 font-bold">die Brücke</span>. (cez)</li>
                        <li>Wir gehen <strong>in</strong> <span className="text-blue-400 font-bold">den Park</span>. (do)</li>
                        <li>Ich werfe den Müll <strong>in</strong> <span className="text-blue-400 font-bold">den Mülleimer</span>. (do)</li>
                    </ul>
                </div>
            </div>
        </div>

        <div>
            <h3 className="text-lg font-bold mb-3 text-white">Skloňovanie určitých členov (Farby!)</h3>
            <div className="overflow-x-auto rounded-xl border border-gray-700">
                <table className="w-full text-left border-collapse text-sm">
                    <thead>
                        <tr className="bg-gray-800 border-b border-gray-700">
                            <th className="p-3">Pád</th>
                            <th className="p-3">Mužský (der)</th>
                            <th className="p-3">Ženský (die)</th>
                            <th className="p-3">Stredný (das)</th>
                            <th className="p-3">Množné (die)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-700">
                            <td className="p-3 font-bold text-gray-300">1. Nominatív (Kto/Čo)</td>
                            <td className="p-3"><span className="text-blue-400 font-bold">der</span></td>
                            <td className="p-3"><span className="text-red-400 font-bold">die</span></td>
                            <td className="p-3"><span className="text-green-400 font-bold">das</span></td>
                            <td className="p-3"><span className="text-gray-300 font-bold">die</span></td>
                        </tr>
                        <tr className="bg-gray-800/50 border-b border-gray-700">
                            <td className="p-3 font-bold text-gray-300">4. Akuzatív (Koho/Čo, Kam)</td>
                            <td className="p-3"><span className="text-blue-400 font-bold">den</span></td>
                            <td className="p-3"><span className="text-red-400 font-bold">die</span></td>
                            <td className="p-3"><span className="text-green-400 font-bold">das</span></td>
                            <td className="p-3"><span className="text-gray-300 font-bold">die</span></td>
                        </tr>
                        <tr>
                            <td className="p-3 font-bold text-gray-300">3. Datív (Komu/Čomu, Kde)</td>
                            <td className="p-3"><span className="text-blue-400 font-bold">dem</span></td>
                            <td className="p-3"><span className="text-red-400 font-bold">der</span></td>
                            <td className="p-3"><span className="text-green-400 font-bold">dem</span></td>
                            <td className="p-3"><span className="text-gray-300 font-bold">den + n</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

// --- EXERCISE COMPONENTS ---

export const ExMultipleChoice = ({ data, onScore }) => {
    const [answers, setAnswers] = useState({});
    const [checked, setChecked] = useState(false);

    const handleCheck = () => {
        setChecked(true);
        let score = 0;
        data.forEach((q, i) => { if (answers[i] === q.correct) score++; });
        onScore(score, data.length);
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold mb-3 text-white">Übung 1: Leseverstehen (Čítanie s porozumením)</h3>
            {data.map((q, i) => (
                <div key={i} className="bg-gray-800 p-4 rounded border border-gray-700 shadow-sm text-gray-200">
                    <p className="font-bold mb-3 text-sm">{i + 1}. <GenderText text={q.question} /></p>
                    <div className="space-y-2">
                        {q.options.map((opt, j) => (
                            <label key={j} className="flex items-center space-x-3 cursor-pointer p-2 rounded hover:bg-gray-700/50 text-sm">
                                <input type="radio" name={`q${i}`} value={j}
                                    onChange={() => setAnswers({ ...answers, [i]: j })}
                                    disabled={checked}
                                    className="w-4 h-4 text-indigo-500 bg-gray-900 border-gray-600 focus:ring-indigo-500 focus:ring-offset-gray-800"
                                />
                                <span className={`${checked && j === q.correct ? 'text-emerald-400 font-bold' : ''} ${checked && answers[i] === j && j !== q.correct ? 'text-rose-400 line-through' : ''}`}>
                                    <GenderText text={opt} />
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            ))}
            {!checked && <button onClick={handleCheck} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-bold transition-all">Kontrolovať</button>}
        </div>
    );
};

export const ExFillBlanks = ({ data, onScore }) => {
    const [answers, setAnswers] = useState({});
    const [checked, setChecked] = useState(false);

    const handleCheck = () => {
        setChecked(true);
        let score = 0;
        data.forEach((q, i) => { if (answers[i] === q.correct) score++; });
        onScore(score, data.length);
    };

    return (
        <div className="space-y-4 mt-8 border-t border-gray-700 pt-8">
            <h3 className="text-lg font-bold mb-3 text-white">Übung 2: Präpositionen & Artikel (Predložky a členy)</h3>
            <p className="mb-4 text-sm text-gray-400">Vyber správnu predložku a člen (Dativ alebo Akkusativ).</p>
            <div className="space-y-3">
                {data.map((q, i) => (
                    <div key={i} className="flex flex-wrap items-center gap-2 bg-gray-800 p-3 rounded border border-gray-700 text-sm text-gray-200">
                        <span>{i + 1}. <GenderText text={q.part1} /></span>
                        <select
                            onChange={(e) => setAnswers({ ...answers, [i]: e.target.value })}
                            disabled={checked}
                            className={`bg-gray-900 border border-gray-600 text-white rounded px-2 py-1 outline-none focus:border-indigo-500 ${checked && answers[i] === q.correct ? 'bg-emerald-900/40 border-emerald-500' : ''} ${checked && answers[i] !== q.correct ? 'bg-rose-900/40 border-rose-500' : ''}`}
                        >
                            <option value="">---</option>
                            {q.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                        <span><GenderText text={q.part2} /></span>
                        {checked && answers[i] !== q.correct && <span className="text-emerald-400 text-xs ml-2">✓ <GenderText text={q.correct} /></span>}
                    </div>
                ))}
            </div>
            {!checked && <button onClick={handleCheck} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-bold transition-all">Kontrolovať</button>}
        </div>
    );
};

export const ExMatching = ({ data, onScore }) => {
    const [selectedDe, setSelectedDe] = useState(null);
    const [matches, setMatches] = useState({});
    const [completed, setCompleted] = useState(false);
    const [rightCol, setRightCol] = useState([]);

    useEffect(() => {
        setRightCol([...data].sort(() => Math.random() - 0.5));
    }, []);

    const handleLeftClick = (de) => {
        if (!matches[de]) setSelectedDe(de);
    };

    const handleRightClick = (sk) => {
        if (!selectedDe) return;
        const correctPair = data.find(d => d.de === selectedDe);
        if (correctPair.sk === sk) {
            const newMatches = { ...matches, [selectedDe]: sk };
            setMatches(newMatches);
            setSelectedDe(null);

            if (Object.keys(newMatches).length === data.length) {
                setCompleted(true);
                onScore(data.length, data.length);
            }
        } else {
            setSelectedDe(null);
        }
    };

    return (
        <div className="space-y-4 mt-8 border-t border-gray-700 pt-8">
            <h3 className="text-lg font-bold mb-3 text-white">Übung 3: Wortschatz verbinden (Spájanie slovíčok)</h3>
            <p className="mb-4 text-sm text-gray-400">Klikni na nemecké slovo a potom na jeho slovenský preklad. {completed && <span className="text-emerald-400 font-bold ml-2">Super! Všetko správne! 🎉</span>}</p>

            <div className="flex flex-col md:flex-row gap-6 text-sm">
                <div className="flex-1 space-y-2">
                    {data.map((item, i) => (
                        <button
                            key={i}
                            onClick={() => handleLeftClick(item.de)}
                            disabled={!!matches[item.de]}
                            className={`w-full text-left px-4 py-3 rounded border transition-all 
                                ${matches[item.de] ? 'bg-emerald-900/20 border-emerald-500/50 opacity-40 cursor-not-allowed' :
                                    selectedDe === item.de ? 'bg-indigo-900/40 border-indigo-500 shadow-md scale-105' :
                                        'bg-gray-800 border-gray-700 hover:border-indigo-400/50 text-gray-200'}`}
                        >
                            {item.deHtml ? <span dangerouslySetInnerHTML={{ __html: item.deHtml }}></span> : <GenderText text={item.de} />}
                        </button>
                    ))}
                </div>
                <div className="flex-1 space-y-2">
                    {rightCol.map((item, i) => {
                        const isMatched = Object.values(matches).includes(item.sk);
                        return (
                            <button
                                key={i}
                                onClick={() => handleRightClick(item.sk)}
                                disabled={isMatched}
                                className={`w-full text-left px-4 py-3 rounded border transition-all
                                    ${isMatched ? 'bg-emerald-900/20 border-emerald-500/50 opacity-40 cursor-not-allowed' :
                                        'bg-gray-800 border-gray-700 hover:border-indigo-400/50 text-gray-200'}`}
                            >
                                {item.sk}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export const ExSentenceBuilder = ({ data, onScore }) => {
    const [sentences, setSentences] = useState(data.map(d => ({
        words: [...d.words].sort(() => Math.random() - 0.5),
        built: [],
        isCorrect: null
    })));

    const handleWordClick = (sentenceIndex, word, fromBuilt) => {
        const s = [...sentences];
        if (fromBuilt) {
            s[sentenceIndex].built = s[sentenceIndex].built.filter(w => w !== word);
            s[sentenceIndex].words.push(word);
        } else {
            s[sentenceIndex].words = s[sentenceIndex].words.filter(w => w !== word);
            s[sentenceIndex].built.push(word);
        }
        s[sentenceIndex].isCorrect = null;
        setSentences(s);
    };

    const handleCheck = () => {
        let score = 0;
        const checkedSentences = sentences.map((s, i) => {
            const builtStr = s.built.join(" ");
            const isCorrect = builtStr === data[i].correct;
            if (isCorrect) score++;
            return { ...s, isCorrect };
        });
        setSentences(checkedSentences);
        onScore(score, data.length);
    };

    return (
        <div className="space-y-4 mt-8 border-t border-gray-700 pt-8">
            <h3 className="text-lg font-bold mb-3 text-white">Übung 4: Sätze bauen (Skladanie viet)</h3>
            <p className="mb-4 text-sm text-gray-400">Klikaj na slová v správnom poradí, aby si vytvoril zmysluplnú vetu.</p>

            <div className="space-y-4">
                {sentences.map((s, i) => (
                    <div key={i} className={`p-4 rounded border ${s.isCorrect === true ? 'border-emerald-500/50 bg-emerald-900/10' : s.isCorrect === false ? 'border-rose-500/50 bg-rose-900/10' : 'border-gray-700 bg-gray-800'}`}>
                        <p className="text-xs text-gray-400 mb-3">{data[i].hint}</p>

                        <div className="min-h-[40px] bg-gray-900/50 rounded border border-gray-700 p-2 mb-3 flex flex-wrap gap-2">
                            {s.built.map((w, j) => (
                                <button key={j} onClick={() => handleWordClick(i, w, true)} className="bg-indigo-600 text-white px-3 py-1 text-sm rounded cursor-pointer hover:bg-indigo-500">
                                    <GenderText text={w} />
                                </button>
                            ))}
                            {s.built.length === 0 && <span className="text-gray-600 italic text-sm mt-1">Nemecká veta tu...</span>}
                        </div>

                        <div className="flex flex-wrap gap-2 mt-2">
                            {s.words.map((w, j) => (
                                <button key={j} onClick={() => handleWordClick(i, w, false)} className="bg-gray-700 text-gray-200 border border-gray-600 px-3 py-1 text-sm rounded hover:bg-gray-600">
                                    <GenderText text={w} />
                                </button>
                            ))}
                        </div>
                        {s.isCorrect === false && <p className="text-rose-400 text-xs mt-3 font-bold">Správne: <GenderText text={data[i].correct} /></p>}
                    </div>
                ))}
            </div>
            <button onClick={handleCheck} className="px-4 py-2 mt-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-bold transition-all">Kontrolovať vety</button>
        </div>
    );
};

export const ExTranslation = ({ data, onScore }) => {
    const [answers, setAnswers] = useState({});
    const [checked, setChecked] = useState(false);

    const handleCheck = () => {
        setChecked(true);
        let score = 0;
        data.forEach((q, i) => {
            const isCorrect = isAnswerCloseEnough(answers[i] || '', q.correct);
            if (isCorrect) score++;
        });
        onScore(score, data.length);
    };

    return (
        <div className="space-y-4 mt-8 border-t border-gray-700 pt-8 pb-10">
            <h3 className="text-lg font-bold mb-3 text-white">Übung 5: Schreiben (Písanie a preklad)</h3>
            <p className="mb-4 text-sm text-gray-400">Prelož do nemčiny. Nezabudni na správny člen (der, die, das)!</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.map((q, i) => (
                    <div key={i} className="bg-gray-800 p-3 rounded border border-gray-700 text-sm">
                        <label className="block mb-2 font-bold text-gray-200">{i + 1}. {q.sk}</label>
                        <input
                            type="text"
                            className={`w-full bg-gray-900 border text-white rounded outline-none px-3 py-2 ${checked && isAnswerCloseEnough(answers[i] || '', q.correct) ? 'border-emerald-500 bg-emerald-900/20' : checked ? 'border-rose-500 bg-rose-900/20' : 'border-gray-600 focus:border-indigo-500'}`}
                            onChange={(e) => setAnswers({ ...answers, [i]: e.target.value })}
                            disabled={checked}
                            placeholder="Napr. der Hund"
                        />
                        {checked && !isAnswerCloseEnough(answers[i] || '', q.correct) &&
                            <p className="text-emerald-400 text-xs mt-1 font-bold">✓ <GenderText text={q.correct} /></p>}
                    </div>
                ))}
            </div>
            {!checked && <button onClick={handleCheck} className="px-4 py-2 mt-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-bold transition-all">Kontrolovať preklad</button>}
        </div>
    );
};

import { X } from 'lucide-react';

export default function WalkAndTalkLesson({ isOpen, onClose }) {
    const [activeTab, setActiveTab] = useState('story');
    const [scores, setScores] = useState({});
    const { progress, saveGeneratedGrammarCard, markVocab } = useProgress();
    const storyData = STORIES.find(s => s.id === 'story_07');

    if (!isOpen) return null;

    const handleScore = (exName, score, max) => {
        setScores(prev => ({ ...prev, [exName]: { score, max } }));
    };

    const totalScore = Object.values(scores).reduce((acc, curr) => acc + curr.score, 0);
    const totalMax = Object.values(scores).reduce((acc, curr) => acc + curr.max, 0);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <div className="bg-gray-900 border border-gray-700/50 rounded-3xl w-full max-w-5xl shadow-2xl flex flex-col h-[90vh]">

                {/* Header */}
                <div className="bg-emerald-950/40 p-4 border-b border-emerald-900/50 flex justify-between items-center flex-shrink-0">
                    <div>
                        <h3 className="text-white font-black text-xl flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            Interaktívna lekcia: Walk & Talk Udine
                        </h3>
                        <p className="text-emerald-300 text-sm font-medium mt-1">
                            Uč sa nemecky prirodzene. Všimni si farebne odlíšené členy!
                        </p>
                    </div>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="w-full h-full flex flex-col p-4 md:p-6 overflow-hidden">
                    {/* Navigation Tabs */}
                    <div className="flex gap-2 mb-4 flex-wrap flex-shrink-0">
                        <button
                            onClick={() => setActiveTab('story')}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'story' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-800 text-gray-400 hover:text-white border border-gray-700 hover:border-indigo-500/50'}`}>
                            📖 Príbeh
                        </button>
                        <button
                            onClick={() => setActiveTab('vocab')}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'vocab' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-800 text-gray-400 hover:text-white border border-gray-700 hover:border-indigo-500/50'}`}>
                            🧠 Slovíčka
                        </button>
                        <button
                            onClick={() => setActiveTab('grammar')}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'grammar' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-800 text-gray-400 hover:text-white border border-gray-700 hover:border-indigo-500/50'}`}>
                            📐 Gramatika
                        </button>
                        <button
                            onClick={() => setActiveTab('exercises')}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'exercises' ? 'bg-amber-600 text-white shadow-lg' : 'bg-gray-800 text-gray-400 hover:text-white border border-gray-700 hover:border-amber-500/50'}`}>
                            ✍️ Übungen {totalMax > 0 && `(${totalScore}/${totalMax})`}
                        </button>
                    </div>

                    {/* Main Content Area */}
                    <div className="overflow-y-auto flex-1 custom-scrollbar pr-2 pb-10">
                        {activeTab === 'story' && storyData && (
                            <ReadingPhase
                                story={storyData}
                                generatedWords={progress.generatedWords || {}}
                                onSaveGenerated={saveGeneratedGrammarCard}
                                onMarkVocab={(word, data) => markVocab(word, false)}
                                onStartQuiz={() => setActiveTab('exercises')}
                            />
                        )}
                        {activeTab === 'vocab' && <Vocab />}
                        {activeTab === 'grammar' && <Grammar />}
                        {activeTab === 'exercises' && (
                            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                                <h2 className="text-xl font-bold mb-2 text-white">✍️ Teil 4: Interaktive Übungen</h2>
                                <p className="mb-6 text-sm text-gray-400">Löse die folgenden 28 Aufgaben, um dein Wissen zu testen!</p>

                                <ExMultipleChoice data={mcData} onScore={(s, m) => handleScore('mc', s, m)} />
                                <ExFillBlanks data={fillBlankData} onScore={(s, m) => handleScore('blanks', s, m)} />
                                <ExMatching data={matchData} onScore={(s, m) => handleScore('match', s, m)} />
                                <ExSentenceBuilder data={sentenceData} onScore={(s, m) => handleScore('sentences', s, m)} />
                                <ExTranslation data={translationData} onScore={(s, m) => handleScore('trans', s, m)} />

                                {totalMax === 30 && (
                                    <div className="mt-8 p-6 bg-emerald-600 text-white rounded-xl text-center shadow-lg">
                                        <h3 className="text-xl font-bold">Lektion abgeschlossen! 🎉</h3>
                                        <p className="text-lg mt-1">Dein Ergebnis: {totalScore} von {totalMax} Punkten.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
