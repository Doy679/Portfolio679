'use client';
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLElement>(null);

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
            }
        });
        
    }, { scope: wrapperRef });

    return (
        <section id="about" className="overflow-hidden bg-base-200" ref={wrapperRef}>
            <div className="h-screen flex items-center" ref={containerRef} style={{ width: '300vw' }}>
                
                {/* Panel 1: About Me (Part 1) */}
                <div className="horizontal-panel w-screen flex flex-col items-center justify-center px-10 pt-32 md:pt-40">
                     <div className="text-center mb-10 w-full max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-montserrat text-white drop-shadow-xl tracking-tighter uppercase">About Me</h2>
                        <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-8"></div>
                        <p className="text-lg md:text-xl font-medium leading-relaxed max-w-3xl mx-auto text-slate-300">
                            As a recent Bachelor of Science in Information Technology (BSIT) graduate and an aspiring Junior Frontend Developer, I am driven by a curiosity for how digital experiences are crafted. My journey into coding began with a desire to understand the logic behind the tools we use every day, and I am now eager to apply my skills in a professional environment where I can continue to gain more learning and experience.
                        </p>
                        <div className="mt-12 flex flex-col items-center gap-4 animate-bounce opacity-50">
                            <span className="text-sm uppercase tracking-widest">Scroll to continue</span>
                            <i className="fas fa-arrow-right"></i>
                        </div>
                    </div>
                </div>

                {/* Panel 2: About Me (Part 2) */}
                <div className="horizontal-panel w-screen flex flex-col items-center justify-center px-10 pt-32 md:pt-40">
                     <div className="text-center mb-10 w-full max-w-4xl mx-auto">
                        <p className="text-lg md:text-xl font-medium leading-relaxed max-w-3xl mx-auto text-slate-300">
                            My technical foundation is built on core programming principles, including Object-Oriented Programming (OOP) and Data Structures. On the frontend, I focus on building responsive and functional layouts using HTML, CSS, Bootstrap, and Tailwind CSS. I also have foundational experience with server-side logic and database management through Node.js, Express.js, and MySQL, and I am familiar with using Git for version control.
                        </p>
                        <p className="text-lg md:text-xl font-medium leading-relaxed max-w-3xl mx-auto mt-6 text-slate-300">
                            I am a committed learner who values growth and precision. I view every project as an opportunity to sharpen my technical skills, follow modern web standards, and contribute to the development of reliable digital solutions. My goal is to work alongside experienced professionals to build impactful tools while evolving my expertise as a developer.
                        </p>
                        <div className="mt-12">
                            <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg shadow-lg shadow-primary/30">
                                <i className="fas fa-download mr-2"></i>Download My CV
                            </a>
                        </div>
                    </div>
                </div>

                {/* Panel 3: Education (Timeline) */}
                <div className="horizontal-panel w-screen flex flex-col items-center justify-center px-4 md:px-20 relative pt-32 md:pt-40">
                    <div className="w-full max-w-6xl">
                        <h3 className="text-5xl font-black mb-16 text-center font-montserrat tracking-tighter">Education</h3>
                        
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