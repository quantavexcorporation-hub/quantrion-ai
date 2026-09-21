"use client"

import { useState } from "react"
import { Sparkles, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { aiExplainOptions } from "./data"

interface AIExplainDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selection?: string
}

export function AIExplainDrawer({
  open,
  onOpenChange,
  selection = "Newton's Second Law paragraph",
}: AIExplainDrawerProps) {
  const [mode, setMode] = useState(aiExplainOptions[0])

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full border-border bg-card sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" /> Explain with AI
          </SheetTitle>
          <SheetDescription>
            Context-aware explanation for: <span className="text-foreground">{selection}</span>
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4 px-1">
          <div className="flex flex-wrap gap-2">
            {aiExplainOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setMode(option)}
                className={cn(
                  "rounded-lg border px-2.5 py-1 text-xs transition-colors",
                  mode === option
                    ? "border-primary/40 bg-primary/15 text-primary"
                    : "border-border text-muted-foreground hover:text-foreground"
                )}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="rounded-xl border border-border/70 bg-secondary/30 p-4 text-sm leading-relaxed text-muted-foreground">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-primary">{mode}</p>
            <p>
              Think of force as how quickly momentum changes. If a cricket ball slows down over a longer
              time (soft hands), the force felt is smaller — same Δp, larger Δt. That&apos;s why
              impulse problems love F–t graphs.
            </p>
          </div>

          <Button className="w-full gap-2" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4" /> Done
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export function InContentAISection({ onExplain }: { onExplain: () => void }) {
  return (
    <section id="ai-inline" className="q-fade-up scroll-mt-24" style={{ animationDelay: "230ms" }}>
      <div className="mb-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Section 10
        </p>
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          In-Content AI Explanation
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Every paragraph, formula, and diagram can open a floating AI panel.
        </p>
      </div>

      <div className="glass-card space-y-4 rounded-2xl p-5 md:p-6">
        {[
          {
            label: "Paragraph",
            text: "The acceleration of a body is proportional to the net force and inversely proportional to its mass.",
          },
          {
            label: "Formula",
            text: "F = dp/dt = ma (constant mass)",
          },
          {
            label: "Diagram",
            text: "Free-body diagram of a block on an accelerating truck (pseudo force opposite to acceleration).",
          },
        ].map((block) => (
          <div
            key={block.label}
            className="rounded-xl border border-border/70 bg-secondary/20 p-4"
          >
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{block.label}</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground">{block.text}</p>
            <button
              type="button"
              onClick={onExplain}
              className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-primary/25 bg-primary/10 px-2.5 py-1 text-xs text-primary transition-colors hover:bg-primary/15"
            >
              <Sparkles className="h-3.5 w-3.5" /> Explain with AI
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
