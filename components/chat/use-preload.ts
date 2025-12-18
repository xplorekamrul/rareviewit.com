// components/chat/use-preload.ts
"use client"

import { indexIfEmpty } from "@/lib/rag/ingest"
import { initEngine } from "@/lib/webllm/engine"
import { useEffect, useRef } from "react"

let preloadStarted = false
let preloadPromise: Promise<void> | null = null

/**
 * Hook to preload the LLM and RAG index in the background
 * Call this early in your app to reduce chat initialization time
 */
export function usePreloadChat() {
   const hasStarted = useRef(false)

   useEffect(() => {
      if (hasStarted.current || preloadStarted) return
      hasStarted.current = true
      preloadStarted = true

      // Start preloading in background without blocking UI
      preloadPromise = (async () => {
         try {
            console.log("🚀 Preloading chat components...")

            // Load both in parallel
            await Promise.all([
               initEngine(undefined, (p) => {
                  console.log("Model loading:", p.text)
               }),
               indexIfEmpty()
            ])

            console.log("✅ Chat preload complete")
         } catch (error) {
            console.error("❌ Chat preload failed:", error)
         }
      })()
   }, [])

   return { preloadPromise }
}

export function getPreloadPromise() {
   return preloadPromise
}