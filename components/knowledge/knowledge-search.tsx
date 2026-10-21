"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import type { KnowledgeEntry } from "@/lib/knowledge/catalog"

export function KnowledgeSearch({
  placeholder = "Search exams and courses",
  autoFocus = false,
}: {
  placeholder?: string
  autoFocus?: boolean
}) {
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [results, setResults] = useState<KnowledgeEntry[]>([])
  const box = useRef<HTMLDivElement>(null)
  const searchRef = useRef<typeof import("@/lib/knowledge/catalog").searchKnowledge | null>(null)

  const runSearch = useMemo(() => {
    return async (value: string) => {
      if (!searchRef.current) {
        const mod = await import("@/lib/knowledge/catalog")
        searchRef.current = mod.searchKnowledge
      }
      setResults(searchRef.current(value, 6))
    }
  }, [])

  useEffect(() => {
    function onPointer(event: MouseEvent) {
      if (!box.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onPointer)
    return () => document.removeEventListener("mousedown", onPointer)
  }, [])

  return (
    <div ref={box} className="relative min-w-0">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={query}
        autoFocus={autoFocus}
        placeholder={placeholder}
        aria-label={placeholder}
        onChange={(event) => {
          const value = event.target.value
          setQuery(value)
          setOpen(true)
          if (value.trim().length >= 2) void runSearch(value)
          else setResults([])
        }}
        onFocus={() => setOpen(true)}
        className="h-9 border-border/60 bg-secondary/40 pl-10 text-sm placeholder:text-muted-foreground focus-visible:border-primary/40 focus-visible:ring-primary/30"
      />
      {open && query.trim().length >= 2 && (
        <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 overflow-hidden rounded-xl border border-border/70 bg-popover shadow-xl">
          {results.length === 0 ? (
            <p className="px-3 py-3 text-sm text-muted-foreground">No exam or course matches that.</p>
          ) : (
            <ul>
              {results.map((entry) => (
                <li key={`${entry.kind}-${entry.slug}`}>
                  <Link
                    href={entry.kind === "exam" ? `/exams/${entry.slug}` : `/courses/${entry.slug}`}
                    onClick={() => setOpen(false)}
                    className="flex items-start justify-between gap-3 px-3 py-2.5 text-sm hover:bg-secondary/60"
                  >
                    <span className="min-w-0">
                      <span className="block truncate font-medium text-foreground">{entry.name}</span>
                      <span className="block truncate text-xs text-muted-foreground">{entry.category}</span>
                    </span>
                    <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wide text-sky-300">
                      {entry.kind}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
