export type ShortClip = {
  id: string
  title: string
  concept: string
  subject: string
  duration: string
  difficulty: "Easy" | "Medium" | "Hard"
  retention: number
  reason: string
  accent: string
  gradient: string
}

export const shortsFeed: ShortClip[] = [
  {
    id: "s1",
    title: "Newton's Second Law",
    concept: "F = ma in one clear pass",
    subject: "Physics",
    duration: "0:42",
    difficulty: "Medium",
    retention: 78,
    reason: "Weak concept · Knowledge DNA",
    accent: "#60A5FA",
    gradient: "from-sky-500/30 via-slate-950 to-blue-950",
  },
  {
    id: "s2",
    title: "Impulse Intuition",
    concept: "Why soft landings hurt less",
    subject: "Physics",
    duration: "0:38",
    difficulty: "Easy",
    retention: 82,
    reason: "Revision due · Progress IQ",
    accent: "#34D399",
    gradient: "from-emerald-500/25 via-slate-950 to-teal-950",
  },
  {
    id: "s3",
    title: "Coulomb's Law",
    concept: "Charge force without the fog",
    subject: "Physics",
    duration: "0:51",
    difficulty: "Hard",
    retention: 64,
    reason: "Exam sprint · Electrostatics",
    accent: "#A78BFA",
    gradient: "from-violet-500/30 via-slate-950 to-indigo-950",
  },
  {
    id: "s4",
    title: "Completing the Square",
    concept: "Quadratic forms in 45 seconds",
    subject: "Mathematics",
    duration: "0:45",
    difficulty: "Easy",
    retention: 88,
    reason: "Quick win · Daily learning",
    accent: "#FBBF24",
    gradient: "from-amber-500/25 via-slate-950 to-orange-950",
  },
  {
    id: "s5",
    title: "What is a Model?",
    concept: "AI basics · neural nets intro",
    subject: "Artificial Intelligence",
    duration: "0:55",
    difficulty: "Easy",
    retention: 90,
    reason: "Future of Industries pathway",
    accent: "#F472B6",
    gradient: "from-fuchsia-500/25 via-slate-950 to-pink-950",
  },
  {
    id: "s6",
    title: "First Law of Thermodynamics",
    concept: "ΔU = Q − W visualised",
    subject: "Physics",
    duration: "0:48",
    difficulty: "Medium",
    retention: 71,
    reason: "Continue watching · 15% left",
    accent: "#FB7185",
    gradient: "from-rose-500/25 via-slate-950 to-red-950",
  },
]

export const shortActions = [
  { id: "explain", label: "Explain" },
  { id: "simplify", label: "Simplify" },
  { id: "deep", label: "Deep" },
  { id: "example", label: "Real life" },
  { id: "memory", label: "Memory" },
  { id: "quiz", label: "Quiz me" },
  { id: "pyq", label: "PYQs" },
  { id: "ask", label: "Ask AI" },
]
