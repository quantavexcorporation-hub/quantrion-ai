import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { KnowledgeArticle } from "@/components/knowledge/knowledge-article"
import { getKnowledgeEntry, knowledgeSlugs, relatedEntries } from "@/lib/knowledge/catalog"

export function generateStaticParams() {
  return knowledgeSlugs("exam").map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const entry = getKnowledgeEntry("exam", slug)
  if (!entry) return { title: "Exam reference · Quantrion" }
  return {
    title: `${entry.name} · Quantrion`,
    description: `${entry.name} in ${entry.category}. ${entry.detail}`,
  }
}

export default async function ExamReferencePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const entry = getKnowledgeEntry("exam", slug)
  if (!entry) notFound()
  return <KnowledgeArticle entry={entry} related={relatedEntries(entry)} />
}
