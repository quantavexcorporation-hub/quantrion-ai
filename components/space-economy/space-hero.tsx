"use client"

import { useEffect, useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Rocket, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SpaceHero({
  onExplore,
  onLaunch,
}: {
  onExplore: () => void
  onLaunch: () => void
}) {
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
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: Math.random(),
      s: 0.2 + Math.random() * 1.4,
    }))
    const sat = { a: 0 }

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
      ctx.fillStyle = "#030712"
      ctx.fillRect(0, 0, w, h)

      // nebula washes
      const g1 = ctx.createRadialGradient(w * 0.2, h * 0.3, 0, w * 0.2, h * 0.3, w * 0.45)
      g1.addColorStop(0, "rgba(56,189,248,0.12)")
      g1.addColorStop(1, "transparent")
      ctx.fillStyle = g1
      ctx.fillRect(0, 0, w, h)

      const g2 = ctx.createRadialGradient(w * 0.85, h * 0.7, 0, w * 0.85, h * 0.7, w * 0.4)
      g2.addColorStop(0, "rgba(99,102,241,0.1)")
      g2.addColorStop(1, "transparent")
      ctx.fillStyle = g2
      ctx.fillRect(0, 0, w, h)

      // stars
      for (const st of stars) {
        const tw = 0.4 + Math.sin(Date.now() * 0.002 + st.z * 10) * 0.3
        ctx.fillStyle = `rgba(255,255,255,${0.35 + st.z * 0.5 * tw})`
        ctx.beginPath()
        ctx.arc(st.x * w, st.y * h, st.s, 0, Math.PI * 2)
        ctx.fill()
        st.y += 0.00015 * (0.3 + st.z)
        if (st.y > 1) st.y = 0
      }

      // Earth
      const ex = w * 0.72
      const ey = h * 0.55
      const er = Math.min(w, h) * 0.16
      const eg = ctx.createRadialGradient(ex - er * 0.3, ey - er * 0.3, er * 0.1, ex, ey, er)
      eg.addColorStop(0, "#38bdf8")
      eg.addColorStop(0.45, "#0369a1")
      eg.addColorStop(1, "#0f172a")
      ctx.beginPath()
      ctx.arc(ex, ey, er, 0, Math.PI * 2)
      ctx.fillStyle = eg
      ctx.fill()
      ctx.strokeStyle = "rgba(125,211,252,0.35)"
      ctx.lineWidth = 2
      ctx.stroke()

      // orbit + satellite
      sat.a += 0.008
      const ox = ex + Math.cos(sat.a) * er * 1.55
      const oy = ey + Math.sin(sat.a) * er * 0.55
      ctx.beginPath()
      ctx.ellipse(ex, ey, er * 1.55, er * 0.55, 0, 0, Math.PI * 2)
      ctx.strokeStyle = "rgba(56,189,248,0.25)"
      ctx.stroke()
      ctx.fillStyle = "#e2e8f0"
      ctx.fillRect(ox - 6, oy - 2, 12, 4)
      ctx.fillStyle = "#38bdf8"
      ctx.fillRect(ox - 10, oy - 1, 4, 2)
      ctx.fillRect(ox + 6, oy - 1, 4, 2)

      // holographic grid
      ctx.strokeStyle = "rgba(148,163,184,0.08)"
      for (let i = 0; i < 8; i++) {
        const y = h * 0.55 + i * 18
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y + i * 4)
        ctx.stroke()
      }

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
    <section className="relative isolate min-h-[78vh] overflow-hidden rounded-3xl border border-cyan-400/20 bg-[#030712]">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/90 via-[#030712]/55 to-transparent" />
      <div className="relative z-10 flex min-h-[78vh] flex-col justify-center px-6 py-16 md:px-12 lg:max-w-3xl">
        <motion.p
          className="mb-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-300/90"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Sparkles className="h-3.5 w-3.5" />
          Quantrion · Future Division
        </motion.p>
        <motion.h1
          className="text-5xl font-semibold tracking-tight text-white md:text-7xl"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
        >
          SPACE ECONOMY
        </motion.h1>
        <motion.p
          className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
        >
          The Next Trillion-Dollar Economy Begins Above Earth.
        </motion.p>
        <motion.div
          className="mt-8 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24 }}
        >
          <Button
            size="lg"
            className="gap-2 bg-cyan-500 text-slate-950 hover:bg-cyan-400"
            onClick={onExplore}
          >
            Explore Future
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="gap-2 border-cyan-400/40 bg-white/5 text-cyan-100 hover:bg-white/10"
            onClick={onLaunch}
          >
            <Rocket className="h-4 w-4" />
            Learn Space Technology
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
