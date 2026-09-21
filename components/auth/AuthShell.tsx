import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type AuthShellProps = {
  title: string
  description: string
  footerText: string
  footerLinkText: string
  footerHref: string
  children: React.ReactNode
}

export function AuthShell({
  title,
  description,
  footerText,
  footerLinkText,
  footerHref,
  children,
}: AuthShellProps) {
  return (
    <main className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto flex w-full max-w-md flex-col justify-center">
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-2xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">{children}</CardContent>
        </Card>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          {footerText}{" "}
          <Link className="text-primary underline-offset-4 hover:underline" href={footerHref}>
            {footerLinkText}
          </Link>
        </p>
      </div>
    </main>
  )
}
