'use client';
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';
import GradientTitle from './GradientTitle';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useGSAP(() => {
        if (!sectionRef.current || !containerRef.current) return;

        const projectItems = gsap.utils.toArray('.project-animate-item') as HTMLElement[];
        const totalProjects = projectItems.length;

        // 1. Initial State: Stack all projects absolutely
        gsap.set(projectItems, { 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0, 
            visibility: 'hidden', 
            scale: 0.9, 
            y: 50,
            zIndex: (i) => 10 + i
        });
        
        // 2. Set first project visible
        gsap.set(projectItems[0], { opacity: 1, visibility: 'visible', scale: 1, y: 0, zIndex: 50 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: () => `+=${totalProjects * 150}%`, // 150vh per project
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                onUpdate: (self) => {
                    const progress = self.progress * totalProjects;
                    const newIndex = Math.min(Math.floor(progress), totalProjects - 1);
                    if (newIndex !== activeIndex) setActiveIndex(newIndex);
                }
            }
        });

        projectItems.forEach((item, i) => {
            const content = item.querySelector('.project-content-block');
            const image = item.querySelector('.project-image-block');
            const number = item.querySelector('.project-number-block');

            // Internal reveals for first project
            if (i === 0) {
                gsap.set([content, image, number].filter(Boolean), { opacity: 1, y: 0, scale: 1 });
            }

            if (i < totalProjects - 1) {
                const nextItem = projectItems[i + 1];
                const nextContent = nextItem.querySelector('.project-content-block');
                const nextImage = nextItem.querySelector('.project-image-block');
                const nextNumber = nextItem.querySelector('.project-number-block');

                // Exit current
                tl.to(content, { opacity: 0, y: -30, duration: 0.6 }, i)
                  .to(image, { opacity: 0, scale: 1.1, duration: 0.8 }, i + 0.1)
                  .to(number, { opacity: 0, scale: 0.8, duration: 0.8 }, i + 0.1)
                  .to(item, { visibility: 'hidden', duration: 0 }, i + 0.8)

                  // Enter next
                  .to(nextItem, { visibility: 'visible', opacity: 1, scale: 1, y: 0, duration: 1 }, i + 0.2)
                  .fromTo(nextNumber, { opacity: 0, scale: 1.2 }, { opacity: 1, scale: 1, duration: 1 }, i + 0.3)
                  .fromTo(nextImage, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1 }, i + 0.4)
                  .fromTo(nextContent, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8 }, i + 0.6);
            } else {
                // Final Exit for last project card
                tl.to(content, { opacity: 0, y: -30, duration: 0.6 }, i)
                  .to(image, { opacity: 0, scale: 1.1, duration: 0.8 }, i + 0.1)
                  .to(number, { opacity: 0, scale: 0.8, duration: 0.8 }, i + 0.1);
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, { scope: sectionRef });

    return (
        <section id="projects" className="bg-base-200 w-full relative z-20" ref={sectionRef}>
            <div ref={containerRef} className="h-screen w-full overflow-hidden flex flex-col relative bg-base-200">
                {/* Unified Section Header */}
                <div className="container mx-auto px-6 lg:px-12 pt-16 lg:pt-20 pb-4 text-left shrink-0 z-50">
                    <h2 className="text-2xl lg:text-3xl font-black font-montserrat tracking-[0.1em] uppercase text-base-content/20">
                        <GradientTitle text="Selected Works" />
                    </h2>
                    <div className="w-16 lg:w-24 h-1 bg-primary mt-2 shadow-[0_0_15px_rgba(var(--p),0.5)]"></div>
                </div>

                {/* Stacking Content Area */}
                <div className="flex-grow relative w-full h-full">
                    <div className="container mx-auto px-6 lg:px-12 h-full flex flex-col relative perspective-[2000px]">
                        {projects.map((project, i) => (
                            <div key={i} className="project-animate-item w-full h-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 py-10 lg:py-0">
                                {/* Background Number */}
                                <div className="project-number-block bg-number absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-black text-[15rem] lg:text-[25rem] text-primary/[0.15] font-montserrat tracking-tighter leading-none select-none pointer-events-none z-0">
                                    0{i + 1}
                                </div>
                                
                                {/* Image Container */}
                                <div className="project-image-block image-container w-full lg:w-[45%] group relative z-10 perspective-[1000px]">
                                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-base-300 transition-all duration-700">
                                        <Image src={project.image} alt={project.title} fill className="object-contain object-center p-4 lg:p-8" sizes="(max-width: 1024px) 90vw, 45vw" priority={i === 0} />
                                    </div>
                                </div>

                                {/* Content Card */}
                                <div className="project-content-block content-card w-full lg:w-[45%] z-20">
                                    <div className="glass-card p-6 lg:p-10 rounded-[2rem] lg:rounded-[2.5rem] border border-white/10 shadow-2xl space-y-4 lg:space-y-8 relative overflow-hidden backdrop-blur-2xl">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-4 text-primary font-mono text-xs lg:text-sm font-black uppercase tracking-widest">
                                                <span>{project.role}</span>
                                                <div className="h-[2px] w-12 bg-primary/30"></div>
                                            </div>
                                            <h3 className="text-3xl lg:text-5xl font-black font-montserrat tracking-tighter leading-none uppercase text-base-content">
                                                {project.title}
                                            </h3>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {project.badges.map((badge, j) => (
                                                <span key={j} className="text-[10px] uppercase font-bold tracking-[0.1em] text-white/70 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-md">
                                                    {badge}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="space-y-4">
                                            <p className="text-base-content/70 text-sm lg:text-base leading-relaxed font-medium">
                                                {project.description}
                                            </p>
                                            <p className="text-primary/90 text-xs lg:text-sm italic font-semibold border-l-2 border-primary/40 pl-4">
                                                <span className="uppercase text-[10px] tracking-widest block mb-1 opacity-50">Impact:</span>
                                                {project.impact}
                                            </p>
                                        </div>

                                        {project.link && project.link !== "#" ? (
                                            <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`Explore ${project.title} website`} className="flex items-center gap-4 w-fit py-3 px-6 rounded-xl bg-primary/10 border border-primary/20 text-primary font-black uppercase tracking-[0.2em] text-[10px] shadow-lg shadow-primary/10 transition-all duration-500 hover:scale-105 active:scale-95">
                                                Explore Site
                                                <div className="h-[1px] w-6 bg-primary/40"></div>
                                                <i className="fas fa-arrow-right text-[8px]"></i>
                                            </a>
                                        ) : (
                                            <div className="pt-4 flex items-center gap-3 text-base-content/30 font-mono text-[10px] tracking-[0.3em] uppercase py-3 px-6 border border-white/5 rounded-xl bg-white/5 w-fit">
                                                <span className="w-2 h-2 rounded-full bg-primary/40 animate-pulse"></span>
                                                Active Build
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Unified Pagination Indicator */}
                <div className="absolute right-6 lg:left-12 top-1/2 -translate-y-1/2 flex flex-col gap-4 lg:gap-8 z-50">
                    {projects.map((_, i) => (
                        <div key={i} className="group cursor-pointer relative">
                            <div className={`w-1 h-6 lg:h-8 rounded-full transition-all duration-500 ${activeIndex === i ? 'bg-primary scale-y-125 lg:scale-y-150 shadow-[0_0_15px_rgba(var(--p),0.8)]' : 'bg-white/10 group-hover:bg-white/30'}`} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;