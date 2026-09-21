"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import { useUser } from "@/context/SupabaseAuthProvider"
import { Button } from "@/components/ui/button"

export function LogoutButton() {
  const router = useRouter()
  const supabase = createClient()
  const { refresh, signOutLocally } = useUser()

  async function onLogout() {
    if (supabase) {
      await supabase.auth.signOut()
      await fetch("/api/auth/logout", { method: "POST" })
    } else {
      signOutLocally()
    }
    await refresh()
    toast.success("Logged out")
    router.push("/")
    router.refresh()
  }

  return (
    <Button variant="outline" onClick={onLogout}>
      Log out
    </Button>
  )
}
