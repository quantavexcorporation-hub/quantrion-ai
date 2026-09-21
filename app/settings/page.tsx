"use client"

import { Suspense } from "react"
import { useTheme } from "next-themes"
import { ShellLayout } from "@/components/layout/shell-layout"
import { Button } from "@/components/ui/button"
import { ConnectionsStatus } from "@/components/settings/connections-status"

function SettingsContent() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="glass-card rounded-xl p-5">
        <p className="panel-title">AI Personalization</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Learning style: active recall, pace: high, predictive alerts: enabled.
        </p>
      </div>
      <div className="glass-card rounded-xl p-5">
        <p className="panel-title">Notification Intelligence</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Smart reminders for weak topics and revision windows are enabled.
        </p>
      </div>
      <div className="glass-card rounded-xl p-5 md:col-span-2">
        <p className="panel-title">Appearance</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Switch between dark and light themes.
        </p>
        <div className="mt-4 flex gap-2">
          <Button
            size="sm"
            variant={theme === "dark" ? "default" : "outline"}
            onClick={() => setTheme("dark")}
          >
            Dark
          </Button>
          <Button
            size="sm"
            variant={theme === "light" ? "default" : "outline"}
            onClick={() => setTheme("light")}
          >
            Light
          </Button>
        </div>
      </div>

      <ConnectionsStatus />
    </div>
  )
}

export default function SettingsPage() {
  return (
    <ShellLayout
      title="Settings"
      subtitle="Control your profile, AI behavior, and notifications."
      aiStatus="active"
    >
      <Suspense
        fallback={
          <div className="glass-card rounded-xl p-5 text-sm text-muted-foreground">Loading settings…</div>
        }
      >
        <SettingsContent />
      </Suspense>
    </ShellLayout>
  )
}
