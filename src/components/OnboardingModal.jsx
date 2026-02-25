import React, { useState } from 'react';
import { BookOpen, Zap, CheckCircle, Volume2, Brain, FlipHorizontal, Mic, AlignLeft, ChevronRight, X } from 'lucide-react';

const STEPS = [
  {
    id: 'welcome',
    emoji: '🇩🇪',
    title: 'Vitaj v kurze nemčiny',
    subtitle: 'A1 za 16 týždňov — 30 minút denne',
    content: (
      <div className="space-y-4">
        <p className="text-gray-300 text-sm leading-relaxed">
          Táto aplikácia ťa krok za krokom prevedie celým <span className="text-indigo-300 font-semibold">kurzom A1</span> — od prvého pozdravenia až po plynulý rozhovor na základnej úrovni.
        </p>
        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            { num: '80', label: 'lekcií', color: 'text-indigo-400' },
            { num: '16', label: 'týždňov', color: 'text-emerald-400' },
            { num: '~30', label: 'min/deň', color: 'text-amber-400' },
          ].map(({ num, label, color }) => (
            <div key={label} className="bg-gray-800/60 rounded-2xl p-4 border border-gray-700/40">
              <p className={`text-3xl font-black ${color}`}>{num}</p>
              <p className="text-xs text-gray-400 mt-1">{label}</p>
            </div>
          ))}
        </div>
        <div className="bg-indigo-950/40 border border-indigo-800/40 rounded-2xl p-4">
          <p className="text-sm text-indigo-200 font-semibold mb-1">Čo budeš vedieť po A1?</p>
          <ul className="text-xs text-gray-300 space-y-1">
            <li className="flex items-center gap-2"><CheckCircle size={11} className="text-emerald-400 flex-shrink-0" />Predstaviť sa, opísať rodinu a prácu</li>
            <li className="flex items-center gap-2"><CheckCircle size={11} className="text-emerald-400 flex-shrink-0" />Orientovať sa v meste, nakupovať, objednať jedlo</li>
            <li className="flex items-center gap-2"><CheckCircle size={11} className="text-emerald-400 flex-shrink-0" />Rozumieť jednoduchým vetám v slovom aj písme</li>
            <li className="flex items-center gap-2"><CheckCircle size={11} className="text-emerald-400 flex-shrink-0" />Zvládnuť certifikát Goethe A1 alebo ÖSD A1</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 'lesson',
    emoji: '🎯',
    title: 'Ako vyzerá každá lekcia',
    subtitle: '3 kroky v každej lekcii — vždy v tomto poradí',
    content: (
      <div className="space-y-3">
        {[
          {
            step: '1',
            icon: BookOpen,
            color: 'bg-violet-900/60 border-violet-700/50',
            iconColor: 'text-violet-300',
            title: 'Gramatická poznámka',
            desc: 'Prečítaj si jedno gramatické pravidlo s príkladmi. Neklikaj len ďalej — zamysli sa nad príkladmi.',
            time: '3 min',
          },
          {
            step: '2',
            icon: Zap,
            color: 'bg-indigo-900/60 border-indigo-700/50',
            iconColor: 'text-indigo-300',
            title: '5 interaktívnych cvičení',
            desc: 'Kartičky → Výber odpovede → Doplňovanie → Počúvanie → Spájanie. Každé si precvičí slová inak.',
            time: '15–20 min',
          },
          {
            step: '3',
            icon: CheckCircle,
            color: 'bg-emerald-900/60 border-emerald-700/50',
            iconColor: 'text-emerald-300',
            title: 'Test lekcie (voliteľné)',
            desc: 'Bez nápovedy, bez TTS. Otestuj či si skutočne pochopil — nie len klikol.',
            time: '5 min',
          },
        ].map(({ step, icon: Icon, color, iconColor, title, desc, time }) => (
          <div key={step} className={`flex items-start gap-3 p-4 rounded-2xl border ${color}`}>
            <div className="w-8 h-8 rounded-xl bg-gray-900/60 flex items-center justify-center flex-shrink-0">
              <Icon size={16} className={iconColor} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-white">{title}</p>
                <span className="text-xs text-gray-500 flex-shrink-0">{time}</span>
              </div>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
        <div className="bg-amber-950/30 border border-amber-800/30 rounded-xl p-3">
          <p className="text-xs text-amber-300/80">💡 <strong>Tip:</strong> Nechoď ďalej ak si skóre pod 70 %. Radšej zopakuj cvičenie — mozog sa naučí len z aktívnej chyby a opravy.</p>
        </div>
      </div>
    ),
  },
  {
    id: 'tools',
    emoji: '🗓️',
    title: 'Čo robiť každý deň',
    subtitle: '7 dní kontaktu s nemčinou — nie 5',
    content: (
      <div className="space-y-3">
        <div className="space-y-2">
          {[
            {
              days: 'Po — Pi',
              color: 'bg-indigo-950/50 border-indigo-800/50',
              badge: 'bg-indigo-800 text-indigo-200',
              title: 'Nová lekcia',
              desc: 'Gramatika → cvičenia → test. Jedna lekcia = jeden deň.',
              icon: BookOpen,
              iconColor: 'text-indigo-400',
            },
            {
              days: 'Sobota',
              color: 'bg-emerald-950/50 border-emerald-800/50',
              badge: 'bg-emerald-800 text-emerald-200',
              title: 'Test týždňa + Slovíčka',
              desc: 'Urob týždenný test (20 otázok Goethe-štýl) + precvičuj slovíčka v MCQ alebo gap-fill móde.',
              icon: Brain,
              iconColor: 'text-emerald-400',
            },
            {
              days: 'Nedeľa',
              color: 'bg-violet-950/50 border-violet-800/50',
              badge: 'bg-violet-800 text-violet-200',
              title: 'Pasívny kontakt',
              desc: 'Počúvaj nemčinu bez sústredenia (Pasívna fáza) + prezri gramatiku v Grammatik-prehľade.',
              icon: Volume2,
              iconColor: 'text-violet-400',
            },
          ].map(({ days, color, badge, title, desc, icon: Icon, iconColor }) => (
            <div key={days} className={`flex items-start gap-3 p-3 rounded-2xl border ${color}`}>
              <span className={`text-xs font-bold px-2 py-1 rounded-lg flex-shrink-0 ${badge}`}>{days}</span>
              <div>
                <p className="text-sm font-semibold text-white">{title}</p>
                <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-gray-800/40 border border-gray-700/30 rounded-xl p-3">
          <p className="text-xs text-gray-300 font-semibold mb-1.5">Kedykoľvek navyše:</p>
          <div className="flex flex-wrap gap-2">
            {[
              { icon: FlipHorizontal, label: 'Tréner slovíčok', color: 'text-indigo-300' },
              { icon: AlignLeft, label: 'Prehľad gramatiky', color: 'text-violet-300' },
              { icon: Mic, label: 'Hovorenie v lekciách', color: 'text-emerald-300' },
            ].map(({ icon: Icon, label, color }) => (
              <div key={label} className="flex items-center gap-1.5 bg-gray-700/40 rounded-lg px-2 py-1">
                <Icon size={11} className={color} />
                <span className="text-xs text-gray-400">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

export default function OnboardingModal({ onDone }) {
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  const handleNext = () => {
    if (isLast) {
      localStorage.setItem('german_onboarded', '1');
      onDone();
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/90 backdrop-blur-sm">
      <div className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-3xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            {/* Step dots */}
            <div className="flex gap-2">
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-indigo-500' : i < step ? 'w-3 bg-indigo-700' : 'w-3 bg-gray-700'}`}
                />
              ))}
            </div>
            <button
              onClick={() => { localStorage.setItem('german_onboarded', '1'); onDone(); }}
              className="text-gray-600 hover:text-gray-400 transition-colors p-1"
            >
              <X size={16} />
            </button>
          </div>
          <div className="text-3xl mb-2">{current.emoji}</div>
          <h2 className="text-xl font-bold text-white">{current.title}</h2>
          <p className="text-sm text-gray-400 mt-1">{current.subtitle}</p>
        </div>

        {/* Scrollable content */}
        <div className="px-6 pb-2 overflow-y-auto flex-1">
          {current.content}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 pt-4 flex-shrink-0">
          <button
            onClick={handleNext}
            className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-base flex items-center justify-center gap-2 transition-all"
          >
            {isLast ? '🚀 Rozumiem, začínam!' : (
              <>
                Ďalej
                <ChevronRight size={18} />
              </>
            )}
          </button>
          <p className="text-center text-xs text-gray-600 mt-2">
            {step + 1} / {STEPS.length}
          </p>
        </div>
      </div>
    </div>
  );
}
