"use client"

import { useState } from "react"
import { Sparkles, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { aiInsights } from "./command-data"

export function FloatingAIInsights() {
  const [open, setOpen] = useState(true)
  const [index, setIndex] = useState(0)

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-30 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-lg"
        aria-label="Open AI insights"
      >
        <Sparkles className="h-4 w-4" /> Insights
      </button>
    )
  }

  return (
    <aside
      className={cn(
        "fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-30 w-[min(100%-1.5rem,320px)] rounded-2xl border border-primary/25 bg-card/95 p-4 shadow-2xl backdrop-blur-xl"
      )}
      aria-label="AI insights panel"
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <p className="text-sm font-semibold text-foreground">AI Insights</p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-md p-1 text-muted-foreground hover:text-foreground"
          aria-label="Close insights"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">{aiInsights[index]}</p>
      <div className="mt-3 flex items-center justify-between">
        <p className="text-[10px] text-muted-foreground">
          {index + 1} / {aiInsights.length}
        </p>
        <button
          type="button"
          className="text-xs font-medium text-primary"
          onClick={() => setIndex((i) => (i + 1) % aiInsights.length)}
        >
          Next insight
        </button>
      </div>
    </aside>
  )
}
