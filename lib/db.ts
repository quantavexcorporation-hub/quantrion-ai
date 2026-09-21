// Simple database implementation for MVP
// Will upgrade to PostgreSQL + Prisma later

export interface User {
  id: string
  email: string
  name: string
  image?: string
  passwordHash?: string
  plan: 'free' | 'pro' | 'elite'
  addons: string[]
  createdAt: Date
  updatedAt: Date
}

export interface UserProgress {
  userId: string
  subject: string
  topic: string
  questionsAnswered: number
  correctAnswers: number
  questionsAttempted: number
  questionsCorrect: number
  averageTime: number
  difficulty: 'easy' | 'medium' | 'hard'
  lastStudied: Date
  streak: number
  weakAreas: string[]
  strongAreas: string[]
  masteryLevel: number
}

export interface StudySession {
  id: string
  userId: string
  subject: string
  topic: string
  startTime: Date
  endTime?: Date
  questionsAnswered: number
  accuracy: number
  aiInteractions: number
}

// In-memory storage (for development)
// Use global caches so data survives route module reloads in dev.
declare global {
  var __q1Users: Map<string, User> | undefined
  var __q1UserProgress: Map<string, UserProgress> | undefined
  var __q1StudySessions: Map<string, StudySession> | undefined
}

const users = globalThis.__q1Users ?? new Map<string, User>()
const userProgress = globalThis.__q1UserProgress ?? new Map<string, UserProgress>()
const studySessions = globalThis.__q1StudySessions ?? new Map<string, StudySession>()

globalThis.__q1Users = users
globalThis.__q1UserProgress = userProgress
globalThis.__q1StudySessions = studySessions

export const db = {
  users: {
    async create(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
      const user: User = {
        ...data,
        id: Math.random().toString(36).substring(7),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      users.set(user.id, user)
      return user
    },
    
    async findByEmail(email: string): Promise<User | null> {
      const normalizedEmail = email.trim().toLowerCase()
      for (const user of users.values()) {
        if (user.email.toLowerCase() === normalizedEmail) return user
      }
      return null
    },
    
    async findById(id: string): Promise<User | null> {
      return users.get(id) || null
    },
    
    async update(id: string, data: Partial<User>): Promise<User | null> {
      const user = users.get(id)
      if (!user) return null
      
      const updated = { ...user, ...data, updatedAt: new Date() }
      users.set(id, updated)
      return updated
    }
  },
  
  progress: {
    async upsert(data: UserProgress): Promise<UserProgress> {
      userProgress.set(`${data.userId}-${data.subject}`, data)
      return data
    },
    
    async findByUserId(userId: string): Promise<UserProgress[]> {
      return Array.from(userProgress.values()).filter(p => p.userId === userId)
    },
    
    async findByUserAndSubject(userId: string, subject: string): Promise<UserProgress | null> {
      return userProgress.get(`${userId}-${subject}`) || null
    }
  },
  
  sessions: {
    async create(data: Omit<StudySession, 'id'>): Promise<StudySession> {
      const session: StudySession = {
        ...data,
        id: Math.random().toString(36).substring(7),
      }
      studySessions.set(session.id, session)
      return session
    },
    
    async update(id: string, data: Partial<StudySession>): Promise<StudySession | null> {
      const session = studySessions.get(id)
      if (!session) return null
      
      const updated = { ...session, ...data }
      studySessions.set(id, updated)
      return updated
    },
    
    async findByUserId(userId: string): Promise<StudySession[]> {
      return Array.from(studySessions.values())
        .filter(s => s.userId === userId)
        .sort((a, b) => b.startTime.getTime() - a.startTime.getTime())
    }
  }
}
