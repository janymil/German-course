/**
 * SpeakingExercise — Professional speaking practice with microphone.
 * 
 * Workflow:
 *   1. User sees Slovak phrase to translate
 *   2. User clicks mic → recording starts, live transcript shown
 *   3. After 3s of silence, recording auto-stops & result is evaluated
 *   4. Feedback panel shows: what user said vs correct answer
 *   5. User clicks "Ďalšia →" to advance (NEVER auto-advance)
 * 
 * Uses native Web Speech API directly for full control.
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, CheckCircle, RefreshCw, ArrowRight, Mic, MicOff, EyeOff, Eye } from 'lucide-react';
import { useTTS } from '../../hooks/useTTS';
import { GenderText } from '../../utils/genderColors';
import { normalizeGerman } from '../../utils/text';

const isMatch = (userText, targetText) => {
  const u = normalizeGerman(userText);
  const t = normalizeGerman(targetText);
  if (!u || !t) return false;
  if (u === t) return true;
  if (u.includes(t) || t.includes(u)) return true;
  // Levenshtein-like: allow 1-2 char difference for short words
  if (t.length <= 5 && Math.abs(u.length - t.length) <= 1) {
    let diffs = 0;
    for (let i = 0; i < Math.min(u.length, t.length); i++) {
      if (u[i] !== t[i]) diffs++;
    }
    if (diffs <= 1) return true;
  }
  return false;
};

// ── Native Speech Recognition Hook ──────────────────────────────────────────
function useNativeSpeechRecognition() {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef(null);
  const finalTranscriptRef = useRef('');
  const silenceTimerRef = useRef(null);
  const intentionalStopRef = useRef(false);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'de-DE';
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      intentionalStopRef.current = false;
    };

    recognition.onresult = (event) => {
      let interim = '';
      let final = '';
      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          final += result[0].transcript;
        } else {
          interim += result[0].transcript;
        }
      }
      finalTranscriptRef.current = final;
      setTranscript(final + interim);

      // Reset silence timer on every new result
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = setTimeout(() => {
        // 3 seconds of silence → auto stop
        intentionalStopRef.current = true;
        recognition.stop();
      }, 3000);
    };

    recognition.onerror = (event) => {
      // 'no-speech' and 'aborted' are not real errors
      if (event.error === 'no-speech' || event.error === 'aborted') return;
      console.warn('Speech recognition error:', event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    };

    recognitionRef.current = recognition;

    return () => {
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      try { recognition.stop(); } catch (e) { /* ignore */ }
    };
  }, []);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) return;
    finalTranscriptRef.current = '';
    setTranscript('');
    try {
      recognitionRef.current.stop();
    } catch (e) { /* not running */ }
    // Small delay to ensure clean restart
    setTimeout(() => {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.warn('Could not start recognition:', e);
      }
    }, 100);
  }, []);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;
    intentionalStopRef.current = true;
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    try { recognitionRef.current.stop(); } catch (e) { /* ignore */ }
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    finalTranscriptRef.current = '';
  }, []);

  return { transcript, isListening, isSupported, startListening, stopListening, resetTranscript };
}

// ── Main Component ──────────────────────────────────────────────────────────
export function SpeakingExercise({ exercise, onComplete }) {
  const { speak, stop, speaking } = useTTS();
  const { transcript, isListening, isSupported, startListening, stopListening, resetTranscript } = useNativeSpeechRecognition();
  const phrases = exercise?.phrases ?? [];

  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState('listen'); // 'listen' | 'result' | 'done'
  const [revealed, setRevealed] = useState(false);
  const [results, setResults] = useState([]);
  const [lastCorrect, setLastCorrect] = useState(false);
  const prevListeningRef = useRef(false);

  const phrase = phrases[idx];
  const total = phrases.length;
  const correctCount = results.filter(Boolean).length;

  // When mic stops → evaluate result (transition from listening=true to false)
  useEffect(() => {
    if (prevListeningRef.current && !isListening && phase === 'listen') {
      // Mic just stopped, and has transcript data to evaluate
      if (transcript.trim()) {
        const correct = isMatch(transcript, phrase.de);
        setLastCorrect(correct);
        setResults(prev => [...prev, correct]);
        setRevealed(true);
        setPhase('result');
        // Play correct pronunciation
        speak(phrase.de, 'de-DE', 0.85);
      }
    }
    prevListeningRef.current = isListening;
  }, [isListening]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopListening();
      stop();
    };
  }, []);

  // ── Handlers ────────────────────────────────────────────────────────────
  function handleMicClick() {
    if (isListening) {
      stopListening();
    } else {
      resetTranscript();
      startListening();
    }
  }

  function handlePlay() {
    if (speaking) stop();
    speak(phrase.de, 'de-DE', 0.85);
  }

  function handleNext() {
    stopListening();
    if (idx + 1 >= total) {
      setPhase('done');
      onComplete(Math.round((results.filter(Boolean).length / total) * 100));
    } else {
      setIdx(idx + 1);
      setPhase('listen');
      setRevealed(false);
      setLastCorrect(false);
      resetTranscript();
    }
  }

  function handleRetry() {
    // Remove last result, go back to listening
    setResults(prev => prev.slice(0, -1));
    setPhase('listen');
    setRevealed(false);
    setLastCorrect(false);
    resetTranscript();
  }

  function handleSkip() {
    stopListening();
    setResults(prev => [...prev, false]);
    setRevealed(true);
    setLastCorrect(false);
    setPhase('result');
  }

  // ── Renders ─────────────────────────────────────────────────────────────
  if (!phrase || total === 0) {
    return <div className="text-center text-gray-400 py-10">Žiadne frázy pre toto cvičenie.</div>;
  }

  if (phase === 'done') {
    const score = Math.round((correctCount / total) * 100);
    return (
      <div className="flex flex-col items-center gap-6 py-10">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center max-w-md w-full">
          <Mic className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Hovorenie dokončené!</h2>
          <p className="text-gray-400 mb-6">Zvládol si {correctCount} z {total} fráz</p>
          <div className={`text-5xl font-bold mb-2 ${score >= 80 ? 'text-emerald-400' : score >= 50 ? 'text-amber-400' : 'text-rose-400'}`}>{score}%</div>
          <div className="w-full bg-gray-800 rounded-full h-3 mt-4">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${score >= 80 ? 'bg-emerald-500' : score >= 50 ? 'bg-amber-500' : 'bg-rose-500'}`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 max-w-2xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500 uppercase tracking-widest">Hovorenie na mikrofón</span>
        <span className="text-xs text-gray-500">{idx + 1} / {total}</span>
      </div>

      {/* Progress */}
      <div className="w-full bg-gray-800 rounded-full h-2">
        <div
          className="h-2 rounded-full bg-indigo-500 transition-all duration-300"
          style={{ width: `${(idx / total) * 100}%` }}
        />
      </div>

      {/* Main Card */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col gap-5">

        {/* Context */}
        {phrase.context && (
          <div className="flex items-start gap-2">
            <span className="text-xs text-gray-500 uppercase tracking-wide pt-0.5">Situácia:</span>
            <span className="text-sm text-gray-400 italic">{phrase.context}</span>
          </div>
        )}

        {/* Prompt */}
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Povedz po nemecky:</p>
          <p className="text-xl font-semibold text-white leading-snug">{phrase.sk}</p>
        </div>

        {/* ═══ PHASE: LISTEN ═══ */}
        {phase === 'listen' && (
          <>
            {/* Microphone Area */}
            <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-700 rounded-2xl bg-gray-800/50 mt-2">
              {!isSupported ? (
                <p className="text-rose-400 text-sm text-center">Váš prehliadač nepodporuje mikrofón (použite Chrome).</p>
              ) : (
                <button
                  onClick={handleMicClick}
                  className={`p-6 rounded-full transition-all ${isListening
                    ? 'bg-rose-500/20 text-rose-400 animate-pulse border border-rose-500/50 shadow-[0_0_30px_rgba(239,68,68,0.4)]'
                    : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 hover:scale-105'
                    }`}
                >
                  {isListening ? <MicOff className="w-10 h-10" /> : <Mic className="w-10 h-10" />}
                </button>
              )}

              <p className="text-gray-400 text-sm mt-4 font-medium">
                {isListening ? '🔴 Nahrávam... hovor teraz' : 'Klikni na mikrofón a hovor'}
              </p>

              {/* Live transcript while recording */}
              {transcript && isListening && (
                <div className="mt-4 p-3 rounded-xl w-full text-center bg-gray-950 border border-gray-700">
                  <p className="text-xs text-gray-500 mb-1">Počul som:</p>
                  <p className="text-white font-medium">{transcript}</p>
                </div>
              )}

              {/* After mic auto-stopped but recognition found no match and didn't transition yet */}
              {transcript && !isListening && phase === 'listen' && (
                <div className="mt-4 p-3 rounded-xl w-full text-center bg-rose-950/40 border border-rose-500/50">
                  <p className="text-xs text-rose-400 mb-1">Skús to znova:</p>
                  <p className="text-rose-300 font-medium">{transcript}</p>
                </div>
              )}
            </div>

            {/* Controls Row */}
            <div className="flex items-center justify-between px-1">
              <button
                onClick={() => setRevealed(!revealed)}
                className="text-sm text-gray-400 hover:text-white flex items-center gap-2 transition-colors"
              >
                {revealed ? <EyeOff size={16} /> : <Eye size={16} />}
                {revealed ? 'Skryť' : 'Ukáž nápovedu'}
              </button>

              <button
                onClick={handleSkip}
                className="text-sm text-gray-500 hover:text-rose-400 transition-colors"
              >
                Preskočiť →
              </button>
            </div>

            {/* Revealed German Text */}
            {revealed && (
              <div className="flex flex-col gap-3 animate-fade-in-up">
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
                  <p className="text-2xl font-bold text-white leading-snug"><GenderText text={phrase.de} /></p>
                  {phrase.tip && <p className="text-xs text-yellow-400 mt-2 italic">💡 {phrase.tip}</p>}
                </div>
                <button
                  onClick={handlePlay}
                  disabled={speaking}
                  className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl border font-medium transition-colors ${speaking
                    ? 'bg-indigo-900 border-indigo-700 text-indigo-300 cursor-wait'
                    : 'bg-indigo-800 hover:bg-indigo-700 border-indigo-600 text-white'
                    }`}
                >
                  <Volume2 className={`w-5 h-5 ${speaking ? 'animate-pulse' : ''}`} />
                  {speaking ? 'Prehráva…' : 'Počuj výslovnosť'}
                </button>
              </div>
            )}
          </>
        )}

        {/* ═══ PHASE: RESULT ═══ */}
        {phase === 'result' && (
          <div className="flex flex-col gap-4 animate-fade-in-up">
            {/* Feedback Card */}
            <div className={`rounded-xl p-5 border ${lastCorrect
              ? 'bg-emerald-950/40 border-emerald-700/50'
              : 'bg-rose-950/40 border-rose-700/50'
              }`}>
              <div className="flex items-center gap-2 mb-3">
                {lastCorrect
                  ? <><CheckCircle size={20} className="text-emerald-400" /><span className="text-emerald-400 font-semibold">Správne!</span></>
                  : <><RefreshCw size={20} className="text-rose-400" /><span className="text-rose-400 font-semibold">Takmer...</span></>
                }
              </div>

              {transcript && (
                <div className="mb-3">
                  <p className="text-xs text-gray-500 mb-0.5">Tvoje:</p>
                  <p className={`font-medium ${lastCorrect ? 'text-emerald-300' : 'text-rose-300'}`}>{transcript}</p>
                </div>
              )}

              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-0.5">Správna odpoveď:</p>
                <p className="text-white font-semibold text-lg"><GenderText text={phrase.de} /></p>
              </div>

              {phrase.sk && (
                <p className="text-sm text-gray-400 italic">Preklad: {phrase.sk}</p>
              )}

              <button
                onClick={handlePlay}
                className="flex items-center gap-1 mt-3 text-xs text-indigo-400 hover:text-indigo-300"
              >
                <Volume2 size={14} /> Vypočuť výslovnosť
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {!lastCorrect && (
                <button
                  onClick={handleRetry}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 font-medium transition-colors"
                >
                  <RefreshCw size={18} /> Skúsiť znova
                </button>
              )}
              <button
                autoFocus
                onClick={handleNext}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all ${lastCorrect
                  ? 'flex-1 bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                  : 'flex-1 bg-indigo-600 hover:bg-indigo-500 text-white'
                  }`}
              >
                {idx + 1 < total ? 'Ďalšia →' : 'Dokončiť'}
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer Stats */}
      <div className="flex justify-between text-xs text-gray-600 px-1">
        <span>Zvládnuté: {correctCount}</span>
        <span>Zostatok: {total - idx - (phase === 'result' ? 1 : 0)}</span>
      </div>
    </div>
  );
}
