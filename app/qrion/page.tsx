"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

/** Space Technology lives inside Space Missions — keep old /qrion links working. */
export default function QrionRedirectPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/future-courses")
  }, [router])

  return (
    <div className="flex min-h-[40vh] items-center justify-center text-sm text-muted-foreground">
      Opening Future of Industries…
    </div>
  )
}
