import type { MetadataRoute } from "next"
import { knowledgeSlugs } from "@/lib/knowledge/catalog"

function siteUrl() {
  const configured = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "")
  if (configured && !configured.includes("localhost")) return configured
  return "https://quantrion-ai.vercel.app"
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl()
  const hubs = ["", "/q1", "/q2", "/personal-development", "/future-courses"]
  return [
    ...hubs.map((path) => ({
      url: `${base}${path || "/"}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...knowledgeSlugs("exam").map((slug) => ({
      url: `${base}/exams/${slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...knowledgeSlugs("course").map((slug) => ({
      url: `${base}/courses/${slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ]
}
