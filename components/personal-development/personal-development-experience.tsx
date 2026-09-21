"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import {
  ArrowRight,
  Brain,
  ChevronRight,
  Compass,
  Flame,
  Search,
  Sparkles,
  Target,
  Zap,
} from "lucide-react"
import { ShellLayout } from "@/components/layout/shell-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { PD_CATALOG, PD_PATHS, PD_TOTAL_COURSES, type PdCategory } from "./pd-data"
import { AiEmploymentPanel } from "@/components/ai-employment/ai-employment-panel"

const ACCENT = "#2dd4bf"

function PdHero({ onEnter }: { onEnter: () => void }) {
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
    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00035,
      vy: -0.0002 - Math.random() * 0.00045,
      r: 0.6 + Math.random() * 1.8,
      a: 0.25 + Math.random() * 0.5,
    }))
    let t = 0

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
      t += 0.008
      ctx.fillStyle = "#04060a"
      ctx.fillRect(0, 0, w, h)

      const g1 = ctx.createRadialGradient(w * 0.3, h * 0.4, 0, w * 0.3, h * 0.4, w * 0.5)
      g1.addColorStop(0, "rgba(45,212,191,0.14)")
      g1.addColorStop(1, "transparent")
      ctx.fillStyle = g1
      ctx.fillRect(0, 0, w, h)

      const g2 = ctx.createRadialGradient(w * 0.85, h * 0.7, 0, w * 0.85, h * 0.7, w * 0.4)
      g2.addColorStop(0, "rgba(251,191,36,0.08)")
      g2.addColorStop(1, "transparent")
      ctx.fillStyle = g2
      ctx.fillRect(0, 0, w, h)

      // neural grid
      ctx.strokeStyle = "rgba(148,163,184,0.06)"
      for (let i = 0; i < 10; i++) {
        const y = h * 0.35 + i * 22 + Math.sin(t + i) * 4
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.bezierCurveTo(w * 0.3, y + 10, w * 0.7, y - 8, w, y + 6)
        ctx.stroke()
      }

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.y < -0.05) p.y = 1.05
        if (p.x < 0 || p.x > 1) p.vx *= -1
        ctx.beginPath()
        ctx.fillStyle = `rgba(45,212,191,${p.a})`
        ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      // glowing core
      const cx = w * 0.78
      const cy = h * 0.48
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(w, h) * 0.16)
      core.addColorStop(0, "rgba(45,212,191,0.45)")
      core.addColorStop(0.45, "rgba(20,184,166,0.15)")
      core.addColorStop(1, "transparent")
      ctx.fillStyle = core
      ctx.beginPath()
      ctx.arc(cx, cy, Math.min(w, h) * 0.16, 0, Math.PI * 2)
      ctx.fill()

      ctx.strokeStyle = "rgba(45,212,191,0.35)"
      ctx.beginPath()
      ctx.arc(cx, cy, Math.min(w, h) * 0.1 + Math.sin(t * 2) * 4, 0, Math.PI * 2)
      ctx.stroke()

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

  return (
    <section className="relative isolate min-h-[74vh] overflow-hidden rounded-3xl border border-teal-400/25 bg-[#04060a]">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-r from-[#04060a]/95 via-[#04060a]/65 to-transparent" />
      <div className="relative z-10 flex min-h-[74vh] flex-col justify-center px-6 py-14 md:px-12 lg:max-w-3xl">
        <motion.p
          className="mb-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-300/90"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Sparkles className="h-3.5 w-3.5" />
          Quantrion · Future Division
        </motion.p>
        <motion.h1
          className="text-4xl font-semibold tracking-tight text-white md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 }}
        >
          FUTURE OF
          <br />
          INDUSTRIES
        </motion.h1>
        <motion.p
          className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
        >
          Learn what will create tomorrow&apos;s industries — AI, quantum, space economy, biotech,
          fusion, autonomy, BCIs, next-gen compute — plus the personal development system to lead
          them.
        </motion.p>
        <motion.div
          className="mt-8 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            size="lg"
            className="gap-2 bg-teal-400 text-slate-950 hover:bg-teal-300"
            onClick={onEnter}
          >
            Enter Future Lab <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="gap-2 border-teal-400/35 bg-white/5 text-teal-100 hover:bg-white/10"
            onClick={onEnter}
          >
            <Flame className="h-4 w-4" />
            Browse Future Domains
          </Button>
        </motion.div>
        <motion.div
          className="mt-8 flex flex-wrap gap-3 text-xs text-slate-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.28 }}
        >
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
            {PD_CATALOG.length} domains
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
            {PD_TOTAL_COURSES}+ courses
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
            Tomorrow&apos;s industries
          </span>
        </motion.div>
      </div>
    </section>
  )
}

export function PersonalDevelopmentExperience() {
  const labRef = useRef<HTMLDivElement>(null)
  const [activeId, setActiveId] = useState(PD_CATALOG[0].id)
  const [query, setQuery] = useState("")
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [pathId, setPathId] = useState<(typeof PD_PATHS)[number]["id"]>("ai-frontier")
  const reduce = useReducedMotion()

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return PD_CATALOG
    return PD_CATALOG.map((cat) => ({
      ...cat,
      courses: cat.courses.filter(
        (c) => c.toLowerCase().includes(q) || cat.title.toLowerCase().includes(q),
      ),
    })).filter((cat) => cat.courses.length > 0)
  }, [query])

  const active: PdCategory | null =
    filtered.find((c) => c.id === activeId) ?? filtered[0] ?? null

  useEffect(() => {
    if (active && active.id !== activeId) setActiveId(active.id)
  }, [active, activeId])

  const matchCount = filtered.reduce((n, c) => n + c.courses.length, 0)
  const activePath = PD_PATHS.find((p) => p.id === pathId) ?? PD_PATHS[0]

  return (
    <ShellLayout hideHeader aiStatus="optimizing" className="!p-0 md:!p-0 xl:!p-0">
      <div className="relative min-h-full overflow-x-hidden bg-[#04060a] text-slate-100">
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 70% 40% at 40% -10%, rgba(45,212,191,0.14), transparent), radial-gradient(ellipse 45% 30% at 90% 20%, rgba(251,191,36,0.07), transparent)",
          }}
        />

        <div className="relative z-10 space-y-14 px-4 py-4 md:space-y-20 md:px-6 md:py-6 xl:px-8">
          <PdHero onEnter={() => labRef.current?.scrollIntoView({ behavior: "smooth" })} />

          {/* Paths */}
          <section>
            <div className="mb-6 max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-400/90">
                Future Paths
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Choose what you will build tomorrow
              </h2>
              <p className="mt-3 text-sm text-slate-400 md:text-base">
                Trajectories across frontier technologies and the human skills required to lead them.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {PD_PATHS.map((p, i) => {
                const on = pathId === p.id
                return (
                  <motion.button
                    key={p.id}
                    type="button"
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setPathId(p.id)}
                    className={cn(
                      "rounded-2xl border p-5 text-left transition",
                      on
                        ? "border-teal-400/45 bg-teal-500/10 shadow-[0_0_40px_rgba(45,212,191,0.12)]"
                        : "border-white/10 bg-white/[0.03] hover:border-teal-400/25",
                    )}
                  >
                    <Target className="h-4 w-4 text-teal-300" />
                    <h3 className="mt-3 text-base font-semibold text-white">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.body}</p>
                  </motion.button>
                )
              })}
            </div>
            <div className="mt-5 rounded-2xl border border-teal-400/20 bg-teal-500/5 px-5 py-4 text-sm text-slate-300">
              <span className="font-medium text-teal-200">{activePath.title}</span>
              <span className="mx-2 text-slate-600">·</span>
              {activePath.body}
            </div>
          </section>

          {/* Course lab */}
          <section ref={labRef} className="scroll-mt-6 space-y-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-400/90">
                  Future Curriculum Atlas
                </p>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                  All Future of Industries
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-slate-400">
                  {PD_TOTAL_COURSES}+ modules across AI, quantum, space economy, biotech, nanotech,
                  materials, fusion, autonomy, BCIs, next-gen computing — and personal development.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-slate-400">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                  <Brain className="h-3.5 w-3.5 text-teal-300" />
                  {filtered.length} domains
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                  <Zap className="h-3.5 w-3.5 text-amber-300" />
                  {query ? `${matchCount} matches` : `${PD_TOTAL_COURSES} courses`}
                </span>
              </div>
            </div>

            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search — AI, quantum, fusion, mindset, leadership…"
                className="border-white/10 bg-white/5 pl-9 text-slate-100 placeholder:text-slate-500"
                aria-label="Search future of industries"
              />
            </div>

            <div className="overflow-hidden rounded-3xl border border-teal-400/20 bg-[#070b12]/90 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
              <div className="grid lg:grid-cols-[280px_1fr]">
                <aside className="border-b border-white/10 bg-white/[0.02] lg:border-b-0 lg:border-r">
                  <div className="max-h-[420px] overflow-y-auto p-2 [scrollbar-width:thin] lg:max-h-[640px]">
                    {filtered.map((cat) => {
                      const on = active?.id === cat.id
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            setActiveId(cat.id)
                            setSelectedCourse(null)
                          }}
                          className={cn(
                            "mb-1 flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition-colors",
                            on
                              ? "text-teal-50"
                              : "text-slate-400 hover:bg-white/5 hover:text-slate-200",
                          )}
                          style={
                            on
                              ? {
                                  background: "rgba(45,212,191,0.12)",
                                  boxShadow: `inset 2px 0 0 ${ACCENT}`,
                                }
                              : undefined
                          }
                        >
                          <span className="text-base leading-none" aria-hidden>
                            {cat.emoji}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-medium">{cat.title}</span>
                            <span className="block text-[10px] text-slate-500">
                              {cat.courses.length} courses
                            </span>
                          </span>
                        </button>
                      )
                    })}
                    {filtered.length === 0 && (
                      <p className="px-3 py-6 text-sm text-slate-500">No domains match that search.</p>
                    )}
                  </div>
                </aside>

                <div className="relative min-h-[360px] p-4 md:p-6">
                  <div
                    className="pointer-events-none absolute inset-0 opacity-40"
                    style={{
                      background:
                        "radial-gradient(ellipse at top right, rgba(45,212,191,0.12), transparent 55%)",
                    }}
                    aria-hidden
                  />
                  <AnimatePresence mode="wait">
                    {active ? (
                      <motion.div
                        key={active.id + query}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.22 }}
                        className="relative z-10"
                      >
                        <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <p className="text-2xl leading-none">{active.emoji}</p>
                            <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">
                              {active.title}
                            </h3>
                            <p className="mt-1.5 max-w-xl text-sm text-slate-400">{active.blurb}</p>
                          </div>
                          <span className="rounded-full border border-teal-400/35 bg-teal-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-teal-200">
                            {active.courses.length} modules
                          </span>
                        </div>

                        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                          {active.courses.map((course, i) => {
                            const open = selectedCourse === course
                            return (
                              <button
                                key={course}
                                type="button"
                                onClick={() => setSelectedCourse(open ? null : course)}
                                className={cn(
                                  "group rounded-xl border px-3.5 py-3.5 text-left transition-all",
                                  open
                                    ? "border-teal-400/40 bg-teal-500/10 shadow-lg"
                                    : "border-white/10 bg-white/[0.03] hover:border-teal-400/25 hover:bg-white/[0.06]",
                                )}
                              >
                                <div className="flex items-start gap-2">
                                  <span
                                    className={cn(
                                      "mt-0.5 font-mono text-[10px] tabular-nums text-slate-500",
                                      open && "text-teal-300",
                                    )}
                                  >
                                    {String(i + 1).padStart(2, "0")}
                                  </span>
                                  <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium leading-snug text-white">
                                      {course}
                                    </p>
                                    {open && (
                                      <p className="mt-2 text-xs leading-relaxed text-slate-400">
                                        Elite development module inside {active.title}. Build
                                        durable skills, daily systems, and identity-level change —
                                        not temporary motivation.
                                      </p>
                                    )}
                                  </div>
                                  <ChevronRight
                                    className={cn(
                                      "mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-500 transition-transform",
                                      open && "rotate-90 text-teal-300",
                                    )}
                                  />
                                </div>
                              </button>
                            )
                          })}
                        </div>
                      </motion.div>
                    ) : (
                      <p className="relative z-10 text-sm text-slate-500">
                        Adjust your search to browse the curriculum.
                      </p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </section>

          <AiEmploymentPanel domain="personal-development" accent="#2dd4bf" />

          {/* Closing band */}
          <section className="overflow-hidden rounded-3xl border border-teal-400/25 bg-gradient-to-br from-[#071210] via-[#04060a] to-[#12100a] p-8 md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-teal-300/90">
                  <Compass className="h-3.5 w-3.5" />
                  Continuous Evolution
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
                  Become the builder of tomorrow&apos;s industries
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  Future of Industries combines frontier technology literacy with personal development —
                  so you can invent, lead, and ship in the industries that do not fully exist yet.
                </p>
              </div>
              <Button
                size="lg"
                className="gap-2 bg-teal-400 text-slate-950 hover:bg-teal-300"
                onClick={() => labRef.current?.scrollIntoView({ behavior: "smooth" })}
              >
                Continue Training <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </section>
        </div>
      </div>
    </ShellLayout>
  )
}
