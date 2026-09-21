"use client"

import { AlertTriangle, ArrowDown } from "lucide-react"
import { dependencyLinks } from "./data"

export function DependencyGraph() {
  return (
    <section className="glass-card mb-6 rounded-2xl p-5" aria-label="Knowledge dependency graph">
      <h2 className="text-lg font-semibold tracking-tight text-foreground">
        Knowledge Dependency Graph
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Weak foundations automatically highlight affected downstream concepts
      </p>
      <div className="mt-4 space-y-3">
        {dependencyLinks.map((link) => (
          <div
            key={`${link.from}-${link.to}`}
            className={`rounded-xl border p-3 ${
              link.risk
                ? "border-rose-500/30 bg-rose-500/5"
                : "border-border/60 bg-secondary/20"
            }`}
          >
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="font-medium text-foreground">{link.from}</span>
              <ArrowDown className="h-3.5 w-3.5 rotate-[-90deg] text-muted-foreground" />
              <span className="font-medium text-foreground">{link.to}</span>
              {link.risk && (
                <span className="inline-flex items-center gap-1 rounded-md bg-rose-500/15 px-2 py-0.5 text-[10px] text-rose-300">
                  <AlertTriangle className="h-3 w-3" /> Risk cascade
                </span>
              )}
            </div>
            {link.risk && (
              <p className="mt-2 text-xs text-muted-foreground">
                Because <span className="text-foreground">{link.from}</span> is weak,{" "}
                <span className="text-foreground">{link.to}</span> may underperform until foundations recover.
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
