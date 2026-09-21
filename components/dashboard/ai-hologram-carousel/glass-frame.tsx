"use client"

import type { ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlassFrameProps {
  children: ReactNode
  className?: string
  tiltX?: number
  tiltY?: number
  accent?: string
}

/** Multi-layer glass shell with soft neon edge */
export function GlassFrame({
  children,
  className,
  tiltX = 0,
  tiltY = 0,
  accent = "hsl(217 91% 60%)",
}: GlassFrameProps) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={cn("relative isolate", className)}
      style={{
        perspective: 900,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        className="relative h-full overflow-hidden rounded-2xl border border-border/60 bg-card/55 shadow-[0_18px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl dark:bg-card/40"
        style={{
          transformStyle: "preserve-3d",
          boxShadow: `0 18px 40px rgba(0,0,0,0.28), 0 0 0 1px color-mix(in oklab, ${accent} 22%, transparent), inset 0 1px 0 rgba(255,255,255,0.08)`,
        }}
        animate={
          reduce
            ? undefined
            : {
                rotateX: tiltX,
                rotateY: tiltY,
              }
        }
        transition={{ type: "spring", stiffness: 180, damping: 22, mass: 0.6 }}
      >
        {/* depth plate */}
        <div
          className="pointer-events-none absolute inset-[1px] rounded-[15px] opacity-60"
          style={{
            background: `linear-gradient(145deg, color-mix(in oklab, ${accent} 12%, transparent), transparent 42%, color-mix(in oklab, ${accent} 8%, transparent))`,
          }}
          aria-hidden
        />
        {/* top reflection */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/10 to-transparent"
          aria-hidden
        />
        {/* breathing glow rim */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl"
          style={{
            background: `linear-gradient(120deg, transparent, color-mix(in oklab, ${accent} 35%, transparent), transparent)`,
            opacity: 0.35,
            maskImage: "linear-gradient(#000, transparent 70%)",
          }}
          animate={reduce ? undefined : { opacity: [0.2, 0.45, 0.2] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        />
        {children}
      </motion.div>
    </motion.div>
  )
}

interface HolographicCardProps {
  children: ReactNode
  className?: string
}

export function HolographicCard({ children, className }: HolographicCardProps) {
  return (
    <div
      className={cn(
        "relative h-full overflow-hidden rounded-xl border border-white/5 bg-secondary/20",
        className
      )}
    >
      {children}
    </div>
  )
}

interface ParallaxLayerProps {
  children: ReactNode
  depth?: number
  className?: string
  offsetX?: number
  offsetY?: number
}

export function ParallaxLayer({
  children,
  depth = 1,
  className,
  offsetX = 0,
  offsetY = 0,
}: ParallaxLayerProps) {
  return (
    <div
      className={cn("will-change-transform", className)}
      style={{
        transform: `translate3d(${offsetX * depth}px, ${offsetY * depth}px, 0)`,
        transition: "transform 120ms linear",
      }}
    >
      {children}
    </div>
  )
}
