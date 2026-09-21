"use client"

import type { DivisionId } from "./data"
import { specialtyById, specialtyIcons } from "./specialty-data"
import { Button } from "@/components/ui/button"

export function DivisionSpecialtySection({
  id,
  accent,
}: {
  id: DivisionId
  accent: string
}) {
  const section = specialtyById[id]
  const Icon = specialtyIcons[id]

  return (
    <section className="glass-card rounded-2xl p-5 md:p-6" aria-label={section.title}>
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: `color-mix(in oklab, ${accent} 18%, transparent)`, color: accent }}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-foreground">{section.title}</h2>
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">{section.subtitle}</p>
          </div>
        </div>
        <Button size="sm" variant="outline">
          {id === "q1" ? "View prizes" : id === "q2" ? "Browse jobs" : "Browse roles"}
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {section.items.map((item) => (
          <article
            key={item.title}
            className="rounded-xl border border-border/60 bg-secondary/20 p-4 transition-colors hover:border-border"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{item.meta}</p>
              </div>
              {item.highlight && (
                <span
                  className="shrink-0 rounded-md px-2 py-0.5 text-[11px] font-semibold tabular-nums"
                  style={{
                    color: accent,
                    background: `color-mix(in oklab, ${accent} 14%, transparent)`,
                  }}
                >
                  {item.highlight}
                </span>
              )}
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
