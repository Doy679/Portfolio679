'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import HeroPortrait from './HeroPortrait';
import { Icon } from '../lib/icons';
import { Magnetic } from './Magnetic';

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
        <div id="home" ref={heroRef} className="hero min-h-[85svh] pt-24 lg:pt-0 relative overflow-hidden bg-base-100 transition-colors duration-500">
            
            {/* Large Watermark Background Text */}
            <div className="absolute top-[48%] left-0 -translate-y-1/2 w-full lg:w-[60%] flex items-center justify-center px-8 lg:px-16 z-[7] pointer-events-none select-none overflow-visible">
                <span className="font-black text-[7vw] lg:text-[8vw] text-base-content/[0.06] dark:text-base-content/[0.04] font-montserrat tracking-tighter leading-none uppercase whitespace-nowrap transition-colors duration-500">
                    HELLO WORLD
                </span>
            </div>
            
            {/* Cut-out portrait with mouse parallax (Lando-style pop-out) */}
            <HeroPortrait />

            <div className="hero-content flex-col w-full px-4 sm:px-6 md:px-10 z-10 lg:z-10 relative items-start h-full justify-center pb-6 pt-32 lg:pt-28 lg:pb-0 pointer-events-none">
                <div className="w-full lg:w-3/4 text-left pointer-events-auto">
                    <div 
                        className="font-montserrat text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-black tracking-normal leading-none drop-shadow-none dark:drop-shadow-2xl flex flex-col gap-0"
                    >
                        <div className="name-segment overflow-hidden pb-1 sm:pb-2">
                            <span ref={addToTextRefs} className="inline-block px-2 sm:px-4 text-primary transition-colors duration-500">RONDETHER</span>
                        </div>
                        <div className="name-segment overflow-hidden pb-1 sm:pb-2">
                            <span ref={addToTextRefs} className="inline-block px-2 sm:px-4 text-primary transition-colors duration-500">GONZALES</span>
                        </div>
                    </div>
                    
                    <div className="overflow-hidden py-4 sm:py-6 mt-4 lg:mt-8">
                        <h2 ref={addToTextRefs} className="inline-block text-xl sm:text-2xl md:text-4xl font-bold text-base-content transition-colors duration-500">
                            Front End Developer
                        </h2>
                    </div>
                    
                    <div className="overflow-hidden py-2 sm:py-4 lg:py-6">
                        <p ref={addToTextRefs} className="inline-block max-w-2xl text-xs sm:text-sm md:text-lg lg:text-xl leading-relaxed drop-shadow-none dark:drop-shadow-md font-medium text-base-content/75 transition-colors duration-500">
                            Driven by a deep passion for technology and committed to building effective digital solutions.
                            My focus is in Front-End Development, utilizing foundational web languages
                            and applying principles of great design. I am highly motivated to acquire new technical knowledge.
                        </p>
                    </div>
                    
                    <div className="overflow-hidden mt-6">
                        <div ref={addToTextRefs} className="inline-flex flex-wrap gap-2 sm:gap-4">
                            <Magnetic>
                                <a
                                    href="#projects"
                                    className="btn btn-primary btn-sm sm:btn-md lg:btn-lg shadow-[0_10px_20px_rgba(var(--p),0.3)] transition-all duration-300 hover:scale-105 border-none"
                                >
                                    <Icon name="fa-briefcase" className="mr-2" />View Projects
                                </a>
                            </Magnetic>

                            <Magnetic>
                                <a
                                    href="#contact"
                                    className="btn btn-outline btn-sm sm:btn-md lg:btn-lg border-base-content/20 text-base-content hover:bg-base-content/5 hover:border-base-content/40 transition-all duration-300 hover:scale-105"
                                >
                                    <Icon name="fa-envelope" className="mr-2" />Contact Me
                                </a>
                            </Magnetic>

                            <Magnetic>
                                <a
                                    href="/cv.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-outline btn-sm sm:btn-md lg:btn-lg border-base-content/20 text-base-content hover:bg-base-content/5 hover:border-base-content/40 transition-all duration-300 hover:scale-105"
                                >
                                    <Icon name="fa-download" className="mr-2" />Download CV
                                </a>
                            </Magnetic>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
