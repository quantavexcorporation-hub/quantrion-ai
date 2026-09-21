import type { Tool } from "@anthropic-ai/sdk/resources/messages"

export const retrieveConceptNotesTool: Tool = {
  name: "retrieve_concept_notes",
  description:
    "Retrieve concise concept notes, key formulas, and common traps for a given subject + topic.",
  input_schema: {
    type: "object",
    properties: {
      subject: {
        type: "string",
        enum: ["math", "physics", "chemistry", "biology", "english"],
      },
      topic: { type: "string" },
      exam: {
        type: "string",
        enum: ["jee", "neet", "cbse", "sat", "act", "ap", "ib", "gre", "gmat"],
      },
    },
    required: ["subject", "topic", "exam"],
    additionalProperties: false,
  },
}

export const generatePracticeSetTool: Tool = {
  name: "generate_practice_set",
  description:
    "Generate a short practice set aligned to the exam pattern, with answers and brief solutions.",
  input_schema: {
    type: "object",
    properties: {
      subject: {
        type: "string",
        enum: ["math", "physics", "chemistry", "biology", "english"],
      },
      topic: { type: "string" },
      exam: {
        type: "string",
        enum: ["jee", "neet", "cbse", "sat", "act", "ap", "ib", "gre", "gmat"],
      },
      difficulty: {
        type: "string",
        enum: ["easy", "medium", "hard"],
      },
      count: { type: "integer", minimum: 1, maximum: 12 },
    },
    required: ["subject", "topic", "exam"],
    additionalProperties: false,
  },
}

export const evaluateAnswerTool: Tool = {
  name: "evaluate_answer",
  description:
    "Evaluate a user's answer against an expected solution/rubric and return structured feedback.",
  input_schema: {
    type: "object",
    properties: {
      subject: {
        type: "string",
        enum: ["math", "physics", "chemistry", "biology", "english"],
      },
      exam: {
        type: "string",
        enum: ["jee", "neet", "cbse", "sat", "act", "ap", "ib", "gre", "gmat"],
      },
      question: { type: "string" },
      userAnswer: { type: "string" },
      expectedAnswer: { type: "string" },
    },
    required: ["subject", "exam", "question", "userAnswer", "expectedAnswer"],
    additionalProperties: false,
  },
}

export const toolSchemas = [
  retrieveConceptNotesTool,
  generatePracticeSetTool,
  evaluateAnswerTool,
] as const

