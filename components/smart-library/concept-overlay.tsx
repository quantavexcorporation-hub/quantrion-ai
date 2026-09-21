"use client"

import { Link2, Sparkles } from "lucide-react"
import type { ReaderParagraph } from "./data"

interface ConceptOverlayProps {
  paragraph: ReaderParagraph | null
  action: string
  bookTitle: string
}

export function ConceptOverlay({ paragraph, action, bookTitle }: ConceptOverlayProps) {
  if (!paragraph) {
    return (
      <aside className="hidden border-l border-border/70 bg-secondary/10 p-5 lg:block">
        <p className="text-sm text-muted-foreground">
          Use a page action below the reader to preview AI teaching for the current page.
        </p>
      </aside>
    )
  }

  return (
    <aside
      className="border-t border-border/70 bg-secondary/10 p-5 lg:border-l lg:border-t-0"
      aria-label="Concept AI preview"
    >
      <div className="mb-3 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-primary" />
        <p className="text-sm font-semibold text-foreground">Concept Overlay</p>
      </div>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {action} · {bookTitle}
      </p>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-4">
        {paragraph.text}
      </p>
      <div className="mt-4 space-y-2 text-xs">
        <div className="rounded-lg border border-border/60 bg-card/50 p-2.5">
          <p className="text-muted-foreground">Definition</p>
          <p className="mt-1 text-foreground">Rate of change of momentum equals net force.</p>
        </div>
        <div className="rounded-lg border border-border/60 bg-card/50 p-2.5">
          <p className="text-muted-foreground">Exam importance</p>
          <p className="mt-1 text-foreground">High frequency · impulse graphs · variable mass</p>
        </div>
        <div className="rounded-lg border border-border/60 bg-card/50 p-2.5">
          <p className="text-muted-foreground">Linked</p>
          <p className="mt-1 flex items-center gap-1 text-foreground">
            <Link2 className="h-3 w-3 text-primary" /> Collisions · Elevator · Pseudo force
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 p-2">
            <p className="text-[10px] text-amber-300">Weakness</p>
            <p className="font-semibold text-foreground">45%</p>
          </div>
          <div className="rounded-lg border border-green-500/20 bg-green-500/10 p-2">
            <p className="text-[10px] text-green-300">PYQs</p>
            <p className="font-semibold text-foreground">18 linked</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
