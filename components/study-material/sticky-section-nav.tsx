"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { sectionNav } from "./data"

export function StickySectionNavigation() {
  const [active, setActive] = useState(sectionNav[0]?.id)

  useEffect(() => {
    const nodes = sectionNav
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[]

    if (!nodes.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) setActive(visible.target.id)
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.15, 0.35, 0.55] }
    )

    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      aria-label="Study Material sections"
      className="glass-card sticky top-0 z-20 mb-6 overflow-x-auto rounded-xl px-2 py-2 backdrop-blur-xl"
    >
      <ul className="flex min-w-max items-center gap-1">
        {sectionNav.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "inline-flex rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                active === item.id
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
