//lib/rag/chunker.ts
export interface ChunkOptions {
  maxTokens?: number
  overlap?: number
}

export function chunkText(text: string, options: ChunkOptions = {}): string[] {
  const { maxTokens = 800, overlap = 100 } = options

  // Rough token estimation: ~4 chars per token
  const maxChars = maxTokens * 4
  const overlapChars = overlap * 4

  const chunks: string[] = []

  // Split by paragraphs first
  const paragraphs = text.split(/\n\n+/).filter((p) => p.trim().length > 0)

  let currentChunk = ""

  for (const paragraph of paragraphs) {
    if (currentChunk.length + paragraph.length < maxChars) {
      currentChunk += (currentChunk ? "\n\n" : "") + paragraph
    } else {
      if (currentChunk) {
        chunks.push(currentChunk)
        // Add overlap from end of previous chunk
        const words = currentChunk.split(/\s+/)
        const overlapWords = words.slice(-Math.floor(overlapChars / 5))
        currentChunk = overlapWords.join(" ") + "\n\n" + paragraph
      } else {
        // Paragraph is too long, split by sentences
        const sentences = paragraph.match(/[^.!?]+[.!?]+/g) || [paragraph]
        for (const sentence of sentences) {
          if (currentChunk.length + sentence.length < maxChars) {
            currentChunk += (currentChunk ? " " : "") + sentence
          } else {
            if (currentChunk) chunks.push(currentChunk)
            currentChunk = sentence
          }
        }
      }
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk)
  }

  return chunks
}

export function estimateTokens(text: string): number {
  // Rough estimation: ~4 characters per token
  return Math.ceil(text.length / 4)
}
