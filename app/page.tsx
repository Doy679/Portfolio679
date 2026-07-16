'use client';

import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ContactMarquee from './components/ContactMarquee';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import SocialShareMenu from './components/SocialShareMenu';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    } as any); // using 'any' to bypass strict TS checking for Lenis options

    // Stop scrolling immediately during the loading screen animation
    if (typeof window !== 'undefined' && !(window as any).introLoaderDone) {
      lenis.stop();
    }

    const handleIntroFinish = () => {
      lenis.start();
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('introLoaderFinished', handleIntroFinish);
    }

    // Synchronize Lenis scrolling with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      if (typeof window !== 'undefined') {
        window.removeEventListener('introLoaderFinished', handleIntroFinish);
      }
    };
  }, []);

  return (
    <>
      <Navbar />
      <SocialShareMenu />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <ContactMarquee />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
