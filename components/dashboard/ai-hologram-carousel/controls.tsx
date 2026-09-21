"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

interface CTAButtonProps {
  href: string
  label: string
  className?: string
}

export function CTAButton({ href, label, className }: CTAButtonProps) {
  const reduce = useReducedMotion()

  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:border-primary/50 hover:bg-primary/15",
        className
      )}
    >
      {label}
      <motion.span
        aria-hidden
        animate={reduce ? undefined : { x: [0, 3, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </motion.span>
    </Link>
  )
}

interface PromotionIndicatorProps {
  count: number
  active: number
  onSelect: (index: number) => void
}

export function PromotionIndicator({ count, active, onSelect }: PromotionIndicatorProps) {
  return (
    <div className="flex items-center gap-1.5" role="tablist" aria-label="Promotion slides">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={i === active}
          aria-label={`Go to slide ${i + 1}`}
          onClick={() => onSelect(i)}
          className={cn(
            "h-1 rounded-full transition-all duration-300",
            i === active
              ? "w-5 bg-primary"
              : "w-1.5 bg-muted-foreground/35 hover:bg-muted-foreground/55"
          )}
        />
      ))}
    </div>
  )
}
