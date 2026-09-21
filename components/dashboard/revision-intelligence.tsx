"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { revisionQueue } from "./command-data"

export function RevisionIntelligence() {
  return (
    <section className="q-surface rounded-2xl p-5" aria-label="Revision intelligence">
      <h2 className="text-lg font-semibold tracking-tight text-foreground">Revision Intelligence</h2>
      <p className="mt-1 text-sm text-muted-foreground">Spaced repetition · one-click revise</p>
      <ul className="mt-4 space-y-2">
        {revisionQueue.map((item) => (
          <li
            key={item.topic}
            className={cn(
              "flex items-center justify-between gap-3 rounded-xl border px-3 py-2.5",
              item.status === "due" && "border-amber-500/30 bg-amber-500/10",
              item.status === "missed" && "border-rose-500/30 bg-rose-500/10",
              item.status === "upcoming" && "border-border/60 bg-secondary/20"
            )}
          >
            <div>
              <p className="text-xs text-muted-foreground">{item.when}</p>
              <p className="text-sm font-medium text-foreground">{item.topic}</p>
              <p className="text-[11px] text-muted-foreground">Retention {item.retention}%</p>
            </div>
            <Button size="sm" variant="outline" className="h-7 text-[11px]">
              Revise
            </Button>
          </li>
        ))}
      </ul>
    </section>
  )
}
