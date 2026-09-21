"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SpaceEconomyExpertsRedirectPage() {
  const router = useRouter()
  useEffect(() => {
    router.replace("/space-guidance")
  }, [router])
  return (
    <div className="flex min-h-[40vh] items-center justify-center text-sm text-muted-foreground">
      Opening Space Guidance…
    </div>
  )
}
