// components/chat/chat-widget.tsx
"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getSmartCitationsV2, smartStreamChatV2 } from "@/lib/chat/smart-engine-v2"
import { AnimatePresence, motion } from "framer-motion"
import { Bot, FileText, Loader2, Send, Square, User, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { useChat } from "./chat-provider"
import { useFastChat } from "./use-fast-chat"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  citations?: Array<{ title: string; url: string }>
  timestamp: Date
}

const MAX_WORDS = 300
function truncateToWords(text: string, maxWords = MAX_WORDS) {
  const words = text.trim().split(/\s+/)
  if (words.length <= maxWords) return text
  return words.slice(0, maxWords).join(" ") + "…"
}

export function ChatWidget() {
  const { isOpen, closeChat } = useChat()
  const { ready, status } = useFastChat(isOpen)

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! Ask me about our services, team, pricing, or pages on this site.",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isStreaming, setIsStreaming] = useState(false)
  const stopRequested = useRef(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages])

  async function handleSend() {
    if (!input.trim() || isStreaming) return
    const userMessage: Message = { id: Date.now().toString(), role: "user", content: input, timestamp: new Date() }
    setMessages((p) => [...p, userMessage])
    setInput("")
    setIsStreaming(true)
    stopRequested.current = false

    // Show immediate "thinking" feedback
    const assistantId = (Date.now() + 1).toString()
    setMessages((prev) => [
      ...prev,
      {
        id: assistantId,
        role: "assistant",
        content: "",
        timestamp: new Date(),
      },
    ])

    try {
      // Get smart citations for the query
      const citations = await getSmartCitationsV2(userMessage.content)

      let acc = ""

      // Update the existing message with citations
      setMessages((prev) => prev.map((m) =>
        m.id === assistantId
          ? { ...m, citations }
          : m
      ))

      // Stream response from smart engine
      const stream = smartStreamChatV2(userMessage.content)
      for await (const chunk of stream) {
        if (stopRequested.current) break
        acc += chunk

        // Update message content
        setMessages((prev) => prev.map((m) =>
          m.id === assistantId ? { ...m, content: acc } : m
        ))
      }
    } catch (e) {
      console.error(e)
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          role: "assistant",
          content: "Sorry—something went wrong while generating the answer.",
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsStreaming(false)
      stopRequested.current = false
    }
  }

  async function handleStop() {
    if (!isStreaming) return
    stopRequested.current = true
    setIsStreaming(false)
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
              <div className="relative">
                <Bot className="h-5 w-5" />
                {ready && (
                  <div className="absolute -bottom-1 -right-1 h-2 w-2 rounded-full bg-green-400 ring-1 ring-primary-foreground" />
                )}
              </div>
              <div>
                <h3 className="font-semibold">AI Assistant</h3>
                <p className="text-xs opacity-90">{ready ? "Ready" : status}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={closeChat} className="text-primary-foreground hover:bg-primary-foreground/20">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {!ready && (
                <div className="rounded-lg bg-muted p-4 text-center">
                  <div className="mb-2 flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm font-medium">{status}</span>
                  </div>
                  <Progress value={ready ? 100 : 50} className="h-2" />
                  <p className="mt-2 text-xs text-muted-foreground">
                    This may take a moment on first use
                  </p>
                </div>
              )}
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
                  <div className={`flex max-w-[80%] flex-col gap-2 ${message.role === "user" ? "items-end" : "items-start"}`}>
                    <div className={`rounded-lg px-4 py-2 ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                      {message.role === "assistant" ? (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            p: (props) => <p className="text-sm leading-6" {...props} />,
                            strong: (props) => <strong className="font-semibold" {...props} />,
                            ul: (props) => <ul className="list-disc pl-5 space-y-1 text-sm leading-6" {...props} />,
                            ol: (props) => <ol className="list-decimal pl-5 space-y-1 text-sm leading-6" {...props} />,
                            a: (props) => <a className="underline underline-offset-2 hover:opacity-80" target="_blank" rel="noopener noreferrer" {...props} />,
                            code: (props) => <code className="rounded bg-black/10 px-1 py-0.5 text-xs" {...props} />,
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      ) : (
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      )}
                    </div>
                    {message.citations?.length ? (
                      <div className="flex flex-wrap gap-2">
                        {message.citations.map((c, i) => (
                          <a key={i} href={c.url} target="_blank" rel="noopener noreferrer">
                            <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                              <FileText className="mr-1 h-3 w-3" />
                              {c.title}
                            </Badge>
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  {message.role === "user" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </motion.div>
              ))}

              {isStreaming && (
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

          {/* Input + Send/Stop */}
          <div className="border-t p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (ready && !isStreaming) handleSend()
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={ready ? "Ask me anything about the site…" : "Initializing…"}
                disabled={isStreaming || !ready}
                className="flex-1"
              />
              {!isStreaming ? (
                <Button type="submit" size="icon" disabled={!input.trim() || !ready}>
                  <Send className="h-4 w-4" />
                </Button>
              ) : (
                <Button type="button" variant="outline" size="icon" onClick={handleStop} title="Stop generation">
                  <Square className="h-4 w-4" />
                </Button>
              )}
            </form>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}
