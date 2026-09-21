"use client"

import { ChevronRight } from "lucide-react"
import { graphNodes } from "./data"

export function KnowledgeGraph() {
  return (
    <section className="glass-card mb-6 rounded-2xl p-5" aria-label="Book knowledge graph">
      <h2 className="text-lg font-semibold tracking-tight text-foreground">Dynamic Concept Graph</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Chapter → Topic → Concept → PYQs → Tests → Videos → Study Material
      </p>
      <ol className="mt-4 flex flex-col gap-2 md:flex-row md:flex-wrap md:items-center">
        {graphNodes.map((node, i) => (
          <li key={node.id} className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-xl border border-border/70 bg-secondary/30 px-3 py-2 text-left transition-colors hover:border-primary/40"
            >
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{node.label}</p>
              <p className="text-sm font-medium text-foreground">{node.detail}</p>
            </button>
            {i < graphNodes.length - 1 && (
              <ChevronRight className="hidden h-4 w-4 text-muted-foreground/50 md:block" aria-hidden />
            )}
          </li>
        ))}
      </ol>
    </section>
  )
}
