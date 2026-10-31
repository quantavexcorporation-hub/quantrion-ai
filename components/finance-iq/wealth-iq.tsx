"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ShellLayout } from "@/components/layout/shell-layout"
import { formatINR, readFinance, writeFinance, type WealthPlan } from "./store"

export function WealthIq() {
  const [plan, setPlan] = useState<WealthPlan>({ goal: "", target: 0, saved: 0, monthly: 0 })
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setPlan(readFinance().wealth)
    setReady(true)
  }, [])

  function update(next: WealthPlan) {
    const state = readFinance()
    state.wealth = next
    writeFinance(state)
    setPlan(next)
  }

  const months = useMemo(() => {
    const gap = Math.max(plan.target - plan.saved, 0)
    if (plan.monthly <= 0) return null
    return Math.ceil(gap / plan.monthly)
  }, [plan])

  const progress = plan.target > 0 ? Math.min(100, Math.round((plan.saved / plan.target) * 100)) : 0

  return (
    <ShellLayout
      title="Wealth IQ"
      subtitle="Set one savings goal and see how many months the current contribution needs."
      aiStatus="analyzing"
    >
      <p className="mb-4 text-xs text-muted-foreground">
        Part of <Link href="/finance-iq" className="text-sky-300 hover:text-sky-200">Finance IQ</Link>
      </p>
      <form
        className="glass-card grid gap-3 rounded-2xl p-4 sm:grid-cols-2"
        onSubmit={(event) => {
          event.preventDefault()
          update({
            goal: plan.goal.trim() || "Savings goal",
            target: Math.max(0, plan.target),
            saved: Math.max(0, plan.saved),
            monthly: Math.max(0, plan.monthly),
          })
        }}
      >
        <label className="text-xs text-muted-foreground">
          Goal
          <input value={plan.goal} onChange={(event) => setPlan({ ...plan, goal: event.target.value })} className="mt-1 h-10 w-full rounded-lg border border-border/70 bg-secondary/30 px-3 text-sm text-foreground" />
        </label>
        <label className="text-xs text-muted-foreground">
          Target ₹
          <input type="number" min="0" value={ready ? plan.target : ""} onChange={(event) => setPlan({ ...plan, target: Number(event.target.value) })} className="mt-1 h-10 w-full rounded-lg border border-border/70 bg-secondary/30 px-3 text-sm text-foreground" />
        </label>
        <label className="text-xs text-muted-foreground">
          Already saved ₹
          <input type="number" min="0" value={ready ? plan.saved : ""} onChange={(event) => setPlan({ ...plan, saved: Number(event.target.value) })} className="mt-1 h-10 w-full rounded-lg border border-border/70 bg-secondary/30 px-3 text-sm text-foreground" />
        </label>
        <label className="text-xs text-muted-foreground">
          Save each month ₹
          <input type="number" min="0" value={ready ? plan.monthly : ""} onChange={(event) => setPlan({ ...plan, monthly: Number(event.target.value) })} className="mt-1 h-10 w-full rounded-lg border border-border/70 bg-secondary/30 px-3 text-sm text-foreground" />
        </label>
        <button type="submit" className="h-10 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground sm:col-span-2">Save plan</button>
      </form>
      <section className="glass-card mt-4 rounded-2xl p-5">
        <p className="text-sm font-medium text-foreground">{plan.goal || "Savings goal"}</p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
          <div className="h-full rounded-full bg-sky-400" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          {formatINR(plan.saved)} of {formatINR(plan.target)} · {progress}%
        </p>
        <p className="mt-1 text-sm text-foreground">
          {months === null
            ? "Add a monthly amount to see the timeline."
            : months === 0
              ? "This goal is already funded."
              : `${months} month${months === 1 ? "" : "s"} at ${formatINR(plan.monthly)} / month.`}
        </p>
      </section>
    </ShellLayout>
  )
}
