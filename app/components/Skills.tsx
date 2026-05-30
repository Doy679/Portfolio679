'use client';
import React from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HackerText from './HackerText';
import SkillCard from './SkillCard';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
    const skillsRef = React.useRef(null);

    const skillCategories = [
        {
            title: "Languages",
            icon: "fas fa-code",
            className: "md:col-span-5",
            skills: [
                { name: "JavaScript", icon: "fab fa-js-square", color: "#F7DF1E" },
                { name: "Typescript", icon: "fas fa-file-code", color: "#3178C6" },
                { name: "HTML, CSS", icon: "fab fa-html5", color: "#E34F26" }
            ]
        },
        {
            title: "Frameworks",
            icon: "fas fa-layer-group",
            className: "md:col-span-7",
            skills: [
                { name: "React", icon: "fab fa-react", color: "#61DAFB" },
                { name: "Next.js", icon: "fas fa-globe", color: "#FFFFFF" },
                { name: "GSAP", icon: "fas fa-wind", color: "#88CE02" },
                { name: "Daisy UI", icon: "fas fa-fill-drip", color: "#EC4899" },
                { name: "Tailwind CSS", icon: "fab fa-css3-alt", color: "#06B6D4" },
                { name: "Framer Motion", icon: "fas fa-play", color: "#0055FF" }
            ]
        },
        {
            title: "Tools & Technologies",
            icon: "fas fa-tools",
            className: "md:col-span-6",
            skills: [
                { name: "Node.js", icon: "fab fa-node-js", color: "#339933" },
                { name: "npm", icon: "fab fa-npm", color: "#CB3837" },
                { name: "UI/UX Design", icon: "fas fa-pen-nib", color: "#A855F7" },
                { name: "Git/GitHub", icon: "fab fa-git-alt", color: "#F05032" },
                { name: "AI-Assisted Development", icon: "fas fa-robot", color: "#10B981" }
            ]
        },
        {
            title: "Core Competencies",
            icon: "fas fa-users",
            className: "md:col-span-6",
            skills: [
                { name: "Team Collaboration", icon: "fas fa-people-group", color: "#3B82F6" },
                { name: "Problem Solving", icon: "fas fa-lightbulb", color: "#FBBF24" },
                { name: "Agile/Scrum", icon: "fas fa-sync-alt", color: "#14B8A6" },
                { name: "Adaptability", icon: "fas fa-arrows-turn-to-dots", color: "#8B5CF6" }
            ]
        },
        {
            title: "OS & Environments",
            icon: "fas fa-desktop",
            className: "md:col-span-12",
            skills: [
                { name: "Windows", icon: "fab fa-windows", color: "#0078D4" },
                { name: "Linux", icon: "fab fa-linux", color: "#FCC624" },
                { name: "Command Line", icon: "fas fa-terminal", color: "#4D4D4D" }
            ]
        }
    ];

    useGSAP(() => {
        const mm = gsap.matchMedia();

        // Mobile Reveal (Every Scroll)
        mm.add("(max-width: 1023px)", () => {
            ScrollTrigger.batch('.skill-card', {
                onEnter: (elements) => {
                    gsap.fromTo(elements, 
                        { opacity: 0, y: 30, scale: 0.95 },
                        { opacity: 1, y: 0, scale: 1, duration: 1, stagger: 0.15, ease: "power3.out", overwrite: true }
                    );
                    
                    // Reveal logos inside the batch
                    elements.forEach(el => {
                        gsap.fromTo(el.querySelectorAll('.skill-logo'),
                            { opacity: 0, y: 5 },
                            { opacity: 1, y: 0, stagger: 0.03, duration: 0.5, overwrite: true }
                        );
                    });
                },
                onLeaveBack: (elements) => {
                    gsap.to(elements, { opacity: 0, y: 30, scale: 0.95, duration: 0.5, overwrite: true });
                },
                start: "top 90%",
                end: "bottom 10%"
            });
        });

        // Unified Desktop High-End Reveal
        mm.add("(min-width: 1024px)", () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '#skills',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });

            tl.fromTo('.skill-card', 
                { 
                    opacity: 0, 
                    y: 50,
                    scale: 0.9,
                    rotateX: -10,
                    transformPerspective: 1000
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotateX: 0,
                    duration: 1.2,
                    force3D: true,
                    stagger: 0.2,
                    ease: 'expo.out',
                }
            );

            // Staggered reveal for skill logos INSIDE the cards
            tl.fromTo('.skill-logo',
                { opacity: 0, scale: 0.8, y: 10 },
                { 
                    opacity: 1, 
                    scale: 1, 
                    y: 0, 
                    stagger: 0.05, 
                    duration: 0.8, 
                    ease: "back.out(1.7)",
                    force3D: true 
                },
                "-=0.8"
            );

            // Subtle floating animation for cards
            gsap.to('.skill-card', {
                yPercent: -2,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                force3D: true,
                stagger: {
                    amount: 1.5,
                    from: "random"
                }
            });
        });

        // Desktop-only Tilt Effect - Optimized with quickTo
        mm.add("(min-width: 1024px)", () => {
            const cards = gsap.utils.toArray<HTMLElement>('.skill-card');
            cards.forEach((card) => {
                const xTo = gsap.quickTo(card, "rotateY", { duration: 0.4, ease: "power2.out" });
                const yTo = gsap.quickTo(card, "rotateX", { duration: 0.4, ease: "power2.out" });
                const scaleTo = gsap.quickTo(card, "scale", { duration: 0.4, ease: "power2.out" });

                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = (y - centerY) / 20;
                    const rotateY = (centerX - x) / -20;

                    xTo(rotateY);
                    yTo(rotateX);
                    scaleTo(1.02);
                }, { passive: true });

                card.addEventListener('mouseleave', () => {
                    xTo(0);
                    yTo(0);
                    scaleTo(1);
                });
                
                gsap.set(card, { transformPerspective: 1000, force3D: true });
                card.style.willChange = "transform";
            });
        });

    }, { scope: skillsRef });

    return (
        <section id="skills" className="py-24 bg-base-200/50" ref={skillsRef}>
            <div className="container mx-auto px-6 md:px-10 lg:px-20">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-4xl font-black font-montserrat tracking-[0.2em] uppercase text-base-content">
                        <HackerText text="My Skills" />
                    </h2>
                    <div className="w-16 h-1 bg-primary/30 mx-auto mt-6 rounded-full shadow-[0_0_20px_rgba(var(--p),0.2)]"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {skillCategories.map((cat, idx) => (
                        <SkillCard 
                            key={idx}
                            title={cat.title}
                            icon={cat.icon}
                            skills={cat.skills}
                            className={cat.className}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
