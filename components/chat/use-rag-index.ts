// components/chat/use-rag-index.ts
"use client"

import { useEffect, useState } from "react"
import { indexIfEmpty } from "@/lib/rag/ingest"
import { initEngine, isEngineReady } from "@/lib/webllm/engine"

export function useRagAndEngine() {
  const [ready, setReady] = useState(false)
  const [message, setMessage] = useState("Initializing…")

  useEffect(() => {
    let alive = true

    ;(async () => {
      try {
        setMessage("Loading local model…")
        // Let engine pick a supported default; or pass a valid ID from console
        await initEngine(undefined, (p) => {
          if (!alive) return
          if (p.text) setMessage(p.text)
        })

        setMessage("Indexing site content…")
        await indexIfEmpty()

        if (alive) setReady(true)
      } catch (e: any) {
        console.error(e)
        if (alive) setMessage(e?.message ?? "Failed to initialize")
      }
    })()

    return () => {
      alive = false
    }
  }, [])

  return { ready: ready && isEngineReady(), status: ready ? "Ready" : message }
}
