// ==========================================================
// tts.js — Text-to-Speech for German
// ==========================================================

let ttsVoice = null;

function initTTS() {
  if (!('speechSynthesis' in window)) return;
  function findVoice() {
    const voices = window.speechSynthesis.getVoices();
    ttsVoice = voices.find(v => v.lang === 'de-DE') ||
               voices.find(v => v.lang.startsWith('de')) ||
               null;
  }
  findVoice();
  window.speechSynthesis.onvoiceschanged = findVoice;
}

function speakGerman(text) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = 'de-DE';
  utt.rate = 0.85;
  utt.pitch = 1;
  if (ttsVoice) utt.voice = ttsVoice;
  window.speechSynthesis.speak(utt);
}

initTTS();
