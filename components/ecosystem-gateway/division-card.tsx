"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { DivisionCardData } from "./data"
import { InteractiveIllustration } from "./interactive-illustration"

export function DivisionCard({ division }: { division: DivisionCardData }) {
  const [hover, setHover] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const reduce = useReducedMotion()

  function onMove(e: { currentTarget: HTMLElement; clientX: number; clientY: number }) {
    if (reduce) return
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: py * -6, y: px * 8 })
  }

  return (
    <Link
      href={division.href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false)
        setTilt({ x: 0, y: 0 })
      }}
      onMouseMove={onMove}
      className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
      aria-label={`${division.code}: ${division.title}. ${division.cta}`}
    >
      <div style={{ perspective: 1000 }} className="h-full">
        <motion.article
          className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/45 p-5 shadow-[0_16px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl"
          style={{
            transformStyle: "preserve-3d",
            boxShadow: hover
              ? `0 20px 48px rgba(0,0,0,0.35), 0 0 0 1px color-mix(in oklab, ${division.accent} 40%, transparent)`
              : undefined,
          }}
          animate={
            reduce
              ? undefined
              : {
                  rotateX: tilt.x,
                  rotateY: tilt.y,
                  y: hover ? -4 : 0,
                }
          }
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
        >
          {/* light sweep */}
          {!reduce && (
            <motion.div
              className="pointer-events-none absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-white/10 to-transparent"
              animate={hover ? { top: ["-20%", "120%"] } : { top: "-20%" }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              aria-hidden
            />
          )}
          <div
            className="pointer-events-none absolute inset-0 opacity-80"
            style={{
              background: `radial-gradient(circle at 80% 10%, ${division.accentSoft}, transparent 55%)`,
            }}
            aria-hidden
          />

          <div className="relative z-10 flex items-start justify-between gap-2">
            <span
              className="rounded-lg px-2 py-1 text-[11px] font-semibold tracking-wide"
              style={{ color: division.accent, background: division.accentSoft }}
            >
              {division.code}
            </span>
            <ArrowUpRight
              className={cn(
                "h-4 w-4 text-muted-foreground transition-transform",
                hover && "translate-x-0.5 -translate-y-0.5 text-foreground"
              )}
            />
          </div>

          <div className="relative z-10 mt-3">
            <InteractiveIllustration id={division.id} accent={division.accent} active={hover} />
          </div>

          <div className="relative z-10 mt-2 flex-1">
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              {division.tagline}
            </p>
            <h3 className="mt-1.5 text-sm font-semibold leading-snug tracking-tight text-foreground md:text-[15px]">
              {division.title}
            </h3>
            <p className="mt-2 line-clamp-3 text-[11px] leading-relaxed text-muted-foreground md:text-xs">
              {division.description}
            </p>
          </div>

          <div className="relative z-10 mt-4 grid grid-cols-2 gap-1.5">
            {division.stats.map((s) => (
              <div
                key={s.label}
                className="rounded-lg border border-border/50 bg-secondary/25 px-2 py-1.5"
              >
                <p className="text-[9px] uppercase tracking-wider text-muted-foreground">{s.label}</p>
                <p className="text-xs font-semibold text-foreground">{s.value}</p>
              </div>
            ))}
          </div>

          <div
            className="relative z-10 mt-4 inline-flex items-center gap-1.5 text-xs font-medium"
            style={{ color: division.accent }}
          >
            {division.cta}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        </motion.article>
      </div>
    </Link>
  )
}
