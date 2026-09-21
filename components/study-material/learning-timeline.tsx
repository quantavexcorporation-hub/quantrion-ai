"use client"

import { Check, Circle, ArrowDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { learningFlow } from "./data"

export function LearningTimeline() {
  return (
    <section id="learning-flow" className="q-fade-up scroll-mt-24" style={{ animationDelay: "60ms" }}>
      <div className="mb-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Section 02
        </p>
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Organized Learning Flow
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Chapter → Topic → Subtopic → Concept → Practice → Revision
        </p>
      </div>

      <div className="glass-card rounded-2xl p-5 md:p-6">
        <ol className="space-y-0">
          {learningFlow.map((step, index) => (
            <li key={step.id} className="relative">
              <button
                type="button"
                className={cn(
                  "group flex w-full items-start gap-4 rounded-xl p-3 text-left transition-colors",
                  step.status === "current" && "bg-primary/10",
                  step.status !== "current" && "hover:bg-secondary/50"
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border",
                    step.status === "done" && "border-green-500/40 bg-green-500/15 text-green-400",
                    step.status === "current" && "border-primary/40 bg-primary/15 text-primary",
                    step.status === "upcoming" && "border-border bg-secondary text-muted-foreground"
                  )}
                >
                  {step.status === "done" ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Circle className="h-3.5 w-3.5" />
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">{step.label}</span>
                    {step.status === "current" && (
                      <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-medium text-primary">
                        Now
                      </span>
                    )}
                  </span>
                  <span className="mt-0.5 block text-sm text-muted-foreground">{step.detail}</span>
                </span>
              </button>
              {index < learningFlow.length - 1 && (
                <div className="ml-7 flex h-5 items-center text-muted-foreground/50" aria-hidden>
                  <ArrowDown className="h-3.5 w-3.5" />
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
