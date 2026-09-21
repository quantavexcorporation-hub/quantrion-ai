"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { aiRecommendations } from "./command-data"

const tone = {
  blue: "border-primary/25 bg-primary/10 text-primary",
  amber: "border-amber-500/25 bg-amber-500/10 text-amber-300",
  green: "border-green-500/25 bg-green-500/10 text-green-300",
  sky: "border-sky-500/25 bg-sky-500/10 text-sky-300",
}

export function AIRecommendationCards() {
  return (
    <section aria-label="AI recommendations">
      <div className="mb-3">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">AI Recommendations</h2>
        <p className="text-sm text-muted-foreground">Contextual next actions — not generic tips</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {aiRecommendations.map((rec) => (
          <Link
            key={rec.title}
            href={rec.href}
            className={cn(
              "rounded-xl border px-4 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5",
              tone[rec.tone]
            )}
          >
            {rec.title}
          </Link>
        ))}
      </div>
    </section>
  )
}
