import { NextResponse } from "next/server"
import { routeSubjectAndExam } from "@/lib/ai/router"
import { runSubjectAgent } from "@/lib/ai/run-agent"
import type { AIRequest, AIResponse } from "@/lib/ai/types"

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<AIRequest>
    const message = (body.message ?? "").toString().trim()
    if (!message) {
      return NextResponse.json({ error: "message is required" }, { status: 400 })
    }

    const routed = await routeSubjectAndExam({
      message,
      subject: body.subject,
      exam: body.exam,
    })

    const { answer, toolCalls } = await runSubjectAgent({
      subject: routed.subject,
      exam: routed.exam,
      message,
    })

    const res: AIResponse = {
      subject: routed.subject,
      exam: routed.exam,
      answer,
      toolCalls,
    }

    return NextResponse.json(res)
  } catch (err: any) {
    const msg =
      typeof err?.message === "string" ? err.message : "Unknown server error"
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

