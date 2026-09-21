"use client"

import { useEffect, useMemo, useState } from "react"
import {
  Compass,
  Film,
  GitBranch,
  Play,
  Radar,
  Search,
  Sparkles,
  Route,
} from "lucide-react"
import { ShellLayout } from "@/components/layout/shell-layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { MicroVideoPlayer } from "./micro-video-player"
import {
  DEEP_TOPICS,
  EXPLORER_RECENT_KEY,
  needBadge,
  searchTopics,
  suggestedWatchPath,
  type DeepTopic,
  type MicroConcept,
  type SubjectKey,
} from "./explorer-data"

const SUBJECTS: Array<SubjectKey | "All"> = [
  "All",
  "Physics",
  "Chemistry",
  "Mathematics",
  "Biology",
]

export function ExplorerExperience() {
  const [query, setQuery] = useState("")
  const [subject, setSubject] = useState<SubjectKey | "All">("All")
  const [selected, setSelected] = useState<DeepTopic | null>(DEEP_TOPICS[0])
  const [running, setRunning] = useState(false)
  const [engineReady, setEngineReady] = useState(true)
  const [activeMicro, setActiveMicro] = useState<MicroConcept | null>(null)
  const [watched, setWatched] = useState<Record<string, boolean>>({})
  const [recentIds, setRecentIds] = useState<string[]>([])

  const filtered = useMemo(() => searchTopics(query, subject), [query, subject])
  const path = selected ? suggestedWatchPath(selected) : []
  const mustWatch = path.filter((m) => m.needLevel === "critical" || m.needLevel === "high")

  useEffect(() => {
    try {
      const raw = localStorage.getItem(EXPLORER_RECENT_KEY)
      if (raw) setRecentIds(JSON.parse(raw) as string[])
      const w = localStorage.getItem("quantrion_micro_watched")
      if (w) setWatched(JSON.parse(w) as Record<string, boolean>)
    } catch {
      /* ignore */
    }
  }, [])

  const persistRecent = (topicId: string) => {
    const next = [topicId, ...recentIds.filter((id) => id !== topicId)].slice(0, 6)
    setRecentIds(next)
    try {
      localStorage.setItem(EXPLORER_RECENT_KEY, JSON.stringify(next))
    } catch {
      /* ignore */
    }
  }

  const runEngine = async (topic: DeepTopic) => {
    setSelected(topic)
    setRunning(true)
    setEngineReady(false)
    persistRecent(topic.id)
    await new Promise((r) => setTimeout(r, 700))
    setEngineReady(true)
    setRunning(false)
  }

  const markWatched = (microId: string) => {
    setWatched((prev) => {
      const next = { ...prev, [microId]: true }
      try {
        localStorage.setItem("quantrion_micro_watched", JSON.stringify(next))
      } catch {
        /* ignore */
      }
      return next
    })
  }

  const watchedCount = selected
    ? selected.micros.filter((m) => watched[m.id]).length
    : 0

  return (
    <ShellLayout
      title="Sub-Concept Explorer"
      subtitle="Engine for deep topics — detect needed micro-concepts and suggest short videos that unlock the whole concept."
      aiStatus="analyzing"
    >
      <div className="space-y-6">
        {/* Hero */}
        <section className="glass-card grid-glow relative overflow-hidden rounded-2xl p-5 md:p-6">
          <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-cyan-400/15 blur-3xl" />
          <div className="relative flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-[11px] font-medium text-cyan-200">
                <Compass className="h-3.5 w-3.5" />
                Intelligence Widget · Micro-concept engine
              </div>
              <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                Learn the whole topic by unlocking the right sub-concepts
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                When a chapter is deep, dozens of micro-concepts hide inside. The explorer ranks what
                you truly need and suggests small videos for each — so the full concept finally
                clicks.
              </p>
            </div>
            <div className="grid min-w-0 grid-cols-3 gap-2 sm:min-w-[260px]">
              <MiniStat label="Topics" value={String(DEEP_TOPICS.length)} />
              <MiniStat
                label="Must-watch"
                value={selected ? String(mustWatch.length) : "—"}
              />
              <MiniStat
                label="Watched"
                value={selected ? `${watchedCount}/${selected.micros.length}` : "—"}
              />
            </div>
          </div>
        </section>

        {/* Search + subject filters */}
        <section className="glass-card rounded-2xl p-4 md:p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search deep topics or micro-concepts…"
                className="h-11 w-full rounded-xl border border-border bg-secondary/40 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-cyan-400/40"
                aria-label="Search topics"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {SUBJECTS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSubject(s)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs transition-colors",
                    subject === s
                      ? "border-cyan-400/40 bg-cyan-500/15 text-cyan-200"
                      : "border-border/60 text-muted-foreground hover:border-cyan-400/25"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {filtered.map((topic) => (
              <button
                key={topic.id}
                type="button"
                onClick={() => void runEngine(topic)}
                className={cn(
                  "rounded-xl border p-4 text-left transition-all hover:-translate-y-0.5",
                  selected?.id === topic.id
                    ? "border-cyan-400/40 bg-cyan-500/10"
                    : "border-border/60 bg-secondary/25 hover:border-cyan-400/25"
                )}
              >
                <p className="text-[10px] font-semibold uppercase tracking-wider text-cyan-300">
                  {topic.subject} · {topic.chapter}
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground">{topic.name}</p>
                <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">{topic.summary}</p>
                <p className="mt-3 text-[11px] text-muted-foreground">
                  {topic.micros.length} micro-concepts inside
                </p>
              </button>
            ))}
            {!filtered.length && (
              <p className="col-span-full text-sm text-muted-foreground">
                No topics matched. Try another subject or keyword.
              </p>
            )}
          </div>
        </section>

        {selected && (
          <>
            {/* Engine output */}
            <section className="glass-card rounded-2xl p-5 md:p-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Radar className={cn("h-4 w-4 text-cyan-300", running && "animate-pulse")} />
                    <h3 className="font-semibold text-foreground">
                      {running ? "Explorer engine running…" : "Engine result"}
                    </h3>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Whole-topic goal: {selected.wholeConceptGoal}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  disabled={running}
                  onClick={() => void runEngine(selected)}
                >
                  <Sparkles className="h-4 w-4" />
                  Re-run explorer
                </Button>
              </div>

              {engineReady && (
                <div className="mt-5 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="rounded-xl border border-border/50 bg-secondary/20 p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <Route className="h-4 w-4 text-violet-300" />
                      <p className="text-sm font-semibold text-foreground">Suggested watch path</p>
                    </div>
                    <p className="mb-3 text-xs text-muted-foreground">
                      Critical micro-videos first — these are the ones really needed before the whole
                      concept sticks.
                    </p>
                    <ol className="space-y-2">
                      {path.map((m, i) => {
                        const badge = needBadge(m.needLevel)
                        return (
                          <li
                            key={m.id}
                            className="flex items-center gap-3 rounded-lg border border-border/40 bg-background/30 px-3 py-2"
                          >
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/15 text-[11px] font-semibold text-cyan-200">
                              {i + 1}
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm text-foreground">{m.name}</p>
                              <p className="truncate text-[11px] text-muted-foreground">
                                {m.videoTitle}
                              </p>
                            </div>
                            <Badge variant="outline" className={cn("text-[10px]", badge.className)}>
                              {badge.label}
                            </Badge>
                            {watched[m.id] && (
                              <span className="text-[10px] text-emerald-300">Done</span>
                            )}
                          </li>
                        )
                      })}
                    </ol>
                  </div>

                  <div className="rounded-xl border border-border/50 bg-secondary/20 p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <GitBranch className="h-4 w-4 text-sky-300" />
                      <p className="text-sm font-semibold text-foreground">Why the engine ranked this</p>
                    </div>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li>
                        <span className="font-medium text-foreground">Bottlenecks first: </span>
                        Micro-concepts that unlock many others score highest.
                      </li>
                      <li>
                        <span className="font-medium text-foreground">Exam-critical cues: </span>
                        Items that commonly break full-topic questions are tagged Must watch.
                      </li>
                      <li>
                        <span className="font-medium text-foreground">Small videos only: </span>
                        ~1–2 min micro lessons — enough to fill the gap, then return to the whole
                        chapter.
                      </li>
                      <li>
                        <span className="font-medium text-foreground">Coverage: </span>
                        {watchedCount}/{selected.micros.length} micro-videos completed for this topic.
                      </li>
                    </ul>
                    <Progress
                      value={(watchedCount / Math.max(selected.micros.length, 1)) * 100}
                      className="mt-4 h-1.5"
                    />
                  </div>
                </div>
              )}
            </section>

            {/* Micro video suggestions */}
            <section>
              <div className="mb-3 flex items-center gap-2">
                <Film className="h-4 w-4 text-cyan-300" />
                <h3 className="text-lg font-semibold text-foreground">
                  Suggested micro-videos for {selected.name}
                </h3>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {path.map((micro) => {
                  const badge = needBadge(micro.needLevel)
                  return (
                    <article
                      key={micro.id}
                      className="glass-card flex flex-col overflow-hidden rounded-2xl transition-transform hover:-translate-y-0.5"
                    >
                      <button
                        type="button"
                        onClick={() => setActiveMicro(micro)}
                        className="relative aspect-video overflow-hidden bg-gradient-to-br from-slate-900 via-sky-950 to-indigo-950 text-left"
                      >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(56,189,248,0.25),transparent_50%)]" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur">
                            <Play className="h-5 w-5 text-white" />
                          </span>
                        </div>
                        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2">
                          <span className="rounded bg-black/50 px-1.5 py-0.5 text-[10px] tabular-nums text-white">
                            {Math.round(micro.durationSec / 60)}:
                            {String(micro.durationSec % 60).padStart(2, "0")}
                          </span>
                          <span
                            className={cn(
                              "rounded border px-1.5 py-0.5 text-[10px] font-semibold",
                              badge.className
                            )}
                          >
                            {badge.label}
                          </span>
                        </div>
                      </button>
                      <div className="flex flex-1 flex-col p-4">
                        <p className="text-sm font-semibold text-foreground">{micro.name}</p>
                        <p className="mt-1 text-xs text-cyan-200/90">{micro.videoTitle}</p>
                        <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">
                          {micro.whyNeeded}
                        </p>
                        <div className="mt-3 flex items-center justify-between gap-2">
                          <span className="text-[11px] text-muted-foreground">
                            Need score {micro.needScore} · mastery {micro.mastery}%
                          </span>
                          {watched[micro.id] ? (
                            <span className="text-[11px] font-medium text-emerald-300">Watched</span>
                          ) : (
                            <Button size="sm" onClick={() => setActiveMicro(micro)}>
                              Play micro
                            </Button>
                          )}
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            </section>
          </>
        )}

        {recentIds.length > 0 && (
          <section className="glass-card rounded-2xl p-5">
            <h3 className="font-semibold text-foreground">Recently explored</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {recentIds.map((id) => {
                const t = DEEP_TOPICS.find((x) => x.id === id)
                if (!t) return null
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => void runEngine(t)}
                    className="rounded-lg border border-border/60 bg-secondary/30 px-3 py-1.5 text-xs text-muted-foreground hover:border-cyan-400/30 hover:text-foreground"
                  >
                    {t.name}
                  </button>
                )
              })}
            </div>
          </section>
        )}
      </div>

      {activeMicro && selected && (
        <MicroVideoPlayer
          micro={activeMicro}
          topicName={selected.name}
          onClose={() => setActiveMicro(null)}
          onComplete={markWatched}
        />
      )}
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
