"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Spotlight Nexus — a unique premium showcase for the right rail.
 * Distinct from the Intelligence carousel and Ad rail: orbital core + energy ring.
 */
export function SpotlightNexusDisplay({
  className,
  fill = false,
}: {
  className?: string
  /** Match sibling promo card heights in the top strip */
  fill?: boolean
}) {
  const reduce = useReducedMotion()
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [pulse, setPulse] = useState(0)
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (reduce) return
    const id = window.setInterval(() => setPulse((p) => (p + 1) % 100), 80)
    return () => window.clearInterval(id)
  }, [reduce])

  function onMove(e: { currentTarget: HTMLElement; clientX: number; clientY: number }) {
    if (reduce) return
    if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) return
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: py * -10, y: px * 12 })
  }

  return (
    <section
      ref={rootRef}
      className={cn("flex w-full flex-col", fill && "h-full", className)}
      aria-label="Spotlight Nexus showcase"
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <div className="mb-2 flex items-center gap-1.5 px-0.5">
        <Zap className="h-3.5 w-3.5 text-amber-400" aria-hidden />
        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Spotlight Nexus
        </p>
        <span className="ml-auto rounded-full border border-amber-400/30 bg-amber-400/10 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-amber-300">
          Live
        </span>
      </div>

      <div className={cn(fill && "min-h-0 flex-1")} style={{ perspective: 1100 }}>
        <motion.div
          className={cn(
            "relative overflow-hidden rounded-2xl border border-amber-400/20",
            fill && "flex h-[168px] flex-col sm:h-[200px] lg:h-[220px] xl:h-[240px]"
          )}
          style={{
            transformStyle: "preserve-3d",
            background:
              "linear-gradient(160deg, rgba(251,191,36,0.08), rgba(15,23,42,0.85) 40%, rgba(56,189,248,0.08))",
            boxShadow:
              "0 20px 48px rgba(0,0,0,0.35), 0 0 0 1px rgba(251,191,36,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
          animate={reduce ? undefined : { rotateX: tilt.x, rotateY: tilt.y }}
          transition={{ type: "spring", stiffness: 160, damping: 20 }}
        >
          {/* aurora wash */}
          <motion.div
            className="pointer-events-none absolute -left-1/4 -top-1/3 h-[140%] w-[80%] rounded-full opacity-40 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(56,189,248,0.35), transparent 65%)",
            }}
            animate={reduce ? undefined : { x: [0, 30, 0], opacity: [0.25, 0.45, 0.25] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />
          <motion.div
            className="pointer-events-none absolute -bottom-1/4 -right-1/4 h-[120%] w-[70%] rounded-full opacity-35 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(251,191,36,0.3), transparent 65%)",
            }}
            animate={reduce ? undefined : { x: [0, -24, 0], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />

          <div
            className={cn(
              "relative z-10 grid min-h-0 flex-1 gap-2 p-3 sm:gap-3 sm:p-4",
              fill
                ? "grid-cols-[1fr_auto] items-center"
                : "md:grid-cols-[1.1fr_0.9fr] md:items-center"
            )}
          >
            <div className="min-w-0">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-sky-300/90">
                Limited drop
              </p>
              <h3 className="mt-1 text-[14px] font-semibold leading-snug tracking-tight text-foreground sm:mt-1.5 sm:text-[15px]">
                Neural Exam Arena
              </h3>
              <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground sm:mt-1.5">
                Enter a living simulation where AI opponents adapt to your Progress IQ in real time.
              </p>
              <Link
                href="/tests"
                className="group mt-2 inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-400/90 to-sky-400/90 px-3 py-1.5 text-[11px] font-semibold text-slate-950 shadow-[0_0_20px_rgba(251,191,36,0.25)] transition-transform hover:scale-[1.02] sm:mt-3"
              >
                Enter Arena
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            {/* Orbital core — unique visual identity */}
            <div
              className={cn(
                "relative mx-auto flex items-center justify-center",
                fill ? "h-[72px] w-[72px] sm:h-[96px] sm:w-[96px]" : "h-[88px] w-[88px] sm:h-[120px] sm:w-[120px]"
              )}
              style={{ transformStyle: "preserve-3d" }}
              aria-hidden
            >
              {/* outer ring */}
              <motion.div
                className="absolute inset-0 rounded-full border border-dashed border-sky-400/40"
                animate={reduce ? undefined : { rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              />
              {/* mid ring */}
              <motion.div
                className="absolute inset-3 rounded-full border border-amber-400/35"
                animate={reduce ? undefined : { rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                style={{ transform: "rotateX(62deg)" }}
              />
              {/* energy arc */}
              <svg className="absolute inset-1 h-[calc(100%-8px)] w-[calc(100%-8px)]" viewBox="0 0 100 100">
                <motion.circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="url(#nexusGrad)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="80 180"
                  animate={reduce ? undefined : { rotate: 360 }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "50px 50px" }}
                />
                <defs>
                  <linearGradient id="nexusGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38BDF8" stopOpacity="0" />
                    <stop offset="50%" stopColor="#FBBF24" />
                    <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
              {/* core */}
              <motion.div
                className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 35% 30%, #fff, #FBBF24 40%, #0EA5E9 75%, #020617)",
                  boxShadow:
                    "0 0 28px rgba(251,191,36,0.55), 0 0 48px rgba(14,165,233,0.35)",
                  transform: "translateZ(28px)",
                }}
                animate={reduce ? undefined : { scale: [1, 1.08, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-[10px] font-bold tabular-nums text-slate-950">
                  {reduce ? "AI" : `${40 + (pulse % 40)}`}
                </span>
              </motion.div>
              {/* satellites */}
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="absolute h-1.5 w-1.5 rounded-full bg-sky-300"
                  style={{
                    boxShadow: "0 0 8px #38BDF8",
                    transformOrigin: "50% 50%",
                  }}
                  animate={
                    reduce
                      ? undefined
                      : {
                          rotate: 360,
                          x: [0, Math.cos((i * 2.1) * Math.PI) * 46],
                          y: [0, Math.sin((i * 2.1) * Math.PI) * 46],
                        }
                  }
                  transition={{ duration: 5 + i, repeat: Infinity, ease: "linear" }}
                />
              ))}
            </div>
          </div>

          {/* bottom signal bar */}
          <div className="relative z-10 mt-auto flex items-center gap-2 border-t border-white/5 px-3 py-1.5 sm:px-4 sm:py-2">
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-secondary/60">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-amber-400 to-sky-400"
                animate={reduce ? { width: "62%" } : { width: ["18%", "88%", "42%", "70%"] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <span className="shrink-0 text-[9px] uppercase tracking-wider text-muted-foreground">
              Syncing arena
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
