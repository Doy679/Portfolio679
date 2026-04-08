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
    const desktopContainerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useGSAP(() => {
        const mm = gsap.matchMedia();
        const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

        mm.add("(min-width: 1024px)", () => {
            if (!desktopContainerRef.current || !sectionRef.current) return;

            if (prefersReducedMotion) {
                gsap.set('.project-wrapper', { opacity: 1, visibility: 'visible', y: 0, position: 'relative' });
                return;
            }

            const projectWrappers = gsap.utils.toArray('.project-wrapper') as HTMLElement[];
            const totalProjects = projects.length;

            // Initial State setup - Clean and Ready
            projectWrappers.forEach((wrapper, i) => {
                const content = wrapper.querySelector('.content-card');
                const image = wrapper.querySelector('.image-container');
                const number = wrapper.querySelector('.bg-number');

                if (i === 0) {
                    gsap.set(wrapper, { opacity: 1, visibility: 'visible' });
                    gsap.set(content, { y: 0, opacity: 1 });
                    gsap.set(image, { scale: 1, opacity: 1, rotationY: 0, rotationX: 0 });
                    gsap.set(number, { opacity: 1, y: 0 });
                } else {
                    gsap.set(wrapper, { opacity: 0, visibility: 'hidden' });
                    gsap.set(content, { y: 40, opacity: 0 });
                    gsap.set(image, { scale: 0.8, opacity: 0, rotationY: -5, rotationX: 5 });
                    gsap.set(number, { opacity: 0, y: 100 });
                }
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: desktopContainerRef.current,
                    start: "top top",
                    end: `+=${totalProjects * 120}%`, // Added a bit more scroll distance for "breathability"
                    pin: true,
                    scrub: 1.2, // Smoother follow-through
                    onUpdate: (self) => {
                        const newIndex = Math.min(
                            Math.floor(self.progress * (totalProjects + 0.05)),
                            totalProjects - 1
                        );
                        if (newIndex !== activeIndex) {
                            setActiveIndex(newIndex);
                        }
                    }
                }
            });

            projectWrappers.forEach((wrapper, i) => {
                const content = wrapper.querySelector('.content-card');
                const image = wrapper.querySelector('.image-container');
                const number = wrapper.querySelector('.bg-number');

                if (i < totalProjects - 1) {
                    const nextWrapper = projectWrappers[i + 1];
                    const nextContent = nextWrapper.querySelector('.content-card');
                    const nextImage = nextWrapper.querySelector('.image-container');
                    const nextNumber = nextWrapper.querySelector('.bg-number');

                    // Exit current - Staggered Dissolve
                    tl.to(content, { y: -40, opacity: 0, duration: 0.6, ease: "expo.inOut" }, i);
                    tl.to(image, { scale: 1.1, opacity: 0, rotationY: 5, duration: 0.7, ease: "expo.inOut" }, i + 0.1);
                    tl.to(number, { opacity: 0, y: -100, duration: 0.5, ease: "expo.inOut" }, i);
                    tl.to(wrapper, { visibility: 'hidden', duration: 0 }, i + 0.7);

                    // Enter next - Staggered Float In
                    tl.to(nextWrapper, { visibility: 'visible', opacity: 1, duration: 0 }, i + 0.3);
                    tl.fromTo(nextContent, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "expo.out" }, i + 0.5);
                    tl.fromTo(nextImage, { scale: 0.8, opacity: 0, rotationY: -5 }, { scale: 1, opacity: 1, rotationY: 0, duration: 1, ease: "expo.out" }, i + 0.4);
                    tl.fromTo(nextNumber, { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 0.8, ease: "expo.out" }, i + 0.5);
                }
            });
        });

        mm.add("(max-width: 1023px)", () => {
            if (prefersReducedMotion) {
                gsap.set('.project-item-mobile', { opacity: 1, y: 0 });
                return;
            }

            ScrollTrigger.batch('.project-item-mobile', {
                onEnter: (elements) => {
                    gsap.to(elements, {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        stagger: 0.15,
                        ease: "power3.out"
                    });
                },
                start: "top 85%",
                once: true
            });

            // Subtle Parallax Logic
            const items = gsap.utils.toArray('.project-item-mobile');
            items.forEach((item: any) => {
                const image = item.querySelector('.mobile-parallax-image');
                if (image) {
                    gsap.to(image, {
                        yPercent: 10,
                        ease: "none",
                        scrollTrigger: {
                            trigger: item,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 0.5
                        }
                    });
                }
            });
        });

        return () => mm.revert();
    }, []);

    const ProjectItemMobile = ({ project, index }: { project: (typeof projects)[0], index: number }) => {
        return (
            <div className="project-item-mobile w-full flex flex-col gap-5 py-10 border-b border-primary/10 last:border-0 relative opacity-60 scale-[0.95]">
                {/* Background Glow Container - only visible when active */}
                <div className="active-glow absolute inset-0 bg-primary/10 blur-[60px] rounded-full opacity-0 pointer-events-none transition-opacity duration-500"></div>
                
                <div className="w-full flex flex-col gap-3 relative z-10">
                    {/* Mobile Header with Explore Hint */}
                    <div className="flex items-center justify-between px-1 mb-1">
                        <div className="text-primary font-mono text-xs font-bold bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                            0{index + 1}
                        </div>
                        {project.link && project.link !== "#" && (
                            <div className="flex items-center gap-3">
                                <span className="text-primary/60 font-mono text-[10px] tracking-[0.2em] uppercase font-black">
                                    Click to explore
                                </span>
                                <div className="h-[1px] w-6 bg-primary/40"></div>
                            </div>
                        )}
                    </div>
                    
                    <div className="relative w-full aspect-[4/3] sm:aspect-video rounded-xl overflow-hidden shadow-xl border border-primary/10 bg-base-300">
                        <div className="h-6 bg-base-300/90 border-b border-white/5 flex items-center px-3 gap-1.5 shrink-0 z-20 relative">
                            <div className="w-2 h-2 rounded-full bg-error/50"></div>
                            <div className="w-2 h-2 rounded-full bg-warning/50"></div>
                            <div className="w-2 h-2 rounded-full bg-success/50"></div>
                        </div>
                        {/* Parallax Wrapper Starts Here - Subtle 10% Shift */}
                        <div className="mobile-parallax-container w-full h-[calc(100%-1.5rem)] relative overflow-hidden bg-base-100">
                            <div className="mobile-parallax-image w-full h-[110%] relative -top-[5%]">
                                {project.link && project.link !== "#" ? (
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative">
                                        <Image src={project.image} alt={project.title} fill className="object-contain object-center p-2" sizes="100vw" />
                                        <div className="absolute inset-0 bg-primary/10 opacity-0 active:opacity-100 transition-opacity"></div>
                                    </a>
                                ) : (
                                    <div className="w-full h-full relative">
                                        <Image src={project.image} alt={project.title} fill className="object-contain object-center p-2" sizes="100vw" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 px-1 mt-2 relative z-10">
                    <h3 className="text-2xl sm:text-3xl font-black font-montserrat tracking-tighter uppercase text-base-content leading-tight">
                        {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {project.badges.map((badge: string, i: number) => (
                            <span key={i} className="text-[9px] uppercase font-bold tracking-[0.1em] text-primary/80 bg-primary/10 px-2.5 py-1 rounded-md border border-primary/20">
                                {badge}
                            </span>
                        ))}
                    </div>
                    <p className="text-base-content/80 text-sm sm:text-base leading-relaxed">
                        {project.description}
                    </p>
                </div>
            </div>
        );
    };

    return (
        <section id="projects" className="bg-base-200" ref={sectionRef}>
            {/* Mobile View */}
            <div className="lg:hidden px-4 sm:px-6 py-16">
                <div className="container mx-auto">
                    <div className="sticky top-16 z-30 mb-8 bg-base-200/90 backdrop-blur-lg py-4 border-b border-primary/10 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)] -mx-4 px-4 sm:-mx-6 sm:px-6">
                        <h2 className="text-2xl font-bold font-montserrat tracking-[0.2em] uppercase text-base-content text-center">
                            Featured Projects
                        </h2>
                        <div className="w-12 h-0.5 bg-primary/60 mx-auto mt-2 shadow-[0_0_10px_rgba(var(--p),0.5)]"></div>
                    </div>
                    
                    <div className="flex flex-col gap-4">
                        {projects.map((project, i) => (
                            <ProjectItemMobile key={i} project={project} index={i} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Desktop View: Cinematic Glass Redesign */}
            <div className="hidden lg:block relative bg-base-200">
                <div ref={desktopContainerRef} className="h-screen w-full overflow-hidden flex flex-col relative">
                    
                    {/* Perspective Container */}
                    <div className="container mx-auto px-6 lg:px-12 h-full flex flex-col relative perspective-[2000px]">
                        
                        {/* Static Section Header */}
                        <div className="pt-16 pb-4 text-left shrink-0 z-50">
                            <h2 className="text-3xl font-black font-montserrat tracking-[0.1em] uppercase text-base-content/20">
                                <GradientTitle text="Selected Works" />
                            </h2>
                            <div className="w-24 h-1 bg-primary mt-2"></div>
                        </div>

                        {/* Stacking Content Area */}
                        <div className="flex-grow relative w-full h-full mt-4">
                            {projects.map((project, i) => (
                                <div 
                                    key={i} 
                                    className="project-wrapper absolute inset-0 flex items-center justify-between gap-12 invisible opacity-0"
                                >
                                    {/* Oversized Outline Number - Scaled Down */}
                                    <div className="bg-number absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-black text-[18rem] text-primary/[0.03] font-montserrat tracking-tighter leading-none select-none pointer-events-none z-0 border-text">
                                        0{i + 1}
                                    </div>

                                    {/* Left Side: Refined Floating Image (Smaller Scale) */}
                                    <div className="image-container w-[45%] group relative z-10 perspective-[1000px]">
                                        {/* Hint above image */}
                                        <div className="absolute -top-10 left-0 w-full flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                                            <div className="h-[1px] w-8 bg-primary/40"></div>
                                            <span className="text-primary/60 font-mono text-[10px] tracking-[0.2em] uppercase font-black">
                                                Click image to explore
                                            </span>
                                        </div>

                                        {/* Dynamic Ambient Glow (Subtler) */}
                                        <div className="absolute inset-0 bg-primary/10 blur-[80px] rounded-full scale-75 group-hover:scale-100 transition-transform duration-1000 opacity-40"></div>
                                        
                                        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] border border-white/10 bg-base-300 transition-all duration-700 group-hover:shadow-primary/10 group-hover:-translate-y-1">
                                            {project.link && project.link !== "#" ? (
                                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative">
                                                    <Image 
                                                        src={project.image} 
                                                        alt={project.title} 
                                                        fill 
                                                        className="object-cover object-top transition-transform duration-1000 group-hover:scale-105" 
                                                        sizes="45vw"
                                                        priority={i === 0}
                                                    />
                                                    {/* Premium Glass Overlay on Hover */}
                                                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
                                                        <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2 rounded-full font-black tracking-[0.2em] uppercase text-[10px] shadow-2xl">
                                                            View Project
                                                        </div>
                                                    </div>
                                                </a>
                                            ) : (
                                                <Image src={project.image} alt={project.title} fill className="object-cover object-top" sizes="45vw" priority={i === 0} />
                                            )}
                                        </div>

                                        {/* Elegant Floor Reflection (Subtler) */}
                                        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-8 bg-primary/10 blur-[30px] rounded-[100%] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                    </div>

                                    {/* Right Side: Floating Glass Content Card */}
                                    <div className="content-card w-[40%] z-20">
                                        <div className="glass-card p-10 rounded-[2.5rem] border border-white/10 shadow-2xl space-y-8 relative overflow-hidden backdrop-blur-2xl">
                                            {/* Decorative Background Element */}
                                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 blur-[50px] rounded-full"></div>
                                            
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-4 text-primary font-mono text-sm font-black uppercase tracking-widest">
                                                    <span>Project 0{i + 1}</span>
                                                    <div className="h-[2px] w-12 bg-primary/30"></div>
                                                </div>
                                                <h3 className="text-4xl lg:text-5xl font-black font-montserrat tracking-tighter leading-none uppercase text-base-content">
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

                                            <p className="text-base-content/70 text-lg leading-relaxed font-medium">
                                                {project.description}
                                            </p>

                                            {!(project.link && project.link !== "#") && (
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

                    {/* Minimal Pagination Dots */}
                    <div className="absolute left-12 top-1/2 -translate-y-1/2 flex flex-col gap-8 z-50">
                        {projects.map((_, i) => (
                            <div 
                                key={i} 
                                onClick={() => {
                                    const sectionTop = sectionRef.current?.offsetTop || 0;
                                    window.scrollTo({
                                        top: sectionTop + (i * window.innerHeight),
                                        behavior: 'smooth'
                                    });
                                }}
                                className="group cursor-pointer relative"
                            >
                                <div className={`w-1 h-8 rounded-full transition-all duration-500 ${activeIndex === i ? 'bg-primary scale-y-150 shadow-[0_0_15px_rgba(var(--p),0.8)]' : 'bg-white/10 group-hover:bg-white/30'}`} />
                                <span className={`absolute left-6 top-1/2 -translate-y-1/2 font-mono text-[10px] font-black tracking-widest transition-all duration-300 ${activeIndex === i ? 'opacity-100 translate-x-0 text-primary' : 'opacity-0 -translate-x-4'}`}>
                                    0{i+1}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;