import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { HomeView } from './components/HomeView';
import { CurriculumView } from './components/CurriculumView';
import { LearnView } from './components/LearnView';
import { PracticeView } from './components/PracticeView';
import { RevisionView } from './components/RevisionView';
import { ProgressView } from './components/ProgressView';
import { LibraryView } from './components/LibraryView';
import { SettingsView } from './components/SettingsView';
import { WelcomeModal } from './components/WelcomeModal';

const AppContent: React.FC = () => {
  const { currentSection } = useApp();

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors selection:bg-emerald-500 selection:text-white">
      {/* Top Gamified Header */}
      <Header />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Left Navigation Sidebar (Desktop) + Mobile Bottom Bar */}
        <Navigation />

        {/* Main Section Content Area */}
        <main className="flex-1 flex flex-col min-w-0">
          {currentSection === 'home' && <HomeView />}
          {currentSection === 'curriculum' && <CurriculumView />}
          {currentSection === 'learn' && <LearnView />}
          {currentSection === 'practice' && <PracticeView />}
          {currentSection === 'revision' && <RevisionView />}
          {currentSection === 'progress' && <ProgressView />}
          {currentSection === 'library' && <LibraryView />}
          {currentSection === 'settings' && <SettingsView />}
        </main>
      </div>

      {/* Starting Experience Welcome Modal for Beginners */}
      <WelcomeModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
