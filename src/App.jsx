import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './views/Dashboard';
import Welcome from './views/Welcome';
import WeeklyPlan from './views/WeeklyPlan';
import LessonView from './views/LessonView';
import VocabTrainer from './views/VocabTrainer';
import GrammarGuide from './views/GrammarGuide';
import MethodGuide from './views/MethodGuide';
import PassivePhase from './views/PassivePhase';
import { useProgress } from './hooks/useProgress';
import { LESSONS, WEEKLY_PLAN } from './data/curriculum';
import WeeklyTest from './views/WeeklyTest';
import AIConversation from './views/AIConversation';
import APIKeyModal from './components/APIKeyModal';
import PlacementTest from './views/PlacementTest';

export default function App() {
  const [activeView, setActiveView] = useState(() => {
    try {
      const raw = localStorage.getItem('german_progress_v2');
      const data = raw ? JSON.parse(raw) : null;
      return data && Object.keys(data.completedLessons || {}).length > 0 ? 'dashboard' : 'welcome';
    } catch { return 'welcome'; }
  });
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [selectedWeekNum, setSelectedWeekNum] = useState(null);
  const [showApiKey, setShowApiKey] = useState(false);
  const { progress, completeLesson, markVocabSeen, saveConversationPhrases, completeWeeklyTest, completePlacementTest } = useProgress();

  const handleStartLesson = (id) => {
    setSelectedLessonId(id);
    setActiveView('lesson');
  };

  const handleCompleteLesson = (id, avgScore, xpReward) => {
    completeLesson(id, avgScore, xpReward);
    setSelectedLessonId(null);
    setActiveView('dashboard');
  };

  const handleBack = () => {
    setSelectedLessonId(null);
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
      {activeView !== 'lesson' && activeView !== 'weeklytest' && activeView !== 'welcome' && activeView !== 'placement' && (
        <Sidebar activeView={activeView} setActiveView={setActiveView} onOpenAPIKey={() => setShowApiKey(true)} />
      )}

      <main className={`flex-1 overflow-y-auto ${activeView !== 'lesson' && activeView !== 'weeklytest' && activeView !== 'welcome' && activeView !== 'placement' ? 'pb-20 md:pb-0' : ''}`}>
        <div className={`${activeView === 'welcome' ? '' : 'max-w-4xl mx-auto px-4 py-6'}`}>
          {showApiKey && <APIKeyModal onClose={() => setShowApiKey(false)} />}

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
          {activeView === 'lesson' && selectedLesson && (
            <LessonView
              lesson={selectedLesson}
              progress={progress}
              onComplete={handleCompleteLesson}
              onBack={handleBack}
              onOpenAPIKey={() => setShowApiKey(true)}
            />
          )}
          {activeView === 'vocab' && (
            <VocabTrainer
              progress={progress}
              onMarkVocab={markVocabSeen}
            />
          )}
          {activeView === 'grammar' && (
            <GrammarGuide />
          )}
          {activeView === 'passive' && (
            <PassivePhase />
          )}
          {activeView === 'guide' && (
            <MethodGuide />
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
