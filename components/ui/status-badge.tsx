import { cn } from "@/lib/utils"

type StatusVariant = "active" | "processing" | "thinking" | "new" | "live" | "online" | "offline" | "updating"

interface StatusBadgeProps {
  variant: StatusVariant
  label?: string
  className?: string
}

const variantStyles: Record<StatusVariant, { dot: string; bg: string; text: string }> = {
  active: {
    dot: "bg-green-500",
    bg: "bg-green-500/10 border-green-500/20",
    text: "text-green-400",
  },
  processing: {
    dot: "bg-yellow-500",
    bg: "bg-yellow-500/10 border-yellow-500/20",
    text: "text-yellow-400",
  },
  thinking: {
    dot: "bg-purple-500",
    bg: "bg-purple-500/10 border-purple-500/20",
    text: "text-purple-400",
  },
  new: {
    dot: "bg-cyan-500",
    bg: "bg-cyan-500/10 border-cyan-500/20",
    text: "text-cyan-400",
  },
  live: {
    dot: "bg-green-500 animate-pulse",
    bg: "bg-green-500/10 border-green-500/20",
    text: "text-green-400",
  },
  online: {
    dot: "bg-green-500",
    bg: "bg-green-500/10 border-green-500/20",
    text: "text-green-400",
  },
  offline: {
    dot: "bg-red-500",
    bg: "bg-red-500/10 border-red-500/20",
    text: "text-red-400",
  },
  updating: {
    dot: "bg-yellow-500 animate-pulse",
    bg: "bg-yellow-500/10 border-yellow-500/20",
    text: "text-yellow-400",
  },
}

const defaultLabels: Record<StatusVariant, string> = {
  active: "ACTIVE",
  processing: "PROCESSING",
  thinking: "THINKING",
  new: "NEW",
  live: "LIVE",
  online: "Online",
  offline: "Offline",
  updating: "Updating",
}

export function StatusBadge({ variant, label, className }: StatusBadgeProps) {
  const styles = variantStyles[variant]
  const displayLabel = label ?? defaultLabels[variant]

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border",
        styles.bg,
        styles.text,
        className
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", styles.dot)} />
      {displayLabel}
    </span>
  )
}

export function StatusDot({ variant, className }: { variant: StatusVariant; className?: string }) {
  const styles = variantStyles[variant]
  return <span className={cn("w-2 h-2 rounded-full", styles.dot, className)} />
}
