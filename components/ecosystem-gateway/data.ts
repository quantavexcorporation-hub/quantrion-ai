export type DivisionId = "q1" | "q2" | "qrion"

export type DivisionCardData = {
  id: DivisionId
  code: string
  title: string
  tagline: string
  description: string
  cta: string
  href: string
  accent: string
  accentSoft: string
  stats: { label: string; value: string }[]
}

export type DivisionLandingData = {
  id: DivisionId
  code: string
  title: string
  tagline: string
  heroBody: string
  accent: string
  searchPlaceholder?: string
  featured: { label: string; detail: string }[]
  sections: { title: string; body: string }[]
  pathways: string[]
  timeline: { phase: string; title: string; body: string }[]
}

export const divisionCards: DivisionCardData[] = [
  {
    id: "q1",
    code: "Competitive Exams",
    title: "AI Global Exam Intelligence Engine",
    tagline: "Intelligence at Scale.",
    description:
      "Hyper-personalized AI learning for competitive exams, adaptive assessments, intelligent study systems, and predictive performance analytics.",
    cta: "Explore Competitive Exams",
    href: "/q1",
    accent: "hsl(217 91% 60%)",
    accentSoft: "rgba(59,130,246,0.18)",
    stats: [
      { label: "Exams", value: "150+" },
      { label: "Regions", value: "Global" },
      { label: "Adaptive", value: "Live" },
      { label: "Knowledge DNA", value: "On" },
    ],
  },
  {
    id: "q2",
    code: "Explore Industries",
    title: "Explore Industries Division",
    tagline: "Every Industry. Every Skill. One Curriculum.",
    description:
      "20 industry domains in one atlas — healthcare, IT & AI, manufacturing, finance, biotech, defense, and more.",
    cta: "Explore Industries",
    href: "/q2",
    accent: "hsl(262 83% 68%)",
    accentSoft: "rgba(167,139,250,0.18)",
    stats: [
      { label: "Domains", value: "19" },
      { label: "Courses", value: "150+" },
      { label: "Industries", value: "All" },
      { label: "Tracks", value: "Open" },
    ],
  },
  {
    id: "qrion",
    code: "Space Technology",
    title: "Space Technology Division",
    tagline: "Engineering Humanity's Future Beyond Earth.",
    description:
      "From rockets and satellites to orbital mechanics, lunar programs, and the space economy — the complete space technology curriculum.",
    cta: "Explore Space Technology",
    href: "/qrion",
    accent: "hsl(160 84% 42%)",
    accentSoft: "rgba(16,185,129,0.16)",
    stats: [
      { label: "Rockets", value: "Live" },
      { label: "Satellites", value: "Orbit" },
      { label: "Mars", value: "Track" },
      { label: "Missions", value: "Open" },
    ],
  },
]

export const featuredExams = [
  "JEE",
  "NEET",
  "UPSC",
  "CAT",
  "GATE",
  "GRE",
  "GMAT",
  "IELTS",
  "TOEFL",
  "SAT",
]

export const q2Topics = [
  "Artificial Intelligence",
  "Quantum Computing",
  "Cybersecurity",
  "Blockchain",
  "Robotics",
  "AGI",
  "Neuromorphic Computing",
  "Cloud",
  "Space AI",
]

export const qrionSectors = [
  "Robotics",
  "Automation",
  "Manufacturing",
  "Embedded AI",
  "Aerospace",
  "Defense",
  "Industrial IoT",
  "Smart Factories",
]

export const landingById: Record<DivisionId, DivisionLandingData> = {
  q1: {
    id: "q1",
    code: "Competitive Exams",
    title: "AI Global Exam Intelligence Engine",
    tagline: "Intelligence at Scale.",
    heroBody:
      "Prepare for the world's most reputed competitive exams — JEE, NEET, UPSC, SAT, GRE, IELTS, CFA, USMLE, Gaokao, olympiads, and 150+ more — with adaptive intelligence built for annual high-stakes cohorts.",
    accent: "hsl(217 91% 60%)",
    searchPlaceholder: "Search — JEE, SAT, IELTS, CFA, USMLE, Gaokao…",
    featured: featuredExams.map((e) => ({
      label: e,
      detail: "AI-aligned pathway",
    })),
    sections: [
      { title: "Global Exam Atlas", body: "India, US, UK, Asia, language, finance, medical licensing, and olympiad pathways." },
      { title: "AI Learning", body: "Personalized sequences that adapt to pace, retention, and exam goals." },
      { title: "Study Material", body: "Structured notes, PYQs, and concept triggers synced to Progress IQ." },
      { title: "Smart Library", body: "Intelligence Books with explain, quiz, and visualize inside every chapter." },
      { title: "Mock Intelligence", body: "Calibrated mocks with rank prediction and weakness mapping." },
      { title: "Performance IQ", body: "Readiness signals across accuracy, speed, and consistency." },
      { title: "Knowledge DNA", body: "Your evolving academic genome — strengths, gaps, and growth vectors." },
      { title: "Exam Intelligence", body: "Syllabus graphs, weightage models, and strategy recommendations." },
      { title: "Adaptive Learning", body: "Closed-loop practice that updates after every session." },
      { title: "Success Stories", body: "Verified journeys from consistency to competitive outcomes." },
    ],
    pathways: ["Browse Global Exams", "Take Adaptive Mock", "Open Smart Library", "View Progress IQ"],
    timeline: [
      { phase: "01", title: "Diagnose", body: "Map concepts and retention via Knowledge DNA." },
      { phase: "02", title: "Adapt", body: "Generate the next learning loop with AI tutors." },
      { phase: "03", title: "Validate", body: "Prove readiness through mock intelligence." },
      { phase: "04", title: "Predict", body: "Forecast score bands and focus windows." },
    ],
  },
  q2: {
    id: "q2",
    code: "Explore Industries",
    title: "Explore Industries",
    tagline: "Every Industry. Every Skill. One Curriculum.",
    heroBody:
      "Explore industry domains — healthcare, IT & AI, semiconductors, manufacturing, finance, biotech, defense, and more — in one elite course atlas.",
    accent: "hsl(262 83% 68%)",
    searchPlaceholder: "Search healthcare, AI, robotics, finance, law…",
    featured: [
      "Healthcare & Medical",
      "IT & AI",
      "Electronics",
      "Manufacturing",
      "Energy",
      "Automotive",
      "FinTech",
      "Biotechnology",
      "Defense",
    ].map((s) => ({ label: s, detail: "Industry track" })),
    sections: [
      { title: "Healthcare Tracks", body: "Medical, nursing, hospital systems, and medical AI." },
      { title: "IT & AI Stack", body: "Programming through generative AI, cloud, and quantum." },
      { title: "Engineering Domains", body: "Mechanical, civil, electronics, and automation pathways." },
      { title: "Energy & Mobility", body: "Solar, hydrogen, EVs, and autonomous systems." },
      { title: "Business & Finance", body: "MBA essentials, FinTech, markets, and product ops." },
      { title: "Law & Policy", body: "Corporate, cyber, IP, and AI regulation." },
      { title: "Life Sciences", body: "Biotech, genetics, CRISPR, and biomanufacturing." },
      { title: "Creative Industries", body: "Design, animation, games, AR/VR, and content." },
      { title: "Automation Plants", body: "PLC, SCADA, IIoT, and digital twin factories." },
      { title: "Defense & Security", body: "Drones, military AI, and national cybersecurity." },
    ],
    pathways: ["Browse All Domains", "IT & AI", "Healthcare", "Manufacturing"],
    timeline: [
      { phase: "01", title: "Explore", body: "Pick an industry domain that matches your ambition." },
      { phase: "02", title: "Specialize", body: "Deep modules from foundations to advanced practice." },
      { phase: "03", title: "Build", body: "Projects, labs, and career-ready skill signals." },
      { phase: "04", title: "Launch", body: "Move into roles across industry and deep tech." },
    ],
  },
  qrion: {
    id: "qrion",
    code: "Space Technology",
    title: "Space Technology",
    tagline: "Engineering Humanity's Future Beyond Earth.",
    heroBody:
      "Master the complete space curriculum — rockets, satellites, orbital mechanics, space science, lunar and Mars programs, quantum links, and the space economy.",
    accent: "hsl(160 84% 42%)",
    searchPlaceholder: "Search rockets, satellites, Mars, orbitals…",
    featured: [
      "Rockets",
      "Satellites",
      "Orbital Mechanics",
      "Space Science",
      "Moon Programs",
      "Mars Programs",
      "Space Economy",
      "Space Careers",
    ].map((s) => ({ label: s, detail: "Space track" })),
    sections: [
      { title: "Rocket Systems", body: "Propulsion, structures, reuse, and launch operations." },
      { title: "Satellite Engineering", body: "Design, payloads, power, thermal, and deployment." },
      { title: "Orbital Mechanics", body: "Transfers, attitude control, rendezvous, and trajectories." },
      { title: "Space Science", body: "Astronomy, planetary science, and deep-space environments." },
      { title: "Mission Programs", body: "Moon, Mars, stations, and exploration architectures." },
      { title: "Space Communications", body: "RF, laser links, and deep-space networks." },
      { title: "Space AI & Robotics", body: "Autonomy, rovers, and intelligent mission planning." },
      { title: "Space Economy", body: "Commercial models, policy, and NewSpace ventures." },
      { title: "Human Spaceflight", body: "Life support, medicine, and radiation protection." },
      { title: "Career Pathways", body: "Agency, NewSpace, and research-ready skill maps." },
    ],
    pathways: ["Browse Courses", "Rocket Track", "Satellite Track", "Mars Programs"],
    timeline: [
      { phase: "01", title: "Foundation", body: "Space literacy across physics and systems." },
      { phase: "02", title: "Specialization", body: "Deep tracks in rockets, sats, or missions." },
      { phase: "03", title: "Simulate", body: "Mission cases, labs, and trajectory studies." },
      { phase: "04", title: "Launch", body: "Career and research pathways beyond Earth." },
    ],
  },
}
