import React from 'react';
import { BookOpen, Headphones, PenLine, Mic, ArrowRight, MapPin, Briefcase, Coffee, Users, Target, Newspaper, MonitorPlay, Lightbulb } from 'lucide-react';
import { LESSONS } from '../data/curriculum';

export default function Welcome({ onNavigate, onStartLesson }) {
  return (
    <div
      className="min-h-screen relative overflow-x-hidden"
      style={{
        background:
          'radial-gradient(ellipse 90% 60% at 15% -5%, rgba(251,146,60,0.18) 0%, transparent 55%), radial-gradient(ellipse 70% 70% at 85% 105%, rgba(99,102,241,0.2) 0%, transparent 55%), #030307',
      }}
    >
      {/* Ambient orbs */}
      <div
        className="pointer-events-none absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(234,88,12,0.10) 0%, transparent 65%)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.13) 0%, transparent 65%)' }}
      />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/[0.04]">
        <div className="flex items-center gap-2">
          <span className="text-xl">🇸🇰</span>
          <span className="text-gray-700 text-sm">→</span>
          <span className="text-xl">🇦🇹</span>
          <span className="text-xs text-gray-600 ml-2 font-medium tracking-wide">Nemčina A1</span>
        </div>
        <button
          onClick={() => onNavigate('dashboard')}
          className="text-xs text-gray-700 hover:text-gray-400 transition-colors flex items-center gap-1"
        >
          Preskočiť <ArrowRight size={11} />
        </button>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-14 pb-24">

        {/* Section label */}
        <div className="flex items-center gap-3 mb-10">
          <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, rgba(251,146,60,0.4))' }} />
          <span
            className="text-[11px] font-extrabold uppercase tracking-[0.35em]"
            style={{ color: 'rgba(251,146,60,0.7)' }}
          >
            Jazykový kurz
          </span>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, transparent, rgba(251,146,60,0.4))' }} />
        </div>

        {/* Hero headline */}
        <h1
          className="font-black leading-[0.92] tracking-tighter mb-7"
          style={{ fontSize: 'clamp(3.5rem, 12vw, 7rem)' }}
        >
          <span className="block text-white">Postav si</span>
          <span className="block bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-200 bg-clip-text text-transparent pb-2">
            základy nemčiny
          </span>
          <span className="block text-white">za 16 týždňov.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed mb-3 max-w-xl">
          Každý deň <span className="text-white font-semibold">30 minút.</span> 80 lekcií.
          Jedna príbehová linka od úplných začiatkov po úroveň A1.
        </p>
        <p className="text-sm text-gray-700 mb-14 flex items-center gap-2">
          <span className="text-base">🇸🇰</span>
          Jana Nováková odišla z Bratislavy do Viedne — nasleduj jej príbeh.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-14">
          {[
            { num: '80',  unit: 'lekcií',     sub: 'jeden súvislý príbeh' },
            { num: '16',  unit: 'týždňov',    sub: '30 minút denne' },
            { num: '4×',  unit: 'zručnosti',  sub: 'čítaj · počúvaj · píš · hovor' },
          ].map(({ num, unit, sub }) => (
            <div
              key={unit}
              className="rounded-2xl border border-white/[0.06] py-6 px-4 text-center"
              style={{ background: 'rgba(255,255,255,0.025)', backdropFilter: 'blur(12px)' }}
            >
              <div className="text-5xl font-black text-white leading-none tracking-tighter">{num}</div>
              <div className="text-sm font-bold mt-1" style={{ color: 'rgba(251,146,60,0.85)' }}>{unit}</div>
              <div className="text-[11px] text-gray-600 mt-1 leading-tight">{sub}</div>
            </div>
          ))}
        </div>

        {/* Jana's journey timeline */}
        <div
          className="rounded-3xl border border-white/[0.07] p-7 mb-10"
          style={{ background: 'rgba(255,255,255,0.025)', backdropFilter: 'blur(16px)' }}
        >
          <p className="text-[11px] text-gray-600 font-bold uppercase tracking-[0.25em] mb-6">
            Janin príbeh · 4 kapitoly
          </p>
          <div className="relative">
            <div
              className="absolute top-5 left-5 right-5 h-px"
              style={{
                background:
                  'linear-gradient(to right, rgba(251,146,60,0.5), rgba(99,102,241,0.5), rgba(16,185,129,0.5))',
              }}
            />
            <div className="relative grid grid-cols-4 gap-3">
              {[
                { icon: Briefcase, week: 'T 1–4',   label: 'Prvý deň',          scene: 'HR, kancelária',    color: '#fb923c', glow: 'rgba(251,146,60,0.2)' },
                { icon: Coffee,    week: 'T 5–8',   label: 'Každodenný život',   scene: 'Kaviarne, obchody', color: '#f59e0b', glow: 'rgba(245,158,11,0.2)' },
                { icon: MapPin,    week: 'T 9–12',  label: 'Usadenie sa',        scene: 'Byt, susedia',      color: '#818cf8', glow: 'rgba(129,140,248,0.2)' },
                { icon: Users,     week: 'T 13–16', label: 'Prvé konverzácie',   scene: 'Priatelia, práca',  color: '#34d399', glow: 'rgba(52,211,153,0.2)' },
              ].map(({ icon: Icon, week, label, scene, color, glow }) => (
                <div key={week} className="flex flex-col items-center text-center gap-2.5">
                  <div
                    className="w-10 h-10 rounded-2xl border border-white/10 flex items-center justify-center relative z-10 flex-shrink-0"
                    style={{ background: glow, color }}
                  >
                    <Icon size={17} />
                  </div>
                  <div>
                    <div className="text-[10px] font-extrabold uppercase tracking-wider" style={{ color }}>{week}</div>
                    <div className="text-[12px] text-white font-bold mt-0.5 leading-tight">{label}</div>
                    <div className="text-[10px] text-gray-600 mt-0.5 leading-tight">{scene}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI feature banner */}
        <div
          className="rounded-2xl border border-violet-800/30 px-5 py-4 flex items-center gap-4 mb-10"
          style={{ background: 'rgba(139,92,246,0.07)' }}
        >
          <span className="text-3xl flex-shrink-0">🤖</span>
          <div>
            <p className="text-sm font-bold text-violet-300">AI-powered kurz</p>
            <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
              AI opravuje tvoje nemecké vety a vysvetľuje chyby po slovensky.
              Konverzačný partner v reálnych situáciách z Janiinho príbehu.
            </p>
          </div>
        </div>

        {/* Extra tools */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-10">
          {[
            { icon: Target, label: 'Cvičebná aréna', desc: 'Nekonečné cvičenia', color: '#f87171', bg: 'rgba(239,68,68,0.07)', border: 'rgba(239,68,68,0.2)' },
            { icon: Newspaper, label: 'Príbehy', desc: 'Interaktívne čítanie', color: '#22d3ee', bg: 'rgba(34,211,238,0.07)', border: 'rgba(34,211,238,0.2)' },
            { icon: MonitorPlay, label: 'Video Coach', desc: 'Videá s titulkami', color: '#f472b6', bg: 'rgba(244,114,182,0.07)', border: 'rgba(244,114,182,0.2)' },
            { icon: Lightbulb, label: 'Study Coach', desc: '6 metód učenia', color: '#a3e635', bg: 'rgba(163,230,53,0.07)', border: 'rgba(163,230,53,0.2)' },
          ].map(({ icon: Icon, label, desc, color, bg, border }) => (
            <div
              key={label}
              className="rounded-2xl py-4 px-3 flex flex-col items-center gap-2 text-center"
              style={{ background: bg, border: `1px solid ${border}` }}
            >
              <Icon size={20} style={{ color }} />
              <span className="text-xs font-bold" style={{ color }}>{label}</span>
              <span className="text-[10px] text-gray-600 leading-tight">{desc}</span>
            </div>
          ))}
        </div>

        {/* 4 skills */}
        <div className="grid grid-cols-4 gap-2 mb-10">
          {[
            { icon: BookOpen,   label: 'Čítanie',   color: '#38bdf8', bg: 'rgba(14,165,233,0.07)',  border: 'rgba(14,165,233,0.2)' },
            { icon: Headphones, label: 'Počúvanie', color: '#34d399', bg: 'rgba(16,185,129,0.07)',  border: 'rgba(16,185,129,0.2)' },
            { icon: PenLine,    label: 'Písanie',   color: '#fbbf24', bg: 'rgba(245,158,11,0.07)',   border: 'rgba(245,158,11,0.2)' },
            { icon: Mic,        label: 'Hovorenie', color: '#a78bfa', bg: 'rgba(139,92,246,0.07)',  border: 'rgba(139,92,246,0.2)' },
          ].map(({ icon: Icon, label, color, bg, border }) => (
            <div
              key={label}
              className="rounded-2xl py-5 flex flex-col items-center gap-2.5"
              style={{ background: bg, border: `1px solid ${border}` }}
            >
              <Icon size={22} style={{ color }} />
              <span className="text-xs font-bold" style={{ color }}>{label}</span>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="space-y-2.5">
          <button
            onClick={() => onStartLesson(LESSONS[0].id)}
            className="group w-full py-5 rounded-2xl font-black text-xl text-black flex items-center justify-center gap-3 transition-all hover:scale-[1.025] active:scale-[0.98]"
            style={{
              background: 'linear-gradient(130deg, #fb923c 0%, #f59e0b 100%)',
              boxShadow: '0 0 80px rgba(251,146,60,0.30), 0 25px 50px rgba(0,0,0,0.5)',
            }}
          >
            Začni Lekciu 1 — Jana prichádza do Viedne
            <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onNavigate('dashboard')}
              className="py-4 rounded-xl border border-white/[0.08] text-gray-500 text-sm font-semibold hover:bg-white/[0.04] hover:text-white transition-all"
            >
              Dashboard
            </button>
            <button
              onClick={() => onNavigate('guide')}
              className="py-4 rounded-xl border border-white/[0.08] text-gray-500 text-sm font-semibold hover:bg-white/[0.04] hover:text-white transition-all"
            >
              Príručka
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
