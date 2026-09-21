import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { isEmailVerified } from "@/lib/supabase/auth"
import { EmailVerificationBanner } from "@/components/auth/email-verification-banner"
import { LogoutButton } from "@/components/auth/LogoutButton"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { UserProfile } from "@/lib/supabase/types"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const supabase = await createClient()
  if (!supabase) {
    redirect("/app/dashboard")
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login?next=/dashboard")
  }

  const { data: profile } = await supabase
    .from("users")
    .select("id, email, name, role, plan, created_at")
    .eq("id", user.id)
    .single<UserProfile>()

  const showVerifyBanner = !isEmailVerified(user)

  return (
    <main className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Dashboard</h1>
            <p className="text-muted-foreground">Your secure Quantrion learning workspace.</p>
          </div>
          <LogoutButton />
        </div>

        {showVerifyBanner ? <EmailVerificationBanner /> : null}

        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Session secured with Supabase HTTP-only cookies.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase text-muted-foreground">Name</p>
              <p className="text-sm font-medium">{profile?.name || "Not set"}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-muted-foreground">Email</p>
              <p className="text-sm font-medium">{profile?.email || user.email}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-muted-foreground">Role</p>
              <Badge variant="secondary">{profile?.role || "student"}</Badge>
            </div>
            <div>
              <p className="text-xs uppercase text-muted-foreground">Plan</p>
              <Badge variant="outline">{profile?.plan || "free"}</Badge>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-3">
          <Button asChild variant="secondary">
            <Link href="/app/dashboard">Open app workspace</Link>
          </Button>
          {profile?.role === "admin" ? (
            <Button asChild variant="outline">
              <Link href="/admin">Admin panel</Link>
            </Button>
          ) : null}
        </div>
      </div>
    </main>
  )
}
