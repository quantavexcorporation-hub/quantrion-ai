"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import type { KnowledgeEntry } from "@/lib/knowledge/catalog"
import { KnowledgeSearch } from "@/components/knowledge/knowledge-search"

const hubs = [
  { href: "/q1", label: "Competitive exams" },
  { href: "/space-economy", label: "Space Missions" },
  { href: "/q2", label: "Industries" },
  { href: "/personal-development", label: "Personal development" },
  { href: "/future-courses", label: "Future courses" },
]

export function ReferenceAtlas() {
  const [counts, setCounts] = useState({ exams: 0, courses: 0 })
  const [featured, setFeatured] = useState<KnowledgeEntry[]>([])

  useEffect(() => {
    let cancelled = false
    void import("@/lib/knowledge/catalog").then((mod) => {
      if (cancelled) return
      setCounts(mod.KNOWLEDGE_COUNTS)
      setFeatured(mod.featuredKnowledge())
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section className="glass-card rounded-2xl p-5 md:p-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-300">Public reference</p>
      <h2 className="mt-2 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        {counts.exams > 0 ? `${counts.exams} exams and ${counts.courses} courses, open to read` : "Exams and courses, open to read"}
      </h2>
      <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">
        Search any title and open its reference. Full prep and paid courses open later.
      </p>
      <div className="mt-4 max-w-xl">
        <KnowledgeSearch placeholder="Try JEE, NEET, UPSC, astronomy…" />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {hubs.map((hub) => (
          <Link
            key={hub.href}
            href={hub.href}
            className="rounded-full border border-border/70 px-3 py-1 text-xs font-medium text-foreground hover:border-sky-400/40"
          >
            {hub.label}
          </Link>
        ))}
      </div>
      {featured.length > 0 && (
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((entry) => (
            <Link
              key={entry.slug}
              href={entry.kind === "exam" ? `/exams/${entry.slug}` : `/courses/${entry.slug}`}
              className="rounded-xl border border-border/60 bg-secondary/20 px-3 py-3 hover:border-sky-400/40"
            >
              <p className="text-[10px] font-semibold uppercase tracking-wide text-sky-300">
                {entry.emoji} {entry.kind}
              </p>
              <p className="mt-1 text-sm font-medium text-foreground">{entry.name}</p>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">{entry.category}</p>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
