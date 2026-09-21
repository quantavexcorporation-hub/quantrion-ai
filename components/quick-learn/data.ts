export type Difficulty = "Easy" | "Medium" | "Hard"

export type MicroVideo = {
  id: string
  title: string
  concept: string
  subject: string
  duration: string
  minutes: number
  difficulty: Difficulty
  retention: number
  progress: number
  recommended?: boolean
  mode: string
  thumbnail: string
}

export type LearningMode =
  | "Quick Revision"
  | "Exam Sprint"
  | "Concept Builder"
  | "Daily Learning"
  | "Future Tech"
  | "Trending Science"
  | "Weak Concepts"
  | "Recommended"

export const categories = [
  "Physics",
  "Chemistry",
  "Biology",
  "Mathematics",
  "History",
  "Geography",
  "Economics",
  "Computer Science",
  "Artificial Intelligence",
  "Quantum Computing",
  "Cybersecurity",
  "Blockchain",
  "Robotics",
  "Space",
  "Current Affairs",
  "Reasoning",
  "General Knowledge",
]

export const learningModes: LearningMode[] = [
  "Recommended",
  "Weak Concepts",
  "Quick Revision",
  "Exam Sprint",
  "Concept Builder",
  "Daily Learning",
  "Future Tech",
  "Trending Science",
]

export const videoActions = [
  "Explain Again",
  "Simplify",
  "Deep Explanation",
  "Real-Life Example",
  "Animation",
  "Memory Trick",
  "Related Concepts",
  "Practice Questions",
  "Previous Year Questions",
  "Summary",
  "Flashcards",
  "Ask AI",
]

export const feedVideos: MicroVideo[] = [
  {
    id: "v1",
    title: "Newton's Second Law in 4 minutes",
    concept: "F = ma & Impulse",
    subject: "Physics",
    duration: "4:12",
    minutes: 4,
    difficulty: "Medium",
    retention: 78,
    progress: 40,
    recommended: true,
    mode: "Weak Concepts",
    thumbnail: "from-sky-600/40 to-blue-950/60",
  },
  {
    id: "v2",
    title: "Electrostatics · Charge intuition",
    concept: "Coulomb's Law",
    subject: "Physics",
    duration: "5:40",
    minutes: 6,
    difficulty: "Hard",
    retention: 62,
    progress: 0,
    recommended: true,
    mode: "Exam Sprint",
    thumbnail: "from-violet-600/40 to-slate-950/60",
  },
  {
    id: "v3",
    title: "Algebra · Completing the square",
    concept: "Quadratic forms",
    subject: "Mathematics",
    duration: "3:55",
    minutes: 4,
    difficulty: "Easy",
    retention: 84,
    progress: 100,
    mode: "Quick Revision",
    thumbnail: "from-emerald-600/40 to-slate-950/60",
  },
  {
    id: "v4",
    title: "Thermodynamics · First Law",
    concept: "ΔU = Q − W",
    subject: "Physics",
    duration: "6:08",
    minutes: 6,
    difficulty: "Medium",
    retention: 71,
    progress: 15,
    recommended: true,
    mode: "Daily Learning",
    thumbnail: "from-amber-600/40 to-slate-950/60",
  },
  {
    id: "v5",
    title: "AI Basics · What is a model?",
    concept: "Neural nets intro",
    subject: "Artificial Intelligence",
    duration: "5:20",
    minutes: 5,
    difficulty: "Easy",
    retention: 88,
    progress: 0,
    mode: "Future Tech",
    thumbnail: "from-fuchsia-600/40 to-slate-950/60",
  },
  {
    id: "v6",
    title: "Organic · Resonance in 5 minutes",
    concept: "Electron delocalization",
    subject: "Chemistry",
    duration: "5:02",
    minutes: 5,
    difficulty: "Medium",
    retention: 66,
    progress: 0,
    mode: "Concept Builder",
    thumbnail: "from-rose-600/40 to-slate-950/60",
  },
]

export const aiRecommendations = [
  { title: "Revise Newton's Laws", reason: "Weakness · 45% confidence", href: "/quick-learn" },
  { title: "Watch Electrostatics", reason: "Due in Progress IQ revision", href: "/quick-learn" },
  { title: "Learn AI Basics", reason: "Future of Industries pathway", href: "/quick-learn" },
  { title: "Complete 5-minute Algebra", reason: "Quick win · Easy", href: "/quick-learn" },
  { title: "Finish Thermodynamics", reason: "15% watched · resume", href: "/quick-learn" },
]

export const timelineBuckets = [
  {
    id: "today",
    label: "Today's Learning",
    items: ["Newton's Second Law", "Thermodynamics · First Law"],
  },
  {
    id: "yesterday",
    label: "Yesterday",
    items: ["Algebra · Completing the square"],
  },
  {
    id: "week",
    label: "This Week",
    items: ["Organic Resonance", "AI Basics"],
  },
  {
    id: "done",
    label: "Completed",
    items: ["Limits & Continuity · 3 shorts"],
  },
  {
    id: "bookmarks",
    label: "Bookmarked",
    items: ["Coulomb's Law", "Memory trick · Impulse"],
  },
]

export const dailyChallenge = {
  concept: "Impulse–Momentum",
  quiz: "3 rapid checks",
  sprint: "60-second challenge",
  streak: 18,
  weeklyTarget: "12 / 15 sessions",
}
