import React, { useState } from 'react';
import { 
  Flame, 
  Sparkles, 
  Moon, 
  Sun, 
  Volume2, 
  VolumeX, 
  ChevronDown, 
  RotateCcw,
  Target,
  Layers,
  GraduationCap,
  Cloud,
  Check,
  RefreshCw,
  LogOut,
  User as UserIcon,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { STAGES } from '../data/curriculum';
import { calculateMasteryMetrics } from '../utils/prerequisites';

export const Header: React.FC = () => {
  const { 
    progress, 
    updateSettings, 
    setCurrentSection,
    user,
    isAuthLoading,
    isSyncing,
    lastSyncedAt,
    signInWithGoogle,
    signOut,
    syncWithCloud
  } = useApp();
  const [showStageDropdown, setShowStageDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const metrics = calculateMasteryMetrics(progress);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b-2 border-slate-100 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Logo & Academy Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentSection('home')}
            className="flex items-center gap-2 group text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-lime-400 flex items-center justify-center text-white font-black text-xl shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              K
            </div>
            <div className="hidden sm:block">
              <span className="font-extrabold text-lg text-slate-800 dark:text-white tracking-tight flex items-center gap-1.5">
                KineticLab
                <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-700">
                  Mastery
                </span>
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Exercise Science Academy</p>
            </div>
          </button>

          {/* Quick Stage Indicator dropdown */}
          <div className="relative ml-1 sm:ml-2">
            <button
              onClick={() => setShowStageDropdown(!showStageDropdown)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="hidden md:inline">Stages I-IX</span>
              <span className="md:hidden">Stages</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showStageDropdown && (
              <div 
                className="absolute left-0 mt-2 w-72 sm:w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border-2 border-slate-100 dark:border-slate-800 p-2 z-50 animate-in fade-in slide-in-from-top-2"
                onClick={() => setShowStageDropdown(false)}
              >
                <p className="px-3 py-1.5 text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                  Curriculum Stages
                </p>
                <div className="max-h-80 overflow-y-auto space-y-1">
                  {STAGES.map((stage) => (
                    <button
                      key={stage.id}
                      onClick={() => {
                        setCurrentSection('curriculum');
                        setShowStageDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                      <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: stage.color }} />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                          {stage.title}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {stage.subtitle}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Gamified & Mastery Indicators (Hearts removed!) */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Scientific Mastery Badge */}
          <button
            onClick={() => setCurrentSection('progress')}
            title="Scientific Mastery Level (>=85% required per lesson)"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-300 font-black text-xs hover:scale-105 transition-transform cursor-pointer"
          >
            <Target className="w-4 h-4 text-emerald-500" />
            <span>{metrics.masteryPercentage}% Mastered</span>
          </button>

          {/* Spaced Review Due Queue Pill */}
          <button
            onClick={() => setCurrentSection('revision')}
            title="Spaced Repetition Reviews Due"
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-xs font-black transition-transform cursor-pointer ${
              metrics.reviewsDueCount > 0
                ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 animate-pulse'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{metrics.reviewsDueCount} Due</span>
          </button>

          {/* Streak */}
          <div 
            title="Daily Study Streak"
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900/60 text-orange-600 dark:text-orange-400 font-black text-xs"
          >
            <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
            <span>{progress.streak}d</span>
          </div>

          {/* Gems */}
          <div 
            title="Science Gems"
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900/60 text-sky-600 dark:text-sky-400 font-black text-xs"
          >
            <Sparkles className="w-3.5 h-3.5 fill-sky-500 text-sky-500" />
            <span>{progress.gems}</span>
          </div>

          {/* Audio Toggle */}
          <button
            onClick={() => updateSettings({ soundEnabled: !progress.soundEnabled })}
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400 transition-colors cursor-pointer"
            title={progress.soundEnabled ? 'Mute Sounds' : 'Unmute Sounds'}
          >
            {progress.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => updateSettings({ theme: progress.theme === 'dark' ? 'light' : 'dark' })}
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400 transition-colors cursor-pointer"
            title="Toggle Theme"
          >
            {progress.theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Google Sign In / User Profile to Save Progress */}
          {!user ? (
            <button
              onClick={signInWithGoogle}
              disabled={isAuthLoading}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-emerald-500 text-xs font-black text-slate-800 dark:text-slate-100 shadow-sm transition-all cursor-pointer disabled:opacity-50"
              title="Sign in with Google to save your learning progress to the cloud"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span className="hidden sm:inline">Save Progress</span>
              <span className="sm:hidden">Login</span>
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-1.5 p-1 rounded-full border-2 border-emerald-500/80 hover:border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/40 transition-all cursor-pointer"
                title="Google Account & Cloud Progress"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-emerald-500 text-white font-black text-xs flex items-center justify-center">
                    {(user.displayName || user.email || 'U')[0].toUpperCase()}
                  </div>
                )}
                <span className={`w-2 h-2 rounded-full mr-1 ${isSyncing ? 'bg-amber-400 animate-ping' : 'bg-emerald-500'}`} />
              </button>

              {showUserDropdown && (
                <div 
                  className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border-2 border-slate-100 dark:border-slate-800 p-4 z-50 animate-in fade-in slide-in-from-top-2 space-y-3"
                >
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || 'User'}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-full object-cover shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-emerald-500 text-white font-black text-base flex items-center justify-center shrink-0">
                        {(user.displayName || user.email || 'U')[0].toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-black text-slate-900 dark:text-white truncate">
                        {user.displayName || 'Exercise Science Learner'}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate font-medium">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {/* Cloud Sync Status */}
                  <div className="p-3 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                        <Cloud className="w-3.5 h-3.5" />
                        <span>Cloud Sync Active</span>
                      </span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                        {isSyncing ? 'Syncing...' : 'Connected'}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                      {lastSyncedAt ? `Last cloud backup at ${lastSyncedAt}` : 'Progress is continuously backed up'}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="space-y-1.5 pt-1">
                    <button
                      onClick={() => {
                        syncWithCloud();
                        setShowUserDropdown(false);
                      }}
                      disabled={isSyncing}
                      className="w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                      <span>Sync Progress Now</span>
                    </button>

                    <button
                      onClick={() => {
                        signOut();
                        setShowUserDropdown(false);
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </header>
  );
};
