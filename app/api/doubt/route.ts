import { NextRequest, NextResponse } from 'next/server'
import { AIService } from '@/lib/ai-service'

export async function POST(request: NextRequest) {
  try {
    const { question, fast = false } = await request.json()

    if (!question) {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      )
    }

    const answer = await AIService.solveDoubt(question, { fast })

    return NextResponse.json({
      answer: answer || "Sorry, I couldn't generate an explanation. Please try again."
    })

  } catch (error) {
    console.error('Doubt Solver Error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to solve doubt' },
      { status: 500 }
    )
  }
}
