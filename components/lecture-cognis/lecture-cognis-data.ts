export type VideoKind =
  | "full-lecture"
  | "quicklearn-short"
  | "explain-simpler"
  | "visual-diagram"
  | "revision-recap"

export type JobStatus = "queued" | "scripting" | "voicing" | "rendering" | "uploading" | "live" | "failed"

export const VIDEO_KINDS: {
  id: VideoKind
  title: string
  blurb: string
  duration: string
}[] = [
  {
    id: "full-lecture",
    title: "Full Lecture",
    blurb: "3–8 min deep concept video for course lessons.",
    duration: "3–8 min",
  },
  {
    id: "quicklearn-short",
    title: "QuickLearn Short",
    blurb: "60–90 sec twin for the QuickLearn feed.",
    duration: "60–90s",
  },
  {
    id: "explain-simpler",
    title: "Explain Simpler",
    blurb: "Softer analogy version when a learner is stuck.",
    duration: "2–4 min",
  },
  {
    id: "visual-diagram",
    title: "Visual Diagram",
    blurb: "Diagram-first explainer for formulas & systems.",
    duration: "1–3 min",
  },
  {
    id: "revision-recap",
    title: "Revision Recap",
    blurb: "Fast end-of-module summary for spaced review.",
    duration: "90s",
  },
]

export const PIPELINE_STEPS = [
  { id: "scripting", label: "Direct", detail: "AI cinematic education script + scenes" },
  { id: "voicing", label: "Voice", detail: "Cinema-grade TTS narration" },
  { id: "rendering", label: "Compose", detail: "Mood, motion, camera, accents" },
  { id: "uploading", label: "Studio", detail: "Timeline editor + scene inspector" },
  { id: "live", label: "Live", detail: "Publish to Courses & QuickLearn" },
] as const

export const DESTINATION_TARGETS = [
  { id: "courses", label: "Course lessons", href: "/learn" },
  { id: "quicklearn", label: "QuickLearn", href: "/quick-learn" },
  { id: "future", label: "Future of Industries", href: "/future-courses" },
  { id: "industries", label: "Explore Industries", href: "/q2" },
  { id: "space", label: "Space Economy", href: "/space-economy" },
] as const

export function statusLabel(status: JobStatus) {
  switch (status) {
    case "queued":
      return "Queued"
    case "scripting":
      return "Scripting"
    case "voicing":
      return "Voicing"
    case "rendering":
      return "Rendering"
    case "uploading":
      return "Publishing"
    case "live":
      return "Live"
    case "failed":
      return "Failed"
  }
}

export function kindLabel(kind: VideoKind) {
  return VIDEO_KINDS.find((k) => k.id === kind)?.title ?? kind
}
