"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ShellLayout } from "@/components/layout/shell-layout"
import { createId, formatINR, readFinance, writeFinance, type Earning } from "./store"

export function EarnIq() {
  const [items, setItems] = useState<Earning[]>([])
  const [source, setSource] = useState("")
  const [amount, setAmount] = useState("")
  const [monthly, setMonthly] = useState(true)

  useEffect(() => {
    setItems(readFinance().earnings)
  }, [])

  function save(next: Earning[]) {
    const state = readFinance()
    state.earnings = next
    writeFinance(state)
    setItems(next)
  }

  const totals = useMemo(() => {
    const month = items.filter((item) => item.monthly).reduce((sum, item) => sum + item.amount, 0)
    const once = items.filter((item) => !item.monthly).reduce((sum, item) => sum + item.amount, 0)
    return { month, once }
  }, [items])

  function add(event: React.FormEvent) {
    event.preventDefault()
    const value = Number(amount)
    if (!source.trim() || !Number.isFinite(value) || value < 0) return
    save([{ id: createId(), source: source.trim(), amount: value, monthly }, ...items])
    setSource("")
    setAmount("")
  }

  return (
    <ShellLayout
      title="Earn IQ"
      subtitle="Record student income so a monthly number is ready before you spend it."
      aiStatus="analyzing"
    >
      <p className="mb-4 text-xs text-muted-foreground">
        Part of <Link href="/finance-iq" className="text-sky-300 hover:text-sky-200">Financial Intelligence</Link>
        {" · "}Monthly {formatINR(totals.month)} · One-time {formatINR(totals.once)}
      </p>
      <form onSubmit={add} className="glass-card grid gap-3 rounded-2xl p-4 sm:grid-cols-[1fr_8rem_auto_auto]">
        <input required value={source} onChange={(event) => setSource(event.target.value)} placeholder="Tutoring, internship, project" aria-label="Income source" className="h-10 rounded-lg border border-border/70 bg-secondary/30 px-3 text-sm" />
        <input required type="number" min="0" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="₹" aria-label="Amount" className="h-10 rounded-lg border border-border/70 bg-secondary/30 px-3 text-sm" />
        <label className="flex h-10 items-center gap-2 text-xs text-muted-foreground">
          <input type="checkbox" checked={monthly} onChange={(event) => setMonthly(event.target.checked)} />
          Monthly
        </label>
        <button type="submit" className="h-10 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground">Add income</button>
      </form>
      <ul className="mt-4 space-y-2">
        {items.length === 0 && <li className="text-sm text-muted-foreground">No income yet. Add the work you can actually do this month.</li>}
        {items.map((item) => (
          <li key={item.id} className="glass-card flex items-center justify-between gap-3 rounded-2xl px-4 py-3">
            <div>
              <p className="text-sm font-medium text-foreground">{item.source}</p>
              <p className="text-xs text-muted-foreground">{item.monthly ? "Every month" : "One time"} · {formatINR(item.amount)}</p>
            </div>
            <button type="button" onClick={() => save(items.filter((row) => row.id !== item.id))} className="text-xs text-muted-foreground hover:text-foreground">Remove</button>
          </li>
        ))}
      </ul>
    </ShellLayout>
  )
}
