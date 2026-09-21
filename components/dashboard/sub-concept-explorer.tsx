"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, AlertCircle, BookOpen, CheckCircle, Sparkles, Play } from "lucide-react"
import { GlowCard } from "@/components/ui/glow-card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SubTopic {
  id: string
  name: string
  mastery: number
  status: "mastered" | "learning" | "weak"
}

interface Topic {
  id: string
  name: string
  category: string
  mastery: number
  subtopics: SubTopic[]
}

const topics: Topic[] = [
  {
    id: "1",
    name: "Integration Techniques",
    category: "Calculus",
    mastery: 65,
    subtopics: [
      { id: "1a", name: "Integration by Parts", mastery: 45, status: "weak" },
      { id: "1b", name: "Substitution Methods", mastery: 72, status: "learning" },
      { id: "1c", name: "Partial Fractions", mastery: 92, status: "mastered" },
      { id: "1d", name: "Trigonometric Integrals", mastery: 58, status: "learning" },
    ],
  },
  {
    id: "2",
    name: "Differential Equations",
    category: "Calculus",
    mastery: 78,
    subtopics: [],
  },
  {
    id: "3",
    name: "Thermodynamics",
    category: "Physics",
    mastery: 58,
    subtopics: [],
  },
]

function getStatusIcon(status: SubTopic["status"]) {
  switch (status) {
    case "weak":
      return <AlertCircle className="w-4 h-4 text-red-400" />
    case "learning":
      return <BookOpen className="w-4 h-4 text-yellow-400" />
    case "mastered":
      return <CheckCircle className="w-4 h-4 text-green-400" />
  }
}

function getStatusLabel(status: SubTopic["status"]) {
  switch (status) {
    case "weak":
      return <span className="text-xs text-red-400">Needs Work</span>
    case "learning":
      return <span className="text-xs text-yellow-400">Learning</span>
    case "mastered":
      return <span className="text-xs text-green-400">Mastered</span>
  }
}

function getMasteryColor(mastery: number) {
  if (mastery >= 80) return "bg-green-500"
  if (mastery >= 60) return "bg-cyan-500"
  if (mastery >= 40) return "bg-yellow-500"
  return "bg-red-500"
}

export function SubConceptExplorer() {
  const [expandedTopics, setExpandedTopics] = useState<string[]>(["1"])

  const toggleTopic = (id: string) => {
    setExpandedTopics((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    )
  }

  return (
    <GlowCard className="p-5" glowColor="cyan">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
            <BookOpen className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">Sub-Concept Explorer</h2>
            <p className="text-xs text-muted-foreground">Deep dive into topic breakdowns</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-green-400" />
            <span className="text-muted-foreground">Mastered</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-yellow-400" />
            <span className="text-muted-foreground">Learning</span>
          </div>
          <div className="flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-red-400" />
            <span className="text-muted-foreground">Weak</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {topics.map((topic) => {
          const isExpanded = expandedTopics.includes(topic.id)
          return (
            <div key={topic.id} className="rounded-lg overflow-hidden border border-border/50">
              <button
                onClick={() => toggleTopic(topic.id)}
                className="w-full flex items-center gap-3 p-3 hover:bg-secondary/30 transition-colors"
              >
                {topic.subtopics.length > 0 ? (
                  isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  )
                ) : (
                  <div className="w-4" />
                )}
                <div className="flex-1 text-left">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-medium text-foreground">{topic.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {topic.category} • {topic.subtopics.length} subtopics
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24">
                    <Progress 
                      value={topic.mastery} 
                      className={cn("h-1.5 bg-secondary", `[&>div]:${getMasteryColor(topic.mastery)}`)}
                    />
                  </div>
                  <span className="text-sm font-medium text-foreground w-10 text-right">{topic.mastery}%</span>
                </div>
              </button>

              {isExpanded && topic.subtopics.length > 0 && (
                <div className="border-t border-border/50 bg-secondary/10">
                  {topic.subtopics.map((sub) => (
                    <div
                      key={sub.id}
                      className="flex items-center gap-3 px-4 py-3 pl-10 hover:bg-secondary/20 transition-colors"
                    >
                      {getStatusIcon(sub.status)}
                      <div className="flex-1">
                        <span className="text-sm text-foreground">{sub.name}</span>
                        <div className="mt-0.5">{getStatusLabel(sub.status)}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-16">
                          <Progress 
                            value={sub.mastery} 
                            className={cn("h-1.5 bg-secondary", sub.status === "weak" && "[&>div]:bg-red-500", sub.status === "learning" && "[&>div]:bg-cyan-500", sub.status === "mastered" && "[&>div]:bg-green-500")}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground w-10 text-right">{sub.mastery}%</span>
                        <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-purple-400 hover:text-purple-300">
                          <Sparkles className="w-3 h-3" />
                          Explain with AI
                        </Button>
                        <Button variant="ghost" size="icon" className="w-7 h-7 text-muted-foreground hover:text-foreground">
                          <Play className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </GlowCard>
  )
}
