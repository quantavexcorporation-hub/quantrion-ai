"use client"

import { useEffect, useMemo, useState } from "react"
import { ArrowRight, Sparkles, Loader2 } from "lucide-react"
import { ShellLayout } from "@/components/layout/shell-layout"
import { PricingCard } from "@/components/monetization/pricing-card"
import { FeatureTable } from "@/components/monetization/feature-table"
import { AddOnCard } from "@/components/monetization/addon-card"
import { ToggleSwitch } from "@/components/monetization/toggle-switch"
import { ADDONS, PLANS } from "@/components/monetization/data"
import type { AddOnId, BillingCycle, PlanId } from "@/components/monetization/types"
import { readAddOns, readCycle, readPlan, writeAddOns, writeCycle, writePlan } from "@/components/monetization/storage"
import { cn } from "@/lib/utils"
import { useUser } from "@/hooks/use-user"

export default function UpgradePage() {
  const [cycle, setCycle] = useState<BillingCycle>("monthly")
  const [plan, setPlan] = useState<PlanId>("pro")
  const [addons, setAddons] = useState<AddOnId[]>([])
  const [loading, setLoading] = useState(false)
  const { profile, isAuthenticated } = useUser()
  const user = profile ? { name: profile.name ?? "User", email: profile.email } : null

  useEffect(() => {
    const storedCycle = readCycle()
    const storedPlan = readPlan()
    const storedAddOns = readAddOns()
    if (storedCycle) setCycle(storedCycle)
    if (storedPlan) setPlan(storedPlan)
    if (storedAddOns.length) setAddons(storedAddOns)
  }, [])

  const handleUpgrade = async () => {
    if (!isAuthenticated || !user) {
      alert("Please sign in to upgrade your plan")
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId: plan,
          billingCycle: cycle,
          addOnIds: addons,
        }),
      })

      const data = await response.json()
      
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error(data.error || 'Failed to create checkout session')
      }
    } catch (error: any) {
      console.error('Upgrade error:', error)
      alert(error.message || 'Failed to process upgrade')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => writeCycle(cycle), [cycle])
  useEffect(() => writePlan(plan), [plan])
  useEffect(() => writeAddOns(addons), [addons])

  const selectedPlan = useMemo(() => PLANS.find((p) => p.id === plan) ?? PLANS[1], [plan])

  const total = useMemo(() => {
    const base = cycle === "monthly" ? selectedPlan.monthlyPrice : selectedPlan.yearlyPrice
    const add = addons
      .map((id) => ADDONS.find((a) => a.id === id)?.priceMonthly ?? 0)
      .reduce((a, b) => a + b, 0)
    return cycle === "monthly" ? base + add : base + add * 10
  }, [addons, cycle, selectedPlan.monthlyPrice, selectedPlan.yearlyPrice])

  return (
    <ShellLayout
      title="Upgrade Your Intelligence System"
      subtitle="Unlock deeper insights, smarter strategies, and faster results"
      aiStatus="optimizing"
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-200">
              <Sparkles className="h-3.5 w-3.5" />
              System upgrade interface
            </div>
            <div className="text-xs text-muted-foreground">
              Choose a tier, then attach AI modules to customize your preparation.
            </div>
          </div>

          <ToggleSwitch<BillingCycle>
            value={cycle}
            options={[
              { value: "monthly", label: "Monthly" },
              { value: "yearly", label: "Yearly" },
            ]}
            onChange={setCycle}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {PLANS.map((p) => (
            <PricingCard key={p.id} plan={p} cycle={cycle} selected={plan === p.id} onSelect={() => setPlan(p.id)} />
          ))}
        </div>

        <FeatureTable />

        <div className="glass-card rounded-2xl p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-sm font-semibold text-foreground">AI Power Modules</div>
              <div className="mt-1 text-xs text-muted-foreground">
                Add targeted intelligence boosts — upgrade only what you need.
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              Selected: <span className="text-foreground/90">{addons.length}</span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            {ADDONS.map((a) => {
              const selected = addons.includes(a.id)
              return (
                <AddOnCard
                  key={a.id}
                  addon={a}
                  selected={selected}
                  onToggle={() => {
                    setAddons((prev) => (prev.includes(a.id) ? prev.filter((x) => x !== a.id) : [...prev, a.id]))
                  }}
                />
              )
            })}
          </div>
        </div>

        <div className="glass-card grid-glow rounded-2xl p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm font-semibold text-foreground">Start your AI-powered preparation today</div>
              <div className="mt-1 text-xs text-muted-foreground">
                You’re selecting{" "}
                <span className="text-foreground/90">
                  {selectedPlan.name} ({cycle})
                </span>{" "}
                + <span className="text-foreground/90">{addons.length}</span> modules.
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] px-4 text-sm font-semibold text-foreground transition-colors hover:bg-white/[0.04]"
              >
                Start Free
              </button>
              <button
                type="button"
                onClick={handleUpgrade}
                disabled={loading}
                className={cn(
                  "inline-flex h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold text-white transition-all",
                  "bg-gradient-to-r from-blue-500 to-purple-500 shadow-[0_18px_55px_rgba(59,130,246,0.18)] hover:brightness-110",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Upgrade Now
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-xs text-muted-foreground">
            Estimated total:{" "}
            <span className="text-foreground/90">
              ₹{new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(total)}
            </span>{" "}
            {cycle === "monthly" ? "/mo" : "/yr"}
            <span className="ml-2 text-muted-foreground/80">• Payments integration can be plugged in later.</span>
          </div>
        </div>
      </div>
    </ShellLayout>
  )
}

