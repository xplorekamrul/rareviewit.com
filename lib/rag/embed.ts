//lib/rag/embed.ts

let worker: Worker | null = null
let requestId = 0
const pendingRequests = new Map<number, { resolve: (value: number[][]) => void; reject: (error: Error) => void }>()

function getWorker(): Worker {
  if (!worker) {
    worker = new Worker(new URL("../../workers/embed.worker.ts", import.meta.url), { type: "module" })

    worker.onmessage = (event: MessageEvent) => {
      const { id, embeddings, error } = event.data
      const pending = pendingRequests.get(id)

      if (pending) {
        if (error) {
          pending.reject(new Error(error))
        } else {
          pending.resolve(embeddings)
        }
        pendingRequests.delete(id)
      }
    }
  }

  return worker
}

export async function embed(texts: string[]): Promise<number[][]> {
  const id = requestId++
  const worker = getWorker()

  return new Promise((resolve, reject) => {
    pendingRequests.set(id, { resolve, reject })
    worker.postMessage({ id, texts })
  })
}

export function cosineSimilarity(a: number[], b: number[]): number {
  let dotProduct = 0
  let normA = 0
  let normB = 0

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i]
    normA += a[i] * a[i]
    normB += b[i] * b[i]
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB))
}

export function topK(
  query: number[],
  vectors: Array<{ vector: number[]; data: any }>,
  k: number,
): Array<{ score: number; data: any }> {
  const scores = vectors.map((item) => ({
    score: cosineSimilarity(query, item.vector),
    data: item.data,
  }))

  scores.sort((a, b) => b.score - a.score)

  return scores.slice(0, k)
}
