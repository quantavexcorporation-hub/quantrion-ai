import { promises as fs } from "fs"
import path from "path"
import type { LecturePack } from "./types"

const ROOT = path.join(process.cwd(), "public", "lecture-cognis", "jobs")

export function jobDir(id: string) {
  return path.join(ROOT, id)
}

export function jobPublicBase(id: string) {
  return `/lecture-cognis/jobs/${id}`
}

export async function ensureJobDir(id: string) {
  const dir = jobDir(id)
  await fs.mkdir(dir, { recursive: true })
  return dir
}

export async function writePack(pack: LecturePack) {
  const dir = await ensureJobDir(pack.id)
  const file = path.join(dir, "pack.json")
  await fs.writeFile(file, JSON.stringify(pack, null, 2), "utf8")
  return file
}

export async function readPack(id: string): Promise<LecturePack | null> {
  try {
    const file = path.join(jobDir(id), "pack.json")
    const raw = await fs.readFile(file, "utf8")
    return JSON.parse(raw) as LecturePack
  } catch {
    return null
  }
}

export async function listPacks(limit = 40): Promise<LecturePack[]> {
  try {
    await fs.mkdir(ROOT, { recursive: true })
    const entries = await fs.readdir(ROOT, { withFileTypes: true })
    const packs: LecturePack[] = []
    for (const entry of entries) {
      if (!entry.isDirectory()) continue
      const pack = await readPack(entry.name)
      if (pack) packs.push(pack)
    }
    packs.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    return packs.slice(0, limit)
  } catch {
    return []
  }
}

export async function writeBinary(id: string, filename: string, data: Buffer) {
  const dir = await ensureJobDir(id)
  const file = path.join(dir, filename)
  await fs.writeFile(file, data)
  return `${jobPublicBase(id)}/${filename}`
}

export async function updatePack(
  id: string,
  patch: Partial<LecturePack>,
): Promise<LecturePack | null> {
  const current = await readPack(id)
  if (!current) return null
  const next: LecturePack = {
    ...current,
    ...patch,
    updatedAt: new Date().toISOString(),
  }
  await writePack(next)
  return next
}
