"use client"

import { useCallback, useState } from "react"
import { AnimatePresence } from "framer-motion"
import { ShellLayout } from "@/components/layout/shell-layout"
import { libraryBooks, type LibraryBook } from "./data"
import { SmartLibraryHero } from "./smart-library-hero"
import { LivingBookshelf } from "./living-bookshelf"
import { BookOpeningTransition } from "./book-opening-transition"
import { InteractiveReader } from "./interactive-reader"
import { KnowledgeGraph } from "./knowledge-graph"
import { AIReadingAssistant } from "./ai-reading-assistant"
import {
  BookAnalytics,
  ConceptVisualization,
  FutureConversationalBook,
  LinkedIntelligence,
  RevisionPanel,
  SmartHighlightsAndMemory,
} from "./reader-tools"
import { FloatingAIButton } from "./floating-ai-button"

export function SmartLibraryExperience() {
  const [activeBook, setActiveBook] = useState<LibraryBook | null>(null)
  const [phase, setPhase] = useState<"idle" | "opening" | "open">("idle")
  const [memoryMode, setMemoryMode] = useState(false)
  const [aiContext, setAiContext] = useState("")
  const [showAssistant, setShowAssistant] = useState(true)

  const openBook = useCallback((book: LibraryBook) => {
    setActiveBook(book)
    setPhase("opening")
    window.setTimeout(() => setPhase("open"), 1100)
  }, [])

  const closeBook = useCallback(() => {
    setPhase("idle")
    setActiveBook(null)
    setAiContext("")
  }, [])

  return (
    <>
      <SmartLibraryHero />

      {phase !== "open" && (
        <LivingBookshelf books={libraryBooks} onOpen={openBook} />
      )}

      <BookOpeningTransition book={activeBook} phase={phase} />

      <AnimatePresence mode="wait">
        {phase === "open" && activeBook && (
          <InteractiveReader
            key={activeBook.id}
            book={activeBook}
            onClose={closeBook}
            onAskAI={(ctx) => {
              setAiContext(ctx)
              setShowAssistant(true)
            }}
            memoryMode={memoryMode}
          />
        )}
      </AnimatePresence>

      {phase === "open" && activeBook && (
        <div className="mb-6 grid gap-6 lg:grid-cols-2">
          <KnowledgeGraph />
          <BookAnalytics completion={activeBook.completion} retention={activeBook.retention} />
          <ConceptVisualization />
          <SmartHighlightsAndMemory
            memoryMode={memoryMode}
            onMemoryModeChange={setMemoryMode}
          />
          <RevisionPanel />
          <LinkedIntelligence />
        </div>
      )}

      {phase === "open" && showAssistant && (
        <div className="mb-6">
          <AIReadingAssistant context={aiContext} />
        </div>
      )}

      <div className="mb-8">
        <FutureConversationalBook />
      </div>

      {phase !== "open" && (
        <section className="mb-6 rounded-2xl border border-border/60 bg-secondary/15 p-4 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Balanced by design</p>
          <p className="mt-1">
            Cinematic 3D and hand-driven page turns for entry and chapter flow. Clean, fast reading
            pages for long study sessions. Interactive stages only where they improve understanding
            (FBDs, molecules, circuits) — then everything syncs to Knowledge DNA and Progress IQ.
          </p>
        </section>
      )}

      {/* Preserve original three capsules as quick entry */}
      {phase !== "open" && (
        <section className="mb-4" aria-label="Original smart capsules">
          <h2 className="mb-3 text-sm font-semibold text-foreground">AI Concept Capsules</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {libraryBooks.slice(0, 3).map((book) => (
              <button
                key={`capsule-${book.id}`}
                type="button"
                onClick={() => openBook(book)}
                className="glass-card rounded-xl p-5 text-left transition-transform hover:-translate-y-0.5"
              >
                <p className="panel-title">{book.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{book.blurb}</p>
              </button>
            ))}
          </div>
        </section>
      )}

      <FloatingAIButton onClick={() => setShowAssistant(true)} />
    </>
  )
}

export default function SmartLibraryPage() {
  return (
    <ShellLayout
      title="Smart Library"
      subtitle="Intelligence Books — cinematic entry, clean reading, AI that teaches."
      aiStatus="active"
      hideHeader
    >
      <SmartLibraryExperience />
    </ShellLayout>
  )
}
