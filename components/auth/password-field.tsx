"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type PasswordFieldProps = {
  id: string
  label: string
  error?: string
  autoComplete?: string
  registration?: object
  labelExtra?: React.ReactNode
  className?: string
}

export function PasswordField({
  id,
  label,
  error,
  autoComplete = "current-password",
  registration,
  labelExtra,
  className,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false)

  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={id} className="text-sm font-medium text-foreground/90">
          {label}
        </Label>
        {labelExtra}
      </div>
      <div className="relative">
        <Input
          id={id}
          type={visible ? "text" : "password"}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className="h-11 border-white/10 bg-white/[0.04] pr-11 transition-colors focus-visible:border-primary/50 focus-visible:ring-primary/30"
          {...(registration as object)}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0.5 top-1/2 h-9 w-9 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </div>
      {error ? (
        <p id={`${id}-error`} className="text-xs text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
