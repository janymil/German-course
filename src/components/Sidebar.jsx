import React, { useState } from 'react';
import { Home, Calendar, Brain, BookOpen, HelpCircle, Headphones, MessageSquare, Key, FlaskConical, Target, Lightbulb, Newspaper, MonitorPlay, LayoutList, Map, MoreHorizontal, X } from 'lucide-react';

const NAV = [
  { id: 'dashboard', label: 'Prehľad', Icon: Home },
  { id: 'weekly', label: 'Plán', Icon: Calendar },
  { id: 'passive', label: 'Pasívna fáza', Icon: Headphones },
  { id: 'vocab', label: 'Slovíčka', Icon: Brain },
  { id: 'stories', label: 'Čítanie', Icon: Newspaper },
  { id: 'videocoach', label: 'Video Coach', Icon: MonitorPlay },
  { id: 'grammar', label: 'Gramatika', Icon: BookOpen },
  { id: 'arena', label: 'Aréna', Icon: Target },
  { id: 'chat', label: 'AI Konverzácia', Icon: MessageSquare },
  { id: 'placement', label: 'Vstupný test', Icon: FlaskConical },
  { id: 'studycoach', label: 'Study Coach', Icon: Lightbulb },
  { id: 'features', label: 'Funkcie', Icon: LayoutList },
  { id: 'roadmap', label: 'Roadmapa', Icon: Map },
  { id: 'guide', label: 'Príručka', Icon: HelpCircle },
];

// Mobile: 5 main items shown + "More" expander
const MOBILE_MAIN = ['dashboard', 'weekly', 'vocab', 'arena', 'grammar'];

export default function Sidebar({ activeView, setActiveView, onOpenAPIKey }) {
  const [mobileMore, setMobileMore] = useState(false);

  const mobileMain = NAV.filter(n => MOBILE_MAIN.includes(n.id));
  const mobileExtra = NAV.filter(n => !MOBILE_MAIN.includes(n.id));

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

      {/* Mobile bottom nav — 5 items + More */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur border-t border-gray-800">
        {/* More panel */}
        {mobileMore && (
          <div className="absolute bottom-full left-0 right-0 bg-gray-900/98 backdrop-blur-lg border-t border-gray-800 shadow-2xl max-h-[60vh] overflow-y-auto">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
              <span className="text-sm font-bold text-white">Všetky nástroje</span>
              <button onClick={() => setMobileMore(false)} className="text-gray-400 hover:text-white p-1">
                <X size={18} />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-1 p-3">
              {mobileExtra.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  onClick={() => { setActiveView(id); setMobileMore(false); }}
                  className={`flex flex-col items-center justify-center gap-1.5 py-3 px-2 rounded-xl text-xs font-medium transition-all
                    ${activeView === id ? 'bg-indigo-800/60 text-indigo-300' : 'text-gray-400 hover:text-white hover:bg-gray-800/50'}`}
                >
                  <Icon size={20} />
                  <span className="leading-tight text-center">{label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
        {/* Main 5 items + More button */}
        <div className="flex">
          {mobileMain.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => { setActiveView(id); setMobileMore(false); }}
              className={`flex-1 flex flex-col items-center justify-center gap-1 py-2.5 text-xs font-medium transition-all
                ${activeView === id ? 'text-indigo-400' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </button>
          ))}
          <button
            onClick={() => setMobileMore(!mobileMore)}
            className={`flex-1 flex flex-col items-center justify-center gap-1 py-2.5 text-xs font-medium transition-all
              ${mobileMore || !MOBILE_MAIN.includes(activeView) ? 'text-indigo-400' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <MoreHorizontal size={20} />
            <span>Viac</span>
          </button>
        </div>
      </nav>
    </>
  );
}
