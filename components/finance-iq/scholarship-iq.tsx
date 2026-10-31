"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ShellLayout } from "@/components/layout/shell-layout"
import { createId, formatINR, readFinance, writeFinance, type Scholarship, type ScholarshipStatus } from "./store"

const STATUSES: { id: ScholarshipStatus; label: string }[] = [
  { id: "planning", label: "Planning" },
  { id: "applied", label: "Applied" },
  { id: "awarded", label: "Awarded" },
  { id: "closed", label: "Closed" },
]

const empty = { name: "", provider: "", amount: "", deadline: "", status: "planning" as ScholarshipStatus }

export function ScholarshipIq() {
  const [items, setItems] = useState<Scholarship[]>([])
  const [form, setForm] = useState(empty)

  useEffect(() => {
    setItems(readFinance().scholarships)
  }, [])

  function save(next: Scholarship[]) {
    const state = readFinance()
    state.scholarships = next
    writeFinance(state)
    setItems(next)
  }

  function add(event: React.FormEvent) {
    event.preventDefault()
    const amount = Number(form.amount)
    if (!form.name.trim() || !Number.isFinite(amount) || amount < 0) return
    save([
      {
        id: createId(),
        name: form.name.trim(),
        provider: form.provider.trim() || "Unlisted",
        amount,
        deadline: form.deadline,
        status: form.status,
      },
      ...items,
    ])
    setForm(empty)
  }

  return (
    <ShellLayout
      title="Scholarship IQ"
      subtitle="Track applications, deadlines, and awarded aid without mixing them into earnings."
      aiStatus="analyzing"
    >
      <p className="mb-4 text-xs text-muted-foreground">
        Part of <Link href="/finance-iq" className="text-sky-300 hover:text-sky-200">Finance Desk</Link>
      </p>
      <form onSubmit={add} className="glass-card grid gap-3 rounded-2xl p-4 sm:grid-cols-2">
        <input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Scholarship name" aria-label="Scholarship name" className="h-10 rounded-lg border border-border/70 bg-secondary/30 px-3 text-sm" />
        <input value={form.provider} onChange={(event) => setForm({ ...form, provider: event.target.value })} placeholder="Provider" aria-label="Provider" className="h-10 rounded-lg border border-border/70 bg-secondary/30 px-3 text-sm" />
        <input required type="number" min="0" value={form.amount} onChange={(event) => setForm({ ...form, amount: event.target.value })} placeholder="Amount in ₹" aria-label="Amount" className="h-10 rounded-lg border border-border/70 bg-secondary/30 px-3 text-sm" />
        <input type="date" value={form.deadline} onChange={(event) => setForm({ ...form, deadline: event.target.value })} aria-label="Deadline" className="h-10 rounded-lg border border-border/70 bg-secondary/30 px-3 text-sm" />
        <select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as ScholarshipStatus })} aria-label="Status" className="h-10 rounded-lg border border-border/70 bg-secondary/30 px-3 text-sm">
          {STATUSES.map((status) => (
            <option key={status.id} value={status.id}>{status.label}</option>
          ))}
        </select>
        <button type="submit" className="h-10 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground">Add scholarship</button>
      </form>
      <ul className="mt-4 space-y-2">
        {items.length === 0 && <li className="text-sm text-muted-foreground">No scholarships yet. Add the next one you can apply for.</li>}
        {items.map((item) => (
          <li key={item.id} className="glass-card flex flex-col gap-3 rounded-2xl p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">{item.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {item.provider} · {formatINR(item.amount)}
                {item.deadline ? ` · due ${item.deadline}` : ""}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={item.status}
                aria-label={`Status for ${item.name}`}
                onChange={(event) => save(items.map((row) => (row.id === item.id ? { ...row, status: event.target.value as ScholarshipStatus } : row)))}
                className="h-9 rounded-lg border border-border/70 bg-secondary/30 px-2 text-xs"
              >
                {STATUSES.map((status) => (
                  <option key={status.id} value={status.id}>{status.label}</option>
                ))}
              </select>
              <button type="button" onClick={() => save(items.filter((row) => row.id !== item.id))} className="text-xs text-muted-foreground hover:text-foreground">Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </ShellLayout>
  )
}
