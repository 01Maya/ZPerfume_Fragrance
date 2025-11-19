'use client'

import React, { useState, useRef } from 'react'

interface AnimatedBackgroundProps {
  children: React.ReactNode
}

export default function AnimatedBackground({
  children,
}: AnimatedBackgroundProps): JSX.Element {
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number }>
  >([])
  const particleIdRef = useRef(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (Math.random() > 0.93) {
      const newParticle = {
        id: particleIdRef.current++,
        x: e.clientX,
        y: e.clientY,
      }

      setParticles(prev => [...prev.slice(-18), newParticle])

      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== newParticle.id))
      }, 1100)
    }
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative w-full overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-pink-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-0 w-72 h-72 bg-purple-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map(p => (
          <div
            key={p.id}
            className="fixed w-1 h-1 rounded-full bg-gradient-to-r from-blue-400 to-pink-400"
            style={{
              left: `${p.x}px`,
              top: `${p.y}px`,
              animation: 'float-up 1.1s ease-out forwards',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>

      <style jsx>{`
        @keyframes float-up {
          to {
            opacity: 0;
            transform: translateY(-80px);
          }
        }
      `}</style>
    </div>
  )
}