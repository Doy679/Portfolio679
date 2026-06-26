'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import HackerText from './HackerText';
import { projects } from '../data/projects';

// Register ScrollTrigger globally
gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const scrollContainer = scrollContainerRef.current;

    if (!section || !scrollContainer) return;

    // Use MatchMedia to handle responsive and accessibility conditions
    const mm = gsap.matchMedia();

    mm.add(
      {
        // Desktop AND no reduced motion preference
        isDesktop: '(min-width: 1024px)',
        allowMotion: '(prefers-reduced-motion: no-preference)',
      },
      (context) => {
        const { isDesktop, allowMotion } = context.conditions as { isDesktop: boolean, allowMotion: boolean };

        // Only apply horizontal scroll if both conditions are met
        if (isDesktop && allowMotion) {
          // Calculate how far we need to translate horizontally
          // We get the total width of the content and subtract the viewport width
          const getScrollAmount = () => -(scrollContainer.scrollWidth - window.innerWidth);

          const tween = gsap.to(scrollContainer, {
            x: getScrollAmount,
            ease: 'none',
          });

          ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            // End dictates how long the user has to scroll vertically to complete the horizontal move.
            // A 1:1 ratio (scrollWidth) feels natural.
            end: () => `+=${scrollContainer.scrollWidth - window.innerWidth}`,
            pin: true,
            animation: tween,
            scrub: 1, // Smooth scrubbing
            invalidateOnRefresh: true, // Recalculate on resize
          });
        }
        
        return () => {
          // Cleanup logic runs automatically when conditions stop matching
          // GSAP handles killing the scrollTrigger and tween created within this function
        };
      }
    );

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section 
      id="projects"
      ref={sectionRef} 
      className="relative bg-base-200 overflow-hidden lg:h-screen flex flex-col pt-24 lg:pt-0"
    >
      <div className="lg:absolute top-8 left-6 lg:top-12 lg:left-12 z-10 px-6 lg:px-0 mb-8 lg:mb-0">
        <h2 className="text-3xl lg:text-5xl font-black font-montserrat uppercase tracking-tight text-base-content">
          <HackerText text="Selected Works" />
        </h2>
        <div className="w-12 h-1 bg-primary mt-2"></div>
      </div>

      {/* The scrolling container. 
          On mobile: standard flex-col with normal padding.
          On desktop: absolute positioning (via GSAP pin), w-max flex-row to hold all cards horizontally.
      */}
      <div 
        ref={scrollContainerRef}
        className="flex flex-col lg:flex-row gap-8 lg:gap-16 px-6 lg:px-12 lg:w-max lg:flex-nowrap lg:h-[75vh] pb-12 lg:pb-0 w-full lg:mt-auto lg:mb-12"
      >
        {projects.map((project, index) => (
          <div 
            key={project.title} 
            className="group w-full lg:w-[700px] flex-shrink-0 flex flex-col h-full bg-base-100/50 backdrop-blur-md rounded-3xl border border-base-content/10 shadow-2xl overflow-hidden transition-all duration-300 hover:border-primary/30"
          >
            {/* Image Wrapper */}
            <div className="relative w-full h-[250px] lg:h-[55%] overflow-hidden bg-base-300">
              <Image 
                src={project.image} 
                alt={project.title} 
                fill 
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 700px"
                priority={index < 2}
              />
              {/* Optional overlay gradient for styling */}
              <div className="absolute inset-0 bg-gradient-to-t from-base-100 to-transparent opacity-40 lg:opacity-20 dark:opacity-80 dark:lg:opacity-50 transition-opacity duration-300 group-hover:opacity-10" />
            </div>

            {/* Content Wrapper */}
            <div className="p-6 lg:p-8 flex flex-col flex-grow justify-between relative z-10 -mt-6 lg:-mt-10 bg-base-100 lg:bg-transparent rounded-t-3xl lg:rounded-none">
              <div>
                <h3 className="text-2xl lg:text-3xl font-black font-montserrat tracking-tight uppercase text-base-content mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-base-content/70 font-medium leading-relaxed mb-4 text-sm lg:text-base">
                  {project.description}
                </p>
                <p className="text-primary/90 text-xs lg:text-sm italic font-semibold border-l-2 border-primary/40 pl-4 mb-6">
                    <span className="uppercase text-[10px] tracking-widest block mb-1 opacity-50">Impact:</span>
                    {project.impact}
                </p>
              </div>

              {/* Tags & Link */}
              <div className="flex flex-wrap items-center justify-between gap-4 mt-auto">
                <div className="flex flex-wrap gap-2">
                    {project.badges.map((tag) => (
                    <span 
                        key={tag} 
                        className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider bg-base-content/5 border border-base-content/10 rounded-lg text-base-content/70 group-hover:border-primary/30 transition-colors"
                    >
                        {tag}
                    </span>
                    ))}
                </div>
                {project.link && project.link !== "#" && (
                    <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center justify-between gap-3 py-2 px-4 rounded-xl bg-primary/10 border border-primary/20 text-primary font-black uppercase tracking-wider text-[10px] shadow-lg shadow-primary/10 transition-all duration-300 hover:bg-primary/20 hover:scale-105"
                    >
                        Explore <i className="fas fa-arrow-up-right-from-square text-[10px]"></i>
                    </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
