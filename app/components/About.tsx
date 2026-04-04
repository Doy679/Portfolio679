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
            <div className="h-screen flex items-center" ref={containerRef} style={{ width: '200vw' }}>
                
                {/* Panel 1: About Me (Title) */}
                <div className="horizontal-panel w-screen flex flex-col items-center justify-center px-10">
                     <div className="text-center mb-10 w-full max-w-4xl mx-auto">
                        <h2 className="text-5xl md:text-7xl font-black mb-6 font-montserrat text-primary drop-shadow-xl tracking-tighter">My Journey</h2>
                        <div className="w-32 h-2 bg-primary mx-auto rounded-full mb-8"></div>
                        <p className="text-xl md:text-3xl font-medium leading-relaxed max-w-3xl mx-auto">
                            I am a passionate and committed technology professional focused on becoming an expert frontend developer.
                            Driven by a deep enthusiasm for creating effective, intuitive digital solutions.
                        </p>
                        <div className="mt-12">
                            <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg shadow-lg shadow-primary/30">
                                <i className="fas fa-download mr-2"></i>Download My CV
                            </a>
                        </div>
                    </div>
                </div>

                {/* Panel 2: Education (Timeline) */}
                <div className="horizontal-panel w-screen flex flex-col items-center justify-center px-4 md:px-20 relative">
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