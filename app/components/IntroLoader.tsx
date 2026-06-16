"use client";

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

export default function IntroLoader() {
  const [progress, setProgress] = useState(0);
  const [isUnmounted, setIsUnmounted] = useState(false);
  
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);
  const nameTopRef = useRef<HTMLDivElement>(null);
  const nameBottomRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const triggerExitAnimation = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        setIsUnmounted(true); 
      }
    });

    // 1. Implode the counter
    tl.to(counterRef.current, {
      scale: 0.7,
      opacity: 0,
      duration: 0.5,
      ease: "power4.inOut"
    }, 0)
    
    // 2. Smash the names into the center line
    .to(nameTopRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "expo.out"
    }, 0.2)
    .to(nameBottomRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "expo.out"
    }, 0.2)
    
    // 3. Pause for a split second (hold the tension)
    
    // 4. Rip the screen apart! (Top panel flies up, bottom flies down)
    .to(topPanelRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: "expo.inOut"
    }, "+=0.3")
    .to(bottomPanelRef.current, {
      yPercent: 100,
      duration: 1.2,
      ease: "expo.inOut"
    }, "<"); // The "<" symbol means it happens at the EXACT same time as the top panel
  };

  useGSAP(() => {
    document.body.style.overflow = 'hidden';
    
    let currentProgress = 0;
    
    intervalRef.current = setInterval(() => {
      // Rapid progress increment
      currentProgress += Math.floor(Math.random() * 15) + 3;
      
      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(currentProgress);
        if (intervalRef.current) clearInterval(intervalRef.current);
        
        // Slight delay for dramatic effect before the explosion
        setTimeout(triggerExitAnimation, 300);
      } else {
        setProgress(currentProgress);
      }
    }, 100);

    return () => {
      document.body.style.overflow = '';
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  if (isUnmounted) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none flex flex-col font-montserrat">
      
      {/* --- TOP SHUTTER PANEL --- */}
      <div 
        ref={topPanelRef} 
        className="absolute top-0 left-0 w-full h-1/2 bg-[#0b0d14] flex items-end justify-center overflow-hidden border-b border-indigo-900/20"
      >
        {/* Top Name (Hidden initially, slides down to the edge) */}
        <div 
          ref={nameTopRef} 
          className="translate-y-[100%] opacity-0 text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter text-white pb-1 md:pb-3"
        >
          RONDETHER
        </div>
      </div>

      {/* --- BOTTOM SHUTTER PANEL --- */}
      <div 
        ref={bottomPanelRef} 
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#0b0d14] flex items-start justify-center overflow-hidden border-t border-indigo-900/20"
      >
        {/* Bottom Name (Hidden initially, slides up to the edge) */}
        <div 
          ref={nameBottomRef} 
          className="translate-y-[-100%] opacity-0 text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter text-[#6366f1] pt-1 md:pt-3"
        >
          GONZALES
        </div>
      </div>

      {/* --- CENTER LOADER (The Holographic Number) --- */}
      <div 
        ref={counterRef} 
        className="absolute inset-0 flex items-center justify-center z-10"
      >
        <h1 
          className="text-[10rem] md:text-[20rem] font-black tracking-tighter text-transparent select-none" 
          style={{ WebkitTextStroke: "2px rgba(99,102,241,0.4)" }}
        >
          {progress}
        </h1>
      </div>

    </div>
  );
}