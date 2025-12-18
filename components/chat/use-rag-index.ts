// components/chat/use-rag-index.ts
"use client"

import { indexIfEmpty } from "@/lib/rag/ingest"
import { initEngine, isEngineReady } from "@/lib/webllm/engine"
import { useEffect, useState } from "react"
import { getPreloadPromise } from "./use-preload"

export function useRagAndEngine(enabled = false) {
  const [ready, setReady] = useState(false)
  const [message, setMessage] = useState("Initializing…")
  const [engineReady, setEngineReady] = useState(false)
  const [ragReady, setRagReady] = useState(false)

  useEffect(() => {
    if (!enabled) {
      setReady(false)
      setEngineReady(false)
      setRagReady(false)
      setMessage("Waiting to start…")
      return
    }

    let alive = true

    // Initialize engine and RAG in parallel for faster startup
    const initializeParallel = async () => {
      try {
        const preloadPromise = getPreloadPromise()

        if (preloadPromise) {
          // If preloading was started, wait for it to complete
          setMessage("Finalizing preloaded components…")
          await preloadPromise

          if (alive) {
            setEngineReady(true)
            setRagReady(true)
            setReady(true)
            setMessage("Ready")
          }
        } else {
          // Fallback: initialize normally if no preloading
          const [enginePromise, ragPromise] = [
            initEngine(undefined, (p) => {
              if (!alive) return
              if (p.text) setMessage(`Loading model: ${p.text}`)
            }).then(() => {
              if (alive) setEngineReady(true)
            }),

            indexIfEmpty().then(() => {
              if (alive) setRagReady(true)
            })
          ]

          // Wait for both to complete
          await Promise.all([enginePromise, ragPromise])

          if (alive) {
            setReady(true)
            setMessage("Ready")
          }
        }
      } catch (e: any) {
        console.error(e)
        if (alive) setMessage(e?.message ?? "Failed to initialize")
      }
    }

    initializeParallel()

    return () => {
      alive = false
    }
  }, [enabled])

  // Update status message based on what's ready
  useEffect(() => {
    if (!enabled) return

    if (engineReady && ragReady) {
      setMessage("Ready")
    } else if (engineReady && !ragReady) {
      setMessage("Indexing content…")
    } else if (!engineReady && ragReady) {
      setMessage("Loading model…")
    }
  }, [enabled, engineReady, ragReady])

  return { ready: enabled && ready && isEngineReady(), status: ready ? "Ready" : message }
}
