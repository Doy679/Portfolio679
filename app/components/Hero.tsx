'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(TextPlugin, ScrollTrigger);

const Hero = () => {
    const heroRef = React.useRef(null);
    const typingTextRef = React.useRef(null);

    useGSAP(() => {
        // Typing Animation (Keep GSAP for typing as it's better at string manipulation)
        const texts = ["Junior Web Developer", "Front End Developer"];
        const masterTl = gsap.timeline({ repeat: -1 });

        texts.forEach(text => {
            const tl = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 1 });
            tl.to(typingTextRef.current, { duration: 2, text: text });
            masterTl.add(tl);
        });

        // Blinking cursor
        gsap.to('.cursor', { opacity: 0, ease: "power2.inOut", repeat: -1 });

        // --- High-End Parallax Scrub Effects (Keep GSAP for scroll scrubbing) ---
        gsap.to('.hero-text-container', {
            y: 150,
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
                trigger: heroRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            }
        });

        gsap.to('.hero-bg-img', {
            y: 200,
            scale: 1.1,
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
        <div id="home" className="hero min-h-screen pt-16 lg:pt-0 relative" ref={heroRef}>
            
            {/* Split Screen Background Image */}
            <motion.div 
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                className="absolute top-0 right-0 w-full lg:w-1/2 h-full z-0 overflow-hidden mask-fade-left"
            >
                <div className="relative w-full h-full hero-bg-img opacity-60 lg:opacity-80 mix-blend-luminosity">
                     <Image 
                        src="/me.jpg" 
                        alt="Rondether Gonzales" 
                        fill 
                        style={{ objectFit: 'cover', objectPosition: 'center' }} 
                        priority 
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-base-100 via-transparent to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-transparent to-transparent"></div>
                </div>
            </motion.div>

            <div className="hero-content flex-col w-full px-6 md:px-10 z-10 relative items-start hero-text-container">
                <div className="w-full lg:w-3/4 text-left pt-20 lg:pt-0">
                    <motion.h1 
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="font-montserrat text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-tight drop-shadow-lg mt-8 lg:mt-12"
                    >
                        Hi, I&apos;m <br/>
                        <span className="text-primary mix-blend-difference font-extrabold relative inline-block">
                            Rondether<br/>Gonzales
                        </span>
                    </motion.h1>
                    
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
                        <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#projects" className="btn btn-primary btn-lg shadow-[0_0_20px_rgba(var(--p),0.4)]">
                            <i className="fas fa-briefcase mr-2"></i>View Projects
                        </motion.a>
                        <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#contact" className="btn btn-outline btn-primary btn-lg bg-base-100/50 backdrop-blur-sm">
                            <i className="fas fa-envelope mr-2"></i>Contact Me
                        </motion.a>
                        <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-secondary btn-lg bg-base-100/50 backdrop-blur-sm">
                            <i className="fas fa-download mr-2"></i>Download CV
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Hero;