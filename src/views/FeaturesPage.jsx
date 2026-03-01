import React, { useState } from 'react';
import {
  BookOpen, Brain, Calendar, Headphones, Target, MessageSquare,
  MonitorPlay, Newspaper, Lightbulb, FlaskConical, GraduationCap,
  Mic, PenTool, Eye, Repeat, BarChart3, Sparkles, ChevronDown,
  ChevronUp, Star, Zap, Trophy, Clock, ArrowRight, Home
} from 'lucide-react';

/* ─── data ─── */
const FEATURES = [
  {
    id: 'lessons',
    icon: GraduationCap,
    color: 'from-indigo-500 to-violet-600',
    border: 'border-indigo-500/30',
    title: '80 štruktúrovaných lekcií',
    subtitle: 'Kompletný kurz nemčiny A1 za 16 týždňov',
    description: 'Každá lekcia obsahuje gramatiku, slovíčka a 8 rôznych cvičení. Lekcie sú usporiadané tak, aby ste sa učili postupne — od jednoduchého k zložitejšiemu. Príbeh Jany, ktorá sa sťahuje do Viedne, vás sprevádza celým kurzom.',
    highlights: [
      'Gramatická karta s vysvetlením a príkladmi',
      'Kartičky (flashcards) na nové slovíčka',
      'Priraďovanie slov (DE ↔ SK)',
      'Skladanie viet v správnom slovoslede',
      'Dopĺňanie slov do viet',
      'Posluchové cvičenie s TTS',
      'Kvíz s výberom správnej odpovede',
      'Čítanie s porozumením (mini-texty)',
      'Hovorenie s tipmi na výslovnosť',
      'AI kontrola písomného prejavu',
    ],
  },
  {
    id: 'modes',
    icon: Repeat,
    color: 'from-purple-500 to-fuchsia-600',
    border: 'border-purple-500/30',
    title: '2 režimy učenia',
    subtitle: 'Klasický alebo prekladaný — zvoľte si, čo vám viac vyhovuje',
    description: 'Pred každou lekciou si vyberiete režim. Klasický režim najprv ukáže celú teóriu a potom všetky cvičenia. Prekladaný (odporúčaný) režim striedá kúsky teórie s cvičeniami — vedecky dokázaná metóda pre lepšie zapamätanie.',
    highlights: [
      'Klasický: teória → cvičenia → výsledky',
      'Prekladaný (Interleaving): teória ↔ cvičenia striedavo',
      'Uloženie rozpracovanej lekcie — môžete pokračovať neskôr',
      'Mini-test na konci každej lekcie',
    ],
  },
  {
    id: 'vocab',
    icon: Brain,
    color: 'from-emerald-500 to-teal-600',
    border: 'border-emerald-500/30',
    title: 'Tréner slovíčok (SRS)',
    subtitle: 'Inteligentné opakovanie s algoritmom SuperMemo 2',
    description: 'Slovíčka sa vám ukazujú presne vtedy, keď ich začínate zabúdať. Systém sleduje, ktoré slová ovládate a ktoré vám robia problémy, a podľa toho upravuje frekvenciu opakovania.',
    highlights: [
      '3 režimy: kartičky, výber odpovede, doplňovanie',
      'Automatické plánovanie opakovania (Spaced Repetition)',
      'Mapa pamäte — vizuálny prehľad všetkých slovíčok',
      'Detekcia problematických slov (leeches)',
      'Možnosť pridať vlastné slovíčka',
      'AI vysvetlenie pri chybnej odpovedi',
      'Obrázky pri slovíčkach (ak sú dostupné)',
    ],
  },
  {
    id: 'grammar',
    icon: BookOpen,
    color: 'from-amber-500 to-orange-600',
    border: 'border-amber-500/30',
    title: 'Gramatický sprievodca',
    subtitle: 'Kompletná encyklopédia A1 gramatiky s AI cvičeniami',
    description: 'Všetky gramatické pravidlá z 80 lekcií na jednom mieste. Každé pravidlo môžete precvičiť v zabudovanom kvíze. AI vám vygeneruje 12 ďalších cvičení na každú tému.',
    highlights: [
      'Vyhľadávanie podľa pravidla alebo témy',
      'Príklady s výslovnosťou (TTS)',
      'AI gramatický tréner — generuje cvičenia',
      'Tlač do PDF',
      'Cvičenie výslovnosti s rozpoznávaním reči',
      'Tabuľka nemeckej abecedy a výslovnosti',
    ],
  },
  {
    id: 'arena',
    icon: Target,
    color: 'from-red-500 to-rose-600',
    border: 'border-red-500/30',
    title: 'Cvičebná aréna',
    subtitle: 'Nekonečné cvičenia na dril a opakovanie',
    description: 'Aréna čerpá cvičenia zo všetkých odomknutých lekcií a vytvára nekonečný tok úloh. Ideálne na opakovanie pred testom alebo keď chcete trénovať viac. AI generuje nové cvičenia nad rámec lekcií.',
    highlights: [
      'Preklady DE→SK a SK→DE',
      'Diktáty (počúvanie a písanie)',
      'Hovorenie nemeckých fráz',
      'Skladanie viet, kvízy, dopĺňanie',
      'Meranie času a série správnych odpovedí',
      'AI generovanie extra cvičení',
    ],
  },
  {
    id: 'stories',
    icon: Newspaper,
    color: 'from-cyan-500 to-sky-600',
    border: 'border-cyan-500/30',
    title: 'Čítanie príbehov',
    subtitle: 'Graded readers s interaktívnym slovníkom',
    description: 'Krátke príbehy prispôsobené vášmu levelu. Kliknutím na akékoľvek slovo v texte sa vám ukáže jeho gramatická karta — rod, pád, časovanie. Slová si môžete uložiť do trénera slovíčok.',
    highlights: [
      'Postupné odomykanie podľa pokroku',
      'Kliknuteľné slová → AI gramatická karta',
      'Ukladanie slov do SRS trénera',
      'Audio prehrávanie s 5 rýchlosťami',
      'Slovenský preklad na vyžiadanie',
      'Kvíz k porozumeniu textu',
      'Možnosť pridať vlastný text (AI spracovanie)',
    ],
  },
  {
    id: 'videocoach',
    icon: MonitorPlay,
    color: 'from-pink-500 to-rose-600',
    border: 'border-pink-500/30',
    title: 'Video Coach',
    subtitle: 'Učte sa z YouTube videí s interaktívnymi titulkami',
    description: 'Prehrávajte nemecké YouTube videá s titulkami, ktoré sa synchronizujú v reálnom čase. Kliknite na slovo v titulkoch a dostanete gramatickú kartu. AI rozdelí video na témy a vygeneruje cvičenia ku každej časti.',
    highlights: [
      'YouTube prehrávač s interaktívnymi titulkami',
      'Kliknuteľné slová → gramatická karta',
      'Automatický preklad titulkov do slovenčiny',
      'AI rozdelenie videa na tématické segmenty',
      'Cvičenia ku každému segmentu (MCQ, doplňovanie, slovosled)',
      'AI hlasový kouč — konverzácia o téme videa',
      'Knižnica doporučených videí',
    ],
  },
  {
    id: 'passive',
    icon: Headphones,
    color: 'from-violet-500 to-purple-600',
    border: 'border-violet-500/30',
    title: 'Pasívna fáza',
    subtitle: '50 dní počúvania a aktívneho prekladu',
    description: 'Prvých 50 dní počúvate nemecké frázy a čítate ich preklad. Od 51. dňa sa prepnete do aktívneho režimu — vidíte iba slovenský text a píšete nemecký preklad. Systém porovná vašu odpoveď so správnou.',
    highlights: [
      'Fáza 1: pasívne počúvanie s textom',
      'Fáza 2: aktívny preklad SK → DE',
      'Farebné porovnanie vašej odpovede so správnou',
      '50 dní × 8–10 fráz = 500 fráz celkovo',
      'Postupné odomykanie dní',
    ],
  },
  {
    id: 'conversation',
    icon: MessageSquare,
    color: 'from-blue-500 to-indigo-600',
    border: 'border-blue-500/30',
    title: 'AI Konverzácia',
    subtitle: '5 virtuálnych postáv na precvičovanie rozhovorov',
    description: 'Komunikujte po nemecky s AI postavami v realistických situáciách. Môžete písať alebo hovoriť. AI sa prispôsobuje vašej úrovni. Na konci dostanete spätnú väzbu — vaše chyby, nové slovíčka a tipy na zlepšenie.',
    highlights: [
      'Petra (HR manažérka) — pracovný pohovor',
      'Thomas (čašník) — objednávanie v kaviarni',
      'Herr Gruber (sused) — susedská komunikácia',
      'Dr. Fischer (lekár) — návšteva lekára',
      'Maria (predavačka) — nakupovanie',
      'Hlasový vstup — hovorte po nemecky',
      'Režim telefonátu — automatický tok rozhovoru',
      'AI spätná väzba po ukončení konverzácie',
    ],
  },
  {
    id: 'tests',
    icon: Trophy,
    color: 'from-yellow-500 to-amber-600',
    border: 'border-yellow-500/30',
    title: 'Testy a hodnotenie',
    subtitle: 'Vstupný test, lekčné testy a týždenné testy vo formáte Goethe',
    description: 'Systém testov vás pripraví na skúšku Goethe A1. Vstupný test určí vašu úroveň a odomkne lekcie. Po každej lekcii je mini-test. Týždenný test v 3 sekciách simuluje formát Goethe: počúvanie, čítanie, slovná zásoba.',
    highlights: [
      'Vstupný test — odomkne lekcie podľa úrovne',
      'Test po každej lekcii (10 otázok, bez tipov)',
      'Týždenný test (20 otázok, 3 sekcie)',
      'Formát Goethe: Hörverstehen, Leseverstehen, Wortschatz',
      'XP systém a bodovanie',
    ],
  },
  {
    id: 'plan',
    icon: Calendar,
    color: 'from-teal-500 to-emerald-600',
    border: 'border-teal-500/30',
    title: 'Týždenný plán',
    subtitle: '16-týždňový rozvrh s 5 lekciami za týždeň',
    description: 'Jasný plán, čo robiť každý deň. 5 pracovných dní = 5 lekcií. Sobota a nedeľa sú na opakovanie: týždenný test, slovíčka, pasívna fáza, gramatika. Každý týždeň má vlastnú tému a tipy.',
    highlights: [
      'Vizuálny prehľad 16 týždňov',
      'Stav dokončenia pri každej lekcii',
      'Odporúčania na víkend',
      'Postupné odomykanie lekcií',
    ],
  },
  {
    id: 'studycoach',
    icon: Lightbulb,
    color: 'from-lime-500 to-green-600',
    border: 'border-lime-500/30',
    title: 'Study Coach',
    subtitle: 'Vedecky overené metódy učenia s interaktívnymi ukážkami',
    description: 'Šesť metód učenia podložených výskumom. Každá metóda má interaktívnu ukážku, kde si ju hneď vyskúšate. Systém vám na základe vášho pokroku odporučí, čo dnes robiť.',
    highlights: [
      '6 metód: písanie, hovorenie, tieňovanie, zakrývanie, vizualizácia, farby',
      'Interaktívne demo ku každej metóde',
      'Denný plán prispôsobený vášmu pokroku',
      'Tipy počas lekcií (Study Nudge)',
    ],
  },
  {
    id: 'dashboard',
    icon: BarChart3,
    color: 'from-slate-500 to-gray-600',
    border: 'border-slate-500/30',
    title: 'Prehľad a štatistiky',
    subtitle: 'Dashboard s XP, úrovňou, sériou a grafmi aktivity',
    description: 'Dashboard je vaše centrum. Vidíte sériu dní učenia, celkové XP, úroveň, počet hotových lekcií, zvládnuté slovíčka a prečítané príbehy. Graf aktivity ukazuje vašu pravidelnůosť za posledný týždeň.',
    highlights: [
      'Denná séria (streak)',
      'XP a levelový systém',
      'Prehľad celého kurikula',
      'Tooltip s detailami pri každej lekcii',
      'Graf aktivity',
      'A2 ukážka obsahu na konci',
    ],
  },
  {
    id: 'ai',
    icon: Sparkles,
    color: 'from-fuchsia-500 to-pink-600',
    border: 'border-fuchsia-500/30',
    title: 'AI funkcie (naprieč celou appkou)',
    subtitle: 'Gemini AI poháňa kontrolu písania, konverzácie, gramatické karty a ďalšie',
    description: 'Umelá inteligencia je integrovaná na mnohých miestach: kontroluje vaše písomné cvičenia, generuje gramatické karty pri kliknutí na neznáme slovo, vytvára extra cvičenia v aréne a gramatike, a vedie konverzácie s 5 postavami.',
    highlights: [
      'AI kontrola písomného prejavu (Writing Checker)',
      'AI gramatické karty pri kliknutí na slovo',
      'AI generovanie cvičení (Aréna + Gramatika)',
      'AI konverzácia s 5 virtuálnymi postavami',
      'AI hlasový kouč pri videách',
      'AI vysvetlenie chýb pri slovíčkach',
      'AI spracovanie vlastných textov',
    ],
  },
];

/* ─── component ─── */
export default function FeaturesPage({ onNavigate }) {
  const [expandedId, setExpandedId] = useState(null);

  const toggle = (id) => setExpandedId(expandedId === id ? null : id);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 mb-4">
          <Star size={14} className="text-indigo-400" />
          <span className="text-xs font-medium text-indigo-300">Kompletný prehľad funkcií</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black mb-3">
          Čo všetko nájdete v tejto appke
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Táto aplikácia kombinuje 80 štruktúrovaných lekcií, inteligentné opakovanie slovíčok, 
          interaktívne čítanie, videá, AI konverzácie a vedecky overené metódy učenia — 
          všetko na jednom mieste.
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        {[
          { icon: GraduationCap, value: '80', label: 'lekcií', color: 'text-indigo-400' },
          { icon: Clock, value: '16', label: 'týždňov', color: 'text-emerald-400' },
          { icon: Zap, value: '14', label: 'nástrojov', color: 'text-amber-400' },
          { icon: Sparkles, value: '7', label: 'AI funkcií', color: 'text-pink-400' },
        ].map((s, i) => (
          <div key={i} className="bg-gray-900/60 border border-gray-800 rounded-xl p-4 text-center">
            <s.icon size={20} className={`${s.color} mx-auto mb-1`} />
            <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
            <div className="text-xs text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Feature cards */}
      <div className="space-y-3">
        {FEATURES.map((f) => {
          const isOpen = expandedId === f.id;
          return (
            <div
              key={f.id}
              className={`bg-gray-900/60 border ${f.border} rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'ring-1 ring-white/10' : ''}`}
            >
              {/* Header (always visible) */}
              <button
                onClick={() => toggle(f.id)}
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-gray-800/30 transition-colors"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center flex-shrink-0`}>
                  <f.icon size={22} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white text-lg leading-tight">{f.title}</h3>
                  <p className="text-sm text-gray-400 mt-0.5 truncate">{f.subtitle}</p>
                </div>
                <div className="flex-shrink-0 text-gray-500">
                  {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </button>

              {/* Expanded content */}
              {isOpen && (
                <div className="px-5 pb-5 pt-0 border-t border-gray-800/50">
                  <p className="text-gray-300 text-sm leading-relaxed mt-4 mb-4">
                    {f.description}
                  </p>
                  <div className="space-y-2">
                    {f.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${f.color} mt-1.5 flex-shrink-0`} />
                        <span className="text-gray-400">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation CTA */}
      <div className="mt-10 text-center pb-8">
        <p className="text-gray-500 text-sm mb-4">Pripravený začať?</p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => onNavigate('dashboard')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-medium text-sm transition-colors"
          >
            <Home size={16} />
            Prejsť na Dashboard
          </button>
          <button
            onClick={() => onNavigate('guide')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl font-medium text-sm transition-colors"
          >
            <BookOpen size={16} />
            Príručka
          </button>
        </div>
      </div>
    </div>
  );
}
