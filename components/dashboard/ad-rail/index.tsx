"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Megaphone, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { AD_AUTO_MS, adSlots } from "./data"
import { AdVisual } from "./ad-visual"

interface FuturisticAdRailProps {
  className?: string
  /** Tighter card for mobile stack */
  compact?: boolean
  /** Wide top banner (default) vs stacked card */
  orientation?: "horizontal" | "vertical"
  /** Match sibling promo card heights in the top strip */
  fill?: boolean
}

/**
 * Futuristic 3D ad rail — holographic sponsored slots for Quantrion.
 */
export function FuturisticAdRail({
  className,
  compact = false,
  orientation = "horizontal",
  fill = false,
}: FuturisticAdRailProps) {
  const horizontal = orientation === "horizontal"
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(true)
  const rootRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const ad = adSlots[index]
  const count = adSlots.length

  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count])

  useEffect(() => {
    const el = rootRef.current
    if (!el || typeof IntersectionObserver === "undefined") return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (paused || !visible || reduce) return
    const id = window.setInterval(next, AD_AUTO_MS)
    return () => window.clearInterval(id)
  }, [paused, visible, reduce, next])

  function onMove(e: { currentTarget: HTMLElement; clientX: number; clientY: number }) {
    if (reduce) return
    if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) return
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: py * -8, y: px * 10 })
  }

  return (
    <section
      ref={rootRef}
      className={cn("flex w-full flex-col", fill && "h-full", className)}
      aria-label="Sponsored intelligence ads"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false)
        setTilt({ x: 0, y: 0 })
      }}
      onMouseMove={onMove}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div className="mb-2 flex items-center justify-between gap-2 px-0.5">
        <div className="flex min-w-0 items-center gap-1.5">
          <Megaphone className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
          <p className="truncate text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Ad Intelligence
          </p>
        </div>
        <div className="flex shrink-0 gap-1" role="tablist" aria-label="Ad slides">
          {adSlots.map((slot, i) => (
            <button
              key={slot.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Ad ${i + 1}: ${slot.headline}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-1 rounded-full transition-all",
                i === index ? "w-4 bg-primary" : "w-1.5 bg-muted-foreground/35"
              )}
            />
          ))}
        </div>
      </div>

      <div className={cn("relative", fill && "min-h-0 flex-1")} style={{ perspective: 1000 }}>
        <motion.div
          className={cn(
            "relative overflow-hidden rounded-2xl border border-border/60 bg-card/50 shadow-[0_18px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl",
            fill
              ? "flex h-[168px] flex-col sm:h-[200px] lg:h-[220px] xl:h-[240px]"
              : horizontal
                ? compact
                  ? "min-h-[112px]"
                  : "min-h-[120px]"
                : compact
                  ? "min-h-[168px]"
                  : "min-h-[200px]"
          )}
          style={{
            transformStyle: "preserve-3d",
            boxShadow: `0 18px 40px rgba(0,0,0,0.28), 0 0 0 1px color-mix(in oklab, ${ad.accent} 28%, transparent), inset 0 1px 0 rgba(255,255,255,0.08)`,
          }}
          animate={reduce ? undefined : { rotateX: tilt.x, rotateY: tilt.y }}
          transition={{ type: "spring", stiffness: 180, damping: 22 }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background: `radial-gradient(circle at 80% 20%, color-mix(in oklab, ${ad.accent} 22%, transparent), transparent 55%)`,
            }}
            aria-hidden
          />
          <motion.div
            className="pointer-events-none absolute inset-x-0 h-8 bg-gradient-to-b from-transparent via-white/10 to-transparent"
            aria-hidden
            animate={reduce ? undefined : { top: ["-15%", "115%"] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "linear" }}
          />

          {!reduce && (
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              {[12, 70, 40].map((x, i) => (
                <motion.span
                  key={i}
                  className="absolute h-1 w-1 rounded-full"
                  style={{ left: `${x}%`, top: `${20 + i * 22}%`, background: ad.accent }}
                  animate={{ opacity: [0.2, 0.7, 0.2], y: [0, -4, 0] }}
                  transition={{ duration: 3 + i, repeat: Infinity }}
                />
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={ad.id}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12, rotateX: -6 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10, rotateX: 4 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "relative z-10 grid h-full gap-3 p-3 sm:p-4",
                horizontal
                  ? "grid-cols-1 items-stretch sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-4"
                  : "grid-cols-[1fr_auto] items-center"
              )}
            >
              {horizontal && (
                <div className="hidden items-center justify-center sm:flex">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/5 bg-secondary/25"
                    style={{ transform: "translateZ(24px)" }}
                  >
                    <AdVisual visual={ad.visual} accent={ad.accent} />
                  </div>
                </div>
              )}

              <div className="min-w-0">
                <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
                  <span
                    className="rounded-md px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider"
                    style={{
                      color: ad.accent,
                      background: `color-mix(in oklab, ${ad.accent} 14%, transparent)`,
                    }}
                  >
                    {ad.badge}
                  </span>
                  <span className="truncate text-[10px] text-muted-foreground">{ad.sponsor}</span>
                </div>
                <h3 className="text-sm font-semibold tracking-tight text-foreground line-clamp-2">
                  {ad.headline}
                </h3>
                <p
                  className={cn(
                    "mt-1 text-[11px] leading-relaxed text-muted-foreground",
                    horizontal ? "line-clamp-1 sm:line-clamp-2" : "line-clamp-2"
                  )}
                >
                  {ad.body}
                </p>
                {!horizontal && (
                  <Link
                    href={ad.href}
                    className="mt-2.5 inline-flex max-w-full items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-2.5 py-1.5 text-[11px] font-medium text-primary transition-colors hover:bg-primary/15"
                  >
                    <Sparkles className="h-3 w-3 shrink-0" aria-hidden />
                    <span className="truncate">{ad.cta}</span>
                  </Link>
                )}
              </div>

              {horizontal ? (
                <Link
                  href={ad.href}
                  className="inline-flex w-full shrink-0 items-center justify-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-2.5 py-1.5 text-[11px] font-medium text-primary transition-colors hover:bg-primary/15 sm:w-auto sm:self-center"
                >
                  <Sparkles className="h-3 w-3" aria-hidden />
                  {ad.cta}
                </Link>
              ) : (
                <div className="flex shrink-0 items-center justify-center self-center">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/5 bg-secondary/25 sm:h-[72px] sm:w-[72px]"
                    style={{ transform: "translateZ(24px)" }}
                  >
                    <AdVisual visual={ad.visual} accent={ad.accent} />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      <p className="sr-only" aria-live="polite">
        Ad {index + 1} of {count}: {ad.headline}
      </p>
    </section>
  )
}

export default FuturisticAdRail
