"use client"

import { ProgressRing } from "./progress-ring"
import { retentionFactors } from "./data"

export function RetentionStrengthCard() {
  return (
    <section id="retention" className="q-fade-up scroll-mt-24" style={{ animationDelay: "270ms" }}>
      <div className="mb-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Section 12
        </p>
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Retention Strength Dashboard
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          The signal that matters — how deeply this topic is locked in.
        </p>
      </div>

      <div className="glass-card rounded-2xl p-5 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:items-center">
          <div className="flex justify-center">
            <ProgressRing value={92} label="Retention Strength" color="#22C55E" size={180} />
          </div>

          <div className="space-y-5">
            <div className="grid gap-2 sm:grid-cols-2">
              {retentionFactors.map((factor) => (
                <div
                  key={factor.label}
                  className="flex items-center justify-between rounded-lg border border-border/60 bg-secondary/25 px-3 py-2"
                >
                  <span className="text-xs text-muted-foreground">{factor.label}</span>
                  <span className="text-sm font-semibold tabular-nums text-foreground">
                    {factor.value}%
                  </span>
                </div>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { label: "Strong Concepts", value: "Impulse, F=ma", tone: "text-green-400" },
                { label: "Weak Concepts", value: "Variable mass", tone: "text-amber-400" },
                { label: "Needs Revision", value: "Pseudo force", tone: "text-rose-400" },
                { label: "Mastered", value: "Elevator N", tone: "text-sky-400" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-border/60 p-3">
                  <p className="text-[11px] text-muted-foreground">{item.label}</p>
                  <p className={`mt-1 text-sm font-medium ${item.tone}`}>{item.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-primary">
                AI Recommendations
              </p>
              <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                <li>Revise in 2 days</li>
                <li>Watch AI animation for variable mass</li>
                <li>Practice 10 impulse graph questions</li>
                <li>Read 2-minute summary before sleep</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
