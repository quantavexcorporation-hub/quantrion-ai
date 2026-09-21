import { Suspense } from "react"
import SignupForm from "./signup-form"

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background">
          <p className="animate-pulse text-sm text-muted-foreground">Loading signup...</p>
        </div>
      }
    >
      <SignupForm />
    </Suspense>
  )
}
