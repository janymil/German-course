import React, { useState, useEffect, useMemo } from 'react';
import { LESSONS } from '../data/curriculum';
import { BookOpen, Volume2, Search, Zap, Lock, CheckCircle, ArrowRight, Bookmark, ArrowLeft, RefreshCw, ChevronRight, Printer, Bot, X, Loader2 } from 'lucide-react';
import { useTTS } from '../hooks/useTTS';
import { useProgress } from '../hooks/useProgress';
import { GenderText } from '../utils/genderColors';

import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Mic } from 'lucide-react';

function GrammarDrill({ rule, lesson }) {
  const { progress, saveGrammarAiMemory, clearGrammarAiMemory } = useProgress();
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [key, setKey] = useState(0);
  const seenIndicesRef = React.useRef(new Set());

  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const transcriptRef = React.useRef('');
  useEffect(() => { transcriptRef.current = transcript; }, [transcript]);
  const [speechResult, setSpeechResult] = useState(null);

  useEffect(() => {
    if (lesson?.isCustom_AI) {
      if (lesson.exercises?.length) {
        // Prekonvertujeme AI cvičenia na bezpečný formát (ak prichádzajú surové so starým kľúčom alebo s correct_answer)
        let qs = lesson.exercises.map((ex, index) => {
          if (ex.correct_answer && ex.distractors) {
            const options = [...ex.distractors];
            const correctPos = Math.floor(Math.random() * (options.length + 1));
            options.splice(correctPos, 0, ex.correct_answer);
            return { type: ex.type || 'mcq', question: ex.question, options: options, answer: correctPos, explanation: ex.explanation, originalIndex: index };
          }
          return { ...ex, originalIndex: index };
        });

        // Systém trvalej pamäte pre aktuálneho (zatiaľ lokálneho) používateľa
        const storageKey = `seen_ai_exercises_${lesson?.id || rule?.id || 'unknown'}`;
        let savedSeen = progress?.grammarAiSeen?.[storageKey] || [];

        // Zlúčime memory z predchádzajúcich relácií s aktuálnou pamäťou pre istotu
        const seenSet = new Set([...savedSeen, ...seenIndicesRef.current]);

        // Náhodný výber nevidených cvičení
        let unseen = qs.filter(ex => !seenSet.has(ex.originalIndex));

        // Ak sme vyčerpali všetky, urobíme "Hard Reset" pamäti daného pravidla
        if (unseen.length === 0) {
          seenSet.clear();
          clearGrammarAiMemory(storageKey);
          unseen = [...qs];
        }

        // Náhodne premiešame nevidené cvičenia
        for (let i = unseen.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [unseen[i], unseen[j]] = [unseen[j], unseen[i]];
        }

        // Zoberieme maximálne 12 nevidených cvičení
        const selectedChunk = unseen.slice(0, 12);

        // Uložíme ich do trvalej pamäte, aby po reštarte servera nevyskočili znova
        selectedChunk.forEach(ex => seenSet.add(ex.originalIndex));
        seenIndicesRef.current = seenSet;
        saveGrammarAiMemory(storageKey, [...seenSet]);

        setQuestions(selectedChunk);
        setCurrent(0);
        setSelected(null);
        setScore(0);
        setDone(false);
        setSpeechResult(null);
      }
      return;
    }

    const qs = [];
    const sourceExercises = rule?.grammarNote?.exercises || lesson?.exercises || [];

    const mcqEx = sourceExercises.find((e) => e.type === 'mcq');
    const fillEx = sourceExercises.find((e) => e.type === 'fill');
    const speakEx = sourceExercises.find((e) => e.type === 'speaking');

    if (mcqEx?.questions) {
      mcqEx.questions.slice(0, 3).forEach((q) => {
        qs.push({ type: 'mcq', question: q.question, options: q.options, answer: q.answer });
      });
    }

    if (fillEx?.questions) {
      const fillQs = fillEx.questions;
      const allAnswers = fillQs.map((q) => q.answer);
      const want = Math.max(0, Math.min(3, 8 - qs.length));
      fillQs.slice(0, want).forEach((q, i) => {
        const distractors = allAnswers.filter((a, idx) => idx !== i && a !== q.answer);
        const pool = [];
        for (let j = 0; pool.length < 3; j++) {
          if (j < distractors.length) pool.push(distractors[j]);
          else pool.push('—');
        }
        const correctPos = Math.floor(Math.random() * 4);
        const opts = [...pool];
        opts.splice(correctPos, 0, q.answer);
        qs.push({ type: 'fill', question: q.sentence, options: opts, answer: correctPos });
      });
    }

    if (speakEx?.phrases) {
      // Add one or two speaking exercises if available
      speakEx.phrases.slice(0, 2).forEach(p => {
        qs.push({ type: 'speech', de: p.de, sk: p.sk, tip: p.tip });
      });
    }

    // shuffle
    for (let i = qs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [qs[i], qs[j]] = [qs[j], qs[i]];
    }

    setQuestions(qs.slice(0, lesson?.isCustom_AI ? 12 : 5));
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setDone(false);
    setSpeechResult(null);
  }, [lesson?.id, rule?.id, key, lesson?.exercises?.length]);

  if (questions.length === 0) {
    return (
      <div className="p-6 bg-gray-900/50 rounded-2xl border border-gray-800/80 text-center text-gray-500">
        <p>Pre toto pravidlo nemáme oddelený minikvíz. Pokračuj v hlavných lekciách.</p>
      </div>
    );
  }

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="p-8 bg-indigo-900/20 border border-indigo-800/40 rounded-3xl text-center space-y-4">
        <div className="w-20 h-20 mx-auto bg-indigo-500/10 rounded-full flex items-center justify-center border border-indigo-500/20 shadow-lg">
          <Zap size={32} className="text-indigo-400" />
        </div>
        <h3 className="text-2xl font-bold text-white">Gramatika precvičená!</h3>
        <p className="text-gray-300">
          Úspešnosť: <span className="font-bold text-indigo-300 text-lg">{score} z {questions.length}</span> ({pct}%)
        </p>
        <button
          onClick={() => setKey(k => k + 1)}
          className="mt-4 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all inline-flex items-center gap-2"
        >
          <RefreshCw size={18} /> Skúsiť iné cvičenia
        </button>
      </div>
    );
  }

  const q = questions[current];
  const isAnswered = selected !== null || speechResult !== null;

  const handleSelect = (idx) => {
    if (isAnswered) return;
    setSelected(idx);
    if (idx === q.answer) setScore((s) => s + 1);
  };

  const startListening = () => {
    resetTranscript();
    setSpeechResult(null);
    SpeechRecognition.startListening({ language: 'de-DE', continuous: false });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();

    // Evaluate pronunciation
    setTimeout(() => {
      const norm = (s = '') => s.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').replace(/[^a-z0-9]/g, '');
      const spoken = norm(transcriptRef.current);
      const target = norm(q.de);

      let correctTokens = 0;
      const targetTokens = q.de.toLowerCase().split(/\s+/);
      const spokenTokens = transcriptRef.current.toLowerCase().split(/\s+/).map(norm);

      for (const t of targetTokens) {
        if (spokenTokens.includes(norm(t))) correctTokens++;
      }

      const accuracy = targetTokens.length > 0 ? (correctTokens / targetTokens.length) : 0;

      if (accuracy > 0.6 || spoken.includes(target) || target.includes(spoken)) {
        setSpeechResult('success');
        setScore(s => s + 1);
      } else {
        setSpeechResult('fail');
      }
    }, 500);
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setDone(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setSpeechResult(null);
      resetTranscript();
    }
  };

  return (
    <div className="p-6 sm:p-8 bg-gray-900/80 border border-gray-700/60 rounded-3xl space-y-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-indigo-400 font-bold">
          <Zap size={18} />
          Multifunkčný Kvíz ({current + 1} / {questions.length})
        </div>
        <div className="flex gap-1.5">
          {questions.map((_, i) => (
            <div key={i} className={`w-6 sm:w-8 h-1.5 rounded-full ${i < current ? 'bg-indigo-500' : i === current ? 'bg-indigo-400/50' : 'bg-gray-800'}`} />
          ))}
        </div>
      </div>

      {(q.type === 'mcq' || q.type === 'fill') && (
        <>
          <p className="text-lg text-white font-medium leading-relaxed bg-gray-950/50 p-4 rounded-xl border border-gray-800 shadow-inner">
            {q.type === 'fill'
              ? q.question.split('___').map((part, i, arr) => (
                <React.Fragment key={i}>
                  {part}
                  {i < arr.length - 1 && <span className="text-indigo-400 border-b-2 border-indigo-400/50 font-bold px-2 inline-block translate-y-1 w-16 text-center">?</span>}
                </React.Fragment>
              ))
              : q.question}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {q.options.map((opt, idx) => {
              let cls = 'w-full text-left px-5 py-3.5 rounded-xl font-medium text-sm transition-all border duration-200 ';
              if (!isAnswered) {
                cls += 'bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700 hover:border-indigo-500/50 hover:shadow-md cursor-pointer';
              } else if (idx === q.answer) {
                cls += 'bg-emerald-900/50 border-emerald-500 text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.2)]';
              } else if (idx === selected) {
                cls += 'bg-red-900/30 border-red-500/50 text-red-300';
              } else {
                cls += 'bg-gray-900/50 border-gray-800/50 text-gray-600';
              }
              return (
                <button key={idx} className={cls} onClick={() => handleSelect(idx)} disabled={isAnswered}>
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border text-xs font-bold flex-shrink-0
                          ${isAnswered && idx === q.answer ? 'bg-emerald-500 text-white border-emerald-400' :
                        isAnswered && idx === selected ? 'bg-red-500 text-white border-red-400' :
                          'bg-gray-700 text-gray-400 border-gray-600'}`}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span>{opt}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}

      {q.type === 'speech' && (
        <div className="text-center space-y-6">
          <div className="bg-gray-950/50 p-6 rounded-2xl border border-gray-800 shadow-inner">
            <p className="text-sm text-gray-400 mb-2 uppercase tracking-wider font-bold">Vyslovte do mikrofónu:</p>
            <p className="text-2xl font-extrabold text-white mb-2">{q.de}</p>
            <p className="text-indigo-400">{q.sk}</p>
            {q.tip && <p className="text-xs text-amber-500/80 mt-4 bg-amber-500/10 inline-block px-3 py-1 rounded-full border border-amber-500/20">{q.tip}</p>}
          </div>

          {!SpeechRecognition.browserSupportsSpeechRecognition() ? (
            <p className="text-red-400 text-sm">Váš prehliadač nepodporuje rozpoznávanie reči. Povoľte ju v Chrome.</p>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <button
                onMouseDown={startListening}
                onMouseUp={stopListening}
                onTouchStart={startListening}
                onTouchEnd={stopListening}
                disabled={isAnswered}
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${listening ? 'bg-red-500 animate-pulse shadow-[0_0_30px_rgba(239,68,68,0.5)]' :
                  isAnswered ? 'bg-gray-800 text-gray-600' :
                    'bg-indigo-600 hover:bg-indigo-500 shadow-lg hover:scale-105'
                  } text-white`}
              >
                <Mic size={32} />
              </button>
              <p className="text-gray-400 text-sm">{listening ? 'Počúvam...' : isAnswered ? 'Vyhodnotené' : 'Zadžte tlačidlo a hovorte'}</p>

              {transcript && (
                <p className="text-lg text-white font-serif italic bg-gray-900 px-4 py-2 rounded-xl">"{transcript}"</p>
              )}

              {speechResult === 'success' && <p className="text-emerald-400 font-bold bg-emerald-500/10 px-4 py-2 rounded-xl">Skvelá výslovnosť! +1 bod</p>}
              {speechResult === 'fail' && <p className="text-red-400 font-bold bg-red-500/10 px-4 py-2 rounded-xl">To nebolo celkom presné. Máme: "{transcript}"</p>}
            </div>
          )}
        </div>
      )}

      {/* FEEDBACK A VYSVETLENIE */}
      {isAnswered && (
        <div className={`mt-6 p-5 rounded-2xl border flex items-start gap-4 transition-all animate-fade-in ${(selected !== null && selected === q.answer) || speechResult === 'success' ? 'bg-emerald-950/40 border-emerald-800' : 'bg-red-950/40 border-red-800'}`}>
          <div className="mt-1">
            {(selected !== null && selected === q.answer) || speechResult === 'success'
              ? <CheckCircle className="text-emerald-500" size={24} />
              : <X className="text-red-500" size={24} />}
          </div>
          <div className="flex-1">
            <h4 className={`text-lg font-bold mb-1 ${(selected !== null && selected === q.answer) || speechResult === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
              {(selected !== null && selected === q.answer) || speechResult === 'success' ? 'Správne!' : 'Nesprávne!'}
            </h4>
            {q.explanation && (
              <p className="text-gray-300 text-sm leading-relaxed">{q.explanation}</p>
            )}
            {!q.explanation && q.type !== 'speech' && selected !== null && selected !== q.answer && q.options && q.options[q.answer] && (
              <p className="text-gray-300 text-sm leading-relaxed">
                Správna odpoveď bola: <b>{q.options[q.answer]}</b>.
              </p>
            )}
          </div>
        </div>
      )}

      <div className={`transition-all duration-300 overflow-hidden ${isAnswered ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
        <button
          onClick={handleNext}
          className="w-full mt-4 py-3.5 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-xl transition-all border border-gray-700 flex items-center justify-center gap-2"
        >
          {current + 1 >= questions.length ? 'Zobraziť výsledok' : 'Ďalšie cvičenie'} <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default function GrammarGuide({ progress }) {
  const { speak } = useTTS();
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [aiExercises, setAiExercises] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);

  // Compute unlock status using Dashboard identical logic
  const completedLessons = progress?.completedLessons || {};

  // Fetch AI exercises — check KB first, fall back to legacy grammarbank
  useEffect(() => {
    fetch('/api/kb/stats')
      .then(() => {
        // KB is available — load all grammar exercises from it
        return fetch(`http://${window.location.hostname}:5173/api/grammarbank`);
      })
      .then(res => res.json())
      .then(legacyData => {
        // Build a map from ruleId → items using legacy grammarbank as seed
        // KB lookup per-rule happens lazily in handleGenerateAI
        if (legacyData && typeof legacyData === 'object') {
          setAiExercises(legacyData);
        }
      })
      .catch(() => {
        // Fall back to just legacy grammarbank
        fetch(`http://${window.location.hostname}:5173/api/grammarbank`)
          .then(res => res.json())
          .then(data => { if (data && typeof data === 'object') setAiExercises(data); })
          .catch(() => { });
      });
  }, []);

  const rules = useMemo(() => {
    const list = [];
    LESSONS.forEach((lesson) => {
      let gNotes = lesson.grammarNotes;
      if (!gNotes && lesson.grammarNote) {
        // Fallback for older lessons
        gNotes = [{ ...lesson.grammarNote, id: `L${lesson.id}_G1` }];
      } else if (!gNotes) return;

      gNotes.forEach((gn) => {
        const done = !!completedLessons[lesson.id];
        const globalIdx = LESSONS.findIndex(l => l.id === lesson.id);
        const prevLessonDone = globalIdx === 0 || !!completedLessons[LESSONS[globalIdx - 1]?.id];
        const placementUnlocked = lesson.id <= (progress?.placementUnlockedUpTo || 0);
        const available = done || prevLessonDone || placementUnlocked;

        list.push({
          ...lesson,
          id: gn.id || `${lesson.id}_${gn.rule}`, // Use grammar rule specific ID
          lessonId: lesson.id,
          grammarNote: gn, // The current rule object
          isUnlocked: available || done,
          isDone: done
        });
      });
    });
    return list;
  }, [completedLessons, progress?.placementUnlockedUpTo]);

  // Set default selection
  useEffect(() => {
    if (!selectedId && rules.length > 0) {
      // pick first unlocked
      const activeItem = rules.slice().reverse().find(r => r.isUnlocked) || rules[0];
      if (activeItem) setSelectedId(activeItem.id);
    }
  }, [rules, selectedId]);

  const filtered = rules.filter((l) => {
    const q = search.toLowerCase();
    return (
      !q ||
      (l.grammarNote?.rule || '').toLowerCase().includes(q) ||
      (l.grammarNote?.explanation || '').toLowerCase().includes(q) ||
      (l.title || '').toLowerCase().includes(q)
    );
  });

  const selectedRule = rules.find((r) => r.id === selectedId);
  const currentAiItems = aiExercises[selectedId] || [];

  const handleGenerateAI = async () => {
    if (!selectedRule) return;

    // Attempt .env key first, then fallback to local storage
    const key = import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('gemini_api_key') || '';

    if (!key) {
      alert("Chýba Gemini kľúč. Nastavte ho v .env súbore ako VITE_GEMINI_API_KEY alebo si ho stiahnite z Google AI Studia.");
      return;
    }
    setIsGenerating(true);
    const system = `Si elitný nemecký lingvista a didaktik (špecialista na metodiku študentov úrovne A1) v inštitútoch ako Hueber alebo Goethe.
Vytvoríš PRESNE 12 (ani viac, ani menej) UNIKÁTNYCH cvičení striktne zameraných na toto gramatické pravidlo:
Pravidlo: "${selectedRule.grammarNote.rule}"
Vysvetlenie: "${selectedRule.grammarNote.explanation.replace(/<[^>]*>?/gm, '')}"

ABSOLÚTNE KRITICKÉ PRAVIDLÁ PRE MAXIMÁLNU KVALITU:
1. 100% ČISTÁ NEMČINA: Samotná veta (question), správna odpoveď (correct_answer) aj nesprávne možnosti (distractors) MUSIA byť VYLUČNE v nemeckom jazyku! Je prísne zakázané miešať do nemeckej vety slovenské slová (napr. nikdy nepoužívaj slovenské "Ja" namiesto nemeckého "Ich"). Jediný povolený slovenský text je vo vlastnosti "explanation".
2. ZABER Z KVALITNEJ A1 ZÁSOBY: Preukáž kreativitu hodnú Goethe Inštitútu! Vytvor 12 rôznorodých viet s rôznym kontextom (jedlo, rodina, práca, vek, cestovanie, vlastnosti). Neopakuj tie isté slová ani tie isté vety dookola.
3. SÚSTREDENIE NA GRAMATICKÝ JAV: Doplňovačka ("___") a možnosti, z ktorých sa vyberá, sa musia týkať VÝHRADNE javu popísaného v Pravidle a Vysvetlení! Testuj len a presne to, čo dovoľuje pravidlo.
4. GRAMATICKÁ PRESNOSŤ VET: Správna možnosť ("correct_answer") po dosadení do "___" musí dať gramaticky dokonalú a prirodzenú nemeckú vetu na úrovni A1.
5. EDUKAČNÉ VYSVETLENIE: Ku každému cvičeniu PRIDAJ parameter "explanation", čo je 1 slovenská veta vysvetľujúca, prečo je táto konkrétna odpoveď správna z hľadiska doplňovaného gramatického javu.

ODPOVEDAJ VÝHRADNE JSON POĽOM (bez textovok okolo) s presne 12 cvičeniami. Je zakázané pridať do odpovede akýkoľvek iný text!
NEVRACAJ VLASTNOSŤ "answer"! VRACAJ VLASTNOSŤ "correct_answer" ako string a "distractors" ako pole 3 nesprávnych stringov.
ŠTRUKTÚRA KAŽDÉHO OBJEKTU:
{
  "type": "mcq", 
  "question": "Nemecká veta so slovom ___ uprostred.", 
  "correct_answer": "SPRÁVNE_NEMECKÉ_SLOVO", 
  "distractors": ["nesprávne1", "nesprávne2", "nesprávne3"], 
  "explanation": "Slovenské vysvetlenie..."
}
(Typ môže byť "mcq" alebo "fill".)`;

    try {
      const requestBody = {
        systemInstruction: { parts: [{ text: system }] },
        contents: [{ role: "user", parts: [{ text: "Vygeneruj cvičenia podľa tvojich systémových inštrukcií." }] }],
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 3000,
          responseMimeType: "application/json"
        }
      };

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${key}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error("Gemini API Error:", res.status, errText);
        alert(`Gemini API Error (${res.status}): ${errText}`);
        setIsGenerating(false);
        return;
      }

      const data = await res.json();

      // Track usage
      const usage = data?.usageMetadata;
      if (usage) {
        try {
          fetch('/api/stats', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ model: 'gemini-2.5-flash-lite', type: 'inputTokens', amount: usage.promptTokenCount || 0 }) }).catch(() => { });
          fetch('/api/stats', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ model: 'gemini-2.5-flash-lite', type: 'outputTokens', amount: usage.candidatesTokenCount || 0 }) }).catch(() => { });
          fetch('/api/stats', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ model: 'gemini-2.5-flash-lite', type: 'calls', amount: 1 }) }).catch(() => { });
        } catch (e) { }
      }

      const raw = data.candidates[0].content.parts[0].text.trim().replace(/```json|```/g, '');
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) {
        // Prekonvertujeme AI 'correct_answer' a 'distractors' na bezpečný vnútorný format aplikácie (options + answer_index)
        const safeExercises = arr.map(ex => {
          if (ex.correct_answer && ex.distractors) {
            const options = [...ex.distractors];
            // Náhodná pozícia pre správnu odpoveď (0 až dĺžka poľa distractors)
            const correctPos = Math.floor(Math.random() * (options.length + 1));
            options.splice(correctPos, 0, ex.correct_answer);
            return {
              type: ex.type || 'mcq',
              question: ex.question,
              options: options,
              answer: correctPos,
              explanation: ex.explanation
            };
          }
          return ex; // fallback ak by model predsa vrátil starý formát
        });

        const allExercisesForRule = [...(aiExercises[selectedRule.id] || []), ...safeExercises];

        // Save to Knowledge Base (upsert — accumulated over time)
        fetch('/api/kb', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'grammar_exercises',
            key: `grammar::${selectedRule.id}`,
            input: { ruleId: selectedRule.id },
            output: allExercisesForRule,
            model: 'gemini-2.5-flash-lite',
            sourceApp: 'grammar_guide',
            upsert: true
          })
        }).catch(() => {});

        // Also write to legacy grammarbank for backward compatibility
        await fetch(`http://${window.location.hostname}:5173/api/grammarbank`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ruleId: selectedRule.id, items: safeExercises })
        });
        setAiExercises(prev => ({ ...prev, [selectedRule.id]: allExercisesForRule }));
      }
    } catch (e) {
      console.error("Try/Catch Error:", e);
      alert("Nastala chyba pri spojení s Gemini: " + e.message);
    }
    setIsGenerating(false);
  };

  const handleDownloadPDF = () => {
    if (!selectedRule) return;
    const title = `Gramatika: ${selectedRule.grammarNote.rule}`;
    let html = `<html><head><title>${title}</title><meta charset="utf-8">
      <style>
         body { font-family: sans-serif; padding: 20px; color: #333; max-width: 800px; margin: 0 auto; line-height: 1.6; }
         h1 { text-align: center; border-bottom: 2px solid #ccc; padding-bottom: 10px; color: #111; }
         h2 { text-transform: uppercase; font-size: 14px; color: #555; background: #eee; padding: 5px; margin-top: 30px; }
         .explanation { font-size: 16px; margin: 20px 0; }
         .explanation p { margin-bottom: 10px; }
         .explanation ul { padding-left: 20px; }
         .explanation li { margin-bottom: 5px; }
         .exercise-box { border: 1px solid #ccc; padding: 15px; border-radius: 8px; margin-bottom: 15px; page-break-inside: avoid; }
         .type { font-size: 10px; color: #888; text-transform: uppercase; font-weight: bold; }
         .question { font-size: 16px; font-weight: bold; margin: 8px 0; }
         .options { margin: 8px 0; font-size: 14px; }
         .options div { margin-bottom: 4px; }
         .btn-print { margin: 20px auto; display: block; padding: 10px 20px; background: #4f46e5; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
         @media print { .no-print { display: none; } body { padding: 0; } }
      </style></head><body>
      <div class="no-print" style="text-align:center;">
          <button class="btn-print" onclick="window.print()">Vytlačiť do PDF</button>
      </div>
      <h1>${selectedRule.grammarNote.rule}</h1>
      <div class="explanation">
         ${selectedRule.grammarNote.explanation}
      </div>
    `;

    if (selectedRule.grammarNote.examples?.length > 0) {
      html += `<h2>Príklady z praxe</h2>`;
      selectedRule.grammarNote.examples.forEach(ex => {
        html += `<p><b>${ex.de}</b><br><span style="color:#666;">${ex.sk}</span></p>`;
      });
    }

    const hasAI = currentAiItems.length > 0;
    html += `<h2>Praktické cvičenia ${hasAI ? '(Umelá inteligencia)' : '(Základné)'}</h2>`;

    if (hasAI) {
      currentAiItems.forEach((q, i) => {
        html += `<div class="exercise-box">
             <div class="type">AI Otázka ${i + 1} | ${q.type === 'mcq' ? 'Vyber správnu možnosť' : 'Doplňovačka'}</div>
             <div class="question">${q.question.replace('___', '__________')}</div>
             <div class="options">
                ${q.options?.map((opt, idx) => `<div>${String.fromCharCode(65 + idx)}) ${opt}</div>`).join('') || ''}
             </div>
             <div style="font-size:12px;color:#888;margin-top:10px;">Správna odpoveď: ${String.fromCharCode(65 + q.answer)} (${q.options?.[q.answer] || ''})</div>
           </div>`;
      });
    } else {
      const sr = selectedRule.grammarNote.exercises || LESSONS.find(l => l.id === selectedRule.lessonId)?.exercises || [];
      const mcq = sr.find(e => e.type === 'mcq')?.questions || [];
      const fill = sr.find(e => e.type === 'fill')?.questions || [];
      const combined = [...mcq, ...fill];

      if (combined.length > 0) {
        html += `<div style="color: #666; font-style: italic; margin-bottom: 15px;">Vygenerujte si dodatočné cvičenia pomocou AI pre vybudovanie komplexnejšieho pracovného listu! Nateraz ponúkame základné:</div>`;
        combined.forEach((q, i) => {
          html += `<div class="exercise-box">
                     <div class="type">Základná otázka ${i + 1}</div>
                     <div class="question">${q.question || q.sentence}</div>
                     <div class="options">
                         ${q.options ? q.options.map((opt, idx) => `<div>${String.fromCharCode(65 + idx)}) ${opt}</div>`).join('') : ''}
                     </div>
                 </div>`;
        });
      } else {
        html += `<p style="color: #666; font-style: italic;">Žiadne dostupné cvičenia. Vygenerujte si cvičenia pomocou AI a následne si ich vytlačte.</p>`;
      }
    }

    html += `</body></html>`;

    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(html);
      newWindow.document.close();
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col h-[calc(100vh-6rem)] relative">

      {/* Header */}
      <div className="flex-shrink-0 mb-6 px-4">
        <h2 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <BookOpen size={28} className="text-indigo-400" /> Gramatická Encyklopédia
        </h2>
        <p className="text-gray-400 text-sm mt-1">Prezeraj si detailne pravidlá, precvičuj cvičenia, ukladaj si vzorce.</p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0 px-4 pb-6">

        {/* Left Sidebar - List of Grammars */}
        <div className="w-full md:w-1/3 flex flex-col gap-4 flex-shrink-0 max-h-[40vh] md:max-h-none h-full bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-sm">

          <div className="p-4 border-b border-gray-800 bg-gray-950/30">
            <div className="relative">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Hľadaj tému (napr. Akuzatív, Modálne...)"
                className="w-full bg-gray-900 border border-gray-700/80 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:bg-gray-800 transition-all shadow-inner"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {filtered.map((lesson) => {
              const isActive = selectedId === lesson.id;

              if (!lesson.isUnlocked) {
                return (
                  <div key={lesson.id} className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-800/40 bg-gray-900/30 opacity-60">
                    <div className="w-8 h-8 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center flex-shrink-0">
                      <Lock size={14} className="text-gray-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-500 truncate">{lesson.grammarNote.rule}</p>
                      <p className="text-[11px] text-gray-600 truncate">{lesson.title}</p>
                    </div>
                  </div>
                );
              }

              return (
                <button
                  key={lesson.id}
                  onClick={() => setSelectedId(lesson.id)}
                  className={`w-full text-left flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-200 group
                      ${isActive
                      ? 'bg-indigo-900/40 border-indigo-700/50 shadow-md transform scale-[1.02]'
                      : 'bg-gray-800/40 border-gray-700/50 hover:bg-gray-800 hover:border-gray-600'}`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors
                      ${isActive ? 'bg-indigo-500 text-white shadow-inner' : lesson.isDone ? 'bg-emerald-900/50 text-emerald-400 border border-emerald-800' : 'bg-gray-700 text-gray-300'}`}>
                    {lesson.isDone ? <CheckCircle size={16} /> : <Bookmark size={14} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-bold truncate ${isActive ? 'text-indigo-100' : 'text-gray-200'}`}>
                      {lesson.grammarNote.rule}
                    </p>
                    <p className={`text-[11px] font-medium truncate ${isActive ? 'text-indigo-300/80' : 'text-gray-500'}`}>
                      {lesson.grammarNote.category || 'Gramatika A1'}
                    </p>
                  </div>
                  {isActive && <ChevronRight size={18} className="text-indigo-400 flex-shrink-0" />}
                </button>
              );
            })}

            {filtered.length === 0 && (
              <div className="text-center py-12 px-4">
                <Search size={32} className="mx-auto text-gray-700 mb-3" />
                <p className="text-gray-400 font-medium">Nenašli sme žiadne pravidlo pre "{search}"</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Detail Pane */}
        <div className="w-full md:w-2/3 h-full bg-gray-900 border border-gray-800 rounded-3xl overflow-y-auto shadow-sm relative">

          {/* Floating glow behind header */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-indigo-900/20 to-transparent pointer-events-none"></div>

          {selectedRule ? (
            <div className="p-6 sm:p-10 pb-20 relative z-10 max-w-4xl mx-auto">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg text-xs font-bold uppercase tracking-wider">
                    {selectedRule.grammarNote.category || 'Gramatika A1'}
                  </span>
                  {selectedRule.isDone && (
                    <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-xs font-bold uppercase flex items-center gap-1">
                      <CheckCircle size={12} /> Náučené
                    </span>
                  )}
                  <button
                    onClick={handleDownloadPDF}
                    className="ml-auto flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-xs font-bold border border-gray-700 hover:text-white transition-colors shadow-sm"
                  >
                    <Printer size={14} /> Tlačiť do PDF
                  </button>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">{selectedRule.grammarNote.rule}</h1>

                <div
                  className="text-base text-gray-300 leading-relaxed max-w-2xl bg-gray-800/40 p-5 rounded-2xl border border-gray-700/50 shadow-inner grammar-rich-text"
                  dangerouslySetInnerHTML={{ __html: selectedRule.grammarNote.explanation }}
                />
              </div>

              <div className="space-y-10">

                {/* Examples Block */}
                {selectedRule.grammarNote?.examples && selectedRule.grammarNote.examples.length > 0 && (
                  <section>
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 border-b border-gray-800 pb-2">
                      <Volume2 size={20} className="text-indigo-400" />
                      Príklady z praxe
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedRule.grammarNote.examples.map((ex, i) => (
                        <button
                          key={i}
                          onClick={() => speak(ex.de)}
                          className="group text-left p-4 bg-gray-800/30 hover:bg-indigo-950/30 rounded-2xl border border-gray-800 hover:border-indigo-600/40 transition-all flex flex-col gap-2 relative overflow-hidden"
                        >
                          <div className="absolute right-3 top-3 w-8 h-8 rounded-full bg-gray-800 group-hover:bg-indigo-500 text-gray-500 group-hover:text-white flex items-center justify-center transition-colors shadow-sm">
                            <Volume2 size={16} />
                          </div>
                          <p className="text-white font-bold text-base pr-8"><GenderText text={ex.de} /></p>
                          <p className="text-gray-400 text-sm">{ex.sk}</p>
                        </button>
                      ))}
                    </div>
                  </section>
                )}

                {/* Alphabet Table (Interactive) */}
                {selectedRule.grammarNote?.alphabetTable && (
                  <section>
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 border-b border-gray-800 pb-2">
                      <Zap size={20} className="text-amber-400" />
                      Interaktívna abeceda (klikni pre výslovnosť)
                    </h3>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                      {selectedRule.grammarNote.alphabetTable.map((item, i) => (
                        <button
                          key={i}
                          onClick={() => speak(`${item.letter}. ${item.example}`)}
                          className="group flex flex-col items-center p-3 bg-gray-800/40 hover:bg-indigo-900/40 border border-gray-700/50 hover:border-indigo-500/50 rounded-xl transition-all shadow-sm"
                        >
                          <span className="text-2xl font-extrabold text-white group-hover:text-indigo-300 transition-colors">{item.letter}</span>
                          <span className="text-xs text-gray-400 mt-1">[{item.name}]</span>
                          <span className="text-[10px] text-gray-500 mt-2 text-center break-words w-full truncate" title={item.example}>{item.example}</span>
                        </button>
                      ))}
                    </div>
                  </section>
                )}

                {/* Phonetic Alphabet */}
                {selectedRule.grammarNote?.phoneticAlphabet && (
                  <section>
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 border-b border-gray-800 pb-2">
                      <BookOpen size={20} className="text-emerald-400" />
                      Hláskovacia abeceda (Telefón)
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                      {selectedRule.grammarNote.phoneticAlphabet.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 bg-gray-800/30 border border-gray-700/30 rounded-lg">
                          <span className="font-bold text-emerald-400 w-6 text-center">{item.letter}</span>
                          <span className="text-sm text-gray-300">wie {item.word}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Digraphs */}
                {selectedRule.grammarNote?.digraphs && (
                  <section>
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 border-b border-gray-800 pb-2">
                      <Zap size={20} className="text-indigo-400" />
                      Špeciálne zvuky (Zložky)
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedRule.grammarNote.digraphs.map((item, i) => (
                        <button key={i} onClick={() => speak(item.example)} className="text-left p-3 flex flex-col bg-gray-800/30 hover:bg-indigo-900/20 border border-gray-700/50 rounded-xl transition-colors">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-extrabold text-lg text-white">{item.combo}</span>
                            <span className="text-indigo-400 font-mono bg-indigo-500/10 px-2 py-0.5 rounded text-sm">{item.sound}</span>
                          </div>
                          <div className="text-sm text-gray-400">Príklad: <span className="text-gray-200 font-bold">{item.example}</span> ({item.sk})</div>
                        </button>
                      ))}
                    </div>
                  </section>
                )}

                {/* Drill Module */}
                <section className="pt-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 border-b border-gray-800 pb-2">
                    <CheckCircle size={20} className="text-emerald-400" />
                    Bleskové otestovanie tohto pravidla
                  </h3>
                  <GrammarDrill rule={selectedRule} lesson={LESSONS.find(l => l.id === selectedRule.lessonId)} />
                  <div className="mt-4 text-center">
                    <button
                      onClick={() => setShowAIModal(true)}
                      className="w-full flex justify-center items-center gap-2 py-3 bg-purple-900/30 hover:bg-purple-800/40 border border-purple-500/40 text-purple-300 rounded-xl font-bold transition-all shadow-sm"
                    >
                      <Bot size={18} className="text-purple-400" />
                      {currentAiItems.length > 0 ? `Ďalšie cvičenia (AI banka: ${currentAiItems.length})` : 'Vygenerovať cvičenia s AI'}
                    </button>
                  </div>
                </section>

                {/* Key Vocabulary of the lesson */}
                <section>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 border-b border-gray-800 pb-2">
                    <Bookmark size={20} className="text-amber-400" />
                    Najdôležitejšie slovíčka z tejto lekcie
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {selectedRule.vocab?.slice(0, 12).map((v) => (
                      <button
                        key={v.de}
                        onClick={() => speak(v.de)}
                        className="group flex items-center gap-2 bg-gray-800/50 hover:bg-amber-950/40 rounded-xl px-3.5 py-2 border border-gray-700/50 hover:border-amber-700/40 transition-all"
                      >
                        <span className="font-bold text-white group-hover:text-amber-100">{v.de}</span>
                        <span className="text-gray-600 mx-1">—</span>
                        <span className="text-gray-400 text-xs">{v.sk}</span>
                      </button>
                    ))}
                    {selectedRule.vocab?.length > 12 && (
                      <span className="px-3 py-2 text-xs text-gray-500 font-medium">+ ďalších {selectedRule.vocab.length - 12} slov</span>
                    )}
                  </div>
                </section>

              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8 opacity-60">
              <BookOpen size={64} className="text-gray-700 mb-6" />
              <h3 className="text-2xl font-bold text-gray-400 mb-2">Vyberte si pravidlo vľavo</h3>
              <p className="text-gray-500 max-w-sm mx-auto">Sledujete gramatiku z pohľadu učiva, ktoré už máte za sebou. Neodomknuté lekcie sú znázornené zámkom.</p>
            </div>
          )}
        </div>
      </div>

      {/* AI Modal */}
      {showAIModal && selectedRule && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-gray-900 border border-gray-700 shadow-2xl rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-800 bg-gray-950/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                  <Bot className="text-purple-400" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white leading-tight">AI Gramatický Trenér</h3>
                  <p className="text-xs text-purple-400">Pravidlo: {selectedRule.grammarNote.rule}</p>
                </div>
              </div>
              <button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-white transition-colors bg-gray-800 hover:bg-gray-700 p-2 rounded-full">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 flex-1 overflow-y-auto">
              {currentAiItems.length === 0 ? (
                <div className="text-center py-12">
                  <Bot size={48} className="mx-auto text-purple-900/50 mb-4" />
                  <h4 className="text-xl font-bold text-white mb-2">Žiadne AI cvičenia</h4>
                  <p className="text-gray-400 mb-6 max-w-sm mx-auto">Vygenerujte si jedinečné cvičenia ušitú na mieru tomuto pravidlu pomocou nášho AI enginu.</p>
                  <button onClick={handleGenerateAI} disabled={isGenerating} className="btn-primary inline-flex bg-purple-600 hover:bg-purple-500">
                    {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <Zap size={18} />}
                    {isGenerating ? 'Generujem (cca 10s)...' : 'Vygenerovať 12 cvičení'}
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between bg-purple-900/20 border border-purple-500/20 p-4 rounded-xl">
                    <p className="text-sm font-medium text-purple-300">
                      V banke AI cvičení máte {currentAiItems.length} otázok pre toto pravidlo.
                    </p>
                    <button onClick={handleGenerateAI} disabled={isGenerating} className="btn-secondary py-1.5 px-3 text-xs bg-gray-800 border border-gray-700">
                      <RefreshCw size={14} className={isGenerating ? 'animate-spin' : ''} /> {isGenerating ? 'Pridávam...' : 'Pridať ďalších 12'}
                    </button>
                  </div>
                  <GrammarDrill lesson={{ id: selectedRule.id, isCustom_AI: true, exercises: currentAiItems }} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
