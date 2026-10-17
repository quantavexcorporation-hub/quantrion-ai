import { NextResponse } from "next/server"
import { getAnthropicClient } from "@/lib/ai/anthropic"
import { getKnowledgeEntry, type KnowledgeKind } from "@/lib/knowledge/catalog"

export const runtime = "nodejs"

type KnowledgeBrief = {
  overview: string
  whoItIsFor: string
  structure: string
  topics: string[]
  howToPrepare: string
  watchOuts: string
}

const cache = new Map<string, KnowledgeBrief>()

function isKind(value: string): value is KnowledgeKind {
  return value === "exam" || value === "course"
}

function parseBrief(text: string): KnowledgeBrief | null {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/)
  const raw = (fenced?.[1] ?? text).trim()
  const start = raw.indexOf("{")
  const end = raw.lastIndexOf("}")
  if (start < 0 || end <= start) return null
  try {
    const parsed = JSON.parse(raw.slice(start, end + 1)) as KnowledgeBrief
    if (!parsed.overview || !Array.isArray(parsed.topics)) return null
    return {
      overview: String(parsed.overview),
      whoItIsFor: String(parsed.whoItIsFor ?? ""),
      structure: String(parsed.structure ?? ""),
      topics: parsed.topics.map(String).filter(Boolean).slice(0, 8),
      howToPrepare: String(parsed.howToPrepare ?? ""),
      watchOuts: String(parsed.watchOuts ?? ""),
    }
  } catch {
    return null
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  const kind = url.searchParams.get("kind") ?? ""
  const slug = url.searchParams.get("slug") ?? ""
  if (!isKind(kind) || !slug) {
    return NextResponse.json({ error: "kind and slug are required" }, { status: 400 })
  }

  const entry = getKnowledgeEntry(kind, slug)
  if (!entry) return NextResponse.json({ error: "Not found" }, { status: 404 })

  const key = `${kind}:${slug}`
  const cached = cache.get(key)
  if (cached) return NextResponse.json({ brief: cached, source: "cache" })

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ brief: null, source: "unavailable" })
  }

  try {
    const client = getAnthropicClient()
    const res = await client.messages.create({
      model: "claude-3-5-sonnet-latest",
      max_tokens: 1400,
      temperature: 0.2,
      system:
        "You write concise, factual education reference notes for students. Output ONLY valid JSON. No markdown.",
      messages: [
        {
          role: "user",
          content: `Write a Wikipedia-style study reference for this ${entry.kind}.

Name: ${entry.name}
Category: ${entry.category}
Region: ${entry.region ?? "Global"}
Known line: ${entry.detail}

Return JSON with:
- overview: 2 short paragraphs on what it is and why students care
- whoItIsFor: one paragraph
- structure: one paragraph on format, papers, or how the course is organized
- topics: array of 6 to 8 syllabus or module names
- howToPrepare: one paragraph of practical preparation
- watchOuts: one paragraph of common mistakes

Do not invent exact dates, cutoffs, or fees. If unsure, say the official brochure should be checked.`,
        },
      ],
    })

    const text = res.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("\n")
      .trim()
    const parsed = parseBrief(text)
    if (!parsed) return NextResponse.json({ brief: null, source: "invalid" })
    cache.set(key, parsed)
    return NextResponse.json({ brief: parsed, source: "ai" })
  } catch {
    return NextResponse.json({ brief: null, source: "error" })
  }
}
