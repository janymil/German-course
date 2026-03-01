import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './views/Dashboard';
import Welcome from './views/Welcome';
import WeeklyPlan from './views/WeeklyPlan';
import LessonView from './views/LessonView';
import LessonViewInterleaved from './views/LessonViewInterleaved';
import LessonModeSelect from './views/LessonModeSelect';
import VocabTrainer from './views/VocabTrainer';
import GrammarGuide from './views/GrammarGuide';
import MethodGuide from './views/MethodGuide';
import PassivePhase from './views/PassivePhase';
import ExerciseArena from './views/ExerciseArena';
import { useProgress } from './hooks/useProgress';
import { LESSONS, WEEKLY_PLAN } from './data/curriculum';
import WeeklyTest from './views/WeeklyTest';
import AIConversation from './views/AIConversation';
import APIKeyModal from './components/APIKeyModal';
import PlacementTest from './views/PlacementTest';
import StudyCoachPage from './views/StudyCoachPage';
import StoryBrowser from './views/StoryBrowser';
import StoryReader from './views/StoryReader';
import VideoCoach from './views/VideoCoach';
import FeaturesPage from './views/FeaturesPage';
import RoadmapPage from './views/RoadmapPage';
import OnboardingModal from './components/OnboardingModal';

export default function App() {
  const [activeView, setActiveView] = useState(() => {
    try {
      let raw = localStorage.getItem('german_progress_cache');
      if (!raw) raw = localStorage.getItem('german_progress_v2');
      const data = raw ? JSON.parse(raw) : null;
      const hasProgress = data && (Object.keys(data.completedLessons || {}).length > 0 || data.xp > 0);
      return hasProgress ? 'dashboard' : 'welcome';
    } catch { return 'welcome'; }
  });
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [lessonMode, setLessonMode] = useState(null);
  const [selectedWeekNum, setSelectedWeekNum] = useState(null);
  const [showApiKey, setShowApiKey] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(() => !localStorage.getItem('german_onboarded'));
  const [selectedStoryId, setSelectedStoryId] = useState(null);
  const { progress, completeLesson, markVocabSeen, markVocabWrong, reviewVocab, saveConversationPhrases, completeWeeklyTest, completePlacementTest, completeStory, addCustomVocab, saveLessonState, resetLesson, resetProgress } = useProgress();
  const [backendDown, setBackendDown] = useState(false);

  useEffect(() => {
    fetch('/api/progress').then(r => { if (r.ok) setBackendDown(false); else setBackendDown(true); }).catch(() => setBackendDown(true));
  }, []);

  const handleStartLesson = (id) => {
    setSelectedLessonId(id);
    const savedState = progress?.lessonStates?.[id];
    if (savedState?.mode) {
      setLessonMode(savedState.mode);
      setActiveView('lesson');
    } else {
      setActiveView('lesson_mode_select');
    }
  };

  const handleSelectLessonMode = (mode) => {
    setLessonMode(mode);
    setActiveView('lesson');
  };

  const handleCompleteLesson = (id, avgScore, xpReward) => {
    completeLesson(id, avgScore, xpReward);
    setSelectedLessonId(null);
    setLessonMode(null);
    setActiveView('dashboard');
  };

  const handleBack = () => {
    setSelectedLessonId(null);
    setLessonMode(null);
    setActiveView('weekly');
  };

  const handleStartWeeklyTest = (weekNum) => {
    setSelectedWeekNum(weekNum);
    setActiveView('weeklytest');
  };

  const handleCompleteWeeklyTest = (weekNum, score) => {
    completeWeeklyTest(weekNum, score);
    setActiveView('weekly');
  };

  const handleStartPlacementTest = () => setActiveView('placement');

  const handleCompletePlacementTest = (unlockedUpTo) => {
    completePlacementTest(unlockedUpTo);
    setActiveView('dashboard');
  };

  const handleSkipPlacementTest = () => {
    completePlacementTest(0);
    setActiveView('dashboard');
  };

  const selectedLesson = selectedLessonId ? LESSONS.find((l) => l.id === selectedLessonId) : null;

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      {activeView !== 'lesson' && activeView !== 'weeklytest' && activeView !== 'welcome' && activeView !== 'placement' && activeView !== 'lesson_mode_select' && (
        <Sidebar activeView={activeView} setActiveView={setActiveView} onOpenAPIKey={() => setShowApiKey(true)} />
      )}

      <main className={`flex-1 overflow-y-auto ${activeView !== 'lesson' && activeView !== 'weeklytest' && activeView !== 'welcome' && activeView !== 'placement' && activeView !== 'lesson_mode_select' ? 'pb-20 md:pb-0' : ''}`}>
        <div className={`${activeView === 'welcome' ? '' : 'w-full mx-auto px-4 py-6'}`}>
          {showApiKey && <APIKeyModal onClose={() => setShowApiKey(false)} />}
          {showOnboarding && activeView !== 'welcome' && (
            <OnboardingModal onDone={() => setShowOnboarding(false)} />
          )}
          {backendDown && activeView !== 'welcome' && (
            <div className="mb-4 bg-amber-950/60 border border-amber-700/40 rounded-xl px-4 py-3 flex items-center gap-3 text-sm">
              <span className="text-amber-400 text-lg">⚠️</span>
              <div>
                <p className="text-amber-200 font-semibold">Backend server nie je dostupný</p>
                <p className="text-amber-400/70 text-xs">Progres sa ukladá len lokálne. Funkcie ako Video Coach, AI hlas a import príbehov nemusia fungovať.</p>
              </div>
              <button onClick={() => setBackendDown(false)} className="text-amber-600 hover:text-amber-400 ml-auto flex-shrink-0 text-xs">✕</button>
            </div>
          )}

          {activeView === 'welcome' && (
            <Welcome
              onNavigate={setActiveView}
              onStartLesson={handleStartLesson}
            />
          )}
          {activeView === 'placement' && (
            <PlacementTest
              onComplete={handleCompletePlacementTest}
              onSkip={handleSkipPlacementTest}
            />
          )}
          {activeView === 'dashboard' && (
            <Dashboard
              progress={progress}
              onStartLesson={handleStartLesson}
              onNavigate={setActiveView}
              onOpenAPIKey={() => setShowApiKey(true)}
              onStartPlacementTest={handleStartPlacementTest}
              onResetLesson={resetLesson}
              onResetAll={resetProgress}
            />
          )}
          {activeView === 'weekly' && (
            <WeeklyPlan
              progress={progress}
              onStartLesson={handleStartLesson}
              onStartWeeklyTest={handleStartWeeklyTest}
              onNavigate={setActiveView}
            />
          )}
          {activeView === 'chat' && (
            <AIConversation
              onOpenAPIKey={() => setShowApiKey(true)}
              onSavePhrases={saveConversationPhrases}
              onMarkVocabSeen={markVocabSeen}
            />
          )}
          {activeView === 'lesson_mode_select' && selectedLesson && (
            <LessonModeSelect
              lesson={selectedLesson}
              onSelectMode={handleSelectLessonMode}
              onBack={handleBack}
            />
          )}
          {activeView === 'lesson' && selectedLesson && lessonMode === 'classic' && (
            <LessonView
              lesson={selectedLesson}
              progress={progress}
              saveLessonState={saveLessonState}
              onComplete={handleCompleteLesson}
              onBack={handleBack}
              onOpenAPIKey={() => setShowApiKey(true)}
              onNavigate={setActiveView}
              onResetLesson={resetLesson}
            />
          )}
          {activeView === 'lesson' && selectedLesson && lessonMode === 'interleaved' && (
            <LessonViewInterleaved
              lesson={selectedLesson}
              progress={progress}
              saveLessonState={saveLessonState}
              onComplete={handleCompleteLesson}
              onBack={handleBack}
              onOpenAPIKey={() => setShowApiKey(true)}
              onNavigate={setActiveView}
              onResetLesson={resetLesson}
            />
          )}
          {activeView === 'vocab' && (
            <VocabTrainer
              progress={progress}
              onMarkVocab={markVocabSeen}
              onMarkVocabWrong={markVocabWrong}
              onReviewVocab={reviewVocab}
              onAddCustomVocab={addCustomVocab}
            />
          )}
          {activeView === 'grammar' && (
            <GrammarGuide progress={progress} />
          )}
          {activeView === 'passive' && (
            <PassivePhase />
          )}
          {activeView === 'guide' && (
            <MethodGuide />
          )}
          {activeView === 'arena' && (
            <ExerciseArena progress={progress} onNavigate={setActiveView} />
          )}
          {activeView === 'studycoach' && (
            <StudyCoachPage onNavigate={setActiveView} />
          )}
          {activeView === 'stories' && (
            <StoryBrowser progress={progress} onSelectStory={(id) => { setSelectedStoryId(id); setActiveView('story'); }} />
          )}
          {activeView === 'story' && selectedStoryId && (
            <StoryReader
              storyId={selectedStoryId}
              onMarkVocab={markVocabSeen}
              onCompleteStory={completeStory}
              onBack={() => setActiveView('stories')}
            />
          )}
          {activeView === 'videocoach' && (
            <VideoCoach />
          )}
          {activeView === 'features' && (
            <FeaturesPage onNavigate={setActiveView} />
          )}
          {activeView === 'roadmap' && (
            <RoadmapPage />
          )}
          {activeView === 'weeklytest' && selectedWeekNum && (
            <WeeklyTest
              weekNumber={selectedWeekNum}
              lessons={WEEKLY_PLAN.find(w => w.week === selectedWeekNum)?.lessons.map(id => LESSONS.find(l => l.id === id)).filter(Boolean) || []}
              progress={progress}
              onComplete={handleCompleteWeeklyTest}
              onBack={() => setActiveView('weekly')}
            />
          )}
          {activeView === 'lesson' && !selectedLesson && (
            <div className="text-center py-20 text-gray-500">
              <p>Lekcia nenájdená.</p>
              <button onClick={() => setActiveView('weekly')} className="mt-4 btn-primary">Späť na plán</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
