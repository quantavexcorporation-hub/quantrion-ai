"use client"

import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import {
  ArrowRight,
  BookOpen,
  Orbit,
  Rocket,
  Satellite,
  Sparkles,
  Telescope,
  Zap,
} from "lucide-react"
import { ShellLayout } from "@/components/layout/shell-layout"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { QrionCourseCatalog } from "@/components/ecosystem-gateway/qrion-course-catalog"
import {
  SPACE_COURSE_COUNT,
  SPACE_INDUSTRIAL_CATALOG,
} from "@/components/ecosystem-gateway/qrion-space-catalog"

const TRACKS = [
  {
    id: "rockets",
    title: "Rocket Systems",
    icon: Rocket,
    body: "Propulsion, structures, reuse, and launch operations — from methalox to ion drives.",
    accent: "#38bdf8",
  },
  {
    id: "sats",
    title: "Satellite Engineering",
    icon: Satellite,
    body: "Buses, payloads, power, thermal, ADCS, and constellation architecture.",
    accent: "#818cf8",
  },
  {
    id: "orbit",
    title: "Orbital Mechanics",
    icon: Orbit,
    body: "Transfers, rendezvous, attitude control, and mission trajectory design.",
    accent: "#22d3ee",
  },
  {
    id: "explore",
    title: "Exploration Programs",
    icon: Telescope,
    body: "Moon, Mars, deep-space probes, habitats, and interplanetary logistics.",
    accent: "#a78bfa",
  },
] as const

function SpaceTechHero({ onExplore }: { onExplore: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf = 0
    let w = 0
    let h = 0
    const stars = Array.from({ length: 140 }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: Math.random(),
      s: 0.2 + Math.random() * 1.5,
    }))
    let angle = 0

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      w = parent.clientWidth
      h = parent.clientHeight
      canvas.width = w * devicePixelRatio
      canvas.height = h * devicePixelRatio
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
    }

    const draw = () => {
      ctx.fillStyle = "#020617"
      ctx.fillRect(0, 0, w, h)

      const g1 = ctx.createRadialGradient(w * 0.25, h * 0.35, 0, w * 0.25, h * 0.35, w * 0.5)
      g1.addColorStop(0, "rgba(34,211,238,0.14)")
      g1.addColorStop(1, "transparent")
      ctx.fillStyle = g1
      ctx.fillRect(0, 0, w, h)

      const g2 = ctx.createRadialGradient(w * 0.8, h * 0.65, 0, w * 0.8, h * 0.65, w * 0.42)
      g2.addColorStop(0, "rgba(129,140,248,0.12)")
      g2.addColorStop(1, "transparent")
      ctx.fillStyle = g2
      ctx.fillRect(0, 0, w, h)

      for (const st of stars) {
        const tw = 0.45 + Math.sin(Date.now() * 0.002 + st.z * 12) * 0.35
        ctx.fillStyle = `rgba(255,255,255,${0.3 + st.z * 0.55 * tw})`
        ctx.beginPath()
        ctx.arc(st.x * w, st.y * h, st.s, 0, Math.PI * 2)
        ctx.fill()
        st.y += 0.00012 * (0.25 + st.z)
        if (st.y > 1) st.y = 0
      }

      // rotating orbital rings + craft
      angle += 0.006
      const cx = w * 0.72
      const cy = h * 0.48
      const r = Math.min(w, h) * 0.18
      ctx.strokeStyle = "rgba(56,189,248,0.28)"
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.ellipse(cx, cy, r * 1.6, r * 0.55, angle * 0.4, 0, Math.PI * 2)
      ctx.stroke()
      ctx.beginPath()
      ctx.ellipse(cx, cy, r * 1.15, r * 1.15, 0, 0, Math.PI * 2)
      ctx.strokeStyle = "rgba(129,140,248,0.22)"
      ctx.stroke()

      const eg = ctx.createRadialGradient(cx - r * 0.25, cy - r * 0.25, r * 0.1, cx, cy, r)
      eg.addColorStop(0, "#67e8f9")
      eg.addColorStop(0.5, "#0369a1")
      eg.addColorStop(1, "#0f172a")
      ctx.beginPath()
      ctx.arc(cx, cy, r * 0.55, 0, Math.PI * 2)
      ctx.fillStyle = eg
      ctx.fill()

      const sx = cx + Math.cos(angle) * r * 1.55
      const sy = cy + Math.sin(angle) * r * 0.55
      ctx.fillStyle = "#e2e8f0"
      ctx.fillRect(sx - 7, sy - 2.5, 14, 5)
      ctx.fillStyle = "#22d3ee"
      ctx.fillRect(sx - 11, sy - 1, 4, 2)
      ctx.fillRect(sx + 7, sy - 1, 4, 2)

      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener("resize", resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [reduce])

  const domainCount = SPACE_INDUSTRIAL_CATALOG.filter((c) => c.pillar === "space").length

  return (
    <section className="relative isolate min-h-[72vh] overflow-hidden rounded-3xl border border-cyan-400/25 bg-[#020617]">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/95 via-[#020617]/60 to-transparent" />
      <div className="relative z-10 flex min-h-[72vh] flex-col justify-center px-6 py-14 md:px-12 lg:max-w-3xl">
        <motion.p
          className="mb-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-300/90"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Sparkles className="h-3.5 w-3.5" />
          Space Economy · Technology Division
        </motion.p>
        <motion.h1
          className="text-4xl font-semibold tracking-tight text-white md:text-6xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 }}
        >
          SPACE TECHNOLOGY
        </motion.h1>
        <motion.p
          className="mt-4 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
        >
          Master the systems that leave Earth — rockets, satellites, orbitals, deep-space missions,
          and the engineering literacy of a multi-planetary civilization.
        </motion.p>
        <motion.div
          className="mt-6 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
        >
          <Button
            size="lg"
            className="gap-2 bg-cyan-500 text-slate-950 hover:bg-cyan-400"
            onClick={onExplore}
          >
            Enter Curriculum <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="gap-2 border-cyan-400/40 bg-white/5 text-cyan-100 hover:bg-white/10"
            asChild
          >
            <Link href="/space-economy">
              <Orbit className="h-4 w-4" />
              Space Economy Hub
            </Link>
          </Button>
        </motion.div>
        <motion.div
          className="mt-8 flex flex-wrap gap-4 text-xs text-slate-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.28 }}
        >
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
            {domainCount} space domains
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
            {SPACE_COURSE_COUNT}+ modules
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
            Mission-ready tracks
          </span>
        </motion.div>
      </div>
    </section>
  )
}

export function SpaceTechnologyExperience() {
  const catalogRef = useRef<HTMLDivElement>(null)
  const [activeTrack, setActiveTrack] = useState<(typeof TRACKS)[number]["id"]>("rockets")
  const reduce = useReducedMotion()

  const track = useMemo(
    () => TRACKS.find((t) => t.id === activeTrack) ?? TRACKS[0],
    [activeTrack],
  )

  return (
    <ShellLayout hideHeader aiStatus="predicting" className="!p-0 md:!p-0 xl:!p-0">
      <div className="relative min-h-full overflow-x-hidden bg-[#020617] text-slate-100">
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 45% at 50% -10%, rgba(34,211,238,0.16), transparent), radial-gradient(ellipse 50% 35% at 90% 30%, rgba(129,140,248,0.12), transparent)",
          }}
        />

        <div className="relative z-10 space-y-14 px-4 py-4 md:space-y-20 md:px-6 md:py-6 xl:px-8">
          <SpaceTechHero
            onExplore={() => catalogRef.current?.scrollIntoView({ behavior: "smooth" })}
          />

          {/* Mission tracks */}
          <section>
            <div className="mb-6 max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-400/90">
                Mission Tracks
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Choose your flight path
              </h2>
              <p className="mt-3 text-sm text-slate-400 md:text-base">
                Four elite corridors through space engineering — pick one to focus your learning
                trajectory.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {TRACKS.map((t, i) => {
                const Icon = t.icon
                const on = activeTrack === t.id
                return (
                  <motion.button
                    key={t.id}
                    type="button"
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setActiveTrack(t.id)}
                    className={cn(
                      "rounded-2xl border p-5 text-left transition",
                      on
                        ? "border-cyan-400/45 bg-cyan-500/10 shadow-[0_0_40px_rgba(34,211,238,0.12)]"
                        : "border-white/10 bg-white/[0.03] hover:border-cyan-400/25",
                    )}
                  >
                    <Icon className="h-5 w-5" style={{ color: t.accent }} />
                    <h3 className="mt-3 text-base font-semibold text-white">{t.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{t.body}</p>
                  </motion.button>
                )
              })}
            </div>
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 rounded-2xl border border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 via-transparent to-indigo-500/10 p-5 md:p-6"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Zap className="h-4 w-4 text-cyan-300" />
                <p className="text-sm font-medium text-cyan-100">Active track · {track.title}</p>
              </div>
              <p className="mt-2 max-w-3xl text-sm text-slate-300">
                Scroll into the curriculum atlas below and search modules aligned with{" "}
                <span className="text-cyan-200">{track.title.toLowerCase()}</span>. Build systems
                intuition first — then specialize toward flight, orbit, or exploration roles.
              </p>
            </motion.div>
          </section>

          {/* Curriculum */}
          <div ref={catalogRef} className="scroll-mt-6">
            <QrionCourseCatalog accent="hsl(187 92% 55%)" lockedPillar="space" />
          </div>

          {/* CTA band */}
          <section className="overflow-hidden rounded-3xl border border-cyan-400/25 bg-gradient-to-br from-slate-900 via-[#07101f] to-indigo-950/50 p-8 md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-400/90">
                  Inside Space Economy
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
                  Technology powers the economy above Earth
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  Continue into the Space Economy hub for industries, missions, projects, careers,
                  and the cinematic map of humanity&apos;s off-world future.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  size="lg"
                  className="gap-2 bg-cyan-500 text-slate-950 hover:bg-cyan-400"
                  asChild
                >
                  <Link href="/space-economy">
                    <BookOpen className="h-4 w-4" />
                    Open Space Economy
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </ShellLayout>
  )
}
