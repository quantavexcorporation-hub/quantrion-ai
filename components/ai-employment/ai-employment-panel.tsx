"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import {
  BriefcaseBusiness,
  CheckCircle2,
  CircleAlert,
  Sparkles,
  Target,
  Bookmark,
  Send,
  MessageSquareQuote,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import {
  DEFAULT_PROFILE,
  DOMAIN_COPY,
  PROFILE_STORAGE_KEY,
  TRACKER_STORAGE_KEY,
  applicationDraft,
  filterJobs,
  getJobById,
  interviewQuestions,
  type ApplicationStatus,
  type EmploymentDomain,
  type JobListing,
  type MatchBreakdown,
  type SeekerProfile,
} from "./employment-data"

type TrackerItem = {
  jobId: string
  status: ApplicationStatus
  updatedAt: string
  note?: string
}

export function AiEmploymentPanel({
  domain,
  accent,
}: {
  domain: EmploymentDomain
  accent: string
}) {
  const copy = DOMAIN_COPY[domain]
  const [profile, setProfile] = useState<SeekerProfile>(DEFAULT_PROFILE)
  const [query, setQuery] = useState("")
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [tracker, setTracker] = useState<TrackerItem[]>([])
  const [tab, setTab] = useState<"feed" | "tracker" | "assist">("feed")
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const p = localStorage.getItem(PROFILE_STORAGE_KEY)
      if (p) setProfile({ ...DEFAULT_PROFILE, ...(JSON.parse(p) as SeekerProfile) })
      const t = localStorage.getItem(TRACKER_STORAGE_KEY)
      if (t) setTracker(JSON.parse(t) as TrackerItem[])
    } catch {
      /* ignore */
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile))
    } catch {
      /* ignore */
    }
  }, [profile, loaded])

  useEffect(() => {
    if (!loaded) return
    try {
      localStorage.setItem(TRACKER_STORAGE_KEY, JSON.stringify(tracker))
    } catch {
      /* ignore */
    }
  }, [tracker, loaded])

  const ranked = useMemo(() => filterJobs(domain, profile, query), [domain, profile, query])
  const selected =
    ranked.find((r) => r.job.id === selectedId) ?? ranked[0] ?? null

  useEffect(() => {
    if (ranked[0] && !ranked.some((r) => r.job.id === selectedId)) {
      setSelectedId(ranked[0].job.id)
    }
  }, [ranked, selectedId])

  const upsertTracker = (jobId: string, status: ApplicationStatus) => {
    setTracker((prev) => {
      const existing = prev.find((t) => t.jobId === jobId)
      if (existing) {
        return prev.map((t) =>
          t.jobId === jobId ? { ...t, status, updatedAt: new Date().toISOString() } : t,
        )
      }
      return [...prev, { jobId, status, updatedAt: new Date().toISOString() }]
    })
  }

  const trackedStatus = (jobId: string) => tracker.find((t) => t.jobId === jobId)?.status

  return (
    <section
      aria-label="AI employment discovery"
      className="space-y-5 rounded-3xl border border-border/60 bg-card/30 p-5 md:p-6"
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em]"
            style={{ color: accent }}
          >
            <Sparkles className="h-3.5 w-3.5" />
            Quatrion AI Employment · Add-on
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            {copy.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy.subtitle}</p>
          <p className="mt-2 text-xs text-muted-foreground/80">
            Matching is deterministic and explainable from your profile text. It does not invent
            experience. Deeper Career AI signals live in{" "}
            <Link href="/career-ai" className="underline underline-offset-2 hover:text-foreground">
              Career AI Suggestions
            </Link>
            .
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(
            [
              { id: "feed", label: "Recommended" },
              { id: "assist", label: "Apply assist" },
              { id: "tracker", label: "Tracker" },
            ] as const
          ).map((t) => (
            <Button
              key={t.id}
              size="sm"
              variant="outline"
              onClick={() => setTab(t.id)}
              className={cn("rounded-full text-xs", tab === t.id && "border-transparent")}
              style={
                tab === t.id
                  ? {
                      background: `color-mix(in oklab, ${accent} 16%, transparent)`,
                      color: accent,
                      borderColor: `color-mix(in oklab, ${accent} 40%, transparent)`,
                    }
                  : undefined
              }
            >
              {t.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
        {/* Profile */}
        <aside className="space-y-3 rounded-2xl border border-border/60 bg-background/40 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            AI Career Profile
          </p>
          <Field
            label="Headline"
            value={profile.headline}
            onChange={(v) => setProfile((p) => ({ ...p, headline: v }))}
          />
          <Field
            label="Location"
            value={profile.location}
            onChange={(v) => setProfile((p) => ({ ...p, location: v }))}
          />
          <label className="block text-[11px] text-muted-foreground">
            Level
            <select
              className="mt-1 w-full rounded-lg border border-border/60 bg-background px-3 py-2 text-sm"
              value={profile.level}
              onChange={(e) =>
                setProfile((p) => ({
                  ...p,
                  level: e.target.value as SeekerProfile["level"],
                }))
              }
            >
              {(["Intern", "Junior", "Mid", "Senior"] as const).map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-[11px] text-muted-foreground">
            Work mode
            <select
              className="mt-1 w-full rounded-lg border border-border/60 bg-background px-3 py-2 text-sm"
              value={profile.mode}
              onChange={(e) =>
                setProfile((p) => ({
                  ...p,
                  mode: e.target.value as SeekerProfile["mode"],
                }))
              }
            >
              {(["Any", "Remote", "Hybrid", "On-site"] as const).map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </label>
          <Field
            label="Skills (comma-separated, truthful only)"
            value={profile.skills}
            onChange={(v) => setProfile((p) => ({ ...p, skills: v }))}
          />
          <Field
            label="Career goals"
            value={profile.goals}
            onChange={(v) => setProfile((p) => ({ ...p, goals: v }))}
          />
        </aside>

        <div className="space-y-4">
          {tab === "feed" && (
            <>
              <div className="relative">
                <Target className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder='Natural search — e.g. "remote React jobs" or "photonic computing internship"'
                  className="pl-9"
                  aria-label="AI job search"
                />
              </div>

              <div className="grid gap-4 xl:grid-cols-[1fr_1.1fr]">
                <ul className="space-y-2">
                  {ranked.map(({ job, match }) => {
                    const active = selected?.job.id === job.id
                    return (
                      <li key={job.id}>
                        <button
                          type="button"
                          onClick={() => setSelectedId(job.id)}
                          className={cn(
                            "w-full rounded-xl border p-3.5 text-left transition",
                            active
                              ? "border-transparent shadow-sm"
                              : "border-border/60 bg-background/30 hover:bg-secondary/30",
                          )}
                          style={
                            active
                              ? {
                                  background: `color-mix(in oklab, ${accent} 12%, transparent)`,
                                  boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${accent} 35%, transparent)`,
                                }
                              : undefined
                          }
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-sm font-semibold text-foreground">{job.title}</p>
                              <p className="mt-0.5 text-xs text-muted-foreground">
                                {job.company} · {job.location} · {job.mode}
                              </p>
                            </div>
                            <span className="shrink-0 text-sm font-semibold" style={{ color: accent }}>
                              {match.overall}%
                            </span>
                          </div>
                          <p className="mt-2 text-[11px] text-muted-foreground">{match.label}</p>
                        </button>
                      </li>
                    )
                  })}
                  {ranked.length === 0 && (
                    <p className="rounded-xl border border-dashed border-border/60 p-4 text-sm text-muted-foreground">
                      No jobs matched that search in this pathway. Try broader skills or clear the
                      query.
                    </p>
                  )}
                </ul>

                {selected && (
                  <JobDetail
                    job={selected.job}
                    match={selected.match}
                    accent={accent}
                    status={trackedStatus(selected.job.id)}
                    onSave={() => upsertTracker(selected.job.id, "Saved")}
                    onApply={() => {
                      upsertTracker(selected.job.id, "Applied")
                      setTab("assist")
                    }}
                  />
                )}
              </div>
            </>
          )}

          {tab === "assist" && selected && (
            <AssistPanel
              job={selected.job}
              match={selected.match}
              profile={profile}
              accent={accent}
              onMarkApplied={() => upsertTracker(selected.job.id, "Applied")}
            />
          )}

          {tab === "assist" && !selected && (
            <p className="text-sm text-muted-foreground">Select a recommended job first.</p>
          )}

          {tab === "tracker" && (
            <TrackerPanel
              tracker={tracker}
              accent={accent}
              onStatus={(jobId, status) => upsertTracker(jobId, status)}
            />
          )}
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <label className="block text-[11px] text-muted-foreground">
      {label}
      <Input
        className="mt-1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  )
}

function JobDetail({
  job,
  match,
  accent,
  status,
  onSave,
  onApply,
}: {
  job: JobListing
  match: MatchBreakdown
  accent: string
  status?: ApplicationStatus
  onSave: () => void
  onApply: () => void
}) {
  return (
    <article className="rounded-2xl border border-border/60 bg-background/40 p-4 md:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{job.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {job.company} · {job.salary} · {job.type}
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-semibold" style={{ color: accent }}>
            {match.overall}%
          </p>
          <p className="text-xs text-muted-foreground">{match.label}</p>
        </div>
      </div>

      <p className="mt-3 text-sm text-muted-foreground">{job.summary}</p>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {(
          [
            ["Skills", match.skills],
            ["Experience", match.experience],
            ["Location / mode", match.location],
            ["Goals fit", match.goals],
          ] as const
        ).map(([label, value]) => (
          <div key={label} className="rounded-lg border border-border/50 p-2.5">
            <div className="mb-1 flex justify-between text-[11px] text-muted-foreground">
              <span>{label}</span>
              <span>{value}%</span>
            </div>
            <Progress value={value} className="h-1.5" />
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-foreground">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Why Quatrion recommends this
          </p>
          <ul className="space-y-1.5 text-xs text-muted-foreground">
            {match.strengths.map((s) => (
              <li key={s}>✓ {s}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-foreground">
            <CircleAlert className="h-3.5 w-3.5 text-amber-400" /> Skill gap / next steps
          </p>
          <ul className="space-y-1.5 text-xs text-muted-foreground">
            {match.gaps.map((g) => (
              <li key={g}>⚠ {g}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {job.skills.map((s) => (
          <span
            key={s}
            className="rounded-full border border-border/60 px-2.5 py-1 text-[10px] text-muted-foreground"
          >
            {s}
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Button size="sm" variant="outline" className="gap-1.5" onClick={onSave}>
          <Bookmark className="h-3.5 w-3.5" />
          Save
        </Button>
        <Button
          size="sm"
          className="gap-1.5"
          style={{ background: accent, color: "#041016" }}
          onClick={onApply}
        >
          <Send className="h-3.5 w-3.5" />
          Apply with Quatrion AI
        </Button>
        {status && (
          <span className="self-center text-xs text-muted-foreground">Status: {status}</span>
        )}
      </div>
    </article>
  )
}

function AssistPanel({
  job,
  match,
  profile,
  accent,
  onMarkApplied,
}: {
  job: JobListing
  match: MatchBreakdown
  profile: SeekerProfile
  accent: string
  onMarkApplied: () => void
}) {
  const draft = applicationDraft(job, profile)
  const questions = interviewQuestions(job, profile)

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border/60 bg-background/40 p-4">
        <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <BriefcaseBusiness className="h-4 w-4" style={{ color: accent }} />
          Application assistant · {job.title}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Draft is grounded only in your profile fields. Do not submit claims you cannot defend in
          an interview. Resume match estimate for this role:{" "}
          <span className="font-semibold text-foreground">{match.overall}%</span>
        </p>
        <pre className="mt-3 whitespace-pre-wrap rounded-xl border border-border/50 bg-secondary/20 p-3 text-xs leading-relaxed text-muted-foreground">
          {draft}
        </pre>
        <Button size="sm" className="mt-3 gap-1.5" onClick={onMarkApplied}>
          <Send className="h-3.5 w-3.5" />
          Mark as Applied
        </Button>
      </div>

      <div className="rounded-2xl border border-border/60 bg-background/40 p-4">
        <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <MessageSquareQuote className="h-4 w-4" style={{ color: accent }} />
          Interview preparation
        </p>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          {questions.map((q) => (
            <li key={q} className="rounded-lg border border-border/50 px-3 py-2">
              {q}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function TrackerPanel({
  tracker,
  accent,
  onStatus,
}: {
  tracker: TrackerItem[]
  accent: string
  onStatus: (jobId: string, status: ApplicationStatus) => void
}) {
  const statuses: ApplicationStatus[] = [
    "Saved",
    "Applied",
    "Assessment",
    "Interview",
    "Offer",
    "Rejected",
  ]

  if (!tracker.length) {
    return (
      <p className="rounded-xl border border-dashed border-border/60 p-4 text-sm text-muted-foreground">
        No saved or applied roles yet. Save jobs from Recommended to build your workspace.
      </p>
    )
  }

  return (
    <ul className="space-y-2">
      {tracker.map((t) => {
        const job = getJobById(t.jobId)

        if (!job) return null
        return (
          <li
            key={t.jobId}
            className="flex flex-col gap-2 rounded-xl border border-border/60 bg-background/40 p-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-sm font-medium text-foreground">{job.title}</p>
              <p className="text-xs text-muted-foreground">
                {job.company} · updated {new Date(t.updatedAt).toLocaleDateString()}
              </p>
            </div>
            <select
              className="rounded-lg border border-border/60 bg-background px-2 py-1.5 text-xs"
              value={t.status}
              onChange={(e) => onStatus(t.jobId, e.target.value as ApplicationStatus)}
              style={{ borderColor: `color-mix(in oklab, ${accent} 30%, transparent)` }}
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </li>
        )
      })}
    </ul>
  )
}
