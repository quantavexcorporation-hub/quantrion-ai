"use client"

import { GlowCard } from "@/components/ui/glow-card"
import { StatusBadge } from "@/components/ui/status-badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, Sparkles, Send, BookMarked, Video, FileText, ExternalLink, Maximize2 } from "lucide-react"

interface Resource {
  title: string
  type: "book" | "notes" | "video"
  source: string
  relevance: number
}

const resources: Resource[] = [
  { title: "HC Verma - Concepts of Physics", type: "book", source: "Book", relevance: 95 },
  { title: "NCERT Class 12 - Chapter 7", type: "notes", source: "Notes", relevance: 92 },
  { title: "MIT OCW - Calculus Lecture 15", type: "video", source: "Video", relevance: 88 },
]

const suggestedQuestions = [
  "Explain Integration by Parts with examples",
  "What are the key formulas for Thermodynamics?",
  "How do I solve Second Order ODEs?",
  "Compare JEE vs NEET Physics syllabus",
]

const resourceIcons = {
  book: BookMarked,
  notes: FileText,
  video: Video,
}

export function SmartAILibrary() {
  return (
    <GlowCard className="p-5" glowColor="cyan">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
            <BookOpen className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">Smart AI Library</h2>
            <p className="text-xs text-cyan-400">Context: Integration Techniques</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge variant="online" label="AI Connected" />
          <button className="p-1.5 rounded-lg hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Chat Interface */}
        <div className="flex flex-col">
          <div className="flex-1 flex flex-col items-center justify-center py-8 text-center">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 mb-4">
              <Sparkles className="w-7 h-7 text-purple-400" />
            </div>
            <h3 className="text-sm font-medium text-foreground">Ask me anything about your studies</h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs">
              {"I'm context-aware and can help you understand concepts, solve problems, and connect knowledge."}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                className="px-3 py-1.5 text-xs text-muted-foreground bg-secondary/30 rounded-full border border-border/30 hover:border-cyan-500/30 hover:text-foreground transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Ask AI about any concept..."
              className="flex-1 h-9 bg-secondary/50 border-border/50 text-sm"
            />
            <Button size="sm" className="px-3 h-9 bg-cyan-500 hover:bg-cyan-600 text-cyan-950">
              Enter
            </Button>
            <Button size="icon" className="h-9 w-9 bg-purple-500 hover:bg-purple-600 text-purple-950">
              <Send className="w-4 h-4" />
            </Button>
          </div>

          <button className="text-xs text-muted-foreground hover:text-foreground mt-3 text-center transition-colors">
            Browse Full Library
          </button>
        </div>

        {/* Related Resources */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-3">Related Resources</h3>
          <div className="space-y-2">
            {resources.map((resource, i) => {
              const Icon = resourceIcons[resource.type]
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-lg bg-secondary/20 border border-border/30 hover:border-border/50 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-secondary/50">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">{resource.title}</p>
                    <p className="text-[10px] text-muted-foreground">{resource.source}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 rounded-full bg-secondary overflow-hidden">
                      <div 
                        className="h-full bg-cyan-500 rounded-full"
                        style={{ width: `${resource.relevance}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-cyan-400 font-medium">{resource.relevance}%</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </GlowCard>
  )
}
