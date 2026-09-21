"use client"

import { Clock, HelpCircle, BookOpen, Brain, Activity } from "lucide-react"
import { StatusDot } from "@/components/ui/status-badge"

interface StatsFooterProps {
  totalStudyHours: number
  hoursThisWeek: number
  questionsSolved: number
  questionsThisWeek: number
  conceptsMastered: number
  completionPercent: number
  aiPrediction: number
  maxScore: number
}

export function StatsFooter({
  totalStudyHours = 127,
  hoursThisWeek = 12,
  questionsSolved = 2847,
  questionsThisWeek = 234,
  conceptsMastered = 156,
  completionPercent = 78,
  aiPrediction = 847,
  maxScore = 1000,
}: StatsFooterProps) {
  return (
    <div className="border-t border-border/80 bg-card/40 backdrop-blur-md">
      <div className="px-3 py-4 sm:px-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
          {/* Total Study Hours */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-sky-500/20 bg-sky-500/10">
              <Clock className="h-5 w-5 text-sky-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Study Hours</p>
              <p className="text-xl font-semibold tabular-nums text-foreground">{totalStudyHours}h</p>
              <p className="text-[10px] text-green-400">+{hoursThisWeek}h this week</p>
            </div>
          </div>

          {/* Questions Solved */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
              <HelpCircle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Questions Solved</p>
              <p className="font-mono text-xl font-semibold tabular-nums text-foreground">
                {questionsSolved.toLocaleString()}
              </p>
              <p className="text-[10px] text-green-400">+{questionsThisWeek} this week</p>
            </div>
          </div>

          {/* Concepts Mastered */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-green-500/20 bg-green-500/10">
              <BookOpen className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Concepts Mastered</p>
              <p className="text-xl font-semibold tabular-nums text-foreground">{conceptsMastered}</p>
              <p className="text-[10px] text-sky-400">{completionPercent}% completion</p>
            </div>
          </div>

          {/* AI Predictions */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-yellow-500/20 bg-yellow-500/10">
              <Brain className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">AI Predictions</p>
              <p className="font-mono text-xl font-semibold tabular-nums text-foreground">
                {aiPrediction}/{maxScore}
              </p>
              <p className="text-[10px] text-sky-400">Projected Score</p>
            </div>
          </div>
        </div>

        {/* System Status Bar */}
        <div className="mt-4 flex flex-col gap-3 border-t border-border/50 pt-3 text-xs sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
            <div className="flex items-center gap-2">
              <StatusDot variant="active" />
              <span className="text-muted-foreground">LLM Core: <span className="text-green-400">Active</span></span>
            </div>
            <div className="flex items-center gap-2">
              <StatusDot variant="active" />
              <span className="text-muted-foreground">Recommendation Engine: <span className="text-cyan-400">Running</span></span>
            </div>
            <div className="flex items-center gap-2">
              <StatusDot variant="updating" />
              <span className="text-muted-foreground">Knowledge Graph: <span className="text-yellow-400">Updating</span></span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Activity className="w-3.5 h-3.5" />
            <span>Global accuracy benchmark: <span className="text-cyan-400 font-medium">87%</span></span>
          </div>
        </div>
      </div>
    </div>
  )
}
