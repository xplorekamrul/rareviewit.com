"use client"

import dynamic from "next/dynamic"
import { useChat } from "./chat-provider"

const LazyChatWidget = dynamic(async () => {
   const mod = await import("./chat-widget")
   return { default: mod.ChatWidget }
}, { ssr: false, loading: () => null })

export function ChatLauncher() {
   const { isOpen, hasLaunched } = useChat()

   if (!isOpen && !hasLaunched) return null
   return isOpen ? <LazyChatWidget /> : null
}

