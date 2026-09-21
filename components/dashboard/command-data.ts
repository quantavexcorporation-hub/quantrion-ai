export const dashboardMission = {
  study: { subject: "Physics", topics: 2 },
  revision: { subject: "Chemistry", topics: 1 },
  mock: { questions: 30 },
  estimated: "3h 20m",
  completion: 42,
  readinessToday: 81,
}

export const learningProgressMetrics = [
  { label: "Concept Understanding", value: 84, suffix: "%" },
  { label: "Retention Strength", value: 78, suffix: "%" },
  { label: "Progress IQ", value: 76, suffix: "" },
  { label: "Study Streak", value: 18, suffix: "d" },
  { label: "Hours Learned", value: 127, suffix: "h" },
  { label: "Questions Solved", value: 2847, suffix: "" },
  { label: "Videos Completed", value: 64, suffix: "" },
  { label: "Notes Read", value: 38, suffix: "" },
  { label: "PYQs Solved", value: 412, suffix: "" },
]

export const learningPath = [
  { id: "chapter", label: "Current Chapter", detail: "Laws of Motion", status: "done" as const },
  { id: "concept", label: "Next Concept", detail: "Impulse & Momentum", status: "current" as const },
  { id: "revision", label: "Revision", detail: "Thermodynamics", status: "upcoming" as const },
  { id: "mock", label: "Mock Test", detail: "Physics Set B", status: "upcoming" as const },
  { id: "mastery", label: "Mastery", detail: "Target 90%", status: "upcoming" as const },
]

export const conceptBands = {
  weak: [
    { name: "Integration by Parts", confidence: 45, mistakes: 12, due: "Today", difficulty: "Hard", action: "Revise Now" },
    { name: "Organic Mechanisms", confidence: 52, mistakes: 9, due: "Tomorrow", difficulty: "Medium", action: "Revise Now" },
  ],
  medium: [
    { name: "Thermodynamics Laws", confidence: 68, mistakes: 5, due: "This week", difficulty: "Medium", action: "Practice" },
    { name: "Electrostatics", confidence: 71, mistakes: 4, due: "3 days", difficulty: "Medium", action: "PYQs" },
  ],
  strong: [
    { name: "Kinematics", confidence: 91, mistakes: 1, due: "21 days", difficulty: "Easy", action: "Maintain" },
    { name: "Limits & Continuity", confidence: 88, mistakes: 2, due: "14 days", difficulty: "Easy", action: "Maintain" },
  ],
}

export const performanceIQ = {
  accuracy: 83,
  speed: 71,
  consistency: 79,
  retention: 78,
  examReadiness: 82,
  prediction: 847,
  radar: [
    { metric: "Accuracy", value: 83 },
    { metric: "Speed", value: 71 },
    { metric: "Consistency", value: 79 },
    { metric: "Retention", value: 78 },
    { metric: "Readiness", value: 82 },
  ],
  trend: [
    { week: "W1", iq: 68, accuracy: 70 },
    { week: "W2", iq: 71, accuracy: 73 },
    { week: "W3", iq: 74, accuracy: 76 },
    { week: "W4", iq: 76, accuracy: 83 },
  ],
}

export const knowledgeDnaExtended = [
  { label: "Learning Behaviour", value: "Active recall first" },
  { label: "Problem Solving Style", value: "Visual → Formula" },
  { label: "Consistency Index", value: "79%" },
  { label: "Learning Velocity", value: "+12%/wk" },
]

export const studyStrategy = [
  { title: "Focus Physics today", detail: "Highest expected score lift (+18 predicted)." },
  { title: "Defer Organic until revision window", detail: "Retention decay is manageable for 48h." },
  { title: "Revise Calculus tomorrow", detail: "Spaced repetition due — 25 min session." },
  { title: "Attempt Medium questions", detail: "Sweet spot for Progress IQ growth." },
  { title: "Watch AI explanation: Impulse", detail: "Closes a recurring mistake pattern." },
]

export const revisionQueue = [
  { when: "Today", topic: "Integration by Parts", retention: 45, status: "due" as const },
  { when: "Tomorrow", topic: "Thermodynamics", retention: 58, status: "upcoming" as const },
  { when: "This Week", topic: "Electrostatics", retention: 71, status: "upcoming" as const },
  { when: "Missed", topic: "Organic Nomenclature", retention: 39, status: "missed" as const },
]

export const mockInsights = {
  latest: "Physics Mock · Set A",
  accuracy: 76,
  rank: 1240,
  time: "2h 48m",
  negative: 8,
  strong: ["Kinematics", "Laws of Motion"],
  weak: ["Thermodynamics", "Waves"],
  next: "Adaptive Physics Mock · Medium",
  predictedRank: 980,
}

export const studyMaterialProgress = [
  { label: "Smart Notes", value: "12/18", pct: 67 },
  { label: "Summaries", value: "9 read", pct: 60 },
  { label: "Quick Questions", value: "84 solved", pct: 72 },
  { label: "Concept Triggers", value: "11 revised", pct: 55 },
  { label: "PYQs", value: "46 done", pct: 58 },
  { label: "AI Explanations", value: "317 used", pct: 80 },
  { label: "Retention Strength", value: "78%", pct: 78 },
]

export const heatmapWeeks = [
  [0, 1, 2, 3, 1, 0, 2],
  [1, 2, 3, 4, 2, 1, 3],
  [2, 3, 4, 3, 4, 2, 1],
  [1, 2, 2, 3, 3, 4, 2],
  [0, 1, 3, 4, 4, 3, 2],
  [2, 3, 3, 2, 1, 2, 4],
  [1, 2, 4, 4, 3, 2, 1],
  [2, 3, 2, 3, 4, 3, 2],
  [1, 1, 2, 3, 2, 1, 0],
  [2, 4, 3, 4, 3, 2, 3],
  [3, 3, 4, 2, 1, 2, 2],
  [1, 2, 3, 3, 4, 4, 3],
]

export const examReadinessFactors = [
  { label: "Concept Mastery", value: 80 },
  { label: "Retention", value: 78 },
  { label: "Mock Tests", value: 76 },
  { label: "Revision", value: 68 },
  { label: "Accuracy", value: 83 },
  { label: "Weak Topics", value: 55 },
]

export const aiRecommendations = [
  { title: "Study Newton's Laws", href: "/learn", tone: "blue" as const },
  { title: "Revise Electrostatics", href: "/study-material", tone: "amber" as const },
  { title: "Attempt 20 PYQs", href: "/practice", tone: "green" as const },
  { title: "Read Smart Notes", href: "/study-material", tone: "sky" as const },
  { title: "Watch AI Explanation", href: "/learn", tone: "blue" as const },
  { title: "Take Adaptive Test", href: "/tests", tone: "green" as const },
]

export const recentTimeline = [
  { type: "video", title: "Watched: Impulse & Momentum", time: "25 min ago" },
  { type: "notes", title: "Read Smart Notes · Laws of Motion", time: "1h ago" },
  { type: "test", title: "Solved Physics Mock Set A", time: "Yesterday" },
  { type: "revision", title: "Completed revision · Kinematics", time: "Yesterday" },
  { type: "ai", title: "AI conversation · Elevator problems", time: "2 days ago" },
]

export const productivity = {
  streak: 18,
  longest: 31,
  todayHours: 2.4,
  weeklyHours: 14.2,
  monthlyGrowth: 18,
  focus: "1h 55m",
  break: "28m",
}

export const goals = [
  { label: "Weekly Goal", value: 72, detail: "18h / 25h study" },
  { label: "Monthly Goal", value: 61, detail: "Concept coverage" },
  { label: "Exam Goal", value: 48, detail: "Target rank < 1000" },
  { label: "Target Rank", value: 35, detail: "980 predicted" },
]

export const motivation = {
  quote: "Consistency compounds faster than intensity.",
  achievement: "18-day streak unlocked",
  milestone: "Next: 90% Exam Readiness",
  rankLift: "+260 predicted rank improvement this month",
}

export const aiInsights = [
  "You solve Physics fastest between 9–11 AM.",
  "Retention in Chemistry dropped 6% this week.",
  "You perform better on medium questions than hard starts.",
  "Revise Algebra today — decay detected.",
  "Attempt one mock test tomorrow for rank lift.",
]

export const quickActions = [
  { title: "Continue Learning", href: "/learn" },
  { title: "Mock Test", href: "/tests" },
  { title: "Study Material", href: "/study-material" },
  { title: "Progress IQ", href: "/knowledge-dna" },
  { title: "AI Tutor", href: "/learn" },
  { title: "Ask AI", href: "/learn" },
  { title: "Smart Library", href: "/library" },
  { title: "Revision", href: "/study-material" },
  { title: "Bookmarks", href: "/library" },
  { title: "Downloads", href: "/library" },
]
