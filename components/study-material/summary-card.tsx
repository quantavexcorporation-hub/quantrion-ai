"use client"

import { useState } from "react"
import { GitBranch, Map, Network, Sparkles, Workflow } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { summaryModes, type SummaryMode } from "./data"

const kindIcon = {
  text: Sparkles,
  visual: Sparkles,
  map: Map,
  flow: Workflow,
  tree: GitBranch,
}

export function SummaryCard() {
  const [active, setActive] = useState<SummaryMode | null>(null)

  return (
    <section id="summaries" className="q-fade-up scroll-mt-24" style={{ animationDelay: "110ms" }}>
      <div className="mb-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Section 04
        </p>
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Smart Summaries</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Choose depth — from 30 seconds to a full concept tree.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {summaryModes.map((mode) => {
          const Icon = kindIcon[mode.kind] ?? Network
          return (
            <button
              key={mode.id}
              type="button"
              onClick={() => setActive(mode)}
              className="glass-card rounded-2xl p-4 text-left transition-transform hover:-translate-y-0.5"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/15">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <p className="mt-3 text-sm font-semibold text-foreground">{mode.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{mode.description}</p>
              <p className="mt-3 text-[11px] font-medium uppercase tracking-wider text-sky-400">
                {mode.duration}
              </p>
            </button>
          )
        })}
      </div>

      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="glass-card max-w-lg border-border">
          <DialogHeader>
            <DialogTitle>{active?.title}</DialogTitle>
            <DialogDescription>{active?.description}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              Newton&apos;s Second Law links force to the rate of change of momentum. For constant mass,
              this becomes F = ma. For variable mass or short interactions, think in impulses.
            </p>
            <div className="rounded-xl border border-border/70 bg-secondary/40 p-3">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Exam lens</p>
              <p className="mt-1 text-foreground">
                Prefer impulse when given F–t graphs. Prefer F=ma when acceleration is constant.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
