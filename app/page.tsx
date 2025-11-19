'use client'

import Hero from '@/components/hero'
import Carousel from '@/components/carousel'
import About from '@/components/about'
import ProductShowcase from '@/components/product-showcase'
import SpraySection from '@/components/spray-section'
import Experience from '@/components/experience'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <>
      <Hero />
      <Carousel />
      <About />
      <ProductShowcase />
      <SpraySection />
      <Experience />
      <Footer />
    </>
  )
}
