"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface ChatContextType {
  isOpen: boolean
  hasLaunched: boolean
  openChat: () => void
  closeChat: () => void
  toggleChat: () => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [hasLaunched, setHasLaunched] = useState(false)

  function openChat() {
    setIsOpen(true)
    setHasLaunched(true)
  }

  function closeChat() {
    setIsOpen(false)
  }

  return (
    <ChatContext.Provider
      value={{
        isOpen,
        hasLaunched,
        openChat,
        closeChat,
        toggleChat: () => (isOpen ? closeChat() : openChat()),
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error("useChat must be used within ChatProvider")
  }
  return context
}
