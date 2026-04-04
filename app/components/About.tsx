'use client';
import React from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const aboutRef = React.useRef(null);

    useGSAP(() => {
        ScrollTrigger.batch('.about-card', {
            onEnter: (elements) => {
                gsap.fromTo(elements,
                    { opacity: 0, y: 50, willChange: 'transform, opacity' },
                    { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', clearProps: 'all' }
                );
            },
            start: 'top 80%',
            once: true,
        });
    }, { scope: aboutRef });

    return (
        <section id="about" className="py-20 bg-base-200" ref={aboutRef}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
                    <div className="w-20 h-1 bg-primary mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                    <div className="card bg-base-100 shadow-xl about-card glass-card">
                        <div className="card-body">
                            <h3 className="card-title text-2xl font-bold">My Journey</h3>
                            <p className="mt-4">
                                I am Rondether Gonzales, a passionate and committed technology professional focused on becoming an expert frontend developer.
                                Driven by a deep enthusiasm for creating effective, intuitive digital solutions, I approach every project with a strong willingness to learn new frameworks and methodologies.
                                My technical journey is defined by a commitment to building scalable user experiences and an eagerness to explore the latest advancements in web technologies,
                                ensuring continuous professional growth and the delivery of cutting-edge results.
                            </p>
                            <div className="mt-6">
                                <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                    <i className="fas fa-download mr-2"></i>Download My CV
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl about-card glass-card">
                        <div className="card-body text-left">
                            <div className="flex justify-center">
                                <h3 className="card-title text-2xl font-bold">Education</h3>
                            </div>
                            <ul className="timeline timeline-vertical mt-6">
                                <li>
                                    <div className="timeline-start text-lg font-semibold">2022 - 2026</div>
                                    <div className="timeline-middle">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-primary"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.75-4.25a.75.75 0 00-1.5 0V15c0 .414.336.75.75.75h2.5a.75.75 0 000-1.5h-1.75v-1.75zM10 4a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 4z" clipRule="evenodd" /></svg>
                                    </div>
                                    <div className="timeline-end timeline-box">
                                        <h4 className="font-bold text-lg">Bachelor of Science in Information Technology</h4>
                                        <p className="text-primary">A.S Fortuna, Mandaue City</p>
                                    </div>
                                    <hr />
                                </li>
                                <li>
                                    <hr />
                                    <div className="timeline-start text-lg font-semibold">2018–2020</div>
                                    <div className="timeline-middle">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-accent"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.75-4.25a.75.75 0 00-1.5 0V15c0 .414.336.75.75.75h2.5a.75.75 0 000-1.5h-1.75v-1.75zM10 4a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 4z" clipRule="evenodd" /></svg>
                                    </div>
                                    <div className="timeline-end timeline-box">
                                        <h4 className="font-bold text-lg">Senior High School</h4>
                                        <p className="text-primary">Looc A. C. Cortes Ave - Mandaue City</p>
                                    </div>
                                    <hr />
                                </li>
                                <li>
                                    <hr />
                                    <div className="timeline-start text-lg font-semibold">2016–2017</div>
                                    <div className="timeline-middle">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-secondary"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.75-4.25a.75.75 0 00-1.5 0V15c0 .414.336.75.75.75h2.5a.75.75 0 000-1.5h-1.75v-1.75zM10 4a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 4z" clipRule="evenodd" /></svg>
                                    </div>
                                    <div className="timeline-end timeline-box">
                                        <h4 className="font-bold text-lg">Junior High School</h4>
                                        <p className="text-primary">Tingub - Mandaue City</p>
                                    </div>
                                    <hr />
                                </li>
                                <li>
                                    <hr />
                                    <div className="timeline-start text-lg font-semibold">2013–2014</div>
                                    <div className="timeline-middle">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-accent"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.75-4.25a.75.75 0 00-1.5 0V15c0 .414.336.75.75.75h2.5a.75.75 0 000-1.5h-1.75v-1.75zM10 4a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 4z" clipRule="evenodd" /></svg>
                                    </div>
                                    <div className="timeline-end timeline-box">
                                        <h4 className="font-bold text-lg">Elementary School</h4>
                                        <p className="text-primary">Cabancalan II - Mandaue City</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;