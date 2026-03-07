import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Volume2 } from 'lucide-react';
import { useTTS } from '../../hooks/useTTS';

/**
 * CategorySortExercise — Student sorts words into correct categories.
 * 
 * Schema:
 * {
 *   type: 'categorysort',
 *   instruction: string,
 *   categories: [
 *     {
 *       name: string,          // Category label (e.g. 'der (Maskulin)', 'die (Feminin)')
 *       color: string,         // Optional: 'blue'|'rose'|'green'|'amber'|'purple'
 *       words: string[],       // Correct words in this category
 *     }
 *   ],
 *   explanation: string,       // Shown after completion
 * }
 */
export function CategorySortExercise({ exercise, onComplete }) {
  const categories = exercise.categories || [];
  const allWords = categories.flatMap(c => c.words.map(w => ({ word: w, category: c.name })));

  const [shuffled] = useState(() => [...allWords].sort(() => Math.random() - 0.5));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [placements, setPlacements] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [finished, setFinished] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const { speak, stop } = useTTS();

  useEffect(() => () => stop(), []);

  const colorMap = {
    blue: { bg: 'bg-blue-950/40', border: 'border-blue-700/50', text: 'text-blue-300', hover: 'hover:bg-blue-900/50' },
    rose: { bg: 'bg-rose-950/40', border: 'border-rose-700/50', text: 'text-rose-300', hover: 'hover:bg-rose-900/50' },
    green: { bg: 'bg-green-950/40', border: 'border-green-700/50', text: 'text-green-300', hover: 'hover:bg-green-900/50' },
    amber: { bg: 'bg-amber-950/40', border: 'border-amber-700/50', text: 'text-amber-300', hover: 'hover:bg-amber-900/50' },
    purple: { bg: 'bg-purple-950/40', border: 'border-purple-700/50', text: 'text-purple-300', hover: 'hover:bg-purple-900/50' },
    gray: { bg: 'bg-gray-800/40', border: 'border-gray-700/50', text: 'text-gray-300', hover: 'hover:bg-gray-700/50' },
  };

  const getColors = (cat, idx) => {
    const c = cat.color || ['blue', 'rose', 'green', 'amber', 'purple', 'gray'][idx % 6];
    return colorMap[c] || colorMap.gray;
  };

  const handleCategoryClick = (catName) => {
    if (feedback || finished) return;
    const item = shuffled[currentIndex];
    const isCorrect = item.category === catName;
    if (isCorrect) {
      setCorrectCount(c => c + 1);
      speak(item.word, 'de-DE', 0.85);
    }
    setFeedback({ correct: isCorrect, chosen: catName, expected: item.category });
    setPlacements(p => ({ ...p, [item.word]: { cat: catName, correct: isCorrect } }));

    setTimeout(() => {
      setFeedback(null);
      if (currentIndex + 1 < shuffled.length) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setFinished(true);
        const finalCorrect = correctCount + (isCorrect ? 1 : 0);
        const score = Math.round((finalCorrect / shuffled.length) * 100);
        setTimeout(() => onComplete(score), 1200);
      }
    }, 1200);
  };

  if (finished) {
    const total = shuffled.length;
    const finalCorrect = Object.values(placements).filter(p => p.correct).length;
    const score = Math.round((finalCorrect / total) * 100);
    return (
      <div className="text-center py-8">
        <div className={`text-5xl font-bold mb-2 ${score >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>{score}%</div>
        <p className="text-gray-400">{finalCorrect} / {total} správne zaradených</p>
        {exercise.explanation && (
          <p className="text-sm text-gray-500 italic mt-4 max-w-md mx-auto">{exercise.explanation}</p>
        )}
      </div>
    );
  }

  const currentItem = shuffled[currentIndex];

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div className="flex gap-1 mb-2">
        {shuffled.map((_, i) => (
          <div key={i} className={`flex-1 h-1.5 rounded-full transition-all duration-300
            ${i < currentIndex ? (placements[shuffled[i].word]?.correct ? 'bg-emerald-500' : 'bg-rose-500') : i === currentIndex ? 'bg-indigo-500' : 'bg-gray-800'}`} />
        ))}
      </div>

      <p className="text-xs text-gray-500">Slovo {currentIndex + 1} / {shuffled.length}</p>

      {/* Current word */}
      <div className="bg-gray-800/60 border border-gray-700/50 rounded-xl p-5 text-center">
        <p className="text-xs text-gray-500 mb-1">Zaraď slovo do správnej kategórie:</p>
        <div className="flex items-center justify-center gap-2">
          <p className="text-2xl text-white font-bold">{currentItem.word}</p>
          <button onClick={() => speak(currentItem.word, 'de-DE', 0.85)} className="text-indigo-400 hover:text-indigo-300">
            <Volume2 size={18} />
          </button>
        </div>
      </div>

      {/* Feedback overlay */}
      {feedback && (
        <div className={`rounded-xl p-3 border text-center text-sm font-medium ${
          feedback.correct ? 'bg-emerald-950/30 border-emerald-700/40 text-emerald-400' : 'bg-rose-950/30 border-rose-700/40 text-rose-400'
        }`}>
          {feedback.correct ? (
            <span className="flex items-center justify-center gap-1"><CheckCircle size={16} /> Správne!</span>
          ) : (
            <span className="flex items-center justify-center gap-1"><XCircle size={16} /> Správne je: {feedback.expected}</span>
          )}
        </div>
      )}

      {/* Category buttons */}
      <div className="grid grid-cols-2 gap-3">
        {categories.map((cat, idx) => {
          const colors = getColors(cat, idx);
          return (
            <button
              key={cat.name}
              onClick={() => handleCategoryClick(cat.name)}
              disabled={!!feedback}
              className={`${colors.bg} ${colors.border} border rounded-xl p-4 text-center transition-all ${colors.hover} disabled:opacity-60`}
            >
              <p className={`font-bold text-sm ${colors.text}`}>{cat.name}</p>
              <p className="text-xs text-gray-500 mt-1">
                {Object.entries(placements).filter(([_, p]) => p.cat === cat.name && p.correct).length} slov
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
