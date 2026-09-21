"use client"

import { TrendingUp } from "lucide-react"

interface IntelligenceScoreProps {
  score: number
  percentileAbove?: number
}

export function IntelligenceScore({ score = 76.0, percentileAbove = 13 }: IntelligenceScoreProps) {
  return (
    <div className="q-surface h-full p-6">
      <div className="mb-4 flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-green-500" />
        <h3 className="font-semibold text-foreground">Progress Overview</h3>
      </div>

      <div className="mb-4 flex items-end justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Overall Score</p>
          <p className="text-4xl font-semibold tracking-tight tabular-nums text-foreground">
            {score.toFixed(1)}
          </p>
        </div>
        <div className="text-right">
          <span className="inline-flex items-center gap-1 rounded-md bg-green-500/10 px-2 py-1 text-sm text-green-400">
            <TrendingUp className="h-3 w-3" />
            +{percentileAbove}%
          </span>
          <p className="mt-1 text-xs text-muted-foreground">vs last week</p>
        </div>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-sky-400 transition-all duration-700"
          style={{ width: `${score}%` }}
        />
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        Your cognitive profile is{" "}
        <span className="font-medium text-green-400">{percentileAbove}% above average</span> for your cohort
      </p>
    </div>
  )
}
