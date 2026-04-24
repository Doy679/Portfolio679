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

        // Unified horizontal scroll carousel for desktop and mobile
        mm.add("(min-width: 0px)", () => {
            if (!containerRef.current || !wrapperRef.current) return;

            const panels = gsap.utils.toArray<HTMLElement>('.story-panel');
            const slideCount = panels.length;
            const scrollDistance = () => window.innerWidth * (slideCount - 1);

            // Main Horizontal Scroll Pinning
            gsap.to(panels, {
                xPercent: -100 * (slideCount - 1),
                ease: 'none',
                scrollTrigger: {
                    trigger: wrapperRef.current,
                    pin: true,
                    start: 'top top',
                    end: () => `+=${scrollDistance()}`,
                    scrub: 0.75,
                    snap: {
                        snapTo: 1 / (slideCount - 1),
                        duration: { min: 0.12, max: 0.32 },
                        ease: 'power1.inOut'
                    },
                    invalidateOnRefresh: true,
                    anticipatePin: 1
                }
            });

            // Parallax Background Text
            gsap.to('.parallax-bg-text', {
                x: () => -scrollDistance() * 0.3,
                ease: 'none',
                scrollTrigger: {
                    trigger: wrapperRef.current,
                    start: 'top top',
                    end: () => `+=${scrollDistance()}`,
                    scrub: true
                }
            });
        });

        return () => mm.revert();
    }, { scope: wrapperRef });

    return (
        <section id="about" className="bg-base-200 overflow-x-clip relative min-h-screen" ref={wrapperRef}>
            <div className="mobile-about-backdrop lg:hidden absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -left-8 top-20 bottom-10 w-px bg-gradient-to-b from-transparent via-primary/35 to-transparent"></div>
                <div className="absolute right-0 top-[18%] h-56 w-24 bg-primary/10 blur-3xl"></div>
                <div className="absolute left-0 bottom-[24%] h-48 w-28 bg-secondary/10 blur-3xl"></div>
            </div>

            {/* Background Parallax Text - Desktop Only */}
            <div className="hidden lg:block absolute top-[40%] left-0 -translate-y-1/2 whitespace-nowrap pointer-events-none z-0 select-none">
                <span className="parallax-bg-text font-black text-[10vw] text-primary/[0.02] font-montserrat tracking-tighter leading-none uppercase inline-block">
                    My Journey & Background &nbsp; My Journey & Background &nbsp; My Journey & Background
                </span>
            </div>

            <div 
                className="flex flex-row w-[300vw] h-[100svh] lg:h-screen relative z-10" 
                ref={containerRef}
            >
                {/* Panel 1: Intro */}
                <div className="story-panel w-screen shrink-0 h-full flex flex-col items-center justify-center px-6 md:px-10 py-14 sm:py-20 lg:py-0 overflow-hidden">
                     <div className="mobile-about-card lg:bg-transparent lg:border-0 lg:shadow-none lg:p-0 text-left lg:text-center w-full max-w-4xl mx-auto relative">
                        <div className="mobile-reveal lg:hidden flex items-center justify-between mb-6 text-[10px] font-mono uppercase tracking-[0.35em] text-primary/70">
                            <span>Profile</span>
                            <span>01 / 03</span>
                        </div>
                        <h2 className="mobile-reveal text-[3.25rem] md:text-5xl lg:text-6xl font-black font-montserrat tracking-normal lg:tracking-[0.2em] uppercase leading-[0.9] text-base-content">
                            <GradientTitle text="About Me" />
                        </h2>
                        <div className="mobile-reveal w-full lg:w-16 h-px lg:h-1 bg-white/10 lg:bg-primary/40 lg:mx-auto mt-5 mb-8 lg:mt-4 lg:mb-10 overflow-hidden shadow-[0_0_15px_rgba(var(--p),0.4)]">
                            <div className="mobile-line-fill h-full w-full bg-gradient-to-r from-primary via-secondary to-transparent lg:bg-primary/40"></div>
                        </div>
                        <p className="mobile-reveal mobile-about-copy text-xl md:text-xl lg:text-2xl font-medium leading-relaxed max-w-3xl mx-auto text-base-content/80">
                            Hello, I&apos;m Rondether. I am an aspiring Junior Frontend Developer with a Bachelor of Science in Information Technology (BSIT) and a deep curiosity for crafting seamless digital experiences.
                        </p>
                    </div>
                </div>

                {/* Panel 2: Focus */}
                <div className="story-panel w-screen shrink-0 h-full flex flex-col items-center justify-center px-6 md:px-10 py-14 sm:py-20 lg:py-0 bg-base-300/30 overflow-hidden">
                     <div className="mobile-about-card lg:bg-transparent lg:border-0 lg:shadow-none lg:p-0 text-left lg:text-center w-full max-w-4xl mx-auto space-y-8 relative z-10">
                        <div className="mobile-reveal lg:hidden flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.35em] text-primary/70">
                            <span>Focus</span>
                            <span>02 / 03</span>
                        </div>
                        <h3 className="mobile-reveal lg:hidden text-[3rem] font-black font-montserrat uppercase leading-none tracking-normal text-base-content">
                            <GradientTitle text="What I Build" />
                        </h3>
                        <p className="mobile-reveal mobile-about-copy text-lg md:text-xl lg:text-2xl font-medium leading-relaxed max-w-3xl mx-auto text-base-content/80">
                            I specialize in building responsive, user-friendly web layouts using HTML, CSS, Bootstrap, and Tailwind CSS. Beyond the basics, I am actively working with JavaScript and modern frameworks like React and Next.js. Backed by foundational knowledge in server-side logic and databases, I enjoy bridging the gap between great design and solid technical functionality to build applications that solve real-world problems.
                        </p>
                        <div className="mobile-reveal pt-2 lg:pt-4">
                            <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg w-full lg:w-auto px-10 shadow-[0_10px_30px_rgba(var(--p),0.3)] hover:shadow-primary/50 transition-all duration-500">
                                <i className="fas fa-download mr-2"></i>Download My CV
                            </a>
                        </div>
                    </div>
                </div>

                {/* Panel 3: Education */}
                <div id="education-panel" className="story-panel w-screen shrink-0 h-full flex flex-col items-center justify-center px-5 md:px-10 lg:px-20 py-8 sm:py-14 lg:py-0 bg-base-300/30 overflow-hidden">
                    <div className="w-full max-w-6xl relative z-10">
                        <div className="mobile-reveal lg:hidden flex items-center justify-between mb-4 text-[10px] font-mono uppercase tracking-[0.35em] text-primary/70">
                            <span>Institution</span>
                            <span>03 / 03</span>
                        </div>
                        <h2 className="mobile-reveal text-[3rem] md:text-5xl lg:text-6xl font-black font-montserrat tracking-normal lg:tracking-[0.2em] uppercase text-base-content text-left lg:text-center leading-none">
                            <GradientTitle text="Education" />
                        </h2>
                        <div className="mobile-reveal w-full lg:w-16 h-px lg:h-1 bg-white/10 lg:bg-primary/40 lg:mx-auto mt-4 mb-6 md:mb-10 lg:mt-5 lg:mb-16 overflow-hidden shadow-[0_0_15px_rgba(var(--p),0.4)]">
                            <div className="mobile-line-fill h-full w-full bg-gradient-to-r from-primary via-secondary to-transparent lg:bg-primary/40"></div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
                            {[
                                { year: "2022 - 2026", degree: "BS Information Technology", school: "Benedicto College", address: "A.S. Fortuna, Mandaue City", color: "primary" },
                                { year: "2018 - 2020", degree: "Senior High School", school: "University of Cebu Lapu-Lapu", address: "Looc, A.C. Cortes Ave, Mandaue City", color: "accent" },
                                { year: "2016 - 2017", degree: "Junior High School", school: "Tingub National High School", address: "Tingub, Mandaue City", color: "secondary" },
                                { year: "2013 - 2014", degree: "Elementary School", school: "Cabancalan II Elementary School", address: "Cabancalan, Mandaue City", color: "info" }
                            ].map((edu, idx) => (
                                <div key={idx} className={`mobile-detail-pop mobile-education-row edu-card card bg-base-100/35 lg:bg-base-100 shadow-sm lg:shadow-xl border-l lg:border-l-0 border-t-0 lg:border-t-4 border-${edu.color} hover:-translate-y-1 lg:hover:-translate-y-2 transition-transform duration-500`}>
                                    <div className="card-body flex-row items-start gap-3 p-0 pl-4 pr-3 py-3 lg:block lg:p-6">
                                        <div className={`w-[5.25rem] shrink-0 text-${edu.color} font-bold text-xs lg:text-lg font-mono leading-tight tracking-tighter`}>{edu.year}</div>
                                        <div className="min-w-0 flex-1">
                                            <h4 className="font-black text-sm lg:text-[15px] uppercase leading-tight break-words">{edu.degree}</h4>
                                            <p className="text-xs lg:text-sm font-bold text-base-content/65 mt-1 lg:mt-3 leading-snug break-words">{edu.school}</p>
                                            <p className="text-[11px] lg:text-xs text-base-content/45 italic mt-0.5 lg:mt-1 leading-snug break-words">{edu.address}</p>
                                        </div>
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
