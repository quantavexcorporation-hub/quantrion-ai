"use client"

import { GlowCard } from "@/components/ui/glow-card"
import { StatusBadge } from "@/components/ui/status-badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Image from "next/image"
import { Trophy, Quote } from "lucide-react"

interface TopperTip {
  name: string
  rank: string
  year: string
  avatar: string
  quote: string
  tag: "strategy" | "technique" | "mindset"
  helpful: number
}

const topperTips: TopperTip[] = [
  {
    name: "Rohan Verma",
    rank: "AIR 12",
    year: "JEE 2023",
    avatar: "RV",
    quote: "Solve previous year papers under timed conditions every Sunday. It builds exam temperament.",
    tag: "strategy",
    helpful: 2456,
  },
  {
    name: "Aditya Sharma",
    rank: "AIR 3",
    year: "JEE 2023",
    avatar: "AS",
    quote: "Never skip revision. I revised every concept within 24 hours of learning it, then again after a week.",
    tag: "technique",
    helpful: 2847,
  },
]

const tagLabels = {
  strategy: "STRATEGY",
  technique: "TECHNIQUE",
  mindset: "MINDSET",
}

export function TopperInsights() {
  return (
    <GlowCard className="p-5" glowColor="yellow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
            <Trophy className="w-5 h-5 text-yellow-400" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">Topper Insights</h2>
            <p className="text-xs text-muted-foreground">Learn from the best performers</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 text-xs text-muted-foreground hover:text-foreground rounded-full border border-border/50 hover:border-border transition-colors">
            Tips
          </button>
          <button className="px-3 py-1 text-xs text-muted-foreground hover:text-foreground rounded-full border border-border/50 hover:border-border transition-colors">
            Patterns
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {topperTips.map((tip, i) => (
          <div
            key={i}
            className="p-4 rounded-lg bg-secondary/20 border border-border/30"
          >
            <div className="flex items-start gap-3">
              <Avatar className="w-10 h-10 border border-purple-500/20">
                <AvatarFallback className="bg-purple-500/20 text-purple-400 text-sm font-medium">
                  {tip.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{tip.name}</span>
                  <span className="text-xs text-cyan-400">{tip.rank} ({tip.year})</span>
                  <StatusBadge variant="new" label={tagLabels[tip.tag]} className="ml-auto" />
                </div>
                <div className="flex items-start gap-2 mt-2">
                  <Quote className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground italic">
                    {`"${tip.quote}"`}
                  </p>
                </div>
                <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
                  <Image
                    src="/quantrion-logo.png"
                    alt="Quantrion"
                    width={14}
                    height={14}
                    className="h-3.5 w-3.5 object-contain"
                  />
                  <span>{tip.helpful.toLocaleString()} found helpful</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </GlowCard>
  )
}
