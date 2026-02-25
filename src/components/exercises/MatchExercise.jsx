/**
 * MatchExercise — Click-pair matching game
 */
import React, { useState, useEffect } from 'react';
import { CheckCircle, RotateCcw } from 'lucide-react';
import { useTTS } from '../../hooks/useTTS';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function MatchExercise({ exercise, onComplete }) {
  const pairs = exercise.pairs;
  const { speak } = useTTS();

  const [leftItems] = useState(() => shuffle(pairs.map((p, i) => ({ id: i, text: p[0], side: 'left' }))));
  const [rightItems] = useState(() => shuffle(pairs.map((p, i) => ({ id: i, text: p[1], side: 'right' }))));
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [matched, setMatched] = useState(new Set());
  const [wrong, setWrong] = useState(new Set());
  const [attempts, setAttempts] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (selectedLeft !== null && selectedRight !== null) {
      setAttempts((a) => a + 1);
      if (selectedLeft === selectedRight) {
        const newMatched = new Set([...matched, selectedLeft]);
        speak(pairs[selectedLeft][0]);
        setMatched(newMatched);
        setSelectedLeft(null);
        setSelectedRight(null);
        if (newMatched.size === pairs.length) {
          setFinished(true);
          const score = Math.max(0, Math.round(100 - (attempts - pairs.length) * 10));
          setTimeout(() => onComplete(Math.min(100, score)), 1200);
        }
      } else {
        const wrongPair = `${selectedLeft}-${selectedRight}`;
        setWrong(new Set([...wrong, wrongPair]));
        setTimeout(() => {
          setSelectedLeft(null);
          setSelectedRight(null);
          setWrong(new Set());
        }, 700);
      }
    }
  }, [selectedLeft, selectedRight]);

  const isWrong = (side, id) => {
    if (wrong.size === 0) return false;
    const [wl, wr] = [...wrong][0].split('-').map(Number);
    return (side === 'left' && id === wl) || (side === 'right' && id === wr);
  };

  const getStyle = (side, id) => {
    if (matched.has(id)) return 'bg-emerald-900/60 border-emerald-600 text-emerald-200 cursor-default scale-100';
    if (isWrong(side, id)) return 'bg-rose-900/60 border-rose-600 text-rose-200 animate-pulse';
    const sel = side === 'left' ? selectedLeft : selectedRight;
    if (sel === id) return 'bg-indigo-900/70 border-indigo-500 text-indigo-100 scale-105';
    return 'bg-gray-800 border-gray-700 hover:bg-gray-700 hover:border-gray-500 cursor-pointer text-gray-200';
  };

  const click = (side, id) => {
    if (matched.has(id) || wrong.size > 0) return;
    if (side === 'left') setSelectedLeft(id === selectedLeft ? null : id);
    else setSelectedRight(id === selectedRight ? null : id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">{matched.size} / {pairs.length} spárovaných</p>
        <div className="flex gap-1">
          {pairs.map((_, i) => (
            <div key={i} className={`w-5 h-1.5 rounded-full ${matched.has(i) ? 'bg-emerald-500' : 'bg-gray-700'}`} />
          ))}
        </div>
      </div>

      {finished && (
        <div className="bg-emerald-950/40 border border-emerald-700 rounded-2xl p-4 text-center">
          <CheckCircle size={28} className="text-emerald-400 mx-auto mb-2" />
          <p className="font-bold text-emerald-300 text-lg">Výborne! Všetky páry správne!</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        {/* Left — German */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-center mb-2">🇩🇪 Nemecky</p>
          {leftItems.map((item) => (
            <button
              key={item.id}
              onClick={() => click('left', item.id)}
              className={`w-full rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all duration-150 text-left ${getStyle('left', item.id)}`}
            >
              {matched.has(item.id) ? '✓ ' : ''}{item.text}
            </button>
          ))}
        </div>
        {/* Right — Slovak */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-center mb-2">🇸🇰 Slovensky</p>
          {rightItems.map((item) => (
            <button
              key={item.id}
              onClick={() => click('right', item.id)}
              className={`w-full rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all duration-150 text-left ${getStyle('right', item.id)}`}
            >
              {matched.has(item.id) ? '✓ ' : ''}{item.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
