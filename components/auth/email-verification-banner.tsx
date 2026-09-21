import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function EmailVerificationBanner() {
  return (
    <Alert variant="default" className="border-amber-500/40 bg-amber-500/10">
      <AlertTitle>Verify your email</AlertTitle>
      <AlertDescription>
        Check your inbox for the verification link.{" "}
        <Link href="/auth/check-email" className="font-medium text-primary underline-offset-4 hover:underline">
          Resend or get help
        </Link>
      </AlertDescription>
    </Alert>
  )
}
