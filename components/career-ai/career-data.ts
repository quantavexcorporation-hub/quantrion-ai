export type LearningSignal = {
  physics: number
  chemistry: number
  mathematics: number
  biology: number
  codingInterest: number
  designInterest: number
  hardwareInterest: number
  researchInterest: number
  examDrive: number
}

export type OfferKind = "exam" | "future-course" | "industrial"

export type CareerOffer = {
  kind: OfferKind
  title: string
  why: string
  href: string
  cta: string
  priceLabel: string
}

export type CareerRole = {
  id: string
  title: string
  field: string
  matchScore: number
  summary: string
  whyYou: string
  skillsToBuild: string[]
  rolesToPursue: string[]
  salaryRange: string
  growth: string
  offers: CareerOffer[]
}

export const DEFAULT_SIGNALS: LearningSignal = {
  physics: 78,
  chemistry: 62,
  mathematics: 85,
  biology: 48,
  codingInterest: 72,
  designInterest: 40,
  hardwareInterest: 55,
  researchInterest: 60,
  examDrive: 80,
}

export const SIGNAL_FIELDS: {
  key: keyof LearningSignal
  label: string
  hint: string
}[] = [
  { key: "physics", label: "Physics strength", hint: "Past learning & mock accuracy" },
  { key: "chemistry", label: "Chemistry strength", hint: "Past learning & retention" },
  { key: "mathematics", label: "Mathematics strength", hint: "Problem-solving history" },
  { key: "biology", label: "Biology strength", hint: "NEET / life-science track" },
  { key: "codingInterest", label: "Coding / AI interest", hint: "Projects & QuickLearn signals" },
  { key: "designInterest", label: "Design / product interest", hint: "Creative & UX inclination" },
  { key: "hardwareInterest", label: "Hardware / robotics interest", hint: "Labs & makerspace signals" },
  { key: "researchInterest", label: "Research curiosity", hint: "Depth over speed preference" },
  { key: "examDrive", label: "Exam ambition", hint: "JEE / NEET / Boards intensity" },
]

function clamp(n: number) {
  return Math.max(0, Math.min(100, Math.round(n)))
}

export function computeCareerMatches(s: LearningSignal): CareerRole[] {
  const roles: Array<CareerRole & { raw: number }> = [
    {
      id: "software-ai",
      title: "Software / AI Engineer",
      field: "Technology",
      raw:
        s.mathematics * 0.28 +
        s.codingInterest * 0.38 +
        s.physics * 0.12 +
        s.researchInterest * 0.12 +
        (100 - s.biology) * 0.05,
      matchScore: 0,
      summary: "Build products, models, and systems — high leverage from math + coding history.",
      whyYou:
        "Your learning pattern shows strong quantitative skill and coding pull — ideal for AI/software paths after (or alongside) competitive exams.",
      skillsToBuild: ["DSA", "Python/JS", "ML intuition", "System design basics", "Portfolio projects"],
      rolesToPursue: [
        "SDE Intern → SDE",
        "ML Engineer",
        "Data Scientist",
        "AI Product Engineer",
      ],
      salaryRange: "12–45+ LPA (exp. dependent)",
      growth: "Very high",
      offers: [
        {
          kind: "future-course",
          title: "Explore Industries · AI & Software Track",
          why: "Converts your math strength into job-ready AI/software skills.",
          href: "/q2",
          cta: "Explore Industries",
          priceLabel: "Career track",
        },
        {
          kind: "exam",
          title: "Exams · JEE / Advanced foundation",
          why: "Keep exam doors open while building tech depth — many top SDEs came via JEE.",
          href: "/q1",
          cta: "Open Exams hub",
          priceLabel: "Exam pathway",
        },
        {
          kind: "industrial",
          title: "Industrial · Applied AI / Automation",
          why: "Industry projects that pair algorithms with real process problems.",
          href: "/qrion",
          cta: "View Industrial Tech",
          priceLabel: "Industry path",
        },
      ],
    },
    {
      id: "electronics-robotics",
      title: "Electronics / Robotics Engineer",
      field: "Hardware · Embedded",
      raw:
        s.physics * 0.32 +
        s.mathematics * 0.22 +
        s.hardwareInterest * 0.34 +
        s.codingInterest * 0.12,
      matchScore: 0,
      summary: "Circuits, control, and intelligent machines — built on Physics + hardware curiosity.",
      whyYou:
        "Physics mastery plus hardware interest suggests embedded, robotics, and electronics roles will feel natural.",
      skillsToBuild: ["Circuits", "Microcontrollers", "Control systems", "C/C++", "CAD basics"],
      rolesToPursue: [
        "Embedded Engineer",
        "Robotics Engineer",
        "Electronics Design Engineer",
        "Automation Engineer",
      ],
      salaryRange: "8–35 LPA",
      growth: "High",
      offers: [
        {
          kind: "industrial",
          title: "Industrial · Robotics & Automation",
          why: "Direct bridge from Physics learning to Industry 4.0 roles.",
          href: "/qrion",
          cta: "Explore Industrial courses",
          priceLabel: "Industry path",
        },
        {
          kind: "future-course",
          title: "Explore Industries · Robotics track",
          why: "Structured labs to turn interest into portfolio demos.",
          href: "/q2",
          cta: "See robotics courses",
          priceLabel: "Skill track",
        },
        {
          kind: "exam",
          title: "Exams · Engineering entrance prep",
          why: "Strong Physics/Math history pairs with JEE/engineering college routes.",
          href: "/q1",
          cta: "Strengthen exam path",
          priceLabel: "Exam pathway",
        },
      ],
    },
    {
      id: "research-physics",
      title: "Research Scientist / Physicist track",
      field: "Research · Academia · R&D",
      raw:
        s.physics * 0.34 +
        s.mathematics * 0.28 +
        s.researchInterest * 0.3 +
        s.examDrive * 0.08,
      matchScore: 0,
      summary: "Deep problems, theory, and discovery — for students who love depth over shortcuts.",
      whyYou:
        "High Physics/Math with research curiosity points to R&D, academia, and advanced science roles.",
      skillsToBuild: [
        "Mathematical methods",
        "Scientific writing",
        "Simulation tools",
        "Research reading",
        "Olympiad-style depth",
      ],
      rolesToPursue: [
        "Research Intern",
        "Scientific Officer (long path)",
        "R&D Engineer",
        "PhD track",
      ],
      salaryRange: "Varies · long-horizon upside",
      growth: "Specialized high",
      offers: [
        {
          kind: "exam",
          title: "Exams · JEE Advanced / Olympiad depth",
          why: "Exam rigor trains the exact thinking research roles demand.",
          href: "/q1",
          cta: "Train with Exams",
          priceLabel: "Exam pathway",
        },
        {
          kind: "future-course",
          title: "Explore Industries · Scientific computing",
          why: "Adds computational research skills employers and labs want.",
          href: "/q2",
          cta: "Browse science-tech courses",
          priceLabel: "Skill track",
        },
        {
          kind: "industrial",
          title: "Industrial · Space & advanced systems",
          why: "Space/industrial R&D absorbs strong physics profiles.",
          href: "/qrion",
          cta: "Explore Space / Industry",
          priceLabel: "Industry path",
        },
      ],
    },
    {
      id: "biotech-health",
      title: "Biotech / Healthcare / Medicine pathway",
      field: "Life Sciences",
      raw:
        s.biology * 0.4 +
        s.chemistry * 0.28 +
        s.researchInterest * 0.18 +
        s.examDrive * 0.14,
      matchScore: 0,
      summary: "Medicine, biotech, and health-tech — powered by Bio + Chem learning history.",
      whyYou:
        "Biology and Chemistry signals suggest NEET/medicine or biotech R&D will compound your past study.",
      skillsToBuild: [
        "NCERT-level mastery",
        "Lab literacy",
        "Bioinformatics intro",
        "Patient/problem empathy",
        "Research methods",
      ],
      rolesToPursue: [
        "MBBS / clinical track",
        "Biotech analyst",
        "Clinical research associate",
        "Health-tech roles",
      ],
      salaryRange: "Clinical · wide range | Biotech 6–30 LPA",
      growth: "Stable to high",
      offers: [
        {
          kind: "exam",
          title: "Exams · NEET / medical prep",
          why: "Aligns directly with your Bio/Chem learning history.",
          href: "/q1",
          cta: "Open NEET / Exams",
          priceLabel: "Exam pathway",
        },
        {
          kind: "future-course",
          title: "Explore Industries · Biotech & health-tech",
          why: "Optional parallel skills if you want tech + biology careers.",
          href: "/q2",
          cta: "Explore biotech courses",
          priceLabel: "Skill track",
        },
        {
          kind: "industrial",
          title: "Industrial · MedTech / bio-industry",
          why: "Industrial health and device pathways for applied science students.",
          href: "/qrion",
          cta: "View industrial options",
          priceLabel: "Industry path",
        },
      ],
    },
    {
      id: "product-design",
      title: "Product Designer / UX Engineer",
      field: "Design · Product",
      raw:
        s.designInterest * 0.42 +
        s.codingInterest * 0.2 +
        s.mathematics * 0.12 +
        s.researchInterest * 0.14 +
        s.physics * 0.08,
      matchScore: 0,
      summary: "Shape how people use technology — case studies and prototypes matter most.",
      whyYou:
        "Design interest plus structured thinking can become a product/UX career with the right portfolio courses.",
      skillsToBuild: ["UX research", "Figma", "Prototyping", "Case studies", "Basic front-end"],
      rolesToPursue: ["UX Designer", "Product Designer", "Design Intern", "UI Engineer"],
      salaryRange: "8–40 LPA",
      growth: "High",
      offers: [
        {
          kind: "future-course",
          title: "Explore Industries · Product & Design",
          why: "Fastest way to turn design interest into hireable case studies.",
          href: "/q2",
          cta: "Explore design courses",
          priceLabel: "Skill track",
        },
        {
          kind: "industrial",
          title: "Industrial · Product systems exposure",
          why: "Industrial context improves design decisions for real constraints.",
          href: "/qrion",
          cta: "See industrial context",
          priceLabel: "Industry path",
        },
        {
          kind: "exam",
          title: "Exams · Keep academic options open",
          why: "Strong academics still help design-adjacent tech roles and colleges.",
          href: "/q1",
          cta: "Maintain exam edge",
          priceLabel: "Exam pathway",
        },
      ],
    },
    {
      id: "space-industrial",
      title: "Space / Industrial Systems Engineer",
      field: "Aerospace · Industry 4.0",
      raw:
        s.physics * 0.3 +
        s.mathematics * 0.24 +
        s.hardwareInterest * 0.22 +
        s.researchInterest * 0.14 +
        s.codingInterest * 0.1,
      matchScore: 0,
      summary: "Satellites, automation, energy, and complex systems — for constraint-driven thinkers.",
      whyYou:
        "Physics + math + systems curiosity maps well to space and industrial technology careers.",
      skillsToBuild: [
        "Systems engineering",
        "Control & instrumentation",
        "CAD / simulation",
        "Data for industry",
        "Technical communication",
      ],
      rolesToPursue: [
        "Systems Engineer",
        "Aerospace Intern",
        "Automation Engineer",
        "Energy systems analyst",
      ],
      salaryRange: "10–40 LPA",
      growth: "High (niche)",
      offers: [
        {
          kind: "industrial",
          title: "Industrial & Space · Qrion pathways",
          why: "Primary recommendation from your physics/systems profile.",
          href: "/qrion",
          cta: "Enter Industrial & Space",
          priceLabel: "Industry path",
        },
        {
          kind: "future-course",
          title: "Explore Industries · Systems & simulation",
          why: "Adds modern tooling that industrial hiring managers expect.",
          href: "/q2",
          cta: "Complement with Explore Industries",
          priceLabel: "Skill track",
        },
        {
          kind: "exam",
          title: "Exams · Engineering entrance excellence",
          why: "Top colleges remain a strong gateway into space/industrial orgs.",
          href: "/q1",
          cta: "Boost exam readiness",
          priceLabel: "Exam pathway",
        },
      ],
    },
    {
      id: "chemical-process",
      title: "Chemical / Process Engineer",
      field: "Process · Materials · Energy",
      raw:
        s.chemistry * 0.4 +
        s.mathematics * 0.22 +
        s.physics * 0.18 +
        s.hardwareInterest * 0.1 +
        s.examDrive * 0.1,
      matchScore: 0,
      summary: "Plants, materials, and process optimization — Chemistry learning becomes industry skill.",
      whyYou:
        "Chemistry strength with solid math/physics supports process and chemical engineering pathways.",
      skillsToBuild: [
        "Thermodynamics / transport",
        "Process safety",
        "Plant intuition",
        "Data for process control",
        "Internship storytelling",
      ],
      rolesToPursue: [
        "Process Engineer",
        "Plant Intern",
        "Materials Engineer",
        "Energy process analyst",
      ],
      salaryRange: "7–30 LPA",
      growth: "Steady",
      offers: [
        {
          kind: "industrial",
          title: "Industrial · Process & energy systems",
          why: "Turns Chemistry history into industrial role readiness.",
          href: "/qrion",
          cta: "Explore industrial courses",
          priceLabel: "Industry path",
        },
        {
          kind: "exam",
          title: "Exams · Engineering / chem pathway",
          why: "Exam performance opens the best process-engineering colleges.",
          href: "/q1",
          cta: "Strengthen exams",
          priceLabel: "Exam pathway",
        },
        {
          kind: "future-course",
          title: "Explore Industries · Applied chem-tech",
          why: "Modern tools and industry case projects for differentiation.",
          href: "/q2",
          cta: "Browse related courses",
          priceLabel: "Skill track",
        },
      ],
    },
  ]

  return roles
    .map((r) => ({ ...r, matchScore: clamp(r.raw) }))
    .sort((a, b) => b.matchScore - a.matchScore)
    .map(({ raw: _raw, ...rest }) => rest)
}

export function topOffers(roles: CareerRole[], limit = 6): CareerOffer[] {
  const seen = new Set<string>()
  const out: CareerOffer[] = []
  for (const role of roles.slice(0, 3)) {
    for (const offer of role.offers) {
      const key = `${offer.kind}:${offer.href}:${offer.title}`
      if (seen.has(key)) continue
      seen.add(key)
      out.push(offer)
      if (out.length >= limit) return out
    }
  }
  return out
}

export const PROFILE_KEY = "quantrion_career_signals_v1"
