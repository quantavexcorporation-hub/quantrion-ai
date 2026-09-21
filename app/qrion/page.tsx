"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

/** Space Technology lives inside Space Economy — keep old /qrion links working. */
export default function QrionRedirectPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/space-economy#space-technology")
  }, [router])

  return (
    <div className="flex min-h-[40vh] items-center justify-center text-sm text-muted-foreground">
      Opening Space Technology inside Space Economy…
    </div>
  )
}
