//lib/types.ts

export interface Chunk {
  id: string
  url: string
  title: string
  chunk: string
  tokens: number
  metadata: {
    pageType?: string
    tags?: string[]
    timestamp: number
    path?: string
    title?: string
    pageId?: string
    [k: string]: any
  }
  vector: number[]
}

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  sources?: Source[]
  timestamp: number
}

export interface Source {
  title: string
  url: string
  score: number
  snippet: string
}

export interface ChatState {
  messages: Message[]
  isLoading: boolean
  isStreaming: boolean
  ragEnabled: boolean
  model: string
}
