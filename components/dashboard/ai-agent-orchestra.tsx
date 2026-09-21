"use client"

import { GlowCard } from "@/components/ui/glow-card"
import { StatusBadge } from "@/components/ui/status-badge"
import { Progress } from "@/components/ui/progress"
import { Sparkles, Sliders, Network, Brain, LineChart, RefreshCw } from "lucide-react"

interface AIAgent {
  id: string
  name: string
  description: string
  icon: typeof Sparkles
  status: "active" | "processing" | "thinking"
  action: string
  output: string
  performance: number
  color: "green" | "yellow" | "purple" | "cyan"
}

const agents: AIAgent[] = [
  {
    id: "adaptive",
    name: "Adaptive Engine",
    description: "Controls difficulty & flow",
    icon: Sliders,
    status: "active",
    action: "Calibrating question difficulty",
    output: "Adjusting difficulty to 72%",
    performance: 94,
    color: "green",
  },
  {
    id: "knowledge",
    name: "Knowledge DNA Engine",
    description: "Tracks cognitive profile",
    icon: Network,
    status: "processing",
    action: "Rebuilding knowledge graph",
    output: "Updating mastery vectors...",
    performance: 88,
    color: "yellow",
  },
  {
    id: "strategy",
    name: "Strategy Engine",
    description: "Decides optimal actions",
    icon: Brain,
    status: "thinking",
    action: "Optimizing study sequence",
    output: "Recommending Calculus review",
    performance: 91,
    color: "purple",
  },
  {
    id: "prediction",
    name: "Prediction Engine",
    description: "Forecasts exam outcomes",
    icon: LineChart,
    status: "active",
    action: "Running Monte Carlo simulation",
    output: "Score projection: 847/1000",
    performance: 96,
    color: "cyan",
  },
]

const statusColors = {
  active: "border-green-500/20",
  processing: "border-yellow-500/20",
  thinking: "border-purple-500/20",
}

const iconColors = {
  green: "bg-green-500/10 text-green-400 border-green-500/20",
  yellow: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
}

const progressColors = {
  green: "[&>div]:bg-green-500",
  yellow: "[&>div]:bg-yellow-500",
  purple: "[&>div]:bg-purple-500",
  cyan: "[&>div]:bg-cyan-500",
}

export function AIAgentOrchestra() {
  return (
    <GlowCard className="p-5" glowColor="purple">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20">
            <Sparkles className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">AI Agent Orchestra</h2>
            <p className="text-xs text-muted-foreground">Intelligent decision layer</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge variant="online" label="4/4 Systems Online" />
          <button className="p-1.5 rounded-lg hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className={`p-4 rounded-lg bg-secondary/20 border ${statusColors[agent.status]} transition-all hover:bg-secondary/30`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className={`flex items-center justify-center w-9 h-9 rounded-lg border ${iconColors[agent.color]}`}>
                  <agent.icon className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground">{agent.name}</h3>
                  <p className="text-[10px] text-muted-foreground">{agent.description}</p>
                </div>
              </div>
              <StatusBadge variant={agent.status} />
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Sparkles className="w-3 h-3" />
                <span>{agent.action}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Performance</span>
                <span className="font-medium text-foreground">{agent.performance}%</span>
              </div>
              <Progress 
                value={agent.performance} 
                className={`h-1.5 bg-secondary ${progressColors[agent.color]}`}
              />

              <div className="pt-2 border-t border-border/30 mt-3">
                <div className="flex items-baseline gap-1.5">
                  <Sparkles className="w-3 h-3 text-muted-foreground" />
                  <span className="text-muted-foreground">Latest Output</span>
                </div>
                <code className={`text-xs font-mono mt-1 block ${agent.color === "green" ? "text-green-400" : agent.color === "yellow" ? "text-yellow-400" : agent.color === "purple" ? "text-purple-400" : "text-cyan-400"}`}>
                  {">"} {agent.output}
                </code>
              </div>
            </div>
          </div>
        ))}
      </div>
    </GlowCard>
  )
}
