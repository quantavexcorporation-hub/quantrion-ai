"use client"

import { useState } from "react"
import { Bookmark, Download, Play, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import {
  categories,
  feedVideos,
  learningModes,
  videoActions,
  type MicroVideo,
} from "./data"

function VideoCard({
  video,
  active,
  onSelect,
}: {
  video: MicroVideo
  active: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "w-full rounded-xl border p-3 text-left transition-colors",
        active
          ? "border-primary/40 bg-primary/10"
          : "border-border/60 bg-secondary/20 hover:border-border"
      )}
      aria-pressed={active}
      aria-label={`${video.title}. ${video.duration}. ${video.subject}`}
    >
      <div
        className={cn(
          "relative mb-3 flex h-28 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br",
          video.thumbnail
        )}
      >
        <Play className="h-8 w-8 text-white/90" />
        <span className="absolute bottom-2 right-2 rounded bg-black/55 px-1.5 py-0.5 text-[10px] text-white">
          {video.duration}
        </span>
        {video.recommended && (
          <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-md bg-primary/90 px-1.5 py-0.5 text-[9px] font-medium text-primary-foreground">
            <Sparkles className="h-2.5 w-2.5" /> AI Recommended
          </span>
        )}
      </div>
      <p className="text-sm font-semibold text-foreground">{video.title}</p>
      <p className="mt-0.5 text-[11px] text-muted-foreground">
        {video.concept} · {video.subject}
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5 text-[10px] text-muted-foreground">
        <span className="rounded bg-secondary/60 px-1.5 py-0.5">{video.difficulty}</span>
        <span className="rounded bg-secondary/60 px-1.5 py-0.5">{video.minutes} min</span>
        <span className="rounded bg-secondary/60 px-1.5 py-0.5">Retain {video.retention}%</span>
      </div>
      {video.progress > 0 && (
        <div className="mt-2">
          <Progress value={video.progress} className="h-1" />
        </div>
      )}
    </button>
  )
}

export function VideoFeed({
  activeId,
  onSelect,
}: {
  activeId: string
  onSelect: (v: MicroVideo) => void
}) {
  const [mode, setMode] = useState("Recommended")
  const [category, setCategory] = useState<string | null>(null)

  const videos = feedVideos.filter((v) => {
    if (category && v.subject !== category) return false
    if (mode === "Recommended") return true
    return v.mode === mode || (mode === "Weak Concepts" && v.recommended)
  })

  return (
    <section className="space-y-4" aria-label="Personalized learning feed">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Today&apos;s Learning</h2>
        <p className="text-sm text-muted-foreground">
          Personalized from Knowledge DNA, weak concepts, Progress IQ, and revision schedule
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Learning modes">
        {learningModes.map((m) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={mode === m}
            onClick={() => setMode(m)}
            className={cn(
              "rounded-full border px-2.5 py-1 text-[11px] transition-colors",
              mode === m
                ? "border-primary/40 bg-primary/15 text-foreground"
                : "border-border/60 text-muted-foreground hover:text-foreground"
            )}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-1" aria-label="Categories">
        <button
          type="button"
          onClick={() => setCategory(null)}
          className={cn(
            "shrink-0 rounded-lg px-2.5 py-1 text-[11px]",
            !category ? "bg-secondary text-foreground" : "text-muted-foreground"
          )}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={cn(
              "shrink-0 rounded-lg px-2.5 py-1 text-[11px]",
              category === c ? "bg-secondary text-foreground" : "text-muted-foreground"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {videos.map((v) => (
          <VideoCard
            key={v.id}
            video={v}
            active={activeId === v.id}
            onSelect={() => onSelect(v)}
          />
        ))}
      </div>
    </section>
  )
}

export function ConceptOverlay({ video }: { video: MicroVideo }) {
  const [action, setAction] = useState("Explain Again")

  return (
    <aside className="glass-card rounded-2xl p-5" aria-label="AI video experience">
      <div
        className={cn(
          "relative mb-4 flex h-44 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br",
          video.thumbnail
        )}
      >
        <Play className="h-12 w-12 text-white/90" />
        <span className="absolute bottom-3 left-3 rounded bg-black/50 px-2 py-1 text-xs text-white">
          {video.duration} · {video.concept}
        </span>
      </div>

      <h3 className="text-base font-semibold text-foreground">{video.title}</h3>
      <p className="mt-1 text-xs text-muted-foreground">
        {video.subject} · {video.difficulty} · Est. {video.minutes} min · Retain {video.retention}%
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <Button size="sm" variant="outline" className="h-8 gap-1 text-xs">
          <Bookmark className="h-3.5 w-3.5" /> Save
        </Button>
        <Button size="sm" variant="outline" className="h-8 gap-1 text-xs">
          <Download className="h-3.5 w-3.5" /> Download
        </Button>
      </div>

      <p className="mt-4 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        In-page AI actions
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {videoActions.map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => setAction(a)}
            className={cn(
              "rounded-lg border px-2 py-1 text-[10px] transition-colors",
              action === a
                ? "border-primary/40 bg-primary/15 text-foreground"
                : "border-border/60 text-muted-foreground hover:text-foreground"
            )}
          >
            {a}
          </button>
        ))}
      </div>

      <div className="mt-3 rounded-xl border border-border/50 bg-secondary/25 p-3 text-xs leading-relaxed text-muted-foreground">
        <span className="font-medium text-foreground">{action}: </span>
        Educational response for “{video.concept}”. Clarifies the idea, links to Study Material & Smart
        Library, and never leaves this session.
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg bg-secondary/30 p-2">
          <p className="text-[10px] text-muted-foreground">Mastery</p>
          <p className="text-sm font-semibold text-foreground">{Math.min(96, video.retention + 8)}%</p>
        </div>
        <div className="rounded-lg bg-secondary/30 p-2">
          <p className="text-[10px] text-muted-foreground">Retention</p>
          <p className="text-sm font-semibold text-foreground">{video.retention}%</p>
        </div>
        <div className="rounded-lg bg-secondary/30 p-2">
          <p className="text-[10px] text-muted-foreground">Confidence</p>
          <p className="text-sm font-semibold text-foreground">+{video.difficulty === "Hard" ? 6 : 4}</p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <Button size="sm" className="text-xs">
          Quiz Me
        </Button>
        <Button size="sm" variant="outline" className="text-xs">
          Continue Learning
        </Button>
        <Button size="sm" variant="outline" className="text-xs">
          Update DNA / Progress IQ
        </Button>
      </div>
    </aside>
  )
}
