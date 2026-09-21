"use client"

import Link from "next/link"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import { getAuthCallbackUrl } from "@/lib/supabase/auth"
import { AuthShell } from "@/components/auth/AuthShell"
import { Button } from "@/components/ui/button"
import { useUser } from "@/context/SupabaseAuthProvider"

export default function CheckEmailPage() {
  const supabase = createClient()
  const params = useSearchParams()
  const { user, emailVerified } = useUser()
  const [sending, setSending] = useState(false)
  const next = params.get("next") || "/dashboard"

  if (emailVerified) {
    return (
      <AuthShell
        title="Email verified"
        description="Your account is ready."
        footerText="Continue to"
        footerLinkText="Dashboard"
        footerHref="/dashboard"
      >
        <Button asChild className="w-full">
          <Link href={next}>Go to dashboard</Link>
        </Button>
      </AuthShell>
    )
  }

  async function resendVerification() {
    if (!supabase) {
      toast.error("Unable to resend verification right now.")
      return
    }
    if (!user?.email) {
      toast.error("Sign in again to resend verification.")
      return
    }
    setSending(true)
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: user.email,
      options: { emailRedirectTo: getAuthCallbackUrl(next) },
    })
    setSending(false)
    if (error) toast.error(error.message)
    else toast.success("Verification email sent.")
  }

  return (
    <AuthShell
      title="Check your email"
      description="We sent a verification link. Click it to activate your Quantrion account."
      footerText="Wrong address?"
      footerLinkText="Sign up again"
      footerHref="/signup"
    >
      <p className="text-sm text-muted-foreground">
        {user?.email ? (
          <>
            Sent to <span className="font-medium text-foreground">{user.email}</span>
          </>
        ) : (
          "Open the link in your inbox, then return here."
        )}
      </p>
      <Button className="w-full" onClick={resendVerification} disabled={sending || !user?.email}>
        {sending ? "Sending..." : "Resend verification email"}
      </Button>
      <Button asChild variant="outline" className="w-full">
        <Link href="/login">Back to login</Link>
      </Button>
    </AuthShell>
  )
}
