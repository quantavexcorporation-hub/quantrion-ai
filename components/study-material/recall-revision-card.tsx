"use client"

import { useState } from "react"
import { CalendarClock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const ratings = ["Easy", "Medium", "Hard"] as const

export function RecallRevisionCard() {
  const [hidden, setHidden] = useState(true)
  const [rating, setRating] = useState<(typeof ratings)[number] | null>(null)
  const confidence = rating === "Easy" ? 92 : rating === "Medium" ? 71 : rating === "Hard" ? 48 : 0

  return (
    <section id="recall" className="q-fade-up scroll-mt-24" style={{ animationDelay: "170ms" }}>
      <div className="mb-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Section 07
        </p>
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Recall Based Revision
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Active recall with self-rating — AI schedules the next revision.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="glass-card rounded-2xl p-5 md:p-6">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Prompt</p>
          <p className="mt-2 text-base font-medium text-foreground">
            State Newton&apos;s Second Law in momentum form and give one exam use-case.
          </p>

          <div className="mt-4 min-h-[88px] rounded-xl border border-dashed border-border bg-secondary/20 p-4">
            {hidden ? (
              <p className="text-sm text-muted-foreground">Answer hidden — recall first.</p>
            ) : (
              <p className="text-sm leading-relaxed text-foreground">
                F = dp/dt. Use-case: area under an F–t graph equals impulse = change in momentum.
              </p>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button size="sm" variant="outline" className="gap-1.5" onClick={() => setHidden((v) => !v)}>
              {hidden ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
              {hidden ? "Reveal Answer" : "Hide Answer"}
            </Button>
            {ratings.map((r) => (
              <Button
                key={r}
                size="sm"
                variant={rating === r ? "default" : "outline"}
                onClick={() => setRating(r)}
              >
                {r}
              </Button>
            ))}
          </div>

          {rating && (
            <p className="mt-3 text-sm text-muted-foreground">
              Confidence{" "}
              <span className="font-semibold tabular-nums text-foreground">{confidence}%</span>
            </p>
          )}
        </div>

        <div className="glass-card space-y-4 rounded-2xl p-5 md:p-6">
          <div className="flex items-center gap-2">
            <CalendarClock className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Spaced repetition</h3>
          </div>
          <ul className="space-y-3 text-sm">
            {[
              { when: "Today", note: "First active recall", done: true },
              { when: "In 2 days", note: "AI recommended", done: false },
              { when: "In 7 days", note: "Strengthen retention", done: false },
              { when: "In 21 days", note: "Long-term check", done: false },
            ].map((item) => (
              <li
                key={item.when}
                className={cn(
                  "flex items-start justify-between rounded-lg border border-border/60 px-3 py-2",
                  item.done ? "bg-green-500/10" : "bg-secondary/30"
                )}
              >
                <span>
                  <span className="block font-medium text-foreground">{item.when}</span>
                  <span className="text-xs text-muted-foreground">{item.note}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
