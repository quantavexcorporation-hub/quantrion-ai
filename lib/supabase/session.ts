import type { SupabaseClient, User } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/server"
import type { UserProfile } from "@/lib/supabase/types"

export type AuthenticatedContext = {
  supabase: SupabaseClient
  user: User
  profile: UserProfile | null
}

export async function getAuthenticatedContext(): Promise<AuthenticatedContext | null> {
  const supabase = await createClient()
  if (!supabase) return null

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) return null

  const { data: profile } = await supabase
    .from("users")
    .select("id, email, name, role, plan, created_at")
    .eq("id", user.id)
    .maybeSingle<UserProfile>()

  return { supabase, user, profile }
}

export function profileFromAuthUser(user: User): UserProfile {
  return {
    id: user.id,
    email: user.email ?? "",
    name: (user.user_metadata?.name as string | undefined) ?? null,
    role: "student",
    plan: "free",
    created_at: user.created_at,
  }
}
