"use client"

import { useState } from "react"
import { Film, Link2, Sparkles, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { pyqItems } from "./data"

export function PYQTimeline() {
  const [selected, setSelected] = useState(pyqItems[pyqItems.length - 1]?.id)

  const active = pyqItems.find((p) => p.id === selected) ?? pyqItems[0]

  return (
    <section id="pyq" className="q-fade-up scroll-mt-24" style={{ animationDelay: "190ms" }}>
      <div className="mb-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Section 08
        </p>
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Previous Year Questions
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Linked directly to Newton&apos;s Laws — year by year.
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-[280px_1fr]">
        <div className="glass-card rounded-2xl p-4">
          <p className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">Timeline</p>
          <ol className="relative space-y-1 border-l border-border/70 pl-4">
            {pyqItems.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setSelected(item.id)}
                  className={cn(
                    "relative -left-4 mb-1 w-[calc(100%+1rem)] rounded-lg px-3 py-2 text-left text-sm transition-colors",
                    selected === item.id
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <span
                    className={cn(
                      "absolute left-0 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full",
                      selected === item.id ? "bg-primary" : "bg-border"
                    )}
                  />
                  <span className="font-medium">PYQ {item.year}</span>
                  <span className="mt-0.5 block text-xs opacity-80">{item.exam}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <article className="glass-card rounded-2xl p-5 md:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="border-primary/30 text-primary">
              {active.year}
            </Badge>
            <Badge variant="outline">{active.difficulty}</Badge>
            <Badge variant="outline" className="gap-1">
              <TrendingUp className="h-3 w-3" /> {active.trend}
            </Badge>
            <Badge variant="outline">Frequency · {active.frequency}</Badge>
          </div>
          <h3 className="mt-4 text-base font-semibold text-foreground">{active.question}</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-border/60 bg-secondary/25 p-3">
              <p className="text-xs text-muted-foreground">Expected similar</p>
              <p className="mt-1 text-sm text-foreground">{active.expectedSimilar}</p>
            </div>
            <div className="rounded-xl border border-border/60 bg-secondary/25 p-3">
              <p className="text-xs text-muted-foreground">Concept connection</p>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-foreground">
                <Link2 className="h-3.5 w-3.5 text-primary" /> Impulse &amp; variable mass
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-lg border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs text-primary"
            >
              <Sparkles className="h-3.5 w-3.5" /> AI Explanation
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              <Film className="h-3.5 w-3.5" /> Video Explanation
            </button>
          </div>
        </article>
      </div>
    </section>
  )
}
