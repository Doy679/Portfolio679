'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloatingShape from './FloatingShape';
import Magnetic from './Magnetic';

gsap.registerPlugin(TextPlugin, ScrollTrigger);

const Hero = () => {
    const heroRef = useRef(null);
    const typingTextRef = useRef(null);

    useGSAP(() => {
        // Typing Animation
        const texts = ["Junior Web Developer", "Front End Developer"];
        const masterTl = gsap.timeline({ repeat: -1 });

        texts.forEach(text => {
            const tl = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 1 });
            tl.to(typingTextRef.current, { duration: 2, text: text });
            masterTl.add(tl);
        });

        // Blinking cursor
        gsap.to('.cursor', { opacity: 0, ease: "power2.inOut", repeat: -1 });

        // Parallax Effects - Now for all devices with different intensities
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
            gsap.to('.hero-text-container', {
                y: 100,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                }
            });

            gsap.to('.hero-bg-img', {
                y: 150,
                scale: 1.05,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                }
            });
        });

        mm.add("(max-width: 1023px)", () => {
            gsap.to('.hero-bg-img', {
                y: 28,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                }
            });
        });

        // Watermark Parallax
        gsap.to('.hero-watermark', {
            y: -100,
            ease: 'none',
            scrollTrigger: {
                trigger: heroRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            }
        });

    }, { scope: heroRef });

    return (
        <div id="home" className="hero min-h-[100svh] pt-12 lg:pt-0 relative overflow-hidden bg-[#1d232a]" ref={heroRef}>
            
            {/* Large Watermark Background Text */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full lg:w-[60%] flex items-center justify-center px-8 lg:px-16 z-[7] pointer-events-none select-none overflow-visible">
                <span className="hero-watermark font-black text-[7vw] lg:text-[8vw] text-primary/10 font-montserrat tracking-tighter leading-none uppercase whitespace-nowrap">
                    HELLO WORLD
                </span>
            </div>
            
            {/* Split Screen Background Image */}
            <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                className="absolute top-0 right-0 w-full lg:w-1/2 h-full z-[8] lg:z-[5] overflow-hidden lg:mask-fade-left pointer-events-none"
            >
                <div className="relative w-full h-full hero-bg-img opacity-100 mix-blend-normal">
                     {/* 3D Element as an aura behind the image */}
                     <div className="absolute inset-0 z-0 opacity-30 lg:opacity-60 scale-150">
                        <FloatingShape />
                     </div>
                     
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
            </motion.div>

            <div className="hero-content flex-col w-full px-4 sm:px-6 md:px-10 z-10 lg:z-10 relative items-start hero-text-container h-full justify-center pb-6 pt-20 lg:pt-0 lg:pb-0 pointer-events-none">
                <div className="w-full lg:w-3/4 text-left pointer-events-auto">
                    <div 
                        className="font-montserrat text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-black tracking-normal leading-none drop-shadow-2xl flex flex-col gap-0"
                    >
                        <div className="name-segment overflow-visible">
                            <span className="gradient-text-animate inline-block px-2 sm:px-4 pb-1 sm:pb-2">RONDETHER</span>
                        </div>
                        <div className="name-segment overflow-visible">
                            <span className="gradient-text-animate inline-block px-2 sm:px-4 pb-1 sm:pb-2">GONZALES</span>
                        </div>
                    </div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-xl sm:text-2xl md:text-4xl font-bold py-4 sm:py-6"
                    >
                        <span ref={typingTextRef}></span><span className="cursor text-primary">|</span>
                    </motion.h2>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="py-2 sm:py-4 lg:py-6 max-w-2xl text-xs sm:text-sm md:text-lg lg:text-xl leading-relaxed drop-shadow-md font-medium text-base-content/80"
                    >
                        Driven by a deep passion for technology and committed to building effective digital solutions.
                        My focus is in Front-End Development, utilizing foundational web languages
                        and applying principles of great design. I am highly motivated to acquire new technical knowledge.
                    </motion.p>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-wrap gap-2 sm:gap-4 mt-6"
                    >
                        <Magnetic strength={0.4}>
                            <motion.a 
                                whileHover={{ scale: 1.05, y: -5 }} 
                                whileTap={{ scale: 0.95 }} 
                                href="#projects" 
                                className="btn btn-primary btn-sm sm:btn-md lg:btn-lg shadow-[0_10px_20px_rgba(var(--p),0.3)] transition-all duration-300"
                            >
                                <i className="fas fa-briefcase mr-2"></i>View Projects
                            </motion.a>
                        </Magnetic>

                        <Magnetic strength={0.2}>
                            <motion.a 
                                whileHover={{ scale: 1.05, y: -5 }} 
                                whileTap={{ scale: 0.95 }} 
                                href="#contact" 
                                className="btn btn-outline btn-primary btn-sm sm:btn-md lg:btn-lg bg-base-100/50 backdrop-blur-sm transition-all duration-300"
                            >
                                <i className="fas fa-envelope mr-2"></i>Contact Me
                            </motion.a>
                        </Magnetic>

                        <Magnetic strength={0.2}>
                            <motion.a 
                                whileHover={{ scale: 1.05, y: -5 }} 
                                whileTap={{ scale: 0.95 }} 
                                href="/cv.pdf" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="btn btn-outline btn-primary btn-sm sm:btn-md lg:btn-lg bg-base-100/50 backdrop-blur-sm transition-all duration-300"
                            >
                                <i className="fas fa-download mr-2"></i>Download CV
                            </motion.a>
                        </Magnetic>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
