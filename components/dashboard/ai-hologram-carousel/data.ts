export type SlideVisual =
  | "book"
  | "dna"
  | "iq"
  | "library"
  | "orb"
  | "future"

export type PromotionSlideData = {
  id: string
  eyebrow: string
  headline: string
  description: string
  cta: string
  href: string
  visual: SlideVisual
  accent: string
}

export const promotionSlides: PromotionSlideData[] = [
  {
    id: "books",
    eyebrow: "Intelligence Book",
    headline: "AI Interactive Books",
    description:
      "Books that explain themselves with AI, 3D visuals, animations, and contextual tutoring.",
    cta: "Explore",
    href: "/library",
    visual: "book",
    accent: "hsl(217 91% 60%)",
  },
  {
    id: "dna",
    eyebrow: "Adaptive Profile",
    headline: "Knowledge DNA",
    description:
      "Your evolving intelligence profile powered by adaptive learning signals.",
    cta: "Open Feature",
    href: "/knowledge-dna",
    visual: "dna",
    accent: "hsl(262 83% 68%)",
  },
  {
    id: "piq",
    eyebrow: "Exam Readiness",
    headline: "Performance IQ",
    description:
      "Understand strengths, weaknesses, and exam readiness with AI clarity.",
    cta: "Try Now",
    href: "/knowledge-dna",
    visual: "iq",
    accent: "hsl(160 84% 45%)",
  },
  {
    id: "library",
    eyebrow: "Living Knowledge",
    headline: "Smart Library",
    description:
      "Interactive books with concept visualization and AI explanations.",
    cta: "Learn More",
    href: "/library",
    visual: "library",
    accent: "hsl(199 89% 55%)",
  },
  {
    id: "tutor",
    eyebrow: "Always On",
    headline: "AI Tutor",
    description:
      "Ask questions inside videos, books, notes, and practice sessions.",
    cta: "Ask Now",
    href: "/learn",
    visual: "orb",
    accent: "hsl(217 91% 60%)",
  },
  {
    id: "future",
    eyebrow: "Frontier Lab",
    headline: "Future Technology",
    description:
      "Discover frontier learning experiences built for the next generation.",
    cta: "Read More",
    href: "/study-material",
    visual: "future",
    accent: "hsl(38 92% 55%)",
  },
]

export const AUTO_MS = 7000
