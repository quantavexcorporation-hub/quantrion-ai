export const dnaOverview = {
  score: 92,
  weekly: 4.2,
  monthly: 11.8,
  lifetime: 38.5,
}

export const dnaAttributes = [
  { name: "Concept Mastery", score: 84, growth: 3.2, trend: "up" as const, insight: "Mechanics cluster leading growth.", expected: "+5% in 14d" },
  { name: "Retention Strength", score: 78, growth: 1.4, trend: "up" as const, insight: "Spaced revision lifting Chemistry.", expected: "+4% in 21d" },
  { name: "Accuracy Pattern", score: 82, growth: 2.1, trend: "up" as const, insight: "Medium questions are your sweet spot.", expected: "+3% in 10d" },
  { name: "Speed Index", score: 76, growth: -0.8, trend: "down" as const, insight: "Long sessions slow decision time.", expected: "Stabilize with 45m blocks" },
  { name: "Learning Consistency", score: 79, growth: 2.6, trend: "up" as const, insight: "18-day streak reinforcing habits.", expected: "+2% if streak holds" },
  { name: "Problem Solving", score: 81, growth: 1.9, trend: "up" as const, insight: "Visual → formula path works well.", expected: "+4% with PYQ drills" },
  { name: "Exam Readiness", score: 82, growth: 3.5, trend: "up" as const, insight: "Mock accuracy trending upward.", expected: "Rank lift ~180" },
  { name: "Learning Confidence", score: 74, growth: 0.6, trend: "flat" as const, insight: "Confidence lags mastery slightly.", expected: "+6% after 2 mocks" },
  { name: "Curiosity Index", score: 88, growth: 2.0, trend: "up" as const, insight: "High AI question volume on Physics.", expected: "Channel into weak Chem" },
  { name: "Focus Stability", score: 71, growth: -1.2, trend: "down" as const, insight: "Focus drops after 70 minutes.", expected: "Pomodoro restore +5%" },
]

export const evolutionTimeline = [
  { label: "Week 1", score: 74, note: "Baseline DNA locked" },
  { label: "Week 2", score: 79, note: "Physics velocity surge" },
  { label: "Week 3", score: 85, note: "Retention recovery" },
  { label: "Week 4", score: 89, note: "Mock lift detected" },
  { label: "Today", score: 92, note: "Peak intelligence score" },
]

export const personalities = [
  {
    title: "Visual Learner",
    strengths: "Diagrams, FBDs, mind maps",
    weaknesses: "Dense text-only notes",
    tip: "Prefer Smart Notes visual summaries",
  },
  {
    title: "Problem Solver",
    strengths: "Medium → hard transitions",
    weaknesses: "Skipping foundations when rushed",
    tip: "Warm up with 5 concept triggers",
  },
  {
    title: "Deep Thinker",
    strengths: "Multi-step reasoning",
    weaknesses: "Over-time on easy marks",
    tip: "Time-box easy questions to 60s",
  },
  {
    title: "Revision Driven",
    strengths: "Spaced recall adherence",
    weaknesses: "First-pass speed",
    tip: "Pair first-pass with rapid fire",
  },
  {
    title: "Exam Strategist",
    strengths: "Mock calibration",
    weaknesses: "Overfitting to last paper",
    tip: "Rotate PYQ years deliberately",
  },
  {
    title: "Concept Explorer",
    strengths: "AI conversations, curiosity",
    weaknesses: "Scattered topic jumps",
    tip: "Finish one genome branch before switching",
  },
]

export const radarAxes = [
  { metric: "Concept", value: 84 },
  { metric: "Retention", value: 78 },
  { metric: "Speed", value: 76 },
  { metric: "Accuracy", value: 82 },
  { metric: "Revision", value: 74 },
  { metric: "Problem Solving", value: 81 },
  { metric: "Confidence", value: 74 },
  { metric: "Reasoning", value: 86 },
]

export const genomeNodes = [
  { id: "physics", label: "Physics", level: "subject", status: "strong" as const, parent: null },
  { id: "lom", label: "Laws of Motion", level: "chapter", status: "strong" as const, parent: "physics" },
  { id: "newton", label: "Newton's Laws", level: "topic", status: "learning" as const, parent: "lom" },
  { id: "impulse", label: "Impulse", level: "concept", status: "learning" as const, parent: "newton" },
  { id: "chem", label: "Chemistry", level: "subject", status: "weak" as const, parent: null },
  { id: "organic", label: "Organic", level: "chapter", status: "weak" as const, parent: "chem" },
  { id: "mech", label: "Mechanisms", level: "topic", status: "weak" as const, parent: "organic" },
  { id: "math", label: "Math", level: "subject", status: "learning" as const, parent: null },
  { id: "calc", label: "Calculus", level: "chapter", status: "learning" as const, parent: "math" },
  { id: "ibp", label: "Integration by Parts", level: "concept", status: "weak" as const, parent: "calc" },
]

export const dependencyLinks = [
  { from: "Algebra", to: "Functions", risk: true },
  { from: "Functions", to: "Calculus", risk: true },
  { from: "Calculus", to: "Physics", risk: true },
  { from: "Laws of Motion", to: "Work & Energy", risk: false },
  { from: "Impulse", to: "Collisions", risk: false },
]

export const cognitiveCards = [
  { label: "Thinking Speed", value: "1.8s", note: "avg decision" },
  { label: "Memory Retention", value: "78%", note: "7-day recall" },
  { label: "Question Accuracy", value: "82%", note: "rolling" },
  { label: "Decision Time", value: "42s", note: "medium Qs" },
  { label: "Consistency", value: "79%", note: "day-to-day" },
  { label: "Confidence", value: "74%", note: "self-rated" },
  { label: "Improvement Rate", value: "+4.2%", note: "weekly" },
  { label: "Learning Velocity", value: "1.3×", note: "cohort avg" },
]

export const behaviourSignals = [
  { label: "Study Time", value: "14.2h / wk" },
  { label: "Focus Duration", value: "48 min avg" },
  { label: "Revision Frequency", value: "4.1× / wk" },
  { label: "Question Attempts", value: "234 / wk" },
  { label: "Video Completion", value: "86%" },
  { label: "AI Conversations", value: "41" },
  { label: "Book Reading", value: "3.2h" },
  { label: "Mock Tests", value: "2 / wk" },
]

export const aiPatterns = [
  "You perform best in the morning (9–11 AM).",
  "Physics accuracy rises 11% after a revision session.",
  "Sessions longer than 70 minutes reduce accuracy.",
  "Organic Chemistry has the highest forgetting rate.",
  "You solve medium questions faster than easy warm-ups.",
]

export const hiddenPotential = [
  { label: "Fastest improving", value: "Physics · Mechanics" },
  { label: "Most difficult", value: "Organic Mechanisms" },
  { label: "Future strongest", value: "Calculus applications" },
  { label: "Likely to weaken", value: "Electrostatics (14d)" },
  { label: "Revision priority", value: "Integration by Parts" },
  { label: "Potential score lift", value: "+48 projected marks" },
]

export const growthProjection = [
  { horizon: "Next 7 days", mastery: 86, retention: 80, accuracy: 84, rank: 1120 },
  { horizon: "Next Month", mastery: 90, retention: 85, accuracy: 87, rank: 980 },
  { horizon: "Next Exam", mastery: 93, retention: 88, accuracy: 89, rank: 860 },
]

export const comparative = [
  { label: "Current Month", score: 92, delta: "+8" },
  { label: "Last Month", score: 84, delta: "+5" },
  { label: "Best Month", score: 92, delta: "Peak" },
]

export const achievements = [
  { title: "Concept Mastered", detail: "Kinematics genome complete", when: "2d ago" },
  { title: "Retention Increased", detail: "+6% Chemistry recall", when: "4d ago" },
  { title: "Mock Test Improved", detail: "76% → predicted #980", when: "5d ago" },
  { title: "Accuracy Improved", detail: "+4% medium set", when: "1w ago" },
  { title: "Revision Completed", detail: "Thermodynamics cycle", when: "1w ago" },
]

export const healthScores = [
  { label: "Concept Health", value: 84 },
  { label: "Memory Health", value: 78 },
  { label: "Revision Health", value: 74 },
  { label: "Practice Health", value: 81 },
  { label: "Confidence Health", value: 74 },
]

export const coachAdvice = [
  { title: "Daily Advice", body: "Protect morning Physics block — your peak window." },
  { title: "Next Concept", body: "Impulse & Momentum · 25 min Smart Notes" },
  { title: "Revision Reminder", body: "Integration by Parts due today" },
  { title: "Weak Topic", body: "Organic Mechanisms · revise triggers" },
  { title: "Best Study Time", body: "09:00–11:00 · high Progress IQ" },
  { title: "Estimated Gain", body: "+3–5 DNA points this week if plan followed" },
]
