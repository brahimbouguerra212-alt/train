import React, { useState } from 'react';
import { 
  BarChart3, 
  Flame, 
  Award, 
  Sparkles, 
  Download, 
  Upload, 
  Check, 
  CheckCircle2, 
  AlertTriangle, 
  Copy,
  Layers,
  Clock,
  Target,
  Brain,
  ShieldAlert,
  ArrowRight,
  Cloud,
  RefreshCw,
  LogOut
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { STAGES, MODULES } from '../data/curriculum';
import { calculateMasteryMetrics, checkPrerequisites } from '../utils/prerequisites';

export const ProgressView: React.FC = () => {
  const { 
    progress, 
    exportProgressJson, 
    importProgressJson, 
    playSound, 
    startLesson,
    user,
    isAuthLoading,
    isSyncing,
    lastSyncedAt,
    signInWithGoogle,
    signOut,
    syncWithCloud
  } = useApp();
  const [copied, setCopied] = useState(false);
  const [importJsonInput, setImportJsonInput] = useState('');
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const metrics = calculateMasteryMetrics(progress);

  // Identify all missing prerequisites across the curriculum
  const allLessons = MODULES.flatMap((m) => m.chapters.flatMap((c) => c.lessons));
  const lessonsWithMissingPrereqs: { lessonId: string; lessonTitle: string; missingCount: number }[] = [];

  allLessons.forEach((l) => {
    const status = checkPrerequisites(l.id, progress);
    if (!status.canProceed) {
      lessonsWithMissingPrereqs.push({
        lessonId: l.id,
        lessonTitle: l.title,
        missingCount: status.missingPrerequisites.length,
      });
    }
  });

  const repeatedMisconceptions = progress.mistakeBank.filter((m) => m.failureCount >= 2);

  const handleCopyJson = async () => {
    const json = exportProgressJson();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(json);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = json;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      playSound('click');
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.warn('Clipboard copy error:', err);
    }
  };

  const handleImportJson = () => {
    if (!importJsonInput.trim()) return;
    const ok = importProgressJson(importJsonInput.trim());
    if (ok) {
      playSound('complete');
      setImportStatus('success');
      setImportJsonInput('');
      setTimeout(() => setImportStatus('idle'), 3000);
    } else {
      playSound('wrong');
      setImportStatus('error');
    }
  };

  return (
    <div className="flex-1 pb-24 md:pb-12 max-w-5xl mx-auto px-4 pt-6 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border-2 border-slate-100 dark:border-slate-700/80 shadow-sm space-y-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-teal-600 dark:text-teal-400">
            <BarChart3 className="w-4 h-4" />
            Empirical Mastery Dashboard
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            Learning Mastery & Retention Analytics
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Calculated strictly from actual assessment accuracy (≥85% threshold), critical concept validation, and delayed spaced repetition retrieval—not merely time spent.
          </p>
        </div>

        {/* Multi-Dimensional Mastery Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">
              Mastered Lessons (≥85%)
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                {metrics.masteredCount}
              </span>
              <span className="text-xs font-bold text-slate-500">
                / {metrics.totalLessons}
              </span>
            </div>
            <span className="text-[11px] font-black text-emerald-600 dark:text-emerald-400">
              {metrics.masteryPercentage}% Curriculum Mastered
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900/60">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">
              Avg Assessment Score
            </span>
            <span className="text-3xl font-black text-sky-600 dark:text-sky-400">
              {metrics.avgAssessmentScore}%
            </span>
            <span className="text-[11px] text-slate-500 block">
              Across all tests
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">
              Reviews Due Today
            </span>
            <div className="flex items-center gap-1.5 text-3xl font-black text-rose-600 dark:text-rose-400">
              <Clock className="w-6 h-6" />
              <span>{metrics.reviewsDueCount}</span>
            </div>
            <span className="text-[11px] text-rose-600 font-bold block">
              SM-2 Active Spaced Queue
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">
              Repeated Misconceptions
            </span>
            <div className="flex items-center gap-1.5 text-3xl font-black text-amber-600 dark:text-amber-400">
              <AlertTriangle className="w-6 h-6" />
              <span>{repeatedMisconceptions.length}</span>
            </div>
            <span className="text-[11px] text-amber-700 font-bold block">
              Concepts failed ≥2 times
            </span>
          </div>

        </div>
      </div>

      {/* SECTION 1: REPEATED MISCONCEPTIONS & AREAS REQUIRING STUDY */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border-2 border-slate-100 dark:border-slate-700/80 shadow-sm space-y-4">
        <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          <span>Priority Remediation: Repeated Misconceptions ({repeatedMisconceptions.length})</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Concepts missed more than once are flagged for deep biological review to prevent persistent knowledge gaps.
        </p>

        {repeatedMisconceptions.length === 0 ? (
          <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-800 dark:text-emerald-300 font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Zero repeated misconceptions detected! Your retention and prerequisite understanding are strong.</span>
          </div>
        ) : (
          <div className="space-y-3">
            {repeatedMisconceptions.map((m) => (
              <div 
                key={m.questionId}
                className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <span className="font-black text-rose-600 uppercase text-[10px] block">
                    Failed {m.failureCount}x • Concept: {m.conceptKey}
                  </span>
                  <h4 className="font-bold text-slate-900 dark:text-white mt-0.5">
                    {m.prompt}
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                    <strong>Correction:</strong> {m.correctAnswer}
                  </p>
                </div>
                <button
                  onClick={() => startLesson(m.lessonId)}
                  className="px-4 py-2 rounded-xl duo-btn-green font-black text-xs shrink-0 cursor-pointer"
                >
                  Restudy Lesson
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 2: CONCEPT-BY-CONCEPT MASTERY MATRIX */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border-2 border-slate-100 dark:border-slate-700/80 shadow-sm space-y-4">
        <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-500" />
          <span>Concept Mastery & Retention Matrix</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Independent tracking of each concept: Initial Understanding, Assessment Score, Critical Concept Validation, and Retention.
        </p>

        {Object.keys(progress.conceptMastery).length === 0 ? (
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border text-center text-xs text-slate-500">
            No concepts evaluated yet. Take your first lesson assessment to populate the matrix!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 uppercase text-[10px] font-black">
                  <th className="py-2.5 px-3">Concept Key</th>
                  <th className="py-2.5 px-3">Initial Score</th>
                  <th className="py-2.5 px-3">Latest Score</th>
                  <th className="py-2.5 px-3">Critical Check</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Retention</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {Object.values(progress.conceptMastery).map((c) => (
                  <tr key={c.conceptKey} className="hover:bg-slate-50 dark:hover:bg-slate-750">
                    <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">
                      {c.conceptKey}
                    </td>
                    <td className="py-2.5 px-3 font-mono">{c.initialScore}%</td>
                    <td className="py-2.5 px-3 font-mono font-bold">{c.latestScore}%</td>
                    <td className="py-2.5 px-3">
                      {c.criticalPassed ? (
                        <span className="text-emerald-600 font-extrabold">Passed ✓</span>
                      ) : (
                        <span className="text-rose-500 font-extrabold">Failed ✗</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3">
                      {c.isMastered ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                          Mastered (≥85%)
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                          In Progress
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 font-bold text-slate-700 dark:text-slate-300">
                      {c.retentionRating}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* SECTION 3: STAGE-BY-STAGE PROGRESS */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border-2 border-slate-100 dark:border-slate-700/80 shadow-sm space-y-4">
        <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-500" />
          <span>Curriculum Mastery by Stage</span>
        </h2>

        <div className="space-y-3">
          {STAGES.map((stage) => {
            const stageMods = MODULES.filter((m) => m.stageId === stage.id);
            const stageLessons = stageMods.flatMap((m) => m.chapters.flatMap((c) => c.lessons));
            const masteredCount = stageLessons.filter(
              (l) => progress.completedLessonIds.includes(l.id) && (progress.lessonScores[l.id] || 0) >= 85
            ).length;
            const stagePercent = stageLessons.length > 0 ? Math.round((masteredCount / stageLessons.length) * 100) : 0;

            return (
              <div 
                key={stage.id} 
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: stage.color }} />
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">{stage.title}</span>
                  </div>
                  <span className="font-black text-slate-700 dark:text-slate-300">
                    {stagePercent}% ({masteredCount}/{stageLessons.length} Mastered)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${stagePercent}%`, backgroundColor: stage.color }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 4: GOOGLE CLOUD ACCOUNT PERSISTENCE */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border-2 border-slate-100 dark:border-slate-700/80 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Cloud className="w-5 h-5 text-emerald-500" />
              <span>Google Account Cloud Progress</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Continuously synchronize your mastery records (≥85%), review schedules, and notes to your Google profile across all devices.
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
                <span>{isSyncing ? 'Syncing...' : 'Sync Cloud Data'}</span>
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

      {/* SECTION 5: JSON BACKUP / DEVICE TRANSFER */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border-2 border-slate-100 dark:border-slate-700/80 shadow-sm space-y-4">
        <div>
          <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Download className="w-5 h-5 text-sky-500" />
            <span>Learning Data Transfer & Backup</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Safely export your mastery metrics, mistake bank, and spaced review schedules as a portable JSON file.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Export Progress Data</span>
            <button
              onClick={handleCopyJson}
              className="w-full py-2.5 px-4 rounded-xl duo-btn-blue font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 stroke-[3]" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Progress JSON'}</span>
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Restore Progress</span>
            <input
              type="text"
              placeholder="Paste JSON here..."
              value={importJsonInput}
              onChange={(e) => setImportJsonInput(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
            />
            <button
              onClick={handleImportJson}
              disabled={!importJsonInput.trim()}
              className="w-full py-2.5 px-4 rounded-xl duo-btn-green font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Upload className="w-4 h-4" />
              <span>Restore Data</span>
            </button>
            {importStatus === 'success' && <p className="text-xs font-bold text-emerald-600 text-center">✓ Data restored!</p>}
            {importStatus === 'error' && <p className="text-xs font-bold text-rose-600 text-center">✗ Invalid JSON data.</p>}
          </div>
        </div>
      </div>

    </div>
  );
};
