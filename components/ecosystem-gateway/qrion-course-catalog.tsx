"use client"

import { useEffect, useMemo, useState, type CSSProperties } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { BookOpen, ChevronRight, Factory, Layers3, Orbit, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
  INDUSTRIAL_COURSE_COUNT,
  SPACE_COURSE_COUNT,
  SPACE_INDUSTRIAL_CATALOG,
  TOTAL_SPACE_COURSES,
  type CoursePillar,
  type SpaceCourseCategory,
} from "./qrion-space-catalog"

type PillarFilter = "all" | CoursePillar

export function QrionCourseCatalog({
  accent,
  externalQuery = "",
  lockedPillar,
}: {
  accent: string
  externalQuery?: string
  /** When set, only that pillar is shown (no All / Space / Industrial tabs). */
  lockedPillar?: CoursePillar
}) {
  const [pillar, setPillar] = useState<PillarFilter>(lockedPillar ?? "all")
  const [activeId, setActiveId] = useState(() => {
    const first = lockedPillar
      ? SPACE_INDUSTRIAL_CATALOG.find((c) => c.pillar === lockedPillar)
      : SPACE_INDUSTRIAL_CATALOG[0]
    return first?.id ?? SPACE_INDUSTRIAL_CATALOG[0].id
  })
  const [localQuery, setLocalQuery] = useState("")
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)

  useEffect(() => {
    if (lockedPillar) setPillar(lockedPillar)
  }, [lockedPillar])

  const query = (externalQuery || localQuery).trim().toLowerCase()

  const scopedCatalog = useMemo(() => {
    const base = lockedPillar ?? pillar
    if (base === "all") return SPACE_INDUSTRIAL_CATALOG
    return SPACE_INDUSTRIAL_CATALOG.filter((c) => c.pillar === base)
  }, [pillar, lockedPillar])

  const filteredCategories = useMemo(() => {
    if (!query) return scopedCatalog
    return scopedCatalog
      .map((cat) => ({
        ...cat,
        courses: cat.courses.filter(
          (c) =>
            c.toLowerCase().includes(query) ||
            cat.title.toLowerCase().includes(query),
        ),
      }))
      .filter((cat) => cat.courses.length > 0)
  }, [query, scopedCatalog])

  const active =
    filteredCategories.find((c) => c.id === activeId) ?? filteredCategories[0] ?? null

  useEffect(() => {
    if (active && active.id !== activeId) setActiveId(active.id)
  }, [active, activeId])

  const matchCount = filteredCategories.reduce((n, c) => n + c.courses.length, 0)
  const effectivePillar = lockedPillar ?? pillar
  const visibleCourseTotal =
    effectivePillar === "space"
      ? SPACE_COURSE_COUNT
      : effectivePillar === "industrial"
        ? INDUSTRIAL_COURSE_COUNT
        : TOTAL_SPACE_COURSES

  const headline =
    lockedPillar === "industrial"
      ? "Explore Industries"
      : lockedPillar === "space"
        ? "Space Technology Courses"
        : "Space & Industry Courses"

  const subtitle =
    lockedPillar === "industrial"
      ? `${INDUSTRIAL_COURSE_COUNT}+ courses across industries — healthcare, IT & AI, manufacturing, finance, biotech, defense, and more.`
      : lockedPillar === "space"
        ? `${SPACE_COURSE_COUNT}+ elite modules across rockets, satellites, orbitals, Moon & Mars programs, and the space economy.`
        : `${TOTAL_SPACE_COURSES}+ elite modules across ${SPACE_INDUSTRIAL_CATALOG.length} domains.`

  return (
    <section
      aria-label={
        lockedPillar === "industrial"
          ? "Explore industries catalog"
          : lockedPillar === "space"
            ? "Space technology course catalog"
            : "Space and industrial course catalog"
      }
      className="space-y-5"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.22em]"
            style={{ color: accent }}
          >
            Curriculum Atlas
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            {headline}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-secondary/30 px-3 py-1.5">
            <Layers3 className="h-3.5 w-3.5" style={{ color: accent }} />
            {filteredCategories.length} domains
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-secondary/30 px-3 py-1.5">
            <BookOpen className="h-3.5 w-3.5" style={{ color: accent }} />
            {query ? `${matchCount} matches` : `${visibleCourseTotal} courses`}
          </span>
        </div>
      </div>

      {!lockedPillar && (
        <div className="flex flex-wrap gap-2">
          {(
            [
              { id: "all", label: "All courses", icon: Layers3 },
              { id: "space", label: "Space", icon: Orbit },
              { id: "industrial", label: "Industrial", icon: Factory },
            ] as const
          ).map((tab) => {
            const Icon = tab.icon
            const on = pillar === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setPillar(tab.id)
                  setSelectedCourse(null)
                }}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                  on
                    ? "text-foreground"
                    : "border-border/60 bg-transparent text-muted-foreground hover:text-foreground",
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
                <Icon className="h-3.5 w-3.5" />
                {tab.label}
              </button>
            )
          })}
        </div>
      )}

      {!externalQuery && (
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            placeholder={
              lockedPillar === "industrial"
                ? "Search — healthcare, AI, robotics, finance, law…"
                : lockedPillar === "space"
                  ? "Search — rockets, satellites, Mars…"
                  : "Search courses…"
            }
            className="pl-9"
            aria-label="Search courses"
          />
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/40 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
        <div className="grid lg:grid-cols-[280px_1fr]">
          <aside className="border-b border-border/60 bg-secondary/15 lg:border-b-0 lg:border-r">
            <div className="max-h-[420px] overflow-y-auto p-2 [scrollbar-width:thin] lg:max-h-[640px]">
              {filteredCategories.map((cat) => (
                <CategoryButton
                  key={cat.id}
                  cat={cat}
                  active={active?.id === cat.id}
                  accent={accent}
                  onSelect={() => {
                    setActiveId(cat.id)
                    setSelectedCourse(null)
                  }}
                />
              ))}
              {filteredCategories.length === 0 && (
                <p className="px-3 py-6 text-sm text-muted-foreground">No domains match that search.</p>
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
                  key={active.id + query + pillar}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22 }}
                  className="relative z-10"
                >
                  <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-2xl leading-none">{active.emoji}</p>
                        <span className="rounded-full border border-border/50 px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                          {active.pillar}
                        </span>
                      </div>
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
                      {active.courses.length} modules
                    </span>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                    {active.courses.map((course, i) => {
                      const open = selectedCourse === course
                      return (
                        <button
                          key={course}
                          type="button"
                          onClick={() => setSelectedCourse(open ? null : course)}
                          className={cn(
                            "group rounded-xl border px-3.5 py-3.5 text-left transition-all",
                            open
                              ? "border-transparent shadow-lg"
                              : "border-border/50 bg-background/40 hover:border-border hover:bg-secondary/30",
                          )}
                          style={
                            {
                              background: open
                                ? `linear-gradient(145deg, color-mix(in oklab, ${accent} 16%, transparent), color-mix(in oklab, ${accent} 4%, transparent))`
                                : undefined,
                            } as CSSProperties
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
                                {course}
                              </p>
                              {open && (
                                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                                  Elite track module inside {active.title}. Build literacy, systems
                                  intuition, and career-ready fluency for the space–industrial era.
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
                  Adjust your search to browse the curriculum.
                </p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

function CategoryButton({
  cat,
  active,
  accent,
  onSelect,
}: {
  cat: SpaceCourseCategory
  active: boolean
  accent: string
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "mb-1 flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition-colors",
        active ? "text-foreground" : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground",
      )}
      style={
        active
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
          {cat.courses.length} courses · {cat.pillar}
        </span>
      </span>
    </button>
  )
}
