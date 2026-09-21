"use client"

import { cn } from "@/lib/utils"
import { evolutionTimeline } from "./data"

export function DnaEvolutionTimeline() {
  return (
    <section className="glass-card mb-6 rounded-2xl p-5" aria-label="DNA evolution timeline">
      <h2 className="text-lg font-semibold tracking-tight text-foreground">DNA Evolution Timeline</h2>
      <p className="mt-1 text-sm text-muted-foreground">How your intelligence profile evolved</p>
      <ol className="mt-5 flex flex-col gap-3 md:flex-row md:items-stretch md:gap-0">
        {evolutionTimeline.map((step, i) => (
          <li key={step.label} className="flex flex-1 items-stretch">
            <div
              className={cn(
                "w-full rounded-xl border p-3",
                i === evolutionTimeline.length - 1
                  ? "border-primary/40 bg-primary/10"
                  : "border-border/60 bg-secondary/20"
              )}
            >
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{step.label}</p>
              <p className="mt-1 text-xl font-semibold tabular-nums text-foreground">{step.score}</p>
              <p className="mt-1 text-xs text-muted-foreground">{step.note}</p>
            </div>
            {i < evolutionTimeline.length - 1 && (
              <div className="hidden w-4 items-center justify-center text-muted-foreground/40 md:flex" aria-hidden>
                →
              </div>
            )}
          </li>
        ))}
      </ol>
    </section>
  )
}
