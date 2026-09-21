"use client"

import { useState } from "react"
import { Eye, EyeOff, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { quickQuestions } from "./data"

export function QuickQuestionCard() {
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const q = quickQuestions[index]

  function next() {
    setRevealed(false)
    setIndex((i) => (i + 1) % quickQuestions.length)
  }

  return (
    <section id="questions" className="q-fade-up scroll-mt-24" style={{ animationDelay: "130ms" }}>
      <div className="mb-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Section 05
        </p>
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Quick Questions</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Flashcard drills with one-click reveal and instant AI explanation.
        </p>
      </div>

      <div className="glass-card rounded-2xl p-5 md:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <Badge variant="outline" className="border-sky-400/30 bg-sky-500/10 text-sky-300">
            {q.type}
          </Badge>
          <p className="text-xs text-muted-foreground">
            {index + 1} / {quickQuestions.length}
          </p>
        </div>

        <div
          className={cn(
            "min-h-[140px] rounded-xl border border-border/70 bg-secondary/25 p-5 transition-all",
            revealed && "border-primary/25 bg-primary/5"
          )}
        >
          <p className="text-base font-medium leading-relaxed text-foreground">{q.prompt}</p>
          {revealed && (
            <div className="mt-4 space-y-2 border-t border-border/60 pt-4">
              <p className="text-sm font-semibold text-green-400">Answer: {q.answer}</p>
              <p className="flex items-start gap-2 text-sm text-muted-foreground">
                <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                {q.explanation}
              </p>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5"
            onClick={() => setRevealed((v) => !v)}
          >
            {revealed ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            {revealed ? "Hide Answer" : "Reveal Answer"}
          </Button>
          <Button size="sm" onClick={next}>
            Next question
          </Button>
        </div>
      </div>
    </section>
  )
}
