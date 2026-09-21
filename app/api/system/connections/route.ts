import { NextResponse } from "next/server"
import { getSupabaseEnv } from "@/lib/supabase/env"

export const dynamic = "force-dynamic"

/**
 * Safe diagnostics — never returns secret values.
 * Keys live in the developer's `.env`; this only reports whether they are present
 * so the local Next.js server can call OpenAI / Supabase.
 */
export async function GET() {
  const supabase = Boolean(getSupabaseEnv())
  const openai = Boolean(process.env.OPENAI_API_KEY?.trim())
  const anthropic = Boolean(process.env.ANTHROPIC_API_KEY?.trim())
  const groq = Boolean(process.env.GROQ_API_KEY?.trim())

  return NextResponse.json({
    ok: true,
    howItWorks:
      "Quantrion APIs run on YOUR machine via npm run dev. Put keys in .env — the agent never logs into your OpenAI/Supabase account.",
    connections: {
      supabaseConfigured: supabase,
      openaiConfigured: openai,
      anthropicConfigured: anthropic,
      groqConfigured: groq,
    },
    lectureCognisReady: openai,
    authReady: supabase,
    nextSteps: [
      !supabase
        ? "Add NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY to .env for real accounts/DB"
        : null,
      !openai
        ? "Add OPENAI_API_KEY to .env for LectureCognis / MCQ / doubt APIs"
        : null,
      "Restart npm run dev after editing .env",
      "Do not paste API keys into chat",
    ].filter(Boolean),
  })
}
