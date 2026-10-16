"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

/** Meditation lives inside Focus Mode — keep old /meditation links working. */
export default function MeditationRedirectPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/focus-mode#meditation")
  }, [router])

  return (
    <div className="flex min-h-[40vh] items-center justify-center text-sm text-muted-foreground">
      Opening Meditation inside Focus Mode…
    </div>
  )
}
