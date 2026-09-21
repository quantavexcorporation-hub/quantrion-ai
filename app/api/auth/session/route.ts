import { NextResponse } from "next/server"
import { rateLimit } from "@/lib/rate-limit"
import { getAuthenticatedContext, profileFromAuthUser } from "@/lib/supabase/session"
import { assertSupabaseConfigured, supabaseUnavailableResponse } from "@/lib/supabase/api"

export async function GET(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for") ?? "local"
  const limiter = rateLimit({ key: `auth_session:${forwardedFor}`, limit: 60, windowMs: 60_000 })
  if (!limiter.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 })
  }

  if (!assertSupabaseConfigured()) {
    return NextResponse.json({ authenticated: false, user: null }, { status: 200 })
  }

  const context = await getAuthenticatedContext()
  if (!context) {
    return NextResponse.json({ authenticated: false, user: null }, { status: 200 })
  }

  return NextResponse.json({
    authenticated: true,
    user: context.profile ?? profileFromAuthUser(context.user),
  })
}
