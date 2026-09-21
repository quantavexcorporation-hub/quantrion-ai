"use client"

import { Plus, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import type { AddOn } from "./types"

function formatINR(value: number) {
  return `₹${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value)}`
}

export function AddOnCard({
  addon,
  selected,
  onToggle,
}: {
  addon: AddOn
  selected: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected ? "true" : "false"}
      className={cn(
        "group relative w-full rounded-2xl border bg-white/[0.03] p-4 text-left backdrop-blur-xl transition-all duration-200",
        "border-white/10 hover:-translate-y-0.5 hover:scale-[1.01] hover:border-blue-400/25",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40",
        selected && "border-purple-400/35 shadow-[0_0_0_1px_rgba(139,92,246,0.14),0_0_45px_rgba(59,130,246,0.06)]"
      )}
    >
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" aria-hidden="true" />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-foreground">{addon.name}</div>
          <div className="mt-1 text-xs text-muted-foreground">{addon.description}</div>
          <div className="mt-3 text-xs text-muted-foreground">
            <span className="text-foreground/90">{formatINR(addon.priceMonthly)}</span> /mo
          </div>
        </div>

        <div
          className={cn(
            "mt-0.5 inline-flex h-9 items-center gap-2 rounded-xl border px-3 text-xs font-semibold transition-all",
            selected
              ? "border-purple-400/25 bg-purple-500/10 text-purple-100"
              : "border-white/10 bg-white/[0.02] text-muted-foreground group-hover:text-foreground"
          )}
        >
          {selected ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {selected ? "Added" : "Add"}
        </div>
      </div>
    </button>
  )
}

