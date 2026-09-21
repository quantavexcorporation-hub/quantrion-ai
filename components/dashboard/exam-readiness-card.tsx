"use client"

import { ProgressRing } from "@/components/study-material/progress-ring"
import { examReadinessFactors } from "./command-data"

export function ExamReadinessCard() {
  const overall = 82
  return (
    <section className="glass-card rounded-2xl p-5 md:p-6" aria-label="Exam readiness">
      <div className="grid gap-6 md:grid-cols-[180px_1fr] md:items-center">
        <div className="flex justify-center">
          <ProgressRing value={overall} label="Exam Readiness" color="#22C55E" size={150} />
        </div>
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">Exam Readiness</h2>
          <p className="mt-1 text-sm text-muted-foreground">Closed-loop score across mastery, mocks, and revision</p>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {examReadinessFactors.map((f) => (
              <div key={f.label} className="rounded-lg border border-border/60 bg-secondary/20 px-2.5 py-2">
                <p className="text-[10px] text-muted-foreground">{f.label}</p>
                <p className="text-sm font-semibold tabular-nums text-foreground">{f.value}%</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="rounded-md bg-green-500/15 px-2 py-1 text-green-400">Ready · Physics core</span>
            <span className="rounded-md bg-amber-500/15 px-2 py-1 text-amber-400">Needs Improvement · Thermo</span>
            <span className="rounded-md bg-rose-500/15 px-2 py-1 text-rose-400">Critical · Organic retention</span>
          </div>
        </div>
      </div>
    </section>
  )
}
