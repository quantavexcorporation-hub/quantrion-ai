"use client"

import { behaviourSignals, cognitiveCards } from "./data"

export function CognitiveAndBehaviour() {
  return (
    <div className="mb-6 grid gap-6 lg:grid-cols-2">
      <section className="glass-card rounded-2xl p-5" aria-label="Cognitive performance">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Cognitive Performance</h2>
        <p className="mt-1 text-sm text-muted-foreground">How your mind performs under load</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {cognitiveCards.map((card) => (
            <div key={card.label} className="rounded-xl border border-border/60 bg-secondary/20 p-3">
              <p className="text-[10px] text-muted-foreground">{card.label}</p>
              <p className="mt-1 text-lg font-semibold tabular-nums text-foreground">{card.value}</p>
              <p className="text-[10px] text-muted-foreground">{card.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-card rounded-2xl p-5" aria-label="Learning behaviour engine">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Learning Behaviour Engine
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">Signals that shape personalization</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {behaviourSignals.map((s) => (
            <div key={s.label} className="rounded-xl border border-border/60 bg-secondary/20 px-3 py-2.5">
              <p className="text-[10px] text-muted-foreground">{s.label}</p>
              <p className="mt-0.5 text-sm font-semibold text-foreground">{s.value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
