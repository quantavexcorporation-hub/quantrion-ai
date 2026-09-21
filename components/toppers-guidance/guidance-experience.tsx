"use client"

import { useEffect, useMemo, useState } from "react"
import {
  Bookmark,
  BookmarkCheck,
  BriefcaseBusiness,
  Orbit,
  Quote,
  Search,
  Trophy,
} from "lucide-react"
import { ShellLayout } from "@/components/layout/shell-layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  CATEGORY_META,
  MENTOR_GUIDANCE,
  filterGuidance,
  type MentorCategory,
  type MentorGuidance,
} from "./guidance-data"

const HUB_COPY: Record<
  MentorCategory,
  {
    title: string
    subtitle: string
    heroTitle: string
    heroBody: string
    chip: string
    searchPlaceholder: string
    savedKey: string
    accentBlob: string
  }
> = {
  "exam-topper": {
    title: "Toppers Guidance",
    subtitle: "Competitive exam toppers — strategies that produced ranks and results.",
    heroTitle: "Learn from exam toppers who already got the ranks",
    heroBody:
      "Only competitive exams — JEE, NEET, Boards, UPSC, and more. Rank strategies, weekly blueprints, and what toppers avoided.",
    chip: "Intelligence · Competitive exam toppers",
    searchPlaceholder: "Search topper, exam, or strategy…",
    savedKey: "quantrion_exam_toppers_saved_v1",
    accentBlob: "bg-amber-400/15",
  },
  "industrial-expert": {
    title: "Industry Guidance",
    subtitle: "Mentors from real industries — careers, skills, and practical blueprints.",
    heroTitle: "Learn from people building real industries",
    heroBody:
      "Industry guidance across manufacturing, energy, IT & AI, robotics, healthcare tech, and more — advice for serious Explore Industries paths.",
    chip: "Intelligence · Industry mentors",
    searchPlaceholder: "Search industry, domain, or career advice…",
    savedKey: "quantrion_industry_experts_saved_v1",
    accentBlob: "bg-teal-400/15",
  },
  "space-expert": {
    title: "Space Guidance",
    subtitle: "Mentors for space technology, missions, and the space economy.",
    heroTitle: "Guidance for your path in the space economy",
    heroBody:
      "Space guidance on systems engineering, NewSpace markets, and mission operations — how to build a real career beyond Earth.",
    chip: "Intelligence · Space mentors",
    searchPlaceholder: "Search space, mission, or NewSpace advice…",
    savedKey: "quantrion_space_experts_saved_v1",
    accentBlob: "bg-indigo-400/15",
  },
}

function hubIcon(category: MentorCategory) {
  if (category === "exam-topper") return Trophy
  if (category === "industrial-expert") return BriefcaseBusiness
  return Orbit
}

export function GuidanceExperience({ category }: { category: MentorCategory }) {
  const hub = HUB_COPY[category]
  const meta = CATEGORY_META[category]
  const Icon = hubIcon(category)
  const mentors = useMemo(
    () => MENTOR_GUIDANCE.filter((g) => g.category === category),
    [category],
  )

  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState<MentorGuidance | null>(mentors[0] ?? null)
  const [saved, setSaved] = useState<string[]>([])

  const list = useMemo(() => filterGuidance(category, query), [category, query])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(hub.savedKey)
      if (raw) setSaved(JSON.parse(raw) as string[])
    } catch {
      /* ignore */
    }
  }, [hub.savedKey])

  useEffect(() => {
    setSelected(mentors[0] ?? null)
    setQuery("")
  }, [category, mentors])

  useEffect(() => {
    if (selected && !list.find((g) => g.id === selected.id)) {
      setSelected(list[0] ?? null)
    }
  }, [list, selected])

  const toggleSave = (id: string) => {
    setSaved((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev]
      try {
        localStorage.setItem(hub.savedKey, JSON.stringify(next))
      } catch {
        /* ignore */
      }
      return next
    })
  }

  return (
    <ShellLayout title={hub.title} subtitle={hub.subtitle} aiStatus="learning">
      <div className="space-y-6">
        <section className="glass-card grid-glow relative overflow-hidden rounded-2xl p-5 md:p-6">
          <div
            className={cn(
              "pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full blur-3xl",
              hub.accentBlob,
            )}
          />
          <div className="relative flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/10 px-3 py-1 text-[11px] font-medium text-amber-200">
                <Icon className="h-3.5 w-3.5" />
                {hub.chip}
              </div>
              <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                {hub.heroTitle}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{hub.heroBody}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:min-w-[200px]">
              <MiniStat label="Mentors" value={String(mentors.length)} />
              <MiniStat label="Saved" value={String(saved.length)} />
            </div>
          </div>
        </section>

        <section className="glass-card rounded-2xl p-4 md:p-5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={hub.searchPlaceholder}
              className="h-11 w-full rounded-xl border border-border bg-secondary/40 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-amber-400/40"
              aria-label="Search mentors"
            />
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-3">
            {list.map((g) => {
              const isActive = selected?.id === g.id
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setSelected(g)}
                  className={cn(
                    "w-full rounded-2xl border p-4 text-left transition-all hover:-translate-y-0.5",
                    isActive
                      ? "border-amber-400/40 bg-amber-500/10"
                      : "border-border/60 bg-card/40 hover:border-amber-400/25",
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-sm font-semibold text-foreground",
                        g.accent,
                      )}
                    >
                      {g.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-foreground">{g.name}</p>
                        <span className={cn("rounded-md border px-1.5 py-0.5 text-[10px]", meta.chip)}>
                          {meta.label.replace(" Experts", "").replace(" Toppers", "")}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">{g.credentials}</p>
                      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-foreground/90">
                        {g.headline}
                      </p>
                    </div>
                  </div>
                </button>
              )
            })}
            {!list.length && (
              <p className="text-sm text-muted-foreground">No mentors matched your search.</p>
            )}
          </div>

          {selected ? (
            <article className="glass-card rounded-2xl p-5 md:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-base font-semibold",
                      selected.accent,
                    )}
                  >
                    {selected.initials}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{selected.name}</h3>
                    <p className="text-sm text-muted-foreground">{selected.title}</p>
                    <p className="mt-1 text-xs text-amber-200/90">{selected.credentials}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{selected.examOrDomain}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                  onClick={() => toggleSave(selected.id)}
                >
                  {saved.includes(selected.id) ? (
                    <>
                      <BookmarkCheck className="h-3.5 w-3.5" /> Saved
                    </>
                  ) : (
                    <>
                      <Bookmark className="h-3.5 w-3.5" /> Save guidance
                    </>
                  )}
                </Button>
              </div>

              <div className="mt-5 rounded-xl border border-border/50 bg-secondary/25 p-4">
                <Quote className="h-4 w-4 text-amber-300" />
                <p className="mt-2 text-base font-medium leading-relaxed text-foreground">
                  {selected.headline}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{selected.story}</p>
              </div>

              <div className="mt-5">
                <h4 className="text-sm font-semibold text-foreground">
                  Strategy that gave results
                </h4>
                <ul className="mt-3 space-y-2">
                  {selected.resultStrategy.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-border/40 bg-background/30 px-3 py-2 text-sm text-muted-foreground"
                    >
                      <span className="mr-2 text-amber-300">▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Weekly blueprint</h4>
                  <ul className="mt-3 space-y-2">
                    {selected.weeklyBlueprint.map((item) => (
                      <li key={item} className="text-sm text-muted-foreground">
                        <span className="text-sky-300">• </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">What they avoided</h4>
                  <ul className="mt-3 space-y-2">
                    {selected.avoid.map((item) => (
                      <li key={item} className="text-sm text-muted-foreground">
                        <span className="text-rose-300">• </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {selected.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="capitalize text-[10px]">
                    {tag}
                  </Badge>
                ))}
                <span className="self-center text-xs text-muted-foreground">
                  {selected.helpful.toLocaleString()} found this helpful
                </span>
              </div>
            </article>
          ) : (
            <div className="glass-card flex items-center justify-center rounded-2xl p-10 text-sm text-muted-foreground">
              Select a mentor to read full guidance.
            </div>
          )}
        </section>

        {saved.length > 0 && (
          <section className="glass-card rounded-2xl p-5">
            <h3 className="font-semibold text-foreground">Saved guidance</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {saved.map((id) => {
                const g = mentors.find((x) => x.id === id)
                if (!g) return null
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSelected(g)}
                    className="rounded-lg border border-border/60 bg-secondary/30 px-3 py-1.5 text-xs text-muted-foreground hover:border-amber-400/30 hover:text-foreground"
                  >
                    {g.name}
                  </button>
                )
              })}
            </div>
          </section>
        )}
      </div>
    </ShellLayout>
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
