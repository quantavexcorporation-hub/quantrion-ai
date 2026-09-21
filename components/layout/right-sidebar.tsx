"use client"

import {
  Target,
  Sparkles,
  ChevronRight,
  Calendar,
  TrendingUp,
} from "lucide-react"

interface Recommendation {
  title: string
  description: string
}

interface ScheduleItem {
  time: string
  title: string
  type: "learn" | "practice"
}

const recommendations: Recommendation[] = [
  {
    title: "Review Integration by Parts",
    description: "Weakness detected. 15 min session recommended.",
  },
  {
    title: "Calculus Retention Dropping",
    description: "Schedule revision before it decays further.",
  },
  {
    title: "Optimal Study Window",
    description: "Your peak performance is 9-11 AM.",
  },
]

const schedule: ScheduleItem[] = [
  { time: "09:00", title: "Integration Techniques", type: "learn" },
  { time: "10:00", title: "Practice Problems", type: "practice" },
  { time: "11:00", title: "Thermodynamics Review", type: "learn" },
]

function ProgressRing({ value }: { value: number }) {
  const radius = 50
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  return (
    <div className="relative h-32 w-32">
      <svg className="h-full w-full -rotate-90">
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-secondary"
        />
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-green-500"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-foreground">{value}%</span>
        <span className="text-xs text-muted-foreground">READY</span>
      </div>
    </div>
  )
}

export function RightSidebar() {
  return (
    <aside className="hidden h-full w-72 overflow-y-auto border-l border-border bg-sidebar xl:block">
      <div className="space-y-6 p-5">
        {/* Exam Readiness */}
        <div className="q-surface space-y-4 p-4">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-foreground">Exam Readiness</h3>
          </div>
          <div className="flex flex-col items-center py-2">
            <ProgressRing value={73} />
            <div className="mt-3 flex items-center gap-1.5 text-xs text-green-400">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>+12% from last week</span>
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-sky-400" />
            <h3 className="text-sm font-semibold text-foreground">AI Recommendations</h3>
          </div>
          <div className="space-y-2">
            {recommendations.map((rec, i) => (
              <button
                key={i}
                className="group w-full rounded-lg border border-transparent bg-secondary/40 p-3 text-left transition-all hover:border-border hover:bg-secondary"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-foreground">{rec.title}</h4>
                    <p className="mt-1 text-xs text-muted-foreground">{rec.description}</p>
                  </div>
                  <ChevronRight className="mt-0.5 h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Today&apos;s Schedule</h3>
          </div>
          <div className="space-y-2">
            {schedule.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-lg border border-border/50 bg-secondary/30 p-3"
              >
                <span className="w-12 font-mono text-xs text-muted-foreground">{item.time}</span>
                <div className="flex-1">
                  <p className="text-sm text-foreground">{item.title}</p>
                </div>
                <span
                  className={`rounded px-2 py-0.5 text-xs ${
                    item.type === "learn"
                      ? "bg-primary/10 text-primary"
                      : "bg-sky-400/10 text-sky-400"
                  }`}
                >
                  {item.type === "learn" ? "Learn" : "Practice"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}
