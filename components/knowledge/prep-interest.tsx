"use client"

import { useState } from "react"
import type { KnowledgeEntry } from "@/lib/knowledge/catalog"

const FOCUS_KEY = "quantrion-focus"

export function rememberFocus(name: string) {
  try {
    window.localStorage.setItem(FOCUS_KEY, name)
  } catch {
    // Private mode can block storage. The form still submits.
  }
}

export function readFocus() {
  try {
    return window.localStorage.getItem(FOCUS_KEY)
  } catch {
    return null
  }
}

export function PrepInterest({ entry }: { entry: KnowledgeEntry }) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")
  const [message, setMessage] = useState("")

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setStatus("saving")
    setMessage("")
    rememberFocus(entry.name)
    try {
      const res = await fetch("/api/prep-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          kind: entry.kind,
          slug: entry.slug,
          name: entry.name,
        }),
      })
      const json = await res.json().catch(() => null)
      if (!res.ok) {
        setStatus("error")
        setMessage(json?.error || "Could not save that email.")
        return
      }
      setStatus("saved")
      setMessage(`You're on the list for ${entry.name}. Prep is not open yet.`)
      setEmail("")
    } catch {
      setStatus("error")
      setMessage("Could not save that email.")
    }
  }

  return (
    <section className="glass-card rounded-2xl p-5 md:p-6">
      <h2 className="text-sm font-semibold text-foreground">Tell me when prep opens</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Leave an email for {entry.name}. This does not start a paid course.
      </p>
      <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@email.com"
          aria-label="Email for prep updates"
          className="h-10 min-w-0 flex-1 rounded-lg border border-border/70 bg-secondary/30 px-3 text-sm text-foreground outline-none focus:border-sky-400/50"
        />
        <button
          type="submit"
          disabled={status === "saving"}
          className="h-10 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground disabled:opacity-60"
        >
          {status === "saving" ? "Saving…" : "Notify me"}
        </button>
      </form>
      {message && (
        <p className={`mt-2 text-sm ${status === "error" ? "text-red-300" : "text-sky-200"}`}>{message}</p>
      )}
    </section>
  )
}
