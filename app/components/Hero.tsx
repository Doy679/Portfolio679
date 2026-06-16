'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const Hero = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const textRefs = useRef<HTMLElement[]>([]);

    const addToTextRefs = (el: HTMLElement | null) => {
        if (el && !textRefs.current.includes(el)) {
            textRefs.current.push(el);
        }
    };

    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add(
            {
                reduceMotion: '(prefers-reduced-motion: reduce)',
                allowMotion: '(prefers-reduced-motion: no-preference)'
            },
            (context) => {
                const { reduceMotion } = context.conditions as { reduceMotion: boolean };

                if (reduceMotion) {
                    gsap.set(textRefs.current, { y: 0, opacity: 1 });
                    return;
                }

                // Reset for animation
                gsap.set(textRefs.current, { y: '100%' });

                const tl = gsap.timeline();
                tl.to(textRefs.current, {
                    y: '0%',
                    duration: 1.2,
                    stagger: 0.1,
                    ease: 'power4.out',
                    delay: 0.2,
                });
            }
        );

        return () => mm.revert();
    }, { scope: heroRef });

    return (
        <div id="home" ref={heroRef} className="hero min-h-[100svh] pt-12 lg:pt-0 relative overflow-hidden bg-[#1d232a]">
            
            {/* Large Watermark Background Text */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full lg:w-[60%] flex items-center justify-center px-8 lg:px-16 z-[7] pointer-events-none select-none overflow-visible">
                <span className="font-black text-[7vw] lg:text-[8vw] text-primary/10 font-montserrat tracking-tighter leading-none uppercase whitespace-nowrap">
                    HELLO WORLD
                </span>
            </div>
            
            {/* Split Screen Background Image */}
            <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full z-[8] lg:z-[5] overflow-hidden pointer-events-none opacity-100">
                <div className="relative w-full h-full opacity-100 mix-blend-normal">
                     <Image 
                        src="/new.png" 
                        alt="Rondether Gonzales" 
                        fill 
                        className="relative z-10 object-cover object-[58%_18%] lg:object-top"
                        priority 
                    />
                    {/* Mobile keeps the portrait readable while desktop preserves the split fade. */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#1d232a]/35 via-[#1d232a]/10 to-[#1d232a]/45 z-20 lg:bg-gradient-to-r lg:from-[#1d232a] lg:via-[#1d232a]/20 lg:to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1d232a]/55 via-[#1d232a]/20 to-[#1d232a]/5 z-20 lg:hidden"></div>
                </div>
            </div>

            <div className="hero-content flex-col w-full px-4 sm:px-6 md:px-10 z-10 lg:z-10 relative items-start h-full justify-center pb-6 pt-20 lg:pt-0 lg:pb-0 pointer-events-none">
                <div className="w-full lg:w-3/4 text-left pointer-events-auto">
                    <div 
                        className="font-montserrat text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-black tracking-normal leading-none drop-shadow-2xl flex flex-col gap-0"
                    >
                        <div className="name-segment overflow-hidden pb-1 sm:pb-2">
                            <span ref={addToTextRefs} className="inline-block px-2 sm:px-4 text-primary">RONDETHER</span>
                        </div>
                        <div className="name-segment overflow-hidden pb-1 sm:pb-2">
                            <span ref={addToTextRefs} className="inline-block px-2 sm:px-4 text-primary">GONZALES</span>
                        </div>
                    </div>
                    
                    <div className="overflow-hidden py-4 sm:py-6">
                        <h2 ref={addToTextRefs} className="inline-block text-xl sm:text-2xl md:text-4xl font-bold">
                            Front End Developer
                        </h2>
                    </div>
                    
                    <div className="overflow-hidden py-2 sm:py-4 lg:py-6">
                        <p ref={addToTextRefs} className="inline-block max-w-2xl text-xs sm:text-sm md:text-lg lg:text-xl leading-relaxed drop-shadow-md font-medium text-base-content/80">
                            Driven by a deep passion for technology and committed to building effective digital solutions.
                            My focus is in Front-End Development, utilizing foundational web languages
                            and applying principles of great design. I am highly motivated to acquire new technical knowledge.
                        </p>
                    </div>
                    
                    <div className="overflow-hidden mt-6">
                        <div ref={addToTextRefs} className="inline-flex flex-wrap gap-2 sm:gap-4">
                            <a 
                                href="#projects" 
                                className="btn btn-primary btn-sm sm:btn-md lg:btn-lg shadow-[0_10px_20px_rgba(var(--p),0.3)] transition-all duration-300 hover:scale-105"
                            >
                                <i className="fas fa-briefcase mr-2"></i>View Projects
                            </a>

                            <a 
                                href="#contact" 
                                className="btn btn-outline btn-primary btn-sm sm:btn-md lg:btn-lg bg-base-100/50 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                            >
                                <i className="fas fa-envelope mr-2"></i>Contact Me
                            </a>

                            <a 
                                href="/cv.pdf" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="btn btn-outline btn-primary btn-sm sm:btn-md lg:btn-lg bg-base-100/50 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                            >
                                <i className="fas fa-download mr-2"></i>Download CV
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
