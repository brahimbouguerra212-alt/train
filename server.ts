import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '5mb' }));

// Initialize Gemini SDK with User-Agent header as required
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// System instruction for the AI Exercise Science Tutor
const TUTOR_SYSTEM_INSTRUCTION = `
You are Professor Kinetic, the dedicated AI Exercise Science and Physiology Tutor for KineticLab.
You teach human biology, biochemistry, anatomy, biomechanics, exercise physiology, and evidence-based strength training.

Your pedagogical rules:
1. Assume the student starts from zero unless their curriculum record shows prerequisites mastered.
2. Teach mechanisms step-by-step (e.g. from action potential to acetylcholine release to T-tubule depolarization to Ca2+ binding troponin to cross-bridge cycling).
3. Distinguish established scientific facts (meta-analyses, accepted physiology) from emerging hypotheses or speculative claims. Never overstate findings.
4. Correct common fitness myths with gentleness, precision, and empirical evidence (e.g., lactic acid does not cause DOMS; tone is muscular hypertrophy + low body fat; muscle doesn't turn into fat).
5. Ground abstract chemistry/physics concepts in resistance training movements (squat, bench press, deadlift, pull-ups) to show why the science matters.
6. Format your answers clearly with markdown: bold key concepts, bullet steps, and short clear paragraphs. Keep tone encouraging, energetic, and Duolingo-like friendly yet scientifically rigorous.
7. Always provide an explicit "Resume lesson" cue or takeaway at the end.
`;

// AI Tutor chat endpoint
app.post('/api/tutor/chat', async (req, res) => {
  const { message, currentLesson, context, conversationHistory } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  if (!ai) {
    // Intelligent fallback when offline / no key
    const fallbackAnswer = generateIntelligentFallback(message, currentLesson);
    return res.json({ reply: fallbackAnswer, source: 'offline-knowledge-base' });
  }

  try {
    const prompt = `
Current Lesson: ${currentLesson ? currentLesson.title + ' (Module: ' + currentLesson.moduleTitle + ')' : 'General Exercise Science'}
User's Mastery Context: ${context ? JSON.stringify(context) : 'Beginner learner'}

Conversation history:
${(conversationHistory || []).slice(-6).map((m: { sender: string; text: string }) => `${m.sender.toUpperCase()}: ${m.text}`).join('\n')}

Student Question: "${message}"

Answer the student clearly, addressing their specific question step-by-step, referencing the biological/physical mechanisms, defining any necessary terms, and connecting back to the current lesson when relevant.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: TUTOR_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'I am ready to help you explore this concept further!';
    return res.json({ reply, source: 'gemini' });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    const fallback = generateIntelligentFallback(message, currentLesson);
    return res.json({ reply: fallback, source: 'fallback-on-error' });
  }
});

// AI Concept Deep Dive Explainer
app.post('/api/tutor/explain', async (req, res) => {
  const { concept, context, depth } = req.body;

  if (!concept) {
    return res.status(400).json({ error: 'Concept is required' });
  }

  if (!ai) {
    return res.json({
      explanation: `**${concept}** is a fundamental concept in exercise science.\n\nIn physiological terms, it governs how cellular or neuromuscular systems adapt to external physical demands. Review the prerequisite modules to trace the chemical and structural pathways leading into this phenomenon.`,
    });
  }

  try {
    const prompt = `Provide a step-by-step breakdown of the scientific concept "${concept}".
Target depth: ${depth || 'beginner-friendly but physiologically rigorous'}.
Current student context: ${context || 'Learning exercise science fundamentals'}.
Break it into:
1. Definition in Plain English (Zero Jargon)
2. The Biological / Physical Mechanism (Step-by-step)
3. Application in Strength Training & Hypertrophy
4. Common Misconceptions to Avoid`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: TUTOR_SYSTEM_INSTRUCTION,
        temperature: 0.5,
      },
    });

    return res.json({ explanation: response.text || 'Explanation generated.' });
  } catch (error) {
    console.error('Explanation error:', error);
    return res.status(500).json({ error: 'Failed to generate explanation' });
  }
});

// Fallback generator for zero-latency or offline scenarios
function generateIntelligentFallback(question: string, currentLesson: any): string {
  const q = question.toLowerCase();

  if (q.includes('atp') || q.includes('energy') || q.includes('adenosine')) {
    return `### What is ATP and How Does Energy Work? ⚡\n\n**Adenosine Triphosphate (ATP)** is the molecular currency of cellular work.\n\n1. **Structure**: An adenosine molecule bound to three phosphate groups.\n2. **The High-Energy Bond**: The bonds between phosphate groups are negatively charged and repel each other like compressed springs. Breaking the terminal phosphate bond yields **ADP + Inorganic Phosphate (Pi) + ~30.5 kJ/mol of free energy**.\n3. **Muscle Action**: Actin-myosin cross-bridge cycling specifically requires ATP to detach myosin from actin and re-cock the myosin head.\n4. **In the Gym**: Muscle stores only enough ATP for 1–2 seconds of maximal lifting! It must constantly be regenerated via phosphocreatine, glycolysis, and mitochondrial oxidative phosphorylation.\n\n*Would you like to explore the phosphocreatine system next?*`;
  }

  if (q.includes('mismatch') || q.includes('sore') || q.includes('doms') || q.includes('lactic')) {
    return `### Demystifying DOMS and Lactate 🔬\n\n**Crucial Evidence**: Lactic acid does **not** cause delayed onset muscle soreness (DOMS)!\n\n- Blood lactate returns to baseline within 30–60 minutes post-workout.\n- DOMS peaks at 24–72 hours and is driven by micro-damage to the sarcomere Z-discs and extracellular matrix during unaccustomed eccentric contractions, triggering an inflammatory recovery cascade.\n- Lactate is actually a valuable cellular fuel, shuttled into mitochondria or heart muscle to regenerate pyruvate and ATP!`;
  }

  if (q.includes('hypertrophy') || q.includes('muscle grow') || q.includes('tension')) {
    return `### How Muscles Actually Grow (Hypertrophy) 💪\n\n1. **Mechanical Tension**: The primary driver. Mechanosensors (costameres and titin kinase) detect physical strain across muscle fibers.\n2. **Intracellular Signaling**: Tension activates the **mTORC1** pathway, upregulating ribosomes and ribosomal biogenesis.\n3. **Muscle Protein Synthesis (MPS)**: When MPS exceeds Muscle Protein Breakdown (MPB) over time, net protein accretion occurs, adding new sarcomeres in parallel (thickening the myofibrils).\n4. **Proximity to Failure**: Sets taken within 0–3 Reps in Reserve (RIR) maximize high-threshold motor unit recruitment and fiber strain.\n\n*Ready to resume your current lesson?*`;
  }

  return `### Scientific Principle Breakdown 🧪\n\nYou asked: "${question}"\n\nIn exercise science, all physiological adaptations obey the **SAID Principle** (Specific Adaptations to Imposed Demands):\n\n1. **Stimulus**: A mechanical, energetic, or neurological stress is applied beyond habitual thresholds.\n2. **Disruption of Homeostasis**: Cellular energy depots deplete, micro-strain occurs, or neuromuscular pathways fatigue.\n3. **Signaling Cascade**: Biochemical messengers (calcium ions, kinases, gene transcription factors) signal repair and supercompensation.\n4. **Adaptation**: Tissues adapt specifically to tolerate that specific stress in the future.\n\n*Let's continue through your current module to see how this links directly to your lesson!*`;
}

// Development Vite Middleware vs Production Static
async function startServer() {
  // Serve public static assets (favicon, manifest, images, etc.)
  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/src/assets', express.static(path.join(__dirname, 'src/assets')));

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        hmr: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`KineticLab Server listening on port ${port}`);
  });
}

startServer();
