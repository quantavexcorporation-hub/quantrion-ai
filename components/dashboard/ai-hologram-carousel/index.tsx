"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import { AnimatePresence, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
import { AUTO_MS, promotionSlides } from "./data"
import { GlassFrame } from "./glass-frame"
import { PromotionIndicator } from "./controls"
import { PromotionSlide } from "./promotion-slide"
import { FloatingParticles, LightScanner } from "./floating-particles"

interface AIHologramCarouselProps {
  className?: string
  /** `rail` = compact stacked layout for the platform right sidebar */
  variant?: "default" | "rail"
}

/**
 * Quantrion AI Intelligence Display — premium holographic promo carousel.
 */
export function AIHologramCarousel({ className, variant = "default" }: AIHologramCarouselProps) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [parallax, setParallax] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(true)
  const rootRef = useRef<HTMLDivElement>(null)
  const touchX = useRef<number | null>(null)
  const reduce = useReducedMotion()
  const slide = promotionSlides[index]
  const count = promotionSlides.length
  const rail = variant === "rail"

  const go = useCallback(
    (next: number, dir?: number) => {
      const clamped = ((next % count) + count) % count
      setDirection(dir ?? (clamped > index || (index === count - 1 && clamped === 0) ? 1 : -1))
      setIndex(clamped)
    },
    [count, index]
  )

  const next = useCallback(() => go(index + 1, 1), [go, index])
  const prev = useCallback(() => go(index - 1, -1), [go, index])

  // Intersection Observer — pause off-screen
  useEffect(() => {
    const el = rootRef.current
    if (!el || typeof IntersectionObserver === "undefined") return
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.25 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Auto-play
  useEffect(() => {
    if (paused || !visible || reduce) return
    const id = window.setInterval(() => {
      setDirection(1)
      setIndex((i) => (i + 1) % count)
    }, AUTO_MS)
    return () => window.clearInterval(id)
  }, [paused, visible, reduce, count])

  function onMove(e: { currentTarget: HTMLElement; clientX: number; clientY: number }) {
    if (reduce) return
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: py * -6, y: px * 8 })
    setParallax({ x: px * 8, y: py * 6 })
  }

  function onLeave() {
    setTilt({ x: 0, y: 0 })
    setParallax({ x: 0, y: 0 })
  }

  function onKeyDown(e: { key: string; preventDefault: () => void }) {
    if (e.key === "ArrowRight") {
      e.preventDefault()
      next()
    } else if (e.key === "ArrowLeft") {
      e.preventDefault()
      prev()
    }
  }

  function onTouchStart(e: { touches: ArrayLike<{ clientX: number }> }) {
    touchX.current = e.touches[0]?.clientX ?? null
  }

  function onTouchEnd(e: { changedTouches: ArrayLike<{ clientX: number }> }) {
    if (touchX.current == null) return
    const dx = (e.changedTouches[0]?.clientX ?? touchX.current) - touchX.current
    touchX.current = null
    if (Math.abs(dx) < 40) return
    if (dx < 0) next()
    else prev()
  }

  return (
    <section
      ref={rootRef}
      className={cn("flex w-full flex-col", !rail && "max-w-[480px]", className)}
      aria-roledescription="carousel"
      aria-label="Quantrion AI Intelligence Display"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false)
        onLeave()
      }}
      onMouseMove={onMove}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      tabIndex={0}
    >
      <div className="mb-2 flex items-center justify-between gap-2 px-0.5">
        <div className="flex min-w-0 items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
          <p className="truncate text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            {rail ? "Intelligence" : "AI Intelligence Display"}
          </p>
        </div>
        <PromotionIndicator count={count} active={index} onSelect={(i) => go(i, i > index ? 1 : -1)} />
      </div>

      <GlassFrame
        className={cn(
          "w-full",
          rail
            ? "h-[168px] sm:h-[200px] lg:h-[220px] xl:h-[240px]"
            : "h-[168px] sm:h-[200px] md:h-[230px] xl:h-[250px]"
        )}
        tiltX={tilt.x}
        tiltY={tilt.y}
        accent={slide.accent}
      >
        <FloatingParticles accent={slide.accent} className="opacity-40" />
        <LightScanner />

        <div className="relative h-full w-full" style={{ transformStyle: "preserve-3d" }}>
          <AnimatePresence mode="wait" custom={direction}>
            <PromotionSlide
              key={slide.id}
              slide={slide}
              offsetX={parallax.x}
              offsetY={parallax.y}
              direction={direction}
              variant={variant}
            />
          </AnimatePresence>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-2.5 z-20 flex items-center justify-between px-2.5">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous promotion"
            className="pointer-events-auto inline-flex h-7 w-7 items-center justify-center rounded-full border border-border/60 bg-background/50 text-muted-foreground backdrop-blur-sm transition-colors hover:border-primary/40 hover:text-foreground"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next promotion"
            className="pointer-events-auto inline-flex h-7 w-7 items-center justify-center rounded-full border border-border/60 bg-background/50 text-muted-foreground backdrop-blur-sm transition-colors hover:border-primary/40 hover:text-foreground"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </GlassFrame>

      <p className="sr-only" aria-live="polite">
        Slide {index + 1} of {count}: {slide.headline}
      </p>
    </section>
  )
}

export default AIHologramCarousel
