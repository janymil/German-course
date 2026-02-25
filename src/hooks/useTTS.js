/**
 * useTTS — Web Speech API Text-to-Speech hook
 * Speaks German text with proper German voice if available.
 */
import { useCallback, useRef, useState } from 'react';

export function useTTS() {
  const [speaking, setSpeaking] = useState(false);
  const utterRef = useRef(null);

  const speak = useCallback((rawText, lang = 'de-DE', rate = 0.85) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    // Strip phonetic annotations: "Zimmer → [tsɪmɐ]" → "Zimmer"
    // Removes everything from → / — / [ onwards so TTS only hears the actual word/sentence
    const text = (rawText || '')
      .split(/\s*→.*|\s*—.*|\s*=\s*\[.*|\s*\[.*/)
      [0]
      .trim();

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang;
    utter.rate = rate;
    utter.pitch = 1;

    // Prefer a German voice if available
    const voices = window.speechSynthesis.getVoices();
    const germanVoice = voices.find(
      (v) => v.lang.startsWith('de') && !v.name.includes('Google') 
    ) || voices.find((v) => v.lang.startsWith('de'));
    if (germanVoice) utter.voice = germanVoice;

    utter.onstart = () => setSpeaking(true);
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);

    utterRef.current = utter;
    window.speechSynthesis.speak(utter);
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  return { speak, stop, speaking };
}
