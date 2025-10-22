import { pipeline, env } from "@xenova/transformers"

// Configure transformers.js for browser
env.allowLocalModels = false
env.useBrowserCache = true

let embedder: any = null

async function initEmbedder() {
  if (!embedder) {
    embedder = await pipeline("feature-extraction", "Xenova/bge-small-en-v1.5")
  }
  return embedder
}

self.onmessage = async (event: MessageEvent) => {
  const { id, texts } = event.data

  try {
    const model = await initEmbedder()
    const embeddings: number[][] = []

    for (const text of texts) {
      const output = await model(text, { pooling: "mean", normalize: true })
      embeddings.push(Array.from(output.data))
    }

    self.postMessage({ id, embeddings, error: null })
  } catch (error) {
    self.postMessage({
      id,
      embeddings: null,
      error: error instanceof Error ? error.message : "Embedding failed",
    })
  }
}
