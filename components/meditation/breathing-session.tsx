"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Pause, Play, RotateCcw, Volume2, VolumeX, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  HEALING_SCENES,
  SESSION_STREAK_KEY,
  SOUNDSCAPES,
  type MeditationSession,
  type SoundscapeId,
} from "./meditation-data"
import { HealingSceneBackdrop } from "./healing-scene"
import { setSoundscapeVolume, startSoundscape, stopSoundscape } from "./peaceful-audio"

type Phase = "inhale" | "hold" | "exhale" | "holdOut"

type Props = {
  session: MeditationSession
  soundscape: SoundscapeId
  onSoundscapeChange: (id: SoundscapeId) => void
  onClose: () => void
  onComplete: () => void
}

function phaseLabel(phase: Phase): string {
  switch (phase) {
    case "inhale":
      return "Inhale"
    case "hold":
      return "Hold"
    case "exhale":
      return "Exhale"
    case "holdOut":
      return "Hold empty"
  }
}

export function BreathingSession({
  session,
  soundscape,
  onSoundscapeChange,
  onClose,
  onComplete,
}: Props) {
  const cycle = useMemo(() => {
    const steps: { phase: Phase; seconds: number }[] = [
      { phase: "inhale", seconds: session.inhale },
    ]
    if (session.hold > 0) steps.push({ phase: "hold", seconds: session.hold })
    steps.push({ phase: "exhale", seconds: session.exhale })
    if ((session.holdOut ?? 0) > 0) {
      steps.push({ phase: "holdOut", seconds: session.holdOut! })
    }
    return steps
  }, [session])

  const [running, setRunning] = useState(true)
  const [elapsed, setElapsed] = useState(0)
  const [stepIndex, setStepIndex] = useState(0)
  const [stepLeft, setStepLeft] = useState(cycle[0]?.seconds ?? 4)
  const [done, setDone] = useState(false)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const completedRef = useRef(false)
  const scene = HEALING_SCENES[session.scene]

  const current = cycle[stepIndex] ?? cycle[0]
  const progress = Math.min(100, (elapsed / session.durationSec) * 100)
  const scale =
    current.phase === "inhale"
      ? 1.2
      : current.phase === "exhale"
        ? 0.84
        : current.phase === "hold"
          ? 1.12
          : 0.9

  useEffect(() => {
    if (muted) {
      stopSoundscape()
      return
    }
    void startSoundscape(soundscape, volume)
    return () => stopSoundscape()
  }, [soundscape, muted])

  useEffect(() => {
    if (!muted) setSoundscapeVolume(volume)
  }, [volume, muted])

  useEffect(() => {
    if (!running || done) return
    const id = window.setInterval(() => {
      setElapsed((e) => {
        const next = e + 1
        if (next >= session.durationSec && !completedRef.current) {
          completedRef.current = true
          setDone(true)
          setRunning(false)
          try {
            const streak = Number(localStorage.getItem(SESSION_STREAK_KEY) || "0")
            localStorage.setItem(SESSION_STREAK_KEY, String(streak + 1))
          } catch {
            /* ignore */
          }
          onComplete()
        }
        return Math.min(next, session.durationSec)
      })
      setStepLeft((left) => {
        if (left > 1) return left - 1
        setStepIndex((i) => (i + 1) % cycle.length)
        return 0
      })
    }, 1000)
    return () => window.clearInterval(id)
  }, [running, done, session.durationSec, cycle.length, onComplete])

  useEffect(() => {
    if (stepLeft === 0) setStepLeft(cycle[stepIndex]?.seconds ?? 4)
  }, [stepIndex, stepLeft, cycle])

  const reset = () => {
    completedRef.current = false
    setElapsed(0)
    setStepIndex(0)
    setStepLeft(cycle[0]?.seconds ?? 4)
    setDone(false)
    setRunning(true)
  }

  const close = () => {
    stopSoundscape()
    onClose()
  }

  return (
    <div className="relative min-h-[70vh] overflow-hidden rounded-2xl border border-border/50">
      <HealingSceneBackdrop scene={session.scene} />
      <div className="relative z-10 flex min-h-[70vh] flex-col p-5 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-200/90">
              {session.nature} · {scene.label}
            </p>
            <h3 className="mt-1 text-xl font-semibold text-white md:text-2xl">{session.title}</h3>
            <p className="mt-1 max-w-xl text-sm text-white/70">{session.cue}</p>
            <p className="mt-1 text-xs text-white/50">{scene.mood}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={close}
            aria-label="Close session"
            className="text-white hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center py-8">
          <div
            className="flex h-48 w-48 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-[0_0_80px_rgba(255,255,255,0.12)] backdrop-blur-md transition-transform duration-1000 ease-in-out md:h-60 md:w-60"
            style={{ transform: `scale(${scale})` }}
            aria-live="polite"
          >
            <div className="text-center">
              <p className="text-sm font-medium text-white/80">{phaseLabel(current.phase)}</p>
              <p className="mt-1 text-5xl font-semibold tabular-nums text-white">
                {Math.max(stepLeft, 1)}
              </p>
            </div>
          </div>
          <p className="mt-8 text-sm text-white/70">
            {done
              ? "Healing complete — notice the quiet in your body."
              : `${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, "0")} / ${Math.floor(session.durationSec / 60)}:${String(session.durationSec % 60).padStart(2, "0")}`}
          </p>
          <div className="mt-3 h-1.5 w-full max-w-md overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full rounded-full bg-gradient-to-r from-teal-300 to-sky-200 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border border-white/10 bg-black/25 p-4 backdrop-blur-md">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-white/60">Peaceful music</span>
            {SOUNDSCAPES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => onSoundscapeChange(s.id)}
                className={cn(
                  "rounded-full border px-2.5 py-1 text-[11px] transition-colors",
                  soundscape === s.id
                    ? "border-teal-300/50 bg-teal-400/20 text-teal-100"
                    : "border-white/15 bg-white/5 text-white/70 hover:bg-white/10"
                )}
              >
                {s.title}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setMuted((m) => !m)}
              className="gap-2"
            >
              {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              {muted ? "Unmute" : "Mute"}
            </Button>
            <label className="flex min-w-[140px] flex-1 items-center gap-2 text-xs text-white/70">
              Volume
              <input
                type="range"
                min={0.05}
                max={1}
                step={0.05}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full accent-teal-300"
                aria-label="Music volume"
              />
            </label>
            {!done ? (
              <Button onClick={() => setRunning((r) => !r)} size="sm">
                {running ? (
                  <>
                    <Pause className="mr-2 h-4 w-4" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" /> Resume
                  </>
                )}
              </Button>
            ) : (
              <Button onClick={reset} size="sm">
                <RotateCcw className="mr-2 h-4 w-4" /> Repeat
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={close} className="text-white">
              End
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
