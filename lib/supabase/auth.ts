import type { User } from "@supabase/supabase-js"

export function getAppOrigin() {
  return process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ?? "http://localhost:3000"
}

export function getAuthCallbackUrl(nextPath = "/dashboard") {
  const origin = typeof window !== "undefined" ? window.location.origin : getAppOrigin()
  return `${origin}/auth/callback?next=${encodeURIComponent(nextPath)}`
}

export function isEmailVerified(user: User | null) {
  if (!user) return false
  // OAuth providers (e.g. Google) confirm email at sign-in
  if (user.app_metadata?.provider && user.app_metadata.provider !== "email") return true
  return Boolean(user.email_confirmed_at)
}
