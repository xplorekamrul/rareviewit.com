// components/chat/chat-widget.tsx
"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { X, Send, Loader2, Bot, User, FileText } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useChat } from "./chat-provider"
import { retrieve } from "@/lib/rag/retrieve"
import { streamChat } from "@/lib/webllm/engine"
import { useRagAndEngine } from "./use-rag-index"
import * as webllm from "@mlc-ai/web-llm"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  citations?: Array<{ title: string; url: string }>
  timestamp: Date
}

export function ChatWidget() {
  const { isOpen, closeChat } = useChat()
  const { ready, status } = useRagAndEngine()

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! I’m your AI assistant for Rareviewit. Ask me about our services, team, pricing, or anything on the site.",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const sources = await retrieve(userMessage.content, { topK: 8, minScore: 0.2 })

      const contextBlocks = sources
        .map(
          (s, i) =>
            `SOURCE ${i + 1} (${s.title} | ${s.url} | score=${s.score.toFixed(2)}):\n${s.snippet}`
        )
        .join("\n\n")

      const sys =
        "You are a helpful website assistant for Rareviewit. " +
        "Answer strictly based on the provided SOURCES when possible. " +
        "If the information is missing, say you don’t have that info yet and suggest visiting relevant pages."

      const userPrompt =
        `User question:\n${userMessage.content}\n\n` +
        `SOURCES (snippets from the site's JSON corpus):\n${contextBlocks}\n\n` +
        `When you answer, format nicely with short paragraphs and lists when helpful. If you reference a source, include a short label like [About], [Blog], etc.`

      const msgs = [
        { role: "system", content: sys },
        { role: "user", content: userPrompt },
      ] satisfies webllm.ChatCompletionMessageParam[]

      const assistantId = (Date.now() + 1).toString()
      let acc = ""

      setMessages((prev) => [
        ...prev,
        {
          id: assistantId,
          role: "assistant",
          content: "",
          citations: sources.map((s) => ({ title: s.title, url: s.url })),
          timestamp: new Date(),
        },
      ])

      const stream = streamChat(msgs, { temperature: 0.2, maxTokens: 512 })

      for await (const chunk of stream) {
        acc += chunk
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: acc } : m))
        )
      }
    } catch (e: any) {
      console.error(e)
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          role: "assistant",
          content:
            "Sorry—something went wrong initializing the local model or knowledge index. Please reload and try again.",
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="fixed bottom-4 right-4 z-50 w-full max-w-md"
      >
        <Card className="flex h-[600px] flex-col shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b bg-primary p-4 text-primary-foreground">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <div>
                <h3 className="font-semibold">AI Assistant</h3>
                <p className="text-xs opacity-90">{ready ? "Ready" : status}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeChat}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}

                  <div
                    className={`flex max-w-[80%] flex-col gap-2 ${message.role === "user" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      {message.role === "assistant" ? (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            p: ({ node, ...props }) => (
                              <p className="text-sm leading-6" {...props} />
                            ),
                            strong: ({ node, ...props }) => (
                              <strong className="font-semibold" {...props} />
                            ),
                            em: ({ node, ...props }) => <em className="italic" {...props} />,
                            ul: ({ node, ...props }) => (
                              <ul className="list-disc pl-5 space-y-1 text-sm leading-6" {...props} />
                            ),
                            ol: ({ node, ...props }) => (
                              <ol className="list-decimal pl-5 space-y-1 text-sm leading-6" {...props} />
                            ),
                            li: ({ node, ...props }) => <li {...props} />,
                            h1: ({ node, ...props }) => (
                              <h1 className="text-base font-semibold mb-1" {...props} />
                            ),
                            h2: ({ node, ...props }) => (
                              <h2 className="text-base font-semibold mb-1" {...props} />
                            ),
                            h3: ({ node, ...props }) => (
                              <h3 className="text-sm font-semibold mb-1" {...props} />
                            ),
                            a: ({ node, ...props }) => (
                              <a
                                className="underline underline-offset-2 hover:opacity-80"
                                target="_blank"
                                rel="noopener noreferrer"
                                {...props}
                              />
                            ),
                            code: ({ node, ...props }) => (
                              <code className="rounded bg-black/10 px-1 py-0.5 text-xs" {...props} />
                            ),
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      ) : (
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      )}
                    </div>

                    {message.citations && message.citations.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {message.citations.map((citation, idx) => (
                          <a key={idx} href={citation.url} target="_blank" rel="noopener noreferrer">
                            <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                              <FileText className="mr-1 h-3 w-3" />
                              {citation.title}
                            </Badge>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>

                  {message.role === "user" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </motion.div>
              ))}

              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-muted px-4 py-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">Thinking…</span>
                  </div>
                </motion.div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="border-t p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (ready) handleSend()
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={ready ? "Ask me anything about the site…" : "Initializing…"}
                disabled={isLoading || !ready}
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={isLoading || !input.trim() || !ready}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}
