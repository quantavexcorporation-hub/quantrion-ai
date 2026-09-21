import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { canAccessLectureCognis } from "@/lib/supabase/rbac"
import type { UserProfile } from "@/lib/supabase/types"
import { LectureCognisExperience } from "@/components/lecture-cognis/lecture-cognis-experience"
import { LectureCognisGate } from "@/components/lecture-cognis/lecture-cognis-gate"

export const dynamic = "force-dynamic"

export default async function LectureCognisPage() {
  const supabase = await createClient()

  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      redirect("/login?next=/lecture-cognis")
    }

    const { data: me } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single<UserProfile>()

    if (!canAccessLectureCognis(me?.role)) {
      return <LectureCognisGate />
    }

    return <LectureCognisExperience />
  }

  return <LectureCognisGate />
}
