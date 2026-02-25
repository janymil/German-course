import React, { useState, useRef, useEffect } from 'react';
import { Send, RotateCcw, Bot, User, Key, Volume2, ChevronDown, Mic, MicOff } from 'lucide-react';
import { sendConversationMessage } from '../hooks/useAI';
import { useTTS } from '../hooks/useTTS';

const CHARACTERS = [
  {
    id: 'hr',
    name: 'Petra Mayr',
    role: 'HR manažérka',
    emoji: '👩‍💼',
    description: 'Petrin prvý deň — HR oddelenie. Predstavovanie, základné otázky.',
    prompt: `Si Petra Mayr, HR manažérka rakúskej firmy vo Viedni. Nový zamestnanec práve prišiel na prvý pracovný deň.
Hovoríš po nemecky — jednoducho, priateľsky, maximálne A1 úroveň.
Dôležité: použi meno, ktoré ti zamestnanec povie. Nezačínaj s menom — opýtaj sa ho.
Začni rozhovor: privítaj ho a opýtaj sa jeho meno.`,
    starterMessage: 'Guten Morgen! Herzlich willkommen! Ich bin Petra Mayr. Wie heißen Sie?',
  },
  {
    id: 'cafe',
    name: 'Thomas',
    role: 'Čašník v kaviarni',
    emoji: '☕',
    description: 'Objednávanie v rakúskej kaviarni. Jedlo, nápoje, ceny.',
    prompt: `Si Thomas, čašník v typickej viedenskej kaviarni. Hosť si prišiel objednať.
Hovoríš jednoducho po nemecky — A1 úroveň. Ponúkaš: Kaffee (3€), Tee (2.50€), Wasser (1€), Croissant (2€), Apfelstrudel (4€).
Ak hosť povie svoje meno, použi ho. Začni rozhovor: privítaj hosťa.`,
    starterMessage: 'Guten Tag! Was darf ich Ihnen bringen?',
  },
  {
    id: 'neighbor',
    name: 'Herr Gruber',
    role: 'Sused',
    emoji: '🏠',
    description: 'Spoznávanie susedov. Byt, Viedeň, každodenný život.',
    prompt: `Si Herr Gruber, starší rakúsky sused v bytovom dome vo Viedni. Si priateľský, hovoríš pomaly a jasne.
Hovoríš jednoducho po nemecky — A1 úroveň. Zaujímaš sa o nového suseda — odkiaľ je, čo robí, ako sa mu páči Viedeň.
Ak ti povie svoje meno, použi ho. Začni rozhovor: stretli ste sa pri schránkach.`,
    starterMessage: 'Oh, Guten Tag! Sie sind neu hier, oder? Ich bin Gruber. Woher kommen Sie?',
  },
  {
    id: 'doctor',
    name: 'Dr. Fischer',
    role: 'Lekár',
    emoji: '🩺',
    description: 'U lekára. Symptómy, objednanie, lekárske výrazy A1.',
    prompt: `Si Dr. Fischer, všeobecný lekár v zdravotnom stredisku vo Viedni. Pacient prišiel so zdravotným problémom.
Hovoríš jednoducho po nemecky — A1 úroveň. Pýtaš sa na symptómy, teplotu, bolesť.
Ak pacient povie svoje meno, použi ho. Začni rozhovor: pacient vstúpil do ordinácie.`,
    starterMessage: 'Guten Morgen! Bitte, setzen Sie sich. Was fehlt Ihnen?',
  },
  {
    id: 'shop',
    name: 'Maria',
    role: 'Predavačka',
    emoji: '🛒',
    description: 'V obchode. Ceny, farby, veľkosti, nakupovanie.',
    prompt: `Si Maria, predavačka v obchode s oblečením vo Viedni. Zákazník prišiel nakupovať.
Hovoríš jednoducho po nemecky — A1 úroveň. Pomáhaš s veľkosťami, farbami, cenou.
Ak zákazník povie svoje meno, použi ho. Začni rozhovor: zákazník vstúpil do obchodu.`,
    starterMessage: 'Hallo! Kann ich Ihnen helfen? Was suchen Sie?',
  },
];

export default function AIConversation({ onOpenAPIKey, onSavePhrases, onMarkVocabSeen }) {
  const [selectedChar, setSelectedChar] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [listening, setListening] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [savedPhrases, setSavedPhrases] = useState(null); // null = not yet saved
  const recognitionRef = useRef(null);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const { speak } = useTTS();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  function startConversation(char) {
    setSelectedChar(char);
    setMessages([{ role: 'assistant', content: char.starterMessage }]);
    setError(null);
    setInput('');
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  function resetConversation() {
    stopListening();
    setSelectedChar(null);
    setMessages([]);
    setError(null);
    setInput('');
  }

  function startListening() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    const rec = new SR();
    rec.lang = 'de-DE';
    rec.continuous = false;
    rec.interimResults = false;
    rec.onstart = () => setListening(true);
    rec.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInput(prev => (prev ? prev + ' ' + transcript : transcript));
    };
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    recognitionRef.current = rec;
    rec.start();
  }

  function stopListening() {
    recognitionRef.current?.stop();
    setListening(false);
  }

  function extractPhrases() {
    const result = [];
    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i];
      if (msg.role !== 'user') continue;
      const userText = msg.content.trim();
      if (userText.length < 2) continue;
      // Find the immediately following assistant message for corrections
      let correction = null;
      for (let j = i + 1; j < messages.length; j++) {
        if (messages[j].role === 'assistant') {
          const tipMatch = messages[j].content.match(/\(Tip:[^)]+\)/);
          correction = tipMatch ? tipMatch[0] : null;
          break;
        }
      }
      result.push({
        de: userText,
        correction,
        hasCorrection: !!correction,
        charId: selectedChar.id,
        charName: selectedChar.name,
        savedAt: new Date().toISOString(),
      });
    }
    return result;
  }

  function handleEndConversation() {
    stopListening();
    const phrases = extractPhrases();
    setSavedPhrases(phrases);
    setShowSummary(true);
  }

  function handleSavePhrases(phrasesToSave) {
    if (onSavePhrases) onSavePhrases(phrasesToSave);
    // Extract individual German words and mark as seen in vocab
    if (onMarkVocabSeen) {
      const words = new Set();
      phrasesToSave.forEach(p => {
        p.de.split(/[\s,.:!?;()\-]+/).forEach(w => {
          const clean = w.replace(/[^a-zA-ZäöüÄÖÜß]/g, '');
          if (clean.length >= 3) words.add(clean);
        });
      });
      words.forEach(w => onMarkVocabSeen(w, false));
    }
  }

  async function handleSend() {
    if (!input.trim() || loading) return;
    const userMsg = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const reply = await sendConversationMessage({
        messages: newMessages,
        characterPrompt: selectedChar.prompt,
      });
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (e) {
      if (e.message === 'NO_KEY' || e.message === 'INVALID_KEY') {
        setError('key');
      } else {
        setError('api');
      }
      // Remove optimistic user message on error
      setMessages(prev => prev.slice(0, -1));
      setInput(userMsg.content);
    } finally {
      setLoading(false);
    }
  }

  // Character picker
  if (!selectedChar) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <div>
          <h2 className="text-2xl font-black text-white mb-1">AI Konverzácia</h2>
          <p className="text-gray-400 text-sm">
            Zvol si postavu z Janinho príbehu a precvič si nemčinu v reálnych situáciách.
            AI hovorí iba po nemecky (A1 úroveň) a opravuje chyby po slovensky.
          </p>
        </div>

        <div className="grid gap-3">
          {CHARACTERS.map(char => (
            <button
              key={char.id}
              onClick={() => startConversation(char)}
              className="w-full text-left bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 rounded-2xl p-4 transition-all group flex items-center gap-4"
            >
              <div className="text-4xl flex-shrink-0">{char.emoji}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold text-sm">{char.name}</span>
                  <span className="text-xs text-gray-600 font-medium">{char.role}</span>
                </div>
                <p className="text-gray-500 text-xs mt-0.5 leading-snug">{char.description}</p>
                <p className="text-indigo-400/70 text-xs mt-1.5 italic truncate">
                  „{char.starterMessage}"
                </p>
              </div>
              <ChevronDown size={16} className="text-gray-700 group-hover:text-gray-400 -rotate-90 flex-shrink-0 transition-colors" />
            </button>
          ))}
        </div>

        <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-4 text-xs text-gray-600 space-y-1">
          <p className="text-gray-500 font-semibold">Ako to funguje:</p>
          <p>• Píš alebo hovor po nemecky (mikrofón 🎤) — AI odpovedá v jednoduchej A1 nemčine</p>
          <p>• Ak urobíš gramatickú chybu, AI ťa jemne opraví v závorke po slovensky</p>
          <p>• Tlačidlo 🔊 prehráva nemecké odpovede pomocou TTS</p>
        </div>
      </div>
    );
  }

  // Chat view
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-2xl mx-auto relative">
      {/* Chat header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-800 bg-gray-950 flex-shrink-0">
        <span className="text-2xl">{selectedChar.emoji}</span>
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-sm">{selectedChar.name}</p>
          <p className="text-gray-600 text-xs">{selectedChar.role} · A1 nemčina</p>
        </div>
        <button
          onClick={resetConversation}
          className="text-xs text-gray-600 hover:text-gray-400 flex items-center gap-1 transition-colors px-2 py-1"
        >
          <RotateCcw size={12} /> Zmeniť postavu
        </button>
        {messages.length > 1 && (
          <button
            onClick={handleEndConversation}
            className="text-xs text-emerald-600 hover:text-emerald-400 flex items-center gap-1 transition-colors px-2 py-1"
          >
            Ukončiť & uložiť
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            {/* Avatar */}
            <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm mt-0.5 ${
              msg.role === 'user' ? 'bg-indigo-700' : 'bg-gray-800 border border-gray-700'
            }`}>
              {msg.role === 'user' ? <User size={14} /> : selectedChar.emoji}
            </div>

            {/* Bubble */}
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              msg.role === 'user'
                ? 'bg-indigo-700 text-white'
                : 'bg-gray-800/80 border border-gray-700/50 text-gray-100'
            }`}>
              {/* Format AI corrections: text in () that looks like a tip gets highlighted */}
              {msg.role === 'assistant' ? (
                <span dangerouslySetInnerHTML={{
                  __html: msg.content.replace(
                    /\(Tip:[^)]+\)/g,
                    m => `<span style="color:#fbbf24;font-size:0.75rem;display:block;margin-top:4px">${m}</span>`
                  )
                }} />
              ) : msg.content}
              {msg.role === 'assistant' && (
                <button
                  onClick={() => speak(msg.content.replace(/\(Tip:[^)]+\)/g, '').trim())}
                  className="mt-2 ml-1 text-gray-600 hover:text-indigo-400 transition-colors inline-flex items-center gap-1"
                  title="Prehrať"
                >
                  <Volume2 size={13} />
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div className="flex gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
              {selectedChar.emoji}
            </div>
            <div className="bg-gray-800/80 border border-gray-700/50 rounded-2xl px-4 py-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        {/* Error */}
        {error === 'key' && (
          <div className="bg-amber-950/40 border border-amber-700/40 rounded-2xl p-3 flex items-center justify-between gap-3">
            <p className="text-amber-300 text-xs flex items-center gap-1.5"><Key size={13} /> Chýba API kľúč</p>
            <button
              onClick={onOpenAPIKey}
              className="text-xs bg-amber-700/60 hover:bg-amber-600/60 text-amber-200 px-3 py-1.5 rounded-lg font-semibold transition-all"
            >
              Zadať kľúč
            </button>
          </div>
        )}
        {error === 'api' && (
          <div className="bg-red-950/40 border border-red-700/40 rounded-2xl p-3 text-red-300 text-xs">
            Chyba pripojenia. Skús znova.
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0 px-4 py-3 border-t border-gray-800 bg-gray-950">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder={listening ? 'Počúvam…' : 'Napíšte alebo hovorte po nemecky…'}
            className={`flex-1 bg-gray-800/60 border rounded-2xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none transition-colors ${
              listening ? 'border-red-500/70 placeholder-red-400' : 'border-gray-700/60 focus:border-indigo-600'
            }`}
            disabled={loading}
          />
          {(window.SpeechRecognition || window.webkitSpeechRecognition) && (
            <button
              onClick={listening ? stopListening : startListening}
              disabled={loading}
              title={listening ? 'Zastaviť nahrávanie' : 'Hovoriť po nemecky'}
              className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all ${
                listening
                  ? 'bg-red-600 hover:bg-red-500 text-white animate-pulse'
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white'
              }`}
            >
              {listening ? <MicOff size={16} /> : <Mic size={16} />}
            </button>
          )}
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all ${
              input.trim() && !loading
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                : 'bg-gray-800 text-gray-600 cursor-not-allowed'
            }`}
          >
            <Send size={16} />
          </button>
        </div>
        <p className="text-[11px] text-gray-700 mt-1.5 text-center">
          Hovoríš s AI postavou — nie je to skutočná osoba
        </p>
      </div>

      {/* Conversation summary overlay */}
      {showSummary && savedPhrases !== null && (
        <div className="absolute inset-0 bg-gray-950/95 z-10 flex flex-col overflow-y-auto px-4 py-6">
          <div className="max-w-xl mx-auto w-full space-y-4">
            <div>
              <h3 className="text-lg font-black text-white">Konverzácia ukončená</h3>
              <p className="text-xs text-gray-500 mt-0.5">{selectedChar.name} · {savedPhrases.length} tvojich viet</p>
            </div>

            {savedPhrases.length === 0 ? (
              <div className="text-gray-500 text-sm text-center py-8">Žiadne tvoje vety v tejto konverzácii.</div>
            ) : (
              <>
                {/* Phrases with corrections */}
                {savedPhrases.some(p => p.hasCorrection) && (
                  <div>
                    <p className="text-xs font-bold text-amber-400 uppercase tracking-wide mb-2">Na precvičenie ({savedPhrases.filter(p => p.hasCorrection).length})</p>
                    <div className="space-y-2">
                      {savedPhrases.filter(p => p.hasCorrection).map((p, i) => (
                        <div key={i} className="bg-amber-950/30 border border-amber-800/40 rounded-xl p-3">
                          <p className="text-white text-sm">„{p.de}"</p>
                          <p className="text-amber-300 text-xs mt-1">{p.correction}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Correct phrases */}
                {savedPhrases.some(p => !p.hasCorrection) && (
                  <div>
                    <p className="text-xs font-bold text-emerald-400 uppercase tracking-wide mb-2">Správne ({savedPhrases.filter(p => !p.hasCorrection).length})</p>
                    <div className="space-y-2">
                      {savedPhrases.filter(p => !p.hasCorrection).map((p, i) => (
                        <div key={i} className="bg-emerald-950/20 border border-emerald-800/30 rounded-xl p-3">
                          <p className="text-white text-sm">„{p.de}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  handleSavePhrases(savedPhrases);
                  setShowSummary(false);
                  resetConversation();
                }}
                className="flex-1 bg-emerald-700 hover:bg-emerald-600 text-white text-sm font-bold py-3 rounded-2xl transition-all"
              >
                Uložiť frázy + slová do slovíčok
              </button>
              <button
                onClick={() => {
                  setShowSummary(false);
                  setSavedPhrases(null);
                }}
                className="px-4 py-3 bg-gray-800 hover:bg-gray-700 text-gray-400 text-sm rounded-2xl transition-all"
              >
                Zatvoriť
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
