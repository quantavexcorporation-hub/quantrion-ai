import { NextResponse } from "next/server"
import { isValidEmail } from "@/lib/auth"
import { assertSupabaseConfigured, supabaseUnavailableResponse } from "@/lib/supabase/api"
import { createClient } from "@/lib/supabase/server"
import { getAppOrigin } from "@/lib/supabase/auth"
import { rateLimit } from "@/lib/rate-limit"

type RegisterBody = {
  name?: string
  email?: string
  password?: string
}

export async function POST(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for") ?? "local"
  const limiter = rateLimit({ key: `auth_register:${forwardedFor}`, limit: 10, windowMs: 60_000 })
  if (!limiter.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 })
  }

  try {
    const body = (await request.json()) as RegisterBody
    const name = body.name?.trim() ?? ""
    const email = body.email?.trim() ?? ""
    const password = body.password ?? ""

    if (name.length < 2) {
      return NextResponse.json({ error: "Enter your name." }, { status: 400 })
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 })
    }
    if (password.trim().length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 })
    }

    if (!assertSupabaseConfigured()) return supabaseUnavailableResponse()

    const supabase = await createClient()
    if (!supabase) return supabaseUnavailableResponse()

    const emailRedirectTo = `${getAppOrigin()}/auth/callback?next=/dashboard`
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name }, emailRedirectTo },
    })
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })

    return NextResponse.json({
      ok: true,
      requiresEmailVerification: Boolean(data.user && !data.session),
      user: {
        id: data.user?.id ?? null,
        name,
        email,
      },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to register right now."
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
