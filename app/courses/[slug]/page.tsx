import { notFound } from "next/navigation"
import { KnowledgeArticle } from "@/components/knowledge/knowledge-article"
import { getKnowledgeEntry, relatedEntries } from "@/lib/knowledge/catalog"

export default async function CourseReferencePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const entry = getKnowledgeEntry("course", slug)
  if (!entry) notFound()
  return <KnowledgeArticle entry={entry} related={relatedEntries(entry)} />
}
