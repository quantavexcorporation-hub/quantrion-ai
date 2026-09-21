"use client"

import { Play, FileQuestion, MonitorPlay } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

const actions = [
  {
    title: "Start Learning",
    description: "Continue your adaptive path",
    icon: Play,
  },
  {
    title: "Practice Questions",
    description: "Targeted drills, instant feedback",
    icon: FileQuestion,
  },
  {
    title: "Take a Test",
    description: "AI-calibrated assessment",
    icon: MonitorPlay,
  },
]

export function ActionCards() {
  const { requireAuth } = useAuth()
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
      {actions.map((action) => (
        <button
          key={action.title}
          onClick={() => requireAuth("/app", "login")}
          className="q-surface-interactive flex flex-col items-start gap-3 p-4 text-left"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/15">
            <action.icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">{action.title}</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">{action.description}</p>
          </div>
        </button>
      ))}
    </div>
  )
}
