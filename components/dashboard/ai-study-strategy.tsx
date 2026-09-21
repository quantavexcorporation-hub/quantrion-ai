"use client"

import { Compass, Sparkles } from "lucide-react"
import { studyStrategy } from "./command-data"

export function AIStudyStrategy() {
  return (
    <section className="glass-card rounded-2xl p-5" aria-label="AI study strategy">
      <div className="mb-4 flex items-center gap-2">
        <Compass className="h-4 w-4 text-primary" />
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">AI Study Strategy</h2>
          <p className="text-sm text-muted-foreground">Actionable plan · estimated score lift</p>
        </div>
      </div>
      <ul className="space-y-2">
        {studyStrategy.map((item, i) => (
          <li
            key={item.title}
            className="flex gap-3 rounded-xl border border-border/60 bg-secondary/20 p-3"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
              {i + 1}
            </span>
            <div>
              <p className="text-sm font-medium text-foreground">{item.title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{item.detail}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-green-400">
        <Sparkles className="h-3.5 w-3.5" /> Estimated improvement if followed: +6–9 Progress IQ points
      </p>
    </section>
  )
}
