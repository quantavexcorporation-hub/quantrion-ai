"use client"

import { useEffect, useMemo, useState } from "react"
import {
  Brain,
  Calendar,
  CheckCircle2,
  Compass,
  Flame,
  Lightbulb,
  RefreshCw,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react"
import { ShellLayout } from "@/components/layout/shell-layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import {
  STRATEGY_DAY_KEY,
  buildDayStrategy,
  type ActivityType,
  type DayKey,
  type DayStrategy,
} from "./strategy-data"

const DAYS: { key: DayKey; label: string; blurb: string }[] = [
  { key: "today", label: "Today", blurb: "Daily performance plan" },
  { key: "tomorrow", label: "Tomorrow", blurb: "Prime the next day" },
  { key: "week", label: "This week", blurb: "7-day learning system" },
]

function priorityClass(priority: string) {
  switch (priority) {
    case "high":
      return "border-rose-400/30 bg-rose-500/15 text-rose-200"
    case "medium":
      return "border-amber-400/30 bg-amber-500/15 text-amber-200"
    default:
      return "border-emerald-400/30 bg-emerald-500/15 text-emerald-200"
  }
}

function activityClass(type: ActivityType) {
  switch (type) {
    case "study":
      return "border-sky-400/30 bg-sky-500/10"
    case "practice":
      return "border-violet-400/30 bg-violet-500/10"
    case "review":
      return "border-indigo-400/30 bg-indigo-500/10"
    case "reflect":
      return "border-emerald-400/30 bg-emerald-500/10"
    default:
      return "border-emerald-400/20 bg-emerald-500/5"
  }
}

function impactLabel(impact: string) {
  switch (impact) {
    case "accuracy":
      return "Accuracy"
    case "speed":
      return "Speed"
    case "retention":
      return "Retention"
    default:
      return "Confidence"
  }
}

export function StrategyExperience() {
  const [day, setDay] = useState<DayKey>("today")
  const [strategy, setStrategy] = useState<DayStrategy | null>(null)
  const [loading, setLoading] = useState(true)
  const [checkedGoals, setCheckedGoals] = useState<Record<string, boolean>>({})

  const overall = useMemo(() => {
    if (!strategy) return 0
    const sum = strategy.subjects.reduce((a, s) => a + s.progress, 0)
    return Math.round(sum / Math.max(strategy.subjects.length, 1))
  }, [strategy])

  const load = async (nextDay: DayKey, animate = true) => {
    setLoading(true)
    if (animate) await new Promise((r) => setTimeout(r, 550))
    const data = buildDayStrategy(nextDay)
    setStrategy(data)
    setDay(nextDay)
    setCheckedGoals({})
    try {
      localStorage.setItem(
        STRATEGY_DAY_KEY,
        JSON.stringify({ day: nextDay, at: new Date().toISOString(), headline: data.headline })
      )
    } catch {
      /* ignore */
    }
    setLoading(false)
  }

  useEffect(() => {
    void load("today", true)
  }, [])

  if (!strategy || (loading && !strategy)) {
    return (
      <ShellLayout
        title="Strategy AI"
        subtitle="Every day, a clear plan to improve performance results and how you learn."
        aiStatus="optimizing"
      >
        <div className="flex min-h-[360px] items-center justify-center">
          <div className="text-center">
            <RefreshCw className="mx-auto mb-4 h-8 w-8 animate-spin text-sky-400" />
            <p className="text-muted-foreground">Building your daily strategy…</p>
          </div>
        </div>
      </ShellLayout>
    )
  }

  return (
    <ShellLayout
      title="Strategy AI"
      subtitle="Find your everyday strategy — improve performance results and upgrade the way you learn."
      aiStatus="optimizing"
      headerActions={
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          disabled={loading}
          onClick={() => void load(day)}
        >
          <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
          Refresh plan
        </Button>
      }
    >
      <div className={cn("space-y-6", loading && "opacity-70 transition-opacity")}>
        {/* Day switcher */}
        <div className="grid gap-3 sm:grid-cols-3">
          {DAYS.map((d) => (
            <button
              key={d.key}
              type="button"
              onClick={() => void load(d.key)}
              className={cn(
                "glass-card rounded-xl px-4 py-3 text-left transition-colors",
                day === d.key
                  ? "border-sky-400/40 bg-sky-400/10"
                  : "hover:border-sky-400/25"
              )}
            >
              <p className="text-sm font-semibold text-foreground">{d.label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{d.blurb}</p>
            </button>
          ))}
        </div>

        {/* Hero */}
        <section className="glass-card grid-glow relative overflow-hidden rounded-2xl p-5 md:p-6">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sky-400/15 blur-3xl" />
          <div className="relative flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-sky-400/25 bg-sky-400/10 px-3 py-1 text-[11px] font-medium text-sky-200">
                <Sparkles className="h-3.5 w-3.5" />
                Intelligence Widget · Daily mentor
              </div>
              <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                {strategy.headline}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {strategy.energyNote}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="outline" className="border-sky-400/30 bg-sky-500/10 text-sky-200">
                  Focus: {strategy.performanceFocus}
                </Badge>
                <Badge variant="outline" className="border-emerald-400/30 bg-emerald-500/10 text-emerald-200">
                  Learn by: {strategy.learningStyleShift}
                </Badge>
              </div>
            </div>
            <div className="rounded-xl border border-border/60 bg-secondary/40 px-4 py-3 sm:min-w-[160px]">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Readiness</p>
              <p className="text-3xl font-semibold tabular-nums text-foreground">{overall}%</p>
              <Progress value={overall} className="mt-2 h-1.5" />
            </div>
          </div>
        </section>

        {/* Daily goals — performance outcomes */}
        <section>
          <div className="mb-3 flex items-center gap-2">
            <Target className="h-4 w-4 text-sky-300" />
            <h3 className="font-semibold text-foreground">Performance goals</h3>
            <span className="text-xs text-muted-foreground">Clear outcomes, not vague hours</span>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {strategy.goals.map((goal) => {
              const done = Boolean(checkedGoals[goal.id])
              return (
                <button
                  key={goal.id}
                  type="button"
                  onClick={() =>
                    setCheckedGoals((c) => ({ ...c, [goal.id]: !c[goal.id] }))
                  }
                  className={cn(
                    "glass-card rounded-xl p-4 text-left transition-all",
                    done && "border-emerald-400/35 bg-emerald-500/10"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{goal.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{goal.outcome}</p>
                      <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                        <span className="rounded-md bg-secondary px-2 py-0.5 text-muted-foreground">
                          {goal.subject}
                        </span>
                        <span className="rounded-md bg-sky-500/15 px-2 py-0.5 text-sky-300">
                          {goal.minutes} min
                        </span>
                        <span className="rounded-md bg-violet-500/15 px-2 py-0.5 text-violet-300">
                          {impactLabel(goal.impact)}
                        </span>
                      </div>
                    </div>
                    <CheckCircle2
                      className={cn(
                        "h-5 w-5 shrink-0",
                        done ? "text-emerald-400" : "text-muted-foreground/40"
                      )}
                    />
                  </div>
                </button>
              )
            })}
          </div>
        </section>

        {/* Learning methods */}
        <section className="glass-card rounded-2xl p-5 md:p-6">
          <div className="mb-4 flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-amber-300" />
            <h3 className="font-semibold text-foreground">Way of learning</h3>
          </div>
          <p className="mb-4 max-w-3xl text-sm text-muted-foreground">
            How you study matters as much as what you study. Use these methods today to improve
            long-term results.
          </p>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {strategy.methods.map((m) => (
              <article
                key={m.id}
                className="rounded-xl border border-border/60 bg-secondary/30 p-4 transition-transform hover:-translate-y-0.5"
              >
                <p className="text-sm font-semibold text-foreground">{m.name}</p>
                <p className="mt-2 text-xs leading-relaxed text-sky-200/90">{m.why}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{m.how}</p>
                <p className="mt-3 text-[11px] text-muted-foreground">
                  ~{m.minutes} min · best for {m.bestFor}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Performance levers */}
        <section>
          <div className="mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-300" />
            <h3 className="font-semibold text-foreground">Performance levers</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {strategy.levers.map((lever) => (
              <div key={lever.metric} className="glass-card rounded-xl p-4">
                <div className="flex items-baseline justify-between">
                  <p className="text-sm font-medium text-foreground">{lever.metric}</p>
                  <p className="text-xs tabular-nums text-muted-foreground">
                    {lever.current} → {lever.target}
                  </p>
                </div>
                <Progress value={lever.current} className="mt-2 h-1.5" />
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{lever.action}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Subject micro plans + next / weak */}
        <div className="grid gap-4 lg:grid-cols-2">
          <section className="glass-card rounded-2xl p-5">
            <div className="mb-4 flex items-center gap-2">
              <Compass className="h-4 w-4 text-sky-300" />
              <h3 className="font-semibold text-foreground">Subject micro-strategy</h3>
            </div>
            <div className="space-y-3">
              {strategy.subjects.map((s) => (
                <div key={s.subject} className="rounded-xl border border-border/50 bg-background/30 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-foreground">{s.subject}</p>
                    <Badge variant="outline" className={priorityClass(s.priority)}>
                      {s.priority}
                    </Badge>
                  </div>
                  <Progress value={s.progress} className="mt-2 h-1.5" />
                  <p className="mt-2 text-xs text-muted-foreground">
                    <span className="text-foreground/90">Focus:</span> {s.focus}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    <span className="text-foreground/90">Method:</span> {s.method}
                  </p>
                  <p className="mt-1 text-xs text-sky-300/90">Target: {s.resultTarget}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="space-y-4">
            <section className="glass-card rounded-2xl p-5">
              <div className="mb-3 flex items-center gap-2">
                <Zap className="h-4 w-4 text-amber-300" />
                <h3 className="font-semibold text-foreground">What to study next</h3>
              </div>
              <ul className="space-y-2">
                {strategy.nextTopics.map((t) => (
                  <li key={t} className="flex gap-2 text-sm text-muted-foreground">
                    <span className="mt-1 text-sky-400">•</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </section>
            <section className="glass-card rounded-2xl p-5">
              <div className="mb-3 flex items-center gap-2">
                <Flame className="h-4 w-4 text-rose-300" />
                <h3 className="font-semibold text-foreground">Weak-topic rescue</h3>
              </div>
              <ul className="space-y-2">
                {strategy.weakTopics.map((t) => (
                  <li key={t} className="flex gap-2 text-sm text-muted-foreground">
                    <span className="mt-1 text-rose-400">!</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 rounded-lg border border-border/50 bg-secondary/30 p-3 text-xs leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">Revision engine: </span>
                {strategy.revisionPlan}
              </p>
            </section>
          </div>
        </div>

        {/* Timeline */}
        <section className="glass-card rounded-2xl p-5 md:p-6">
          <div className="mb-4 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-sky-300" />
            <h3 className="font-semibold text-foreground">
              {day === "week" ? "Weekly rhythm" : "AI mentor timeline"}
            </h3>
          </div>
          <p className="mb-4 text-sm text-muted-foreground">{strategy.dailyPlan}</p>
          <div className="space-y-2">
            {strategy.timeline.map((item) => (
              <div
                key={`${item.time}-${item.activity}`}
                className={cn("rounded-xl border p-3", activityClass(item.type))}
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.activity}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{item.time}</p>
                    {item.tip && (
                      <p className="mt-1 text-xs text-sky-200/80">{item.tip}</p>
                    )}
                  </div>
                  <Badge variant="outline" className="text-[10px] capitalize">
                    {item.type}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Evening review */}
        <section className="glass-card rounded-2xl p-5 md:p-6">
          <div className="mb-3 flex items-center gap-2">
            <Brain className="h-4 w-4 text-violet-300" />
            <h3 className="font-semibold text-foreground">Close the loop</h3>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {strategy.eveningReview.map((q, i) => (
              <div
                key={q}
                className="rounded-xl border border-border/50 bg-secondary/30 p-4 text-sm leading-relaxed text-muted-foreground"
              >
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-violet-300">
                  Reflect {i + 1}
                </p>
                {q}
              </div>
            ))}
          </div>
        </section>
      </div>
    </ShellLayout>
  )
}
