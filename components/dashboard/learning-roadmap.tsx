"use client"

import { Check, Circle, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { learningPath } from "./command-data"

export function LearningRoadmap() {
  return (
    <section className="glass-card rounded-2xl p-5" aria-label="AI learning path">
      <div className="mb-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">AI Learning Path</h2>
        <p className="text-sm text-muted-foreground">Your next moves in the closed-loop system</p>
      </div>
      <ol className="flex flex-col gap-2 md:flex-row md:items-stretch md:gap-0">
        {learningPath.map((step, i) => (
          <li key={step.id} className="flex flex-1 items-stretch md:items-center">
            <button
              type="button"
              className={cn(
                "w-full rounded-xl border p-3 text-left transition-colors",
                step.status === "current" && "border-primary/40 bg-primary/10",
                step.status === "done" && "border-green-500/30 bg-green-500/5",
                step.status === "upcoming" && "border-border/60 bg-secondary/20 hover:bg-secondary/40"
              )}
            >
              <span className="flex items-center gap-2">
                <span
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full border",
                    step.status === "done" && "border-green-500/40 text-green-400",
                    step.status === "current" && "border-primary/40 text-primary",
                    step.status === "upcoming" && "border-border text-muted-foreground"
                  )}
                >
                  {step.status === "done" ? <Check className="h-3.5 w-3.5" /> : <Circle className="h-3 w-3" />}
                </span>
                <span className="text-xs font-medium text-foreground">{step.label}</span>
              </span>
              <span className="mt-1 block pl-8 text-xs text-muted-foreground">{step.detail}</span>
            </button>
            {i < learningPath.length - 1 && (
              <div className="hidden items-center px-1 text-muted-foreground/50 md:flex" aria-hidden>
                <ChevronRight className="h-4 w-4" />
              </div>
            )}
          </li>
        ))}
      </ol>
    </section>
  )
}
