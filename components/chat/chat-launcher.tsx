"use client"

import { useChat } from "./chat-provider"
import { ChatWidget } from "./chat-widget"

export function ChatLauncher() {
   const { isOpen } = useChat()

   // Only render when opened to prevent affecting page load time
   return isOpen ? <ChatWidget /> : null
}

