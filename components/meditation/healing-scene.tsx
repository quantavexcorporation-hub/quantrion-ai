"use client"

import { cn } from "@/lib/utils"
import { HEALING_SCENES, type HealingScene } from "./meditation-data"

export function HealingSceneBackdrop({
  scene,
  className,
}: {
  scene: HealingScene
  className?: string
}) {
  const meta = HEALING_SCENES[scene]

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden bg-gradient-to-br",
        meta.gradient,
        className
      )}
      aria-hidden
    >
      {/* soft healing orbs */}
      <div
        className="absolute -left-10 top-10 h-56 w-56 rounded-full blur-3xl"
        style={{ background: meta.accent }}
      />
      <div
        className="absolute -right-8 bottom-8 h-64 w-64 rounded-full blur-3xl opacity-80"
        style={{ background: meta.accent }}
      />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent" />

      {scene === "moon-lake" && (
        <>
          <div className="absolute left-1/2 top-[18%] h-24 w-24 -translate-x-1/2 rounded-full bg-sky-100/80 shadow-[0_0_60px_rgba(186,230,253,0.45)]" />
          <div className="absolute inset-x-[12%] bottom-[18%] h-24 rounded-[100%] border border-sky-200/10 bg-sky-200/5 blur-[1px]" />
          <div className="absolute inset-x-[20%] bottom-[22%] h-px bg-gradient-to-r from-transparent via-sky-100/40 to-transparent" />
        </>
      )}

      {scene === "forest-mist" && (
        <>
          <div className="absolute bottom-0 left-[8%] h-40 w-16 rounded-t-full bg-emerald-950/50" />
          <div className="absolute bottom-0 left-[18%] h-52 w-20 rounded-t-full bg-emerald-900/40" />
          <div className="absolute bottom-0 right-[14%] h-48 w-24 rounded-t-full bg-emerald-950/45" />
          <div className="absolute inset-x-0 top-1/3 h-32 bg-emerald-200/5 blur-2xl" />
        </>
      )}

      {scene === "ocean-dusk" && (
        <>
          <div className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-blue-900/50 via-blue-800/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-[28%] h-8 animate-pulse rounded-full bg-blue-300/10 blur-md" />
          <div className="absolute inset-x-[10%] bottom-[22%] h-6 rounded-full bg-indigo-200/10 blur-lg" />
        </>
      )}

      {scene === "aurora-soft" && (
        <>
          <div className="absolute left-[10%] top-[20%] h-40 w-2/3 rotate-[-8deg] rounded-full bg-violet-400/15 blur-3xl" />
          <div className="absolute right-[5%] top-[30%] h-32 w-1/2 rotate-[12deg] rounded-full bg-fuchsia-400/10 blur-3xl" />
          <div className="absolute left-[20%] top-[40%] h-24 w-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
        </>
      )}

      {scene === "temple-glow" && (
        <>
          <div className="absolute left-1/2 top-[22%] h-28 w-28 -translate-x-1/2 rounded-full bg-amber-200/25 blur-2xl" />
          <div className="absolute left-1/2 top-[30%] h-16 w-40 -translate-x-1/2 rounded-t-full border border-amber-200/20 bg-amber-950/30" />
          <div className="absolute inset-x-[30%] bottom-[20%] h-24 rounded-t-[40%] bg-amber-900/20" />
        </>
      )}
    </div>
  )
}
