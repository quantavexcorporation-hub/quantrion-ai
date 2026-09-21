"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowLeft, ArrowRight, Search, Sparkles } from "lucide-react"
import { ShellLayout } from "@/components/layout/shell-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { landingById, type DivisionId } from "./data"
import { InteractiveIllustration } from "./interactive-illustration"
import { DivisionSpecialtySection } from "./specialty-section"
import { QrionCourseCatalog } from "./qrion-course-catalog"
import { CompetitiveExamsCatalog } from "./competitive-exams-catalog"
import { AiEmploymentPanel } from "@/components/ai-employment/ai-employment-panel"

export function DivisionLandingPage({ id }: { id: DivisionId }) {
  const data = landingById[id]
  const reduce = useReducedMotion()
  const [query, setQuery] = useState("")

  return (
    <ShellLayout title={data.code} subtitle={data.tagline} aiStatus="analyzing" hideHeader>
      <div className="mx-auto max-w-6xl space-y-8 pb-10">
        <Link
          href="/app/dashboard"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Dashboard
        </Link>

        {/* Hero */}
        <section
          className="glass-card grid-glow relative overflow-hidden rounded-2xl p-6 md:p-8"
          aria-label={`${data.code} hero`}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background: `radial-gradient(circle at 75% 30%, color-mix(in oklab, ${data.accent} 22%, transparent), transparent 55%)`,
            }}
            aria-hidden
          />
          <div className="relative z-10 grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <p className="mb-2 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5" style={{ color: data.accent }} />
                Quantrion Division · {data.code}
              </p>
              <motion.h1
                className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {data.title}
              </motion.h1>
              <p className="mt-2 text-sm font-medium" style={{ color: data.accent }}>
                {data.tagline}
              </p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                {data.heroBody}
              </p>
              {data.searchPlaceholder && (
                <div className="relative mt-5 max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={data.searchPlaceholder}
                    className="pl-9"
                    aria-label="Search division catalog"
                  />
                </div>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                {data.pathways.slice(0, 3).map((p) => (
                  <Button key={p} size="sm" variant={p === data.pathways[0] ? "default" : "outline"}>
                    {p}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex justify-center py-4">
              <div className="origin-center scale-[1.35]">
                <InteractiveIllustration id={id} accent={data.accent} active />
              </div>
            </div>
          </div>
        </section>

        {id === "q1" ? (
          <CompetitiveExamsCatalog accent={data.accent} externalQuery={query} />
        ) : id === "q2" ? (
          <>
            <QrionCourseCatalog accent={data.accent} externalQuery={query} lockedPillar="industrial" />
            <AiEmploymentPanel domain="industrial" accent={data.accent} />
          </>
        ) : id === "qrion" ? (
          <QrionCourseCatalog accent={data.accent} externalQuery={query} lockedPillar="space" />
        ) : null}

        <DivisionSpecialtySection id={id} accent={data.accent} />

        {/* Feature sections */}
        <section aria-label="Division capabilities">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">Capabilities</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {data.sections.map((s, i) => (
              <article
                key={s.title}
                className="glass-card rounded-xl p-4"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <h3 className="text-sm font-semibold text-foreground">{s.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{s.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="glass-card rounded-2xl p-5" aria-label="Research and delivery timeline">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">Pathway</h2>
          <p className="mt-1 text-sm text-muted-foreground">How this layer compounds inside Quantrion</p>
          <ol className="mt-5 grid gap-3 md:grid-cols-4">
            {data.timeline.map((t) => (
              <li key={t.phase} className="rounded-xl border border-border/60 bg-secondary/20 p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: data.accent }}>
                  Phase {t.phase}
                </p>
                <p className="mt-1 text-sm font-medium text-foreground">{t.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{t.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* CTA band */}
        <section
          className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-border/60 p-5 md:flex-row md:items-center"
          style={{
            background: `linear-gradient(120deg, color-mix(in oklab, ${data.accent} 12%, transparent), transparent)`,
          }}
        >
          <div>
            <p className="text-sm font-semibold text-foreground">Ready to enter {data.code}?</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Same account. Same design system. A distinct world within Quantrion.
            </p>
          </div>
          <Button className="gap-1.5">
            Continue <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </section>

        <nav className="flex flex-wrap gap-2" aria-label="Other divisions">
          {(["q1", "q2", "qrion"] as DivisionId[])
            .filter((d) => d !== id)
            .map((d) => (
              <Link
                key={d}
                href={`/${d}`}
                className={cn(
                  "rounded-full border border-border/60 bg-secondary/30 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                )}
              >
                Visit {landingById[d].code}
              </Link>
            ))}
        </nav>
      </div>
    </ShellLayout>
  )
}
