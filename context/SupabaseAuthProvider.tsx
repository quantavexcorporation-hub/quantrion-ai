"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import type { Session, User } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/client"
import { isEmailVerified } from "@/lib/supabase/auth"
import type { UserProfile } from "@/lib/supabase/types"
import {
  clearLocalSession,
  readLocalSession,
  type LocalAuthSession,
  writeLocalSession,
} from "@/lib/local-auth"

type AuthContextValue = {
  user: User | null
  profile: UserProfile | null
  session: Session | null
  loading: boolean
  configured: boolean
  isAuthenticated: boolean
  emailVerified: boolean
  refresh: () => Promise<void>
  /** Local/demo login when Supabase env is not set */
  signInLocally: (input: { email: string; name?: string }) => Promise<void>
  signOutLocally: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function toLocalUser(local: LocalAuthSession): User {
  return {
    id: local.id,
    email: local.email,
    email_confirmed_at: local.createdAt,
    app_metadata: { provider: "local" },
    user_metadata: { name: local.name },
    aud: "authenticated",
    created_at: local.createdAt,
    role: "authenticated",
  } as User
}

function toLocalProfile(local: LocalAuthSession): UserProfile {
  return {
    id: local.id,
    email: local.email,
    name: local.name,
    role: "student",
    plan: "free",
    created_at: local.createdAt,
  }
}

async function fetchProfile(): Promise<UserProfile | null> {
  const response = await fetch("/api/auth/session", { cache: "no-store" })
  if (!response.ok) return null
  const data = (await response.json()) as { authenticated: boolean; user: UserProfile | null }
  return data.authenticated && data.user ? data.user : null
}

export function SupabaseAuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = useMemo(() => createClient(), [])
  const configured = supabase !== null
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  const applyLocalSession = useCallback((local: LocalAuthSession | null) => {
    if (!local) {
      setSession(null)
      setUser(null)
      setProfile(null)
      return
    }
    setSession({ user: toLocalUser(local) } as Session)
    setUser(toLocalUser(local))
    setProfile(toLocalProfile(local))
  }, [])

  const syncProfile = useCallback(async (nextUser: User | null) => {
    if (!nextUser) {
      setProfile(null)
      return
    }
    if (nextUser.app_metadata?.provider === "local") {
      const local = readLocalSession()
      if (local) setProfile(toLocalProfile(local))
      return
    }
    const nextProfile = await fetchProfile()
    setProfile(nextProfile)
  }, [])

  const refresh = useCallback(async () => {
    if (!supabase) {
      applyLocalSession(readLocalSession())
      return
    }

    const { data } = await supabase.auth.getSession()
    setSession(data.session)
    const nextUser = data.session?.user ?? null
    setUser(nextUser)
    await syncProfile(nextUser)
  }, [applyLocalSession, supabase, syncProfile])

  const signInLocally = useCallback(
    async (input: { email: string; name?: string }) => {
      const local = writeLocalSession(input)
      applyLocalSession(local)
    },
    [applyLocalSession],
  )

  const signOutLocally = useCallback(() => {
    clearLocalSession()
    applyLocalSession(null)
  }, [applyLocalSession])

  useEffect(() => {
    let mounted = true

    ;(async () => {
      if (!supabase) {
        applyLocalSession(readLocalSession())
        if (mounted) setLoading(false)
        return
      }

      await refresh()
      if (mounted) setLoading(false)
    })()

    if (!supabase) {
      return () => {
        mounted = false
      }
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      setSession(nextSession)
      const nextUser = nextSession?.user ?? null
      setUser(nextUser)
      await syncProfile(nextUser)
      setLoading(false)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [applyLocalSession, refresh, supabase, syncProfile])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      profile,
      session,
      loading,
      configured,
      isAuthenticated: Boolean(user && session),
      emailVerified: user?.app_metadata?.provider === "local" ? true : isEmailVerified(user),
      refresh,
      signInLocally,
      signOutLocally,
    }),
    [configured, loading, profile, refresh, session, signInLocally, signOutLocally, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useUser() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useUser must be used inside SupabaseAuthProvider")
  return ctx
}
