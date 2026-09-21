"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { conceptBands } from "./command-data"

export function WeakTopics() {
  return (
    <div className="q-surface h-full p-6">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h3 className="font-semibold text-foreground">Weak Concept Detection</h3>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">AI ranked</span>
      </div>

      <div className="space-y-4">
        {(
          [
            { key: "weak", title: "Weak Topics", items: conceptBands.weak, tone: "text-amber-400" },
            { key: "medium", title: "Medium Topics", items: conceptBands.medium, tone: "text-sky-400" },
            { key: "strong", title: "Strong Topics", items: conceptBands.strong, tone: "text-green-400" },
          ] as const
        ).map((band) => (
          <div key={band.key}>
            <p className={cn("mb-2 text-xs font-medium", band.tone)}>{band.title}</p>
            <div className="space-y-2">
              {band.items.map((topic) => (
                <div
                  key={topic.name}
                  className="rounded-lg border border-border/60 bg-secondary/25 p-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium text-foreground">{topic.name}</p>
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        Confidence {topic.confidence}% · Mistakes {topic.mistakes} · Due {topic.due} ·{" "}
                        {topic.difficulty}
                      </p>
                    </div>
                    {band.key === "weak" && (
                      <Button size="sm" variant="outline" className="h-7 shrink-0 text-[11px]">
                        {topic.action}
                      </Button>
                    )}
                  </div>
                  <div className="mt-2 h-1 overflow-hidden rounded-full bg-secondary">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-700",
                        band.key === "weak" && "bg-amber-400",
                        band.key === "medium" && "bg-sky-400",
                        band.key === "strong" && "bg-green-400"
                      )}
                      style={{ width: `${topic.confidence}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
