export type Subject =
  | "auto"
  | "general"
  | "math"
  | "physics"
  | "chemistry"
  | "biology"
  | "english"

export type Exam =
  | "auto"
  | "jee"
  | "neet"
  | "cbse"
  | "sat"
  | "act"
  | "ap"
  | "ib"
  | "gre"
  | "gmat"

export interface AIRequest {
  message: string
  subject?: Subject
  exam?: Exam
}

export interface AIResponse {
  subject: Exclude<Subject, "auto">
  exam: Exclude<Exam, "auto">
  answer: string
  toolCalls?: Array<{ name: string; input: unknown }>
}

