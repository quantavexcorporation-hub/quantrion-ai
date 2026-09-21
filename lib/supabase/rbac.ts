import type { UserRole } from "@/lib/supabase/types"

const ROLE_RANK: Record<UserRole, number> = {
  student: 1,
  educator: 2,
  admin: 3,
}

export function hasMinimumRole(role: UserRole | null | undefined, minimum: UserRole) {
  if (!role) return false
  return ROLE_RANK[role] >= ROLE_RANK[minimum]
}

export function isAdmin(role: UserRole | null | undefined) {
  return role === "admin"
}

export function canAccessAdmin(role: UserRole | null | undefined) {
  return isAdmin(role)
}

/** Platform tools (LectureCognis, etc.) — educators & admins only, not students. */
export function canAccessPlatformTools(role: UserRole | null | undefined) {
  return role === "educator" || role === "admin"
}

export function canAccessLectureCognis(role: UserRole | null | undefined) {
  return canAccessPlatformTools(role)
}
