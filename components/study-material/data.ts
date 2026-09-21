export type Difficulty = "Easy" | "Medium" | "Hard"

export type LearningStep = {
  id: string
  label: string
  status: "done" | "current" | "upcoming"
  detail: string
}

export type SummaryMode = {
  id: string
  title: string
  duration: string
  description: string
  kind: "text" | "visual" | "map" | "flow" | "tree"
}

export type QuickQuestion = {
  id: string
  type: "MCQ" | "Concept" | "Rapid Fire" | "True/False" | "Fill"
  prompt: string
  answer: string
  explanation: string
}

export type ConceptTrigger = {
  id: string
  title: string
  kind: "Memory cue" | "Shortcut" | "Visual hook" | "Story" | "Analogy"
  body: string
  color: "blue" | "sky" | "green" | "amber" | "rose"
}

export type PyqItem = {
  id: string
  year: number
  exam: string
  difficulty: Difficulty
  question: string
  frequency: "High" | "Medium" | "Low"
  trend: "Rising" | "Stable" | "Falling"
  expectedSimilar: string
}

export type RetentionFactor = {
  label: string
  value: number
}

export const heroStats = [
  { label: "Topics Available", value: "248", delta: "+12 this week", tone: "blue" as const },
  { label: "Concept Coverage", value: "86%", delta: "Physics · Calculus", tone: "sky" as const },
  { label: "Previous Year Questions", value: "1,420", delta: "2018–2024 linked", tone: "green" as const },
  { label: "Retention Score", value: "92%", delta: "+4% vs last week", tone: "amber" as const },
  { label: "AI Explanations Used", value: "317", delta: "Context-aware", tone: "blue" as const },
  { label: "Revision Progress", value: "68%", delta: "Spaced schedule", tone: "sky" as const },
  { label: "Study Time", value: "14.2h", delta: "This topic cluster", tone: "green" as const },
]

export const learningFlow: LearningStep[] = [
  { id: "chapter", label: "Chapter", status: "done", detail: "Laws of Motion" },
  { id: "topic", label: "Topic", status: "done", detail: "Newton's Laws" },
  { id: "subtopic", label: "Subtopic", status: "current", detail: "Second Law & Impulse" },
  { id: "concept", label: "Concept", status: "upcoming", detail: "F = ma applications" },
  { id: "practice", label: "Practice", status: "upcoming", detail: "12 calibrated drills" },
  { id: "revision", label: "Revision", status: "upcoming", detail: "Spaced recall in 2d" },
]

export const smartNotesSections = [
  {
    id: "defs",
    title: "Important Definitions",
    content:
      "Newton's Second Law: The rate of change of momentum of a body is directly proportional to the applied force and takes place in the direction of the force.",
  },
  {
    id: "formulas",
    title: "Important Formulas",
    content: "F = ma · Impulse J = Δp = FΔt · Weight W = mg · Apparent weight in lift: N = m(g ± a)",
  },
  {
    id: "diagrams",
    title: "Diagrams & Free-Body Views",
    content: "AI-annotated FBDs for incline, pulley, and elevator systems with force resolution cues.",
  },
  {
    id: "tables",
    title: "Comparison Tables",
    content: "Action–reaction pairs · Pseudo force cases · Static vs kinetic friction decision matrix.",
  },
  {
    id: "facts",
    title: "Highlighted Exam Facts",
    content: "Impulse is a vector · Force is not always ma when mass varies · Pseudo force appears in non-inertial frames.",
  },
]

export const summaryModes: SummaryMode[] = [
  {
    id: "30s",
    title: "30 Second Summary",
    duration: "30s",
    description: "Core idea only — force equals rate of change of momentum.",
    kind: "text",
  },
  {
    id: "2m",
    title: "2 Minute Revision",
    duration: "2m",
    description: "Definitions, key formulas, and three trap mistakes.",
    kind: "text",
  },
  {
    id: "5m",
    title: "5 Minute Complete Review",
    duration: "5m",
    description: "Full concept walkthrough with exam perspective.",
    kind: "text",
  },
  {
    id: "visual",
    title: "Visual Summary",
    duration: "Visual",
    description: "Scene-based mental model of action and reaction.",
    kind: "visual",
  },
  {
    id: "mind",
    title: "Mind Map",
    duration: "Map",
    description: "Branch from force → momentum → impulse → applications.",
    kind: "map",
  },
  {
    id: "flow",
    title: "Flowchart",
    duration: "Flow",
    description: "Decision tree for choosing F=ma vs impulse methods.",
    kind: "flow",
  },
  {
    id: "tree",
    title: "Concept Tree",
    duration: "Tree",
    description: "Hierarchy from Newton's laws to derived exam patterns.",
    kind: "tree",
  },
]

export const quickQuestions: QuickQuestion[] = [
  {
    id: "q1",
    type: "MCQ",
    prompt: "A force of 10 N acts for 0.2 s on a 2 kg body at rest. Final speed?",
    answer: "1 m/s",
    explanation: "Impulse J = 10 × 0.2 = 2 N·s = Δp. v = Δp/m = 2/2 = 1 m/s.",
  },
  {
    id: "q2",
    type: "True/False",
    prompt: "Action and reaction forces always act on the same body.",
    answer: "False",
    explanation: "They act on different bodies — that's why they don't cancel on a single FBD.",
  },
  {
    id: "q3",
    type: "Concept",
    prompt: "When is F ≠ ma for a system?",
    answer: "When mass is variable or you are in a non-inertial frame without pseudo force.",
    explanation: "Rocket problems and accelerating frames need careful momentum or pseudo-force treatment.",
  },
  {
    id: "q4",
    type: "Fill",
    prompt: "Impulse equals change in ______.",
    answer: "momentum",
    explanation: "J = Δp is the integral form of Newton's second law.",
  },
  {
    id: "q5",
    type: "Rapid Fire",
    prompt: "SI unit of impulse?",
    answer: "N·s (or kg·m/s)",
    explanation: "Same dimensions as momentum.",
  },
]

export const conceptTriggers: ConceptTrigger[] = [
  {
    id: "t1",
    title: "Kick the ball",
    kind: "Story",
    body: "Harder kick → larger Δp in same time → larger force felt. Impulse is the 'kick package'.",
    color: "blue",
  },
  {
    id: "t2",
    title: "F = Δp / Δt",
    kind: "Shortcut",
    body: "Always rewrite Second Law as rate of change of momentum when mass changes.",
    color: "sky",
  },
  {
    id: "t3",
    title: "Two people, two arrows",
    kind: "Visual hook",
    body: "Action and reaction live on different FBDs — draw two bodies, never cancel on one.",
    color: "green",
  },
  {
    id: "t4",
    title: "Elevator as a lie detector",
    kind: "Analogy",
    body: "Scale reading lies when accelerating — N = m(g±a). Comfort = inertial frame.",
    color: "amber",
  },
  {
    id: "t5",
    title: "Memory map: Force family",
    kind: "Memory cue",
    body: "Force → Impulse → Momentum → Collision → Conservation. One spine, many exams.",
    color: "rose",
  },
]

export const pyqItems: PyqItem[] = [
  {
    id: "pyq2018",
    year: 2018,
    exam: "JEE Advanced",
    difficulty: "Hard",
    question: "Variable mass chain falling on a scale — find reading as function of time.",
    frequency: "High",
    trend: "Rising",
    expectedSimilar: "Sand falling on conveyor / rocket thrust variants",
  },
  {
    id: "pyq2019",
    year: 2019,
    exam: "JEE Main",
    difficulty: "Medium",
    question: "Block on accelerating wedge — find normal force.",
    frequency: "High",
    trend: "Stable",
    expectedSimilar: "Pseudo force on incline in accelerating truck",
  },
  {
    id: "pyq2020",
    year: 2020,
    exam: "JEE Main",
    difficulty: "Easy",
    question: "Impulse-momentum for a cricket ball catch.",
    frequency: "Medium",
    trend: "Stable",
    expectedSimilar: "Soft landing / airbag time-extension problems",
  },
  {
    id: "pyq2021",
    year: 2021,
    exam: "JEE Advanced",
    difficulty: "Hard",
    question: "Two blocks with spring — force during collision phase.",
    frequency: "Medium",
    trend: "Rising",
    expectedSimilar: "Impulse through spring-connected systems",
  },
  {
    id: "pyq2022",
    year: 2022,
    exam: "JEE Main",
    difficulty: "Medium",
    question: "Man in elevator — apparent weight vs true weight plot.",
    frequency: "High",
    trend: "Rising",
    expectedSimilar: "Multi-phase elevator acceleration graphs",
  },
  {
    id: "pyq2023",
    year: 2023,
    exam: "JEE Advanced",
    difficulty: "Hard",
    question: "Atwood with movable pulley — acceleration of each mass.",
    frequency: "High",
    trend: "Rising",
    expectedSimilar: "Constraint + Newton's laws hybrid",
  },
  {
    id: "pyq2024",
    year: 2024,
    exam: "JEE Main",
    difficulty: "Medium",
    question: "Force-time graph → find change in momentum.",
    frequency: "High",
    trend: "Rising",
    expectedSimilar: "Area under F-t as impulse",
  },
]

export const retentionFactors: RetentionFactor[] = [
  { label: "Reading Time", value: 88 },
  { label: "Recall Performance", value: 91 },
  { label: "Quiz Accuracy", value: 84 },
  { label: "Revision Frequency", value: 79 },
  { label: "PYQ Success", value: 86 },
  { label: "Concept Understanding", value: 93 },
  { label: "Memory Confidence", value: 90 },
]

export const topicFrequency = [
  { topic: "F=ma", count: 42 },
  { topic: "Impulse", count: 38 },
  { topic: "Pseudo force", count: 31 },
  { topic: "Friction", count: 28 },
  { topic: "Elevator", count: 24 },
  { topic: "Pulleys", count: 22 },
]

export const difficultyDistribution = [
  { name: "Easy", value: 28 },
  { name: "Medium", value: 47 },
  { name: "Hard", value: 25 },
]

export const heatmapCells = [
  [2, 3, 4, 5, 3, 4, 5],
  [3, 4, 5, 4, 5, 3, 4],
  [1, 2, 3, 4, 3, 2, 3],
  [4, 5, 4, 5, 5, 4, 5],
  [2, 3, 2, 3, 4, 3, 2],
]

export const sectionNav = [
  { id: "smart-notes", label: "Smart Notes" },
  { id: "learning-flow", label: "Learning Flow" },
  { id: "relevant", label: "Relevant Only" },
  { id: "summaries", label: "Summaries" },
  { id: "questions", label: "Quick Qs" },
  { id: "triggers", label: "Triggers" },
  { id: "recall", label: "Recall" },
  { id: "pyq", label: "PYQs" },
  { id: "pyq-analytics", label: "PYQ Analytics" },
  { id: "ai-inline", label: "In-Content AI" },
  { id: "future-ai", label: "Ask AI" },
  { id: "retention", label: "Retention" },
]

export const aiExplainOptions = [
  "Explain Simply",
  "Explain Deeply",
  "Visual Explanation",
  "Analogy",
  "Real Life Example",
  "Exam Perspective",
  "Common Mistakes",
  "Why Important",
  "Memory Trick",
  "Hindi",
  "English",
  "Regional Language",
  "Voice Explanation",
  "Animation Suggestion",
]
