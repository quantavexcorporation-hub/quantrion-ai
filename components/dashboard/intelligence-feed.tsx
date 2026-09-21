"use client"

import { GlowCard } from "@/components/ui/glow-card"
import { StatusBadge } from "@/components/ui/status-badge"
import { Activity, Sparkles, Network, Lightbulb, TrendingUp } from "lucide-react"

interface FeedItem {
  id: string
  type: "difficulty" | "knowledge" | "pattern" | "insight"
  message: string
  timestamp: string
  isNew: boolean
}

const feedItems: FeedItem[] = [
  { id: "1", type: "difficulty", message: "Difficulty recalibrated to 72%", timestamp: "just now", isNew: true },
  { id: "2", type: "knowledge", message: "Knowledge graph updating...", timestamp: "just now", isNew: true },
  { id: "3", type: "pattern", message: "Pattern detected: Strong in algebra concepts", timestamp: "just now", isNew: true },
  { id: "4", type: "difficulty", message: "Difficulty recalibrated to 72%", timestamp: "just now", isNew: true },
  { id: "5", type: "knowledge", message: "Knowledge graph updating...", timestamp: "just now", isNew: true },
  { id: "6", type: "knowledge", message: "Knowledge graph updating...", timestamp: "just now", isNew: true },
]

const feedIcons = {
  difficulty: TrendingUp,
  knowledge: Network,
  pattern: Lightbulb,
  insight: Sparkles,
}

const feedColors = {
  difficulty: "text-cyan-400",
  knowledge: "text-purple-400",
  pattern: "text-yellow-400",
  insight: "text-green-400",
}

export function IntelligenceFeed() {
  return (
    <GlowCard className="p-5" glowColor="purple">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
            <Activity className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">Intelligence Feed</h2>
            <p className="text-xs text-muted-foreground">Live AI decisions & insights</p>
          </div>
        </div>
        <StatusBadge variant="active" />
      </div>

      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
        {feedItems.map((item) => {
          const Icon = feedIcons[item.type]
          return (
            <div
              key={item.id}
              className="flex items-start gap-3 p-3 rounded-lg bg-secondary/20 border border-border/30 hover:border-border/50 transition-colors"
            >
              <Icon className={`w-4 h-4 mt-0.5 ${feedColors[item.type]}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{item.message}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-muted-foreground">{item.timestamp}</span>
                  {item.isNew && <StatusBadge variant="new" className="text-[10px] py-0 px-1.5" />}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/30">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
          <span>Processing 847 data points</span>
        </div>
        <StatusBadge variant="live" />
      </div>
    </GlowCard>
  )
}
