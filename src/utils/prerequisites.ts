import { MODULES } from '../data/curriculum';
import { UserProgress } from '../types';

export interface PrerequisiteStatus {
  canProceed: boolean;
  missingPrerequisites: {
    lessonId: string;
    lessonTitle: string;
    moduleId: string;
    moduleTitle: string;
    score: number;
    isCompleted: boolean;
    isMastered: boolean; // >= 85%
  }[];
}

/**
 * Checks whether all prerequisite lessons for the target lesson have been mastered (score >= 85%).
 */
export function checkPrerequisites(targetLessonId: string, progress: UserProgress): PrerequisiteStatus {
  // Lesson 1-1 has zero prerequisites
  if (targetLessonId === 'lesson-1-1') {
    return { canProceed: true, missingPrerequisites: [] };
  }

  // Find target lesson and its module
  let targetLessonSummary: any = null;
  let targetModule: any = null;

  for (const mod of MODULES) {
    for (const ch of mod.chapters) {
      for (const les of ch.lessons) {
        if (les.id === targetLessonId) {
          targetLessonSummary = les;
          targetModule = mod;
          break;
        }
      }
      if (targetLessonSummary) break;
    }
    if (targetLessonSummary) break;
  }

  if (!targetLessonSummary) {
    return { canProceed: true, missingPrerequisites: [] };
  }

  const missingPrerequisites: PrerequisiteStatus['missingPrerequisites'] = [];

  // 1. Direct prerequisite lesson IDs specified on the lesson
  const directPrereqIds: string[] = targetLessonSummary.prerequisiteLessonIds || [];

  // 2. If no direct prerequisite lessons are listed, look at the prior lesson in the same chapter or prior chapter
  if (directPrereqIds.length === 0) {
    const allLessons = MODULES.flatMap((m) => m.chapters.flatMap((c) => c.lessons));
    const targetIdx = allLessons.findIndex((l) => l.id === targetLessonId);
    if (targetIdx > 0) {
      directPrereqIds.push(allLessons[targetIdx - 1].id);
    }
  }

  for (const prereqId of directPrereqIds) {
    const isCompleted = progress.completedLessonIds.includes(prereqId);
    const score = progress.lessonScores[prereqId] || 0;
    const isMastered = isCompleted && score >= 85;

    if (!isMastered) {
      // Look up lesson title and module
      let prereqTitle = prereqId;
      let prereqModTitle = '';
      let prereqModId = '';

      for (const mod of MODULES) {
        for (const ch of mod.chapters) {
          for (const les of ch.lessons) {
            if (les.id === prereqId) {
              prereqTitle = les.title;
              prereqModTitle = `Module ${mod.number}: ${mod.title}`;
              prereqModId = mod.id;
              break;
            }
          }
          if (prereqModTitle) break;
        }
        if (prereqModTitle) break;
      }

      missingPrerequisites.push({
        lessonId: prereqId,
        lessonTitle: prereqTitle,
        moduleId: prereqModId,
        moduleTitle: prereqModTitle,
        score,
        isCompleted,
        isMastered,
      });
    }
  }

  return {
    canProceed: missingPrerequisites.length === 0,
    missingPrerequisites,
  };
}

/**
 * Calculates a learner's global scientific retention and mastery metrics
 */
export function calculateMasteryMetrics(progress: UserProgress) {
  const allLessons = MODULES.flatMap((m) => m.chapters.flatMap((c) => c.lessons));
  const totalLessons = allLessons.length;
  
  // Mastered lessons require completed AND score >= 85
  const masteredLessons = allLessons.filter((l) => {
    return progress.completedLessonIds.includes(l.id) && (progress.lessonScores[l.id] || 0) >= 85;
  });

  const passedScores = Object.values(progress.lessonScores);
  const avgAssessmentScore = passedScores.length > 0 
    ? Math.round(passedScores.reduce((a, b) => a + b, 0) / passedScores.length) 
    : 0;

  // Active reviews due
  const today = new Date().toISOString().split('T')[0];
  const reviewsDue = progress.reviewQueue.filter((r) => r.nextReviewDate <= today);

  // Repeated misconceptions (failed 2+ times)
  const repeatedMisconceptions = progress.mistakeBank.filter((m) => m.failureCount >= 2);

  return {
    totalLessons,
    masteredCount: masteredLessons.length,
    masteryPercentage: Math.round((masteredLessons.length / totalLessons) * 100),
    avgAssessmentScore,
    reviewsDueCount: reviewsDue.length,
    repeatedMisconceptionsCount: repeatedMisconceptions.length,
  };
}
