export type ScholarshipStatus = "planning" | "applied" | "awarded" | "closed"

export type Scholarship = {
  id: string
  name: string
  provider: string
  amount: number
  deadline: string
  status: ScholarshipStatus
}

export type Earning = {
  id: string
  source: string
  amount: number
  monthly: boolean
}

export type WealthPlan = {
  goal: string
  target: number
  saved: number
  monthly: number
}

export type FinanceState = {
  scholarships: Scholarship[]
  earnings: Earning[]
  wealth: WealthPlan
}

const KEY = "quantrion-finance-iq-v1"

export const EMPTY_FINANCE: FinanceState = {
  scholarships: [],
  earnings: [],
  wealth: { goal: "Emergency fund", target: 25000, saved: 0, monthly: 2000 },
}

function newId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
}

export function createId() {
  return newId()
}

export function readFinance(): FinanceState {
  if (typeof window === "undefined") return EMPTY_FINANCE
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return EMPTY_FINANCE
    const parsed = JSON.parse(raw) as Partial<FinanceState>
    return {
      scholarships: Array.isArray(parsed.scholarships) ? parsed.scholarships : [],
      earnings: Array.isArray(parsed.earnings) ? parsed.earnings : [],
      wealth: { ...EMPTY_FINANCE.wealth, ...parsed.wealth },
    }
  } catch {
    return EMPTY_FINANCE
  }
}

export function writeFinance(next: FinanceState) {
  window.localStorage.setItem(KEY, JSON.stringify(next))
}

export function formatINR(value: number) {
  return `₹${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value)}`
}
