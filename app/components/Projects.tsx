'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';
import HackerText from './HackerText';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const numberRef = useRef<HTMLDivElement>(null);
    const activeNumberRef = useRef<HTMLSpanElement>(null);
    
    const indexRef = useRef(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const [startScramble, setStartScramble] = useState(false);
    const isAnimatingRef = useRef(false);
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile for layout switching
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useGSAP(() => {
        if (!sectionRef.current || !scrollAreaRef.current || isMobile) return;

        // Header Scramble Trigger
        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top 70%',
            onEnter: () => setStartScramble(true),
            onLeaveBack: () => setStartScramble(false),
            onEnterBack: () => setStartScramble(true)
        });

        // Sticky Scroll Logic (Desktop Only)
        const totalProjects = projects.length;
        
        ScrollTrigger.create({
            trigger: scrollAreaRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onUpdate: (self) => {
                const progress = self.progress;
                const newIndex = Math.min(
                    Math.floor(progress * totalProjects),
                    totalProjects - 1
                );
                
                if (newIndex !== indexRef.current && !isAnimatingRef.current) {
                    isAnimatingRef.current = true;
                    indexRef.current = newIndex;

                    const tl = gsap.timeline({
                        onComplete: () => {
                            isAnimatingRef.current = false;
                        }
                    });
                    
                    tl.to([contentRef.current, numberRef.current, activeNumberRef.current], {
                        opacity: 0,
                        y: -20,
                        duration: 0.3,
                        ease: "expo.in"
                    }, 0);

                    tl.to(imageRef.current, {
                        opacity: 0,
                        scale: 0.98,
                        filter: "blur(10px)",
                        duration: 0.4,
                        ease: "expo.in",
                        onComplete: () => {
                            setActiveIndex(newIndex);
                            gsap.set([contentRef.current, numberRef.current, activeNumberRef.current], {
                                y: 20,
                                opacity: 0
                            });
                            gsap.set(imageRef.current, {
                                scale: 1.02,
                                filter: "blur(20px)",
                                opacity: 0
                            });
                        }
                    }, 0);

                    tl.to([contentRef.current, numberRef.current, activeNumberRef.current], {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: "expo.out",
                        stagger: 0.05
                    }, 0.4);

                    tl.to(imageRef.current, {
                        opacity: 1,
                        scale: 1,
                        filter: "blur(0px)",
                        duration: 0.8,
                        ease: "expo.out"
                    }, 0.4);
                }
            }
        });

    }, [isMobile]);

    // Project Item Component for Mobile (Vertical List)
    const ProjectItemMobile = ({ project, index }: { project: any, index: number }) => (
        <div className="w-full flex flex-col gap-6 py-12 border-b border-primary/10 last:border-0">
            {/* Project Image */}
            <div className="w-full flex flex-col gap-3">
                <div className="flex items-center justify-between px-1">
                    <div className="text-primary font-mono text-xs font-bold">
                        0{index + 1} <span className="text-primary/30 mx-2">/</span> 0{projects.length}
                    </div>
                    {project.link && project.link !== "#" && (
                        <div className="text-primary/60 font-mono text-[9px] tracking-[0.1em] uppercase">
                            Click to explore <i className="fas fa-external-link-alt ml-1"></i>
                        </div>
                    )}
                </div>
                
                <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xl border border-primary/10 bg-base-300">
                    <div className="h-6 bg-base-300/90 border-b border-white/5 flex items-center px-2 gap-1 shrink-0 relative z-10">
                        <div className="w-1.5 h-1.5 rounded-full bg-error/40"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-warning/40"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-success/40"></div>
                    </div>
                    
                    {project.link && project.link !== "#" ? (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative">
                            <Image src={project.image} alt={project.title} fill className="object-cover object-top p-1" />
                        </a>
                    ) : (
                        <Image src={project.image} alt={project.title} fill className="object-cover object-top p-1" />
                    )}
                </div>
            </div>

            {/* Project Info */}
            <div className="space-y-4 px-1">
                <h3 className="text-2xl font-black font-montserrat tracking-tighter uppercase text-base-content">
                    {project.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                    {project.badges.map((badge: string, i: number) => (
                        <span key={i} className="text-[8px] uppercase font-bold tracking-[0.1em] text-primary/70 bg-primary/5 px-2 py-1 rounded border border-primary/10">
                            {badge}
                        </span>
                    ))}
                </div>
                <p className="text-base-content/70 text-sm leading-relaxed">
                    {project.description}
                </p>
            </div>
        </div>
    );

    if (isMobile) {
        return (
            <section id="projects" className="bg-base-200 px-6 py-20" ref={sectionRef}>
                <div className="container mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl font-bold font-montserrat tracking-[0.2em] uppercase text-base-content">
                            My Featured Projects
                        </h2>
                        <div className="w-12 h-0.5 bg-primary/40 mx-auto mt-4"></div>
                    </div>
                    
                    <div className="flex flex-col">
                        {projects.map((project, i) => (
                            <ProjectItemMobile key={i} project={project} index={i} />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="projects" className="bg-base-200 relative" ref={sectionRef}>
            <div ref={scrollAreaRef} className="relative" style={{ height: `${projects.length * 100}vh` }}>
                
                <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">
                    
                    <div className="container mx-auto px-6 lg:px-20 h-full flex flex-col">
                        
                        {/* Section Header */}
                        <div className="pt-12 lg:pt-16 pb-4 text-center shrink-0">
                            <h2 className="text-2xl md:text-3xl font-bold font-montserrat tracking-[0.2em] uppercase text-base-content">
                                <HackerText text="My Featured Projects" trigger={startScramble} />
                            </h2>
                            <div className="w-12 h-0.5 bg-primary/40 mx-auto mt-4"></div>
                        </div>

                        {/* Main Content Area */}
                        <div className="flex-grow flex flex-col lg:flex-row items-start gap-8 lg:gap-16 pt-4 lg:pt-8 pb-12 overflow-visible relative">
                            
                            {/* Project Number (Background Accent) */}
                            <div 
                                ref={numberRef}
                                className="absolute top-0 right-4 lg:right-10 font-black text-6xl md:text-8xl text-primary/20 font-montserrat tracking-tighter leading-none select-none pointer-events-none z-0"
                            >
                                0{activeIndex + 1}
                            </div>

                            {/* Left Column: Project Info */}
                            <div className="w-full lg:w-[42%] relative flex flex-col order-2 lg:order-1 z-10">
                                <div className="space-y-4 lg:space-y-5">
                                    <div className="flex items-center gap-4 text-primary font-mono text-sm font-bold h-6">
                                        <div className="overflow-hidden h-full relative flex items-center">
                                            <span ref={activeNumberRef} className="block">
                                                0{activeIndex + 1}
                                            </span>
                                        </div>
                                        <div className="text-primary/30 flex items-center gap-4 flex-grow">
                                            <span className="font-light">/</span>
                                            <span>0{projects.length}</span>
                                            <div className="h-[1px] flex-grow bg-primary/10 ml-2"></div>
                                        </div>
                                    </div>
                                    
                                    <div ref={contentRef} className="space-y-4 lg:space-y-5">
                                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-black font-montserrat tracking-tighter leading-tight uppercase text-base-content">
                                            {projects[activeIndex].title}
                                        </h3>

                                        <div className="flex flex-wrap gap-x-2 gap-y-2">
                                            {projects[activeIndex].badges.map((badge, i) => (
                                                <span key={i} className="text-[9px] uppercase font-bold tracking-[0.15em] text-primary/70 bg-primary/5 px-2.5 py-1 rounded-md border border-primary/10">
                                                    {badge}
                                                </span>
                                            ))}
                                        </div>

                                        <p className="text-base-content/70 text-sm md:text-base lg:text-lg leading-relaxed line-clamp-3 md:line-clamp-4 lg:line-clamp-none max-w-xl">
                                            {projects[activeIndex].description}
                                        </p>

                                        <div className="pt-2 lg:pt-6 flex flex-col gap-4">
                                            {!(projects[activeIndex].link && projects[activeIndex].link !== "#") && (
                                                <div className="flex items-center gap-4 text-base-content/20 font-mono text-[10px] tracking-[0.3em] uppercase py-2 px-4 border border-base-content/5 rounded-lg bg-base-300/30 w-fit">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse"></span>
                                                    In Development
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Project Image (Browser Window Style) */}
                            <div className="w-full lg:w-[60%] flex flex-col order-1 lg:order-2 z-10 lg:mt-8">
                                <div className="min-h-[40px] flex items-center">
                                    {projects[activeIndex].link && projects[activeIndex].link !== "#" && (
                                        <div className="flex items-center gap-3 text-primary/60 font-mono text-[9px] tracking-[0.2em] uppercase self-end lg:self-start">
                                            Click image to explore
                                            <span className="w-8 h-[1px] bg-primary/30"></span>
                                        </div>
                                    )}
                                </div>
                                
                                <div 
                                    ref={imageRef}
                                    className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] border border-primary/10 bg-base-300 group transition-all duration-500 hover:shadow-primary/10 max-h-[50vh] lg:max-h-none"
                                >
                                    <div className="h-6 md:h-8 bg-base-300/90 border-b border-white/5 flex items-center px-3 gap-1.5 shrink-0 z-20 relative">
                                        <div className="w-2 h-2 rounded-full bg-error/40"></div>
                                        <div className="w-2 h-2 rounded-full bg-warning/40"></div>
                                        <div className="w-2 h-2 rounded-full bg-success/40"></div>
                                        <div className="ml-2 w-1/3 md:w-1/2 h-2.5 md:h-3.5 bg-base-100/50 rounded flex items-center px-2">
                                            <div className="w-full h-1 bg-base-content/5 rounded-full"></div>
                                        </div>
                                    </div>

                                    {projects[activeIndex].link && projects[activeIndex].link !== "#" ? (
                                        <a
                                            href={projects[activeIndex].link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block w-full h-full cursor-pointer relative"
                                        >
                                            <Image
                                                src={projects[activeIndex].image}
                                                alt={projects[activeIndex].title}
                                                fill
                                                className="object-contain object-center transition-all duration-700 group-hover:scale-[1.03] p-1 md:p-2"
                                                sizes="(max-width: 1024px) 100vw, 60vw"
                                                priority
                                            />
                                            <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                                                <div className="bg-base-100 text-base-content px-6 py-3 rounded-full font-bold tracking-[0.2em] uppercase text-xs shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-500 border border-primary/20">
                                                    Visit Live Project <i className="fas fa-external-link-alt ml-2 text-primary"></i>
                                                </div>
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        </a>
                                    ) : (
                                        <div className="w-full h-full relative">
                                            <Image
                                                src={projects[activeIndex].image}
                                                alt={projects[activeIndex].title}
                                                fill
                                                className="object-contain object-center p-1 md:p-2"
                                                sizes="(max-width: 1024px) 100vw, 60vw"
                                                priority
                                            />
                                        </div>
                                    )}
                                    
                                    <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/5 rounded-2xl"></div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Progress Indicators */}
                <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-50 hidden lg:flex">
                    {projects.map((_, i) => (
                        <div 
                            key={i} 
                            onClick={() => {
                                window.scrollTo({
                                    top: (sectionRef.current?.offsetTop || 0) + (i * window.innerHeight),
                                    behavior: 'smooth'
                                });
                            }}
                            className="group flex items-center gap-4 cursor-pointer"
                        >
                            <span className={`text-[10px] font-bold font-mono transition-all duration-300 ${activeIndex === i ? 'opacity-100 text-primary translate-x-0' : 'opacity-0 translate-x-4 text-base-content/40'}`}>
                                PROJECT 0{i+1}
                            </span>
                            <div className={`w-1.5 transition-all duration-500 rounded-full ${activeIndex === i ? 'h-12 bg-primary shadow-[0_0_15px_rgba(var(--p),0.6)]' : 'h-4 bg-primary/20 group-hover:bg-primary/40'}`} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;