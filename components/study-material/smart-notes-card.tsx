"use client"

import {
  Bookmark,
  Brain,
  Clock3,
  Download,
  Printer,
  Sparkles,
} from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { smartNotesSections } from "./data"

export function SmartNotesCard() {
  return (
    <section id="smart-notes" className="q-fade-up scroll-mt-24">
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Section 01
          </p>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Smart Notes</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Topic-wise structured learning objects — not static PDFs.
          </p>
        </div>
        <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
          Newton&apos;s Laws
        </Badge>
      </div>

      <article className="glass-card rounded-2xl p-5 md:p-6">
        <div className="flex flex-col gap-4 border-b border-border/60 pb-5 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">Laws of Motion · Smart Object</h3>
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1 rounded-md bg-secondary/70 px-2 py-1">
                <Clock3 className="h-3.5 w-3.5" /> 18 min read
              </span>
              <span className="rounded-md bg-amber-500/10 px-2 py-1 text-amber-300">Medium</span>
              <span className="rounded-md bg-green-500/10 px-2 py-1 text-green-300">72% complete</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" className="h-8 gap-1.5 text-xs">
              <Bookmark className="h-3.5 w-3.5" /> Bookmark
            </Button>
            <Button size="sm" variant="outline" className="h-8 gap-1.5 text-xs">
              <Download className="h-3.5 w-3.5" /> Download
            </Button>
            <Button size="sm" variant="outline" className="h-8 gap-1.5 text-xs">
              <Printer className="h-3.5 w-3.5" /> Print
            </Button>
            <Button size="sm" className="h-8 gap-1.5 text-xs">
              <Sparkles className="h-3.5 w-3.5" /> AI Summary
            </Button>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>Completion</span>
              <span className="tabular-nums text-foreground">72%</span>
            </div>
            <Progress value={72} className="h-1.5" />
          </div>

          <Accordion type="multiple" defaultValue={["defs", "formulas"]} className="space-y-2">
            {smartNotesSections.map((section) => (
              <AccordionItem
                key={section.id}
                value={section.id}
                className="rounded-xl border border-border/70 bg-secondary/20 px-4"
              >
                <AccordionTrigger className="py-3 text-sm hover:no-underline">
                  {section.title}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">
                  {section.content}
                  <button
                    type="button"
                    className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs text-primary transition-colors hover:bg-primary/15"
                  >
                    <Brain className="h-3.5 w-3.5" /> Explain with AI
                  </button>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </article>
    </section>
  )
}
