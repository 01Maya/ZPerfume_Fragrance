'use client'

import React, { useState, useRef } from 'react'
import {
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Send,
  Share2,
  ArrowUpRight,
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
import AnimatedBackground from '@/components/AnimatedBackground'

export default function Footer(): JSX.Element {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number }>
  >([])
  const particleIdRef = useRef(0)

  const perfumeData = [
    { name: 'New York Chic', color: '#2F5FFF', city: 'New York' },
    { name: 'Athens Glow', color: '#FFE767', city: 'Athens' },
    { name: 'Ibiza Nights', color: '#00C9FF', city: 'Ibiza' },
    { name: 'Sydney Sun', color: '#FF5C47', city: 'Sydney' },
    { name: 'Miami Miami', color: '#FF85CE', city: 'Miami' },
    { name: 'Lisbon Fado', color: '#66FF7A', city: 'Lisbon' },
    { name: 'Paris Girl', color: '#FF3D8E', city: 'Paris' },
    { name: 'Oslo Fjord', color: '#75E8E2', city: 'Oslo' },
    { name: 'Havana Beat', color: '#FFA95C', city: 'Havana' },
    { name: 'Florence Spring', color: '#E4B8FF', city: 'Florence' },
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
    Florence: Leaf,
  }

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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 2600)
  }

  return (
    <AnimatedBackground>
      <footer
        onMouseMove={handleMouseMove}
        className="relative w-full bg-gradient-to-b from-slate-50 via-purple-50 to-pink-50 py-20 text-gray-900 overflow-hidden"
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

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Join the Scent Revolution
            </h2>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              Luxury fragrances inspired by iconic world cities.
            </p>
          </div>

          {/* Signature Collection */}
          <div className="mb-16 p-8 bg-white/60 backdrop-blur-xl rounded-3xl border border-purple-200/60 shadow-xl transition-all duration-500 ease-out hover:shadow-2xl hover:border-purple-300/80">
            <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent transition-all duration-500">
              Our Signature Collection
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {perfumeData.map((perfume, index) => {
                const Icon = cityIcons[perfume.city]

                return (
                  <div
                    key={index}
                    className="card-group relative h-32 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1"
                    style={{
                      background: `linear-gradient(135deg, ${perfume.color}20, ${perfume.color}40)`,
                      border: `2px solid ${perfume.color}`,
                    }}
                  >
                    {/* BIG ICON */}
                    <div className="icon-anim absolute inset-0 flex items-center justify-center z-20 pointer-events-none transition-transform duration-300 ease-out">
                      <Icon className="icon-svg w-8 h-8 text-gray-900/85 transition-transform duration-300" />
                    </div>

                    {/* NAME */}
                    <div className="name-layer absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                      <span className="name-text opacity-0 text-white font-bold text-sm transition-opacity duration-500 ease-out">
                        {perfume.name}
                      </span>
                    </div>

                    {/* SMALL ICON BELOW NAME */}
                    <div
                      className="final-icon absolute left-0 right-0 flex justify-center z-30 pointer-events-none transition-opacity duration-500 ease-out"
                      style={{ top: '74px' }}
                    >
                      <Icon className="final-svg w-5 h-5 text-white opacity-0 transition-opacity duration-500 ease-out" />
                    </div>

                    {/* Color overlay */}
                    <div
                      className="overlay absolute inset-0 opacity-0 transition-opacity duration-300 ease-out"
                      style={{ backgroundColor: perfume.color }}
                    />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Provided content (unchanged) */}
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="group cursor-pointer">
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Zudio
              </h3>
              <p className="text-gray-700">
                Luxury fragrances inspired by the world's most captivating cities.
              </p>
              <div className="mt-4 flex gap-2">
                <span className="text-xs text-gray-600">Crafted with passion</span>
              </div>
            </div>

            {[...[
              {
                title: 'Collection',
                links: ['All Perfumes', 'New Arrivals', 'Best Sellers', 'Limited Edition'],
              },
              {
                title: 'Company',
                links: ['About Us', 'Careers', 'Contact', 'Sustainability'],
              },
              {
                title: 'Support',
                links: ['Shipping Info', 'Returns', 'Track Order', 'FAQ'],
              },
            ].map((section, idx) => (
              <div key={idx}>
                <h4 className="text-lg font-semibold mb-4 text-gray-900">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        onMouseEnter={() => setHoveredLink(link)}
                        onMouseLeave={() => setHoveredLink(null)}
                        className="inline-flex items-center gap-2 text-gray-700 hover:text-purple-600 hover:translate-x-2 transition-all"
                      >
                        <span className="relative">
                          {link}
                          <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-gradient-to-r from-blue-600 to-pink-600 transition-all group-hover:w-full"></span>
                        </span>

                        {hoveredLink === link && (
                          <ArrowUpRight className="w-4 h-4 text-blue-500" />
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))]}
          </div>

          {/* Subscribe */}
          <div className="mb-12 p-8 rounded-3xl border border-purple-200/70 bg-gradient-to-r from-blue-100/60 via-purple-100/60 to-pink-100/60">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="flex items-center gap-2 text-2xl font-bold">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                  Scent Updates & Exclusive Offers
                </h3>
                <p className="text-gray-700 text-sm">
                  Get first access to new fragrances and exclusive releases.
                </p>
              </div>

              <form onSubmit={handleSubscribe} className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-purple-200 bg-white/80"
                />

                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-pink-600 text-white rounded-xl">
                  Subscribe <Send className="w-4 h-4 inline-block ml-2" />
                </button>
              </form>
            </div>

            {subscribed && (
              <div className="mt-4 p-3 bg-green-100 border border-green-400 rounded-xl">
                <p className="text-green-700 text-sm">✓ Subscription successful!</p>
              </div>
            )}
          </div>

          {/* Social Icons */}
          <div className="mb-10 flex justify-center gap-6">
            {[...[
              { Icon: Instagram, color: 'from-pink-500 to-rose-500' },
              { Icon: Facebook, color: 'from-blue-600 to-blue-400' },
              { Icon: Twitter, color: 'from-blue-400 to-cyan-400' },
              { Icon: Mail, color: 'from-purple-500 to-pink-500' },
            ].map(({ Icon, color }, i) => (
              <a
                key={i}
                className="relative w-12 h-12 flex items-center justify-center rounded-full bg-white/60 border border-purple-200 shadow-md hover:scale-125 transition-all"
                href="#"
              >
                <Icon className="w-6 h-6 text-gray-800 z-10" />
                <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${color} opacity-0 hover:opacity-40 blur-lg`}></div>
              </a>
            ))]}
          </div>

          {/* Bottom */}
          <div className="border-t border-purple-200/50 pt-8 flex justify-between items-center text-sm text-gray-700">
            <p>
              © 2025 Zudio.{' '}
              <span className="bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
                Crafted with Luxury ✨
              </span>
            </p>

            <div className="flex items-center gap-2">
              <a
                href="https://zperf-fragrance.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-all duration-300 hover:translate-x-1"
              >
                <Share2 className="w-4 h-4" /> Share
              </a>

              <span>|</span>
              <span>Premium fragrances for the discerning individual</span>
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

          @keyframes iconSequenceRotate {
            0% {
              transform: translateY(0) scale(1) rotate(0deg);
              opacity: 1;
            }
            25% {
              transform: translateY(-6px) scale(1.45) rotate(90deg);
              opacity: 1;
            }
            60% {
              transform: translateY(28px) scale(0.85) rotate(180deg);
              opacity: 0.25;
            }
            100% {
              transform: translateY(36px) scale(0.6) rotate(270deg);
              opacity: 0;
            }
          }

          .card-group {
            --anim-duration: 680ms;
          }

          .card-group .icon-svg {
            transform-origin: center;
          }

          .card-group:hover .icon-svg {
            animation: iconSequenceRotate var(--anim-duration) forwards ease-out;
          }

          .card-group .name-text {
            opacity: 0;
            transition: opacity 0.35s ease;
          }

          .card-group:hover .name-text {
            opacity: 1;
            transition-delay: 420ms;
          }

          .card-group .final-svg {
            opacity: 0;
            transition: opacity 0.35s ease;
          }

          .card-group:hover .final-svg {
            opacity: 1;
            transition-delay: 440ms;
          }

          .card-group:hover .overlay {
            opacity: 0.75;
          }
        `}</style>
      </footer>
    </AnimatedBackground>
  )
}
