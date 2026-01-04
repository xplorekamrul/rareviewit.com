"use client"

import { motion, useInView } from "framer-motion"
import { useRef, type ReactNode } from "react"

type AnimateInViewProps = {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  once?: boolean
}

export function AnimateInView({
  children,
  className,
  delay = 0,
  duration = 0.3,
  direction = "up",
  once = true,
}: AnimateInViewProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-50px" })

  const directions = {
    up: { y: 20, x: 0 },
    down: { y: -20, x: 0 },
    left: { y: 0, x: 20 },
    right: { y: 0, x: -20 },
    none: { y: 0, x: 0 },
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directions[direction] }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, ...directions[direction] }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
