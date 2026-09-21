"use client"

import { Progress } from "@/components/ui/progress"
import { goals, motivation, productivity } from "./command-data"

export function ProductivityGoalsMotivation() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <section className="q-surface rounded-2xl p-5" aria-label="Productivity">
        <h2 className="text-lg font-semibold text-foreground">Productivity</h2>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {[
            { label: "Study Streak", value: `${productivity.streak}d` },
            { label: "Longest Streak", value: `${productivity.longest}d` },
            { label: "Today", value: `${productivity.todayHours}h` },
            { label: "Weekly", value: `${productivity.weeklyHours}h` },
            { label: "Monthly Growth", value: `+${productivity.monthlyGrowth}%` },
            { label: "Focus / Break", value: `${productivity.focus} / ${productivity.break}` },
          ].map((item) => (
            <div key={item.label} className="rounded-lg border border-border/60 bg-secondary/20 px-2.5 py-2">
              <p className="text-[10px] text-muted-foreground">{item.label}</p>
              <p className="text-sm font-semibold text-foreground">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="q-surface rounded-2xl p-5" aria-label="Goal tracker">
        <h2 className="text-lg font-semibold text-foreground">Goal Tracker</h2>
        <div className="mt-4 space-y-3">
          {goals.map((g) => (
            <div key={g.label}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{g.label}</span>
                <span className="tabular-nums text-foreground">{g.value}%</span>
              </div>
              <Progress value={g.value} className="h-1.5" />
              <p className="mt-1 text-[10px] text-muted-foreground">{g.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-card rounded-2xl p-5" aria-label="Motivation">
        <h2 className="text-lg font-semibold text-foreground">Motivation</h2>
        <p className="mt-3 text-sm italic leading-relaxed text-muted-foreground">
          “{motivation.quote}”
        </p>
        <div className="mt-4 space-y-2 text-sm">
          <p>
            <span className="text-muted-foreground">Achievement · </span>
            <span className="text-foreground">{motivation.achievement}</span>
          </p>
          <p>
            <span className="text-muted-foreground">Next milestone · </span>
            <span className="text-foreground">{motivation.milestone}</span>
          </p>
          <p className="text-green-400">{motivation.rankLift}</p>
        </div>
      </section>
    </div>
  )
}
