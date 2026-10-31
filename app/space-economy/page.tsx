"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

/** Space Missions courses now live inside Future of Industries. */
export default function SpaceEconomyRedirectPage() {
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
