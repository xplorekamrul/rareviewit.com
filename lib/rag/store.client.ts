//lib/rag/store.client.ts

import Dexie, { type Table } from "dexie"
import type { Chunk } from "../types"

class VectorDatabase extends Dexie {
  chunks!: Table<Chunk, string>

  constructor() {
    super("RAGVectorDB")

    this.version(1).stores({
      chunks: "id, url, title, metadata.pageType, metadata.timestamp",
    })
  }
}

const db = new VectorDatabase()

export async function addChunks(chunks: Chunk[]): Promise<void> {
  await db.chunks.bulkPut(chunks)
}

export async function getChunksByUrl(url: string): Promise<Chunk[]> {
  return await db.chunks.where("url").equals(url).toArray()
}

export async function getAllChunks(): Promise<Chunk[]> {
  return await db.chunks.toArray()
}

export async function deleteChunksByUrl(url: string): Promise<void> {
  await db.chunks.where("url").equals(url).delete()
}

export async function clearAllChunks(): Promise<void> {
  await db.chunks.clear()
}

export async function getChunkCount(): Promise<number> {
  return await db.chunks.count()
}
