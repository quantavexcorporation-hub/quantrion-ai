"use client"

import dynamic from "next/dynamic"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { TopBar } from "@/components/layout/top-bar"
import { WelcomeHero } from "@/components/dashboard/welcome-hero"
import { ReferenceAtlas } from "@/components/knowledge/reference-atlas"
import { StrategyMentor } from "@/components/dashboard/strategy-mentor"
import { useUser } from "@/context/SupabaseAuthProvider"

const StudyDesk = dynamic(() => import("@/components/dashboard/study-desk").then((m) => m.StudyDesk), {
  loading: () => null,
})

interface DashboardCommandCenterProps {
  userName?: string
  exam?: string
}

export function DashboardCommandCenter({
  userName = "Arjun",
  exam = "JEE Advanced 2024",
}: DashboardCommandCenterProps) {
  const { isAuthenticated, loading } = useUser()
  const showStudyDesk = isAuthenticated && !loading

  return (
    <div className="flex h-dvh max-h-dvh overflow-hidden bg-background">
      <AppSidebar />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <TopBar aiStatus="learning" userName={`${userName} K.`} userExam={exam} />

        <div className="flex min-h-0 min-w-0 flex-1 overflow-hidden">
          <main className="q-main-canvas min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
            <div className="mx-auto max-w-5xl space-y-6 p-3 sm:space-y-8 sm:p-4 md:p-6 xl:p-8">
              <header>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-300">Quantrion</p>
                <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Dashboard</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Home for exams, courses, and your study desk.
                </p>
              </header>
              <StrategyMentor />
              <ReferenceAtlas />
              <WelcomeHero userName={userName} exam={exam} />
              {showStudyDesk && <StudyDesk />}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
