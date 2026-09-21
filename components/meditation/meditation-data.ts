export type StressLevel = "calm" | "mild" | "elevated" | "high" | "critical"

export type StressSignals = {
  tension: number
  overwhelm: number
  sleepDebt: number
  examPressure: number
  emotionalWeight: number
}

export type SessionKind =
  | "calm-reset"
  | "box-breathing"
  | "exam-ease"
  | "sleep-wind-down"
  | "body-scan"
  | "heart-heal"
  | "ocean-release"
  | "loving-kindness"

export type HealingScene =
  | "moon-lake"
  | "forest-mist"
  | "ocean-dusk"
  | "aurora-soft"
  | "temple-glow"

export type SoundscapeId =
  | "soft-pads"
  | "rain-garden"
  | "ocean-breath"
  | "forest-night"
  | "singing-bowl"

export type MeditationSession = {
  id: SessionKind
  title: string
  durationSec: number
  description: string
  bestFor: StressLevel[]
  inhale: number
  hold: number
  exhale: number
  holdOut?: number
  cue: string
  scene: HealingScene
  soundscape: SoundscapeId
  nature: string
}

export const HEALING_SCENES: Record<
  HealingScene,
  { label: string; mood: string; gradient: string; accent: string }
> = {
  "moon-lake": {
    label: "Moon Lake",
    mood: "Still water · silver calm",
    gradient: "from-[#07121f] via-[#0c1a2e] to-[#13263f]",
    accent: "rgba(125, 211, 252, 0.22)",
  },
  "forest-mist": {
    label: "Forest Mist",
    mood: "Soft green · grounded breath",
    gradient: "from-[#06140f] via-[#0c1f18] to-[#143028]",
    accent: "rgba(110, 231, 183, 0.2)",
  },
  "ocean-dusk": {
    label: "Ocean Dusk",
    mood: "Deep blue · release waves",
    gradient: "from-[#070b18] via-[#0d1630] to-[#1a2850]",
    accent: "rgba(96, 165, 250, 0.24)",
  },
  "aurora-soft": {
    label: "Soft Aurora",
    mood: "Violet light · gentle repair",
    gradient: "from-[#0a0818] via-[#15102a] to-[#1f1a3a]",
    accent: "rgba(196, 181, 253, 0.22)",
  },
  "temple-glow": {
    label: "Temple Glow",
    mood: "Warm amber · heart ease",
    gradient: "from-[#120c08] via-[#1c140e] to-[#2a1c14]",
    accent: "rgba(251, 191, 36, 0.18)",
  },
}

export const SOUNDSCAPES: {
  id: SoundscapeId
  title: string
  description: string
}[] = [
  {
    id: "soft-pads",
    title: "Soft Healing Pads",
    description: "Warm ambient tones that settle the nervous system.",
  },
  {
    id: "rain-garden",
    title: "Rain Garden",
    description: "Gentle rain texture for quiet emotional release.",
  },
  {
    id: "ocean-breath",
    title: "Ocean Breath",
    description: "Slow tide cycles that match long exhales.",
  },
  {
    id: "forest-night",
    title: "Forest Night",
    description: "Soft night air and distant calm presence.",
  },
  {
    id: "singing-bowl",
    title: "Singing Bowl",
    description: "Resonant bowl pulses for deep mind stillness.",
  },
]

export const MEDITATION_SESSIONS: MeditationSession[] = [
  {
    id: "heart-heal",
    title: "Heart Heal",
    durationSec: 300,
    description: "Deep emotional soothing — soften pressure in the chest and restore inner safety.",
    bestFor: ["elevated", "high", "critical"],
    inhale: 4,
    hold: 2,
    exhale: 7,
    cue: "Breathe into the heart. Let kindness meet whatever feels heavy.",
    scene: "temple-glow",
    soundscape: "singing-bowl",
    nature: "Deep healing",
  },
  {
    id: "ocean-release",
    title: "Ocean Release",
    durationSec: 360,
    description: "Wave-like breathing to wash out exam stress and mental noise.",
    bestFor: ["mild", "elevated", "high"],
    inhale: 4,
    hold: 0,
    exhale: 8,
    cue: "On each exhale, let one worry drift out with the tide.",
    scene: "ocean-dusk",
    soundscape: "ocean-breath",
    nature: "Emotional release",
  },
  {
    id: "calm-reset",
    title: "Calm Sanctuary",
    durationSec: 240,
    description: "Enter a peaceful inner room — slow breath, soft imagery, quiet mind.",
    bestFor: ["calm", "mild", "elevated"],
    inhale: 4,
    hold: 0,
    exhale: 6,
    cue: "Shoulders drop. Jaw soft. You are safe to rest here.",
    scene: "moon-lake",
    soundscape: "soft-pads",
    nature: "Peaceful calm",
  },
  {
    id: "loving-kindness",
    title: "Loving-Kindness",
    durationSec: 300,
    description: "Warm phrases for self-compassion after harsh study days.",
    bestFor: ["mild", "elevated", "high", "critical"],
    inhale: 4,
    hold: 1,
    exhale: 6,
    cue: "May I be calm. May I be steady. May I be kind to myself.",
    scene: "aurora-soft",
    soundscape: "soft-pads",
    nature: "Compassion heal",
  },
  {
    id: "body-scan",
    title: "Body Soften",
    durationSec: 320,
    description: "Release desk tension from forehead to feet with healing stillness.",
    bestFor: ["elevated", "high", "critical"],
    inhale: 4,
    hold: 0,
    exhale: 6,
    cue: "Scan gently. Soften what you find. No forcing.",
    scene: "forest-mist",
    soundscape: "forest-night",
    nature: "Somatic heal",
  },
  {
    id: "box-breathing",
    title: "Steady Box Calm",
    durationSec: 240,
    description: "Equal breath sides to settle racing thoughts — calm, not productivity.",
    bestFor: ["elevated", "high"],
    inhale: 4,
    hold: 4,
    exhale: 4,
    holdOut: 4,
    cue: "Equal sides. Soft edges. The mind can rest.",
    scene: "moon-lake",
    soundscape: "rain-garden",
    nature: "Nervous system reset",
  },
  {
    id: "exam-ease",
    title: "Exam Ease",
    durationSec: 300,
    description: "Pre-test grounding with peaceful sound and confidence warmth.",
    bestFor: ["high", "critical", "elevated"],
    inhale: 4,
    hold: 2,
    exhale: 7,
    cue: "You are enough in this moment. Breathe out the rush.",
    scene: "aurora-soft",
    soundscape: "singing-bowl",
    nature: "Anxiety ease",
  },
  {
    id: "sleep-wind-down",
    title: "Night Wind-Down",
    durationSec: 420,
    description: "Deep rest ritual for sleep debt — darker, slower, more healing.",
    bestFor: ["mild", "elevated", "high"],
    inhale: 4,
    hold: 0,
    exhale: 8,
    cue: "The day can end. Soften into restorative dark.",
    scene: "ocean-dusk",
    soundscape: "ocean-breath",
    nature: "Restorative sleep",
  },
]

export function scoreFromSignals(s: StressSignals): number {
  const raw =
    s.tension * 2.2 +
    s.overwhelm * 2.4 +
    s.sleepDebt * 1.8 +
    s.examPressure * 2.0 +
    s.emotionalWeight * 1.8
  return Math.min(100, Math.round(raw))
}

export function levelFromScore(score: number): StressLevel {
  if (score < 22) return "calm"
  if (score < 40) return "mild"
  if (score < 58) return "elevated"
  if (score < 78) return "high"
  return "critical"
}

export function levelLabel(level: StressLevel): string {
  switch (level) {
    case "calm":
      return "Calm & steady"
    case "mild":
      return "Mild stress"
    case "elevated":
      return "Elevated stress"
    case "high":
      return "High stress"
    case "critical":
      return "Critical load"
  }
}

export function levelColor(level: StressLevel): string {
  switch (level) {
    case "calm":
      return "text-emerald-300"
    case "mild":
      return "text-sky-300"
    case "elevated":
      return "text-amber-300"
    case "high":
      return "text-orange-300"
    case "critical":
      return "text-rose-300"
  }
}

export function levelRing(level: StressLevel): string {
  switch (level) {
    case "calm":
      return "from-emerald-400/40 to-sky-400/20"
    case "mild":
      return "from-sky-400/40 to-primary/20"
    case "elevated":
      return "from-amber-400/40 to-orange-400/20"
    case "high":
      return "from-orange-400/50 to-rose-400/25"
    case "critical":
      return "from-rose-500/50 to-fuchsia-500/25"
  }
}

export function recommendSessions(level: StressLevel): MeditationSession[] {
  const ranked = [...MEDITATION_SESSIONS].sort((a, b) => {
    const aHit = a.bestFor.includes(level) ? 0 : 1
    const bHit = b.bestFor.includes(level) ? 0 : 1
    return aHit - bHit
  })
  return ranked.slice(0, 4)
}

export function wellbeingTips(level: StressLevel): string[] {
  switch (level) {
    case "calm":
      return [
        "Protect this peace with a short sanctuary session tonight.",
        "Sip water slowly — let calm settle into the body.",
        "A few minutes of soft music can keep the nervous system open.",
      ]
    case "mild":
      return [
        "Try Calm Sanctuary or Rain Garden sound before the next study block.",
        "Unclench your jaw and drop your shoulders right now.",
        "Write one worry down, then return to breath.",
      ]
    case "elevated":
      return [
        "Ocean Release + ocean sound can wash down the spike.",
        "Dim the screen brightness and slow your blink rate.",
        "Offload three tasks onto paper — free the mind.",
      ]
    case "high":
      return [
        "Heart Heal or Exam Ease before any high-pressure work.",
        "Talk gently to yourself for one minute — stress softens with kindness.",
        "Shorten the next block; healing first improves later results.",
      ]
    case "critical":
      return [
        "Pause. Rest is healing, not failure.",
        "Body Soften + singing bowl, then water and a stretch.",
        "If anxiety feels overwhelming, reach a trusted adult or counselor.",
      ]
  }
}

export const RELIEF_TOOLS = [
  {
    id: "ground-54321",
    title: "5–4–3–2–1 Grounding",
    body: "Name 5 things you see, 4 you feel, 3 you hear, 2 you smell, 1 you taste.",
  },
  {
    id: "hand-warmth",
    title: "Hand on Heart",
    body: "Place a palm on your chest. Breathe for 60 seconds. Feel warmth return.",
  },
  {
    id: "release-write",
    title: "Stress Release Note",
    body: "Write what hurts for 2 minutes — then close the note. The mind can rest.",
  },
  {
    id: "muscle-melt",
    title: "Muscle Melt",
    body: "Tighten shoulders 5 seconds, then melt. Repeat jaw, hands, and belly.",
  },
] as const

export const STRESS_HISTORY_KEY = "quantrion_meditation_stress_history"
export const SESSION_STREAK_KEY = "quantrion_meditation_streak"
export const SOUND_PREF_KEY = "quantrion_meditation_soundscape"

export type StressHistoryEntry = {
  at: string
  score: number
  level: StressLevel
}
