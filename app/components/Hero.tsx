'use client';
import React from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

const Hero = () => {
    const heroRef = React.useRef(null);
    const typingTextRef = React.useRef(null);

    useGSAP(() => {
        // Typing Animation
        const texts = ["IT Undergraduate", "Front End Developer"];
        const masterTl = gsap.timeline({ repeat: -1 });

        texts.forEach(text => {
            const tl = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 1 });
            tl.to(typingTextRef.current, { duration: 2, text: text });
            masterTl.add(tl);
        });

        // Blinking cursor
        gsap.to('.cursor', { opacity: 0, ease: "power2.inOut", repeat: -1 });

        // Intro Animation
        gsap.fromTo(
            '.hero-text > *',
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }
        );

        // Image Reveal Animation (Fade in the background image)
        gsap.fromTo(
            '.hero-bg-img',
            { opacity: 0, x: 100 },
            { opacity: 0.8, x: 0, duration: 1.5, ease: 'power3.out', delay: 0.5 }
        );

    }, { scope: heroRef });

    return (
        <div id="home" className="hero min-h-screen pt-16 lg:pt-0 relative" ref={heroRef}>
            
            {/* Split Screen Background Image - Now visible on all sizes */}
            <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full z-0 overflow-hidden mask-fade-left">
                <div className="relative w-full h-full hero-bg-img opacity-60 lg:opacity-80 mix-blend-luminosity">
                     <Image 
                        src="/me.jpg" 
                        alt="Rondether Gonzales" 
                        fill 
                        style={{ objectFit: 'cover', objectPosition: 'center' }} 
                        priority 
                    />
                    {/* Gradient Overlay to fade the image into the background color smoothly */}
                    <div className="absolute inset-0 bg-gradient-to-r from-base-100 via-transparent to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-transparent to-transparent"></div>
                </div>
            </div>

            <div className="hero-content flex-col w-full px-6 md:px-10 z-10 relative items-start">
                <div className="w-full lg:w-3/4 hero-text text-left pt-20 lg:pt-0">
                    <h1 className="font-montserrat text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-tight drop-shadow-lg mt-8 lg:mt-12">
                        Hi, I&apos;m <br/>
                        <span className="text-primary mix-blend-difference font-extrabold">Rondether<br/>Gonzales</span>
                    </h1>
                    <h2 className="text-3xl md:text-4xl font-bold py-6">
                        <span ref={typingTextRef}></span><span className="cursor text-primary">|</span>
                    </h2>
                    <p className="py-6 max-w-2xl text-lg lg:text-xl drop-shadow-md font-medium">
                        Driven by a deep passion for technology and committed to building effective digital solutions.
                        My focus is in Front-End Development, utilizing foundational web languages
                        and applying principles of great design. I am highly motivated to acquire new technical knowledge.
                    </p>
                    <div className="flex flex-wrap gap-4 mt-4">
                        <a href="#projects" className="btn btn-primary btn-lg">
                            <i className="fas fa-briefcase mr-2"></i>View Projects
                        </a>
                        <a href="#contact" className="btn btn-outline btn-primary btn-lg bg-base-100/50 backdrop-blur-sm">
                            <i className="fas fa-envelope mr-2"></i>Contact Me
                        </a>
                        <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-secondary btn-lg bg-base-100/50 backdrop-blur-sm">
                            <i className="fas fa-download mr-2"></i>Download CV
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;