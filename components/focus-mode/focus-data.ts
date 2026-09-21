export type TechniqueId =
  | "pomodoro"
  | "long-pomodoro"
  | "fifty-two-seventeen"
  | "ultradian"
  | "time-block"
  | "flowtime"
  | "eat-the-frog"

export type FocusPhase = "work" | "break" | "long-break"

export type FocusTechnique = {
  id: TechniqueId
  name: string
  tagline: string
  description: string
  whyEffective: string
  bestFor: string
  workMin: number
  breakMin: number
  longBreakMin?: number
  cyclesBeforeLongBreak?: number
  flexible?: boolean
}

export const FOCUS_TECHNIQUES: FocusTechnique[] = [
  {
    id: "pomodoro",
    name: "Pomodoro",
    tagline: "25 / 5 classic",
    description: "Short intense sprints with micro-breaks to protect attention.",
    whyEffective: "Matches natural attention bursts and reduces burnout from marathon study.",
    bestFor: "Homework, MCQ drills, mixed subjects",
    workMin: 25,
    breakMin: 5,
    longBreakMin: 15,
    cyclesBeforeLongBreak: 4,
  },
  {
    id: "long-pomodoro",
    name: "Deep Pomodoro",
    tagline: "50 / 10 deep work",
    description: "Longer blocks for concepts that need warm-up and depth.",
    whyEffective: "Gives enough runway for hard derivations without constant restart cost.",
    bestFor: "Physics numericals, long proofs, writing",
    workMin: 50,
    breakMin: 10,
    longBreakMin: 20,
    cyclesBeforeLongBreak: 3,
  },
  {
    id: "fifty-two-seventeen",
    name: "52 / 17 Rhythm",
    tagline: "DeskTime method",
    description: "52 minutes focused, 17 minutes full recovery.",
    whyEffective: "Based on high-productivity patterns — longer recovery improves next block quality.",
    bestFor: "Full chapter sessions, revision marathons",
    workMin: 52,
    breakMin: 17,
    longBreakMin: 25,
    cyclesBeforeLongBreak: 3,
  },
  {
    id: "ultradian",
    name: "Ultradian Focus",
    tagline: "90 / 20 biological",
    description: "Aligns with ~90-minute body/mind energy cycles.",
    whyEffective: "Works with natural ultradian rhythms instead of fighting fatigue.",
    bestFor: "Mock-test prep blocks, deep learning days",
    workMin: 90,
    breakMin: 20,
    longBreakMin: 30,
    cyclesBeforeLongBreak: 2,
  },
  {
    id: "time-block",
    name: "Time Blocking",
    tagline: "One goal · one block",
    description: "Calendar-style: reserve a fixed block for a single outcome only.",
    whyEffective: "Kills context switching — the #1 silent killer of student performance.",
    bestFor: "Daily goal execution from Strategy AI",
    workMin: 45,
    breakMin: 10,
    longBreakMin: 15,
    cyclesBeforeLongBreak: 2,
  },
  {
    id: "flowtime",
    name: "Flowtime",
    tagline: "Flexible until natural break",
    description: "Work until focus dips, then take a proportional break (here: up to your set goal time).",
    whyEffective: "Respects flow state — stop when quality drops, not when a bell rings.",
    bestFor: "Creative problem solving, when already in flow",
    workMin: 40,
    breakMin: 8,
    flexible: true,
  },
  {
    id: "eat-the-frog",
    name: "Eat the Frog",
    tagline: "Hardest goal first",
    description: "Start with the most feared / highest-impact task in a protected morning block.",
    whyEffective: "Willpower is highest early — clearing the hardest goal lifts the whole day.",
    bestFor: "Weak topics, dreaded chapters",
    workMin: 40,
    breakMin: 10,
    longBreakMin: 15,
    cyclesBeforeLongBreak: 2,
  },
]

export type FocusGoalPriority = "frog" | "high" | "medium" | "low"

export type FocusGoalDraft = {
  title: string
  subject: string
  minutes: number
  priority: FocusGoalPriority
  techniqueId: TechniqueId
}

export const FOCUS_STATS_KEY = "quantrion_focus_stats_v1"
export const FOCUS_GOALS_KEY = "quantrion_focus_goals_v1"

export type FocusStats = {
  sessionsCompleted: number
  totalFocusMinutes: number
  streakDays: number
  lastDay: string | null
}

export function emptyStats(): FocusStats {
  return { sessionsCompleted: 0, totalFocusMinutes: 0, streakDays: 0, lastDay: null }
}

export function todayKey(): string {
  return new Date().toISOString().slice(0, 10)
}

export function formatClock(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds))
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`
}

export const FOCUS_TIPS = [
  "One tab. One goal. Phone in another room.",
  "Write the outcome in one line before you start the timer.",
  "Breaks are part of the technique — stand, water, stretch, no social scroll.",
  "If you finish early, use leftover time for closed-book recall — not new rabbit holes.",
  "After 3–4 cycles, take a longer break to protect tomorrow’s focus.",
]
