"use client"

import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface FloatingAIButtonProps {
  onClick: () => void
  className?: string
}

export function FloatingAIButton({ onClick, className }: FloatingAIButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open AI assistant"
      className={cn(
        "fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-[0_12px_40px_rgba(59,130,246,0.35)] transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
    >
      <Sparkles className="h-4 w-4" />
      Ask AI
    </button>
  )
}
