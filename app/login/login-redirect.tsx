"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/context/AuthContext"

/** Full-page login is retired — open the app, then the login modal. */
export default function LoginRedirect() {
  const router = useRouter()
  const params = useSearchParams()
  const { openAuth } = useAuth()
  const next = params.get("next") || "/app/dashboard"
  const destination = next.startsWith("/") ? next : "/app/dashboard"
  const professional =
    params.get("mode") === "professional" || destination.includes("lecture-cognis")

  useEffect(() => {
    router.replace(professional ? "/lecture-cognis" : destination)
    const timer = window.setTimeout(() => {
      openAuth(
        "login",
        professional ? "/lecture-cognis" : destination,
        professional ? "professional" : "learner",
      )
    }, 600)
    return () => window.clearTimeout(timer)
  }, [destination, openAuth, professional, router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <p className="animate-pulse text-sm text-muted-foreground">Opening Quantrion...</p>
    </div>
  )
}
