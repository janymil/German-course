import React, { useState, useEffect } from 'react';
import { useProgress } from '../hooks/useProgress';
import { ReadingPhase } from '../views/StoryReader';
import { STORIES } from '../data/stories';
import {
    ExMultipleChoice,
    ExFillBlanks,
    ExMatching,
    ExSentenceBuilder,
    ExTranslation
} from './WalkAndTalkLesson';
import { X } from 'lucide-react';

export default function Lesson_qGBJYuCoamg({ isOpen, onClose }) {
    const [activeTab, setActiveTab] = useState('story');
    const [scores, setScores] = useState({});

    const { progress, saveGeneratedGrammarCard, markVocab } = useProgress();

    useEffect(() => {
        if (!isOpen) {
            setActiveTab('story');
            setScores({});
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const storyData = STORIES.find(s => s.id === 'story_08');

    const handleScore = (exName, score, max) => {
        setScores(prev => ({ ...prev, [exName]: { score, max } }));
    };

    const totalScore = Object.values(scores).reduce((acc, curr) => acc + curr.score, 0);
    const totalMax = Object.values(scores).reduce((acc, curr) => acc + curr.max, 0);

    const mcData = [
        { question: "Was machen wir mit den reifen Bananen?", options: ["Wir werfen sie in den Müll.", "Wir backen ein Bananenbrot.", "Wir machen einen Bananensaft.", "Wir geben sie dem Hund."], correct: 1, explanation: "Denn mit reifen Bananen kann man sehr leckeres Bananenbrot backen." },
        { question: "Womit zerdrücken wir die Bananen?", options: ["Mit dem Messer", "Mit dem Schneebesen", "Mit der Gabel", "Mit den Händen"], correct: 2, explanation: "Ich zerdrücke die Bananen mit der Gabel." },
        { question: "Was hat die Person vergessen einzuschalten?", options: ["Die Waage", "Den Mixer", "Das Licht", "Den Backofen"], correct: 3, explanation: "Ich habe vergessen, den Backofen einzuschalten!" },
        { question: "Womit testen wir, ob der Kuchen fertig ist?", options: ["Mit der Messerspitze", "Mit der Gabel", "Mit dem Finger", "Mit dem Thermometer"], correct: 0, explanation: "Nach 35 Minuten teste ich mit der Messerspitze, ob der Kuchen fertig ist." },
        { question: "Wie lange muss das Bananenbrot backen?", options: ["10 Minuten", "Eine Stunde", "35 Minuten", "20 Minuten"], correct: 2, explanation: "Nach 35 Minuten teste ich mit der Messerspitze..." }
    ];

    const fillBlankData = [
        { part1: "Ich zerdrücke die Bananen", options: ["mit dem", "mit der", "in den", "in die"], part2: "Gabel. (Dat. fem.)", correct: "mit der" },
        { part1: "Ich verrühre alles gut", options: ["mit den", "mit das", "mit dem", "mit der"], part2: "Schneebesen. (Dat. masc.)", correct: "mit dem" },
        { part1: "Wir schneiden die Nüsse", options: ["mit der", "mit den", "mit das", "mit dem"], part2: "Messer. (Dat. neut.)", correct: "mit dem" },
        { part1: "Ich werfe die Bananenschale", options: ["in der", "in den", "in dem", "auf den"], part2: "Müll. (Akk. masc.)", correct: "in den" },
        { part1: "Das Mehl kommt", options: ["in die", "in der", "in den", "auf das"], part2: "Schüssel. (Akk. fem.)", correct: "in die" },
        { part1: "Der Teig kommt", options: ["in der", "in die", "in dem", "in den"], part2: "Kastenform. (Akk. fem.)", correct: "in die" },
        { part1: "Wir stellen den Kuchen", options: ["in der", "in dem", "in das", "in den"], part2: "Backofen. (Akk. masc.)", correct: "in den" },
        { part1: "Ich wiege den Zucker", options: ["mit dem", "mit den", "mit der", "mit das"], part2: "Waage ab. (Dat. fem.)", correct: "mit der" }
    ];

    const matchData = [
        { de: "das Messer", deHtml: "<span class='text-emerald-500 font-bold'>das Messer</span>", sk: "nôž" },
        { de: "die Gabel", deHtml: "<span class='text-rose-500 font-bold'>die Gabel</span>", sk: "vidlička" },
        { de: "der Backofen", deHtml: "<span class='text-blue-500 font-bold'>der Backofen</span>", sk: "rúra na pečenie" },
        { de: "der Teig", deHtml: "<span class='text-blue-500 font-bold'>der Teig</span>", sk: "cesto" },
        { de: "der Schneebesen", deHtml: "<span class='text-blue-500 font-bold'>der Schneebesen</span>", sk: "metlička na šľahanie" },
        { de: "das Mehl", deHtml: "<span class='text-emerald-500 font-bold'>das Mehl</span>", sk: "múka" },
        { de: "backen", sk: "piecť" },
    ];

    const sentenceData = [
        { words: ["zerdrücke", "Ich", "die Bananen", "mit der Gabel."], correct: "Ich zerdrücke die Bananen mit der Gabel.", hint: "Roztláčam banány vidličkou." },
        { words: ["werfe", "die Schale", "in den Müll.", "Ich"], correct: "Ich werfe die Schale in den Müll.", hint: "Hádžem šupku do koša." },
        { words: ["ein Bananenbrot.", "backen", "heute", "Wir"], correct: "Wir backen heute ein Bananenbrot.", hint: "Dnes pečieme banánový chlieb." },
        { words: ["kommt", "in den", "Der Kuchen", "Ofen."], correct: "Der Kuchen kommt in den Ofen.", hint: "Koláč ide do rúry." },
        { words: ["eine Scheibe", "schneide", "Ich", "ab."], correct: "Ich schneide eine Scheibe ab.", hint: "Odkrojím plátok." }
    ];

    const translationData = [
        { sk: "cesto", correct: "der Teig" },
        { sk: "miska", correct: "die Schüssel" },
        { sk: "cukor", correct: "der Zucker" },
        { sk: "vidlička", correct: "die Gabel" },
        { sk: "piecť", correct: "backen" }
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm">
            <div className="bg-gray-50 rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden relative border border-gray-200">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 shadow-sm transition-all"
                >
                    <X size={24} />
                </button>

                <div className="overflow-y-auto w-full custom-scrollbar">
                    <div className="p-6 md:p-10">
                        <header className="mb-8 text-center">
                            <h1 className="text-4xl font-extrabold text-gray-800 mb-2">🇩🇪 Lektion: Bananenbrot backen</h1>
                            <p className="text-gray-600 text-lg">Ein interaktiver Kochkurs in der Küche (A1-A2)</p>
                        </header>

                        {/* Navigation Tabs */}
                        <div className="flex flex-wrap gap-2 mb-6 bg-white p-2 rounded-xl shadow-sm border border-gray-200">
                            <button onClick={() => setActiveTab('story')} className={`flex-1 flex justify-center py-2 px-4 rounded-lg font-bold transition-all ${activeTab === 'story' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>📖 Geschichte</button>
                            <button onClick={() => setActiveTab('vocab')} className={`flex-1 flex justify-center py-2 px-4 rounded-lg font-bold transition-all ${activeTab === 'vocab' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>🧠 Wortschatz</button>
                            <button onClick={() => setActiveTab('grammar')} className={`flex-1 flex justify-center py-2 px-4 rounded-lg font-bold transition-all ${activeTab === 'grammar' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>📐 Grammatik</button>
                            <button onClick={() => setActiveTab('exercises')} className={`flex-1 flex justify-center py-2 px-4 rounded-lg font-bold transition-all ${activeTab === 'exercises' ? 'bg-amber-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>✍️ Übungen ({totalMax > 0 ? `${totalScore}/${totalMax}` : '30'})</button>
                        </div>

                        {/* Main Content Area */}
                        <main>
                            {activeTab === 'story' && storyData && (
                                <ReadingPhase
                                    story={storyData}
                                    generatedWords={progress?.generatedWords || {}}
                                    onSaveGenerated={saveGeneratedGrammarCard}
                                    onMarkVocab={(word) => markVocab(word, false)}
                                    onStartQuiz={() => setActiveTab('exercises')}
                                />
                            )}
                            {activeTab === 'vocab' && (
                                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                                    <h2 className="text-2xl font-bold mb-6">🧠 Teil 2: Wortschatz (In der Küche)</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                                        <div className="bg-blue-50 p-5 rounded-xl border border-blue-200">
                                            <h3 className="font-bold text-blue-800 border-b border-blue-200 pb-2 mb-3">Masculine (der)</h3>
                                            <ul className="space-y-3">
                                                <li><strong className="text-blue-600">der Backofen, -</strong> (rúra na pečenie)</li>
                                                <li><strong className="text-blue-600">der Teig, -e</strong> (cesto)</li>
                                                <li><strong className="text-blue-600">der Zucker, -</strong> (cukor)</li>
                                                <li><strong className="text-blue-600">der Schneebesen, -</strong> (metlička na šľahanie)</li>
                                                <li><strong className="text-blue-600">der Messbecher, -</strong> (odmerka)</li>
                                                <li><strong className="text-blue-600">der Müll / der Mülleimer</strong> (odpad / kôš)</li>
                                                <li><strong className="text-blue-600">der Kuchen, -</strong> (koláč)</li>
                                            </ul>
                                        </div>

                                        <div className="bg-rose-50 p-5 rounded-xl border border-rose-200">
                                            <h3 className="font-bold text-rose-800 border-b border-rose-200 pb-2 mb-3">Feminine (die)</h3>
                                            <ul className="space-y-3">
                                                <li><strong className="text-rose-600">die Banane, -n</strong> (banán)</li>
                                                <li><strong className="text-rose-600">die Gabel, -n</strong> (vidlička)</li>
                                                <li><strong className="text-rose-600">die Schüssel, -n</strong> (miska)</li>
                                                <li><strong className="text-rose-600">die Waage, -n</strong> (váha)</li>
                                                <li><strong className="text-rose-600">die Kastenform, -en</strong> (forma na pečenie)</li>
                                                <li><strong className="text-rose-600">die Walnuss, -nüsse</strong> (vlašský orech)</li>
                                                <li><strong className="text-rose-600">die Scheibe, -n</strong> (plátok, krajec)</li>
                                            </ul>
                                        </div>

                                        <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-200">
                                            <h3 className="font-bold text-emerald-800 border-b border-emerald-200 pb-2 mb-3">Neuter (das) & Verben</h3>
                                            <ul className="space-y-3">
                                                <li><strong className="text-emerald-600">das Bananenbrot</strong> (banánový chlieb)</li>
                                                <li><strong className="text-emerald-600">das Mehl</strong> (múka)</li>
                                                <li><strong className="text-emerald-600">das Ei, -er</strong> (vajce)</li>
                                                <li><strong className="text-emerald-600">das Öl</strong> (olej)</li>
                                                <li><strong className="text-emerald-600">das Messer, -</strong> (nôž)</li>
                                                <li><strong className="text-emerald-600">das Sieb, -e</strong> (sitko)</li>
                                                <hr className="my-3 border-emerald-200" />
                                                <li className="text-gray-700"><strong>zerdrücken</strong> (roztlačiť)</li>
                                                <li className="text-gray-700"><strong>verrühren</strong> (rozmiešať)</li>
                                                <li className="text-gray-700"><strong>backen</strong> (piecť)</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {activeTab === 'grammar' && (
                                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 space-y-8">
                                    <h2 className="text-2xl font-bold">📐 Teil 3: Grammatik</h2>

                                    <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
                                        <h3 className="text-xl font-bold mb-4 text-amber-900">1. Nástroje: Womit? (S čím? Pomocou čoho?) ➡️ DATÍV</h3>
                                        <p className="mb-4 text-gray-800">Keď v nemčine hovoríme, aký nástroj používame na nejakú činnosť, použijeme predložku <strong>mit</strong> (s). Predložka "mit" sa viaže <strong>vždy s Datívom</strong>.</p>

                                        <ul className="space-y-3 bg-white p-5 rounded-lg border border-amber-100 shadow-sm mb-6">
                                            <li>Ich zerdrücke die Bananen <strong>mit</strong> <strong className="text-rose-600">der Gabel</strong>. (pomocou vidličky - die Gabel -&gt; der Gabel)</li>
                                            <li>Ich verrühre alles <strong>mit</strong> <strong className="text-blue-600">dem Schneebesen</strong>. (metličkou - der Schneebesen -&gt; dem)</li>
                                            <li>Ich schneide die Nüsse <strong>mit</strong> <strong className="text-emerald-600">dem Messer</strong>. (nožom - das Messer -&gt; dem)</li>
                                            <li>Ich wiege den Zucker <strong>mit</strong> <strong className="text-rose-600">der Waage</strong> ab. (na váhe/váhou - die Waage -&gt; der)</li>
                                        </ul>

                                        <h3 className="text-xl font-bold mb-4 text-amber-900 mt-8">2. Smer: Wohin? (Kam?) ➡️ AKUZATÍV</h3>
                                        <p className="mb-4 text-gray-800">Pri vkladaní ingrediencií niekam používame predložku <strong>in</strong>. Keďže ide o pohyb (smerovanie dnu), použijeme <strong>Akuzatív</strong>.</p>

                                        <ul className="space-y-3 bg-white p-5 rounded-lg border border-amber-100 shadow-sm">
                                            <li>Ich werfe die Schale <strong>in</strong> <strong className="text-blue-600">den Müll</strong>. (do koša - der Müll -&gt; den)</li>
                                            <li>Ich gebe das Mehl <strong>in</strong> <strong className="text-rose-600">die Schüssel</strong>. (do misky - die Schüssel -&gt; die)</li>
                                            <li>Der Teig kommt <strong>in</strong> <strong className="text-rose-600">die Kastenform</strong>. (do formy - die Kastenform -&gt; die)</li>
                                            <li>Der Kuchen kommt <strong>in</strong> <strong className="text-blue-600">den Backofen</strong>. (do rúry - der Ofen -&gt; den)</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold mb-4 text-gray-800">Skloňovanie určitých členov (Pripomenutie z predchádzajúcej lekcie)</h3>
                                        <div className="overflow-x-auto border rounded-xl shadow-sm">
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="bg-gray-100">
                                                        <th className="p-4 border-b">Pád</th>
                                                        <th className="p-4 border-b">Mužský (der)</th>
                                                        <th className="p-4 border-b">Ženský (die)</th>
                                                        <th className="p-4 border-b">Stredný (das)</th>
                                                        <th className="p-4 border-b">Množné (die)</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="p-4 border-b font-bold bg-white">1. Nominatív (Kto/Čo)</td>
                                                        <td className="p-4 border-b bg-white text-blue-600 font-bold">der</td>
                                                        <td className="p-4 border-b bg-white text-rose-600 font-bold">die</td>
                                                        <td className="p-4 border-b bg-white text-emerald-600 font-bold">das</td>
                                                        <td className="p-4 border-b bg-white text-purple-600 font-bold">die</td>
                                                    </tr>
                                                    <tr className="bg-gray-50">
                                                        <td className="p-4 border-b font-bold">4. Akuzatív (Kam do? in...)</td>
                                                        <td className="p-4 border-b text-blue-600 font-bold">den</td>
                                                        <td className="p-4 border-b text-rose-600 font-bold">die</td>
                                                        <td className="p-4 border-b text-emerald-600 font-bold">das</td>
                                                        <td className="p-4 border-b text-purple-600 font-bold">die</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="p-4 font-bold bg-white">3. Datív (S čím? mit...)</td>
                                                        <td className="p-4 bg-white text-blue-600 font-bold">dem</td>
                                                        <td className="p-4 bg-white text-rose-600 font-bold">der</td>
                                                        <td className="p-4 bg-white text-emerald-600 font-bold">dem</td>
                                                        <td className="p-4 bg-white text-purple-600 font-bold">den + n</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {activeTab === 'exercises' && (
                                <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-gray-100">
                                    <h2 className="text-2xl font-bold mb-3">✍️ Teil 4: Interaktive Übungen</h2>
                                    <p className="mb-8 text-gray-500 text-lg">Löse die folgenden 30 Aufgaben, um dein Wissen zu testen!</p>

                                    <div className="space-y-12">
                                        <ExMultipleChoice data={mcData} onScore={(s, m) => handleScore('mc', s, m)} />
                                        <div className="h-px w-full bg-gray-200"></div>
                                        <ExFillBlanks data={fillBlankData} onScore={(s, m) => handleScore('blanks', s, m)} />
                                        <div className="h-px w-full bg-gray-200"></div>
                                        <ExMatching data={matchData} onScore={(s, m) => handleScore('match', s, m)} />
                                        <div className="h-px w-full bg-gray-200"></div>
                                        <ExSentenceBuilder data={sentenceData} onScore={(s, m) => handleScore('sentences', s, m)} />
                                        <div className="h-px w-full bg-gray-200"></div>
                                        <ExTranslation data={translationData} onScore={(s, m) => handleScore('trans', s, m)} />
                                    </div>

                                    {totalMax === 30 && (
                                        <div className="mt-12 p-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl text-center shadow-xl transform transition-all hover:scale-[1.02]">
                                            <h3 className="text-3xl font-black mb-3 text-white">Lektion abgeschlossen! 🎉</h3>
                                            <p className="text-xl mt-2 text-blue-100">Dein Ergebnis: <span className="font-bold text-white text-2xl">{totalScore}</span> von {totalMax} Punkten.</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
}
