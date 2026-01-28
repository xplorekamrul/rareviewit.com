"use client"

import { motion, useAnimation, useMotionValue } from "framer-motion"
import React, { useEffect, useRef, useState } from "react"

interface DraggableFloaterProps {
   children: React.ReactNode
   className?: string
}

export function DraggableFloater({ children, className }: DraggableFloaterProps) {
   const ref = useRef<HTMLDivElement>(null)
   const controls = useAnimation()
   const x = useMotionValue(0)
   const y = useMotionValue(0)
   const [isClient, setIsClient] = useState(false)

   useEffect(() => {
      setIsClient(true)
   }, [])

   const handleDragEnd = () => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const windowWidth = window.innerWidth
      const centerX = rect.left + rect.width / 2

      // Snap threshold: Center of screen
      const isLeft = centerX < windowWidth / 2

      // Target position (margin from side)
      const margin = 24 // 1.5rem (matches typical bottom-6 which is 24px)

      // Current transform X
      const currentX = x.get()

      let targetXOffset = 0
      if (isLeft) {
         // Move to left side
         // Target Box Left = margin
         // rect.left is current visual left
         // We want new visual left to be margin.
         // diff = margin - rect.left
         targetXOffset = currentX + (margin - rect.left)
      } else {
         // Move to right side
         // Target Box Right = windowWidth - margin
         // Target Box Left = windowWidth - margin - rect.width
         const targetLeft = windowWidth - margin - rect.width
         targetXOffset = currentX + (targetLeft - rect.left)
      }

      controls.start({
         x: targetXOffset,
         transition: { type: "spring", stiffness: 300, damping: 30 }
      })
   }

   // Prevent simple clicks from being interpreted as drags if needed (motion handles this mostly)
   // We use hydration check to avoid server-client mismatch if we were rendering based on window size,
   // but here we just render the div. The fixed position is CSS.
   // Actually, we can just render. The 'drag' prop works client side.

   return (
      <motion.div
         ref={ref}
         drag
         dragMomentum={false}
         onDragEnd={handleDragEnd}
         animate={controls}
         style={{ x, y }}
         className={`cursor-grab active:cursor-grabbing ${className}`}
      >
         {children}
      </motion.div>
   )
}
