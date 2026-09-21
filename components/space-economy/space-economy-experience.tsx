"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion"
import {
  ChevronRight,
  Globe2,
  MessageSquare,
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
import { AiEmploymentPanel } from "@/components/ai-employment/ai-employment-panel"
import { SpaceHero } from "./space-hero"
import {
  AI_ANSWERS,
  AI_PROMPTS,
  CAREERS,
  ECOSYSTEM_NODES,
  FUTURE_STAGES,
  INDUSTRIES,
  MAP_POINTS,
  MISSIONS,
  NEWS,
  NEWS_CATS,
  SPACE_NUMBERS,
  SPACE_PROJECT_CATS,
  SPACE_PROJECTS,
  TECH_LAB,
  TIMELINE,
} from "./space-data"

function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string
  title: string
  subtitle: string
}) {
  return (
    <div className="mb-8 max-w-3xl">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-400/90">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-400 md:text-base">{subtitle}</p>
    </div>
  )
}

function AnimatedCounter({
  value,
  prefix,
  suffix,
  decimals,
}: {
  value: number
  prefix: string
  suffix: string
  decimals: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setDisplay(value)
      return
    }
    let raf = 0
    const start = performance.now()
    const duration = 1400
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(value * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, reduce])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display.toLocaleString(undefined, {
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  )
}

export function SpaceEconomyExperience() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const spaceTechRef = useRef<HTMLDivElement>(null)
  const aiRef = useRef<HTMLDivElement>(null)
  const [activeYear, setActiveYear] = useState(0)
  const [openIndustry, setOpenIndustry] = useState<string | null>(null)
  const [hoverNode, setHoverNode] = useState<(typeof ECOSYSTEM_NODES)[number] | null>(null)
  const [openMission, setOpenMission] = useState<string | null>(null)
  const [projectCat, setProjectCat] = useState<(typeof SPACE_PROJECT_CATS)[number]>("All")
  const [openProject, setOpenProject] = useState<string | null>(null)
  const [openCareer, setOpenCareer] = useState<string | null>(null)
  const [mapFocus, setMapFocus] = useState<(typeof MAP_POINTS)[number] | null>(MAP_POINTS[0])
  const [techIdx, setTechIdx] = useState(0)
  const [aiPrompt, setAiPrompt] = useState<(typeof AI_PROMPTS)[number]>(AI_PROMPTS[0])
  const [aiBusy, setAiBusy] = useState(false)
  const [aiReply, setAiReply] = useState(AI_ANSWERS[AI_PROMPTS[0]])
  const [newsCat, setNewsCat] = useState<(typeof NEWS_CATS)[number]>("All")
  const [futureIdx, setFutureIdx] = useState(0)
  const [globeAngle, setGlobeAngle] = useState(0)

  const filteredNews = useMemo(
    () => (newsCat === "All" ? NEWS : NEWS.filter((n) => n.cat === newsCat)),
    [newsCat],
  )

  const filteredProjects = useMemo(
    () =>
      projectCat === "All"
        ? SPACE_PROJECTS
        : SPACE_PROJECTS.filter((p) => p.cat === projectCat),
    [projectCat],
  )

  useEffect(() => {
    const id = window.setInterval(() => setGlobeAngle((a) => (a + 0.4) % 360), 40)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    const id = window.setInterval(() => {
      setFutureIdx((i) => (i + 1) % FUTURE_STAGES.length)
    }, 5200)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.location.hash === "#space-technology") {
      window.setTimeout(() => {
        spaceTechRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 120)
    }
  }, [])

  const askAi = (prompt: (typeof AI_PROMPTS)[number]) => {
    setAiPrompt(prompt)
    setAiBusy(true)
    setAiReply("")
    window.setTimeout(() => {
      setAiReply(AI_ANSWERS[prompt] ?? "Exploring that trajectory…")
      setAiBusy(false)
    }, 700)
  }

  return (
    <ShellLayout hideHeader aiStatus="predicting" className="!p-0 md:!p-0 xl:!p-0">
      <div className="relative min-h-full overflow-x-hidden bg-[#030712] text-slate-100">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(56,189,248,0.15), transparent), radial-gradient(ellipse 60% 40% at 90% 20%, rgba(99,102,241,0.12), transparent)",
          }}
        />

        <div className="relative z-10 space-y-16 px-4 py-4 md:space-y-24 md:px-6 md:py-6 xl:px-8">
          <SpaceHero
            onExplore={() => timelineRef.current?.scrollIntoView({ behavior: "smooth" })}
            onLaunch={() => spaceTechRef.current?.scrollIntoView({ behavior: "smooth" })}
          />

          {/* Space Technology — learning inside Space Economy */}
          <section
            id="space-technology"
            ref={spaceTechRef}
            className="scroll-mt-6 space-y-8 rounded-3xl border border-cyan-400/25 bg-gradient-to-b from-cyan-500/[0.07] via-transparent to-transparent p-5 md:p-8"
          >
            <SectionTitle
              eyebrow="Learn Inside Space Economy"
              title="Space Technology"
              subtitle="The engineering curriculum of the space age — rockets, satellites, orbitals, Moon & Mars programs, and mission-ready modules. This is where students learn the technology that powers the space economy."
            />
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { title: "Rocket Systems", body: "Propulsion, structures, reuse, and launch ops.", icon: Rocket },
                { title: "Satellite Engineering", body: "Buses, payloads, power, thermal, ADCS.", icon: Satellite },
                { title: "Orbital Mechanics", body: "Transfers, rendezvous, and trajectories.", icon: Orbit },
                { title: "Exploration Programs", body: "Moon, Mars, probes, and habitats.", icon: Telescope },
              ].map((track) => {
                const Icon = track.icon
                return (
                  <div
                    key={track.title}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <Icon className="h-4 w-4 text-cyan-300" />
                    <h3 className="mt-3 text-sm font-semibold text-white">{track.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{track.body}</p>
                  </div>
                )
              })}
            </div>
            <QrionCourseCatalog accent="hsl(187 92% 55%)" lockedPillar="space" />
            <div className="mt-8">
              <AiEmploymentPanel domain="space" accent="hsl(187 92% 55%)" />
            </div>
          </section>

          {/* Timeline */}
          <section ref={timelineRef} className="scroll-mt-6">
            <SectionTitle
              eyebrow="Section 01"
              title="The Space Economy Timeline"
              subtitle="From Sputnik to Mars colonies — click any milestone to expand the economic story."
            />
            <div className="relative">
              <div className="mb-6 flex gap-3 overflow-x-auto pb-3 [scrollbar-width:thin]">
                {TIMELINE.map((event, i) => (
                  <button
                    key={event.year}
                    type="button"
                    onClick={() => setActiveYear(i)}
                    className={cn(
                      "group relative min-w-[140px] shrink-0 rounded-2xl border px-4 py-4 text-left transition-all",
                      activeYear === i
                        ? "border-cyan-400/50 bg-cyan-500/10 shadow-[0_0_40px_rgba(34,211,238,0.15)]"
                        : "border-white/10 bg-white/[0.03] hover:border-cyan-400/30 hover:bg-white/[0.06]",
                    )}
                  >
                    <span className="font-mono text-xs text-cyan-300/80">{event.year}</span>
                    <p className="mt-1 text-sm font-medium text-white">{event.title}</p>
                    {i < TIMELINE.length - 1 && (
                      <ChevronRight className="absolute -right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-500/40" />
                    )}
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={TIMELINE[activeYear].year}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-slate-900/80 to-slate-950/90 p-6 backdrop-blur-xl md:p-8"
                >
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <p className="font-mono text-sm text-cyan-400">{TIMELINE[activeYear].year}</p>
                      <h3 className="mt-1 text-2xl font-semibold text-white md:text-3xl">
                        {TIMELINE[activeYear].title}
                      </h3>
                    </div>
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-cyan-400/30 to-indigo-500/20 ring-1 ring-cyan-400/30" />
                  </div>
                  <p className="mt-4 max-w-3xl text-slate-300">{TIMELINE[activeYear].summary}</p>
                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                      <p className="text-[10px] uppercase tracking-widest text-cyan-400/80">Importance</p>
                      <p className="mt-2 text-sm text-slate-300">{TIMELINE[activeYear].importance}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                      <p className="text-[10px] uppercase tracking-widest text-cyan-400/80">Economic impact</p>
                      <p className="mt-2 text-sm text-slate-300">{TIMELINE[activeYear].economic}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                      <p className="text-[10px] uppercase tracking-widest text-cyan-400/80">Technologies</p>
                      <ul className="mt-2 space-y-1 text-sm text-slate-300">
                        {TIMELINE[activeYear].tech.map((t) => (
                          <li key={t}>· {t}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </section>

          {/* Industries */}
          <section>
            <SectionTitle
              eyebrow="Section 02"
              title="Space Industries"
              subtitle="Fifteen frontiers shaping the next century of industry."
            />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {INDUSTRIES.map((ind) => {
                const open = openIndustry === ind.id
                return (
                  <motion.button
                    key={ind.id}
                    type="button"
                    layout
                    onClick={() => setOpenIndustry(open ? null : ind.id)}
                    className={cn(
                      "rounded-2xl border p-5 text-left transition-colors",
                      open
                        ? "border-cyan-400/40 bg-cyan-500/10 sm:col-span-2 lg:col-span-3"
                        : "border-white/10 bg-white/[0.03] hover:border-cyan-400/25 hover:bg-white/[0.06]",
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{ind.title}</h3>
                        <p className="mt-1 text-sm text-slate-400">{ind.blurb}</p>
                      </div>
                      <Orbit className={cn("h-5 w-5 shrink-0 text-cyan-400/70", open && "text-cyan-300")} />
                    </div>
                    <AnimatePresence>
                      {open && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 overflow-hidden text-sm leading-relaxed text-slate-300"
                        >
                          {ind.detail}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.button>
                )
              })}
            </div>
          </section>

          {/* Ecosystem map */}
          <section>
            <SectionTitle
              eyebrow="Section 03"
              title="The Future Economy Map"
              subtitle="Hover a node to see how space transforms every industry on Earth."
            />
            <div className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-[#050b18] p-6 md:min-h-[420px] md:p-10">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08),transparent_55%)]" />
              <div className="relative mx-auto flex max-w-4xl flex-col items-center">
                <div className="z-10 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-6 py-3 text-sm font-semibold tracking-[0.2em] text-cyan-100 shadow-[0_0_50px_rgba(34,211,238,0.25)]">
                  SPACE ECONOMY
                </div>
                <div className="mt-10 grid w-full grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {ECOSYSTEM_NODES.map((node, i) => (
                    <motion.button
                      key={node.id}
                      type="button"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.03 }}
                      onMouseEnter={() => setHoverNode(node)}
                      onFocus={() => setHoverNode(node)}
                      onMouseLeave={() => setHoverNode(null)}
                      className="rounded-xl border border-white/10 bg-black/40 px-3 py-3 text-center text-xs font-medium text-slate-200 transition hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-100 hover:shadow-[0_0_24px_rgba(34,211,238,0.2)]"
                    >
                      {node.label}
                    </motion.button>
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  {hoverNode && (
                    <motion.div
                      key={hoverNode.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-8 max-w-xl rounded-2xl border border-cyan-400/30 bg-slate-950/90 px-5 py-4 text-center text-sm text-slate-300 backdrop-blur"
                    >
                      <span className="font-semibold text-cyan-300">{hoverNode.label}</span>
                      <span className="mx-2 text-slate-600">·</span>
                      {hoverNode.how}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </section>

          {/* Missions */}
          <section>
            <SectionTitle
              eyebrow="Section 04"
              title="Space Missions"
              subtitle="Destinations and platforms that define the next economic frontier."
            />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {MISSIONS.map((m) => {
                const open = openMission === m.id
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setOpenMission(open ? null : m.id)}
                    className={cn(
                      "group rounded-2xl border p-5 text-left transition",
                      open
                        ? "border-indigo-400/40 bg-indigo-500/10 xl:col-span-2"
                        : "border-white/10 bg-white/[0.03] hover:border-indigo-400/30",
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <Telescope className="h-4 w-4 text-indigo-300" />
                      <h3 className="text-lg font-semibold text-white">{m.name}</h3>
                    </div>
                    <p className="mt-2 text-sm text-slate-400">{m.purpose}</p>
                    {open && (
                      <div className="mt-4 space-y-3 text-sm text-slate-300">
                        <p>
                          <span className="text-cyan-400/90">Technology · </span>
                          {m.tech.join(", ")}
                        </p>
                        <p>
                          <span className="text-cyan-400/90">Challenges · </span>
                          {m.challenges.join(", ")}
                        </p>
                        <p>
                          <span className="text-cyan-400/90">Opportunity · </span>
                          {m.opportunity}
                        </p>
                        <p>
                          <span className="text-cyan-400/90">Careers · </span>
                          {m.careers.join(", ")}
                        </p>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </section>

          {/* Space Projects */}
          <section>
            <SectionTitle
              eyebrow="Section 05"
              title="Space Projects"
              subtitle="Rockets, shuttles, satellites, stations, probes, landers, rovers, telescopes, and habitats — the machines that built the space age."
            />
            <div className="mb-5 flex flex-wrap gap-2">
              {SPACE_PROJECT_CATS.map((cat) => (
                <Button
                  key={cat}
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setProjectCat(cat)
                    setOpenProject(null)
                  }}
                  className={cn(
                    "rounded-full border-white/15 bg-transparent text-xs",
                    projectCat === cat
                      ? "border-cyan-400/50 bg-cyan-500/15 text-cyan-100"
                      : "text-slate-400 hover:text-slate-200",
                  )}
                >
                  {cat}
                </Button>
              ))}
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProjects.map((project) => {
                const open = openProject === project.id
                const Icon =
                  project.cat === "Rockets" || project.cat === "Shuttles"
                    ? Rocket
                    : project.cat === "Satellites" || project.cat === "Telescopes"
                      ? Satellite
                      : project.cat === "Stations" || project.cat === "Habitats"
                        ? Orbit
                        : Telescope
                return (
                  <motion.button
                    key={project.id}
                    type="button"
                    layout
                    onClick={() => setOpenProject(open ? null : project.id)}
                    className={cn(
                      "rounded-2xl border p-5 text-left transition",
                      open
                        ? "border-cyan-400/40 bg-cyan-500/10 sm:col-span-2 xl:col-span-3"
                        : "border-white/10 bg-white/[0.03] hover:border-cyan-400/30 hover:bg-white/[0.06]",
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-500/10">
                          <Icon className="h-5 w-5 text-cyan-300" />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                            <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-slate-400">
                              {project.cat}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-cyan-300/80">
                            {project.era} · {project.status}
                          </p>
                          <p className="mt-2 text-sm text-slate-400">{project.summary}</p>
                        </div>
                      </div>
                      <ChevronRight
                        className={cn(
                          "mt-1 h-4 w-4 shrink-0 text-slate-500 transition-transform",
                          open && "rotate-90 text-cyan-300",
                        )}
                      />
                    </div>
                    <AnimatePresence>
                      {open && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-5 grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                              <p className="text-[10px] uppercase tracking-widest text-cyan-400/80">
                                How it was built
                              </p>
                              <p className="mt-2 text-sm text-slate-300">{project.build}</p>
                            </div>
                            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                              <p className="text-[10px] uppercase tracking-widest text-cyan-400/80">
                                Why it matters
                              </p>
                              <p className="mt-2 text-sm text-slate-300">{project.impact}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                )
              })}
            </div>
            {filteredProjects.length === 0 && (
              <p className="text-sm text-slate-500">No projects in this category yet.</p>
            )}
          </section>

          {/* Careers */}
          <section>
            <SectionTitle
              eyebrow="Section 06"
              title="Careers of the Future"
              subtitle="Roles that will build the multi-planetary economy."
            />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {CAREERS.map((c) => {
                const open = openCareer === c.title
                return (
                  <button
                    key={c.title}
                    type="button"
                    onClick={() => setOpenCareer(open ? null : c.title)}
                    className={cn(
                      "rounded-2xl border p-5 text-left transition",
                      open
                        ? "border-cyan-400/40 bg-cyan-500/10 lg:col-span-3"
                        : "border-white/10 bg-white/[0.03] hover:border-cyan-400/25",
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-semibold text-white">{c.title}</h3>
                      <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-cyan-300">
                        {c.demand}
                      </span>
                    </div>
                    {open && (
                      <div className="mt-4 grid gap-3 text-sm text-slate-300 md:grid-cols-3">
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-cyan-400/80">Skills</p>
                          <p className="mt-1">{c.skills.join(" · ")}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-cyan-400/80">Roadmap</p>
                          <p className="mt-1">{c.roadmap.join(" → ")}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-cyan-400/80">Industries</p>
                          <p className="mt-1">{c.industries.join(" · ")}</p>
                        </div>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </section>

          {/* Numbers */}
          <section>
            <SectionTitle
              eyebrow="Section 07"
              title="Space Economy Numbers"
              subtitle="Order-of-magnitude signals of a trillion-dollar frontier."
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {SPACE_NUMBERS.map((n) => (
                <div
                  key={n.label}
                  className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-5"
                >
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">{n.label}</p>
                  <p className="mt-3 text-3xl font-semibold tracking-tight text-cyan-200 md:text-4xl">
                    <AnimatedCounter
                      value={n.value}
                      prefix={n.prefix}
                      suffix={n.suffix}
                      decimals={n.decimals}
                    />
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Global map */}
          <section>
            <SectionTitle
              eyebrow="Section 08"
              title="Global Space Map"
              subtitle="Launch sites, agencies, and the glowing network of access to orbit."
            />
            <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-cyan-400/20 bg-[#040a14]">
                <div
                  className="absolute left-1/2 top-1/2 h-[70%] w-[45%] -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 35% 35%, #38bdf8 0%, #0369a1 40%, #0f172a 75%)",
                    transform: `translate(-50%, -50%) rotate(${globeAngle}deg)`,
                    boxShadow: "0 0 80px rgba(56,189,248,0.25)",
                  }}
                />
                <div className="absolute inset-0">
                  {MAP_POINTS.map((p) => (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() => setMapFocus(p)}
                      style={{ left: `${p.x}%`, top: `${p.y}%` }}
                      className={cn(
                        "absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full transition",
                        mapFocus?.name === p.name
                          ? "bg-cyan-300 shadow-[0_0_16px_#22d3ee] ring-4 ring-cyan-400/30"
                          : "bg-cyan-500/70 hover:bg-cyan-300",
                      )}
                      aria-label={p.name}
                    />
                  ))}
                </div>
                <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-40" aria-hidden>
                  <ellipse
                    cx="50%"
                    cy="50%"
                    rx="38%"
                    ry="18%"
                    fill="none"
                    stroke="rgba(56,189,248,0.35)"
                    strokeDasharray="4 6"
                  />
                  <ellipse
                    cx="50%"
                    cy="50%"
                    rx="48%"
                    ry="28%"
                    fill="none"
                    stroke="rgba(129,140,248,0.25)"
                    strokeDasharray="2 8"
                  />
                </svg>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <Globe2 className="h-5 w-5 text-cyan-400" />
                <h3 className="mt-3 text-xl font-semibold text-white">{mapFocus?.name}</h3>
                <p className="mt-1 text-sm text-cyan-300/80">{mapFocus?.type}</p>
                <p className="mt-4 text-sm leading-relaxed text-slate-400">
                  A critical node in humanity&apos;s launch and mission network — connecting agencies,
                  commercial providers, and tracking infrastructure for Earth orbit and beyond.
                </p>
                <ul className="mt-6 space-y-2">
                  {MAP_POINTS.slice(0, 6).map((p) => (
                    <li key={p.name}>
                      <button
                        type="button"
                        onClick={() => setMapFocus(p)}
                        className={cn(
                          "w-full rounded-lg px-3 py-2 text-left text-sm transition",
                          mapFocus?.name === p.name
                            ? "bg-cyan-500/15 text-cyan-100"
                            : "text-slate-400 hover:bg-white/5 hover:text-slate-200",
                        )}
                      >
                        {p.name}{" "}
                        <span className="text-slate-600">· {p.type}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Tech lab */}
          <section>
            <SectionTitle
              eyebrow="Section 09"
              title="Space Technology Lab"
              subtitle="A holographic walkthrough of the engines of the space age."
            />
            <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
              <div className="flex flex-col gap-2">
                {TECH_LAB.map((t, i) => (
                  <button
                    key={t.title}
                    type="button"
                    onClick={() => setTechIdx(i)}
                    className={cn(
                      "rounded-xl border px-4 py-3 text-left text-sm transition",
                      techIdx === i
                        ? "border-cyan-400/40 bg-cyan-500/10 text-cyan-100"
                        : "border-white/10 bg-transparent text-slate-400 hover:border-white/20 hover:text-slate-200",
                    )}
                  >
                    {t.title}
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={TECH_LAB[techIdx].title}
                  initial={{ opacity: 0, rotateX: 8 }}
                  animate={{ opacity: 1, rotateX: 0 }}
                  exit={{ opacity: 0 }}
                  className="relative overflow-hidden rounded-3xl border border-cyan-400/25 bg-gradient-to-br from-slate-900 via-[#07101f] to-indigo-950/40 p-8 md:min-h-[320px]"
                >
                  <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />
                  <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-32 rounded-full bg-indigo-500/20 blur-3xl" />
                  <Zap className="h-6 w-6 text-cyan-300" />
                  <h3 className="mt-4 text-2xl font-semibold text-white md:text-3xl">
                    {TECH_LAB[techIdx].title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
                    {TECH_LAB[techIdx].body}
                  </p>
                  <div className="mt-8 grid grid-cols-3 gap-3">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="h-16 rounded-xl border border-cyan-400/15 bg-cyan-500/5"
                        style={{
                          transform: `perspective(600px) rotateY(${(i - 1) * 8}deg)`,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </section>

          {/* Learn with AI */}
          <section ref={aiRef} className="scroll-mt-6">
            <SectionTitle
              eyebrow="Section 10"
              title="Learn with AI"
              subtitle="Ask Quantrion intelligence about orbits, rockets, careers, and the space economy."
            />
            <div className="overflow-hidden rounded-3xl border border-cyan-400/25 bg-[#050b16]">
              <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
                <Sparkles className="h-4 w-4 text-cyan-400" />
                <span className="text-sm font-medium text-slate-200">Quantrion Space Intelligence</span>
                <span className="ml-auto h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
              </div>
              <div className="grid gap-0 lg:grid-cols-[240px_1fr]">
                <div className="flex flex-col gap-1 border-b border-white/10 p-3 lg:border-b-0 lg:border-r">
                  {AI_PROMPTS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => askAi(p)}
                      className={cn(
                        "rounded-lg px-3 py-2.5 text-left text-sm transition",
                        aiPrompt === p
                          ? "bg-cyan-500/15 text-cyan-100"
                          : "text-slate-400 hover:bg-white/5 hover:text-slate-200",
                      )}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <div className="flex min-h-[280px] flex-col p-5">
                  <div className="mb-4 flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10">
                      <MessageSquare className="h-4 w-4 text-slate-300" />
                    </div>
                    <div className="rounded-2xl rounded-tl-sm bg-white/5 px-4 py-3 text-sm text-slate-200">
                      {aiPrompt}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-500/20">
                      <Sparkles className="h-4 w-4 text-cyan-300" />
                    </div>
                    <div className="flex-1 rounded-2xl rounded-tl-sm border border-cyan-400/20 bg-cyan-500/5 px-4 py-3 text-sm leading-relaxed text-slate-200">
                      {aiBusy ? (
                        <span className="inline-flex gap-1 text-cyan-300/80">
                          <span className="animate-pulse">·</span>
                          <span className="animate-pulse [animation-delay:150ms]">·</span>
                          <span className="animate-pulse [animation-delay:300ms]">·</span>
                        </span>
                      ) : (
                        aiReply
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* News daily */}
          <section>
            <SectionTitle
              eyebrow="Section 11"
              title="Space Economy Daily"
              subtitle="A premium intelligence feed — filter by domain (UI preview)."
            />
            <div className="mb-5 flex flex-wrap gap-2">
              {NEWS_CATS.map((cat) => (
                <Button
                  key={cat}
                  size="sm"
                  variant="outline"
                  onClick={() => setNewsCat(cat)}
                  className={cn(
                    "rounded-full border-white/15 bg-transparent text-xs",
                    newsCat === cat
                      ? "border-cyan-400/50 bg-cyan-500/15 text-cyan-100"
                      : "text-slate-400 hover:text-slate-200",
                  )}
                >
                  {cat}
                </Button>
              ))}
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredNews.map((n) => (
                <article
                  key={n.id}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:border-cyan-400/30"
                >
                  <div className="h-1 w-full bg-gradient-to-r from-cyan-400/60 via-indigo-400/40 to-transparent opacity-70 transition group-hover:opacity-100" />
                  <div className="p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-400/80">
                      {n.cat}
                    </p>
                    <h3 className="mt-2 text-base font-semibold text-white">{n.title}</h3>
                    <p className="mt-2 text-sm text-slate-400">{n.excerpt}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Future visualization */}
          <section className="pb-16">
            <SectionTitle
              eyebrow="Section 12"
              title="Future Visualization"
              subtitle="A cinematic path from Earth today to an interplanetary economy."
            />
            <div className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-[#020617]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.12),transparent_50%)]" />
              <div className="relative flex gap-2 overflow-x-auto border-b border-white/10 px-4 py-3">
                {FUTURE_STAGES.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setFutureIdx(i)}
                    className={cn(
                      "shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition",
                      futureIdx === i
                        ? "bg-cyan-500/20 text-cyan-100"
                        : "text-slate-500 hover:text-slate-300",
                    )}
                  >
                    {s.title}
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={FUTURE_STAGES[futureIdx].id}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45 }}
                  className="relative flex min-h-[320px] flex-col justify-end p-8 md:min-h-[420px] md:p-12"
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-60"
                    style={{
                      background: `linear-gradient(135deg, rgba(3,7,18,0.2), rgba(3,7,18,0.85)), radial-gradient(circle at ${20 + futureIdx * 12}% ${40 + futureIdx * 5}%, rgba(56,189,248,0.25), transparent 45%)`,
                    }}
                  />
                  <div className="relative z-10 max-w-2xl">
                    <p className="font-mono text-xs text-cyan-400/80">
                      Stage {String(futureIdx + 1).padStart(2, "0")} / {FUTURE_STAGES.length}
                    </p>
                    <h3 className="mt-2 text-3xl font-semibold text-white md:text-5xl">
                      {FUTURE_STAGES[futureIdx].title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-slate-300 md:text-lg">
                      {FUTURE_STAGES[futureIdx].body}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <p className="mt-10 text-center text-xs tracking-[0.25em] text-slate-600 uppercase">
              Quantrion · Operating System for Humanity&apos;s Future in Space
            </p>
          </section>
        </div>
      </div>
    </ShellLayout>
  )
}
