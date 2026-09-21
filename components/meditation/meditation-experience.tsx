"use client"

import { useEffect, useState } from "react"
import { Flower2, HeartPulse, Leaf, Music2, Sparkles, Waves, Wind } from "lucide-react"
import { ShellLayout } from "@/components/layout/shell-layout"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { StressCheckIn } from "./stress-check-in"
import { BreathingSession } from "./breathing-session"
import { HealingSceneBackdrop } from "./healing-scene"
import {
  HEALING_SCENES,
  MEDITATION_SESSIONS,
  RELIEF_TOOLS,
  SOUND_PREF_KEY,
  SOUNDSCAPES,
  levelColor,
  levelLabel,
  levelRing,
  recommendSessions,
  SESSION_STREAK_KEY,
  STRESS_HISTORY_KEY,
  wellbeingTips,
  type MeditationSession,
  type SoundscapeId,
  type StressHistoryEntry,
  type StressLevel,
  type StressSignals,
} from "./meditation-data"
import { startSoundscape, stopSoundscape } from "./peaceful-audio"

export function MeditationExperience() {
  const [result, setResult] = useState<{
    score: number
    level: StressLevel
    signals: StressSignals
  } | null>(null)
  const [active, setActive] = useState<MeditationSession | null>(null)
  const [history, setHistory] = useState<StressHistoryEntry[]>([])
  const [streak, setStreak] = useState(0)
  const [justCompleted, setJustCompleted] = useState(false)
  const [soundscape, setSoundscape] = useState<SoundscapeId>("soft-pads")
  const [previewing, setPreviewing] = useState(false)
  const [releaseNote, setReleaseNote] = useState("")
  const [noteSaved, setNoteSaved] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STRESS_HISTORY_KEY)
      setHistory(raw ? (JSON.parse(raw) as StressHistoryEntry[]) : [])
      setStreak(Number(localStorage.getItem(SESSION_STREAK_KEY) || "0"))
      const pref = localStorage.getItem(SOUND_PREF_KEY) as SoundscapeId | null
      if (pref && SOUNDSCAPES.some((s) => s.id === pref)) setSoundscape(pref)
    } catch {
      /* ignore */
    }
    return () => stopSoundscape()
  }, [result, justCompleted])

  const recommended = result ? recommendSessions(result.level) : []
  const tips = result ? wellbeingTips(result.level) : []

  const chooseSound = (id: SoundscapeId) => {
    setSoundscape(id)
    try {
      localStorage.setItem(SOUND_PREF_KEY, id)
    } catch {
      /* ignore */
    }
  }

  const previewSound = async (id: SoundscapeId) => {
    chooseSound(id)
    setPreviewing(true)
    await startSoundscape(id, 0.45)
    window.setTimeout(() => {
      stopSoundscape()
      setPreviewing(false)
    }, 4500)
  }

  return (
    <ShellLayout
      title="Meditation"
      subtitle="A deep healing sanctuary — peaceful imagery, calm music, and stress relief for a healthier mind."
      aiStatus="optimizing"
      hideHeader={Boolean(active)}
      className={active ? "!p-0 md:!p-0 xl:!p-0" : undefined}
    >
      {active ? (
        <div className="min-h-full bg-background p-4 md:p-6 xl:p-8">
          <BreathingSession
            session={active}
            soundscape={soundscape}
            onSoundscapeChange={chooseSound}
            onClose={() => {
              stopSoundscape()
              setActive(null)
            }}
            onComplete={() => setJustCompleted(true)}
          />
        </div>
      ) : (
        <div className="space-y-6">
          <section className="relative overflow-hidden rounded-2xl border border-teal-400/20">
            <HealingSceneBackdrop scene="moon-lake" />
            <div className="relative z-10 p-5 md:p-7">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal-300/25 bg-teal-400/10 px-3 py-1 text-[11px] font-medium text-teal-100">
                    <Flower2 className="h-3.5 w-3.5" />
                    Intelligence Widget · Deep healing (not Focus Mode)
                  </div>
                  <h1 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                    Meditation sanctuary
                  </h1>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    Different from Focus Mode — this space is for healing imagery, peaceful music,
                    emotional release, and a calm nervous system. Rest first. Study later.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3 sm:min-w-[280px]">
                  <Stat label="Healing sessions" value={String(streak)} icon={Wind} />
                  <Stat
                    label="Last calm score"
                    value={history[0] ? String(history[0].score) : "—"}
                    icon={HeartPulse}
                  />
                  <Stat label="Check-ins" value={String(history.length)} icon={Leaf} />
                </div>
              </div>
            </div>
          </section>

          <StressCheckIn
            onComplete={(r) => {
              setResult(r)
              setJustCompleted(false)
            }}
          />

          {/* Peaceful music library */}
          <section className="glass-card rounded-2xl p-5 md:p-6">
            <div className="mb-4 flex items-center gap-2">
              <Music2 className="h-4 w-4 text-teal-300" />
              <h3 className="font-semibold text-foreground">Peaceful music</h3>
              <span className="text-xs text-muted-foreground">
                {previewing ? "Preview playing…" : "Tap to preview · auto-plays in sessions"}
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {SOUNDSCAPES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => void previewSound(s.id)}
                  className={cn(
                    "rounded-xl border p-4 text-left transition-all hover:-translate-y-0.5",
                    soundscape === s.id
                      ? "border-teal-400/40 bg-teal-500/10"
                      : "border-border/60 bg-secondary/30 hover:border-teal-400/25"
                  )}
                >
                  <p className="text-sm font-semibold text-foreground">{s.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {s.description}
                  </p>
                </button>
              ))}
            </div>
          </section>

          {/* Healing imagery gallery */}
          <section>
            <div className="mb-3 flex items-center gap-2">
              <Waves className="h-4 w-4 text-sky-300" />
              <h3 className="font-semibold text-foreground">Healing imagery</h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {(Object.keys(HEALING_SCENES) as Array<keyof typeof HEALING_SCENES>).map((key) => {
                const meta = HEALING_SCENES[key]
                return (
                  <div
                    key={key}
                    className="relative h-28 overflow-hidden rounded-xl border border-border/50"
                  >
                    <HealingSceneBackdrop scene={key} />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                      <p className="text-xs font-semibold text-white">{meta.label}</p>
                      <p className="text-[10px] text-white/70">{meta.mood}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {result && (
            <>
              <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                <div
                  className={cn(
                    "glass-card relative overflow-hidden rounded-2xl p-6",
                    "bg-gradient-to-br",
                    levelRing(result.level)
                  )}
                >
                  <div className="absolute inset-0 bg-card/80 backdrop-blur-sm" />
                  <div className="relative">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      Stress level detected
                    </p>
                    <div className="mt-3 flex flex-wrap items-end gap-4">
                      <p className={cn("text-5xl font-semibold tabular-nums", levelColor(result.level))}>
                        {result.score}
                      </p>
                      <div className="pb-1">
                        <p className={cn("text-lg font-semibold", levelColor(result.level))}>
                          {levelLabel(result.level)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Healing path ready · {recommended[0]?.title ?? "Heart Heal"} first
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 grid gap-3 sm:grid-cols-5">
                      {(
                        [
                          ["Tension", result.signals.tension],
                          ["Overwhelm", result.signals.overwhelm],
                          ["Sleep", result.signals.sleepDebt],
                          ["Exams", result.signals.examPressure],
                          ["Emotion", result.signals.emotionalWeight],
                        ] as const
                      ).map(([label, v]) => (
                        <div
                          key={label}
                          className="rounded-xl border border-border/50 bg-background/40 p-3"
                        >
                          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                            {label}
                          </p>
                          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
                            <div
                              className="h-full rounded-full bg-teal-400/80"
                              style={{ width: `${v * 10}%` }}
                            />
                          </div>
                          <p className="mt-1 text-xs tabular-nums text-foreground">{v}/10</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-teal-300" />
                    <h3 className="font-semibold text-foreground">Calm guidance</h3>
                  </div>
                  <ul className="mt-4 space-y-3">
                    {tips.map((tip) => (
                      <li
                        key={tip}
                        className="rounded-xl border border-border/50 bg-secondary/30 px-3 py-2.5 text-sm leading-relaxed text-muted-foreground"
                      >
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section>
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-foreground">Recommended healing</h3>
                  <p className="text-sm text-muted-foreground">
                    Deep calm sessions with imagery + your selected peaceful music
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {recommended.map((session, i) => (
                    <SessionCard
                      key={session.id}
                      session={session}
                      badge={i === 0 ? "Best match" : undefined}
                      onStart={() => setActive(session)}
                    />
                  ))}
                </div>
              </section>
            </>
          )}

          {/* All healing journeys */}
          <section>
            <div className="mb-3">
              <h3 className="text-lg font-semibold text-foreground">All healing journeys</h3>
              <p className="text-sm text-muted-foreground">
                Heart heal, ocean release, loving-kindness, body soften, night wind-down — not focus
                training
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {MEDITATION_SESSIONS.map((session) => (
                <SessionCard
                  key={session.id}
                  session={session}
                  onStart={() => setActive(session)}
                />
              ))}
            </div>
          </section>

          {/* More relief tools */}
          <section className="glass-card rounded-2xl p-5 md:p-6">
            <h3 className="font-semibold text-foreground">More ways to relieve stress</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Quick calming tools you can use anytime — with or without a full session
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {RELIEF_TOOLS.map((tool) => (
                <div
                  key={tool.id}
                  className="rounded-xl border border-border/50 bg-secondary/30 p-4"
                >
                  <p className="text-sm font-semibold text-teal-200">{tool.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{tool.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-xl border border-border/50 bg-background/40 p-4">
              <p className="text-sm font-semibold text-foreground">Stress release note</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Write what feels heavy — kept only in this browser, then let it go.
              </p>
              <textarea
                value={releaseNote}
                onChange={(e) => {
                  setReleaseNote(e.target.value)
                  setNoteSaved(false)
                }}
                rows={3}
                placeholder="I feel stressed about…"
                className="mt-3 w-full resize-none rounded-lg border border-border bg-secondary/40 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-teal-400/40"
              />
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    setReleaseNote("")
                    setNoteSaved(true)
                  }}
                >
                  Release & clear
                </Button>
                {noteSaved && (
                  <span className="text-xs text-emerald-300">Released. The mind can soften now.</span>
                )}
              </div>
            </div>
          </section>

          {history.length > 0 && (
            <section className="glass-card rounded-2xl p-5 md:p-6">
              <h3 className="font-semibold text-foreground">Recent calm check-ins</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {history.slice(0, 10).map((h) => (
                  <div
                    key={h.at}
                    className="rounded-lg border border-border/60 bg-secondary/40 px-3 py-2 text-xs"
                  >
                    <span className={cn("font-semibold tabular-nums", levelColor(h.level))}>
                      {h.score}
                    </span>
                    <span className="mx-1.5 text-muted-foreground">·</span>
                    <span className="text-muted-foreground">
                      {new Date(h.at).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {justCompleted && (
            <div className="rounded-xl border border-teal-400/30 bg-teal-500/10 px-4 py-3 text-sm text-teal-100">
              Beautiful. Carry this calm with you — return to study only when the body feels softer.
            </div>
          )}
        </div>
      )}
    </ShellLayout>
  )
}

function SessionCard({
  session,
  badge,
  onStart,
}: {
  session: MeditationSession
  badge?: string
  onStart: () => void
}) {
  const scene = HEALING_SCENES[session.scene]
  return (
    <article className="glass-card relative flex flex-col overflow-hidden rounded-2xl transition-transform hover:-translate-y-0.5">
      <div className="relative h-24">
        <HealingSceneBackdrop scene={session.scene} />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-card to-transparent p-3 pt-8">
          <p className="text-[10px] uppercase tracking-wider text-teal-200/90">{session.nature}</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        {badge && (
          <span className="mb-2 w-fit rounded-md bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
            {badge}
          </span>
        )}
        <h4 className="text-base font-semibold text-foreground">{session.title}</h4>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {session.description}
        </p>
        <p className="mt-3 text-xs text-teal-300/90">
          {Math.round(session.durationSec / 60)} min · {scene.label} · peaceful audio
        </p>
        <Button className="mt-4 w-full" onClick={onStart}>
          Enter sanctuary
        </Button>
      </div>
    </article>
  )
}

function Stat({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: string
  icon: typeof Wind
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/25 px-3 py-2.5 text-center backdrop-blur-sm">
      <Icon className="mx-auto h-3.5 w-3.5 text-teal-200" />
      <p className="mt-1 text-lg font-semibold tabular-nums text-white">{value}</p>
      <p className="text-[10px] uppercase tracking-wider text-white/60">{label}</p>
    </div>
  )
}
