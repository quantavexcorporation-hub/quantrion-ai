"use client"

import Link from "next/link"
import { Flame, Search, Sparkles, Trophy, Clapperboard } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  aiRecommendations,
  dailyChallenge,
  timelineBuckets,
} from "./data"

export function AIRecommendationPanel() {
  return (
    <section className="glass-card rounded-2xl p-5" aria-label="Smart recommendations">
      <div className="mb-3 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-primary" />
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Smart Recommendations</h2>
      </div>
      <ul className="space-y-2">
        {aiRecommendations.map((r) => (
          <li key={r.title}>
            <Link
              href={r.href}
              className="block rounded-xl border border-border/50 bg-secondary/20 px-3 py-2.5 transition-colors hover:border-primary/30"
            >
              <p className="text-sm font-medium text-foreground">{r.title}</p>
              <p className="text-[11px] text-muted-foreground">{r.reason}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function LearningTimeline() {
  return (
    <section className="glass-card rounded-2xl p-5" aria-label="Learning timeline">
      <h2 className="text-lg font-semibold tracking-tight text-foreground">Interactive Timeline</h2>
      <p className="mt-1 text-xs text-muted-foreground">Today · history · bookmarks · continue</p>
      <div className="mt-4 space-y-3">
        {timelineBuckets.map((b) => (
          <div key={b.id} className="rounded-xl border border-border/50 bg-secondary/20 p-3">
            <p className="text-[10px] font-medium uppercase tracking-wider text-primary">{b.label}</p>
            <ul className="mt-1.5 space-y-1">
              {b.items.map((item) => (
                <li key={item} className="text-xs text-muted-foreground">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export function DailyChallenge() {
  return (
    <section className="glass-card rounded-2xl p-5" aria-label="Daily challenges">
      <div className="mb-3 flex items-center gap-2">
        <Flame className="h-4 w-4 text-amber-400" />
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Daily Challenges</h2>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="rounded-xl bg-secondary/25 p-3">
          <p className="text-[10px] text-muted-foreground">Today&apos;s Concept</p>
          <p className="text-sm font-medium text-foreground">{dailyChallenge.concept}</p>
        </div>
        <div className="rounded-xl bg-secondary/25 p-3">
          <p className="text-[10px] text-muted-foreground">Today&apos;s Quiz</p>
          <p className="text-sm font-medium text-foreground">{dailyChallenge.quiz}</p>
        </div>
        <div className="rounded-xl bg-secondary/25 p-3">
          <p className="text-[10px] text-muted-foreground">60-Second Challenge</p>
          <p className="text-sm font-medium text-foreground">{dailyChallenge.sprint}</p>
        </div>
        <div className="rounded-xl bg-secondary/25 p-3">
          <p className="text-[10px] text-muted-foreground">Streak / Weekly</p>
          <p className="flex items-center gap-1 text-sm font-medium text-foreground">
            <Trophy className="h-3.5 w-3.5 text-amber-400" />
            {dailyChallenge.streak}d · {dailyChallenge.weeklyTarget}
          </p>
          <Progress value={80} className="mt-2 h-1" />
        </div>
      </div>
    </section>
  )
}

export function IntelligentSearch() {
  return (
    <section className="glass-card rounded-2xl p-5" aria-label="Intelligent search">
      <div className="mb-3 flex items-center gap-2">
        <Search className="h-4 w-4 text-primary" />
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Search</h2>
      </div>
      <Input placeholder="Concept, formula, topic, exam, teacher, technology…" aria-label="QuickLearn search" />
      <p className="mt-2 text-xs text-muted-foreground">
        AI answers appear instantly — linked to Study Material, Smart Library, and Knowledge DNA.
      </p>
    </section>
  )
}

export function ShortsStudioTeaser() {
  return (
    <section
      className="rounded-2xl border border-dashed border-border/70 bg-secondary/15 p-5"
      aria-label="AI Shorts Studio future ready"
    >
      <div className="flex items-center gap-2">
        <Clapperboard className="h-4 w-4 text-muted-foreground" />
        <h2 className="text-sm font-semibold text-foreground">AI Shorts Studio</h2>
        <span className="rounded-full border border-border/60 px-2 py-0.5 text-[10px] text-muted-foreground">
          Future ready
        </span>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        Reserved for AI-generated educational shorts, verified educator uploads, and institution
        explainers — without turning QuickLearn into a social feed.
      </p>
    </section>
  )
}

export function IntegrationStrip() {
  const links = [
    { label: "Knowledge DNA", href: "/knowledge-dna" },
    { label: "Progress IQ", href: "/knowledge-dna" },
    { label: "Study Material", href: "/study-material" },
    { label: "Smart Library", href: "/library" },
    { label: "Mock Tests", href: "/tests" },
    { label: "Learn", href: "/learn" },
  ]
  return (
    <section className="flex flex-wrap gap-2" aria-label="Platform integrations">
      {links.map((l) => (
        <Link
          key={l.label}
          href={l.href}
          className="rounded-full border border-border/60 bg-secondary/30 px-3 py-1.5 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
        >
          Syncs with {l.label}
        </Link>
      ))}
    </section>
  )
}
