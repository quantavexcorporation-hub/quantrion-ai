"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { X, Mail, Lock, User, Chrome, Shield, Clapperboard } from "lucide-react"
import { cn } from "@/lib/utils"
import { platformForgeKeyConfigured } from "@/lib/platform-access"

export type AuthMode = "login" | "signup"
export type AuthAudience = "learner" | "professional"

type Props = {
  open: boolean
  mode: AuthMode
  setMode: (mode: AuthMode) => void
  audience: AuthAudience
  setAudience: (audience: AuthAudience) => void
  loading?: boolean
  error?: string | null
  onClose: () => void
  onSubmit: (payload: {
    name?: string
    email: string
    password: string
    audience: AuthAudience
    forgeCode?: string
  }) => void | Promise<void>
  enableGoogleSignIn?: boolean
  onGoogleSignIn?: () => void
}

function TabButton({
  active,
  children,
  onClick,
}: {
  active: boolean
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full rounded-xl px-3 py-2 text-xs font-medium transition-colors",
        active ? "bg-white/[0.06] text-foreground" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  )
}

export function AuthModal({
  open,
  mode,
  setMode,
  audience,
  setAudience,
  onClose,
  onSubmit,
  loading,
  error,
  enableGoogleSignIn = false,
  onGoogleSignIn,
}: Props) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [forgeCode, setForgeCode] = useState("")
  const emailRef = useRef<HTMLInputElement | null>(null)
  const professional = audience === "professional" && mode === "login"

  useEffect(() => {
    if (!open) return
    window.setTimeout(() => emailRef.current?.focus(), 0)
  }, [open, mode])

  useEffect(() => {
    if (!open) {
      setPassword("")
      setForgeCode("")
    }
  }, [open])

  useEffect(() => {
    if (mode === "signup") setAudience("learner")
  }, [mode, setAudience])

  const canSubmit = useMemo(() => {
    if (loading) return false
    if (!email.trim() || !password.trim()) return false
    if (mode === "signup" && !name.trim()) return false
    return true
  }, [email, loading, mode, name, password])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center overflow-y-auto bg-[#0B0F1A]/45 p-0 backdrop-blur-[2px] sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={mode === "login" ? "Login" : "Signup"}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="glass-card grid-glow w-full max-w-md origin-center rounded-t-2xl p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-[0_0_0_1px_rgba(59,130,246,0.08),0_30px_90px_rgba(0,0,0,0.55)] animate-in fade-in zoom-in-95 duration-200 sm:rounded-2xl sm:pb-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold tracking-tight text-foreground">
              {professional ? "Professional sign in" : "Welcome to Quantrion"}
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              {professional
                ? "Platform operators — open LectureCognis after sign in."
                : "Sign in to continue your AI workspace."}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg border border-white/10 bg-white/[0.02] p-2 text-muted-foreground transition-colors hover:text-foreground"
            disabled={loading}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-white/[0.02] p-1">
          <TabButton active={mode === "login"} onClick={() => setMode("login")}>
            Login
          </TabButton>
          <TabButton active={mode === "signup"} onClick={() => setMode("signup")}>
            Signup
          </TabButton>
        </div>

        {mode === "login" && (
          <div
            className="mt-3 grid grid-cols-2 gap-1 rounded-xl border border-white/10 bg-white/[0.02] p-1"
            role="tablist"
            aria-label="Account type"
          >
            <button
              type="button"
              role="tab"
              aria-selected={!professional}
              onClick={() => setAudience("learner")}
              className={cn(
                "rounded-lg px-3 py-2 text-xs font-medium transition",
                !professional
                  ? "bg-white/[0.06] text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Learner
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={professional}
              onClick={() => setAudience("professional")}
              className={cn(
                "inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition",
                professional
                  ? "bg-cyan-400/15 text-cyan-100"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Shield className="h-3.5 w-3.5" />
              Professional
            </button>
          </div>
        )}

        {professional && (
          <div className="mt-3 rounded-xl border border-cyan-400/25 bg-cyan-400/5 px-3 py-2.5 text-[11px] leading-relaxed text-muted-foreground">
            <div className="mb-1 flex items-center gap-1.5 font-medium text-cyan-200">
              <Clapperboard className="h-3.5 w-3.5" />
              Platform · LectureCognis
            </div>
            For educators &amp; admins. After login you’ll open the AI video machine.
          </div>
        )}

        <form
          className="mt-4 space-y-3"
          onSubmit={(e) => {
            e.preventDefault()
            if (!canSubmit) return
            void onSubmit({
              name,
              email,
              password,
              audience,
              forgeCode: professional ? forgeCode : undefined,
            })
          }}
        >
          {mode === "signup" && (
            <label className="block">
              <span className="sr-only">Name</span>
              <div className="relative">
                <User
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-10 pr-3 text-sm text-foreground backdrop-blur-xl transition-all placeholder:text-muted-foreground focus:border-blue-400/40 focus:outline-none focus:shadow-[0_0_0_4px_rgba(59,130,246,0.12)]"
                />
              </div>
            </label>
          )}

          <label className="block">
            <span className="sr-only">Email</span>
            <div className="relative">
              <Mail
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                ref={emailRef}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={professional ? "you@quantrion.team" : "Email"}
                inputMode="email"
                autoComplete="email"
                className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-10 pr-3 text-sm text-foreground backdrop-blur-xl transition-all placeholder:text-muted-foreground focus:border-blue-400/40 focus:outline-none focus:shadow-[0_0_0_4px_rgba(59,130,246,0.12)]"
              />
            </div>
          </label>

          <label className="block">
            <span className="sr-only">Password</span>
            <div className="relative">
              <Lock
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-10 pr-3 text-sm text-foreground backdrop-blur-xl transition-all placeholder:text-muted-foreground focus:border-blue-400/40 focus:outline-none focus:shadow-[0_0_0_4px_rgba(59,130,246,0.12)]"
              />
            </div>
          </label>

          {professional && platformForgeKeyConfigured() && (
            <label className="block">
              <span className="mb-1.5 block text-[11px] text-muted-foreground">
                Professional access code (optional)
              </span>
              <input
                value={forgeCode}
                onChange={(e) => setForgeCode(e.target.value)}
                placeholder="Platform operator code"
                type="password"
                autoComplete="off"
                className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 text-sm text-foreground backdrop-blur-xl transition-all placeholder:text-muted-foreground focus:border-cyan-400/40 focus:outline-none"
              />
            </label>
          )}

          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={!canSubmit}
            className={cn(
              "mt-1 inline-flex h-11 w-full items-center justify-center rounded-xl px-4 text-sm font-semibold text-white transition-all",
              "disabled:cursor-not-allowed disabled:opacity-60",
              professional
                ? "bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-[0_0_0_1px_rgba(34,211,238,0.25),0_18px_40px_rgba(34,211,238,0.12)]"
                : "bg-blue-500 hover:bg-blue-400 shadow-[0_0_0_1px_rgba(59,130,246,0.20),0_18px_40px_rgba(59,130,246,0.12)]",
            )}
          >
            {loading
              ? mode === "login"
                ? "Signing in..."
                : "Creating account..."
              : professional
                ? "Sign in to LectureCognis"
                : mode === "login"
                  ? "Login"
                  : "Signup"}
          </button>

          <div className="relative py-1">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-transparent px-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                or
              </span>
            </div>
          </div>

          {enableGoogleSignIn && onGoogleSignIn && (
            <button
              type="button"
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-4 text-sm font-medium text-foreground transition-colors hover:bg-white/[0.04]"
              onClick={onGoogleSignIn}
              disabled={loading}
            >
              <Chrome className="h-4 w-4 text-muted-foreground" />
              Continue with Google
            </button>
          )}
        </form>
      </div>
    </div>
  )
}
