"use client"

import { useState } from "react"
import { BookOpenCheck, Highlighter, Sparkles, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface AIReadingAssistantProps {
  context: string
  onClose?: () => void
}

const modes = [
  "Read aloud",
  "Summarize",
  "Translate",
  "Explain",
  "Quiz Me",
  "Generate Notes",
  "Highlight Important",
  "Ask Questions",
  "Revision Mode",
  "Exam Mode",
]

export function AIReadingAssistant({ context }: AIReadingAssistantProps) {
  const [mode, setMode] = useState(modes[1])
  const [query, setQuery] = useState("")

  return (
    <section className="glass-card rounded-2xl p-5" aria-label="AI reading assistant">
      <div className="mb-3 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-primary" />
        <h2 className="text-lg font-semibold tracking-tight text-foreground">AI Reading Assistant</h2>
      </div>
      <p className="text-xs text-muted-foreground">
        Context-aware · knows book, chapter, page, paragraph, exam, DNA
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {modes.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={cn(
              "rounded-md border px-2 py-1 text-[10px] transition-colors",
              mode === m
                ? "border-primary/40 bg-primary/15 text-primary"
                : "border-border text-muted-foreground hover:text-foreground"
            )}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-border/60 bg-secondary/20 p-3 text-sm leading-relaxed text-muted-foreground">
        <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-primary">{mode}</p>
        <p>
          {context ||
            "Ask about any paragraph — AI answers without leaving the page, using your Knowledge DNA and Progress IQ."}
        </p>
      </div>

      <Textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Try: "Explain this formula" or "Show animation"'
        className="mt-3 min-h-[72px] border-border/60 bg-secondary/30 text-sm"
      />
      <div className="mt-3 flex flex-wrap gap-2">
        <Button size="sm" className="gap-1.5">
          <Sparkles className="h-3.5 w-3.5" /> Ask in context
        </Button>
        <Button size="sm" variant="outline" className="gap-1.5">
          <Volume2 className="h-3.5 w-3.5" /> Read aloud
        </Button>
        <Button size="sm" variant="outline" className="gap-1.5">
          <Highlighter className="h-3.5 w-3.5" /> Highlight
        </Button>
        <Button size="sm" variant="outline" className="gap-1.5">
          <BookOpenCheck className="h-3.5 w-3.5" /> Notes
        </Button>
      </div>
    </section>
  )
}
