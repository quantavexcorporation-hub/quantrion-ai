"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { genomeNodes } from "./data"

const statusColor = {
  strong: "border-green-500/40 bg-green-500/15 text-green-300",
  learning: "border-amber-500/40 bg-amber-500/15 text-amber-300",
  weak: "border-rose-500/40 bg-rose-500/15 text-rose-300",
}

export function ConceptGenome() {
  const [selected, setSelected] = useState(genomeNodes[2]?.id)

  const active = genomeNodes.find((n) => n.id === selected) ?? genomeNodes[0]

  return (
    <section className="glass-card mb-6 rounded-2xl p-5" aria-label="Concept genome">
      <h2 className="text-lg font-semibold tracking-tight text-foreground">Concept Genome</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Subject → Chapter → Topic → Concept · click a node
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {genomeNodes.map((node) => (
          <button
            key={node.id}
            type="button"
            onClick={() => setSelected(node.id)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-xs font-medium transition-transform hover:-translate-y-0.5",
              statusColor[node.status],
              selected === node.id && "ring-2 ring-primary/50"
            )}
          >
            <span className="opacity-70">{node.level}</span>
            <span className="ml-1.5">{node.label}</span>
          </button>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-border/60 bg-secondary/20 p-4">
        <p className="text-sm font-semibold text-foreground">{active.label}</p>
        <p className="mt-1 text-xs capitalize text-muted-foreground">
          {active.level} · {active.status}
        </p>
        <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
          {["Mastery", "Mistakes", "Videos", "Study Material", "PYQs", "Revision", "AI Explanation"].map(
            (action) => (
              <span
                key={action}
                className="rounded-md border border-border/70 bg-card/60 px-2 py-1 text-muted-foreground"
              >
                {action}
              </span>
            )
          )}
        </div>
      </div>
      <div className="mt-3 flex gap-3 text-[10px] text-muted-foreground">
        <span className="text-green-400">● Mastered</span>
        <span className="text-amber-400">● Learning</span>
        <span className="text-rose-400">● Weak</span>
      </div>
    </section>
  )
}
