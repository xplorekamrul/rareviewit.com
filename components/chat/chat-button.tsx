"use client"

import { useChat } from "@/components/chat/chat-provider"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { MessageSquare } from "lucide-react"

export function ChatButton() {
   const { toggleChat } = useChat()

   return (
      <motion.div
         initial={{ opacity: 0, scale: 0.8 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ delay: 0.3 }}
         className="fixed bottom-24 right-6 z-[9998]"
      >
         <Button
            onClick={toggleChat}
            size="icon"
            className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Toggle chat"
         >
            <MessageSquare className="h-6 w-6" />
         </Button>
      </motion.div>
   )
}