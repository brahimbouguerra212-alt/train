import React, { useState } from 'react';
import { 
  Check, 
  Lock, 
  Star, 
  Play, 
  Award, 
  Gift, 
  Sparkles, 
  Flame, 
  ArrowRight, 
  BookOpen, 
  Zap, 
  Target,
  ChevronRight,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { STAGES, MODULES } from '../data/curriculum';
import { StageId } from '../types';

export const HomeView: React.FC = () => {
  const { progress, startLesson, setCurrentSection } = useApp();
  const [selectedStageId, setSelectedStageId] = useState<StageId>('stage-1');

  const selectedStage = STAGES.find((s) => s.id === selectedStageId) || STAGES[0];
  const stageModules = MODULES.filter((m) => m.stageId === selectedStageId);

  // Find next recommended lesson
  let nextLesson = {
    id: 'lesson-1-1',
    title: 'What is Science and How Do We Study the Human Body?',
    moduleNumber: 1,
    chapterTitle: 'The Scientific Method & Human Biology',
  };

  for (const mod of MODULES) {
    for (const ch of mod.chapters) {
      for (const les of ch.lessons) {
        if (!progress.completedLessonIds.includes(les.id)) {
          nextLesson = {
            id: les.id,
            title: les.title,
            moduleNumber: mod.number,
            chapterTitle: ch.title,
          };
          break;
        }
      }
      if (nextLesson.id !== 'lesson-1-1') break;
    }
    if (nextLesson.id !== 'lesson-1-1') break;
  }

  // Winding horizontal offsets for Duolingo path
  const offsets = ['translate-x-0', '-translate-x-8', 'translate-x-8', '-translate-x-12', 'translate-x-0', 'translate-x-10', '-translate-x-6'];

  return (
    <div className="flex-1 pb-24 md:pb-12 max-w-5xl mx-auto px-4 pt-4 sm:pt-6">
      
      {/* Top Stage Carousel Pill Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
        {STAGES.map((st) => {
          const isSelected = st.id === selectedStageId;
          const stageMods = MODULES.filter((m) => m.stageId === st.id);
          const totalLessons = stageMods.flatMap((m) => m.chapters.flatMap((c) => c.lessons)).length;
          const completedCount = stageMods.flatMap((m) => m.chapters.flatMap((c) => c.lessons)).filter((l) => progress.completedLessonIds.includes(l.id)).length;
          const isDone = completedCount >= totalLessons && totalLessons > 0;

          return (
            <button
              key={st.id}
              onClick={() => setSelectedStageId(st.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl whitespace-nowrap text-xs font-black transition-all cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md scale-105'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-2 border-slate-100 dark:border-slate-700/80 hover:bg-slate-50'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: st.color }} />
              <span>STAGE {st.number}</span>
              {isDone && <Check className="w-3.5 h-3.5 text-emerald-500 stroke-[3]" />}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Column: Duolingo Path */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Stage Banner */}
          <div 
            className="rounded-3xl p-6 text-white shadow-xl relative overflow-hidden transition-all"
            style={{ backgroundColor: selectedStage.color }}
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase tracking-wider bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
                  Stage {selectedStage.number} of 9
                </span>
                <span className="text-xs font-bold bg-white/20 px-2.5 py-1 rounded-full">
                  {stageModules.length} Modules
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight mb-2">
                {selectedStage.title.replace(`STAGE ${selectedStage.number}: `, '')}
              </h1>
              <p className="text-sm font-medium text-white/90 max-w-xl">
                {selectedStage.subtitle}
              </p>
            </div>
            {/* Background decorative blob */}
            <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none" />
          </div>

          {/* Modules & Winding Nodes */}
          {stageModules.map((module) => (
            <div key={module.id} className="space-y-6">
              
              {/* Module Header Bar */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border-2 border-slate-100 dark:border-slate-700/80 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-black text-slate-400 uppercase tracking-wider">
                    Module {module.number}
                  </span>
                  <h2 className="text-lg font-black text-slate-900 dark:text-white">
                    {module.title}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                    {module.description}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm shrink-0">
                  M{module.number}
                </div>
              </div>

              {/* Chapters & Lesson Nodes */}
              {module.chapters.map((chapter) => (
                <div key={chapter.id} className="space-y-6">
                  
                  {/* Chapter Subtitle */}
                  <div className="flex items-center gap-3 px-2">
                    <div className="h-0.5 flex-1 bg-slate-200 dark:bg-slate-800" />
                    <span className="text-xs font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      {chapter.title}
                    </span>
                    <div className="h-0.5 flex-1 bg-slate-200 dark:bg-slate-800" />
                  </div>

                  {/* Winding Path Nodes */}
                  <div className="flex flex-col items-center space-y-7 py-2">
                    {chapter.lessons.map((lesson, idx) => {
                      const isCompleted = progress.completedLessonIds.includes(lesson.id);
                      const isNext = lesson.id === nextLesson.id;
                      const isLocked = !isCompleted && !isNext;
                      const offsetClass = offsets[idx % offsets.length];

                      return (
                        <div 
                          key={lesson.id} 
                          className={`flex flex-col items-center transition-transform ${offsetClass}`}
                        >
                          {/* Floating "START" tooltip above current active lesson */}
                          {isNext && (
                            <div className="mb-2.5 animate-bounce">
                              <span className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-black px-3 py-1.5 rounded-xl shadow-lg uppercase tracking-wider flex items-center gap-1.5">
                                <Play className="w-3 h-3 fill-current" />
                                START HERE
                              </span>
                            </div>
                          )}

                          {/* Tactile Duolingo Circle Node */}
                          <button
                            onClick={() => startLesson(lesson.id)}
                            className={`w-20 h-20 rounded-full flex items-center justify-center relative transition-all cursor-pointer ${
                              isCompleted
                                ? 'bg-amber-400 border-b-[6px] border-amber-600 text-white shadow-lg shadow-amber-500/20 active:translate-y-1'
                                : isNext
                                ? 'bg-emerald-500 border-b-[6px] border-emerald-700 text-white shadow-xl shadow-emerald-500/30 ring-4 ring-emerald-300/60 dark:ring-emerald-700/60 active:translate-y-1'
                                : 'bg-slate-200 dark:bg-slate-800 border-b-[6px] border-slate-300 dark:border-slate-900 text-slate-400 dark:text-slate-600'
                            }`}
                            title={lesson.title}
                          >
                            {isCompleted ? (
                              <Check className="w-8 h-8 stroke-[3.5]" />
                            ) : isNext ? (
                              <Star className="w-8 h-8 fill-white stroke-[2.5]" />
                            ) : (
                              <Lock className="w-6 h-6 stroke-[2.5]" />
                            )}

                            {/* Lesson Number Badge */}
                            <span className="absolute -bottom-2 -right-1 w-6 h-6 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[11px] font-black flex items-center justify-center border-2 border-white dark:border-slate-900">
                              {lesson.number}
                            </span>
                          </button>

                          {/* Lesson Title Caption */}
                          <p className="mt-2 text-xs font-bold text-center max-w-[200px] text-slate-700 dark:text-slate-300 line-clamp-2">
                            {lesson.title}
                          </p>
                          <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                            {lesson.durationMinutes} min • +{lesson.xpReward} XP
                          </span>
                        </div>
                      );
                    })}

                    {/* Chapter Milestone Chest Box */}
                    <div className="flex flex-col items-center pt-2">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 border-b-[5px] border-amber-600 flex items-center justify-center shadow-lg text-amber-900">
                        <Gift className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-black text-amber-600 dark:text-amber-400 mt-2">
                        Chapter Milestone
                      </span>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          ))}

        </div>

        {/* Right Sidebar: Daily Goals, Continue Card, Quick Actions */}
        <div className="space-y-6">
          
          {/* Big Continue Learning Action Card */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border-2 border-emerald-400 dark:border-emerald-600 shadow-xl shadow-emerald-500/10 space-y-4">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold uppercase tracking-wider">
              <Zap className="w-4 h-4 fill-emerald-500" />
              Resume Learning
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400">
                Module {nextLesson.moduleNumber} • {nextLesson.chapterTitle}
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white mt-1 leading-snug">
                {nextLesson.title}
              </h3>
            </div>
            
            <button
              onClick={() => startLesson(nextLesson.id)}
              className="w-full py-4 px-6 rounded-2xl duo-btn-green font-black text-base flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
            >
              <span>CONTINUE LESSON</span>
              <ArrowRight className="w-5 h-5 stroke-[3]" />
            </button>
          </div>

          {/* Daily Goal & Streak Card */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border-2 border-slate-100 dark:border-slate-700/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-500" />
                Daily Target
              </h3>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                {progress.todayXp} / {progress.dailyGoalXp} XP
              </span>
            </div>

            <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.round((progress.todayXp / progress.dailyGoalXp) * 100))}%` }}
              />
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400">
              {progress.todayXp >= progress.dailyGoalXp 
                ? '🎉 Daily goal achieved! Your memory consolidation is strong.'
                : `Earn ${Math.max(0, progress.dailyGoalXp - progress.todayXp)} more XP today to maintain your peak neuro-adaptation streak.`}
            </p>
          </div>

          {/* Scientific Mythbuster Tip of the Day */}
          <div className="bg-amber-50 dark:bg-amber-950/40 rounded-3xl p-5 border border-amber-200 dark:border-amber-900/60 space-y-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              Scientific Mythbuster
            </span>
            <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
              Does lactic acid cause delayed onset muscle soreness (DOMS)?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>Fact:</strong> No! Blood lactate returns to baseline within 60 minutes after lifting. DOMS is caused by microscopic sarcomere disruption and an inflammatory repair cascade—not lactate.
            </p>
          </div>

          {/* Featured Visual Anatomy & Biomechanics Card */}
          <div 
            onClick={() => setCurrentSection('library')}
            className="bg-slate-950 text-white rounded-3xl p-4 border border-emerald-500/30 space-y-3 cursor-pointer group hover:border-emerald-400 transition-all shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                Scientific Visual Atlas
              </span>
              <span className="text-[10px] text-slate-400 font-bold group-hover:text-emerald-300 flex items-center gap-1">
                View 7 Illustrated Atlases
                <ChevronRight className="w-3 h-3" />
              </span>
            </div>
            <div className="rounded-2xl overflow-hidden bg-black/60 border border-white/10 relative h-36">
              <img
                src="/src/assets/images/squat_biomechanics_torque_1792791863560.jpg"
                alt="Squat Biomechanics & Torque Moment Arms"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
                <p className="text-[11px] font-bold text-white leading-tight">
                  Featured: Barbell Squat Moment Arms & Joint Torques
                </p>
              </div>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="space-y-2">
            <button
              onClick={() => setCurrentSection('practice')}
              className="w-full py-3 px-4 rounded-2xl duo-btn-outline font-extrabold text-xs flex items-center justify-between cursor-pointer"
            >
              <span>Practice Retrieval & Flashcards</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              onClick={() => setCurrentSection('library')}
              className="w-full py-3 px-4 rounded-2xl duo-btn-outline font-extrabold text-xs flex items-center justify-between cursor-pointer"
            >
              <span>Scientific Equations & 1RM Calculator</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
