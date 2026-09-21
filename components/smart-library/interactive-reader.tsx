"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { bookPages, pageActions, type LibraryBook, type ReaderPage } from "./data"
import { PageTurner } from "./page-turner"
import { ConceptOverlay } from "./concept-overlay"

interface InteractiveReaderProps {
  book: LibraryBook
  onClose: () => void
  onAskAI: (context: string) => void
  memoryMode: boolean
}

export function InteractiveReader({ book, onClose, onAskAI, memoryMode }: InteractiveReaderProps) {
  const pages = bookPages[book.id] ?? bookPages["physics-smart"]
  const [current, setCurrent] = useState<ReaderPage>(pages[0])
  const [actionLabel, setActionLabel] = useState("Explain")

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.35 }}
      className="glass-card mb-8 overflow-hidden rounded-2xl"
      aria-label={`${book.title} intelligence reader`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 px-5 py-4">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-primary">Intelligence Book</p>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">{book.title}</h2>
          <p className="text-xs text-muted-foreground">
            Clean reading · cinematic turns · DNA-synced learning
          </p>
        </div>
        <Button size="sm" variant="outline" className="gap-1.5" onClick={onClose}>
          <X className="h-3.5 w-3.5" /> Close book
        </Button>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1fr_260px]">
        <div className="p-4 md:p-6">
          <PageTurner
            pages={pages}
            memoryMode={memoryMode}
            onPageChange={(page) => setCurrent(page)}
          />

          {/* Premium action rail — one shared bar, not clutter on every paragraph */}
          <div className="mt-6 rounded-xl border border-border/60 bg-secondary/20 p-3">
            <p className="mb-2 text-[10px] uppercase tracking-wider text-muted-foreground">
              Page actions · context: {current.title}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {pageActions.map((action) => (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => {
                    setActionLabel(action.label)
                    onAskAI(`${action.label}: ${current.title} — ${current.body.slice(0, 120)}`)
                  }}
                  className="inline-flex items-center gap-1 rounded-lg border border-border/70 bg-card/60 px-2.5 py-1.5 text-[11px] text-foreground transition-colors hover:border-primary/40 hover:bg-primary/10"
                >
                  <span aria-hidden>{action.icon}</span>
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <ConceptOverlay
          paragraph={{
            id: current.id,
            text: current.body,
            kind:
              current.kind === "formula"
                ? "formula"
                : current.kind === "definition"
                  ? "definition"
                  : current.kind === "concept-3d"
                    ? "diagram"
                    : "normal",
          }}
          action={actionLabel}
          bookTitle={book.title}
        />
      </div>
    </motion.section>
  )
}
