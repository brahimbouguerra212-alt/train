import { SpacedReviewItem, QuizQuestion } from '../types';

/**
 * Calculates next review date based on SM-2 spaced repetition principles.
 * Quality rating:
 * 5: Perfect recall
 * 4: Correct response after a hesitation
 * 3: Correct response with serious difficulty
 * 2: Incorrect response; where the correct one seemed easy to recall
 * 1: Incorrect response; the correct one remembered
 * 0: Complete blackout
 */
export function scheduleNextReview(
  item: SpacedReviewItem,
  quality: number // 0 to 5
): SpacedReviewItem {
  let { repetitions, easeFactor, intervalDays } = item;

  if (quality >= 3) {
    if (repetitions === 0) {
      intervalDays = 1;
    } else if (repetitions === 1) {
      intervalDays = 3;
    } else if (repetitions === 2) {
      intervalDays = 7;
    } else if (repetitions === 3) {
      intervalDays = 14;
    } else {
      intervalDays = Math.round(intervalDays * easeFactor);
    }
    repetitions += 1;
  } else {
    // Failed recall: reset to Day 1
    repetitions = 0;
    intervalDays = 1;
  }

  // Update ease factor (SM-2 formula)
  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (easeFactor < 1.3) easeFactor = 1.3;

  // Compute next review date string YYYY-MM-DD
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + intervalDays);
  const nextReviewDate = nextDate.toISOString().split('T')[0];
  const today = new Date().toISOString().split('T')[0];

  return {
    ...item,
    repetitions,
    easeFactor: parseFloat(easeFactor.toFixed(2)),
    intervalDays,
    nextReviewDate,
    lastReviewedDate: today,
    dueNow: nextReviewDate <= today,
  };
}

/**
 * Creates spaced review items for a newly studied lesson
 */
export function createReviewItemsForLesson(
  lessonId: string,
  lessonTitle: string,
  questions: QuizQuestion[]
): SpacedReviewItem[] {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextReviewDate = tomorrow.toISOString().split('T')[0];

  return questions.slice(0, 3).map((q, idx) => {
    let type: SpacedReviewItem['type'] = 'scenario';
    if (q.prompt.toLowerCase().includes('what is') || q.prompt.toLowerCase().includes('defines')) {
      type = 'definition';
    } else if (q.prompt.toLowerCase().includes('mechanism') || q.prompt.toLowerCase().includes('step') || q.prompt.toLowerCase().includes('pathway')) {
      type = 'mechanism';
    } else if (q.prompt.toLowerCase().includes('calculate') || q.prompt.toLowerCase().includes('how many') || q.prompt.toLowerCase().includes('ratio')) {
      type = 'calculation';
    } else if (q.prompt.toLowerCase().includes('study') || q.prompt.toLowerCase().includes('evidence') || q.prompt.toLowerCase().includes('research')) {
      type = 'research';
    }

    return {
      id: `rev-${lessonId}-${q.id}-${idx}`,
      lessonId,
      conceptKey: q.conceptKey,
      title: `${lessonTitle}: ${q.conceptKey}`,
      type,
      prompt: q.prompt,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      intervalDays: 1,
      easeFactor: 2.5,
      repetitions: 0,
      nextReviewDate,
      dueNow: false,
    };
  });
}
