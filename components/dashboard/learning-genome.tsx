"use client"

import { GlowCard } from "@/components/ui/glow-card"
import { Network } from "lucide-react"

interface TopicNode {
  id: string
  name: string
  mastery: number
  x: number
  y: number
}

interface LearningGenomeProps {
  topics?: TopicNode[]
}

const defaultTopics: TopicNode[] = [
  { id: "1", name: "Differential Eq", mastery: 82, x: 25, y: 25 },
  { id: "2", name: "Calculus", mastery: 78, x: 40, y: 35 },
  { id: "3", name: "Vectors", mastery: 88, x: 55, y: 25 },
  { id: "4", name: "Integration", mastery: 45, x: 35, y: 50 },
  { id: "5", name: "Area/Volume", mastery: 72, x: 20, y: 60 },
  { id: "6", name: "Organic", mastery: 52, x: 45, y: 65 },
  { id: "7", name: "Chemistry", mastery: 70, x: 60, y: 55 },
  { id: "8", name: "Thermodynamics", mastery: 65, x: 70, y: 40 },
  { id: "9", name: "Mechanics", mastery: 85, x: 75, y: 25 },
]

const connections = [
  ["1", "2"], ["2", "3"], ["2", "4"], ["4", "5"], ["4", "6"],
  ["6", "7"], ["7", "8"], ["8", "9"], ["3", "9"],
]

function getMasteryColor(mastery: number): string {
  if (mastery >= 80) return "#22C55E" // Green - Strong
  if (mastery >= 60) return "#F97316" // Orange - Moderate
  return "#EF4444" // Red - Weak
}

function getMasteryGlow(mastery: number): string {
  if (mastery >= 80) return "drop-shadow(0 0 8px rgba(34, 197, 94, 0.5))"
  if (mastery >= 60) return "drop-shadow(0 0 8px rgba(249, 115, 22, 0.4))"
  return "drop-shadow(0 0 8px rgba(239, 68, 68, 0.4))"
}

export function LearningGenome({ topics = defaultTopics }: LearningGenomeProps) {
  return (
    <GlowCard className="p-5" glowColor="purple">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
            <Network className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">Your Learning Genome</h2>
            <p className="text-xs text-muted-foreground">Neural knowledge network visualization</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
            <span className="text-muted-foreground">{"Strong (80%+)"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
            <span className="text-muted-foreground">Moderate</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span className="text-muted-foreground">{"Weak (60%-)"}</span>
          </div>
        </div>
      </div>

      <div className="relative h-64 mt-4">
        <svg className="w-full h-full" viewBox="0 0 100 80">
          {/* Connections */}
          {connections.map(([fromId, toId], i) => {
            const from = topics.find(t => t.id === fromId)
            const to = topics.find(t => t.id === toId)
            if (!from || !to) return null
            return (
              <line
                key={i}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="#1E293B"
                strokeWidth="0.3"
                strokeDasharray="1,1"
              />
            )
          })}
          
          {/* Nodes */}
          {topics.map((topic) => (
            <g key={topic.id} className="cursor-pointer">
              <circle
                cx={topic.x}
                cy={topic.y}
                r={4}
                fill={getMasteryColor(topic.mastery)}
                style={{ filter: getMasteryGlow(topic.mastery) }}
                className="transition-all duration-300 hover:r-5"
              />
              <text
                x={topic.x}
                y={topic.y - 0.5}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="2"
                fontWeight="bold"
              >
                {topic.mastery}%
              </text>
              <text
                x={topic.x}
                y={topic.y + 6}
                textAnchor="middle"
                fill="#94A3B8"
                fontSize="2"
              >
                {topic.name}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <p className="text-xs text-cyan-400 text-center mt-2">
        DNA Evolution: Graph updates as you improve
      </p>
    </GlowCard>
  )
}
