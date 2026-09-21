"use client"

import { cn } from "@/lib/utils"

type Props<T extends string> = {
  value: T
  options: readonly { value: T; label: string }[]
  onChange: (value: T) => void
}

export function ToggleSwitch<T extends string>({ value, options, onChange }: Props<T>) {
  return (
    <div className="inline-flex rounded-2xl border border-white/10 bg-white/[0.03] p-1 backdrop-blur-xl">
      {options.map((opt) => {
        const active = opt.value === value
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "relative rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-200",
              active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {active && (
              <span
                className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 ring-1 ring-white/10"
                aria-hidden="true"
              />
            )}
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}

