"use client"

import { motion, useReducedMotion } from "framer-motion"
import type { AdSlot } from "./data"

export function AdVisual({ visual, accent }: { visual: AdSlot["visual"]; accent: string }) {
  const reduce = useReducedMotion()

  if (visual === "orb") {
    return (
      <motion.div
        className="relative h-16 w-16 rounded-full"
        style={{
          background: `radial-gradient(circle at 32% 28%, #fff, ${accent} 48%, transparent 72%)`,
          boxShadow: `0 0 28px color-mix(in oklab, ${accent} 50%, transparent)`,
        }}
        animate={reduce ? undefined : { y: [0, -5, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
    )
  }

  if (visual === "prism") {
    return (
      <motion.div
        className="relative h-14 w-14"
        style={{ perspective: 400 }}
        animate={reduce ? undefined : { rotateY: [0, 360] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        aria-hidden
      >
        <div
          className="absolute inset-0 rounded-lg"
          style={{
            background: `linear-gradient(135deg, ${accent}, transparent)`,
            transform: "rotateX(18deg) rotateY(-24deg)",
            boxShadow: `0 12px 24px color-mix(in oklab, ${accent} 35%, transparent)`,
          }}
        />
      </motion.div>
    )
  }

  if (visual === "grid") {
    return (
      <div className="grid h-14 w-14 grid-cols-3 gap-1" aria-hidden>
        {Array.from({ length: 9 }).map((_, i) => (
          <motion.span
            key={i}
            className="rounded-sm"
            style={{ background: accent, opacity: 0.35 + (i % 3) * 0.2 }}
            animate={reduce ? undefined : { opacity: [0.25, 0.8, 0.25] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.12, ease: "easeInOut" }}
          />
        ))}
      </div>
    )
  }

  return (
    <svg viewBox="0 0 64 40" className="h-12 w-16" aria-hidden>
      <motion.path
        d="M2 28 C12 8, 20 32, 32 18 S52 6, 62 22"
        fill="none"
        stroke={accent}
        strokeWidth="2"
        strokeLinecap="round"
        animate={reduce ? undefined : { pathLength: [0.2, 1, 0.2] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  )
}
