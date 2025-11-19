'use client'

import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id)
    section?.scrollIntoView({ behavior: 'smooth' })
  }

  const navItems = [
    { label: 'Perfumes', id: 'carousel-section' },
    { label: 'About', id: 'about-section' },
    { label: 'Collections', id: 'showcase-section' },
    { label: 'Experience', id: 'experience-section' },
  ]

  return (
    <>
      {/* ------------------------------------------------ */}
      {/* MOBILE HEADER → ONLY LOGO                      */}
      {/* ------------------------------------------------ */}
      <div
        className={`md:hidden fixed top-0 w-full z-50 flex items-center justify-center h-16 transition-all duration-500 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-lg'
            : 'bg-gradient-to-b from-white/20 to-transparent'
        }`}
      >
        <a
          href="#"
          className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
                      bg-clip-text text-transparent transition-transform duration-300"
        >
          Zudio
        </a>
      </div>

      {/* ------------------------------------------------ */}
      {/* DESKTOP NAVBAR                                  */}
      {/* ------------------------------------------------ */}
      <nav
        className={`hidden md:block fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-lg'
            : 'bg-gradient-to-b from-white/20 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <a
              href="#"
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
                          bg-clip-text text-transparent hover:scale-110 transition-transform duration-300"
            >
              Zudio
            </a>

            {/* Desktop Menu */}
            <div className="flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-700 hover:text-transparent hover:bg-gradient-to-r 
                              hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 
                              hover:bg-clip-text transition-all duration-300 font-medium relative group"
                >
                  {item.label}
                  <span
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-pink-600 
                                group-hover:w-full transition-all duration-300"
                  />
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-pink-500 text-white rounded-full 
                                font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
              Shop Now
            </button>
          </div>
        </div>
      </nav>

      {/* ------------------------------------------------ */}
      {/* MOBILE BACK-TO-TOP ARROW (only visible on mobile) */}
      {/* ------------------------------------------------ */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="md:hidden fixed bottom-6 right-6 z-[9999] bg-gradient-to-r from-blue-600 to-pink-600 
                    text-white p-3 rounded-full shadow-xl hover:scale-110 active:scale-95 
                    transition-all duration-300"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </>
  )
}
