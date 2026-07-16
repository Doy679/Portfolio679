'use client';
import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import HackerText from './HackerText';
import { Icon } from '../lib/icons';
import { Magnetic } from './Magnetic';

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

interface GitHubData {
    avatar_url: string;
    name: string;
    login: string;
    public_repos: number;
    followers: number;
    following: number;
    html_url: string;
    bio: string;
}

const GitHubShowcase = () => {
    const [data, setData] = useState<GitHubData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGitHubData = async () => {
            try {
                const res = await fetch('https://api.github.com/users/Doy679');
                if (res.ok) {
                    const json = await res.json();
                    setData(json);
                }
            } catch (err) {
                console.error("Error fetching GitHub data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchGitHubData();
    }, []);

    const profile = data || {
        avatar_url: "https://avatars.githubusercontent.com/u/150030588?v=4",
        name: "Rondether Gonzales",
        login: "Doy679",
        public_repos: 25,
        followers: 76,
        following: 11,
        html_url: "https://github.com/Doy679",
        bio: "Focused on building responsive, visually engaging web applications with clean code, modern frameworks, and smooth user experiences."
    };

    return (
        <div className="bg-base-100/50 backdrop-blur-md rounded-3xl border border-base-content/10 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden group hover:border-primary/30 transition-all duration-500">
            {/* Animated Glow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

            {/* Profile Image with Ring */}
            <div className="relative shrink-0 w-20 h-20 rounded-full border-2 border-primary/20 p-1 group-hover:border-primary/50 transition-colors duration-500">
                {loading ? (
                    <div className="w-full h-full rounded-full bg-base-300 animate-pulse"></div>
                ) : (
                    <img 
                        src={profile.avatar_url} 
                        alt="GitHub Avatar" 
                        className="w-full h-full rounded-full object-cover shadow-lg"
                        onError={(e) => {
                            e.currentTarget.src = "https://avatars.githubusercontent.com/u/150030588?v=4";
                        }}
                    />
                )}
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-success border-2 border-base-100 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
            </div>

            {/* Content Details */}
            <div className="flex-1 min-w-0 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 mb-1.5">
                    <h3 className="font-montserrat font-black text-xl tracking-tight text-base-content truncate">
                        {loading ? "GitHub Showcase" : profile.name || profile.login}
                    </h3>
                    <span className="text-[9px] font-mono font-bold tracking-widest text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded uppercase">
                        @{profile.login}
                    </span>
                </div>
                
                <p className="text-xs text-base-content/60 font-medium mb-4 line-clamp-2 max-w-xl">
                    {loading ? "Loading stats..." : profile.bio || "Active Frontend Developer Contributions"}
                </p>

                {/* Stats Dashboard */}
                <div className="grid grid-cols-3 gap-2.5 max-w-[340px] mx-auto sm:mx-0">
                    <div className="bg-base-content/[0.03] border border-base-content/5 rounded-xl p-2 sm:p-2.5 text-center sm:text-left">
                        <div className="font-montserrat font-extrabold text-[13px] sm:text-sm text-base-content">
                            {loading ? "..." : `${Math.max(25, profile.public_repos)} Repos`}
                        </div>
                        <div className="text-[8px] uppercase font-bold tracking-wider text-base-content/40 mt-0.5">Repositories</div>
                    </div>
                    <div className="bg-base-content/[0.03] border border-base-content/5 rounded-xl p-2 sm:p-2.5 text-center sm:text-left">
                        <div className="font-montserrat font-extrabold text-[13px] sm:text-sm text-base-content">
                            {loading ? "..." : `${Math.max(76, profile.followers)} Followers`}
                        </div>
                        <div className="text-[8px] uppercase font-bold tracking-wider text-base-content/40 mt-0.5">Followers</div>
                    </div>
                    <div className="bg-base-content/[0.03] border border-base-content/5 rounded-xl p-2 sm:p-2.5 text-center sm:text-left">
                        <div className="font-montserrat font-extrabold text-[13px] sm:text-sm text-base-content">
                            {loading ? "..." : `${Math.max(11, profile.following)} Following`}
                        </div>
                        <div className="text-[8px] uppercase font-bold tracking-wider text-base-content/40 mt-0.5">Following</div>
                    </div>
                </div>
            </div>

            {/* Launch Link */}
            <div className="sm:self-end">
                <Magnetic strength={0.3}>
                    <a 
                        href={profile.html_url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn btn-circle btn-primary btn-sm btn-outline border-primary/25 hover:scale-105 transition-all shadow-md"
                        aria-label="GitHub Profile"
                    >
                        <Icon name="fab fa-github" className="text-sm" />
                    </a>
                </Magnetic>
            </div>
        </div>
    );
};

const focusTags = ["Responsive UI", "React", "Next.js", "Tailwind CSS", "JavaScript", "Database Basics"];

const faqItems = [
    {
        question: "What is your primary development stack?",
        answer: "I specialize in building responsive and interactive web applications using React, Next.js, and TypeScript, styled with Tailwind CSS and DaisyUI. I also have database and backend basics using Node.js and Supabase."
    },
    {
        question: "Are you open to full-time roles or freelance work?",
        answer: "Yes, absolutely! I am actively looking for Junior Frontend Developer positions, long-term roles, and freelance projects to contribute my skills and grow technically."
    },
    {
        question: "How do you optimize website performance and animation smoothness?",
        answer: "I combine Next.js image optimization (.webp formats), lightweight component structures, and GSAP with Lenis for smooth scrolling. This ensures animations run at a high frame rate without stuttering."
    },
    {
        question: "Do you design interfaces from scratch or use pre-made layouts?",
        answer: "I build custom, tailored interfaces based on project-specific goals and target audiences, prioritizing clean mobile-first responsiveness and high visual aesthetics."
    },
    {
        question: "What are your long-term career aspirations?",
        answer: "My goal is to transition into a Full-Stack developer role, specializing in cloud deployments (Vercel/Netlify), API architectures, and creative front-end interactions."
    }
] as const;

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
                    gsap.set('.education-timeline-line', { scaleY: 1 });
                    gsap.set('.education-item', { opacity: 1, x: 0 });
                    gsap.set('.faq-item', { opacity: 1, y: 0 });
                    return;
                }

                // Initial states
                gsap.set(cardsRef.current, { opacity: 0, y: 50 });
                gsap.set(linesRef.current, { scaleX: 0, transformOrigin: 'left' });
                gsap.set(headingsRef.current, { y: '100%' });
                gsap.set(paragraphsRef.current, { opacity: 0, y: 30 });
                gsap.set(badgesRef.current, { opacity: 0, scale: 0 });
                gsap.set('.education-timeline-line', { scaleY: 0 });
                gsap.set('.education-item', { opacity: 0, x: 30 });
                gsap.set('.faq-item', { opacity: 0, y: 30 });

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

                // Education timeline path drawing & staggered fade-in slide-left
                const eduTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: '#education-panel',
                        start: 'top 75%',
                        toggleActions: 'play none none none',
                    }
                });

                eduTl.to('.education-timeline-line', {
                    scaleY: 1,
                    duration: 1.2,
                    ease: 'power2.inOut',
                })
                .to('.education-item', {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power3.out',
                }, 0.3);

                // FAQ Accordion fade-in trigger
                const faqTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: '#faq-panel',
                        start: 'top 78%',
                        toggleActions: 'play none none none',
                    }
                });

                faqTl.fromTo('.faq-item',
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        stagger: 0.12,
                        ease: 'power3.out'
                    }
                );
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
                    <div className="flex flex-col gap-6">
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

                        <div ref={addToCards}>
                            <GitHubShowcase />
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
                                    <span ref={addToBadges} key={tag} className="text-[10px] sm:text-xs uppercase font-bold tracking-[0.14em] text-primary/85 bg-primary/10 px-3 py-2 rounded-xl border border-primary/15 transition-all hover:bg-primary/20 hover:-translate-y-0.5 hover:scale-105 hover:border-primary/40 cursor-default">
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
                                <Magnetic className="w-full sm:w-auto mt-6">
                                    <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg w-full sm:w-auto px-8 shadow-[0_10px_30px_rgba(var(--p),0.3)] hover:shadow-primary/50 transition-all duration-300">
                                        <Icon name="fa-download" className="mr-2" />Download My CV
                                    </a>
                                </Magnetic>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="education-panel" className="mt-16 sm:mt-20 lg:mt-24">
                    <div ref={addToCards} className="bg-base-100/50 backdrop-blur-md rounded-3xl border border-base-content/10 p-6 sm:p-8 lg:p-12">
                        <div className="max-w-3xl mb-12">
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

                        {/* Professional Timeline Layout (No boxes, clean vertical line and layout) */}
                        <div className="relative border-l-2 border-base-content/10 ml-4 md:ml-32 pl-8 md:pl-12 space-y-12 py-4">
                            {/* Animated line that draws on scroll */}
                            <div 
                                className="absolute top-0 bottom-0 left-[-2px] w-0.5 bg-gradient-to-b from-primary via-secondary to-accent origin-top scale-y-0 education-timeline-line"
                                style={{ transformOrigin: 'top' }}
                            ></div>

                            {educationItems.map((edu) => {
                                return (
                                    <div key={edu.school} className="relative education-item group">
                                        {/* Glowing Circle Node */}
                                        <div className="absolute left-[-41px] md:left-[-57px] top-1.5 w-4 h-4 rounded-full bg-base-100 border-2 border-primary group-hover:border-secondary transition-all duration-300 flex items-center justify-center z-10 shadow-lg group-hover:shadow-primary/50 group-hover:scale-125">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary group-hover:bg-secondary transition-colors duration-300"></div>
                                        </div>

                                        {/* Year Badge displayed on the left on Desktop */}
                                        <div className="md:absolute md:left-[-192px] md:top-1.5 md:w-32 md:text-right mb-2 md:mb-0">
                                            <span className="font-mono font-black text-sm uppercase tracking-wider text-primary group-hover:text-secondary transition-colors duration-300">
                                                {edu.year}
                                            </span>
                                        </div>

                                        {/* Education details */}
                                        <div className="max-w-2xl">
                                            <h3 className="font-black text-xl sm:text-2xl uppercase leading-tight text-base-content group-hover:text-primary transition-colors duration-300">
                                                {edu.degree}
                                            </h3>
                                            <p className="mt-2 text-sm sm:text-base font-bold text-base-content/85 leading-snug">
                                                {edu.school}
                                            </p>
                                            <p className="mt-1 text-xs sm:text-sm text-base-content/50 italic leading-relaxed flex items-center gap-1.5">
                                                <Icon name="fa-location-dot" className="text-primary/70 group-hover:text-secondary transition-colors duration-300" /> 
                                                {edu.address}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div id="faq-panel" className="mt-16 sm:mt-20 lg:mt-24">
                    <div ref={addToCards} className="bg-base-100/50 backdrop-blur-md rounded-3xl border border-base-content/10 p-6 sm:p-8 lg:p-12">
                        <div className="max-w-3xl mb-12">
                            <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.32em] text-primary/75 overflow-hidden">
                                <span ref={addToHeadings} className="inline-flex items-center w-full gap-4">
                                    <span>Common Queries</span>
                                    <div ref={addToLines} className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent"></div>
                                    <span className="text-primary font-bold">04</span>
                                </span>
                            </div>

                            <h2 className="mt-5 text-[2.8rem] sm:text-5xl lg:text-6xl font-black font-montserrat tracking-tight uppercase text-base-content leading-none">
                                <span className="overflow-hidden block">
                                    <span ref={addToHeadings} className="inline-block">
                                        <HackerText text="FAQ" className="text-base-content" />
                                    </span>
                                </span>
                            </h2>
                        </div>

                        {/* Accordion Layout */}
                        <div className="space-y-4 max-w-4xl">
                            {faqItems.map((item, index) => (
                                <div 
                                    key={index}
                                    className="faq-item collapse collapse-plus bg-base-content/5 border border-base-content/10 rounded-2xl transition-all duration-300 hover:border-primary/30 hover:bg-base-content/[0.07] overflow-hidden"
                                >
                                    <input type="radio" name="faq-accordion" defaultChecked={index === 0} />
                                    <div className="collapse-title text-base sm:text-lg lg:text-xl font-bold uppercase font-montserrat text-base-content pr-12 py-5">
                                        {item.question}
                                    </div>
                                    <div className="collapse-content text-sm sm:text-base text-base-content/70 leading-relaxed pb-6 pr-6">
                                        <p>{item.answer}</p>
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
