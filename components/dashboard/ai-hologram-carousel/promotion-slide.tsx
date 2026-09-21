"use client"

import { motion, useReducedMotion } from "framer-motion"
import type { PromotionSlideData } from "./data"
import { CTAButton } from "./controls"
import { HolographicCard, ParallaxLayer } from "./glass-frame"
import { SlideVisualMark } from "./slide-visual"
import { FloatingParticles, LightScanner } from "./floating-particles"

interface PromotionSlideProps {
  slide: PromotionSlideData
  offsetX: number
  offsetY: number
  direction: number
  /** Compact stacked layout for the right rail */
  variant?: "default" | "rail"
}

export function PromotionSlide({
  slide,
  offsetX,
  offsetY,
  direction,
  variant = "default",
}: PromotionSlideProps) {
  const reduce = useReducedMotion()
  const rail = variant === "rail"

  return (
    <motion.div
      key={slide.id}
      role="group"
      aria-roledescription="slide"
      aria-label={`${slide.headline}. ${slide.description}`}
      className={
        rail
          ? "absolute inset-0 flex flex-col gap-1.5 overflow-hidden p-3 pb-9"
          : "absolute inset-0 grid grid-cols-1 gap-2 overflow-hidden p-3 pb-9 sm:grid-cols-[1.15fr_0.85fr] sm:p-4 sm:pb-10 md:p-5 md:pb-11"
      }
      custom={direction}
      initial={
        reduce
          ? { opacity: 0 }
          : { opacity: 0, x: direction > 0 ? 28 : -28, rotateY: direction > 0 ? -6 : 6, scale: 0.98 }
      }
      animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
      exit={
        reduce
          ? { opacity: 0 }
          : { opacity: 0, x: direction > 0 ? -22 : 22, rotateY: direction > 0 ? 5 : -5, scale: 0.985 }
      }
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {rail && (
        <ParallaxLayer depth={1.4} offsetX={offsetX} offsetY={offsetY} className="relative shrink-0">
          <HolographicCard className="h-[64px] sm:h-[80px]">
            <FloatingParticles accent={slide.accent} />
            <LightScanner />
            <ParallaxLayer depth={2.2} offsetX={offsetX} offsetY={offsetY} className="relative z-10 h-full">
              <SlideVisualMark visual={slide.visual} accent={slide.accent} />
            </ParallaxLayer>
          </HolographicCard>
        </ParallaxLayer>
      )}

      <div className="relative z-10 flex min-w-0 flex-col justify-center pr-1">
        <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
          {slide.eyebrow}
        </p>
        <h3
          className={
            rail
              ? "mt-1 text-sm font-semibold tracking-tight text-foreground"
              : "mt-1.5 text-base font-semibold tracking-tight text-foreground md:text-[17px]"
          }
        >
          {slide.headline}
        </h3>
        <p
          className={
            rail
              ? "mt-1 line-clamp-3 text-[11px] leading-relaxed text-muted-foreground"
              : "mt-1.5 line-clamp-3 text-[11px] leading-relaxed text-muted-foreground md:text-xs"
          }
        >
          {slide.description}
        </p>
        <div className="mt-2.5">
          <CTAButton href={slide.href} label={slide.cta} />
        </div>
      </div>

      {!rail && (
        <ParallaxLayer depth={1.4} offsetX={offsetX} offsetY={offsetY} className="relative min-h-0">
          <HolographicCard className="h-full min-h-[100px] sm:min-h-[140px]">
            <FloatingParticles accent={slide.accent} />
            <LightScanner />
            <ParallaxLayer depth={2.2} offsetX={offsetX} offsetY={offsetY} className="relative z-10 h-full">
              <SlideVisualMark visual={slide.visual} accent={slide.accent} />
            </ParallaxLayer>
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_45%)]"
              aria-hidden
            />
          </HolographicCard>
        </ParallaxLayer>
      )}
    </motion.div>
  )
}
