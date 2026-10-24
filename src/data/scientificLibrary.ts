export interface GlossaryItem {
  term: string;
  category: 'Biology & Cells' | 'Biochemistry & Energy' | 'Anatomy & Physiology' | 'Biomechanics & Physics' | 'Training & Hypertrophy' | 'Nutrition & Supplements';
  definition: string;
  practicalContext: string;
}

export const GLOSSARY_ITEMS: GlossaryItem[] = [
  {
    term: 'Actin',
    category: 'Anatomy & Physiology',
    definition: 'A globular multi-functional protein that forms microfilaments; in muscle, thin filaments along which myosin heads crawl during contraction.',
    practicalContext: 'Actin-myosin cross-bridges generate all voluntary muscle tension when you lift weights.',
  },
  {
    term: 'Action Potential',
    category: 'Biology & Cells',
    definition: 'A rapid, transient change in the electrical membrane potential of a neuron or muscle fiber that travels along the membrane.',
    practicalContext: 'The electrical signal transmitted from your brain to motor units to initiate a barbell lift.',
  },
  {
    term: 'Adenosine Triphosphate (ATP)',
    category: 'Biochemistry & Energy',
    definition: 'The primary energy carrier molecule in all living organisms, consisting of adenine, ribose, and three phosphate groups.',
    practicalContext: 'Direct fuel for muscle contractions; only 1-2 seconds of maximal stores exist in muscle tissue.',
  },
  {
    term: 'Allosteric Regulation',
    category: 'Biochemistry & Energy',
    definition: 'The regulation of an enzyme by binding an effector molecule at a site other than the active site.',
    practicalContext: 'How AMP and ADP allosterically speed up phosphofructokinase during high-intensity training.',
  },
  {
    term: 'Alpha Motor Neuron',
    category: 'Anatomy & Physiology',
    definition: 'Large lower motor neurons of the brainstem and spinal cord that innervate extrafusal muscle fibers of skeletal muscle.',
    practicalContext: 'The final common pathway for sending force commands to your quadriceps or chest.',
  },
  {
    term: 'Autoregulation',
    category: 'Training & Hypertrophy',
    definition: 'The practice of adjusting training load, sets, or reps in real-time based on an athlete’s daily readiness and performance.',
    practicalContext: 'Using RPE (Rating of Perceived Exertion) to drop the weight on days with poor sleep or high stress.',
  },
  {
    term: 'Biomechanics',
    category: 'Biomechanics & Physics',
    definition: 'The study of the structure, function, and motion of the mechanical aspects of biological systems using the mechanics of physics.',
    practicalContext: 'Analyzing bar paths, joint moment arms, and leverage to lift safely and efficiently.',
  },
  {
    term: 'Costamere',
    category: 'Biology & Cells',
    definition: 'A sub-sarcolemmal protein assembly that physically anchors sarcomeres to the sarcolemma and extracellular matrix.',
    practicalContext: 'Transmits up to 80% of muscle fiber force laterally to neighboring tissue and tendons.',
  },
  {
    term: 'Cross-Bridge Cycle',
    category: 'Anatomy & Physiology',
    definition: 'The repeated cyclic interaction between myosin heads and actin filaments that results in muscle fiber shortening and force production.',
    practicalContext: 'Each cycle pulls the actin filament by ~10 nanometers using one molecule of ATP.',
  },
  {
    term: 'Delayed Onset Muscle Soreness (DOMS)',
    category: 'Training & Hypertrophy',
    definition: 'Muscle discomfort and stiffness that peaks 24–72 hours after unaccustomed or eccentric-heavy resistance exercise.',
    practicalContext: 'Caused by microscopic sarcomere disruption and inflammatory repair, NOT by lactic acid.',
  },
  {
    term: 'Effective Reps',
    category: 'Training & Hypertrophy',
    definition: 'The repetitions in a set taken within close proximity to failure (usually the last 3-5 reps) where high-threshold motor units are fully recruited.',
    practicalContext: 'The primary reps responsible for driving muscle protein synthesis and mechanical tension.',
  },
  {
    term: 'Electron Transport Chain',
    category: 'Biochemistry & Energy',
    definition: 'A series of protein complexes located in the inner mitochondrial membrane that transfer electrons from NADH/FADH2 to oxygen to generate ATP.',
    practicalContext: 'Provides the aerobic ATP needed to recover between heavy powerlifting sets.',
  },
  {
    term: 'Fascicle',
    category: 'Anatomy & Physiology',
    definition: 'A discrete bundle of skeletal muscle fibers wrapped inside the perimysium connective tissue sheath.',
    practicalContext: 'Fascicle length and pennation angle dictate the muscle’s contraction velocity and force potential.',
  },
  {
    term: 'Force-Velocity Relationship',
    category: 'Biomechanics & Physics',
    definition: 'The physiological curve describing how maximum concentric muscle force decreases as the velocity of contraction increases.',
    practicalContext: 'Why you cannot move a true 1RM quickly: maximal force requires time for maximum cross-bridges to form.',
  },
  {
    term: 'Glycolysis',
    category: 'Biochemistry & Energy',
    definition: 'The anaerobic metabolic pathway in the cytoplasm that breaks down one glucose molecule into two pyruvate molecules, yielding a net of 2 ATP.',
    practicalContext: 'The dominant energy pathway fueling resistance training sets lasting 15 to 60 seconds.',
  },
  {
    term: 'Henneman\'s Size Principle',
    category: 'Training & Hypertrophy',
    definition: 'The neurophysiological law stating that motor units are recruited in order of increasing size and activation threshold.',
    practicalContext: 'Small endurance fibers fire first; large Type II growth-prone fibers only fire with heavy weight or high fatigue.',
  },
  {
    term: 'Hypertrophy',
    category: 'Training & Hypertrophy',
    definition: 'An increase in the cross-sectional area and volume of an organ or tissue owing to the enlargement of its component cells.',
    practicalContext: 'Myofibrillar hypertrophy adds contractile sarcomeres in parallel, making muscle fibers thicker.',
  },
  {
    term: 'Internal Moment Arm',
    category: 'Biomechanics & Physics',
    definition: 'The perpendicular distance between a joint’s axis of rotation and the line of action of the muscle pulling across that joint.',
    practicalContext: 'A longer internal moment arm gives a lifter mechanical leverage to produce higher joint torque with less muscle force.',
  },
  {
    term: 'Lactate Threshold',
    category: 'Biochemistry & Energy',
    definition: 'The exercise intensity at which blood lactate concentration begins to accumulate exponentially above resting levels.',
    practicalContext: 'Lactate is an energy fuel, recycled by the heart and liver to create new glucose (the Cori cycle).',
  },
  {
    term: 'Length-Tension Relationship',
    category: 'Biomechanics & Physics',
    definition: 'The relationship between the length of a sarcomere and the active tension it can produce, dictated by actin-myosin filament overlap.',
    practicalContext: 'Muscles produce peak active force near moderate resting lengths where actin-myosin cross-bridges maximize.',
  },
  {
    term: 'Mechanical Tension',
    category: 'Training & Hypertrophy',
    definition: 'The physical tensile force experienced by active muscle fibers when resisting an external gravitational or mechanical load.',
    practicalContext: 'The undisputed primary trigger for resistance training-induced muscle protein synthesis.',
  },
  {
    term: 'Mechanotransduction',
    category: 'Biology & Cells',
    definition: 'The biological process by which cells convert physical mechanical stimuli into chemical intracellular signals.',
    practicalContext: 'How physical bar weight turns into chemical mTORC1 activation inside muscle fibers.',
  },
  {
    term: 'Moment Arm',
    category: 'Biomechanics & Physics',
    definition: 'The perpendicular distance from the line of force to the axis of rotation of a joint.',
    practicalContext: 'In a low-bar squat, forward torso lean increases the hip moment arm, placing more demand on glutes and adductors.',
  },
  {
    term: 'mTORC1',
    category: 'Biochemistry & Energy',
    definition: 'Mechanistic Target of Rapamycin Complex 1: the master cellular protein kinase regulating cell growth and muscle protein synthesis.',
    practicalContext: 'Activated by mechanical tension and essential amino acids (especially leucine).',
  },
  {
    term: 'Muscle Protein Synthesis (MPS)',
    category: 'Training & Hypertrophy',
    definition: 'The biochemical process in which amino acids are bound into new muscle proteins.',
    practicalContext: 'When MPS exceeds Muscle Protein Breakdown (MPB) over time, net muscle growth occurs.',
  },
  {
    term: 'Myofibril',
    category: 'Anatomy & Physiology',
    definition: 'A basic rod-like unit of a muscle cell consisting of repeated sarcomeres arranged in series.',
    practicalContext: 'Denser packing of myofibrils creates greater contractile force output per square centimeter of muscle.',
  },
  {
    term: 'Myosin',
    category: 'Anatomy & Physiology',
    definition: 'The thick filament motor protein in muscle cells that binds actin and hydrolyzes ATP to power muscular contraction.',
    practicalContext: 'Myosin heads physically pull actin inward to produce the power stroke.',
  },
  {
    term: 'Pennation Angle',
    category: 'Biomechanics & Physics',
    definition: 'The angle at which individual muscle fibers orient relative to the longitudinal line of force of the muscle’s tendon.',
    practicalContext: 'Pennate muscles (like the quadriceps) pack more fibers into a given volume, maximizing force production.',
  },
  {
    term: 'Periodization',
    category: 'Training & Hypertrophy',
    definition: 'The strategic planning and cyclical variation of training variables (volume, intensity, frequency) to optimize peak performance.',
    practicalContext: 'Progressing from high-volume hypertrophy blocks to heavy strength realization before a powerlifting meet.',
  },
  {
    term: 'Phosphocreatine (PCr)',
    category: 'Biochemistry & Energy',
    definition: 'A phosphorylated creatine molecule that donates a high-energy phosphate group to ADP to instantaneously resynthesize ATP.',
    practicalContext: 'Fuels the first 5-10 seconds of explosive lifting; saturated by creatine monohydrate supplementation.',
  },
  {
    term: 'Rate Coding',
    category: 'Anatomy & Physiology',
    definition: 'The frequency at which motor neurons fire action potentials to active muscle fibers.',
    practicalContext: 'Higher firing rates increase summation, producing maximal tetanus force during 1RM attempts.',
  },
  {
    term: 'Reps in Reserve (RIR)',
    category: 'Training & Hypertrophy',
    definition: 'A subjective or objective metric estimating how many additional repetitions could be completed before reaching concentric failure.',
    practicalContext: '1 RIR means you stopped the set with exactly one good rep left in the tank.',
  },
  {
    term: 'Sarcomere',
    category: 'Anatomy & Physiology',
    definition: 'The basic contractile unit of a muscle fiber, delimited by Z-discs, containing actin, myosin, and titin.',
    practicalContext: 'The microscopic engine where physical lifting force is generated.',
  },
  {
    term: 'Satellite Cell',
    category: 'Biology & Cells',
    definition: 'A myogenic stem cell located beneath the basal lamina of muscle fibers capable of proliferating and donating myonuclei.',
    practicalContext: 'Enables damaged muscle fibers to repair and expand their transcriptional capacity for long-term growth.',
  },
  {
    term: 'Titin',
    category: 'Anatomy & Physiology',
    definition: 'The largest known protein in the human body, acting as a molecular spring anchoring the thick filament to the Z-disc.',
    practicalContext: 'Provides passive tension during deep stretches and contributes to stretch-mediated hypertrophy.',
  },
  {
    term: 'Torque',
    category: 'Biomechanics & Physics',
    definition: 'The rotational equivalent of linear force; calculated as Force multiplied by the perpendicular Moment Arm.',
    practicalContext: 'Your muscles generate joint torque to overcome the external torque exerted by a barbell.',
  },
  {
    term: 'Valsalva Maneuver',
    category: 'Anatomy & Physiology',
    definition: 'Forced exhalation against a closed glottis, dramatically raising intra-abdominal pressure (IAP) to stabilize the lumbar spine.',
    practicalContext: 'The foundational bracing technique used during heavy squats and deadlifts to protect spinal vertebrae.',
  },
];
