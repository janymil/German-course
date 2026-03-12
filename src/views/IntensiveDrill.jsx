import React, { useState, useEffect } from 'react';
import { Flame, Brain, Ear, Edit3, Plus, ArrowRight, Check, X as XIcon, RefreshCw, Layers } from 'lucide-react';
import { hardwordsDeck } from '../data/decks/hardwords';
import { hardwordsShadowing } from '../data/shadowingHardwords';
import { hardwords_flashcards } from '../data/decks/hardwords_flashcards';
import { normalizeGerman } from '../utils/text';
import ShadowingTrainer from './ShadowingTrainer';
import VocabTrainer from './VocabTrainer';

export default function IntensiveDrill({ progress, onNavigate }) {
  const [activeTab, setActiveTab] = useState('writing'); // default to writing
  const [customDrills, setCustomDrills] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [newWordInput, setNewWordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  // WRITING EXERCISE STATE
  const [selectedWordId, setSelectedWordId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [writingIndex, setWritingIndex] = useState(0);
  const [userInputs, setUserInputs] = useState({});
  const [showWritingResults, setShowWritingResults] = useState(false);

  useEffect(() => {
    fetch('/api/custom-drills')
      .then(res => res.json())
      .then(data => setCustomDrills(data))
      .catch(console.error);
  }, []);

  // 1. Compile Unified Data
  // We combine static hardwords (from decks) with custom API drills.
  // Static data doesn't have "missingTarget", but we can use the root word if it appears exactly in string,
  // or just ask user to type the whole sentence.
  
  const drillItems = [];
  
  // A. Static items from generate_drills.cjs
  hardwordsDeck.chapters.forEach((chapter, i) => {
    // chapter: { id: "hard_drill_0", title: "das Gespräch (rozhovor)", vocab: [{ de: "", sk: "", example: "das Gespräch" }] }
    const shadowItem = hardwordsShadowing.find(s => s.id === `hard_shadow_${i}`);
    
    // Convert to unified format
    drillItems.push({
      id: chapter.id,
      title: chapter.title,
      word: chapter.vocab[0]?.example || chapter.title.split('(')[0].trim(),
      wordSk: chapter.title.split('(')[1]?.replace(')', '') || '',
      sentences: chapter.vocab.map((v, j) => {
        // Simple logic to find the word in the sentence if it matches exactly
        const exactMatchIndex = v.de.toLowerCase().indexOf((v.example || '').toLowerCase());
        let missingTarget = null;
        if (exactMatchIndex > -1) {
          missingTarget = v.de.substring(exactMatchIndex, exactMatchIndex + (v.example || '').length);
        }
        
        return {
          id: `static_${i}_${j}`,
          de: v.de,
          sk: v.sk,
          missingTarget: missingTarget || null, // null means user types whole sentence or we just regex it
          audioId: shadowItem?.segments[j]?.id || null // h0s0
        };
      })
    });
  });

  // B. Custom API items
  customDrills.forEach((drill, i) => {
    drillItems.push({
      id: `custom_${i}`,
      title: `${drill.word} (${drill.wordSk})`,
      word: drill.word,
      wordSk: drill.wordSk,
      sentences: drill.sentences.map((s, j) => ({
        id: `custom_${i}_${j}`,
        de: s.de,
        sk: s.sk,
        missingTarget: s.missingTarget
      }))
    });
  });

  // Sort them alphabetically by word
  drillItems.sort((a, b) => a.word.localeCompare(b.word));

  const TABS = [
    { id: 'writing', label: 'Písanie', Icon: Edit3 },
    { id: 'shadowing', label: 'Shadowing', Icon: Ear },
    { id: 'flashcards', label: 'Flashcards', Icon: Brain },
    { id: 'add', label: 'Nové Slovo', Icon: Plus },
  ];

  const handleGenerate = async () => {
    if (!newWordInput.trim()) return;
    setIsGenerating(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/generate-drill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word: newWordInput.trim() })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Server error');
      
      // refresh drills
      const updatedRes = await fetch('/api/custom-drills');
      const updatedData = await updatedRes.json();
      setCustomDrills(updatedData);
      setNewWordInput('');
      setActiveTab('writing');
      setSelectedWordId(`custom_${updatedData.length - 1}`);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  // ─── Compile Overrides for Reused Components ──────────────────────────

  // For ShadowingTrainer override:
  const shadowingOverride = drillItems.map(d => ({
    id: `shadowing_ext_${d.id}`,
    categoryName: 'Intenzívny Drill',
    title: `${d.word} (Drill)`,
    description: `15 viet pre upevnenie slova "${d.word}".`,
    segments: d.sentences.map(s => ({
      id: s.audioId || s.id, // we might not have MP3 for custom ones yet, TTS fallback kicks in
      german: s.de,
      slovak: s.sk,
      category: 'drill'
    }))
  }));

  // For VocabTrainer override (we build a mock Deck)
  const vocabOverride = {
    id: 'intensive_drill_deck',
    title: 'Intenzívny Drill',
    chapters: drillItems.map(d => {
      const flashcardData = hardwords_flashcards[d.word];
      if (flashcardData) {
        return {
          id: `vocab_ext_${d.id}`,
          title: d.title,
          vocab: flashcardData.sentences.map(s => ({
            de: s[0], // German sentence from the array
            sk: s[1], // Slovak sentence from the array
            example: d.word,
            source: 'intensive'
          }))
        };
      }
      
      return {
        id: `vocab_ext_${d.id}`,
        title: d.title,
        vocab: d.sentences.map(s => ({
          de: s.de,
          sk: s.sk,
          example: d.word,
          source: 'intensive'
        }))
      };
    })
  };

  // ─── Writing Section Logic ──────────────────────────────────────────

  const selectedDrill = drillItems.find(d => d.id === selectedWordId) || drillItems[0];
  const activeWritingSentence = selectedDrill?.sentences[writingIndex];

  // Helper to chunk sentence around missingTarget
  const replaceMissingGroup = (sentence, target) => {
    if (!target) return null; // Can't find target explicitly
    const idx = sentence.toLowerCase().indexOf(target.toLowerCase());
    if (idx === -1) return null;
    
    return {
      before: sentence.substring(0, idx),
      actual: sentence.substring(idx, idx + target.length),
      after: sentence.substring(idx + target.length)
    };
  };

  const handleWritingCheck = () => {
    setShowWritingResults(true);
  };

  const handleNavigateWriting = (direction) => {
    if (direction === 'next' && writingIndex < selectedDrill.sentences.length - 1) {
      setWritingIndex(writingIndex + 1);
    } else if (direction === 'prev' && writingIndex > 0) {
      setWritingIndex(writingIndex - 1);
    }
    setShowWritingResults(false);
  };

  const renderWritingUI = () => {
    if (!selectedDrill) return <div className="text-gray-400">Žiadne slovíčka k dispozícii.</div>;

    if (!activeWritingSentence) return null;
    const parts = replaceMissingGroup(activeWritingSentence.de, activeWritingSentence.missingTarget);
    const userAnswer = userInputs[activeWritingSentence.id] || '';
    
    // Ignore case, punctuation, and umlauts for robust checking
    const isCorrect = parts && normalizeGerman(userAnswer) === normalizeGerman(parts.actual);
    const isFullSentenceCorrect = !parts && normalizeGerman(userAnswer) === normalizeGerman(activeWritingSentence.de);
    const isAnswerCorrect = parts ? isCorrect : isFullSentenceCorrect;

    return (
      <div className="flex flex-col gap-6 animate-fade-in">
        <div className="flex flex-col md:flex-row items-center gap-3 border-b border-gray-800 pb-4">
          <div className="flex-1 max-w-sm flex flex-col gap-2 w-full">
            <input 
              type="text" 
              placeholder="Hľadať slovo..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-800 border border-gray-700 text-white rounded-xl p-2 font-bold focus:ring-2 focus:ring-orange-500 focus:outline-none w-full"
            />
            <select 
              className="bg-gray-800 border border-gray-700 text-white rounded-xl p-3 font-bold focus:ring-2 focus:ring-orange-500 focus:outline-none w-full"
              value={selectedWordId || ''}
              onChange={(e) => {
                setSelectedWordId(e.target.value);
                setWritingIndex(0);
                setShowWritingResults(false);
              }}
            >
              {drillItems
                .filter(d => d.title.toLowerCase().includes(searchQuery.toLowerCase()))
                .map(d => (
                <option key={d.id} value={d.id}>{d.title}</option>
              ))}
            </select>
          </div>
          <span className="text-gray-500 text-sm font-medium mt-2 md:mt-0">Veta {writingIndex + 1} z {selectedDrill.sentences.length}</span>
        </div>

        <div className="bg-gray-800/50 rounded-2xl p-6 md:p-10 border border-gray-700/50 relative">
          <p className="text-orange-300 font-medium mb-8 text-xl text-center">{activeWritingSentence.sk}</p>

          <div className="flex flex-wrap items-center justify-center gap-2 text-2xl md:text-3xl font-bold leading-relaxed mb-10 text-center">
            {parts ? (
              <>
                <span className="text-white">{parts.before}</span>
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => {
                    setUserInputs({...userInputs, [activeWritingSentence.id]: e.target.value});
                    setShowWritingResults(false);
                  }}
                  className={`bg-gray-900 border-2 rounded-xl text-center text-white px-2 py-1 mx-1 w-full max-w-[200px] sm:max-w-[280px] focus:outline-none focus:ring-4 transition-all
                    ${showWritingResults ? (isCorrect ? 'border-emerald-500 ring-emerald-500/20 text-emerald-400' : 'border-red-500 ring-red-500/20 text-red-400') : 'border-gray-600 focus:border-orange-500 focus:ring-orange-500/30'}
                  `}
                  placeholder="doplň slovíčko"
                  disabled={showWritingResults && isCorrect}
                  autoComplete="off"
                  spellCheck="false"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      if (showWritingResults) handleNavigateWriting('next');
                      else handleWritingCheck();
                    }
                  }}
                />
                <span className="text-white">{parts.after}</span>
              </>
            ) : (
              <div className="flex flex-col w-full h-full pb-4">
                <span className="text-sm text-gray-400 mb-2 whitespace-nowrap">Napíšte celú vetu pre preklad (toto slovo nemá určený cieľ vety):</span>
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => {
                     setUserInputs({...userInputs, [activeWritingSentence.id]: e.target.value});
                     setShowWritingResults(false);
                  }}
                  className={`bg-gray-900 border-2 rounded-xl text-left text-white p-4 w-full text-xl focus:outline-none transition-all
                    ${showWritingResults ? (isFullSentenceCorrect ? 'border-emerald-500 text-emerald-400' : 'border-red-500 text-red-400') : 'border-gray-600 focus:border-orange-500'}
                  `}
                  placeholder="Napíšte celú nemeckú vetu..."
                />
              </div>
            )}
          </div>

          {showWritingResults && (
            <div className={`p-4 rounded-xl text-center font-bold text-lg mb-6 flex flex-col items-center gap-3
              ${isAnswerCorrect ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}
            >
              <div className="flex justify-center items-center gap-2">
                {isAnswerCorrect ? <Check size={24} /> : <XIcon size={24} />}
                {isAnswerCorrect ? 'Správne!' : 'Nesprávne!'}
              </div>
              
              {parts && !isCorrect && (
                <div className="text-base font-medium mt-2">
                  Správna odpoveď: <span className="text-white">{parts.actual}</span>
                </div>
              )}
              {!parts && !isFullSentenceCorrect && (
                <div className="text-base font-medium mt-2">
                  Správne: <span className="text-white">{activeWritingSentence.de}</span>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-center gap-3">
            {!showWritingResults ? (
              <button 
                onClick={handleWritingCheck}
                className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2 transition-transform active:scale-95 shadow-lg shadow-orange-600/20"
              >
                Skontrolovať <ArrowRight size={20} />
              </button>
            ) : (
              <button 
                onClick={() => handleNavigateWriting('next')}
                disabled={writingIndex >= selectedDrill.sentences.length - 1}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2 transition-transform active:scale-95 disabled:opacity-50 disabled:active:scale-100"
              >
                Ďalšia veta <ArrowRight size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto pb-20 mt-6 px-4 md:px-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-gray-800 gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
            <Flame className="text-orange-500" size={32} />
            Intenzívny Drill
          </h1>
          <p className="text-gray-400 mt-2">Komplexný tréning pre problémové slovíčka a väzby zo všetkých strán.</p>
        </div>
      </div>

      <div className="flex bg-gray-900 rounded-xl p-1 mb-6 border border-gray-800 self-start w-full overflow-x-auto">
        {TABS.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                isActive ? 'bg-orange-600 text-white shadow-lg border border-orange-500/30' : 'text-gray-400 hover:text-white hover:bg-gray-800 border border-transparent'
              }`}
            >
              <tab.Icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className={`${activeTab !== 'writing' && activeTab !== 'add' ? 'rounded-3xl shadow-2xl relative overflow-hidden' : ''}`}>
        
        {activeTab === 'writing' && renderWritingUI()}

        {activeTab === 'shadowing' && (
          <div className="bg-gray-950 -mx-4 md:mx-0 p-2 md:p-6 rounded-3xl border border-gray-800">
            <ShadowingTrainer dataOverride={shadowingOverride} />
          </div>
        )}

        {activeTab === 'flashcards' && (
          <div className="bg-gray-950 -mx-4 md:mx-0 rounded-3xl border border-gray-800 overflow-hidden">
            <VocabTrainer 
              progress={{}} 
              deckOverride={vocabOverride} 
              onMarkVocab={() => {}} 
              onMarkVocabWrong={() => {}} 
              onReviewVocab={() => {}} 
            />
          </div>
        )}

        {activeTab === 'add' && (
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 md:p-10 shadow-2xl relative">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Plus className="text-emerald-500" /> Pridať nové problémové slovíčko
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl text-sm leading-relaxed">
              Zadajte slovíčko, frázu alebo gramatickú väzbu, s ktorou máte problém (napríklad: <span className="text-white italic bg-gray-800 px-1 rounded">sich erinnern an</span>). Umelá inteligencia automaticky vytvorí 15 tréningových viet na úrovni A1/A2. Tieto vety zakomponujeme do Shadowingu a dopĺňačiek.
            </p>
            
            {errorMsg && (
             <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl mb-6 font-medium">
               Chyba: {errorMsg}
             </div>
            )}
            
            <div className="max-w-md bg-gray-800/40 p-6 rounded-2xl border border-gray-700/50">
              <label className="block text-xs uppercase tracking-wider text-gray-400 font-bold mb-2">Nemecký výraz</label>
              <input 
                type="text" 
                value={newWordInput}
                onChange={(e) => setNewWordInput(e.target.value)}
                placeholder="napr. trotzdem" 
                className="w-full bg-gray-950 border border-gray-700 text-white font-medium text-lg rounded-xl p-4 mb-6 focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all" 
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                disabled={isGenerating}
              />
              
              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !newWordInput.trim()}
                className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:hover:bg-emerald-600 text-white font-bold py-4 px-6 rounded-xl w-full flex justify-center items-center gap-2 transition-all shadow-lg shadow-emerald-600/20"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw size={20} className="animate-spin" /> Vytváram vety pre {newWordInput}...
                  </>
                ) : (
                  <>
                    <Layers size={20} /> Spracovať a vytvoriť Drill
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
