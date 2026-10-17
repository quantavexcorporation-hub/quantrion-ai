"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, BookOpen, Sparkles } from "lucide-react"
import { ShellLayout } from "@/components/layout/shell-layout"
import type { KnowledgeEntry } from "@/lib/knowledge/catalog"
import { knowledgeHref } from "@/lib/knowledge/catalog"
import { localBrief, type KnowledgeBrief } from "@/lib/knowledge/local-brief"

export function KnowledgeArticle({
  entry,
  related,
}: {
  entry: KnowledgeEntry
  related: KnowledgeEntry[]
}) {
  const [brief, setBrief] = useState<KnowledgeBrief>(() => localBrief(entry, related))
  const [source, setSource] = useState<"atlas" | "ai">("atlas")
  const backHref = entry.hub

  useEffect(() => {
    let cancelled = false
    setBrief(localBrief(entry, related))
    setSource("atlas")
    async function load() {
      try {
        const res = await fetch(`/api/knowledge?kind=${entry.kind}&slug=${entry.slug}`)
        const json = await res.json()
        if (cancelled) return
        if (json?.brief?.overview) {
          setBrief(json.brief as KnowledgeBrief)
          setSource("ai")
        }
      } catch {
        if (!cancelled) setSource("atlas")
      }
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [entry, related])

  return (
    <ShellLayout
      title={entry.name}
      subtitle={`${entry.category} · Quantrion reference`}
      aiStatus="analyzing"
      hideHeader
    >
      <article className="mx-auto max-w-3xl space-y-6 pb-10">
        <Link href={backHref} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to catalog
        </Link>

        <header className="glass-card rounded-2xl p-5 md:p-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-300">
            {entry.emoji} {entry.kind === "exam" ? "Exam reference" : "Course reference"}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">{entry.name}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {entry.category}
            {entry.region ? ` · ${entry.region}` : ""} · {entry.detail}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            This page is Quantrion&apos;s public reference. Full exam prep and paid courses open after learners are on the platform.
          </p>
        </header>

        <section className="glass-card rounded-2xl p-5 md:p-6">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
            <Sparkles className="h-4 w-4 text-sky-300" />
            {source === "ai" ? "AI reference" : "Quantrion reference"}
          </div>
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p className="whitespace-pre-line text-foreground">{brief.overview}</p>
              <div>
                <h2 className="font-semibold text-foreground">Who it is for</h2>
                <p className="mt-1">{brief.whoItIsFor}</p>
              </div>
              <div>
                <h2 className="font-semibold text-foreground">How it is structured</h2>
                <p className="mt-1">{brief.structure}</p>
              </div>
              <div>
                <h2 className="font-semibold text-foreground">Topics</h2>
                <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                  {brief.topics.map((topic) => (
                    <li key={topic} className="rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-foreground">
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-semibold text-foreground">How to prepare</h2>
                <p className="mt-1">{brief.howToPrepare}</p>
              </div>
              <div>
                <h2 className="font-semibold text-foreground">Watch-outs</h2>
                <p className="mt-1">{brief.watchOuts}</p>
              </div>
          </div>
        </section>

        {related.length > 0 && (
          <section>
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
              <BookOpen className="h-4 w-4" /> Related in {entry.category}
            </h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={knowledgeHref(item)}
                  className="rounded-xl border border-border/60 bg-card/40 px-3 py-3 text-sm text-foreground hover:border-sky-400/40"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </ShellLayout>
  )
}
