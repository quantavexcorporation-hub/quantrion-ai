"use client"

import { Sparkles } from "lucide-react"
import { aiPatterns, hiddenPotential } from "./data"

export function PatternsAndPotential() {
  return (
    <div className="mb-6 grid gap-6 lg:grid-cols-2">
      <section className="glass-card rounded-2xl p-5" aria-label="AI pattern detection">
        <div className="mb-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <h2 className="text-lg font-semibold tracking-tight text-foreground">AI Pattern Detection</h2>
        </div>
        <ul className="space-y-2">
          {aiPatterns.map((pattern) => (
            <li
              key={pattern}
              className="rounded-xl border border-border/60 bg-secondary/20 px-3 py-2.5 text-sm text-muted-foreground"
            >
              {pattern}
            </li>
          ))}
        </ul>
      </section>

      <section className="glass-card rounded-2xl p-5" aria-label="Hidden potential">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Hidden Potential</h2>
        <p className="mt-1 text-sm text-muted-foreground">AI forecasts across your DNA</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {hiddenPotential.map((item) => (
            <div key={item.label} className="rounded-xl border border-primary/20 bg-primary/5 p-3">
              <p className="text-[10px] text-primary">{item.label}</p>
              <p className="mt-1 text-sm font-medium text-foreground">{item.value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
