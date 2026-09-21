import AsyncStorage from "@react-native-async-storage/async-storage"
import type { DownloadItem, DownloadKind } from "../lib/types"

const KEY = "quantrion_downloads_v1"

export async function listDownloads(): Promise<DownloadItem[]> {
  const raw = await AsyncStorage.getItem(KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw) as DownloadItem[]
  } catch {
    return []
  }
}

async function save(items: DownloadItem[]) {
  await AsyncStorage.setItem(KEY, JSON.stringify(items))
}

export async function upsertDownload(
  item: Omit<DownloadItem, "createdAt" | "synced" | "progress"> & {
    progress?: number
  }
): Promise<DownloadItem> {
  const items = await listDownloads()
  const next: DownloadItem = {
    ...item,
    progress: item.progress ?? 1,
    createdAt: new Date().toISOString(),
    synced: true,
  }
  const idx = items.findIndex((d) => d.id === item.id)
  if (idx >= 0) items[idx] = { ...items[idx], ...next }
  else items.unshift(next)
  await save(items)
  return next
}

export async function removeDownload(id: string): Promise<void> {
  const items = await listDownloads()
  await save(items.filter((d) => d.id !== id))
}

export async function clearDownloadsByKind(kind?: DownloadKind): Promise<void> {
  if (!kind) {
    await save([])
    return
  }
  const items = await listDownloads()
  await save(items.filter((d) => d.kind !== kind))
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
