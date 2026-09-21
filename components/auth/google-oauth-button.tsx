"use client"

import { Chrome } from "lucide-react"
import { Button } from "@/components/ui/button"

type GoogleOAuthButtonProps = {
  loading?: boolean
  disabled?: boolean
  onClick: () => void
  label?: string
}

export function GoogleOAuthButton({
  loading = false,
  disabled = false,
  onClick,
  label = "Continue with Google",
}: GoogleOAuthButtonProps) {
  return (
    <Button type="button" variant="outline" className="w-full" onClick={onClick} disabled={disabled || loading}>
      <Chrome className="mr-2 h-4 w-4" />
      {loading ? "Redirecting..." : label}
    </Button>
  )
}
