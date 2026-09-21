"use client"

import { Sparkles } from "lucide-react"

interface FloatingAIButtonProps {
  onClick: () => void
}

export function FloatingAIButton({ onClick }: FloatingAIButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open AI reading assistant"
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-40 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary px-3 py-2.5 text-xs font-medium text-primary-foreground shadow-[0_12px_40px_rgba(59,130,246,0.35)] transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:bottom-6 sm:right-6 sm:px-4 sm:py-3 sm:text-sm"
    >
      <Sparkles className="h-4 w-4" />
      Ask Book AI
    </button>
  )
}
