// components/chat/chat-widget.tsx
"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AnimatePresence, motion } from "framer-motion"
import { Bot, ChevronDown, ChevronUp, Copy, ExternalLink, Loader2, Send, User, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { useChat } from "./chat-provider"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  buttons?: Array<{ text: string; url: string; type?: 'internal' | 'external' }>
  isExpanded?: boolean // undefined = default behavior, true/false = explicit state
}

// Component for expandable message content
function MessageContent({ message, onToggleExpand, onCopy }: {
  message: Message;
  onToggleExpand: () => void;
  onCopy: () => void;
}) {
  const [showCopyFeedback, setShowCopyFeedback] = useState(false)

  const isLongMessage = message.content.length > 200

  // Different default behavior for user vs AI messages
  const shouldTruncate = isLongMessage && (
    message.role === "user"
      ? !message.isExpanded  // User messages: collapsed by default
      : message.isExpanded === false  // AI messages: expanded by default (only collapse if explicitly set to false)
  )

  const displayContent = shouldTruncate
    ? message.content.substring(0, 200) + "..."
    : message.content

  const handleCopy = () => {
    onCopy()
    setShowCopyFeedback(true)
    setTimeout(() => setShowCopyFeedback(false), 2000)
  }

  return (
    <div className={`relative group flex ${message.role === "user" ? "flex-row-reverse" : "flex-row"} gap-2 items-start`}>


      <div className="flex-1">
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
              {displayContent}
            </ReactMarkdown>
          ) : (
            <p className="text-sm whitespace-pre-wrap">{displayContent}</p>
          )}

          {/* Expand/Collapse button for long messages */}
          {isLongMessage && (
            <Button
              variant="default"
              size="sm"
              onClick={onToggleExpand}
              className="mt-2 h-6 px-2 text-xs opacity-70 hover:opacity-100"
            >
              {shouldTruncate ? (
                <>
                  <ChevronDown className="h-3 w-3 mr-1" />
                  Show More
                </>
              ) : (
                <>
                  <ChevronUp className="h-3 w-3 mr-1" />
                  Show Less
                </>
              )}
            </Button>
          )}
        </div>
      </div>
      {/* Copy button - positioned based on message role */}
      <Button
        variant="default"
        size="sm"
        onClick={handleCopy}
        className={`h-6 w-6 p-0 shrink-0 ${showCopyFeedback
          ? "opacity-100"
          : "opacity-0 group-hover:opacity-70 hover:opacity-100"
          } transition-opacity`}
        title="Copy message"
      >
        {showCopyFeedback ? (
          <span className="text-xs font-semibold text-green-600">✓</span>
        ) : (
          <Copy className="h-3 w-3" />
        )}
      </Button>


    </div>
  )
}

export function ChatWidget() {
  const { isOpen, closeChat } = useChat()
  const [ready, setReady] = useState(true) // Always ready with new API
  const [status, setStatus] = useState("Ready") // Status message

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatWidgetRef = useRef<HTMLDivElement>(null)

  // Load messages from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Use setTimeout to defer localStorage read until after initial render
      setTimeout(() => {
        try {
          const savedMessages = localStorage.getItem('chatbot-messages')
          if (savedMessages) {
            const parsedMessages = JSON.parse(savedMessages)
            setMessages(parsedMessages)
          } else {
            // Set default welcome message if no saved messages
            setMessages([
              {
                id: "welcome",
                role: "assistant",
                content: "Hi! Ask me about our services, team, pricing, or pages on this site. I can also provide quick links to help you navigate!",
                timestamp: new Date(),
                buttons: [
                  { text: "📧 Contact Us", url: "/contact", type: 'internal' },
                  { text: "🛠️ Our Services", url: "/services", type: 'internal' },
                  { text: "💼 Portfolio", url: "/portfolio", type: 'internal' },
                  { text: "📅 Book Call", url: "/booking", type: 'internal' }
                ]
              },
            ])
          }
        } catch (error) {
          console.error('Failed to load chat messages:', error)
          // Fallback to default welcome message
          setMessages([
            {
              id: "welcome",
              role: "assistant",
              content: "Hi! Ask me about our services, team, pricing, or pages on this site. I can also provide quick links to help you navigate!",
              timestamp: new Date(),
              buttons: [
                { text: "📧 Contact Us", url: "/contact", type: 'internal' },
                { text: "🛠️ Our Services", url: "/services", type: 'internal' },
                { text: "💼 Portfolio", url: "/portfolio", type: 'internal' },
                { text: "📅 Book Call", url: "/booking", type: 'internal' }
              ]
            },
          ])
        }
      }, 0)
    }
  }, [])

  // Save messages to localStorage whenever messages change (debounced)
  useEffect(() => {
    if (typeof window !== 'undefined' && messages.length > 0) {
      // Debounce the save operation to avoid excessive localStorage writes
      const timeoutId = setTimeout(() => {
        try {
          localStorage.setItem('chatbot-messages', JSON.stringify(messages))
        } catch (error) {
          console.error('Failed to save chat messages:', error)
        }
      }, 500)

      return () => clearTimeout(timeoutId)
    }
  }, [messages])

  // Click outside to close chat
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (chatWidgetRef.current && !chatWidgetRef.current.contains(event.target as Node)) {
        closeChat()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, closeChat])

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Copy message to clipboard
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  // Clear chat history (optional function for future use)
  const clearChatHistory = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('chatbot-messages')
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: "Hi! Ask me about our services, team, pricing, or pages on this site. I can also provide quick links to help you navigate!",
          timestamp: new Date(),
          buttons: [
            { text: "📧 Contact Us", url: "/contact", type: 'internal' },
            { text: "🛠️ Our Services", url: "/services", type: 'internal' },
            { text: "💼 Portfolio", url: "/portfolio", type: 'internal' },
            { text: "📅 Book Call", url: "/booking", type: 'internal' }
          ]
        },
      ])
    }
  }

  // Toggle message expansion
  const toggleMessageExpansion = (messageId: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        if (msg.role === "user") {
          // For user messages: undefined = collapsed, true = expanded
          return { ...msg, isExpanded: !msg.isExpanded }
        } else {
          // For AI messages: undefined = expanded, false = collapsed
          return { ...msg, isExpanded: msg.isExpanded === false ? undefined : false }
        }
      }
      return msg
    }))
  }

  async function handleSend() {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date()
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()

      // Parse response for buttons/links
      let buttons: Array<{ text: string; url: string; type?: 'internal' | 'external' }> = []

      // Check if the response mentions pages or links
      const responseText = data.reply || "Sorry, I couldn't process your request."

      // If user asks for links or pages, add relevant buttons
      if (input.toLowerCase().includes('link') || input.toLowerCase().includes('page') ||
        input.toLowerCase().includes('contact') || input.toLowerCase().includes('admin') ||
        responseText.toLowerCase().includes('contact') || responseText.toLowerCase().includes('booking') ||
        responseText.toLowerCase().includes('services') || responseText.toLowerCase().includes('portfolio')) {

        // Add common page buttons based on context
        if (responseText.toLowerCase().includes('contact') || input.toLowerCase().includes('contact') || input.toLowerCase().includes('admin')) {
          buttons.push(
            { text: "📧 Contact Us", url: "/contact", type: 'internal' },
            { text: "📅 Book Consultation", url: "/booking", type: 'internal' },
            { text: "📞 Call Us", url: "tel:+8801516573530", type: 'external' },
            { text: "✉️ Email Us", url: "mailto:rareviewit@gmail.com", type: 'external' }
          )
        }

        if (responseText.toLowerCase().includes('services') || input.toLowerCase().includes('service')) {
          buttons.push(
            { text: "🌐 Web Design", url: "/services/web-design", type: 'internal' },
            { text: "📱 App Development", url: "/services/app-development", type: 'internal' },
            { text: "🔍 SEO Services", url: "/services/seo", type: 'internal' },
            { text: "📈 Digital Marketing", url: "/services/digital-marketing", type: 'internal' }
          )
        }

        if (responseText.toLowerCase().includes('portfolio') || input.toLowerCase().includes('work') || input.toLowerCase().includes('example')) {
          buttons.push(
            { text: "💼 View Portfolio", url: "/portfolio", type: 'internal' },
            { text: "💰 See Pricing", url: "/pricing", type: 'internal' }
          )
        }

        if (input.toLowerCase().includes('page') || input.toLowerCase().includes('link') || input.toLowerCase().includes('url')) {
          buttons.push(
            { text: "🏠 Home", url: "/", type: 'internal' },
            { text: "ℹ️ About Us", url: "/about", type: 'internal' },
            { text: "📝 Blog", url: "/blog", type: 'internal' },
            { text: "❓ FAQ", url: "/faq", type: 'internal' },
            { text: "💼 Careers", url: "/careers", type: 'internal' }
          )
        }
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseText,
        timestamp: new Date(),
        buttons: buttons.length > 0 ? buttons : undefined
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, something went wrong. Please try again.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        ref={chatWidgetRef}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="fixed bottom-4 right-4 z-[9999] w-[calc(100vw-2rem)] max-w-md sm:w-full sm:max-w-sm md:max-w-md"
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
            <Button variant="default" size="icon" onClick={closeChat} className="text-primary-foreground hover:bg-primary-foreground/20">
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
                  <div className={`flex max-w-[80%] flex-col gap-2 ${message.role === "user" ? "items-end" : "items-start"}`}>
                    <MessageContent
                      message={message}
                      onToggleExpand={() => toggleMessageExpansion(message.id)}
                      onCopy={() => copyToClipboard(message.content)}
                    />
                    {/* Render buttons if they exist */}
                    {message.buttons && message.buttons.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {message.buttons.map((button, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="text-xs cursor-pointer hover:text-white"
                            onClick={() => {
                              if (button.type === 'external') {
                                window.open(button.url, '_blank')
                              } else {
                                window.location.href = button.url
                              }
                            }}
                          >
                            {button.text}
                            {button.type === 'external' && <ExternalLink className="ml-1 h-3 w-3" />}
                          </Button>
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

              {/* Invisible div to scroll to */}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input + Send/Stop */}
          <div className="border-t p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (ready && !isLoading) handleSend()
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={ready ? "Ask me anything about the site…" : "AI is initializing..."}
                disabled={isLoading || !ready}
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={!input.trim() || !ready || isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}
