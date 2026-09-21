import AsyncStorage from "@react-native-async-storage/async-storage"
import * as Network from "expo-network"

const QUEUE_KEY = "quantrion_offline_queue_v1"

export type OfflineMutation = {
  id: string
  path: string
  method: string
  body?: string
  createdAt: string
}

export async function getNetworkOnline(): Promise<boolean> {
  try {
    const state = await Network.getNetworkStateAsync()
    return Boolean(state.isConnected && state.isInternetReachable !== false)
  } catch {
    return true
  }
}

export async function enqueueMutation(
  mutation: Omit<OfflineMutation, "id" | "createdAt">
): Promise<void> {
  const raw = await AsyncStorage.getItem(QUEUE_KEY)
  const queue: OfflineMutation[] = raw ? JSON.parse(raw) : []
  queue.push({
    ...mutation,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  })
  await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(queue))
}

export async function flushOfflineQueue(
  send: (m: OfflineMutation) => Promise<void>
): Promise<number> {
  const online = await getNetworkOnline()
  if (!online) return 0
  const raw = await AsyncStorage.getItem(QUEUE_KEY)
  const queue: OfflineMutation[] = raw ? JSON.parse(raw) : []
  if (!queue.length) return 0
  const remaining: OfflineMutation[] = []
  let flushed = 0
  for (const item of queue) {
    try {
      await send(item)
      flushed += 1
    } catch {
      remaining.push(item)
    }
  }
  await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(remaining))
  return flushed
}
