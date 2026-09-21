/** @deprecated Use Supabase session via useUser() — kept for legacy imports */
export type AuthUser = {
  name: string
  email: string
  isAuthenticated: true
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}
