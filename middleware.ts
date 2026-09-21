import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { updateSession } from "@/lib/supabase/middleware"
import { isEmailVerified } from "@/lib/supabase/auth"
import { canAccessAdmin } from "@/lib/supabase/rbac"
import type { UserRole } from "@/lib/supabase/types"

const PROTECTED_PREFIXES = ["/dashboard", "/admin", "/lecture-cognis"]
const AUTH_PAGES = ["/login", "/signup", "/forgot-password", "/reset-password"]

function isProtectedRoute(pathname: string) {
  return PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix))
}

function isAuthPage(pathname: string) {
  return AUTH_PAGES.some((page) => pathname === page || pathname.startsWith(`${page}/`))
}

function isLectureCognisRoute(pathname: string) {
  return pathname.startsWith("/lecture-cognis")
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const { user, supabase, response } = await updateSession(request)

  if (!isProtectedRoute(pathname) && !isAuthPage(pathname)) {
    return response
  }

  if (!user && isProtectedRoute(pathname)) {
    // Without Supabase, LectureCognis uses the client professional gate instead.
    if (isLectureCognisRoute(pathname) && !supabase) {
      return response
    }
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("next", pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (user && isProtectedRoute(pathname) && !isEmailVerified(user)) {
    const verifyUrl = new URL("/auth/check-email", request.url)
    verifyUrl.searchParams.set("next", pathname)
    return NextResponse.redirect(verifyUrl)
  }

  if (user && isAuthPage(pathname) && pathname !== "/reset-password") {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  if (pathname.startsWith("/admin") && user && supabase) {
    const { data } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single<{ role: UserRole }>()
    if (!canAccessAdmin(data?.role)) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
