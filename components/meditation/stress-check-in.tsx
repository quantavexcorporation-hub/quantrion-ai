"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  levelColor,
  levelFromScore,
  levelLabel,
  scoreFromSignals,
  type StressHistoryEntry,
  type StressLevel,
  type StressSignals,
  STRESS_HISTORY_KEY,
} from "./meditation-data"

const DEFAULT: StressSignals = {
  tension: 4,
  overwhelm: 4,
  sleepDebt: 3,
  examPressure: 5,
  emotionalWeight: 4,
}

const SLIDERS: { key: keyof StressSignals; label: string; hint: string }[] = [
  { key: "tension", label: "Body tension", hint: "Jaw, neck, shoulders" },
  { key: "overwhelm", label: "Mental overwhelm", hint: "Too many thoughts at once" },
  { key: "sleepDebt", label: "Sleep debt", hint: "How tired your body feels" },
  { key: "examPressure", label: "Exam pressure", hint: "Deadline / mock anxiety" },
  { key: "emotionalWeight", label: "Emotional weight", hint: "Heaviness, worry, self-pressure" },
]

type Props = {
  onComplete: (result: { score: number; level: StressLevel; signals: StressSignals }) => void
}

export function StressCheckIn({ onComplete }: Props) {
  const [signals, setSignals] = useState<StressSignals>(DEFAULT)
  const [scanning, setScanning] = useState(false)

  const liveScore = useMemo(() => scoreFromSignals(signals), [signals])
  const liveLevel = useMemo(() => levelFromScore(liveScore), [liveScore])

  const runScan = async () => {
    setScanning(true)
    await new Promise((r) => setTimeout(r, 900))
    const score = scoreFromSignals(signals)
    const level = levelFromScore(score)
    try {
      const raw = localStorage.getItem(STRESS_HISTORY_KEY)
      const prev: StressHistoryEntry[] = raw ? JSON.parse(raw) : []
      const next = [{ at: new Date().toISOString(), score, level }, ...prev].slice(0, 14)
      localStorage.setItem(STRESS_HISTORY_KEY, JSON.stringify(next))
    } catch {
      /* ignore */
    }
    setScanning(false)
    onComplete({ score, level, signals })
  }

  return (
    <div className="glass-card rounded-2xl p-5 md:p-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-300/90">
            Healing check-in
          </p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
            How heavy does your mind feel?
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            This space is for deep calm — not productivity. Map tension and emotional weight, then
            enter a healing sanctuary with peaceful sound and imagery.
          </p>
        </div>
        <div className="rounded-xl border border-border/60 bg-secondary/40 px-4 py-3 text-right">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Stress signal</p>
          <p className={cn("text-2xl font-semibold tabular-nums", levelColor(liveLevel))}>
            {liveScore}
          </p>
          <p className="text-xs text-muted-foreground">{levelLabel(liveLevel)}</p>
        </div>
      </div>

      <div className="mt-6 space-y-5">
        {SLIDERS.map((item) => (
          <label key={item.key} className="block">
            <div className="mb-2 flex items-baseline justify-between gap-3">
              <div>
                <span className="text-sm font-medium text-foreground">{item.label}</span>
                <span className="ml-2 text-xs text-muted-foreground">{item.hint}</span>
              </div>
              <span className="tabular-nums text-sm text-teal-300">{signals[item.key]}/10</span>
            </div>
            <input
              type="range"
              min={0}
              max={10}
              value={signals[item.key]}
              onChange={(e) =>
                setSignals((s) => ({ ...s, [item.key]: Number(e.target.value) }))
              }
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-teal-400"
              aria-label={item.label}
            />
          </label>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button onClick={() => void runScan()} disabled={scanning} className="min-w-[180px]">
          {scanning ? "Listening to your body…" : "Detect stress & open calm"}
        </Button>
        <p className="text-xs text-muted-foreground">
          Private on-device · wellbeing support only · not a medical diagnosis
        </p>
      </div>
    </div>
  )
}
