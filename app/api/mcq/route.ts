import { NextRequest, NextResponse } from 'next/server'
import { AIService } from '@/lib/ai-service'

export async function POST(request: NextRequest) {
  try {
    const { topic, difficulty, questionCount = 5, fast = false } = await request.json()

    if (!topic || !difficulty) {
      return NextResponse.json(
        { error: 'Topic and difficulty are required' },
        { status: 400 }
      )
    }

    const mcqData = await AIService.generateMCQs(
      topic, 
      difficulty, 
      questionCount, 
      { fast }
    )

    return NextResponse.json(mcqData)

  } catch (error) {
    console.error('MCQ Generation Error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate MCQs' },
      { status: 500 }
    )
  }
}
