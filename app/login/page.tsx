import { Suspense } from "react"
import LoginRedirect from "./login-redirect"

function LoginFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <p className="animate-pulse text-sm text-muted-foreground">Opening Quantrion...</p>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginRedirect />
    </Suspense>
  )
}
