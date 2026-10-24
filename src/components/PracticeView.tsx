import React, { useState } from 'react';
import { 
  Sparkles, 
  RotateCw, 
  Check, 
  X, 
  Dumbbell, 
  Brain, 
  Zap, 
  Layers,
  ArrowRight,
  ShieldAlert,
  HelpCircle,
  Activity,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface FlashcardItem {
  id: string;
  front: string;
  back: string;
  category: string;
  conceptKey: string;
}

const PRACTICE_CARDS: FlashcardItem[] = [
  {
    id: 'pc-1',
    front: 'What is the immediate chemical energy source directly used by myosin heads during muscle contraction?',
    back: 'Adenosine Triphosphate (ATP) via hydrolysis into ADP + Pi + free energy (~30.5 kJ/mol).',
    category: 'Biochemistry',
    conceptKey: 'atp-hydrolysis',
  },
  {
    id: 'pc-2',
    front: 'What does Henneman\'s Size Principle dictate regarding motor unit recruitment?',
    back: 'Motor units are recruited in strict order of increasing size and activation threshold (small Type I endurance fibers first; large Type II high-threshold fibers only under heavy load or high fatigue).',
    category: 'Neuroscience',
    conceptKey: 'size-principle',
  },
  {
    id: 'pc-3',
    front: 'What is the primary, indispensable mechanical stimulus for skeletal muscle hypertrophy?',
    back: 'Mechanical Tension (active strain from cross-bridges resisting load, and passive strain on titin during stretch).',
    category: 'Hypertrophy Science',
    conceptKey: 'mechanical-tension',
  },
  {
    id: 'pc-4',
    front: 'In physics and biomechanics, how is Joint Torque calculated?',
    back: 'Torque = Force × Perpendicular Moment Arm distance (τ = F × r_perp).',
    category: 'Biomechanics',
    conceptKey: 'torque-moment-arm',
  },
  {
    id: 'pc-5',
    front: 'Does lactic acid cause delayed onset muscle soreness (DOMS)?',
    back: 'No! Blood lactate returns to baseline within 60 minutes. DOMS is caused by microscopic sarcomere disruption and an inflammatory repair cascade.',
    category: 'Physiology',
    conceptKey: 'doms-myth',
  },
  {
    id: 'pc-6',
    front: 'What is the master intracellular protein kinase that controls muscle protein synthesis (MPS)?',
    back: 'mTORC1 (mechanistic Target of Rapamycin Complex 1), activated by mechanical tension and essential amino acids (especially leucine).',
    category: 'Molecular Biology',
    conceptKey: 'mtorc1',
  },
];

interface CaseStudy {
  id: string;
  category: string;
  title: string;
  scenario: string;
  diagramImageUrl?: string;
  diagramImageCaption?: string;
  decisionTask: string;
  options: {
    id: string;
    label: string;
    decision: string;
    justification: string;
    scientificPros: string;
    scientificCons: string;
    isOptimal: boolean;
  }[];
  expertSynthesis: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-hypertrophy-volume',
    category: 'Hypertrophy & Volume Dose-Response',
    title: 'Case #1: Stagnant Chest Hypertrophy at 22 Weekly Sets',
    scenario: 'Lifter Alex has been performing 22 direct sets of chest pressing/flies per week for 10 weeks. For the last 4 weeks, bench press strength has declined by 2.5 kg, chest soreness lingers for 5 days post-workout, and ultrasound measurements show zero growth over the past month.',
    decisionTask: 'Based on the dose-response literature (Schoenfeld et al., 2017; Scarpelli et al., 2020), what is the most scientifically sound programming adjustment?',
    options: [
      {
        id: 'opt-1a',
        label: 'A: Increase to 28 sets per week to force an adaptive breakthrough.',
        decision: 'Add 6 more sets of incline pressing.',
        justification: 'More volume is assumed to always drive more hypertrophy.',
        scientificPros: 'None in this fatigued state.',
        scientificCons: 'Induces severe non-functional overreaching; muscle protein breakdown exceeds synthesis.',
        isOptimal: false,
      },
      {
        id: 'opt-1b',
        label: 'B: Deload for 1 week (cut volume by 50%), then resume at a moderate 12-14 sets per week.',
        decision: 'Dissipate systemic fatigue with a deload, then reset volume to the evidence-based sweet spot (12-16 sets) with 1-2 RIR.',
        justification: 'Volume follows an inverted-U curve. Alex has exceeded his Maximum Recoverable Volume (MRV). Dropping volume will restore net positive protein accretion.',
        scientificPros: 'Dissipates accumulated fatigue, restores motor unit firing rates, and resumes hypertrophy.',
        scientificCons: 'Requires psychological discipline to lift less volume.',
        isOptimal: true,
      },
      {
        id: 'opt-1c',
        label: 'C: Replace all pressing with machine crossovers only, keeping 22 sets.',
        decision: 'Switch exercise selection while holding excessive volume constant.',
        justification: 'Assumes the exercise was the sole issue rather than systemic volume load.',
        scientificPros: 'Slightly alters joint resistance curve.',
        scientificCons: 'Fails to address the underlying excess volume and localized connective tissue fatigue.',
        isOptimal: false,
      },
    ],
    expertSynthesis: 'The inverted-U volume curve demonstrates that sets beyond ~15-20 per muscle group per week yield diminishing returns and eventually negative adaptations for most lifters. Alex was in non-functional overreaching; dropping volume restores net positive muscle protein synthesis.',
  },
  {
    id: 'case-squat-biomechanics',
    category: 'Squat Biomechanics & Weak Point Analysis',
    title: 'Case #2: The Squat "Good-Morning" Fault Under Maximal Load',
    scenario: 'During heavy 1RM attempts, lifter Marcus experiences his hips shooting upward and backward out of the hole, while his chest pitches forward into excessive forward torso lean.',
    diagramImageUrl: '/src/assets/images/squat_biomechanics_torque_1792791863560.jpg',
    diagramImageCaption: 'Sagittal moment arm vector analysis: Notice how shifting the pelvis backward reduces the knee moment arm (diminishing quad torque demand) while substantially lengthening the hip moment arm (greatly increasing the extensor torque demand on glutes and lumbar erectors).',
    decisionTask: 'What is the primary biomechanical limiter, and how should training be structured?',
    options: [
      {
        id: 'opt-2a',
        label: 'A: Knee extensor (quadriceps) torque deficit.',
        decision: 'The quads cannot meet the internal knee extension moment demand. The nervous system shifts load to the stronger hip extensors (glutes/adductors) by moving the hips backward.',
        justification: 'Moment arm analysis: shifting hips back shortens the knee moment arm and lengthens the hip moment arm.',
        scientificPros: 'Accurately diagnoses the physiological limiter and points toward quad hypertrophy & front squats.',
        scientificCons: 'Requires addressing quad strength rather than just doing more low-bar squats.',
        isOptimal: true,
      },
      {
        id: 'opt-2b',
        label: 'B: Weak lower back erectors only.',
        decision: 'Prescribe heavy good-mornings only.',
        justification: 'Assumes the back folded because it was weak.',
        scientificPros: 'Strengthens erectors.',
        scientificCons: 'Misunderstands the root cause: the back was forced to bear more moment because the quads gave up early.',
        isOptimal: false,
      },
    ],
    expertSynthesis: 'When knee extension demand exceeds quadriceps capacity, the CNS reflexively extends knees early to shorten the knee moment arm, transferring torque to the hips. Targeting quadriceps with paused high-bar or front squats resolves this technical deviation.',
  },
  {
    id: 'case-nutrition-recomp',
    category: 'Nutrition & Energy Balance',
    title: 'Case #3: Body Recomposition in an Intermediate Lifter',
    scenario: 'A lifter at 22% body fat with 2 years of training experience wants to build muscle while losing 5 kg of fat over 12 weeks.',
    decisionTask: 'What macronutrient and caloric target is supported by systematic reviews (Barakat et al., 2020)?',
    options: [
      {
        id: 'opt-3a',
        label: 'A: Moderate calorie deficit (-300 to -400 kcal/day) with high protein (2.0 - 2.4 g/kg).',
        decision: 'Slight energy deficit to drive fat oxidation while keeping protein high enough to sustain muscle protein synthesis and resistance training volume.',
        justification: 'Body recomposition is viable when body fat stores provide the necessary energy buffer during a modest deficit.',
        scientificPros: 'Consistently demonstrated in randomized trials for overweight/intermediate trainees.',
        scientificCons: 'Slower scale weight drop than aggressive crashing.',
        isOptimal: true,
      },
      {
        id: 'opt-3b',
        label: 'B: Severe calorie deficit (-1200 kcal/day) with low protein.',
        decision: 'Starvation deficit to drop weight immediately.',
        justification: 'Fastest scale weight loss.',
        scientificPros: 'Rapid scale weight drop.',
        scientificCons: 'Causes muscle protein breakdown, drops testosterone, elevates cortisol, and blunts strength.',
        isOptimal: false,
      },
    ],
    expertSynthesis: 'Systematic reviews confirm body recomposition is achievable in intermediate trainees when the calorie deficit is conservative (10-20%) and daily protein is elevated to 2.0-2.4 g/kg distributed across 3-5 meals.',
  },
];

export const PracticeView: React.FC = () => {
  const { playSound } = useApp();
  const [activeTab, setActiveTab] = useState<'scenarios' | 'flashcards'>('scenarios');

  // Flashcards state
  const [cardIdx, setCardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState<string[]>([]);

  // Scenario solver state
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);
  const [selectedDecision, setSelectedDecision] = useState<string | null>(null);
  const [isCaseSubmitted, setIsCaseSubmitted] = useState(false);

  const currentCase = CASE_STUDIES[activeCaseIdx];
  const currentCard = PRACTICE_CARDS[cardIdx];

  const handleCardFeedback = (knowsIt: boolean) => {
    if (knowsIt) {
      playSound('correct');
      setMasteredCards((prev) => [...prev, currentCard.id]);
    } else {
      playSound('wrong');
    }
    setIsFlipped(false);
    if (cardIdx + 1 < PRACTICE_CARDS.length) setCardIdx((prev) => prev + 1);
    else {
      playSound('complete');
      setCardIdx(0);
    }
  };

  const handleSubmitCase = () => {
    if (!selectedDecision) return;
    setIsCaseSubmitted(true);
    const chosen = currentCase.options.find((o) => o.id === selectedDecision);
    if (chosen?.isOptimal) {
      playSound('correct');
    } else {
      playSound('wrong');
    }
  };

  return (
    <div className="flex-1 pb-24 md:pb-12 max-w-4xl mx-auto px-4 pt-6 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border-2 border-slate-100 dark:border-slate-700/80 shadow-sm space-y-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <Dumbbell className="w-4 h-4" />
            Practical Application Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            Real-World Scientific Case Studies
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Apply physiological mechanisms and biomechanical moment arms to solve authentic training, hypertrophy, and powerlifting programming scenarios.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={() => setActiveTab('scenarios')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === 'scenarios'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Realistic Case Studies ({CASE_STUDIES.length})
          </button>
          <button
            onClick={() => setActiveTab('flashcards')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === 'flashcards'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Quick Flashcard Deck ({PRACTICE_CARDS.length})
          </button>
        </div>
      </div>

      {/* MEDICAL BOUNDARY DISCLAIMER */}
      <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 flex items-start gap-3 text-xs text-slate-700 dark:text-slate-300">
        <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-amber-900 dark:text-amber-200 block">
            Scope of Practice & Medical Boundary Notice
          </span>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed mt-0.5">
            Hypothetical coaching scenarios demonstrate educational applications of exercise physiology, biomechanics, and load management. They do not constitute medical diagnosis, physical therapy, or healthcare treatment. Any persistent joint pain, neurological numbness, or clinical symptoms require direct evaluation by a qualified medical professional.
          </p>
        </div>
      </div>

      {/* TAB 1: REALISTIC CASE STUDIES */}
      {activeTab === 'scenarios' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border-2 border-slate-100 dark:border-slate-700/80 shadow-sm space-y-6">
            
            <div className="flex items-center justify-between text-xs">
              <span className="text-[11px] font-black uppercase text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-3 py-1 rounded-full border border-amber-200">
                {currentCase.category}
              </span>
              <span className="font-bold text-slate-400">
                Case {activeCaseIdx + 1} of {CASE_STUDIES.length}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-snug">
                {currentCase.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {currentCase.scenario}
              </p>
            </div>

            {currentCase.diagramImageUrl && (
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-950 p-3 sm:p-4 space-y-2.5">
                <img
                  src={currentCase.diagramImageUrl}
                  alt={currentCase.title}
                  referrerPolicy="no-referrer"
                  className="w-full max-h-72 object-contain mx-auto rounded-xl"
                />
                {currentCase.diagramImageCaption && (
                  <p className="text-[11px] text-slate-300 leading-relaxed px-1 font-medium">
                    <strong className="text-amber-400 uppercase font-black tracking-wide mr-1.5">Anatomical / Mechanical Diagram:</strong>
                    {currentCase.diagramImageCaption}
                  </p>
                )}
              </div>
            )}

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200">
              <strong className="text-amber-600 dark:text-amber-400 block mb-1">Your Objective:</strong>
              {currentCase.decisionTask}
            </div>

            {/* Decision Options */}
            <div className="space-y-3">
              {currentCase.options.map((opt) => {
                const isSelected = selectedDecision === opt.id;
                let cardStyle = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200';
                
                if (isSelected && !isCaseSubmitted) {
                  cardStyle = 'bg-sky-50 border-sky-500 text-sky-900';
                } else if (isCaseSubmitted) {
                  if (opt.isOptimal) cardStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                  else if (isSelected) cardStyle = 'bg-rose-50 border-rose-500 text-rose-900';
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => {
                      if (isCaseSubmitted) return;
                      setSelectedDecision(opt.id);
                    }}
                    disabled={isCaseSubmitted}
                    className={`w-full p-4 rounded-2xl text-left border-2 transition-all cursor-pointer space-y-1.5 ${cardStyle}`}
                  >
                    <span className="font-black text-xs block">{opt.label}</span>
                    <p className="text-xs">{opt.decision}</p>
                    {isCaseSubmitted && (
                      <div className="text-[11px] pt-1 grid grid-cols-1 sm:grid-cols-2 gap-1 border-t border-slate-200 dark:border-slate-700">
                        <span className="text-emerald-700 dark:text-emerald-400">Pros: {opt.scientificPros}</span>
                        <span className="text-rose-700 dark:text-rose-400">Cons: {opt.scientificCons}</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {!isCaseSubmitted ? (
              <button
                onClick={handleSubmitCase}
                disabled={!selectedDecision}
                className="w-full py-3.5 rounded-2xl duo-btn-green font-black text-sm cursor-pointer disabled:opacity-40"
              >
                SUBMIT SCIENTIFIC JUSTIFICATION
              </button>
            ) : (
              <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-700 animate-in fade-in">
                <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
                  <strong className="text-emerald-700 dark:text-emerald-300 block mb-1">
                    ✓ Expert Scientific Synthesis & Literature Consensus:
                  </strong>
                  {currentCase.expertSynthesis}
                </div>

                <div className="flex justify-end">
                  {activeCaseIdx + 1 < CASE_STUDIES.length ? (
                    <button
                      onClick={() => {
                        setActiveCaseIdx((prev) => prev + 1);
                        setSelectedDecision(null);
                        setIsCaseSubmitted(false);
                      }}
                      className="px-6 py-2.5 rounded-xl duo-btn-blue text-xs font-black cursor-pointer flex items-center gap-1.5"
                    >
                      <span>NEXT CASE STUDY</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setActiveCaseIdx(0);
                        setSelectedDecision(null);
                        setIsCaseSubmitted(false);
                      }}
                      className="px-6 py-2.5 rounded-xl duo-btn-outline text-xs font-black cursor-pointer"
                    >
                      Restart Case Studies
                    </button>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* TAB 2: FLASHCARDS */}
      {activeTab === 'flashcards' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2 text-xs">
            <span className="font-extrabold text-slate-400">Card {cardIdx + 1} of {PRACTICE_CARDS.length}</span>
            <span className="font-black text-emerald-600">{masteredCards.length} Mastered</span>
          </div>

          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full min-h-[280px] rounded-3xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 p-8 shadow-xl flex flex-col justify-between cursor-pointer hover:border-amber-400 select-none transition-all"
          >
            <div className="flex items-center justify-between text-xs font-black text-slate-400 uppercase">
              <span>{currentCard.category}</span>
              <span className="flex items-center gap-1 text-slate-500">
                <RotateCw className="w-3.5 h-3.5" />
                Tap to flip
              </span>
            </div>

            <div className="py-6 text-center">
              {!isFlipped ? (
                <div className="space-y-2">
                  <span className="text-xs font-black text-sky-500 uppercase">Recall Prompt</span>
                  <p className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-relaxed">
                    {currentCard.front}
                  </p>
                </div>
              ) : (
                <div className="space-y-2 animate-in fade-in">
                  <span className="text-xs font-black text-emerald-500 uppercase">Scientific Answer</span>
                  <p className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200 leading-relaxed">
                    {currentCard.back}
                  </p>
                </div>
              )}
            </div>

            <div className="text-center text-[11px] font-bold text-slate-400">
              {isFlipped ? 'Rate your recall accuracy:' : 'Tap to reveal answer'}
            </div>
          </div>

          {isFlipped && (
            <div className="flex gap-4 animate-in fade-in">
              <button
                onClick={() => handleCardFeedback(false)}
                className="flex-1 py-3.5 rounded-2xl bg-rose-50 text-rose-700 border-2 border-rose-300 font-black text-xs cursor-pointer"
              >
                Needs Review
              </button>
              <button
                onClick={() => handleCardFeedback(true)}
                className="flex-1 py-3.5 rounded-2xl duo-btn-green font-black text-xs cursor-pointer shadow-md"
              >
                Recalled Correctly ✓
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
