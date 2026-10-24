export type StageId = 
  | 'stage-1' 
  | 'stage-2' 
  | 'stage-3' 
  | 'stage-4' 
  | 'stage-5' 
  | 'stage-6' 
  | 'stage-7' 
  | 'stage-8' 
  | 'stage-9';

export interface Stage {
  id: StageId;
  number: number;
  title: string;
  subtitle: string;
  color: string;
  icon: string;
  moduleIds: string[];
}

export interface Module {
  id: string;
  stageId: StageId;
  number: number;
  title: string;
  description: string;
  icon: string;
  prerequisites: string[]; // module IDs
  chapters: Chapter[];
}

export interface Chapter {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  lessons: LessonSummary[];
}

export interface LessonSummary {
  id: string;
  moduleId: string;
  chapterId: string;
  number: number;
  title: string;
  durationMinutes: number;
  xpReward: number;
  prerequisiteLessonIds?: string[];
  coreConceptKeys?: string[];
}

export type EvidenceGrade = 
  | 'Systematic Review / Meta-Analysis' 
  | 'Randomized Controlled Trial' 
  | 'Mechanistic In-Vivo' 
  | 'Foundational Textbook' 
  | 'Consensus Statement'
  | 'Preliminary / Mechanistic Hypothesis';

export interface ScientificReference {
  id: string;
  authors: string;
  title: string;
  journalOrPublisher: string;
  year: number;
  doiOrUrl: string;
  claimSupported: string;
  evidenceGrade: EvidenceGrade;
  limitations: string;
  lastVerifiedDate: string; // YYYY-MM-DD
  isPeerReviewed: boolean;
  citationString: string;
}

export interface Misconception {
  myth: string;
  reality: string;
  underlyingMechanism: string;
  evidence: string;
}

export interface MechanismStep {
  step: number;
  title: string;
  detail: string;
  cellularLocation?: string;
}

export interface TechnicalTerm {
  term: string;
  phonetic?: string;
  definition: string;
  etymology?: string;
  liftingExample: string;
}

export interface InteractiveDiagramData {
  type: 'sarcomere' | 'atp-hydrolysis' | 'moment-arm' | 'motor-unit' | 'hypertrophy-cascade' | 'energy-systems' | 'length-tension' | 'periodization';
  title: string;
  caption: string;
  parameters?: Record<string, any>;
}

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'matching' | 'fill-blank' | 'scenario';
  prompt: string;
  scenarioContext?: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  conceptKey: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isCriticalConcept?: boolean; // If failed, mastery is blocked even if score >= 85%
  alternateQuestion?: {
    prompt: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  };
}

export interface RecallQuestion {
  id: string;
  prompt: string;
  hint: string;
  answerKey: string;
  conceptKey: string;
}

export interface ApplicationExercise {
  id: string;
  title: string;
  scenario: string;
  decisionTask: string;
  viableOptions: {
    label: string;
    description: string;
    scientificPros: string;
    scientificCons: string;
    isOptimal: boolean;
  }[];
  expertCritique: string;
}

export interface LessonContent {
  id: string;
  moduleId: string;
  chapterId: string;
  title: string;
  stageName: string;
  moduleTitle: string;
  
  // 1. Learning Objectives
  objectives: string[];
  
  // 2. Prerequisite Knowledge & Dependencies
  prerequisiteLessonIds: string[];
  prerequisitesDescription: string[];
  
  // 3. Beginner-Friendly Explanation
  beginnerExplanation: string;
  
  // 4. Deeper Scientific Explanation
  deeperScientificExplanation: string[];
  
  // 5. Definitions of Technical Terms
  technicalTerms: TechnicalTerm[];
  
  // 6. Mechanisms Explaining How & Why
  mechanismTitle: string;
  mechanismSteps: MechanismStep[];
  
  // 7. Practical Lifting / Training Examples
  practicalLiftingExamples: {
    liftOrDomain: string;
    scenario: string;
    scientificApplication: string;
  }[];
  
  // 8. Common Misconceptions & Corrections
  commonMisconceptions: Misconception[];
  
  // 9. Evidence Quality & References
  scientificEvidence: {
    established: string[];
    emerging: string[];
    limitations: string[];
  };
  references: ScientificReference[];
  
  // 10. Limitations, Exceptions & Individual Differences
  limitationsAndExceptions: string[];
  
  // 11. Short Summary
  summaryPoints: string[];
  
  // 12. Active Recall Questions (Hidden Answers)
  recallQuestions: RecallQuestion[];
  
  // 13. Application Exercises & Scenarios
  applicationExercises: ApplicationExercise[];
  
  // 14. Lesson Assessment with Explanations
  questions: QuizQuestion[];
  
  // 15. Curriculum Links
  previousLesson?: { id: string; title: string };
  nextLesson?: { id: string; title: string };
  relatedConceptKeys: string[];

  // Optional visual diagram & glossary
  diagramImageUrl?: string;
  diagramImageCaption?: string;
  diagramLandmarks?: { label: string; description: string; liftingApplication: string }[];
  interactiveDiagram?: InteractiveDiagramData;
  glossary?: { term: string; definition: string }[];
}

export interface MistakeRecord {
  questionId: string;
  lessonId: string;
  prompt: string;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
  conceptKey: string;
  timestamp: number;
  reviewed: boolean;
  failureCount: number;
}

export interface SavedNote {
  id: string;
  lessonId: string;
  lessonTitle: string;
  content: string;
  createdAt: string;
}

export interface SpacedReviewItem {
  id: string;
  lessonId: string;
  conceptKey: string;
  title: string;
  type: 'definition' | 'mechanism' | 'calculation' | 'scenario' | 'research';
  prompt: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  intervalDays: number; // 1, 3, 7, 14, 30
  easeFactor: number; // SM-2 ease factor default 2.5
  repetitions: number;
  nextReviewDate: string; // YYYY-MM-DD
  lastReviewedDate?: string;
  dueNow: boolean;
}

export interface ConceptMasteryRecord {
  conceptKey: string;
  name: string;
  stageNumber: number;
  moduleNumber: number;
  initialScore: number;
  latestScore: number;
  isMastered: boolean; // >= 85% AND passed critical concepts
  criticalPassed: boolean;
  timesReviewed: number;
  lastReviewDate: string;
  retentionRating: number; // 0 to 100%
  recurringMisconception: boolean;
}

export interface FlaggedCitation {
  id: string;
  referenceId: string;
  citationString: string;
  lessonId: string;
  issueType: 'broken-link' | 'questionable-interpretation' | 'outdated-finding' | 'other';
  userNotes: string;
  reportedAt: string;
}

export interface UserProgress {
  streak: number;
  lastActiveDate: string;
  xp: number;
  gems: number;
  currentLessonId: string;
  
  // Mastery tracking (Lesson is completed only if score >= 85% AND all critical questions passed)
  completedLessonIds: string[];
  lessonScores: Record<string, number>; // lessonId -> percentage 0-100
  lessonAttempts: Record<string, number>;
  
  // Concept Mastery & Multi-Dimensional Metrics
  conceptMastery: Record<string, ConceptMasteryRecord>;
  selfExplanationNotes: Record<string, string>; // lessonId -> learner's self explanation
  
  // Spaced Repetition Queue (SM-2 based)
  reviewQueue: SpacedReviewItem[];
  
  // Mistake bank for targeted remediation
  mistakeBank: MistakeRecord[];
  
  // Saved study notes
  savedNotes: SavedNote[];
  
  // Flagged citations for scientific integrity
  flaggedCitations: FlaggedCitation[];
  
  // Daily goals and preferences
  dailyGoalMinutes: number;
  dailyGoalXp: number;
  todayXp: number;
  soundEnabled: boolean;
  theme: 'light' | 'dark' | 'system';
}
