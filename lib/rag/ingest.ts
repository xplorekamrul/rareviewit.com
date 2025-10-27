// lib/rag/ingest.ts
"use client";

import { addChunks, getChunkCount } from "./store.client";
import { htmlToText, markdownToText } from "./clean";
import { chunkText, estimateTokens } from "./chunker";
import { embed } from "./embed";
import type { Chunk } from "../types"; 

type Corpus = {
  version: number;
  site: { brand: string; baseUrl: string };
  pages: Array<Record<string, any>>;
};

// Use the exact metadata type from Chunk
type Doc = {
  id: string;
  url: string;
  title: string;
  text: string;
  metadata: Chunk["metadata"];
};

export async function indexIfEmpty(): Promise<boolean> {
  const count = await getChunkCount();
  if (count > 0) return false;
  await indexCorpus();
  return true;
}

export async function indexCorpus(): Promise<void> {
  const res = await fetch("/chatbot/corpus.json", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load corpus.json");
  const corpus: Corpus = await res.json();

  const docs: Doc[] = [];

  for (const p of corpus.pages) {
    const pageId = p.pageId as string;
    const meta = p.meta ?? {};
    const title = meta.title ?? pageId;
    const path = meta.path ?? `/${pageId}`;
    const base = (corpus.site?.baseUrl?.replace(/\/+$/, "") ?? "");
    const url = `${base}${path}`;

    // Flatten strings
    const collectText = (obj: any): string[] => {
      const out: string[] = [];
      const walk = (x: any) => {
        if (x == null) return;
        if (typeof x === "string") out.push(x);
        else if (Array.isArray(x)) x.forEach(walk);
        else if (typeof x === "object") Object.values(x).forEach(walk);
      };
      walk(obj);
      return out;
    };

    const rawParts = collectText(p);
    const rawJoined = rawParts.join("\n");
    const plain = markdownToText(htmlToText(rawJoined));
    const pieces = chunkText(plain, { maxTokens: 600, overlap: 80 });

    const timestamp = Date.now(); // ⬅️ create once per page

    pieces.forEach((chunk, i) => {
      docs.push({
        id: `${pageId}::${i}`,
        url,
        title,
        text: chunk,
        metadata: {
          pageId,
          path,
          title,
          pageType: pageId,
          timestamp,        // ⬅️ REQUIRED and present
          // tags: [...],    // optional if you have any
        },
      });
    });
  }

  // Embed & store
  const embeddings = await embed(docs.map((d) => d.text));

  // Build exact Chunk objects (metadata type now matches)
  const rows: Chunk[] = docs.map((d, i) => ({
    id: d.id,
    url: d.url,
    title: d.title,
    chunk: d.text,
    vector: embeddings[i],
    tokens: estimateTokens(d.text),
    metadata: d.metadata, // already of type Chunk["metadata"] with timestamp present
  }));

  await addChunks(rows);
}
