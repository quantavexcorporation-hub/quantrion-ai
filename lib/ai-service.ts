import OpenAI from 'openai'

// Initialize OpenAI client lazily
let _openai: OpenAI | null = null
let _groq: any = null

function getOpenAIClient() {
  if (_openai) return _openai
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('Missing OPENAI_API_KEY in environment')
  }
  _openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })
  return _openai
}

function getGroqClient() {
  if (_groq !== null) return _groq
  if (!process.env.GROQ_API_KEY) {
    return null
  }
  try {
    const Groq = require('groq-sdk').Groq
    _groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    })
  } catch (error) {
    console.warn('Groq SDK not installed, falling back to OpenAI only')
    _groq = false
  }
  return _groq || null
}

export interface AIServiceOptions {
  fast?: boolean
  model?: string
  temperature?: number
  maxTokens?: number
}

export class AIService {
  static async generateCompletion(
    prompt: string,
    systemPrompt: string,
    options: AIServiceOptions = {}
  ): Promise<string> {
    const { fast = false, model, temperature = 0.7, maxTokens = 2000 } = options

    // Use Groq for fast responses if available and requested
    const groqClient = getGroqClient()
    if (fast && groqClient) {
      try {
        const completion = await groqClient.chat.completions.create({
          model: model || "llama-3.1-70b-versatile",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: prompt }
          ],
          temperature,
          max_tokens: maxTokens,
        })
        return completion.choices[0]?.message?.content || ""
      } catch (error) {
        console.warn('Groq API failed, falling back to OpenAI:', error)
        // Fall back to OpenAI if Groq fails
      }
    }

    // Default to OpenAI
    try {
      const completion = await getOpenAIClient().chat.completions.create({
        model: model || "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt }
        ],
        temperature,
        max_tokens: maxTokens,
      })
      return completion.choices[0]?.message?.content || ""
    } catch (error) {
      console.error('OpenAI API failed:', error)
      throw new Error('AI service unavailable')
    }
  }

  static async generateMCQs(
    topic: string,
    difficulty: string,
    questionCount: number = 5,
    options: AIServiceOptions = {}
  ): Promise<any> {
    const prompt = `Generate ${questionCount} multiple choice questions about "${topic}" with ${difficulty} difficulty level.

For each question, provide:
1. The question text
2. 4 options (A, B, C, D)
3. The correct answer
4. A brief explanation

Return the response in this exact JSON format:
{
  "questions": [
    {
      "id": 1,
      "question": "Question text here",
      "options": {
        "A": "Option A",
        "B": "Option B", 
        "C": "Option C",
        "D": "Option D"
      },
      "correctAnswer": "A",
      "explanation": "Brief explanation of why this is correct"
    }
  ]
}

Make sure:
- Questions are appropriate for ${difficulty} level
- Only one option is clearly correct
- Explanations are educational and concise
- All questions are about the topic: ${topic}`

    const systemPrompt = "You are an expert educational content creator. Generate high-quality multiple choice questions with clear answers and explanations."

    const response = await this.generateCompletion(prompt, systemPrompt, {
      ...options,
      maxTokens: 2000
    })

    // Parse and validate JSON response
    try {
      return JSON.parse(response)
    } catch (error) {
      console.error('Failed to parse MCQ response:', response)
      throw new Error('Invalid MCQ format generated')
    }
  }

  static async solveDoubt(
    question: string,
    options: AIServiceOptions = {}
  ): Promise<string> {
    const prompt = `Explain this in simple step-by-step way for a student: ${question}

Please provide:
1. A clear, simple explanation
2. Step-by-step breakdown
3. Key concepts involved
4. A simple example if applicable

Keep the explanation concise but thorough enough for a student to understand.`

    const systemPrompt = "You are an expert teacher who can explain complex topics in simple, easy-to-understand ways. Break down concepts step by step for students."

    return this.generateCompletion(prompt, systemPrompt, {
      ...options,
      maxTokens: 1000
    })
  }

  static async generateTest(
    subject: string,
    topic: string,
    questionCount: number = 15,
    difficulty: string = 'medium',
    options: AIServiceOptions = {}
  ): Promise<any> {
    const prompt = `Generate a comprehensive test with ${questionCount} multiple choice questions for ${subject} - ${topic} at ${difficulty} difficulty level.

The test should cover:
- Key concepts and fundamentals
- Problem-solving scenarios
- Application-based questions
- Important formulas and their applications

For each question, provide:
1. Question text
2. 4 options (A, B, C, D)
3. Correct answer
4. Brief explanation
5. Difficulty level (easy/medium/hard)

Return the response in this exact JSON format:
{
  "test": {
    "title": "${subject} - ${topic} Test",
    "totalQuestions": ${questionCount},
    "duration": "${questionCount * 2} minutes",
    "questions": [
      {
        "id": 1,
        "question": "Question text here",
        "options": {
          "A": "Option A",
          "B": "Option B",
          "C": "Option C",
          "D": "Option D"
        },
        "correctAnswer": "A",
        "explanation": "Brief explanation",
        "difficulty": "medium",
        "topic": "specific topic"
      }
    ]
  }
}

Make sure:
- Questions progress from easy to hard
- Mix of conceptual and numerical problems
- Clear and unambiguous options
- Accurate explanations
- All questions relevant to ${subject} - ${topic}`

    const systemPrompt = "You are an expert educational assessment creator. Generate comprehensive, well-structured tests that accurately evaluate student understanding."

    const response = await this.generateCompletion(prompt, systemPrompt, {
      ...options,
      maxTokens: 3000
    })

    // Parse and validate JSON response
    try {
      return JSON.parse(response)
    } catch (error) {
      console.error('Failed to parse test response:', response)
      throw new Error('Invalid test format generated')
    }
  }
}
