"use client"

import { useMemo, useState } from "react"
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type PanInfo,
} from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ReaderPage } from "./data"
import { ConceptStage } from "./concept-stage"

interface PageTurnerProps {
  pages: ReaderPage[]
  memoryMode: boolean
  onPageChange?: (page: ReaderPage, index: number) => void
}

export function PageTurner({ pages, memoryMode, onPageChange }: PageTurnerProps) {
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const reduceMotion = useReducedMotion()
  const x = useMotionValue(0)
  const rotateY = useTransform(x, [-220, 0, 220], [18, 0, -18])
  const page = pages[index]
  const progress = useMemo(() => ((index + 1) / pages.length) * 100, [index, pages.length])

  function go(next: number) {
    const clamped = Math.max(0, Math.min(pages.length - 1, next))
    setIndex(clamped)
    setRevealed(false)
    onPageChange?.(pages[clamped], clamped)
    void animate(x, 0, { type: "spring", stiffness: 260, damping: 28 })
  }

  function onDragEnd(_: unknown, info: PanInfo) {
    const threshold = 90
    if (info.offset.x < -threshold && index < pages.length - 1) go(index + 1)
    else if (info.offset.x > threshold && index > 0) go(index - 1)
    else void animate(x, 0, { type: "spring", stiffness: 320, damping: 30 })
  }

  if (!page) return null

  return (
    <div className="relative">
      <div className="mb-3 flex items-center justify-between gap-3 text-xs text-muted-foreground">
        <span>
          {page.chapter} · Page {index + 1}/{pages.length}
        </span>
        <span className="tabular-nums">{Math.round(progress)}%</span>
      </div>
      <div className="mb-4 h-1 overflow-hidden rounded-full bg-secondary">
        <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      <div className="relative mx-auto max-w-2xl" style={{ perspective: 1400 }}>
        {/* subtle previous page edge */}
        <div
          className="pointer-events-none absolute inset-y-3 -left-2 w-full rounded-2xl border border-border/40 bg-card/40"
          aria-hidden
        />

        <motion.article
          drag={reduceMotion ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          style={{ x, rotateY, transformStyle: "preserve-3d" }}
          onDragEnd={onDragEnd}
          className="relative min-h-[340px] cursor-grab rounded-2xl border border-border/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_30%),var(--card)] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.35)] active:cursor-grabbing md:p-8"
          aria-label={`${page.title}. Drag sideways to turn pages.`}
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {page.kind === "concept-3d" ? "Interactive concept" : page.kind}
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">{page.title}</h3>

          <p
            className={cn(
              "mt-5 text-[15px] leading-7 text-foreground/90",
              memoryMode && page.kind !== "formula" && page.kind !== "quiz" && "blur-[3px] select-none"
            )}
          >
            {memoryMode && page.kind !== "formula" && page.kind !== "quiz"
              ? "Recall this page before revealing…"
              : page.body}
          </p>

          {page.kind === "concept-3d" && (
            <div className="mt-6">
              <ConceptStage hint={page.vizHint ?? page.title} />
            </div>
          )}

          {page.kind === "quiz" && (
            <div className="mt-6 rounded-xl border border-primary/25 bg-primary/5 p-4">
              <p className="text-sm font-medium text-foreground">{page.quizPrompt}</p>
              <Button
                size="sm"
                variant="outline"
                className="mt-3"
                onClick={() => setRevealed((v) => !v)}
              >
                {revealed ? "Hide answer" : "Reveal answer"}
              </Button>
              {revealed && (
                <p className="mt-3 text-sm text-green-400">{page.quizAnswer}</p>
              )}
            </div>
          )}

          <p className="mt-8 text-center text-[11px] text-muted-foreground">
            Drag left / right to turn · or use arrows
          </p>
        </motion.article>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <Button
          size="sm"
          variant="outline"
          className="gap-1.5"
          disabled={index === 0}
          onClick={() => go(index - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" /> Prev
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="gap-1.5"
          disabled={index === pages.length - 1}
          onClick={() => go(index + 1)}
          aria-label="Next page"
        >
          Next <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
