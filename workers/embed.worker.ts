// workers/embed.worker.ts

// Very small deterministic hashing embedder
const DIM = 384;

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function hash32(str: string): number {
  // FNV-1a
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0;
  }
  return h >>> 0;
}

function embedOne(text: string): number[] {
  const v = new Float32Array(DIM);
  const toks = tokenize(text);
  if (toks.length === 0) return Array.from(v);

  for (const t of toks) {
    const h = hash32(t);
    const idx = h % DIM;
    // signed contribution
    const sign = (h & 1) ? 1 : -1;
    v[idx] += sign * (1 / Math.sqrt(toks.length));
  }

  // L2 normalize
  let norm = 0;
  for (let i = 0; i < DIM; i++) norm += v[i] * v[i];
  norm = Math.sqrt(norm) || 1;
  for (let i = 0; i < DIM; i++) v[i] /= norm;

  return Array.from(v);
}

self.onmessage = (event: MessageEvent) => {
  const { id, texts } = event.data as { id: number; texts: string[] };
  try {
    const embeddings = texts.map(embedOne);
    (self as unknown as Worker).postMessage({ id, embeddings });
  } catch (e: any) {
    (self as unknown as Worker).postMessage({ id, error: e?.message ?? String(e) });
  }
};
