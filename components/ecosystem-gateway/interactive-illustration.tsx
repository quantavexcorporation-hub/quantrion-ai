"use client"

import { motion, useReducedMotion } from "framer-motion"
import type { DivisionId } from "./data"

export function InteractiveIllustration({
  id,
  accent,
  active,
}: {
  id: DivisionId
  accent: string
  active?: boolean
}) {
  const reduce = useReducedMotion()

  if (id === "q1") return <BrainGraph accent={accent} active={!!active} reduce={!!reduce} />
  if (id === "q2") return <TechOrbit accent={accent} active={!!active} reduce={!!reduce} />
  return <IndustrialOrbit accent={accent} active={!!active} reduce={!!reduce} />
}

function BrainGraph({
  accent,
  active,
  reduce,
}: {
  accent: string
  active: boolean
  reduce: boolean
}) {
  return (
    <div className="relative mx-auto h-28 w-28" aria-hidden style={{ perspective: 500 }}>
      <motion.div
        className="absolute inset-4 rounded-full border"
        style={{ borderColor: accent, opacity: 0.35 }}
        animate={reduce ? undefined : { scale: active ? [1, 1.08, 1] : [1, 1.03, 1] }}
        transition={{ duration: active ? 1.6 : 3.2, repeat: Infinity }}
      />
      <motion.div
        className="absolute inset-0"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: active ? 8 : 16, repeat: Infinity, ease: "linear" }}
      >
        {[0, 72, 144, 216, 288].map((deg, i) => (
          <span
            key={deg}
            className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: accent,
              boxShadow: `0 0 ${active ? 10 : 6}px ${accent}`,
              transform: `rotate(${deg}deg) translateY(-40px)`,
              opacity: 0.55 + i * 0.08,
            }}
          />
        ))}
      </motion.div>
      <div
        className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: `radial-gradient(circle at 35% 30%, #fff, ${accent} 55%, transparent)`,
          boxShadow: `0 0 ${active ? 28 : 18}px color-mix(in oklab, ${accent} 45%, transparent)`,
        }}
      />
    </div>
  )
}

function TechOrbit({
  accent,
  active,
  reduce,
}: {
  accent: string
  active: boolean
  reduce: boolean
}) {
  return (
    <div className="relative mx-auto h-28 w-28" aria-hidden>
      <motion.div
        className="absolute inset-2 rounded-full border border-dashed"
        style={{ borderColor: accent }}
        animate={reduce ? undefined : { rotate: active ? 360 : -360 }}
        transition={{ duration: active ? 6 : 14, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-6 rounded-full border"
        style={{ borderColor: accent, opacity: 0.5 }}
        animate={reduce ? undefined : { rotate: active ? -360 : 360 }}
        transition={{ duration: active ? 5 : 10, repeat: Infinity, ease: "linear" }}
      />
      {[0, 1, 2, 3].map((i) => (
        <motion.span
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full"
          style={{
            left: `${30 + i * 12}%`,
            top: `${25 + (i % 2) * 35}%`,
            background: accent,
            boxShadow: `0 0 8px ${accent}`,
          }}
          animate={
            reduce
              ? undefined
              : { opacity: [0.3, 1, 0.3], scale: active ? [1, 1.4, 1] : [1, 1.15, 1] }
          }
          transition={{ duration: 1.8 + i * 0.2, repeat: Infinity }}
        />
      ))}
      <div
        className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-lg"
        style={{
          background: `linear-gradient(135deg, ${accent}, transparent)`,
          transform: "translate(-50%, -50%) rotate(18deg)",
        }}
      />
    </div>
  )
}

function IndustrialOrbit({
  accent,
  active,
  reduce,
}: {
  accent: string
  active: boolean
  reduce: boolean
}) {
  return (
    <div className="relative mx-auto h-28 w-28" aria-hidden>
      <motion.div
        className="absolute inset-1 rounded-full border"
        style={{ borderColor: accent, opacity: 0.3 }}
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: active ? 10 : 22, repeat: Infinity, ease: "linear" }}
      />
      {/* planet */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: `radial-gradient(circle at 30% 28%, #e2e8f0, ${accent} 55%, #0f172a)`,
          boxShadow: `0 0 ${active ? 22 : 14}px color-mix(in oklab, ${accent} 40%, transparent)`,
        }}
        animate={reduce ? undefined : { rotate: active ? 20 : 8 }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      />
      {/* satellite */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-2 w-5 -translate-x-1/2 rounded-sm"
        style={{ background: accent, boxShadow: `0 0 8px ${accent}` }}
        animate={
          reduce
            ? undefined
            : {
                rotate: 360,
                x: [0, 38, 0, -38, 0],
                y: [ -42, 0, 42, 0, -42],
              }
        }
        transition={{ duration: active ? 4 : 7, repeat: Infinity, ease: "linear" }}
      />
    </div>
  )
}
