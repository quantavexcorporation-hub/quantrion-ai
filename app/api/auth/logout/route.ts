import { NextResponse } from "next/server"
import { assertSupabaseConfigured, supabaseUnavailableResponse } from "@/lib/supabase/api"
import { createClient } from "@/lib/supabase/server"

export async function POST() {
  if (!assertSupabaseConfigured()) return supabaseUnavailableResponse()

  const supabase = await createClient()
  if (!supabase) return supabaseUnavailableResponse()

  const { error } = await supabase.auth.signOut()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

