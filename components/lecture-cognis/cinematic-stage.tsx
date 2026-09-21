"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { LectureSlide, SceneMood } from "@/lib/lecture-cognis/types"

const MOOD_BG: Record<SceneMood, string> = {
  cosmos: "from-[#04060f] via-[#0a1530] to-[#1a0a2e]",
  quantum: "from-[#050816] via-[#10183a] to-[#06263a]",
  energy: "from-[#0a0804] via-[#2a1508] to-[#1a0a04]",
  neural: "from-[#06040f] via-[#1a1030] to-[#0a1a28]",
  crystal: "from-[#040a0c] via-[#0a2228] to-[#0a1830]",
  forge: "from-[#0a0604] via-[#241208] to-[#12080a]",
  ocean: "from-[#030910] via-[#062030] to-[#041820]",
}

export function CinematicStage({
  slide,
  topic,
  playing,
  className,
}: {
  slide: LectureSlide | null
  topic: string
  playing?: boolean
  className?: string
}) {
  const mood = slide?.mood || "cosmos"
  const accent = slide?.accent || "#22d3ee"
  const motionKind = slide?.motion || "drift"
  const camera = slide?.camera || "hero"

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gradient-to-br",
        MOOD_BG[mood],
        className,
      )}
    >
      {/* Atmospheric layers */}
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <motion.div
          className="absolute -left-1/4 -top-1/4 h-[70%] w-[70%] rounded-full blur-3xl"
          style={{ background: `${accent}33` }}
          animate={
            playing
              ? motionKind === "pulse" || motionKind === "bloom"
                ? { scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }
                : motionKind === "orbit"
                  ? { x: [0, 40, 0], y: [0, 20, 0] }
                  : { x: [0, 24, 0], y: [0, -16, 0] }
              : undefined
          }
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-1/4 -right-1/4 h-[65%] w-[65%] rounded-full blur-3xl"
          style={{ background: "rgba(99,102,241,0.22)" }}
          animate={
            playing
              ? { x: [0, -30, 0], y: [0, 18, 0] }
              : undefined
          }
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Grid / scan lines */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:48px_48px]" />
      {motionKind === "scan" && playing && (
        <motion.div
          className="pointer-events-none absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-cyan-300/20 to-transparent"
          animate={{ y: ["-20%", "120%"] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
        />
      )}

      {/* Focal geometry */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <motion.div
          className={cn(
            "rounded-full border opacity-40",
            camera === "close" ? "h-40 w-40" : camera === "wide" ? "h-72 w-72" : "h-56 w-56",
          )}
          style={{ borderColor: accent, boxShadow: `0 0 80px ${accent}33` }}
          animate={
            playing
              ? motionKind === "orbit"
                ? { rotate: 360 }
                : motionKind === "rise"
                  ? { y: [20, -10, 20], scale: [0.95, 1.05, 0.95] }
                  : { scale: [1, 1.06, 1] }
              : undefined
          }
          transition={
            motionKind === "orbit"
              ? { duration: 18, repeat: Infinity, ease: "linear" }
              : { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }
        />
        <motion.div
          className="absolute h-2 w-2 rounded-full"
          style={{ background: accent, boxShadow: `0 0 24px ${accent}` }}
          animate={playing ? { scale: [1, 1.8, 1], opacity: [0.7, 1, 0.7] } : undefined}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
      </div>

      {/* Typography plane */}
      <div
        className={cn(
          "relative z-10 flex h-full flex-col justify-end p-6 md:p-10",
          camera === "hero" && "justify-center",
        )}
      >
        <motion.p
          key={`${slide?.id}-hint`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[10px] font-semibold uppercase tracking-[0.28em]"
          style={{ color: accent }}
        >
          {slide?.visualHint || "Quantrion · LectureCognis Cinema"}
        </motion.p>
        <motion.h3
          key={`${slide?.id}-title`}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className={cn(
            "mt-3 font-semibold tracking-tight text-white",
            camera === "close" ? "text-3xl md:text-5xl" : "text-2xl md:text-4xl",
          )}
        >
          {slide?.title || topic}
        </motion.h3>
        {slide?.onScreenLine && (
          <motion.p
            key={`${slide?.id}-line`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-3 inline-flex max-w-xl rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-cyan-100/90 backdrop-blur"
          >
            {slide.onScreenLine}
          </motion.p>
        )}
        <motion.p
          key={`${slide?.id}-body`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base"
        >
          {slide?.body || "Forging cinematic education…"}
        </motion.p>
      </div>

      <div className="pointer-events-none absolute bottom-3 right-4 text-[9px] uppercase tracking-[0.2em] text-white/35">
        LectureCognis · Cinema
      </div>
    </div>
  )
}
