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
import { Progress } from "@/components/ui/progress"
import { Loader2, Sparkles, Clock, CheckCircle, XCircle, Lightbulb, FileText, Award } from "lucide-react"

interface TestQuestion {
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
  difficulty: string
  topic: string
}

interface TestResponse {
  test: {
    title: string
    totalQuestions: number
    duration: string
    questions: TestQuestion[]
  }
}

export default function TestGeneratorPage() {
  const [subject, setSubject] = useState("")
  const [topic, setTopic] = useState("")
  const [questionCount, setQuestionCount] = useState(15)
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium")
  const [fastMode, setFastMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [testData, setTestData] = useState<TestResponse | null>(null)
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({})
  const [showResults, setShowResults] = useState(false)
  const [testStarted, setTestStarted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [error, setError] = useState("")

  const generateTest = async () => {
    if (!subject.trim() || !topic.trim()) {
      setError("Please enter both subject and topic")
      return
    }

    setLoading(true)
    setError("")
    setTestData(null)
    setSelectedAnswers({})
    setShowResults(false)
    setTestStarted(false)

    try {
      const response = await fetch('/api/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject,
          topic,
          questionCount,
          difficulty,
          fast: fastMode
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate test')
      }

      setTestData(data)
      setTimeLeft(parseInt(data.test.duration) * 60) // Convert minutes to seconds
    } catch (error) {
      console.error('Error generating test:', error)
      setError(error instanceof Error ? error.message : 'Failed to generate test')
    } finally {
      setLoading(false)
    }
  }

  const startTest = () => {
    setTestStarted(true)
    setSelectedAnswers({})
    setShowResults(false)
    setTimeLeft(parseInt(testData!.test.duration) * 60)
  }

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const submitTest = () => {
    setShowResults(true)
    setTestStarted(false)
  }

  const calculateScore = () => {
    if (!testData) return 0
    let correct = 0
    testData.test.questions.forEach((question, index) => {
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const sampleSubjects = [
    "Physics", "Chemistry", "Biology", "Mathematics", 
    "History", "Geography", "English", "Computer Science"
  ]

  return (
    <ShellLayout title="Test Generator" subtitle="Create comprehensive tests with AI" aiStatus="analyzing">
      <div className="space-y-6">
        {/* Input Form */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Generate Test
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="e.g., Physics, Chemistry, Mathematics"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="topic">Topic</Label>
                  <Input
                    id="topic"
                    placeholder="e.g., Newton's Laws, Organic Chemistry, Algebra"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="mt-1"
                  />
                </div>
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
                      <SelectItem value="10">10 Questions</SelectItem>
                      <SelectItem value="15">15 Questions</SelectItem>
                      <SelectItem value="20">20 Questions</SelectItem>
                      <SelectItem value="25">25 Questions</SelectItem>
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

              {/* Sample Subjects */}
              <div>
                <Label className="text-sm text-muted-foreground">Popular subjects:</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {sampleSubjects.map((subj) => (
                    <Badge
                      key={subj}
                      variant="outline"
                      className="cursor-pointer hover:bg-secondary"
                      onClick={() => setSubject(subj)}
                    >
                      {subj}
                    </Badge>
                  ))}
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <Button 
                onClick={generateTest} 
                disabled={loading || !subject.trim() || !topic.trim()}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Test...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Test
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Test Display */}
        {testData && (
          <div className="space-y-6">
            {/* Test Header */}
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{testData.test.title}</CardTitle>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge className={getDifficultyColor(difficulty)}>
                        {difficulty}
                      </Badge>
                      <Badge variant="outline">
                        {testData.test.totalQuestions} Questions
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {testData.test.duration}
                      </div>
                    </div>
                  </div>
                  {!testStarted && !showResults && (
                    <Button onClick={startTest} size="lg">
                      Start Test
                    </Button>
                  )}
                </div>
              </CardHeader>
            </Card>

            {/* Timer */}
            {testStarted && (
              <Card className="glass-card border-orange-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-orange-600" />
                      <span className="font-medium">Time Remaining</span>
                    </div>
                    <div className="text-2xl font-bold text-orange-600">
                      {formatTime(timeLeft)}
                    </div>
                  </div>
                  <Progress value={(timeLeft / (parseInt(testData.test.duration) * 60)) * 100} className="mt-2" />
                </CardContent>
              </Card>
            )}

            {/* Test Questions */}
            {testStarted && (
              <div className="space-y-6">
                {testData.test.questions.map((question, index) => (
                  <Card key={question.id} className="glass-card">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Question {index + 1}</span>
                        <Badge variant="outline" className="text-xs">
                          {question.difficulty}
                        </Badge>
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
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Submit Button */}
                <div className="flex justify-center">
                  <Button 
                    onClick={submitTest}
                    disabled={Object.keys(selectedAnswers).length !== testData.test.questions.length}
                    size="lg"
                  >
                    Submit Test
                  </Button>
                </div>
              </div>
            )}

            {/* Test Results */}
            {showResults && (
              <div className="space-y-6">
                {/* Score Card */}
                <Card className="glass-card bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                      <div className="text-4xl font-bold text-blue-900 mb-2">
                        {calculateScore()} / {testData.test.totalQuestions}
                      </div>
                      <div className="text-xl text-blue-700 mb-4">
                        {Math.round((calculateScore() / testData.test.totalQuestions) * 100)}% Score
                      </div>
                      <div className="text-muted-foreground">
                        {calculateScore() >= testData.test.totalQuestions * 0.8 
                          ? "Excellent work!" 
                          : calculateScore() >= testData.test.totalQuestions * 0.6
                          ? "Good job!"
                          : "Keep practicing!"}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Detailed Results */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Detailed Results</h3>
                  {testData.test.questions.map((question, index) => (
                    <Card key={question.id} className="glass-card">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center justify-between">
                          <span>Question {index + 1}</span>
                          <div className="flex items-center gap-2">
                            {selectedAnswers[index] === question.correctAnswer ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-500" />
                            )}
                            <Badge variant="outline" className="text-xs">
                              {question.difficulty}
                            </Badge>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <p>{question.question}</p>
                          <div className="space-y-2">
                            <div className="font-medium">Your answer: {selectedAnswers[index] || "Not answered"}</div>
                            <div className="font-medium text-green-600">Correct answer: {question.correctAnswer}</div>
                          </div>
                          <div className="bg-blue-50 border border-blue-200 p-3 rounded">
                            <div className="flex items-start gap-2">
                              <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5" />
                              <div>
                                <div className="font-medium text-blue-900">Explanation:</div>
                                <div className="text-blue-800 text-sm mt-1">{question.explanation}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button onClick={startTest} variant="outline">
                    Retake Test
                  </Button>
                  <Button onClick={() => window.location.reload()}>
                    Generate New Test
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </ShellLayout>
  )
}
