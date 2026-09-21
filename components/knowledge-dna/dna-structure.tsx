"use client"

import { TrendingDown, TrendingUp, Minus } from "lucide-react"
import { cn } from "@/lib/utils"
import { dnaAttributes } from "./data"

export function DnaStructure() {
  return (
    <section className="mb-6" aria-label="Knowledge DNA structure">
      <div className="mb-3">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Knowledge DNA Structure
        </h2>
        <p className="text-sm text-muted-foreground">
          Interactive academic identity · score, growth, insight, expected lift
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {dnaAttributes.map((attr) => (
          <article
            key={attr.name}
            className="glass-card rounded-xl p-4 transition-transform hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs font-medium text-foreground">{attr.name}</p>
              {attr.trend === "up" && <TrendingUp className="h-3.5 w-3.5 text-green-400" />}
              {attr.trend === "down" && <TrendingDown className="h-3.5 w-3.5 text-rose-400" />}
              {attr.trend === "flat" && <Minus className="h-3.5 w-3.5 text-muted-foreground" />}
            </div>
            <p className="mt-2 text-2xl font-semibold tabular-nums text-foreground">{attr.score}%</p>
            <p
              className={cn(
                "text-[11px] font-medium",
                attr.growth >= 0 ? "text-green-400" : "text-rose-400"
              )}
            >
              {attr.growth >= 0 ? "+" : ""}
              {attr.growth}% growth
            </p>
            <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">{attr.insight}</p>
            <p className="mt-2 text-[10px] text-primary">Expected · {attr.expected}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
