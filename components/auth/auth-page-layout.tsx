import Link from "next/link"
import { Brain } from "lucide-react"

type AuthPageLayoutProps = {
  children: React.ReactNode
  headline?: string
  subheadline?: string
}

export function AuthPageLayout({
  children,
  headline = "AI-powered exam intelligence",
  subheadline = "Personalized prep, adaptive learning, and real-time insights — built for ambitious students.",
}: AuthPageLayoutProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <div className="auth-grid-bg pointer-events-none absolute inset-0" aria-hidden />
      <div className="q1-ambient" aria-hidden />

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:py-12">
        <section className="mb-8 hidden max-w-md flex-1 lg:mb-0 lg:block">
          <Link href="/" className="inline-flex items-center gap-2 text-foreground transition-opacity hover:opacity-80">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
              <Brain className="h-5 w-5 text-primary" aria-hidden />
            </span>
            <span className="text-lg font-semibold tracking-tight">Quantrion</span>
          </Link>
          <h1 className="mt-10 text-4xl font-semibold leading-tight tracking-tight text-foreground">
            Welcome back to your learning command center.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{subheadline}</p>
          <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {headline}
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Secure Supabase authentication
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              Role-based access for students & admins
            </li>
          </ul>
        </section>

        <section className="flex w-full flex-1 flex-col items-center justify-center lg:max-w-md">{children}</section>
      </div>
    </main>
  )
}
