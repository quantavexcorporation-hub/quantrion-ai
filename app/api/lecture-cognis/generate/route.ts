import { NextResponse } from "next/server"
import { assertLectureCognisAccess } from "@/lib/lecture-cognis/access"
import { runLectureCognis } from "@/lib/lecture-cognis/engine"
import type { VideoKind } from "@/components/lecture-cognis/lecture-cognis-data"

export const maxDuration = 120
export const dynamic = "force-dynamic"

type Body = {
  topic?: string
  course?: string
  kinds?: VideoKind[]
}

export async function POST(request: Request) {
  const access = await assertLectureCognisAccess()
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status })
  }

  try {
    const body = (await request.json()) as Body
    const topic = body.topic?.trim() ?? ""
    if (topic.length < 2) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 })
    }
    const kinds = Array.isArray(body.kinds) && body.kinds.length ? body.kinds : (["full-lecture"] as VideoKind[])

    const pack = await runLectureCognis({
      topic,
      course: body.course,
      kinds,
    })

    if (pack.status === "failed") {
      return NextResponse.json({ error: pack.error || "Forge failed", pack }, { status: 500 })
    }

    return NextResponse.json({ ok: true, pack })
  } catch (err) {
    const message = err instanceof Error ? err.message : "LectureCognis unavailable"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
