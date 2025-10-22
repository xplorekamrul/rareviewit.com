////lib/rag/retrieve.ts

import { embed, topK } from "./embed"
import { getAllChunks } from "./store.client"
import type { Source } from "../types"

export interface RetrieveOptions {
  topK?: number
  minScore?: number
  filters?: {
    pageType?: string
    tags?: string[]
  }
}

export async function retrieve(query: string, options: RetrieveOptions = {}): Promise<Source[]> {
  const { topK: k = 8, minScore = 0.3, filters } = options

  try {
    // Get query embedding
    const [queryEmbedding] = await embed([query])

    // Get all chunks
    let chunks = await getAllChunks()

    // Apply filters
    if (filters?.pageType) {
      chunks = chunks.filter((c) => c.metadata.pageType === filters.pageType)
    }

    if (filters?.tags && filters.tags.length > 0) {
      chunks = chunks.filter((c) => c.metadata.tags?.some((tag) => filters.tags?.includes(tag)))
    }

    // Calculate similarities
    const results = topK(
      queryEmbedding,
      chunks.map((c) => ({ vector: c.vector, data: c })),
      k,
    )

    // Filter by minimum score and deduplicate by URL
    const seen = new Set<string>()
    const sources: Source[] = []

    for (const result of results) {
      if (result.score >= minScore && !seen.has(result.data.url)) {
        seen.add(result.data.url)
        sources.push({
          title: result.data.title,
          url: result.data.url,
          score: result.score,
          snippet: result.data.chunk.slice(0, 200) + "...",
        })

        if (sources.length >= 6) break
      }
    }

    return sources
  } catch (error) {
    console.error("[v0] Retrieval error:", error)
    return []
  }
}
