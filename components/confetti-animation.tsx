'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Particle {
   id: number
   x: number
   y: number
   rotation: number
   scale: number
   color: string
   shape: 'circle' | 'square' | 'ribbon' | 'star'
   duration: number
   delay: number
}

// Using colors from your design system
const colors = [
   'oklch(23.906% 0.15189 265.596)',
   'oklch(0.55 0.14 265)',
   'oklch(0.5 0.15 265)',
   'oklch(0.55 0.14 240)',
   'oklch(0.6 0.13 290)',
   'oklch(0.65 0.16 160)',
   'oklch(0.58 0.15 320)',
   'oklch(0.92 0.02 250)',
]

function generateParticles(count: number): Particle[] {
   return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 1000,
      y: (Math.random() - 0.5) * 1000,
      rotation: Math.random() * 360,
      scale: Math.random() * 0.7 + 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: (['circle', 'square', 'ribbon', 'star'] as const)[Math.floor(Math.random() * 4)],
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 0.3,
   }))
}

function StarShape({ color }: { color: string }) {
   return (
      <svg width="12" height="12" viewBox="0 0 12 12" fill={color}>
         <path d="M6 0L7.5 4.5H12L8.25 7.5L9.75 12L6 8.5L2.25 12L3.75 7.5L0 4.5H4.5L6 0Z" />
      </svg>
   )
}

export function ConfettiAnimation() {
   const [particles, setParticles] = useState<Particle[]>([])

   useEffect(() => {
      setParticles(generateParticles(100))
   }, [])

   return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
         {particles.map((particle) => (
            <motion.div
               key={particle.id}
               className="absolute"
               style={{
                  left: '50%',
                  top: '50%',
               }}
               initial={{
                  x: 0,
                  y: 0,
                  opacity: 1,
                  rotate: particle.rotation,
                  scale: particle.scale,
               }}
               animate={{
                  x: particle.x,
                  y: particle.y + 300,
                  opacity: 0,
                  rotate: particle.rotation + 720,
               }}
               transition={{
                  duration: particle.duration,
                  ease: 'easeOut',
                  delay: particle.delay,
               }}
            >
               {particle.shape === 'circle' && (
                  <motion.div
                     className="rounded-full"
                     style={{
                        width: '14px',
                        height: '14px',
                        backgroundColor: particle.color,
                        boxShadow: `0 0 12px ${particle.color}`,
                     }}
                     animate={{
                        boxShadow: [
                           `0 0 12px ${particle.color}`,
                           `0 0 20px ${particle.color}`,
                           `0 0 12px ${particle.color}`,
                        ],
                     }}
                     transition={{
                        duration: 0.5,
                        repeat: Infinity,
                     }}
                  />
               )}
               {particle.shape === 'square' && (
                  <motion.div
                     style={{
                        width: '12px',
                        height: '12px',
                        backgroundColor: particle.color,
                        transform: 'rotate(45deg)',
                        boxShadow: `0 0 10px ${particle.color}`,
                     }}
                  />
               )}
               {particle.shape === 'ribbon' && (
                  <motion.div
                     style={{
                        width: '24px',
                        height: '5px',
                        backgroundColor: particle.color,
                        borderRadius: '3px',
                        boxShadow: `0 0 10px ${particle.color}`,
                     }}
                  />
               )}
               {particle.shape === 'star' && (
                  <motion.div
                     style={{
                        filter: `drop-shadow(0 0 8px ${particle.color})`,
                     }}
                  >
                     <StarShape color={particle.color} />
                  </motion.div>
               )}
            </motion.div>
         ))}
      </div>
   )
}
