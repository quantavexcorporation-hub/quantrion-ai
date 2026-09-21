"use client"

import { ShellLayout } from "@/components/layout/shell-layout"
import Link from "next/link"
import { QuickLearnShorts } from "./quick-learn-shorts"

/**
 * QuickLearn — futuristic AI Shorts micro-learning.
 * Vertical shorts stage: swipe, AI actions, DNA sync — not a social feed.
 */
export function QuickLearnPage() {
  return (
    <ShellLayout
      title="QuickLearn"
      subtitle="AI Shorts · master concepts in minutes"
      aiStatus="learning"
      hideHeader
    >
      <div className="flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center gap-4 pb-8">
        <div className="w-full max-w-[420px] px-1 text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Quantrion · Micro intelligence
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">QuickLearn</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Futuristic AI shorts — every minute makes you sharper.
          </p>
        </div>

        <QuickLearnShorts />

        <div className="flex flex-wrap justify-center gap-2 px-2">
          {[
            { label: "Knowledge DNA", href: "/knowledge-dna" },
            { label: "Progress IQ", href: "/knowledge-dna" },
            { label: "Study Material", href: "/study-material" },
            { label: "Smart Library", href: "/library" },
          ].map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="rounded-full border border-border/60 bg-secondary/25 px-2.5 py-1 text-[10px] text-muted-foreground hover:text-foreground"
            >
              Syncs · {l.label}
            </Link>
          ))}
        </div>
      </div>
    </ShellLayout>
  )
}

export default QuickLearnPage
