import { appendFile, mkdir } from "fs/promises"
import path from "path"
import { NextResponse } from "next/server"
import { getSupabaseEnv } from "@/lib/supabase/env"

export const runtime = "nodejs"

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Interest = {
  email: string
  kind: "exam" | "course"
  slug: string
  name: string
  createdAt: string
}

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : ""
}

async function saveToSupabase(row: Interest) {
  const env = getSupabaseEnv()
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  if (!env || !serviceKey || serviceKey.includes("your_")) return false
  const res = await fetch(`${env.url}/rest/v1/prep_interest`, {
    method: "POST",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      email: row.email,
      kind: row.kind,
      slug: row.slug,
      name: row.name,
    }),
  })
  return res.ok
}

async function saveToFile(row: Interest) {
  if (process.env.VERCEL) return false
  const dir = path.join(process.cwd(), "data")
  await mkdir(dir, { recursive: true })
  await appendFile(path.join(dir, "prep-interest.ndjson"), `${JSON.stringify(row)}\n`, "utf8")
  return true
}

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  const email = clean(body.email, 180).toLowerCase()
  const kind = body.kind === "course" ? "course" : body.kind === "exam" ? "exam" : ""
  const slug = clean(body.slug, 120)
  const name = clean(body.name, 180)
  if (!EMAIL.test(email) || !kind || !slug || !name) {
    return NextResponse.json({ error: "Email and a real exam or course are required." }, { status: 400 })
  }

  const row: Interest = { email, kind, slug, name, createdAt: new Date().toISOString() }
  try {
    if (await saveToSupabase(row)) return NextResponse.json({ ok: true, stored: "supabase" })
    if (await saveToFile(row)) return NextResponse.json({ ok: true, stored: "file" })
  } catch {
    return NextResponse.json({ error: "Could not save that email." }, { status: 500 })
  }
  return NextResponse.json(
    { error: "The prep list is not connected yet. Add Supabase, then try again." },
    { status: 503 },
  )
}
