/**
 * FlashcardExercise — flip card to reveal translation + TTS on every card
 */
import React, { useState, useEffect } from 'react';
import { Volume2, RotateCcw, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { useTTS } from '../../hooks/useTTS';
import { GenderWord, GenderText, GenderLegend } from '../../utils/genderColors';

export function FlashcardExercise({ exercise, lesson, onComplete, savedState, onProgress }) {
  const vocab = lesson.vocab;
  const [index, setIndex] = useState(savedState?.index || 0);
  const [flipped, setFlipped] = useState(false);
  // Restore the Set properly from an array
  const [done, setDone] = useState(new Set(savedState?.done || []));
  const { speak, speaking } = useTTS();

  const card = vocab[index];

  // Enter key: flip or advance
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (!card) return;
        if (!flipped) {
          setFlipped(true);
          speak(card.de);
        } else {
          next();
        }
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [flipped, index, card]);

  if (!card) return null;

  const speakWord = (e) => {
    e?.stopPropagation();
    speak(card.de);
  };

  const flip = () => {
    setFlipped((f) => {
      // If we are currently NOT flipped (showing German) and we click to flip, 
      // we reveal Slovak. We shouldn't speak German again here.
      // If we are flipped (showing Slovak) and click to flip back, 
      // we reveal German. We can speak it then.
      const currentlyFlipped = f;
      if (currentlyFlipped) {
        speak(card.de);
      }
      return !f;
    });
  };

  const next = () => {
    const newDone = new Set([...done, index]);
    setDone(newDone);

    // Calculate new position
    const newIndex = index < vocab.length - 1 ? index + 1 : index;

    if (index < vocab.length - 1) {
      setIndex(newIndex);
      setFlipped(false);
    }

    // Save mid-deck state upwards to the global lessonState
    if (onProgress) {
      onProgress({
        index: newIndex,
        done: Array.from(newDone) // Convert Set to Array for JSON storage
      });
    }
  };

  const prev = () => {
    if (index > 0) { setIndex(index - 1); setFlipped(false); }
  };

  const allDone = done.size >= vocab.length;

  return (
    <div className="space-y-6">
      {/* Progress dots */}
      <div className="flex gap-1.5 flex-wrap">
        {vocab.map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full min-w-3 transition-all ${i === index ? 'bg-indigo-500' : done.has(i) ? 'bg-emerald-600' : 'bg-gray-700'
            }`} />
        ))}
      </div>

      {/* Card */}
      <div
        onClick={flip}
        className={`relative cursor-pointer rounded-2xl min-h-56 flex flex-col items-center justify-center p-8 border-2 transition-all duration-300 select-none
          ${flipped ? 'bg-indigo-950/60 border-indigo-700' : 'bg-gray-800/80 border-gray-700 hover:border-gray-600'}`}
      >
        <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-gray-500">
          {flipped ? '🇸🇰 Slovensky' : '🇩🇪 Nemecky — klikni pre preklad'}
        </p>

        {!flipped ? (
          <>
            <p className="text-4xl font-bold text-center text-white">
              <GenderWord word={card.de} gender={card.gender} />
            </p>
            <button
              onClick={speakWord}
              className={`mt-4 p-2.5 rounded-full border transition-all ${speaking ? 'bg-indigo-700 border-indigo-500' : 'bg-gray-700 border-gray-600 hover:bg-gray-600'}`}
            >
              <Volume2 size={20} className="text-indigo-300" />
            </button>
          </>
        ) : (
          <>
            <p className="text-3xl font-bold text-indigo-200 text-center">{card.sk}</p>
            {card.example && (
              <p
                className="text-sm mt-4 italic text-center cursor-pointer hover:text-indigo-300 transition-colors"
                onClick={(e) => { e.stopPropagation(); speak(card.example); }}
                title="Vypočuj si príklad"
              >
                „<GenderText text={card.example} className="text-gray-400" />“
              </p>
            )}
            <button
              onClick={speakWord}
              className="mt-4 p-2 rounded-full bg-indigo-900 border border-indigo-700 hover:bg-indigo-800"
            >
              <Volume2 size={16} className="text-indigo-300" />
            </button>
          </>
        )}
      </div>

      {/* Controls */}
      <div className="flex gap-3 items-center">
        <button onClick={prev} disabled={index === 0} className="btn-secondary disabled:opacity-30">
          <ChevronLeft size={18} />
        </button>
        <button onClick={next} className="btn-primary flex-1 justify-center">
          {index < vocab.length - 1 ? (
            <><ChevronRight size={18} /> Ďalšia</>
          ) : (
            <><CheckCircle size={18} /> Dokončiť</>
          )}
        </button>
      </div>

      {allDone && (
        <button onClick={() => onComplete(100)} className="w-full btn-primary justify-center bg-emerald-700 hover:bg-emerald-600 py-3 text-base">
          <CheckCircle size={20} /> Flashkarty splnené — pokračovať
        </button>
      )}

      <GenderLegend className="justify-center mt-2" />
      <p className="text-center text-xs text-gray-600">{index + 1} / {vocab.length}</p>
    </div>
  );
}
