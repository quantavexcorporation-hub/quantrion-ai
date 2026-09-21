import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { isSupabaseConfigured } from "@/lib/supabase/env"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const next = requestUrl.searchParams.get("next") || "/dashboard"
  const error = requestUrl.searchParams.get("error_description")

  if (!isSupabaseConfigured()) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (error) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("error", error)
    return NextResponse.redirect(loginUrl)
  }

  if (code) {
    const supabase = await createClient()
    if (supabase) {
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
      if (exchangeError) {
        const loginUrl = new URL("/login", request.url)
        loginUrl.searchParams.set("error", exchangeError.message)
        return NextResponse.redirect(loginUrl)
      }
    }
  }

  return NextResponse.redirect(new URL(next, request.url))
}
