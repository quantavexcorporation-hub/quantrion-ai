"use client"

import { Beaker, BookOpenCheck, ClipboardList } from "lucide-react"
import { ProgressRing } from "@/components/study-material/progress-ring"
import { dashboardMission } from "./command-data"

export function MissionCard() {
  return (
    <section className="glass-card rounded-2xl p-5 md:p-6" aria-label="Daily mission">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Daily Mission
          </p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight text-foreground">Today&apos;s Goal</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-border/60 bg-secondary/25 p-3">
              <div className="flex items-center gap-2 text-primary">
                <BookOpenCheck className="h-4 w-4" />
                <span className="text-xs font-medium">Study</span>
              </div>
              <p className="mt-2 text-sm font-semibold text-foreground">{dashboardMission.study.subject}</p>
              <p className="text-xs text-muted-foreground">{dashboardMission.study.topics} Topics</p>
            </div>
            <div className="rounded-xl border border-border/60 bg-secondary/25 p-3">
              <div className="flex items-center gap-2 text-sky-400">
                <Beaker className="h-4 w-4" />
                <span className="text-xs font-medium">Revision</span>
              </div>
              <p className="mt-2 text-sm font-semibold text-foreground">{dashboardMission.revision.subject}</p>
              <p className="text-xs text-muted-foreground">{dashboardMission.revision.topics} Topic</p>
            </div>
            <div className="rounded-xl border border-border/60 bg-secondary/25 p-3">
              <div className="flex items-center gap-2 text-green-400">
                <ClipboardList className="h-4 w-4" />
                <span className="text-xs font-medium">Mock Test</span>
              </div>
              <p className="mt-2 text-sm font-semibold text-foreground">{dashboardMission.mock.questions} Questions</p>
              <p className="text-xs text-muted-foreground">Est. {dashboardMission.estimated}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <ProgressRing
            value={dashboardMission.completion}
            label="Completion"
            color="#3B82F6"
            size={132}
          />
        </div>
      </div>
    </section>
  )
}
