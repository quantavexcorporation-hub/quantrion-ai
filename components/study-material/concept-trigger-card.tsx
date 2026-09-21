"use client"

import { Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"
import { conceptTriggers } from "./data"

const colorMap = {
  blue: "border-blue-500/25 bg-blue-500/10 text-blue-300",
  sky: "border-sky-500/25 bg-sky-500/10 text-sky-300",
  green: "border-green-500/25 bg-green-500/10 text-green-300",
  amber: "border-amber-500/25 bg-amber-500/10 text-amber-300",
  rose: "border-rose-500/25 bg-rose-500/10 text-rose-300",
}

export function ConceptTriggerCard() {
  return (
    <section id="triggers" className="q-fade-up scroll-mt-24" style={{ animationDelay: "150ms" }}>
      <div className="mb-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Section 06
        </p>
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Concept Triggers</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Memory cues, shortcuts, analogies, and visual hooks.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {conceptTriggers.map((trigger) => (
          <article key={trigger.id} className="glass-card rounded-2xl p-4">
            <div className="flex items-center justify-between gap-2">
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider",
                  colorMap[trigger.color]
                )}
              >
                <Lightbulb className="h-3 w-3" />
                {trigger.kind}
              </span>
            </div>
            <h3 className="mt-3 text-sm font-semibold text-foreground">{trigger.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{trigger.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
