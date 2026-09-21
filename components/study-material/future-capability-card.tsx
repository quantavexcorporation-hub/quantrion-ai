"use client"

import { MessageCircle, Sparkles } from "lucide-react"

const prompts = [
  "Explain this line",
  "Why this formula?",
  "Give easier explanation",
  "Show animation",
  "Compare with previous topic",
  "Generate 10 questions",
  "Ask me orally",
  "Translate",
  "Generate revision notes",
]

export function FutureCapabilityCard({ onAsk }: { onAsk?: () => void }) {
  return (
    <section id="future-ai" className="q-fade-up scroll-mt-24" style={{ animationDelay: "250ms" }}>
      <div className="mb-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Section 11
        </p>
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Ask AI Inside Content
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Doubts without leaving the page — AI already knows your context.
        </p>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 via-card to-sky-500/10 p-6 md:p-8">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Future capability · live preview
          </div>
          <h3 className="mt-4 max-w-2xl text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Students can ask doubts without leaving the page.
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            AI already knows your current chapter, topic, exam, difficulty, progress, weak concepts,
            and learning history — every answer is contextual.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {prompts.map((p) => (
              <button
                key={p}
                type="button"
                onClick={onAsk}
                className="rounded-full border border-border/80 bg-background/40 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur transition-colors hover:border-primary/40 hover:text-foreground"
              >
                {p}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onAsk}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <MessageCircle className="h-4 w-4" /> Open contextual AI
          </button>
        </div>
      </div>
    </section>
  )
}
