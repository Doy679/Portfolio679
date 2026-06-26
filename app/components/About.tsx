'use client';
import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
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
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const badgesRef = useRef<(HTMLSpanElement | null)[]>([]);
    const linesRef = useRef<(HTMLDivElement | null)[]>([]);
    const headingsRef = useRef<(HTMLSpanElement | null)[]>([]);
    const paragraphsRef = useRef<(HTMLParagraphElement | HTMLDivElement | null)[]>([]);

    const addToCards = (el: HTMLDivElement | null) => {
        if (el && !cardsRef.current.includes(el)) cardsRef.current.push(el);
    };

    const addToBadges = (el: HTMLSpanElement | null) => {
        if (el && !badgesRef.current.includes(el)) badgesRef.current.push(el);
    };

    const addToLines = (el: HTMLDivElement | null) => {
        if (el && !linesRef.current.includes(el)) linesRef.current.push(el);
    };

    const addToHeadings = (el: HTMLSpanElement | null) => {
        if (el && !headingsRef.current.includes(el)) headingsRef.current.push(el);
    };

    const addToParagraphs = (el: HTMLParagraphElement | HTMLDivElement | null) => {
        if (el && !paragraphsRef.current.includes(el)) paragraphsRef.current.push(el);
    };

    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add(
            {
                reduceMotion: '(prefers-reduced-motion: reduce)',
                allowMotion: '(prefers-reduced-motion: no-preference)'
            },
            (context) => {
                const { reduceMotion } = context.conditions as { reduceMotion: boolean };

                if (reduceMotion) {
                    gsap.set(cardsRef.current, { opacity: 1, y: 0, scale: 1 });
                    gsap.set(badgesRef.current, { opacity: 1, y: 0, scale: 1 });
                    gsap.set(linesRef.current, { scaleX: 1 });
                    gsap.set(headingsRef.current, { y: 0 });
                    gsap.set(paragraphsRef.current, { opacity: 1, y: 0 });
                    return;
                }

                // Initial states
                gsap.set(cardsRef.current, { opacity: 0, y: 50 });
                gsap.set(linesRef.current, { scaleX: 0, transformOrigin: 'left' });
                gsap.set(headingsRef.current, { y: '100%' });
                gsap.set(paragraphsRef.current, { opacity: 0, y: 30 });
                gsap.set(badgesRef.current, { opacity: 0, scale: 0 });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                        toggleActions: 'play none none none',
                    }
                });

                // Master Sequence
                tl.to(cardsRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    stagger: 0.15,
                    ease: 'power3.out',
                }, 0)
                .to(linesRef.current, {
                    scaleX: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.inOut',
                }, 0.2)
                .to(headingsRef.current, {
                    y: '0%',
                    duration: 1,
                    stagger: 0.05,
                    ease: 'power4.out',
                }, 0.3)
                .to(paragraphsRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.05,
                    ease: 'power2.out',
                }, 0.5)
                .to(badgesRef.current, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.05,
                    ease: 'back.out(1.5)',
                }, 0.6);
            }
        );

        return () => mm.revert();
    }, { scope: sectionRef });

    return (
        <section id="about" ref={sectionRef} className="bg-base-200 overflow-hidden relative py-24 sm:py-28 lg:py-32">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] top-10 left-10"></div>
                <div className="absolute w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] bottom-10 right-10"></div>
            </div>

            <div className="container mx-auto px-5 sm:px-6 md:px-10 lg:px-20 relative z-10">
                <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-6 lg:gap-8 items-start">
                    <div ref={addToCards} className="bg-base-100/50 backdrop-blur-md rounded-3xl border border-base-content/10 p-6 sm:p-8 lg:p-10">
                        <div className="flex items-center justify-between gap-4 mb-6 text-[10px] font-mono uppercase tracking-[0.32em] text-primary/75">
                            <span className="flex gap-2 overflow-hidden">
                                <span ref={addToHeadings} className="inline-block">
                                    <span className="text-primary font-bold">01</span> Profile
                                </span>
                            </span>
                        </div>

                        <h2 className="text-[3.1rem] sm:text-6xl lg:text-7xl font-black font-montserrat tracking-tight uppercase leading-[0.9] text-base-content">
                            <span className="overflow-hidden block">
                                <span ref={addToHeadings} className="inline-block">
                                    <HackerText text="About Me" className="text-base-content" />
                                </span>
                            </span>
                        </h2>

                        <div className="w-full h-px bg-base-content/10 my-7 overflow-hidden">
                            <div ref={addToLines} className="h-full w-2/3 bg-gradient-to-r from-primary via-secondary to-transparent"></div>
                        </div>

                        <p ref={addToParagraphs} className="text-lg sm:text-xl lg:text-2xl font-medium leading-relaxed text-base-content/80">
                            Hello, I&apos;m Rondether. I am an aspiring Junior Frontend Developer with a Bachelor of Science in Information Technology (BSIT) and a deep curiosity for crafting seamless digital experiences.
                        </p>

                        <div className="grid grid-cols-3 gap-3 mt-8">
                            {[
                                { value: "BSIT", label: "Foundation" },
                                { value: "UI", label: "Focus" },
                                { value: "Web", label: "Direction" }
                            ].map((item) => (
                                <div ref={addToParagraphs} key={item.label} className="rounded-2xl bg-base-content/[0.04] border border-base-content/10 p-3 text-center transition-all hover:bg-base-content/[0.08]">
                                    <div className="font-montserrat font-black text-lg text-primary">{item.value}</div>
                                    <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-base-content/45">{item.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div ref={addToCards} className="grid gap-6">
                        <div className="bg-base-100/50 backdrop-blur-md rounded-3xl border border-base-content/10 p-6 sm:p-8 lg:p-10">
                            <div className="flex items-center justify-between gap-4 mb-5 text-[10px] font-mono uppercase tracking-[0.32em] text-primary/75">
                                <span className="flex gap-2 overflow-hidden">
                                    <span ref={addToHeadings} className="inline-block">
                                        <span className="text-primary font-bold">02</span> Focus
                                    </span>
                                </span>
                            </div>

                            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black font-montserrat uppercase leading-none tracking-tight text-base-content">
                                <span className="overflow-hidden block">
                                    <span ref={addToHeadings} className="inline-block">
                                        <HackerText text="What I Build" className="text-base-content" />
                                    </span>
                                </span>
                            </h3>

                            <div className="w-full h-px bg-base-content/10 my-6 overflow-hidden">
                                <div ref={addToLines} className="h-full w-full bg-gradient-to-r from-primary via-transparent to-transparent"></div>
                            </div>

                            <p ref={addToParagraphs} className="text-base sm:text-lg leading-relaxed text-base-content/75">
                                I specialize in building responsive, user-friendly web layouts using HTML, CSS, Bootstrap, and Tailwind CSS. Beyond the basics, I am actively working with JavaScript and modern frameworks like React and Next.js.
                            </p>

                            <div className="flex flex-wrap gap-2 mt-6">
                                {focusTags.map((tag) => (
                                    <span ref={addToBadges} key={tag} className="text-[10px] sm:text-xs uppercase font-bold tracking-[0.14em] text-primary/85 bg-primary/10 px-3 py-2 rounded-xl border border-primary/15 transition-all hover:bg-primary/20 cursor-default">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="bg-primary/5 rounded-3xl border border-primary/10 p-6 sm:p-8">
                            <div className="overflow-hidden pb-1">
                                <span ref={addToHeadings} className="inline-block text-[10px] font-mono uppercase tracking-[0.32em] text-primary/75">Approach</span>
                            </div>
                            <p ref={addToParagraphs} className="mt-3 text-base sm:text-lg leading-relaxed text-base-content/75">
                                Backed by foundational knowledge in server-side logic and databases, I enjoy bridging great design with solid technical functionality to build applications that solve real-world problems.
                            </p>

                            <div ref={addToParagraphs}>
                                <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg w-full sm:w-auto px-8 shadow-[0_10px_30px_rgba(var(--p),0.3)] hover:shadow-primary/50 mt-6 transition-all duration-300">
                                    <i className="fas fa-download mr-2"></i>Download My CV
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="education-panel" className="mt-16 sm:mt-20 lg:mt-24">
                    <div ref={addToCards} className="bg-base-100/50 backdrop-blur-md rounded-3xl border border-base-content/10 p-6 sm:p-8 lg:p-10">
                        <div className="max-w-3xl">
                            <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.32em] text-primary/75 overflow-hidden">
                                <span ref={addToHeadings} className="inline-flex items-center w-full gap-4">
                                    <span>Institution</span>
                                    <div ref={addToLines} className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent"></div>
                                    <span className="text-primary font-bold">03</span>
                                </span>
                            </div>

                            <h2 className="mt-5 text-[2.8rem] sm:text-5xl lg:text-6xl font-black font-montserrat tracking-tight uppercase text-base-content leading-none">
                                <span className="overflow-hidden block">
                                    <span ref={addToHeadings} className="inline-block">
                                        <HackerText text="Education" className="text-base-content" />
                                    </span>
                                </span>
                            </h2>

                            <p ref={addToParagraphs} className="mt-5 text-base sm:text-lg text-base-content/65 leading-relaxed">
                                A clear academic path that supports my technical foundation, problem-solving mindset, and continuous growth as a frontend developer.
                            </p>
                        </div>

                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
                            {educationItems.map((edu) => {
                                const colorClasses = educationColorClasses[edu.color];

                                return (
                                    <article ref={addToParagraphs} key={edu.school} className={`bg-base-content/5 rounded-2xl p-5 sm:p-6 border-l-2 lg:border-l lg:border-t-4 ${colorClasses.border} transition-transform hover:-translate-y-2 duration-300`}>
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
