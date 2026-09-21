"use client"

import dynamic from "next/dynamic"
import { FuturisticAdRail } from "@/components/dashboard/ad-rail"

const AIHologramCarousel = dynamic(
  () =>
    import("@/components/dashboard/ai-hologram-carousel").then((m) => m.AIHologramCarousel),
  {
    ssr: false,
    loading: () => (
      <div
        className="h-[168px] w-full rounded-2xl border border-border/50 bg-card/30 sm:h-[200px] lg:h-[220px] xl:h-[240px]"
        aria-hidden
      />
    ),
  }
)

const SpotlightNexusDisplay = dynamic(
  () =>
    import("@/components/dashboard/spotlight-nexus-display").then((m) => m.SpotlightNexusDisplay),
  {
    ssr: false,
    loading: () => (
      <div
        className="h-[168px] w-full rounded-2xl border border-amber-400/20 bg-card/30 sm:h-[200px] lg:h-[220px] xl:h-[240px]"
        aria-hidden
      />
    ),
  }
)

const cardShell =
  "w-[min(100%,calc(100vw-2.5rem))] shrink-0 snap-center sm:w-[min(22rem,calc(100vw-3rem))] lg:w-auto lg:min-w-0 lg:shrink"

/**
 * Top strip: Intelligence · Spotlight · Ad — swipe on phones, 3-up from lg.
 */
export function PromoTopRow() {
  return (
    <div
      className="flex w-full snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] lg:grid lg:grid-cols-3 lg:items-stretch lg:gap-4 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden"
      aria-label="Intelligence, Spotlight, and Ad displays"
    >
      <div className={cardShell}>
        <AIHologramCarousel className="max-w-none" variant="rail" />
      </div>
      <div className={cardShell}>
        <SpotlightNexusDisplay fill />
      </div>
      <div className={cardShell}>
        <FuturisticAdRail orientation="vertical" compact fill />
      </div>
    </div>
  )
}

interface PromoRightRailProps {
  /** When true, used inside main column for phones/tablets */
  mobile?: boolean
}

/** Kept for mobile fallback if the top row is hidden. */
export function PromoRightRail({ mobile = false }: PromoRightRailProps) {
  if (mobile) {
    return (
      <div className="mx-auto flex w-full max-w-[480px] flex-col gap-5 lg:hidden">
        <PromoTopRow />
      </div>
    )
  }

  return null
}
