"use client"

import Link from "next/link"
import { BookOpen, MonitorPlay, Sparkles, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { readFocus } from "@/components/knowledge/prep-interest"
import { useUser } from "@/context/SupabaseAuthProvider"
import { dashboardMission } from "./command-data"

interface WelcomeHeroProps {
  userName: string
  exam?: string
}

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return "Good Morning"
  if (h < 17) return "Good Afternoon"
  return "Good Evening"
}

export function WelcomeHero({ userName, exam = "JEE Advanced 2024" }: WelcomeHeroProps) {
  const { requireAuth } = useAuth()
  const { isAuthenticated, profile, user } = useUser()
  const signedInName =
    profile?.name || user?.user_metadata?.name || user?.email?.split("@")[0] || userName
  const [focus, setFocus] = useState<string | null>(null)
  useEffect(() => {
    setFocus(readFocus())
  }, [])
  const name = isAuthenticated ? signedInName : "there"
  const examLine = isAuthenticated
    ? `Preparing for ${exam}`
    : focus
      ? `You marked ${focus}. Open its reference and read the official notice before you apply.`
      : "Browse the public exam and course reference"

  return (
    <div className="space-y-5">
      <div className="glass-card grid-glow rounded-2xl p-5 md:p-6">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Dashboard
        </p>
        <p className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {greeting()}, <span className="text-primary">{name}</span>
        </p>
        <p className="mt-1.5 text-sm text-muted-foreground">{examLine}</p>

        <div className="mt-5 q-surface rounded-xl p-4">
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground">Today&apos;s AI Recommendation</span>
          </div>
          {isAuthenticated ? (
            <p className="text-sm leading-relaxed text-muted-foreground">
              You are{" "}
              <span className="font-semibold text-foreground">{dashboardMission.readinessToday}% ready</span>{" "}
              for today&apos;s learning goal. Focus on Integration Techniques and revise Thermodynamics —
              optimal window 9–11 AM.
            </p>
          ) : (
            <p className="text-sm leading-relaxed text-muted-foreground">
              Start with one exam or course reference. Read the pathway, open related titles, and come back when
              full prep opens.
            </p>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {isAuthenticated ? (
            <>
              <Button size="sm" className="gap-1.5" onClick={() => requireAuth("/learn", "login")}>
                <BookOpen className="h-3.5 w-3.5" /> Continue Learning
              </Button>
              <Button size="sm" variant="outline" className="gap-1.5" onClick={() => requireAuth("/tests", "login")}>
                <MonitorPlay className="h-3.5 w-3.5" /> Take Mock Test
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="gap-1.5"
                onClick={() => requireAuth("/study-material", "login")}
              >
                <Target className="h-3.5 w-3.5" /> Revise Weak Topics
              </Button>
            </>
          ) : (
            <>
              <Button size="sm" className="gap-1.5" asChild>
                <Link href="/q1">
                  <BookOpen className="h-3.5 w-3.5" /> Browse exams
                </Link>
              </Button>
              <Button size="sm" variant="outline" className="gap-1.5" asChild>
                <Link href="/space-economy">
                  <MonitorPlay className="h-3.5 w-3.5" /> Space Missions
                </Link>
              </Button>
              <Button size="sm" variant="outline" className="gap-1.5" asChild>
                <Link href="/personal-development">
                  <Target className="h-3.5 w-3.5" /> Personal development
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
