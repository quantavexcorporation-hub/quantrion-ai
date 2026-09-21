import { NextResponse } from "next/server"
import { rateLimit } from "@/lib/rate-limit"
import { getAuthenticatedContext } from "@/lib/supabase/session"
import { assertSupabaseConfigured, supabaseUnavailableResponse } from "@/lib/supabase/api"

export async function GET(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for") ?? "local"
  const limiter = rateLimit({ key: `user_profile:${forwardedFor}`, limit: 60, windowMs: 60_000 })
  if (!limiter.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 })
  }

  if (!assertSupabaseConfigured()) return supabaseUnavailableResponse()

  const context = await getAuthenticatedContext()
  if (!context) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (!context.profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 })
  }

  return NextResponse.json({ user: context.profile })
}
