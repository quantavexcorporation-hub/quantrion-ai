"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { Shield } from "lucide-react"
import { ShellLayout } from "@/components/layout/shell-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useUser } from "@/hooks/use-user"
import { canAccessLectureCognis } from "@/lib/supabase/rbac"
import {
  effectivePlatformRole,
  platformForgeKeyConfigured,
  tryUnlockPlatformWithCode,
} from "@/lib/platform-access"
import { LectureCognisExperience } from "./lecture-cognis-experience"

/** Client-side professional gate when Supabase server auth is not configured. */
export function LectureCognisGate() {
  const { profile, loading, isAuthenticated } = useUser()
  const [roleTick, setRoleTick] = useState(0)
  const [code, setCode] = useState("")
  const [error, setError] = useState<string | null>(null)

  const role = effectivePlatformRole(profile?.role)
  const allowed = canAccessLectureCognis(role)

  useEffect(() => {
    // Re-read override after unlock
    void roleTick
  }, [roleTick])

  const unlock = useCallback(() => {
    setError(null)
    if (tryUnlockPlatformWithCode(code)) {
      setRoleTick((n) => n + 1)
      setCode("")
      return
    }
    setError("Invalid professional access code.")
  }, [code])

  if (loading) {
    return (
      <ShellLayout title="LectureCognis" subtitle="Checking professional access…" aiStatus="analyzing">
        <div className="glass-card rounded-2xl p-8 text-sm text-muted-foreground">
          Verifying access…
        </div>
      </ShellLayout>
    )
  }

  if (!allowed) {
    return (
      <ShellLayout
        title="LectureCognis"
        subtitle="Platform tool — professionals only"
        aiStatus="active"
      >
        <div className="glass-card mx-auto max-w-lg rounded-2xl border border-amber-400/25 p-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-400/10 text-amber-300">
            <Shield className="h-6 w-6" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">Professionals only</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            LectureCognis is a Quantrion platform tool for educators and admins. Learners cannot open
            or use the video machine.
          </p>
          {!isAuthenticated && (
            <p className="mt-2 text-xs text-muted-foreground">
              Sign in with an educator or admin account to continue.
            </p>
          )}
          {platformForgeKeyConfigured() && (
            <div className="mt-5 space-y-2 text-left">
              <label className="block text-xs font-medium text-muted-foreground">
                Professional access code
              </label>
              <Input
                type="password"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Platform operator code"
                aria-label="Professional access code"
              />
              {error && <p className="text-xs text-rose-300">{error}</p>}
              <Button type="button" className="w-full" onClick={unlock}>
                Unlock as professional
              </Button>
            </div>
          )}
          <Button asChild className="mt-6" variant="secondary">
            <Link href="/settings">Back to Settings</Link>
          </Button>
        </div>
      </ShellLayout>
    )
  }

  return <LectureCognisExperience />
}
