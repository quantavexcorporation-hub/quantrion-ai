"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Coins, GraduationCap, PiggyBank } from "lucide-react"
import { ShellLayout } from "@/components/layout/shell-layout"
import { formatINR, readFinance } from "./store"

export function FinanceDashboard() {
  const [ready, setReady] = useState(false)
  const [state, setState] = useState(readFinance)

  useEffect(() => {
    setState(readFinance())
    setReady(true)
  }, [])

  const summary = useMemo(() => {
    const open = state.scholarships.filter((item) => item.status === "planning" || item.status === "applied")
    const awarded = state.scholarships.filter((item) => item.status === "awarded")
    const monthlyEarn = state.earnings.filter((item) => item.monthly).reduce((sum, item) => sum + item.amount, 0)
    const once = state.earnings.filter((item) => !item.monthly).reduce((sum, item) => sum + item.amount, 0)
    const progress = state.wealth.target > 0 ? Math.min(100, Math.round((state.wealth.saved / state.wealth.target) * 100)) : 0
    return { open: open.length, awarded: awarded.reduce((sum, item) => sum + item.amount, 0), monthlyEarn, once, progress }
  }, [state])

  return (
    <ShellLayout
      title="Finance Desk"
      subtitle="One place to fund study, track what you earn, and move a savings goal forward."
      aiStatus="analyzing"
    >
      <div className="grid gap-3 sm:grid-cols-3">
        <Link href="/finance-iq/scholarship" className="glass-card rounded-2xl p-4 hover:border-sky-400/40">
          <GraduationCap className="h-4 w-4 text-sky-300" />
          <p className="mt-3 text-sm font-semibold text-foreground">Scholarship IQ</p>
          <p className="mt-1 text-xs text-muted-foreground">{ready ? `${summary.open} open applications` : "Open applications"}</p>
        </Link>
        <Link href="/finance-iq/earn" className="glass-card rounded-2xl p-4 hover:border-sky-400/40">
          <Coins className="h-4 w-4 text-sky-300" />
          <p className="mt-3 text-sm font-semibold text-foreground">Earn IQ</p>
          <p className="mt-1 text-xs text-muted-foreground">{ready ? `${formatINR(summary.monthlyEarn)} / month` : "Monthly earnings"}</p>
        </Link>
        <Link href="/finance-iq/wealth" className="glass-card rounded-2xl p-4 hover:border-sky-400/40">
          <PiggyBank className="h-4 w-4 text-sky-300" />
          <p className="mt-3 text-sm font-semibold text-foreground">Wealth IQ</p>
          <p className="mt-1 text-xs text-muted-foreground">{ready ? `${summary.progress}% of ${state.wealth.goal}` : "Savings goal"}</p>
        </Link>
      </div>

      <section className="glass-card mt-4 rounded-2xl p-5">
        <h2 className="text-sm font-semibold text-foreground">This month</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div>
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Awarded aid</p>
            <p className="mt-1 text-lg font-semibold text-foreground">{ready ? formatINR(summary.awarded) : "—"}</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Recurring earn</p>
            <p className="mt-1 text-lg font-semibold text-foreground">{ready ? formatINR(summary.monthlyEarn) : "—"}</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">One-time earn</p>
            <p className="mt-1 text-lg font-semibold text-foreground">{ready ? formatINR(summary.once) : "—"}</p>
          </div>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-secondary">
          <div className="h-full rounded-full bg-sky-400" style={{ width: `${ready ? summary.progress : 0}%` }} />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {ready
            ? `${formatINR(state.wealth.saved)} saved toward ${formatINR(state.wealth.target)}.`
            : "Savings progress loads on this device."}
        </p>
      </section>
    </ShellLayout>
  )
}
