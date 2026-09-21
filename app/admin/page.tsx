import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { canAccessAdmin } from "@/lib/supabase/rbac"
import { LogoutButton } from "@/components/auth/LogoutButton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { UserProfile } from "@/lib/supabase/types"

export const dynamic = "force-dynamic"

export default async function AdminPage() {
  const supabase = await createClient()
  if (!supabase) {
    redirect("/app/dashboard")
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login?next=/admin")
  }

  const { data: me } = await supabase.from("users").select("*").eq("id", user.id).single<UserProfile>()
  if (!canAccessAdmin(me?.role)) {
    redirect("/dashboard")
  }

  const { data: users } = await supabase
    .from("users")
    .select("id, email, name, role, plan, created_at")
    .order("created_at", { ascending: false })
    .limit(25)

  return (
    <main className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Admin</h1>
            <p className="text-muted-foreground">Role-protected admin area (RBAC).</p>
          </div>
          <LogoutButton />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent users</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {users?.length ? (
              users.map((profile) => (
                <div key={profile.id} className="rounded-md border p-3">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-medium">{profile.name || "Unnamed user"}</p>
                      <p className="text-xs text-muted-foreground">{profile.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{profile.role}</Badge>
                      <Badge variant="outline">{profile.plan}</Badge>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No users found.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
