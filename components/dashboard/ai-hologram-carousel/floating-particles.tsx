"use client"

import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FloatingParticlesProps {
  className?: string
  accent?: string
}

/** Lightweight CSS particles — no canvas, GPU-friendly */
export function FloatingParticles({ className, accent = "hsl(217 91% 60%)" }: FloatingParticlesProps) {
  const reduce = useReducedMotion()
  const nodes = [
    { x: "12%", y: "22%", s: 2, d: 4.2 },
    { x: "78%", y: "18%", s: 1.5, d: 5.1 },
    { x: "64%", y: "68%", s: 2.2, d: 3.8 },
    { x: "28%", y: "74%", s: 1.6, d: 4.6 },
    { x: "48%", y: "40%", s: 1.2, d: 5.5 },
    { x: "88%", y: "52%", s: 1.8, d: 3.4 },
    { x: "18%", y: "48%", s: 1.4, d: 4.9 },
  ]

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      {nodes.map((n, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: n.x,
            top: n.y,
            width: n.s,
            height: n.s,
            background: accent,
            boxShadow: `0 0 8px ${accent}`,
            opacity: 0.45,
          }}
          animate={
            reduce
              ? undefined
              : { y: [0, -6, 0], opacity: [0.25, 0.55, 0.25] }
          }
          transition={{ duration: n.d, repeat: Infinity, ease: "easeInOut", delay: i * 0.25 }}
        />
      ))}
      {/* soft knowledge links */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.18]" aria-hidden>
        <line x1="18%" y1="48%" x2="48%" y2="40%" stroke={accent} strokeWidth="0.5" />
        <line x1="48%" y1="40%" x2="78%" y2="18%" stroke={accent} strokeWidth="0.5" />
        <line x1="48%" y1="40%" x2="64%" y2="68%" stroke={accent} strokeWidth="0.5" />
      </svg>
    </div>
  )
}

interface LightScannerProps {
  className?: string
}

export function LightScanner({ className }: LightScannerProps) {
  const reduce = useReducedMotion()
  if (reduce) return null

  return (
    <motion.div
      className={cn(
        "pointer-events-none absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-white/10 to-transparent",
        className
      )}
      aria-hidden
      animate={{ top: ["-10%", "110%"] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
    />
  )
}
