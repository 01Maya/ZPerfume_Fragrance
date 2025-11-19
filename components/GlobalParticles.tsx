'use client'

import React, { useState, useRef, ReactNode } from 'react'

interface GlobalParticlesProps {
  children: ReactNode
}

export default function GlobalParticles({
  children,
}: GlobalParticlesProps): JSX.Element {
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; color: string }>
  >([])
  const particleIdRef = useRef(0)

  const particleColors = [
    'from-blue-400 to-cyan-400',
    'from-purple-400 to-pink-400',
    'from-pink-400 to-red-400',
    'from-blue-400 to-purple-400',
  ]

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (Math.random() > 0.75) {
      // Increased frequency - was 0.85
      const particleCount = Math.floor(Math.random() * 4) + 3 // Generate 3-6 particles at once
      
      for (let i = 0; i < particleCount; i++) {
        const newParticle = {
          id: particleIdRef.current++,
          x: e.clientX + (Math.random() - 0.5) * 40, // Larger offset
          y: e.clientY + (Math.random() - 0.5) * 40,
          color: particleColors[Math.floor(Math.random() * particleColors.length)],
        }

        setParticles(prev => [...prev.slice(-50), newParticle]) // Increased from 30 to 50
      }
    }
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative w-full overflow-x-hidden"
    >
      {/* Global Background blobs - Fixed position */}
      <div className="fixed inset-0 opacity-25 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-pink-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-0 w-72 h-72 bg-purple-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-cyan-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/3 left-0 w-72 h-72 bg-rose-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.8s' }} />
      </div>

      {/* Global Floating particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {particles.map(p => (
          <div
            key={p.id}
            className={`fixed w-2 h-2 rounded-full bg-gradient-to-r ${p.color}`}
            style={{
              left: `${p.x}px`,
              top: `${p.y}px`,
              animation: 'float-up 1.2s ease-out forwards',
              boxShadow: `0 0 12px rgba(59, 130, 246, 0.8), 0 0 24px rgba(168, 85, 247, 0.4)`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        {children}
      </div>

      <style jsx>{`
        @keyframes float-up {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
          50% {
            opacity: 0.9;
          }
          100% {
            opacity: 0;
            transform: translateY(-120px) scale(0.3);
            filter: blur(2px);
          }
        }
      `}</style>
    </div>
  )
}