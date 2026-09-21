"use client"

import { useState } from "react"
import { ShellLayout } from "@/components/layout/shell-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Loader2, Sparkles, CheckCircle, XCircle, Lightbulb } from "lucide-react"

interface MCQ {
  id: number
  question: string
  options: {
    A: string
    B: string
    C: string
    D: string
  }
  correctAnswer: string
  explanation: string
}

interface MCQResponse {
  questions: MCQ[]
}

export default function MCQGeneratorPage() {
  const [topic, setTopic] = useState("")
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium")
  const [questionCount, setQuestionCount] = useState(5)
  const [fastMode, setFastMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [mcqData, setMcqData] = useState<MCQResponse | null>(null)
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({})
  const [showResults, setShowResults] = useState(false)
  const [error, setError] = useState("")

  const generateMCQs = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic")
      return
    }

    setLoading(true)
    setError("")
    setMcqData(null)
    setSelectedAnswers({})
    setShowResults(false)

    try {
      const response = await fetch('/api/mcq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic,
          difficulty,
          questionCount,
          fast: fastMode
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate MCQs')
      }

      setMcqData(data)
    } catch (error) {
      console.error('Error generating MCQs:', error)
      setError(error instanceof Error ? error.message : 'Failed to generate MCQs')
    } finally {
      setLoading(false)
    }
  }

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const checkAnswers = () => {
    setShowResults(true)
  }

  const resetQuiz = () => {
    setSelectedAnswers({})
    setShowResults(false)
  }

  const calculateScore = () => {
    if (!mcqData) return 0
    let correct = 0
    mcqData.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++
      }
    })
    return correct
  }

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "easy": return "bg-green-100 text-green-800 border-green-200"
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "hard": return "bg-red-100 text-red-800 border-red-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <ShellLayout title="MCQ Generator" subtitle="Generate multiple choice questions with AI" aiStatus="active">
      <div className="space-y-6">
        {/* Input Form */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Generate MCQs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="topic">Topic</Label>
                <Input
                  id="topic"
                  placeholder="e.g., Newton's Laws, Photosynthesis, World War II"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Select value={difficulty} onValueChange={(value: "easy" | "medium" | "hard") => setDifficulty(value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="questionCount">Number of Questions</Label>
                  <Select value={questionCount.toString()} onValueChange={(value) => setQuestionCount(parseInt(value))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 Questions</SelectItem>
                      <SelectItem value="5">5 Questions</SelectItem>
                      <SelectItem value="10">10 Questions</SelectItem>
                      <SelectItem value="15">15 Questions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2 mt-6">
                  <input
                    type="checkbox"
                    id="fastMode"
                    checked={fastMode}
                    onChange={(e) => setFastMode(e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="fastMode" className="text-sm">
                    Fast Mode (uses Groq)
                  </Label>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <Button 
                onClick={generateMCQs} 
                disabled={loading || !topic.trim()}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating MCQs...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate MCQs
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* MCQ Questions */}
        {mcqData && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Generated Questions</h2>
              <div className="flex items-center gap-2">
                <Badge className={getDifficultyColor(difficulty)}>
                  {difficulty}
                </Badge>
                <Badge variant="outline">
                  {mcqData.questions.length} Questions
                </Badge>
              </div>
            </div>

            {mcqData.questions.map((question, index) => (
              <Card key={question.id} className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">
                    Question {index + 1}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-lg">{question.question}</p>
                    
                    <RadioGroup
                      value={selectedAnswers[index] || ""}
                      onValueChange={(value) => handleAnswerSelect(index, value)}
                      disabled={showResults}
                    >
                      {Object.entries(question.options).map(([key, value]) => (
                        <div key={key} className="flex items-center space-x-2">
                          <RadioGroupItem value={key} id={`q${index}-${key}`} />
                          <Label htmlFor={`q${index}-${key}`} className="flex-1 cursor-pointer">
                            <span className="font-medium">{key}.</span> {value}
                          </Label>
                          {showResults && (
                            <div className="ml-2">
                              {key === question.correctAnswer ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              ) : selectedAnswers[index] === key ? (
                                <XCircle className="h-5 w-5 text-red-500" />
                              ) : null}
                            </div>
                          )}
                        </div>
                      ))}
                    </RadioGroup>

                    {showResults && (
                      <div className="bg-blue-50 border border-blue-200 p-3 rounded">
                        <div className="flex items-start gap-2">
                          <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5" />
                          <div>
                            <div className="font-medium text-blue-900">Explanation:</div>
                            <div className="text-blue-800 text-sm mt-1">{question.explanation}</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Action Buttons */}
            <div className="flex gap-4">
              {!showResults ? (
                <Button 
                  onClick={checkAnswers}
                  disabled={Object.keys(selectedAnswers).length !== mcqData.questions.length}
                  className="flex-1"
                >
                  Check Answers
                </Button>
              ) : (
                <>
                  <div className="flex-1">
                    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                      <CardContent className="p-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-900">
                            {calculateScore()} / {mcqData.questions.length}
                          </div>
                          <div className="text-blue-700">
                            {Math.round((calculateScore() / mcqData.questions.length) * 100)}% Correct
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <Button onClick={resetQuiz} variant="outline">
                    Reset Quiz
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </ShellLayout>
  )
}
