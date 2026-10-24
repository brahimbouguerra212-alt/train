import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Check, 
  Atom, 
  Dumbbell, 
  Brain, 
  Activity,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const WelcomeModal: React.FC = () => {
  const { showWelcomeModal, setShowWelcomeModal, startLesson } = useApp();

  if (!showWelcomeModal) return null;

  const handleStartAcademy = () => {
    setShowWelcomeModal(false);
    startLesson('lesson-1-1');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full border-2 border-slate-100 dark:border-slate-800 shadow-2xl space-y-6 text-center">
        
        {/* Logo / Mascot Icon */}
        <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-emerald-500 to-lime-400 flex items-center justify-center text-white shadow-xl shadow-emerald-500/20">
          <Brain className="w-10 h-10" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
            Welcome to KineticLab
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Scientific Exercise & Strength Academy
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-md mx-auto">
            You are about to master the entire scientific foundation of human biology, exercise physiology, biomechanics, muscle hypertrophy, and strength training.
          </p>
        </div>

        {/* Core Promises (Assume Zero Knowledge, True Prerequisite Order) */}
        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 text-left space-y-2.5 text-xs text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60">
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 font-bold text-[10px]">✓</span>
            <p><strong>Starts at Absolute Zero:</strong> No background in biology, chemistry, math, or physics is assumed.</p>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-sky-500 text-white flex items-center justify-center shrink-0 font-bold text-[10px]">✓</span>
            <p><strong>No Skipped Prerequisites:</strong> Foundations are taught step-by-step before advanced lifting concepts.</p>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-purple-500 text-white flex items-center justify-center shrink-0 font-bold text-[10px]">✓</span>
            <p><strong>AI Science Tutor:</strong> Professor Kinetic answers your questions and guides you through 30 structured modules.</p>
          </div>
        </div>

        {/* Starting Lesson Callout */}
        <div className="p-3.5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 text-xs text-emerald-900 dark:text-emerald-300 font-bold">
          Beginning at: <br/>
          <span className="text-slate-900 dark:text-white font-extrabold text-sm">
            STAGE I — MODULE 1 — LESSON 1: What is Science, and How Do We Study the Human Body?
          </span>
        </div>

        {/* Big Start Button */}
        <div>
          <button
            onClick={handleStartAcademy}
            className="w-full py-4 px-6 rounded-2xl duo-btn-green font-black text-base flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-emerald-500/25"
          >
            <span>START LESSON 1 NOW</span>
            <ArrowRight className="w-5 h-5 stroke-[3]" />
          </button>
        </div>

      </div>
    </div>
  );
};
