"use client"

import { useEffect, useState } from "react"
import { CheckCircle2, Pause, Play, X, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { needBadge, type MicroConcept } from "./explorer-data"

type Props = {
  micro: MicroConcept
  topicName: string
  onClose: () => void
  onComplete: (microId: string) => void
}

export function MicroVideoPlayer({ micro, topicName, onClose, onComplete }: Props) {
  const [playing, setPlaying] = useState(true)
  const [elapsed, setElapsed] = useState(0)
  const [pointIndex, setPointIndex] = useState(0)
  const done = elapsed >= micro.durationSec
  const badge = needBadge(micro.needLevel)
  const progress = Math.min(100, (elapsed / micro.durationSec) * 100)

  useEffect(() => {
    if (!playing || done) return
    const id = window.setInterval(() => {
      setElapsed((e) => {
        const next = e + 1
        if (next >= micro.durationSec) {
          onComplete(micro.id)
          return micro.durationSec
        }
        return next
      })
      setPointIndex((i) => (i + 1) % Math.max(micro.keyPoints.length, 1))
    }, 1000)
    return () => window.clearInterval(id)
  }, [playing, done, micro, onComplete])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="glass-card relative w-full max-w-2xl overflow-hidden rounded-2xl border-sky-400/30">
        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-[#0a1220] via-[#101c33] to-[#0d2840]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(56,189,248,0.22),transparent_45%),radial-gradient(circle_at_70%_70%,rgba(129,140,248,0.18),transparent_40%)]" />
          <div className="absolute left-4 top-4 right-4 flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-300">
                Micro video · {topicName}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-white">{micro.videoTitle}</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={onClose}
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <div
              className={cn(
                "mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-sky-300/30 bg-sky-400/15 transition-transform",
                playing && !done && "scale-110"
              )}
            >
              {done ? (
                <CheckCircle2 className="h-9 w-9 text-emerald-300" />
              ) : (
                <Zap className="h-8 w-8 text-sky-200" />
              )}
            </div>
            <p className="text-sm font-medium text-white">{micro.name}</p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-sky-100/90">
              {done
                ? "Micro-concept complete — return to the whole topic with this piece unlocked."
                : micro.keyPoints[pointIndex]}
            </p>
          </div>

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-10">
            <Progress value={progress} className="h-1.5" />
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs tabular-nums text-white/70">
                {Math.floor(elapsed / 60)}:{String(elapsed % 60).padStart(2, "0")} /{" "}
                {Math.floor(micro.durationSec / 60)}:
                {String(micro.durationSec % 60).padStart(2, "0")}
              </p>
              <div className="flex gap-2">
                {!done && (
                  <Button size="sm" variant="secondary" onClick={() => setPlaying((p) => !p)}>
                    {playing ? (
                      <>
                        <Pause className="mr-1.5 h-3.5 w-3.5" /> Pause
                      </>
                    ) : (
                      <>
                        <Play className="mr-1.5 h-3.5 w-3.5" /> Play
                      </>
                    )}
                  </Button>
                )}
                <Button size="sm" onClick={onClose}>
                  {done ? "Back to explorer" : "Close"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3 p-4 md:p-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className={cn("rounded-md border px-2 py-0.5 text-[10px] font-semibold", badge.className)}>
              {badge.label} · need {micro.needScore}
            </span>
            <span className="text-xs text-muted-foreground">Why this micro-video matters for the whole concept</span>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{micro.whyNeeded}</p>
          <ul className="grid gap-2 sm:grid-cols-3">
            {micro.keyPoints.map((p) => (
              <li
                key={p}
                className="rounded-lg border border-border/50 bg-secondary/30 px-3 py-2 text-xs text-muted-foreground"
              >
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
