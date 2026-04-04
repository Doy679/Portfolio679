'use client';
import React from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GradientTitle from './GradientTitle';
import SkillCard from './SkillCard';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
    const skillsRef = React.useRef(null);

    const skillCategories = [
        {
            title: "Programming Languages",
            icon: "fas fa-code",
            className: "md:col-span-5",
            skills: [
                { name: "JS/TS", icon: "fab fa-js-square", color: "#F7DF1E" },
                { name: "Java", icon: "fab fa-java", color: "#ED8B00" },
                { name: "C/C++", icon: "fas fa-file-code", color: "#00599C" },
                { name: "C#", icon: "fas fa-file-code", color: "#239120" }
            ]
        },
        {
            title: "Frontend & Frameworks",
            icon: "fas fa-layer-group",
            className: "md:col-span-7",
            skills: [
                { name: "React", icon: "fab fa-react", color: "#61DAFB" },
                { name: "Next.js", icon: "fas fa-globe", color: "#FFFFFF" },
                { name: "Tailwind", icon: "fab fa-css3-alt", color: "#06B6D4" },
                { name: "GSAP", icon: "fas fa-wind", color: "#88CE02" },
                { name: "HTML/CSS", icon: "fab fa-html5", color: "#E34F26" },
                { name: "Bootstrap", icon: "fab fa-bootstrap", color: "#7952B3" },
                { name: "DaisyUI", icon: "fas fa-fill-drip", color: "#EC4899" }
            ]
        },
        {
            title: "Supporting Tools",
            icon: "fas fa-tools",
            className: "md:col-span-6",
            skills: [
                { name: "GIT/GITHUB", icon: "fab fa-git-alt", color: "#F05032" },
                { name: "Node.js", icon: "fab fa-node-js", color: "#339933" },
                { name: "Webpack", icon: "fas fa-cogs", color: "#8DD6F9" },
                { name: "VS Code", icon: "fas fa-laptop-code", color: "#007ACC" }
            ]
        },
        {
            title: "OS & Environments",
            icon: "fas fa-desktop",
            className: "md:col-span-6",
            skills: [
                { name: "Windows", icon: "fab fa-windows", color: "#0078D4" },
                { name: "Linux", icon: "fab fa-linux", color: "#FCC624" },
                { name: "Command Line", icon: "fas fa-terminal", color: "#4D4D4D" }
            ]
        },
        {
            title: "IT Support & Hardware Expertise",
            icon: "fas fa-screwdriver-wrench",
            className: "md:col-span-12",
            skills: [
                { name: "PC Hardware", icon: "fas fa-microchip", color: "#10B981" },
                { name: "Networking", icon: "fas fa-network-wired", color: "#60A5FA" },
                { name: "Reformat O.S.", icon: "fas fa-compact-disc", color: "#F87171" },
                { name: "LAN Routing", icon: "fas fa-route", color: "#A78BFA" },
                { name: "Printer Sharing", icon: "fas fa-print", color: "#9CA3AF" }
            ]
        }
    ];

    useGSAP(() => {
        // Smooth entry animation - No scrubbing to avoid conflicts
        gsap.fromTo(skillsRef.current,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: skillsRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Staggered reveal for bento cards
        ScrollTrigger.batch('.skill-card', {
            onEnter: (elements) => {
                gsap.fromTo(elements,
                    { opacity: 0, y: 40, willChange: 'transform, opacity' },
                    { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'expo.out', clearProps: 'all' }
                );
            },
            start: 'top 85%',
            once: true,
        });

        // Hide section when completely scrolled past into Projects
        ScrollTrigger.create({
            trigger: skillsRef.current,
            start: 'bottom top',
            onEnter: () => gsap.set(skillsRef.current, { visibility: 'hidden' }),
            onEnterBack: () => gsap.set(skillsRef.current, { visibility: 'visible' }),
        });

        // Tilt effect for desktop
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
                    
                    const rotateX = (y - centerY) / 30;
                    const rotateY = (centerX - x) / 30;

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
        <section id="skills" className="py-24 bg-base-200/50" ref={skillsRef}>
            <div className="container mx-auto px-6 md:px-10 lg:px-20">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-4xl font-black font-montserrat tracking-[0.2em] uppercase text-base-content">
                        <GradientTitle text="My Skills" />
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
