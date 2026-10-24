import React from 'react';
import { 
  Home, 
  Map, 
  BookOpen, 
  Dumbbell, 
  RotateCcw, 
  BarChart3, 
  Library, 
  Settings 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navigation: React.FC = () => {
  const { currentSection, setCurrentSection, progress } = useApp();

  const unreviewedMistakes = progress.mistakeBank.filter((m) => !m.reviewed).length;

  interface NavItem {
    id: 'home' | 'curriculum' | 'learn' | 'practice' | 'revision' | 'progress' | 'library' | 'settings';
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    badge?: number;
  }

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: Home, color: 'text-emerald-500' },
    { id: 'curriculum', label: 'Curriculum', icon: Map, color: 'text-sky-500' },
    { id: 'learn', label: 'Learn', icon: BookOpen, color: 'text-purple-500' },
    { id: 'practice', label: 'Practice', icon: Dumbbell, color: 'text-amber-500' },
    { 
      id: 'revision', 
      label: 'Revision', 
      icon: RotateCcw, 
      color: 'text-rose-500', 
      badge: unreviewedMistakes > 0 ? unreviewedMistakes : undefined 
    },
    { id: 'progress', label: 'Progress', icon: BarChart3, color: 'text-teal-500' },
    { id: 'library', label: 'Library', icon: Library, color: 'text-indigo-500' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'text-slate-500' },
  ];

  return (
    <>
      {/* Desktop Left Sidebar (Duolingo Style) */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 border-r-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 min-h-[calc(100vh-4rem)] p-4 space-y-2 select-none">
        <div className="space-y-1.5 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setCurrentSection(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-extrabold text-sm tracking-wide transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border-2 border-emerald-400 dark:border-emerald-600 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-500' : 'text-slate-400 dark:text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-black bg-rose-500 text-white animate-pulse">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Quick Science Stat */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs">
          <p className="font-extrabold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Academy Progress
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            {progress.completedLessonIds.length} of 100+ lessons completed ({progress.xp} Total XP)
          </p>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t-2 border-slate-100 dark:border-slate-800 px-2 py-1.5 flex items-center justify-around">
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = currentSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentSection(item.id)}
              className={`relative flex flex-col items-center justify-center p-2 rounded-xl transition-colors cursor-pointer ${
                isActive ? 'text-emerald-500' : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-bold mt-0.5">{item.label}</span>

              {item.badge !== undefined && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500" />
              )}
            </button>
          );
        })}
        
        {/* Mobile More Button (Progress / Library / Settings) */}
        <button
          onClick={() => setCurrentSection('library')}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-colors cursor-pointer ${
            currentSection === 'library' || currentSection === 'progress' || currentSection === 'settings'
              ? 'text-emerald-500'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <Library className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5">Library</span>
        </button>
      </nav>
    </>
  );
};
