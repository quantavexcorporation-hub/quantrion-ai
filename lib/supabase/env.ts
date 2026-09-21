const PLACEHOLDER_PATTERNS = [
  "your-project-ref",
  "your_supabase",
  "your-publishable",
  "example.com",
]

function isPlaceholder(value: string) {
  const lower = value.toLowerCase()
  return PLACEHOLDER_PATTERNS.some((pattern) => lower.includes(pattern))
}

export function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()

  if (!url || !anonKey) return null
  if (isPlaceholder(url) || isPlaceholder(anonKey)) return null

  return { url, anonKey }
}

export function isSupabaseConfigured() {
  return getSupabaseEnv() !== null
}
