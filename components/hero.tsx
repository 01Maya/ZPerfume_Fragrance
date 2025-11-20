'use client'

import { useEffect, useState, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import Navbar from './navbar'
import AnimatedBackground from './AnimatedBackground'

const heroImages = [
  'T Bgroup (2).png',
  'T newyc.png',
  'T ibiza night.png',
  //'T miami.png',
  'T oslo ejord.png',
  'T florence spring.png',
]

const heroHeadlines = [
  'A Scent That Defines You',
  'Discover Your Essence',
  'Luxury in Every Drop',
]

export default function Hero() {
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number }>
  >([])
  const particleIdRef = useRef(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentHeadlineIndex, setCurrentHeadlineIndex] = useState(0)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    const imageTimer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 4000)
    return () => clearInterval(imageTimer)
  }, [])

  useEffect(() => {
    const headlineTimer = setInterval(() => {
      setCurrentHeadlineIndex((prev) => (prev + 1) % heroHeadlines.length)
    }, 4000)
    return () => clearInterval(headlineTimer)
  }, [])

  const scrollToCarousel = () => {
    const carousel = document.getElementById('carousel-section')
    carousel?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (Math.random() > 0.93) {
      const newParticle = {
        id: particleIdRef.current++,
        x: e.clientX,
        y: e.clientY,
      }

      setParticles((prev) => [...prev.slice(-18), newParticle])

      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== newParticle.id))
      }, 1100)
    }
  }

  return (
    <AnimatedBackground>
      <section
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="relative w-full min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden pt-16 flex items-center"
      >
        <Navbar />

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

        <div className="relative z-10 min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-8 md:py-0 max-w-7xl mx-auto">
          <div className="text-center max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16 lg:gap-52">
            {/* Image Section - Hidden on very small screens, optimized for mobile */}
            <div className="flex-1 relative h-64 sm:h-72 md:h-96 perspective flex justify-center md:justify-end order-first md:order-none">
              <div className="relative w-48 sm:w-56 md:w-64 h-full">
                {heroImages.map((image, index) => (
                  <img
                    key={index}
                    src={image || "/placeholder.svg"}
                    alt={`Hero fragrance ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-contain transition-all duration-1000 ${
                      index === currentImageIndex
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-75'
                    }`}
                    style={{
                      transform: index === currentImageIndex ? 'rotateY(0deg)' : 'rotateY(90deg)',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1">
              <div
                className={`transition-all duration-1000 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="relative h-24 sm:h-28 md:h-32 flex items-center justify-center md:justify-start mb-4 md:mb-6">
                  {heroHeadlines.map((headline, index) => (
                    <h1
                      key={index}
                      className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent absolute transition-all duration-1000 leading-tight ${
                        index === currentHeadlineIndex
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-10'
                      }`}
                    >
                      {headline}
                    </h1>
                  ))}
                </div>

                <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 md:mb-12 font-light leading-relaxed max-w-2xl animate-slide-in-bottom md:text-left text-center md:text-left">
                  Discover the essence of luxury. Explore 10 world cities through captivating fragrances with personalized elegance.
                </p>
              </div>

              <div
                className={`transition-all duration-1000 delay-300 ${
                  isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              >
                <button
                  onClick={scrollToCarousel}
                  className="group relative inline-block px-6 sm:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-110 hover:shadow-purple-500/50 text-sm md:text-base"
                >
                  <span className="relative z-10">Explore Collection</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 rounded-full blur-xl bg-gradient-to-r from-blue-500 to-pink-500 opacity-0 group-hover:opacity-50 -z-10 transition-opacity duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20 cursor-pointer"
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: "smooth",
            });
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-gray-500 font-medium">Scroll to Explore</p>
            <ChevronDown className="w-6 h-6 text-gray-400" />
          </div>
        </div>

        <style>{`
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
          @keyframes slide-in-bottom {
            0% {
              transform: translateY(100px);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
          }
          .animate-slide-in-bottom {
            animation: slide-in-bottom 1s ease-out;
          }
        `}</style>
      </section>
    </AnimatedBackground>
  )
}
