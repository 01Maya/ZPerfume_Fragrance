'use client'

import { useState, useRef, useEffect } from 'react'
import { Wind, Zap } from 'lucide-react'

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  life: number
  color: string
  size: number
}

export default function SpraySection() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [sprayCount, setSprayCount] = useState(0)
  const canvasRef = useRef<HTMLDivElement>(null)
  const particleIdRef = useRef(0)

  const handleSpray = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const colors = ['#2F5FFF', '#FFE767', '#00C9FF', '#FF5C47', '#FF85CE', '#66FF7A', '#FF3D8E', '#75E8E2']
    
    // Create initial burst particles
    for (let i = 0; i < 30; i++) {
      const angle = (i / 30) * Math.PI * 2 + (Math.random() - 0.5) * 0.8
      const velocity = 4 + Math.random() * 6
      const size = 2 + Math.random() * 4
      
      const newParticle: Particle = {
        id: particleIdRef.current++,
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 1.5,
        life: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        size,
      }
      
      setParticles((prev) => [...prev, newParticle])
    }

    // Create secondary spray particles with delay
    for (let i = 0; i < 15; i++) {
      const angle = (i / 15) * Math.PI * 2 + (Math.random() - 0.5) * 1.2
      const velocity = 2 + Math.random() * 3
      
      setTimeout(() => {
        const delayedParticle: Particle = {
          id: particleIdRef.current++,
          x,
          y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          life: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 1 + Math.random() * 2,
        }
        setParticles((prev) => [...prev, delayedParticle])
      }, 50)
    }

    setSprayCount((prev) => prev + 1)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.15,
            vx: p.vx * 0.98,
            life: p.life - 0.025,
          }))
          .filter((p) => p.life > 0)
      )
    }, 30)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative w-full py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent animate-fade-in-down">
            Interactive Spray Experience
          </h2>
          <p className="text-gray-700 text-lg animate-slide-in-bottom">
            Click anywhere to spray and watch elegant fragrance particles disperse with realistic physics
          </p>
        </div>

        <div
          ref={canvasRef}
          onClick={handleSpray}
          className="relative w-full h-96 bg-gradient-to-br from-white/80 to-purple-50/80 rounded-3xl border-2 border-purple-200 backdrop-blur-sm overflow-hidden shadow-lg cursor-crosshair hover:border-purple-400 transition-colors duration-300"
        >
          {/* Particles visualization */}
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: `${particle.x}px`,
                top: `${particle.y}px`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color,
                opacity: particle.life * 0.9,
                transform: `scale(${Math.max(0.2, particle.life)})`,
                boxShadow: `0 0 ${12 * particle.life}px ${particle.color}, inset 0 0 ${6 * particle.life}px rgba(255,255,255,${particle.life * 0.5})`,
              }}
            />
          ))}

          {/* Decorative elements */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <Wind className="w-12 h-12 text-purple-300 mx-auto mb-2 animate-bounce" />
              <p className="text-gray-400 font-medium">Click to Spray</p>
              <p className="text-sm text-gray-400 mt-2">Sprays: {sprayCount}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <button
            onClick={(e) => {
              e.preventDefault()
              const canvas = canvasRef.current
              if (canvas) {
                const rect = canvas.getBoundingClientRect()
                const clickEvent = new MouseEvent('click', {
                  bubbles: true,
                  cancelable: true,
                  view: window,
                  clientX: rect.left + rect.width / 2,
                  clientY: rect.top + rect.height / 2,
                })
                canvas.dispatchEvent(clickEvent)
              }
            }}
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 overflow-hidden flex items-center gap-2"
          >
            <Wind className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span>Spray Now</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 -z-10 transition-opacity duration-300 rounded-xl blur-lg" />
          </button>

          <button
            onClick={() => {
              setParticles([])
              setSprayCount(0)
            }}
            className="group relative px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-110 border-2 border-gray-300 hover:border-purple-400 flex items-center gap-2"
          >
            <Zap className="w-5 h-5" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </section>
  )
}
