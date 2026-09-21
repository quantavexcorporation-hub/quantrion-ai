"use client"

import { useState } from "react"
import { ShellLayout } from "@/components/layout/shell-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Loader2, Sparkles, MessageCircle, Copy, ThumbsUp, ThumbsDown } from "lucide-react"

interface DoubtResponse {
  answer: string
}

export default function DoubtSolverPage() {
  const [question, setQuestion] = useState("")
  const [fastMode, setFastMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [answer, setAnswer] = useState("")
  const [error, setError] = useState("")
  const [feedback, setFeedback] = useState<"good" | "bad" | null>(null)

  const solveDoubt = async () => {
    if (!question.trim()) {
      setError("Please enter your question")
      return
    }

    setLoading(true)
    setError("")
    setAnswer("")
    setFeedback(null)

    try {
      const response = await fetch('/api/doubt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          fast: fastMode
        }),
      })

      const data: DoubtResponse = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to solve doubt')
      }

      setAnswer(data.answer)
    } catch (error) {
      console.error('Error solving doubt:', error)
      setError(error instanceof Error ? error.message : 'Failed to solve doubt')
    } finally {
      setLoading(false)
    }
  }

  const copyAnswer = () => {
    navigator.clipboard.writeText(answer)
  }

  const handleFeedback = (type: "good" | "bad") => {
    setFeedback(type)
    // In a real app, you'd send this feedback to your backend
    console.log(`User feedback: ${type}`)
  }

  const sampleQuestions = [
    "What is photosynthesis and why is it important?",
    "Explain Newton's second law of motion",
    "How do vaccines work?",
    "What causes seasons on Earth?",
    "Explain the concept of supply and demand"
  ]

  return (
    <ShellLayout title="Doubt Solver" subtitle="Get step-by-step explanations for your questions" aiStatus="learning">
      <div className="space-y-6">
        {/* Input Form */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Ask Your Question
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label htmlFor="question" className="block text-sm font-medium mb-2">
                  Your Question
                </label>
                <Textarea
                  id="question"
                  placeholder="Ask anything you're curious about... e.g., Why is the sky blue? How do computers work? What causes earthquakes?"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="fastMode"
                    checked={fastMode}
                    onChange={(e) => setFastMode(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="fastMode" className="text-sm">
                    Fast Mode (uses Groq)
                  </label>
                </div>
                <Badge variant="outline" className="text-xs">
                  {question.length} characters
                </Badge>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <Button 
                onClick={solveDoubt} 
                disabled={loading || !question.trim()}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Getting Answer...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Get Explanation
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sample Questions */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">Need inspiration? Try these:</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {sampleQuestions.map((sample, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="justify-start h-auto p-3 text-left"
                  onClick={() => setQuestion(sample)}
                >
                  {sample}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Answer Display */}
        {answer && (
          <Card className="glass-card border-gradient-to-r from-blue-200 to-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  AI Explanation
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyAnswer}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-wrap bg-blue-50 p-4 rounded-lg border border-blue-200">
                    {answer}
                  </div>
                </div>

                {/* Feedback Section */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-sm text-muted-foreground">
                    Was this explanation helpful?
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={feedback === "good" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleFeedback("good")}
                      className={feedback === "good" ? "bg-green-600 hover:bg-green-700" : ""}
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Helpful
                    </Button>
                    <Button
                      variant={feedback === "bad" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleFeedback("bad")}
                      className={feedback === "bad" ? "bg-red-600 hover:bg-red-700" : ""}
                    >
                      <ThumbsDown className="h-4 w-4 mr-1" />
                      Not Helpful
                    </Button>
                  </div>
                </div>

                {/* Follow-up Questions */}
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">
                    Follow-up questions you might ask:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                      Can you explain this simpler?
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                      Give me an example
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                      How does this relate to...?
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ShellLayout>
  )
}
