import { env } from "./env"
import { getSupabase } from "./supabase"

export class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

async function authHeaders(): Promise<Record<string, string>> {
  const supabase = getSupabase()
  if (!supabase) return {}
  const { data } = await supabase.auth.getSession()
  const token = data.session?.access_token
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function apiFetch<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(await authHeaders()),
    ...(init.headers as Record<string, string> | undefined),
  }

  const res = await fetch(`${env.apiUrl.replace(/\/$/, "")}${path}`, {
    ...init,
    headers,
  })

  if (!res.ok) {
    let message = `Request failed (${res.status})`
    try {
      const body = (await res.json()) as { error?: string; message?: string }
      message = body.error || body.message || message
    } catch {
      /* ignore */
    }
    throw new ApiError(message, res.status)
  }

  if (res.status === 204) return undefined as T
  return (await res.json()) as T
}

/** Existing web AI endpoints — unchanged contracts. */
export const aiApi = {
  doubt: (body: { question: string; subject?: string; exam?: string }) =>
    apiFetch<unknown>("/api/doubt", { method: "POST", body: JSON.stringify(body) }),
  mcq: (body: Record<string, unknown>) =>
    apiFetch<unknown>("/api/mcq", { method: "POST", body: JSON.stringify(body) }),
  test: (body: Record<string, unknown>) =>
    apiFetch<unknown>("/api/test", { method: "POST", body: JSON.stringify(body) }),
  chat: (body: Record<string, unknown>) =>
    apiFetch<unknown>("/api/ai", { method: "POST", body: JSON.stringify(body) }),
}
