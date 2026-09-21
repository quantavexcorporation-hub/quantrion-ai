"use client"

import { useEffect, useState } from "react"
import { Cable, CheckCircle2, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

type ConnectionsPayload = {
  howItWorks?: string
  connections?: {
    supabaseConfigured: boolean
    openaiConfigured: boolean
    anthropicConfigured: boolean
    groqConfigured: boolean
  }
  lectureCognisReady?: boolean
  authReady?: boolean
  nextSteps?: string[]
}

export function ConnectionsStatus() {
  const [data, setData] = useState<ConnectionsPayload | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    void (async () => {
      try {
        const res = await fetch("/api/system/connections", { cache: "no-store" })
        const json = (await res.json()) as ConnectionsPayload
        if (!res.ok) {
          setError("Could not read connection status")
          return
        }
        setData(json)
      } catch {
        setError("Could not reach connection status API")
      }
    })()
  }, [])

  const c = data?.connections

  return (
    <div className="glass-card rounded-xl border border-border/60 p-5 md:col-span-2">
      <div className="mb-3 flex items-center gap-2">
        <Cable className="h-4 w-4 text-cyan-300" />
        <p className="panel-title">API & database connections</p>
      </div>
      <p className="text-sm text-muted-foreground">
        {data?.howItWorks ||
          "Keys stay in your local .env. Agent mode only edits code — it does not use your OpenAI login."}
      </p>

      {error && <p className="mt-3 text-sm text-rose-300">{error}</p>}

      {c && (
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          <StatusRow label="Supabase (auth / DB)" ok={c.supabaseConfigured} />
          <StatusRow label="OpenAI (LectureCognis, MCQ)" ok={c.openaiConfigured} />
          <StatusRow label="Anthropic" ok={c.anthropicConfigured} />
          <StatusRow label="Groq" ok={c.groqConfigured} />
        </ul>
      )}

      {data?.nextSteps && data.nextSteps.length > 0 && (
        <div className="mt-4 rounded-lg border border-amber-400/25 bg-amber-400/5 p-3">
          <p className="text-xs font-medium text-amber-100">To connect for real</p>
          <ol className="mt-2 list-decimal space-y-1 pl-4 text-xs text-muted-foreground">
            {data.nextSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      )}

      {!error && !c && (
        <p className="mt-3 text-sm text-muted-foreground">Checking .env on this server…</p>
      )}
    </div>
  )
}

function StatusRow({ label, ok }: { label: string; ok: boolean }) {
  return (
    <li
      className={cn(
        "flex items-center gap-2 rounded-lg border px-3 py-2 text-sm",
        ok
          ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-100"
          : "border-border/50 bg-secondary/30 text-muted-foreground",
      )}
    >
      {ok ? (
        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-300" />
      ) : (
        <XCircle className="h-4 w-4 shrink-0 text-slate-500" />
      )}
      <span>
        {label}: <strong className="font-medium">{ok ? "connected" : "not set"}</strong>
      </span>
    </li>
  )
}
