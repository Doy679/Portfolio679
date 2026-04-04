'use client';
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';
import HackerText from './HackerText';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [startScramble, setStartScramble] = useState(false);

    useGSAP(() => {
        if (!sectionRef.current || !scrollAreaRef.current) return;

        // Header Scramble Trigger
        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top 70%',
            onEnter: () => setStartScramble(true),
            onLeaveBack: () => setStartScramble(false),
            onEnterBack: () => setStartScramble(true)
        });

        // Sticky Scroll Logic
        const totalProjects = projects.length;
        
        ScrollTrigger.create({
            trigger: scrollAreaRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onUpdate: (self) => {
                // Determine active index based on scroll progress
                const progress = self.progress;
                const newIndex = Math.min(
                    Math.floor(progress * totalProjects),
                    totalProjects - 1
                );
                if (newIndex !== activeIndex) {
                    setActiveIndex(newIndex);
                }
            }
        });

    }, [activeIndex]);

    return (
        <section id="projects" className="bg-base-200 relative" ref={sectionRef}>
            <div ref={scrollAreaRef} className="relative" style={{ height: `${projects.length * 100}vh` }}>
                
                <div className="sticky top-0 h-screen w-full overflow-visible flex flex-col items-center justify-center">
                    
                    <div className="container mx-auto px-6 lg:px-20 h-full flex flex-col">
                        
                        <div className="pt-16 pb-6 text-center shrink-0">
                            <h2 className="text-2xl md:text-3xl font-bold font-montserrat tracking-[0.2em] uppercase text-base-content">
                                <HackerText text="My Featured Projects" trigger={startScramble} />
                            </h2>
                            <div className="w-12 h-0.5 bg-primary/40 mx-auto mt-4"></div>
                        </div>

                        <div className="flex-grow flex flex-col lg:flex-row items-center gap-10 lg:gap-16 pb-12 overflow-visible">
                            
                            <div className="w-full lg:w-[40%] relative min-h-[450px] lg:h-full flex flex-col justify-center order-2 lg:order-1 overflow-visible">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeIndex}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                        className="space-y-5 lg:space-y-6 py-4"
                                    >
                                        <div className="flex items-center gap-4 text-primary font-mono text-base font-bold overflow-hidden h-8">
                                            <div className="relative h-full flex flex-col items-start">
                                                <AnimatePresence mode="wait">
                                                    <motion.span
                                                        key={activeIndex}
                                                        initial={{ y: 20, opacity: 0 }}
                                                        animate={{ y: 0, opacity: 1 }}
                                                        exit={{ y: -20, opacity: 0 }}
                                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                                    >
                                                        0{activeIndex + 1}
                                                    </motion.span>
                                                </AnimatePresence>
                                            </div>
                                            <span className="text-primary/30 font-light">/</span>
                                            <span className="text-primary/30">0{projects.length}</span>
                                            <div className="h-[1px] flex-grow bg-primary/10 ml-2"></div>
                                        </div>
                                        
                                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-black font-montserrat tracking-tighter leading-tight uppercase text-base-content">
                                            {projects[activeIndex].title}
                                        </h3>

                                        <div className="flex flex-wrap gap-x-3 gap-y-2">
                                            {projects[activeIndex].badges.map((badge, i) => (
                                                <span key={i} className="text-[9px] uppercase font-bold tracking-[0.2em] text-base-content/40 flex items-center">
                                                    {i !== 0 && <span className="text-primary/40 mr-3 font-mono">{'//'}</span>}
                                                    {badge}
                                                </span>
                                            ))}
                                        </div>

                                        <p className="text-base-content/60 text-base md:text-lg leading-relaxed line-clamp-4 lg:line-clamp-none">
                                            {projects[activeIndex].description}
                                        </p>

                                        <div className="pt-4 lg:pt-6 flex">
                                            {projects[activeIndex].link && projects[activeIndex].link !== "#" ? (
                                                <a 
                                                    href={projects[activeIndex].link} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="group inline-flex items-center gap-4 text-primary font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs hover:gap-6 transition-all duration-300 py-2"
                                                >
                                                    <span>Explore Project</span>
                                                    <div className="w-10 h-[1px] bg-primary group-hover:w-16 transition-all duration-500"></div>
                                                    <i className="fas fa-arrow-right"></i>
                                                </a>
                                            ) : (
                                                <div className="flex items-center gap-4 text-base-content/20 font-mono text-[9px] tracking-[0.3em] uppercase py-2.5 px-4 border border-base-content/5 rounded bg-base-300/30 w-fit">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse"></span>
                                                    Architecture {'//'} Secure
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Right Column: Fixed/Cross-fading Image */}
                            <div className="w-full lg:w-[60%] flex flex-col gap-4 order-1 lg:order-2">
                                <div className="flex justify-end items-end h-12 pr-4">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeIndex}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="font-black text-6xl text-primary/10 font-montserrat tracking-tighter leading-none"
                                        >
                                            0{activeIndex + 1}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeIndex}
                                            initial={{ opacity: 0, scale: 0.95, rotateY: 5 }}
                                            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                                            exit={{ opacity: 0, scale: 1.02, rotateY: -5 }}
                                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                            className="absolute inset-0 rounded-2xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] border border-primary/20 bg-base-300"
                                        >
                                            {projects[activeIndex].link && projects[activeIndex].link !== "#" ? (
                                                <a
                                                    href={projects[activeIndex].link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block w-full h-full cursor-pointer"
                                                >
                                                    <Image
                                                        src={projects[activeIndex].image}
                                                        alt={projects[activeIndex].title}
                                                        fill
                                                        className="object-cover object-center transition-transform duration-300 hover:scale-105"
                                                        sizes="(max-width: 1024px) 100vw, 60vw"
                                                        priority
                                                    />
                                                </a>
                                            ) : (
                                                <Image
                                                    src={projects[activeIndex].image}
                                                    alt={projects[activeIndex].title}
                                                    fill
                                                    className="object-cover object-center"
                                                    sizes="(max-width: 1024px) 100vw, 60vw"
                                                    priority
                                                />
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-base-900/40 via-transparent to-transparent pointer-events-none"></div>
                                            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none"></div>
                                            {projects[activeIndex].link && projects[activeIndex].link !== "#" && (
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                                    <div className="bg-primary/90 text-primary-content px-6 py-3 rounded-full font-bold tracking-wider uppercase text-sm shadow-lg">
                                                        <i className="fas fa-external-link-alt mr-2"></i>View Project
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50 hidden lg:flex">
                    {projects.map((_, i) => (
                        <div 
                            key={i} 
                            onClick={() => {
                                // Jump scroll to the corresponding section if needed
                                window.scrollTo({
                                    top: (sectionRef.current?.offsetTop || 0) + (i * window.innerHeight),
                                    behavior: 'smooth'
                                });
                            }}
                            className={`w-1 cursor-pointer transition-all duration-500 rounded-full ${activeIndex === i ? 'h-12 bg-primary shadow-[0_0_10px_rgba(var(--p),0.5)]' : 'h-4 bg-primary/20'}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;