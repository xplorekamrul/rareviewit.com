// lib/rag/retrieve.ts
"use client";

import { embed, topK } from "./embed";
import { getAllChunks } from "./store.client";

export interface Source {
  title: string;
  url: string;
  score: number;
  snippet: string;
}

export interface RetrieveOptions {
  topK?: number;
  minScore?: number;
  filters?: {
    pageType?: string;
    tags?: string[];
  };
}

export async function retrieve(query: string, options: RetrieveOptions = {}): Promise<Source[]> {
  const { topK: k = 8, minScore = 0.3, filters } = options;

  try {
    const [qVec] = await embed([query]);
    let chunks = await getAllChunks();

    if (filters?.pageType) {
      chunks = chunks.filter(c => c.metadata?.pageType === filters.pageType);
    }
    if (filters?.tags?.length) {
      chunks = chunks.filter(c => c.metadata?.tags?.some((t: string) => filters.tags!.includes(t)));
    }

    const ranked = topK(
      qVec,
      chunks.map(c => ({ vector: c.vector, data: c })),
      k
    );

    const seen = new Set<string>();
    const out: Source[] = [];
    for (const r of ranked) {
      if (r.score < minScore) continue;
      const url = r.data.url || r.data.metadata?.path || "/";
      if (seen.has(url)) continue;
      seen.add(url);

      out.push({
        title: r.data.title ?? r.data.metadata?.title ?? "Untitled",
        url,
        score: r.score,
        snippet: (r.data.chunk ?? "").slice(0, 300) + (r.data.chunk?.length > 300 ? "…" : "")
      });

      if (out.length >= 6) break;
    }
    return out;
  } catch (e) {
    console.error("[RAG] Retrieval error:", e);
    return [];
  }
}
