"use client"

import { ArrowDown, ShieldCheck, Sparkles, Target } from "lucide-react"

export function RelevantMaterialCard() {
  return (
    <section id="relevant" className="q-fade-up scroll-mt-24" style={{ animationDelay: "90ms" }}>
      <div className="mb-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Section 03
        </p>
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Only Relevant Material
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          AI removes noise and surfaces exam-priority concepts.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
        <div className="glass-card rounded-2xl p-5 md:p-6">
          <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
            <div className="rounded-xl border border-border/70 bg-secondary/30 p-4 text-center">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Traditional Notes</p>
              <p className="mt-2 text-3xl font-semibold tabular-nums text-foreground">100</p>
              <p className="text-sm text-muted-foreground">pages</p>
            </div>
            <div className="flex justify-center text-muted-foreground" aria-hidden>
              <ArrowDown className="h-5 w-5 rotate-0 sm:-rotate-90" />
            </div>
            <div className="rounded-xl border border-primary/30 bg-primary/10 p-4 text-center">
              <p className="text-xs uppercase tracking-wider text-primary">Quantrion Notes</p>
              <p className="mt-2 text-3xl font-semibold tabular-nums text-foreground">15</p>
              <p className="text-sm text-muted-foreground">pages</p>
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            <span className="font-medium text-green-400">85% noise removed</span> · same exam coverage
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: Sparkles, title: "Noise Removed", value: "85%", note: "Redundant theory cut" },
            { icon: Target, title: "Exam Priority", value: "High", note: "Weighted for JEE Adv" },
            { icon: ShieldCheck, title: "Concept Weight", value: "9.2/10", note: "Frequency × difficulty" },
            { icon: Sparkles, title: "Confidence", value: "92%", note: "AI relevance score" },
          ].map((item) => (
            <div key={item.title} className="glass-card rounded-xl p-4">
              <item.icon className="h-4 w-4 text-primary" />
              <p className="mt-3 text-xs text-muted-foreground">{item.title}</p>
              <p className="text-lg font-semibold text-foreground">{item.value}</p>
              <p className="text-xs text-muted-foreground">{item.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
