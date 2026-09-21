"use client"

import { Check, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import type { BillingCycle, Plan } from "./types"

function formatINR(value: number) {
  if (value === 0) return "₹0"
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value)
}

export function PricingCard({
  plan,
  cycle,
  selected,
  onSelect,
}: {
  plan: Plan
  cycle: BillingCycle
  selected: boolean
  onSelect: () => void
}) {
  const price = cycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice
  const cadenceLabel = cycle === "monthly" ? "/mo" : "/yr"

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected ? "true" : "false"}
      className={cn(
        "group relative w-full rounded-2xl border p-5 text-left backdrop-blur-xl transition-all duration-200",
        "bg-white/[0.03] border-white/10 hover:-translate-y-0.5 hover:scale-[1.01] hover:border-blue-400/30",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40",
        selected
          ? "border-blue-400/45 shadow-[0_0_0_1px_rgba(59,130,246,0.18),0_0_55px_rgba(139,92,246,0.10)]"
          : "shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_20px_60px_rgba(0,0,0,0.35)]"
      )}
    >
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" aria-hidden="true" />
      {plan.highlight && (
        <div
          className={cn(
            "absolute -inset-px rounded-2xl bg-gradient-to-r from-blue-500/25 to-purple-500/20 opacity-0 blur-sm transition-opacity duration-200",
            selected ? "opacity-100" : "group-hover:opacity-100"
          )}
          aria-hidden="true"
        />
      )}

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="text-xs font-semibold tracking-[0.22em] text-muted-foreground">{plan.name}</div>
              {plan.badge && (
                <div className="inline-flex items-center gap-1 rounded-full border border-blue-400/20 bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold text-blue-200">
                  <Sparkles className="h-3 w-3" />
                  {plan.badge}
                </div>
              )}
            </div>
            <div className="mt-1 text-sm font-semibold text-foreground">{plan.tagline}</div>
          </div>

          <div className="text-right">
            <div className="text-2xl font-semibold tracking-tight text-foreground">
              ₹{formatINR(price)}
              <span className="ml-1 text-xs font-medium text-muted-foreground">{cadenceLabel}</span>
            </div>
            {cycle === "yearly" && plan.monthlyPrice > 0 && (
              <div className="mt-1 text-[10px] text-muted-foreground">Billed yearly • best value</div>
            )}
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {plan.bullets.map((b) => (
            <div key={b} className="flex items-start gap-2 text-xs text-muted-foreground">
              <Check className="mt-0.5 h-3.5 w-3.5 text-blue-300/90" />
              <span>{b}</span>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <div
            className={cn(
              "inline-flex h-10 w-full items-center justify-center rounded-xl px-4 text-sm font-semibold transition-all",
              plan.highlight
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-[0_18px_55px_rgba(59,130,246,0.18)]"
                : "bg-white/[0.04] text-foreground ring-1 ring-inset ring-white/10 hover:bg-white/[0.06]"
            )}
          >
            {plan.cta}
          </div>
        </div>
      </div>
    </button>
  )
}

