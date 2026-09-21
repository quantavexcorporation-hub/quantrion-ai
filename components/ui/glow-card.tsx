import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface GlowCardProps {
  children: ReactNode
  className?: string
  glowColor?: "cyan" | "purple" | "green" | "yellow" | "orange" | "none"
  hover?: boolean
}

const glowStyles = {
  cyan: "hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]",
  purple: "hover:border-purple-500/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]",
  green: "hover:border-green-500/30 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)]",
  yellow: "hover:border-yellow-500/30 hover:shadow-[0_0_20px_rgba(234,179,8,0.15)]",
  orange: "hover:border-orange-500/30 hover:shadow-[0_0_20px_rgba(249,115,22,0.15)]",
  none: "",
}

export function GlowCard({
  children,
  className,
  glowColor = "cyan",
  hover = true,
}: GlowCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl bg-card/80 backdrop-blur-sm border border-border/50",
        "transition-all duration-300",
        hover && glowStyles[glowColor],
        className
      )}
    >
      {children}
    </div>
  )
}

interface GlowIconProps {
  children: ReactNode
  className?: string
  color?: "cyan" | "purple" | "green" | "yellow" | "orange"
}

const iconColors = {
  cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  green: "bg-green-500/10 text-green-400 border-green-500/20",
  yellow: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  orange: "bg-orange-500/10 text-orange-400 border-orange-500/20",
}

export function GlowIcon({ children, className, color = "cyan" }: GlowIconProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center w-10 h-10 rounded-lg border",
        iconColors[color],
        className
      )}
    >
      {children}
    </div>
  )
}
