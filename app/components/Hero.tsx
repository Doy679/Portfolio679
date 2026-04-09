'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloatingShape from './FloatingShape';
import GradientTitle from './GradientTitle';
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
                y: 50,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                }
            });
        });

        // Staggered Name Reveal
        gsap.from('.name-segment', {
            opacity: 0,
            y: 50,
            stagger: 0.2,
            duration: 1.2,
            ease: "expo.out",
            delay: 0.5
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
        <div id="home" className="hero min-h-screen pt-16 lg:pt-0 relative overflow-hidden" ref={heroRef}>
            
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
                className="absolute top-0 right-0 w-full lg:w-1/2 h-full z-[5] overflow-hidden mask-fade-left pointer-events-none"
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
                        style={{ objectFit: 'cover', objectPosition: 'top' }} 
                        className="relative z-10"
                        priority 
                    />
                    {/* Adjusted gradients for better visibility on mobile */}
                    <div className="absolute inset-0 bg-gradient-to-r from-base-100 via-base-100/20 to-transparent z-20 lg:from-base-100 lg:via-transparent lg:to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-transparent to-transparent z-20"></div>
                </div>
            </motion.div>

            <div className="hero-content flex-col w-full px-6 md:px-10 z-10 relative items-start hero-text-container">
                <div className="w-full lg:w-3/4 text-left pt-20 lg:pt-0">
                    <div 
                        className="font-montserrat text-4xl md:text-5xl lg:text-7xl font-black tracking-normal leading-[1.2] drop-shadow-2xl mt-12 lg:mt-20 flex flex-col gap-4"
                    >
                        <div className="name-segment overflow-visible py-2">
                            <GradientTitle 
                                text="RONDETHER" 
                                className="px-4 pb-4"
                                inView={false} 
                                initialX={-40} 
                                initialY={0} 
                                delay={0.3} 
                            />
                        </div>
                        <div className="name-segment overflow-visible py-2">
                            <GradientTitle 
                                text="GONZALES" 
                                className="px-4 pb-4"
                                inView={false} 
                                initialX={-40} 
                                initialY={0} 
                                delay={0.5} 
                            />
                        </div>
                    </div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-3xl md:text-4xl font-bold py-6"
                    >
                        <span ref={typingTextRef}></span><span className="cursor text-primary">|</span>
                    </motion.h2>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="py-6 max-w-2xl text-lg lg:text-xl drop-shadow-md font-medium text-base-content/80"
                    >
                        Driven by a deep passion for technology and committed to building effective digital solutions.
                        My focus is in Front-End Development, utilizing foundational web languages
                        and applying principles of great design. I am highly motivated to acquire new technical knowledge.
                    </motion.p>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-wrap gap-4 mt-4"
                    >
                        <Magnetic strength={0.4}>
                            <motion.a 
                                whileHover={{ scale: 1.05, y: -5 }} 
                                whileTap={{ scale: 0.95 }} 
                                href="#projects" 
                                className="btn btn-primary btn-lg shadow-[0_10px_20px_rgba(var(--p),0.3)] transition-all duration-300"
                            >
                                <i className="fas fa-briefcase mr-2"></i>View Projects
                            </motion.a>
                        </Magnetic>

                        <Magnetic strength={0.2}>
                            <motion.a 
                                whileHover={{ scale: 1.05, y: -5 }} 
                                whileTap={{ scale: 0.95 }} 
                                href="#contact" 
                                className="btn btn-outline btn-primary btn-lg bg-base-100/50 backdrop-blur-sm transition-all duration-300"
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
                                className="btn btn-outline btn-primary btn-lg bg-base-100/50 backdrop-blur-sm transition-all duration-300"
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