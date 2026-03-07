import { useState, useEffect, useRef, useCallback } from 'react';

export function useNativeSpeechRecognition() {
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

            if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
            silenceTimerRef.current = setTimeout(() => {
                intentionalStopRef.current = true;
                recognition.stop();
            }, 3000);
        };

        recognition.onerror = (event) => {
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
            try { recognition.stop(); } catch (e) { }
        };
    }, []);

    const startListening = useCallback(() => {
        if (!recognitionRef.current) return;
        finalTranscriptRef.current = '';
        setTranscript('');
        try { recognitionRef.current.stop(); } catch (e) { }
        setTimeout(() => {
            try { recognitionRef.current.start(); } catch (e) { console.warn('Could not start recognition:', e); }
        }, 100);
    }, []);

    const stopListening = useCallback(() => {
        if (!recognitionRef.current) return;
        intentionalStopRef.current = true;
        if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
        try { recognitionRef.current.stop(); } catch (e) { }
    }, []);

    const resetTranscript = useCallback(() => {
        setTranscript('');
        finalTranscriptRef.current = '';
    }, []);

    return { transcript, isListening, isSupported, startListening, stopListening, resetTranscript, setTranscript };
}
