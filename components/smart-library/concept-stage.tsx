"use client"

import { motion, useReducedMotion } from "framer-motion"

interface ConceptStageProps {
  hint: string
}

/**
 * Reserved interactive stage — only mounts on concept-3d pages.
 * Lightweight CSS/WebGL-free simulation so long study sessions stay fast.
 */
export function ConceptStage({ hint }: ConceptStageProps) {
  const reduceMotion = useReducedMotion()

  return (
    <div
      className="relative overflow-hidden rounded-xl border border-sky-500/25 bg-gradient-to-br from-sky-500/10 via-secondary/30 to-primary/10 p-4"
      aria-label={`Interactive concept: ${hint}`}
    >
      <p className="mb-3 text-[10px] uppercase tracking-wider text-sky-300">
        Concept stage · enhances understanding
      </p>
      <div className="relative mx-auto h-36 w-full max-w-sm">
        {/* Truck */}
        <motion.div
          className="absolute bottom-8 left-6 h-10 w-28 rounded-md bg-sky-500/80 shadow-lg"
          animate={reduceMotion ? undefined : { x: [0, 36, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute -top-4 left-3 h-5 w-14 rounded-t-md bg-sky-400/80" />
          <div className="absolute -bottom-2 left-3 h-3 w-3 rounded-full bg-foreground/80" />
          <div className="absolute -bottom-2 right-4 h-3 w-3 rounded-full bg-foreground/80" />
        </motion.div>
        {/* Block + pseudo force arrow */}
        <motion.div
          className="absolute bottom-14 left-[4.5rem] h-8 w-8 rounded-sm bg-amber-400/90"
          animate={reduceMotion ? undefined : { x: [0, 36, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[4.6rem] left-[3.2rem] h-0.5 w-10 origin-right bg-rose-400"
          animate={reduceMotion ? undefined : { x: [0, 36, 0], scaleX: [1, 1.15, 1] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <p className="absolute bottom-1 left-0 right-0 text-center text-[11px] text-muted-foreground">
          {hint}
        </p>
      </div>
      <p className="mt-1 text-center text-[10px] text-muted-foreground">
        Pseudo force opposite to acceleration · drag pages to continue reading
      </p>
    </div>
  )
}
