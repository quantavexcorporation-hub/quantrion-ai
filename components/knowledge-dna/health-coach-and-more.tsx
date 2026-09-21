"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ProgressRing } from "@/components/study-material/progress-ring"
import { achievements, coachAdvice, comparative, healthScores } from "./data"

export function ComparativeAndAchievements() {
  return (
    <div className="mb-6 grid gap-6 lg:grid-cols-2">
      <section className="glass-card rounded-2xl p-5" aria-label="Comparative intelligence">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Comparative Intelligence
        </h2>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {comparative.map((c) => (
            <div key={c.label} className="rounded-xl border border-border/60 bg-secondary/20 p-3 text-center">
              <p className="text-[10px] text-muted-foreground">{c.label}</p>
              <p className="mt-1 text-xl font-semibold tabular-nums text-foreground">{c.score}</p>
              <p className="text-[11px] text-green-400">{c.delta}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-card rounded-2xl p-5" aria-label="Achievement timeline">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Achievement Timeline</h2>
        <ol className="mt-4 space-y-3 border-l border-border/70 pl-4">
          {achievements.map((a) => (
            <li key={a.title} className="relative">
              <span className="absolute -left-[1.15rem] top-1.5 h-2 w-2 rounded-full bg-primary" />
              <p className="text-sm font-medium text-foreground">{a.title}</p>
              <p className="text-xs text-muted-foreground">{a.detail}</p>
              <p className="text-[10px] text-muted-foreground">{a.when}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}

export function KnowledgeHealth() {
  const overall = 80
  return (
    <section className="glass-card mb-6 rounded-2xl p-5 md:p-6" aria-label="Knowledge health">
      <div className="grid gap-6 md:grid-cols-[160px_1fr] md:items-center">
        <div className="flex justify-center">
          <ProgressRing value={overall} label="Learning Health" color="#22C55E" size={140} />
        </div>
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">Knowledge Health</h2>
          <p className="mt-1 text-sm text-muted-foreground">Apple Health–inspired learning wellness</p>
          <div className="mt-4 space-y-3">
            {healthScores.map((h) => (
              <div key={h.label}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-muted-foreground">{h.label}</span>
                  <span className="tabular-nums text-foreground">{h.value}%</span>
                </div>
                <Progress value={h.value} className="h-1.5" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function FutureIntelligence() {
  return (
    <section className="relative mb-6 overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 via-card to-sky-500/10 p-6 md:p-8">
      <div className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full bg-primary/20 blur-3xl" />
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
        Future Intelligence
      </p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
        Knowledge DNA continuously evolves
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        Every learning interaction updates mastery, retention, learning behaviour, exam prediction,
        adaptive learning, and personalization — so DNA powers Study Material, Mock Tests, AI Tutor,
        Progress IQ, and Recommendations as one intelligence layer.
      </p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        {["Mastery", "Retention", "Behaviour", "Exam Prediction", "Adaptive Learning", "Personalization"].map(
          (tag) => (
            <span
              key={tag}
              className="rounded-full border border-border/70 bg-background/40 px-3 py-1 text-muted-foreground backdrop-blur"
            >
              {tag}
            </span>
          )
        )}
      </div>
    </section>
  )
}

export function AICoachPanel() {
  return (
    <aside
      className="glass-card sticky top-4 rounded-2xl p-5"
      aria-label="AI coach panel"
    >
      <h2 className="text-lg font-semibold tracking-tight text-foreground">AI Coach</h2>
      <p className="mt-1 text-xs text-muted-foreground">Persistent guidance from your DNA</p>
      <ul className="mt-4 space-y-3">
        {coachAdvice.map((item) => (
          <li key={item.title} className="rounded-xl border border-border/60 bg-secondary/20 p-3">
            <p className="text-[10px] uppercase tracking-wider text-primary">{item.title}</p>
            <p className="mt-1 text-sm text-foreground">{item.body}</p>
            <Button size="sm" variant="outline" className="mt-2 h-7 text-[11px]">
              Take action
            </Button>
          </li>
        ))}
      </ul>
    </aside>
  )
}
