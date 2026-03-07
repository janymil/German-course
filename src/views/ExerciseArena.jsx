import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    Target, Play, Clock, Zap, Star, StopCircle, RefreshCw,
    Volume2, Mic, CheckCircle2, XCircle, Keyboard, Shuffle,
    Trophy, MessageSquare, Flame, Key, Loader2, ChevronRight, HelpCircle
} from 'lucide-react';
import { LESSONS } from '../data/curriculum';
import { useTTS } from '../hooks/useTTS';
import { callGemini } from '../hooks/useAI';
import { isAnswerCloseEnough, normalizeGerman } from '../utils/text';

// ─── Helpers ────────────────────────────────────────────────────────────────
const rnd = (arr) => arr[Math.floor(Math.random() * arr.length)];
const shuf = (arr) => [...arr].sort(() => Math.random() - 0.5);
const getKey = () => import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('gemini_api_key') || '';

// Extract phonetic items: examples with [phonetic] notation → dictation from phonetic
function phoneticItems(lesson) {
    const items = [];
    const ex = lesson.grammarNote?.examples || [];
    ex.forEach(e => {
        const m = e.de?.match(/^(.+?)\s*→\s*\[(.+?)\]/);
        if (m) {
            items.push({
                type: 'phonetic_dictation',
                phoneticText: `[${m[2]}]`,
                correct: m[1].trim(),
                hint: e.sk || '',
                lessonTitle: lesson.title,
                lessonId: lesson.id,
            });
        }
    });
    return items;
}

// Dialogue items from lesson exercises
function dialogueItems(lesson) {
    const ex = (lesson.exercises || []).find(e => e.type === 'dialogue');
    if (!ex?.turns) return [];
    const playerTurns = ex.turns.filter(t => t.playerTurn && t.options);
    return playerTurns.map(t => ({
        type: 'dialogue',
        prompt: (() => {
            const idx = ex.turns.indexOf(t);
            for (let i = idx - 1; i >= 0; i--) {
                if (!ex.turns[i].playerTurn) return ex.turns[i].de;
            }
            return 'Antworte auf Deutsch:';
        })(),
        options: t.options,
        correct: t.options.find(o => o.correct)?.de || '',
        hint: t.sk || '',
        lessonTitle: lesson.title,
        lessonId: lesson.id,
    }));
}

// Build full pool
function buildPool(sourceLessons, allUnlocked) {
    const items = [];
    const allVocab = allUnlocked.flatMap(l => l.vocab || []);

    sourceLessons.forEach(lesson => {
        // vocab items
        (lesson.vocab || []).forEach(v => {
            const dist3 = (from, key, val) => {
                const d = from.filter(x => x[key] !== val).sort(() => Math.random() - 0.5).slice(0, 3).map(x => x[key]);
                while (d.length < 3) d.push('—');
                return d;
            };
            // DE→SK translation
            items.push({
                type: 'translation', question: v.de, correct: v.sk,
                options: shuf([...dist3(allVocab, 'sk', v.sk), v.sk]),
                audio: v.de, lessonTitle: lesson.title, lessonId: lesson.id
            });
            // SK→DE reverse
            items.push({
                type: 'translation_reverse', question: v.sk, correct: v.de,
                options: shuf([...dist3(allVocab, 'de', v.de), v.de]),
                lessonTitle: lesson.title, lessonId: lesson.id
            });
            // Dictation
            items.push({
                type: 'dictation', audio: v.de, correct: v.de,
                hint: v.sk, lessonTitle: lesson.title, lessonId: lesson.id
            });
            // Speech
            items.push({
                type: 'speech', text: v.de, sk: v.sk, correct: v.de,
                lessonTitle: lesson.title, lessonId: lesson.id
            });
            // Example sentence dictation
            if (v.example) {
                items.push({
                    type: 'dictation', audio: v.example, correct: v.example,
                    hint: v.exampleSk || v.sk, lessonTitle: lesson.title, lessonId: lesson.id
                });
            }
        });

        // Word order
        const wo = (lesson.exercises || []).find(e => e.type === 'wordorder');
        (wo?.sentences || []).forEach(s => {
            if (s.words && s.correct)
                items.push({
                    type: 'wordorder', words: shuf(s.words), correct: s.correct,
                    hint: s.hint || '', explanation: s.explanation || '',
                    lessonTitle: lesson.title, lessonId: lesson.id
                });
        });

        // MCQ
        const mcq = (lesson.exercises || []).find(e => e.type === 'mcq');
        (mcq?.questions || []).forEach(q => {
            if (q.question && q.options && q.answer !== undefined)
                items.push({
                    type: 'mcq', question: q.question, options: q.options,
                    correct: q.options[q.answer], explanation: q.explanation || '',
                    lessonTitle: lesson.title, lessonId: lesson.id
                });
        });

        // Fill-in
        const fill = (lesson.exercises || []).find(e => e.type === 'fill');
        (fill?.questions || []).forEach(q => {
            if (q.sentence && q.answer)
                items.push({
                    type: 'fill', sentence: q.sentence, correct: q.answer,
                    hint: q.hint || '', explanation: q.explanation || '',
                    lessonTitle: lesson.title, lessonId: lesson.id
                });
        });

        // Phonetic dictation
        items.push(...phoneticItems(lesson));

        // Dialogue
        items.push(...dialogueItems(lesson));
    });

    return items;
}

// AI: generate extra exercises for a lesson
async function fetchAIExercises(lesson, allUnlockedLessons, count = 10) {
    // ── Knowledge Base lookup (upsert — array grows over time) ───────────────
    const kbType = 'arena_exercises';
    const kbKey  = `arena::L${lesson.id}`;
    let cached   = [];

    try {
        const res = await fetch(`/api/kb?type=${encodeURIComponent(kbType)}&key=${encodeURIComponent(kbKey)}`);
        if (res.ok) {
            const data = await res.json();
            if (data.found && Array.isArray(data.output)) cached = data.output;
        }
    } catch { }

    // Legacy aibank fallback (transition period — will be empty once KB has data)
    if (cached.length === 0) {
        try {
            const legRes = await fetch(`http://${window.location.hostname}:5173/api/aibank`);
            if (legRes.ok) {
                const legData = await legRes.json();
                if (legData[lesson.id] && legData[lesson.id].length > 0) {
                    cached = legData[lesson.id];
                    // Promote legacy data to KB
                    fetch('/api/kb', { method: 'POST', headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ type: kbType, key: kbKey, input: { lessonId: lesson.id }, output: cached, model: 'gemini-2.5-pro', sourceApp: 'exercise_arena (promoted)', upsert: true })
                    }).catch(() => {});
                }
            }
        } catch { }
    }

    // If we already have enough cached exercises, recycle them (shuffle and pick)
    if (cached.length >= count) {
        return shuf(cached).slice(0, count);
    }

    // Determine how many we actually need to generate to reach the count
    const needed = count - cached.length;

    const key = getKey();
    if (!key) return cached; // return whatever we have if no key

    const vocabList = allUnlockedLessons.flatMap(l => l.vocab || []).map(v => v.de).join(', ');
    const system = `Si obzvlášť kreatívny učiteľ nemčiny. Vygeneruj presne ${needed} originálnych prekladových cvičení pre lekciu "${lesson.title}" na úrovni A1. 
DÔLEŽITÉ PRAVIDLÁ PRE KVALITNÝ OBSAH (SMART AI):
1. Tvoja nová slovná zásoba musí byť VÝHRADNE z tohto zoznamu povolených slov: ${vocabList}. NIKDY nepouži nezvyčajné alebo pokročilé slová mimo zoznamu.
2. Predíď nude a recyklácii: Nekombinuj tie isté slová dokola. Použi čo najväčšiu šírku z udeleného zoznamu. Vytváraj logické a pre život užitočné vety.
3. Variabilita: Striedaj osoby (ich, du, er/sie/es, wir, ihr, sie) a typy viet (oznamovacie, opytovacie, záporné), aby boli cvičenia pestré.
4. Odpovedaj VÝHRADNE JSON poľom bez markdownu. Každý objekt má tvar: {"type":"translation","de":"nemecká veta z povolených slov","sk":"slovenský preklad"}`;
    try {
        const raw = await callGemini(
            [{ role: 'system', content: system }],
            { temperature: 0.8, maxOutputTokens: 4000 }
        ).then(text => text.replace(/```json|```/g, ''));
        const arr = JSON.parse(raw);
        if (!Array.isArray(arr)) return cached;
        const newItems = arr.map(item => ({
            type: 'translation',
            question: item.de,
            correct: item.sk,
            options: shuf([item.sk, 'andere Option 1', 'andere Option 2', 'andere Option 3']),
            audio: item.de,
            lessonTitle: `🤖 AI: ${lesson.title}`,
            lessonId: lesson.id,
            isAI: true,
            id: Math.random().toString(36).substring(7)
        }));

        // Combine and save to KB (upsert — accumulated over time)
        const combined = [...cached, ...newItems];
        fetch('/api/kb', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: kbType, key: kbKey, input: { lessonId: lesson.id }, output: combined, model: 'gemini-2.5-pro', sourceApp: 'exercise_arena', upsert: true })
        }).catch(() => {});

        // Also write to legacy aibank for backward compatibility
        try {
            await fetch(`http://${window.location.hostname}:5173/api/aibank`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ lessonId: lesson.id, items: newItems })
            });
        } catch { }

        return shuf(combined).slice(0, count);
    } catch { return cached; }
}

// Word-level diff for speech feedback
function wordDiff(spoken = '', target = '') {
    const sWords = spoken.toLowerCase().split(/\s+/).filter(Boolean);
    const tWords = target.toLowerCase().split(/\s+/).filter(Boolean);
    return tWords.map(tw => ({
        word: tw,
        ok: sWords.some(sw => isAnswerCloseEnough(sw, tw))
    }));
}

// Mode metadata
const MODE_META = {
    translation: { label: 'Bleskový preklad', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', icon: Zap },
    translation_reverse: { label: 'Reverzný preklad', color: 'text-violet-400', bg: 'bg-violet-500/10 border-violet-500/20', icon: Shuffle },
    dictation: { label: 'Diktát', color: 'text-sky-400', bg: 'bg-sky-500/10 border-sky-500/20', icon: Volume2 },
    phonetic_dictation: { label: 'Fonetický diktát', color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20', icon: Volume2 },
    speech: { label: 'Hovorenie', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', icon: Mic },
    wordorder: { label: 'Slovosled', color: 'text-pink-400', bg: 'bg-pink-500/10 border-pink-500/20', icon: Shuffle },
    mcq: { label: 'Test', color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20', icon: Star },
    fill: { label: 'Doplň slovo', color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20', icon: Keyboard },
    dialogue: { label: 'Dialóg', color: 'text-teal-400', bg: 'bg-teal-500/10 border-teal-500/20', icon: MessageSquare },
};

// ════════════════════════════════════════════════════════════════════════════
export default function ExerciseArena({ progress, onNavigate }) {
    const { speak } = useTTS();
    const [selectedLessonId, setSelectedLessonId] = useState('mix');
    const [isTraining, setIsTraining] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [sessionDuration, setSessionDuration] = useState(20);
    const [timeRemaining, setTimeRemaining] = useState(20 * 60);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [totalAnswered, setTotalAnswered] = useState(0);
    const [totalCorrect, setTotalCorrect] = useState(0);
    const [sessionHistory, setSessionHistory] = useState([]);

    const [pool, setPool] = useState([]);
    const [currentItem, setCurrentItem] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const [feedbackMsg, setFeedbackMsg] = useState('');
    const [wordDiffResult, setWordDiffResult] = useState(null);

    // Blitz timer per-question (for translation modes)
    const [blitzTime, setBlitzTime] = useState(null);
    const [blitzRunning, setBlitzRunning] = useState(false);
    const blitzRef = useRef(null);

    // Text input
    const [textInput, setTextInput] = useState('');
    const inputRef = useRef(null);

    // Word order
    const [wordSlots, setWordSlots] = useState([]);
    const [wordBank, setWordBank] = useState([]);
    const dragWord = useRef(null);
    const dragFrom = useRef(null); // 'bank' | 'slot'

    // Speech
    const { transcript, listening, resetTranscript } = useSpeechRecognition();
    const transcriptRef = useRef('');

    useEffect(() => {
        transcriptRef.current = transcript;
    }, [transcript]);

    // AI generation
    const [aiLoading, setAiLoading] = useState(false);
    const [aiEnabled, setAiEnabled] = useState(false);
    const [hasKey, setHasKey] = useState(false);

    // Check for API key on mount
    useEffect(() => { setHasKey(!!getKey()); }, []);

    // Unlocked lessons
    const unlockedLessons = LESSONS.filter(l => {
        const done = !!progress?.completedLessons?.[l.id];
        const idx = LESSONS.findIndex(x => x.id === l.id);
        const prevDone = idx === 0 || !!progress?.completedLessons?.[LESSONS[idx - 1]?.id];
        const placement = l.id <= (progress?.placementUnlockedUpTo || 0);
        return done || prevDone || placement;
    });

    // ── Main timer ────────────────────────────────────────────────────────────
    useEffect(() => {
        if (!isTraining) return;
        if (timeRemaining <= 0) { setIsTraining(false); setIsDone(true); return; }
        const t = setInterval(() => setTimeRemaining(s => s - 1), 1000);
        return () => clearInterval(t);
    }, [isTraining, timeRemaining]);

    // ── Blitz timer (per-question for translation modes) ──────────────────────
    useEffect(() => {
        if (!blitzRunning || blitzTime === null) return;
        if (blitzTime <= 0) {
            setBlitzRunning(false);
            processAnswer(false, 'Vypršal čas', currentItem?.correct || '');
            return;
        }
        blitzRef.current = setTimeout(() => setBlitzTime(t => t - 1), 1000);
        return () => clearTimeout(blitzRef.current);
    }, [blitzRunning, blitzTime, currentItem]);

    const startBlitz = useCallback(() => {
        clearTimeout(blitzRef.current);
        setBlitzTime(7);
        setBlitzRunning(true);
    }, []);

    const stopBlitz = useCallback(() => {
        clearTimeout(blitzRef.current);
        setBlitzRunning(false);
        setBlitzTime(null);
    }, []);

    // ── Pick next item ────────────────────────────────────────────────────────
    const nextItem = useCallback((currentPool, currentRoundIdx = 0) => {
        if (!currentPool.length) return;

        let types = [];
        if (currentRoundIdx === 0) types = ['translation', 'mcq', 'dictation'];
        else if (currentRoundIdx === 1) types = ['translation_reverse', 'wordorder', 'fill'];
        else types = ['speech', 'phonetic_dictation', 'dialogue'];

        let availableItems = currentPool.filter(i => types.includes(i.type));
        if (!availableItems.length) availableItems = currentPool;

        const item = rnd(availableItems);
        setCurrentItem(item);
        setFeedback(null);
        setFeedbackMsg('');
        setTextInput('');
        setWordDiffResult(null);
        setWordSlots([]);
        setWordBank(item.type === 'wordorder' ? shuf(item.words) : []);
        resetTranscript();
        stopBlitz();

        if (item.type === 'dictation' && item.audio) {
            setTimeout(() => speak(item.audio), 600);
        }
        if (item.type === 'phonetic_dictation') {
            // Don't auto-speak — user sees phonetic text and types the word
        }
        if (item.type === 'translation' || item.type === 'translation_reverse') {
            setTimeout(startBlitz, 300);
        }
        setTimeout(() => inputRef.current?.focus(), 80);
    }, [speak, resetTranscript, startBlitz, stopBlitz]);

    // ── Process answer ────────────────────────────────────────────────────────
    const processAnswer = useCallback((isCorrect, userAnswer = '', correctAnswer = '', explanation = '') => {
        stopBlitz();
        setTotalAnswered(t => t + 1);
        setSessionHistory(h => [...h, { item: currentItem, isCorrect, userAnswer, correctAnswer: correctAnswer || currentItem?.correct || '', type: currentItem?.type }]);

        const newStreak = isCorrect ? streak + 1 : 0;
        if (isCorrect) {
            setTotalCorrect(t => t + 1);
            setStreak(newStreak);
            setScore(s => s + 10 + newStreak * 2);
            setFeedback('correct');
            setFeedbackMsg('✓ Správne!');
        } else {
            setStreak(0);
            setFeedback('incorrect');
            setFeedbackMsg(correctAnswer ? `Správne: „${correctAnswer}"` : '✗ Nesprávne');
        }
        if (explanation) setFeedbackMsg(p => p + (explanation ? ` — ${explanation}` : ''));

        const nextRoundIdx = newStreak < 3 ? 0 : newStreak < 6 ? 1 : 2;
        setTimeout(() => nextItem(pool, nextRoundIdx), isCorrect ? 1200 : 2400);
    }, [streak, pool, nextItem, stopBlitz, currentItem]);

    // ── Start / Stop ──────────────────────────────────────────────────────────
    const startTraining = async () => {
        const sourceLessons = selectedLessonId === 'mix'
            ? unlockedLessons
            : [LESSONS.find(l => l.id === parseInt(selectedLessonId))].filter(Boolean);

        let newPool = buildPool(sourceLessons, unlockedLessons);

        // AI exercise generation
        if (aiEnabled && hasKey && sourceLessons.length === 1) {
            setAiLoading(true);
            const count = Math.min(Math.round(sessionDuration * 2) + 5, 40); // Scaling 
            const aiItems = await fetchAIExercises(sourceLessons[0], unlockedLessons, count);
            newPool = [...newPool, ...aiItems];
            setAiLoading(false);
        }

        if (!newPool.length) return;
        setPool(newPool);
        setScore(0); setStreak(0); setTotalAnswered(0); setTotalCorrect(0); setSessionHistory([]);
        setTimeRemaining(sessionDuration * 60);
        setIsDone(false); setIsTraining(true);
        nextItem(newPool, 0);
    };

    const stopTraining = () => {
        stopBlitz();
        SpeechRecognition.stopListening();
        setIsTraining(false);
        setIsDone(true);
    };

    // ── MCQ handler ───────────────────────────────────────────────────────────
    const handleMCQ = (opt) => {
        if (feedback !== null) return;
        processAnswer(opt === currentItem.correct, typeof opt === 'object' ? opt.de : opt, currentItem.correct, currentItem.explanation);
    };

    // ── Text submit (dictation / fill / phonetic) ──────────────────────────────
    const handleTextSubmit = (e) => {
        e?.preventDefault();
        if (feedback !== null || !textInput.trim()) return;
        const ok = isAnswerCloseEnough(textInput, currentItem.correct);
        processAnswer(ok, textInput, currentItem.correct, currentItem.explanation);
    };

    // ── Word order ────────────────────────────────────────────────────────────
    const removeFirst = (arr, val) => {
        const i = arr.indexOf(val);
        return i === -1 ? arr : [...arr.slice(0, i), ...arr.slice(i + 1)];
    };
    const handleWordClickBank = (w) => { if (feedback) return; setWordBank(b => removeFirst(b, w)); setWordSlots(s => [...s, w]); };
    const handleWordClickSlot = (w) => { if (feedback) return; setWordSlots(s => removeFirst(s, w)); setWordBank(b => [...b, w]); };

    // Real drag-and-drop handlers
    const onDragStart = (word, from) => { dragWord.current = word; dragFrom.current = from; };
    const onDropSlots = (e) => {
        e.preventDefault();
        if (!dragWord.current || feedback) return;
        if (dragFrom.current === 'bank') { setWordBank(b => removeFirst(b, dragWord.current)); setWordSlots(s => [...s, dragWord.current]); }
        dragWord.current = null;
    };
    const onDropBank = (e) => {
        e.preventDefault();
        if (!dragWord.current || feedback) return;
        if (dragFrom.current === 'slot') { setWordSlots(s => removeFirst(s, dragWord.current)); setWordBank(b => [...b, dragWord.current]); }
        dragWord.current = null;
    };

    const handleWordOrderSubmit = () => {
        if (feedback || !wordSlots.length) return;
        const ok = isAnswerCloseEnough(wordSlots.join(' '), currentItem.correct);
        processAnswer(ok, wordSlots.join(' '), currentItem.correct, currentItem.explanation);
    };

    // ── Speech ────────────────────────────────────────────────────────────────
    const toggleListening = () => {
        if (listening) {
            SpeechRecognition.stopListening();
            setTimeout(() => {
                const spoken = transcriptRef.current;
                const target = currentItem.correct;
                const ok = spoken && isAnswerCloseEnough(spoken, target);
                setWordDiffResult(wordDiff(spoken, target));
                processAnswer(ok, spoken, target);
            }, 1000);
        } else {
            resetTranscript();
            SpeechRecognition.startListening({ language: 'de-DE', continuous: true });
        }
    };

    const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

    const handleDownloadPDF = (includeAnswers) => {
        const title = "Tréningová Aréna - Cvičenia";
        let html = `<html><head><title>${title}</title><meta charset="utf-8">
        <style>
            body { font-family: sans-serif; padding: 20px; color: #333; max-width: 800px; margin: 0 auto; }
            h1 { text-align: center; border-bottom: 2px solid #ccc; padding-bottom: 10px; }
            .item { margin-bottom: 20px; padding: 15px; border: 1px solid #eee; border-radius: 8px; page-break-inside: avoid; }
            .type { font-size: 10px; color: #888; text-transform: uppercase; font-weight: bold; }
            .question { font-size: 18px; font-weight: bold; margin: 8px 0; }
            .options { font-size: 14px; color: #555; margin-bottom: 8px; }
            .answer-box { margin-top: 10px; padding: 10px; background: #f9f9f9; border-radius: 6px; }
            .empty-box { border-bottom: 1px dashed #ccc; height: 40px; margin-top: 15px; }
            .correct { color: #10b981; font-weight: bold; }
            .incorrect { color: #ef4444; font-weight: bold; }
            @media print { .no-print { display: none; } body { padding: 0; } .item { border-color: #ccc; } }
        </style></head><body>
        <div class="no-print" style="text-align:center;margin-bottom:20px;">
            <button onclick="window.print()" style="padding:10px 20px;background:#4f46e5;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:bold;">Vytlačiť do PDF</button>
        </div>
        <h1>${title}</h1>
        <p style="text-align:center; color:#666;">Počet otázok: ${sessionHistory.length}</p>`;

        sessionHistory.forEach((h, i) => {
            const item = h.item;
            html += `<div class="item">`;
            html += `<div class="type">${h.type} | Z lekcie ${item.lessonId}</div>`;

            let qText = item.question || item.sentence || item.text || item.phoneticText || item.prompt;
            if (h.type === 'wordorder') qText = `Zoraďte slová: ${item.words.join(' / ')}`;
            if (h.type === 'dictation') qText = `(Diktát) Napíšte počuté: ${item.hint ? '(' + item.hint + ')' : ''}`;

            html += `<div class="question">${i + 1}. ${qText}</div>`;

            if (item.options) {
                const opts = item.options.map(o => typeof o === 'object' ? o.de : o).join(' • ');
                html += `<div class="options">Možnosti: ${opts}</div>`;
            }

            if (includeAnswers) {
                html += `<div class="answer-box">`;
                html += `<div>Tvoja odpoveď: <span class="${h.isCorrect ? 'correct' : 'incorrect'}">${h.userAnswer || '(žiadna / čas vypršal)'}</span></div>`;
                if (!h.isCorrect) html += `<div style="margin-top:4px;">Správna odpoveď: <span class="correct">${h.correctAnswer}</span></div>`;
                html += `</div>`;
            } else {
                html += `<div class="empty-box">Odpoveď: </div>`;
            }
            html += `</div>`;
        });

        html += `</body></html>`;
        const win = window.open('', '_blank');
        win.document.write(html);
        win.document.close();
    };

    // ══════════════════════════════════════════════════════════════════════════
    // LOBBY
    // ══════════════════════════════════════════════════════════════════════════
    if (!isTraining && !isDone) {
        return (
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center space-y-3 mb-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-indigo-500/10 border border-indigo-500/20 shadow-[0_0_40px_rgba(99,102,241,0.25)]">
                        <Target size={40} className="text-indigo-400" />
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">Tréningová Aréna</h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">Nekonečné, dynamické cvičenia — preklad, diktát, hovorenie, slovosled, dialóg a viac.</p>
                </div>

                {/* Mode cards */}
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 max-w-3xl mx-auto">
                    {[
                        { icon: Zap, label: 'Preklad\n5s čas', c: 'text-amber-400', bg: 'from-amber-950/50 to-amber-900/10 border-amber-800/40' },
                        { icon: Volume2, label: 'Diktát\n+ fonetický', c: 'text-sky-400', bg: 'from-sky-950/50 to-sky-900/10 border-sky-800/40' },
                        { icon: Mic, label: 'Hovorenie\nanalýza', c: 'text-emerald-400', bg: 'from-emerald-950/50 to-emerald-900/10 border-emerald-800/40' },
                        { icon: Shuffle, label: 'Slovosled\ndrag & drop', c: 'text-pink-400', bg: 'from-pink-950/50 to-pink-900/10 border-pink-800/40' },
                        { icon: MessageSquare, label: 'Dialóg\nA1 situácie', c: 'text-teal-400', bg: 'from-teal-950/50 to-teal-900/10 border-teal-800/40' },
                    ].map(({ icon: Icon, label, c, bg }) => (
                        <div key={label} className={`bg-gradient-to-br ${bg} border rounded-2xl p-3 flex flex-col items-center gap-1.5 text-center`}>
                            <Icon size={22} className={c} />
                            <span className="text-[11px] font-semibold text-gray-300 whitespace-pre-line leading-snug">{label}</span>
                        </div>
                    ))}
                </div>

                {/* Settings */}
                <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-xl max-w-2xl mx-auto space-y-5">
                    <h2 className="text-xl font-bold text-white">Nastavenie tréningu</h2>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Čo chceš precvičiť?</label>
                        <select value={selectedLessonId} onChange={e => setSelectedLessonId(e.target.value)}
                            className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-all font-medium">
                            <option value="mix">🔥 Mix všetkého odomknutého</option>
                            {unlockedLessons.map(l => <option key={l.id} value={l.id}>Lekcia {l.id}: {l.title}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Dĺžka tréningovej session</label>
                        <div className="flex gap-2">
                            {[10, 15, 20, 30].map(m => (
                                <button key={m} onClick={() => setSessionDuration(m)}
                                    className={`flex-1 py-2 rounded-xl font-bold text-sm transition-all border ${sessionDuration === m ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-500'}`}>
                                    {m} min
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* AI toggle */}
                    {hasKey && selectedLessonId !== 'mix' && (
                        <div className="flex items-center justify-between bg-violet-950/30 border border-violet-900/40 rounded-2xl p-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-violet-500/20 flex items-center justify-center"><Key size={16} className="text-violet-400" /></div>
                                <div>
                                    <p className="text-sm font-bold text-white">AI generovanie otázok</p>
                                    <p className="text-xs text-gray-500">Gemini AI vygeneruje extra cvičenia pre vybranú lekciu</p>
                                </div>
                            </div>
                            <button onClick={() => setAiEnabled(v => !v)}
                                className={`w-12 h-6 rounded-full transition-all relative ${aiEnabled ? 'bg-violet-600' : 'bg-gray-700'}`}>
                                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${aiEnabled ? 'left-7' : 'left-1'}`} />
                            </button>
                        </div>
                    )}
                    {!hasKey && (
                        <p className="text-xs text-gray-600 text-center">Nastav API kľúč pre AI generovanie extra otázok</p>
                    )}

                    <button onClick={startTraining} disabled={!unlockedLessons.length || aiLoading}
                        className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-700 text-white font-bold rounded-xl transition-all shadow-[0_4px_20px_rgba(99,102,241,0.4)] flex items-center justify-center gap-3 text-lg group">
                        {aiLoading ? <><Loader2 size={22} className="animate-spin" /> Generujem AI otázky…</> : <><Play size={22} className="group-hover:scale-110 transition-transform" /> Vstúpiť do Arény</>}
                    </button>
                </div>
            </div>
        );
    }

    // ══════════════════════════════════════════════════════════════════════════
    // RESULTS
    // ══════════════════════════════════════════════════════════════════════════
    if (isDone) {
        const acc = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
        const grade = acc >= 90 ? '🏆 Výborný výkon!' : acc >= 70 ? '🌟 Dobrý výkon!' : acc >= 50 ? '💪 Trénuj ďalej!' : '📚 Potrebuješ viac praxe';
        return (
            <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-gray-900 border border-gray-800 rounded-3xl p-10 text-center shadow-2xl space-y-6">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-amber-500/10 border border-amber-500/20 shadow-[0_0_40px_rgba(245,158,11,0.3)]">
                        <Trophy size={48} className="text-amber-400" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-extrabold text-white">Tréning dokončený!</h2>
                        <p className="text-gray-400 mt-1">{grade}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {[['Skóre', score, 'text-amber-400'], ['Presnosť', `${acc}%`, 'text-emerald-400'], ['Otázky', totalAnswered, 'text-indigo-400']].map(([l, v, c]) => (
                            <div key={l} className="bg-gray-800/50 rounded-2xl p-4">
                                <p className="text-gray-500 text-xs uppercase font-bold mb-1">{l}</p>
                                <p className={`text-3xl font-black ${c}`}>{v}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-3">
                        <button onClick={startTraining} className="flex-1 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl flex items-center justify-center gap-2">
                            <RefreshCw size={18} /> Nový tréning
                        </button>
                        <button onClick={() => setIsDone(false)} className="flex-1 py-3.5 bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold rounded-xl flex items-center justify-center gap-2">
                            <Target size={18} /> Zmeniť lekciu
                        </button>
                    </div>
                    {sessionHistory.length > 0 && (
                        <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-gray-800/50">
                            <button onClick={() => handleDownloadPDF(false)} className="flex-1 py-2.5 bg-sky-900/40 hover:bg-sky-800/60 border border-sky-800/50 text-sky-400 font-bold rounded-xl text-sm transition-all hover:text-sky-300">
                                📄 Uložiť len otázky (PDF)
                            </button>
                            <button onClick={() => handleDownloadPDF(true)} className="flex-1 py-2.5 bg-emerald-900/40 hover:bg-emerald-800/60 border border-emerald-800/50 text-emerald-400 font-bold rounded-xl text-sm transition-all hover:text-emerald-300">
                                📝 Report s odpoveďami (PDF)
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // ══════════════════════════════════════════════════════════════════════════
    // TRAINING
    // ══════════════════════════════════════════════════════════════════════════
    if (!currentItem) return null;
    const meta = MODE_META[currentItem.type] || MODE_META.translation;
    const ModeIcon = meta.icon;

    return (
        <div className="max-w-3xl mx-auto flex flex-col gap-4 pb-24 md:pb-4">

            {/* HUD */}
            <div className="flex items-center justify-between bg-gray-900/90 backdrop-blur-md border border-gray-800 p-3 sm:p-4 rounded-2xl shadow-xl sticky top-0 z-20">
                <div className="flex items-center gap-3">
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${timeRemaining < 300 ? 'bg-red-500/10 border-red-500/30' : 'bg-indigo-500/10 border-indigo-500/20'}`}>
                        <Clock size={14} className={timeRemaining < 300 ? 'text-red-400 animate-pulse' : 'text-indigo-400'} />
                        <span className={`font-mono font-bold text-base ${timeRemaining < 300 ? 'text-red-400' : 'text-indigo-300'}`}>{formatTime(timeRemaining)}</span>
                    </div>
                    {streak > 2 && (
                        <span className="hidden sm:flex items-center gap-1 text-xs text-orange-400 bg-orange-500/10 px-2 py-1 rounded-lg border border-orange-500/20 animate-pulse font-bold">
                            <Flame size={11} /> {streak}× Kombo
                        </span>
                    )}
                    {(() => {
                        const rIdx = streak < 3 ? 0 : streak < 6 ? 1 : 2;
                        const rName = rIdx === 0 ? '🌟 EASY' : rIdx === 1 ? '🔥 INTERMEDIATE' : '💀 HARD';
                        const rCol = rIdx === 0 ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' : rIdx === 1 ? 'text-amber-400 bg-amber-500/10 border-amber-500/30' : 'text-red-400 bg-red-500/10 border-red-500/30';
                        return (
                            <span className={`hidden sm:flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg border ${rCol}`}>
                                {rName}
                            </span>
                        );
                    })()}
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                        <p className="text-[10px] text-gray-500 uppercase font-bold">Presnosť</p>
                        <p className="text-sm font-bold text-gray-300">{totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0}%</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] text-gray-500 uppercase font-bold">Skóre</p>
                        <div className="flex items-center gap-1 text-xl font-black text-amber-400"><Star size={13} className="text-amber-500" />{score}</div>
                    </div>
                    <button onClick={stopTraining} className="p-2 text-gray-600 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"><StopCircle size={20} /></button>
                </div>
            </div>

            {/* Question card */}
            <div className={`bg-gray-900 border rounded-3xl p-6 sm:p-8 shadow-xl min-h-[380px] flex flex-col transition-all ${feedback === 'correct' ? 'border-emerald-700/50' : feedback === 'incorrect' ? 'border-red-700/50' : 'border-gray-800'
                }`}>
                {/* Mode badge + lesson info */}
                <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border ${meta.bg}`}>
                        <ModeIcon size={12} className={meta.color} /><span className={meta.color}>{meta.label}</span>
                        {currentItem.isAI && <span className="ml-1 text-violet-400">· AI</span>}
                    </span>
                    <span className="text-xs text-gray-600">Lekcia {currentItem.lessonId}: {currentItem.lessonTitle}</span>
                </div>

                {/* ── TRANSLATION / REVERSE / MCQ / DIALOGUE ── */}
                {['translation', 'translation_reverse', 'mcq', 'dialogue'].includes(currentItem.type) && (
                    <div className="flex flex-col flex-1">
                        {/* Blitz timer bar */}
                        {(currentItem.type === 'translation' || currentItem.type === 'translation_reverse') && blitzTime !== null && feedback === null && (
                            <div className="mb-4">
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-gray-500">Čas na odpoveď</span>
                                    <span className={`font-bold ${blitzTime <= 3 ? 'text-red-400' : 'text-amber-400'}`}>{blitzTime}s</span>
                                </div>
                                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full transition-all duration-1000 ${blitzTime <= 3 ? 'bg-red-500' : 'bg-amber-500'}`}
                                        style={{ width: `${(blitzTime / 7) * 100}%` }} />
                                </div>
                            </div>
                        )}

                        <div className="text-center mb-6 flex-1 flex flex-col justify-center">
                            <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">
                                {currentItem.type === 'translation' ? 'Preložte do slovenčiny:' :
                                    currentItem.type === 'translation_reverse' ? 'Preložte do nemčiny:' :
                                        currentItem.type === 'dialogue' ? '💬 Aká je správna odpoveď?' :
                                            'Vyberte správnu odpoveď:'}
                            </p>
                            {currentItem.type === 'dialogue' && (
                                <div className="bg-gray-800/60 rounded-2xl p-4 mb-4 text-left flex items-start gap-3">
                                    <MessageSquare size={18} className="text-teal-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Nemecký partner hovorí:</p>
                                        <p className="text-white font-semibold">{currentItem.prompt}</p>
                                    </div>
                                </div>
                            )}
                            <h2 className={`font-extrabold text-white leading-snug mb-3 ${currentItem.type === 'dialogue' ? 'text-xl' : 'text-3xl sm:text-4xl'}`}>
                                {currentItem.question}
                            </h2>
                            {currentItem.type === 'translation' && currentItem.audio && (
                                <button onClick={() => speak(currentItem.audio)}
                                    className="mx-auto flex items-center gap-2 px-4 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 rounded-full text-indigo-400 text-sm transition-all hover:scale-105">
                                    <Volume2 size={15} /> Počuť výslovnosť
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {currentItem.options.map((opt, i) => {
                                const optVal = typeof opt === 'object' ? opt.de : opt;
                                const isCorrect = typeof opt === 'object' ? opt.correct : opt === currentItem.correct;
                                let cls = 'p-4 rounded-2xl border-2 text-sm font-semibold transition-all text-center ';
                                if (feedback === null) cls += 'bg-gray-800 border-gray-700 text-gray-200 hover:border-indigo-500 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer';
                                else if (isCorrect) cls += 'bg-emerald-900/40 border-emerald-500 text-emerald-300 scale-[1.02]';
                                else cls += 'bg-gray-900 border-gray-800/40 text-gray-600 opacity-40';
                                return (
                                    <button key={i} disabled={feedback !== null} onClick={() => handleMCQ(typeof opt === 'object' ? opt.de : opt)} className={cls}>
                                        {optVal}
                                    </button>
                                );
                            })}
                        </div>

                        {feedback && (
                            <div className={`mt-4 p-3 rounded-xl text-sm font-medium animate-in slide-in-from-bottom-2 ${feedback === 'correct' ? 'bg-emerald-900/30 border border-emerald-800/50 text-emerald-400' : 'bg-red-900/30 border border-red-800/50 text-red-400'}`}>
                                {feedbackMsg}
                                {currentItem.explanation && <p className="text-gray-400 text-xs mt-1">{currentItem.explanation}</p>}
                            </div>
                        )}
                    </div>
                )}

                {/* ── DICTATION ── */}
                {currentItem.type === 'dictation' && (
                    <div className="flex flex-col items-center flex-1 justify-center">
                        <p className="text-xs text-gray-500 uppercase tracking-widest mb-6">Počujte a napíšte po nemecky:</p>
                        <button onClick={() => speak(currentItem.audio)}
                            className="w-20 h-20 bg-sky-600 hover:bg-sky-500 text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(14,165,233,0.4)] hover:scale-105 transition-all mb-2">
                            <Play size={34} className="ml-1" />
                        </button>
                        <p className="text-xs text-gray-600 mb-6">kliknite pre opätovné prehranie</p>
                        <form onSubmit={handleTextSubmit} className="w-full max-w-sm space-y-3">
                            <div className="relative">
                                <Keyboard size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input ref={inputRef} type="text" autoComplete="off" disabled={feedback !== null}
                                    value={textInput} onChange={e => setTextInput(e.target.value)}
                                    placeholder="Napíšte po nemecky…"
                                    className={`w-full bg-gray-800 border-2 rounded-2xl pl-10 pr-4 py-3.5 text-center text-lg text-white font-bold transition-all focus:outline-none
                    ${feedback === null ? 'border-gray-700 focus:border-sky-500' : feedback === 'correct' ? 'border-emerald-500 bg-emerald-900/20 text-emerald-400' : 'border-red-500 bg-red-900/20 text-red-400'}`} />
                            </div>
                            <button type="submit" disabled={feedback !== null || !textInput.trim()}
                                className="w-full py-3 bg-sky-600 hover:bg-sky-500 disabled:bg-gray-700 text-white font-bold rounded-xl transition-all">
                                Skontrolovať
                            </button>
                        </form>
                        {feedback && (
                            <div className={`mt-4 p-3 rounded-xl text-sm font-medium w-full max-w-sm ${feedback === 'correct' ? 'bg-emerald-900/30 border border-emerald-800/50 text-emerald-400' : 'bg-red-900/30 border border-red-800/50 text-red-400'}`}>
                                {feedback === 'correct' ? '✓ Správne!' : `✗ Správne: „${currentItem.correct}"`}
                            </div>
                        )}
                    </div>
                )}

                {/* ── PHONETIC DICTATION ── */}
                {currentItem.type === 'phonetic_dictation' && (
                    <div className="flex flex-col items-center flex-1 justify-center">
                        <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">Vidíte fonetický prepis. Napíšte nemecké slovo:</p>
                        <div className="bg-gray-800/50 rounded-2xl p-6 mb-6 w-full max-w-md text-center">
                            <p className="text-4xl font-extrabold text-cyan-400 font-mono tracking-widest">{currentItem.phoneticText}</p>
                            {currentItem.hint && (
                                <div className="group mt-3">
                                    <span className="text-xs text-gray-500 bg-gray-900 rounded px-2 py-1 select-none flex items-center justify-center gap-1 mx-auto w-max cursor-help transition-colors hover:text-cyan-300">
                                        <HelpCircle size={12} /> Nápoveda (podrž myš)
                                    </span>
                                    <p className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-sm text-cyan-400 mt-2 font-medium">Slovensky: {currentItem.hint}</p>
                                </div>
                            )}
                        </div>
                        <form onSubmit={handleTextSubmit} className="w-full max-w-sm space-y-3">
                            <div className="relative">
                                <Keyboard size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input ref={inputRef} type="text" autoComplete="off" disabled={feedback !== null}
                                    value={textInput} onChange={e => setTextInput(e.target.value)}
                                    placeholder="Nemecké slovo…"
                                    className={`w-full bg-gray-800 border-2 rounded-2xl pl-10 pr-4 py-3.5 text-center text-xl text-white font-bold transition-all focus:outline-none
                    ${feedback === null ? 'border-gray-700 focus:border-cyan-500' : feedback === 'correct' ? 'border-emerald-500 bg-emerald-900/20 text-emerald-400' : 'border-red-500 bg-red-900/20 text-red-400'}`} />
                            </div>
                            <button type="submit" disabled={feedback !== null || !textInput.trim()}
                                className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-700 text-white font-bold rounded-xl transition-all">
                                Skontrolovať
                            </button>
                        </form>
                        {feedback && (
                            <div className={`mt-4 p-3 rounded-xl text-sm font-medium w-full max-w-sm ${feedback === 'correct' ? 'bg-emerald-900/30 border border-emerald-800/50 text-emerald-400' : 'bg-red-900/30 border border-red-800/50 text-red-400'}`}>
                                {feedback === 'correct' ? '✓ Správne!' : `✗ Správne: „${currentItem.correct}"`}
                            </div>
                        )}
                    </div>
                )}

                {/* ── FILL-IN-THE-BLANK ── */}
                {currentItem.type === 'fill' && (
                    <div className="flex flex-col items-center flex-1 justify-center">
                        <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">Doplňte chýbajúce slovo:</p>
                        <div className="bg-gray-800/40 rounded-2xl p-5 mb-5 w-full text-center">
                            <p className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                                {currentItem.sentence.split('___').map((part, i, arr) => (
                                    <span key={i}>{part}{i < arr.length - 1 && (
                                        <span className={`inline-block min-w-[70px] border-b-2 mx-1 align-bottom pb-0.5 ${feedback === null ? 'border-orange-500' : feedback === 'correct' ? 'border-emerald-500 text-emerald-400' : 'border-red-500 text-red-400'}`}>
                                            {feedback !== null ? (feedback === 'correct' ? textInput || currentItem.correct : currentItem.correct) : '\u00a0\u00a0\u00a0\u00a0\u00a0'}
                                        </span>
                                    )}</span>
                                ))}
                            </p>
                        </div>
                        {currentItem.hint && (
                            <div className="group mb-4 text-center">
                                <span className="text-xs text-gray-500 bg-gray-800 rounded px-2 py-1 select-none flex items-center justify-center gap-1 mx-auto w-max cursor-help transition-colors hover:text-orange-300">
                                    <HelpCircle size={12} /> Nápoveda (podrž myš)
                                </span>
                                <p className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-sm text-orange-400 mt-2 font-medium">Nápoveda: {currentItem.hint}</p>
                            </div>
                        )}
                        <form onSubmit={handleTextSubmit} className="w-full max-w-sm space-y-3">
                            <div className="relative">
                                <Keyboard size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input ref={inputRef} type="text" autoComplete="off" disabled={feedback !== null}
                                    value={textInput} onChange={e => setTextInput(e.target.value)} placeholder="Doplňte slovo…"
                                    className={`w-full bg-gray-800 border-2 rounded-2xl pl-10 pr-4 py-3.5 text-center text-lg text-white font-bold transition-all focus:outline-none
                    ${feedback === null ? 'border-gray-700 focus:border-orange-500' : feedback === 'correct' ? 'border-emerald-500 bg-emerald-900/20' : 'border-red-500 bg-red-900/20'}`} />
                            </div>
                            <button type="submit" disabled={feedback !== null || !textInput.trim()}
                                className="w-full py-3 bg-orange-600 hover:bg-orange-500 disabled:bg-gray-700 text-white font-bold rounded-xl transition-all">Skontrolovať</button>
                        </form>
                        {feedback && (
                            <div className={`mt-4 p-3 rounded-xl text-sm font-medium w-full max-w-sm ${feedback === 'correct' ? 'bg-emerald-900/30 border border-emerald-800/50 text-emerald-400' : 'bg-red-900/30 border border-red-800/50 text-red-400'}`}>
                                {feedback === 'correct' ? '✓ Správne!' : `✗ Správne: „${currentItem.correct}"`}
                                {currentItem.explanation && <p className="text-gray-400 text-xs mt-1">{currentItem.explanation}</p>}
                            </div>
                        )}
                    </div>
                )}

                {/* ── WORD ORDER (Real Drag & Drop) ── */}
                {currentItem.type === 'wordorder' && (
                    <div className="flex flex-col flex-1">
                        <p className="text-xs text-gray-500 uppercase tracking-widest mb-1 text-center">Zoraďte slová do správnej vety:</p>
                        {currentItem.hint && (
                            <div className="group mb-3 text-center">
                                <span className="text-xs text-gray-500 bg-gray-800 rounded px-2 py-1 select-none flex items-center justify-center gap-1 mx-auto w-max cursor-help transition-colors hover:text-pink-300">
                                    <HelpCircle size={12} /> Nápoveda (podrž myš)
                                </span>
                                <p className="opacity-0 absolute w-full group-hover:opacity-100 transition-opacity duration-200 text-sm text-pink-400 mt-1 font-medium z-10">({currentItem.hint})</p>
                            </div>
                        )}
                        <p className="text-[10px] text-gray-600 text-center mb-3">kliknite alebo potiahnite (drag & drop)</p>

                        {/* Answer slots drop zone */}
                        <div onDragOver={e => e.preventDefault()} onDrop={onDropSlots}
                            className={`min-h-[64px] border-2 border-dashed rounded-2xl p-3 mb-4 flex flex-wrap gap-2 items-center justify-center transition-all ${feedback === null ? 'border-gray-700 bg-gray-800/30' : feedback === 'correct' ? 'border-emerald-600 bg-emerald-900/20' : 'border-red-600 bg-red-900/10'}`}>
                            {wordSlots.length === 0 && <p className="text-gray-600 text-sm italic">Sem presnúvajte alebo kliknite slová…</p>}
                            {wordSlots.map((word, i) => (
                                <button key={`s${i}`} draggable disabled={feedback !== null}
                                    onDragStart={() => onDragStart(word, 'slot')}
                                    onClick={() => handleWordClickSlot(word)}
                                    className={`px-3 py-2 rounded-xl text-sm font-bold border-2 transition-all hover:scale-105 cursor-grab active:cursor-grabbing ${feedback === null ? 'bg-pink-900/40 border-pink-500/60 text-pink-300 hover:bg-pink-800/50' :
                                        feedback === 'correct' ? 'bg-emerald-900/40 border-emerald-500 text-emerald-300' : 'bg-red-900/40 border-red-500 text-red-300'}`}>
                                    {word}
                                </button>
                            ))}
                        </div>

                        {/* Word bank drop zone */}
                        <div onDragOver={e => e.preventDefault()} onDrop={onDropBank}
                            className="flex flex-wrap gap-2 justify-center mb-5 min-h-[44px] p-2 rounded-xl border border-dashed border-gray-800">
                            {wordBank.map((word, i) => (
                                <button key={`b${i}`} draggable disabled={feedback !== null}
                                    onDragStart={() => onDragStart(word, 'bank')}
                                    onClick={() => handleWordClickBank(word)}
                                    className="px-3 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-pink-500 text-gray-200 rounded-xl text-sm font-semibold transition-all hover:scale-105 cursor-grab active:cursor-grabbing">
                                    {word}
                                </button>
                            ))}
                        </div>

                        <button onClick={handleWordOrderSubmit} disabled={feedback !== null || !wordSlots.length}
                            className="py-3 bg-pink-600 hover:bg-pink-500 disabled:bg-gray-700 text-white font-bold rounded-xl transition-all">
                            Potvrdiť poradie
                        </button>

                        {feedback && (
                            <div className={`mt-4 p-3 rounded-xl text-sm font-medium animate-in slide-in-from-bottom-2 ${feedback === 'correct' ? 'bg-emerald-900/30 border border-emerald-800/50 text-emerald-400' : 'bg-red-900/30 border border-red-800/50 text-red-400'}`}>
                                {feedback === 'correct' ? '✓ Výborný slovosled!' : <span>✗ Správne: <strong className="text-white">„{currentItem.correct}"</strong></span>}
                                {currentItem.explanation && feedback === 'incorrect' && <p className="text-gray-400 text-xs mt-1">{currentItem.explanation}</p>}
                            </div>
                        )}
                    </div>
                )}

                {/* ── SPEECH with word-level diff ── */}
                {currentItem.type === 'speech' && (
                    <div className="flex flex-col items-center flex-1 justify-center text-center">
                        <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">Prečítajte nahlas po nemecky:</p>
                        <div className="bg-gray-800/50 rounded-2xl p-5 mb-4 w-full max-w-lg">
                            <p className="text-3xl sm:text-4xl font-extrabold text-white mb-2">{currentItem.text}</p>
                            <p className="text-gray-400 font-medium">{currentItem.sk}</p>
                        </div>
                        <button onClick={() => speak(currentItem.text)}
                            className="mb-5 flex items-center gap-2 px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-full text-emerald-400 text-sm transition-all hover:scale-105">
                            <Volume2 size={15} /> Počuť príklad
                        </button>

                        {!SpeechRecognition.browserSupportsSpeechRecognition() ? (
                            <p className="text-amber-400 text-sm bg-amber-900/20 p-3 rounded-xl max-w-sm">⚠️ Váš prehliadač nepodporuje rozpoznávanie reči. Skúste Chrome.</p>
                        ) : (
                            <div className="flex flex-col items-center gap-4">
                                <button onClick={toggleListening}
                                    disabled={feedback !== null}
                                    className={`w-24 h-24 rounded-full flex items-center justify-center transition-all select-none text-white ${listening ? 'bg-red-500 animate-pulse shadow-[0_0_50px_rgba(239,68,68,0.7)] scale-110' :
                                        feedback !== null ? 'bg-gray-800 text-gray-600' :
                                            'bg-emerald-600 hover:bg-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:scale-105'}`}>
                                    <Mic size={40} />
                                </button>

                                {!listening && feedback === null && <p className="text-gray-500 text-sm">Kliknite a hovorte</p>}
                                {listening && <p className="text-red-400 font-bold text-sm animate-pulse">🎤 Načúvam… kliknite pre vyhodnotenie</p>}

                                {/* Word-level diff feedback */}
                                {feedback && wordDiffResult && (
                                    <div className="mt-2 text-center">
                                        <p className="text-xs text-gray-500 mb-2">Slovo po slove analýza:</p>
                                        <div className="flex flex-wrap gap-1.5 justify-center">
                                            {wordDiffResult.map((w, i) => (
                                                <span key={i} className={`px-2 py-1 rounded-lg text-sm font-bold ${w.ok ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-700' : 'bg-red-900/40 text-red-300 border border-red-700'}`}>
                                                    {w.ok ? '✓' : '✗'} {w.word}
                                                </span>
                                            ))}
                                        </div>
                                        {transcript && <p className="text-xs text-gray-500 mt-2 italic">Rozpoznané: „{transcript}"</p>}
                                    </div>
                                )}

                                {feedback === 'correct' && !wordDiffResult && (
                                    <p className="text-emerald-400 font-bold flex items-center gap-2"><CheckCircle2 size={18} /> Výborná výslovnosť!</p>
                                )}
                                {feedback === 'incorrect' && !wordDiffResult && (
                                    <p className="text-red-400 font-bold flex items-center gap-2"><XCircle size={18} /> Skúste znova nabudúce.</p>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
