import React, { useState } from 'react';
import { Play, CheckCircle, ChevronLeft, Volume2, Mic, Activity } from 'lucide-react';
import { SENTENCE_UNITS } from '../data/sentenceTrainer';
import { LessonAudioPlayer } from '../components/LessonAudioPlayer';

// Import all exercises used in the trainer
import { MatchExercise } from '../components/exercises/MatchExercise';
import { FlashcardExercise } from '../components/exercises/FlashcardExercise';
import { TrueFalseExercise } from '../components/exercises/TrueFalseExercise';
import { WordOrderExercise } from '../components/exercises/WordOrderExercise';
import { FillExercise } from '../components/exercises/FillExercise';
import { TranslationExercise } from '../components/exercises/TranslationExercise';
import { SpeakingExercise } from '../components/exercises/SpeakingExercise';
import { DialogueExercise } from '../components/exercises/DialogueExercise';

// Map type string to React component
const EXERCISE_MAP = {
    match: MatchExercise,
    flashcard: FlashcardExercise,
    truefalse: TrueFalseExercise,
    wordorder: WordOrderExercise,
    fill: FillExercise,
    translation: TranslationExercise,
    speaking: SpeakingExercise,
    dialogue: DialogueExercise
};

export function SentenceTrainer() {
    const [activeUnit, setActiveUnit] = useState(null);

    if (activeUnit) {
        return (
            <TrainerRunner
                unit={activeUnit}
                onExit={() => setActiveUnit(null)}
            />
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up pb-[100px] mt-4">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-900 to-indigo-900 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <Activity className="w-8 h-8 text-emerald-400" />
                        <h1 className="text-4xl font-black tracking-tight">Tréner viet</h1>
                    </div>
                    <p className="text-emerald-100 text-lg max-w-2xl leading-relaxed">
                        Vybudujte si komunikačné reflexy a rečové návyky automatizovaným tréningom.
                        Tento drilový systém vás postupne prevedie od pasívneho slovníka až po plynulé
                        rozprávanie v simulovanom dialógu.
                    </p>
                </div>
            </div>

            {/* List of Units */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SENTENCE_UNITS.map(unit => (
                    <div key={unit.id} className="bg-gray-800 border border-gray-700 rounded-3xl p-6 hover:border-emerald-500 transition-colors shadow-lg flex flex-col">
                        <h2 className="text-xl font-bold tracking-tight text-white mb-2">{unit.title}</h2>
                        <p className="text-sm text-gray-400 mb-6 flex-1">{unit.description}</p>

                        <div className="flex items-center justify-between mt-auto">
                            <span className="text-xs font-mono text-emerald-400 bg-emerald-900/30 px-3 py-1 rounded-full">
                                {unit.exercises.length} fáz tréningu
                            </span>
                            <button
                                onClick={() => setActiveUnit(unit)}
                                className="bg-emerald-600 hover:bg-emerald-500 text-white p-3 rounded-full transition-transform hover:scale-105 active:scale-95 shadow-md shadow-emerald-900/50"
                            >
                                <Play className="w-5 h-5 fill-current ml-0.5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Trainer Runner - Manages phase progression
// ─────────────────────────────────────────────────────────────────────────────

function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function TrainerRunner({ unit, onExit }) {
    // Shuffle the exercises once when the runner starts for this unit
    const [exercises] = useState(() => shuffle(unit.exercises));
    const [phaseIndex, setPhaseIndex] = useState(0);
    const [finished, setFinished] = useState(false);

    const totalPhases = exercises.length;
    const currentEx = exercises[phaseIndex];

    const handleComplete = () => {
        if (phaseIndex < totalPhases - 1) {
            setPhaseIndex(phaseIndex + 1);
        } else {
            setFinished(true);
        }
    };

    if (finished) {
        return (
            <div className="max-w-2xl mx-auto mt-12 bg-gray-900 border border-emerald-900/50 rounded-[2rem] p-10 text-center space-y-6 shadow-2xl animate-fade-in-up">
                <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-12 h-12 text-emerald-400" />
                </div>
                <h2 className="text-4xl font-black text-white">Úžasné!</h2>
                <p className="text-gray-300 text-lg">
                    Úspešne ste zvládli všetkých {totalPhases} fáz drilu pre „{unit.title}".
                    Vaše reflexy sú teraz ostrejšie.
                </p>
                <button
                    onClick={onExit}
                    className="mt-8 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all"
                >
                    Späť na výber tréningov
                </button>
            </div>
        );
    }

    const ExComponent = EXERCISE_MAP[currentEx.type];

    return (
        <div className="max-w-5xl mx-auto flex flex-col gap-6 pb-[100px] animate-fade-in-up px-4">
            {/* Top header bar */}
            <div className="flex items-center justify-between bg-gray-900 border border-gray-800 p-4 rounded-2xl shadow-sm sticky top-0 z-10">
                <button
                    onClick={onExit}
                    className="text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                    <ChevronLeft className="w-5 h-5" />
                    <span className="text-sm font-medium">Ukončiť</span>
                </button>
                <div className="text-sm font-mono text-emerald-400 font-semibold tracking-wide">
                    FÁZA {phaseIndex + 1} / {totalPhases}
                </div>
                <div className="flex gap-1">
                    {exercises.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1.5 w-6 rounded-full ${i <= phaseIndex ? 'bg-emerald-500' : 'bg-gray-800'}`}
                        />
                    ))}
                </div>
            </div>

            {/* Two-column layout — centered */}
            <div className="flex gap-10 items-start justify-center">

                {/* ── LEFT SIDEBAR: persistent audio player ── */}
                {unit.audioSrc && (
                    <div className="flex flex-col gap-4 w-72 flex-shrink-0 sticky top-24">
                        <LessonAudioPlayer src={unit.audioSrc} title={unit.audioTitle} />
                    </div>
                )}

                {/* ── RIGHT MAIN: exercise content ── */}
                <div className="flex-1 min-w-0 max-w-2xl pl-10">
                    {/* Instruction */}
                    <div className="mb-5">
                        <h3 className="text-xl font-bold text-white tracking-tight">
                            {currentEx.instruction || 'Splňte nasledujúce zadanie:'}
                        </h3>
                    </div>

                    {/* Exercise widget */}
                    <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 md:p-8 shadow-xl">
                        {ExComponent ? (
                            <ExComponent
                                exercise={currentEx}
                                lesson={unit}
                                onComplete={handleComplete}
                            />
                        ) : (
                            <div className="text-rose-400 p-4">Komponent pre „{currentEx.type}" nebol nájdený.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
