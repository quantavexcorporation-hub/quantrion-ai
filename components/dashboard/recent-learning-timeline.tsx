"use client"

import { BookOpen, Brain, Clapperboard, MessageSquare, RefreshCw } from "lucide-react"
import { recentTimeline } from "./command-data"

const icons = {
  video: Clapperboard,
  notes: BookOpen,
  test: Brain,
  revision: RefreshCw,
  ai: MessageSquare,
}

export function RecentLearningTimeline() {
  return (
    <section className="q-surface rounded-2xl p-5" aria-label="Recent learning timeline">
      <h2 className="text-lg font-semibold tracking-tight text-foreground">Recent Learning</h2>
      <p className="mt-1 text-sm text-muted-foreground">Newest first</p>
      <ol className="mt-4 space-y-3 border-l border-border/70 pl-4">
        {recentTimeline.map((item) => {
          const Icon = icons[item.type as keyof typeof icons] ?? BookOpen
          return (
            <li key={item.title} className="relative">
              <span className="absolute -left-[1.4rem] top-1 flex h-5 w-5 items-center justify-center rounded-full border border-border bg-card">
                <Icon className="h-3 w-3 text-primary" />
              </span>
              <p className="text-sm font-medium text-foreground">{item.title}</p>
              <p className="text-[11px] text-muted-foreground">{item.time}</p>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
