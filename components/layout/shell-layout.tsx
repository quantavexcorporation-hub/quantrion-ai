"use client"

import type { ReactNode } from "react"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { TopBar } from "@/components/layout/top-bar"
import { RightSidebar } from "@/components/layout/right-sidebar"
import { cn } from "@/lib/utils"

interface ShellLayoutProps {
  title?: string
  subtitle?: string
  children: ReactNode
  aiStatus?: "active" | "learning" | "analyzing" | "optimizing" | "predicting"
  showRightRail?: boolean
  /** Custom right-side header controls (search, filters, etc.) */
  headerActions?: ReactNode
  /** Skip the default title block — page provides its own header */
  hideHeader?: boolean
  className?: string
}

export function ShellLayout({
  title,
  subtitle,
  children,
  aiStatus = "analyzing",
  showRightRail = false,
  headerActions,
  hideHeader = false,
  className,
}: ShellLayoutProps) {
  return (
    <div className="flex h-dvh max-h-dvh overflow-hidden bg-background">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <TopBar aiStatus={aiStatus} userName="Arjun K." userExam="JEE Advanced 2024" />
        <div className="flex min-h-0 min-w-0 flex-1 overflow-hidden">
          <main className={cn("q-main-canvas min-w-0 flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-4 md:p-6 xl:p-8", className)}>
            {!hideHeader && title && (
              <section className="glass-card grid-glow mb-6 rounded-2xl p-5 md:p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl md:text-3xl">
                      {title}
                    </h1>
                    {subtitle && (
                      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                        {subtitle}
                      </p>
                    )}
                  </div>
                  {headerActions && (
                    <div className="flex shrink-0 flex-wrap items-center gap-2">
                      {headerActions}
                    </div>
                  )}
                </div>
              </section>
            )}
            {children}
          </main>
          {showRightRail && <RightSidebar />}
        </div>
      </div>
    </div>
  )
}
