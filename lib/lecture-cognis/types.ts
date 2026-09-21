import type { VideoKind } from "@/components/lecture-cognis/lecture-cognis-data"

export type ForgeJobStatus =
  | "queued"
  | "scripting"
  | "voicing"
  | "rendering"
  | "uploading"
  | "live"
  | "failed"

export type SceneMood = "cosmos" | "quantum" | "energy" | "neural" | "crystal" | "forge" | "ocean"
export type SceneMotion = "drift" | "pulse" | "orbit" | "rise" | "scan" | "bloom"
export type SceneCamera = "wide" | "close" | "orbit" | "hero"

export type LectureSlide = {
  id: string
  title: string
  body: string
  visualHint: string
  startSec: number
  endSec: number
  /** Cinematic education look */
  mood?: SceneMood
  motion?: SceneMotion
  camera?: SceneCamera
  accent?: string
  onScreenLine?: string
}

export type LectureQuizItem = {
  question: string
  options: string[]
  answerIndex: number
  explanation: string
}

export type LecturePack = {
  id: string
  topic: string
  course: string
  kinds: VideoKind[]
  status: ForgeJobStatus
  progress: number
  createdAt: string
  updatedAt: string
  error?: string
  scriptFull?: string
  scriptShort?: string
  slides?: LectureSlide[]
  quiz?: LectureQuizItem[]
  audioFullUrl?: string
  audioShortUrl?: string
  packUrl?: string
  durationSec?: number
  engine?: string
  /** Studio metadata */
  stylePreset?: "cinematic-edu" | "minimal" | "neon-lab"
  aspect?: "16:9" | "9:16"
}

export type GenerateLectureInput = {
  topic: string
  course?: string
  kinds: VideoKind[]
  stylePreset?: LecturePack["stylePreset"]
}

export function retimedSlides(slides: LectureSlide[]): { slides: LectureSlide[]; durationSec: number } {
  let t = 0
  const next = slides.map((s, i) => {
    const dur = Math.max(4, (s.endSec || 0) - (s.startSec || 0) || 12)
    const startSec = t
    const endSec = t + dur
    t = endSec
    return { ...s, id: s.id || `slide-${i + 1}`, startSec, endSec }
  })
  return { slides: next, durationSec: t }
}
