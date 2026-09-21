"use client"

import { cn } from "@/lib/utils"
import { heatmapCells } from "./data"

const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

function cellClass(v: number) {
  if (v >= 5) return "bg-primary/80"
  if (v >= 4) return "bg-primary/55"
  if (v >= 3) return "bg-primary/35"
  if (v >= 2) return "bg-primary/20"
  return "bg-secondary"
}

export function Heatmap() {
  return (
    <div className="glass-card rounded-2xl p-4">
      <p className="panel-title">Topic Frequency Heatmap</p>
      <p className="mt-1 text-xs text-muted-foreground">PYQ intensity across revision days</p>
      <div className="mt-4 space-y-1.5">
        {heatmapCells.map((row, ri) => (
          <div key={ri} className="flex items-center gap-1.5">
            <span className="w-14 shrink-0 text-[10px] text-muted-foreground">
              {["F=ma", "Impulse", "Pseudo", "Friction", "Elevator"][ri]}
            </span>
            <div className="flex flex-1 gap-1.5">
              {row.map((v, ci) => (
                <div
                  key={`${ri}-${ci}`}
                  title={`${labels[ci]}: ${v}`}
                  className={cn("h-6 flex-1 rounded-sm transition-colors", cellClass(v))}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-1.5">
        {labels.map((d) => (
          <span key={d} className="flex-1 text-center text-[10px] text-muted-foreground">
            {d}
          </span>
        ))}
      </div>
    </div>
  )
}
