'use client'

import { useEffect, useRef, useState } from 'react'
import { Sparkles } from 'lucide-react'

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number }>
  >([])
  const particleIdRef = useRef(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (rect) {
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      setMousePosition({ x: x * 20, y: y * 20 })

      // Particles logic
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
  }

  return (
    <section
      ref={sectionRef}
      id="about-section"
      className="relative w-full py-24 bg-white overflow-hidden"
      onMouseMove={handleMouseMove}
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

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div
              className={`transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-pink-500/10 rounded-full border border-blue-200">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-600">About Our Craft</span>
              </div>

              <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Our <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Story</span>
              </h2>

              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                Zudio is a journey through the world's most vibrant cities, captured in exquisite fragrances. Each scent tells a story of passion, culture, and elegance.
              </p>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We believe that luxury is not just about appearance—it's about the feeling you carry with you. From the electric energy of New York to the serene fjords of Oslo, every perfume is crafted to evoke emotions and memories.
              </p>

              <div className="space-y-4">
                {[
                  {
                    title: 'Premium Craftsmanship',
                    desc: 'Handpicked ingredients from around the world',
                    gradient: 'from-blue-500 to-cyan-500',
                  },
                  {
                    title: 'Sustainable Luxury',
                    desc: 'Eco-conscious packaging and ethical sourcing',
                    gradient: 'from-purple-500 to-pink-500',
                  },
                  {
                    title: 'Unique Expressions',
                    desc: '10 distinct fragrances for your individuality',
                    gradient: 'from-pink-500 to-red-500',
                  },
                ].map((feature, idx) => (
                  <div key={idx} className="group flex items-start gap-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-pink-50 transition-all duration-300 cursor-pointer">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white font-bold flex-shrink-0 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>
                      ✓
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div
              className="relative h-100 rounded-3xl overflow-hidden shadow-2xl group cursor-pointer"
              style={{
                transform: `perspective(1200px) rotateX(${mousePosition.y * 0.5}deg) rotateY(${mousePosition.x * 0.5}deg)`,
                transition: 'transform 0.3s ease-out',
              }}
            >
              <img
                src="/PERF10B.jpg"
                alt="Perfume collection"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/20 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-up {
          to {
            opacity: 0;
            transform: translateY(-80px);
          }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </section>
  )
}
