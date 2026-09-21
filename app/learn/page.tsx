"use client"

import { useMemo, useState } from "react"
import { MessageSquareText, NotebookText, Brain, Bot, PlayCircle } from "lucide-react"
import { ShellLayout } from "@/components/layout/shell-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function LearnPage() {
  const [question, setQuestion] = useState("")
  const [subject, setSubject] = useState("auto")
  const [exam, setExam] = useState("auto")
  const [answer, setAnswer] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const subjectItems = useMemo(
    () => [
      { value: "auto", label: "Auto" },
      { value: "math", label: "Math" },
      { value: "physics", label: "Physics" },
      { value: "chemistry", label: "Chemistry" },
      { value: "biology", label: "Biology" },
      { value: "english", label: "English/Verbal" },
      { value: "general", label: "General" },
    ],
    []
  )
  const examItems = useMemo(
    () => [
      { value: "auto", label: "Auto" },
      { value: "jee", label: "JEE (India)" },
      { value: "neet", label: "NEET (India)" },
      { value: "cbse", label: "CBSE/Boards (India)" },
      { value: "sat", label: "SAT (Global)" },
      { value: "act", label: "ACT (Global)" },
      { value: "ap", label: "AP (Global)" },
      { value: "ib", label: "IB (Global)" },
      { value: "gre", label: "GRE (Global)" },
      { value: "gmat", label: "GMAT (Global)" },
    ],
    []
  )

  async function askAI() {
    const msg = question.trim()
    if (!msg) return
    setLoading(true)
    setAnswer(null)
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: msg, subject, exam }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || "Request failed")
      setAnswer(json.answer ?? "")
    } catch (e: any) {
      setAnswer(`Error: ${e?.message ?? "Unknown error"}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ShellLayout
      title="Learn (Video Engine)"
      subtitle="AI-guided visual learning with instant concept intelligence."
      aiStatus="learning"
    >
      <div className="relative grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className="glass-card rounded-2xl p-5">
          <div className="mb-4 flex items-center justify-between">
            <p className="panel-title">Adaptive Video Player</p>
            <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-200">AI synced</span>
          </div>
          <div className="aspect-video rounded-xl border border-border bg-gradient-to-br from-slate-900 to-indigo-950 p-4">
            <div className="flex h-full items-center justify-center">
              <button className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-foreground backdrop-blur hover:bg-white/20">
                <PlayCircle className="h-4 w-4 text-cyan-300" />
                Now playing: Advanced Integration Techniques
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Tabs defaultValue="doubts" className="glass-card rounded-xl p-4">
            <TabsList className="h-auto w-full flex-wrap justify-start bg-secondary/70">
              <TabsTrigger value="doubts">Doubt Solver</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="concepts">Breakdown</TabsTrigger>
            </TabsList>
            <TabsContent value="doubts" className="mt-3 space-y-3">
              <div className="rounded-lg border border-border bg-secondary/40 p-3 text-xs text-muted-foreground">You: Why does integration by parts fail here?</div>
              <div className="rounded-lg border border-cyan-400/20 bg-cyan-500/10 p-3 text-xs text-cyan-100">AI: Choose substitution first, then apply parts for cleaner simplification.</div>
              <div className="flex items-center gap-2 text-cyan-300">
                <MessageSquareText className="h-4 w-4" />
                <p className="text-xs">Instant doubt solver active</p>
              </div>
            </TabsContent>
            <TabsContent value="notes" className="mt-3">
              <div className="flex items-center gap-2 text-purple-300">
                <NotebookText className="h-4 w-4" />
                <p className="panel-title">Smart Notes</p>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">Auto-generated notes, formulas, and key mistakes are saved here.</p>
            </TabsContent>
            <TabsContent value="concepts" className="mt-3">
              <div className="flex items-center gap-2 text-emerald-300">
                <Brain className="h-4 w-4" />
                <p className="panel-title">Concept Breakdown</p>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">Difficulty map: Fundamentals 92% | Mid-level 77% | Advanced 61%.</p>
            </TabsContent>
          </Tabs>
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center gap-2 text-indigo-300">
              <Bot className="h-4 w-4" />
              <p className="panel-title">AI is thinking...</p>
            </div>
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <button className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-20 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-cyan-500/20 transition-transform hover:scale-[1.03] sm:bottom-8 sm:right-8 sm:px-5 sm:py-3 sm:text-sm">
              Ask AI
            </button>
          </DialogTrigger>
          <DialogContent className="glass-card border-border">
            <DialogHeader>
              <DialogTitle>Ask AI Tutor</DialogTitle>
              <DialogDescription>Get instant concept help, shortcut methods, and exam strategy guidance.</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-2">
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjectItems.map((it) => (
                      <SelectItem key={it.value} value={it.value}>
                        {it.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={exam} onValueChange={setExam}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Exam" />
                  </SelectTrigger>
                  <SelectContent>
                    {examItems.map((it) => (
                      <SelectItem key={it.value} value={it.value}>
                        {it.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask a question (e.g., 'Explain integration by parts and give JEE-style shortcuts')"
                className="min-h-24 bg-secondary/40"
              />
              <div className="flex items-center justify-end gap-2">
                <Button
                  onClick={askAI}
                  disabled={loading || !question.trim()}
                  className="bg-gradient-to-r from-indigo-500 to-cyan-500 text-white"
                >
                  {loading ? "Thinking..." : "Ask"}
                </Button>
              </div>

              {answer && (
                <div className="rounded-lg border border-border bg-secondary/40 p-3 text-sm text-muted-foreground whitespace-pre-wrap">
                  {answer}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </ShellLayout>
  )
}
