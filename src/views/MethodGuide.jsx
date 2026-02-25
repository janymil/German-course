import React, { useState } from 'react';
import { BookOpen, Brain, Zap, Repeat, Headphones, Shuffle, ChevronDown, ChevronUp, CheckCircle, Clock, Star, Target, AlertCircle, Volume2, FlipHorizontal, PenLine, Ear, Link2, HelpCircle, Sparkles, Key } from 'lucide-react';

const SECTIONS = [
  {
    id: 'quickstart',
    icon: Zap,
    color: 'text-emerald-400',
    bg: 'bg-emerald-950/30 border-emerald-800/50',
    title: 'Kde začať — prvé kroky (čítaj toto ako prvé)',
    badge: 'Štart',
    content: (
      <div className="space-y-4 text-sm text-gray-300">
        <div className="bg-emerald-950/40 border border-emerald-800/40 rounded-2xl p-4">
          <p className="text-emerald-300 font-bold mb-2 flex items-center gap-2"><CheckCircle size={14} /> Appka funguje na jednom princípe:</p>
          <p className="leading-relaxed">Každý deň <strong className="text-white">jedna nová lekcia</strong> (Po–Pi) + opakovanie cez víkend. Nič viac, nič menej. 80 lekcií = 16 týždňov = A1.</p>
        </div>
        <div className="space-y-2">
          {[
            { n: '1', color: 'bg-indigo-800 text-indigo-200', title: 'Otvor Plán', desc: 'Klikni na "Plán" v menu → Týždeň 1 → Lekcia 1. Tam začínaš.' },
            { n: '2', color: 'bg-violet-800 text-violet-200', title: 'Prejdi lekciu v poradí', desc: 'Gramatická poznámka → 5 cvičení → voliteľný test. Nepreskakuj poradie.' },
            { n: '3', color: 'bg-amber-800 text-amber-200', title: 'V sobotu — test týždňa', desc: 'Po dokončení 5 lekcií sa v Pláne objaví "Test týždňa". 20 otázok, Goethe štýl.' },
            { n: '4', color: 'bg-cyan-800 text-cyan-200', title: 'Každý deň navyše — Slovíčka', desc: 'Klikni na "Slovíčka" a precvičuj. Aspoň 5 minút denne. To je základ zapamätania.' },
            { n: '5', color: 'bg-violet-800 text-violet-200', title: 'AI funkcie — nastav si kľúč', desc: 'Menu → "API kľúč" dole v ľavom paneli → vlož OpenAI kľúč (sk-...). Odomkne AI Writing Checker v lekciách a AI Konverzáciu s postavami z príbehu.' },
          ].map(({ n, color, title, desc }) => (
            <div key={n} className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-xl border border-gray-700/30">
              <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm font-black flex-shrink-0 ${color}`}>{n}</span>
              <div>
                <p className="font-semibold text-white">{title}</p>
                <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-gray-800/40 border border-gray-700/30 rounded-xl p-4">
          <p className="text-xs text-gray-400 leading-relaxed">
            <span className="text-white font-semibold">Príbeh Jany:</span> Každá lekcia sleduje Janu Novákovú — Slovenku, ktorá prišla pracovať do Viedne. Slovíčka aj vety sú z jej každodenných situácií. Nie učebnicové "Das ist ein Buch", ale reálne: "Wie schreibt man das?", "Ich suche die U-Bahn-Station." Uč sa s ňou.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'why',
    icon: Target,
    color: 'text-indigo-400',
    bg: 'bg-indigo-950/30 border-indigo-800/50',
    title: 'Prečo táto metodológia funguje',
    content: (
      <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
        <p>
          Väčšina ľudí sa učí jazyky <span className="text-red-400 font-medium">neefektívne</span> — čítajú gramatiku, podčiarkujú slovíčka, pozerajú sa na preklady. Mozog si takto nič nezapamätá, lebo <strong className="text-white">pasívne čítanie nevytvára dlhodobú pamäť</strong>.
        </p>
        <p>
          Táto aplikácia je postavená na <span className="text-emerald-400 font-medium">kognitívnej vede a výskume pamäti</span>. Každý nástroj v appke je priamo prepojený s vedecky overenými princípmi.
        </p>
        <div className="bg-emerald-950/30 border border-emerald-800/40 rounded-xl p-4">
          <p className="text-emerald-300 font-semibold mb-2">Výsledok správneho prístupu:</p>
          <ul className="space-y-1 text-gray-300">
            <li>✓ A1 za 7 týždňov (30–40 min denne)</li>
            <li>✓ Slovíčka si pamätáš mesiace bez opakovania</li>
            <li>✓ Gramatika sa ti „usadí" prirodzene, nie memorovaním pravidiel</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 'spaced',
    icon: Repeat,
    color: 'text-violet-400',
    bg: 'bg-violet-950/30 border-violet-800/50',
    title: 'Metóda 1 — Spaced Repetition (Rozložené opakovanie)',
    badge: 'Tréner slovíčok',
    content: (
      <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
        <p>
          <strong className="text-white">Základný princíp:</strong> Mozog zabúda podľa predvídateľnej krivky (Ebbinghausova krivka zabudnutia). Ak zopakuješ informáciu práve pred tým, ako ju zabudneš, pamäťová stopa sa výrazne predĺži.
        </p>
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          {[
            { label: 'Bez opakovania', val: '20%', sub: 'po 1 dni', c: 'text-red-400' },
            { label: 'Náhodné opakovanie', val: '50%', sub: 'po 1 týždni', c: 'text-amber-400' },
            { label: 'Spaced repetition', val: '90%', sub: 'po 1 mesiaci', c: 'text-emerald-400' },
          ].map((s) => (
            <div key={s.label} className="bg-gray-800/60 rounded-xl p-3">
              <p className={`text-2xl font-black ${s.c}`}>{s.val}</p>
              <p className="text-gray-400 mt-1">{s.label}</p>
              <p className="text-gray-600">{s.sub}</p>
            </div>
          ))}
        </div>
        <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/40">
          <p className="font-semibold text-white mb-2 flex items-center gap-2"><Brain size={14} className="text-violet-400" /> V praxi v tejto appke:</p>
          <ol className="space-y-2 text-gray-300 list-decimal list-inside">
            <li>Choď do <span className="text-violet-300 font-medium">Tréner slovíčok</span></li>
            <li>Appka ti ukazuje najprv nové slová, potom tie, čo si nevedel</li>
            <li>Po kliknutí "Vedel som" — slovo sa posúva do dlhodobej pamäti</li>
            <li>Po kliknutí "Nevedel som" — slovo sa vracia na precvičenie</li>
            <li>Robí to <strong className="text-white">každý deň aspoň 5 minút</strong></li>
          </ol>
        </div>
      </div>
    ),
  },
  {
    id: 'recall',
    icon: Brain,
    color: 'text-sky-400',
    bg: 'bg-sky-950/30 border-sky-800/50',
    title: 'Metóda 2 — Active Recall (Aktívne vybavovanie)',
    badge: 'Všetky cvičenia',
    content: (
      <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
        <p>
          <strong className="text-white">Základný princíp:</strong> Testovanie sa je <em>silnejšie</em> ako učenie. Keď sa snažíš vybavovať informáciu z pamäti (nie len čítaš), mozog vytvára silnejšie nervové spojenia.
        </p>
        <p>
          Výskum od Roedigera a Karpickeho (2006): skupiny, ktoré sa testovali namiesto opätovného čítania, si pamätali <span className="text-emerald-400 font-semibold">50% viac</span> po týždni.
        </p>
        <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/40">
          <p className="font-semibold text-white mb-3 flex items-center gap-2"><Zap size={14} className="text-sky-400" /> Ako to robí appka:</p>
          <div className="space-y-2">
            {[
              { icon: FlipHorizontal, label: 'Kartičky', desc: 'Vidíš nemecké slovo → snažíš sa vybavovať SK preklad PRED odkrytím' },
              { icon: PenLine, label: 'Doplňovanie', desc: 'Vety s prázdnym miestom — aktívne produkuješ, nie len rozpoznávaš' },
              { icon: Ear, label: 'Počúvanie', desc: 'Počuješ nemčinu → píšeš čo si počul bez oory na text' },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <item.icon size={14} className="text-sky-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-sky-300 font-medium">{item.label}: </span>
                  <span className="text-gray-400">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-amber-950/20 border border-amber-800/30 rounded-xl p-3">
          <p className="text-amber-300 text-xs font-semibold flex items-center gap-1 mb-1"><AlertCircle size={12} /> Dôležité:</p>
          <p className="text-xs text-gray-400">Nesnaž sa pozrieť na odpoveď skôr, ako sa pokúsiš si vybavovať. Aj neúspešný pokus posilňuje pamäť.</p>
        </div>
      </div>
    ),
  },
  {
    id: 'interleaving',
    icon: Shuffle,
    color: 'text-orange-400',
    bg: 'bg-orange-950/30 border-orange-800/50',
    title: 'Metóda 3 — Interleaving (Prestupné učenie)',
    badge: '5 typov cvičení',
    content: (
      <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
        <p>
          <strong className="text-white">Základný princíp:</strong> Namiesto opakovania jedného typu cvičenia dookola, <em>striedaj rôzne typy</em>. Mozog musí pri každom prechode "znovu aktivovať" vedomosti — to ich fixuje hlbšie.
        </p>
        <p>
          Výskum (Kornell &amp; Bjork, 2008): interleaving sa subjektívne zdá ťažší, ale vedie k <span className="text-emerald-400 font-semibold">43% lepším výsledkom</span> na testoch oproti blokovému učeniu.
        </p>
        <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/40">
          <p className="font-semibold text-white mb-3">Poradie cvičení v každej lekcii (pevná postupnosť):</p>
          <div className="space-y-2">
            {[
              { n: 1, icon: FlipHorizontal, label: 'Kartičky', desc: 'Pasívne spoznávanie nových slov + výslovnosť' },
              { n: 2, icon: CheckCircle, label: 'Výber odpovede', desc: 'Rozpoznávanie — ľahšia forma testovania' },
              { n: 3, icon: PenLine, label: 'Doplňovanie', desc: 'Produkcia — ťažšia, aktivuje hlbšie spracovanie' },
              { n: 4, icon: Ear, label: 'Počúvanie', desc: 'Prepínanie zmyslov — sluchový kanál' },
              { n: 5, icon: Link2, label: 'Spájanie', desc: 'Asociatívna pamäť — prepájanie pojmov' },
            ].map((s) => (
              <div key={s.n} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-orange-900/60 rounded-lg flex items-center justify-center text-xs font-bold text-orange-300 flex-shrink-0">{s.n}</div>
                <div>
                  <span className="text-orange-300 font-medium">{s.label}: </span>
                  <span className="text-gray-400 text-xs">{s.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'input',
    icon: Headphones,
    color: 'text-emerald-400',
    bg: 'bg-emerald-950/30 border-emerald-800/50',
    title: 'Metóda 4 — Comprehensible Input (Krashen)',
    badge: 'TTS výslovnosť',
    content: (
      <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
        <p>
          <strong className="text-white">Krashenova hypotéza i+1:</strong> Jazyk sa prirodzene vstrebáva, keď počúvaš/čítaš materiál, ktorý je <em>o trochu ťažší</em> ako tvoja aktuálna úroveň. Nie príliš ľahký (nudí), nie príliš ťažký (frustrácia).
        </p>
        <p>
          Aplikácia to rieši tak, že <strong className="text-white">každé nemecké slovo, veta aj príklad je ozvučený</strong> cez Text-to-Speech (Web Speech API). Mozog prepája text s výslovnosťou od prvého kontaktu.
        </p>
        <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/40">
          <p className="font-semibold text-white mb-2">Ako na to:</p>
          <ol className="space-y-2 text-gray-300 list-decimal list-inside">
            <li>V <span className="text-emerald-300">každom cvičení</span> klikaj na reproduktor / nemecké slová</li>
            <li>Pri kartičkách — vždy si <strong className="text-white">vypočuj</strong> slovo pred aj po odkrytí</li>
            <li>Pri Gramatike — klikaj na príklady a opakuj po repráku nahlas</li>
            <li>V Tréneri slovíčok — vždy nechaj prehrať zvuk pred hodnotením</li>
          </ol>
        </div>
      </div>
    ),
  },
  {
    id: 'lampariello',
    icon: Headphones,
    color: 'text-cyan-400',
    bg: 'bg-cyan-950/30 border-cyan-800/50',
    title: 'Metóda 5 — Lampariellova pasívna fáza (50 dní)',
    badge: 'Pasívna fáza (nástroj)',
    content: (
      <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
        <p>
          <strong className="text-white">Autor metódy:</strong> Luca Lampariello, polyglot hovoriaci 12 jazykmi. Jeho základný princíp: <em>najprv nechaj mozog vstrebať jazyk pasívne, bez tlaku na produkciu</em>. Produkcia príde sama — ale až keď je vstup dostatočne hlboký.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-indigo-950/40 border border-indigo-800/40 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Headphones size={14} className="text-indigo-400" />
              <span className="font-semibold text-indigo-300 text-xs uppercase tracking-wide">Dni 1–50</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Otváraš deň, počúvaš každú frázu. Vidíš nemčinu aj slovenčinu naraz. <strong className="text-white">Nič nepíšeš.</strong> Mozog vstrebáva zvuk, rytmus, intonáciu, vzorce.
            </p>
          </div>
          <div className="bg-emerald-950/30 border border-emerald-800/40 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <PenLine size={14} className="text-emerald-400" />
              <span className="font-semibold text-emerald-300 text-xs uppercase tracking-wide">Po dni 50</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Vidíš len slovenčinu, píšeš nemčinu. Appka porovná tvoju odpoveď <strong className="text-white">slovo po slove</strong> a zvýrazní rozdiely (LCS diff algoritmus).
            </p>
          </div>
        </div>
        <div className="bg-gray-800/40 border border-gray-700/30 rounded-xl p-4">
          <p className="font-semibold text-white mb-2">Prečo to funguje — neurológia:</p>
          <ul className="space-y-2 text-gray-400 text-xs">
            <li>→ Pasívne počúvanie buduje <strong className="text-white">fonologickú slučku</strong> — časť pracovnej pamäte pre jazyk</li>
            <li>→ Po 50 dňoch má mozog dostatok "zvukových vzorcov" na produkciu</li>
            <li>→ Nútená produkcia bez vstupu = frustrácia a chyby. Lampariello hovorí: <em className="text-cyan-300">"You can't pour from an empty cup."</em></li>
            <li>→ LCS diff v Fáze 2 aktivuje <strong className="text-white">error-correction mechanizmus</strong> — mozog si silno zapamätá miesta, kde sa pomýlil</li>
          </ul>
        </div>
        <div className="bg-cyan-950/20 border border-cyan-800/30 rounded-xl p-4">
          <p className="text-cyan-300 font-semibold mb-2 flex items-center gap-2">
            <CheckCircle size={13} /> Ako na to v appke:
          </p>
          <ol className="space-y-1.5 text-gray-300 list-decimal list-inside text-xs leading-relaxed">
            <li>Klikni na <span className="text-cyan-300 font-medium">Pasívna fáza</span> v menu</li>
            <li>Každý deň otvor nový deň — ideálne ráno, zabrerie 3–5 minút</li>
            <li>Klikni na reproduktor, počúvaj frázy, čítaj súčasne</li>
            <li>Dni 1–50: <strong className="text-white">len počúvaj</strong>, nenamáhaj sa pamätať</li>
            <li>Po dni 50: prepni na Fázu 2, prekladaj SK → DE, uč sa z diff</li>
          </ol>
        </div>
        <div className="bg-amber-950/20 border border-amber-800/30 rounded-xl p-3">
          <p className="text-amber-300 text-xs font-medium">Táto metóda DOPĹŇA lekcie A1 kurzu — neurob si ju namiesto lekcií, ale popri nich.</p>
        </div>
      </div>
    ),
  },
  {
    id: 'chunking',
    icon: Zap,
    color: 'text-yellow-400',
    bg: 'bg-yellow-950/30 border-yellow-800/50',
    title: 'Metóda 6 — Chunking (Celostné učenie fráz)',
    badge: 'Vety v príkladoch',
    content: (
      <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
        <p>
          <strong className="text-white">Základný princíp:</strong> Mozog si lepšie pamätá slová v <em>kontexte celých fráz</em> ako izolované slová. "Wie heißt du?" si zapamätáš lepšie ako memorovanie slova "heißen" oddelene.
        </p>
        <p>
          Každé slovíčko v appke má <span className="text-yellow-400 font-medium">príkladovú vetu</span>. Táto veta je vždy gramaticky correct A1 veta z reálneho života.
        </p>
        <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/40">
          <p className="font-semibold text-white mb-2">Rada do praxe:</p>
          <p className="text-gray-300">Pri kartičkách — pozri si <strong className="text-white">príkladovú vetu na zadnej strane</strong>. Snaž sa si zapamätať slovo cez túto vetu, nie cez preklad. Mozog zapamätá kontext, nie slová.</p>
        </div>
      </div>
    ),
  },
  {
    id: 'tools',
    icon: Star,
    color: 'text-pink-400',
    bg: 'bg-pink-950/30 border-pink-800/50',
    title: 'Nástroje appky — prehľad',
    content: (
      <div className="space-y-3 text-sm">
        {[
          {
            icon: '📊', name: 'Dashboard (Prehľad)',
            desc: 'Tvoje XP, streak, týždenná aktivita, ďalšia lekcia na urobenie. Otvor každý deň na orientáciu.',
          },
          {
            icon: '📅', name: 'Plán (7-týždenný)',
            desc: 'CEFR A1 kurz rozložený do 7 týždňov. Klikni na lekciu a začni. Lekcie sa odomykajú postupne.',
          },
          {
            icon: '📖', name: 'Lekcia (5 cvičení)',
            desc: 'Gramatická nota → Kartičky → MCQ → Doplňovanie → Počúvanie → Spájanie. Score a XP po dokončení.',
          },
          {
            icon: '🎧', name: 'Pasívna fáza (Lampariello)',
            desc: 'Dni 1–50: len počúvaj nemecké frázy. Po dni 50: prekladaj SK→DE s LCS diff. Každý deň 3–5 min.',
          },
          {
            icon: '🧠', name: 'Tréner slovíčok',
            desc: 'Spaced repetition pre všetky slovíčka. Uprednostňuje nové a zabudnuté. Robí každý deň aspoň 5 min.',
          },
          {
            icon: '📚', name: 'Gramatika',
            desc: 'Všetky gramatické pravidlá z lekcií na jednom mieste. Vyhľadávanie, príklady s TTS. Referencia na pozrenie kedykoľvek.',
          },
          {
            icon: '✍️', name: 'AI Writing Checker (v lekciách)',
            desc: 'Napíš ľubovoľnú nemeckú vetu — AI skontroluje gramatiku a vysvetlí chyby po slovensky. Vyžaduje OpenAI API kľúč.',
          },
          {
            icon: '💬', name: 'AI Konverzácia (samostatná sekcia)',
            desc: '5 postáv z Janinho príbehu. AI hovorí iba A1 nemčinou, opravuje chyby v závorke po slovensky. Po ukončení konverzácie sa uložia frázy aj opravy — správne vety aj na precvičenie. Použité slová sa automaticky pridajú do slovíčok.',
          },
          {
            icon: '🔬', name: 'Vstupný test (Placement Test)',
            desc: 'Ak ovládaš nemčinu, urob vstupný test na Dashboarde. Podľa výsledku sa odomknú lekcie, ktoré už vieš — preskočíš čo nepotrebuješ. Test je jednorazový a voliteľný.',
          },
          {
            icon: '🃏', name: 'Náhľad lekcie (hover)',
            desc: 'V prehľade kurzu prejdi myšou na ľubovoľnú lekciu — zobrazí sa detailná tabuľka: gramatické pravidlo, počet slovíčok, typy cvičení a zručnosti, ktoré lekcia rozvíja.',
          },
        ].map((t) => (
          <div key={t.name} className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-xl border border-gray-700/30">
            <span className="text-2xl flex-shrink-0">{t.icon}</span>
            <div>
              <p className="font-semibold text-white text-sm">{t.name}</p>
              <p className="text-gray-400 text-xs mt-0.5">{t.desc}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'ai',
    icon: Sparkles,
    color: 'text-violet-400',
    bg: 'bg-violet-950/30 border-violet-800/50',
    title: 'AI funkcie — opravy písania a konverzácia',
    badge: 'AI Writing Checker + AI Konverzácia',
    content: (
      <div className="space-y-4 text-sm text-gray-300">
        <div className="bg-violet-950/40 border border-violet-800/40 rounded-2xl p-4">
          <p className="text-violet-300 font-bold mb-2 flex items-center gap-2"><Sparkles size={14} /> Čo AI robí v kurze:</p>
          <p className="leading-relaxed">Dva nástroje napojené na GPT-4o-mini. Oba potrebujú tvoj vlastný OpenAI API kľúč — zadáš ho raz, zostane uložený v prehliadači.</p>
        </div>
        <div className="space-y-3">
          {[
            {
              icon: '✍️',
              title: 'AI Writing Checker',
              how: 'V niektorých lekciách je cvičenie „AI Writing Check". Napíšeš ľubovoľnú nemeckú vetu — AI opraví gramatiku a vysvetlí každú chybu po slovensky. Môžeš skúsiť znova.',
              where: 'Priamo v lekciách — cvičenie so ikonou ✨',
            },
            {
              icon: '💬',
              title: 'AI Konverzácia',
              how: 'Vyber si postavu z Janinho príbehu. AI hrá danú postavu a hovorí s tebou iba A1 nemčinou. Keď urobíš chybu, jemne ťa opraví v závorke po slovensky a pokračuje v rozhovore. Po skončení klikni „Ukončiť & uložiť" — uložia sa všetky tvoje frázy (správne aj na precvičenie) a použité slová sa automaticky pridajú do slovníka.',
              where: 'Menu → „AI Konverzácia"',
            },
          ].map(({ icon, title, how, where }) => (
            <div key={title} className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-xl border border-gray-700/30">
              <span className="text-2xl flex-shrink-0">{icon}</span>
              <div>
                <p className="font-semibold text-white">{title}</p>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">{how}</p>
                <p className="text-xs text-violet-400/70 mt-1.5 font-medium">{where}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-amber-950/20 border border-amber-800/30 rounded-xl p-4">
          <p className="text-amber-300 font-semibold mb-2 flex items-center gap-2"><Key size={13} /> Ako nastaviť API kľúč:</p>
          <div className="space-y-1 text-xs text-gray-400">
            <p>1. Zaregistruj sa na <span className="text-indigo-400">platform.openai.com</span></p>
            <p>2. Dashboard → API Keys → Create new secret key</p>
            <p>3. Skopíruj kľúč (sk-proj-...)</p>
            <p>4. V appke: dole v ľavom menu klikni <strong className="text-white">„API kľúč"</strong> a vlož ho</p>
          </div>
          <p className="text-xs text-gray-600 mt-3">GPT-4o-mini = centy za hodiny A1 kurzu. Kľúč sa ukladá iba do tvojho prehliadača, nikam inam sa neposiela.</p>
        </div>
      </div>
    ),
  },
  {
    id: 'howto',
    icon: Clock,
    color: 'text-teal-400',
    bg: 'bg-teal-950/30 border-teal-800/50',
    title: 'Odporúčaný denný postup',
    content: (
      <div className="space-y-3 text-sm text-gray-300">
        <div className="grid grid-cols-1 gap-2">
          {[
            { time: '3–5 min', color: 'bg-cyan-800 text-cyan-200', label: 'Pasívna fáza', desc: 'Ráno, otvor dnešný deň. Len počúvaj frázy — žiadne písanie, žiadny stres.' },
            { time: '5 min', color: 'bg-violet-800 text-violet-200', label: 'Tréner slovíčok', desc: 'Spaced repetition. Funguje najlepšie ráno, keď je mozog čerstvý.' },
            { time: '20 min', color: 'bg-indigo-800 text-indigo-200', label: '1 lekcia', desc: 'V plane otvor ďalšiu lekciu. Gramatika + 5 cvičení. Neponáhľaj sa.' },
            { time: '5 min', color: 'bg-teal-800 text-teal-200', label: 'Gramatika (voliteľné)', desc: 'Prezri si pravidlá dnešnej lekcie. Klikni na príklady, hovor nahlas.' },
          { time: '10 min', color: 'bg-violet-800 text-violet-200', label: 'AI Konverzácia (voliteľné)', desc: 'Menu → "AI Konverzácia" → vyber postavu z Janinho príbehu. Precvičuj hovorenie — AI opraví chyby po slovensky.' },
          ].map((s) => (
            <div key={s.label} className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-xl border border-gray-700/30">
              <span className={`${s.color} px-2 py-1 rounded-lg text-xs font-bold flex-shrink-0`}>{s.time}</span>
              <div>
                <p className="font-semibold text-white">{s.label}</p>
                <p className="text-gray-400 text-xs mt-0.5">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-amber-950/20 border border-amber-800/30 rounded-xl p-4">
          <p className="text-amber-300 font-semibold mb-2">Anti-prokrastinačný trik:</p>
          <p className="text-gray-300">Keď nechceš, povedz si: <em className="text-white">"Urobím len Tréner slovíčok, 5 minút."</em> Keď začneš, väčšinou urobíš aj lekciu. Streak je motivácia — neprerušuj ho.</p>
        </div>
        <div className="bg-gray-800/40 border border-gray-700/30 rounded-xl p-4">
          <p className="text-white font-semibold mb-2">Čo NErobiť:</p>
          <ul className="space-y-1 text-gray-400 text-xs">
            <li>✗ Nekukaj na gramatiku pasívne bez cvičení</li>
            <li>✗ Nepreskakuj cvičenia (aj ľahké posilňujú pamäť)</li>
            <li>✗ Neučiť sa 2 hodiny raz za týždeň — radšej 15 min denne</li>
            <li>✗ Neignoruj TTS — výslovnosť je kritická pre A1</li>
          </ul>
        </div>
      </div>
    ),
  },
];

export default function MethodGuide() {
  const [openId, setOpenId] = useState('quickstart');

  return (
    <div className="max-w-2xl mx-auto space-y-3">
      <div className="flex items-center gap-3 mb-6">
        <HelpCircle size={22} className="text-indigo-400" />
        <div>
          <h2 className="text-2xl font-bold text-white">Príručka &amp; Metodológia</h2>
          <p className="text-xs text-gray-500 mt-0.5">Ako používať túto appku + prečo to funguje</p>
        </div>
      </div>

      {SECTIONS.map((s) => {
        const isOpen = openId === s.id;
        return (
          <div key={s.id} className={`rounded-2xl border transition-all ${isOpen ? s.bg : 'border-gray-800 bg-gray-900/60'}`}>
            <button
              onClick={() => setOpenId(isOpen ? null : s.id)}
              className="w-full text-left p-5 flex items-center gap-4"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isOpen ? s.bg : 'bg-gray-800'} border ${isOpen ? 'border-current' : 'border-gray-700'}`}>
                <s.icon size={18} className={s.color} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-semibold text-sm ${isOpen ? 'text-white' : 'text-gray-300'}`}>{s.title}</p>
                {s.badge && (
                  <span className={`text-xs ${s.color} opacity-75`}>Nástroj: {s.badge}</span>
                )}
              </div>
              {isOpen
                ? <ChevronUp size={16} className="text-gray-500 flex-shrink-0" />
                : <ChevronDown size={16} className="text-gray-500 flex-shrink-0" />}
            </button>

            {isOpen && (
              <div className="px-5 pb-5 border-t border-white/5 pt-4">
                {s.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
