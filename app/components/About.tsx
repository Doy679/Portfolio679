'use client';
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GradientTitle from './GradientTitle';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const mm = gsap.matchMedia();
        const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

        if (prefersReducedMotion) return;

        // Unified Horizontal Cinematic Scroll for ALL devices
        mm.add("(min-width: 1024px)", () => {
            if (!containerRef.current || !wrapperRef.current) return;

            const panels = gsap.utils.toArray('.story-panel');
            const totalWidth = containerRef.current.scrollWidth - window.innerWidth;

            // Main Horizontal Scroll Pinning
            gsap.to(panels, {
                x: () => -totalWidth,
                ease: 'none',
                scrollTrigger: {
                    trigger: wrapperRef.current,
                    pin: true,
                    start: 'top top',
                    end: () => `+=${totalWidth}`,
                    scrub: 1,
                    invalidateOnRefresh: true,
                    anticipatePin: 1
                }
            });

            // Parallax Background Text
            gsap.to('.parallax-bg-text', {
                x: () => -totalWidth * 0.3,
                ease: 'none',
                scrollTrigger: {
                    trigger: wrapperRef.current,
                    start: 'top top',
                    end: () => `+=${totalWidth}`,
                    scrub: true
                }
            });
        });

        // Mobile Reveal (Every Scroll) - Smooth Vertical Fallback
        mm.add("(max-width: 1023px)", () => {
            ScrollTrigger.batch('.story-panel', {
                onEnter: (elements) => {
                    gsap.fromTo(elements, 
                        { opacity: 0, y: 50, scale: 0.95 },
                        { opacity: 1, y: 0, scale: 1, duration: 1, stagger: 0.2, ease: "expo.out", overwrite: true }
                    );
                },
                onLeaveBack: (elements) => {
                    gsap.to(elements, { opacity: 0, y: 50, scale: 0.95, duration: 0.5, overwrite: true });
                },
                start: "top 90%",
                end: "bottom 10%"
            });
        });

        return () => mm.revert();
    }, { scope: wrapperRef });

    return (
        <section id="about" className="bg-base-200 overflow-x-clip relative min-h-screen" ref={wrapperRef}>
            {/* Background Parallax Text - Desktop Only */}
            <div className="hidden lg:block absolute top-[40%] left-0 -translate-y-1/2 whitespace-nowrap pointer-events-none z-0 select-none">
                <span className="parallax-bg-text font-black text-[10vw] text-primary/[0.02] font-montserrat tracking-tighter leading-none uppercase inline-block">
                    My Journey & Background &nbsp; My Journey & Background &nbsp; My Journey & Background
                </span>
            </div>

            <div 
                className="flex flex-col lg:flex-row w-full lg:w-[300vw] lg:h-screen relative z-10" 
                ref={containerRef}
            >
                {/* Panel 1: Intro */}
                <div className="story-panel w-full lg:w-screen min-h-screen lg:h-full flex flex-col items-center justify-center px-6 md:px-10 py-20 lg:py-0">
                     <div className="text-center w-full max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl lg:text-6xl font-black font-montserrat tracking-[0.2em] uppercase text-base-content">
                            <GradientTitle text="About Me" />
                        </h2>
                        <div className="w-16 h-1 bg-primary/40 mx-auto mt-4 mb-10 shadow-[0_0_15px_rgba(var(--p),0.4)]"></div>
                        <p className="text-lg md:text-xl lg:text-2xl font-medium leading-relaxed max-w-3xl mx-auto text-base-content/80">
                            Hello, I'm Rondether. I am an aspiring Junior Frontend Developer with a Bachelor of Science in Information Technology (BSIT) and a deep curiosity for crafting seamless digital experiences.
                        </p>
                    </div>
                </div>

                {/* Panel 2: Focus */}
                <div className="story-panel w-full lg:w-screen min-h-screen lg:h-full flex flex-col items-center justify-center px-6 md:px-10 py-20 lg:py-0 bg-base-300/30">
                     <div className="text-center w-full max-w-4xl mx-auto space-y-8 relative z-10">
                        <p className="text-lg md:text-xl lg:text-2xl font-medium leading-relaxed max-w-3xl mx-auto text-base-content/80">
                            I specialize in building responsive, user-friendly web layouts using HTML, CSS, Bootstrap, and Tailwind CSS. Beyond the basics, I am actively working with JavaScript and modern frameworks like React and Next.js. Backed by foundational knowledge in server-side logic and databases, I enjoy bridging the gap between great design and solid technical functionality to build applications that solve real-world problems.
                        </p>
                        <div className="pt-4">
                            <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg px-10 shadow-[0_10px_30px_rgba(var(--p),0.3)] hover:shadow-primary/50 transition-all duration-500">
                                <i className="fas fa-download mr-2"></i>Download My CV
                            </a>
                        </div>
                    </div>
                </div>

                {/* Panel 3: Education */}
                <div id="education-panel" className="story-panel w-full lg:w-screen min-h-screen lg:h-full flex flex-col items-center justify-center px-6 md:px-10 lg:px-20 py-20 lg:py-0">
                    <div className="w-full max-w-6xl relative z-10">
                        <h2 className="text-3xl md:text-4xl lg:text-6xl font-black font-montserrat tracking-[0.2em] uppercase text-base-content text-center">
                            <GradientTitle text="Education" />
                        </h2>
                        <div className="w-16 h-1 bg-primary/40 mx-auto mt-4 mb-12 md:mb-16 shadow-[0_0_15px_rgba(var(--p),0.4)]"></div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { year: "2022 - 2026", degree: "BS Information Technology", school: "Benedicto College", address: "A.S Fortuna, Mandaue City", color: "primary" },
                                { year: "2018 - 2020", degree: "Senior High School", school: "University of Cebu Lapu-lapu", address: "Looc A. C. Cortes Ave, Mandaue City", color: "accent" },
                                { year: "2016 - 2017", degree: "Junior High School", school: "TIngub National HS", address: "Tingub, Mandaue City", color: "secondary" },
                                { year: "2013 - 2014", degree: "Elementary School", school: "Cabancalan II Elementary School", address: "Cabancalan, Mandaue City", color: "info" }
                            ].map((edu, idx) => (
                                <div key={idx} className={`edu-card card bg-base-100 shadow-xl border-t-4 border-${edu.color} hover:-translate-y-2 transition-transform duration-500`}>
                                    <div className="card-body p-6">
                                        <div className={`text-${edu.color} font-bold text-lg font-mono tracking-tighter`}>{edu.year}</div>
                                        <h4 className="font-black text-sm uppercase mt-1 leading-tight">{edu.degree}</h4>
                                        <p className="text-xs font-bold text-base-content/60 mt-3">{edu.school}</p>
                                        <p className="text-[10px] text-base-content/40 italic mt-1">{edu.address}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;