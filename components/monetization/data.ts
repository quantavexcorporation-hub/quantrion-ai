import type { AddOn, Plan } from "./types"

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "FREE",
    tagline: "Starter",
    monthlyPrice: 0,
    yearlyPrice: 0,
    bullets: ["Basic AI access", "Limited questions/day", "Basic analytics", "Community-level insights"],
    cta: "Get Started Free",
  },
  {
    id: "pro",
    name: "PRO",
    tagline: "Recommended",
    badge: "Most Popular",
    highlight: true,
    monthlyPrice: 499,
    yearlyPrice: 4990,
    bullets: ["Unlimited practice", "Advanced AI explanations", "Full analytics dashboard", "Personalized strategy AI", "Mock tests"],
    cta: "Upgrade to Pro",
  },
  {
    id: "elite",
    name: "ELITE",
    tagline: "Premium AI",
    badge: "AI Powered Advantage",
    monthlyPrice: 999,
    yearlyPrice: 9990,
    bullets: ["Everything in Pro", "Predictive rank analysis", "Deep Knowledge DNA", "Priority AI responses", "Advanced test simulations"],
    cta: "Go Elite",
  },
]

export const ADDONS: AddOn[] = [
  {
    id: "doubt-boost",
    name: "Doubt Solver Boost",
    description: "Faster answers + higher accuracy",
    priceMonthly: 149,
  },
  {
    id: "analytics-pack",
    name: "Advanced Analytics Pack",
    description: "Deeper diagnostics and trend signals",
    priceMonthly: 199,
  },
  {
    id: "memory-ai",
    name: "Memory Retention AI",
    description: "Spaced repetition tuned to your weak zones",
    priceMonthly: 179,
  },
  {
    id: "rank-predictor",
    name: "Rank Predictor",
    description: "Performance → rank projection insights",
    priceMonthly: 249,
  },
]

