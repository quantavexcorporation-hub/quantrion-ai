import type { KnowledgeEntry } from "@/lib/knowledge/catalog"
import { getCurated } from "@/lib/knowledge/curated"

export type KnowledgeBrief = {
  overview: string
  whoItIsFor: string
  structure: string
  topics: string[]
  howToPrepare: string
  watchOuts: string
}

export function localBrief(entry: KnowledgeEntry, related: KnowledgeEntry[]): KnowledgeBrief {
  const curated = getCurated(entry.slug)
  if (curated) return curated

  const place = entry.region ? `${entry.category} (${entry.region})` : entry.category
  const neighbors = related.slice(0, 3).map((item) => item.name)
  const neighborLine =
    neighbors.length > 0
      ? ` Nearby in the same catalog: ${neighbors.join(", ")}.`
      : ""

  if (entry.kind === "exam") {
    return {
      overview: `${entry.name} is part of Quantrion’s public exam atlas, filed under ${place}. ${entry.detail}.${neighborLine}\n\nUse this page to understand the pathway. Official dates, fees, eligibility, and cutoffs stay with the conducting body. Quantrion exam prep opens after learners are on the platform.`,
      whoItIsFor: `Students and career switchers comparing ${entry.category}. Read it before you commit months of preparation to ${entry.name}.`,
      structure: `${entry.name} is one exam inside ${entry.category}. This reference explains the pathway, what to confirm officially, and which neighboring exams are easy to confuse with it.`,
      topics: [
        "Official syllabus and latest brochure",
        "Paper pattern and sections",
        "Eligibility and number of attempts",
        "Past papers and timing",
        "Application window",
        "What the score is used for",
      ],
      howToPrepare: `Start with the latest official notice for ${entry.name}, then build a weekly plan around the real pattern. Read the neighboring exams in ${entry.category} so you do not prepare for the wrong paper.`,
      watchOuts: `Do not treat this page as an official notification. Patterns and eligibility change. Confirm ${entry.name} on the conducting body’s latest notice before you apply or pay a fee.`,
    }
  }

  return {
    overview: `${entry.name} is a public course reference in ${place}. ${entry.detail}.${neighborLine}\n\nThe page explains the subject so you can decide if it belongs on your path. The full taught course is not open for sale yet.`,
    whoItIsFor: `Learners exploring ${entry.category} who want a clear picture of ${entry.name} before a longer course starts.`,
    structure: `${entry.name} sits in the ${entry.category} catalog. Related courses on this page show what comes beside it, so you can see the wider map.`,
    topics: [
      "What this course is about",
      "Who should start here",
      "Skills you would practice",
      "How it connects to the category",
      "Which course to open next",
      "Where the full course will open later",
    ],
    howToPrepare: `Read this reference, then open the related courses in ${entry.category}. Treat “${entry.detail}” as the scope of ${entry.name} until the full Quantrion course is available.`,
    watchOuts: `Course titles can sound alike across catalogs. Stay inside ${entry.category} unless you meant a different pathway. This page is a reference, not a certificate or a paid class.`,
  }
}
