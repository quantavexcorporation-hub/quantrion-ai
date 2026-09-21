export type BookStatus = "ai-ready" | "learning" | "mastered"

export type LibraryBook = {
  id: string
  title: string
  subtitle: string
  subject: string
  spine: string
  coverFrom: string
  coverTo: string
  completion: number
  retention: number
  lastOpened: string
  studyTime: string
  chapters: number
  aiStatus: BookStatus
  blurb: string
}

export type ReaderPage = {
  id: string
  chapter: string
  title: string
  body: string
  kind: "text" | "formula" | "definition" | "concept-3d" | "quiz"
  /** Only concept-3d pages get interactive visualization */
  vizHint?: string
  quizPrompt?: string
  quizAnswer?: string
}

export const libraryBooks: LibraryBook[] = [
  {
    id: "physics-smart",
    title: "Physics Intelligence Book",
    subtitle: "Laws of Motion · Impulse · Energy",
    subject: "Physics",
    spine: "#1D4ED8",
    coverFrom: "#1E3A8A",
    coverTo: "#0EA5E9",
    completion: 62,
    retention: 74,
    lastOpened: "2h ago",
    studyTime: "18 min left",
    chapters: 12,
    aiStatus: "learning",
    blurb: "Interactive AI book — explain, simulate, quiz, and sync to Knowledge DNA.",
  },
  {
    id: "chem-atlas",
    title: "Chemistry Intelligence Book",
    subtitle: "Organic · Physical · Inorganic maps",
    subject: "Chemistry",
    spine: "#7C3AED",
    coverFrom: "#4C1D95",
    coverTo: "#A78BFA",
    completion: 41,
    retention: 58,
    lastOpened: "Yesterday",
    studyTime: "32 min left",
    chapters: 16,
    aiStatus: "ai-ready",
    blurb: "Molecules, mechanisms, and memory — taught by an embedded AI tutor.",
  },
  {
    id: "math-intel",
    title: "Mathematics Intelligence Book",
    subtitle: "Calculus · Algebra · Vectors",
    subject: "Mathematics",
    spine: "#059669",
    coverFrom: "#064E3B",
    coverTo: "#34D399",
    completion: 78,
    retention: 81,
    lastOpened: "Today",
    studyTime: "12 min left",
    chapters: 14,
    aiStatus: "mastered",
    blurb: "Animated graphs and step-wise AI proofs for every theorem.",
  },
  {
    id: "hcv-concepts",
    title: "HC Verma · Concepts of Physics",
    subtitle: "Deep conceptual physics companion",
    subject: "Physics",
    spine: "#0369A1",
    coverFrom: "#0C4A6E",
    coverTo: "#38BDF8",
    completion: 35,
    retention: 66,
    lastOpened: "3d ago",
    studyTime: "45 min left",
    chapters: 22,
    aiStatus: "ai-ready",
    blurb: "Classic problems reborn with AI explanations and FBD animations.",
  },
  {
    id: "ncert-chem",
    title: "NCERT Chemistry · Class 12",
    subtitle: "Exam-aligned living chapters",
    subject: "Chemistry",
    spine: "#B45309",
    coverFrom: "#78350F",
    coverTo: "#FBBF24",
    completion: 54,
    retention: 61,
    lastOpened: "5d ago",
    studyTime: "28 min left",
    chapters: 16,
    aiStatus: "learning",
    blurb: "Official syllabus with interactive molecules and memory triggers.",
  },
  {
    id: "calc-lab",
    title: "Calculus Interactive Lab",
    subtitle: "Limits · Derivatives · Integrals",
    subject: "Mathematics",
    spine: "#BE185D",
    coverFrom: "#831843",
    coverTo: "#F472B6",
    completion: 29,
    retention: 52,
    lastOpened: "1w ago",
    studyTime: "40 min left",
    chapters: 10,
    aiStatus: "ai-ready",
    blurb: "Animated graphs and step-wise AI proofs for every theorem.",
  },
]

/** Paginated reading surface — one clean page at a time */
export const bookPages: Record<string, ReaderPage[]> = {
  "physics-smart": [
    {
      id: "pg1",
      chapter: "Laws of Motion",
      title: "Newton's Second Law",
      kind: "definition",
      body: "The rate of change of momentum of a body is directly proportional to the applied force and takes place in the direction of the force. This is the foundation of classical mechanics for exam problem-solving.",
    },
    {
      id: "pg2",
      chapter: "Laws of Motion",
      title: "Working form",
      kind: "formula",
      body: "F = dp/dt. For constant mass this becomes F = ma. When mass varies (rockets, chains, conveyors), stay with the momentum form.",
    },
    {
      id: "pg3",
      chapter: "Laws of Motion",
      title: "Impulse intuition",
      kind: "text",
      body: "Impulse J = Δp equals the area under an F–t graph. Soft landings increase Δt and reduce peak force — the reason airbags and catching a ball with soft hands work.",
    },
    {
      id: "pg4",
      chapter: "Laws of Motion",
      title: "Accelerating frame · FBD",
      kind: "concept-3d",
      vizHint: "Truck + block: pseudo force opposite to acceleration",
      body: "On an accelerating truck, draw the free-body diagram carefully. In the non-inertial frame, include a pseudo force opposite to the truck’s acceleration. This is where students most often lose marks.",
    },
    {
      id: "pg5",
      chapter: "Laws of Motion",
      title: "AI check-in",
      kind: "quiz",
      quizPrompt: "A 2 kg body at rest receives 10 N for 0.2 s. Final speed?",
      quizAnswer: "1 m/s — Impulse J = 2 N·s = Δp → v = 1 m/s.",
      body: "Pause. The AI tutor wants you to predict before revealing — this builds Progress IQ and Knowledge DNA simultaneously.",
    },
    {
      id: "pg6",
      chapter: "Laws of Motion",
      title: "Exam lens",
      kind: "text",
      body: "Prefer impulse when given F–t graphs. Prefer F=ma when acceleration is constant. Always check units and direction before computing magnitude.",
    },
  ],
}

export const pageActions = [
  { id: "explain", label: "Explain", icon: "✨" },
  { id: "animation", label: "Watch Animation", icon: "🎥" },
  { id: "ask", label: "Ask AI", icon: "🧠" },
  { id: "pyq", label: "Solve PYQs", icon: "📊" },
  { id: "quiz", label: "Quiz Me", icon: "🎯" },
  { id: "memory", label: "Memory Trick", icon: "🔥" },
  { id: "real", label: "Real-Life Example", icon: "🌍" },
  { id: "related", label: "Related Chapters", icon: "📚" },
  { id: "difficulty", label: "Difficulty Analysis", icon: "📈" },
  { id: "listen", label: "Listen", icon: "🎤" },
] as const

export const aiPageActions = [
  "Explain",
  "Simplify",
  "Deep Explain",
  "Real-world Example",
  "Analogy",
  "Animation",
  "Visual Explanation",
  "Memory Trick",
  "Important for Exam",
  "Common Mistakes",
  "Ask AI",
]

export const visualizeModes = [
  "Animation",
  "Diagram",
  "Flowchart",
  "Timeline",
  "Comparison",
  "Mind Map",
  "Interactive simulation",
]

export const revisionLayers = [
  { title: "30-second summary", body: "Force equals rate of change of momentum." },
  { title: "2-minute summary", body: "Use F=ma for constant mass; use impulse for F–t graphs and collisions." },
  { title: "5-minute revision", body: "Cover FBDs, pseudo force, elevator N, and variable-mass traps." },
  { title: "Flashcards", body: "J = Δp · N = m(g±a) · Action ≠ same FBD" },
  { title: "Quick questions", body: "5 rapid-fire checks linked to this chapter." },
  { title: "Concept triggers", body: "Kick the ball · Elevator lie detector" },
  { title: "Exam checklist", body: "Units · Direction · Pseudo force · Graph area" },
]

export const linkedIntel = [
  { label: "Videos", href: "/learn" },
  { label: "PYQs", href: "/study-material" },
  { label: "Mock Tests", href: "/tests" },
  { label: "Study Material", href: "/study-material" },
  { label: "Knowledge DNA", href: "/knowledge-dna" },
  { label: "Progress IQ", href: "/knowledge-dna" },
  { label: "Adaptive Learning", href: "/learn" },
  { label: "AI Recommendations", href: "/app/dashboard" },
]

export const graphNodes = [
  { id: "ch", label: "Chapter", detail: "Laws of Motion" },
  { id: "tp", label: "Topic", detail: "Newton's Laws" },
  { id: "st", label: "Subtopic", detail: "Second Law" },
  { id: "cn", label: "Concept", detail: "Impulse" },
  { id: "py", label: "PYQs", detail: "2018–2024" },
  { id: "ts", label: "Tests", detail: "Adaptive set" },
  { id: "vd", label: "Videos", detail: "AI synced" },
  { id: "sm", label: "Study Material", detail: "Smart Notes" },
]

/** @deprecated kept for overlay compatibility */
export type ReaderParagraph = {
  id: string
  text: string
  kind?: "normal" | "formula" | "definition" | "diagram"
}

export const readerChapters: Record<string, { id: string; title: string; paragraphs: ReaderParagraph[] }[]> = {
  "physics-smart": [
    {
      id: "c1",
      title: "Newton's Second Law",
      paragraphs: bookPages["physics-smart"].map((p) => ({
        id: p.id,
        text: p.body,
        kind:
          p.kind === "formula"
            ? "formula"
            : p.kind === "definition"
              ? "definition"
              : p.kind === "concept-3d"
                ? "diagram"
                : "normal",
      })),
    },
  ],
}
