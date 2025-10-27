// lib/rag/chunker.ts
export interface ChunkOptions {
  maxTokens?: number;
  overlap?: number;
}

export function chunkText(text: string, options: ChunkOptions = {}): string[] {
  const { maxTokens = 800, overlap = 100 } = options;

  // ~4 chars per token heuristic
  const maxChars = Math.max(200, maxTokens * 4);
  const overlapChars = Math.max(0, overlap * 4);

  const chunks: string[] = [];
  const paragraphs = text.split(/\n{2,}/).map(p => p.trim()).filter(Boolean);
  let current = "";

  const pushWithOverlap = () => {
    if (!current) return;
    chunks.push(current);
    if (overlapChars > 0) {
      const tail = current.slice(-overlapChars);
      current = tail.trim();
    } else {
      current = "";
    }
  };

  for (const p of paragraphs) {
    if ((current + (current ? "\n\n" : "") + p).length <= maxChars) {
      current = (current ? current + "\n\n" : "") + p;
      continue;
    }

    // Paragraph too big or won't fit; split by sentence
    const sentences = p.match(/[^.!?]+[.!?]+|\S+$/g) ?? [p];
    for (const s of sentences) {
      if ((current + (current ? " " : "") + s).length <= maxChars) {
        current = (current ? current + " " : "") + s;
      } else {
        pushWithOverlap();
        current = s;
      }
    }
  }

  if (current) chunks.push(current);
  return chunks;
}

export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}
