"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"
import {
  LayoutDashboard,
  BookOpen,
  FileQuestion,
  BrainCircuit,
  Bot,
  BarChart3,
  Sparkles,
  Library,
  Sparkle,
  Settings,
  Compass,
  Timer,
  GraduationCap,
  BriefcaseBusiness,
  ChevronDown,
  ChevronLeft,
  X,
  NotebookPen,
  UserRound,
  Layers3,
  Rocket,
  ClipboardList,
  Zap,
  Clapperboard,
  Flower2,
  Orbit,
  Factory,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useMemo, useState } from "react"
import { useNav } from "@/components/layout/nav-context"

type NavItem = {
  id: string
  title: string
  href: string
  icon: LucideIcon
  chip?: boolean
  children?: NavItem[]
}

type NavGroup = {
  id: string
  label: string
  items: NavItem[]
}

const FIRST_VISIT_KEY = "quantrion_first_visit_at"
const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000

const NAV_GROUPS: NavGroup[] = [
  {
    id: "frontier",
    label: "Frontier",
    items: [
      {
        id: "space-economy",
        title: "Space Economy",
        icon: Orbit,
        href: "/space-economy",
      },
      {
        id: "future-courses",
        title: "Future of Industries",
        icon: Sparkles,
        href: "/future-courses",
      },
      { id: "industrial", title: "Explore Industries", icon: Factory, href: "/q2" },
    ],
  },
  {
    id: "core",
    label: "Core",
    items: [
      { id: "dashboard", title: "Dashboard", icon: LayoutDashboard, href: "/app/dashboard" },
      { id: "exams", title: "Competitive Exams", icon: ClipboardList, href: "/q1" },
      { id: "study-material", title: "Study Material", icon: NotebookPen, href: "/study-material" },
      { id: "progress-iq", title: "Progress IQ", icon: BrainCircuit, href: "/knowledge-dna" },
    ],
  },
  {
    id: "learning",
    label: "Learning",
    items: [
      { id: "learn", title: "Learn", icon: BookOpen, href: "/learn" },
      { id: "quick-learn", title: "QuickLearn", icon: Zap, href: "/quick-learn" },
      { id: "library", title: "Smart Library", icon: Library, href: "/library" },
    ],
  },
  {
    id: "practice",
    label: "Practice",
    items: [
      { id: "practice", title: "Practice", icon: FileQuestion, href: "/practice" },
      { id: "tests", title: "Mock Tests", icon: Layers3, href: "/tests" },
      { id: "analytics", title: "Analytics", icon: BarChart3, href: "/analytics" },
    ],
  },
  {
    id: "intelligence",
    label: "Intelligence",
    items: [
      {
        id: "career-ai",
        title: "Career AI Suggestions",
        icon: BriefcaseBusiness,
        href: "/career-ai",
        chip: true,
      },
      {
        id: "sub-concept",
        title: "Sub-Concept Explorer",
        icon: Compass,
        href: "/sub-concept-explorer",
        chip: true,
      },
      { id: "meditation", title: "Meditation", icon: Flower2, href: "/meditation", chip: true },
      { id: "focus", title: "Focus Mode", icon: Timer, href: "/focus-mode", chip: true },
      {
        id: "toppers",
        title: "Toppers Guidance",
        icon: GraduationCap,
        href: "/toppers-guidance",
        chip: true,
      },
      {
        id: "industry-experts",
        title: "Industry Guidance",
        icon: BriefcaseBusiness,
        href: "/industry-guidance",
        chip: true,
      },
      {
        id: "space-experts",
        title: "Space Guidance",
        icon: Orbit,
        href: "/space-guidance",
        chip: true,
      },
      { id: "strategy", title: "Strategy AI", icon: Sparkles, href: "/strategy", chip: true },
    ],
  },
  {
    id: "account",
    label: "Account",
    items: [
      { id: "profile", title: "Profile", icon: UserRound, href: "/profile" },
      { id: "settings", title: "Settings", icon: Settings, href: "/settings" },
      {
        id: "lecture-cognis",
        title: "LectureCognis",
        icon: Clapperboard,
        href: "/lecture-cognis",
      },
    ],
  },
]

function useUpgradeUnlocked() {
  const [unlocked, setUnlocked] = useState(false)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(FIRST_VISIT_KEY)
      const now = Date.now()
      if (!raw) {
        window.localStorage.setItem(FIRST_VISIT_KEY, String(now))
        setUnlocked(false)
        return
      }
      const first = Number(raw)
      if (!Number.isFinite(first)) {
        window.localStorage.setItem(FIRST_VISIT_KEY, String(now))
        setUnlocked(false)
        return
      }
      setUnlocked(now - first >= THREE_DAYS_MS)
    } catch {
      setUnlocked(false)
    }
  }, [])

  return unlocked
}

function isActivePath(pathname: string, href: string) {
  if (pathname === href) return true
  if (href !== "/" && pathname.startsWith(`${href}/`)) return true
  return false
}

function flattenItems(items: NavItem[]): NavItem[] {
  return items.flatMap((item) => [item, ...(item.children ? flattenItems(item.children) : [])])
}

function NavLink({
  item,
  pathname,
  collapsed,
  nested = false,
}: {
  item: NavItem
  pathname: string
  collapsed: boolean
  nested?: boolean
}) {
  const isActive = isActivePath(pathname, item.href)
  const Icon = item.icon
  const nav = useNav()

  return (
    <Link
      href={item.href}
      onClick={() => nav?.closeMobile()}
      title={collapsed ? item.title : undefined}
      className={cn(
        "relative flex items-center gap-3 rounded-lg text-sm transition-colors",
        collapsed ? "justify-center px-3 py-2.5" : nested ? "gap-2.5 px-3 py-2 text-[13px]" : "px-3 py-2.5",
        item.chip && !collapsed && "border text-xs",
        isActive
          ? item.chip && !collapsed
            ? "border-sky-400/40 bg-sky-400/10 font-medium text-foreground"
            : nested
              ? "bg-cyan-500/15 font-medium text-cyan-200"
              : "bg-primary/10 font-medium text-primary"
          : item.chip && !collapsed
            ? "border-border/60 bg-secondary/40 text-muted-foreground hover:border-sky-400/30 hover:text-foreground"
            : nested
              ? "text-muted-foreground/90 hover:bg-secondary/70 hover:text-foreground"
              : "text-muted-foreground hover:bg-secondary hover:text-foreground",
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {isActive && !item.chip && !nested && (
        <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-primary" />
      )}
      {isActive && nested && !collapsed && (
        <span className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-cyan-400" />
      )}
      <Icon
        className={cn(
          "flex-shrink-0",
          collapsed ? "h-5 w-5" : nested ? "h-3.5 w-3.5" : "h-5 w-5",
          item.chip && !collapsed && "h-3.5 w-3.5 text-sky-400",
          nested && isActive && "text-cyan-300",
        )}
      />
      {!collapsed && <span className="truncate">{item.title}</span>}
    </Link>
  )
}

function ParentNavItem({
  item,
  pathname,
  collapsed,
}: {
  item: NavItem
  pathname: string
  collapsed: boolean
}) {
  const childActive = item.children?.some((c) => isActivePath(pathname, c.href)) ?? false
  const selfActive = isActivePath(pathname, item.href)
  const [open, setOpen] = useState(selfActive || childActive)

  useEffect(() => {
    if (selfActive || childActive) setOpen(true)
  }, [selfActive, childActive])

  if (!item.children?.length) {
    return <NavLink item={item} pathname={pathname} collapsed={collapsed} />
  }

  if (collapsed) {
    return (
      <>
        <NavLink item={item} pathname={pathname} collapsed />
        {item.children.map((child) => (
          <NavLink key={child.id} item={child} pathname={pathname} collapsed />
        ))}
      </>
    )
  }

  return (
    <div>
      <div className="flex items-center gap-0.5">
        <div className="min-w-0 flex-1">
          <NavLink item={item} pathname={pathname} collapsed={false} />
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="mr-1 rounded-md p-1.5 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
          aria-label={open ? `Collapse ${item.title}` : `Expand ${item.title}`}
          aria-expanded={open}
        >
          <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
        </button>
      </div>
      {open && (
        <ul className="relative ml-4 mt-0.5 space-y-0.5 border-l border-cyan-400/20 pl-2">
          {item.children.map((child) => (
            <li key={child.id}>
              <NavLink item={child} pathname={pathname} collapsed={false} nested />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function AppSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const nav = useNav()
  const mobileOpen = nav?.mobileOpen ?? false
  const showUpgrade = useUpgradeUnlocked()

  useEffect(() => {
    nav?.closeMobile()
  }, [pathname])

  const groups = useMemo(() => {
    if (!showUpgrade) return NAV_GROUPS
    return NAV_GROUPS.map((group) => {
      if (group.id !== "account") return group
      return {
        ...group,
        items: [
          ...group.items,
          { id: "upgrade", title: "Upgrade", icon: Sparkle, href: "/app/upgrade" },
        ],
      }
    })
  }, [showUpgrade])

  const flatItems = useMemo(() => flattenItems(groups.flatMap((g) => g.items)), [groups])

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/55 backdrop-blur-[2px] lg:hidden"
          aria-label="Close navigation"
          onClick={() => nav?.closeMobile()}
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-dvh max-h-dvh w-[min(18rem,88vw)] flex-col border-r border-border bg-sidebar pt-[env(safe-area-inset-top)] transition-transform duration-200 lg:static lg:z-auto lg:h-screen lg:max-h-none lg:w-56 lg:translate-x-0 lg:pt-0",
          collapsed && "lg:w-16",
          mobileOpen ? "max-lg:translate-x-0" : "max-lg:-translate-x-full",
        )}
      >
      <div className="flex items-center justify-between border-b border-border px-4 py-4 md:py-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
            <Image
              src="/quantrion-logo.png"
              alt="Quantrion"
              width={20}
              height={20}
              className="h-5 w-5 object-contain"
              priority
            />
          </div>
          {(!collapsed || mobileOpen) && (
            <span className="truncate text-lg font-semibold tracking-tight text-foreground">Quantrion</span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground lg:hidden"
            onClick={() => nav?.closeMobile()}
            aria-label="Close navigation"
          >
            <X className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden h-6 w-6 text-muted-foreground hover:text-foreground lg:inline-flex"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
          </Button>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto overscroll-contain px-2 py-4" aria-label="Primary">
        {collapsed && (
          <ul className="hidden space-y-1 lg:block">
            {flatItems.map((item) => (
              <li key={item.id}>
                <NavLink item={item} pathname={pathname} collapsed />
              </li>
            ))}
          </ul>
        )}
        <div className={cn(collapsed && "lg:hidden")}>
          {groups.map((group) => (
            <div key={group.id} className="mb-5">
              <p className="mb-1.5 px-3 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/70">
                {group.label}
              </p>
              <ul className="space-y-0.5">
                {group.items.map((item) => (
                  <li key={item.id}>
                    <ParentNavItem item={item} pathname={pathname} collapsed={false} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>

      <div className={cn("border-t border-border p-4 pb-[max(1rem,env(safe-area-inset-bottom))]", collapsed && "lg:hidden")}>
        <div className="flex items-center gap-2 text-xs text-sky-300">
          <Bot className="h-3.5 w-3.5" />
          <span>AI Core: analyzing...</span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">Quantrion Q1 v2.4.1</p>
      </div>
    </aside>
    </>
  )
}
