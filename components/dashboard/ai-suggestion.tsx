"use client"

import { Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AISuggestion() {
  return (
    <div className="q-surface h-full p-6">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-primary" />
        <h3 className="font-semibold text-foreground">AI Suggestion</h3>
      </div>

      <div className="space-y-4">
        <div className="rounded-lg border border-primary/15 bg-primary/[0.06] p-4">
          <p className="text-sm leading-relaxed text-foreground">
            Based on your learning style, you would benefit most from{" "}
            <span className="font-medium text-primary">Active Recall Practice</span>.
            Your retention improves 34% when you test yourself before reviewing.
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">Today&apos;s Focus</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Review Integration Techniques (1h)
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Practice Differential Equations (45m)
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Quick revision: Thermodynamics (30m)
            </li>
          </ul>
        </div>

        <Button variant="ghost" size="sm" className="p-0 text-primary hover:text-primary/80">
          View full study plan
          <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </div>
    </div>
  )
}
