export type BillingCycle = "monthly" | "yearly"

export type PlanId = "free" | "pro" | "elite"

export type Plan = {
  id: PlanId
  name: string
  tagline: string
  badge?: string
  highlight?: boolean
  monthlyPrice: number
  yearlyPrice: number
  bullets: string[]
  cta: string
}

export type AddOnId = "doubt-boost" | "analytics-pack" | "memory-ai" | "rank-predictor"

export type AddOn = {
  id: AddOnId
  name: string
  description: string
  priceMonthly: number
}

