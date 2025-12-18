"use client"

import { useChat } from "./chat-provider"
import { ChatWidget } from "./chat-widget"

export function ChatLauncher() {
   const { isOpen } = useChat()

   // Show widget instantly when opened, no lazy loading delay
   return isOpen ? <ChatWidget /> : null
}

