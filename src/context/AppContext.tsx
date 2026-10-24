import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  UserProgress, 
  MistakeRecord, 
  SavedNote, 
  SpacedReviewItem, 
  ConceptMasteryRecord,
  FlaggedCitation,
  QuizQuestion 
} from '../types';
import { scheduleNextReview, createReviewItemsForLesson } from '../utils/spacedRepetition';
import { getLessonContent } from '../data/lessonsData';
import { 
  auth, 
  db, 
  signInWithGoogle as firebaseSignInWithGoogle, 
  signOutUser as firebaseSignOutUser,
  handleFirestoreError,
  OperationType 
} from '../firebase/config';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface AppContextType {
  user: User | null;
  isAuthLoading: boolean;
  isSyncing: boolean;
  lastSyncedAt: string | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  syncWithCloud: () => Promise<void>;
  progress: UserProgress;
  currentSection: 'home' | 'curriculum' | 'learn' | 'practice' | 'revision' | 'progress' | 'library' | 'settings';
  setCurrentSection: (section: 'home' | 'curriculum' | 'learn' | 'practice' | 'revision' | 'progress' | 'library' | 'settings') => void;
  activeLessonId: string;
  setActiveLessonId: (lessonId: string) => void;
  startLesson: (lessonId: string) => void;
  submitLessonAssessment: (
    lessonId: string, 
    scorePercent: number, 
    criticalPassed: boolean, 
    questionResults: { question: QuizQuestion; isCorrect: boolean; userAnswer: string }[]
  ) => { isMastered: boolean; message: string };
  submitSpacedReview: (reviewItemId: string, quality: number) => void;
  resolveMistake: (questionId: string) => void;
  saveSelfExplanation: (lessonId: string, text: string) => void;
  saveNote: (lessonId: string, lessonTitle: string, content: string) => void;
  deleteNote: (noteId: string) => void;
  flagCitation: (
    referenceId: string, 
    citationString: string, 
    lessonId: string, 
    issueType: FlaggedCitation['issueType'], 
    userNotes: string
  ) => void;
  updateSettings: (newSettings: Partial<UserProgress>) => void;
  exportProgressJson: () => string;
  importProgressJson: (json: string) => boolean;
  resetProgress: () => void;
  playSound: (type: 'correct' | 'wrong' | 'complete' | 'click' | 'level-up') => void;
  showWelcomeModal: boolean;
  setShowWelcomeModal: (show: boolean) => void;
}

const STORAGE_KEY = 'kineticlab_user_progress_v3_mastery';

const DEFAULT_PROGRESS: UserProgress = {
  streak: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  xp: 0,
  gems: 100,
  currentLessonId: 'lesson-1-1',
  completedLessonIds: [],
  lessonScores: {},
  lessonAttempts: {},
  conceptMastery: {},
  selfExplanationNotes: {},
  reviewQueue: [],
  mistakeBank: [],
  savedNotes: [],
  flaggedCitations: [],
  dailyGoalMinutes: 15,
  dailyGoalXp: 50,
  todayXp: 0,
  soundEnabled: true,
  theme: 'light',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

// Web Audio API Synthesizer (Zero external dependencies)
class SoundEngine {
  private ctx: AudioContext | null = null;

  private initCtx() {
    try {
      if (!this.ctx && typeof window !== 'undefined') {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    } catch (e) {
      // AudioContext unavailable or blocked by browser policy
    }
  }

  playCorrect() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.08);
      osc.frequency.setValueAtTime(783.99, now + 0.16);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.45);
    } catch (e) {}
  }

  playWrong() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(185, now);
      osc.frequency.setValueAtTime(146.83, now + 0.12);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {}
  }

  playComplete() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.1);
        gain.gain.setValueAtTime(0.2, now + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.5);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.1);
        osc.stop(now + i * 0.1 + 0.5);
      });
    } catch (e) {}
  }

  playClick() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {}
  }
}

const sounds = new SoundEngine();

function mergeProgressWithCloud(local: UserProgress, cloud: any): UserProgress {
  if (!cloud || typeof cloud !== 'object') return local;

  const completedSet = new Set([
    ...(Array.isArray(local.completedLessonIds) ? local.completedLessonIds : []),
    ...(Array.isArray(cloud.completedLessonIds) ? cloud.completedLessonIds : []),
  ]);

  const mergedScores: Record<string, number> = { ...(local.lessonScores || {}) };
  if (cloud.lessonScores && typeof cloud.lessonScores === 'object') {
    for (const [k, v] of Object.entries(cloud.lessonScores)) {
      mergedScores[k] = Math.max(mergedScores[k] || 0, typeof v === 'number' ? v : 0);
    }
  }

  const mergedAttempts: Record<string, number> = { ...(local.lessonAttempts || {}) };
  if (cloud.lessonAttempts && typeof cloud.lessonAttempts === 'object') {
    for (const [k, v] of Object.entries(cloud.lessonAttempts)) {
      mergedAttempts[k] = Math.max(mergedAttempts[k] || 0, typeof v === 'number' ? v : 0);
    }
  }

  const mergedConceptMastery: Record<string, ConceptMasteryRecord> = {
    ...(cloud.conceptMastery || {}),
    ...(local.conceptMastery || {}),
  };

  const mergedSelfExplanation: Record<string, string> = {
    ...(cloud.selfExplanationNotes || {}),
    ...(local.selfExplanationNotes || {}),
  };

  const reviewMap = new Map<string, SpacedReviewItem>();
  (Array.isArray(cloud.reviewQueue) ? cloud.reviewQueue : []).forEach((item: SpacedReviewItem) => {
    if (item && item.id) reviewMap.set(item.id, item);
  });
  (local.reviewQueue || []).forEach((item: SpacedReviewItem) => {
    if (item && item.id) reviewMap.set(item.id, item);
  });

  const mistakeMap = new Map<string, MistakeRecord>();
  (Array.isArray(cloud.mistakeBank) ? cloud.mistakeBank : []).forEach((m: MistakeRecord) => {
    if (m && m.questionId) mistakeMap.set(m.questionId, m);
  });
  (local.mistakeBank || []).forEach((m: MistakeRecord) => {
    if (m && m.questionId) mistakeMap.set(m.questionId, m);
  });

  const notesMap = new Map<string, SavedNote>();
  (Array.isArray(cloud.savedNotes) ? cloud.savedNotes : []).forEach((n: SavedNote) => {
    if (n && n.id) notesMap.set(n.id, n);
  });
  (local.savedNotes || []).forEach((n: SavedNote) => {
    if (n && n.id) notesMap.set(n.id, n);
  });

  const flagsMap = new Map<string, FlaggedCitation>();
  (Array.isArray(cloud.flaggedCitations) ? cloud.flaggedCitations : []).forEach((f: FlaggedCitation) => {
    if (f && f.id) flagsMap.set(f.id, f);
  });
  (local.flaggedCitations || []).forEach((f: FlaggedCitation) => {
    if (f && f.id) flagsMap.set(f.id, f);
  });

  return {
    ...DEFAULT_PROGRESS,
    ...local,
    ...cloud,
    xp: Math.max(local.xp || 0, cloud.xp || 0),
    gems: Math.max(local.gems || 0, cloud.gems || 0),
    streak: Math.max(local.streak || 1, cloud.streak || 1),
    completedLessonIds: Array.from(completedSet),
    lessonScores: mergedScores,
    lessonAttempts: mergedAttempts,
    conceptMastery: mergedConceptMastery,
    selfExplanationNotes: mergedSelfExplanation,
    reviewQueue: Array.from(reviewMap.values()),
    mistakeBank: Array.from(mistakeMap.values()),
    savedNotes: Array.from(notesMap.values()),
    flaggedCitations: Array.from(flagsMap.values()),
    theme: local.theme || cloud.theme || 'light',
    soundEnabled: local.soundEnabled ?? cloud.soundEnabled ?? true,
  };
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);
  const isHydratedFromCloudRef = useRef<boolean>(false);

  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const today = new Date().toISOString().split('T')[0];
        const lastDay = parsed.lastActiveDate;
        
        if (lastDay !== today) {
          const diffDays = Math.floor((new Date(today).getTime() - new Date(lastDay).getTime()) / (1000 * 3600 * 24));
          if (diffDays === 1) parsed.streak = (parsed.streak || 0) + 1;
          else if (diffDays > 1) parsed.streak = 1;
          parsed.lastActiveDate = today;
          parsed.todayXp = 0;
        }
        return { ...DEFAULT_PROGRESS, ...parsed };
      }
    } catch (e) {
      console.warn('Using fresh local progress state:', e);
    }
    return DEFAULT_PROGRESS;
  });

  const [currentSection, setCurrentSection] = useState<'home' | 'curriculum' | 'learn' | 'practice' | 'revision' | 'progress' | 'library' | 'settings'>('home');
  const [activeLessonId, setActiveLessonId] = useState<string>(progress.currentLessonId || 'lesson-1-1');
  const [showWelcomeModal, setShowWelcomeModal] = useState<boolean>(() => {
    return progress.completedLessonIds.length === 0;
  });

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setIsAuthLoading(false);

      if (currentUser) {
        setIsSyncing(true);
        try {
          const progressDocRef = doc(db, 'users', currentUser.uid, 'progress', 'data');
          const snapshot = await getDoc(progressDocRef);

          if (snapshot.exists()) {
            const cloudData = snapshot.data();
            setProgress((prev) => {
              const merged = mergeProgressWithCloud(prev, cloudData);
              return merged;
            });
            setLastSyncedAt(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
          } else {
            // First time this user logs in: back up current local progress to cloud
            await setDoc(progressDocRef, {
              ...progress,
              userId: currentUser.uid,
              updatedAt: new Date().toISOString(),
            });
            setLastSyncedAt(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
          }
        } catch (err) {
          console.warn('Cloud progress fetch fallback to local:', err);
        } finally {
          setIsSyncing(false);
          isHydratedFromCloudRef.current = true;
        }
      } else {
        isHydratedFromCloudRef.current = false;
      }
    });

    return () => unsubscribe();
  }, []);

  // Save to LocalStorage on progress change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn('LocalStorage save skipped (storage may be partitioned or disabled):', e);
    }
  }, [progress]);

  // Debounced auto-save to Firestore on progress change when logged in
  useEffect(() => {
    if (!user || isAuthLoading || !isHydratedFromCloudRef.current) return;

    const timer = setTimeout(async () => {
      setIsSyncing(true);
      try {
        const progressDocRef = doc(db, 'users', user.uid, 'progress', 'data');
        await setDoc(progressDocRef, {
          ...progress,
          userId: user.uid,
          updatedAt: new Date().toISOString(),
        }, { merge: true });
        setLastSyncedAt(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      } catch (err) {
        console.warn('Cloud auto-sync postponed:', err);
      } finally {
        setIsSyncing(false);
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [progress, user, isAuthLoading]);

  useEffect(() => {
    if (progress.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [progress.theme]);

  const playSound = (type: 'correct' | 'wrong' | 'complete' | 'click' | 'level-up') => {
    if (!progress.soundEnabled) return;
    try {
      if (type === 'correct') sounds.playCorrect();
      else if (type === 'wrong') sounds.playWrong();
      else if (type === 'complete' || type === 'level-up') sounds.playComplete();
      else if (type === 'click') sounds.playClick();
    } catch (e) {}
  };

  const signInWithGoogle = async () => {
    playSound('click');
    try {
      const signedInUser = await firebaseSignInWithGoogle();
      setUser(signedInUser);
      playSound('complete');
    } catch (err) {
      console.warn('Google sign-in closed or dismissed:', err);
    }
  };

  const signOut = async () => {
    playSound('click');
    try {
      await firebaseSignOutUser();
      setUser(null);
      setLastSyncedAt(null);
    } catch (err) {
      console.warn('Sign-out notice:', err);
    }
  };

  const syncWithCloud = async () => {
    if (!user) return;
    setIsSyncing(true);
    playSound('click');
    try {
      const progressDocRef = doc(db, 'users', user.uid, 'progress', 'data');
      const snapshot = await getDoc(progressDocRef);
      if (snapshot.exists()) {
        const cloudData = snapshot.data();
        setProgress((prev) => mergeProgressWithCloud(prev, cloudData));
      }
      await setDoc(progressDocRef, {
        ...progress,
        userId: user.uid,
        updatedAt: new Date().toISOString(),
      }, { merge: true });
      setLastSyncedAt(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      playSound('complete');
    } catch (err) {
      console.warn('Manual sync notice:', err);
      playSound('wrong');
    } finally {
      setIsSyncing(false);
    }
  };

  const startLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setCurrentSection('learn');
    playSound('click');
  };

  /**
   * Mastery-based assessment evaluation:
   * Requires >= 85% score AND passing all critical concept questions.
   */
  const submitLessonAssessment = (
    lessonId: string,
    scorePercent: number,
    criticalPassed: boolean,
    questionResults: { question: QuizQuestion; isCorrect: boolean; userAnswer: string }[]
  ) => {
    const isMastered = scorePercent >= 85 && criticalPassed;
    const lesson = getLessonContent(lessonId);

    if (isMastered) {
      playSound('complete');
      try {
        confetti({
          particleCount: 85,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#58cc02', '#1cb0f6', '#ffc800', '#a855f7'],
        });
      } catch (e) {}
    } else {
      playSound('wrong');
    }

    setProgress((prev) => {
      const attempts = (prev.lessonAttempts[lessonId] || 0) + 1;
      const updatedAttempts = { ...prev.lessonAttempts, [lessonId]: attempts };
      const updatedScores = { ...prev.lessonScores, [lessonId]: scorePercent };

      // Update completed / mastered list
      const completedSet = new Set(prev.completedLessonIds);
      if (isMastered) {
        completedSet.add(lessonId);
      }

      // Record mistakes for targeted remediation
      const newMistakes = [...prev.mistakeBank];
      questionResults.forEach((res) => {
        if (!res.isCorrect) {
          const existingIdx = newMistakes.findIndex((m) => m.questionId === res.question.id);
          if (existingIdx !== -1) {
            newMistakes[existingIdx].failureCount += 1;
            newMistakes[existingIdx].userAnswer = res.userAnswer;
            newMistakes[existingIdx].reviewed = false;
          } else {
            newMistakes.unshift({
              questionId: res.question.id,
              lessonId,
              prompt: res.question.prompt,
              userAnswer: res.userAnswer,
              correctAnswer: res.question.correctAnswer,
              explanation: res.question.explanation,
              conceptKey: res.question.conceptKey,
              timestamp: Date.now(),
              reviewed: false,
              failureCount: 1,
            });
          }
        }
      });

      // Update Concept Mastery records
      const updatedConceptMastery = { ...prev.conceptMastery };
      const today = new Date().toISOString().split('T')[0];

      questionResults.forEach((res) => {
        const key = res.question.conceptKey;
        const prevRecord = updatedConceptMastery[key];
        const initial = prevRecord ? prevRecord.initialScore : scorePercent;
        const failCount = newMistakes.find((m) => m.conceptKey === key)?.failureCount || 0;

        updatedConceptMastery[key] = {
          conceptKey: key,
          name: key.replace(/-/g, ' ').toUpperCase(),
          stageNumber: 1,
          moduleNumber: 1,
          initialScore: initial,
          latestScore: scorePercent,
          isMastered,
          criticalPassed,
          timesReviewed: (prevRecord?.timesReviewed || 0) + 1,
          lastReviewDate: today,
          retentionRating: isMastered ? 95 : 60,
          recurringMisconception: failCount >= 2,
        };
      });

      // Generate or update SM-2 Spaced Repetition items if newly mastered
      let updatedReviewQueue = [...prev.reviewQueue];
      if (isMastered) {
        const newReviewItems = createReviewItemsForLesson(lessonId, lesson.title, lesson.questions);
        newReviewItems.forEach((newItem) => {
          if (!updatedReviewQueue.some((q) => q.id === newItem.id)) {
            updatedReviewQueue.push(newItem);
          }
        });
      }

      const xpGained = isMastered ? 60 : 20;

      return {
        ...prev,
        xp: prev.xp + xpGained,
        todayXp: prev.todayXp + xpGained,
        gems: prev.gems + (isMastered ? 15 : 2),
        completedLessonIds: Array.from(completedSet),
        lessonScores: updatedScores,
        lessonAttempts: updatedAttempts,
        conceptMastery: updatedConceptMastery,
        mistakeBank: newMistakes,
        reviewQueue: updatedReviewQueue,
      };
    });

    return {
      isMastered,
      message: isMastered
        ? 'Congratulations! You achieved mastery (>= 85% with critical concepts validated).'
        : !criticalPassed
        ? 'Mastery blocked: You scored >= 85% overall, but missed one or more critical foundational concept questions. Review the remediation below.'
        : 'Score was below the 85% mastery threshold. Review the targeted scientific explanations below to re-test.',
    };
  };

  const submitSpacedReview = (reviewItemId: string, quality: number) => {
    playSound(quality >= 3 ? 'correct' : 'wrong');
    setProgress((prev) => {
      const updatedQueue = prev.reviewQueue.map((item) => {
        if (item.id === reviewItemId) {
          return scheduleNextReview(item, quality);
        }
        return item;
      });

      return {
        ...prev,
        reviewQueue: updatedQueue,
        xp: prev.xp + (quality >= 3 ? 15 : 5),
        todayXp: prev.todayXp + (quality >= 3 ? 15 : 5),
      };
    });
  };

  const resolveMistake = (questionId: string) => {
    setProgress((prev) => ({
      ...prev,
      mistakeBank: prev.mistakeBank.map((m) =>
        m.questionId === questionId ? { ...m, reviewed: true } : m
      ),
    }));
  };

  const saveSelfExplanation = (lessonId: string, text: string) => {
    setProgress((prev) => ({
      ...prev,
      selfExplanationNotes: {
        ...prev.selfExplanationNotes,
        [lessonId]: text,
      },
    }));
  };

  const saveNote = (lessonId: string, lessonTitle: string, content: string) => {
    const newNote: SavedNote = {
      id: `note-${Date.now()}`,
      lessonId,
      lessonTitle,
      content,
      createdAt: new Date().toLocaleDateString(),
    };
    setProgress((prev) => ({
      ...prev,
      savedNotes: [newNote, ...prev.savedNotes],
    }));
  };

  const deleteNote = (noteId: string) => {
    setProgress((prev) => ({
      ...prev,
      savedNotes: prev.savedNotes.filter((n) => n.id !== noteId),
    }));
  };

  const flagCitation = (
    referenceId: string,
    citationString: string,
    lessonId: string,
    issueType: FlaggedCitation['issueType'],
    userNotes: string
  ) => {
    const newFlag: FlaggedCitation = {
      id: `flag-${Date.now()}`,
      referenceId,
      citationString,
      lessonId,
      issueType,
      userNotes,
      reportedAt: new Date().toISOString(),
    };
    setProgress((prev) => ({
      ...prev,
      flaggedCitations: [newFlag, ...prev.flaggedCitations],
    }));
  };

  const updateSettings = (newSettings: Partial<UserProgress>) => {
    setProgress((prev) => ({ ...prev, ...newSettings }));
  };

  const exportProgressJson = () => {
    return JSON.stringify(progress, null, 2);
  };

  const importProgressJson = (json: string): boolean => {
    try {
      const parsed = JSON.parse(json);
      if (parsed && typeof parsed === 'object') {
        setProgress({ ...DEFAULT_PROGRESS, ...parsed });
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON import:', e);
    }
    return false;
  };

  const resetProgress = () => {
    setProgress(DEFAULT_PROGRESS);
    setActiveLessonId('lesson-1-1');
    setCurrentSection('home');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthLoading,
        isSyncing,
        lastSyncedAt,
        signInWithGoogle,
        signOut,
        syncWithCloud,
        progress,
        currentSection,
        setCurrentSection,
        activeLessonId,
        setActiveLessonId,
        startLesson,
        submitLessonAssessment,
        submitSpacedReview,
        resolveMistake,
        saveSelfExplanation,
        saveNote,
        deleteNote,
        flagCitation,
        updateSettings,
        exportProgressJson,
        importProgressJson,
        resetProgress,
        playSound,
        showWelcomeModal,
        setShowWelcomeModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
