'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2, // Tweak this for faster/slower scrolling
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Default smooth easing
      // smoothWheel: true, (deprecated in newer Lenis versions, it is smooth by default)
    })

    // Keep GSAP animations working as they are
    lenis.on('scroll', ScrollTrigger.update)

    // Connect it to the browser's animation frame
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Cleanup on unmount
    return () => {
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
