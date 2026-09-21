import Constants from "expo-constants"

type Extra = {
  apiUrl?: string
  supabaseUrl?: string
  supabaseAnonKey?: string
}

const extra = (Constants.expoConfig?.extra ?? {}) as Extra

function read(key: string, fallback = ""): string {
  // Expo public env (preferred) → app.json extra → empty
  const fromEnv =
    (typeof process !== "undefined" &&
      (process.env as Record<string, string | undefined>)[key]) ||
    undefined
  return fromEnv?.trim() || fallback
}

export const env = {
  apiUrl: read("EXPO_PUBLIC_API_URL", extra.apiUrl ?? "http://localhost:3000"),
  supabaseUrl: read("EXPO_PUBLIC_SUPABASE_URL", extra.supabaseUrl ?? ""),
  supabaseAnonKey: read("EXPO_PUBLIC_SUPABASE_ANON_KEY", extra.supabaseAnonKey ?? ""),
  scheme: "quantrion",
}

export function isSupabaseConfigured(): boolean {
  return Boolean(env.supabaseUrl && env.supabaseAnonKey && !env.supabaseUrl.includes("placeholder"))
}
