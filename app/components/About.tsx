'use client';
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HackerText from './HackerText';

gsap.registerPlugin(ScrollTrigger);

const educationItems = [
    { year: "2022 - 2026", degree: "BS Information Technology", school: "Benedicto College", address: "A.S. Fortuna, Mandaue City", color: "primary" },
    { year: "2018 - 2020", degree: "Senior High School", school: "University of Cebu Lapu-Lapu", address: "Looc, A.C. Cortes Ave, Mandaue City", color: "accent" },
    { year: "2016 - 2017", degree: "Junior High School", school: "Tingub National High School", address: "Tingub, Mandaue City", color: "secondary" },
    { year: "2013 - 2014", degree: "Elementary School", school: "Cabancalan II Elementary School", address: "Cabancalan, Mandaue City", color: "info" }
] as const;

const educationColorClasses = {
    primary: { border: "border-primary", text: "text-primary" },
    accent: { border: "border-accent", text: "text-accent" },
    secondary: { border: "border-secondary", text: "text-secondary" },
    info: { border: "border-info", text: "text-info" }
} as const;

const focusTags = ["Responsive UI", "React", "Next.js", "Tailwind CSS", "JavaScript", "Database Basics"];

const About = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

        if (prefersReducedMotion) {
            gsap.set('.about-animate, .about-education-card', { autoAlpha: 1, clearProps: 'all' });
            return;
        }

        if (!sectionRef.current) return;

        const introItems = gsap.utils.toArray<HTMLElement>('.about-animate');
        const educationCards = gsap.utils.toArray<HTMLElement>('.about-education-card');

        introItems.forEach((item, index) => {
            gsap.fromTo(item,
                {
                    autoAlpha: 0,
                    y: 36,
                    filter: 'blur(12px)'
                },
                {
                    autoAlpha: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    duration: 0.9,
                    delay: (index % 3) * 0.06,
                    ease: 'expo.out',
                    clearProps: 'transform,filter',
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 84%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });

        educationCards.forEach((card, index) => {
            gsap.fromTo(card,
                {
                    autoAlpha: 0,
                    y: 34,
                    scale: 0.97
                },
                {
                    autoAlpha: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.72,
                    delay: (index % 4) * 0.06,
                    ease: 'power3.out',
                    clearProps: 'transform',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 86%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });

        gsap.to('.about-bg-word', {
            xPercent: -8,
            ease: 'none',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });

        gsap.to('.about-orb-one', {
            y: 90,
            x: -40,
            ease: 'none',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });

        gsap.to('.about-orb-two', {
            y: -110,
            x: 55,
            ease: 'none',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    }, { scope: sectionRef });

    return (
        <section id="about" className="about-section bg-base-200 overflow-hidden relative py-24 sm:py-28 lg:py-32" ref={sectionRef}>
            <div className="about-depth-layer absolute inset-0 pointer-events-none overflow-hidden">
                <div className="about-orb about-orb-one"></div>
                <div className="about-orb about-orb-two"></div>
            </div>

            <div className="hidden lg:block absolute top-24 left-0 whitespace-nowrap pointer-events-none z-0 select-none">
                <span className="about-bg-word font-black text-[8vw] text-primary/[0.025] font-montserrat tracking-tighter leading-none uppercase inline-block">
                    About Me & Education &nbsp; About Me & Education &nbsp; About Me & Education
                </span>
            </div>

            <div className="container mx-auto px-5 sm:px-6 md:px-10 lg:px-20 relative z-10">
                <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-6 lg:gap-8 items-start">
                    <div className="about-animate about-card about-equal-card about-profile-card p-6 sm:p-8 lg:p-10">
                        <div className="flex items-center justify-between gap-4 mb-6 text-[10px] font-mono uppercase tracking-[0.32em] text-primary/75">
                            <span>Profile</span>
                            <span>01</span>
                        </div>

                        <h2 className="text-[3.1rem] sm:text-6xl lg:text-7xl font-black font-montserrat tracking-tight uppercase leading-[0.9] text-base-content">
                            <HackerText text="About Me" />
                        </h2>

                        <div className="w-full h-px bg-white/10 my-7 overflow-hidden">
                            <div className="h-full w-2/3 bg-gradient-to-r from-primary via-secondary to-transparent"></div>
                        </div>

                        <p className="about-copy text-lg sm:text-xl lg:text-2xl font-medium leading-relaxed text-base-content/80">
                            Hello, I&apos;m Rondether. I am an aspiring Junior Frontend Developer with a Bachelor of Science in Information Technology (BSIT) and a deep curiosity for crafting seamless digital experiences.
                        </p>

                        <div className="grid grid-cols-3 gap-3 mt-8">
                            {[
                                { value: "BSIT", label: "Foundation" },
                                { value: "UI", label: "Focus" },
                                { value: "Web", label: "Direction" }
                            ].map((item) => (
                                <div key={item.label} className="rounded-2xl bg-white/[0.04] border border-white/10 p-3 text-center">
                                    <div className="font-montserrat font-black text-lg text-primary">{item.value}</div>
                                    <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-base-content/45">{item.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-6">
                        <div className="about-animate about-card about-equal-card p-6 sm:p-8 lg:p-10">
                            <div className="flex items-center justify-between gap-4 mb-5 text-[10px] font-mono uppercase tracking-[0.32em] text-primary/75">
                                <span>Focus</span>
                                <span>02</span>
                            </div>

                            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black font-montserrat uppercase leading-none tracking-tight text-base-content">
                                <HackerText text="What I Build" />
                            </h3>

                            <p className="about-copy mt-6 text-base sm:text-lg leading-relaxed text-base-content/75">
                                I specialize in building responsive, user-friendly web layouts using HTML, CSS, Bootstrap, and Tailwind CSS. Beyond the basics, I am actively working with JavaScript and modern frameworks like React and Next.js.
                            </p>

                            <div className="flex flex-wrap gap-2 mt-6">
                                {focusTags.map((tag) => (
                                    <span key={tag} className="text-[10px] sm:text-xs uppercase font-bold tracking-[0.14em] text-primary/85 bg-primary/10 px-3 py-2 rounded-xl border border-primary/15">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="about-animate about-card about-cta-card p-6 sm:p-8">
                            <div>
                                <p className="text-[10px] font-mono uppercase tracking-[0.32em] text-primary/75">Approach</p>
                                <p className="mt-3 text-base sm:text-lg leading-relaxed text-base-content/75">
                                    Backed by foundational knowledge in server-side logic and databases, I enjoy bridging great design with solid technical functionality to build applications that solve real-world problems.
                                </p>
                            </div>

                            <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg w-full sm:w-auto px-8 shadow-[0_10px_30px_rgba(var(--p),0.3)] hover:shadow-primary/50 transition-all duration-500">
                                <i className="fas fa-download mr-2"></i>Download My CV
                            </a>
                        </div>
                    </div>
                </div>

                <div id="education-panel" className="mt-16 sm:mt-20 lg:mt-24">
                    <div className="about-animate about-card about-equal-card about-education-panel p-6 sm:p-8 lg:p-10">
                        <div className="max-w-3xl">
                            <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.32em] text-primary/75">
                                <span>Institution</span>
                                <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent"></div>
                                <span>03</span>
                            </div>

                            <h2 className="mt-5 text-[2.8rem] sm:text-5xl lg:text-6xl font-black font-montserrat tracking-tight uppercase text-base-content leading-none">
                                <HackerText text="Education" />
                            </h2>

                            <p className="mt-5 text-base sm:text-lg text-base-content/65 leading-relaxed">
                                A clear academic path that supports my technical foundation, problem-solving mindset, and continuous growth as a frontend developer.
                            </p>
                        </div>

                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
                            {educationItems.map((edu) => {
                                const colorClasses = educationColorClasses[edu.color];

                                return (
                                    <article key={edu.school} className={`about-education-card about-card p-5 sm:p-6 border-l-2 lg:border-l lg:border-t-4 ${colorClasses.border}`}>
                                        <div className="flex items-start justify-between gap-4">
                                            <span className={`font-mono font-black text-sm sm:text-base ${colorClasses.text}`}>{edu.year}</span>
                                        </div>

                                        <h3 className="mt-6 font-black text-lg lg:text-xl uppercase leading-tight text-base-content">{edu.degree}</h3>
                                        <p className="mt-3 text-sm font-bold text-base-content/70 leading-snug">{edu.school}</p>
                                        <p className="mt-2 text-xs text-base-content/45 italic leading-relaxed">{edu.address}</p>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
