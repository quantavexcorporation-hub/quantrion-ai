import type { DivisionId } from "./data"
import { Trophy, Briefcase, Factory } from "lucide-react"

export type SpecialtyItem = {
  title: string
  meta: string
  detail: string
  highlight?: string
}

export type SpecialtySection = {
  id: DivisionId
  title: string
  subtitle: string
  items: SpecialtyItem[]
}

/** Q1 — Toppers Prize · Q2 — Industrial Roles · Qrion — Space Careers */
export const specialtyById: Record<DivisionId, SpecialtySection> = {
  q1: {
    id: "q1",
    title: "Toppers Prize",
    subtitle: "Rewards for consistency, rank breakthroughs, and verified excellence.",
    items: [
      {
        title: "All-India Rank Circle",
        meta: "AIR ≤ 1000",
        detail: "Mentorship seat + Quantrion Plus year + exclusive Toppers Guidance cohort.",
        highlight: "₹2,00,000",
      },
      {
        title: "State Merit Laureate",
        meta: "Top 1% state",
        detail: "Scholarship credit, mock intelligence pack, and featured success story.",
        highlight: "₹75,000",
      },
      {
        title: "Consistency Champion",
        meta: "90-day streak",
        detail: "Smart Library premium unlock and Progress IQ deep-dive session.",
        highlight: "₹25,000",
      },
      {
        title: "Concept Mastery Award",
        meta: "DNA score 90+",
        detail: "Recognition badge + adaptive revision kit for peak exam weeks.",
        highlight: "₹15,000",
      },
    ],
  },
  q2: {
    id: "q2",
    title: "Industrial Roles",
    subtitle: "Engineering positions across factories, robotics cells, and industrial AI teams.",
    items: [
      {
        title: "Robotics Integration Engineer",
        meta: "On-site / Lab",
        detail: "Commission arms, sensors, and safety interlocks on live cells.",
        highlight: "Core",
      },
      {
        title: "Smart Factory Analyst",
        meta: "Industrial IoT",
        detail: "Digital twins, predictive maintenance, and MES signal fusion.",
        highlight: "Hiring",
      },
      {
        title: "Automation Project Lead",
        meta: "Manufacturing",
        detail: "Own line upgrades from design review to validated throughput.",
        highlight: "Lead",
      },
      {
        title: "Embedded AI Specialist",
        meta: "Edge devices",
        detail: "Ship models onto controllers that act in physical environments.",
        highlight: "Priority",
      },
      {
        title: "Quality Systems Engineer",
        meta: "Plant / Lab",
        detail: "SPC, metrology, FMEA, and continuous improvement loops.",
        highlight: "Open",
      },
      {
        title: "Industrial Partnerships Manager",
        meta: "Cross-org",
        detail: "Connect Quantrion labs with manufacturers and automation partners.",
        highlight: "Open",
      },
    ],
  },
  qrion: {
    id: "qrion",
    title: "Space Careers",
    subtitle: "Mission, satellite, and NewSpace roles for space technology learners.",
    items: [
      {
        title: "Satellite Systems Engineer",
        meta: "Orbital / Ground",
        detail: "Support bus design, payloads, and deployment readiness reviews.",
        highlight: "Core",
      },
      {
        title: "Propulsion Associate",
        meta: "Launch systems",
        detail: "Assist engine test literacy, structures, and flight ops basics.",
        highlight: "Hiring",
      },
      {
        title: "Mission Planning Analyst",
        meta: "Flight dynamics",
        detail: "Trajectory studies, windows, and operations timeline support.",
        highlight: "Open",
      },
      {
        title: "Space AI Autonomy Intern",
        meta: "Autonomy stack",
        detail: "Computer vision, docking concepts, and onboard decision loops.",
        highlight: "Priority",
      },
      {
        title: "Lunar / Mars Systems Fellow",
        meta: "Exploration",
        detail: "Habitats, ISRU concepts, and surface operations research briefs.",
        highlight: "Apply",
      },
      {
        title: "Space Economy Analyst",
        meta: "Commercial",
        detail: "Market models, insurance, and NewSpace venture intelligence.",
        highlight: "Open",
      },
    ],
  },
}

export const specialtyIcons = {
  q1: Trophy,
  q2: Factory,
  qrion: Briefcase,
} as const
