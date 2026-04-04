'use client';
import React, { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HackerText from './HackerText';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLElement>(null);
    const [startAboutScramble, setStartAboutScramble] = useState(false);
    const [startEduScramble, setStartEduScramble] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useGSAP(() => {
        if (!containerRef.current || !wrapperRef.current || isMobile) return;

        const sections = gsap.utils.toArray('.horizontal-panel');
        const totalWidth = containerRef.current.scrollWidth - window.innerWidth;

        gsap.to(sections, {
            x: () => -totalWidth,
            ease: 'none',
            scrollTrigger: {
                trigger: wrapperRef.current,
                pin: true,
                start: 'top top',
                end: () => `+=${totalWidth}`,
                scrub: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    if (self.progress < 0.2) setStartAboutScramble(true);
                    if (self.progress > 0.75) {
                        setStartEduScramble(true);
                    } else if (self.progress < 0.6) {
                        setStartEduScramble(false);
                    }
                }
            }
        });
    }, [isMobile]);

    // Agile Mobile Animations
    useGSAP(() => {
        if (!isMobile) return;

        const panels = gsap.utils.toArray('.mobile-panel');
        panels.forEach((panel: any) => {
            gsap.fromTo(panel, 
                { opacity: 0, y: 30 },
                { 
                    opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
                    scrollTrigger: {
                        trigger: panel,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });

        ScrollTrigger.create({
            trigger: "#about-content-1",
            start: "top 80%",
            onEnter: () => setStartAboutScramble(true)
        });

        ScrollTrigger.create({
            trigger: ".edu-header-trigger",
            start: "top 80%",
            onEnter: () => setStartEduScramble(true)
        });
    }, [isMobile]);

    return (
        <section id="about" className="bg-base-200" ref={wrapperRef}>
            <div 
                className="flex flex-col lg:flex-row lg:h-screen items-center" 
                ref={containerRef} 
                style={{ width: isMobile ? '100%' : '300vw' }}
            >
                
                {/* Panel 1: About Me (Part 1) */}
                <div id="about-content-1" className="mobile-panel horizontal-panel w-full lg:w-screen min-h-fit lg:h-screen flex flex-col items-center justify-center px-6 md:px-10 py-20 lg:py-0">
                     <div className="text-center w-full max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold font-montserrat tracking-[0.2em] uppercase text-base-content">
                            <HackerText text="About Me" trigger={startAboutScramble} />
                        </h2>
                        <div className="w-16 h-1 bg-primary/40 mx-auto mt-4 mb-10"></div>
                        <p className="text-lg md:text-xl font-medium leading-relaxed max-w-3xl mx-auto text-base-content/80">
                            As a recent Bachelor of Science in Information Technology (BSIT) graduate and an aspiring Junior Frontend Developer, I am driven by a curiosity for how digital experiences are crafted. My journey into coding began with a desire to understand the logic behind the tools we use every day.
                        </p>
                    </div>
                </div>

                {/* Panel 2: About Me (Part 2) */}
                <div className="mobile-panel horizontal-panel w-full lg:w-screen min-h-fit lg:h-screen flex flex-col items-center justify-center px-6 md:px-10 py-20 lg:py-0 bg-base-300/30">
                     <div className="text-center w-full max-w-4xl mx-auto space-y-8">
                        <p className="text-lg md:text-xl font-medium leading-relaxed max-w-3xl mx-auto text-base-content/80">
                            On the frontend, I focus on building responsive and functional layouts using HTML, CSS, Bootstrap, and Tailwind CSS. I also have foundational experience with server-side logic and database management.
                        </p>
                        <div className="pt-4">
                            <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg px-10 shadow-xl shadow-primary/20">
                                <i className="fas fa-download mr-2"></i>Download My CV
                            </a>
                        </div>
                    </div>
                </div>

                {/* Panel 3: Education */}
                <div className="mobile-panel horizontal-panel w-full lg:w-screen min-h-fit lg:h-screen flex flex-col items-center justify-center px-4 md:px-20 py-20 lg:py-0">
                    <div className="w-full max-w-6xl">
                        <h2 className="text-3xl md:text-4xl font-bold font-montserrat tracking-[0.2em] uppercase text-base-content text-center edu-header-trigger">
                            <HackerText text="Education" trigger={startEduScramble} />
                        </h2>
                        <div className="w-16 h-1 bg-primary/40 mx-auto mt-4 mb-16"></div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="card bg-base-100 shadow-xl border-t-4 border-primary">
                                <div className="card-body p-6">
                                    <div className="text-primary font-bold text-lg">2022 - 2026</div>
                                    <h4 className="font-bold text-base mt-1">BS Information Technology</h4>
                                    <p className="text-sm text-base-content/60 mt-2">A.S Fortuna, Mandaue City</p>
                                </div>
                            </div>
                            {/* ... other cards simplified for brevity in this block but logic remains same ... */}
                            <div className="card bg-base-100 shadow-xl border-t-4 border-accent">
                                <div className="card-body p-6">
                                    <div className="text-accent font-bold text-lg">2018 - 2020</div>
                                    <h4 className="font-bold text-base mt-1">Senior High School</h4>
                                    <p className="text-sm text-base-content/60 mt-2">Looc A. C. Cortes Ave</p>
                                </div>
                            </div>
                            <div className="card bg-base-100 shadow-xl border-t-4 border-secondary">
                                <div className="card-body p-6">
                                    <div className="text-secondary font-bold text-lg">2016 - 2017</div>
                                    <h4 className="font-bold text-base mt-1">Junior High School</h4>
                                    <p className="text-sm text-base-content/60 mt-2">Tingub, Mandaue City</p>
                                </div>
                            </div>
                            <div className="card bg-base-100 shadow-xl border-t-4 border-info">
                                <div className="card-body p-6">
                                    <div className="text-info font-bold text-lg">2013 - 2014</div>
                                    <h4 className="font-bold text-base mt-1">Elementary School</h4>
                                    <p className="text-sm text-base-content/60 mt-2">Cabancalan II</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default About;