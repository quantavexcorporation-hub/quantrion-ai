"use client"

import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PROVIDER_META, type OAuthProviderId } from "@/components/auth/provider-icons"
import { cn } from "@/lib/utils"

export type SocialProvider = OAuthProviderId

type SocialLoginButtonsProps = {
  loadingProvider: SocialProvider | null
  disabled?: boolean
  onGoogle: () => void
  onGithub: () => void
  onMicrosoft: () => void
  onApple: () => void
  className?: string
}

const SOCIAL_ACTIONS: Array<{
  id: SocialProvider
  actionKey: keyof Pick<SocialLoginButtonsProps, "onGoogle" | "onGithub" | "onMicrosoft" | "onApple">
  label: string
}> = [
  { id: "google", actionKey: "onGoogle", label: "Sign in with Google" },
  { id: "github", actionKey: "onGithub", label: "Sign in with GitHub" },
  { id: "azure", actionKey: "onMicrosoft", label: "Sign in with Microsoft" },
  { id: "apple", actionKey: "onApple", label: "Sign in with Apple" },
]

export function SocialLoginButtons({
  loadingProvider,
  disabled,
  onGoogle,
  onGithub,
  onMicrosoft,
  onApple,
  className,
}: SocialLoginButtonsProps) {
  const handlers = { onGoogle, onGithub, onMicrosoft, onApple }

  return (
    <div className={cn("grid gap-2.5 sm:grid-cols-2", className)}>
      {SOCIAL_ACTIONS.map(({ id, actionKey, label }) => {
        const { Icon } = PROVIDER_META[id]
        const isLoading = loadingProvider === id
        const isBusy = loadingProvider !== null

        return (
          <Button
            key={id}
            type="button"
            variant="outline"
            disabled={disabled || (isBusy && !isLoading)}
            onClick={handlers[actionKey]}
            className={cn(
              "h-11 border-white/10 bg-white/[0.03] transition-all duration-200",
              "hover:border-white/20 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-primary/5",
              "active:scale-[0.98]",
              isLoading && "border-primary/30",
            )}
            aria-busy={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
            ) : (
              <Icon className="mr-2 h-4 w-4 shrink-0" />
            )}
            <span className="truncate text-xs font-medium sm:text-sm">{label}</span>
          </Button>
        )
      })}
    </div>
  )
}
