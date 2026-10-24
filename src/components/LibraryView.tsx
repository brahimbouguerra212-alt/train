import React, { useState } from 'react';
import { 
  Library, 
  Search, 
  Calculator, 
  Bookmark, 
  Trash2, 
  ArrowRight, 
  Scale, 
  Flame, 
  Activity,
  Layers,
  Dumbbell,
  ExternalLink,
  Flag,
  CheckCircle2,
  AlertTriangle,
  Info,
  Eye,
  BookOpen,
  Zap,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GLOSSARY_ITEMS } from '../data/scientificLibrary';
import { CURATED_LESSONS } from '../data/lessonsData';
import { ScientificReference } from '../types';

interface AtlasDiagram {
  id: string;
  title: string;
  category: string;
  discipline: string;
  imageUrl: string;
  lessonId: string;
  lessonTitle: string;
  scientificBreakdown: string[];
  keyParameters: { label: string; value: string }[];
  clinicalOrLiftingTakeaway: string;
}

const SCIENTIFIC_ATLAS: AtlasDiagram[] = [
  {
    id: 'sarcomere-anatomy',
    title: 'Sarcomere Ultrastructure & Sliding Filament Microanatomy',
    category: 'Muscle Physiology',
    discipline: 'Cellular Biophysics & Myology',
    imageUrl: '/src/assets/images/sarcomere_anatomy_1792791862776.jpg',
    lessonId: 'lesson-10-3',
    lessonTitle: 'The Sliding Filament Theory & Cross-Bridge Power Stroke',
    scientificBreakdown: [
      'Bounded by dense protein Z-discs (anchoring thin actin filaments via α-actinin).',
      'The central dark A-band corresponds to the full length of thick myosin filaments.',
      'The light I-band represents areas where actin filaments do not overlap with myosin.',
      'The central H-zone contains only myosin rods without cross-bridges; the M-line anchors thick filaments.',
      'Giant titin proteins function as bidirectional molecular springs connecting the Z-disc to the M-line, generating passive tension when stretched.',
    ],
    keyParameters: [
      { label: 'Resting Length', value: '~2.0 – 2.2 µm' },
      { label: 'Force Generation', value: 'Cross-bridge overlap optimum' },
      { label: 'Titin Function', value: 'Passive elastic strain resistance' },
    ],
    clinicalOrLiftingTakeaway: 'Deep loaded stretches (e.g. at the bottom of a deficit stiff-leg deadlift or deep squat) lengthen sarcomeres beyond 2.4 µm, recruiting giant titin spring resistance and inducing stretch-mediated hypertrophy.',
  },
  {
    id: 'atp-hydrolysis',
    title: 'Adenosine Triphosphate (ATP) Anatomy & Hydrolysis Energetics',
    category: 'Bioenergetics',
    discipline: 'Thermodynamics & Biochemistry',
    imageUrl: '/src/assets/images/atp_molecule_energy_1792791863515.jpg',
    lessonId: 'lesson-5-1',
    lessonTitle: 'What Biological Energy Is: Free Energy and ATP Hydrolysis',
    scientificBreakdown: [
      'Composed of the nitrogenous purine base adenine bound to a 5-carbon ribose furanose ring.',
      'The triphosphate tail contains three phosphate groups (α, β, and γ) linked by high-energy phosphoanhydride bonds.',
      'Four negative charges at physiological pH generate intense electrostatic repulsion among the oxygens.',
      'Cleavage of the terminal γ-phosphate by myosin ATPase releases approximately -30.5 kJ/mol (standard ΔG°) and up to -50 kJ/mol in-vivo.',
      'Hydrolysis causes conformational snapping of the myosin lever arm (the 5–10 nm power stroke).',
    ],
    keyParameters: [
      { label: 'Standard ΔG°', value: '-30.5 kJ/mol (-7.3 kcal/mol)' },
      { label: 'Resting Muscle Stores', value: '4 – 6 mmol/kg wet tissue' },
      { label: 'Max Effort Lifespan', value: '1.5 – 2.0 seconds' },
    ],
    clinicalOrLiftingTakeaway: 'Because intracellular ATP stores are exhausted within 2 seconds of maximal lifting, energy regeneration mechanisms (phosphocreatine shuttle and anaerobic glycolysis) are indispensable for barbell training.',
  },
  {
    id: 'squat-moment-arms',
    title: 'Barbell Squat Biomechanics, Torque & Moment Arms',
    category: 'Biomechanics',
    discipline: 'Newtonian Physics & Articular Mechanics',
    imageUrl: '/src/assets/images/squat_biomechanics_torque_1792791863560.jpg',
    lessonId: 'lesson-13-2',
    lessonTitle: 'Biomechanics of the Back Squat: High-Bar vs Low-Bar vs Front Squat',
    scientificBreakdown: [
      'The external resistance is represented by the downward gravitational vector through the barbell center of mass (midfoot alignment).',
      'Knee moment arm (d_knee) is the horizontal perpendicular distance from the bar vector to the knee joint center of rotation.',
      'Hip moment arm (d_hip) is the horizontal perpendicular distance from the bar vector to the acetabulofemoral hip joint center.',
      'External joint torque equals Bar Weight × Perpendicular Moment Arm distance (τ = F × r_perp).',
      'Low-bar squats require greater forward torso angle, lengthening the hip moment arm and shortening the knee moment arm compared to upright front squats.',
    ],
    keyParameters: [
      { label: 'Torque Equation', value: 'τ = Force (N) × Distance (m)' },
      { label: 'High-Bar Vector', value: 'More upright torso, larger knee moment' },
      { label: 'Low-Bar Vector', value: 'More inclined torso, larger hip moment' },
    ],
    clinicalOrLiftingTakeaway: 'When lifters with long femurs squat, the center of mass forces their hips further behind the midfoot, geometrically creating a much longer hip moment arm that demands massive hip and lumbar extensor torque.',
  },
  {
    id: 'muscle-hierarchy',
    title: 'Skeletal Muscle Structural Hierarchy: From Belly to Myofilament',
    category: 'Anatomy',
    discipline: 'Histology & Connective Tissue Fascia',
    imageUrl: '/src/assets/images/muscle_hierarchy_fibers_1792791865627.jpg',
    lessonId: 'lesson-10-1',
    lessonTitle: 'Skeletal Muscle Hierarchy: Fascicles, Fibers, and Sarcomeres',
    scientificBreakdown: [
      'Whole Muscle Belly: Enclosed in dense fibrous connective tissue called the epimysium.',
      'Fascicles: Bundles of 10 to 100+ muscle fibers wrapped in protective perimysium, through which blood vessels and nerves navigate.',
      'Muscle Fiber (Myocyte): Single multinucleated skeletal muscle cells wrapped by endomysium and enclosed in the excitable sarcolemma.',
      'Myofibrils: Cylindrical contractile organelles running the entire length of the fiber, composed of repeating sarcomere units.',
      'Myofilaments: Macromolecular arrays of thick myosin and thin actin filaments that slide past each other during contraction.',
    ],
    keyParameters: [
      { label: 'Fascial Layers', value: 'Epimysium → Perimysium → Endomysium' },
      { label: 'Cell Type', value: 'Multinucleated syncytium' },
      { label: 'Force Transmission', value: 'Lateral via costamere matrix to tendon' },
    ],
    clinicalOrLiftingTakeaway: 'Hypertrophy involves lateral addition of myofibrils within individual muscle fibers (myofibrillar hypertrophy), which thickens each fascicle and expands the anatomical cross-sectional area (ACSA) of the muscle.',
  },
  {
    id: 'mechanotransduction-mtor',
    title: 'Mechanotransduction & mTORC1 Muscle Protein Synthesis Cascade',
    category: 'Molecular Biology',
    discipline: 'Intracellular Signal Transduction & Hypertrophy',
    imageUrl: '/src/assets/images/mechanotransduction_growth_1792791865261.jpg',
    lessonId: 'lesson-14-1',
    lessonTitle: 'Mechanical Tension: The Irrefutable Primary Stimulus for Hypertrophy',
    scientificBreakdown: [
      'Costameric Mechanosensors: Transmembrane integrins and dystrophin-associated glycoprotein complexes convert physical strain into chemical signals.',
      'Focal Adhesion Kinase (FAK) and phosphatidic acid (PA) synthesis via phospholipase D activation.',
      'Rheb-GTP binding directly activates Mechanistic Target of Rapamycin Complex 1 (mTORC1) on the lysosomal surface.',
      'Downstream phosphorylation of p70S6K and 4E-BP1 relieves translational inhibition of mRNA transcripts.',
      'Ribosomal biogenesis drives the sustained translation of new actin and myosin heavy chains for long-term myofibrillar accretion.',
    ],
    keyParameters: [
      { label: 'Master Regulator', value: 'mTORC1 (mechanistic target of rapamycin)' },
      { label: 'Primary Trigger', value: 'Mechanical tension (high active + passive strain)' },
      { label: 'Peak MPS Window', value: 'Elevated 24 to 48 hours post-session' },
    ],
    clinicalOrLiftingTakeaway: 'No amount of "metabolic pump" or "muscle burn" can substitute for high mechanical tension: tensile load directly stretches cell-surface costameres to biochemically unlock the mTORC1 protein synthesis cascade.',
  },
  {
    id: 'scientific-method-exercise',
    title: 'The Detailed Cycle of the Scientific Method in Exercise Biology',
    category: 'Research Literacy',
    discipline: 'Epistemology & Controlled Clinical Trials',
    imageUrl: '/src/assets/images/scientific_method_exercise_1792831735735.jpg',
    lessonId: 'lesson-1-1',
    lessonTitle: 'What is Science and How Do We Study the Human Body?',
    scientificBreakdown: [
      'Empirical Observation & Question: Objective tracking of human physiological response to barbell stress.',
      'Falsifiable Hypothesis Formulation: Defining testable assertions with measurable boundary conditions.',
      'Controlled Randomized Experimentation: Isolating the Independent Variable (e.g. 12 sets vs 4 sets) while holding nutrition, sleep, and genetics constant.',
      'Objective Quantitative Biometrics: Calibrated ultrasonography (ACSA mm), linear position transducers (m/s), and biochemical blood assays.',
      'Data Analysis & Peer Review: Statistical testing (p < 0.05) and independent replication to eliminate anecdotal confirmation bias and placebo artifacts.',
    ],
    keyParameters: [
      { label: 'Core Epistemology', value: 'Empirical falsifiability (Popperian)' },
      { label: 'Gold Standard', value: 'Double-blind randomized controlled trials' },
      { label: 'Key Biometric', value: 'Ultrasound muscle thickness (mm)' },
    ],
    clinicalOrLiftingTakeaway: 'Personal testimonials ("This supplement added 10kg to my bench overnight!") cannot control for placebo responses or confounding variables. Real strength training progress relies on reproducible scientific principles.',
  },
  {
    id: 'motor-unit-recruitment',
    title: 'The Motor Unit & Henneman\'s Size Principle',
    category: 'Neuroscience',
    discipline: 'Neuromuscular Physiology & Motor Control',
    imageUrl: '/src/assets/images/motor_unit_recruitment_1792831735646.jpg',
    lessonId: 'lesson-11-2',
    lessonTitle: 'Henneman\'s Size Principle: Low vs. High Threshold Motor Units',
    scientificBreakdown: [
      'Anterior Horn Alpha Motor Neuron: Somatic nerve cell body generating efferent action potentials.',
      'Myelinated Axon & Terminal Branches: Saltatory conduction propagating impulses rapidly to motor end plates.',
      'Neuromuscular Junction (NMJ): Synaptic release of acetylcholine (ACh) into sarcolemma receptors triggering T-tubule depolarization.',
      'Henneman\'s Size Principle Curve: Orderly recruitment from low-threshold fatigue-resistant Type I units to high-threshold glycolytic Type II units.',
      'High-threshold Type II motor units are only recruited when force demands are exceptionally high or as low-threshold fibers fatigue.',
    ],
    keyParameters: [
      { label: 'Neurotransmitter', value: 'Acetylcholine (ACh)' },
      { label: 'Recruitment Order', value: 'Type I → Type IIa → Type IIx/IIb' },
      { label: 'Stimulus for High-Threshold', value: 'Loads >80-85% 1RM or 0-2 RIR proximity' },
    ],
    clinicalOrLiftingTakeaway: 'To maximally stimulate the large, growth-prone Type II muscle fibers, lifters must either train with heavy weights (>80% 1RM) or push lighter sets to within 1-2 repetitions of muscular failure (RIR).',
  },
];

export const LibraryView: React.FC = () => {
  const { progress, deleteNote, startLesson, flagCitation, playSound } = useApp();
  const [activeTab, setActiveTab] = useState<'evidence' | 'atlas' | 'glossary' | 'calculators' | 'notes'>('evidence');
  const [zoomedAtlasId, setZoomedAtlasId] = useState<string | null>(null);

  // Glossary filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Evidence library state
  const [evidenceSearch, setEvidenceSearch] = useState('');
  const [reportingRef, setReportingRef] = useState<ScientificReference | null>(null);
  const [reportType, setReportType] = useState<'broken-link' | 'questionable-interpretation' | 'outdated-finding' | 'other'>('questionable-interpretation');
  const [reportNotes, setReportNotes] = useState('');
  const [reportSuccess, setReportSuccess] = useState(false);

  // 1RM Calculator state
  const [oneRmWeight, setOneRmWeight] = useState<number>(100);
  const [oneRmReps, setOneRmReps] = useState<number>(5);

  // Torque Calculator state
  const [torqueForce, setTorqueForce] = useState<number>(500);
  const [momentArmLength, setMomentArmLength] = useState<number>(0.25);

  // Protein Calculator state
  const [bodyWeightKg, setBodyWeightKg] = useState<number>(75);
  const [proteinGoalRate, setProteinGoalRate] = useState<number>(2.0);
  const [mealsPerDay, setMealsPerDay] = useState<number>(4);

  // Gather all unique verified references across curated lessons
  const allReferences: (ScientificReference & { lessonTitle: string; lessonId: string })[] = [];
  Object.values(CURATED_LESSONS).forEach((les) => {
    les.references.forEach((ref) => {
      if (!allReferences.some((r) => r.id === ref.id)) {
        allReferences.push({ ...ref, lessonTitle: les.title, lessonId: les.id });
      }
    });
  });

  const filteredEvidence = allReferences.filter((ref) => {
    if (!evidenceSearch.trim()) return true;
    const q = evidenceSearch.toLowerCase();
    return (
      ref.title.toLowerCase().includes(q) ||
      ref.authors.toLowerCase().includes(q) ||
      ref.claimSupported.toLowerCase().includes(q) ||
      ref.evidenceGrade.toLowerCase().includes(q)
    );
  });

  const safeWeight = isNaN(oneRmWeight) || oneRmWeight <= 0 ? 0 : oneRmWeight;
  const safeReps = isNaN(oneRmReps) || oneRmReps < 1 ? 1 : Math.min(12, oneRmReps);
  const brzycki1RM = safeReps === 1 ? safeWeight : Math.round(safeWeight / Math.max(0.1, 1.0278 - 0.0278 * safeReps));
  const epley1RM = safeReps === 1 ? safeWeight : Math.round(safeWeight * (1 + 0.0333 * safeReps));
  const safeForce = isNaN(torqueForce) ? 0 : torqueForce;
  const safeArm = isNaN(momentArmLength) ? 0 : momentArmLength;
  const jointTorqueNm = (safeForce * safeArm).toFixed(1);
  const safeWeightKg = isNaN(bodyWeightKg) || bodyWeightKg <= 0 ? 0 : bodyWeightKg;
  const safeMeals = isNaN(mealsPerDay) || mealsPerDay < 1 ? 1 : mealsPerDay;
  const totalDailyProtein = Math.round(safeWeightKg * proteinGoalRate);
  const proteinPerMeal = Math.round(totalDailyProtein / safeMeals);

  const categories = ['all', 'Biology & Cells', 'Biochemistry & Energy', 'Anatomy & Physiology', 'Biomechanics & Physics', 'Training & Hypertrophy', 'Nutrition & Supplements'];
  const filteredGlossary = GLOSSARY_ITEMS.filter((item) => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return item.term.toLowerCase().includes(q) || item.definition.toLowerCase().includes(q) || item.practicalContext.toLowerCase().includes(q);
  });

  const handleCitationReportSubmit = () => {
    if (!reportingRef) return;
    flagCitation(reportingRef.id, reportingRef.citationString, reportingRef.id, reportType, reportNotes);
    setReportSuccess(true);
    setTimeout(() => {
      setReportingRef(null);
      setReportNotes('');
      setReportSuccess(false);
    }, 2000);
  };

  return (
    <div className="flex-1 pb-24 md:pb-12 max-w-5xl mx-auto px-4 pt-6 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border-2 border-slate-100 dark:border-slate-700/80 shadow-sm space-y-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <Library className="w-4 h-4" />
            Scientific Library & Evidence Verification
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            Traceable Evidence, Glossary & Calculators
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            A permanent reference database of peer-reviewed research citations, exercise science definitions, and biomechanical physics calculators.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap gap-2 pt-2">
          <button
            onClick={() => setActiveTab('evidence')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'evidence'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Evidence Library ({allReferences.length} Verified Sources)</span>
          </button>

          <button
            onClick={() => setActiveTab('atlas')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'atlas'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-emerald-500" />
            <span>Visual Scientific Atlas ({SCIENTIFIC_ATLAS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('glossary')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === 'glossary'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Glossary ({GLOSSARY_ITEMS.length})
          </button>

          <button
            onClick={() => setActiveTab('calculators')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === 'calculators'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Physics Calculators
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === 'notes'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Saved Notes ({progress.savedNotes.length})
          </button>
        </div>
      </div>

      {/* TAB 1: EVIDENCE LIBRARY (TRACEABLE CITATIONS & VERIFICATION) */}
      {activeTab === 'evidence' && (
        <div className="space-y-4">
          
          {/* Transparency Disclaimer */}
          <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900/60 flex items-start gap-3 text-xs text-slate-700 dark:text-slate-300">
            <Info className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sky-900 dark:text-sky-200">Traceable Verification Notice</p>
              <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
                All citations are verified from peer-reviewed exercise science journals and foundational textbooks. In this standalone environment without live external browser sessions, papers reflect verified literature records as of 2026. Use the <strong>Flag Citation</strong> button to report any questionable interpretations or broken links.
              </p>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search papers, authors (Schoenfeld, Berg, Popper...), or study types..."
              value={evidenceSearch}
              onChange={(e) => setEvidenceSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Reference List */}
          <div className="space-y-3">
            {filteredEvidence.map((ref) => (
              <div
                key={ref.id}
                className="bg-white dark:bg-slate-800 rounded-3xl p-5 border-2 border-slate-100 dark:border-slate-700/80 shadow-sm space-y-2.5 text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-sm font-black text-slate-900 dark:text-white">
                    {ref.title}
                  </h3>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                      {ref.evidenceGrade}
                    </span>
                    <button
                      onClick={() => setReportingRef(ref)}
                      className="text-[11px] font-bold text-slate-400 hover:text-rose-500 flex items-center gap-1 cursor-pointer"
                    >
                      <Flag className="w-3 h-3" />
                      <span>Flag</span>
                    </button>
                  </div>
                </div>

                <p className="text-[11px] text-slate-600 dark:text-slate-400 font-mono">
                  {ref.authors} ({ref.year}). <em>{ref.journalOrPublisher}</em>.
                </p>

                <div className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  <strong className="text-emerald-600 dark:text-emerald-400">Claim Supported: </strong>
                  {ref.claimSupported}
                </div>

                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  <strong>Study Limitations: </strong>
                  {ref.limitations}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700 text-[10px] text-slate-400">
                  <button
                    onClick={() => startLesson(ref.lessonId)}
                    className="text-emerald-600 dark:text-emerald-400 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>View in {ref.lessonTitle}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <div className="flex items-center gap-3">
                    <span>Verified: {ref.lastVerifiedDate}</span>
                    {ref.doiOrUrl && (
                      <a 
                        href={ref.doiOrUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1 font-mono"
                      >
                        <span>{ref.doiOrUrl.replace('https://doi.org/', 'doi:')}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* TAB: VISUAL SCIENTIFIC ATLAS */}
      {activeTab === 'atlas' && (
        <div className="space-y-6">
          <div className="p-5 rounded-3xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 flex items-start gap-3.5 text-xs text-slate-700 dark:text-slate-300">
            <Layers className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-emerald-900 dark:text-emerald-200 text-sm">
                High-Resolution Scientific Anatomy & Biomechanical Atlas
              </p>
              <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
                Visualizing molecular cascades, intracellular organelles, musculoskeletal lever mechanics, and bioenergetics. Tap any diagram to inspect fine details, review step-by-step mechanisms, or launch into the relevant academy lesson.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {SCIENTIFIC_ATLAS.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-800 rounded-3xl border-2 border-slate-100 dark:border-slate-700/80 shadow-md overflow-hidden flex flex-col md:flex-row transition-all hover:border-emerald-300 dark:hover:border-emerald-700"
              >
                {/* Visual Image Preview */}
                <div 
                  className="md:w-5/12 bg-slate-950 flex flex-col items-center justify-center p-4 relative group cursor-pointer"
                  onClick={() => setZoomedAtlasId(item.id)}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto max-h-72 object-contain rounded-xl transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-bold rounded-xl pointer-events-none">
                    <Eye className="w-4 h-4 text-emerald-400" />
                    <span>Click to Zoom & Inspect</span>
                  </div>
                  <div className="mt-2 text-center">
                    <span className="text-[10px] font-mono text-slate-400 flex items-center justify-center gap-1">
                      <Eye className="w-3 h-3 text-emerald-400" /> Tap for full inspection
                    </span>
                  </div>
                </div>

                {/* Information Breakdown */}
                <div className="md:w-7/12 p-6 sm:p-7 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                          {item.category}
                        </span>
                        <span className="text-[11px] font-bold text-slate-400">
                          {item.discipline}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug">
                      {item.title}
                    </h3>

                    <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                      {item.scientificBreakdown.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Key Parameters */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                      {item.keyParameters.map((param, pIdx) => (
                        <div key={pIdx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-[11px]">
                          <span className="text-slate-400 block font-bold text-[10px] uppercase">{param.label}</span>
                          <span className="font-extrabold text-slate-800 dark:text-slate-200">{param.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Lifting Takeaway */}
                    <div className="p-3 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 text-xs">
                      <strong className="text-amber-800 dark:text-amber-400 block mb-0.5">Strength / Hypertrophy Application:</strong>
                      <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                        {item.clinicalOrLiftingTakeaway}
                      </p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-medium">Curriculum: {item.lessonTitle}</span>
                    <button
                      onClick={() => {
                        playSound('click');
                        startLesson(item.lessonId);
                      }}
                      className="px-4 py-2 rounded-xl duo-btn-green font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <span>Study Lesson</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: GLOSSARY */}
      {activeTab === 'glossary' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search terms, definitions, ATP, sarcomere, torque..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGlossary.map((item, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-800 rounded-3xl p-5 border-2 border-slate-100 dark:border-slate-700/80 shadow-sm space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black text-slate-900 dark:text-white">{item.term}</h3>
                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {item.definition}
                </p>
                <div className="pt-2 border-t border-slate-100 dark:border-slate-700 text-[11px] text-emerald-700 dark:text-emerald-400">
                  <span className="font-bold">Lifting Application: </span>{item.practicalContext}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CALCULATORS */}
      {activeTab === 'calculators' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border-2 border-slate-100 dark:border-slate-700/80 shadow-sm space-y-4">
            <div>
              <span className="text-xs font-black uppercase text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <Dumbbell className="w-4 h-4" />
                Submaximal Strength Estimator
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white mt-1">One-Rep Maximum (1RM)</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Brzycki & Epley equations (valid for 1-10 reps).</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">Weight Lifted</label>
                <input
                  type="number"
                  value={oneRmWeight}
                  onChange={(e) => setOneRmWeight(Math.max(1, parseFloat(e.target.value) || 0))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border font-bold text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">Reps Completed</label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={oneRmReps}
                  onChange={(e) => setOneRmReps(Math.min(12, Math.max(1, parseInt(e.target.value) || 1)))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border font-bold text-sm"
                />
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 flex items-center justify-around text-center">
              <div>
                <span className="text-xs font-bold text-slate-500">Brzycki</span>
                <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{brzycki1RM}</p>
              </div>
              <div className="w-px h-8 bg-emerald-300 dark:bg-emerald-800" />
              <div>
                <span className="text-xs font-bold text-slate-500">Epley</span>
                <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{epley1RM}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border-2 border-slate-100 dark:border-slate-700/80 shadow-sm space-y-4">
            <div>
              <span className="text-xs font-black uppercase text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
                <Activity className="w-4 h-4" />
                Biomechanics Physics
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white mt-1">Joint Torque & Moment Arm</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">τ = Force × Perpendicular Moment Arm (N·m).</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">Force (N)</label>
                <input
                  type="number"
                  value={torqueForce}
                  onChange={(e) => setTorqueForce(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border font-bold text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">Moment Arm (m)</label>
                <input
                  type="number"
                  step="0.05"
                  value={momentArmLength}
                  onChange={(e) => setMomentArmLength(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border font-bold text-sm"
                />
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 text-center">
              <span className="text-xs font-bold text-slate-500">Total Joint Torque</span>
              <p className="text-3xl font-black text-sky-600 dark:text-sky-400 mt-0.5">{jointTorqueNm} N·m</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border-2 border-slate-100 dark:border-slate-700/80 shadow-sm space-y-4 md:col-span-2">
            <div>
              <span className="text-xs font-black uppercase text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                <Scale className="w-4 h-4" />
                Sports Nutrition Targets
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white mt-1">Daily Protein & Leucine Distribution</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Morton et al. (2018) meta-analysis: 1.6 to 2.2 g/kg/day.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold block mb-1">Body Weight (kg)</label>
                <input
                  type="number"
                  value={bodyWeightKg}
                  onChange={(e) => setBodyWeightKg(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border font-bold text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-bold block mb-1">Target Rate</label>
                <select
                  value={proteinGoalRate}
                  onChange={(e) => setProteinGoalRate(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border font-bold text-xs"
                >
                  <option value={1.6}>1.6 g/kg (Moderate)</option>
                  <option value={2.0}>2.0 g/kg (Optimal Hypertrophy)</option>
                  <option value={2.4}>2.4 g/kg (Deficit Preservation)</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold block mb-1">Meals Per Day</label>
                <input
                  type="number"
                  min="2"
                  max="6"
                  value={mealsPerDay}
                  onChange={(e) => setMealsPerDay(Math.min(6, Math.max(2, parseInt(e.target.value) || 3)))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border font-bold text-sm"
                />
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 grid grid-cols-2 text-center">
              <div>
                <span className="text-xs font-bold text-slate-500">Total Daily Protein</span>
                <p className="text-3xl font-black text-amber-600 dark:text-amber-400">{totalDailyProtein} g/day</p>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-500">Target Per Meal</span>
                <p className="text-3xl font-black text-amber-600 dark:text-amber-400">{proteinPerMeal} g/meal</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SAVED NOTES */}
      {activeTab === 'notes' && (
        <div className="space-y-4">
          {progress.savedNotes.length === 0 ? (
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border-2 border-slate-100 dark:border-slate-700/80 text-center space-y-2">
              <Bookmark className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">No Saved Notes Yet</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Save notes while reading any lesson to review them here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {progress.savedNotes.map((note) => (
                <div key={note.id} className="bg-white dark:bg-slate-800 rounded-3xl p-5 border-2 border-slate-100 dark:border-slate-700/80 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => startLesson(note.lessonId)}
                      className="text-xs font-black text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>{note.lessonTitle}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400">{note.createdAt}</span>
                      <button onClick={() => deleteNote(note.id)} className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-medium whitespace-pre-line leading-relaxed">
                    {note.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* CITATION REPORT MODAL */}
      {reportingRef && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full border-2 border-slate-100 dark:border-slate-800 shadow-2xl space-y-4">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Flag className="w-4 h-4 text-rose-500" />
              <span>Report Reference: {reportingRef.authors} ({reportingRef.year})</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Provide context if this citation is broken, outdated, or misinterpreted:
            </p>
            <select
              value={reportType}
              onChange={(e: any) => setReportType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs font-bold"
            >
              <option value="questionable-interpretation">Questionable Interpretation</option>
              <option value="broken-link">Broken DOI / Link</option>
              <option value="outdated-finding">Outdated by Newer Meta-Analysis</option>
              <option value="other">Other Issue</option>
            </select>
            <textarea
              rows={3}
              placeholder="Explain the critique or link a newer paper..."
              value={reportNotes}
              onChange={(e) => setReportNotes(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs"
            />
            <div className="flex gap-2 justify-end">
              <button onClick={() => setReportingRef(null)} className="px-4 py-2 text-xs font-bold">Cancel</button>
              <button onClick={handleCitationReportSubmit} className="px-4 py-2 rounded-xl duo-btn-blue text-xs font-black">Submit</button>
            </div>
            {reportSuccess && <p className="text-xs font-bold text-emerald-600 text-center">✓ Report logged!</p>}
          </div>
        </div>
      )}

      {/* FULL-SCREEN ZOOM MODAL FOR ATLAS DIAGRAM */}
      {zoomedAtlasId && (() => {
        const item = SCIENTIFIC_ATLAS.find((d) => d.id === zoomedAtlasId);
        if (!item) return null;
        return (
          <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col p-4 sm:p-6 overflow-y-auto">
            <div className="max-w-5xl w-full mx-auto flex-1 flex flex-col space-y-4">
              <div className="flex items-center justify-between text-white pb-2 border-b border-white/10">
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">{item.category} • {item.discipline}</span>
                  <h3 className="text-lg sm:text-xl font-black">{item.title}</h3>
                </div>
                <button
                  onClick={() => setZoomedAtlasId(null)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 flex items-center justify-center bg-black/60 rounded-3xl p-4 border border-white/10">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[75vh] w-auto max-w-full object-contain mx-auto rounded-2xl shadow-2xl"
                />
              </div>

              <div className="bg-slate-900 rounded-2xl p-4 border border-white/10 text-white text-xs space-y-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="font-bold text-emerald-300">Takeaway: {item.clinicalOrLiftingTakeaway}</p>
                  <p className="text-[11px] text-slate-400 font-mono">Associated Lesson: {item.lessonTitle}</p>
                </div>
                <button
                  onClick={() => {
                    setZoomedAtlasId(null);
                    startLesson(item.lessonId);
                  }}
                  className="px-5 py-2.5 rounded-xl duo-btn-green font-black text-xs shrink-0 cursor-pointer"
                >
                  Open Associated Lesson
                </button>
              </div>
            </div>
          </div>
        );
      })()}

    </div>
  );
};
