export type UserRole = "student" | "educator" | "admin"
export type UserPlan = "free" | "pro" | "elite"

export type UserProfile = {
  id: string
  email: string
  name: string | null
  role: UserRole
  plan: UserPlan
  created_at: string
}
