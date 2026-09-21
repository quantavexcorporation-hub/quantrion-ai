"use client"

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react"
import {
  ChevronDown,
  ChevronUp,
  Clapperboard,
  Pause,
  Play,
  Save,
  SkipBack,
  SkipForward,
  Trash2,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import type {
  LecturePack,
  LectureSlide,
  SceneCamera,
  SceneMood,
  SceneMotion,
} from "@/lib/lecture-cognis/types"
import { retimedSlides } from "@/lib/lecture-cognis/types"
import { CinematicStage } from "./cinematic-stage"

const MOODS: SceneMood[] = ["cosmos", "quantum", "energy", "neural", "crystal", "forge", "ocean"]
const MOTIONS: SceneMotion[] = ["drift", "pulse", "orbit", "rise", "scan", "bloom"]
const CAMERAS: SceneCamera[] = ["wide", "close", "orbit", "hero"]

export function ForgeStudio({
  pack: initial,
  onClose,
  onSaved,
}: {
  pack: LecturePack
  onClose: () => void
  onSaved?: (pack: LecturePack) => void
}) {
  const [pack, setPack] = useState(initial)
  const [selectedId, setSelectedId] = useState(initial.slides?.[0]?.id ?? "")
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(initial.durationSec || 0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const slides = pack.slides ?? []
  const selected = slides.find((s) => s.id === selectedId) ?? slides[0] ?? null
  const active = useMemo(() => {
    if (!slides.length) return null
    return slides.find((s) => time >= s.startSec && time < s.endSec) ?? slides[slides.length - 1]
  }, [slides, time])

  const previewSlide = playing ? active : selected

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
  }, [pack.audioFullUrl, pack.durationSec])

  const patchSlide = (id: string, patch: Partial<LectureSlide>) => {
    setPack((prev) => {
      const list = (prev.slides ?? []).map((s) => (s.id === id ? { ...s, ...patch } : s))
      // If duration fields changed via end-start, keep as-is until retimed on save or duration field edit
      return { ...prev, slides: list }
    })
  }

  const setSceneDuration = (id: string, seconds: number) => {
    setPack((prev) => {
      const list = (prev.slides ?? []).map((s) => {
        if (s.id !== id) return s
        const start = s.startSec
        return { ...s, endSec: start + Math.max(4, seconds) }
      })
      const { slides: timed, durationSec } = retimedSlides(list)
      return { ...prev, slides: timed, durationSec }
    })
  }

  const moveScene = (id: string, dir: -1 | 1) => {
    setPack((prev) => {
      const list = [...(prev.slides ?? [])]
      const i = list.findIndex((s) => s.id === id)
      const j = i + dir
      if (i < 0 || j < 0 || j >= list.length) return prev
      ;[list[i], list[j]] = [list[j], list[i]]
      const { slides: timed, durationSec } = retimedSlides(list)
      return { ...prev, slides: timed, durationSec }
    })
  }

  const removeScene = (id: string) => {
    setPack((prev) => {
      const list = (prev.slides ?? []).filter((s) => s.id !== id)
      if (!list.length) return prev
      const { slides: timed, durationSec } = retimedSlides(list)
      if (selectedId === id) setSelectedId(timed[0]?.id ?? "")
      return { ...prev, slides: timed, durationSec }
    })
  }

  const addScene = () => {
    setPack((prev) => {
      const list = [...(prev.slides ?? [])]
      const id = `slide-${Date.now().toString(36)}`
      list.push({
        id,
        title: "New scene",
        body: "Describe the concept beat for this cinematic scene.",
        visualHint: "Hero visual · education cinema",
        startSec: 0,
        endSec: 12,
        mood: "forge",
        motion: "bloom",
        camera: "hero",
        accent: "#22d3ee",
        onScreenLine: "New beat",
      })
      const { slides: timed, durationSec } = retimedSlides(list)
      setSelectedId(id)
      return { ...prev, slides: timed, durationSec }
    })
  }

  const togglePlay = async () => {
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

  const seekToScene = async (slide: LectureSlide) => {
    const el = audioRef.current
    setSelectedId(slide.id)
    if (!el) return
    el.currentTime = slide.startSec + 0.05
    setTime(el.currentTime)
  }

  const save = async () => {
    setSaving(true)
    setMessage(null)
    try {
      const { slides: timed, durationSec } = retimedSlides(pack.slides ?? [])
      const payload = { ...pack, slides: timed, durationSec }
      const res = await fetch(`/api/lecture-cognis/jobs/${pack.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slides: timed,
          durationSec,
          scriptFull: pack.scriptFull,
          scriptShort: pack.scriptShort,
          stylePreset: pack.stylePreset,
        }),
      })
      const data = (await res.json()) as { pack?: LecturePack; error?: string }
      if (!res.ok || !data.pack) {
        setMessage(data.error || "Save failed")
        return
      }
      setPack(data.pack)
      onSaved?.(data.pack)
      setMessage("Studio cut saved to LectureCognis library")
    } catch {
      setMessage("Network error while saving")
    } finally {
      setSaving(false)
    }
  }

  const total = duration || pack.durationSec || 1
  const src = pack.audioFullUrl

  return (
    <div className="fixed inset-0 z-[70] flex flex-col bg-[#03050a]/95 pt-[env(safe-area-inset-top)] backdrop-blur-md">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/15 text-cyan-300">
            <Clapperboard className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">LectureCognis Studio</p>
            <p className="text-[11px] text-slate-400">
              {pack.topic} · cinematic education editor · {pack.engine || "cinema"}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {message && <span className="text-[11px] text-cyan-200/90">{message}</span>}
          <Button size="sm" className="gap-1.5" onClick={() => void save()} disabled={saving}>
            <Save className="h-3.5 w-3.5" />
            {saving ? "Saving…" : "Save cut"}
          </Button>
          <Button size="sm" variant="ghost" onClick={onClose} className="text-slate-300">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="grid min-h-0 min-w-0 flex-1 overflow-y-auto lg:grid-cols-[1fr_320px] lg:overflow-hidden">
        <div className="flex min-h-0 flex-col">
          <div className="min-h-0 flex-1 p-3 md:p-4">
            <CinematicStage
              slide={previewSlide}
              topic={pack.topic}
              playing={playing}
              className="h-full min-h-[280px] rounded-2xl border border-white/10 aspect-video max-h-[52vh] w-full"
            />
          </div>

          {/* Transport */}
          <div className="border-t border-white/10 px-4 py-3">
            <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-cyan-400"
                style={{ width: `${Math.min(100, (time / total) * 100)}%` }}
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  const el = audioRef.current
                  if (!el || !slides[0]) return
                  el.currentTime = slides[0].startSec
                  setSelectedId(slides[0].id)
                }}
              >
                <SkipBack className="h-3.5 w-3.5" />
              </Button>
              <Button
                size="sm"
                onClick={() => void togglePlay()}
                disabled={!src}
                className="gap-1.5 bg-cyan-400 text-slate-950 hover:bg-cyan-300"
              >
                {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                {playing ? "Pause" : "Play"}
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  const el = audioRef.current
                  if (!el || !slides.length) return
                  const last = slides[slides.length - 1]
                  el.currentTime = Math.max(0, last.startSec)
                  setSelectedId(last.id)
                }}
              >
                <SkipForward className="h-3.5 w-3.5" />
              </Button>
              <span className="text-[11px] tabular-nums text-slate-400">
                {fmt(time)} / {fmt(total)}
              </span>
              {src && <audio ref={audioRef} src={src} preload="metadata" />}
            </div>
          </div>

          {/* Timeline */}
          <div className="border-t border-white/10 bg-black/40 px-3 py-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Timeline · Visual track
              </p>
              <Button size="sm" variant="outline" onClick={addScene}>
                + Scene
              </Button>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {slides.map((s) => {
                const w = Math.max(72, ((s.endSec - s.startSec) / total) * 420)
                const activeScene = selectedId === s.id
                const live = playing && time >= s.startSec && time < s.endSec
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => void seekToScene(s)}
                    style={{ width: w, minWidth: w }}
                    className={cn(
                      "shrink-0 rounded-lg border p-2 text-left transition",
                      activeScene
                        ? "border-cyan-400/50 bg-cyan-400/15"
                        : "border-white/10 bg-white/[0.04] hover:border-white/25",
                      live && "ring-1 ring-cyan-300/60",
                    )}
                  >
                    <p className="truncate text-[11px] font-medium text-white">{s.title}</p>
                    <p className="mt-1 text-[9px] text-slate-400">
                      {fmt(s.startSec)}–{fmt(s.endSec)} · {s.mood}
                    </p>
                  </button>
                )
              })}
            </div>
            <div className="mt-3 grid gap-1">
              <TrackRow label="Voice" tone="bg-violet-400/80" />
              <TrackRow label="Script" tone="bg-amber-400/70" />
            </div>
          </div>
        </div>

        {/* Inspector */}
        <aside className="min-h-0 overflow-y-auto border-l border-white/10 bg-[#070b14] p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Scene inspector
          </p>
          {!selected ? (
            <p className="mt-4 text-sm text-slate-500">Select a scene on the timeline.</p>
          ) : (
            <div className="mt-4 space-y-3">
              <div className="flex gap-1">
                <Button size="sm" variant="secondary" onClick={() => moveScene(selected.id, -1)}>
                  <ChevronUp className="h-3.5 w-3.5" />
                </Button>
                <Button size="sm" variant="secondary" onClick={() => moveScene(selected.id, 1)}>
                  <ChevronDown className="h-3.5 w-3.5" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="ml-auto text-rose-300"
                  onClick={() => removeScene(selected.id)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>

              <Field label="Title">
                <Input
                  value={selected.title}
                  onChange={(e) => patchSlide(selected.id, { title: e.target.value })}
                  className="bg-white/5"
                />
              </Field>
              <Field label="On-screen line">
                <Input
                  value={selected.onScreenLine || ""}
                  onChange={(e) => patchSlide(selected.id, { onScreenLine: e.target.value })}
                  className="bg-white/5"
                />
              </Field>
              <Field label="Body">
                <textarea
                  value={selected.body}
                  onChange={(e) => patchSlide(selected.id, { body: e.target.value })}
                  rows={3}
                  className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                />
              </Field>
              <Field label="Visual hint">
                <Input
                  value={selected.visualHint}
                  onChange={(e) => patchSlide(selected.id, { visualHint: e.target.value })}
                  className="bg-white/5"
                />
              </Field>
              <Field label="Duration (sec)">
                <Input
                  type="number"
                  min={4}
                  max={60}
                  value={Math.round(selected.endSec - selected.startSec)}
                  onChange={(e) => setSceneDuration(selected.id, Number(e.target.value) || 12)}
                  className="bg-white/5"
                />
              </Field>
              <Field label="Mood">
                <select
                  value={selected.mood || "cosmos"}
                  onChange={(e) =>
                    patchSlide(selected.id, { mood: e.target.value as SceneMood })
                  }
                  className="h-10 w-full rounded-md border border-white/10 bg-white/5 px-2 text-sm text-white"
                >
                  {MOODS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Motion">
                <select
                  value={selected.motion || "drift"}
                  onChange={(e) =>
                    patchSlide(selected.id, { motion: e.target.value as SceneMotion })
                  }
                  className="h-10 w-full rounded-md border border-white/10 bg-white/5 px-2 text-sm text-white"
                >
                  {MOTIONS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Camera">
                <select
                  value={selected.camera || "hero"}
                  onChange={(e) =>
                    patchSlide(selected.id, { camera: e.target.value as SceneCamera })
                  }
                  className="h-10 w-full rounded-md border border-white/10 bg-white/5 px-2 text-sm text-white"
                >
                  {CAMERAS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Accent">
                <Input
                  value={selected.accent || "#22d3ee"}
                  onChange={(e) => patchSlide(selected.id, { accent: e.target.value })}
                  className="bg-white/5"
                />
              </Field>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Narration
                </p>
                <textarea
                  value={pack.scriptFull || ""}
                  onChange={(e) => setPack((p) => ({ ...p, scriptFull: e.target.value }))}
                  rows={6}
                  className="mt-2 w-full rounded-md border border-white/10 bg-transparent px-2 py-2 text-xs leading-relaxed text-slate-300"
                />
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] text-slate-400">{label}</span>
      {children}
    </label>
  )
}

function TrackRow({ label, tone }: { label: string; tone: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-12 text-[9px] uppercase tracking-wider text-slate-500">{label}</span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/5">
        <div className={cn("h-full w-full rounded-full opacity-80", tone)} />
      </div>
    </div>
  )
}

function fmt(sec: number) {
  if (!Number.isFinite(sec) || sec < 0) return "0:00"
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, "0")}`
}
