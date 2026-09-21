"use client"

import { GlowCard } from "@/components/ui/glow-card"
import { StatusBadge } from "@/components/ui/status-badge"
import { Terminal } from "lucide-react"

interface LogEntry {
  timestamp: string
  type: "SYS" | "AI" | "!"
  message: string
}

const logEntries: LogEntry[] = [
  { timestamp: "16:50:58", type: "SYS", message: "Memory retention check..." },
  { timestamp: "16:51:02", type: "AI", message: "Spaced repetition updated" },
  { timestamp: "16:51:12", type: "AI", message: "Recalculating learning path..." },
  { timestamp: "16:51:16", type: "SYS", message: "Strategy engine processing" },
  { timestamp: "16:51:21", type: "AI", message: "Optimal sequence identified" },
  { timestamp: "16:51:25", type: "!", message: "New recommendation ready" },
  { timestamp: "16:51:29", type: "AI", message: "Difficulty adjusted to 72%" },
]

const typeColors = {
  SYS: "text-muted-foreground",
  AI: "text-cyan-400",
  "!": "text-yellow-400",
}

export function SystemActivityLog() {
  return (
    <GlowCard className="p-5" glowColor="cyan">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-500/10 border border-green-500/20">
            <Terminal className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">System Activity Log</h2>
          </div>
        </div>
        <StatusBadge variant="live" />
      </div>

      <div className="font-mono text-xs space-y-1.5 max-h-48 overflow-y-auto bg-secondary/30 rounded-lg p-3">
        {logEntries.map((entry, i) => (
          <div key={i} className="flex gap-2">
            <span className="text-muted-foreground">{entry.timestamp}</span>
            <span className={typeColors[entry.type]}>[{entry.type}]</span>
            <span className="text-foreground">{entry.message}</span>
          </div>
        ))}
        <div className="flex gap-2 text-muted-foreground">
          <span>{">"}</span>
          <span className="animate-pulse">Waiting for next event...</span>
        </div>
      </div>
    </GlowCard>
  )
}
