import { NextResponse } from "next/server"
import { isValidEmail } from "@/lib/auth"
import { assertSupabaseConfigured, supabaseUnavailableResponse } from "@/lib/supabase/api"
import { createClient } from "@/lib/supabase/server"
import { getAuthenticatedContext } from "@/lib/supabase/session"
import { rateLimit } from "@/lib/rate-limit"

type LoginBody = {
  email?: string
  password?: string
}

export async function POST(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for") ?? "local"
  const limiter = rateLimit({ key: `auth_login:${forwardedFor}`, limit: 20, windowMs: 60_000 })
  if (!limiter.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 })
  }

  try {
    const body = (await request.json()) as LoginBody
    const email = body.email?.trim() ?? ""
    const password = body.password ?? ""

    if (!isValidEmail(email) || password.trim().length < 6) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 400 })
    }

    if (!assertSupabaseConfigured()) return supabaseUnavailableResponse()

    const supabase = await createClient()
    if (!supabase) return supabaseUnavailableResponse()

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return NextResponse.json({ error: error.message }, { status: 401 })

    const context = await getAuthenticatedContext()
    if (!context) {
      return NextResponse.json({ error: "Unable to load session." }, { status: 500 })
    }

    return NextResponse.json({
      ok: true,
      user: context.profile ?? {
        id: context.user.id,
        email: context.user.email,
        name: context.user.user_metadata?.name ?? null,
        role: "student",
        plan: "free",
        created_at: context.user.created_at,
      },
    })
  } catch {
    return NextResponse.json({ error: "Unable to sign in right now." }, { status: 500 })
  }
}
