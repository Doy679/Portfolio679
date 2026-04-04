'use client';
import React, { useRef, useState } from 'react';
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

    useGSAP(() => {
        if (!containerRef.current || !wrapperRef.current) return;

        const sections = gsap.utils.toArray('.horizontal-panel');
        
        // Calculate the total width to scroll horizontally
        const totalWidth = containerRef.current.scrollWidth - window.innerWidth;

        gsap.to(sections, {
            x: () => -totalWidth, // Move left by the total hidden width
            ease: 'none',
            scrollTrigger: {
                trigger: wrapperRef.current,
                pin: true, // Pin the wrapper to the screen
                start: 'top top',
                end: () => `+=${totalWidth}`, // Scroll distance equals the width of the content
                scrub: 1, // Smooth scrubbing
                invalidateOnRefresh: true, // Recalculate on resize
                onUpdate: (self) => {
                    // Panel 1: Progress near 0
                    if (self.progress < 0.2) {
                        setStartAboutScramble(true);
                    } else if (self.progress > 0.3 && self.progress < 0.7) {
                        // Reset when moving away if you want it to re-scramble
                        // But usually just setting them based on position
                    }

                    // Panel 3: Progress near 0.8 to 1.0
                    if (self.progress > 0.75) {
                        setStartEduScramble(true);
                    } else if (self.progress < 0.6) {
                        setStartEduScramble(false);
                    }
                }
            }
        });

        // Initial trigger for the first panel
        ScrollTrigger.create({
            trigger: wrapperRef.current,
            start: 'top 50%',
            onEnter: () => setStartAboutScramble(true),
            onLeaveBack: () => setStartAboutScramble(false),
            onEnterBack: () => setStartAboutScramble(true)
        });
        
    }, { scope: wrapperRef });

    return (
        <section id="about" className="overflow-hidden bg-base-200" ref={wrapperRef}>
            <div className="h-screen flex items-center" ref={containerRef} style={{ width: '300vw' }}>
                
                {/* Panel 1: About Me (Part 1) */}
                <div className="horizontal-panel w-screen flex flex-col items-center justify-center px-6 md:px-10 pt-24 md:pt-28">
                     <div className="text-center mb-8 w-full max-w-4xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold font-montserrat tracking-[0.2em] uppercase text-base-content">
                            <HackerText text="About Me" trigger={startAboutScramble} />
                        </h2>
                        <div className="w-12 h-0.5 bg-primary/40 mx-auto mt-4 mb-8"></div>
                        <p className="text-base md:text-lg font-medium leading-relaxed max-w-3xl mx-auto text-base-content/70">
                            As a recent Bachelor of Science in Information Technology (BSIT) graduate and an aspiring Junior Frontend Developer, I am driven by a curiosity for how digital experiences are crafted. My journey into coding began with a desire to understand the logic behind the tools we use every day, and I am now eager to apply my skills in a professional environment.
                        </p>
                        <div className="mt-8 flex flex-col items-center gap-4 animate-bounce opacity-50 text-base-content">
                            <span className="text-sm uppercase tracking-widest">Scroll to continue</span>
                            <i className="fas fa-arrow-right"></i>
                        </div>
                    </div>
                </div>

                {/* Panel 2: About Me (Part 2) */}
                <div className="horizontal-panel w-screen flex flex-col items-center justify-center px-6 md:px-10 pt-24 md:pt-28">
                     <div className="text-center mb-6 w-full max-w-4xl mx-auto space-y-4 md:space-y-6">
                        <p className="text-base md:text-xl font-medium leading-relaxed max-w-3xl mx-auto text-base-content/80">
                            My technical foundation is built on core programming principles, including Object-Oriented Programming (OOP) and Data Structures.
                        </p>
                        <p className="text-base md:text-xl font-medium leading-relaxed max-w-3xl mx-auto text-base-content/80">
                            On the frontend, I focus on building responsive and functional layouts using HTML, CSS, Bootstrap, and Tailwind CSS. I also have foundational experience with server-side logic and database management through Node.js, Express.js, and MySQL.
                        </p>
                        <p className="text-base md:text-xl font-medium leading-relaxed max-w-3xl mx-auto text-base-content/80">
                            I am a committed learner who values growth and precision. I view every project as an opportunity to sharpen my technical skills and contribute to the development of reliable digital solutions.
                        </p>
                        <div className="mt-6 md:mt-8">
                            <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-md md:btn-lg shadow-lg shadow-primary/30">
                                <i className="fas fa-download mr-2"></i>Download My CV
                            </a>
                        </div>
                    </div>
                </div>

                {/* Panel 3: Education (Timeline) */}
                <div className="horizontal-panel w-screen flex flex-col items-center justify-center px-4 md:px-20 relative pt-24 md:pt-28">
                    <div className="w-full max-w-6xl">
                        <h2 className="text-2xl md:text-3xl font-bold font-montserrat tracking-[0.2em] uppercase text-base-content text-center">
                            <HackerText text="Education" trigger={startEduScramble} />
                        </h2>
                        <div className="w-12 h-0.5 bg-primary/40 mx-auto mt-4 mb-12 md:mb-16"></div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                             {/* College */}
                            <div className="card bg-base-100 shadow-2xl border-t-4 border-primary hover:-translate-y-4 transition-transform duration-300">
                                <div className="card-body">
                                    <div className="text-primary font-bold text-xl mb-2">2022 - 2026</div>
                                    <h4 className="font-bold text-lg mb-2">BS Information Technology</h4>
                                    <p className="text-base-content/70">A.S Fortuna, Mandaue City</p>
                                </div>
                            </div>
                            
                            {/* SHS */}
                            <div className="card bg-base-100 shadow-2xl border-t-4 border-accent hover:-translate-y-4 transition-transform duration-300">
                                <div className="card-body">
                                    <div className="text-accent font-bold text-xl mb-2">2018 - 2020</div>
                                    <h4 className="font-bold text-lg mb-2">Senior High School</h4>
                                    <p className="text-base-content/70">Looc A. C. Cortes Ave</p>
                                </div>
                            </div>

                            {/* JHS */}
                            <div className="card bg-base-100 shadow-2xl border-t-4 border-secondary hover:-translate-y-4 transition-transform duration-300">
                                <div className="card-body">
                                    <div className="text-secondary font-bold text-xl mb-2">2016 - 2017</div>
                                    <h4 className="font-bold text-lg mb-2">Junior High School</h4>
                                    <p className="text-base-content/70">Tingub, Mandaue City</p>
                                </div>
                            </div>

                            {/* Elementary */}
                            <div className="card bg-base-100 shadow-2xl border-t-4 border-info hover:-translate-y-4 transition-transform duration-300">
                                <div className="card-body">
                                    <div className="text-info font-bold text-xl mb-2">2013 - 2014</div>
                                    <h4 className="font-bold text-lg mb-2">Elementary School</h4>
                                    <p className="text-base-content/70">Cabancalan II</p>
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