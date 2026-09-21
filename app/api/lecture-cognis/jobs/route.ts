import { NextResponse } from "next/server"
import { assertLectureCognisAccess } from "@/lib/lecture-cognis/access"
import { listPacks } from "@/lib/lecture-cognis/store"

export const dynamic = "force-dynamic"

export async function GET() {
  const access = await assertLectureCognisAccess()
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status })
  }

  const packs = await listPacks(50)
  return NextResponse.json({ packs })
}
