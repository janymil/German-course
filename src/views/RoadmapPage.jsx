import React, { useState } from 'react';
import {
  Map, Mic, BookMarked, Flame, Share2, Users, FileText,
  RotateCcw, Award, Palette, StickyNote, ChevronDown, ChevronUp,
  Star, Clock, Zap, Target
} from 'lucide-react';

const PRIORITY = {
  high: { label: 'Vysoká', color: 'text-red-400 bg-red-500/10 border-red-500/20' },
  medium: { label: 'Stredná', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
  low: { label: 'Nízka', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
};

const STATUS = {
  planned: { label: 'Plánované', dot: 'bg-gray-500' },
  inProgress: { label: 'V príprave', dot: 'bg-amber-500 animate-pulse' },
  done: { label: 'Hotové', dot: 'bg-emerald-500' },
};

const ROADMAP_ITEMS = [
  {
    id: 1,
    title: 'Tréner výslovnosti',
    titleDe: 'Aussprachtrainer',
    Icon: Mic,
    gradient: 'from-rose-500 to-pink-600',
    priority: 'high',
    status: 'planned',
    description: 'Pokročilý tréner výslovnosti s rozpoznávaním reči (Web Speech API). Študent hovorí nemeckú vetu a aplikácia porovná výslovnosť so vzorom.',
    features: [
      'Rozpoznávanie reči v reálnom čase',
      'Vizuálne porovnanie so správnou výslovnosťou',
      'Fonetické tipy pre ťažké hlásky (ü, ö, ä, ch, sch)',
      'Progresívne úrovne od slov po celé vety',
      'Štatistiky zlepšovania v čase',
    ],
    effort: 'Vysoká — Web Speech Recognition API + fonetická analýza',
  },
  {
    id: 2,
    title: 'Denník chýb',
    titleDe: 'Fehlertagebuch',
    Icon: BookMarked,
    gradient: 'from-violet-500 to-purple-600',
    priority: 'high',
    status: 'planned',
    description: 'Automatický zber chýb zo všetkých cvičení. Študent vidí svoje najčastejšie chyby, trendy a cielené opakovanie problematických oblastí.',
    features: [
      'Automatické loggovanie chýb z MCQ, Fill, WordOrder, Arena',
      'Kategorizácia: gramatika / slovíčka / výslovnosť',
      'Heatmapa chýb podľa lekcií a tém',
      'AI-generované mini-cvičenia na slabé miesta',
      'Sledovanie zlepšovania v čase',
    ],
    effort: 'Stredná — rozšírenie useProgress + nový view',
  },
  {
    id: 3,
    title: 'Denná výzva',
    titleDe: 'Tägliche Herausforderung',
    Icon: Flame,
    gradient: 'from-orange-500 to-red-500',
    priority: 'high',
    status: 'planned',
    description: 'Každý deň nová 5-minútová výzva s mixom cvičení. Buduje návyk denného učenia + streak motiváciu.',
    features: [
      'Automaticky generovaná z prebranej látky',
      'Mix 5 rôznych typov cvičení',
      'Časový limit 5 minút',
      'Streak bonusy a XP multiplikátory',
      'Zdieľateľný výsledok dňa',
    ],
    effort: 'Stredná — generátor mixu + časovač + streak systém',
  },
  {
    id: 4,
    title: 'Export a zdieľanie progresu',
    titleDe: 'Fortschritt exportieren',
    Icon: Share2,
    gradient: 'from-cyan-500 to-blue-500',
    priority: 'medium',
    status: 'planned',
    description: 'Export štatistík do PDF/obrázku. Zdieľanie na sociálne siete. Zálohovanie a obnova progresu.',
    features: [
      'PDF certifikát po dokončení týždňa/kurzu',
      'Share card pre sociálne siete (Instagram, Facebook)',
      'JSON export/import progresu',
      'Cloudová synchronizácia medzi zariadeniami',
      'QR kód pre zdieľanie profilu',
    ],
    effort: 'Stredná — HTML2Canvas + PDF generátor',
  },
  {
    id: 5,
    title: 'Rebríček a benchmarky',
    titleDe: 'Bestenliste',
    Icon: Users,
    gradient: 'from-emerald-500 to-teal-500',
    priority: 'low',
    status: 'planned',
    description: 'Porovnanie s ostatnými študentmi. Anonymný rebríček podľa XP, streak a dokončených lekcií.',
    features: [
      'Týždenný rebríček Top 50',
      'Anonymné prezývky (voliteľné)',
      'Porovnanie: "Si lepší ako 73% študentov"',
      'Výzvy medzi priateľmi',
      'Štatistiky komunity (priemerný streak, obľúbené lekcie)',
    ],
    effort: 'Vysoká — backend (Supabase/Firebase) + autentifikácia',
  },
  {
    id: 6,
    title: 'Gramatický ťahák',
    titleDe: 'Grammatik-Spickzettel',
    Icon: FileText,
    gradient: 'from-blue-500 to-indigo-600',
    priority: 'medium',
    status: 'planned',
    description: 'Kompaktný prehľad všetkej prebranej gramatiky na jednej stránke. Tlačiteľné A4 PDF s tabuľkami deklinácií a konjugácií.',
    features: [
      'Interaktívne konjugačné tabuľky',
      'Deklinačné tabuľky (der/die/das)',
      'Pravidlá slovosledu s príkladmi',
      'PDF export pre tlač',
      'Postupné odomykanie podľa progresu',
    ],
    effort: 'Stredná — statické dáta + PDF generátor',
  },
  {
    id: 7,
    title: 'Inteligentné opakovanie',
    titleDe: 'Intelligente Wiederholung',
    Icon: RotateCcw,
    gradient: 'from-fuchsia-500 to-pink-600',
    priority: 'high',
    status: 'planned',
    description: 'AI-riadená session opakovania. Systém vyberie slovíčka a gramatiku podľa SM-2 algoritmu a osobných slabých miest.',
    features: [
      'SM-2 spaced repetition už implementovaný — rozšírenie na gramatiku',
      'AI generuje nové vety pre opakovanie starých slovíčok',
      'Adaptívna obtiažnosť podľa úspešnosti',
      'Opakovacia session = 15 min denne',
      'Dashboard widget s počtom slov na opakovanie',
    ],
    effort: 'Stredná — rozšírenie existujúceho SM-2 + AI prompt',
  },
  {
    id: 8,
    title: 'Systém odznakov',
    titleDe: 'Abzeichen-System',
    Icon: Award,
    gradient: 'from-amber-500 to-yellow-500',
    priority: 'medium',
    status: 'planned',
    description: 'Gamifikačné odznaky za dosiahnuté míľniky. Vizuálna vitrínu v profile s animovanými odznakmi.',
    features: [
      '30+ odznakov: prvé slovo, prvá lekcia, 7-dňový streak, 100 slovíčok...',
      'Vzácne odznaky pre mimoriadne výkony',
      'Animácia pri získaní nového odznaku',
      'Vitrínu v profile',
      'Sekretné odznaky (easter eggs)',
    ],
    effort: 'Nízka — useProgress rozšírenie + UI komponent',
  },
  {
    id: 9,
    title: 'Svetlý/Tmavý režim',
    titleDe: 'Heller/Dunkler Modus',
    Icon: Palette,
    gradient: 'from-slate-400 to-gray-600',
    priority: 'low',
    status: 'planned',
    description: 'Prepínanie medzi tmavým (aktuálny) a svetlým režimom. Automatická detekcia systémového nastavenia.',
    features: [
      'Svetlý režim pre učenie v jasnom prostredí',
      'Automatická detekcia prefers-color-scheme',
      'Plynulá animácia prechodu',
      'Uloženie voľby do localStorage',
      'Kontrast optimalizovaný pre čítanie',
    ],
    effort: 'Stredná — Tailwind dark: triedy + CSS premenné',
  },
  {
    id: 10,
    title: 'Záložky a poznámky',
    titleDe: 'Lesezeichen & Notizen',
    Icon: StickyNote,
    gradient: 'from-lime-500 to-green-500',
    priority: 'medium',
    status: 'planned',
    description: 'Uloženie osobných poznámok ku každej lekcii a slovíčku. Záložkovanie ťažkých slov pre rýchly prístup.',
    features: [
      'Osobné poznámky ku každej lekcii',
      'Záložkovanie ťažkých slovíčok',
      'Tagovanie vlastnými štítkami',
      'Fulltextové vyhľadávanie v poznámkach',
      'Export poznámok',
    ],
    effort: 'Nízka — localStorage + jednoduchý editor',
  },
];

export default function RoadmapPage() {
  const [expandedId, setExpandedId] = useState(null);
  const [filterPriority, setFilterPriority] = useState('all');

  const filtered = filterPriority === 'all'
    ? ROADMAP_ITEMS
    : ROADMAP_ITEMS.filter(item => item.priority === filterPriority);

  const stats = {
    total: ROADMAP_ITEMS.length,
    high: ROADMAP_ITEMS.filter(i => i.priority === 'high').length,
    medium: ROADMAP_ITEMS.filter(i => i.priority === 'medium').length,
    low: ROADMAP_ITEMS.filter(i => i.priority === 'low').length,
    done: ROADMAP_ITEMS.filter(i => i.status === 'done').length,
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center py-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-900/30">
          <Map size={28} className="text-white" />
        </div>
        <h1 className="text-2xl font-black text-white">Roadmapa</h1>
        <p className="text-gray-400 text-sm mt-1">Plánované funkcie a vylepšenia kurzu</p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Celkom', value: stats.total, Icon: Target, color: 'text-indigo-400' },
          { label: 'Vysoká priorita', value: stats.high, Icon: Zap, color: 'text-red-400' },
          { label: 'Stredná', value: stats.medium, Icon: Clock, color: 'text-amber-400' },
          { label: 'Hotové', value: stats.done, Icon: Star, color: 'text-emerald-400' },
        ].map(s => (
          <div key={s.label} className="bg-gray-900/60 border border-gray-800/60 rounded-2xl p-3 text-center">
            <s.Icon size={16} className={`${s.color} mx-auto mb-1`} />
            <p className="text-xl font-black text-white">{s.value}</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {[
          { key: 'all', label: 'Všetky' },
          { key: 'high', label: '🔴 Vysoká' },
          { key: 'medium', label: '🟡 Stredná' },
          { key: 'low', label: '🟢 Nízka' },
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setFilterPriority(f.key)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterPriority === f.key
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-800/60 text-gray-400 hover:text-white hover:bg-gray-700/60'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Items */}
      <div className="space-y-3">
        {filtered.map(item => {
          const isExpanded = expandedId === item.id;
          const prio = PRIORITY[item.priority];
          const st = STATUS[item.status];

          return (
            <div
              key={item.id}
              className="bg-gray-900/60 border border-gray-800/60 rounded-2xl overflow-hidden transition-all hover:border-gray-700/60"
            >
              {/* Collapsed header */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="w-full flex items-center gap-4 p-4 text-left"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <item.Icon size={20} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-white">{item.title}</h3>
                    <span className="text-[10px] text-gray-600 italic">{item.titleDe}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${prio.color}`}>
                      {prio.label}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] text-gray-500">
                      <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                      {st.label}
                    </span>
                  </div>
                </div>
                <div className="text-gray-600 flex-shrink-0">
                  {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </button>

              {/* Expanded detail */}
              {isExpanded && (
                <div className="px-4 pb-4 space-y-3 border-t border-gray-800/40">
                  <p className="text-sm text-gray-300 leading-relaxed pt-3">
                    {item.description}
                  </p>

                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Plánované funkcie</p>
                    <ul className="space-y-1.5">
                      {item.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                          <span className="text-indigo-500 mt-0.5">•</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gray-800/40 rounded-xl p-3">
                    <p className="text-[11px] text-gray-500">
                      <span className="font-bold text-gray-400">Náročnosť:</span> {item.effort}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-indigo-950/40 to-purple-950/40 border border-indigo-800/30 rounded-2xl p-5 text-center">
        <p className="text-sm text-indigo-300 font-semibold mb-1">Máš nápad na novú funkciu?</p>
        <p className="text-xs text-gray-500">Napíš nám a pridáme ju do roadmapy! Kurz sa neustále vyvíja.</p>
      </div>
    </div>
  );
}
