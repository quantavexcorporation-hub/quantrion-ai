import { NextResponse } from "next/server"
import { isSupabaseConfigured } from "@/lib/supabase/env"

export function supabaseUnavailableResponse() {
  return NextResponse.json(
    {
      error:
        "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.",
    },
    { status: 503 },
  )
}

export function assertSupabaseConfigured() {
  return isSupabaseConfigured()
}
