import { NextRequest, NextResponse } from 'next/server'
import { AIService } from '@/lib/ai-service'

export async function POST(request: NextRequest) {
  try {
    const { subject, topic, questionCount = 15, difficulty = 'medium', fast = false } = await request.json()

    if (!subject || !topic) {
      return NextResponse.json(
        { error: 'Subject and topic are required' },
        { status: 400 }
      )
    }

    const testData = await AIService.generateTest(
      subject, 
      topic, 
      questionCount, 
      difficulty, 
      { fast }
    )

    return NextResponse.json(testData)

  } catch (error) {
    console.error('Test Generation Error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate test' },
      { status: 500 }
    )
  }
}
