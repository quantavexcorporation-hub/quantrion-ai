"use client"

import { useMemo } from "react"
import Link from "next/link"
import { ArrowRight, Compass, Target } from "lucide-react"
import { buildDayStrategy } from "@/components/strategy/strategy-data"

export function StrategyMentor() {
  const today = useMemo(() => buildDayStrategy("today"), [])
  const next = today.goals[0]
  const after = today.goals.slice(1, 3)

  return (
    <section className="glass-card rounded-2xl p-5 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-300">Strategy AI</p>
          <h2 className="mt-1 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            Daily mentorship
          </h2>
        </div>
        <Link
          href="/strategy"
          className="inline-flex items-center gap-1 text-xs font-medium text-sky-300 hover:text-sky-200"
        >
          Full plan <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground">{today.headline}</p>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-border/60 bg-secondary/20 px-4 py-3">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            <Compass className="h-3.5 w-3.5 text-sky-300" /> Current situation
          </p>
          <p className="mt-2 text-sm leading-relaxed text-foreground">{today.energyNote}</p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{today.performanceFocus}</p>
        </div>

        {next && (
          <div className="rounded-xl border border-sky-400/30 bg-sky-400/10 px-4 py-3">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-sky-200">
              <Target className="h-3.5 w-3.5" /> Decide this next
            </p>
            <p className="mt-2 text-sm font-medium text-foreground">
              {next.subject} · {next.title}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{next.outcome}</p>
            <p className="mt-2 text-xs text-sky-200">{next.minutes} min · then stop and check the result</p>
          </div>
        )}
      </div>

      {after.length > 0 && (
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {after.map((goal) => (
            <li key={goal.id} className="rounded-xl border border-border/60 px-3 py-2.5 text-sm">
              <span className="font-medium text-foreground">{goal.subject}</span>
              <span className="text-muted-foreground"> · {goal.title}</span>
              <span className="mt-0.5 block text-xs text-muted-foreground">{goal.minutes} min</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
