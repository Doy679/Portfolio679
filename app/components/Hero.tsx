'use client';
import React from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import ParticleBackground from './ParticleBackground';

gsap.registerPlugin(TextPlugin);

const Hero = () => {
    const heroRef = React.useRef(null);
    const typingTextRef = React.useRef(null);

    useGSAP(() => {
        // Typing Animation
        const texts = ["IT Undergraduate", "Front End Developer"];
        let masterTl = gsap.timeline({ repeat: -1 });

        texts.forEach(text => {
            let tl = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 1 });
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

        // Image Reveal Animation
        gsap.fromTo(
            '.avatar',
            { clipPath: 'circle(0% at 50% 50%)' },
            { clipPath: 'circle(75% at 50% 50%)', duration: 2, ease: 'power3.out', delay: 1 }
        );

    }, { scope: heroRef });

    return (
        <div id="home" className="hero min-h-screen pt-16 lg:pt-0" ref={heroRef}>
            <ParticleBackground />
            <div className="hero-content flex-col lg:flex-row-reverse justify-between w-full px-10">
                <div className="relative lg:w-1/2 flex justify-center">
                    <div className="avatar relative z-10">
                        <div className="w-60 h-60 md:w-72 md:h-72 rounded-full border-4 border-primary overflow-hidden shadow-2xl shadow-primary">
                            <Image src="/me.jpg" alt="Rondether Gonzales" fill objectFit="cover" className="rounded-full" />
                        </div>
                    </div>
                </div>
                <div className="lg:w-1/2 hero-text">
                    <h1 className="text-5xl font-bold">Hi, I'm <span className="text-primary">Rondether Gonzales</span></h1>
                    <h2 className="text-3xl font-bold py-6">
                        <span ref={typingTextRef}></span><span className="cursor text-primary">|</span>
                    </h2>
                    <p className="py-6">
                        Driven by a deep passion for technology and committed to building effective digital solutions.
                        My focus is in Front-End Development, utilizing foundational web languages
                        and applying principles of great design. I am highly motivated to acquire new technical knowledge.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <a href="#projects" className="btn btn-primary">
                            <i className="fas fa-briefcase mr-2"></i>View Projects
                        </a>
                        <a href="#contact" className="btn btn-outline btn-primary">
                            <i className="fas fa-envelope mr-2"></i>Contact Me
                        </a>
                        <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-secondary">
                            <i className="fas fa-download mr-2"></i>Download CV
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;