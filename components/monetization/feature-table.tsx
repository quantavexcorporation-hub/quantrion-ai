"use client"

import { cn } from "@/lib/utils"

type Row = {
  feature: string
  free: string
  pro: string
  elite: string
}

const rows: Row[] = [
  { feature: "AI Depth", free: "Basic", pro: "Advanced", elite: "Predictive" },
  { feature: "Analytics Level", free: "Starter", pro: "Full", elite: "Deep" },
  { feature: "Test Access", free: "Limited", pro: "Mock tests", elite: "Simulations" },
  { feature: "Personalization", free: "Community", pro: "Personal strategy", elite: "Priority + rank model" },
]

export function FeatureTable() {
  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-foreground">Feature comparison</div>
          <div className="mt-1 text-xs text-muted-foreground">Choose your intelligence level — keep it simple.</div>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
        <div className="grid grid-cols-4 bg-white/[0.02] text-[11px] font-semibold text-muted-foreground">
          <div className="px-4 py-3">Feature</div>
          <div className="px-4 py-3">Free</div>
          <div className="px-4 py-3">Pro</div>
          <div className="px-4 py-3">Elite</div>
        </div>
        {rows.map((r, idx) => (
          <div
            key={r.feature}
            className={cn(
              "grid grid-cols-4 text-xs",
              idx % 2 === 0 ? "bg-white/[0.01]" : "bg-transparent"
            )}
          >
            <div className="px-4 py-3 font-medium text-foreground/90">{r.feature}</div>
            <div className="px-4 py-3 text-muted-foreground">{r.free}</div>
            <div className="px-4 py-3 text-muted-foreground">{r.pro}</div>
            <div className="px-4 py-3 text-muted-foreground">{r.elite}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

