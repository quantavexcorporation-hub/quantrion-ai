import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase/server"
import { canAccessLectureCognis } from "@/lib/supabase/rbac"
import type { UserProfile } from "@/lib/supabase/types"
import { getSupabaseEnv } from "@/lib/supabase/env"

export const PLATFORM_PRO_COOKIE = "quantrion_platform_pro"

/** Server gate for LectureCognis APIs — educators/admins, or local professional cookie. */
export async function assertLectureCognisAccess(): Promise<{ ok: true } | { ok: false; status: number; error: string }> {
  const env = getSupabaseEnv()

  if (env) {
    const supabase = await createClient()
    if (!supabase) {
      return { ok: false, status: 503, error: "Auth unavailable" }
    }
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return { ok: false, status: 401, error: "Sign in as a professional to use LectureCognis" }
    }
    const { data: me } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .maybeSingle<Pick<UserProfile, "role">>()
    if (!canAccessLectureCognis(me?.role)) {
      return { ok: false, status: 403, error: "LectureCognis is for educators and admins only" }
    }
    return { ok: true }
  }

  // Local / no Supabase: require professional cookie set by professional login.
  const jar = await cookies()
  if (jar.get(PLATFORM_PRO_COOKIE)?.value === "1") {
    return { ok: true }
  }
  return {
    ok: false,
    status: 403,
    error: "Professional access required. Sign in with Professional mode first.",
  }
}
