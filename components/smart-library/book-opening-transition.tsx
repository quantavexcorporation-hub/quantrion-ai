"use client"

import { AnimatePresence, motion } from "framer-motion"
import type { LibraryBook } from "./data"

interface BookOpeningTransitionProps {
  book: LibraryBook | null
  phase: "idle" | "opening" | "open"
}

export function BookOpeningTransition({ book, phase }: BookOpeningTransitionProps) {
  return (
    <AnimatePresence>
      {book && phase === "opening" && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/75 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-live="polite"
          aria-label={`Opening ${book.title}`}
        >
          <div className="relative" style={{ perspective: 1600 }}>
            <motion.div
              initial={{ scale: 0.82, rotateY: -28, y: 40, opacity: 0.5 }}
              animate={{ scale: 1.08, rotateY: 0, y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 110, damping: 16 }}
              className="relative h-72 w-48"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Back cover */}
              <div
                className="absolute inset-0 rounded-r-md rounded-l-sm shadow-2xl"
                style={{
                  background: `linear-gradient(145deg, ${book.coverFrom}, ${book.coverTo})`,
                  transform: "translateZ(-6px)",
                }}
              />
              {/* Spine */}
              <div
                className="absolute inset-y-0 left-0 w-3 rounded-l-sm"
                style={{ background: book.spine, transform: "translateZ(1px)" }}
              />
              {/* Front cover opening */}
              <motion.div
                className="absolute inset-0 origin-left rounded-r-md rounded-l-sm shadow-xl"
                style={{
                  background: `linear-gradient(145deg, ${book.coverFrom}, ${book.coverTo})`,
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                }}
                initial={{ rotateY: 0 }}
                animate={{ rotateY: -158 }}
                transition={{ delay: 0.28, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.2),transparent_45%)]" />
                <div className="flex h-full flex-col justify-between p-5 pl-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-white/70">Intelligence Book</p>
                    <p className="mt-2 text-sm font-semibold leading-snug text-white">{book.title}</p>
                  </div>
                  <p className="text-[10px] text-white/75">{book.subject}</p>
                </div>
              </motion.div>
              {/* Inner page */}
              <motion.div
                className="absolute inset-y-3 left-[42%] right-2 origin-left rounded-sm bg-card shadow-inner"
                initial={{ rotateY: 0, opacity: 0 }}
                animate={{ rotateY: -8, opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                style={{ transformStyle: "preserve-3d" }}
              />
            </motion.div>
            <p className="mt-8 text-center text-sm text-muted-foreground">
              Opening {book.title}…
            </p>
            <p className="mt-1 text-center text-[11px] text-muted-foreground">
              Cinematic entry · then clean, focused reading
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
