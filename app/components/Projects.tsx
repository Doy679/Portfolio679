'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import HackerText from './HackerText';
import { projects } from '../data/projects';
import { Icon } from '../lib/icons';
import { TiltCard } from './TiltCard';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    // Reveal each card as it scrolls into view (normal vertical scroll, no pin).
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      cards.forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 64,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });
    });
    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative bg-base-200 overflow-hidden py-24 lg:py-32"
    >
      <div className="container mx-auto px-6 md:px-10 lg:px-20">
        <div className="mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-black font-montserrat uppercase tracking-tight text-base-content">
            <HackerText text="Selected Works" />
          </h2>
          <div className="w-12 h-1 bg-primary mt-2"></div>
        </div>

        <div className="grid gap-12 lg:gap-20 max-w-4xl mx-auto">
          {projects.map((project, index) => (
            <div key={project.title} ref={(el) => { cardsRef.current[index] = el; }}>
              <TiltCard
                max={5}
                className="group flex flex-col bg-base-100/50 backdrop-blur-md rounded-3xl border border-base-content/10 shadow-2xl overflow-hidden transition-colors duration-300 hover:border-primary/30"
              >
                {/* Full screenshot (no crop) */}
                <div className="relative w-full aspect-[21/9] bg-base-300 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 768px"
                    priority={index < 2}
                  />
                </div>

                <div className="p-6 lg:p-8 flex flex-col flex-grow">
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

                  <div className="flex flex-wrap items-center justify-between gap-4 mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {project.badges.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider bg-base-content/5 border border-base-content/10 rounded-lg text-base-content/70 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/10 hover:border-primary/30 hover:text-primary cursor-default"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {project.link && project.link !== '#' && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-between gap-3 py-2 px-4 rounded-xl bg-primary/10 border border-primary/20 text-primary font-black uppercase tracking-wider text-[10px] shadow-lg shadow-primary/10 transition-all duration-300 hover:bg-primary/20 hover:scale-105"
                      >
                        Explore <Icon name="fa-arrow-up-right-from-square" className="text-[10px]" />
                      </a>
                    )}
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
