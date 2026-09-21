import { isValidEmail } from "@/lib/auth"

export const LOCAL_AUTH_KEY = "quantrion:local-session"

export type LocalAuthSession = {
  id: string
  email: string
  name: string
  createdAt: string
}

export function readLocalSession(): LocalAuthSession | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(LOCAL_AUTH_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as LocalAuthSession
    if (!parsed?.email || !parsed?.id) return null
    return parsed
  } catch {
    return null
  }
}

export function writeLocalSession(input: { email: string; name?: string }): LocalAuthSession {
  const email = input.email.trim().toLowerCase()
  const name = (input.name ?? email.split("@")[0] ?? "Learner").trim() || "Learner"
  const session: LocalAuthSession = {
    id: `local-${btoa(email).replace(/=+/g, "")}`,
    email,
    name,
    createdAt: new Date().toISOString(),
  }
  localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(session))
  return session
}

export function clearLocalSession() {
  if (typeof window === "undefined") return
  localStorage.removeItem(LOCAL_AUTH_KEY)
}

export function validateLocalAuthCredentials(email: string, password: string, name?: string) {
  if (!isValidEmail(email)) return "Enter a valid email address"
  if (password.trim().length < 6) return "Password must be at least 6 characters"
  if (name !== undefined && name.trim().length < 2) return "Name should be at least 2 characters"
  return null
}
