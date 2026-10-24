import { Stage, Module } from '../types';

export const STAGES: Stage[] = [
  {
    id: 'stage-1',
    number: 1,
    title: 'STAGE I: Scientific & Mathematical Foundations',
    subtitle: 'From zero knowledge to scientific thinking and quantitative literacy',
    color: '#58cc02', // Duolingo green
    icon: 'Brain',
    moduleIds: ['module-1', 'module-2'],
  },
  {
    id: 'stage-2',
    number: 2,
    title: 'STAGE II: Chemistry & Biochemistry',
    subtitle: 'Atoms, molecules, proteins, and cellular bioenergetics',
    color: '#1cb0f6', // Duolingo blue
    icon: 'Atom',
    moduleIds: ['module-3', 'module-4', 'module-5'],
  },
  {
    id: 'stage-3',
    number: 3,
    title: 'STAGE III: Cell Biology & Molecular Biology',
    subtitle: 'Cellular anatomy, organelle machinery, genetics, and protein synthesis',
    color: '#a855f7', // Duolingo purple
    icon: 'Dna',
    moduleIds: ['module-6', 'module-7'],
  },
  {
    id: 'stage-4',
    number: 4,
    title: 'STAGE IV: Human Anatomy & Physiology',
    subtitle: 'Bones, joints, organ systems, and skeletal muscle contraction',
    color: '#ff9600', // Duolingo orange
    icon: 'Activity',
    moduleIds: ['module-8', 'module-9', 'module-10'],
  },
  {
    id: 'stage-5',
    number: 5,
    title: 'STAGE V: Neuroscience & Biomechanics',
    subtitle: 'Motor units, electrical signaling, Newtonian physics, and barbell levers',
    color: '#ff4b4b', // Duolingo red
    icon: 'Zap',
    moduleIds: ['module-11', 'module-12', 'module-13'],
  },
  {
    id: 'stage-6',
    number: 6,
    title: 'STAGE VI: Muscle Growth & Strength Adaptation',
    subtitle: 'Hypertrophy cascades, mechanical tension, neural drive, and connective tissue',
    color: '#ce82ff', // Electric violet
    icon: 'Dumbbell',
    moduleIds: ['module-14', 'module-15', 'module-16'],
  },
  {
    id: 'stage-7',
    number: 7,
    title: 'STAGE VII: Training Science & Program Design',
    subtitle: 'Intensity, volume, RPE/RIR, progressive overload, and periodization',
    color: '#00cd9c', // Teal green
    icon: 'TrendingUp',
    moduleIds: ['module-17', 'module-18', 'module-19', 'module-20'],
  },
  {
    id: 'stage-8',
    number: 8,
    title: 'STAGE VIII: Nutrition, Recovery & Health',
    subtitle: 'Macronutrients, sleep architecture, endocrinology, and injury risk',
    color: '#2b70c9', // Deep royal
    icon: 'Moon',
    moduleIds: ['module-21', 'module-22', 'module-23', 'module-24', 'module-25', 'module-26'],
  },
  {
    id: 'stage-9',
    number: 9,
    title: 'STAGE IX: Supplements, Research & Practical Mastery',
    subtitle: 'Ergogenic aids, scientific literacy, performance diagnostics, and athlete coaching',
    color: '#ffc800', // Golden crown
    icon: 'Award',
    moduleIds: ['module-27', 'module-28', 'module-29', 'module-30'],
  },
];

export const MODULES: Module[] = [
  // STAGE I
  {
    id: 'module-1',
    stageId: 'stage-1',
    number: 1,
    title: 'Learning How Science Works',
    description: 'Empirical observation, hypotheses, variables, models, correlation vs causation, and evaluating claims.',
    icon: 'FlaskConical',
    prerequisites: [],
    chapters: [
      {
        id: 'mod-1-ch-1',
        moduleId: 'module-1',
        title: 'The Scientific Method & Human Biology',
        description: 'How we investigate truth about the human organism',
        lessons: [
          { id: 'lesson-1-1', moduleId: 'module-1', chapterId: 'mod-1-ch-1', number: 1, title: 'What is Science and How Do We Study the Human Body?', durationMinutes: 12, xpReward: 50 },
          { id: 'lesson-1-2', moduleId: 'module-1', chapterId: 'mod-1-ch-1', number: 2, title: 'Formulating Hypotheses and Designing Controlled Experiments', durationMinutes: 14, xpReward: 50 },
          { id: 'lesson-1-3', moduleId: 'module-1', chapterId: 'mod-1-ch-1', number: 3, title: 'Independent, Dependent, and Confounding Variables in Exercise Studies', durationMinutes: 15, xpReward: 50 },
        ],
      },
      {
        id: 'mod-1-ch-2',
        moduleId: 'module-1',
        title: 'Evaluating Scientific Evidence & Claims',
        description: 'Distinguishing causal mechanisms from statistical illusions',
        lessons: [
          { id: 'lesson-1-4', moduleId: 'module-1', chapterId: 'mod-1-ch-2', number: 4, title: 'Correlation vs. Causation: Why Association is Not Cause', durationMinutes: 15, xpReward: 55 },
          { id: 'lesson-1-5', moduleId: 'module-1', chapterId: 'mod-1-ch-2', number: 5, title: 'Scientific Uncertainty, Replication Crises, and Spotting Pseudoscience', durationMinutes: 16, xpReward: 60 },
        ],
      },
    ],
  },
  {
    id: 'module-2',
    stageId: 'stage-1',
    number: 2,
    title: 'Essential Mathematics for Exercise Science',
    description: 'Arithmetic, ratios, scientific notation, unit conversions, graphs, and volume calculations.',
    icon: 'Calculator',
    prerequisites: ['module-1'],
    chapters: [
      {
        id: 'mod-2-ch-1',
        moduleId: 'module-2',
        title: 'Quantitative Foundations & Units',
        description: 'Mastering the metric system, ratios, and percentages',
        lessons: [
          { id: 'lesson-2-1', moduleId: 'module-2', chapterId: 'mod-2-ch-1', number: 1, title: 'Fractions, Percentages, and Scientific Notation in Physiology', durationMinutes: 12, xpReward: 50 },
          { id: 'lesson-2-2', moduleId: 'module-2', chapterId: 'mod-2-ch-1', number: 2, title: 'International System of Units (SI): Kilograms, Newtons, and Joules', durationMinutes: 14, xpReward: 50 },
          { id: 'lesson-2-3', moduleId: 'module-2', chapterId: 'mod-2-ch-1', number: 3, title: 'Reading Scientific Graphs, Standard Deviations, and Error Bars', durationMinutes: 15, xpReward: 55 },
          { id: 'lesson-2-4', moduleId: 'module-2', chapterId: 'mod-2-ch-1', number: 4, title: 'Calculating Training Tonnage, Relative Intensity, and Volume Load', durationMinutes: 15, xpReward: 60 },
        ],
      },
    ],
  },

  // STAGE II
  {
    id: 'module-3',
    stageId: 'stage-2',
    number: 3,
    title: 'Chemistry From Zero',
    description: 'Matter, subatomic particles, elements, chemical bonds, water polarity, pH, and chemical reactions.',
    icon: 'Atom',
    prerequisites: ['module-2'],
    chapters: [
      {
        id: 'mod-3-ch-1',
        moduleId: 'module-3',
        title: 'Atomic Structure & Chemical Bonding',
        description: 'From protons, neutrons, and electrons to stable molecules',
        lessons: [
          { id: 'lesson-3-1', moduleId: 'module-3', chapterId: 'mod-3-ch-1', number: 1, title: 'Atoms, Elements, and Subatomic Particles (Zero Jargon)', durationMinutes: 14, xpReward: 50 },
          { id: 'lesson-3-2', moduleId: 'module-3', chapterId: 'mod-3-ch-1', number: 2, title: 'Covalent, Ionic, and Hydrogen Bonds in Biological Systems', durationMinutes: 15, xpReward: 55 },
          { id: 'lesson-3-3', moduleId: 'module-3', chapterId: 'mod-3-ch-1', number: 3, title: 'Water Polarity, Solubility, and Electrolytes in Hydration', durationMinutes: 14, xpReward: 50 },
          { id: 'lesson-3-4', moduleId: 'module-3', chapterId: 'mod-3-ch-1', number: 4, title: 'Acids, Bases, the pH Scale, and Cellular Acid-Base Buffering', durationMinutes: 16, xpReward: 60 },
        ],
      },
    ],
  },
  {
    id: 'module-4',
    stageId: 'stage-2',
    number: 4,
    title: 'Biomolecules & Molecular Structure',
    description: 'Carbohydrates, lipids, amino acids, peptide bonds, protein folding, enzymes, and nucleic acids.',
    icon: 'Layers',
    prerequisites: ['module-3'],
    chapters: [
      {
        id: 'mod-4-ch-1',
        moduleId: 'module-4',
        title: 'Proteins, Lipids & Carbohydrates',
        description: 'The architectural polymers of living tissue',
        lessons: [
          { id: 'lesson-4-1', moduleId: 'module-4', chapterId: 'mod-4-ch-1', number: 1, title: 'Carbohydrates: Monosaccharides, Glycogen Polymerization, and Stored Fuel', durationMinutes: 15, xpReward: 55 },
          { id: 'lesson-4-2', moduleId: 'module-4', chapterId: 'mod-4-ch-1', number: 2, title: 'Lipids and Fatty Acids: Membrane Bilayers and Hormonal Precursors', durationMinutes: 14, xpReward: 50 },
          { id: 'lesson-4-3', moduleId: 'module-4', chapterId: 'mod-4-ch-1', number: 3, title: 'Amino Acids, Peptide Bonds, and the 4 Levels of Protein Structure', durationMinutes: 16, xpReward: 60 },
          { id: 'lesson-4-4', moduleId: 'module-4', chapterId: 'mod-4-ch-1', number: 4, title: 'Enzymes: Biological Catalysts, Active Sites, and Activation Energy', durationMinutes: 15, xpReward: 55 },
        ],
      },
    ],
  },
  {
    id: 'module-5',
    stageId: 'stage-2',
    number: 5,
    title: 'Bioenergetics & Cellular Metabolism',
    description: 'ATP hydrolysis, phosphagen system, glycolysis, Krebs cycle, electron transport chain, and lactate.',
    icon: 'Flame',
    prerequisites: ['module-4'],
    chapters: [
      {
        id: 'mod-5-ch-1',
        moduleId: 'module-5',
        title: 'Energy Transfer & Cellular ATP',
        description: 'The universal energy currency and phosphocreatine',
        lessons: [
          { id: 'lesson-5-1', moduleId: 'module-5', chapterId: 'mod-5-ch-1', number: 1, title: 'What Biological Energy Is: Free Energy and ATP Hydrolysis', durationMinutes: 16, xpReward: 60 },
          { id: 'lesson-5-2', moduleId: 'module-5', chapterId: 'mod-5-ch-1', number: 2, title: 'The Phosphocreatine (ATP-PCr) System: Fueling Maximal Repetitions', durationMinutes: 15, xpReward: 55 },
          { id: 'lesson-5-3', moduleId: 'module-5', chapterId: 'mod-5-ch-1', number: 3, title: 'Anaerobic Glycolysis, Pyruvate, and the Truth About Lactate', durationMinutes: 18, xpReward: 65 },
          { id: 'lesson-5-4', moduleId: 'module-5', chapterId: 'mod-5-ch-1', number: 4, title: 'Mitochondrial Aerobic Respiration: Krebs Cycle and Oxidative Phosphorylation', durationMinutes: 18, xpReward: 65 },
        ],
      },
    ],
  },

  // STAGE III
  {
    id: 'module-6',
    stageId: 'stage-3',
    number: 6,
    title: 'Cell Biology From Absolute Zero',
    description: 'Membranes, organelles, nucleus, ribosomes, endoplasmic reticulum, mitochondria, and homeostasis.',
    icon: 'Shield',
    prerequisites: ['module-4'],
    chapters: [
      {
        id: 'mod-6-ch-1',
        moduleId: 'module-6',
        title: 'Cell Anatomy & Internal Machinery',
        description: 'The living unit of human tissue',
        lessons: [
          { id: 'lesson-6-1', moduleId: 'module-6', chapterId: 'mod-6-ch-1', number: 1, title: 'What is a Cell? Phospholipid Bilayers and Selective Permeability', durationMinutes: 15, xpReward: 55 },
          { id: 'lesson-6-2', moduleId: 'module-6', chapterId: 'mod-6-ch-1', number: 2, title: 'Organelles: Nucleus, Ribosomes, and the Endoplasmic Reticulum', durationMinutes: 16, xpReward: 60 },
          { id: 'lesson-6-3', moduleId: 'module-6', chapterId: 'mod-6-ch-1', number: 3, title: 'Mitochondria: Cristae Structure, Density, and Aerobic Powerhouses', durationMinutes: 16, xpReward: 60 },
          { id: 'lesson-6-4', moduleId: 'module-6', chapterId: 'mod-6-ch-1', number: 4, title: 'Cellular Transport: Passive Diffusion, Ion Channels, and Active Pumps', durationMinutes: 15, xpReward: 55 },
        ],
      },
    ],
  },
  {
    id: 'module-7',
    stageId: 'stage-3',
    number: 7,
    title: 'Genetics & Molecular Muscle Biology',
    description: 'DNA structure, transcription, translation, ribosomal biogenesis, mTORC1, satellite cells, and epigenetics.',
    icon: 'Dna',
    prerequisites: ['module-6'],
    chapters: [
      {
        id: 'mod-7-ch-1',
        moduleId: 'module-7',
        title: 'Gene Expression & Adaptation Signaling',
        description: 'How mechanical load translates into new contractile proteins',
        lessons: [
          { id: 'lesson-7-1', moduleId: 'module-7', chapterId: 'mod-7-ch-1', number: 1, title: 'DNA, RNA, and the Central Dogma: Transcription to Translation', durationMinutes: 16, xpReward: 60 },
          { id: 'lesson-7-2', moduleId: 'module-7', chapterId: 'mod-7-ch-1', number: 2, title: 'Mechanical Tension Signaling: Costameres, Mechanosensors, and mTORC1', durationMinutes: 18, xpReward: 65 },
          { id: 'lesson-7-3', moduleId: 'module-7', chapterId: 'mod-7-ch-1', number: 3, title: 'Satellite Cells, Myonuclear Addition, and Muscle Memory', durationMinutes: 17, xpReward: 65 },
          { id: 'lesson-7-4', moduleId: 'module-7', chapterId: 'mod-7-ch-1', number: 4, title: 'Epigenetics and Genetic Limits of Muscle and Strength Accretion', durationMinutes: 16, xpReward: 60 },
        ],
      },
    ],
  },

  // STAGE IV
  {
    id: 'module-8',
    stageId: 'stage-4',
    number: 8,
    title: 'Human Anatomy From Zero',
    description: 'Anatomical terms, planes of motion, skeletal joints, muscle origins/insertions, and major prime movers.',
    icon: 'Activity',
    prerequisites: ['module-1'],
    chapters: [
      {
        id: 'mod-8-ch-1',
        moduleId: 'module-8',
        title: 'Anatomical Orientation & Articular Joints',
        description: 'Describing human movement in three dimensions',
        lessons: [
          { id: 'lesson-8-1', moduleId: 'module-8', chapterId: 'mod-8-ch-1', number: 1, title: 'Anatomical Position, Planes of Motion, and Directional Terminology', durationMinutes: 14, xpReward: 50 },
          { id: 'lesson-8-2', moduleId: 'module-8', chapterId: 'mod-8-ch-1', number: 2, title: 'Skeletal Bones, Synovial Joints, and Degrees of Freedom', durationMinutes: 15, xpReward: 55 },
          { id: 'lesson-8-3', moduleId: 'module-8', chapterId: 'mod-8-ch-1', number: 3, title: 'Upper Body Anatomy: Pectoralis, Latissimus, Deltoids, and Arms', durationMinutes: 18, xpReward: 65 },
          { id: 'lesson-8-4', moduleId: 'module-8', chapterId: 'mod-8-ch-1', number: 4, title: 'Lower Body Anatomy: Quadriceps, Hamstrings, Gluteals, and Spine', durationMinutes: 18, xpReward: 65 },
        ],
      },
    ],
  },
  {
    id: 'module-9',
    stageId: 'stage-4',
    number: 9,
    title: 'Human Physiology & Organ Systems',
    description: 'Homeostasis, cardiovascular blood delivery, respiratory ventilation, autonomic nervous system, and thermoregulation.',
    icon: 'HeartPulse',
    prerequisites: ['module-6', 'module-8'],
    chapters: [
      {
        id: 'mod-9-ch-1',
        moduleId: 'module-9',
        title: 'Integrated Physiological Systems',
        description: 'How organ systems support acute exercise and recover',
        lessons: [
          { id: 'lesson-9-1', moduleId: 'module-9', chapterId: 'mod-9-ch-1', number: 1, title: 'Homeostasis, Negative Feedback Loops, and Acute Stress Responses', durationMinutes: 15, xpReward: 55 },
          { id: 'lesson-9-2', moduleId: 'module-9', chapterId: 'mod-9-ch-1', number: 2, title: 'Cardiovascular Dynamics: Stroke Volume, Cardiac Output, and Blood Pressure', durationMinutes: 16, xpReward: 60 },
          { id: 'lesson-9-3', moduleId: 'module-9', chapterId: 'mod-9-ch-1', number: 3, title: 'The Valsalva Maneuver, Intra-Abdominal Pressure, and Spinal Stability', durationMinutes: 16, xpReward: 60 },
          { id: 'lesson-9-4', moduleId: 'module-9', chapterId: 'mod-9-ch-1', number: 4, title: 'Fluid Homeostasis, Electrolyte Balance, and Renal Regulation', durationMinutes: 15, xpReward: 55 },
        ],
      },
    ],
  },
  {
    id: 'module-10',
    stageId: 'stage-4',
    number: 10,
    title: 'Muscle Physiology & Contraction Mechanics',
    description: 'Sarcomeres, actin-myosin cross-bridges, excitation-contraction coupling, fiber types, and length-tension curves.',
    icon: 'Cpu',
    prerequisites: ['module-5', 'module-8'],
    chapters: [
      {
        id: 'mod-10-ch-1',
        moduleId: 'module-10',
        title: 'Microscopic Muscle Architecture',
        description: 'The sliding filament model and force generation',
        lessons: [
          { id: 'lesson-10-1', moduleId: 'module-10', chapterId: 'mod-10-ch-1', number: 1, title: 'Skeletal Muscle Hierarchy: Fascicles, Fibers, and Sarcomeres', durationMinutes: 16, xpReward: 60 },
          { id: 'lesson-10-2', moduleId: 'module-10', chapterId: 'mod-10-ch-1', number: 2, title: 'Excitation-Contraction Coupling: Action Potentials, T-Tubules, and Calcium', durationMinutes: 18, xpReward: 70 },
          { id: 'lesson-10-3', moduleId: 'module-10', chapterId: 'mod-10-ch-1', number: 3, title: 'The Sliding Filament Theory & Cross-Bridge Power Stroke', durationMinutes: 18, xpReward: 70 },
          { id: 'lesson-10-4', moduleId: 'module-10', chapterId: 'mod-10-ch-1', number: 4, title: 'Muscle Fiber Types: Type I vs Type IIa vs Type IIx', durationMinutes: 16, xpReward: 60 },
          { id: 'lesson-10-5', moduleId: 'module-10', chapterId: 'mod-10-ch-1', number: 5, title: 'Length-Tension & Force-Velocity Relationships in Skeletal Muscle', durationMinutes: 18, xpReward: 70 },
        ],
      },
    ],
  },

  // STAGE V
  {
    id: 'module-11',
    stageId: 'stage-5',
    number: 11,
    title: 'Neuroscience & Motor Control',
    description: 'Neurons, motor units, Henneman’s size principle, rate coding, voluntary activation, and neural plasticity.',
    icon: 'Zap',
    prerequisites: ['module-10'],
    chapters: [
      {
        id: 'mod-11-ch-1',
        moduleId: 'module-11',
        title: 'The Neural Driver of Force',
        description: 'How the central nervous system commands muscle recruitment',
        lessons: [
          { id: 'lesson-11-1', moduleId: 'module-11', chapterId: 'mod-11-ch-1', number: 1, title: 'The Motor Unit: Alpha Motor Neurons and Muscle Fiber Ensembles', durationMinutes: 15, xpReward: 55 },
          { id: 'lesson-11-2', moduleId: 'module-11', chapterId: 'mod-11-ch-1', number: 2, title: 'Henneman\'s Size Principle: Low vs. High Threshold Motor Units', durationMinutes: 17, xpReward: 65 },
          { id: 'lesson-11-3', moduleId: 'module-11', chapterId: 'mod-11-ch-1', number: 3, title: 'Rate Coding (Firing Frequency) and Synchronization in Maximal Force', durationMinutes: 16, xpReward: 60 },
          { id: 'lesson-11-4', moduleId: 'module-11', chapterId: 'mod-11-ch-1', number: 4, title: 'Early Strength Gains: Neural Adaptations vs Structural Hypertrophy', durationMinutes: 16, xpReward: 65 },
        ],
      },
    ],
  },
  {
    id: 'module-12',
    stageId: 'stage-5',
    number: 12,
    title: 'Physics for Strength Training',
    description: 'Kinematics, Newton’s laws, torque, moment arms, mechanical advantage, vectors, and center of mass.',
    icon: 'Compass',
    prerequisites: ['module-2'],
    chapters: [
      {
        id: 'mod-12-ch-1',
        moduleId: 'module-12',
        title: 'Classical Mechanics & Levers',
        description: 'Physical laws governing human lifting',
        lessons: [
          { id: 'lesson-12-1', moduleId: 'module-12', chapterId: 'mod-12-ch-1', number: 1, title: 'Newton\'s Laws of Motion Applied to Barbell Dynamics', durationMinutes: 15, xpReward: 55 },
          { id: 'lesson-12-2', moduleId: 'module-12', chapterId: 'mod-12-ch-1', number: 2, title: 'Torque and Moment Arms: The Mechanical Key to Joint Loading', durationMinutes: 18, xpReward: 70 },
          { id: 'lesson-12-3', moduleId: 'module-12', chapterId: 'mod-12-ch-1', number: 3, title: 'Class 1, 2, and 3 Levers in the Human Musculoskeletal System', durationMinutes: 16, xpReward: 60 },
          { id: 'lesson-12-4', moduleId: 'module-12', chapterId: 'mod-12-ch-1', number: 4, title: 'Center of Mass, Base of Support, and Barbell Balance Trajectories', durationMinutes: 16, xpReward: 60 },
        ],
      },
    ],
  },
  {
    id: 'module-13',
    stageId: 'stage-5',
    number: 13,
    title: 'Biomechanics of Human Movement',
    description: 'Joint moments, muscle architecture, pennation angles, resistance curves, and biomechanics of the Big 3.',
    icon: 'Target',
    prerequisites: ['module-8', 'module-12'],
    chapters: [
      {
        id: 'mod-13-ch-1',
        moduleId: 'module-13',
        title: 'Biomechanics of Core Barbell Lifts',
        description: 'Joint moments, bar paths, and individual anthropometry',
        lessons: [
          { id: 'lesson-13-1', moduleId: 'module-13', chapterId: 'mod-13-ch-1', number: 1, title: 'Internal vs External Joint Moments & Resistance Profiles', durationMinutes: 17, xpReward: 65 },
          { id: 'lesson-13-2', moduleId: 'module-13', chapterId: 'mod-13-ch-1', number: 2, title: 'Biomechanics of the Back Squat: High-Bar vs Low-Bar vs Front Squat', durationMinutes: 20, xpReward: 75 },
          { id: 'lesson-13-3', moduleId: 'module-13', chapterId: 'mod-13-ch-1', number: 3, title: 'Biomechanics of the Conventional and Sumo Deadlift', durationMinutes: 19, xpReward: 75 },
          { id: 'lesson-13-4', moduleId: 'module-13', chapterId: 'mod-13-ch-1', number: 4, title: 'Biomechanics of the Bench Press: Grip Width, Arch, and Bar Path', durationMinutes: 18, xpReward: 70 },
          { id: 'lesson-13-5', moduleId: 'module-13', chapterId: 'mod-13-ch-1', number: 5, title: 'Individual Anthropometry: Femur Length, Arm Span, and Stance Setup', durationMinutes: 17, xpReward: 65 },
        ],
      },
    ],
  },

  // STAGE VI
  {
    id: 'module-14',
    stageId: 'stage-6',
    number: 14,
    title: 'Muscle Hypertrophy Science',
    description: 'Mechanical tension, mTORC1, myofibrillar vs sarcoplasmic hypertrophy, stretch-mediated hypertrophy, and failure proximity.',
    icon: 'Dumbbell',
    prerequisites: ['module-7', 'module-10'],
    chapters: [
      {
        id: 'mod-14-ch-1',
        moduleId: 'module-14',
        title: 'The Primary Drivers of Muscle Growth',
        description: 'What triggers muscle fibers to synthesize new protein',
        lessons: [
          { id: 'lesson-14-1', moduleId: 'module-14', chapterId: 'mod-14-ch-1', number: 1, title: 'Mechanical Tension: The Irrefutable Primary Stimulus for Hypertrophy', durationMinutes: 18, xpReward: 70 },
          { id: 'lesson-14-2', moduleId: 'module-14', chapterId: 'mod-14-ch-1', number: 2, title: 'The Role and Limits of Metabolic Stress & Muscle Damage', durationMinutes: 16, xpReward: 60 },
          { id: 'lesson-14-3', moduleId: 'module-14', chapterId: 'mod-14-ch-1', number: 3, title: 'Stretch-Mediated Hypertrophy: Titin Strain and Muscle Lengths', durationMinutes: 17, xpReward: 65 },
          { id: 'lesson-14-4', moduleId: 'module-14', chapterId: 'mod-14-ch-1', number: 4, title: 'Proximity to Failure: Effective Reps and the RIR Continuum', durationMinutes: 18, xpReward: 70 },
        ],
      },
    ],
  },
  {
    id: 'module-15',
    stageId: 'stage-6',
    number: 15,
    title: 'Strength Development & Maximal Force',
    description: 'Neural vs morphological strength, rate of force development, specificity principle, and overcoming plateaus.',
    icon: 'ShieldAlert',
    prerequisites: ['module-11', 'module-14'],
    chapters: [
      {
        id: 'mod-15-ch-1',
        moduleId: 'module-15',
        title: 'The Neuromuscular Architecture of Strength',
        description: 'Why bigger muscles aren\'t always stronger muscles',
        lessons: [
          { id: 'lesson-15-1', moduleId: 'module-15', chapterId: 'mod-15-ch-1', number: 1, title: 'Neural vs Muscular Contributions to Maximal 1RM Strength', durationMinutes: 16, xpReward: 60 },
          { id: 'lesson-15-2', moduleId: 'module-15', chapterId: 'mod-15-ch-1', number: 2, title: 'Specific Adaptations to Imposed Demands (SAID) in Powerlifting', durationMinutes: 16, xpReward: 60 },
          { id: 'lesson-15-3', moduleId: 'module-15', chapterId: 'mod-15-ch-1', number: 3, title: 'Rate of Force Development (RFD) and Explosive Neural Drive', durationMinutes: 17, xpReward: 65 },
          { id: 'lesson-15-4', moduleId: 'module-15', chapterId: 'mod-15-ch-1', number: 4, title: 'Weak-Point Analysis and Technical Sticking Points', durationMinutes: 18, xpReward: 70 },
        ],
      },
    ],
  },
  {
    id: 'module-16',
    stageId: 'stage-6',
    number: 16,
    title: 'Tendons & Connective Tissues',
    description: 'Collagen synthesis, tendon stiffness, hysteresis, stress relaxation, force transmission, and load management.',
    icon: 'Bone',
    prerequisites: ['module-4', 'module-8'],
    chapters: [
      {
        id: 'mod-16-ch-1',
        moduleId: 'module-16',
        title: 'Connective Tissue Physiology',
        description: 'How tendons and ligaments adapt to heavy loading',
        lessons: [
          { id: 'lesson-16-1', moduleId: 'module-16', chapterId: 'mod-16-ch-1', number: 1, title: 'Tendon Architecture: Type I Collagen, Cross-Linking, and Fascicles', durationMinutes: 15, xpReward: 55 },
          { id: 'lesson-16-2', moduleId: 'module-16', chapterId: 'mod-16-ch-1', number: 2, title: 'Tendon Stiffness, Elastic Energy Recoil, and Rate of Loading', durationMinutes: 16, xpReward: 60 },
          { id: 'lesson-16-3', moduleId: 'module-16', chapterId: 'mod-16-ch-1', number: 3, title: 'Why Tendons Adapt Slower Than Muscle: Vascularity and Turnover', durationMinutes: 16, xpReward: 60 },
        ],
      },
    ],
  },

  // STAGE VII
  {
    id: 'module-17',
    stageId: 'stage-7',
    number: 17,
    title: 'Resistance Training Variables',
    description: 'Volume dose-response, intensity, frequency, rest intervals, tempo, exercise order, and failure proximity.',
    icon: 'Sliders',
    prerequisites: ['module-14', 'module-15'],
    chapters: [
      {
        id: 'mod-17-ch-1',
        moduleId: 'module-17',
        title: 'Manipulating Training Variables',
        description: 'Quantifying and balancing sets, reps, and rest',
        lessons: [
          { id: 'lesson-17-1', moduleId: 'module-17', chapterId: 'mod-17-ch-1', number: 1, title: 'Weekly Volume: The Dose-Response Relationship for Muscle Growth', durationMinutes: 18, xpReward: 70 },
          { id: 'lesson-17-2', moduleId: 'module-17', chapterId: 'mod-17-ch-1', number: 2, title: 'Training Frequency: 1x vs 2x vs 3x Per Week per Muscle Group', durationMinutes: 16, xpReward: 60 },
          { id: 'lesson-17-3', moduleId: 'module-17', chapterId: 'mod-17-ch-1', number: 3, title: 'Inter-Set Rest Periods: Short (1 min) vs Long (3-5 min) Evidence', durationMinutes: 16, xpReward: 60 },
          { id: 'lesson-17-4', moduleId: 'module-17', chapterId: 'mod-17-ch-1', number: 4, title: 'RPE, RIR, and Autoregulation: Calibrating Proximity to Failure', durationMinutes: 18, xpReward: 70 },
        ],
      },
    ],
  },
  {
    id: 'module-18',
    stageId: 'stage-7',
    number: 18,
    title: 'Programming for Hypertrophy',
    description: 'Progressive overload models, exercise selection, split design, lengthened-position training, and deloading.',
    icon: 'Maximize2',
    prerequisites: ['module-17'],
    chapters: [
      {
        id: 'mod-18-ch-1',
        moduleId: 'module-18',
        title: 'Building Hypertrophy Programs',
        description: 'Constructing evidence-based physique programs',
        lessons: [
          { id: 'lesson-18-1', moduleId: 'module-18', chapterId: 'mod-18-ch-1', number: 1, title: 'Progressive Overload Mechanisms: Load, Reps, and Quality Progression', durationMinutes: 17, xpReward: 65 },
          { id: 'lesson-18-2', moduleId: 'module-18', chapterId: 'mod-18-ch-1', number: 2, title: 'Exercise Selection by Regional Muscle Architecture & Resistance Curve', durationMinutes: 18, xpReward: 70 },
          { id: 'lesson-18-3', moduleId: 'module-18', chapterId: 'mod-18-ch-1', number: 3, title: 'Split Design: Full Body vs Upper/Lower vs Push/Pull/Legs', durationMinutes: 17, xpReward: 65 },
          { id: 'lesson-18-4', moduleId: 'module-18', chapterId: 'mod-18-ch-1', number: 4, title: 'Deload Protocols: Volume Reduction vs Intensity Maintenance', durationMinutes: 16, xpReward: 60 },
        ],
      },
    ],
  },
  {
    id: 'module-19',
    stageId: 'stage-7',
    number: 19,
    title: 'Programming for Maximal Strength & Powerlifting',
    description: 'Squat/bench/deadlift programming, heavy singles, back-off sets, peaking, tapering, and meet prep.',
    icon: 'Trophy',
    prerequisites: ['module-13', 'module-15', 'module-17'],
    chapters: [
      {
        id: 'mod-19-ch-1',
        moduleId: 'module-19',
        title: 'Powerlifting Programming Architecture',
        description: 'Maximizing the three-lift total on platform day',
        lessons: [
          { id: 'lesson-19-1', moduleId: 'module-19', chapterId: 'mod-19-ch-1', number: 1, title: 'Top Singles (@RPE 8) and Back-Off Volume: The Modern Strength Paradigm', durationMinutes: 18, xpReward: 70 },
          { id: 'lesson-19-2', moduleId: 'module-19', chapterId: 'mod-19-ch-1', number: 2, title: 'Bench Press, Squat, and Deadlift Frequency & Accessory Selection', durationMinutes: 19, xpReward: 75 },
          { id: 'lesson-19-3', moduleId: 'module-19', chapterId: 'mod-19-ch-1', number: 3, title: 'Peaking and Tapering: Dissipating Fatigue While Preserving Fitness', durationMinutes: 18, xpReward: 70 },
          { id: 'lesson-19-4', moduleId: 'module-19', chapterId: 'mod-19-ch-1', number: 4, title: 'Meet Day Strategy: Attempt Selection (3rd Attempt Math)', durationMinutes: 17, xpReward: 65 },
        ],
      },
    ],
  },
  {
    id: 'module-20',
    stageId: 'stage-7',
    number: 20,
    title: 'Periodization & Autoregulation',
    description: 'Linear, daily undulating, and block periodization; fatigue management, readiness monitoring, and VBT.',
    icon: 'TrendingUp',
    prerequisites: ['module-18', 'module-19'],
    chapters: [
      {
        id: 'mod-20-ch-1',
        moduleId: 'module-20',
        title: 'Long-Term Periodization Models',
        description: 'Organizing training cycles for sustained progress',
        lessons: [
          { id: 'lesson-20-1', moduleId: 'module-20', chapterId: 'mod-20-ch-1', number: 1, title: 'General Adaptation Syndrome (GAS) & Fitness-Fatigue Model', durationMinutes: 17, xpReward: 65 },
          { id: 'lesson-20-2', moduleId: 'module-20', chapterId: 'mod-20-ch-1', number: 2, title: 'Block Periodization: Accumulation, Transmutation, and Realization', durationMinutes: 18, xpReward: 70 },
          { id: 'lesson-20-3', moduleId: 'module-20', chapterId: 'mod-20-ch-1', number: 3, title: 'Daily Undulating Periodization (DUP) for Concurrent Goals', durationMinutes: 17, xpReward: 65 },
          { id: 'lesson-20-4', moduleId: 'module-20', chapterId: 'mod-20-ch-1', number: 4, title: 'Velocity-Based Training (VBT) and Daily Readiness Autoregulation', durationMinutes: 18, xpReward: 70 },
        ],
      },
    ],
  },

  // STAGE VIII
  {
    id: 'module-21',
    stageId: 'stage-8',
    number: 21,
    title: 'Sports Nutrition for Lifting',
    description: 'Energy balance, protein requirements, leucine trigger, carbohydrate timing, hydration, and recomposition.',
    icon: 'Utensils',
    prerequisites: ['module-4', 'module-5'],
    chapters: [
      {
        id: 'mod-21-ch-1',
        moduleId: 'module-21',
        title: 'Macronutrient Targets & Muscle Protein Synthesis',
        description: 'Fueling adaptation and rebuilding muscle',
        lessons: [
          { id: 'lesson-21-1', moduleId: 'module-21', chapterId: 'mod-21-ch-1', number: 1, title: 'Daily Protein Requirements: 1.6 - 2.2 g/kg Evidence Breakdown', durationMinutes: 17, xpReward: 65 },
          { id: 'lesson-21-2', moduleId: 'module-21', chapterId: 'mod-21-ch-1', number: 2, title: 'The Leucine Threshold and Protein Distribution Across Meals', durationMinutes: 16, xpReward: 60 },
          { id: 'lesson-21-3', moduleId: 'module-21', chapterId: 'mod-21-ch-1', number: 3, title: 'Carbohydrates & Glycogen Resynthesis for High-Volume Lifting', durationMinutes: 16, xpReward: 60 },
          { id: 'lesson-21-4', moduleId: 'module-21', chapterId: 'mod-21-ch-1', number: 4, title: 'Energy Balance: Caloric Surpluses, Deficits, and Body Recomposition', durationMinutes: 18, xpReward: 70 },
        ],
      },
    ],
  },
  {
    id: 'module-22',
    stageId: 'stage-8',
    number: 22,
    title: 'Recovery, Sleep & Fatigue Management',
    description: 'Sleep cycles, NREM slow-wave sleep, central vs peripheral fatigue, systemic recovery, and overtraining.',
    icon: 'Moon',
    prerequisites: ['module-9'],
    chapters: [
      {
        id: 'mod-22-ch-1',
        moduleId: 'module-22',
        title: 'Sleep Architecture & Systemic Recovery',
        description: 'The biological restoration required for supercompensation',
        lessons: [
          { id: 'lesson-22-1', moduleId: 'module-22', chapterId: 'mod-22-ch-1', number: 1, title: 'Sleep Architecture: Slow-Wave Sleep and Growth Hormone Secretion', durationMinutes: 16, xpReward: 60 },
          { id: 'lesson-22-2', moduleId: 'module-22', chapterId: 'mod-22-ch-1', number: 2, title: 'Central vs Peripheral Fatigue: Spinal Inhibitions and Glycogen Depletion', durationMinutes: 17, xpReward: 65 },
          { id: 'lesson-22-3', moduleId: 'module-22', chapterId: 'mod-22-ch-1', number: 3, title: 'Functional Overreaching vs Non-Functional Overtraining Syndrome', durationMinutes: 17, xpReward: 65 },
        ],
      },
    ],
  },
  {
    id: 'module-23',
    stageId: 'stage-8',
    number: 23,
    title: 'Hormones & Exercise Adaptation',
    description: 'Endocrinology, testosterone, IGF-1, cortisol, insulin, acute post-workout spikes vs baseline receptor density.',
    icon: 'Pocket',
    prerequisites: ['module-4', 'module-9'],
    chapters: [
      {
        id: 'mod-23-ch-1',
        moduleId: 'module-23',
        title: 'Endocrine Signaling in Resistance Training',
        description: 'What hormones do—and don\'t do—for muscle growth',
        lessons: [
          { id: 'lesson-23-1', moduleId: 'module-23', chapterId: 'mod-23-ch-1', number: 1, title: 'Systemic Endocrine Signaling: Testosterone, Growth Hormone, and IGF-1', durationMinutes: 17, xpReward: 65 },
          { id: 'lesson-23-2', moduleId: 'module-23', chapterId: 'mod-23-ch-1', number: 2, title: 'Acute Hormone Spikes vs Receptor Density: Debunking Exercise Spikes', durationMinutes: 18, xpReward: 70 },
          { id: 'lesson-23-3', moduleId: 'module-23', chapterId: 'mod-23-ch-1', number: 3, title: 'Cortisol, Stress Responses, and Chronic Catabolic States', durationMinutes: 16, xpReward: 60 },
        ],
      },
    ],
  },
  {
    id: 'module-24',
    stageId: 'stage-8',
    number: 24,
    title: 'Cardiovascular Physiology & Interference Effect',
    description: 'Cardiac adaptations, VO2 max, capillary density, concurrent training, and AMPK-mTORC1 molecular interference.',
    icon: 'Heart',
    prerequisites: ['module-9', 'module-14'],
    chapters: [
      {
        id: 'mod-24-ch-1',
        moduleId: 'module-24',
        title: 'Cardiovascular Conditioning for Lifters',
        description: 'Balancing conditioning without blunting hypertrophy',
        lessons: [
          { id: 'lesson-24-1', moduleId: 'module-24', chapterId: 'mod-24-ch-1', number: 1, title: 'Cardiovascular Adaptations: Left Ventricular Hypertrophy & Capillaries', durationMinutes: 16, xpReward: 60 },
          { id: 'lesson-24-2', moduleId: 'module-24', chapterId: 'mod-24-ch-1', number: 2, title: 'The Molecular Interference Effect: AMPK vs mTORC1 Crosstalk', durationMinutes: 18, xpReward: 70 },
          { id: 'lesson-24-3', moduleId: 'module-24', chapterId: 'mod-24-ch-1', number: 3, title: 'Optimizing Concurrent Training: Modality, Timing, and Volume Spacing', durationMinutes: 17, xpReward: 65 },
        ],
      },
    ],
  },
  {
    id: 'module-25',
    stageId: 'stage-8',
    number: 25,
    title: 'Individual Differences & Training Age',
    description: 'Genetic variance, fiber proportioning, limb ratios, novice vs intermediate vs advanced adaptations, sex differences.',
    icon: 'Users',
    prerequisites: ['module-7', 'module-15'],
    chapters: [
      {
        id: 'mod-25-ch-1',
        moduleId: 'module-25',
        title: 'Human Variance in Training Adaptation',
        description: 'Why two lifters respond differently to the same program',
        lessons: [
          { id: 'lesson-25-1', moduleId: 'module-25', chapterId: 'mod-25-ch-1', number: 1, title: 'Genetic Responders vs Non-Responders: The Reality of Biological Variance', durationMinutes: 17, xpReward: 65 },
          { id: 'lesson-25-2', moduleId: 'module-25', chapterId: 'mod-25-ch-1', number: 2, title: 'Training Age Continuum: Novice Linear Progression to Advanced Periodization', durationMinutes: 18, xpReward: 70 },
          { id: 'lesson-25-3', moduleId: 'module-25', chapterId: 'mod-25-ch-1', number: 3, title: 'Biological Sex Differences in Muscle Architecture, Fatigue, and Recovery', durationMinutes: 17, xpReward: 65 },
        ],
      },
    ],
  },
  {
    id: 'module-26',
    stageId: 'stage-8',
    number: 26,
    title: 'Injury Risk, Pain Science & Load Management',
    description: 'Biopsychosocial pain model, tissue capacity vs acute load, exercise modification, and active return to training.',
    icon: 'ShieldCheck',
    prerequisites: ['module-16'],
    chapters: [
      {
        id: 'mod-26-ch-1',
        moduleId: 'module-26',
        title: 'Modern Pain Science for Strength Athletes',
        description: 'Moving beyond structural-only injury models',
        lessons: [
          { id: 'lesson-26-1', moduleId: 'module-26', chapterId: 'mod-26-ch-1', number: 1, title: 'Pain Science 101: Nociception vs Pain and the Biopsychosocial Model', durationMinutes: 17, xpReward: 65 },
          { id: 'lesson-26-2', moduleId: 'module-26', chapterId: 'mod-26-ch-1', number: 2, title: 'Acute-to-Chronic Workload Ratio and Connective Tissue Tolerance', durationMinutes: 18, xpReward: 70 },
          { id: 'lesson-26-3', moduleId: 'module-26', chapterId: 'mod-26-ch-1', number: 3, title: 'Exercise Modifications: Adjusting ROM, Tempo, and Load for Safe Rehab', durationMinutes: 17, xpReward: 65 },
        ],
      },
    ],
  },

  // STAGE IX
  {
    id: 'module-27',
    stageId: 'stage-9',
    number: 27,
    title: 'Supplements & Ergogenic Aids',
    description: 'Creatine monohydrate, caffeine, beta-alanine, whey/casein, nitrates, vitamins, and third-party testing.',
    icon: 'Pill',
    prerequisites: ['module-5', 'module-21'],
    chapters: [
      {
        id: 'mod-27-ch-1',
        moduleId: 'module-27',
        title: 'Evidence-Based Supplementation',
        description: 'Separating genuine performance aids from marketing hype',
        lessons: [
          { id: 'lesson-27-1', moduleId: 'module-27', chapterId: 'mod-27-ch-1', number: 1, title: 'Creatine Monohydrate: Cellular Hydration, PCr Saturation, and 1RM Gains', durationMinutes: 18, xpReward: 70 },
          { id: 'lesson-27-2', moduleId: 'module-27', chapterId: 'mod-27-ch-1', number: 2, title: 'Caffeine: Adenosine Receptor Antagonism and Central Fatigue Blunting', durationMinutes: 16, xpReward: 60 },
          { id: 'lesson-27-3', moduleId: 'module-27', chapterId: 'mod-27-ch-1', number: 3, title: 'Tier B Supplements: Beta-Alanine, Nitrates, Citrulline Malate Evidence', durationMinutes: 17, xpReward: 65 },
          { id: 'lesson-27-4', moduleId: 'module-27', chapterId: 'mod-27-ch-1', number: 4, title: 'Third-Party Testing (Informed Choice, NSF) and Purity Quality Control', durationMinutes: 15, xpReward: 55 },
        ],
      },
    ],
  },
  {
    id: 'module-28',
    stageId: 'stage-9',
    number: 28,
    title: 'Scientific Research & Statistics in Lifting',
    description: 'RCTs, meta-analyses, forest plots, effect sizes (Cohen\'s d), p-values, sample sizes, and detecting flawed studies.',
    icon: 'FileText',
    prerequisites: ['module-1', 'module-2'],
    chapters: [
      {
        id: 'mod-28-ch-1',
        moduleId: 'module-28',
        title: 'Reading Exercise Science Papers',
        description: 'How to critically evaluate strength and hypertrophy research',
        lessons: [
          { id: 'lesson-28-1', moduleId: 'module-28', chapterId: 'mod-28-ch-1', number: 1, title: 'Hierarchy of Scientific Evidence: From Case Studies to Systematic Reviews', durationMinutes: 17, xpReward: 65 },
          { id: 'lesson-28-2', moduleId: 'module-28', chapterId: 'mod-28-ch-1', number: 2, title: 'Statistical vs Practical Significance: Effect Sizes and Confidence Intervals', durationMinutes: 18, xpReward: 70 },
          { id: 'lesson-28-3', moduleId: 'module-28', chapterId: 'mod-28-ch-1', number: 3, title: 'Reading Forest Plots & Funnel Plots in Exercise Meta-Analyses', durationMinutes: 18, xpReward: 70 },
          { id: 'lesson-28-4', moduleId: 'module-28', chapterId: 'mod-28-ch-1', number: 4, title: 'Detecting P-Hacking, Small Sample Bias, and Funding Conflicts', durationMinutes: 17, xpReward: 65 },
        ],
      },
    ],
  },
  {
    id: 'module-29',
    stageId: 'stage-9',
    number: 29,
    title: 'Testing & Performance Analytics',
    description: '1RM testing protocols, submaximal formulas, DEXA vs calipers, log tracking, and trend analysis.',
    icon: 'BarChart2',
    prerequisites: ['module-2', 'module-19'],
    chapters: [
      {
        id: 'mod-29-ch-1',
        moduleId: 'module-29',
        title: 'Strength & Body Composition Testing',
        description: 'Valid, reliable metrics for longitudinal tracking',
        lessons: [
          { id: 'lesson-29-1', moduleId: 'module-29', chapterId: 'mod-29-ch-1', number: 1, title: 'Direct 1RM Testing vs Submaximal Estimation Formulas (Epley, Brzycki)', durationMinutes: 17, xpReward: 65 },
          { id: 'lesson-29-2', moduleId: 'module-29', chapterId: 'mod-29-ch-1', number: 2, title: 'Body Composition Assessment: DEXA, Ultrasound, Calipers, and Errors', durationMinutes: 17, xpReward: 65 },
          { id: 'lesson-29-3', moduleId: 'module-29', chapterId: 'mod-29-ch-1', number: 3, title: 'Training Log Analytics: Rolling Averages, E1RM Trends, and Fatigue Metrics', durationMinutes: 18, xpReward: 70 },
        ],
      },
    ],
  },
  {
    id: 'module-30',
    stageId: 'stage-9',
    number: 30,
    title: 'Advanced Coaching & Scientific Integration',
    description: 'Athlete intake, limiting-factor diagnostics, holistic biomechanics & physiology synthesis, and master coach case studies.',
    icon: 'Award',
    prerequisites: ['module-13', 'module-18', 'module-19', 'module-21', 'module-28'],
    chapters: [
      {
        id: 'mod-30-ch-1',
        moduleId: 'module-30',
        title: 'Master Coach Synthesis',
        description: 'Synthesizing all biological disciplines into elite program mastery',
        lessons: [
          { id: 'lesson-30-1', moduleId: 'module-30', chapterId: 'mod-30-ch-1', number: 1, title: 'Athlete Assessment: Biomechanical Screening, Work Capacity, and Anthropometry', durationMinutes: 20, xpReward: 80 },
          { id: 'lesson-30-2', moduleId: 'module-30', chapterId: 'mod-30-ch-1', number: 2, title: 'Diagnosing Stagnation: Differentiating Structural, Neural, and Recovery Deficits', durationMinutes: 20, xpReward: 80 },
          { id: 'lesson-30-3', moduleId: 'module-30', chapterId: 'mod-30-ch-1', number: 3, title: 'Integrating Nutrition, Sleep, and Loading for Peak Athlete Supercompensation', durationMinutes: 22, xpReward: 90 },
          { id: 'lesson-30-4', moduleId: 'module-30', chapterId: 'mod-30-ch-1', number: 4, title: 'The Scientific Master Lifter: Lifelong Autoregulation and Critical Thinking', durationMinutes: 25, xpReward: 100 },
        ],
      },
    ],
  },
];
