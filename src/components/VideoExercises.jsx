import React, { useState } from 'react';
import { CheckCircle2, XCircle, ChevronDown, ChevronRight, RotateCcw } from 'lucide-react';
import { GenderText } from '../utils/genderColors';
import { isAnswerCloseEnough } from '../utils/text';

// ── WordOrder mini-exercise ─────────────────────────────────────────────
function WordOrderEx({ ex, exKey, answers, results, onCheck }) {
    const [built, setBuilt] = useState([]);
    const [available, setAvailable] = useState(() => ex.words.map((w, i) => ({ id: i, text: w })));
    const checked = results[exKey] !== undefined;
    const correct = results[exKey] === true;

    const addWord = (token) => {
        if (checked) return;
        setBuilt(prev => [...prev, token]);
        setAvailable(prev => prev.filter(t => t.id !== token.id));
    };
    const removeWord = (token) => {
        if (checked) return;
        setAvailable(prev => [...prev, token]);
        setBuilt(prev => prev.filter(t => t.id !== token.id));
    };
    const reset = () => {
        setBuilt([]);
        setAvailable(ex.words.map((w, i) => ({ id: i, text: w })));
        onCheck(exKey, undefined);
    };

    const check = () => {
        const isCorrect = built.map(t => t.text).join(' ').toLowerCase().trim() ===
            ex.correct.toLowerCase().trim();
        onCheck(exKey, isCorrect);
    };

    return (
        <div className="space-y-3">
            {/* Built sentence */}
            <div className="min-h-[44px] bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 flex flex-wrap gap-2 items-center">
                {built.length === 0
                    ? <span className="text-gray-600 text-sm italic">Klikni na slová nižšie…</span>
                    : built.map(token => (
                        <button key={token.id} onClick={() => removeWord(token)}
                            className="bg-indigo-700 hover:bg-indigo-600 text-white text-sm font-medium px-2.5 py-1 rounded-lg transition-all">
                            <GenderText text={token.text} />
                        </button>
                    ))
                }
            </div>
            {/* Available words */}
            <div className="flex flex-wrap gap-2">
                {available.map(token => (
                    <button key={token.id} onClick={() => addWord(token)}
                        className="bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm font-medium px-2.5 py-1 rounded-lg transition-all">
                        <GenderText text={token.text} />
                    </button>
                ))}
            </div>
            {/* Feedback */}
            {checked && (
                <div className={`rounded-xl px-4 py-2.5 text-sm ${correct ? 'bg-emerald-900/40 border border-emerald-700/50 text-emerald-300' : 'bg-red-900/30 border border-red-700/40 text-red-300'}`}>
                    {correct ? '✓ Správne!' : <>✗ Správne: „<GenderText text={ex.correct} />“</>}
                    {ex.explanation && <p className="text-xs mt-1 opacity-70">{ex.explanation}</p>}
                </div>
            )}
            <div className="flex gap-2">
                {!checked && (
                    <button onClick={check} disabled={built.length === 0}
                        className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-bold transition-all">
                        Skontrolovať
                    </button>
                )}
                {checked && (
                    <button onClick={reset}
                        className="flex items-center gap-1 px-4 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 text-xs font-bold transition-all">
                        <RotateCcw size={11} /> Znova
                    </button>
                )}
            </div>
        </div>
    );
}

// ── Fill mini-exercise ──────────────────────────────────────────────────
function FillEx({ ex, exKey, results, onCheck }) {
    const [value, setValue] = useState('');
    const checked = results[exKey] !== undefined;
    const correct = results[exKey] === true;

    const check = () => {
        onCheck(exKey, isAnswerCloseEnough(value, ex.answer));
    };
    const reset = () => { setValue(''); onCheck(exKey, undefined); };

    const parts = ex.sentence.split('___');

    return (
        <div className="space-y-3">
            <p className="text-gray-200 text-sm leading-relaxed">
                <GenderText text={parts[0]} />
                <input
                    type="text"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && !checked && check()}
                    disabled={checked}
                    placeholder="…"
                    className={`inline-block mx-1 w-28 bg-gray-800 border rounded-lg px-2 py-0.5 text-sm text-center font-bold transition-all focus:outline-none
                        ${checked
                            ? correct
                                ? 'border-emerald-600 text-emerald-400'
                                : 'border-red-600 text-red-400'
                            : 'border-gray-600 focus:border-indigo-500 text-white'}`}
                />
                <GenderText text={parts[1]} />
            </p>
            {checked && (
                <div className={`rounded-xl px-4 py-2.5 text-sm ${correct ? 'bg-emerald-900/40 border border-emerald-700/50 text-emerald-300' : 'bg-red-900/30 border border-red-700/40 text-red-300'}`}>
                    {correct ? '✓ Správne!' : <>✗ Správna odpoveď: „<GenderText text={ex.answer} />“</>}
                    {ex.explanation && <p className="text-xs mt-1 opacity-70">{ex.explanation}</p>}
                </div>
            )}
            <div className="flex gap-2">
                {!checked && (
                    <button onClick={check} disabled={!value.trim()}
                        className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-bold transition-all">
                        Skontrolovať
                    </button>
                )}
                {checked && (
                    <button onClick={reset}
                        className="flex items-center gap-1 px-4 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 text-xs font-bold transition-all">
                        <RotateCcw size={11} /> Znova
                    </button>
                )}
            </div>
        </div>
    );
}

// ── MCQ mini-exercise ───────────────────────────────────────────────────
function MCQEx({ ex, exKey, results, onCheck }) {
    const [selected, setSelected] = useState(null);
    const checked = results[exKey] !== undefined;

    const choose = (idx) => {
        if (checked) return;
        setSelected(idx);
        onCheck(exKey, idx === ex.answer);
    };
    const reset = () => { setSelected(null); onCheck(exKey, undefined); };

    return (
        <div className="space-y-3">
            <p className="text-gray-200 text-sm font-medium"><GenderText text={ex.question} /></p>
            <div className="grid grid-cols-1 gap-2">
                {ex.options.map((opt, idx) => {
                    let cls = 'border-gray-700 bg-gray-800 text-gray-300 hover:border-indigo-500 hover:text-white';
                    if (checked) {
                        if (idx === ex.answer) cls = 'border-emerald-600 bg-emerald-900/30 text-emerald-300';
                        else if (idx === selected) cls = 'border-red-600 bg-red-900/20 text-red-300';
                        else cls = 'border-gray-700 bg-gray-800/50 text-gray-500 opacity-50';
                    }
                    return (
                        <button key={idx} onClick={() => choose(idx)}
                            className={`text-left px-4 py-2 rounded-xl border text-sm font-medium transition-all ${cls}`}>
                            <span className="text-xs mr-2 opacity-60">{String.fromCharCode(65 + idx)}.</span>
                            <GenderText text={opt} />
                        </button>
                    );
                })}
            </div>
            {checked && (
                <div className={`rounded-xl px-4 py-2.5 text-sm ${results[exKey] ? 'bg-emerald-900/40 border border-emerald-700/50 text-emerald-300' : 'bg-red-900/30 border border-red-700/40 text-red-300'}`}>
                    {results[exKey] ? '✓ Správne!' : <>✗ Správna odpoveď: „<GenderText text={ex.options[ex.answer]} />“</>}
                    {ex.explanation && <p className="text-xs mt-1 opacity-70">{ex.explanation}</p>}
                    <button onClick={reset}
                        className="flex items-center gap-1 mt-2 px-3 py-1 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 text-xs font-bold transition-all">
                        <RotateCcw size={11} /> Znova
                    </button>
                </div>
            )}
        </div>
    );
}

// ── Main VideoExercises component ───────────────────────────────────────
export default function VideoExercises({ exercises }) {
    const [openTopic, setOpenTopic] = useState(0);
    const [results, setResults] = useState({});

    const handleCheck = (key, value) => {
        setResults(prev => {
            const next = { ...prev };
            if (value === undefined) delete next[key];
            else next[key] = value;
            return next;
        });
    };

    const topicScore = (topicIdx) => {
        const exs = exercises.topics[topicIdx].exercises;
        const done = exs.filter((_, i) => results[`${topicIdx}_${i}`] !== undefined).length;
        const correct = exs.filter((_, i) => results[`${topicIdx}_${i}`] === true).length;
        return { done, correct, total: exs.length };
    };

    return (
        <div className="space-y-3">
            {exercises.topics.map((topic, ti) => {
                const isOpen = openTopic === ti;
                const score = topicScore(ti);
                return (
                    <div key={ti} className={`rounded-2xl border transition-all ${isOpen ? 'border-indigo-700/60 bg-indigo-950/20' : 'border-gray-700/50 bg-gray-800/30'}`}>
                        {/* Topic header */}
                        <button onClick={() => setOpenTopic(isOpen ? -1 : ti)}
                            className="w-full flex items-center gap-3 p-4 text-left">
                            <div className="flex-1 min-w-0">
                                <p className={`font-bold text-sm ${isOpen ? 'text-white' : 'text-gray-300'}`}>{topic.title}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{topic.description}</p>
                            </div>
                            {score.done > 0 && (
                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${score.correct === score.total ? 'bg-emerald-900/50 text-emerald-400' : 'bg-gray-700 text-gray-400'}`}>
                                    {score.correct}/{score.total}
                                </span>
                            )}
                            {isOpen ? <ChevronDown size={16} className="text-gray-400 flex-shrink-0" /> : <ChevronRight size={16} className="text-gray-500 flex-shrink-0" />}
                        </button>

                        {/* Exercises */}
                        {isOpen && (
                            <div className="px-4 pb-4 space-y-6 border-t border-gray-700/40 pt-4">
                                {topic.exercises.map((ex, ei) => {
                                    const key = `${ti}_${ei}`;
                                    const typeLabel = { mcq: 'Vyber správnu odpoveď', fill: 'Doplň slovo', wordorder: 'Zoraď vetu' }[ex.type] || ex.type;
                                    const isDone = results[key] !== undefined;
                                    return (
                                        <div key={ei} className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                {isDone
                                                    ? results[key]
                                                        ? <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />
                                                        : <XCircle size={14} className="text-red-500 flex-shrink-0" />
                                                    : <span className="w-3.5 h-3.5 rounded-full border border-gray-600 flex-shrink-0" />
                                                }
                                                <span className="text-xs text-gray-500 font-bold uppercase tracking-wide">{typeLabel}</span>
                                            </div>
                                            {ex.type === 'mcq' && <MCQEx ex={ex} exKey={key} results={results} onCheck={handleCheck} />}
                                            {ex.type === 'fill' && <FillEx ex={ex} exKey={key} results={results} onCheck={handleCheck} />}
                                            {ex.type === 'wordorder' && <WordOrderEx ex={ex} exKey={key} answers={{}} results={results} onCheck={handleCheck} />}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
