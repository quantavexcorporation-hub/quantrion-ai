"use client"

import { learningProgressMetrics } from "./command-data"

export function LearningProgressGrid() {
  return (
    <section aria-label="Learning progress">
      <div className="mb-3">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Learning Progress</h2>
        <p className="text-sm text-muted-foreground">Live signals across the Quantrion loop</p>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-3">
        {learningProgressMetrics.map((m) => (
          <div key={m.label} className="q-surface rounded-xl p-3.5">
            <p className="text-[11px] text-muted-foreground">{m.label}</p>
            <p className="mt-1 text-xl font-semibold tabular-nums tracking-tight text-foreground">
              {typeof m.value === "number" && m.value >= 1000
                ? m.value.toLocaleString()
                : m.value}
              {m.suffix}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
