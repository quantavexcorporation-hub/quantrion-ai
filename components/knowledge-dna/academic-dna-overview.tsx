"use client"

import { ProgressRing } from "@/components/study-material/progress-ring"
import { dnaOverview } from "./data"

export function AcademicDnaOverview() {
  return (
    <section
      className="glass-card grid-glow q-fade-up mb-6 rounded-2xl p-5 md:p-7"
      aria-label="Academic DNA overview"
    >
      <div className="grid gap-6 md:grid-cols-[200px_1fr] md:items-center">
        <div className="flex justify-center">
          <ProgressRing
            value={dnaOverview.score}
            label="Intelligence Score"
            color="#3B82F6"
            size={168}
          />
        </div>
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Academic DNA Overview
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Student Intelligence Score
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Generated from thousands of learning interactions across videos, notes, mocks, revisions,
            and AI conversations.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "DNA Evolution", value: "Active" },
              { label: "Weekly Growth", value: `+${dnaOverview.weekly}%` },
              { label: "Monthly Growth", value: `+${dnaOverview.monthly}%` },
              { label: "Lifetime Growth", value: `+${dnaOverview.lifetime}%` },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-border/60 bg-secondary/25 px-3 py-2.5"
              >
                <p className="text-[10px] text-muted-foreground">{item.label}</p>
                <p className="mt-0.5 text-sm font-semibold text-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
