'use client'

import { useState, useRef, useEffect } from 'react'
import { Sparkles, Heart, Zap, Wind } from 'lucide-react'

export default function Experience() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

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

  const experiences = [
    {
      icon: Heart,
      title: 'Sensory Journey',
      description: 'Each fragrance is a multi-layered sensory experience that evolves throughout the day.',
      color: 'from-pink-500 to-red-500',
      bgColor: 'from-pink-50 to-red-50',
    },
    {
      icon: Zap,
      title: 'Instant Elegance',
      description: 'Feel confident and sophisticated with just a few sprays of pure luxury.',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-50 to-orange-50',
    },
    {
      icon: Wind,
      title: 'Lasting Impression',
      description: 'Premium formulations ensure your signature scent lingers beautifully for hours.',
      color: 'from-cyan-500 to-blue-500',
      bgColor: 'from-cyan-50 to-blue-50',
    },
    {
      icon: Sparkles,
      title: 'Mood Elevation',
      description: 'Transform your mood and mindset with our carefully curated aromatic blends.',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50',
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="experience-section"
      className="relative w-full py-24 bg-gradient-to-b from-slate-50 via-purple-50 to-pink-50"
    >
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-pink-500/10 rounded-full border border-blue-200">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-600">The Experience</span>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              More Than Just a
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Fragrance
              </span>
            </h2>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover how our perfumes transform moments into memories and elevate your everyday life.
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((experience, idx) => {
            const Icon = experience.icon
            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group relative overflow-hidden rounded-2xl p-8 cursor-pointer transition-all duration-500 ease-out ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{
                  transitionDelay: `${idx * 100}ms`,
                }}
              >
                {/* Background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${experience.bgColor} transition-all duration-500 group-hover:scale-110`}
                />

                {/* Border gradient */}
                <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-br from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-full bg-gradient-to-br ${experience.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300">
                    {experience.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-900 transition-all duration-300">
                    {experience.description}
                  </p>
                </div>

                {/* Shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
