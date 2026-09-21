import { Suspense } from "react"

export default function CheckEmailLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<p className="p-8 text-center text-sm text-muted-foreground">Loading...</p>}>{children}</Suspense>
}
