import type { Exam } from "@/lib/ai/types"

export async function retrieveConceptNotes(input: {
  subject: "math" | "physics" | "chemistry" | "biology" | "english"
  topic: string
  exam: Exclude<Exam, "auto">
}) {
  // MVP: deterministic, small notes. Later: connect to DB/vector store.
  const { subject, topic, exam } = input
  const common = [
    `Focus on definitions first, then exam-style shortcuts.`,
    `Common traps: sign errors, unit mismatch, and skipping boundary conditions.`,
  ]
  const subjectAddendum: Record<string, string[]> = {
    math: ["Show steps, then verify quickly with a sanity check."],
    physics: ["Track units and free-body diagrams; isolate variables early."],
    chemistry: ["Balance reactions, then reason with moles/stoichiometry."],
    biology: ["Prefer mechanism + keywords; use diagrams/flow when helpful."],
    english: ["Answer with structure: claim → evidence → conclusion; watch tone."],
  }
  return {
    subject,
    exam,
    topic,
    notes: [
      ...common,
      ...(subjectAddendum[subject] ?? []),
      `Exam alignment: ${exam.toUpperCase()} style (time-efficient, pattern-based).`,
    ],
  }
}

export async function generatePracticeSet(input: {
  subject: "math" | "physics" | "chemistry" | "biology" | "english"
  topic: string
  exam: Exclude<Exam, "auto">
  difficulty?: "easy" | "medium" | "hard"
  count?: number
}) {
  const { subject, topic, exam, difficulty = "medium", count = 5 } = input
  
  // Real practice questions based on subject and topic
  const questionBank: Record<string, Record<string, string[]>> = {
    math: {
      calculus: [
        "Find the derivative of f(x) = x³ + 2x² - 5x + 3",
        "Evaluate ∫(2x + 3)dx",
        "Find the limit of (x² - 4)/(x - 2) as x approaches 2",
        "Determine the critical points of f(x) = x³ - 12x + 5",
        "Calculate the area under y = x² from x = 0 to x = 2"
      ],
      algebra: [
        "Solve for x: 2x² - 5x + 3 = 0",
        "Find the inverse of f(x) = (2x + 1)/(x - 3)",
        "Simplify: (x² - 9)/(x + 3)",
        "Solve the system: 2x + y = 7, x - y = 1",
        "Find the domain of f(x) = √(x - 4)"
      ]
    },
    physics: {
      mechanics: [
        "A 5kg object falls from rest. Find its velocity after 3 seconds (g = 9.8 m/s²)",
        "Calculate the kinetic energy of a 1000kg car moving at 20 m/s",
        "Find the work done by a force of 50N over 10m",
        "Determine the momentum of a 0.5kg ball moving at 10 m/s",
        "Calculate the power required to lift a 100kg object 20m in 5s"
      ],
      electricity: [
        "Find the current in a circuit with 12V battery and 4Ω resistor",
        "Calculate the resistance of a wire with 2A current and 6V potential",
        "Determine the charge transferred in 10s with 3A current",
        "Find the power dissipated by a 5Ω resistor with 2A current",
        "Calculate the capacitance storing 24C at 6V"
      ]
    },
    chemistry: {
      stoichiometry: [
        "Balance: C₃H₈ + O₂ → CO₂ + H₂O",
        "Find moles in 36g of H₂O",
        "Calculate mass of CO₂ from 2 moles of CH₄ combustion",
        "Determine limiting reactant: 2H₂ + O₂ → 2H₂O (3g H₂, 32g O₂)",
        "Find concentration of 0.5mol NaOH in 250mL solution"
      ],
      organic: [
        "Name the compound: CH₃-CH₂-CH₂-CH₃",
        "Draw the structure of 2-methylpropane",
        "Identify the functional group in CH₃-CO-OH",
        "Calculate molecular weight of C₆H₁₂O₆",
        "Determine the degree of unsaturation in C₆H₁₀"
      ]
    }
  }

  const subjectQuestions = questionBank[subject]?.[topic] || questionBank[subject]?.calculus || [
    `Default ${subject} question about ${topic}`,
    `Advanced ${subject} problem involving ${topic}`,
    `Applied ${subject} scenario with ${topic}`,
    `Theoretical ${subject} concept: ${topic}`,
    `Practical ${subject} calculation using ${topic}`
  ]

  return {
    subject,
    exam,
    topic,
    difficulty,
    items: Array.from({ length: Math.min(count, subjectQuestions.length) }).map((_, idx) => ({
      id: `${subject}-${topic}-${idx + 1}`,
      question: subjectQuestions[idx % subjectQuestions.length],
      answer: getSampleAnswer(subject, topic, idx),
      solution: getSampleSolution(subject, topic, idx),
    })),
  }
}

function getSampleAnswer(subject: string, topic: string, index: number): string {
  const answers: Record<string, string[]> = {
    math: ["x = 1.5 or x = 1", "x² + 3x + C", "4", "x = -2, x = 2", "8/3"],
    physics: ["29.4 m/s", "200,000 J", "500 J", "5 kg·m/s", "4000 W"],
    chemistry: ["C₃H₈ + 5O₂ → 3CO₂ + 4H₂O", "2 mol", "88g CO₂", "O₂ is limiting", "2M"],
    biology: ["ATP production", "Cell division", "DNA replication", "Protein synthesis", "Metabolism"],
    english: ["Subject-verb agreement", "Clear thesis", "Logical flow", "Proper citation", "Coherent argument"]
  }
  return answers[subject]?.[index % answers[subject].length] || "Answer depends on specific values"
}

function getSampleSolution(subject: string, topic: string, index: number): string {
  return `Step-by-step solution for ${subject} ${topic} problem ${index + 1}. Apply relevant formulas and show all work.`
}

export async function evaluateAnswer(input: {
  subject: "math" | "physics" | "chemistry" | "biology" | "english"
  exam: Exclude<Exam, "auto">
  question: string
  userAnswer: string
  expectedAnswer: string
}) {
  const { subject, question, userAnswer, expectedAnswer } = input
  
  // Normalize answers for comparison
  const normalizeAnswer = (answer: string) => {
    return answer
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .replace(/[^\w\s\.\-\+\=\(\)\/]/g, '')
      .trim()
  }
  
  const userNormalized = normalizeAnswer(userAnswer)
  const expectedNormalized = normalizeAnswer(expectedAnswer)
  
  // Check for exact match
  const isExactMatch = userNormalized === expectedNormalized
  
  // Check for partial match (contains key components)
  const isPartialMatch = expectedNormalized.split(' ').some(word => 
    word.length > 2 && userNormalized.includes(word)
  )
  
  // Score calculation
  let score = 0
  let feedback = ""
  
  if (isExactMatch) {
    score = 1
    feedback = `Excellent! Your answer is correct. ${getNextStepSuggestion(subject)}`
  } else if (isPartialMatch) {
    score = 0.5
    feedback = `You're on the right track! Your answer contains some correct elements. Review your work and check for: ${getCommonMistakes(subject)}`
  } else {
    score = 0
    feedback = `Not quite right. Let's work through this step by step. Common issues to check: ${getCommonMistakes(subject)} The correct approach involves ${getHint(subject, question)}.`
  }
  
  return {
    subject: input.subject,
    exam: input.exam,
    isCorrect: isExactMatch,
    score,
    feedback,
    userAnswer,
    expectedAnswer,
    improvement: score < 1 ? getImprovementTips(subject) : null
  }
}

function getNextStepSuggestion(subject: string): string {
  const suggestions: Record<string, string> = {
    math: "Try solving a similar problem with different numbers to reinforce the concept.",
    physics: "Consider how changing the initial conditions would affect the outcome.",
    chemistry: "Practice balancing more complex equations or try related stoichiometry problems.",
    biology: "Connect this concept to related biological processes or systems.",
    english: "Apply this writing technique to a different topic or genre."
  }
  return suggestions[subject] || "Practice similar problems to build mastery."
}

function getCommonMistakes(subject: string): string {
  const mistakes: Record<string, string> = {
    math: "calculation errors, sign mistakes, or incorrect formula application",
    physics: "unit conversions, sign conventions, or forgetting to account for all forces",
    chemistry: "balancing equations, molar mass calculations, or limiting reactant identification",
    biology: "terminology precision, process sequence, or missing key steps",
    english: "grammar rules, sentence structure, or logical flow"
  }
  return mistakes[subject] || "fundamental concepts or problem-solving approach"
}

function getHint(subject: string, question: string): string {
  if (question.includes("derivative")) return "applying the power rule correctly"
  if (question.includes("integral")) return "finding the antiderivative and adding the constant"
  if (question.includes("limit")) return "factoring or using L'Hôpital's rule"
  if (question.includes("velocity") || question.includes("force")) return "using kinematic equations or Newton's laws"
  if (question.includes("balance")) return "ensuring equal numbers of atoms on both sides"
  return "breaking down the problem into smaller, manageable steps"
}

function getImprovementTips(subject: string): string {
  const tips: Record<string, string> = {
    math: "Review the fundamental formulas and practice showing all your work step-by-step.",
    physics: "Draw diagrams, label all quantities, and always check your units.",
    chemistry: "Write out all steps, double-check calculations, and verify element conservation.",
    biology: "Use visual aids, create mnemonics, and practice explaining concepts aloud.",
    english: "Outline your thoughts first, proofread carefully, and vary your sentence structure."
  }
  return tips[subject] || "Review the underlying concepts and practice with guided examples."
}

