"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Pause, Play, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import type { LecturePack } from "@/lib/lecture-cognis/types"
import { CinematicStage } from "./cinematic-stage"

export function ForgePlayer({
  pack,
  mode = "full",
  onClose,
}: {
  pack: LecturePack
  mode?: "full" | "short"
  onClose?: () => void
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(pack.durationSec || 0)

  const src =
    mode === "short" && pack.audioShortUrl ? pack.audioShortUrl : pack.audioFullUrl

  const slides = pack.slides ?? []
  const active = useMemo(() => {
    if (!slides.length) return null
    return (
      slides.find((s) => time >= s.startSec && time < s.endSec) ??
      slides[slides.length - 1]
    )
  }, [slides, time])

  useEffect(() => {
    const el = audioRef.current
    if (!el) return
    const onTime = () => setTime(el.currentTime)
    const onMeta = () => setDuration(el.duration || pack.durationSec || 0)
    const onEnded = () => setPlaying(false)
    el.addEventListener("timeupdate", onTime)
    el.addEventListener("loadedmetadata", onMeta)
    el.addEventListener("ended", onEnded)
    return () => {
      el.removeEventListener("timeupdate", onTime)
      el.removeEventListener("loadedmetadata", onMeta)
      el.removeEventListener("ended", onEnded)
    }
  }, [pack.durationSec, src])

  const toggle = async () => {
    const el = audioRef.current
    if (!el) return
    if (playing) {
      el.pause()
      setPlaying(false)
      return
    }
    await el.play()
    setPlaying(true)
  }

  if (!src) {
    return (
      <div className="rounded-2xl border border-amber-400/30 bg-amber-400/5 p-4 text-sm text-muted-foreground">
        No audio generated for this pack yet.
      </div>
    )
  }

  const pct = duration > 0 ? Math.min(100, (time / duration) * 100) : 0

  return (
    <div className="overflow-hidden rounded-2xl border border-cyan-400/25 bg-[#060a12]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-white">{pack.topic}</p>
          <p className="text-[11px] text-slate-400">
            {pack.course} · {mode === "short" ? "QuickLearn short" : "Full lecture"} · LectureCognis
            Cinema
          </p>
        </div>
        {onClose && (
          <Button size="sm" variant="ghost" onClick={onClose} className="text-slate-300">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <CinematicStage
        slide={active}
        topic={pack.topic}
        playing={playing}
        className="aspect-video w-full"
      />

      <div className="space-y-3 border-t border-white/10 px-4 py-4">
        <Progress value={pct} className="h-1.5" />
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            onClick={() => void toggle()}
            className={cn(
              "gap-2",
              playing ? "bg-slate-200 text-slate-900" : "bg-cyan-400 text-slate-950 hover:bg-cyan-300",
            )}
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {playing ? "Pause" : "Play cinema"}
          </Button>
          <span className="text-[11px] tabular-nums text-slate-400">
            {formatTime(time)} / {formatTime(duration)}
          </span>
          <a
            href={src}
            download
            className="ml-auto text-[11px] text-cyan-300 underline-offset-2 hover:underline"
          >
            Download audio
          </a>
        </div>
        <audio ref={audioRef} src={src} preload="metadata" />
      </div>

      {!!pack.quiz?.length && (
        <div className="border-t border-white/10 px-4 py-4">
          <p className="mb-2 text-xs font-semibold text-slate-200">Check understanding</p>
          <ul className="space-y-2">
            {pack.quiz.map((q, i) => (
              <li
                key={i}
                className="rounded-lg border border-white/10 bg-white/[0.03] p-3 text-xs text-slate-300"
              >
                <p className="font-medium text-slate-100">
                  {i + 1}. {q.question}
                </p>
                <p className="mt-1 text-slate-400">
                  Answer: {q.options[q.answerIndex]} — {q.explanation}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function formatTime(sec: number) {
  if (!Number.isFinite(sec) || sec < 0) return "0:00"
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, "0")}`
}
