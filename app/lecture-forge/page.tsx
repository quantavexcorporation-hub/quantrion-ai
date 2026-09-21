"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

/** Legacy path → LectureCognis sidebar section. */
export default function LectureForgeRedirectPage() {
  const router = useRouter()
  useEffect(() => {
    router.replace("/lecture-cognis")
  }, [router])
  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-sm text-muted-foreground">
      Opening LectureCognis…
    </div>
  )
}
