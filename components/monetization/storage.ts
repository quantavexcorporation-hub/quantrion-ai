import type { AddOnId, BillingCycle, PlanId } from "./types"

const KEY_PLAN = "q1:plan"
const KEY_CYCLE = "q1:billingCycle"
const KEY_ADDONS = "q1:addons"

export function readPlan(): PlanId | null {
  try {
    const raw = localStorage.getItem(KEY_PLAN)
    if (raw === "free" || raw === "pro" || raw === "elite") return raw
    return null
  } catch {
    return null
  }
}

export function writePlan(plan: PlanId) {
  try {
    localStorage.setItem(KEY_PLAN, plan)
  } catch {
    // ignore
  }
}

export function readCycle(): BillingCycle | null {
  try {
    const raw = localStorage.getItem(KEY_CYCLE)
    if (raw === "monthly" || raw === "yearly") return raw
    return null
  } catch {
    return null
  }
}

export function writeCycle(cycle: BillingCycle) {
  try {
    localStorage.setItem(KEY_CYCLE, cycle)
  } catch {
    // ignore
  }
}

export function readAddOns(): AddOnId[] {
  try {
    const raw = localStorage.getItem(KEY_ADDONS)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (x): x is AddOnId =>
        x === "doubt-boost" || x === "analytics-pack" || x === "memory-ai" || x === "rank-predictor"
    )
  } catch {
    return []
  }
}

export function writeAddOns(addons: AddOnId[]) {
  try {
    localStorage.setItem(KEY_ADDONS, JSON.stringify(addons))
  } catch {
    // ignore
  }
}

