import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import type { Session } from "@supabase/supabase-js"
import { getSupabase } from "../lib/supabase"
import type { UserPlan, UserProfile, UserRole } from "../lib/types"
import {
  authenticateWithBiometrics,
  isBiometricEnabled,
} from "../services/biometrics"

const LOCAL_SESSION_KEY = "quantrion:local-session"
const ONBOARDING_KEY = "quantrion_onboarding_done"

type AuthContextValue = {
  loading: boolean
  session: Session | null
  user: UserProfile | null
  locked: boolean
  onboardingDone: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name?: string) => Promise<void>
  signOut: () => Promise<void>
  unlockWithBiometrics: () => Promise<boolean>
  completeOnboarding: () => Promise<void>
  demoSignIn: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

function profileFromSession(session: Session | null): UserProfile | null {
  if (!session?.user) return null
  const meta = session.user.user_metadata ?? {}
  return {
    id: session.user.id,
    email: session.user.email ?? "",
    name: (meta.full_name as string) || (meta.name as string) || null,
    role: (meta.role as UserRole) || "student",
    plan: (meta.plan as UserPlan) || "free",
    created_at: session.user.created_at,
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<UserProfile | null>(null)
  const [locked, setLocked] = useState(false)
  const [onboardingDone, setOnboardingDone] = useState(true)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      const onboard = await AsyncStorage.getItem(ONBOARDING_KEY)
      if (mounted) setOnboardingDone(onboard === "1")

      const supabase = getSupabase()
      if (supabase) {
        const { data } = await supabase.auth.getSession()
        if (!mounted) return
        setSession(data.session)
        setUser(profileFromSession(data.session))
        if (data.session && (await isBiometricEnabled())) {
          setLocked(true)
        }
        supabase.auth.onAuthStateChange((_event, next) => {
          setSession(next)
          setUser(profileFromSession(next))
        })
      } else {
        const raw = await AsyncStorage.getItem(LOCAL_SESSION_KEY)
        if (raw && mounted) {
          try {
            const local = JSON.parse(raw) as UserProfile
            setUser(local)
          } catch {
            /* ignore */
          }
        }
      }
      if (mounted) setLoading(false)
    })()
    return () => {
      mounted = false
    }
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    const supabase = getSupabase()
    if (!supabase) {
      throw new Error("Supabase is not configured. Use demo sign-in or set EXPO_PUBLIC_SUPABASE_*")
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }, [])

  const signUp = useCallback(async (email: string, password: string, name?: string) => {
    const supabase = getSupabase()
    if (!supabase) {
      throw new Error("Supabase is not configured")
    }
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name, name } },
    })
    if (error) throw error
  }, [])

  const signOut = useCallback(async () => {
    const supabase = getSupabase()
    if (supabase) await supabase.auth.signOut()
    await AsyncStorage.removeItem(LOCAL_SESSION_KEY)
    setSession(null)
    setUser(null)
    setLocked(false)
  }, [])

  const demoSignIn = useCallback(async () => {
    const demo: UserProfile = {
      id: "demo-mobile-user",
      email: "student@quantrion.ai",
      name: "Demo Student",
      role: "student",
      plan: "pro",
      created_at: new Date().toISOString(),
    }
    await AsyncStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(demo))
    setUser(demo)
  }, [])

  const unlockWithBiometrics = useCallback(async () => {
    const ok = await authenticateWithBiometrics()
    if (ok) setLocked(false)
    return ok
  }, [])

  const completeOnboarding = useCallback(async () => {
    await AsyncStorage.setItem(ONBOARDING_KEY, "1")
    setOnboardingDone(true)
  }, [])

  const value = useMemo(
    () => ({
      loading,
      session,
      user,
      locked,
      onboardingDone,
      signIn,
      signUp,
      signOut,
      unlockWithBiometrics,
      completeOnboarding,
      demoSignIn,
    }),
    [
      loading,
      session,
      user,
      locked,
      onboardingDone,
      signIn,
      signUp,
      signOut,
      unlockWithBiometrics,
      completeOnboarding,
      demoSignIn,
    ]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
