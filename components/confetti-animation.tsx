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
   shape: 'circle' | 'square' | 'ribbon' | 'star' | 'triangle' | 'heart' | 'hexagon' | 'spiral'
   blastDuration: number
   fallDuration: number
   delay: number
}

// Vibrant, realistic confetti colors
const colors = [
   '#fb0202ff', // Red
   '#02f4e4ff', // Teal
   '#3ed3f5ff', // Sky Blue
   '#bd3702ff', // Light Salmon
   '#05e5adff', // Mint
   '#f6d245ff', // Yellow
   '#a404e8ff', // Purple
   '#0aa7fbff', // Light Blue
   '#F8B500', // Gold
   '#FF1493', // Deep Pink
   '#00CED1', // Dark Turquoise
   '#fbdd31ff', // Gold
   '#f5027cff', // Hot Pink
   '#06f706ff', // Lime Green
]

function generateParticles(count: number): Particle[] {
   return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 800,
      y: -150 - Math.random() * 100,
      rotation: Math.random() * 360,
      scale: Math.random() * 0.8 + 0.4,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: (['circle', 'square', 'ribbon', 'star', 'triangle', 'heart', 'hexagon', 'spiral'] as const)[
         Math.floor(Math.random() * 8)
      ],
      blastDuration: 0.4 + Math.random() * 0.2,
      fallDuration: 2.5 + Math.random() * 1.5,
      delay: Math.random() * 0.15,
   }))
}

function StarShape({ color }: { color: string }) {
   return (
      <svg width="14" height="14" viewBox="0 0 14 14" fill={color}>
         <path d="M7 0L8.5 5H14L9.5 8.5L11 14L7 10L3 14L4.5 8.5L0 5H5.5L7 0Z" />
      </svg>
   )
}

function TriangleShape({ color }: { color: string }) {
   return (
      <svg width="14" height="14" viewBox="0 0 14 14" fill={color}>
         <path d="M7 0L14 14H0L7 0Z" />
      </svg>
   )
}

function HeartShape({ color }: { color: string }) {
   return (
      <svg width="14" height="14" viewBox="0 0 14 14" fill={color}>
         <path d="M7 13L6.1 12.2C2.8 9.3 0.5 7.2 0.5 4.5C0.5 2.4 2.1 0.8 4.2 0.8C5.4 0.8 6.5 1.3 7 2.1C7.5 1.3 8.6 0.8 9.8 0.8C11.9 0.8 13.5 2.4 13.5 4.5C13.5 7.2 11.2 9.3 7.9 12.2L7 13Z" />
      </svg>
   )
}

function HexagonShape({ color }: { color: string }) {
   return (
      <svg width="14" height="14" viewBox="0 0 14 14" fill={color}>
         <path d="M7 0L13 3.5V10.5L7 14L1 10.5V3.5L7 0Z" />
      </svg>
   )
}

function SpiralShape({ color }: { color: string }) {
   return (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={color} strokeWidth="2">
         <path d="M7 7C7 5.5 8 5 9 5C10.5 5 11 6 11 7C11 9 9 10 7 10C4 10 3 8 3 6C3 3 5 2 7 2C10 2 12 4 12 7" />
      </svg>
   )
}

export function ConfettiAnimation() {
   const [particles, setParticles] = useState<Particle[]>([])

   useEffect(() => {
      setParticles(generateParticles(120))
   }, [])

   return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
         {/* Success Message Circle */}
         <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
            initial={{ scale: 0, opacity: 0, rotate: -180 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ 
               type: "spring", 
               stiffness: 200, 
               damping: 15,
               delay: 0.3 
            }}
         >
            <div className="relative">
               {/* Animated outer glow rings */}
               <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                     background: 'radial-gradient(circle, rgba(16,185,129,0.4) 0%, rgba(16,185,129,0) 70%)',
                     filter: 'blur(25px)',
                  }}
                  animate={{
                     scale: [1.3, 1.6, 1.3],
                     opacity: [0.6, 0.9, 0.6],
                  }}
                  transition={{
                     duration: 0.5,
                     repeat: Infinity,
                     ease: "easeInOut"
                  }}
               />
               
               <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                     background: 'radial-gradient(circle, rgba(34,197,94,0.3) 0%, rgba(34,197,94,0) 70%)',
                     filter: 'blur(30px)',
                  }}
                  animate={{
                     scale: [1.4, 1.8, 1.4],
                     opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{
                     duration: 2.5,
                     repeat: Infinity,
                     ease: "easeInOut",
                     delay: 0.5
                  }}
               />
               
               {/* Main circle with neon glow */}
               <motion.div
                  className="relative rounded-full shadow-2xl"
                  style={{
                     width: '150px',
                     height: '150px',
                     background: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     border: '5px solid rgba(255, 255, 255, 0.9)',
                     boxShadow: '0 0 40px rgba(16, 185, 129, 0.6), 0 0 80px rgba(16, 185, 129, 0.4), inset 0 0 40px rgba(255, 255, 255, 0.1)',
                  }}
                  animate={{
                     boxShadow: [
                        '0 0 40px rgba(16, 185, 129, 0.6), 0 0 80px rgba(16, 185, 129, 0.4), inset 0 0 40px rgba(255, 255, 255, 0.1)',
                        '0 0 60px rgba(16, 185, 129, 0.8), 0 0 100px rgba(16, 185, 129, 0.6), inset 0 0 40px rgba(255, 255, 255, 0.2)',
                        '0 0 40px rgba(16, 185, 129, 0.6), 0 0 80px rgba(16, 185, 129, 0.4), inset 0 0 40px rgba(255, 255, 255, 0.1)',
                     ],
                  }}
                  transition={{
                     duration: 0.5,
                     repeat: Infinity,
                  }}
               >
                  {/* Inner content */}
                  <div className="text-center px-6">
                     <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                     >
                        {/* <motion.div 
                           className="text-6xl mb-2"
                           animate={{
                              scale: [1, 1.2, 1],
                           }}
                           transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              repeatDelay: 0.8,
                           }}
                        >
                           ✓
                        </motion.div> */}
                        <motion.div 
                           className="text-white font-bold text-2xl"
                           style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
                           animate={{
                              scale: [1, 1.05, 1],
                           }}
                           transition={{
                              duration: 1,
                              repeat: Infinity,
                              repeatDelay: 0.5,
                           }}
                        >
                           🎉 Success!
                        </motion.div>
                        {/* <motion.div 
                           className="text-white/95 text-base mt-2"
                           style={{ textShadow: '0 1px 5px rgba(0,0,0,0.2)' }}
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.7 }}
                        >
                           The Message perfectly Deliverd
                        </motion.div> */}
                     </motion.div>
                  </div>
               </motion.div>
            </div>
         </motion.div>

         {/* Confetti Particles - Blast then Fall */}
         {particles.map((particle) => {
            const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800
            
            return (
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
                     rotate: 0,
                     scale: particle.scale,
                  }}
                  animate={{
                     x: [0, particle.x, particle.x + (Math.sin(particle.id) * 30)],
                     y: [0, particle.y, screenHeight - 50],
                     opacity: [1, 1, 1, 0],
                     rotate: [0, particle.rotation * 2, particle.rotation * 2 + 720],
                  }}
                  transition={{
                     duration: particle.blastDuration + particle.fallDuration,
                     times: [0, particle.blastDuration / (particle.blastDuration + particle.fallDuration), 1],
                     ease: ["easeOut", "easeIn"],
                     delay: particle.delay,
                     x: {
                        times: [0, 0.15, 1],
                        duration: particle.blastDuration + particle.fallDuration,
                     },
                     y: {
                        times: [0, 0.15, 0.98, 1],
                        duration: particle.blastDuration + particle.fallDuration,
                     },
                     opacity: {
                        times: [0, 0.1, 0.97, 1],
                        duration: particle.blastDuration + particle.fallDuration,
                     }
                  }}
               >
                  {/* Bounce effect when hitting bottom */}
                  <motion.div
                     animate={{
                        y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -5, 0],
                     }}
                     transition={{
                        duration: particle.blastDuration + particle.fallDuration,
                        times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.96, 0.98, 1],
                     }}
                  >
                     {particle.shape === 'circle' && (
                        <motion.div
                           className="rounded-full"
                           style={{
                              width: '18px',
                              height: '18px',
                              backgroundColor: particle.color,
                              boxShadow: `0 0 15px ${particle.color}80, 0 2px 4px rgba(0,0,0,0.2)`,
                           }}
                           animate={{
                              scale: [1, 1.15, 1],
                           }}
                           transition={{
                              duration: 0.8,
                              repeat: Infinity,
                           }}
                        />
                     )}
                     {particle.shape === 'square' && (
                        <motion.div
                           style={{
                              width: '16px',
                              height: '16px',
                              backgroundColor: particle.color,
                              borderRadius: '2px',
                              boxShadow: `0 0 12px ${particle.color}80, 0 2px 4px rgba(0,0,0,0.2)`,
                           }}
                        />
                     )}
                     {particle.shape === 'ribbon' && (
                        <motion.div
                           style={{
                              width: '30px',
                              height: '7px',
                              backgroundColor: particle.color,
                              borderRadius: '3px',
                              boxShadow: `0 0 12px ${particle.color}80, 0 2px 4px rgba(0,0,0,0.2)`,
                           }}
                        />
                     )}
                     {particle.shape === 'star' && (
                        <motion.div
                           style={{
                              filter: `drop-shadow(0 0 10px ${particle.color}80) drop-shadow(0 2px 4px rgba(0,0,0,0.2))`,
                           }}
                        >
                           <StarShape color={particle.color} />
                        </motion.div>
                     )}
                     {particle.shape === 'triangle' && (
                        <motion.div
                           style={{
                              filter: `drop-shadow(0 0 10px ${particle.color}80) drop-shadow(0 2px 4px rgba(0,0,0,0.2))`,
                           }}
                        >
                           <TriangleShape color={particle.color} />
                        </motion.div>
                     )}
                     {particle.shape === 'heart' && (
                        <motion.div
                           style={{
                              filter: `drop-shadow(0 0 10px ${particle.color}80) drop-shadow(0 2px 4px rgba(0,0,0,0.2))`,
                           }}
                           animate={{
                              scale: [1, 1.3, 1],
                           }}
                           transition={{
                              duration: 0.9,
                              repeat: Infinity,
                           }}
                        >
                           <HeartShape color={particle.color} />
                        </motion.div>
                     )}
                     {particle.shape === 'hexagon' && (
                        <motion.div
                           style={{
                              filter: `drop-shadow(0 0 10px ${particle.color}80) drop-shadow(0 2px 4px rgba(0,0,0,0.2))`,
                           }}
                        >
                           <HexagonShape color={particle.color} />
                        </motion.div>
                     )}
                     {particle.shape === 'spiral' && (
                        <motion.div
                           style={{
                              filter: `drop-shadow(0 0 10px ${particle.color}80) drop-shadow(0 2px 4px rgba(0,0,0,0.2))`,
                           }}
                        >
                           <SpiralShape color={particle.color} />
                        </motion.div>
                     )}
                  </motion.div>
               </motion.div>
            )
         })}
      </div>
   )
}