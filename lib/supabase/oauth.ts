import type { AuthError, SupabaseClient } from "@supabase/supabase-js"
import { getAuthCallbackUrl } from "@/lib/supabase/auth"

export type OAuthProviderId = "google" | "github" | "azure" | "apple"

type OAuthResult = Promise<{ error: AuthError | null }>

/**
 * Shared Supabase OAuth sign-in. Enable each provider in Supabase Dashboard → Authentication → Providers.
 */
async function signInWithProvider(
  supabase: SupabaseClient,
  provider: OAuthProviderId,
  nextPath = "/dashboard",
): OAuthResult {
  const options: Parameters<SupabaseClient["auth"]["signInWithOAuth"]>[0]["options"] = {
    redirectTo: getAuthCallbackUrl(nextPath),
  }

  if (provider === "azure") {
    options.queryParams = { prompt: "select_account" }
  }

  const { error } = await supabase.auth.signInWithOAuth({ provider, options })
  return { error }
}

export function signInWithGoogle(supabase: SupabaseClient, nextPath?: string): OAuthResult {
  return signInWithProvider(supabase, "google", nextPath)
}

export function signInWithGithub(supabase: SupabaseClient, nextPath?: string): OAuthResult {
  return signInWithProvider(supabase, "github", nextPath)
}

export function signInWithMicrosoft(supabase: SupabaseClient, nextPath?: string): OAuthResult {
  return signInWithProvider(supabase, "azure", nextPath)
}

export function signInWithApple(supabase: SupabaseClient, nextPath?: string): OAuthResult {
  return signInWithProvider(supabase, "apple", nextPath)
}
