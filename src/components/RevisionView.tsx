import React, { useState } from 'react';
import { 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Check, 
  X, 
  Sparkles, 
  BookOpen, 
  Layers,
  ArrowRight,
  Calendar,
  Clock,
  Brain,
  Zap,
  Calculator,
  Search
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MistakeRecord, SpacedReviewItem } from '../types';

export const RevisionView: React.FC = () => {
  const { progress, resolveMistake, submitSpacedReview, playSound, startLesson } = useApp();
  const [activeTab, setActiveTab] = useState<'spaced-queue' | 'mistake-bank'>('spaced-queue');

  // Spaced review state
  const today = new Date().toISOString().split('T')[0];
  const dueReviews = progress.reviewQueue.filter((item) => item.nextReviewDate <= today);
  const futureReviews = progress.reviewQueue.filter((item) => item.nextReviewDate > today);

  const [activeReviewIdx, setActiveReviewIdx] = useState(0);
  const [reviewAnswerSelected, setReviewAnswerSelected] = useState<string | null>(null);
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);

  const activeReviewItem: SpacedReviewItem | undefined = dueReviews[activeReviewIdx];

  const handleReviewAnswer = (option: string) => {
    if (isReviewSubmitted) return;
    setReviewAnswerSelected(option);
    setIsReviewSubmitted(true);
  };

  const handleScoreReview = (quality: number) => {
    if (!activeReviewItem) return;
    submitSpacedReview(activeReviewItem.id, quality);
    setReviewAnswerSelected(null);
    setIsReviewSubmitted(false);

    // When an item is reviewed, it is rescheduled into the future and removed from dueReviews.
    // Ensure activeReviewIdx stays safely within the new length of dueReviews.
    setActiveReviewIdx((prev) => {
      const remainingCount = dueReviews.length - 1;
      if (remainingCount <= 0) return 0;
      return prev >= remainingCount ? 0 : prev;
    });
  };

  const activeMistakes = progress.mistakeBank.filter((m) => !m.reviewed);
  const recurringMisconceptions = progress.mistakeBank.filter((m) => m.failureCount >= 2);

  return (
    <div className="flex-1 pb-24 md:pb-12 max-w-4xl mx-auto px-4 pt-6 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border-2 border-slate-100 dark:border-slate-700/80 shadow-sm space-y-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-rose-600 dark:text-rose-400">
            <RotateCcw className="w-4 h-4" />
            Active Recall & Spaced Repetition Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            Retention & Spaced Revision Queue
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
            Proposes reviews at 1, 3, 7, 14, and 30-day intervals to test definitions, biological mechanisms, calculations, and training scenarios before forgetting sets in.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={() => setActiveTab('spaced-queue')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'spaced-queue'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Spaced Reviews Due ({dueReviews.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('mistake-bank')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'mistake-bank'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Misconception Bank ({activeMistakes.length})</span>
          </button>
        </div>
      </div>

      {/* TAB 1: SPACED REPETITION ACTIVE QUEUE */}
      {activeTab === 'spaced-queue' && (
        <div className="space-y-6">
          {dueReviews.length === 0 ? (
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border-2 border-slate-100 dark:border-slate-700/80 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-500 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                All Spaced Reviews Up to Date!
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                No items are currently due for delayed review today. As you master lessons, items automatically schedule for 1, 3, 7, 14, and 30-day retrieval intervals.
              </p>
              {futureReviews.length > 0 && (
                <div className="pt-2 text-[11px] text-slate-400">
                  {futureReviews.length} mastered items scheduled for upcoming review dates.
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border-2 border-slate-100 dark:border-slate-700/80 shadow-xl space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-black uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                    Task: {activeReviewItem?.type.toUpperCase()}
                  </span>
                  <span className="font-bold text-slate-400">
                    Review {activeReviewIdx + 1} of {dueReviews.length}
                  </span>
                </div>
                <span className="text-[11px] font-bold text-slate-400">
                  Interval: {activeReviewItem?.intervalDays}d | Ease: {activeReviewItem?.easeFactor}
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400">
                  {activeReviewItem?.title}
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug">
                  {activeReviewItem?.prompt}
                </h3>
              </div>

              {/* Options */}
              {activeReviewItem?.options && (
                <div className="space-y-2.5">
                  {activeReviewItem.options.map((opt, i) => {
                    const isSelected = reviewAnswerSelected === opt;
                    const isCorrect = opt === activeReviewItem.correctAnswer;

                    let btnClass = 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200';
                    if (isReviewSubmitted) {
                      if (isCorrect) btnClass = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                      else if (isSelected) btnClass = 'bg-rose-50 border-rose-500 text-rose-900';
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => handleReviewAnswer(opt)}
                        disabled={isReviewSubmitted}
                        className={`w-full p-3.5 rounded-2xl text-left text-xs font-semibold border-2 transition-all cursor-pointer flex items-center justify-between ${btnClass}`}
                      >
                        <span>{opt}</span>
                        {isReviewSubmitted && isCorrect && <Check className="w-4 h-4 text-emerald-600" />}
                        {isReviewSubmitted && isSelected && !isCorrect && <X className="w-4 h-4 text-rose-600" />}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Feedback & SM-2 Quality Rating */}
              {isReviewSubmitted && (
                <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-700 animate-in fade-in">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    <strong className="text-slate-900 dark:text-white block mb-0.5">Scientific Key:</strong>
                    {activeReviewItem?.explanation}
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-400 block text-center">
                      Rate your recall accuracy (SM-2 Interval Adjustment):
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => handleScoreReview(2)}
                        className="py-2.5 px-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900 text-xs font-black hover:bg-rose-100 cursor-pointer"
                      >
                        Failed (Reset to 1d)
                      </button>
                      <button
                        onClick={() => handleScoreReview(4)}
                        className="py-2.5 px-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-900 text-xs font-black hover:bg-sky-100 cursor-pointer"
                      >
                        Good (Advance interval)
                      </button>
                      <button
                        onClick={() => handleScoreReview(5)}
                        className="py-2.5 px-3 rounded-xl duo-btn-green text-xs font-black cursor-pointer"
                      >
                        Flawless Recall
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: MISCONCEPTION & MISTAKE BANK */}
      {activeTab === 'mistake-bank' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-500" />
              <span>Recurring & Active Misconceptions ({activeMistakes.length})</span>
            </h2>
            {recurringMisconceptions.length > 0 && (
              <span className="text-xs font-black text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                {recurringMisconceptions.length} Recurring (Failed 2+ times)
              </span>
            )}
          </div>

          {activeMistakes.length === 0 ? (
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border-2 border-slate-100 dark:border-slate-700/80 text-center space-y-2">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Zero Active Misconceptions
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Any questions failed during assessments will appear here for targeted scientific re-evaluation.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {activeMistakes.map((mistake) => (
                <div
                  key={mistake.questionId}
                  className="bg-white dark:bg-slate-800 rounded-3xl p-5 sm:p-6 border-2 border-slate-100 dark:border-slate-700/80 shadow-sm space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-black uppercase tracking-wider text-rose-500 bg-rose-50 dark:bg-rose-950/50 px-2.5 py-0.5 rounded-full border border-rose-200">
                        Concept: {mistake.conceptKey}
                      </span>
                      {mistake.failureCount >= 2 && (
                        <span className="text-[10px] font-black uppercase text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                          Failed {mistake.failureCount}x (Persistent Misconception)
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => startLesson(mistake.lessonId)}
                      className="text-xs font-bold text-slate-400 hover:text-emerald-500 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Study Lesson</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                    {mistake.prompt}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-3 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50">
                      <span className="font-extrabold text-rose-600 dark:text-rose-400 block mb-0.5">
                        Your Incorrect Answer:
                      </span>
                      <span className="text-slate-700 dark:text-slate-300 font-medium">
                        {mistake.userAnswer}
                      </span>
                    </div>

                    <div className="p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50">
                      <span className="font-extrabold text-emerald-600 dark:text-emerald-400 block mb-0.5">
                        Scientific Reality:
                      </span>
                      <span className="text-slate-700 dark:text-slate-300 font-medium">
                        {mistake.correctAnswer}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    <strong className="text-slate-900 dark:text-white">Biological Explanation: </strong>
                    {mistake.explanation}
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => {
                        resolveMistake(mistake.questionId);
                        playSound('correct');
                      }}
                      className="px-4 py-2 rounded-xl duo-btn-green text-xs font-black cursor-pointer shadow-sm"
                    >
                      Mark Misconception Repaired ✓
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
