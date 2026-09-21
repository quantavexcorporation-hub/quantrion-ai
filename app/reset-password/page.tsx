"use client"

import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import { AuthShell } from "@/components/auth/AuthShell"
import { AuthFormField } from "@/components/auth/auth-form-field"
import { Button } from "@/components/ui/button"

const schema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  })

type Values = z.infer<typeof schema>

export default function ResetPasswordPage() {
  const supabase = createClient()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema) })

  async function onSubmit(values: Values) {
    if (!supabase) {
      toast.error("Unable to update password right now.")
      return
    }
    const { error } = await supabase.auth.updateUser({ password: values.password })
    if (error) {
      toast.error(error.message)
      return
    }
    toast.success("Password updated successfully.")
    router.push("/login")
    router.refresh()
  }

  return (
    <AuthShell
      title="Reset password"
      description="Set a new secure password for your account."
      footerText="Need to sign in instead?"
      footerLinkText="Go to login"
      footerHref="/login"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <AuthFormField
          id="password"
          label="New password"
          type="password"
          autoComplete="new-password"
          registration={register("password")}
          error={errors.password?.message}
        />
        <AuthFormField
          id="confirmPassword"
          label="Confirm password"
          type="password"
          autoComplete="new-password"
          registration={register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
        <Button className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update password"}
        </Button>
      </form>
    </AuthShell>
  )
}
