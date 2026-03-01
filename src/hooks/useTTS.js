/**
 * useTTS — Web Speech API Text-to-Speech hook
 * Speaks German text with proper German voice if available.
 * 100% local, instant, and free. No OpenAI fallback.
 */
import { useCallback, useRef, useState } from 'react';

export function useTTS() {
  const [speaking, setSpeaking] = useState(false);
  const utterRef = useRef(null);

  const speak = useCallback((text, lang = 'de-DE', rate = 0.85) => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    // Clean up text (remove pronunciation guides like → [tsɪmɐ] or translations in parentheses)
    const cleanLabel = (text || '')
      .replace(/\s*\(.*?\)/g, '')
      .split(/\s*→.*|\s*—.*|\s*=\s*\[.*|\s*\[.*/)[0].trim();

    const utter = new SpeechSynthesisUtterance(cleanLabel);
    utter.lang = lang;
    utter.rate = rate; // slightly slower for learners

    const voices = window.speechSynthesis.getVoices();
    // Prefer premium/neural German voices if available, falling back to any German voice
    const germanVoice = (
      voices.find((v) => v.lang.startsWith('de') && (v.name.includes('Premium') || v.name.includes('Neural'))) ||
      voices.find((v) => v.lang.startsWith('de') && v.name.includes('Google')) ||
      voices.find((v) => v.lang.startsWith('de'))
    );

    if (germanVoice) {
      utter.voice = germanVoice;
    }

    utter.onstart = () => setSpeaking(true);
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);

    utterRef.current = utter;

    // Sometimes voices aren't loaded immediately on first page load
    if (voices.length > 0) {
      window.speechSynthesis.speak(utter);
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        const updatedVoices = window.speechSynthesis.getVoices();
        const updatedVoice = updatedVoices.find((v) => v.lang.startsWith('de'));
        if (updatedVoice) utter.voice = updatedVoice;
        window.speechSynthesis.speak(utter);
      };
    }

    // Return a promise that resolves when speech finishes
    return new Promise((resolve) => {
      utter.onend = () => {
        setSpeaking(false);
        resolve();
      };
      utter.onerror = () => {
        setSpeaking(false);
        resolve();
      };
    });
  }, []);

  // For stories, just speak the whole text as one long utterance
  const speakStory = useCallback((sentences) => {
    const fullText = sentences.map(s => s.de).join(' ');
    return speak(fullText, 'de-DE', 0.85);
  }, [speak]);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  return { speak, speakStory, stop, speaking };
}
