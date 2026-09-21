import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import * as SecureStore from "expo-secure-store"
import { Platform } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { env, isSupabaseConfigured } from "./env"

const ExpoSecureStoreAdapter = {
  getItem: async (key: string) => {
    if (Platform.OS === "web") {
      return AsyncStorage.getItem(key)
    }
    try {
      return await SecureStore.getItemAsync(key)
    } catch {
      return AsyncStorage.getItem(key)
    }
  },
  setItem: async (key: string, value: string) => {
    if (Platform.OS === "web") {
      await AsyncStorage.setItem(key, value)
      return
    }
    try {
      await SecureStore.setItemAsync(key, value)
    } catch {
      await AsyncStorage.setItem(key, value)
    }
  },
  removeItem: async (key: string) => {
    if (Platform.OS === "web") {
      await AsyncStorage.removeItem(key)
      return
    }
    try {
      await SecureStore.deleteItemAsync(key)
    } catch {
      await AsyncStorage.removeItem(key)
    }
  },
}

let client: SupabaseClient | null = null

export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null
  if (!client) {
    client = createClient(env.supabaseUrl, env.supabaseAnonKey, {
      auth: {
        storage: ExpoSecureStoreAdapter,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    })
  }
  return client
}
