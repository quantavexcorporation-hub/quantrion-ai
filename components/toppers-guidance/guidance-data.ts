export type MentorCategory = "exam-topper" | "industrial-expert" | "space-expert"

export type GuidanceTag = "strategy" | "routine" | "mindset" | "practice" | "career" | "skills"

export type MentorGuidance = {
  id: string
  category: MentorCategory
  name: string
  title: string
  credentials: string
  initials: string
  accent: string
  headline: string
  story: string
  resultStrategy: string[]
  weeklyBlueprint: string[]
  avoid: string[]
  tags: GuidanceTag[]
  helpful: number
  examOrDomain: string
}

export const MENTOR_GUIDANCE: MentorGuidance[] = [
  // ── Competitive Exam Toppers only ───────────────────────────────────
  {
    id: "rv-jee",
    category: "exam-topper",
    name: "Rohan Verma",
    title: "JEE Advanced Topper",
    credentials: "AIR 12 · JEE Advanced 2023",
    initials: "RV",
    accent: "from-amber-400/25 to-yellow-500/10",
    headline: "Timed PYQs every Sunday built my exam temperament",
    story:
      "I stopped endless chapter hopping six months before the exam. Results came from a fixed weekly strategy: deep learning on weekdays, pressure simulation on Sundays.",
    resultStrategy: [
      "One weak topic rescue block daily (45–60 min) before new learning",
      "Sunday full timed PYQ / mock under real constraints — no pauses",
      "Error log with three tags: concept / careless / time — fix the top tag next day",
      "Spaced revision: D+1, D+3, D+7 for every new formula cluster",
    ],
    weeklyBlueprint: [
      "Mon–Wed: high-cognition Physics/Math mornings",
      "Thu: Chemistry mechanisms + retention cards",
      "Fri: mixed short test",
      "Sat: error autopsy",
      "Sun: full timed paper",
    ],
    avoid: [
      "Collecting notes without solving",
      "Studying 10 hours with low intensity",
      "Ignoring silly mistakes as ‘careless only’",
    ],
    tags: ["strategy", "practice", "routine"],
    helpful: 2456,
    examOrDomain: "JEE Advanced",
  },
  {
    id: "as-jee",
    category: "exam-topper",
    name: "Aditya Sharma",
    title: "JEE Advanced Topper",
    credentials: "AIR 3 · JEE Advanced 2023",
    initials: "AS",
    accent: "from-sky-400/25 to-blue-500/10",
    headline: "Revision within 24 hours — then again after a week — locked rank",
    story:
      "Understanding once was never enough. My result strategy was ruthless revision discipline plus selective problem depth on weak patterns only.",
    resultStrategy: [
      "Same-day closed-book recall for every new concept (15 min)",
      "Weekly ‘pattern bank’ of 20 recurring numerical templates",
      "Protect sleep before mocks — temperament > extra chapter",
      "Teach-back one concept aloud every night",
    ],
    weeklyBlueprint: [
      "Daily: learn → recall → 1 twin problem",
      "Alternate evenings: speed set vs accuracy set",
      "Weekend: one mock + written strategy note for next week",
    ],
    avoid: [
      "Re-reading highlights instead of retrieval",
      "Skipping analysis after mocks",
      "Comparing daily hours with friends",
    ],
    tags: ["strategy", "mindset", "practice"],
    helpful: 2847,
    examOrDomain: "JEE Advanced",
  },
  {
    id: "nk-neet",
    category: "exam-topper",
    name: "Neha Kapoor",
    title: "NEET Topper",
    credentials: "AIR 28 · NEET 2023",
    initials: "NK",
    accent: "from-emerald-400/25 to-teal-500/10",
    headline: "Biology mastery + NCERT line precision created the score jump",
    story:
      "I treated NCERT as the exam language. Strategy was diagram recall, assertion-reason drills, and calm mock review — not panic volume.",
    resultStrategy: [
      "NCERT line-by-line for Bio with self-made one-pagers",
      "Physics: formula sheet + 30 timed numericals alternate days",
      "Chemistry: inorganic tables revised every 48 hours",
      "Mock review same day — never stack unreviewed papers",
    ],
    weeklyBlueprint: [
      "Morning Bio diagrams",
      "Afternoon Chem/Phys problem sets",
      "Night: flash recall only (no new heavy topics late)",
    ],
    avoid: [
      "Ignoring NCERT examples",
      "Overdoing reference books too early",
      "Leaving mock analysis for ‘later’",
    ],
    tags: ["strategy", "routine", "practice"],
    helpful: 1980,
    examOrDomain: "NEET",
  },
  {
    id: "ps-boards",
    category: "exam-topper",
    name: "Priya Singh",
    title: "Board Topper",
    credentials: "99.2% · CBSE 2023",
    initials: "PS",
    accent: "from-fuchsia-400/25 to-pink-500/10",
    headline: "Presentation + concept clarity beat last-minute cramming",
    story:
      "Boards reward clarity. My strategy was answer structure, previous-year wording, and finishing the syllabus early enough to revise thrice.",
    resultStrategy: [
      "Write one full answer daily in exam format",
      "PYQ theme map per chapter",
      "Three full syllabus revisions with shrinking notes",
      "Sleep and handwriting stamina in the last 21 days",
    ],
    weeklyBlueprint: [
      "2 subjects/day deep",
      "One presentation drill evening",
      "Sunday: sample paper timed",
    ],
    avoid: [
      "Only MCQ practice for boards",
      "Skipping diagrams/labels",
      "New topics in final week",
    ],
    tags: ["strategy", "routine", "mindset"],
    helpful: 1320,
    examOrDomain: "CBSE Boards",
  },
  {
    id: "ar-upsc",
    category: "exam-topper",
    name: "Arjun Reddy",
    title: "UPSC CSE Topper",
    credentials: "AIR 45 · UPSC CSE 2022",
    initials: "AR",
    accent: "from-rose-400/25 to-orange-500/10",
    headline: "Notes that shrink every month beat notes that only grow",
    story:
      "UPSC is a retention + judgment exam. My edge was iterative notes, answer writing under timer, and current affairs linked to static syllabus — not endless newspaper reading.",
    resultStrategy: [
      "One timed answer daily from day one of serious prep",
      "Monthly note compression: 100 pages → 40 → 15",
      "Map every current event to a GS paper topic",
      "Full mock + review same weekend — never skip analysis",
    ],
    weeklyBlueprint: [
      "Mon–Fri: static + CA linkage",
      "Sat: essay / ethics practice",
      "Sun: mock GS or optional deep dive",
    ],
    avoid: [
      "Collecting PDFs without revision cycles",
      "Ignoring answer structure until ‘later’",
      "Burnout from 14-hour low-focus days",
    ],
    tags: ["strategy", "routine", "practice"],
    helpful: 2210,
    examOrDomain: "UPSC CSE",
  },

  // ── Industry Experts (Explore Industries) ───────────────────────────
  {
    id: "rm-industrial",
    category: "industrial-expert",
    name: "Rajesh Menon",
    title: "Industry 4.0 Expert",
    credentials: "Automation & IoT · Plant digitalization",
    initials: "RM",
    accent: "from-teal-400/25 to-emerald-600/10",
    headline: "Factories hire problem solvers who speak both machines and data",
    story:
      "Industry advice for learners: combine mechanical/electrical fundamentals with data literacy. The path that gets roles is project proof on real process pain — downtime, quality, energy.",
    resultStrategy: [
      "Pick one plant problem (energy, downtime, quality) and propose a sensor + dashboard fix",
      "Learn PLC basics + one cloud IoT path",
      "Safety and standards awareness early",
      "Internship storytelling: problem → action → measured impact",
    ],
    weeklyBlueprint: [
      "Fundamentals block",
      "Tooling lab (PLC/IoT)",
      "Case study from industry news",
      "Portfolio update",
    ],
    avoid: [
      "Buzzwords without a working demo",
      "Ignoring shop-floor constraints",
      "Certificates with zero process context",
    ],
    tags: ["career", "skills", "strategy"],
    helpful: 1560,
    examOrDomain: "Manufacturing · Automation · IoT",
  },
  {
    id: "lt-energy",
    category: "industrial-expert",
    name: "Lara Thompson",
    title: "Energy Systems Expert",
    credentials: "Grid & storage engineer · Clean energy",
    initials: "LT",
    accent: "from-lime-400/20 to-emerald-500/10",
    headline: "Energy careers reward math + systems + clear trade-off thinking",
    story:
      "Industry mentors who advance fastest blend physics/math strength with real grid/storage case studies and clear communication of constraints.",
    resultStrategy: [
      "Strengthen power basics and unit fluency",
      "Model a simple home/campus energy balance spreadsheet",
      "Read one technical + one policy brief monthly",
      "Present findings in one slide — clarity is a skill",
    ],
    weeklyBlueprint: [
      "Concept + numericals",
      "Spreadsheet model",
      "Case reading",
      "Short presentation",
    ],
    avoid: [
      "Only activism without technical depth",
      "Skipping units and estimation practice",
      "Waiting for ‘perfect’ internship before building projects",
    ],
    tags: ["career", "skills", "practice"],
    helpful: 1105,
    examOrDomain: "Energy · Sustainability · Industry",
  },
  {
    id: "dr-ml",
    category: "industrial-expert",
    name: "Dr. Meera Iyer",
    title: "AI & Software Industry Expert",
    credentials: "AI/ML lead · 12 yrs industry + teaching",
    initials: "MI",
    accent: "from-violet-400/25 to-indigo-500/10",
    headline: "Learn by shipping tiny projects — industry cares about proof",
    story:
      "In IT/AI industry tracks, people who get roles build weekly demos. Theory sticks when it survives a real mini-product — not a certificate pile.",
    resultStrategy: [
      "One micro-project every week tied to the exact concept taught",
      "Explain model intuition before touching libraries",
      "Keep a failure journal — bugs teach faster than perfect notebooks",
      "Pair math foundations with applied labs",
    ],
    weeklyBlueprint: [
      "2 concept sessions",
      "1 lab build",
      "1 review + portfolio note",
      "Weekend: improve previous project",
    ],
    avoid: [
      "Tutorial hopping without finishing",
      "Skipping math ‘because tools exist’",
      "Portfolio with zero deployed demos",
    ],
    tags: ["skills", "career", "practice"],
    helpful: 1644,
    examOrDomain: "IT & AI · Software · Data",
  },
  {
    id: "vk-robotics",
    category: "industrial-expert",
    name: "Vikram Kulkarni",
    title: "Robotics & Embedded Expert",
    credentials: "Robotics industry educator · Automation mentor",
    initials: "VK",
    accent: "from-orange-400/25 to-amber-500/10",
    headline: "Sensors → control → code — learn the industrial stack in that order",
    story:
      "Industry learners jump to code and get stuck. Expert advice: physical intuition first, then control loops, then software — the order factories actually use.",
    resultStrategy: [
      "Breadboard labs before simulation-only learning",
      "Master PID intuition with one motor task",
      "Version every build — photos + what broke",
      "Compete in one mini-challenge per quarter",
    ],
    weeklyBlueprint: [
      "Hardware lab",
      "Control theory micro-lesson",
      "Code integration",
      "Demo day Friday",
    ],
    avoid: [
      "Buying kits without finishing first project",
      "Copy-paste sketches blindly",
      "Ignoring safety and power basics",
    ],
    tags: ["skills", "practice", "strategy"],
    helpful: 970,
    examOrDomain: "Robotics · Embedded · Electronics",
  },
  {
    id: "an-health",
    category: "industrial-expert",
    name: "Dr. Anika Nair",
    title: "Healthcare Tech Expert",
    credentials: "Clinical informatics · MedTech product",
    initials: "AN",
    accent: "from-pink-400/25 to-rose-500/10",
    headline: "Healthcare industry rewards ethics + domain language + careful systems",
    story:
      "Industry advice: don’t treat health like generic software. Learn clinical workflows, privacy, and evidence — then build tools that fit real care settings.",
    resultStrategy: [
      "Learn one care pathway end-to-end (admission → discharge)",
      "Privacy / consent basics before any patient-data project",
      "Shadow or interview one clinician (even 30 min)",
      "Ship a non-clinical prototype first, then add clinical rigor",
    ],
    weeklyBlueprint: [
      "Domain reading",
      "Workflow map",
      "Prototype slice",
      "Ethics + safety checklist",
    ],
    avoid: [
      "Ignoring regulation and consent",
      "Building for ‘patients’ without workflow reality",
      "Overclaiming medical outcomes",
    ],
    tags: ["career", "skills", "mindset"],
    helpful: 1288,
    examOrDomain: "Healthcare · MedTech · Bio",
  },

  // ── Space Economy Experts ───────────────────────────────────────────
  {
    id: "sc-space",
    category: "space-expert",
    name: "Dr. Sana Chatterjee",
    title: "Space Systems Expert",
    credentials: "Aerospace engineer · Satellite subsystems",
    initials: "SC",
    accent: "from-indigo-400/25 to-blue-600/10",
    headline: "Systems thinking wins — every subsystem trades with another",
    story:
      "Space Economy work rewards people who understand constraints: mass, power, thermal, reliability. Guidance: think in interfaces, not isolated rocket nostalgia.",
    resultStrategy: [
      "Learn one spacecraft bus diagram end-to-end",
      "Practice trade-off writing: mass vs power vs cost",
      "Follow real mission status reports monthly",
      "Build a small cubesat concept report with clear requirements",
    ],
    weeklyBlueprint: [
      "Concept reading",
      "Systems sketch",
      "Constraint exercise",
      "Peer review of trade-offs",
    ],
    avoid: [
      "Only rocket nostalgia without engineering basics",
      "Ignoring reliability / testing mindset",
      "Vague ‘I love space’ goals with no skill path",
    ],
    tags: ["career", "skills", "mindset"],
    helpful: 1422,
    examOrDomain: "Space Technology · Satellites",
  },
  {
    id: "jo-orbital",
    category: "space-expert",
    name: "Julian Ortiz",
    title: "Space Economy Strategist",
    credentials: "NewSpace markets · Launch & downstream services",
    initials: "JO",
    accent: "from-cyan-400/25 to-sky-600/10",
    headline: "Space Economy = technology × customers × regulation — learn all three",
    story:
      "Advice from the commercial side: orbital tech alone isn’t a career plan. Map who pays (gov, defense, telecom, climate, logistics) and what problem you solve in the value chain.",
    resultStrategy: [
      "Pick one segment: launch, sats, ground, data, or habitats — go deep",
      "Write a one-page market note: customer, pain, competitor, your edge",
      "Track 3 real companies weekly (not just headlines)",
      "Pair technical literacy with clear business storytelling",
    ],
    weeklyBlueprint: [
      "Tech primer",
      "Market / customer brief",
      "Company case",
      "Pitch or memo practice",
    ],
    avoid: [
      "Confusing Space Economy with only astronaut dreams",
      "Ignoring ground segment and data products",
      "No customer in your project narrative",
    ],
    tags: ["career", "strategy", "skills"],
    helpful: 1190,
    examOrDomain: "Space Economy · NewSpace · Markets",
  },
  {
    id: "mk-mission",
    category: "space-expert",
    name: "Capt. Mira Khatri",
    title: "Mission Operations Expert",
    credentials: "Mission ops · Flight procedures & anomaly response",
    initials: "MK",
    accent: "from-slate-400/25 to-indigo-500/10",
    headline: "Ops careers are built on checklists, calm, and crystal communication",
    story:
      "Space Economy needs operators as much as builders. Expert guidance: procedure discipline, anomaly drills, and clear radio/team language under pressure.",
    resultStrategy: [
      "Practice writing procedures that a stranger can execute",
      "Run tabletop anomaly drills (what if power drops?)",
      "Learn basic orbital passes / ground contact windows",
      "Document every sim: what went wrong + how you recovered",
    ],
    weeklyBlueprint: [
      "Procedure writing",
      "Sim / tabletop drill",
      "Orbital / timeline literacy",
      "Debrief notes",
    ],
    avoid: [
      "Hero culture over procedure culture",
      "Skipping debriefs after sims",
      "Vague ‘mission control’ goals without ops skills",
    ],
    tags: ["skills", "mindset", "routine"],
    helpful: 980,
    examOrDomain: "Mission Ops · Ground · Space Economy",
  },
]

export const CATEGORY_META: Record<
  MentorCategory,
  { label: string; blurb: string; chip: string }
> = {
  "exam-topper": {
    label: "Exam Toppers",
    blurb: "Competitive exam strategies that produced ranks and results",
    chip: "border-amber-400/30 bg-amber-500/10 text-amber-200",
  },
  "industrial-expert": {
    label: "Industry Guidance",
    blurb: "Practical career and skill advice across Explore Industries domains",
    chip: "border-teal-400/30 bg-teal-500/10 text-teal-200",
  },
  "space-expert": {
    label: "Space Guidance",
    blurb: "Space technology, missions, and commercial space economy paths",
    chip: "border-indigo-400/30 bg-indigo-500/10 text-indigo-200",
  },
}

export const SAVED_GUIDANCE_KEY = "quantrion_toppers_saved_v1"

export function filterGuidance(
  category: MentorCategory | "all",
  query: string,
): MentorGuidance[] {
  const q = query.trim().toLowerCase()
  return MENTOR_GUIDANCE.filter((g) => {
    if (category !== "all" && g.category !== category) return false
    if (!q) return true
    const blob =
      `${g.name} ${g.title} ${g.headline} ${g.examOrDomain} ${g.tags.join(" ")}`.toLowerCase()
    return blob.includes(q)
  })
}
