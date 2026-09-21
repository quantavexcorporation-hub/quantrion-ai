"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowRight,
  Clapperboard,
  Cpu,
  Film,
  Layers3,
  Loader2,
  Play,
  Sparkles,
  Wand2,
  Zap,
} from "lucide-react"
import { ShellLayout } from "@/components/layout/shell-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import type { LecturePack } from "@/lib/lecture-cognis/types"
import {
  DESTINATION_TARGETS,
  PIPELINE_STEPS,
  VIDEO_KINDS,
  kindLabel,
  statusLabel,
  type VideoKind,
} from "./lecture-cognis-data"
import { ForgePlayer } from "./forge-player"
import { ForgeStudio } from "./forge-studio"

function packToStatusLabel(status: LecturePack["status"]) {
  return statusLabel(status)
}

export function LectureCognisExperience() {
  const [jobs, setJobs] = useState<LecturePack[]>([])
  const [topic, setTopic] = useState("")
  const [course, setCourse] = useState("")
  const [selectedKinds, setSelectedKinds] = useState<VideoKind[]>([
    "full-lecture",
    "quicklearn-short",
  ])
  const [forging, setForging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [playing, setPlaying] = useState<LecturePack | null>(null)
  const [playMode, setPlayMode] = useState<"full" | "short">("full")
  const [studioPack, setStudioPack] = useState<LecturePack | null>(null)
  const [loadingList, setLoadingList] = useState(true)

  const loadJobs = useCallback(async () => {
    try {
      const res = await fetch("/api/lecture-cognis/jobs", { cache: "no-store" })
      const data = (await res.json()) as { packs?: LecturePack[]; error?: string }
      if (!res.ok) {
        setError(data.error || "Could not load forge jobs")
        return
      }
      setJobs(data.packs ?? [])
      setError(null)
    } catch {
      setError("Could not reach LectureCognis API")
    } finally {
      setLoadingList(false)
    }
  }, [])

  useEffect(() => {
    void loadJobs()
  }, [loadJobs])

  // Poll active jobs while forging / in-progress (server updates pack.json mid-run for same request; after complete reload)
  useEffect(() => {
    const active = jobs.some(
      (j) => j.status !== "live" && j.status !== "failed",
    )
    if (!active && !forging) return
    const t = window.setInterval(() => {
      void loadJobs()
    }, 2500)
    return () => window.clearInterval(t)
  }, [jobs, forging, loadJobs])

  const stats = useMemo(() => {
    const live = jobs.filter((j) => j.status === "live").length
    const active = jobs.filter((j) => j.status !== "live" && j.status !== "failed").length
    const outputs = jobs.reduce((n, j) => n + j.kinds.length, 0)
    return { live, active, outputs, total: jobs.length }
  }, [jobs])

  const toggleKind = (kind: VideoKind) => {
    setSelectedKinds((prev) =>
      prev.includes(kind) ? prev.filter((k) => k !== kind) : [...prev, kind],
    )
  }

  const forgeBatch = useCallback(async () => {
    const t = topic.trim()
    if (!t || selectedKinds.length === 0) return
    setForging(true)
    setError(null)

    // Optimistic placeholder
    const tempId = `pending-${Date.now()}`
    setJobs((prev) => [
      {
        id: tempId,
        topic: t,
        course: course.trim() || "General · Quantrion Curriculum",
        kinds: selectedKinds,
        status: "scripting",
        progress: 12,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        engine: "LectureCognis-v1-openai",
      },
      ...prev,
    ])

    try {
      const res = await fetch("/api/lecture-cognis/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: t,
          course: course.trim() || undefined,
          kinds: selectedKinds,
        }),
      })
      const data = (await res.json()) as { pack?: LecturePack; error?: string }
      if (!res.ok || !data.pack) {
        setJobs((prev) =>
          prev.map((j) =>
            j.id === tempId
              ? {
                  ...j,
                  status: "failed",
                  progress: 100,
                  error: data.error || "Forge failed",
                }
              : j,
          ),
        )
        setError(data.error || "Forge failed — check OPENAI_API_KEY and professional access")
        return
      }
      setJobs((prev) => [data.pack!, ...prev.filter((j) => j.id !== tempId)])
      setTopic("")
      setStudioPack(data.pack)
      setPlaying(null)
    } catch {
      setError("Network error while forging lecture")
      setJobs((prev) =>
        prev.map((j) =>
          j.id === tempId
            ? { ...j, status: "failed", progress: 100, error: "Network error" }
            : j,
        ),
      )
    } finally {
      setForging(false)
      void loadJobs()
    }
  }, [topic, course, selectedKinds, loadJobs])

  return (
    <ShellLayout
      title="LectureCognis"
      subtitle="Platform tool · AI cinematic education studio — forge, edit timeline, direct scenes."
      aiStatus="optimizing"
    >
      <div className="space-y-6">
        {studioPack && (
          <ForgeStudio
            pack={studioPack}
            onClose={() => setStudioPack(null)}
            onSaved={(p) => {
              setStudioPack(p)
              setJobs((prev) => prev.map((j) => (j.id === p.id ? p : j)))
            }}
          />
        )}

        <section className="glass-card relative overflow-hidden rounded-2xl p-5 md:p-7">
          <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-cyan-400/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-10 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />
          <div className="relative grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[11px] font-medium text-cyan-200">
                <Clapperboard className="h-3.5 w-3.5" />
                LectureCognis Cinema · AI video machine + studio editor
              </div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                LectureCognis
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                Futuristic education cinema: AI writes the lecture, voices it, builds cinematic
                scenes, then opens the Studio editor — timeline, mood, motion, camera, and narration
                cuts beyond traditional video tools.
              </p>
              <div className="mt-3">
                <Link
                  href="/settings"
                  className="text-[12px] text-cyan-300/90 underline-offset-2 hover:underline"
                >
                  ← Back to Settings
                </Link>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {DESTINATION_TARGETS.map((d) => (
                  <Link
                    key={d.id}
                    href={d.href}
                    className="rounded-lg border border-border/50 bg-secondary/30 px-2.5 py-1 text-[11px] text-muted-foreground transition hover:border-cyan-400/40 hover:text-cyan-100"
                  >
                    → {d.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2">
              <StatCard label="In progress" value={String(stats.active)} />
              <StatCard label="Live packs" value={String(stats.live)} />
              <StatCard label="Video outputs" value={String(stats.outputs)} />
              <StatCard label="Jobs total" value={String(stats.total)} />
            </div>
          </div>
        </section>

        {error && (
          <div className="rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
            {error}
          </div>
        )}

        {playing && playing.status === "live" && (
          <ForgePlayer
            pack={playing}
            mode={playMode}
            onClose={() => setPlaying(null)}
          />
        )}

        <section className="glass-card rounded-2xl p-5 md:p-6" aria-label="Forge pipeline">
          <div className="mb-4 flex items-center gap-2">
            <Cpu className="h-4 w-4 text-cyan-300" />
            <h3 className="font-semibold text-foreground">Real factory pipeline</h3>
          </div>
          <ol className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {PIPELINE_STEPS.map((step, i) => (
              <li key={step.id} className="rounded-xl border border-border/50 bg-secondary/20 p-3">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-cyan-300/90">
                  0{i + 1}
                </div>
                <div className="mt-1 text-sm font-medium text-foreground">{step.label}</div>
                <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{step.detail}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <section className="glass-card rounded-2xl p-5 md:p-6" aria-label="Forge console">
            <div className="mb-4 flex items-center gap-2">
              <Wand2 className="h-4 w-4 text-violet-300" />
              <h3 className="font-semibold text-foreground">Forge console</h3>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              Enter a topic. LectureCognis calls OpenAI for the script, synthesizes voice, builds a
              timed visual lecture, and saves the pack to disk.
            </p>
            <div className="space-y-3">
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  Lesson / concept topic
                </span>
                <Input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Neural Networks · Backpropagation"
                  aria-label="Lesson topic"
                  disabled={forging}
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  Course / module (optional)
                </span>
                <Input
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  placeholder="e.g. Future of Industries · AI"
                  aria-label="Course name"
                  disabled={forging}
                />
              </label>
            </div>

            <div className="mt-5">
              <div className="mb-2 text-xs font-medium text-muted-foreground">Video types</div>
              <div className="grid gap-2 sm:grid-cols-2">
                {VIDEO_KINDS.map((kind) => {
                  const on = selectedKinds.includes(kind.id)
                  return (
                    <button
                      key={kind.id}
                      type="button"
                      onClick={() => toggleKind(kind.id)}
                      disabled={forging}
                      className={cn(
                        "rounded-xl border p-3 text-left transition",
                        on
                          ? "border-cyan-400/45 bg-cyan-400/10"
                          : "border-border/50 bg-secondary/20 hover:border-border",
                      )}
                      aria-pressed={on}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-foreground">{kind.title}</span>
                        <span className="text-[10px] text-muted-foreground">{kind.duration}</span>
                      </div>
                      <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                        {kind.blurb}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <Button
                onClick={() => void forgeBatch()}
                disabled={forging || !topic.trim() || selectedKinds.length === 0}
                className="gap-2"
              >
                {forging ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                {forging ? "Forging cinema…" : "Forge cinematic lecture"}
              </Button>
              <Button asChild variant="secondary" className="gap-2">
                <Link href="/quick-learn">
                  <Zap className="h-4 w-4" />
                  Open QuickLearn
                </Link>
              </Button>
              <Button asChild variant="outline" className="gap-2">
                <Link href="/learn">
                  <Play className="h-4 w-4" />
                  Open Learn
                </Link>
              </Button>
            </div>
            <p className="mt-3 text-[11px] text-muted-foreground">
              Requires <code className="text-foreground/80">OPENAI_API_KEY</code>. Generation may
              take 20–90 seconds.
            </p>
          </section>

          <section className="glass-card rounded-2xl p-5 md:p-6" aria-label="What LectureCognis builds">
            <div className="mb-4 flex items-center gap-2">
              <Film className="h-4 w-4 text-amber-300" />
              <h3 className="font-semibold text-foreground">What gets built</h3>
            </div>
            <ul className="space-y-3">
              <li className="rounded-xl border border-border/40 bg-secondary/15 p-3 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">1. Director script</span> — cinematic
                education narration + short twin
              </li>
              <li className="rounded-xl border border-border/40 bg-secondary/15 p-3 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">2. Voice</span> — OpenAI TTS cinema
                narration
              </li>
              <li className="rounded-xl border border-border/40 bg-secondary/15 p-3 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">3. Scenes</span> — mood, motion, camera,
                accents
              </li>
              <li className="rounded-xl border border-border/40 bg-secondary/15 p-3 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">4. Studio editor</span> — timeline +
                scene inspector
              </li>
              <li className="rounded-xl border border-border/40 bg-secondary/15 p-3 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">5. Publish</span> — library packs for
                Courses & QuickLearn
              </li>
            </ul>
          </section>
        </div>

        <section className="glass-card rounded-2xl p-5 md:p-6" aria-label="Forge queue">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Layers3 className="h-4 w-4 text-emerald-300" />
              <h3 className="font-semibold text-foreground">Forge library</h3>
            </div>
            <Button size="sm" variant="ghost" onClick={() => void loadJobs()} disabled={loadingList}>
              Refresh
            </Button>
          </div>
          <div className="space-y-3">
            {loadingList && !jobs.length && (
              <p className="text-sm text-muted-foreground">Loading jobs…</p>
            )}
            {!loadingList && !jobs.length && (
              <p className="text-sm text-muted-foreground">
                No forged lectures yet. Queue your first topic above.
              </p>
            )}
            <AnimatePresence initial={false}>
              {jobs.map((job) => (
                <motion.article
                  key={job.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-border/50 bg-secondary/20 p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-foreground">{job.topic}</h4>
                      <p className="mt-0.5 text-[12px] text-muted-foreground">{job.course}</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {job.kinds.map((k) => (
                          <span
                            key={k}
                            className="rounded-md border border-border/50 bg-background/40 px-1.5 py-0.5 text-[10px] text-muted-foreground"
                          >
                            {kindLabel(k)}
                          </span>
                        ))}
                      </div>
                      {job.error && (
                        <p className="mt-2 text-[11px] text-rose-300">{job.error}</p>
                      )}
                    </div>
                    <StatusPill status={job.status} />
                  </div>
                  <div className="mt-3">
                    <div className="mb-1 flex justify-between text-[10px] text-muted-foreground">
                      <span>{packToStatusLabel(job.status)}</span>
                      <span>{Math.round(job.progress)}%</span>
                    </div>
                    <Progress value={job.progress} className="h-1.5" />
                  </div>
                  {job.status === "live" && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        className="gap-1.5"
                        onClick={() => {
                          setStudioPack(job)
                          setPlaying(null)
                        }}
                      >
                        <Clapperboard className="h-3.5 w-3.5" /> Open Studio
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="gap-1.5"
                        onClick={() => {
                          setPlaying(job)
                          setPlayMode("full")
                        }}
                      >
                        <Play className="h-3.5 w-3.5" /> Play
                      </Button>
                      {job.audioShortUrl && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setPlaying(job)
                            setPlayMode("short")
                          }}
                        >
                          Play short
                        </Button>
                      )}
                      {job.packUrl && (
                        <Button asChild size="sm" variant="outline">
                          <a href={job.packUrl} target="_blank" rel="noreferrer">
                            pack.json <ArrowRight className="ml-1 h-3.5 w-3.5" />
                          </a>
                        </Button>
                      )}
                    </div>
                  )}
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </ShellLayout>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border/50 bg-secondary/25 px-3 py-2.5">
      <div className="text-lg font-semibold tabular-nums text-foreground">{value}</div>
      <div className="text-[10px] text-muted-foreground">{label}</div>
    </div>
  )
}

function StatusPill({ status }: { status: LecturePack["status"] }) {
  const live = status === "live"
  const failed = status === "failed"
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold",
        live && "border-emerald-400/35 bg-emerald-400/10 text-emerald-200",
        failed && "border-rose-400/35 bg-rose-400/10 text-rose-200",
        !live && !failed && "border-cyan-400/35 bg-cyan-400/10 text-cyan-200",
      )}
    >
      {!live && !failed && <Loader2 className="h-3 w-3 animate-spin" />}
      {packToStatusLabel(status)}
    </span>
  )
}
