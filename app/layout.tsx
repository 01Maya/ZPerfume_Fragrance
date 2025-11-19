import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import GlobalParticles from '@/components/GlobalParticles'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Zudio Perf - Luxury Fragrances',
  description: 'Experience luxury fragrances inspired by iconic world cities',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalParticles>
          {children}
        </GlobalParticles>
      </body>
    </html>
  )
}
