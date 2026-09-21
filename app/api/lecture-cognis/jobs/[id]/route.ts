import { NextResponse } from "next/server"
import { assertLectureCognisAccess } from "@/lib/lecture-cognis/access"
import { readPack, updatePack } from "@/lib/lecture-cognis/store"
import { retimedSlides, type LecturePack, type LectureSlide } from "@/lib/lecture-cognis/types"

export const dynamic = "force-dynamic"

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const access = await assertLectureCognisAccess()
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status })
  }

  const { id } = await context.params
  const pack = await readPack(id)
  if (!pack) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 })
  }
  return NextResponse.json({ pack })
}

type PatchBody = {
  slides?: LectureSlide[]
  durationSec?: number
  scriptFull?: string
  scriptShort?: string
  stylePreset?: LecturePack["stylePreset"]
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const access = await assertLectureCognisAccess()
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status })
  }

  const { id } = await context.params
  const current = await readPack(id)
  if (!current) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 })
  }

  try {
    const body = (await request.json()) as PatchBody
    let slides = body.slides ?? current.slides
    let durationSec = body.durationSec ?? current.durationSec

    if (body.slides?.length) {
      const timed = retimedSlides(body.slides)
      slides = timed.slides
      durationSec = timed.durationSec
    }

    const pack = await updatePack(id, {
      slides,
      durationSec,
      scriptFull: body.scriptFull ?? current.scriptFull,
      scriptShort: body.scriptShort ?? current.scriptShort,
      stylePreset: body.stylePreset ?? current.stylePreset,
      status: "live",
      progress: 100,
    })

    return NextResponse.json({ ok: true, pack })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Save failed"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
