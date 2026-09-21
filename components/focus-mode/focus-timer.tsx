"use client"

import { useEffect, useRef, useState } from "react"
import { Pause, Play, SkipForward, Square, Timer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  FOCUS_STATS_KEY,
  emptyStats,
  formatClock,
  todayKey,
  type FocusPhase,
  type FocusStats,
  type FocusTechnique,
} from "./focus-data"

type Props = {
  technique: FocusTechnique
  goalTitle: string
  targetMinutes: number
  onExit: () => void
  onSessionLogged: (stats: FocusStats) => void
}

function phaseSeconds(technique: FocusTechnique, phase: FocusPhase): number {
  if (phase === "work") return technique.workMin * 60
  if (phase === "long-break") return (technique.longBreakMin ?? technique.breakMin) * 60
  return technique.breakMin * 60
}

export function FocusTimer({
  technique,
  goalTitle,
  targetMinutes,
  onExit,
  onSessionLogged,
}: Props) {
  const [phase, setPhase] = useState<FocusPhase>("work")
  const [cycle, setCycle] = useState(1)
  const [running, setRunning] = useState(true)
  const [remaining, setRemaining] = useState(technique.workMin * 60)
  const [focusSecondsDone, setFocusSecondsDone] = useState(0)
  const loggedRef = useRef(false)
  const phaseRef = useRef<FocusPhase>("work")
  const cycleRef = useRef(1)

  const totalTargetSec = targetMinutes * 60
  const progress = Math.min(100, (focusSecondsDone / Math.max(totalTargetSec, 1)) * 100)
  const phaseLabel =
    phase === "work" ? "Focus" : phase === "long-break" ? "Long break" : "Short break"

  useEffect(() => {
    phaseRef.current = "work"
    cycleRef.current = 1
    setPhase("work")
    setCycle(1)
    setRemaining(technique.workMin * 60)
    setFocusSecondsDone(0)
    loggedRef.current = false
    setRunning(true)
  }, [technique])

  const logIfNeeded = (seconds: number) => {
    if (loggedRef.current || seconds < totalTargetSec) return
    loggedRef.current = true
    try {
      const raw = localStorage.getItem(FOCUS_STATS_KEY)
      const prev: FocusStats = raw ? JSON.parse(raw) : emptyStats()
      const today = todayKey()
      let streak = prev.streakDays
      if (prev.lastDay !== today) {
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        const yKey = yesterday.toISOString().slice(0, 10)
        streak = prev.lastDay === yKey ? prev.streakDays + 1 : 1
      }
      const next: FocusStats = {
        sessionsCompleted: prev.sessionsCompleted + 1,
        totalFocusMinutes: prev.totalFocusMinutes + Math.round(seconds / 60),
        streakDays: streak,
        lastDay: today,
      }
      localStorage.setItem(FOCUS_STATS_KEY, JSON.stringify(next))
      onSessionLogged(next)
    } catch {
      /* ignore */
    }
    setRunning(false)
  }

  const goNextPhase = (): number => {
    if (phaseRef.current === "work") {
      const every = technique.cyclesBeforeLongBreak ?? 4
      const useLong = Boolean(technique.longBreakMin) && cycleRef.current % every === 0
      const next: FocusPhase = useLong ? "long-break" : "break"
      phaseRef.current = next
      setPhase(next)
      return phaseSeconds(technique, next)
    }
    phaseRef.current = "work"
    cycleRef.current += 1
    setPhase("work")
    setCycle(cycleRef.current)
    return phaseSeconds(technique, "work")
  }

  useEffect(() => {
    if (!running) return
    const id = window.setInterval(() => {
      if (phaseRef.current === "work") {
        setFocusSecondsDone((f) => {
          const next = f + 1
          logIfNeeded(next)
          return next
        })
      }
      setRemaining((r) => {
        if (r > 1) return r - 1
        return goNextPhase()
      })
    }, 1000)
    return () => window.clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, technique, totalTargetSec])

  const skip = () => setRemaining(goNextPhase())

  return (
    <div className="glass-card relative overflow-hidden rounded-2xl p-5 md:p-8">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-80",
          phase === "work" ? "from-sky-400/30 to-violet-400/20" : "from-emerald-400/25 to-teal-400/15"
        )}
      />
      <div className="relative">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-300">
              Focus Mode · {technique.name}
            </p>
            <h3 className="mt-1 text-xl font-semibold text-foreground">{goalTitle}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Cycle {cycle} · {phaseLabel}
              {technique.flexible ? " · Flowtime flexible" : ""}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onExit} className="gap-1.5">
            <Square className="h-3.5 w-3.5" /> Exit
          </Button>
        </div>

        <div className="mt-10 flex flex-col items-center">
          <div
            className={cn(
              "flex h-52 w-52 items-center justify-center rounded-full border bg-card/70 shadow-[0_0_60px_rgba(56,189,248,0.15)] md:h-60 md:w-60",
              phase === "work" ? "border-sky-400/30" : "border-emerald-400/30"
            )}
          >
            <div className="text-center">
              <Timer
                className={cn(
                  "mx-auto mb-2 h-5 w-5",
                  phase === "work" ? "text-sky-300" : "text-emerald-300"
                )}
              />
              <p className="text-5xl font-semibold tabular-nums tracking-tight text-foreground">
                {formatClock(remaining)}
              </p>
              <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">
                {phaseLabel}
              </p>
            </div>
          </div>

          <div className="mt-8 w-full max-w-md">
            <div className="mb-2 flex justify-between text-xs text-muted-foreground">
              <span>Goal progress</span>
              <span className="tabular-nums">
                {formatClock(focusSecondsDone)} / {formatClock(totalTargetSec)}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-400 to-violet-400 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button onClick={() => setRunning((r) => !r)} className="min-w-[120px]">
              {running ? (
                <>
                  <Pause className="mr-2 h-4 w-4" /> Pause
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" /> Resume
                </>
              )}
            </Button>
            <Button variant="secondary" onClick={skip}>
              <SkipForward className="mr-2 h-4 w-4" /> Skip phase
            </Button>
          </div>

          {focusSecondsDone >= totalTargetSec && (
            <p className="mt-6 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200">
              Goal time complete. Great focus block — log the outcome, then rest.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
