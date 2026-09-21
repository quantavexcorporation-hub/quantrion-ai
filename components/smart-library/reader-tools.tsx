"use client"

import Link from "next/link"
import { linkedIntel, revisionLayers, visualizeModes } from "./data"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface ReaderToolsProps {
  memoryMode: boolean
  onMemoryModeChange: (v: boolean) => void
}

export function ConceptVisualization() {
  return (
    <section className="glass-card rounded-2xl p-5" aria-label="Concept visualization">
      <h2 className="text-lg font-semibold tracking-tight text-foreground">AI Visual Learning</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        On demand only — reserved for concepts where viz improves understanding
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {visualizeModes.map((mode) => (
          <button
            key={mode}
            type="button"
            className="rounded-xl border border-border/70 bg-secondary/25 px-3 py-3 text-left text-xs font-medium text-foreground transition-colors hover:border-primary/40"
          >
            {mode}
          </button>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-dashed border-primary/30 bg-primary/5 p-6 text-center">
        <p className="text-sm text-muted-foreground">
          Reading pages stay clean. Interactive stages appear on marked concept pages (e.g. FBD,
          molecules) — or tap Watch Animation from the page action rail.
        </p>
        <Button size="sm" className="mt-3">
          Open concept stage
        </Button>
      </div>
    </section>
  )
}

export function RevisionPanel() {
  return (
    <section className="glass-card rounded-2xl p-5" aria-label="AI revision layer">
      <h2 className="text-lg font-semibold tracking-tight text-foreground">AI Revision Layer</h2>
      <p className="mt-1 text-sm text-muted-foreground">Inside every chapter</p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {revisionLayers.map((item) => (
          <div key={item.title} className="rounded-xl border border-border/60 bg-secondary/20 p-3">
            <p className="text-xs font-medium text-primary">{item.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function LinkedIntelligence() {
  return (
    <section className="glass-card rounded-2xl p-5" aria-label="Linked intelligence">
      <h2 className="text-lg font-semibold tracking-tight text-foreground">Linked Intelligence</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        One engine with Study Material, Knowledge DNA, and Progress IQ
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {linkedIntel.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="rounded-full border border-border/70 bg-secondary/30 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  )
}

export function SmartHighlightsAndMemory({ memoryMode, onMemoryModeChange }: ReaderToolsProps) {
  return (
    <section className="glass-card rounded-2xl p-5" aria-label="Smart highlights and memory mode">
      <h2 className="text-lg font-semibold tracking-tight text-foreground">Smart Highlights</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Auto-categorized: Definitions · Formula · Revision · Important · Weak Concept
      </p>
      <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
        {[
          { label: "Definitions", color: "bg-primary/20 text-primary" },
          { label: "Formula", color: "bg-sky-500/20 text-sky-300" },
          { label: "Revision", color: "bg-green-500/20 text-green-300" },
          { label: "Important", color: "bg-amber-500/20 text-amber-300" },
          { label: "Weak Concept", color: "bg-rose-500/20 text-rose-300" },
        ].map((tag) => (
          <span key={tag.label} className={`rounded-md px-2 py-1 ${tag.color}`}>
            {tag.label}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between rounded-xl border border-border/60 bg-secondary/20 px-3 py-3">
        <div>
          <Label htmlFor="memory-mode" className="text-sm font-medium text-foreground">
            Memory Mode
          </Label>
          <p className="text-xs text-muted-foreground">Hide explanations · recall first · track confidence</p>
        </div>
        <Switch
          id="memory-mode"
          checked={memoryMode}
          onCheckedChange={onMemoryModeChange}
          aria-label="Toggle memory mode"
        />
      </div>
    </section>
  )
}

export function BookAnalytics({ completion, retention }: { completion: number; retention: number }) {
  return (
    <section className="glass-card rounded-2xl p-5" aria-label="Book analytics">
      <h2 className="text-lg font-semibold tracking-tight text-foreground">Book Analytics</h2>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-border/60 bg-secondary/20 p-3">
          <p className="text-[10px] text-muted-foreground">Completion</p>
          <p className="text-2xl font-semibold tabular-nums text-foreground">{completion}%</p>
        </div>
        <div className="rounded-xl border border-border/60 bg-secondary/20 p-3">
          <p className="text-[10px] text-muted-foreground">Retention</p>
          <p className="text-2xl font-semibold tabular-nums text-foreground">{retention}%</p>
        </div>
        <div className="rounded-xl border border-border/60 bg-secondary/20 p-3">
          <p className="text-[10px] text-muted-foreground">DNA updates</p>
          <p className="text-sm font-medium text-foreground">Synced live</p>
        </div>
        <div className="rounded-xl border border-border/60 bg-secondary/20 p-3">
          <p className="text-[10px] text-muted-foreground">Progress IQ</p>
          <p className="text-sm font-medium text-foreground">Feeding engine</p>
        </div>
      </div>
    </section>
  )
}

export function FutureConversationalBook() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 via-card to-sky-500/10 p-6 md:p-8">
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
        Future AI Feature
      </p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
        The book becomes conversational
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        Ask “Explain this paragraph”, “Why this formula?”, “Show animation”, or “Show PYQs” — AI answers
        in context without leaving the page, writing back into Knowledge DNA and Progress IQ.
      </p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        {[
          "Explain this paragraph",
          "What does this formula mean?",
          "Why is this important?",
          "Show animation",
          "Show previous year questions",
          "Compare with previous chapter",
        ].map((q) => (
          <span
            key={q}
            className="rounded-full border border-border/70 bg-background/40 px-3 py-1.5 text-muted-foreground backdrop-blur"
          >
            {q}
          </span>
        ))}
      </div>
    </section>
  )
}
