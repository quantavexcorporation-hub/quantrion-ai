"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Clapperboard, Loader2, Mail, Shield } from "lucide-react"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import { isEmailVerified } from "@/lib/supabase/auth"
import {
  signInWithApple,
  signInWithGithub,
  signInWithGoogle,
  signInWithMicrosoft,
  type OAuthProviderId,
} from "@/lib/supabase/oauth"
import { AuthPageLayout } from "@/components/auth/auth-page-layout"
import { PasswordField } from "@/components/auth/password-field"
import { SocialLoginButtons } from "@/components/auth/social-login-buttons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { canAccessLectureCognis } from "@/lib/supabase/rbac"
import type { UserRole } from "@/lib/supabase/types"
import {
  platformForgeKeyConfigured,
  tryUnlockPlatformWithCode,
} from "@/lib/platform-access"

const REMEMBER_EMAIL_KEY = "quantrion:remember-email"
const PROFESSIONAL_DEST = "/lecture-cognis"

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().optional(),
})

type LoginValues = z.infer<typeof loginSchema>

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

export function QuantrionLoginForm() {
  const supabase = createClient()
  const router = useRouter()
  const params = useSearchParams()
  const [oauthLoading, setOauthLoading] = useState<OAuthProviderId | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const [professional, setProfessional] = useState(
    () =>
      params.get("mode") === "professional" ||
      params.get("next")?.includes("lecture-cognis") === true,
  )
  const [forgeCode, setForgeCode] = useState("")

  const nextParam = params.get("next") || "/dashboard"
  const authError = params.get("error")
  const oauthNext = professional ? PROFESSIONAL_DEST : nextParam

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: true },
  })

  const remember = watch("remember")

  useEffect(() => {
    if (authError) toast.error(decodeURIComponent(authError))
  }, [authError])

  useEffect(() => {
    try {
      const saved = localStorage.getItem(REMEMBER_EMAIL_KEY)
      if (saved) {
        setValue("email", saved)
        setValue("remember", true)
      }
    } catch {
      // ignore
    }
  }, [setValue])

  async function resolveAfterLogin(): Promise<string> {
    if (!professional) return nextParam

    if (forgeCode.trim() && tryUnlockPlatformWithCode(forgeCode)) {
      toast.success("Professional access unlocked")
      return PROFESSIONAL_DEST
    }

    const role = await fetchAccountRole()
    if (canAccessLectureCognis(role)) {
      toast.success("Welcome, professional")
      return PROFESSIONAL_DEST
    }

    toast.error("This account is not educator/admin. LectureCognis is professionals only.")
    return "/lecture-cognis"
  }

  async function handleOAuth(
    provider: OAuthProviderId,
    action: () => ReturnType<typeof signInWithGoogle>,
  ) {
    if (!supabase) return
    setFormError(null)
    setOauthLoading(provider)
    const { error } = await action()
    if (error) {
      toast.error(error.message)
      setFormError(error.message)
      setOauthLoading(null)
    }
  }

  async function onSubmit(values: LoginValues) {
    if (!supabase) {
      setFormError("Sign-in is not configured. Connect Supabase to use professional login.")
      return
    }
    setFormError(null)

    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email.trim(),
      password: values.password,
    })

    if (error) {
      setFormError(error.message)
      toast.error(error.message)
      return
    }

    try {
      if (values.remember) {
        localStorage.setItem(REMEMBER_EMAIL_KEY, values.email.trim())
      } else {
        localStorage.removeItem(REMEMBER_EMAIL_KEY)
      }
    } catch {
      // ignore
    }

    if (data.user && !isEmailVerified(data.user)) {
      toast.message("Verify your email", {
        description: "Check your inbox for the confirmation link.",
      })
      router.push(`/auth/check-email?next=${encodeURIComponent(oauthNext)}`)
      router.refresh()
      return
    }

    const destination = await resolveAfterLogin()
    if (!professional) toast.success("Welcome back to Quantrion")
    router.push(destination)
    router.refresh()
  }

  const card = (
    <div
      className={cn(
        "auth-glass-card w-full max-w-md p-6 sm:p-8",
        "animate-in fade-in slide-in-from-bottom-4 duration-500",
      )}
    >
      <div className="mb-6 text-center lg:text-left">
        <p className="text-xs font-medium uppercase tracking-widest text-primary/90">Quantrion</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
          {professional ? "Professional sign in" : "Sign in"}
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          {professional
            ? "Platform operators — open LectureCognis after sign in"
            : "Continue your AI-powered learning journey"}
        </p>
      </div>

      <div
        className="mb-6 grid grid-cols-2 gap-1 rounded-xl border border-white/10 bg-white/[0.03] p-1"
        role="tablist"
        aria-label="Sign in mode"
      >
        <button
          type="button"
          role="tab"
          aria-selected={!professional}
          onClick={() => setProfessional(false)}
          className={cn(
            "rounded-lg px-3 py-2 text-xs font-medium transition",
            !professional
              ? "bg-primary/20 text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          Learner
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={professional}
          onClick={() => setProfessional(true)}
          className={cn(
            "inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition",
            professional
              ? "bg-cyan-400/15 text-cyan-100 shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <Shield className="h-3.5 w-3.5" />
          Professional
        </button>
      </div>

      {professional && (
        <div className="mb-5 rounded-lg border border-cyan-400/25 bg-cyan-400/5 px-3 py-2.5 text-left text-[12px] leading-relaxed text-muted-foreground">
          <div className="mb-1 flex items-center gap-1.5 font-medium text-cyan-200">
            <Clapperboard className="h-3.5 w-3.5" />
            Platform · LectureCognis
          </div>
          Use an <span className="text-foreground">educator</span> or{" "}
          <span className="text-foreground">admin</span> account. After sign in you&apos;ll go to
          LectureCognis.
        </div>
      )}

      <SocialLoginButtons
        loadingProvider={oauthLoading}
        disabled={isSubmitting}
        onGoogle={() => handleOAuth("google", () => signInWithGoogle(supabase!, oauthNext))}
        onGithub={() => handleOAuth("github", () => signInWithGithub(supabase!, oauthNext))}
        onMicrosoft={() => handleOAuth("azure", () => signInWithMicrosoft(supabase!, oauthNext))}
        onApple={() => handleOAuth("apple", () => signInWithApple(supabase!, oauthNext))}
      />

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center" aria-hidden>
          <span className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center text-xs uppercase tracking-wide">
          <span className="bg-transparent px-3 text-muted-foreground">or continue with email</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {formError ? (
          <div
            className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
            role="alert"
          >
            {formError}
          </div>
        ) : null}

        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-sm font-medium text-foreground/90">
            Email
          </Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder={professional ? "you@quantrion.team" : "you@school.edu"}
              aria-invalid={Boolean(errors.email)}
              className="h-11 border-white/10 bg-white/[0.04] pl-10 transition-colors focus-visible:border-primary/50 focus-visible:ring-primary/30"
              {...register("email")}
            />
          </div>
          {errors.email ? (
            <p className="text-xs text-destructive" role="alert">
              {errors.email.message}
            </p>
          ) : null}
        </div>

        <PasswordField
          id="password"
          label="Password"
          autoComplete="current-password"
          registration={register("password")}
          error={errors.password?.message}
          labelExtra={
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-primary transition-colors hover:text-primary/80 hover:underline"
            >
              Forgot password?
            </Link>
          }
        />

        {professional && platformForgeKeyConfigured() && (
          <div className="space-y-1.5">
            <Label htmlFor="forge-code" className="text-sm font-medium text-foreground/90">
              Professional access code <span className="text-muted-foreground">(optional)</span>
            </Label>
            <Input
              id="forge-code"
              type="password"
              value={forgeCode}
              onChange={(e) => setForgeCode(e.target.value)}
              placeholder="Platform operator code"
              className="h-11 border-white/10 bg-white/[0.04]"
              autoComplete="off"
            />
          </div>
        )}

        <div className="flex items-center gap-2">
          <Checkbox
            id="remember"
            checked={remember}
            onCheckedChange={(checked) => setValue("remember", checked === true)}
            aria-describedby="remember-desc"
          />
          <Label
            htmlFor="remember"
            id="remember-desc"
            className="cursor-pointer text-sm font-normal text-muted-foreground"
          >
            Remember me
          </Label>
        </div>

        <Button
          type="submit"
          className={cn(
            "h-11 w-full font-medium shadow-lg transition-all active:scale-[0.99]",
            professional
              ? "bg-cyan-500 text-slate-950 shadow-cyan-500/20 hover:bg-cyan-400"
              : "bg-primary shadow-primary/20 hover:bg-primary/90",
          )}
          disabled={isSubmitting || oauthLoading !== null}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
              Signing in...
            </>
          ) : professional ? (
            "Sign in to LectureCognis"
          ) : (
            "Sign in"
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {professional ? (
          <>
            Not a platform operator?{" "}
            <button
              type="button"
              onClick={() => setProfessional(false)}
              className="font-medium text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline"
            >
              Learner sign in
            </button>
          </>
        ) : (
          <>
            New to Quantrion?{" "}
            <Link
              href="/signup"
              className="font-medium text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline"
            >
              Create an account
            </Link>
            <span className="mt-2 block text-xs">
              Platform professional?{" "}
              <button
                type="button"
                onClick={() => setProfessional(true)}
                className="font-medium text-cyan-300 underline-offset-2 hover:underline"
              >
                Sign in here
              </button>
            </span>
          </>
        )}
      </p>
    </div>
  )

  return <AuthPageLayout>{card}</AuthPageLayout>
}
