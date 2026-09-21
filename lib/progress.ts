import { db } from './db'

export interface StudyProgress {
  userId: string
  subject: string
  topic: string
  questionsAttempted: number
  questionsCorrect: number
  averageTime: number
  difficulty: 'easy' | 'medium' | 'hard'
  lastStudied: Date
  streak: number
  masteryLevel: number // 0-100
}

export interface DailyStats {
  userId: string
  date: string
  studyTime: number // minutes
  questionsAttempted: number
  questionsCorrect: number
  subjectsStudied: string[]
  aiInteractions: number
  microActionsCompleted: number
}

export interface WeeklyProgress {
  userId: string
  weekStart: string
  dailyStats: DailyStats[]
  totalStudyTime: number
  totalQuestions: number
  accuracy: number
  streakDays: number
  topSubjects: Array<{ subject: string; time: number; accuracy: number }>
}

export class ProgressTracker {
  // Track question attempt
  static async trackQuestionAttempt(params: {
    userId: string
    subject: string
    topic: string
    difficulty: 'easy' | 'medium' | 'hard'
    isCorrect: boolean
    timeSpent: number
  }) {
    const userId = params.userId
    if (!userId) return null
    
    // Update or create progress record
    let progress = await db.progress.findByUserAndSubject(userId, params.subject)
    
    if (!progress) {
      progress = {
        userId,
        subject: params.subject,
        topic: params.topic,
        questionsAnswered: 0,
        correctAnswers: 0,
        questionsAttempted: 0,
        questionsCorrect: 0,
        averageTime: 0,
        difficulty: params.difficulty,
        lastStudied: new Date(),
        streak: 1,
        weakAreas: [],
        strongAreas: [],
        masteryLevel: 0
      }
    }

    // Update progress
    progress.questionsAttempted += 1
    progress.questionsAnswered += 1
    if (params.isCorrect) {
      progress.questionsCorrect += 1
      progress.correctAnswers += 1
    }
    
    // Calculate new average time
    progress.averageTime = (progress.averageTime * (progress.questionsAttempted - 1) + params.timeSpent) / progress.questionsAttempted
    
    // Update mastery level
    progress.masteryLevel = (progress.questionsCorrect / progress.questionsAttempted) * 100
    
    // Update streak (simplified - in production, check consecutive days)
    if (params.isCorrect) {
      progress.streak += 1
    } else {
      progress.streak = Math.max(1, progress.streak - 1)
    }

    progress.lastStudied = new Date()
    
    await db.progress.upsert(progress)
    
    // Update daily stats
    await this.updateDailyStats(userId, {
      questionsAttempted: 1,
      questionsCorrect: params.isCorrect ? 1 : 0,
      subjectsStudied: [params.subject],
      studyTime: Math.ceil(params.timeSpent / 60) // Convert to minutes
    })

    return progress
  }

  // Track AI interaction
  static async trackAIInteraction(subject: string, interactionType: 'question' | 'explanation' | 'practice') {
    const userId = 'demo-user'
    
    await this.updateDailyStats(userId, {
      aiInteractions: 1,
      subjectsStudied: [subject]
    })
  }

  // Track micro-action completion
  static async trackMicroActionCompleted(actionId: string, impact: number) {
    const userId = 'demo-user'
    
    await this.updateDailyStats(userId, {
      microActionsCompleted: 1
    })

    // Update user progress score
    const user = await db.users.findById(userId)
    if (user) {
      console.log(`Micro-action ${actionId} completed with impact: ${impact}`)
    }
  }

  // Update daily statistics
  private static async updateDailyStats(userId: string, updates: Partial<DailyStats>) {
    const today = new Date().toISOString().split('T')[0]
    
    // In production, this would query existing daily stats
    // For now, simulate the update
    console.log(`Daily stats updated for user ${userId}:`, updates)
  }

  // Get user progress overview
  static async getProgressOverview(userId: string) {
    const userProgress = await db.progress.findByUserId(userId)
    
    const totalQuestions = userProgress.reduce((sum, p) => sum + p.questionsAttempted, 0)
    const totalCorrect = userProgress.reduce((sum, p) => sum + p.questionsCorrect, 0)
    const overallAccuracy = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0
    
    const subjects = userProgress.map(p => ({
      subject: p.subject,
      accuracy: p.questionsAttempted > 0 ? (p.questionsCorrect / p.questionsAttempted) * 100 : 0,
      questionsAttempted: p.questionsAttempted,
      masteryLevel: p.masteryLevel || 0,
      lastStudied: p.lastStudied,
      streak: p.streak
    }))

    return {
      overallAccuracy,
      totalQuestions,
      totalCorrect,
      subjects,
      studyStreak: this.calculateStudyStreak(userProgress),
      weakAreas: this.identifyWeakAreas(userProgress),
      strongAreas: this.identifyStrongAreas(userProgress)
    }
  }

  // Calculate study streak
  private static calculateStudyStreak(progress: any[]): number {
    // Simplified streak calculation
    const today = new Date()
    let streak = 0
    
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today)
      checkDate.setDate(today.getDate() - i)
      
      const hasActivity = progress.some(p => {
        const activityDate = new Date(p.lastStudied)
        return activityDate.toDateString() === checkDate.toDateString()
      })
      
      if (hasActivity) {
        streak++
      } else if (i > 0) {
        break
      }
    }
    
    return streak
  }

  // Identify weak areas
  private static identifyWeakAreas(progress: any[]): string[] {
    return progress
      .filter(p => (p.questionsCorrect / p.questionsAttempted) < 0.6)
      .map(p => `${p.subject} - ${p.topic}`)
  }

  // Identify strong areas
  private static identifyStrongAreas(progress: any[]): string[] {
    return progress
      .filter(p => (p.questionsCorrect / p.questionsAttempted) >= 0.8)
      .map(p => `${p.subject} - ${p.topic}`)
  }

  // Get personalized recommendations
  static async getRecommendations(userId: string) {
    const overview = await this.getProgressOverview(userId)
    
    const recommendations = []
    
    // Recommend focus on weak areas
    if (overview.weakAreas.length > 0) {
      recommendations.push({
        type: 'study',
        priority: 'high',
        title: 'Focus on Weak Areas',
        description: `Spend extra time on: ${overview.weakAreas.slice(0, 2).join(', ')}`,
        action: 'practice'
      })
    }
    
    // Recommend maintenance of strong areas
    if (overview.strongAreas.length > 0) {
      recommendations.push({
        type: 'review',
        priority: 'medium',
        title: 'Maintain Strong Areas',
        description: `Quick review of: ${overview.strongAreas.slice(0, 2).join(', ')}`,
        action: 'review'
      })
    }
    
    // Recommend new topics if accuracy is high
    if (overview.overallAccuracy > 85) {
      recommendations.push({
        type: 'advance',
        priority: 'medium',
        title: 'Ready for Advanced Topics',
        description: 'Your accuracy is excellent! Try harder questions or new topics.',
        action: 'advance'
      })
    }
    
    // Recommend consistency if streak is low
    if (overview.studyStreak < 3) {
      recommendations.push({
        type: 'consistency',
        priority: 'high',
        title: 'Build Study Consistency',
        description: 'Try to study daily, even if just for 15 minutes.',
        action: 'daily'
      })
    }
    
    return recommendations
  }

  // Generate progress report
  static async generateProgressReport(userId: string, period: 'week' | 'month' = 'week') {
    const overview = await this.getProgressOverview(userId)
    const recommendations = await this.getRecommendations(userId)
    
    return {
      period,
      generatedAt: new Date(),
      overview,
      recommendations,
      achievements: this.getAchievements(overview),
      nextMilestones: this.getNextMilestones(overview)
    }
  }

  // Get user achievements
  private static getAchievements(overview: any) {
    const achievements = []
    
    if (overview.totalQuestions >= 100) {
      achievements.push({ name: 'Century Club', description: 'Answered 100+ questions' })
    }
    
    if (overview.overallAccuracy >= 90) {
      achievements.push({ name: 'Accuracy Master', description: '90%+ overall accuracy' })
    }
    
    if (overview.studyStreak >= 7) {
      achievements.push({ name: 'Week Warrior', description: '7-day study streak' })
    }
    
    if (overview.subjects.length >= 3) {
      achievements.push({ name: 'Versatile Learner', description: 'Studied 3+ subjects' })
    }
    
    return achievements
  }

  // Get next milestones
  private static getNextMilestones(overview: any) {
    const milestones = []
    
    if (overview.totalQuestions < 100) {
      milestones.push({
        title: 'Century Club',
        progress: overview.totalQuestions,
        target: 100,
        description: 'Answer 100 questions total'
      })
    }
    
    if (overview.overallAccuracy < 90) {
      milestones.push({
        title: 'Accuracy Master',
        progress: overview.overallAccuracy,
        target: 90,
        description: 'Achieve 90% overall accuracy'
      })
    }
    
    if (overview.studyStreak < 7) {
      milestones.push({
        title: 'Week Warrior',
        progress: overview.studyStreak,
        target: 7,
        description: 'Maintain a 7-day study streak'
      })
    }
    
    return milestones
  }
}
