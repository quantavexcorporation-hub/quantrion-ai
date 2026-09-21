import type { MessageParam } from "@anthropic-ai/sdk/resources/messages"
import { getAnthropicClient } from "@/lib/ai/anthropic"
import { getSystemPrompt } from "@/lib/ai/agents/prompts"
import { toolSchemas } from "@/lib/ai/tools/schemas"
import {
  evaluateAnswer,
  generatePracticeSet,
  retrieveConceptNotes,
} from "@/lib/ai/tools/impl"
import type { Exam, Subject } from "@/lib/ai/types"

async function runTool(name: string, input: any) {
  switch (name) {
    case "retrieve_concept_notes":
      return retrieveConceptNotes(input)
    case "generate_practice_set":
      return generatePracticeSet(input)
    case "evaluate_answer":
      return evaluateAnswer(input)
    default:
      throw new Error(`Unknown tool: ${name}`)
  }
}

export async function runSubjectAgent(input: {
  subject: Exclude<Subject, "auto">
  exam: Exclude<Exam, "auto">
  message: string
}) {
  const client = getAnthropicClient()
  const system = getSystemPrompt({ subject: input.subject, exam: input.exam })

  const messages: MessageParam[] = [
    { role: "user", content: input.message },
  ]

  const toolCalls: Array<{ name: string; input: unknown }> = []

  // Simple loop: allow up to 3 tool rounds.
  for (let round = 0; round < 3; round++) {
    const res = await client.messages.create({
      model: "claude-3-5-sonnet-latest",
      max_tokens: 800,
      temperature: 0.3,
      system,
      messages,
      tools: toolSchemas as any,
    })

    const hasToolUse = res.content.some((c) => c.type === "tool_use")
    if (!hasToolUse) {
      const answer = res.content
        .filter((c) => c.type === "text")
        .map((c) => c.text)
        .join("\n")
        .trim()
      return { answer, toolCalls }
    }

    // Append assistant tool_use content, then tool_result(s)
    messages.push({ role: "assistant", content: res.content as any })

    const toolUses = res.content.filter((c) => c.type === "tool_use") as Array<{
      id: string
      name: string
      input: unknown
      type: "tool_use"
    }>

    for (const tu of toolUses) {
      toolCalls.push({ name: tu.name, input: tu.input })
      const out = await runTool(tu.name, tu.input)
      messages.push({
        role: "user",
        content: [
          {
            type: "tool_result",
            tool_use_id: tu.id,
            content: JSON.stringify(out),
          },
        ],
      })
    }
  }

  // Fallback: last attempt without tools.
  const finalRes = await client.messages.create({
    model: "claude-3-5-sonnet-latest",
    max_tokens: 800,
    temperature: 0.3,
    system,
    messages: [...messages, { role: "user", content: "Provide the final answer now." }],
  })
  const answer = finalRes.content
    .filter((c) => c.type === "text")
    .map((c) => c.text)
    .join("\n")
    .trim()
  return { answer, toolCalls }
}

