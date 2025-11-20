'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Star,
  Heart,
  Sparkles,
  Building,
  Flame,
  Music4,
  Sun,
  TreePalm,
  Martini,
  Leaf,
  Flower,
  Snowflake,
  Citrus
} from 'lucide-react'

const products = [
  {
    name: 'New York Chic',
    color: '#2F5FFF',
    textColor: 'text-blue-600',
    bgLight: 'bg-blue-50',
    city: 'New York',
    image:
      'T newyc.png'
  },
  {
    name: 'Athens Glow',
    color: '#FFE767',
    textColor: 'text-gray-800',
    bgLight: 'bg-yellow-50',
    city: 'Athens',
    image:
      'T athnes glow.png'
  },
  {
    name: 'Ibiza Nights',
    color: '#00C9FF',
    textColor: 'text-cyan-600',
    bgLight: 'bg-cyan-50',
    city: 'Ibiza',
    image:
      'T ibiza night.png'
  },
  {
    name: 'Sydney Sun',
    color: '#FF5C47',
    textColor: 'text-red-600',
    bgLight: 'bg-red-50',
    city: 'Sydney',
    image:
      'T sydney sun.png'
  },
  {
    name: 'Miami',
    color: '#FF85CE',
    textColor: 'text-pink-600',
    bgLight: 'bg-pink-50',
    city: 'Miami',
    image:
      'T miami.png'
  },
  {
    name: 'Lisbon Fado',
    color: '#66FF7A',
    textColor: 'text-green-600',
    bgLight: 'bg-green-50',
    city: 'Lisbon',
    image:
      'T lisbon fado.png'
  },
  {
    name: 'Paris Girl',
    color: '#FF3D8E',
    textColor: 'text-fuchsia-600',
    bgLight: 'bg-fuchsia-50',
    city: 'Paris',
    image:
      'T paris girl.png'
  },
  {
    name: 'Oslo Fjord',
    color: '#75E8E2',
    textColor: 'text-teal-600',
    bgLight: 'bg-teal-50',
    city: 'Oslo',
    image:
      'T oslo ejord.png'
  },
  {
    name: 'Havana Beat',
    color: '#FFA95C',
    textColor: 'text-orange-600',
    bgLight: 'bg-orange-50',
    city: 'Havana',
    image:
      'T havana beats.png'
  },
  {
    name: 'Florence Spring',
    color: '#E4B8FF',
    textColor: 'text-purple-600',
    bgLight: 'bg-purple-50',
    city: 'Florence',
    image:
      'T Florence spring.png'
  }
]

const cityIcons: Record<string, any> = {
  'New York': Building,
  Athens: Flame,
  Ibiza: Music4,
  Sydney: Sun,
  Miami: TreePalm,
  Lisbon: Martini,
  Paris: Flower,
  Oslo: Snowflake,
  Havana: Citrus,
  Florence: Leaf
}

export default function ProductShowcase() {
  const [isVisible, setIsVisible] = useState(false)
  const [liked, setLiked] = useState<Set<number>>(new Set())
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.23 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleMouseMove = (e: any, index: number) => {
    if (hoveredIndex !== index) return
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    })
  }

  const toggleLike = (index: number) => {
    setLiked(prev => {
      const newSet = new Set(prev)
      newSet.has(index) ? newSet.delete(index) : newSet.add(index)
      return newSet
    })
  }

  return (
    <section ref={sectionRef} id="showcase-section" className="w-full py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-20">
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-pink-500/10 rounded-full border border-blue-200">
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-2 justify-center">
              <Sparkles className="w-4 h-4" />
              Our Collection
            </span>
          </div>

          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Complete <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Collection</span>
          </h2>

          <p className="text-xl text-gray-600">
            Discover all 10 unique fragrances crafted for every personality
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {products.map((product, index) => {
            const Icon = cityIcons[product.city]

            return (
              <div
                key={index}
                className="transition-all duration-700"
                style={{ transitionDelay: `${index * 50}ms` }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onMouseMove={e => handleMouseMove(e, index)}
              >

                <div
                  className={`relative ${product.bgLight} rounded-3xl p-8 h-full hover:shadow-2xl transition-all duration-300 group cursor-pointer overflow-hidden border-2 border-transparent hover:border-current`}
                  style={{
                    transform:
                      hoveredIndex === index
                        ? `perspective(1000px) rotateX(${(mousePos.y - 0.5) * 10}deg) rotateY(${(mousePos.x - 0.5) * -10}deg) scale(1.05)`
                        : 'perspective(1000px) rotateX(0) rotateY(0) scale(1)',
                    boxShadow:
                      hoveredIndex === index
                        ? `0 20px 40px ${product.color}40, inset 0 1px 0 ${product.color}20`
                        : 'none'
                  }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${product.color}30, transparent 60%)`
                    }}
                  />

                  <div className="relative z-10 mb-4 h-32 flex items-center justify-center overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`max-w-24 h-32 object-contain transition-all duration-500 ${
                        hoveredIndex === index ? 'scale-125 rotate-12' : 'scale-100 rotate-0'
                      }`}
                    />
                  </div>

                  <h3 className={`${product.textColor} font-bold text-lg text-center mb-2`}>
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-600 text-center mb-4">Premium Fragrance</p>

                  <div className="relative z-10 flex gap-2">

                    <button
                      onClick={() => toggleLike(index)}
                      className={`flex-1 py-2 rounded-lg font-semibold text-sm transition-all duration-300 overflow-hidden relative group/like
                        ${liked.has(index)
                          ? 'bg-red-100 text-red-600 scale-105'
                          : `${product.bgLight} ${product.textColor} hover:scale-105 border-2 border-current border-opacity-30 hover:border-opacity-100`}
                      `}
                    >
                      <Heart
                        className={`heart-icon w-4 h-4 mx-auto transition-all duration-300 ${
                          liked.has(index) ? 'fill-current animate-heartSmooth' : ''
                        }`}
                      />
                    </button>

                    {/* ICON BUTTON WITH icon-btn CLASS */}
                    <button
                      className={`icon-btn flex-1 py-2 rounded-lg ${product.bgLight} ${product.textColor} font-semibold text-sm hover:shadow-md transition-all duration-300 border-2 border-current border-opacity-30 hover:border-opacity-100 relative overflow-hidden`}
                      aria-label={`${product.name} city icon`}
                    >
                      <Icon className="w-5 h-5 mx-auto" />
                    </button>

                  </div>

                  {/* SMOOTH STAR RATING */}
                  {hoveredIndex === index && (
                    <div className="absolute bottom-2 left-4 right-4 flex items-center justify-center gap-1 text-xs font-semibold">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 fill-yellow-400 text-yellow-400"
                          style={{ opacity: 0, transform: 'scale(0.75)', animation: `starIn 420ms ease ${i * 70}ms forwards` }}
                        />
                      ))}
                      <span className={product.textColor}>(4.9)</span>
                    </div>
                  )}

                </div>
              </div>
            )
          })}

        </div>
      </div>

<style jsx>{`
  /* HEART POP */
  @keyframes heartSmooth {
    0% { transform: scale(1); }
    30% { transform: scale(1.45); }
    60% { transform: scale(0.92); }
    100% { transform: scale(1); }
  }
  .animate-heartSmooth {
    animation: heartSmooth 0.45s cubic-bezier(0.25, 0.8, 0.25, 1);
    fill: currentColor;
  }

  /* STAR IN */
  @keyframes starIn {
    from { opacity: 0; transform: scale(0.75); }
    to { opacity: 1; transform: scale(1); }
  }

  /* ICON ROTATION — 720° */
  @keyframes rotateSmooth720 {
    from { transform: rotate(0deg); }
    to { transform: rotate(720deg); }
  }

  .icon-btn svg {
    transform-origin: center;
    display: block;
  }

  .icon-btn:hover svg {
    animation: rotateSmooth720 1.1s ease-in-out forwards;
  }

  .icon-btn:not(:hover) svg {
    animation: none;
  }
`}</style>

    </section>
  )
}
