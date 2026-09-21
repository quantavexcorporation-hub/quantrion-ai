"use client"

import { mockInsights } from "./command-data"

export function MockTestInsights() {
  return (
    <section className="q-surface rounded-2xl p-5" aria-label="Mock test insights">
      <h2 className="text-lg font-semibold tracking-tight text-foreground">Mock Test Insights</h2>
      <p className="mt-1 text-sm text-muted-foreground">{mockInsights.latest}</p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {[
          { label: "Accuracy", value: `${mockInsights.accuracy}%` },
          { label: "Rank", value: `#${mockInsights.rank}` },
          { label: "Time", value: mockInsights.time },
          { label: "Negative Marks", value: String(mockInsights.negative) },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border border-border/60 bg-secondary/20 px-3 py-2">
            <p className="text-[10px] text-muted-foreground">{s.label}</p>
            <p className="text-sm font-semibold tabular-nums text-foreground">{s.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-3">
          <p className="text-[10px] text-green-400">Strong</p>
          <p className="mt-1 text-xs text-foreground">{mockInsights.strong.join(" · ")}</p>
        </div>
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
          <p className="text-[10px] text-amber-400">Weak</p>
          <p className="mt-1 text-xs text-foreground">{mockInsights.weak.join(" · ")}</p>
        </div>
      </div>
      <div className="mt-3 rounded-lg border border-primary/20 bg-primary/5 p-3">
        <p className="text-[10px] text-primary">Recommended next · Predicted rank</p>
        <p className="mt-1 text-sm text-foreground">
          {mockInsights.next} · <span className="font-semibold">#{mockInsights.predictedRank}</span>
        </p>
      </div>
    </section>
  )
}
