"use client"
import { StaggerContainer, staggerItem } from "./stagger-container"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

function CountUp({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const countRef = useRef(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const increment = end / (duration * 60)
    const timer = setInterval(() => {
      countRef.current += increment
      if (countRef.current >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(countRef.current))
      }
    }, 1000 / 60)

    return () => clearInterval(timer)
  }, [end, duration, isVisible])

  return <div ref={ref}>{count}</div>
}

export function StatsSection() {
  const stats = [
    { value: 500, suffix: "+", label: "Projects Completed" },
    { value: 98, suffix: "%", label: "Client Satisfaction" },
    { value: 50, suffix: "+", label: "Team Members" },
    { value: 15, suffix: "+", label: "Years Experience" },
  ]

  return (
    <section className="border-y border-border bg-muted/20 py-12 md:py-16">
      <div className="container px-4">
        <StaggerContainer className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div key={index} variants={staggerItem} className="text-center">
              <div className="mb-2 text-3xl font-bold text-primary md:text-4xl">
                <CountUp end={stat.value} />
                {stat.suffix}
              </div>
              <div className="text-sm text-muted-foreground md:text-base">{stat.label}</div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
