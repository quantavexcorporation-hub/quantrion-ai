import type { UserRole } from "@/lib/supabase/types"
import { canAccessLectureCognis } from "@/lib/supabase/rbac"

export const PLATFORM_ROLE_KEY = "quantrion_platform_role"

export function readPlatformRoleOverride(): UserRole | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(PLATFORM_ROLE_KEY)
    if (raw === "educator" || raw === "admin") return raw
    return null
  } catch {
    return null
  }
}

export function writePlatformRoleOverride(role: "educator" | "admin") {
  if (typeof window === "undefined") return
  window.localStorage.setItem(PLATFORM_ROLE_KEY, role)
  // Cookie so LectureCognis API can authorize local professional sessions.
  document.cookie = `quantrion_platform_pro=1; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`
}

export function clearPlatformRoleOverride() {
  if (typeof window === "undefined") return
  window.localStorage.removeItem(PLATFORM_ROLE_KEY)
  document.cookie = "quantrion_platform_pro=; path=/; max-age=0; SameSite=Lax"
}

/** Effective role for platform tools: DB role, or local professional override. */
export function effectivePlatformRole(profileRole: UserRole | null | undefined): UserRole | null {
  const override = readPlatformRoleOverride()
  if (override && canAccessLectureCognis(override)) return override
  return profileRole ?? null
}

export function tryUnlockPlatformWithCode(code: string): boolean {
  const expected = process.env.NEXT_PUBLIC_PLATFORM_FORGE_KEY?.trim()
  if (!expected) return false
  if (code.trim() !== expected) return false
  writePlatformRoleOverride("educator")
  return true
}

export function platformForgeKeyConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_PLATFORM_FORGE_KEY?.trim())
}
