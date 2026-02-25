import React, { useState } from 'react';
import { Send, CheckCircle, XCircle, Sparkles, RotateCcw, Key, Lightbulb } from 'lucide-react';
import { checkWriting } from '../../hooks/useAI';

/**
 * WritingChecker — AI-powered free-text German writing exercise.
 * Exercise data shape:
 *   { type: 'writing', prompts: [{ sk: 'Povedz po nemecky: Volám sa Jana.', context: 'Predstavovanie sa' }] }
 */
export default function WritingChecker({ exercise, lesson, onComplete, onOpenAPIKey }) {
  const prompts = exercise.prompts || [];
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [scores, setScores] = useState([]); // track correct/wrong per prompt

  const current = prompts[idx];
  const isLast = idx === prompts.length - 1;

  async function handleCheck() {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await checkWriting({
        userText: input.trim(),
        prompt: current.sk,
        lessonContext: `Lekcia: ${lesson?.title || ''} — ${lesson?.scene || ''}`,
      });
      setResult(res);
      setScores(prev => [...prev, res.correct]);
    } catch (e) {
      if (e.message === 'NO_KEY' || e.message === 'INVALID_KEY') {
        setError('key');
      } else {
        setError('api');
      }
    } finally {
      setLoading(false);
    }
  }

  function handleNext() {
    if (isLast) {
      const correct = [...scores, result?.correct].filter(Boolean).length;
      onComplete?.({ scores: [...scores, result?.correct], correct, total: prompts.length });
    } else {
      setIdx(i => i + 1);
      setInput('');
      setResult(null);
      setError(null);
    }
  }

  function handleRetry() {
    setInput('');
    setResult(null);
    setError(null);
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <Sparkles size={15} className="text-violet-400" />
        <span className="text-xs text-violet-400 font-bold uppercase tracking-wider">AI Writing Check</span>
        <span className="ml-auto text-xs text-gray-600">{idx + 1} / {prompts.length}</span>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1.5">
        {prompts.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all ${
              i < idx ? 'bg-indigo-500' : i === idx ? 'bg-violet-500' : 'bg-gray-800'
            }`}
          />
        ))}
      </div>

      {/* Prompt card */}
      <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-5">
        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">Preložte do nemčiny</p>
        <p className="text-white text-lg font-semibold leading-snug">{current.sk}</p>
        {current.hint && (
          <p className="text-xs text-gray-600 mt-2 flex items-center gap-1">
            <Lightbulb size={11} />
            {current.hint}
          </p>
        )}
      </div>

      {/* Input */}
      {!result && (
        <div className="space-y-3">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleCheck(); } }}
            placeholder="Napíšte po nemecky…"
            rows={3}
            className="w-full bg-gray-800/60 border border-gray-700/60 rounded-2xl px-4 py-3 text-white text-base placeholder-gray-600 focus:outline-none focus:border-violet-600 transition-colors resize-none"
            disabled={loading}
            autoFocus
          />
          <button
            onClick={handleCheck}
            disabled={!input.trim() || loading}
            className={`w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
              loading
                ? 'bg-violet-900/50 text-violet-400 cursor-wait'
                : input.trim()
                ? 'bg-violet-600 hover:bg-violet-500 text-white'
                : 'bg-gray-800 text-gray-600 cursor-not-allowed'
            }`}
          >
            {loading ? (
              <><span className="animate-spin inline-block w-4 h-4 border-2 border-violet-400 border-t-transparent rounded-full" /> AI kontroluje…</>
            ) : (
              <><Send size={15} /> Skontrolovať</>
            )}
          </button>
        </div>
      )}

      {/* Error state */}
      {error === 'key' && (
        <div className="bg-amber-950/40 border border-amber-700/40 rounded-2xl p-4 space-y-3">
          <p className="text-amber-300 text-sm font-semibold flex items-center gap-2">
            <Key size={15} /> Chýba OpenAI API kľúč
          </p>
          <p className="text-amber-400/70 text-xs">Pre AI opravovanie potrebuješ vlastný OpenAI kľúč.</p>
          <button
            onClick={onOpenAPIKey}
            className="w-full py-2.5 rounded-xl bg-amber-700/60 hover:bg-amber-600/60 text-amber-200 text-sm font-semibold transition-all"
          >
            Zadať API kľúč
          </button>
        </div>
      )}

      {error === 'api' && (
        <div className="bg-red-950/40 border border-red-700/40 rounded-2xl p-4 flex items-center justify-between gap-3">
          <p className="text-red-300 text-sm">Chyba pripojenia. Skús znova.</p>
          <button onClick={handleCheck} className="text-xs text-red-400 hover:text-red-300 font-semibold">Retry</button>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className={`rounded-2xl border p-5 space-y-4 ${
          result.correct
            ? 'bg-emerald-950/30 border-emerald-700/40'
            : 'bg-red-950/20 border-red-800/30'
        }`}>
          {/* Verdict */}
          <div className="flex items-center gap-2">
            {result.correct
              ? <CheckCircle size={18} className="text-emerald-400 flex-shrink-0" />
              : <XCircle size={18} className="text-red-400 flex-shrink-0" />
            }
            <span className={`font-bold text-sm ${result.correct ? 'text-emerald-300' : 'text-red-300'}`}>
              {result.correct ? 'Správne!' : 'Nie celkom správne'}
            </span>
          </div>

          {/* User's answer */}
          <div>
            <p className="text-[11px] text-gray-600 font-semibold uppercase tracking-wider mb-1">Tvoja odpoveď</p>
            <p className={`text-sm font-mono ${result.correct ? 'text-emerald-200' : 'text-red-300 line-through opacity-70'}`}>
              {input.trim()}
            </p>
          </div>

          {/* Corrected */}
          {!result.correct && (
            <div>
              <p className="text-[11px] text-gray-600 font-semibold uppercase tracking-wider mb-1">Správne</p>
              <p className="text-sm font-mono text-emerald-200 bg-emerald-950/40 rounded-xl px-3 py-2">{result.corrected}</p>
            </div>
          )}

          {/* Explanation */}
          {result.explanation && (
            <div className="bg-white/5 rounded-xl px-4 py-3">
              <p className="text-xs text-gray-300 leading-relaxed">{result.explanation}</p>
            </div>
          )}

          {/* Tip */}
          {result.tip && (
            <div className="flex items-start gap-2">
              <Lightbulb size={13} className="text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-300/80">{result.tip}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            {!result.correct && (
              <button
                onClick={handleRetry}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-700/50 text-gray-400 text-xs font-semibold hover:text-white hover:border-gray-600 transition-all"
              >
                <RotateCcw size={13} /> Skúsiť znova
              </button>
            )}
            <button
              onClick={handleNext}
              className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all"
            >
              {isLast ? 'Dokončiť cvičenie' : 'Ďalšia veta →'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
