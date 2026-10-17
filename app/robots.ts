import type { MetadataRoute } from "next"

function siteUrl() {
  const configured = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "")
  if (configured && !configured.includes("localhost")) return configured
  return "https://quantrion-ai.vercel.app"
}

export default function robots(): MetadataRoute.Robots {
  const base = siteUrl()
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/"],
    },
    sitemap: `${base}/sitemap.xml`,
  }
}
