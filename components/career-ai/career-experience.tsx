"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  BriefcaseBusiness,
  GraduationCap,
  Rocket,
  Sparkles,
  Target,
  TrendingUp,
  ClipboardList,
} from "lucide-react"
import { ShellLayout } from "@/components/layout/shell-layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import {
  DEFAULT_SIGNALS,
  PROFILE_KEY,
  SIGNAL_FIELDS,
  computeCareerMatches,
  topOffers,
  type CareerOffer,
  type CareerRole,
  type LearningSignal,
  type OfferKind,
} from "./career-data"

function offerIcon(kind: OfferKind) {
  switch (kind) {
    case "exam":
      return ClipboardList
    case "future-course":
      return GraduationCap
    default:
      return Rocket
  }
}

function offerChip(kind: OfferKind) {
  switch (kind) {
    case "exam":
      return "border-sky-400/30 bg-sky-500/10 text-sky-200"
    case "future-course":
      return "border-violet-400/30 bg-violet-500/10 text-violet-200"
    default:
      return "border-teal-400/30 bg-teal-500/10 text-teal-200"
  }
}

export function CareerExperience() {
  const [signals, setSignals] = useState<LearningSignal>(DEFAULT_SIGNALS)
  const [analyzing, setAnalyzing] = useState(false)
  const [ready, setReady] = useState(true)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const roles = useMemo(() => computeCareerMatches(signals), [signals])
  const selected = roles.find((r) => r.id === selectedId) ?? roles[0]
  const recommendedOffers = useMemo(() => topOffers(roles, 6), [roles])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(PROFILE_KEY)
      if (raw) setSignals({ ...DEFAULT_SIGNALS, ...(JSON.parse(raw) as LearningSignal) })
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    if (roles[0]) setSelectedId(roles[0].id)
  }, [roles])

  const persistAndAnalyze = async () => {
    setAnalyzing(true)
    setReady(false)
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(signals))
    } catch {
      /* ignore */
    }
    await new Promise((r) => setTimeout(r, 700))
    setReady(true)
    setAnalyzing(false)
  }

  return (
    <ShellLayout
      title="Career AI Suggestions"
      subtitle="From your past learning experience — careers, roles, Future of Industries, Explore Industries, and Exams that move you ahead."
      aiStatus="predicting"
    >
      <div className="space-y-6">
        {/* Hero */}
        <section className="glass-card grid-glow relative overflow-hidden rounded-2xl p-5 md:p-6">
          <div className="pointer-events-none absolute -right-12 -top-10 h-44 w-44 rounded-full bg-emerald-400/15 blur-3xl" />
          <div className="relative flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-[11px] font-medium text-emerald-200">
                <BriefcaseBusiness className="h-3.5 w-3.5" />
                Intelligence Widget · Career recommendation engine
              </div>
              <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                Choose the path that fits how you already learn
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Career AI reads your subject strengths and interests, then suggests roles to pursue —
                plus the Quantrion Exams, Future of Industries, and Explore Industries paths that help you get
                there faster.
              </p>
            </div>
            <div className="grid min-w-0 grid-cols-3 gap-2 sm:min-w-[260px]">
              <MiniStat label="Best match" value={`${roles[0]?.matchScore ?? "—"}%`} />
              <MiniStat label="Roles" value={String(roles.length)} />
              <MiniStat label="Offers" value={String(recommendedOffers.length)} />
            </div>
          </div>
        </section>

        {/* Learning profile */}
        <section className="glass-card rounded-2xl p-5 md:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-emerald-300" />
                <h3 className="font-semibold text-foreground">Your learning experience profile</h3>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Adjust based on past mastery, interests, and exam drive — then run Career AI.
              </p>
            </div>
            <Button onClick={() => void persistAndAnalyze()} disabled={analyzing}>
              {analyzing ? "Analyzing…" : "Generate career suggestions"}
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {SIGNAL_FIELDS.map((field) => (
              <label key={field.key} className="block rounded-xl border border-border/50 bg-secondary/20 p-3">
                <div className="mb-2 flex items-baseline justify-between gap-2">
                  <div>
                    <span className="text-sm font-medium text-foreground">{field.label}</span>
                    <p className="text-[11px] text-muted-foreground">{field.hint}</p>
                  </div>
                  <span className="tabular-nums text-sm text-emerald-300">{signals[field.key]}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={signals[field.key]}
                  onChange={(e) =>
                    setSignals((s) => ({ ...s, [field.key]: Number(e.target.value) }))
                  }
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-emerald-400"
                />
              </label>
            ))}
          </div>
        </section>

        {ready && (
          <>
            {/* Recommended purchase / pathway strip */}
            <section>
              <div className="mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-300" />
                <h3 className="text-lg font-semibold text-foreground">
                  Recommended next steps to get ahead
                </h3>
              </div>
              <p className="mb-4 text-sm text-muted-foreground">
                Personalized Exams, Future of Industries, and Explore Industries matched to your profile —
                pick what compounds your past learning.
              </p>
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {recommendedOffers.map((offer) => (
                  <OfferCard key={`${offer.kind}-${offer.title}`} offer={offer} highlight />
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button asChild variant="secondary" size="sm">
                  <Link href="/q1">Browse all Exams</Link>
                </Button>
                <Button asChild variant="secondary" size="sm">
                  <Link href="/future-courses">Browse Future of Industries</Link>
                </Button>
                <Button asChild variant="secondary" size="sm">
                  <Link href="/q2">Explore Industries</Link>
                </Button>
                <Button asChild variant="secondary" size="sm">
                  <Link href="/space-economy">Browse Space Economy</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/app/upgrade">Upgrade for full access</Link>
                </Button>
              </div>
            </section>

            {/* Career matches */}
            <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Careers matched to you</h3>
                {roles.map((role, i) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedId(role.id)}
                    className={cn(
                      "w-full rounded-2xl border p-4 text-left transition-all hover:-translate-y-0.5",
                      selected?.id === role.id
                        ? "border-emerald-400/40 bg-emerald-500/10"
                        : "border-border/60 bg-card/40 hover:border-emerald-400/25"
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        {i === 0 && (
                          <span className="mb-1 inline-block rounded-md bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                            Best match
                          </span>
                        )}
                        <p className="text-sm font-semibold text-foreground">{role.title}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{role.field}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold tabular-nums text-emerald-300">
                          {role.matchScore}%
                        </p>
                        <p className="text-[10px] text-muted-foreground">match</p>
                      </div>
                    </div>
                    <Progress value={role.matchScore} className="mt-3 h-1.5" />
                  </button>
                ))}
              </div>

              {selected && <RoleDetail role={selected} />}
            </section>
          </>
        )}
      </div>
    </ShellLayout>
  )
}

function RoleDetail({ role }: { role: CareerRole }) {
  return (
    <article className="glass-card rounded-2xl p-5 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{role.title}</h3>
          <p className="text-sm text-muted-foreground">{role.field}</p>
        </div>
        <Badge variant="outline" className="border-emerald-400/30 bg-emerald-500/10 text-emerald-200">
          {role.matchScore}% match
        </Badge>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{role.summary}</p>
      <p className="mt-3 rounded-xl border border-border/50 bg-secondary/25 p-3 text-sm leading-relaxed text-foreground/90">
        <span className="font-medium text-emerald-300">Why you: </span>
        {role.whyYou}
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border/50 bg-background/30 p-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <TrendingUp className="h-3.5 w-3.5 text-sky-300" /> Growth
          </div>
          <p className="mt-1 text-sm font-medium text-foreground">{role.growth}</p>
        </div>
        <div className="rounded-xl border border-border/50 bg-background/30 p-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <BriefcaseBusiness className="h-3.5 w-3.5 text-amber-300" /> Salary band
          </div>
          <p className="mt-1 text-sm font-medium text-foreground">{role.salaryRange}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div>
          <h4 className="text-sm font-semibold text-foreground">Skills to build next</h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {role.skillsToBuild.map((s) => (
              <Badge key={s} variant="outline" className="text-[10px]">
                {s}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground">Roles to pursue</h4>
          <ul className="mt-2 space-y-1.5">
            {role.rolesToPursue.map((r) => (
              <li key={r} className="text-sm text-muted-foreground">
                <span className="text-emerald-300">▸ </span>
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-semibold text-foreground">
          Courses & exams that help this career
        </h4>
        <p className="mt-1 text-xs text-muted-foreground">
          Chosen to increase your readiness — and unlock Quantrion Exam, Future, and Industrial paths.
        </p>
        <div className="mt-3 space-y-3">
          {role.offers.map((offer) => (
            <OfferCard key={`${offer.title}-${offer.href}`} offer={offer} />
          ))}
        </div>
      </div>
    </article>
  )
}

function OfferCard({ offer, highlight }: { offer: CareerOffer; highlight?: boolean }) {
  const Icon = offerIcon(offer.kind)
  return (
    <div
      className={cn(
        "rounded-xl border p-4",
        highlight
          ? "border-border/60 bg-card/50"
          : "border-border/50 bg-secondary/20"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary">
          <Icon className="h-4 w-4 text-foreground" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={cn("rounded-md border px-1.5 py-0.5 text-[10px] font-semibold", offerChip(offer.kind))}>
              {offer.kind === "exam"
                ? "Exams"
                : offer.kind === "future-course"
                  ? "Explore Industries"
                  : "Industrial"}
            </span>
            <span className="text-[10px] text-muted-foreground">{offer.priceLabel}</span>
          </div>
          <p className="mt-1 text-sm font-semibold text-foreground">{offer.title}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{offer.why}</p>
          <Button asChild size="sm" className="mt-3 gap-1.5">
            <Link href={offer.href}>
              {offer.cta}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-xl border border-border/50 bg-secondary/40 px-2 py-2 text-center sm:px-3">
      <p className="text-lg font-semibold tabular-nums text-foreground">{value}</p>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
    </div>
  )
}
