export type EmploymentDomain = "industrial" | "personal-development" | "space"

export type JobListing = {
  id: string
  domain: EmploymentDomain
  title: string
  company: string
  location: string
  mode: "Remote" | "Hybrid" | "On-site"
  salary: string
  type: "Full-time" | "Internship" | "Contract"
  level: "Intern" | "Junior" | "Mid" | "Senior"
  skills: string[]
  preferred: string[]
  summary: string
  responsibilities: string[]
  requirements: string[]
}

export type SeekerProfile = {
  headline: string
  location: string
  level: "Intern" | "Junior" | "Mid" | "Senior"
  mode: "Remote" | "Hybrid" | "On-site" | "Any"
  skills: string
  goals: string
}

export type MatchBreakdown = {
  skills: number
  experience: number
  location: number
  goals: number
  overall: number
  strengths: string[]
  gaps: string[]
  label: "Strong match" | "Good match" | "Partial match" | "Weak match"
}

export type ApplicationStatus =
  | "Saved"
  | "Applied"
  | "Assessment"
  | "Interview"
  | "Offer"
  | "Rejected"

export const PROFILE_STORAGE_KEY = "quantrion_employment_profile_v1"
export const TRACKER_STORAGE_KEY = "quantrion_employment_tracker_v1"

export const DEFAULT_PROFILE: SeekerProfile = {
  headline: "Aspiring engineer building career-ready skills",
  location: "India · Open to remote",
  level: "Junior",
  mode: "Any",
  skills: "JavaScript, React, Python, problem solving, communication",
  goals: "Grow into a high-impact role with strong learning culture",
}

export const DOMAIN_COPY: Record<
  EmploymentDomain,
  { title: string; subtitle: string; accentHint: string }
> = {
  industrial: {
    title: "AI Job Discovery · Explore Industries",
    subtitle:
      "Match roles across IT, AI, manufacturing, robotics, fintech, healthcare tech, and emerging compute — grounded in your skills, not keyword spam.",
    accentHint: "industrial",
  },
  "personal-development": {
    title: "AI Job Discovery · Future of Industries",
    subtitle:
      "Match roles across AI, deep tech, space economy adjacency, and high-agency human skills — with explainable scores grounded in your profile.",
    accentHint: "future",
  },
  space: {
    title: "AI Job Discovery · Space Technology Careers",
    subtitle:
      "Discover aerospace, satellite, propulsion, mission ops, and NewSpace roles with explainable match scores tied to your space curriculum path.",
    accentHint: "space",
  },
}

export const JOBS: JobListing[] = [
  // Industrial
  {
    id: "ind-fe-1",
    domain: "industrial",
    title: "Frontend Engineer",
    company: "Nimbus Labs",
    location: "Bengaluru / Remote",
    mode: "Hybrid",
    salary: "₹12–18 LPA",
    type: "Full-time",
    level: "Junior",
    skills: ["JavaScript", "React", "TypeScript", "CSS", "Git"],
    preferred: ["Next.js", "Testing"],
    summary: "Build product UI for an industrial analytics SaaS used by factory teams.",
    responsibilities: ["Ship React features", "Collaborate with design", "Improve UX performance"],
    requirements: ["1–2 years JS/React", "Strong fundamentals", "Clear communication"],
  },
  {
    id: "ind-ml-1",
    domain: "industrial",
    title: "Machine Learning Engineer",
    company: "ForgeAI",
    location: "Hyderabad",
    mode: "On-site",
    salary: "₹18–28 LPA",
    type: "Full-time",
    level: "Mid",
    skills: ["Python", "Machine Learning", "PyTorch", "SQL", "Data Science"],
    preferred: ["MLOps", "AWS"],
    summary: "Train and deploy models for predictive maintenance on industrial equipment.",
    responsibilities: ["Model training", "Evaluation pipelines", "Production handoff"],
    requirements: ["Solid ML fundamentals", "Python fluency", "Experiment tracking basics"],
  },
  {
    id: "ind-robo-1",
    domain: "industrial",
    title: "Robotics Software Intern",
    company: "CellWorks Robotics",
    location: "Pune",
    mode: "On-site",
    salary: "Stipend competitive",
    type: "Internship",
    level: "Intern",
    skills: ["Python", "C++", "ROS", "Robotics", "Linux"],
    preferred: ["Computer Vision"],
    summary: "Support robot cell simulation and perception prototypes for manufacturing lines.",
    responsibilities: ["Prototype ROS nodes", "Run simulations", "Document experiments"],
    requirements: ["Course projects in robotics", "Willingness to learn on hardware"],
  },
  {
    id: "ind-photo-1",
    domain: "industrial",
    title: "Photonic Computing Research Associate",
    company: "Lumen Compute",
    location: "Remote · India",
    mode: "Remote",
    salary: "₹10–16 LPA",
    type: "Full-time",
    level: "Junior",
    skills: ["Photonic Computing", "Physics", "Python", "Optics", "Research"],
    preferred: ["Silicon Photonics", "MATLAB"],
    summary: "Assist R&D on optical interconnect concepts and simulation studies.",
    responsibilities: ["Literature synthesis", "Simulation support", "Technical writing"],
    requirements: ["Strong physics/optics base", "Research curiosity"],
  },
  {
    id: "ind-neuro-1",
    domain: "industrial",
    title: "Neuromorphic Systems Engineer",
    company: "Synapse Edge",
    location: "Chennai / Hybrid",
    mode: "Hybrid",
    salary: "₹16–24 LPA",
    type: "Full-time",
    level: "Mid",
    skills: ["Neuromorphic Computing", "Python", "Embedded Systems", "Spiking Neural Networks"],
    preferred: ["C++", "Edge AI"],
    summary: "Build event-driven inference prototypes for low-power edge devices.",
    responsibilities: ["SNN prototyping", "Hardware bring-up support", "Benchmarks"],
    requirements: ["Embedded + ML overlap", "Systems thinking"],
  },
  {
    id: "ind-auto-1",
    domain: "industrial",
    title: "Industrial Automation Engineer",
    company: "Apex Line Systems",
    location: "Ahmedabad",
    mode: "On-site",
    salary: "₹8–14 LPA",
    type: "Full-time",
    level: "Junior",
    skills: ["PLC", "SCADA", "Industrial Automation", "Electrical", "Safety"],
    preferred: ["IIoT", "Python"],
    summary: "Commission and maintain PLC/SCADA systems for production lines.",
    responsibilities: ["PLC logic", "HMI updates", "Site commissioning"],
    requirements: ["Automation coursework or apprenticeship", "Safety awareness"],
  },
  {
    id: "ind-cloud-1",
    domain: "industrial",
    title: "Cloud DevOps Associate",
    company: "Stackyard",
    location: "Remote",
    mode: "Remote",
    salary: "₹10–15 LPA",
    type: "Full-time",
    level: "Junior",
    skills: ["Cloud Computing", "DevOps", "Linux", "Docker", "CI/CD"],
    preferred: ["AWS", "Kubernetes"],
    summary: "Own CI pipelines and cloud environments for SaaS delivery teams.",
    responsibilities: ["Pipeline maintenance", "Infra as code basics", "Incident support"],
    requirements: ["Linux comfort", "Container basics"],
  },
  {
    id: "ind-fin-1",
    domain: "industrial",
    title: "FinTech Product Analyst",
    company: "LedgerMint",
    location: "Mumbai / Hybrid",
    mode: "Hybrid",
    salary: "₹9–14 LPA",
    type: "Full-time",
    level: "Junior",
    skills: ["FinTech", "SQL", "Product Management", "Communication", "Analytics"],
    preferred: ["Financial Modeling"],
    summary: "Translate customer needs into product requirements for digital payments.",
    responsibilities: ["Requirement docs", "Stakeholder calls", "Metric reviews"],
    requirements: ["Clear writing", "Analytical curiosity"],
  },

  // Personal development
  {
    id: "pd-coach-1",
    domain: "personal-development",
    title: "Learning & Development Specialist",
    company: "Northstar Academy",
    location: "Remote · India",
    mode: "Remote",
    salary: "₹8–13 LPA",
    type: "Full-time",
    level: "Mid",
    skills: ["Communication", "Leadership", "Curriculum Design", "Coaching", "Emotional Intelligence"],
    preferred: ["Public Speaking", "Facilitation"],
    summary: "Design growth programs that help professionals build habits and leadership skills.",
    responsibilities: ["Workshop design", "Cohort facilitation", "Outcome measurement"],
    requirements: ["Strong facilitation", "Empathy + structure"],
  },
  {
    id: "pd-pm-1",
    domain: "personal-development",
    title: "Associate Product Manager",
    company: "ClarityWorks",
    location: "Gurugram",
    mode: "Hybrid",
    salary: "₹12–20 LPA",
    type: "Full-time",
    level: "Junior",
    skills: ["Product Management", "Communication", "Prioritization", "User Research", "Writing"],
    preferred: ["SQL", "Analytics"],
    summary: "Own a feature slice end-to-end with mentoring from senior PMs.",
    responsibilities: ["PRDs", "User interviews", "Launch checklists"],
    requirements: ["Clear thinking", "Bias for shipping"],
  },
  {
    id: "pd-hr-1",
    domain: "personal-development",
    title: "People Operations Associate",
    company: "Humanae",
    location: "Bengaluru",
    mode: "On-site",
    salary: "₹6–10 LPA",
    type: "Full-time",
    level: "Junior",
    skills: ["HR", "Communication", "Organization", "Emotional Intelligence", "Conflict Resolution"],
    preferred: ["Recruiting"],
    summary: "Support hiring operations and employee experience rituals.",
    responsibilities: ["Interview scheduling", "Onboarding", "People data hygiene"],
    requirements: ["High trustworthiness", "Process discipline"],
  },
  {
    id: "pd-sales-1",
    domain: "personal-development",
    title: "Business Development Representative",
    company: "OrbitReach",
    location: "Remote",
    mode: "Remote",
    salary: "₹5–9 LPA + incentives",
    type: "Full-time",
    level: "Junior",
    skills: ["Sales", "Communication", "Persuasion", "Resilience", "CRM"],
    preferred: ["English fluency", "Presentation"],
    summary: "Qualify inbound leads and book discovery calls for an edtech SaaS.",
    responsibilities: ["Outbound sequences", "Discovery calls", "CRM hygiene"],
    requirements: ["Coachable", "Consistent follow-through"],
  },
  {
    id: "pd-content-1",
    domain: "personal-development",
    title: "Career Content Strategist",
    company: "Pathwire Media",
    location: "Remote",
    mode: "Remote",
    salary: "₹7–12 LPA",
    type: "Contract",
    level: "Mid",
    skills: ["Writing", "Storytelling", "Personal Brand", "Research", "Creativity"],
    preferred: ["SEO", "Video scripting"],
    summary: "Create career-growth content that helps students navigate jobs and skills.",
    responsibilities: ["Editorial calendar", "Long-form guides", "Interview briefs"],
    requirements: ["Portfolio of clear writing"],
  },

  // Space
  {
    id: "sp-sat-1",
    domain: "space",
    title: "Satellite Systems Engineer (Junior)",
    company: "OrbitalNest",
    location: "Bengaluru",
    mode: "On-site",
    salary: "₹10–16 LPA",
    type: "Full-time",
    level: "Junior",
    skills: ["Satellite Engineering", "Systems Engineering", "Python", "RF", "Documentation"],
    preferred: ["CubeSat", "MATLAB"],
    summary: "Support satellite bus subsystem integration and test readiness reviews.",
    responsibilities: ["Interface docs", "Test support", "Anomaly logs"],
    requirements: ["Space systems coursework", "Detail orientation"],
  },
  {
    id: "sp-prop-1",
    domain: "space",
    title: "Propulsion Test Intern",
    company: "Aether Launch",
    location: "Sriharikota region / Lab",
    mode: "On-site",
    salary: "Stipend competitive",
    type: "Internship",
    level: "Intern",
    skills: ["Rocket Propulsion", "Thermodynamics", "Lab Safety", "Data Analysis", "Python"],
    preferred: ["CAD", "Instrumentation"],
    summary: "Assist propulsion test campaigns with data capture and safety checklists.",
    responsibilities: ["Prep test sheets", "Sensor logging", "Post-test notes"],
    requirements: ["Strong fundamentals", "Safety-first mindset"],
  },
  {
    id: "sp-ops-1",
    domain: "space",
    title: "Mission Operations Analyst",
    company: "Cislunar Ops",
    location: "Hyderabad / Hybrid",
    mode: "Hybrid",
    salary: "₹9–14 LPA",
    type: "Full-time",
    level: "Junior",
    skills: ["Orbital Mechanics", "Mission Planning", "Python", "Communication", "Documentation"],
    preferred: ["STK", "SQL"],
    summary: "Monitor mission timelines, pass plans, and operations documentation quality.",
    responsibilities: ["Pass planning support", "Ops reports", "Procedure updates"],
    requirements: ["Astro/orbital literacy", "Calm under procedure"],
  },
  {
    id: "sp-ai-1",
    domain: "space",
    title: "Space AI Autonomy Engineer",
    company: "Horizon Autonomy",
    location: "Remote · India",
    mode: "Remote",
    salary: "₹15–25 LPA",
    type: "Full-time",
    level: "Mid",
    skills: ["Space AI", "Python", "Computer Vision", "Machine Learning", "Robotics"],
    preferred: ["PyTorch", "ROS"],
    summary: "Prototype autonomy features for docking and surface robotics perception.",
    responsibilities: ["CV experiments", "Sim evaluation", "Model packaging"],
    requirements: ["ML + robotics overlap", "Clean experiment habits"],
  },
  {
    id: "sp-biz-1",
    domain: "space",
    title: "NewSpace Business Associate",
    company: "LaunchLedger",
    location: "Mumbai / Hybrid",
    mode: "Hybrid",
    salary: "₹8–13 LPA",
    type: "Full-time",
    level: "Junior",
    skills: ["Space Economy", "Market Research", "Communication", "Writing", "Excel"],
    preferred: ["Finance", "Policy literacy"],
    summary: "Support commercial analysis for launch and satellite service opportunities.",
    responsibilities: ["Market briefs", "Partner research", "Deck preparation"],
    requirements: ["Curiosity about space markets", "Clear writing"],
  },
]

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9+#.]/i)
    .map((t) => t.trim())
    .filter((t) => t.length > 1)
}

export function profileSkillList(profile: SeekerProfile): string[] {
  return profile.skills
    .split(/[,|/]/)
    .map((s) => s.trim())
    .filter(Boolean)
}

function levelScore(profileLevel: SeekerProfile["level"], jobLevel: JobListing["level"]): number {
  const order = { Intern: 0, Junior: 1, Mid: 2, Senior: 3 }
  const delta = Math.abs(order[profileLevel] - order[jobLevel])
  if (delta === 0) return 100
  if (delta === 1) return 78
  if (delta === 2) return 55
  return 35
}

function modeScore(profileMode: SeekerProfile["mode"], jobMode: JobListing["mode"]): number {
  if (profileMode === "Any") return 95
  if (profileMode === jobMode) return 100
  if (profileMode === "Remote" && jobMode === "Hybrid") return 70
  if (profileMode === "Hybrid" && (jobMode === "Remote" || jobMode === "On-site")) return 75
  return 45
}

export function computeMatch(job: JobListing, profile: SeekerProfile): MatchBreakdown {
  const userSkills = profileSkillList(profile).map((s) => s.toLowerCase())
  const required = job.skills.map((s) => s.toLowerCase())
  const preferred = job.preferred.map((s) => s.toLowerCase())

  const matchedRequired = required.filter((s) =>
    userSkills.some((u) => u.includes(s) || s.includes(u)),
  )
  const matchedPreferred = preferred.filter((s) =>
    userSkills.some((u) => u.includes(s) || s.includes(u)),
  )
  const missing = required.filter(
    (s) => !userSkills.some((u) => u.includes(s) || s.includes(u)),
  )

  const skills =
    required.length === 0
      ? 50
      : Math.round(
          ((matchedRequired.length + matchedPreferred.length * 0.35) /
            (required.length + preferred.length * 0.35)) *
            100,
        )

  const experience = levelScore(profile.level, job.level)
  const location =
    profile.location.toLowerCase().includes("remote") && job.mode === "Remote"
      ? 100
      : modeScore(profile.mode, job.mode)

  const goalTokens = tokenize(profile.goals + " " + profile.headline)
  const jobTokens = tokenize(
    `${job.title} ${job.summary} ${job.skills.join(" ")} ${job.company}`,
  )
  const overlap = goalTokens.filter((t) => jobTokens.includes(t)).length
  const goals = Math.min(100, 55 + overlap * 8)

  const overall = Math.round(skills * 0.45 + experience * 0.2 + location * 0.15 + goals * 0.2)

  const strengths: string[] = []
  if (matchedRequired.length)
    strengths.push(`Your skills align with: ${matchedRequired.slice(0, 4).join(", ")}`)
  if (experience >= 78) strengths.push(`Experience level fits this ${job.level.toLowerCase()} role`)
  if (location >= 90) strengths.push(`Work mode preference matches (${job.mode})`)
  if (goals >= 80) strengths.push("Career goals language overlaps with this role’s domain")

  const gaps: string[] = missing.slice(0, 4).map((s) => `Build or demonstrate: ${s}`)
  if (experience < 60) gaps.push(`This role targets ${job.level}; consider stepping-stone roles first`)

  const label: MatchBreakdown["label"] =
    overall >= 85
      ? "Strong match"
      : overall >= 72
        ? "Good match"
        : overall >= 55
          ? "Partial match"
          : "Weak match"

  return {
    skills: Math.min(100, skills),
    experience,
    location,
    goals: Math.min(100, goals),
    overall: Math.min(100, overall),
    strengths: strengths.length ? strengths : ["Add more skills to improve explainability"],
    gaps: gaps.length ? gaps : ["No critical required-skill gaps detected from your profile text"],
    label,
  }
}

export function parseNaturalQuery(query: string): {
  tokens: string[]
  remoteOnly: boolean
  internshipOnly: boolean
} {
  const q = query.toLowerCase()
  return {
    tokens: tokenize(q).filter(
      (t) => !["find", "jobs", "job", "for", "with", "and", "the", "a", "an", "me", "someone"].includes(t),
    ),
    remoteOnly: /\bremote\b/.test(q),
    internshipOnly: /\bintern(ship)?\b/.test(q),
  }
}

export function getJobById(jobId: string): JobListing | undefined {
  return JOBS.find((j) => j.id === jobId)
}

export function filterJobs(
  domain: EmploymentDomain,
  profile: SeekerProfile,
  query: string,
): { job: JobListing; match: MatchBreakdown }[] {
  const parsed = parseNaturalQuery(query)
  return JOBS.filter((j) => j.domain === domain)
    .filter((j) => {
      if (parsed.remoteOnly && j.mode !== "Remote") return false
      if (parsed.internshipOnly && j.type !== "Internship" && j.level !== "Intern") return false
      if (!parsed.tokens.length) return true
      const hay = `${j.title} ${j.company} ${j.summary} ${j.skills.join(" ")} ${j.location}`.toLowerCase()
      return parsed.tokens.some((t) => hay.includes(t))
    })
    .map((job) => ({ job, match: computeMatch(job, profile) }))
    .sort((a, b) => b.match.overall - a.match.overall)
}

export function interviewQuestions(job: JobListing, profile: SeekerProfile): string[] {
  const topSkill = profileSkillList(profile)[0] ?? "your strongest skill"
  return [
    `Walk us through a project where you used ${topSkill}.`,
    `Why are you interested in ${job.title} at ${job.company}?`,
    `Which requirement in this role do you already meet well, and which would you learn first?`,
    `Tell us about a time you solved an ambiguous problem with limited information.`,
    `How would you approach your first 30 days in this ${job.level.toLowerCase()} role?`,
  ]
}

export function applicationDraft(job: JobListing, profile: SeekerProfile): string {
  const skills = profileSkillList(profile).slice(0, 5).join(", ") || "my current skill set"
  return `Hello ${job.company} hiring team,

I’m applying for the ${job.title} role. My focus is “${profile.headline}”, and I’m building toward: ${profile.goals}.

Relevant strengths I can truthfully offer today: ${skills}.

I’m motivated by this role because ${job.summary.toLowerCase()} I learn quickly, communicate clearly, and I’m ready to contribute where my existing skills fit while closing gaps through deliberate practice.

Thank you for your consideration.
`
}
