'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      lerp: 0.07, // Smoothness intensity (lower is smoother)
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      infinite: false,
    })

    // Tick GSAP to match Lenis
    function update(time: number) {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    // Keep GSAP animations working as they are
    lenis.on('scroll', ScrollTrigger.update)

    // Cleanup on unmount
    return () => {
      gsap.ticker.remove(update)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
