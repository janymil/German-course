import React, { useState } from 'react';
import { BookOpen, Brain, Zap, Repeat, Headphones, Shuffle, ChevronDown, ChevronUp, CheckCircle, Clock, Star, Target, AlertCircle, Volume2, FlipHorizontal, PenLine, Ear, Link2, HelpCircle, Sparkles, Key } from 'lucide-react';

const SECTIONS = [
  {
    id: 'quickstart',
    icon: Zap,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    title: 'Kde začať — prvé kroky (čítaj toto ako prvé)',
    badge: 'Štart',
    content: (
      <div className="space-y-6 text-sm text-gray-300">
        <div className="bg-emerald-950/40 border border-emerald-800/50 rounded-2xl p-5 shadow-inner">
          <p className="text-emerald-300 text-lg font-bold mb-3 flex items-center gap-2"><CheckCircle size={20} className="text-emerald-400" /> Základný princíp appky:</p>
          <p className="leading-relaxed text-emerald-100/80 text-base">Každý deň sa naučíš <strong className="text-emerald-100 font-extrabold bg-emerald-500/20 px-1.5 py-0.5 rounded">jednu novú lekciu</strong> (Po–Pi) a cez víkend len opakuješ. Nič viac, nič menej. Za 16 týždňov zvládneš úroveň A1.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { n: '1', color: 'bg-indigo-500 text-white', border: 'border-indigo-500/30', title: 'Otvoriť Plán', desc: 'Klikni na "Plán" v menu → Týždeň 1 → Lekcia 1. Tam tvoja cesta začína.' },
            { n: '2', color: 'bg-violet-500 text-white', border: 'border-violet-500/30', title: 'Prejsť lekciu poporade', desc: 'Gramatika → 5 cvičení → voliteľný test. Dôležité: Nepreskakuj poradie cvičení!' },
            { n: '3', color: 'bg-amber-500 text-white', border: 'border-amber-500/30', title: 'Výzva na víkend', desc: 'Po 5 lekciách ťa v Pláne čaká "Test týždňa". 20 náhodných otázok na overenie znalostí.' },
            { n: '4', color: 'bg-cyan-500 text-white', border: 'border-cyan-500/30', title: 'Denná rutina: Slovíčka', desc: 'Slovíčka z lekcií padajú do Trénera. Denne mu venuj 5 minút. Je to základ pre dlhodobú pamäť.' },
          ].map(({ n, color, border, title, desc }) => (
            <div key={n} className={`flex items-start gap-4 p-5 bg-gray-900/60 rounded-2xl border ${border} hover:bg-gray-800/80 transition-colors shadow-sm`}>
              <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-black flex-shrink-0 shadow-lg ${color}`}>{n}</span>
              <div>
                <p className="font-bold text-white text-base mb-1">{title}</p>
                <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-start gap-4 p-5 bg-violet-950/20 rounded-2xl border border-violet-800/30">
          <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-black flex-shrink-0 shadow-lg bg-violet-500 text-white`}>5</span>
          <div>
            <p className="font-bold text-white text-base mb-1">Voliteľné: AI Funkcie</p>
            <p className="text-sm text-gray-400 leading-relaxed mb-2">Pre plný zážitok si v ľavom menu (dole) pridaj svoj <strong>OpenAI API kľúč</strong> (sk-...). To ti odomkne konverzácie a automatické opravovanie viet.</p>
          </div>
        </div>

        <div className="bg-gray-800/40 border-l-4 border-indigo-500 rounded-r-2xl p-5">
          <p className="text-sm text-gray-300 leading-relaxed">
            <span className="text-indigo-300 font-bold block text-base mb-1">Príbeh Jany:</span>
            Každá lekcia sleduje Janu Novákovú — Slovenku, ktorá prišla pracovať do Viedne. Neučíš sa náhodné vety, učíš sa presne to, čo Jana práve prežíva: <em>"Wie schreibt man das?"</em> alebo <em>"Ich suche die U-Bahn-Station."</em> Žiadne učebnicové nudy. Uč sa po nemecky s Janou.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'why',
    icon: Target,
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/30',
    title: 'Prečo táto metodológia naozaj funguje',
    content: (
      <div className="space-y-6 text-sm text-gray-300">
        <p className="text-base leading-relaxed">
          Väčšina ľudí sa pri tréningu cudzieho jazyka spolieha na <span className="text-red-400 font-bold bg-red-500/10 px-1.5 py-0.5 rounded">neefektívne metódy</span> — opätovné čítanie textu, podčiarkovanie farebnými fixkami, tupé memorovanie tabuliek. Mozog si takto ale nevytvára dlhodobé spoje. Je to len ilúzia vedomostí.
        </p>

        <div className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-900/50">
          <p className="text-indigo-300 font-bold text-base mb-2 flex items-center gap-2"><Brain size={18} /> Veta-na-úrovni vedy</p>
          <p className="leading-relaxed mb-4">Táto aplikácia je od základov postavená na <strong>kognitívnej vede a výskume pamäti</strong>. Žiadne náhodné kvízy. Každý nástroj, ktorý v aplikácii nájdeš (kartičky, AI, doplňovačky, audiodikát), je priamo prepojený s konkrétnym vedecky overeným vzdelávacím princípom.</p>

          <div className="bg-indigo-900/30 rounded-xl p-4 border border-indigo-800/40">
            <p className="text-white font-bold mb-3">Čo môžeš s týmto systémom dosiahnuť:</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3"><CheckCircle size={18} className="text-emerald-400 mt-0.5 flex-shrink-0" /><span className="text-indigo-100">Jasnú <strong>úroveň A1 za 7-10 týždňov</strong> (pri 30–40 minútovej dennej investícii).</span></li>
              <li className="flex items-start gap-3"><CheckCircle size={18} className="text-emerald-400 mt-0.5 flex-shrink-0" /><span className="text-indigo-100">Slovnú zásobu, ktorá zostane v hlave <strong>aj po mesiacoch bez učenia</strong>, vďaka Spaced Repetition algoritmu.</span></li>
              <li className="flex items-start gap-3"><CheckCircle size={18} className="text-emerald-400 mt-0.5 flex-shrink-0" /><span className="text-indigo-100">Prirodzený cit pre gramatiku (cez uši), namiesto matematického rátania pádov.</span></li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'spaced',
    icon: Repeat,
    color: 'text-violet-400',
    bgColor: 'bg-violet-500/10',
    borderColor: 'border-violet-500/30',
    title: 'Metóda 1 — Spaced Repetition (Rozložené opakovanie)',
    badge: 'Tréner slovíčok',
    content: (
      <div className="space-y-6 text-sm text-gray-300">
        <p className="text-base leading-relaxed">
          <strong className="text-violet-300 font-bold">Hlavný princíp:</strong> Mozog zabúda informácie podľa prísnej krivky (tzv. Ebbinghausova krivka zabudnutia). Ak však informáciu zopakuješ tesne predtým, ako by ju mozog vymazal, pamäťová stopa sa masívne posilní a predĺži.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          {[
            { label: 'Učenie bez opakovania', val: '20%', sub: 'Spomenieš si po 1 dni', color: 'text-red-400', bg: 'bg-red-950/20 border-red-900/30' },
            { label: 'Náhodné čítanie textu', val: '50%', sub: 'Spomenieš si po týždni', color: 'text-amber-400', bg: 'bg-amber-950/20 border-amber-900/30' },
            { label: 'Spaced Repetition algoritmus', val: '95%', sub: 'Spomenieš si po mesiacoch', color: 'text-emerald-400', bg: 'bg-emerald-950/20 border-emerald-900/30' },
          ].map((s) => (
            <div key={s.label} className={`rounded-2xl p-5 border ${s.bg} flex flex-col justify-center`}>
              <p className={`text-4xl font-black mb-2 DropShadow ${s.color}`}>{s.val}</p>
              <p className="text-white font-bold mb-1">{s.label}</p>
              <p className="text-gray-400 text-xs">{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-800/40 rounded-2xl p-5 border border-gray-700/40">
          <p className="font-bold text-white text-base mb-3 flex items-center gap-2"><Zap size={18} className="text-violet-400" /> Ako to presne robí táto appka:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ol className="space-y-3 text-gray-300 list-decimal list-inside bg-gray-900/50 p-4 rounded-xl">
              <li>Otvoríš si sekciu <span className="text-violet-300 font-bold border-b border-violet-500 border-dashed">Slovný Tréner</span> v menu.</li>
              <li>Systém ti ukáže najprv úplne nové slová z posledných lekcií.</li>
              <li>Potom ti podhodí slovíčka, s ktorými si mal v minulosti problém.</li>
              <li>Zelené tlačidlo <strong className="text-emerald-400">"Vedel som"</strong> pošle slovo do dlhodobej pamäte (uvidíš ho neskôr).</li>
              <li>Červené <strong className="text-red-400">"Nevedel"</strong> vráti slovo hneď späť do aktuálneho zásobníka.</li>
            </ol>
            <div className="flex flex-col items-center justify-center p-4 bg-violet-900/10 border border-violet-800/30 rounded-xl text-center">
              <Repeat size={40} className="text-violet-400 mb-3 opacity-80" />
              <p className="text-violet-200 font-medium">Toto je kľúč k úspechu.</p>
              <p className="text-violet-100 font-bold text-lg mt-1">Rob aspoň 5 minút denne.</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'recall',
    icon: Brain,
    color: 'text-sky-400',
    bgColor: 'bg-sky-500/10',
    borderColor: 'border-sky-500/30',
    title: 'Metóda 2 — Active Recall (Aktívne vybavovanie)',
    badge: 'Cvičenia v lekciách',
    content: (
      <div className="space-y-6 text-sm text-gray-300">
        <p className="text-base leading-relaxed">
          <strong className="text-sky-300 font-bold">Hlavný princíp:</strong> Cielené testovanie vlastnej pamäte je oveľa účinnejšie ako len prijímanie informácií. Musíš mozog donútiť vedomosť "vyloviť". Len aktívne spomínanie fyzicky buduje nevrónové prepojenia.
        </p>

        <div className="flex items-start gap-4 p-4 bg-sky-950/20 border-l-4 border-sky-500 rounded-r-xl">
          <Brain size={24} className="text-sky-400 flex-shrink-0" />
          <p className="text-sky-100 font-medium italic">"Študenti, ktorí sa učili prostredníctvom aktívneho testovania si pamätali o <strong className="text-emerald-400 font-bold">50% viac</strong> učiva s odstupom času ako študenti, ktorí si text len zvýrazňovali a čítali dokola." <br /><span className="text-sky-500 text-xs not-italic mt-2 block">— Štúdia Roediger & Karpicke, 2006</span></p>
        </div>

        <div className="bg-gray-800/40 rounded-2xl p-5 border border-gray-700/40">
          <p className="font-bold text-white text-base mb-4 flex items-center gap-2"><Target size={18} className="text-sky-400" /> Implementácia v systéme:</p>
          <div className="grid gap-3">
            {[
              { icon: FlipHorizontal, label: 'Flashcards (Kartičky)', desc: 'Vidíš nemecké slovo → musíš ho aktívne preložiť / spomenúť si v mysli PREDTÝM ako otočíš kartu pre kontrolu.' },
              { icon: PenLine, label: 'Fill in the blank (Doplňovačky)', desc: 'Dostaneš vetu a musíš napísať chýbajúce slovo. Netipuješ. Tvoríš (produkuješ jazyk).' },
              { icon: Ear, label: 'Listening (Diktafón)', desc: 'Prijímaš akustický signál a musíš v mozgu spojiť zvuk s textom. Píšeš presne to, čo počuješ.' },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4 p-4 bg-gray-900/50 rounded-xl border border-gray-700/30 hover:border-sky-500/30 transition-colors">
                <div className="bg-sky-500/10 p-2 rounded-lg text-sky-400 flex-shrink-0">
                  <item.icon size={20} />
                </div>
                <div>
                  <span className="text-sky-300 font-bold block mb-1 text-base">{item.label}</span>
                  <span className="text-gray-400 text-sm leading-relaxed">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-950/30 border border-amber-800/50 rounded-xl p-4 flex gap-3">
          <AlertCircle size={20} className="text-amber-400 flex-shrink-0" />
          <div>
            <p className="text-amber-300 font-bold mb-1">Pozor na zlozvyk:</p>
            <p className="text-gray-300">Neotáčaj kartičku predtým, než tvoj mozog vymyslí odpoveď. Aj keď povieš zlú odpoveď a potom sa opravíš (uvidíš správnu na druhej strane), tvoja pamäť sa zosilní omnoho masívnejšie, než keby si si odpoveď len hneď zobrazil.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'interleaving',
    icon: Shuffle,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    title: 'Metóda 3 — Interleaving (Prestupné spracovanie)',
    badge: 'Štruktúra každej lekcie',
    content: (
      <div className="space-y-6 text-sm text-gray-300">
        <p className="text-base leading-relaxed">
          <strong className="text-orange-300 font-bold">Hlavný princíp:</strong> Ľudský mozog nefunguje dobre, ak doň tlačíš jeden typ úloh (blokové učenie). Ak však úlohy striedaš (Interleaving), mozgové centrá musia prekontextualizovať zadanie, čo vedie k flexibilnejšiemu a hlbšiemu ukotveniu preberaných vzorcov.
        </p>

        <div className="bg-gray-800/40 rounded-2xl p-5 border border-gray-700/50">
          <p className="font-bold text-white text-base mb-4">Pevná postupnosť úloh (neskúšaj to obabrať):</p>

          <div className="relative">
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gray-700 rounded-full hidden sm:block"></div>

            <div className="space-y-4">
              {[
                { n: 1, icon: FlipHorizontal, color: 'text-indigo-400 bg-indigo-500/10', label: 'Passive Input (Kartičky)', desc: 'Obzoznámenie. Prepojenie textu, vizuálu a zvuku.' },
                { n: 2, icon: CheckCircle, color: 'text-emerald-400 bg-emerald-500/10', label: 'Recognition (Výber odpovede)', desc: 'Mozog vidí správnu odpoveď medzi nesprávnymi. Ľahšie testovanie.' },
                { n: 3, icon: PenLine, color: 'text-amber-400 bg-amber-500/10', label: 'Production (Doplňovanie slov)', desc: 'Tvoríš jazyk ty sám. Oveľa vyššia kognitívna záťaž.' },
                { n: 4, icon: Ear, color: 'text-violet-400 bg-violet-500/10', label: 'Audio Processing (Počúvanie)', desc: 'Testuješ hranične iný neurologický kanál. Čistý posluch.' },
                { n: 5, icon: Link2, color: 'text-pink-400 bg-pink-500/10', label: 'Association Retrieval (Spájanie)', desc: 'Rýchlostné mapovanie slovensko-nemeckých štruktúr.' },
              ].map((s) => (
                <div key={s.n} className="flex flex-col sm:flex-row sm:items-center gap-4 relative z-10">
                  <div className="hidden sm:flex w-12 h-12 rounded-full bg-gray-900 border-4 border-gray-800 items-center justify-center font-black text-gray-500 z-10">{s.n}</div>

                  <div className="flex-1 flex items-start sm:items-center gap-4 bg-gray-900/80 border border-gray-700/50 rounded-2xl p-4 shadow-sm">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${s.color}`}>
                      <s.icon size={20} />
                    </div>
                    <div>
                      <span className="text-white font-bold block mb-0.5">{s.label}</span>
                      <span className="text-gray-400 text-sm leading-tight block">{s.desc}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'input',
    icon: Headphones,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    title: 'Metóda 4 — Comprehensible Input (Zrozumiteľný vstup)',
    badge: 'Integrované TTS v appke',
    content: (
      <div className="space-y-6 text-sm text-gray-300">
        <p className="text-base leading-relaxed">
          <strong className="text-emerald-300 font-bold">Krashenova hypotéza o i+1:</strong> Najlepší a najrýchlejší jazyk sa neučíš "pravidlami", ale prijímaním (počúvaním) jazyka, ktorému vďaka kontextu už takmer rozumieš, ale je o milimeter náročnejší ako tvoja súčastná úroveň.
        </p>

        <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-2xl p-6">
          <div className="flex items-start gap-4 mb-4">
            <Volume2 size={32} className="text-emerald-400 flex-shrink-0" />
            <div>
              <p className="text-xl font-bold text-emerald-100 mb-2">Každé jedno slovo je ozvučené.</p>
              <p className="text-gray-300 text-base">Na čokoľvek v aplikácii klikneš, to začne hovoriť s autentickým nemeckým prízvukom. Zodpovedá za to zabudované Web Speech API priamo v tvojom prehliadači.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 border-t border-emerald-900/50 pt-6">
            <div className="flex items-center gap-2 text-emerald-200">
              <CheckCircle size={16} className="text-emerald-500" /> V Kartičkách
            </div>
            <div className="flex items-center gap-2 text-emerald-200">
              <CheckCircle size={16} className="text-emerald-500" /> V cvičeniach Gramatiky
            </div>
            <div className="flex items-center gap-2 text-emerald-200">
              <CheckCircle size={16} className="text-emerald-500" /> V Slovnom Trénerovi
            </div>
            <div className="flex items-center gap-2 text-emerald-200">
              <CheckCircle size={16} className="text-emerald-500" /> V celých vetách (hover)
            </div>
          </div>
        </div>

        <div className="bg-gray-800/40 rounded-xl p-5 border border-gray-700/50">
          <p className="font-bold text-white mb-2">Dôležitá praktická rada:</p>
          <p className="text-gray-300 text-base">Pri robení úloh maj <strong className="text-white">vždy zapnutý zvuk</strong>. A vždy si všetko pred sebou mrmli alebo hovor rovno nahlas so systémom ("Shadowing"). Tvoje ústa a uši sú silnejší stroj na gramatiku než logická analýza textu.</p>
        </div>
      </div>
    ),
  },
  {
    id: 'tools',
    icon: Star,
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/30',
    title: 'Nástroje appky — detailný prehľad',
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-2">
        {[
          { icon: '📊', name: 'Dashboard (Prehľad)', desc: 'Tvoj centrálny bod: XP, séria dní, graf aktivity, prehľad kurikula a rýchly štart ďalšej lekcie.' },
          { icon: '📅', name: 'Týždenný plán', desc: '16-týždňový rozvrh. 5 lekcií cez týždeň + víkendové opakovanie a týždenný test.' },
          { icon: '📖', name: 'Lekcia (Jadro)', desc: 'Gramatika + 8 typov cvičení. 2 režimy: klasický alebo prekladaný (interleaving). Ukladá rozpracovaný progres.' },
          { icon: '🎧', name: 'Pasívna fáza', desc: '50 dní pasívneho počúvania (fáza 1) a aktívneho prekladu SK→DE (fáza 2). Lampariello metóda.' },
          { icon: '🧠', name: 'Tréner slovíčok', desc: 'SRS slovíčka s algoritmom SM-2. 3 režimy: kartičky, výber, doplňovanie. Mapa pamäte, detekcia leeches, AI vysvetlenia.' },
          { icon: '📚', name: 'Gramatika', desc: 'Encyklopédia všetkých gramatických pravidiel. Hľadanie, AI cvičenia, tlač do PDF.' },
          { icon: '🎯', name: 'Cvičebná aréna', desc: 'Nekonečné cvičenia zo všetkých odomknutých lekcií. Preklady, diktáty, hovorenie, skladanie viet. AI generuje extra úlohy.' },
          { icon: '📰', name: 'Čítanie (Príbehy)', desc: 'Graded readers s kliknuteľnými slovami → AI gramatická karta. Audio, kvíz, ukladanie slov do SRS.' },
          { icon: '🎬', name: 'Video Coach', desc: 'YouTube videá s interaktívnymi titulkami. Kliknuteľné slová, AI segmentácia, cvičenia ku každej časti, hlasový kouč.' },
          { icon: '💬', name: 'AI Konverzácia', desc: '5 virtuálnych postáv. Písomný aj hlasový vstup. Auto-prispôsobenie úrovni. AI spätná väzba po konverzácii.' },
          { icon: '✍️', name: 'Writing Checker', desc: 'AI kontrola nemeckých viet. Opraví chyby a vysvetlí ich po slovensky. Integrovaný v lekciách.' },
          { icon: '🧪', name: 'Vstupný test', desc: 'Placement test cez 6 úrovní. Odomkne lekcie podľa tvojej existujúcej úrovne — nemusíš začínať od nuly.' },
          { icon: '🏆', name: 'Týždenný test', desc: '20 otázok v 3 sekciách (počúvanie, čítanie, slovná zásoba). Formát Goethe A1 skúšky.' },
          { icon: '💡', name: 'Study Coach', desc: '6 vedecky overených metód učenia s interaktívnymi ukážkami. Personalizovaný denný plán podľa tvojho pokroku.' },
        ].map((t) => (
          <div key={t.name} className="flex items-start gap-4 p-5 bg-gray-900/40 rounded-2xl border border-gray-800/60 hover:border-gray-600 transition-colors">
            <span className="text-3xl flex-shrink-0 drop-shadow-md">{t.icon}</span>
            <div>
              <p className="font-bold text-white text-base mb-1">{t.name}</p>
              <p className="text-gray-400 text-sm leading-relaxed">{t.desc}</p>
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
    bgColor: 'bg-violet-500/10',
    borderColor: 'border-violet-500/30',
    title: 'AI Cvičenia (API Nastavenia)',
    badge: 'API Key a GenAI AI Agent',
    content: (
      <div className="space-y-6 text-sm text-gray-300">
        <div className="bg-gradient-to-br from-violet-900/40 to-indigo-900/20 border border-violet-800/50 rounded-3xl p-6 shadow-lg relative overflow-hidden">

          <div className="absolute top-0 right-[-10%] w-64 h-64 bg-violet-500/20 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="relative z-10">
            <p className="text-2xl font-black text-white mb-4 flex items-center gap-3">
              <Sparkles size={28} className="text-violet-400" />
              Pridaj systémovej AI mozog
            </p>

            <p className="text-lg text-violet-100/90 leading-relaxed mb-8">Aplikácia v základnom móde funguje skvele pre A1 gramatiku. AI funkcie (Gemini) sú zabudované priamo — konverzácie, gramatické karty, generovanie cvičení a kontrola písania fungujú automaticky. Pre niektoré pokročilé funkcie (Aréna) sa používa aj OpenAI.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-950/60 rounded-2xl p-5 border border-gray-800/50">
                <p className="font-bold text-violet-300 text-base mb-1">Cvičenie "Písanie Odrážok"</p>
                <p className="text-gray-400 text-sm">Systém ti v lekciách dovolí po nemecky odpovedať úplne voľne, namiesto vyklikaných odpovedí. A keď napíšeš zlý pád, po slovensky ti vysvetlí prečo.</p>
              </div>
              <div className="bg-gray-950/60 rounded-2xl p-5 border border-gray-800/50">
                <p className="font-bold text-violet-300 text-base mb-1">Voľný Chat (Nový Modul)</p>
                <p className="text-gray-400 text-sm">V menu klikni na "AI Konverzácia". Prepni rolu na postavu z knihy - napr. čašník v kaviarni, tvoj šéf, sused, a hraj roly.</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
              <p className="text-white font-bold text-base mb-3 flex items-center gap-2"><Key size={18} className="text-amber-400" /> Ako získať API Key pre aplikáciu:</p>
              <ol className="space-y-3 ms-2">
                <li className="flex gap-2">
                  <span className="text-violet-400 font-bold">1.</span>
                  <span>Choď na <a href="https://platform.openai.com" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">platform.openai.com</a> a prihlás sa.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-violet-400 font-bold">2.</span>
                  <span>Klikni vľavo na kľúčenku "API keys" a "Create new secret key". Založ si balančný kredit aspoň za 5$.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-violet-400 font-bold">3.</span>
                  <span>Kľúč vyzerá vo formáte <code className="bg-gray-900 text-green-400 px-1.5 py-0.5 rounded text-xs select-all">sk-proj-xxxxxxxx...</code> Skopíruj si ho.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-violet-400 font-bold">4.</span>
                  <span>V tejto appke vľavo celkom dole, hneď pod menu nájdeš tlačidlo zvané. <strong>API kľúč</strong> (tlačiť). Sem ho vlož. Bezpečne vojde iba do tvojho prehliadačového storage local.</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'howto',
    icon: Clock,
    color: 'text-teal-400',
    bgColor: 'bg-teal-500/10',
    borderColor: 'border-teal-500/30',
    title: 'Ideálna denná rutina na A1 základy',
    badge: 'Vzorový deň študenta',
    content: (
      <div className="space-y-6 text-sm text-gray-300">

        <div className="max-w-xl">
          <div className="flex bg-gray-900/80 rounded-2xl p-2 border border-gray-800 shadow-inner">
            {["Ráno", "Cez deň", "Večer"].map((phase, idx) => (
              <div key={idx} className="flex-1 text-center py-2 text-gray-500 font-bold uppercase tracking-wider text-xs border-r border-gray-800 last:border-0">{phase}</div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { phase: "RÁNO V MHD (5 min)", time: '05 Minút', color: 'text-violet-400 bg-violet-500/10 border-violet-500/30', label: 'Spaced Repetition Blok', desc: 'Prebehni hneď v mobile appku a choď do modulu Tréner slovíčok.' },
            { phase: "PO PRÁCI DOMA (20 min)", time: '20 Minút', color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30', label: 'Tvoja Denná Lekcia', desc: '1 Deň = 1 Lekcia. Choď do Plánu a odklepni gramatiku a kartičky vo vybranej.' },
            { phase: "PRED SPANÍM (10 min)", time: '10 Minút', color: 'text-teal-400 bg-teal-500/10 border-teal-500/30', label: 'Tuning mozgu AI botom', desc: 'Kto má API kľúč, aspoň 1 kráta konverzácia s učiteľom nech si vyčistíš pamäť.' },
          ].map((s) => (
            <div key={s.label} className="p-5 bg-gray-900/60 rounded-2xl border border-gray-800 hover:bg-gray-800/80 transition-shadow shadow-sm">
              <span className="text-[10px] font-black tracking-widest text-gray-500 mb-4 block">{s.phase}</span>
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${s.color}`}>{s.time}</span>
                <p className="font-bold text-white text-base">{s.label}</p>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-800/40 border border-gray-700/30 rounded-2xl p-5">
          <p className="text-white font-bold mb-3">Zlaté pravidlo pre samoukov:</p>
          <p className="text-gray-300 text-base leading-relaxed">
            Je <strong className="text-emerald-400">desaťkrát lepšie venovať sa učeniu prísne 25 minút každý boží deň</strong> (streak systém), než sedieť pri tom v stredu a v nedeľu 2 hodiny v kuse. Dlhodobé okno do synapsií otvoríš len na frekvenciu.  Učenie cudzí jazyk je ako posilňovna pre mozog — z jednej štvorhodinovej super-váhy svaly nenarastú, ale ak tam pôjdeč pravidelne cvičiť denne len pár kíl, prinesie to ohromne stabilné výsledky.
          </p>
        </div>
      </div>
    ),
  },
];

export default function MethodGuide() {
  const [openId, setOpenId] = useState('quickstart');

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pt-6 pb-20">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 px-4 sm:px-0">
        <div>
          <div className="flex items-center gap-4 mb-3">
            <div className="w-14 h-14 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3">
              <HelpCircle size={28} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Systémovka</h1>
          </div>
          <p className="text-gray-400 text-base font-medium max-w-2xl leading-relaxed">Táto platforma nie je slovník. Je to neurolingvistický stroj založený na kognitívnej vede, prispôsobený pre slovenčinu. Zisti, ako to celé funguje pre najrýchlejšie výsledky.</p>
        </div>
      </div>

      {/* Accordion List */}
      <div className="px-2 sm:px-0 space-y-4">
        {SECTIONS.map((s) => {
          const isOpen = openId === s.id;
          return (
            <div
              key={s.id}
              className={`rounded-3xl border transition-all duration-300 ease-in-out overflow-hidden shadow-sm
                ${isOpen ? `${s.bgColor} ${s.borderColor}` : 'border-gray-800 bg-gray-900/40 hover:bg-gray-900/60 hover:border-gray-700/80 cursor-pointer'}`}
            >
              <button
                onClick={() => setOpenId(isOpen ? null : s.id)}
                className="w-full text-left p-6 flex flex-col sm:flex-row sm:items-center gap-4 focus:outline-none"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 shadow-inner
                    ${isOpen ? `bg-gray-900 border border-gray-800 ${s.color}` : 'bg-gray-800 border border-t-gray-700 text-gray-400'}`}>
                  <s.icon size={26} strokeWidth={2.5} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <p className={`font-extrabold sm:text-lg transition-colors duration-300
                         ${isOpen ? 'text-white' : 'text-gray-300'}`}>
                      {s.title}
                    </p>
                  </div>
                  {s.badge && (
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border border-current shadow-sm ${isOpen ? s.color : 'text-gray-500 border-gray-700'}`}>
                        {s.badge}
                      </span>
                    </div>
                  )}
                </div>

                <div className={`hidden sm:flex w-10 h-10 rounded-full items-center justify-center flex-shrink-0 transition-all duration-300
                     ${isOpen ? `bg-gray-900 ${s.color}` : 'bg-gray-800 text-gray-500'}`}>
                  {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </button>

              <div
                className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-6 pb-8 pt-2">
                  {s.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
