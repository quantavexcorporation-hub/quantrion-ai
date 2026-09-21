/** Shared with web `lib/supabase/types.ts` — keep in sync. */
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

export type DownloadKind = "video" | "book" | "notes" | "quiz"

export type DownloadItem = {
  id: string
  title: string
  kind: DownloadKind
  uri: string
  sizeBytes: number
  progress: number
  createdAt: string
  synced: boolean
}
