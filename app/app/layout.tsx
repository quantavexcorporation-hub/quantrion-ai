"use client"

import { useEffect, useRef } from "react"
import { useAuth } from "@/context/AuthContext"
import { useUser } from "@/context/SupabaseAuthProvider"

const LOGIN_PROMPT_DELAY_MS = 1400

/** Open the platform first, then ask for login (ChatGPT-style). */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { openAuth } = useAuth()
  const { isAuthenticated, loading } = useUser()
  const promptedRef = useRef(false)

  useEffect(() => {
    if (loading || isAuthenticated || promptedRef.current) return

    const timer = window.setTimeout(() => {
      if (promptedRef.current) return
      promptedRef.current = true
      openAuth("login", "/app/dashboard")
    }, LOGIN_PROMPT_DELAY_MS)

    return () => window.clearTimeout(timer)
  }, [isAuthenticated, loading, openAuth])

  return <>{children}</>
}
