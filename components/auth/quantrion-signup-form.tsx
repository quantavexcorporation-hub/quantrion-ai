"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Mail, User } from "lucide-react"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import { getAuthCallbackUrl } from "@/lib/supabase/auth"
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
import { cn } from "@/lib/utils"

const signupSchema = z.object({
  name: z.string().min(2, "Name should be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

type SignupValues = z.infer<typeof signupSchema>

export function QuantrionSignupForm() {
  const supabase = createClient()
  const router = useRouter()
  const [oauthLoading, setOauthLoading] = useState<OAuthProviderId | null>(null)
  const [formError, setFormError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>({ resolver: zodResolver(signupSchema) })

  async function handleOAuth(provider: OAuthProviderId, action: () => ReturnType<typeof signInWithGoogle>) {
    if (!supabase) return
    setOauthLoading(provider)
    const { error } = await action()
    if (error) {
      toast.error(error.message)
      setFormError(error.message)
      setOauthLoading(null)
    }
  }

  async function onSubmit(values: SignupValues) {
    if (!supabase) return
    setFormError(null)

    const { data, error } = await supabase.auth.signUp({
      email: values.email.trim(),
      password: values.password,
      options: {
        data: { name: values.name.trim() },
        emailRedirectTo: getAuthCallbackUrl("/dashboard"),
      },
    })

    if (error) {
      setFormError(error.message)
      toast.error(error.message)
      return
    }

    if (data.user && !data.session) {
      toast.success("Check your email to verify your account")
      router.push("/auth/check-email")
      return
    }

    toast.success("Welcome to Quantrion!")
    router.push("/dashboard")
    router.refresh()
  }

  const card = (
    <div
      className={cn(
        "auth-glass-card w-full max-w-md p-6 sm:p-8",
        "animate-in fade-in slide-in-from-bottom-4 duration-500",
      )}
    >
      <div className="mb-8 text-center lg:text-left">
        <p className="text-xs font-medium uppercase tracking-widest text-primary/90">Quantrion</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">Create account</h2>
        <p className="mt-1.5 text-sm text-muted-foreground">Start your AI-powered exam prep today</p>
      </div>

      <SocialLoginButtons
        loadingProvider={oauthLoading}
        disabled={isSubmitting}
        onGoogle={() => handleOAuth("google", () => signInWithGoogle(supabase!, "/dashboard"))}
        onGithub={() => handleOAuth("github", () => signInWithGithub(supabase!, "/dashboard"))}
        onMicrosoft={() => handleOAuth("azure", () => signInWithMicrosoft(supabase!, "/dashboard"))}
        onApple={() => handleOAuth("apple", () => signInWithApple(supabase!, "/dashboard"))}
      />

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center" aria-hidden>
          <span className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center text-xs uppercase tracking-wide">
          <span className="bg-transparent px-3 text-muted-foreground">or sign up with email</span>
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
          <Label htmlFor="name">Full name</Label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="name"
              autoComplete="name"
              className="h-11 border-white/10 bg-white/[0.04] pl-10"
              {...register("name")}
            />
          </div>
          {errors.name ? <p className="text-xs text-destructive">{errors.name.message}</p> : null}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              autoComplete="email"
              className="h-11 border-white/10 bg-white/[0.04] pl-10"
              {...register("email")}
            />
          </div>
          {errors.email ? <p className="text-xs text-destructive">{errors.email.message}</p> : null}
        </div>

        <PasswordField
          id="password"
          label="Password"
          autoComplete="new-password"
          registration={register("password")}
          error={errors.password?.message}
        />

        <Button type="submit" className="h-11 w-full" disabled={isSubmitting || oauthLoading !== null}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            "Create account"
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )

  return (
    <AuthPageLayout
      headline="Adaptive practice & intelligent insights"
      subheadline="Join thousands of learners using Quantrion to master exams faster."
    >
      {card}
    </AuthPageLayout>
  )
}
