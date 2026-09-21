export type AdSlot = {
  id: string
  sponsor: string
  badge: string
  headline: string
  body: string
  cta: string
  href: string
  accent: string
  visual: "orb" | "prism" | "grid" | "wave"
}

export const adSlots: AdSlot[] = [
  {
    id: "premium",
    sponsor: "Quantrion Plus",
    badge: "Sponsored",
    headline: "Unlock Full AI Tutor",
    body: "Unlimited explanations, voice mode, and adaptive mocks.",
    cta: "Upgrade",
    href: "/upgrade",
    accent: "hsl(217 91% 60%)",
    visual: "orb",
  },
  {
    id: "mocks",
    sponsor: "Mock Intelligence",
    badge: "Featured",
    headline: "Rank Predictor Live",
    body: "Calibrated mocks with live cohort ranking signals.",
    cta: "Try Mock",
    href: "/tests",
    accent: "hsl(160 84% 45%)",
    visual: "grid",
  },
  {
    id: "library",
    sponsor: "Smart Library",
    badge: "New",
    headline: "Intelligence Books",
    body: "3D concepts and page-native AI tutoring inside every chapter.",
    cta: "Open Library",
    href: "/library",
    accent: "hsl(262 83% 68%)",
    visual: "prism",
  },
  {
    id: "research",
    sponsor: "Future Lab",
    badge: "Partner",
    headline: "Frontier Learning Drop",
    body: "Early access to next-gen simulation classrooms.",
    cta: "Explore",
    href: "/study-material",
    accent: "hsl(38 92% 55%)",
    visual: "wave",
  },
]

export const AD_AUTO_MS = 6500
