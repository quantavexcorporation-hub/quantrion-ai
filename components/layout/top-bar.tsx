"use client"

import { Search, Cpu, Zap, Bell, Settings, Menu } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { StatusDot } from "@/components/ui/status-badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/context/AuthContext"
import { useUser } from "@/context/SupabaseAuthProvider"
import { useNav } from "@/components/layout/nav-context"

interface TopBarProps {
  aiStatus?: "active" | "learning" | "analyzing" | "optimizing" | "predicting"
  userName?: string
  userExam?: string
}

const statusLabels = {
  active: "Active",
  learning: "Learning",
  analyzing: "Analyzing",
  optimizing: "Optimizing",
  predicting: "Predicting",
}

export function TopBar({
  aiStatus = "learning",
  userName = "Guest",
  userExam = "Quantrion AI",
}: TopBarProps) {
  const { openAuth, logout } = useAuth()
  const { isAuthenticated, profile, user } = useUser()
  const nav = useNav()

  const displayName = isAuthenticated
    ? profile?.name || user?.user_metadata?.name || user?.email?.split("@")[0] || userName
    : "Guest"
  const displayExam = isAuthenticated ? userExam : "Sign in to sync progress"
  const initials = String(displayName)
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border/80 bg-card/40 px-2 pt-[env(safe-area-inset-top)] backdrop-blur-md sm:px-3 md:px-4">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-9 w-9 shrink-0 text-muted-foreground hover:text-foreground lg:hidden"
        onClick={() => nav?.toggleMobile()}
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </Button>

      <div className="min-w-0 max-w-lg flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Ask AI or search..."
            className="h-9 border-border/60 bg-secondary/40 pl-10 pr-3 text-sm placeholder:text-muted-foreground transition-colors focus-visible:border-primary/40 focus-visible:ring-primary/30 md:pr-12"
          />
          <kbd className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-border/60 bg-secondary/80 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground md:block">
            ⌘ K
          </kbd>
        </div>
      </div>

      <div className="mx-4 hidden items-center gap-4 xl:flex">
        <div className="ai-pulse flex items-center gap-2 rounded-full border border-border/50 bg-secondary/50 px-3 py-1.5">
          <Cpu className="h-4 w-4 text-cyan-400" />
          <span className="text-xs font-medium text-foreground">AI Core</span>
          <StatusDot variant="active" />
        </div>

        <div className="flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1.5">
          <StatusDot variant={aiStatus === "learning" ? "active" : "processing"} />
          <span className="text-xs font-medium text-cyan-400">{statusLabels[aiStatus]}</span>
        </div>

        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
          <Zap className="h-4 w-4" />
          <span className="text-xs font-medium">Quick Analysis</span>
        </Button>
      </div>

      <div className="flex shrink-0 items-center gap-1 sm:gap-2">
        <Button variant="ghost" size="icon" className="hidden h-8 w-8 text-muted-foreground hover:text-foreground sm:inline-flex">
          <Settings className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="relative h-8 w-8 text-muted-foreground hover:text-foreground">
          <Bell className="h-4 w-4" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-500 text-[10px] font-bold text-cyan-950">
            3
          </span>
        </Button>

        {isAuthenticated ? (
          <div className="flex items-center gap-2 border-l border-border pl-2 sm:pl-3">
            <Avatar className="h-8 w-8 border border-border">
              <AvatarImage src="" />
              <AvatarFallback className="bg-purple-500/20 text-xs font-medium text-purple-400">
                {initials || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="hidden flex-col sm:flex">
              <span className="max-w-[8rem] truncate text-xs font-medium text-foreground">{displayName}</span>
              <button
                type="button"
                onClick={logout}
                className="text-left text-[10px] text-muted-foreground hover:text-foreground"
              >
                Log out
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 border-l border-border pl-2 sm:pl-3">
            <div className="hidden flex-col md:flex">
              <span className="text-xs font-medium text-foreground">{displayName}</span>
              <span className="text-[10px] text-muted-foreground">{displayExam}</span>
            </div>
            <Button size="sm" className="h-8 px-2.5 text-xs sm:px-3" onClick={() => openAuth("login", "/app/dashboard")}>
              Sign in
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
