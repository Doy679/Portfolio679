'use client';
import React, { useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HackerText from './HackerText';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
    const skillsRef = React.useRef(null);
    const [startScramble, setStartScramble] = useState(false);

    useGSAP(() => {
        // Scrubbed Parallax Effect - Subtler entry
        gsap.fromTo(skillsRef.current,
            { opacity: 0.2, y: 50 },
            {
                opacity: 1,
                y: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: skillsRef.current,
                    start: 'top bottom',
                    end: 'top 40%',
                    scrub: true,
                }
            }
        );

        ScrollTrigger.create({
            trigger: skillsRef.current,
            start: 'top 70%',
            onEnter: () => setStartScramble(true),
            onLeaveBack: () => setStartScramble(false),
            onEnterBack: () => setStartScramble(true)
        });

        ScrollTrigger.batch('.skill-card', {
            onEnter: (elements) => {
                gsap.fromTo(elements,
                    { opacity: 0, y: 30, willChange: 'transform, opacity' },
                    { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', clearProps: 'all' }
                );
            },
            start: 'top 85%',
            once: true,
        });

        const logos = gsap.utils.toArray<HTMLElement>('.logo');
        logos.forEach(logo => {
            // Randomize starting positions very slightly
            gsap.set(logo, {
                y: gsap.utils.random(-5, 5),
                x: gsap.utils.random(-5, 5),
                rotation: gsap.utils.random(-2, 2)
            });

            // Create a subtler continuous floating animation
            gsap.to(logo, {
                y: `+=${gsap.utils.random(5, 10)}`,
                x: `+=${gsap.utils.random(-5, 5)}`,
                rotation: `+=${gsap.utils.random(-3, 3)}`,
                duration: gsap.utils.random(3, 5),
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
                delay: gsap.utils.random(0, 2)
            });

            // Interactive hover effect
            const tl = gsap.timeline({ paused: true });

            // Dynamically get the color of the icon inside the logo
            const icon = logo.querySelector('i');
            const iconColor = icon ? window.getComputedStyle(icon).color : 'rgba(255, 191, 0, 0.8)';

            tl.to(logo, {
                scale: 1.3,
                filter: `drop-shadow(0 0 15px ${iconColor})`,
                zIndex: 10,
                duration: 0.3,
                ease: 'back.out(1.7)'
            });

            logo.addEventListener('mouseenter', () => tl.play());
            logo.addEventListener('mouseleave', () => tl.reverse());
        });

        // --- Tilt Effect for Skill Cards (Desktop Only) ---
        const isDesktop = window.innerWidth > 1024;
        if (isDesktop) {
            const cards = gsap.utils.toArray<HTMLElement>('.skill-card');
            cards.forEach((card) => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateX = (y - centerY) / 20;
                    const rotateY = (centerX - x) / 20;

                    gsap.to(card, {
                        rotateX: rotateX,
                        rotateY: rotateY,
                        scale: 1.02,
                        duration: 0.5,
                        ease: "power2.out",
                        perspective: 1000,
                        overwrite: true
                    });
                });

                card.addEventListener('mouseleave', () => {
                    gsap.to(card, {
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        duration: 0.5,
                        ease: "power2.out",
                        overwrite: true
                    });
                });
            });
        }

    }, { scope: skillsRef });

    return (
        <section id="skills" className="py-20" ref={skillsRef}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-2xl md:text-3xl font-bold font-montserrat tracking-[0.2em] uppercase text-base-content">
                        <HackerText text="My Skills" trigger={startScramble} />
                    </h2>
                    <div className="w-12 h-0.5 bg-primary/40 mx-auto mt-4 mb-8"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <div className="card bg-base-100 shadow-xl skill-card glass-card">
                        <div className="card-body items-center text-center">
                            <i className="fas fa-code text-4xl text-primary mb-4"></i>
                            <h3 className="card-title text-2xl font-bold">Programming Languages</h3>
                            <div className="flex flex-wrap justify-center gap-4 mt-4">
                                <div className="p-4 bg-base-200 rounded-full tooltip logo" data-tip="JavaScript/TypeScript">
                                    <i className="fab fa-js-square text-3xl text-yellow-400"></i>
                                </div>
                                <div className="p-4 bg-base-200 rounded-full tooltip logo" data-tip="Java">
                                    <i className="fab fa-java text-3xl text-red-500"></i>
                                </div>
                                <div className="p-4 bg-base-200 rounded-full tooltip logo" data-tip="C/C++">
                                    <i className="fas fa-file-code text-3xl text-blue-500"></i>
                                </div>
                                <div className="p-4 bg-base-200 rounded-full tooltip logo" data-tip="C#">
                                    <i className="fas fa-file-code text-3xl text-purple-500"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl skill-card glass-card">
                        <div className="card-body items-center text-center">
                            <i className="fas fa-layer-group text-4xl text-primary mb-4"></i>
                            <h3 className="card-title text-2xl font-bold">Technologies & Frameworks</h3>
                            <div className="flex flex-wrap justify-center gap-4 mt-4">
                                <div className="p-4 bg-base-200 rounded-full tooltip logo" data-tip="HTML/CSS">
                                    <i className="fab fa-html5 text-3xl text-orange-500"></i>
                                </div>
                                <div className="p-4 bg-base-200 rounded-full tooltip logo" data-tip="Bootstrap">
                                    <i className="fab fa-bootstrap text-3xl text-purple-500"></i>
                                </div>
                                <div className="p-4 bg-base-200 rounded-full tooltip logo" data-tip="GSAP">
                                    <i className="fas fa-wind text-3xl text-green-400"></i>
                                </div>
                                <div className="p-4 bg-base-200 rounded-full tooltip logo" data-tip="Next.js">
                                    <i className="fas fa-globe text-3xl"></i>
                                </div>
                                <div className="p-4 bg-base-200 rounded-full tooltip logo" data-tip="React">
                                    <i className="fab fa-react text-3xl text-blue-400"></i>
                                </div>
                                <div className="p-4 bg-base-200 rounded-full tooltip logo" data-tip="DaisyUI">
                                    <i className="fas fa-fill-drip text-3xl text-pink-400"></i>
                                </div>
                                <div className="p-4 bg-base-200 rounded-full tooltip logo" data-tip="Tailwind CSS">
                                    <i className="fab fa-css3-alt text-3xl text-blue-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl skill-card glass-card">
                        <div className="card-body items-center text-center">
                            <i className="fas fa-desktop text-4xl text-primary mb-4"></i>
                            <h3 className="card-title text-2xl font-bold">Operating Systems & Server Expertise</h3>
                            <div className="flex flex-wrap justify-center gap-4 mt-4">
                                <div className="p-4 bg-base-200 rounded-full tooltip logo" data-tip="Windows">
                                    <i className="fab fa-windows text-3xl text-blue-500"></i>
                                </div>
                                <div className="p-4 bg-base-200 rounded-full tooltip logo" data-tip="Linux">
                                    <i className="fab fa-linux text-3xl"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl skill-card glass-card">
                        <div className="card-body items-center text-center">
                            <i className="fas fa-tools text-4xl text-primary mb-4"></i>
                            <h3 className="card-title text-2xl font-bold">Supporting Tools</h3>
                            <div className="flex flex-wrap justify-center gap-4 mt-4">
                                <div className="p-4 bg-base-200 rounded-full tooltip logo" data-tip="Git">
                                    <i className="fab fa-git-alt text-3xl text-orange-500"></i>
                                </div>
                                <div className="p-4 bg-base-200 rounded-full tooltip logo" data-tip="Node.js">
                                    <i className="fab fa-node-js text-3xl text-green-500"></i>
                                </div>
                                <div className="p-4 bg-base-200 rounded-full tooltip logo" data-tip="Webpack">
                                    <i className="fas fa-cogs text-3xl text-blue-600"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl skill-card glass-card">
                        <div className="card-body items-center text-center">
                            <i className="fas fa-screwdriver-wrench text-4xl text-primary mb-4"></i>
                            <h3 className="card-title text-2xl font-bold">IT Support & Hardware</h3>
                            <div className="flex flex-wrap justify-center gap-4 mt-4">
                                <div className="p-4 bg-base-200 rounded-full tooltip logo" data-tip="Printer Network Sharing">
                                    <i className="fas fa-print text-3xl text-gray-400"></i>
                                </div>
                                <div className="p-4 bg-base-200 rounded-full tooltip logo" data-tip="Hardware & Software Repair">
                                    <i className="fas fa-microchip text-3xl text-green-400"></i>
                                </div>
                                <div className="p-4 bg-base-200 rounded-full tooltip logo" data-tip="Networking & LAN Routing">
                                    <i className="fas fa-network-wired text-3xl text-blue-400"></i>
                                </div>
                                <div className="p-4 bg-base-200 rounded-full tooltip logo" data-tip="Assemble/Disassemble PC">
                                    <i className="fas fa-desktop text-3xl text-indigo-400"></i>
                                </div>
                                <div className="p-4 bg-base-200 rounded-full tooltip logo" data-tip="Reformat & Install O.S.">
                                    <i className="fas fa-compact-disc text-3xl text-red-400"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;