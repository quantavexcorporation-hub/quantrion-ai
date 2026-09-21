"use client"

import { useEffect, useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Compass, Zap } from "lucide-react"

export function LearningHero() {
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
    const nodes = Array.from({ length: 24 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0008,
      vy: (Math.random() - 0.5) * 0.0008,
      r: 1 + Math.random() * 1.8,
    }))

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
      ctx.clearRect(0, 0, w, h)
      nodes.forEach((n) => {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > 1) n.vx *= -1
        if (n.y < 0 || n.y > 1) n.vy *= -1
        ctx.beginPath()
        ctx.arc(n.x * w, n.y * h, n.r, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(96,165,250,0.45)"
        ctx.fill()
      })
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = (a.x - b.x) * w
          const dy = (a.y - b.y) * h
          const d = Math.hypot(dx, dy)
          if (d < 90) {
            ctx.beginPath()
            ctx.moveTo(a.x * w, a.y * h)
            ctx.lineTo(b.x * w, b.y * h)
            ctx.strokeStyle = `rgba(147,197,253,${0.15 * (1 - d / 90)})`
            ctx.stroke()
          }
        }
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
    <section
      className="glass-card grid-glow relative overflow-hidden rounded-2xl p-6 md:p-8"
      aria-label="QuickLearn hero"
    >
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div className="relative z-10 grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
        <div>
          <p className="mb-2 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            <Zap className="h-3.5 w-3.5 text-primary" />
            AI micro-learning engine
          </p>
          <motion.h1
            className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            QuickLearn
          </motion.h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
            Master concepts in minutes with AI-powered micro learning.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button size="sm" className="gap-1.5">
              Continue Learning <ArrowRight className="h-3.5 w-3.5" />
            </Button>
            <Button size="sm" variant="outline" className="gap-1.5">
              <Compass className="h-3.5 w-3.5" /> Explore Topics
            </Button>
          </div>
        </div>

        <div className="relative mx-auto flex h-40 w-full max-w-xs items-center justify-center" aria-hidden>
          <motion.div
            className="absolute h-28 w-28 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 35% 30%, #fff, #60A5FA 45%, #1E3A8A 80%)",
              boxShadow: "0 0 40px rgba(59,130,246,0.45)",
            }}
            animate={reduce ? undefined : { scale: [1, 1.05, 1] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          />
          {["Impulse", "F=ma", "Δp"].map((label, i) => (
            <motion.div
              key={label}
              className="absolute rounded-lg border border-border/60 bg-card/70 px-2 py-1 text-[10px] font-medium text-foreground backdrop-blur-sm"
              style={{
                left: i === 0 ? "8%" : i === 1 ? "62%" : "40%",
                top: i === 0 ? "12%" : i === 1 ? "18%" : "72%",
              }}
              animate={reduce ? undefined : { y: [0, -5, 0] }}
              transition={{ duration: 2.6 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
            >
              {label}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
