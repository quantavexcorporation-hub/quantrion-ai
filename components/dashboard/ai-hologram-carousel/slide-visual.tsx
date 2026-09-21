"use client"

import { motion, useReducedMotion } from "framer-motion"
import type { SlideVisual } from "./data"
import { cn } from "@/lib/utils"

interface SlideVisualProps {
  visual: SlideVisual
  accent: string
  className?: string
}

/** CSS/Framer 3D miniatures — reserved visual language, no Three.js */
export function SlideVisualMark({ visual, accent, className }: SlideVisualProps) {
  const reduce = useReducedMotion()

  return (
    <div
      className={cn("relative flex h-full w-full items-center justify-center", className)}
      style={{ perspective: 600 }}
      aria-hidden
    >
      {visual === "book" && <BookMark accent={accent} reduce={!!reduce} />}
      {visual === "dna" && <DnaMark accent={accent} reduce={!!reduce} />}
      {visual === "iq" && <IqMark accent={accent} reduce={!!reduce} />}
      {visual === "library" && <LibraryMark accent={accent} reduce={!!reduce} />}
      {visual === "orb" && <OrbMark accent={accent} reduce={!!reduce} />}
      {visual === "future" && <FutureMark accent={accent} reduce={!!reduce} />}
    </div>
  )
}

function BookMark({ accent, reduce }: { accent: string; reduce: boolean }) {
  return (
    <motion.div
      className="relative h-24 w-16"
      style={{ transformStyle: "preserve-3d" }}
      animate={reduce ? undefined : { rotateY: [-12, 12, -12], y: [0, -4, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <div
        className="absolute inset-0 rounded-r-md rounded-l-sm shadow-lg"
        style={{
          background: `linear-gradient(145deg, ${accent}, color-mix(in oklab, ${accent} 40%, #0f172a))`,
          transform: "translateZ(4px)",
        }}
      />
      <div
        className="absolute inset-y-0 left-0 w-1.5 rounded-l-sm bg-black/30"
        style={{ transform: "translateZ(5px)" }}
      />
      <div className="absolute inset-x-2 top-3 h-1 rounded bg-white/25" style={{ transform: "translateZ(6px)" }} />
      <div className="absolute inset-x-2 top-6 h-1 rounded bg-white/15" style={{ transform: "translateZ(6px)" }} />
    </motion.div>
  )
}

function DnaMark({ accent, reduce }: { accent: string; reduce: boolean }) {
  return (
    <motion.div
      className="relative h-28 w-16"
      animate={reduce ? undefined : { rotate: [0, 8, 0], y: [0, -3, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} className="absolute left-1/2 w-12 -translate-x-1/2" style={{ top: 8 + i * 18 }}>
          <div
            className="h-1.5 w-full rounded-full opacity-80"
            style={{
              background: `linear-gradient(90deg, ${accent}, transparent, ${accent})`,
              transform: `rotate(${i % 2 === 0 ? -18 : 18}deg)`,
            }}
          />
          <span
            className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full"
            style={{ background: accent, boxShadow: `0 0 8px ${accent}` }}
          />
          <span
            className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full"
            style={{ background: accent, boxShadow: `0 0 8px ${accent}` }}
          />
        </div>
      ))}
    </motion.div>
  )
}

function IqMark({ accent, reduce }: { accent: string; reduce: boolean }) {
  return (
    <motion.div
      className="relative flex h-24 w-24 items-center justify-center"
      animate={reduce ? undefined : { scale: [1, 1.04, 1] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
    >
      <div
        className="absolute inset-0 rounded-full opacity-30"
        style={{ boxShadow: `inset 0 0 0 1px ${accent}, 0 0 24px ${accent}` }}
      />
      <svg viewBox="0 0 80 80" className="h-20 w-20">
        <circle cx="40" cy="40" r="28" fill="none" stroke={accent} strokeWidth="2" opacity="0.35" />
        <motion.circle
          cx="40"
          cy="40"
          r="28"
          fill="none"
          stroke={accent}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="120 60"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{ originX: "40px", originY: "40px" }}
        />
      </svg>
      <span className="absolute text-sm font-semibold tabular-nums text-foreground">IQ</span>
    </motion.div>
  )
}

function LibraryMark({ accent, reduce }: { accent: string; reduce: boolean }) {
  return (
    <div className="relative flex h-24 items-end gap-1.5" style={{ perspective: 500 }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-5 rounded-t-sm shadow-md"
          style={{
            height: 48 + i * 10,
            background: `linear-gradient(180deg, color-mix(in oklab, ${accent} ${70 - i * 12}%, white), color-mix(in oklab, ${accent} 45%, #0f172a))`,
            transformOrigin: "bottom",
          }}
          animate={reduce ? undefined : { rotateY: [-6 + i * 2, 8 - i * 2, -6 + i * 2], y: [0, -3, 0] }}
          transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  )
}

function OrbMark({ accent, reduce }: { accent: string; reduce: boolean }) {
  return (
    <motion.div
      className="relative h-20 w-20 rounded-full"
      style={{
        background: `radial-gradient(circle at 35% 30%, white, ${accent} 45%, color-mix(in oklab, ${accent} 30%, #020617) 80%)`,
        boxShadow: `0 0 28px color-mix(in oklab, ${accent} 55%, transparent)`,
      }}
      animate={reduce ? undefined : { y: [0, -6, 0], scale: [1, 1.05, 1] }}
      transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="absolute inset-2 rounded-full border border-white/20" />
    </motion.div>
  )
}

function FutureMark({ accent, reduce }: { accent: string; reduce: boolean }) {
  return (
    <motion.div
      className="relative h-24 w-24"
      animate={reduce ? undefined : { rotate: [0, 360] }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
    >
      <div
        className="absolute inset-3 rounded-full border border-dashed opacity-70"
        style={{ borderColor: accent }}
      />
      <div
        className="absolute inset-6 rounded-full border opacity-50"
        style={{ borderColor: accent }}
      />
      <span
        className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: accent, boxShadow: `0 0 12px ${accent}` }}
      />
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="absolute left-1/2 top-1 h-1.5 w-1.5 -translate-x-1/2 rounded-full"
          style={{
            background: accent,
            transform: `translateX(-50%) rotate(${i * 120}deg) translateY(2px)`,
            transformOrigin: "50% 44px",
          }}
        />
      ))}
    </motion.div>
  )
}
