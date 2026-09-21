"use client"

import { personalities } from "./data"

export function LearningPersonality() {
  return (
    <section className="mb-6" aria-label="Learning personality">
      <div className="mb-3">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Learning Personality</h2>
        <p className="text-sm text-muted-foreground">AI-identified styles that shape how you learn</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {personalities.map((p) => (
          <article key={p.title} className="glass-card rounded-xl p-4">
            <h3 className="text-sm font-semibold text-foreground">{p.title}</h3>
            <p className="mt-2 text-[11px] text-muted-foreground">
              <span className="text-green-400">Strengths · </span>
              {p.strengths}
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              <span className="text-amber-400">Watch · </span>
              {p.weaknesses}
            </p>
            <p className="mt-2 rounded-lg border border-primary/20 bg-primary/5 px-2.5 py-1.5 text-[11px] text-primary">
              Optimize · {p.tip}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
