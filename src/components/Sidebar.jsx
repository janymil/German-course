import React from 'react';
import { Home, Calendar, Brain, BookOpen, HelpCircle, Headphones, MessageSquare, Key, FlaskConical, Target, Lightbulb } from 'lucide-react';

const NAV = [
  { id: 'dashboard', label: 'Prehľad', Icon: Home },
  { id: 'weekly', label: 'Plán', Icon: Calendar },
  { id: 'passive', label: 'Pasívna fáza', Icon: Headphones },
  { id: 'vocab', label: 'Slovíčka', Icon: Brain },
  { id: 'grammar', label: 'Gramatika', Icon: BookOpen },
  { id: 'arena', label: 'Aréna', Icon: Target },
  { id: 'chat', label: 'AI Konverzácia', Icon: MessageSquare },
  { id: 'placement', label: 'Vstupný test', Icon: FlaskConical },
  { id: 'studycoach', label: 'Study Coach', Icon: Lightbulb },
  { id: 'guide', label: 'Príručka', Icon: HelpCircle },
];

export default function Sidebar({ activeView, setActiveView, onOpenAPIKey }) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-56 bg-gray-900 border-r border-gray-800 h-screen sticky top-0 py-6 px-3 flex-shrink-0 overflow-y-auto">
        <div className="mb-8 px-3">
          <h1 className="text-xl font-black text-white tracking-tight">🇩🇪 Nemčina</h1>
          <p className="text-xs text-gray-500 mt-0.5">A1 Kurz</p>
        </div>
        <nav className="flex flex-col gap-1">
          {NAV.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setActiveView(id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                ${activeView === id
                  ? 'bg-indigo-800/60 text-white border border-indigo-700/40'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/60'}`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>
        <div className="mt-auto px-1">
          <button
            onClick={onOpenAPIKey}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-gray-600 hover:text-gray-400 hover:bg-gray-800/40 transition-all"
          >
            <Key size={14} />
            API kľúč (AI)
          </button>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur border-t border-gray-800 flex">
        {NAV.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setActiveView(id)}
            className={`flex-1 flex flex-col items-center justify-center gap-1 py-2.5 text-xs font-medium transition-all
              ${activeView === id ? 'text-indigo-400' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <Icon size={20} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </>
  );
}
