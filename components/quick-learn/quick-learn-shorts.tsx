"use client"

import type { ReactNode } from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import {
  Bookmark,
  Brain,
  ChevronDown,
  ChevronUp,
  Pause,
  Play,
  Sparkles,
  Volume2,
  VolumeX,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { shortActions, shortsFeed, type ShortClip } from "./shorts-data"

/**
 * Futuristic AI Shorts stage — vertical micro-lessons, not a social feed.
 */
export function QuickLearnShorts() {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [muted, setMuted] = useState(true)
  const [bookmarked, setBookmarked] = useState(false)
  const [action, setAction] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const touchY = useRef<number | null>(null)
  const reduce = useReducedMotion()
  const clip = shortsFeed[index]
  const count = shortsFeed.length

  const go = useCallback(
    (next: number) => {
      const clamped = ((next % count) + count) % count
      setIndex(clamped)
      setProgress(0)
      setAction(null)
      setPlaying(true)
    },
    [count]
  )

  const next = useCallback(() => go(index + 1), [go, index])
  const prev = useCallback(() => go(index - 1), [go, index])

  // Simulated short progress bar
  useEffect(() => {
    if (!playing || reduce) return
    const id = window.setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          next()
          return 0
        }
        return p + 1.2
      })
    }, 80)
    return () => window.clearInterval(id)
  }, [playing, reduce, next])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowDown" || e.key === "j") {
        e.preventDefault()
        next()
      } else if (e.key === "ArrowUp" || e.key === "k") {
        e.preventDefault()
        prev()
      } else if (e.key === " ") {
        e.preventDefault()
        setPlaying((v) => !v)
      } else if (e.key === "m") {
        setMuted((v) => !v)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [next, prev])

  function onTouchStart(e: { touches: ArrayLike<{ clientY: number }> }) {
    touchY.current = e.touches[0]?.clientY ?? null
  }

  function onTouchEnd(e: { changedTouches: ArrayLike<{ clientY: number }> }) {
    if (touchY.current == null) return
    const dy = (e.changedTouches[0]?.clientY ?? touchY.current) - touchY.current
    touchY.current = null
    if (Math.abs(dy) < 48) return
    if (dy < 0) next()
    else prev()
  }

  return (
    <div
      className="relative mx-auto flex h-[min(78vh,720px)] w-full max-w-[420px] flex-col"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      role="region"
      aria-label="QuickLearn AI Shorts"
      aria-roledescription="carousel"
    >
      {/* Stage frame */}
      <div
        className="relative flex-1 overflow-hidden rounded-[1.75rem] border border-white/10 shadow-[0_0_60px_rgba(59,130,246,0.18)]"
        style={{
          background:
            "linear-gradient(160deg, rgba(15,23,42,0.9), rgba(2,6,23,0.98))",
        }}
      >
        <AnimatePresence mode="wait">
          <ShortStage
            key={clip.id}
            clip={clip}
            playing={playing}
            progress={progress}
            reduce={!!reduce}
            onTogglePlay={() => setPlaying((v) => !v)}
          />
        </AnimatePresence>

        {/* Top chrome */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 bg-gradient-to-b from-black/55 to-transparent p-4 pb-10">
          <div className="pointer-events-auto flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-sky-300" />
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-sky-200/80">
                  QuickLearn · AI Short
                </p>
                <p className="text-xs text-white/70">
                  {index + 1}/{count} · {clip.reason}
                </p>
              </div>
            </div>
            <Link
              href="/app/dashboard"
              className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] text-white/70 backdrop-blur-md hover:bg-white/10"
            >
              Exit
            </Link>
          </div>
          <div className="mt-3 h-0.5 overflow-hidden rounded-full bg-white/15">
            <motion.div
              className="h-full rounded-full bg-sky-400"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Right action rail */}
        <div className="absolute bottom-28 right-3 z-20 flex flex-col items-center gap-3">
          <RailButton
            label={playing ? "Pause" : "Play"}
            onClick={() => setPlaying((v) => !v)}
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </RailButton>
          <RailButton label={muted ? "Unmute" : "Mute"} onClick={() => setMuted((v) => !v)}>
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </RailButton>
          <RailButton
            label="Bookmark"
            onClick={() => setBookmarked((v) => !v)}
            active={bookmarked}
          >
            <Bookmark className={cn("h-4 w-4", bookmarked && "fill-current")} />
          </RailButton>
          <RailButton label="Ask AI" onClick={() => setAction("Ask AI")}>
            <Brain className="h-4 w-4" />
          </RailButton>
        </div>

        {/* Bottom info + AI chips */}
        <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 pt-16">
          <p className="text-[10px] uppercase tracking-wider text-sky-200/80">{clip.subject}</p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight text-white">{clip.title}</h2>
          <p className="mt-1 text-sm text-white/75">{clip.concept}</p>
          <div className="mt-2 flex flex-wrap gap-1.5 text-[10px] text-white/65">
            <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5">
              {clip.duration}
            </span>
            <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5">
              {clip.difficulty}
            </span>
            <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5">
              Retain {clip.retention}%
            </span>
          </div>

          <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1">
            {shortActions.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => setAction(a.label)}
                className={cn(
                  "shrink-0 rounded-full border px-2.5 py-1 text-[11px] backdrop-blur-md transition-colors",
                  action === a.label
                    ? "border-sky-400/50 bg-sky-500/25 text-white"
                    : "border-white/15 bg-white/5 text-white/80 hover:bg-white/10"
                )}
              >
                {a.label}
              </button>
            ))}
          </div>

          <AnimatePresence>
            {action && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="mt-3 rounded-xl border border-sky-400/25 bg-slate-950/80 p-3 text-xs leading-relaxed text-sky-50/85 backdrop-blur-xl"
              >
                <span className="inline-flex items-center gap-1 font-medium text-sky-300">
                  <Sparkles className="h-3 w-3" /> {action}
                </span>
                <p className="mt-1">
                  AI micro-lesson on <strong className="text-white">{clip.concept}</strong>. Updates
                  Knowledge DNA & Progress IQ when you finish — stay in this short.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Nav hints */}
      <div className="mt-3 flex items-center justify-between px-1">
        <button
          type="button"
          onClick={prev}
          className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-secondary/30 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
          aria-label="Previous short"
        >
          <ChevronUp className="h-3.5 w-3.5" /> Prev
        </button>
        <p className="text-[10px] text-muted-foreground">Swipe / ↑↓ · Space play</p>
        <button
          type="button"
          onClick={next}
          className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-secondary/30 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
          aria-label="Next short"
        >
          Next <ChevronDown className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}

function RailButton({
  children,
  label,
  onClick,
  active,
}: {
  children: ReactNode
  label: string
  onClick: () => void
  active?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur-md transition-colors hover:bg-white/15",
        active && "border-sky-400/50 bg-sky-500/20 text-sky-200"
      )}
    >
      {children}
    </button>
  )
}

function ShortStage({
  clip,
  playing,
  progress,
  reduce,
  onTogglePlay,
}: {
  clip: ShortClip
  playing: boolean
  progress: number
  reduce: boolean
  onTogglePlay: () => void
}) {
  return (
    <motion.button
      type="button"
      className={cn(
        "absolute inset-0 w-full bg-gradient-to-br text-left",
        clip.gradient
      )}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: -40, scale: 0.98 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onClick={onTogglePlay}
      aria-label={`${clip.title}. Tap to ${playing ? "pause" : "play"}`}
    >
      {/* holographic grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.35) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />

      {/* soft scan */}
      {!reduce && playing && (
        <motion.div
          className="pointer-events-none absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent"
          animate={{ top: ["-20%", "110%"] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "linear" }}
          aria-hidden
        />
      )}

      {/* floating nodes */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {[12, 70, 35, 80].map((x, i) => (
          <motion.span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full"
            style={{
              left: `${x}%`,
              top: `${20 + i * 14}%`,
              background: clip.accent,
              boxShadow: `0 0 12px ${clip.accent}`,
            }}
            animate={reduce || !playing ? undefined : { opacity: [0.25, 0.9, 0.25], y: [0, -6, 0] }}
            transition={{ duration: 2.4 + i * 0.2, repeat: Infinity }}
          />
        ))}
      </div>

      {/* center AI glyph */}
      <div className="absolute left-1/2 top-[38%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <motion.div
          className="flex h-24 w-24 items-center justify-center rounded-full border border-white/20"
          style={{
            background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.85), ${clip.accent} 50%, transparent 72%)`,
            boxShadow: `0 0 48px color-mix(in oklab, ${clip.accent} 55%, transparent)`,
          }}
          animate={
            reduce || !playing
              ? undefined
              : { scale: [1, 1.06, 1], rotate: [0, 4, 0] }
          }
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className="h-8 w-8 text-slate-950/80" />
        </motion.div>
        <p className="mt-4 max-w-[220px] text-center text-sm font-medium text-white/90">
          {clip.concept}
        </p>
        {!playing && (
          <p className="mt-2 text-[11px] text-white/60">Tap to resume</p>
        )}
      </div>

      {/* ring progress ghost */}
      <svg className="pointer-events-none absolute left-1/2 top-[38%] h-36 w-36 -translate-x-1/2 -translate-y-1/2 opacity-40" aria-hidden>
        <circle cx="72" cy="72" r="68" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
        <circle
          cx="72"
          cy="72"
          r="68"
          fill="none"
          stroke={clip.accent}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={`${(progress / 100) * 427} 427`}
          transform="rotate(-90 72 72)"
        />
      </svg>
    </motion.button>
  )
}
