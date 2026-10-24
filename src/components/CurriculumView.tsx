import React, { useState } from 'react';
import { 
  Search, 
  Check, 
  Lock, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  Clock, 
  Award,
  Layers,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { STAGES, MODULES } from '../data/curriculum';

export const CurriculumView: React.FC = () => {
  const { progress, startLesson } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStageFilter, setSelectedStageFilter] = useState<string>('all');
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    'module-1': true,
    'module-2': true,
  });

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  // Filter logic
  const filteredModules = MODULES.filter((module) => {
    if (selectedStageFilter !== 'all' && module.stageId !== selectedStageFilter) {
      return false;
    }

    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
    const titleMatch = module.title.toLowerCase().includes(query);
    const descMatch = module.description.toLowerCase().includes(query);
    const lessonMatch = module.chapters.some((ch) =>
      ch.lessons.some((les) => les.title.toLowerCase().includes(query))
    );

    return titleMatch || descMatch || lessonMatch;
  });

  const totalLessonsCount = MODULES.flatMap((m) => m.chapters.flatMap((c) => c.lessons)).length;
  const completedLessonsCount = progress.completedLessonIds.length;
  const overallPercent = Math.round((completedLessonsCount / totalLessonsCount) * 100);

  return (
    <div className="flex-1 pb-24 md:pb-12 max-w-5xl mx-auto px-4 pt-6 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border-2 border-slate-100 dark:border-slate-700/80 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <Layers className="w-4 h-4" />
              Complete Scientific Syllabus
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              All 30 Modules & Chapters
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
              From absolute zero scientific and biological foundations to elite strength coaching, biomechanics, and human exercise physiology.
            </p>
          </div>

          {/* Quick Mastery Stat */}
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center shrink-0">
            <span className="text-3xl font-black text-slate-900 dark:text-white">
              {overallPercent}%
            </span>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
              Academy Mastered
            </p>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-extrabold">
              {completedLessonsCount} / {totalLessonsCount} Lessons
            </span>
          </div>
        </div>

        {/* Search Bar & Stage Filters */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search concepts, ATP, sarcomere, biomechanics, squat, mTORC1..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <select
            value={selectedStageFilter}
            onChange={(e) => setSelectedStageFilter(e.target.value)}
            className="px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option value="all">All 9 Stages</option>
            {STAGES.map((s) => (
              <option key={s.id} value={s.id}>
                Stage {s.number}: {s.title.split(':')[1]?.trim() || s.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-4">
        {filteredModules.map((module) => {
          const isExpanded = expandedModules[module.id] ?? false;
          const stage = STAGES.find((s) => s.id === module.stageId);
          const allModuleLessons = module.chapters.flatMap((c) => c.lessons);
          const completedInModule = allModuleLessons.filter((l) =>
            progress.completedLessonIds.includes(l.id)
          ).length;
          const isModuleComplete = completedInModule === allModuleLessons.length && allModuleLessons.length > 0;

          return (
            <div
              key={module.id}
              className="bg-white dark:bg-slate-800 rounded-3xl border-2 border-slate-100 dark:border-slate-700/80 shadow-sm overflow-hidden transition-all"
            >
              {/* Module Accordion Header */}
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full p-5 text-left flex items-start sm:items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors cursor-pointer"
              >
                <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-white shrink-0 shadow-md"
                    style={{ backgroundColor: stage?.color || '#58cc02' }}
                  >
                    {isModuleComplete ? (
                      <Check className="w-6 h-6 stroke-[3]" />
                    ) : (
                      `M${module.number}`
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                        Stage {stage?.number} • Module {module.number}
                      </span>
                      {module.prerequisites.length > 0 && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                          Prereq: {module.prerequisites.map((p) => `M${p.replace('module-', '')}`).join(', ')}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white truncate">
                      {module.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                      {module.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right hidden sm:block">
                    <span className="text-xs font-black text-slate-700 dark:text-slate-300">
                      {completedInModule} / {allModuleLessons.length}
                    </span>
                    <p className="text-[10px] text-slate-400 font-semibold">Lessons</p>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-500">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </button>

              {/* Module Content / Chapters / Lessons */}
              {isExpanded && (
                <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-700/60 space-y-5 bg-slate-50/50 dark:bg-slate-850/50">
                  {module.chapters.map((chapter) => (
                    <div key={chapter.id} className="pt-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          {chapter.title}
                        </h4>
                        <span className="text-[11px] text-slate-400">
                          {chapter.lessons.length} Lessons
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        {chapter.lessons.map((lesson) => {
                          const isDone = progress.completedLessonIds.includes(lesson.id);
                          const score = progress.lessonScores[lesson.id];

                          return (
                            <div
                              key={lesson.id}
                              className={`p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 ${
                                isDone
                                  ? 'bg-amber-50/80 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/60'
                                  : 'bg-white dark:bg-slate-800 border-slate-200/80 dark:border-slate-700'
                              }`}
                            >
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-black text-slate-400">
                                    Lesson {lesson.number}
                                  </span>
                                  {isDone && (
                                    <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                                      <Check className="w-3 h-3 stroke-[3]" />
                                      {score ? `${score}% Mastered` : 'Complete'}
                                    </span>
                                  )}
                                </div>
                                <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1 mt-0.5">
                                  {lesson.title}
                                </h5>
                                <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {lesson.durationMinutes} min
                                  </span>
                                  <span>•</span>
                                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                                    <Award className="w-3 h-3" />
                                    +{lesson.xpReward} XP
                                  </span>
                                </div>
                              </div>

                              <button
                                onClick={() => startLesson(lesson.id)}
                                className={`px-3 py-2 rounded-xl text-xs font-black shrink-0 transition-transform active:scale-95 cursor-pointer ${
                                  isDone
                                    ? 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                                    : 'duo-btn-green text-white'
                                }`}
                              >
                                {isDone ? 'Review' : 'Start'}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
