'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
    let lenis: Lenis | null = null;
    let rafLoop: (time: number) => void;

    if (isMobile) {
      window.addEventListener('scroll', ScrollTrigger.update);
    } else {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      lenis.on('scroll', ScrollTrigger.update);

      rafLoop = (time: number) => {
        lenis?.raf(time * 1000);
      };
      
      gsap.ticker.add(rafLoop);
      gsap.ticker.lagSmoothing(500, 33); // Adjust for smoother recovery from heavy frames
    }

    // Lock scrolling for the duration of the IntroLoader
    if (lenis) {
      lenis.stop();
      setTimeout(() => {
        lenis?.start();
        ScrollTrigger.refresh();
      }, 3800);
    } else {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        document.body.style.overflow = '';
        ScrollTrigger.refresh();
      }, 3800);
    }

    return () => {
      if (lenis) {
        lenis.destroy();
        gsap.ticker.remove(rafLoop);
      }
      window.removeEventListener('scroll', ScrollTrigger.update);
    };
  }, []);

  return <>{children}</>;
}
