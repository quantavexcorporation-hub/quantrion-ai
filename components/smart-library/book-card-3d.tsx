"use client"

import { useRef, useState, type MouseEvent } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import type { LibraryBook } from "./data"

interface BookCard3DProps {
  book: LibraryBook
  index: number
  onOpen: (book: LibraryBook) => void
}

export function BookCard3D({ book, index, onOpen }: BookCard3DProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const [hovered, setHovered] = useState(false)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 220, damping: 22 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 220, damping: 22 })

  function onMove(e: MouseEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <motion.button
      ref={ref}
      type="button"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, type: "spring", stiffness: 160, damping: 18 }}
      style={{
        rotateX: hovered ? rotateX : 0,
        rotateY: hovered ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ y: -10, scale: 1.02 }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false)
        mx.set(0)
        my.set(0)
      }}
      onClick={() => onOpen(book)}
      className="group relative w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={`Open ${book.title}`}
    >
      <div
        className="relative mx-auto h-56 w-36 rounded-r-md rounded-l-sm shadow-[0_18px_40px_rgba(0,0,0,0.45)] transition-shadow group-hover:shadow-[0_28px_55px_rgba(59,130,246,0.25)]"
        style={{
          background: `linear-gradient(145deg, ${book.coverFrom}, ${book.coverTo})`,
          transform: "translateZ(20px)",
        }}
      >
        <div
          className="absolute inset-y-0 left-0 w-2.5 rounded-l-sm"
          style={{ background: book.spine }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.18),transparent_42%)]" />
        <div className="flex h-full flex-col justify-between p-4 pl-5">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-white/70">{book.subject}</p>
            <p className="mt-2 text-sm font-semibold leading-snug text-white">{book.title}</p>
          </div>
          <p className="text-[10px] text-white/75">{book.chapters} chapters</p>
        </div>
      </div>

      <div
        className={`mt-3 space-y-1 transition-opacity ${hovered ? "opacity-100" : "opacity-80"}`}
      >
        <p className="text-sm font-medium text-foreground">{book.title}</p>
        <p className="text-xs text-muted-foreground">{book.subtitle}</p>
        <div className="flex flex-wrap gap-1.5 pt-1 text-[10px] text-muted-foreground">
          <span className="rounded-md bg-secondary/60 px-1.5 py-0.5">{book.completion}% done</span>
          <span className="rounded-md bg-secondary/60 px-1.5 py-0.5">{book.retention}% retain</span>
          <span className="rounded-md bg-secondary/60 px-1.5 py-0.5">{book.lastOpened}</span>
          <span className="rounded-md bg-primary/15 px-1.5 py-0.5 text-primary">{book.studyTime}</span>
        </div>
      </div>
    </motion.button>
  )
}
