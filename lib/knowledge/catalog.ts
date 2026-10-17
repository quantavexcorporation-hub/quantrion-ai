import { EXAM_CATALOG } from "@/components/ecosystem-gateway/exam-catalog"
import { SPACE_INDUSTRIAL_CATALOG } from "@/components/ecosystem-gateway/qrion-space-catalog"
import { PD_CATALOG } from "@/components/personal-development/pd-data"

export type KnowledgeKind = "exam" | "course"

export type KnowledgeEntry = {
  kind: KnowledgeKind
  slug: string
  name: string
  detail: string
  category: string
  categoryId: string
  region?: string
  emoji: string
  hub: string
}

function slugify(value: string) {
  const slug = value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
  return slug || "item"
}

function uniqueSlug(base: string, used: Set<string>) {
  let slug = base
  let n = 2
  while (used.has(slug)) {
    slug = `${base}-${n}`
    n += 1
  }
  used.add(slug)
  return slug
}

function buildCatalog() {
  const used = new Set<string>()
  const exams: KnowledgeEntry[] = []
  const courses: KnowledgeEntry[] = []

  for (const category of EXAM_CATALOG) {
    for (const exam of category.exams) {
      const slug = uniqueSlug(slugify(exam.name), used)
      exams.push({
        kind: "exam",
        slug,
        name: exam.name,
        detail: exam.detail,
        category: category.title,
        categoryId: category.id,
        region: category.region,
        emoji: category.emoji,
        hub: "/q1",
      })
    }
  }

  for (const category of SPACE_INDUSTRIAL_CATALOG) {
    for (const course of category.courses) {
      const slug = uniqueSlug(slugify(course), used)
      courses.push({
        kind: "course",
        slug,
        name: course,
        detail: category.blurb,
        category: category.title,
        categoryId: category.id,
        emoji: category.emoji,
        hub: category.pillar === "space" ? "/space-economy" : "/q2",
      })
    }
  }

  for (const category of PD_CATALOG) {
    for (const course of category.courses) {
      const slug = uniqueSlug(slugify(course), used)
      courses.push({
        kind: "course",
        slug,
        name: course,
        detail: category.blurb,
        category: category.title,
        categoryId: category.id,
        emoji: category.emoji,
        hub: category.id.startsWith("future-") ? "/future-courses" : "/personal-development",
      })
    }
  }

  return { exams, courses }
}

const catalog = buildCatalog()

const examBySlug = new Map(catalog.exams.map((entry) => [entry.slug, entry]))
const courseBySlug = new Map(catalog.courses.map((entry) => [entry.slug, entry]))
const examByName = new Map(catalog.exams.map((entry) => [entry.name, entry]))
const courseByName = new Map<string, KnowledgeEntry>()
for (const entry of catalog.courses) {
  if (!courseByName.has(entry.name)) courseByName.set(entry.name, entry)
}

export function getKnowledgeEntry(kind: KnowledgeKind, slug: string) {
  return (kind === "exam" ? examBySlug : courseBySlug).get(slug) ?? null
}

export function examHref(name: string) {
  const entry = examByName.get(name)
  return entry ? `/exams/${entry.slug}` : "/q1"
}

export function courseHref(name: string) {
  const entry = courseByName.get(name)
  return entry ? `/courses/${entry.slug}` : "/q2"
}

export function relatedEntries(entry: KnowledgeEntry, limit = 6) {
  const pool = entry.kind === "exam" ? catalog.exams : catalog.courses
  return pool.filter((item) => item.categoryId === entry.categoryId && item.slug !== entry.slug).slice(0, limit)
}

export const KNOWLEDGE_COUNTS = {
  exams: catalog.exams.length,
  courses: catalog.courses.length,
}

export function knowledgeSlugs(kind: KnowledgeKind) {
  const pool = kind === "exam" ? catalog.exams : catalog.courses
  return pool.map((entry) => entry.slug)
}
