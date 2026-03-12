import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, Square, SkipBack, SkipForward, Ear, Eye, EyeOff, Book, Dumbbell, List } from 'lucide-react';
import { SHADOWING_STORIES } from '../data/shadowingStories';
import { GRAMMAR_DRILLS } from '../data/shadowingGrammarData';

export default function ShadowingTrainer({ dataOverride }) {
  const [mode, setMode] = useState(dataOverride ? 'drill' : 'story');
  const [activeItemId, setActiveItemId] = useState(dataOverride ? dataOverride[0]?.id : 'story-1');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [pauseProgress, setPauseProgress] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [showList, setShowList] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [voiceRate, setVoiceRate] = useState(0.85);
  const [pauseFactor, setPauseFactor] = useState(1.5);
  const [searchQuery, setSearchQuery] = useState('');

  // Refs – never cause re-renders, safe to read inside callbacks
  const audioRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  const timerRef = useRef(null);
  const isPlayingRef = useRef(false); // source of truth for "are we running?"

  const currentDataset = dataOverride ? dataOverride : (mode === 'story' ? SHADOWING_STORIES : GRAMMAR_DRILLS);
  const currentItem = currentDataset.find(item => item.id === activeItemId) || currentDataset[0] || { segments: [] };

  const activeDataList = React.useMemo(() => {
    if (mode === 'story' || !isShuffled) return currentItem.segments;
    const shuffled = [...currentItem.segments];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [currentItem, mode, isShuffled]);

  // ─── Core cleanup ───────────────────────────────────────────────────────────
  const stopAll = useCallback(() => {
    isPlayingRef.current = false;
    if (audioRef.current) {
      audioRef.current.onended = null;
      audioRef.current.onerror = null;
      audioRef.current.pause();
      audioRef.current = null;
    }
    synthRef.current.cancel();
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    setIsPlaying(false);
    setIsWaiting(false);
    setPauseProgress(0);
  }, []);

  useEffect(() => stopAll, [stopAll]);

  // ─── Wait phase (runs after audio ends) ──────────────────────────────────────
  // All parameters are passed directly, NO stale closure issue
  const beginWait = useCallback((speakMs, segText, list, idx, pFactor) => {
    if (!isPlayingRef.current) return;
    const wait = Math.max(speakMs * pFactor, segText.length * 80, 1500);
    setIsWaiting(true);
    setPauseProgress(0);
    let elapsed = 0;
    timerRef.current = setInterval(() => {
      if (!isPlayingRef.current) { clearInterval(timerRef.current); return; }
      elapsed += 50;
      setPauseProgress(Math.min(100, (elapsed / wait) * 100));
      if (elapsed >= wait) {
        clearInterval(timerRef.current);
        timerRef.current = null;
        setIsWaiting(false);
        setPauseProgress(0);
        if (idx < list.length - 1) {
          setCurrentIndex(idx + 1);
        } else {
          isPlayingRef.current = false;
          setIsPlaying(false);
        }
      }
    }, 50);
  }, []);

  // ─── Play one segment (event-driven, no useEffect loop) ─────────────────────
  const playSegment = useCallback((segment, list, idx, pFactor, vRate, modeVal, itemId) => {
    if (!isPlayingRef.current) return;

    // Clean up any previous audio without resetting isPlayingRef
    if (audioRef.current) {
      audioRef.current.onended = null;
      audioRef.current.onerror = null;
      audioRef.current.pause();
      audioRef.current = null;
    }
    synthRef.current.cancel();

    const startTime = Date.now();
    const onEnded = () => {
      if (!isPlayingRef.current) return;
      beginWait(Date.now() - startTime, segment.german, list, idx, pFactor);
    };

    // ── Try MP3 first ──
    const prefix = modeVal === 'story' ? 'story' : 'drill';
    const mp3 = new Audio(`/audio/shadowing/${prefix}_${itemId}_${segment.id}.mp3`);
    mp3.playbackRate = vRate;
    audioRef.current = mp3;

    let fallbackDone = false;
    const fallback = () => {
      if (fallbackDone || !isPlayingRef.current) return;
      fallbackDone = true;
      audioRef.current = null;

      // ── Fallback: browser TTS ──
      const utt = new SpeechSynthesisUtterance(segment.german);
      utt.lang = 'de-DE';
      utt.rate = vRate;
      const voices = synthRef.current.getVoices();
      const deVoice = voices.find(v => v.lang.startsWith('de')) || voices[0];
      if (deVoice) utt.voice = deVoice;
      utt.onend = onEnded;
      utt.onerror = () => { isPlayingRef.current = false; setIsPlaying(false); };
      synthRef.current.speak(utt);
    };

    mp3.onended = onEnded;
    mp3.onerror = fallback;
    mp3.play().catch(fallback);
  }, [beginWait]);

  // ─── Start playing from current index ────────────────────────────────────────
  const startPlaying = useCallback((list, idx, pFactor, vRate, modeVal, itemId) => {
    if (idx >= list.length) { setIsPlaying(false); return; }
    isPlayingRef.current = true;
    setIsPlaying(true);
    setIsWaiting(false);
    playSegment(list[idx], list, idx, pFactor, vRate, modeVal, itemId);
  }, [playSegment]);

  // ─── When index advances (from timer inside beginWait), play next segment ────
  const activeDataListRef = useRef(activeDataList);
  activeDataListRef.current = activeDataList;
  const pauseFactorRef = useRef(pauseFactor);
  pauseFactorRef.current = pauseFactor;
  const voiceRateRef = useRef(voiceRate);
  voiceRateRef.current = voiceRate;
  const modeRef = useRef(mode);
  modeRef.current = mode;
  const activeItemIdRef = useRef(activeItemId);
  activeItemIdRef.current = activeItemId;

  useEffect(() => {
    if (isPlayingRef.current) {
      const seg = activeDataListRef.current[currentIndex];
      if (seg) {
        setIsWaiting(false);
        playSegment(
          seg,
          activeDataListRef.current,
          currentIndex,
          pauseFactorRef.current,
          voiceRateRef.current,
          modeRef.current,
          activeItemIdRef.current
        );
      }
    }
  }, [currentIndex, playSegment]);

  // ─── Controls ────────────────────────────────────────────────────────────────
  const handlePlayPause = () => {
    if (isPlaying) {
      stopAll();
    } else {
      startPlaying(activeDataList, currentIndex, pauseFactor, voiceRate, mode, activeItemId);
    }
  };

  const handleStop = () => { stopAll(); setCurrentIndex(0); };
  const handleNext = () => { stopAll(); if (currentIndex < activeDataList.length - 1) setCurrentIndex(currentIndex + 1); };
  const handlePrev = () => { stopAll(); if (currentIndex > 0) setCurrentIndex(currentIndex - 1); };

  const handleModeSwitch = (newMode) => {
    stopAll();
    setMode(newMode);
    setActiveItemId(newMode === 'story' ? SHADOWING_STORIES[0].id : GRAMMAR_DRILLS[0].id);
    setCurrentIndex(0);
    setShowList(false);
    if (newMode === 'story') setIsShuffled(false);
  };

  const handleSelectItem = (id) => {
    stopAll();
    setActiveItemId(id);
    setCurrentIndex(0);
    setShowList(false);
  };

  // ─── Render helpers ──────────────────────────────────────────────────────────
  const currentSegment = activeDataList[currentIndex];
  const progressPercent = ((currentIndex + 1) / activeDataList.length) * 100;

  const getGenderColorClass = (category) => {
    switch (category) {
      case 'maskulin': return 'text-blue-400';
      case 'feminin': return 'text-red-400';
      case 'neutrum': return 'text-green-400';
      default: return 'text-white';
    }
  };

  const renderText = () => {
    if (!currentSegment) return null;
    const cls = mode === 'drill' && currentSegment.category
      ? getGenderColorClass(currentSegment.category)
      : 'text-white';
    return <h2 className={`text-4xl sm:text-5xl font-bold leading-tight mt-4 ${cls}`}>{currentSegment.german}</h2>;
  };

  if (!currentSegment) return <div className="p-8 text-center text-white">Načítavam...</div>;

  return (
    <div className="max-w-6xl mx-auto mt-6 pb-20">

      {/* Header & Mode Switch */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-gray-800 gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
            <Ear className="text-indigo-400" size={32} />
            Shadowing App
          </h1>
          <p className="text-gray-400 mt-2">Počúvajte s porozumením a opakujte nahlas pre perfektnú výslovnosť.</p>
        </div>
        {!dataOverride && (
          <div className="flex bg-gray-900 rounded-xl p-1 border border-gray-800 self-start md:self-auto">
            <button onClick={() => handleModeSwitch('story')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'story' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'}`}>
              <Book size={16} /> Príbehy
            </button>
            <button onClick={() => handleModeSwitch('drill')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'drill' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'}`}>
              <Dumbbell size={16} /> Gramatický Dril
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Area */}
        <div className="flex-1">
          {/* Context Actions */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 lg:hidden">
              <button onClick={() => setShowList(!showList)} className="flex items-center gap-2 text-sm text-indigo-400 font-bold bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/20">
                <List size={16} /> {showList ? 'Skryť zoznam' : 'Zobraziť zoznam'}
              </button>
            </div>
            <div className="hidden lg:block text-indigo-300 font-bold text-lg">{currentItem.title}</div>
            <div className="flex items-center gap-3 ml-auto">
              {mode === 'drill' && (
                <button
                  onClick={() => { stopAll(); setIsShuffled(!isShuffled); setCurrentIndex(0); }}
                  className={`p-2 rounded-xl transition-all text-sm font-bold flex items-center gap-2 ${isShuffled ? 'bg-amber-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
                >
                  {isShuffled ? 'Zoradiť (Unshuffle)' : 'Zmiešať (Shuffle)'}
                </button>
              )}
              <button onClick={() => setShowTranslation(!showTranslation)} className={`p-2 rounded-xl transition-all ${showTranslation ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`} title="Preklad">
                {showTranslation ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>

          {/* Display */}
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 mb-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-[-50%] right-[-10%] w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="flex flex-col items-center justify-center min-h-[300px] text-center relative z-10">
              {currentIndex > 0 && (
                <div className="absolute top-0 w-full text-gray-600 opacity-50 transform -translate-y-4 blur-[1px] text-lg font-medium">
                  {activeDataList[currentIndex - 1].german}
                </div>
              )}
              <div className="max-w-2xl mx-auto w-full">
                <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 backdrop-blur-sm relative">
                  <div className="absolute -top-3 inset-x-0 flex justify-center">
                    <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${!isPlaying ? 'bg-gray-800 text-gray-400 border border-gray-700' : isWaiting ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-pulse'}`}>
                      {isWaiting ? 'Teraz opakuj ty' : (isPlaying ? 'Počúvaj' : 'Pripravený')}
                    </span>
                  </div>
                  {renderText()}
                  {showTranslation && (
                    <p className="text-xl text-indigo-300 mt-6 font-medium">{currentSegment.slovak}</p>
                  )}
                </div>
              </div>
              {currentIndex < activeDataList.length - 1 && (
                <div className="absolute bottom-0 w-full text-gray-600 opacity-50 transform translate-y-4 blur-[1px] text-lg font-medium">
                  {activeDataList[currentIndex + 1].german}
                </div>
              )}
            </div>
            {isWaiting && (
              <div className="absolute bottom-0 left-0 h-1.5 bg-gray-800 w-full">
                <div className="h-full bg-amber-500 transition-all duration-75 ease-linear" style={{ width: `${pauseProgress}%` }} />
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-500 font-medium w-8">{currentIndex + 1}</span>
                <div className="flex-1 h-3 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 transition-all duration-300 rounded-full" style={{ width: `${progressPercent}%` }} />
                </div>
                <span className="text-xs text-gray-500 font-medium w-8">{activeDataList.length}</span>
              </div>
              <div className="flex items-center justify-center gap-6">
                <button onClick={handlePrev} disabled={currentIndex === 0} className="p-4 text-gray-400 hover:text-white disabled:opacity-30 transition-colors">
                  <SkipBack size={24} />
                </button>
                <button onClick={handlePlayPause} className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 ${isPlaying && !isWaiting ? 'bg-emerald-600 text-white' : isPlaying && isWaiting ? 'bg-amber-600 text-white' : 'bg-indigo-600 text-white'}`}>
                  {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-2" />}
                </button>
                <button onClick={handleStop} disabled={!isPlaying && currentIndex === 0} className="p-4 text-gray-400 hover:text-white disabled:opacity-30 transition-colors">
                  <Square size={24} />
                </button>
                <button onClick={handleNext} disabled={currentIndex === activeDataList.length - 1} className="p-4 text-gray-400 hover:text-white disabled:opacity-30 transition-colors">
                  <SkipForward size={24} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 pt-6 border-t border-gray-800">
                <div className="bg-gray-800/30 p-4 rounded-xl border border-gray-800">
                  <div className="flex justify-between text-sm mb-2 text-gray-400">
                    <span className="font-medium">Rýchlosť hlasu</span>
                    <span>{Math.round(voiceRate * 100)}%</span>
                  </div>
                  <input type="range" min="0.5" max="1.5" step="0.05" value={voiceRate} onChange={(e) => setVoiceRate(parseFloat(e.target.value))} className="w-full accent-indigo-500" />
                </div>
                <div className="bg-gray-800/30 p-4 rounded-xl border border-gray-800">
                  <div className="flex justify-between text-sm mb-2 text-gray-400">
                    <span className="font-medium">Očakávaný čas na tvoju reč</span>
                    <span>{pauseFactor}x dĺžky audia</span>
                  </div>
                  <input type="range" min="1.0" max="3.0" step="0.25" value={pauseFactor} onChange={(e) => setPauseFactor(parseFloat(e.target.value))} className="w-full accent-amber-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar List */}
        <div className={`lg:w-80 flex-shrink-0 ${showList ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-5 sticky top-6">
            <h3 className="text-lg font-bold text-white mb-4 border-b border-gray-800 pb-2">
              {mode === 'story' ? 'Dostupné príbehy' : 'Gramatické drily'}
            </h3>
            <div className="flex flex-col gap-3">
              {Object.entries(
                currentDataset.reduce((acc, item) => {
                  const cat = item.categoryName || (mode === 'story' ? 'Príbehy' : 'Základné Cvičenia');
                  if (!acc[cat]) acc[cat] = [];
                  acc[cat].push(item);
                  return acc;
                }, {})
              ).map(([categoryName, items]) => {
                // Determine layout for this category
                const isSpecial = categoryName === 'Problematické Slovíčka' || categoryName === 'Intenzívny Drill';
                const isExpanded = activeItemId && items.some(i => i.id === activeItemId);
                
                return (
                  <div key={categoryName} className="mb-4 last:mb-0">
                    <div className="text-xs uppercase tracking-wider text-indigo-400 font-bold mb-3 pl-2 border-b border-gray-800/50 pb-2">
                      {categoryName}
                    </div>
                    {isSpecial ? (
                      <div className="bg-gray-800/20 border border-gray-800 rounded-xl p-3">
                        <div className="text-sm font-medium text-gray-400 mb-2 px-1">Vyberte si slovíčko na drilovanie:</div>
                        <input 
                          type="text"
                          placeholder="Hľadať slovo..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-gray-900 border border-gray-700 text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2 mb-2 outline-none"
                        />
                        <select 
                          className="w-full bg-gray-900 border border-gray-700 text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 outline-none"
                          value={activeItemId}
                          onChange={(e) => handleSelectItem(e.target.value)}
                        >
                          <option value="" disabled>Zvoľte slovíčko...</option>
                          {items
                            .filter(i => i.title.toLowerCase().includes(searchQuery.toLowerCase()))
                            .sort((a,b) => a.title.localeCompare(b.title))
                            .map(item => (
                            <option key={item.id} value={item.id}>
                              {item.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        {items.map(item => (
                          <button key={item.id} onClick={() => handleSelectItem(item.id)} className={`text-left p-3 rounded-xl transition-all border ${activeItemId === item.id ? 'bg-indigo-900/40 border-indigo-500/50' : 'bg-gray-800/40 border-gray-800 hover:border-gray-700 hover:bg-gray-800/80'}`}>
                            <div className="font-bold text-gray-200 text-sm mb-1">{item.title}</div>
                            <div className="text-xs text-gray-500 line-clamp-2">{item.description}</div>
                            {mode === 'drill' && item.id === 'nominativ-deklination' && (
                              <div className="mt-3 flex gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" title="Maskulin"></span>
                                <span className="w-2.5 h-2.5 rounded-full bg-red-500" title="Feminin"></span>
                                <span className="w-2.5 h-2.5 rounded-full bg-green-500" title="Neutrum"></span>
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
