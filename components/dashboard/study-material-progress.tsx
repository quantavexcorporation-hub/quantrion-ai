"use client"

import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { studyMaterialProgress } from "./command-data"

export function StudyMaterialProgressCard() {
  return (
    <section className="glass-card rounded-2xl p-5" aria-label="Study material progress">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">Study Material Progress</h2>
          <p className="text-sm text-muted-foreground">Connected to your learning workspace</p>
        </div>
        <Link href="/study-material" className="text-xs font-medium text-primary hover:underline">
          Open Study Material
        </Link>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {studyMaterialProgress.map((item) => (
          <div key={item.label} className="rounded-xl border border-border/60 bg-secondary/20 p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="text-xs font-medium tabular-nums text-foreground">{item.value}</p>
            </div>
            <Progress value={item.pct} className="mt-2 h-1.5" />
          </div>
        ))}
      </div>
    </section>
  )
}
