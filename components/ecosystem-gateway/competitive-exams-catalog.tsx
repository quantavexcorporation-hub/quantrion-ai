"use client"

import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { BookOpen, ChevronRight, Layers3, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  EXAM_CATALOG,
  EXAM_REGIONS,
  TOTAL_EXAMS,
  type ExamCategory,
} from "./exam-catalog"

export function CompetitiveExamsCatalog({
  accent,
  externalQuery = "",
}: {
  accent: string
  externalQuery?: string
}) {
  const [region, setRegion] = useState<(typeof EXAM_REGIONS)[number]>("All")
  const [activeId, setActiveId] = useState(EXAM_CATALOG[0].id)
  const [localQuery, setLocalQuery] = useState("")
  const [selectedExam, setSelectedExam] = useState<string | null>(null)

  const query = (externalQuery || localQuery).trim().toLowerCase()

  const scoped = useMemo(() => {
    if (region === "All") return EXAM_CATALOG
    return EXAM_CATALOG.filter((c) => c.region === region)
  }, [region])

  const filtered = useMemo(() => {
    if (!query) return scoped
    return scoped
      .map((cat) => ({
        ...cat,
        exams: cat.exams.filter(
          (e) =>
            e.name.toLowerCase().includes(query) ||
            e.detail.toLowerCase().includes(query) ||
            cat.title.toLowerCase().includes(query),
        ),
      }))
      .filter((cat) => cat.exams.length > 0)
  }, [query, scoped])

  const active: ExamCategory | null =
    filtered.find((c) => c.id === activeId) ?? filtered[0] ?? null

  useEffect(() => {
    if (active && active.id !== activeId) setActiveId(active.id)
  }, [active, activeId])

  const matchCount = filtered.reduce((n, c) => n + c.exams.length, 0)

  return (
    <section aria-label="Global competitive exams catalog" className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.22em]"
            style={{ color: accent }}
          >
            Global Exam Atlas
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Competitive Exams Worldwide
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {TOTAL_EXAMS}+ highly reputed exams that millions of students prepare for every year —
            India gateways, US/UK admissions, language tests, finance credentials, medical
            licensing, olympiads, and more.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-secondary/30 px-3 py-1.5">
            <Layers3 className="h-3.5 w-3.5" style={{ color: accent }} />
            {filtered.length} categories
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-secondary/30 px-3 py-1.5">
            <BookOpen className="h-3.5 w-3.5" style={{ color: accent }} />
            {query ? `${matchCount} matches` : `${TOTAL_EXAMS} exams`}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {EXAM_REGIONS.map((r) => {
          const on = region === r
          return (
            <Button
              key={r}
              size="sm"
              variant="outline"
              onClick={() => {
                setRegion(r)
                setSelectedExam(null)
              }}
              className={cn(
                "rounded-full border-border/60 bg-transparent text-xs",
                on ? "text-foreground" : "text-muted-foreground",
              )}
              style={
                on
                  ? {
                      borderColor: `color-mix(in oklab, ${accent} 45%, transparent)`,
                      background: `color-mix(in oklab, ${accent} 14%, transparent)`,
                      color: accent,
                    }
                  : undefined
              }
            >
              {r}
            </Button>
          )
        })}
      </div>

      {!externalQuery && (
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            placeholder="Search — JEE, SAT, IELTS, CFA, USMLE, Gaokao…"
            className="pl-9"
            aria-label="Search competitive exams"
          />
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/40">
        <div className="grid lg:grid-cols-[280px_1fr]">
          <aside className="border-b border-border/60 bg-secondary/15 lg:border-b-0 lg:border-r">
            <div className="max-h-[420px] overflow-y-auto p-2 [scrollbar-width:thin] lg:max-h-[640px]">
              {filtered.map((cat) => {
                const on = active?.id === cat.id
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setActiveId(cat.id)
                      setSelectedExam(null)
                    }}
                    className={cn(
                      "mb-1 flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition-colors",
                      on
                        ? "text-foreground"
                        : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground",
                    )}
                    style={
                      on
                        ? {
                            background: `color-mix(in oklab, ${accent} 14%, transparent)`,
                            boxShadow: `inset 2px 0 0 ${accent}`,
                          }
                        : undefined
                    }
                  >
                    <span className="text-base leading-none" aria-hidden>
                      {cat.emoji}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">{cat.title}</span>
                      <span className="block text-[10px] text-muted-foreground">
                        {cat.exams.length} exams · {cat.region}
                      </span>
                    </span>
                  </button>
                )
              })}
              {filtered.length === 0 && (
                <p className="px-3 py-6 text-sm text-muted-foreground">No categories match.</p>
              )}
            </div>
          </aside>

          <div className="relative min-h-[360px] p-4 md:p-6">
            <div
              className="pointer-events-none absolute inset-0 opacity-50"
              style={{
                background: `radial-gradient(ellipse at top right, color-mix(in oklab, ${accent} 14%, transparent), transparent 55%)`,
              }}
              aria-hidden
            />
            <AnimatePresence mode="wait">
              {active ? (
                <motion.div
                  key={active.id + query + region}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22 }}
                  className="relative z-10"
                >
                  <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-2xl leading-none">{active.emoji}</p>
                      <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
                        {active.title}
                      </h3>
                      <p className="mt-1.5 max-w-xl text-sm text-muted-foreground">{active.blurb}</p>
                    </div>
                    <span
                      className="rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider"
                      style={{
                        borderColor: `color-mix(in oklab, ${accent} 40%, transparent)`,
                        color: accent,
                        background: `color-mix(in oklab, ${accent} 12%, transparent)`,
                      }}
                    >
                      {active.exams.length} exams
                    </span>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                    {active.exams.map((exam, i) => {
                      const open = selectedExam === exam.name
                      return (
                        <button
                          key={exam.name}
                          type="button"
                          onClick={() => setSelectedExam(open ? null : exam.name)}
                          className={cn(
                            "rounded-xl border px-3.5 py-3.5 text-left transition-all",
                            open
                              ? "border-transparent shadow-lg"
                              : "border-border/50 bg-background/40 hover:border-border hover:bg-secondary/30",
                          )}
                          style={
                            open
                              ? {
                                  background: `linear-gradient(145deg, color-mix(in oklab, ${accent} 16%, transparent), color-mix(in oklab, ${accent} 4%, transparent))`,
                                }
                              : undefined
                          }
                        >
                          <div className="flex items-start gap-2">
                            <span
                              className="mt-0.5 font-mono text-[10px] tabular-nums text-muted-foreground/80"
                              style={open ? { color: accent } : undefined}
                            >
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium leading-snug text-foreground">
                                {exam.name}
                              </p>
                              <p className="mt-1 text-[11px] text-muted-foreground">{exam.detail}</p>
                              {open && (
                                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                                  High-reputation exam with large annual preparation cohorts.
                                  Quantrion Competitive Exams maps adaptive practice, strategy, and
                                  readiness signals for pathways like {exam.name}.
                                </p>
                              )}
                            </div>
                            <ChevronRight
                              className={cn(
                                "mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform",
                                open && "rotate-90",
                              )}
                              style={open ? { color: accent } : undefined}
                            />
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </motion.div>
              ) : (
                <p className="relative z-10 text-sm text-muted-foreground">
                  Adjust filters to browse the exam atlas.
                </p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
