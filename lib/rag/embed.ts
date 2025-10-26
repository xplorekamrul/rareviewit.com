// lib/rag/embed.ts
"use client";

let worker: Worker | null = null;
let reqId = 0;
const pending = new Map<number, { resolve: (v: number[][]) => void; reject: (e: Error) => void }>();

function ensureWorker(): Worker {
  if (typeof window === "undefined") throw new Error("embed() must run in the browser");
  if (!worker) {
    worker = new Worker(new URL("../../workers/embed.worker.ts", import.meta.url), { type: "module" });
    worker.onmessage = (e: MessageEvent) => {
      const { id, embeddings, error } = e.data ?? {};
      const p = pending.get(id);
      if (!p) return;
      if (error) p.reject(new Error(error));
      else p.resolve(embeddings);
      pending.delete(id);
    };
  }
  return worker;
}

export async function embed(texts: string[]): Promise<number[][]> {
  const id = reqId++;
  const w = ensureWorker();
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    w.postMessage({ id, texts });
  });
}

export function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

export function topK<T extends { vector: number[]; data: any }>(
  query: number[],
  vectors: T[],
  k: number
): Array<{ score: number; data: any }> {
  const scored = vectors.map((x) => ({ score: cosineSimilarity(query, x.vector), data: x.data }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, k);
}
