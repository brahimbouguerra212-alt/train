import React, { useState } from 'react';
import { 
  Settings, 
  Target, 
  Volume2, 
  VolumeX, 
  Moon, 
  Sun, 
  Trash2, 
  CheckCircle2, 
  Download,
  AlertTriangle,
  ShieldCheck,
  Play,
  Cloud,
  RefreshCw,
  LogOut,
  User as UserIcon
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { runSystemVerificationTests, TestResult } from '../utils/tests';

export const SettingsView: React.FC = () => {
  const { 
    progress, 
    updateSettings, 
    resetProgress, 
    playSound,
    user,
    isAuthLoading,
    isSyncing,
    lastSyncedAt,
    signInWithGoogle,
    signOut,
    syncWithCloud
  } = useApp();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[] | null>(null);

  const goalOptions = [
    { label: 'Casual', xp: 15, time: '5 min / day' },
    { label: 'Regular', xp: 30, time: '10 min / day' },
    { label: 'Serious (Recommended)', xp: 50, time: '15 min / day' },
    { label: 'Intense', xp: 80, time: '25 min / day' },
  ];

  const handleRunTests = () => {
    playSound('click');
    const results = runSystemVerificationTests();
    setTestResults(results);
    const allPassed = results.every((r) => r.passed);
    if (allPassed) {
      playSound('complete');
    }
  };

  return (
    <div className="flex-1 pb-24 md:pb-12 max-w-3xl mx-auto px-4 pt-6 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border-2 border-slate-100 dark:border-slate-700/80 shadow-sm space-y-2">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-500">
          <Settings className="w-4 h-4" />
          Settings & Scientific Integrity
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          System Preferences & Verification
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Configure learning pace, appearance, sound, or run automated verification tests on curriculum dependencies and mastery thresholds.
        </p>
      </div>

      {/* GOOGLE ACCOUNT & CLOUD PROGRESS SYNC */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border-2 border-slate-100 dark:border-slate-700/80 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Cloud className="w-5 h-5 text-emerald-500" />
              <span>Google Account & Cloud Progress Sync</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Back up your streak, assessment mastery (≥85%), and spaced reviews to your Google profile across all devices.
            </p>
          </div>

          {!user ? (
            <button
              onClick={signInWithGoogle}
              disabled={isAuthLoading}
              className="px-4 py-2.5 rounded-xl duo-btn-green text-xs font-black flex items-center gap-2 cursor-pointer shrink-0 disabled:opacity-50"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#ffffff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#ffffff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#ffffff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#ffffff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Sign in with Google</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={syncWithCloud}
                disabled={isSyncing}
                className="px-3.5 py-2 rounded-xl duo-btn-blue text-xs font-black flex items-center gap-1.5 cursor-pointer shrink-0 disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
              </button>
              <button
                onClick={signOut}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer transition-colors"
                title="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {user ? (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'Learner'}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white font-black text-sm flex items-center justify-center shrink-0">
                  {(user.displayName || user.email || 'U')[0].toUpperCase()}
                </div>
              )}
              <div>
                <p className="font-black text-slate-900 dark:text-white">
                  {user.displayName || 'Exercise Science Learner'}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="text-right sm:text-right">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 font-extrabold text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Cloud Auto-Sync Active</span>
              </span>
              <p className="text-[10px] text-slate-400 mt-1">
                {lastSyncedAt ? `Last cloud sync: ${lastSyncedAt}` : 'Real-time Firestore persistence'}
              </p>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
            Currently running on local device storage. Sign in with your Google account to enable cloud backups, cross-device synchronization, and prevent progress loss if browser cache is cleared.
          </div>
        )}
      </div>

      {/* SYSTEM VERIFICATION TESTS (Integrity Check) */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border-2 border-slate-100 dark:border-slate-700/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <span>Scientific Accuracy & Mastery Test Suite</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Verifies curriculum dependencies, ≥85% mastery math, SM-2 intervals, and DOI traceability.
            </p>
          </div>

          <button
            onClick={handleRunTests}
            className="px-4 py-2 rounded-xl duo-btn-blue text-xs font-black flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Run Integrity Tests</span>
          </button>
        </div>

        {testResults && (
          <div className="space-y-2.5 pt-2 animate-in fade-in">
            {testResults.map((t, idx) => (
              <div 
                key={idx}
                className={`p-3.5 rounded-2xl border flex items-start gap-3 text-xs ${
                  t.passed 
                    ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/60 text-emerald-950 dark:text-emerald-200'
                    : 'bg-rose-50/70 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/60 text-rose-950 dark:text-rose-200'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {t.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                  )}
                </div>
                <div>
                  <h4 className="font-extrabold">{t.name}</h4>
                  <p className="text-[11px] opacity-90 leading-relaxed mt-0.5">{t.details}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Daily Study Goal */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border-2 border-slate-100 dark:border-slate-700/80 shadow-sm space-y-4">
        <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Target className="w-5 h-5 text-emerald-500" />
          <span>Daily Learning Target</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {goalOptions.map((opt) => {
            const isSelected = progress.dailyGoalXp === opt.xp;
            return (
              <button
                key={opt.xp}
                onClick={() => {
                  updateSettings({ dailyGoalXp: opt.xp });
                  playSound('click');
                }}
                className={`p-4 rounded-2xl text-left border-2 transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-slate-800 dark:text-slate-200'
                }`}
              >
                <div>
                  <span className="text-sm font-extrabold block">{opt.label}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{opt.time}</span>
                </div>
                <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                  {opt.xp} XP
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sound Effects */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border-2 border-slate-100 dark:border-slate-700/80 shadow-sm flex items-center justify-between">
        <div className="space-y-0.5">
          <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-sky-500" />
            <span>Audio Chimes</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Synthesized Web Audio tones on correct answers and mastery celebrations.
          </p>
        </div>

        <button
          onClick={() => {
            const next = !progress.soundEnabled;
            updateSettings({ soundEnabled: next });
            if (next) playSound('click');
          }}
          className={`w-14 h-8 rounded-full transition-colors cursor-pointer p-1 ${
            progress.soundEnabled ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'
          }`}
        >
          <div
            className={`w-6 h-6 rounded-full bg-white transition-transform ${
              progress.soundEnabled ? 'translate-x-6' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Theme */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border-2 border-slate-100 dark:border-slate-700/80 shadow-sm space-y-4">
        <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Sun className="w-5 h-5 text-amber-500" />
          <span>Appearance Mode</span>
        </h2>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => updateSettings({ theme: 'light' })}
            className={`p-4 rounded-2xl border-2 text-center font-bold text-xs flex items-center justify-center gap-2 cursor-pointer ${
              progress.theme === 'light'
                ? 'bg-amber-50 border-amber-500 text-amber-900'
                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
            }`}
          >
            <Sun className="w-4 h-4 text-amber-500" />
            <span>Light Theme</span>
          </button>

          <button
            onClick={() => updateSettings({ theme: 'dark' })}
            className={`p-4 rounded-2xl border-2 text-center font-bold text-xs flex items-center justify-center gap-2 cursor-pointer ${
              progress.theme === 'dark'
                ? 'bg-slate-900 border-sky-500 text-white'
                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
            }`}
          >
            <Moon className="w-4 h-4 text-sky-400" />
            <span>Dark Theme</span>
          </button>
        </div>
      </div>

      {/* Danger Zone: Reset Data */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border-2 border-rose-100 dark:border-rose-950/40 shadow-sm space-y-4">
        <h2 className="text-base font-black text-rose-600 dark:text-rose-400 flex items-center gap-2">
          <Trash2 className="w-5 h-5" />
          <span>Reset Learning Progress</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Clears local browser storage and resets progress to Lesson 1-1.
        </p>

        {!showResetConfirm ? (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="px-4 py-2.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs font-black hover:bg-rose-100 cursor-pointer"
          >
            Reset All Academy Progress
          </button>
        ) : (
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-300 dark:border-rose-800 space-y-3">
            <p className="text-xs font-bold text-rose-700 dark:text-rose-300">
              ⚠️ Are you completely sure? This will delete all completed lessons, scores, and review queues.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  resetProgress();
                  setShowResetConfirm(false);
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white font-black text-xs cursor-pointer"
              >
                Yes, Reset Everything
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
