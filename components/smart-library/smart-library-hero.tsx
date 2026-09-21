"use client"

import { useEffect, useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"

export function SmartLibraryHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf = 0
    let w = 0
    let h = 0
    const nodes = Array.from({ length: 28 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 1 + Math.random() * 2.2,
      vx: (Math.random() - 0.5) * 0.00035,
      vy: (Math.random() - 0.5) * 0.00035,
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
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > 1) n.vx *= -1
        if (n.y < 0 || n.y > 1) n.vy *= -1
        ctx.beginPath()
        ctx.fillStyle = "rgba(59,130,246,0.35)"
        ctx.arc(n.x * w, n.y * h, n.r, 0, Math.PI * 2)
        ctx.fill()
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = (a.x - b.x) * w
          const dy = (a.y - b.y) * h
          const dist = Math.hypot(dx, dy)
          if (dist < 120) {
            ctx.strokeStyle = `rgba(56,189,248,${0.12 * (1 - dist / 120)})`
            ctx.beginPath()
            ctx.moveTo(a.x * w, a.y * h)
            ctx.lineTo(b.x * w, b.y * h)
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
  }, [reduceMotion])

  return (
    <section className="glass-card grid-glow relative mb-8 overflow-hidden rounded-2xl p-6 md:p-10">
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 opacity-70"
        aria-hidden
      />
      <div className="relative z-10 max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground"
        >
          Quantrion · Living knowledge
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="mt-3 text-4xl font-semibold tracking-tight text-foreground md:text-5xl"
        >
          Smart Library
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base"
        >
          The world&apos;s first AI-powered interactive knowledge library where every book can explain,
          visualize, test, and teach itself — an Intelligence Book, not a PDF.
        </motion.p>
      </div>
    </section>
  )
}
