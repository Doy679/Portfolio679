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

        const mm = gsap.matchMedia();
        const projectItems = gsap.utils.toArray('.project-animate-item') as HTMLElement[];
        const totalProjects = projectItems.length;

        mm.add("(min-width: 1024px)", () => {
            // Desktop logic: Stacking and Pinning
            gsap.set(projectItems, { 
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0, 
                visibility: 'hidden',
                pointerEvents: 'none',
                scale: 0.9, 
                y: 50,
                zIndex: 10
            });
            
            gsap.set(projectItems[0], { opacity: 1, visibility: 'visible', pointerEvents: 'auto', scale: 1, y: 0, zIndex: 50 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: () => `+=${totalProjects * 150}%`,
                    pin: true,
                    scrub: 0.5,
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

                if (i === 0) {
                    gsap.set([content, image, number].filter(Boolean), { opacity: 1, y: 0, scale: 1 });
                }

                if (i < totalProjects - 1) {
                    const nextItem = projectItems[i + 1];
                    const nextContent = nextItem.querySelector('.project-content-block');
                    const nextImage = nextItem.querySelector('.project-image-block');
                    const nextNumber = nextItem.querySelector('.project-number-block');

                    tl.to(content, { opacity: 0, y: -30, duration: 0.6 }, i)
                      .to(image, { opacity: 0, scale: 1.1, duration: 0.8 }, i + 0.1)
                      .to(number, { opacity: 0, scale: 0.8, duration: 0.8 }, i + 0.1)
                      .set(item, { pointerEvents: 'none', zIndex: 10 }, i + 0.8)
                      .to(item, { visibility: 'hidden', duration: 0 }, i + 0.8)
                      .set(nextItem, { zIndex: 50, pointerEvents: 'auto' }, i + 0.2)
                      .to(nextItem, { visibility: 'visible', opacity: 1, scale: 1, y: 0, duration: 1 }, i + 0.2)
                      .fromTo(nextNumber, { opacity: 0, scale: 1.2 }, { opacity: 1, scale: 1, duration: 1 }, i + 0.3)
                      .fromTo(nextImage, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1 }, i + 0.4)
                      .fromTo(nextContent, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8 }, i + 0.6);
                } else {
                    tl.to(content, { opacity: 0, y: -30, duration: 0.6 }, i)
                      .to(image, { opacity: 0, scale: 1.1, duration: 0.8 }, i + 0.1)
                      .to(number, { opacity: 0, scale: 0.8, duration: 0.8 }, i + 0.1)
                      .set(item, { pointerEvents: 'none' }, i + 0.8);
                }
            });
        });

        mm.add("(max-width: 1023px)", () => {
            // Mobile logic: premium vertical showcase with one-shot reveals
            gsap.set(projectItems, { 
                position: 'relative', 
                opacity: 1, 
                visibility: 'visible', 
                scale: 1, 
                y: 0,
                height: 'auto',
                pointerEvents: 'auto'
            });

            projectItems.forEach((item) => {
                const content = item.querySelector('.project-content-block');
                const image = item.querySelector('.project-image-block');
                const number = item.querySelector('.project-number-block');
                const meta = item.querySelectorAll('.project-mobile-reveal');
                const badges = item.querySelectorAll('.project-badge');
                const imageElement = item.querySelector('.project-image');

                gsap.set(item, { autoAlpha: 0, y: 36, scale: 0.985 });
                gsap.set([image, content].filter(Boolean), { autoAlpha: 0, y: 22 });
                gsap.set(number, { autoAlpha: 0, x: 24, scale: 0.9 });
                gsap.set(meta, { autoAlpha: 0, y: 14 });
                gsap.set(badges, { autoAlpha: 0, y: 8 });
                gsap.set(imageElement, { scale: 1.04 });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: "top 78%",
                        toggleActions: "play none none none",
                        once: true
                    }
                });

                tl.to(item, {
                    autoAlpha: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.75,
                    ease: "expo.out",
                    clearProps: "transform"
                })
                .to(number, {
                    autoAlpha: 1,
                    x: 0,
                    scale: 1,
                    duration: 0.9,
                    ease: "expo.out"
                }, "<")
                .to(image, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.75,
                    ease: "power3.out",
                    clearProps: "transform"
                }, "<0.12")
                .to(imageElement, {
                    scale: 1,
                    duration: 1.2,
                    ease: "expo.out",
                    clearProps: "transform"
                }, "<")
                .to(content, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.75,
                    ease: "power3.out",
                    clearProps: "transform"
                }, "<0.08")
                .to(meta, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.55,
                    stagger: 0.06,
                    ease: "power2.out",
                    clearProps: "transform"
                }, "<0.06")
                .to(badges, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.45,
                    stagger: 0.045,
                    ease: "power2.out",
                    clearProps: "transform"
                }, "<0.08");
            });
        });

        return () => mm.revert();
    }, { scope: sectionRef });

    return (
        <section id="projects" className="mobile-works-section bg-base-200 w-full relative z-20" ref={sectionRef}>
            <div ref={containerRef} className="lg:h-screen w-full lg:overflow-hidden flex flex-col relative bg-base-200">
                {/* Unified Section Header */}
                <div className="container mx-auto px-6 lg:px-12 pt-20 lg:pt-20 pb-8 lg:pb-4 text-left shrink-0 z-[60]">
                    <div className="lg:hidden mb-5 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.35em] text-primary/70">
                        <span>Case Studies</span>
                        <span>{String(projects.length).padStart(2, '0')}</span>
                    </div>
                    <h2 className="text-3xl lg:text-3xl font-black font-montserrat tracking-[0.14em] lg:tracking-[0.1em] uppercase text-base-content/20">
                        <GradientTitle text="Selected Works" />
                    </h2>
                    <div className="w-full lg:w-24 h-px lg:h-1 bg-white/10 lg:bg-primary mt-5 lg:mt-2 overflow-hidden shadow-[0_0_15px_rgba(var(--p),0.5)]">
                        <div className="lg:hidden h-full w-2/3 bg-gradient-to-r from-primary via-secondary to-transparent"></div>
                    </div>
                </div>

                {/* Stacking Content Area */}
                <div className="flex-grow relative w-full h-full lg:mt-0 mt-4">
                    <div className="container mx-auto px-5 lg:px-12 h-full flex flex-col relative perspective-[2000px] gap-8 lg:gap-0">
                        {projects.map((project, i) => (
                            <div key={i} className="project-animate-item mobile-project-shell w-full h-full flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12 p-4 sm:p-5 lg:p-0 py-6 lg:py-0">
                                {/* Background Number */}
                                <div className="project-number-block bg-number absolute right-3 top-5 lg:right-auto lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 font-black text-[6.5rem] lg:text-[25rem] text-primary/[0.11] lg:text-primary/[0.15] font-montserrat tracking-tighter leading-none select-none pointer-events-none z-0">
                                    0{i + 1}
                                </div>
                                
                                {/* Image Container */}
                                <div className="project-image-block image-container w-full lg:w-[45%] group relative z-10 perspective-[1000px]">
                                    <a 
                                        href={project.link && project.link !== "#" ? project.link : undefined}
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className={`block relative w-full aspect-video rounded-[1.35rem] lg:rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-base-300/80 transition-all duration-700 pointer-events-auto ${project.link && project.link !== "#" ? "project-image-link cursor-pointer hover:scale-[1.02] hover:shadow-primary/20" : "cursor-default"}`}
                                    >
                                        <Image src={project.image} alt={project.title} fill className="project-image object-contain object-center p-3 lg:p-8 transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 1024px) 90vw, 45vw" priority={i === 0} />
                                        
                                        {project.link && project.link !== "#" && (
                                            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500 flex items-center justify-center">
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-base-100/80 backdrop-blur-sm p-4 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0">
                                                    <i className="fas fa-external-link-alt text-primary"></i>
                                                </div>
                                            </div>
                                        )}
                                    </a>
                                </div>

                                {/* Content Card */}
                                <div className="project-content-block content-card w-full lg:w-[45%] z-20">
                                    <div className="project-detail-panel lg:bg-base-100 p-3 sm:p-4 lg:p-10 rounded-[2rem] lg:rounded-[2.5rem] lg:border lg:border-white/10 lg:shadow-2xl space-y-4 lg:space-y-8 relative overflow-hidden lg:backdrop-blur-2xl">
                                        <div className="space-y-2">
                                            <div className="project-mobile-reveal flex items-center gap-4 text-primary font-mono text-[11px] lg:text-sm font-black uppercase tracking-[0.24em] lg:tracking-widest">
                                                <span>{project.role}</span>
                                                <div className="h-[2px] w-12 bg-primary/30"></div>
                                            </div>
                                            <h3 className="project-mobile-reveal text-[2.25rem] lg:text-5xl font-black font-montserrat tracking-tight lg:tracking-tighter leading-[0.95] uppercase text-base-content">
                                                {project.title}
                                            </h3>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {project.badges.map((badge, j) => (
                                                <span key={j} className="project-badge text-[10px] uppercase font-bold tracking-[0.14em] lg:tracking-[0.1em] text-white/70 bg-white/5 px-3 py-2 lg:py-1.5 rounded-xl lg:rounded-lg border border-white/10 backdrop-blur-md">
                                                    {badge}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="space-y-4">
                                            <p className="project-mobile-reveal text-base-content/70 text-[15px] lg:text-base leading-relaxed font-medium">
                                                {project.description}
                                            </p>
                                            <p className="project-mobile-reveal text-primary/90 text-sm lg:text-sm italic font-semibold border-l-2 border-primary/40 pl-4 pr-20 sm:pr-0">
                                                <span className="uppercase text-[10px] tracking-widest block mb-1 opacity-50">Impact:</span>
                                                {project.impact}
                                            </p>
                                        </div>

                                        {project.link && project.link !== "#" ? (
                                            <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`Explore ${project.title} website`} className="project-mobile-reveal flex items-center justify-between gap-4 w-full lg:w-fit py-4 lg:py-3 px-5 lg:px-6 rounded-2xl lg:rounded-xl bg-primary/10 border border-primary/20 text-primary font-black uppercase tracking-[0.22em] lg:tracking-[0.2em] text-[10px] shadow-lg shadow-primary/10 transition-all duration-500 hover:scale-105 active:scale-95">
                                                Explore Site
                                                <div className="h-[1px] w-6 bg-primary/40"></div>
                                                <i className="fas fa-arrow-up-right-from-square text-[10px]"></i>
                                            </a>
                                        ) : (
                                            <div className="project-mobile-reveal pt-4 flex items-center gap-3 text-base-content/30 font-mono text-[10px] tracking-[0.3em] uppercase py-3 px-6 border border-white/5 rounded-xl bg-white/5 w-fit">
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

                {/* Unified Pagination Indicator - Hidden on Mobile */}
                <div className="hidden lg:flex absolute right-6 lg:left-12 top-1/2 -translate-y-1/2 flex flex-col gap-4 lg:gap-8 z-50">
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
