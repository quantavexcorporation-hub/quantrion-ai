"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import { getAppOrigin } from "@/lib/supabase/auth"
import { AuthShell } from "@/components/auth/AuthShell"
import { AuthFormField } from "@/components/auth/auth-form-field"
import { Button } from "@/components/ui/button"

const schema = z.object({
  email: z.string().email("Enter a valid email"),
})

type Values = z.infer<typeof schema>

export default function ForgotPasswordPage() {
  const supabase = createClient()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema) })

  async function onSubmit(values: Values) {
    if (!supabase) {
      toast.error("Unable to send reset link right now.")
      return
    }
    const redirectTo = `${getAppOrigin()}/reset-password`
    const { error } = await supabase.auth.resetPasswordForEmail(values.email, { redirectTo })
    if (error) {
      toast.error(error.message)
      return
    }
    toast.success("Password reset link sent. Check your inbox.")
  }

  return (
    <AuthShell
      title="Forgot password"
      description="We will send a secure reset link to your email."
      footerText="Remembered your password?"
      footerLinkText="Back to login"
      footerHref="/login"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <AuthFormField
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          registration={register("email")}
          error={errors.email?.message}
        />
        <Button className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send reset link"}
        </Button>
      </form>
    </AuthShell>
  )
}
