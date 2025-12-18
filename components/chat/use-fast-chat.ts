// components/chat/use-fast-chat.ts
"use client"

import { useEffect, useState } from "react"

export function useFastChat(enabled = false) {
   const [ready, setReady] = useState(false)
   const [message, setMessage] = useState("Initializing…")

   useEffect(() => {
      if (!enabled) {
         setReady(false)
         setMessage("Waiting to start…")
         return
      }

      // Simulate quick initialization
      const timer = setTimeout(() => {
         setReady(true)
         setMessage("Ready")
      }, 500) // 500ms initialization

      return () => clearTimeout(timer)
   }, [enabled])

   return { ready, status: ready ? "Ready" : message }
}