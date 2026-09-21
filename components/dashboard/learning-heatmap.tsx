"use client"

import { cn } from "@/lib/utils"
import { heatmapWeeks } from "./command-data"

const days = ["M", "T", "W", "T", "F", "S", "S"]

function cell(v: number) {
  if (v >= 4) return "bg-primary/80"
  if (v >= 3) return "bg-primary/55"
  if (v >= 2) return "bg-primary/35"
  if (v >= 1) return "bg-primary/20"
  return "bg-secondary"
}

export function LearningHeatmap() {
  return (
    <section className="q-surface rounded-2xl p-5" aria-label="Learning heatmap">
      <h2 className="text-lg font-semibold tracking-tight text-foreground">Learning Heatmap</h2>
      <p className="mt-1 text-sm text-muted-foreground">Daily consistency · last 12 weeks</p>
      <div className="mt-4 overflow-x-auto">
        <div className="mb-1 flex gap-1 pl-0">
          {days.map((d, i) => (
            <span key={`${d}-${i}`} className="w-3.5 text-center text-[9px] text-muted-foreground">
              {d}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-1">
          {heatmapWeeks.map((week, wi) => (
            <div key={wi} className="flex gap-1">
              {week.map((v, di) => (
                <div
                  key={`${wi}-${di}`}
                  title={`Intensity ${v}`}
                  className={cn(
                    "h-3.5 w-3.5 rounded-[3px] transition-transform hover:scale-125",
                    cell(v)
                  )}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 text-[10px] text-muted-foreground">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((v) => (
          <span key={v} className={cn("h-3 w-3 rounded-[3px]", cell(v))} />
        ))}
        <span>More</span>
      </div>
    </section>
  )
}
