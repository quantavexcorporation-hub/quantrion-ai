import { getAnthropicClient } from "@/lib/ai/anthropic"
import type { Exam, Subject } from "@/lib/ai/types"

const allowedSubjects: Exclude<Subject, "auto">[] = [
  "general",
  "math",
  "physics",
  "chemistry",
  "biology",
  "english",
]

const allowedExams: Exclude<Exam, "auto">[] = [
  "jee",
  "neet",
  "cbse",
  "sat",
  "act",
  "ap",
  "ib",
  "gre",
  "gmat",
]

function normalizeSubject(s?: Subject): Subject {
  if (!s) return "auto"
  return s
}

function normalizeExam(e?: Exam): Exam {
  if (!e) return "auto"
  return e
}

export async function routeSubjectAndExam(input: {
  message: string
  subject?: Subject
  exam?: Exam
}): Promise<{ subject: Exclude<Subject, "auto">; exam: Exclude<Exam, "auto"> }> {
  const subject = normalizeSubject(input.subject)
  const exam = normalizeExam(input.exam)

  // User override wins (hybrid routing).
  if (subject !== "auto" && exam !== "auto") {
    return { subject, exam }
  }

  const client = getAnthropicClient()
  const res = await client.messages.create({
    model: "claude-3-5-sonnet-latest",
    max_tokens: 128,
    temperature: 0,
    system:
      "You are a strict classifier. Output ONLY valid JSON. No prose. No markdown.",
    messages: [
      {
        role: "user",
        content: `Classify the subject and exam for this query.\n\nQuery: ${input.message}\n\nRules:\n- subject must be one of: ${allowedSubjects.join(
          ", "
        )}\n- exam must be one of: ${allowedExams.join(
          ", "
        )}\n- If exam is not specified, pick 'jee' for India-style STEM questions, otherwise 'sat' for general global high-school style.\n- If subject isn't clear, pick 'general'.\n\nReturn JSON like: {"subject":"math","exam":"jee"}`,
      },
    ],
  })

  const text = res.content
    .filter((c) => c.type === "text")
    .map((c) => c.text)
    .join("\n")
    .trim()

  try {
    const parsed = JSON.parse(text) as { subject?: string; exam?: string }
    const routedSubject = allowedSubjects.includes(
      parsed.subject as Exclude<Subject, "auto">
    )
      ? (parsed.subject as Exclude<Subject, "auto">)
      : "general"
    const routedExam = allowedExams.includes(parsed.exam as Exclude<Exam, "auto">)
      ? (parsed.exam as Exclude<Exam, "auto">)
      : "jee"
    return {
      subject: subject === "auto" ? routedSubject : (subject as any),
      exam: exam === "auto" ? routedExam : (exam as any),
    }
  } catch {
    return {
      subject: subject === "auto" ? "general" : (subject as any),
      exam: exam === "auto" ? "jee" : (exam as any),
    }
  }
}

