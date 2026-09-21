"use client"

import { useEffect, useMemo, useState } from "react"
import { ShellLayout } from "@/components/layout/shell-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ProgressTracker } from "@/lib/progress"
import { useUser } from "@/hooks/use-user"

const options = ["42", "x + C", "2x + C", "x^2 + C"]

export default function PracticePage() {
  const { profile } = useUser()
  const [askOpen, setAskOpen] = useState(false)
  const [question, setQuestion] = useState("")
  const [subject, setSubject] = useState("auto")
  const [exam, setExam] = useState("auto")
  const [answer, setAnswer] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  
  // Practice question state
  const [currentQuestion, setCurrentQuestion] = useState<{
    text: string
    options: string[]
    correctAnswer: string
    difficulty: "easy" | "medium" | "hard"
    subject: string
    topic: string
  }>({
    text: "Q. Evaluate: ∫2x dx",
    options: ["42", "x + C", "2x + C", "x² + C"],
    correctAnswer: "x² + C",
    difficulty: "medium",
    subject: "math",
    topic: "calculus"
  })
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [evaluation, setEvaluation] = useState<any>(null)
  const [timer, setTimer] = useState(84) // seconds
  const [isTimerRunning, setIsTimerRunning] = useState(true)

  // Timer effect
  useEffect(() => {
    if (!isTimerRunning || timer <= 0) return
    
    const interval = setInterval(() => {
      setTimer(prev => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [isTimerRunning, timer])

  // Format timer display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Handle answer submission
  const handleSubmitAnswer = async () => {
    if (!selectedAnswer) return
    
    setIsTimerRunning(false)
    const timeSpent = 84 - timer // Time spent on this question
    setShowResult(true)
    
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer
    
    // Track progress
    try {
      if (profile?.id) {
        await ProgressTracker.trackQuestionAttempt({
          userId: profile.id,
          subject: currentQuestion.subject,
          topic: currentQuestion.topic,
          difficulty: currentQuestion.difficulty,
          isCorrect,
          timeSpent,
        })
      }
    } catch (error) {
      console.error('Progress tracking error:', error)
    }
    
    // Evaluate answer using AI
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Evaluate this answer: Question: ${currentQuestion.text}, User Answer: ${selectedAnswer}, Expected Answer: ${currentQuestion.correctAnswer}`,
          subject: currentQuestion.subject,
          exam: exam
        })
      })
      
      const data = await response.json()
      setEvaluation({
        ...data,
        isCorrect,
        feedback: data.feedback || (isCorrect ? 
          "Correct! Well done." : 
          "Not quite right. Review the solution and try again.")
      })
    } catch (error) {
      console.error('Evaluation error:', error)
      setEvaluation({
        isCorrect,
        feedback: isCorrect ? 
          "Correct! Well done." : 
          "Not quite right. Review the solution and try again."
      })
    }
  }

  // Generate new question
  const generateNewQuestion = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Generate a practice question with 4 multiple choice options for ${subject} ${exam} level`,
          subject,
          exam
        })
      })
      
      const data = await response.json()
      // Parse the AI response to extract question and options
      // For now, use a simple fallback
      const questions = [
        {
          text: "Q. Find the derivative of f(x) = x³ + 2x",
          options: ["3x² + 2", "3x²", "x² + 2", "3x + 2"],
          correctAnswer: "3x² + 2",
          difficulty: "medium" as const,
          subject: "math",
          topic: "calculus"
        },
        {
          text: "Q. Calculate the kinetic energy of a 2kg object moving at 3m/s",
          options: ["6J", "9J", "12J", "18J"],
          correctAnswer: "9J",
          difficulty: "medium" as const,
          subject: "physics",
          topic: "mechanics"
        }
      ]
      
      const newQuestion = questions[Math.floor(Math.random() * questions.length)]
      setCurrentQuestion(newQuestion)
      setSelectedAnswer(null)
      setShowResult(false)
      setEvaluation(null)
      setTimer(84)
      setIsTimerRunning(true)
    } catch (error) {
      console.error('Question generation error:', error)
    } finally {
      setLoading(false)
    }
  }

  const subjectItems = useMemo(
    () => [
      { value: "auto", label: "Auto" },
      { value: "math", label: "Math" },
      { value: "physics", label: "Physics" },
      { value: "chemistry", label: "Chemistry" },
      { value: "biology", label: "Biology" },
      { value: "english", label: "English/Verbal" },
      { value: "general", label: "General" },
    ],
    []
  )
  const examItems = useMemo(
    () => [
      { value: "auto", label: "Auto" },
      { value: "jee", label: "JEE (India)" },
      { value: "neet", label: "NEET (India)" },
      { value: "cbse", label: "CBSE/Boards (India)" },
      { value: "sat", label: "SAT (Global)" },
      { value: "act", label: "ACT (Global)" },
      { value: "ap", label: "AP (Global)" },
      { value: "ib", label: "IB (Global)" },
      { value: "gre", label: "GRE (Global)" },
      { value: "gmat", label: "GMAT (Global)" },
    ],
    []
  )

  async function askAI() {
    const msg = question.trim()
    if (!msg) return
    setLoading(true)
    setAnswer(null)
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: msg, subject, exam }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || "Request failed")
      setAnswer(json.answer ?? "")
    } catch (e: any) {
      setAnswer(`Error: ${e?.message ?? "Unknown error"}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ShellLayout title="Practice (Question Engine)" subtitle="Adaptive MCQs with AI explanations and mistake intelligence." aiStatus="optimizing">
      <div className="space-y-6">
        <div className="glass-card rounded-2xl p-4 sm:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <span className={`rounded-full px-3 py-1 text-xs ${
              currentQuestion.difficulty === 'easy' ? 'bg-green-500/15 text-green-300' :
              currentQuestion.difficulty === 'medium' ? 'bg-yellow-500/15 text-yellow-300' :
              'bg-red-500/15 text-red-300'
            }`}>
              {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
            </span>
            <span className={`text-sm ${timer <= 10 ? 'text-red-400' : 'text-muted-foreground'}`}>
              Timer: {formatTime(timer)}
            </span>
          </div>
          <p className="text-lg text-foreground mb-4">{currentQuestion.text}</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {currentQuestion.options.map((option) => (
              <button 
                key={option} 
                onClick={() => !showResult && setSelectedAnswer(option)}
                disabled={showResult}
                className={`rounded-xl border px-4 py-3 text-left text-sm transition-all ${
                  showResult && option === currentQuestion.correctAnswer
                    ? 'border-green-400 bg-green-500/20 text-green-300'
                    : showResult && option === selectedAnswer && option !== currentQuestion.correctAnswer
                    ? 'border-red-400 bg-red-500/20 text-red-300'
                    : selectedAnswer === option
                    ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300'
                    : 'border-border bg-secondary/40 text-foreground hover:border-cyan-400/50'
                } ${!showResult ? 'cursor-pointer' : 'cursor-not-allowed'}`}
              >
                {option}
                {showResult && option === currentQuestion.correctAnswer && (
                  <span className="ml-2 text-xs">✓ Correct</span>
                )}
                {showResult && option === selectedAnswer && option !== currentQuestion.correctAnswer && (
                  <span className="ml-2 text-xs">✗ Your answer</span>
                )}
              </button>
            ))}
          </div>
          
          {!showResult ? (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
              <Button 
                variant="outline" 
                onClick={generateNewQuestion}
                disabled={loading}
              >
                {loading ? "Generating..." : "New Question"}
              </Button>
              <Button 
                onClick={handleSubmitAnswer}
                disabled={!selectedAnswer || loading}
                className="bg-gradient-to-r from-indigo-500 to-cyan-500 text-white"
              >
                Submit Answer
              </Button>
            </div>
          ) : (
            <div className="mt-4 space-y-4">
              {evaluation && (
                <div className={`rounded-lg p-4 ${
                  evaluation.isCorrect ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-sm font-semibold ${
                      evaluation.isCorrect ? 'text-green-300' : 'text-red-300'
                    }`}>
                      {evaluation.isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{evaluation.feedback}</p>
                </div>
              )}
              
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Button variant="secondary" onClick={() => setAskOpen(true)}>
                  Ask AI for Help
                </Button>
                <Button onClick={generateNewQuestion} disabled={loading}>
                  {loading ? "Generating..." : "Next Question"}
                </Button>
              </div>
            </div>
          )}
        </div>

        {showResult && (
          <Tabs defaultValue="explanation" className="glass-card rounded-xl p-4">
            <TabsList className="h-auto w-full flex-wrap justify-start bg-secondary/70">
              <TabsTrigger value="explanation">AI Explanation</TabsTrigger>
              <TabsTrigger value="mistakes">Mistake Analysis</TabsTrigger>
              <TabsTrigger value="similar">Similar Questions</TabsTrigger>
            </TabsList>
            <TabsContent value="explanation" className="mt-3 text-sm text-muted-foreground">
              {evaluation?.answer || `Step-by-step solution for ${currentQuestion.text}:
1. Identify the core concept
2. Apply the relevant formula
3. Show intermediate steps
4. Verify the answer
5. Final result: ${currentQuestion.correctAnswer}`}
            </TabsContent>
            <TabsContent value="mistakes" className="mt-3 text-sm text-muted-foreground">
              {evaluation?.improvement || 
                `Common mistakes in ${currentQuestion.topic}:
• Not checking units or dimensions
• Skipping verification steps
• Calculation errors in intermediate steps
• Misapplying formulas
Focus on these areas to improve accuracy.`}
            </TabsContent>
            <TabsContent value="similar" className="mt-3 text-sm text-muted-foreground">
              Recommended practice set for {currentQuestion.subject} - {currentQuestion.topic}:
• 5 questions at {currentQuestion.difficulty} level
• 3 questions at next difficulty level
• 2 mixed-concept problems
• Focus on weak areas identified from recent attempts
            </TabsContent>
          </Tabs>
        )}
      </div>

      <Dialog open={askOpen} onOpenChange={setAskOpen}>
        <DialogContent className="glass-card border-border">
          <DialogHeader>
            <DialogTitle>Ask AI</DialogTitle>
            <DialogDescription>Get help, generate practice, or evaluate a solution.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-2">
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjectItems.map((it) => (
                    <SelectItem key={it.value} value={it.value}>
                      {it.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={exam} onValueChange={setExam}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Exam" />
                </SelectTrigger>
                <SelectContent>
                  {examItems.map((it) => (
                    <SelectItem key={it.value} value={it.value}>
                      {it.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask (e.g., 'Evaluate my solution for ∫2x dx' or 'Generate 5 JEE hard questions on integration')"
              className="min-h-24 bg-secondary/40"
            />
            <div className="flex items-center justify-end gap-2">
              <Button
                onClick={askAI}
                disabled={loading || !question.trim()}
                className="bg-gradient-to-r from-indigo-500 to-cyan-500 text-white"
              >
                {loading ? "Thinking..." : "Ask"}
              </Button>
            </div>

            {answer && (
              <div className="rounded-lg border border-border bg-secondary/40 p-3 text-sm text-muted-foreground whitespace-pre-wrap">
                {answer}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </ShellLayout>
  )
}
