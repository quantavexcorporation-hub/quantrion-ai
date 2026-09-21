import OpenAI from "openai"
import type { VideoKind } from "@/components/lecture-cognis/lecture-cognis-data"
import { jobPublicBase, updatePack, writeBinary, writePack } from "./store"
import type {
  GenerateLectureInput,
  LecturePack,
  LectureQuizItem,
  LectureSlide,
  SceneCamera,
  SceneMood,
  SceneMotion,
} from "./types"

function getOpenAI() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY — LectureCognis needs OpenAI to forge scripts and voice.")
  }
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
}

function newJobId() {
  return `lf-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

type ScriptPayload = {
  scriptFull: string
  scriptShort: string
  slides: Array<{
    title: string
    body: string
    visualHint: string
    durationSec: number
    mood?: SceneMood
    motion?: SceneMotion
    camera?: SceneCamera
    accent?: string
    onScreenLine?: string
  }>
  quiz: LectureQuizItem[]
}

function extractJson(text: string): ScriptPayload {
  const cleaned = text.replace(/```json\s*/gi, "").replace(/```/g, "").trim()
  const start = cleaned.indexOf("{")
  const end = cleaned.lastIndexOf("}")
  if (start < 0 || end < 0) throw new Error("AI did not return valid lecture JSON")
  return JSON.parse(cleaned.slice(start, end + 1)) as ScriptPayload
}

async function generateScripts(topic: string, course: string, kinds: VideoKind[]): Promise<ScriptPayload> {
  const openai = getOpenAI()
  const wantsShort = kinds.includes("quicklearn-short") || kinds.includes("revision-recap")
  const wantsSimpler = kinds.includes("explain-simpler")

  const completion = await openai.chat.completions.create({
    model: process.env.lecture_cognis_MODEL || "gpt-4o-mini",
    temperature: 0.6,
    max_tokens: 4200,
    messages: [
      {
        role: "system",
        content:
          "You are LectureCognis Cinema, Quantrion's world-class AI education video director. You write cinematic educational lectures: Hollywood clarity + deep teaching. Return ONLY valid JSON. No markdown.",
      },
      {
        role: "user",
        content: `Direct a cinematic education lecture for Quantrion LectureCognis Studio.

Topic: ${topic}
Course/module: ${course}
Video kinds: ${kinds.join(", ")}

Return JSON:
{
  "scriptFull": "spoken narration 100-160 seconds, vivid but precise, no stage directions",
  "scriptShort": "45-70 second punchy twin for QuickLearn",
  "slides": [
    {
      "title": "scene title",
      "body": "1-2 teaching sentences on screen",
      "visualHint": "cinematic visual description",
      "durationSec": 14,
      "mood": "cosmos|quantum|energy|neural|crystal|forge|ocean",
      "motion": "drift|pulse|orbit|rise|scan|bloom",
      "camera": "wide|close|orbit|hero",
      "accent": "#22d3ee",
      "onScreenLine": "short kinetic caption"
    }
  ],
  "quiz": [
    { "question": "...", "options": ["A","B","C","D"], "answerIndex": 0, "explanation": "..." }
  ]
}

Rules:
- 5 to 7 scenes with strong visual variety (vary mood/motion/camera)
- Think education cinema: hook → concept visual → analogy → mechanism → mastery
- scriptFull speakable aloud; no bullets
- ${wantsSimpler ? "Simpler analogies for explain-simpler." : "Serious college / industry learner depth."}
- ${wantsShort ? "scriptShort must feel like a premium vertical short." : "scriptShort is a sharp recap."}
- quiz: exactly 3 questions
- Accents should be hex colors that fit Quantrion (cyan/violet/teal/amber)`,
      },
    ],
  })

  const raw = completion.choices[0]?.message?.content || ""
  const payload = extractJson(raw)
  if (!payload.scriptFull?.trim()) throw new Error("Empty lecture script from AI")
  if (!payload.slides?.length) throw new Error("No scenes returned from AI")
  return payload
}

function toTimedSlides(
  slides: ScriptPayload["slides"],
): { slides: LectureSlide[]; durationSec: number } {
  let t = 0
  const moods: SceneMood[] = ["cosmos", "quantum", "energy", "neural", "crystal", "forge", "ocean"]
  const motions: SceneMotion[] = ["drift", "pulse", "orbit", "rise", "scan", "bloom"]
  const cameras: SceneCamera[] = ["wide", "close", "orbit", "hero"]

  const timed: LectureSlide[] = slides.map((s, i) => {
    const dur = Math.max(6, Math.min(40, Number(s.durationSec) || 12))
    const startSec = t
    const endSec = t + dur
    t = endSec
    return {
      id: `slide-${i + 1}`,
      title: s.title,
      body: s.body,
      visualHint: s.visualHint,
      startSec,
      endSec,
      mood: s.mood || moods[i % moods.length],
      motion: s.motion || motions[i % motions.length],
      camera: s.camera || cameras[i % cameras.length],
      accent: s.accent || "#22d3ee",
      onScreenLine: s.onScreenLine || s.title,
    }
  })
  return { slides: timed, durationSec: t }
}

async function synthesizeSpeech(text: string): Promise<Buffer> {
  const openai = getOpenAI()
  const clipped = text.trim().slice(0, 4096)
  const speech = await openai.audio.speech.create({
    model: process.env.lecture_cognis_TTS_MODEL || "tts-1",
    voice:
      (process.env.lecture_cognis_VOICE as
        | "alloy"
        | "echo"
        | "fable"
        | "onyx"
        | "nova"
        | "shimmer") || "nova",
    input: clipped,
  })
  const ab = await speech.arrayBuffer()
  return Buffer.from(ab)
}

/** LectureCognis Cinema pipeline: director script → TTS → cinematic scenes → publish */
export async function runLectureCognis(input: GenerateLectureInput): Promise<LecturePack> {
  const id = newJobId()
  const topic = input.topic.trim()
  const course = (input.course || "Quantrion Curriculum").trim()
  const kinds = input.kinds.length ? input.kinds : (["full-lecture"] as VideoKind[])

  let pack: LecturePack = {
    id,
    topic,
    course,
    kinds,
    status: "queued",
    progress: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    engine: "LectureCognis-cinema-v2",
    stylePreset: input.stylePreset || "cinematic-edu",
    aspect: "16:9",
    packUrl: `${jobPublicBase(id)}/pack.json`,
  }
  await writePack(pack)

  try {
    pack = (await updatePack(id, { status: "scripting", progress: 18 }))!

    const scripts = await generateScripts(topic, course, kinds)
    const { slides, durationSec } = toTimedSlides(scripts.slides)

    pack = (await updatePack(id, {
      status: "voicing",
      progress: 45,
      scriptFull: scripts.scriptFull,
      scriptShort: scripts.scriptShort,
      slides,
      quiz: scripts.quiz,
      durationSec,
    }))!

    const audioFull = await synthesizeSpeech(scripts.scriptFull)
    const audioFullUrl = await writeBinary(id, "audio-full.mp3", audioFull)

    let audioShortUrl: string | undefined
    if (
      kinds.includes("quicklearn-short") ||
      kinds.includes("revision-recap") ||
      kinds.includes("explain-simpler")
    ) {
      pack = (await updatePack(id, { status: "voicing", progress: 62 }))!
      const shortText = scripts.scriptShort || scripts.scriptFull.slice(0, 900)
      const audioShort = await synthesizeSpeech(shortText)
      audioShortUrl = await writeBinary(id, "audio-short.mp3", audioShort)
    }

    pack = (await updatePack(id, {
      status: "rendering",
      progress: 82,
      audioFullUrl,
      audioShortUrl,
    }))!

    pack = (await updatePack(id, { status: "uploading", progress: 92 }))!

    pack = (await updatePack(id, {
      status: "live",
      progress: 100,
      packUrl: `${jobPublicBase(id)}/pack.json`,
    }))!

    return pack!
  } catch (err) {
    const message = err instanceof Error ? err.message : "LectureCognis failed"
    const failed = await updatePack(id, {
      status: "failed",
      progress: 100,
      error: message,
    })
    if (failed) return failed
    pack.status = "failed"
    pack.error = message
    pack.progress = 100
    await writePack(pack)
    return pack
  }
}
