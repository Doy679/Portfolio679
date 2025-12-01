'use client';
import React from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
    const skillsRef = React.useRef(null);

    useGSAP(() => {
        ScrollTrigger.batch('.skill-card', {
            onEnter: (elements) => {
                gsap.fromTo(elements,
                    { opacity: 0, y: 50, willChange: 'transform, opacity' },
                    { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', clearProps: 'all' }
                );
            },
            start: 'top 80%',
            once: true,
        });

        const logos = gsap.utils.toArray<HTMLElement>('.logo');
        logos.forEach(logo => {
            const tl = gsap.timeline({ paused: true, onReverseComplete: () => { gsap.set(logo, { clearProps: "all" }); } });

            tl.to(logo, {
                scale: 1.2,
                filter: 'drop-shadow(0 0 10px hsl(var(--p)))',
                duration: 0.3,
                ease: 'power2.out'
            });

            // Create a jiggle sub-timeline that repeats
            const jiggleSubTl = gsap.timeline({ repeat: -1, yoyo: true });
            jiggleSubTl.to(logo, { x: '+=2', y: '-=2', rotate: 2, duration: 0.1, ease: 'power1.inOut' })
                       .to(logo, { x: '-=4', y: '+=4', rotate: -4, duration: 0.1, ease: 'power1.inOut' })
                       .to(logo, { x: '+=2', y: '-=2', rotate: 2, duration: 0.1, ease: 'power1.inOut' });

            // Add the jiggle sub-timeline to the main timeline, starting immediately after the scale
            tl.add(jiggleSubTl, "-=0.1"); // Start jiggle 0.1s before the scale ends for a smoother transition

            logo.addEventListener('mouseenter', () => tl.play());
            logo.addEventListener('mouseleave', () => tl.reverse());
        });

    }, { scope: skillsRef });

    return (
        <section id="skills" className="py-20" ref={skillsRef}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">My Skills</h2>
                    <div className="w-20 h-1 bg-primary mx-auto"></div>
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
                                <div className="p-4 bg-base-200 rounded-full tooltip logo" data-tip="Angular">
                                    <i className="fab fa-angular text-3xl text-red-500"></i>
                                </div>
                                <div className="p-4 bg-base-200 rounded-full tooltip logo" data-tip="Node.js">
                                    <i className="fab fa-node-js text-3xl text-green-500"></i>
                                </div>
                                <div className="p-4 bg-base-200 rounded-full tooltip logo" data-tip="Express.js">
                                    <i className="fas fa-server text-3xl text-gray-500"></i>
                                </div>
                                <div className="p-4 bg-base-200 rounded-full tooltip logo" data-tip="MySQL">
                                    <i className="fas fa-database text-3xl text-blue-500"></i>
                                </div>
                                <div className="p-4 bg-base-200 rounded-full tooltip logo" data-tip="Git">
                                    <i className="fab fa-git-alt text-3xl text-orange-500"></i>
                                </div>
                                <div className="p-4 bg-base-200 rounded-full tooltip logo" data-tip="Linux">
                                    <i className="fab fa-linux text-3xl"></i>
                                </div>
                                <div className="p-4 bg-base-200 rounded-full tooltip logo" data-tip="Nginx">
                                    <i className="fas fa-server text-3xl text-green-500"></i>
                                </div>
                                <div className="p-4 bg-base-200 rounded-full tooltip logo" data-tip="Cloudflare">
                                    <i className="fas fa-cloud text-3xl text-orange-500"></i>
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
                </div>
            </div>
        </section>
    );
};

export default Skills;