import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Loader2, X, PlaySquare, Volume2 } from 'lucide-react';

export default function AIVoiceModal({ isOpen, onClose, segmentTopic, segmentContext, transcriptSegment, videoLevel, onResumeVideo }) {
    const [conversation, setConversation] = useState([]);
    const [isListening, setIsListening] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const audioPlayerRef = useRef(null);

    // Initial greeting trigger when modal opens — reset + fire START signal
    useEffect(() => {
        if (isOpen) {
            setConversation([]);
            // Small delay so state resets before triggerAI reads it
            setTimeout(() => triggerAI('START', true), 100);
        }
    }, [isOpen]);

    // Stop all audio when modal closes
    useEffect(() => {
        if (!isOpen) {
            if (audioPlayerRef.current) {
                audioPlayerRef.current.pause();
                audioPlayerRef.current = null;
            }
            window.speechSynthesis?.cancel();
            if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
                mediaRecorderRef.current.stop();
            }
            setIsListening(false);
            setIsSpeaking(false);
        }
    }, [isOpen]);

    // Component unmount cleanup
    useEffect(() => {
        return () => {
            if (audioPlayerRef.current) {
                audioPlayerRef.current.pause();
                audioPlayerRef.current = null;
            }
            window.speechSynthesis?.cancel();
            if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
                mediaRecorderRef.current.stop();
            }
        };
    }, []);

    const triggerAI = async (userSaidText, isGreeting = false) => {
        setIsProcessing(true);
        try {
            // Greeting trigger is internal — don't add to visible conversation log
            const historyToSend = isGreeting ? [] : [...conversation, { role: 'user', content: userSaidText }];
            if (!isGreeting) setConversation(historyToSend);

            const res = await fetch('/api/voice-coach-chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userText: userSaidText,
                    transcriptSegment,
                    conversationHistory: historyToSend,
                    videoLevel,
                    segmentTopic,
                    segmentContext
                })
            });
            const data = await res.json();

            if (data.error) throw new Error(data.error);

            setConversation(prev => [...prev, { role: 'assistant', content: data.text }]);

            // Play Audio
            playBase64Audio(data.audioBase64, data.text);
        } catch (err) {
            console.error("AI Error:", err);
            setConversation(prev => [...prev, { role: 'system', content: `Error: ${err.message}` }]);
        } finally {
            setIsProcessing(false);
        }
    };

    const playBase64Audio = (base64, fallbackText) => {
        setIsSpeaking(true);
        if (audioPlayerRef.current) {
            audioPlayerRef.current.pause();
            audioPlayerRef.current = null;
        }

        if (!base64) {
            // Fallback: Web Speech API TTS
            const utt = new SpeechSynthesisUtterance(fallbackText || '');
            utt.lang = 'de-DE';
            utt.rate = 0.9;
            utt.onend = () => setIsSpeaking(false);
            utt.onerror = () => setIsSpeaking(false);
            window.speechSynthesis.speak(utt);
            return;
        }

        const snd = new Audio("data:audio/mp3;base64," + base64);
        audioPlayerRef.current = snd;
        snd.onended = () => setIsSpeaking(false);
        snd.play().catch(() => {
            // If mp3 playback fails, fall back to TTS
            setIsSpeaking(false);
            if (fallbackText) {
                const utt = new SpeechSynthesisUtterance(fallbackText);
                utt.lang = 'de-DE';
                utt.rate = 0.9;
                window.speechSynthesis.speak(utt);
            }
        });
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            audioChunksRef.current = [];

            const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
                ? 'audio/webm;codecs=opus'
                : 'audio/webm';

            const recorder = new MediaRecorder(stream, { mimeType });
            mediaRecorderRef.current = recorder;

            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) audioChunksRef.current.push(e.data);
            };

            recorder.onstop = async () => {
                // Stop all mic tracks
                stream.getTracks().forEach(t => t.stop());
                setIsListening(false);

                const blob = new Blob(audioChunksRef.current, { type: mimeType });
                if (blob.size < 1000) return; // too short, ignore

                setIsProcessing(true);
                try {
                    // Convert to base64
                    const arrayBuffer = await blob.arrayBuffer();
                    const base64Audio = btoa(
                        new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
                    );

                    // Send to Whisper
                    const sttRes = await fetch('/api/transcribe', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ base64Audio, type: mimeType })
                    });
                    const sttData = await sttRes.json();
                    if (sttData.error) throw new Error(sttData.error);

                    const userText = sttData.text?.trim();
                    if (!userText) return;

                    await triggerAI(userText, false);
                } catch (err) {
                    console.error('Whisper STT error:', err);
                    setConversation(prev => [...prev, { role: 'system', content: `STT chyba: ${err.message}` }]);
                } finally {
                    setIsProcessing(false);
                }
            };

            recorder.start();
            setIsListening(true);
        } catch (err) {
            console.error('Microphone access denied or failed', err);
            alert('Nepodarilo sa získať prístup k mikrofónu.');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop(); // triggers onstop → Whisper
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <div className="bg-gray-900 border border-gray-700/50 rounded-3xl w-full max-w-2xl shadow-2xl flex flex-col h-[85vh] sm:h-[600px] overflow-hidden">

                {/* Header */}
                <div className="bg-indigo-950/40 p-4 border-b border-indigo-900/50 flex justify-between items-center">
                    <div>
                        <h3 className="text-white font-black text-lg flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            Rozhovor v nemčine
                        </h3>
                        <p className="text-indigo-300 text-xs font-medium mt-1">
                            🎬 {segmentTopic} &nbsp;·&nbsp; hovoríš s nemeckým hovoriacim
                        </p>
                    </div>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Conversation Body */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                    {conversation.length === 0 && !isProcessing && (
                        <div className="text-center text-gray-500 mt-10">
                            Pripravuje sa AI tréner...
                        </div>
                    )}

                    {conversation.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] rounded-2xl px-5 py-3 ${msg.role === 'user'
                                ? 'bg-indigo-600 text-white rounded-br-none'
                                : msg.role === 'system'
                                    ? 'bg-red-900/50 text-red-200 text-xs text-center mx-auto'
                                    : 'bg-gray-800 text-gray-200 border border-gray-700 rounded-bl-none shadow-md'
                                }`}>
                                {msg.role === 'assistant' && (
                                    <div className="flex items-center gap-2 mb-1.5 opacity-50">
                                        <Volume2 size={12} />
                                        <span className="text-[10px] font-bold uppercase tracking-wider">🇩🇪 Nemec</span>
                                    </div>
                                )}
                                <p className="leading-relaxed">{msg.content}</p>
                            </div>
                        </div>
                    ))}

                    {(isProcessing || isListening || isSpeaking) && (
                        <div className="flex justify-start">
                            <div className="bg-gray-800/50 border border-gray-700/50 text-gray-400 rounded-2xl rounded-bl-none px-5 py-3 flex items-center gap-3">
                                {isSpeaking ? (
                                    <>
                                        <div className="flex gap-1 h-3 items-center">
                                            <div className="w-1 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                            <div className="w-1 h-3 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                            <div className="w-1 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                                        </div>
                                        <span className="text-sm font-medium">Hovorí...</span>
                                    </>
                                ) : isListening ? (
                                    <>
                                        <Mic className="text-emerald-400 animate-pulse" size={16} />
                                        <span className="text-sm font-medium text-emerald-400">Počúvam ťa...</span>
                                    </>
                                ) : (
                                    <>
                                        <Loader2 className="animate-spin text-indigo-400" size={16} />
                                        <span className="text-sm font-medium">Spracovávam...</span>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Controls */}
                <div className="p-4 sm:p-6 bg-gray-900 border-t border-gray-800">
                    <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">

                        <div className="flex-1 w-full flex justify-center">
                            <button
                                onMouseDown={startRecording}
                                onMouseUp={stopRecording}
                                onTouchStart={startRecording}
                                onTouchEnd={stopRecording}
                                disabled={isProcessing || isSpeaking}
                                className={`
                                    flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white shadow-lg transition-all
                                    disabled:opacity-50 disabled:cursor-not-allowed
                                    ${isListening
                                        ? 'bg-rose-600 scale-95 shadow-rose-900/50'
                                        : 'bg-indigo-600 hover:bg-indigo-500 hover:scale-105 shadow-indigo-900/50'}
                                `}
                            >
                                {isListening ? <MicOff size={22} /> : <Mic size={22} />}
                                <span>{isListening ? 'Uvoľni pre odoslanie' : 'Podrž a hovor'}</span>
                            </button>
                        </div>

                        <button
                            onClick={onResumeVideo}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors border border-gray-700 hover:border-gray-500"
                        >
                            <PlaySquare size={18} />
                            Spustiť ďalej
                        </button>
                    </div>
                    <p className="text-center text-gray-600 text-[10px] mt-4 font-medium uppercase tracking-widest">
                        Audio sa neukladá. Spracovanie prebieha v pamäti.
                    </p>
                </div>

            </div>
        </div>
    );
}
