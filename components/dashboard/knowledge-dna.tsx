"use client"

import { Brain, Target, Zap, RotateCcw } from "lucide-react"
import { knowledgeDnaExtended } from "./command-data"

interface KnowledgeDNAProps {
  conceptMastery: number
  accuracyScore: number
  speedIndex: number
  retention: number
}

const metrics = [
  { key: "conceptMastery", label: "Concept Mastery", icon: Brain, color: "text-primary" },
  { key: "accuracyScore", label: "Accuracy Pattern", icon: Target, color: "text-green-500" },
  { key: "speedIndex", label: "Speed Index", icon: Zap, color: "text-yellow-500" },
  { key: "retention", label: "Retention Score", icon: RotateCcw, color: "text-sky-400" },
] as const

function ProgressRing({ value, color }: { value: number; color: string }) {
  const radius = 36
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  return (
    <div className="relative h-24 w-24">
      <svg className="h-full w-full -rotate-90" aria-hidden>
        <circle
          cx="48"
          cy="48"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          className="text-secondary"
        />
        <circle
          cx="48"
          cy="48"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={`q-ring-draw ${color}`}
          style={{ animationDelay: "120ms" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-semibold tabular-nums text-foreground">{value}%</span>
      </div>
    </div>
  )
}

export function KnowledgeDNA({
  conceptMastery = 80,
  accuracyScore = 83,
  speedIndex = 71,
  retention = 66,
}: KnowledgeDNAProps) {
  const values = { conceptMastery, accuracyScore, speedIndex, retention }

  return (
    <div className="q-surface h-full p-4 transition-shadow hover:shadow-[0_0_0_1px_rgba(59,130,246,0.12)] sm:p-6">
      <div className="mb-2 flex items-center gap-2">
        <Brain className="h-4 w-4 text-primary" />
        <h3 className="font-semibold tracking-tight text-foreground">Knowledge DNA</h3>
      </div>
      <p className="mb-5 text-xs text-muted-foreground">
        Student DNA · your digital academic identity
      </p>

      <div className="grid grid-cols-2 gap-6">
        {metrics.map((metric) => (
          <div key={metric.key} className="flex flex-col items-center">
            <ProgressRing value={values[metric.key]} color={metric.color} />
            <div className="mt-3 flex items-center gap-1.5">
              <metric.icon className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{metric.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        {knowledgeDnaExtended.map((item) => (
          <div key={item.label} className="rounded-lg border border-border/60 bg-secondary/20 px-2.5 py-2">
            <p className="text-[10px] text-muted-foreground">{item.label}</p>
            <p className="mt-0.5 text-xs font-medium text-foreground">{item.value}</p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        Your accuracy improved by <span className="font-medium text-green-400">12%</span> this week
      </p>
    </div>
  )
}
