import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  HelpCircle, 
  BookOpen, 
  MessageSquare, 
  Send, 
  X, 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  Bookmark, 
  Check, 
  AlertTriangle, 
  Layers, 
  Compass, 
  Zap, 
  Info,
  ChevronRight,
  ExternalLink,
  Bot,
  Flag,
  Eye,
  EyeOff,
  ShieldAlert,
  ArrowLeft
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getLessonContent } from '../data/lessonsData';
import { checkPrerequisites } from '../utils/prerequisites';
import { QuizQuestion, ScientificReference } from '../types';

export const LearnView: React.FC = () => {
  const { 
    activeLessonId, 
    startLesson, 
    submitLessonAssessment, 
    progress, 
    playSound, 
    saveNote,
    saveSelfExplanation,
    flagCitation,
    setCurrentSection
  } = useApp();

  const lesson = getLessonContent(activeLessonId);
  const prereqStatus = checkPrerequisites(lesson.id, progress);

  // Quiz state
  const [inQuizMode, setInQuizMode] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [quizResults, setQuizResults] = useState<{ question: QuizQuestion; isCorrect: boolean; userAnswer: string }[]>([]);
  const [quizOutcome, setQuizOutcome] = useState<{ isMastered: boolean; message: string; scorePercent: number } | null>(null);

  // Active recall answer visibility state (hidden by default)
  const [revealedRecallIds, setRevealedRecallIds] = useState<Record<string, boolean>>({});

  // Self explanation state
  const [selfExplanationText, setSelfExplanationText] = useState(
    progress.selfExplanationNotes[lesson.id] || ''
  );
  const [selfExplanationSaved, setSelfExplanationSaved] = useState(false);

  // Note-taking state
  const [noteText, setNoteText] = useState('');
  const [showNoteSavedToast, setShowNoteSavedToast] = useState(false);

  // Citation reporting modal state
  const [reportingRef, setReportingRef] = useState<ScientificReference | null>(null);
  const [reportType, setReportType] = useState<'broken-link' | 'questionable-interpretation' | 'outdated-finding' | 'other'>('questionable-interpretation');
  const [reportNotes, setReportNotes] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  // Remediation re-test state
  const [activeRemediationQuestion, setActiveRemediationQuestion] = useState<QuizQuestion | null>(null);
  const [remediationAnswer, setRemediationAnswer] = useState<string | null>(null);
  const [remediationSubmitted, setRemediationSubmitted] = useState(false);

  // AI Tutor drawer state
  const [showTutor, setShowTutor] = useState(false);
  const [tutorInput, setTutorInput] = useState('');
  const [tutorMessages, setTutorMessages] = useState<{ sender: 'user' | 'tutor'; text: string }[]>([
    {
      sender: 'tutor',
      text: `Hello! I am **Professor Kinetic**, your exercise science AI tutor. I am following along with **${lesson.title}**. Ask me about mechanisms, research evidence, or barbell applications!`,
    },
  ]);
  const [isTutorLoading, setIsTutorLoading] = useState(false);

  // Active diagram simulation state
  const [sarcomereStretch, setSarcomereStretch] = useState(2.2);
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const [selectedLandmarkIdx, setSelectedLandmarkIdx] = useState<number>(0);

  // Synchronize state when switching lessons
  useEffect(() => {
    setInQuizMode(false);
    setCurrentQuestionIdx(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setQuizResults([]);
    setQuizOutcome(null);
    setSelectedLandmarkIdx(0);
    setIsImageExpanded(false);
    setRevealedRecallIds({});
    setActiveRemediationQuestion(null);
    setRemediationAnswer(null);
    setRemediationSubmitted(false);
    setSelfExplanationText(progress.selfExplanationNotes[lesson.id] || '');
    setTutorMessages([
      {
        sender: 'tutor',
        text: `Hello! I am **Professor Kinetic**, your exercise science AI tutor. I am following along with **${lesson.title}**. Ask me about mechanisms, research evidence, or barbell applications!`,
      },
    ]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [lesson.id]);

  const currentQuestion: QuizQuestion | undefined = lesson.questions[currentQuestionIdx];

  const toggleRecallAnswer = (id: string) => {
    setRevealedRecallIds((prev) => ({ ...prev, [id]: !prev[id] }));
    playSound('click');
  };

  const handleSelectOption = (option: string) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(option);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || isAnswerSubmitted || !currentQuestion) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    setIsAnswerSubmitted(true);

    if (isCorrect) {
      playSound('correct');
    } else {
      playSound('wrong');
    }

    setQuizResults((prev) => [
      ...prev,
      { question: currentQuestion, isCorrect, userAnswer: selectedAnswer },
    ]);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx + 1 < lesson.questions.length) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      // Evaluate mastery
      const total = lesson.questions.length;
      const correctCount = quizResults.filter((r) => r.isCorrect).length + (selectedAnswer === currentQuestion?.correctAnswer ? 1 : 0);
      const scorePercent = Math.round((correctCount / total) * 100);

      // Check critical concepts
      const finalResults = [
        ...quizResults,
        { question: currentQuestion!, isCorrect: selectedAnswer === currentQuestion?.correctAnswer, userAnswer: selectedAnswer! },
      ];

      const criticalQuestions = finalResults.filter((r) => r.question.isCriticalConcept);
      const criticalPassed = criticalQuestions.every((r) => r.isCorrect);

      const outcome = submitLessonAssessment(lesson.id, scorePercent, criticalPassed, finalResults);
      setQuizOutcome({
        isMastered: outcome.isMastered,
        message: outcome.message,
        scorePercent,
      });

      // If failed, pinpoint first failed critical question for remediation
      const failedCritical = finalResults.find((r) => !r.isCorrect && r.question.isCriticalConcept);
      if (failedCritical) {
        setActiveRemediationQuestion(failedCritical.question);
      }
    }
  };

  const handleSaveSelfExplanation = () => {
    if (!selfExplanationText.trim()) return;
    saveSelfExplanation(lesson.id, selfExplanationText.trim());
    setSelfExplanationSaved(true);
    playSound('correct');
    setTimeout(() => setSelfExplanationSaved(false), 3000);
  };

  const handleSaveUserNote = () => {
    if (!noteText.trim()) return;
    saveNote(lesson.id, lesson.title, noteText.trim());
    setNoteText('');
    setShowNoteSavedToast(true);
    setTimeout(() => setShowNoteSavedToast(false), 3000);
  };

  const handleSubmitCitationReport = () => {
    if (!reportingRef) return;
    flagCitation(reportingRef.id, reportingRef.citationString, lesson.id, reportType, reportNotes);
    setReportSubmitted(true);
    setTimeout(() => {
      setReportingRef(null);
      setReportNotes('');
      setReportSubmitted(false);
    }, 2000);
  };

  const handleSendTutorMessage = async (customMessage?: string) => {
    const textToSend = customMessage || tutorInput;
    if (!textToSend.trim() || isTutorLoading) return;

    const userMsg = { sender: 'user' as const, text: textToSend.trim() };
    setTutorMessages((prev) => [...prev, userMsg]);
    if (!customMessage) setTutorInput('');
    setIsTutorLoading(true);

    try {
      const res = await fetch('/api/tutor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          currentLesson: { title: lesson.title, moduleTitle: lesson.moduleTitle },
          context: { completedLessons: progress.completedLessonIds.length },
          conversationHistory: tutorMessages,
        }),
      });

      const data = await res.json();
      setTutorMessages((prev) => [
        ...prev,
        { sender: 'tutor', text: data.reply || 'Let us continue exploring the scientific mechanisms!' },
      ]);
    } catch (err) {
      setTutorMessages((prev) => [
        ...prev,
        {
          sender: 'tutor',
          text: `In physiological terms, **${textToSend}** relates directly to the physical and biological mechanisms in **${lesson.title}**. Check the Step-by-Step Mechanism section to trace the cellular pathway!`,
        },
      ]);
    } finally {
      setIsTutorLoading(false);
    }
  };

  return (
    <div className="flex-1 pb-24 md:pb-12 max-w-4xl mx-auto px-4 pt-6 space-y-6">
      
      {/* PREREQUISITE DEPENDENCY GATE BANNER */}
      {!prereqStatus.canProceed && !inQuizMode && (
        <div className="bg-amber-50 dark:bg-amber-950/40 rounded-3xl p-5 border-2 border-amber-300 dark:border-amber-800 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-extrabold text-sm">
            <ShieldAlert className="w-5 h-5 text-amber-500" />
            <span>Missing Prerequisite Knowledge Detected</span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            Science builds hierarchically. To deeply understand <strong>{lesson.title}</strong>, our curriculum dependency engine recommends mastering the following foundational lessons first (achieving at least 85%):
          </p>
          <div className="space-y-2">
            {prereqStatus.missingPrerequisites.map((p) => (
              <div 
                key={p.lessonId}
                className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800 flex items-center justify-between gap-3"
              >
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase">{p.moduleTitle}</span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{p.lessonTitle}</h4>
                  <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
                    Current Score: {p.score}% (Requires ≥85%)
                  </span>
                </div>
                <button
                  onClick={() => startLesson(p.lessonId)}
                  className="px-3.5 py-1.5 rounded-xl duo-btn-green text-xs font-black shrink-0 cursor-pointer"
                >
                  Study Prerequisite First
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lesson Header */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border-2 border-slate-100 dark:border-slate-700/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            {lesson.stageName} • {lesson.moduleTitle}
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5">
            {lesson.title}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTutor(true)}
            className="px-4 py-2.5 rounded-2xl bg-purple-50 dark:bg-purple-950/50 border-2 border-purple-300 dark:border-purple-800 text-purple-700 dark:text-purple-300 font-extrabold text-xs flex items-center gap-2 hover:bg-purple-100 transition-colors cursor-pointer"
          >
            <Bot className="w-4 h-4 text-purple-500" />
            <span>Ask Professor Kinetic</span>
          </button>

          {!inQuizMode && (
            <button
              onClick={() => {
                setInQuizMode(true);
                setCurrentQuestionIdx(0);
                setSelectedAnswer(null);
                setIsAnswerSubmitted(false);
                setQuizResults([]);
                setQuizOutcome(null);
                setActiveRemediationQuestion(null);
              }}
              className="px-5 py-2.5 rounded-2xl duo-btn-green font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-500/20"
            >
              <span>ASSESSMENT (≥85% MASTERY)</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          )}
        </div>
      </div>

      {/* QUIZ MODE MODAL / CONTAINER */}
      {inQuizMode ? (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border-2 border-slate-100 dark:border-slate-700/80 shadow-xl space-y-6 animate-in fade-in">
          
          <div className="flex items-center justify-between">
            <button
              onClick={() => setInQuizMode(false)}
              className="text-xs font-bold text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
            >
              ← Back to Complete Lesson Text
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-slate-500 dark:text-slate-400">
                Question {currentQuestionIdx + 1} of {lesson.questions.length}
              </span>
              <div className="w-24 h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${Math.round(((currentQuestionIdx + 1) / lesson.questions.length) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {!quizOutcome && currentQuestion ? (
            <div className="space-y-6">
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Concept: {currentQuestion.conceptKey}
                  </span>
                  {currentQuestion.isCriticalConcept && (
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
                      ★ Critical Foundational Concept
                    </span>
                  )}
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-snug">
                  {currentQuestion.prompt}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQuestion.options?.map((option, idx) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrect = option === currentQuestion.correctAnswer;

                  let optionStyle = 'bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-slate-800 dark:text-slate-200';
                  
                  if (isSelected && !isAnswerSubmitted) {
                    optionStyle = 'bg-sky-50 dark:bg-sky-950/40 border-2 border-sky-500 text-sky-800 dark:text-sky-200';
                  } else if (isAnswerSubmitted) {
                    if (isCorrect) {
                      optionStyle = 'bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold';
                    } else if (isSelected && !isCorrect) {
                      optionStyle = 'bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-500 text-rose-800 dark:text-rose-200';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(option)}
                      disabled={isAnswerSubmitted}
                      className={`w-full p-4 rounded-2xl text-left text-sm font-semibold transition-all cursor-pointer flex items-center justify-between gap-3 ${optionStyle}`}
                    >
                      <span>{option}</span>
                      {isAnswerSubmitted && isCorrect && <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                      {isAnswerSubmitted && isSelected && !isCorrect && <X className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {isAnswerSubmitted && (
                <div 
                  className={`p-4 rounded-2xl border ${
                    selectedAnswer === currentQuestion.correctAnswer
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 text-emerald-900 dark:text-emerald-200'
                      : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 text-rose-900 dark:text-rose-200'
                  }`}
                >
                  <p className="text-xs font-black uppercase tracking-wider mb-1">
                    {selectedAnswer === currentQuestion.correctAnswer ? '✓ Verified Scientific Explanation:' : '✗ Misconception Detected:'}
                  </p>
                  <p className="text-xs font-medium leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                </div>
              )}

              <div>
                {!isAnswerSubmitted ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={!selectedAnswer}
                    className="w-full py-3.5 px-6 rounded-2xl duo-btn-green font-black text-sm cursor-pointer disabled:opacity-40"
                  >
                    CHECK ANSWER
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="w-full py-3.5 px-6 rounded-2xl duo-btn-blue font-black text-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{currentQuestionIdx + 1 < lesson.questions.length ? 'NEXT QUESTION' : 'CALCULATE MASTERY'}</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </button>
                )}
              </div>

            </div>
          ) : (
            /* Mastery Results Screen */
            <div className="space-y-6 py-4">
              <div className="text-center space-y-3">
                <div 
                  className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center shadow-lg ${
                    quizOutcome?.isMastered 
                      ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-500'
                      : 'bg-amber-100 dark:bg-amber-950/60 text-amber-500'
                  }`}
                >
                  {quizOutcome?.isMastered ? (
                    <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                  ) : (
                    <AlertTriangle className="w-10 h-10 stroke-[2.5]" />
                  )}
                </div>

                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  {quizOutcome?.isMastered ? 'Scientific Mastery Validated!' : 'Mastery Threshold Not Yet Met'}
                </h3>
                <p className="text-sm font-bold text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
                  {quizOutcome?.message}
                </p>
                <div className="inline-block px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-700 text-xs font-black text-slate-800 dark:text-slate-200">
                  Assessment Score: {quizOutcome?.scorePercent}% (Threshold: ≥85%)
                </div>
              </div>

              {/* Targeted Remediation Re-Test if failed */}
              {!quizOutcome?.isMastered && activeRemediationQuestion?.alternateQuestion && (
                <div className="p-5 rounded-3xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-800 space-y-4">
                  <div className="space-y-1">
                    <span className="text-[11px] font-black uppercase text-amber-700 dark:text-amber-400">
                      Targeted Remediation Re-Test: {activeRemediationQuestion.conceptKey}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {activeRemediationQuestion.alternateQuestion.prompt}
                    </h4>
                  </div>

                  <div className="space-y-2">
                    {activeRemediationQuestion.alternateQuestion.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          if (remediationSubmitted) return;
                          setRemediationAnswer(opt);
                        }}
                        disabled={remediationSubmitted}
                        className={`w-full p-3 rounded-xl text-left text-xs font-semibold border-2 transition-all cursor-pointer ${
                          remediationAnswer === opt
                            ? remediationSubmitted
                              ? opt === activeRemediationQuestion.alternateQuestion?.correctAnswer
                                ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                                : 'bg-rose-100 border-rose-500 text-rose-900'
                              : 'bg-amber-100 border-amber-500 text-amber-900'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {!remediationSubmitted ? (
                    <button
                      onClick={() => {
                        if (!remediationAnswer) return;
                        setRemediationSubmitted(true);
                        if (remediationAnswer === activeRemediationQuestion.alternateQuestion?.correctAnswer) {
                          playSound('correct');
                        } else {
                          playSound('wrong');
                        }
                      }}
                      disabled={!remediationAnswer}
                      className="px-4 py-2 rounded-xl duo-btn-green text-xs font-black cursor-pointer disabled:opacity-50"
                    >
                      Re-Check Concept Understanding
                    </button>
                  ) : (
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                      {activeRemediationQuestion.alternateQuestion.explanation}
                    </p>
                  )}
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setInQuizMode(false)}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl duo-btn-outline font-extrabold text-xs cursor-pointer"
                >
                  Review Complete Lesson
                </button>

                <button
                  onClick={() => {
                    setCurrentQuestionIdx(0);
                    setSelectedAnswer(null);
                    setIsAnswerSubmitted(false);
                    setQuizResults([]);
                    setQuizOutcome(null);
                    setActiveRemediationQuestion(null);
                    setRemediationAnswer(null);
                    setRemediationSubmitted(false);
                    playSound('click');
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl duo-btn-blue font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retake Assessment</span>
                </button>

                {quizOutcome?.isMastered && lesson.nextLesson && (
                  <button
                    onClick={() => {
                      setInQuizMode(false);
                      startLesson(lesson.nextLesson!.id);
                    }}
                    className="w-full sm:w-auto px-8 py-3 rounded-2xl duo-btn-green font-black text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>NEXT LESSON: {lesson.nextLesson.title}</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </button>
                )}
              </div>
            </div>
          )}

        </div>
      ) : (
        /* MANDATORY 15-POINT COMPREHENSIVE LESSON READER */
        <div className="space-y-8">
          
          {/* Section 1 & 2: Objectives & Prerequisite Dependencies */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-emerald-50/70 dark:bg-emerald-950/20 rounded-3xl p-5 border border-emerald-200 dark:border-emerald-900/60 space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                1. Learning Objectives
              </h3>
              <ul className="space-y-2">
                {lesson.objectives.map((obj, i) => (
                  <li key={i} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-sky-50/70 dark:bg-sky-950/20 rounded-3xl p-5 border border-sky-200 dark:border-sky-900/60 space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-sky-700 dark:text-sky-400 flex items-center gap-2">
                <Compass className="w-4 h-4" />
                2. Prerequisite Knowledge & Dependencies
              </h3>
              <ul className="space-y-2">
                {lesson.prerequisitesDescription.map((pre, i) => (
                  <li key={i} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0 mt-1.5" />
                    <span>{pre}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 3: Beginner-Friendly Explanation */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border-2 border-slate-100 dark:border-slate-700/80 shadow-sm space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              3. Beginner-Friendly Explanation (Zero Jargon Assumed)
            </span>
            <div className="text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed space-y-3 whitespace-pre-line font-medium">
              {lesson.beginnerExplanation}
            </div>
          </div>

          {/* Visual Learning Anchor & Interactive Landmark Explorer */}
          {lesson.diagramImageUrl && (
            <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-500/40 shadow-2xl space-y-5 overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-emerald-400" />
                    Visual Learning Anchor • High-Fidelity Scientific Diagram
                  </span>
                  <h4 className="text-base sm:text-lg font-black text-white mt-1">
                    Visual Anatomical & Mechanistic Blueprint
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Study the visual structure to anchor your understanding. Tap landmarks below to inspect mechanisms and barbell applications.
                  </p>
                </div>
                <button
                  onClick={() => setIsImageExpanded(!isImageExpanded)}
                  className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-emerald-300 transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
                >
                  <Eye className="w-4 h-4" />
                  <span>{isImageExpanded ? 'Standard View' : 'Zoom & Expand'}</span>
                </button>
              </div>

              {/* The High-Resolution Visual Image */}
              <div 
                onClick={() => setIsImageExpanded(!isImageExpanded)}
                className={`relative rounded-2xl overflow-hidden border border-white/10 bg-black/60 transition-all cursor-pointer group ${isImageExpanded ? 'max-h-none' : 'max-h-[460px]'}`}
              >
                <img
                  src={lesson.diagramImageUrl}
                  alt={lesson.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-contain mx-auto transition-transform duration-300 group-hover:scale-[1.01]"
                />
                {!isImageExpanded && (
                  <div className="absolute bottom-2 right-2 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-sm text-[11px] font-bold text-slate-300 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 border border-white/10">
                    <Eye className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Click image to expand full size</span>
                  </div>
                )}
              </div>

              {/* Interactive Landmark Explorer */}
              {lesson.diagramLandmarks && lesson.diagramLandmarks.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Interactive Diagram Landmarks (Tap to Inspect)
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {selectedLandmarkIdx !== null ? `${selectedLandmarkIdx + 1} of ${lesson.diagramLandmarks.length}` : 'Tap a landmark'}
                    </span>
                  </div>

                  {/* Landmark Buttons Row */}
                  <div className="flex flex-wrap gap-2">
                    {lesson.diagramLandmarks.map((lm, idx) => {
                      const isSelected = selectedLandmarkIdx === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            playSound('click');
                            setSelectedLandmarkIdx(idx);
                          }}
                          className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25 scale-105'
                              : 'bg-white/10 text-slate-300 hover:bg-white/15'
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-slate-950' : 'bg-emerald-400'}`} />
                          <span>{lm.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Highlighted Landmark Callout Card */}
                  {selectedLandmarkIdx !== null && lesson.diagramLandmarks[selectedLandmarkIdx] && (
                    <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-emerald-500/40 space-y-2.5 animate-in fade-in">
                      <div className="flex items-center justify-between">
                        <h5 className="text-sm font-black text-emerald-300 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Landmark: {lesson.diagramLandmarks[selectedLandmarkIdx].label}</span>
                        </h5>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed font-medium">
                        {lesson.diagramLandmarks[selectedLandmarkIdx].description}
                      </p>
                      <div className="pt-2 border-t border-white/10 text-xs text-amber-300 flex items-start gap-2">
                        <strong className="shrink-0 text-amber-400 uppercase tracking-wider text-[10px] bg-amber-950/60 px-2 py-0.5 rounded border border-amber-700/60 mt-0.5">
                          Gym Application
                        </strong>
                        <span className="text-slate-300 font-medium">
                          {lesson.diagramLandmarks[selectedLandmarkIdx].liftingApplication}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Scientific Reading Guide Caption */}
              {lesson.diagramImageCaption && (
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 leading-relaxed font-medium">
                  <span className="font-extrabold text-emerald-400 uppercase tracking-wider mr-1.5">
                    Scientific Interpretation Guide:
                  </span>
                  {lesson.diagramImageCaption}
                </div>
              )}
            </div>
          )}

          {/* Section 4: Deeper Scientific Explanation */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border-2 border-slate-100 dark:border-slate-700/80 shadow-sm space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-purple-500" />
              4. Deeper Scientific & Physiological Analysis
            </span>
            <div className="space-y-4 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              {lesson.deeperScientificExplanation.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* Section 5: Technical Terminology Dissected */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border-2 border-slate-100 dark:border-slate-700/80 shadow-sm space-y-4">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-sky-500" />
              5. Definitions of Technical Terms (Defined Upon First Appearance)
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lesson.technicalTerms.map((term, i) => (
                <div 
                  key={i} 
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2"
                >
                  <div className="flex items-baseline justify-between">
                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                      {term.term}
                    </h4>
                    {term.phonetic && (
                      <span className="text-xs font-mono text-slate-400">
                        {term.phonetic}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    {term.definition}
                  </p>
                  <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 text-[11px] text-emerald-700 dark:text-emerald-400">
                    <span className="font-bold">Gym Lifting Context:</span> {term.liftingExample}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 6: Mechanisms Explaining How & Why */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-5">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                6. Mechanisms: Step-by-Step Biological Causation
              </span>
              <h3 className="text-lg sm:text-xl font-black mt-1">
                {lesson.mechanismTitle}
              </h3>
            </div>

            <div className="space-y-4">
              {lesson.mechanismSteps.map((step) => (
                <div 
                  key={step.step}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-900 font-black text-sm flex items-center justify-center shrink-0">
                    {step.step}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">{step.title}</h4>
                      {step.cellularLocation && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-emerald-300">
                          {step.cellularLocation}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {step.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 7: Practical Lifting Examples */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border-2 border-slate-100 dark:border-slate-700/80 shadow-sm space-y-4">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              7. Practical Lifting & Performance Applications
            </span>

            <div className="space-y-4">
              {lesson.practicalLiftingExamples.map((ex, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 space-y-2 text-xs">
                  <span className="font-black text-amber-800 dark:text-amber-400 uppercase tracking-wider">
                    {ex.liftOrDomain}
                  </span>
                  <p className="font-bold text-slate-800 dark:text-slate-200">
                    Scenario: {ex.scenario}
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    <strong>Evidence-Based Application:</strong> {ex.scientificApplication}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 8: Common Misconceptions & Corrections */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border-2 border-slate-100 dark:border-slate-700/80 shadow-sm space-y-4">
            <span className="text-xs font-black uppercase tracking-wider text-rose-500 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              8. Common Misconceptions & Scientific Corrections
            </span>

            <div className="space-y-4">
              {lesson.commonMisconceptions.map((item, i) => (
                <div 
                  key={i} 
                  className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/60 space-y-2 text-xs"
                >
                  <div className="flex items-start gap-2">
                    <span className="font-black text-rose-600 dark:text-rose-400 shrink-0">MYTH:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{item.myth}</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <span className="font-black text-emerald-600 dark:text-emerald-400 shrink-0">REALITY:</span>
                    <span>{item.reality}</span>
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400 pl-4 border-l-2 border-slate-300 dark:border-slate-700">
                    <strong>Mechanism:</strong> {item.underlyingMechanism}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 pl-4">
                    <strong>Evidence:</strong> {item.evidence}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 9: Traceable Scientific References Panel */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border-2 border-slate-100 dark:border-slate-700/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  9. Traceable Scientific References & Evidence Quality
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  All claims are linked to traceable scientific literature with verified DOIs, study designs, and dates checked.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {lesson.references.map((ref) => (
                <div 
                  key={ref.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2 text-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="font-extrabold text-slate-900 dark:text-white">
                      {ref.title}
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                        {ref.evidenceGrade}
                      </span>
                      <button
                        onClick={() => setReportingRef(ref)}
                        className="text-[11px] font-bold text-slate-400 hover:text-rose-500 flex items-center gap-1 cursor-pointer"
                        title="Flag or Report Citation"
                      >
                        <Flag className="w-3 h-3" />
                        <span>Flag</span>
                      </button>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-600 dark:text-slate-400 font-mono">
                    {ref.authors} ({ref.year}). {ref.journalOrPublisher}.
                  </p>

                  <div className="text-[11px] text-slate-700 dark:text-slate-300">
                    <strong className="text-emerald-600 dark:text-emerald-400">Claim Supported:</strong> {ref.claimSupported}
                  </div>

                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    <strong>Study Limitations:</strong> {ref.limitations}
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                    <span>Verified: {ref.lastVerifiedDate}</span>
                    {ref.doiOrUrl && (
                      <a 
                        href={ref.doiOrUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1 font-mono"
                      >
                        <span>Trace DOI/URL</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 10: Limitations & Individual Differences */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border-2 border-slate-100 dark:border-slate-700/80 shadow-sm space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">
              10. Scientific Limitations, Exceptions & Human Variance
            </span>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              {lesson.limitationsAndExceptions.map((lim, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                  <span>{lim}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 11: Summary Points */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border-2 border-slate-100 dark:border-slate-700/80 shadow-sm space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">
              11. Summary of Scientific Core
            </span>
            <div className="space-y-2">
              {lesson.summaryPoints.map((pt, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                  <span className="font-semibold">{pt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 12: Active Recall Questions (Hidden Answers) */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border-2 border-slate-100 dark:border-slate-700/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5" />
                  12. Active Recall Questions (Test Memory Before Answers)
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Try to state the answers in your mind or out loud before clicking to reveal.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {lesson.recallQuestions.map((q) => {
                const isRevealed = revealedRecallIds[q.id] || false;
                return (
                  <div key={q.id} className="p-4 rounded-2xl bg-sky-50/50 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-900/50 space-y-2.5 text-xs">
                    <p className="font-bold text-slate-900 dark:text-white">
                      {q.prompt}
                    </p>
                    <p className="text-[11px] text-slate-500 italic">
                      Hint: {q.hint}
                    </p>
                    <div className="pt-1">
                      <button
                        onClick={() => toggleRecallAnswer(q.id)}
                        className="px-3 py-1.5 rounded-xl bg-sky-100 dark:bg-sky-900/60 text-sky-800 dark:text-sky-200 text-xs font-black flex items-center gap-1.5 cursor-pointer"
                      >
                        {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        <span>{isRevealed ? 'Hide Answer Key' : 'Reveal Scientific Answer'}</span>
                      </button>
                    </div>
                    {isRevealed && (
                      <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-sky-300 dark:border-sky-800 text-slate-800 dark:text-slate-200 font-semibold animate-in fade-in">
                        {q.answerKey}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 13: Application Exercises & Real-World Scenarios */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border-2 border-slate-100 dark:border-slate-700/80 shadow-sm space-y-4">
            <span className="text-xs font-black uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              13. Application Exercises & Multi-Option Decision Scenarios
            </span>

            <div className="space-y-4">
              {lesson.applicationExercises.map((app) => (
                <div key={app.id} className="p-5 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/50 space-y-3 text-xs">
                  <h4 className="text-sm font-black text-slate-900 dark:text-white">{app.title}</h4>
                  <p className="text-slate-700 dark:text-slate-300 font-medium">{app.scenario}</p>
                  <p className="font-extrabold text-purple-900 dark:text-purple-300">{app.decisionTask}</p>

                  <div className="space-y-2 pt-1">
                    {app.viableOptions.map((opt, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900 space-y-1">
                        <span className="font-bold text-slate-900 dark:text-white block">{opt.label}</span>
                        <p className="text-slate-600 dark:text-slate-400">{opt.description}</p>
                        <div className="text-[11px] grid grid-cols-2 gap-2 pt-1">
                          <span className="text-emerald-700 dark:text-emerald-400">Pros: {opt.scientificPros}</span>
                          <span className="text-rose-700 dark:text-rose-400">Cons: {opt.scientificCons}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-l-4 border-purple-500 font-medium">
                    <strong>Expert Scientific Synthesis: </strong>{app.expertCritique}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 14: Explain In Your Own Words (Mastery Depth Requirement) */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border-2 border-slate-100 dark:border-slate-700/80 shadow-sm space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Bookmark className="w-3.5 h-3.5 text-emerald-500" />
              14. Explain In Your Own Words (Demonstrate Deep Understanding)
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Formulating an explanation in your own words verifies true conceptual retention rather than passive recognition.
            </p>
            <textarea
              rows={3}
              placeholder="Explain the core physiological or scientific mechanism taught in this lesson as if explaining to a training partner..."
              value={selfExplanationText}
              onChange={(e) => setSelfExplanationText(e.target.value)}
              className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-500"
            />
            <div className="flex items-center justify-between">
              <button
                onClick={handleSaveSelfExplanation}
                className="px-4 py-2 rounded-xl duo-btn-green text-xs font-black cursor-pointer"
              >
                Save Self-Explanation
              </button>
              {selfExplanationSaved && (
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  ✓ Self-explanation recorded!
                </span>
              )}
            </div>
          </div>

          {/* Section 15: Curriculum Links */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] font-black uppercase text-slate-400">15. Curriculum Connections</span>
              <div className="flex items-center gap-3 mt-1">
                {lesson.previousLesson && (
                  <button
                    onClick={() => startLesson(lesson.previousLesson!.id)}
                    className="text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 font-bold cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>{lesson.previousLesson.title}</span>
                  </button>
                )}
                {lesson.nextLesson && (
                  <button
                    onClick={() => startLesson(lesson.nextLesson!.id)}
                    className="text-emerald-600 dark:text-emerald-400 font-extrabold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Next: {lesson.nextLesson.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Action CTA: Test Understanding Checkpoint */}
          <div className="text-center py-4">
            <button
              onClick={() => {
                setInQuizMode(true);
                setCurrentQuestionIdx(0);
                setSelectedAnswer(null);
                setIsAnswerSubmitted(false);
                setQuizResults([]);
                setQuizOutcome(null);
              }}
              className="w-full sm:w-auto px-10 py-4 rounded-2xl duo-btn-green font-black text-base flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-emerald-500/20 mx-auto"
            >
              <span>TAKE LESSON ASSESSMENT (≥85% TO MASTER)</span>
              <ArrowRight className="w-5 h-5 stroke-[3]" />
            </button>
          </div>

        </div>
      )}

      {/* CITATION REPORT / FLAG MODAL */}
      {reportingRef && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full border-2 border-slate-100 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Flag className="w-4 h-4 text-rose-500" />
                <span>Flag Scientific Citation</span>
              </h3>
              <button onClick={() => setReportingRef(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400">
              Help preserve scientific accuracy. If a citation has an inaccurate interpretation, broken DOI, or outdated finding, report it below:
            </p>

            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300">
              {reportingRef.citationString}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Issue Type</label>
              <select
                value={reportType}
                onChange={(e: any) => setReportType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200"
              >
                <option value="questionable-interpretation">Questionable Claim / Overstated Interpretation</option>
                <option value="broken-link">Broken DOI or Inaccessible Source Link</option>
                <option value="outdated-finding">Outdated Finding / Disproven by Newer Meta-Analysis</option>
                <option value="other">Other Scientific Discrepancy</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Notes / Better Citation</label>
              <textarea
                rows={3}
                placeholder="Explain the discrepancy or link a newer peer-reviewed paper..."
                value={reportNotes}
                onChange={(e) => setReportNotes(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200"
              />
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <button
                onClick={() => setReportingRef(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitCitationReport}
                className="px-4 py-2 rounded-xl duo-btn-blue text-xs font-black cursor-pointer"
              >
                Submit Report
              </button>
            </div>

            {reportSubmitted && (
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 text-center">
                ✓ Report logged for scientific review!
              </p>
            )}
          </div>
        </div>
      )}

      {/* AI TUTOR DRAWER */}
      {showTutor && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-end">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md h-full flex flex-col shadow-2xl border-l-2 border-slate-100 dark:border-slate-800 animate-in slide-in-from-right">
            
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-500 text-white flex items-center justify-center font-bold">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                    Professor Kinetic
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Exercise Science & Physiology AI Tutor
                  </p>
                </div>
              </div>

              <button onClick={() => setShowTutor(false)} className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-4 py-2 bg-purple-50 dark:bg-purple-950/40 border-b border-purple-100 dark:border-purple-900/50 text-[11px] text-purple-700 dark:text-purple-300 font-medium">
              Current Lesson: <strong className="font-bold">{lesson.title}</strong>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
              {tutorMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl whitespace-pre-line leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-emerald-500 text-white font-semibold'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTutorLoading && (
                <div className="flex justify-start">
                  <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-500 animate-spin" />
                    <span>Professor Kinetic is analyzing literature...</span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <button
                onClick={() => handleSendTutorMessage("Explain this concept like I'm a complete beginner with zero science background.")}
                className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-300 whitespace-nowrap hover:bg-slate-200 cursor-pointer"
              >
                Explain like I'm 10
              </button>
              <button
                onClick={() => handleSendTutorMessage("How does this apply specifically to barbell squats and bench press?")}
                className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-300 whitespace-nowrap hover:bg-slate-200 cursor-pointer"
              >
                Apply to Squat/Bench
              </button>
              <button
                onClick={() => handleSendTutorMessage("What is the step-by-step chemical or neurological mechanism here?")}
                className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-300 whitespace-nowrap hover:bg-slate-200 cursor-pointer"
              >
                Break down mechanism
              </button>
            </div>

            <div className="p-3 border-t border-slate-100 dark:border-slate-800 flex gap-2">
              <input
                type="text"
                placeholder="Ask any question about this lesson..."
                value={tutorInput}
                onChange={(e) => setTutorInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendTutorMessage()}
                className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={() => handleSendTutorMessage()}
                disabled={!tutorInput.trim() || isTutorLoading}
                className="p-2.5 rounded-2xl duo-btn-purple shrink-0 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
