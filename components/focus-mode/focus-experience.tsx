"use client"

import { useEffect, useMemo, useState } from "react"
import {
  CheckCircle2,
  Flame,
  ListTodo,
  Sparkles,
  Target,
  Timer,
  Zap,
} from "lucide-react"
import { ShellLayout } from "@/components/layout/shell-layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { FocusTimer } from "./focus-timer"
import {
  FOCUS_GOALS_KEY,
  FOCUS_STATS_KEY,
  FOCUS_TECHNIQUES,
  FOCUS_TIPS,
  emptyStats,
  type FocusGoalDraft,
  type FocusGoalPriority,
  type FocusStats,
  type TechniqueId,
} from "./focus-data"

const PRIORITIES: { id: FocusGoalPriority; label: string }[] = [
  { id: "frog", label: "Eat the frog (hardest)" },
  { id: "high", label: "High impact" },
  { id: "medium", label: "Medium" },
  { id: "low", label: "Light / maintenance" },
]

export function FocusExperience() {
  const [techniqueId, setTechniqueId] = useState<TechniqueId>("pomodoro")
  const [title, setTitle] = useState("")
  const [subject, setSubject] = useState("Physics")
  const [minutes, setMinutes] = useState(50)
  const [priority, setPriority] = useState<FocusGoalPriority>("high")
  const [active, setActive] = useState(false)
  const [stats, setStats] = useState<FocusStats>(emptyStats())
  const [queue, setQueue] = useState<FocusGoalDraft[]>([])
  const [tipIndex, setTipIndex] = useState(0)

  const technique = useMemo(
    () => FOCUS_TECHNIQUES.find((t) => t.id === techniqueId) ?? FOCUS_TECHNIQUES[0],
    [techniqueId]
  )

  useEffect(() => {
    try {
      const s = localStorage.getItem(FOCUS_STATS_KEY)
      if (s) setStats(JSON.parse(s) as FocusStats)
      const g = localStorage.getItem(FOCUS_GOALS_KEY)
      if (g) setQueue(JSON.parse(g) as FocusGoalDraft[])
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    const id = window.setInterval(() => {
      setTipIndex((i) => (i + 1) % FOCUS_TIPS.length)
    }, 8000)
    return () => window.clearInterval(id)
  }, [])

  const persistQueue = (next: FocusGoalDraft[]) => {
    setQueue(next)
    try {
      localStorage.setItem(FOCUS_GOALS_KEY, JSON.stringify(next))
    } catch {
      /* ignore */
    }
  }

  const addToQueue = () => {
    if (!title.trim()) return
    const item: FocusGoalDraft = {
      title: title.trim(),
      subject,
      minutes,
      priority,
      techniqueId,
    }
    persistQueue([item, ...queue].slice(0, 12))
  }

  const startFocus = (override?: FocusGoalDraft) => {
    if (override) {
      setTitle(override.title)
      setSubject(override.subject)
      setMinutes(override.minutes)
      setPriority(override.priority)
      setTechniqueId(override.techniqueId)
    } else if (!title.trim()) {
      return
    }
    // Eat the frog technique forces frog priority messaging
    if ((override?.techniqueId ?? techniqueId) === "eat-the-frog") {
      setPriority("frog")
    }
    setActive(true)
  }

  const loadFrogDefaults = () => {
    setTechniqueId("eat-the-frog")
    setPriority("frog")
    setMinutes(40)
    if (!title.trim()) setTitle("Hardest weak topic — first block")
  }

  if (active) {
    return (
      <ShellLayout
        title="Focus Mode"
        subtitle="Protected time · one goal · proven technique"
        aiStatus="optimizing"
        hideHeader
        className="!p-4 md:!p-6"
      >
        <FocusTimer
          technique={
            FOCUS_TECHNIQUES.find((t) => t.id === techniqueId) ?? FOCUS_TECHNIQUES[0]
          }
          goalTitle={title || "Focus session"}
          targetMinutes={minutes}
          onExit={() => setActive(false)}
          onSessionLogged={setStats}
        />
      </ShellLayout>
    )
  }

  return (
    <ShellLayout
      title="Focus Mode"
      subtitle="Student time management — set a goal, pick an effective technique, and protect the clock."
      aiStatus="optimizing"
    >
      <div className="space-y-6">
        {/* Hero */}
        <section className="glass-card grid-glow relative overflow-hidden rounded-2xl p-5 md:p-6">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-400/15 blur-3xl" />
          <div className="relative flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-400/10 px-3 py-1 text-[11px] font-medium text-violet-200">
                <Timer className="h-3.5 w-3.5" />
                Intelligence Widget · Time management (not Meditation)
              </div>
              <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                Focus Mode for serious study blocks
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Choose how you manage time — Pomodoro, 52/17, Ultradian, Time Blocking, Flowtime, or
                Eat the Frog — then run a protected session against a clear goal.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:min-w-[260px]">
              <Stat label="Sessions" value={String(stats.sessionsCompleted)} icon={Zap} />
              <Stat label="Focus mins" value={String(stats.totalFocusMinutes)} icon={Timer} />
              <Stat label="Streak" value={String(stats.streakDays)} icon={Flame} />
            </div>
          </div>
        </section>

        {/* Goal builder */}
        <section className="glass-card rounded-2xl p-5 md:p-6">
          <div className="mb-4 flex items-center gap-2">
            <Target className="h-4 w-4 text-sky-300" />
            <h3 className="font-semibold text-foreground">Set goal & time</h3>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block md:col-span-2">
              <span className="text-xs text-muted-foreground">What will you complete?</span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Finish Thermodynamics first-law set (8 problems)"
                className="mt-1.5 h-11 w-full rounded-xl border border-border bg-secondary/40 px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-violet-400/40"
              />
            </label>
            <label className="block">
              <span className="text-xs text-muted-foreground">Subject</span>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="mt-1.5 h-11 w-full rounded-xl border border-border bg-secondary/40 px-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-violet-400/40"
              >
                {["Physics", "Chemistry", "Mathematics", "Biology", "Mixed"].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-xs text-muted-foreground">Total focus time (minutes)</span>
              <input
                type="number"
                min={15}
                max={240}
                value={minutes}
                onChange={(e) => setMinutes(Math.max(15, Math.min(240, Number(e.target.value) || 15)))}
                className="mt-1.5 h-11 w-full rounded-xl border border-border bg-secondary/40 px-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-violet-400/40"
              />
            </label>
            <label className="block md:col-span-2">
              <span className="text-xs text-muted-foreground">Priority</span>
              <div className="mt-1.5 flex flex-wrap gap-2">
                {PRIORITIES.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPriority(p.id)}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs transition-colors",
                      priority === p.id
                        ? "border-violet-400/40 bg-violet-500/15 text-violet-200"
                        : "border-border/60 text-muted-foreground hover:border-violet-400/25"
                    )}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </label>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button onClick={() => startFocus()} disabled={!title.trim()} className="min-w-[140px]">
              Start Focus Mode
            </Button>
            <Button variant="secondary" onClick={addToQueue} disabled={!title.trim()}>
              Save to queue
            </Button>
            <Button variant="ghost" onClick={loadFrogDefaults}>
              Hardest-first setup
            </Button>
          </div>
        </section>

        {/* Techniques */}
        <section>
          <div className="mb-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-violet-300" />
            <h3 className="text-lg font-semibold text-foreground">
              Effective time management techniques
            </h3>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {FOCUS_TECHNIQUES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setTechniqueId(t.id)
                  setMinutes(Math.min(240, t.workMin * 2))
                }}
                className={cn(
                  "glass-card rounded-2xl p-5 text-left transition-all hover:-translate-y-0.5",
                  techniqueId === t.id && "border-violet-400/40 bg-violet-500/10"
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="mt-0.5 text-[11px] text-violet-300">{t.tagline}</p>
                  </div>
                  {techniqueId === t.id && (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-violet-300" />
                  )}
                </div>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{t.description}</p>
                <p className="mt-2 text-xs leading-relaxed text-sky-200/90">
                  <span className="font-medium text-foreground">Why it works: </span>
                  {t.whyEffective}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-[10px]">
                    {t.flexible
                      ? `Up to ${t.workMin}m flow`
                      : `${t.workMin}m work / ${t.breakMin}m break`}
                  </Badge>
                  <Badge variant="outline" className="text-[10px] text-muted-foreground">
                    {t.bestFor}
                  </Badge>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Selected technique detail + tip */}
        <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="glass-card rounded-2xl p-5">
            <h3 className="font-semibold text-foreground">Selected: {technique.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{technique.description}</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <span className="text-foreground">Work block:</span> {technique.workMin} minutes
              </li>
              <li>
                <span className="text-foreground">Break:</span> {technique.breakMin} minutes
                {technique.longBreakMin
                  ? ` · long break ${technique.longBreakMin}m every ${technique.cyclesBeforeLongBreak} cycles`
                  : ""}
              </li>
              <li>
                <span className="text-foreground">Best for:</span> {technique.bestFor}
              </li>
            </ul>
            <Button
              className="mt-5"
              disabled={!title.trim()}
              onClick={() => startFocus()}
            >
              Run {technique.name} for “{title.trim() || "your goal"}”
            </Button>
          </div>
          <div className="glass-card rounded-2xl p-5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-violet-300">
              Focus tip
            </p>
            <p className="mt-3 text-sm leading-relaxed text-foreground">{FOCUS_TIPS[tipIndex]}</p>
            <p className="mt-4 text-xs text-muted-foreground">
              Focus Mode manages attention and time. Use Meditation when you need deep calm and
              healing — different tools, different jobs.
            </p>
          </div>
        </section>

        {/* Goal queue */}
        {queue.length > 0 && (
          <section className="glass-card rounded-2xl p-5 md:p-6">
            <div className="mb-4 flex items-center gap-2">
              <ListTodo className="h-4 w-4 text-sky-300" />
              <h3 className="font-semibold text-foreground">Goal queue</h3>
            </div>
            <div className="space-y-2">
              {queue.map((g, i) => (
                <div
                  key={`${g.title}-${i}`}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/50 bg-secondary/25 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">{g.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {g.subject} · {g.minutes}m · {g.priority} ·{" "}
                      {FOCUS_TECHNIQUES.find((t) => t.id === g.techniqueId)?.name}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => startFocus(g)}>
                      Start
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => persistQueue(queue.filter((_, idx) => idx !== i))}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </ShellLayout>
  )
}

function Stat({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: string
  icon: typeof Timer
}) {
  return (
    <div className="rounded-xl border border-border/50 bg-secondary/40 px-3 py-2 text-center">
      <Icon className="mx-auto h-3.5 w-3.5 text-violet-300" />
      <p className="mt-1 text-lg font-semibold tabular-nums text-foreground">{value}</p>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
    </div>
  )
}
