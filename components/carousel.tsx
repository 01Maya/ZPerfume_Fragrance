'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { MapPin, Sparkles } from 'lucide-react'

const cityIcons: { [key: string]: React.ReactNode } = {
  'New York Chic': '🗽',
  'Athens Glow': '⛪',
  'Ibiza Nights': '🌴',
  'Sydney Sun': '🦘',
  'Miami Miami': '🏖️',
  'Lisbon Fado': '🎸',
  'Paris Girl': '🗼',
  'Oslo Fjord': '⛰️',
  'Havana Beat': '🎷',
  'Florence Spring': '🎨',
}

const perfumes = [
  {
    name: 'New York Chic',
    color: '#2F5FFF',
    description: 'Electric Blue',
    textColor: 'text-white',
    bgGradient: 'from-blue-600 to-blue-400',
    image: 'T newyc.png',
    city: 'New York',
  },
  {
    name: 'Athens Glow',
    color: '#FFE767',
    description: 'Radiant Yellow',
    textColor: 'text-gray-800',
    bgGradient: 'from-yellow-300 to-amber-300',
    image: 'T athnes glow.png',
    city: 'Athens',
  },
  {
    name: 'Ibiza Nights',
    color: '#00C9FF',
    description: 'Bright Aqua Sky',
    textColor: 'text-cyan-900',
    bgGradient: 'from-cyan-400 to-blue-300',
    image: 'T ibiza night.png',
    city: 'Ibiza',
  },
  {
    name: 'Sydney Sun',
    color: '#FF5C47',
    description: 'Lively Coral Red',
    textColor: 'text-red-900',
    bgGradient: 'from-red-500 to-orange-400',
    image: 'T sydney sun.png',
    city: 'Sydney',
  },
  {
    name: 'Miami Miami',
    color: '#FF85CE',
    description: 'Vibrant Pink Pop',
    textColor: 'text-pink-900',
    bgGradient: 'from-pink-400 to-rose-300',
    image: 'T miami.png',
    city: 'Miami',
  },
  {
    name: 'Lisbon Fado',
    color: '#66FF7A',
    description: 'Neon Lime Green',
    textColor: 'text-blue-900',
    bgGradient: 'from-lime-400 to-green-300',
    image: 'T lisbon fado.png',
    city: 'Lisbon',
  },
  {
    name: 'Paris Girl',
    color: '#FF3D8E',
    description: 'Hot Magenta Pink',
    textColor: 'text-white',
    bgGradient: 'from-fuchsia-500 to-pink-400',
    image: 'T paris girl.png',
    city: 'Paris',
  },
  {
    name: 'Oslo Fjord',
    color: '#75E8E2',
    description: 'Bright Mint Teal',
    textColor: 'text-teal-900',
    bgGradient: 'from-teal-300 to-cyan-300',
    image: 'T oslo ejord.png',
    city: 'Oslo',
  },
  {
    name: 'Havana Beat',
    color: '#FFA95C',
    description: 'Sunny Peach Orange',
    textColor: 'text-white',
    bgGradient: 'from-orange-400 to-amber-300',
    image: 'T havana beats.png',
    city: 'Havana',
  },
  {
    name: 'Florence Spring',
    color: '#E4B8FF',
    description: 'Fresh Pastel Lavender',
    textColor: 'text-purple-900',
    bgGradient: 'from-purple-300 to-pink-200',
    image: 'T florence spring.png',
    city: 'Florence',
  },
]

export default function Carousel() {
  const [active, setActive] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [mouseX, setMouseX] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isAutoPlay) return
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % perfumes.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isAutoPlay])

  const next = () => {
    setIsAutoPlay(false)
    setActive((prev) => (prev + 1) % perfumes.length)
  }

  const prev = () => {
    setIsAutoPlay(false)
    setActive((prev) => (prev - 1 + perfumes.length) % perfumes.length)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setMouseX((e.clientX - rect.left) / rect.width)
    }
  }

  const currentPerfume = perfumes[active]

  return (
    <section
      id="carousel-section"
      className={`relative w-full min-h-screen py-20 transition-all duration-1000 bg-gradient-to-br ${currentPerfume.bgGradient} overflow-hidden`}
    >
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute w-96 h-96 bg-white rounded-full blur-3xl top-1/2 left-1/4 animate-pulse" />
        <div className="absolute w-80 h-80 bg-white rounded-full blur-3xl bottom-1/4 right-1/3 animate-pulse animation-delay-2000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 h-full">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 md:mb-20 gap-6 md:gap-8">
          <div className="flex-1">
            <div className="w-full flex justify-center md:justify-start">
              <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-center">
                <p className={`text-sm font-semibold ${currentPerfume.textColor}`}>
                  Featured Collection
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <h2 className={`text-4xl sm:text-5xl md:text-6xl font-bold ${currentPerfume.textColor} leading-tight`}>
                {currentPerfume.name}
              </h2>
              <span className="text-4xl">{cityIcons[currentPerfume.name]}</span>
            </div>
            <p className={`text-lg md:text-xl ${currentPerfume.textColor} opacity-80 flex items-center gap-2`}>
              <Sparkles className="w-5 h-5" />
              {currentPerfume.city} Premium Fragrance
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={prev}
              className={`group relative p-3 rounded-full ${currentPerfume.textColor} border-2 border-current hover:bg-gray hover:bg-opacity-30 transition-all duration-300 transform hover:scale-125 hover:-translate-y-1`}
            >
              <ChevronLeft className="w-6 h-6" />
              <div className="absolute inset-0 rounded-full blur-lg bg-current opacity-0 group-hover:opacity-20 -z-10 transition-opacity duration-300" />
            </button>
            <button
              onClick={next}
              className={`group relative p-3 rounded-full ${currentPerfume.textColor} border-2 border-current hover:bg-gray hover:bg-opacity-30 transition-all duration-300 transform hover:scale-125 hover:-translate-y-1`}
            >
              <ChevronRight className="w-6 h-6" />
              <div className="absolute inset-0 rounded-full blur-lg bg-current opacity-0 group-hover:opacity-20 -z-10 transition-opacity duration-300" />
            </button>
          </div>
        </div>

        <div
          ref={containerRef}
          className="flex justify-center items-center mb-12 md:mb-16 h-64 sm:h-80 md:h-96 perspective"
          onMouseMove={handleMouseMove}
          style={{ perspective: '1200px' }}
        >
          {perfumes.map((perfume, index) => {
            const distance = Math.abs(index - active)
            const isVisible = distance < 3
            const offset = index > active ? distance : -distance

            if (!isVisible) return null

            const isCenter = index === active
            const tiltX = isCenter ? (mouseX - 0.5) * 10 : 0
            const tiltY = isCenter ? (mouseX - 0.5) * -10 : 0

            return (
              <div
                key={index}
                className={`absolute transition-all duration-500 ${
                  index === active ? 'z-20 scale-100' : 'z-10 scale-75 opacity-50'
                }`}
                style={{
                  transform: `translateX(${offset * (index > active ? 280 : -280)}px) rotateX(${tiltY}deg) rotateY(${tiltX}deg) rotateZ(${isCenter ? 0 : offset * 5}deg)`,
                  transformStyle: 'preserve-3d',
                }}
              >
                <div
                  className="w-56 sm:w-64 md:w-72 h-72 md:h-96 rounded-3xl shadow-2xl overflow-hidden flex items-center justify-center group cursor-pointer hover:shadow-3xl transition-all duration-300 hover:scale-110 relative"
                  style={{
                    backgroundColor: perfume.color,
                    boxShadow: isCenter ? `0 20px 60px ${perfume.color}80` : '',
                  }}
                  onMouseEnter={() => setIsAutoPlay(false)}
                >
                  <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
                    <div className="absolute top-6 text-5xl z-30 animate-bounce">
                      {cityIcons[perfume.name]}
                    </div>

                    {/* Sparkle effect on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute top-0 left-0 w-32 h-32 bg-white/20 blur-2xl rounded-full" />
                      <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 blur-3xl rounded-full" />
                    </div>

                    <img
                      src={perfume.image || '/placeholder.svg'}
                      alt={perfume.name}
                      className="w-full h-full object-contain relative z-10 group-hover:scale-110 transition-transform duration-500 pt-16"
                    />

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex justify-center gap-2 md:gap-3 flex-wrap px-4">
          {perfumes.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActive(index)
                setIsAutoPlay(false)
              }}
              className={`rounded-full transition-all duration-500 hover:scale-150 ${
                index === active
                  ? `bg-white scale-125 w-8 md:w-10 h-2.5 shadow-lg`
                  : `bg-white bg-opacity-40 hover:bg-opacity-70 w-2 h-2`
              }`}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.3); }
          50% { box-shadow: 0 0 40px rgba(255, 255, 255, 0.6); }
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  )
}
