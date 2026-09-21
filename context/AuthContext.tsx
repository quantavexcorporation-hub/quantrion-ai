"use client"

import { createContext, useContext, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import { getAuthCallbackUrl } from "@/lib/supabase/auth"
import { signInWithGoogle } from "@/lib/supabase/oauth"
import { validateLocalAuthCredentials } from "@/lib/local-auth"
import { useUser } from "@/context/SupabaseAuthProvider"
import { AuthModal, type AuthAudience, type AuthMode } from "@/components/AuthModal"
import { canAccessLectureCognis } from "@/lib/supabase/rbac"
import type { UserRole } from "@/lib/supabase/types"
import {
  clearPlatformRoleOverride,
  tryUnlockPlatformWithCode,
  writePlatformRoleOverride,
} from "@/lib/platform-access"

const PROFESSIONAL_DEST = "/lecture-cognis"

type LegacyAuthContextValue = {
  isAuthenticated: boolean
  isLoading: boolean
  openAuth: (mode?: AuthMode, nextPath?: string, audience?: AuthAudience) => void
  closeAuth: () => void
  logout: () => void
  requireAuth: (nextPath?: string, mode?: AuthMode, audience?: AuthAudience) => void
}

const LegacyAuthContext = createContext<LegacyAuthContextValue | null>(null)

async function fetchAccountRole(): Promise<UserRole | null> {
  try {
    const res = await fetch("/api/auth/session", { cache: "no-store" })
    if (!res.ok) return null
    const data = (await res.json()) as {
      authenticated?: boolean
      user?: { role?: UserRole } | null
    }
    if (!data.authenticated || !data.user?.role) return null
    return data.user.role
  } catch {
    return null
  }
}

/** Modal-based auth for in-app flows; uses Supabase when configured, else local demo session. */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const supabase = createClient()
  const { isAuthenticated, loading, refresh, signInLocally, signOutLocally } = useUser()
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<AuthMode>("login")
  const [audience, setAudience] = useState<AuthAudience>("learner")
  const [nextPath, setNextPath] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const value = useMemo<LegacyAuthContextValue>(
    () => ({
      isAuthenticated,
      isLoading: loading || submitting,
      openAuth: (m = "login", np, aud = "learner") => {
        setError(null)
        setMode(m)
        const wantsPro =
          aud === "professional" ||
          Boolean(np?.includes("lecture-cognis")) ||
          Boolean(np?.includes("mode=professional"))
        setAudience(wantsPro ? "professional" : "learner")
        setNextPath(np ?? null)
        setOpen(true)
      },
      closeAuth: () => {
        if (submitting) return
        setOpen(false)
        setError(null)
      },
      logout: () => {
        void (async () => {
          clearPlatformRoleOverride()
          if (supabase) {
            await supabase.auth.signOut()
            await fetch("/api/auth/logout", { method: "POST" })
          } else {
            signOutLocally()
          }
          await refresh()
          toast.success("Logged out")
          router.push("/")
          router.refresh()
        })()
      },
      requireAuth: (np = "/app/dashboard", m = "login", aud = "learner") => {
        if (isAuthenticated) {
          router.push(np)
          return
        }
        setError(null)
        setMode(m)
        setAudience(aud)
        setNextPath(np)
        setOpen(true)
      },
    }),
    [isAuthenticated, loading, refresh, router, signOutLocally, submitting, supabase],
  )

  async function resolveProfessionalDestination(forgeCode?: string): Promise<string | null> {
    if (forgeCode?.trim() && tryUnlockPlatformWithCode(forgeCode)) {
      return PROFESSIONAL_DEST
    }

    if (!supabase) {
      // Local/demo: professional login grants platform-operator access for LectureCognis.
      writePlatformRoleOverride("educator")
      return PROFESSIONAL_DEST
    }

    const role = await fetchAccountRole()
    if (canAccessLectureCognis(role)) return PROFESSIONAL_DEST

    setError("This account is not educator/admin. LectureCognis is for professionals only.")
    toast.error("Professional access denied — need educator or admin role.")
    return null
  }

  async function handleSubmit(payload: {
    name?: string
    email: string
    password: string
    audience: AuthAudience
    forgeCode?: string
  }) {
    setError(null)
    setSubmitting(true)
    const isProfessional = payload.audience === "professional" && mode === "login"

    try {
      const email = payload.email.trim()
      const password = payload.password
      const name = (payload.name ?? "").trim()

      if (!supabase) {
        const validationError = validateLocalAuthCredentials(
          email,
          password,
          mode === "signup" ? name : undefined,
        )
        if (validationError) {
          setError(validationError)
          return
        }

        await signInLocally({ email, name: mode === "signup" ? name : undefined })

        if (isProfessional) {
          const dest = await resolveProfessionalDestination(payload.forgeCode)
          if (!dest) return
          setOpen(false)
          toast.success("Welcome, professional")
          router.push(dest)
          return
        }

        setOpen(false)
        toast.success(mode === "signup" ? "Account ready!" : "Welcome back!")
        router.push(nextPath ?? "/app/dashboard")
        return
      }

      if (mode === "signup") {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { name },
            emailRedirectTo: getAuthCallbackUrl(nextPath ?? "/app/dashboard"),
          },
        })
        if (signUpError) {
          setError(signUpError.message)
          return
        }
        if (data.user && !data.session) {
          setOpen(false)
          router.push("/auth/check-email")
          return
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
        if (signInError) {
          setError(signInError.message)
          return
        }
      }

      await refresh()

      if (isProfessional) {
        const dest = await resolveProfessionalDestination(payload.forgeCode)
        if (!dest) return
        setOpen(false)
        toast.success("Welcome, professional")
        router.push(dest)
        router.refresh()
        return
      }

      setOpen(false)
      toast.success(mode === "signup" ? "Account ready!" : "Welcome back!")
      router.push(nextPath ?? "/app/dashboard")
      router.refresh()
    } finally {
      setSubmitting(false)
    }
  }

  async function handleGoogleSignIn() {
    if (!supabase) {
      setError("Connect Supabase in .env to enable Google sign-in.")
      return
    }
    setSubmitting(true)
    const dest =
      audience === "professional" ? PROFESSIONAL_DEST : (nextPath ?? "/app/dashboard")
    const { error: oauthError } = await signInWithGoogle(supabase, dest)
    if (oauthError) {
      setError(oauthError.message)
      setSubmitting(false)
    }
  }

  return (
    <LegacyAuthContext.Provider value={value}>
      {children}
      <AuthModal
        open={open}
        mode={mode}
        setMode={setMode}
        audience={audience}
        setAudience={setAudience}
        loading={submitting}
        error={error}
        onClose={() => value.closeAuth()}
        onSubmit={handleSubmit}
        enableGoogleSignIn={Boolean(supabase)}
        onGoogleSignIn={handleGoogleSignIn}
      />
    </LegacyAuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(LegacyAuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
