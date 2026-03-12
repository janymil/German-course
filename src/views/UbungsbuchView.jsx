/**
 * UbungsbuchView — Deutsch Übungsbuch Grammatik A1/A2
 * Sidebar: accordion sections → chapter list
 * Main panel: ChapterRenderer for selected chapter
 *
 * Progress stored in localStorage key: ubungsbuch_progress
 */
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronDown, ChevronRight, BookOpen, Lock, CheckCircle, Star, Menu, X } from 'lucide-react';
import { UBUNGSBUCH_SECTIONS } from '../data/ubungsbuch/index';
import ChapterRenderer from '../components/ubungsbuch/ChapterRenderer';

// Lazy chapter data loader
const CHAPTER_LOADERS = {
  1: () => import('../data/ubungsbuch/chapters/ch01').then(m => m.ch01),
};

const PROGRESS_KEY = 'ubungsbuch_progress';

function loadProgress() {
  try { return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {}; } catch { return {}; }
}
function saveProgress(data) {
  try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(data)); } catch {}
}

function chapterDoneCount(chapterId, progress) {
  const cp = progress[chapterId] || {};
  return Object.keys(cp).length;
}

function chapterScore(chapterId, progress) {
  const cp = progress[chapterId] || {};
  const vals = Object.values(cp);
  if (!vals.length) return null;
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
}

export default function UbungsbuchView() {
  const [progress, setProgress] = useState(loadProgress);
  const [selectedChapterId, setSelectedChapterId] = useState(null);
  const [chapterData, setChapterData] = useState(null);
  const [loadingChapter, setLoadingChapter] = useState(false);
  const [openSections, setOpenSections] = useState({ 'verb-formen': true }); // first section open by default
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleSelectChapter = useCallback(async (chapter) => {
    if (chapter.status !== 'available') return;
    setLoadingChapter(true);
    setChapterData(null);
    setSelectedChapterId(chapter.id);
    setMobileSidebarOpen(false);
    const loader = CHAPTER_LOADERS[chapter.id];
    if (loader) {
      const data = await loader();
      setChapterData(data);
    }
    setLoadingChapter(false);
  }, []);

  const handleProgressUpdate = useCallback((chapterExerciseScores) => {
    setProgress(prev => {
      const updated = { ...prev, [selectedChapterId]: chapterExerciseScores };
      saveProgress(updated);
      return updated;
    });
  }, [selectedChapterId]);

  const toggleSection = (sectionId) => {
    setOpenSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  // Auto-open section containing selected chapter
  useEffect(() => {
    if (!selectedChapterId) return;
    const section = UBUNGSBUCH_SECTIONS.find(s => s.chapters.some(c => c.id === selectedChapterId));
    if (section) setOpenSections(prev => ({ ...prev, [section.id]: true }));
  }, [selectedChapterId]);

  const totalAvailable = UBUNGSBUCH_SECTIONS.flatMap(s => s.chapters).filter(c => c.status === 'available').length;
  const totalChapters = UBUNGSBUCH_SECTIONS.flatMap(s => s.chapters).length;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Book header */}
      <div className="px-4 py-4 border-b border-gray-800/60 flex-shrink-0">
        <div className="flex items-center gap-2 mb-0.5">
          <BookOpen size={16} className="text-cyan-400" />
          <span className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">Übungsbuch</span>
        </div>
        <h3 className="text-sm font-bold text-white leading-tight">Deutsch Grammatik A1/A2</h3>
        <p className="text-xs text-gray-500 mt-1">{totalAvailable} kapitol dostupných · {totalChapters} celkom</p>
      </div>

      {/* Sections accordion */}
      <nav className="flex-1 overflow-y-auto py-2">
        {UBUNGSBUCH_SECTIONS.map(section => {
          const isOpen = openSections[section.id];
          const sectionDone = section.chapters.filter(c => chapterDoneCount(c.id, progress) > 0).length;
          return (
            <div key={section.id}>
              {/* Section header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-left hover:bg-gray-800/40 transition-all group"
              >
                <span className="flex-1 text-xs font-bold text-gray-300 uppercase tracking-wide">{section.title}</span>
                {sectionDone > 0 && (
                  <span className="text-xs text-gray-500">{sectionDone}/{section.chapters.length}</span>
                )}
                {isOpen
                  ? <ChevronDown size={14} className="text-gray-500 flex-shrink-0" />
                  : <ChevronRight size={14} className="text-gray-500 flex-shrink-0" />}
              </button>

              {/* Chapter list */}
              {isOpen && (
                <div className="pb-1">
                  {section.chapters.map(chapter => {
                    const isSelected = selectedChapterId === chapter.id;
                    const doneCount = chapterDoneCount(chapter.id, progress);
                    const score = chapterScore(chapter.id, progress);
                    const isComingSoon = chapter.status === 'coming-soon';

                    return (
                      <button
                        key={chapter.id}
                        onClick={() => handleSelectChapter(chapter)}
                        disabled={isComingSoon}
                        className={[
                          'w-full text-left flex items-center gap-2 pl-6 pr-3 py-2 transition-all',
                          isSelected ? 'bg-cyan-900/30 border-r-2 border-cyan-500' : 'hover:bg-gray-800/30',
                          isComingSoon ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
                        ].join(' ')}
                      >
                        {/* Status icon */}
                        <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                          {isComingSoon ? (
                            <Lock size={12} className="text-gray-600" />
                          ) : doneCount > 0 ? (
                            <CheckCircle size={14} className={score >= 80 ? 'text-emerald-400' : 'text-amber-400'} />
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/60" />
                          )}
                        </span>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-gray-500 flex-shrink-0">{chapter.num}.</span>
                            <span className={`text-xs font-medium truncate ${isSelected ? 'text-cyan-200' : isComingSoon ? 'text-gray-600' : 'text-gray-300'}`}>
                              {chapter.title.replace('Verb: ', '').replace('Zeit: ', '').replace('Verb + ', '').replace('Nomen: ', '').replace('Adjektiv: ', '').replace('Präposition: ', '').replace('Satzstellung: ', '')}
                            </span>
                          </div>
                        </div>

                        {score !== null && !isComingSoon && (
                          <span className={`text-xs font-bold flex-shrink-0 ${score >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
                            {score}%
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );

  return (
    <div className="flex h-[calc(100vh-80px)] -mx-4 -my-6 overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-gray-900/80 border-r border-gray-800/60 flex-shrink-0 overflow-hidden">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/60" onClick={() => setMobileSidebarOpen(false)} />
          <aside className="relative w-72 bg-gray-900 flex flex-col overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
              <span className="font-bold text-white text-sm">Kapitoly</span>
              <button onClick={() => setMobileSidebarOpen(false)} className="text-gray-400 hover:text-white">
                <X size={18} />
              </button>
            </div>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile header bar */}
        <div className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-gray-800/60 bg-gray-900/80 sticky top-0 z-10">
          <button onClick={() => setMobileSidebarOpen(true)} className="text-gray-400 hover:text-white p-1">
            <Menu size={20} />
          </button>
          <span className="text-sm font-semibold text-white truncate">
            {selectedChapterId
              ? UBUNGSBUCH_SECTIONS.flatMap(s => s.chapters).find(c => c.id === selectedChapterId)?.title || 'Kapitola'
              : 'Deutsch Übungsbuch'}
          </span>
        </div>

        <div className="px-4 md:px-6 py-6 max-w-3xl">
          {!selectedChapterId && (
            <div className="text-center py-20 space-y-4">
              <div className="text-5xl">📖</div>
              <h2 className="text-xl font-bold text-white">Deutsch Übungsbuch Grammatik A1/A2</h2>
              <p className="text-gray-400 max-w-md mx-auto text-sm leading-relaxed">
                Interaktívne cvičenia podľa knižky. Vyber kapitolu v ľavom paneli a precvičuj gramatiku priamo online — rovnaké cvičenia ako v knihe.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                {UBUNGSBUCH_SECTIONS.flatMap(s => s.chapters).filter(c => c.status === 'available').map(ch => (
                  <button
                    key={ch.id}
                    onClick={() => handleSelectChapter(ch)}
                    className="px-4 py-2 bg-cyan-900/40 border border-cyan-700/50 hover:border-cyan-500 text-cyan-200 text-sm rounded-xl transition-all font-medium"
                  >
                    {ch.num}. {ch.title}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-600 mt-4">Ďalšie kapitoly budú pridané postupne.</p>
            </div>
          )}

          {loadingChapter && (
            <div className="text-center py-20 text-gray-500 text-sm">
              Načítavam kapitolu...
            </div>
          )}

          {!loadingChapter && chapterData && (
            <ChapterRenderer
              chapter={chapterData}
              savedProgress={progress[selectedChapterId] || {}}
              onProgressUpdate={handleProgressUpdate}
            />
          )}
        </div>
      </main>
    </div>
  );
}
